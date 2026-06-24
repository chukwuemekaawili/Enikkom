/**
 * Site search index (static, no backend). This indexes actual content, not
 * just page titles: capabilities, projects, certifications, achievements,
 * leadership, partners, FAQs and corporate statements. Every entry's
 * description is copied verbatim from already-verified copy elsewhere in the
 * codebase (home.ts, companyProfile.ts, ManagementPage.tsx, PartnersPage.tsx)
 * rather than invented for this list.
 */
import { capabilities, projects, flagship, certifications, achievements, faqs } from "./home";
import { corporateStatements } from "./companyProfile";

export interface SearchEntry {
  title: string;
  href: string;
  description: string;
  category: string;
}

const capabilityEntries: SearchEntry[] = capabilities.map((c) => ({
  title: c.name,
  href: c.href,
  description: c.proof,
  category: "Capabilities",
}));

const projectEntries: SearchEntry[] = [
  {
    title: flagship.name,
    href: flagship.href,
    description: flagship.challenge,
    category: "Projects",
  },
  ...projects
    .filter((p) => p.href !== flagship.href)
    .map((p) => ({
      title: p.name,
      href: p.href,
      description: `${p.location} — ${p.challenge}`,
      category: "Projects",
    })),
];

const certificationEntries: SearchEntry[] = certifications.map((c) => ({
  title: c.code,
  href: "/hse-quality",
  description: `${c.name} certification.`,
  category: "Certifications",
}));

const achievementEntries: SearchEntry[] = achievements.map((a) => {
  const hrefByLabel: Record<string, string> = {
    "Africa's longest single HDD drill": flagship.href,
    "Nigeria's longest Continuous HDD": "/projects/oml34-chdd",
  };
  return {
    title: a.label,
    href: hrefByLabel[a.label] || "/projects",
    description: a.context,
    category: "Achievements",
  };
});

const faqEntries: SearchEntry[] = faqs.map((f) => ({
  title: f.q,
  href: "/#faq",
  description: f.a,
  category: "FAQ",
}));

const statementEntries: SearchEntry[] = corporateStatements
  .filter((s) => s.key !== "corporate-excellence")
  .map((s) => ({
    title: s.title,
    href: "/about",
    description: s.text,
    category: "Company",
  }));

/** Leadership and Board, copied verbatim from ManagementPage.tsx. */
const leadershipEntries: SearchEntry[] = [
  { name: "Engr. Edward Amene", role: "Chief Executive Officer / Managing Director", highlight: "Pioneer of HDD technology in Nigeria, first River Niger crossing, 2003" },
  { name: "Engr. Saleem Ahmad Khan", role: "Chief Technical Officer", highlight: "30+ years of trenchless technology expertise across Nigeria and international markets" },
  { name: "Mr. Francis Anatogu", role: "Chief Growth & Transformation Officer", highlight: "Cambridge MBA | ex-Schlumberger, Shell, Accenture, Deloitte, driving Enikkom's growth agenda" },
  { name: "Adekunle Adewole, PhD", role: "Chief Operations & Strategy Officer", highlight: "Oxford post-doctoral | INSEAD | PhD Strategic Management | ex-CEO Livingtrust Mortgage Bank" },
  { name: "Uzoma Nwagboso", role: "Chief Financial Officer", highlight: "25+ years in Corporate Banking, Energy Finance, and O&G Project Management" },
  { name: "Mr. Chibuike Nwachukwu", role: "Executive Director", highlight: "15 years as Managing Director, operational backbone of Enikkom Group" },
  { name: "Teddy Allen", role: "General Manager, Drilling", highlight: "38 years global HDD expertise, diverse formations, direct pipe, and drilling systems" },
  { name: "Idigbor Emeka, FCA", role: "Chief Accountant", highlight: "FCA-certified excellence in financial governance" },
  { name: "Biodun Adefila", role: "Chairman, Board of Directors", highlight: "Driving strategic brand vision and governance excellence" },
  { name: "Ken James", role: "Non-Executive Director", highlight: "40+ years shaping West Africa's energy infrastructure" },
].map((m) => ({
  title: m.name,
  href: "/management-team",
  description: `${m.role} — ${m.highlight}`,
  category: "Leadership",
}));

