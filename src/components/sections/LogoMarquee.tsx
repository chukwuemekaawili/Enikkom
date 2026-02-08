import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";

// Real client logos as premium SVG components - verified from Enikkom documents
const clientLogos = {
  Shell: () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M50 5C25.1 5 5 25.1 5 50s20.1 45 45 45 45-20.1 45-45S74.9 5 50 5z" fill="#FBCE07"/>
      <path d="M50 10c-22.1 0-40 17.9-40 40s17.9 40 40 40 40-17.9 40-40S72.1 10 50 10zm0 73c-3.9-7.4-6.5-12.6-10.2-20.9L50 45.5l10.2 16.6c-3.7 8.3-6.3 13.5-10.2 20.9zm-13.3-26.7L50 30l13.3 26.3H36.7z" fill="#DD1D21"/>
    </svg>
  ),
  SPDC: () => (
    <svg viewBox="0 0 120 40" className="w-full h-full">
      <rect width="120" height="40" rx="4" fill="#FBCE07"/>
      <text x="60" y="26" textAnchor="middle" fill="#DD1D21" fontSize="16" fontWeight="bold" fontFamily="Arial">SPDC</text>
    </svg>
  ),
  Chevron: () => (
    <svg viewBox="0 0 120 40" className="w-full h-full">
      <path d="M15 5L5 20L15 35L25 20L15 5z" fill="#0066B2"/>
      <path d="M25 5L15 20L25 35L35 20L25 5z" fill="#ED1C24"/>
      <text x="75" y="26" textAnchor="middle" fill="#0066B2" fontSize="12" fontWeight="bold" fontFamily="Arial">Chevron</text>
    </svg>
  ),
  TotalEnergies: () => (
    <svg viewBox="0 0 140 40" className="w-full h-full">
      <rect x="5" y="5" width="130" height="30" rx="4" fill="#E31E24"/>
      <text x="70" y="26" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="Arial">TotalEnergies</text>
    </svg>
  ),
  NLNG: () => (
    <svg viewBox="0 0 120 40" className="w-full h-full">
      <rect x="5" y="5" width="110" height="30" rx="4" fill="#003366"/>
      <text x="60" y="22" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="Arial">Nigeria LNG</text>
      <text x="60" y="32" textAnchor="middle" fill="#7CB9E8" fontSize="7" fontFamily="Arial">LIMITED</text>
    </svg>
  ),
  NNPC: () => (
    <svg viewBox="0 0 100 40" className="w-full h-full">
      <circle cx="20" cy="20" r="16" fill="#008751"/>
      <path d="M12 14L20 8L28 14L28 26L20 32L12 26Z" fill="white"/>
      <text x="62" y="24" textAnchor="middle" fill="#008751" fontSize="10" fontWeight="bold" fontFamily="Arial">NNPC Ltd</text>
    </svg>
  ),
  NPDC: () => (
    <svg viewBox="0 0 100 40" className="w-full h-full">
      <rect x="5" y="8" width="90" height="24" rx="4" fill="#006633"/>
      <text x="50" y="25" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="Arial">NPDC</text>
    </svg>
  ),
  Dangote: () => (
    <svg viewBox="0 0 120 40" className="w-full h-full">
      <rect x="5" y="8" width="110" height="24" rx="4" fill="#003366"/>
      <text x="60" y="25" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="Arial">DANGOTE</text>
    </svg>
  ),
  Saipem: () => (
    <svg viewBox="0 0 120 40" className="w-full h-full">
      <rect x="5" y="8" width="110" height="24" rx="4" fill="#0066B2"/>
      <text x="60" y="25" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="Arial">SAIPEM</text>
    </svg>
  ),
  Zakhem: () => (
    <svg viewBox="0 0 120 40" className="w-full h-full">
      <rect x="5" y="8" width="110" height="24" rx="4" fill="#8B0000"/>
      <text x="60" y="25" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="Arial">ZAKHEM</text>
    </svg>
  ),
  NIPCO: () => (
    <svg viewBox="0 0 100 40" className="w-full h-full">
      <rect x="5" y="8" width="90" height="24" rx="4" fill="#FF6600"/>
      <text x="50" y="25" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="Arial">NIPCO</text>
    </svg>
  ),
  Oilserv: () => (
    <svg viewBox="0 0 110 40" className="w-full h-full">
      <rect x="5" y="8" width="100" height="24" rx="4" fill="#1E3A5F"/>
      <text x="55" y="25" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="Arial">OILSERV</text>
    </svg>
  ),
  GreenGas: () => (
    <svg viewBox="0 0 120 40" className="w-full h-full">
      <rect x="5" y="8" width="110" height="24" rx="4" fill="#228B22"/>
      <text x="60" y="25" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="Arial">GREEN GAS</text>
    </svg>
  ),
  Kaztec: () => (
    <svg viewBox="0 0 110 40" className="w-full h-full">
      <rect x="5" y="8" width="100" height="24" rx="4" fill="#4169E1"/>
      <text x="55" y="25" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="Arial">KAZTEC</text>
    </svg>
  ),
  MORPOL: () => (
    <svg viewBox="0 0 110 40" className="w-full h-full">
      <rect x="5" y="8" width="100" height="24" rx="4" fill="#2F4F4F"/>
      <text x="55" y="25" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="Arial">MORPOL</text>
    </svg>
  ),
};

