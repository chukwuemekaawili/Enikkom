import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description?: string;
  type?: string;
  name?: string;
}

export default function SEO({ title, description, type, name }: SEOProps) {
  const siteName = "Enikkom Construction";
  const defaultDescription = "Enikkom Construction - Premier provider of HDD, pipeline construction, and civil engineering services in Nigeria.";
  
  const currentTitle = title ? `${title} | ${siteName}` : siteName;
  const currentDescription = description || defaultDescription;
  
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{currentTitle}</title>
      <meta name='description' content={currentDescription} />
      
      {/* Facebook tags */}
      <meta property="og:type" content={type || "website"} />
      <meta property="og:title" content={currentTitle} />
      <meta property="og:description" content={currentDescription} />
      
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name || siteName} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={currentTitle} />
      <meta name="twitter:description" content={currentDescription} />
    </Helmet>
  );
}
