# 06 — Veo 3.1 Prompt Pack
## Enikkom Construction Limited · Video Production
**Date:** 2026-06-29 | **Stage 4 deliverable** | **Round 1: website hero clips**

These are **image-to-video** prompts. In Veo 3.1, upload the source frame, paste the prompt, set the options listed, generate. The job of every clip is **subtle, slow, cinematic motion** on a real photo — Veo must NOT redraw the scene, invent people/machines, or distort faces and logos.

### Global Veo settings (apply to every hero clip)
| Setting | Value |
|---|---|
| Mode | Image-to-video (upload the source frame) |
| Model | Veo 3.1 (Quality, not Fast, if offered) |
| Aspect ratio | **16:9** |
| Resolution | **1080p** |
| Duration | **6–8 seconds** (we trim to ~4–5s in CapCut) |
| Audio | Not needed — the hero loop is muted. Ignore/disable generated audio. |
| Seed | Lock/save the seed of any clip you like, so you can regenerate variations |

### Global NEGATIVE prompt (paste into every clip's negative field)
```
distorted faces, deformed people, extra limbs, morphing machinery, warping metal,
melting structures, objects appearing or disappearing, duplicated equipment, text,
captions, watermark, logo, subtitles, cartoon, illustration, 3d render, video-game look,
oversaturated colors, neon, heavy dust, fake smoke, lens flare spam, fast motion,
camera shake, shaky cam, whip pan, zoom blur, jitter, flicker, strobing, low quality, blurry
```

---

## CLIP hero-01 — Cinematic night HDD site (the signature shot)
- **Source image:** `public/video-production/source-images/hero-01-cinematic-hdd-site.png`
- **Intended use:** Opening shot of the website hero loop AND the film's cold open.
- **Camera movement:** Very slow forward push-in with a faint downward tilt (a drone easing toward the lit pit). Almost imperceptible — confidence through stillness.
- **Visual mood:** Premium industrial night. Flood lights glow, deep navy shadows, calm and powerful.
- **Quality target:** Stable, photoreal, zero warping. Lights stay fixed; workers move only slightly/naturally.
- **Prompt:**
```
A cinematic, photorealistic night construction site. The camera performs an extremely slow,
smooth forward push-in with a faint downward tilt, like a high-end drone easing toward the
floodlit drilling pit. Keep the entire scene exactly as in the image — the same cranes,
excavators, blue containers, flood lights, drill rig and workers, all in their existing
positions. Only natural subtle motion: faint glow flicker from the work lights, gentle
movement of the workers, a thin drift of warm haze near the lamps. Deep cinematic night
grade, stable footage, premium and calm.
```
- **Output filename:** `hero-01-cinematic-hdd-site.mp4`  → save to `public/video-production/veo-clips/`
- **What makes it fail:** if the push-in is too fast, or Veo morphs the cranes/drill string, or invents new lights. **Regenerate** if any structure warps or a worker deforms.

---

## CLIP hero-02 — River crossing rig
- **Source image:** `public/video-production/source-images/hero-02-river-crossing.png`
- **Intended use:** Second shot of the hero loop; Act 1 (Territory) / Act 3 (Process) of the film.
- **Camera movement:** Slow push-in toward the rig with very slight parallax; the river shimmers and reeds sway gently; the dredger sits still on the water.
- **Visual mood:** Daylight, overcast, epic scale — man and machine against a wide river.
- **Quality target:** Water and reeds animate naturally; rig, crawler and people stay solid.
- **Prompt:**
```
A cinematic, photorealistic daytime scene of a directional-drilling rig on a wide river bank.
The camera performs a slow, smooth push-in toward the rig with a gentle parallax. Keep every
element exactly as in the image — the same blue rig, the dredger vessel on the water, the pipe
sections, the workers and the blue piles in the sand. Natural subtle motion only: the river
surface shimmers softly, the tall reeds sway gently in the wind, faint ripples around the
dredger, slight natural movement of the workers. Overcast cinematic grade, stable, premium.
```
- **Output filename:** `hero-02-river-crossing.mp4`  → `public/video-production/veo-clips/`
- **What makes it fail:** boat drifting unrealistically, rig mast bending, workers sliding. **Regenerate** if the rig or dredger warps.