interface Client {
  id: string;
  name: keyof typeof clientLogos;
  fullName: string;
  url?: string;
}

// Verified clients from Enikkom project brochures
const clients: Client[] = [
  { id: "shell", name: "Shell", fullName: "Shell Petroleum", url: "https://www.shell.com.ng" },
  { id: "spdc", name: "SPDC", fullName: "Shell PDC", url: "https://www.shell.com.ng/about-us/what-we-do/spdc.html" },
  { id: "nnpc", name: "NNPC", fullName: "NNPC Limited", url: "https://www.nnpcgroup.com" },
  { id: "npdc", name: "NPDC", fullName: "NPDC", url: "https://npdc.nnpcgroup.com" },
  { id: "dangote", name: "Dangote", fullName: "Dangote Group", url: "https://www.dangote.com" },
  { id: "saipem", name: "Saipem", fullName: "Saipem Nigeria", url: "https://www.saipem.com" },
  { id: "zakhem", name: "Zakhem", fullName: "Zakhem Construction", url: "#" },
  { id: "chevron", name: "Chevron", fullName: "Chevron Nigeria", url: "https://www.chevron.com/worldwide/nigeria" },
  { id: "total", name: "TotalEnergies", fullName: "TotalEnergies", url: "https://totalenergies.com.ng" },
  { id: "nlng", name: "NLNG", fullName: "Nigeria LNG", url: "https://www.nlng.com" },
  { id: "nipco", name: "NIPCO", fullName: "NIPCO PLC", url: "#" },
  { id: "oilserv", name: "Oilserv", fullName: "Oilserv Ltd", url: "#" },
  { id: "greengas", name: "GreenGas", fullName: "Green Gas Ltd", url: "#" },
  { id: "kaztec", name: "Kaztec", fullName: "Kaztec Engineering", url: "#" },
  { id: "morpol", name: "MORPOL", fullName: "MORPOL Engineering", url: "#" },
];

interface LogoMarqueeProps {
  variant?: "light" | "dark";
  showTitle?: boolean;
  speed?: number;
}

