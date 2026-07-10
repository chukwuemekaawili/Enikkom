import { Link } from "react-router-dom";
import { ArrowRight, FileText } from "lucide-react";
import { contact } from "@/content/home";
import { RecordEyebrow, RecordMetaRow } from "@/components/records";

/**
 * Procurement handoff — the closing block of the record pack. No generic
 * "ready to start?" language: the actions are the submissions a buyer or EPC
 * actually needs (RFQ/tender, project register, QHSE documentation, capability
 * statement), over a title-block contact strip.
 */
export function ProcurementCta() {
  return (
    <section
      aria-labelledby="submit-heading"
      style={{ backgroundColor: "var(--enk-navy)", borderTop: "2px solid var(--enk-rule-accent)" }}
    >
      <div className="enk-container py-14 md:py-16">
        <div className="max-w-2xl">
          <RecordEyebrow refNo="RFQ / TENDER">Submit / Request</RecordEyebrow>
          <h2 id="submit-heading" className="enk-display mt-4 text-[clamp(1.6rem,3vw,2.2rem)] text-[var(--enk-on-dark)]">
            Put a crossing or pipeline scope in front of the engineering team
          </h2>
          <p className="mt-4 text-[14px] leading-relaxed text-[var(--enk-on-dark-muted)] md:text-[15px]">
            Send alignment sheets, an RFQ or a tender enquiry for a technical response —
            method statement input, feasibility, and budget pricing from the engineering team.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link to="/contact" className="enk-btn enk-btn--gold">
            Contact Us
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
          <Link to="/projects#record" className="enk-btn enk-btn--on-dark">
            View Full Project Register
          </Link>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-3">
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

        <RecordMetaRow
          className="mt-10"
          items={[
            { label: "Direct Line", value: <a href={contact.phoneHref} className="enk-mono hover:text-[var(--enk-accent-on-dark)] focus-ring rounded-sm">{contact.phone}</a> },
            { label: "Email", value: <a href={`mailto:${contact.email}`} className="enk-mono hover:text-[var(--enk-accent-on-dark)] focus-ring rounded-sm">{contact.email}</a> },
            { label: "Head Office", value: "Ikeja GRA, Lagos" },
            { label: "Coverage", value: "Nationwide · Nigeria" },
          ]}
        />
      </div>
    </section>
  );
}
