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
  contentUnitLabel: string;
  successDownloadLabel: string;
  logo?: string;
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
  seoTitle: "Forgotten American Skills Master Library · 5 Practical Manuals",
  seoDescription: "Five skills manuals: old-timer handbook, vanishing trades, hand-tool repair, food preservation, and frontier camping. Instant PDF download.",
  ogImage: BUNDLE.coverImage,
};

export const fallbackHomePage: HomePageContent = {
  seoTitle: "Forgotten American Skills Master Library · 5 Practical Manuals",
  seoDescription: "Five skills manuals: old-timer handbook, vanishing trades, hand-tool repair, food preservation, and frontier camping. Instant PDF download.",
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
    headlineStart: "The skills America forgot.",
    headlineAccent: "",
    headlineEnd: "Taught the way old-timers passed them down.",
    subheadline: heroCopy.subheadline,
    primaryCta: { label: heroCopy.primaryCta },
    secondaryCta: { label: heroCopy.secondaryCta, href: "#library" },
    badge: "All 5 Skills Manuals",
  },
  library: {
    eyebrow: "I. The Collection",
    headline: "Five manuals. Five hundred skills for camp, home, workshop & homestead.",
    body: "Old-timer handbook, vanishing trades, hand-tool repair, food preservation, and frontier camping — every guide built for self-reliance with simple tools.",
  },
  costComparison: {
    eyebrow: "II. Skills Costs",
    headline: "What practical know-how costs now versus then.",
    body: "Old-timers learned by doing — without weekend workshops, contractor calls, or big-box tool mistakes. Store prices moved. The math of self-reliance did not.",
    modernTitle: "How 2026 sells practical skills",
    modernSubtitle: "Typical classes, kits, and service calls",
    vintageTitle: "How these manuals teach you",
    vintageSubtitle: "Same skills, simple tools, lasting value",
    modern: costComparison.modern,
    vintage: costComparison.vintage,
    footer: "The complete library is {price} once. Often less than a single weekend class or repair call.",
  },
  whatsInside: {
    eyebrow: "III. Inside Each Book",
    headline: "Inside the {price} complete set",
    body: "Five hundred skills across five manuals. Each guide carries step-by-step instructions, checklists, and the quiet frontier tip that rarely made it into a modern how-to blog.",
  },
  recipePreviews: {
    headline: "A preview of what's in your skills library.",
    items: recipePreviews,
  },
  testimonials: {
    eyebrow: "IV. From Workshops & Homesteads",
    headline: "What readers put into practice.",
    body: "4,820+ readers. Three workshops. Three different reasons they stopped paying for what their grandparents knew free.",
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
    tagline: "Craft · Tradition · Resilience · Forgotten American Skills",
    disclaimer: "Skills and preservation information for educational purposes. Follow local laws and safety guidelines. Verify food, water, and tool safety practices for your region.",
    copyrightLine: "All rights reserved · For the hands that still believe in craft, tradition, and resilience.",
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

