# QRCodeGenix ⚡

> **Create Powerful QR Codes — Free, Fast & Private**  
> Modern, client-side QR code generator, scanner, and tools platform built with React, TypeScript, and Vite.

---

## 🌟 Key Features

### 1. 9 Versatile QR Code Types
* 🌐 **URL / Link**: Website addresses with automatic protocol formatting.
* 📝 **Plain Text**: Formatted notes, crypto addresses, and text snippets.
* 📶 **Wi-Fi Network**: One-tap network credentials (WPA/WPA2/WPA3, WEP, Open) with hidden SSID support.
* 💬 **WhatsApp**: Direct phone chat links with optional pre-filled message text.
* ✉️ **Email**: Pre-filled recipient, subject line, and body text.
* 📞 **Phone**: One-tap direct dialer codes.
* 👤 **vCard 3.0 / Contact**: Complete digital business cards with Name, Org, Job, Phone, Email, Address, and Website.
* 📍 **Google Maps**: Location search and GPS latitude/longitude coordinates.
* 📱 **SMS**: Fast text messaging with character count tracking.

### 2. Custom Frames & Call-to-Action Borders (Phase 2)
* **6 Frame Styles**: Frameless (`None`), `Bottom Badge`, `Top Badge`, `Polaroid Card`, `Rounded Border`, and `Open Frame`.
* **CTA Presets**: `SCAN ME`, `VISIT WEBSITE`, `VIEW MENU`, `CONNECT WI-FI`, `SAVE CONTACT`, `OPEN LOCATION`, `PAY HERE`.
* **Customization**: Custom border colors, text colors, and badge shapes (`Pill`, `Banner`, `Clean`).
* **Multi-Format Export**: Custom frames are automatically composited onto PNG, JPG, WebP, vector SVG, and physical printouts.

### 3. Client-Side QR Scanner
* 📷 **Live Camera Feed**: Real-time barcode decoding with camera flipping and reticle animations.
* 🖼️ **Image File Upload**: Drag-and-drop or file picker for PNG, JPG, JPEG, and WebP.
* 🛡️ **Zero Server Uploads**: Decoding executed 100% locally in browser memory via `jsQR`.
* 🔒 **Safe URL Inspection**: Displays decoded payload and destination before opening; never auto-redirects to untrusted URLs.

### 4. Batch QR Generator
* 📋 **CSV / Text Area Input**: Generate up to 200 QR codes simultaneously.
* 📦 **ZIP Archive Export**: Download all generated QR codes in a single `.zip` bundle via `JSZip`.
* ⚡ **Live Grid Preview**: Inspect and download individual codes on demand.

### 5. Multi-Format Downloads & Printing
* 🖼️ **Raster Formats**: PNG, JPG (with solid background fill to prevent black transparency cast), and WebP.
* 📐 **Vector SVG**: Scalable, resolution-independent vector graphics for commercial printing.
* 🖨️ **Print QR**: Dedicated `@media print` stylesheet optimized for A4 and Letter paper flyers and table tents.

### 6. Heuristic QR Quality Checker
* Real-time 0–100 scanability score evaluating:
  * Contrast ratio (WCAG luminance thresholds)
  * Quiet zone / margin size
  * Logo size ratio
  * Reed-Solomon Error Correction level (L, M, Q, H)
  * Resolution dimensions

### 7. Curated Template Library
* Ready-made presets across **Business**, **Social**, **Personal**, and **Event** categories with 1-click editor loading.

### 8. 100% Client-Side Privacy Architecture
* **Zero Backend**: No remote database, no server logs, no accounts required.
* **Local History**: Stored exclusively in browser `localStorage`.
* **AdSense & GDPR Compliant**: Full cookie consent banner, detailed privacy disclosures, and cookie policies.

---

## 🛠️ Tech Stack

* **Framework**: React 19 + TypeScript
* **Build Tool**: Vite 8
* **Styling**: Vanilla CSS with modern custom properties, dark mode support, and glassmorphism
* **QR Engine**: `qrcode` (generation) & `jsqr` (camera & image decoding)
* **Archive Utility**: `jszip`
* **Icons**: `lucide-react`
* **Linter**: `oxlint`

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* `npm` or `pnpm`

### Installation

```bash
# Clone the repository
git clone https://github.com/mojnukhan/qrcodegenix.git

# Navigate to project directory
cd qrcodegenix

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Production Build

```bash
# Compile TypeScript and bundle for production
npm run build

# Preview the production build locally
npm run preview
```

---

## 📄 License

This project is licensed under the MIT License — free for both personal and commercial use.
