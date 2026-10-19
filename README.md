# Nguyen's Osteopathic Clinic

Marketing website for Nguyen's Osteopathic Clinic in Woolwich — branded from the clinic leaflet and logo, with online booking via [Treow Clinic](https://github.com/Duynguyen0106/Clinical-app) (`Clinical-app`).

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS v4
- Static content from the clinic leaflet
- Booking CTAs → Treow public book / embed routes

## Getting started

```bash
npm install
cp .env.example .env.local   # optional — defaults already point at Treow
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Live domain

https://www.nguyensosteopathy.com

Printable A5 leaflet (148×210mm, letterbox-friendly, with booking QR): `public/leaflet/nguyens-osteopathy-leaflet.pdf`

## Booking integration

| Surface | Default URL |
|---------|-------------|
| Site `/book` page | `https://www.nguyensosteopathy.com/book` |
| `/book` embed iframe | `https://treow-clinic.vercel.app/embed/nguyens-osteopathy` |
| “Open full booking page” | `https://treow-clinic.vercel.app/book/nguyens-osteopathy` |

Override with `NEXT_PUBLIC_BOOKING_URL`, `NEXT_PUBLIC_BOOKING_EMBED_URL`, and `NEXT_PUBLIC_BOOKING_EXTERNAL_URL` if needed.

Canonical service URLs are `/services/[slug]`. Legacy hubs (`/shockwave`, `/back-neck`, …) permanently redirect there.

Regenerate print PDFs:

```bash
npm run leaflet
npm run poster            # A3 pharmacy-window poster
npm run pavement-poster   # A1 + A2 pavement A-board posters
npm run business-card     # if present
```

## Products Austin built (profile credit)

Product URLs live in `site.products` inside `src/lib/site.ts` and are linked from About, Footer, and practitioner JSON-LD (not patient AuthorBio).

| Product | Audience | Live URL |
|---------|----------|----------|
| **MSK Tutor** | Clinicians / students (not patients) | https://osteotutor-c0c151c1.vercel.app |
| **Treow Clinic** | Clinic booking / staff app | https://treow-clinic.vercel.app |

### LinkedIn checklist (manual)

On [Austin’s LinkedIn](https://www.linkedin.com/in/austin-nguyen-do):

1. **Featured** — pin clinic site (`https://www.nguyensosteopathy.com`), MSK Tutor, and Treow Clinic.
2. **About / Experience** — mention GOsC osteopath at Nguyen’s Osteopathic Clinic (Woolwich), plus builder of MSK Tutor and Treow Clinic.
3. **Website links** — add `nguyensosteopathy.com`, Osteotutor URL, and Treow URL.
4. **Projects** — create LinkedIn Projects for MSK Tutor and Treow with short blurbs from `site.products.*.description`.

### Treow staff profile checklist (manual)

At [Treow login](https://treow-clinic.vercel.app/login), for clinic slug `nguyens-osteopathy`:

1. Confirm practitioner name, photo, GOsC Reg. No. **12332**, and bio match the marketing site.
2. Align services, prices, and bookable hours with `src/lib/site.ts`.
3. Optional: MSK Tutor link in the practitioner bio if Treow supports external links.
4. Verify the public embed still loads at `/book` on the clinic site.

## Content

Clinic copy, pricing, services, hours, contact details, geo coordinates, and product URLs live in `src/lib/site.ts`. Brand assets are in `public/images/`.

## Environment

See [`.env.example`](.env.example) for:

- Treow booking URLs
- Optional `NEXT_PUBLIC_GA_MEASUREMENT_ID` / `NEXT_PUBLIC_GTM_ID` (consent-gated)
- Server-only `GOOGLE_PLACES_API_KEY` for live Google reviews on `/` and `/reviews`
  (Places API **New** + billing; restrict the key to that API; set on Vercel Production)

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run leaflet
```

## Deploy (Vercel)

1. Import `Duynguyen0106/Nguyensosteopathy` in [Vercel](https://vercel.com/new).
2. Framework preset: Next.js (defaults are fine).
3. Set env vars from `.env.example` (Places API for reviews; GA/GTM optional).
4. Deploy production from `main` after merging the PR.
