export interface BrandEntity {
  id: string;
  name: string;
  fullName: string;
  type: "client" | "partner" | "joint-venture";
  logoSrc?: string;
  badge?: string;
  website?: string;
  imageWrapperClassName?: string;
  imageClassName?: string;
  containerClassName?: string;
  aliases?: string[];
}

export interface BrandDisplay {
  id: string;
  name: string;
  fullName: string;
  logoSrc?: string;
  badge?: string;
  website?: string;
  imageWrapperClassName?: string;
  imageClassName?: string;
  containerClassName?: string;
}

const dangoteTreatment = {
  containerClassName: "rounded-md bg-[#100d5c] shadow-sm",
  imageWrapperClassName: "rounded-md bg-[#100d5c]",
  imageClassName: "scale-105 p-1",
};

export const approvedClientBrands: BrandEntity[] = [
  { id: "spdc", name: "SPDC", fullName: "SPDC", type: "client", logoSrc: "/client-logos/spdc-shell.png" },
  { id: "npdc", name: "NPDC", fullName: "NPDC", type: "client", logoSrc: "/client-logos/npdc.png" },
  {
    id: "nnpc",
    name: "NNPC",
    fullName: "NNPC Limited",
    type: "client",
    logoSrc: "/client-logos/nnpc-new.png",
    aliases: ["nnpc limited"],
  },
  {
    id: "ppmc",
    name: "PPMC",
    fullName: "NNPC / PPMC",
    type: "client",
    logoSrc: "/client-logos/ppmc.png",
    aliases: ["nnpc / ppmc", "nnpc-ppmc"],
  },
  { id: "saipem", name: "Saipem", fullName: "Saipem Nigeria", type: "client", logoSrc: "/client-logos/saipem.png" },
  {
    id: "dangote",
    name: "Dangote",
    fullName: "Dangote Group",
    type: "client",
    logoSrc: "/client-logos/dangote.png",
    ...dangoteTreatment,
  },
  { id: "nipco", name: "NIPCO", fullName: "NIPCO PLC", type: "client", logoSrc: "/client-logos/nipco.png" },
  { id: "ndphc", name: "NDPHC", fullName: "NDPHC", type: "client", logoSrc: "/client-logos/ndphc.png" },
  { id: "oilserv", name: "Oilserv", fullName: "Oilserv Ltd", type: "client", logoSrc: "/client-logos/oilserv.png" },
  { id: "kaztec", name: "Kaztec", fullName: "Kaztec Engineering", type: "client", logoSrc: "/client-logos/kaztec.png" },
  { id: "greengas", name: "Green Gas", fullName: "Green Gas Ltd", type: "client", logoSrc: "/client-logos/greengas.png", aliases: ["green gas"] },
  { id: "zakhem", name: "Zakhem", fullName: "Zakhem Construction", type: "client", logoSrc: "/client-logos/zakhem.png" },
  { id: "morpol", name: "MORPOL", fullName: "MORPOL Engineering", type: "client", logoSrc: "/client-logos/morpol.png" },
  { id: "oando", name: "Oando", fullName: "Oando PLC", type: "client", logoSrc: "/client-logos/oando.png" },
  { id: "willbros", name: "Willbros", fullName: "Willbros West Africa", type: "client", logoSrc: "/client-logos/willbros.svg" },
  { id: "azikel", name: "Azikel", fullName: "Azikel Group", type: "client", logoSrc: "/client-logos/azikel.jpg" },
  { id: "ndpr", name: "NDPR", fullName: "NDPR", type: "client", logoSrc: "/client-logos/ndpr.png" },
  { id: "eni", name: "ENI", fullName: "ENI", type: "client", logoSrc: "/client-logos/eni.png" },
  {
    id: "daewoo",
    name: "Daewoo",
    fullName: "Daewoo Nigeria",
    type: "client",
    logoSrc: "/client-logos/daewoo-nigeria.png",
    aliases: ["daewoo nigeria", "daewoo-nigeria"],
  },
];

export const approvedStrategicPartners: BrandEntity[] = [
  {
    id: "hddthailand",
    name: "HDDThailand Co. Ltd",
    fullName: "HDDThailand Co. Ltd",
    type: "partner",
    logoSrc: "/brand/hddthailand-enikkom-logo.png",
    website: "https://hddthailand.com",
    imageWrapperClassName: "rounded-md bg-white px-2",
    aliases: ["hddthailand", "hdd thailand"],
  },
  {
    id: "oms",
    name: "Ocean Marine Solutions",
    fullName: "Ocean Marine Solutions",
    type: "partner",
    badge: "OMS",
    aliases: ["ocean marine solutions", "ocean marine solutions (oms)"],
  },
];

export const approvedJointVentures: BrandEntity[] = [
  {
    id: "hddtec",
    name: "HDDTEC Ltd",
    fullName: "HDDTEC Ltd",
    type: "joint-venture",
    logoSrc: "/brand/hddtec-logo.svg",
    imageWrapperClassName: "bg-transparent rounded-[0.65rem]",
    aliases: ["hddtec", "hddtec ltd", "hddthailand-enikkom"],
  },
];

export const approvedBrandEntities = [
  ...approvedClientBrands,
  ...approvedStrategicPartners,
  ...approvedJointVentures,
];

export function normalizeBrandKey(value?: string) {
  return (value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function findBrandEntity(value?: string) {
  const normalized = normalizeBrandKey(value);
  if (!normalized) return undefined;

  return approvedBrandEntities.find((entity) => {
    if (entity.id === normalized) return true;
    if (normalizeBrandKey(entity.name) === normalized) return true;
    return (entity.aliases || []).some((alias) => normalizeBrandKey(alias) === normalized);
  });
}

export function resolveBrandDisplay(brand: { id?: string; name?: string; imageUrl?: string }): BrandDisplay {
  const explicitImage = brand.imageUrl?.trim();
  const match = findBrandEntity(brand.id) || findBrandEntity(brand.name);

  return {
    id: match?.id || normalizeBrandKey(brand.id || brand.name) || "brand",
    name: brand.name || match?.name || "Brand",
    fullName: match?.fullName || brand.name || "Brand",
    logoSrc: explicitImage || match?.logoSrc,
    badge: match?.badge,
    website: match?.website,
    imageWrapperClassName: match?.imageWrapperClassName,
    imageClassName: match?.imageClassName,
    containerClassName: match?.containerClassName,
  };
}
