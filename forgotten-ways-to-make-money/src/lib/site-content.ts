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
  seoTitle: "Forgotten Ways to Make Money Library · 5 Income & Ingenuity Guides",
  seoDescription: "Five income guides: 100 forgotten side-hustles, a $0-start business playbook, junk-to-cash reselling, boring repeat-customer businesses, and an over-50 side-hustle handbook. Instant PDF download.",
  ogImage: BUNDLE.coverImage,
};

export const fallbackHomePage: HomePageContent = {
  seoTitle: "Forgotten Ways to Make Money Library · 5 Income & Ingenuity Guides",
  seoDescription: "Five income guides: 100 forgotten side-hustles, a $0-start business playbook, junk-to-cash reselling, boring repeat-customer businesses, and an over-50 side-hustle handbook. Instant PDF download.",
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
    headlineStart: "Forgotten ways to earn.",
    headlineAccent: "",
    headlineEnd: "Written down before the algorithms bury them.",
    subheadline: heroCopy.subheadline,
    primaryCta: { label: heroCopy.primaryCta },
    secondaryCta: { label: heroCopy.secondaryCta, href: "#library" },
    badge: "All 5 Income Guides",
  },
  library: {
    eyebrow: "I. The Collection",
    headline: "Five guides. Five hundred forgotten ways to make money.",
    body: "Weekend side-hustles, $0-start service businesses, reselling, repeat-customer services, and flexible part-time work — every guide built for real households that need cash, not course hype.",
  },
  costComparison: {
    eyebrow: "II. Income Costs",
    headline: "What earning more costs now versus then.",
    body: "Earlier generations built income with local service, resourcefulness, and repeat customers — not subscription courses. Markets moved. The math of making money the hard way did not.",
    modernTitle: "How 2026 sells 'making money'",
    modernSubtitle: "Typical courses, apps, and side-hustle kits",
    vintageTitle: "How these guides teach earning",
    vintageSubtitle: "Same wallets, forgotten methods",
    modern: costComparison.modern,
    vintage: costComparison.vintage,
    footer: "The complete library is {price} once. Often less than a single online money course.",
  },
  whatsInside: {
    eyebrow: "III. Inside Each Book",
    headline: "Inside the {price} complete set",
    body: "Five hundred lessons across five guides. Each volume carries checklists, worksheets, step-by-step income plays, and the practical detail that rarely made a modern guru's funnel.",
  },
  recipePreviews: {
    headline: "A preview of what's in your income library.",
    items: recipePreviews,
  },
  testimonials: {
    eyebrow: "IV. From Real Earners",
    headline: "What readers put to work.",
    body: "4,820+ readers. Three wallets. Three different reasons they stopped chasing trends.",
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
    tagline: "Wealth · Ingenuity · Prosperity · Forgotten Ways to Make Money",
    disclaimer: "Income and business information for educational purposes. Results vary. Follow local laws, tax rules, and licensing requirements for any trade or service.",
    copyrightLine: "All rights reserved · For the builders who still believe wealth starts with ingenuity.",
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

