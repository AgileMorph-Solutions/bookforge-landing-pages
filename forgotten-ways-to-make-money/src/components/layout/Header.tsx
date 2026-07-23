import Link from "next/link";
import { BuyButton } from "@/components/commerce/BuyButton";
import { BrandSeal } from "@/components/ui/BrandSeal";
import { PageContainer } from "@/components/ui/PageContainer";
import { formatPrice, type Product } from "@/lib/products";
import type { NavLinkContent, SiteSettingsContent } from "@/lib/site-content";

interface HeaderProps {
  siteSettings: SiteSettingsContent;
  navLinks: NavLinkContent[];
  bundle: Product;
}

export function Header({ siteSettings, navLinks, bundle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-gold/40 bg-navy text-cream">
      <PageContainer className="flex items-center justify-between gap-4 py-4">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 leading-tight"
        >
          <BrandSeal size={40} logoUrl={siteSettings.logo} />
          <div className="flex flex-col">
            <span className="font-display text-base font-bold uppercase tracking-widest md:text-lg">
              {siteSettings.name}
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-gold-light">
              {siteSettings.tagline}
            </span>
          </div>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className={`font-body text-sm font-semibold uppercase tracking-widest transition-colors ${
                i === 0
                  ? "border-b border-gold pb-1 text-gold-light"
                  : "text-cream/70 hover:text-cream"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <BuyButton
          productSlug="bundle"
          variant="header"
          label={`Get the Library · ${formatPrice(bundle.price)}`}
          className="shrink-0"
        />
      </PageContainer>
    </header>
  );
}
