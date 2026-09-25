import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { Cookie } from 'lucide-react';
import { useRouter } from '../utils/router';

export const CookiePolicyPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="page-wrapper legal-page">
      <SEOHead
        title="Cookie Policy – How We Use Cookies & Local Storage | QRCodeGenix"
        description="Learn about the cookies and browser local storage mechanisms utilized by QRCodeGenix for functionality and Google AdSense advertising."
        canonicalPath="/cookie-policy"
      />

      <div className="container py-5">
        <div className="readable-container">
          <div className="page-header text-center mb-5">
            <span className="badge badge-primary-light badge-sm mb-2">Transparency</span>
            <h1 className="page-title">Cookie Policy</h1>
            <p className="page-lead">
              Last Updated: March 2026 • Understand how we use cookies and browser storage
            </p>
          </div>

          <div className="content-prose">
            <div className="privacy-highlight-box mb-4">
              <Cookie size={26} className="text-primary inline-icon" />
              <div>
                <strong>Summary:</strong> This Cookie Policy explains what cookies and web storage technologies are, how QRCodeGenix uses them, and how you can manage your preferences regarding functional and advertising cookies.
              </div>
            </div>

            <h2>1. What Are Cookies and Local Storage?</h2>
            <p>
              Cookies are small text files that websites store on your computer or mobile device when you browse online. They allow websites to remember your actions and preferences over a period of time, ensuring seamless navigation and enabling specialized services like relevant advertising.
            </p>
            <p>
              In addition to traditional HTTP cookies, modern web applications like QRCodeGenix utilize HTML5 <strong>Local Storage</strong> and <strong>Session Storage</strong>. These technologies store data directly in your browser without transmitting it back and forth to a web server with every page request.
            </p>

            <h2>2. Categories of Storage We Use</h2>

            <div className="table-responsive my-4">
              <table className="legal-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Purpose</th>
                    <th>Examples</th>
                    <th>Persistence</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Essential & Functional</strong></td>
                    <td>Required for the basic operation of the website and remembering user interface preferences.</td>
                    <td>
                      <code>qrcodegenix_theme</code> (Dark/Light mode)<br />
                      <code>qrcodegenix_cookie_consent</code> (Consent status)
                    </td>
                    <td>Persistent (Local Storage)</td>
                  </tr>
                  <tr>
                    <td><strong>User Convenience</strong></td>
                    <td>Stores your recent QR codes locally on your device so you can reload or export them again without re-typing.</td>
                    <td>
                      <code>qrcodegenix_local_history</code><br />
                      <code>qrcodegenix_pending_template</code>
                    </td>
                    <td>User-controlled (Can be cleared anytime)</td>
                  </tr>
                  <tr>
                    <td><strong>Advertising & Targeting</strong></td>
                    <td>Placed by third-party advertising networks (Google AdSense) to deliver relevant advertisements and prevent ad repetition.</td>
                    <td>
                      <code>__gads</code>, <code>__gpi</code>, DoubleClick DART cookies
                    </td>
                    <td>Persistent (Third-Party HTTP Cookies)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>3. Third-Party Advertising Cookies (Google AdSense)</h2>
            <p>
              To keep QRCodeGenix 100% free and accessible to all users without paywalls, we display advertising supported by <strong>Google AdSense</strong>.
            </p>
            <p>
              Google uses cookies to serve ads on our site:
            </p>
            <ul>
              <li>
                Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit to QRCodeGenix and other sites across the Internet.
              </li>
              <li>
                These cookies track non-personally identifiable browsing behavior to determine ad relevance, measure campaign effectiveness, and detect fraudulent clicks.
              </li>
              <li>
                You can opt out of personalized advertising by visiting{' '}
                <a
                  href="https://adssettings.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline font-medium"
                >
                  Google Ads Settings
                </a>.
              </li>
            </ul>

            <h2>4. How to Control & Disable Cookies in Your Browser</h2>
            <p>
              You have the right to accept or decline cookies. Most web browsers automatically accept cookies by default, but you can modify your browser settings to reject cookies or notify you whenever a cookie is set.
            </p>
            <p>
              Here is how to manage cookie settings in popular browsers:
            </p>
            <ul>
              <li>
                <strong>Google Chrome:</strong> Go to <code>Settings &gt; Privacy and Security &gt; Third-party cookies</code>.
              </li>
              <li>
                <strong>Mozilla Firefox:</strong> Go to <code>Settings &gt; Privacy &amp; Security &gt; Cookies and Site Data</code>.
              </li>
              <li>
                <strong>Apple Safari:</strong> Go to <code>Preferences &gt; Privacy &gt; Block all cookies</code>.
              </li>
              <li>
                <strong>Microsoft Edge:</strong> Go to <code>Settings &gt; Cookies and site permissions &gt; Manage and delete cookies</code>.
              </li>
            </ul>
            <p>
              <em>Note: Disabling all cookies may prevent third-party advertisements from displaying properly, but QRCodeGenix&apos;s core QR generation functions will continue working normally.</em>
            </p>

            <h2>5. Opt-Out Advertising Resources</h2>
            <p>
              You can also opt out of targeted advertising from numerous participating networks via industry consumer choice mechanisms:
            </p>
            <ul>
              <li>
                <strong>Digital Advertising Alliance (USA):</strong>{' '}
                <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                  aboutads.info/choices
                </a>
              </li>
              <li>
                <strong>European Interactive Digital Advertising Alliance (EU):</strong>{' '}
                <a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                  youronlinechoices.eu
                </a>
              </li>
              <li>
                <strong>Network Advertising Initiative:</strong>{' '}
                <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                  networkadvertising.org/choices
                </a>
              </li>
            </ul>

            <h2>6. Contact Us Regarding Cookies</h2>
            <p>
              If you have any questions about our use of cookies or local storage technologies, please review our{' '}
              <button
                onClick={() => navigate('/privacy-policy')}
                className="text-primary underline font-medium"
              >
                Privacy Policy
              </button>{' '}
              or get in touch with us via our{' '}
              <button
                onClick={() => navigate('/contact')}
                className="text-primary underline font-medium"
              >
                Contact Page
              </button>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
