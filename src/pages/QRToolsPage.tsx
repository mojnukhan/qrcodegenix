import React, { useState } from 'react';
import { useRouter } from '../utils/router';
import { SEOHead } from '../components/SEOHead';
import { AdSensePlaceholder } from '../components/AdSensePlaceholder';
import {
  Globe,
  FileText,
  Wifi,
  MessageCircle,
  Mail,
  Phone,
  QrCode,
  Scan,
  Layers,
  MapPin,
  Contact,
  MessageSquare,
  Sparkles,
  ArrowRight,
  LayoutTemplate,
} from 'lucide-react';

export const QRToolsPage: React.FC = () => {
  const { navigate } = useRouter();
  const [activeFilter, setActiveFilter] = useState<'all' | 'generator' | 'scanner' | 'bulk'>('all');

  const allTools = [
    {
      title: 'QR Code Generator Studio',
      path: '/qr-code-generator',
      icon: <QrCode size={24} className="text-primary" />,
      desc: 'All-in-one studio to generate, style, and download QR codes with custom colors and logos.',
      badge: 'Studio',
      category: 'generator',
    },
    {
      title: 'QR Code Scanner & Decoder',
      path: '/qr-code-scanner',
      icon: <Scan size={24} className="text-primary" />,
      desc: 'Scan physical QR codes via webcam or decode screenshot image files directly on your device.',
      badge: 'Scanner',
      category: 'scanner',
    },
    {
      title: 'vCard / Contact QR Generator',
      path: '/vcard-qr-code-generator',
      icon: <Contact size={24} className="text-primary" />,
      desc: 'Export digital business cards with phone, email, company, and address straight to smartphone contacts.',
      badge: 'Business',
      category: 'generator',
    },
    {
      title: 'Google Maps Location QR',
      path: '/google-maps-qr-code',
      icon: <MapPin size={24} className="text-primary" />,
      desc: 'Create scannable maps links or GPS coordinates for store directions, events, and venues.',
      badge: 'Location',
      category: 'generator',
    },
    {
      title: 'SMS QR Code Generator',
      path: '/sms-qr-code-generator',
      icon: <MessageSquare size={24} className="text-primary" />,
      desc: 'Generate QR codes that trigger pre-populated SMS text messages for marketing and inquiries.',
      badge: 'Messaging',
      category: 'generator',
    },
    {
      title: 'Batch QR Code Generator',
      path: '/batch-qr-code-generator',
      icon: <Layers size={24} className="text-primary" />,
      desc: 'Generate dozens of QR codes at once from CSV or plain text lists, with one-click ZIP download.',
      badge: 'Bulk Tools',
      category: 'bulk',
    },
    {
      title: 'Curated QR Templates',
      path: '/templates',
      icon: <LayoutTemplate size={24} className="text-primary" />,
      desc: 'Browse pre-styled templates for restaurant menus, Wi-Fi signs, social media, and business cards.',
      badge: 'Presets',
      category: 'generator',
    },
    {
      title: 'Wi-Fi QR Code Generator',
      path: '/wifi-qr-code-generator',
      icon: <Wifi size={24} className="text-primary" />,
      desc: 'Let guests connect to your home or office Wi-Fi network instantly without typing passwords.',
      badge: 'Network',
      category: 'generator',
    },
    {
      title: 'WhatsApp QR Generator',
      path: '/whatsapp-qr-code-generator',
      icon: <MessageCircle size={24} className="text-primary" />,
      desc: 'Create direct WhatsApp chat links with pre-filled messages for instant customer engagement.',
      badge: 'Chat',
      category: 'generator',
    },
    {
      title: 'URL to QR Code',
      path: '/url-to-qr-code',
      icon: <Globe size={24} className="text-primary" />,
      desc: 'Convert any website, portfolio, or landing page link into a high-res scannable QR code.',
      badge: 'Web Link',
      category: 'generator',
    },
    {
      title: 'Email QR Generator',
      path: '/email-qr-code-generator',
      icon: <Mail size={24} className="text-primary" />,
      desc: 'Generate QR codes that open an email client with pre-populated recipient, subject, and body.',
      badge: 'Email',
      category: 'generator',
    },
    {
      title: 'Phone QR Generator',
      path: '/phone-qr-code-generator',
      icon: <Phone size={24} className="text-primary" />,
      desc: 'Generate QR codes that trigger a direct phone dialer on any mobile smartphone.',
      badge: 'Dialer',
      category: 'generator',
    },
    {
      title: 'Text to QR Code',
      path: '/text-to-qr-code',
      icon: <FileText size={24} className="text-primary" />,
      desc: 'Encode plain text, instructions, serial codes, or secret notes readable completely offline.',
      badge: 'Offline Text',
      category: 'generator',
    },
  ];

  const filteredTools = activeFilter === 'all'
    ? allTools
    : allTools.filter(t => t.category === activeFilter);

  return (
    <div className="page-wrapper tools-page">
      <SEOHead
        title="Free QR Code Tools & Generators Directory | QRCodeGenix"
        description="Explore our complete suite of free, client-side QR tools: Scanner, vCard, Google Maps, SMS, Wi-Fi, WhatsApp, Bulk Generator, and Templates."
        canonicalPath="/qr-tools"
      />

      <AdSensePlaceholder slot="top-banner" className="hero-top-ad" />

      {/* Header */}
      <section className="tools-hero text-center">
        <div className="hero-badge mx-auto">
          <Sparkles size={14} />
          <span>Complete QR Toolkit</span>
        </div>
        <h1 className="tools-headline">Free QR Code Tools</h1>
        <p className="tools-subheadline">
          Dedicated, specialized QR code generators, camera scanner, and bulk processing tools built for speed, privacy, and maximum scan reliability.
        </p>
      </section>

      {/* Filter Tabs */}
      <div className="container">
        <div className="category-pills-row justify-center mb-4" role="tablist" aria-label="Filter Tools">
          <button
            type="button"
            className={`cat-pill-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Tools ({allTools.length})
          </button>
          <button
            type="button"
            className={`cat-pill-btn ${activeFilter === 'generator' ? 'active' : ''}`}
            onClick={() => setActiveFilter('generator')}
          >
            Generators
          </button>
          <button
            type="button"
            className={`cat-pill-btn ${activeFilter === 'scanner' ? 'active' : ''}`}
            onClick={() => setActiveFilter('scanner')}
          >
            Scanner
          </button>
          <button
            type="button"
            className={`cat-pill-btn ${activeFilter === 'bulk' ? 'active' : ''}`}
            onClick={() => setActiveFilter('bulk')}
          >
            Batch & Bulk
          </button>
        </div>

        {/* Tools Cards Grid */}
        <div className="tools-cards-grid">
          {filteredTools.map(tool => (
            <div
              key={tool.path}
              className="tool-card"
              onClick={() => navigate(tool.path)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && navigate(tool.path)}
            >
              <div className="tool-card-header">
                <div className="tool-card-icon">{tool.icon}</div>
                <span className="badge badge-primary-light badge-xs">{tool.badge}</span>
              </div>
              <h3 className="tool-card-title">{tool.title}</h3>
              <p className="tool-card-desc">{tool.desc}</p>
              <div className="tool-card-footer">
                <span className="tool-card-cta">
                  Open Tool <ArrowRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AdSensePlaceholder slot="bottom-banner" className="mid-page-ad" />
    </div>
  );
};
