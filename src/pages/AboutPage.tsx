import { Layout } from "@/components/layout";
import { Hero, CTABand, KPIStatsBand, CertificationsBlock } from "@/components/sections";
import { motion } from "framer-motion";
import { Users, Target, Award, Building, CheckCircle, Lightbulb, Heart, Rocket, Handshake, ShieldCheck, Ship, Trophy, TrendingUp, Globe, type LucideIcon } from "lucide-react";
import { EditableText } from "@/components/admin";
import { usePageContent } from "@/hooks/useSiteSettings";

// Import unique hero image for About page (avoiding third-party branding)
import heroAbout from "@/assets/projects/hdd-equipment-fleet-3.jpg";

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
  { year: "2012", title: "Strategic Partnership", description: "Formed strategic partnership with HDDThailand, gaining access to advanced trenchless technology and expertise.", icon: Handshake },
  { year: "2015", title: "ISO Certifications", description: "Achieved ISO 9001, 14001, and OHSAS 18001 certifications, demonstrating commitment to quality, safety, and environmental standards.", icon: ShieldCheck },
  { year: "2016", title: "Africa's Longest Bundled", description: "Completed 12\"+3\" x 2.78km Otumara-Escravos bundled crossing - longest in Africa at the time for Saipem/SPDC.", icon: Award },
  { year: "2017", title: "Africa's Longest Drill", description: "Completed the 16\" x 3.1km Atlas Cove-Mosimi HDD - Africa's longest single drill for NNPC/PPMC.", icon: Award },
  { year: "2020", title: "Regional Leadership", description: "HDDThailand-Enikkom Ltd formed; became West Africa's largest HDD fleet operator with 10+ maxi rigs up to 500T.", icon: Trophy },
  { year: "2021", title: "Nigeria's Longest CHDD", description: "Commenced 10\" x 12km OML34 continuous HDD project for NPDC - longest functional CHDD in Nigeria.", icon: Rocket },
  { year: "2025", title: "30 Years Excellence", description: "30 years of excellence - Over 100km HDD installed, 500+ workforce, zero LTI, and 92% Nigerian content.", icon: Award },
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
  const introContent = content.introduction || {};
  
  return (
    <Layout>
      <Hero
        title={heroContent.title || "About Enikkom Construction"}
        subtitle={heroContent.subtitle || "Nigeria's foremost indigenous trenchless engineering and construction company, delivering excellence in HDD, pipeline construction, dredging, and marine civil works since 1995."}
        badge={heroContent.badge || "Since 1995"}
        primaryCTA={{ label: heroContent.primaryBtnText || "Discuss Your Project", href: heroContent.primaryBtnLink || "/contact" }}
        backgroundImage={heroContent.backgroundImage || heroAbout}
        size="default"
        pageSlug="about"
        sectionKey="hero"
        imageField="backgroundImage"
      />

      {/* Company Introduction with Live Editing */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-[11px] md:text-xs font-semibold uppercase tracking-widest text-primary mb-3">
                <EditableText
                  value={introContent.subtitle || "Our Story"}
                  pageSlug="about"
                  sectionKey="introduction"
                  field="subtitle"
                />
              </p>
              <h2 className="mb-5">
                <EditableText
                  value={introContent.title || "Building Nigeria's Infrastructure Since 1995"}
                  pageSlug="about"
                  sectionKey="introduction"
                  field="title"
                />
              </h2>
              <div className="space-y-4 text-[14px] md:text-[15px] text-muted-foreground leading-relaxed">
                <p>
                  <EditableText
                    value={introContent.paragraph1 || "Founded in 1995 by Engr. Edward Amene after 14 years as a Project Engineer with Shell, Enikkom Construction Limited pioneered Horizontal Directional Drilling (HDD) technology in Nigeria with the historic River Niger crossing in 2003."}
                    pageSlug="about"
                    sectionKey="introduction"
                    field="paragraph1"
                    multiline
                  />
                </p>
                <p>
                  <EditableText
                    value={introContent.paragraph2 || "Today, we are the trusted partner for major oil & gas operators including Shell, Dangote, Saipem, NNPC, and Chevron. Our strategic partnership with HDDThailand and ownership of West Africa's largest fleet of HDD rigs (10+ maxi rigs up to 500T pullback) positions us as the region's premier trenchless contractor."}
                    pageSlug="about"
                    sectionKey="introduction"
                    field="paragraph2"
                    multiline
                  />
                </p>
                <p>
                  <EditableText
                    value={introContent.paragraph3 || "We hold the records for Nigeria's longest single drill (3.1km), deepest crossing (80m), and largest pipeline crossing (40\"). With a 92% Nigerian content rating and a highly skilled workforce of 500+, we deliver projects that meet international standards."}
                    pageSlug="about"
                    sectionKey="introduction"
                    field="paragraph3"
                    multiline
                  />
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: Building, value: "30", label: "Years in Business" },
                { icon: Award, value: "100+", label: "KM HDD Installed" },
                { icon: Users, value: "500+", label: "Workforce" },
                { icon: Target, value: "0", label: "LTI Record" },
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  className="bg-card p-5 rounded-[14px] border border-border text-center shadow-sm hover-lift"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.15 + index * 0.05 }}
                >
                  <stat.icon className="h-7 w-7 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision + Values */}
      <section className="bg-charcoal section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-[11px] md:text-xs font-semibold uppercase tracking-widest text-primary mb-3">Purpose</p>
              <h3 className="text-white text-[22px] md:text-[26px] font-semibold mb-6">Mission & Vision</h3>
              <div className="grid gap-4">
                <div className="bg-white/5 border border-white/10 rounded-[14px] p-5 hover:bg-white/8 transition-colors duration-200">
                  <h5 className="text-white font-semibold mb-2">Our Mission</h5>
                  <p className="text-white/70 text-[14px] md:text-[15px] leading-relaxed">
                    To offer innovative and cost effective solutions to our Clients through delivery of world-class engineering and construction services that meet the highest standards of quality, safety, and environmental responsibility.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-[14px] p-5 hover:bg-white/8 transition-colors duration-200">
                  <h5 className="text-white font-semibold mb-2">Our Vision</h5>
                  <p className="text-white/70 text-[14px] md:text-[15px] leading-relaxed">
                    To be the foremost and capable indigenous Engineering construction company in Nigeria, committed to pushing limits and breaking records in HDD, pipeline, and marine infrastructure delivery.
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p className="text-[11px] md:text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">The PRICE of Excellence</p>
              <h4 className="text-white font-semibold mb-5">Our Core Values</h4>
              <div className="space-y-3">
                {coreValues.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <motion.div 
                      key={value.title} 
                      className="flex items-center gap-3 p-3 rounded-[14px] bg-white/5 border border-white/10 hover:bg-white/8 transition-colors duration-200"
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h6 className="text-white font-semibold">{value.title}</h6>
                        <p className="text-white/60 text-xs">{value.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company History Timeline */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <motion.div 
            className="text-center mb-10 md:mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[11px] md:text-xs font-semibold uppercase tracking-widest text-primary mb-3">History</p>
            <h2 className="mb-3">30 Years of Excellence</h2>
            <p className="text-[14px] md:text-[15px] text-muted-foreground max-w-xl mx-auto">
              From founding in 1995 to becoming West Africa's leading HDD and pipeline contractor.
            </p>
          </motion.div>
          
          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-border" />
            
            <div className="space-y-6 lg:space-y-10">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className={`relative flex flex-col lg:flex-row items-center gap-4 lg:gap-8 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Content card */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className="bg-card p-5 rounded-[14px] border border-border shadow-sm inline-block max-w-md hover-lift">
                      <h5 className="text-[15px] md:text-[16px] font-semibold mb-2">{milestone.title}</h5>
                      <p className="text-[13px] text-muted-foreground leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Year marker with icon */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-brand-primary text-primary-foreground flex flex-col items-center justify-center shadow-lg">
                      <milestone.icon className="h-4 w-4 mb-0.5" />
                      <span className="font-bold text-[10px] md:text-[11px]">{milestone.year}</span>
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

      {/* Enikkom Group Structure */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[11px] md:text-xs font-semibold uppercase tracking-widest text-primary mb-3">Group Structure</p>
            <h2 className="mb-3">The Enikkom Group</h2>
            <p className="text-[14px] md:text-[15px] text-muted-foreground max-w-xl mx-auto">
              A diversified engineering and investment group with strategic partnerships across West Africa.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { 
                name: "EISNL", 
                fullName: "Enikkom Industrial Services Nig. Ltd", 
                description: "Parent company established in 1995, diversified investments across energy and infrastructure sectors.",
                icon: Building
              },
              { 
                name: "ECL", 
                fullName: "Enikkom Construction Limited", 
                description: "Core construction company incorporated March 2009, specializing in HDD, pipelines, and marine works.",
                icon: Handshake
              },
              { 
                name: "HDDThailand-Enikkom", 
                fullName: "HDDThailand-Enikkom Ltd (JV)", 
                description: "Joint venture formed May 2020 for advanced HDD technology transfer and ISO-9001 certified operations.",
                icon: Globe
              },
              { 
                name: "Pipeline Infrastructure JV", 
                fullName: "Pipeline Infrastructure Enikkom JV", 
                description: "Partnership with Ocean Marine Solutions for real-time pipeline security and monitoring services.",
                icon: ShieldCheck
              },
            ].map((company, index) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card-premium p-6 text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <company.icon className="h-7 w-7 text-primary" />
                </div>
                <h4 className="font-bold text-lg mb-1">{company.name}</h4>
                <p className="text-[11px] text-primary font-medium mb-3">{company.fullName}</p>
                <p className="text-[13px] text-muted-foreground leading-relaxed">{company.description}</p>
              </motion.div>
            ))}
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
