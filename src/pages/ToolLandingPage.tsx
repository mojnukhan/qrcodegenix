import React from 'react';
import type { QRType } from '../types/qr';
import { QRGenerator } from '../features/qr/QRGenerator';
import { SEOHead } from '../components/SEOHead';
import { AdSensePlaceholder } from '../components/AdSensePlaceholder';
import { CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';

interface ToolConfig {
  type: QRType;
  path: string;
  title: string;
  metaTitle: string;
  metaDesc: string;
  heading: string;
  subheading: string;
  intro: string;
  useCases: { title: string; desc: string }[];
  steps: string[];
  bestPractices: string[];
  faqs: { q: string; a: string }[];
}

const TOOL_CONFIGS: Record<string, ToolConfig> = {
  '/url-to-qr-code': {
    type: 'url',
    path: '/url-to-qr-code',
    title: 'URL to QR Code Generator',
    metaTitle: 'Free URL to QR Code Generator – Convert Links to QR | QRCodeGenix',
    metaDesc: 'Convert website links, landing pages, and portfolios into high-resolution scannable QR codes. Customize colors, add logos, and download SVG/PNG.',
    heading: 'Free URL to QR Code Generator',
    subheading: 'Turn any web address into an instant, scannable QR code ready for physical prints or digital displays.',
    intro: 'A URL QR code is the most versatile way to bridge offline audiences to digital web experiences. When scanned with any mobile smartphone camera, it immediately navigates the visitor directly to your specified web page without requiring them to type lengthy addresses.',
    useCases: [
      { title: 'Restaurant Menus', desc: 'Place on dining tables so customers can view contactless digital menus on their smartphones.' },
      { title: 'Product Packaging', desc: 'Guide buyers directly to warranty registration, user manuals, and video setup guides.' },
      { title: 'Event Materials & Flyers', desc: 'Direct attendees straight to ticket booking, event schedules, or presentation slides.' },
      { title: 'Business Cards', desc: 'Link to your LinkedIn profile, digital portfolio, or personal website.' },
    ],
    steps: [
      'Type or paste your complete website URL (e.g., https://yourwebsite.com).',
      'Optionally customize the color scheme and upload your company logo.',
      'Check the contrast indicator to ensure high scan reliability.',
      'Download your code in high-res PNG or scalable vector SVG.',
    ],
    bestPractices: [
      'Ensure the target destination website is mobile-responsive and loads fast.',
      'Use HTTPS URLs to prevent browser security warnings when users scan.',
      'Always test scanning the generated QR code on both iOS and Android before mass printing.',
    ],
    faqs: [
      { q: 'Will my URL QR code ever expire?', a: 'No. URL QR codes generated on QRCodeGenix are static and encode the link directly into the pattern. They remain valid forever as long as your destination website URL is active.' },
      { q: 'Do I need to include "https://"?', a: 'Our tool automatically checks and adds "https://" if omitted, ensuring the QR code opens smoothly in all smartphone camera apps.' },
    ],
  },

  '/text-to-qr-code': {
    type: 'text',
    path: '/text-to-qr-code',
    title: 'Text to QR Code Generator',
    metaTitle: 'Text to QR Code Generator – Convert Plain Text to QR | QRCodeGenix',
    metaDesc: 'Create free plain text QR codes for notes, messages, serial numbers, and codes. 100% client-side privacy, instant rendering, and no account needed.',
    heading: 'Plain Text to QR Code Generator',
    subheading: 'Encode plain text, serial numbers, passwords, or secret messages that can be scanned completely offline.',
    intro: 'Text QR codes store raw ASCII or Unicode characters directly inside the matrix. When scanned, the smartphone or scanner displays the exact text string on screen without needing an active internet connection.',
    useCases: [
      { title: 'Warehouse & Inventory', desc: 'Encode product serial numbers, batch identifiers, and SKU codes.' },
      { title: 'WiFi Passwords & Codes', desc: 'Share raw credentials or cryptographic keys securely.' },
      { title: 'Classroom & Education', desc: 'Display quiz clues, quotes, or student assignments without internet access.' },
      { title: 'Hidden Messages', desc: 'Print secret greetings or clues inside greeting cards and scavenger hunts.' },
    ],
    steps: [
      'Enter or paste your text into the text area.',
      'Monitor the character counter (shorter text creates simpler, faster-scanning codes).',
      'Select your preferred color contrast and resolution.',
      'Download in PNG or vector SVG format.',
    ],
    bestPractices: [
      'Keep text concise: QR codes with shorter character lengths have larger module blocks and scan much quicker from a distance.',
      'If you have large blocks of text, increase the Error Correction level or export at a higher resolution (e.g. 1024px).',
    ],
    faqs: [
      { q: 'Does scanning a text QR require internet?', a: 'No. The text is decoded locally by the scanner hardware or camera app without reaching out to any server.' },
      { q: 'How many characters can fit?', a: 'Standard QR codes can store up to several hundred characters comfortably while remaining easy to scan on typical smartphone cameras.' },
    ],
  },

  '/wifi-qr-code-generator': {
    type: 'wifi',
    path: '/wifi-qr-code-generator',
    title: 'Wi-Fi QR Code Generator',
    metaTitle: 'Free Wi-Fi QR Code Generator – One-Tap Network Connect | QRCodeGenix',
    metaDesc: 'Generate free Wi-Fi QR codes for home, office, and cafes. Guests scan to connect automatically without typing passwords. 100% private in browser.',
    heading: 'Wi-Fi QR Code Generator',
    subheading: 'Let guests and customers connect to your Wi-Fi network instantly with a simple camera scan.',
    intro: 'Eliminate the frustration of dictating complex Wi-Fi passwords. When guests scan a Wi-Fi QR code with an iPhone or Android camera, a prompt appears asking "Join this network?". Tapping the prompt connects them automatically.',
    useCases: [
      { title: 'Coffee Shops & Restaurants', desc: 'Print Wi-Fi QR codes on table tent cards or customer receipts.' },
      { title: 'Home Guest Wi-Fi', desc: 'Frame a stylish QR code in your living room or guest bedroom.' },
      { title: 'Coworking Spaces & Offices', desc: 'Allow visitors, contractors, and clients to connect seamlessly without sharing paperwork.' },
      { title: 'Conferences & Venues', desc: 'Display large banners at entryways so attendees can get online immediately.' },
    ],
    steps: [
      'Enter your exact Wi-Fi Network Name (SSID).',
      'Select your security type (most modern routers use WPA/WPA2/WPA3).',
      'Enter the network password and toggle the hidden network switch if applicable.',
      'Customize colors to match your brand and download print-ready files.',
    ],
    bestPractices: [
      'Ensure the SSID matches your router name exactly, including capital letters and spaces.',
      'Remember that your Wi-Fi credentials will be readable by anyone scanning the code, so only use this for guest networks or trusted spaces.',
    ],
    faqs: [
      { q: 'Is my Wi-Fi password sent to your servers?', a: 'Never. QRCodeGenix runs entirely in your web browser. The standard WIFI: protocol string is generated locally on your computer and never leaves your browser window.' },
      { q: 'Does this work on both iPhone and Android?', a: 'Yes. Both iOS (Camera app) and Android (Google Lens / native camera) natively support Wi-Fi QR connection.' },
    ],
  },

  '/whatsapp-qr-code-generator': {
    type: 'whatsapp',
    path: '/whatsapp-qr-code-generator',
    title: 'WhatsApp QR Code Generator',
    metaTitle: 'WhatsApp QR Code Generator – Click-to-Chat QR Codes | QRCodeGenix',
    metaDesc: 'Create free WhatsApp QR codes with pre-filled messages. Customers scan to start a direct WhatsApp chat with your business. Free, fast, and no sign-up.',
    heading: 'WhatsApp QR Code Generator',
    subheading: 'Enable customers to message your WhatsApp support or sales line with a single camera scan.',
    intro: 'A WhatsApp QR code utilizes WhatsApp Click-to-Chat protocol (wa.me). Scanning the code immediately launches WhatsApp on the user’s phone with a conversation addressed to your phone number and an optional pre-filled starter message.',
    useCases: [
      { title: 'Customer Support', desc: 'Place on product manuals or website headers for instant customer care.' },
      { title: 'Lead Generation', desc: 'Put on advertising billboards with a pre-filled "I want a free quote" message.' },
      { title: 'E-commerce Orders', desc: 'Allow shoppers to order or ask product availability questions in real-time.' },
      { title: 'Service Bookings', desc: 'Enable quick appointment scheduling for salons, clinics, and freelancers.' },
    ],
    steps: [
      'Enter your phone number including the country code (e.g. 14155552671). Do not include plus signs, hyphens, or brackets.',
      'Write an optional pre-filled message that customers can send with one tap.',
      'Select colors and export your high-resolution QR code.',
    ],
    bestPractices: [
      'Double check your international country code prefix to ensure chats route to the correct number.',
      'Keep pre-filled messages polite and friendly (e.g., "Hello! I am interested in your pricing plans.").',
    ],
    faqs: [
      { q: 'Does the customer need to save my number first?', a: 'No! That is the main benefit: WhatsApp click-to-chat allows messaging numbers without adding them to address books first.' },
      { q: 'Can I use WhatsApp Business numbers?', a: 'Yes, this standard format works with both regular WhatsApp accounts and WhatsApp Business accounts.' },
    ],
  },

  '/email-qr-code-generator': {
    type: 'email',
    path: '/email-qr-code-generator',
    title: 'Email QR Code Generator',
    metaTitle: 'Free Email QR Code Generator – Scannable Mailto Links | QRCodeGenix',
    metaDesc: 'Generate free Email QR codes with recipient address, subject line, and body template. Clean SVG/PNG downloads with zero sign up required.',
    heading: 'Email QR Code Generator',
    subheading: 'Allow users to compose an email to your inbox instantly with pre-populated subject lines.',
    intro: 'Email QR codes trigger the default email app (Gmail, Apple Mail, Outlook) on smartphones, automatically filling in the recipient address, subject line, and pre-formatted email body so customers can contact you effortlessly.',
    useCases: [
      { title: 'Customer Feedback', desc: 'Gather feedback with a subject like "Feedback: [Store Location]".' },
      { title: 'Job Applications', desc: 'Put on recruitment posters with pre-filled "Job Application: Software Engineer".' },
      { title: 'Press & Media Inquiries', desc: 'Make it easy for journalists to reach your PR team.' },
      { title: 'Warranty Claims', desc: 'Provide an email template for warranty and proof-of-purchase submission.' },
    ],
    steps: [
      'Enter your destination email address.',
      'Optionally type a clear subject line and default email body template.',
      'Customize colors, check scan contrast, and download.',
    ],
    bestPractices: [
      'Ensure the recipient email address is valid and actively monitored.',
      'Keep subject lines descriptive so your mail client can filter incoming QR inquiries automatically.',
    ],
    faqs: [
      { q: 'Which email apps open when scanned?', a: 'The user’s operating system will open whatever default email application they have set on their device (Apple Mail, Gmail, Outlook, etc.).' },
    ],
  },

  '/phone-qr-code-generator': {
    type: 'phone',
    path: '/phone-qr-code-generator',
    title: 'Phone QR Code Generator',
    metaTitle: 'Free Phone QR Code Generator – Direct Call Scannable Codes | QRCodeGenix',
    metaDesc: 'Generate Phone QR codes that prompt smartphones to dial your number immediately. Download free high-res vector SVG and PNG formats.',
    heading: 'Phone Call QR Code Generator',
    subheading: 'Connect callers to your hotline, reception desk, or emergency line with a single camera scan.',
    intro: 'A Phone QR code encodes a standard "tel:" URI. When scanned on a smartphone, it opens the native telephone dialer with your number already typed in, ready for the user to tap Call.',
    useCases: [
      { title: 'Emergency Services & Helplines', desc: 'Essential for roadside assistance, security desks, and medical hotlines.' },
      { title: 'Service Vans & Fleets', desc: 'Display on plumbing, electrical, and moving trucks for instant quote calls.' },
      { title: 'Real Estate Yard Signs', desc: 'Prospective buyers can dial the listing agent instantly while parked outside.' },
      { title: 'Hotel Guest Services', desc: 'Place near room phones or directories for front desk and room service.' },
    ],
    steps: [
      'Type your telephone number, including country and area codes.',
      'Select your colors, margin, and size.',
      'Download the file in PNG or SVG.',
    ],
    bestPractices: [
      'Always include the international country code (+1, +44, +880, etc.) if your audience may include international visitors or travelers roaming on foreign SIMs.',
    ],
    faqs: [
      { q: 'Will the phone automatically make the call without asking?', a: 'For user safety, modern operating systems show the phone number on screen and ask the user to confirm the call before dialing.' },
    ],
  },
  '/vcard-qr-code-generator': {
    type: 'vcard',
    path: '/vcard-qr-code-generator',
    title: 'vCard / Contact QR Code Generator',
    metaTitle: 'Free vCard QR Code Generator – Digital Business Cards | QRCodeGenix',
    metaDesc: 'Create free vCard 3.0 QR codes for business cards and resumes. Let clients save your name, phone, email, and address directly to their contacts.',
    heading: 'vCard & Contact QR Code Generator',
    subheading: 'Turn your contact details into a digital business card that smartphone cameras can import directly into address books.',
    intro: 'A vCard QR code embeds your complete personal or business contact card—including first and last name, phone number, email, company, job title, website, and physical address—in the internationally recognized vCard standard format.',
    useCases: [
      { title: 'Modern Business Cards', desc: 'Print on the back of your business cards so people never have to manually type your details.' },
      { title: 'Conferences & Networking', desc: 'Display on your lanyard, phone wallpaper, or presentation slides for instant connections.' },
      { title: 'Resumes & Portfolios', desc: 'Allow recruiters and hiring managers to save your contact information with a single scan.' },
      { title: 'Storefront Reception', desc: 'Let visiting clients instantly save company helpline and office location info.' },
    ],
    steps: [
      'Enter your name, job title, and company organization.',
      'Fill in your primary telephone number and professional email address.',
      'Optionally include your website link and street address.',
      'Customize colors, check contrast reliability, and download high-res files.',
    ],
    bestPractices: [
      'Because vCard codes contain substantial text data, we recommend exporting at 512px or 1024px resolution for maximum print clarity.',
      'Select High (H) or Quartile (Q) error correction if you plan to embed a company logo in the center.',
    ],
    faqs: [
      { q: 'Does scanning a vCard require an app?', a: 'No. Both modern iOS (iPhone Camera) and Android natively parse vCard QR codes and open the "Create New Contact" prompt automatically.' },
      { q: 'Will this work offline?', a: 'Yes! The entire vCard record is encoded inside the QR image itself, so contacts can be imported even with airplane mode enabled.' },
    ],
  },

  '/contact-qr-code-generator': {
    type: 'vcard',
    path: '/contact-qr-code-generator',
    title: 'Contact QR Code Generator',
    metaTitle: 'Free Contact QR Code Generator – Save Phone & Email | QRCodeGenix',
    metaDesc: 'Generate free contact QR codes to share your business card digitally. Instant scan-to-save on iPhone and Android devices.',
    heading: 'Digital Contact QR Code Generator',
    subheading: 'Share your phone number, email, and company details with one instant scan.',
    intro: 'Contact QR codes eliminate the friction of sharing paper business cards. A single camera scan imports your credentials straight into the user\'s address book.',
    useCases: [
      { title: 'Freelancers & Consultants', desc: 'Effortlessly share contact details with prospective clients on the go.' },
      { title: 'Trade Shows & Expos', desc: 'Capture leads and share your direct representative contact seamlessly.' },
    ],
    steps: [
      'Enter your name, phone number, and email address.',
      'Optionally add company, address, or custom notes.',
      'Download your code in PNG or vector SVG format.',
    ],
    bestPractices: [
      'Always double-check phone numbers with international country codes so foreign contacts can dial directly.',
    ],
    faqs: [
      { q: 'Which phones support vCard scanning?', a: 'Practically all modern iOS and Android devices natively support vCard QR codes.' },
    ],
  },

  '/google-maps-qr-code': {
    type: 'location',
    path: '/google-maps-qr-code',
    title: 'Google Maps Location QR Code Generator',
    metaTitle: 'Google Maps QR Code Generator – Location & GPS Coordinates | QRCodeGenix',
    metaDesc: 'Generate free Google Maps QR codes for store locations, events, and wedding venues. Direct customers straight to GPS navigation with one scan.',
    heading: 'Google Maps Location QR Generator',
    subheading: 'Guide visitors directly to your business address, event venue, or GPS coordinates with one scan.',
    intro: 'A Google Maps QR code connects physical materials directly to GPS navigation. When scanned, it launches Google Maps or Apple Maps with turn-by-turn navigation already set to your destination.',
    useCases: [
      { title: 'Wedding & Party Invitations', desc: 'Direct guests right to the reception hall or outdoor venue entrance.' },
      { title: 'Retail Storefronts & Restaurants', desc: 'Place on flyers, advertisements, or delivery bags so customers can easily find your store.' },
      { title: 'Real Estate Listings', desc: 'Put on yard signs and property brochures so home buyers can drive straight to open houses.' },
      { title: 'Outdoor Events & Festivals', desc: 'Share exact parking lot or campsite coordinates using precise GPS latitude/longitude.' },
    ],
    steps: [
      'Choose between Address Search or exact GPS Coordinates mode.',
      'Enter your business address, paste an existing Google Maps link, or type latitude and longitude.',
      'Verify the live map query in the generator preview.',
      'Download your branded QR code in SVG or high-res PNG.',
    ],
    bestPractices: [
      'If your venue does not have a formal street address, use exact GPS coordinates (Latitude & Longitude) for pinpoint accuracy.',
    ],
    faqs: [
      { q: 'Will this open in Apple Maps on iPhones?', a: 'Yes. Scanning the Google Maps web search link on iPhones will prompt the user to open Google Maps or view the pin in their default browser or Apple Maps.' },
      { q: 'Does generating this require a Google Maps API key?', a: 'No! QRCodeGenix uses standard open map search query protocols, requiring zero API keys and zero paid subscriptions.' },
    ],
  },

  '/sms-qr-code-generator': {
    type: 'sms',
    path: '/sms-qr-code-generator',
    title: 'SMS QR Code Generator',
    metaTitle: 'Free SMS QR Code Generator – One-Tap Text Message Codes | QRCodeGenix',
    metaDesc: 'Generate free SMS QR codes with pre-filled phone numbers and messages. Ideal for SMS marketing, customer feedback, and quick text opt-ins.',
    heading: 'SMS QR Code Generator',
    subheading: 'Allow users to compose and send a pre-filled SMS text message with a single camera scan.',
    intro: 'An SMS QR code utilizes the standardized "SMSTO:" schema. Scanning the code opens the native messaging application on the user’s phone with your destination number and an optional pre-composed text message ready to send.',
    useCases: [
      { title: 'SMS Marketing Opt-Ins', desc: 'Allow customers to join your VIP text club by scanning a code pre-filled with "JOIN" or "DISCOUNT".' },
      { title: 'Customer Feedback & Ratings', desc: 'Collect quick feedback on receipts with a pre-filled text like "FEEDBACK: Great service!".' },
      { title: 'Service Requests', desc: 'Allow apartment residents or office staff to text maintenance hotlines effortlessly.' },
      { title: 'Contest Entries', desc: 'Simplify voting or sweepstakes entry with one-tap text submission.' },
    ],
    steps: [
      'Enter the recipient mobile phone number, including country code.',
      'Type an optional pre-filled message (e.g. "START", "QUOTE", or "INFO").',
      'Select your colors and resolution, then download your ready-to-print code.',
    ],
    bestPractices: [
      'Keep pre-filled SMS messages concise to fit within standard 160-character single-segment SMS limits.',
    ],
    faqs: [
      { q: 'Does scanning the QR code send the SMS automatically?', a: 'No, for user security and carrier billing protection, the phone app opens with the draft message populated, and the user must tap the send button.' },
    ],
  },
};

export const ToolLandingPage: React.FC<{ path: string }> = ({ path }) => {
  const config = TOOL_CONFIGS[path] || TOOL_CONFIGS['/url-to-qr-code'];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: config.title,
    description: config.metaDesc,
    url: `https://qrcodegenix.com${config.path}`,
    mainEntity: {
      '@type': 'FAQPage',
      mainEntity: config.faqs.map(faq => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    },
  };

  return (
    <div className="page-wrapper tool-landing-page">
      <SEOHead
        title={config.metaTitle}
        description={config.metaDesc}
        canonicalPath={config.path}
        schema={schema}
      />

      <AdSensePlaceholder slot="top-banner" className="hero-top-ad" />

      {/* Main Generator with Initial Type Preset */}
      <div className="container py-4">
        <QRGenerator
          key={config.type}
          initialType={config.type}
          heading={config.heading}
          subheading={config.subheading}
        />
      </div>

      <AdSensePlaceholder slot="bottom-banner" className="mid-page-ad" />

      {/* Educational SEO & Guide Content */}
      <section className="tool-content-section">
        <div className="container">
          <div className="content-readable-block">
            <h2 className="content-h2">About {config.title}</h2>
            <p className="content-paragraph">{config.intro}</p>

            <h3 className="content-h3">Popular Use Cases</h3>
            <div className="use-cases-grid">
              {config.useCases.map((uc, idx) => (
                <div key={idx} className="use-case-card">
                  <h4 className="use-case-title">{uc.title}</h4>
                  <p className="use-case-desc">{uc.desc}</p>
                </div>
              ))}
            </div>

            <h3 className="content-h3">How to Create Your Code</h3>
            <ol className="steps-ordered-list">
              {config.steps.map((st, idx) => (
                <li key={idx} className="steps-list-item">
                  <span className="step-badge">{idx + 1}</span>
                  <span>{st}</span>
                </li>
              ))}
            </ol>

            <h3 className="content-h3">Best Practices for Reliable Scanning</h3>
            <ul className="best-practices-list">
              {config.bestPractices.map((bp, idx) => (
                <li key={idx}>
                  <CheckCircle2 size={16} className="text-success inline-icon" />
                  <span>{bp}</span>
                </li>
              ))}
            </ul>

            {config.faqs.length > 0 && (
              <>
                <h3 className="content-h3">Frequently Asked Questions</h3>
                <div className="tool-faq-block">
                  {config.faqs.map((faq, idx) => (
                    <div key={idx} className="tool-faq-card">
                      <h4 className="tool-faq-question">
                        <HelpCircle size={16} className="text-primary inline-icon" />
                        {faq.q}
                      </h4>
                      <p className="tool-faq-answer">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="privacy-callout">
              <ShieldCheck size={20} className="text-success" />
              <div>
                <strong>Client-Side Security Guarantee:</strong> All QR encoding and image rendering for this tool happens strictly inside your local web browser. No entered content or generated files are sent to remote servers.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
