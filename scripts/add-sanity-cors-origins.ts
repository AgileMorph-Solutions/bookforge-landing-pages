/**
 * Add each channel site's production origins (Netlify + apex + www) as CORS
 * origins (with credentials) on its Sanity project.
 *
 * Note: older Sanity CLI ignores --project-id for cors commands, so we run from each
 * site directory with NEXT_PUBLIC_SANITY_PROJECT_ID set in the environment.
 *
 * Run:
 *   source ~/.nvm/nvm.sh && nvm use 20
 *   npx tsx scripts/add-sanity-cors-origins.ts
 */
import { execSync } from "child_process";
import path from "path";

const ROOT = path.resolve(__dirname, "..");

type SiteCors = {
  slug: string;
  origins: string[];
  projectId: string;
};

const SITES: SiteCors[] = [
  {
    slug: "stop-wasting-stuff",
    projectId: "x0a4syb1",
    origins: [
      "https://stop-wasting-stuff.netlify.app",
      "https://stopwastingstuff.com",
      "https://www.stopwastingstuff.com",
    ],
  },
  {
    slug: "forgotten-american-survival",
    projectId: "ksy60hww",
    origins: [
      "https://forgotten-american-survival.netlify.app",
      "https://forgottenamericansurvival.com",
      "https://www.forgottenamericansurvival.com",
    ],
  },
  {
    slug: "carlyfe",
    projectId: "fgynawmf",
    origins: [
      "https://carlyfe.netlify.app",
      "https://carlyfeyoutube.com",
      "https://www.carlyfeyoutube.com",
    ],
  },
  {
    slug: "american-food-history",
    projectId: "iji68mld",
    origins: [
      "https://american-food-history.netlify.app",
      "https://americanfoodhistory.com",
      "https://www.americanfoodhistory.com",
    ],
  },
  {
    slug: "british-nostalgia",
    projectId: "n5gutrbv",
    origins: [
      "https://british-nostalgia.netlify.app",
      "https://britishnostalgiastore.com",
      "https://www.britishnostalgiastore.com",
    ],
  },
  {
    slug: "forgotten-american-weapons",
    projectId: "1gz3wplt",
    origins: [
      "https://forgotten-american-weapons.netlify.app",
      "https://forgottenamericanweapons.com",
      "https://www.forgottenamericanweapons.com",
    ],
  },
];

const ALL_FOREIGN_ORIGINS = new Map<string, string>();
for (const site of SITES) {
  for (const origin of site.origins) {
    ALL_FOREIGN_ORIGINS.set(origin, site.slug);
  }
}

function runInSite(slug: string, projectId: string, cmd: string): string {
  return execSync(cmd, {
    cwd: path.join(ROOT, slug),
    encoding: "utf8",
    env: {
      ...process.env,
      NEXT_PUBLIC_SANITY_PROJECT_ID: projectId,
      NEXT_PUBLIC_SANITY_DATASET: "production",
    },
    stdio: ["pipe", "pipe", "pipe"],
  });
}

function listOrigins(slug: string, projectId: string): string[] {
  const output = runInSite(slug, projectId, "npx sanity cors list");
  return output
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^https?:\/\//.test(line))
    .map((line) => line.split(/\s+/)[0]);
}

function ensureOrigin(slug: string, projectId: string, origin: string) {
  const existing = listOrigins(slug, projectId);
  if (existing.includes(origin)) {
    console.log(`  ${origin}: already present — ensuring credentials via delete+add`);
    try {
      runInSite(slug, projectId, `npx sanity cors delete ${origin}`);
    } catch {
      // ignore if missing
    }
  } else {
    console.log(`  ${origin}: adding`);
  }

  try {
    const result = runInSite(
      slug,
      projectId,
      `npx sanity cors add ${origin} --credentials`
    );
    const last = result.trim().split("\n").pop();
    if (last) console.log(`    ${last}`);
  } catch (error) {
    const stderr =
      error && typeof error === "object" && "stderr" in error
        ? String((error as { stderr?: Buffer | string }).stderr ?? "")
        : "";
    if (/Duplicate origin|already exists/i.test(stderr)) {
      console.log("    already present (duplicate)");
    } else {
      throw error;
    }
  }
}

function assertNoCrossContamination(site: SiteCors, listed: string[]) {
  const own = new Set(site.origins);
  const foreign = listed.filter((origin) => {
    const owner = ALL_FOREIGN_ORIGINS.get(origin);
    return owner && owner !== site.slug && !own.has(origin);
  });
  if (foreign.length) {
    throw new Error(
      `Cross-project CORS contamination on ${site.slug} (${site.projectId}): ${foreign.join(", ")}`
    );
  }
}

function main() {
  console.log(
    "Adding Sanity CORS origins (Netlify + apex + www) for 6 channel sites...\n"
  );

  for (const site of SITES) {
    console.log(`=== ${site.slug} (${site.projectId}) ===`);

    for (const origin of site.origins) {
      ensureOrigin(site.slug, site.projectId, origin);
    }

    const after = listOrigins(site.slug, site.projectId);
    console.log(`  final origins: ${after.join(", ")}`);

    const missing = site.origins.filter((o) => !after.includes(o));
    if (missing.length) {
      throw new Error(
        `Missing expected origins on ${site.slug}: ${missing.join(", ")}`
      );
    }

    assertNoCrossContamination(site, after);
    console.log("  OK — expected origins present, no cross-project domains\n");
  }

  console.log("Done.");
}

main();
