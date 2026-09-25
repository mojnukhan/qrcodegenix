import React, { useEffect } from 'react';

export interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  schema?: Record<string, unknown>;
}

export const SEOHead: React.FC<SEOProps> = ({
  title,
  description,
  canonicalPath = '',
  schema,
}) => {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Update Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Update Canonical URL
    const fullCanonical = `${window.location.origin}${canonicalPath}`;
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', fullCanonical);

    // 4. Update OpenGraph Tags
    const setMetaTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setMetaTag('og:title', title);
    setMetaTag('og:description', description);
    setMetaTag('og:url', fullCanonical);
    setMetaTag('og:type', 'website');
    setMetaTag('og:site_name', 'QRCodeGenix');

    // 5. Update Twitter Card Tags
    const setTwitterTag = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setTwitterTag('twitter:card', 'summary_large_image');
    setTwitterTag('twitter:title', title);
    setTwitterTag('twitter:description', description);

    // 6. Update JSON-LD structured data
    let scriptTag = document.getElementById('qrcodegenix-jsonld');
    if (schema) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'qrcodegenix-jsonld';
        scriptTag.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schema);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [title, description, canonicalPath, schema]);

  return null;
};
