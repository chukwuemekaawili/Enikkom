import { generatedImageManifest } from "@/generated/imageManifest";

interface ResponsiveImageVariant {
  src: string;
  width: number;
  type: "image/webp";
}

export interface ResponsiveImageInfo {
  width: number;
  height: number;
  webpVariants: ResponsiveImageVariant[];
}

const responsiveImagesByUrl = new Map<string, ResponsiveImageInfo>(
  Object.values(generatedImageManifest).map((record) => [
    record.src,
    {
      width: record.width,
      height: record.height,
      webpVariants: [...record.variants].sort((left, right) => left.width - right.width),
    },
  ]),
);

export function getResponsiveImageInfo(sourceUrl?: string) {
  if (!sourceUrl) {
    return undefined;
  }

  return responsiveImagesByUrl.get(sourceUrl);
}
