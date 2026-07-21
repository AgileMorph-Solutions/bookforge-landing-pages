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
      "I picked up 1776 American Table first and had results the same afternoon. Ordered the full library before the week was out.",
    author: "Robert M.",
    location: "Phoenix, AZ",
    source: "The 1776 American Table",
    rating: 5,
  },
  {
    quote:
      "Clear, no-nonsense writing. Exactly what I expected from American Food History — useful from page one.",
    author: "Susan K.",
    location: "Nashville, TN",
    source: "The Lost American Steakhouse Cookbook",
    rating: 5,
  },
  {
    quote:
      "The bundle paid for itself faster than I thought. Route 66 Cookbook alone was worth the purchase.",
    author: "James & Linda W.",
    location: "Columbus, OH",
    source: "The Route 66 Roadside Cookbook",
    rating: 5,
  },
];
