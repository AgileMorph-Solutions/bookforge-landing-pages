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
  label = "Zur Bibliothek",
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
            "Das PDF für dieses Buch ist noch nicht verfügbar. Bitte versuchen Sie es bald erneut."
        );
      } else if (res.status === 503) {
        setError("Zahlungen sind noch nicht eingerichtet. Bitte versuchen Sie es später erneut.");
      } else {
        setError(data.error ?? "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.");
      }
    } catch {
      setError("Verbindung nicht möglich. Prüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.");
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
        <span>{loading ? "Lädt..." : label}</span>
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
