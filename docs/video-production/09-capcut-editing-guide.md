# 09 — CapCut Pro Editing Guide
## Enikkom Construction Limited · Website Hero Loop
**Date:** 2026-06-29 | **Stage 7 deliverable**

Step-by-step assembly of the 4 Veo clips into the finished hero loop in CapCut Pro.

---

## STEP 1 — Project setup

1. Open CapCut Pro → **New Project**
2. Select ratio: **16:9**
3. Set frame rate: **24fps**
4. Name the project: `Enikkom-Hero-Loop`

---

## STEP 2 — Import clips

1. Click **Import** (top left)
2. Navigate to: `public\video-production\veo-clips\`
3. Select all 4 clips and import:
   - `hero-01-cinematic-hdd-site.mp4`
   - `hero-02-river-crossing.mp4`
   - `hero-03-crane-pipe.mp4`
   - `hero-04-night-piling.mp4`

---

## STEP 3 — Build the timeline

Drag clips onto the timeline **in this order:**

```
[hero-01] → [hero-02] → [hero-03] → [hero-04]
```

---

## STEP 4 — Trim each clip

For each clip, keep only the **cleanest 4–5 seconds** of motion:
- Trim the **first ~1 second** (camera hasn't started moving yet)
- Trim the **last ~1 second** (motion may stutter at the end)
- Target: each clip = **~5s** on the timeline

To trim: click the clip → drag the left/right edge inward.

---

## STEP 5 — Add transitions

Between each clip, add a **2-frame black dip** (not a dissolve):

1. Click the **transition icon** between clip 1 and clip 2
2. Select **"Dip to Black"** (or "Fade to Black")
3. Set duration to **2 frames** (the shortest available)
4. Repeat between clips 2→3 and 3→4

For the **end of clip 4** (the loop point):
- Set transition to **"Fade to Black"**
- Duration: **8 frames**
- This makes the loop restart invisible on the website

---

## STEP 6 — Colour grade

Select **all clips** (Ctrl+A on the timeline) and apply a global adjustment:

| Setting | Value |
|---|---|
| Brightness | -5 |
| Contrast | +10 |
| Saturation | -12 |
| Shadow | -8 (crush blacks) |
| Highlight | -10 (pull down blown lights) |
| Color temp | -8 (cool/blue shift) |

Then fine-tune **per clip** (click individual clip → Adjust):

| Clip | Extra adjustment |
|---|---|
| hero-01 (night) | Shadow +5 (lift pit so blue containers read) |
| hero-02 (day) | Tint +5 toward teal/green (match night clips' cool family) |
| hero-03 (bright sky) | Highlight -15 extra (prevent sky blow-out) |
| hero-04 (night) | Match hero-01 exactly — compare side by side |

---

## STEP 7 — Check the loop point

1. Scrub to the **last frame of clip 04**
2. Note the brightness/colour
3. Scrub to the **first frame of clip 01**
4. They should be similar in brightness (both night scenes)
5. If clip 04 is noticeably brighter or warmer than clip 01 → add a slight brightness/temp correction to clip 04 to match

---

## STEP 8 — Export poster frame

Before exporting the video:
1. Scrub to **clip 01 at ~2 seconds** (camera moving, scene fully lit)
2. Click **Export frame** (or screenshot the preview at full resolution)
3. Save as: `public\video-production\posters\hero-poster.jpg`
4. Quality: 90%, 1920×1080

---

## STEP 9 — Export the video

Click **Export** (top right):

| Setting | Value |
|---|---|
| Resolution | 1080p (1920×1080) |
| Frame rate | 24fps |
| Format | MP4 |
| Codec | H.264 |
| Quality | High (or set bitrate to 5 Mbps) |
| Audio | **Mute / No audio** |

- Save as: `hero-loop.mp4`
- Save to: `public\video-production\final\`

**Check file size after export.** Target: under 8 MB. If over 12 MB, re-export at Medium quality or 4 Mbps.

---

## STEP 10 — Optional WebM conversion (recommended)

If you have HandBrake installed:
1. Open HandBrake → drag in `hero-loop.mp4`
2. Preset: **VP9 MKV 1080p** (or set manually: VP9, CRF 33, no audio)
3. Change output extension to `.webm`
4. Save as: `hero-loop.webm` → `public\video-production\final\`

If you don't have HandBrake, skip this — the MP4 alone is fine for launch.

---

## DONE

Once `hero-loop.mp4` is saved in `public\video-production\final\`, tell me **"export done"**.

I will then wire the video into the live website (`HomeHero.tsx`) — the code is already built and waiting for this file.
