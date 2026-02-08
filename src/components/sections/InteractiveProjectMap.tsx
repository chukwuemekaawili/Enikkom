import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Building2, Calendar, Ruler, Filter, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Import images
import pipelineConstruction from "@/assets/capabilities/pipeline-construction.jpg";
import hddDrilling from "@/assets/capabilities/hdd-drilling.jpg";
import jettyConstruction from "@/assets/capabilities/jetty-construction.jpg";
import dredgingMarine from "@/assets/capabilities/dredging-marine.jpg";

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
  image: string;
  href?: string;
  scope?: string;
}

// VERIFIED PROJECT DATA - Extracted from official ECL Project Brochures
const projectLocations: ProjectLocation[] = [
  // === HDD PROJECTS ===
  {
    id: "1",
    name: "Lekki Gas Pipeline Project (LGPP)",
    location: "Ejinrin, Epe, Lagos State",
    state: "Lagos",
    type: "HDD",
    coordinates: { x: 30, y: 54 },
    description: "Engineering, Procurement, Construction and Installation of 36\" x 1.5km Gas Pipeline across swamp and river using HDD Intersect Method with 2 maxi rigs (300T and 500T).",
    client: "Zakhem Construction / Dangote Fertilizers Limited",
    year: "2019",
    metrics: "36\" x 1.5km HDD",
    scope: "Feasibility Study, Design, Welding/Pre-Testing, HDD Intersect Method, Tie-In, Commissioning, Cathodic Protection Installation",
    image: hddDrilling,
  },
  {
    id: "2",
    name: "Otumara-Escravos River Crossing",
    location: "Delta State",
    state: "Delta",
    type: "HDD",
    coordinates: { x: 40, y: 74 },
    description: "Installation of 12\" + 3\" x 2.78km bundled crossing using HDD Intersect Method - THE LONGEST BUNDLED CROSSING IN AFRICA at time of completion.",
    client: "Saipem Contracting Nigeria Limited / SPDC",
    year: "2016",
    metrics: "2.78km Bundled HDD",
    scope: "Mobilizing 2 HDD Rigs (300T + 500T), Intersect Method drilling from both ends",
    image: hddDrilling,
  },
  {
    id: "3",
    name: "Atlas Cove-Mosimi 16\" x 3km Pipeline (Arepo)",
    location: "Arepo Swamp, Ogun State",
    state: "Ogun",
    type: "HDD",
    coordinates: { x: 26, y: 50 },
    description: "Emergency reconstruction of vandalised pipeline section using HDD Intersect Method - LONGEST SINGLE DRILL IN AFRICA (3.1km) at time of completion.",
    client: "NNPC / PPMC",
    year: "2017",
    metrics: "16\" x 3km Record HDD",
    scope: "Feasibility Study, Design, Welding/Pre-Testing, HDD Intersect Method, Tie-In, Commissioning, CP Installation",
    image: hddDrilling,
  },
  {
    id: "4",
    name: "Ekiadalor Deep Valley Crossing",
    location: "Benin City, Edo State",
    state: "Edo",
    type: "HDD",
    coordinates: { x: 42, y: 62 },
    description: "36\" x 1.3km Gas Transmission Pipeline across Ekiadalor Rock Valley - DEEPEST HDD CROSSING IN AFRICA at over 80m depth.",
    client: "NNPC / Zakhem Construction",
    year: "2018",
    metrics: "36\" x 1.3km @ 80m depth",
    scope: "Construction, Laying and Commissioning of Gas Transmission Pipeline",
    image: hddDrilling,
  },
  {
    id: "5",
    name: "OML 34 - 12km CHDD Record",
    location: "Utorogun, Warri, Delta State",
    state: "Delta",
    type: "HDD",
    coordinates: { x: 44, y: 72 },
    description: "Installation of 12\" x 10km+ Pipeline by Continuous Horizontal Directional Drilling - LONGEST FUNCTIONAL CONTINUOUS HDD CROSSING IN NIGERIA.",
    client: "NPDC",
    year: "2023",
    metrics: "12\" x 10km+ CHDD",
    scope: "Complete HDD installation with extended reach technology",
    image: hddDrilling,
  },
  {
    id: "6",
    name: "Yenagoa 40\" Road/River/Pond Crossing",
    location: "Mbiama to Yenagoa, Bayelsa State",
    state: "Bayelsa",
    type: "HDD",
    coordinates: { x: 52, y: 78 },
    description: "Construction and installation of 40\" x 760m gas pipeline at 100ft depth - LARGEST PIPELINE SIZE CROSSING IN NIGERIA at time of completion.",
    client: "Daewoo Nigeria Limited / SPDC",
    year: "2010",
    metrics: "40\" x 760m @ 100ft depth",
    scope: "Eastern Gas Gathering System Phase II Pipelines (EGGS-2)",
    image: hddDrilling,
  },
  {
    id: "7",
    name: "Escravos Export System - Escravos Creek",
    location: "Escravos, Delta State",
    state: "Delta",
    type: "HDD",
    coordinates: { x: 38, y: 75 },
    description: "Design and Installation of 30\" x 540m Pipeline Section at Escravos Creek using HDD Method.",
    client: "Gramen Petroserve Limited / Chevron Nigeria Limited",
    year: "2018",
    metrics: "30\" x 540m HDD",
    scope: "Installation Contractor for HDD crossing",
    image: hddDrilling,
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
    image: hddDrilling,
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
    image: hddDrilling,
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
    image: hddDrilling,
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
    image: hddDrilling,
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
    image: hddDrilling,
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
    image: hddDrilling,
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
    image: hddDrilling,
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

const projectTypes = ["All", "HDD", "Pipeline", "Marine", "Dredging", "Shore Approach", "Thrust Boring"] as const;

const typeColors: Record<string, string> = {
  HDD: "bg-primary",
  Pipeline: "bg-emerald-500",
  Marine: "bg-blue-500",
  Dredging: "bg-cyan-500",
  "Shore Approach": "bg-amber-500",
  "Thrust Boring": "bg-violet-500",
};

const typeBorderColors: Record<string, string> = {
  HDD: "border-primary",
  Pipeline: "border-emerald-500",
  Marine: "border-blue-500",
  Dredging: "border-cyan-500",
  "Shore Approach": "border-amber-500",
  "Thrust Boring": "border-violet-500",
};

interface InteractiveProjectMapProps {
  showHeader?: boolean;
  showStats?: boolean;
  showFilters?: boolean;
  maxHeight?: string;
  className?: string;
}

export function InteractiveProjectMap({ 
  showHeader = true, 
  showStats = true, 
  showFilters = true,
  maxHeight = "500px",
  className = ""
}: InteractiveProjectMapProps) {
  const [activeProject, setActiveProject] = useState<ProjectLocation | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectLocation | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filteredProjects = activeFilter === "All" 
    ? projectLocations 
    : projectLocations.filter(p => p.type === activeFilter);

  const stats = {
    states: new Set(projectLocations.map(p => p.state)).size,
    projects: projectLocations.length,
    hddCrossings: projectLocations.filter(p => p.type === "HDD").length,
    pipelineKm: "100+",
  };

  return (
    <>
      <section className={`py-14 md:py-20 bg-charcoal ${className}`}>
        <div className="container-wide max-w-6xl mx-auto px-4">
          {/* Section Header */}
          {showHeader && (
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-3 block">
                Verified Project Portfolio
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                Nationwide Project Coverage
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto text-lg">
                35+ verified major projects across Nigeria and West Africa, extracted from official ECL Project Brochures.
              </p>
            </motion.div>
          )}

          {/* Stats Band */}
          {showStats && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            >
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">{stats.states}</div>
                <div className="text-white/60 text-sm">States + Ghana</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">{stats.projects}</div>
                <div className="text-white/60 text-sm">Major Projects</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">{stats.hddCrossings}</div>
                <div className="text-white/60 text-sm">HDD Crossings</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">{stats.pipelineKm}</div>
                <div className="text-white/60 text-sm">Km HDD Installed</div>
              </div>
            </motion.div>
          )}

          {/* Filter Tabs */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-wrap justify-center gap-2 mb-8"
            >
              {projectTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveFilter(type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    activeFilter === type
                      ? "bg-primary text-white shadow-lg shadow-primary/25"
                      : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                  }`}
                >
                  <Filter className="w-3.5 h-3.5" />
                  {type}
                  {type !== "All" && (
                    <span className="bg-white/20 px-1.5 py-0.5 rounded text-xs">
                      {projectLocations.filter(p => p.type === type).length}
                    </span>
                  )}
                </button>
              ))}
            </motion.div>
          )}

          {/* Map Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative bg-gradient-to-br from-charcoal-light to-charcoal rounded-2xl border border-white/10 overflow-hidden"
            style={{ height: maxHeight }}
          >
            {/* Nigeria Map SVG Background */}
            <div className="absolute inset-0 opacity-20">
              <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                {/* Simplified Nigeria outline */}
                <path
                  d="M15,35 L25,30 L35,28 L45,25 L55,22 L65,25 L75,30 L82,38 L85,48 L82,58 L78,68 L72,75 L65,82 L55,88 L45,90 L35,88 L28,82 L22,75 L18,65 L15,55 L14,45 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-primary"
                />
                {/* Niger Delta region highlight */}
                <path
                  d="M35,75 L45,78 L55,82 L65,80 L70,75 L68,85 L55,90 L42,88 L35,82 Z"
                  fill="currentColor"
                  className="text-primary/30"
                />
                {/* Grid lines */}
                {[20, 40, 60, 80].map(x => (
                  <line key={`v${x}`} x1={x} y1="20" x2={x} y2="95" stroke="currentColor" strokeWidth="0.1" className="text-white/20" />
                ))}
                {[30, 50, 70, 90].map(y => (
                  <line key={`h${y}`} x1="10" y1={y} x2="90" y2={y} stroke="currentColor" strokeWidth="0.1" className="text-white/20" />
                ))}
              </svg>
            </div>

            {/* Project Markers */}
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  className="absolute cursor-pointer group"
                  style={{
                    left: `${project.coordinates.x}%`,
                    top: `${project.coordinates.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  onMouseEnter={() => setActiveProject(project)}
                  onMouseLeave={() => setActiveProject(null)}
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Pulse ring */}
                  <div className={`absolute inset-0 rounded-full ${typeColors[project.type]} animate-ping opacity-20`} 
                       style={{ width: "20px", height: "20px", margin: "-4px" }} />
                  
                  {/* Marker dot */}
                  <div className={`w-3 h-3 rounded-full ${typeColors[project.type]} border-2 border-white shadow-lg 
                                  group-hover:scale-150 transition-transform duration-200`} />
                  
                  {/* Hover tooltip */}
                  {activeProject?.id === project.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none"
                    >
                      <div className="bg-charcoal-light border border-white/20 rounded-lg p-3 shadow-xl min-w-[220px] max-w-[280px]">
                        <div className={`inline-block px-2 py-0.5 rounded text-xs font-medium text-white mb-2 ${typeColors[project.type]}`}>
                          {project.type}
                        </div>
                        <h4 className="text-white font-semibold text-sm mb-1 line-clamp-2">{project.name}</h4>
                        <p className="text-white/60 text-xs mb-2">{project.location}</p>
                        <div className="flex items-center gap-2 text-xs text-white/50">
                          <Building2 className="w-3 h-3" />
                          <span className="truncate">{project.client}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-primary mt-1">
                          <Ruler className="w-3 h-3" />
                          <span>{project.metrics}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-charcoal-light/90 backdrop-blur border border-white/10 rounded-lg p-3">
              <div className="text-white/50 text-xs mb-2 font-medium">Project Types</div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                {Object.entries(typeColors).map(([type, color]) => (
                  <div key={type} className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
                    <span className="text-white/70 text-xs">{type}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="absolute top-4 right-4 bg-charcoal-light/90 backdrop-blur border border-white/10 rounded-lg px-3 py-2">
              <p className="text-white/50 text-xs">Click markers for details</p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-8"
          >
            <Link to="/projects">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                View Full Project Portfolio
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="bg-charcoal border-white/10 text-white max-w-2xl">
          {selectedProject && (
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${typeColors[selectedProject.type]}`}>
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className={`inline-block px-2 py-0.5 rounded text-xs font-medium text-white mb-2 ${typeColors[selectedProject.type]}`}>
                    {selectedProject.type}
                  </div>
                  <h3 className="text-xl font-bold text-white">{selectedProject.name}</h3>
                  <p className="text-white/60">{selectedProject.location}</p>
                </div>
              </div>

              {/* Image */}
              <div className="relative h-48 rounded-xl overflow-hidden">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1.5 text-white/80">
                      <Calendar className="w-4 h-4" />
                      {selectedProject.year}
                    </div>
                    <div className="flex items-center gap-1.5 text-primary">
                      <Ruler className="w-4 h-4" />
                      {selectedProject.metrics}
                    </div>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3">
                <div>
                  <h4 className="text-white/50 text-sm mb-1">Description</h4>
                  <p className="text-white/90">{selectedProject.description}</p>
                </div>
                
                <div>
                  <h4 className="text-white/50 text-sm mb-1">Client</h4>
                  <p className="text-white/90">{selectedProject.client}</p>
                </div>

                {selectedProject.scope && (
                  <div>
                    <h4 className="text-white/50 text-sm mb-1">Scope of Work</h4>
                    <p className="text-white/90">{selectedProject.scope}</p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                {selectedProject.href && (
                  <Link to={selectedProject.href} className="flex-1">
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      View Project Details
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                )}
                <Link to="/contact" className="flex-1">
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                    Request Quote
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}