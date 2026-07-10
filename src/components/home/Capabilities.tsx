import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { capabilities, type Capability } from "@/content/home";
import { RecordEyebrow } from "@/components/records";
import { EnhancedImage } from "@/components/ui/enhanced-image";

/**
 * Field disciplines — the capability-statement set. Squared record sheets
 * (enk-doc-card), documentary photo plates, a mono discipline code, what
 * Enikkom executes, where it applies, and a link into the capability page.
 * Not photo-hover feature cards: border sharpens on hover, no lift, no glow.
 */
function DisciplineCard({ cap }: { cap: Capability }) {
  return (
    <Link
      to={cap.href}
      className="enk-doc-card enk-doc-card--interactive group flex h-full flex-col overflow-hidden focus-ring"
    >
      {/* Typed header row */}
      <div className="flex min-h-[38px] items-center justify-between gap-3 border-b border-[var(--enk-rule)] px-4 py-1.5">
        <p className="enk-overline !text-[10px]">Field Discipline</p>
        <span className="enk-mono text-[11px] font-medium text-[var(--enk-blueprint)]">{cap.code}</span>
      </div>

      {/* Documentation photo plate */}
      <div className="relative aspect-[16/9] overflow-hidden border-b border-[var(--enk-rule)]">
        <EnhancedImage
          src={cap.image}
          alt={cap.imageAlt}
          tone="documentary"
          wrapperClassName="h-full w-full"
          loading="lazy"
          fallbackLabel={cap.name}
        />
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-3.5">
        <h3 className="font-heading text-[16px] font-semibold leading-snug text-[var(--enk-ink)]">
          {cap.name}
        </h3>
        <p className="mt-2 text-[12.5px] leading-[1.5] text-[var(--enk-steel)]">{cap.proof}</p>

        <div className="mt-3.5 border-t border-[var(--enk-rule)] pt-3">
          <p className="enk-overline !text-[10px]">Applies to</p>
          <p className="mt-1.5 text-[12px] leading-[1.5] text-[var(--enk-blueprint)]">{cap.scope}</p>
        </div>

        <span className="enk-mono mt-auto flex items-center gap-1.5 border-t border-[var(--enk-rule)] pt-3.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--enk-accent-on-dark)] transition-colors group-hover:text-[var(--enk-accent-primary-on-dark)]">
          View capability
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

export function Capabilities() {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="enk-section"
      style={{ backgroundColor: "var(--enk-bg-muted)", borderBottom: "1px solid var(--enk-rule)" }}
    >
      <div className="enk-container">
        <div className="max-w-2xl">
          <RecordEyebrow refNo="REF 02">Field Disciplines</RecordEyebrow>
          <h2 id="capabilities-heading" className="enk-display mt-4 text-[clamp(1.5rem,2.8vw,2rem)] text-[var(--enk-ink)]">
            What Enikkom executes in the field
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-[var(--enk-steel)] md:text-[15px]">
            Specialist crossing, pipeline, marine and facilities scopes for oil &amp; gas
            operators and EPC partners across Nigeria.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap) => (
            <DisciplineCard key={cap.key} cap={cap} />
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
