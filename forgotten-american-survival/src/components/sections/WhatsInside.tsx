import { BookCover } from "@/components/ui/BookCover";
import { PageContainer } from "@/components/ui/PageContainer";
import { StarDivider } from "@/components/ui/StarDivider";
import { VintageHeadline } from "@/components/ui/VintageHeadline";
import { formatPrice, type Product } from "@/lib/products";
import {
  formatContentTemplate,
  type HomePageContent,
  type SiteSettingsContent,
} from "@/lib/site-content";

interface WhatsInsideProps {
  content: HomePageContent["whatsInside"];
  individualBooks: Product[];
  bundle: Product;
  contentUnitLabel: SiteSettingsContent["contentUnitLabel"];
}

export function WhatsInside({
  content,
  individualBooks,
  bundle,
  contentUnitLabel,
}: WhatsInsideProps) {
  return (
    <section id="inside" className="bg-parchment-texture py-16 md:py-24">
      <PageContainer>
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-label">{content.eyebrow}</p>
          <StarDivider className="mx-auto mt-2 max-w-xs" />
          <VintageHeadline as="h2" className="section-title mt-4">
            {formatContentTemplate(content.headline, {
              price: formatPrice(bundle.price),
            })}
          </VintageHeadline>
          <p className="landing-prose mt-4 text-navy/70">{content.body}</p>
        </div>

        <div className="mt-14 space-y-10 md:mt-16 md:space-y-12">
          {individualBooks.map((book) => (
            <article
              key={book.slug}
              className="card-parchment overflow-hidden border border-parchment-dark/60 px-6 py-8 sm:px-8 sm:py-10"
            >
              <div className="grid items-start gap-8 lg:grid-cols-[minmax(260px,300px)_1fr] lg:gap-10">
                <div className="mx-auto w-full max-w-[280px] lg:mx-0 lg:max-w-none">
                  <BookCover
                    src={book.coverImage}
                    alt={book.title}
                    variant="feature"
                  />
                </div>
                <div className="min-w-0">
                  <p className="pill-vintage mb-4 inline-block">
                    {book.era} &middot; {book.recipeCount} {contentUnitLabel}
                  </p>
                  <h3 className="font-display text-2xl font-bold uppercase leading-tight text-navy md:text-3xl">
                    {book.title}
                  </h3>
                  <p className="landing-prose mt-3 md:text-lg">
                    {book.subtitle}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {book.themes.map((theme) => (
                      <span
                        key={theme}
                        className="rounded-sm border border-parchment-dark bg-cream px-3 py-1 font-display text-xs font-bold uppercase tracking-wider text-navy"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                  <ul className="mt-7 space-y-3 border-t border-parchment-dark/40 pt-6">
                    {book.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-3 text-sm leading-relaxed text-navy/85 md:text-base"
                      >
                        <span className="shrink-0 font-bold text-red">★</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
