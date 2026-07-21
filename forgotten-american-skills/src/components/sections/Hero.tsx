import Image from "next/image";
import { BuyButton } from "@/components/commerce/BuyButton";
import { RibbonBadge } from "@/components/ui/RibbonBadge";
import { StarDivider } from "@/components/ui/StarDivider";
import { AccentWord, VintageHeadline } from "@/components/ui/VintageHeadline";
import { formatPrice, type Product } from "@/lib/products";
import type { HomePageContent } from "@/lib/site-content";

interface HeroProps {
  content: HomePageContent["hero"];
  bundle: Product;
}

export function Hero({ content, bundle }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-hero-texture">
      <div className="w-full px-4 py-12 md:px-6 md:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,440px)] lg:items-center lg:gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(320px,500px)]">
          <div className="min-w-0">
            <p className="section-label mb-2">{content.eyebrow}</p>
            <StarDivider className="mb-6 max-w-xs" />
            <VintageHeadline
              as="h1"
              className="text-4xl md:text-5xl lg:text-6xl max-w-3xl"
            >
              {content.headlineStart}{" "}
              <AccentWord>{content.headlineAccent}</AccentWord>{" "}
              <AccentWord color="navy">{content.headlineEnd}</AccentWord>
            </VintageHeadline>
            <p className="mt-6 text-lg text-navy/80 leading-relaxed max-w-2xl font-body">
              {content.subheadline}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
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

          <div className="relative mx-auto w-full max-w-[380px] sm:max-w-[420px] lg:mx-0 lg:max-w-none lg:justify-self-end">
            <div className="absolute -top-2 -right-2 z-20 md:-top-4 md:-right-4">
              <RibbonBadge>{content.badge}</RibbonBadge>
            </div>
            <div className="book-pedestal rounded-t-lg">
              <div className="parchment-frame rounded-sm overflow-hidden book-lift">
                <Image
                  src={bundle.coverImage}
                  alt={bundle.title}
                  width={600}
                  height={750}
                  className="h-auto w-full max-h-[min(68vh,620px)] object-contain cover-vintage"
                  sizes="(max-width: 1024px) 90vw, 500px"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
