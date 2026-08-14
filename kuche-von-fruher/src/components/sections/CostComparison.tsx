import { PageContainer } from "@/components/ui/PageContainer";
import { StarDivider } from "@/components/ui/StarDivider";
import { VintageHeadline } from "@/components/ui/VintageHeadline";
import { formatPrice, type Product } from "@/lib/products";
import {
  formatContentTemplate,
  type HomePageContent,
} from "@/lib/site-content";

interface CostComparisonProps {
  content: HomePageContent["costComparison"];
  bundle: Product;
}

export function CostComparison({ content, bundle }: CostComparisonProps) {
  return (
    <section id="math" className="bg-cream py-20 md:py-28">
      <PageContainer>
        <p className="section-label text-center">{content.eyebrow}</p>
        <StarDivider className="mx-auto max-w-xs" />
        <VintageHeadline as="h2" className="section-title mt-4 text-center">
          {content.headline}
        </VintageHeadline>
        <p className="landing-prose mx-auto mt-4 max-w-2xl text-center">
          {content.body}
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="card-parchment border border-[#e3beb8] p-6">
            <h3 className="mb-1 font-display text-xl font-bold uppercase text-ink">
              {content.modernTitle}
            </h3>
            <p className="mb-4 text-xs uppercase tracking-widest text-[#5a403c]/70">
              {content.modernSubtitle}
            </p>
            <ul className="space-y-3">
              {content.modern.map((item) => (
                <li
                  key={item.label}
                  className="flex justify-between gap-4 border-b border-dashed border-parchment-dark pb-2 last:border-0"
                >
                  <span className="text-sm text-[#5a403c]">{item.label}</span>
                  <span className="shrink-0 font-display text-sm font-bold text-red">
                    {item.cost}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card-parchment border border-gold/40 p-6 ring-1 ring-gold/20">
            <h3 className="mb-1 font-display text-xl font-bold uppercase text-ink">
              {content.vintageTitle}
            </h3>
            <p className="mb-4 text-xs uppercase tracking-widest text-[#5a403c]/70">
              {content.vintageSubtitle}
            </p>
            <ul className="space-y-3">
              {content.vintage.map((item) => (
                <li
                  key={item.label}
                  className="flex justify-between gap-4 border-b border-dashed border-parchment-dark pb-2 last:border-0"
                >
                  <span className="text-sm text-[#5a403c]">{item.label}</span>
                  <span className="shrink-0 font-display text-sm font-bold text-ink">
                    {item.cost}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-8 text-center font-display text-ink/70">
          {formatContentTemplate(content.footer, {
            price: formatPrice(bundle.price),
          })}
        </p>
      </PageContainer>
    </section>
  );
}
