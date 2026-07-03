import { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EnhancedImage } from "@/components/ui/enhanced-image";
import { getAssetUrl } from "@/lib/assetMap";
import fallbackHero from "@/assets/images/projects/service-operations-hero.jpg";

interface ImageSliderHeroProps {
  slides?: any[];
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
  trustStrip?: ReactNode;
  autoPlayInterval?: number;
  pageSlug?: string;
  sectionKey?: string;
}

export function ImageSliderHero({
  slides,
  title,
  subtitle,
  badge,
  primaryCTA,
  secondaryCTA,
  trustStrip,
  autoPlayInterval = 5000,
}: ImageSliderHeroProps) {
  const resolvedSlides =
    slides && slides.length > 0
      ? slides.map((slide) => ({
          ...slide,
          image: getAssetUrl(slide.image || fallbackHero),
        }))
      : [{ image: fallbackHero, title }];
  const [currentIndex, setCurrentIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setCurrentIndex(0);
  }, [resolvedSlides.length]);

  useEffect(() => {
    if (resolvedSlides.length <= 1 || prefersReducedMotion) return;

    const intervalId = window.setInterval(() => {
      setCurrentIndex((index) => (index + 1) % resolvedSlides.length);
    }, autoPlayInterval);

    return () => window.clearInterval(intervalId);
  }, [resolvedSlides.length, autoPlayInterval, prefersReducedMotion]);

  const currentSlide = resolvedSlides[currentIndex] || resolvedSlides[0];
  const currentLabel = currentSlide.title || `Slide ${currentIndex + 1}`;

  return (
    <section className="relative flex min-h-[700px] items-center overflow-hidden md:min-h-[780px] lg:min-h-[860px]">
      <div className="absolute inset-0 bg-charcoal">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentIndex}-${currentSlide.image}`}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 0.96, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <EnhancedImage
              src={currentSlide.image}
              alt=""
              aria-hidden="true"
              priority={currentIndex === 0}
              tone="cinematic"
              wrapperClassName="absolute inset-0"
              className="absolute inset-0 h-full w-full object-cover object-center"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,14,19,0.9)_0%,rgba(10,14,19,0.72)_45%,rgba(10,14,19,0.34)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(29,160,101,0.22),transparent_30%)]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/12" />

      <div className="relative z-10 w-full">
        <div className="container-wide py-20 md:py-24 lg:py-28">
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-7 flex items-center gap-4 text-white/58">
              <span className="h-px w-10 bg-primary/75" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.24em]">
                {badge || "Enikkom Group"}
              </span>
            </div>

            <h1 className="max-w-4xl text-white">{title}</h1>

            {subtitle && (
              <p className="mt-6 max-w-2xl text-[17px] leading-8 text-white/72 md:text-[19px]">
                {subtitle}
              </p>
            )}

            {(primaryCTA || secondaryCTA) && (
              <div className="mt-10 flex flex-wrap gap-3">
                {primaryCTA && (
                  <Button asChild size="lg">
                    <Link to={primaryCTA.href}>
                      {primaryCTA.label}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                )}

                {secondaryCTA && (
                  <Button asChild size="lg" variant="secondary">
                    <Link to={secondaryCTA.href}>{secondaryCTA.label}</Link>
                  </Button>
                )}
              </div>
            )}

            {resolvedSlides.length > 1 && (
              <div className="mt-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                  {resolvedSlides.map((slide, index) => (
                    <button
                      key={`${slide.title || "slide"}-${index}`}
                      type="button"
                      onClick={() => setCurrentIndex(index)}
                      aria-label={`Show hero slide ${index + 1}`}
                      aria-pressed={currentIndex === index}
                      className={`transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
                        currentIndex === index
                          ? "h-2.5 w-10 rounded-full bg-primary"
                          : "h-2.5 w-2.5 rounded-full bg-white/35 hover:bg-white/65"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-4 text-white/55">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">
                    {String(currentIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-10 bg-white/15" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">
                    {currentLabel}
                  </span>
                </div>
              </div>
            )}

            {trustStrip && (
              <motion.div
                className="mt-16 rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-md md:p-6"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.14 }}
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
