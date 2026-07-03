import { useState } from "react";
import { Layout } from "@/components/layout";
import { Hero, CTABand } from "@/components/sections";
import { motion } from "framer-motion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { usePageContent } from "@/hooks/useSiteSettings";
import { EditableText } from "@/components/content";
import { siteImageSelections } from "@/content/siteImageSelections";

// Verified project data from approved Enikkom source documents
export const completedProjects = [
  // HDD Projects
  { year: "2024", client: "NPDC", project: "16\" & 6\" Nun River Dual HDD Crossing", scope: "Dual HDD crossing under Nun River", location: "Niger Delta", type: "HDD", size: "16\" & 6\"", length: "Dual" },
  { year: "2021", client: "NPDC / ND Western", project: "OML34 Continuous HDD, 10\" × 12km", scope: "Nigeria's longest CHDD, record breaking", location: "Utorogun, Delta State", type: "HDD", size: "10\"", length: "12km" },
  { year: "2021", client: "ECL / SPDC", project: "Escravos Shore Approach Installation", scope: "Shore crossing pipeline installation", location: "Delta State", type: "Shore Approach", size: "N/A", length: "1.8km" },
  { year: "2020", client: "NPDC", project: "OB3 River Niger 48\" Direct Pipe Installation", scope: "HDD + Direct Pipe, major river crossing", location: "River Niger, Nigeria", type: "HDD", size: "48\"", length: "1.8km" },
  { year: "2018", client: "NNPC / PPMC", project: "Escravos-Lagos Pipeline System Phase II", scope: "Multiple HDD sections, gas pipeline", location: "Lagos / Delta State", type: "HDD", size: "36\"", length: "7.2km" },
  { year: "2016", client: "NNPC / PPMC", project: "Atlas Cove-Mosimi 16\" × 3.1km", scope: "Africa's longest single drill, record", location: "Arepo / Imagbon, Ogun State", type: "HDD", size: "16\"", length: "3.1km" },
  { year: "2016", client: "Saipem / SPDC", project: "Otumara-Escravos Bundled HDD Crossing", scope: "Africa's longest bundled crossing, record", location: "Delta State", type: "HDD", size: "12\" + 3\"", length: "2.78km" },
  { year: "2016", client: "Daewoo / SPDC", project: "Dangote Fertilizer 36\" × 2km Lagoon Crossing", scope: "Swamp / lagoon HDD crossing", location: "Ejirin, Lagos Lagoon", type: "HDD", size: "36\"", length: "2km" },
  { year: "2016", client: "SPDC", project: "Ekiadolor Deep Valley Crossing", scope: "Africa's deepest HDD crossing, 80m depth", location: "Edo State", type: "HDD", size: "36\"", length: "1.2km" },
  { year: "2010", client: "Daewoo / SPDC", project: "Yenagoa 40\" HDD Crossing", scope: "Largest pipeline crossing in Nigeria, record", location: "Bayelsa State", type: "HDD", size: "40\"", length: "760m" },
  { year: "2003", client: "NNPC", project: "First HDD Crossing of the River Niger", scope: "Pioneer HDD project, first in Nigeria", location: "Nigeria", type: "HDD", size: "16\"", length: "1.0km" },

  // Pipeline Projects
  { year: "2025", client: "SPDC", project: "Gbaran Phase 3b, UZU CPF Upgrade", scope: "EPC pipeline construction", location: "Bayelsa State", type: "Pipeline", size: "16\"", length: "8km & 10km" },
  { year: "2021", client: "NPDC / ND Western", project: "OML34 CHDD Pipeline", scope: "EPC, 10\" pipeline associated with CHDD", location: "Delta State", type: "Pipeline", size: "10\"", length: "12km" },
  { year: "2015", client: "NDPHC / Zakhem", project: "Calabar Gas Transmission Pipeline", scope: "Gas transmission pipeline", location: "Cross River State", type: "Pipeline", size: "24\"", length: "21.5km" },
  { year: "2009", client: "NIPCO", project: "NIPCO Gas Distribution Network", scope: "Multi-diameter gas distribution network", location: "Multiple Locations", type: "Pipeline", size: "4\" / 8\" / 12\"", length: "50km" },

  // Dredging & Piling
  { year: "2021", client: "NPDC", project: "OML34 Dredging & Cofferdam Works", scope: "Cofferdam installation and dredging", location: "Delta State", type: "Dredging", size: "N/A", length: "N/A" },
  { year: "2020", client: "NPDC", project: "OB3 Sheet Piling Works", scope: "Sheet pile installation for river crossing", location: "River Niger", type: "Dredging", size: "N/A", length: "N/A" },

  // Facilities
  { year: "2023", client: "NIPCO", project: "NIPCO Ibafo Depot, Phase 2 & 3", scope: "Depot upgrade and tank farm works", location: "Ogun State", type: "Facilities", size: "N/A", length: "N/A" },
  { year: "2009", client: "NIPCO", project: "NIPCO Ibafo Depot, Phase 1", scope: "Initial depot construction", location: "Ogun State", type: "Facilities", size: "N/A", length: "N/A" },
];

export const projectTypes = ["All", "HDD", "Pipeline", "Shore Approach", "Dredging", "Facilities"];

export default function CompletedProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const { content } = usePageContent('completed-projects');
  const heroContent = content.hero || {};
  const statsContent = content.stats || {};
  const completedImages = siteImageSelections.completedProjects;

  const filteredProjects = activeFilter === "All"
    ? completedProjects
    : completedProjects.filter((p) => p.type === activeFilter);

  const stats = {
    totalProjects: 120,
    hddCrossings: completedProjects.filter(p => p.type === "HDD").length,
    pipelineProjects: completedProjects.filter(p => p.type === "Pipeline").length,
    yearsActive: 34,
  };

  return (
    <Layout>
      <Hero
        title={heroContent.title || "Completed Projects"}
        subtitle={heroContent.subtitle || "A record of projects delivered across Nigeria and West Africa since 2003."}
        badge="120 Projects Completed"
        primaryCTA={{ label: "Download Project Profile", href: "/resources" }}
        backgroundImage={heroContent.backgroundImage || completedImages.hero}
        size="default"
        pageSlug="completed-projects"
        sectionKey="hero"
        imageField="backgroundImage"
      />

      {/* Stats */}
      <section className="py-12" style={{ backgroundColor: "var(--enk-navy)" }}>
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-white">
                <EditableText
                  value="120"
                  pageSlug="completed-projects"
                  sectionKey="stats"
                  field="stat1_value"
                />
              </p>
              <p className="text-white/80 text-sm">
                <EditableText
                  value="Projects Completed"
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
                  value="34"
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
                style={activeFilter === type ? { backgroundColor: "var(--enk-accent-primary)", color: "var(--enk-navy)" } : undefined}
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
        primaryCTA={{ label: "Contact Us", href: "/contact" }}
      />
    </Layout>
  );
}
