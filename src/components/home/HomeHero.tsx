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
      <section
        className="relative isolate overflow-hidden"
        style={{ backgroundColor: "var(--enk-navy)", minHeight: "clamp(520px, 80vh, 860px)" }}
        aria-labelledby="hero-heading"
      >
        {/* Background video — swap /videos/hero.mp4 for the real asset */}
        <video
          ref={bgVideoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={heroImage}
          aria-hidden="true"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
          {/* Fallback: shows poster image if no video file is present */}
        </video>

        {/* Scrim — left-heavy like SLB */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(6,14,30,0.82) 0%, rgba(6,14,30,0.60) 55%, rgba(6,14,30,0.30) 100%)",
          }}
          aria-hidden="true"
        />

        <div className="enk-container relative flex items-center" style={{ minHeight: "inherit" }}>
          <div className="max-w-2xl py-24 md:py-32 lg:py-40">
            <p className="enk-kicker enk-kicker--on-dark mb-6">
              Trenchless &amp; Pipeline Contractor · Nigeria
            </p>

            <h1
              id="hero-heading"
              className="enk-display text-[var(--enk-on-dark)] text-[clamp(2.25rem,6vw,4.25rem)]"
            >
              Trenchless and pipeline construction for critical energy infrastructure.
            </h1>

            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-[var(--enk-on-dark-muted)] md:text-[18px]">
              Enikkom engineers and constructs horizontal directional drilling, pipeline, dredging and
              marine civil works for oil &amp; gas operators and EPC partners across Nigeria,
              delivered to specification since 2003.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link to="/projects" className="enk-btn enk-btn--gold">
                View Projects
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>

              {/* Watch Video — SLB-style ghost button with play circle */}
              <button
                onClick={() => setVideoOpen(true)}
                className="inline-flex items-center gap-2.5 text-[15px] font-semibold text-white/90 hover:text-white transition-colors duration-150 group"
                aria-label="Watch Enikkom capabilities video"
              >
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/35 bg-white/10 group-hover:bg-white/18 transition-colors duration-150"
                >
                  <Play className="h-4 w-4 fill-current ml-0.5" />
                </span>
                Watch Video
              </button>
            </div>
          </div>
        </div>
      </section>

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
                <source src="/videos/hero.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
