import QRCode from 'qrcode';
import type { QRType, QRFormValues, QROptions, ColorPreset } from '../types/qr';

export const COLOR_PRESETS: ColorPreset[] = [
  { id: 'classic', name: 'Classic', foreground: '#000000', background: '#ffffff' },
  { id: 'blue', name: 'Deep Blue', foreground: '#1e3a8a', background: '#ffffff' },
  { id: 'green', name: 'Emerald', foreground: '#065f46', background: '#ffffff' },
  { id: 'purple', name: 'Royal Purple', foreground: '#581c87', background: '#ffffff' },
  { id: 'red', name: 'Crimson', foreground: '#991b1b', background: '#ffffff' },
  { id: 'dark', name: 'Dark Slate', foreground: '#f8fafc', background: '#0f172a' },
];

export const DEFAULT_FORM_VALUES: QRFormValues = {
  // URL
  url: 'https://example.com',
  // Text
  text: '',
  // WiFi
  wifiSSID: '',
  wifiPassword: '',
  wifiSecurity: 'WPA',
  wifiHidden: false,
  // WhatsApp
  whatsappPhone: '',
  whatsappMessage: '',
  // Email
  emailAddress: '',
  emailSubject: '',
  emailBody: '',
  // Phone
  phoneNumber: '',

  // vCard / Contact (Phase 2)
  vcardFirstName: '',
  vcardLastName: '',
  vcardOrg: '',
  vcardJob: '',
  vcardPhone: '',
  vcardEmail: '',
  vcardWebsite: '',
  vcardStreet: '',
  vcardCity: '',
  vcardState: '',
  vcardPostal: '',
  vcardCountry: '',
  vcardNote: '',

  // Location (Phase 2)
  locationMode: 'address',
  locationAddress: '',
  locationLat: '',
  locationLng: '',

  // SMS (Phase 2)
  smsPhone: '',
  smsMessage: '',
};

export const DEFAULT_QR_OPTIONS: QROptions = {
  foreground: '#000000',
  background: '#ffffff',
  isTransparentBg: false,
  size: 512,
  margin: 2,
  errorCorrection: 'M',
  logoDataUrl: null,
  logoSizePercent: 20,
  logoShape: 'circle',
  frameStyle: 'none',
  frameText: 'SCAN ME',
  frameColor: '#0f172a',
  frameTextColor: '#ffffff',
  frameBadgeStyle: 'pill',
};

