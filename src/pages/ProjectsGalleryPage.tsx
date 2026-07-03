import { Layout } from "@/components/layout";
import { Hero, CTABand } from "@/components/sections";
import { motion } from "framer-motion";
import { useState } from "react";
import { X, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { EnhancedImage } from "@/components/ui/enhanced-image";
import { getProjectImage } from "@/content/projectImageSelections";
import { siteImageSelections } from "@/content/siteImageSelections";
import { SectionHeading } from "@/components/home/SectionHeading";

interface Project {
  image?: string;
  title: string;
  client?: string;
  location?: string;
  year?: string;
  description: string;
  specs?: string[];
}

const hddProjects: Project[] = [
  {
    image: getProjectImage("oml34-chdd", "projectGallery"),
    title: "OML34 Continuous HDD, 10\" × 12km",
    client: "NPDC / ND Western",
    location: "Utorogun, Delta State",
    year: "2021",
    description: "Nigeria's longest Continuous HDD, 12km of 10-inch pipeline installed in a single continuous operation through the Niger Delta. Record-breaking achievement.",
    specs: ["12km total length", "10\" diameter", "500T CHDD, Nigeria record"],
  },
  {
    image: getProjectImage("atlas-cove-mosimi", "projectGallery"),
    title: "Atlas Cove-Mosimi, 16\" × 3.1km",
    client: "NNPC / PPMC",
    location: "Arepo / Imagbon, Ogun State",
    year: "2016",
    description: "Africa's longest single HDD drill, emergency reconstruction of the Atlas Cove to Mosimi petroleum products pipeline.",
    specs: ["3.1km single drill", "16\" diameter", "Africa record"],
  },
  {
    image: getProjectImage("otumara-escravos", "projectGallery"),
    title: "Otumara-Escravos Bundled HDD",
    client: "Saipem / SPDC",
    location: "Delta State, Nigeria",
    year: "2016",
    description: "Africa's longest bundled HDD crossing, 12\" and 3\" pipelines installed simultaneously across 2.78km of the Escravos River system.",
    specs: ["2.78km bundled crossing", "12\" + 3\" pipes", "Africa record"],
  },
  {
    image: getProjectImage("ob3-river-niger", "projectGallery"),
    title: "OB3 River Niger 48\" Direct Pipe",
    client: "NPDC / OB3 Consortium",
    location: "River Niger, Nigeria",
    year: "2020",
    description: "Landmark 48-inch × 1.8km crossing of the River Niger using HDD combined with Direct Pipe Installation technology.",
    specs: ["1.8km crossing", "48\" diameter", "HDD + DPI method"],
  },
  {
    image: getProjectImage("river-niger-historic", "projectGallery"),
    title: "First HDD Crossing of River Niger",
    client: "NNPC",
    location: "Nigeria",
    year: "2003",
    description: "Nigeria's historic first Horizontal Directional Drilling crossing, pioneering trenchless technology in the country.",
    specs: ["Pioneer HDD in Nigeria", "16\" diameter", "Opened new market"],
  },
];

const pipelineProjects: Project[] = [
  {
    image: getProjectImage("gbaran-phase-3b", "projectGallery"),
    title: "Gbaran Phase 3b, 16\" Pipeline EPC",
    client: "SPDC",
    location: "Bayelsa State, Nigeria",
    year: "2025",
    description: "EPC pipeline construction, 8km and 10km of 16-inch pipeline for the Gbaran-UZU CPF upgrade project.",
    specs: ["8km & 10km", "16\" diameter", "EPC contract"],
  },
  {
    image: getProjectImage("calabar-gas-transmission", "projectGallery"),
    title: "Calabar Gas Transmission, 24\" × 21.5km",
    client: "Zakhem / NDPHC",
    location: "Cross River State, Nigeria",
    year: "2015",
    description: "Gas transmission pipeline construction with multiple HDD river crossings providing critical gas supply for power generation.",
    specs: ["21.5km length", "24\" diameter", "Gas transmission"],
  },
  {
    image: getProjectImage("nipco-gas-distribution", "projectGallery"),
    title: "NIPCO Gas Distribution Network",
    client: "NIPCO",
    location: "Multiple Locations, Nigeria",
    year: "2009",
    description: "50km multi-diameter urban gas distribution network with extensive HDD crossings under roads and waterways.",
    specs: ["50km network", "4\"/8\"/12\" diameters", "Urban HDD crossings"],
  },
  {
    image: getProjectImage("elps-phase-2", "projectGallery"),
    title: "ELPS Phase II, 36\" × 7.2km HDD",
    client: "Zakhem / NNPC",
    location: "Lagos / Delta State",
    year: "2018",
    description: "Multiple 36-inch HDD sections totaling 7.2km for the Escravos-Lagos Pipeline System Phase II expansion.",
    specs: ["7.2km HDD total", "36\" diameter", "Multiple crossings"],
  },
];

const marineProjects: Project[] = [
  {
    image: getProjectImage("oml34-chdd", "related"),
    title: "OML34 Dredging & Cofferdam Works",
    client: "NPDC",
    location: "Delta State, Nigeria",
    year: "2021",
    description: "Cofferdam installation and dredging works in support of the OML34 CHDD project, managing groundwater in challenging swamp conditions.",
    specs: ["Cofferdam construction", "Swamp dredging", "Groundwater control"],
  },
  {
    image: getProjectImage("ob3-river-niger", "related") || getProjectImage("ob3-river-niger", "projectMap"),
    title: "OB3 Sheet Piling Works",
    client: "NPDC",
    location: "River Niger, Nigeria",
    year: "2020",
    description: "Sheet pile installation to create safe working platforms for the OB3 River Niger Direct Pipe Installation crossing.",
    specs: ["River Niger site", "Sheet pile installation", "Platform construction"],
  },
  {
    image: getProjectImage("escravos-shore-approach", "projectGallery"),
    title: "Escravos Shore Approach",
    client: "ECL / SPDC",
    location: "Delta State, Nigeria",
    year: "2021",
    description: "Shore crossing pipeline installation connecting offshore infrastructure to onshore facilities across 1.8km.",
    specs: ["1.8km shore crossing", "Shore approach method", "Zero LTI"],
  },
  {
    image: getProjectImage("dangote-lagoon", "projectGallery"),
    title: "Dangote Lagoon Crossing, 36\" × 2km",
    client: "Dangote Fertilizer",
    location: "Ejirin, Lagos Lagoon",
    year: "2016",
    description: "36-inch × 2km swamp and lagoon HDD crossing delivering gas supply to Dangote's fertilizer complex.",
    specs: ["2km crossing", "36\" diameter", "Lagoon environment"],
  },
];

const categories = ["All Projects", "HDD Crossings", "Pipeline Construction", "Marine & Dredging"];

export default function ProjectsGalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const renderProjectGrid = (projects: Project[], title: string, description: string) => (
    <div className="mb-16">
      <SectionHeading kicker="Portfolio" title={title} intro={description} onDark />
      <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="group cursor-pointer enk-card enk-card--hover flex flex-col"
            onClick={() => setSelectedProject(project)}
          >
            <div className="relative aspect-[4/3] overflow-hidden enk-photo-wrap">
              <EnhancedImage
                src={project.image}
                alt={project.title}
                wrapperClassName="h-full w-full"
                className="h-full w-full enk-photo--card"
                hoverZoom
                tone="natural"
                fallbackLabel={project.title}
              />
              {project.year && (
                <span className="enk-chip enk-chip--on-dark absolute left-3 top-3">
                  {project.year}
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col p-5" style={{ backgroundColor: "var(--enk-surface-card)" }}>
              <h4 className="font-semibold text-[16px] mb-1 text-[var(--enk-on-dark)] group-hover:text-[var(--enk-accent-on-dark)] transition-colors">{project.title}</h4>
              {project.client && (
                <p className="text-[12px] font-bold mb-2 text-[var(--enk-accent-on-dark)]">{project.client}</p>
              )}
              {project.location && (
                <p className="text-[12px] text-[var(--enk-on-dark-muted)] mb-2">{project.location}</p>
              )}
              <p className="text-[13px] text-[var(--enk-on-dark-muted)] line-clamp-2 flex-1">{project.description}</p>
              {project.specs && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {project.specs.slice(0, 2).map((spec) => (
                    <span key={spec} className="enk-chip enk-chip--on-dark text-[10px]">
                      {spec}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );

  const showHDD = activeCategory === "All Projects" || activeCategory === "HDD Crossings";
  const showPipeline = activeCategory === "All Projects" || activeCategory === "Pipeline Construction";
  const showMarine = activeCategory === "All Projects" || activeCategory === "Marine & Dredging";

  return (
    <Layout>
      <Hero
        title="Projects Gallery"
        subtitle="Explore our portfolio of completed HDD crossings, pipeline installations, and marine construction projects across Nigeria and West Africa."
        backgroundImage={siteImageSelections.projectMap.hero}
        size="default"
        primaryCTA={{ label: "Contact Us", href: "/contact" }}
        pageSlug="projects-gallery"
        sectionKey="hero"
        imageField="backgroundImage"
      />

      {/* Stats Band */}
      <section className="py-8" style={{ backgroundColor: "var(--enk-navy)" }}>
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-white">120+</div>
              <div className="text-sm text-white/60">KM Pipeline Installed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">50+</div>
              <div className="text-sm text-white/60">HDD Crossings</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">15+</div>
              <div className="text-sm text-white/60">Marine Projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">0</div>
              <div className="text-sm text-white/60">LTI Record</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-[var(--enk-radius)] text-[13px] font-medium transition-colors ${
                  activeCategory === category
                    ? "text-[var(--enk-navy)]"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
                style={activeCategory === category ? { backgroundColor: "var(--enk-accent-primary)" } : undefined}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Project Sections */}
          {showHDD && renderProjectGrid(
            hddProjects,
            "HDD Crossings",
            "Major horizontal directional drilling projects, including river crossings and infrastructure installations."
          )}
          
          {showPipeline && renderProjectGrid(
            pipelineProjects,
            "Pipeline Construction",
            "Oil and gas pipeline construction projects across various terrains including swamp, land, and shore approaches."
          )}
          
          {showMarine && renderProjectGrid(
            marineProjects,
            "Marine & Dredging",
            "Dredging, jetty construction, and marine civil works projects for ports and oil terminals."
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          style={{ backgroundColor: "rgba(20, 25, 31, 0.92)" }}
          onClick={() => setSelectedProject(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-[var(--enk-accent-on-dark)] transition-colors z-10"
            onClick={() => setSelectedProject(null)}
          >
            <X className="h-8 w-8" />
          </button>
          <div
            className="max-w-5xl w-full enk-card overflow-hidden my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <EnhancedImage
              src={selectedProject.image}
              alt={selectedProject.title}
              wrapperClassName="w-full max-h-[50vh] enk-photo-wrap"
              className="w-full max-h-[50vh] enk-photo--card"
              tone="natural"
              fallbackLabel={selectedProject.title}
            />
            <div className="p-6 md:p-8" style={{ backgroundColor: "var(--enk-surface-card)" }}>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {selectedProject.year && (
                  <span className="enk-chip enk-chip--on-dark">
                    {selectedProject.year}
                  </span>
                )}
                {selectedProject.client && (
                  <span className="text-sm text-[var(--enk-on-dark-muted)]">
                    Client: <span className="font-medium text-[var(--enk-on-dark)]">{selectedProject.client}</span>
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-bold mb-2 text-[var(--enk-on-dark)]">{selectedProject.title}</h3>
              {selectedProject.location && (
                <p className="text-[var(--enk-on-dark-muted)] mb-4">{selectedProject.location}</p>
              )}
              <p className="text-[var(--enk-on-dark-muted)] mb-6">{selectedProject.description}</p>
              {selectedProject.specs && (
                <div className="flex flex-wrap gap-2">
                  {selectedProject.specs.map((spec) => (
                    <span key={spec} className="enk-chip enk-chip--on-dark">
                      {spec}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-8 pt-6" style={{ borderTop: "1px solid var(--enk-line-dark)" }}>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 font-semibold enk-link"
                >
                  Discuss a similar project <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <CTABand 
        headline="Ready to Start Your Project?"
        subhead="Contact our team to discuss your HDD, pipeline, or marine construction requirements."
        primaryCTA={{ label: "Contact Us", href: "/contact" }}
        secondaryCTA={{ label: "View Equipment", href: "/equipment" }}
      />
    </Layout>
  );
}
