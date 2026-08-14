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
    <footer className="border-t border-[#e3beb8] bg-parchment">
      <PageContainer className="flex flex-col items-start justify-between gap-12 py-20 md:flex-row md:items-center">
        <div>
          <p className="font-display text-2xl font-bold text-red md:text-[2rem]">
            {siteSettings.name}
          </p>
          <p className="mt-2 max-w-xs font-body text-base text-[#5a403c]">
            {footer.tagline}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-12 text-left sm:grid-cols-3">
          <div className="flex flex-col gap-3">
            <h4 className="mb-2 font-body text-sm font-bold uppercase tracking-widest text-ink">
              Bibliothek
            </h4>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[#5a403c] underline decoration-red/30 transition-colors hover:text-red"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="mb-2 font-body text-sm font-bold uppercase tracking-widest text-ink">
              Über uns
            </h4>
            <a
              href="#faq"
              className="text-[#5a403c] underline decoration-red/30 transition-colors hover:text-red"
            >
              FAQ
            </a>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="mb-2 font-body text-sm font-bold uppercase tracking-widest text-ink">
              Support
            </h4>
            <a
              href="#order"
              className="text-[#5a403c] underline decoration-red/30 transition-colors hover:text-red"
            >
              Bestellen
            </a>
            <a
              href="#faq"
              className="text-[#5a403c] underline decoration-red/30 transition-colors hover:text-red"
            >
              Garantie
            </a>
          </div>
        </div>
      </PageContainer>
      <PageContainer className="border-t border-[#e3beb8]/30 pb-8 pt-8">
        <p className="font-body text-xs uppercase tracking-widest text-[#5a403c]">
          Mit Sorgfalt erstellt 2026 &copy; {siteSettings.name} &middot;{" "}
          {footer.copyrightLine}
        </p>
        <p className="mt-3 max-w-3xl text-xs leading-relaxed text-[#5a403c]/70">
          {footer.disclaimer}
        </p>
      </PageContainer>
    </footer>
  );
}
