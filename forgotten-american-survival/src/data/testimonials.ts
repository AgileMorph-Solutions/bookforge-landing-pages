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
      "I picked up 7-Day Blackout Plan first and had results the same afternoon. Ordered the full library before the week was out.",
    author: "Robert M.",
    location: "Phoenix, AZ",
    source: "The 7-Day Blackout Survival Plan",
    rating: 5,
  },
  {
    quote:
      "Clear, no-nonsense writing. Exactly what I expected from Forgotten American Survival — useful from page one.",
    author: "Susan K.",
    location: "Nashville, TN",
    source: "The Forgotten Shelter & Warmth Manual",
    rating: 5,
  },
  {
    quote:
      "The bundle paid for itself faster than I thought. Emergency Stockpile alone was worth the purchase.",
    author: "James & Linda W.",
    location: "Columbus, OH",
    source: "The Poor Man's Emergency Stockpile",
    rating: 5,
  },
];
