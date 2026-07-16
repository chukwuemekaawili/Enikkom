# Enikkom / HDDTEC corporate site

Vite + React 18 + TypeScript + Tailwind + shadcn/ui. Static site, no backend.
Deployed to Vercel from `main` (pushes to main go live).

## Before changing any UI

**Read `docs/ui-brief.md` first and follow it.** It is the single source of design
truth (tokens, type scale, component anatomy, CTA vocabulary, anti-patterns),
extracted from the live code. If your change conflicts with it, either follow it
or update the doc in the same commit — never let them drift.

Also relevant: `PRODUCT.md` (audience, brand personality, register).

## Hard rules

- **Content integrity:** never invent facts, stats, clients, or testimonials.
  Verified company facts live in `resources/eclweb/` source documents; if a claim
  can't be traced there, flag it for the owner instead of shipping it.
- Design tokens live on `.enk` in `src/index.css` (`--color-*` canonical,
  `--enk-*` aliases). Recolor centrally, not per-file.
- Radix portals render outside `.enk` — use Tailwind semantic classes inside
  portaled components, never `--enk-*` variables.
- The live shell is `src/components/home/HomeHeader.tsx` / `HomeFooter.tsx`
  via `Layout.tsx`.
- One "Contact us" CTA per page (closing CTABand). No procurement-jargon CTAs.
- Docs/PDF links open in a new tab, never force-download. No public
  certificate links or on-file status stamps (security decision).

## Commands

- `npm run dev` — dev server on :8080 (use the `enikkom-dev` launch config)
- `npx tsc --noEmit` — typecheck (cold run can take 3+ min on this machine)
- `npx eslint .` — lint
- `npm run build` — production build (~3 min)
- `npx vitest run` — tests
