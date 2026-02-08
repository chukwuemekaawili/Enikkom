import React, { useEffect, useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, Save, Image as ImageIcon, Plus, Trash2, ExternalLink, RotateCcw, Eye, Info, GripVertical, Monitor, Pencil, CheckCircle, Search, X, Star, Quote } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { LivePreviewPanel } from '@/components/admin/LivePreviewPanel';
import { CurrentAssetPreview } from '@/components/admin/CurrentAssetPreview';

// ============================================
// IMPORT ALL DEFAULT IMAGES FROM CODEBASE
// ============================================

// Homepage slider images
import heroSlide1 from "@/assets/projects/hdd-night-panorama.jpg";
import heroSlide2 from "@/assets/projects/pipe-laying-crane.jpg";
import heroSlide3 from "@/assets/projects/dredging-hero.jpg";
import heroSlide4 from "@/assets/projects/jetty-construction.jpg";
import heroSlide5 from "@/assets/projects/hdd-equipment-fleet.jpg";

// Page hero images (from actual page components)
import aboutHero from "@/assets/projects/hdd-equipment-fleet-3.jpg";
import servicesHero from "@/assets/projects/hdd-team-1.jpg";
import projectsHero from "@/assets/projects/hero-hdd.jpg";
import equipmentHero from "@/assets/projects/hdd-equipment-fleet.jpg";
import hseHero from "@/assets/projects/hse-safety.jpg";
import careersHero from "@/assets/projects/careers-team.jpg";
import contactHero from "@/assets/projects/contact-office.jpg";
import capabilitiesHero from "@/assets/projects/partnership-hddthailand.jpg";
import managementHero from "@/assets/projects/hdd-night-panorama.jpg";
import galleryHero from "@/assets/projects/hdd-team-1.jpg";
import partnersHero from "@/assets/projects/partnership-hddthailand.jpg";
import testimonialsHero from "@/assets/hero/hero-hdd-rig.jpg";
import projectMapHero from "@/assets/hero/hero-hdd-rig.jpg";

// Section images used throughout pages
import cultureTeam from "@/assets/projects/hdd-team-1.jpg";
import hddRigOperation from "@/assets/projects/hdd-rig-operation.png";
import pipelineConstruction from "@/assets/projects/pipeline-construction.jpg";
import dredgingMarine from "@/assets/projects/dredging-marine.png";
import jettyConstruction from "@/assets/projects/jetty-construction.jpg";
import shoreApproach from "@/assets/projects/shore-approach.jpg";
import geotechnicalSurvey from "@/assets/projects/drilling-site.png";

// Team member photos for management page defaults
import photoEdwardAmene from "@/assets/team/edward-amene.png";
import photoSaleemKhan from "@/assets/team/saleem-khan.png";
import photoFrancisAnatogu from "@/assets/team/francis-anatogu.png";
import photoAdekunleAdewole from "@/assets/team/adekunle-adewole.png";
import photoChibuikeNwachukwu from "@/assets/team/chibuike-nwachukwu.png";
import photoTeddyAllen from "@/assets/team/teddy-allen.png";
import photoIdigborEmeka from "@/assets/team/idigbor-emeka.png";
import photoBiodunAdefila from "@/assets/team/biodun-adefila.jpg";
import photoKenJames from "@/assets/team/ken-james.png";

// Hero video
import heroVideo from "@/assets/videos/hdd-operations-hero.mp4";

// Project detail page images
import otumaraEscravos from "@/assets/projects/otumara-escravos.jpg";
import atlasCoveMosimi from "@/assets/projects/atlas-cove-mosimi.jpg";
import lekiGasPipeline from "@/assets/projects/lekki-gas-pipeline.jpg";
import hddRigNight from "@/assets/projects/hdd-rig-night.jpg";
import nipcoIbafo from "@/assets/projects/nipco-ibafo.jpg";

// ============================================
// DEFAULT CONTENT DEFINITIONS
// ============================================

// Default hero slides for homepage slider
const defaultHeroSlides = [
  { image: heroSlide1, title: "HDD Night Operations", isDefault: true },
  { image: heroSlide2, title: "Pipeline Construction", isDefault: true },
  { image: heroSlide3, title: "Dredging & Marine Works", isDefault: true },
  { image: heroSlide4, title: "Jetty Construction", isDefault: true },
  { image: heroSlide5, title: "Equipment Fleet", isDefault: true },
];

// Default hero configurations for each page
const defaultPageHeroes: Record<string, { image: string; video?: string; description: string; route: string; title: string; subtitle: string }> = {
  home: {
    image: heroSlide1,
    video: heroVideo,
    description: "Homepage hero with video background and image slider",
    route: "/",
    title: "Nigeria's Premier Trenchless & Pipeline Contractor",
    subtitle: "Pioneers of HDD in Nigeria since 2003. Over 100km of HDD installations and counting."
  },
  about: { 
    image: aboutHero, 
    description: "HDD Equipment Fleet image - professional engineering operations",
    route: "/about",
    title: "About Enikkom Construction",
    subtitle: "Nigeria's foremost indigenous trenchless engineering and construction company, delivering excellence in HDD, pipeline construction, dredging, and marine civil works since 1995."
  },
  services: { 
    image: servicesHero, 
    description: "HDD Team at work - shows skilled workforce",
    route: "/services",
    title: "Our Services",
    subtitle: "Comprehensive infrastructure solutions from Nigeria's leading HDD and pipeline contractor."
  },
  projects: { 
    image: projectsHero, 
    description: "HDD Operations at night - dramatic project showcase",
    route: "/projects",
    title: "Our Projects",
    subtitle: "Showcasing Nigeria's most challenging infrastructure projects - from record-breaking HDD crossings to complex pipeline installations."
  },
  equipment: { 
    image: equipmentHero, 
    description: "HDD Equipment Fleet - West Africa's largest fleet",
    route: "/equipment",
    title: "Equipment & Fleet Capability",
    subtitle: "West Africa's largest HDD fleet with 10+ maxi rigs up to 500T pullback capacity."
  },
  hse: { 
    image: hseHero, 
    description: "HSE Safety meeting - demonstrates safety culture",
    route: "/hse-quality",
    title: "HSE & Quality Excellence",
    subtitle: "Safety First. Quality Always. Our unwavering commitment to zero incidents and world-class standards."
  },
  careers: { 
    image: careersHero, 
    description: "Team photo - shows company culture and workforce",
    route: "/careers",
    title: "Build Your Career at Enikkom",
    subtitle: "Join West Africa's leading infrastructure contractor. Be part of a team of 500+ professionals."
  },
  contact: { 
    image: contactHero, 
    description: "Office/operations - professional contact page header",
    route: "/contact",
    title: "Contact Enikkom",
    subtitle: "Get in touch to discuss your infrastructure project requirements."
  },
  management: {
    image: managementHero,
    description: "Night operations panorama - leadership page hero",
    route: "/about/management",
    title: "Management Team",
    subtitle: "Experienced leaders driving excellence in engineering and construction across Nigeria and West Africa."
  },
  gallery: {
    image: galleryHero,
    description: "Team working on site - gallery page header",
    route: "/gallery",
    title: "Project Gallery",
    subtitle: "Visual showcase of our engineering excellence and project execution."
  },
  partners: {
    image: partnersHero,
    description: "Partnership with HDD Thailand",
    route: "/partners",
    title: "Our Partners",
    subtitle: "Strategic partnerships with global leaders in trenchless technology."
  },
  testimonials: {
    image: testimonialsHero,
    description: "HDD rig hero image for testimonials",
    route: "/testimonials",
    title: "Client Testimonials",
    subtitle: "Real feedback from the industry leaders who trust Enikkom."
  },
  capabilities: {
    image: capabilitiesHero,
    description: "Partnership/capabilities showcase",
    route: "/capabilities",
    title: "Our Capabilities",
    subtitle: "Comprehensive infrastructure solutions across HDD, pipelines, dredging, and marine works."
  },
};

// Capability Detail Pages Data - default content from CapabilityDetailPage.tsx
const capabilityDetailDefaults: Record<string, {
  title: string;
  description: string;
  heroImage: string;
  processSteps: { title: string; description: string }[];
  standards: string[];
  equipment: { name: string; specs: string }[];
}> = {
  'cap-hdd': {
    title: "Horizontal Directional Drilling (HDD)",
    description: "State-of-the-art trenchless technology for river, road, railway, and environmental crossings with minimal surface disruption and maximum efficiency.",
    heroImage: hddRigOperation,
    processSteps: [
      { title: "Site Survey & Design", description: "Comprehensive geotechnical investigation and crossing design" },
      { title: "Pilot Bore", description: "Initial drilling of pilot hole along planned trajectory" },
      { title: "Reaming Operations", description: "Progressive enlargement to required diameter" },
      { title: "Pipe Installation", description: "Pullback of pre-fabricated pipeline string" },
      { title: "Testing & Commissioning", description: "Hydrostatic testing and final handover" },
    ],
    standards: ["API 1160", "ASTM F1962", "DCA Technical Guidelines", "ISO 14001"],
    equipment: [
      { name: "HDD Rig", specs: "Up to 500T pullback capacity" },
      { name: "Mud System", specs: "High-volume mixing & recycling" },
      { name: "Tracking System", specs: "Walkover & Gyro guidance" },
    ],
  },
  'cap-pipelines': {
    title: "Pipelines & Flowlines Construction",
    description: "Complete pipeline construction services from fabrication to installation and testing for oil, gas, and water transmission systems.",
    heroImage: pipelineConstruction,
    processSteps: [
      { title: "Material Procurement", description: "Sourcing and inspection of pipe materials and fittings" },
      { title: "Fabrication & Coating", description: "Welding, NDT, and protective coating application" },
      { title: "Installation", description: "Open-cut, HDD, or directional drilling installation" },
      { title: "Welding & NDT", description: "Field welding with 100% radiographic inspection" },
      { title: "Hydrotesting", description: "Pressure testing and leak detection" },
    ],
    standards: ["API 5L", "ASME B31.4/B31.8", "NACE MR0175", "AWS D1.1"],
    equipment: [
      { name: "Pipe Layers", specs: "12+ sideboom pipelayers" },
      { name: "Welding Equipment", specs: "Automatic/manual welding systems" },
      { name: "NDT Equipment", specs: "Radiographic, UT, MT, PT" },
    ],
  },
  'cap-dredging': {
    title: "Dredging & Piling",
    description: "Marine dredging for channel deepening, reclamation, and maintenance. Foundation piling for offshore platforms, bridges, and terminal structures.",
    heroImage: dredgingMarine,
    processSteps: [
      { title: "Bathymetric Survey", description: "Detailed seabed mapping and volume calculation" },
      { title: "Dredging Operations", description: "Cutter suction or trailing suction hopper dredging" },
      { title: "Material Disposal", description: "Controlled disposal or beneficial reuse" },
      { title: "Pile Driving", description: "Impact or vibratory pile installation" },
      { title: "Load Testing", description: "Static and dynamic pile load testing" },
    ],
    standards: ["PIANC Guidelines", "API RP 2A", "ASTM D1143", "EN 12699"],
    equipment: [
      { name: "Dredger", specs: "3+ cutter suction dredgers" },
      { name: "Pile Driver", specs: "Heavy duty impact hammers" },
      { name: "Survey Equipment", specs: "Multi-beam echosounder, RTK GPS" },
    ],
  },
  'cap-jetty': {
    title: "Jetty & Quay Wall Construction",
    description: "Design and construction of jetties, quay walls, wharves, and marine terminal structures to international standards.",
    heroImage: jettyConstruction,
    processSteps: [
      { title: "Foundation Works", description: "Piling and seabed preparation" },
      { title: "Sheet Pile Installation", description: "Steel sheet pile driving and anchoring" },
      { title: "Concrete Works", description: "Capping beam and deck slab construction" },
      { title: "Fender Installation", description: "Marine fender and bollard installation" },
      { title: "Paving & Services", description: "Surface finishing and utility installation" },
    ],
    standards: ["BS 6349", "PIANC Reports", "EAU Guidelines", "OCIMF Guidelines"],
    equipment: [
      { name: "Crane Barge", specs: "4+ various lift capacities" },
      { name: "Sheet Pile Vibro", specs: "Heavy duty vibratory hammers" },
      { name: "Concrete Batching", specs: "Mobile batching plant" },
    ],
  },
  'cap-shore': {
    title: "Shore Approach Construction",
    description: "Pipeline shore approach construction including beach crossings, nearshore installations, and tie-in works for onshore-offshore infrastructure.",
    heroImage: shoreApproach,
    processSteps: [
      { title: "Beach Survey", description: "Topographic and bathymetric survey" },
      { title: "Trenching", description: "Open-cut or HDD shore approach excavation" },
      { title: "Pipe Pull", description: "Shore pull or float-and-sink installation" },
      { title: "Backfill & Protection", description: "Trench backfill and rock dumping" },
      { title: "Tie-in Works", description: "Connection to onshore facilities" },
    ],
    standards: ["DNV-OS-F101", "API RP 1111", "ASME B31.4", "Client Specifications"],
    equipment: [
      { name: "Winches", specs: "High capacity shore pull winches" },
      { name: "Excavators", specs: "Long-reach and amphibious" },
      { name: "Support Vessels", specs: "Tugs and anchor handlers" },
    ],
  },
  'cap-geotechnical': {
    title: "Geotechnical Survey",
    description: "Comprehensive soil investigation, site characterization, and geotechnical analysis for pipeline routing, foundation design, and HDD planning.",
    heroImage: geotechnicalSurvey,
    processSteps: [
      { title: "Desktop Study", description: "Review of existing geological data and site history" },
      { title: "Field Investigation", description: "Borehole drilling, CPT, and in-situ testing" },
      { title: "Laboratory Testing", description: "Soil classification, strength, and permeability tests" },
      { title: "Data Analysis", description: "Interpretation and geotechnical modeling" },
      { title: "Reporting", description: "Engineering recommendations and design parameters" },
    ],
    standards: ["ASTM D1586", "BS 5930", "EUROCODE 7", "API RP 2GEO"],
    equipment: [
      { name: "Drilling Rigs", specs: "Rotary and percussion boring equipment" },
      { name: "CPT Equipment", specs: "Cone penetration testing systems" },
      { name: "Lab Equipment", specs: "Full soil testing laboratory" },
    ],
  },
  'cap-facilities': {
    title: "Facilities Construction",
    description: "Flow station operations, wellhead platform upgrades, manifold inspection, and plant turnaround maintenance for oil & gas production facilities.",
    heroImage: capabilitiesHero,
    processSteps: [
      { title: "Scope Definition", description: "Detailed work scope and engineering review" },
      { title: "Mobilization", description: "Equipment and personnel deployment" },
      { title: "Construction Works", description: "Civil, mechanical, and E&I installation" },
      { title: "Pre-commissioning", description: "Systems testing and loop checks" },
      { title: "Commissioning", description: "Final startup and handover" },
    ],
    standards: ["API Standards", "ASME Codes", "IEC Guidelines", "Client Specifications"],
    equipment: [
      { name: "Cranes", specs: "Mobile and crawler cranes" },
      { name: "Welding Systems", specs: "Certified welding equipment" },
      { name: "Testing Equipment", specs: "Hydro test and NDT gear" },
    ],
  },
  'cap-security': {
    title: "Pipeline Security & Monitoring",
    description: "Real-time pipeline surveillance, leak detection, and vandalism prevention in partnership with Ocean Marine Solutions.",
    heroImage: hseHero,
    processSteps: [
      { title: "Risk Assessment", description: "Threat identification and vulnerability analysis" },
      { title: "System Design", description: "Surveillance and monitoring infrastructure" },
      { title: "Installation", description: "Sensors, cameras, and communication systems" },
      { title: "24/7 Monitoring", description: "Control room operations and response" },
      { title: "Incident Response", description: "Rapid deployment and intervention" },
    ],
    standards: ["API 1164", "ISPS Code", "NIST Cybersecurity", "Client Requirements"],
    equipment: [
      { name: "Surveillance", specs: "CCTV, drones, and patrol vessels" },
      { name: "Sensors", specs: "Leak detection and intrusion systems" },
      { name: "Communications", specs: "VSAT and radio networks" },
    ],
  },
  'cap-logistics': {
    title: "Logistics Support",
    description: "Land and swamp logistics with low bed trailers, flatbed barges, crew boats, and supply vessels for project mobilization.",
    heroImage: equipmentHero,
    processSteps: [
      { title: "Planning", description: "Route survey and transport planning" },
      { title: "Permits", description: "Regulatory approvals and escorts" },
      { title: "Mobilization", description: "Equipment and material transport" },
      { title: "Site Support", description: "Ongoing logistics and resupply" },
      { title: "Demobilization", description: "Equipment recovery and return" },
    ],
    standards: ["IMDG Code", "ADR Regulations", "Local Transport Laws", "Client HSE"],
    equipment: [
      { name: "Trailers", specs: "Low bed and flatbed trailers" },
      { name: "Barges", specs: "Deck cargo and flat top barges" },
      { name: "Vessels", specs: "Crew boats and supply vessels" },
    ],
  },
};

