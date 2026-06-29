import { Award } from "lucide-react";

interface Certification {
  name: string;
  description?: string;
}

interface CertificationsBlockProps {
  certifications?: Certification[];
  title?: string;
  variant?: "grid" | "inline";
}

const defaultCertifications: Certification[] = [
  { name: "ISO 9001:2015", description: "Quality Management System" },
  { name: "ISO 14001:2015", description: "Environmental Management" },
  { name: "ISO 45001:2018", description: "Occupational Health & Safety" },
];

/** Certifications, in the `.enk` design language. */
export function CertificationsBlock({
  certifications = defaultCertifications,
  title = "Certified Excellence",
  variant = "grid",
}: CertificationsBlockProps) {
  if (variant === "inline") {
    return (
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {certifications.map((cert) => (
          <span key={cert.name} className="enk-chip" title={cert.description}>
            <Award className="h-3.5 w-3.5 text-[var(--enk-bronze)]" aria-hidden="true" />
            {cert.name}
          </span>
        ))}
      </div>
    );
  }

  return (
    <section className="enk-section" style={{ backgroundColor: "var(--enk-bg-muted)" }}>
      <div className="enk-container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="enk-kicker justify-center">Certifications</p>
          <h2 className="enk-display mt-4 text-[clamp(1.6rem,3vw,2.2rem)] text-[var(--enk-ink)]">{title}</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--enk-steel)]">
            Our operations are certified to international standards, ensuring quality, safety, and
            environmental responsibility.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {certifications.map((cert) => (
            <div key={cert.name} className="enk-card p-7 text-center">
              <div
                className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-md"
                style={{ backgroundColor: "rgba(37, 99, 235, 0.12)", color: "var(--enk-bronze)" }}
                aria-hidden="true"
              >
                <Award className="h-7 w-7" />
              </div>
              <h3 className="text-[18px] font-semibold text-[var(--enk-ink)]">{cert.name}</h3>
              {cert.description && (
                <p className="mt-2 text-[14px] text-[var(--enk-steel)]">{cert.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
