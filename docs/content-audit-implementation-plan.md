# Enikkom Site — Content Audit & Strategic Restructuring Plan

**Date:** 2026-07-06 · **Scope:** all 22 routes in `src/pages/` + content sources in `src/content/` · **Source of truth:** `resources/eclweb/` (Enikkom_Redesign_2026 content packs A & B, MASTER_BUILD_SPEC.md, company PDFs)

Every finding below is grounded in files inside this repository. Items the source folder cannot support are marked **[NEEDS DATA — Enikkom]** per the convention already used in `MASTER_BUILD_SPEC.md`.

---

## 1. Page inventory & volume assessment

Visible-copy word counts (script-measured from string literals + JSX text; data-table rows counted via their content files):

| Route | Page | ~Words | Volume verdict |
|---|---|---|---|
| `/` | HomePage (+ `home.ts`, 777w) | ~835 | Healthy |
| `/about` | AboutPage (+ `companyProfile.ts`, 327w) | ~730 | Healthy |
| `/capabilities` | CapabilitiesPage | 241 | Acceptable for an index; intro thin |
| `/capabilities/:slug` | CapabilityDetailPage (7 instances) | ~90–130 each of narrative | **Thin** — 1–2-sentence descriptions |
| `/projects` | ProjectsPage (+ `completedProjects.ts`) | ~435 | Healthy |
| `/projects/:slug` | ProjectDetailPage (11 case studies) | ~2,610 total | Healthy — strongest content on the site |
| `/equipment` | EquipmentPage (+ `equipmentSpecs.ts`) | ~980 | Healthy but duplicated (see §3.1) |
| `/equipment/hdd` | HDDEquipmentPage | ~880 | **Duplicate** of /equipment (see §3.1) |
| `/hse-quality` | HSEQualityPage | 391 | Acceptable; can absorb Sustainability |
| `/sustainability` | SustainabilityPage | **187** | **Thin** — all facts re-used from `home.ts` qhse/fpic |
| `/testimonials` | TestimonialsPage | **238** | **Thin + orphaned** (not linked from nav) |
| `/resources` | ResourcesPage | 475 | Healthy; overlaps News & Insights |
| `/partners` | PartnersPage | 329 | Under-uses source docs (see §5.4) |
| `/careers` | CareersPage | **197** | **Thin + unverified job listings** |
| `/news-insights` | NewsInsightsPage | **128** | **Thin + placeholder cards + duplicates Resources videos** |
| `/management-team` | ManagementPage | ~1,029 | Healthy (best bios on the site) |
| `/contact` | ContactPage (+ RFQForm) | 160 | Fine — form page |
| `/search`, `/privacy`, `/terms`, 404 | Utility | — | Privacy/Terms need legal sign-off **[NEEDS DATA — Enikkom]** |

---

## 2. Critical launch blockers (fix before any submission/launch)

### 2.1 Testimonials do not match the source document — fabrication risk
Source: `resources/eclweb/.../Part b/H1.9 - Testimonials.docx` contains exactly **four** testimonials: DFL, Zakhem, Saipem, Gramen Petroserve.

`TestimonialsPage.tsx` ships **six**, with these problems:
- **Two invented quotes** attributed to **Shell (SPDC)** and **NNPC/PPMC** — they do not exist anywhere in the source folder. Publishing invented endorsements under IOC/NOC names is a legal and procurement-credibility risk of the highest order.
- **Embellished wording** on the sourced four: e.g. Zakhem's real quote has no "commitment to safety is unmatched"; Saipem's has no "unmatched professionalism"; all four gained invented author titles ("Project Director", "Construction Manager") and 5-star ratings not present in the source.
- **Changed fact:** DFL's source quote says **36" × 1.5 km** swamp/river crossing; the page says 36" × 2 km. (`completedProjects.ts` also says 2 km and attributes the Dangote lagoon crossing to "Daewoo / SPDC" while the testimonial credits Dangote Fertilizer's LGPP — reconcile against `S1.1.1.1.5 - Tech Overview LGPP Dangote.docx` before publishing either figure.)

**Action:** revert all quotes to verbatim source text, drop the two unsourced quotes (or obtain written confirmation **[NEEDS DATA — Enikkom]**), remove invented titles/ratings, and reconcile the DFL crossing length.

