import React, { useState } from 'react';
import { useRouter } from '../utils/router';
import { SEOHead } from '../components/SEOHead';
import { AdSensePlaceholder } from '../components/AdSensePlaceholder';
import { QR_TEMPLATES, type QRTemplate } from '../data/templates';
import {
  Globe,
  Contact,
  Utensils,
  MapPin,
  Video,
  Camera,
  MessageCircle,
  Wifi,
  Briefcase,
  Calendar,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { useToast } from '../components/Toast';

export const TemplatesPage: React.FC = () => {
  const { navigate } = useRouter();
  const { showToast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Templates' },
    { id: 'business', label: 'Business' },
    { id: 'social', label: 'Social Media' },
    { id: 'personal', label: 'Personal & Home' },
    { id: 'event', label: 'Events & Promo' },
  ];

  const filteredTemplates = selectedCategory === 'all'
    ? QR_TEMPLATES
    : QR_TEMPLATES.filter(t => t.category === selectedCategory);

  const getTemplateIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe size={22} className="text-primary" />;
      case 'Contact': return <Contact size={22} className="text-primary" />;
      case 'Utensils': return <Utensils size={22} className="text-primary" />;
      case 'MapPin': return <MapPin size={22} className="text-primary" />;
      case 'Video': return <Video size={22} className="text-primary" />;
      case 'Instagram': return <Camera size={22} className="text-primary" />;
      case 'MessageCircle': return <MessageCircle size={22} className="text-primary" />;
      case 'Wifi': return <Wifi size={22} className="text-primary" />;
      case 'Briefcase': return <Briefcase size={22} className="text-primary" />;
      case 'Calendar': return <Calendar size={22} className="text-primary" />;
      case 'MessageSquare': return <MessageSquare size={22} className="text-primary" />;
      default: return <Sparkles size={22} className="text-primary" />;
    }
  };

  const handleUseTemplate = (template: QRTemplate) => {
    try {
      sessionStorage.setItem('qrcodegenix_pending_template', JSON.stringify({
        type: template.type,
        values: template.values,
        options: template.options,
      }));
      showToast(`Loaded "${template.title}" template into editor`, 'success');
      navigate('/qr-code-generator');
    } catch (e) {
      console.error(e);
      navigate('/qr-code-generator');
    }
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Free QR Code Templates - QRCodeGenix',
    description: 'Explore pre-configured QR code templates for business cards, restaurant menus, Wi-Fi, social media, and events.',
    url: 'https://qrcodegenix.com/templates',
  };

  return (
    <div className="page-wrapper templates-page">
      <SEOHead
        title="Free QR Code Templates – Business, Social & WiFi | QRCodeGenix"
        description="Choose from curated, professionally styled QR code templates for restaurants, networking, events, social profiles, and WiFi. One-click customization."
        canonicalPath="/templates"
        schema={schema}
      />

      <AdSensePlaceholder slot="top-banner" className="hero-top-ad" />

      {/* Hero */}
      <section className="tools-hero text-center">
        <div className="hero-badge mx-auto">
          <Layers size={14} />
          <span>Curated Presets</span>
        </div>
        <h1 className="tools-headline">QR Code Templates</h1>
        <p className="tools-subheadline">
          Jumpstart your QR creations with pre-styled designs and structured templates for business, social media, events, and personal use.
        </p>
      </section>

      {/* Category Pills */}
      <div className="container">
        <div className="category-pills-row justify-center mb-4" role="tablist" aria-label="Filter Templates">
          {categories.map(cat => (
            <button
              key={cat.id}
              type="button"
              className={`cat-pill-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="tools-cards-grid">
          {filteredTemplates.map(template => (
            <div
              key={template.id}
              className="tool-card template-card"
              onClick={() => handleUseTemplate(template)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && handleUseTemplate(template)}
            >
              <div className="tool-card-header">
                <div className="tool-card-icon">{getTemplateIcon(template.iconName)}</div>
                <span className="badge badge-primary-light badge-xs">{template.badge}</span>
              </div>
              <h3 className="tool-card-title">{template.title}</h3>
              <p className="tool-card-desc">{template.description}</p>
              <div className="tool-card-footer">
                <span className="tool-card-cta">
                  Customize Template <ArrowRight size={14} />
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
