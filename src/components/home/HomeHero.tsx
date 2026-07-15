import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { siteImageSelections } from "@/content/siteImageSelections";

const heroImage = siteImageSelections.home.heroSlides[0];

/**
 * Homepage hero — Shell-style rounded tile inset from the viewport, with
 * the site-operations video inside it and a small rounded overlay panel:
 * short headline, one sentence, one primary action, a quiet video link.
 */
export function HomeHero() {
  const bgVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    bgVideoRef.current?.play().catch(() => {});
  }, []);

  return (
    <section
      aria-labelledby="hero-heading"
      className="pt-3 md:pt-4"
      style={{ backgroundColor: "var(--enk-bg)" }}
    >
      <div className="mx-auto max-w-[1440px] px-3 md:px-5">
        <div className="relative isolate overflow-hidden rounded-[16px]">
          {/* Documentary footage — real site operations */}
          <video
            ref={bgVideoRef}
            className="absolute inset-0 h-full w-full object-cover"
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

          {/* Soft scrim so the panel and edges stay legible over any frame */}
          <div
            className="absolute inset-0"
            aria-hidden="true"
            style={{ background: "linear-gradient(to top, rgba(11,19,30,0.45) 0%, rgba(11,19,30,0.12) 45%, rgba(11,19,30,0.2) 100%)" }}
          />

          {/* Overlay panel — Shell's rounded translucent card */}
          <div className="relative flex min-h-[420px] items-center px-4 py-12 md:min-h-[500px] md:px-10 md:py-16 lg:min-h-[540px]">
            <div
              className="max-w-xl rounded-[12px] p-6 md:p-8"
              style={{ backgroundColor: "rgba(16,27,42,0.78)" }}
            >
              <h1 id="hero-heading" className="text-white">
                Where Nigeria's toughest crossings get built
              </h1>

              <p className="mt-3 text-[15px] leading-relaxed text-white/80">
                HDD, pipeline crossings, dredging and marine civil works across Nigeria since 1995.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-5">
                <Link to="/projects" className="enk-btn enk-btn--gold">
                  Explore our projects
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>

                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      aria-label="Watch video: capabilities reel, 1 minute 24 seconds"
                      className="group inline-flex items-center gap-2 text-[14px] font-bold text-white/90 transition-colors hover:text-white focus-ring rounded-md"
                    >
                      <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                      Watch the video
                    </button>
                  </DialogTrigger>
                  <DialogContent className="z-[200] max-w-4xl border-0 bg-transparent p-0 shadow-none">
                    <DialogTitle className="sr-only">Enikkom field footage: capabilities reel</DialogTitle>
                    <div
                      className="relative overflow-hidden rounded-[12px]"
                      style={{ paddingBottom: "56.25%" }}
                    >
                      <video
                        className="absolute inset-0 h-full w-full object-cover"
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
        </div>
      </div>
    </section>
  );
}
