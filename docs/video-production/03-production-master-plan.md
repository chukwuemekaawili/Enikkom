# 03 — Production Master Plan
## Enikkom Construction Limited · Corporate Video + Website Hero
**Date:** 2026-06-29 | **Status:** Stage 1 deliverable — awaiting creative-direction sign-off

> Built from `01-asset-audit.md`, `02-top-asset-shortlist.md`, verified company facts in `src/content/companyProfile.ts` and the management/projects pages, and the SLB reference video (style only).

---

## 0. VERIFIED COMPANY FACTS (use these — do not invent)

| Fact | Value | Source |
|---|---|---|
| Founded | **1995**, by Engr. Edward Amene (ex-SPDC Project Engineer) | `ManagementPage.tsx`, `AboutPage.tsx` |
| HDD milestone | **First HDD crossing of the River Niger, 2003** — pioneered HDD in Nigeria | `companyProfile.ts`, `CompletedProjectsPage.tsx` |
| Experience claim | **34 years of experience** (site uses "34+") | `home.ts`, `AboutPage.tsx` |
| HDD installed | **100+ km** | `home.ts` |
| Workforce | **500+** | `home.ts` |
| Safety | **Zero-LTI record** | `AboutPage.tsx` |
| Fleet | **9 HDD rigs** — largest in-country fleet (via HDDTEC JV with HDDThailand, ISO 9001:2015) | `HDDEquipmentPage.tsx` |
| Disciplines | HDD / trenchless, pipeline construction, dredging, marine civils, production facilities, EPCI project support | `home.ts` |
| Clients | NNPC, SPDC (Shell), Saipem, Oando, Oilserv, PPMC, NPDC, Dangote, Eni and others | `public/client-logos/` |

> ⚠️ **Consistency flag:** The homepage hero currently says "since 2003" while the company was founded in **1995** (2003 is the HDD milestone). **Recommendation for all video copy:** say *"Founded in 1995. Pioneers of trenchless drilling in Nigeria since 2003."* — accurate on both counts and more impressive. Please confirm you're happy with this framing.

---

## 1. FINAL CREATIVE DIRECTION

**Positioning (the one idea):** Enikkom delivers the crossings the conventional pipeline can't make — under Nigeria's rivers, swamps and roads — with indigenous engineering trusted by the majors.

**Recommended theme line (pick one — used as the closing statement, not a borrowed SLB line):**
1. ⭐ *"Where the pipeline can't be trenched, we go beneath."* — **(Recommended.** Owns the HDD/trenchless differentiator outright.)
2. *"Critical crossings. Delivered."*
3. *"Beneath every crossing, Nigerian engineering."*

**Look & feel (from the SLB reference — principles only):**
- **Grade:** desaturated midtones, deep navy shadows, warm amber work-light accents. Teal/orange separation. Matches the site's existing navy + steel-blue design language (`--enk-navy`, `--enk-blue`).
- **Pace:** slow and deliberate. Each shot lives 3–6 seconds. No fast cutting. Confidence = stillness.
- **Motion:** slow drone pushes, gentle parallax, controlled tilts. Never frantic.
- **Type:** clean geometric sans, white on dark, wide tracking, minimal words per card.
- **Emotional arc:** Scale (hostile terrain) → People (Nigerian expertise) → Process (technical mastery) → Craft (fire & steel) → Proof (delivered) → Identity (since 1995).

**Authenticity rule (my strongest recommendation):**
The backbone of both videos must be the **real field photography** (`pl-*`, `rg-*`, `op-*`, `cinematic_hero`, `hero_river_crossing`). These are Enikkom's genuine edge — no stock library has Niger Delta HDD at night. AI-generated/enhanced frames (`about-*-enhanced.png`, `hse-safety.jpg`, `dredging-hero.jpg`) are used **only as accents or B-roll**, never as the emotional anchor. ChatGPT generation is reserved strictly for genuine gaps (digital/office, logo background, transition/title frames). This keeps the film honest and on-brand.

---

## 2. MAIN COMPANY VIDEO STRUCTURE (target 75–90s, 16:9, music + VO)

