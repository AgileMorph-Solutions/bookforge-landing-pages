/**
 * Upload cookbook PDFs to Netlify Blobs (store: cookbook-pdfs).
 *
 * Preferred (uses Netlify CLI auth — most reliable):
 *   netlify link
 *   npm run upload-pdfs:netlify
 *
 * Or with explicit credentials:
 *   NETLIFY_AUTH_TOKEN=... NETLIFY_SITE_ID=... npm run upload-pdfs:netlify
 *
 * Keys match download route slugs (e.g. poor-man-recipe-bible).
 */
import { spawnSync } from "child_process";
import { access } from "fs/promises";
import path from "path";
import { INDIVIDUAL_BOOKS } from "../src/lib/products";

const STORE_NAME = "cookbook-pdfs";

function runNetlifyBlobsSet(key: string, filePath: string): void {
  const args = [
    "blobs:set",
    STORE_NAME,
    key,
    "--input",
    filePath,
  ];

  if (process.env.NETLIFY_AUTH_TOKEN) {
    args.push("--auth", process.env.NETLIFY_AUTH_TOKEN);
  }

  const result = spawnSync("netlify", args, {
    stdio: "inherit",
    env: process.env,
  });

  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    throw new Error(`netlify blobs:set failed for ${key} (exit ${result.status})`);
  }
}

async function uploadPdfs() {
  console.log(`Store: ${STORE_NAME}\n`);

  for (const book of INDIVIDUAL_BOOKS) {
    const localPath = path.join(process.cwd(), "assets", book.pdfFilename);
    await access(localPath);

    console.log(`Uploading ${book.slug}...`);
    console.log(`  file: ${book.pdfFilename}`);
    runNetlifyBlobsSet(book.slug, localPath);
    console.log(`  ✓ stored as key "${book.slug}"\n`);
  }

  console.log("All PDFs uploaded to Netlify Blobs.");
  console.log(`Verify: netlify blobs:list ${STORE_NAME}`);
}

uploadPdfs().catch((err) => {
  console.error(err);
  process.exit(1);
});
