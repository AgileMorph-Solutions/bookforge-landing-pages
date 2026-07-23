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
      "I picked up Side-Hustle Playbook first and had results the same afternoon. Ordered the full library before the week was out.",
    author: "Robert M.",
    location: "Phoenix, AZ",
    source: "The Forgotten Side-Hustle Playbook",
    rating: 5,
  },
  {
    quote:
      "Clear, no-nonsense writing. Exactly what I expected from Forgotten Ways to Make Money — useful from page one.",
    author: "Susan K.",
    location: "Nashville, TN",
    source: "Thrift-to-Wealth Habits",
    rating: 5,
  },
  {
    quote:
      "The bundle paid for itself faster than I thought. Old Trade Income Manual alone was worth the purchase.",
    author: "James & Linda W.",
    location: "Columbus, OH",
    source: "The Old Trade Income Manual",
    rating: 5,
  },
];
