import { PricingTable } from "@/components/commerce/PricingTable";
import { StarDivider } from "@/components/ui/StarDivider";
import { VintageHeadline } from "@/components/ui/VintageHeadline";
import type { Product } from "@/lib/products";
import {
  formatCommerceCopy,
  type HomePageContent,
} from "@/lib/site-content";

interface OrderSectionProps {
  content: HomePageContent["order"];
  individualBooks: Product[];
  bundle: Product;
}

export function OrderSection({
  content,
  individualBooks,
  bundle,
}: OrderSectionProps) {
  return (
    <section id="order" className="py-16 md:py-24 bg-parchment-texture">
      <div className="w-full px-4 md:px-6">
        <p className="section-label text-center">{content.eyebrow}</p>
        <StarDivider className="max-w-xs mx-auto" />
        <VintageHeadline
          as="h2"
          className="mt-4 text-center text-3xl md:text-4xl"
        >
          {formatCommerceCopy(content.headline, bundle, individualBooks)}
        </VintageHeadline>
        <p className="mt-4 text-center text-navy/70 max-w-2xl mx-auto">
          {formatCommerceCopy(content.subheadline, bundle, individualBooks)}
        </p>

        <div className="mt-12 max-w-xl mx-auto">
          <PricingTable individualBooks={individualBooks} bundle={bundle} />
        </div>

        <p className="mt-8 text-center text-sm text-navy/60 max-w-xl mx-auto italic">
          {formatCommerceCopy(content.individualNote, bundle, individualBooks)}
        </p>

        <div className="mt-8 flex flex-wrap justify-center items-center gap-3 text-xs uppercase tracking-widest text-navy/50">
          <span>Secure checkout</span>
          <span className="text-red" aria-hidden>
            ★
          </span>
          <span>{content.trustLine}</span>
        </div>
      </div>
    </section>
  );
}
