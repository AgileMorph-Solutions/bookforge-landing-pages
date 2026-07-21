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
      "I picked up Hydrogen Peroxide Bible first and had results the same afternoon. Ordered the full library before the week was out.",
    author: "Robert M.",
    location: "Phoenix, AZ",
    source: "The Hydrogen Peroxide Homeowner Bible",
    rating: 5,
  },
  {
    quote:
      "Clear, no-nonsense writing. Exactly what I expected from Stop Wasting Stuff — useful from page one.",
    author: "Susan K.",
    location: "Nashville, TN",
    source: "The Baking Soda, Vinegar & Salt Fix-It Manual",
    rating: 5,
  },
  {
    quote:
      "The bundle paid for itself faster than I thought. Pest-Proof Home alone was worth the purchase.",
    author: "James & Linda W.",
    location: "Columbus, OH",
    source: "The Cheap Pest-Proof Home",
    rating: 5,
  },
];
