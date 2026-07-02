import { Layout } from "@/components/layout";
import { Hero, CTABand, KPIStatsBand, CertificationsBlock } from "@/components/sections";
import { EnhancedImage } from "@/components/ui/enhanced-image";
import { motion } from "framer-motion";
import {
  Award,
  Building,
  Globe,
  Heart,
  Lightbulb,
  Rocket,
  ShieldCheck,
  Target,
  Trophy,
  TrendingUp,
  Handshake,
  type LucideIcon,
} from "lucide-react";
import { usePageContent } from "@/hooks/useSiteSettings";
import { SectionHeading } from "@/components/home/SectionHeading";
import {
  companyIntroduction,
  corporateStatements,
} from "@/content/companyProfile";
import { siteImageSelections } from "@/content/siteImageSelections";

interface Milestone {
  year: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

// Verified milestones from Enikkom documents
const milestones: Milestone[] = [
  { year: "1995", title: "Company Founded", description: "Engr. Edward Amene founded Enikkom Group in Lagos, Nigeria, after 14 years as a Project Engineer with Shell.", icon: Building },
  { year: "2003", title: "Historic HDD Milestone", description: "Pioneered HDD technology in Nigeria with the historic River Niger crossing, establishing the company as an industry leader.", icon: Rocket },
  { year: "2008", title: "Fleet Expansion", description: "Major investment in HDD rigs and marine equipment, expanding capabilities to serve major oil & gas operators.", icon: TrendingUp },
  { year: "2010", title: "Record Breaking", description: "Completed Nigeria's largest pipeline crossing - 40\" x 760m at 100ft depth in Yenagoa for Daewoo/SPDC.", icon: Trophy },
  { year: "2013", title: "Strategic Investment", description: "The E-Place Limited acquired the interest of EISNL in ECL, injecting fresh managerial capacity and positioning the company for accelerated growth.", icon: Handshake },
  { year: "2015", title: "ISO Certifications", description: "Achieved ISO 9001:2015, ISO 14001:2015, and ISO 45001:2018 certifications, confirming compliance with international quality, environmental, and safety management standards.", icon: ShieldCheck },
  { year: "2016", title: "Africa's Longest Bundled Crossing", description: "Completed 12\"+3\" × 2.78km Otumara-Escravos bundled crossing for Saipem/SPDC, the longest bundled crossing in Africa at the time of completion.", icon: Award },
  { year: "2016", title: "Africa's Longest Single Drill", description: "Completed the 16\" × 3.1km Arepo/Imagbon line on the Atlas Cove-Mosimi Pipeline in April 2016, Africa's longest single HDD drill at the time.", icon: Award },
  { year: "2020", title: "Regional Leadership", description: "HDDThailand-Enikkom Ltd formed; became West Africa's largest HDD fleet operator with 10+ maxi rigs up to 500T.", icon: Trophy },
  { year: "2021", title: "Nigeria's Longest CHDD", description: "Commenced 10\" x 12km OML34 continuous HDD project for NPDC - longest functional CHDD in Nigeria.", icon: Rocket },
  { year: "2025", title: "34 Years Experience", description: "34 years of experience - Over 100km HDD installed, 500+ workforce, and a zero-LTI record across major project delivery.", icon: Award },
];

// PRICE Core Values from Enikkom documents
const coreValues = [
  { icon: TrendingUp, title: "Performance", description: "Delivering results that exceed expectations" },
  { icon: ShieldCheck, title: "Resilience", description: "Thriving in Nigeria's toughest conditions" },
  { icon: Lightbulb, title: "Innovation", description: "Pioneering new technologies and methods" },
  { icon: Heart, title: "Care", description: "Prioritizing safety and community" },
  { icon: Award, title: "Expertise", description: "Decades of specialized experience" },
];

export default function AboutPage() {
  const { content } = usePageContent('about');
  const heroContent = content.hero || {};
  const aboutImages = siteImageSelections.about;
  
  return (
    <Layout>
      <Hero
        title={heroContent.title || "About Enikkom Group"}
        subtitle={heroContent.subtitle || "An indigenous EPCI company providing engineering, procurement, fabrication, construction, and installation services for onshore and offshore pipelines and facilities across Nigeria since 1995."}
        badge={heroContent.badge || "Since 1995"}
        primaryCTA={{ label: heroContent.primaryBtnText || "Discuss Your Project", href: heroContent.primaryBtnLink || "/contact" }}
        backgroundImage={heroContent.backgroundImage || aboutImages.hero}
        size="default"
        pageSlug="about"
        sectionKey="hero"
        imageField="backgroundImage"
      />

      {/* Company Introduction */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="enk-panel px-6 py-8 sm:px-8 lg:px-12 lg:py-12"
          >
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

              <div className="space-y-5 border-l-0 xl:border-l xl:pl-10" style={{ borderColor: "var(--enk-line)" }}>
                {companyIntroduction.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-[15px] leading-8 text-muted-foreground md:text-[16px]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
              <div className="enk-card group flex flex-col overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <EnhancedImage
                    src={aboutImages.introMain}
                    alt="Pipeline crew executing welding and line installation work"
                    tone="cinematic"
                    hoverZoom
                    wrapperClassName="absolute inset-0"
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: "center 48%" }}
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, oklch(0.13 0.03 255 / 0.5), transparent 55%)" }} aria-hidden="true" />
                  <span className="enk-chip enk-chip--on-dark absolute left-4 top-4">Built In-Country</span>
                </div>
                <div className="flex flex-col p-6" style={{ backgroundColor: "var(--enk-surface-card)" }}>
                  <h3 className="text-[17px] font-semibold leading-snug text-[var(--enk-on-dark)]">
                    Engineering Depth Backed by Field Precision
                  </h3>
                  <p className="mt-2 text-[13px] leading-6 text-[var(--enk-on-dark-muted)]">
                    Indigenous operating knowledge, specialist HDD capability, and disciplined project delivery across complex terrains.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div className="enk-card group flex flex-col overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <EnhancedImage
                      src={aboutImages.introSideField}
                      alt="Enikkom field team reviewing live pipeline operations"
                      tone="cinematic"
                      hoverZoom
                      wrapperClassName="absolute inset-0"
                      className="absolute inset-0 h-full w-full object-cover"
                      style={{ objectPosition: "center 45%" }}
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, oklch(0.13 0.03 255 / 0.5), transparent 55%)" }} aria-hidden="true" />
                    <span className="enk-chip enk-chip--on-dark absolute left-4 top-4">Field Operations</span>
                  </div>
                  <div className="flex flex-col p-5" style={{ backgroundColor: "var(--enk-surface-card)" }}>
                    <h4 className="text-[15px] font-semibold text-[var(--enk-on-dark)]">Field Leadership</h4>
                    <p className="mt-1 text-[13px] leading-6 text-[var(--enk-on-dark-muted)]">People, process, and technical control on site.</p>
                  </div>
                </div>

