import { Layout } from "@/components/layout";
import SEO from "@/components/ui/SEO";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Hero, CTABand, KPIStatsBand } from "@/components/sections";
import { CertificationsBlock, FieldFigure, RecordEyebrow } from "@/components/records";
import { usePageContent } from "@/hooks/useSiteSettings";
import { SectionHeading } from "@/components/home/SectionHeading";
import {
  companyIntroduction,
  corporateStatements,
} from "@/content/companyProfile";
import { siteImageSelections } from "@/content/siteImageSelections";
import { experienceYears } from "@/content/home";

interface Milestone {
  year: string;
  title: string;
  description: string;
}

// Verified milestones from Enikkom documents
const milestones: Milestone[] = [
  { year: "1995", title: "Company Founded", description: "Engr. Edward Amene founded Enikkom Group in Lagos, Nigeria, after 14 years as a Project Engineer with Shell." },
  { year: "2003", title: "Historic HDD Milestone", description: "Pioneered HDD technology in Nigeria with the historic River Niger crossing, establishing the company as an industry leader." },
  { year: "2008", title: "Fleet Expansion", description: "Major investment in HDD rigs and marine equipment, expanding capabilities to serve major oil & gas operators." },
  { year: "2010", title: "Record Breaking", description: "Completed Nigeria's largest pipeline crossing - 40\" x 760m at 100ft depth in Yenagoa for Daewoo/SPDC." },
  { year: "2013", title: "Strategic Investment", description: "The E-Place Limited acquired the interest of EISNL in ECL, injecting fresh managerial capacity and positioning the company for accelerated growth." },
  { year: "2015", title: "ISO Certifications", description: "Achieved ISO 9001:2015, ISO 14001:2015, and ISO 45001:2018 certifications, confirming compliance with international quality, environmental, and safety management standards." },
  { year: "2016", title: "Africa's Longest Bundled Crossing", description: "Completed 12\"+3\" × 2.78km Otumara-Escravos bundled crossing for Saipem/SPDC, the longest bundled crossing in Africa at the time of completion." },
  { year: "2016", title: "Africa's Longest Single Drill", description: "Completed the 16\" × 3.1km Arepo/Imagbon line on the Atlas Cove-Mosimi Pipeline in April 2016, Africa's longest single HDD drill at the time." },
  { year: "2020", title: "Regional Leadership", description: "HDDThailand-Enikkom Ltd formed; became West Africa's largest HDD fleet operator with 10+ maxi rigs up to 500T." },
  { year: "2021", title: "Nigeria's Longest CHDD", description: "Commenced 10\" x 12km OML34 continuous HDD project for NPDC - longest functional CHDD in Nigeria." },
  { year: "2025", title: "30+ Years Experience", description: "Over 30 years of experience - Over 100km HDD installed, 500+ workforce, and a zero-LTI record across major project delivery." },
];

// PRICE Core Values from Enikkom documents
const coreValues = [
  { title: "Performance", description: "Delivering results that exceed expectations" },
  { title: "Resilience", description: "Thriving in Nigeria's toughest conditions" },
  { title: "Innovation", description: "Pioneering new technologies and methods" },
  { title: "Care", description: "Prioritizing safety and community" },
  { title: "Expertise", description: "Decades of specialized experience" },
];

