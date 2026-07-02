# 05 — Image Cleanup Requests
## Enikkom Construction Limited · Video Production
**Date:** 2026-06-29 | **Stage 3 deliverable** | **Scope: website hero frames first**

These are the prepped inputs for Veo. Goal: each hero frame becomes a clean **1920×1080 (16:9)** image that Veo can animate at full fidelity. Cleaned files go to `public/video-production/source-images/`. Originals already staged there with `-ORIGINAL` suffix; `src/` originals untouched.

---

## ⭐ MY STRONGEST RECOMMENDATION (read first) — preserve authenticity when upscaling

`cinematic_hero.jpg` is only **960×540**. To use it as a crisp 1080p hero, it must be enlarged. **Do NOT use ChatGPT to "enhance/upscale" a real night photo** — ChatGPT re-draws the image and will invent fake machinery, fake lights and fake people, which breaks our authenticity rule and can look uncanny.

**Use a true AI upscaler that preserves the real pixels:**
- **Upscayl** — free, open-source, offline, one-click. Download: upscayl.org. Model: **"Upscayl Standard / Real-ESRGAN"**, scale ×2 or ×4, then resize to 1920×1080. *(This is the better idea — I recommend it over ChatGPT for all three real photos.)*
- Alternatives: Topaz Photo AI (paid), or `waifu2x` web (free).

ChatGPT prompts are still provided below **as a fallback only** if you have no upscaler available. If you use the fallback, regenerate until no fake objects/text appear.

---

## CLEANUP 1 — `cinematic_hero.jpg` (the signature hero frame) — **DO THIS FIRST**

- **Original:** `src/assets/images/projects/cinematic_hero.jpg` (staged: `public/video-production/source-images/hero-01-cinematic-hdd-site-ORIGINAL.jpg`)
- **Current:** 960×540, already 16:9. Night HDD site, flood-lit cranes + CAT machines + blue containers.
- **Issue to fix:** Resolution too low (0.5 MP) for a crisp 1080p hero. Slight night-grain/softness.
- **Fix:** True-upscale to **1920×1080** (×2). Mild denoise. Do **not** alter content, colours, lights, or add anything.
- **Target aspect ratio:** 16:9 (1920×1080)
- **Recommended (Upscayl):** Open in Upscayl → Real-ESRGAN → ×2 → export → if not exactly 1920×1080, resize to fit. No content changes.
- **ChatGPT fallback prompt (only if no upscaler):**
  ```
  Upscale and lightly denoise this exact photograph to higher resolution. Keep every element identical — the same night construction site, the same cranes, excavators, blue containers, flood lights, people and layout. Do not add, remove, move, or invent anything. Do not change colours or lighting. Output a sharper, cleaner version of the same image, 16:9.
  ```
- **Save as:** `public/video-production/source-images/hero-01-cinematic-hdd-site.png`

---

## CLEANUP 2 — `hero_river_crossing.jpg`

- **Original:** `src/assets/images/projects/hero_river_crossing.jpg` (staged: `...hero-02-river-crossing-ORIGINAL.jpg`)
- **Current:** 1280×720, already 16:9. HDD rig on river bank, dredger behind, pipe sections foreground.
- **Issue to fix:** 720p — acceptable but upscaling to 1080p gives Veo more to work with. Otherwise clean.
- **Fix:** True-upscale to **1920×1080** (×1.5). No content changes. (Optional light grade happens later in CapCut, not here.)
- **Target aspect ratio:** 16:9 (1920×1080)
- **Recommended (Upscayl):** Real-ESRGAN ×2 → resize to 1920×1080.
- **ChatGPT fallback prompt:**
  ```
  Upscale this exact photograph to higher resolution, keeping every element identical — same HDD drilling rig, same dredger vessel, same pipe sections, same river, same overcast sky, same people. Do not add or remove anything. Do not change colours. Output a sharper version of the same image, 16:9.
  ```
- **Save as:** `public/video-production/source-images/hero-02-river-crossing.png`

---

## CLEANUP 3 — `pl-10.jpg` (red crane + pipe + blue sky)

- **Original:** `src/assets/images/selected/general/pl-10.jpg` (staged: `...hero-03-crane-pipe-ORIGINAL.jpg`)
- **Current:** 2400×1600, high-res, **3:2** (needs 16:9 crop). Tall red crane, vivid blue sky, large pipe foreground.
- **Issue to fix:** Aspect ratio only. Already sharp and high-res — **no upscale needed**.
- **Fix:** Crop to **16:9** by trimming foreground at the **bottom** (keep the full crane and sky for a tilt-up move). Target crop: keep top, remove ~250px from the bottom dirt → 2400×1350, then it's a clean 16:9. Keep the crane tip with headroom.
- **Target aspect ratio:** 16:9 (2400×1350, or resize to 1920×1080)
- **Recommended:** Any basic editor (Photos, Preview, Paint, Photopea, or CapCut's crop) — set crop ratio to 16:9, anchor to the top so the crane and sky stay, trim the bottom foreground. No AI needed.
- **ChatGPT fallback prompt (only if needed):**
  ```
  Reframe this exact photograph to a 16:9 aspect ratio by keeping the full red crane and the blue sky at the top and trimming the empty dirt foreground at the bottom. Keep the crane, the large pipe, and the sky exactly as they are. Do not add, remove, or invent anything. 16:9.
  ```
- **Save as:** `public/video-production/source-images/hero-03-crane-pipe.png`

---

## ORDER TO CLEAN
1. **`cinematic_hero.jpg`** → `hero-01-cinematic-hdd-site.png` (most important; lowest res; biggest payoff)
2. **`hero_river_crossing.jpg`** → `hero-02-river-crossing.png`
3. **`pl-10.jpg`** → `hero-03-crane-pipe.png` (just a crop)

All three saved into: **`public/video-production/source-images/`**

---

## FILM FRAMES (defer — not needed for the hero)
Handle these in a later cleanup pass once the hero ships:
- `hdd-night-panorama.jpg` (1131×1600, portrait with white borders) — crop the panorama strip out of the borders, then extend or letterbox to 16:9.
- `welding-crew.jpg` (mislabeled aerial) — rename + light grade.
- `rg-122 / rg-126 / rg-128.jpeg`, `op-05 / op-07` — upscale before any 16:9 use.
- Portrait worker shots `pl-05 / pl-06 / pl-09` — keep portrait for social; extend to 16:9 only if used full-bleed in the film.
