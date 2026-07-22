export const siteConfig = {
  name: "Lost American Memories",
  tagline: "A Recipe Library",
  youtubeUrl: "https://www.youtube.com/channel/UCUB-Wy3XzxtPdvfAmD8DMrg",
  youtubeSubscribers: "84.1K",
  averageRating: "4.9",
  readerCount: "4,820+",
  guaranteeDays: 30,
  firstEditionSpotsLeft: 180,
  bundlePriceEndAt: 5000,
  contentUnitLabel: "recipes",
};

export const heroCopy = {
  // Title page — keep as recently written
  headline: "The recipes she made from memory. Finally written down.",
  subheadline:
    "Five cookbooks. Five hundred dishes that once lived only in kitchen memory — pulled from tattered binders, handwritten index cards, and boxes tucked in attics. Each one cooked through in a modern kitchen, with today's grocery costs printed beside the plate.",
  primaryCta: "Get the Library",
  secondaryCta: "Browse the collection",
};

export const costComparison = {
  modern: [
    { label: "Sit-down family restaurant, Sunday plate", cost: "$25–$34" },
    { label: "Delivery app weeknight order", cost: "$19–$28" },
    { label: "Microwave “home style” tray", cost: "$7–$10" },
    { label: "Subscription meal kit, one serving", cost: "$11–$14" },
    { label: "Two adults eating out-ish all week", cost: "$130+" },
  ],
  vintage: [
    { label: "Pot roast Sunday, feeds the house", cost: "~$5 a plate" },
    { label: "Depression-era stew from pantry scrap", cost: "~$1.25 a plate" },
    { label: "Beans and rice, fellowship-hall style", cost: "~$2 a plate" },
    { label: "Cast-iron skillet supper for one", cost: "~$3.50 a plate" },
    { label: "Two adults cooking from the library", cost: "$40–$60" },
  ],
};

export const recipePreviews = [
  {
    name: "Pantry Stew",
    era: "1930s",
    detail: "Hard-times classic · about $1.25 a plate",
    bookSlug: "great-depression-survival" as const,
    image: "/images/recipes/pantry-stew.png",
  },
  {
    name: "Sunday Roast",
    era: "1950s",
    detail: "Feeds a crowd · leftover lunches built in",
    bookSlug: "1950s-grandma-cookbook" as const,
    image: "/images/recipes/sunday-roast.png",
  },
  {
    name: "Trail Skillet Beans",
    era: "Frontier",
    detail: "Cast iron · campfire-ready",
    bookSlug: "cowboy-frontier" as const,
    image: "/images/recipes/trail-skillet-beans.png",
  },
  {
    name: "Fellowship Hall Pudding",
    era: "1960s",
    detail: "Potluck dessert · no frills",
    bookSlug: "lost-diners-potlucks" as const,
    image: "/images/recipes/fellowship-hall-pudding.png",
  },
];

export const youtubeSection = {
  headline: "Found in real kitchens. Not invented for clicks.",
  body: "These pages come from the same kind of paper trails home cooks actually left behind: spiral church binders, card catalogs from estate cleanouts, wartime farm pamphlets, and clipped magazine pages folded into cookbooks. That story continues each week on Lost American Memories — a channel built around real plates, not nostalgia cosplay. This library is that archive put in order, tested, and priced for today.",
};

export const guaranteeCopy = {
  headline: "The First Plate Promise",
  body: "You get a full month. Cook a few recipes from the set. If the food never lands the way you hoped — that familiar, everyday comfort — write us once and we refund every dollar. Keep every book. No shipping a return. No fine print hunting.",
};

export const orderCopy = {
  headline: "Pay $49 once. Open it forever.",
  subheadline:
    "Your download link lands in email within about a minute. Read on phone, tablet, or laptop — or print the pages you want hanging near the stove.",
  individualNote:
    "Want only one volume? Singles start at $19. Buying all five alone adds up to $127 — which is why most people take the full set at $49.",
};

export const lastCallCopy = {
  headline: "Quit spending restaurant money on meals she made from scrap.",
  body: "$49 covers all 500 recipes across five books. Try a few this month; if the food never feels right, one email gets a full refund — and you still keep the set.",
};
