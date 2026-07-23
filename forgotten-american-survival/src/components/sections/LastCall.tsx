import { BuyButton } from "@/components/commerce/BuyButton";
import { PageContainer } from "@/components/ui/PageContainer";
import { StarDivider } from "@/components/ui/StarDivider";
import { VintageHeadline } from "@/components/ui/VintageHeadline";
import { formatPrice, type Product } from "@/lib/products";
import {
  formatCommerceCopy,
  formatContentTemplate,
  type HomePageContent,
  type SiteSettingsContent,
} from "@/lib/site-content";

interface LastCallProps {
  content: HomePageContent["lastCall"];
  siteSettings: SiteSettingsContent;
  bundle: Product;
  individualBooks: Product[];
}

export function LastCall({
  content,
  siteSettings,
  bundle,
  individualBooks,
}: LastCallProps) {
  return (
    <section className="bg-wood-surface">
      <div className="border-vintage-top bg-navy py-16 md:py-20">
        <PageContainer className="text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-gold">
            {content.eyebrow}
          </p>
          <VintageHeadline as="h2" className="text-3xl text-cream md:text-4xl">
            {content.headline}
          </VintageHeadline>
          <StarDivider className="mx-auto my-6 max-w-xs from-gold/50 [&::before]:bg-gradient-to-r [&::after]:bg-gradient-to-l" />
          <p className="mx-auto max-w-2xl leading-relaxed text-cream/80">
            {formatCommerceCopy(content.body, bundle, individualBooks)}
          </p>
          <p className="mt-4 text-sm uppercase tracking-wider text-cream/60">
            {formatContentTemplate(content.spotsLine, {
              spots: siteSettings.firstEditionSpotsLeft,
            })}
          </p>
          <div className="mt-8 flex w-full justify-center">
            <BuyButton
              productSlug="bundle"
              label={`${content.ctaLabel} · ${formatPrice(bundle.price)}`}
            />
          </div>
        </PageContainer>
      </div>
    </section>
  );
}
