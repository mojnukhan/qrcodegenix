import React, { useState, useMemo } from 'react';
import type { QRType, QRFormValues, QROptions, QRHistoryItem } from '../../types/qr';
import {
  DEFAULT_FORM_VALUES,
  DEFAULT_QR_OPTIONS,
  formatQRData,
} from '../../utils/qrGenerator';
import { saveToLocalHistory } from '../../utils/historyStorage';
import { QRFormInputs } from './QRFormInputs';
import { QRCustomizer } from './QRCustomizer';
import { QRPreview } from './QRPreview';
import { QRHistoryDrawer } from './QRHistoryDrawer';
import {
  Globe,
  FileText,
  Wifi,
  MessageCircle,
  Mail,
  Phone,
  Contact,
  MapPin,
  MessageSquare,
  History,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { useToast } from '../../components/Toast';

interface QRGeneratorProps {
  initialType?: QRType;
  heading?: string;
  subheading?: string;
}

type QRCategory = 'all' | 'basic' | 'communication' | 'business' | 'location' | 'wifi';

interface QRTypeMeta {
  id: QRType;
  label: string;
  category: 'basic' | 'communication' | 'business' | 'location' | 'wifi';
  icon: React.ReactNode;
  desc: string;
}

const QR_TYPES: QRTypeMeta[] = [
  // Basic
  { id: 'url', label: 'URL / Link', category: 'basic', icon: <Globe size={17} />, desc: 'Website address' },
  { id: 'text', label: 'Plain Text', category: 'basic', icon: <FileText size={17} />, desc: 'Notes & messages' },
  // Communication
  { id: 'whatsapp', label: 'WhatsApp', category: 'communication', icon: <MessageCircle size={17} />, desc: 'Direct chat' },
  { id: 'email', label: 'Email', category: 'communication', icon: <Mail size={17} />, desc: 'Pre-filled email' },
  { id: 'phone', label: 'Phone', category: 'communication', icon: <Phone size={17} />, desc: 'Direct dialer' },
  { id: 'sms', label: 'SMS', category: 'communication', icon: <MessageSquare size={17} />, desc: 'Quick text message' },
  // Business
  { id: 'vcard', label: 'Contact (vCard)', category: 'business', icon: <Contact size={17} />, desc: 'Digital business card' },
  // Location
  { id: 'location', label: 'Google Maps', category: 'location', icon: <MapPin size={17} />, desc: 'Map location or GPS' },
  // WiFi
  { id: 'wifi', label: 'Wi-Fi Network', category: 'wifi', icon: <Wifi size={17} />, desc: 'One-tap network login' },
];

export const QRGenerator: React.FC<QRGeneratorProps> = ({
  initialType = 'url',
  heading = 'QR Code Generator',
  subheading = 'Choose a QR type and customize your code.',
}) => {
  const pendingTemplate = useMemo(() => {
    try {
      const raw = sessionStorage.getItem('qrcodegenix_pending_template');
      if (raw) {
        sessionStorage.removeItem('qrcodegenix_pending_template');
        return JSON.parse(raw);
      }
    } catch {
      // ignore
    }
    return null;
  }, []);

  const [activeType, setActiveType] = useState<QRType>(pendingTemplate?.type || initialType);
  const [activeCategory, setActiveCategory] = useState<QRCategory>('all');
  const [formValues, setFormValues] = useState<QRFormValues>(() =>
    pendingTemplate?.values ? { ...DEFAULT_FORM_VALUES, ...pendingTemplate.values } : DEFAULT_FORM_VALUES
  );
  const [options, setOptions] = useState<QROptions>(() =>
    pendingTemplate?.options ? { ...DEFAULT_QR_OPTIONS, ...pendingTemplate.options } : DEFAULT_QR_OPTIONS
  );
  const [historyOpen, setHistoryOpen] = useState(false);
  const { showToast } = useToast();


  const categories: { id: QRCategory; label: string }[] = [
    { id: 'all', label: 'All (9)' },
    { id: 'basic', label: 'Basic' },
    { id: 'communication', label: 'Communication' },
    { id: 'business', label: 'Business' },
    { id: 'location', label: 'Location' },
    { id: 'wifi', label: 'Wi-Fi' },
  ];

  const visibleTypes = useMemo(() => {
    if (activeCategory === 'all') return QR_TYPES;
    return QR_TYPES.filter(t => t.category === activeCategory);
  }, [activeCategory]);

  // Calculate formatted QR data and validation status
  const { data: qrData, isValid, error: validationError } = useMemo(() => {
    return formatQRData(activeType, formValues);
  }, [activeType, formValues]);

  const handleFormChange = (updated: Partial<QRFormValues>) => {
    setFormValues(prev => ({ ...prev, ...updated }));
  };

  const handleOptionsChange = (updated: Partial<QROptions>) => {
    setOptions(prev => ({ ...prev, ...updated }));
  };

  // Reset all settings and inputs
  const handleReset = () => {
    const hasEnteredData =
      formValues.text ||
      formValues.wifiSSID ||
      formValues.whatsappPhone ||
      formValues.emailAddress ||
      formValues.phoneNumber ||
      formValues.vcardFirstName ||
      formValues.vcardLastName ||
      formValues.vcardOrg ||
      formValues.locationAddress ||
      formValues.locationLat ||
      formValues.smsPhone ||
      (activeType === 'url' && formValues.url !== DEFAULT_FORM_VALUES.url);

    if (hasEnteredData) {
      if (!window.confirm('Reset all values and customizations to default?')) {
        return;
      }
    }

    setFormValues(DEFAULT_FORM_VALUES);
    setOptions(DEFAULT_QR_OPTIONS);
    showToast('Reset to default settings', 'info');
  };

  // Callback when a user downloads or copies their QR code
  const handleSuccessfulAction = () => {
    if (isValid && qrData) {
      let title = '';
      if (activeType === 'url') title = formValues.url;
      else if (activeType === 'wifi') title = `WiFi: ${formValues.wifiSSID}`;
      else if (activeType === 'whatsapp') title = `WhatsApp: ${formValues.whatsappPhone}`;
      else if (activeType === 'email') title = `Email: ${formValues.emailAddress}`;
      else if (activeType === 'phone') title = `Call: ${formValues.phoneNumber}`;
      else if (activeType === 'sms') title = `SMS: ${formValues.smsPhone}`;
      else if (activeType === 'vcard') {
        const name = [formValues.vcardFirstName, formValues.vcardLastName].filter(Boolean).join(' ');
        title = `Contact: ${name || formValues.vcardOrg || 'vCard'}`;
      } else if (activeType === 'location') {
        title = `Maps: ${formValues.locationAddress || `${formValues.locationLat},${formValues.locationLng}`}`;
      } else {
        title = formValues.text.slice(0, 25);
      }

      saveToLocalHistory(activeType, title, qrData, options, formValues);
    }
  };

  // Load an item from history
  const handleSelectHistoryItem = (item: QRHistoryItem) => {
    setActiveType(item.type);
    setFormValues(item.values);
    setOptions(item.options);
  };

  return (
    <section className="generator-workspace" id="qr-generator-section" aria-label="QR Code Generator Workspace">
      {/* Workspace Header Bar */}
      <div className="workspace-header">
        <div className="workspace-titles">
          <div className="workspace-badge">
            <Sparkles size={13} />
            <span>Instant & Browser-Based</span>
          </div>
          <h1 className="workspace-heading">{heading}</h1>
          <p className="workspace-subheading">{subheading}</p>
        </div>

        <div className="workspace-quick-actions">
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => setHistoryOpen(true)}
            aria-label="Open local generation history"
          >
            <History size={16} />
            <span>History</span>
          </button>

          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={handleReset}
            aria-label="Reset generator to defaults"
            title="Reset all inputs"
          >
            <RotateCcw size={16} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="category-pills-row" role="tablist" aria-label="Filter QR Categories">
        {categories.map(cat => (
          <button
            key={cat.id}
            type="button"
            className={`cat-pill-btn ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* QR Type Selector Grid */}
      <div className="type-selector-tabs categorized-grid" role="tablist" aria-label="QR Code Types">
        {visibleTypes.map(t => {
          const isActive = activeType === t.id;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={isActive}
              className={`type-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => setActiveType(t.id)}
            >
              <span className="type-tab-icon">{t.icon}</span>
              <span className="type-tab-label">{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Two-Column Generator Grid */}
      <div className="generator-grid">
        {/* Left Column: Form & Customization */}
        <div className="generator-left-col">
          {/* Active Input Card */}
          <div className="content-card form-card">
            <div className="card-top-bar">
              <h2 className="card-top-title">
                1. Enter Content for <span className="capitalize text-primary">{activeType === 'vcard' ? 'Contact / vCard' : activeType}</span>
              </h2>
            </div>
            <QRFormInputs
              type={activeType}
              values={formValues}
              onChange={handleFormChange}
              isValid={isValid}
              validationError={validationError}
            />
          </div>

          {/* Customization Card */}
          <div className="content-card customizer-card">
            <div className="card-top-bar">
              <h2 className="card-top-title">2. Customize Appearance & Reliability</h2>
            </div>
            <QRCustomizer
              options={options}
              onChange={handleOptionsChange}
              onReset={() => setOptions(DEFAULT_QR_OPTIONS)}
            />
          </div>
        </div>

        {/* Right Column: Live QR Preview & Download */}
        <div className="generator-right-col">
          <QRPreview
            type={activeType}
            qrData={qrData}
            isValid={isValid}
            options={options}
            onSuccessfulAction={handleSuccessfulAction}
          />
        </div>
      </div>

      {/* History Drawer Modal */}
      {historyOpen && (
        <QRHistoryDrawer
          isOpen={historyOpen}
          onClose={() => setHistoryOpen(false)}
          onSelect={handleSelectHistoryItem}
        />
      )}
    </section>
  );
};
