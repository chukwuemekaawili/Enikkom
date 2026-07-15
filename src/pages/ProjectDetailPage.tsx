import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout";
import SEO from "@/components/ui/SEO";
import { testimonials } from "@/content/testimonials";
import { CTABand } from "@/components/sections";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Play, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { getProjectGalleryImages, getProjectImage } from "@/content/projectImageSelections";
import { EnhancedImage } from "@/components/ui/enhanced-image";
import {
  RecordEyebrow,
  RecordMetaRow,
  RecordSpecTable,
  RecordStatusStamp,
  FieldFigure,
  ProjectRecordCard,
  type SpecRow,
} from "@/components/records";

// Import all authentic project images from PDFs
import hddNightPanorama from "@/assets/images/projects/hdd-night-panorama-cropped.jpg";
import hddRigNight from "@/assets/images/projects/hdd-rig-night.jpg";
import pipeLaying from "@/assets/images/projects/pipe-laying-crane.jpg";
import otumaraEscravos from "@/assets/images/projects/otumara-escravos.jpg";
import otumaraEscravos2 from "@/assets/images/projects/otumara-escravos-2.jpg";
import atlasCoveMosimi from "@/assets/images/projects/atlas-cove-mosimi.jpg";
import atlasCoveMosimi2 from "@/assets/images/projects/atlas-cove-mosimi-2.jpg";
import lekiGasPipeline from "@/assets/images/projects/lekki-gas-pipeline.jpg";
import multiCraneOps from "@/assets/images/projects/multi-crane-operations.jpg";
import hddEquipmentFleet from "@/assets/images/projects/hdd-equipment-fleet.jpg";
import hddEquipmentFleet2 from "@/assets/images/projects/hdd-equipment-fleet-2.jpg";
import hddEquipmentFleet3 from "@/assets/images/projects/hdd-equipment-fleet-3.jpg";
import hddEquipmentFleet4 from "@/assets/images/projects/hdd-equipment-fleet-4.jpg";
import drillingOps4 from "@/assets/images/projects/drilling-ops-4.jpg";
import drillingOps5 from "@/assets/images/projects/drilling-ops-5.jpg";
import drillingOps6 from "@/assets/images/projects/drilling-ops-6.jpg";
import drillingOps7 from "@/assets/images/projects/drilling-ops-7.jpg";
import weldingCrew from "@/assets/images/projects/welding-crew.jpg";
import pipeHandling from "@/assets/images/projects/pipe-handling.jpg";
import pipelineCrew from "@/assets/images/projects/pipeline-crew.jpg";
import hddDrillString from "@/assets/images/projects/hdd-drill-string.jpg";
import hddTeam1 from "@/assets/images/projects/hdd-team-1.jpg";
import scopeOperations from "@/assets/images/projects/scope-operations.jpg";
import scopeOperations2 from "@/assets/images/projects/scope-operations-2.jpg";
import scopeOperations3 from "@/assets/images/projects/scope-operations-3.jpg";
import teamSafety from "@/assets/images/projects/team-safety.jpg";
import workersPpe from "@/assets/images/projects/workers-ppe.jpg";
import drillingSite2 from "@/assets/images/projects/drilling-site-2.jpg";
import craneOperations from "@/assets/images/projects/crane-operations.jpg";
import trippingSafety from "@/assets/images/projects/tripping-safety.jpg";
import nipcoIbafo from "@/assets/images/projects/nipco-ibafo.jpg";
import nipcoIbafo2 from "@/assets/images/projects/nipco-ibafo-2.jpg";
import nipcoIbafo3 from "@/assets/images/projects/nipco-ibafo-3.jpg";
import nipcoHddOps from "@/assets/images/projects/hdd-operations-2.jpg";
import catExcavator from "@/assets/images/projects/cat-excavator.jpg";
import partnershipHddThailand from "@/assets/images/projects/team-safety.jpg";
import partnershipHddThailand2 from "@/assets/images/projects/scope-operations.jpg";

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

interface ProjectData {
  title: string;
  client: string;
  location: string;
  year: string;
  capabilities: string[];
  overview: string;
  challenge: string;
  solution: string;
  results: { label: string; value: string }[];
  hseNotes: string;
  clientQuote?: { text: string; author: string; role: string };
  heroImage: string;
  scope: string[];
  youtubeId?: string;
  recordBadge?: string;
  gallery: GalleryImage[];
}

