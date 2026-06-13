export const equipmentSourceNote =
  "Source documents: ECLweb/09 - EQUIPMENT & FACILITY/Attachment 3.5 - Equipment Owned by ENIKKOM.docx and 9.2 - Equipment Owned by ENIKKOM.pdf.";

export interface HddRigSpec {
  model: string;
  inventoryLabel: string;
  pullbackClass: string;
  thrustRating: string;
  rotaryTorque: string;
  power: string;
  fluidFlow: string;
  year: string;
  quantity: string;
  note: string;
}

export const hddRigSpecs: HddRigSpec[] = [
  {
    model: "American Augers DD-580",
    inventoryLabel: "DD 580 HDD RIG",
    pullbackClass: "300-ton class",
    thrustRating: "580,000 lb (2,580 kN)",
    rotaryTorque: "58,000 ft-lb (88,000 Nm)",
    power: "900 hp (582 kW) Caterpillar diesel",
    fluidFlow: "850 gpm (3,200 L/min)",
    year: "2000",
    quantity: "1",
    note: "Floating Spindle, Pipe Hog triple-jaw wrenches, four-pinion rack and pinion drive.",
  },
  {
    model: "American Augers DD-440",
    inventoryLabel: "DD 440 HDD RIG",
    pullbackClass: "200-ton class",
    thrustRating: "440,000 lb (1,957 kN)",
    rotaryTorque: "60,000 ft-lb (80,000 Nm)",
    power: "600 hp (447 kW) Cummins QSX15",
    fluidFlow: "825 gpm",
    year: "2008",
    quantity: "1",
    note: "Detailed engineering values in the pack are documented on the DD440T platform sheet.",
  },
  {
    model: "American Augers DD-440T",
    inventoryLabel: "DD 440T HDD RIG",
    pullbackClass: "200-ton class",
    thrustRating: "440,000 lb (1,957 kN)",
    rotaryTorque: "60,000 ft-lb (80,000 Nm)",
    power: "600 hp (447 kW) Cummins QSX15",
    fluidFlow: "825 gpm",
    year: "2008",
    quantity: "1",
    note: "200-ton dual-sheet entry with 34 ft Range II pipe and 97 RPM top rotary speed.",
  },
  {
    model: "American Augers DD-1100",
    inventoryLabel: "DD 1100 HDD RIG",
    pullbackClass: "500-ton class",
    thrustRating: "1,100,000 lb (4,893 kN)",
    rotaryTorque: "100,000 ft-lb (135,000 Nm)",
    power: "755 hp (570 kW) Caterpillar C-18",
    fluidFlow: "1,000 gpm (3,785 L/min)",
    year: "2012",
    quantity: "1",
    note: "Dual Power Pack ROOTS system, 34 ft Range II pipe, 4 in fluid course.",
  },
  {
    model: "American Augers DD-1100 RS",
    inventoryLabel: "DD1100R HDD RIG",
    pullbackClass: "500-ton class",
    thrustRating: "1,100,000 lb (4,893 kN)",
    rotaryTorque: "100,000 ft-lb (135,000 Nm)",
    power: "755 hp (570 kW) Caterpillar C-18",
    fluidFlow: "1,000 gpm (3,785 L/min)",
    year: "2013",
    quantity: "1",
    note: "Separate RS fleet entry. The inventory sheet labels this unit DD1100R, which maps to the DD-1100 RS naming used on site.",
  },
  {
    model: "American Augers DD-625",
    inventoryLabel: "DD 625 HDD RIG",
    pullbackClass: "300-ton class",
    thrustRating: "625,000 lb nominal / 660,000 lb max carriage (2,780 / 2,936 kN)",
    rotaryTorque: "80,000 ft-lb (108,460 Nm)",
    power: "600 hp (447 kW) Cummins QSX15",
    fluidFlow: "650-1,000 gpm (2,460-3,785 L/min)",
    year: "2012",
    quantity: "1",
    note: "Source pack includes both the 625,000 lb feature-sheet rating and a 660,000 lb carriage-system rating.",
  },
  {
    model: "American Augers DD-220T",
    inventoryLabel: "DD 220T HDD RIG",
    pullbackClass: "100-ton class",
    thrustRating: "220,000 lb nominal / 240,000 lb max (979 / 1,068 kN)",
    rotaryTorque: "43,900 ft-lb (59,520 Nm) max",
    power: "523 hp (390 kW) MTU 6R1300",
    fluidFlow: "650 gpm (2,460 L/min)",
    year: "2012",
    quantity: "1",
    note: "Triple-jaw wrench, Wiggle Steer system, wireless tramming and Range II pipe compatibility.",
  },
  {
    model: "American Augers DD-100",
    inventoryLabel: "DD 100 HDD RIG",
    pullbackClass: "50-ton class",
    thrustRating: "100,000 lb (445 kN)",
    rotaryTorque: "Detailed torque sheet not supplied",
    power: "2024 inventory entry",
    fluidFlow: "Detailed fluid sheet not supplied",
    year: "2024",
    quantity: "1",
    note: "Latest inventory-listed small rig; detailed OEM sheet is not included in the supplied pack.",
  },
  {
    model: "American Augers DD-600",
    inventoryLabel: "DD 600 HDD RIG",
    pullbackClass: "300-ton class",
    thrustRating: "600,000 lb (2,669 kN)",
    rotaryTorque: "Detailed torque sheet not supplied",
    power: "2025 inventory entry",
    fluidFlow: "Detailed fluid sheet not supplied",
    year: "2025",
    quantity: "1",
    note: "Current Q3-2025 inventory lists DD-600 as a separate 300-ton class addition.",
  },
];

