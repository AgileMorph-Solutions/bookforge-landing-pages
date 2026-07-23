/**
 * Apply per-channel visual themes from cover art.
 * Run: npx tsx scripts/apply-channel-themes.ts
 */
import { readFileSync, writeFileSync } from "fs";
import path from "path";

const ROOT = path.resolve(__dirname, "..");

type Palette = {
  navy: string;
  navyDark: string;
  red: string;
  redDark: string;
  redLight: string; // button gradient top
  cream: string;
  parchment: string;
  parchmentDark: string;
  gold: string;
  goldLight: string;
  wood: string;
  woodLight: string;
  woodDark: string;
  heroAccentRgba: string; // primary accent wash in hero
  heroNavyRgba: string;
  heroWoodRgba: string;
  bodyParchmentRgba: string;
  bodyParchmentDarkRgba: string;
  fontImport: string; // e.g. 'Libre_Baskerville'
  fontImportName: string; // variable name in layout
  fontWeights: string; // e.g. '["400", "700"]'
};

const LAM = {
  navy: "#1a2b44",
  navyDark: "#111a2e",
  red: "#8b1d1d",
  redDark: "#6d1414",
  redLight: "#a02525",
  cream: "#f2e7d5",
  parchment: "#e8d9c5",
  parchmentDark: "#d4c4ad",
  gold: "#c9a227",
  goldLight: "#e0bc4a",
  wood: "#5c3d2e",
  woodLight: "#6b4a35",
  woodDark: "#4a3025",
};

type SiteTheme = {
  slug: string;
  palette: Palette;
};

