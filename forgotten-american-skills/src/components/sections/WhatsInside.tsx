import Image from "next/image";
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
    <section id="inside" className="py-16 md:py-24 bg-parchment-texture">
      <div className="w-full px-4 md:px-6">
        <p className="section-label text-center">{content.eyebrow}</p>
        <StarDivider className="max-w-xs mx-auto" />
        <VintageHeadline
          as="h2"
          className="mt-4 text-center text-3xl md:text-4xl"
        >
          {formatContentTemplate(content.headline, {
            price: formatPrice(bundle.price),
          })}
        </VintageHeadline>
        <p className="mt-4 text-center text-navy/70 max-w-2xl mx-auto">
          {content.body}
        </p>

        <div className="mt-16 space-y-20">
          {individualBooks.map((book, index) => (
            <div
              key={book.slug}
              className={`grid gap-8 lg:grid-cols-2 lg:items-center ${
                index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="relative mx-auto w-full max-w-sm">
                <div className="book-pedestal rounded-t-lg">
                  <div className="parchment-frame rounded-sm overflow-hidden book-lift">
                    <Image
                      src={book.coverImage}
                      alt={book.title}
                      width={400}
                      height={533}
                      className="w-full h-auto cover-vintage"
                    />
                  </div>
                </div>
              </div>
              <div>
                <p className="pill-vintage inline-block mb-3">
                  {book.era} &middot; {book.recipeCount} {contentUnitLabel}
                </p>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-navy uppercase">
                  {book.title}
                </h3>
                <p className="mt-2 text-navy/70">{book.subtitle}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {book.themes.map((theme) => (
                    <span
                      key={theme}
                      className="bg-cream text-navy text-xs font-display font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm border border-parchment-dark"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
                <ul className="mt-6 space-y-2">
                  {book.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-2 text-navy/80 text-sm leading-relaxed"
                    >
                      <span className="text-red shrink-0 font-bold">★</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