### 2.2 Careers page lists four job openings with no source
`CareersPage.tsx` `defaultOpenings` ("Senior HDD Engineer — Port Harcourt", etc.) appears in no source document. `MASTER_BUILD_SPEC.md` §5-I explicitly requires *Open Roles [NEEDS DATA] or "Currently not hiring" microcopy*. Advertising roles that don't exist invites real applications and reputational damage.
**Action:** replace with a "Register your interest / send CV to HR" block until Enikkom supplies real vacancies.

### 2.3 SEO metadata missing on ~20 of 22 routes
Only HomePage (Helmet) and ContactPage (`SEO.tsx`) set per-page `<title>`/description. Every other route inherits the homepage title from `index.html`. Additionally:
- **No `public/sitemap.xml`**, and `robots.txt` has no `Sitemap:` directive.
- **`og-image.png` is referenced 4× in `index.html` but does not exist in `public/`** — broken social-share previews sitewide.
- `vercel.json` is a blanket SPA rewrite: legacy spam URLs (`/blog*`, casino/recipe slugs — the reason the spec §2/§8 demands **410 Gone**) currently return **HTTP 200** with the app shell, inviting re-indexing of the spam footprint the redesign was meant to bury. The spec's 301 map (`/about-us/`, `/company-introduction/`, `/faqs/`, `/enquires/`…) is also unimplemented at the edge (client-side `<Navigate>` returns 200).

**Action:** apply the spec §8 title templates via `SEO.tsx` on every page; generate sitemap.xml; add real 301/410 rules to `vercel.json`; create `og-image.png`.

### 2.4 Internal review commentary shipped as customer-facing copy
Copy written for the *previous audit's reviewers* is live on the pages:
- `EquipmentPage.tsx:32` — "…engineering ratings **now replace the old generic equipment copy**."
- `EquipmentPage.tsx:90` — "…the table **now uses** … **instead of generic diameter claims**."
- `EquipmentPage.tsx:342` — "Documentary fleet image **used in place of the old logo-style placeholder**…"
- `HDDEquipmentPage.tsx:58` — "This page **now presents** … **instead of generic diameter placeholders**."
- `AboutPage.tsx:225` — "**Updated directly from the latest corporate documents** to reflect the current direction…"
- `ResourcesPage.tsx:96,103` — "This certificate **was requested in scope**, but no standalone PENCOM/NSITF file **was present anywhere in the supplied ECLweb document set**."
- `NewsInsightsPage.tsx` — three visible "To be supplied, …" placeholder cards under a "Coming Soon" heading.

**Action:** rewrite each as customer-facing copy (equipment: state the capability, not the editing history; resources: "Available on request"; news: remove the placeholder section entirely).

### 2.5 "Years of experience" is inconsistent sitewide
- `home.ts` KPI: **"30+"** · About timeline 2025 milestone: **"30+ years"** · About heading: **"34 Years of Experience"** · Testimonials stat: **"34"**, enforced by a code hack (`TestimonialsPage.tsx:80-84` force-overwrites any year-stat to "34").
- Founding year 1995 → 2026 = **31 years**. Neither 30+ nor 34 is wrong-proof; "34" appears sourced from nothing in the folder.
**Action:** standardize on a single figure derived from 1995 (recommend "30+" as the conservative, source-backed claim), define it once in `home.ts`, import everywhere, delete the override hack.

---

## 3. Duplication & merge plan

### 3.1 `/equipment` + `/equipment/hdd` (+ alias `/hdd-equipment`) → one page
Both pages render the **same `hddRigSpecs` table** (all 8 columns), the **same thrust-boring and microtunneling tables**, and near-identical HDDThailand partnership blurbs. Audience intent ("what fleet does Enikkom own, at what ratings") is identical; both target the same "HDD equipment Nigeria" queries — direct cannibalization.
**Merge:** keep `/equipment` as the single fleet page (HDD → thrust/micro → marine → support, in that order, with the HDD support-systems table from the HDD page moved in). 301 `/equipment/hdd` and `/hdd-equipment` → `/equipment#hdd`. Update `navMenus` in `home.ts` and the two internal links on EquipmentPage. Nothing of value is lost — the only HDD-page-unique content is the `hddSupportSystems` table and four overview stat chips, both portable.

