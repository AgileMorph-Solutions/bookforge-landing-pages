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
  bundlePriceEndAt: number;
  seoTitle: string;
  seoDescription: string;
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
  seoTitle:
    "Lost American Memories Cookbook Library · 500 Nostalgic American Recipes",
  seoDescription:
    "Five cookbooks and 500 nostalgic American dishes — drawn from family papers, church-kitchen binders, and attic card files. Every recipe re-cooked in a modern kitchen.",
  ogImage: BUNDLE.coverImage,
};

export const fallbackHomePage: HomePageContent = {
  seoTitle: fallbackSiteSettings.seoTitle,
  seoDescription: fallbackSiteSettings.seoDescription,
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
    headlineStart: "The recipes she made",
    headlineAccent: "from memory.",
    headlineEnd: "Finally written down.",
    subheadline: heroCopy.subheadline,
    primaryCta: { label: heroCopy.primaryCta },
    secondaryCta: { label: heroCopy.secondaryCta, href: "#library" },
    badge: "Includes All 5 Cookbooks",
  },
  library: {
    eyebrow: "I. The Collection",
    headline: "Five volumes. Five hundred plates of American home cooking.",
    body:
      "Every dish photographed, every batch tried in a modern kitchen, every plate tagged with a rough 2026 grocery cost. Choose the era that tastes like where you grew up.",
  },
  costComparison: {
    eyebrow: "II. Plate Costs",
    headline: "What a plate costs now versus then.",
    body:
      "These cooks fed households when money ran thin. Store prices moved. The math of stretching a pantry did not.",
    modernTitle: "How 2026 sells dinner",
    modernSubtitle: "A typical week, per plate",
    vintageTitle: "How these cookbooks plate it",
    vintageSubtitle: "Same week, cooked at home",
    modern: costComparison.modern,
    vintage: costComparison.vintage,
    footer: "The complete set is {price} once. Often less than a single week of takeout.",
  },
  whatsInside: {
    eyebrow: "III. Inside Each Book",
    headline: "Inside the {price} complete set",
    body:
      "Five hundred recipes across five books. Each entry carries its decade, a photo when we could make it look right, a ballpark grocery cost for today, and the quiet kitchen tip that rarely made the typed card.",
  },
  recipePreviews: {
    headline: "A taste of what's waiting in your kitchen.",
    items: recipePreviews,
  },
  testimonials: {
    eyebrow: "IV. From Their Kitchens",
    headline: "What ended up on their tables.",
    body: `${siteConfig.readerCount} readers. Three kitchens. Three different reasons they stayed.`,
    items: testimonials,
  },
  youtube: {
    eyebrow: "V. Where It Comes From",
    headline: youtubeSection.headline,
    body: youtubeSection.body,
    stats: [
      { value: siteConfig.youtubeSubscribers, label: "Subscribers" },
      { value: "50M+", label: "Views" },
      { value: "1932–85", label: "Sourced from" },
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
    headline: "Questions before you cook.",
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
    tagline: "Nostalgic Recipes · Timeless Memories · Real American Comfort",
    disclaimer:
      "Dishes drawn from family papers, church-kitchen binders, attic card files, and clipped magazine pages spanning the early thirties to the mid-eighties. Re-cooked in a modern kitchen for available ingredients and normal home ovens. Your store prices and tools will vary.",
    copyrightLine:
      "All rights reserved · For the cooks who kept dinner on the table and never typed a recipe card.",
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

