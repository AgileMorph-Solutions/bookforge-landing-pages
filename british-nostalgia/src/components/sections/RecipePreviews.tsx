import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import type { HomePageContent } from "@/lib/site-content";

interface RecipePreviewsProps {
  content: HomePageContent["recipePreviews"];
}

export function RecipePreviews({ content }: RecipePreviewsProps) {
  return (
    <section className="py-16 md:py-24 bg-wood-surface">
      <div className="w-full px-4 md:px-6">
        <h2 className="text-center font-display text-3xl font-bold text-cream uppercase">
          {content.headline}
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {content.items.map((preview) => (
            <article
              key={preview.name}
              className="card-parchment overflow-hidden"
            >
              <div className="relative aspect-[4/3] bg-parchment">
                <Image
                  src={preview.image}
                  alt={preview.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-4 border-t-2 border-parchment-dark">
                <Badge variant="vintage">{preview.era}</Badge>
                <h3 className="mt-2 font-display font-bold text-navy uppercase">
                  {preview.name}
                </h3>
                <p className="mt-1 text-sm text-navy/60">{preview.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
