import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { useRouter } from '../utils/router';
import {
  BookOpen,
  CheckCircle2,
  Sliders,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const GuidePage: React.FC = () => {
  const { navigate } = useRouter();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'The Complete Guide to QR Codes: Design, Printing, Error Correction & Security',
    description: 'An authoritative manual covering QR code anatomy, Reed-Solomon error correction levels, physical printing standards, contrast ratios, and quishing cybersecurity awareness.',
    author: {
      '@type': 'Organization',
      name: 'QRCodeGenix Engineering Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'QRCodeGenix',
      url: 'https://qrcodegenix.com',
    },
    datePublished: '2026-01-15',
    dateModified: '2026-03-25',
  };

  return (
    <div className="page-wrapper guide-page">
      <SEOHead
        title="Complete QR Code Guide: Standards, Design, Printing & Security | QRCodeGenix"
        description="Comprehensive technical guide to QR code anatomy, error correction levels (L, M, Q, H), physical print size formulas, contrast rules, and quishing security."
        canonicalPath="/qr-code-guide"
        schema={articleSchema}
      />

      <div className="container py-5">
        <div className="readable-container">
          {/* Header */}
          <div className="page-header text-center mb-5">
            <span className="badge badge-primary-light badge-sm mb-2">Knowledge Base</span>
            <h1 className="page-title">The Complete Guide to QR Codes</h1>
            <p className="page-lead">
              A comprehensive technical reference for designers, developers, businesses, and print professionals on QR code architecture, printing standards, and security.
            </p>
          </div>

          <div className="content-prose">
            {/* Table of Contents */}
            <div className="guide-toc-box my-4">
              <div className="guide-toc-header">
                <BookOpen size={18} className="text-primary" />
                <h2 className="guide-toc-title">Table of Contents</h2>
              </div>
              <ul className="guide-toc-list">
                <li><a href="#anatomy">1. Anatomy & Symbology of a QR Code</a></li>
                <li><a href="#error-correction">2. Error Correction Levels (L, M, Q, H) Explained</a></li>
                <li><a href="#contrast-rules">3. Design & Scannability: Color, Contrast & Quiet Zones</a></li>
                <li><a href="#print-guidelines">4. Physical Printing Standards & Minimum Size Formulas</a></li>
                <li><a href="#static-vs-dynamic">5. Static vs. Dynamic QR Codes: Architecture Comparison</a></li>
                <li><a href="#security-quishing">6. QR Code Cybersecurity & &quot;Quishing&quot; Defense</a></li>
                <li><a href="#troubleshooting">7. QR Code Troubleshooting: Why Won&apos;t It Scan?</a></li>
              </ul>
            </div>

            {/* Section 1 */}
            <section id="anatomy" className="guide-section">
              <h2>1. Anatomy & Symbology of a QR Code</h2>
              <p>
                Invented in 1994 by the Japanese company Denso Wave for tracking automotive components, the <strong>Quick Response (QR) code</strong> is an ISO-standardized (ISO/IEC 18004) two-dimensional matrix barcode capable of encoding numeric, alphanumeric, binary byte, and kanji characters.
              </p>
              <p>
                A standard QR code is composed of several critical functional patterns:
              </p>
              <ul>
                <li>
                  <strong>Finder Patterns (Position Markers):</strong> The three distinct nested squares situated in the top-left, top-right, and bottom-left corners. These enable smartphone camera sensors to detect the barcode and calculate its rotation angle with 360-degree omnidirectional capability.
                </li>
                <li>
                  <strong>Timing Patterns:</strong> Alternating black and white module lines running horizontally and vertically between the finder patterns. They define the coordinate grid size of individual matrix modules.
                </li>
                <li>
                  <strong>Alignment Patterns:</strong> Smaller nested squares distributed across larger QR code versions (Version 2 and above) that assist scanners in rectifying visual distortion when scanning curved surfaces or photos taken at angled perspectives.
                </li>
                <li>
                  <strong>Quiet Zone:</strong> The essential blank, unprinted boundary surrounding the entire outer edge of the barcode. By standard specification, this should measure at least 4 modules in thickness to prevent interference from surrounding text or background graphics.
                </li>
                <li>
                  <strong>Data &amp; Error Correction Modules:</strong> The remaining interior matrix cells that store your encoded payload along with Reed-Solomon mathematical error recovery bytes.
                </li>
              </ul>
            </section>

            {/* Section 2 */}
            <section id="error-correction" className="guide-section">
              <h2>2. Error Correction Levels (L, M, Q, H) Explained</h2>
              <p>
                Unlike traditional linear UPC barcodes, QR codes incorporate <strong>Reed-Solomon Error Correction</strong> algorithms. This mathematical mechanism allows a QR code to remain 100% readable even if parts of the barcode are dirty, torn, scuffed, or occluded by an embedded company logo.
              </p>

              <div className="table-responsive my-3">
                <table className="legal-table">
                  <thead>
                    <tr>
                      <th>Level</th>
                      <th>Recovery Capacity</th>
                      <th>Best Used For</th>
                      <th>Data Density</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Level L (Low)</strong></td>
                      <td>Approx. 7% of data can be restored</td>
                      <td>Clean digital displays, very dense data, simple URLs</td>
                      <td>Lowest density (fewest modules)</td>
                    </tr>
                    <tr>
                      <td><strong>Level M (Medium)</strong></td>
                      <td>Approx. 15% of data can be restored</td>
                      <td>Standard default for general marketing, flyers, packaging</td>
                      <td>Balanced module density</td>
                    </tr>
                    <tr>
                      <td><strong>Level Q (Quartile)</strong></td>
                      <td>Approx. 25% of data can be restored</td>
                      <td>Industrial environments, outdoor stickers, warehouse labels</td>
                      <td>Higher density</td>
                    </tr>
                    <tr>
                      <td><strong>Level H (High)</strong></td>
                      <td>Approx. 30% of data can be restored</td>
                      <td><strong>QR codes with center logos</strong>, rugged tags, business cards</td>
                      <td>Highest density (most modules)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="alert-box-info my-3">
                <Sliders size={20} className="text-primary inline-icon" />
                <div>
                  <strong>Pro Tip for Custom Logos:</strong> When embedding an icon or company brand logo in the center of your QR code on QRCodeGenix, always configure error correction to <strong>Level H (30%)</strong>. Because the logo obscures the center modules, Level H ensures the remaining exterior modules possess sufficient parity data to decode seamlessly.
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="contrast-rules" className="guide-section">
              <h2>3. Design & Scannability: Color, Contrast & Quiet Zones</h2>
              <p>
                Visual customization enhances brand identity, but improper color pairings can completely render a QR code unreadable. Follow these scientific guidelines to guarantee immediate scanning across all smartphone cameras:
              </p>

              <h3>A. Maintain Sufficient Color Contrast</h3>
              <p>
                Smartphone cameras rely on luminance differences to distinguish dark data modules from light background spaces. Adhere to the Web Content Accessibility Guidelines (WCAG):
              </p>
              <ul>
                <li>Aim for a contrast ratio of at least <strong>4.5:1</strong> (ideal: <strong>7.0:1</strong> or higher).</li>
                <li>Dark foreground on a light background is universally supported. (e.g. Black on White, Dark Navy on White, Deep Charcoal on Off-White).</li>
                <li>QRCodeGenix includes a built-in live contrast checker that automatically calculates luminance ratios and alerts you if contrast drops below acceptable thresholds.</li>
              </ul>

              <h3>B. Beware of Inverted Colors (Light on Dark)</h3>
              <p>
                While some modern flagship smartphones support inverted QR codes (white QR modules on a dark background), many legacy phone cameras, budget barcode scanners, and handheld inventory devices strictly expect a dark pattern on a lighter background. <strong>Avoid inverted colors for critical public-facing assets like restaurant menus or event passes.</strong>
              </p>

              <h3>C. Respect the Quiet Zone Margin</h3>
              <p>
                If artwork, text, borders, or photo elements touch the edge of the QR code matrix without a quiet zone, scanners cannot reliably detect where the barcode begins and ends. Always leave at least 2 to 4 modules of uninterrupted clear space around the entire perimeter.
              </p>
            </section>

            {/* Section 4 */}
            <section id="print-guidelines" className="guide-section">
              <h2>4. Physical Printing Standards & Minimum Size Formulas</h2>
              <p>
                One of the most frequent mistakes in physical print marketing is printing QR codes too small for the anticipated scanning distance.
              </p>

              <h3>The 10:1 Scanning Ratio Formula</h3>
              <p>
                As a standard optical rule of thumb, the minimum physical width of your QR code should be approximately <strong>1/10th of the distance</strong> from which users will scan it:
              </p>
              <div className="formula-box my-3">
                <code>Minimum QR Width = Scanning Distance / 10</code>
              </div>

              <div className="table-responsive my-3">
                <table className="legal-table">
                  <thead>
                    <tr>
                      <th>Application Context</th>
                      <th>Expected Distance</th>
                      <th>Minimum Recommended Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Business Card / Handheld Flyer</td>
                      <td>10 – 15 inches (25 – 40 cm)</td>
                      <td>0.8 × 0.8 inches (2 × 2 cm)</td>
                    </tr>
                    <tr>
                      <td>Restaurant Table Tent / Menu</td>
                      <td>1.5 – 2 feet (45 – 60 cm)</td>
                      <td>1.5 × 1.5 inches (3.8 × 3.8 cm)</td>
                    </tr>
                    <tr>
                      <td>Poster / Window Decal</td>
                      <td>4 – 6 feet (1.2 – 1.8 m)</td>
                      <td>5 × 5 inches (12.5 × 12.5 cm)</td>
                    </tr>
                    <tr>
                      <td>Outdoor Billboard / Highway Sign</td>
                      <td>30 – 50 feet (9 – 15 m)</td>
                      <td>36 × 36 inches (90 × 90 cm) or larger</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>Resolution & File Format Requirements</h3>
              <ul>
                <li><strong>Vector SVG:</strong> For commercial print runs, always export in <strong>Scalable Vector Graphics (SVG)</strong> format. Vectors can be enlarged infinitely without pixelation or blurriness.</li>
                <li><strong>High-Resolution PNG / JPG:</strong> For raster formats, ensure the file is generated at <strong>300 DPI (Dots Per Inch)</strong> or at least 1024×1024 to 2048×2048 pixels.</li>
                <li><strong>Material Finish:</strong> Print on matte or semi-gloss paper where possible. High-gloss laminates cause severe light reflections and glare under artificial spotlights, blinding camera sensors.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section id="static-vs-dynamic" className="guide-section">
              <h2>5. Static vs. Dynamic QR Codes: Architecture Comparison</h2>
              <p>
                Understanding the technical difference between static and dynamic QR codes is crucial when choosing a generator:
              </p>

              <div className="comparison-grid my-4">
                <div className="comparison-card">
                  <h3 className="text-success">Static QR Codes (QRCodeGenix)</h3>
                  <ul>
                    <li><strong>Direct Encoding:</strong> Your actual URL, Wi-Fi password, or vCard details are encoded directly into the pixel matrix.</li>
                    <li><strong>Never Expire:</strong> Because no third-party redirect server is involved, the QR code functions permanently forever.</li>
                    <li><strong>100% Private:</strong> Your data does not pass through external tracking databases or analytics middlemen.</li>
                    <li><strong>Zero Subscription Fees:</strong> Completely free to create and print without recurring monthly costs.</li>
                  </ul>
                </div>

                <div className="comparison-card">
                  <h3 className="text-muted">Dynamic QR Codes</h3>
                  <ul>
                    <li><strong>Redirect Intermediary:</strong> The QR code encodes a short-URL owned by a third-party service provider, which forwards visitors to your target link.</li>
                    <li><strong>Editable Destination:</strong> You can modify the destination URL after printing without re-printing the physical material.</li>
                    <li><strong>Subscription Dependent:</strong> If the hosting company shuts down or you cancel your monthly subscription, your printed QR codes stop functioning.</li>
                    <li><strong>Privacy Exposure:</strong> User scans, IP addresses, and device fingerprints are logged on remote databases.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section id="security-quishing" className="guide-section">
              <h2>6. QR Code Cybersecurity & &quot;Quishing&quot; Defense</h2>
              <p>
                As QR code adoption has grown exponentially across contactless payments and venue check-ins, malicious actors have begun utilizing <strong>&quot;Quishing&quot; (QR Phishing)</strong> attacks.
              </p>
              <h3>How QR Phishing Operates</h3>
              <p>
                Attackers place physical stickers containing fraudulent QR codes over authentic codes in public spaces (such as parking meters, restaurant tables, or electric vehicle charging stations). When scanned, unsuspecting victims are directed to counterfeit login portals designed to steal banking credentials or install malicious software.
              </p>

              <h3>Best Practices for Safe QR Scanning</h3>
              <ul>
                <li><strong>Preview the Destination URL:</strong> Always verify the domain name displayed by your camera preview or scanner before clicking through. Never blindly open unfamiliar shorteners.</li>
                <li><strong>Inspect Physical Stickers:</strong> Look closely at QR codes on public meters or tables to ensure no rogue adhesive sticker has been placed over an authentic printed sign.</li>
                <li><strong>Use Client-Side Tools:</strong> Tools like the <strong>QRCodeGenix QR Scanner</strong> decode QR codes in your local browser sandbox, displaying the complete raw decoded destination and never automatically redirecting your browser to untrusted endpoints.</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section id="troubleshooting" className="guide-section">
              <h2>7. QR Code Troubleshooting: Why Won&apos;t It Scan?</h2>
              <p>
                If you encounter a QR code that refuses to scan, consult this diagnostic checklist:
              </p>
              <div className="troubleshoot-checklist my-3">
                <div className="checklist-item">
                  <CheckCircle2 size={18} className="text-success flex-shrink-0" />
                  <div>
                    <strong>Is there sufficient lighting?</strong> Dim ambient light prevents smartphone sensors from focusing on high-density module matrices.
                  </div>
                </div>
                <div className="checklist-item">
                  <CheckCircle2 size={18} className="text-success flex-shrink-0" />
                  <div>
                    <strong>Is the quiet zone missing?</strong> If background graphics or text abut the edge of the QR code, crop or re-export it with at least 2 to 4 modules of margin.
                  </div>
                </div>
                <div className="checklist-item">
                  <CheckCircle2 size={18} className="text-success flex-shrink-0" />
                  <div>
                    <strong>Is the logo too large?</strong> Logos exceeding 25–30% of total canvas area can overwrite essential data modules beyond the recovery limit of Reed-Solomon algorithms.
                  </div>
                </div>
                <div className="checklist-item">
                  <CheckCircle2 size={18} className="text-success flex-shrink-0" />
                  <div>
                    <strong>Is the encoded payload too long?</strong> Encoding thousands of characters causes the matrix version to balloon (e.g. Version 40 with 177×177 modules), making individual modules microscopic. Shorten URLs where practical.
                  </div>
                </div>
                <div className="checklist-item">
                  <CheckCircle2 size={18} className="text-success flex-shrink-0" />
                  <div>
                    <strong>Is glare obscuring the camera lens?</strong> Angle the camera slightly to eliminate direct specular reflection from glossy stickers or transparent plastic sleeves.
                  </div>
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <div className="guide-cta-card my-5">
              <div className="guide-cta-content">
                <Sparkles size={28} className="text-primary mb-2" />
                <h3>Ready to Create a Professional QR Code?</h3>
                <p>
                  Put these best practices into action. Generate high-contrast, print-ready vector SVGs and PNGs in seconds—100% free and private.
                </p>
                <button
                  type="button"
                  className="btn btn-primary btn-lg mt-2"
                  onClick={() => navigate('/qr-code-generator')}
                >
                  <span>Launch QR Generator</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
