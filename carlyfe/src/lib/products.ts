export type ProductSlug =
  | "400k-mile-used-car-buyers-guide"
  | "senior-drivers-smart-car-handbook"
  | "bulletproof-pickup-suv-guide"
  | "under-10k-car-buying-playbook"
  | "long-life-maintenance-calendar"
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
    slug: "400k-mile-used-car-buyers-guide",
    title: "The 400,000-Mile Used Car Buyer's Guide",
    shortTitle: "400K-Mile Buyer Guide",
    subtitle: "How to Spot Durable Cars Before You Buy",
    price: 19,
    compareAt: 39,
    coverImage: "/images/covers/400k-mile-used-car-buyers-guide.png",
    pdfFilename: "400k-mile-used-car-buyers-guide.pdf",
    recipeCount: 100,
    era: "Buying",
    themes: ["Inspection","Durability","High Mileage"],
    highlights: ["Spot 400K-mile legends before dealers mark them up","Engine and transmission red flags","Models that refuse to die","Inspection worksheets included","True-cost ownership math"],
  },
  {
    slug: "senior-drivers-smart-car-handbook",
    title: "The Senior Driver's Smart Car Handbook",
    shortTitle: "Senior Driver Handbook",
    subtitle: "Comfort, Visibility, Easy Entry & Low Ownership Costs",
    price: 27,
    compareAt: 49,
    coverImage: "/images/covers/senior-drivers-smart-car-handbook.png",
    pdfFilename: "senior-drivers-smart-car-handbook.pdf",
    recipeCount: 100,
    era: "Seniors",
    themes: ["Comfort","Visibility","Low Cost"],
    highlights: ["Cars with easy entry and exit","Visibility upgrades without dealer markup","Low ownership cost models ranked","Senior-friendly feature checklist","Insurance and maintenance savings"],
  },
  {
    slug: "bulletproof-pickup-suv-guide",
    title: "The Bulletproof Pickup & SUV Guide",
    shortTitle: "Pickup & SUV Guide",
    subtitle: "Inspection Points, Red Flags & True-Cost Worksheets",
    price: 27,
    compareAt: 49,
    coverImage: "/images/covers/bulletproof-pickup-suv-guide.png",
    pdfFilename: "bulletproof-pickup-suv-guide.pdf",
    recipeCount: 100,
    era: "Trucks",
    themes: ["Trucks","SUVs","Inspection"],
    highlights: ["Frame and underbody inspection points","Tow-rated models that last","Red flags dealers hope you miss","True-cost worksheets per model","4WD and drivetrain checks"],
  },
  {
    slug: "under-10k-car-buying-playbook",
    title: "The Under-$10,000 Car Buying Playbook",
    shortTitle: "Under $10K Playbook",
    subtitle: "Negotiation, Titles, Inspections & Repair-Budget Checklists",
    price: 27,
    compareAt: 49,
    coverImage: "/images/covers/under-10k-car-buying-playbook.png",
    pdfFilename: "under-10k-car-buying-playbook.pdf",
    recipeCount: 100,
    era: "Budget",
    themes: ["Negotiation","Titles","Budget"],
    highlights: ["Negotiate without dealer games","Title and lien checks step by step","Pre-purchase inspection checklist","Repair budget before you sign","Best models under $10K ranked"],
  },
  {
    slug: "long-life-maintenance-calendar",
    title: "The Long-Life Maintenance Calendar",
    shortTitle: "Maintenance Calendar",
    subtitle: "A Month-by-Month Plan to Keep Any Used Vehicle Running",
    price: 27,
    compareAt: 49,
    coverImage: "/images/covers/long-life-maintenance-calendar.png",
    pdfFilename: "long-life-maintenance-calendar.pdf",
    recipeCount: 100,
    era: "Maintenance",
    themes: ["Maintenance","Calendar","Longevity"],
    highlights: ["Month-by-month maintenance schedule","Fluid and filter intervals decoded","Catch problems before tow bills","DIY vs shop decision guide","Works for any make or model"],
  },
];

export const BUNDLE: Product = {
  slug: "bundle",
  title: "The CARLYFE Smart Buyer Library",
  shortTitle: "Complete Library",
  subtitle: "All 5 used-car buying and ownership guides in one bundle — inspection, negotiation, maintenance, and long-life ownership",
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
