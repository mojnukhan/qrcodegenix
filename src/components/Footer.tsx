import React from 'react';
import { useRouter } from '../utils/router';
import { QrCode, ShieldCheck, Cpu, Download } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useRouter();

  const handleLink = (path: string) => {
    navigate(path);
  };

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-top-border" />
      <div className="footer-container">
        {/* Brand Column */}
        <div className="footer-brand-col">
          <div className="footer-logo">
            <div className="logo-icon-wrap sm">
              <QrCode size={20} />
            </div>
            <span className="logo-name">
              QRCode<span className="logo-accent">Genix</span>
            </span>
          </div>
          <p className="footer-tagline">
            Free QR tools for everyone. Generate, customize, and download high-resolution QR codes right inside your browser.
          </p>
          <div className="footer-badges">
            <span className="footer-badge">
              <ShieldCheck size={14} /> 100% Client-Side Privacy
            </span>
            <span className="footer-badge">
              <Cpu size={14} /> Zero Server Data Storage
            </span>
            <span className="footer-badge">
              <Download size={14} /> Crisp SVG & High-Res PNG
            </span>
          </div>
        </div>

        {/* Links Columns */}
        <div className="footer-links-grid">
          {/* QR Tools Column */}
          <div className="footer-col">
            <h3 className="footer-heading">QR Tools</h3>
            <ul className="footer-nav">
              <li>
                <button onClick={() => handleLink('/qr-code-generator')}>QR Generator</button>
              </li>
              <li>
                <button onClick={() => handleLink('/qr-code-scanner')}>QR Code Scanner</button>
              </li>
              <li>
                <button onClick={() => handleLink('/vcard-qr-code-generator')}>vCard / Contact QR</button>
              </li>
              <li>
                <button onClick={() => handleLink('/google-maps-qr-code')}>Google Maps QR</button>
              </li>
              <li>
                <button onClick={() => handleLink('/sms-qr-code-generator')}>SMS QR Generator</button>
              </li>
              <li>
                <button onClick={() => handleLink('/wifi-qr-code-generator')}>WiFi QR Generator</button>
              </li>
              <li>
                <button onClick={() => handleLink('/whatsapp-qr-code-generator')}>WhatsApp QR</button>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="footer-col">
            <h3 className="footer-heading">Resources</h3>
            <ul className="footer-nav">
              <li>
                <button onClick={() => handleLink('/qr-code-guide')}>QR Code Guide</button>
              </li>
              <li>
                <button onClick={() => handleLink('/templates')}>QR Code Templates</button>
              </li>
              <li>
                <button onClick={() => handleLink('/batch-qr-code-generator')}>Batch QR Generator</button>
              </li>
              <li>
                <button onClick={() => handleLink('/qr-tools')}>All Tools Directory</button>
              </li>
              <li>
                <button onClick={() => handleLink('/about')}>Browser Architecture</button>
              </li>
              <li>
                <button onClick={() => handleLink('/contact')}>Support & Feedback</button>
              </li>
            </ul>
          </div>

          {/* Company / Legal Column */}
          <div className="footer-col">
            <h3 className="footer-heading">Company & Legal</h3>
            <ul className="footer-nav">
              <li>
                <button onClick={() => handleLink('/about')}>About QRCodeGenix</button>
              </li>
              <li>
                <button onClick={() => handleLink('/contact')}>Contact Us</button>
              </li>
              <li>
                <button onClick={() => handleLink('/privacy-policy')}>Privacy Policy</button>
              </li>
              <li>
                <button onClick={() => handleLink('/cookie-policy')}>Cookie Policy</button>
              </li>
              <li>
                <button onClick={() => handleLink('/terms')}>Terms of Service</button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p className="copyright-text">
            © 2026 QRCodeGenix. All rights reserved.
          </p>
          <p className="footer-note">
            Your QR code is generated directly in your browser. Your content stays on your device.
          </p>
        </div>
      </div>
    </footer>
  );
};
