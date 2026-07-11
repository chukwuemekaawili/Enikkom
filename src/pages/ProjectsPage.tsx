import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { RecentOps } from "@/components/home/RecentOps";
import { Layout } from "@/components/layout";
import SEO from "@/components/ui/SEO";
import { CTABand } from "@/components/sections";
import { InteractiveProjectMap } from "@/components/sections/InteractiveProjectMap";
import { EditableText } from "@/components/content";
import {
  RecordEyebrow,
  RecordMetric,
  RecordMetaRow,
  RecordStatusStamp,
  FieldFigure,
  ProjectRecordCard,
} from "@/components/records";
import { getProjectImage } from "@/content/projectImageSelections";
import { siteImageSelections } from "@/content/siteImageSelections";
import { usePageContent, useCollection } from "@/hooks/useSiteSettings";
import { completedProjects, projectTypes } from "@/content/completedProjects";
import { testimonials } from "@/content/testimonials";

const projectTags = ["All", "HDD", "Pipeline", "Dredging", "CHDD", "Shore Approach"];

const galleryImages = siteImageSelections.gallery.items.map((item) => ({
  src: item.image,
  alt: item.description,
  label: item.title,
}));

// Real projects from Enikkom documents - each with unique thumbnail
const defaultProjects = [
  {
    title: "OML34 Continuous HDD, 10\" × 12km",
    location: "Utorogun, Delta State",
    metric: "12km",
    metricLabel: "Nigeria's Longest CHDD",
    tags: ["HDD", "CHDD"],
    href: "/projects/oml34-chdd",
    thumbnail: getProjectImage("oml34-chdd", "projectList"),
    year: "2021",
  },
  {
    title: "Dangote Fertilizer, 36\" × 2km Lagoon Crossing",
    location: "Ejirin, Lagos Lagoon",
    metric: "36\" × 2km",
    metricLabel: "Swamp / Lagoon HDD Crossing",
    tags: ["HDD", "Pipeline"],
    href: "/projects/dangote-lagoon",
    thumbnail: getProjectImage("dangote-lagoon", "projectList"),
    year: "2016",
  },
  {
    title: "Atlas Cove-Mosimi, 16\" × 3.1km",
    location: "Arepo / Imagbon, Ogun State",
    metric: "16\" × 3.1km",
    metricLabel: "Africa's Longest Single Drill",
    tags: ["HDD"],
    href: "/projects/atlas-cove-mosimi",
    thumbnail: getProjectImage("atlas-cove-mosimi", "projectList"),
    year: "2016",
  },
  {
    title: "Otumara-Escravos Bundled HDD Crossing",
    location: "Delta State, Nigeria",
    metric: "12\" + 3\" x 2.78km",
    metricLabel: "Longest Bundled Crossing in Africa",
    tags: ["HDD", "Pipeline"],
    href: "/projects/otumara-escravos",
    thumbnail: getProjectImage("otumara-escravos", "projectList"),
    year: "2016",
  },
  {
    title: "Yenagoa 40\" HDD Crossing",
    location: "Bayelsa State, Nigeria",
    metric: "40\" × 760m",
    metricLabel: "Largest Pipeline Crossing in Nigeria",
    tags: ["HDD"],
    href: "/projects/yenagoa-40-crossing",
    thumbnail: getProjectImage("yenagoa-40-crossing", "projectList"),
    year: "2010",
  },
  {
    title: "Escravos-Lagos Pipeline System Phase II",
    location: "Lagos/Delta, Nigeria",
    metric: "36\" × 7.2km",
    metricLabel: "Multiple HDD Sections",
    tags: ["HDD", "Pipeline"],
    href: "/projects/elps-phase-2",
    thumbnail: getProjectImage("elps-phase-2", "projectList"),
    year: "2018",
  },
  {
    title: "Calabar Gas Transmission Pipeline",
    location: "Cross River State, Nigeria",
    metric: "24\" × 21.5km",
    metricLabel: "Gas Transmission",
    tags: ["Pipeline"],
    href: "/projects/calabar-gas-transmission",
    thumbnail: getProjectImage("calabar-gas-transmission", "projectList"),
    year: "2015",
  },
  {
    title: "NIPCO Gas Distribution Network",
    location: "Multiple Locations, Nigeria",
    metric: "50km",
    metricLabel: "4\"/8\"/12\" Pipeline Network",
    tags: ["Pipeline"],
    href: "/projects/nipco-gas-distribution",
    thumbnail: getProjectImage("nipco-gas-distribution", "projectList"),
    year: "2009",
  },
  {
    title: "OB3 River Niger 48\" Direct Pipe Installation",
    location: "River Niger, Nigeria",
    metric: "48\" × 1.8km",
    metricLabel: "HDD + Direct Pipe Installation",
    tags: ["HDD"],
    href: "/projects/ob3-river-niger",
    thumbnail: getProjectImage("ob3-river-niger", "projectList"),
    year: "2020",
  },
  {
    title: "Ekiadolor Deep Valley Crossing",
    location: "Edo State, Nigeria",
    metric: "36\" × 1.2km",
    metricLabel: "80m Depth, Africa's Deepest HDD",
    tags: ["HDD"],
    href: "/projects/ekiadolor-deep-valley",
    thumbnail: getProjectImage("ekiadolor-deep-valley", "projectList"),
    year: "2016",
  },
  {
    title: "River Niger Historic Crossing",
    location: "Niger Delta, Nigeria",
    metric: "First",
    metricLabel: "HDD Crossing in Nigeria",
    tags: ["HDD"],
    href: "/projects/river-niger-historic",
    thumbnail: getProjectImage("river-niger-historic", "projectList"),
    year: "2003",
  },
  {
    title: "Gbaran Phase 3b - UZU CPF Upgrade",
    location: "Bayelsa State, Nigeria",
    metric: "8km & 10km",
    metricLabel: "x 16\" pipeline EPC",
    tags: ["Pipeline"],
    href: "/projects/gbaran-phase-3b",
    thumbnail: getProjectImage("gbaran-phase-3b", "projectList"),
    year: "2025",
  },
  {
    title: "16\" & 6\" Nun River HDD Crossing",
    location: "Niger Delta, Nigeria",
    metric: "Dual",
    metricLabel: "HDD crossing under Nun River",
    tags: ["HDD"],
    href: "/projects/nun-river-dual-hdd",
    thumbnail: getProjectImage("nun-river-dual-hdd", "projectList"),
    year: "2024",
  },
  {
    // No published detail file for this record — rendered as a non-link
    // summary card (see ProjectRecordCard's neutral state). Do NOT add an
    // href until a verified /projects/<slug> detail record exists.
    title: "Escravos Shore Approach Installation",
    location: "Delta State, Nigeria",
    metric: "1.8km",
    metricLabel: "Shore Crossing",
    tags: ["Shore Approach", "Pipeline"],
    thumbnail: getProjectImage("escravos-shore-approach", "projectList"),
    year: "2021",
  },
];

