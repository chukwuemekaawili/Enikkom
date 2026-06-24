import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/** The single final CTA band, strong headline, conversion copy, fast path. */
export function FinalCta() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--enk-navy)" }}
      aria-labelledby="cta-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        aria-hidden="true"
        style={{ background: "radial-gradient(60% 120% at 85% 0%, oklch(0.50 0.14 252 / 0.35), transparent 70%)" }}
      />
      <div className="enk-container relative enk-section">
        <div className="max-w-3xl">
          <p className="enk-kicker enk-kicker--on-dark mb-5">Start the conversation</p>
          <h2 id="cta-heading" className="enk-display text-[clamp(1.9rem,4vw,3rem)] text-[var(--enk-on-dark)]">
            Have a crossing or pipeline scope on the table? Let's pressure-test it.
          </h2>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-[var(--enk-on-dark-muted)]">
            Send your alignment, drawings or RFP and our technical team will assess feasibility, risk and
            approach, with no obligation.
          </p>

          <div className="mt-9">
            <Link to="/contact" className="enk-btn enk-btn--gold">
              Request a Crossing Assessment
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
