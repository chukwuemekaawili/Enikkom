import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { capabilities } from "@/content/home";
import { SectionHeading } from "./SectionHeading";
import { EnhancedImage } from "@/components/ui/enhanced-image";

const ctaLabel: Record<string, string> = {
  hdd: "View HDD capability",
  pipelines: "View pipeline scope",
  dredging: "View dredging scope",
  facilities: "View facilities scope",
  security: "View monitoring scope",
  pm: "View project management",
};

const shortProof: Record<string, string> = {
  hdd: "Trenchless crossings for rivers, roads, rail and sensitive corridors.",
  pipelines: "Pipeline and flowline construction across land, swamp and shore approaches.",
  dredging: "Marine access, dredging and piling support for difficult terrain.",
};

/** Core capabilities. Photo-led cards: real site imagery + proof, not icons. */
export function Capabilities() {
  const homepageCapabilities = capabilities.slice(0, 3);

  return (
    <section id="capabilities" className="enk-section enk-panel">
      <div className="enk-container">
        <SectionHeading
          kicker="Capabilities"
          title="Core disciplines for complex energy infrastructure"
          intro="Specialist crossing, pipeline and marine scopes for oil & gas operators and EPC partners across Nigeria."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {homepageCapabilities.map((cap) => (
            <Link
              key={cap.key}
              to={cap.href}
              className="enk-card enk-card--hover group flex flex-col overflow-hidden focus-ring"
            >
              <div className="relative aspect-[4/3] overflow-hidden enk-photo-wrap">
                <EnhancedImage
                  src={cap.image}
                  alt={cap.imageAlt}
                  wrapperClassName="h-full w-full"
                  loading="lazy"
                  className="enk-photo--card"
                  hoverZoom
                  fallbackLabel={cap.name}
                />
              </div>
              <div className="flex flex-1 flex-col p-5" style={{ backgroundColor: "var(--enk-surface-card)" }}>
                <h3 className="text-[17px] font-semibold leading-snug text-[var(--enk-on-dark)]">{cap.name}</h3>
                <p className="mt-2 flex-1 text-[13px] leading-relaxed text-[var(--enk-on-dark-muted)]">
                  {shortProof[cap.key] ?? cap.proof}
                </p>
                <span className="enk-readmore mt-4">
                  {ctaLabel[cap.key] ?? "View capability"}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <Link to="/capabilities" className="enk-btn enk-btn--outline">
            View all capabilities
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
