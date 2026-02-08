import { LucideIcon, Shield, Clock, Award, Users } from "lucide-react";
import { motion } from "framer-motion";

interface KPIStat {
  value: string;
  label: string;
  icon?: LucideIcon;
  suffix?: string;
}

interface KPIStatsBandProps {
  stats?: KPIStat[];
  variant?: "light" | "dark";
}

const defaultStats: KPIStat[] = [
  { value: "100", label: "KM HDD Installed", icon: Shield, suffix: "+" },
  { value: "500", label: "Workforce", icon: Users, suffix: "+" },
  { value: "30", label: "Years Experience", icon: Clock, suffix: "+" },
  { value: "0", label: "LTI Record", icon: Award },
];

export function KPIStatsBand({ stats = defaultStats, variant = "dark" }: KPIStatsBandProps) {
  const isDark = variant === "dark";

  return (
    <section className={`${isDark ? "bg-charcoal" : "bg-muted/50"} py-14 md:py-20 lg:py-24 relative overflow-hidden`}>
      {/* Subtle background pattern for dark variant */}
      {isDark && (
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      )}
      
      <div className="container-wide relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={stat.label} 
                className="text-center"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {Icon && (
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl mx-auto mb-4 flex items-center justify-center ${
                    isDark 
                      ? "bg-white/8 text-white/80" 
                      : "bg-primary/10 text-primary"
                  }`}>
                    <Icon className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                )}
                <div className={`text-[32px] md:text-[40px] lg:text-[48px] font-bold mb-2 font-heading leading-none ${
                  isDark ? "text-white" : "text-foreground"
                }`}>
                  {stat.value}{stat.suffix}
                </div>
                <div className={`text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.1em] ${
                  isDark ? "text-white/50" : "text-muted-foreground"
                }`}>
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
