import React from 'react';
import { QRScanner } from '../features/scanner/QRScanner';
import { SEOHead } from '../components/SEOHead';
import { AdSensePlaceholder } from '../components/AdSensePlaceholder';
import { ShieldCheck, Camera, Upload, Lock, CheckCircle2 } from 'lucide-react';

export const ScannerPage: React.FC = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Online QR Code Scanner - QRCodeGenix',
    description: 'Free online browser-based QR code scanner. Scan with your webcam or decode uploaded image files directly on your device with 100% privacy.',
    url: 'https://qrcodegenix.com/qr-code-scanner',
  };

  return (
    <div className="page-wrapper scanner-page">
      <SEOHead
        title="Online QR Code Scanner – Camera & Image Decoder | QRCodeGenix"
        description="Scan and decode QR codes instantly in your browser with your camera or by uploading image files. Free, secure, client-side, with zero server uploads."
        canonicalPath="/qr-code-scanner"
        schema={schema}
      />

      <AdSensePlaceholder slot="top-banner" className="hero-top-ad" />

      <div className="container py-4">
        {/* Scanner Component */}
        <QRScanner />

        {/* Informational SEO Guide */}
        <section className="tool-content-section mt-5">
          <div className="content-readable-block">
            <h2 className="content-h2">How to Scan QR Codes on PC, Mac, or Mobile</h2>
            <p className="content-paragraph">
              QRCodeGenix offers a fast, client-side QR code scanner that functions directly within your modern web browser. Whether you want to scan a physical printed code using your computer’s webcam or decode a QR image screenshot saved on your phone, you can decode the data in milliseconds without downloading native apps.
            </p>

            <div className="principles-grid my-4">
              <div className="principle-card">
                <div className="principle-icon">
                  <Camera size={22} className="text-primary" />
                </div>
                <h3>Camera Scanning</h3>
                <p>
                  Click &quot;Start Camera&quot;, grant browser camera permission, and hold any QR code up to your lens. The scanner analyzes video frames in real time and decodes the content as soon as it detects a valid matrix.
                </p>
              </div>

              <div className="principle-card">
                <div className="principle-icon">
                  <Upload size={22} className="text-primary" />
                </div>
                <h3>Image & Screenshot Upload</h3>
                <p>
                  Drop any PNG, JPG, or WebP screenshot into the scanner area. The image data is inspected directly in browser memory without ever uploading to any cloud server.
                </p>
              </div>

              <div className="principle-card">
                <div className="principle-icon">
                  <Lock size={22} className="text-success" />
                </div>
                <h3>100% Local Privacy</h3>
                <p>
                  Neither your camera frames nor your uploaded photos leave your machine. Decoding runs entirely on your CPU using HTML5 Canvas and mathematical barcode decoding.
                </p>
              </div>

              <div className="principle-card">
                <div className="principle-icon">
                  <ShieldCheck size={22} className="text-primary" />
                </div>
                <h3>Safe Link Inspection</h3>
                <p>
                  We never automatically redirect you to unknown or potentially harmful links. The full destination URL is displayed clearly so you can inspect it before deciding to open it.
                </p>
              </div>
            </div>

            <h3 className="content-h3">Tips for Best Scanning Accuracy</h3>
            <ul className="best-practices-list">
              <li>
                <CheckCircle2 size={16} className="text-success inline-icon" />
                <span>Ensure proper lighting: Avoid glare and heavy reflections on shiny screens or glossy paper.</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="text-success inline-icon" />
                <span>Keep the camera steady and hold the QR code parallel to the camera lens.</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="text-success inline-icon" />
                <span>If scanning high-density QR codes (like full vCards), move slightly closer so the small module pixels are sharp and in focus.</span>
              </li>
            </ul>
          </div>
        </section>
      </div>

      <AdSensePlaceholder slot="bottom-banner" className="mid-page-ad" />
    </div>
  );
};
