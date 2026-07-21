export type ProductSlug =
  | "7-day-blackout-survival-plan"
  | "forgotten-shelter-warmth-manual"
  | "poor-mans-emergency-stockpile"
  | "grandparents-home-security-handbook"
  | "off-grid-water-food-preservation"
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
    slug: "7-day-blackout-survival-plan",
    title: "The 7-Day Blackout Survival Plan",
    shortTitle: "7-Day Blackout Plan",
    subtitle: "Step-by-Step Family Preparation for Power, Food, Water, Light & Communication",
    price: 19,
    compareAt: 39,
    coverImage: "/images/covers/7-day-blackout-survival-plan.png",
    pdfFilename: "7-day-blackout-survival-plan.pdf",
    recipeCount: 100,
    era: "Emergency",
    themes: ["Blackout","Family Prep","Power Outage"],
    highlights: ["Day-by-day blackout preparation checklist","Food and water without electricity","Light and communication backup plans","Family roles and safety protocols","Tested for multi-day outages"],
  },
  {
    slug: "forgotten-shelter-warmth-manual",
    title: "The Forgotten Shelter & Warmth Manual",
    shortTitle: "Shelter & Warmth Manual",
    subtitle: "Safe Emergency Shelter, Insulation, Fire & Cold-Weather Basics",
    price: 27,
    compareAt: 49,
    coverImage: "/images/covers/forgotten-shelter-warmth-manual.png",
    pdfFilename: "forgotten-shelter-warmth-manual.pdf",
    recipeCount: 100,
    era: "Shelter",
    themes: ["Shelter","Warmth","Cold Weather"],
    highlights: ["Emergency shelter setup indoors and out","Insulation tricks without fancy gear","Safe fire and heat alternatives","Cold-weather family protocols","Frontier-tested methods adapted for today"],
  },
  {
    slug: "poor-mans-emergency-stockpile",
    title: "The Poor Man's Emergency Stockpile",
    shortTitle: "Emergency Stockpile",
    subtitle: "100 Affordable Supplies, Storage Plans & Rotation Checklists",
    price: 27,
    compareAt: 49,
    coverImage: "/images/covers/poor-mans-emergency-stockpile.png",
    pdfFilename: "poor-mans-emergency-stockpile.pdf",
    recipeCount: 100,
    era: "Stockpile",
    themes: ["Supplies","Storage","Rotation"],
    highlights: ["Affordable staples that store well","Rotation calendars that prevent waste","Small-space storage layouts","100-item master checklist","Budget tiers for every income"],
  },
  {
    slug: "grandparents-home-security-handbook",
    title: "The Grandparents' Home Security Handbook",
    shortTitle: "Home Security Handbook",
    subtitle: "Nonviolent Deterrence, Lighting, Visibility & Neighborhood Readiness",
    price: 27,
    compareAt: 49,
    coverImage: "/images/covers/grandparents-home-security-handbook.png",
    pdfFilename: "grandparents-home-security-handbook.pdf",
    recipeCount: 100,
    era: "Security",
    themes: ["Security","Deterrence","Neighborhood"],
    highlights: ["Nonviolent deterrence that actually works","Lighting and visibility upgrades on a budget","Neighborhood readiness without alarm systems","Senior-friendly security habits","Checklists for every entry point"],
  },
  {
    slug: "off-grid-water-food-preservation",
    title: "The Off-Grid Water & Food Preservation Guide",
    shortTitle: "Water & Preservation Guide",
    subtitle: "Safe Storage, Purification & Preservation When Utilities Fail",
    price: 27,
    compareAt: 49,
    coverImage: "/images/covers/off-grid-water-food-preservation.png",
    pdfFilename: "off-grid-water-food-preservation.pdf",
    recipeCount: 100,
    era: "Water",
    themes: ["Water","Preservation","Off-Grid"],
    highlights: ["Water storage and purification methods","Food preservation without refrigeration","Safe handling when utilities fail","Frontier-era techniques modernized","Family-sized planning worksheets"],
  },
];

export const BUNDLE: Product = {
  slug: "bundle",
  title: "The Forgotten American Survival Library",
  shortTitle: "Complete Library",
  subtitle: "All 5 preparedness manuals in one complete emergency library — blackout, shelter, stockpile, security, and water",
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
