# 12 — CapCut Assembly Guide: 1:30 Corporate Film
## Enikkom Construction Limited
**Date:** 2026-06-30 | **Stage 7B deliverable**

---

## STEP 1 — New Project
1. Open CapCut Pro → **New Project**
2. Ratio: **16:9**
3. Frame rate: **24fps**
4. Name: `Enikkom-Corporate-Film`

---

## STEP 2 — Import All Clips
Import from `public\video-production\veo-clips\film\` + hero clips:

**Film clips (in order):**
1. `film-01-aerial-site.mp4`
2. `film-02-river-pipeline.mp4`
3. `film-03-worker-portrait-a.mp4`
4. `film-04-worker-portrait-b.mp4`
5. `film-05-safety-briefing.mp4`
6. `film-06-microtunnel-rig.mp4`
7. `film-07-drill-operation.mp4`
8. `film-08-welding-sparks.mp4`
9. `film-09-pipe-yard.mp4`
10. `film-10-completed-infra.mp4`

**Hero clips (reused in film):**
- `hero-01-cinematic-hdd-site.mp4`
- `hero-02-river-crossing.mp4`
- `hero-03-crane-pipe.mp4`
- `hero-04-night-piling.mp4`
- `hero-05-ppe-workers.mp4`

**Existing video:**
- `src\assets\videos\hdd-operations-hero.mp4` (use as Act 3 B-roll)

---

## STEP 3 — Build the Timeline

Drag clips onto the timeline in this exact order:

| Track position | Clip | Trim to | Cumulative time |
|---|---|---|---|
| 1 | `hero-01` (night HDD) | 1s–5s | 0:00–0:05 |
| 2 | `film-01` (aerial site) | 1s–6s | 0:05–0:10 |
| 3 | `hero-02` (river crossing) | 1s–6s | 0:10–0:15 |
| 4 | `film-02` (river pipeline) | 1s–5s | 0:15–0:19 |
| 5 | `film-03` (worker portrait A) | 1s–5s | 0:19–0:23 |
| 6 | `film-04` (worker portrait B) | 1s–5s | 0:23–0:27 |
| 7 | `film-05` (safety briefing) | 1s–6s | 0:27–0:32 |
| 8 | `hero-05` (PPE workers) | 1s–5s | 0:32–0:36 |
| 9 | `film-06` (microtunnel rig) | 1s–6s | 0:36–0:41 |
| 10 | `hdd-operations-hero.mp4` | 0s–5s | 0:41–0:46 |
| 11 | `film-07` (drill operation) | 1s–6s | 0:46–0:51 |
| 12 | `hero-02` (river — reuse) | 2s–6s | 0:51–0:55 |
| 13 | `film-08` (welding sparks) | 1s–6s | 0:55–1:00 |
| 14 | `film-09` (pipe yard) | 1s–6s | 1:00–1:05 |
| 15 | `hero-03` (red crane) | 1s–5s | 1:05–1:09 |
| 16 | `hero-05` (PPE — reuse) | 2s–5s | 1:09–1:12 |
| 17 | `film-10` (completed infra) | 1s–6s | 1:12–1:17 |
| 18 | `hero-04` (night piling) | 1s–5s | 1:17–1:21 |
| 19 | `hero-01` (night HDD — reuse) | 1s–5s | 1:21–1:25 |
| 20 | Black slug | 5s | 1:25–1:30 |

**Total: ~1:30**

---

## STEP 4 — Transitions
- Between every clip: **2-frame Dip to Black**
- Before the final black slug (position 20): **8-frame Fade to Black**

---

## STEP 5 — Title Cards (Text Layer)

Add text on a **separate text track** above the video:

| Time | Text | Style |
|---|---|---|
| 0:00–0:05 | `Nigeria. Where the pipeline meets the river.` | White, centre, large, fade in/out |
| 0:19–0:27 | *(no text — let the faces speak)* | — |
| 1:25–1:30 | `ENIKKOM CONSTRUCTION LIMITED` | White, centre, bold |
| 1:27–1:30 | `enikkom.com` | White, centre, smaller, below logo |

Font: any clean geometric sans (Montserrat, Inter, or CapCut's "Classic")
Tracking: wide (letter spacing +3 to +5)
Animation: simple fade in (0.3s) and fade out (0.3s)

---

## STEP 6 — Add Logo on End Card

On the black slug (1:25–1:30):
1. Import logo: `src\assets\images\team\00-site-logo-enikkom-construction-limited.png`
2. Place on a layer above the black slug
3. Centre it, scale to ~30% of frame width
4. Animate: **Fade in** over 0.5s at 1:25
5. Hold until 1:29, then **Fade out** 0.3s

---

## STEP 7 — Voiceover Track

1. Add **Audio Track 2**
2. Import your voiceover file (recorded or AI-generated from the script in `10-corporate-film-script-and-edl.md`)
3. Align the VO start to **0:06** (after the cold open title card)
4. VO ends at approximately **1:25** (before the logo close)
5. Volume: **100%**

**If you haven't recorded VO yet:**
- Go to ElevenLabs.io
- Paste the script from `docs/video-production/10-corporate-film-script-and-edl.md`
- Choose a deep, calm male voice (Daniel or Antoni)
- Download as MP3

---

## STEP 8 — Music Track

1. Add **Audio Track 3**
2. Import your music bed (from Artlist, Epidemic Sound, or Musicbed)
3. Set volume to **15%** under the VO sections
4. At **1:22** (logo reveal), raise music volume to **70%** and let it swell to the end
5. Fade music out at **1:30**

Search terms: *"cinematic documentary orchestral slow build"* or *"industrial corporate epic"*

---

## STEP 9 — Colour Grade

Select all video clips → Apply adjustment:

| Setting | Value |
|---|---|
| Contrast | +10 |
| Saturation | -12 |
| Shadows | -8 |
| Highlights | -10 |
| Colour temp | -8 (cool/blue shift) |

Per-clip fine-tuning:
- Night clips (hero-01, hero-04): Shadow +5 (lift blacks so equipment reads)
- Day clips (film-01, film-02, hero-02): Tint +3 toward teal
- Bright clip (hero-03 crane): Highlight -15 extra

---

## STEP 10 — Export

Click Export:

| Setting | Value |
|---|---|
| Resolution | 1920×1080 |
| Frame rate | 24fps |
| Format | MP4 |
| Codec | H.264 |
| Quality | High / 8 Mbps |
| Audio | Include (VO + music) |

Save as: `corporate-film-v1.mp4`
Save to: `public\video-production\final\`

---

## AFTER EXPORT

Tell me **"film exported"** and I will:
1. Wire the **website hero loop** into the live site (`HomeHero.tsx`)
2. Write the **social media cutdown plan** (30s LinkedIn, 15s Instagram Reel)
