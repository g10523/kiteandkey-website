# Kite & Key Academy — Website Redesign (Next.js + Tailwind)

## Run locally
```bash
npm install
npm run dev
```

Open: http://localhost:3000

## Replace tutor photos
Replace the placeholder files in:
- `public/team/placeholder-1.svg` ... `placeholder-9.svg`

Or update paths in:
- `lib/content.ts`

## Notes
- Uses **relative imports only** (no `@/` aliases) to avoid module path issues.
- Contact form posts to `/api/contact` and logs on the server (safe placeholder).
