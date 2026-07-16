import { Layout } from "@/components/layout";
import SEO from "@/components/ui/SEO";
import { Hero, CTABand } from "@/components/sections";
import { EditableText } from "@/components/content";
import { SectionHeading } from "@/components/home/SectionHeading";
import { usePageContent } from "@/hooks/useSiteSettings";
import {
  DocumentCard,
  FieldFigure,
  RecordMetric,
  RecordStatusStamp,
} from "@/components/records";
import { siteImageSelections } from "@/content/siteImageSelections";
import { fpic } from "@/content/home";

// Sustainability pillars merged from the former /sustainability page.
const sustainabilityPillars = [
  {
    title: "Environmental Management",
    description:
      "Operations across the Niger Delta's swamp, riverine and offshore terrain run under an environmental management system certified to ISO 14001:2015, with monitoring built into each crossing and pipeline scope.",
  },
  {
    title: "Safety & Workforce Wellbeing",
    description:
      "A documented HSE system, certified to ISO 45001:2018, governs safe working across every crossing and pipeline scope, with job hazard analysis and a full permit-to-work system.",
  },
  {
    title: "Community & Local Content",
    description:
      "Host-community engagement, run under our Community Management Policy, keeps corridors open and access protected for the life of a project.",
  },
  {
    title: "Indigenous Capacity Development",
    description:
      "Indigenous technical capacity aligned with NOGICD and NCDMB local-content requirements, built through our partnership with HDDTEC.",
  },
];

const hseSteps = [
  { title: "Policy Manual", level: "Level 1", description: "Policy and Authority Statement Manual establishing company-wide HSE principles" },
  { title: "HSE Procedures", level: "Level 2", description: "Quality Assurance and Safety (HSE) Procedures for all operations" },
  { title: "Work Instructions", level: "Level 3", description: "Specific Work Instructions for each task and operation type" },
  { title: "Quality Records", level: "Level 4", description: "Quality and Safety Records for traceability and continuous improvement" },
];

const defaultHseCommitments = [
  "Zero tolerance for unsafe acts and conditions",
  "Full PTW (Permit to Work) system",
  "International Safety Management (ISM) code compliance",
  "Job Hazard Analysis before every task",
  "Environmental protection and sustainable development",
  "Community engagement and social responsibility",
  "Personal Protective Equipment (PPE) protocols",
  "Regular third-party safety audits",
];

const hseStats = [
  { value: "100%", label: "PTW Compliance" },
  { value: "3", label: "ISO Systems" },
  { value: "4", label: "Level HSE System" },
  { value: "ISO", label: "45001 Certified" },
];

const permitsAndLicenses = [
  {
    title: "DPR / NUPRC Permit Bundle 2026",
    authority: "Nigerian Upstream Petroleum Regulatory Commission",
    description:
      "Current specialized category permits covering dredging, drilling and production services, offshore pipeline laying, and special transportation services.",
    href: "/downloads/compliance/dpr-nuprc-permits-2026-merged.pdf",
    cta: "View permit bundle",
  },
] as const;

const policyDocuments = [
  {
    title: "Community Management Policy",
    description:
      "Our current Community Relations Policy statement, governing project stakeholder and host-community engagement.",
    href: "/downloads/compliance/community-management-policy.pdf",
  },
  {
    title: "Quality Policy",
    description:
      "Quality Policy Statement extracted from the current Quality Assurance and Quality Control policy manual.",
    href: "/downloads/compliance/quality-policy-statement.pdf",
  },
  {
    title: "Security Policy",
    description:
      "Security Policy extracted from the current HSE policy documents for personnel, property, and operational risk protection.",
    href: "/downloads/compliance/security-policy.pdf",
  },
  {
    title: "Safety Policy",
    description:
      "Occupational Health and Safety Policy extracted from the current HSE policy documents.",
    href: "/downloads/compliance/safety-policy.pdf",
  },
] as const;

