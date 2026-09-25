import React, { useState } from 'react';
import type { QRType, QRFormValues } from '../../types/qr';
import {
  Eye,
  EyeOff,
  Globe,
  Wifi,
  MessageCircle,
  Mail,
  Phone,
  FileText,
  CheckCircle2,
  AlertCircle,
  Contact,
  MapPin,
  MessageSquare,
  Building,
  User,
  Map,
} from 'lucide-react';

interface QRFormInputsProps {
  type: QRType;
  values: QRFormValues;
  onChange: (updated: Partial<QRFormValues>) => void;
  isValid: boolean;
  validationError?: string;
}

export const QRFormInputs: React.FC<QRFormInputsProps> = ({
  type,
  values,
  onChange,
  isValid,
  validationError,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="form-inputs-container">
      {/* 1. URL Form */}
      {type === 'url' && (
        <div className="form-group-wrap">
          <label htmlFor="qr-url-input" className="form-label">
            <Globe size={16} className="label-icon text-primary" />
            <span>Website URL</span>
            <span className="required-star">*</span>
          </label>
          <div className="input-with-action">
            <input
              id="qr-url-input"
              type="url"
              className={`form-input ${!isValid && values.url ? 'input-error' : ''}`}
              placeholder="https://example.com"
              value={values.url}
              onChange={e => onChange({ url: e.target.value })}
              autoFocus
            />
            {values.url && !values.url.startsWith('http://') && !values.url.startsWith('https://') && (
              <button
                type="button"
                className="input-inline-btn"
                onClick={() => onChange({ url: 'https://' + values.url })}
                title="Add https://"
              >
                + https://
              </button>
            )}
          </div>
          <div className="input-helper">
            {validationError ? (
              <span className="error-text">
                <AlertCircle size={13} /> {validationError}
              </span>
            ) : (
              <span className="hint-text">
                <CheckCircle2 size={13} className="text-success" /> Enter any valid web address.
              </span>
            )}
          </div>
        </div>
      )}

      {/* 2. Text Form */}
      {type === 'text' && (
        <div className="form-group-wrap">
          <div className="form-label-row">
            <label htmlFor="qr-text-input" className="form-label">
              <FileText size={16} className="label-icon text-primary" />
              <span>Plain Text</span>
              <span className="required-star">*</span>
            </label>
            <span className="char-counter">{values.text.length} characters</span>
          </div>
          <textarea
            id="qr-text-input"
            rows={5}
            className={`form-textarea ${!isValid && values.text ? 'input-error' : ''}`}
            placeholder="Enter any text, instructions, serial numbers, or notes..."
            value={values.text}
            onChange={e => onChange({ text: e.target.value })}
            autoFocus
          />
          <div className="input-helper">
            {validationError ? (
              <span className="error-text">
                <AlertCircle size={13} /> {validationError}
              </span>
            ) : (
              <span className="hint-text">
                Plain text QR codes can be read by any standard QR scanner offline.
              </span>
            )}
          </div>
        </div>
      )}

      {/* 3. WiFi Form */}
      {type === 'wifi' && (
        <div className="form-group-grid">
          <div className="form-group-wrap">
            <label htmlFor="qr-wifi-ssid" className="form-label">
              <Wifi size={16} className="label-icon text-primary" />
              <span>Network Name (SSID)</span>
              <span className="required-star">*</span>
            </label>
            <input
              id="qr-wifi-ssid"
              type="text"
              className="form-input"
              placeholder="e.g. Office_Guest_WiFi"
              value={values.wifiSSID}
              onChange={e => onChange({ wifiSSID: e.target.value })}
              autoFocus
            />
          </div>

          <div className="form-group-wrap">
            <label htmlFor="qr-wifi-security" className="form-label">
              <span>Security Encryption</span>
            </label>
            <select
              id="qr-wifi-security"
              className="form-select"
              value={values.wifiSecurity}
              onChange={e =>
                onChange({
                  wifiSecurity: e.target.value as 'WPA' | 'WEP' | 'nopass',
                })
              }
            >
              <option value="WPA">WPA / WPA2 / WPA3 (Recommended)</option>
              <option value="WEP">WEP (Legacy)</option>
              <option value="nopass">None (Open Network)</option>
            </select>
          </div>

          {values.wifiSecurity !== 'nopass' && (
            <div className="form-group-wrap">
              <label htmlFor="qr-wifi-pass" className="form-label">
                <span>Network Password</span>
                <span className="required-star">*</span>
              </label>
              <div className="password-input-wrap">
                <input
                  id="qr-wifi-pass"
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="Enter Wi-Fi password"
                  value={values.wifiPassword}
                  onChange={e => onChange({ wifiPassword: e.target.value })}
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(p => !p)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          )}

          <div className="form-checkbox-wrap">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={values.wifiHidden}
                onChange={e => onChange({ wifiHidden: e.target.checked })}
              />
              <span>Hidden Network (SSID is not broadcasted)</span>
            </label>
          </div>

          {validationError && (
            <div className="input-helper">
              <span className="error-text">
                <AlertCircle size={13} /> {validationError}
              </span>
            </div>
          )}
        </div>
      )}

      {/* 4. WhatsApp Form */}
      {type === 'whatsapp' && (
        <div className="form-group-grid">
          <div className="form-group-wrap">
            <label htmlFor="qr-wa-phone" className="form-label">
              <MessageCircle size={16} className="label-icon text-primary" />
              <span>Phone Number (with Country Code)</span>
              <span className="required-star">*</span>
            </label>
            <input
              id="qr-wa-phone"
              type="tel"
              className="form-input"
              placeholder="e.g. +14155552671 or 8801700000000"
              value={values.whatsappPhone}
              onChange={e => onChange({ whatsappPhone: e.target.value })}
              autoFocus
            />
            <span className="hint-text">
              Include country code without special characters or spaces.
            </span>
          </div>

          <div className="form-group-wrap">
            <label htmlFor="qr-wa-msg" className="form-label">
              <span>Pre-filled Message (Optional)</span>
            </label>
            <textarea
              id="qr-wa-msg"
              rows={3}
              className="form-textarea"
              placeholder="Hi! I would like to inquire about your services..."
              value={values.whatsappMessage}
              onChange={e => onChange({ whatsappMessage: e.target.value })}
            />
          </div>

          {validationError && (
            <div className="input-helper">
              <span className="error-text">
                <AlertCircle size={13} /> {validationError}
              </span>
            </div>
          )}
        </div>
      )}

      {/* 5. Email Form */}
      {type === 'email' && (
        <div className="form-group-grid">
          <div className="form-group-wrap">
            <label htmlFor="qr-email-addr" className="form-label">
              <Mail size={16} className="label-icon text-primary" />
              <span>Recipient Email</span>
              <span className="required-star">*</span>
            </label>
            <input
              id="qr-email-addr"
              type="email"
              className="form-input"
              placeholder="contact@yourbusiness.com"
              value={values.emailAddress}
              onChange={e => onChange({ emailAddress: e.target.value })}
              autoFocus
            />
          </div>

          <div className="form-group-wrap">
            <label htmlFor="qr-email-sub" className="form-label">
              <span>Subject Line (Optional)</span>
            </label>
            <input
              id="qr-email-sub"
              type="text"
              className="form-input"
              placeholder="Product Inquiry / Feedback"
              value={values.emailSubject}
              onChange={e => onChange({ emailSubject: e.target.value })}
            />
          </div>

          <div className="form-group-wrap">
            <label htmlFor="qr-email-body" className="form-label">
              <span>Message Body (Optional)</span>
            </label>
            <textarea
              id="qr-email-body"
              rows={3}
              className="form-textarea"
              placeholder="Type your message template here..."
              value={values.emailBody}
              onChange={e => onChange({ emailBody: e.target.value })}
            />
          </div>

          {validationError && (
            <div className="input-helper">
              <span className="error-text">
                <AlertCircle size={13} /> {validationError}
              </span>
            </div>
          )}
        </div>
      )}

      {/* 6. Phone Form */}
      {type === 'phone' && (
        <div className="form-group-wrap">
          <label htmlFor="qr-phone-number" className="form-label">
            <Phone size={16} className="label-icon text-primary" />
            <span>Phone Number</span>
            <span className="required-star">*</span>
          </label>
          <input
            id="qr-phone-number"
            type="tel"
            className="form-input"
            placeholder="e.g. +1 (800) 555-0199"
            value={values.phoneNumber}
            onChange={e => onChange({ phoneNumber: e.target.value })}
            autoFocus
          />
          <div className="input-helper">
            {validationError ? (
              <span className="error-text">
                <AlertCircle size={13} /> {validationError}
              </span>
            ) : (
              <span className="hint-text">
                When scanned on a phone, it will automatically open the phone dialer.
              </span>
            )}
          </div>
        </div>
      )}

      {/* 7. vCard / Contact (Phase 2) */}
      {type === 'vcard' && (
        <div className="form-group-grid">
          <div className="form-label">
            <Contact size={16} className="label-icon text-primary" />
            <span>Contact Information</span>
          </div>

          <div className="grid-2-col">
            <div className="form-group-wrap">
              <label htmlFor="vcard-fn" className="form-label-sub">
                <User size={13} /> First Name
              </label>
              <input
                id="vcard-fn"
                type="text"
                className="form-input"
                placeholder="John"
                value={values.vcardFirstName}
                onChange={e => onChange({ vcardFirstName: e.target.value })}
                autoFocus
              />
            </div>
            <div className="form-group-wrap">
              <label htmlFor="vcard-ln" className="form-label-sub">
                Last Name
              </label>
              <input
                id="vcard-ln"
                type="text"
                className="form-input"
                placeholder="Doe"
                value={values.vcardLastName}
                onChange={e => onChange({ vcardLastName: e.target.value })}
              />
            </div>
          </div>

          <div className="grid-2-col">
            <div className="form-group-wrap">
              <label htmlFor="vcard-org" className="form-label-sub">
                <Building size={13} /> Company / Organization
              </label>
              <input
                id="vcard-org"
                type="text"
                className="form-input"
                placeholder="Acme Corp"
                value={values.vcardOrg}
                onChange={e => onChange({ vcardOrg: e.target.value })}
              />
            </div>
            <div className="form-group-wrap">
              <label htmlFor="vcard-job" className="form-label-sub">
                Job Title
              </label>
              <input
                id="vcard-job"
                type="text"
                className="form-input"
                placeholder="Senior Engineer"
                value={values.vcardJob}
                onChange={e => onChange({ vcardJob: e.target.value })}
              />
            </div>
          </div>

          <div className="grid-2-col">
            <div className="form-group-wrap">
              <label htmlFor="vcard-phone" className="form-label-sub">
                <Phone size={13} /> Phone Number
              </label>
              <input
                id="vcard-phone"
                type="tel"
                className="form-input"
                placeholder="+1 555-0199"
                value={values.vcardPhone}
                onChange={e => onChange({ vcardPhone: e.target.value })}
              />
            </div>
            <div className="form-group-wrap">
              <label htmlFor="vcard-email" className="form-label-sub">
                <Mail size={13} /> Email Address
              </label>
              <input
                id="vcard-email"
                type="email"
                className="form-input"
                placeholder="john@example.com"
                value={values.vcardEmail}
                onChange={e => onChange({ vcardEmail: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group-wrap">
            <label htmlFor="vcard-web" className="form-label-sub">
              <Globe size={13} /> Website
            </label>
            <input
              id="vcard-web"
              type="url"
              className="form-input"
              placeholder="https://john.com"
              value={values.vcardWebsite}
              onChange={e => onChange({ vcardWebsite: e.target.value })}
            />
          </div>

          <div className="grid-2-col">
            <div className="form-group-wrap">
              <label htmlFor="vcard-street" className="form-label-sub">
                Street Address
              </label>
              <input
                id="vcard-street"
                type="text"
                className="form-input"
                placeholder="123 Tech Boulevard"
                value={values.vcardStreet}
                onChange={e => onChange({ vcardStreet: e.target.value })}
              />
            </div>
            <div className="form-group-wrap">
              <label htmlFor="vcard-city" className="form-label-sub">
                City
              </label>
              <input
                id="vcard-city"
                type="text"
                className="form-input"
                placeholder="San Francisco"
                value={values.vcardCity}
                onChange={e => onChange({ vcardCity: e.target.value })}
              />
            </div>
          </div>

          <div className="grid-3-col">
            <div className="form-group-wrap">
              <label htmlFor="vcard-state" className="form-label-sub">
                State
              </label>
              <input
                id="vcard-state"
                type="text"
                className="form-input"
                placeholder="CA"
                value={values.vcardState}
                onChange={e => onChange({ vcardState: e.target.value })}
              />
            </div>
            <div className="form-group-wrap">
              <label htmlFor="vcard-postal" className="form-label-sub">
                Postal Code
              </label>
              <input
                id="vcard-postal"
                type="text"
                className="form-input"
                placeholder="94105"
                value={values.vcardPostal}
                onChange={e => onChange({ vcardPostal: e.target.value })}
              />
            </div>
            <div className="form-group-wrap">
              <label htmlFor="vcard-country" className="form-label-sub">
                Country
              </label>
              <input
                id="vcard-country"
                type="text"
                className="form-input"
                placeholder="USA"
                value={values.vcardCountry}
                onChange={e => onChange({ vcardCountry: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group-wrap">
            <label htmlFor="vcard-note" className="form-label-sub">
              Notes
            </label>
            <input
              id="vcard-note"
              type="text"
              className="form-input"
              placeholder="e.g. Met at Tech Summit 2026"
              value={values.vcardNote}
              onChange={e => onChange({ vcardNote: e.target.value })}
            />
          </div>

          <div className="input-helper">
            {validationError ? (
              <span className="error-text">
                <AlertCircle size={13} /> {validationError}
              </span>
            ) : (
              <span className="hint-text">
                <CheckCircle2 size={13} className="text-success" /> Standard vCard 3.0 format - compatible with Apple Contacts, Google Contacts, and Outlook.
              </span>
            )}
          </div>
        </div>
      )}

      {/* 8. Location / Google Maps (Phase 2) */}
      {type === 'location' && (
        <div className="form-group-grid">
          <div className="form-label-row">
            <label className="form-label">
              <MapPin size={16} className="label-icon text-primary" />
              <span>Location Search Mode</span>
            </label>
            <div className="mode-toggle-group">
              <button
                type="button"
                className={`mode-btn ${values.locationMode === 'address' ? 'active' : ''}`}
                onClick={() => onChange({ locationMode: 'address' })}
              >
                <Map size={13} /> Address / Search
              </button>
              <button
                type="button"
                className={`mode-btn ${values.locationMode === 'coords' ? 'active' : ''}`}
                onClick={() => onChange({ locationMode: 'coords' })}
              >
                Coordinates (GPS)
              </button>
            </div>
          </div>

          {values.locationMode === 'address' ? (
            <div className="form-group-wrap">
              <label htmlFor="loc-address" className="form-label-sub">
                Street Address, Business Name, or Google Maps URL
              </label>
              <input
                id="loc-address"
                type="text"
                className="form-input"
                placeholder="e.g. Eiffel Tower, Paris OR 1600 Amphitheatre Pkwy, Mountain View, CA"
                value={values.locationAddress}
                onChange={e => onChange({ locationAddress: e.target.value })}
                autoFocus
              />
              <span className="hint-text">
                You can also paste an existing Google Maps sharing link.
              </span>
            </div>
          ) : (
            <div className="grid-2-col">
              <div className="form-group-wrap">
                <label htmlFor="loc-lat" className="form-label-sub">
                  Latitude (-90 to 90)
                </label>
                <input
                  id="loc-lat"
                  type="text"
                  className="form-input"
                  placeholder="37.4220"
                  value={values.locationLat}
                  onChange={e => onChange({ locationLat: e.target.value })}
                  autoFocus
                />
              </div>
              <div className="form-group-wrap">
                <label htmlFor="loc-lng" className="form-label-sub">
                  Longitude (-180 to 180)
                </label>
                <input
                  id="loc-lng"
                  type="text"
                  className="form-input"
                  placeholder="-122.0841"
                  value={values.locationLng}
                  onChange={e => onChange({ locationLng: e.target.value })}
                />
              </div>
            </div>
          )}

          <div className="input-helper">
            {validationError ? (
              <span className="error-text">
                <AlertCircle size={13} /> {validationError}
              </span>
            ) : (
              <span className="hint-text">
                <CheckCircle2 size={13} className="text-success" /> Opens Google Maps or Apple Maps directly when scanned.
              </span>
            )}
          </div>
        </div>
      )}

      {/* 9. SMS Form (Phase 2) */}
      {type === 'sms' && (
        <div className="form-group-grid">
          <div className="form-group-wrap">
            <label htmlFor="sms-phone" className="form-label">
              <MessageSquare size={16} className="label-icon text-primary" />
              <span>Recipient Phone Number</span>
              <span className="required-star">*</span>
            </label>
            <input
              id="sms-phone"
              type="tel"
              className="form-input"
              placeholder="e.g. +1 555-0144"
              value={values.smsPhone}
              onChange={e => onChange({ smsPhone: e.target.value })}
              autoFocus
            />
          </div>

          <div className="form-group-wrap">
            <div className="form-label-row">
              <label htmlFor="sms-msg" className="form-label">
                <span>Message Text (Optional)</span>
              </label>
              <span className="char-counter">{values.smsMessage.length} characters</span>
            </div>
            <textarea
              id="sms-msg"
              rows={3}
              className="form-textarea"
              placeholder="e.g. SUBSCRIBE or HELP"
              value={values.smsMessage}
              onChange={e => onChange({ smsMessage: e.target.value })}
            />
          </div>

          <div className="input-helper">
            {validationError ? (
              <span className="error-text">
                <AlertCircle size={13} /> {validationError}
              </span>
            ) : (
              <span className="hint-text">
                <CheckCircle2 size={13} className="text-success" /> Uses the standard SMSTO: protocol for one-tap SMS sending.
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
