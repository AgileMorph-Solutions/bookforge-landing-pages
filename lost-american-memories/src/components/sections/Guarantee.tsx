import { PageContainer } from "@/components/ui/PageContainer";
import { StarDivider } from "@/components/ui/StarDivider";
import { VintageHeadline } from "@/components/ui/VintageHeadline";
import type { HomePageContent } from "@/lib/site-content";

interface GuaranteeProps {
  content: HomePageContent["guarantee"];
}

export function Guarantee({ content }: GuaranteeProps) {
  return (
    <section className="bg-cream py-20 md:py-28">
      <PageContainer className="text-center">
        <p className="section-label">{content.eyebrow}</p>
        <StarDivider className="mx-auto max-w-xs" />
        <div className="panel-certificate mt-6 text-left md:text-center">
          <VintageHeadline as="h2" className="text-2xl text-cream md:text-3xl">
            {content.headline}
          </VintageHeadline>
          <p className="mt-6 text-lg leading-relaxed text-cream/85">
            {content.body}
          </p>
          <p className="mt-6 text-sm uppercase tracking-widest text-gold">
            {content.note}
          </p>
        </div>
      </PageContainer>
    </section>
  );
}
