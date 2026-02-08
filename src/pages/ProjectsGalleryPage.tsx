import { Layout } from "@/components/layout";
import { Hero, CTABand } from "@/components/sections";
import { motion } from "framer-motion";
import { useState } from "react";
import { X, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

// Import authentic project images from PDFs
import heroHddRig from "@/assets/projects/hdd-night-panorama.jpg";
import hddRigOperation from "@/assets/projects/hdd-rig-night.jpg";
import pipelineConstruction from "@/assets/projects/pipe-laying-crane.jpg";
import dredgingMarine from "@/assets/projects/otumara-escravos.jpg";
import jettyConstruction from "@/assets/projects/multi-crane-operations.jpg";
import shoreApproach from "@/assets/projects/drilling-ops-5.jpg";
import pipeWelding from "@/assets/projects/welding-crew.jpg";
import rigSetup from "@/assets/projects/hdd-equipment-fleet.jpg";
import swampPipeline from "@/assets/projects/cat-excavator.jpg";
import pipelineLaying from "@/assets/projects/scope-operations.jpg";
import drillingSite from "@/assets/projects/hdd-drill-string.jpg";
import equipmentFleet from "@/assets/projects/hdd-equipment-fleet-2.jpg";
import dredgingHero from "@/assets/projects/otumara-escravos-2.jpg";
import atlasCoveMosimi from "@/assets/projects/atlas-cove-mosimi.jpg";
import lekiGasPipeline from "@/assets/projects/lekki-gas-pipeline.jpg";
import teamSafety from "@/assets/projects/team-safety.jpg";

interface Project {
  image: string;
  title: string;
  client?: string;
  location?: string;
  year?: string;
  description: string;
  specs?: string[];
}

const hddProjects: Project[] = [
  {
    image: hddRigOperation,
    title: "River Niger HDD Crossing",
    client: "NNPC/Shell",
    location: "Niger Delta, Nigeria",
    year: "2003",
    description: "Historic first HDD crossing of the River Niger, pioneering trenchless technology in Nigeria. 48-inch diameter pipeline installed across 1.2km river crossing.",
    specs: ["1,200m crossing length", "48\" diameter", "500T pullback force"],
  },
  {
    image: rigSetup,
    title: "Escravos River Crossing",
    client: "Chevron Nigeria",
    location: "Delta State, Nigeria",
    year: "2018",
    description: "Major HDD crossing beneath the Escravos River for gas export pipeline, completed ahead of schedule with zero safety incidents.",
    specs: ["850m crossing length", "36\" diameter", "D1000x900 rig"],
  },
  {
    image: drillingSite,
    title: "Lagos Lagoon Crossing",
    client: "NNPC",
    location: "Lagos, Nigeria",
    year: "2020",
    description: "Complex urban HDD crossing beneath Lagos Lagoon, navigating challenging soil conditions and existing infrastructure.",
    specs: ["1,500m crossing length", "24\" diameter", "Urban environment"],
  },
];

const pipelineProjects: Project[] = [
  {
    image: pipelineConstruction,
    title: "OML 58 Pipeline Network",
    client: "Shell Petroleum",
    location: "Rivers State, Nigeria",
    year: "2019",
    description: "Construction of 45km of oil and gas gathering pipelines across challenging swamp and mangrove terrain in the Niger Delta.",
    specs: ["45km total length", "Multiple diameters", "Swamp terrain"],
  },
  {
    image: pipeWelding,
    title: "Trans-Niger Pipeline",
    client: "NNPC/Total",
    location: "Cross River State, Nigeria",
    year: "2021",
    description: "Major trunk line construction with API-certified welding, hydrostatic testing, and coating operations.",
    specs: ["32km pipeline", "36\" diameter", "API 5L X65 steel"],
  },
  {
    image: swampPipeline,
    title: "Swamp Pipeline Installation",
    client: "Eni Nigeria",
    location: "Bayelsa State, Nigeria",
    year: "2022",
    description: "Challenging pipeline installation through deep swamp terrain using specialized equipment and flotation techniques.",
    specs: ["18km swamp crossing", "24\" diameter", "Flotation method"],
  },
  {
    image: pipelineLaying,
    title: "Onshore Gas Pipeline",
    client: "Nigeria LNG",
    location: "Bonny Island, Nigeria",
    year: "2023",
    description: "Gas pipeline construction from wellhead to processing facility with full cathodic protection system.",
    specs: ["28km length", "20\" diameter", "CP system installed"],
  },
];

const marineProjects: Project[] = [
  {
    image: dredgingMarine,
    title: "Warri Channel Dredging",
    client: "Nigerian Ports Authority",
    location: "Warri, Delta State",
    year: "2017",
    description: "Capital dredging project to deepen the Warri navigation channel to accommodate larger vessels at the port.",
    specs: ["12km channel length", "10m depth achieved", "2.5M cubic meters"],
  },
  {
    image: dredgingHero,
    title: "Bonny Deep Water Port",
    client: "NLNG/FG",
    location: "Bonny Island, Rivers State",
    year: "2020",
    description: "Marine dredging and reclamation works for the Bonny Deep Water Port project expansion.",
    specs: ["5 hectares reclaimed", "14m depth", "Cutter suction dredger"],
  },
  {
    image: jettyConstruction,
    title: "Oil Terminal Jetty",
    client: "ExxonMobil Nigeria",
    location: "Qua Iboe Terminal, Akwa Ibom",
    year: "2019",
    description: "Steel and concrete jetty construction for crude oil export terminal, including mooring dolphins and loading platforms.",
    specs: ["350m jetty length", "VLCC capable", "Steel pile foundations"],
  },
  {
    image: shoreApproach,
    title: "Shore Approach Works",
    client: "Total E&P Nigeria",
    location: "Brass, Bayelsa State",
    year: "2021",
    description: "Complex shore approach installation through surf zone and beach, connecting offshore pipeline to onshore facilities.",
    specs: ["800m approach length", "36\" pipeline", "Cofferdam method"],
  },
];

const categories = ["All Projects", "HDD Crossings", "Pipeline Construction", "Marine & Dredging"];

export default function ProjectsGalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const renderProjectGrid = (projects: Project[], title: string, description: string) => (
    <div className="mb-16">
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="group cursor-pointer bg-card rounded-lg border overflow-hidden"
            onClick={() => setSelectedProject(project)}
          >
            <div className="aspect-[4/3] overflow-hidden relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {project.year && (
                <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
                  {project.year}
                </div>
              )}
            </div>
            <div className="p-5">
              <h4 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">{project.title}</h4>
              {project.client && (
                <p className="text-sm text-primary font-medium mb-2">{project.client}</p>
              )}
              {project.location && (
                <p className="text-xs text-muted-foreground mb-3">{project.location}</p>
              )}
              <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
              {project.specs && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.specs.slice(0, 2).map((spec) => (
                    <span key={spec} className="text-xs bg-muted px-2 py-1 rounded">
                      {spec}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
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
        backgroundImage={heroHddRig}
        size="default"
        primaryCTA={{ label: "Request Quote", href: "/contact" }}
        pageSlug="projects-gallery"
        sectionKey="hero"
        imageField="backgroundImage"
      />

      {/* Stats Band */}
      <section className="bg-primary py-8">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-foreground">120+</div>
              <div className="text-sm text-primary-foreground/80">KM Pipeline Installed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-foreground">50+</div>
              <div className="text-sm text-primary-foreground/80">HDD Crossings</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-foreground">15+</div>
              <div className="text-sm text-primary-foreground/80">Marine Projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-foreground">0</div>
              <div className="text-sm text-primary-foreground/80">LTI Record</div>
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
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
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
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedProject(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-primary transition-colors z-10"
            onClick={() => setSelectedProject(null)}
          >
            <X className="h-8 w-8" />
          </button>
          <div 
            className="max-w-5xl w-full bg-card rounded-lg overflow-hidden my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="w-full h-auto max-h-[50vh] object-cover"
            />
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {selectedProject.year && (
                  <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {selectedProject.year}
                  </span>
                )}
                {selectedProject.client && (
                  <span className="text-sm text-muted-foreground">
                    Client: <span className="font-medium text-foreground">{selectedProject.client}</span>
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-bold mb-2">{selectedProject.title}</h3>
              {selectedProject.location && (
                <p className="text-muted-foreground mb-4">{selectedProject.location}</p>
              )}
              <p className="text-muted-foreground mb-6">{selectedProject.description}</p>
              {selectedProject.specs && (
                <div className="flex flex-wrap gap-2">
                  {selectedProject.specs.map((spec) => (
                    <span key={spec} className="text-sm bg-muted px-3 py-1.5 rounded-full font-medium">
                      {spec}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-8 pt-6 border-t">
                <Link 
                  to="/contact" 
                  className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
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
        primaryCTA={{ label: "Request Quote", href: "/contact" }}
        secondaryCTA={{ label: "View Equipment", href: "/equipment" }}
      />
    </Layout>
  );
}
