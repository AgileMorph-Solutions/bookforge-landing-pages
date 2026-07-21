/** Patch migrate-local-content-to-sanity.ts in all channel sites */
import { readFileSync, writeFileSync } from "fs";
import path from "path";

const ROOT = path.resolve(__dirname, "..");
const SLUGS = [
  "forgotten-american-survival",
  "carlyfe",
  "american-food-history",
  "british-nostalgia",
  "forgotten-american-weapons",
];

for (const slug of SLUGS) {
  const file = path.join(ROOT, slug, "scripts/migrate-local-content-to-sanity.ts");
  let content = readFileSync(file, "utf8");

  if (!content.includes("existsSync")) {
    content = content.replace(
      'import { createReadStream } from "fs";',
      'import { createReadStream, existsSync } from "fs";'
    );
  }

  content = content.replace(
    /const recipeImageFiles[\s\S]*?function fileRef/,
    `async function uploadRecipeImage(imagePath: string) {
  const filePath = path.join(root, "public", imagePath.replace(/^\\//, ""));
  if (!existsSync(filePath)) return null;
  return uploadAsset("image", filePath);
}

function fileRef`
  );

  content = content.replace(
    /async function uploadRecipeImage\(name: string\) \{[\s\S]*?\n\}/,
    ""
  );

  content = content.replace(
    /const pdfId = product\.pdfFilename[\s\S]*?: null;/,
    `const pdfPath = path.join(root, "assets", product.pdfFilename);
    const pdfId =
      product.pdfFilename && existsSync(pdfPath)
        ? await uploadAsset("file", pdfPath)
        : null;`
  );

  content = content.replace(
    "await uploadRecipeImage(preview.name)",
    "await uploadRecipeImage(preview.image)"
  );

  writeFileSync(file, content);
  console.log(`Patched ${slug}`);
}
