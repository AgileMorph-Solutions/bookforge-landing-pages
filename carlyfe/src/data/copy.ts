export const siteConfig = {
  name: "CARLYFE",
  tagline: "A Smart Buyer Library",
  youtubeUrl: "https://www.youtube.com/@CARLYFE1",
  youtubeSubscribers: "52.4K",
  averageRating: "4.9",
  readerCount: "4,820+",
  guaranteeDays: 30,
  firstEditionSpotsLeft: 180,
  bundlePriceEndAt: 5000,
  contentUnitLabel: "tips",
  successDownloadLabel: "Download your guides below.",
};

export const heroCopy = {
  headline: "Buy the car that lasts. Not the one the dealer wants to move.",
  subheadline: "Five guides for the 2026 used car market — inspection, negotiation, maintenance, and ownership. Built from the same research behind CARLYFE's 500,000-mile legends and hidden-gem finds.",
  primaryCta: "Get the Library",
  secondaryCta: "Browse the collection",
};

export const costComparison = {
  modern: [{"label":"Dealer markup on 'certified' used","cost":"$2,000–$5,000"},{"label":"Surprise repair (first year)","cost":"$1,500–$4,000"},{"label":"Extended warranty (often unused)","cost":"$1,200–$3,000"},{"label":"Overpriced dealer maintenance","cost":"$200–$500/visit"},{"label":"Wrong car — sell at loss","cost":"$3,000+"}],
  vintage: [{"label":"Pre-purchase inspection","cost":"~$150"},{"label":"Negotiated hidden-gem purchase","cost":"Thousands saved"},{"label":"Monthly preventive maintenance","cost":"~$30"},{"label":"DIY fluid and filter change","cost":"~$25"},{"label":"Full library — avoid one bad buy","cost":"$59"}],
};

export const recipePreviews = [
  {
    "name": "400K-Mile Buyer Guide",
    "era": "Buying",
    "detail": "Inspection",
    bookSlug: "400k-mile-used-car-buyers-guide" as const,
    "image": "/images/covers/400k-mile-used-car-buyers-guide.png"
  },
  {
    "name": "Senior Driver Handbook",
    "era": "Seniors",
    "detail": "Comfort",
    bookSlug: "senior-drivers-smart-car-handbook" as const,
    "image": "/images/covers/senior-drivers-smart-car-handbook.png"
  },
  {
    "name": "Pickup & SUV Guide",
    "era": "Trucks",
    "detail": "Trucks",
    bookSlug: "bulletproof-pickup-suv-guide" as const,
    "image": "/images/covers/bulletproof-pickup-suv-guide.png"
  },
  {
    "name": "Under $10K Playbook",
    "era": "Budget",
    "detail": "Negotiation",
    bookSlug: "under-10k-car-buying-playbook" as const,
    "image": "/images/covers/under-10k-car-buying-playbook.png"
  }
];

export const youtubeSection = {
  headline: "Built from real research. Not recycled listicles.",
  body: "CARLYFE navigates the chaotic used car market to find hidden gems the average buyer overlooks. This library puts those inspection points, negotiation tactics, and maintenance calendars in one place.",
};

export const guaranteeCopy = {
  headline: "The 30-Day Promise",
  body: "You get a full month. Try the guides. If they never earn their keep — one email gets a full refund. Keep every book. No returns. No fine print.",
};

export const orderCopy = {
  headline: "Pay $59 once. Drive smarter forever.",
  subheadline: "Your download link lands in email within about a minute. Print the inspection checklists before your next lot visit.",
  individualNote:
    "Want only one volume? Singles start at $19. Buying all five alone adds up to $127 — which is why most people take the full set at $59.",
};

export const lastCallCopy = {
  headline: "One bad purchase costs more than this entire library.",
  body: "$59 covers all five guides. Use them on your next purchase; if they never earn their keep, one email gets a full refund.",
};