export interface TrenchlessSpec {
  equipment: string;
  make: string;
  rating: string;
  year: string;
  quantity: string;
}

export const thrustBoringSpecs: TrenchlessSpec[] = [
  {
    equipment: "72-1200 NG Thrust Boring Machine",
    make: "American Augers",
    rating: "1,200,000 lb push capacity (5,338 kN)",
    year: "2013",
    quantity: "1",
  },
  {
    equipment: "48/54-G900 Thrust Boring Machine",
    make: "American Augers",
    rating: "900,000 lb push capacity (4,003 kN)",
    year: "2010",
    quantity: "1",
  },
  {
    equipment: "42/48 G600 Thrust Boring Machine",
    make: "American Augers",
    rating: "600,000 lb push capacity (2,669 kN)",
    year: "2010",
    quantity: "1",
  },
  {
    equipment: "36/42 600-Pound Push-Capacity Unit",
    make: "American Augers",
    rating: "600,000 lb push capacity (2,669 kN)",
    year: "2009",
    quantity: "1",
  },
  {
    equipment: "36 340-Pound Thrust Boring Machine",
    make: "American Augers",
    rating: "340,000 lb push capacity (1,512 kN)",
    year: "2008",
    quantity: "1",
  },
  {
    equipment: "24-100 Thrust Boring Machine",
    make: "American Augers",
    rating: "100,000 lb push capacity (445 kN)",
    year: "2004",
    quantity: "1",
  },
];

export const microTunnelingSpecs: TrenchlessSpec[] = [
  {
    equipment: '48" Micro Tunneling Equipment and accessories',
    make: "MTS",
    rating: '48" microtunneling spread',
    year: "2021",
    quantity: "1",
  },
  {
    equipment: "800 Ton Pipe Pusher",
    make: "MTS",
    rating: "800-ton push capacity",
    year: "2021",
    quantity: "1",
  },
  {
    equipment: "750 Ton Herrenknecht Thruster",
    make: "Herrenknecht",
    rating: "750-ton thrust capacity",
    year: "2024",
    quantity: "1",
  },
  {
    equipment: "380 Ton Pipe Pusher",
    make: "Prime Drilling",
    rating: '36"-60" x 380-ton push capacity',
    year: "2015",
    quantity: "1",
  },
];

export interface SupportSystemSpec {
  system: string;
  detail: string;
  quantity: string;
}

