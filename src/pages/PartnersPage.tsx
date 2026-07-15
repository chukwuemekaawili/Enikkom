import { Layout } from "@/components/layout";
import SEO from "@/components/ui/SEO";
import { Hero, CTABand, LogoMarquee } from "@/components/sections";
import { ArrowUpRight } from "lucide-react";
import { EditableText } from "@/components/content";
import { SectionHeading } from "@/components/home/SectionHeading";
import { usePageContent } from "@/hooks/useSiteSettings";
import { EnhancedImage } from "@/components/ui/enhanced-image";
import { RecordStatusStamp } from "@/components/records";
import { siteImageSelections } from "@/content/siteImageSelections";
import { findBrandEntity } from "@/content/brandRegistry";

const defaultFeaturedPartners = [
  {
    name: "HDDThailand Co. Ltd",
    type: "Joint Venture Partner",
    since: "May 2020",
    description: "Thailand-based trenchless specialist with 15+ years international HDD experience across Asia, Africa and the Middle East. Provides advanced equipment, ISO 9001:2015 certified operations, and specialist engineer deployment to HDDTEC Ltd.",
    highlights: [
      "ISO 9001:2015 Certified Operations",
      "9 HDD Rigs In-Country (up to 500T pullback)",
      "Advanced Downhole Tool Technology",
      "International Engineer Exchange Programme",
    ],
    website: "https://hddthailand.com",
    logoSrc: findBrandEntity("hddthailand")?.logoSrc,
  },
  {
    name: "Ocean Marine Solutions (OMS)",
    type: "Strategic Partner",
    since: "2018",
    description: "Nigerian maritime security company providing real-time pipeline surveillance, leak detection, and vandalism prevention services.",
    highlights: [
      "24/7 Pipeline Monitoring",
      "Real-time Leak Detection Systems",
      "Anti-Vandalism Security Solutions",
      "Marine Asset Protection",
    ],
    website: "#",
  },
];

const jointVentures = [
  {
    name: "HDDTEC Ltd (HDDThailand-Enikkom)",
    description: "Formed in May 2020 by ECL and The E-Place Limited. Operates Nigeria's largest in-country HDD fleet, executing mega-scale trenchless crossings for IOCs and operators across Nigeria.",
    logoSrc: findBrandEntity("hddtec")?.logoSrc,
  },
  {
    name: "PIEJV (Pipeline Infrastructure Enikkom JV)",
    description: "Joint venture between Ocean Marine Solutions Ltd (OMS) and ECL, set up for infrastructure development, maintenance and management in the oil and gas industry. OMS, a pioneer private maritime security company operating a fleet of 40+ patrol boats in partnership with the Nigerian Navy, secures and maintains major crude pipelines including the Escravos–Warri, Bonny–Port Harcourt and Trans-Forcados systems.",
  },
];

// Technical, engineering and equipment partners, sourced verbatim from the
// company overview documents (ECL Group Website content Part b, H1.7.2–H1.7.5).
// Only facts stated in those documents are used; no websites or dates are
// asserted beyond what the source provides.
const technicalPartners = [
  {
    name: "American Augers Inc.",
    role: "HDD Rigs & Thrust Boring (USA)",
    description:
      "The world's leading manufacturer and supplier of auger boring machines and directional drills, with pullback force up to 1,100,000 lb (500 tons). American Augers manufactures the auger boring machines, directional drills, and fluid/mud systems used in the trenchless market.",
    highlights: [
      "Supplies Enikkom's HDD rigs and thrust boring machines, including spares",
      "Provides technical manpower for equipment start-up and maintenance",
      "Pullback force up to 500 tons (1,100,000 lb)",
    ],
  },
  {
    name: "Land and Marine Project Engineering Ltd",
    role: "HDD Engineering & Project Management",
    description:
      "A major player in the international oil industry and one of the foremost Horizontal Directional Drilling engineers and contractors in the world, providing engineering and drafting, project management, procurement, installation and commissioning services.",
    highlights: [
      "Provides Enikkom with HDD engineering and project management services",
      "Quality assurance procedures consistent with ISO 9001 certification",
    ],
  },
  {
    name: "Inrock Drilling Systems",
    role: "Guidance Systems & Drilling Fluids",
    description:
      "A major manufacturer of drilling systems, guidance systems, equipment systems and drilling fluids, with a strong reputation in safety and environmental management.",
    highlights: [
      "Supplies guidance systems, drilling fluids and equipment systems",
      "Provides competent personnel for down-hole survey works",
    ],
  },
  {
    name: "Mears Group, Inc.",
    role: "Marine HDD & Shore Approaches (USA)",
    description:
      "Founded in 1970, an engineering and construction company of over 500 employees and one of the largest HDD contractors in the world, specialising in marine HDD shore approaches and water-to-water crossings.",
    highlights: [
      "Technical service agreement with Enikkom for marine crossings",
      "Owns 26 HDD rigs; pullback up to 1,300,000 lb; pipe up to 60 inches",
      "Leader in shore approaches and water-to-water crossings",
    ],
  },
];

