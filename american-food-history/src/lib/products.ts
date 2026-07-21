export type ProductSlug =
  | "1776-american-table"
  | "lost-american-steakhouse-cookbook"
  | "route-66-roadside-cookbook"
  | "outlaws-pirates-soldiers-cookbook"
  | "great-american-supper-club-cookbook"
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
    slug: "1776-american-table",
    title: "The 1776 American Table",
    shortTitle: "1776 American Table",
    subtitle: "100 Revolutionary-Era Recipes Adapted for Modern Kitchens",
    price: 19,
    compareAt: 39,
    coverImage: "/images/covers/1776-american-table.png",
    pdfFilename: "1776-american-table.pdf",
    recipeCount: 100,
    era: "1776",
    themes: ["Revolutionary","Colonial","Historic"],
    highlights: ["Revolutionary-era plates for modern kitchens","Sourced from period cookbooks and letters","Ingredient substitutions explained","100 recipes with historical context","Perfect for history-minded cooks"],
  },
  {
    slug: "lost-american-steakhouse-cookbook",
    title: "The Lost American Steakhouse Cookbook",
    shortTitle: "Steakhouse Cookbook",
    subtitle: "Prime Rib, Chops, Sides, Sauces & Desserts",
    price: 27,
    compareAt: 49,
    coverImage: "/images/covers/lost-american-steakhouse-cookbook.png",
    pdfFilename: "lost-american-steakhouse-cookbook.pdf",
    recipeCount: 100,
    era: "Steakhouse",
    themes: ["Steakhouse","Prime Rib","Classic Sides"],
    highlights: ["Prime rib the old steakhouse way","Chops, sides, and signature sauces","Desserts from the supper-club era","Restaurant techniques at home","100 steakhouse classics recovered"],
  },
  {
    slug: "route-66-roadside-cookbook",
    title: "The Route 66 Roadside Cookbook",
    shortTitle: "Route 66 Cookbook",
    subtitle: "Diner, Drive-In, Motel-Café & Gas-Stop Classics",
    price: 27,
    compareAt: 49,
    coverImage: "/images/covers/route-66-roadside-cookbook.png",
    pdfFilename: "route-66-roadside-cookbook.pdf",
    recipeCount: 100,
    era: "Route 66",
    themes: ["Diner","Drive-In","Road Trip"],
    highlights: ["Diner counters and drive-in classics","Motel-café and gas-stop plates","Road-trip recipes from America's highway","Nostalgic flavors from the Mother Road","100 roadside recipes recovered"],
  },
  {
    slug: "outlaws-pirates-soldiers-cookbook",
    title: "The Outlaws, Pirates & Soldiers Cookbook",
    shortTitle: "Outlaws & Soldiers",
    subtitle: "Rugged Historical Meals and the Stories Behind Them",
    price: 27,
    compareAt: 49,
    coverImage: "/images/covers/outlaws-pirates-soldiers-cookbook.png",
    pdfFilename: "outlaws-pirates-soldiers-cookbook.pdf",
    recipeCount: 100,
    era: "Historical",
    themes: ["Outlaws","Military","Frontier"],
    highlights: ["Meals from outlaws, pirates, and soldiers","Historical context for every dish","Rugged plates adapted for home kitchens","Stories behind the food","100 historical recipes recovered"],
  },
  {
    slug: "great-american-supper-club-cookbook",
    title: "The Great American Supper Club Cookbook",
    shortTitle: "Supper Club Cookbook",
    subtitle: "Relish Trays, Steak, Fish Fries, Drinks & Desserts",
    price: 27,
    compareAt: 49,
    coverImage: "/images/covers/great-american-supper-club-cookbook.png",
    pdfFilename: "great-american-supper-club-cookbook.pdf",
    recipeCount: 100,
    era: "Supper Club",
    themes: ["Supper Club","Relish Trays","Fish Fry"],
    highlights: ["Relish trays the supper-club way","Steak and fish-fry nights at home","Classic drinks and desserts","Midwest supper-club traditions","100 recipes from America's clubs"],
  },
];

export const BUNDLE: Product = {
  slug: "bundle",
  title: "The American Food History Cookbook Archive",
  shortTitle: "Complete Library",
  subtitle: "All 5 historical American cookbooks in one complete archive — Revolutionary era through supper clubs",
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