### 3.2 `/sustainability` → `/hse-quality`
Every fact on Sustainability (ISO 14001/45001, zero-LTI, 5M+ man-hours, FPIC points, Community Management Policy link) is imported from the same `home.ts` objects HSEQualityPage uses. The spec's sitemap has no sustainability page. Two pages splitting "safety/environment/community" authority weakens both.
**Merge:** add a "Community, Local Content & Environment" section to HSE & Quality (the four pillars + FPIC cards travel as-is); 301 `/sustainability` → `/hse-quality#sustainability`. Retitle nav item "QHSE & Sustainability" to preserve the About-menu pathway.

### 3.3 `/news-insights` → `/resources`
The two "featured" video entries on News & Insights (OML34 documentary, NIPITECS 2019) are **byte-for-byte the same entries** already on ResourcesPage's video section. The rest of the page is placeholder cards. The spec (§ preamble and §8) explicitly forbids reviving a news/blog module — this site's legacy domain was overrun by blog spam, which is why `/news/*` must die, not be re-established.
**Merge:** delete the page, 301 `/news-insights` → `/resources#videos`, remove from the About nav menu. If Enikkom later supplies real news items, they belong in a governed "Updates" section with an owner and cadence (see §8), not a placeholder shell.

### 3.4 `/testimonials` → distribute onto `/projects` + project details
238 words, orphaned (not in `navMenus`, reachable only via footer/search), overlapping the trust content on Home and About. Testimonials convert best **next to the proof they describe**.
**Merge:** after fixing §2.1, place each verbatim quote on its matching project detail page (Otumara-Escravos → Saipem quote; LGPP → DFL quote; ELPS II → Zakhem quote) in the spec's "Outcome" case-study slot, plus a compact "What clients say" band on `/projects`. 301 `/testimonials` → `/projects#testimonials`.

### 3.5 `/management-team` → `/about/leadership` (keep content, fix location)
The spec maps `/management-team` → `/about/#leadership`, and the About menu labels it "Leadership". The page content is excellent (10 verified bios, ~1,029 words) — do **not** flatten it into About. Instead: move to `/about/leadership`, 301 the old path, and add a 3-card leadership teaser section on About linking to it. This keeps About honest to its template (spec §5-B includes a Leadership section) without losing bio depth.

### 3.6 Capability taxonomy reconciliation
Current slugs: `hdd`, `pipelines-flowlines`, `dredging-piling`, `facilities`, `project-management`, `pipeline-security`, `logistics`.
Issues:
- **`/capabilities/logistics` is orphaned** — it exists in `CapabilityDetailPage.tsx` but is absent from the index grid and `navMenus`. Either add it to the index or fold logistics into Equipment (support fleet) and drop the route.
- Spec sitemap expects **marine/shore-structures + shore-approach** coverage; the site has none (see gap §5.1).
- 4 of 7 capability pages have `relatedProjects: []` even though `completedProjects.ts` has matching entries (e.g. dredging → OML34 Dredging & Cofferdam, OB3 Sheet Piling; facilities → NIPCO Ibafo Phases). Wire these up — it's the spec's core conversion mechanism (capability → proof → RFQ).

---

## 4. Priority-ranked page-by-page actions

**P0 — Critical launch blockers**
| # | Page/file | Action |
|---|---|---|
| 1 | TestimonialsPage + project details | Revert to verbatim H1.9 quotes; delete SPDC/NNPC inventions; fix DFL 1.5 km; then execute merge §3.4 |
| 2 | CareersPage | Remove fabricated openings; "send CV" flow |
| 3 | All pages | Per-page `<title>`/meta via `SEO.tsx` using spec §8 templates |
| 4 | `vercel.json`, `public/` | 301 map + 410 for legacy spam slugs; `sitemap.xml`; `Sitemap:` in robots.txt; create `og-image.png` |
| 5 | Equipment, HDD Equipment, About, Resources, NewsInsights | Strip the 8 meta-commentary passages (§2.4) |
| 6 | `home.ts` + About + Testimonials | Single experience figure; delete the "34" override hack |

