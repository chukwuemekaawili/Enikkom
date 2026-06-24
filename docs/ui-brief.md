# Enikkom — UI/UX Brief & Design System

> The single source of truth for how the Enikkom / HDDTEC site looks and behaves.
> Values here are extracted from the live code (`src/index.css`, shared components),
> not aspirational. When code and this doc disagree, fix one to match the other —
> don't let them drift.

**Design intent.** Enterprise infrastructure / EPC credibility — corporate, industrial,
audit-ready, investor-facing. Shell-class *discipline* (layout maturity, card structure,
spacing rhythm, restrained accent), but Enikkom's own navy/gold identity. It must **not**
read as AI-generated, SaaS-generic, playful, or overdesigned: no loud gradients, neon,
glassmorphism, decorative blobs, or oversaturated gold fills.

The whole design system is scoped under the `.enk` class (applied on the root in
`Layout.tsx`). All tokens are CSS custom properties defined on `.enk` in `src/index.css`.

---

## 1. Color system

OKLCH, tinted toward navy — never pure `#fff` / `#000`. Ratio target: **navy ~55% ·
white/grey ~30% · gold ~10% · steel ~5%.** Navy = authority, gold = action only,
white/grey = clarity, steel = structure.

### Surfaces
| Token | Value (OKLCH) | Use |
|---|---|---|
| `--enk-bg` | `oklch(0.99 0.004 255)` | Page background, light cards |
| `--enk-bg-muted` | `oklch(0.965 0.006 255)` | Alternating light sections, logo band |
| `--enk-navy` | `oklch(0.20 0.035 255)` | Header, footer, hero, dark cards, final CTA |
| `--enk-navy-2` | `oklch(0.25 0.04 255)` | Dropdown panels, dark inputs, hover-dark |
| `--enk-navy-3` | `oklch(0.30 0.04 255)` | Tertiary dark surface |

### Text
| Token | Value | Use |
|---|---|---|
| `--enk-ink` | `oklch(0.26 0.02 260)` | Primary text on light (~11:1) |
| `--enk-steel` | `oklch(0.46 0.02 260)` | Muted text on light (~4.8:1) |
| `--enk-on-dark` | `oklch(0.97 0.005 255)` | Primary text on navy |
| `--enk-on-dark-muted` | `oklch(0.80 0.015 255)` | Muted text on navy |

### Brand / accent
| Token | Value | Use |
|---|---|---|
| `--enk-blue` | `oklch(0.50 0.14 252)` | Action/link on light; primary button |
| `--enk-blue-hover` | `oklch(0.43 0.13 252)` | Primary button hover |
| `--enk-gold` | `oklch(0.81 0.13 85)` | **Accent — dark backgrounds only.** CTA buttons, active nav underline, eyebrow lines, link arrows, key metrics, small icons |
| `--enk-bronze` | `oklch(0.47 0.09 65)` | Accent on **light** backgrounds (~5.5:1), e.g. kickers |
| `--enk-safety` | `oklch(0.56 0.12 150)` | QHSE positive signal |

**Gold rule (strict).** Gold is for action and small emphasis only — CTA buttons, the
gold search submit, arrows, eyebrow rules, the flagship metric. Never a large background
fill. On light backgrounds use `--enk-bronze` for accent text, not gold.

### Lines & elevation
| Token | Value |
|---|---|
| `--enk-line` | `oklch(0.90 0.008 255)` |
| `--enk-line-strong` | `oklch(0.84 0.012 255)` |
| `--enk-line-dark` | `oklch(0.32 0.03 255)` |
| `--enk-shadow-sm` | `0 1px 2px oklch(0.20 0.04 255 / 0.06)` |
| `--enk-shadow-md` | `0 14px 40px oklch(0.20 0.04 255 / 0.10)` |
| `--enk-radius` | `8px` |

Shadows stay subtle — hairline border + `shadow-sm` at rest, `shadow-md` on hover. No
heavy/unrealistic shadows.

---

## 2. Typography

Two families, loaded already:
- **Schibsted Grotesk** — display headings (`.enk-display`, `.section-title`). Weight 700,
  `letter-spacing: -0.03em`, `line-height: 1.04`.
- **IBM Plex Sans** — body / UI default.
- **IBM Plex Mono** — eyebrows, chips, stat numbers (`.enk-stat`, tabular).

