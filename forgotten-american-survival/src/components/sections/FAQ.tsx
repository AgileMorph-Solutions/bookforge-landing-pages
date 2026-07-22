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
    <section id="faq" className="py-16 md:py-24 bg-cream">
      <PageContainer>
        <p className="section-label text-center">{content.eyebrow}</p>
        <StarDivider className="max-w-xs mx-auto" />
        <VintageHeadline as="h2" className="section-title mt-4 text-center">
          {content.headline}
        </VintageHeadline>
        <div className="mt-10 mx-auto max-w-3xl card-parchment p-6 border-2 border-parchment-dark">
          <Accordion items={items} />
        </div>
      </PageContainer>
    </section>
  );
}
