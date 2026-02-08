import { Link } from "react-router-dom";
import { ArrowRight, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface CapabilityCardProps {
  title: string;
  description: string;
  href: string;
  icon?: LucideIcon;
  image?: string;
  metric?: string;
  index?: number;
}

export function CapabilityCard({
  title,
  description,
  href,
  icon: Icon,
  image,
  metric,
  index = 0,
}: CapabilityCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link
        to={href}
        className="group block h-full bg-card rounded-xl border border-border overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-border/60 hover:-translate-y-1"
      >
        {/* Image with overlay */}
        {image && (
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent" />
            
            {/* Metric badge */}
            {metric && (
              <div className="absolute top-3 left-3 px-3 py-1.5 bg-primary text-white text-[11px] font-semibold rounded-lg shadow-md">
                {metric}
              </div>
            )}
            
            {/* Icon badge */}
            {Icon && (
              <div 
                className="absolute bottom-3 right-3 w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(4px)'
                }}
              >
                <Icon className="h-5 w-5 text-white" />
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-5 md:p-6">
          <h4 className="text-[16px] md:text-[17px] font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200 font-heading">
            {title}
          </h4>
          <p className="text-[14px] text-muted-foreground mb-4 leading-relaxed line-clamp-2">
            {description}
          </p>
          <span className="inline-flex items-center text-[13px] font-semibold text-primary">
            Explore This Service
            <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
