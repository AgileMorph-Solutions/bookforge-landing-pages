import { Badge } from "@/components/ui/Badge";
import { BookCover } from "@/components/ui/BookCover";
import { PageContainer } from "@/components/ui/PageContainer";
import type { HomePageContent } from "@/lib/site-content";

interface RecipePreviewsProps {
  content: HomePageContent["recipePreviews"];
}

export function RecipePreviews({ content }: RecipePreviewsProps) {
  return (
    <section className="bg-wood-surface py-16 md:py-24">
      <PageContainer>
        <h2 className="text-center font-display text-3xl font-bold uppercase text-cream">
          {content.headline}
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {content.items.map((preview) => (
            <article
              key={preview.name}
              className="card-parchment flex h-full flex-col overflow-hidden"
            >
              <BookCover
                src={preview.image}
                alt={preview.name}
                variant="card"
              />
              <div className="flex flex-1 flex-col border-t-2 border-parchment-dark p-4">
                <Badge variant="vintage">{preview.era}</Badge>
                <h3 className="mt-2 font-display font-bold uppercase text-navy">
                  {preview.name}
                </h3>
                <p className="mt-1 text-sm text-navy/60">{preview.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
