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
    <section id="library" className="bg-cream py-20 md:py-28">
      <PageContainer>
        <div className="mb-16 text-center">
          <p className="section-label">{content.eyebrow}</p>
          <StarDivider className="mx-auto mt-4 max-w-md" />
          <VintageHeadline as="h2" className="section-title mt-4">
            {content.headline}
          </VintageHeadline>
          <p className="landing-prose mx-auto mt-4 max-w-2xl">
            {content.body}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {individualBooks.map((book) => (
            <ProductCard key={book.slug} product={book} contentUnitLabel={contentUnitLabel} />
          ))}
          <ProductCard product={bundle} featured contentUnitLabel={contentUnitLabel} />
        </div>
      </PageContainer>
    </section>
  );
}
