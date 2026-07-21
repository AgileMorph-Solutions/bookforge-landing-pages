"use client";

import { useState } from "react";
import type { ProductSlug } from "@/lib/products";

interface BuyButtonProps {
  productSlug: ProductSlug;
  label?: string;
  className?: string;
  variant?: "primary" | "secondary";
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

      if (res.status === 503) {
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
    variant === "primary" ? "btn-vintage" : "btn-vintage-secondary";

  return (
    <div className="flex flex-col items-stretch gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className={`${baseClass} ${className}`}
      >
        {loading ? "Loading..." : label}
        {!loading && variant === "primary" && <span aria-hidden>→</span>}
      </button>
      {error && (
        <p className="text-sm text-red text-center" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
