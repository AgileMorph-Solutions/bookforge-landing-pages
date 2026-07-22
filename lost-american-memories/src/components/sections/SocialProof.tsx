import Link from "next/link";
import { PageContainer } from "@/components/ui/PageContainer";
import type { SiteSettingsContent, StatContent } from "@/lib/site-content";

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
    <section className="border-y border-parchment-dark bg-parchment">
      <PageContainer className="py-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat) => {
            const content = (
              <div className="card-parchment border border-[#e3beb8] px-4 py-6 text-center">
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
            );

            return stat.href ? (
              <Link
                key={stat.label}
                href={stat.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-opacity hover:opacity-90"
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
