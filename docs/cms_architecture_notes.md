# CMS Architecture Notes

* Homepage hero copy is currently sourced from `page_content`.
* `page_sections` contains a hero-like row with a dynamic key but null content for this case.
* This mismatch caused wasted debugging time.
* Future edits must verify the live source before changing DB records.