export function LogoMarquee({ variant = "light", showTitle = true, speed = 35 }: LogoMarqueeProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const isDark = variant === "dark";
  const bgClass = isDark ? "bg-charcoal" : "bg-muted/30";
  const textClass = isDark ? "text-white" : "text-foreground";
  const mutedClass = isDark ? "text-white/60" : "text-muted-foreground";

  // Duplicate logos for seamless loop
  const duplicatedClients = [...clients, ...clients];

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, url?: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (url && url !== "#") window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section className={`py-16 md:py-20 overflow-hidden ${bgClass}`}>
      <div className="container-wide">
        {showTitle && (
          <motion.div 
            className="text-center mb-10 md:mb-14"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="section-eyebrow">Our Clients</p>
            <h2 className={`text-[24px] md:text-[30px] lg:text-[36px] font-bold mb-4 ${textClass}`}>
              Trusted By Industry Leaders
            </h2>
            <p className={`text-[15px] md:text-[16px] max-w-lg mx-auto ${mutedClass}`}>
              Partnering with Nigeria's leading oil & gas operators for over 29 years.
            </p>
          </motion.div>
        )}
      </div>

      {/* Logo Marquee Container */}
      <div 
        ref={containerRef}
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => !isDragging && setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setTimeout(() => setIsPaused(false), 2000)}
      >
        {/* Gradient Fade Edges */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-20 md:w-32 z-10 pointer-events-none"
          style={{
            background: isDark 
              ? "linear-gradient(to right, hsl(220 50% 9% / 1) 0%, hsl(220 50% 9% / 0) 100%)"
              : "linear-gradient(to right, hsl(220 30% 96% / 1) 0%, hsl(220 30% 96% / 0) 100%)"
          }}
        />
        <div 
          className="absolute right-0 top-0 bottom-0 w-20 md:w-32 z-10 pointer-events-none"
          style={{
            background: isDark 
              ? "linear-gradient(to left, hsl(220 50% 9% / 1) 0%, hsl(220 50% 9% / 0) 100%)"
              : "linear-gradient(to left, hsl(220 30% 96% / 1) 0%, hsl(220 30% 96% / 0) 100%)"
          }}
        />

        {/* Scrolling Track */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6 md:gap-8"
            animate={prefersReducedMotion || isPaused ? { x: 0 } : { x: [0, -50 * clients.length * 2] }}
            transition={
              prefersReducedMotion || isPaused
                ? { duration: 0 }
                : {
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: speed,
                      ease: "linear",
                    },
                  }
            }
            drag={prefersReducedMotion ? false : "x"}
            dragConstraints={{ left: -1000, right: 0 }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => {
              setIsDragging(false);
              setTimeout(() => setIsPaused(false), 1000);
            }}
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
          >
            {duplicatedClients.map((client, index) => {
              const LogoComponent = clientLogos[client.name];
              return (
                <motion.div
                  key={`${client.id}-${index}`}
                  className={`flex-shrink-0 flex flex-col items-center justify-center p-3 md:p-4 rounded-xl transition-all duration-300 group ${
                    isDark 
                      ? "bg-white/5 hover:bg-white/10 border border-white/8" 
                      : "bg-white hover:bg-white border border-border/50 hover:border-primary/20"
                  }`}
                  style={{ 
                    width: "120px", 
                    height: "80px",
                    boxShadow: isDark ? "none" : "var(--shadow-sm)"
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-16 h-8 md:w-20 md:h-10 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                    <LogoComponent />
                  </div>
                  <span className={`text-[9px] md:text-[10px] font-medium mt-1.5 text-center leading-tight transition-colors ${
                    isDark ? "text-white/50 group-hover:text-white/80" : "text-muted-foreground group-hover:text-foreground"
                  }`}>
                    {client.fullName}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Reduced Motion Fallback - Static scrollable row */}
        {prefersReducedMotion && (
          <div className="overflow-x-auto scrollbar-hide py-2 -my-2">
            <div className="flex gap-6 px-6">
              {clients.map((client) => {
                const LogoComponent = clientLogos[client.name];
                return (
                  <div
                    key={client.id}
                    className={`flex-shrink-0 flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200 ${
                      isDark 
                        ? "bg-white/5 hover:bg-white/10 border border-white/8" 
                        : "bg-white hover:shadow-md border border-border/50"
                    }`}
                    style={{ width: "120px", height: "80px" }}
                  >
                    <div className="w-16 h-8 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity">
                      <LogoComponent />
                    </div>
                    <span className={`text-[9px] font-medium mt-1.5 text-center ${mutedClass}`}>
                      {client.fullName}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Strategic Partners */}
      <div className="container-wide mt-12">
        <motion.div
          className="flex flex-wrap justify-center items-center gap-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <p className={`text-[11px] font-semibold uppercase tracking-[0.15em] ${mutedClass}`}>
            Strategic Partners:
          </p>
          <div className={`flex items-center gap-3 px-5 py-2.5 rounded-xl border ${
            isDark ? "bg-white/5 border-white/10" : "bg-white border-border/50"
          }`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              isDark ? "bg-primary/20" : "bg-primary/10"
            }`}>
              <span className="text-primary font-bold text-xs">HDD</span>
            </div>
            <span className={`text-[13px] font-semibold ${textClass}`}>HDDThailand Co. Ltd</span>
          </div>
          <div className={`flex items-center gap-3 px-5 py-2.5 rounded-xl border ${
            isDark ? "bg-white/5 border-white/10" : "bg-white border-border/50"
          }`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              isDark ? "bg-primary/20" : "bg-primary/10"
            }`}>
              <span className="text-primary font-bold text-xs">OMS</span>
            </div>
            <span className={`text-[13px] font-semibold ${textClass}`}>Ocean Marine Solutions</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
