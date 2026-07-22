/**
 * Patch siteSettings in Sanity (e.g. youtubeSubscribers) and ensure CORS origins.
 * Usage: SANITY_API_WRITE_TOKEN=sk... npx tsx scripts/patch-forgotten-american-skills-settings.ts
 */
import { execSync } from "child_process";
import { createRequire } from "module";
import path from "path";

const ROOT = path.resolve(__dirname, "..");
const SITE = "forgotten-american-skills";
const PROJECT_ID = "lp0hbjba";
const siteDir = path.join(ROOT, SITE);
const siteRequire = createRequire(path.join(siteDir, "package.json"));
const { createClient } = siteRequire("@sanity/client") as typeof import("@sanity/client");

const ORIGINS = [
  "https://forgottenamericanskills.com",
  "https://www.forgottenamericanskills.com",
];

async function patchSiteSettings() {
  const token = process.env.SANITY_API_WRITE_TOKEN?.trim();
  if (!token) {
    throw new Error(
      "SANITY_API_WRITE_TOKEN is required (Editor token from sanity.io/manage → API → Tokens)"
    );
  }

  const client = createClient({
    projectId: PROJECT_ID,
    dataset: "production",
    apiVersion: "2026-07-15",
    token,
    useCdn: false,
  });

  await client
    .patch("siteSettings")
    .set({ youtubeSubscribers: "15K" })
    .commit();

  console.log("✓ Updated siteSettings.youtubeSubscribers to 15K in Sanity");
}

function ensureCorsOrigins() {
  for (const origin of ORIGINS) {
    console.log(`Adding CORS origin ${origin}...`);
    try {
      const result = execSync(
        `npx sanity cors add ${origin} --credentials --project ${PROJECT_ID}`,
        {
          cwd: siteDir,
          encoding: "utf8",
          env: {
            ...process.env,
            NEXT_PUBLIC_SANITY_PROJECT_ID: PROJECT_ID,
            NEXT_PUBLIC_SANITY_DATASET: "production",
          },
          stdio: ["pipe", "pipe", "pipe"],
        }
      );
      console.log(result.trim().split("\n").pop() ?? "  done");
    } catch (error) {
      const stderr =
        error && typeof error === "object" && "stderr" in error
          ? String((error as { stderr?: Buffer | string }).stderr ?? "")
          : "";
      if (/Duplicate origin|already exists|already present/i.test(stderr)) {
        console.log("  already present");
      } else if (/login first/i.test(stderr)) {
        throw new Error(
          'Sanity CLI not logged in. Run "npx sanity login" in forgotten-american-skills, then re-run this script.'
        );
      } else {
        throw error;
      }
    }
  }

  const listed = execSync(
    `npx sanity cors list --project ${PROJECT_ID}`,
    {
      cwd: siteDir,
      encoding: "utf8",
      env: {
        ...process.env,
        NEXT_PUBLIC_SANITY_PROJECT_ID: PROJECT_ID,
      },
    }
  );
  console.log("CORS origins:", listed.trim());
}

async function main() {
  await patchSiteSettings();
  ensureCorsOrigins();
  console.log("\nDone.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
