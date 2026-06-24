import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import { contact, brand } from "@/content/home";
import enikkomLogoWhite from "@/assets/images/logos/enikkom-logo-white.png";

const columns = [
  {
    title: "Capabilities",
    links: [
      { label: "Trenchless / HDD", href: "/capabilities/hdd" },
      { label: "Pipeline Construction", href: "/capabilities/pipelines-flowlines" },
      { label: "Dredging & Piling", href: "/capabilities/dredging-piling" },
      { label: "Production Facilities", href: "/capabilities/facilities" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "QHSE & Quality", href: "/hse-quality" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Capability Statement", href: contact.capabilityStatement },
      { label: "Resources", href: "/resources" },
      { label: "News & Insights", href: "/news-insights" },
      { label: "Partners", href: "/partners" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function HomeFooter() {
  return (
    <footer style={{ backgroundColor: "oklch(0.16 0.03 255)" }} className="text-[var(--enk-on-dark-muted)]">
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
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--enk-gold)]" aria-hidden="true" />
                <span>{contact.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-[var(--enk-gold)]" aria-hidden="true" />
                <a href={contact.phoneHref} className="hover:text-[var(--enk-on-dark)] focus-ring rounded">{contact.phone}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-[var(--enk-gold)]" aria-hidden="true" />
                <a href={`mailto:${contact.email}`} className="hover:text-[var(--enk-on-dark)] focus-ring rounded">{contact.email}</a>
              </li>
            </ul>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="font-mono text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--enk-on-dark)]">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.href.startsWith("/downloads") ? (
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-[14px] hover:text-[var(--enk-on-dark)] focus-ring rounded">
                        {l.label}
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

        <div className="mt-14 flex flex-col gap-4 border-t border-[var(--enk-line-dark)] pt-7 text-[13px] sm:flex-row sm:items-center sm:justify-between">
          <p>© {2026} Enikkom Construction Limited. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-[var(--enk-on-dark)] focus-ring rounded">Privacy</Link>
            <Link to="/terms" className="hover:text-[var(--enk-on-dark)] focus-ring rounded">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
