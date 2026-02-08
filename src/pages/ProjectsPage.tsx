import { useState } from "react";
import { Layout } from "@/components/layout";
import { Hero, CTABand, CaseStudyCard } from "@/components/sections";
import { EditableText } from "@/components/admin";
import { usePageContent } from "@/hooks/useSiteSettings";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Import authentic project images - UNIQUE thumbnails for each project
import heroProjects from "@/assets/projects/hero-hdd.jpg";
import thumbOml34 from "@/assets/projects/hdd-rig-night.jpg";
import thumbLekki from "@/assets/projects/lekki-gas-pipeline.jpg";
import thumbAtlas from "@/assets/projects/atlas-cove-mosimi.jpg";
import thumbOtumara from "@/assets/projects/otumara-escravos.jpg";
import thumbYenagoa from "@/assets/projects/hdd-equipment-fleet-3.jpg";
import thumbElps from "@/assets/projects/pipe-laying-crane.jpg";
import thumbCalabar from "@/assets/projects/pipeline-construction.jpg";
import thumbNipco from "@/assets/projects/nipco-ibafo.jpg";
import thumbOb3 from "@/assets/projects/drilling-ops-6.jpg";
import thumbEkiadolor from "@/assets/projects/drilling-ops-7.jpg";
import thumbRiverNiger from "@/assets/projects/drilling-site-2.jpg";
import thumbGbaran from "@/assets/projects/scope-operations-2.jpg";
import thumbNunRiver from "@/assets/projects/scope-operations-3.jpg";
import thumbEscravos from "@/assets/projects/shore-approach.jpg";

// Gallery images (different set)
import galleryImg1 from "@/assets/projects/hdd-night-panorama.jpg";
import galleryImg2 from "@/assets/projects/multi-crane-operations.jpg";
import galleryImg3 from "@/assets/projects/otumara-escravos-2.jpg";
import galleryImg4 from "@/assets/projects/crane-operations.jpg";

const projectTags = ["All", "HDD", "Pipeline", "Dredging", "CHDD", "Shore Approach"];

