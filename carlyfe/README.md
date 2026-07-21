# CARLYFE — Landing Page

Sales landing page for [CARLYFE](https://www.youtube.com/@CARLYFE1).

## Stack

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS** — vintage Americana design
- **Stripe Checkout** — hosted payments with payment-gated PDF downloads
- **Vercel Blob** — PDF storage (production)
- **Vercel** — hosting

## Getting Started

```bash
npm install
cp .env.example .env.local
# Add your Stripe keys to .env.local (see Stripe Setup below)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description |
|----------|-------------|
| `STRIPE_SECRET_KEY` | Stripe secret key (`sk_test_...` or `sk_live_...`) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `STRIPE_WEBHOOK_SECRET` | Webhook signing secret (`whsec_...`) |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob token (production PDF delivery) |
| `BLOB_PDF_SECRET_PREFIX` | Random prefix for blob paths (set after upload) |
| `DOWNLOAD_TOKEN_SECRET` | Secret for signed download tokens (min 32 chars; `openssl rand -hex 32`) |
| `NEXT_PUBLIC_SITE_URL` | Site URL (`http://localhost:3000` or production domain) |

## Stripe Setup (Local Testing)

### 1. Get API keys

1. Create a free account at [stripe.com](https://stripe.com)
2. Go to [Dashboard → Developers → API keys](https://dashboard.stripe.com/test/apikeys)
3. Copy **Publishable key** and **Secret key** into `.env.local`

### 2. Configure environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Start webhook forwarding

Install the [Stripe CLI](https://stripe.com/docs/stripe-cli), then in a **separate terminal**:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the `whsec_...` signing secret into `.env.local`:

```
STRIPE_WEBHOOK_SECRET=whsec_...
```

Restart `npm run dev` after updating env vars.

### 4. Test a purchase

1. Open [http://localhost:3000](http://localhost:3000)
2. Click **Get the Library · $39**
3. On Stripe Checkout, use test card: `4242 4242 4242 4242`
4. Any future expiry, any CVC, any ZIP
5. After payment, you land on `/success` with download buttons
6. Click **Download PDF** — file streams only after payment is verified

### Payment security

- PDFs are **never** in `public/` — they live in `assets/` (local) or Vercel Blob (production)
- After checkout, payment is verified **once** with Stripe; a signed 1-year download token is issued
- Downloads use the token (URL or cookie) — no repeated Stripe calls
- Bookmark `/success?access=...` to download again anytime
- Success page polls `/api/verify-session` until payment confirms (handles redirect race)

## Upload PDFs to Vercel Blob (Production)

```bash
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_... npm run upload-pdfs
```

This uploads PDFs with unpredictable paths and writes `blob-manifest.json`. Set the printed `BLOB_PDF_SECRET_PREFIX` in Vercel env vars.

## Deploy to Vercel

1. Push to GitHub and import in [Vercel](https://vercel.com)
2. Set all environment variables from `.env.example`
3. Run `npm run upload-pdfs` with production Blob token
4. Register Stripe webhook in Dashboard:
   - URL: `https://yourdomain.com/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `checkout.session.async_payment_succeeded`
5. Set `NEXT_PUBLIC_SITE_URL` to your production domain
6. Switch Stripe to live keys when ready

## Products

| Book | Price |
|------|-------|
| Poor Man Recipe Bible | $19 |
| 1950s Grandma Cookbook | $27 |
| Great Depression Survival | $27 |
| Cowboy, Frontier & Working Man | $27 |
| Lost Diners & Potlucks | $27 |
| **Complete Bundle (all 5)** | **$39** |

Edit prices in `src/lib/products.ts`.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── checkout/       # Creates Stripe Checkout session
│   │   ├── verify-session/ # Verifies payment (used by success page)
│   │   ├── download/[slug]/ # Streams PDF after payment check
│   │   └── webhooks/stripe/ # Stripe webhook handler
│   └── success/            # Post-purchase download page
├── components/
├── lib/
│   ├── env.ts              # Stripe config validation
│   ├── session.ts          # Payment entitlement verification
│   └── entitlements.ts     # Product → PDF mapping
assets/                     # Local PDFs (dev only)
```
