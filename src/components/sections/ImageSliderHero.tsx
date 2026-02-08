import { ReactNode, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Plus, X, Upload, Loader2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEditMode } from "@/contexts/EditModeContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Slide {
  image: string;
  title?: string;
  subtitle?: string;
}

interface ImageSliderHeroProps {
  slides: Slide[];
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
  // Live editing props
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
  autoPlayInterval = 6000,
  pageSlug,
  sectionKey = "hero",
}: ImageSliderHeroProps) {
  const { isEditMode, pendingChanges, addChange } = useEditMode();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  // Get slides from pending changes or props
  const slidesChangeKey = pageSlug ? `${pageSlug}:${sectionKey}:slides` : '';
  const pendingSlides = slidesChangeKey ? pendingChanges.get(slidesChangeKey)?.value : undefined;
  const displaySlides: Slide[] = pendingSlides ?? slides;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % displaySlides.length);
  }, [displaySlides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + displaySlides.length) % displaySlides.length);
  }, [displaySlides.length]);

  useEffect(() => {
    if (displaySlides.length <= 1 || isPaused || isEditMode) return;
    
    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [displaySlides.length, autoPlayInterval, isPaused, nextSlide, isEditMode]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Handle slide image upload
  const handleSlideImageUpload = async (file: File, slideIndex: number) => {
    if (!pageSlug) return;
    
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    setIsUploading(true);
    setUploadingIndex(slideIndex);
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${pageSlug}-slide-${slideIndex}-${Date.now()}.${fileExt}`;
      const filePath = `page-content/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('admin_uploads')
        .upload(filePath, file, { cacheControl: '3600', upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('admin_uploads')
        .getPublicUrl(filePath);

      // Update slides array
      const newSlides = displaySlides.map((slide, i) => 
        i === slideIndex ? { ...slide, image: publicUrl } : slide
      );

      addChange({
        pageSlug,
        sectionKey,
        field: 'slides',
        value: newSlides,
        type: 'json',
      });

      toast.success('Slide image updated - click Save to apply');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setIsUploading(false);
      setUploadingIndex(null);
    }
  };

  const handleAddSlide = () => {
    if (!pageSlug) return;
    const newSlides = [...displaySlides, { image: '', title: 'New Slide' }];
    addChange({
      pageSlug,
      sectionKey,
      field: 'slides',
      value: newSlides,
      type: 'json',
    });
  };

  const handleRemoveSlide = (index: number) => {
    if (!pageSlug || displaySlides.length <= 1) return;
    const newSlides = displaySlides.filter((_, i) => i !== index);
    addChange({
      pageSlug,
      sectionKey,
      field: 'slides',
      value: newSlides,
      type: 'json',
    });
    if (currentSlide >= newSlides.length) {
      setCurrentSlide(Math.max(0, newSlides.length - 1));
    }
  };

  return (
    <section 
      className="relative min-h-[480px] md:min-h-[580px] lg:min-h-[680px] flex items-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Image Slider Background */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
          >
            <img
              src={displaySlides[currentSlide]?.image}
              alt={displaySlides[currentSlide]?.title || "Hero image"}
              className="absolute inset-0 w-full h-full object-cover"
              fetchPriority="high"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Premium dark overlay - ensures text readability */}
        <div className="absolute inset-0 overlay-gradient-dark" />
        
        {/* Additional bottom gradient for depth */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(11, 18, 32, 0.4) 0%, transparent 40%)'
          }}
        />
      </div>

      {/* Edit Mode: Slide Management */}
      {isEditMode && pageSlug && (
        <div className="absolute top-4 right-4 z-30 flex flex-col gap-2">
          <div className="bg-background/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-border">
            <p className="text-xs font-semibold mb-2">Slide {currentSlide + 1} of {displaySlides.length}</p>
            <div className="flex gap-2">
              <label className="flex items-center gap-1 px-2 py-1 bg-primary text-primary-foreground rounded text-xs cursor-pointer hover:bg-primary/90">
                {isUploading && uploadingIndex === currentSlide ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <Upload className="h-3 w-3" />
                )}
                Replace
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleSlideImageUpload(file, currentSlide);
                  }}
                />
              </label>
              {displaySlides.length > 1 && (
                <button
                  onClick={() => handleRemoveSlide(currentSlide)}
                  className="flex items-center gap-1 px-2 py-1 bg-destructive text-destructive-foreground rounded text-xs hover:bg-destructive/90"
                >
                  <X className="h-3 w-3" /> Remove
                </button>
              )}
              <button
                onClick={handleAddSlide}
                className="flex items-center gap-1 px-2 py-1 bg-muted text-muted-foreground rounded text-xs hover:bg-muted/80"
              >
                <Plus className="h-3 w-3" /> Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Arrows */}
      {displaySlides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 hover:bg-white/15 btn-press"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(8px)'
            }}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5 text-white/80" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 hover:bg-white/15 btn-press"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(8px)'
            }}
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5 text-white/80" />
          </button>
        </>
      )}

      {/* Slide Indicators */}
      {displaySlides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {displaySlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? "bg-white w-8" 
                  : "bg-white/35 w-2 hover:bg-white/55"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 container-wide py-14 md:py-20">
        <motion.div 
          className="max-w-2xl"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Badge */}
          {badge && (
            <motion.div 
              className="mb-5"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <span className="inline-flex items-center px-4 py-2 rounded-lg text-[11px] md:text-[12px] font-semibold bg-brand-primary text-white uppercase tracking-wide">
                {badge}
              </span>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1 
            className="text-white mb-5 text-balance"
            style={{ textShadow: '0 2px 12px rgba(0, 0, 0, 0.4)' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {title}
          </motion.h1>
          
          {subtitle && (
            <motion.p 
              className="text-[15px] md:text-[17px] text-white/75 mb-8 leading-[1.7] max-w-xl"
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
                  className="h-12 px-7 text-[13px] md:text-[14px] font-semibold bg-brand-primary hover:bg-brand-primary-hover rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 btn-press"
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
                  className="h-12 px-7 text-[13px] md:text-[14px] font-semibold border-white/40 text-white bg-white/8 hover:bg-white/12 hover:border-white/50 rounded-xl backdrop-blur-sm transition-all duration-200 btn-press"
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
            className="mt-12 md:mt-16"
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
