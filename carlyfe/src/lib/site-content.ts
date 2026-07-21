import {
  costComparison,
  guaranteeCopy,
  heroCopy,
  lastCallCopy,
  orderCopy,
  recipePreviews,
  siteConfig,
  youtubeSection,
} from "@/data/copy";
import { faqItems } from "@/data/faq";
import { testimonials } from "@/data/testimonials";
import { BUNDLE, INDIVIDUAL_BOOKS, formatPrice, type Product } from "@/lib/products";

export interface CtaContent {
  label: string;
  href?: string;
}

export interface NavLinkContent {
  label: string;
  href: string;
}

export interface StatContent {
  value: string;
  label: string;
  href?: string;
}

export interface ComparisonRowContent {
  label: string;
  cost: string;
}

export interface RecipePreviewContent {
  name: string;
  era: string;
  detail: string;
  bookSlug: string;
  image: string;
}

export interface TestimonialContent {
  quote: string;
  author: string;
  location: string;
  source: string;
  rating: number;
}

export interface FaqContent {
  question: string;
  answer: string;
}

export interface SiteSettingsContent {
  name: string;
  tagline: string;
  youtubeUrl: string;
  youtubeSubscribers: string;
  averageRating: string;
  readerCount: string;
  guaranteeDays: number;
  firstEditionSpotsLeft: number;
  contentUnitLabel: string;
  successDownloadLabel: string;
  bundlePriceEndAt: number;
  seoTitle: string;
  seoDescription: string;
  logo?: string;
  ogImage?: string;
}

export interface HomePageContent {
  seoTitle: string;
  seoDescription: string;
  countdownBanner: {
    label: string;
    prefix: string;
  };
  navigation: {
    links: NavLinkContent[];
  };
  hero: {
    eyebrow: string;
    headlineStart: string;
    headlineAccent: string;
    headlineEnd: string;
    subheadline: string;
    primaryCta: CtaContent;
    secondaryCta: CtaContent;
    badge: string;
  };
  library: {
    eyebrow: string;
    headline: string;
    body: string;
  };
  costComparison: {
    eyebrow: string;
    headline: string;
    body: string;
    modernTitle: string;
    modernSubtitle: string;
    vintageTitle: string;
    vintageSubtitle: string;
    modern: ComparisonRowContent[];
    vintage: ComparisonRowContent[];
    footer: string;
  };
  whatsInside: {
    eyebrow: string;
    headline: string;
    body: string;
  };
  recipePreviews: {
    headline: string;
    items: RecipePreviewContent[];
  };
  testimonials: {
    eyebrow: string;
    headline: string;
    body: string;
    items: TestimonialContent[];
  };
  youtube: {
    eyebrow: string;
    headline: string;
    body: string;
    stats: StatContent[];
    youtubeCtaLabel: string;
    purchaseCtaLabel: string;
  };
  guarantee: {
    eyebrow: string;
    headline: string;
    body: string;
    note: string;
  };
  order: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    individualNote: string;
    trustLine: string;
  };
  faq: {
    eyebrow: string;
    headline: string;
    items: FaqContent[];
  };
  lastCall: {
    eyebrow: string;
    headline: string;
    body: string;
    spotsLine: string;
    ctaLabel: string;
  };
  footer: {
    tagline: string;
    disclaimer: string;
    copyrightLine: string;
  };
}

export const fallbackSiteSettings: SiteSettingsContent = {
  ...siteConfig,
  seoTitle: "CARLYFE Smart Buyer Library · 5 Used-Car Guides",
  seoDescription: "Five used-car buying and ownership guides: inspection, senior driving, trucks, budget buying, and maintenance. Instant PDF download.",
  ogImage: BUNDLE.coverImage,
};

