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
      "I picked up Grocery-Lasting Bible first and had results the same afternoon. Ordered the full library before the week was out.",
    author: "Robert M.",
    location: "Phoenix, AZ",
    source: "The British Grocery-Lasting Bible",
    rating: 5,
  },
  {
    quote:
      "Clear, no-nonsense writing. Exactly what I expected from Once Upon A British Time — useful from page one.",
    author: "Susan K.",
    location: "Nashville, TN",
    source: "The Allotment Kitchen Handbook",
    rating: 5,
  },
  {
    quote:
      "The bundle paid for itself faster than I thought. Cupboard Cookery Manual alone was worth the purchase.",
    author: "James & Linda W.",
    location: "Columbus, OH",
    source: "The Cupboard Cookery Manual",
    rating: 5,
  },
];