// ============================================
// PROJECT DETAIL PAGE DEFAULTS
// ============================================
const projectDetailDefaults: Record<string, {
  title: string;
  client: string;
  location: string;
  year: string;
  overview: string;
  challenge: string;
  solution: string;
  heroImage: string;
  results: { label: string; value: string }[];
  scope: string[];
  recordBadge?: string;
}> = {
  'proj-oml34': {
    title: "OML34 Continuous HDD - 10\" x 12km",
    client: "NPDC (Nigerian Petroleum Development Company)",
    location: "Niger Delta, Nigeria",
    year: "2020-2021",
    overview: "Nigeria's longest functional Continuous Horizontal Directional Drilling (CHDD) project - installing 12 kilometers of 10-inch pipeline in a single continuous operation through challenging Niger Delta terrain.",
    challenge: "The OML34 field required a 12km pipeline crossing through extremely difficult swamp and riverine terrain with multiple water bodies, protected areas, and communities that made conventional pipeline installation impossible.",
    solution: "Enikkom deployed our advanced HDD fleet with 500T pullback capacity rigs and established a continuous drilling operation spanning months. Our partnership with HDDThailand provided specialized downhole tools and technical expertise.",
    heroImage: heroSlide1,
    results: [
      { label: "Total Length", value: "12 km" },
      { label: "Pipe Diameter", value: "10 inches" },
      { label: "Method", value: "Continuous HDD" },
      { label: "Duration", value: "14 months" },
      { label: "LTI Record", value: "Zero" },
    ],
    scope: [
      "Engineering design and feasibility study",
      "Continuous HDD pilot bore drilling (12km)",
      "Progressive reaming operations",
      "10\" HDPE pipeline fabrication and pullback",
      "Real-time trajectory monitoring",
      "Mud recycling and environmental management",
      "Hydrostatic testing and commissioning"
    ],
    recordBadge: "Nigeria's Longest CHDD",
  },
  'proj-otumara': {
    title: "Otumara-Escravos Bundled HDD Crossing",
    client: "Saipem Contracting Nigeria / SPDC",
    location: "Delta State, Nigeria",
    year: "2016",
    overview: "Africa's longest bundled pipeline HDD crossing - 2.78km installation of 12-inch and 3-inch bundled pipelines under the Escravos River system for Shell Petroleum Development Company.",
    challenge: "The Otumara-Escravos project required crossing one of the Niger Delta's widest river systems with bundled pipelines. The 2.78km distance was unprecedented for a bundled crossing in Africa.",
    solution: "Enikkom's technical team designed a specialized bundled crossing configuration with the 12\" and 3\" pipelines secured in precise alignment. Our 500T HDD rig with real-time gyro guidance achieved the required accuracy.",
    heroImage: otumaraEscravos,
    results: [
      { label: "Crossing Length", value: "2.78 km" },
      { label: "12\" Pipeline", value: "Completed" },
      { label: "3\" Pipeline", value: "Bundled" },
      { label: "Completion", value: "April 2016" },
      { label: "LTI Record", value: "Zero" },
    ],
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
  },
  'proj-atlas': {
    title: "Atlas Cove-Mosimi Emergency Pipeline",
    client: "NNPC / PPMC (Pipelines and Products Marketing Company)",
    location: "Lagos-Ogun States, Nigeria",
    year: "2017",
    overview: "Africa's longest single HDD drill - a 3.1km, 16-inch pipeline crossing for the emergency reconstruction of the Atlas Cove to Mosimi petroleum products pipeline.",
    challenge: "The Atlas Cove-Mosimi pipeline was a critical national fuel supply artery that required emergency reconstruction. The route crossed the Lagos Lagoon and environmentally sensitive areas.",
    solution: "Enikkom mobilized rapidly and completed what became Africa's longest single HDD drill at 3.1km. Our 500T rig with advanced downhole tools maintained precise trajectory across the entire distance.",
    heroImage: atlasCoveMosimi,
    results: [
      { label: "Crossing Length", value: "3.1 km" },
      { label: "Pipe Diameter", value: "16 inches" },
      { label: "Completion", value: "April 2017" },
      { label: "Client", value: "NNPC/PPMC" },
      { label: "LTI Record", value: "Zero" },
    ],
    scope: [
      "Rapid mobilization and site setup",
      "3.1km HDD pilot bore (Africa's longest)",
      "Progressive reaming to final diameter",
      "16\" steel pipeline fabrication",
      "Single-pull installation",
      "Hydrostatic testing and commissioning"
    ],
    recordBadge: "Africa's Longest Single Drill",
  },
  'proj-lekki': {
    title: "Lekki Gas Pipeline Project (LGPP)",
    client: "Dangote Fertilizer Limited / Zakhem Construction",
    location: "Lagos, Nigeria",
    year: "2019",
    overview: "Major gas pipeline HDD crossing for the Lekki Gas Pipeline Project - a 36-inch x 1.5km swamp and river crossing delivering natural gas to Dangote's fertilizer complex.",
    challenge: "The project required crossing the Lagos lagoon and swamp areas to connect gas supply infrastructure to the Dangote Fertilizer plant with strict project timelines.",
    solution: "Enikkom deployed our 500T HDD rig with advanced gyro guidance for the 1.5km crossing. The 36-inch steel pipeline was pre-fabricated onshore and pulled back in a single operation.",
    heroImage: lekiGasPipeline,
    results: [
      { label: "Crossing Length", value: "1.5 km" },
      { label: "Pipe Diameter", value: "36 inches" },
      { label: "Completion", value: "June 2019" },
      { label: "Client", value: "Dangote/Zakhem" },
      { label: "LTI Record", value: "Zero" },
    ],
    scope: [
      "Geotechnical investigation and crossing design",
      "36\" HDD pilot bore and reaming operations",
      "Pipeline prefabrication (1.5km string)",
      "Single-pull pipeline installation",
      "Tie-in works at both ends",
      "Hydrostatic testing and commissioning"
    ],
  },
  'proj-yenagoa': {
    title: "Yenagoa 40\" HDD River Crossing",
    client: "Daewoo E&C / Shell SPDC",
    location: "Bayelsa State, Nigeria",
    year: "2010",
    overview: "Nigeria's largest pipeline HDD crossing - a 40-inch x 760m crossing at 100ft (30m) depth, setting the record for the largest diameter trenchless pipeline installation in Nigeria.",
    challenge: "The Yenagoa project required crossing a major river with Nigeria's largest diameter HDD pipeline - 40 inches. The 100ft depth requirement added significant technical complexity.",
    solution: "Enikkom deployed our largest HDD equipment for this record-breaking crossing. The 40\" steel pipe string was carefully fabricated and prepared with buoyancy control systems.",
    heroImage: hddRigNight,
    results: [
      { label: "Crossing Length", value: "760 m" },
      { label: "Pipe Diameter", value: "40 inches" },
      { label: "Depth Below River", value: "100 ft (30m)" },
      { label: "Completion", value: "February 2010" },
      { label: "LTI Record", value: "Zero" },
    ],
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
  },
  'proj-nipco': {
    title: "NIPCO Ibafo HDD Crossing",
    client: "NIPCO Plc",
    location: "Ogun State, Nigeria",
    year: "2018",
    overview: "Strategic fuel pipeline HDD crossing for NIPCO's petroleum depot infrastructure, ensuring safe and efficient fuel distribution across the region.",
    challenge: "The crossing required navigating through populated areas and existing infrastructure while maintaining minimal surface disruption and strict safety protocols.",
    solution: "Enikkom executed a precise HDD crossing with comprehensive traffic management and community liaison. Advanced tracking systems ensured accurate trajectory control.",
    heroImage: nipcoIbafo,
    results: [
      { label: "Crossing", value: "Completed" },
      { label: "Client", value: "NIPCO Plc" },
      { label: "Location", value: "Ibafo, Ogun" },
      { label: "Completion", value: "2018" },
      { label: "LTI Record", value: "Zero" },
    ],
    scope: [
      "Route survey and design",
      "HDD pilot bore drilling",
      "Reaming operations",
      "Pipeline installation",
      "Testing and commissioning"
    ],
  },
};

