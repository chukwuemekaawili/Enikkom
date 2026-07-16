import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { contact, brand } from "@/content/home";
import enikkomLogoWhite from "@/assets/images/logos/enikkom-logo-white.png";

interface FooterLink {
  label: string;
  href: string;
  download?: boolean;
}

/** Shell-style footer: three plain sentence-case columns, one legal line. */
const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Explore Enikkom",
    links: [
      { label: "About Enikkom", href: "/about" },
      { label: "What we do", href: "/capabilities" },
      { label: "Projects", href: "/projects" },
      { label: "Equipment & fleet", href: "/equipment" },
      { label: "Safety & quality", href: "/hse-quality" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Can we help?",
    links: [
      { label: "Contact the project team", href: "/contact" },
      { label: "Capability statement (PDF)", href: contact.capabilityStatement, download: true },
      { label: "Certifications & policies", href: "/resources" },
      { label: "Search the site", href: "/search" },
    ],
  },
];

function FooterLinkItem({ link }: { link: FooterLink }) {
  // py-1.5 lifts each row to a ~24px tap target without changing the visual rhythm
  const cls =
    "inline-block py-1.5 text-[13.5px] leading-snug text-[#B8BEC4] hover:text-[#E6E9EC] transition-colors focus-ring rounded-md";
  if (link.download) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1.5 ${cls}`}>
        {link.label}
        <ExternalLink className="h-3 w-3 shrink-0 opacity-60" aria-hidden="true" />
      </a>
    );
  }
  return <Link to={link.href} className={cls}>{link.label}</Link>;
}

export function HomeFooter() {
  return (
    <footer
      style={{ backgroundColor: "var(--enk-footer)" }}
      className="text-[#B8BEC4]"
    >
      <div className="enk-container py-14">
        {/* Brand */}
        <Link
          to="/"
          title={brand.microcopy}
          aria-label={`Enikkom and HDDTEC, home. ${brand.microcopy}`}
          className="inline-flex items-center gap-4 rounded-md focus-ring"
        >
          <img src={enikkomLogoWhite} alt="Enikkom Construction Limited" style={{ height: 44 }} className="w-auto object-contain" />
          <span aria-hidden="true" style={{ height: 44 }} className="w-px bg-[var(--enk-line-dark)]" />
          <img src={brand.hddtecLogo} alt="HDDTEC, Trenchless Operations" style={{ height: 46 }} className="w-auto object-contain" />
        </Link>

        {/* Three plain columns */}
        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-[17px] font-bold text-[#E6E9EC]">{col.title}</h3>
              <ul className="mt-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <FooterLinkItem link={l} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h3 className="text-[17px] font-bold text-[#E6E9EC]">Get in touch</h3>
            <ul className="mt-3 text-[13.5px] leading-snug">
              <li className="py-1.5">{contact.address}</li>
              <li>
                <a href={contact.phoneHref} className="inline-block py-1.5 hover:text-[#E6E9EC] transition-colors focus-ring rounded-md">
                  {contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="inline-block py-1.5 hover:text-[#E6E9EC] transition-colors focus-ring rounded-md">
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal line */}
        <div className="mt-12 flex flex-col gap-4 border-t border-[rgba(255,255,255,0.12)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12.5px]">
            © {new Date().getFullYear()} Enikkom Construction Limited. All rights reserved.
          </p>
          <div className="flex gap-6 text-[12.5px]">
            <Link to="/privacy" className="inline-block py-1.5 hover:text-[#E6E9EC] transition-colors focus-ring rounded-md">Privacy</Link>
            <Link to="/terms" className="inline-block py-1.5 hover:text-[#E6E9EC] transition-colors focus-ring rounded-md">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
