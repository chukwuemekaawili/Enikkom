import { Layout } from "@/components/layout";
import SEO from "@/components/ui/SEO";
import { Hero, CTABand } from "@/components/sections";
import { EditableText, EditableImage } from "@/components/content";
import { SectionHeading } from "@/components/home/SectionHeading";
import { RecordMetric } from "@/components/records";
import { usePageContent } from "@/hooks/useSiteSettings";
import { siteImageSelections } from "@/content/siteImageSelections";
import { experienceYears } from "@/content/home";

const defaultBenefits = [
  { title: "Training & Development", description: "HSE certifications, technical training, and career development programs" },
  { title: "Safety Culture", description: "Strong safety standards with a zero LTI record across all projects" },
  { title: "Health Coverage", description: "Health insurance for employees and dependents" },
  { title: "Career Growth", description: "Opportunities across HDD, pipeline, marine, and corporate functions" },
];

// Disciplines Enikkom recruits across, mapped to its actual scope of work
// (see src/content/home.ts capabilities and completedProjects.ts). These are
// fields of hiring, not advertised vacancies — no specific open roles are
// claimed unless supplied by Enikkom HR.
const recruitmentAreas = [
  "HDD & Trenchless Operations",
  "Pipeline Construction",
  "Marine & Dredging",
  "Production Facilities",
  "HSE / QA-QC",
  "Project Management & Controls",
  "Corporate & Support Functions",
];