interface ProjectListEntry {
  title: string;
  /** Detail-page route. Omitted for register entries with no published detail file. */
  href?: string;
  location?: string;
  metric?: string;
  metricLabel?: string;
  client?: string;
  year?: string;
  thumbnail?: string;
  tags?: string[];
  slug?: string;
}

function resolveProjectListThumbnail(project: { slug?: string; href?: string; thumbnail?: string }) {
  const slugOrHref = project.slug || project.href || "";
  return getProjectImage(slugOrHref, "projectList") || project.thumbnail;
}

/* ── Register facts, computed from the verified data file (never typed in) ── */
const registerYears = completedProjects
  .map((p) => Number(p.year))
  .filter((y) => !Number.isNaN(y));
const registerPeriod = `${Math.min(...registerYears)}–${Math.max(...registerYears)}`;
const registerTypeCounts = completedProjects.reduce<Record<string, number>>((acc, p) => {
  acc[p.type] = (acc[p.type] ?? 0) + 1;
  return acc;
}, {});

/** Benchmarks held — same four records the page has always claimed,
    with provenance drawn from the register entries. */
const benchmarks = [
  { label: "Longest single HDD drill", value: "3.1", unit: "km", note: "Atlas Cove–Mosimi, 16\" — Africa record (2016)" },
  { label: "Longest continuous HDD", value: "12", unit: "km", note: "OML34, 10\" — Nigeria record (2021)" },
  { label: "Largest pipeline crossing", value: "40", unit: "in", note: "Yenagoa HDD, Bayelsa State — Nigeria record (2010)" },
  { label: "Deepest HDD crossing", value: "80", unit: "m", note: "Ekiadolor valley, 36\" — Africa record (2016)" },
];