                <div className="enk-card group flex flex-col overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <EnhancedImage
                      src={aboutImages.introSideRiver}
                      alt="River-crossing installation works on a coastal project corridor"
                      tone="cinematic"
                      hoverZoom
                      wrapperClassName="absolute inset-0"
                      className="absolute inset-0 h-full w-full object-cover"
                      style={{ objectPosition: "center 52%" }}
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, oklch(0.13 0.03 255 / 0.5), transparent 55%)" }} aria-hidden="true" />
                    <span className="enk-chip enk-chip--on-dark absolute left-4 top-4">River & Swamp</span>
                  </div>
                  <div className="flex flex-col p-5" style={{ backgroundColor: "var(--enk-surface-card)" }}>
                    <h4 className="text-[15px] font-semibold text-[var(--enk-on-dark)]">River & Swamp Delivery</h4>
                    <p className="mt-1 text-[13px] leading-6 text-[var(--enk-on-dark-muted)]">Specialist execution across crossings and sensitive corridors.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {companyIntroduction.subsidiaries.map((entry, index) => {
                const Icon = index === 0 ? Building : Globe;
                return (
                  <div
                    key={entry.name}
                    className="enk-card p-6 md:p-7"
                  >
                    <div className="mb-5 flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted">
                        <Icon className="h-6 w-6" style={{ color: "var(--enk-accent-on-dark)" }} />
                      </div>
                      <h3 className="pt-1 text-xl font-semibold tracking-tight text-foreground">
                        {entry.name}
                      </h3>
                    </div>
                    <div className="space-y-4">
                      {entry.paragraphs.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="text-[14px] leading-7 text-muted-foreground md:text-[15px]"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision & Corporate Excellence */}
      <section className="section-padding relative overflow-hidden">
        <div className="container-wide relative z-10">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeading
              kicker="Purpose & Standards"
              title={<>Mission, Vision &amp; Corporate Excellence</>}
              intro="Updated directly from the latest corporate documents to reflect the current direction of the Enikkom Group."
              onDark
              align="center"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mb-10 overflow-hidden rounded-xl border border-white/10 bg-white/5"
          >
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative min-h-[280px]">
                <EnhancedImage
                  src={aboutImages.missionBlock}
                  alt="Enikkom team in active project review"
                  tone="cinematic"
                  hoverZoom
                  wrapperClassName="absolute inset-0"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: "center 42%" }}
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent, transparent, oklch(0.13 0.03 255 / 0.35))" }} />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-10">
                <SectionHeading
                  kicker="Indigenous Strength"
                  title={<>Standards, Discipline, and Real Operating Experience</>}
                  intro="Enikkom's long-term advantage is not only equipment or reach. It is the ability to combine field-tested leadership, technical depth, and operational resilience under the realities of Nigerian terrain and project pressure."
                  onDark
                  align="left"
                />
              </div>
            </div>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3">
            {corporateStatements.map((statement, index) => {
              const Icon =
                statement.key === "mission"
                  ? Target
                  : statement.key === "vision"
                    ? Rocket
                    : Award;

              return (
                <motion.div
                  key={statement.key}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="rounded-xl border border-white/10 bg-white/5 p-7"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                    <Icon className="h-6 w-6" style={{ color: "var(--enk-gold)" }} />
                  </div>
                  <p className="enk-kicker enk-kicker--on-dark mb-3">{statement.title}</p>
                  <p className="text-[18px] leading-8 text-white md:text-[19px]">
                    {statement.text}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-10 rounded-xl border border-white/10 bg-white/5 p-8 md:p-10"
          >
            <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                kicker="Core Values"
                title={<>The PRICE of Excellence</>}
                intro="Performance, Resilience, Innovation, Care, and Expertise continue to shape how we deliver."
                onDark
                align="left"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {coreValues.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.16 + index * 0.06 }}
                    className="rounded-xl border border-white/10 bg-white/5 p-5"
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                      <Icon className="h-5 w-5" style={{ color: "var(--enk-gold)" }} />
                    </div>
                    <h4 className="mb-2 text-[16px] font-semibold text-white">{value.title}</h4>
                    <p className="text-[13px] leading-6 text-white/55">{value.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company History Timeline */}
      <section className="section-padding bg-background relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
        
        <div className="container-wide">
          <motion.div
            className="mb-16 md:mb-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading
              kicker="Our Journey"
              title={<>34 Years of Experience</>}
              intro="From our founding in 1995 to becoming West Africa's leading HDD and pipeline contractor, our trajectory is defined by continuous innovation."
              align="center"
            />
          </motion.div>
          
          {/* Timeline */}
          <div className="relative max-w-5xl mx-auto">
            {/* Centered Timeline line */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-primary/10 via-border to-primary/10" />
            
            <div className="space-y-12 lg:space-y-20">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={`${milestone.year}-${milestone.title}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex flex-col lg:flex-row items-center gap-6 lg:gap-12 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Content card */}
                  <div className={`flex-1 w-full lg:w-auto ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className="enk-card enk-card--hover p-6 md:p-8 inline-block w-full lg:max-w-lg">
                      <span className="font-mono text-[13px] tracking-[0.14em] mb-2 block lg:hidden" style={{ color: "var(--enk-bronze)" }}>{milestone.year}</span>
                      <h5 className="text-xl font-bold mb-3 text-foreground">{milestone.title}</h5>
                      <p className="text-[15px] text-muted-foreground leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Year marker */}
                  <div className="relative z-10 flex-shrink-0 hidden lg:flex flex-col items-center justify-center w-20">
                    <span className="font-mono text-[13px] tracking-[0.14em]" style={{ color: "var(--enk-bronze)" }}>{milestone.year}</span>
                    <div className="mt-2 w-2 h-2 rounded-full border-2" style={{ borderColor: "var(--enk-navy)" }} />
                  </div>
                  
                  {/* Empty space for alternating layout */}
                  <div className="flex-1 hidden lg:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <CertificationsBlock />

      {/* KPIs */}
      <KPIStatsBand variant="dark" />

      {/* CTA */}
      <CTABand
        headline="Partner with Enikkom"
        primaryCTA={{ label: "Discuss Your Project", href: "/contact" }}
      />
    </Layout>
  );
}
