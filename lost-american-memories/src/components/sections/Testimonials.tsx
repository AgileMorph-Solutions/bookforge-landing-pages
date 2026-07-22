import { PageContainer } from "@/components/ui/PageContainer";
import { VintageHeadline } from "@/components/ui/VintageHeadline";
import type { HomePageContent } from "@/lib/site-content";

interface TestimonialsProps {
  content: HomePageContent["testimonials"];
}

export function Testimonials({ content }: TestimonialsProps) {
  return (
    <section className="bg-cream py-20 md:py-28">
      <PageContainer>
        <div className="mb-16 text-center">
          <span className="mb-4 block text-4xl text-red" aria-hidden>
            &ldquo;
          </span>
          <p className="section-label">{content.eyebrow}</p>
          <VintageHeadline as="h2" className="section-title mt-2">
            {content.headline}
          </VintageHeadline>
          <p className="landing-prose mt-4">{content.body}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {content.items.map((t) => (
            <blockquote
              key={t.author}
              className="flex h-full flex-col border border-[#e3beb8] bg-white p-8 italic"
            >
              <div
                className="mb-2 text-sm text-red not-italic"
                aria-label={`${t.rating} stars`}
              >
                {"★".repeat(t.rating)}
              </div>
              <p className="mb-6 flex-grow text-lg leading-relaxed text-ink">
                {t.quote}
              </p>
              <footer className="flex items-center gap-4 border-t border-[#e3beb8] pt-6 not-italic">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-parchment font-display text-sm font-bold text-red">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <span className="block font-bold text-ink">{t.author}</span>
                  <span className="text-xs uppercase tracking-widest text-[#5a403c]">
                    {t.location} &middot; {t.source}
                  </span>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
