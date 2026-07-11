import { currentProjectImage } from "@/content/siteImageSelections";

const selectedProjectAssets = import.meta.glob("../assets/images/selected/projects/*.{jpg,jpeg,png}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

function selectedProjectImage(name: string) {
  const key = `../assets/images/selected/projects/${name}`;
  const asset = selectedProjectAssets[key];
  if (asset) {
    return asset;
  }

  const fallbackKey = "../assets/images/selected/projects/pa-046.jpg";
  const fallbackAsset = selectedProjectAssets[fallbackKey];
  if (fallbackAsset) {
    console.warn(
      `[assets] Missing selected project image "${key}". Falling back to "${fallbackKey}".`,
    );
    return fallbackAsset;
  }

  throw new Error(`No selected project images are available. Requested: ${key}`);
}

export interface ProjectImageSet {
  hero?: string;
  homeFeature?: string;
  homeRecord?: string;
  projectList?: string;
  projectGallery?: string;
  projectMap?: string;
  interactiveMap?: string;
  related?: string;
  gallery: string[];
}

export const projectImageSelections: Record<string, ProjectImageSet> = {
  "oml34-chdd": {
    hero: selectedProjectImage("pa-046.jpg"),
    homeFeature: currentProjectImage("proj_oml34.jpg"),
    homeRecord: selectedProjectImage("pa-043.jpg"),
    projectList: currentProjectImage("scope-operations.jpg"),
    projectGallery: currentProjectImage("scope-operations-2.jpg"),
    projectMap: selectedProjectImage("pa-054.jpg"),
    interactiveMap: selectedProjectImage("pa-055.jpg"),
    related: currentProjectImage("scope-operations-3.jpg"),
    gallery: [
      currentProjectImage("proj_oml34.jpg"),
      selectedProjectImage("pa-043.jpg"),
      currentProjectImage("scope-operations-2.jpg"),
      currentProjectImage("scope-operations-3.jpg"),
    ],
  },
  "dangote-lagoon": {
    hero: selectedProjectImage("pa-080.jpg"),
    homeFeature: currentProjectImage("proj_lekki.jpg"),
    projectList: currentProjectImage("lekki-gas-pipeline.jpg"),
    projectGallery: selectedProjectImage("pa-063.jpg"),
    projectMap: selectedProjectImage("pa-067.jpg"),
    interactiveMap: selectedProjectImage("pa-074.jpg"),
    gallery: [
      currentProjectImage("proj_lekki.jpg"),
      selectedProjectImage("pa-063.jpg"),
      selectedProjectImage("pa-067.jpg"),
      selectedProjectImage("pa-074.jpg"),
    ],
  },
  "atlas-cove-mosimi": {
    hero: currentProjectImage("atlas-cove-mosimi.jpg"),
    homeFeature: currentProjectImage("proj_atlas_v2.jpg"),
    homeRecord: selectedProjectImage("pp-043.jpg"),
    projectList: currentProjectImage("atlas-cove-mosimi-2.jpg"),
    projectGallery: selectedProjectImage("pp-045.jpg"),
    projectMap: selectedProjectImage("pp-048.jpg"),
    gallery: [
      currentProjectImage("proj_atlas_v2.jpg"),
      selectedProjectImage("pp-043.jpg"),
      selectedProjectImage("pp-045.jpg"),
      selectedProjectImage("pp-048.jpg"),
    ],
  },
  "otumara-escravos": {
    hero: selectedProjectImage("pp-061.jpg"),
    homeRecord: selectedProjectImage("pp-060.jpg"),
    projectList: currentProjectImage("otumara-escravos-2.jpg"),
    projectGallery: currentProjectImage("otumara-escravos.jpg"),
    projectMap: selectedProjectImage("pp-062.jpg"),
    gallery: [
      selectedProjectImage("pp-060.jpg"),
      selectedProjectImage("pp-062.jpg"),
      currentProjectImage("otumara-escravos-2.jpg"),
      currentProjectImage("otumara-escravos.jpg"),
    ],
  },
  "yenagoa-40-crossing": {
    hero: currentProjectImage("hero_river_crossing.jpg"),
    homeRecord: selectedProjectImage("pp-021.jpg"),
    projectList: selectedProjectImage("pp-017.jpg"),
    projectGallery: selectedProjectImage("pp-024.jpg"),
    gallery: [
      selectedProjectImage("pp-017.jpg"),
      selectedProjectImage("pp-021.jpg"),
      selectedProjectImage("pp-024.jpg"),
    ],
  },
  "elps-phase-2": {
    hero: selectedProjectImage("pp-040.jpg"),
    projectList: currentProjectImage("pipe-laying-crane.jpg"),
    projectGallery: selectedProjectImage("pp-034.jpg"),
    projectMap: selectedProjectImage("pp-038.jpg"),
    interactiveMap: currentProjectImage("drilling-ops-6.jpg"),
    related: currentProjectImage("drilling-ops-5.jpg"),
    gallery: [
      selectedProjectImage("pp-034.jpg"),
      selectedProjectImage("pp-038.jpg"),
      currentProjectImage("drilling-ops-6.jpg"),
      currentProjectImage("drilling-ops-8.jpg"),
    ],
  },
  "ob3-river-niger": {
    hero: selectedProjectImage("pa-129.jpg"),
    projectList: selectedProjectImage("pa-126.jpg"),
    projectGallery: selectedProjectImage("pa-103.jpg"),
    projectMap: selectedProjectImage("pa-105.jpg"),
    interactiveMap: selectedProjectImage("pa-110.jpg"),
    related: selectedProjectImage("pa-121.jpg"),
    gallery: [
      selectedProjectImage("pa-103.jpg"),
      selectedProjectImage("pa-105.jpg"),
      selectedProjectImage("pa-110.jpg"),
      selectedProjectImage("pa-121.jpg"),
      selectedProjectImage("pa-126.jpg"),
    ],
  },
  "ekiadolor-deep-valley": {
    hero: currentProjectImage("drilling-site-2.jpg"),
    homeRecord: currentProjectImage("drilling-ops-5.jpg"),
    // Own hero shot; drilling-ops-7 was shared with river-niger-historic's card
    projectList: currentProjectImage("drilling-site-2.jpg"),
    projectGallery: currentProjectImage("drilling-ops-4.jpg"),
    projectMap: currentProjectImage("drilling-ops-6.jpg"),
    interactiveMap: currentProjectImage("drilling-ops-5.jpg"),
    related: currentProjectImage("hdd-equipment-fleet-3.jpg"),
    gallery: [
      currentProjectImage("drilling-site-2.jpg"),
      currentProjectImage("drilling-ops-4.jpg"),
      currentProjectImage("drilling-ops-6.jpg"),
      currentProjectImage("drilling-ops-7.jpg"),
    ],
  },
  "nipco-gas-distribution": {
    hero: currentProjectImage("nipco-ibafo.jpg"),
    projectList: currentProjectImage("nipco-pipeline.jpg"),
    projectGallery: currentProjectImage("nipco-ibafo-2.jpg"),
    projectMap: selectedProjectImage("pp-071.jpg"),
    interactiveMap: selectedProjectImage("pp-072.jpg"),
    related: selectedProjectImage("pp-075.jpg"),
    gallery: [
      currentProjectImage("nipco-ibafo-2.jpg"),
      currentProjectImage("nipco-ibafo-3.jpg"),
      selectedProjectImage("pp-071.jpg"),
      selectedProjectImage("pp-072.jpg"),
      selectedProjectImage("pp-075.jpg"),
    ],
  },
  "calabar-gas-transmission": {
    hero: selectedProjectImage("pp-059.jpg"),
    projectList: selectedProjectImage("pp-056.jpg"),
    projectGallery: selectedProjectImage("pp-057.jpg"),
    gallery: [
      selectedProjectImage("pp-056.jpg"),
      selectedProjectImage("pp-057.jpg"),
    ],
  },
  "river-niger-historic": {
    hero: currentProjectImage("hdd-rig-night.jpg"),
    // Own hero shot; drilling-ops-7 was shared with ekiadolor's card
    projectList: currentProjectImage("hdd-rig-night.jpg"),
    projectGallery: currentProjectImage("drilling-ops-6.jpg"),
    projectMap: currentProjectImage("drilling-ops-5.jpg"),
    interactiveMap: currentProjectImage("drilling-ops-4.jpg"),
    related: currentProjectImage("hdd-team-1.jpg"),
    gallery: [
      currentProjectImage("drilling-ops-7.jpg"),
      currentProjectImage("drilling-ops-6.jpg"),
      currentProjectImage("hdd-team-1.jpg"),
    ],
  },
  "gbaran-phase-3b": {
    projectList: selectedProjectImage("pp-009.jpg"),
    projectGallery: selectedProjectImage("pp-010.jpg"),
    interactiveMap: selectedProjectImage("pp-011.jpg"),
    gallery: [
      selectedProjectImage("pp-009.jpg"),
      selectedProjectImage("pp-010.jpg"),
      selectedProjectImage("pp-011.jpg"),
    ],
  },
  "nun-river-dual-hdd": {
    projectList: selectedProjectImage("pa-131.jpg"),
    projectGallery: selectedProjectImage("pa-133.jpg"),
    gallery: [
      selectedProjectImage("pa-131.jpg"),
      selectedProjectImage("pa-133.jpg"),
    ],
  },
  "escravos-shore-approach": {
    projectList: currentProjectImage("shore-approach.jpg"),
    projectGallery: selectedProjectImage("pp-051.jpg"),
    projectMap: selectedProjectImage("pp-053.jpg"),
    gallery: [
      selectedProjectImage("pp-051.jpg"),
      selectedProjectImage("pp-053.jpg"),
      selectedProjectImage("pp-055.jpg"),
    ],
  },
};

export function getProjectSlugFromHref(href?: string) {
  if (!href) return "";
  return href.replace(/^\/projects\//, "").trim();
}

export function getProjectImage(
  slugOrHref: string,
  role: Exclude<keyof ProjectImageSet, "gallery">,
) {
  const slug = slugOrHref.startsWith("/projects/")
    ? getProjectSlugFromHref(slugOrHref)
    : slugOrHref;

  return projectImageSelections[slug]?.[role];
}

export function getProjectGalleryImages(slugOrHref: string) {
  const slug = slugOrHref.startsWith("/projects/")
    ? getProjectSlugFromHref(slugOrHref)
    : slugOrHref;

  return projectImageSelections[slug]?.gallery ?? [];
}

export const interactiveProjectImageSelections: Record<string, string | undefined> = {
  "Dangote Fertilizer Lagoon Crossing": getProjectImage("dangote-lagoon", "interactiveMap"),
  "Otumara-Escravos River Crossing": getProjectImage("otumara-escravos", "projectMap"),
  "Atlas Cove-Mosimi 16\" × 3.1km (Arepo)": getProjectImage("atlas-cove-mosimi", "projectGallery"),
  "Ekiadolor Deep Valley Crossing": getProjectImage("ekiadolor-deep-valley", "interactiveMap"),
  "OML34, 10\" × 12km Continuous HDD": getProjectImage("oml34-chdd", "interactiveMap"),
  "Yenagoa 40\" Road/River/Pond Crossing": getProjectImage("yenagoa-40-crossing", "projectGallery"),
  "OB3 River Niger, 48\" Direct Pipe Installation": getProjectImage("ob3-river-niger", "interactiveMap"),
  "ELGP Phase II - Multiple HDD Crossings": getProjectImage("elps-phase-2", "interactiveMap"),
  "Ibafo Gas Distribution Phase 1": currentProjectImage("nipco-ibafo.jpg"),
  "Ibafo Gas Distribution Phase 2": currentProjectImage("nipco-ibafo-2.jpg"),
  "Calabar River & Uruan River Crossings": getProjectImage("calabar-gas-transmission", "projectGallery"),
  "Liverpool River HDD Crossing": getProjectImage("river-niger-historic", "projectGallery"),
  "Sambreiro River HDD Crossing": getProjectImage("river-niger-historic", "projectList"),
  "Calabar Pipeline - 7 River Crossings": getProjectImage("calabar-gas-transmission", "projectList"),
  "Apapa Oando Jetty HDD": selectedProjectImage("pp-063.jpg"),
  "Atlas Cove-Mosimi 16\" x 1.9km (Ijeododo)":
    getProjectImage("atlas-cove-mosimi", "homeRecord") || getProjectImage("atlas-cove-mosimi", "projectGallery"),
  "Benin City Gas Distribution (50km)": getProjectImage("nipco-gas-distribution", "projectMap"),
  "Ango to Auntie Julie Pipeline": selectedProjectImage("pp-051.jpg"),
  "Adanga to Calabar Gas Pipeline": selectedProjectImage("pp-057.jpg"),
  "Trans Niger Pipeline Loopline (TNPL)": selectedProjectImage("pp-071.jpg"),
  "Geregu Gas Supply Pipeline (50km Section)": selectedProjectImage("pp-072.jpg"),
  "Ogbele-Rumuji Pipeline": selectedProjectImage("pp-072.jpg"),
  "Gbaran Ubie NIPP Lot 2": selectedProjectImage("pp-010.jpg"),
  "Oredo-POOC Gas Pipeline": selectedProjectImage("pp-034.jpg"),
  "Itoro to Ibeshi Gas Pipeline": selectedProjectImage("pp-075.jpg"),
  "Gaslink Phase II - Tin-Can to Amuwo Odofin": getProjectImage("nipco-gas-distribution", "projectList"),
  "Ajaokuta Pipeline (Obajana Cement)": selectedProjectImage("pp-075.jpg"),
  "Abeokuta Gas Pipeline": currentProjectImage("swamp-pipeline.png"),
  "Lagos-Badagry Pipeline Relocation": currentProjectImage("nipco-pipeline.jpg"),
  "ELGP Phase II - Road Crossings": selectedProjectImage("pp-034.jpg"),
  "ELGP Phase I - Warri to Oben Road Crossings": getProjectImage("elps-phase-2", "projectGallery"),
  "Geregu Phase II - Road & Rail Crossings": selectedProjectImage("pp-009.jpg"),
  "Bonny Island Road Crossings": selectedProjectImage("pp-011.jpg"),
  "West African Gas Pipeline - Ghana": selectedProjectImage("pp-010.jpg"),
  "ELGP Phase I - Benin-Warri Expressway": getProjectImage("elps-phase-2", "projectMap"),
};
