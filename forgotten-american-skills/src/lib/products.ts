export type ProductSlug =
  | "old-timer-skills-handbook"
  | "vanishing-trades-starter-guide"
  | "hand-tool-home-repair-bible"
  | "traditional-food-preservation-guide"
  | "frontier-camping-manual"
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
    slug: "old-timer-skills-handbook",
    title: "The Old-Timer Skills Handbook",
    shortTitle: "Old-Timer Skills Handbook",
    subtitle: "100 Practical Skills for Camp, Home, Workshop & Homestead",
    price: 19,
    compareAt: 39,
    coverImage: "/images/covers/old-timer-skills-handbook.png",
    pdfFilename: "old-timer-skills-handbook.pdf",
    recipeCount: 100,
    era: "Homestead",
    themes: ["Camp","Workshop","Homestead"],
    highlights: ["100 practical skills for camp, home, and workshop","Self-reliance habits old-timers passed down","Simple tools, lasting value — no fancy equipment","Checklists for camp, kitchen, barn, and bench","Frontier-tested methods adapted for today"],
  },
  {
    slug: "vanishing-trades-starter-guide",
    title: "The Vanishing Trades Starter Guide",
    shortTitle: "Vanishing Trades Guide",
    subtitle: "Beginner Projects in Wood, Leather, Rope, Metal & Repair",
    price: 27,
    compareAt: 49,
    coverImage: "/images/covers/vanishing-trades-starter-guide.png",
    pdfFilename: "vanishing-trades-starter-guide.pdf",
    recipeCount: 100,
    era: "Trades",
    themes: ["Wood","Leather","Rope","Metal"],
    highlights: ["Beginner projects in wood, leather, rope, and metal","Hand-planing, joinery, and basic repair without power tools","Leather stitching and tool-roll projects","Knots, cordage, and rope work essentials","Revive trades your great-grandparents mastered by fifteen"],
  },
  {
    slug: "hand-tool-home-repair-bible",
    title: "The Hand-Tool Home Repair Bible",
    shortTitle: "Hand-Tool Repair Bible",
    subtitle: "Fixing, Sharpening, Mending & Maintaining Without Fancy Equipment",
    price: 27,
    compareAt: 49,
    coverImage: "/images/covers/hand-tool-home-repair-bible.png",
    pdfFilename: "hand-tool-home-repair-bible.pdf",
    recipeCount: 100,
    era: "Repair",
    themes: ["Fixing","Sharpening","Maintaining"],
    highlights: ["Fix, sharpen, and mend with hand tools only","No contractor call for common household repairs","Workbench layouts and tool-care routines","Mending, patching, and maintaining what you own","Hard work and simple tools beat replacement culture"],
  },
  {
    slug: "traditional-food-preservation-guide",
    title: "The Traditional Food Preservation Guide",
    shortTitle: "Food Preservation Guide",
    subtitle: "Drying, Pickling, Fermenting, Canning & Cold Storage Safely",
    price: 27,
    compareAt: 49,
    coverImage: "/images/covers/traditional-food-preservation-guide.png",
    pdfFilename: "traditional-food-preservation-guide.pdf",
    recipeCount: 100,
    era: "Pantry",
    themes: ["Drying","Pickling","Canning"],
    highlights: ["Drying, pickling, fermenting, and canning safely","Cold storage layouts for root cellars and pantries","Plan, prepare, preserve, provide, persevere","Homestead pantry setup on a practical budget","Self-reliance through food you put up yourself"],
  },
  {
    slug: "frontier-camping-manual",
    title: "The Frontier Camping Manual",
    shortTitle: "Frontier Camping Manual",
    subtitle: "Fire, Water, Shelter, Navigation & Responsible Campcraft",
    price: 27,
    compareAt: 49,
    coverImage: "/images/covers/frontier-camping-manual.png",
    pdfFilename: "frontier-camping-manual.pdf",
    recipeCount: 100,
    era: "Campcraft",
    themes: ["Fire","Shelter","Navigation"],
    highlights: ["Fire, water, shelter, and navigation fundamentals","Responsible campcraft without expensive gear","Frontier-tested setups for tent and open country","Map, compass, and trail-readiness checklists","Camp kitchen and overnight comfort with simple tools"],
  },
];

export const BUNDLE: Product = {
  slug: "bundle",
  title: "The Forgotten American Skills Master Library",
  shortTitle: "Complete Library",
  subtitle: "All 5 skills manuals in one library — campcraft, trades, home repair, food preservation, and homestead know-how",
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
