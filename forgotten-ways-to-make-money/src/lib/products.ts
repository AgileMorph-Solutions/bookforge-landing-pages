export type ProductSlug =
  | "forgotten-side-hustle-playbook"
  | "thrift-to-wealth-habits"
  | "old-trade-income-manual"
  | "ledger-and-cashflow-guide"
  | "ingenuity-income-handbook"
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
    slug: "forgotten-side-hustle-playbook",
    title: "The Forgotten Side-Hustle Playbook",
    shortTitle: "Side-Hustle Playbook",
    subtitle: "100 Old Income Streams That Still Work Without an App",
    price: 19,
    compareAt: 39,
    coverImage: "/images/covers/forgotten-side-hustle-playbook.png",
    pdfFilename: "forgotten-side-hustle-playbook.pdf",
    recipeCount: 100,
    era: "Side Income",
    themes: ["Side Hustles","Cash","Ingenuity"],
    highlights: ["Income streams that predate the gig apps","Start with skills and tools you already own","Weekend and evening earning plans","100 practical plays, not theory","Built for households that need cash now"],
  },
  {
    slug: "thrift-to-wealth-habits",
    title: "Thrift-to-Wealth Habits",
    shortTitle: "Thrift-to-Wealth Habits",
    subtitle: "150 Money Habits from Frugal Generations That Still Compound",
    price: 27,
    compareAt: 49,
    coverImage: "/images/covers/thrift-to-wealth-habits.png",
    pdfFilename: "thrift-to-wealth-habits.pdf",
    recipeCount: 100,
    era: "Thrift",
    themes: ["Habits","Saving","Compounding"],
    highlights: ["Daily thrift habits that free cash to invest","Shopping, housing, and utility stretches","Ledgers your grandparents actually kept","150 habits ranked by impact","Turn saved dollars into working money"],
  },
  {
    slug: "old-trade-income-manual",
    title: "The Old Trade Income Manual",
    shortTitle: "Old Trade Income Manual",
    subtitle: "Skills, Services & Cash Work from Trades That Never Went Out of Style",
    price: 27,
    compareAt: 49,
    coverImage: "/images/covers/old-trade-income-manual.png",
    pdfFilename: "old-trade-income-manual.pdf",
    recipeCount: 100,
    era: "Trades",
    themes: ["Trades","Services","Cash Work"],
    highlights: ["Trade skills that neighbors still pay for","Price and package simple service offers","Tool lists that stay under a starter budget","Local demand maps and first-client scripts","Cash work without a corporate resume"],
  },
  {
    slug: "ledger-and-cashflow-guide",
    title: "The Ledger & Cashflow Guide",
    shortTitle: "Ledger & Cashflow Guide",
    subtitle: "Simple Books, Pricing & Cash Tracking for Small Earners",
    price: 27,
    compareAt: 49,
    coverImage: "/images/covers/ledger-and-cashflow-guide.png",
    pdfFilename: "ledger-and-cashflow-guide.pdf",
    recipeCount: 100,
    era: "Ledger",
    themes: ["Bookkeeping","Pricing","Cashflow"],
    highlights: ["Paper and spreadsheet ledgers that stick","Price work so you actually profit","Weekly cashflow checklists","Avoid the leaks that kill side income","Templates for solo earners"],
  },
  {
    slug: "ingenuity-income-handbook",
    title: "The Ingenuity Income Handbook",
    shortTitle: "Ingenuity Income Handbook",
    subtitle: "100 Resourceful Ways Past Generations Turned Scrap, Skill & Time into Pay",
    price: 27,
    compareAt: 49,
    coverImage: "/images/covers/ingenuity-income-handbook.png",
    pdfFilename: "ingenuity-income-handbook.pdf",
    recipeCount: 100,
    era: "Ingenuity",
    themes: ["Resourcefulness","Scrap","Prosperity"],
    highlights: ["Turn scrap, skill, and spare hours into pay","Resale, repair, and make-to-order plays","Prosperity habits from harder decades","100 ingenuity methods with modern notes","Wealth • Ingenuity • Prosperity — in practice"],
  },
];

export const BUNDLE: Product = {
  slug: "bundle",
  title: "The Forgotten Ways to Make Money Library",
  shortTitle: "Complete Library",
  subtitle: "All 5 income and ingenuity guides in one bundle — side hustles, thrift habits, trade income, ledgers, and prosperity playbooks",
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