| Act | Time | Beat | Anchor assets |
|---|---|---|---|
| **Cold open** | 0:00–0:06 | Black → night HDD site fades up. Single line of type. | `cinematic_hero.jpg` |
| **Act 1 — Territory** | 0:06–0:20 | The terrain that defeats conventional methods: rivers, swamps, dawn corridors. | `hdd-night-panorama`, `hero_river_crossing`, `lekki-gas-pipeline`, `about-aerial-site-enhanced` |
| **Act 2 — The team** | 0:20–0:38 | The people. Nigerian engineers and crews. Pride, authority. | `pl-05`, `pl-06`, `about-safety-briefing-enhanced`, `rg-046`, `rg-071` |
| **Act 3 — Process** | 0:38–0:58 | Trenchless mastery: rig, drill string, microtunneling, control. | `hero_river_crossing`, `rg-066`, `rg-025`, `rg-037`, `op-01` |
| **Act 4 — Craft** | 0:58–1:12 | Fire and steel: welding, grinding, pipe at scale. | `pl-21`, `pl-18`, `pl-10`, `about-pipe-yard-enhanced`, `pl-03` |
| **Act 5 — Proof** | 1:12–1:24 | Delivered infrastructure + the numbers (100+ km, 500+, zero-LTI, since 2003). | `home-facilities-wellhead`, `atlas-cove-mosimi`, `rg-131` |
| **Close** | 1:24–1:30 | Theme line → logo reveal → CTA (enikkom.com). | logo animation + `enikkom-logo-white-trimmed` |

## 3. WEBSITE HERO VIDEO STRUCTURE (12–18s, 16:9, **muted, seamless loop**)

No VO, no on-screen text (the page renders the headline over it). Must loop invisibly and read well under the left-dark scrim already built in `HomeHero.tsx`.

| Time | Shot | Source clip |
|---|---|---|
| 0:00–0:05 | Slow drone push over night HDD site (the signature frame) | `hero-01` from `cinematic_hero.jpg` |
| 0:05–0:10 | River-crossing rig, slow push-in | `hero-02` from `hero_river_crossing.jpg` |
| 0:10–0:15 | Crane + pipe tilt-up against sky (bright counterpoint) | `hero-03` from `pl-10.jpg` |
| (loop) | Last frame graded to match first frame for seamless cut | — |

> **Recommendation:** keep the hero loop to **3 clips / ~15s**. Longer loops increase file size and hurt LCP/mobile. We'll ship MP4 + WebM + poster.

---

## 4. BEST ASSETS SELECTED PER PART
See §2 and §3 above. Master select-list (deduplicated, production set):

**Tier 1 — must appear (10):** `cinematic_hero`, `hero_river_crossing`, `hdd-night-panorama`, `pl-05`, `pl-06`, `pl-21`, `pl-10`, `pl-18`, `rg-066`, `about-safety-briefing-enhanced`
**Tier 2 — strong support (10):** `about-aerial-site-enhanced`, `lekki-gas-pipeline`, `rg-046`, `rg-071`, `rg-025`, `rg-037`, `op-01`, `pl-03`, `about-pipe-yard-enhanced`, `home-facilities-wellhead`
**Tier 3 — accents / social (6):** `pl-07`, `pl-19`, `pl-20`, `rg-131`, `op-03`, `atlas-cove-mosimi`

## 5. MISSING ASSETS NEEDED (→ Stage 2, ChatGPT)
1. **Digital / planning bridge** — engineer(s) at a project dashboard / control room (library has zero; needed to show EPCI brain, not just field muscle).
2. **Logo close background** — clean dark navy engineered-texture plate for the end-card logo reveal.
3. **Title/transition plate(s)** — dark cinematic background(s) for theme line and act titles.
4. **16:9 hero poster frame** — finished, graded still for `poster=` (likely a clean export of `cinematic_hero`, but may need extension to true 16:9).
5. **Mobile portrait fallback frame** — 9:16 safe-crop poster for small screens.
6. *(Optional)* **Map/data overlay plate** — Nigeria/Niger-Delta map motif for the "proof/coverage" beat.

