/**
 * Bootstrap channel-specific landing sites from the lost-american-memories template.
 * Run: npx tsx scripts/bootstrap-channel-sites.ts
 */
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";

const ROOT = path.resolve(__dirname, "..");
const BOOKS = path.join(ROOT, "books");

type BookDef = {
  slug: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  price: number;
  compareAt: number;
  pdfBasename?: string;
  era?: string;
  themes: string[];
  highlights: string[];
};

type ChannelTheme = "cookbook" | "survival" | "home-savings" | "automotive" | "weapons" | "skills";

type SiteContentSections = {
  heroBadge: string;
  costEyebrow: string;
  costHeadline: string;
  costBody: string;
  modernTitle: string;
  modernSubtitle: string;
  vintageTitle: string;
  vintageSubtitle: string;
  costFooter: string;
  whatsInsideBody: string;
  previewHeadline: string;
  testimonialsEyebrow: string;
  testimonialsHeadline: string;
  testimonialsBody: string;
  faqHeadline: string;
  copyrightLine: string;
  guaranteeHeadline: string;
  contentUnitLabel: string;
  successDownloadLabel: string;
  productPdfDescription: string;
};

type ChannelConfig = {
  slug: string;
  theme: ChannelTheme;
  booksFolder: string;
  name: string;
  tagline: string;
  youtubeUrl: string;
  youtubeSubscribers: string;
  currency: "usd" | "gbp";
  bundlePrice: number;
  bundleCompareAt: number;
  bundleTitle: string;
  bundleSubtitle: string;
  books: BookDef[];
  hero: { headline: string; subheadline: string };
  youtubeBody: string;
  seoTitle: string;
  seoDescription: string;
  footerTagline: string;
  footerDisclaimer: string;
  costModern: { label: string; cost: string }[];
  costVintage: { label: string; cost: string }[];
  orderHeadline: string;
  orderSubheadline: string;
  orderIndividualNote: string;
  lastCallHeadline: string;
  lastCallBody: string;
  libraryHeadline: string;
  libraryBody: string;
  faqProductType: string;
  /** When source PNG order differs from book order (e.g. bundle graphic is image 3 of 6). */
  coverSlotMap?: { books: number[]; bundle: number };
};

function generateSiteContentSections(config: ChannelConfig): SiteContentSections {
  const readerCount = "4,820+";

  const byTheme: Record<ChannelTheme, SiteContentSections> = {
    cookbook: {
      heroBadge: "Includes All 5 Cookbooks",
      costEyebrow: "II. Plate Costs",
      costHeadline: "What a plate costs now versus then.",
      costBody:
        "These cooks fed households when money ran thin. Store prices moved. The math of stretching a pantry did not.",
      modernTitle: "How 2026 sells dinner",
      modernSubtitle: "A typical week, per plate",
      vintageTitle: "How these cookbooks plate it",
      vintageSubtitle: "Same week, cooked at home",
      costFooter:
        "The complete set is {price} once. Often less than a single week of takeout.",
      whatsInsideBody:
        "Five hundred recipes across five books. Each entry carries its decade, a photo when we could make it look right, a ballpark grocery cost for today, and the quiet kitchen tip that rarely made the typed card.",
      previewHeadline: "A taste of what's waiting in your kitchen.",
      testimonialsEyebrow: "IV. From Their Kitchens",
      testimonialsHeadline: "What ended up on their tables.",
      testimonialsBody: `${readerCount} readers. Three kitchens. Three different reasons they stayed.`,
      faqHeadline: "Questions before you cook.",
      copyrightLine:
        "All rights reserved · For the cooks who kept dinner on the table and never typed a recipe card.",
      guaranteeHeadline: "The First Plate Promise",
      contentUnitLabel: "recipes",
      successDownloadLabel: "Download your cookbooks below.",
      productPdfDescription:
        "Paid cookbook PDF. The website serves this only through the protected download API.",
    },
    survival: {
      heroBadge: "All 5 Preparedness Manuals",
      costEyebrow: "II. Preparedness Costs",
      costHeadline: "What readiness costs now versus then.",
      costBody:
        "Frontier families prepared without big-box kits or consultant fees. Store prices moved. The math of self-reliance did not.",
      modernTitle: "How 2026 sells preparedness",
      modernSubtitle: "Typical retail emergency spending",
      vintageTitle: "How these manuals prepare you",
      vintageSubtitle: "Same threats, self-reliant approach",
      costFooter:
        "The complete library is {price} once. Often less than a single commercial emergency kit.",
      whatsInsideBody:
        "Five hundred lessons across five manuals. Each guide carries checklists, step-by-step plans, storage layouts, and the quiet frontier tip that rarely made it into a modern prep blog.",
      previewHeadline: "A preview of what's in your preparedness library.",
      testimonialsEyebrow: "IV. From Prepared Households",
      testimonialsHeadline: "What readers put into practice.",
      testimonialsBody: `${readerCount} readers. Three households. Three different reasons they stayed prepared.`,
      faqHeadline: "Questions before you buy.",
      copyrightLine:
        "All rights reserved · For the families who prepare before they need to.",
      guaranteeHeadline: "The 30-Day Promise",
      contentUnitLabel: "lessons",
      successDownloadLabel: "Download your manuals below.",
      productPdfDescription:
        "Paid guide PDF. The website serves this only through the protected download API.",
    },
    "home-savings": {
      heroBadge: "All 5 Home-Savings Guides",
      costEyebrow: "II. Household Costs",
      costHeadline: "What home fixes cost now versus then.",
      costBody:
        "These households stretched every dollar when prices climbed. Store shelves changed. The math of fixing it yourself did not.",
      modernTitle: "How 2026 sells home fixes",
      modernSubtitle: "Typical retail and service costs",
      vintageTitle: "How these guides save at home",
      vintageSubtitle: "Same problems, pantry-staple solutions",
      costFooter:
        "The complete library is {price} once. Often less than a single emergency repair call.",
      whatsInsideBody:
        "Five hundred hacks across five guides. Each volume carries room-by-room fixes, checklists, shopping lists, and the quiet household tip that rarely made it into a product ad.",
      previewHeadline: "A preview of what's waiting in your home-savings library.",
      testimonialsEyebrow: "IV. From Real Households",
      testimonialsHeadline: "What readers saved this month.",
      testimonialsBody: `${readerCount} readers. Three homes. Three different reasons they stopped overpaying.`,
      faqHeadline: "Questions before you buy.",
      copyrightLine:
        "All rights reserved · For the households that fix it before they replace it.",
      guaranteeHeadline: "The 30-Day Promise",
      contentUnitLabel: "hacks",
      successDownloadLabel: "Download your guides below.",
      productPdfDescription:
        "Paid guide PDF. The website serves this only through the protected download API.",
    },
    automotive: {
      heroBadge: "All 5 Smart Buyer Guides",
      costEyebrow: "II. Ownership Costs",
      costHeadline: "What a bad purchase costs now versus then.",
      costBody:
        "Smart buyers avoided dealer markup long before YouTube walkarounds. Market prices moved. The math of inspecting first did not.",
      modernTitle: "How 2026 sells used cars",
      modernSubtitle: "Typical dealer and repair costs",
      vintageTitle: "How these guides protect your wallet",
      vintageSubtitle: "Same market, smarter buying",
      costFooter:
        "The complete library is {price} once. Often less than a single surprise repair bill.",
      whatsInsideBody:
        "Five hundred tips across five guides. Each volume carries inspection checklists, negotiation scripts, maintenance calendars, and the quiet lot-floor lesson that rarely makes a dealer brochure.",
      previewHeadline: "A preview of what's in your smart-buyer library.",
      testimonialsEyebrow: "IV. From Smart Buyers",
      testimonialsHeadline: "What readers avoided paying.",
      testimonialsBody: `${readerCount} readers. Three driveways. Three different reasons they buy smarter now.`,
      faqHeadline: "Questions before you buy.",
      copyrightLine:
        "All rights reserved · For the buyers who inspect before they sign.",
      guaranteeHeadline: "The 30-Day Promise",
      contentUnitLabel: "tips",
      successDownloadLabel: "Download your guides below.",
      productPdfDescription:
        "Paid guide PDF. The website serves this only through the protected download API.",
    },
    weapons: {
      heroBadge: "All 5 Collector Guides",
      costEyebrow: "II. Collector Costs",
      costHeadline: "What misidentification costs now versus then.",
      costBody:
        "Collectors documented arms carefully long before auction apps. Market prices moved. The math of verifying provenance did not.",
      modernTitle: "How 2026 sells reference material",
      modernSubtitle: "Typical collector and appraisal costs",
      vintageTitle: "How this archive protects you",
      vintageSubtitle: "Same pieces, museum-grade research",
      costFooter:
        "The complete archive is {price} once. Often less than a single misidentified purchase.",
      whatsInsideBody:
        "Five comprehensive guides across five volumes. Each entry carries identification tables, era context, documentation templates, and the quiet collector note that rarely makes a gun-show flyer.",
      previewHeadline: "A preview of what's in your historical archive.",
      testimonialsEyebrow: "IV. From Collectors",
      testimonialsHeadline: "What readers reference before they buy.",
      testimonialsBody: `${readerCount} readers. Three collections. Three different reasons they trust the research.`,
      faqHeadline: "Questions before you buy.",
      copyrightLine:
        "All rights reserved · For the collectors who document before they display.",
      guaranteeHeadline: "The 30-Day Promise",
      contentUnitLabel: "entries",
      successDownloadLabel: "Download your guides below.",
      productPdfDescription:
        "Paid guide PDF. The website serves this only through the protected download API.",
    },
    skills: {
      heroBadge: "All 5 Skills Manuals",
      costEyebrow: "II. Skills Costs",
      costHeadline: "What practical know-how costs now versus then.",
      costBody:
        "Old-timers learned by doing — without weekend workshops, contractor calls, or big-box tool mistakes. Store prices moved. The math of self-reliance did not.",
      modernTitle: "How 2026 sells practical skills",
      modernSubtitle: "Typical classes, kits, and service calls",
      vintageTitle: "How these manuals teach you",
      vintageSubtitle: "Same skills, simple tools, lasting value",
      costFooter:
        "The complete library is {price} once. Often less than a single weekend class or repair call.",
      whatsInsideBody:
        "Five hundred skills across five manuals. Each guide carries step-by-step instructions, checklists, and the quiet frontier tip that rarely made it into a modern how-to blog.",
      previewHeadline: "A preview of what's in your skills library.",
      testimonialsEyebrow: "IV. From Workshops & Homesteads",
      testimonialsHeadline: "What readers put into practice.",
      testimonialsBody: `${readerCount} readers. Three workshops. Three different reasons they stopped paying for what their grandparents knew free.`,
      faqHeadline: "Questions before you buy.",
      copyrightLine:
        "All rights reserved · For the hands that still believe in craft, tradition, and resilience.",
      guaranteeHeadline: "The Craftsman's Promise",
      contentUnitLabel: "skills",
      successDownloadLabel: "Download your manuals below.",
      productPdfDescription:
        "Paid skills manual PDF. The website serves this only through the protected download API.",
    },
  };

  return byTheme[config.theme];
}