const partnershipBenefits = [
  {
    title: "Technology Transfer",
    description: "Access to modern HDD rigs, GPS guidance systems, and downhole tools from international partners.",
  },
  {
    title: "Technical Expertise",
    description: "International engineers and training programs supporting consistent execution on every project.",
  },
  {
    title: "Equipment Fleet",
    description: "Nigeria's largest in-country HDD fleet, 9 maxi rigs from 50T to 500T pullback capacity, all based in-country.",
  },
  {
    title: "24/7 Monitoring",
    description: "Real-time pipeline surveillance capabilities through our security partnership network.",
  },
  {
    title: "92% Local Content",
    description: "Maintaining NCDMB compliance while delivering international-standard project execution.",
  },
];

const certifications = [
  "ISO 9001:2015",
  "ISO 14001:2015",
  "ISO 45001:2018",
  "NIPEX Registration",
  "NCDMB Certification",
  "NPC License",
];

function HighlightLedger({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-4 border-t-2" style={{ borderColor: "var(--enk-rule-heavy)" }}>
      {items.map((item, i) => (
        <li
          key={item}
          className="flex items-baseline gap-3 border-b px-1 py-2"
          style={{
            borderColor: "var(--enk-rule)",
            backgroundColor: i % 2 === 1 ? "var(--enk-ledger-row-alt)" : undefined,
          }}
        >
          <span
            className="mt-[1px] inline-block h-[6px] w-[6px] shrink-0"
            style={{ backgroundColor: "var(--enk-accent-on-dark)" }}
            aria-hidden="true"
          />
          <span className="text-[13px] leading-6 text-[var(--enk-ink)]">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PartnersPage() {
  const { content } = usePageContent('partners');
  const partnerImages = siteImageSelections.partners;

  const heroContent = content.hero || {};
  const featuredContent = content.featured_partners || {};
  const benefitsContent = content.benefits || {};

  return (
    <Layout>
      <SEO
        title="Partners & Strategic Alliances – Enikkom"
        description="Enikkom's technical partnerships and joint ventures: HDDThailand (HDDTEC) and Ocean Marine Solutions (PIEJV), operating Nigeria's largest in-country HDD fleet."
        canonical="/partners"
      />
      <Hero
        title={heroContent.title || "Partners & Strategic Alliances"}
        subtitle={heroContent.subtitle || "Building Nigeria's infrastructure through technical partnerships and collaborations."}
        badge="Alliance Register"
        backgroundImage={heroContent.backgroundImage || partnerImages.hero}
        size="default"
      />

      {/* Featured Partners */}
      <section className="enk-section" style={{ borderBottom: "1px solid var(--enk-rule)" }}>
        <div className="enk-container">
          <SectionHeading
            kicker={featuredContent.eyebrow || "Strategic Alliances"}
            title={<EditableText value={featuredContent.title || "Our Featured Partners"} pageSlug="partners" sectionKey="featured_partners" field="title" />}
            intro={<EditableText value={featuredContent.description || "We collaborate with established international and local companies to deliver infrastructure projects."} pageSlug="partners" sectionKey="featured_partners" field="description" />}
            onDark
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {defaultFeaturedPartners.map((partner) => (
              <div key={partner.name} className="enk-doc-card flex flex-col p-0">
                {/* Typed header row */}
                <div className="flex min-h-[38px] items-center justify-between gap-3 border-b border-[var(--enk-rule)] px-5 py-1.5">
                  <p className="enk-overline !text-[10px]">{partner.type}</p>
                  <span className="enk-mono text-[11px] font-medium text-[var(--enk-blueprint)]">
                    Since {partner.since}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <div className="flex items-start gap-4">
                    {partner.logoSrc && (
                      <div className="enk-logo-card !mx-0 !h-14 !w-14 shrink-0 overflow-hidden !p-1.5">
                        <EnhancedImage
                          src={partner.logoSrc}
                          alt={partner.name}
                          wrapperClassName="h-full w-full bg-transparent"
                          className="h-full w-full"
                          fit="contain"
                          tone="logo"
                          shimmer={false}
                          sizes="56px"
                        />
                      </div>
                    )}
                    <h3 className="font-heading text-[18px] font-semibold leading-snug text-[var(--enk-ink)]">
                      {partner.name}
                    </h3>
                  </div>

                  <p className="mt-4 text-[13.5px] leading-6 text-[var(--enk-steel)]">
                    {partner.description}
                  </p>

                  <HighlightLedger items={partner.highlights} />

                  {partner.website !== "#" && (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-bold text-[var(--enk-accent-on-dark)] transition-colors hover:text-[var(--enk-accent-primary-on-dark)] focus-ring rounded-md"
                    >
                      Visit website
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Joint Venture Companies */}
      <section className="enk-section" style={{ backgroundColor: "var(--enk-bg-muted)", borderBottom: "1px solid var(--enk-rule)" }}>
        <div className="enk-container">
          <SectionHeading
            kicker="Joint Ventures"
            title={<>Our JV Companies</>}
            intro="Dedicated joint venture entities formed to deliver specialized services."
            onDark
          />

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {jointVentures.map((jv) => (
              <div key={jv.name} className="enk-doc-card p-5 md:p-6">
                <div className="flex items-start gap-4">
                  {jv.logoSrc && (
                    <div className="enk-logo-card !mx-0 !h-12 !w-12 shrink-0 overflow-hidden !p-1.5">
                      <EnhancedImage
                        src={jv.logoSrc}
                        alt={jv.name}
                        wrapperClassName="h-full w-full bg-transparent"
                        className="h-full w-full"
                        fit="contain"
                        tone="logo"
                        shimmer={false}
                        sizes="48px"
                      />
                    </div>
                  )}
                  <div>
                    <p className="enk-overline">Joint Venture</p>
                    <h4 className="mt-2 text-[16px] font-semibold text-[var(--enk-ink)]">{jv.name}</h4>
                    <p className="mt-2 text-[13.5px] leading-6 text-[var(--enk-steel)]">{jv.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical & Equipment Partners */}
      <section className="enk-section" style={{ borderBottom: "1px solid var(--enk-rule)" }}>
        <div className="enk-container">
          <SectionHeading
            kicker="Technical Alliances"
            title={<>Technical &amp; Equipment Partners</>}
            intro="International engineering, equipment and specialist partners that support Enikkom's directional drilling and marine crossing capability."
            onDark
          />

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {technicalPartners.map((partner) => (
              <div key={partner.name} className="enk-doc-card p-5 md:p-6">
                <p className="enk-overline">{partner.role}</p>
                <h3 className="mt-2 font-heading text-[17px] font-semibold text-[var(--enk-ink)]">
                  {partner.name}
                </h3>
                <p className="mt-3 text-[13.5px] leading-6 text-[var(--enk-steel)]">{partner.description}</p>
                <HighlightLedger items={partner.highlights} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="enk-section" style={{ backgroundColor: "var(--enk-bg-muted)", borderBottom: "1px solid var(--enk-rule)" }}>
        <div className="enk-container">
          <SectionHeading
            kicker={benefitsContent.eyebrow || "Capabilities"}
            title={<EditableText value={benefitsContent.title || "Partnership Benefits"} pageSlug="partners" sectionKey="benefits" field="title" />}
            intro={<EditableText value={benefitsContent.description || "Our strategic partnerships enable us to deliver exceptional value through technology, expertise, and resources."} pageSlug="partners" sectionKey="benefits" field="description" />}
            onDark
          />

          <div className="mt-8 grid gap-px overflow-hidden rounded-[var(--enk-radius-record)] border border-[var(--enk-rule-strong)] bg-[var(--enk-rule)] sm:grid-cols-2 xl:grid-cols-5">
            {partnershipBenefits.map((benefit) => (
              <div
                key={benefit.title}
                className="flex flex-col gap-2 p-5"
                style={{ backgroundColor: "var(--enk-record-surface)" }}
              >
                <h4 className="text-[15px] font-semibold text-[var(--enk-ink)]">{benefit.title}</h4>
                <p className="text-[12.5px] leading-6 text-[var(--enk-steel)]">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Major Clients */}
      <LogoMarquee />

      {/* Certifications */}
      <section className="enk-section" style={{ backgroundColor: "var(--enk-bg-muted)", borderBottom: "1px solid var(--enk-rule)" }}>
        <div className="enk-container">
          <SectionHeading
            kicker="Compliance"
            title={<>Certifications Through Partnerships</>}
            intro="Our partnerships enable us to maintain internationally recognized certifications and registrations."
            onDark
          />

          <div className="mt-8 flex flex-wrap gap-2.5">
            {certifications.map((cert) => (
              <RecordStatusStamp key={cert} tone="neutral">
                {cert}
              </RecordStatusStamp>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="Partner With Us"
        subhead="Interested in strategic collaboration? Put a proposal in front of the leadership team."
        primaryCTA={{ label: "Discuss Partnership Scope", href: "/contact" }}
        secondaryCTA={{ label: "View Capability Statements", href: "/capabilities" }}
      />
    </Layout>
  );
}
