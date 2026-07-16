// Verified project data from approved Enikkom source documents
export const completedProjects = [
  // HDD Projects
  { year: "2024", client: "MORPOL / SPDC", project: "16\" & 6\" Nun River Dual HDD Crossing", scope: "Dual HDD crossing under Nun River", location: "Niger Delta", type: "HDD", size: "16\" & 6\"", length: "Dual" },
  { year: "2021", client: "NPDC / ND Western", project: "OML34 Continuous HDD, 10\" × 12km", scope: "Nigeria's longest CHDD, record breaking", location: "Utorogun, Delta State", type: "HDD", size: "10\"", length: "12km" },
  // Phase 1 of the phased OB3 crossing (client-confirmed); later phases in engineering.
  { year: "2021", client: "NGIC", project: "OB3 River Niger 48\" Crossing, Phase 1", scope: "HDD pilot, reaming and Direct Pipe works", location: "River Niger, Nigeria", type: "HDD", size: "48\"", length: "N/A" },
  { year: "2021", client: "ECL / SPDC", project: "Escravos Shore Approach Installation", scope: "Shore crossing pipeline installation", location: "Delta State", type: "Shore Approach", size: "N/A", length: "1.8km" },
  { year: "2015", client: "NNPC / Zakhem", project: "Escravos-Lagos Pipeline System Phase II", scope: "Multiple HDD sections, gas pipeline", location: "Lagos / Ogun State", type: "HDD", size: "36\"", length: "7.2km" },
  { year: "2016", client: "NNPC / PPMC", project: "Atlas Cove-Mosimi 16\" × 3.1km", scope: "Africa's longest single drill, record", location: "Arepo / Imagbon, Ogun State", type: "HDD", size: "16\"", length: "3.1km" },
  { year: "2016", client: "Saipem / SPDC", project: "Otumara-Escravos Bundled HDD Crossing", scope: "Africa's longest bundled crossing, record", location: "Delta State", type: "HDD", size: "12\" + 3\"", length: "2.78km" },
  // Figures per the source experience register: 36" × 1.4km at Ejinrin,
  // completed October 2018, executed for Zakhem / Dangote Fertilizers.
  { year: "2018", client: "Zakhem / Dangote Fertilizer", project: "Dangote Fertilizer 36\" × 1.4km Lagoon Crossing", scope: "Swamp / lagoon HDD crossing", location: "Ejinrin, Lagos Lagoon", type: "HDD", size: "36\"", length: "1.4km" },
  { year: "2016", client: "Zakhem / NGC", project: "Ekiadolor Deep Valley Crossing", scope: "Africa's deepest HDD crossing, 80m depth", location: "Edo State", type: "HDD", size: "36\"", length: "1.3km" },
  { year: "2010", client: "Daewoo / SPDC", project: "Yenagoa 40\" HDD Crossing", scope: "Largest pipeline crossing in Nigeria, record", location: "Bayelsa State", type: "HDD", size: "40\"", length: "760m" },
  { year: "2003", client: "NNPC", project: "First HDD Crossing of the River Niger", scope: "Pioneer HDD project, first in Nigeria", location: "Nigeria", type: "HDD", size: "16\"", length: "1.0km" },

  // Pipeline Projects
  { year: "2025", client: "SPDC", project: "Gbaran Phase 3b, UZU CPF Upgrade", scope: "EPC pipeline construction", location: "Bayelsa State", type: "Pipeline", size: "16\"", length: "8km & 10km" },
  { year: "2021", client: "NPDC / ND Western", project: "OML34 CHDD Pipeline", scope: "EPC, 10\" pipeline associated with CHDD", location: "Delta State", type: "Pipeline", size: "10\"", length: "12km" },
  { year: "2015", client: "NDPHC / Zakhem", project: "Calabar Gas Transmission Pipeline", scope: "Gas transmission pipeline", location: "Cross River State", type: "Pipeline", size: "24\"", length: "21.5km" },
  { year: "2009", client: "NIPCO", project: "NIPCO Gas Distribution Network", scope: "Multi-diameter gas distribution network", location: "Multiple Locations", type: "Pipeline", size: "4\" / 8\" / 12\"", length: "50km" },

  // Dredging & Piling
  { year: "2021", client: "NPDC", project: "OML34 Dredging & Cofferdam Works", scope: "Cofferdam installation and dredging", location: "Delta State", type: "Dredging", size: "N/A", length: "N/A" },

  // Facilities
  { year: "2023", client: "NIPCO", project: "NIPCO Ibafo Depot, Phase 2 & 3", scope: "Depot upgrade and tank farm works", location: "Ogun State", type: "Facilities", size: "N/A", length: "N/A" },
  { year: "2009", client: "NIPCO", project: "NIPCO Ibafo Depot, Phase 1", scope: "Initial depot construction", location: "Ogun State", type: "Facilities", size: "N/A", length: "N/A" },
];

export const projectTypes = ["All", "HDD", "Pipeline", "Shore Approach", "Dredging", "Facilities"];
