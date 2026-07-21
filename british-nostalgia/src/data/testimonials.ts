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
      "I picked up Egg & Potato Cookbook first and had results the same afternoon. Ordered the full library before the week was out.",
    author: "Robert M.",
    location: "Phoenix, AZ",
    source: "The British Pensioner's Egg & Potato Cookbook",
    rating: 5,
  },
  {
    quote:
      "Clear, no-nonsense writing. Exactly what I expected from British Nostalgia — useful from page one.",
    author: "Susan K.",
    location: "Nashville, TN",
    source: "The Tinned Food Tea-Time Bible",
    rating: 5,
  },
  {
    quote:
      "The bundle paid for itself faster than I thought. 5-Minute Suppers alone was worth the purchase.",
    author: "James & Linda W.",
    location: "Columbus, OH",
    source: "The 5-Minute British Suppers Cookbook",
    rating: 5,
  },
];
