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

/** Home feature cards prefer the curated bright homeFeature frame. */
const featImg = (slug: string) => getProjectImage(slug, "homeFeature") || projImg(slug);

export const contact = {
  phone: "+234 803 508 2614",
  phoneHref: "tel:+2348035082614",
  email: "info@enikkom.com",
  rfpEmail: "info@enikkom.com",
  address: "No 5b Theophilus Orji Street, Lekki Phase 1, Lagos, Nigeria",
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
    label: "Company",
    href: "/about",
    items: [
      { label: "Company overview", href: "/about" },
      { label: "Leadership", href: "/about/leadership" },
      { label: "Partners & affiliates", href: "/partners" },
      { label: "Careers", href: "/careers" },
      { label: "Sustainability", href: "/hse-quality#sustainability" },
    ],
  },
  {
    label: "Capabilities",
    href: "/capabilities",
    items: [
      { label: "Capabilities overview", href: "/capabilities" },
      { label: "Horizontal directional drilling", href: "/capabilities/hdd" },
      { label: "Pipeline & flowline construction", href: "/capabilities/pipelines-flowlines" },
      { label: "Dredging & piling", href: "/capabilities/dredging-piling" },
      { label: "Production facilities", href: "/capabilities/facilities" },
      { label: "Pipeline security & monitoring", href: "/capabilities/pipeline-security" },
      { label: "Project management & support", href: "/capabilities/project-management" },
    ],
  },
  {
    label: "Projects",
    href: "/projects",
    items: [
      { label: "Featured projects", href: "/projects" },
      { label: "All projects", href: "/projects#record" },
      { label: "Project gallery", href: "/projects#gallery" },
      { label: "Project locations", href: "/projects#map" },
      { label: "Flagship case study", href: "/projects/atlas-cove-mosimi" },
    ],
  },
  {
    label: "Equipment",
    href: "/equipment",
    items: [
      { label: "Fleet overview", href: "/equipment" },
      { label: "HDD & trenchless equipment", href: "/equipment#hdd" },
      { label: "Equipment specifications", href: "/resources" },
    ],
  },
  {
    label: "QHSE",
    href: "/hse-quality",
    items: [
      { label: "QHSE overview", href: "/hse-quality" },
      { label: "Sustainability & community", href: "/hse-quality#sustainability" },
      { label: "Certifications & policies", href: "/resources" },
    ],
  },
];

/**
 * Prefilled request for the QHSE/prequalification credentials pack.
 * Shared by the header and footer so the wording never drifts.
 */
export const qhseCredentialsMailto =
  `mailto:${contact.email}` +
  `?subject=QHSE%20Credentials%20Request` +
  `&body=Organisation%3A%0AProject%20context%3A%0ADocuments%20required%3A`;

/** Dual-brand: one group, two delivery arms. */
export const brand = {
  hddtecLogo: "/brand/hddtec-logo.svg",
  microcopy: "Enikkom Construction: Pipeline Works  |  HDDTEC: Trenchless Operations",
} as const;

/**
 * Single source of truth for the "years of experience" figure. Derived from the
 * 1995 founding (see AboutPage timeline) and expressed conservatively as "30+".
 * Import this everywhere the figure is shown so it never drifts between pages.
 */
export const experienceYears = "30+";

/**
 * One-line track-record figures for the homepage — rendered as a slim plain
 * text row (Shell-style), not stat cards. Values mirror proofMetrics/qhse.
 */
export const homeStats = [
  { value: experienceYears, label: "years in the field" },
  { value: "3.1 km", label: "Africa-record HDD drive" },
  { value: "100+ km", label: "of pipeline installed" },
  { value: "500+", label: "skilled personnel" },
] as const;

export interface FeaturedProject {
  title: string;
  summary: string;
  href: string;
  thumbnail: string;
}

/**
 * The three homepage feature cards. Headlines carry the fact (Shell-style);
 * all figures mirror the verified register entries in proofRecords below.
 */
export const featuredProjects: FeaturedProject[] = [
  {
    title: "Atlas Cove–Mosimi: Africa's longest single HDD drill",
    summary: "A 16-inch line drilled 3.1 km in one drive across the Arepo–Imagbon corridor, Ogun State.",
    href: "/projects/atlas-cove-mosimi",
    thumbnail: featImg("atlas-cove-mosimi") as string,
  },
  {
    title: "OML34: Nigeria's longest continuous HDD",
    summary: "A 10-inch flowline drilled 12 km continuously at Utorogun, Delta State, for NPDC.",
    href: "/projects/oml34-chdd",
    thumbnail: featImg("oml34-chdd") as string,
  },
  {
    title: "Otumara–Escravos: Africa's longest bundled crossing",
    summary: "A 12-inch + 3-inch bundle drilled 2.78 km under the Escravos River for Saipem and SPDC.",
    href: "/projects/otumara-escravos",
    thumbnail: featImg("otumara-escravos") as string,
  },
];

