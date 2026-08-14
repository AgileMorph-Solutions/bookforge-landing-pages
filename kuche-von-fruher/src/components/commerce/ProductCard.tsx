import { BuyButton } from "./BuyButton";
import { BookCover } from "@/components/ui/BookCover";
import { formatPrice, type Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
  contentUnitLabel: string;
}

export function ProductCard({ product, featured = false, contentUnitLabel }: ProductCardProps) {
  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-sm border bg-cream/40 p-3 shadow-sm ${
        featured
          ? "border-2 border-navy ring-1 ring-gold/40"
          : "border-parchment-dark"
      }`}
    >
      <BookCover src={product.coverImage} alt={product.title} variant="card">
        {featured && (
          <div className="absolute left-2 top-2 z-10">
            <span className="bg-red px-2 py-1 font-body text-[10px] font-semibold uppercase tracking-widest text-white">
              Bester Wert
            </span>
          </div>
        )}
      </BookCover>

      <h3 className="mt-5 line-clamp-2 min-h-[2.75rem] font-display text-lg leading-snug text-ink">
        {product.title}
      </h3>
      <p className="mt-1 font-body text-xs font-semibold uppercase tracking-widest text-red">
        {product.recipeCount} {contentUnitLabel}
      </p>
      <p className="mt-2 line-clamp-3 text-sm leading-snug text-navy/70">
        {product.subtitle}
      </p>

      <div className="mt-auto pt-4">
        <div className="mb-3 flex items-baseline gap-2">
          <span className="price-stamp text-xl">
            {formatPrice(product.price)}
          </span>
          <span className="compare-stamp">{formatPrice(product.compareAt)}</span>
        </div>
        <BuyButton
          productSlug={product.slug}
          label={
            product.slug === "bundle"
              ? `Zur Bibliothek · ${formatPrice(product.price)}`
              : `Dieses Buch kaufen · ${formatPrice(product.price)}`
          }
          className="w-full px-4 py-3 text-xs"
        />
      </div>
    </article>
  );
}
