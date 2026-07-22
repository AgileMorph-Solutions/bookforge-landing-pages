import { BuyButton } from "./BuyButton";
import { BookCover } from "@/components/ui/BookCover";
import { RibbonBadge } from "@/components/ui/RibbonBadge";
import { formatPrice, type Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
  contentUnitLabel: string;
}

export function ProductCard({
  product,
  featured = false,
  contentUnitLabel,
}: ProductCardProps) {
  return (
    <article
      className={`card-parchment flex h-full flex-col overflow-hidden ${
        featured
          ? "relative border-4 border-navy"
          : "border-2 border-parchment-dark"
      }`}
    >
      {featured && (
        <>
          <span
            className="absolute left-2 top-2 z-10 text-xs text-red"
            aria-hidden
          >
            ★
          </span>
          <span
            className="absolute right-2 top-2 z-10 text-xs text-red"
            aria-hidden
          >
            ★
          </span>
        </>
      )}
      <BookCover src={product.coverImage} alt={product.title} variant="card">
        {featured ? (
          <div className="absolute right-3 top-3 z-10">
            <RibbonBadge>BEST VALUE</RibbonBadge>
          </div>
        ) : (
          <div className="absolute bottom-3 left-3 z-10">
            <RibbonBadge variant="navy">
              {product.recipeCount} {contentUnitLabel.toUpperCase()}
            </RibbonBadge>
          </div>
        )}
      </BookCover>
      <div className="flex flex-1 flex-col border-t-2 border-parchment-dark p-4">
        <h3 className="line-clamp-2 font-display text-base font-bold uppercase leading-tight text-navy md:text-lg">
          {product.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-snug text-navy/70">
          {product.subtitle}
        </p>
        <div className="mt-auto pt-4">
          <div className="mb-3 flex items-baseline gap-2">
            <span className="price-stamp text-xl">
              {formatPrice(product.price)}
            </span>
            <span className="compare-stamp">
              {formatPrice(product.compareAt)}
            </span>
          </div>
          <BuyButton
            productSlug={product.slug}
            label={
              product.slug === "bundle"
                ? `Get the Library · ${formatPrice(product.price)}`
                : `Get This Book · ${formatPrice(product.price)}`
            }
            className="w-full"
          />
        </div>
      </div>
    </article>
  );
}