// Verified project data from Enikkom documents with dedicated galleries
const baseProjectData: Record<string, ProjectData> = {
  "oml34-chdd": {
    title: "OML34 Continuous HDD, 10\" × 12km",
    client: "NPDC / ND Western",
    location: "Utorogun, Delta State, Nigeria",
    year: "2020-2021",
    capabilities: ["HDD", "Pipeline", "CHDD"],
    overview: "Nigeria's longest functional Continuous Horizontal Directional Drilling (CHDD) project - installing 12 kilometers of 10-inch pipeline in a single continuous operation through challenging Niger Delta terrain.",
    challenge: "The OML34 field required a 12km pipeline crossing through extremely difficult swamp and riverine terrain with multiple water bodies, protected areas, and communities that made conventional pipeline installation impossible. The project demanded the longest continuous HDD ever attempted in Nigeria.",
    solution: "Enikkom deployed our HDD fleet with 500T pullback capacity rigs and established a continuous drilling operation spanning months. Our partnership with HDDThailand provided specialised downhole tools and technical expertise. Careful mud management and real-time trajectory monitoring maintained precision throughout the 12km distance.",
    results: [
      { label: "Total Length", value: "12 km" },
      { label: "Pipe Diameter", value: "10 inches" },
      { label: "Method", value: "Continuous HDD" },
      { label: "Duration", value: "14 months" },
      { label: "LTI Record", value: "Zero" },
    ],
    hseNotes: "The project maintained a strong safety record with zero LTI throughout the 14-month duration. Daily JSA reviews, regular toolbox talks, and environmental monitoring protected the sensitive Niger Delta environment.",
    clientQuote: {
      text: "Enikkom demonstrated exceptional capability in delivering this record-breaking CHDD project. Their technical expertise and commitment to safety made this complex crossing a complete success.",
      author: "Project Manager",
      role: "NPDC"
    },
    heroImage: hddNightPanorama,
    scope: [
      "Engineering design and feasibility study",
      "Continuous HDD pilot bore drilling (12km)",
      "Progressive reaming operations",
      "10\" HDPE pipeline fabrication and pullback",
      "Real-time trajectory monitoring",
      "Mud recycling and environmental management",
      "Hydrostatic testing and commissioning"
    ],
    youtubeId: "uv_ozmjIo-E",
    recordBadge: "Nigeria's Longest CHDD",
    gallery: [
      { src: hddNightPanorama, alt: "OML34 HDD Site Night Operations", caption: "Night operations at OML34 site with full lighting" },
      { src: hddRigNight, alt: "500T Maxi HDD Rig", caption: "500-ton maxi HDD rig in operation" },
      { src: hddEquipmentFleet, alt: "HDD Equipment Fleet", caption: "Complete HDD equipment spread" },
      { src: hddEquipmentFleet2, alt: "Drill Pipe Handling", caption: "Drill pipe handling operations" },
      { src: hddDrillString, alt: "Drill String Assembly", caption: "Drill string assembly and preparation" },
      { src: partnershipHddThailand, alt: "Technical coordination with specialist partners", caption: "Technical coordination with specialist drilling partners" },
      { src: partnershipHddThailand2, alt: "Specialized downhole operations monitoring", caption: "Specialized drilling support and monitoring operations" },
      { src: scopeOperations, alt: "Scope Rig Operations", caption: "Scope rig operations monitoring" },
      { src: scopeOperations2, alt: "Real-time Monitoring", caption: "Real-time trajectory monitoring" },
      { src: scopeOperations3, alt: "Drilling Control Center", caption: "Drilling control and navigation" },
      { src: teamSafety, alt: "Safety Briefing", caption: "Daily safety briefing with crew" },
      { src: workersPpe, alt: "Workers in PPE", caption: "Crew in full PPE at OML34 site" },
    ]
  },
  "otumara-escravos": {
    title: "Otumara-Escravos Bundled HDD Crossing",
    client: "Saipem Contracting Nigeria / SPDC",
    location: "Delta State, Nigeria",
    year: "2016",
    capabilities: ["HDD", "Pipeline"],
    overview: "Africa's longest bundled pipeline HDD crossing - 2.78km installation of 12-inch and 3-inch bundled pipelines under the Escravos River system for Shell Petroleum Development Company.",
    challenge: "The Otumara-Escravos project required crossing one of the Niger Delta's widest river systems with bundled pipelines. The 2.78km distance was unprecedented for a bundled crossing in Africa, requiring precise trajectory control to maintain pipe separation throughout.",
    solution: "Enikkom's technical team designed a specialized bundled crossing configuration with the 12\" and 3\" pipelines secured in precise alignment. Our 500T HDD rig with real-time gyro guidance achieved the required accuracy over the record distance. The entire bundle was pulled back in a single operation.",
    results: [
      { label: "Crossing Length", value: "2.78 km" },
      { label: "12\" Pipeline", value: "Completed" },
      { label: "3\" Pipeline", value: "Bundled" },
      { label: "Completion", value: "April 2016" },
      { label: "LTI Record", value: "Zero" },
    ],
    hseNotes: "The project was completed with zero incidents despite the technical complexity. Environmental monitoring confirmed zero impact on the Escravos River ecosystem. Daily safety briefings and a full PTW system maintained continuous safety awareness.",
    clientQuote: {
      text: "We are delighted with our experience of working with ENIKKOM on this challenging crossing. The team demonstrated unmatched professionalism. It was a pleasure working with the team.",
      author: "Construction Manager",
      role: "Saipem Contracting Nigeria"
    },
    heroImage: otumaraEscravos,
    scope: [
      "Geotechnical investigation",
      "Bundled crossing design and engineering",
      "2.78km HDD pilot bore drilling",
      "Progressive reaming to 24\" diameter",
      "12\" + 3\" bundled pipeline fabrication",
      "Single-pull bundled installation",
      "As-built survey and handover"
    ],
    recordBadge: "Africa's Longest Bundled HDD",
    gallery: [
      { src: otumaraEscravos, alt: "Otumara-Escravos HDD Site", caption: "Main HDD site at Otumara crossing" },
      { src: otumaraEscravos2, alt: "Escravos River Crossing", caption: "Escravos River aerial view" },
      { src: hddRigNight, alt: "Night Drilling Operations", caption: "24-hour drilling operations" },
      { src: hddEquipmentFleet3, alt: "HDD Rig Setup", caption: "500T rig setup at entry point" },
      { src: pipeHandling, alt: "Bundled Pipe Preparation", caption: "12\"+3\" bundled pipe preparation" },
      { src: weldingCrew, alt: "Pipeline Welding", caption: "API 1104 pipeline welding" },
      { src: pipelineCrew, alt: "Pipe String Fabrication", caption: "Pipe string fabrication onshore" },
      { src: drillingOps4, alt: "Drilling Operations", caption: "Pilot bore drilling in progress" },
      { src: drillingOps5, alt: "Reaming Operations", caption: "Progressive reaming operations" },
      { src: teamSafety, alt: "Safety Meeting", caption: "Daily safety and toolbox meeting" },
    ]
  },
  "atlas-cove-mosimi": {
    title: "Atlas Cove-Mosimi, 16\" × 3.1km",
    client: "NNPC / PPMC",
    location: "Arepo / Imagbon, Lagos-Ogun States, Nigeria",
    year: "2016",
    capabilities: ["HDD", "Pipeline"],
    overview: "Africa's longest single HDD drill - a 3.1km, 16-inch pipeline crossing for the emergency reconstruction of the Atlas Cove to Mosimi petroleum products pipeline, a critical national infrastructure asset.",
    challenge: "The Atlas Cove-Mosimi pipeline was a critical national fuel supply artery that required emergency reconstruction. The route crossed the Lagos Lagoon and environmentally sensitive areas, making conventional open-cut construction impossible. Speed was essential to restore national fuel supply.",
    solution: "Enikkom mobilized rapidly and completed what became Africa's longest single HDD drill at 3.1km. Our 500T rig with advanced downhole tools maintained precise trajectory across the entire distance. The 16\" pipeline was fabricated onshore and installed in a single pullback operation.",
    results: [
      { label: "Crossing Length", value: "3.1 km" },
      { label: "Pipe Diameter", value: "16 inches" },
      { label: "Completion", value: "April 2016" },
      { label: "Client", value: "NNPC/PPMC" },
      { label: "LTI Record", value: "Zero" },
    ],
    hseNotes: "Despite the emergency nature of the project, full HSE protocols were maintained throughout. Zero LTI record achieved. Environmental monitoring confirmed minimal impact on the Lagos Lagoon ecosystem.",
    heroImage: atlasCoveMosimi,
    scope: [
      "Rapid mobilization and site setup",
      "3.1km HDD pilot bore (Africa's longest)",
      "Progressive reaming to final diameter",
      "16\" steel pipeline fabrication",
      "Single-pull installation",
      "Hydrostatic testing and commissioning"
    ],
    recordBadge: "Africa's Longest Single Drill",
    gallery: [
      { src: atlasCoveMosimi, alt: "Atlas Cove HDD Site", caption: "HDD entry point at Atlas Cove" },
      { src: atlasCoveMosimi2, alt: "Pipeline String Preparation", caption: "16\" pipeline string preparation" },
      { src: hddEquipmentFleet4, alt: "500T HDD Rig", caption: "500-ton HDD rig deployed" },
      { src: pipeLaying, alt: "Pipeline Laying Operations", caption: "Pipeline fabrication and laying" },
      { src: craneOperations, alt: "Crane Operations", caption: "Heavy lift operations" },
      { src: multiCraneOps, alt: "Multi-Crane Setup", caption: "Multi-crane pipe handling" },
      { src: drillingOps6, alt: "Drilling Progress", caption: "Drilling progress at 2km mark" },
      { src: drillingOps7, alt: "Exit Point Operations", caption: "Exit point at Mosimi" },
      { src: weldingCrew, alt: "Field Welding", caption: "Field joint welding operations" },
      { src: trippingSafety, alt: "Safety Protocols", caption: "Safe tripping operations" },
    ]
  },
  "dangote-lagoon": {
    title: "Dangote Fertilizer, 36\" × 2km Lagoon Crossing",
    client: "Dangote Fertilizer Limited",
    location: "Ejirin, Lagos Lagoon, Lagos State, Nigeria",
    year: "2016",
    capabilities: ["HDD", "Pipeline"],
    overview: "36-inch × 2km swamp and lagoon HDD crossing delivering gas supply infrastructure to Dangote's fertilizer complex at Lekki. One of the largest diameter lagoon HDD crossings in Nigeria.",
    challenge: "The project required crossing the Lagos Lagoon with a 36-inch pipeline through challenging swamp and open-water conditions. Tidal variations, soft marine sediments, and strict timelines to support the fertilizer plant's commissioning schedule added significant complexity.",
    solution: "Enikkom deployed our 500T HDD rig with gyro guidance for the 2km crossing. The 36-inch steel pipeline was pre-fabricated onshore and pulled back in a single operation. A detailed geotechnical investigation informed the crossing design to handle the soft lagoon sediments.",
    results: [
      { label: "Crossing Length", value: "2 km" },
      { label: "Pipe Diameter", value: "36 inches" },
      { label: "Completion", value: "2016" },
      { label: "Client", value: "Dangote Fertilizer" },
      { label: "LTI Record", value: "Zero" },
    ],
    hseNotes: "Marine safety protocols were rigorously implemented. All personnel completed water safety training. Environmental monitoring confirmed zero impact on the lagoon ecosystem.",
    clientQuote: {
      text: "Outstanding job on the 36\" × 2km swamp/lagoon crossing. Impressive drilling work done by your team. We look forward to more collaborations with Enikkom in the future.",
      author: "Project Director",
      role: "Dangote Fertilizer Limited"
    },
    heroImage: lekiGasPipeline,
    scope: [
      "Geotechnical investigation and crossing design",
      "36\" HDD pilot bore and reaming operations",
      "Pipeline prefabrication (2km string)",
      "Single-pull pipeline installation",
      "Tie-in works at both ends",
      "Hydrostatic testing and commissioning"
    ],
    gallery: [
      { src: lekiGasPipeline, alt: "Lekki Gas Pipeline Site", caption: "Main HDD site for Lekki Gas Pipeline" },
      { src: hddEquipmentFleet, alt: "HDD Equipment Spread", caption: "Complete equipment spread" },
      { src: pipeLaying, alt: "36\" Pipeline Fabrication", caption: "36-inch pipeline string fabrication" },
      { src: multiCraneOps, alt: "Heavy Lift Operations", caption: "Multi-crane pipeline handling" },
      { src: hddDrillString, alt: "Drill String Preparation", caption: "Drill string preparation for the 36-inch crossing" },
      { src: drillingOps5, alt: "Support Equipment Mobilization", caption: "Support equipment mobilized for crossing operations" },
      { src: drillingOps7, alt: "Pipeline Pullback Support", caption: "Field crew supporting pullback activities" },
      { src: workersPpe, alt: "Fluid Handling Operations", caption: "Safe fluid handling and mud support operations" },
      { src: teamSafety, alt: "HSE Meeting", caption: "Daily HSE briefing" },
    ]
  },
  "yenagoa-40-crossing": {
    title: "Yenagoa 40\" HDD River Crossing",
    client: "Daewoo E&C / Shell SPDC",
    location: "Bayelsa State, Nigeria",
    year: "2010",
    capabilities: ["HDD", "Pipeline"],
    overview: "Nigeria's largest pipeline HDD crossing - a 40-inch x 760m crossing at 100ft (30m) depth, setting the record for the largest diameter trenchless pipeline installation in Nigeria.",
    challenge: "The Yenagoa project required crossing a major river with Nigeria's largest diameter HDD pipeline - 40 inches. The 100ft depth requirement added significant technical complexity, requiring precise buoyancy control and pullback force management for the heavy steel pipe string.",
    solution: "Enikkom deployed our largest HDD equipment for this record-breaking crossing. The 40\" steel pipe string was carefully fabricated and prepared with buoyancy control systems. The pullback operation was executed with precision, managing the significant forces required for the heavy pipe at depth.",
    results: [
      { label: "Crossing Length", value: "760 m" },
      { label: "Pipe Diameter", value: "40 inches" },
      { label: "Depth Below River", value: "100 ft (30m)" },
      { label: "Completion", value: "February 2010" },
      { label: "LTI Record", value: "Zero" },
    ],
    hseNotes: "The project maintained exemplary safety standards despite the technical challenges of the largest diameter HDD crossing in Nigeria. Zero incidents recorded throughout the project duration.",
    heroImage: hddRigNight,
    scope: [
      "Geotechnical investigation",
      "Crossing design for 40\" diameter",
      "HDD pilot bore and progressive reaming",
      "40\" steel pipeline prefabrication",
      "Buoyancy control system installation",
      "Pipe pullback at 100ft depth",
      "As-built survey and handover"
    ],
    recordBadge: "Nigeria's Largest Pipeline Crossing",
    gallery: [
      { src: hddRigNight, alt: "HDD Rig Night Operations", caption: "500T rig for 40\" crossing" },
      { src: hddEquipmentFleet2, alt: "Equipment Setup", caption: "Heavy equipment mobilization" },
      { src: drillingOps4, alt: "Pilot Bore", caption: "Pilot bore drilling" },
      { src: drillingOps5, alt: "Reaming Operations", caption: "Large diameter reaming" },
      { src: pipeHandling, alt: "40\" Pipe Handling", caption: "40-inch pipe string preparation" },
      { src: multiCraneOps, alt: "Crane Operations", caption: "Multi-crane heavy lift" },
    ]
  },
  "elps-phase-2": {
    title: "Escravos-Lagos Gas Pipeline Phase II",
    client: "Zakhem Construction / NNPC",
    location: "Niger Delta to Lagos, Nigeria",
    year: "2018-2019",
    capabilities: ["HDD", "Pipeline"],
    overview: "Major gas transmission infrastructure - 36-inch pipeline HDD crossings totaling 7.2km across multiple river and creek crossings for the Escravos-Lagos Pipeline System Phase II expansion.",
    challenge: "ELPS II required multiple HDD crossings across some of the Niger Delta's most challenging waterways. The 36-inch diameter and cumulative 7.2km of HDD crossings required extensive planning and sequential execution across multiple sites.",
    solution: "Enikkom mobilized multiple HDD rigs to execute crossings in parallel where possible. Our experienced crews completed 8 major crossings with a combined length of 7.2km. Strict quality control ensured consistent weld quality and coating integrity across all crossings.",
    results: [
      { label: "Total HDD Length", value: "7.2 km" },
      { label: "Pipe Diameter", value: "36 inches" },
      { label: "Number of Crossings", value: "8" },
      { label: "Duration", value: "18 months" },
      { label: "LTI Record", value: "Zero" },
    ],
    hseNotes: "HSE management system implemented across all 8 crossing sites. Regular third-party audits confirmed compliance with international standards. Zero environmental incidents.",
    clientQuote: {
      text: "ECL brings a level of client-side understanding to each and every project. Their technical capability and local expertise are unmatched. We have no hesitation in recommending ECL for HDD projects.",
      author: "Project Director",
      role: "Zakhem Construction Nigeria Limited"
    },
    heroImage: pipeLaying,
    scope: [
      "Multi-site mobilization and logistics",
      "8 HDD crossings (combined 7.2km)",
      "36\" pipeline fabrication and coating",
      "Sequential crossing execution",
      "Tie-in works at all locations",
      "Full testing program"
    ],
    gallery: [
      { src: pipeLaying, alt: "Pipeline Laying", caption: "36\" pipeline construction" },
      { src: hddEquipmentFleet3, alt: "Multi-rig Deployment", caption: "Multiple rigs deployed" },
      { src: weldingCrew, alt: "Welding Operations", caption: "High-quality pipeline welding" },
      { src: pipelineCrew, alt: "Crew Operations", caption: "Experienced pipeline crew" },
      { src: drillingOps6, alt: "Drilling Progress", caption: "Creek crossing drilling" },
      { src: drillingOps7, alt: "Site Operations", caption: "River crossing operations" },
      { src: teamSafety, alt: "Safety Standards", caption: "HSE compliance across sites" },
      { src: workersPpe, alt: "PPE Compliance", caption: "Full PPE enforcement" },
    ]
  },
  "ob3-river-niger": {
    title: "OB3 River Niger 48\" Direct Pipe Installation",
    client: "NPDC / OB3 Consortium",
    location: "River Niger, Nigeria",
    year: "2020",
    capabilities: ["HDD", "Microtunnelling", "Pipeline"],
    overview: "A landmark 48-inch x 1.8km pipeline crossing under the River Niger using a combination of HDD and Direct Pipe Installation (DPI) - one of the most technically complex crossings ever attempted in West Africa.",
    challenge: "The OB3 gas pipeline required crossing the mighty River Niger - Nigeria's largest river - with a 48-inch diameter pipe. The geological conditions presented extreme complexity with variable soil strata including sand, clay, and rock formations. The water depth and river width made conventional HDD extremely challenging.",
    solution: "Enikkom partnered with MTS Germany to deploy Direct Pipe Installation (DPI) technology - a hybrid of HDD and microtunnelling. This allowed simultaneous drilling and pipe installation with real-time steering control. Extensive geotechnical investigation using borehole data informed the crossing profile design. Cofferdam construction and dewatering systems managed groundwater.",
    results: [
      { label: "Crossing Length", value: "1.8 km" },
      { label: "Pipe Diameter", value: "48 inches" },
      { label: "Technology", value: "HDD + DPI" },
      { label: "Equipment", value: "MTS Germany" },
      { label: "LTI Record", value: "Zero" },
    ],
    hseNotes: "Complex marine safety protocols implemented for River Niger operations. Cofferdam construction required specialized safety measures. Zero LTI maintained throughout despite the technical complexity.",
    heroImage: hddNightPanorama,
    scope: [
      "Geotechnical investigation and design",
      "Cofferdam construction and dewatering",
      "Direct Pipe Installation (DPI) setup",
      "48\" pipeline fabrication",
      "HDD + microtunnelling combination",
      "Real-time trajectory monitoring",
      "Hydrostatic testing and commissioning"
    ],
    youtubeId: "PrMQDDb6ELA",
    recordBadge: "Largest DPI Crossing in Africa",
    gallery: [
      { src: hddNightPanorama, alt: "OB3 Night Operations", caption: "24-hour operations at River Niger" },
      { src: hddEquipmentFleet4, alt: "DPI Equipment", caption: "Direct Pipe Installation equipment" },
      { src: catExcavator, alt: "Cofferdam Construction", caption: "Cofferdam excavation works" },
      { src: craneOperations, alt: "Heavy Lifts", caption: "Heavy equipment mobilization" },
      { src: multiCraneOps, alt: "48\" Pipe Handling", caption: "48-inch pipe string handling" },
      { src: drillingOps4, alt: "Drilling Operations", caption: "Pilot bore operations" },
      { src: scopeOperations, alt: "Control Center", caption: "Real-time monitoring center" },
      { src: teamSafety, alt: "HSE Standards", caption: "Safety briefings and compliance" },
    ]
  },
  "ekiadolor-deep-valley": {
    title: "Ekiadolor Deep Valley Crossing",
    client: "SPDC",
    location: "Edo State, Nigeria",
    year: "2016",
    capabilities: ["HDD", "Pipeline"],
    overview: "Africa's deepest HDD crossing - a 36-inch x 1.2km pipeline installation at 80 meters depth through extremely challenging geological conditions including rock, sand, coal, and clay formations.",
    challenge: "The Ekiadolor crossing presented unprecedented depth requirements at 80m - the deepest HDD ever attempted in Nigeria. The geological survey revealed a complex formation with alternating layers of rock, sand, coal seams, and clay. Initial drilling attempts encountered tool losses and steering challenges in the variable formation.",
    solution: "After extensive analysis using 2D/3D Electrical Resistivity Imaging, Enikkom's engineering team designed a custom hybrid reamer specifically for the rock/sand/coal/clay formation. The tool combined rock cutting elements with sand displacement features. Three drilling attempts refined the approach, ultimately achieving success with the specialized tooling and optimized drilling parameters.",
    results: [
      { label: "Crossing Length", value: "1.2 km" },
      { label: "Pipe Diameter", value: "36 inches" },
      { label: "Maximum Depth", value: "80 meters" },
      { label: "Soil Analysis", value: "2D/3D ERI" },
      { label: "LTI Record", value: "Zero" },
    ],
    hseNotes: "Deep drilling operations required enhanced safety protocols. Mud pressure monitoring critical at 80m depth. Zero incidents despite the technical challenges and multiple drilling attempts.",
    clientQuote: {
      text: "The Ekiadolor crossing pushed the boundaries of HDD capability in Nigeria. Enikkom's persistence and engineering innovation made what seemed impossible a reality.",
      author: "Project Engineer",
      role: "NPDC"
    },
    heroImage: drillingSite2,
    scope: [
      "2D/3D Electrical Resistivity Imaging survey",
      "Custom hybrid reamer design and fabrication",
      "36\" HDD pilot bore at 80m depth",
      "Progressive reaming operations",
      "Pipeline fabrication and coating",
      "Single-pull installation",
      "As-built survey and handover"
    ],
    recordBadge: "Africa's Deepest HDD Crossing",
    gallery: [
      { src: drillingSite2, alt: "Ekiadolor Site", caption: "Deep valley crossing site" },
      { src: hddEquipmentFleet, alt: "HDD Setup", caption: "Heavy-duty HDD equipment" },
      { src: hddDrillString, alt: "Drill String", caption: "Specialized drill string assembly" },
      { src: scopeOperations2, alt: "Depth Monitoring", caption: "Real-time depth monitoring" },
      { src: drillingOps5, alt: "Drilling Operations", caption: "Deep drilling operations" },
      { src: trippingSafety, alt: "Safe Operations", caption: "Safe tripping procedures" },
    ]
  },
  "nipco-gas-distribution": {
    title: "NIPCO Gas Distribution Network",
    client: "NIPCO PLC",
    location: "Lagos State, Nigeria",
    year: "2009",
    capabilities: ["HDD", "Pipeline"],
    overview: "50km urban gas distribution network installation with extensive HDD crossings for roads, utilities, and waterways in the Lagos metropolitan area.",
    challenge: "Installing a 50km gas distribution network across Lagos required minimizing disruption to one of Africa's most congested urban environments. Numerous road crossings, existing utilities, and waterways demanded trenchless solutions.",
    solution: "Enikkom executed extensive HDD crossings throughout the network using a range of rig sizes for different pipe diameters (4\", 8\", 12\"). Careful coordination with Lagos State authorities minimized traffic disruption. GPS-guided navigation avoided existing utilities.",
    results: [
      { label: "Total Network", value: "50 km" },
      { label: "Pipe Diameters", value: "4\"/8\"/12\"" },
      { label: "HDD Crossings", value: "50+" },
      { label: "Completion", value: "August 2009" },
      { label: "LTI Record", value: "Zero" },
    ],
    hseNotes: "Urban safety protocols strictly observed throughout. Traffic management plans coordinated with Lagos authorities. Zero third-party incidents despite work in densely populated areas.",
    clientQuote: {
      text: "Enikkom has provided Horizontal Directional Drilling services to our company, having satisfied our requirements for efficient work. We highly recommend their services.",
      author: "Operations Manager",
      role: "NIPCO PLC"
    },
    heroImage: nipcoIbafo,
    scope: [
      "Network design and engineering",
      "50+ HDD road and utility crossings",
      "Multi-diameter pipeline installation",
      "Urban traffic management",
      "Pressure testing and commissioning",
      "As-built documentation"
    ],
    gallery: [
      { src: nipcoIbafo, alt: "NIPCO Site Operations", caption: "Urban HDD crossing operations" },
      { src: nipcoIbafo2, alt: "Road Crossing", caption: "Road crossing without disruption" },
      { src: nipcoIbafo3, alt: "Pipeline Installation", caption: "Gas pipeline installation" },
      { src: nipcoHddOps, alt: "HDD Equipment", caption: "Compact urban HDD rig" },
      { src: pipeHandling, alt: "Pipe Handling", caption: "Pipe handling in urban area" },
      { src: teamSafety, alt: "Safety Protocols", caption: "Urban safety protocols" },
    ]
  },
  "calabar-gas-transmission": {
    title: "Calabar Gas Transmission Pipeline",
    client: "CMES / NDPHC",
    location: "Cross River State, Nigeria",
    year: "2015",
    capabilities: ["HDD", "Pipeline"],
    overview: "24-inch x 21.5km gas transmission pipeline construction with multiple HDD crossings for the Calabar Gas Transmission Project, providing critical gas supply infrastructure for power generation.",
    challenge: "The 21.5km pipeline route traversed multiple waterways and environmentally sensitive areas in Cross River State. The project required coordinating pipeline construction with multiple HDD crossings while maintaining strict environmental compliance.",
    solution: "Enikkom executed both the conventional pipeline construction and all HDD crossings under an integrated EPC approach. Multiple HDD rigs were deployed for parallel execution of crossings. Advanced coating systems ensured long-term pipeline integrity.",
    results: [
      { label: "Pipeline Length", value: "21.5 km" },
      { label: "Pipe Diameter", value: "24 inches" },
      { label: "HDD Crossings", value: "Multiple" },
      { label: "Completion", value: "July 2015" },
      { label: "LTI Record", value: "Zero" },
    ],
    hseNotes: "The project was completed with zero LTI incidents. Environmental monitoring confirmed compliance with Cross River State environmental requirements. Community engagement maintained positive relations throughout.",
    heroImage: pipeLaying,
    scope: [
      "Engineering, Procurement & Construction",
      "ROW preparation and access construction",
      "24\" pipeline fabrication and welding",
      "Multiple HDD river/creek crossings",
      "Field joint coating",
      "Hydrostatic testing and commissioning"
    ],
    gallery: [
      { src: pipeLaying, alt: "Pipeline Construction", caption: "24\" pipeline laying operations" },
      { src: weldingCrew, alt: "Field Welding", caption: "API 1104 field welding" },
      { src: pipelineCrew, alt: "Pipeline Crew", caption: "Experienced pipeline crew" },
      { src: hddEquipmentFleet3, alt: "HDD Operations", caption: "River crossing HDD" },
      { src: drillingOps6, alt: "Creek Crossing", caption: "Creek crossing drilling" },
      { src: teamSafety, alt: "Safety Meeting", caption: "Daily safety briefings" },
    ]
  },
  "river-niger-historic": {
    title: "River Niger Historic HDD Crossing",
    client: "NNPC",
    location: "Niger State, Nigeria",
    year: "2003",
    capabilities: ["HDD", "Pipeline"],
    overview: "Nigeria's first-ever Horizontal Directional Drilling (HDD) crossing - a pioneering project that introduced trenchless pipeline technology to Nigeria and set the foundation for Enikkom's leadership in the field.",
    challenge: "In 2003, HDD technology was virtually unknown in Nigeria. The River Niger crossing required bringing equipment, expertise, and technology from abroad while training local crews and establishing operational procedures in an entirely new market.",
    solution: "Enikkom's founder, Engr. Edward Amene, led the pioneering effort to introduce HDD to Nigeria. International partnerships provided equipment and initial expertise, while intensive local training built Nigerian capacity. The successful crossing proved the viability of HDD for Nigeria's challenging terrain.",
    results: [
      { label: "Achievement", value: "First HDD in Nigeria" },
      { label: "Year", value: "2003" },
      { label: "Location", value: "River Niger" },
      { label: "Client", value: "NNPC" },
      { label: "Legacy", value: "Industry Pioneer" },
    ],
    hseNotes: "Established safety standards that would become the foundation for all future Enikkom HDD operations. Zero incidents on this historic first crossing.",
    heroImage: hddRigNight,
    scope: [
      "Technology introduction to Nigeria",
      "Equipment importation and setup",
      "Local crew training and capacity building",
      "HDD pilot bore and reaming",
      "Pipeline installation",
      "Industry pioneering achievement"
    ],
    recordBadge: "First HDD in Nigeria",
    gallery: [
      { src: hddRigNight, alt: "Historic HDD Rig", caption: "First HDD rig in Nigeria" },
      { src: hddEquipmentFleet2, alt: "Pioneer Equipment", caption: "Pioneering HDD equipment" },
      { src: hddTeam1, alt: "Pioneer Team", caption: "The pioneering HDD team" },
      { src: teamSafety, alt: "Training", caption: "Local crew training" },
    ]
  },
  "nun-river-dual-hdd": {
    title: "Nun River Dual HDD Crossing, 16\" & 6\"",
    client: "NPDC",
    location: "Niger Delta, Nigeria",
    year: "2024",
    capabilities: ["HDD", "Pipeline"],
    overview: "A dual Horizontal Directional Drilling crossing installing 16-inch and 6-inch pipelines beneath the Nun River for NPDC, one of Enikkom's most recent trenchless crossings in the Niger Delta.",
    challenge: "The Nun River crossing required installing two lines of different diameters beneath an active river in soft, variable riverine ground, without disturbing the waterway or surrounding communities. Conventional open-cut installation was not viable across the river corridor.",
    solution: "Enikkom executed the crossing as two separate HDD drives, sequencing the 16-inch and 6-inch installations to maintain trajectory control and separation. Owned maxi-rig capacity, in-house mud recycling and real-time trajectory monitoring delivered both lines under the river to the required depth of cover.",
    results: [
      { label: "Pipe Diameters", value: "16\" & 6\"" },
      { label: "Method", value: "Dual HDD" },
      { label: "Crossing", value: "Nun River" },
      { label: "Client", value: "NPDC" },
      { label: "Year", value: "2024" },
    ],
    hseNotes: "Delivered under Enikkom's ISO 45001-certified HSE system with daily JSAs, toolbox talks and environmental monitoring to protect the sensitive riverine setting.",
    heroImage: hddNightPanorama,
    scope: [
      "Geotechnical investigation and crossing design",
      "16\" HDD pilot bore, reaming and pullback",
      "6\" HDD pilot bore, reaming and pullback",
      "Mud recycling and environmental management",
      "Real-time trajectory monitoring",
      "Hydrostatic testing and commissioning",
    ],
    recordBadge: "2024 Dual HDD Crossing",
    gallery: [
      { src: hddNightPanorama, alt: "Nun River HDD site operations", caption: "HDD spread on station for the Nun River crossing" },
      { src: hddRigNight, alt: "Maxi HDD rig", caption: "Maxi HDD rig in operation" },
      { src: hddDrillString, alt: "Drill string assembly", caption: "Drill string assembly and preparation" },
      { src: drillingOps4, alt: "Directional drilling operations", caption: "Directional drilling operations" },
      { src: teamSafety, alt: "Safety briefing", caption: "Daily safety briefing with crew" },
      { src: workersPpe, alt: "Crew in PPE", caption: "Crew in full PPE on site" },
    ]
  },
  "gbaran-phase-3b": {
    title: "Gbaran Phase 3b, UZU CPF Upgrade",
    client: "SPDC",
    location: "Bayelsa State, Nigeria",
    year: "2025",
    capabilities: ["Pipeline", "Facilities", "EPC"],
    overview: "EPC pipeline construction supporting the UZU Central Processing Facility upgrade under Gbaran Phase 3b for Shell Petroleum Development Company, one of Enikkom's most recent EPC awards.",
    challenge: "The Gbaran Phase 3b scope required installing 16-inch pipeline sections totalling 8 km and 10 km to tie into the UZU CPF upgrade, across Bayelsa's swamp and riverine terrain and to Shell's EPC standards.",
    solution: "Enikkom delivered the work as an integrated EPC package, self-performing pipeline fabrication, welding, coating, installation, testing and tie-in to the facility. Owned pipeline and marine spreads, in-house project controls and QA/QC kept the multi-front scope on schedule to the client's specification.",
    results: [
      { label: "Pipe Diameter", value: "16 inches" },
      { label: "Pipeline Lengths", value: "8 km & 10 km" },
      { label: "Scope", value: "EPC construction" },
      { label: "Client", value: "SPDC" },
      { label: "Year", value: "2025" },
    ],
    hseNotes: "Executed under Enikkom's ISO 9001/14001/45001-certified management systems with integrated QA/QC, inspection and test plans, and environmental controls for the Bayelsa terrain.",
    heroImage: pipeLaying,
    scope: [
      "EPC engineering and procurement support",
      "16\" pipeline fabrication, welding and coating",
      "Pipeline installation across swamp terrain (8 km & 10 km)",
      "Non-destructive testing and hydrotesting",
      "Tie-in to the UZU CPF upgrade",
      "Pre-commissioning and commissioning support",
    ],
    recordBadge: "2025 EPC Award",
    gallery: [
      { src: pipeLaying, alt: "Pipeline installation", caption: "Pipeline lowering and installation" },
      { src: weldingCrew, alt: "Welding crew", caption: "Field welding operations" },
      { src: pipelineCrew, alt: "Pipeline crew", caption: "Pipeline construction crew on site" },
      { src: craneOperations, alt: "Crane operations", caption: "Crane and sideboom operations" },
      { src: catExcavator, alt: "Excavation", caption: "Excavation and right-of-way works" },
      { src: workersPpe, alt: "Crew in PPE", caption: "Crew in full PPE on site" },
    ]
  },
};

