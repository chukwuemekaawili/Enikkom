import { motion } from "framer-motion";
import { MapPin, Calendar, Ruler, Building2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

// Import project images
import hddDrilling from "@/assets/capabilities/hdd-drilling.jpg";
import pipelineConstruction from "@/assets/capabilities/pipeline-construction.jpg";
import dredgingMarine from "@/assets/capabilities/dredging-marine.jpg";
import jettyConstruction from "@/assets/capabilities/jetty-construction.jpg";

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
  image: string;
  href?: string;
}

const projectLocations: ProjectLocation[] = [
  {
    id: "1",
    name: "Gbaran Phase 3b – UZU CPF",
    location: "Bayelsa State",
    type: "Pipeline",
    coordinates: { x: 52, y: 78 },
    description: "8km & 10km x 16\" pipeline EPC",
    client: "Shell",
    year: "2024-2025",
    metrics: "18km total pipeline",
    image: pipelineConstruction,
    href: "/projects/gbaran-phase-3b"
  },
  {
    id: "2",
    name: "Nun River HDD Crossing",
    location: "Bayelsa State",
    type: "HDD",
    coordinates: { x: 48, y: 82 },
    description: "16\" & 6\" dual HDD crossing under Nun River",
    client: "Chevron",
    year: "2024",
    metrics: "1.2km crossing length",
    image: hddDrilling,
    href: "/projects/nun-river-crossing"
  },
  {
    id: "3",
    name: "Lagos Port Terminal",
    location: "Lagos",
    type: "Marine",
    coordinates: { x: 28, y: 52 },
    description: "500m quay wall construction",
    client: "NLNG",
    year: "2022",
    metrics: "500m quay wall",
    image: jettyConstruction,
    href: "/projects/lagos-port-terminal"
  },
  {
    id: "4",
    name: "Escravos Shore Approach",
    location: "Delta State",
    type: "Shore Approach",
    coordinates: { x: 45, y: 72 },
    description: "1.8km shore crossing installation",
    client: "Shell",
    year: "2021",
    metrics: "1.8km shore crossing",
    image: pipelineConstruction,
    href: "/projects/escravos-shore-approach"
  },
  {
    id: "5",
    name: "Bonny Island Flowline",
    location: "Rivers State",
    type: "Pipeline",
    coordinates: { x: 58, y: 76 },
    description: "12km flowline construction",
    client: "Chevron",
    year: "2021",
    metrics: "12km x 14\" flowline",
    image: pipelineConstruction,
    href: "/projects/bonny-flowline"
  },
  {
    id: "6",
    name: "Trans-Niger Pipeline",
    location: "Niger State",
    type: "HDD",
    coordinates: { x: 48, y: 45 },
    description: "Historic River Niger HDD crossing - first in Nigeria",
    client: "NNPC",
    year: "2003",
    metrics: "1.2km HDD crossing",
    image: hddDrilling,
  },
  {
    id: "7",
    name: "Qua Iboe Terminal",
    location: "Akwa Ibom",
    type: "Marine",
    coordinates: { x: 62, y: 80 },
    description: "Terminal upgrade and jetty rehabilitation works",
    client: "ExxonMobil",
    year: "2021",
    metrics: "Terminal rehabilitation",
    image: jettyConstruction,
  },
  {
    id: "8",
    name: "Forcados Terminal",
    location: "Delta State",
    type: "Pipeline",
    coordinates: { x: 43, y: 75 },
    description: "6km x 20\" trunk line installation",
    client: "Shell",
    year: "2020",
    metrics: "6km pipeline",
    image: pipelineConstruction,
  },
  {
    id: "9",
    name: "OML 34 Pipeline",
    location: "Delta State",
    type: "Pipeline",
    coordinates: { x: 47, y: 73 },
    description: "10\" x 12km pipeline construction",
    client: "NNPC/NPDC",
    year: "2023",
    metrics: "12km pipeline",
    image: pipelineConstruction,
  },
  {
    id: "10",
    name: "Bonny Terminal Dredging",
    location: "Rivers State",
    type: "Marine",
    coordinates: { x: 60, y: 82 },
    description: "Channel deepening and maintenance dredging",
    client: "NLNG",
    year: "2018",
    metrics: "Channel deepening",
    image: dredgingMarine,
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
                  {/* Project Image */}
                  <div className="relative h-20 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className={`absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded text-[9px] text-white ${typeColors[project.type]}`}>
                      {project.type}
                    </div>
                  </div>
                  
                  {/* Project Info */}
                  <div className="p-2.5">
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
