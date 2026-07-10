import { Layout } from "@/components/layout";
import SEO from "@/components/ui/SEO";
import { Link } from "react-router-dom";
import { Hero, CTABand } from "@/components/sections";
import { ArrowRight, ArrowUpRight, Youtube } from "lucide-react";
import { EditableText } from "@/components/content";
import { usePageContent } from "@/hooks/useSiteSettings";
import { DocumentCard, FieldFigure } from "@/components/records";
import { SectionHeading } from "@/components/home/SectionHeading";
import { siteImageSelections } from "@/content/siteImageSelections";

const brochures = [
  {
    title: "ECL Project Brochure - Part 1",
    description: "Project portfolio covering our HDD crossings, pipeline construction, and major infrastructure works across Nigeria.",
    type: "PDF",
    size: "8.2 MB",
    url: "/downloads/ECL_Project_Brochure_Part1.pdf",
  },
  {
    title: "ECL Project Brochure - Part 2",
    description: "Continued portfolio featuring additional projects including marine works, dredging, and equipment fleet details.",
    type: "PDF",
    size: "7.5 MB",
    url: "/downloads/ECL_Project_Brochure_Part2.pdf",
  },
  {
    title: "Enikkom Company Profile",
    description: "Official corporate profile covering the company's capabilities, equipment fleet, track record, and service offerings.",
    type: "PDF",
    size: "3.8 MB",
    url: "/downloads/Enikkom_Company_Profile.pdf",
  },
] as const;

const registerCrossRefs = [
  { title: "HDD Equipment Specifications", description: "Model-level HDD, thrust boring, microtunneling, marine, and support-fleet tables from the technical capacity schedule.", href: "/equipment#hdd" },
  { title: "General Equipment Fleet", description: "Full equipment fleet including thrust boring, micro tunnelling, marine, and support equipment.", href: "/equipment" },
  { title: "Full Project Register", description: "The complete register of completed crossings, pipelines and marine works.", href: "/projects#record" },
] as const;

const compliancePermits = [
  {
    title: "DPR / NUPRC Permit Bundle 2026",
    authority: "NUPRC",
    description:
      "Current permit bundle covering dredging, drilling and production, offshore pipeline laying, and special transportation services.",
    href: "/downloads/compliance/dpr-nuprc-permits-2026-merged.pdf",
  },
] as const;

const compliancePolicies = [
  {
    title: "Community Management Policy",
    description: "Current community relations policy statement for stakeholder and host-community engagement.",
    href: "/downloads/compliance/community-management-policy.pdf",
  },
  {
    title: "Quality Policy",
    description: "Current quality policy statement extracted from the approved QA/QC manual.",
    href: "/downloads/compliance/quality-policy-statement.pdf",
  },
  {
    title: "Security Policy",
    description: "Current security policy statement covering personnel, property, and operational protection.",
    href: "/downloads/compliance/security-policy.pdf",
  },
  {
    title: "Safety Policy",
    description: "Current occupational health and safety policy statement from the approved HSE pack.",
    href: "/downloads/compliance/safety-policy.pdf",
  },
] as const;

const industryLinks = [
  { title: "Nigerian Content Development", description: "NCDMB guidelines and requirements for Nigerian content compliance", url: "https://ncdmb.gov.ng" },
  { title: "NUPRC Guidelines", description: "Nigerian Upstream Petroleum Regulatory Commission standards", url: "https://nuprc.gov.ng" },
  { title: "NIPEX Portal", description: "Nigerian Petroleum Exchange contractor registration portal", url: "https://nipex.gov.ng" },
] as const;

