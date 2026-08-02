import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  type?: string;
  image?: string;
  canonical?: string;
  schemaData?: object;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description = "Official portfolio of Nazmul Haque Rafi (NH Rafi). Explore software engineering projects, AI research papers, and architectural vizualizations.",
  keywords = "Nazmul Haque Rafi, NH Rafi, Software Engineer, Researcher, AI, Architectural Visualization, Web Development, Portfolio",
  type = "website",
  image = "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200",
  canonical,
  schemaData
}) => {
  const currentUrl = canonical || (typeof window !== 'undefined' ? window.location.href : '');
  const currentHost = typeof window !== 'undefined' ? window.location.hostname : '';
  const fullTitle = `${title} | NH Rafi`;
  
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {currentUrl && <link rel="canonical" href={currentUrl} />}

      {/* Facebook Meta Tags */}
      {currentUrl && <meta property="og:url" content={currentUrl} />}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      {currentHost && <meta property="twitter:domain" content={currentHost} />}
      {currentUrl && <meta property="twitter:url" content={currentUrl} />}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data (JSON-LD) */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
