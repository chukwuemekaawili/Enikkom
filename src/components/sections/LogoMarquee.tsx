import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { EnhancedImage } from "@/components/ui/enhanced-image";
import { approvedClientBrands, approvedStrategicPartners } from "@/content/brandRegistry";

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
  const sectionBg = isDark ? "var(--enk-navy)" : "var(--enk-bg-muted)";
  const fadeColor = isDark ? "var(--enk-navy)" : "var(--enk-bg-muted)";
  const textClass = isDark ? "text-[var(--enk-on-dark)]" : "text-[var(--enk-ink)]";
  const mutedClass = isDark ? "text-[var(--enk-on-dark-muted)]" : "text-[var(--enk-steel)]";

  // Duplicate logos for seamless loop
  const duplicatedClients = [...approvedClientBrands, ...approvedClientBrands];

  return (
    <section className="enk-section overflow-hidden" style={{ backgroundColor: sectionBg }}>
      <div className="enk-container">
        {showTitle && (
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className={`enk-kicker justify-center ${isDark ? "enk-kicker--on-dark" : ""}`}>Our Clients</p>
            <h2 className={`enk-display mt-4 text-[clamp(1.6rem,3vw,2.2rem)] ${textClass}`}>
              Trusted By Industry Leaders
            </h2>
            <p className={`mx-auto mt-4 max-w-lg text-[15px] leading-relaxed ${mutedClass}`}>
              Partnering with Nigeria's leading oil &amp; gas operators for over 30 years.
            </p>
          </div>
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
          style={{ background: `linear-gradient(to right, ${fadeColor} 0%, transparent 100%)` }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-20 md:w-32 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to left, ${fadeColor} 0%, transparent 100%)` }}
        />

        {/* Scrolling Track */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6 md:gap-8"
            animate={prefersReducedMotion || isPaused ? { x: 0 } : { x: ["0%", "-50%"] }}
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
                    <EnhancedImage
                      src={client.logoSrc}
                      alt={client.name}
                      wrapperClassName={`h-full w-full bg-transparent ${client.imageWrapperClassName || ""}`}
                      className={`h-full w-full ${client.imageClassName || ""}`}
                      fit="contain"
                      tone="logo"
                      shimmer={false}
                      sizes="120px"
                    />
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
               {approvedClientBrands.map((client) => {
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
                      <EnhancedImage
                        src={client.logoSrc}
                        alt={client.name}
                        wrapperClassName={`h-full w-full bg-transparent ${client.imageWrapperClassName || ""}`}
                        className={`h-full w-full ${client.imageClassName || ""}`}
                        fit="contain"
                        tone="logo"
                        shimmer={false}
                        sizes="120px"
                      />
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
           {approvedStrategicPartners.map((partner) => (
            <div
              key={partner.id}
              className={`flex items-center gap-3 px-5 py-2.5 rounded-xl border ${
                isDark ? "bg-white/5 border-white/10" : "bg-white border-border/50"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden ${
                  partner.logoSrc
                    ? "bg-white px-1"
                    : isDark
                      ? "bg-primary/20"
                      : "bg-primary/10"
                }`}
              >
                {partner.logoSrc ? (
                  <EnhancedImage
                    src={partner.logoSrc}
                    alt={partner.name}
                    wrapperClassName={`h-full w-full bg-transparent ${partner.imageWrapperClassName || ""}`}
                    className={`h-full w-full ${partner.imageClassName || ""}`}
                    fit="contain"
                    tone="logo"
                    shimmer={false}
                    sizes="64px"
                  />
                ) : (
                  <span className="text-primary font-bold text-xs">{partner.badge}</span>
                )}
              </div>
              <span className={`text-[13px] font-semibold ${textClass}`}>{partner.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
