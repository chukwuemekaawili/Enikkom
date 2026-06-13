import { useState } from "react";
import { Layout } from "@/components/layout";
import { Hero, CTABand, CaseStudyCard } from "@/components/sections";
import { EditableText } from "@/components/admin";
import { getProjectImage } from "@/content/projectImageSelections";
import { siteImageSelections } from "@/content/siteImageSelections";
import { usePageContent, useCollection } from "@/hooks/useSiteSettings";
import { Button } from "@/components/ui/button";
import { EnhancedImage } from "@/components/ui/enhanced-image";
import { motion } from "framer-motion";

const projectTags = ["All", "HDD", "Pipeline", "Dredging", "CHDD", "Shore Approach"];

const galleryImages = [
  {
    src: getProjectImage("oml34-chdd", "interactiveMap") || getProjectImage("oml34-chdd", "projectGallery"),
    alt: "Aerial view of the OML34 continuous HDD project site in Delta State",
    label: "OML34 Continuous HDD",
  },
  {
    src: getProjectImage("nun-river-crossing", "projectGallery") || getProjectImage("nun-river-crossing", "projectList"),
    alt: "River crossing drilling spread on a large Enikkom waterway crossing project",
    label: "River Crossing Works",
  },
  {
    src: getProjectImage("ob3-river-niger", "interactiveMap") || getProjectImage("ob3-river-niger", "projectGallery"),
    alt: "Direct Pipe installation spread deployed on a major trenchless crossing",
    label: "Direct Pipe Installation",
  },
  {
    src: getProjectImage("escravos-shore-approach", "projectMap") || getProjectImage("escravos-shore-approach", "projectGallery"),
    alt: "Heavy marine and shore construction spread supporting pipeline installation works",
    label: "Marine Construction Spread",
  },
];

// Real projects from Enikkom documents - each with unique thumbnail
const defaultProjects = [
  {
    title: "OML34 Continuous HDD — 10\" × 12km",
    location: "Utorogun, Delta State",
    metric: "12km",
    metricLabel: "Nigeria's Longest CHDD",
    tags: ["HDD", "CHDD"],
    href: "/projects/oml34-chdd",
    thumbnail: getProjectImage("oml34-chdd", "projectList"),
    year: "2021",
  },
  {
    title: "Dangote Fertilizer — 36\" × 2km Lagoon Crossing",
    location: "Ejirin, Lagos Lagoon",
    metric: "36\" × 2km",
    metricLabel: "Swamp / Lagoon HDD Crossing",
    tags: ["HDD", "Pipeline"],
    href: "/projects/dangote-lagoon",
    thumbnail: getProjectImage("dangote-lagoon", "projectList"),
    year: "2016",
  },
  {
    title: "Atlas Cove–Mosimi — 16\" × 3.1km",
    location: "Arepo / Imagbon, Ogun State",
    metric: "16\" × 3.1km",
    metricLabel: "Africa's Longest Single Drill",
    tags: ["HDD"],
    href: "/projects/atlas-cove-mosimi",
    thumbnail: getProjectImage("atlas-cove-mosimi", "projectList"),
    year: "2016",
  },
  {
    title: "Otumara-Escravos Bundled HDD Crossing",
    location: "Delta State, Nigeria",
    metric: "12\" + 3\" x 2.78km",
    metricLabel: "Longest Bundled Crossing in Africa",
    tags: ["HDD", "Pipeline"],
    href: "/projects/otumara-escravos",
    thumbnail: getProjectImage("otumara-escravos", "projectList"),
    year: "2016",
  },
  {
    title: "Yenagoa 40\" HDD Crossing",
    location: "Bayelsa State, Nigeria",
    metric: "40\" × 760m",
    metricLabel: "Largest Pipeline Crossing in Nigeria",
    tags: ["HDD"],
    href: "/projects/yenagoa-40-crossing",
    thumbnail: getProjectImage("yenagoa-40-crossing", "projectList"),
    year: "2010",
  },
  {
    title: "Escravos-Lagos Pipeline System Phase II",
    location: "Lagos/Delta, Nigeria",
    metric: "36\" × 7.2km",
    metricLabel: "Multiple HDD Sections",
    tags: ["HDD", "Pipeline"],
    href: "/projects/elps-phase-2",
    thumbnail: getProjectImage("elps-phase-2", "projectList"),
    year: "2018",
  },
  {
    title: "Calabar Gas Transmission Pipeline",
    location: "Cross River State, Nigeria",
    metric: "24\" × 21.5km",
    metricLabel: "Gas Transmission",
    tags: ["Pipeline"],
    href: "/projects/calabar-gas-transmission",
    thumbnail: getProjectImage("calabar-gas-transmission", "projectList"),
    year: "2015",
  },
  {
    title: "NIPCO Gas Distribution Network",
    location: "Multiple Locations, Nigeria",
    metric: "50km",
    metricLabel: "4\"/8\"/12\" Pipeline Network",
    tags: ["Pipeline"],
    href: "/projects/nipco-gas-distribution",
    thumbnail: getProjectImage("nipco-gas-distribution", "projectList"),
    year: "2009",
  },
  {
    title: "OB3 River Niger 48\" Direct Pipe Installation",
    location: "River Niger, Nigeria",
    metric: "48\" × 1.8km",
    metricLabel: "HDD + Direct Pipe Installation",
    tags: ["HDD"],
    href: "/projects/ob3-river-niger",
    thumbnail: getProjectImage("ob3-river-niger", "projectList"),
    year: "2020",
  },
  {
    title: "Ekiadolor Deep Valley Crossing",
    location: "Edo State, Nigeria",
    metric: "36\" × 1.2km",
    metricLabel: "80m Depth — Africa's Deepest HDD",
    tags: ["HDD"],
    href: "/projects/ekiadolor-deep-valley",
    thumbnail: getProjectImage("ekiadolor-deep-valley", "projectList"),
    year: "2016",
  },
  {
    title: "River Niger Historic Crossing",
    location: "Niger Delta, Nigeria",
    metric: "First",
    metricLabel: "HDD Crossing in Nigeria",
    tags: ["HDD"],
    href: "/projects/river-niger-historic",
    thumbnail: getProjectImage("river-niger-historic", "projectList"),
    year: "2003",
  },
  {
    title: "Gbaran Phase 3b – UZU CPF Upgrade",
    location: "Bayelsa State, Nigeria",
    metric: "8km & 10km",
    metricLabel: "x 16\" pipeline EPC",
    tags: ["Pipeline"],
    href: "/projects/gbaran-phase-3b",
    thumbnail: getProjectImage("gbaran-phase-3b", "projectList"),
    year: "2025",
  },
  {
    title: "16\" & 6\" Nun River HDD Crossing",
    location: "Niger Delta, Nigeria",
    metric: "Dual",
    metricLabel: "HDD crossing under Nun River",
    tags: ["HDD"],
    href: "/projects/nun-river-crossing",
    thumbnail: getProjectImage("nun-river-crossing", "projectList"),
    year: "2024",
  },
  {
    title: "Escravos Shore Approach Installation",
    location: "Delta State, Nigeria",
    metric: "1.8km",
    metricLabel: "Shore Crossing",
    tags: ["Shore Approach", "Pipeline"],
    href: "/projects/escravos-shore-approach",
    thumbnail: getProjectImage("escravos-shore-approach", "projectList"),
    year: "2021",
  },
];

