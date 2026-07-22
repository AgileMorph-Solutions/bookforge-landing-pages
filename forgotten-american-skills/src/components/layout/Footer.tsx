import Link from "next/link";
import { BrandSeal } from "@/components/ui/BrandSeal";
import { PageContainer } from "@/components/ui/PageContainer";
import type {
  HomePageContent,
  NavLinkContent,
  SiteSettingsContent,
} from "@/lib/site-content";

interface FooterProps {
  siteSettings: SiteSettingsContent;
  footer: HomePageContent["footer"];
  navLinks: NavLinkContent[];
}

export function Footer({ siteSettings, footer, navLinks }: FooterProps) {
  return (
    <footer>
      {/* Navy branding bar — matches cover bottom banner */}
      <div className="bg-navy border-vintage-top py-6 text-center">
        <div className="flex items-center justify-center gap-3">
          <span className="text-red text-sm" aria-hidden>
            ★
          </span>
          <p className="font-display text-lg md:text-xl font-bold text-cream uppercase tracking-widest">
            {siteSettings.name}
          </p>
          <span className="text-red text-sm" aria-hidden>
            ★
          </span>
        </div>
        <p className="mt-2 text-xs text-cream/70 uppercase tracking-[0.15em]">
          {footer.tagline}
        </p>
      </div>

      {/* Wood strip + disclaimer */}
      <div className="bg-wood-surface py-10">
        <PageContainer>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
            <div className="flex items-center gap-3">
              <BrandSeal size={48} logoUrl={siteSettings.logo} />
              <div>
                <p className="font-display text-lg font-bold text-cream">
                  {siteSettings.name}
                </p>
                <p className="text-sm text-cream/60">
                  {siteSettings.tagline} &middot; Edition MMXXVI &middot; No. I
                </p>
              </div>
            </div>
            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-cream/80">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-cream transition-colors uppercase tracking-wider text-xs"
                >
                  {link.label}
                </a>
              ))}
              <Link
                href={siteSettings.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cream transition-colors uppercase tracking-wider text-xs"
              >
                YouTube
              </Link>
            </nav>
          </div>
          <p className="mt-8 text-xs text-cream/50 leading-relaxed max-w-3xl">
            {footer.disclaimer}
          </p>
          <p className="mt-4 text-xs text-cream/40">
            &copy; 2026 {siteSettings.name} &middot; {footer.copyrightLine}
          </p>
        </PageContainer>
      </div>
    </footer>
  );
}
