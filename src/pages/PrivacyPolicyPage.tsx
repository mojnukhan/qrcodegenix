import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { ShieldCheck } from 'lucide-react';
import { useRouter } from '../utils/router';

export const PrivacyPolicyPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="page-wrapper legal-page">
      <SEOHead
        title="Privacy Policy – Client-Side Privacy Standards & Ad Disclosures | QRCodeGenix"
        description="Review QRCodeGenix privacy policy, client-side data handling, local storage practices, Google AdSense cookie disclosures, and opt-out information."
        canonicalPath="/privacy-policy"
      />

      <div className="container py-5">
        <div className="readable-container">
          <div className="page-header text-center mb-5">
            <span className="badge badge-success-light badge-sm mb-2">Privacy First</span>
            <h1 className="page-title">Privacy Policy</h1>
            <p className="page-lead">
              Last Updated: March 2026 • Effective Date: March 2026
            </p>
          </div>

          <div className="content-prose">
            <div className="privacy-highlight-box mb-4">
              <ShieldCheck size={26} className="text-success inline-icon" />
              <div>
                <strong>Our Core Privacy Commitment:</strong> QRCodeGenix is architected with a strict client-side privacy model. All QR code generation, camera scanning, image decoding, and batch processing are executed in your browser memory. We never transmit, store, or intercept your QR contents on remote servers.
              </div>
            </div>

            <h2>1. Information We Do Not Collect</h2>
            <p>
              When utilizing our QR generation and analysis tools (including URL, Text, Wi-Fi, WhatsApp, Email, Phone, vCard/Contact, Google Maps, SMS, and Batch Generator), data processing occurs entirely within your browser runtime via client-side JavaScript. Specifically:
            </p>
            <ul>
              <li><strong>No Content Transmission:</strong> We do not receive, inspect, log, or record the URLs, network passwords, text messages, phone numbers, or contact cards you input.</li>
              <li><strong>No Image Uploads:</strong> When uploading custom center logos, scanning QR images, or processing camera feeds in the QR Scanner, images remain strictly in local browser memory and are never uploaded to any remote server.</li>
              <li><strong>No User Account Database:</strong> QRCodeGenix requires no account creation, email registration, or login credentials.</li>
            </ul>

            <h2>2. Browser Local Storage & Technical Data</h2>
            <p>
              QRCodeGenix utilizes standard browser <code>localStorage</code> and <code>sessionStorage</code> exclusively for client-side functionality and user convenience:
            </p>
            <ul>
              <li>
                <strong>Theme Preference (<code>qrcodegenix_theme</code>):</strong> Retains your selection of Dark Mode or Light Mode across visits.
              </li>
              <li>
                <strong>Local QR History (<code>qrcodegenix_local_history</code>):</strong> Enables you to conveniently revisit your recently generated QR codes. This information resides 100% on your local machine and can be cleared or completely disabled anytime via the in-app history drawer.
              </li>
              <li>
                <strong>Template Loader (<code>qrcodegenix_pending_template</code>):</strong> Temporary session data used to transfer a selected template into the editor.
              </li>
              <li>
                <strong>Cookie Consent Choice (<code>qrcodegenix_cookie_consent</code>):</strong> Records whether you have accepted our cookie consent banner.
              </li>
            </ul>

            <h2>3. Third-Party Advertising & Google AdSense Disclosures</h2>
            <p>
              To maintain QRCodeGenix as a completely free utility platform without subscriptions or paywalls, we partner with third-party advertising networks, including <strong>Google AdSense</strong>, to serve advertisements when you visit our website.
            </p>
            <p>
              In compliance with Google AdSense and industry advertising policies:
            </p>
            <ul>
              <li>
                <strong>Third-Party Vendor Cookies:</strong> Third-party vendors, including Google, use cookies (such as the DoubleClick cookie) to serve ads based on a user&apos;s prior visits to this website or other websites across the internet.
              </li>
              <li>
                <strong>Personalized Advertising:</strong> Google&apos;s use of advertising cookies enables it and its partners to serve personalized ads to our users based on their visits to our site and/or other sites on the Internet.
              </li>
              <li>
                <strong>Opt-Out of Personalized Advertising:</strong> Users may opt out of personalized advertising by visiting Google&apos;s Ads Settings at{' '}
                <a
                  href="https://adssettings.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-medium underline"
                >
                  https://adssettings.google.com/
                </a>.
              </li>
              <li>
                <strong>Industry Opt-Out Portals:</strong> Alternatively, users can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting the Network Advertising Initiative or AboutAds at{' '}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-medium underline"
                >
                  https://www.aboutads.info/choices/
                </a>{' '}
                or the European Interactive Digital Advertising Alliance (EDAA) at{' '}
                <a
                  href="https://www.youronlinechoices.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-medium underline"
                >
                  https://www.youronlinechoices.com/
                </a>.
              </li>
            </ul>

            <h2>4. Web Analytics</h2>
            <p>
              We may utilize privacy-conscious web analytics tools to measure aggregate, anonymized traffic patterns (such as page views, browser user-agents, screen resolutions, and general country-level geographic location). This aggregate data allows us to optimize loading speeds, monitor server health, and ensure browser compatibility. We do not correlate analytical metrics with QR code content.
            </p>

            <h2>5. Camera & File Permissions (QR Scanner)</h2>
            <p>
              Our QR Scanner tool allows you to scan QR codes via your device camera or by uploading image files:
            </p>
            <ul>
              <li>
                <strong>Camera Access:</strong> Camera access is requested solely to stream video into an in-memory HTML5 video element for real-time barcode decoding. The video stream is processed frame-by-frame using client-side JavaScript. No video frames or snapshots are saved or transmitted over the network.
              </li>
              <li>
                <strong>File Upload:</strong> Uploaded images are rendered directly to an offscreen canvas and processed locally by the decoder library.
              </li>
            </ul>

            <h2>6. European Privacy Rights (GDPR / UK GDPR)</h2>
            <p>
              If you reside in the European Economic Area (EEA) or the United Kingdom, you hold statutory rights under the General Data Protection Regulation (GDPR), including:
            </p>
            <ul>
              <li>The right to access, rectify, or erase any personal information we hold about you.</li>
              <li>The right to object to or restrict processing of your personal data.</li>
              <li>The right to withdraw consent for non-essential cookies and personalized advertising at any time.</li>
              <li>The right to lodge a complaint with your local data protection supervisory authority.</li>
            </ul>
            <p>
              Because QRCodeGenix processes QR data exclusively on your device without server-side accounts, you can exercise full data erasure instantly by clearing your browser cache and local storage.
            </p>

            <h2>7. California Privacy Rights (CCPA / CPRA)</h2>
            <p>
              Under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA), California residents have specific rights regarding their personal information:
            </p>
            <ul>
              <li><strong>Right to Know & Access:</strong> The categories and specific pieces of personal information collected.</li>
              <li><strong>Right to Delete:</strong> The right to request deletion of collected personal data.</li>
              <li><strong>Non-Discrimination:</strong> We will never discriminate against you for exercising your privacy rights.</li>
              <li><strong>&quot;Do Not Sell or Share My Personal Information&quot;:</strong> QRCodeGenix does not sell user personal data. We disclose third-party advertising cookie mechanisms in Section 3 and provide links to opt out of cross-context behavioral advertising.</li>
            </ul>

            <h2>8. Children&apos;s Online Privacy Protection Act (COPPA)</h2>
            <p>
              QRCodeGenix is a general-audience utility platform and does not knowingly collect personally identifiable information from children under the age of 13. If you believe a child has provided personal information to us, please contact us and we will promptly take steps to delete such data.
            </p>

            <h2>9. External Links & Decoded QR Content</h2>
            <p>
              QRCodeGenix may link to external documentation, maps, or partners. Additionally, scanning or decoding a third-party QR code may present you with an external URL. We are not responsible for the privacy practices, content, or safety of external websites. We strongly advise users to inspect decoded links before opening them.
            </p>

            <h2>10. Updates to this Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our legal obligations, privacy enhancements, or advertising network standards. Any modifications will be posted here with an updated &quot;Last Updated&quot; date.
            </p>

            <h2>11. Contact Information</h2>
            <p>
              If you have any questions, concerns, or inquiries regarding our privacy standards or ad disclosures, please reach out to our privacy team:
            </p>
            <div className="contact-box-simple my-3">
              <p className="mb-1"><strong>QRCodeGenix Privacy Team</strong></p>
              <p className="mb-1">Email: <code>privacy@qrcodegenix.com</code> or <code>support@qrcodegenix.com</code></p>
              <p className="mb-0">Website:{' '}
                <button
                  onClick={() => navigate('/contact')}
                  className="text-primary underline font-medium"
                >
                  Contact Us Form
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
