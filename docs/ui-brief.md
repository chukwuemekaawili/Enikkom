# Enikkom — UI/UX Brief & Design System

> The single source of truth for how the Enikkom / HDDTEC site looks and behaves.
> Values here are extracted from the live code (`src/index.css`, shared components),
> not aspirational. When code and this doc disagree, fix one to match the other —
> don't let them drift.
>
> **History note.** The site shipped two earlier looks (dark navy/amber "Field
> Records", then all-dark Shell). Both are retired. The current system below is
> **light-first Shell** with the deep brand blue from the Enikkom logo. Older notes
> describing navy/gold, amber accents, mono eyebrows, or squared 3px cards are stale.

**Design intent.** Enterprise infrastructure / EPC credibility — corporate, industrial,
audit-ready, investor-facing. Shell.com-class discipline: light surfaces, generous
whitespace, rounded tiles, modest type scale, one saturated accent. It must **not**
read as AI-generated, SaaS-generic, playful, or overdesigned: no loud gradients, neon,
glassmorphism, decorative blobs, floating hero badges, or circular step numerals.

The design system is scoped under the `.enk` class (applied per page / in `Layout.tsx`).
Canonical tokens are `--color-*` custom properties on `.enk` in `src/index.css`;
established `--enk-*` names alias onto them so components recolour centrally.

---

## 1. Color system

Drawn from the Enikkom logo mark: deep blue `#1050A0`, gear cyan `#00A0E0`,
gear red, charcoal wordmark. The page is light; dark navy survives only where it is
physical (hero video tile, photo scrims, footer).

### Surfaces
| Token | Value | Use |
|---|---|---|
| `--color-bg` / `--enk-bg` | `#FBFCFD` | Page background |
| `--color-bg-deep` / `--enk-bg-muted` | `#E9EEF3` | Tinted full-width section bands — must stay visibly darker than the page |
| `--color-surface-card` / `--enk-record-surface` | `#FFFFFF` | Cards/tiles (hairline `--enk-card-line` + faint shadow) |
| `--enk-record-surface-raised` | `#F4F6F8` | Card hover tone |
| `--enk-record-inset` | `#EEF1F4` | Recessed wells: table heads, ref plates |
| `--color-footer` / `--enk-navy` | `#16263B` | Footer and dark islands (brand-blue hue family, not neutral charcoal) |

### Text
| Token | Value | Use |
|---|---|---|
| `--enk-ink` | `#21272E` | Primary text on light |
| `--enk-steel` | `#59626B` | Muted text on light |
| `--enk-meta` | `#646D76` | Captions/metadata |
| `--enk-blueprint` | `#4E6274` | Cool secondary ink: coordinates, refs |
| (dark islands) | `#E6E9EC` / `#B8BEC4` | Set locally in HomeFooter, hero panels, lightbox |

### Accent
| Token | Value | Use |
|---|---|---|
| `--enk-accent-primary` | `#1050A0` | THE accent: button fills (white text), links, read-more, active nav rule, QuickActions band |
| `--enk-accent-primary-hover` | `#0C4183` | Hover |
| `--enk-cyan` | `#00A0E0` | Decorative only — fails AA as text |
| `--enk-red` | `#C0343A` | Restrained logo-red accent, rare |
| `--enk-safety` | `oklch(0.50 0.11 150)` | QHSE positive signals only |

One blue tone serves both fills and standalone accent text (8:1 on white).
Legacy names (`--enk-gold`, `--enk-bronze`, `--brand-amber`, `.enk-btn--gold`)
all resolve to the brand blue — do not reintroduce amber/gold values.

**The one saturated moment.** The home "How can we help?" band is a full
`#1050A0` fill with white tiles on top — the single mid-scroll color anchor
between the dark hero and the navy footer. Don't add more full-color bands.

---

## 2. Typography

- **Headings: Jost** (Google Fonts; humanist, Shell-like). Weight 700,
  `letter-spacing: normal` — never negative tracking.
- **Body: Arial system stack** (no webfont), 14px/21px → 15px/22px @md.
- **IBM Plex Mono**: numeric table cells and spec values ONLY (`.enk-mono`,
  `.enk-spec td`). Never for eyebrows, labels, or headings.

### Scale (base CSS, `src/index.css`)
| Element | Size |
|---|---|
| h1 | `clamp(26px, 3.5vw, 40px)` / 1.25 |
| h2 | `clamp(22px, 2.8vw, 28px)` / 1.3 |
| h3 | `clamp(19px, 2vw, 22px)` / 1.35 |
| h4 | `clamp(17px, 1.6vw, 19px)` / 1.4 |
| Body | 14–15px |
| `.enk-kicker` (eyebrow) | 13px bold body font, sentence case, steel — no mono, no tracking, no rule |
| `.enk-overline` | 12px bold body font (11px floor in dense tables via `!text-[11px]`) |

**Rules.** No visible text below 11px. Card headings inside a section led by an h2
are h3 (size pinned by utility class, e.g. `text-[15px]`). One h1 per page.
Sentence case everywhere — no uppercase tracking labels, no decorative numbering
(FIG/Plate/Step NN are retired).

---

## 3. Layout & spacing

- Container: `.enk-container` — max 1300px, padding-inline 1.25rem → 2rem @md.
- Sections: `.enk-section` — 64px → 72px @md; `--tight` 40px. Legacy
  `.section-padding` matches this rhythm.
- Bands alternate page (`--enk-bg`) and tinted (`--enk-bg-muted`); hairline
  `--enk-rule` borders separate same-tone sections.
- `overflow-x: hidden` on html/body is a backstop, not an excuse — layouts must
  not overflow at 375px.
- Scroll-to-top on route change is handled in `Layout.tsx`.

## 4. Radii & elevation

| Token | Value | Use |
|---|---|---|
| `--radius-card` | 14px | `.enk-card` tiles |
| `--enk-radius-record` | 12px | doc cards, figures, register frames |
| `--radius-control` / `--enk-radius` | 8px | buttons, inputs |
| `--enk-radius-stamp` | 6px | chips, status stamps |
| shadcn `--radius` | 0.75rem | Radix components (beware: `rounded-sm` derived from it is 8px — pin small boxes like checkboxes to `rounded-[4px]`) |

Shadows: `--enk-shadow-sm` at rest, `--enk-shadow-md` on hover. Hover raises the
surface tone (`.enk-card--hover`) — no lift-off glow, no border sharpening.
`rounded-full` only on icon-only circular buttons, avatars, scrollbar thumbs.

## 5. Components

- **Buttons `.enk-btn`** — min-height 48px, radius 8px, ≤180ms ease-out.
  `--primary` (and legacy alias `--gold`): brand-blue fill, WHITE text.
  `--outline`: ink text, strong hairline. `--on-dark`: translucent on dark islands.
  Max two button styles visible together; one primary per surface.
- **Cards `.enk-card`** — white tile, `--enk-card-line` hairline, 14px radius,
  `p-2` with inner `rounded-[10px]` image at `aspect-[16/9]`, title h3, one
  sentence, `.enk-readmore` ("Read more →") pinned bottom-right.
- **`.enk-chip` / `.enk-stamp`** — soft tinted rounded labels, body font, sentence
  case, no borders. Stamp tones: complete/record/neutral/alert.
- **`.enk-spec`** — key/value ledger table: body-font 13px labels, mono tnum values.
- **`FieldFigure`** — photo plate with quiet caption strip; default
  `sizes="(min-width: 768px) 50vw, 100vw"` (override when full-width).
- **`EnhancedImage`** — responsive webp srcset from the image pipeline. ALWAYS pass
  `sizes` for anything smaller than full-width (3-col grids use
  `"(min-width: 1300px) 405px, (min-width: 768px) 33vw, 100vw"`).
- **Hero (`sections/Hero`, `HomeHero`)** — rounded 16px tile inset from the
  viewport, image/video inside, translucent navy overlay panel (12px radius),
  white text. No eyebrow badges. Home video: no `autoPlay` attribute — playback
  starts from an effect that checks `prefers-reduced-motion`.
- **Header (`HomeHeader`)** — solid white, dual-brand lockup (Enikkom | HDDTEC),
  sentence-case 14px nav, dropdowns as plain rounded sheets, 2px blue active rule,
  hairline bottom border that strengthens on scroll. Search is a page (`/search`),
  Ctrl/Cmd+K navigates there.
- **Footer (`HomeFooter`)** — navy `#16263B`, three sentence-case columns +
  contact block, links `py-1.5` (≥24px tap targets), one legal line.

## 6. CTAs & copy

- Every contact-intent CTA reads **"Contact us"** and routes to `/contact` —
  no "Discuss scope / Send RFQ / Request credentials" procurement jargon.
  Exactly ONE contact CTA per page, at the closing CTABand.
- Navigation CTAs stay descriptive and sentence-cased: "View projects",
  "View HDD fleet", "Submit your CV" — never "Learn more"/"Get started".
- Copy is specific and fact-carrying (dimensions, clients, locations). Nothing
  invented: facts trace to `resources/eclweb` source documents. No em dashes in
  visible copy (en-dash ranges like 2003–2025 and route names are fine).
- **Exception — fleet/equipment inventory (owner decision, 2026-07-16):** the
  /equipment page describes fleets qualitatively (classes, brands, use cases),
  never per-unit ratings, quantities, or years — counts go stale faster than
  the site and dense spec tables read as AI-generated. Marquee verified claims
  ("Nigeria's largest in-country HDD fleet", "up to 500-ton class") stay. The
  detailed register lives unrendered in `src/content/equipmentSpecs.ts`.
- Certificate cards show no status stamps and no public "View certificate" links
  (security decision, 2026-07-15). Documents that ARE public open in a new tab,
  never force-download.

## 7. Imagery

Real documentary site photography only — never stock-looking or AI-shiny.
`object-fit: cover`, one crop ratio per section (cards 16:9, figures 4/3 or 16:10).
Grades are restrained (`.enk-photo*`, `tone="documentary"`); no sepia/HDR.
Regenerate responsive variants with the image pipeline scripts when adding files
(`scripts/`, see [image_pipeline] memory / docs).

## 8. Motion

- `<MotionConfig reducedMotion="always">` in `App.tsx` disables transform reveals
  app-wide; only opacity fades remain. Don't add per-section slide-ups.
- Micro-interactions ≤200ms ease-out: color/background/border, read-more arrow
  `translateX(3px)`, marquee is linear with hover-pause and reduced-motion fallback.
- `@media (prefers-reduced-motion: reduce)` collapses all animation globally.

## 9. Accessibility baseline (keep or improve)

- One h1 per page; no heading-level jumps (card titles under an h2 are h3).
- Visible focus: global 2px `#0C4183` outline on `:focus-visible` + `.focus-ring`.
- Tap targets ≥24px (footer/nav links carry vertical padding).
- All images have alt text (empty alt + `aria-hidden` for decorative).
- Radix portals render OUTSIDE `.enk` — use Tailwind semantic classes
  (`bg-muted`, `text-foreground`) inside portaled components, never `--enk-*` vars.
- Forms: labels via shadcn `FormLabel`, autocomplete attributes on contact fields,
  errors inline via `FormMessage`.

## 10. Anti-patterns (do not ship)

Loud gradients · neon/glow · glassmorphism · decorative blobs · floating hero
badges ("New", "Introducing") · circular step numerals · decorative FIG/plate
numbering · mono/uppercase eyebrow labels · amber/gold accents · icon-spam
three-column repeats · "Learn more" CTAs · invented stats/testimonials ·
em dashes in copy · text <11px · horizontal overflow · autoplay that ignores
reduced motion.
