import { Link } from "react-router-dom";
import { Mail, FolderOpen, FileText } from "lucide-react";
import { contact } from "@/content/home";

/**
 * How can we help? — Shell's yellow quick-link band: one saturated rounded
 * bar holding three pill shortcuts. Replaces the old procurement CTA section.
 */
export function QuickActions() {
  const pillClass =
    "flex items-center gap-3 rounded-[10px] bg-white px-5 py-3.5 text-[14px] font-bold " +
    "text-[var(--enk-on-light)] transition-opacity hover:opacity-90 focus-ring";

  return (
    <section aria-labelledby="quickactions-heading" className="enk-section">
      <div className="enk-container">
        <h2 id="quickactions-heading" className="text-[var(--enk-ink)]">
          How can we help?
        </h2>

        <div
          className="mt-6 rounded-[16px] p-3 md:p-4"
          style={{ backgroundColor: "var(--enk-accent-primary)" }}
        >
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <Link to="/contact" className={pillClass}>
              <Mail className="h-5 w-5 shrink-0 text-[var(--enk-accent-primary)]" aria-hidden="true" />
              Send an RFQ or tender
            </Link>
            <Link to="/projects#record" className={pillClass}>
              <FolderOpen className="h-5 w-5 shrink-0 text-[var(--enk-accent-primary)]" aria-hidden="true" />
              View the project register
            </Link>
            <a
              href={contact.capabilityStatement}
              target="_blank"
              rel="noopener noreferrer"
              className={pillClass}
            >
              <FileText className="h-5 w-5 shrink-0 text-[var(--enk-accent-primary)]" aria-hidden="true" />
              Capability statement
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
