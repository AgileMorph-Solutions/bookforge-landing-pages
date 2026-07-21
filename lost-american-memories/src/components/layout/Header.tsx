import Link from "next/link";
import { BuyButton } from "@/components/commerce/BuyButton";
import { BrandSeal } from "@/components/ui/BrandSeal";
import { formatPrice, type Product } from "@/lib/products";
import type { NavLinkContent, SiteSettingsContent } from "@/lib/site-content";

interface HeaderProps {
  siteSettings: SiteSettingsContent;
  navLinks: NavLinkContent[];
  bundle: Product;
}

export function Header({ siteSettings, navLinks, bundle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-navy text-cream shadow-lg border-vintage-bottom">
      <div className="flex w-full items-center gap-4 px-4 py-3 md:px-6">
        <Link
          href="/"
          className="mr-auto flex shrink-0 items-center gap-3 leading-tight"
        >
          <BrandSeal size={36} />
          <div className="flex flex-col">
            <span className="font-display text-base md:text-lg font-bold tracking-wide uppercase">
              {siteSettings.name}
            </span>
            <span className="text-[0.65rem] text-cream/70 uppercase tracking-[0.2em]">
              {siteSettings.tagline}
            </span>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-1 text-xs uppercase tracking-widest">
          {navLinks.map((link, i) => (
            <span key={link.href} className="flex items-center">
              {i > 0 && (
                <span className="text-red mx-2 text-[0.5rem]" aria-hidden>
                  ★
                </span>
              )}
              <a
                href={link.href}
                className="text-cream/80 hover:text-cream transition-colors"
              >
                {link.label}
              </a>
            </span>
          ))}
        </nav>
        <BuyButton
          productSlug="bundle"
          label={`Get the Library · ${formatPrice(bundle.price)}`}
          className="text-xs py-2 px-3 md:text-sm md:px-4 shrink-0"
        />
      </div>
    </header>
  );
}
