import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { EditableImage } from "@/components/admin";
import { Button } from "@/components/ui/button";
import { EnhancedImage } from "@/components/ui/enhanced-image";
import { useEditMode } from "@/contexts/EditModeContext";
import { getAssetUrl } from "@/lib/assetMap";

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
    small: "min-h-[460px] md:min-h-[520px] lg:min-h-[560px]",
    default: "min-h-[560px] md:min-h-[640px] lg:min-h-[700px]",
    large: "min-h-[660px] md:min-h-[760px] lg:min-h-[840px]",
  };

  const changeKey = pageSlug ? `${pageSlug}:${sectionKey}:${imageField}` : "";
  const pendingChange = changeKey ? pendingChanges.get(changeKey) : undefined;
  const displayImage = pendingChange?.value ?? backgroundImage;
  const resolvedImage = displayImage ? getAssetUrl(displayImage) : undefined;
  const isCentered = align === "center";

  return (
    <section className={`relative overflow-hidden ${heights[size]}`}>
      {resolvedImage ? (
        <>
          {isEditMode && pageSlug ? (
            <EditableImage
              src={resolvedImage}
              alt="Hero background"
              pageSlug={pageSlug}
              sectionKey={sectionKey}
              field={imageField}
              containerClassName="absolute inset-0"
              className="h-full w-full object-cover object-center"
            />
          ) : (
            <EnhancedImage
              src={resolvedImage}
              alt=""
              aria-hidden="true"
              priority
              tone="cinematic"
              wrapperClassName="absolute inset-0"
              className="h-full w-full object-cover object-center"
              sizes="100vw"
            />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,14,19,0.88)_0%,rgba(10,14,19,0.72)_45%,rgba(10,14,19,0.5)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(29,160,101,0.18),transparent_32%)]" />
        </>
      ) : (
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(10,14,19,1)_0%,rgba(18,24,31,0.94)_55%,rgba(29,160,101,0.4)_100%)]" />
      )}

      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />

      <div className="relative z-10 flex min-h-full items-center">
        <div className="container-wide py-20 md:py-24 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className={`${isCentered ? "mx-auto text-center items-center" : "items-start text-left"} flex max-w-4xl flex-col`}
          >
            <div
              className={`mb-7 flex w-full ${isCentered ? "justify-center" : "justify-start"}`}
            >
              <div className="flex items-center gap-4 text-white/55">
                <span className="h-px w-10 bg-primary/75" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em]">
                  {badge || "Engineering delivery"}
                </span>
              </div>
            </div>

            <h1 className="max-w-4xl text-white">{title}</h1>

            {subtitle && (
              <p className="mt-6 max-w-2xl text-[16px] leading-8 text-white/70 md:text-[18px]">
                {subtitle}
              </p>
            )}

            {(primaryCTA || secondaryCTA) && (
              <div
                className={`mt-10 flex flex-wrap gap-3 ${isCentered ? "justify-center" : "justify-start"}`}
              >
                {primaryCTA && (
                  <Button asChild size="lg">
                    <Link to={primaryCTA.href}>
                      {primaryCTA.label}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                )}

                {secondaryCTA && (
                  <Button asChild size="lg" variant="premium">
                    <Link to={secondaryCTA.href}>{secondaryCTA.label}</Link>
                  </Button>
                )}
              </div>
            )}

            {trustStrip && (
              <motion.div
                className={`mt-14 w-full max-w-4xl rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-md md:p-6 ${isCentered ? "text-left" : ""}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.12 }}
              >
                {trustStrip}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