function hexToRgb(hex: string): string {
  const h = hex.replace("#", "");
  const n = parseInt(h, 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

const SITES: SiteTheme[] = [
  {
    slug: "stop-wasting-stuff",
    palette: {
      navy: "#2d4a27",
      navyDark: "#1e331c",
      red: "#5c7a3a",
      redDark: "#45602c",
      redLight: "#6f8f4a",
      cream: "#f4f0e6",
      parchment: "#e8e2d4",
      parchmentDark: "#d4cdb8",
      gold: "#c4a35a",
      goldLight: "#d4b86a",
      wood: "#6b4a35",
      woodLight: "#7a5840",
      woodDark: "#543828",
      heroAccentRgba: "rgba(92, 122, 58, 0.08)",
      heroNavyRgba: "rgba(45, 74, 39, 0.08)",
      heroWoodRgba: "rgba(107, 74, 53, 0.05)",
      bodyParchmentRgba: "rgba(232, 226, 212, 0.9)",
      bodyParchmentDarkRgba: "rgba(212, 205, 184, 0.5)",
      fontImport: "Libre_Baskerville",
      fontImportName: "libreBaskerville",
      fontWeights: '["400", "700"]',
    },
  },
  {
    slug: "forgotten-american-survival",
    palette: {
      navy: "#2a2118",
      navyDark: "#1a1510",
      red: "#c4782a",
      redDark: "#9a5c1e",
      redLight: "#d48a3a",
      cream: "#ede5d1",
      parchment: "#d9ceb8",
      parchmentDark: "#c4b69a",
      gold: "#d4a84b",
      goldLight: "#e0bc5a",
      wood: "#3b2b1d",
      woodLight: "#4a3828",
      woodDark: "#2a1e14",
      heroAccentRgba: "rgba(196, 120, 42, 0.08)",
      heroNavyRgba: "rgba(42, 33, 24, 0.1)",
      heroWoodRgba: "rgba(59, 43, 29, 0.08)",
      bodyParchmentRgba: "rgba(217, 206, 184, 0.9)",
      bodyParchmentDarkRgba: "rgba(196, 182, 154, 0.5)",
      fontImport: "Special_Elite",
      fontImportName: "specialElite",
      fontWeights: '["400"]',
    },
  },
  {
    slug: "carlyfe",
    palette: {
      navy: "#0a1628",
      navyDark: "#050b14",
      red: "#00b4e4",
      redDark: "#0090b8",
      redLight: "#33c4ec",
      cream: "#e8eef5",
      parchment: "#d5dde8",
      parchmentDark: "#b8c4d4",
      gold: "#5ec8e8",
      goldLight: "#7ed4f0",
      wood: "#121c2e",
      woodLight: "#1a2840",
      woodDark: "#0a1018",
      heroAccentRgba: "rgba(0, 180, 228, 0.08)",
      heroNavyRgba: "rgba(10, 22, 40, 0.1)",
      heroWoodRgba: "rgba(18, 28, 46, 0.06)",
      bodyParchmentRgba: "rgba(213, 221, 232, 0.9)",
      bodyParchmentDarkRgba: "rgba(184, 196, 212, 0.5)",
      fontImport: "Montserrat",
      fontImportName: "montserrat",
      fontWeights: '["400", "700", "900"]',
    },
  },
  {
    slug: "american-food-history",
    palette: {
      navy: "#1a2b44",
      navyDark: "#111a2e",
      red: "#7a1f2e",
      redDark: "#5c1622",
      redLight: "#922838",
      cream: "#f0e6d4",
      parchment: "#e0d4c0",
      parchmentDark: "#cbbfa8",
      gold: "#c9a227",
      goldLight: "#e0bc4a",
      wood: "#4a3428",
      woodLight: "#5a4435",
      woodDark: "#3a281c",
      heroAccentRgba: "rgba(45, 110, 120, 0.08)",
      heroNavyRgba: "rgba(26, 43, 68, 0.08)",
      heroWoodRgba: "rgba(74, 52, 40, 0.05)",
      bodyParchmentRgba: "rgba(224, 212, 192, 0.9)",
      bodyParchmentDarkRgba: "rgba(203, 191, 168, 0.5)",
      fontImport: "Roboto_Slab",
      fontImportName: "robotoSlab",
      fontWeights: '["400", "700", "900"]',
    },
  },
  {
    slug: "british-nostalgia",
    palette: {
      navy: "#1e2a4a",
      navyDark: "#121a30",
      red: "#c41e3a",
      redDark: "#9a1730",
      redLight: "#d43850",
      cream: "#f7f1e6",
      parchment: "#ebe3d4",
      parchmentDark: "#d6ccb8",
      gold: "#b8952e",
      goldLight: "#d0ae45",
      wood: "#6b5340",
      woodLight: "#7a634e",
      woodDark: "#544030",
      heroAccentRgba: "rgba(196, 30, 58, 0.06)",
      heroNavyRgba: "rgba(30, 42, 74, 0.08)",
      heroWoodRgba: "rgba(107, 83, 64, 0.05)",
      bodyParchmentRgba: "rgba(235, 227, 212, 0.9)",
      bodyParchmentDarkRgba: "rgba(214, 204, 184, 0.5)",
      fontImport: "Playfair_Display",
      fontImportName: "playfairDisplay",
      fontWeights: '["400", "700", "900"]',
    },
  },
  {
    slug: "forgotten-american-weapons",
    palette: {
      navy: "#1c1410",
      navyDark: "#0e0a08",
      red: "#b8952e",
      redDark: "#8f7424",
      redLight: "#c9a84c",
      cream: "#e8dcc8",
      parchment: "#d4c4a8",
      parchmentDark: "#b8a888",
      gold: "#c9a84c",
      goldLight: "#d4b85c",
      wood: "#2a1c14",
      woodLight: "#3a2c20",
      woodDark: "#1a100c",
      heroAccentRgba: "rgba(184, 149, 46, 0.08)",
      heroNavyRgba: "rgba(28, 20, 16, 0.1)",
      heroWoodRgba: "rgba(42, 28, 20, 0.08)",
      bodyParchmentRgba: "rgba(212, 196, 168, 0.9)",
      bodyParchmentDarkRgba: "rgba(184, 168, 136, 0.5)",
      fontImport: "Cinzel",
      fontImportName: "cinzel",
      fontWeights: '["400", "700", "900"]',
    },
  },
  {
    slug: "forgotten-american-skills",
    palette: {
      navy: "#041525",
      navyDark: "#020c18",
      red: "#8b6914",
      redDark: "#6b5010",
      redLight: "#a67c1a",
      cream: "#f2e8d8",
      parchment: "#eddbbf",
      parchmentDark: "#d4c4a8",
      gold: "#c9a227",
      goldLight: "#e0bc4a",
      wood: "#5c3d2e",
      woodLight: "#6b4a35",
      woodDark: "#3b2b1d",
      heroAccentRgba: "rgba(139, 105, 20, 0.08)",
      heroNavyRgba: "rgba(4, 21, 37, 0.1)",
      heroWoodRgba: "rgba(92, 61, 46, 0.08)",
      bodyParchmentRgba: "rgba(237, 219, 191, 0.9)",
      bodyParchmentDarkRgba: "rgba(212, 196, 168, 0.5)",
      fontImport: "Roboto_Slab",
      fontImportName: "robotoSlab",
      fontWeights: '["400", "700", "900"]',
    },
  },
  {
    slug: "once-upon-a-british-time",
    palette: {
      navy: "#1e2a4a",
      navyDark: "#121a30",
      red: "#c41e3a",
      redDark: "#9a1730",
      redLight: "#d43850",
      cream: "#f7f1e6",
      parchment: "#ebe3d4",
      parchmentDark: "#d6ccb8",
      gold: "#b8952e",
      goldLight: "#d0ae45",
      wood: "#6b5340",
      woodLight: "#7a634e",
      woodDark: "#544030",
      heroAccentRgba: "rgba(196, 30, 58, 0.06)",
      heroNavyRgba: "rgba(30, 42, 74, 0.08)",
      heroWoodRgba: "rgba(107, 83, 64, 0.05)",
      bodyParchmentRgba: "rgba(235, 227, 212, 0.9)",
      bodyParchmentDarkRgba: "rgba(214, 204, 184, 0.5)",
      fontImport: "Playfair_Display",
      fontImportName: "playfairDisplay",
      fontWeights: '["400", "700", "900"]',
    },
  },
  {
    slug: "forgotten-ways-to-make-money",
    palette: {
      navy: "#3b2b1d",
      navyDark: "#241910",
      red: "#4f797b",
      redDark: "#3a5c5e",
      redLight: "#628e90",
      cream: "#f4f0e6",
      parchment: "#e8e2d4",
      parchmentDark: "#bdb092",
      gold: "#a67c52",
      goldLight: "#c09a6a",
      wood: "#5c4030",
      woodLight: "#6e4e3a",
      woodDark: "#3a281c",
      heroAccentRgba: "rgba(79, 121, 123, 0.08)",
      heroNavyRgba: "rgba(59, 43, 29, 0.08)",
      heroWoodRgba: "rgba(92, 64, 48, 0.05)",
      bodyParchmentRgba: "rgba(232, 226, 212, 0.9)",
      bodyParchmentDarkRgba: "rgba(189, 176, 146, 0.5)",
      fontImport: "Libre_Baskerville",
      fontImportName: "libreBaskerville",
      fontWeights: '["400", "700"]',
    },
  },
];

function writeTailwind(slug: string, p: Palette) {
  const content = `import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "${p.navy}",
          dark: "${p.navyDark}",
        },
        red: {
          DEFAULT: "${p.red}",
          dark: "${p.redDark}",
        },
        cream: "${p.cream}",
        parchment: {
          DEFAULT: "${p.parchment}",
          dark: "${p.parchmentDark}",
        },
        gold: {
          DEFAULT: "${p.gold}",
          light: "${p.goldLight}",
        },
        wood: {
          DEFAULT: "${p.wood}",
          light: "${p.woodLight}",
          dark: "${p.woodDark}",
        },
      },
      fontFamily: {
        display: ["var(--font-roboto-slab)", "Georgia", "serif"],
        body: ["var(--font-source-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        book: "0 12px 40px rgba(${hexToRgb(p.navy)}, 0.25), 0 4px 12px rgba(${hexToRgb(p.wood)}, 0.2)",
        vintage: "inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 16px rgba(${hexToRgb(p.navy)}, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
`;
  writeFileSync(path.join(ROOT, slug, "tailwind.config.ts"), content);
}

function writeGlobals(slug: string, p: Palette) {
  const content = `@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  background-color: ${p.cream};
  background-image:
    url("/images/textures/parchment-noise.svg"),
    radial-gradient(ellipse at 20% 0%, ${p.bodyParchmentRgba} 0%, transparent 55%),
    radial-gradient(ellipse at 80% 100%, ${p.bodyParchmentDarkRgba} 0%, transparent 50%);
  background-size: 200px 200px, 100% 100%, 100% 100%;
  color: ${p.navy};
  font-family: var(--font-source-sans), system-ui, sans-serif;
}

/* ── Background textures ── */
.bg-parchment-texture {
  background-color: ${p.parchment};
  background-image:
    url("/images/textures/parchment-noise.svg"),
    radial-gradient(ellipse at center, rgba(${hexToRgb(p.cream)}, 0.6) 0%, transparent 70%);
  background-size: 200px 200px, 100% 100%;
}

.bg-wood-surface {
  background-color: ${p.wood};
  background-image: url("/images/textures/wood-grain.svg");
  background-size: cover;
  background-position: center;
}

.bg-hero-texture,
.bg-hero-kitchen {
  background-color: ${p.cream};
  background-image:
    url("/images/textures/parchment-noise.svg"),
    radial-gradient(ellipse at 70% 30%, ${p.heroAccentRgba} 0%, transparent 50%),
    radial-gradient(ellipse at 20% 80%, ${p.heroNavyRgba} 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, ${p.heroWoodRgba} 0%, transparent 60%);
  background-size: 200px 200px, 100% 100%, 100% 100%, 100% 100%;
}

/* ── Borders ── */
.border-vintage {
  border: 3px double ${p.gold};
  box-shadow: inset 0 0 0 1px ${p.navy};
}

.border-vintage-top {
  border-top: 3px double ${p.gold};
  box-shadow: inset 0 1px 0 0 ${p.navy};
}

.border-vintage-bottom {
  border-bottom: 3px double ${p.gold};
  box-shadow: inset 0 -1px 0 0 ${p.navy};
}

/* ── Section labels ── */
.section-label {
  font-family: var(--font-roboto-slab), Georgia, serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: ${p.red};
}

.section-label::before,
.section-label::after {
  content: "★";
  margin: 0 0.5rem;
  font-size: 0.55rem;
  opacity: 0.8;
  color: ${p.navy};
}

/* ── Headlines ── */
.headline-vintage {
  font-family: var(--font-roboto-slab), Georgia, serif;
  font-weight: 900;
  line-height: 1.1;
  color: ${p.navy};
}

.headline-vintage .accent-red {
  color: ${p.red};
}

.headline-vintage .accent-navy {
  color: ${p.navy};
}

/* ── Star divider ── */
.star-divider {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${p.red};
  font-size: 0.65rem;
}

.star-divider::before,
.star-divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, transparent, ${p.gold}, transparent);
}

/* ── Ribbon badge ── */
.ribbon-badge {
  display: inline-block;
  background: ${p.red};
  color: ${p.cream};
  font-family: var(--font-roboto-slab), Georgia, serif;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.35rem 1rem;
  position: relative;
  clip-path: polygon(0 0, 100% 0, 95% 50%, 100% 100%, 0 100%, 5% 50%);
}

/* ── Book lift shadow ── */
.book-lift {
  box-shadow:
    0 20px 50px rgba(${hexToRgb(p.navy)}, 0.3),
    0 8px 20px rgba(${hexToRgb(p.wood)}, 0.25),
    inset 0 0 0 1px rgba(${hexToRgb(p.gold)}, 0.2);
  transform: perspective(800px) rotateY(-2deg);
}

.book-pedestal {
  background: linear-gradient(180deg, ${p.woodLight} 0%, ${p.wood} 40%, ${p.woodDark} 100%);
  border-radius: 0 0 0.5rem 0.5rem;
  padding: 1.5rem 1.5rem 0;
  position: relative;
}

.book-pedestal::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 10%;
  right: 10%;
  height: 8px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  filter: blur(4px);
}

/* ── Buttons ── */
.btn-vintage {
  @apply inline-flex items-center justify-center gap-2 px-7 py-3.5 font-display font-bold text-sm uppercase tracking-wider rounded-sm transition-all;
  background: linear-gradient(180deg, ${p.redLight} 0%, ${p.red} 50%, ${p.redDark} 100%);
  color: ${p.cream};
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 4px 12px rgba(${hexToRgb(p.red)}, 0.4);
  border: 1px solid ${p.redDark};
  cursor: pointer;
}

.btn-vintage:hover {
  background: linear-gradient(180deg, ${p.red} 0%, ${p.redDark} 100%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.15),
    0 2px 8px rgba(${hexToRgb(p.red)}, 0.3);
}

.btn-vintage:active {
  transform: scale(0.98);
}

.btn-vintage:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-vintage-secondary {
  @apply inline-flex items-center justify-center gap-2 px-7 py-3.5 font-display font-bold text-sm uppercase tracking-wider rounded-sm transition-all;
  background: ${p.cream};
  color: ${p.navy};
  border: 2px solid ${p.navy};
  cursor: pointer;
}

.btn-vintage-secondary:hover {
  background: ${p.navy};
  color: ${p.cream};
}

.btn-header {
  @apply inline-flex items-center justify-center gap-2 px-5 py-2.5 font-body font-semibold text-xs uppercase tracking-widest rounded-sm transition-all md:px-6 md:text-sm;
  background: ${p.cream};
  color: ${p.navy};
  border: 2px solid ${p.gold};
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.08);
  cursor: pointer;
  white-space: nowrap;
}

.btn-header:hover {
  background: ${p.gold};
  color: ${p.navy};
  border-color: ${p.gold};
}

.btn-header:active {
  transform: scale(0.98);
}

.btn-header:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Legacy aliases */
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  font-family: var(--font-roboto-slab), Georgia, serif;
  font-weight: 700;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 0.125rem;
  background: linear-gradient(180deg, ${p.redLight} 0%, ${p.red} 50%, ${p.redDark} 100%);
  color: ${p.cream};
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 4px 12px rgba(${hexToRgb(p.red)}, 0.4);
  border: 1px solid ${p.redDark};
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  font-family: var(--font-roboto-slab), Georgia, serif;
  font-weight: 700;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 0.125rem;
  background: ${p.cream};
  color: ${p.navy};
  border: 2px solid ${p.navy};
  cursor: pointer;
  transition: all 0.2s;
}

/* ── Cards ── */
.card-parchment {
  background-color: ${p.parchment};
  background-image:
    url("/images/textures/parchment-noise.svg"),
    radial-gradient(ellipse at center, rgba(${hexToRgb(p.cream)}, 0.6) 0%, transparent 70%);
  background-size: 200px 200px, 100% 100%;
  border: 2px solid ${p.parchmentDark};
  border-radius: 0.125rem;
  box-shadow:
    inset 0 0 40px rgba(${hexToRgb(p.red)}, 0.03),
    0 6px 24px rgba(${hexToRgb(p.navy)}, 0.1);
}

.card {
  @apply card-parchment;
}

.parchment-frame {
  border: 3px solid ${p.parchmentDark};
  box-shadow:
    inset 0 0 30px rgba(${hexToRgb(p.red)}, 0.05),
    0 8px 32px rgba(${hexToRgb(p.navy)}, 0.15);
}

/* ── Cover image treatment ── */
.cover-vintage {
  filter: sepia(8%) saturate(1.1) contrast(1.02);
}

/* ── Price stamp ── */
.price-stamp {
  font-family: var(--font-roboto-slab), Georgia, serif;
  color: ${p.red};
  font-weight: 900;
}

.compare-stamp {
  color: rgba(${hexToRgb(p.navy)}, 0.4);
  text-decoration: line-through;
  font-size: 0.875rem;
}

/* ── Vintage pill badge ── */
.pill-vintage {
  @apply inline-block text-xs font-display font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm;
  background: ${p.navy};
  color: ${p.cream};
}

/* ── Certificate panel ── */
.panel-certificate {
  background-color: ${p.navy};
  color: ${p.cream};
  border: 3px double ${p.gold};
  box-shadow: inset 0 0 0 1px ${p.navy};
  border-radius: 0.125rem;
  padding: 2rem 3rem;
}
`;
  writeFileSync(path.join(ROOT, slug, "src/app/globals.css"), content);
}

function updateLayout(slug: string, p: Palette) {
  const file = path.join(ROOT, slug, "src/app/layout.tsx");
  let content = readFileSync(file, "utf8");

  // Replace font import line
  content = content.replace(
    /import \{ [^}]+ \} from "next\/font\/google";/,
    `import { ${p.fontImport}, Source_Sans_3 } from "next/font/google";`
  );

  // Replace display font const block
  content = content.replace(
    /const \w+ = \w+\(\{[\s\S]*?variable: "--font-roboto-slab",[\s\S]*?\}\);/,
    `const ${p.fontImportName} = ${p.fontImport}({
  subsets: ["latin"],
  weight: ${p.fontWeights},
  variable: "--font-roboto-slab",
  display: "swap",
});`
  );

  // Fix className that references old font variable
  content = content.replace(
    /className=\{`\$\{\w+\.variable\} \$\{sourceSans\.variable\}/g,
    `className={\`\${${p.fontImportName}.variable} \${sourceSans.variable}`
  );

  writeFileSync(file, content);
}

const ONLY = process.env.THEME_ONLY
  ? new Set(
      process.env.THEME_ONLY.split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    )
  : null;

for (const site of SITES) {
  if (ONLY && !ONLY.has(site.slug)) continue;
  console.log(`Theming ${site.slug}...`);
  writeTailwind(site.slug, site.palette);
  writeGlobals(site.slug, site.palette);
  updateLayout(site.slug, site.palette);
  console.log(`  ✓ ${site.slug}`);
}

console.log(
  ONLY
    ? `\nThemes applied (filtered: ${[...ONLY].join(", ")}).`
    : "\nAll channel themes applied."
);
