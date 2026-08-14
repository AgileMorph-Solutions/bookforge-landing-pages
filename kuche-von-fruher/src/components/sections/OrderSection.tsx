import { PricingTable } from "@/components/commerce/PricingTable";
import { PageContainer } from "@/components/ui/PageContainer";
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
    <section id="order" className="bg-parchment py-20 md:py-28">
      <PageContainer>
        <p className="section-label text-center">{content.eyebrow}</p>
        <StarDivider className="mx-auto max-w-xs" />
        <VintageHeadline as="h2" className="section-title mt-4 text-center">
          {formatCommerceCopy(content.headline, bundle, individualBooks)}
        </VintageHeadline>
        <p className="landing-prose mx-auto mt-4 max-w-2xl text-center">
          {formatCommerceCopy(content.subheadline, bundle, individualBooks)}
        </p>

        <div className="mx-auto mt-12 max-w-xl">
          <PricingTable individualBooks={individualBooks} bundle={bundle} />
        </div>

        <p className="mx-auto mt-8 max-w-xl text-center text-sm italic text-[#5a403c]">
          {formatCommerceCopy(content.individualNote, bundle, individualBooks)}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-widest text-[#5a403c]/70">
          <span>Sichere Kasse</span>
          <span className="text-red" aria-hidden>
            ★
          </span>
          <span>{content.trustLine}</span>
        </div>
      </PageContainer>
    </section>
  );
}
