/**
 * Homepage content (static, no backend).
 *
 * SOURCES (in-repo, company-supplied): src/content/companyProfile.ts,
 * src/pages/AboutPage.tsx (history timeline), src/pages/ProjectsPage.tsx
 * (project specs), src/pages/HSEQualityPage.tsx (QHSE figures), and the asset
 * pipelines. Figures here mirror those sourced values, nothing is invented.
 * Anything still unverified ships as a [[PLACEHOLDER: …]] token.
 */
import { siteImageSelections, selectedRecentImage } from "./siteImageSelections";
import { getProjectImage } from "./projectImageSelections";

export const PH = (label: string) => `[[PLACEHOLDER: ${label}]]`;

const projImg = (slug: string) =>
  getProjectImage(slug, "projectList") ||
  getProjectImage(slug, "projectGallery") ||
  getProjectImage(slug, "hero") ||
  getProjectImage(slug, "homeFeature");

export const contact = {
  phone: "+234 803 508 2614",
  phoneHref: "tel:+2348035082614",
  email: "info@enikkom.com",
  rfpEmail: "info@enikkom.com",
  address: "Plot 2 Isaac John Street, Ikeja GRA, Lagos, Nigeria",
  capabilityStatement: "/downloads/Enikkom_Company_Profile.pdf",
} as const;

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}
export interface NavMenu {
  label: string;
  href: string;
  items: NavLink[];
}

export const navMenus: NavMenu[] = [
  {
    label: "Capabilities",
    href: "/capabilities",
    items: [
      { label: "Horizontal Directional Drilling", href: "/capabilities/hdd" },
      { label: "Pipeline & Flowline Construction", href: "/capabilities/pipelines-flowlines" },
      { label: "Dredging & Piling", href: "/capabilities/dredging-piling" },
      { label: "Production Facilities", href: "/capabilities/facilities" },
      { label: "Pipeline Security & Monitoring", href: "/capabilities/pipeline-security" },
      { label: "Project Management & Support", href: "/capabilities/project-management" },
      { label: "View all capabilities", href: "/capabilities" },
    ],
  },
  {
    label: "Projects",
    href: "/projects",
    items: [
      { label: "Selected Projects", href: "/projects" },
      { label: "Flagship Case Study", href: "/projects/atlas-cove-mosimi" },
      { label: "View all projects", href: "/projects" },
    ],
  },
  {
    label: "QHSE",
    href: "/hse-quality",
    items: [
      { label: "Quality", href: "/hse-quality" },
      { label: "Safety", href: "/hse-quality" },
      { label: "Security", href: "/hse-quality" },
      { label: "Community Management", href: "/hse-quality" },
      { label: "Certifications", href: "/hse-quality" },
      { label: "Download policies", href: "/resources" },
    ],
  },
  {
    label: "About",
    href: "/about",
    items: [
      { label: "Enikkom Construction, Pipeline Works", href: "/about" },
      { label: "HDDTEC, Trenchless Operations", href: "/about" },
      { label: "Local Content & Indigenous Capacity", href: "/about" },
      { label: "Leadership", href: "/management-team" },
    ],
  },
];

/** Dual-brand: one group, two delivery arms. */
export const brand = {
  hddtecLogo: "/brand/hddtec-logo.svg",
  microcopy: "Enikkom Construction: Pipeline Works  |  HDDTEC: Trenchless Operations",
} as const;

export interface Kpi {
  value: string;
  label: string;
}

/** Above-fold trust strip, sourced from the company history + QHSE records. */
export const kpis: Kpi[] = [
  { value: "30+", label: "Years of industry experience" },
  { value: "100+", label: "Kilometres of HDD installed" },
  { value: "500+", label: "Skilled workforce" },
  { value: "5M+", label: "Safe man-hours" },
  { value: "Zero", label: "Lost-time-injury record" },
];

export interface Capability {
  key: string;
  name: string;
  proof: string;
  href: string;
  image: string;
}

