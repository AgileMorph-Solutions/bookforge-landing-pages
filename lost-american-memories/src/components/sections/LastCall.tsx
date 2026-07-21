import { BuyButton } from "@/components/commerce/BuyButton";
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
      <div className="bg-navy border-vintage-top py-16 md:py-20">
        <div className="w-full px-4 md:px-6 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-gold mb-4">
            {content.eyebrow}
          </p>
          <VintageHeadline as="h2" className="text-3xl md:text-4xl text-cream">
            {content.headline}
          </VintageHeadline>
          <StarDivider className="max-w-xs mx-auto my-6 [&::before]:bg-gradient-to-r [&::after]:bg-gradient-to-l from-gold/50" />
          <p className="text-cream/80 leading-relaxed">
            {formatCommerceCopy(content.body, bundle, individualBooks)}
          </p>
          <p className="mt-4 text-sm text-cream/60 uppercase tracking-wider">
            {formatContentTemplate(content.spotsLine, {
              spots: siteSettings.firstEditionSpotsLeft,
            })}
          </p>
          <div className="mt-8">
            <BuyButton
              productSlug="bundle"
              label={`${content.ctaLabel} · ${formatPrice(bundle.price)}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
