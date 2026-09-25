import React from 'react';
import { SEOHead } from '../components/SEOHead';

export const TermsPage: React.FC = () => {
  return (
    <div className="page-wrapper legal-page">
      <SEOHead
        title="Terms of Service | QRCodeGenix"
        description="Review the terms and conditions for using QRCodeGenix free online QR code generator."
        canonicalPath="/terms"
      />

      <div className="container py-5">
        <div className="readable-container">
          <div className="page-header text-center mb-5">
            <span className="badge badge-primary-light badge-sm mb-2">Legal</span>
            <h1 className="page-title">Terms of Service</h1>
            <p className="page-lead">
              Last Updated: March 2026
            </p>
          </div>

          <div className="content-prose">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the QRCodeGenix website and tools, you agree to comply with and be bound by these Terms of Service. If you do not agree with any part of these terms, you should discontinue using the platform.
            </p>

            <h2>2. Permitted Use</h2>
            <p>
              QRCodeGenix grants you a free, non-exclusive license to generate, customize, preview, and download static QR codes for both personal and commercial purposes. You may use the downloaded files for packaging, websites, print publications, signage, and marketing collateral without payment or attribution.
            </p>

            <h2>3. Prohibited Activities</h2>
            <p>
              You agree not to use QRCodeGenix to generate QR codes that:
            </p>
            <ul>
              <li>Direct users to phishing schemes, malware, viruses, or fraudulent websites.</li>
              <li>Promote hate speech, violent illegal activities, or copyright infringement.</li>
              <li>Attempt to disrupt, overload, or reverse-engineer our web infrastructure.</li>
            </ul>

            <h2>4. Disclaimer of Warranty & Scanning Reliability</h2>
            <p>
              QRCodeGenix is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. While we adhere strictly to official ISO/IEC 18004 QR code specifications and provide contrast validation tools, we do not guarantee that every code will be readable on every device.
            </p>
            <p>
              Actual QR scanability depends heavily on external factors beyond our control, including physical print resolution, ambient lighting, camera sensor quality, background reflection, scanning distance, and excessive custom logo sizes.
            </p>
            <p>
              <strong>Always perform test scans with multiple devices before committing to high-volume print runs.</strong>
            </p>

            <h2>5. Limitation of Liability</h2>
            <p>
              In no event shall QRCodeGenix or its maintainers be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the generated QR codes, including but not limited to printer misprints, business interruption, or loss of profits.
            </p>

            <h2>6. Modifications to Terms</h2>
            <p>
              We reserve the right to revise or update these Terms of Service at any time. Continued use of the website following changes constitutes acceptance of the revised terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
