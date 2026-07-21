import { put } from "@vercel/blob";
import { randomBytes } from "crypto";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { INDIVIDUAL_BOOKS } from "../src/lib/products";

async function uploadPdfs() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error("BLOB_READ_WRITE_TOKEN is required");
    process.exit(1);
  }

  const prefix =
    process.env.BLOB_PDF_SECRET_PREFIX ??
    randomBytes(16).toString("hex");

  const manifest: Record<string, string> = {};

  for (const book of INDIVIDUAL_BOOKS) {
    const blobPath = `pdfs/${prefix}/${book.slug}.pdf`;
    const localPath = path.join(process.cwd(), "assets", book.pdfFilename);

    console.log(`Uploading ${book.title}...`);
    const fileBuffer = await readFile(localPath);

    const blob = await put(blobPath, fileBuffer, {
      access: "public",
      contentType: "application/pdf",
      addRandomSuffix: false,
    });

    manifest[book.slug] = blobPath;
    console.log(`  → ${blob.url}`);
  }

  const manifestPath = path.join(process.cwd(), "blob-manifest.json");
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2));

  console.log("\nAll PDFs uploaded successfully.");
  console.log("Manifest written to blob-manifest.json");
  console.log("\nSet this in your Vercel env vars:");
  console.log(`BLOB_PDF_SECRET_PREFIX=${prefix}`);
}

uploadPdfs().catch((err) => {
  console.error(err);
  process.exit(1);
});
