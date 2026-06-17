import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  structuredData?: Record<string, any>;
}

export default function SEO({
  title,
  description,
  canonical,
  ogType = "website",
  ogImage = "/apple-touch-icon.png",
  structuredData,
}: SEOProps) {
  useEffect(() => {
    // 1. Set document titles
    document.title = title || "EUROSIA - Cloud Operating Systems App Ecosystem";

    // 2. Set dynamic meta descriptions
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Set Open Graph (OG) values
    const ogTags = {
      'og:title': title,
      'og:description': description,
      'og:type': ogType,
      'og:image': ogImage,
      'og:url': canonical || window.location.href,
    };

    Object.entries(ogTags).forEach(([property, value]) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', value || '');
    });

    // 4. Set Twitter card parameters
    const twitterTags = {
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': ogImage,
    };

    Object.entries(twitterTags).forEach(([name, value]) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', value || '');
    });

    // 5. Append Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical || window.location.href);

    // 6. Inject JSON-LD structured data
    let jsonLdScript = document.getElementById('eurosia-seo-structured-data');
    if (jsonLdScript) {
      jsonLdScript.remove();
    }

    if (structuredData) {
      const script = document.createElement('script');
      script.id = 'eurosia-seo-structured-data';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    return () => {
      // Cleanup structured data on unmount
      const existingScript = document.getElementById('eurosia-seo-structured-data');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [title, description, canonical, ogType, ogImage, structuredData]);

  return null; // Side-effect rendering only
}
