import { LucideIcon, Shield, Clock, Award, Users } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";
import { motion } from "framer-motion";

interface KPIStat {
  value: number;
  label: string;
  icon?: LucideIcon;
  suffix?: string;
  prefix?: string;
}

interface AnimatedKPIBandProps {
  stats?: KPIStat[];
  variant?: "light" | "dark";
}

const defaultStats: KPIStat[] = [
  { value: 100, label: "KM HDD Installed", icon: Shield, suffix: "+" },
  { value: 500, label: "Workforce Capacity", icon: Users, suffix: "+" },
  { value: 30, label: "Years Experience", icon: Clock, suffix: "+" },
  { value: 0, label: "Lost Time Incidents", icon: Award },
];

function AnimatedStat({ stat, isDark, index }: { stat: KPIStat; isDark: boolean; index: number }) {
  const { count, ref } = useCountUp({ end: stat.value, duration: 2000 });
  const Icon = stat.icon;

  return (
    <motion.div 
      ref={ref} 
      className="text-center group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
    >
      {Icon && (
        <motion.div 
          className={`w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-xl mx-auto mb-3 md:mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
            isDark 
              ? "text-white/80" 
              : "text-primary"
          }`}
          style={{
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'hsl(var(--primary) / 0.1)'
          }}
        >
          <Icon className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />
        </motion.div>
      )}
      <div 
        className={`text-[28px] md:text-[36px] lg:text-[48px] font-bold mb-1.5 md:mb-2 font-heading leading-none ${
          isDark ? "text-white" : "text-foreground"
        }`}
      >
        {stat.prefix}{count}{stat.suffix}
      </div>
      <div className={`text-[10px] md:text-[11px] lg:text-[12px] font-semibold uppercase tracking-[0.08em] md:tracking-[0.1em] ${
        isDark ? "text-white/50" : "text-muted-foreground"
      }`}>
        {stat.label}
      </div>
    </motion.div>
  );
}

export function AnimatedKPIBand({ stats = defaultStats, variant = "dark" }: AnimatedKPIBandProps) {
  const isDark = variant === "dark";

  return (
    <section className={`${isDark ? "bg-charcoal" : "bg-muted/50"} py-10 md:py-14 lg:py-20 relative overflow-hidden`}>
      {/* Subtle background pattern for dark variant */}
      {isDark && (
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
      )}
      
      <div className="container-wide relative z-10">
        {/* Mobile: 2x2 grid, Desktop: 4 columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <AnimatedStat key={stat.label} stat={stat} isDark={isDark} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
