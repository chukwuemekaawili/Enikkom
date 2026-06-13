import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const helperDirectories = {
  currentProjectImage: "src/assets/images/projects",
  selectedGeneralImage: "src/assets/images/selected/general",
  selectedEquipmentImage: "src/assets/images/selected/equipment",
  selectedRecentImage: "src/assets/images/selected/recent",
  selectedProjectImage: "src/assets/images/selected/projects",
  teamImage: "src/assets/images/team",
};

const filesToScan = [
  "src/content/siteImageSelections.ts",
  "src/content/projectImageSelections.ts",
  "src/content/brandRegistry.ts",
  "src/lib/assetMap.ts",
];
const generatedManifestRelativePath = "src/generated/imageManifest.ts";

const bannedPatterns = [
  "/_review/",
];

const missingAssets = [];
const bannedMatches = [];
const missingGeneratedAssets = [];

for (const relativeFilePath of filesToScan) {
  const absoluteFilePath = path.join(root, relativeFilePath);
  const content = fs.readFileSync(absoluteFilePath, "utf8");

  const helperPattern =
    /(currentProjectImage|selectedGeneralImage|selectedEquipmentImage|selectedRecentImage|selectedProjectImage|teamImage)\("([^"]+)"\)/g;

  for (const match of content.matchAll(helperPattern)) {
    const [, helperName, fileName] = match;
    const assetDirectory = helperDirectories[helperName];
    const assetPath = path.join(root, assetDirectory, fileName);
    if (!fs.existsSync(assetPath)) {
      missingAssets.push(`${relativeFilePath}: ${helperName}("${fileName}") -> ${assetDirectory}/${fileName}`);
    }
  }

  for (const bannedPattern of bannedPatterns) {
    if (content.includes(bannedPattern)) {
      bannedMatches.push(`${relativeFilePath}: contains "${bannedPattern}"`);
    }
  }
}

const generatedManifestPath = path.join(root, generatedManifestRelativePath);
if (!fs.existsSync(generatedManifestPath)) {
  missingGeneratedAssets.push(
    `${generatedManifestRelativePath}: missing generated manifest (run "npm run images:generate")`,
  );
} else {
  const manifestContent = fs.readFileSync(generatedManifestPath, "utf8");
  const importPattern = /^import\s+\w+\s+from\s+"([^"]+)";$/gm;

  for (const match of manifestContent.matchAll(importPattern)) {
    const [, importPath] = match;
    const resolvedImportPath = path.resolve(path.dirname(generatedManifestPath), importPath);
    if (!fs.existsSync(resolvedImportPath)) {
      missingGeneratedAssets.push(
        `${generatedManifestRelativePath}: import "${importPath}" -> missing file`,
      );
    }
    if (importPath.includes("/_review/")) {
      bannedMatches.push(`${generatedManifestRelativePath}: imports "${importPath}"`);
    }
  }
}

if (missingAssets.length > 0 || missingGeneratedAssets.length > 0 || bannedMatches.length > 0) {
  console.error("Image configuration validation failed.");

  if (missingAssets.length > 0) {
    console.error("\nMissing assets:");
    for (const item of missingAssets) {
      console.error(`- ${item}`);
    }
  }

  if (missingGeneratedAssets.length > 0) {
    console.error("\nMissing generated image artifacts:");
    for (const item of missingGeneratedAssets) {
      console.error(`- ${item}`);
    }
  }

  if (bannedMatches.length > 0) {
    console.error("\nBlocked legacy/review references:");
    for (const item of bannedMatches) {
      console.error(`- ${item}`);
    }
  }

  process.exit(1);
}

console.log("Image configuration validation passed.");
