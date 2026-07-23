/**
 * Upload PDF assets from each site's assets/ folder to Sanity and attach to product docs.
 * Requires SANITY_API_WRITE_TOKEN in each site's .env (Editor token from sanity.io/manage).
 *
 * Run after sync-books-to-assets.ts:
 *   npx tsx scripts/sync-books-to-assets.ts
 *   npx tsx scripts/upload-pdfs-to-sanity-all-sites.ts
 *
 * Or run full content migration per site (includes copy, settings, homepage):
 *   npx tsx scripts/upload-pdfs-to-sanity-all-sites.ts --full-migrate
 */
import { execSync } from "child_process";
import { existsSync, readFileSync } from "fs";
import path from "path";

const ROOT = path.resolve(__dirname, "..");

const SITES = [
  "lost-american-memories",
  "stop-wasting-stuff",
  "forgotten-american-survival",
  "forgotten-american-skills",
  "american-food-history",
  "british-nostalgia",
  "carlyfe",
  "forgotten-american-weapons",
  "once-upon-a-british-time",
  "forgotten-ways-to-make-money",
] as const;

function parseEnvFile(filePath: string): Record<string, string> {
  if (!existsSync(filePath)) return {};
  const env: Record<string, string> = {};
  for (const line of readFileSync(filePath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    env[trimmed.slice(0, eq)] = trimmed.slice(eq + 1);
  }
  return env;
}

function run(cmd: string, cwd: string, env: Record<string, string>) {
  console.log(`  $ ${cmd}`);
  execSync(cmd, {
    cwd,
    stdio: "inherit",
    env: { ...process.env, ...env },
  });
}

function main() {
  const fullMigrate = process.argv.includes("--full-migrate");
  const sharedWriteToken = process.env.SANITY_API_WRITE_TOKEN ?? "";

  console.log(
    fullMigrate
      ? "Running full Sanity migration for all sites..."
      : "Uploading PDF assets to Sanity for all sites..."
  );
  console.log("");

  for (const slug of SITES) {
    const siteDir = path.join(ROOT, slug);
    const envPath = path.join(siteDir, ".env");
    const siteEnv = parseEnvFile(envPath);
    const writeToken =
      siteEnv.SANITY_API_WRITE_TOKEN ?? sharedWriteToken;

    console.log(`=== ${slug} ===`);

    if (!siteEnv.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      console.warn("  Skipping: NEXT_PUBLIC_SANITY_PROJECT_ID not set");
      continue;
    }

    const migrateEnv = {
      NEXT_PUBLIC_SANITY_PROJECT_ID: siteEnv.NEXT_PUBLIC_SANITY_PROJECT_ID,
      NEXT_PUBLIC_SANITY_DATASET: siteEnv.NEXT_PUBLIC_SANITY_DATASET ?? "production",
      NEXT_PUBLIC_SANITY_API_VERSION:
        siteEnv.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-07-15",
      SANITY_API_WRITE_TOKEN: writeToken,
      SANITY_API_READ_TOKEN: siteEnv.SANITY_API_READ_TOKEN ?? "",
    };

    if (!writeToken) {
      console.warn(
        "  Skipping: set SANITY_API_WRITE_TOKEN in site .env or repo env (Editor token)"
      );
      console.log("");
      continue;
    }

    if (fullMigrate) {
      run("npm run sanity:schema", siteDir, migrateEnv);
      run("npm run sanity:migrate", siteDir, migrateEnv);
    } else {
      run(`npx tsx scripts/upload-pdf-assets-to-sanity.ts ${slug}`, ROOT, migrateEnv);
    }

    console.log(`  ✓ ${slug} done\n`);
  }

  console.log("All sites processed.");
}

main();
