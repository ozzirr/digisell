# DigiSell

DigiSell is a production-ready MVP foundation for selling downloadable digital products. It includes a conversion landing page, configurable product data, Stripe Checkout, secure Stripe webhooks, Resend transactional email, and temporary signed download links.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Stripe Checkout
- Resend

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create a local env file:

```bash
cp .env.example .env.local
```

3. Fill in the environment variables:

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL="DigiSell <deliveries@example.com>"
SUPPORT_EMAIL=support@example.com
```

4. Run the app:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Product Configuration

Products live in `src/data/products.ts`. Add future products by adding another object with:

- slug
- title
- subtitle
- description
- price
- currency
- cover image
- benefits
- modules
- testimonials
- FAQ
- downloadable file reference

The landing page, Checkout session, webhook fulfillment, and email delivery all use this product source.

## Stripe Checkout

The checkout button posts to `POST /api/checkout` with a product slug. The route creates a hosted Stripe Checkout Session with the product slug stored in session metadata.

For local webhook testing:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the generated `whsec_...` value into `STRIPE_WEBHOOK_SECRET`.

## Email Delivery

`src/lib/email.ts` sends a transactional Resend email after `checkout.session.completed`. The email includes:

- thank you message
- product name
- temporary download link
- support contact
- checkout session reference

SDK clients are initialized lazily so builds do not fail when runtime secrets are absent.

## File Delivery

The MVP uses a signed temporary download URL generated in `src/lib/download-links.ts` and verified by `GET /api/download/[token]`.

`src/lib/file-delivery.ts` is the storage abstraction. Today it returns a placeholder response; connect it to private object storage such as S3, Supabase Storage, or Cloudflare R2 to stream real files without exposing permanent public URLs.

For a dedicated signing secret, add `DOWNLOAD_LINK_SECRET`. If it is not set, links are signed with `STRIPE_WEBHOOK_SECRET`.

## Build Checks

```bash
npm run lint
npm run build
```

## Production Notes

- Configure Stripe webhook retries and monitor failed fulfillment events.
- Add persistent order/fulfillment records before launch if you need idempotency, resend history, or customer portals.
- Use a verified Resend sending domain for production delivery.
- Store digital files in private object storage and stream them through the signed download route.