export const fallbackHomePage: HomePageContent = {
  seoTitle: "CARLYFE Smart Buyer Library · 5 Used-Car Guides",
  seoDescription: "Five used-car buying and ownership guides: inspection, senior driving, trucks, budget buying, and maintenance. Instant PDF download.",
  countdownBanner: {
    label: "First Edition Launch",
    prefix: "Promo ends in",
  },
  navigation: {
    links: [
      { href: "#library", label: "The Library" },
      { href: "#inside", label: "Inside" },
      { href: "#order", label: "Order" },
      { href: "#faq", label: "FAQ" },
    ],
  },
  hero: {
    eyebrow: siteConfig.name,
    headlineStart: "Buy the car that lasts.",
    headlineAccent: "",
    headlineEnd: "Not the one the dealer wants to move.",
    subheadline: heroCopy.subheadline,
    primaryCta: { label: heroCopy.primaryCta },
    secondaryCta: { label: heroCopy.secondaryCta, href: "#library" },
    badge: "All 5 Smart Buyer Guides",
  },
  library: {
    eyebrow: "I. The Collection",
    headline: "Five guides. Every step from lot to 400,000 miles.",
    body: "Inspection worksheets, negotiation scripts, and maintenance calendars — the same research behind CARLYFE's hidden-gem finds.",
  },
  costComparison: {
    eyebrow: "II. Ownership Costs",
    headline: "What a bad purchase costs now versus then.",
    body: "Smart buyers avoided dealer markup long before YouTube walkarounds. Market prices moved. The math of inspecting first did not.",
    modernTitle: "How 2026 sells used cars",
    modernSubtitle: "Typical dealer and repair costs",
    vintageTitle: "How these guides protect your wallet",
    vintageSubtitle: "Same market, smarter buying",
    modern: costComparison.modern,
    vintage: costComparison.vintage,
    footer: "The complete library is {price} once. Often less than a single surprise repair bill.",
  },
  whatsInside: {
    eyebrow: "III. Inside Each Book",
    headline: "Inside the {price} complete set",
    body: "Five hundred tips across five guides. Each volume carries inspection checklists, negotiation scripts, maintenance calendars, and the quiet lot-floor lesson that rarely makes a dealer brochure.",
  },
  recipePreviews: {
    headline: "A preview of what's in your smart-buyer library.",
    items: recipePreviews,
  },
  testimonials: {
    eyebrow: "IV. From Smart Buyers",
    headline: "What readers avoided paying.",
    body: "4,820+ readers. Three driveways. Three different reasons they buy smarter now.",
    items: testimonials,
  },
  youtube: {
    eyebrow: "V. Where It Comes From",
    headline: youtubeSection.headline,
    body: youtubeSection.body,
    stats: [
      { value: siteConfig.youtubeSubscribers, label: "Subscribers" },
      { value: "50M+", label: "Views" },
      { value: "Expert", label: "Research" },
    ],
    youtubeCtaLabel: "Watch on YouTube",
    purchaseCtaLabel: "Get the Library",
  },
  guarantee: {
    eyebrow: "Our Stand",
    headline: guaranteeCopy.headline,
    body: guaranteeCopy.body,
    note: "★ Covers single books and the full set ★",
  },
  order: {
    eyebrow: "VI. Get Your Set",
    headline: orderCopy.headline,
    subheadline: orderCopy.subheadline,
    individualNote: orderCopy.individualNote,
    trustLine: "Visa · Mastercard · Amex · Apple Pay",
  },
  faq: {
    eyebrow: "VII. Before You Buy",
    headline: "Questions before you buy.",
    items: faqItems,
  },
  lastCall: {
    eyebrow: "★ Last call ★",
    headline: lastCallCopy.headline,
    body: lastCallCopy.body,
    spotsLine: "{spots} First Edition spots left before the set moves to $59.",
    ctaLabel: "Get the Library",
  },
  footer: {
    tagline: "Buy Smart · Drive Long · CARLYFE",
    disclaimer: "Automotive information for educational purposes. Always have a qualified mechanic inspect any vehicle before purchase. Prices and availability vary by market.",
    copyrightLine: "All rights reserved · For the buyers who inspect before they sign.",
  },
};

export function formatContentTemplate(
  template: string,
  values: Record<string, string | number>
): string {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, String(value)),
    template
  );
}

export function formatCommerceCopy(
  template: string,
  bundle: Product,
  individualBooks: Product[]
): string {
  const currentSinglesTotal = individualBooks.reduce(
    (sum, product) => sum + product.price,
    0
  );
  const fallbackSinglesTotal = INDIVIDUAL_BOOKS.reduce(
    (sum, product) => sum + product.price,
    0
  );
  const fallbackSingleStart = Math.min(
    ...INDIVIDUAL_BOOKS.map((product) => product.price)
  );
  const currentSingleStart = Math.min(
    ...individualBooks.map((product) => product.price)
  );

  return formatContentTemplate(template, {
    price: formatPrice(bundle.price),
    bundlePrice: formatPrice(bundle.price),
    singlePrice: formatPrice(currentSingleStart),
    singlesTotal: formatPrice(currentSinglesTotal),
  })
    .replaceAll(formatPrice(BUNDLE.price), formatPrice(bundle.price))
    .replaceAll(formatPrice(fallbackSingleStart), formatPrice(currentSingleStart))
    .replaceAll(formatPrice(fallbackSinglesTotal), formatPrice(currentSinglesTotal));
}

