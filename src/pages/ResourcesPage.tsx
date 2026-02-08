import { Layout } from "@/components/layout";
import { Hero, CTABand } from "@/components/sections";
import { motion } from "framer-motion";
import { FileText, Download, ExternalLink, Book, Play, Youtube, Briefcase, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditableText } from "@/components/admin";
import { usePageContent } from "@/hooks/useSiteSettings";

import heroHddRig from "@/assets/hero/hero-hdd-rig.jpg";

const resources = {
  brochures: [
    { 
      title: "ECL Project Brochure - Part 1", 
      description: "Comprehensive project portfolio showcasing our HDD crossings, pipeline construction, and major infrastructure works across Nigeria.", 
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
    { title: "HDD Equipment Specifications", description: "Complete specifications for our 10+ maxi HDD rigs (50T-500T pullback capacity).", type: "Link", size: "", url: "/equipment/hdd" },
    { title: "General Equipment Fleet", description: "Full equipment fleet including thrust boring, micro tunnelling, marine, and support equipment.", type: "Link", size: "", url: "/equipment" },
    { title: "HSE Policy Statement", description: "Our commitment to Health, Safety, and Environmental excellence with zero LTI record.", type: "PDF", size: "1.2 MB", url: "#" },
    { title: "Quality Management System", description: "ISO 9001:2015, ISO 14001:2015, and ISO 45001:2018 certified quality management.", type: "PDF", size: "2.4 MB", url: "#" },
  ],
  certifications: [
    { name: "ISO 9001:2015 - Quality Management", issuer: "Bureau Veritas" },
    { name: "ISO 14001:2015 - Environmental Management", issuer: "Bureau Veritas" },
    { name: "ISO 45001:2018 - Occupational Health & Safety", issuer: "Bureau Veritas" },
    { name: "NIPEX Registration", issuer: "Nigerian Petroleum Exchange" },
    { name: "NPC License", issuer: "Nigerian Ports Certified" },
    { name: "NCDMB Certificate", issuer: "Nigerian Content Development Board" },
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
      description: "Enikkom's presentation at the Nigerian International Petroleum Technology Conference (NIPITECS) 2019 in Abuja, showcasing HDD technology as the solution to pipeline vandalism and theft.", 
      thumbnail: "https://img.youtube.com/vi/PrMQDDb6ELA/maxresdefault.jpg", 
      youtubeId: "PrMQDDb6ELA", 
      duration: "5:23",
      featured: true
    },
  ],
};

const industryLinks = [
  { title: "Nigerian Content Development", description: "NCDMB guidelines and requirements for Nigerian content compliance", url: "https://ncdmb.gov.ng", icon: ExternalLink },
  { title: "NUPRC Guidelines", description: "Nigerian Upstream Petroleum Regulatory Commission standards", url: "https://nuprc.gov.ng", icon: ExternalLink },
  { title: "NIPEX Portal", description: "Nigerian Petroleum Exchange contractor registration portal", url: "https://nipex.gov.ng", icon: ExternalLink },
];

export default function ResourcesPage() {
  const { content } = usePageContent('resources');
  
  const heroContent = content.hero || {};
  const brochuresContent = content.brochures || {};
  const videoContent = content.video || {};

  const openYouTube = (youtubeId: string) => {
    window.open(`https://www.youtube.com/watch?v=${youtubeId}`, '_blank');
  };

  return (
    <Layout>
      <Hero
        title={heroContent.title || "Resources & Downloads"}
        subtitle={heroContent.subtitle || "Download our project brochures, company profile, technical documents, and watch our operations in action."}
        backgroundImage={heroContent.backgroundImage || heroHddRig}
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
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="h-5 w-5 text-primary" />
              <p className="section-eyebrow">
                <EditableText
                  value={brochuresContent.eyebrow || "Downloads"}
                  pageSlug="resources"
                  sectionKey="brochures"
                  field="eyebrow"
                />
              </p>
            </div>
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
                className="card-premium p-6 flex flex-col"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <FileText className="h-7 w-7 text-primary" />
                </div>
                <h4 className="font-semibold text-[17px] mb-2">{item.title}</h4>
                <p className="text-[13px] text-muted-foreground mb-4 leading-relaxed flex-1">{item.description}</p>
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-[12px] text-muted-foreground font-medium">{item.type} • {item.size}</span>
                  <Button variant="default" size="sm" className="h-9 gap-2" asChild>
                    <a href={item.url} download>
                      <Download className="h-4 w-4" />
                      Download
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
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-primary" />
              <p className="section-eyebrow">Technical</p>
            </div>
            <h2 className="text-[26px] md:text-[30px] mb-3">Technical Documents & Specifications</h2>
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
                className="card-premium p-5"
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
            <p className="section-eyebrow">
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

      {/* Certifications */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="section-eyebrow">Compliance</p>
            <h2 className="section-title">Certifications & Accreditations</h2>
            <p className="section-subtitle">
              Enikkom maintains internationally recognized certifications for quality, safety, and environmental management.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {resources.certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="card-premium p-4 flex items-center gap-3"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-primary flex-shrink-0" />
                <div>
                  <p className="text-[13px] font-semibold">{cert.name}</p>
                  <p className="text-[11px] text-muted-foreground">{cert.issuer}</p>
                </div>
              </motion.div>
            ))}
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
            <p className="section-eyebrow">Industry</p>
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
                className="card-interactive p-6 group"
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