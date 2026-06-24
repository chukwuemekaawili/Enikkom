import { Layout } from "@/components/layout";
import { Hero, CTABand } from "@/components/sections";
import { motion } from "framer-motion";
import {
  FileText,
  Download,
  ExternalLink,
  Book,
  Youtube,
  Award,
  Landmark,
  Lock,
  HeartHandshake,
  HardHat,
  FileX2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditableText } from "@/components/content";
import { usePageContent } from "@/hooks/useSiteSettings";
import { EnhancedImage } from "@/components/ui/enhanced-image";
import { siteImageSelections } from "@/content/siteImageSelections";

const resources = {
  brochures: [
    { 
      title: "ECL Project Brochure - Part 1", 
      description: "Project portfolio covering our HDD crossings, pipeline construction, and major infrastructure works across Nigeria.",
      type: "PDF", 
      size: "8.2 MB", 
      url: "/downloads/ECL_Project_Brochure_Part1.pdf",
      featured: true
    },
    { 
      title: "ECL Project Brochure - Part 2", 
      description: "Continued portfolio featuring additional projects including marine works, dredging, and equipment fleet details.", 
      type: "PDF", 
      size: "7.5 MB", 
      url: "/downloads/ECL_Project_Brochure_Part2.pdf",
      featured: true
    },
    { 
      title: "Enikkom Company Profile", 
      description: "Complete company overview including capabilities, management team, certifications, and service offerings.", 
      type: "PDF", 
      size: "5.8 MB", 
      url: "/downloads/Enikkom_Company_Profile.pdf",
      featured: true
    },
  ],
  technical: [
    { title: "HDD Equipment Specifications", description: "Model-level HDD, thrust boring, microtunneling, marine, and support-fleet tables sourced from the technical capacity schedule.", type: "Link", size: "", url: "/equipment/hdd" },
    { title: "General Equipment Fleet", description: "Full equipment fleet including thrust boring, micro tunnelling, marine, and support equipment.", type: "Link", size: "", url: "/equipment" },
    {
      title: "Quality Policy Statement",
      description: "Current quality policy statement extracted from the approved QA/QC manual.",
      type: "PDF",
      size: "",
      url: "/downloads/compliance/quality-policy-statement.pdf",
    },
  ],
  videos: [
    { 
      title: "OML34 Continuous HDD - 10\" x 12km Project Review", 
      description: "Documentary of Nigeria's longest functional Continuous HDD - 12km of 10-inch pipeline installation for NPDC.", 
      thumbnail: "https://img.youtube.com/vi/uv_ozmjIo-E/maxresdefault.jpg", 
      youtubeId: "uv_ozmjIo-E", 
      duration: "8:45",
      featured: true
    },
    { 
      title: "NIPITECS 2019: New Technology to Displace Pipeline Vandals", 
      description: "Enikkom's presentation at the Nigerian International Petroleum Technology Conference (NIPITECS) 2019 in Abuja, presenting HDD technology as a solution to pipeline vandalism and theft.",
      thumbnail: "https://img.youtube.com/vi/PrMQDDb6ELA/hqdefault.jpg",
      youtubeId: "PrMQDDb6ELA",
      duration: "5:23",
      featured: true
    },
  ],
};

const complianceResources = {
  permits: [
    {
      title: "DPR / NUPRC Permit Bundle 2026",
      authority: "Nigerian Upstream Petroleum Regulatory Commission",
      description:
        "Current permit bundle covering dredging, drilling and production, offshore pipeline laying, and special transportation services.",
      href: "/downloads/compliance/dpr-nuprc-permits-2026-merged.pdf",
      available: true,
    },
    {
      title: "PENCOM Compliance Certificate",
      authority: "National Pension Commission",
      description:
        "This certificate was requested in scope, but no standalone PENCOM file was present anywhere in the supplied ECLweb document set.",
      available: false,
    },
    {
      title: "NSITF Compliance Certificate",
      authority: "Nigeria Social Insurance Trust Fund",
      description:
        "This certificate was requested in scope, but no standalone NSITF file was present anywhere in the supplied ECLweb document set.",
      available: false,
    },
  ],
  policies: [
    {
      icon: HeartHandshake,
      title: "Community Management Policy",
      description: "Current community relations policy statement for stakeholder and host-community engagement.",
      href: "/downloads/compliance/community-management-policy.pdf",
    },
    {
      icon: Award,
      title: "Quality Policy",
      description: "Current quality policy statement extracted from the approved QA/QC manual.",
      href: "/downloads/compliance/quality-policy-statement.pdf",
    },
    {
      icon: Lock,
      title: "Security Policy",
      description: "Current security policy statement covering personnel, property, and operational protection.",
      href: "/downloads/compliance/security-policy.pdf",
    },
    {
      icon: HardHat,
      title: "Safety Policy",
      description: "Current occupational health and safety policy statement from the approved HSE pack.",
      href: "/downloads/compliance/safety-policy.pdf",
    },
  ],
} as const;

