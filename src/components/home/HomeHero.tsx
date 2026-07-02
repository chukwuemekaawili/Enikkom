import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Play, X } from "lucide-react";
import { siteImageSelections } from "@/content/siteImageSelections";

const heroImage = siteImageSelections.home.heroSlides[0];

export function HomeHero() {
  const [videoOpen, setVideoOpen] = useState(false);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  // Autoplay background video
  useEffect(() => {
    bgVideoRef.current?.play().catch(() => {});
  }, []);

  // When modal opens, play modal video from start; when closes, pause bg video flicker
  useEffect(() => {
    if (videoOpen) {
      modalVideoRef.current?.play().catch(() => {});
    } else {
      if (modalVideoRef.current) {
        modalVideoRef.current.pause();
        modalVideoRef.current.currentTime = 0;
      }
    }
  }, [videoOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setVideoOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      {/* Outer wrapper — same margin as enk-panel so left edges align perfectly */}
      <div className="mx-4 md:mx-6 lg:mx-8" style={{ marginTop: "0.75rem" }}>
      <section
        className="relative isolate overflow-hidden"
        style={{ backgroundColor: "var(--enk-navy)", minHeight: "clamp(560px, 88vh, 960px)", borderRadius: "1rem", transform: "translateZ(0)", WebkitMaskImage: "-webkit-radial-gradient(white, black)" }}
        aria-labelledby="hero-heading"
      >
        {/* Background video */}
        <video
          ref={bgVideoRef}
          className="absolute inset-0 h-full w-full object-cover enk-photo--hero"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={heroImage}
          aria-hidden="true"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Left edge vignette */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(6,14,30,0.96) 0%, rgba(6,14,30,0.55) 40%, transparent 70%)" }} aria-hidden="true" />
        {/* Right edge vignette */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to left, rgba(6,14,30,0.85) 0%, transparent 45%)" }} aria-hidden="true" />
        {/* Bottom fade */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,14,30,0.60) 0%, transparent 30%)" }} aria-hidden="true" />

        {/* Content — vertically centred, left-aligned */}
        <div className="enk-container relative h-full flex items-center" style={{ minHeight: "inherit" }}>
          <div className="max-w-3xl py-16 sm:py-20 md:py-24">
            <p className="enk-kicker enk-kicker--on-dark mb-5">
              Trenchless &amp; Pipeline Contractor · Nigeria
            </p>
            <h1
              id="hero-heading"
              className="font-extrabold text-white leading-[1.05] mb-5"
              style={{ fontSize: "clamp(2.2rem, 5.5vw, 4rem)" }}
            >
              Where Nigeria's toughest crossings get built.
            </h1>
            <p className="text-white/70 text-[17px] leading-relaxed mb-8 max-w-xl">
              HDD, pipeline construction, dredging and marine civil works — delivered to specification for oil &amp; gas operators and EPC partners since 1995.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2.5 font-semibold transition-colors duration-150"
                style={{ background: "var(--enk-accent-primary)", color: "var(--enk-navy)", padding: "0.85rem 2rem", fontSize: "1rem", borderRadius: "var(--radius-control)" }}
              >
                View Project Records
                <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
              </Link>

              <button
                onClick={() => setVideoOpen(true)}
                className="inline-flex items-center gap-2.5 font-semibold text-white/80 hover:text-white border border-white/30 hover:border-white/60 hover:bg-white/8 transition-colors duration-150"
                style={{ padding: "0.85rem 2rem", fontSize: "1rem", borderRadius: "var(--radius-control)" }}
                aria-label="Watch Enikkom capabilities video"
              >
                Watch Video
                <Play className="h-5 w-5 fill-current" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>
      </div>

      {/* Video Modal / Lightbox */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.88)" }}
          onClick={() => setVideoOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Capabilities video"
        >
          <div
            className="relative w-full max-w-4xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute -top-10 right-0 flex items-center gap-1.5 text-white/70 hover:text-white text-[13px] font-medium transition-colors"
              aria-label="Close video"
            >
              <X className="h-4 w-4" />
              Close
            </button>

            <div className="relative" style={{ paddingBottom: "56.25%" }}>
              <video
                ref={modalVideoRef}
                className="absolute inset-0 h-full w-full rounded-sm object-cover"
                controls
                playsInline
                poster={heroImage}
              >
                <source src="/videos/capabilities.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
