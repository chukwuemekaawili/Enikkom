import { useState } from "react";
import { Layout } from "@/components/layout";
import { Hero, CTABand } from "@/components/sections";
import { motion } from "framer-motion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { usePageContent } from "@/hooks/useSiteSettings";
import { EditableText } from "@/components/admin";

import heroHddRig from "@/assets/hero/hero-hdd-rig.jpg";

// Comprehensive project data from official Enikkom documents
const completedProjects = [
  // HDD Projects
  { year: "2024", client: "Chevron", project: "16\" & 6\" Nun River HDD Crossing", scope: "Dual HDD crossing under Nun River", location: "Bayelsa State", type: "HDD", size: "16\" & 6\"", length: "1.2km" },
  { year: "2023", client: "Shell", project: "Gbaran Phase 3b HDD Crossings", scope: "Multiple HDD crossings for pipeline", location: "Bayelsa State", type: "HDD", size: "16\"", length: "2.5km" },
  { year: "2021", client: "NPDC", project: "OML34 Continuous HDD", scope: "Nigeria's longest CHDD - Record Breaking", location: "Delta State", type: "HDD", size: "10\"", length: "12km" },
  { year: "2019", client: "Dangote", project: "Lekki Gas Pipeline HDD", scope: "Swamp/river crossing for gas pipeline", location: "Lagos", type: "HDD", size: "36\"", length: "1.5km" },
  { year: "2019", client: "NNPC", project: "Trans-Forcados Pipeline HDD", scope: "Major river crossing", location: "Delta State", type: "HDD", size: "24\"", length: "1.8km" },
  { year: "2017", client: "PPMC", project: "Atlas Cove-Mosimi Emergency HDD", scope: "Africa's longest single drill - Record", location: "Lagos/Ogun", type: "HDD", size: "16\"", length: "3.1km" },
  { year: "2016", client: "Chevron", project: "Escravos River HDD Crossing", scope: "HDD crossing Escravos River", location: "Delta State", type: "HDD", size: "20\"", length: "1.2km" },
  { year: "2015", client: "Shell", project: "Nembe Creek HDD", scope: "Creek crossing for flowline", location: "Bayelsa State", type: "HDD", size: "12\"", length: "0.8km" },
  { year: "2014", client: "Total", project: "Amenam Field HDD", scope: "Field development HDD crossings", location: "Rivers State", type: "HDD", size: "10\"", length: "1.5km" },
  { year: "2012", client: "NPDC", project: "Oredo HDD Crossings", scope: "Multiple road/river crossings", location: "Edo State", type: "HDD", size: "8\"", length: "2.0km" },
  { year: "2010", client: "NNPC", project: "River Niger HDD Crossing", scope: "Historic Niger River crossing", location: "Niger State", type: "HDD", size: "20\"", length: "1.2km" },
  { year: "2008", client: "Shell", project: "Cawthorne Channel HDD", scope: "Deep water channel crossing", location: "Rivers State", type: "HDD", size: "16\"", length: "0.9km" },
  { year: "2006", client: "Chevron", project: "Abiteye HDD Crossing", scope: "Swamp area HDD", location: "Delta State", type: "HDD", size: "12\"", length: "0.7km" },
  { year: "2003", client: "NNPC", project: "First River Niger Crossing", scope: "Pioneer HDD project in Nigeria", location: "Niger State", type: "HDD", size: "16\"", length: "1.0km" },
  
  // Pipeline Projects
  { year: "2024", client: "Shell", project: "Gbaran Phase 3b Pipeline EPC", scope: "16\" pipeline construction", location: "Bayelsa State", type: "Pipeline", size: "16\"", length: "18km" },
  { year: "2023", client: "Total", project: "18\" Pipeline with HDD Crossings", scope: "Trunk line with multiple crossings", location: "Niger Delta", type: "Pipeline", size: "18\"", length: "8km" },
  { year: "2023", client: "NPDC", project: "OML 34 Pipeline Construction", scope: "Complete pipeline EPC", location: "Delta State", type: "Pipeline", size: "10\"", length: "12km" },
  { year: "2022", client: "Shell", project: "Escravos Shore Approach", scope: "Shore crossing installation", location: "Delta State", type: "Shore Approach", size: "24\"", length: "1.8km" },
  { year: "2021", client: "Chevron", project: "Bonny Island Flowline", scope: "Flowline installation", location: "Rivers State", type: "Pipeline", size: "14\"", length: "12km" },
  { year: "2020", client: "Total", project: "OML 58 Flowline Installation", scope: "Production flowline", location: "Rivers State", type: "Pipeline", size: "14\"", length: "8km" },
  { year: "2020", client: "Shell", project: "Forcados Terminal Pipeline", scope: "Trunk line to terminal", location: "Delta State", type: "Pipeline", size: "20\"", length: "6km" },
  { year: "2018", client: "Shell", project: "Gbaran-Ubie Pipeline", scope: "Gathering system installation", location: "Bayelsa State", type: "Pipeline", size: "12\"", length: "15km" },
  { year: "2017", client: "Total", project: "Amenam Pipeline", scope: "Flowline construction", location: "Rivers State", type: "Pipeline", size: "8\"", length: "6km" },
  { year: "2015", client: "Shell", project: "Nembe Creek Pipeline", scope: "Swamp pipeline", location: "Bayelsa State", type: "Pipeline", size: "12\"", length: "10km" },
  { year: "2014", client: "Chevron", project: "Meren Flowlines", scope: "Offshore flowlines", location: "Delta State", type: "Pipeline", size: "10\"", length: "5km" },
  { year: "2012", client: "ExxonMobil", project: "Qua Iboe Pipeline", scope: "Export line", location: "Akwa Ibom", type: "Pipeline", size: "16\"", length: "8km" },
  
  // Marine/Dredging Projects
  { year: "2022", client: "NLNG", project: "Lagos Port Terminal Expansion", scope: "Quay wall construction", location: "Lagos", type: "Marine", size: "-", length: "500m" },
  { year: "2021", client: "ExxonMobil", project: "Qua Iboe Terminal Upgrade", scope: "Jetty rehabilitation", location: "Akwa Ibom", type: "Marine", size: "-", length: "200m" },
  { year: "2018", client: "NLNG", project: "Bonny Terminal Dredging", scope: "Channel deepening", location: "Rivers State", type: "Dredging", size: "-", length: "3km" },
  { year: "2016", client: "ExxonMobil", project: "Eket Shore Approach", scope: "Beach crossing works", location: "Akwa Ibom", type: "Shore Approach", size: "20\"", length: "0.8km" },
  { year: "2014", client: "Shell", project: "Bonny Jetty Upgrade", scope: "Jetty extension works", location: "Rivers State", type: "Marine", size: "-", length: "150m" },
  
  // Facilities Projects
  { year: "2023", client: "NIPCO", project: "Ibafo Depot Upgrade", scope: "Flow station modifications", location: "Ogun State", type: "Facilities", size: "-", length: "-" },
  { year: "2020", client: "Shell", project: "Otumara-Escravos Facilities", scope: "Wellhead platform works", location: "Delta State", type: "Facilities", size: "-", length: "-" },
  { year: "2018", client: "Chevron", project: "Meren Platform Upgrade", scope: "Platform brownfield works", location: "Delta State", type: "Facilities", size: "-", length: "-" },
];