**P1 — High-impact improvements**
| # | Page | Action |
|---|---|---|
| 7 | Equipment cluster | Execute merge §3.1 |
| 8 | HSE & Quality + Sustainability | Execute merge §3.2 |
| 9 | News & Insights | Execute merge §3.3 |
| 10 | Management | Execute move §3.5 |
| 11 | Capability details | Enrich each to 400+ words from the Tech Overview docx set (Part b `S1.1.1.x`); wire `relatedProjects` on all 7; add standards citations already listed |
| 12 | Projects | Add case studies for **2024 Nun River dual HDD** and **2025 Gbaran Phase 3b** — the two most recent record entries have no detail pages (most current proof invisible); mine `3 - PROJECT & EXPERIENCE.docx` (60k chars) + `Relevant Projects with Pictorial Details.docx` |
| 13 | Partners | Add the documented partner overviews sitting unused: PIEJV (H1.6.2), L&M (H1.7.2), AA (H1.7.3), Inrock (H1.7.4), MEARS (H1.7.5) — currently only HDDThailand + OMS are shown |

**P2 — Optimization opportunities**
| # | Page | Action |
|---|---|---|
| 14 | New capability content | Trenchless-methods coverage from source docs: Guided Boring (S1.1.1.2), Microtunneling (S1.1.1.3), Horizontal Boring (S1.1.1.4), Pipe Ramming (S1.1.1.5) — recommend one "Trenchless Methods" page with method sections rather than 4 micro-pages (each source doc is only 400–700 chars; combined they clear the depth bar). HDD Rescue doc is empty **[NEEDS DATA — Enikkom]** |
| 15 | Shore Approach | Spec sitemap + project record (Escravos Shore Approach 2021, MSI Conoil) support a capability section; fold into Dredging & Piling → retitle "Dredging, Piling & Shore Approach" |
| 16 | Pipeline Security detail | Enrich from `S1.1.5.1 - Pipeline Monitoring system.pdf` |
| 17 | Capabilities index | Fix orphaned logistics (§3.6); enrich intro to name terrains/standards |
| 18 | Privacy/Terms | Legal review **[NEEDS DATA — Enikkom]** |

---

## 5. Structure, templates, URLs, internal linking

**Target sitemap after merges** (7 top-nav items, per spec §2):
```
/                       Home
/about                  + /about/leadership
/capabilities           index → /capabilities/{hdd, pipelines-flowlines,
                        dredging-piling (incl. shore approach), facilities,
                        trenchless-methods, pipeline-security, project-management}
/projects               index (record • gallery • map • testimonials) → /projects/{slug} ×13+
/equipment              single fleet page (#hdd anchor)
/hse-quality            QHSE + sustainability + community
/contact                RFQ
footer: /careers /partners /resources /privacy /terms /search
```

**Templates** — the site already implements spec §4/§5 blocks (Hero, TrustBlock, KPI band, CTABand, CaseStudyCard, CertificationsBlock). Enforce per-template completeness instead of inventing new structure:
- Capability detail: Hero → intro (≥150w) → Process → Standards → Equipment excerpt → **≥2 related case studies** → CTA. The related-case-study slot is the one currently failing (4 of 7 empty).
- Case study: Challenge → Solution → Results table → HSE/QA → **Outcome quote (verbatim only)** → Gallery → Related.
- Every page ends in `CTABand` with spec-approved labels ("Request a Quote" / "Discuss Your Project") — already consistent; keep it that way.

**Internal linking rules** (authority flows to conversion pages):
1. Every capability ↔ its case studies (both directions; `relatedProjects` + tags already exist as the mechanism).
2. Equipment tables link model families to the capabilities that use them.
3. HSE page links to the 4 policy PDFs (already true) and from every case study's HSE section (new).
4. All merged/moved URLs 301 at the edge, and internal `<Link>`s updated so no crawl path relies on a redirect.

**Visual assets** — no stock needed: `siteImageSelections.ts`/`projectImageSelections.ts` already curate real project photography (per the image-pipeline conventions in this repo), `public/videos` + the two YouTube documentaries cover motion, and `docs/video-production/` holds the corporate-film pipeline for the Home hero when it lands.

---

## 6. "Submission-worthy" quality bar (measurable, per page)

