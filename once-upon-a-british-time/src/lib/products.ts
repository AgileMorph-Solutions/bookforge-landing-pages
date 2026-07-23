export type ProductSlug =
  | "british-grocery-lasting-bible"
  | "allotment-kitchen-handbook"
  | "cupboard-cookery-manual"
  | "nan-waste-free-kitchen"
  | "british-batch-and-preserve-plan"
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

export const CHECKOUT_CURRENCY = "gbp" as "usd" | "gbp";

export const INDIVIDUAL_BOOKS: Product[] = [
  {
    slug: "british-grocery-lasting-bible",
    title: "The British Freezer Bible",
    shortTitle: "British Freezer Bible",
    subtitle: "150 Foods, Meals & Money-Saving Tricks for the Freezer",
    price: 9.99,
    compareAt: 17.99,
    coverImage: "/images/covers/british-grocery-lasting-bible.png",
    pdfFilename: "british-grocery-lasting-bible.pdf",
    recipeCount: 150,
    era: "Freezer",
    themes: ["Freezer", "Food Waste", "Money Saving"],
    highlights: [
      "150 freezer foods, meals, and money-saving tricks",
      "Stretch every shop with smart freeze-and-reheat habits",
      "Batch freeze without fancy equipment",
      "Cut the £730 average food-waste bill",
      "Practical UK kitchen freezer wisdom",
    ],
  },
  {
    slug: "allotment-kitchen-handbook",
    title: "The Allotment Kitchen Handbook",
    shortTitle: "Allotment Kitchen Handbook",
    subtitle: "75 Seasonal British Recipes from Plot to Plate",
    price: 9.99,
    compareAt: 17.99,
    coverImage: "/images/covers/allotment-kitchen-handbook.png",
    pdfFilename: "allotment-kitchen-handbook.pdf",
    recipeCount: 100,
    era: "Allotment",
    themes: ["Seasonal","Garden","British"],
    highlights: ["Seasonal plates from allotment staples","Stretch a glut without waste","Simple recipes for one or two","Plot-to-plate planning calendars","British garden classics recovered"],
  },
  {
    slug: "cupboard-cookery-manual",
    title: "The Cupboard Cookery Manual",
    shortTitle: "Cupboard Cookery Manual",
    subtitle: "100 Meals from Tins, Packets & Pantry Staples",
    price: 9.99,
    compareAt: 17.99,
    coverImage: "/images/covers/cupboard-cookery-manual.png",
    pdfFilename: "cupboard-cookery-manual.pdf",
    recipeCount: 100,
    era: "Cupboard",
    themes: ["Tinned Food","Pantry","Budget"],
    highlights: ["Meals from beans, soup, and packets","No fancy ingredients required","Tea-time and supper classics","Stretch a weekly shop further","100 cupboard recipes for real kitchens"],
  },
  {
    slug: "nan-waste-free-kitchen",
    title: "Nan's Waste-Free Kitchen",
    shortTitle: "Nan's Waste-Free Kitchen",
    subtitle: "100 Old British Habits, Shopping Tricks & Leftover Recipes",
    price: 9.99,
    compareAt: 17.99,
    coverImage: "/images/covers/nan-waste-free-kitchen.png",
    pdfFilename: "nan-waste-free-kitchen.pdf",
    recipeCount: 100,
    era: "Nan",
    themes: ["Habits","Shopping","Leftovers"],
    highlights: ["100 habits passed down generations","Shopping tricks that still work at the till","Leftover plates Nan never wasted","Stretch every penny of the weekly shop","Quiet resourcefulness of British homes"],
  },
  {
    slug: "british-batch-and-preserve-plan",
    title: "The British Batch & Preserve Plan",
    shortTitle: "Batch & Preserve Plan",
    subtitle: "Cook Once, Freeze Smart & Put Food By the Old Way",
    price: 9.99,
    compareAt: 17.99,
    coverImage: "/images/covers/british-batch-and-preserve-plan.png",
    pdfFilename: "british-batch-and-preserve-plan.pdf",
    recipeCount: 100,
    era: "Preserve",
    themes: ["Batch Cooking","Preserving","Freezer"],
    highlights: ["Cook once, eat well all week","Freezer-friendly British meals","Jam, pickle, and cold-store basics","Portion plans for one or a family","Shopping lists that waste nothing"],
  },
];

export const BUNDLE: Product = {
  slug: "bundle",
  title: "The Once Upon A British Time Kitchen Library",
  shortTitle: "Complete Library",
  subtitle: "All 5 British domestic guides in one bundle — grocery lasting, allotment cooking, cupboard meals, waste-free Nan habits, and batch preserving",
  price: 44.99,
  compareAt: 134.95,
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
    { label: "Family Sharing License", value: 15 },
    { label: "First Edition Lifetime Updates", value: 17 },
  ];
}