// Default testimonials data
const defaultTestimonials = [
  {
    quote: "Outstanding job on the 36\" x 1.5km swamp/river crossing. Impressive drilling work done by your team. We look forward to more collaborations with Enikkom in the future.",
    author: "Project Director",
    company: "Dangote Fertilizer Limited",
    project: "Lekki Gas Pipeline Project (LGPP)",
    rating: 5,
  },
  {
    quote: "ECL brings a level of client side understanding to each and every project. Their technical expertise and commitment to safety is unmatched. We have no hesitation in recommending ECL for any HDD or pipeline project.",
    author: "Project Manager",
    company: "Zakhem Construction Nigeria Limited",
    project: "Escravos-Lagos Pipeline System Phase II",
    rating: 5,
  },
  {
    quote: "We are delighted with our experience of working with ENIKKOM on the Otumara-Escravos bundled crossing. The team demonstrated unmatched professionalism throughout the project. It was a pleasure working with the team.",
    author: "Construction Manager",
    company: "Saipem Contracting Nigeria Limited",
    project: "Otumara-Escravos 12\" + 3\" Bundled HDD Crossing",
    rating: 5,
  },
  {
    quote: "Enikkom has provided Horizontal Directional Drilling services to our company, having satisfied our requirements for efficient work. Their technical capability and safety record are exemplary.",
    author: "Operations Director",
    company: "Gramen Petroserve Nigeria Limited",
    project: "Various HDD Projects",
    rating: 5,
  },
  {
    quote: "The 40\" x 760m Yenagoa crossing at 100ft depth was executed flawlessly. This was the largest pipeline crossing in Nigeria and Enikkom delivered on time with zero safety incidents.",
    author: "Project Coordinator",
    company: "Shell Petroleum Development Company (SPDC)",
    project: "Yenagoa 40\" HDD Crossing - Largest in Nigeria",
    rating: 5,
  },
  {
    quote: "The Atlas Cove-Mosimi 16\" x 3km emergency reconstruction was completed in record time. Enikkom set a new benchmark for HDD capability in Africa with this project.",
    author: "Pipeline Manager",
    company: "NNPC/PPMC",
    project: "Atlas Cove-Mosimi Emergency Reconstruction",
    rating: 5,
  },
];

// Default testimonials stats
const defaultTestimonialsStats = [
  { value: "30", label: "Years Experience" },
  { value: "100+", label: "KM HDD Installed" },
  { value: "3.1km", label: "Longest Single Drill" },
  { value: "Zero", label: "LTI Record" },
];

// Default capability/service images
const defaultCapabilityImages: Record<string, { image: string; description: string }> = {
  hdd: { image: hddRigOperation, description: "HDD rig in operation - trenchless drilling" },
  pipelines: { image: pipelineConstruction, description: "Pipeline welding and construction" },
  dredging: { image: dredgingMarine, description: "Marine dredging operations" },
  marine: { image: jettyConstruction, description: "Jetty and marine structures construction" },
  jetty: { image: jettyConstruction, description: "Jetty construction work" },
};

// Default team members for management page (all 9)
const defaultTeamMembers = [
  { name: "Engr. Edward Amene", title: "Chief Executive Officer / Managing Director", photo: photoEdwardAmene, category: "management" },
  { name: "Engr. Saleem Ahmad Khan", title: "Chief Technical Officer", photo: photoSaleemKhan, category: "management" },
  { name: "Mr. Francis Anatogu", title: "Chief Growth & Transformation Officer", photo: photoFrancisAnatogu, category: "management" },
  { name: "Adekunle Adewole, PhD", title: "Chief Operations & Strategy Officer", photo: photoAdekunleAdewole, category: "management" },
  { name: "Mr. Chibuike Nwachukwu", title: "Executive Director", photo: photoChibuikeNwachukwu, category: "management" },
  { name: "Teddy Allen", title: "General Manager, Drilling", photo: photoTeddyAllen, category: "management" },
  { name: "Idigbor Emeka, FCA", title: "Chief Accountant", photo: photoIdigborEmeka, category: "management" },
  { name: "Biodun Adefila", title: "Chairman, Board of Directors", photo: photoBiodunAdefila, category: "board" },
  { name: "Ken James", title: "Non-Executive Director", photo: photoKenJames, category: "board" },
];

// Default section content for each section type
const defaultSectionContent: Record<string, Record<string, { 
  title?: string; 
  subtitle?: string; 
  description?: string; 
  image?: string; 
  route: string;
  sectionName: string;
}>> = {
  about: {
    company_overview: {
      title: "Building Nigeria's Infrastructure Since 1995",
      subtitle: "Our Story",
      description: "Founded in 1995 by Engr. Edward Amene after 14 years as a Project Engineer with Shell, Enikkom Construction Limited pioneered Horizontal Directional Drilling (HDD) technology in Nigeria with the historic River Niger crossing in 2003.",
      route: "/about",
      sectionName: "Company Overview"
    },
    mission_vision: {
      title: "Mission & Vision",
      subtitle: "Purpose",
      description: "To offer innovative and cost effective solutions to our Clients through delivery of world-class engineering and construction services.",
      route: "/about",
      sectionName: "Mission & Vision"
    },
    history: {
      title: "30 Years of Excellence",
      subtitle: "History",
      description: "From founding in 1995 to becoming West Africa's leading HDD and pipeline contractor.",
      route: "/about",
      sectionName: "Company History"
    },
    certifications: {
      title: "Industry Certifications",
      description: "ISO 9001, ISO 14001, ISO 45001 certified operations.",
      route: "/about",
      sectionName: "Certifications"
    },
  },
  services: {
    intro: {
      title: "Comprehensive Infrastructure Solutions",
      subtitle: "What We Do",
      description: "End-to-end engineering services for Nigeria's most demanding projects.",
      route: "/services",
      sectionName: "Introduction"
    },
    hdd: {
      title: "Trenchless Crossings (HDD)",
      description: "Pioneers of Horizontal Directional Drilling in Nigeria with the largest fleet of HDD rigs.",
      image: hddRigOperation,
      route: "/capabilities/hdd",
      sectionName: "HDD Service"
    },
    pipelines: {
      title: "Pipeline Construction",
      description: "Complete EPC services for oil, gas and water pipelines.",
      image: pipelineConstruction,
      route: "/capabilities/pipelines-flowlines",
      sectionName: "Pipelines Service"
    },
    dredging: {
      title: "Dredging & Piling",
      description: "Marine dredging for channel deepening, reclamation and maintenance.",
      image: dredgingMarine,
      route: "/capabilities/dredging-piling",
      sectionName: "Dredging Service"
    },
    marine: {
      title: "Marine Civil Works",
      description: "Jetty construction, quay walls, and marine terminal structures.",
      image: jettyConstruction,
      route: "/capabilities/jetty-quay-walls",
      sectionName: "Marine Works"
    },
  },
  projects: {
    intro: {
      title: "Project Portfolio",
      subtitle: "Track Record",
      description: "Nigeria's most challenging infrastructure projects delivered on time and to specification.",
      route: "/projects",
      sectionName: "Introduction"
    },
  },
  equipment: {
    intro: {
      title: "Fleet Overview",
      subtitle: "Equipment Capabilities",
      description: "West Africa's largest HDD fleet with modern, well-maintained equipment.",
      route: "/equipment",
      sectionName: "Introduction"
    },
    hdd_rigs: {
      title: "HDD Rig Fleet",
      description: "10+ maxi HDD rigs from 50T to 500T pullback capacity.",
      image: equipmentHero,
      route: "/equipment",
      sectionName: "HDD Rigs"
    },
  },
  hse: {
    policy: {
      title: "HSE Policy",
      description: "Zero tolerance for unsafe acts and conditions. Comprehensive PTW system.",
      image: hseHero,
      route: "/hse-quality",
      sectionName: "HSE Policy"
    },
    certifications: {
      title: "Safety Certifications",
      description: "ISO 45001:2018 certified with 5M+ safe man-hours.",
      route: "/hse-quality",
      sectionName: "Safety Certifications"
    },
  },
  careers: {
    intro: {
      title: "Join Our Team",
      subtitle: "Opportunities",
      description: "Be part of a team of 500+ professionals delivering world-class projects.",
      image: cultureTeam,
      route: "/careers",
      sectionName: "Introduction"
    },
    benefits: {
      title: "Why Work With Us",
      subtitle: "Benefits",
      description: "Training, safety culture, health coverage, and career growth.",
      route: "/careers",
      sectionName: "Benefits"
    },
  },
  contact: {
    intro: {
      title: "Get in Touch",
      subtitle: "Contact Us",
      description: "Our engineering team can scope your project and provide a detailed proposal within 48 hours.",
      route: "/contact",
      sectionName: "Introduction"
    },
    locations: {
      title: "Office Locations",
      description: "Abuja Head Office, Lagos Corporate Office, Port Harcourt Fabrication, Arepo & Warri Operations.",
      route: "/contact",
      sectionName: "Locations"
    },
  },
  home: {
    kpi_stats: {
      title: "Key Statistics",
      description: "100+ KM HDD Installed, 30+ Years Experience, 0 LTI Record, 500+ Workforce",
      route: "/",
      sectionName: "KPI Statistics"
    },
    capabilities_intro: {
      title: "Infrastructure Capabilities",
      subtitle: "What We Do",
      description: "End-to-end solutions for HDD, pipelines, dredging, and marine civil works.",
      route: "/",
      sectionName: "Capabilities Introduction"
    },
    featured_projects: {
      title: "Featured Projects",
      subtitle: "Track Record",
      description: "Delivering record-breaking projects across Nigeria.",
      route: "/projects",
      sectionName: "Featured Projects"
    },
    about_section: {
      title: "Pioneers of HDD in Nigeria Since 2003",
      subtitle: "Our Story",
      description: "Founded in 1995, Enikkom Construction pioneered HDD technology in Nigeria with the historic River Niger crossing in 2003.",
      route: "/about",
      sectionName: "About Section"
    },
    video_showcase: {
      title: "OML34 Continuous HDD - 12km Record",
      subtitle: "Featured Project",
      description: "Watch our team complete Nigeria's longest functional continuous HDD installation.",
      route: "/projects/oml34-chdd",
      sectionName: "Video Showcase"
    },
    cta_band: {
      title: "Start Your Project Today",
      description: "Response within 24 hours",
      route: "/contact",
      sectionName: "Call to Action"
    },
  },
  management: {
    intro: {
      title: "Our Leadership",
      subtitle: "Management Team",
      description: "A team of industry veterans with deep expertise in HDD, pipeline construction, marine works, and project management.",
      image: cultureTeam,
      route: "/about/management",
      sectionName: "Introduction"
    },
    team_grid: {
      title: "Leadership Team",
      description: "View and manage team member profiles in the Team Manager section.",
      route: "/about/management",
      sectionName: "Team Grid"
    },
  },
  gallery: {
    intro: {
      title: "Project Gallery",
      subtitle: "Visual Portfolio",
      description: "Browse our collection of project photos showcasing engineering excellence.",
      route: "/gallery",
      sectionName: "Introduction"
    },
  },
  partners: {
    intro: {
      title: "Strategic Partnerships",
      subtitle: "Our Partners",
      description: "Collaborating with global leaders in trenchless technology and infrastructure.",
      image: partnersHero,
      route: "/partners",
      sectionName: "Introduction"
    },
  },
  testimonials: {
    intro: {
      title: "What Our Clients Say",
      subtitle: "Testimonials",
      description: "Real feedback from industry leaders who trust Enikkom.",
      route: "/testimonials",
      sectionName: "Introduction"
    },
    client_quotes: {
      title: "Client Testimonials",
      description: "Manage client quotes and testimonials",
      route: "/testimonials",
      sectionName: "Client Quotes"
    },
    stats: {
      title: "Trust Statistics",
      description: "Key statistics displayed on testimonials page",
      route: "/testimonials",
      sectionName: "Statistics"
    },
  },
};

// Page routes for preview
const pageRoutes: Record<string, string> = {
  home: '/',
  about: '/about',
  services: '/services',
  projects: '/projects',
  equipment: '/equipment',
  hdd_equipment: '/equipment/hdd',
  hse: '/hse-quality',
  careers: '/careers',
  contact: '/contact',
  management: '/management-team',
  gallery: '/gallery',
  partners: '/partners',
  testimonials: '/testimonials',
  capabilities: '/capabilities',
  resources: '/resources',
  project_map: '/project-map',
  company_intro: '/company-introduction',
  privacy: '/privacy',
  terms: '/terms',
  // Capability Detail Pages
  'cap-hdd': '/capabilities/hdd',
  'cap-pipelines': '/capabilities/pipelines-flowlines',
  'cap-dredging': '/capabilities/dredging-piling',
  'cap-jetty': '/capabilities/jetty-quay-walls',
  'cap-shore': '/capabilities/shore-approach',
  'cap-geotechnical': '/capabilities/geotechnical-survey',
  'cap-facilities': '/capabilities/facilities',
  'cap-security': '/capabilities/pipeline-security',
  'cap-logistics': '/capabilities/logistics',
  // Project Detail Pages
  'proj-oml34': '/projects/oml34-chdd',
  'proj-otumara': '/projects/otumara-escravos',
  'proj-atlas': '/projects/atlas-cove-mosimi',
  'proj-lekki': '/projects/lekki-gas-pipeline',
  'proj-yenagoa': '/projects/yenagoa-40-crossing',
  'proj-nipco': '/projects/nipco-ibafo-crossing',
};

interface PageSection {
  id: string;
  page_slug: string;
  section_key: string;
  content: Record<string, any>;
  updated_at?: string;
  order?: number;
}

interface HeroSlide {
  image: string;
  title: string;
  isDefault?: boolean;
}

