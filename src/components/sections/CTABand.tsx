import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { RecordEyebrow } from "@/components/records";

/** Internal routes go through the router; mailto/http hrefs render as plain anchors. */
function CTALink({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  if (/^(https?:|mailto:|tel:)/.test(href)) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link to={href} className={className}>
      {children}
    </Link>
  );
}

interface CTABandProps {
  headline?: string;
  subhead?: string;
  eyebrow?: string;
  primaryCTA?: {
    label: string;
    href: string;
  };
  secondaryCTA?: {
    label: string;
    href: string;
  };
  /** Legacy prop, accepted for compatibility — the band renders one way now. */
  variant?: "primary" | "dark";
}

/**
 * Procurement handoff band, in the Field Records language: amber title-block
 * rule on top, typed record eyebrow, left-aligned headline, procurement verbs.
 * No centered marketing block, no glow.
 */
export function CTABand({
  headline = "Put a project scope in front of the engineering team",
  subhead = "Send alignment sheets, an RFQ or a tender enquiry for a technical response — feasibility, method statement input, and budget pricing.",
  eyebrow = "Submit / Request",
  primaryCTA = { label: "Discuss Project Scope", href: "/contact" },
  secondaryCTA,
}: CTABandProps) {
  return (
    <section
      style={{ backgroundColor: "var(--enk-navy)", borderTop: "2px solid var(--enk-rule-accent)" }}
    >
      <div className="enk-container py-14 md:py-16">
        <div className="max-w-2xl">
          <RecordEyebrow refNo="RFQ / TENDER">{eyebrow}</RecordEyebrow>
          <h2 className="enk-display mt-4 text-[clamp(1.5rem,2.8vw,2.1rem)] text-[var(--enk-on-dark)]">
            {headline}
          </h2>
          {subhead && (
            <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-[var(--enk-on-dark-muted)] md:text-[15px]">
              {subhead}
            </p>
          )}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <CTALink href={primaryCTA.href} className="enk-btn enk-btn--gold">
            {primaryCTA.label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </CTALink>
          {secondaryCTA && (
            <CTALink href={secondaryCTA.href} className="enk-btn enk-btn--on-dark">
              {secondaryCTA.label}
            </CTALink>
          )}
        </div>
      </div>
    </section>
  );
}
