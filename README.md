# bookforge-landing-pages

Monorepo for Bookforge channel landing sites (Next.js + Sanity + Stripe), deployed on Netlify.

Each site folder is a standalone Next.js app. Netlify sites use this repo with a **base directory** set to the site folder name. Continuous builds are intentionally **stopped** to conserve Netlify credits — deploy manually when needed.

See `NETLIFY-RESTORE.md` for production deploy restore points.
