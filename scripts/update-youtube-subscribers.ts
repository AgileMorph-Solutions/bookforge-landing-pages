import { execSync } from "child_process";
import { readFileSync } from "fs";
import path from "path";
import { createClient } from "@sanity/client";

const subscribers = process.env.SUBSCRIBERS;
if (!subscribers) {
  throw new Error("SUBSCRIBERS env var is required");
}

function parseEnvFile(filePath: string): Record<string, string> {
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

function stripAnsi(value: string): string {
  return value.replace(/\u001b\[[0-9;]*m/g, "");
}

function getAuthToken(): string {
  const output = stripAnsi(
    execSync("npx sanity debug --secrets", {
      encoding: "utf8",
    })
  );
  const match = output.match(/Auth token:\s*'([^']+)'/);
  if (!match?.[1]) throw new Error("Could not read Sanity auth token");
  return match[1];
}

async function main() {
  const cwd = process.cwd();
  const env = parseEnvFile(path.join(cwd, ".env.local"));
  const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID missing in .env.local");

  const client = createClient({
    projectId,
    dataset: env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-07-15",
    token: getAuthToken(),
    useCdn: false,
  });

  await client.patch("siteSettings").set({ youtubeSubscribers: subscribers }).commit();
  await client.patch("homePage").set({ "youtube.stats[0].value": subscribers }).commit();

  const verified = await client.fetch<{ youtubeSubscribers: string }>(
    `*[_id == "siteSettings"][0]{youtubeSubscribers}`
  );

  console.log(`${path.basename(cwd)}: ${verified.youtubeSubscribers}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
