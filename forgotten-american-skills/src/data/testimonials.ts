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
      "I picked up Old-Timer Skills Handbook first and had results the same afternoon. Ordered the full library before the week was out.",
    author: "Robert M.",
    location: "Phoenix, AZ",
    source: "The Old-Timer Skills Handbook",
    rating: 5,
  },
  {
    quote:
      "Clear, no-nonsense writing. Exactly what I expected from Forgotten American Skills — useful from page one.",
    author: "Susan K.",
    location: "Nashville, TN",
    source: "The Vanishing Trades Starter Guide",
    rating: 5,
  },
  {
    quote:
      "The bundle paid for itself faster than I thought. Hand-Tool Repair Bible alone was worth the purchase.",
    author: "James & Linda W.",
    location: "Columbus, OH",
    source: "The Hand-Tool Home Repair Bible",
    rating: 5,
  },
];
