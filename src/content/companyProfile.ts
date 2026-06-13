// Source documents:
// - ECLweb/Enikkom_Redesign_2026/ECL Group Website Content Part A/1.0 - ABOUT US.docx
// - ECLweb/Enikkom_Redesign_2026/ECL Group Website Content Part A/1.1 - COMPANY INTRODUCTION.docx
// - ECLweb/05 - ORGANIZATIONAL CAPACITY/5.1 - Enikkom Group Orgnaizational Structure.pdf

export const companyIntroduction = {
  eyebrow: "Official Company Profile",
  title: "Company Introduction",
  lead:
    "Enikkom Group is a leading engineering, procurement, fabrication, construction, and installation (EPCI) company, providing end-to-end project management and support services for onshore and offshore flowlines, pipelines, and facilities. Leveraging decades of industry experience, we deliver precise, innovative, and sustainable technical solutions across Nigeria.",
  body: [
    "As a wholly owned subsidiary of Enikkom Investment Services Nigeria Limited (EISNL), established in 1995, Enikkom Group draws from a rich pool of highly skilled professionals, modern equipment, and tailored services to deliver bespoke infrastructure solutions nationwide. Our resilience, technical depth, and commitment to excellence distinguish us as a trusted partner in Nigeria's oil and gas sector.",
  ],
  subsidiaries: [
    {
      name: "Enikkom Construction Limited (ECL)",
      paragraphs: [
        "Incorporated in March 2009, Enikkom Construction Limited (ECL) was established to focus exclusively on pipeline construction and associated infrastructure works. ECL was established as a result of the realization of the huge opportunities which the pipeline construction business presents in Nigeria and the need to setup a dedicated company for the purpose of exploiting these opportunities.",
        "ECL is recognized as a pioneer in Horizontal Directional Drilling (HDD) in Nigeria, completing the first HDD crossing of the River Niger in 2003.",
      ],
    },
    {
      name: "HDDThailand - Enikkom Limited",
      paragraphs: [
        "To further strengthen its HDD and trenchless technology capacity, ECL partnered with HDDThailand Co. Ltd, a global leader in trenchless solutions with over 15 years of international experience. This collaboration gave rise to HDDThailand-Enikkom Limited, a specialist infrastructure company focused on advanced HDD and pipeline construction services.",
        "Through this partnership, the company combines over 22 years of Nigerian HDD experience (via ECL) with global best practices and innovations from HDDThailand, delivering world-class trenchless technology solutions to the oil and gas industry.",
      ],
    },
  ],
} as const;

export const corporateStatements = [
  {
    key: "mission",
    title: "Mission",
    text: "To be the benchmark of excellence in engineering and construction solutions in the energy and infrastructure industries",
  },
  {
    key: "vision",
    title: "Vision",
    text: "To create exceptional value for stakeholders through innovation, technology and sustainability; delivered by a high-performing, motivated and engaged workforce",
  },
  {
    key: "corporate-excellence",
    title: "Corporate Excellence",
    text: "Our resilience, technical depth, and commitment to excellence distinguish us as a trusted partner in Nigeria's oil and gas sector.",
  },
] as const;

export const corporateStructureChart = {
  title: "Approved Enikkom Group Organizational Structure",
  description:
    "Official structure chart sourced from the approved organizational capacity submission.",
  imagePath: "/brand/enikkom-group-org-structure.png",
  alt: "Approved Enikkom Group organizational structure chart",
  mobileHint:
    "On smaller screens, swipe horizontally or open the full chart to inspect the structure in detail.",
} as const;
