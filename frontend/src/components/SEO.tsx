import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  noindex?: boolean;
  organizationName?: string;
}

export const SEO: FC<SEOProps> = ({ 
  title, 
  description = 'Manage your agency with our modern CRM solution',
  keywords = 'CRM, agency management, employees, clients, projects, revenue',
  ogImage = '/og-image.png',
  noindex = false,
  organizationName = 'Nexuva Agency'
}) => {
  const metaTitle = `${title} | ${organizationName}`;

  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{metaTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph meta tags */}
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      
      {/* Twitter meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Other meta tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#2563eb" />
      {noindex && <meta name="robots" content="noindex" />}
      
      {/* PWA meta tags */}
      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" href="/logo192.png" />
      
      {/* JSON-LD structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: organizationName,
          description,
          url: window.location.origin,
          logo: `${window.location.origin}/logo.png`,
        })}
      </script>
      
      {/* Preconnect to important domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Helmet>
  );
};