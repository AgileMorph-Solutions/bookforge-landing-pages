export type ProductSlug =
  | "hydrogen-peroxide-homeowner-bible"
  | "baking-soda-vinegar-salt-manual"
  | "cheap-pest-proof-home"
  | "stop-throwing-it-away"
  | "five-dollar-home-maintenance"
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
    slug: "hydrogen-peroxide-homeowner-bible",
    title: "The Hydrogen Peroxide Homeowner Bible",
    shortTitle: "Hydrogen Peroxide Bible",
    subtitle: "101 Cheap Cleaning, Drain, Laundry, Garden & Pest-Control Uses",
    price: 19,
    compareAt: 39,
    coverImage: "/images/covers/hydrogen-peroxide-homeowner-bible.png",
    pdfFilename: "hydrogen-peroxide-homeowner-bible.pdf",
    recipeCount: 100,
    era: "Home Hacks",
    themes: ["Cleaning","Laundry","Garden"],
    highlights: ["Drain and grout fixes without harsh chemicals","Laundry brightening on a shoestring","Garden and pest uses from one bottle","Replace expensive single-purpose cleaners","Step-by-step for every room in the house"],
  },
  {
    slug: "baking-soda-vinegar-salt-manual",
    title: "The Baking Soda, Vinegar & Salt Fix-It Manual",
    shortTitle: "Baking Soda & Vinegar Manual",
    subtitle: "150 Low-Cost Home Hacks That Replace Expensive Products",
    price: 27,
    compareAt: 49,
    coverImage: "/images/covers/baking-soda-vinegar-salt-manual.png",
    pdfFilename: "baking-soda-vinegar-salt-manual.pdf",
    recipeCount: 100,
    era: "Pantry Fixes",
    themes: ["DIY","Cleaning","Repairs"],
    highlights: ["Pantry staples that replace store-bought products","Kitchen, bath, and laundry fixes","Safe alternatives to harsh chemicals","150 tested household hacks","Costs pennies per use"],
  },
  {
    slug: "cheap-pest-proof-home",
    title: "The Cheap Pest-Proof Home",
    shortTitle: "Pest-Proof Home",
    subtitle: "Safe DIY Prevention for Ants, Roaches, Flies, Mosquitoes & More",
    price: 27,
    compareAt: 49,
    coverImage: "/images/covers/cheap-pest-proof-home.png",
    pdfFilename: "cheap-pest-proof-home.pdf",
    recipeCount: 100,
    era: "Prevention",
    themes: ["Pest Control","Safety","Prevention"],
    highlights: ["Block entry points before you spray","Safe deterrents for common pests","Seasonal prevention checklists","No expensive exterminator visits","Family-safe methods throughout"],
  },
  {
    slug: "stop-throwing-it-away",
    title: "Stop Throwing It Away",
    shortTitle: "Stop Throwing It Away",
    subtitle: "100 Ways to Reuse, Repurpose & Regrow Everyday Household Items",
    price: 27,
    compareAt: 49,
    coverImage: "/images/covers/stop-throwing-it-away.png",
    pdfFilename: "stop-throwing-it-away.pdf",
    recipeCount: 100,
    era: "Reuse",
    themes: ["Reuse","Repurpose","Regrow"],
    highlights: ["Turn jars, boxes, and scraps into useful tools","Regrow groceries from kitchen scraps","Cut waste and save on replacements","100 practical reuse projects","Works with what you already own"],
  },
  {
    slug: "five-dollar-home-maintenance",
    title: "The $5 Home Maintenance Handbook",
    shortTitle: "$5 Maintenance Handbook",
    subtitle: "Small Preventive Fixes That Help Stop Big Repair Bills",
    price: 27,
    compareAt: 49,
    coverImage: "/images/covers/five-dollar-home-maintenance.png",
    pdfFilename: "five-dollar-home-maintenance.pdf",
    recipeCount: 100,
    era: "Maintenance",
    themes: ["Prevention","Repairs","Savings"],
    highlights: ["Catch small problems before they explode","Seasonal maintenance checklists","Tools and fixes under five dollars","Avoid emergency plumber calls","Month-by-month home care plan"],
  },
];

export const BUNDLE: Product = {
  slug: "bundle",
  title: "The Stop Wasting Stuff Home-Savings Library",
  shortTitle: "Complete Library",
  subtitle: "All 5 money-saving home guides in one complete bundle — cleaning, fixes, pest control, reuse, and maintenance",
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