function slugifyPdf(title: string): string {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") + ".pdf"
  );
}

function findCoverImages(folder: string): string[] {
  const files = readdirSync(folder)
    .filter((f) => f.endsWith(".png"))
    .sort((a, b) => {
      const na = parseInt(a.match(/\((\d+)\)/)?.[1] ?? "0", 10);
      const nb = parseInt(b.match(/\((\d+)\)/)?.[1] ?? "0", 10);
      return na - nb;
    });
  return files.map((f) => path.join(folder, f));
}

function findPdf(folder: string, hint: string): string | undefined {
  const files = readdirSync(folder).filter((f) => f.endsWith(".pdf"));
  const lower = hint.toLowerCase();
  return files.find((f) => f.toLowerCase().includes(lower.slice(0, 20)));
}

function priceSymbol(currency: "usd" | "gbp") {
  return currency === "gbp" ? "£" : "$";
}

function generateProductsTs(config: ChannelConfig): string {
  const slugs = config.books.map((b) => `"${b.slug}"`).join("\n  | ");
  const bookEntries = config.books
    .map(
      (b) => `  {
    slug: "${b.slug}",
    title: ${JSON.stringify(b.title)},
    shortTitle: ${JSON.stringify(b.shortTitle)},
    subtitle: ${JSON.stringify(b.subtitle)},
    price: ${b.price},
    compareAt: ${b.compareAt},
    coverImage: "/images/covers/${b.slug}.png",
    pdfFilename: ${JSON.stringify(b.pdfBasename ?? "")},
    recipeCount: 100,
    era: ${b.era ? JSON.stringify(b.era) : "undefined"},
    themes: ${JSON.stringify(b.themes)},
    highlights: ${JSON.stringify(b.highlights)},
  }`
    )
    .join(",\n");

  const singlesTotal = config.books.reduce((s, b) => s + b.compareAt, 0);

  return `export type ProductSlug =
  | ${slugs}
  | "bundle";

export interface Product {
  slug: ProductSlug;
  title: string;
  shortTitle: string;
  subtitle: string;
  price: number;
  compareAt: number;
  coverImage: string;
  pdfFilename: string;
  recipeCount: number;
  highlights: string[];
  era?: string;
  themes: string[];
}

export const CHECKOUT_CURRENCY = "${config.currency}" as "usd" | "gbp";

export const INDIVIDUAL_BOOKS: Product[] = [
${bookEntries},
];

export const BUNDLE: Product = {
  slug: "bundle",
  title: ${JSON.stringify(config.bundleTitle)},
  shortTitle: "Complete Library",
  subtitle: ${JSON.stringify(config.bundleSubtitle)},
  price: ${config.bundlePrice},
  compareAt: ${config.bundleCompareAt},
  coverImage: "/images/covers/bundle.png",
  pdfFilename: "",
  recipeCount: ${config.books.length * 100},
  themes: ["Complete Collection", "Best Value"],
  highlights: [
    "All five guides in one purchase",
    "Instant PDF download on any device",
    "Share with family members freely",
    "First Edition pricing — best value",
    "Lifetime access to your download",
  ],
};

export const ALL_PRODUCTS: Product[] = [...INDIVIDUAL_BOOKS, BUNDLE];

export function getProductBySlug(slug: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.slug === slug);
}

export function formatPrice(amount: number): string {
  return CHECKOUT_CURRENCY === "gbp" ? \`£\${amount}\` : \`$\${amount}\`;
}

export function getBundleValueStack(
  products: Product[] = INDIVIDUAL_BOOKS
): { label: string; value: number }[] {
  return [
    ...products.map((b) => ({
      label: b.shortTitle,
      value: b.compareAt,
    })),
    { label: "Family Sharing License", value: ${config.currency === "gbp" ? 15 : 19} },
    { label: "First Edition Lifetime Updates", value: ${config.currency === "gbp" ? 17 : 21} },
  ];
}
`;
}

function generateCopyTs(config: ChannelConfig): string {
  const sym = priceSymbol(config.currency);
  const singleStart = Math.min(...config.books.map((b) => b.price));
  const singlesTotal = config.books.reduce((s, b) => s + b.price, 0);
  const sections = generateSiteContentSections(config);

  const previews = config.books.slice(0, 4).map((b, i) => ({
    name: b.shortTitle,
    era: b.era ?? "Classic",
    detail: b.themes[0] ?? "Practical guide",
    bookSlug: b.slug,
    image: `/images/covers/${b.slug}.png`,
  }));

  return `export const siteConfig = {
  name: ${JSON.stringify(config.name)},
  tagline: ${JSON.stringify(config.tagline)},
  youtubeUrl: ${JSON.stringify(config.youtubeUrl)},
  youtubeSubscribers: ${JSON.stringify(config.youtubeSubscribers)},
  averageRating: "4.9",
  readerCount: "4,820+",
  guaranteeDays: 30,
  firstEditionSpotsLeft: 180,
  bundlePriceEndAt: 5000,
  contentUnitLabel: ${JSON.stringify(sections.contentUnitLabel)},
  successDownloadLabel: ${JSON.stringify(sections.successDownloadLabel)},
};

export const heroCopy = {
  headline: ${JSON.stringify(config.hero.headline)},
  subheadline: ${JSON.stringify(config.hero.subheadline)},
  primaryCta: "Get the Library",
  secondaryCta: "Browse the collection",
};

export const costComparison = {
  modern: ${JSON.stringify(config.costModern)},
  vintage: ${JSON.stringify(config.costVintage)},
};

export const recipePreviews = ${JSON.stringify(previews, null, 2).replace(/"bookSlug": "([^"]+)"/g, 'bookSlug: "$1" as const')};

export const youtubeSection = {
  headline: "Built from real research. Not recycled listicles.",
  body: ${JSON.stringify(config.youtubeBody)},
};

export const guaranteeCopy = {
  headline: ${JSON.stringify(sections.guaranteeHeadline)},
  body: "You get a full month. Try the guides. If they never earn their keep — one email gets a full refund. Keep every book. No returns. No fine print.",
};

export const orderCopy = {
  headline: ${JSON.stringify(config.orderHeadline)},
  subheadline: ${JSON.stringify(config.orderSubheadline)},
  individualNote:
    "Want only one volume? Singles start at ${sym}${singleStart}. Buying all five alone adds up to ${sym}${singlesTotal} — which is why most people take the full set at ${sym}${config.bundlePrice}.",
};

export const lastCallCopy = {
  headline: ${JSON.stringify(config.lastCallHeadline)},
  body: ${JSON.stringify(config.lastCallBody)},
};
`;
}

function generateFaqTs(config: ChannelConfig): string {
  const sym = priceSymbol(config.currency);
  return `export interface FAQItem {
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    question: "Are these practical guides or just nostalgia content?",
    answer:
      "Practical. Every guide is written for real households — step-by-step instructions, checklists, and tips you can use this week. ${config.name} builds on the same research behind the YouTube channel.",
  },
  {
    question: "I'm on a tight budget. Is the bundle worth it?",
    answer:
      "The bundle at ${sym}${config.bundlePrice} saves money versus buying each guide separately. Use even one tip from the set and it often pays for itself within the month.",
  },
  {
    question: "How does the download work?",
    answer:
      "After payment, you receive an email with download links within about a minute. PDFs open on phone, tablet, or computer. Print any page you want.",
  },
  {
    question: "Can I share with family?",
    answer:
      "Yes — pass the files to relatives in your household. These guides are meant to be used and shared.",
  },
  {
    question: "What if I change my mind?",
    answer:
      "Thirty-day full refund with one email. You keep every ${config.faqProductType}.",
  },
];
`;
}

function generateTestimonialsTs(config: ChannelConfig): string {
  const b0 = config.books[0];
  const b1 = config.books[1];
  const b2 = config.books[2];
  return `export interface Testimonial {
  quote: string;
  author: string;
  location: string;
  source: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "I picked up ${b0.shortTitle} first and had results the same afternoon. Ordered the full library before the week was out.",
    author: "Robert M.",
    location: "Phoenix, AZ",
    source: ${JSON.stringify(b0.title)},
    rating: 5,
  },
  {
    quote:
      "Clear, no-nonsense writing. Exactly what I expected from ${config.name} — useful from page one.",
    author: "Susan K.",
    location: "Nashville, TN",
    source: ${JSON.stringify(b1.title)},
    rating: 5,
  },
  {
    quote:
      "The bundle paid for itself faster than I thought. ${b2.shortTitle} alone was worth the purchase.",
    author: "James & Linda W.",
    location: "Columbus, OH",
    source: ${JSON.stringify(b2.title)},
    rating: 5,
  },
];
`;
}