export const capabilities: Capability[] = [
  {
    key: "hdd",
    name: "Horizontal Directional Drilling",
    proof: "Trenchless river, road and swamp crossings up to 48-inch diameter and 12 km continuous drives.",
    href: "/capabilities/hdd",
    image: siteImageSelections.home.capabilityCards.hdd,
  },
  {
    key: "pipelines",
    name: "Pipeline & Flowline Construction",
    proof: "100+ km of transmission and distribution pipeline installed, welded, coated and tied-in.",
    href: "/capabilities/pipelines-flowlines",
    image: siteImageSelections.home.capabilityCards.pipelines,
  },
  {
    key: "dredging",
    name: "Dredging & Piling",
    proof: "Channel dredging, shore approach and marine piling for difficult-terrain corridors.",
    href: "/capabilities/dredging-piling",
    image: siteImageSelections.home.capabilityCards.dredging,
  },
  {
    key: "facilities",
    name: "Production Facilities",
    proof: "Onshore and offshore flowlines, wellheads and integrated production facilities.",
    href: "/capabilities/facilities",
    image: siteImageSelections.home.capabilityCards.facilities,
  },
  {
    key: "security",
    name: "Pipeline Security & Monitoring",
    proof: "Right-of-way surveillance and integrity monitoring across active pipeline corridors.",
    href: "/capabilities/pipeline-security",
    image: siteImageSelections.services.security,
  },
  {
    key: "pm",
    name: "Project Management & Support",
    proof: "Single-point EPCI delivery: engineering, procurement, fabrication, construction and installation.",
    href: "/capabilities/project-management",
    image: siteImageSelections.capabilities.projectManagement,
  },
];

export interface Achievement {
  value: string;
  label: string;
  context: string;
}

/** Record achievements, sourced benchmarks. */
export const achievements: Achievement[] = [
  {
    value: "3.1 km",
    label: "Africa's longest single HDD drill",
    context: '16" Arepo/Imagbon line, Atlas Cove-Mosimi pipeline (completed April 2016).',
  },
  {
    value: "12 km",
    label: "Nigeria's longest Continuous HDD",
    context: '10" OML34 continuous drive delivered for NPDC (2021).',
  },
  {
    value: '48"',
    label: "Largest-diameter river crossing",
    context: "OB3 River Niger 48-inch Direct Pipe installation.",
  },
];

export interface Project {
  name: string;
  location: string;
  challenge: string;
  result: string;
  image: string;
  href: string;
  feature?: boolean;
  method?: string;
  terrain?: string;
}

/** Featured projects, names, locations and specs sourced from ProjectsPage. */
export const projects: Project[] = [
  {
    name: "OML34 Continuous HDD",
    location: "Utorogun, Delta State",
    challenge: 'Installed a 10" line as a single continuous bore, Nigeria\'s longest CHDD.',
    result: '10" × 12 km',
    image: projImg("oml34-chdd") as string,
    href: "/projects/oml34-chdd",
    feature: true,
    method: "Continuous HDD",
  },
  {
    name: "Dangote Fertilizer Lagoon Crossing",
    location: "Ejirin, Lagos Lagoon",
    challenge: "Swamp / lagoon crossing for Dangote Fertilizer through soft, variable ground.",
    result: '36" × 2 km',
    image: projImg("dangote-lagoon") as string,
    href: "/projects/dangote-lagoon",
    method: "HDD",
    terrain: "Swamp / lagoon",
  },
  {
    name: "Yenagoa 40\" HDD Crossing",
    location: "Bayelsa State",
    challenge: "Heavy-diameter crossing, the largest pipeline crossing in Nigeria.",
    result: '40" × 760 m',
    image: projImg("yenagoa-40-crossing") as string,
    href: "/projects/yenagoa-40-crossing",
    method: "HDD",
  },
  {
    name: "Otumara-Escravos Bundled HDD",
    location: "Delta State",
    challenge: 'Bundled 12"+3" multi-line HDD crossing for Saipem / SPDC.',
    result: "2.78 km bundled",
    image: projImg("otumara-escravos") as string,
    href: "/projects/otumara-escravos",
    method: "HDD (bundled)",
    terrain: "Swamp",
  },
];

export const flagship = {
  name: "Atlas Cove-Mosimi, 16\" × 3.1 km HDD",
  client: "NNPC / PPMC",
  image: (getProjectImage("atlas-cove-mosimi", "homeFeature") ||
    getProjectImage("atlas-cove-mosimi", "hero")) as string,
  challenge:
    "Install a 16-inch line across the Arepo/Imagbon corridor as a single continuous HDD bore, the longest single drill attempted in Africa.",
  method:
    "Executed in April 2016 as one continuous drive, setting the African record for single-drill length while maintaining a zero lost-time-injury record.",
  metrics: [
    { value: '16"', label: "Pipe diameter" },
    { value: "3.1 km", label: "Single drill length" },
    { value: "2016", label: "Completed" },
    { value: "Zero LTI", label: "Safety outcome" },
  ],
  href: "/projects/atlas-cove-mosimi",
} as const;

export interface Certification {
  code: string;
  name: string;
  file?: string;
}

/** Certifications held (achieved 2015 per company history). */
export const certifications: Certification[] = [
  { code: "ISO 9001:2015", name: "Quality Management", file: "/downloads/compliance/hddtec-iso-9001-2015-certificate.jpeg" },
  { code: "ISO 14001:2015", name: "Environmental Management" },
  { code: "ISO 45001:2018", name: "Occupational Health & Safety" },
  { code: "DPR / NUPRC", name: "Regulatory permits", file: "/downloads/compliance/dpr-nuprc-permits-2026-merged.pdf" },
];

