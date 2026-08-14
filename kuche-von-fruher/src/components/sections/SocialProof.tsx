import { PageContainer } from "@/components/ui/PageContainer";
import type { SiteSettingsContent, StatContent } from "@/lib/site-content";

interface SocialProofProps {
  siteSettings: SiteSettingsContent;
}

export function SocialProof({ siteSettings }: SocialProofProps) {
  const stats: StatContent[] = [
    { value: `${siteSettings.averageRating} ★`, label: "Durchschnittliche Bewertung" },
    { value: `${siteSettings.guaranteeDays} Tage`, label: "Geld-zurück-Frist" },
  ];

  return (
    <section className="border-y border-parchment-dark bg-parchment">
      <PageContainer className="py-8">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-2">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="card-parchment border border-[#e3beb8] px-4 py-6 text-center"
            >
              <p className="mb-1 text-xs tracking-widest text-red" aria-hidden>
                ★★★★★
              </p>
              <p className="font-display text-2xl font-bold text-ink md:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest text-[#5a403c]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
