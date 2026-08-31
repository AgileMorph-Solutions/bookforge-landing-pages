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
      "I picked up 100 Forgotten Side-Hustles first and had a paying job the same afternoon. Ordered the full library before the week was out.",
    author: "Robert M.",
    location: "Phoenix, AZ",
    source: "100 Forgotten Side-Hustles",
    rating: 5,
  },
  {
    quote:
      "Clear, no-nonsense writing. Exactly what I expected from Forgotten Ways to Make Money — the $0 Start Business Playbook was useful from page one.",
    author: "Susan K.",
    location: "Nashville, TN",
    source: "The $0 Start Business Playbook",
    rating: 5,
  },
  {
    quote:
      "The bundle paid for itself faster than we thought. The Junk-to-Cash Reselling Guide alone was worth the purchase.",
    author: "James & Linda W.",
    location: "Columbus, OH",
    source: "The Junk-to-Cash Reselling Guide",
    rating: 5,
  },
];
