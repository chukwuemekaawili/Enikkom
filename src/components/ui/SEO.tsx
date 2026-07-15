import { Helmet } from "react-helmet-async";

interface SEOProps {
  /** Page title. If it already contains "Enikkom" it is used as-is; otherwise
   *  " | Enikkom Construction" is appended. */
  title: string;
  description?: string;
  type?: string;
  name?: string;
  /** Path only, e.g. "/about" — rendered as an absolute canonical + og:url. */
  canonical?: string;
  /** Path or absolute URL for the social share image. */
  image?: string;
  /** Set for utility pages that should not be indexed (search, 404). */
  noindex?: boolean;
}

const SITE_URL = "https://enikkom.com";

export default function SEO({
  title,
  description,
  type,
  name,
  canonical,
  image,
  noindex,
}: SEOProps) {
  const siteName = "Enikkom Construction";
  const defaultDescription =
    "Enikkom Construction, a Nigerian contractor specialising in HDD trenchless crossings, pipeline construction, dredging, piling, and marine civil works.";

  const currentTitle = title
    ? title.includes("Enikkom")
      ? title
      : `${title} | ${siteName}`
    : siteName;
  const currentDescription = description || defaultDescription;
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : undefined;
  const rawImage = image || "/og-image.jpg";
  const imageUrl = rawImage.startsWith("http") ? rawImage : `${SITE_URL}${rawImage}`;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{currentTitle}</title>
      <meta name="description" content={currentDescription} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Facebook / Open Graph */}
      <meta property="og:type" content={type || "website"} />
      <meta property="og:title" content={currentTitle} />
      <meta property="og:description" content={currentDescription} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:image" content={imageUrl} />

      {/* Twitter */}
      <meta name="twitter:creator" content={name || siteName} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={currentTitle} />
      <meta name="twitter:description" content={currentDescription} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
}
