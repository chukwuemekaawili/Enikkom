import { Link } from "react-router-dom";
import { Mail, ExternalLink } from "lucide-react";
import { contact, brand } from "@/content/home";
import { RecordMetaRow } from "@/components/records";
import enikkomLogoWhite from "@/assets/images/logos/enikkom-logo-white.png";

interface FooterLink {
  label: string;
  href: string;
  download?: boolean;
  mailto?: boolean;
}

/** Document-index columns — numbered like sections of a credential pack. */
const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About Enikkom", href: "/about" },
      { label: "Leadership", href: "/about/leadership" },
      { label: "Partners & Affiliates", href: "/partners" },
      { label: "Careers", href: "/careers" },
    ],
  },
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
    title: "Project Records",
    links: [
      { label: "Featured Projects", href: "/projects" },
      { label: "Full Project Record", href: "/projects#record" },
      { label: "Project Gallery", href: "/projects#gallery" },
      { label: "Project Locations", href: "/projects#map" },
      { label: "Equipment Fleet", href: "/equipment" },
    ],
  },
  {
    title: "QHSE / Credentials",
    links: [
      { label: "QHSE & Quality", href: "/hse-quality" },
      { label: "Sustainability", href: "/hse-quality#sustainability" },
      { label: "Certifications & Policies", href: "/resources" },
    ],
  },
  {
    title: "Contact / RFQ",
    links: [
      { label: "Send RFQ / Tender", href: "/contact" },
      { label: "Contact Project Team", href: "/contact" },
      { label: "Capability Statement (PDF)", href: contact.capabilityStatement, download: true },
      { label: "Search the Site", href: "/search" },
    ],
  },
];

function FooterLinkItem({ link }: { link: FooterLink }) {
  const cls = "text-[13.5px] leading-snug text-[var(--enk-on-dark-muted)] hover:text-[var(--enk-on-dark)] transition-colors focus-ring rounded-sm";
  if (link.download) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1.5 ${cls}`}>
        {link.label}
        <ExternalLink className="h-3 w-3 shrink-0 opacity-60" aria-hidden="true" />
      </a>
    );
  }
  if (link.mailto) {
    return (
      <a href={link.href} className={`inline-flex items-center gap-1.5 ${cls}`}>
        {link.label}
        <Mail className="h-3 w-3 shrink-0 opacity-60" aria-hidden="true" />
      </a>
    );
  }
  return <Link to={link.href} className={cls}>{link.label}</Link>;
}

export function HomeFooter() {
  return (
    <footer
      style={{ backgroundColor: "var(--enk-footer)", borderTop: "1px solid var(--enk-rule-strong)" }}
      className="text-[var(--enk-on-dark-muted)]"
    >
      <div className="enk-container py-14">
        {/* Registry head: brand lockup + direct-line ledger */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <Link to="/" title={brand.microcopy} aria-label={`Enikkom and HDDTEC, home. ${brand.microcopy}`} className="inline-flex items-center gap-4 rounded-sm focus-ring">
              <img src={enikkomLogoWhite} alt="Enikkom Construction Limited" style={{ height: 48 }} className="w-auto object-contain" />
              <span aria-hidden="true" style={{ height: 48 }} className="w-px bg-[var(--enk-line-dark)]" />
              <img src={brand.hddtecLogo} alt="HDDTEC, Trenchless Operations" style={{ height: 50 }} className="w-auto object-contain" />
            </Link>
            <p className="mt-4 text-[13.5px] leading-relaxed">
              One group, two delivery arms: Enikkom Construction (Pipeline Works) and HDDTEC
              (Trenchless Operations), serving oil &amp; gas operators and EPC partners in Nigeria.
            </p>
          </div>

          <dl className="grid shrink-0 gap-x-10 gap-y-4 sm:grid-cols-3 lg:text-right">
            <div>
              <dt className="enk-overline">Head Office</dt>
              <dd className="mt-1.5 text-[13px] leading-snug text-[var(--enk-on-dark)]">{contact.address}</dd>
            </div>
            <div>
              <dt className="enk-overline">Direct Line</dt>
              <dd className="mt-1.5">
                <a href={contact.phoneHref} className="enk-mono text-[13px] text-[var(--enk-on-dark)] hover:text-[var(--enk-accent-on-dark)] transition-colors focus-ring rounded-sm">
                  {contact.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="enk-overline">Email</dt>
              <dd className="mt-1.5">
                <a href={`mailto:${contact.email}`} className="enk-mono text-[13px] text-[var(--enk-on-dark)] hover:text-[var(--enk-accent-on-dark)] transition-colors focus-ring rounded-sm">
                  {contact.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        {/* Document index — numbered columns under a title rule */}
        <div className="mt-10 border-t border-[var(--enk-line-dark)] pt-8">
          <div className="grid grid-cols-2 gap-x-8 gap-y-9 md:grid-cols-3 lg:grid-cols-5">
            {columns.map((col, i) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="enk-overline flex items-baseline gap-2 !text-[var(--enk-on-dark)]">
                  <span aria-hidden="true" className="text-[var(--enk-blueprint)]">{String(i + 1).padStart(2, "0")}</span>
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <FooterLinkItem link={l} />
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Registration block — company facts as a title block */}
        <RecordMetaRow
          className="mt-8"
          items={[
            { label: "Head Office", value: "Ikeja GRA, Lagos" },
            { label: "Operations", value: "Nationwide · Nigeria" },
            { label: "Established", value: "1995" },
            { label: "Sectors", value: "Oil & Gas · Marine · Infrastructure" },
          ]}
        />

        {/* Legal line */}
        <div className="mt-8 flex flex-col gap-4 border-t border-[var(--enk-line-dark)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="enk-mono text-[11.5px] tracking-[0.04em]">
            © {new Date().getFullYear()} Enikkom Construction Limited · All rights reserved · Lagos, Nigeria
          </p>
          <div className="enk-mono flex gap-6 text-[11.5px] uppercase tracking-[0.08em]">
            <Link to="/privacy" className="hover:text-[var(--enk-on-dark)] transition-colors focus-ring rounded-sm">Privacy</Link>
            <Link to="/terms" className="hover:text-[var(--enk-on-dark)] transition-colors focus-ring rounded-sm">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