export interface QhseMetric {
  value: string;
  label: string;
}

export const qhse = {
  metrics: [
    { value: "Zero", label: "Lost-time injuries on record" },
    { value: "5M+", label: "Safe man-hours delivered" },
    { value: "3", label: "ISO management systems certified" },
  ] as QhseMetric[],
  policies: [
    { label: "Quality Policy Statement", file: "/downloads/compliance/quality-policy-statement.pdf" },
    { label: "Safety Policy", file: "/downloads/compliance/safety-policy.pdf" },
    { label: "Security Policy", file: "/downloads/compliance/security-policy.pdf" },
    { label: "Community Management Policy", file: "/downloads/compliance/community-management-policy.pdf" },
  ],
} as const;

export const fpic = {
  points: [
    {
      title: "Regulatory confidence",
      body: "Indigenous capacity that aligns with NOGICD / NCDMB local-content expectations and reduces approval risk.",
    },
    {
      title: "Community licence to operate",
      body: "FPIC-in-practice host-community engagement that keeps corridors open and schedules protected.",
    },
    {
      title: "Lower disruption risk",
      body: "Embedded local relationships reduce the access, security and stoppage risks that delay critical infrastructure.",
    },
  ],
} as const;

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: "What size and type of crossings can you deliver?",
    a: "We deliver HDD crossings and pipeline construction across a wide range of diameters and lengths, to date up to 48-inch diameter and 12 km continuous drives. Share your corridor and we will confirm feasibility.",
  },
  {
    q: "Which regions do you operate in?",
    a: "We operate across Nigeria, with delivered projects in Delta, Lagos, Ogun, Bayelsa, Cross River, Edo and the wider Niger Delta, spanning onshore, swamp and shore-approach environments.",
  },
  {
    q: "Can you support IOC, NOC and EPC procurement processes?",
    a: "Yes. We work as a contractor and EPCI partner to operators including Shell, Dangote, NNPC and Saipem, and can provide prequalification documentation, a capability statement, and compliance records on request.",
  },
  {
    q: "What are your safety and quality standards?",
    a: "Our management systems are certified to ISO 9001:2015, ISO 14001:2015 and ISO 45001:2018, backed by a zero lost-time-injury record and 5M+ safe man-hours. Policies are available to download below.",
  },
  {
    q: "How early should we engage you on a project?",
    a: "As early as the feasibility or FEED stage. Early engagement lets us de-risk the crossing design, access and schedule before commitments are locked in.",
  },
  {
    q: "How do we submit drawings or an RFP?",
    a: `Email your drawings, alignment sheets or RFP to ${contact.email} and our technical team will respond. A full request route is below.`,
  },
];

/**
 * Recent operations, a "live now" signal drawn from on-site photography of
 * current works (2026). Captions describe the visible activity only, with no
 * unverified location or client claims.
 */
export interface RecentOp {
  image: string;
  category: string;
  caption: string;
}
export const recentOps: RecentOp[] = [
  {
    image: selectedRecentImage("op-02.jpg"),
    category: "HDD",
    caption: "Directional drilling rig on station for a live trenchless crossing.",
  },
  {
    image: selectedRecentImage("op-01.jpg"),
    category: "HDD",
    caption: "HDD spread mobilised to a new project front.",
  },
  {
    image: selectedRecentImage("op-04.jpg"),
    category: "Pipelines",
    caption: "Pipe-laying along a built-up road corridor.",
  },
  {
    image: selectedRecentImage("op-05.jpg"),
    category: "Pipelines",
    caption: "Crew stringing and aligning line pipe on a live corridor.",
  },
  {
    image: selectedRecentImage("op-07.jpg"),
    category: "Trenchless",
    caption: "Entry-side works supporting a crossing under live infrastructure.",
  },
  {
    image: selectedRecentImage("op-08.jpg"),
    category: "Pipelines",
    caption: "Excavation and pipe installation in a constrained urban setting.",
  },
];

/** Client / partner logos shipping in /public/client-logos (documented clients). */
export const clientLogos: { slug: string; src: string }[] = [
  "nnpc-new.png", "spdc-shell.png", "saipem.png", "dangote.png", "oando.png", "oilserv.png",
  "ppmc.png", "npdc.png", "ndphc.png", "nipco.png", "eni.png", "daewoo-nigeria.png",
  "kaztec.png", "zakhem.png", "morpol.png", "greengas.png", "azikel.jpg", "ndpr.png",
].map((file) => ({ slug: file.replace(/\.[^.]+$/, ""), src: `/client-logos/${file}` }));