// Escape special characters in WiFi configuration
function escapeWiFiString(str: string): string {
  return str.replace(/([\\;,:"])/g, '\\$1');
}

// Escape special characters in vCard fields
function escapeVCard(str: string): string {
  return str.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

/**
 * Format raw form data into standard QR payload string
 */
export function formatQRData(type: QRType, values: QRFormValues): { data: string; isValid: boolean; error?: string } {
  switch (type) {
    case 'url': {
      let url = values.url.trim();
      if (!url) {
        return { data: '', isValid: false, error: 'Please enter a website URL.' };
      }
      if (!/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
      }
      try {
        const parsed = new URL(url);
        if (!parsed.hostname || (!parsed.hostname.includes('.') && parsed.hostname !== 'localhost')) {
          return { data: url, isValid: false, error: 'Please enter a valid domain (e.g. example.com).' };
        }
        return { data: url, isValid: true };
      } catch {
        return { data: url, isValid: false, error: 'Please enter a valid website URL.' };
      }
    }

    case 'text': {
      const text = values.text.trim();
      if (!text) {
        return { data: '', isValid: false, error: 'Please enter some text.' };
      }
      return { data: text, isValid: true };
    }

    case 'wifi': {
      const ssid = values.wifiSSID.trim();
      if (!ssid) {
        return { data: '', isValid: false, error: 'Network name (SSID) is required.' };
      }
      const security = values.wifiSecurity;
      const pass = values.wifiPassword;
      if (security !== 'nopass' && !pass) {
        return { data: '', isValid: false, error: 'Password is required for secured network.' };
      }
      const passPart = security !== 'nopass' ? `P:${escapeWiFiString(pass)};` : '';
      const payload = `WIFI:S:${escapeWiFiString(ssid)};T:${security};${passPart}H:${values.wifiHidden ? 'true' : 'false'};;`;
      return { data: payload, isValid: true };
    }

    case 'whatsapp': {
      let rawPhone = values.whatsappPhone.trim().replace(/[^\d+]/g, '');
      if (rawPhone.startsWith('+')) {
        rawPhone = rawPhone.slice(1);
      }
      if (!rawPhone || rawPhone.length < 5) {
        return { data: '', isValid: false, error: 'Please enter a valid phone number with country code.' };
      }
      let url = `https://wa.me/${rawPhone}`;
      if (values.whatsappMessage.trim()) {
        url += `?text=${encodeURIComponent(values.whatsappMessage.trim())}`;
      }
      return { data: url, isValid: true };
    }

    case 'email': {
      const email = values.emailAddress.trim();
      if (!email) {
        return { data: '', isValid: false, error: 'Email address is required.' };
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return { data: '', isValid: false, error: 'Please enter a valid email address.' };
      }
      const params: string[] = [];
      if (values.emailSubject.trim()) {
        params.push(`subject=${encodeURIComponent(values.emailSubject.trim())}`);
      }
      if (values.emailBody.trim()) {
        params.push(`body=${encodeURIComponent(values.emailBody.trim())}`);
      }
      const query = params.length > 0 ? `?${params.join('&')}` : '';
      return { data: `mailto:${email}${query}`, isValid: true };
    }

    case 'phone': {
      const phone = values.phoneNumber.trim();
      if (!phone || phone.replace(/[^\d]/g, '').length < 3) {
        return { data: '', isValid: false, error: 'Please enter a valid phone number.' };
      }
      return { data: `tel:${phone}`, isValid: true };
    }

    // Phase 2: vCard / Contact
    case 'vcard': {
      const first = values.vcardFirstName.trim();
      const last = values.vcardLastName.trim();
      const org = values.vcardOrg.trim();
      const phone = values.vcardPhone.trim();
      const email = values.vcardEmail.trim();

      if (!first && !last && !org && !phone) {
        return { data: '', isValid: false, error: 'Please provide at least a name, organization, or phone number.' };
      }

      const fullName = [first, last].filter(Boolean).join(' ') || org;
      const lines: string[] = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${escapeVCard(last)};${escapeVCard(first)};;;`,
        `FN:${escapeVCard(fullName)}`,
      ];

      if (org) lines.push(`ORG:${escapeVCard(org)}`);
      if (values.vcardJob.trim()) lines.push(`TITLE:${escapeVCard(values.vcardJob.trim())}`);
      if (phone) lines.push(`TEL;TYPE=CELL:${escapeVCard(phone)}`);
      if (email) lines.push(`EMAIL:${escapeVCard(email)}`);
      if (values.vcardWebsite.trim()) lines.push(`URL:${escapeVCard(values.vcardWebsite.trim())}`);

      const hasAddress =
        values.vcardStreet || values.vcardCity || values.vcardState || values.vcardPostal || values.vcardCountry;
      if (hasAddress) {
        lines.push(
          `ADR;TYPE=WORK:;;${escapeVCard(values.vcardStreet.trim())};${escapeVCard(values.vcardCity.trim())};${escapeVCard(
            values.vcardState.trim()
          )};${escapeVCard(values.vcardPostal.trim())};${escapeVCard(values.vcardCountry.trim())}`
        );
      }

      if (values.vcardNote.trim()) lines.push(`NOTE:${escapeVCard(values.vcardNote.trim())}`);
      lines.push('END:VCARD');

      return { data: lines.join('\n'), isValid: true };
    }

    // Phase 2: Google Maps Location
    case 'location': {
      if (values.locationMode === 'coords') {
        const lat = parseFloat(values.locationLat.trim());
        const lng = parseFloat(values.locationLng.trim());
        if (isNaN(lat) || lat < -90 || lat > 90) {
          return { data: '', isValid: false, error: 'Please enter a valid latitude (-90 to 90).' };
        }
        if (isNaN(lng) || lng < -180 || lng > 180) {
          return { data: '', isValid: false, error: 'Please enter a valid longitude (-180 to 180).' };
        }
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
        return { data: mapsUrl, isValid: true };
      } else {
        const addr = values.locationAddress.trim();
        if (!addr) {
          return { data: '', isValid: false, error: 'Please enter a location address or Google Maps link.' };
        }
        // If user already pasted a Google Maps link
        if (/^https?:\/\/(www\.)?(google\.[a-z.]+\/maps|maps\.app\.goo\.gl|goo\.gl\/maps)/i.test(addr)) {
          return { data: addr, isValid: true };
        }
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addr)}`;
        return { data: mapsUrl, isValid: true };
      }
    }

    // Phase 2: SMS
    case 'sms': {
      const phone = values.smsPhone.trim();
      if (!phone || phone.replace(/[^\d]/g, '').length < 3) {
        return { data: '', isValid: false, error: 'Please enter a valid phone number.' };
      }
      const msg = values.smsMessage.trim();
      const payload = msg ? `SMSTO:${phone}:${msg}` : `SMSTO:${phone}`;
      return { data: payload, isValid: true };
    }

    default:
      return { data: '', isValid: false, error: 'Unknown QR type' };
  }
}

/**
 * Calculate WCAG luminance of a hex color
 */
function getLuminance(hex: string): number {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

  const a = [r, g, b].map(v => {
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

/**
 * Calculate contrast ratio between two colors
 */
export function getContrastRatio(foreground: string, background: string): number {
  try {
    const l1 = getLuminance(foreground);
    const l2 = getLuminance(background);
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    return Math.round(ratio * 10) / 10;
  } catch {
    return 21;
  }
}

/**
 * Load an image from data URL
 */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Render QR code with custom colors and embedded logo onto canvas
 */
/**
 * Helper to draw a rounded rectangle on a canvas context
 */
function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
): void {
  const radius = Math.max(0, Math.min(r, w / 2, h / 2));
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.arcTo(x + w, y, x + w, y + radius, radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.arcTo(x + w, y + h, x + w - radius, y + h, radius);
  ctx.lineTo(x + radius, y + h);
  ctx.arcTo(x, y + h, x, y + h - radius, radius);
  ctx.lineTo(x, y + radius);
  ctx.arcTo(x, y, x + radius, y, radius);
  ctx.closePath();
}

/**
 * Calculate geometry dimensions for frame styles
 */
export function getFrameLayout(options: QROptions) {
  const S = options.size;
  if (!options.frameStyle || options.frameStyle === 'none') {
    return {
      totalW: S,
      totalH: S,
      qrX: 0,
      qrY: 0,
      qrSize: S,
      padX: 0,
      padTop: 0,
      padBottom: 0,
      badgeH: 0,
    };
  }

  const padX = Math.round(S * 0.08);
  const badgeH = Math.max(38, Math.round(S * 0.12));

  let padTop = Math.round(S * 0.08);
  let padBottom = Math.round(S * 0.08) + Math.round(badgeH * 0.95);

  if (options.frameStyle === 'top-badge') {
    padTop = Math.round(S * 0.08) + Math.round(badgeH * 0.95);
    padBottom = Math.round(S * 0.08);
  } else if (options.frameStyle === 'card-polaroid') {
    padTop = Math.round(S * 0.08);
    padBottom = Math.round(S * 0.22);
  }

  const totalW = S + padX * 2;
  const totalH = S + padTop + padBottom;

  return {
    totalW,
    totalH,
    qrX: padX,
    qrY: padTop,
    qrSize: S,
    padX,
    padTop,
    padBottom,
    badgeH,
  };
}

/**
 * Render QR code with custom colors, embedded logo, and optional CTA frame onto canvas
 */
export async function renderQRToCanvas(
  canvas: HTMLCanvasElement,
  text: string,
  options: QROptions
): Promise<void> {
  const actualBg = options.isTransparentBg ? '#00000000' : options.background;

  // If no frame is selected, render standard raw QR directly
  if (!options.frameStyle || options.frameStyle === 'none') {
    await QRCode.toCanvas(canvas, text, {
      width: options.size,
      margin: options.margin,
      color: {
        dark: options.foreground,
        light: actualBg,
      },
      errorCorrectionLevel: options.errorCorrection,
    });

    // Reset inline dimensions injected by QRCode library so CSS responsive rules take full control
    canvas.style.width = '';
    canvas.style.height = '';

    if (options.logoDataUrl) {
      await drawLogoOnCanvas(canvas, options);
    }
    return;
  }

  // Render raw QR code to offscreen canvas
  const rawCanvas = document.createElement('canvas');
  await QRCode.toCanvas(rawCanvas, text, {
    width: options.size,
    margin: options.margin,
    color: {
      dark: options.foreground,
      light: actualBg,
    },
    errorCorrectionLevel: options.errorCorrection,
  });

  if (options.logoDataUrl) {
    await drawLogoOnCanvas(rawCanvas, options);
  }

  // Setup target framed canvas
  const layout = getFrameLayout(options);
  canvas.width = layout.totalW;
  canvas.height = layout.totalH;
  canvas.style.width = '';
  canvas.style.height = '';
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Background
  if (options.isTransparentBg) {
    ctx.clearRect(0, 0, layout.totalW, layout.totalH);
  } else {
    ctx.fillStyle = options.background;
    ctx.fillRect(0, 0, layout.totalW, layout.totalH);
  }

  // Border parameters
  const bw = Math.max(3, Math.round(layout.qrSize * 0.015));
  const br = Math.round(layout.qrSize * 0.04);
  const bX = Math.round(layout.padX * 0.35);
  const bY = Math.round(layout.padTop * 0.35);
  const bW = layout.totalW - bX * 2;
  const bH = layout.totalH - bY * 2;

  // Draw Frame Border
  if (options.frameStyle === 'open-frame') {
    ctx.strokeStyle = options.frameColor;
    ctx.lineWidth = bw * 1.5;
    ctx.lineCap = 'round';
    const arm = Math.round(layout.qrSize * 0.15);
    // Top-Left
    ctx.beginPath();
    ctx.moveTo(bX, bY + arm);
    ctx.lineTo(bX, bY);
    ctx.lineTo(bX + arm, bY);
    ctx.stroke();
    // Top-Right
    ctx.beginPath();
    ctx.moveTo(bX + bW - arm, bY);
    ctx.lineTo(bX + bW, bY);
    ctx.lineTo(bX + bW, bY + arm);
    ctx.stroke();
    // Bottom-Left
    ctx.beginPath();
    ctx.moveTo(bX, bY + bH - arm);
    ctx.lineTo(bX, bY + bH);
    ctx.lineTo(bX + arm, bY + bH);
    ctx.stroke();
    // Bottom-Right
    ctx.beginPath();
    ctx.moveTo(bX + bW - arm, bY + bH);
    ctx.lineTo(bX + bW, bY + bH);
    ctx.lineTo(bX + bW, bY + bH - arm);
    ctx.stroke();
  } else {
    ctx.strokeStyle = options.frameColor;
    ctx.lineWidth = bw;
    drawRoundedRect(ctx, bX, bY, bW, bH, br);
    ctx.stroke();
  }

  // Draw QR code image
  ctx.drawImage(rawCanvas, layout.qrX, layout.qrY, layout.qrSize, layout.qrSize);

  // Draw CTA Pill Badge & Text
  const ctaText = (options.frameText || 'SCAN ME').trim().toUpperCase();
  const fontSize = Math.max(14, Math.round(layout.badgeH * 0.44));
  ctx.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
  const textMetrics = ctx.measureText(ctaText);
  const textW = textMetrics.width;

  let pillW = Math.max(textW + Math.round(layout.badgeH * 1.2), Math.round(layout.qrSize * 0.52));
  if (options.frameBadgeStyle === 'banner') {
    pillW = bW - Math.round(layout.padX * 0.4);
  } else {
    pillW = Math.min(pillW, layout.totalW - bX * 2);
  }
  const pillH = layout.badgeH;
  const pillX = (layout.totalW - pillW) / 2;

  let pillY: number;
  if (options.frameStyle === 'top-badge') {
    pillY = Math.round(bY + (layout.padTop - bY - layout.badgeH) / 2);
  } else {
    pillY = Math.round(layout.qrY + layout.qrSize + (layout.padBottom - layout.badgeH) / 2);
  }

  // Badge background fill
  if (options.frameBadgeStyle === 'pill') {
    ctx.fillStyle = options.frameColor;
    drawRoundedRect(ctx, pillX, pillY, pillW, pillH, pillH / 2);
    ctx.fill();
  } else if (options.frameBadgeStyle === 'banner') {
    ctx.fillStyle = options.frameColor;
    drawRoundedRect(ctx, pillX, pillY, pillW, pillH, Math.round(br * 0.6));
    ctx.fill();
  }

  // Badge text
  ctx.fillStyle = options.frameBadgeStyle === 'clean' ? options.frameColor : options.frameTextColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(ctaText, layout.totalW / 2, pillY + pillH / 2);
}

/**
 * Draw logo helper onto canvas
 */
async function drawLogoOnCanvas(canvas: HTMLCanvasElement, options: QROptions): Promise<void> {
  if (!options.logoDataUrl) return;
  try {
    const img = await loadImage(options.logoDataUrl);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const clampedPercent = Math.min(Math.max(options.logoSizePercent, 10), 30);
    const logoWidth = (canvasWidth * clampedPercent) / 100;
    const logoHeight = (logoWidth * img.height) / img.width;

    const x = (canvasWidth - logoWidth) / 2;
    const y = (canvasHeight - logoHeight) / 2;
    const padding = logoWidth * 0.15;

    ctx.save();
    const shieldColor = options.isTransparentBg ? '#ffffff' : options.background;
    ctx.fillStyle = shieldColor;

    if (options.logoShape === 'circle') {
      const radius = Math.max(logoWidth, logoHeight) / 2 + padding;
      ctx.beginPath();
      ctx.arc(canvasWidth / 2, canvasHeight / 2, radius, 0, Math.PI * 2);
      ctx.fill();
    } else {
      const rx = x - padding;
      const ry = y - padding;
      const rw = logoWidth + padding * 2;
      const rh = logoHeight + padding * 2;
      const borderRadius = 8;
      ctx.beginPath();
      drawRoundedRect(ctx, rx, ry, rw, rh, borderRadius);
      ctx.fill();
    }

    ctx.drawImage(img, x, y, logoWidth, logoHeight);
    ctx.restore();
  } catch (err) {
    console.error('Failed to draw logo on QR canvas:', err);
  }
}

/**
 * Generate scalable SVG string with optional embedded logo and CTA frame
 */
export async function generateQRSvgString(text: string, options: QROptions): Promise<string> {
  const actualBg = options.isTransparentBg ? '#00000000' : options.background;

  let rawSvg = await QRCode.toString(text, {
    type: 'svg',
    width: options.size,
    margin: options.margin,
    color: {
      dark: options.foreground,
      light: actualBg,
    },
    errorCorrectionLevel: options.errorCorrection,
  });

  if (options.logoDataUrl) {
    const size = options.size;
    const clampedPercent = Math.min(Math.max(options.logoSizePercent, 10), 30);
    const logoW = (size * clampedPercent) / 100;
    const logoH = logoW;
    const x = (size - logoW) / 2;
    const y = (size - logoH) / 2;
    const pad = logoW * 0.15;
    const shieldColor = options.isTransparentBg ? '#ffffff' : options.background;

    let overlay = '';
    if (options.logoShape === 'circle') {
      const radius = logoW / 2 + pad;
      overlay = `
        <circle cx="${size / 2}" cy="${size / 2}" r="${radius}" fill="${shieldColor}" />
        <image href="${options.logoDataUrl}" x="${x}" y="${y}" width="${logoW}" height="${logoH}" preserveAspectRatio="xMidYMid meet" />
      `;
    } else {
      overlay = `
        <rect x="${x - pad}" y="${y - pad}" width="${logoW + pad * 2}" height="${logoH + pad * 2}" rx="8" fill="${shieldColor}" />
        <image href="${options.logoDataUrl}" x="${x}" y="${y}" width="${logoW}" height="${logoH}" preserveAspectRatio="xMidYMid meet" />
      `;
    }

    rawSvg = rawSvg.replace('</svg>', `${overlay}</svg>`);
  }

  // If no frame is selected, return raw SVG directly
  if (!options.frameStyle || options.frameStyle === 'none') {
    return rawSvg;
  }

  // Framed SVG Composition
  const layout = getFrameLayout(options);
  const ctaText = (options.frameText || 'SCAN ME').trim().toUpperCase();
  const fontSize = Math.max(14, Math.round(layout.badgeH * 0.44));
  const bw = Math.max(3, Math.round(layout.qrSize * 0.015));
  const br = Math.round(layout.qrSize * 0.04);
  const bX = Math.round(layout.padX * 0.35);
  const bY = Math.round(layout.padTop * 0.35);
  const bW = layout.totalW - bX * 2;
  const bH = layout.totalH - bY * 2;

  const approxTextW = ctaText.length * fontSize * 0.65;
  let pillW = Math.max(approxTextW + Math.round(layout.badgeH * 1.2), Math.round(layout.qrSize * 0.52));
  if (options.frameBadgeStyle === 'banner') {
    pillW = bW - Math.round(layout.padX * 0.4);
  } else {
    pillW = Math.min(pillW, layout.totalW - bX * 2);
  }
  const pillH = layout.badgeH;
  const pillX = (layout.totalW - pillW) / 2;

  let pillY: number;
  if (options.frameStyle === 'top-badge') {
    pillY = Math.round(bY + (layout.padTop - bY - layout.badgeH) / 2);
  } else {
    pillY = Math.round(layout.qrY + layout.qrSize + (layout.padBottom - layout.badgeH) / 2);
  }

  // Extract inner SVG content from rawSvg
  const innerContent = rawSvg.replace(/<svg[^>]*>/, '').replace('</svg>', '');

  let frameShape = '';
  if (options.frameStyle === 'open-frame') {
    const arm = Math.round(layout.qrSize * 0.15);
    frameShape = `
      <path d="M ${bX} ${bY + arm} L ${bX} ${bY} L ${bX + arm} ${bY}" stroke="${options.frameColor}" stroke-width="${bw * 1.5}" stroke-linecap="round" fill="none" />
      <path d="M ${bX + bW - arm} ${bY} L ${bX + bW} ${bY} L ${bX + bW} ${bY + arm}" stroke="${options.frameColor}" stroke-width="${bw * 1.5}" stroke-linecap="round" fill="none" />
      <path d="M ${bX} ${bY + bH - arm} L ${bX} ${bY + bH} L ${bX + arm} ${bY + bH}" stroke="${options.frameColor}" stroke-width="${bw * 1.5}" stroke-linecap="round" fill="none" />
      <path d="M ${bX + bW - arm} ${bY + bH} L ${bX + bW} ${bY + bH} L ${bX + bW} ${bY + bH - arm}" stroke="${options.frameColor}" stroke-width="${bw * 1.5}" stroke-linecap="round" fill="none" />
    `;
  } else {
    frameShape = `<rect x="${bX}" y="${bY}" width="${bW}" height="${bH}" rx="${br}" stroke="${options.frameColor}" stroke-width="${bw}" fill="none" />`;
  }

  let badgeSvg = '';
  const pillRx = options.frameBadgeStyle === 'pill' ? pillH / 2 : Math.round(br * 0.6);
  if (options.frameBadgeStyle !== 'clean') {
    badgeSvg = `<rect x="${pillX}" y="${pillY}" width="${pillW}" height="${pillH}" rx="${pillRx}" fill="${options.frameColor}" />`;
  }

  const textColor = options.frameBadgeStyle === 'clean' ? options.frameColor : options.frameTextColor;
  const textSvg = `<text x="${layout.totalW / 2}" y="${pillY + pillH / 2}" fill="${textColor}" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif" font-weight="bold" font-size="${fontSize}" text-anchor="middle" dominant-baseline="central">${ctaText}</text>`;

  const bgRect = options.isTransparentBg ? '' : `<rect width="${layout.totalW}" height="${layout.totalH}" fill="${options.background}" />`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${layout.totalW}" height="${layout.totalH}" viewBox="0 0 ${layout.totalW} ${layout.totalH}">
  ${bgRect}
  ${frameShape}
  <g transform="translate(${layout.qrX}, ${layout.qrY})">
    ${innerContent}
  </g>
  ${badgeSvg}
  ${textSvg}
</svg>`;
}

/**
 * Export canvas to image with format handling (PNG, JPEG, WebP)
 * Prevents black backgrounds on JPEGs with transparent settings.
 */
export async function exportCanvasToBlob(
  canvas: HTMLCanvasElement,
  format: 'png' | 'jpeg' | 'webp',
  backgroundColor: string,
  isTransparent: boolean
): Promise<Blob | null> {
  if (format === 'jpeg') {
    // Create temporary solid-backed canvas to avoid black background artifacts in JPEGs
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return null;

    // Solid fill (default to white if user had transparent enabled)
    tempCtx.fillStyle = isTransparent ? '#ffffff' : backgroundColor;
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempCtx.drawImage(canvas, 0, 0);

    return new Promise(resolve => tempCanvas.toBlob(resolve, 'image/jpeg', 0.95));
  }

  const mime = format === 'webp' ? 'image/webp' : 'image/png';
  return new Promise(resolve => canvas.toBlob(resolve, mime, 0.95));
}

/**
 * Trigger file download helper
 */
export function downloadFile(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
