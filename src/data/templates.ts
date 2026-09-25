import type { QRType, QRFormValues, QROptions } from '../types/qr';

export interface QRTemplate {
  id: string;
  title: string;
  category: 'business' | 'social' | 'personal' | 'event';
  type: QRType;
  description: string;
  iconName: string;
  badge: string;
  values: Partial<QRFormValues>;
  options?: Partial<QROptions>;
}

export const QR_TEMPLATES: QRTemplate[] = [
  // Business
  {
    id: 'biz-website',
    title: 'Company Website',
    category: 'business',
    type: 'url',
    description: 'Direct customers and prospects to your official business homepage.',
    iconName: 'Globe',
    badge: 'Business',
    values: {
      url: 'https://example.com',
    },
    options: {
      foreground: '#1e3a8a',
      background: '#ffffff',
      frameStyle: 'bottom-badge',
      frameText: 'VISIT WEBSITE',
      frameColor: '#1e3a8a',
      frameTextColor: '#ffffff',
      frameBadgeStyle: 'pill',
    },
  },
  {
    id: 'biz-vcard',
    title: 'Professional Contact Card',
    category: 'business',
    type: 'vcard',
    description: 'Complete vCard 3.0 with name, company title, direct phone, and email.',
    iconName: 'Contact',
    badge: 'Networking',
    values: {
      vcardFirstName: 'Alex',
      vcardLastName: 'Morgan',
      vcardOrg: 'Apex Solutions',
      vcardJob: 'Managing Director',
      vcardPhone: '+1 (555) 234-5678',
      vcardEmail: 'alex.morgan@apex.example',
      vcardWebsite: 'https://apex.example',
    },
    options: {
      foreground: '#0f172a',
      background: '#ffffff',
      errorCorrection: 'Q',
      frameStyle: 'bottom-badge',
      frameText: 'SAVE CONTACT',
      frameColor: '#0f172a',
      frameTextColor: '#ffffff',
      frameBadgeStyle: 'pill',
    },
  },
  {
    id: 'biz-menu',
    title: 'Contactless Dining Menu',
    category: 'business',
    type: 'url',
    description: 'Perfect for dining tables, bars, and food trucks to view digital menus.',
    iconName: 'Utensils',
    badge: 'Hospitality',
    values: {
      url: 'https://menu.example.com',
    },
    options: {
      foreground: '#991b1b',
      background: '#ffffff',
      frameStyle: 'bottom-badge',
      frameText: 'VIEW MENU',
      frameColor: '#991b1b',
      frameTextColor: '#ffffff',
      frameBadgeStyle: 'pill',
    },
  },
  {
    id: 'biz-maps',
    title: 'Retail Store Location',
    category: 'business',
    type: 'location',
    description: 'Guide customers directly to your storefront address with GPS navigation.',
    iconName: 'MapPin',
    badge: 'Retail',
    values: {
      locationMode: 'address',
      locationAddress: '100 Market St, San Francisco, CA 94105',
    },
    options: {
      foreground: '#065f46',
      background: '#ffffff',
    },
  },

  // Social
  {
    id: 'social-youtube',
    title: 'YouTube Channel Subscribe',
    category: 'social',
    type: 'url',
    description: 'Gain subscribers by routing viewers directly to your video channel.',
    iconName: 'Video',
    badge: 'Video',
    values: {
      url: 'https://youtube.com/@yourchannel',
    },
    options: {
      foreground: '#991b1b',
      background: '#ffffff',
    },
  },
  {
    id: 'social-instagram',
    title: 'Instagram Profile',
    category: 'social',
    type: 'url',
    description: 'Grow your social followers with an instant profile scan.',
    iconName: 'Instagram',
    badge: 'Social',
    values: {
      url: 'https://instagram.com/yourhandle',
    },
    options: {
      foreground: '#581c87',
      background: '#ffffff',
    },
  },
  {
    id: 'social-whatsapp',
    title: 'Customer Care WhatsApp Chat',
    category: 'social',
    type: 'whatsapp',
    description: 'Direct chat with your sales or support agent with a friendly starter message.',
    iconName: 'MessageCircle',
    badge: 'Support',
    values: {
      whatsappPhone: '14155550199',
      whatsappMessage: 'Hello! I would like more information on your services.',
    },
    options: {
      foreground: '#065f46',
      background: '#ffffff',
    },
  },

  // Personal
  {
    id: 'pers-wifi',
    title: 'Home Guest Wi-Fi',
    category: 'personal',
    type: 'wifi',
    description: 'Frame in your living room or guest room for instant passwordless connection.',
    iconName: 'Wifi',
    badge: 'Home',
    values: {
      wifiSSID: 'Home_Guest_WiFi',
      wifiPassword: 'WelcomeHome2026',
      wifiSecurity: 'WPA',
      wifiHidden: false,
    },
    options: {
      foreground: '#1e3a8a',
      background: '#ffffff',
    },
  },
  {
    id: 'pers-portfolio',
    title: 'Developer / Creator Portfolio',
    category: 'personal',
    type: 'url',
    description: 'Share your personal website, GitHub, or Behance projects.',
    iconName: 'Briefcase',
    badge: 'Career',
    values: {
      url: 'https://portfolio.example.com',
    },
    options: {
      foreground: '#0f172a',
      background: '#ffffff',
    },
  },

  // Event
  {
    id: 'event-rsvp',
    title: 'Event RSVP & Ticket Booking',
    category: 'event',
    type: 'url',
    description: 'Place on flyers and invitations for quick online registration.',
    iconName: 'Calendar',
    badge: 'Event',
    values: {
      url: 'https://events.example.com/register',
    },
    options: {
      foreground: '#4f46e5',
      background: '#ffffff',
    },
  },
  {
    id: 'event-sms',
    title: 'SMS Keyword Opt-In',
    category: 'event',
    type: 'sms',
    description: 'One-tap text message contest entry or VIP discount club signup.',
    iconName: 'MessageSquare',
    badge: 'Promo',
    values: {
      smsPhone: '+15550199',
      smsMessage: 'VIPCLUB',
    },
    options: {
      foreground: '#581c87',
      background: '#ffffff',
    },
  },
];