export default function HSEQualityPage() {
  const { content } = usePageContent('hse');
  const heroContent = content.hero || {};
  const qmsContent = content.qms || {};
  const commitmentContent = content.commitment || {};
  const hseImages = siteImageSelections.hse;

  const hseCommitments = commitmentContent.items || defaultHseCommitments;

  return (
    <Layout>
      <SEO
        title="HSE & Quality – ISO 9001/14001/45001 – Enikkom"
        description="Enikkom's QHSE system: ISO 9001, 14001 and 45001 certified, with a four-level quality process and a full permit-to-work system."
        canonical="/hse-quality"
      />
      <Hero
        title={heroContent.title || "Health, safety and quality"}
        subtitle={heroContent.subtitle || "Safety First. Quality Always. A firm commitment to zero incidents and high standards guides everything we do."}
        badge="QHSE Credentials"
        backgroundImage={heroContent.backgroundImage || hseImages.hero}
        size="default"
      />

      {/* Safety record — ledger figures */}
      <section className="enk-section--tight" style={{ borderBottom: "1px solid var(--enk-rule)" }}>
        <div className="enk-container">
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
            {hseStats.map((stat) => (
              <RecordMetric key={stat.label} label={stat.label} value={stat.value} />
            ))}
          </div>
        </div>
      </section>

      {/* Quality management system */}
      <section className="enk-section" style={{ borderBottom: "1px solid var(--enk-rule)" }}>
        <div className="enk-container">
          <SectionHeading
            kicker={qmsContent.subtitle || "Quality System"}
            title={<EditableText value={qmsContent.title || "4-Level Quality Management System"} pageSlug="hse" sectionKey="qms" field="title" />}
            intro={<EditableText value={qmsContent.description || "Our ISO-certified QMS follows a structured four-level model ensuring consistent quality across all operations."} pageSlug="hse" sectionKey="qms" field="description" />}
            onDark
          />

          <ol className="mt-10 grid gap-px overflow-hidden rounded-[var(--enk-radius-record)] border border-[var(--enk-rule-strong)] bg-[var(--enk-rule)] md:grid-cols-4">
            {hseSteps.map((step, i) => (
              <li
                key={step.title}
                className="flex flex-col gap-2.5 p-5"
                style={{ backgroundColor: "var(--enk-record-surface)" }}
              >
                <span className="text-[13px] font-bold text-[var(--enk-meta)]">
                  {step.level}
                </span>
                <h3 className="text-[15px] font-semibold text-[var(--enk-ink)]">{step.title}</h3>
                <p className="text-[13px] leading-6 text-[var(--enk-steel)]">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Commitments */}
      <section className="enk-section" style={{ backgroundColor: "var(--enk-bg-muted)", borderBottom: "1px solid var(--enk-rule)" }}>
        <div className="enk-container">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                kicker={commitmentContent.subtitle || "Commitment"}
                title={<EditableText value={commitmentContent.title || "Our HSE Commitment"} pageSlug="hse" sectionKey="commitment" field="title" />}
                intro={<EditableText value={commitmentContent.description || "At Enikkom, HSE is more than a policy. It is a core value embedded in every aspect of our operations. We are committed to protecting our people, communities, and the environment."} pageSlug="hse" sectionKey="commitment" field="description" multiline />}
                onDark
              />

              <ul className="mt-8 border-t-2" style={{ borderColor: "var(--enk-rule-heavy)" }}>
                {hseCommitments.map((commitment: string, i: number) => (
                  <li
                    key={i}
                    className="flex items-baseline gap-3 border-b px-1 py-2.5"
                    style={{
                      borderColor: "var(--enk-rule)",
                      backgroundColor: i % 2 === 1 ? "var(--enk-ledger-row-alt)" : undefined,
                    }}
                  >
                    <span
                      className="mt-[1px] inline-block h-[7px] w-[7px] shrink-0"
                      style={{ backgroundColor: "var(--enk-status-complete)" }}
                      aria-hidden="true"
                    />
                    <span className="text-[13.5px] leading-6 text-[var(--enk-ink)]">{commitment}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <FieldFigure
                src={hseImages.briefing}
                alt="Enikkom field personnel working in full PPE"
                caption={
                  <EditableText
                    value={commitmentContent.badgeSubtitle || "Maintained across all major projects"}
                    pageSlug="hse"
                    sectionKey="commitment"
                    field="badgeSubtitle"
                  />
                }
                ratio="4/3"
              />
              <div className="mt-4 flex flex-wrap items-center gap-2.5">
                <RecordStatusStamp tone="qhse">
                  <EditableText
                    value={commitmentContent.badgeTitle || "ISO 45001 Certified"}
                    pageSlug="hse"
                    sectionKey="commitment"
                    field="badgeTitle"
                  />
                </RecordStatusStamp>
                <RecordStatusStamp tone="qhse">Full PTW System</RecordStatusStamp>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Permits & Licenses */}
      <section className="enk-section" style={{ borderBottom: "1px solid var(--enk-rule)" }}>
        <div className="enk-container">
          <SectionHeading
            kicker="Regulatory Compliance"
            title={<>Permits and Licenses</>}
            intro="Compliance documents currently verified from the supplied corporate document pack."
            onDark
          />

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {permitsAndLicenses.map((permit) => (
              <DocumentCard
                key={permit.title}
                docType="Permit"
                title={permit.title}
                description={permit.description}
                meta={[{ label: "Authority", value: "NUPRC" }]}
                href={permit.href}
                actionLabel={permit.cta}
                stamp={{ label: "Current", tone: "qhse" }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Policies — exactly 4 approved policies */}
      <section className="enk-section" style={{ backgroundColor: "var(--enk-bg-muted)", borderBottom: "1px solid var(--enk-rule)" }}>
        <div className="enk-container">
          <SectionHeading
            kicker="Corporate Governance"
            title={<>Our Policies</>}
            intro="Only the four approved policies below are displayed, with direct access to the current source documents."
            onDark
          />

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {policyDocuments.map((policy) => (
              <DocumentCard
                key={policy.title}
                docType="Policy"
                title={policy.title}
                description={policy.description}
                href={policy.href}
                actionLabel="View policy"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability, Community & Local Content */}
      <section id="sustainability" className="enk-section scroll-mt-24">
        <div className="enk-container">
          <SectionHeading
            kicker="Sustainability & Community"
            title={<>Responsible Operations on Sensitive Terrain</>}
            intro="Sustainability at Enikkom is built on auditable systems, not statements: certified management systems, a documented safety record, and host-community policy."
          />

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {sustainabilityPillars.map((p) => (
              <div key={p.title} className="enk-doc-card p-5">
                <p className="enk-overline">Pillar</p>
                <h3 className="mt-3 text-[15px] font-semibold text-[var(--enk-ink)]">{p.title}</h3>
                <p className="mt-2 text-[13px] leading-6 text-[var(--enk-steel)]">{p.description}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-8 grid max-w-5xl gap-4 md:grid-cols-3">
            {fpic.points.map((point) => (
              <div key={point.title} className="enk-doc-card p-5">
                <h3 className="text-[15px] font-semibold text-[var(--enk-ink)]">{point.title}</h3>
                <p className="mt-2 text-[13px] leading-6 text-[var(--enk-steel)]">{point.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="Request the QHSE prequalification pack"
        subhead="Certificates, policies, and safety statistics compiled for tender and vendor-registration review."
        primaryCTA={{ label: "Contact us", href: "/contact" }}
        secondaryCTA={{ label: "View projects", href: "/projects" }}
      />
    </Layout>
  );
}
