export type ProductSlug =
  | "british-pensioner-egg-potato-cookbook"
  | "tinned-food-tea-time-bible"
  | "five-minute-british-suppers"
  | "one-person-batch-cooking-plan"
  | "nans-pension-kitchen"
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
    slug: "british-pensioner-egg-potato-cookbook",
    title: "The British Pensioner's Egg & Potato Cookbook",
    shortTitle: "Egg & Potato Cookbook",
    subtitle: "100 Filling Dinners for One That Cost Pennies",
    price: 9.99,
    compareAt: 17.99,
    coverImage: "/images/covers/british-pensioner-egg-potato-cookbook.png",
    pdfFilename: "british-pensioner-egg-potato-cookbook.pdf",
    recipeCount: 100,
    era: "British",
    themes: ["Eggs","Potatoes","One Person"],
    highlights: ["100 dinners for one on a pension budget","Eggs and potatoes — the cheapest proteins","Filling plates that cost pennies","Nan-approved shortcuts throughout","Perfect for eating alone"],
  },
  {
    slug: "tinned-food-tea-time-bible",
    title: "The Tinned Food Tea-Time Bible",
    shortTitle: "Tinned Food Bible",
    subtitle: "100 Easy British Meals from Beans, Soup, Corned Beef & Cupboard Staples",
    price: 9.99,
    compareAt: 17.99,
    coverImage: "/images/covers/tinned-food-tea-time-bible.png",
    pdfFilename: "tinned-food-tea-time-bible.pdf",
    recipeCount: 100,
    era: "Cupboard",
    themes: ["Tinned Food","Tea Time","Cupboard"],
    highlights: ["Meals from beans, soup, and corned beef","Cupboard staples stretched further","Tea-time classics on a budget","No fancy ingredients required","100 tinned-food recipes"],
  },
  {
    slug: "five-minute-british-suppers",
    title: "The 5-Minute British Suppers Cookbook",
    shortTitle: "5-Minute Suppers",
    subtitle: "75 Comforting Meals for One When You're Too Tired to Cook",
    price: 9.99,
    compareAt: 17.99,
    coverImage: "/images/covers/five-minute-british-suppers.png",
    pdfFilename: "five-minute-british-suppers.pdf",
    recipeCount: 100,
    era: "Quick",
    themes: ["Quick Meals","Comfort","One Person"],
    highlights: ["75 suppers ready in five minutes","For when you're too tired to cook","Comfort food without the fuss","One-person portions throughout","Nan's shortcuts included"],
  },
  {
    slug: "one-person-batch-cooking-plan",
    title: "The One-Person British Batch-Cooking Plan",
    shortTitle: "Batch-Cooking Plan",
    subtitle: "Cook Once, Freeze Smart & Eat Well All Week",
    price: 9.99,
    compareAt: 17.99,
    coverImage: "/images/covers/one-person-batch-cooking-plan.png",
    pdfFilename: "one-person-batch-cooking-plan.pdf",
    recipeCount: 100,
    era: "Batch",
    themes: ["Batch Cooking","Freezer","Planning"],
    highlights: ["Cook once, eat well all week","Freezer-friendly British meals","Portion plans for one person","Waste nothing from a weekly shop","Shopping lists included"],
  },
  {
    slug: "nans-pension-kitchen",
    title: "Nan's Pension Kitchen",
    shortTitle: "Nan's Pension Kitchen",
    subtitle: "100 Old British Habits, Shopping Tricks & Waste-Free Recipes",
    price: 9.99,
    compareAt: 17.99,
    coverImage: "/images/covers/nans-pension-kitchen.png",
    pdfFilename: "nans-pension-kitchen.pdf",
    recipeCount: 100,
    era: "Nan",
    themes: ["Habits","Shopping","Waste-Free"],
    highlights: ["100 old British kitchen habits","Shopping tricks that still work","Waste-free recipes from Nan's day","Stretch every penny at the till","Habits passed down generations"],
  },
];

export const BUNDLE: Product = {
  slug: "bundle",
  title: "The British Nostalgia Pension Kitchen Library",
  shortTitle: "Complete Library",
  subtitle: "All 5 budget cookbooks for one in one complete bundle — eggs, tinned food, quick suppers, batch cooking, and Nan's kitchen",
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