/** Archive filter bar: overline field label + squared mono controls.
    Active option reads as an amber stamp; functionality unchanged. */
function RegisterFilter({
  label,
  options,
  active,
  onChange,
  counts,
}: {
  label: string;
  options: string[];
  active: string;
  onChange: (value: string) => void;
  counts?: Record<string, number>;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-[var(--enk-rule)] py-3">
      <span className="enk-overline shrink-0">{label}</span>
      <div className="flex flex-wrap gap-1.5" role="group" aria-label={label}>
        {options.map((option) => {
          const isActive = active === option;
          const count = option === "All" ? undefined : counts?.[option];
          return (
            <button
              key={option}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange(option)}
              className="rounded-[8px] border px-3 py-1.5 text-[13px] font-semibold transition-colors focus-ring"
              style={
                isActive
                  ? {
                      borderColor: "var(--enk-rule-accent)",
                      color: "var(--enk-accent-primary-on-dark)",
                      backgroundColor: "var(--enk-status-record-bg)",
                    }
                  : { borderColor: "var(--enk-rule)", color: "var(--enk-meta)" }
              }
            >
              {option}
              {typeof count === "number" && <span className="ml-1 opacity-70">{count}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Register count line, e.g. "Showing 11 of 19 entries". */
function RegisterCount({ shown, total, noun }: { shown: number; total: number; noun: string }) {
  return (
    <p className="mt-3 text-[13px] text-[var(--enk-blueprint)]" aria-live="polite">
      Showing {shown} of {total} {noun}
    </p>
  );
}

const registerCell = "px-3.5 py-3 align-top text-[13px] leading-snug";

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeRecordFilter, setActiveRecordFilter] = useState("All");
  const location = useLocation();
  const { content } = usePageContent('projects');
  const heroContent = content.hero || {};
  const recordsContent = content.records || {};

  const { data: dbProjects } = useCollection('projects_list');

  // Use DB projects if available, otherwise fallback to hardcoded defaults
  const projects = (dbProjects.length > 0 ? (dbProjects as ProjectListEntry[]) : defaultProjects).map(
    (project) => ({
      ...project,
      thumbnail: resolveProjectListThumbnail(project),
    }),
  );

  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter((p) => (p.tags ?? []).includes(activeFilter));

  const filteredRecordProjects = activeRecordFilter === "All"
    ? completedProjects
    : completedProjects.filter((p) => p.type === activeRecordFilter);

  useEffect(() => {
    if (!location.hash) return;

    window.requestAnimationFrame(() => {
      document.getElementById(location.hash.slice(1))?.scrollIntoView({ block: "start" });
    });
    // location.key changes on every navigation, so re-clicking a link for the
    // hash already in the URL still scrolls back to the section.
  }, [location.key, location.hash]);

  return (
    <Layout>
      <SEO
        title="Project Records – HDD, Pipeline & Marine Works Archive – Enikkom"
        description="Documented archive of Enikkom's completed crossings, pipeline works, dredging, piling and marine civil projects across Nigeria — including Africa's longest single HDD drill and Nigeria's longest continuous HDD."
        canonical="/projects"
      />

      {/* Archive header — document cover sheet, not a marketing hero */}
      <section
        aria-label="Project records archive"
        style={{ backgroundColor: "var(--enk-navy)", borderBottom: "1px solid var(--enk-rule)" }}
      >
        <div className="enk-container grid items-center gap-10 py-14 md:py-18 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)]">
          <div>
            <RecordEyebrow refNo={`${completedProjects.length} ENTRIES`}>Project Records</RecordEyebrow>
            <h1 className="enk-display mt-5 max-w-xl text-[clamp(1.9rem,4.2vw,2.9rem)] text-[var(--enk-on-dark)]">
              {heroContent.title || "Completed works on record"}
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--enk-on-dark-muted)] md:text-[16px]">
              {heroContent.subtitle ||
                "Completed crossings, pipeline works, dredging, piling and marine civil projects — a documented archive of Enikkom's field delivery across Nigerian oil & gas and infrastructure corridors."}
            </p>

            <RecordMetaRow
              className="mt-8"
              items={[
                { label: "Recorded Projects", value: String(completedProjects.length) },
                { label: "Period", value: registerPeriod },
                { label: "Disciplines", value: "HDD · Pipeline · Marine · Facilities" },
                { label: "Coverage", value: "Nigeria" },
              ]}
            />

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link to="/contact" className="enk-btn enk-btn--gold">
                Discuss Project Scope
              </Link>
              <a
                href="#record"
                className="inline-flex min-h-[44px] items-center gap-2 px-2 text-[14px] font-bold text-[var(--enk-accent-on-dark)] transition-colors hover:text-[var(--enk-accent-primary-on-dark)] focus-ring rounded-md"
              >
                Full project register ↓
              </a>
            </div>
          </div>

          <FieldFigure
            className="hidden lg:block"
            src={heroContent.backgroundImage || siteImageSelections.completedProjects.hero}
            alt="Enikkom field operations on a completed pipeline project"
            figNo="Plate 01"
            caption="Field documentation from Enikkom's completed works archive"
            ratio="4/3"
            priority
            sizes="440px"
          />
        </div>
      </section>

      {/* Record benchmarks — ledger metrics, no animated counters */}
      <section className="enk-section" style={{ backgroundColor: "var(--enk-bg-muted)" }}>
        <div className="enk-container">
          <div className="mb-9 max-w-2xl">
            <RecordEyebrow>
              <EditableText
                value={recordsContent.subtitle || "Record Benchmarks"}
                pageSlug="projects"
                sectionKey="records"
                field="subtitle"
              />
            </RecordEyebrow>
            <h2 className="enk-display mt-4 text-[clamp(1.5rem,2.8vw,2rem)] text-[var(--enk-ink)]">
              <EditableText
                value={recordsContent.title || "Benchmarks held on file"}
                pageSlug="projects"
                sectionKey="records"
                field="title"
              />
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-[var(--enk-steel)] md:text-[15px]">
              <EditableText
                value={recordsContent.description || "Each figure is tied to a named, completed project in the register below."}
                pageSlug="projects"
                sectionKey="records"
                field="description"
              />
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
            {benchmarks.map((b) => (
              <RecordMetric key={b.label} label={b.label} value={b.value} unit={b.unit} note={b.note} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured records — documented case files with full write-ups */}
      <section className="enk-section">
        <div className="enk-container">
          <div className="mb-8 max-w-2xl">
            <RecordEyebrow>Selected Records</RecordEyebrow>
            <h2 className="enk-display mt-4 text-[clamp(1.5rem,2.8vw,2rem)] text-[var(--enk-ink)]">
              Documented project files
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-[var(--enk-steel)] md:text-[15px]">
              Records with full documentation — scope, method, dimensions and delivery notes — drawn from the archive.
            </p>
          </div>

          <RegisterFilter
            label="Filter by discipline"
            options={projectTags}
            active={activeFilter}
            onChange={setActiveFilter}
          />
          <RegisterCount shown={filteredProjects.length} total={projects.length} noun="records" />

          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectRecordCard
                key={project.title}
                title={project.title}
                href={project.href}
                location={project.location}
                metric={project.metric}
                metricLabel={project.metricLabel}
                client={project.client}
                year={project.year}
                thumbnail={project.thumbnail}
                tags={project.tags}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Full register — the consolidated completed-works ledger */}
      <section className="enk-section scroll-mt-24" id="record" style={{ backgroundColor: "var(--enk-bg-muted)" }}>
        <div className="enk-container">
          <div className="mb-8 max-w-2xl">
            <RecordEyebrow refNo={registerPeriod}>Full Register</RecordEyebrow>
            <h2 className="enk-display mt-4 text-[clamp(1.5rem,2.8vw,2rem)] text-[var(--enk-ink)]">
              Completed project register
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-[var(--enk-steel)] md:text-[15px]">
              A consolidated record of major HDD, pipeline, shore approach, dredging, and facilities work delivered across Nigeria.
            </p>
          </div>

          <RegisterFilter
            label="Filter by discipline"
            options={projectTypes}
            active={activeRecordFilter}
            onChange={setActiveRecordFilter}
            counts={registerTypeCounts}
          />
          <RegisterCount shown={filteredRecordProjects.length} total={completedProjects.length} noun="entries" />

          <p className="mt-4 text-[12.5px] text-[var(--enk-blueprint)] md:hidden">
            Scroll horizontally for all columns →
          </p>

          <div
            className="mt-3 overflow-x-auto border"
            style={{
              borderColor: "var(--enk-rule)",
              borderRadius: "var(--enk-radius-record)",
              backgroundColor: "var(--enk-record-surface)",
            }}
          >
            <table className="w-full min-w-[920px] border-collapse text-left">
              <thead>
                <tr style={{ backgroundColor: "var(--enk-record-inset)" }}>
                  {["Year", "Client", "Project", "Scope", "Location", "Size", "Length", "Type"].map((head, i) => (
                    <th
                      key={head}
                      scope="col"
                      className={`enk-overline whitespace-nowrap px-3.5 py-3 !text-[10.5px] font-semibold ${
                        i === 0 ? "sticky left-0 z-10" : ""
                      }`}
                      style={{
                        borderBottom: "1px solid var(--enk-rule-strong)",
                        ...(i === 0 ? { backgroundColor: "var(--enk-record-inset)" } : {}),
                      }}
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredRecordProjects.map((project, i) => (
                  <tr
                    key={`${project.year}-${project.project}-${i}`}
                    className="border-b border-[var(--enk-rule)] transition-colors last:border-b-0 hover:bg-[var(--enk-ledger-row-hover)]"
                  >
                    <td
                      className={`${registerCell} enk-mono sticky left-0 z-10 font-medium text-[var(--enk-ink)]`}
                      style={{ backgroundColor: "var(--enk-record-surface)" }}
                    >
                      {project.year}
                    </td>
                    <td className={`${registerCell} whitespace-nowrap font-semibold text-[var(--enk-ink)]`}>{project.client}</td>
                    <td className={`${registerCell} min-w-[220px] font-medium text-[var(--enk-ink)]`}>{project.project}</td>
                    <td className={`${registerCell} min-w-[190px] text-[var(--enk-steel)]`}>{project.scope}</td>
                    <td className={`${registerCell} whitespace-nowrap text-[var(--enk-steel)]`}>{project.location}</td>
                    <td className={`${registerCell} enk-mono whitespace-nowrap text-[12.5px] text-[var(--enk-ink)]`}>
                      {project.size === "N/A" ? "—" : project.size}
                    </td>
                    <td className={`${registerCell} enk-mono whitespace-nowrap text-[12.5px] text-[var(--enk-ink)]`}>
                      {project.length === "N/A" ? "—" : project.length}
                    </td>
                    <td className={registerCell}>
                      <RecordStatusStamp tone="neutral">{project.type}</RecordStatusStamp>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Field photography — documentation plates */}
      <section className="enk-section scroll-mt-24" id="gallery">
        <div className="enk-container">
          <div className="mb-8 max-w-2xl">
            <RecordEyebrow>Field Documentation</RecordEyebrow>
            <h2 className="enk-display mt-4 text-[clamp(1.5rem,2.8vw,2rem)] text-[var(--enk-ink)]">
              <EditableText
                value={content.gallery?.title || "Photographic record"}
                pageSlug="projects"
                sectionKey="gallery"
                field="title"
              />
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-[var(--enk-steel)] md:text-[15px]">
              <EditableText
                value={content.gallery?.description || "Site photography from completed works across Nigeria."}
                pageSlug="projects"
                sectionKey="gallery"
                field="description"
              />
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {galleryImages.map((img, i) => (
              <FieldFigure
                key={img.label}
                src={img.src}
                alt={img.alt}
                figNo={`Fig ${String(i + 1).padStart(2, "0")}`}
                caption={img.label}
                ratio="3/2"
                sizes="(min-width: 1024px) 22vw, 50vw"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Client correspondence (merged from former /testimonials) */}
      <section className="enk-section scroll-mt-24" id="testimonials" style={{ backgroundColor: "var(--enk-bg-muted)" }}>
        <div className="enk-container">
          <div className="mb-8 max-w-2xl">
            <RecordEyebrow>Client Correspondence</RecordEyebrow>
            <h2 className="enk-display mt-4 text-[clamp(1.5rem,2.8vw,2rem)] text-[var(--enk-ink)]">
              On record from clients
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-[var(--enk-steel)] md:text-[15px]">
              Verified feedback from the operators and EPC contractors we deliver for, reproduced from client correspondence.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {testimonials.map((t) => (
              <figure
                key={t.client}
                className="flex flex-col border p-5"
                style={{
                  borderColor: "var(--enk-rule)",
                  borderRadius: "var(--enk-radius-record)",
                  backgroundColor: "var(--enk-record-surface)",
                }}
              >
                <blockquote className="text-[14px] leading-relaxed text-[var(--enk-steel)]">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-4 border-t border-[var(--enk-rule)] pt-3.5">
                  <p className="text-[13.5px] font-bold text-[var(--enk-accent-on-dark)]">{t.client}</p>
                  <p className="mt-1 text-[12.5px] text-[var(--enk-blueprint)]">{t.project}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <RecentOps />

      {/* Geographic register */}
      <section className="enk-section scroll-mt-24" id="map">
        <div className="enk-container">
          <div className="mb-8 max-w-2xl">
            <RecordEyebrow>Locations</RecordEyebrow>
            <h2 className="enk-display mt-4 text-[clamp(1.5rem,2.8vw,2rem)] text-[var(--enk-ink)]">
              Project footprint
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-[var(--enk-steel)] md:text-[15px]">
              Delivered projects across Nigeria's major oil and gas regions.
            </p>
          </div>
        </div>
        <InteractiveProjectMap
          showHeader={false}
          showStats={true}
          showFilters={true}
          maxHeight="600px"
        />
      </section>

      <CTABand
        headline={content.cta?.headline || "Discuss your crossing or pipeline scope"}
        subhead={content.cta?.subhead || "Send project details for a technical response — scope, method statement input, and budget pricing from the engineering team."}
        secondaryCTA={{ label: "View Capabilities", href: "/capabilities" }}
      />
    </Layout>
  );
}