/** Partners and joint ventures, copied verbatim from PartnersPage.tsx. */
const partnerEntries: SearchEntry[] = [
  {
    title: "HDDThailand Co. Ltd",
    description: "Thailand-based trenchless specialist with 15+ years international HDD experience across Asia, Africa and the Middle East. Provides advanced equipment, ISO 9001:2015 certified operations, and specialist engineer deployment to HDDTEC Ltd.",
  },
  {
    title: "Ocean Marine Solutions (OMS)",
    description: "Nigerian maritime security company providing real-time pipeline surveillance, leak detection, and vandalism prevention services.",
  },
  {
    title: "HDDTEC Ltd (HDDThailand-Enikkom)",
    description: "Formed in May 2020 by ECL and The E-Place Limited. Operates Nigeria's largest in-country HDD fleet, executing mega-scale trenchless crossings for IOCs and operators across Nigeria.",
  },
  {
    title: "PIEJV (Pipeline Infrastructure Enikkom JV)",
    description: "Joint venture between Ocean Marine Solutions Ltd (OMS) and ECL for pipeline security, monitoring, and infrastructure protection services across the Niger Delta.",
  },
].map((p) => ({
  title: p.title,
  href: "/partners",
  description: p.description,
  category: "Partners",
}));

export const searchIndex: SearchEntry[] = [
  {
    title: "Home",
    href: "/",
    description: "Enikkom Construction and HDDTEC — trenchless drilling, pipeline construction, dredging and piling, and production facilities across Nigeria's oil & gas sector.",
    category: "Company",
  },
  {
    title: "Capabilities",
    href: "/capabilities",
    description: "Full range of trenchless, pipeline, marine and production-facility capabilities.",
    category: "Capabilities",
  },
  ...capabilityEntries,
  {
    title: "Projects",
    href: "/projects",
    description: "Selected HDD, pipeline, dredging and piling projects delivered across Nigeria.",
    category: "Projects",
  },
  ...projectEntries,
  ...achievementEntries,
  {
    title: "QHSE & Quality",
    href: "/hse-quality",
    description: "Quality, safety, security and community-management systems, certified to ISO 9001:2015, ISO 14001:2015 and ISO 45001:2018.",
    category: "Company",
  },
  ...certificationEntries,
  {
    title: "Sustainability",
    href: "/sustainability",
    description: "Environmental management, workforce safety and host-community engagement built into every project.",
    category: "Company",
  },
  {
    title: "About",
    href: "/about",
    description: "Enikkom Construction (Pipeline Works) and HDDTEC (Trenchless Operations) — company history and local content.",
    category: "Company",
  },
  ...statementEntries,
  {
    title: "Leadership",
    href: "/management-team",
    description: "Enikkom and HDDTEC's management team.",
    category: "Company",
  },
  ...leadershipEntries,
  {
    title: "Careers",
    href: "/careers",
    description: "Open roles and working life at Enikkom and HDDTEC.",
    category: "Company",
  },
  {
    title: "News & Insights",
    href: "/news-insights",
    description: "Updates on Enikkom and HDDTEC's projects, technology, and industry engagement.",
    category: "Company",
  },
  {
    title: "Resources",
    href: "/resources",
    description: "Capability statement, certifications and compliance policy downloads.",
    category: "Resources",
  },
  {
    title: "Partners",
    href: "/partners",
    description: "Operators and EPC partners Enikkom and HDDTEC work with.",
    category: "Resources",
  },
  ...partnerEntries,
  {
    title: "Contact",
    href: "/contact",
    description: "Submit an RFP or drawing, or reach the Enikkom team directly.",
    category: "Contact",
  },
  ...faqEntries,
];
