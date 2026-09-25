import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Mail, Send, Info } from 'lucide-react';
import { useToast } from '../components/Toast';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const { showToast } = useToast();

  const CONTACT_EMAIL = 'support@qrcodegenix.com';

  const handleComposeEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      showToast('Please fill in your name, email, and message', 'error');
      return;
    }

    const emailSubject = encodeURIComponent(subject ? `[QRCodeGenix] ${subject}` : `[QRCodeGenix Inquiry] from ${name}`);
    const emailBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${emailSubject}&body=${emailBody}`;
    window.location.href = mailtoUrl;
    showToast('Opening default email client...', 'info');
  };

  return (
    <div className="page-wrapper contact-page">
      <SEOHead
        title="Contact Us – Get in Touch | QRCodeGenix"
        description="Have questions or suggestions for QRCodeGenix? Reach out to our team. We are always happy to help."
        canonicalPath="/contact"
      />

      <div className="container py-5">
        <div className="readable-container">
          <div className="page-header text-center mb-5">
            <span className="badge badge-primary-light badge-sm mb-2">Get In Touch</span>
            <h1 className="page-title">Contact QRCodeGenix</h1>
            <p className="page-lead">
              Have a question, feedback, or feature request? We would love to hear from you.
            </p>
          </div>

          <div className="contact-grid">
            {/* Direct Information Box */}
            <div className="contact-info-card">
              <div className="contact-card-icon">
                <Mail size={24} className="text-primary" />
              </div>
              <h3 className="info-card-title">Direct Support Email</h3>
              <p className="info-card-text">
                For partnerships, bug reports, or general questions, you can reach out directly to our team:
              </p>
              <a href={`mailto:${CONTACT_EMAIL}`} className="contact-email-link">
                {CONTACT_EMAIL}
              </a>

              <div className="backend-notice-box mt-4">
                <Info size={16} className="text-primary inline-icon" />
                <div>
                  <strong>Backend Integration Note:</strong>
                  <p className="backend-notice-text">
                    QRCodeGenix is currently configured as a 100% client-side privacy-first web application without a server database. Clicking &quot;Compose Email&quot; opens your default mail app with your pre-filled inquiry.
                  </p>
                </div>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="contact-form-card">
              <form onSubmit={handleComposeEmail}>
                <div className="form-group-wrap">
                  <label htmlFor="contact-name" className="form-label">
                    <span>Your Name</span>
                    <span className="required-star">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    className="form-input"
                    placeholder="Jane Doe"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>

                <div className="form-group-wrap">
                  <label htmlFor="contact-email" className="form-label">
                    <span>Your Email Address</span>
                    <span className="required-star">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    className="form-input"
                    placeholder="jane@example.com"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group-wrap">
                  <label htmlFor="contact-sub" className="form-label">
                    <span>Subject</span>
                  </label>
                  <input
                    id="contact-sub"
                    type="text"
                    className="form-input"
                    placeholder="Feature Request or Bug Report"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                  />
                </div>

                <div className="form-group-wrap">
                  <label htmlFor="contact-msg" className="form-label">
                    <span>Message</span>
                    <span className="required-star">*</span>
                  </label>
                  <textarea
                    id="contact-msg"
                    rows={4}
                    className="form-textarea"
                    placeholder="Describe your inquiry in detail..."
                    required
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-block mt-3">
                  <Send size={16} />
                  <span>Compose in Email Client</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
