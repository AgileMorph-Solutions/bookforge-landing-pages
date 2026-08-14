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
  seoTitle: "Küche von Früher — Deutsche Kochbuch-Sammlung",
  seoDescription: "Drei deutsche Kochbücher: Arme-Leute-Küche, Gaststätten-Klassiker und Omas Sonntagstafel. Sofortiger PDF-Download.",
  ogImage: BUNDLE.coverImage,
};

export const fallbackHomePage: HomePageContent = {
  seoTitle: "Küche von Früher — Deutsche Kochbuch-Sammlung",
  seoDescription: "Drei deutsche Kochbücher: Arme-Leute-Küche, Gaststätten-Klassiker und Omas Sonntagstafel. Sofortiger PDF-Download.",
  countdownBanner: {
    label: "First-Edition-Start",
    prefix: "Aktion endet in",
  },
  navigation: {
    links: [
      { href: "#library", label: "Die Bibliothek" },
      { href: "#inside", label: "Inhalt" },
      { href: "#order", label: "Bestellen" },
      { href: "#faq", label: "FAQ" },
    ],
  },
  hero: {
    eyebrow: siteConfig.name,
    headlineStart: "Die Gerichte, die Deutschland vergessen hat.",
    headlineAccent: "",
    headlineEnd: "Neu gekocht für Ihre Küche.",
    subheadline: heroCopy.subheadline,
    primaryCta: { label: heroCopy.primaryCta },
    secondaryCta: { label: heroCopy.secondaryCta, href: "#library" },
    badge: "Enthält alle 3 Kochbücher",
  },
  library: {
    eyebrow: "I. Die Sammlung",
    headline: "Drei Kochbücher. Hundertfünfzig vergessene deutsche Rezepte.",
    body: "Von Omas Arme-Leute-Küche bis zur Sonntagstafel — jedes Rezept recherchiert und für heutige Küchen aufbereitet.",
  },
  costComparison: {
    eyebrow: "II. Was ein Teller kostet",
    headline: "Was ein Teller heute kostet — verglichen mit früher.",
    body: "Diese Küchen ernährten ganze Haushalte, als das Geld knapp war. Die Preise im Laden haben sich verändert. Die Mathematik des Streckens eines Vorratsschranks nicht.",
    modernTitle: "Was 2026 zum Abendessen verkauft",
    modernSubtitle: "Eine typische Woche, pro Teller",
    vintageTitle: "Wie diese Kochbücher es auf den Teller bringen",
    vintageSubtitle: "Dieselbe Woche, zu Hause gekocht",
    modern: costComparison.modern,
    vintage: costComparison.vintage,
    footer: "Das komplette Set kostet einmalig {price}. Oft weniger als eine einzige Woche Lieferdienst.",
  },
  whatsInside: {
    eyebrow: "III. In jedem Buch",
    headline: "Im {price} Komplettset enthalten",
    body: "Hundertfünfzig Rezepte aus drei Kochbüchern. Jeder Eintrag trägt seine Entstehungszeit, ein passendes Bild, eine ungefähre Einkaufskosten-Angabe für heute und den stillen Küchentipp, der selten auf der getippten Rezeptkarte stand.",
  },
  recipePreviews: {
    headline: "Ein Vorgeschmack auf das, was in Ihrer Küche wartet.",
    items: recipePreviews,
  },
  testimonials: {
    eyebrow: "IV. Aus ihren Küchen",
    headline: "Was am Ende auf ihrem Tisch landete.",
    body: "4,820+ Leser. Drei Küchen. Drei verschiedene Gründe, warum sie geblieben sind.",
    items: testimonials,
  },
  youtube: {
    eyebrow: "V. Die Quelle",
    headline: youtubeSection.headline,
    body: youtubeSection.body,
    stats: [
      { value: siteConfig.youtubeSubscribers, label: "Abonnenten" },
      { value: "50M+", label: "Aufrufe" },
      { value: "Expert", label: "Recherche" },
    ],
    youtubeCtaLabel: "Auf YouTube ansehen",
    purchaseCtaLabel: "Zur Bibliothek",
  },
  guarantee: {
    eyebrow: "Unser Versprechen",
    headline: guaranteeCopy.headline,
    body: guaranteeCopy.body,
    note: "★ Gilt für Einzelbücher und das Komplettset ★",
  },
  order: {
    eyebrow: "V. Jetzt bestellen",
    headline: orderCopy.headline,
    subheadline: orderCopy.subheadline,
    individualNote: orderCopy.individualNote,
    trustLine: "Visa · Mastercard · Amex · Apple Pay",
  },
  faq: {
    eyebrow: "VI. Vor dem Kauf",
    headline: "Fragen, bevor Sie kochen.",
    items: faqItems,
  },
  lastCall: {
    eyebrow: "★ Letzter Aufruf ★",
    headline: lastCallCopy.headline,
    body: lastCallCopy.body,
    spotsLine: "{spots} First-Edition-Plätze übrig, bevor das Set auf 49,99 € steigt.",
    ctaLabel: "Zur Bibliothek",
  },
  footer: {
    tagline: "Deutsche Rezepte · Alte Traditionen · Echte Küche von Früher",
    disclaimer: "Historische Rezepte, angepasst für heutige Küchen. Zutatenverfügbarkeit und Zubereitung können variieren.",
    copyrightLine: "Alle Rechte vorbehalten · Für die Köche, die das Abendessen auf den Tisch brachten und nie eine Rezeptkarte getippt haben.",
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