function buildCuratedGallery(slug: string, project: ProjectData) {
  const curatedGallery = getProjectGalleryImages(slug).map((src, index) => ({
    src,
    alt: project.gallery[index]?.alt || `${project.title} gallery image ${index + 1}`,
    caption: project.gallery[index]?.caption,
  }));

  return curatedGallery.length > 0 ? curatedGallery : project.gallery;
}

const projectData: Record<string, ProjectData> = Object.fromEntries(
  Object.entries(baseProjectData).map(([slug, project]) => [
    slug,
    {
      ...project,
      heroImage: getProjectImage(slug, "hero") || project.heroImage,
      gallery: buildCuratedGallery(slug, project),
    },
  ]),
) as Record<string, ProjectData>;

const relatedProjects = [
  {
    title: "OML34 Continuous HDD",
    location: "Niger Delta",
    metric: "12km",
    metricLabel: "Nigeria's longest CHDD",
    tags: ["HDD"],
    href: "/projects/oml34-chdd",
    thumbnail: getProjectImage("oml34-chdd", "related"),
  },
  {
    title: "Lekki Gas Pipeline",
    location: "Lagos",
    metric: "36\" x 1.5km",
    metricLabel: "Dangote Fertilizer",
    tags: ["HDD"],
    href: "/projects/dangote-lagoon",
    thumbnail: getProjectImage("dangote-lagoon", "projectMap"),
  },
  {
    title: "Otumara-Escravos",
    location: "Delta State",
    metric: "2.78km",
    metricLabel: "Africa's longest bundled",
    tags: ["HDD"],
    href: "/projects/otumara-escravos",
    thumbnail: getProjectImage("otumara-escravos", "projectMap"),
  },
  {
    title: "Atlas Cove-Mosimi",
    location: "Lagos-Ogun",
    metric: "3.1km",
    metricLabel: "Africa's longest drill",
    tags: ["HDD"],
    href: "/projects/atlas-cove-mosimi",
    thumbnail: getProjectImage("atlas-cove-mosimi", "projectMap"),
  },
  {
    title: "OB3 River Niger 48\"",
    location: "River Niger",
    metric: "48\" x 1.8km",
    metricLabel: "HDD + DPI Technology",
    tags: ["HDD", "Microtunnelling"],
    href: "/projects/ob3-river-niger",
    thumbnail: getProjectImage("ob3-river-niger", "related"),
  },
  {
    title: "Ekiadolor Deep Valley",
    location: "Edo State",
    metric: "80m Depth",
    metricLabel: "Nigeria's deepest HDD",
    tags: ["HDD"],
    href: "/projects/ekiadolor-deep-valley",
    thumbnail: getProjectImage("ekiadolor-deep-valley", "related"),
  },
];

