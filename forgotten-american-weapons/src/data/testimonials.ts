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
      "I picked up 1920s Weapons Guide first and had results the same afternoon. Ordered the full library before the week was out.",
    author: "Robert M.",
    location: "Phoenix, AZ",
    source: "Hidden Weapons of the 1920s",
    rating: 5,
  },
  {
    quote:
      "Clear, no-nonsense writing. Exactly what I expected from Forgotten American Weapons — useful from page one.",
    author: "Susan K.",
    location: "Nashville, TN",
    source: "The Mountain Man & Frontier Arms Encyclopedia",
    rating: 5,
  },
  {
    quote:
      "The bundle paid for itself faster than I thought. Farm Guns Guide alone was worth the purchase.",
    author: "James & Linda W.",
    location: "Columbus, OH",
    source: "Forgotten American Farm Guns",
    rating: 5,
  },
];
