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

## Booking integration

| Surface | Default URL |
|---------|-------------|
| Book button / links | `https://treow-clinic.vercel.app/book/nguyens-osteopathy` |
| `/book` embed iframe | `https://treow-clinic.vercel.app/embed/nguyens-osteopathy` |

Override with `NEXT_PUBLIC_BOOKING_URL` and `NEXT_PUBLIC_BOOKING_EMBED_URL` once the clinic slug exists in Treow.

## Content

Clinic copy, pricing, services, hours, and contact details live in `src/lib/site.ts`. Brand assets are in `public/images/`.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Deploy (Vercel)

1. Import `Duynguyen0106/Nguyensosteopathy` in [Vercel](https://vercel.com/new).
2. Framework preset: Next.js (defaults are fine).
3. Set env vars from `.env.example` if you need a custom Treow booking slug.
4. Deploy production from `main` after merging the PR.