/** Record-style narrative block: amber-ruled eyebrow, heading, and body. */
function RecordSection({
  eyebrow,
  refNo,
  title,
  children,
  className,
}: {
  eyebrow: string;
  refNo?: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={className}>
      <RecordEyebrow refNo={refNo}>{eyebrow}</RecordEyebrow>
      <h2 className="enk-display mt-3 text-[clamp(1.3rem,2.3vw,1.65rem)] text-[var(--enk-ink)]">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

/** Field-record body prose — plain, documented, not marketing copy. */
function RecordProse({ children }: { children: ReactNode }) {
  return (
    <p className="max-w-2xl text-[15px] leading-relaxed text-[var(--enk-steel)] md:text-[16px]">
      {children}
    </p>
  );
}

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? projectData[slug] : null;
  const projectTestimonial = testimonials.find((t) => t.projectSlug === slug);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  // Filter out current project from related records
  const filteredRelatedProjects = relatedProjects.filter((p) => !p.href.includes(slug || "")).slice(0, 3);

  if (!project) {
    return (
      <Layout>
        <section className="enk-section">
          <div className="enk-container max-w-xl text-center">
            <RecordEyebrow align="center">Record not found</RecordEyebrow>
            <h1 className="enk-display mt-4 text-[clamp(1.8rem,4vw,2.6rem)] text-[var(--enk-ink)]">
              No record on file
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-[var(--enk-steel)]">
              The requested project record does not exist in the register.
            </p>
            <Link to="/projects" className="enk-btn enk-btn--outline mt-8 inline-flex">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to project register
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  const {
    title,
    client,
    location,
    year,
    capabilities,
    overview,
    challenge,
    solution,
    results,
    hseNotes,
    clientQuote,
    heroImage,
    scope,
    youtubeId,
    recordBadge,
    gallery,
  } = project;

  const discipline = capabilities.join(" · ");
  // Key figures pulled straight from the verified results ledger — never invented.
  const heroFigures = results.slice(0, 3);
  const ltiEntry = results.find(
    (r) => /lti/i.test(r.label) && /zero/i.test(r.value),
  );
  const isRecordHolder = Boolean(recordBadge && /longest|largest|deepest|first|record/i.test(recordBadge));

  // Title-block metadata — only fields that exist.
  const metaItems = [
    { label: "Client", value: client },
    { label: "Location", value: location },
    { label: "Year", value: year },
    { label: "Discipline", value: discipline },
    { label: "Status", value: "On record" },
  ].filter((item) => Boolean(item.value));

  // Technical specification ledger, built from the verified results data.
  const specRows: SpecRow[] = results.map((r) => ({ label: r.label, value: r.value }));

  return (
    <Layout>
      <SEO
        title={`${title}, ${location} – Enikkom`}
        description={overview || challenge}
        canonical={`/projects/${slug}`}
      />

      {/* ── Project dossier header — document cover sheet, not a marketing hero ── */}
      <section
        aria-label="Project record header"
        style={{ backgroundColor: "var(--enk-bg-muted)", borderBottom: "1px solid var(--enk-rule)" }}
      >
        <div className="enk-container grid items-start gap-10 py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)]">
          <div>
            <Link
              to="/projects"
              className="inline-flex min-h-[40px] items-center gap-2 text-[14px] font-bold text-[var(--enk-accent-on-dark)] transition-colors hover:text-[var(--enk-accent-primary-on-dark)] focus-ring rounded-md"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              Project Register
            </Link>

            <div className="mt-5">
              <RecordEyebrow refNo={year}>Project record</RecordEyebrow>
            </div>
            <h1 className="enk-display mt-4 max-w-2xl text-[clamp(1.8rem,3.8vw,2.7rem)] text-[var(--enk-on-dark)]">
              {title}
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--enk-on-dark-muted)] md:text-[16px]">
              {overview}
            </p>

            {(recordBadge || ltiEntry) && (
              <div className="mt-6 flex flex-wrap items-center gap-2.5">
                {recordBadge && (
                  <RecordStatusStamp tone={isRecordHolder ? "record" : "neutral"}>
                    {recordBadge}
                  </RecordStatusStamp>
                )}
                {ltiEntry && <RecordStatusStamp tone="complete">Zero LTI</RecordStatusStamp>}
              </div>
            )}

            <RecordMetaRow className="mt-8" items={metaItems} />

            {heroFigures.length > 0 && (
              <dl className="mt-8 grid max-w-xl grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3">
                {heroFigures.map((figure) => (
                  <div key={figure.label} className="border-t border-[var(--enk-rule)] pt-3">
                    <dt className="enk-overline">{figure.label}</dt>
                    <dd className="enk-mono mt-1.5 text-[clamp(1.05rem,1.6vw,1.3rem)] font-semibold leading-none text-[var(--enk-on-dark)]">
                      {figure.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          <FieldFigure
            className="lg:sticky lg:top-24"
            src={heroImage}
            alt={`Field documentation: ${title}`}
            caption="Site documentation from the project record"
            date={year}
            ratio="4/3"
            priority
            sizes="(min-width: 1024px) 480px, 100vw"
          />
        </div>
      </section>

      {/* ── Record body — narrative + specification ledger ── */}
      <section className="enk-section">
        <div className="enk-container grid gap-12 lg:grid-cols-3">
          <div className="space-y-12 lg:col-span-2">
            {/* Field video record */}
            {youtubeId && (
              <RecordSection eyebrow="Site Footage" title="Field video record">
                <div
                  className="aspect-video overflow-hidden border"
                  style={{ borderColor: "var(--enk-rule)", borderRadius: "var(--enk-radius-record)" }}
                >
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${youtubeId}?rel=0`}
                    title={title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
                <p className="mt-3 flex items-center gap-2 text-[12.5px] text-[var(--enk-blueprint)]">
                  <Play className="h-3.5 w-3.5" aria-hidden="true" />
                  Recorded site footage
                </p>
              </RecordSection>
            )}

            {/* Record summary */}
            <RecordSection eyebrow="Record Summary" title="Project summary">
              <RecordProse>{overview}</RecordProse>
            </RecordSection>

            {/* Scope of works */}
            {scope.length > 0 && (
              <RecordSection eyebrow="Scope" title="Scope of works">
                <ul
                  className="max-w-2xl border-t"
                  style={{ borderColor: "var(--enk-rule)" }}
                >
                  {scope.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-baseline gap-3 border-b py-2.5"
                      style={{ borderColor: "var(--enk-rule)" }}
                    >
                      <span className="text-[14px] leading-snug text-[var(--enk-steel)] md:text-[15px]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </RecordSection>
            )}

            {/* Site conditions */}
            <RecordSection eyebrow="Site Conditions" title="Site & field conditions">
              <RecordProse>{challenge}</RecordProse>
            </RecordSection>

            {/* Method of execution */}
            <RecordSection eyebrow="Execution" title="Method of execution">
              <RecordProse>{solution}</RecordProse>
            </RecordSection>

            {/* QHSE / delivery proof */}
            <RecordSection eyebrow="QHSE" refNo="ENK-QHSE" title="QHSE & delivery record">
              <div
                className="max-w-2xl border p-5"
                style={{
                  borderColor: "var(--enk-rule)",
                  borderRadius: "var(--enk-radius-record)",
                  backgroundColor: "var(--enk-record-surface)",
                }}
              >
                {ltiEntry && (
                  <div className="mb-4 flex flex-wrap items-center gap-2.5">
                    <RecordStatusStamp tone="qhse">Zero LTI</RecordStatusStamp>
                  </div>
                )}
                <p className="text-[14px] leading-relaxed text-[var(--enk-steel)] md:text-[15px]">
                  {hseNotes}
                </p>
                <p className="mt-4 border-t border-[var(--enk-rule)] pt-3.5 text-[12.5px] text-[var(--enk-blueprint)]">
                  QHSE documentation available for procurement review
                </p>
              </div>
            </RecordSection>

            {/* Client correspondence */}
            {clientQuote && (
              <RecordSection eyebrow="Client Correspondence" title="On record from the client">
                <figure
                  className="max-w-2xl border p-5"
                  style={{
                    borderColor: "var(--enk-rule)",
                    borderRadius: "var(--enk-radius-record)",
                    backgroundColor: "var(--enk-record-surface)",
                  }}
                >
                  <blockquote className="text-[15px] leading-relaxed text-[var(--enk-steel)] md:text-[16px]">
                    "{clientQuote.text}"
                  </blockquote>
                  <figcaption className="mt-4 border-t border-[var(--enk-rule)] pt-3.5">
                    <p className="text-[13.5px] font-bold text-[var(--enk-ink)]">
                      {clientQuote.author}
                    </p>
                    <p className="mt-1 text-[12.5px] text-[var(--enk-blueprint)]">
                      {clientQuote.role}
                    </p>
                  </figcaption>
                </figure>
              </RecordSection>
            )}
          </div>

          {/* Specification ledger sidebar */}
          <aside className="lg:col-span-1">
            <div
              className="border p-5 lg:sticky lg:top-24"
              style={{
                borderColor: "var(--enk-rule)",
                borderRadius: "var(--enk-radius-record)",
                backgroundColor: "var(--enk-record-surface)",
              }}
            >
              <div className="flex items-center justify-between gap-3">
                <RecordEyebrow>Specification</RecordEyebrow>
                {recordBadge && isRecordHolder && (
                  <RecordStatusStamp tone="record">Record</RecordStatusStamp>
                )}
              </div>

              <RecordSpecTable className="mt-4" rows={specRows} dense />

              <dl className="mt-4 border-t border-[var(--enk-rule)] pt-4 text-[12px]">
                <div className="flex items-baseline justify-between gap-4 py-1">
                  <dt className="enk-overline shrink-0">Client</dt>
                  <dd className="enk-mono text-right text-[var(--enk-on-dark)]">{client}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 py-1">
                  <dt className="enk-overline shrink-0">Discipline</dt>
                  <dd className="enk-mono text-right text-[var(--enk-on-dark)]">{discipline}</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>

      {/* ── Independent client correspondence (merged from former /testimonials) ── */}
      {projectTestimonial && (
        <section className="enk-section" style={{ backgroundColor: "var(--enk-bg-muted)" }}>
          <div className="enk-container">
            <div className="mb-8 max-w-2xl">
              <RecordEyebrow>Client feedback</RecordEyebrow>
              <h2 className="enk-display mt-3 text-[clamp(1.3rem,2.3vw,1.65rem)] text-[var(--enk-ink)]">
                Filed client feedback
              </h2>
            </div>
            <figure
              className="max-w-3xl border p-6 md:p-7"
              style={{
                borderColor: "var(--enk-rule)",
                borderRadius: "var(--enk-radius-record)",
                backgroundColor: "var(--enk-record-surface)",
              }}
            >
              <blockquote className="text-[15px] leading-relaxed text-[var(--enk-steel)] md:text-[17px]">
                "{projectTestimonial.quote}"
              </blockquote>
              <figcaption className="mt-5 border-t border-[var(--enk-rule)] pt-4">
                <p className="text-[13.5px] font-bold text-[var(--enk-ink)]">
                  {projectTestimonial.client}
                </p>
                {projectTestimonial.project && (
                  <p className="mt-1 text-[12.5px] text-[var(--enk-blueprint)]">
                    {projectTestimonial.project}
                  </p>
                )}
              </figcaption>
            </figure>
          </div>
        </section>
      )}

      {/* ── Field documentation: photographic record ── */}
      {gallery.length > 0 && (
        <section className="enk-section" style={{ backgroundColor: "var(--enk-bg-muted)" }}>
          <div className="enk-container">
            <div className="mb-8 max-w-2xl">
              <RecordEyebrow refNo={`${gallery.length} photos`}>Site photography</RecordEyebrow>
              <h2 className="enk-display mt-3 text-[clamp(1.3rem,2.3vw,1.65rem)] text-[var(--enk-ink)]">
                Photographic record
              </h2>
              <p className="mt-3 text-[14px] leading-relaxed text-[var(--enk-steel)] md:text-[15px]">
                Site photography documenting execution of this crossing.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
              {gallery.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  className="block w-full text-left focus-ring rounded-[var(--enk-radius-record)]"
                  aria-label={`Enlarge plate ${index + 1}: ${image.alt}`}
                >
                  <FieldFigure
                    src={image.src}
                    alt={image.alt}
                    caption={image.caption || image.alt}
                    ratio="3/2"
                    sizes="(min-width: 1024px) 30vw, 50vw"
                  />
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            style={{ backgroundColor: "oklch(0.13 0.02 255 / 0.95)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <button
              type="button"
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center border transition-colors md:right-6 md:top-6"
              style={{ borderColor: "oklch(1 0 0 / 0.28)", borderRadius: "2px" }}
              onClick={() => setSelectedImage(null)}
              aria-label="Close"
            >
              <X className="h-5 w-5 text-white" />
            </button>

            <motion.figure
              className="w-full max-w-5xl"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <EnhancedImage
                src={selectedImage.src}
                alt={selectedImage.alt}
                wrapperClassName="w-full max-h-[70vh]"
                className="w-full max-h-[70vh]"
                fit="contain"
                tone="documentary"
                fallbackLabel={selectedImage.alt}
              />
              <figcaption className="mt-4 border-t border-[oklch(1_0_0_/_0.15)] pt-3 text-center">
                <p className="text-[13px] font-semibold text-white">
                  {selectedImage.alt}
                </p>
                {selectedImage.caption && (
                  <p className="mt-1.5 text-[13px] text-white/60">{selectedImage.caption}</p>
                )}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Related records ── */}
      {filteredRelatedProjects.length > 0 && (
        <section className="enk-section">
          <div className="enk-container">
            <div className="mb-8 max-w-2xl">
              <RecordEyebrow>Related projects</RecordEyebrow>
              <h2 className="enk-display mt-3 text-[clamp(1.3rem,2.3vw,1.65rem)] text-[var(--enk-ink)]">
                Other records in this discipline
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {filteredRelatedProjects.map((related) => (
                <ProjectRecordCard
                  key={related.href}
                  title={related.title}
                  href={related.href}
                  location={related.location}
                  metric={related.metric}
                  metricLabel={related.metricLabel}
                  thumbnail={related.thumbnail}
                  tags={related.tags}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand
        headline="Have a similar project?"
        subhead="Send crossing or pipeline details for a technical response: scope review, method statement input, and budget pricing from the engineering team."
        primaryCTA={{ label: "Contact us", href: "/contact" }}
        secondaryCTA={{ label: "View all projects", href: "/projects" }}
      />
    </Layout>
  );
}
