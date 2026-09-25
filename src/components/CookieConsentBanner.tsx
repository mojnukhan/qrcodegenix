import React, { useState, useEffect } from 'react';
import { Cookie } from 'lucide-react';
import { useRouter } from '../utils/router';

const CONSENT_STORAGE_KEY = 'qrcodegenix_cookie_consent';

export const CookieConsentBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { navigate } = useRouter();

  useEffect(() => {
    try {
      const consent = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (!consent) {
        // Small delay so it transitions in smoothly
        const timer = setTimeout(() => setIsVisible(true), 800);
        return () => clearTimeout(timer);
      }
    } catch {
      // LocalStorage access issues (incognito/sandboxed)
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, 'accepted');
    } catch {
      // ignore
    }
    setIsVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, 'essential_only');
    } catch {
      // ignore
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="cookie-consent-bar"
      role="region"
      aria-label="Cookie consent banner"
    >
      <div className="cookie-consent-inner">
        <div className="cookie-consent-text-wrap">
          <Cookie size={22} className="cookie-icon text-primary flex-shrink-0" />
          <p className="cookie-consent-text">
            We use cookies and browser local storage to enhance site functionality, remember your settings, and serve relevant advertisements through partners like Google AdSense. Learn more in our{' '}
            <button
              onClick={() => navigate('/cookie-policy')}
              className="cookie-link"
            >
              Cookie Policy
            </button>{' '}
            and{' '}
            <button
              onClick={() => navigate('/privacy-policy')}
              className="cookie-link"
            >
              Privacy Policy
            </button>.
          </p>
        </div>

        <div className="cookie-consent-actions">
          <button
            type="button"
            className="btn btn-outline btn-sm cookie-btn-secondary"
            onClick={handleDecline}
          >
            Essential Only
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm cookie-btn-primary"
            onClick={handleAccept}
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};
