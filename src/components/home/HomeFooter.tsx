import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import { contact, brand } from "@/content/home";
import enikkomLogoWhite from "@/assets/images/logos/enikkom-logo-white.png";

const QHSE_CREDENTIALS_MAILTO =
  `mailto:${contact.email}` +
  `?subject=QHSE%20Credentials%20Request` +
  `&body=Organisation%3A%0AProject%20context%3A%0ADocuments%20required%3A`;

const columns = [
  {
    title: "Capabilities",
    links: [
      { label: "Trenchless / HDD", href: "/capabilities/hdd" },
      { label: "Pipeline Construction", href: "/capabilities/pipelines-flowlines" },
      { label: "Dredging & Piling", href: "/capabilities/dredging-piling" },
      { label: "Production Facilities", href: "/capabilities/facilities" },
      { label: "Pipeline Security", href: "/capabilities/pipeline-security" },
      { label: "Project Management", href: "/capabilities/project-management" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Enikkom", href: "/about" },
      { label: "Project Records", href: "/projects" },
      { label: "QHSE & Quality", href: "/hse-quality" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Contact & Downloads",
    links: [
      { label: "Contact Project Team", href: "/contact" },
      { label: "Capability Statement (PDF)", href: contact.capabilityStatement },
      { label: "Policies & Compliance", href: "/resources" },
      { label: "News & Insights", href: "/news-insights" },
      { label: "Partners", href: "/partners" },
    ],
  },
];

export function HomeFooter() {
  return (
    <footer style={{ backgroundColor: "var(--enk-footer)" }} className="text-[var(--enk-on-dark-muted)]">
      <div className="enk-container py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" title={brand.microcopy} aria-label={`Enikkom and HDDTEC, home. ${brand.microcopy}`} className="inline-flex items-center gap-4 rounded-md focus-ring">
              <img src={enikkomLogoWhite} alt="Enikkom Construction Limited" style={{ height: 56 }} className="w-auto object-contain" />
              <span aria-hidden="true" style={{ height: 56 }} className="w-px bg-[var(--enk-line-dark)]" />
              <span className="inline-flex items-center">
                <img src={brand.hddtecLogo} alt="HDDTEC, Trenchless Operations" style={{ height: 58 }} className="w-auto object-contain" />
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-[14px] leading-relaxed">
              One group, two delivery arms: Enikkom Construction (Pipeline Works) and HDDTEC (Trenchless Operations), serving oil &amp; gas operators and EPC partners in Nigeria.
            </p>
            <ul className="mt-6 space-y-3 text-[13.5px]">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--enk-accent-on-dark)]" aria-hidden="true" />
                <span>{contact.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-[var(--enk-accent-on-dark)]" aria-hidden="true" />
                <a href={contact.phoneHref} className="hover:text-[var(--enk-on-dark)] focus-ring rounded">{contact.phone}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-[var(--enk-accent-on-dark)]" aria-hidden="true" />
                <a href={`mailto:${contact.email}`} className="hover:text-[var(--enk-on-dark)] focus-ring rounded">{contact.email}</a>
              </li>
            </ul>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-[14px] font-bold text-[var(--enk-on-dark)]">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.href.startsWith("/downloads") ? (
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[14px] hover:text-[var(--enk-on-dark)] focus-ring rounded">
                        {l.label}
                        <ExternalLink className="h-3 w-3 shrink-0 opacity-60" aria-hidden="true" />
                      </a>
                    ) : (
                      <Link to={l.href} className="text-[14px] hover:text-[var(--enk-on-dark)] focus-ring rounded">
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* QHSE credentials fast-path — for procurement visitors reaching the footer */}
        <div
          className="mt-10 flex flex-col gap-3 rounded-md border p-5 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: "var(--enk-line-dark)", backgroundColor: "rgba(255,255,255,0.03)" }}
        >
          <div>
            <p className="text-[13.5px] font-semibold text-[var(--enk-on-dark)]">Need QHSE documentation for prequalification?</p>
            <p className="mt-0.5 text-[12.5px] text-[var(--enk-on-dark-muted)]">Full credentials pack — ISO certificates, policies, and compliance records — available on request.</p>
          </div>
          <a
            href={QHSE_CREDENTIALS_MAILTO}
            className="shrink-0 inline-flex items-center gap-2 text-[13px] font-semibold text-[var(--enk-accent-primary-on-dark)] hover:underline focus-ring rounded whitespace-nowrap"
            aria-label="Request QHSE credentials by email"
          >
            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            Request QHSE Credentials
          </a>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-[var(--enk-line-dark)] pt-7 text-[13px] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Enikkom Construction Limited. All rights reserved. Lagos, Nigeria.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-[var(--enk-on-dark)] focus-ring rounded">Privacy</Link>
            <Link to="/terms" className="hover:text-[var(--enk-on-dark)] focus-ring rounded">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
