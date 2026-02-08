

# Website Text Readability Audit
## Comprehensive Review of All Text Elements

---

## Executive Summary

After analyzing all major components, I've identified **8 locations** where text overlays images or dark backgrounds that need text shadow enhancement for consistent WCAG AAA readability. The ImageSliderHero fix was a good start - this plan extends that fix to all other affected components.

---

## Components Requiring Text Shadow Enhancement

### 1. Hero.tsx (Standard Hero Component)
**Location:** `src/components/sections/Hero.tsx`
**Issue:** Title and subtitle appear over background images without text shadows
**Lines affected:** 93-100 (h1), 103-110 (subtitle)
**Current state:** No text shadow on white text
**Fix:** Add matching text shadow style used in ImageSliderHero

### 2. VideoHero.tsx (Video Background Hero)
**Location:** `src/components/sections/VideoHero.tsx`  
**Issue:** Title and subtitle over video background without text shadows
**Lines affected:** 105-107 (h1), 110-112 (subtitle)
**Current state:** No text shadow on white text
**Fix:** Add text shadow consistent with ImageSliderHero

### 3. CTABand.tsx (Dark CTA Section)
**Location:** `src/components/sections/CTABand.tsx`
**Issue:** White text on dark charcoal background - already solid but light muted text could use slight shadow for polish
**Lines affected:** 46-48 (headline), 49-51 (subhead)
**Current state:** No text shadow
**Fix:** Add subtle text shadow to headline for consistency

### 4. TrustStrip.tsx (Hero Stats Overlay)
**Location:** `src/components/sections/TrustStrip.tsx`
**Issue:** White stats appearing over hero images need text protection
**Lines affected:** 27-30 (stat value), 31-33 (stat label)
**Current state:** Glassmorphism container but no text shadow backup
**Fix:** Add subtle text shadow to stat values

### 5. KPIStatsBand.tsx & AnimatedKPIBand.tsx (Stats on Dark)
**Location:** `src/components/sections/AnimatedKPIBand.tsx`
**Issue:** Large white numbers on dark background - currently good but could benefit from subtle shadow
**Status:** LOW PRIORITY - solid dark background provides sufficient contrast
**Fix:** Optional - add very subtle shadow for "premium" effect

### 6. InteractiveProjectMap.tsx (Map Overlay Elements)
**Location:** `src/components/sections/InteractiveProjectMap.tsx`
**Issue:** White text in modals over map imagery
**Lines affected:** ~860+ (modal text on dark overlays)
**Status:** MEDIUM PRIORITY - modal has dark background but badge text on map could use shadow

### 7. CaseStudyCard.tsx (Image Overlay Badge)
**Location:** `src/components/sections/CaseStudyCard.tsx`  
**Issue:** Badge text over image - currently has dark background (0.88 opacity)
**Status:** LOW PRIORITY - already well-handled with dark badge background

### 8. CapabilityCard.tsx (Metric Badge)
**Location:** `src/components/sections/CapabilityCard.tsx`
**Issue:** Metric badge over image thumbnail
**Status:** LOW PRIORITY - using solid `bg-primary` which provides good contrast

---

## Priority Implementation Matrix

| Component | Priority | Current State | Risk Level |
|-----------|----------|---------------|------------|
| **Hero.tsx** | HIGH | No text shadow | Images vary in brightness |
| **VideoHero.tsx** | HIGH | No text shadow | Video frames vary in brightness |
| **TrustStrip.tsx** | MEDIUM | Glassmorphism only | Appears over changing hero slides |
| **CTABand.tsx** | LOW | Solid dark background | Already good contrast |
| **AnimatedKPIBand.tsx** | LOW | Solid dark background | Already good contrast |
| **CaseStudyCard.tsx** | LOW | Dark badge bg | Already handled |
| **CapabilityCard.tsx** | LOW | Solid primary bg | Already handled |

---

## Implementation Plan

### Phase 1: Critical Hero Components

**File: `src/components/sections/Hero.tsx`**
Add text shadow to h1 (line 93-100):
```tsx
<motion.h1 
  className="text-white mb-5"
  style={{ textShadow: '0 2px 12px rgba(0, 0, 0, 0.4)' }}
  ...
>
```

Add text shadow to subtitle (line 102-110):
```tsx
<motion.p 
  className="text-[16px] md:text-[17px] lg:text-[18px] text-white/75 mb-8 leading-[1.65] max-w-xl"
  style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }}
  ...
>
```

**File: `src/components/sections/VideoHero.tsx`**
Add text shadow to h1 (line 105):
```tsx
<h1 
  className="text-white font-heading mb-6"
  style={{ textShadow: '0 2px 12px rgba(0, 0, 0, 0.4)' }}
>
```

Add text shadow to subtitle (line 110):
```tsx
<p 
  className="text-[17px] md:text-[19px] text-white/75 mb-8 leading-[1.6] max-w-xl"
  style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }}
>
```

### Phase 2: Trust Elements

**File: `src/components/sections/TrustStrip.tsx`**
Add text shadow to stat values (line 27):
```tsx
<div 
  className="text-[20px] md:text-[24px] font-bold text-white font-heading leading-none"
  style={{ textShadow: '0 1px 6px rgba(0, 0, 0, 0.35)' }}
>
```

Add subtle shadow to stat labels (line 31):
```tsx
<div 
  className="text-[11px] md:text-[12px] text-white/50 mt-1 leading-tight font-medium"
  style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.25)' }}
>
```

### Phase 3: Polish CTABand (Optional)

**File: `src/components/sections/CTABand.tsx`**
Add subtle shadow to headline (line 46):
```tsx
<h2 
  className="text-white text-[24px] md:text-[28px] lg:text-[32px] font-bold mb-4 leading-tight"
  style={{ textShadow: '0 1px 8px rgba(0, 0, 0, 0.25)' }}
>
```

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/sections/Hero.tsx` | Add textShadow to h1 and p elements |
| `src/components/sections/VideoHero.tsx` | Add textShadow to h1 and p elements |
| `src/components/sections/TrustStrip.tsx` | Add textShadow to stat value and label divs |
| `src/components/sections/CTABand.tsx` | Add subtle textShadow to headline (optional polish) |

---

## Text Shadow Standards (Consistency)

To maintain design consistency across the site, use these standard shadow values:

| Element Type | Text Shadow Value |
|--------------|-------------------|
| Hero H1 / Large Titles | `0 2px 12px rgba(0, 0, 0, 0.4)` |
| Hero Subtitles / Body | `0 2px 8px rgba(0, 0, 0, 0.3)` |
| Stats / KPI Values | `0 1px 6px rgba(0, 0, 0, 0.35)` |
| Labels / Small Text | `0 1px 4px rgba(0, 0, 0, 0.25)` |
| Dark Section Headlines | `0 1px 8px rgba(0, 0, 0, 0.25)` |

---

## Expected Outcome

After implementing these changes:
- All white text over images/videos will have consistent protection
- Text remains readable across all hero slides and video frames
- TrustStrip stats maintain visibility on varying backgrounds
- Overall visual polish improved with subtle depth effect
- WCAG AAA contrast compliance improved across all hero sections

