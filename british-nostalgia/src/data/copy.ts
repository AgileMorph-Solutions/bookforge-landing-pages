export const siteConfig = {
  name: "British Nostalgia",
  tagline: "A Pension Kitchen Library",
  youtubeUrl: "https://www.youtube.com/channel/UCgk-7pjbA3JoGEPSlGWUPVg",
  youtubeSubscribers: "14.3K",
  averageRating: "4.9",
  readerCount: "4,820+",
  guaranteeDays: 30,
  firstEditionSpotsLeft: 180,
  bundlePriceEndAt: 5000,
  contentUnitLabel: "recipes",
  successDownloadLabel: "Download your cookbooks below.",
};

export const heroCopy = {
  headline: "Nan's kitchen wisdom. Finally written down for your table.",
  subheadline: "Five cookbooks for eating well on a pension — eggs, tinned food, quick suppers, batch cooking, and waste-free habits. Every recipe built for one person on a tight budget.",
  primaryCta: "Get the Library",
  secondaryCta: "Browse the collection",
};

export const costComparison = {
  modern: [{"label":"Ready meal (single serving)","cost":"£4–£6"},{"label":"Takeaway fish and chips","cost":"£8–£12"},{"label":"Pub lunch","cost":"£12–£18"},{"label":"Weekly food delivery app","cost":"£45+"},{"label":"Eating out twice a week","cost":"£80+"}],
  vintage: [{"label":"Egg and potato supper for one","cost":"~£0.80"},{"label":"Tinned food tea-time plate","cost":"~£1.20"},{"label":"5-minute cupboard supper","cost":"~£1.50"},{"label":"Batch-cooked week of meals","cost":"~£15"},{"label":"Two pensioners cooking from library","cost":"£25–£35"}],
};

export const recipePreviews = [
  {
    "name": "Egg & Potato Cookbook",
    "era": "British",
    "detail": "Eggs",
    bookSlug: "british-pensioner-egg-potato-cookbook" as const,
    "image": "/images/covers/british-pensioner-egg-potato-cookbook.png"
  },
  {
    "name": "Tinned Food Bible",
    "era": "Cupboard",
    "detail": "Tinned Food",
    bookSlug: "tinned-food-tea-time-bible" as const,
    "image": "/images/covers/tinned-food-tea-time-bible.png"
  },
  {
    "name": "5-Minute Suppers",
    "era": "Quick",
    "detail": "Quick Meals",
    bookSlug: "five-minute-british-suppers" as const,
    "image": "/images/covers/five-minute-british-suppers.png"
  },
  {
    "name": "Batch-Cooking Plan",
    "era": "Batch",
    "detail": "Batch Cooking",
    bookSlug: "one-person-batch-cooking-plan" as const,
    "image": "/images/covers/one-person-batch-cooking-plan.png"
  }
];

export const youtubeSection = {
  headline: "Built from real research. Not recycled listicles.",
  body: "British Nostalgia preserves the heart of British domestic history — Nan-approved hacks, forgotten recipes, and the resilient spirit of the British Isles. This library puts those meals in order for pensioners cooking for one.",
};

export const guaranteeCopy = {
  headline: "The First Plate Promise",
  body: "You get a full month. Try the guides. If they never earn their keep — one email gets a full refund. Keep every book. No returns. No fine print.",
};

export const orderCopy = {
  headline: "Pay £44.99 once. Eat well forever.",
  subheadline: "Your download link lands in email within about a minute. Read on phone, tablet, or laptop — or print the recipes by the cooker.",
  individualNote:
    "Want only one volume? Singles start at £9.99. Buying all five alone adds up to £49.95 — which is why most people take the full set at £44.99.",
};

export const lastCallCopy = {
  headline: "Stop paying takeaway prices for meals Nan made for pennies.",
  body: "£44.99 covers all five cookbooks. Cook a few this month; if they never earn their keep, one email gets a full refund.",
};
