export interface Testimonial {
  quote: string;
  author: string;
  location: string;
  source: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "I picked up 400K-Mile Buyer Guide first and had results the same afternoon. Ordered the full library before the week was out.",
    author: "Robert M.",
    location: "Phoenix, AZ",
    source: "The 400,000-Mile Used Car Buyer's Guide",
    rating: 5,
  },
  {
    quote:
      "Clear, no-nonsense writing. Exactly what I expected from CARLYFE — useful from page one.",
    author: "Susan K.",
    location: "Nashville, TN",
    source: "The Senior Driver's Smart Car Handbook",
    rating: 5,
  },
  {
    quote:
      "The bundle paid for itself faster than I thought. Pickup & SUV Guide alone was worth the purchase.",
    author: "James & Linda W.",
    location: "Columbus, OH",
    source: "The Bulletproof Pickup & SUV Guide",
    rating: 5,
  },
];