const projectTypes = ["All", "HDD", "Pipeline", "Marine", "Dredging", "Shore Approach", "Facilities"];

export default function CompletedProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const { content } = usePageContent('completed-projects');
  const heroContent = content.hero || {};
  const statsContent = content.stats || {};

  const filteredProjects = activeFilter === "All"
    ? completedProjects
    : completedProjects.filter((p) => p.type === activeFilter);

  const stats = {
    totalProjects: completedProjects.length,
    hddCrossings: completedProjects.filter(p => p.type === "HDD").length,
    pipelineProjects: completedProjects.filter(p => p.type === "Pipeline").length,
    yearsActive: new Date().getFullYear() - 2003 + 1,
  };

  return (
    <Layout>
      <Hero
        title={heroContent.title || "Completed Projects"}
        subtitle={heroContent.subtitle || "A comprehensive record of our successfully delivered projects across Nigeria and West Africa since 2003."}
        badge={heroContent.badge || `${stats.totalProjects}+ Projects Completed`}
        primaryCTA={{ label: "Download Project Profile", href: "/resources" }}
        backgroundImage={heroContent.backgroundImage || heroHddRig}
        size="default"
        pageSlug="completed-projects"
        sectionKey="hero"
        imageField="backgroundImage"
      />

      {/* Stats */}
      <section className="py-12 bg-primary">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-white">
                <EditableText
                  value={statsContent.stat1_value || `${stats.totalProjects}+`}
                  pageSlug="completed-projects"
                  sectionKey="stats"
                  field="stat1_value"
                />
              </p>
              <p className="text-white/80 text-sm">
                <EditableText
                  value={statsContent.stat1_label || "Projects Completed"}
                  pageSlug="completed-projects"
                  sectionKey="stats"
                  field="stat1_label"
                />
              </p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white">
                <EditableText
                  value={statsContent.stat2_value || `${stats.hddCrossings}+`}
                  pageSlug="completed-projects"
                  sectionKey="stats"
                  field="stat2_value"
                />
              </p>
              <p className="text-white/80 text-sm">
                <EditableText
                  value={statsContent.stat2_label || "HDD Crossings"}
                  pageSlug="completed-projects"
                  sectionKey="stats"
                  field="stat2_label"
                />
              </p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white">
                <EditableText
                  value={statsContent.stat3_value || "120+"}
                  pageSlug="completed-projects"
                  sectionKey="stats"
                  field="stat3_value"
                />
              </p>
              <p className="text-white/80 text-sm">
                <EditableText
                  value={statsContent.stat3_label || "KM Pipeline Installed"}
                  pageSlug="completed-projects"
                  sectionKey="stats"
                  field="stat3_label"
                />
              </p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white">
                <EditableText
                  value={statsContent.stat4_value || `${stats.yearsActive}`}
                  pageSlug="completed-projects"
                  sectionKey="stats"
                  field="stat4_value"
                />
              </p>
              <p className="text-white/80 text-sm">
                <EditableText
                  value={statsContent.stat4_label || "Years Experience"}
                  pageSlug="completed-projects"
                  sectionKey="stats"
                  field="stat4_label"
                />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Listing */}
      <section className="section-padding">
        <div className="container-wide">
          {/* Filter Bar */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {projectTypes.map((type) => (
              <Button
                key={type}
                variant={activeFilter === type ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(type)}
                className={activeFilter === type ? "bg-primary" : ""}
              >
                {type}
              </Button>
            ))}
          </div>

          <p className="text-center text-muted-foreground mb-8">
            Showing {filteredProjects.length} {activeFilter === "All" ? "" : activeFilter} projects
          </p>

          {/* Projects Table */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="relative"
          >
            <div className="md:hidden text-center text-xs text-muted-foreground mb-2 flex items-center justify-center gap-1">
              <span>←</span>
              <span>Scroll horizontally to see all columns</span>
              <span>→</span>
            </div>
            
            <div className="overflow-x-auto rounded-lg border border-border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-16 sticky left-0 bg-muted/50">Year</TableHead>
                    <TableHead className="w-24">Client</TableHead>
                    <TableHead className="min-w-[200px]">Project</TableHead>
                    <TableHead className="min-w-[180px]">Scope</TableHead>
                    <TableHead className="min-w-[120px]">Location</TableHead>
                    <TableHead className="w-20">Size</TableHead>
                    <TableHead className="w-20">Length</TableHead>
                    <TableHead className="w-24">Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProjects.map((project, i) => (
                    <TableRow key={i} className="hover:bg-muted/30">
                      <TableCell className="font-medium sticky left-0 bg-background">{project.year}</TableCell>
                      <TableCell className="text-primary font-medium whitespace-nowrap">{project.client}</TableCell>
                      <TableCell className="font-medium">{project.project}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{project.scope}</TableCell>
                      <TableCell className="text-sm whitespace-nowrap">{project.location}</TableCell>
                      <TableCell className="text-sm">{project.size}</TableCell>
                      <TableCell className="text-sm">{project.length}</TableCell>
                      <TableCell>
                        <span className="inline-block px-2 py-1 text-xs rounded bg-muted font-medium whitespace-nowrap">
                          {project.type}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground text-sm">
              <EditableText
                value={content.footer_note?.text || "This is a selection of our major projects. Contact us for a complete project portfolio."}
                pageSlug="completed-projects"
                sectionKey="footer_note"
                field="text"
              />
            </p>
          </div>
        </div>
      </section>

      <CTABand 
        headline="Ready to Start Your Project?"
        primaryCTA={{ label: "Request a Quote", href: "/contact" }}
      />
    </Layout>
  );
}