function patchSiteContent(projectDir: string, config: ChannelConfig) {
  const file = path.join(projectDir, "src/lib/site-content.ts");
  let content = readFileSync(file, "utf8");
  const sym = priceSymbol(config.currency);
  const sections = generateSiteContentSections(config);
  const headlineParts = config.hero.headline.split(".");
  const headlineStart = headlineParts[0] + ".";
  const headlineEnd = headlineParts.length > 1 ? headlineParts.slice(1).join(".").trim() : "";

  content = content.replace(
    /export const fallbackSiteSettings: SiteSettingsContent = \{[\s\S]*?\n\};/,
    `export const fallbackSiteSettings: SiteSettingsContent = {
  ...siteConfig,
  seoTitle: ${JSON.stringify(config.seoTitle)},
  seoDescription: ${JSON.stringify(config.seoDescription)},
  ogImage: BUNDLE.coverImage,
};`
  );

  content = content.replace(
    /export const fallbackHomePage: HomePageContent = \{[\s\S]*?\n\};/,
    `export const fallbackHomePage: HomePageContent = {
  seoTitle: ${JSON.stringify(config.seoTitle)},
  seoDescription: ${JSON.stringify(config.seoDescription)},
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
    headlineStart: ${JSON.stringify(headlineStart)},
    headlineAccent: "",
    headlineEnd: ${JSON.stringify(headlineEnd)},
    subheadline: heroCopy.subheadline,
    primaryCta: { label: heroCopy.primaryCta },
    secondaryCta: { label: heroCopy.secondaryCta, href: "#library" },
    badge: ${JSON.stringify(sections.heroBadge)},
  },
  library: {
    eyebrow: "I. The Collection",
    headline: ${JSON.stringify(config.libraryHeadline)},
    body: ${JSON.stringify(config.libraryBody)},
  },
  costComparison: {
    eyebrow: ${JSON.stringify(sections.costEyebrow)},
    headline: ${JSON.stringify(sections.costHeadline)},
    body: ${JSON.stringify(sections.costBody)},
    modernTitle: ${JSON.stringify(sections.modernTitle)},
    modernSubtitle: ${JSON.stringify(sections.modernSubtitle)},
    vintageTitle: ${JSON.stringify(sections.vintageTitle)},
    vintageSubtitle: ${JSON.stringify(sections.vintageSubtitle)},
    modern: costComparison.modern,
    vintage: costComparison.vintage,
    footer: ${JSON.stringify(sections.costFooter)},
  },
  whatsInside: {
    eyebrow: "III. Inside Each Book",
    headline: "Inside the {price} complete set",
    body: ${JSON.stringify(sections.whatsInsideBody)},
  },
  recipePreviews: {
    headline: ${JSON.stringify(sections.previewHeadline)},
    items: recipePreviews,
  },
  testimonials: {
    eyebrow: ${JSON.stringify(sections.testimonialsEyebrow)},
    headline: ${JSON.stringify(sections.testimonialsHeadline)},
    body: ${JSON.stringify(sections.testimonialsBody)},
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
    headline: ${JSON.stringify(sections.faqHeadline)},
    items: faqItems,
  },
  lastCall: {
    eyebrow: "★ Last call ★",
    headline: lastCallCopy.headline,
    body: lastCallCopy.body,
    spotsLine: "{spots} First Edition spots left before the set moves to ${sym}${config.bundlePrice}.",
    ctaLabel: "Get the Library",
  },
  footer: {
    tagline: ${JSON.stringify(config.footerTagline)},
    disclaimer: ${JSON.stringify(config.footerDisclaimer)},
    copyrightLine: ${JSON.stringify(sections.copyrightLine)},
  },
};`
  );

  if (!content.includes("contentUnitLabel: string;")) {
    content = content.replace(
      /bundlePriceEndAt: number;/,
      "bundlePriceEndAt: number;\n  contentUnitLabel: string;\n  successDownloadLabel: string;\n  logo?: string;"
    );
  } else if (!content.includes("logo?: string;")) {
    content = content.replace(
      /seoDescription: string;/,
      "seoDescription: string;\n  logo?: string;"
    );
  }

  writeFileSync(file, content);
}

function patchCheckoutRoute(projectDir: string) {
  const file = path.join(projectDir, "src/app/api/checkout/route.ts");
  let content = readFileSync(file, "utf8");
  if (!content.includes("CHECKOUT_CURRENCY")) {
    content = content.replace(
      'import type { ProductSlug } from "@/lib/products";',
      'import { CHECKOUT_CURRENCY, type ProductSlug } from "@/lib/products";'
    );
    content = content.replace('currency: "usd",', "currency: CHECKOUT_CURRENCY,");
    writeFileSync(file, content);
  }
}

function patchMigrateScript(projectDir: string, config: ChannelConfig) {
  const file = path.join(projectDir, "scripts/migrate-local-content-to-sanity.ts");
  let content = readFileSync(file, "utf8");
  const coverMap = config.books
    .map((b) => `  "${b.slug}": "${b.slug}.png",`)
    .concat(['  bundle: "bundle.png",'])
    .join("\n");

  content = content.replace(
    /const coverFiles: Record<string, string> = \{[\s\S]*?\};/,
    `const coverFiles: Record<string, string> = {\n${coverMap}\n};`
  );
  content = content.replace(
    /return uploadAsset\("image", path\.join\(root, "assets", filename\)\);/,
    'return uploadAsset("image", path.join(root, "public", "images", "covers", filename), { force: true });'
  );
  content = content.replace(
    /return uploadAsset\("image", path\.join\(root, "public", "images", "covers", filename\)\);/,
    'return uploadAsset("image", path.join(root, "public", "images", "covers", filename), { force: true });'
  );
  if (!content.includes("options?: { force?: boolean }")) {
    content = content.replace(
      /async function uploadAsset\(type: "image" \| "file", filePath: string\) \{\s*const filename = path\.basename\(filePath\);\s*const existingId = await findAssetId\(type, filename\);\s*if \(existingId\) return existingId;/,
      `async function uploadAsset(
  type: "image" | "file",
  filePath: string,
  options?: { force?: boolean }
) {
  const filename = path.basename(filePath);
  if (!options?.force) {
    const existingId = await findAssetId(type, filename);
    if (existingId) return existingId;
  }`
    );
  }
  content = content.replace(
    'return uploadAsset("image", filePath);',
    'return uploadAsset("image", filePath, { force: true });'
  );
  content = content.replace(
    'return uploadAsset("image", path.join(root, "public", "images", "logo.png"));',
    'return uploadAsset("image", path.join(root, "public", "images", "logo.png"), { force: true });'
  );
  content = content.replace(
    /value: "1932–85", label: "Sourced from"/g,
    `value: "Expert", label: "Research"`
  );
  if (content.includes("const transaction = client.transaction();") && !content.includes("individualTransaction")) {
    content = content.replace(
      `  const transaction = client.transaction();
  for (const product of productDocs) {
    transaction.createOrReplace(product);
  }
  await transaction.commit();
}`,
      `  const individuals = productDocs.filter((product) => product.slug.current !== "bundle");
  const bundle = productDocs.find((product) => product.slug.current === "bundle");

  const individualTransaction = client.transaction();
  for (const product of individuals) {
    individualTransaction.createOrReplace(product);
  }
  await individualTransaction.commit();

  if (bundle) {
    await client.createOrReplace(bundle);
  }
}`
    );
  }
  writeFileSync(file, content);
}

function patchProductSchema(projectDir: string, config: ChannelConfig) {
  const file = path.join(projectDir, "src/sanity/schemaTypes/product.ts");
  if (!existsSync(file)) return;
  const sections = generateSiteContentSections(config);
  let content = readFileSync(file, "utf8");
  content = content.replace(
    /description: "Paid cookbook PDF\.[^"]*"/,
    `description: ${JSON.stringify(sections.productPdfDescription)}`
  );
  writeFileSync(file, content);
}

function patchSuccessContent(projectDir: string, config: ChannelConfig) {
  const file = path.join(projectDir, "src/app/success/SuccessContent.tsx");
  if (!existsSync(file)) return;
  const sections = generateSiteContentSections(config);
  let content = readFileSync(file, "utf8");
  content = content.replace(
    /Download your cookbooks below\./,
    sections.successDownloadLabel
  );
  content = content.replace(
    /Download your guides below\./,
    sections.successDownloadLabel
  );
  content = content.replace(
    /\{book\.recipeCount\} recipes/g,
    "{book.recipeCount} {siteConfig.contentUnitLabel}"
  );
  if (!content.includes('from "@/data/copy"')) {
    content = content.replace(
      'import type { Product } from "@/lib/products";',
      'import type { Product } from "@/lib/products";\nimport { siteConfig } from "@/data/copy";'
    );
  }
  writeFileSync(file, content);
}

function patchProductCard(projectDir: string) {
  const file = path.join(projectDir, "src/components/commerce/ProductCard.tsx");
  if (!existsSync(file)) return;
  let content = readFileSync(file, "utf8");
  if (content.includes("contentUnitLabel")) return;

  content = content.replace(
    /interface ProductCardProps \{[\s\S]*?\}/,
    `interface ProductCardProps {
  product: Product;
  featured?: boolean;
  contentUnitLabel: string;
}`
  );
  content = content.replace(
    "export function ProductCard({ product, featured = false }: ProductCardProps)",
    "export function ProductCard({ product, featured = false, contentUnitLabel }: ProductCardProps)"
  );
  content = content.replace(
    "{product.recipeCount} RECIPES",
    "{product.recipeCount} {contentUnitLabel.toUpperCase()}"
  );
  writeFileSync(file, content);
}

function patchLibrary(projectDir: string) {
  const file = path.join(projectDir, "src/components/sections/Library.tsx");
  if (!existsSync(file)) return;
  let content = readFileSync(file, "utf8");
  if (content.includes("contentUnitLabel")) return;

  content = content.replace(
    'import type { HomePageContent } from "@/lib/site-content";',
    'import type { HomePageContent, SiteSettingsContent } from "@/lib/site-content";'
  );
  content = content.replace(
    /interface LibraryProps \{[\s\S]*?\}/,
    `interface LibraryProps {
  content: HomePageContent["library"];
  individualBooks: Product[];
  bundle: Product;
  contentUnitLabel: SiteSettingsContent["contentUnitLabel"];
}`
  );
  content = content.replace(
    "export function Library({ content, individualBooks, bundle }: LibraryProps)",
    "export function Library({ content, individualBooks, bundle, contentUnitLabel }: LibraryProps)"
  );
  content = content.replace(
    '<ProductCard key={book.slug} product={book} />',
    "<ProductCard key={book.slug} product={book} contentUnitLabel={contentUnitLabel} />"
  );
  content = content.replace(
    "<ProductCard product={bundle} featured />",
    "<ProductCard product={bundle} featured contentUnitLabel={contentUnitLabel} />"
  );
  writeFileSync(file, content);
}

function patchHeroTexture(projectDir: string) {
  const heroFile = path.join(projectDir, "src/components/sections/Hero.tsx");
  const cssFile = path.join(projectDir, "src/app/globals.css");
  const shellFile = path.join(projectDir, "src/components/ui/SectionShell.tsx");

  for (const file of [heroFile, cssFile, shellFile]) {
    if (!existsSync(file)) continue;
    let content = readFileSync(file, "utf8");
    content = content.replace(/bg-hero-kitchen/g, "bg-hero-texture");
    writeFileSync(file, content);
  }
}