### Scale (from live utilities)
| Role | Class / size |
|---|---|
| Eyebrow (mono, on-dark) | `.enk-kicker` — 0.72rem, `letter-spacing 0.22em`, uppercase, gold (`--enk-kicker--on-dark`) / bronze on light. Has a leading rule via `::before`. |
| Eyebrow (utility) | `.section-eyebrow` — 12–13px, semibold, `tracking-[0.22em]`, uppercase, `text-primary` |
| Display H1/H2 | `.enk-display` + per-instance `clamp()`. Hero H1 `clamp(2rem,5vw,3.5rem)`; section H2 `clamp(1.6rem,3vw,2.2rem)`; CTA `clamp(1.8rem,3.5vw,2.6rem)` |
| Section title | `.section-title` (Schibsted Grotesk) |
| Section intro | `.section-subtitle` — 15→18px, `text-muted-foreground`, `max-w-3xl`, `leading-[1.72]` |
| Body / card body | 14–15px |
| Button | 14px, semibold/bold |
| Footer | 13–14px |

**Rules.** No body text below 14px. Hero H1 is the strongest text on the page. Heading
color is set per-instance (utility/inline) — `.enk-display` deliberately sets **no** color
so on-dark vs on-light both stay correct. Keep readable measures (hero/intro ~`max-w-2xl`/`3xl`,
card body ~`280–340px`).

---

## 3. Layout & spacing

Spacing scale (no arbitrary values): **4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 120**.

### Containers
| Class | Spec |
|---|---|
| `.enk-container` | `max-width: 1240px`, padding-inline 1.25rem → 2rem @md |
| `.container-wide` | `max-w-[1320px]`, px 5 → 7 (sm) → 10 (lg) |

### Section padding
| Class | Spec |
|---|---|
| `.enk-section` | `padding-block: 4.5rem` → 6.5rem @md; `--tight` 3rem |
| `.section-padding` | `py-18 md:py-24 lg:py-28` (`-sm` and `-lg` variants exist) |

### Grids
- **3-col** capability cards (→ 2 @tablet → 1 @mobile).
- **2-col** for process / QHSE split.
- **Feature grid** = 1 large + supporting cards (see §5 flagship).

**Rules.** One purpose per section. Cards in a row align perfectly and share equal height.
Same-section images share one crop ratio. Don't mix many card styles in one section.

### Global behavior (decisions made this session)
- **No horizontal scroll, ever.** `overflow-x: hidden` is set on both `html` and `body`
  (`src/index.css`). This is a hard guarantee against sub-pixel/animation overflow — keep it.
- **Scroll-to-top on route change** is handled in `Layout.tsx` (`scrollTo({top:0})` on
  `pathname` change).

---

## 4. Reusable components (catalogue)

### Buttons — `.enk-btn` (min-height 48px, radius `--enk-radius`, ≤180ms ease-out)
| Variant | Use |
|---|---|
| `.enk-btn--gold` | **Primary CTA.** Gold bg, navy text. The one action style. |
| `.enk-btn--primary` | Blue bg, white text (action on light) |
| `.enk-btn--outline` | Transparent, ink text, strong border → blue on hover |
| `.enk-btn--on-dark` | Transparent on navy, white text, translucent border |

**CTA rules.** Max two button styles visible together; primary is always gold. One main
CTA per surface — no competing buttons. Canonical labels: **Request a Crossing Assessment**
(primary), **View Projects** (secondary), **Download Capability Statement** (document).

### Cards
| Class | Use |
|---|---|
| `.enk-card` + `.enk-card--hover` | Standard card: `--enk-bg`, hairline `--enk-line`, `shadow-sm` → `shadow-md` + `translateY(-2px)` on hover |
| `CapabilityCard` (component) | Image-led card (image `aspect-[16/10]`, cover-crop, optional metric/icon chip, gold `enk-link` CTA). Reused on the capabilities grid **and** the search default state. |
| `CaseStudyCard` / `Tile` | Supporting project tile (image top + navy panel, mono location, gold result) |
| Light document card | White bg, thin border, ~72–96px tall, small icon — QHSE/cert/policy items |