// All editable page sections
const allPageSections = [
  // Home Page
  { page_slug: 'home', section_key: 'hero', label: 'Hero Section' },
  { page_slug: 'home', section_key: 'kpi_stats', label: 'KPI Statistics' },
  { page_slug: 'home', section_key: 'capabilities_intro', label: 'Capabilities Introduction' },
  { page_slug: 'home', section_key: 'featured_projects', label: 'Featured Projects' },
  { page_slug: 'home', section_key: 'about_section', label: 'About/Story Section' },
  { page_slug: 'home', section_key: 'video_showcase', label: 'Video Showcase' },
  { page_slug: 'home', section_key: 'cta_band', label: 'Call to Action' },
  
  // About Page
  { page_slug: 'about', section_key: 'hero', label: 'Hero Section' },
  { page_slug: 'about', section_key: 'company_overview', label: 'Company Overview' },
  { page_slug: 'about', section_key: 'mission_vision', label: 'Mission & Vision' },
  { page_slug: 'about', section_key: 'history', label: 'Company History' },
  { page_slug: 'about', section_key: 'certifications', label: 'Certifications' },
  
  // Management Page
  { page_slug: 'management', section_key: 'hero', label: 'Hero Section' },
  { page_slug: 'management', section_key: 'intro', label: 'Introduction' },
  { page_slug: 'management', section_key: 'team_grid', label: 'Team Grid (See Team Manager)' },
  
  // Services/Capabilities Page
  { page_slug: 'services', section_key: 'hero', label: 'Hero Section' },
  { page_slug: 'services', section_key: 'intro', label: 'Introduction' },
  { page_slug: 'services', section_key: 'hdd', label: 'HDD Service' },
  { page_slug: 'services', section_key: 'pipelines', label: 'Pipelines Service' },
  { page_slug: 'services', section_key: 'dredging', label: 'Dredging Service' },
  { page_slug: 'services', section_key: 'marine', label: 'Marine Works' },
  
  // Capabilities Page
  { page_slug: 'capabilities', section_key: 'hero', label: 'Hero Section' },
  { page_slug: 'capabilities', section_key: 'intro', label: 'Introduction' },
  
  // Projects Page
  { page_slug: 'projects', section_key: 'hero', label: 'Hero Section' },
  { page_slug: 'projects', section_key: 'intro', label: 'Introduction' },
  
  // Gallery Page
  { page_slug: 'gallery', section_key: 'hero', label: 'Hero Section' },
  { page_slug: 'gallery', section_key: 'intro', label: 'Introduction (See Gallery Manager)' },
  
  // Equipment Page
  { page_slug: 'equipment', section_key: 'hero', label: 'Hero Section' },
  { page_slug: 'equipment', section_key: 'intro', label: 'Introduction' },
  { page_slug: 'equipment', section_key: 'hdd_rigs', label: 'HDD Rigs' },
  
  // HDD Equipment Page
  { page_slug: 'hdd_equipment', section_key: 'hero', label: 'Hero Section' },
  { page_slug: 'hdd_equipment', section_key: 'intro', label: 'Introduction' },
  
  // HSE Page
  { page_slug: 'hse', section_key: 'hero', label: 'Hero Section' },
  { page_slug: 'hse', section_key: 'policy', label: 'HSE Policy' },
  { page_slug: 'hse', section_key: 'certifications', label: 'Safety Certifications' },
  
  // Careers Page
  { page_slug: 'careers', section_key: 'hero', label: 'Hero Section' },
  { page_slug: 'careers', section_key: 'intro', label: 'Introduction' },
  { page_slug: 'careers', section_key: 'benefits', label: 'Benefits' },
  
  // Contact Page
  { page_slug: 'contact', section_key: 'hero', label: 'Hero Section' },
  { page_slug: 'contact', section_key: 'intro', label: 'Contact Introduction' },
  { page_slug: 'contact', section_key: 'locations', label: 'Office Locations' },
  
  // Partners Page
  { page_slug: 'partners', section_key: 'hero', label: 'Hero Section' },
  { page_slug: 'partners', section_key: 'intro', label: 'Introduction' },
  
  // Testimonials Page
  { page_slug: 'testimonials', section_key: 'hero', label: 'Hero Section' },
  { page_slug: 'testimonials', section_key: 'intro', label: 'Introduction' },
  { page_slug: 'testimonials', section_key: 'client_quotes', label: 'Client Testimonials' },
  { page_slug: 'testimonials', section_key: 'stats', label: 'Trust Statistics' },
  
  // Resources Page
  { page_slug: 'resources', section_key: 'hero', label: 'Hero Section' },
  { page_slug: 'resources', section_key: 'intro', label: 'Introduction' },
  { page_slug: 'resources', section_key: 'downloads', label: 'Downloads Section' },
  
  // Project Map Page
  { page_slug: 'project_map', section_key: 'hero', label: 'Hero Section' },
  { page_slug: 'project_map', section_key: 'intro', label: 'Introduction' },
  
  // Company Introduction Page
  { page_slug: 'company_intro', section_key: 'hero', label: 'Hero Section' },
  { page_slug: 'company_intro', section_key: 'intro', label: 'Introduction' },
  
  // Privacy Policy Page
  { page_slug: 'privacy', section_key: 'hero', label: 'Hero Section' },
  { page_slug: 'privacy', section_key: 'content', label: 'Policy Content' },
  
  // Terms Page
  { page_slug: 'terms', section_key: 'hero', label: 'Hero Section' },
  { page_slug: 'terms', section_key: 'content', label: 'Terms Content' },
  
  // ===== CAPABILITY DETAIL PAGES =====
  // HDD Capability
  { page_slug: 'cap-hdd', section_key: 'hero', label: 'Hero Section' },
  { page_slug: 'cap-hdd', section_key: 'description', label: 'Description' },
  { page_slug: 'cap-hdd', section_key: 'process_steps', label: 'Process Steps' },
  { page_slug: 'cap-hdd', section_key: 'standards', label: 'Standards' },
  { page_slug: 'cap-hdd', section_key: 'equipment', label: 'Equipment' },
  
  // Pipelines Capability
  { page_slug: 'cap-pipelines', section_key: 'hero', label: 'Hero Section' },
  { page_slug: 'cap-pipelines', section_key: 'description', label: 'Description' },
  { page_slug: 'cap-pipelines', section_key: 'process_steps', label: 'Process Steps' },
  { page_slug: 'cap-pipelines', section_key: 'standards', label: 'Standards' },
  { page_slug: 'cap-pipelines', section_key: 'equipment', label: 'Equipment' },
  
  // Dredging Capability
  { page_slug: 'cap-dredging', section_key: 'hero', label: 'Hero Section' },
  { page_slug: 'cap-dredging', section_key: 'description', label: 'Description' },
  { page_slug: 'cap-dredging', section_key: 'process_steps', label: 'Process Steps' },
  { page_slug: 'cap-dredging', section_key: 'standards', label: 'Standards' },
  { page_slug: 'cap-dredging', section_key: 'equipment', label: 'Equipment' },
  
  // Jetty Capability
  { page_slug: 'cap-jetty', section_key: 'hero', label: 'Hero Section' },
  { page_slug: 'cap-jetty', section_key: 'description', label: 'Description' },
  { page_slug: 'cap-jetty', section_key: 'process_steps', label: 'Process Steps' },
  { page_slug: 'cap-jetty', section_key: 'standards', label: 'Standards' },
  { page_slug: 'cap-jetty', section_key: 'equipment', label: 'Equipment' },
  
  // Shore Approach Capability
  { page_slug: 'cap-shore', section_key: 'hero', label: 'Hero Section' },
  { page_slug: 'cap-shore', section_key: 'description', label: 'Description' },
  { page_slug: 'cap-shore', section_key: 'process_steps', label: 'Process Steps' },
  { page_slug: 'cap-shore', section_key: 'standards', label: 'Standards' },
  { page_slug: 'cap-shore', section_key: 'equipment', label: 'Equipment' },
  
  // Geotechnical Capability
  { page_slug: 'cap-geotechnical', section_key: 'hero', label: 'Hero Section' },
  { page_slug: 'cap-geotechnical', section_key: 'description', label: 'Description' },
  { page_slug: 'cap-geotechnical', section_key: 'process_steps', label: 'Process Steps' },
  { page_slug: 'cap-geotechnical', section_key: 'standards', label: 'Standards' },
  { page_slug: 'cap-geotechnical', section_key: 'equipment', label: 'Equipment' },
  
  // Facilities Capability
  { page_slug: 'cap-facilities', section_key: 'hero', label: 'Hero Section' },
  { page_slug: 'cap-facilities', section_key: 'description', label: 'Description' },
  { page_slug: 'cap-facilities', section_key: 'process_steps', label: 'Process Steps' },
  { page_slug: 'cap-facilities', section_key: 'standards', label: 'Standards' },
  { page_slug: 'cap-facilities', section_key: 'equipment', label: 'Equipment' },
  
  // Security Capability
  { page_slug: 'cap-security', section_key: 'hero', label: 'Hero Section' },
  { page_slug: 'cap-security', section_key: 'description', label: 'Description' },
  { page_slug: 'cap-security', section_key: 'process_steps', label: 'Process Steps' },
  { page_slug: 'cap-security', section_key: 'standards', label: 'Standards' },
  { page_slug: 'cap-security', section_key: 'equipment', label: 'Equipment' },
  
// Logistics Capability
  { page_slug: 'cap-logistics', section_key: 'hero', label: 'Hero Section' },
  { page_slug: 'cap-logistics', section_key: 'description', label: 'Description' },
  { page_slug: 'cap-logistics', section_key: 'process_steps', label: 'Process Steps' },
  { page_slug: 'cap-logistics', section_key: 'standards', label: 'Standards' },
  { page_slug: 'cap-logistics', section_key: 'equipment', label: 'Equipment' },
  
  // ===== PROJECT DETAIL PAGES =====
  // OML34 CHDD Project
  { page_slug: 'proj-oml34', section_key: 'hero', label: 'Hero Section' },
  { page_slug: 'proj-oml34', section_key: 'overview', label: 'Project Overview' },
  { page_slug: 'proj-oml34', section_key: 'challenge', label: 'Challenge' },
  { page_slug: 'proj-oml34', section_key: 'solution', label: 'Solution' },
  { page_slug: 'proj-oml34', section_key: 'results', label: 'Results/Metrics' },
  { page_slug: 'proj-oml34', section_key: 'scope', label: 'Scope of Work' },
  { page_slug: 'proj-oml34', section_key: 'gallery', label: 'Gallery Images' },
  
  // Otumara-Escravos Project
  { page_slug: 'proj-otumara', section_key: 'hero', label: 'Hero Section' },
  { page_slug: 'proj-otumara', section_key: 'overview', label: 'Project Overview' },
  { page_slug: 'proj-otumara', section_key: 'challenge', label: 'Challenge' },
  { page_slug: 'proj-otumara', section_key: 'solution', label: 'Solution' },
  { page_slug: 'proj-otumara', section_key: 'results', label: 'Results/Metrics' },
  { page_slug: 'proj-otumara', section_key: 'scope', label: 'Scope of Work' },
  { page_slug: 'proj-otumara', section_key: 'gallery', label: 'Gallery Images' },
  
  // Atlas Cove-Mosimi Project
  { page_slug: 'proj-atlas', section_key: 'hero', label: 'Hero Section' },
  { page_slug: 'proj-atlas', section_key: 'overview', label: 'Project Overview' },
  { page_slug: 'proj-atlas', section_key: 'challenge', label: 'Challenge' },
  { page_slug: 'proj-atlas', section_key: 'solution', label: 'Solution' },
  { page_slug: 'proj-atlas', section_key: 'results', label: 'Results/Metrics' },
  { page_slug: 'proj-atlas', section_key: 'scope', label: 'Scope of Work' },
  { page_slug: 'proj-atlas', section_key: 'gallery', label: 'Gallery Images' },
  
  // Lekki Gas Pipeline Project
  { page_slug: 'proj-lekki', section_key: 'hero', label: 'Hero Section' },
  { page_slug: 'proj-lekki', section_key: 'overview', label: 'Project Overview' },
  { page_slug: 'proj-lekki', section_key: 'challenge', label: 'Challenge' },
  { page_slug: 'proj-lekki', section_key: 'solution', label: 'Solution' },
  { page_slug: 'proj-lekki', section_key: 'results', label: 'Results/Metrics' },
  { page_slug: 'proj-lekki', section_key: 'scope', label: 'Scope of Work' },
  { page_slug: 'proj-lekki', section_key: 'gallery', label: 'Gallery Images' },
  
  // Yenagoa 40" Project
  { page_slug: 'proj-yenagoa', section_key: 'hero', label: 'Hero Section' },
  { page_slug: 'proj-yenagoa', section_key: 'overview', label: 'Project Overview' },
  { page_slug: 'proj-yenagoa', section_key: 'challenge', label: 'Challenge' },
  { page_slug: 'proj-yenagoa', section_key: 'solution', label: 'Solution' },
  { page_slug: 'proj-yenagoa', section_key: 'results', label: 'Results/Metrics' },
  { page_slug: 'proj-yenagoa', section_key: 'scope', label: 'Scope of Work' },
  { page_slug: 'proj-yenagoa', section_key: 'gallery', label: 'Gallery Images' },
  
  // NIPCO Ibafo Project
  { page_slug: 'proj-nipco', section_key: 'hero', label: 'Hero Section' },
  { page_slug: 'proj-nipco', section_key: 'overview', label: 'Project Overview' },
  { page_slug: 'proj-nipco', section_key: 'challenge', label: 'Challenge' },
  { page_slug: 'proj-nipco', section_key: 'solution', label: 'Solution' },
  { page_slug: 'proj-nipco', section_key: 'results', label: 'Results/Metrics' },
  { page_slug: 'proj-nipco', section_key: 'scope', label: 'Scope of Work' },
  { page_slug: 'proj-nipco', section_key: 'gallery', label: 'Gallery Images' },
];

