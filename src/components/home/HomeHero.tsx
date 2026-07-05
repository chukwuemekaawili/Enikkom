import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Play } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { siteImageSelections } from "@/content/siteImageSelections";

const heroImage = siteImageSelections.home.heroSlides[0];

export function HomeHero() {
  const bgVideoRef = useRef<HTMLVideoElement>(null);

  // Autoplay background video
  useEffect(() => {
    bgVideoRef.current?.play().catch(() => {});
  }, []);

  return (
    <>
      {/* Outer wrapper — same margin as enk-panel so left edges align perfectly */}
      <div className="mx-4 md:mx-6 lg:mx-8" style={{ marginTop: "0.75rem" }}>
      <section
        className="relative isolate overflow-hidden"
        style={{ backgroundColor: "var(--enk-navy)", minHeight: "clamp(480px, 72vh, 760px)", borderRadius: "1rem", transform: "translateZ(0)", WebkitMaskImage: "-webkit-radial-gradient(white, black)" }}
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
          <div className="max-w-3xl py-12 sm:py-16 md:py-20">
            <p className="enk-kicker enk-kicker--on-dark mb-4">
              Trenchless &amp; Pipeline Contractor · Nigeria
            </p>
            <h1
              id="hero-heading"
              className="font-extrabold text-white leading-[1.05] mb-4"
              style={{ fontSize: "clamp(2.1rem, 4.7vw, 3.65rem)" }}
            >
              Where Nigeria's toughest crossings get built.
            </h1>
            <p className="text-white/72 text-[16px] md:text-[17px] leading-relaxed mb-7 max-w-xl">
              HDD, pipeline construction, dredging and marine civil works — delivered to specification for oil &amp; gas operators and EPC partners since 1995.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <Link to="/projects" className="enk-btn enk-btn--gold">
                View Project Records
                <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
              </Link>

              <Dialog>
                <DialogTrigger asChild>
                  <button className="enk-btn enk-btn--on-dark" aria-label="Watch Enikkom capabilities video">
                    Watch Video
                    <Play className="h-5 w-5 fill-current" aria-hidden="true" />
                  </button>
                </DialogTrigger>
                <DialogContent className="z-[200] max-w-4xl border-0 bg-transparent p-0 shadow-none">
                  <DialogTitle className="sr-only">Capabilities video</DialogTitle>
                  <div className="relative" style={{ paddingBottom: "56.25%" }}>
                    <video
                      className="absolute inset-0 h-full w-full rounded-sm object-cover"
                      controls
                      autoPlay
                      playsInline
                      poster={heroImage}
                    >
                      <source src="/videos/capabilities.mp4" type="video/mp4" />
                    </video>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