### Other primitives
| Class | Spec |
|---|---|
| `.enk-chip` | Mono, uppercase, 0.7rem, squared (radius 6px), hairline border. `--on-dark` variant. No pills, no emoji. |
| `.enk-kicker` | Eyebrow with leading rule (see Typography) |
| `.enk-link` | Gold/blue inline link, animated arrow gap on hover |
| `.enk-stat` | IBM Plex Mono, tabular numerals, for KPI figures |
| `.enk-scrim` | Hero overlay gradient (navy, denser left+top+bottom) guaranteeing AA over photos |
| `.focus-ring` | `focus-visible` ring (ring-2, primary, offset-2) — apply to all interactive elements |

### Imagery
Real, documentary, industrial photos — never stock-looking or AI-shiny. `object-fit: cover`,
consistent crops per section, dark scrim only where text sits on image. Ratios: hero =
full-bleed cinematic; capability cards 16:10; project cards 16:9; logos contained (not cropped).

---

## 5. Page-specific patterns & decisions (this redesign)

### Header (`HomeHeader.tsx`)
- Sticky, navy, dual-brand Enikkom | HDDTEC lockup left, primary nav, search icon right.
- Active nav state uses a thin gold underline.
- **Search icon is a `<Link to="/search">`** (a real page nav), not a modal/command-palette.
- **Ctrl/Cmd+K navigates to `/search`** (no overlay).

### Search (`/search` — `SearchPage.tsx`, `content/searchIndex.ts`)
- **Dedicated full page**, Shell-style: navy hero with breadcrumb (`Home › Search`),
  oversized uppercase `.enk-display` "SEARCH" headline, large input + **gold square submit
  button**.
- **Default (no query) state** = featured `CapabilityCard`s (Careers, Resources) **+** a
  "Popular Searches" sidebar — not a bare link list.
- **Index real content, not just page titles.** `searchIndex` includes pages, capabilities,
  projects, **certifications, achievements, leadership (named people), partners/JVs, FAQ
  answers, and mission/vision statements**, each carrying a category tag. Descriptions are
  copied verbatim from already-verified copy (`home.ts`, `companyProfile.ts`, page sources) —
  nothing invented.
- Results = SERP style: `CATEGORY · breadcrumb` line, title, description.
- No-results = dashed card + suggested `.enk-chip` links.
- Scope only to nav-surfaced routes; exclude orphan/legacy routes.

### Flagship project hierarchy (`CaseStudies.tsx`)
- **1 large flagship + supporting cards**, not equal tiles. The record drill
  (Atlas Cove-Mosimi) is the credibility anchor.
- Flagship = image-dominant card with navy scrim, **"FLAGSHIP PROJECT"** gold eyebrow,
  enlarged `.enk-display` metric (~30px), larger title; supporting projects keep the
  standard `Tile`.
- Layout: desktop = flagship left + 2×2 supporting right; tablet = flagship full-width on
  top + 2×2 below; mobile = single-column stack. Cover-crop and navy/gold theme preserved.

### Back-to-top (`BackToTopButton.tsx`, mounted in `Layout.tsx`)
- Minimal navy square, white up-arrow, fixed bottom-right; appears after scrolling
  >60% viewport; smooth scroll to top. Sits above the mobile sticky CTA.

### Logo marquee (`LogoMarquee.tsx`) — keep as-is
- Slow, smooth, **linear** transport (`.enk-marquee`, 48s; reverse 56s). **Pause on hover.**
  Equal-weight logo cards (`.enk-logo-card`, 232×104, white, contained logos ≤170×64). Edge
  fade mask. `prefers-reduced-motion` → static wrapped grid. Must not cause mobile horizontal
  overflow. If perf/readability degrades, fall back to a static 2-col mobile grid.

---

## 6. Content & integrity rules (carried conventions)
- **Nothing invented.** Real, verified facts only; copy is sourced from in-repo content
  files. Unsupplied content ships as a visible `PH("…")` placeholder token, never fabricated.
- **Documents view-in-new-tab, never force-download** (policies, certificates).
- **YouTube thumbnails use `hqdefault.jpg`**, not `maxresdefault.jpg` (the latter 404s
  silently into a broken grey placeholder for many videos).

---

