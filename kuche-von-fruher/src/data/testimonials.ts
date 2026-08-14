export interface Testimonial {
  quote: string;
  author: string;
  location: string;
  source: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    "quote": "Ich habe zuerst Arme-Leute-Küche gekauft und hatte noch am selben Nachmittag Erfolg. Noch vor Ende der Woche das ganze Set bestellt.",
    "author": "Sabine K.",
    "location": "München",
    "source": "Omas Arme-Leute-Küche",
    "rating": 5
  },
  {
    "quote": "Klar geschrieben, ohne Schnickschnack. Genau das, was ich von Küche von Früher erwartet habe — nützlich ab der ersten Seite.",
    "author": "Susanne B.",
    "location": "Hamburg",
    "source": "Vergessene deutsche Gaststätten-Klassiker",
    "rating": 5
  },
  {
    "quote": "Das Bundle hat sich schneller ausgezahlt, als ich dachte. Allein Sonntagstafel war den Kauf schon wert.",
    "author": "Jürgen & Ingrid W.",
    "location": "Köln",
    "source": "Omas vergessene Sonntagstafel",
    "rating": 5
  }
];
