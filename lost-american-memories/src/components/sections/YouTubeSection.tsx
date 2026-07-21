import Link from "next/link";
import { BuyButton } from "@/components/commerce/BuyButton";
import { StarDivider } from "@/components/ui/StarDivider";
import { VintageHeadline } from "@/components/ui/VintageHeadline";
import { formatPrice, type Product } from "@/lib/products";
import type { HomePageContent, SiteSettingsContent } from "@/lib/site-content";

interface YouTubeSectionProps {
  content: HomePageContent["youtube"];
  siteSettings: SiteSettingsContent;
  bundle: Product;
}

export function YouTubeSection({
  content,
  siteSettings,
  bundle,
}: YouTubeSectionProps) {
  return (
    <section id="sources" className="py-16 md:py-24 bg-cream">
      <div className="w-full px-4 md:px-6">
        <p className="section-label text-center">{content.eyebrow}</p>
        <StarDivider className="max-w-xs mx-auto" />
        <VintageHeadline
          as="h2"
          className="mt-4 text-center text-3xl md:text-4xl"
        >
          {content.headline}
        </VintageHeadline>
        <p className="mt-6 text-center text-navy/80 max-w-3xl mx-auto leading-relaxed">
          {content.body}
        </p>

        <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg mx-auto">
          {content.stats.map((stat) => (
            <div
              key={stat.label}
              className="card-parchment text-center py-4 border-2 border-navy/10"
            >
              <p className="text-xl md:text-2xl font-display font-bold text-navy">
                {stat.value}
              </p>
              <p className="text-[0.65rem] uppercase tracking-widest text-navy/60 mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href={siteSettings.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-vintage-secondary"
          >
            {content.youtubeCtaLabel} →
          </Link>
          <BuyButton
            productSlug="bundle"
            label={`${content.purchaseCtaLabel} · ${formatPrice(bundle.price)}`}
          />
        </div>
      </div>
    </section>
  );
}
