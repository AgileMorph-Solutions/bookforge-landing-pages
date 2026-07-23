/**
 * Copy PDFs from repo-root books/ into each site's assets/ using products.ts filenames.
 * Run: npx tsx scripts/sync-books-to-assets.ts
 */
import { copyFileSync, existsSync, mkdirSync } from "fs";
import path from "path";

const ROOT = path.resolve(__dirname, "..");
const BOOKS = path.join(ROOT, "books");

type BookMapping = {
  site: string;
  booksFolder: string;
  /** source filename in books/<folder>/ → dest filename in <site>/assets/ */
  files: { source: string; dest: string }[];
};

const MAPPINGS: BookMapping[] = [
  {
    site: "once-upon-a-british-time",
    booksFolder: "Once Upon A British Time",
    files: [],
  },
  {
    site: "forgotten-ways-to-make-money",
    booksFolder: "Forgotten Ways to Make Money",
    files: [],
  },
  {
    site: "lost-american-memories",
    booksFolder: "Lost American Memories",
    files: [
      { source: "the-poor-man-recipe-bible-fixed.pdf", dest: "the-poor-man-recipe-bible-fixed.pdf" },
      { source: "the-1950s-grandma-cookbook-fixed.pdf", dest: "the-1950s-grandma-cookbook-fixed.pdf" },
      {
        source: "the-great-depression-survival-cookbook-100-forgotten-poor-ma.pdf",
        dest: "the-great-depression-survival-cookbook-100-forgotten-poor-ma.pdf",
      },
      {
        source: "the-cowboy-frontier-working-man-cookbook-100-rugged-meals-co.pdf",
        dest: "the-cowboy-frontier-working-man-cookbook-100-rugged-meals-co.pdf",
      },
      {
        source: "the-lost-diners-potlucks-american-memories-cookbook-100-forg.pdf",
        dest: "the-lost-diners-potlucks-american-memories-cookbook-100-forg.pdf",
      },
    ],
  },
  {
    site: "stop-wasting-stuff",
    booksFolder: "Stop wasting stuff",
    files: [
      {
        source:
          "The Hydrogen Peroxide Homeowner Bible — 101 Cheap Cleaning, Drain, Laundry, Garden & Pest-Control Uses.pdf",
        dest: "hydrogen-peroxide-homeowner-bible.pdf",
      },
      {
        source:
          "The Baking Soda, Vinegar & Salt Fix-It Manual — 150 Low-Cost Home Hacks That Replace Expensive Products.pdf",
        dest: "baking-soda-vinegar-salt-manual.pdf",
      },
      {
        source:
          "The Cheap Pest-Proof Home — Safe DIY Prevention for Ants, Roaches, Flies, Mosquitoes & More.pdf",
        dest: "cheap-pest-proof-home.pdf",
      },
      {
        source:
          "Stop Throwing It Away — 100 Ways to Reuse, Repurpose & Regrow Everyday Household Items.pdf",
        dest: "stop-throwing-it-away.pdf",
      },
      {
        source:
          "The $5 Home Maintenance Handbook — Small Preventive Fixes That Help Stop Big Repair Bills.pdf",
        dest: "five-dollar-home-maintenance.pdf",
      },
    ],
  },
  {
    site: "forgotten-american-survival",
    booksFolder: "Forgotten American Survival",
    files: [
      { source: "The 7-Day Blackout Survival Plan.pdf", dest: "7-day-blackout-survival-plan.pdf" },
      {
        source: "The Forgotten Shelter & Warmth Manual.pdf",
        dest: "forgotten-shelter-warmth-manual.pdf",
      },
      { source: "The Poor Man_s Emergency Stockpile.pdf", dest: "poor-mans-emergency-stockpile.pdf" },
      {
        source: "The Grandparents\u2019 Home Security Handbook.pdf",
        dest: "grandparents-home-security-handbook.pdf",
      },
      {
        source: "The Off-Grid Water & Food Preservation Guide.pdf",
        dest: "off-grid-water-food-preservation.pdf",
      },
    ],
  },
  {
    site: "forgotten-american-skills",
    booksFolder: "Forgotten American Skills",
    files: [
      {
        source: "the-old-timer-skills-handbook-100-practical-skills-for-camp-__1_.pdf",
        dest: "old-timer-skills-handbook.pdf",
      },
      {
        source: "the-vanishing-trades-starter-guide-beginner-projects-in-wood (1).pdf",
        dest: "vanishing-trades-starter-guide.pdf",
      },
      {
        source: "the-hand-tool-home-repair-bible-fixing-sharpening-mending-ma (1).pdf",
        dest: "hand-tool-home-repair-bible.pdf",
      },
      {
        source: "the-traditional-food-preservation-guide-drying-pickling-ferm (1).pdf",
        dest: "traditional-food-preservation-guide.pdf",
      },
      {
        source: "the-frontier-camping-manual-fire-water-shelter-navigation-re (1).pdf",
        dest: "frontier-camping-manual.pdf",
      },
    ],
  },
  {
    site: "british-nostalgia",
    booksFolder: "British Nostalgia",
    files: [
      {
        source: "the-british-pensioner-s-egg-potato-cookbook-100-filling-dinn (1).pdf",
        dest: "british-pensioner-egg-potato-cookbook.pdf",
      },
      {
        source: "the-tinned-food-tea-time-bible-100-easy-british-meals-from-b (1).pdf",
        dest: "tinned-food-tea-time-bible.pdf",
      },
      {
        source: "the-5-minute-british-suppers-cookbook-75-comforting-meals-fo (1).pdf",
        dest: "five-minute-british-suppers.pdf",
      },
      {
        source: "the-one-person-british-batch-cooking-plan-cook-once-freeze-s (1).pdf",
        dest: "one-person-batch-cooking-plan.pdf",
      },
      {
        source: "nan-s-pension-kitchen-100-old-british-habits-shopping-tricks (1).pdf",
        dest: "nans-pension-kitchen.pdf",
      },
    ],
  },
  {
    site: "forgotten-american-weapons",
    booksFolder: "Forgotten American Weapons",
    files: [
      {
        source: "hidden-weapons-of-the-1920s-a-museum-style-guide-to-gangster (1).pdf",
        dest: "hidden-weapons-1920s.pdf",
      },
      {
        source: "the-mountain-man-frontier-arms-encyclopedia-equipment-proven (1).pdf",
        dest: "mountain-man-frontier-arms.pdf",
      },
      {
        source: "forgotten-american-farm-guns-a-collector-s-guide-to-shotguns (1).pdf",
        dest: "forgotten-american-farm-guns.pdf",
      },
      {
        source: "the-american-weapons-identification-handbook-markings-eras-p (1).pdf",
        dest: "american-weapons-identification-handbook.pdf",
      },
      {
        source: "the-responsible-collector-s-storage-safety-manual-secure-sto (1).pdf",
        dest: "responsible-collectors-storage-safety.pdf",
      },
    ],
  },
  {
    site: "carlyfe",
    booksFolder: "CARLYFE",
    files: [
      {
        source: "the-400-000-mile-used-car-buyer-s-guide-FINAL.pdf",
        dest: "400k-mile-used-car-buyers-guide.pdf",
      },
      {
        source: "The_Senior_Drivers_Smart_Car_Handbook_CORRECTED.pdf",
        dest: "senior-drivers-smart-car-handbook.pdf",
      },
    ],
  },
  {
    site: "american-food-history",
    booksFolder: "American Food History",
    files: [
      {
        source: "the-lost-american-steakhouse-cookbook-prime-rib-chops-sides- (1).pdf",
        dest: "lost-american-steakhouse-cookbook.pdf",
      },
    ],
  },
];

