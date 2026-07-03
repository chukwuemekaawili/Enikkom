// NOTE: these globs must stay `eager: true`. getAssetUrl() is called
// synchronously during render (see enhanced-image.tsx, used on nearly every
// page) — switching to lazy globs would return loader functions instead of
// URLs and force every image call site onto an async/Suspense path. The
// trade-off is a larger dev/prod module graph; it's deliberate, not oversight.
const logoAssets = import.meta.glob("../assets/images/logos/*.{jpg,jpeg,png,svg}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const currentProjectAssets = import.meta.glob("../assets/images/projects/*.{jpg,jpeg,png}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const legacyProjectAssets = import.meta.glob("../assets/projects/*.{jpg,jpeg,png}", {
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

const teamAssets = import.meta.glob("../assets/images/team/*.{jpg,jpeg,png}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const videoAssets = import.meta.glob("../assets/videos/*.{mp4,webm,mov}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

function findAssetByFileName(
  collections: Array<Record<string, string>>,
  fileName: string,
) {
  for (const collection of collections) {
    const match = Object.entries(collection).find(([path]) => path.endsWith(`/${fileName}`));
    if (match) {
      return match[1];
    }
  }

  return undefined;
}

// Deliberately non-throwing: exactAssetMap below is built by calling this at
// module scope, so a throw here would crash the entire app on import — one
// renamed or deleted image file would white-screen every page, not just the
// one that references it. Warn and fall back to an empty src (the consuming
// <img>/EnhancedImage renders its alt text / fallback UI) instead.
function findRequiredAsset(
  collections: Array<Record<string, string>>,
  fileName: string,
  label: string,
) {
  const asset = findAssetByFileName(collections, fileName);
  if (!asset) {
    console.warn(`[assets] Missing ${label} asset "${fileName}" in bundled collections.`);
    return "";
  }
  return asset;
}

const projectCollections = [
  currentProjectAssets,
  legacyProjectAssets,
];

const teamCollections = [teamAssets];
const equipmentCollections = [currentProjectAssets];
const fallbackCollections = [
  logoAssets,
  ...projectCollections,
  selectedGeneralAssets,
  selectedEquipmentAssets,
  ...teamCollections,
  videoAssets,
];

const exactAssetMap: Record<string, string> = {
  "/src/assets/enikkom-logo-color.png": findRequiredAsset([logoAssets], "enikkom-logo-color.png", "logo"),
  "/src/assets/enikkom-logo-light.png": findRequiredAsset([logoAssets], "enikkom-logo-color.png", "logo"),
  "/src/assets/enikkom-logo-white.png": findRequiredAsset([logoAssets], "enikkom-logo-white.png", "logo"),
  "/src/assets/hero/hero-hdd-rig.jpg": findRequiredAsset(
    [currentProjectAssets],
    "hdd-night-panorama-cropped.jpg",
    "hero",
  ),
  "/src/assets/capabilities/dredging-marine.jpg": findRequiredAsset(
    [currentProjectAssets],
    "service-dredging-vessel.jpg",
    "capability",
  ),
  "/src/assets/capabilities/hdd-drilling.jpg": findRequiredAsset(
    [currentProjectAssets],
    "hdd-night-panorama-cropped.jpg",
    "capability",
  ),
  "/src/assets/projects/brochure-hero.jpg": findRequiredAsset(
    [selectedGeneralAssets],
    "rg-052.jpg",
    "selected general",
  ),
  "/src/assets/projects/careers-team.jpg": findRequiredAsset(
    [currentProjectAssets],
    "careers-team-testing.jpg",
    "project",
  ),
  "/src/assets/projects/contact-office.jpg": findRequiredAsset(
    [selectedEquipmentAssets],
    "eq-006.jpg",
    "selected equipment",
  ),
  "/src/assets/projects/generator-fg-wilson.png": findRequiredAsset(
    [currentProjectAssets],
    "hdd-rig-operation.png",
    "project",
  ),
  "/src/assets/projects/partnership-hddthailand.jpg": findRequiredAsset(
    [selectedGeneralAssets],
    "rg-027.jpg",
    "selected general",
  ),
  "/src/assets/projects/partnership-hddthailand-2.jpg": findRequiredAsset(
    [selectedGeneralAssets],
    "rg-067.jpg",
    "selected general",
  ),
};

const normalizeLegacyAssetPath = (filePath: string): string => {
  const trimmedPath = filePath.trim();

  const replacements: Array<[string, string]> = [
    ["/src/assets/images/logos/", "/src/assets/"],
    ["/src/assets/images/", "/src/assets/"],
    ["src/assets/images/logos/", "/src/assets/"],
    ["src/assets/images/", "/src/assets/"],
    ["@/assets/images/logos/", "/src/assets/"],
    ["@/assets/images/", "/src/assets/"],
    ["@/assets/videos/", "/src/assets/videos/"],
    ["src/assets/videos/", "/src/assets/videos/"],
    ["@/assets/", "/src/assets/"],
    ["src/assets/", "/src/assets/"],
  ];

  for (const [from, to] of replacements) {
    if (trimmedPath.startsWith(from)) {
      return trimmedPath.replace(from, to);
    }
  }

  return trimmedPath;
};

function resolveBundledAsset(normalizedPath: string) {
  const fileName = normalizedPath.split("/").pop();
  if (!fileName) {
    return undefined;
  }

  if (normalizedPath.includes("/projects/")) {
    return findAssetByFileName(projectCollections, fileName);
  }

  if (normalizedPath.includes("/team/")) {
    return findAssetByFileName(teamCollections, fileName);
  }

  if (normalizedPath.includes("/equipment/")) {
    return findAssetByFileName(equipmentCollections, fileName);
  }

  if (normalizedPath.includes("/videos/")) {
    return findAssetByFileName([videoAssets], fileName);
  }

  return findAssetByFileName(fallbackCollections, fileName);
}

export const getAssetUrl = (filePath: string): string => {
  if (!filePath) {
    return filePath;
  }

  const cacheSuffixStart = filePath.search(/[?#]/);
  const pathWithoutCache =
    cacheSuffixStart === -1 ? filePath : filePath.slice(0, cacheSuffixStart);

  // `import.meta.glob(..., { import: "default" })` already returns valid Vite URLs
  // for the curated selected-image folders, so we keep those untouched.
  if (pathWithoutCache.startsWith("/src/assets/images/selected/")) {
    return filePath;
  }

  const normalizedPath = normalizeLegacyAssetPath(pathWithoutCache);

  if (normalizedPath.startsWith("/src/assets/")) {
    const exactMatch = exactAssetMap[normalizedPath];
    if (exactMatch) {
      return exactMatch;
    }

    const resolvedAsset = resolveBundledAsset(normalizedPath);
    if (resolvedAsset) {
      return resolvedAsset;
    }

    console.warn(`[assets] Unable to resolve bundled asset "${normalizedPath}".`);
    return normalizedPath;
  }

  return normalizedPath;
};

export const normalizeAssetUrls = <T>(value: T): T => {
  if (typeof value === "string") {
    return getAssetUrl(value) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => normalizeAssetUrls(item)) as T;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, item]) => [
        key,
        normalizeAssetUrls(item),
      ]),
    ) as T;
  }

  return value;
};
