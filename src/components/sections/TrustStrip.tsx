import { Zap, Calendar, Shield, Users } from "lucide-react";
import { motion } from "framer-motion";

export function TrustStrip() {
  const stats = [
    { value: "100+", label: "KM HDD Installed", icon: Zap },
    { value: "30+", label: "Years Experience", icon: Calendar },
    { value: "0", label: "Lost Time Incidents", icon: Shield },
    { value: "500+", label: "Workforce Capacity", icon: Users },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div 
            key={index} 
            className="flex items-center gap-3 p-4 md:p-5 rounded-xl"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(8px)'
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
          >
            <div 
              className="w-10 h-10 md:w-11 md:h-11 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
            >
              <Icon className="h-5 w-5 text-white/75" />
            </div>
            <div>
              <div 
                className="text-[20px] md:text-[24px] font-bold text-white font-heading leading-none"
                style={{ textShadow: '0 1px 6px rgba(0, 0, 0, 0.35)' }}
              >
                {stat.value}
              </div>
              <div 
                className="text-[11px] md:text-[12px] text-white/50 mt-1 leading-tight font-medium"
                style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.25)' }}
              >
                {stat.label}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
