import { Link } from "react-router-dom";
import {
  ArrowRight,
  Facebook,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCollection, usePageContent, useSiteSettings } from "@/hooks/useSiteSettings";
import { getAssetUrl } from "@/lib/assetMap";
import logoWhite from "@/assets/images/logos/enikkom-logo-white.png";

const defaultFooterLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Management Team", href: "/management-team" },
    { label: "Projects", href: "/projects" },
    { label: "Equipment", href: "/equipment" },
    { label: "HSE & Quality", href: "/hse-quality" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    { label: "Trenchless Installations (HDD)", href: "/capabilities/hdd" },
    { label: "Pipeline Construction & Maintenance", href: "/capabilities/pipelines-flowlines" },
    { label: "Dredging & Piling Works", href: "/capabilities/dredging-piling" },
    { label: "Production Facilities Construction", href: "/capabilities/facilities" },
    { label: "Pipeline Security & Monitoring", href: "/capabilities/pipeline-security" },
    { label: "Project Management & Support", href: "/capabilities/project-management" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const defaultCertifications = [
  { name: "ISO 9001:2015", full: "Quality Management" },
  { name: "ISO 14001:2015", full: "Environmental Management" },
  { name: "ISO 45001:2018", full: "Occupational Health & Safety" },
  { name: "NUPRC", full: "Regulatory Compliance" },
];

const offices = [
  {
    name: "Abuja Head Office",
    address: "11, 65 Road Abuja Model City, Gwarinpa, FCT",
  },
  {
    name: "Lagos Corporate Office",
    address: "No 5b Theophilus Orji Street, Lekki Phase 1, Lagos",
  },
  {
    name: "Warri Operations Base",
    address: "Km7-DCS Road, Warri, Delta State",
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { contact, branding } = useSiteSettings();
  const { data: certificationsData } = useCollection("certifications");
  const { content: sharedContent } = usePageContent("shared");

  const footerLinks = sharedContent.footer_links || defaultFooterLinks;
  const certifications = certificationsData.length > 0 ? certificationsData : defaultCertifications;

  const socialLinks = [
    {
      icon: Linkedin,
      href: contact.linkedinUrl || "https://linkedin.com/company/enikkom",
      label: "LinkedIn",
    },
    {
      icon: Twitter,
      href: contact.twitterUrl || "https://twitter.com/enikkom",
      label: "Twitter",
    },
    {
      icon: Facebook,
      href: "https://facebook.com/enikkom",
      label: "Facebook",
    },
    {
      icon: Youtube,
      href: contact.youtubeUrl || "https://youtube.com/@enikkom",
      label: "YouTube",
    },
  ];

  return (
    <footer className="bg-charcoal text-white">
      <div className="container-wide py-16 md:py-20">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 shadow-[0_24px_80px_rgba(0,0,0,0.16)] md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary/85">
                Start a conversation
              </p>
              <h2 className="mt-4 max-w-2xl text-white">
                Planning a crossing, pipeline package, or high-stakes delivery program?
              </h2>
              <p className="mt-4 max-w-2xl text-[15px] leading-8 text-white/62">
                We scope work practically, mobilize with in-country capability, and build for
                difficult Nigerian operating environments.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm border border-primary/20">
                <Link to="/contact">
                  Request Assessment
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="premium">
                <Link to="/projects">View Track Record</Link>
              </Button>
            </div>
          </div>

          <div className="mt-8 grid gap-4 border-t border-white/10 pt-8 md:grid-cols-2 xl:grid-cols-4">
            {certifications.slice(0, 4).map((cert: any) => (
              <div
                key={cert.name}
                className="rounded-[1.35rem] border border-white/10 bg-white/5 hover:bg-white/10 transition-colors px-5 py-5"
              >
                <p className="text-[13px] font-semibold text-white">{cert.name}</p>
                <p className="mt-1 text-[12px] leading-6 text-white/46">
                  {cert.full || cert.description || "Certified operating standard"}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.05fr_0.62fr_0.7fr_0.95fr]">
          <div>
            <Link to="/" className="inline-flex items-center">
              <img
                src={getAssetUrl(branding.logoUrl || logoWhite)}
                alt={branding.companyName || "Enikkom Construction Limited"}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/60">
              {branding.tagline ||
                "Indigenous specialist delivery across HDD, pipeline construction, dredging, facilities, and project support since 1995."}
            </p>

            <div className="mt-6 space-y-3 text-[13px] text-white/62">
              <a
                href={`tel:${(contact.phone || "+234 806 573 8555").replace(/\s/g, "")}`}
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4 text-primary" />
                <span>{contact.phone || "+234 806 573 8555"}</span>
              </a>
              <a
                href={`mailto:${contact.email || "info@enikkom.com"}`}
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4 text-primary" />
                <span>{contact.email || "info@enikkom.com"}</span>
              </a>
            </div>

            <div className="mt-6 flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/58 transition-colors hover:border-white/20 hover:text-white"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
              Company
            </p>
            <div className="mt-5 space-y-3">
              {footerLinks.company.map((link: any) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="block text-[14px] text-white/62 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
              Capabilities
            </p>
            <div className="mt-5 space-y-3">
              {(footerLinks.services || footerLinks.capabilities || []).map((link: any) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="block text-[14px] text-white/62 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
              Locations
            </p>
            <div className="mt-5 space-y-5">
              {offices.map((office) => (
                <div key={office.name} className="flex gap-3">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <p className="text-[14px] font-semibold text-white">{office.name}</p>
                    <p className="mt-1 text-[13px] leading-6 text-white/52">{office.address}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-[12px] text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© {currentYear} Enikkom Construction Limited. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            {footerLinks.legal.map((link: any) => (
              <Link key={link.label} to={link.href} className="transition-colors hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
