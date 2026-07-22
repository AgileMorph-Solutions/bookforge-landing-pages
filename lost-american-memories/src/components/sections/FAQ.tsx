import { Accordion } from "@/components/ui/Accordion";
import { PageContainer } from "@/components/ui/PageContainer";
import { StarDivider } from "@/components/ui/StarDivider";
import { VintageHeadline } from "@/components/ui/VintageHeadline";
import type { Product } from "@/lib/products";
import {
  formatCommerceCopy,
  type HomePageContent,
} from "@/lib/site-content";

interface FAQProps {
  content: HomePageContent["faq"];
  individualBooks: Product[];
  bundle: Product;
}

export function FAQ({ content, individualBooks, bundle }: FAQProps) {
  const items = content.items.map((item) => ({
    question: formatCommerceCopy(item.question, bundle, individualBooks),
    answer: formatCommerceCopy(item.answer, bundle, individualBooks),
  }));

  return (
    <section id="faq" className="bg-cream py-20 md:py-28">
      <PageContainer>
        <p className="section-label text-center">{content.eyebrow}</p>
        <StarDivider className="mx-auto max-w-xs" />
        <VintageHeadline as="h2" className="section-title mt-4 text-center">
          {content.headline}
        </VintageHeadline>
        <div className="mx-auto mt-10 max-w-3xl border border-[#e3beb8] bg-white p-6">
          <Accordion items={items} />
        </div>
      </PageContainer>
    </section>
  );
}