const pageNames: Record<string, string> = {
  home: 'Home Page',
  about: 'About Page',
  management: 'Management Team',
  services: 'Services/Capabilities',
  capabilities: 'Capabilities',
  projects: 'Projects',
  gallery: 'Gallery',
  equipment: 'Equipment',
  hdd_equipment: 'HDD Equipment',
  hse: 'HSE & Quality',
  careers: 'Careers',
  contact: 'Contact',
  partners: 'Partners',
  testimonials: 'Testimonials',
  resources: 'Resources/Downloads',
  project_map: 'Project Map',
  company_intro: 'Company Introduction',
  privacy: 'Privacy Policy',
  terms: 'Terms & Conditions',
  // Capability Detail Pages
  'cap-hdd': 'HDD (Detail)',
  'cap-pipelines': 'Pipelines (Detail)',
  'cap-dredging': 'Dredging (Detail)',
  'cap-jetty': 'Jetty (Detail)',
  'cap-shore': 'Shore Approach (Detail)',
  'cap-geotechnical': 'Geotechnical (Detail)',
  'cap-facilities': 'Facilities (Detail)',
  'cap-security': 'Security (Detail)',
  'cap-logistics': 'Logistics (Detail)',
  // Project Detail Pages
  'proj-oml34': 'OML34 CHDD 12km',
  'proj-otumara': 'Otumara-Escravos',
  'proj-atlas': 'Atlas Cove-Mosimi',
  'proj-lekki': 'Lekki Gas Pipeline',
  'proj-yenagoa': 'Yenagoa 40" Crossing',
  'proj-nipco': 'NIPCO Ibafo',
};