export const hddSupportSystems: SupportSystemSpec[] = [
  {
    system: "Drill pipe inventory",
    detail: '5" drill pipes; 6-5/8" S-135 drill pipes in 25 lb/ft (6 km), 27 lb/ft (7 km), and 35 lb/ft (14 km) classes.',
    quantity: "Various / 27 km listed",
  },
  {
    system: "Mud mixing, cleaning and recycling",
    detail: "Juesco MMU mixing units; American Augers MCR-10000, MPR6000, MCM4000, MCT2000, MCS750, and MD1200DH systems.",
    quantity: "14 listed units",
  },
  {
    system: "Mud pumps and tanks",
    detail: "P-600 triplex pumps, P-750 quintiplex pump, Kerr pump, Herrenknecht hydraulic pump, John Deere pump, plus 500-barrel frac tanks.",
    quantity: "10 listed units",
  },
  {
    system: "Specialized HDD tools",
    detail: 'TT Technologies Thumper 24", Prime 24"-48" thruster, Herrenknecht mobile breakout unit, and four grouting rigs.',
    quantity: "7 listed units",
  },
  {
    system: "Reamers and subs",
    detail: 'Inrock BR and FC reamers covering 18"-54", plus XO, Saver, Weeper, Orientation, and Bent subs.',
    quantity: "Various",
  },
  {
    system: "Pipe handling package",
    detail: '20-ton, 15-ton, and 10-ton pipe rollers for 12"-48" pipe, with 24", 36", and 48" roller cradles.',
    quantity: "Various",
  },
];

export interface FleetGroupSpec {
  category: string;
  detail: string;
  quantity: string;
}

export const marineFleetSpecs: FleetGroupSpec[] = [
  {
    category: "Marine barge / support vessel",
    detail: "MV Donaux marine support asset.",
    quantity: "1",
  },
  {
    category: "Cutter suction dredger",
    detail: 'Enikkom Ellicott Dragon Dredger Series 1170-50, 16"/16", MV Kenenna.',
    quantity: "1",
  },
  {
    category: "Cutter suction dredger",
    detail: 'Enikkom Ellicott Dredger Series 670-42, 14"/14", MV Kechikemdi.',
    quantity: "1",
  },
  {
    category: "Swamp marine excavator",
    detail: "Swamp buggy excavator with CAT 320 backhoe.",
    quantity: "6",
  },
];

export const supportFleetSpecs: FleetGroupSpec[] = [
  {
    category: "Piling equipment",
    detail: "ABI 90-ton track vibratory piling hammers (2) and ICE 3117 vibro hammer with power pack (1).",
    quantity: "3",
  },
  {
    category: "Excavator fleet",
    detail: "CAT 320CL (5), 330CL (2), 330DL (4), 325CL (3), CAT 336 (3), Hitachi ZX220LC-GI (12), Hitachi ZX350LCH-5G (3), XMG 350 (5).",
    quantity: "37",
  },
  {
    category: "Swamp buggy and earthmoving",
    detail: "Wilco swamp buggies (6); D7R/D6H dozers (3); CAT 966 loaders (3); CAT 950 wheel loaders (2); CAT 750 grader/rippers (2); Hitachi 950 wheel loaders (2).",
    quantity: "18",
  },
  {
    category: "Sidebooms",
    detail: "40-ton sidebooms (6) and 35-ton sidebooms (4).",
    quantity: "10",
  },
  {
    category: "Compressors and generators",
    detail: "Ingersoll Rand compressors (10), Den Air 13.5 bar / 350 cfm compressors (2), generators 20-500 kVA (14), JMG 250 kVA (8), JMG 150 kVA (12).",
    quantity: "46",
  },
  {
    category: "Welding package",
    detail: 'CRC Evans 16"-24" bending machine (1), Lincoln 450V welding machines (24), grinding machines (6), electric welding machines (60).',
    quantity: "91",
  },
  {
    category: "Cranes",
    detail: "10-ton telescopic cranes (2), 25-ton (2), 30-ton (3), XCMG 120-ton (1), XCMG 50-ton (2), NCK NOVA HC65 (2).",
    quantity: "12",
  },
  {
    category: "Heavy transport and field logistics",
    detail: "Flat-bed trailers, low-bed trailers up to 120 tons, salvage, oil and lube, diesel, water tanker, self-loader, DAF 1800, and Unimog 1300 field buses.",
    quantity: "54",
  },
  {
    category: "Light vehicles",
    detail: "Toyota Hiace buses (12), Hilux 4x4 pickups (30), Land Cruiser field trucks (4), Prado 4x4 (5), and Mercedes G40 medivac vans (6).",
    quantity: "57",
  },
];
