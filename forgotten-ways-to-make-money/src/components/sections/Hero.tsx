import { BuyButton } from "@/components/commerce/BuyButton";
import { BookCover } from "@/components/ui/BookCover";
import { PageContainer } from "@/components/ui/PageContainer";
import { RibbonBadge } from "@/components/ui/RibbonBadge";
import { AccentWord, VintageHeadline } from "@/components/ui/VintageHeadline";
import { formatPrice, type Product } from "@/lib/products";
import type { HomePageContent } from "@/lib/site-content";

interface HeroProps {
  content: HomePageContent["hero"];
  bundle: Product;
}

export function Hero({ content, bundle }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-hero-texture pb-16 pt-14 md:pb-24 md:pt-20">
      <PageContainer>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <p className="section-label mb-5">{content.eyebrow}</p>
            <VintageHeadline
              as="h1"
              className="mb-6 max-w-xl text-4xl font-bold md:text-5xl"
            >
              {content.headlineStart}{" "}
              <AccentWord>{content.headlineAccent}</AccentWord>{" "}
              <AccentWord color="navy">{content.headlineEnd}</AccentWord>
            </VintageHeadline>
            <p className="landing-prose mb-8 max-w-lg text-lg">
              {content.subheadline}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
              <BuyButton
                productSlug="bundle"
                label={`${content.primaryCta.label} · ${formatPrice(bundle.price)}`}
              />
              <a
                href={content.secondaryCta.href ?? "#library"}
                className="btn-vintage-secondary"
              >
                {content.secondaryCta.label} →
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[420px] lg:max-w-[460px] lg:justify-self-end">
            <div className="absolute -right-2 -top-3 z-20 sm:-right-3 sm:-top-4">
              <RibbonBadge>{content.badge}</RibbonBadge>
            </div>
            <BookCover
              src={bundle.coverImage}
              alt={bundle.title}
              variant="hero"
              priority
            />
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
