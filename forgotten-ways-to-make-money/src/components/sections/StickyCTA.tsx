"use client";

import { BuyButton } from "@/components/commerce/BuyButton";
import { formatPrice, type Product } from "@/lib/products";

interface StickyCTAProps {
  bundle: Product;
}

export function StickyCTA({ bundle }: StickyCTAProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-navy border-vintage-top p-3 shadow-2xl">
      <BuyButton
        productSlug="bundle"
        label={`Get the Library · ${formatPrice(bundle.price)}`}
        className="w-full"
      />
    </div>
  );
}
