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

const selectedProjectAssets = import.meta.glob("../assets/images/selected/projects/*.{jpg,jpeg,png}", {
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

export function selectedProjectImage(name: string) {
  return getAsset(selectedProjectAssets, `../assets/images/selected/projects/${name}`, {
    label: "selected project",
    fallbackKey: "../assets/images/selected/projects/pp-063.jpg",
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
    fallbackKey: "../assets/images/team/03-team-photo-engr-edward-amene.jpg",
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
      selectedGeneralImage("pl-14.jpg"),
      selectedGeneralImage("pl-08.jpg"),
      selectedGeneralImage("pl-10.jpg"),
      selectedGeneralImage("pl-15.jpg"),
    ],
    capabilityCards: {
      hdd: currentProjectImage("cap_hdd_v2.jpg"),
      pipelines: selectedGeneralImage("pl-03.jpg"),
      dredging: selectedGeneralImage("pl-dredging-piling.jpg"),
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
    // pl-16: worker on a large casing pipe against open sky — brightest
    // on-topic hero frame (the old aerial read too dark, lum ~80).
    hero: selectedGeneralImage("pl-16.jpg"),
    introMain: selectedGeneralImage("about-site-equipment-enhanced.jpg"),
    introSideField: selectedGeneralImage("about-field-team-enhanced.jpg"),
    introSideRiver: selectedGeneralImage("about-pipe-yard-enhanced.jpg"),
    missionBlock: selectedGeneralImage("about-safety-briefing-enhanced.jpg"),
  },
  services: {
    hero: selectedGeneralImage("pl-04.jpg"),
    hdd: currentProjectImage("hero-hdd.jpg"),
    pipelines: selectedGeneralImage("pl-09.jpg"),
    dredging: currentProjectImage("dredging-hero.jpg"),
    facilities: currentProjectImage("service-facilities-installation.jpg"),
    projectManagement: selectedGeneralImage("rg-067.jpg"),
    security: currentProjectImage("service-subsurface-detector.jpg"),
  },
  capabilities: {
    hero: selectedGeneralImage("pl-08.jpg"),
    hdd: currentProjectImage("cap_hdd.jpg"),
    pipelines: selectedGeneralImage("pl-03.jpg"),
    dredging: currentProjectImage("cap_dredging.jpg"),
    facilities: currentProjectImage("service-facilities-installation.jpg"),
    projectManagement: selectedGeneralImage("pl-projectmgmt-review.jpg"),
    security: selectedGeneralImage("rg-141.jpeg"),
  },
  careers: {
    hero: selectedGeneralImage("pl-06.jpg"),
    culture: currentProjectImage("careers-team-testing.jpg"),
  },
  companyIntro: {
    hero: selectedGeneralImage("rg-094.jpg"),
  },
  completedProjects: {
    hero: selectedGeneralImage("pl-11.jpg"),
  },
  contact: {
    hero: selectedGeneralImage("about-field-team-enhanced.jpg"),
  },
  equipment: {
    hero: selectedEquipmentImage("eq-029.jpg"),
    support: currentProjectImage("hdd-rig-operation.jpg"),
  },
  hddEquipment: {
    hero: currentProjectImage("hero-hdd-rig.jpg"),
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
        image: selectedProjectImage("pp-063.jpg"),
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
      {
        image: selectedGeneralImage("pl-08.jpg"),
        title: "Pipe Bend Installation Lift",
        category: "Pipelines",
        description: "Crawler crane lifting a large-radius pipe bend into position during transmission-line installation.",
      },
      {
        image: selectedGeneralImage("pl-02.jpg"),
        title: "Pipeline Right-of-Way",
        category: "Pipelines",
        description: "Coated line pipe strung along the cleared right-of-way ahead of lowering-in and tie-in works.",
      },
      {
        image: selectedGeneralImage("pl-12.jpg"),
        title: "Large-Diameter Section Lift",
        category: "Pipelines",
        description: "Heavy crane lift positioning a large-diameter pipe section under close supervision.",
      },
      {
        image: selectedGeneralImage("pl-11.jpg"),
        title: "Crane-Assisted Pipe Lift",
        category: "Pipelines",
        description: "Crawler crane handling a full pipe string across the working corridor.",
      },
      {
        image: selectedGeneralImage("pl-13.jpg"),
        title: "Field Engineering Review",
        category: "Pipelines",
        description: "Site engineers reviewing execution sequence alongside a fabricated pipe section.",
      },
      {
        image: selectedGeneralImage("pl-01.jpg"),
        title: "Lowering-In Operations",
        category: "Pipelines",
        description: "Coated pipe guided into the open trench during controlled lowering-in works.",
      },
      {
        image: selectedGeneralImage("pl-15.jpg"),
        title: "Trenching & Excavation",
        category: "Pipelines",
        description: "Excavation spread opening the pipeline trench across difficult delta terrain.",
      },
      {
        image: selectedGeneralImage("pl-18.jpg"),
        title: "Night Welding Operations",
        category: "HSE",
        description: "Continuous welding works carried out under controlled night-shift conditions.",
      },
      {
        image: selectedGeneralImage("pl-21.jpg"),
        title: "Joint Preparation & Grinding",
        category: "HSE",
        description: "Surface preparation and grinding of a field joint ahead of welding and coating.",
      },
      {
        image: selectedEquipmentImage("eq-026.jpg"),
        title: "Crawler Crane & Power Spread",
        category: "Equipment",
        description: "Tracked lifting crane and supporting power spread mobilised to the construction front.",
      },
      {
        image: selectedEquipmentImage("eq-027.jpg"),
        title: "Excavation Plant",
        category: "Equipment",
        description: "Hydraulic excavator working the trench line within the pipeline corridor.",
      },
      {
        image: selectedEquipmentImage("eq-028.jpg"),
        title: "Heavy-Lift Crane Fleet",
        category: "Equipment",
        description: "Heavy crawler crane staged with branded site logistics for major lifting operations.",
      },
      {
        image: selectedRecentImage("op-01.jpg"),
        title: "HDD Rig Mobilisation",
        category: "HDD",
        description: "Directional drilling rig mobilised to site for a recent trenchless crossing.",
      },
      {
        image: selectedRecentImage("op-02.jpg"),
        title: "Directional Drilling Spread",
        category: "HDD",
        description: "Active HDD drilling spread deployed on a current pipeline crossing.",
      },
      {
        image: selectedRecentImage("op-04.jpg"),
        title: "Urban Pipeline Crossing",
        category: "Pipelines",
        description: "Pipe installation along a built-up road corridor on a recent project.",
      },
      {
        image: selectedRecentImage("op-07.jpg"),
        title: "Trenchless Crossing Works",
        category: "HDD",
        description: "Entry-side works supporting a directional drilling crossing under live infrastructure.",
      },
    ] satisfies GallerySelection[],
  },
  hse: {
    hero: selectedGeneralImage("pl-19.jpg"),
    briefing: currentProjectImage("workers-ppe.jpg"),
  },
  sustainability: {
    hero: selectedGeneralImage("rg-038.jpg"),
  },
  newsInsights: {
    hero: selectedGeneralImage("rg-105.jpg"),
  },
  management: {
    hero: teamImage("02-hero-management-team-hero-background.jpg"),
    photos: {
      edwardAmene: teamImage("03-team-photo-engr-edward-amene.jpg"),
      saleemKhan: teamImage("04-team-photo-engr-saleem-ahmad-khan.jpg"),
      francisAnatogu: teamImage("05-team-photo-mr-francis-anatogu.jpg"),
      adekunleAdewole: teamImage("06-team-photo-adekunle-adewole-phd.jpg"),
      uzomaNwagboso: teamImage("13-team-photo-uzoma-nwagboso.jpeg"),
      chibuikeNwachukwu: teamImage("09-team-photo-mr-chibuike-nwachukwu.jpg"),
      teddyAllen: teamImage("08-team-photo-teddy-allen.jpg"),
      idigborEmeka: teamImage("12-idigbor-emeka.jpg"),
      biodunAdefila: teamImage("10-team-photo-biodun-adefila.jpg"),
      kenJames: teamImage("11-team-photo-ken-james.jpg"),
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
