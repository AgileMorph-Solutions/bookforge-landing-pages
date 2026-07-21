export const siteConfig = {
  name: "American Food History",
  tagline: "A Historical Cookbook Archive",
  youtubeUrl: "https://www.youtube.com/channel/UCyCSbQ8ycQFpptUz5k6nltw",
  youtubeSubscribers: "23K",
  averageRating: "4.9",
  readerCount: "4,820+",
  guaranteeDays: 30,
  firstEditionSpotsLeft: 180,
  bundlePriceEndAt: 5000,
  contentUnitLabel: "recipes",
  successDownloadLabel: "Download your cookbooks below.",
};

export const heroCopy = {
  headline: "The meals America forgot. Cooked again for your kitchen.",
  subheadline: "Five cookbooks spanning Revolutionary tables to Route 66 diners — five hundred historical American recipes researched, adapted, and priced for today's grocery stores.",
  primaryCta: "Get the Library",
  secondaryCta: "Browse the collection",
};

export const costComparison = {
  modern: [{"label":"Historic-themed restaurant dinner","cost":"$45–$75"},{"label":"Steakhouse prime rib (two)","cost":"$80–$120"},{"label":"Food history book (single era)","cost":"$35–$50"},{"label":"Meal kit (one serving)","cost":"$11–$14"},{"label":"Week of dining out","cost":"$150+"}],
  vintage: [{"label":"1776-era stew from pantry","cost":"~$4 a plate"},{"label":"Steakhouse prime rib at home","cost":"~$12 a plate"},{"label":"Route 66 diner plate","cost":"~$6 a plate"},{"label":"Supper club fish fry","cost":"~$8 a plate"},{"label":"Two adults cooking from archive","cost":"$50–$70"}],
};

export const recipePreviews = [
  {
    "name": "1776 American Table",
    "era": "1776",
    "detail": "Revolutionary",
    bookSlug: "1776-american-table" as const,
    "image": "/images/covers/1776-american-table.png"
  },
  {
    "name": "Steakhouse Cookbook",
    "era": "Steakhouse",
    "detail": "Steakhouse",
    bookSlug: "lost-american-steakhouse-cookbook" as const,
    "image": "/images/covers/lost-american-steakhouse-cookbook.png"
  },
  {
    "name": "Route 66 Cookbook",
    "era": "Route 66",
    "detail": "Diner",
    bookSlug: "route-66-roadside-cookbook" as const,
    "image": "/images/covers/route-66-roadside-cookbook.png"
  },
  {
    "name": "Outlaws & Soldiers",
    "era": "Historical",
    "detail": "Outlaws",
    bookSlug: "outlaws-pirates-soldiers-cookbook" as const,
    "image": "/images/covers/outlaws-pirates-soldiers-cookbook.png"
  }
];

export const youtubeSection = {
  headline: "Built from real research. Not recycled listicles.",
  body: "American Food History explores the forgotten recipes and dining experiences that shaped the nation. This archive puts those dishes in order — tested in modern kitchens with historical context for every plate.",
};

export const guaranteeCopy = {
  headline: "The First Plate Promise",
  body: "You get a full month. Try the guides. If they never earn their keep — one email gets a full refund. Keep every book. No returns. No fine print.",
};

export const orderCopy = {
  headline: "Pay $59 once. Taste history forever.",
  subheadline: "Your download link lands in email within about a minute. Open on any device or print the recipes you want in the kitchen.",
  individualNote:
    "Want only one volume? Singles start at $19. Buying all five alone adds up to $127 — which is why most people take the full set at $59.",
};

export const lastCallCopy = {
  headline: "Five centuries of American tables. One library.",
  body: "$59 covers all five cookbooks. Cook a few this month; if the food never lands right, one email gets a full refund.",
};
