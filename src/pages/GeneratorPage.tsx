import React from 'react';
import { QRGenerator } from '../features/qr/QRGenerator';
import { SEOHead } from '../components/SEOHead';
import { AdSensePlaceholder } from '../components/AdSensePlaceholder';

export const GeneratorPage: React.FC = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'QR Code Generator - QRCodeGenix',
    description: 'Free online QR Code Generator workspace. Create URL, WiFi, WhatsApp, Email, Phone, and Text QR codes with custom styling.',
    url: 'https://qrcodegenix.com/qr-code-generator',
  };

  return (
    <div className="page-wrapper generator-page">
      <SEOHead
        title="Online QR Code Generator – Custom Colors, Logos & High-Res Export | QRCodeGenix"
        description="Generate custom QR codes with our fast browser-based QR maker. Add logos, customize colors, download PNG/SVG, and maintain 100% privacy."
        canonicalPath="/qr-code-generator"
        schema={schema}
      />

      <AdSensePlaceholder slot="top-banner" className="hero-top-ad" />

      <div className="container py-4">
        <QRGenerator
          heading="Online QR Code Studio"
          subheading="Generate, style, and download crisp QR codes for digital and physical use in seconds."
        />
      </div>

      <AdSensePlaceholder slot="bottom-banner" className="mid-page-ad" />
    </div>
  );
};
