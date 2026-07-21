import { StarDivider } from "@/components/ui/StarDivider";
import { VintageHeadline } from "@/components/ui/VintageHeadline";
import type { HomePageContent } from "@/lib/site-content";

interface TestimonialsProps {
  content: HomePageContent["testimonials"];
}

export function Testimonials({ content }: TestimonialsProps) {
  return (
    <section className="py-16 md:py-24 bg-parchment-texture">
      <div className="w-full px-4 md:px-6">
        <p className="section-label text-center">{content.eyebrow}</p>
        <StarDivider className="max-w-xs mx-auto" />
        <VintageHeadline
          as="h2"
          className="mt-4 text-center text-3xl md:text-4xl"
        >
          {content.headline}
        </VintageHeadline>
        <p className="mt-4 text-center text-navy/70">
          {content.body}
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {content.items.map((t) => (
            <blockquote
              key={t.author}
              className="card-parchment p-6 flex flex-col border-2 border-parchment-dark"
            >
              <span
                className="text-red font-display text-4xl leading-none"
                aria-hidden
              >
                &ldquo;
              </span>
              <div className="text-red text-sm mb-2" aria-label={`${t.rating} stars`}>
                {"★".repeat(t.rating)}
              </div>
              <p className="text-navy/80 leading-relaxed flex-1 italic text-sm">
                {t.quote}
              </p>
              <footer className="mt-4 pt-4 border-t border-dashed border-parchment-dark">
                <p className="font-display font-bold text-navy uppercase text-sm">
                  {t.author}
                </p>
                <p className="text-xs text-navy/60 mt-1">
                  {t.location} &middot; {t.source}
                </p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
