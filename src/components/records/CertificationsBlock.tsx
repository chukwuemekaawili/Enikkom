import { certifications as defaultCertifications, type Certification } from "@/content/home";
import { RecordEyebrow } from "./RecordEyebrow";
import { RecordStatusStamp } from "./RecordStatusStamp";
import { DocumentCard } from "./DocumentCard";

interface CertificationsBlockProps {
  certifications?: Certification[];
  title?: string;
  variant?: "grid" | "inline";
}

/**
 * Certified management systems as filed documents. Sourced from the shared
 * certification register in content/home — entries with a file on record
 * link to the actual certificate; the rest read as neutral stamps.
 */
export function CertificationsBlock({
  certifications = defaultCertifications,
  title = "Certified management systems",
  variant = "grid",
}: CertificationsBlockProps) {
  if (variant === "inline") {
    return (
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {certifications.map((cert) =>
          cert.file ? (
            <a
              key={cert.code}
              href={cert.file}
              target="_blank"
              rel="noopener noreferrer"
              title={`${cert.name} — view document`}
              className="focus-ring rounded-[2px] transition-opacity hover:opacity-80"
            >
              <RecordStatusStamp tone="qhse">{cert.code}</RecordStatusStamp>
            </a>
          ) : (
            <RecordStatusStamp key={cert.code} tone="neutral">
              {cert.code}
            </RecordStatusStamp>
          ),
        )}
      </div>
    );
  }

  return (
    <section
      className="enk-section"
      style={{ backgroundColor: "var(--enk-bg-muted)", borderBottom: "1px solid var(--enk-rule)" }}
    >
      <div className="enk-container">
        <div className="max-w-2xl">
          <RecordEyebrow>Certifications</RecordEyebrow>
          <h2 className="enk-display mt-4 text-[clamp(1.4rem,2.6vw,1.9rem)] text-[var(--enk-ink)]">
            {title}
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-[var(--enk-steel)] md:text-[15px]">
            Quality, environmental and safety management systems certified to international
            standards. Certificates on file are available for prequalification review.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((cert) => (
            <DocumentCard
              key={cert.code}
              docType="Certificate"
              title={cert.code}
              description={cert.name}
              href={cert.file}
              actionLabel="View certificate"
              stamp={cert.file ? { label: "On File", tone: "qhse" } : { label: "On Request", tone: "neutral" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
