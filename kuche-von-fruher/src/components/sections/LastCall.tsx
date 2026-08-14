import { BuyButton } from "@/components/commerce/BuyButton";
import { PageContainer } from "@/components/ui/PageContainer";
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
    <section className="relative overflow-hidden bg-navy py-20 text-white md:py-28">
      <PageContainer className="relative z-10 text-center">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-gold-light">
          {content.eyebrow}
        </p>
        <VintageHeadline
          as="h2"
          className="mb-6 text-4xl font-bold text-cream md:text-5xl"
        >
          {content.headline}
        </VintageHeadline>
        <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-cream/75">
          {formatCommerceCopy(content.body, bundle, individualBooks)}
        </p>

        <div className="mb-8 inline-block border border-cream/15 bg-cream/5 p-8 md:p-12">
          <div className="mb-2 text-sm font-bold uppercase tracking-[0.3em] text-gold-light">
            Komplettes Bibliotheks-Bundle
          </div>
          <div className="mb-8 font-display text-5xl text-cream md:text-6xl">
            {formatPrice(bundle.price)}{" "}
            <span className="text-2xl text-cream/40 line-through">
              {formatPrice(bundle.compareAt)}
            </span>
          </div>
          <div className="flex w-full justify-center">
            <BuyButton
              productSlug="bundle"
              label={content.ctaLabel}
              className="px-12 py-5 text-base shadow-2xl hover:scale-105"
            />
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-8 text-xs uppercase tracking-widest text-cream/55">
            <span>Sofortiger PDF-Zugriff</span>
            <span>Lebenslange Updates</span>
          </div>
        </div>

        <p className="text-sm uppercase tracking-wider text-cream/60">
          {formatContentTemplate(content.spotsLine, {
            spots: siteSettings.firstEditionSpotsLeft,
          })}
        </p>
      </PageContainer>
    </section>
  );
}