## 6. ASSETS THAT NEED CLEANING (→ Stage 3)
- `cinematic_hero.jpg` — crop letterbox bars to true 16:9; light sharpen.
- `hdd-night-panorama.jpg` — remove top/bottom white border; extend to clean 16:9.
- `pl-10.jpg` — already strong; minor sky contrast lift only.
- `welding-crew.jpg` (mislabeled aerial) — rename + light grade; candidate for extension.
- `rg-122/126/128.jpeg`, `op-05/07` — upscale (lower-res / portrait) before any 16:9 use.
- `lekki-gas-pipeline.jpg` — overcast sky; contrast boost.

## 7. ASSETS NEEDING CHATGPT GENERATION OR EXTENSION
- **Generate new:** items 1–3 and 6 in §5 (digital/office, logo bg, title plates, map plate).
- **Extend existing:** `cinematic_hero` and `hdd-night-panorama` to true 16:9 if Veo needs full-frame input; portrait shots (`pl-05`, `pl-06`, `pl-09`) extended to 16:9 **only if** used full-bleed (otherwise keep portrait for social).

## 8. ASSETS THAT GO INTO VEO FIRST (priority order)
Website hero is the urgent deliverable, so Veo round 1 = the 3 hero clips:
1. `cinematic_hero.jpg` → `hero-01-cinematic-hdd-site.mp4`
2. `hero_river_crossing.jpg` → `hero-02-river-crossing.mp4`
3. `pl-10.jpg` → `hero-03-crane-pipe.mp4`
Veo round 2 = main-film clips (`pl-05`, `pl-06`, `pl-21`, `pl-18`, `rg-066`, `rg-025`, `op-01`, etc.) — full pack in Stage 4.

## 9. EXPECTED FINAL DELIVERABLES
| Deliverable | Spec | Folder |
|---|---|---|
| Main corporate film | 75–90s, 1080p (or 4K master), H.264 MP4 | `public/video-production/final/` |
| Website hero — MP4 | 12–18s, 1080p, muted, H.264, optimized | `public/video-production/final/` |
| Website hero — WebM | same, VP9 | `public/video-production/final/` |
| Hero poster | 16:9 JPG + 9:16 mobile JPG | `public/video-production/posters/` |
| LinkedIn cut | ~30s, 16:9 / 1:1 | `public/video-production/final/` |
| Instagram Reel / TikTok | ~15s, 9:16 | `public/video-production/final/` |
| YouTube Short | ≤60s, 9:16 | `public/video-production/final/` |

## 10. STEP-BY-STEP PRODUCTION ROADMAP
1. **Stage 1 ✅** — folders + this master plan. *(awaiting your sign-off)*
2. **Stage 2** — `04-chatgpt-image-generation-requests.md` → you generate missing images in ChatGPT.
3. **Stage 3** — `05-image-cleanup-requests.md` → you clean/extend flagged frames.
4. **Stage 4** — `06-veo-3-1-prompt-pack.md` → you generate Veo clips (hero first).
5. **Stage 5** — `07-veo-clip-review.md` → we rate clips, regenerate failures.
6. **Stage 6** — `08-final-script-and-edl.md` → VO script + edit decision list.
7. **Stage 7** — `09-capcut-editing-guide.md` → you edit in CapCut Pro.
8. **Stage 8** — `10-export-checklist.md` → export all formats.
9. **Stage 9** — `11-website-implementation-plan.md` → I wire the hero in (only on your word).
10. **Stage 10** — `12-social-media-cutdown-plan.md` → social cutdowns.

---

### Decisions I need from you before Stage 2
1. **Theme line** — approve option 1 *("Where the pipeline can't be trenched, we go beneath.")* or pick another.
2. **Date framing** — approve *"Founded 1995 · HDD pioneers since 2003."*
3. **Authenticity rule** — confirm we keep real photos as the backbone and use AI frames only for gaps.
4. **Scope** — produce **both** the website hero loop and the full 75–90s film, or do the **website hero first** and the film after? *(I recommend hero first — fastest visible win.)*
