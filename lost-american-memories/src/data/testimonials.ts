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
      "I plated the Sunday meatloaf and halfway through, my husband put his fork down and said it reminded him of home growing up. He never says that about anything I cook — and we've been married over four decades.",
    author: "Diane H.",
    location: "Asheville, NC",
    source: "The 1950s Grandma Cookbook",
    rating: 5,
  },
  {
    quote:
      "One week of pantry-stretching dinners from the Depression book cut our receipt enough that the full five-book set felt free. I ordered another library download for my sister the same afternoon.",
    author: "Mark & Elaine T.",
    location: "Des Moines, IA",
    source: "The Great Depression Survival Cookbook",
    rating: 5,
  },
  {
    quote:
      "I used to eat at lunch counters as a kid. Opening the diner and potluck book put those flavors back on my table — the banana pudding had me quiet for a full minute before I could talk.",
    author: "Helen P.",
    location: "Peoria, IL",
    source: "The Lost Diners & Potlucks Cookbook",
    rating: 5,
  },
];
