import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { ShieldCheck, Cpu, Download, Sparkles } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="page-wrapper legal-page">
      <SEOHead
        title="About QRCodeGenix – Free, Fast & Private QR Generator"
        description="Learn about QRCodeGenix, our client-side architecture, our privacy-first philosophy, and why we believe QR creation should be fast and free."
        canonicalPath="/about"
      />

      <div className="container py-5">
        <div className="readable-container">
          <div className="page-header text-center mb-5">
            <span className="badge badge-primary-light badge-sm mb-2">Our Mission</span>
            <h1 className="page-title">About QRCodeGenix</h1>
            <p className="page-lead">
              QRCodeGenix is a free online QR Code toolkit designed to make QR creation simple, fast, customizable, and accessible to everyone worldwide.
            </p>
          </div>

          <div className="content-prose">
            <h2>Why We Built QRCodeGenix</h2>
            <p>
              Too many QR code websites on the internet lock basic features behind deceptive paywalls, force users to register accounts just to download a PNG, or expire QR codes after 14 days to force subscription purchases.
            </p>
            <p>
              We believe static QR codes should be free, open, and permanently functional. QRCodeGenix was engineered from the ground up to respect user autonomy and privacy.
            </p>

            <h2>Our Core Principles</h2>

            <div className="principles-grid my-4">
              <div className="principle-card">
                <div className="principle-icon">
                  <ShieldCheck size={22} className="text-success" />
                </div>
                <h3>100% Browser-Based Generation</h3>
                <p>
                  Every QR code is created directly on your local device using standard HTML5 Canvas and JavaScript algorithms. Your inputs never pass through remote databases.
                </p>
              </div>

              <div className="principle-card">
                <div className="principle-icon">
                  <Cpu size={22} className="text-primary" />
                </div>
                <h3>Zero Forced Registration</h3>
                <p>
                  You don’t need an account, a password, or a newsletter subscription. You open the site, create your QR code, and download your file in seconds.
                </p>
              </div>

              <div className="principle-card">
                <div className="principle-icon">
                  <Download size={22} className="text-primary" />
                </div>
                <h3>High-Resolution & Vector Files</h3>
                <p>
                  Whether you need a crisp PNG for your Instagram story or an infinite-resolution vector SVG for a billboard, we provide clean, print-ready formats without watermarks.
                </p>
              </div>

              <div className="principle-card">
                <div className="principle-icon">
                  <Sparkles size={22} className="text-primary" />
                </div>
                <h3>Permanent Static Codes</h3>
                <p>
                  The QR codes you generate encode data directly into the matrix. They do not depend on our servers to redirect your users, meaning they never expire.
                </p>
              </div>
            </div>

            <h2>How Client-Side Privacy Works</h2>
            <p>
              Traditional QR generator tools send whatever text or password you type to their backend web servers. QRCodeGenix does the exact opposite: the QR encoding engine runs entirely inside your browser’s memory sandbox.
            </p>
            <p>
              Even your optional QR generation history is stored exclusively in your browser’s <code>localStorage</code>. You can inspect or clear your history at any time with a single click.
            </p>

            <h2>Built for Individuals and Businesses</h2>
            <p>
              From small coffee shops wanting a contactless menu, to developers generating Wi-Fi access tokens, to enterprises printing packaging labels—QRCodeGenix is engineered to be dependable, fast, and free forever.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