export interface ProofMetric {
  label: string;
  value: string;
  unit?: string;
  /** Provenance line — names the source project or record where one exists. */
  note: string;
  /** Project-record route when the figure is tied to a named archive entry. */
  href?: string;
}

/**
 * Homepage proof ledger — the record benchmarks and track-record figures,
 * rendered as RecordMetric evidence entries (no animated counters). Values
 * mirror the company history, QHSE records, and the /projects register.
 */
export const proofMetrics: ProofMetric[] = [
  {
    label: "Years of field delivery",
    value: experienceYears,
    note: "Established in Lagos in 1995, operating nationwide",
  },
  {
    label: "Longest single HDD drill",
    value: "3.1",
    unit: "km",
    note: 'Atlas Cove–Mosimi, 16", Africa record (2016)',
    href: "/projects/atlas-cove-mosimi",
  },
  {
    label: "Longest continuous HDD",
    value: "12",
    unit: "km",
    note: '10" OML34 drive for NPDC, Nigeria record (2021)',
    href: "/projects/oml34-chdd",
  },
  {
    label: "Largest pipeline crossing",
    value: "40",
    unit: "in",
    note: 'Yenagoa 40" × 760 m, Nigeria record (2010)',
    href: "/projects/yenagoa-40-crossing",
  },
  {
    label: "HDD / pipeline installed",
    value: "100+",
    unit: "km",
    note: "Transmission & distribution lines, welded, coated, tied-in",
  },
  {
    label: "Workforce capacity",
    value: "500+",
    note: "Skilled personnel across active project fronts",
  },
];

export interface Capability {
  key: string;
  /** Field-discipline reference code shown as a mono index, e.g. "D-01" */
  code: string;
  name: string;
  /** What Enikkom executes under this discipline */
  proof: string;
  /** Where it applies — terrain / corridor / delivery context */
  scope: string;
  href: string;
  image: string;
  imageAlt: string;
}

/** Field disciplines — the capability-statement set, in delivery order. */
export const capabilities: Capability[] = [
  {
    key: "hdd",
    code: "D-01",
    name: "HDD & Trenchless Crossings",
    proof: "Horizontal directional drilling for river, road, rail and swamp crossings up to 42-inch diameter and 12 km continuous drives.",
    scope: "Rivers, wetlands, live infrastructure and environmentally sensitive corridors.",
    href: "/capabilities/hdd",
    image: siteImageSelections.home.capabilityCards.hdd,
    imageAlt: "HDD drilling rig working on a remote crossing corridor.",
  },
  {
    key: "pipelines",
    code: "D-02",
    name: "Pipeline & Flowline Construction",
    proof: "Transmission and distribution pipeline installed, welded, coated and tied-in: 100+ km delivered on record.",
    scope: "Onshore, swamp and shore-approach corridors for oil, gas and water.",
    href: "/capabilities/pipelines-flowlines",
    image: siteImageSelections.home.capabilityCards.pipelines,
    imageAlt: "Large-diameter pipeline laid along an active construction corridor.",
  },
  {
    key: "dredging",
    code: "D-03",
    name: "Dredging & Marine Support",
    proof: "Channel dredging, shore approach and marine piling to open and maintain access for difficult-terrain crossings.",
    scope: "Lagoons, river channels and coastal shore approaches.",
    href: "/capabilities/dredging-piling",
    image: siteImageSelections.home.capabilityCards.dredging,
    imageAlt: "Marine dredging and piling equipment operating near a shore approach.",
  },
  {
    key: "facilities",
    code: "D-04",
    name: "Production Facilities & Piling",
    proof: "Onshore and offshore flowlines, wellheads, piling and integrated production facilities.",
    scope: "Wellhead platforms, CPF/flow-station sites and civil foundations.",
    href: "/capabilities/facilities",
    image: siteImageSelections.home.capabilityCards.facilities,
    imageAlt: "Oil and gas production facilities and wellhead infrastructure.",
  },
  {
    key: "security",
    code: "D-05",
    name: "Pipeline Security & Monitoring",
    proof: "Right-of-way surveillance and integrity monitoring to keep corridors open and protected.",
    scope: "Active transmission and distribution pipeline right-of-way.",
    href: "/capabilities/pipeline-security",
    image: siteImageSelections.services.security,
    imageAlt: "Pipeline right-of-way inspection and monitoring activity.",
  },
  {
    key: "pm",
    code: "D-06",
    name: "Project Management & Controls",
    proof: "Single-point EPCI delivery: engineering, procurement, fabrication, construction and installation under one contract.",
    scope: "Feasibility and FEED through construction, testing and hand-over.",
    href: "/capabilities/project-management",
    image: siteImageSelections.capabilities.projectManagement,
    imageAlt: "Project management and field support team coordinating construction works.",
  },
];

