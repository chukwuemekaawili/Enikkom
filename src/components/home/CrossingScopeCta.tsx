import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { contact } from "@/content/home";

const MAILTO_HREF =
  `mailto:${contact.rfpEmail}` +
  `?subject=Crossing%20Scope%20for%20Review` +
  `&body=Project%20location%3A%0APipe%20size%3A%0ACrossing%20type%20(river%20%2F%20swamp%20%2F%20road%20%2F%20rail)%3A%0ATarget%20date%3A%0AKnown%20constraints%3A%0AAttachments%3A`;

/**
 * Mid-page conversion moment, specific to HDD / pipeline crossing scopes.
 * Placed after project records to capture procurement visitors before the footer.
 */
export function CrossingScopeCta() {
  return (
    <section
      aria-labelledby="scope-cta-heading"
      className="enk-section"
      style={{
        borderBottom: "1px solid var(--enk-line-dark)",
        backgroundColor: "var(--enk-navy)",
      }}
    >
      <div className="enk-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="enk-kicker enk-kicker--on-dark mb-5">
            Send a scope for review
          </p>
          <h2
            id="scope-cta-heading"
            className="text-[clamp(1.5rem,3.5vw,2.4rem)] font-extrabold leading-tight text-[var(--enk-on-dark)]"
          >
            Planning a river, swamp, road, or rail crossing?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[16px] leading-relaxed text-[var(--enk-on-dark-muted)]">
            Send the scope, location, pipe size, and constraints. Our technical team
            will review constructability, risks, and execution approach.
          </p>
          <p className="mt-2 text-[13px] text-[var(--enk-on-dark-muted)]">
            Include: pipe size · crossing type · location · target date · known constraints
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={MAILTO_HREF}
              className="inline-flex items-center gap-2.5 font-semibold transition-colors duration-150"
              style={{
                background: "var(--enk-accent-primary)",
                color: "var(--enk-navy)",
                padding: "0.85rem 2rem",
                fontSize: "1rem",
                borderRadius: "var(--radius-control)",
              }}
            >
              Send Scope for Review
              <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
            </a>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2.5 border font-semibold text-white/80 hover:text-white transition-colors duration-150"
              style={{
                borderColor: "rgba(255,255,255,0.3)",
                padding: "0.85rem 2rem",
                fontSize: "1rem",
                borderRadius: "var(--radius-control)",
              }}
            >
              View Project Records
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