function patchWhatsInside(projectDir: string) {
  const file = path.join(projectDir, "src/components/sections/WhatsInside.tsx");
  if (!existsSync(file)) return;
  let content = readFileSync(file, "utf8");
  if (content.includes("contentUnitLabel")) return;

  content = content.replace(
    'import {\n  formatContentTemplate,\n  type HomePageContent,\n} from "@/lib/site-content";',
    'import {\n  formatContentTemplate,\n  type HomePageContent,\n  type SiteSettingsContent,\n} from "@/lib/site-content";'
  );
  content = content.replace(
    /interface WhatsInsideProps \{[\s\S]*?\}/,
    `interface WhatsInsideProps {
  content: HomePageContent["whatsInside"];
  individualBooks: Product[];
  bundle: Product;
  contentUnitLabel: SiteSettingsContent["contentUnitLabel"];
}`
  );
  content = content.replace(
    "export function WhatsInside({\n  content,\n  individualBooks,\n  bundle,\n}: WhatsInsideProps)",
    "export function WhatsInside({\n  content,\n  individualBooks,\n  bundle,\n  contentUnitLabel,\n}: WhatsInsideProps)"
  );
  content = content.replace(
    "{book.recipeCount} recipes",
    "{book.recipeCount} {contentUnitLabel}"
  );
  writeFileSync(file, content);
}

function patchSanityLogoSupport(projectDir: string) {
  const queriesFile = path.join(projectDir, "src/sanity/lib/queries.ts");
  if (!existsSync(queriesFile)) return;
  let queries = readFileSync(queriesFile, "utf8");
  if (!queries.includes('"logo": logo.asset->url')) {
    queries = queries.replace(
      /"ogImage": ogImage\.asset->url/,
      `"logo": logo.asset->url,\n    "ogImage": ogImage.asset->url`
    );
    writeFileSync(queriesFile, queries);
  }

  const siteContentFile = path.join(projectDir, "src/lib/site-content.ts");
  let siteContent = readFileSync(siteContentFile, "utf8");
  if (!siteContent.includes("logo?: string")) {
    siteContent = siteContent.replace(
      /ogImage\?: string;/,
      "logo?: string;\n  ogImage?: string;"
    );
    writeFileSync(siteContentFile, siteContent);
  }

  const brandSealFile = path.join(projectDir, "src/components/ui/BrandSeal.tsx");
  let brandSeal = readFileSync(brandSealFile, "utf8");
  if (!brandSeal.includes("logoUrl")) {
    brandSeal = brandSeal.replace(
      "interface BrandSealProps {\n  size?: number;\n  className?: string;\n}",
      "interface BrandSealProps {\n  size?: number;\n  className?: string;\n  logoUrl?: string;\n}"
    );
    brandSeal = brandSeal.replace(
      'export function BrandSeal({ size = 40, className = "" }: BrandSealProps)',
      'export function BrandSeal({ size = 40, className = "", logoUrl }: BrandSealProps)'
    );
    brandSeal = brandSeal.replace(
      'src="/images/logo.png"',
      'src={logoUrl ?? "/images/logo.png"}'
    );
    writeFileSync(brandSealFile, brandSeal);
  }

  const headerFile = path.join(projectDir, "src/components/layout/Header.tsx");
  let header = readFileSync(headerFile, "utf8");
  if (!header.includes("logo={siteSettings.logo}")) {
    header = header.replace(
      "<BrandSeal size={36} />",
      "<BrandSeal size={36} logoUrl={siteSettings.logo} />"
    );
    writeFileSync(headerFile, header);
  }

  const pageFile = path.join(projectDir, "src/app/page.tsx");
  if (existsSync(pageFile)) {
    let page = readFileSync(pageFile, "utf8");
    if (!page.includes("contentUnitLabel={siteSettings.contentUnitLabel}")) {
      page = page.replace(
        /(<WhatsInside\s+content=\{homePage\.whatsInside\}\s+individualBooks=\{individualBooks\}\s+bundle=\{bundle\}\s*\/>)/,
        "<WhatsInside\n        content={homePage.whatsInside}\n        individualBooks={individualBooks}\n        bundle={bundle}\n        contentUnitLabel={siteSettings.contentUnitLabel}\n      />"
      );
    }
    if (!page.match(/<Library[\s\S]*?contentUnitLabel=\{siteSettings\.contentUnitLabel\}/)) {
      page = page.replace(
        /<Library\s*\n\s*content=\{homePage\.library\}\s*\n\s*individualBooks=\{individualBooks\}\s*\n\s*bundle=\{bundle\}\s*\n\s*\/>/,
        "<Library\n        content={homePage.library}\n        individualBooks={individualBooks}\n        bundle={bundle}\n        contentUnitLabel={siteSettings.contentUnitLabel}\n      />"
      );
    }
    writeFileSync(pageFile, page);
  }
}

function setupAssets(projectDir: string, booksFolder: string, config: ChannelConfig) {
  const srcFolder = path.join(BOOKS, booksFolder);
  const coversDir = path.join(projectDir, "public/images/covers");
  const assetsDir = path.join(projectDir, "assets");
  const imagesDir = path.join(projectDir, "public/images");
  mkdirSync(coversDir, { recursive: true });
  mkdirSync(assetsDir, { recursive: true });
  mkdirSync(imagesDir, { recursive: true });

  const coverImages = findCoverImages(srcFolder);
  const bookSlots =
    config.coverSlotMap?.books ?? config.books.map((_, index) => index);
  const bundleSlot = config.coverSlotMap?.bundle ?? 5;

  config.books.forEach((book, i) => {
    const slot = bookSlots[i];
    if (slot !== undefined && coverImages[slot]) {
      copyFileSync(coverImages[slot], path.join(coversDir, `${book.slug}.png`));
    }
  });
  if (coverImages[bundleSlot]) {
    copyFileSync(coverImages[bundleSlot], path.join(coversDir, "bundle.png"));
  }
  if (coverImages[0]) {
    copyFileSync(coverImages[0], path.join(imagesDir, "logo.png"));
    copyFileSync(coverImages[0], path.join(imagesDir, "brand-seal-source.png"));
    const iconPath = path.join(projectDir, "src/app/icon.png");
    mkdirSync(path.dirname(iconPath), { recursive: true });
    copyFileSync(coverImages[0], iconPath);
  }

  for (const book of config.books) {
    if (!book.pdfBasename) continue;
    const pdfSrc = findPdf(srcFolder, book.title) ?? findPdf(srcFolder, book.slug);
    if (pdfSrc) {
      copyFileSync(path.join(srcFolder, pdfSrc), path.join(assetsDir, book.pdfBasename));
    }
  }
}

