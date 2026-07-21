# bookforge-landing-pages

Monorepo for Bookforge channel landing sites (Next.js + Sanity + Stripe), deployed on Netlify.

Repository: https://github.com/satvik2131/bookforge-landing-pages

Each site folder is a standalone Next.js app. Continuous builds are intentionally **stopped** to conserve Netlify credits — deploy manually when needed.

## Netlify build settings (per site)

Do **not** leave Base as `/` with Package directory set — `npm run build` will run at the repo root (no `package.json`) and fail.

Correct settings for each Netlify site:

| Setting | Value |
|---|---|
| Repository | `satvik2131/bookforge-landing-pages` |
| Base directory | site folder (e.g. `forgotten-american-skills`) |
| Package directory | empty |
| Build command | `npm run build` |
| Publish directory | `.next` (from each site's `netlify.toml`) |

Each site `netlify.toml` has `publish = ".next"` relative to that base folder.

See `NETLIFY-RESTORE.md` for production deploy restore points.