function resolveProjectListThumbnail(project: { slug?: string; href?: string; thumbnail?: string }) {
  const slugOrHref = project.slug || project.href || "";
  return getProjectImage(slugOrHref, "projectList") || project.thumbnail;
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const { content } = usePageContent('projects');
  const heroContent = content.hero || {};
  const recordsContent = content.records || {};


  const { data: dbProjects } = useCollection('projects_list');

  // Use DB projects if available, otherwise fallback to hardcoded defaults
  const projects = (dbProjects.length > 0 ? dbProjects : defaultProjects).map((project: any) => ({
    ...project,
    thumbnail: resolveProjectListThumbnail(project),
  }));

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
        backgroundImage={heroContent.backgroundImage || siteImageSelections.completedProjects.hero}
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
                className={`h-10 px-5 text-[13px] md:text-[14px] rounded-lg transition-all duration-200 min-w-[72px] ${activeFilter === tag
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
              { value: "40\"", label: "Largest Pipe Crossing", detail: "Nigeria Record" },
              { value: "80m", label: "Deepest HDD Crossing", detail: "Africa Record" },
            ].map((record, i) => (
              <motion.div
                key={record.label}
                className="bg-black/60 border-2 border-primary/20 hover:border-primary p-6 md:p-8 text-center transition-colors duration-200"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-black text-white mb-2">{record.value}</div>
                <div className="text-primary text-[14px] font-bold uppercase tracking-wide mb-1">{record.label}</div>
                <div className="text-white/60 text-[12px]">{record.detail}</div>
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {galleryImages.map((img, i) => (
                <motion.div
                  key={img.label}
                  className="group aspect-[3/2] rounded-sm overflow-hidden hover-lift"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <EnhancedImage
                    src={img.src}
                    alt={img.alt}
                    wrapperClassName="h-full w-full"
                    className="w-full h-full"
                    sizes="(min-width: 1024px) 22vw, (min-width: 768px) 25vw, 50vw"
                    tone="vivid"
                    hoverZoom
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0B1220]/90 via-[#0B1220]/35 to-transparent px-3 py-3">
                    <p className="text-[12px] md:text-[13px] font-semibold text-white">
                      {img.label}
                    </p>
                  </div>
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