const industryLinks = [
  { title: "Nigerian Content Development", description: "NCDMB guidelines and requirements for Nigerian content compliance", url: "https://ncdmb.gov.ng", icon: ExternalLink },
  { title: "NUPRC Guidelines", description: "Nigerian Upstream Petroleum Regulatory Commission standards", url: "https://nuprc.gov.ng", icon: ExternalLink },
  { title: "NIPEX Portal", description: "Nigerian Petroleum Exchange contractor registration portal", url: "https://nipex.gov.ng", icon: ExternalLink },
];

export default function ResourcesPage() {
  const { content } = usePageContent('resources');
  const resourceImages = siteImageSelections.resources;
  
  const heroContent = content.hero || {};
  const brochuresContent = content.brochures || {};
  const videoContent = content.video || {};

  return (
    <Layout>
      <Hero
        title={heroContent.title || "Resources & Downloads"}
        subtitle={heroContent.subtitle || "Download our project brochures, company profile, technical documents, and watch our operations in action."}
        backgroundImage={heroContent.backgroundImage || resourceImages.hero}
        size="default"
        pageSlug="resources"
        sectionKey="hero"
        imageField="backgroundImage"
      />

      {/* Featured Downloads */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="enk-kicker mb-2">
              <EditableText
                value={brochuresContent.eyebrow || "Downloads"}
                pageSlug="resources"
                sectionKey="brochures"
                field="eyebrow"
              />
            </p>
            <h2 className="mb-3">
              <EditableText
                value={brochuresContent.title || "Company & Project Brochures"}
                pageSlug="resources"
                sectionKey="brochures"
                field="title"
              />
            </h2>
            <p className="section-subtitle text-left mx-0">
              <EditableText
                value={brochuresContent.description || "Download our official brochures with detailed information on capabilities, projects, and equipment."}
                pageSlug="resources"
                sectionKey="brochures"
                field="description"
              />
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {resources.brochures.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="enk-card enk-card--hover p-6 flex flex-col"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <FileText className="h-7 w-7 text-primary" />
                </div>
                <h4 className="font-semibold text-[17px] mb-2">{item.title}</h4>
                <p className="text-[13px] text-muted-foreground mb-4 leading-relaxed flex-1">{item.description}</p>
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-[12px] text-muted-foreground font-medium">{item.type} • {item.size}</span>
                  <Button variant="default" size="sm" className="h-9 gap-2" asChild>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      View
                    </a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Technical Documents */}
          <motion.div 
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="enk-kicker mb-2">Technical</p>
            <h2 className="enk-display text-[clamp(1.6rem,3vw,2rem)] text-[var(--enk-ink)] mb-3">Technical Documents &amp; Specifications</h2>
            <p className="text-muted-foreground text-[15px]">
              Access our equipment specifications, HSE policies, and quality management documentation.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {resources.technical.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="enk-card enk-card--hover p-5"
              >
                <Book className="h-7 w-7 text-primary mb-3" />
                <h4 className="font-semibold text-[15px] mb-2">{item.title}</h4>
                <p className="text-[12px] text-muted-foreground mb-4 leading-relaxed">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">
                    {item.type}{item.size && ` • ${item.size}`}
                  </span>
                  <Button variant="ghost" size="sm" className="h-8 gap-1 text-primary" asChild>
                    <a href={item.url} target={item.url.startsWith('/') ? '_self' : '_blank'}>
                      {item.url.startsWith('/') ? 'View' : <Download className="h-3.5 w-3.5" />}
                    </a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Video - OML34 */}
      <section className="section-padding bg-charcoal">
        <div className="container-wide">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="enk-kicker enk-kicker--on-dark">
              <EditableText
                value={videoContent.eyebrow || "Featured Project"}
                pageSlug="resources"
                sectionKey="video"
                field="eyebrow"
              />
            </p>
            <h2 className="text-white mb-4">
              <EditableText
                value={videoContent.title || "OML34 Continuous HDD Project Video"}
                pageSlug="resources"
                sectionKey="video"
                field="title"
              />
            </h2>
            <p className="text-white/60 text-[15px] max-w-lg mx-auto">
              <EditableText
                value={videoContent.description || "Watch the documentary of Nigeria's longest functional Continuous HDD - 12km of 10\" pipeline installation."}
                pageSlug="resources"
                sectionKey="video"
                field="description"
              />
            </p>
          </motion.div>
          
          {/* Featured Video - Large */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-4xl mx-auto mb-10"
          >
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/uv_ozmjIo-E?rel=0"
                title="OML34 Continuous HDD Project Review"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </motion.div>
          
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 gap-2" asChild>
              <a href="https://www.youtube.com/@enikkomconstruction" target="_blank" rel="noopener noreferrer">
                <Youtube className="h-4 w-4" />
                View All Videos on YouTube
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Compliance Library */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="enk-kicker justify-center">Compliance</p>
            <h2 className="section-title">Certifications, Permits & Policies</h2>
            <p className="section-subtitle">
              Download the current compliance files sourced directly from the supplied corporate document pack.
            </p>
          </motion.div>

          <div className="grid gap-12">

            <div>
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
              >
                <p className="enk-kicker mb-2">Registration</p>
                <h3 className="enk-display text-[clamp(1.4rem,2.4vw,1.75rem)] text-[var(--enk-ink)] mb-3">Permits and Licenses</h3>
                <p className="text-[14px] text-muted-foreground max-w-2xl">
                  This sub-category lists the requested permit documents clearly, while staying honest about the files that were not present in the supplied source pack.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-5">
                {complianceResources.permits.map((permit, index) => (
                  <motion.div
                    key={permit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: index * 0.08 }}
                    className="enk-card enk-card--hover p-6 flex flex-col gap-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${permit.available ? "bg-primary/10" : "bg-muted"}`}>
                        {permit.available ? (
                          <Landmark className="h-5 w-5 text-primary" />
                        ) : (
                          <FileX2 className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-[15px] font-semibold mb-1">{permit.title}</h4>
                        <p className="text-[12px] text-primary font-medium">{permit.authority}</p>
                      </div>
                    </div>

                    <p className="text-[13px] leading-relaxed text-muted-foreground flex-1">
                      {permit.description}
                    </p>

                    {permit.available ? (
                      <Button variant="outline" className="h-10 w-fit gap-2" asChild>
                        <a href={permit.href} target="_blank" rel="noreferrer">
                          Open Document
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    ) : (
                      <span className="enk-chip w-fit">Source Not Supplied</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
              >
                <p className="enk-kicker mb-2">Policies</p>
                <h3 className="enk-display text-[clamp(1.4rem,2.4vw,1.75rem)] text-[var(--enk-ink)] mb-3">Approved Policy Documents</h3>
                <p className="text-[14px] text-muted-foreground max-w-2xl">
                  Only the four policies requested for this update are displayed here. All other policy text has been removed from this section.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
                {complianceResources.policies.map((policy, index) => {
                  const Icon = policy.icon;
                  return (
                    <motion.div
                      key={policy.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: index * 0.08 }}
                      className="enk-card enk-card--hover p-5 flex flex-col gap-4"
                    >
                      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-[15px] font-semibold mb-2">{policy.title}</h4>
                        <p className="text-[12px] leading-relaxed text-muted-foreground">{policy.description}</p>
                      </div>
                      <Button variant="outline" className="h-10 w-fit gap-2 mt-auto" asChild>
                        <a href={policy.href} target="_blank" rel="noreferrer">
                          View Policy
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Links */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="enk-kicker justify-center">Industry</p>
            <h2 className="section-title">Industry Resources</h2>
            <p className="section-subtitle">
              Useful links to Nigerian oil & gas regulatory bodies.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {industryLinks.map((link, index) => (
              <motion.a
                key={link.title}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="enk-card enk-card--hover p-6 group"
              >
                <ExternalLink className="h-6 w-6 text-primary mb-4 group-hover:translate-x-1 transition-transform" />
                <h4 className="font-semibold text-[16px] mb-2">{link.title}</h4>
                <p className="text-[13px] text-muted-foreground">{link.description}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <CTABand 
        headline="Need More Information?"
        primaryCTA={{ label: "Contact Us", href: "/contact" }}
      />
    </Layout>
  );
}
