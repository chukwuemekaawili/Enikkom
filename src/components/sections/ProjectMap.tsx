import { motion } from "framer-motion";
import { MapPin, Calendar, Ruler, Building2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { EnhancedImage } from "@/components/ui/enhanced-image";
import { getProjectImage } from "@/content/projectImageSelections";

interface ProjectLocation {
  id: string;
  name: string;
  location: string;
  type: string;
  coordinates: { x: number; y: number };
  description: string;
  client: string;
  year: string;
  metrics: string;
  image?: string;
  href?: string;
}

const projectLocations: ProjectLocation[] = [
  {
    id: "1",
    name: "OML34 — 10\" × 12km CHDD",
    location: "Utorogun, Delta State",
    type: "HDD",
    coordinates: { x: 44, y: 72 },
    description: "Nigeria's longest Continuous HDD — 12km of 10\" pipeline in a single operation.",
    client: "NPDC / ND Western",
    year: "2021",
    metrics: "10\" × 12km — Nigeria Record",
    image: getProjectImage("oml34-chdd", "projectMap"),
    href: "/projects/oml34-chdd"
  },
  {
    id: "2",
    name: "Atlas Cove–Mosimi — 16\" × 3.1km",
    location: "Arepo, Ogun State",
    type: "HDD",
    coordinates: { x: 26, y: 50 },
    description: "Africa's longest single HDD drill — emergency reconstruction of petroleum products pipeline.",
    client: "NNPC / PPMC",
    year: "2016",
    metrics: "16\" × 3.1km — Africa Record",
    image: getProjectImage("atlas-cove-mosimi", "projectMap"),
    href: "/projects/atlas-cove-mosimi"
  },
  {
    id: "3",
    name: "Otumara-Escravos Bundled HDD",
    location: "Delta State",
    type: "HDD",
    coordinates: { x: 40, y: 74 },
    description: "Africa's longest bundled HDD — 12\" & 3\" pipelines across 2.78km of Escravos River.",
    client: "Saipem / SPDC",
    year: "2016",
    metrics: "2.78km bundled — Africa Record",
    image: getProjectImage("otumara-escravos", "projectMap"),
  },
  {
    id: "4",
    name: "OB3 River Niger — 48\" Direct Pipe",
    location: "River Niger",
    type: "HDD",
    coordinates: { x: 50, y: 70 },
    description: "Landmark 48\" × 1.8km crossing of the River Niger using HDD + Direct Pipe Installation.",
    client: "NPDC",
    year: "2020",
    metrics: "48\" × 1.8km HDD + DPI",
    image: getProjectImage("ob3-river-niger", "projectMap"),
    href: "/projects/ob3-river-niger"
  },
  {
    id: "5",
    name: "Escravos Shore Approach",
    location: "Delta State",
    type: "Shore Approach",
    coordinates: { x: 38, y: 76 },
    description: "1.8km shore crossing pipeline connecting offshore infrastructure to onshore facilities.",
    client: "ECL / SPDC",
    year: "2021",
    metrics: "1.8km shore crossing",
    image: getProjectImage("escravos-shore-approach", "projectMap"),
  },
  {
    id: "6",
    name: "First HDD Crossing — River Niger",
    location: "River Niger",
    type: "HDD",
    coordinates: { x: 48, y: 45 },
    description: "Nigeria's historic first Horizontal Directional Drilling river crossing.",
    client: "NNPC",
    year: "2003",
    metrics: "Pioneer HDD in Nigeria",
  },
  {
    id: "7",
    name: "Gbaran Phase 3b — 16\" EPC",
    location: "Bayelsa State",
    type: "Pipeline",
    coordinates: { x: 52, y: 78 },
    description: "EPC pipeline construction — 8km & 10km of 16\" pipeline for Gbaran–UZU CPF upgrade.",
    client: "SPDC",
    year: "2025",
    metrics: "18km total pipeline",
  },
  {
    id: "8",
    name: "Calabar Gas Transmission — 24\" × 21.5km",
    location: "Cross River State",
    type: "Pipeline",
    coordinates: { x: 70, y: 74 },
    description: "Gas transmission pipeline with multiple HDD river crossings for power generation supply.",
    client: "Zakhem / NDPHC",
    year: "2015",
    metrics: "24\" × 21.5km pipeline",
  },
  {
    id: "9",
    name: "NIPCO Gas Distribution — 50km",
    location: "Multiple Locations",
    type: "Pipeline",
    coordinates: { x: 43, y: 64 },
    description: "50km multi-diameter urban gas distribution network with extensive HDD crossings.",
    client: "NIPCO",
    year: "2009",
    metrics: "50km network",
    image: getProjectImage("nipco-gas-distribution", "projectMap"),
  },
  {
    id: "10",
    name: "OML34 Dredging & Cofferdam",
    location: "Delta State",
    type: "Marine",
    coordinates: { x: 45, y: 73 },
    description: "Cofferdam installation and dredging in support of the OML34 CHDD project.",
    client: "NPDC",
    year: "2021",
    metrics: "Cofferdam & swamp dredging",
  },
];

const typeColors: Record<string, string> = {
  HDD: "bg-primary",
  Pipeline: "bg-emerald-500",
  Marine: "bg-blue-500",
  "Shore Approach": "bg-amber-500",
};

const typeBorderColors: Record<string, string> = {
  HDD: "border-primary",
  Pipeline: "border-emerald-500",
  Marine: "border-blue-500",
  "Shore Approach": "border-amber-500",
};

export function ProjectMap() {
  const [activeProject, setActiveProject] = useState<ProjectLocation | null>(null);

  return (
    <section className="py-14 md:py-20 bg-charcoal">
      <div className="container-wide max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center mb-8"
        >
          <p className="text-xs font-medium uppercase tracking-widest text-primary/80 mb-2">Nationwide Coverage</p>
          <h2 className="text-white text-xl md:text-2xl font-semibold mb-2">Project Locations</h2>
          <p className="text-white/50 text-sm max-w-lg mx-auto">
            Operating across Nigeria's key oil & gas regions.
          </p>
        </motion.div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-5 mb-8">
          {Object.entries(typeColors).map(([type, color]) => (
            <div key={type} className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
              <span className="text-white/50 text-xs font-medium">{type}</span>
            </div>
          ))}
        </div>

        {/* Map Container */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.35 }}
          className="relative max-w-2xl mx-auto"
        >
          {/* Nigeria Map SVG */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-auto"
            style={{ minHeight: "320px", maxHeight: "380px" }}
          >
            {/* Simplified Nigeria outline */}
            <path
              d="M15,35 L25,25 L35,22 L45,20 L55,18 L65,20 L75,25 L82,35 L85,45 L85,55 L82,65 L78,75 L70,82 L60,88 L50,90 L40,88 L32,85 L25,80 L20,72 L18,62 L15,52 L12,42 Z"
              fill="hsl(var(--muted) / 0.15)"
              stroke="hsl(var(--primary) / 0.4)"
              strokeWidth="0.4"
            />
            
            {/* Niger River stylized */}
            <path
              d="M50,25 Q55,35 52,45 Q48,55 50,65 Q52,75 55,85"
              fill="none"
              stroke="hsl(var(--primary) / 0.25)"
              strokeWidth="0.6"
              strokeDasharray="2,2"
            />
            
            {/* Benue River */}
            <path
              d="M70,50 Q60,55 52,55"
              fill="none"
              stroke="hsl(var(--primary) / 0.25)"
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />

            {/* Niger Delta region highlight */}
            <ellipse
              cx="52"
              cy="80"
              rx="16"
              ry="10"
              fill="hsl(var(--primary) / 0.08)"
              stroke="hsl(var(--primary) / 0.2)"
              strokeWidth="0.25"
            />
          </svg>

          {/* Project Markers */}
          {projectLocations.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, type: "spring", stiffness: 300 }}
              className="absolute cursor-pointer group"
              style={{
                left: `${project.coordinates.x}%`,
                top: `${project.coordinates.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              onMouseEnter={() => setActiveProject(project)}
              onMouseLeave={() => setActiveProject(null)}
            >
              {/* Pulse effect - smaller */}
              <div 
                className={`absolute inset-0 rounded-full ${typeColors[project.type]} animate-ping opacity-20`}
                style={{ width: "16px", height: "16px", marginLeft: "-2px", marginTop: "-2px" }}
              />
              
              {/* Marker - smaller */}
              <div 
                className={`relative z-10 w-3 h-3 rounded-full ${typeColors[project.type]} border border-white shadow-md group-hover:scale-125 transition-transform duration-150`}
              />
              
              {/* Tooltip - Compact */}
              {activeProject?.id === project.id && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.15 }}
                  className={`absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-card text-card-foreground rounded-lg shadow-xl overflow-hidden border ${typeBorderColors[project.type]}`}
                >
                  {project.image && (
                    <div className="relative h-20 overflow-hidden">
                      <EnhancedImage
                        src={project.image}
                        alt={project.name}
                        wrapperClassName="h-full w-full"
                        className="h-full w-full"
                        hoverZoom
                        tone="natural"
                        fallbackLabel={project.name}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className={`absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded text-[9px] text-white ${typeColors[project.type]}`}>
                        {project.type}
                      </div>
                    </div>
                  )}
                  
                  {/* Project Info */}
                  <div className="p-2.5">
                    {!project.image && (
                      <div className={`mb-2 inline-flex rounded px-1.5 py-0.5 text-[9px] text-white ${typeColors[project.type]}`}>
                        {project.type}
                      </div>
                    )}
                    <h4 className="font-semibold text-xs mb-0.5">{project.name}</h4>
                    <p className="text-[10px] text-muted-foreground mb-2 line-clamp-1">{project.description}</p>
                    
                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                      <div className="flex items-center gap-1">
                        <Building2 className="h-3 w-3 text-primary" />
                        <span className="text-muted-foreground truncate">{project.client}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-primary" />
                        <span className="text-muted-foreground">{project.year}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-primary" />
                        <span className="text-muted-foreground truncate">{project.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Ruler className="h-3 w-3 text-primary" />
                        <span className="text-muted-foreground truncate">{project.metrics}</span>
                      </div>
                    </div>
                    
                    {project.href && (
                      <Link 
                        to={project.href}
                        className="mt-2 block text-center text-[10px] font-medium text-primary hover:underline"
                      >
                        View Details →
                      </Link>
                    )}
                  </div>
                  
                  {/* Arrow pointer */}
                  <div className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-card rotate-45 border-r border-b ${typeBorderColors[project.type]}`} />
                </motion.div>
              )}
            </motion.div>
          ))}

          {/* Key cities labels */}
          <div className="absolute text-white/40 text-[11px] font-medium" style={{ left: "26%", top: "50%" }}>Lagos</div>
          <div className="absolute text-white/40 text-[11px] font-medium" style={{ left: "55%", top: "74%" }}>Port Harcourt</div>
          <div className="absolute text-white/40 text-[11px] font-medium" style={{ left: "38%", top: "68%" }}>Warri</div>
          <div className="absolute text-white/40 text-[11px] font-medium" style={{ left: "48%", top: "38%" }}>Abuja</div>
          <div className="absolute text-white/40 text-[11px] font-medium" style={{ left: "60%", top: "85%" }}>Calabar</div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.25, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8 max-w-xl mx-auto"
        >
          <div className="text-center py-3 px-2 rounded-md bg-white/5 border border-white/10">
            <p className="text-lg md:text-xl font-semibold text-white">10+</p>
            <p className="text-[10px] text-white/50">States</p>
          </div>
          <div className="text-center py-3 px-2 rounded-md bg-white/5 border border-white/10">
            <p className="text-lg md:text-xl font-semibold text-white">50+</p>
            <p className="text-[10px] text-white/50">Projects</p>
          </div>
          <div className="text-center py-3 px-2 rounded-md bg-white/5 border border-white/10">
            <p className="text-lg md:text-xl font-semibold text-white">120+</p>
            <p className="text-[10px] text-white/50">KM Installed</p>
          </div>
          <div className="text-center py-3 px-2 rounded-md bg-white/5 border border-white/10">
            <p className="text-lg md:text-xl font-semibold text-white">20+</p>
            <p className="text-[10px] text-white/50">Years</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
