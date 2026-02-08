import { ReactNode, useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Volume2, VolumeX } from "lucide-react";

interface VideoHeroProps {
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
  videoSrc: string;
  posterImage?: string;
  trustStrip?: ReactNode;
}

export function VideoHero({
  title,
  subtitle,
  badge,
  primaryCTA,
  secondaryCTA,
  videoSrc,
  posterImage,
  trustStrip,
}: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay was prevented, video will show poster
      });
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative min-h-[580px] md:min-h-[680px] lg:min-h-[740px] flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          poster={posterImage}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        {/* Premium dark overlay - 60-70% as specified */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(11, 18, 32, 0.80) 0%, rgba(11, 18, 32, 0.65) 50%, rgba(11, 18, 32, 0.50) 100%)'
          }}
        />
      </div>

      {/* Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-6 right-6 z-20 p-3 rounded-xl transition-colors duration-150"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.15)'
        }}
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? (
          <VolumeX className="h-5 w-5 text-white/70" />
        ) : (
          <Volume2 className="h-5 w-5 text-white" />
        )}
      </button>

      {/* Content */}
      <div className="relative z-10 container-wide py-16 md:py-20">
        <div className="max-w-2xl">
          {/* Badge */}
          {badge && (
            <div className="mb-5">
              <span className="inline-flex items-center px-4 py-2 rounded-lg text-[13px] font-semibold bg-brand-primary text-white">
                {badge}
              </span>
            </div>
          )}

          {/* Title - Large confident typography */}
          <h1 className="text-white font-heading mb-6" style={{ textShadow: '0 2px 12px rgba(0, 0, 0, 0.4)' }}>
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-[17px] md:text-[19px] text-white/75 mb-8 leading-[1.6] max-w-xl" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }}>
              {subtitle}
            </p>
          )}

          {(primaryCTA || secondaryCTA) && (
            <div className="flex flex-wrap gap-4">
              {primaryCTA && (
                <Button 
                  asChild 
                  size="lg" 
                  className="h-12 px-7 text-[15px] font-semibold bg-brand-primary hover:bg-brand-primary-hover rounded-xl transition-colors duration-150"
                >
                  <Link to={primaryCTA.href}>
                    {primaryCTA.label}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
              {secondaryCTA && (
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="h-12 px-7 text-[15px] font-semibold border-white/40 text-white bg-white/8 hover:bg-white/12 hover:border-white/50 rounded-xl transition-colors duration-150"
                >
                  <Link to={secondaryCTA.href}>
                    {secondaryCTA.label}
                  </Link>
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Trust Strip */}
        {trustStrip && (
          <div className="mt-14 md:mt-16">
            {trustStrip}
          </div>
        )}
      </div>
    </section>
  );
}