## 7. Responsiveness
Design mobile deliberately, don't just stack. Header 64px on mobile; hero H1
`clamp` floors ~36px; cards → 1 column; client logos → ~2-col grid; sticky CTA where
appropriate; tighten copy spacing to avoid scroll fatigue. **Verify no horizontal overflow
at every breakpoint** (the global `overflow-x:hidden` is the backstop, not an excuse for
overflowing layout).

---

## 8. Anti-patterns (do not ship)
Loud gradients · neon/glow · glassmorphism · unrealistic shadows · over-rounded cards ·
decorative blobs · fake-futuristic overlays · icon spam · random colors · oversaturated /
large-area gold · AI-shiny buttons · template sections · inconsistent spacing · text <14px ·
excessive animation · sideways scroll.

---

## 9. Rules codified this session (apply to all pages)

### Hero CTAs
- **One primary CTA per hero, max.** Secondary pages must not be louder than the homepage
  hero. Never two equal-weight buttons on a secondary-page hero.
- Each hero needs a **specific badge** (e.g. `badge="Capability"`, `badge="Project"`), not the
  generic "Engineering delivery" fallback.

### Section structure
- Every major section **must** have: `.enk-kicker` eyebrow → H2 → subtitle paragraph
  (all three required). An icon + H2 alone is not enough.
- `.enk-kicker` for **all** eyebrows — never raw `text-[11px] md:text-xs font-semibold
  uppercase tracking-widest text-primary`. Light sections use `.enk-kicker`; dark sections
  add `.enk-kicker--on-dark`.

### Step indicators
- Numbered steps use **flat mono bronze numerals** (`font-mono text-[13px] tracking-[0.14em]`
  `color: var(--enk-bronze)`), never filled circular badge shapes.

### CTABand
- Never use bare `<CTABand />` with zero props — always supply `headline` + `primaryCTA`.
  The defaults ("Start Your Project Today") are placeholder copy, not production-ready.

### Chip / badge shape
- `.enk-chip` for all text chips/tags/badges — squared (radius 6px), mono, uppercase.
- `rounded-full` permitted only on: icon-only circular buttons, map-dot animations,
  scrollbar thumbs, the active-nav gold underline rule (2 px height).

### Color — light vs dark surfaces
- `--enk-gold` (L=0.81): **dark backgrounds only** — CTA buttons, eyebrow rules, key metrics.
- `--enk-bronze` (L=0.47, ~5.5:1): accent text / step numerals on **light** backgrounds.
- Off-palette greens: use `--enk-safety` (`oklch(0.56 0.12 150)`) for QHSE/safety signals
  only — never `text-green-600` or `bg-green-600`.

### Radii
- Cards: `--enk-radius` (8px) via `.enk-card`, or `rounded-xl` (12px) for dark/feature cards.
- Buttons: `rounded-[var(--enk-radius)]` on all text-button sizes (applied in `button.tsx`).
- Inputs / Textareas: `rounded-[var(--enk-radius)]` (applied in `input.tsx`, `textarea.tsx`).
- Never arbitrary radii like `rounded-[14px]`, `rounded-[2rem]`, `rounded-[1.25rem]` etc.

### Radix / portal CSS scope
- Radix Dialog, Sheet, Popover, Tooltip portal to `document.body` **outside** the `.enk` div.
- `--enk-*` CSS custom properties are undefined inside portals — use Tailwind globals only
  (`bg-muted`, `border-border`, `text-foreground`, `rounded-md`) inside portaled components.

### Stat display on dark sections
- Record/stat values: `enk-display text-[clamp(2rem,4vw,2.6rem)] text-[var(--enk-on-dark)]`
- Stat labels: `style={{ color: "var(--enk-gold)" }}`
- Dark stat cards: `rounded-xl border border-white/10 bg-white/5 hover:bg-white/10`

### Documents
- Policy docs, certificates, and PDFs **open in a new tab** — never force-download (`download` attr).
- Use `target="_blank" rel="noopener noreferrer"` with an ExternalLink icon.

### Dead files (do not edit — not imported by live Layout)
- `src/components/layout/Header.tsx` — superseded by `HomeHeader.tsx`
- `src/components/layout/Footer.tsx` — superseded by `HomeFooter.tsx`
- `src/components/sections/ImageSliderHero.tsx` — not used in any live route
- `src/components/sections/AnimatedKPIBand.tsx` — not imported anywhere