1. **Factual accuracy:** every claim traceable to a file in `resources/eclweb/` or flagged `[NEEDS DATA]` — the `home.ts` sourcing-header pattern is the model; extend it to every content file. Zero invented quotes, jobs, dates, or metrics (§2.1, §2.2, §2.5 are the current violations).
2. **Completeness:** ≥400 words of substantive narrative on every non-index, non-form page; all template slots filled or consciously omitted; no `[[PLACEHOLDER]]` tokens rendered in production (build-time assert on `isPlaceholder`).
3. **Originality/voice:** matches `docs/ui-brief.md` intent — "corporate, industrial, audit-ready"; no editing-history meta-copy; verbatim client quotes only.
4. **SEO:** unique title (≤60 chars, spec §8 template) + description (≤155) per route; one H1; sitemap entry; canonical; no orphan pages (testimonials and logistics are today's orphans).
5. **Accessibility (WCAG 2.1 AA):** alt text on content images (already strong), visible focus, AA contrast per the ui-brief token table, keyboard-operable dialogs/accordions (Radix covers this) — verify with axe on the 6 templates rather than 22 pages.
6. **Mobile:** tables collapse or scroll (`overflow-x-auto` present — verify at 375px), timeline/process accordions per spec §5.
7. **Conversion:** primary CTA above the fold on every page; RFQ form emits `event_submit_rfq` with project type; phone/WhatsApp events wired (spec §8 analytics list) **[NEEDS DATA — analytics property]**.

---

## 7. Phased timeline

| Phase | Window | Milestone / exit criteria |
|---|---|---|
| **1. Audit sign-off** | Week 1 | Stakeholder confirms merge map (§3), the testimonial remediation (§2.1), and the single experience figure. Blocking decisions: keep-or-kill logistics page; "30+" vs another sourced figure |
| **2. P0 fixes** | Weeks 1–2 | All six launch blockers closed; verbatim testimonials live; SEO scaffold on all routes |
| **3. Merges + redirects** | Weeks 2–3 | §3 consolidations shipped with edge 301/410 map; nav/footer/search-index updated; no internal link resolves through a redirect |
| **4. Content development** | Weeks 3–6 | Capability enrichment (P1 #11), two new case studies (#12), partner overviews (#13), trenchless-methods page (#14–16). SME review by Enikkom engineering on every technical claim |
| **5. QA & pre-launch** | Week 7 | Brand-voice pass against ui-brief; axe + Lighthouse on 6 templates; 375px table check; redirect map tested with curl (301/410 status codes, not 200) |
| **6. Launch + monitoring** | Week 8 → +90 days | Search Console submission of sitemap; watch spam-URL 410 dropout; monthly metric review (§9) |

**Resources:** ~1 content developer (3–4 wks, phases 4–5), ~1 frontend dev (2 wks, phases 2–3 — all changes are TSX/content-file edits plus `vercel.json`), Enikkom SME review (~2 hrs/wk), legal review of testimonials + privacy/terms. No new tooling required beyond an analytics property and Search Console access.

---

## 8. Content governance

- **Ownership:** each content file gets a header naming its source doc (pattern exists in `companyProfile.ts`/`home.ts`) and an owner (Marketing vs Engineering vs HR). Case studies + capability specs → Engineering sign-off; testimonials + partner blurbs → written client/partner permission on file.
- **Review cadence:** quarterly — KPI figures (man-hours, km installed), permit bundle (the DPR/NUPRC pack is dated **2026** and will expire), careers listings. Annually — leadership bios, ISO certificate scans, brochure PDFs.
- **Expiration triggers:** any `[[PLACEHOLDER]]` older than one quarter is deleted, not kept "coming soon"; any dated artifact (permits, certificates) auto-flags 60 days before its year rolls over; new completed projects must reach `completedProjects.ts` within one quarter of handover, and any project claimed as "latest" must have a case study.
- **Change discipline:** no copy may describe the site's own editing history (§2.4 class); enforce via review checklist.

---

## 9. Success metrics (post-launch, 90-day horizon)

From spec §1 + §8, all currently instrumentable once analytics is wired:
- **RFQ submissions** (`event_submit_rfq`) — spec target +40% vs baseline **[NEEDS DATA — baseline]**; segment by project type to validate the capability → case-study → RFQ path.
- **Primary-CTA CTR** ≥10% sitewide (spec M2); phone/WhatsApp click events on mobile.
- **Organic:** indexed-page count matches sitemap (no spam-slug resurrection — watch 410s in Search Console); impressions/clicks on "HDD Nigeria", "trenchless crossing Nigeria", capability-level queries; zero cannibalization between /equipment URLs after the merge.
- **Engagement:** case-study depth (scroll or `event_case_study_view` → related-project click-through); bounce on merged pages vs their pre-merge parts.
- **Freshness score:** % of pages touched in the last 2 quarters; zero rendered placeholders; permit/cert artifacts in date.
- **Feedback loop:** every RFQ's "how did you find us / what convinced you" field reviewed monthly and fed into the case-study pipeline.
