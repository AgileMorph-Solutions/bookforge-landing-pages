import { StarDivider } from "@/components/ui/StarDivider";
import { VintageHeadline } from "@/components/ui/VintageHeadline";
import { formatPrice, type Product } from "@/lib/products";
import { PageContainer } from "@/components/ui/PageContainer";
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
    <section id="math" className="py-16 md:py-24 bg-cream">
      <PageContainer>
        <p className="section-label text-center">{content.eyebrow}</p>
        <StarDivider className="max-w-xs mx-auto" />
        <VintageHeadline
          as="h2"
          className="mt-4 text-center text-3xl md:text-4xl"
        >
          {content.headline}
        </VintageHeadline>
        <p className="mt-4 text-center text-navy/70 max-w-2xl mx-auto">
          {content.body}
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="card-parchment p-6 border-2 border-parchment-dark">
            <h3 className="font-display text-xl font-bold text-navy mb-1 uppercase">
              {content.modernTitle}
            </h3>
            <p className="text-xs uppercase tracking-widest text-navy/50 mb-4">
              {content.modernSubtitle}
            </p>
            <ul className="space-y-3">
              {content.modern.map((item) => (
                <li
                  key={item.label}
                  className="flex justify-between gap-4 border-b border-dashed border-parchment-dark pb-2 last:border-0"
                >
                  <span className="text-navy/80 text-sm">{item.label}</span>
                  <span className="text-red font-display font-bold text-sm shrink-0">
                    {item.cost}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card-parchment p-6 border-2 border-red/30 ring-1 ring-gold/30">
            <h3 className="font-display text-xl font-bold text-navy mb-1 uppercase">
              {content.vintageTitle}
            </h3>
            <p className="text-xs uppercase tracking-widest text-navy/50 mb-4">
              {content.vintageSubtitle}
            </p>
            <ul className="space-y-3">
              {content.vintage.map((item) => (
                <li
                  key={item.label}
                  className="flex justify-between gap-4 border-b border-dashed border-parchment-dark pb-2 last:border-0"
                >
                  <span className="text-navy/80 text-sm">{item.label}</span>
                  <span className="text-navy font-display font-bold text-sm shrink-0">
                    {item.cost}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-8 text-center text-navy/70 font-display">
          {formatContentTemplate(content.footer, {
            price: formatPrice(bundle.price),
          })}
        </p>
      </PageContainer>
    </section>
  );
}