// Sortable Section Item Component
function SortableSectionItem({ 
  section, 
  sectionDef, 
  children 
}: { 
  section: PageSection; 
  sectionDef: typeof allPageSections[0] | undefined;
  children: React.ReactNode;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  const hasCustomContent = Object.keys(section.content).length > 0;

  return (
    <AccordionItem ref={setNodeRef} style={style} value={section.id} className="relative bg-background">
      <div className="flex items-center">
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="p-2 cursor-grab active:cursor-grabbing hover:bg-muted rounded-l-md touch-none flex-shrink-0"
          title="Drag to reorder"
        >
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </button>
        <AccordionTrigger className="flex-1 hover:no-underline py-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-medium">{sectionDef?.label || section.section_key}</span>
            {hasCustomContent && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                Customized
              </span>
            )}
            {section.updated_at && (
              <span className="text-xs text-muted-foreground">
                Updated: {new Date(section.updated_at).toLocaleDateString()}
              </span>
            )}
          </div>
        </AccordionTrigger>
      </div>
      <AccordionContent className="pt-4 pb-6 pl-10">
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}

const PagesEditor: React.FC = () => {
  const { user } = useAuth();
  const [sections, setSections] = useState<PageSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [uploadingImage, setUploadingImage] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const { data, error } = await supabase
        .from('page_content')
        .select('*')
        .order('page_slug', { ascending: true });

      if (error) throw error;

      // Merge with defaults
      const existingSections = data || [];
      const mergedSections: PageSection[] = allPageSections.map((def, index) => {
        const existing = existingSections.find(
          (s) => s.page_slug === def.page_slug && s.section_key === def.section_key
        );
        if (existing) {
          return {
            id: existing.id,
            page_slug: existing.page_slug,
            section_key: existing.section_key,
            content: (existing.content && typeof existing.content === 'object' && !Array.isArray(existing.content))
              ? existing.content as Record<string, any>
              : {},
            updated_at: existing.updated_at,
            order: index,
          };
        }
        return {
          id: `new-${def.page_slug}-${def.section_key}`,
          page_slug: def.page_slug,
          section_key: def.section_key,
          content: {},
          order: index,
        };
      });

      setSections(mergedSections);
    } catch (error) {
      console.error('Error fetching sections:', error);
      toast.error('Failed to load page content');
    } finally {
      setIsLoading(false);
    }
  };

  const updateSectionContent = (sectionId: string, field: string, value: any) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? { ...section, content: { ...section.content, [field]: value } }
          : section
      )
    );
  };

  const handleImageUpload = async (sectionId: string, field: string, file: File) => {
    const uploadKey = `${sectionId}-${field}`;
    setUploadingImage(uploadKey);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `page-${Date.now()}.${fileExt}`;
      const filePath = `pages/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('admin_uploads')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('admin_uploads')
        .getPublicUrl(filePath);

      updateSectionContent(sectionId, field, publicUrl);
      toast.success('Image uploaded successfully');
      return publicUrl;
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
      return null;
    } finally {
      setUploadingImage(null);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      for (const section of sections) {
        const isNew = section.id.startsWith('new-');

        if (Object.keys(section.content).length === 0) continue;

        if (isNew) {
          const { error } = await supabase.from('page_content').insert({
            page_slug: section.page_slug,
            section_key: section.section_key,
            content: section.content,
            updated_by: user?.id,
          });
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from('page_content')
            .update({
              content: section.content,
              updated_by: user?.id,
            })
            .eq('id', section.id);
          if (error) throw error;
        }
      }

      toast.success('All changes saved successfully');
      fetchSections();
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save content');
    } finally {
      setIsSaving(false);
    }
  };

  // Hero slides management
  const addHeroSlide = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (!section) return;
    
    const currentSlides: HeroSlide[] = section.content.slides || [];
    updateSectionContent(sectionId, 'slides', [...currentSlides, { image: '', title: '' }]);
  };

  const updateHeroSlide = (sectionId: string, index: number, field: 'image' | 'title', value: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (!section) return;
    
    const currentSlides: HeroSlide[] = [...(section.content.slides || [])];
    currentSlides[index] = { ...currentSlides[index], [field]: value };
    updateSectionContent(sectionId, 'slides', currentSlides);
  };

  const removeHeroSlide = (sectionId: string, index: number) => {
    const section = sections.find(s => s.id === sectionId);
    if (!section) return;
    
    const currentSlides: HeroSlide[] = [...(section.content.slides || [])];
    currentSlides.splice(index, 1);
    updateSectionContent(sectionId, 'slides', currentSlides);
  };

  const handleSlideImageUpload = async (sectionId: string, slideIndex: number, file: File) => {
    const uploadKey = `${sectionId}-slide-${slideIndex}`;
    setUploadingImage(uploadKey);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `slide-${Date.now()}.${fileExt}`;
      const filePath = `pages/slides/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('admin_uploads')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('admin_uploads')
        .getPublicUrl(filePath);

      updateHeroSlide(sectionId, slideIndex, 'image', publicUrl);
      toast.success('Slide image uploaded');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploadingImage(null);
    }
  };

  // Handle drag end for reordering
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSections((items) => {
        const pageSections = items.filter(s => s.page_slug === activeTab);
        const otherSections = items.filter(s => s.page_slug !== activeTab);
        
        const oldIndex = pageSections.findIndex((s) => s.id === active.id);
        const newIndex = pageSections.findIndex((s) => s.id === over.id);

        const reorderedPageSections = arrayMove(pageSections, oldIndex, newIndex);
        
        return [...otherSections, ...reorderedPageSections];
      });
      toast.success('Section order updated');
    }
  };

  const pages = [...new Set(allPageSections.map((s) => s.page_slug))];
  
  // Filter pages based on search query
  const filteredPages = useMemo(() => {
    if (!searchQuery.trim()) return pages;
    const query = searchQuery.toLowerCase();
    return pages.filter(page => {
      const pageName = (pageNames[page] || page).toLowerCase();
      const pageSections = allPageSections.filter(s => s.page_slug === page);
      const sectionLabels = pageSections.map(s => s.label.toLowerCase());
      return pageName.includes(query) || sectionLabels.some(label => label.includes(query));
    });
  }, [pages, searchQuery]);
  
  // Filter sections within current page based on search
  const filteredCurrentPageSections = useMemo(() => {
    const pageSections = sections.filter((s) => s.page_slug === activeTab);
    if (!searchQuery.trim()) return pageSections;
    const query = searchQuery.toLowerCase();
    return pageSections.filter(section => {
      const sectionDef = allPageSections.find(
        (d) => d.page_slug === section.page_slug && d.section_key === section.section_key
      );
      const label = (sectionDef?.label || section.section_key).toLowerCase();
      return label.includes(query) || section.section_key.toLowerCase().includes(query);
    });
  }, [sections, activeTab, searchQuery]);

  // Get default content for a section
  const getDefaultForSection = (pageSlug: string, sectionKey: string) => {
    return defaultSectionContent[pageSlug]?.[sectionKey];
  };

  const renderHomeHeroEditor = (section: PageSection) => {
    const savedSlides: HeroSlide[] = section.content.slides || [];
    const displaySlides: HeroSlide[] = savedSlides.length > 0 ? savedSlides : defaultHeroSlides;
    const isUsingDefaults = savedSlides.length === 0;
    const defaultHero = defaultPageHeroes.home;
    
    const initializeWithDefaults = () => {
      updateSectionContent(section.id, 'slides', defaultHeroSlides.map(s => ({ image: s.image, title: s.title })));
      toast.success('Loaded current slides for editing');
    };

    const resetToDefaults = () => {
      updateSectionContent(section.id, 'slides', []);
      toast.success('Reset to default slides');
    };
    
    return (
      <div className="space-y-6">
        {/* Hero Video Preview */}
        <CurrentAssetPreview
          type="video"
          currentUrl={section.content.videoUrl}
          defaultUrl={defaultHero?.video}
          defaultDescription="Homepage hero video background - HDD operations footage"
          pageRoute="/"
          isUploading={uploadingImage === `${section.id}-videoUrl`}
          onUpload={(file) => handleImageUpload(section.id, 'videoUrl', file)}
          onUrlChange={(url) => updateSectionContent(section.id, 'videoUrl', url)}
          onReset={() => updateSectionContent(section.id, 'videoUrl', '')}
        />

        {/* Main Hero Content */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Hero Text Content</CardTitle>
            <CardDescription>Main headline and call-to-action buttons</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm">
              <p className="font-medium text-blue-800">Current Defaults:</p>
              <p className="text-blue-700">Title: "{defaultHero?.title}"</p>
              <p className="text-blue-700 text-xs mt-1">Subtitle: "{defaultHero?.subtitle}"</p>
            </div>
            <div className="space-y-2">
              <Label>Hero Title</Label>
              <Input
                value={section.content.title || ''}
                onChange={(e) => updateSectionContent(section.id, 'title', e.target.value)}
                placeholder={defaultHero?.title || "Nigeria's Premier Trenchless & Pipeline Contractor"}
              />
            </div>
            <div className="space-y-2">
              <Label>Hero Subtitle</Label>
              <Textarea
                value={section.content.subtitle || ''}
                onChange={(e) => updateSectionContent(section.id, 'subtitle', e.target.value)}
                placeholder="Pioneers of HDD in Nigeria since 2003..."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label>Badge Text</Label>
              <Input
                value={section.content.badge || ''}
                onChange={(e) => updateSectionContent(section.id, 'badge', e.target.value)}
                placeholder="Pioneers of HDD in Nigeria since 2003"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Primary Button Text</Label>
                <Input
                  value={section.content.primaryBtnText || ''}
                  onChange={(e) => updateSectionContent(section.id, 'primaryBtnText', e.target.value)}
                  placeholder="Get Your Free Quote"
                />
              </div>
              <div className="space-y-2">
                <Label>Primary Button Link</Label>
                <Input
                  value={section.content.primaryBtnLink || ''}
                  onChange={(e) => updateSectionContent(section.id, 'primaryBtnLink', e.target.value)}
                  placeholder="/contact"
                />
              </div>
              <div className="space-y-2">
                <Label>Secondary Button Text</Label>
                <Input
                  value={section.content.secondaryBtnText || ''}
                  onChange={(e) => updateSectionContent(section.id, 'secondaryBtnText', e.target.value)}
                  placeholder="View Our Projects"
                />
              </div>
              <div className="space-y-2">
                <Label>Secondary Button Link</Label>
                <Input
                  value={section.content.secondaryBtnLink || ''}
                  onChange={(e) => updateSectionContent(section.id, 'secondaryBtnLink', e.target.value)}
                  placeholder="/projects"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hero Slides Management */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <CardTitle className="text-base">Hero Background Slides</CardTitle>
                <CardDescription>
                  {isUsingDefaults 
                    ? "Showing current default slides. Click 'Edit Slides' to customize." 
                    : `${displaySlides.length} custom slides configured`
                  }
                </CardDescription>
              </div>
              <div className="flex gap-2">
                {isUsingDefaults ? (
                  <Button size="sm" onClick={initializeWithDefaults}>
                    <ImageIcon className="h-4 w-4 mr-1" />
                    Edit Slides
                  </Button>
                ) : (
                  <>
                    <Button size="sm" variant="outline" onClick={resetToDefaults}>
                      <RotateCcw className="h-4 w-4 mr-1" />
                      Reset to Defaults
                    </Button>
                    <Button size="sm" onClick={() => addHeroSlide(section.id)}>
                      <Plus className="h-4 w-4 mr-1" />
                      Add Slide
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {displaySlides.map((slide, index) => (
                <div key={index} className={`flex gap-4 p-4 border rounded-lg ${isUsingDefaults ? 'bg-blue-50/50 border-blue-200' : 'bg-muted/30'}`}>
                  <div className="flex items-center text-muted-foreground">
                    <span className="text-sm font-medium w-6">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <img
                          src={slide.image}
                          alt={slide.title || `Slide ${index + 1}`}
                          className="h-20 w-32 object-cover rounded bg-muted"
                        />
                        {isUsingDefaults && (
                          <span className="absolute -top-2 -right-2 text-xs bg-blue-500 text-white px-1.5 py-0.5 rounded">
                            Default
                          </span>
                        )}
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        {isUsingDefaults ? (
                          <>
                            <p className="font-medium text-sm">{slide.title || 'Untitled Slide'}</p>
                            <p className="text-xs text-muted-foreground">
                              This is a default slide. Click "Edit Slides" to customize.
                            </p>
                          </>
                        ) : (
                          <>
                            <div className="space-y-1">
                              <Label className="text-xs">Slide Title</Label>
                              <Input
                                value={slide.title}
                                onChange={(e) => updateHeroSlide(section.id, index, 'title', e.target.value)}
                                placeholder="Slide title"
                                className="h-8"
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs">Replace Image</Label>
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleSlideImageUpload(section.id, index, file);
                                }}
                                disabled={uploadingImage === `${section.id}-slide-${index}`}
                                className="cursor-pointer h-8 text-xs"
                              />
                              {uploadingImage === `${section.id}-slide-${index}` && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Loader2 className="h-3 w-3 animate-spin" />
                                  Uploading...
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                      
                      {!isUsingDefaults && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => removeHeroSlide(section.id, index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderSectionEditor = (section: PageSection) => {
    const sectionDef = allPageSections.find(
      (d) => d.page_slug === section.page_slug && d.section_key === section.section_key
    );
    if (!sectionDef) return null;

    // Special editor for home page hero with slides
    if (section.page_slug === 'home' && section.section_key === 'hero') {
      return renderHomeHeroEditor(section);
    }

    // Common fields for hero sections (with default image display)
    if (section.section_key === 'hero') {
      const defaultHero = defaultPageHeroes[section.page_slug];
      const currentImage = section.content.backgroundImage;
      
      return (
        <div className="space-y-4">
          {/* Current Defaults Info Box */}
          {defaultHero && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-800">Current Codebase Defaults</p>
                  <p className="text-blue-700 mt-1">Title: "{defaultHero.title}"</p>
                  <p className="text-blue-700">Subtitle: "{defaultHero.subtitle}"</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <Label>Hero Title</Label>
            <Input
              value={section.content.title || ''}
              onChange={(e) => updateSectionContent(section.id, 'title', e.target.value)}
              placeholder={defaultHero?.title || "Page headline..."}
            />
          </div>
          <div className="space-y-2">
            <Label>Hero Subtitle</Label>
            <Textarea
              value={section.content.subtitle || ''}
              onChange={(e) => updateSectionContent(section.id, 'subtitle', e.target.value)}
              placeholder={defaultHero?.subtitle || "Supporting text..."}
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label>Badge Text</Label>
            <Input
              value={section.content.badge || ''}
              onChange={(e) => updateSectionContent(section.id, 'badge', e.target.value)}
              placeholder="e.g., 'Since 2003'"
            />
          </div>
          
          {/* Background Image Preview */}
          <CurrentAssetPreview
            type="image"
            currentUrl={currentImage}
            defaultUrl={defaultHero?.image}
            defaultDescription={defaultHero?.description}
            pageRoute={defaultHero?.route}
            isUploading={uploadingImage === `${section.id}-backgroundImage`}
            onUpload={(file) => handleImageUpload(section.id, 'backgroundImage', file)}
            onUrlChange={(url) => updateSectionContent(section.id, 'backgroundImage', url)}
            onReset={defaultHero ? () => updateSectionContent(section.id, 'backgroundImage', '') : undefined}
          />
        </div>
      );
    }

    // Management Team Grid - special handling with clickable team members
    if (section.page_slug === 'management' && section.section_key === 'team_grid') {
      return (
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-700">
                  <p className="font-medium text-blue-800">Team Members</p>
                  <p className="mt-1">Click any team member to edit in the dedicated Team Manager.</p>
                </div>
              </div>
              <Link to="/admin/dashboard/team">
                <Button size="sm" variant="outline">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Open Team Manager
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Clickable preview of all team members */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">All Team Members ({defaultTeamMembers.length})</CardTitle>
                <Link to="/about/management" target="_blank">
                  <Button size="sm" variant="ghost" className="text-xs">
                    <Eye className="h-3 w-3 mr-1" />
                    View Live
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-3">
                {defaultTeamMembers.map((member, idx) => (
                  <Link 
                    key={idx} 
                    to="/admin/dashboard/team"
                    className="text-center group cursor-pointer"
                  >
                    <div className="relative">
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full aspect-square object-cover object-top rounded-lg bg-muted border-2 border-muted group-hover:border-primary transition-all"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <Pencil className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <p className="text-[10px] font-medium mt-1 truncate group-hover:text-primary" title={member.name}>
                      {member.name.split(' ').slice(-1)[0]}
                    </p>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    // ===== CAPABILITY DETAIL PAGE EDITORS =====
    const isCapabilityPage = section.page_slug.startsWith('cap-');
    const capDefaults = capabilityDetailDefaults[section.page_slug];
    
    // Capability Hero - show default image and text
    if (isCapabilityPage && section.section_key === 'hero') {
      return (
        <div className="space-y-4">
          {capDefaults && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-700">
                  <p className="font-medium text-blue-800">Current Codebase Defaults</p>
                  <p className="mt-1">Title: "{capDefaults.title}"</p>
                  <p className="text-xs mt-1 line-clamp-2">Description: "{capDefaults.description}"</p>
                </div>
              </div>
            </div>
          )}
          <div className="space-y-2">
            <Label>Hero Title</Label>
            <Input
              value={section.content.title || ''}
              onChange={(e) => updateSectionContent(section.id, 'title', e.target.value)}
              placeholder={capDefaults?.title || "Capability title..."}
            />
          </div>
          <div className="space-y-2">
            <Label>Hero Subtitle/Description</Label>
            <Textarea
              value={section.content.subtitle || ''}
              onChange={(e) => updateSectionContent(section.id, 'subtitle', e.target.value)}
              placeholder={capDefaults?.description || "Capability description..."}
              rows={3}
            />
          </div>
          <CurrentAssetPreview
            type="image"
            currentUrl={section.content.backgroundImage}
            defaultUrl={capDefaults?.heroImage}
            defaultDescription={`Hero image for ${capDefaults?.title || 'capability page'}`}
            pageRoute={pageRoutes[section.page_slug]}
            isUploading={uploadingImage === `${section.id}-backgroundImage`}
            onUpload={(file) => handleImageUpload(section.id, 'backgroundImage', file)}
            onUrlChange={(url) => updateSectionContent(section.id, 'backgroundImage', url)}
            onReset={capDefaults ? () => updateSectionContent(section.id, 'backgroundImage', '') : undefined}
          />
        </div>
      );
    }
    
    // Capability Description section
    if (isCapabilityPage && section.section_key === 'description') {
      return (
        <div className="space-y-4">
          {capDefaults && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-700">
                  <p className="font-medium text-blue-800">Current Default Description</p>
                  <p className="mt-1">"{capDefaults.description}"</p>
                </div>
              </div>
            </div>
          )}
          <div className="space-y-2">
            <Label>Main Description</Label>
            <Textarea
              value={section.content.description || ''}
              onChange={(e) => updateSectionContent(section.id, 'description', e.target.value)}
              placeholder={capDefaults?.description || "Full capability description..."}
              rows={5}
            />
          </div>
        </div>
      );
    }
    
    // Capability Process Steps section
    if (isCapabilityPage && section.section_key === 'process_steps') {
      const savedSteps: { title: string; description: string }[] = section.content.steps || [];
      const displaySteps = savedSteps.length > 0 ? savedSteps : capDefaults?.processSteps || [];
      const isUsingDefaults = savedSteps.length === 0;
      
      const initializeWithDefaults = () => {
        updateSectionContent(section.id, 'steps', capDefaults?.processSteps || []);
        toast.success('Loaded process steps for editing');
      };
      
      const addStep = () => {
        const current = section.content.steps || [];
        updateSectionContent(section.id, 'steps', [...current, { title: '', description: '' }]);
      };
      
      const updateStep = (index: number, field: 'title' | 'description', value: string) => {
        const current = [...(section.content.steps || [])];
        current[index] = { ...current[index], [field]: value };
        updateSectionContent(section.id, 'steps', current);
      };
      
      const removeStep = (index: number) => {
        const current = [...(section.content.steps || [])];
        current.splice(index, 1);
        updateSectionContent(section.id, 'steps', current);
      };
      
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {isUsingDefaults ? 'Showing default process steps. Click "Edit Steps" to customize.' : `${displaySteps.length} steps configured`}
            </p>
            <div className="flex gap-2">
              {isUsingDefaults ? (
                <Button size="sm" onClick={initializeWithDefaults}>
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit Steps
                </Button>
              ) : (
                <>
                  <Button size="sm" variant="outline" onClick={() => updateSectionContent(section.id, 'steps', [])}>
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Reset
                  </Button>
                  <Button size="sm" onClick={addStep}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Step
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="space-y-3">
            {displaySteps.map((step, index) => (
              <Card key={index} className={`p-4 ${isUsingDefaults ? 'bg-blue-50/50 border-blue-200' : ''}`}>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1 space-y-2">
                    {isUsingDefaults ? (
                      <>
                        <p className="font-medium text-sm">{step.title}</p>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </>
                    ) : (
                      <>
                        <Input
                          value={step.title}
                          onChange={(e) => updateStep(index, 'title', e.target.value)}
                          placeholder="Step title"
                          className="h-8"
                        />
                        <Input
                          value={step.description}
                          onChange={(e) => updateStep(index, 'description', e.target.value)}
                          placeholder="Step description"
                          className="h-8"
                        />
                      </>
                    )}
                  </div>
                  {!isUsingDefaults && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => removeStep(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      );
    }
    
    // Capability Standards section
    if (isCapabilityPage && section.section_key === 'standards') {
      const savedStandards: string[] = section.content.standards || [];
      const displayStandards = savedStandards.length > 0 ? savedStandards : capDefaults?.standards || [];
      const isUsingDefaults = savedStandards.length === 0;
      
      const initializeWithDefaults = () => {
        updateSectionContent(section.id, 'standards', capDefaults?.standards || []);
        toast.success('Loaded standards for editing');
      };
      
      const addStandard = () => {
        const current = section.content.standards || [];
        updateSectionContent(section.id, 'standards', [...current, '']);
      };
      
      const updateStandard = (index: number, value: string) => {
        const current = [...(section.content.standards || [])];
        current[index] = value;
        updateSectionContent(section.id, 'standards', current);
      };
      
      const removeStandard = (index: number) => {
        const current = [...(section.content.standards || [])];
        current.splice(index, 1);
        updateSectionContent(section.id, 'standards', current);
      };
      
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {isUsingDefaults ? 'Showing default standards. Click "Edit" to customize.' : `${displayStandards.length} standards configured`}
            </p>
            <div className="flex gap-2">
              {isUsingDefaults ? (
                <Button size="sm" onClick={initializeWithDefaults}>
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit Standards
                </Button>
              ) : (
                <>
                  <Button size="sm" variant="outline" onClick={() => updateSectionContent(section.id, 'standards', [])}>
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Reset
                  </Button>
                  <Button size="sm" onClick={addStandard}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Standard
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {displayStandards.map((standard, index) => (
              <Card key={index} className={`p-3 ${isUsingDefaults ? 'bg-blue-50/50 border-blue-200' : ''}`}>
                {isUsingDefaults ? (
                  <p className="text-sm font-medium">{standard}</p>
                ) : (
                  <div className="flex items-center gap-2">
                    <Input
                      value={standard}
                      onChange={(e) => updateStandard(index, e.target.value)}
                      placeholder="Standard name"
                      className="h-8 flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive h-8 w-8"
                      onClick={() => removeStandard(index)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      );
    }
    
    // Capability Equipment section
    if (isCapabilityPage && section.section_key === 'equipment') {
      const savedEquipment: { name: string; specs: string }[] = section.content.equipment || [];
      const displayEquipment = savedEquipment.length > 0 ? savedEquipment : capDefaults?.equipment || [];
      const isUsingDefaults = savedEquipment.length === 0;
      
      const initializeWithDefaults = () => {
        updateSectionContent(section.id, 'equipment', capDefaults?.equipment || []);
        toast.success('Loaded equipment for editing');
      };
      
      const addEquipment = () => {
        const current = section.content.equipment || [];
        updateSectionContent(section.id, 'equipment', [...current, { name: '', specs: '' }]);
      };
      
      const updateEquipment = (index: number, field: 'name' | 'specs', value: string) => {
        const current = [...(section.content.equipment || [])];
        current[index] = { ...current[index], [field]: value };
        updateSectionContent(section.id, 'equipment', current);
      };
      
      const removeEquipment = (index: number) => {
        const current = [...(section.content.equipment || [])];
        current.splice(index, 1);
        updateSectionContent(section.id, 'equipment', current);
      };
      
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {isUsingDefaults ? 'Showing default equipment. Click "Edit" to customize.' : `${displayEquipment.length} items configured`}
            </p>
            <div className="flex gap-2">
              {isUsingDefaults ? (
                <Button size="sm" onClick={initializeWithDefaults}>
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit Equipment
                </Button>
              ) : (
                <>
                  <Button size="sm" variant="outline" onClick={() => updateSectionContent(section.id, 'equipment', [])}>
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Reset
                  </Button>
                  <Button size="sm" onClick={addEquipment}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Equipment
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {displayEquipment.map((item, index) => (
              <Card key={index} className={`p-4 ${isUsingDefaults ? 'bg-blue-50/50 border-blue-200' : ''}`}>
                {isUsingDefaults ? (
                  <>
                    <p className="font-semibold text-sm">{item.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">{item.specs}</p>
                  </>
                ) : (
                  <div className="space-y-2">
                    <Input
                      value={item.name}
                      onChange={(e) => updateEquipment(index, 'name', e.target.value)}
                      placeholder="Equipment name"
                      className="h-8"
                    />
                    <Input
                      value={item.specs}
                      onChange={(e) => updateEquipment(index, 'specs', e.target.value)}
                      placeholder="Specifications"
                      className="h-8"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive w-full"
                      onClick={() => removeEquipment(index)}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Remove
                    </Button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      );
    }

    // ===== PROJECT DETAIL PAGE EDITORS =====
    const isProjectPage = section.page_slug.startsWith('proj-');
    const projDefaults = projectDetailDefaults[section.page_slug];
    
    // Project Hero section
    if (isProjectPage && section.section_key === 'hero') {
      return (
        <div className="space-y-4">
          {projDefaults && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-700">
                  <p className="font-medium text-amber-800">Current Project Defaults</p>
                  <p className="mt-1">Title: "{projDefaults.title}"</p>
                  <p className="text-xs">Client: {projDefaults.client}</p>
                  <p className="text-xs">Location: {projDefaults.location} | Year: {projDefaults.year}</p>
                  {projDefaults.recordBadge && (
                    <span className="inline-block mt-1 text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded">
                      🏆 {projDefaults.recordBadge}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="space-y-2">
            <Label>Project Title</Label>
            <Input
              value={section.content.title || ''}
              onChange={(e) => updateSectionContent(section.id, 'title', e.target.value)}
              placeholder={projDefaults?.title || "Project title..."}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Client</Label>
              <Input
                value={section.content.client || ''}
                onChange={(e) => updateSectionContent(section.id, 'client', e.target.value)}
                placeholder={projDefaults?.client || "Client name..."}
              />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                value={section.content.location || ''}
                onChange={(e) => updateSectionContent(section.id, 'location', e.target.value)}
                placeholder={projDefaults?.location || "Project location..."}
              />
            </div>
            <div className="space-y-2">
              <Label>Year</Label>
              <Input
                value={section.content.year || ''}
                onChange={(e) => updateSectionContent(section.id, 'year', e.target.value)}
                placeholder={projDefaults?.year || "2020-2021"}
              />
            </div>
            <div className="space-y-2">
              <Label>Record Badge (optional)</Label>
              <Input
                value={section.content.recordBadge || ''}
                onChange={(e) => updateSectionContent(section.id, 'recordBadge', e.target.value)}
                placeholder={projDefaults?.recordBadge || "e.g., Nigeria's Longest CHDD"}
              />
            </div>
          </div>
          <CurrentAssetPreview
            type="image"
            currentUrl={section.content.backgroundImage}
            defaultUrl={projDefaults?.heroImage}
            defaultDescription={`Hero image for ${projDefaults?.title || 'project page'}`}
            pageRoute={pageRoutes[section.page_slug]}
            isUploading={uploadingImage === `${section.id}-backgroundImage`}
            onUpload={(file) => handleImageUpload(section.id, 'backgroundImage', file)}
            onUrlChange={(url) => updateSectionContent(section.id, 'backgroundImage', url)}
            onReset={projDefaults ? () => updateSectionContent(section.id, 'backgroundImage', '') : undefined}
          />
        </div>
      );
    }
    
    // Project Overview section
    if (isProjectPage && section.section_key === 'overview') {
      return (
        <div className="space-y-4">
          {projDefaults && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-700">
                  <p className="font-medium text-amber-800">Current Overview</p>
                  <p className="mt-1 line-clamp-3">"{projDefaults.overview}"</p>
                </div>
              </div>
            </div>
          )}
          <div className="space-y-2">
            <Label>Project Overview</Label>
            <Textarea
              value={section.content.overview || ''}
              onChange={(e) => updateSectionContent(section.id, 'overview', e.target.value)}
              placeholder={projDefaults?.overview || "Describe the project..."}
              rows={5}
            />
          </div>
        </div>
      );
    }
    
    // Project Challenge section
    if (isProjectPage && section.section_key === 'challenge') {
      return (
        <div className="space-y-4">
          {projDefaults && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-700">
                  <p className="font-medium text-amber-800">Current Challenge</p>
                  <p className="mt-1 line-clamp-3">"{projDefaults.challenge}"</p>
                </div>
              </div>
            </div>
          )}
          <div className="space-y-2">
            <Label>Project Challenge</Label>
            <Textarea
              value={section.content.challenge || ''}
              onChange={(e) => updateSectionContent(section.id, 'challenge', e.target.value)}
              placeholder={projDefaults?.challenge || "Describe the challenges..."}
              rows={5}
            />
          </div>
        </div>
      );
    }
    
    // Project Solution section
    if (isProjectPage && section.section_key === 'solution') {
      return (
        <div className="space-y-4">
          {projDefaults && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-700">
                  <p className="font-medium text-amber-800">Current Solution</p>
                  <p className="mt-1 line-clamp-3">"{projDefaults.solution}"</p>
                </div>
              </div>
            </div>
          )}
          <div className="space-y-2">
            <Label>Project Solution</Label>
            <Textarea
              value={section.content.solution || ''}
              onChange={(e) => updateSectionContent(section.id, 'solution', e.target.value)}
              placeholder={projDefaults?.solution || "Describe the solution..."}
              rows={5}
            />
          </div>
        </div>
      );
    }
    
    // Project Results section
    if (isProjectPage && section.section_key === 'results') {
      const savedResults: { label: string; value: string }[] = section.content.results || [];
      const displayResults = savedResults.length > 0 ? savedResults : projDefaults?.results || [];
      const isUsingDefaults = savedResults.length === 0;
      
      const initializeWithDefaults = () => {
        updateSectionContent(section.id, 'results', projDefaults?.results || []);
        toast.success('Loaded results for editing');
      };
      
      const addResult = () => {
        const current = section.content.results || [];
        updateSectionContent(section.id, 'results', [...current, { label: '', value: '' }]);
      };
      
      const updateResult = (index: number, field: 'label' | 'value', value: string) => {
        const current = [...(section.content.results || [])];
        current[index] = { ...current[index], [field]: value };
        updateSectionContent(section.id, 'results', current);
      };
      
      const removeResult = (index: number) => {
        const current = [...(section.content.results || [])];
        current.splice(index, 1);
        updateSectionContent(section.id, 'results', current);
      };
      
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {isUsingDefaults ? 'Showing default results. Click "Edit" to customize.' : `${displayResults.length} results configured`}
            </p>
            <div className="flex gap-2">
              {isUsingDefaults ? (
                <Button size="sm" onClick={initializeWithDefaults}>
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit Results
                </Button>
              ) : (
                <>
                  <Button size="sm" variant="outline" onClick={() => updateSectionContent(section.id, 'results', [])}>
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Reset
                  </Button>
                  <Button size="sm" onClick={addResult}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Result
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {displayResults.map((result, index) => (
              <Card key={index} className={`p-4 ${isUsingDefaults ? 'bg-amber-50/50 border-amber-200' : ''}`}>
                {isUsingDefaults ? (
                  <>
                    <p className="text-2xl font-bold text-primary">{result.value}</p>
                    <p className="text-sm text-muted-foreground">{result.label}</p>
                  </>
                ) : (
                  <div className="space-y-2">
                    <Input
                      value={result.value}
                      onChange={(e) => updateResult(index, 'value', e.target.value)}
                      placeholder="Value (e.g., 12 km)"
                      className="h-8 font-bold"
                    />
                    <Input
                      value={result.label}
                      onChange={(e) => updateResult(index, 'label', e.target.value)}
                      placeholder="Label (e.g., Total Length)"
                      className="h-8"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive w-full"
                      onClick={() => removeResult(index)}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Remove
                    </Button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      );
    }
    
    // Project Scope section
    if (isProjectPage && section.section_key === 'scope') {
      const savedScope: string[] = section.content.scope || [];
      const displayScope = savedScope.length > 0 ? savedScope : projDefaults?.scope || [];
      const isUsingDefaults = savedScope.length === 0;
      
      const initializeWithDefaults = () => {
        updateSectionContent(section.id, 'scope', projDefaults?.scope || []);
        toast.success('Loaded scope items for editing');
      };
      
      const addScopeItem = () => {
        const current = section.content.scope || [];
        updateSectionContent(section.id, 'scope', [...current, '']);
      };
      
      const updateScopeItem = (index: number, value: string) => {
        const current = [...(section.content.scope || [])];
        current[index] = value;
        updateSectionContent(section.id, 'scope', current);
      };
      
      const removeScopeItem = (index: number) => {
        const current = [...(section.content.scope || [])];
        current.splice(index, 1);
        updateSectionContent(section.id, 'scope', current);
      };
      
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {isUsingDefaults ? 'Showing default scope. Click "Edit" to customize.' : `${displayScope.length} items configured`}
            </p>
            <div className="flex gap-2">
              {isUsingDefaults ? (
                <Button size="sm" onClick={initializeWithDefaults}>
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit Scope
                </Button>
              ) : (
                <>
                  <Button size="sm" variant="outline" onClick={() => updateSectionContent(section.id, 'scope', [])}>
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Reset
                  </Button>
                  <Button size="sm" onClick={addScopeItem}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Item
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="space-y-2">
            {displayScope.map((item, index) => (
              <div key={index} className={`flex items-center gap-3 p-3 rounded-lg border ${isUsingDefaults ? 'bg-amber-50/50 border-amber-200' : 'bg-background'}`}>
                <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                {isUsingDefaults ? (
                  <span className="text-sm">{item}</span>
                ) : (
                  <>
                    <Input
                      value={item}
                      onChange={(e) => updateScopeItem(index, e.target.value)}
                      placeholder="Scope item..."
                      className="flex-1 h-8"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive h-8 w-8"
                      onClick={() => removeScopeItem(index)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // Project Gallery section
    if (isProjectPage && section.section_key === 'gallery') {
      return (
        <div className="space-y-4">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-700">
                  <p className="font-medium text-amber-800">Project Gallery</p>
                  <p className="mt-1">Manage project images in the Gallery Manager or upload directly here.</p>
                </div>
              </div>
              <Link to="/admin/dashboard/gallery">
                <Button size="sm" variant="outline">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Gallery Manager
                </Button>
              </Link>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Gallery images are managed centrally in the Gallery Manager. You can categorize images by project name to associate them with this page.
          </p>
        </div>
      );
    }

    // KPI Stats section
    if (section.section_key === 'kpi_stats') {
      return (
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-700">
                <p className="font-medium text-blue-800">Current Defaults</p>
                <p>100+ KM HDD Installed, 30+ Years, 0 LTI, 500+ Workforce</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Edit the key statistics displayed on the homepage.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {['stat1', 'stat2', 'stat3', 'stat4'].map((key, idx) => (
              <Card key={key} className="p-4">
                <Label className="text-xs text-muted-foreground mb-2 block">Stat {idx + 1}</Label>
                <Input
                  value={section.content[`${key}_value`] || ''}
                  onChange={(e) => updateSectionContent(section.id, `${key}_value`, e.target.value)}
                  placeholder={['100+', '30+', '0', '500+'][idx]}
                  className="mb-2"
                />
                <Input
                  value={section.content[`${key}_label`] || ''}
                  onChange={(e) => updateSectionContent(section.id, `${key}_label`, e.target.value)}
                  placeholder={['KM HDD Installed', 'Years Experience', 'LTI Record', 'Workforce'][idx]}
                />
              </Card>
            ))}
          </div>
        </div>
      );
    }

    // Video showcase section
    if (section.section_key === 'video_showcase') {
      const defaults = getDefaultForSection('home', 'video_showcase');
      return (
        <div className="space-y-4">
          {defaults && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-700">
                  <p className="font-medium text-blue-800">Current Defaults</p>
                  <p>Title: "{defaults.title}"</p>
                  <p>Subtitle: "{defaults.subtitle}"</p>
                  <p>Video: OML34 12km CHDD Project (YouTube)</p>
                </div>
              </div>
            </div>
          )}
          <div className="space-y-2">
            <Label>Section Title</Label>
            <Input
              value={section.content.title || ''}
              onChange={(e) => updateSectionContent(section.id, 'title', e.target.value)}
              placeholder="OML34 Continuous HDD - 12km Record"
            />
          </div>
          <div className="space-y-2">
            <Label>Section Subtitle</Label>
            <Input
              value={section.content.subtitle || ''}
              onChange={(e) => updateSectionContent(section.id, 'subtitle', e.target.value)}
              placeholder="Featured Project"
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={section.content.description || ''}
              onChange={(e) => updateSectionContent(section.id, 'description', e.target.value)}
              placeholder="Project description..."
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label>YouTube Video URL</Label>
            <Input
              value={section.content.videoUrl || ''}
              onChange={(e) => updateSectionContent(section.id, 'videoUrl', e.target.value)}
              placeholder="https://www.youtube.com/watch?v=... or https://www.youtube.com/embed/..."
            />
            <p className="text-xs text-muted-foreground">
              Current: YouTube embed for OML34 project (uv_ozmjIo-E)
            </p>
          </div>
          {section.content.videoUrl && (
            <div className="aspect-video rounded-lg overflow-hidden bg-muted">
              <iframe
                src={section.content.videoUrl.includes('embed/') 
                  ? section.content.videoUrl 
                  : `https://www.youtube.com/embed/${section.content.videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)?.[1] || ''}`
                }
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          )}
        </div>
      );
    }

    // ===== TESTIMONIALS PAGE EDITORS =====
    if (section.page_slug === 'testimonials' && section.section_key === 'client_quotes') {
      const savedTestimonials = section.content.testimonials || [];
      const displayTestimonials = savedTestimonials.length > 0 ? savedTestimonials : defaultTestimonials;
      const isUsingDefaults = savedTestimonials.length === 0;
      
      const initializeWithDefaults = () => {
        updateSectionContent(section.id, 'testimonials', defaultTestimonials);
        toast.success('Loaded testimonials for editing');
      };
      
      const addTestimonial = () => {
        const current = section.content.testimonials || [];
        updateSectionContent(section.id, 'testimonials', [...current, { quote: '', author: '', company: '', project: '', rating: 5 }]);
      };
      
      const updateTestimonial = (index: number, field: string, value: string | number) => {
        const current = [...(section.content.testimonials || [])];
        current[index] = { ...current[index], [field]: value };
        updateSectionContent(section.id, 'testimonials', current);
      };
      
      const removeTestimonial = (index: number) => {
        const current = [...(section.content.testimonials || [])];
        current.splice(index, 1);
        updateSectionContent(section.id, 'testimonials', current);
      };
      
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <p className="text-sm text-muted-foreground">
              {isUsingDefaults ? `Showing ${displayTestimonials.length} default testimonials. Click "Edit" to customize.` : `${displayTestimonials.length} testimonials configured`}
            </p>
            <div className="flex gap-2">
              {isUsingDefaults ? (
                <Button size="sm" onClick={initializeWithDefaults}>
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit Testimonials
                </Button>
              ) : (
                <>
                  <Button size="sm" variant="outline" onClick={() => updateSectionContent(section.id, 'testimonials', [])}>
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Reset to Defaults
                  </Button>
                  <Button size="sm" onClick={addTestimonial}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Testimonial
                  </Button>
                </>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            {displayTestimonials.map((testimonial: any, index: number) => (
              <Card key={index} className={`p-4 ${isUsingDefaults ? 'bg-blue-50/50 border-blue-200' : ''}`}>
                <div className="flex items-start gap-3">
                  <Quote className="h-8 w-8 text-primary/30 flex-shrink-0" />
                  <div className="flex-1">
                    {isUsingDefaults ? (
                      <>
                        <div className="flex gap-1 mb-2">
                          {[...Array(testimonial.rating || 5)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                          ))}
                        </div>
                        <p className="text-sm italic text-muted-foreground mb-3">"{testimonial.quote}"</p>
                        <div className="text-sm">
                          <p className="font-medium">{testimonial.author}</p>
                          <p className="text-primary text-xs">{testimonial.company}</p>
                          <p className="text-muted-foreground text-xs">{testimonial.project}</p>
                        </div>
                      </>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Label className="text-xs">Rating:</Label>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 cursor-pointer ${star <= (testimonial.rating || 5) ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
                              onClick={() => updateTestimonial(index, 'rating', star)}
                            />
                          ))}
                        </div>
                        <Textarea
                          value={testimonial.quote || ''}
                          onChange={(e) => updateTestimonial(index, 'quote', e.target.value)}
                          placeholder="Client testimonial quote..."
                          rows={3}
                          className="text-sm"
                        />
                        <div className="grid gap-2 md:grid-cols-3">
                          <Input
                            value={testimonial.author || ''}
                            onChange={(e) => updateTestimonial(index, 'author', e.target.value)}
                            placeholder="Author name/title"
                            className="h-8 text-sm"
                          />
                          <Input
                            value={testimonial.company || ''}
                            onChange={(e) => updateTestimonial(index, 'company', e.target.value)}
                            placeholder="Company name"
                            className="h-8 text-sm"
                          />
                          <Input
                            value={testimonial.project || ''}
                            onChange={(e) => updateTestimonial(index, 'project', e.target.value)}
                            placeholder="Project name"
                            className="h-8 text-sm"
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => removeTestimonial(index)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Remove
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      );
    }
    
    // Testimonials Stats section
    if (section.page_slug === 'testimonials' && section.section_key === 'stats') {
      const savedStats = section.content.stats || [];
      const displayStats = savedStats.length > 0 ? savedStats : defaultTestimonialsStats;
      const isUsingDefaults = savedStats.length === 0;
      
      const initializeWithDefaults = () => {
        updateSectionContent(section.id, 'stats', defaultTestimonialsStats);
        toast.success('Loaded stats for editing');
      };
      
      const addStat = () => {
        const current = section.content.stats || [];
        updateSectionContent(section.id, 'stats', [...current, { value: '', label: '' }]);
      };
      
      const updateStat = (index: number, field: 'value' | 'label', value: string) => {
        const current = [...(section.content.stats || [])];
        current[index] = { ...current[index], [field]: value };
        updateSectionContent(section.id, 'stats', current);
      };
      
      const removeStat = (index: number) => {
        const current = [...(section.content.stats || [])];
        current.splice(index, 1);
        updateSectionContent(section.id, 'stats', current);
      };
      
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <p className="text-sm text-muted-foreground">
              {isUsingDefaults ? 'Showing default stats. Click "Edit" to customize.' : `${displayStats.length} stats configured`}
            </p>
            <div className="flex gap-2">
              {isUsingDefaults ? (
                <Button size="sm" onClick={initializeWithDefaults}>
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit Stats
                </Button>
              ) : (
                <>
                  <Button size="sm" variant="outline" onClick={() => updateSectionContent(section.id, 'stats', [])}>
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Reset
                  </Button>
                  <Button size="sm" onClick={addStat}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Stat
                  </Button>
                </>
              )}
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-4">
            {displayStats.map((stat: any, index: number) => (
              <Card key={index} className={`p-4 text-center ${isUsingDefaults ? 'bg-blue-50/50 border-blue-200' : ''}`}>
                {isUsingDefaults ? (
                  <>
                    <p className="text-2xl font-bold text-primary">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </>
                ) : (
                  <div className="space-y-2">
                    <Input
                      value={stat.value || ''}
                      onChange={(e) => updateStat(index, 'value', e.target.value)}
                      placeholder="30+"
                      className="h-8 text-center font-bold"
                    />
                    <Input
                      value={stat.label || ''}
                      onChange={(e) => updateStat(index, 'label', e.target.value)}
                      placeholder="Years Experience"
                      className="h-8 text-center text-sm"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive w-full"
                      onClick={() => removeStat(index)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      );
    }

    // Default generic editor for intro, overview, policy, etc.
    const defaults = getDefaultForSection(section.page_slug, section.section_key);
    const capabilityImage = defaultCapabilityImages[section.section_key];
    
    return (
      <div className="space-y-4">
        {/* Show current defaults info */}
        {defaults && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-700">
                <p className="font-medium text-blue-800">Current Codebase Content for "{defaults.sectionName}"</p>
                {defaults.title && <p>Title: "{defaults.title}"</p>}
                {defaults.subtitle && <p>Subtitle: "{defaults.subtitle}"</p>}
                {defaults.description && <p className="truncate max-w-xl">Description: "{defaults.description}"</p>}
                <Link 
                  to={defaults.route} 
                  target="_blank"
                  className="text-primary hover:underline inline-flex items-center gap-1 mt-1"
                >
                  View on page <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        )}
        
        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            value={section.content.title || ''}
            onChange={(e) => updateSectionContent(section.id, 'title', e.target.value)}
            placeholder={defaults?.title || "Section title..."}
          />
        </div>
        {defaults?.subtitle && (
          <div className="space-y-2">
            <Label>Subtitle</Label>
            <Input
              value={section.content.subtitle || ''}
              onChange={(e) => updateSectionContent(section.id, 'subtitle', e.target.value)}
              placeholder={defaults.subtitle}
            />
          </div>
        )}
        <div className="space-y-2">
          <Label>Description / Content</Label>
          <Textarea
            value={section.content.description || ''}
            onChange={(e) => updateSectionContent(section.id, 'description', e.target.value)}
            placeholder={defaults?.description || "Section content..."}
            rows={6}
          />
        </div>
        
        {/* Section Image - show default if available */}
        {(defaults?.image || capabilityImage || section.content.image) && (
          <CurrentAssetPreview
            type="image"
            currentUrl={section.content.image}
            defaultUrl={defaults?.image || capabilityImage?.image}
            defaultDescription={capabilityImage?.description || `Default image for ${defaults?.sectionName || section.section_key}`}
            pageRoute={defaults?.route}
            isUploading={uploadingImage === `${section.id}-image`}
            onUpload={(file) => handleImageUpload(section.id, 'image', file)}
            onUrlChange={(url) => updateSectionContent(section.id, 'image', url)}
            onReset={defaults?.image || capabilityImage ? () => updateSectionContent(section.id, 'image', '') : undefined}
          />
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const currentPageSections = sections.filter((s) => s.page_slug === activeTab);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Page Editor</h1>
          <p className="text-muted-foreground mt-1">
            Edit content, images, and videos across all website pages. Drag sections to reorder.
          </p>
        </div>
        <div className="flex gap-3">
          {/* Live Preview Toggle */}
          <Button 
            variant="outline" 
            onClick={() => setShowPreview(!showPreview)}
          >
            <Monitor className="h-4 w-4 mr-2" />
            {showPreview ? 'Hide' : 'Show'} Preview
          </Button>
          
          {/* Preview Button */}
          <Link 
            to={pageRoutes[activeTab] || '/'} 
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Open {pageNames[activeTab]}
            </Button>
          </Link>
          
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save All Changes
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search pages and sections..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
            onClick={() => setSearchQuery('')}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex-wrap h-auto gap-1">
          {filteredPages.map((page) => (
            <TabsTrigger key={page} value={page} className="capitalize">
              {pageNames[page] || page}
            </TabsTrigger>
          ))}
        </TabsList>

        {filteredPages.map((page) => (
          <TabsContent key={page} value={page} className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{pageNames[page] || page} Sections</CardTitle>
                    <CardDescription>
                      Edit content for each section. Drag <GripVertical className="h-3 w-3 inline" /> to reorder.
                    </CardDescription>
                  </div>
                  <Link 
                    to={pageRoutes[page] || '/'} 
                    target="_blank"
                    className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                  >
                    View Live Page <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                {filteredCurrentPageSections.length === 0 && searchQuery ? (
                  <div className="py-8 text-center text-muted-foreground">
                    <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No sections match "{searchQuery}"</p>
                    <Button variant="link" size="sm" onClick={() => setSearchQuery('')}>
                      Clear search
                    </Button>
                  </div>
                ) : (
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      items={filteredCurrentPageSections.map(s => s.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <Accordion type="multiple" className="w-full">
                        {filteredCurrentPageSections.map((section) => {
                          const sectionDef = allPageSections.find(
                            (d) => d.page_slug === section.page_slug && d.section_key === section.section_key
                          );
                          
                          return (
                            <SortableSectionItem
                              key={section.id}
                              section={section}
                              sectionDef={sectionDef}
                            >
                              {renderSectionEditor(section)}
                            </SortableSectionItem>
                          );
                        })}
                      </Accordion>
                    </SortableContext>
                  </DndContext>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Live Preview Panel */}
      <LivePreviewPanel
        pageRoute={pageRoutes[activeTab] || '/'}
        pageName={pageNames[activeTab] || activeTab}
        isVisible={showPreview}
        onToggle={() => setShowPreview(!showPreview)}
      />
    </div>
  );
};

export default PagesEditor;