export default function AboutPage() {
  const { content } = usePageContent('about');
  const heroContent = content.hero || {};
  const aboutImages = siteImageSelections.about;

  return (
    <Layout>
      <SEO
        title="About Enikkom – Engineering Contractor for HDD, Pipelines & Marine Civils"
        description="Indigenous Nigerian EPCI contractor since 1995 and pioneer of HDD in Nigeria — 30+ years delivering pipelines, dredging, and marine civil works."
        canonical="/about"
      />
      <Hero
        title={heroContent.title || "About Enikkom Group"}
        subtitle={heroContent.subtitle || "An indigenous EPCI company providing engineering, procurement, fabrication, construction, and installation services for onshore and offshore pipelines and facilities across Nigeria since 1995."}
        badge={heroContent.badge || "Company File · Est. 1995"}
        primaryCTA={{ label: heroContent.primaryBtnText || "Discuss Project Scope", href: heroContent.primaryBtnLink || "/contact" }}
        backgroundImage={heroContent.backgroundImage || aboutImages.hero}
        size="default"
      />

      {/* Company Introduction */}
      <section className="enk-section" style={{ borderBottom: "1px solid var(--enk-rule)" }}>
        <div className="enk-container">
          <div className="grid gap-10 xl:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] xl:gap-14">
            <div>
              <SectionHeading
                kicker={companyIntroduction.eyebrow}
                title={<>{companyIntroduction.title}</>}
                intro={companyIntroduction.lead}
                onDark
                align="left"
              />
            </div>

            <div className="space-y-5 xl:border-l xl:pl-10" style={{ borderColor: "var(--enk-rule)" }}>
              {companyIntroduction.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[14px] leading-7 text-[var(--enk-steel)] md:text-[15px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Field documentation plates */}
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <FieldFigure
              src={aboutImages.introMain}
              alt="Pipeline crew executing welding and line installation work"
              figNo="FIG 01"
              caption="Pipeline welding and line installation works"
              ratio="4/3"
            />
            <FieldFigure
              src={aboutImages.introSideField}
              alt="Enikkom field team reviewing live pipeline operations"
              figNo="FIG 02"
              caption="Field leadership — technical control on site"
              ratio="4/3"
            />
            <FieldFigure
              src={aboutImages.introSideRiver}
              alt="River-crossing installation works on a coastal project corridor"
              figNo="FIG 03"
              caption="River and swamp crossing delivery"
              ratio="4/3"
            />
          </div>

          {/* Group companies */}
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {companyIntroduction.subsidiaries.map((entry, index) => (
              <div key={entry.name} className="enk-doc-card p-5 md:p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="enk-overline">Group Company</p>
                  <span className="enk-mono text-[11px] font-medium text-[var(--enk-blueprint)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-3 font-heading text-[18px] font-semibold text-[var(--enk-ink)]">
                  {entry.name}
                </h3>
                <div className="mt-3 space-y-3">
                  {entry.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-[13.5px] leading-6 text-[var(--enk-steel)]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision & Corporate Excellence */}
      <section className="enk-section" style={{ backgroundColor: "var(--enk-bg-muted)", borderBottom: "1px solid var(--enk-rule)" }}>
        <div className="enk-container">
          <SectionHeading
            kicker="Purpose & Standards"
            title={<>Mission, Vision &amp; Corporate Excellence</>}
            intro="The mission, vision, and standards that guide how the Enikkom Group operates and grows."
            onDark
            align="left"
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {corporateStatements.map((statement) => (
              <div key={statement.key} className="enk-doc-card p-5 md:p-6">
                <p className="enk-overline">{statement.title}</p>
                <p className="mt-3 text-[15px] leading-7 text-[var(--enk-ink)] md:text-[16px]">
                  {statement.text}
                </p>
              </div>
            ))}
          </div>

          {/* Core values — PRICE register */}
          <div className="mt-12">
            <RecordEyebrow>Core Values</RecordEyebrow>
            <h3 className="enk-display mt-4 text-[clamp(1.2rem,2.2vw,1.5rem)] text-[var(--enk-ink)]">
              The PRICE of Excellence
            </h3>
            <div className="mt-6 grid gap-px overflow-hidden rounded-[var(--enk-radius-record)] border border-[var(--enk-rule-strong)] bg-[var(--enk-rule)] sm:grid-cols-2 xl:grid-cols-5">
              {coreValues.map((value, index) => (
                <div
                  key={value.title}
                  className="flex flex-col gap-2 p-5"
                  style={{ backgroundColor: "var(--enk-record-surface)" }}
                >
                  <span className="enk-mono text-[11px] font-semibold tracking-[0.1em] text-[var(--enk-accent-on-dark)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h4 className="text-[15px] font-semibold text-[var(--enk-ink)]">{value.title}</h4>
                  <p className="text-[12.5px] leading-6 text-[var(--enk-steel)]">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Operating context */}
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <FieldFigure
              src={aboutImages.missionBlock}
              alt="Enikkom team in active project review"
              figNo="FIG 04"
              caption="Project review in progress"
              ratio="16/10"
            />
            <div>
              <SectionHeading
                kicker="Indigenous Strength"
                title={<>Standards, Discipline, and Real Operating Experience</>}
                intro="Enikkom's long-term advantage is not only equipment or reach. It is the ability to combine field-tested leadership, technical depth, and operational resilience under the realities of Nigerian terrain and project pressure."
                onDark
                align="left"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Company History Register */}
      <section className="enk-section" style={{ borderBottom: "1px solid var(--enk-rule)" }}>
        <div className="enk-container">
          <SectionHeading
            kicker="Company History"
            title={<>{experienceYears} Years on Record</>}
            intro="From founding in 1995 to West Africa's leading HDD and pipeline contractor — the register of company milestones."
            align="left"
          />

          <div className="mx-auto mt-10 max-w-4xl border-t-2" style={{ borderColor: "var(--enk-rule-heavy)" }}>
            {milestones.map((milestone, index) => (
              <div
                key={`${milestone.year}-${milestone.title}`}
                className="grid gap-2 border-b py-5 sm:grid-cols-[88px_1fr] sm:gap-8"
                style={{
                  borderColor: "var(--enk-rule)",
                  backgroundColor: index % 2 === 1 ? "var(--enk-ledger-row-alt)" : undefined,
                }}
              >
                <span className="enk-mono px-1 text-[13px] font-semibold text-[var(--enk-accent-on-dark)] sm:pl-3">
                  {milestone.year}
                </span>
                <div className="px-1 sm:pr-3">
                  <h4 className="text-[15px] font-semibold text-[var(--enk-ink)]">{milestone.title}</h4>
                  <p className="mt-1 text-[13.5px] leading-6 text-[var(--enk-steel)]">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership teaser -> /about/leadership */}
      <section className="enk-section--tight" style={{ backgroundColor: "var(--enk-bg-muted)", borderBottom: "1px solid var(--enk-rule)" }}>
        <div className="enk-container">
          <div className="enk-doc-card mx-auto flex max-w-4xl flex-col items-start gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <SectionHeading
                kicker="Leadership"
                title={<>Led by Decades of Field-Tested Experience</>}
                intro="Our executive and board leadership bring pipeline, HDD, energy, and finance expertise built over careers with major operators, EPCs, and international specialists."
                onDark
                align="left"
              />
            </div>
            <Link to="/about/leadership" className="enk-btn enk-btn--gold shrink-0 whitespace-nowrap">
              View Leadership Team
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <CertificationsBlock />

      {/* KPIs */}
      <KPIStatsBand />

      {/* CTA */}
      <CTABand
        headline="Partner with Enikkom"
        primaryCTA={{ label: "Discuss Project Scope", href: "/contact" }}
        secondaryCTA={{ label: "View Project Records", href: "/projects" }}
      />
    </Layout>
  );
}
