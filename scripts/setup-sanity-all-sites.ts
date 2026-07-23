/**
 * Provision Sanity for all channel sites: env files, schema deploy, content migration.
 * Run: npx tsx scripts/setup-sanity-all-sites.ts
 */
import { execSync } from "child_process";
import { existsSync, readFileSync, writeFileSync } from "fs";
import path from "path";

const ROOT = path.resolve(__dirname, "..");
const LAM_ENV = path.join(ROOT, "lost-american-memories/.env.local");

type SiteSanityConfig = {
  slug: string;
  projectId: string;
  projectName: string;
  createIfMissing?: boolean;
};

const SITES: SiteSanityConfig[] = [
  {
    slug: "lost-american-memories",
    projectId: "pu1kusrz",
    projectName: "lost-american-memories",
  },
  { slug: "stop-wasting-stuff", projectId: "x0a4syb1", projectName: "stop-wasting-stuff" },
  {
    slug: "forgotten-american-survival",
    projectId: "ksy60hww",
    projectName: "forgotten-american-survival",
  },
  { slug: "carlyfe", projectId: "fgynawmf", projectName: "carlyfe" },
  {
    slug: "american-food-history",
    projectId: "iji68mld",
    projectName: "american-food-history",
  },
  { slug: "british-nostalgia", projectId: "n5gutrbv", projectName: "british-nostalgia" },
  {
    slug: "forgotten-american-weapons",
    projectId: "1gz3wplt",
    projectName: "forgotten-american-weapons",
  },
  {
    slug: "forgotten-american-skills",
    projectId: "lp0hbjba",
    projectName: "forgotten-american-skills",
  },
  {
    slug: "once-upon-a-british-time",
    projectId: "mh7aketu",
    projectName: "once-upon-a-british-time",
  },
  {
    slug: "forgotten-ways-to-make-money",
    projectId: "2zvm6n87",
    projectName: "forgotten-ways-to-make-money",
  },
];

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

function loadTemplateEnv(): Record<string, string> {
  const stripeEnv = parseEnvFile(path.join(ROOT, ".env.stripe"));
  const sanityEnv = parseEnvFile(LAM_ENV);
  return { ...stripeEnv, ...sanityEnv };
}

function run(cmd: string, cwd: string, env: Record<string, string> = {}) {
  console.log(`  $ ${cmd}`);
  execSync(cmd, {
    cwd,
    stdio: "inherit",
    env: { ...process.env, ...env },
  });
}

function createSanityProject(name: string): string {
  const output = execSync(`npx sanity projects create "${name}" --dataset production --json`, {
    cwd: path.join(ROOT, "stop-wasting-stuff"),
    encoding: "utf8",
    env: process.env,
  });
  const parsed = JSON.parse(output) as { id?: string; projectId?: string };
  const id = parsed.id ?? parsed.projectId;
  if (!id) throw new Error(`Could not parse project id from: ${output}`);
  console.log(`  Created Sanity project ${name}: ${id}`);
  return id;
}

function writeEnvLocal(slug: string, projectId: string, template: Record<string, string>) {
  const siteDir = path.join(ROOT, slug);
  const existing = parseEnvFile(path.join(siteDir, ".env.local"));
  const downloadSecret =
    existing.DOWNLOAD_TOKEN_SECRET ??
    execSync("openssl rand -hex 32", { encoding: "utf8" }).trim();

  const lines = [
    "# Sanity CMS — primary content source",
    "NEXT_PUBLIC_USE_SANITY=true",
    `NEXT_PUBLIC_SANITY_PROJECT_ID=${projectId}`,
    "NEXT_PUBLIC_SANITY_DATASET=production",
    "NEXT_PUBLIC_SANITY_API_VERSION=2026-07-15",
    `SANITY_API_READ_TOKEN=${template.SANITY_API_READ_TOKEN ?? ""}`,
    "",
    "# Stripe webhook (account keys in repo-root .env.stripe)",
    `STRIPE_WEBHOOK_SECRET=${existing.STRIPE_WEBHOOK_SECRET ?? template.STRIPE_WEBHOOK_SECRET ?? ""}`,
    "",
    "# Downloads",
    `DOWNLOAD_TOKEN_SECRET=${downloadSecret}`,
    "",
    "# Local dev only",
    "NEXT_PUBLIC_SITE_URL=http://localhost:3000",
    "",
  ];

  writeFileSync(path.join(siteDir, ".env.local"), lines.join("\n"));
  console.log(`  Wrote .env.local for ${slug} (project ${projectId})`);
}

function setupSite(site: SiteSanityConfig, template: Record<string, string>) {
  const siteDir = path.join(ROOT, site.slug);
  if (!existsSync(siteDir)) {
    console.error(`Missing site directory: ${site.slug}`);
    return;
  }

  let projectId = site.projectId;
  console.log(`\n=== ${site.slug} ===`);

  if (!projectId && site.createIfMissing) {
    projectId = createSanityProject(site.projectName);
  }
  if (!projectId) {
    console.error(`No project ID for ${site.slug}`);
    return;
  }

  writeEnvLocal(site.slug, projectId, template);

  const env = {
    NEXT_PUBLIC_SANITY_PROJECT_ID: projectId,
    NEXT_PUBLIC_SANITY_DATASET: "production",
    NEXT_PUBLIC_SANITY_API_VERSION: "2026-07-15",
    SANITY_API_READ_TOKEN: template.SANITY_API_READ_TOKEN ?? "",
  };

  run("npm run sanity:schema", siteDir, env);
  run("npm run sanity:migrate", siteDir, env);
  console.log(`  ✓ ${site.slug} Sanity ready (${projectId})`);
}

const template = loadTemplateEnv();
if (!template.SANITY_API_READ_TOKEN) {
  console.warn("Warning: SANITY_API_READ_TOKEN not found in lost-american-memories/.env.local");
}

for (const site of SITES) {
  setupSite(site, template);
}

console.log("\nAll Sanity sites provisioned. Set NEXT_PUBLIC_USE_SANITY=true on Netlify for each site.");
