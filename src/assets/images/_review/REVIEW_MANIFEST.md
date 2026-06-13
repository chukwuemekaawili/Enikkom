# Image Review Manifest

This folder is a holding area for preserved source files that should stay available for manual review, comparison, and editing.

Nothing here has been permanently deleted.

Full inventory:
[review-inventory.json](/c:/Users/defaultuser0/Desktop/Enikkom/enikkom-main/src/assets/images/_review/review-inventory.json)

## Confirmed Duplicates

Kept active:
- `logos/enikkom-logo-color.png`

Moved to review:
- `_review/duplicates/logos/enikkom-logo-light.png`

Reason:
- `enikkom-logo-color.png` and `enikkom-logo-light.png` are exact pixel duplicates.
- The app now resolves both logical logo paths through the kept active source, so runtime behavior stays intact.

## Alternate Versions Kept Active

These still have active page or CMS references, so they remain in the main folders for now:

- `projects/atlas-cove-mosimi.jpg`
- `projects/atlas-cove-mosimi-2.jpg`
- `capabilities/dredging-marine.jpg`
- `projects/dredging-marine.png`
- `projects/drilling-ops-4.jpg`
- `projects/drilling-ops-5.jpg`
- `projects/drilling-ops-6.jpg`
- `projects/drilling-ops-7.jpg`
- `projects/hdd-equipment-fleet.jpg`
- `projects/hdd-equipment-fleet-2.jpg`
- `projects/hdd-equipment-fleet-3.jpg`
- `projects/hdd-equipment-fleet-4.jpg`
- `projects/hdd-night-panorama.jpg`
- `projects/hdd-night-panorama-cropped.jpg`
- `capabilities/jetty-construction.jpg`
- `projects/jetty-construction.jpg`
- `projects/nipco-ibafo.jpg`
- `projects/nipco-ibafo-2.jpg`
- `projects/nipco-ibafo-3.jpg`
- `projects/otumara-escravos.jpg`
- `projects/otumara-escravos-2.jpg`
- `projects/partnership-hddthailand.jpg`
- `projects/partnership-hddthailand-2.jpg`
- `capabilities/pipeline-construction.jpg`
- `projects/pipeline-construction.jpg`
- `projects/scope-operations.jpg`
- `projects/scope-operations-2.jpg`
- `projects/scope-operations-3.jpg`
- `projects/shore-approach.jpg`

## Alternate Versions Moved To Review

Moved to review:
- `_review/alternate-versions/equipment/equipment-fleet.jpg`
- `_review/alternate-versions/projects/shore-approach.png`

Reason:
- These are preserved as fallback source material.
- Higher-priority or more directly used counterparts remain in the active folders:
  - `projects/equipment-fleet.jpg`
  - `projects/shore-approach.jpg`

## Likely Unused In Current UI

These are not directly used by current page/component imports.
They are preserved and still reachable through the asset map where needed.

Moved to review:
- `_review/likely-unused/projects/client-logos.jpg`
- `_review/likely-unused/projects/qms-iso-cert.jpg`
- `_review/likely-unused/team/commercial-director.jpg`
- `_review/likely-unused/team/hse-director.jpg`
- `_review/likely-unused/team/md-ceo.jpg`
- `_review/likely-unused/team/operations-director.jpg`
- `_review/likely-unused/team/projects-director.jpg`
- `_review/likely-unused/team/technical-director.jpg`

## Best Source Versions To Prefer During Manual Editing

These are inferred best-source choices based on resolution, clarity, and usefulness as masters. This is an automated recommendation and should still be manually reviewed.

- `logos/enikkom-logo-color.png` for the color/light logo pair
- `projects/equipment-fleet.jpg` over `_review/alternate-versions/equipment/equipment-fleet.jpg`
- `projects/shore-approach.jpg` over `_review/alternate-versions/projects/shore-approach.png` for current site use
- `projects/hdd-night-panorama.jpg` as the uncropped master
- `projects/hdd-night-panorama-cropped.jpg` as the layout-specific crop
- `projects/pipeline-construction.jpg` as the highest-resolution pipeline-construction source
- `projects/jetty-construction.jpg` as the highest-resolution jetty-construction source

## Files Remaining In Active Folders

All image files still outside `_review/` remain part of the active working library.

The exact active list is recorded in:
- `review-inventory.json` under `main_active_files`