function bootstrapSite(config: ChannelConfig) {
  const projectDir = path.join(ROOT, config.slug);
  if (!existsSync(projectDir)) {
    console.error(`Missing project dir: ${projectDir}`);
    return;
  }

  console.log(`\nBootstrapping ${config.slug}...`);

  writeFileSync(path.join(projectDir, "src/lib/products.ts"), generateProductsTs(config));
  writeFileSync(path.join(projectDir, "src/data/copy.ts"), generateCopyTs(config));
  writeFileSync(path.join(projectDir, "src/data/faq.ts"), generateFaqTs(config));
  writeFileSync(path.join(projectDir, "src/data/testimonials.ts"), generateTestimonialsTs(config));

  patchSiteContent(projectDir, config);
  patchCheckoutRoute(projectDir);
  patchMigrateScript(projectDir, config);
  patchProductSchema(projectDir, config);
  patchSuccessContent(projectDir, config);
  patchHeroTexture(projectDir);
  patchWhatsInside(projectDir);
  patchProductCard(projectDir);
  patchLibrary(projectDir);
  patchSanityLogoSupport(projectDir);
  setupAssets(projectDir, config.booksFolder, config);

  const pkg = JSON.parse(readFileSync(path.join(projectDir, "package.json"), "utf8"));
  pkg.name = `${config.slug}-landing`;
  writeFileSync(path.join(projectDir, "package.json"), JSON.stringify(pkg, null, 2) + "\n");

  let sanityConfig = readFileSync(path.join(projectDir, "sanity.config.ts"), "utf8");
  sanityConfig = sanityConfig.replace(/title: "[^"]*"/, `title: ${JSON.stringify(config.name)}`);
  writeFileSync(path.join(projectDir, "sanity.config.ts"), sanityConfig);

  let brandSeal = readFileSync(path.join(projectDir, "src/components/ui/BrandSeal.tsx"), "utf8");
  brandSeal = brandSeal.replace(/alt="[^"]*"/, `alt=${JSON.stringify(config.name)}`);
  writeFileSync(path.join(projectDir, "src/components/ui/BrandSeal.tsx"), brandSeal);

  let readme = readFileSync(path.join(projectDir, "README.md"), "utf8");
  readme = readme.replace(/# Lost American Memories[^#]*/m, `# ${config.name} — Landing Page\n\nSales landing page for [${config.name}](${config.youtubeUrl}).\n\n`);
  writeFileSync(path.join(projectDir, "README.md"), readme);

  // Clear old Sanity project ID so each site gets its own
  let envExample = readFileSync(path.join(projectDir, ".env.example"), "utf8");
  envExample = envExample.replace(
    /NEXT_PUBLIC_SANITY_PROJECT_ID=.*/,
    "NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id"
  );
  writeFileSync(path.join(projectDir, ".env.example"), envExample);

  console.log(`  ✓ ${config.slug} customized`);
}

const CHANNELS: ChannelConfig[] = [
  {
    slug: "stop-wasting-stuff",
    theme: "home-savings",
    booksFolder: "Stop wasting stuff",
    name: "Stop Wasting Stuff",
    tagline: "A Home-Savings Library",
    youtubeUrl: "https://www.youtube.com/channel/UCFNWzOwiK6wmSQpBPG_ZP9Q",
    youtubeSubscribers: "59.4K",
    currency: "usd",
    bundlePrice: 59,
    bundleCompareAt: 175,
    bundleTitle: "The Stop Wasting Stuff Home-Savings Library",
    bundleSubtitle:
      "All 5 money-saving home guides in one complete bundle — cleaning, fixes, pest control, reuse, and maintenance",
    books: [
      {
        slug: "hydrogen-peroxide-homeowner-bible",
        title: "The Hydrogen Peroxide Homeowner Bible",
        shortTitle: "Hydrogen Peroxide Bible",
        subtitle:
          "101 Cheap Cleaning, Drain, Laundry, Garden & Pest-Control Uses",
        price: 19,
        compareAt: 39,
        era: "Home Hacks",
        themes: ["Cleaning", "Laundry", "Garden"],
        highlights: [
          "Drain and grout fixes without harsh chemicals",
          "Laundry brightening on a shoestring",
          "Garden and pest uses from one bottle",
          "Replace expensive single-purpose cleaners",
          "Step-by-step for every room in the house",
        ],
      },
      {
        slug: "baking-soda-vinegar-salt-manual",
        title: "The Baking Soda, Vinegar & Salt Fix-It Manual",
        shortTitle: "Baking Soda & Vinegar Manual",
        subtitle:
          "150 Low-Cost Home Hacks That Replace Expensive Products",
        price: 27,
        compareAt: 49,
        era: "Pantry Fixes",
        themes: ["DIY", "Cleaning", "Repairs"],
        highlights: [
          "Pantry staples that replace store-bought products",
          "Kitchen, bath, and laundry fixes",
          "Safe alternatives to harsh chemicals",
          "150 tested household hacks",
          "Costs pennies per use",
        ],
      },
      {
        slug: "cheap-pest-proof-home",
        title: "The Cheap Pest-Proof Home",
        shortTitle: "Pest-Proof Home",
        subtitle:
          "Safe DIY Prevention for Ants, Roaches, Flies, Mosquitoes & More",
        price: 27,
        compareAt: 49,
        era: "Prevention",
        themes: ["Pest Control", "Safety", "Prevention"],
        highlights: [
          "Block entry points before you spray",
          "Safe deterrents for common pests",
          "Seasonal prevention checklists",
          "No expensive exterminator visits",
          "Family-safe methods throughout",
        ],
      },
      {
        slug: "stop-throwing-it-away",
        title: "Stop Throwing It Away",
        shortTitle: "Stop Throwing It Away",
        subtitle:
          "100 Ways to Reuse, Repurpose & Regrow Everyday Household Items",
        price: 27,
        compareAt: 49,
        era: "Reuse",
        themes: ["Reuse", "Repurpose", "Regrow"],
        highlights: [
          "Turn jars, boxes, and scraps into useful tools",
          "Regrow groceries from kitchen scraps",
          "Cut waste and save on replacements",
          "100 practical reuse projects",
          "Works with what you already own",
        ],
      },
      {
        slug: "five-dollar-home-maintenance",
        title: "The $5 Home Maintenance Handbook",
        shortTitle: "$5 Maintenance Handbook",
        subtitle:
          "Small Preventive Fixes That Help Stop Big Repair Bills",
        price: 27,
        compareAt: 49,
        era: "Maintenance",
        themes: ["Prevention", "Repairs", "Savings"],
        highlights: [
          "Catch small problems before they explode",
          "Seasonal maintenance checklists",
          "Tools and fixes under five dollars",
          "Avoid emergency plumber calls",
          "Month-by-month home care plan",
        ],
      },
    ],
    hero: {
      headline: "Stop paying retail for fixes you can handle at home.",
      subheadline:
        "Five guides. Five hundred cheap home hacks — cleaning, pest control, reuse, and maintenance — pulled from the same research behind Stop Wasting Stuff. Every tip tested for real households on real budgets.",
    },
    youtubeBody:
      "Stop Wasting Stuff is built around one idea: most households throw money away on products and repairs they could handle cheaper. This library puts those fixes in order — tested, printable, and ready to use this weekend.",
    seoTitle: "Stop Wasting Stuff Home-Savings Library · 5 Money-Saving Guides",
    seoDescription:
      "Five home-savings guides covering cleaning, DIY fixes, pest prevention, reuse, and maintenance. Instant PDF download.",
    footerTagline: "Save Money · Fix It Yourself · Stop Wasting Stuff",
    footerDisclaimer:
      "Home maintenance and cleaning tips for general household use. Always follow product labels and local regulations. Results vary by home and climate.",
    costModern: [
      { label: "Professional exterminator visit", cost: "$150–$300" },
      { label: "Name-brand cleaning product haul", cost: "$45–$80" },
      { label: "Emergency plumber call", cost: "$200–$500" },
      { label: "Store-bought pest spray refills", cost: "$25–$40" },
      { label: "Monthly disposable product spend", cost: "$60+" },
    ],
    costVintage: [
      { label: "Hydrogen peroxide whole-house clean", cost: "~$3" },
      { label: "Baking soda + vinegar fix batch", cost: "~$2" },
      { label: "DIY pest barrier setup", cost: "~$8" },
      { label: "Reuse project from pantry scrap", cost: "~$0" },
      { label: "Preventive fix before it breaks", cost: "~$5" },
    ],
    orderHeadline: "Pay $59 once. Fix it forever.",
    orderSubheadline:
      "Your download link lands in email within about a minute. Read on phone, tablet, or laptop — or print the checklists you want near the toolbox.",
    orderIndividualNote: "",
    lastCallHeadline: "Quit paying retail for fixes you can handle at home.",
    lastCallBody:
      "$59 covers all five guides. Try a few this month; if they never earn their keep, one email gets a full refund — and you still keep the set.",
    libraryHeadline: "Five guides. Five hundred ways to stop wasting money at home.",
    libraryBody:
      "Every tip tested for real households. Choose the guide that matches your biggest expense — or take the full library and save on everything.",
    faqProductType: "guide",
  },
  {
    slug: "forgotten-american-survival",
    theme: "survival",
    booksFolder: "Forgotten American Survival",
    name: "Forgotten American Survival",
    tagline: "An Emergency Preparedness Library",
    youtubeUrl: "https://www.youtube.com/@ForgottenAmericanSurvival",
    youtubeSubscribers: "60.3K",
    currency: "usd",
    bundlePrice: 59,
    bundleCompareAt: 175,
    bundleTitle: "The Forgotten American Survival Library",
    bundleSubtitle:
      "All 5 preparedness manuals in one complete emergency library — blackout, shelter, stockpile, security, and water",
    books: [
      {
        slug: "7-day-blackout-survival-plan",
        title: "The 7-Day Blackout Survival Plan",
        shortTitle: "7-Day Blackout Plan",
        subtitle:
          "Step-by-Step Family Preparation for Power, Food, Water, Light & Communication",
        price: 19,
        compareAt: 39,
        era: "Emergency",
        themes: ["Blackout", "Family Prep", "Power Outage"],
        highlights: [
          "Day-by-day blackout preparation checklist",
          "Food and water without electricity",
          "Light and communication backup plans",
          "Family roles and safety protocols",
          "Tested for multi-day outages",
        ],
      },
      {
        slug: "forgotten-shelter-warmth-manual",
        title: "The Forgotten Shelter & Warmth Manual",
        shortTitle: "Shelter & Warmth Manual",
        subtitle:
          "Safe Emergency Shelter, Insulation, Fire & Cold-Weather Basics",
        price: 27,
        compareAt: 49,
        era: "Shelter",
        themes: ["Shelter", "Warmth", "Cold Weather"],
        highlights: [
          "Emergency shelter setup indoors and out",
          "Insulation tricks without fancy gear",
          "Safe fire and heat alternatives",
          "Cold-weather family protocols",
          "Frontier-tested methods adapted for today",
        ],
      },
      {
        slug: "poor-mans-emergency-stockpile",
        title: "The Poor Man's Emergency Stockpile",
        shortTitle: "Emergency Stockpile",
        subtitle:
          "100 Affordable Supplies, Storage Plans & Rotation Checklists",
        price: 27,
        compareAt: 49,
        era: "Stockpile",
        themes: ["Supplies", "Storage", "Rotation"],
        highlights: [
          "Affordable staples that store well",
          "Rotation calendars that prevent waste",
          "Small-space storage layouts",
          "100-item master checklist",
          "Budget tiers for every income",
        ],
      },
      {
        slug: "grandparents-home-security-handbook",
        title: "The Grandparents' Home Security Handbook",
        shortTitle: "Home Security Handbook",
        subtitle:
          "Nonviolent Deterrence, Lighting, Visibility & Neighborhood Readiness",
        price: 27,
        compareAt: 49,
        era: "Security",
        themes: ["Security", "Deterrence", "Neighborhood"],
        highlights: [
          "Nonviolent deterrence that actually works",
          "Lighting and visibility upgrades on a budget",
          "Neighborhood readiness without alarm systems",
          "Senior-friendly security habits",
          "Checklists for every entry point",
        ],
      },
      {
        slug: "off-grid-water-food-preservation",
        title: "The Off-Grid Water & Food Preservation Guide",
        shortTitle: "Water & Preservation Guide",
        subtitle:
          "Safe Storage, Purification & Preservation When Utilities Fail",
        price: 27,
        compareAt: 49,
        era: "Water",
        themes: ["Water", "Preservation", "Off-Grid"],
        highlights: [
          "Water storage and purification methods",
          "Food preservation without refrigeration",
          "Safe handling when utilities fail",
          "Frontier-era techniques modernized",
          "Family-sized planning worksheets",
        ],
      },
    ],
    hero: {
      headline: "The skills your grandparents knew. Written down before they're gone.",
      subheadline:
        "Five manuals. Five hundred preparedness lessons from American frontier families — blackout plans, shelter, stockpiles, security, and water. Every guide built on primary-source research and tested for modern households.",
    },
    youtubeBody:
      "Forgotten American Survival preserves the ingenuity and self-reliance of frontier families. This library puts those lessons in order — step by step, printable, and ready before you need them.",
    seoTitle: "Forgotten American Survival Library · 5 Preparedness Manuals",
    seoDescription:
      "Five emergency preparedness manuals: blackout survival, shelter, stockpile, home security, and water preservation. Instant PDF download.",
    footerTagline: "Prepare Smart · Stay Self-Reliant · Forgotten American Survival",
    footerDisclaimer:
      "Preparedness information for educational purposes. Follow local laws and safety guidelines. Always verify food and water safety practices for your region.",
    costModern: [
      { label: "Commercial emergency kit (family)", cost: "$200–$400" },
      { label: "Home security system install", cost: "$500–$1,500" },
      { label: "Generator + fuel (week)", cost: "$150–$300" },
      { label: "Bottled water (month, family)", cost: "$80–$120" },
      { label: "Professional prep consultant", cost: "$300+" },
    ],
    costVintage: [
      { label: "7-day blackout pantry plan", cost: "~$40" },
      { label: "DIY shelter insulation", cost: "~$15" },
      { label: "Rotating stockpile (month 1)", cost: "~$25" },
      { label: "Security lighting upgrade", cost: "~$20" },
      { label: "Water storage + purification", cost: "~$30" },
    ],
    orderHeadline: "Pay $59 once. Be ready forever.",
    orderSubheadline:
      "Your download link lands in email within about a minute. Print the checklists. Keep them where your family can find them.",
    orderIndividualNote: "",
    lastCallHeadline: "Don't wait for the next blackout to start preparing.",
    lastCallBody:
      "$59 covers all five manuals. Try them this month; if they never earn their keep, one email gets a full refund — and you still keep the set.",
    libraryHeadline: "Five manuals. Five hundred lessons in self-reliance.",
    libraryBody:
      "Every guide built from primary-source research. Choose the threat you worry about most — or take the full library and cover every base.",
    faqProductType: "manual",
  },
  {
    slug: "carlyfe",
    theme: "automotive",
    booksFolder: "CARLYFE",
    name: "CARLYFE",
    tagline: "A Smart Buyer Library",
    youtubeUrl: "https://www.youtube.com/@CARLYFE1",
    youtubeSubscribers: "52.4K",
    currency: "usd",
    bundlePrice: 59,
    bundleCompareAt: 175,
    bundleTitle: "The CARLYFE Smart Buyer Library",
    bundleSubtitle:
      "All 5 used-car buying and ownership guides in one bundle — inspection, negotiation, maintenance, and long-life ownership",
    books: [
      {
        slug: "400k-mile-used-car-buyers-guide",
        title: "The 400,000-Mile Used Car Buyer's Guide",
        shortTitle: "400K-Mile Buyer Guide",
        subtitle: "How to Spot Durable Cars Before You Buy",
        price: 19,
        compareAt: 39,
        era: "Buying",
        themes: ["Inspection", "Durability", "High Mileage"],
        highlights: [
          "Spot 400K-mile legends before dealers mark them up",
          "Engine and transmission red flags",
          "Models that refuse to die",
          "Inspection worksheets included",
          "True-cost ownership math",
        ],
      },
      {
        slug: "senior-drivers-smart-car-handbook",
        title: "The Senior Driver's Smart Car Handbook",
        shortTitle: "Senior Driver Handbook",
        subtitle: "Comfort, Visibility, Easy Entry & Low Ownership Costs",
        price: 27,
        compareAt: 49,
        era: "Seniors",
        themes: ["Comfort", "Visibility", "Low Cost"],
        highlights: [
          "Cars with easy entry and exit",
          "Visibility upgrades without dealer markup",
          "Low ownership cost models ranked",
          "Senior-friendly feature checklist",
          "Insurance and maintenance savings",
        ],
      },
      {
        slug: "bulletproof-pickup-suv-guide",
        title: "The Bulletproof Pickup & SUV Guide",
        shortTitle: "Pickup & SUV Guide",
        subtitle: "Inspection Points, Red Flags & True-Cost Worksheets",
        price: 27,
        compareAt: 49,
        era: "Trucks",
        themes: ["Trucks", "SUVs", "Inspection"],
        highlights: [
          "Frame and underbody inspection points",
          "Tow-rated models that last",
          "Red flags dealers hope you miss",
          "True-cost worksheets per model",
          "4WD and drivetrain checks",
        ],
      },
      {
        slug: "under-10k-car-buying-playbook",
        title: "The Under-$10,000 Car Buying Playbook",
        shortTitle: "Under $10K Playbook",
        subtitle: "Negotiation, Titles, Inspections & Repair-Budget Checklists",
        price: 27,
        compareAt: 49,
        era: "Budget",
        themes: ["Negotiation", "Titles", "Budget"],
        highlights: [
          "Negotiate without dealer games",
          "Title and lien checks step by step",
          "Pre-purchase inspection checklist",
          "Repair budget before you sign",
          "Best models under $10K ranked",
        ],
      },
      {
        slug: "long-life-maintenance-calendar",
        title: "The Long-Life Maintenance Calendar",
        shortTitle: "Maintenance Calendar",
        subtitle: "A Month-by-Month Plan to Keep Any Used Vehicle Running",
        price: 27,
        compareAt: 49,
        era: "Maintenance",
        themes: ["Maintenance", "Calendar", "Longevity"],
        highlights: [
          "Month-by-month maintenance schedule",
          "Fluid and filter intervals decoded",
          "Catch problems before tow bills",
          "DIY vs shop decision guide",
          "Works for any make or model",
        ],
      },
    ],
    hero: {
      headline: "Buy the car that lasts. Not the one the dealer wants to move.",
      subheadline:
        "Five guides for the 2026 used car market — inspection, negotiation, maintenance, and ownership. Built from the same research behind CARLYFE's 500,000-mile legends and hidden-gem finds.",
    },
    youtubeBody:
      "CARLYFE navigates the chaotic used car market to find hidden gems the average buyer overlooks. This library puts those inspection points, negotiation tactics, and maintenance calendars in one place.",
    seoTitle: "CARLYFE Smart Buyer Library · 5 Used-Car Guides",
    seoDescription:
      "Five used-car buying and ownership guides: inspection, senior driving, trucks, budget buying, and maintenance. Instant PDF download.",
    footerTagline: "Buy Smart · Drive Long · CARLYFE",
    footerDisclaimer:
      "Automotive information for educational purposes. Always have a qualified mechanic inspect any vehicle before purchase. Prices and availability vary by market.",
    costModern: [
      { label: "Dealer markup on 'certified' used", cost: "$2,000–$5,000" },
      { label: "Surprise repair (first year)", cost: "$1,500–$4,000" },
      { label: "Extended warranty (often unused)", cost: "$1,200–$3,000" },
      { label: "Overpriced dealer maintenance", cost: "$200–$500/visit" },
      { label: "Wrong car — sell at loss", cost: "$3,000+" },
    ],
    costVintage: [
      { label: "Pre-purchase inspection", cost: "~$150" },
      { label: "Negotiated hidden-gem purchase", cost: "Thousands saved" },
      { label: "Monthly preventive maintenance", cost: "~$30" },
      { label: "DIY fluid and filter change", cost: "~$25" },
      { label: "Full library — avoid one bad buy", cost: "$59" },
    ],
    orderHeadline: "Pay $59 once. Drive smarter forever.",
    orderSubheadline:
      "Your download link lands in email within about a minute. Print the inspection checklists before your next lot visit.",
    orderIndividualNote: "",
    lastCallHeadline: "One bad purchase costs more than this entire library.",
    lastCallBody:
      "$59 covers all five guides. Use them on your next purchase; if they never earn their keep, one email gets a full refund.",
    libraryHeadline: "Five guides. Every step from lot to 400,000 miles.",
    libraryBody:
      "Inspection worksheets, negotiation scripts, and maintenance calendars — the same research behind CARLYFE's hidden-gem finds.",
    faqProductType: "guide",
    coverSlotMap: { books: [0, 1, 3, 4, 5], bundle: 2 },
  },
  {
    slug: "american-food-history",
    theme: "cookbook",
    booksFolder: "American Food History",
    name: "American Food History",
    tagline: "A Historical Cookbook Archive",
    youtubeUrl: "https://www.youtube.com/channel/UCyCSbQ8ycQFpptUz5k6nltw",
    youtubeSubscribers: "23K",
    currency: "usd",
    bundlePrice: 59,
    bundleCompareAt: 175,
    bundleTitle: "The American Food History Cookbook Archive",
    bundleSubtitle:
      "All 5 historical American cookbooks in one complete archive — Revolutionary era through supper clubs",
    books: [
      {
        slug: "1776-american-table",
        title: "The 1776 American Table",
        shortTitle: "1776 American Table",
        subtitle: "100 Revolutionary-Era Recipes Adapted for Modern Kitchens",
        price: 19,
        compareAt: 39,
        era: "1776",
        themes: ["Revolutionary", "Colonial", "Historic"],
        highlights: [
          "Revolutionary-era plates for modern kitchens",
          "Sourced from period cookbooks and letters",
          "Ingredient substitutions explained",
          "100 recipes with historical context",
          "Perfect for history-minded cooks",
        ],
      },
      {
        slug: "lost-american-steakhouse-cookbook",
        title: "The Lost American Steakhouse Cookbook",
        shortTitle: "Steakhouse Cookbook",
        subtitle: "Prime Rib, Chops, Sides, Sauces & Desserts",
        price: 27,
        compareAt: 49,
        era: "Steakhouse",
        themes: ["Steakhouse", "Prime Rib", "Classic Sides"],
        highlights: [
          "Prime rib the old steakhouse way",
          "Chops, sides, and signature sauces",
          "Desserts from the supper-club era",
          "Restaurant techniques at home",
          "100 steakhouse classics recovered",
        ],
      },
      {
        slug: "route-66-roadside-cookbook",
        title: "The Route 66 Roadside Cookbook",
        shortTitle: "Route 66 Cookbook",
        subtitle: "Diner, Drive-In, Motel-Café & Gas-Stop Classics",
        price: 27,
        compareAt: 49,
        era: "Route 66",
        themes: ["Diner", "Drive-In", "Road Trip"],
        highlights: [
          "Diner counters and drive-in classics",
          "Motel-café and gas-stop plates",
          "Road-trip recipes from America's highway",
          "Nostalgic flavors from the Mother Road",
          "100 roadside recipes recovered",
        ],
      },
      {
        slug: "outlaws-pirates-soldiers-cookbook",
        title: "The Outlaws, Pirates & Soldiers Cookbook",
        shortTitle: "Outlaws & Soldiers",
        subtitle: "Rugged Historical Meals and the Stories Behind Them",
        price: 27,
        compareAt: 49,
        era: "Historical",
        themes: ["Outlaws", "Military", "Frontier"],
        highlights: [
          "Meals from outlaws, pirates, and soldiers",
          "Historical context for every dish",
          "Rugged plates adapted for home kitchens",
          "Stories behind the food",
          "100 historical recipes recovered",
        ],
      },
      {
        slug: "great-american-supper-club-cookbook",
        title: "The Great American Supper Club Cookbook",
        shortTitle: "Supper Club Cookbook",
        subtitle: "Relish Trays, Steak, Fish Fries, Drinks & Desserts",
        price: 27,
        compareAt: 49,
        era: "Supper Club",
        themes: ["Supper Club", "Relish Trays", "Fish Fry"],
        highlights: [
          "Relish trays the supper-club way",
          "Steak and fish-fry nights at home",
          "Classic drinks and desserts",
          "Midwest supper-club traditions",
          "100 recipes from America's clubs",
        ],
      },
    ],
    hero: {
      headline: "The meals America forgot. Cooked again for your kitchen.",
      subheadline:
        "Five cookbooks spanning Revolutionary tables to Route 66 diners — five hundred historical American recipes researched, adapted, and priced for today's grocery stores.",
    },
    youtubeBody:
      "American Food History explores the forgotten recipes and dining experiences that shaped the nation. This archive puts those dishes in order — tested in modern kitchens with historical context for every plate.",
    seoTitle: "American Food History Cookbook Archive · 500 Historical Recipes",
    seoDescription:
      "Five historical American cookbooks: Revolutionary era, steakhouses, Route 66, outlaws, and supper clubs. Instant PDF download.",
    footerTagline: "Historic Recipes · American Tables · Real Food History",
    footerDisclaimer:
      "Historical recipes adapted for modern kitchens. Ingredient availability and cooking methods vary. Always follow safe food handling practices.",
    costModern: [
      { label: "Historic-themed restaurant dinner", cost: "$45–$75" },
      { label: "Steakhouse prime rib (two)", cost: "$80–$120" },
      { label: "Food history book (single era)", cost: "$35–$50" },
      { label: "Meal kit (one serving)", cost: "$11–$14" },
      { label: "Week of dining out", cost: "$150+" },
    ],
    costVintage: [
      { label: "1776-era stew from pantry", cost: "~$4 a plate" },
      { label: "Steakhouse prime rib at home", cost: "~$12 a plate" },
      { label: "Route 66 diner plate", cost: "~$6 a plate" },
      { label: "Supper club fish fry", cost: "~$8 a plate" },
      { label: "Two adults cooking from archive", cost: "$50–$70" },
    ],
    orderHeadline: "Pay $59 once. Taste history forever.",
    orderSubheadline:
      "Your download link lands in email within about a minute. Open on any device or print the recipes you want in the kitchen.",
    orderIndividualNote: "",
    lastCallHeadline: "Five centuries of American tables. One library.",
    lastCallBody:
      "$59 covers all five cookbooks. Cook a few this month; if the food never lands right, one email gets a full refund.",
    libraryHeadline: "Five cookbooks. Five hundred plates of American history.",
    libraryBody:
      "From Revolutionary tables to Route 66 diners — every recipe researched, adapted, and tagged with today's grocery costs.",
    faqProductType: "cookbook",
  },
  {
    slug: "british-nostalgia",
    theme: "cookbook",
    booksFolder: "British Nostalgia",
    name: "British Nostalgia",
    tagline: "A Pension Kitchen Library",
    youtubeUrl: "https://www.youtube.com/channel/UCgk-7pjbA3JoGEPSlGWUPVg",
    youtubeSubscribers: "14.3K",
    currency: "gbp",
    bundlePrice: 44.99,
    bundleCompareAt: 134.95,
    bundleTitle: "The British Nostalgia Pension Kitchen Library",
    bundleSubtitle:
      "All 5 budget cookbooks for one in one complete bundle — eggs, tinned food, quick suppers, batch cooking, and Nan's kitchen",
    books: [
      {
        slug: "british-pensioner-egg-potato-cookbook",
        title: "The British Pensioner's Egg & Potato Cookbook",
        shortTitle: "Egg & Potato Cookbook",
        subtitle: "100 Filling Dinners for One That Cost Pennies",
        price: 9.99,
        compareAt: 17.99,
        era: "British",
        themes: ["Eggs", "Potatoes", "One Person"],
        highlights: [
          "100 dinners for one on a pension budget",
          "Eggs and potatoes — the cheapest proteins",
          "Filling plates that cost pennies",
          "Nan-approved shortcuts throughout",
          "Perfect for eating alone",
        ],
      },
      {
        slug: "tinned-food-tea-time-bible",
        title: "The Tinned Food Tea-Time Bible",
        shortTitle: "Tinned Food Bible",
        subtitle: "100 Easy British Meals from Beans, Soup, Corned Beef & Cupboard Staples",
        price: 9.99,
        compareAt: 17.99,
        era: "Cupboard",
        themes: ["Tinned Food", "Tea Time", "Cupboard"],
        highlights: [
          "Meals from beans, soup, and corned beef",
          "Cupboard staples stretched further",
          "Tea-time classics on a budget",
          "No fancy ingredients required",
          "100 tinned-food recipes",
        ],
      },
      {
        slug: "five-minute-british-suppers",
        title: "The 5-Minute British Suppers Cookbook",
        shortTitle: "5-Minute Suppers",
        subtitle: "75 Comforting Meals for One When You're Too Tired to Cook",
        price: 9.99,
        compareAt: 17.99,
        era: "Quick",
        themes: ["Quick Meals", "Comfort", "One Person"],
        highlights: [
          "75 suppers ready in five minutes",
          "For when you're too tired to cook",
          "Comfort food without the fuss",
          "One-person portions throughout",
          "Nan's shortcuts included",
        ],
      },
      {
        slug: "one-person-batch-cooking-plan",
        title: "The One-Person British Batch-Cooking Plan",
        shortTitle: "Batch-Cooking Plan",
        subtitle: "Cook Once, Freeze Smart & Eat Well All Week",
        price: 9.99,
        compareAt: 17.99,
        era: "Batch",
        themes: ["Batch Cooking", "Freezer", "Planning"],
        highlights: [
          "Cook once, eat well all week",
          "Freezer-friendly British meals",
          "Portion plans for one person",
          "Waste nothing from a weekly shop",
          "Shopping lists included",
        ],
      },
      {
        slug: "nans-pension-kitchen",
        title: "Nan's Pension Kitchen",
        shortTitle: "Nan's Pension Kitchen",
        subtitle: "100 Old British Habits, Shopping Tricks & Waste-Free Recipes",
        price: 9.99,
        compareAt: 17.99,
        era: "Nan",
        themes: ["Habits", "Shopping", "Waste-Free"],
        highlights: [
          "100 old British kitchen habits",
          "Shopping tricks that still work",
          "Waste-free recipes from Nan's day",
          "Stretch every penny at the till",
          "Habits passed down generations",
        ],
      },
    ],
    hero: {
      headline: "Nan's kitchen wisdom. Finally written down for your table.",
      subheadline:
        "Five cookbooks for eating well on a pension — eggs, tinned food, quick suppers, batch cooking, and waste-free habits. Every recipe built for one person on a tight budget.",
    },
    youtubeBody:
      "British Nostalgia preserves the heart of British domestic history — Nan-approved hacks, forgotten recipes, and the resilient spirit of the British Isles. This library puts those meals in order for pensioners cooking for one.",
    seoTitle: "British Nostalgia Pension Kitchen Library · 5 Budget Cookbooks",
    seoDescription:
      "Five budget cookbooks for British pensioners: eggs, tinned food, quick suppers, batch cooking, and Nan's kitchen habits. Instant PDF download.",
    footerTagline: "Eat Well · Spend Less · British Nostalgia",
    footerDisclaimer:
      "Recipes and budgeting tips for general household use. Prices based on UK supermarkets circa 2026. Adjust for your local shops.",
    costModern: [
      { label: "Ready meal (single serving)", cost: "£4–£6" },
      { label: "Takeaway fish and chips", cost: "£8–£12" },
      { label: "Pub lunch", cost: "£12–£18" },
      { label: "Weekly food delivery app", cost: "£45+" },
      { label: "Eating out twice a week", cost: "£80+" },
    ],
    costVintage: [
      { label: "Egg and potato supper for one", cost: "~£0.80" },
      { label: "Tinned food tea-time plate", cost: "~£1.20" },
      { label: "5-minute cupboard supper", cost: "~£1.50" },
      { label: "Batch-cooked week of meals", cost: "~£15" },
      { label: "Two pensioners cooking from library", cost: "£25–£35" },
    ],
    orderHeadline: "Pay £44.99 once. Eat well forever.",
    orderSubheadline:
      "Your download link lands in email within about a minute. Read on phone, tablet, or laptop — or print the recipes by the cooker.",
    orderIndividualNote: "",
    lastCallHeadline: "Stop paying takeaway prices for meals Nan made for pennies.",
    lastCallBody:
      "£44.99 covers all five cookbooks. Cook a few this month; if they never earn their keep, one email gets a full refund.",
    libraryHeadline: "Five cookbooks. Five hundred meals for one on a pension.",
    libraryBody:
      "Eggs, tinned food, quick suppers, batch cooking, and Nan's habits — every recipe priced for today's British supermarkets.",
    faqProductType: "cookbook",
  },
  {
    slug: "forgotten-american-weapons",
    theme: "weapons",
    booksFolder: "Forgotten American Weapons",
    name: "Forgotten American Weapons",
    tagline: "A Historical Arms Archive",
    youtubeUrl: "https://www.youtube.com/channel/UC5vH3Goef09AUi6sZKtbBng",
    youtubeSubscribers: "12K",
    currency: "usd",
    bundlePrice: 59,
    bundleCompareAt: 175,
    bundleTitle: "The Forgotten American Weapons Historical Archive",
    bundleSubtitle:
      "All 5 collector and history guides in one complete archive — gangster era, frontier, farm guns, identification, and safe storage",
    books: [
      {
        slug: "hidden-weapons-1920s",
        title: "Hidden Weapons of the 1920s",
        shortTitle: "1920s Weapons Guide",
        subtitle: "A Museum-Style Guide to Gangster-Era Arms, Tools & History",
        price: 19,
        compareAt: 39,
        era: "1920s",
        themes: ["Gangster Era", "Prohibition", "Museum"],
        highlights: [
          "Gangster-era arms with historical context",
          "Museum-style documentation and photos",
          "Prohibition-era tools and equipment",
          "Primary-source research throughout",
          "Collector-grade reference material",
        ],
      },
      {
        slug: "mountain-man-frontier-arms",
        title: "The Mountain Man & Frontier Arms Encyclopedia",
        shortTitle: "Frontier Arms Encyclopedia",
        subtitle: "Equipment, Provenance and Historical Context",
        price: 27,
        compareAt: 49,
        era: "Frontier",
        themes: ["Frontier", "Mountain Men", "Encyclopedia"],
        highlights: [
          "Frontier-era arms and equipment",
          "Provenance and historical context",
          "Mountain man and trapper gear",
          "Encyclopedia-style reference",
          "Primary-source documentation",
        ],
      },
      {
        slug: "forgotten-american-farm-guns",
        title: "Forgotten American Farm Guns",
        shortTitle: "Farm Guns Guide",
        subtitle: "A Collector's Guide to Shotguns, Rifles & Working-Farm History",
        price: 27,
        compareAt: 49,
        era: "Farm",
        themes: ["Farm Guns", "Shotguns", "Working History"],
        highlights: [
          "Shotguns and rifles from working farms",
          "Collector's identification guide",
          "Working-farm history and context",
          "Models that defined rural America",
          "Preservation and documentation tips",
        ],
      },
      {
        slug: "american-weapons-identification-handbook",
        title: "The American Weapons Identification Handbook",
        shortTitle: "Identification Handbook",
        subtitle: "Markings, Eras, Provenance, Documentation & Preservation",
        price: 27,
        compareAt: 49,
        era: "Reference",
        themes: ["Identification", "Markings", "Preservation"],
        highlights: [
          "Markings and manufacturer identification",
          "Era dating and provenance research",
          "Documentation best practices",
          "Preservation without damage",
          "Reference tables and checklists",
        ],
      },
      {
        slug: "responsible-collectors-storage-safety",
        title: "The Responsible Collector's Storage & Safety Manual",
        shortTitle: "Storage & Safety Manual",
        subtitle: "Secure Storage, Transport, Maintenance & Legal Research",
        price: 27,
        compareAt: 49,
        era: "Safety",
        themes: ["Storage", "Safety", "Legal"],
        highlights: [
          "Secure storage methods and products",
          "Safe transport guidelines",
          "Maintenance without damage",
          "Legal research resources by state",
          "Responsible collector checklist",
        ],
      },
    ],
    hero: {
      headline: "The arms America forgot. Documented the way museums do it.",
      subheadline:
        "Five guides spanning gangster-era arms to frontier encyclopedias — historical weapons research, identification, and responsible collector practices. Built from primary sources, not gun-show gossip.",
    },
    youtubeBody:
      "Forgotten American Weapons preserves the historical arms and equipment that shaped American frontier and farm life. This archive puts that research in order — museum-style documentation for collectors and history enthusiasts.",
    seoTitle: "Forgotten American Weapons Historical Archive · 5 Collector Guides",
    seoDescription:
      "Five historical weapons guides: 1920s arms, frontier encyclopedia, farm guns, identification, and safe storage. Instant PDF download.",
    footerTagline: "Historical Arms · Responsible Collecting · Forgotten American Weapons",
    footerDisclaimer:
      "Historical and educational content only. Always follow federal, state, and local firearms laws. Consult qualified experts for legal and safety questions.",
    costModern: [
      { label: "Single collector reference book", cost: "$45–$80" },
      { label: "Appraisal consultation", cost: "$150–$300" },
      { label: "Museum exhibition catalogue", cost: "$35–$60" },
      { label: "Gun show misidentification cost", cost: "Priceless" },
      { label: "Improper storage damage", cost: "$500+" },
    ],
    costVintage: [
      { label: "Identification before you buy", cost: "Avoid costly mistakes" },
      { label: "Proper storage setup", cost: "~$50" },
      { label: "Documentation template pack", cost: "Included" },
      { label: "Legal research checklist", cost: "Included" },
      { label: "Full archive reference", cost: "$59" },
    ],
    orderHeadline: "Pay $59 once. Reference forever.",
    orderSubheadline:
      "Your download link lands in email within about a minute. Open on any device or print the identification tables.",
    orderIndividualNote: "",
    lastCallHeadline: "One misidentified purchase costs more than this entire archive.",
    lastCallBody:
      "$59 covers all five guides. Use them on your next research project; if they never earn their keep, one email gets a full refund.",
    libraryHeadline: "Five guides. The historical arms archive collectors need.",
    libraryBody:
      "Gangster-era arms, frontier encyclopedias, farm guns, identification, and safe storage — museum-style documentation throughout.",
    faqProductType: "guide",
  },
  {
    slug: "forgotten-american-skills",
    theme: "skills",
    booksFolder: "Forgotten American Skills",
    name: "Forgotten American Skills",
    tagline: "A Master Skills Library",
    youtubeUrl: "https://www.youtube.com/channel/UCM9Zhl9K6uCkV3RkcmiYkkQ",
    youtubeSubscribers: "Growing",
    currency: "usd",
    bundlePrice: 59,
    bundleCompareAt: 175,
    bundleTitle: "The Forgotten American Skills Master Library",
    bundleSubtitle:
      "All 5 skills manuals in one library — campcraft, trades, home repair, food preservation, and homestead know-how",
    books: [
      {
        slug: "old-timer-skills-handbook",
        title: "The Old-Timer Skills Handbook",
        shortTitle: "Old-Timer Skills Handbook",
        subtitle: "100 Practical Skills for Camp, Home, Workshop & Homestead",
        price: 19,
        compareAt: 39,
        era: "Homestead",
        themes: ["Camp", "Workshop", "Homestead"],
        highlights: [
          "100 practical skills for camp, home, and workshop",
          "Self-reliance habits old-timers passed down",
          "Simple tools, lasting value — no fancy equipment",
          "Checklists for camp, kitchen, barn, and bench",
          "Frontier-tested methods adapted for today",
        ],
      },
      {
        slug: "vanishing-trades-starter-guide",
        title: "The Vanishing Trades Starter Guide",
        shortTitle: "Vanishing Trades Guide",
        subtitle: "Beginner Projects in Wood, Leather, Rope, Metal & Repair",
        price: 27,
        compareAt: 49,
        era: "Trades",
        themes: ["Wood", "Leather", "Rope", "Metal"],
        highlights: [
          "Beginner projects in wood, leather, rope, and metal",
          "Hand-planing, joinery, and basic repair without power tools",
          "Leather stitching and tool-roll projects",
          "Knots, cordage, and rope work essentials",
          "Revive trades your great-grandparents mastered by fifteen",
        ],
      },
      {
        slug: "hand-tool-home-repair-bible",
        title: "The Hand-Tool Home Repair Bible",
        shortTitle: "Hand-Tool Repair Bible",
        subtitle: "Fixing, Sharpening, Mending & Maintaining Without Fancy Equipment",
        price: 27,
        compareAt: 49,
        era: "Repair",
        themes: ["Fixing", "Sharpening", "Maintaining"],
        highlights: [
          "Fix, sharpen, and mend with hand tools only",
          "No contractor call for common household repairs",
          "Workbench layouts and tool-care routines",
          "Mending, patching, and maintaining what you own",
          "Hard work and simple tools beat replacement culture",
        ],
      },
      {
        slug: "traditional-food-preservation-guide",
        title: "The Traditional Food Preservation Guide",
        shortTitle: "Food Preservation Guide",
        subtitle: "Drying, Pickling, Fermenting, Canning & Cold Storage Safely",
        price: 27,
        compareAt: 49,
        era: "Pantry",
        themes: ["Drying", "Pickling", "Canning"],
        highlights: [
          "Drying, pickling, fermenting, and canning safely",
          "Cold storage layouts for root cellars and pantries",
          "Plan, prepare, preserve, provide, persevere",
          "Homestead pantry setup on a practical budget",
          "Self-reliance through food you put up yourself",
        ],
      },
      {
        slug: "frontier-camping-manual",
        title: "The Frontier Camping Manual",
        shortTitle: "Frontier Camping Manual",
        subtitle: "Fire, Water, Shelter, Navigation & Responsible Campcraft",
        price: 27,
        compareAt: 49,
        era: "Campcraft",
        themes: ["Fire", "Shelter", "Navigation"],
        highlights: [
          "Fire, water, shelter, and navigation fundamentals",
          "Responsible campcraft without expensive gear",
          "Frontier-tested setups for tent and open country",
          "Map, compass, and trail-readiness checklists",
          "Camp kitchen and overnight comfort with simple tools",
        ],
      },
    ],
    hero: {
      headline: "The skills America forgot. Taught the way old-timers passed them down.",
      subheadline:
        "Five field manuals spanning campcraft, vanishing trades, hand-tool repair, food preservation, and homestead skills — craft, tradition, and resilience on every page.",
    },
    youtubeBody:
      "Forgotten American Skills preserves the practical know-how that built America — from frontier campcraft to workshop trades. This library puts those lessons in order: self-reliance, hard work, simple tools, lasting value.",
    seoTitle: "Forgotten American Skills Master Library · 5 Practical Manuals",
    seoDescription:
      "Five skills manuals: old-timer handbook, vanishing trades, hand-tool repair, food preservation, and frontier camping. Instant PDF download.",
    footerTagline: "Craft · Tradition · Resilience · Forgotten American Skills",
    footerDisclaimer:
      "Skills and preservation information for educational purposes. Follow local laws and safety guidelines. Verify food, water, and tool safety practices for your region.",
    costModern: [
      { label: "Weekend woodworking class", cost: "$150–$300" },
      { label: "Professional handyman visit", cost: "$100–$250" },
      { label: "Commercial canning/preservation kit", cost: "$80–$150" },
      { label: "Guided wilderness camp weekend", cost: "$200–$500" },
      { label: "Big-box tool-buying mistakes", cost: "$200+" },
    ],
    costVintage: [
      { label: "Hand-tool home repair supplies", cost: "~$15" },
      { label: "Food preservation pantry setup", cost: "~$30" },
      { label: "Beginner woodworking project", cost: "~$20" },
      { label: "Frontier campcraft basics", cost: "~$25" },
      { label: "Full 5-manual skills library", cost: "$59" },
    ],
    orderHeadline: "Pay $59 once. Skills for a lifetime.",
    orderSubheadline:
      "Your download link lands in email within about a minute. Print the checklists. Keep them in the workshop, pantry, or camp kit.",
    orderIndividualNote: "",
    lastCallHeadline: "Your great-grandparents knew these skills by fifteen.",
    lastCallBody:
      "$59 covers all five manuals. Try them this month; if they never earn their keep, one email gets a full refund — and you still keep the set.",
    libraryHeadline: "Five manuals. Five hundred skills for camp, home, workshop & homestead.",
    libraryBody:
      "Old-timer handbook, vanishing trades, hand-tool repair, food preservation, and frontier camping — every guide built for self-reliance with simple tools.",
    faqProductType: "manual",
  },
];

// Assign pdf basenames
for (const channel of CHANNELS) {
  for (const book of channel.books) {
    book.pdfBasename = slugifyPdf(book.slug);
  }
}

for (const channel of CHANNELS) {
  bootstrapSite(channel);
}

console.log("\nAll channel sites bootstrapped.");
