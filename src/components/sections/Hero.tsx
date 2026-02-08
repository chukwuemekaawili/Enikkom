import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { EditableImage } from "@/components/admin";
import { useEditMode } from "@/contexts/EditModeContext";

interface HeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
  primaryCTA?: {
    label: string;
    href: string;
  };
  secondaryCTA?: {
    label: string;
    href: string;
  };
  backgroundImage?: string;
  trustStrip?: ReactNode;
  size?: "default" | "large" | "small";
  align?: "left" | "center";
  // Live editing props
  pageSlug?: string;
  sectionKey?: string;
  imageField?: string;
}

export function Hero({
  title,
  subtitle,
  badge,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
  trustStrip,
  size = "default",
  align = "left",
  pageSlug,
  sectionKey = "hero",
  imageField = "backgroundImage",
}: HeroProps) {
  const { isEditMode, pendingChanges } = useEditMode();
  
  const heights = {
    small: "min-h-[380px] md:min-h-[440px] lg:min-h-[480px]",
    default: "min-h-[480px] md:min-h-[560px] lg:min-h-[620px]",
    large: "min-h-[580px] md:min-h-[680px] lg:min-h-[760px]",
  };

  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  // Check for pending image change
  const changeKey = pageSlug ? `${pageSlug}:${sectionKey}:${imageField}` : '';
  const pendingChange = changeKey ? pendingChanges.get(changeKey) : undefined;
  const displayImage = pendingChange?.value ?? backgroundImage;

  return (
    <section className={`relative ${heights[size]} flex items-center overflow-hidden`}>
      {/* Background Image - Editable when pageSlug is provided */}
      {displayImage ? (
        <>
          {isEditMode && pageSlug ? (
            <EditableImage
              src={displayImage}
              alt="Hero background"
              pageSlug={pageSlug}
              sectionKey={sectionKey}
              field={imageField}
              containerClassName="absolute inset-0"
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ 
                backgroundImage: `url(${displayImage})`,
                backgroundPosition: "center 40%"
              }}
            />
          )}
          {/* Premium gradient overlay */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: align === "center" 
                ? 'linear-gradient(to bottom, rgba(11, 18, 32, 0.65) 0%, rgba(11, 18, 32, 0.78) 100%)'
                : 'linear-gradient(to right, rgba(11, 18, 32, 0.85) 0%, rgba(11, 18, 32, 0.70) 45%, rgba(11, 18, 32, 0.50) 100%)'
            }}
          />
        </>
      ) : (
        <div className="absolute inset-0 bg-charcoal" />
      )}

      {/* Content */}
      <div className="relative z-10 container-wide py-16 md:py-20 lg:py-24">
        <motion.div 
          className={`flex flex-col ${alignClass} max-w-2xl ${align === "center" ? "mx-auto" : ""}`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Badge */}
          {badge && (
            <motion.div 
              className="mb-5"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <span className="inline-flex items-center px-4 py-2 rounded-lg text-[12px] font-semibold bg-primary text-white uppercase tracking-wide">
                {badge}
              </span>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1 
            className="text-white mb-5"
            style={{ textShadow: '0 2px 12px rgba(0, 0, 0, 0.4)' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {title}
          </motion.h1>
          
          {subtitle && (
            <motion.p 
              className="text-[16px] md:text-[17px] lg:text-[18px] text-white/75 mb-8 leading-[1.65] max-w-xl"
              style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
            >
              {subtitle}
            </motion.p>
          )}

          {(primaryCTA || secondaryCTA) && (
            <motion.div 
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
            >
              {primaryCTA && (
                <Button 
                  asChild 
                  size="lg" 
                  className="h-12 px-7 text-[14px] font-semibold bg-primary hover:bg-primary/90 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Link to={primaryCTA.href}>
                    {primaryCTA.label}
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              )}
              {secondaryCTA && (
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="h-12 px-7 text-[14px] font-semibold border-white/40 text-white bg-white/8 hover:bg-white/12 hover:border-white/50 rounded-xl backdrop-blur-sm transition-all duration-200"
                >
                  <Link to={secondaryCTA.href}>
                    {secondaryCTA.label}
                  </Link>
                </Button>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Trust Strip */}
        {trustStrip && (
          <motion.div 
            className="mt-14 md:mt-16 lg:mt-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            {trustStrip}
          </motion.div>
        )}
      </div>
    </section>
  );
}
