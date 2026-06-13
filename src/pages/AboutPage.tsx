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
  { year: "2016", title: "Africa's Longest Bundled Crossing", description: "Completed 12\"+3\" × 2.78km Otumara–Escravos bundled crossing for Saipem/SPDC — the longest bundled crossing in Africa at the time of completion.", icon: Award },
  { year: "2016", title: "Africa's Longest Single Drill", description: "Completed the 16\" × 3.1km Arepo/Imagbon line on the Atlas Cove–Mosimi Pipeline in April 2016 — Africa's longest single HDD drill at the time.", icon: Award },
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
        subtitle={heroContent.subtitle || "A leading indigenous EPCI company providing end-to-end engineering, procurement, fabrication, construction, and installation services for onshore and offshore pipelines and facilities across Nigeria since 1995."}
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
            className="rounded-[2rem] border border-border/60 bg-white px-6 py-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:px-8 lg:px-12 lg:py-12"
          >
            <div className="grid gap-10 xl:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] xl:gap-14">
              <div>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
                  {companyIntroduction.eyebrow}
                </p>
                <h2 className="mb-6 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                  {companyIntroduction.title}
                </h2>
                <p className="text-[17px] leading-8 text-slate-700 md:text-[18px]">
                  {companyIntroduction.lead}
                </p>
              </div>

              <div className="space-y-5 border-l-0 border-border/70 xl:border-l xl:pl-10">
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
              <div className="group relative min-h-[340px] overflow-hidden rounded-[1.75rem] border border-border/70 bg-slate-950">
                <EnhancedImage
                  src={aboutImages.introMain}
                  alt="Pipeline crew executing welding and line installation work"
                  tone="cinematic"
                  hoverZoom
                  wrapperClassName="absolute inset-0"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: "center 48%" }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#071630]/82 via-[#071630]/36 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
                    Built In-Country
                  </div>
                  <h3 className="max-w-md text-[24px] font-bold leading-tight text-white md:text-[30px]">
                    Engineering Depth Backed by Field Precision
                  </h3>
                  <p className="mt-3 max-w-lg text-[14px] leading-7 text-white/70">
                    The group combines indigenous operating knowledge, specialist HDD capability,
                    and disciplined project delivery across complex terrains in Nigeria.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div className="group relative min-h-[160px] overflow-hidden rounded-[1.5rem] border border-border/70 bg-slate-900">
                  <EnhancedImage
                    src={aboutImages.introSideField}
                    alt="Enikkom field team reviewing live pipeline operations"
                    tone="cinematic"
                    hoverZoom
                    wrapperClassName="absolute inset-0"
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: "center 45%" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071630]/90 via-[#071630]/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                      Field Leadership
                    </div>
                    <p className="mt-1 text-[13px] leading-6 text-white/75">
                      People, process, and technical control on site.
                    </p>
                  </div>
                </div>

                <div className="group relative min-h-[160px] overflow-hidden rounded-[1.5rem] border border-border/70 bg-slate-900">
                  <EnhancedImage
                    src={aboutImages.introSideRiver}
                    alt="River-crossing installation works on a coastal project corridor"
                    tone="cinematic"
                    hoverZoom
                    wrapperClassName="absolute inset-0"
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: "center 52%" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071630]/90 via-[#071630]/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                      River & Swamp Delivery
                    </div>
                    <p className="mt-1 text-[13px] leading-6 text-white/75">
                      Specialist execution across crossings and sensitive corridors.
                    </p>
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
                    className="rounded-[1.75rem] border border-border/70 bg-slate-50/80 p-6 md:p-7"
                  >
                    <div className="mb-5 flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
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
      <section className="bg-charcoal section-padding relative overflow-hidden">
        <div className="container-wide relative z-10">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
              <Target className="h-3.5 w-3.5" />
              Purpose & Standards
            </div>
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">
              Mission, Vision & Corporate Excellence
            </h2>
            <p className="mx-auto max-w-3xl text-[15px] leading-7 text-white/65 md:text-[16px]">
              Updated directly from the latest corporate documents to reflect the current direction of the Enikkom Group.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mb-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]"
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
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#071630]/35" />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-10">
                <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
                  Indigenous Strength
                </div>
                <h3 className="text-[28px] font-bold leading-tight text-white md:text-[34px]">
                  Standards, Discipline, and Real Operating Experience
                </h3>
                <p className="mt-4 max-w-xl text-[15px] leading-7 text-white/65">
                  Enikkom's long-term advantage is not only equipment or reach. It is the ability
                  to combine field-tested leadership, technical depth, and operational resilience
                  under the realities of Nigerian terrain and project pressure.
                </p>
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
                  className="rounded-[1.75rem] border border-white/10 bg-white/6 p-7 backdrop-blur-sm"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/45">
                    {statement.title}
                  </p>
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
            className="mt-10 rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-10"
          >
            <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-white md:text-3xl">
                  The PRICE of Excellence
                </h3>
                <p className="mt-2 text-[14px] leading-7 text-white/55">
                  Performance, Resilience, Innovation, Care, and Expertise continue to shape how we deliver.
                </p>
              </div>
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
                    className="rounded-[1.25rem] border border-white/10 bg-black/10 p-5"
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/12">
                      <Icon className="h-5 w-5 text-primary" />
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
      <section className="section-padding bg-slate-50 dark:bg-background relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
        
        <div className="container-wide">
          <motion.div 
            className="text-center mb-16 md:mb-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-widest mb-4">
              Our Journey
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">34 Years of Experience</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              From our founding in 1995 to becoming West Africa's leading HDD and pipeline contractor, our trajectory is defined by continuous innovation.
            </p>
          </motion.div>
          
          {/* Timeline */}
          <div className="relative max-w-5xl mx-auto">
            {/* Centered Timeline line */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-primary/10 via-border to-primary/10" />
            
            <div className="space-y-12 lg:space-y-20">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
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
                    <div className="bg-card p-6 md:p-8 rounded-2xl border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 inline-block w-full lg:max-w-lg group">
                      <span className="text-primary font-bold text-sm tracking-wider uppercase mb-2 block lg:hidden">{milestone.year}</span>
                      <h5 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">{milestone.title}</h5>
                      <p className="text-[15px] text-muted-foreground leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Year marker with icon */}
                  <div className="relative z-10 flex-shrink-0 hidden lg:flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex flex-col items-center justify-center shadow-lg border-4 border-slate-50 dark:border-background transform hover:scale-110 transition-transform duration-300">
                      <milestone.icon className="h-5 w-5 mb-1" />
                      <span className="font-bold text-[13px] tracking-wide">{milestone.year}</span>
                    </div>
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
