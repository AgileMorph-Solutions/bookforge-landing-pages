"use client";

import { useState } from "react";
import type { ProductSlug } from "@/lib/products";

interface BuyButtonProps {
  productSlug: ProductSlug;
  label?: string;
  className?: string;
  variant?: "primary" | "secondary" | "header";
}

export function BuyButton({
  productSlug,
  label = "Get the Library",
  className = "",
  variant = "primary",
}: BuyButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productSlug }),
      });
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
        return;
      }

      if (data.code === "PDF_NOT_READY" || res.status === 422) {
        setError(
          data.error ??
            "This book's PDF is not available yet. Please check back soon."
        );
      } else if (res.status === 503) {
        setError("Payments are not set up yet. Please try again later.");
      } else {
        setError(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setError("Unable to connect. Check your internet and try again.");
    } finally {
      setLoading(false);
    }
  };

  const baseClass =
    variant === "primary"
      ? "btn-vintage"
      : variant === "secondary"
        ? "btn-vintage-secondary"
        : "btn-header";

  const isFullWidth = className.includes("w-full");

  return (
    <div
      className={
        isFullWidth
          ? "flex w-full flex-col gap-2"
          : "inline-flex flex-col items-stretch gap-2"
      }
    >
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className={`${baseClass} ${className}`}
      >
        <span>{loading ? "Loading..." : label}</span>
        {!loading && variant !== "secondary" && (
          <span aria-hidden className="text-base leading-none">
            →
          </span>
        )}
      </button>
      {error && (
        <p className="text-center text-sm text-red" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