export default function ResourcesPage() {
  const { content } = usePageContent('resources');
  const resourceImages = siteImageSelections.resources;

  const heroContent = content.hero || {};
  const brochuresContent = content.brochures || {};
  const videoContent = content.video || {};

  return (
    <Layout>
      <SEO
        title="Resources – Brochures, Videos & Compliance – Enikkom"
        description="Download Enikkom's company profile, project brochures, policy statements, and regulatory permits, plus project documentary videos."
        canonical="/resources"
      />
      <Hero
        title={heroContent.title || "Resources & Downloads"}
        subtitle={heroContent.subtitle || "Download our project brochures, company profile, technical documents, and watch our operations in action."}
        badge="Document Library"
        backgroundImage={heroContent.backgroundImage || resourceImages.hero}
        size="default"
      />

      {/* Brochures & profile */}
      <section className="enk-section" style={{ borderBottom: "1px solid var(--enk-rule)" }}>
        <div className="enk-container">
          <SectionHeading
            kicker={<EditableText
              value={brochuresContent.eyebrow || "Downloads"}
              pageSlug="resources"
              sectionKey="brochures"
              field="eyebrow"
            />}
            title={<EditableText
              value={brochuresContent.title || "Company & Project Brochures"}
              pageSlug="resources"
              sectionKey="brochures"
              field="title"
            />}
            intro={<EditableText
              value={brochuresContent.description || "Download our official brochures with detailed information on capabilities, projects, and equipment."}
              pageSlug="resources"
              sectionKey="brochures"
              field="description"
            />}
          />

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {brochures.map((item) => (
              <DocumentCard
                key={item.title}
                docType="Brochure"
                title={item.title}
                description={item.description}
                meta={[
                  { label: "Format", value: item.type },
                  { label: "Size", value: item.size },
                ]}
                href={item.url}
                actionLabel="Open document"
              />
            ))}
          </div>

          {/* Register cross-references */}
          <div className="mt-12 max-w-3xl">
            <SectionHeading
              kicker="Cross-Reference"
              title={<>Technical Registers on This Site</>}
              intro="Equipment schedules and the project register are maintained as live pages rather than static files."
            />
            <ul className="mt-6 border-t-2" style={{ borderColor: "var(--enk-rule-heavy)" }}>
              {registerCrossRefs.map((item, i) => (
                <li
                  key={item.href}
                  className="border-b"
                  style={{
                    borderColor: "var(--enk-rule)",
                    backgroundColor: i % 2 === 1 ? "var(--enk-ledger-row-alt)" : undefined,
                  }}
                >
                  <Link
                    to={item.href}
                    className="group flex items-baseline justify-between gap-6 px-1 py-3 focus-ring rounded-sm sm:px-3"
                  >
                    <span>
                      <span className="block text-[14px] font-semibold text-[var(--enk-ink)] group-hover:text-[var(--enk-accent-on-dark)]">
                        {item.title}
                      </span>
                      <span className="mt-0.5 block text-[12.5px] leading-5 text-[var(--enk-steel)]">
                        {item.description}
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 self-center text-[var(--enk-accent-on-dark)] transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Featured Video */}
      <section id="videos" className="enk-section scroll-mt-24" style={{ backgroundColor: "var(--enk-bg-muted)", borderBottom: "1px solid var(--enk-rule)" }}>
        <div className="enk-container">
          <SectionHeading
            onDark
            kicker={<EditableText
              value={videoContent.eyebrow || "Field Documentation"}
              pageSlug="resources"
              sectionKey="video"
              field="eyebrow"
            />}
            title={<EditableText
              value={videoContent.title || "OML34 Continuous HDD Project Video"}
              pageSlug="resources"
              sectionKey="video"
              field="title"
            />}
            intro={<EditableText
              value={videoContent.description || "Watch the documentary of Nigeria's longest functional Continuous HDD - 12km of 10\" pipeline installation."}
              pageSlug="resources"
              sectionKey="video"
              field="description"
            />}
          />

          <div className="mx-auto mt-8 max-w-4xl">
            <FieldFigure
              figNo="VID 01"
              caption='OML34 Continuous HDD — 10" × 12km project review'
              location="Utorogun, Delta State"
              ratio="16/9"
            >
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/uv_ozmjIo-E?rel=0"
                title="OML34 Continuous HDD Project Review"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
                style={{ border: 0 }}
              />
            </FieldFigure>

            <div className="mt-5">
              <a
                href="https://www.youtube.com/@enikkomconstruction"
                target="_blank"
                rel="noopener noreferrer"
                className="enk-mono inline-flex items-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-[var(--enk-accent-on-dark)] transition-colors hover:text-[var(--enk-accent-primary-on-dark)] focus-ring rounded-sm"
              >
                <Youtube className="h-4 w-4" aria-hidden="true" />
                View all videos on YouTube
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Library */}
      <section className="enk-section" style={{ borderBottom: "1px solid var(--enk-rule)" }}>
        <div className="enk-container">
          <SectionHeading
            kicker="Compliance"
            title={<>Certifications, Permits &amp; Policies</>}
            intro="Download the current compliance files sourced directly from the supplied corporate document pack."
          />

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {compliancePermits.map((permit) => (
              <DocumentCard
                key={permit.title}
                docType="Permit"
                title={permit.title}
                description={permit.description}
                meta={[{ label: "Authority", value: permit.authority }]}
                href={permit.href}
                actionLabel="Open document"
                stamp={{ label: "Current", tone: "qhse" }}
              />
            ))}
            {compliancePolicies.map((policy) => (
              <DocumentCard
                key={policy.title}
                docType="Policy"
                title={policy.title}
                description={policy.description}
                href={policy.href}
                actionLabel="View policy"
                stamp={{ label: "On File", tone: "neutral" }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Industry Links */}
      <section className="enk-section" style={{ backgroundColor: "var(--enk-bg-muted)", borderBottom: "1px solid var(--enk-rule)" }}>
        <div className="enk-container">
          <SectionHeading
            kicker="Industry"
            title={<>Industry Resources</>}
            intro="Useful links to Nigerian oil & gas regulatory bodies."
          />

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {industryLinks.map((link) => (
              <DocumentCard
                key={link.title}
                docType="External Registry"
                title={link.title}
                description={link.description}
                href={link.url}
                actionLabel="Visit registry"
              />
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="Need a document that isn't listed?"
        subhead="Prequalification packs, equipment schedules and certificates are compiled on request for tender review."
        primaryCTA={{ label: "Request Document Pack", href: "/contact" }}
        secondaryCTA={{ label: "View Project Records", href: "/projects" }}
      />
    </Layout>
  );
}
