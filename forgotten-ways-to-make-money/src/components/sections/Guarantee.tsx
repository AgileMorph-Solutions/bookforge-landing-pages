import { StarDivider } from "@/components/ui/StarDivider";
import { VintageHeadline } from "@/components/ui/VintageHeadline";
import type { HomePageContent } from "@/lib/site-content";
import { PageContainer } from "@/components/ui/PageContainer";

interface GuaranteeProps {
  content: HomePageContent["guarantee"];
}

export function Guarantee({ content }: GuaranteeProps) {
  return (
    <section className="py-16 md:py-24 bg-cream">
      <PageContainer className="text-center">
        <p className="section-label">{content.eyebrow}</p>
        <StarDivider className="max-w-xs mx-auto" />
        <div className="panel-certificate mt-6 text-left md:text-center">
          <VintageHeadline as="h2" className="text-2xl md:text-3xl text-cream">
            {content.headline}
          </VintageHeadline>
          <p className="mt-6 text-cream/85 leading-relaxed text-lg">
            {content.body}
          </p>
          <p className="mt-6 text-sm text-gold uppercase tracking-widest">
            {content.note}
          </p>
        </div>
      </PageContainer>
    </section>
  );
}
