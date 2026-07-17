import { useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { EnhancedImage } from "@/components/ui/enhanced-image";
import { interactiveProjectImageSelections } from "@/content/projectImageSelections";
import { currentProjectImage } from "@/content/siteImageSelections";

export interface ProjectLocation {
  id: string;
  name: string;
  location: string;
  state: string;
  type: "HDD" | "Pipeline" | "Marine" | "Shore Approach" | "Dredging" | "Thrust Boring";
  coordinates: { x: number; y: number };
  description: string;
  client: string;
  year: string;
  metrics: string;
  image?: string;
  href?: string;
  scope?: string;
}

const lekkiGasPipeline = currentProjectImage("lekki-gas-pipeline.jpg");
const otumaraEscravos = currentProjectImage("otumara-escravos.jpg");
const projAtlas = currentProjectImage("proj_atlas.jpg");
const drillingSite2 = currentProjectImage("drilling-site-2.jpg");
const projOml34 = currentProjectImage("proj_oml34.jpg");
const heroRiverCrossing = currentProjectImage("hero_river_crossing.jpg");
const nipcoIbafo = currentProjectImage("nipco-ibafo.jpg");
const hddTeam1 = currentProjectImage("hdd-team-1.jpg");
const hddDrilling = currentProjectImage("hdd-night-panorama-cropped.jpg");
const pipelineConstruction = currentProjectImage("cap_pipeline.jpg");

// VERIFIED PROJECT DATA - Extracted from official ECL Project Brochures
const baseProjectLocations: ProjectLocation[] = [
  // === HDD PROJECTS ===
  {
    id: "1",
    name: "Dangote Fertilizer Lagoon Crossing",
    location: "Ejinrin, Lagos Lagoon, Lagos State",
    state: "Lagos",
    type: "HDD",
    coordinates: { x: 30, y: 54 },
    description: "Engineering, Procurement, Construction and Installation of a 36\" × 1.4km Gas Pipeline across the Lagos Lagoon / swamp at Ejinrin by HDD.",
    client: "Zakhem / Dangote Fertilizers Limited",
    year: "2018",
    metrics: "36\" × 1.4km HDD",
    scope: "Feasibility Study, Design, Welding/Pre-Testing, HDD Intersect Method, Tie-In, Commissioning, Cathodic Protection Installation",
    image: lekkiGasPipeline,
  },
  {
    id: "2",
    name: "Otumara-Escravos River Crossing",
    location: "Delta State",
    state: "Delta",
    type: "HDD",
    coordinates: { x: 40, y: 74 },
    description: "Installation of a 12\" + 3\" x 2.78km bundled crossing using the HDD intersect method, the longest bundled crossing in Africa at the time of completion.",
    client: "Saipem Contracting Nigeria Limited / SPDC",
    year: "2016",
    metrics: "2.78km Bundled HDD",
    scope: "Mobilizing 2 HDD Rigs (300T + 500T), Intersect Method drilling from both ends",
    image: otumaraEscravos,
  },
  {
    id: "3",
    name: "Atlas Cove-Mosimi 16\" × 3.1km (Arepo)",
    location: "Arepo Swamp, Ogun State",
    state: "Ogun",
    type: "HDD",
    coordinates: { x: 26, y: 50 },
    description: "Emergency reconstruction of a vandalised pipeline section using the HDD intersect method, the longest single drill in Africa (3.1km) at the time of completion.",
    client: "NNPC / PPMC",
    year: "2016",
    metrics: "16\" × 3.1km Africa Record",
    scope: "Feasibility Study, Design, Welding/Pre-Testing, HDD Intersect Method, Tie-In, Commissioning, CP Installation",
    image: projAtlas,
  },
  {
    id: "4",
    name: "Ekiadolor Deep Valley Crossing",
    location: "Ekiadolor, Edo State",
    state: "Edo",
    type: "HDD",
    coordinates: { x: 42, y: 62 },
    description: "36\" × 1.3km gas transmission pipeline across Ekiadolor Rock Valley, the deepest HDD crossing in Africa at over 80m.",
    client: "Zakhem / NGC",
    year: "2016",
    metrics: "36\" × 1.3km @ 80m depth",
    scope: "Construction, Laying and Commissioning of Gas Transmission Pipeline",
    image: drillingSite2,
  },
  {
    id: "5",
    name: "OML34, 10\" × 12km Continuous HDD",
    location: "Utorogun, Delta State",
    state: "Delta",
    type: "HDD",
    coordinates: { x: 44, y: 72 },
    description: "Installation of a 10\" × 12km pipeline by continuous horizontal directional drilling, the longest functional continuous HDD crossing in Nigeria.",
    client: "NPDC / ND Western",
    year: "2021",
    metrics: "10\" × 12km CHDD, Nigeria Record",
    scope: "Complete CHDD installation with extended reach technology",
    image: projOml34,
  },
  {
    id: "6",
    name: "Yenagoa 40\" Road/River/Pond Crossing",
    location: "Mbiama to Yenagoa, Bayelsa State",
    state: "Bayelsa",
    type: "HDD",
    coordinates: { x: 52, y: 78 },
    description: "Construction and installation of a 40\" x 760m gas pipeline at 100ft depth, the largest pipeline crossing in Nigeria at the time of completion.",
    client: "Daewoo Nigeria Limited / SPDC",
    year: "2010",
    metrics: "40\" x 760m @ 100ft depth",
    scope: "Eastern Gas Gathering System Phase II Pipelines (EGGS-2)",
    image: heroRiverCrossing,
  },
  {
    id: "7",
    name: "OB3 River Niger, 48\" Crossing Phase 1",
    location: "River Niger, Nigeria",
    state: "Delta",
    type: "HDD",
    coordinates: { x: 50, y: 70 },
    description: "Phase 1 of the 48\" × 1.835km OB3 crossing of the River Niger, delivered by HDD combined with Direct Pipe Installation; later phases in engineering.",
    client: "NGIC",
    year: "2020-2021",
    metrics: "48\" HDD + DPI, Phase 1",
    scope: "HDD pilot bore, reaming and Direct Pipe Installation works",
    image: heroRiverCrossing,
  },
  {
    id: "8",
    name: "ELGP Phase II - Multiple HDD Crossings",
    location: "Lagos to Ogun States",
    state: "Lagos",
    type: "HDD",
    coordinates: { x: 28, y: 52 },
    description: "Installation of 36\" x 7.2km pipeline in multiple sections (2km, 600m, 2.8km Ogun River, 1.9km) by HDD across swamp and built-up areas.",
    client: "Zakhem Construction / NNPC",
    year: "2015",
    metrics: "36\" x 7.2km total HDD",
    scope: "Expansion of Escravos-Lagos Gas Pipeline Project Phase II",
    image: heroRiverCrossing,
  },
  {
    id: "9",
    name: "Ibafo Gas Distribution Phase 1",
    location: "Ibafo, Lagos-Ibadan Expressway, Ogun State",
    state: "Ogun",
    type: "HDD",
    coordinates: { x: 24, y: 48 },
    description: "Construction of 15km of 12\", 8\" & 4\" underground steel pipeline with 3km by HDD across built-up areas and creek.",
    client: "NIPCO PLC",
    year: "2015",
    metrics: "15km pipeline, 3km HDD",
    scope: "Underground Steel Pipeline Laying Work & Above Ground Piping Work",
    image: nipcoIbafo,
  },
  {
    id: "10",
    name: "Ibafo Gas Distribution Phase 2",
    location: "Ibafo, Lagos-Ibadan Expressway, Ogun State",
    state: "Ogun",
    type: "HDD",
    coordinates: { x: 25, y: 47 },
    description: "Construction of 10km of 12\", 8\" & 4\" underground steel pipeline with 5km by HDD across built-up areas and creek.",
    client: "NIPCO PLC",
    year: "2016",
    metrics: "10km pipeline, 5km HDD",
    scope: "Phase 2 Underground Steel Pipeline Work",
    image: nipcoIbafo,
  },
  {
    id: "11",
    name: "Calabar River & Uruan River Crossings",
    location: "Adanga to Calabar, Cross River State",
    state: "Cross River",
    type: "HDD",
    coordinates: { x: 72, y: 76 },
    description: "Construction of 2 river crossings on 54km x 24\" gas transmission pipeline: Calabar River (680m) and Uruan River (739m) by HDD.",
    client: "Compact Manifold and Energy Services Limited (CMES)",
    year: "2013",
    metrics: "680m + 739m HDD crossings",
    scope: "Onshore Part of Lot 3 NIPP Project",
    image: hddTeam1,
  },
  {
    id: "12",
    name: "Liverpool River HDD Crossing",
    location: "Liverpool River, Rivers State",
    state: "Rivers",
    type: "HDD",
    coordinates: { x: 58, y: 76 },
    description: "Construction and Installation of 12\" x 300m Gas Pipeline by HDD across Liverpool River.",
    client: "Oilserv Limited",
    year: "2011",
    metrics: "12\" x 300m HDD",
    scope: "OANDO Pipeline Works river crossing",
    image: hddTeam1,
  },
  {
    id: "13",
    name: "Sambreiro River HDD Crossing",
    location: "Rumuji, Rivers State",
    state: "Rivers",
    type: "HDD",
    coordinates: { x: 56, y: 74 },
    description: "Construction and Installation of 12\" x 300m Gas Pipeline by HDD across Sambreiro River.",
    client: "Niger Delta Petroleum Resources",
    year: "2010",
    metrics: "12\" x 300m HDD",
    scope: "Ogbele-Rumuji Pipeline Project river crossing",
    image: hddTeam1,
  },
  {
    id: "14",
    name: "Calabar Pipeline - 7 River Crossings",
    location: "Calabar, Cross River State",
    state: "Cross River",
    type: "HDD",
    coordinates: { x: 74, y: 78 },
    description: "Complete installation of 7 river crossings using HDD on the 18\" x 130km Calabar Pipeline (1.302km, 485m, 472m, 875m, 363m, 704m, 760m).",
    client: "Oilserv Limited",
    year: "2008",
    metrics: "7 HDD crossings totaling 4.9km",
    scope: "Multiple river crossings on Calabar Pipeline Project",
    image: hddTeam1,
  },
  {
    id: "15",
    name: "Apapa Oando Jetty HDD",
    location: "Apapa, Lagos State",
    state: "Lagos",
    type: "HDD",
    coordinates: { x: 27, y: 53 },
    description: "Engineering, Procurement, Construction of (16\", 6\" and 4\" x 700m single Bundle Pull) Products Pipelines from Alakpata Facility to Marina Floating Jetty.",
    client: "Apapa SPM Limited / OANDO PLC",
    year: "2014",
    metrics: "Bundled 700m HDD",
    scope: "Offshore Pipeline Construction From New Jetty to Alakpata Facilities",
    image: hddDrilling,
  },
  {
    id: "16",
    name: "Atlas Cove-Mosimi 16\" x 1.9km (Ijeododo)",
    location: "Ijeododo Swamp, Lagos State",
    state: "Lagos",
    type: "HDD",
    coordinates: { x: 29, y: 55 },
    description: "Emergency reconstruction of Atlas Cove-Mosimi 16\" x 1900m pipeline section at Ijeododo Swamp using HDD Method.",
    client: "PSC",
    year: "2018",
    metrics: "16\" x 1.9km HDD",
    scope: "Emergency pipeline reconstruction",
    image: hddDrilling,
  },
  // === PIPELINE PROJECTS ===
  {
    id: "17",
    name: "Benin City Gas Distribution (50km)",
    location: "Benin City, Edo State",
    state: "Edo",
    type: "Pipeline",
    coordinates: { x: 43, y: 64 },
    description: "Construction, Laying and Commissioning of 50km by 4\", 8\" & 12\" Gas Distribution Pipeline and 3 CNG Filling Stations.",
    client: "NIPCO PLC",
    year: "2009",
    metrics: "50km total pipeline",
    scope: "15km of 12\", 25km of 8\", 10km of 4\" + 1.5km HDD across roads and built-up areas",
    image: pipelineConstruction,
  },
  {
    id: "18",
    name: "Ango to Auntie Julie Pipeline",
    location: "OML-59, Rivers State",
    state: "Rivers",
    type: "Pipeline",
    coordinates: { x: 60, y: 80 },
    description: "Hydrocarbon evacuation pipeline from Ango Reservoir to Auntie Julie Production Facility including 12\" x 4km HDD crossing and 12\" x 2.2km shore approach.",
    client: "Belbop Nigeria Limited / MSI Africa Development Limited",
    year: "2016",
    metrics: "35km total, 4km HDD, 2.2km shore approach",
    scope: "Dredging, wellhead platforms, 12 flowlines, gathering manifolds, 12\" bulk pipeline",
    image: pipelineConstruction,
  },
  {
    id: "19",
    name: "Adanga to Calabar Gas Pipeline",
    location: "Cross River State",
    state: "Cross River",
    type: "Pipeline",
    coordinates: { x: 70, y: 74 },
    description: "Construction, Laying and Commissioning of 24\" x 21.5km Gas Transmission Pipeline for the Lot 3 NIPP Project.",
    client: "Compact Manifold and Energy Services Limited",
    year: "2015",
    metrics: "24\" x 21.5km pipeline",
    scope: "Onshore Gas Transmission Pipeline and Metering Station",
    image: pipelineConstruction,
  },
  {
    id: "20",
    name: "Trans Niger Pipeline Loopline (TNPL)",
    location: "Ogale to TP1, Eleme, Rivers State",
    state: "Rivers",
    type: "Pipeline",
    coordinates: { x: 62, y: 78 },
    description: "Onshore Engineering, Procurement and Construction of 30\" x 12.5km Product Pipeline - Package 1.",
    client: "Kaztec Engineering Limited / SPDC",
    year: "2014",
    metrics: "30\" x 12.5km pipeline",
    scope: "From Ogale to TP1 at Eleme",
    image: pipelineConstruction,
  },
  {
    id: "21",
    name: "Geregu Gas Supply Pipeline (50km Section)",
    location: "Geregu to Ajaokuta, Kogi State",
    state: "Kogi",
    type: "Pipeline",
    coordinates: { x: 50, y: 52 },
    description: "Subcontract for installation of 50km section of 36\" x 196km Geregu Gas Supply Pipeline including 350m river crossing.",
    client: "Zakhem Construction Nigeria Limited",
    year: "2007",
    metrics: "36\" x 50km pipeline",
    scope: "ROW clearing, stringing, welding, doping, river crossing",
    image: pipelineConstruction,
  },
  {
    id: "22",
    name: "Ogbele-Rumuji Pipeline",
    location: "Rivers State",
    state: "Rivers",
    type: "Pipeline",
    coordinates: { x: 55, y: 73 },
    description: "Installation of 12\" x 13.8km pipeline including Sambreiro River Crossing by HDD.",
    client: "Niger Delta Petroleum Resources",
    year: "2010",
    metrics: "12\" x 13.8km pipeline",
    scope: "Complete pipeline installation with river crossing",
    image: pipelineConstruction,
  },
  {
    id: "23",
    name: "Gbaran Ubie NIPP Lot 2",
    location: "Bayelsa State",
    state: "Bayelsa",
    type: "Pipeline",
    coordinates: { x: 54, y: 80 },
    description: "Construction of 18\" x 1.5km Gas Pipeline at Gbaran Ubie NIPP Lot 2 Project.",
    client: "Oilserv Limited",
    year: "2010",
    metrics: "18\" x 1.5km pipeline",
    scope: "Gas pipeline construction",
    image: pipelineConstruction,
  },
  {
    id: "24",
    name: "Oredo-POOC Gas Pipeline",
    location: "Edo State",
    state: "Edo",
    type: "Pipeline",
    coordinates: { x: 44, y: 66 },
    description: "Construction of 18\" x 2.5km and 16\" x 16.5km Gas Pipeline from NPDC Oredo Facility to POOC Gas Station.",
    client: "Oilserv Limited",
    year: "2010",
    metrics: "18\" x 2.5km + 16\" x 16.5km",
    scope: "Including road crossings by thrust boring",
    image: pipelineConstruction,
  },
  {
    id: "25",
    name: "Itoro to Ibeshi Gas Pipeline",
    location: "Rivers State",
    state: "Rivers",
    type: "Pipeline",
    coordinates: { x: 64, y: 82 },
    description: "Construction of 24\" x 18km and 16\" x 16.5km Gas Pipeline from Itoro to Ibeshi.",
    client: "Zakhem Construction Nigeria Limited",
    year: "2011",
    metrics: "24\" x 18km + 16\" x 16.5km",
    scope: "Subcontract pipeline construction",
    image: pipelineConstruction,
  },
  {
    id: "26",
    name: "Gaslink Phase II - Tin-Can to Amuwo Odofin",
    location: "Lagos State",
    state: "Lagos",
    type: "Pipeline",
    coordinates: { x: 26, y: 54 },
    description: "Construction of 12\" Gas Pipeline from Honeywell Tin-Can to Amuwo Odofin including 2 HDD crossings across Coconut River.",
    client: "Oilserv Limited",
    year: "2008",
    metrics: "12\" pipeline with 2 HDD crossings",
    scope: "Gaslink Phase II Project",
    image: pipelineConstruction,
  },
  {
    id: "27",
    name: "Ajaokuta Pipeline (Obajana Cement)",
    location: "Ajaokuta to Obajana, Kogi State",
    state: "Kogi",
    type: "Pipeline",
    coordinates: { x: 48, y: 50 },
    description: "Subcontract for stringing, welding, laying of 18\" x 50km line pipes for Dangote Obajana Cement Factory.",
    client: "Zakhem Construction Nigeria Limited",
    year: "2006",
    metrics: "18\" x 50km pipeline",
    scope: "Stringing, excavation, welding, laying and backfilling",
    image: pipelineConstruction,
  },
  {
    id: "28",
    name: "Abeokuta Gas Pipeline",
    location: "Tin-Can Island to Abeokuta, Ogun State",
    state: "Ogun",
    type: "Pipeline",
    coordinates: { x: 22, y: 46 },
    description: "Transportation, stringing, welding and tie-in of 3,100pcs of 24\" diameter line pipes.",
    client: "Zakhem Construction Nigeria Limited",
    year: "2008",
    metrics: "24\" pipeline with 3,100 joints",
    scope: "From Tin-Can Island to Abeokuta",
    image: pipelineConstruction,
  },
  {
    id: "29",
    name: "Lagos-Badagry Pipeline Relocation",
    location: "Lagos-Badagry Expressway, Lagos State",
    state: "Lagos",
    type: "Pipeline",
    coordinates: { x: 24, y: 56 },
    description: "Relocation of NNPC Atlas Cove-Mosimi 16\" Pipeline: 1,800m by Open Cut and 220m by HDD.",
    client: "Lagos State Ministry of Works & Infrastructure / PPMC",
    year: "2015",
    metrics: "16\" x 2km (1.8km + 220m HDD)",
    scope: "Pipeline relocation for Carriageway Expansion Project",
    image: pipelineConstruction,
  },
  // === THRUST BORING PROJECTS ===
  {
    id: "30",
    name: "ELGP Phase II - Road Crossings",
    location: "Lagos to Ogun States",
    state: "Lagos",
    type: "Thrust Boring",
    coordinates: { x: 27, y: 51 },
    description: "Construction of 36\" Pipeline Crossings from KP 294+000 to KP 333+300 by Thrust Boring under roads.",
    client: "Zakhem Construction Nigeria Limited / NNPC",
    year: "2013",
    metrics: "Multiple 36\" thrust bore crossings",
    scope: "Expansion of Escravos-Lagos Gas Pipeline Project Phase II",
    image: hddDrilling,
  },
  {
    id: "31",
    name: "ELGP Phase I - Warri to Oben Road Crossings",
    location: "Warri to Oben, Delta State",
    state: "Delta",
    type: "Thrust Boring",
    coordinates: { x: 42, y: 70 },
    description: "Construction of 30\" Pipeline Segment by Thrust Boring under road between Warri and Oben.",
    client: "Zakhem Construction Nigeria Limited / NGC",
    year: "2011",
    metrics: "30\" thrust bore crossing",
    scope: "Escravos-Lagos Gas Pipeline Project Phase I",
    image: hddDrilling,
  },
  {
    id: "32",
    name: "Geregu Phase II - Road & Rail Crossings",
    location: "Geregu, Kogi State",
    state: "Kogi",
    type: "Thrust Boring",
    coordinates: { x: 52, y: 54 },
    description: "Subcontract for 2 Rail Crossings and 11 Road Crossings (36\" diameter pipeline) by Thrust Boring.",
    client: "Zakhem Construction Nigeria Limited / NGC",
    year: "2008",
    metrics: "2 Rail + 11 Road crossings",
    scope: "Geregu Gas Pipeline Project Phase II",
    image: hddDrilling,
  },
  {
    id: "33",
    name: "Bonny Island Road Crossings",
    location: "Bonny Island, Rivers State",
    state: "Rivers",
    type: "Thrust Boring",
    coordinates: { x: 60, y: 84 },
    description: "Installation of 4No. 18\" Pipeline Road Crossings and 36\" TSKJ/NLNG Road crossings by Thrust Boring including cofferdam construction.",
    client: "Tyvonne Nigeria Limited / Willbros West Africa Inc.",
    year: "2006",
    metrics: "Multiple 18\" & 36\" crossings",
    scope: "Sheet pile installation, cofferdam construction, thrust boring",
    image: hddDrilling,
  },
  {
    id: "34",
    name: "West African Gas Pipeline - Ghana",
    location: "Tema, Ghana",
    state: "Ghana",
    type: "Thrust Boring",
    coordinates: { x: 10, y: 58 },
    description: "Thrust Boring under sewerage line crossings at Tema for the West African Gas Pipeline Project.",
    client: "Zakhem Construction Nigeria Limited",
    year: "2009",
    metrics: "Sewerage line crossings",
    scope: "International thrust boring project",
    image: hddDrilling,
  },
  // === BENIN-WARRI CROSSING ===
  {
    id: "35",
    name: "ELGP Phase I - Benin-Warri Expressway",
    location: "Benin-Warri Expressway, Edo State",
    state: "Edo",
    type: "HDD",
    coordinates: { x: 41, y: 68 },
    description: "Construction of 30\" x 395m Gas Pipeline across Benin-Warri Expressway using HDD Technology.",
    client: "Zakhem Construction Nigeria Limited / NGC",
    year: "2012",
    metrics: "30\" x 395m HDD",
    scope: "Escravos-Lagos Gas Pipeline Project Phase I",
    image: hddDrilling,
  },
];

const projectLocations: ProjectLocation[] = baseProjectLocations.map((project) => ({
  ...project,
  image: interactiveProjectImageSelections[project.name] ?? project.image,
}));

const projectTypes = ["All", "HDD", "Pipeline", "Marine", "Dredging", "Shore Approach", "Thrust Boring"] as const;


interface InteractiveProjectMapProps {
  showHeader?: boolean;
  showStats?: boolean;
  showFilters?: boolean;
  maxHeight?: string;
  className?: string;
}

/**
 * Project locations directory: the verified project list grouped by state,
 * filterable by work type. A plain list replaces the old decorative map;
 * selecting an entry opens the record detail.
 * showHeader / showStats / maxHeight are accepted for compatibility but no
 * longer render anything.
 */
export function InteractiveProjectMap({
  showFilters = true,
  className = "",
}: InteractiveProjectMapProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectLocation | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filtered = activeFilter === "All"
    ? projectLocations
    : projectLocations.filter((p) => p.type === activeFilter);

  const states = [...new Set(filtered.map((p) => p.state))].sort((a, b) => a.localeCompare(b));

  return (
    <>
      <div className={`enk-container ${className}`}>
        {showFilters && (
          <div className="flex flex-wrap gap-2">
            {projectTypes
              .filter((type) => type === "All" || projectLocations.some((p) => p.type === type))
              .map((type) => {
              const active = activeFilter === type;
              const count =
                type === "All"
                  ? projectLocations.length
                  : projectLocations.filter((p) => p.type === type).length;
              return (
                <button
                  key={type}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setActiveFilter(type)}
                  className="rounded-[8px] px-3.5 py-2 text-[13px] font-semibold transition-colors focus-ring"
                  style={
                    active
                      ? { backgroundColor: "var(--enk-navy)", color: "#FFFFFF" }
                      : { backgroundColor: "rgba(29,35,42,0.05)", color: "var(--enk-steel)" }
                  }
                >
                  {type} <span className="font-normal opacity-70">({count})</span>
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2">
          {states.map((state) => {
            const entries = filtered.filter((p) => p.state === state);
            return (
              <section key={state} aria-label={`Projects in ${state}`}>
                <h3 className="text-[15px] font-bold text-[var(--enk-ink)]">
                  {state} <span className="font-normal text-[var(--enk-meta)]">({entries.length})</span>
                </h3>
                <ul className="mt-2 divide-y divide-[var(--enk-rule)] border-t border-[var(--enk-rule)]">
                  {entries.map((project) => (
                    <li key={project.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="group flex w-full items-baseline justify-between gap-4 rounded-md py-3 text-left focus-ring"
                      >
                        <span>
                          <span className="block text-[14px] font-semibold text-[var(--enk-ink)] group-hover:underline">
                            {project.name}
                          </span>
                          <span className="mt-0.5 block text-[12.5px] text-[var(--enk-meta)]">
                            {project.client} · {project.metrics}
                          </span>
                        </span>
                        <span className="shrink-0 text-[12.5px] text-[var(--enk-meta)]">{project.year}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>

      {/* Detail dialog. Portals outside .enk, so Tailwind globals only. */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-xl">
          {selectedProject && (
            <div>
              {selectedProject.image && (
                <div className="overflow-hidden rounded-lg">
                  <EnhancedImage
                    src={selectedProject.image}
                    alt={selectedProject.name}
                    wrapperClassName="h-48 w-full"
                    className="h-48 w-full"
                    tone="natural"
                    fallbackLabel={selectedProject.name}
                  />
                </div>
              )}
              <DialogTitle className="mt-4 text-lg font-bold text-foreground">
                {selectedProject.name}
              </DialogTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                {selectedProject.location} · {selectedProject.type} · {selectedProject.year}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-foreground">{selectedProject.description}</p>
              <dl className="mt-4 space-y-2 border-t border-border pt-3 text-sm">
                <div className="flex gap-2">
                  <dt className="w-16 shrink-0 text-muted-foreground">Client</dt>
                  <dd className="text-foreground">{selectedProject.client}</dd>
                </div>
                {selectedProject.scope && (
                  <div className="flex gap-2">
                    <dt className="w-16 shrink-0 text-muted-foreground">Scope</dt>
                    <dd className="text-foreground">{selectedProject.scope}</dd>
                  </div>
                )}
              </dl>
              {selectedProject.href && (
                <Link
                  to={selectedProject.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground underline underline-offset-4"
                  onClick={() => setSelectedProject(null)}
                >
                  View the project record
                </Link>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