export default function CareersPage() {
  const { content } = usePageContent('careers');
  const careersImages = siteImageSelections.careers;

  const heroContent = content.hero || {};
  const benefitsContent = content.benefits || {};
  const openingsContent = content.openings || {};
  const cultureContent = content.culture || {};

  return (
    <Layout>
      <SEO
        title="Careers – Build Your Career at Enikkom"
        description="Join one of Nigeria's established indigenous infrastructure contractors. Opportunities across HDD, pipeline, marine, facilities, HSE, and corporate roles."
        canonical="/careers"
      />
      <Hero
        title={heroContent.title || "Build Your Career at Enikkom"}
        subtitle={heroContent.subtitle || "Join one of Nigeria's established indigenous infrastructure contractors. Be part of a team of 500+ professionals delivering projects across Nigeria."}
        badge="Personnel File"
        backgroundImage={heroContent.backgroundImage || careersImages.hero}
        size="default"
        primaryCTA={{ label: "View Recruitment Disciplines", href: "#openings" }}
      />

      {/* Benefits */}
      <section className="enk-section" style={{ borderBottom: "1px solid var(--enk-rule)" }}>
        <div className="enk-container">
          <SectionHeading
            kicker={
              <EditableText
                value={benefitsContent.eyebrow || "Benefits"}
                pageSlug="careers"
                sectionKey="benefits"
                field="eyebrow"
              />
            }
            title={
              <EditableText
                value={benefitsContent.title || "Why Work With Us"}
                pageSlug="careers"
                sectionKey="benefits"
                field="title"
              />
            }
            intro={
              <EditableText
                value={benefitsContent.description || "Join the team that pioneered HDD technology in Nigeria and continues to lead the industry."}
                pageSlug="careers"
                sectionKey="benefits"
                field="description"
              />
            }
          />

          <div className="mt-8 grid gap-px overflow-hidden rounded-[var(--enk-radius-record)] border border-[var(--enk-rule-strong)] bg-[var(--enk-rule)] md:grid-cols-2 lg:grid-cols-4">
            {defaultBenefits.map((b, i) => (
              <div
                key={b.title}
                className="flex flex-col gap-2 p-5"
                style={{ backgroundColor: "var(--enk-record-surface)" }}
              >
                <span className="text-[12px] font-semibold text-[var(--enk-meta)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="text-[15px] font-semibold text-[var(--enk-ink)]">{b.title}</h4>
                <p className="text-[13px] leading-6 text-[var(--enk-steel)]">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recruitment disciplines */}
      <section id="openings" className="enk-section scroll-mt-24" style={{ backgroundColor: "var(--enk-bg-muted)", borderBottom: "1px solid var(--enk-rule)" }}>
        <div className="enk-container">
          <SectionHeading
            kicker={
              <EditableText
                value={openingsContent.eyebrow || "Opportunities"}
                pageSlug="careers"
                sectionKey="openings"
                field="eyebrow"
              />
            }
            title={
              <EditableText
                value={openingsContent.title || "Career Opportunities"}
                pageSlug="careers"
                sectionKey="openings"
                field="title"
              />
            }
            intro={
              <EditableText
                value={openingsContent.description || "We're always looking for talented engineers, project managers, and HSE professionals."}
                pageSlug="careers"
                sectionKey="openings"
                field="description"
              />
            }
          />

          <div className="mt-8 max-w-3xl">
            <div className="enk-doc-card p-6 md:p-8">
              <p className="enk-overline">Recruitment Basis</p>
              <p className="mt-3 text-[14px] leading-7 text-[var(--enk-steel)]">
                We recruit as projects require, across the disciplines that deliver our HDD,
                pipeline, marine, and facilities work. Rather than maintain a standing list of
                advertised vacancies, we build a talent pool and reach out when a matching role
                opens.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {recruitmentAreas.map((area) => (
                  <span key={area} className="enk-chip">{area}</span>
                ))}
              </div>
              <div className="mt-6 border-t pt-5" style={{ borderColor: "var(--enk-rule)" }}>
                <p className="text-[13.5px] text-[var(--enk-steel)]">
                  Register your interest and send your CV to:
                </p>
                <a
                  href="mailto:careers@enikkom.com"
                  className="mt-1.5 inline-block text-[15px] font-semibold text-[var(--enk-accent-on-dark)] transition-colors hover:text-[var(--enk-accent-primary-on-dark)] focus-ring rounded-sm"
                >
                  careers@enikkom.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="enk-section" style={{ borderBottom: "1px solid var(--enk-rule)" }}>
        <div className="enk-container">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                kicker={
                  <EditableText
                    value={cultureContent.eyebrow || "Culture"}
                    pageSlug="careers"
                    sectionKey="culture"
                    field="eyebrow"
                  />
                }
                title={
                  <EditableText
                    value={cultureContent.title || "Our Culture"}
                    pageSlug="careers"
                    sectionKey="culture"
                    field="title"
                  />
                }
                onDark
              />
              <p className="mt-5 text-[14px] leading-7 text-[var(--enk-on-dark-muted)]">
                <EditableText
                  value={cultureContent.description1 || "Our people build careers on real projects. Training is continuous, supervision is experienced, and safety is non-negotiable."}
                  pageSlug="careers"
                  sectionKey="culture"
                  field="description1"
                  multiline
                />
              </p>
              <p className="mt-4 text-[14px] leading-7 text-[var(--enk-on-dark-muted)]">
                <EditableText
                  value={cultureContent.description2 || "More than 500 professionals work across our engineering, operations and support teams."}
                  pageSlug="careers"
                  sectionKey="culture"
                  field="description2"
                  multiline
                />
              </p>

              <div className="mt-8 grid grid-cols-2 gap-6">
                <RecordMetric
                  label={cultureContent.stat1_label || "Team Members"}
                  value={cultureContent.stat1_value || "500+"}
                />
                <RecordMetric
                  label={cultureContent.stat2_label || "Years Experience"}
                  value={cultureContent.stat2_value || experienceYears}
                />
              </div>
            </div>

            <figure className="enk-figure self-start">
              <div className="enk-figure__media">
                <EditableImage
                  src={cultureContent.image || careersImages.culture}
                  alt="Enikkom Team"
                  className="enk-photo w-full h-[320px] md:h-[380px] object-cover"
                  pageSlug="careers"
                  sectionKey="culture"
                  field="image"
                />
              </div>
              <figcaption className="enk-figure__caption">
                <span className="enk-figure__text">
                  <span className="enk-figure__no">FIG 01</span>
                  Enikkom project personnel on site
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <CTABand
        headline="Ready to Join Us?"
        subhead="Send your CV and discipline of interest. The HR team responds when a matching role opens."
        eyebrow="Personnel"
        primaryCTA={{ label: "Submit Your CV", href: "mailto:careers@enikkom.com" }}
        secondaryCTA={{ label: "View projects", href: "/projects" }}
      />
    </Layout>
  );
}
