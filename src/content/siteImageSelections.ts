const currentProjectAssets = import.meta.glob("../assets/images/projects/*.{jpg,jpeg,png}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const selectedGeneralAssets = import.meta.glob("../assets/images/selected/general/*.{jpg,jpeg,png}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const selectedEquipmentAssets = import.meta.glob("../assets/images/selected/equipment/*.{jpg,jpeg,png}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const selectedRecentAssets = import.meta.glob("../assets/images/selected/recent/*.{jpg,jpeg,png,jpeg}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const teamAssets = import.meta.glob("../assets/images/team/*.{jpg,jpeg,png}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

interface AssetLookupOptions {
  label: string;
  fallbackKey: string;
}

function getAsset(modules: Record<string, string>, key: string, options: AssetLookupOptions) {
  const asset = modules[key];
  if (asset) {
    return asset;
  }

  const fallbackAsset = modules[options.fallbackKey];
  if (fallbackAsset) {
    console.warn(
      `[assets] Missing ${options.label} asset "${key}". Falling back to "${options.fallbackKey}".`,
    );
    return fallbackAsset;
  }

  throw new Error(`No assets available for ${options.label}. Requested: ${key}`);
}

export function currentProjectImage(name: string) {
  return getAsset(currentProjectAssets, `../assets/images/projects/${name}`, {
    label: "project",
    fallbackKey: "../assets/images/projects/hdd-night-panorama-cropped.jpg",
  });
}

export function selectedGeneralImage(name: string) {
  return getAsset(selectedGeneralAssets, `../assets/images/selected/general/${name}`, {
    label: "selected general",
    fallbackKey: "../assets/images/selected/general/rg-121.jpeg",
  });
}

export function selectedEquipmentImage(name: string) {
  return getAsset(selectedEquipmentAssets, `../assets/images/selected/equipment/${name}`, {
    label: "selected equipment",
    fallbackKey: "../assets/images/selected/equipment/eq-021.jpg",
  });
}

export function selectedRecentImage(name: string) {
  return getAsset(selectedRecentAssets, `../assets/images/selected/recent/${name}`, {
    label: "selected recent",
    fallbackKey: "../assets/images/selected/recent/im-033.jpeg",
  });
}

export function teamImage(name: string) {
  return getAsset(teamAssets, `../assets/images/team/${name}`, {
    label: "team",
    fallbackKey: "../assets/images/team/03-team-photo-engr-edward-amene.png",
  });
}

export interface GallerySelection {
  image: string;
  title: string;
  category: string;
  description: string;
}

export const siteImageSelections = {
  home: {
    heroSlides: [
      selectedGeneralImage("rg-121.jpeg"),
      selectedGeneralImage("rg-101.jpg"),
      selectedGeneralImage("rg-086.jpg"),
      selectedGeneralImage("rg-054.jpg"),
    ],
    capabilityCards: {
      hdd: currentProjectImage("cap_hdd.jpg"),
      pipelines: selectedGeneralImage("rg-061.jpg"),
      dredging: selectedGeneralImage("rg-143.jpeg"),
      facilities: currentProjectImage("home-facilities-wellhead.jpg"),
    },
    introMosaic: {
      main: selectedGeneralImage("rg-067.jpg"),
      fieldLeadership: selectedGeneralImage("rg-063.jpg"),
      riverDelivery: selectedGeneralImage("rg-125.jpeg"),
      finalBlock: currentProjectImage("cinematic_hero.jpg"),
    },
  },
  about: {
    hero: selectedGeneralImage("about-aerial-site-enhanced.png"),
    introMain: selectedGeneralImage("about-site-equipment-enhanced.png"),
    introSideField: selectedGeneralImage("about-field-team-enhanced.png"),
    introSideRiver: selectedGeneralImage("about-pipe-yard-enhanced.png"),
    missionBlock: selectedGeneralImage("about-safety-briefing-enhanced.png"),
  },
  services: {
    hero: selectedGeneralImage("rg-142.jpeg"),
    hdd: selectedRecentImage("im-040.png"),
    pipelines: currentProjectImage("cap_pipeline.jpg"),
    dredging: currentProjectImage("service-dredging-vessel.jpg"),
    facilities: currentProjectImage("service-facilities-installation.png"),
    projectManagement: selectedGeneralImage("rg-067.jpg"),
    security: currentProjectImage("service-subsurface-detector.jpg"),
  },
  capabilities: {
    hero: selectedGeneralImage("rg-103.jpg"),
    hdd: currentProjectImage("cap_hdd.png"),
    pipelines: selectedGeneralImage("rg-100.jpg"),
    dredging: currentProjectImage("cap_dredging.jpg"),
    facilities: currentProjectImage("service-facilities-installation.png"),
    projectManagement: selectedEquipmentImage("eq-010.jpg"),
    security: selectedGeneralImage("rg-141.jpeg"),
  },
  careers: {
    hero: currentProjectImage("careers-team-field.jpg"),
    culture: currentProjectImage("careers-team-testing.jpg"),
  },
  companyIntro: {
    hero: selectedGeneralImage("rg-094.jpg"),
  },
  completedProjects: {
    hero: selectedGeneralImage("rg-095.jpg"),
  },
  contact: {
    hero: selectedGeneralImage("about-field-team-enhanced.png"),
  },
  equipment: {
    hero: selectedEquipmentImage("eq-021.jpg"),
    support: currentProjectImage("hdd-rig-operation.png"),
  },
  hddEquipment: {
    hero: selectedEquipmentImage("eq-016.jpg"),
    support: selectedEquipmentImage("eq-025.jpg"),
  },
  gallery: {
    hero: selectedGeneralImage("rg-093.jpg"),
    items: [
      {
        image: selectedRecentImage("im-033.jpeg"),
        title: "Pilot Bore Progress",
        category: "HDD",
        description: "Pilot-hole drilling operations with the trenchless spread fully deployed on site.",
      },
      {
        image: selectedRecentImage("im-036.jpeg"),
        title: "Pullback Operations",
        category: "HDD",
        description: "Pipe pullback sequence underway with the line controlled through the final installation corridor.",
      },
      {
        image: currentProjectImage("hdd-drill-string.jpg"),
        title: "Drill String Assembly",
        category: "HDD",
        description: "Drill string preparation and handling ahead of major crossing operations.",
      },
      {
        image: selectedGeneralImage("rg-126.jpeg"),
        title: "Roadside HDD Spread",
        category: "HDD",
        description: "Compact drilling spread configured for highway and utility corridor work.",
      },
      {
        image: selectedGeneralImage("rg-033.jpg"),
        title: "Pipe Yard Logistics",
        category: "Pipelines",
        description: "Pipe storage, handling, and sequencing prepared for transmission-line construction.",
      },
      {
        image: selectedGeneralImage("rg-055.jpg"),
        title: "Pipe Logistics Transfer",
        category: "Pipelines",
        description: "Steel line pipe being loaded and transferred for field installation.",
      },
      {
        image: currentProjectImage("pipe-welding.png"),
        title: "Field Welding Works",
        category: "Pipelines",
        description: "Pipeline welding operations executed to project specification in active field conditions.",
      },
      {
        image: selectedGeneralImage("rg-098.jpg"),
        title: "Fabricated Pipe Strings",
        category: "Pipelines",
        description: "Prepared and coated line pipe staged for mobilisation and tie-in works.",
      },
      {
        image: currentProjectImage("jetty-construction.jpg"),
        title: "Jetty Construction Front",
        category: "Shore Approach",
        description: "Marine and shoreline works supporting offshore-to-onshore connection activities.",
      },
      {
        image: selectedGeneralImage("rg-045.jpg"),
        title: "Marine Heavy Lift Spread",
        category: "Marine Civil",
        description: "Heavy-lift marine equipment deployed to support nearshore civil works.",
      },
      {
        image: currentProjectImage("dredging-marine.png"),
        title: "Dredging Support Works",
        category: "Marine Civil",
        description: "Channel support and waterborne site access works for difficult terrain delivery.",
      },
      {
        image: selectedEquipmentImage("eq-022.jpg"),
        title: "DD1100 Power Pack Systems",
        category: "Equipment",
        description: "High-capacity HDD power-pack systems configured for heavy trenchless execution.",
      },
      {
        image: selectedEquipmentImage("eq-023.jpg"),
        title: "DD625 Rig & Control Cabin",
        category: "Equipment",
        description: "Integrated DD625 rig spread with control cabin and support modules ready for deployment.",
      },
      {
        image: selectedEquipmentImage("eq-024.jpg"),
        title: "DD625 Power Pack Modules",
        category: "Equipment",
        description: "Dedicated HDD power-pack modules staged in the yard for trenchless mobilisation.",
      },
      {
        image: currentProjectImage("safety-signage.jpg"),
        title: "Site Safety Controls",
        category: "HSE",
        description: "Visible exclusion-zone controls and safety signage reinforcing disciplined site execution.",
      },
      {
        image: selectedGeneralImage("rg-031.jpg"),
        title: "Field Safety Coordination",
        category: "HSE",
        description: "Crew coordination and toolbox-style engagement before execution begins.",
      },
      {
        image: currentProjectImage("tripping-safety.jpg"),
        title: "Tripping Operations Safety",
        category: "HSE",
        description: "Safe drill-string handling practices maintained during active trenchless operations.",
      },
    ] satisfies GallerySelection[],
  },
  hse: {
    hero: selectedGeneralImage("rg-079.jpg"),
    briefing: currentProjectImage("workers-ppe.jpg"),
  },
  sustainability: {
    hero: selectedGeneralImage("rg-038.jpg"),
  },
  newsInsights: {
    hero: selectedGeneralImage("rg-105.jpg"),
  },
  management: {
    hero: teamImage("02-hero-management-team-hero-background.png"),
    photos: {
      edwardAmene: teamImage("03-team-photo-engr-edward-amene.png"),
      saleemKhan: teamImage("04-team-photo-engr-saleem-ahmad-khan.png"),
      francisAnatogu: teamImage("05-team-photo-mr-francis-anatogu.png"),
      adekunleAdewole: teamImage("06-team-photo-adekunle-adewole-phd.png"),
      uzomaNwagboso: teamImage("13-team-photo-uzoma-nwagboso.jpeg"),
      chibuikeNwachukwu: teamImage("09-team-photo-idigbor-emeka-fca.png"),
      teddyAllen: teamImage("08-team-photo-teddy-allen.png"),
      idigborEmeka: teamImage("12-idigbor-emeka.png"),
      biodunAdefila: teamImage("10-team-photo-biodun-adefila.png"),
      kenJames: teamImage("11-team-photo-ken-james.png"),
    },
  },
  partners: {
    hero: selectedGeneralImage("rg-027.jpg"),
  },
  projectMap: {
    hero: selectedGeneralImage("rg-128.jpeg"),
  },
  resources: {
    hero: selectedGeneralImage("rg-052.jpg"),
  },
  testimonials: {
    hero: selectedGeneralImage("rg-131.jpeg"),
  },
} as const;
