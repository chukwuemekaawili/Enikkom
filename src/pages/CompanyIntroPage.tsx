import { Layout } from "@/components/layout";
import { Hero, CTABand, AnimatedKPIBand } from "@/components/sections";
import { motion } from "framer-motion";
import { Target, Eye, Award, Users, Wrench, Shield, Lightbulb, Heart, Rocket, TrendingUp } from "lucide-react";
import { EditableText, EditableImage } from "@/components/admin";
import { usePageContent } from "@/hooks/useSiteSettings";

// Import authentic images from PDFs
import heroHddRig from "@/assets/projects/hdd-night-panorama.jpg";
import pipelineConstruction from "@/assets/projects/pipe-laying-crane.jpg";

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
  { year: "1995", event: "Engr. Edward Amene founded Enikkom Group in Lagos after 14 years with Shell" },
  { year: "2003", event: "Pioneered HDD technology in Nigeria with historic River Niger crossing" },
  { year: "2008", event: "Major fleet expansion with new HDD rigs and marine equipment" },
  { year: "2010", event: "Completed Nigeria's largest pipeline crossing - 40\" x 760m at 100ft depth (Yenagoa) for Daewoo/SPDC" },
  { year: "2012", event: "Strategic partnership formed with HDDThailand for advanced trenchless technology" },
  { year: "2015", event: "Achieved ISO 9001, 14001, and OHSAS 18001 certifications" },
  { year: "2016", event: "Completed Africa's longest bundled crossing - 12\"+3\" x 2.78km Otumara-Escravos for Saipem/SPDC" },
  { year: "2017", event: "Completed Africa's longest single drill - 16\" x 3.1km Atlas Cove-Mosimi for NNPC/PPMC" },
  { year: "2018", event: "Upgraded to ISO 45001 for occupational health and safety" },
  { year: "2020", event: "HDDThailand-Enikkom Ltd formed; became West Africa's largest HDD fleet operator" },
  { year: "2021", event: "Commenced 10\" x 12km OML34 CHDD project - Nigeria's longest continuous HDD" },
  { year: "2025", event: "30 years of excellence - Over 100km HDD installed, zero LTI record, 92% Nigerian content" },
];

export default function CompanyIntroPage() {
  const { content } = usePageContent('company-intro');
  
  const heroContent = content.hero || {};
  const aboutContent = content.about || {};
  const missionContent = content.mission || {};
  const timelineContent = content.timeline || {};

  return (
    <Layout>
      <Hero
        title={heroContent.title || "Company Introduction"}
        subtitle={heroContent.subtitle || "Nigeria's foremost indigenous trenchless engineering and construction company since 1995."}
        backgroundImage={heroContent.backgroundImage || heroHddRig}
        size="default"
        pageSlug="company-intro"
        sectionKey="hero"
        imageField="backgroundImage"
      />

      {/* Company Overview */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="mb-6">
                <EditableText
                  value={aboutContent.title || "Who We Are"}
                  pageSlug="company-intro"
                  sectionKey="about"
                  field="title"
                />
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <EditableText
                  value={aboutContent.paragraph1 || "Enikkom Construction Limited is a wholly Nigerian owned and managed engineering and construction company, established in 1995 by Engr. Edward Amene after 14 years as a Project Engineer with Shell Petroleum Development Company."}
                  pageSlug="company-intro"
                  sectionKey="about"
                  field="paragraph1"
                  multiline
                />
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <EditableText
                  value={aboutContent.paragraph2 || "In 2003, we pioneered Horizontal Directional Drilling (HDD) technology in Nigeria with the historic River Niger crossing, establishing the company as the technical leader in trenchless technology across West Africa."}
                  pageSlug="company-intro"
                  sectionKey="about"
                  field="paragraph2"
                  multiline
                />
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <EditableText
                  value={aboutContent.paragraph3 || "Today, we operate West Africa's largest fleet of HDD rigs (10+ maxi rigs up to 500T pullback) through our strategic partnership with HDDThailand, and hold the records for Nigeria's longest single drill (3.1km) and deepest crossing (80m)."}
                  pageSlug="company-intro"
                  sectionKey="about"
                  field="paragraph3"
                  multiline
                />
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <EditableText
                  value={aboutContent.paragraph4 || "With a 92% Nigerian content rating and a highly skilled indigenous workforce of 500+, we deliver complex infrastructure projects for major IOCs and operators including Shell, Dangote, Saipem, NNPC, and Chevron."}
                  pageSlug="company-intro"
                  sectionKey="about"
                  field="paragraph4"
                  multiline
                />
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <EditableImage
                src={aboutContent.image || pipelineConstruction}
                alt="Enikkom pipeline construction"
                className="rounded-lg shadow-lg w-full"
                pageSlug="company-intro"
                sectionKey="about"
                field="image"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-lg shadow-lg">
                <p className="text-4xl font-bold">
                  <EditableText
                    value={aboutContent.badge_value || "29+"}
                    pageSlug="company-intro"
                    sectionKey="about"
                    field="badge_value"
                  />
                </p>
                <p className="text-sm">
                  <EditableText
                    value={aboutContent.badge_label || "Years of Excellence"}
                    pageSlug="company-intro"
                    sectionKey="about"
                    field="badge_label"
                  />
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision - Updated from Enikkom documents */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-card p-8 rounded-lg border"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                <EditableText
                  value={missionContent.mission_title || "Our Mission"}
                  pageSlug="company-intro"
                  sectionKey="mission"
                  field="mission_title"
                />
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                <EditableText
                  value={missionContent.mission_text || "To offer innovative and cost effective solutions to our Clients through the delivery of world-class engineering and construction services that meet the highest standards of quality, safety, and environmental responsibility."}
                  pageSlug="company-intro"
                  sectionKey="mission"
                  field="mission_text"
                  multiline
                />
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-card p-8 rounded-lg border"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                <EditableText
                  value={missionContent.vision_title || "Our Vision"}
                  pageSlug="company-intro"
                  sectionKey="mission"
                  field="vision_title"
                />
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                <EditableText
                  value={missionContent.vision_text || "To be the foremost and capable indigenous Engineering construction company in Nigeria, committed to pushing limits and breaking records in HDD, pipeline, and marine infrastructure delivery."}
                  pageSlug="company-intro"
                  sectionKey="mission"
                  field="vision_text"
                  multiline
                />
              </p>
            </motion.div>
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
                value={timelineContent.title || "30 Years of Excellence"}
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