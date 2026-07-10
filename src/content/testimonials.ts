// Client testimonials, reproduced from the approved source document
// (resources/eclweb/Enikkom_Redesign_2026/ECL Group Website content Part b/
// H1.9 - Testimonials.docx). Only clients and wording present in that document
// appear here; project references are cross-checked against
// src/content/completedProjects.ts. No individual authors, titles, or ratings
// are asserted, as none are given in the source.
//
// `projectSlug` links a quote to the detail page it is shown on, but only where
// a documented client→project match exists (Saipem → Otumara-Escravos,
// Dangote → the lagoon/swamp crossing). The remaining quotes appear only in the
// projects-index band, since the source names no specific project for them.

export interface Testimonial {
  quote: string;
  client: string;
  project: string;
  projectSlug?: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "We would like to compliment ENIKKOM Construction on the outstanding job on the just concluded 36\" × 1.5km swamp/river crossing. Their presence and work ethic has really made a huge impact. Impressive drilling work done by your team.",
    client: "Dangote Fertilizer Limited (DFL)",
    project: "36\" × 1.5 km swamp/river crossing",
    projectSlug: "dangote-lagoon",
  },
  {
    quote:
      "ECL has now successfully completed a number of crossings using the Horizontal Directional Drilling (HDD) method on behalf of ZCL. We have found their team to be refreshingly co-operative and attentive. ECL brings a level of client-side understanding to each and every project they are engaged on, which helps us to include ENIKKOM as the preferred contractor of choice when considering all projects. We have no hesitation in recommending ECL for the services they provide.",
    client: "Zakhem Construction Nigeria Limited",
    project: "Horizontal Directional Drilling crossings",
  },
  {
    quote:
      "We are delighted with our experience of working with ENIKKOM over the duration of our project. We have found all staff, from senior management down to the site delivery team, to be friendly, cooperative, helpful and very professional. It was a pleasure working with the team and we will definitely look forward to our next project together.",
    client: "Saipem Contracting Nigeria Limited",
    project: "Otumara-Escravos bundled HDD crossing",
    projectSlug: "otumara-escravos",
  },
  {
    quote:
      "Enikkom has provided Horizontal Directional Drilling services to our company, having satisfied our requirements for efficient work. This was made easy as the company had the right equipment and team despite the difficult terrain.",
    client: "Gramen Petroserve Nigeria Limited",
    project: "Horizontal Directional Drilling services",
  },
];