---

## CLIP hero-03 — Red crane + pipe + sky (the bright counterpoint)
- **Source image:** `public/video-production/source-images/hero-03-crane-pipe.png`
- **Intended use:** Third shot of the hero loop (lifts brightness before the loop restart); Act 4 (Craft).
- **Camera movement:** Slow tilt UP the crane boom against a vivid blue sky; clouds drift slowly.
- **Visual mood:** Bright, optimistic, monumental — scale against open sky.
- **Quality target:** Clouds move; crane lattice stays perfectly rigid (lattice is where warping shows worst).
- **Prompt:**
```
A cinematic, photorealistic daytime shot of a tall red lattice crawler crane against a vivid
blue sky with white clouds. The camera performs a slow, smooth tilt upward along the crane boom.
Keep everything exactly as in the image — the same red crane, the large steel pipe, the other
machinery and the antenna mast. Natural subtle motion only: the clouds drift slowly across the
sky, a faint sway of the suspended hook, gentle heat-haze near the ground. Crisp, bright,
premium industrial grade. The crane structure stays perfectly solid and straight.
```
- **Output filename:** `hero-03-crane-pipe.mp4`  → `public/video-production/veo-clips/`
- **What makes it fail:** the crane lattice bending/rippling, clouds boiling too fast. **Regenerate** if the boom distorts.

---

## CLIP hero-04 — Wide night piling site (BONUS / alternate)
- **Source image:** `public/video-production/source-images/hero-04-night-piling.png`
- **Intended use:** Optional 4th hero shot or strong film B-roll (Act 1 night energy). *Use as atmospheric B-roll if this frame was AI-generated rather than a real ECL site.*
- **Camera movement:** Slow lateral dolly left-to-right (or gentle push-in) across the lit site.
- **Visual mood:** Clean cinematic night — cool blacks, bright work lights, 24/7 operations.
- **Quality target:** Light towers and machines rigid; workers move slightly; mud/water reflections shimmer.
- **Prompt:**
```
A cinematic, photorealistic night construction site under floodlights. The camera performs a
slow, smooth lateral move across the scene with a faint push-in. Keep every element exactly as
in the image — the same CAT excavator, drilling rigs, red crane, blue containers, rebar cage,
light towers and hi-vis workers, all in place. Natural subtle motion only: gentle worker
movement, soft flicker from the floodlights, faint shimmer on the wet ground. Deep cinematic
night grade, cool shadows, stable and premium.
```
- **Output filename:** `hero-04-night-piling.mp4`  → `public/video-production/veo-clips/`
- **What makes it fail:** excavator arm morphing, light towers bending, workers multiplying. **Regenerate** if structures warp.

---

## Generation order & tips
1. Generate **hero-01** first — it's the signature shot and the poster. Get it perfect.
2. Then **hero-02**, **hero-03**, and **hero-04**.
3. For each, **generate 2 variations** and keep the steadier one (Veo varies run to run). Save the seed of keepers.
4. Keep motion **slow** — if a clip feels even slightly fast or floaty, regenerate. Slow = premium.
5. All MP4s go into: **`public/video-production/veo-clips/`** with the exact filenames above.

> Veo 3.1 clips are ~6–8s; that's fine — we only need ~4–5s of the cleanest motion from each, trimmed in CapCut. Generating a little long gives us room to pick the best window.

### After generation
Save the clips into `public/video-production/veo-clips/`, then tell me **"clips ready"**. I'll do **Stage 5 — clip review** (a rating checklist for realism / stability / brand fit, and which to regenerate) before we move to the edit.
