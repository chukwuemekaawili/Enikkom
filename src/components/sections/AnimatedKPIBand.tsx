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
  variant?: "light" | "dark"; // kept for backwards compatibility but we override to premium light
}

const defaultStats: KPIStat[] = [
  { value: 100, label: "KM HDD Installed", icon: Shield, suffix: "+" },
  { value: 500, label: "Workforce Capacity", icon: Users, suffix: "+" },
  { value: 34, label: "Years Experience", icon: Clock },
  { value: 0, label: "Lost Time Incidents", icon: Award },
];

function AnimatedStat({ stat, index }: { stat: KPIStat; index: number }) {
  const { count, ref } = useCountUp({ end: stat.value, duration: 2000 });
  const Icon = stat.icon;

  return (
    <motion.div 
      ref={ref} 
      className="card-premium p-6 md:p-8 flex flex-col items-center justify-center text-center group h-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
    >
      {Icon && (
        <motion.div 
          className="w-12 h-12 md:w-14 md:h-14 rounded-2xl mb-5 flex items-center justify-center bg-brand-primary/5 text-brand-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-primary/10"
        >
          <Icon className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2.5} />
        </motion.div>
      )}
      <div 
        className="text-[32px] md:text-[42px] lg:text-[52px] font-bold mb-2 font-heading leading-none text-foreground tracking-tight group-hover:text-brand-primary transition-colors duration-300"
      >
        {stat.prefix}{count}{stat.suffix}
      </div>
      <div className="text-[11px] md:text-[12px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
        {stat.label}
      </div>
    </motion.div>
  );
}

export function AnimatedKPIBand({ stats = defaultStats }: AnimatedKPIBandProps) {
  return (
    <section className="bg-background py-16 md:py-24 relative overflow-hidden">
      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-muted/30" />
      
      <div className="container-wide relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div key={stat.label} className="h-full">
              <AnimatedStat stat={stat} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
