import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { EnhancedImage } from "@/components/ui/enhanced-image";
import { currentProjectImage } from "@/content/siteImageSelections";

interface CaseStudyCardProps {
  title: string;
  client?: string;
  location: string;
  metric?: string;
  metricLabel?: string;
  thumbnail?: string;
  tags: string[];
  href: string;
  year?: string;
  index?: number;
}

export function CaseStudyCard({
  title,
  location,
  metric,
  metricLabel,
  thumbnail,
  tags,
  href,
  year,
  index = 0,
}: CaseStudyCardProps) {
  const resolvedThumbnail = thumbnail || currentProjectImage("hdd-night-panorama-cropped.jpg");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link
        to={href}
        className="group flex flex-col h-full card-premium transition-all duration-300"
      >
        {/* Thumbnail */}
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <EnhancedImage
            src={resolvedThumbnail}
            alt={title}
            wrapperClassName="h-full w-full"
            className="w-full h-full"
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
            tone="vivid"
            hoverZoom
            fallbackLabel={title}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          
          {/* Top left badge */}
          {(year || tags.length > 0) && (
            <div 
              className="absolute top-3 left-3 px-3 py-1.5 text-white text-[11px] font-semibold rounded-lg shadow-md"
              style={{ backgroundColor: 'rgba(11, 18, 32, 0.88)', backdropFilter: 'blur(4px)' }}
            >
              {year || tags[0]}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 flex flex-col flex-grow">
          {/* Location */}
          <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground mb-2">
            <MapPin className="h-3.5 w-3.5" />
            <span>{location}</span>
          </div>

          <h4 className="text-[15px] md:text-[16px] font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-2 font-heading leading-snug">
            {title}
          </h4>

          {metric && metricLabel && (
            <p className="text-[13px] md:text-[14px] text-muted-foreground mb-4">
              <span className="font-semibold text-foreground">{metric}</span> {metricLabel}
            </p>
          )}

          <div className="mt-auto pt-4 flex items-center text-[13.5px] font-bold text-primary tracking-wide uppercase">
            Full Case Study
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
