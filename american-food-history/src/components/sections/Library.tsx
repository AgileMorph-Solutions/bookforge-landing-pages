import { ProductCard } from "@/components/commerce/ProductCard";
import { StarDivider } from "@/components/ui/StarDivider";
import { VintageHeadline } from "@/components/ui/VintageHeadline";
import type { Product } from "@/lib/products";
import type { HomePageContent, SiteSettingsContent } from "@/lib/site-content";

interface LibraryProps {
  content: HomePageContent["library"];
  individualBooks: Product[];
  bundle: Product;
  contentUnitLabel: SiteSettingsContent["contentUnitLabel"];
}

export function Library({ content, individualBooks, bundle, contentUnitLabel }: LibraryProps) {
  return (
    <section id="library" className="py-16 md:py-24 bg-parchment-texture">
      <div className="w-full px-4 md:px-6">
        <p className="section-label text-center">{content.eyebrow}</p>
        <StarDivider className="max-w-xs mx-auto" />
        <VintageHeadline
          as="h2"
          className="mt-4 text-center text-3xl md:text-4xl max-w-3xl mx-auto"
        >
          {content.headline}
        </VintageHeadline>
        <p className="mt-4 text-center text-navy/70 max-w-2xl mx-auto">
          {content.body}
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {individualBooks.map((book) => (
            <ProductCard key={book.slug} product={book} contentUnitLabel={contentUnitLabel} />
          ))}
          <ProductCard product={bundle} featured contentUnitLabel={contentUnitLabel} />
        </div>
      </div>
    </section>
  );
}
