export type QRType =
  | 'url'
  | 'text'
  | 'wifi'
  | 'whatsapp'
  | 'email'
  | 'phone'
  | 'vcard'
  | 'location'
  | 'sms';

export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface ColorPreset {
  id: string;
  name: string;
  foreground: string;
  background: string;
}

export interface QRFormValues {
  // URL
  url: string;
  // Text
  text: string;
  // WiFi
  wifiSSID: string;
  wifiPassword: string;
  wifiSecurity: 'WPA' | 'WEP' | 'nopass';
  wifiHidden: boolean;
  // WhatsApp
  whatsappPhone: string;
  whatsappMessage: string;
  // Email
  emailAddress: string;
  emailSubject: string;
  emailBody: string;
  // Phone
  phoneNumber: string;

  // vCard / Contact (Phase 2)
  vcardFirstName: string;
  vcardLastName: string;
  vcardOrg: string;
  vcardJob: string;
  vcardPhone: string;
  vcardEmail: string;
  vcardWebsite: string;
  vcardStreet: string;
  vcardCity: string;
  vcardState: string;
  vcardPostal: string;
  vcardCountry: string;
  vcardNote: string;

  // Location / Google Maps (Phase 2)
  locationMode: 'address' | 'coords';
  locationAddress: string;
  locationLat: string;
  locationLng: string;

  // SMS (Phase 2)
  smsPhone: string;
  smsMessage: string;
}

export type QRFrameStyle =
  | 'none'
  | 'bottom-badge'
  | 'top-badge'
  | 'card-polaroid'
  | 'rounded-border'
  | 'open-frame';

export type QRFrameBadgeStyle = 'pill' | 'banner' | 'clean';

export interface QROptions {
  foreground: string;
  background: string;
  isTransparentBg: boolean;
  size: number;
  margin: number;
  errorCorrection: ErrorCorrectionLevel;
  logoDataUrl: string | null;
  logoSizePercent: number; // 10 to 30
  logoShape: 'circle' | 'square';
  // Frame & CTA Options (Phase 2 Extension)
  frameStyle: QRFrameStyle;
  frameText: string;
  frameColor: string;
  frameTextColor: string;
  frameBadgeStyle: QRFrameBadgeStyle;
}

export interface QRHistoryItem {
  id: string;
  type: QRType;
  title: string;
  data: string;
  options: QROptions;
  values: QRFormValues;
  createdAt: number;
}
