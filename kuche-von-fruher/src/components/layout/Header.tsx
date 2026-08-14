"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
  const [activeHref, setActiveHref] = useState(navLinks[0]?.href ?? "");

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.href.replace("#", "")))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveHref(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [navLinks]);

  return (
    <header className="sticky top-0 z-40 border-b border-red bg-navy text-cream">
      <PageContainer className="flex items-center justify-between gap-4 py-4">
        <Link href="/" className="flex shrink-0 items-center gap-4 leading-tight">
          <BrandSeal size={40} logoUrl={siteSettings.logo} />
          <div className="flex flex-col">
            <span className="font-display text-lg font-bold uppercase leading-tight tracking-widest text-cream md:text-xl">
              {siteSettings.name}
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-gold-light">
              {siteSettings.tagline}
            </span>
          </div>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`font-body text-sm font-semibold uppercase tracking-widest transition-colors ${
                activeHref === link.href
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
          label={`Zur Bibliothek · ${formatPrice(bundle.price)}`}
          className="shrink-0"
        />
      </PageContainer>
    </header>
  );
}
