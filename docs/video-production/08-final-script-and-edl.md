# 08 — Final Script & Edit Decision List (EDL)
## Enikkom Construction Limited · Website Hero Loop
**Date:** 2026-06-29 | **Stage 6 deliverable**

This is the exact assembly order for the **15–20s muted website hero loop**.
No voiceover. No on-screen text (the website renders the headline over the video).
Goal: seamless, slow, cinematic loop that reads well under the left-dark scrim.

---

## HERO LOOP — TIMELINE (target ~18s)

| # | Clip file | Use segment | Duration | Transition |
|---|---|---|---|---|
| 1 | `hero-01-cinematic-hdd-site.mp4` | 1s → 6s (trim first second if camera hasn't started moving yet) | ~5s | Cut to black (2f) |
| 2 | `hero-02-river-crossing.mp4` | 1s → 6s | ~5s | Cut to black (2f) |
| 3 | `hero-03-crane-pipe.mp4` | 1s → 6s | ~5s | Cut to black (2f) |
| 4 | `hero-04-night-piling.mp4` | 1s → 5s | ~4s | Fade to black (8f) → loop back to clip 1 |

**Total runtime: ~19s** — acceptable. Trim each clip by 1s if you want to hit 16s.

### Why cut to black between clips?
A brief 2-frame black dip (not a dissolve) is the SLB-style premium cut. It resets the eye between shots without a distracting wipe or cross-dissolve. The hero scrim on the website is dark so the dip reads as intentional breathing room, not a glitch.

---

## COLOUR GRADE NOTES (apply in CapCut)

### Global grade (apply to ALL clips)
- **Shadows:** pull down slightly (crush blacks toward deep navy — matches `--enk-navy`)
- **Highlights:** pull down slightly (avoid blown-out lights)
- **Saturation:** reduce by ~10–15% (desaturate midtones for the premium industrial look)
- **Colour temperature:** very slight cool shift (blue/teal bias — steel-blue palette)
- **Contrast:** +10 (snap the image)

### Per-clip adjustments
| Clip | Adjustment |
|---|---|
| hero-01 (night) | Bring up **shadows** slightly so the blue containers read — don't let the pit go pure black |
| hero-02 (day) | Slight **teal push** on shadows to match the night clips' colour family |
| hero-03 (bright day) | Reduce **highlights** more aggressively — the blue sky should not blow out |
| hero-04 (night) | Match hero-01 exactly — same shadow depth, same light colour temperature |

### Goal: clips 01 and 04 should feel like the same night. Clips 02 and 03 should feel like a different time of day but the same film.

---

## AUDIO
**None.** The hero loop is muted on the website (`muted` attribute in the `<video>` tag).
Do NOT add music to the exported file — it adds file size for zero benefit.

---

## POSTER FRAME
Export a single still from **hero-01** at ~2s (the camera has started moving, the scene is fully lit).
- Format: JPG, quality 90
- Size: 1920×1080
- Save as: `public/video-production/posters/hero-poster.jpg`
- This is used as the `poster=` attribute in `HomeHero.tsx` — shown before the video loads and on devices that block autoplay.

---

## EXPORT SPECS

### Primary — MP4 (H.264)
| Setting | Value |
|---|---|
| Resolution | 1920×1080 |
| Frame rate | 24fps |
| Codec | H.264 |
| Bitrate | 4–6 Mbps (VBR) |
| Audio | None / muted |
| Filename | `hero-loop.mp4` |
| Save to | `public/video-production/final/` |

### Secondary — WebM (VP9) — optional but recommended
| Setting | Value |
|---|---|
| Resolution | 1920×1080 |
| Codec | VP9 |
| Quality | CRF 33 |
| Audio | None |
| Filename | `hero-loop.webm` |
| Save to | `public/video-production/final/` |

> WebM is ~30% smaller than MP4 at the same quality. Modern browsers prefer it. If CapCut can't export WebM, use HandBrake or FFmpeg after export (instructions in Stage 8).

### File size targets
| File | Target | Maximum |
|---|---|---|
| hero-loop.mp4 | under 8 MB | 12 MB |
| hero-loop.webm | under 6 MB | 9 MB |
| hero-poster.jpg | under 300 KB | 500 KB |

---

## LOOP SEAMLESSNESS CHECK
Before final export, scrub the timeline so the **last frame of clip 04** is visible next to the **first frame of clip 01**. Both are night scenes — check:
- Similar brightness level (neither significantly brighter)
- Similar colour temperature
- The 8-frame fade to black on clip 04's end makes the cut invisible on loop

If the loop feels jarring, add a 4-frame black slug between clip 04 and clip 01 on the timeline.

---

## AFTER EXPORT
Save `hero-loop.mp4` (and `hero-loop.webm` if produced) into `public/video-production/final/` and tell me **"export done"**.

I will then write:
- **Stage 7** — `09-capcut-editing-guide.md` (step-by-step CapCut assembly with exact button locations)
- **Stage 8** — `10-export-checklist.md`
- **Stage 9** — `11-website-implementation-plan.md` — wire the video into the live website
