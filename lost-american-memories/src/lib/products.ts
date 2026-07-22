export type ProductSlug =
  | "poor-man-recipe-bible"
  | "1950s-grandma-cookbook"
  | "great-depression-survival"
  | "cowboy-frontier"
  | "lost-diners-potlucks"
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

export const INDIVIDUAL_BOOKS: Product[] = [
  {
    slug: "poor-man-recipe-bible",
    title: "The Poor Man Recipe Bible",
    shortTitle: "Poor Man Recipe Bible",
    subtitle:
      "100 Forgotten Cheap Meals Our Grandparents Made When Money Was Tight",
    price: 19,
    compareAt: 39,
    coverImage: "/images/covers/poor-man-recipe-bible.jpg",
    pdfFilename: "the-poor-man-recipe-bible-fixed.pdf",
    recipeCount: 100,
    era: "Depression Era",
    themes: ["Pantry Meals", "Budget Cooking", "Stretch-Your-Paycheck"],
    highlights: [
      "Pantry stews that still fill a table for under $2 a plate",
      "Three-ingredient weeknight plates from old pantry lists",
      "Beans and rice meant to stretch a thin paycheck",
      "Leftover makeovers that never made it onto a typed card",
      "Today’s grocery cost printed beside every dish",
    ],
  },
  {
    slug: "1950s-grandma-cookbook",
    title: "The 1950s Grandma Cookbook",
    shortTitle: "1950s Grandma Cookbook",
    subtitle:
      "100 Forgotten Breakfasts, Dinners, Casseroles & Desserts No One Makes Anymore",
    price: 27,
    compareAt: 49,
    coverImage: "/images/covers/1950s-grandma-cookbook.jpg",
    pdfFilename: "the-1950s-grandma-cookbook-fixed.pdf",
    recipeCount: 100,
    era: "1950s",
    themes: ["Sunday Dinners", "Casseroles", "Church Potlucks"],
    highlights: [
      "Roast that carries Sunday into Monday lunch",
      "Green bean bake the fellowship-hall way",
      "Meatloaf that stops conversation mid-bite",
      "Cherry pie and biscuits from scratch",
      "Hot dishes that cleaned every potluck tray",
    ],
  },
  {
    slug: "great-depression-survival",
    title: "The Great Depression Survival Cookbook",
    shortTitle: "Great Depression Survival",
    subtitle:
      "100 Forgotten Poor Man Meals, Sandwiches, Soups & Desserts Our Grandparents Ate To Survive",
    price: 27,
    compareAt: 49,
    coverImage: "/images/covers/great-depression-survival.jpg",
    pdfFilename:
      "the-great-depression-survival-cookbook-100-forgotten-poor-ma.pdf",
    recipeCount: 100,
    era: "1930s",
    themes: ["Survival Meals", "Soups & Sandwiches", "Depression Cooking"],
    highlights: [
      "Hard-times stew that still works on a tight budget",
      "Thick sandwiches packed for the lunch pail",
      "Soups built when the pantry looked empty",
      "Sweets that skip eggs or butter when needed",
      "Farm-bulletin plates re-cooked for today’s kitchens",
    ],
  },
  {
    slug: "cowboy-frontier",
    title: "The Cowboy, Frontier & Working Man Cookbook",
    shortTitle: "Cowboy & Frontier",
    subtitle:
      "100 Rugged Meals Cowboys, Miners, Lumberjacks, Truckers & Mountain Men Actually Ate",
    price: 27,
    compareAt: 49,
    coverImage: "/images/covers/cowboy-frontier.jpg",
    pdfFilename:
      "the-cowboy-frontier-working-man-cookbook-100-rugged-meals-co.pdf",
    recipeCount: 100,
    era: "Frontier",
    themes: ["Cast Iron", "Campfire Cooking", "Working Man Meals"],
    highlights: [
      "Beans and cornbread from the chuck line",
      "One-pan meals for a single hungry cook",
      "Dutch oven pots over open flame",
      "Dawn breakfast that holds until supper",
      "Roadside and rail-camp plates from the haul",
    ],
  },
  {
    slug: "lost-diners-potlucks",
    title: "The Lost Diners, Potlucks & American Memories Cookbook",
    shortTitle: "Lost Diners & Potlucks",
    subtitle:
      "100 Forgotten Woolworth's-Style Lunch Counter Foods, Church Suppers, 1970s Snacks & Old-Fashioned Desserts",
    price: 27,
    compareAt: 49,
    coverImage: "/images/covers/lost-diners-potlucks.jpg",
    pdfFilename:
      "the-lost-diners-potlucks-american-memories-cookbook-100-forg.pdf",
    recipeCount: 100,
    era: "1940s–1970s",
    themes: ["Diner Counter", "Church Suppers", "Potluck Classics"],
    highlights: [
      "Lunch-counter plates like the old five-and-dime",
      "Church-supper casseroles and shared hot dishes",
      "Seventies snack cakes and party trays",
      "Banana pudding the fellowship-hall way",
      "Pies and slices from the lunch-case shelf",
    ],
  },
];

export const BUNDLE: Product = {
  slug: "bundle",
  title: "The Complete Cookbook Library",
  shortTitle: "Complete Library",
  subtitle:
    "All 5 nostalgic cookbooks together — 500 recipes, meals, and kitchen memories from America's forgotten kitchens",
  price: 49,
  compareAt: 152,
  coverImage: "/images/covers/bundle.jpg",
  pdfFilename: "",
  recipeCount: 500,
  themes: ["Complete Collection", "Best Value"],
  highlights: [
    "All five cookbooks — 500 recipes in one purchase",
    "Each dish photographed and priced for today’s stores",
    "PDF download you can open on any device",
    "Share freely with family who want the recipes",
    "First Edition pricing — often less than a week of takeout",
  ],
};

export const ALL_PRODUCTS: Product[] = [...INDIVIDUAL_BOOKS, BUNDLE];

export function getProductBySlug(slug: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.slug === slug);
}

export function formatPrice(amount: number): string {
  return `$${amount}`;
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
