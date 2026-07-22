import Link from "next/link";
import type { SiteSettingsContent, StatContent } from "@/lib/site-content";
import { PageContainer } from "@/components/ui/PageContainer";

interface SocialProofProps {
  siteSettings: SiteSettingsContent;
}

export function SocialProof({ siteSettings }: SocialProofProps) {
  const stats: StatContent[] = [
    {
      value: siteSettings.youtubeSubscribers,
      label: "YouTube subscribers",
      href: siteSettings.youtubeUrl,
    },
    { value: `${siteSettings.averageRating} ★`, label: "Average rating" },
    { value: `${siteSettings.guaranteeDays}-Day`, label: "Money-back window" },
  ];

  return (
    <section className="border-y-2 border-parchment-dark bg-parchment-texture">
      <PageContainer className="py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat) => {
            const content = (
              <div className="card-parchment text-center py-6 px-4 border-2 border-navy/10">
                <p className="text-red text-xs mb-1 tracking-widest" aria-hidden>
                  ★★★★★
                </p>
                <p className="text-2xl md:text-3xl font-display font-bold text-navy">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-widest text-navy/60">
                  {stat.label}
                </p>
              </div>
            );

            return stat.href ? (
              <Link
                key={stat.label}
                href={stat.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:opacity-90 transition-opacity"
              >
                {content}
              </Link>
            ) : (
              <div key={stat.label}>{content}</div>
            );
          })}
        </div>
      </PageContainer>
    </section>
  );
}
