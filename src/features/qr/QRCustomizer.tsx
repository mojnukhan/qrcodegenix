import React, { useRef } from 'react';
import type { QROptions, ErrorCorrectionLevel, QRFrameStyle, QRFrameBadgeStyle } from '../../types/qr';
import { COLOR_PRESETS, getContrastRatio } from '../../utils/qrGenerator';
import {
  Palette,
  Sliders,
  Image as ImageIcon,
  ShieldAlert,
  RotateCcw,
  Upload,
  Trash2,
  LayoutTemplate,
} from 'lucide-react';
import { useToast } from '../../components/Toast';

interface QRCustomizerProps {
  options: QROptions;
  onChange: (updated: Partial<QROptions>) => void;
  onReset: () => void;
}

export const QRCustomizer: React.FC<QRCustomizerProps> = ({
  options,
  onChange,
  onReset,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  const contrast = getContrastRatio(options.foreground, options.isTransparentBg ? '#ffffff' : options.background);
  const isLowContrast = contrast < 3.0;

  const handlePresetSelect = (fg: string, bg: string) => {
    onChange({
      foreground: fg,
      background: bg,
      isTransparentBg: false,
    });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (PNG, JPG, SVG)', 'error');
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      showToast('Logo file size must be under 3MB', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = event => {
      const dataUrl = event.target?.result as string;
      onChange({
        logoDataUrl: dataUrl,
        errorCorrection: 'H', // Automatically recommend & set 'H'
      });
      showToast('Logo added! Error correction automatically updated to High (H)', 'success');
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
    onChange({ logoDataUrl: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    showToast('Logo removed', 'info');
  };

  return (
    <div className="customizer-container">
      {/* 1. Color System */}
      <div className="customizer-section">
        <div className="section-header">
          <Palette size={16} className="text-primary" />
          <h3 className="section-title">Color Palette</h3>
        </div>

        {/* Color Presets */}
        <div className="preset-grid">
          {COLOR_PRESETS.map(preset => {
            const isSelected =
              options.foreground.toLowerCase() === preset.foreground.toLowerCase() &&
              options.background.toLowerCase() === preset.background.toLowerCase() &&
              !options.isTransparentBg;
            return (
              <button
                key={preset.id}
                type="button"
                className={`preset-btn ${isSelected ? 'active' : ''}`}
                onClick={() => handlePresetSelect(preset.foreground, preset.background)}
                title={preset.name}
              >
                <span
                  className="preset-swatch-split"
                  style={{
                    background: `linear-gradient(135deg, ${preset.foreground} 50%, ${preset.background} 50%)`,
                  }}
                />
                <span className="preset-label">{preset.name}</span>
              </button>
            );
          })}
        </div>

        {/* Custom Color Inputs */}
        <div className="color-pickers-grid">
          <div className="picker-box">
            <span className="picker-label">Foreground (QR)</span>
            <div className="color-input-combo">
              <input
                type="color"
                className="color-circle"
                value={options.foreground}
                onChange={e => onChange({ foreground: e.target.value })}
                title="Choose foreground color"
              />
              <input
                type="text"
                className="color-hex-input"
                value={options.foreground}
                maxLength={7}
                onChange={e => onChange({ foreground: e.target.value })}
              />
            </div>
          </div>

          <div className="picker-box">
            <span className="picker-label">Background</span>
            <div className="color-input-combo">
              <input
                type="color"
                className="color-circle"
                disabled={options.isTransparentBg}
                value={options.background}
                onChange={e => onChange({ background: e.target.value })}
                title="Choose background color"
              />
              <input
                type="text"
                className="color-hex-input"
                disabled={options.isTransparentBg}
                value={options.background}
                maxLength={7}
                onChange={e => onChange({ background: e.target.value })}
              />
            </div>
            <label className="transparent-toggle">
              <input
                type="checkbox"
                checked={options.isTransparentBg}
                onChange={e => onChange({ isTransparentBg: e.target.checked })}
              />
              <span>Transparent</span>
            </label>
          </div>
        </div>

        {/* Contrast Warning */}
        {isLowContrast && (
          <div className="warning-banner" role="alert">
            <ShieldAlert size={15} />
            <span>
              Low contrast ratio ({contrast}:1). This color combination may be difficult for some cameras to scan.
            </span>
          </div>
        )}
      </div>

      {/* 2. Sizing & Error Correction */}
      <div className="customizer-section">
        <div className="section-header">
          <Sliders size={16} className="text-primary" />
          <h3 className="section-title">Size & Reliability</h3>
        </div>

        <div className="settings-grid">
          {/* Resolution / Size */}
          <div className="setting-group">
            <div className="setting-title-row">
              <span className="setting-label">Export Size</span>
              <span className="setting-value">{options.size}px</span>
            </div>
            <div className="size-btn-group">
              {[256, 512, 1024, 2048].map(s => (
                <button
                  key={s}
                  type="button"
                  className={`size-chip ${options.size === s ? 'active' : ''}`}
                  onClick={() => onChange({ size: s })}
                >
                  {s}px
                </button>
              ))}
            </div>
          </div>

          {/* Error Correction */}
          <div className="setting-group">
            <div className="setting-title-row">
              <span className="setting-label">Error Correction</span>
              <span className="setting-value">
                {options.errorCorrection === 'L' && 'L (7%)'}
                {options.errorCorrection === 'M' && 'M (15%) - Standard'}
                {options.errorCorrection === 'Q' && 'Q (25%) - High'}
                {options.errorCorrection === 'H' && 'H (30%) - Best for Logos'}
              </span>
            </div>
            <div className="ec-btn-group">
              {(['L', 'M', 'Q', 'H'] as ErrorCorrectionLevel[]).map(lvl => (
                <button
                  key={lvl}
                  type="button"
                  className={`ec-chip ${options.errorCorrection === lvl ? 'active' : ''}`}
                  onClick={() => onChange({ errorCorrection: lvl })}
                  title={
                    lvl === 'H'
                      ? '30% recovery - Recommended for logos'
                      : `${lvl} level error recovery`
                  }
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Margin */}
          <div className="setting-group">
            <div className="setting-title-row">
              <span className="setting-label">Quiet Zone / Margin</span>
              <span className="setting-value">{options.margin} modules</span>
            </div>
            <input
              type="range"
              min={0}
              max={4}
              step={1}
              value={options.margin}
              onChange={e => onChange({ margin: parseInt(e.target.value) })}
              className="range-slider"
            />
          </div>
        </div>
      </div>

      {/* 3. Logo Upload */}
      <div className="customizer-section">
        <div className="section-header">
          <ImageIcon size={16} className="text-primary" />
          <h3 className="section-title">Center Logo (Optional)</h3>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleLogoUpload}
          accept="image/png, image/jpeg, image/svg+xml, image/webp"
          style={{ display: 'none' }}
        />

        {!options.logoDataUrl ? (
          <div
            className="logo-upload-zone"
            onClick={() => fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                fileInputRef.current?.click();
              }
            }}
          >
            <Upload size={22} className="text-muted" />
            <span className="upload-main-text">Upload Logo or Icon</span>
            <span className="upload-sub-text">PNG, SVG, JPG (Max 3MB)</span>
          </div>
        ) : (
          <div className="logo-active-controls">
            <div className="logo-preview-row">
              <div className="logo-thumb-wrapper">
                <img src={options.logoDataUrl} alt="Uploaded logo preview" className="logo-thumb-img" />
              </div>
              <div className="logo-meta">
                <span className="logo-active-tag">Logo Active</span>
                <span className="logo-hint">High error correction (H) is applied automatically</span>
              </div>
              <button
                type="button"
                className="btn-danger-ghost btn-sm"
                onClick={handleRemoveLogo}
                title="Remove logo"
              >
                <Trash2 size={15} />
                <span>Remove</span>
              </button>
            </div>

            {/* Logo Size Control */}
            <div className="setting-group mt-3">
              <div className="setting-title-row">
                <span className="setting-label">Logo Size</span>
                <span className="setting-value">{options.logoSizePercent}%</span>
              </div>
              <input
                type="range"
                min={10}
                max={30}
                step={1}
                value={options.logoSizePercent}
                onChange={e => onChange({ logoSizePercent: parseInt(e.target.value) })}
                className="range-slider"
              />
              {options.logoSizePercent > 25 && (
                <div className="warning-banner mt-2" role="alert">
                  <ShieldAlert size={14} />
                  <span>Your logo is large. Consider reducing it for better scanning reliability.</span>
                </div>
              )}
            </div>

            {/* Logo Background Shape */}
            <div className="setting-group mt-3">
              <div className="setting-title-row">
                <span className="setting-label">Shield Shape</span>
              </div>
              <div className="size-btn-group">
                <button
                  type="button"
                  className={`size-chip ${options.logoShape === 'circle' ? 'active' : ''}`}
                  onClick={() => onChange({ logoShape: 'circle' })}
                >
                  Circular
                </button>
                <button
                  type="button"
                  className={`size-chip ${options.logoShape === 'square' ? 'active' : ''}`}
                  onClick={() => onChange({ logoShape: 'square' })}
                >
                  Rounded Square
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Frames & Call-to-Action Borders */}
      <div className="customizer-section">
        <div className="section-header">
          <LayoutTemplate size={16} className="text-primary" />
          <h3 className="section-title">Frames & Call-to-Action Borders</h3>
        </div>

        {/* Frame Style Grid */}
        <div className="frame-style-grid">
          {[
            { id: 'none', label: 'None', desc: 'Frameless' },
            { id: 'bottom-badge', label: 'Bottom Badge', desc: 'Classic Pill CTA' },
            { id: 'top-badge', label: 'Top Badge', desc: 'Header Banner' },
            { id: 'card-polaroid', label: 'Polaroid Card', desc: 'Card Frame' },
            { id: 'rounded-border', label: 'Rounded Border', desc: 'Soft Outer Frame' },
            { id: 'open-frame', label: 'Open Frame', desc: 'Tech Corner Brackets' },
          ].map(style => (
            <button
              key={style.id}
              type="button"
              className={`frame-style-card ${options.frameStyle === style.id ? 'active' : ''}`}
              onClick={() => onChange({ frameStyle: style.id as QRFrameStyle })}
            >
              <span className="frame-card-title">{style.label}</span>
              <span className="frame-card-desc">{style.desc}</span>
            </button>
          ))}
        </div>

        {options.frameStyle !== 'none' && (
          <div className="frame-active-settings">
            {/* CTA Text Input */}
            <div className="setting-group mt-3">
              <div className="setting-title-row">
                <span className="setting-label">Call-to-Action Text</span>
                <span className="setting-value">{options.frameText.length} / 25</span>
              </div>
              <input
                type="text"
                className="input-field"
                maxLength={25}
                value={options.frameText}
                onChange={e => onChange({ frameText: e.target.value })}
                placeholder="e.g. SCAN ME"
              />
              {/* Presets */}
              <div className="cta-presets-row">
                {[
                  'SCAN ME',
                  'VISIT WEBSITE',
                  'VIEW MENU',
                  'CONNECT WI-FI',
                  'SAVE CONTACT',
                  'OPEN LOCATION',
                  'PAY HERE',
                ].map(preset => (
                  <button
                    key={preset}
                    type="button"
                    className={`cta-preset-chip ${options.frameText === preset ? 'active' : ''}`}
                    onClick={() => onChange({ frameText: preset })}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Frame & Badge Color */}
            <div className="setting-group mt-3">
              <div className="setting-title-row">
                <span className="setting-label">Frame & Badge Color</span>
                <button
                  type="button"
                  className="match-qr-btn"
                  onClick={() => onChange({ frameColor: options.foreground })}
                  title="Set frame color to match the QR code foreground"
                >
                  Match QR Color
                </button>
              </div>
              <div className="color-input-combo">
                <input
                  type="color"
                  className="color-circle"
                  value={options.frameColor}
                  onChange={e => onChange({ frameColor: e.target.value })}
                  title="Choose frame border color"
                />
                <input
                  type="text"
                  className="color-hex-input"
                  value={options.frameColor}
                  maxLength={7}
                  onChange={e => onChange({ frameColor: e.target.value })}
                />
              </div>
              {/* Swatches */}
              <div className="frame-color-swatches">
                {['#0f172a', '#2563eb', '#059669', '#7c3aed', '#e11d48', '#d97706', '#0284c7'].map(color => (
                  <button
                    key={color}
                    type="button"
                    className={`frame-swatch-dot ${options.frameColor.toLowerCase() === color ? 'active' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => onChange({ frameColor: color })}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Badge Text Color & Badge Style */}
            <div className="frame-badge-options-row mt-3">
              <div className="setting-group flex-1">
                <span className="setting-label block mb-1">Text Color</span>
                <div className="size-btn-group">
                  <button
                    type="button"
                    className={`size-chip ${options.frameTextColor === '#ffffff' ? 'active' : ''}`}
                    onClick={() => onChange({ frameTextColor: '#ffffff' })}
                  >
                    White
                  </button>
                  <button
                    type="button"
                    className={`size-chip ${options.frameTextColor === '#0f172a' ? 'active' : ''}`}
                    onClick={() => onChange({ frameTextColor: '#0f172a' })}
                  >
                    Dark
                  </button>
                </div>
              </div>

              <div className="setting-group flex-1">
                <span className="setting-label block mb-1">Badge Shape</span>
                <div className="size-btn-group">
                  <button
                    type="button"
                    className={`size-chip ${options.frameBadgeStyle === 'pill' ? 'active' : ''}`}
                    onClick={() => onChange({ frameBadgeStyle: 'pill' as QRFrameBadgeStyle })}
                  >
                    Pill
                  </button>
                  <button
                    type="button"
                    className={`size-chip ${options.frameBadgeStyle === 'banner' ? 'active' : ''}`}
                    onClick={() => onChange({ frameBadgeStyle: 'banner' as QRFrameBadgeStyle })}
                  >
                    Banner
                  </button>
                  <button
                    type="button"
                    className={`size-chip ${options.frameBadgeStyle === 'clean' ? 'active' : ''}`}
                    onClick={() => onChange({ frameBadgeStyle: 'clean' as QRFrameBadgeStyle })}
                  >
                    Clean
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Reset Bar */}
      <div className="customizer-footer">
        <button
          type="button"
          className="btn-ghost btn-sm"
          onClick={onReset}
          title="Restore default colors and settings"
        >
          <RotateCcw size={14} />
          <span>Reset Customization</span>
        </button>
      </div>
    </div>
  );
};
