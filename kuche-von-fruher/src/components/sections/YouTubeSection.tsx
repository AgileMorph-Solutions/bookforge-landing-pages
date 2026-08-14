import Link from "next/link";
import { BuyButton } from "@/components/commerce/BuyButton";
import { PageContainer } from "@/components/ui/PageContainer";
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
    <section id="sources" className="bg-cream py-20 md:py-28">
      <PageContainer>
        <p className="section-label text-center">{content.eyebrow}</p>
        <StarDivider className="mx-auto max-w-xs" />
        <VintageHeadline as="h2" className="section-title mt-4 text-center">
          {content.headline}
        </VintageHeadline>
        <p className="landing-prose mx-auto mt-6 max-w-3xl text-center">
          {content.body}
        </p>

        <div className="mx-auto mt-10 grid max-w-lg grid-cols-3 gap-4">
          {content.stats.map((stat) => (
            <div
              key={stat.label}
              className="card-parchment border border-[#e3beb8] py-4 text-center"
            >
              <p className="font-display text-xl font-bold text-ink md:text-2xl">
                {stat.value}
              </p>
              <p className="mt-1 text-[0.65rem] uppercase tracking-widest text-[#5a403c]">
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
      </PageContainer>
    </section>
  );
}
