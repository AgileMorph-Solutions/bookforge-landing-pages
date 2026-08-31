export type ProductSlug =
  | "forgotten-side-hustles"
  | "zero-start-business-playbook"
  | "junk-to-cash-reselling-guide"
  | "boring-businesses-blueprint"
  | "over-50-side-hustle-handbook"
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

export const CHECKOUT_CURRENCY = "usd" as "usd" | "gbp";

export const INDIVIDUAL_BOOKS: Product[] = [
  {
    slug: "forgotten-side-hustles",
    title: "100 Forgotten Side-Hustles You Can Start This Weekend",
    shortTitle: "100 Forgotten Side-Hustles",
    subtitle: "Low-Cost Local Services People Still Pay For",
    price: 19,
    compareAt: 39,
    coverImage: "/images/covers/forgotten-side-hustles.png",
    pdfFilename: "100-forgotten-side-hustles.pdf",
    recipeCount: 100,
    era: "Local Income",
    themes: ["Side Hustles", "Local Services", "Weekend Work"],
    highlights: [
      "100 low-cost local services people still pay cash for",
      "Start this weekend with tools most homes already have",
      "What to charge for yard, cleanup, hauling and odd jobs",
      "How to find your first paying neighbours fast",
      "No app, licence, or storefront required",
    ],
  },
  {
    slug: "zero-start-business-playbook",
    title: "The $0 Start Business Playbook",
    shortTitle: "$0 Start Business Playbook",
    subtitle: "Validate, Price & Sell a Service Before Spending Money",
    price: 27,
    compareAt: 49,
    coverImage: "/images/covers/zero-start-business-playbook.png",
    pdfFilename: "zero-start-business-playbook.pdf",
    recipeCount: 100,
    era: "Service Business",
    themes: ["Service Business", "Pricing", "Validation"],
    highlights: [
      "The $0 Start Rule — prove demand before you spend a cent",
      "Pick a service and test it with real customers first",
      "Price your first job so reliability gets you paid",
      "A 14-day plan to land your first paying client",
      "Worksheets for offers, pricing, and follow-up",
    ],
  },
  {
    slug: "junk-to-cash-reselling-guide",
    title: "The Junk-to-Cash Reselling Guide",
    shortTitle: "Junk-to-Cash Reselling Guide",
    subtitle: "Sourcing, Cleaning, Pricing, Photos, Listings & Safe Meetups",
    price: 27,
    compareAt: 49,
    coverImage: "/images/covers/junk-to-cash-reselling-guide.png",
    pdfFilename: "junk-to-cash-reselling-guide.pdf",
    recipeCount: 100,
    era: "Reselling",
    themes: ["Reselling", "Flipping", "Marketplaces"],
    highlights: [
      "Where to source items that actually sell",
      "50 quick profiles of what sells and for how much",
      "Cleaning, photos, and honest listings that move stock",
      "Negotiation scripts and safe-meetup rules",
      "A daily plan and worksheets to keep cash coming in",
    ],
  },
  {
    slug: "boring-businesses-blueprint",
    title: "The Boring Businesses Blueprint",
    shortTitle: "Boring Businesses Blueprint",
    subtitle: "50 Unsexy Local Services with Repeat-Customer Potential",
    price: 27,
    compareAt: 49,
    coverImage: "/images/covers/boring-businesses-blueprint.png",
    pdfFilename: "boring-businesses-blueprint.pdf",
    recipeCount: 100,
    era: "Repeat Revenue",
    themes: ["Local Services", "Repeat Customers", "Recurring Income"],
    highlights: [
      "50 unglamorous services customers rebook every month",
      "Home cleaning, outdoor, senior-help and errand niches",
      "Car, garage and small-repair work with steady demand",
      "Seasonal repeat jobs you can schedule ahead",
      "A 7-day launch plan for the service you choose",
    ],
  },
  {
    slug: "over-50-side-hustle-handbook",
    title: "The Over-50 Side-Hustle Handbook",
    shortTitle: "Over-50 Side-Hustle Handbook",
    subtitle: "Flexible Local, Home-Based & Part-Time Income Ideas",
    price: 27,
    compareAt: 49,
    coverImage: "/images/covers/over-50-side-hustle-handbook.png",
    pdfFilename: "over-50-side-hustle-handbook.pdf",
    recipeCount: 100,
    era: "Flexible Income",
    themes: ["Part-Time", "Home-Based", "Flexible Hours"],
    highlights: [
      "90 flexible income ideas suited to life over 50",
      "Local, home-based and part-time work you control",
      "Errand and senior-support niches that value experience",
      "A 30-day plan to book your first job",
      "Worksheets to build a schedule that fits your week",
    ],
  },
];

export const BUNDLE: Product = {
  slug: "bundle",
  title: "The Forgotten Ways to Make Money Library",
  shortTitle: "Complete Library",
  subtitle:
    "All 5 practical income guides in one set — weekend side-hustles, $0-start service businesses, reselling, repeat-customer services, and flexible part-time work",
  price: 59,
  compareAt: 175,
  coverImage: "/images/covers/bundle.png",
  pdfFilename: "",
  recipeCount: 500,
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
  return CHECKOUT_CURRENCY === "gbp" ? `£${amount}` : `$${amount}`;
}

export function getBundleValueStack(
  products: Product[] = INDIVIDUAL_BOOKS
): { label: string; value: number }[] {
  return [
    ...products.map((b) => ({
      label: b.shortTitle,
      value: b.compareAt,
    })),
    { label: "Family Sharing License", value: 19 },
    { label: "First Edition Lifetime Updates", value: 21 },
  ];
}
