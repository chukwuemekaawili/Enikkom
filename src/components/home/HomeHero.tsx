import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FileText, Play } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { contact, heroMeta } from "@/content/home";
import { RecordEyebrow } from "@/components/records";
import { siteImageSelections } from "@/content/siteImageSelections";

const heroImage = siteImageSelections.home.heroSlides[0];

/**
 * Homepage cover sheet — the front page of the contractor record pack.
 * Squared dark section (no floating radius), documentary footage behind a
 * navy scrim, a typed record eyebrow, the headline, a tightened scope line,
 * procurement-first actions, and a mono scope-of-works title-block strip.
 */
export function HomeHero() {
  const bgVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    bgVideoRef.current?.play().catch(() => {});
  }, []);

  return (
    <section
      className="relative isolate overflow-hidden"
      style={{ backgroundColor: "var(--enk-navy)", borderBottom: "1px solid var(--enk-rule)" }}
      aria-labelledby="hero-heading"
    >
      {/* Documentary footage — real site operations, not decorative motion */}
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

      {/* Scrims — legibility over any frame */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{ background: "linear-gradient(to right, rgba(9,14,20,0.97) 0%, rgba(9,14,20,0.72) 46%, rgba(9,14,20,0.35) 78%)" }}
      />
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{ background: "linear-gradient(to top, rgba(9,14,20,0.85) 0%, transparent 34%)" }}
      />

      <div className="enk-container relative">
        <div className="max-w-3xl py-16 md:py-20 lg:py-24">
          <RecordEyebrow refNo="EST. 1995">Field Operations Record</RecordEyebrow>

          <h1
            id="hero-heading"
            className="enk-display mt-6 text-white"
            style={{ fontSize: "clamp(2.1rem, 4.7vw, 3.6rem)", lineHeight: 1.05 }}
          >
            Where Nigeria's toughest crossings get built.
          </h1>

          <p className="mt-5 max-w-2xl text-[15.5px] leading-relaxed text-white/72 md:text-[17px]">
            HDD, pipeline crossings, dredging, and marine civil works for oil &amp; gas operators,
            EPC partners, and infrastructure teams across Nigeria since 1995.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
            <a
              href={contact.capabilityStatement}
              target="_blank"
              rel="noopener noreferrer"
              className="enk-mono inline-flex items-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-[var(--enk-accent-on-dark)] transition-colors hover:text-[var(--enk-accent-primary-on-dark)] focus-ring rounded-sm"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              Request Capability Statement
            </a>
          </div>

          {/* Filed field reel — documentary footage as a record artifact */}
          <div className="mt-6">
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  aria-label="Watch video — capabilities reel, 1 minute 24 seconds"
                  className="group inline-flex items-center gap-3 rounded-[3px] border border-[var(--enk-rule-strong)] px-3 py-2.5 text-left transition-colors hover:border-[var(--enk-accent-primary-on-dark)] focus-ring"
                  style={{ backgroundColor: "rgba(9,14,20,0.55)" }}
                >
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[2px] border border-[var(--enk-rule-accent)]"
                    aria-hidden="true"
                  >
                    <Play className="h-3.5 w-3.5 fill-current text-[var(--enk-accent-primary-on-dark)]" />
                  </span>
                  <span className="flex flex-col">
                    <span className="enk-mono text-[11.5px] font-semibold uppercase tracking-[0.12em] text-[var(--enk-accent-on-dark)] transition-colors group-hover:text-[var(--enk-accent-primary-on-dark)]">
                      Watch Video
                    </span>
                    <span className="enk-mono mt-0.5 text-[10.5px] uppercase tracking-[0.1em] text-[var(--enk-blueprint)]">
                      Capabilities reel · 01:24
                    </span>
                  </span>
                </button>
              </DialogTrigger>
              <DialogContent className="z-[200] max-w-4xl border-0 bg-transparent p-0 shadow-none">
                <DialogTitle className="sr-only">Enikkom field footage — capabilities reel</DialogTitle>
                <div
                  className="relative overflow-hidden"
                  style={{
                    paddingBottom: "56.25%",
                    borderRadius: "var(--enk-radius-record)",
                    border: "1px solid var(--enk-rule-strong)",
                  }}
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

      {/* Scope-of-works title-block strip */}
      <div className="relative border-t border-[var(--enk-rule)]" style={{ backgroundColor: "rgba(9,14,20,0.55)" }}>
        <div className="enk-container">
          <ul className="flex flex-wrap items-center gap-x-3 gap-y-1.5 py-3" aria-label="Scope of works">
            {heroMeta.map((item, i) => (
              <li key={item} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden="true" className="text-[var(--enk-rule-accent)]">·</span>}
                <span className="enk-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--enk-blueprint)]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