// Real projects from Enikkom documents - each with unique thumbnail
const defaultProjects = [
  {
    title: "OML34 Continuous HDD - 10\" x 12km",
    location: "Niger Delta, Nigeria",
    metric: "12km",
    metricLabel: "Nigeria's Longest CHDD",
    tags: ["HDD", "CHDD"],
    href: "/projects/oml34-chdd",
    thumbnail: thumbOml34,
    year: "2020",
  },
  {
    title: "Lekki Gas Pipeline (LGPP) - Dangote",
    location: "Lagos, Nigeria",
    metric: "36\" x 1.5km",
    metricLabel: "Swamp/River HDD Crossing",
    tags: ["HDD", "Pipeline"],
    href: "/projects/lekki-gas-pipeline",
    thumbnail: thumbLekki,
    year: "2019",
  },
  {
    title: "Atlas Cove-Mosimi Emergency Reconstruction",
    location: "Lagos/Ogun, Nigeria",
    metric: "16\" x 3km",
    metricLabel: "Longest Single Drill in Africa",
    tags: ["HDD"],
    href: "/projects/atlas-cove-mosimi",
    thumbnail: thumbAtlas,
    year: "2017",
  },
  {
    title: "Otumara-Escravos Bundled HDD Crossing",
    location: "Delta State, Nigeria",
    metric: "12\" + 3\" x 2.78km",
    metricLabel: "Longest Bundled Crossing in Africa",
    tags: ["HDD", "Pipeline"],
    href: "/projects/otumara-escravos",
    thumbnail: thumbOtumara,
    year: "2016",
  },
  {
    title: "Yenagoa 40\" HDD Crossing",
    location: "Bayelsa State, Nigeria",
    metric: "40\" x 760m",
    metricLabel: "Largest Pipeline Crossing in Nigeria",
    tags: ["HDD"],
    href: "/projects/yenagoa-40-crossing",
    thumbnail: thumbYenagoa,
    year: "2010",
  },
  {
    title: "Escravos-Lagos Pipeline System Phase II",
    location: "Lagos/Delta, Nigeria",
    metric: "36\" x 7.2km",
    metricLabel: "Multiple HDD Sections",
    tags: ["HDD", "Pipeline"],
    href: "/projects/elps-phase-2",
    thumbnail: thumbElps,
    year: "2018",
  },
  {
    title: "Calabar Gas Transmission Pipeline",
    location: "Cross River State, Nigeria",
    metric: "24\" x 21.5km",
    metricLabel: "Gas Transmission",
    tags: ["Pipeline"],
    href: "/projects/calabar-gas-transmission",
    thumbnail: thumbCalabar,
    year: "2015",
  },
  {
    title: "NIPCO Gas Distribution Network",
    location: "Multiple Locations, Nigeria",
    metric: "50km",
    metricLabel: "4\"/8\"/12\" Pipeline Network",
    tags: ["Pipeline"],
    href: "/projects/nipco-gas-distribution",
    thumbnail: thumbNipco,
    year: "2009",
  },
  {
    title: "OB3 River Niger 48\" Microtunnelling",
    location: "River Niger, Nigeria",
    metric: "48\" x 1.8km",
    metricLabel: "HDD + Direct Pipe Installation",
    tags: ["HDD", "Microtunnelling"],
    href: "/projects/ob3-river-niger",
    thumbnail: thumbOb3,
    year: "2019",
  },
  {
    title: "Ekiadolor Deep Valley Crossing",
    location: "Edo State, Nigeria",
    metric: "36\" x 1.2km",
    metricLabel: "80m Depth - Nigeria's Deepest",
    tags: ["HDD"],
    href: "/projects/ekiadolor-deep-valley",
    thumbnail: thumbEkiadolor,
    year: "2018",
  },
  {
    title: "River Niger Historic Crossing",
    location: "Niger Delta, Nigeria",
    metric: "First",
    metricLabel: "HDD Crossing in Nigeria",
    tags: ["HDD"],
    href: "/projects/river-niger-historic",
    thumbnail: thumbRiverNiger,
    year: "2003",
  },
  {
    title: "Gbaran Phase 3b – UZU CPF Upgrade",
    location: "Bayelsa State, Nigeria",
    metric: "8km & 10km",
    metricLabel: "x 16\" pipeline EPC",
    tags: ["Pipeline"],
    href: "/projects/gbaran-phase-3b",
    thumbnail: thumbGbaran,
    year: "2025",
  },
  {
    title: "16\" & 6\" Nun River HDD Crossing",
    location: "Niger Delta, Nigeria",
    metric: "Dual",
    metricLabel: "HDD crossing under Nun River",
    tags: ["HDD"],
    href: "/projects/nun-river-crossing",
    thumbnail: thumbNunRiver,
    year: "2024",
  },
  {
    title: "Escravos Shore Approach Installation",
    location: "Delta State, Nigeria",
    metric: "1.8km",
    metricLabel: "Shore Crossing",
    tags: ["Shore Approach", "Pipeline"],
    href: "/projects/escravos-shore-approach",
    thumbnail: thumbEscravos,
    year: "2021",
  },
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const { content } = usePageContent('projects');
  const heroContent = content.hero || {};
  const recordsContent = content.records || {};

  const projects = defaultProjects;
  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.tags.includes(activeFilter));

  return (
    <Layout>
      <Hero
        title={heroContent.title || "Our Projects"}
        subtitle={heroContent.subtitle || "Over 100km of HDD installations including Africa's longest single drill (3.1km) and Nigeria's longest Continuous HDD (12km). Trusted by Shell, Dangote, NNPC, Saipem, and more."}
        badge={heroContent.badge || "100+ KM HDD Installed"}
        primaryCTA={{ label: heroContent.primaryBtnText || "Start Your Project", href: heroContent.primaryBtnLink || "/contact" }}
        backgroundImage={heroContent.backgroundImage || heroProjects}
        size="default"
        pageSlug="projects"
        sectionKey="hero"
        imageField="backgroundImage"
      />

      <section className="section-padding bg-background">
        <div className="container-wide">
          {/* Filter Bar */}
          <motion.div 
            className="flex flex-wrap gap-3 mb-8 justify-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            {projectTags.map((tag) => (
              <Button
                key={tag}
                variant={activeFilter === tag ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(tag)}
                className={`h-10 px-5 text-[13px] md:text-[14px] rounded-lg transition-all duration-200 min-w-[72px] ${
                  activeFilter === tag 
                    ? "bg-brand-primary hover:bg-brand-primary-hover" 
                    : "border-border hover:bg-muted"
                }`}
              >
                {tag}
              </Button>
            ))}
          </motion.div>

          {/* Project Stats */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <p className="text-[13px] md:text-[14px] text-muted-foreground">
              Showing {filteredProjects.length} projects • 100+ KM HDD installed to date • 3.1km longest single drill
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map((project, index) => (
              <CaseStudyCard
                key={project.title}
                {...project}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Records Section */}
      <section className="section-padding bg-charcoal">
        <div className="container-wide">
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[11px] md:text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              <EditableText
                value={recordsContent.subtitle || "Our Records"}
                pageSlug="projects"
                sectionKey="records"
                field="subtitle"
              />
            </p>
            <h2 className="text-white mb-3">
              <EditableText
                value={recordsContent.title || "Industry-Leading Achievements"}
                pageSlug="projects"
                sectionKey="records"
                field="title"
              />
            </h2>
            <p className="text-white/60 text-[14px] md:text-[15px] max-w-lg mx-auto">
              <EditableText
                value={recordsContent.description || "Setting benchmarks in HDD and pipeline construction across Africa."}
                pageSlug="projects"
                sectionKey="records"
                field="description"
              />
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "3.1km", label: "Longest Single Drill", detail: "Africa Record" },
              { value: "12km", label: "Longest CHDD", detail: "Nigeria Record" },
              { value: "40\"", label: "Largest Crossing", detail: "Nigeria Record" },
              { value: "80m", label: "Deepest Crossing", detail: "In Nigeria" },
            ].map((record, i) => (
              <motion.div
                key={record.label}
                className="bg-white/5 border border-white/10 rounded-[14px] p-5 text-center"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{record.value}</div>
                <div className="text-white text-[13px] font-medium mb-1">{record.label}</div>
                <div className="text-white/50 text-[11px]">{record.detail}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding-sm bg-muted/30" id="gallery">
        <div className="container-wide">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[11px] md:text-xs font-semibold uppercase tracking-widest text-primary mb-3">Gallery</p>
            <h2 className="mb-3">
              <EditableText
                value={content.gallery?.title || "Project Gallery"}
                pageSlug="projects"
                sectionKey="gallery"
                field="title"
              />
            </h2>
            <p className="text-[14px] md:text-[15px] text-muted-foreground max-w-lg mx-auto mb-8">
              <EditableText
                value={content.gallery?.description || "View our portfolio of completed works across Nigeria."}
                pageSlug="projects"
                sectionKey="gallery"
                field="description"
              />
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[galleryImg1, galleryImg2, galleryImg3, galleryImg4].map((img, i) => (
                <motion.div
                  key={i}
                  className="aspect-square rounded-[14px] overflow-hidden hover-lift"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <img 
                    src={img} 
                    alt={`Project gallery image ${i + 1}`} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <CTABand 
        headline={content.cta?.headline || "Your Project Could Be Next"}
        subhead={content.cta?.subhead || "Join Shell, Dangote, and NNPC. Get a detailed proposal for your infrastructure project."}
        secondaryCTA={{ label: "Explore Our Capabilities", href: "/capabilities" }}
      />
    </Layout>
  );
}