function resolveSourceFile(booksDir: string, source: string): string | null {
  const direct = path.join(booksDir, source);
  if (existsSync(direct)) return direct;

  const entries = existsSync(booksDir)
    ? require("fs").readdirSync(booksDir) as string[]
    : [];
  const normalized = source.normalize("NFC").toLowerCase();
  const match = entries.find(
    (name) => name.normalize("NFC").toLowerCase() === normalized
  );
  return match ? path.join(booksDir, match) : null;
}

function syncSite(mapping: BookMapping): number {
  const assetsDir = path.join(ROOT, mapping.site, "assets");
  const booksDir = path.join(BOOKS, mapping.booksFolder);
  mkdirSync(assetsDir, { recursive: true });

  let copied = 0;
  for (const { source, dest } of mapping.files) {
    const sourcePath = resolveSourceFile(booksDir, source);
    const destPath = path.join(assetsDir, dest);

    if (!sourcePath) {
      console.warn(`  ✗ missing source: ${mapping.booksFolder}/${source}`);
      continue;
    }

    copyFileSync(sourcePath, destPath);
    console.log(`  ✓ ${dest}`);
    copied += 1;
  }

  return copied;
}

function main() {
  console.log("Syncing books/ PDFs to site assets/...\n");
  let total = 0;

  for (const mapping of MAPPINGS) {
    console.log(`=== ${mapping.site} ===`);
    total += syncSite(mapping);
    console.log("");
  }

  console.log(`Done. Copied ${total} PDF(s) across ${MAPPINGS.length} sites.`);
  if (total === 0) {
    process.exit(1);
  }
}

main();
