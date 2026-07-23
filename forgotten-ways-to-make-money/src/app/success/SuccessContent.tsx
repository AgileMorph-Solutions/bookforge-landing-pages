"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BrandSeal } from "@/components/ui/BrandSeal";
import { StarDivider } from "@/components/ui/StarDivider";
import { VintageHeadline } from "@/components/ui/VintageHeadline";
import type { Product } from "@/lib/products";
import { siteConfig } from "@/data/copy";
import { DownloadButton } from "./DownloadButton";

interface VerifyResponse {
  entitled: boolean;
  entitledSlugs: string[];
  customerEmail?: string | null;
  accessToken?: string;
  reason: string;
}

interface SuccessContentProps {
  sessionId?: string;
  accessToken?: string;
  individualBooks: Product[];
}

const MAX_RETRIES = 15;
const RETRY_INTERVAL_MS = 2000;

export function SuccessContent({
  sessionId,
  accessToken,
  individualBooks,
}: SuccessContentProps) {
  const [status, setStatus] = useState<"loading" | "entitled" | "failed">(
    "loading"
  );
  const [data, setData] = useState<VerifyResponse | null>(null);
  const [token, setToken] = useState<string | null>(accessToken ?? null);

  useEffect(() => {
    let retries = 0;
    let cancelled = false;

    async function verifyFromAccess(access: string) {
      try {
        const res = await fetch(
          `/api/verify-access?access=${encodeURIComponent(access)}`
        );
        const json: VerifyResponse = await res.json();

        if (cancelled) return;

        if (json.entitled) {
          setData(json);
          setToken(access);
          setStatus("entitled");
          return;
        }

        setData(json);
        setStatus("failed");
      } catch {
        if (!cancelled) setStatus("failed");
      }
    }

    async function verifyFromSession(id: string) {
      try {
        const res = await fetch(
          `/api/verify-session?session_id=${encodeURIComponent(id)}`
        );
        const json: VerifyResponse = await res.json();

        if (cancelled) return;

        if (json.entitled && json.accessToken) {
          setData(json);
          setToken(json.accessToken);
          setStatus("entitled");
          window.history.replaceState(
            null,
            "",
            `/success?access=${encodeURIComponent(json.accessToken)}`
          );
          return;
        }

        if (json.reason === "unpaid" && retries < MAX_RETRIES) {
          retries += 1;
          setTimeout(() => verifyFromSession(id), RETRY_INTERVAL_MS);
          return;
        }

        setData(json);
        setStatus("failed");
      } catch {
        if (!cancelled) setStatus("failed");
      }
    }

    if (accessToken) {
      verifyFromAccess(accessToken);
    } else if (sessionId) {
      verifyFromSession(sessionId);
    } else {
      setStatus("failed");
    }

    return () => {
      cancelled = true;
    };
  }, [sessionId, accessToken]);

  if (status === "loading") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center bg-parchment-texture min-h-[60vh] flex flex-col items-center justify-center">
        <VintageHeadline as="h1" className="text-3xl">
          Verifying your purchase...
        </VintageHeadline>
        <p className="mt-4 text-navy/70">
          Please wait while we confirm your payment.
        </p>
      </div>
    );
  }

  if (status === "failed" || !data?.entitled || !token) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center bg-parchment-texture min-h-[60vh] flex flex-col items-center justify-center">
        <VintageHeadline as="h1" className="text-3xl">
          Payment not confirmed
        </VintageHeadline>
        <p className="mt-4 text-navy/70">
          We couldn&apos;t verify your payment. If you completed checkout,
          wait a moment and refresh, or check your email for a receipt.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="btn-vintage mt-6"
        >
          Refresh Page
        </button>
        <Link href="/" className="btn-vintage-secondary mt-4 inline-flex">
          Return Home
        </Link>
      </div>
    );
  }

  const downloads = individualBooks.filter((b) =>
    data.entitledSlugs.includes(b.slug)
  );

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 md:py-24 bg-parchment-texture min-h-[70vh]">
      <div className="text-center">
        <BrandSeal size={64} className="mx-auto mb-4" />
        <div
          className="text-red text-4xl mb-2 font-display font-bold"
          aria-hidden
        >
          ✓
        </div>
        <VintageHeadline as="h1" className="text-3xl md:text-4xl">
          Your downloads are ready.
        </VintageHeadline>
        <StarDivider className="max-w-xs mx-auto my-4" />
        <p className="text-navy/70">
          Thank you for your purchase
          {data.customerEmail ? `, ${data.customerEmail}` : ""}. Download your
          cookbooks below.
        </p>
      </div>

      <div className="mt-10 card-parchment p-6 space-y-4 border-vintage">
        <h2 className="font-display text-xl font-bold text-navy uppercase">
          Your Downloads
        </h2>
        {downloads.map((book) => (
          <div
            key={book.slug}
            className="flex items-center justify-between gap-4 border-b border-dashed border-parchment-dark pb-4 last:border-0 last:pb-0"
          >
            <div>
              <p className="font-display font-bold text-navy text-sm uppercase">
                {book.title}
              </p>
              <p className="text-xs text-navy/60 mt-0.5">
                {book.recipeCount} {siteConfig.contentUnitLabel} &middot; PDF
              </p>
            </div>
            <DownloadButton accessToken={token} slug={book.slug} />
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-xs uppercase tracking-widest text-navy/50">
        Bookmark this page to download again anytime.
      </p>

      <div className="mt-8 text-center">
        <Link href="/" className="btn-vintage-secondary inline-flex">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
