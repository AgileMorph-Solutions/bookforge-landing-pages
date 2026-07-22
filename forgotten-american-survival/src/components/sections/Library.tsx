import { ProductCard } from "@/components/commerce/ProductCard";
import { PageContainer } from "@/components/ui/PageContainer";
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
      <PageContainer>
        <p className="section-label text-center">{content.eyebrow}</p>
        <StarDivider className="max-w-xs mx-auto" />
        <VintageHeadline
          as="h2"
          className="section-title mt-4 mx-auto max-w-3xl text-center"
        >
          {content.headline}
        </VintageHeadline>
        <p className="landing-prose mt-4 mx-auto max-w-2xl text-center text-navy/70">
          {content.body}
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {individualBooks.map((book) => (
            <ProductCard key={book.slug} product={book} contentUnitLabel={contentUnitLabel} />
          ))}
          <ProductCard product={bundle} featured contentUnitLabel={contentUnitLabel} />
        </div>
      </PageContainer>
    </section>
  );
}
