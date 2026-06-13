import { Layout } from "@/components/layout";
import { Hero, CTABand, AnimatedKPIBand } from "@/components/sections";
import { motion } from "framer-motion";
import { Award, Building, Globe, Heart, Lightbulb, Rocket, Shield, Target, TrendingUp } from "lucide-react";
import { EditableText } from "@/components/admin";
import { usePageContent } from "@/hooks/useSiteSettings";
import { companyIntroduction, corporateStatements, corporateStructureChart } from "@/content/companyProfile";
import { EnhancedImage } from "@/components/ui/enhanced-image";
import { siteImageSelections } from "@/content/siteImageSelections";

// PRICE Core Values from Enikkom documents
const coreValues = [
  {
    icon: TrendingUp,
    title: "Performance",
    description: "Delivering results that exceed expectations on every project.",
  },
  {
    icon: Shield,
    title: "Resilience",
    description: "Thriving in Nigeria's toughest terrains and conditions.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Pioneering advanced technologies like HDD in Nigeria's oil and gas sector.",
  },
  {
    icon: Heart,
    title: "Care",
    description: "Prioritizing safety, community, and environmental responsibility.",
  },
  {
    icon: Award,
    title: "Expertise",
    description: "Decades of specialized experience across HDD, pipeline, and marine works.",
  },
];

// Verified milestones from Enikkom documents
const milestones = [
  { year: "1995", event: "Engr. Edward Amene founded Enikkom Group in Lagos after 14 years as a Project Engineer with SPDC" },
  { year: "2003", event: "Pioneered HDD technology in Nigeria with the historic first crossing of the River Niger" },
  { year: "2009", event: "Enikkom Construction Limited (ECL) incorporated in March 2009 as the primary operating entity" },
  { year: "2010", event: "Completed Nigeria's largest pipeline crossing — 40\" × 760m for Daewoo/SPDC at Yenagoa, Bayelsa State" },
  { year: "2013", event: "The E-Place Limited acquired the interest of EISNL in ECL, restructuring the Group's ownership" },
  { year: "2016", event: "Set three African records: longest single drill (16\"×3.1km), deepest crossing (36\"×1.2km, 80m) and longest bundled crossing (12\"+3\"×2.78km)" },
  { year: "2018", event: "Achieved ISO 9001:2015, ISO 14001:2015, and ISO 45001:2018 management system certifications" },
  { year: "2020", event: "HDDTEC Ltd formed in May 2020 by ECL and The E-Place Limited; operates Nigeria's largest in-country HDD fleet" },
  { year: "2021", event: "Commenced 10\" × 12km OML34 CHDD project for NPDC/ND Western — Nigeria's longest Continuous HDD" },
  { year: "2025", event: "34 years of experience — over 100km HDD installed, zero LTI record, and a proven in-country HDD fleet" },
];

export default function CompanyIntroPage() {
  const { content } = usePageContent('company-intro');
  const companyIntroImages = siteImageSelections.companyIntro;
  
  const heroContent = content.hero || {};
  const timelineContent = content.timeline || {};
  const timelineTitle =
    typeof timelineContent.title === "string" && timelineContent.title.toLowerCase().includes("year")
      ? "34 Years of Experience"
      : timelineContent.title || "34 Years of Experience";

  return (
    <Layout>
      <Hero
        title={heroContent.title || "Company Introduction"}
        subtitle={heroContent.subtitle || "Nigeria's foremost indigenous trenchless engineering and construction company since 1995."}
        backgroundImage={heroContent.backgroundImage || companyIntroImages.hero}
        size="default"
        pageSlug="company-intro"
        sectionKey="hero"
        imageField="backgroundImage"
      />

      {/* Company Introduction */}
      <section className="section-padding">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-6xl rounded-[2rem] border border-border/60 bg-white px-6 py-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:px-8 lg:px-12 lg:py-12"
          >
            <div className="grid gap-10 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:gap-14">
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
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <div className="mb-12 text-center">
            <p className="section-eyebrow mb-2">Purpose & Standards</p>
            <h2 className="mb-4">Mission, Vision & Corporate Excellence</h2>
            <p className="mx-auto max-w-3xl text-[15px] leading-7 text-muted-foreground md:text-[16px]">
              The current corporate statements below are taken directly from the latest approved company profile documents.
            </p>
          </div>

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
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="rounded-[1.75rem] border border-border/70 bg-card p-7 shadow-sm"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/80">
                    {statement.title}
                  </p>
                  <p className="text-[17px] leading-8 text-foreground md:text-[18px]">
                    {statement.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Values - PRICE */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center mb-12">
            <p className="section-eyebrow mb-2">Our Values</p>
            <h2 className="mb-4">The PRICE of Excellence</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Performance, Resilience, Innovation, Care, and Expertise - the principles that guide every project.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {coreValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-card p-6 rounded-lg border text-center hover-lift"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Structure */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <div className="text-center mb-12">
            <p className="section-eyebrow mb-2">Organization</p>
            <h2 className="mb-4">{corporateStructureChart.title}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {corporateStructureChart.description}
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-5xl rounded-[1.75rem] border border-border/70 bg-white p-4 shadow-sm overflow-hidden">
              <EnhancedImage
                src={corporateStructureChart.imagePath}
                alt={corporateStructureChart.alt}
                className="w-full h-auto object-contain rounded-xl"
                tone="natural"
                fallbackLabel={corporateStructureChart.title}
              />
              <p className="text-center text-[13px] text-muted-foreground mt-4 block md:hidden">
                {corporateStructureChart.mobileHint}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-charcoal text-white">
        <div className="container-wide">
          <div className="text-center mb-12">
            <p className="section-eyebrow mb-2">
              <EditableText
                value={timelineContent.eyebrow || "Our Journey"}
                pageSlug="company-intro"
                sectionKey="timeline"
                field="eyebrow"
              />
            </p>
            <h2 className="mb-4 text-white">
              <EditableText
                value={timelineTitle}
                pageSlug="company-intro"
                sectionKey="timeline"
                field="title"
              />
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              <EditableText
                value={timelineContent.description || "Key milestones in Enikkom's growth as Nigeria's leading engineering contractor."}
                pageSlug="company-intro"
                sectionKey="timeline"
                field="description"
              />
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-white/20" />
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className={`relative flex items-center mb-8 ${
                    index % 2 === 0 ? "justify-start" : "justify-end"
                  }`}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}>
                    <span className="text-primary font-bold text-lg">{milestone.year}</span>
                    <p className="text-white/80 text-sm mt-1">{milestone.event}</p>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-charcoal" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AnimatedKPIBand />

      <CTABand 
        headline="Partner with Nigeria's Leading Engineering Contractor"
        primaryCTA={{ label: "Contact Us", href: "/contact" }}
      />
    </Layout>
  );
}
