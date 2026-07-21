import Image from "next/image";
import { BuyButton } from "./BuyButton";
import { RibbonBadge } from "@/components/ui/RibbonBadge";
import { formatPrice, type Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
  contentUnitLabel: string;
}

export function ProductCard({ product, featured = false, contentUnitLabel }: ProductCardProps) {
  return (
    <article
      className={`card-parchment flex flex-col overflow-hidden ${
        featured
          ? "border-4 border-navy relative"
          : "border-2 border-parchment-dark"
      }`}
    >
      {featured && (
        <>
          <span
            className="absolute top-2 left-2 text-red text-xs z-10"
            aria-hidden
          >
            ★
          </span>
          <span
            className="absolute top-2 right-2 text-red text-xs z-10"
            aria-hidden
          >
            ★
          </span>
        </>
      )}
      <div className="relative aspect-[3/4] w-full bg-parchment">
        <Image
          src={product.coverImage}
          alt={product.title}
          fill
          className="object-contain cover-vintage p-2"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {featured ? (
          <div className="absolute top-3 right-3 z-10">
            <RibbonBadge>BEST VALUE</RibbonBadge>
          </div>
        ) : (
          <div className="absolute bottom-3 left-3 z-10">
            <RibbonBadge variant="navy">
              {product.recipeCount} {contentUnitLabel.toUpperCase()}
            </RibbonBadge>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 border-t-2 border-parchment-dark">
        <h3 className="font-display text-lg md:text-xl font-bold text-navy leading-tight uppercase">
          {product.title}
        </h3>
        <p className="mt-2 text-sm text-navy/70 leading-snug flex-1">
          {product.subtitle}
        </p>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="price-stamp text-2xl">
            {formatPrice(product.price)}
          </span>
          <span className="compare-stamp">
            {formatPrice(product.compareAt)}
          </span>
        </div>
        <div className="mt-4">
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