export interface ProofRecord {
  title: string;
  href: string;
  location: string;
  /** Key dimensions, e.g. `16" × 3.1 km` — becomes the DIMENSIONS ledger row */
  metric: string;
  /** Technical descriptor; benchmark words auto-earn an amber RECORD stamp */
  metricLabel: string;
  year: string;
  tags: string[];
  thumbnail: string;
}

/**
 * Selected records surfaced from the /projects archive. Titles, dimensions,
 * locations and years mirror the verified register entries on ProjectsPage;
 * nothing here is invented. Rendered with ProjectRecordCard.
 */
export const proofRecords: ProofRecord[] = [
  {
    title: 'Atlas Cove–Mosimi, 16" × 3.1 km',
    href: "/projects/atlas-cove-mosimi",
    location: "Arepo / Imagbon, Ogun State",
    metric: '16" × 3.1 km',
    metricLabel: "Africa's Longest Single HDD Drill",
    year: "2016",
    tags: ["HDD"],
    thumbnail: featImg("atlas-cove-mosimi") as string,
  },
  {
    title: 'OML34 Continuous HDD, 10" × 12 km',
    href: "/projects/oml34-chdd",
    location: "Utorogun, Delta State",
    metric: '10" × 12 km',
    metricLabel: "Nigeria's Longest Continuous HDD",
    year: "2021",
    tags: ["HDD", "CHDD"],
    thumbnail: featImg("oml34-chdd") as string,
  },
  {
    title: '16" & 6" Nun River HDD Crossing',
    href: "/projects/nun-river-dual-hdd",
    location: "Niger Delta, Nigeria",
    metric: '16" & 6"',
    metricLabel: "Dual HDD Crossing, Nun River",
    year: "2024",
    tags: ["HDD"],
    thumbnail: projImg("nun-river-dual-hdd") as string,
  },
  {
    title: 'Yenagoa 40" HDD Crossing',
    href: "/projects/yenagoa-40-crossing",
    location: "Bayelsa State, Nigeria",
    metric: '40" × 760 m',
    metricLabel: "Largest Pipeline Crossing in Nigeria",
    year: "2010",
    tags: ["HDD"],
    thumbnail: projImg("yenagoa-40-crossing") as string,
  },
  {
    title: 'Dangote Fertilizer Lagoon Crossing',
    href: "/projects/dangote-lagoon",
    location: "Ejinrin, Lagos Lagoon",
    metric: '36" × 1.4 km',
    metricLabel: "Swamp / Lagoon HDD Crossing",
    year: "2018",
    tags: ["HDD", "Pipeline"],
    thumbnail: projImg("dangote-lagoon") as string,
  },
];

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
    { value: "3", label: "ISO management systems certified" },
    { value: "30+", label: "Years of operating record" },
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
    a: "We deliver HDD crossings and pipeline construction across a wide range of diameters and lengths, to date up to 42-inch diameter and 12 km continuous drives. Share your corridor and we will confirm feasibility.",
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
    a: "Our management systems are certified to ISO 9001:2015, ISO 14001:2015 and ISO 45001:2018. Policies are available to download below.",
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
  imageAlt: string;
  category: string;
  caption: string;
}
export const recentOps: RecentOp[] = [
  {
    image: selectedRecentImage("op-02.jpg"),
    imageAlt: "Directional drilling rig positioned on a live trenchless crossing site.",
    category: "HDD",
    caption: "Directional drilling rig on station for a live trenchless crossing.",
  },
  {
    image: selectedRecentImage("op-01.jpg"),
    imageAlt: "HDD spread mobilised with equipment and crew at a project front.",
    category: "HDD",
    caption: "HDD spread mobilised to a new project front.",
  },
  {
    image: selectedRecentImage("op-04.jpg"),
    imageAlt: "Pipeline installation along a built-up road corridor.",
    category: "Pipelines",
    caption: "Pipe-laying along a built-up road corridor.",
  },
  {
    image: selectedRecentImage("op-05.jpg"),
    imageAlt: "Crew stringing and aligning line pipe on an active corridor.",
    category: "Pipelines",
    caption: "Crew stringing and aligning line pipe on a live corridor.",
  },
  {
    image: selectedRecentImage("op-07.jpg"),
    imageAlt: "Entry-side trenchless works under live infrastructure.",
    category: "Trenchless",
    caption: "Entry-side works supporting a crossing under live infrastructure.",
  },
  {
    image: selectedRecentImage("op-08.jpg"),
    imageAlt: "Excavation and pipe installation in a constrained urban setting.",
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
