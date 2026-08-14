import { formatPrice, getBundleValueStack, type Product } from "@/lib/products";
import { BuyButton } from "./BuyButton";

interface PricingTableProps {
  individualBooks: Product[];
  bundle: Product;
}

export function PricingTable({ individualBooks, bundle }: PricingTableProps) {
  const valueStack = getBundleValueStack(individualBooks);
  const totalValue = valueStack.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="card-parchment border border-gold p-6 md:p-8">
      <h3 className="mb-6 font-display text-xl font-bold text-ink md:text-2xl">
        Enthalten für {formatPrice(bundle.price)}:
      </h3>
      <ul className="space-y-3">
        {valueStack.map((item) => (
          <li
            key={item.label}
            className="flex items-start justify-between gap-4 border-b border-dashed border-parchment-dark pb-3 last:border-0"
          >
            <span className="text-navy/80 text-sm md:text-base">
              {item.label}
            </span>
            <span className="compare-stamp shrink-0">
              {formatPrice(item.value)}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-6 pt-4 border-t-2 border-gold flex justify-between items-center">
        <span className="font-display font-bold text-navy uppercase text-sm">
          Gesamtwert
        </span>
        <span className="compare-stamp text-lg">
          {formatPrice(totalValue)}
        </span>
      </div>
      <div className="mt-3 flex justify-between items-center">
        <span className="font-display font-bold text-navy text-lg uppercase">
          Sie zahlen heute
        </span>
        <span className="price-stamp text-4xl">
          {formatPrice(bundle.price)}
        </span>
      </div>
      <div className="mt-6">
        <BuyButton
          productSlug="bundle"
          label={`Zum Komplettset · ${formatPrice(bundle.price)}`}
          className="w-full text-base"
        />
      </div>
      <p className="mt-4 text-center text-xs uppercase tracking-widest text-navy/50">
        Sofort herunterladen &middot; Einmalige Zahlung &middot; Für immer behalten
      </p>
    </div>
  );
}
