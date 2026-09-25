import React, { useRef, useEffect, useState, useMemo } from 'react';
import type { QRType, QROptions } from '../../types/qr';
import {
  renderQRToCanvas,
  generateQRSvgString,
  exportCanvasToBlob,
  downloadFile,
  getContrastRatio,
} from '../../utils/qrGenerator';
import {
  Download,
  Copy,
  Share2,
  ShieldCheck,
  Check,
  FileCode2,
  Sparkles,
  QrCode as QrIcon,
  ImageIcon,
  Printer,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { useToast } from '../../components/Toast';

interface QRPreviewProps {
  type: QRType;
  qrData: string;
  isValid: boolean;
  options: QROptions;
  onSuccessfulAction?: () => void;
}

export const QRPreview: React.FC<QRPreviewProps> = ({
  type,
  qrData,
  isValid,
  options,
  onSuccessfulAction,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const printCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isRendering, setIsRendering] = useState(false);
  const [copiedData, setCopiedData] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);
  const [showQualityDetails, setShowQualityDetails] = useState(false);
  const { showToast } = useToast();

  const filenameBase = `qrcodegenix-${type}`;

  // Instant render whenever qrData or options change
  useEffect(() => {
    if (!isValid || !qrData) return;

    let isMounted = true;
    const render = async () => {
      if (!canvasRef.current) return;
      setIsRendering(true);
      try {
        await renderQRToCanvas(canvasRef.current, qrData, options);
        if (printCanvasRef.current) {
          await renderQRToCanvas(printCanvasRef.current, qrData, options);
        }
      } catch (err) {
        console.error('Canvas render error:', err);
      } finally {
        if (isMounted) setIsRendering(false);
      }
    };

    render();

    return () => {
      isMounted = false;
    };
  }, [qrData, isValid, options]);

  // Quality Checker Heuristics
  const quality = useMemo(() => {
    const contrast = getContrastRatio(options.foreground, options.isTransparentBg ? '#ffffff' : options.background);
    let score = 0;
    const checks: { label: string; passed: boolean; tip: string }[] = [];

    // 1. Contrast Check (30 pts)
    if (contrast >= 7.0) {
      score += 30;
      checks.push({ label: `Contrast Ratio (${contrast}:1)`, passed: true, tip: 'Excellent visual contrast.' });
    } else if (contrast >= 4.5) {
      score += 25;
      checks.push({ label: `Contrast Ratio (${contrast}:1)`, passed: true, tip: 'Good contrast for most cameras.' });
    } else if (contrast >= 3.0) {
      score += 15;
      checks.push({ label: `Contrast Ratio (${contrast}:1)`, passed: true, tip: 'Acceptable contrast in good lighting.' });
    } else {
      checks.push({ label: `Contrast Ratio (${contrast}:1)`, passed: false, tip: 'Low contrast may reduce scan reliability.' });
    }

    // 2. Quiet Zone / Margin Check (20 pts)
    if (options.margin >= 2) {
      score += 20;
      checks.push({ label: `Quiet Zone (${options.margin} modules)`, passed: true, tip: 'Sufficient quiet zone padding.' });
    } else if (options.margin === 1) {
      score += 10;
      checks.push({ label: `Quiet Zone (${options.margin} module)`, passed: true, tip: 'Minimal quiet zone. Keep background plain.' });
    } else {
      checks.push({ label: 'Quiet Zone (0 modules)', passed: false, tip: 'Zero margin can confuse camera scanners on busy backgrounds.' });
    }

    // 3. Logo Check (25 pts)
    if (!options.logoDataUrl) {
      score += 25;
      checks.push({ label: 'Logo Obstruction', passed: true, tip: 'Clean matrix with no embedded obstructions.' });
    } else if (options.logoSizePercent <= 22) {
      score += 25;
      checks.push({ label: `Logo Size (${options.logoSizePercent}%)`, passed: true, tip: 'Safe logo proportions with background shield.' });
    } else {
      score += 10;
      checks.push({ label: `Logo Size (${options.logoSizePercent}%)`, passed: false, tip: 'Logo is large. Consider reducing for higher reliability.' });
    }

    // 4. Error Correction Check (25 pts)
    if (options.logoDataUrl) {
      if (options.errorCorrection === 'H') {
        score += 25;
        checks.push({ label: 'Error Correction (H)', passed: true, tip: '30% error recovery protects modules under the logo.' });
      } else {
        score += 10;
        checks.push({ label: `Error Correction (${options.errorCorrection})`, passed: false, tip: 'Recommend switching to High (H) when using a logo.' });
      }
    } else {
      score += 25;
      checks.push({ label: `Error Correction (${options.errorCorrection})`, passed: true, tip: 'Standard error recovery active.' });
    }

    let status: 'GOOD' | 'WARNING' | 'NEEDS ATTENTION' = 'GOOD';
    if (score < 65) status = 'NEEDS ATTENTION';
    else if (score < 85) status = 'WARNING';

    return { score, status, checks };
  }, [options]);

  // Download PNG
  const handleDownloadPNG = () => {
    if (!canvasRef.current || !isValid || !qrData) {
      showToast('Please enter valid content to generate a QR code', 'error');
      return;
    }
    try {
      canvasRef.current.toBlob(blob => {
        if (!blob) {
          showToast('Failed to create PNG image', 'error');
          return;
        }
        downloadFile(blob, `${filenameBase}.png`);
        showToast(`Downloaded ${filenameBase}.png`, 'success');
        onSuccessfulAction?.();
      }, 'image/png');
    } catch {
      showToast('Failed to download PNG', 'error');
    }
  };

  // Download SVG
  const handleDownloadSVG = async () => {
    if (!isValid || !qrData) {
      showToast('Please enter valid content to generate a QR code', 'error');
      return;
    }
    try {
      const svgString = await generateQRSvgString(qrData, options);
      const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      downloadFile(blob, `${filenameBase}.svg`);
      showToast(`Downloaded ${filenameBase}.svg`, 'success');
      onSuccessfulAction?.();
    } catch {
      showToast('Failed to generate SVG', 'error');
    }
  };

  // Download JPG (Phase 2)
  const handleDownloadJPG = async () => {
    if (!canvasRef.current || !isValid || !qrData) return;
    try {
      const blob = await exportCanvasToBlob(
        canvasRef.current,
        'jpeg',
        options.background,
        options.isTransparentBg
      );
      if (blob) {
        downloadFile(blob, `${filenameBase}.jpg`);
        showToast(`Downloaded ${filenameBase}.jpg`, 'success');
        onSuccessfulAction?.();
      }
    } catch {
      showToast('Failed to export JPG', 'error');
    }
  };

  // Download WebP (Phase 2)
  const handleDownloadWebP = async () => {
    if (!canvasRef.current || !isValid || !qrData) return;
    try {
      const blob = await exportCanvasToBlob(
        canvasRef.current,
        'webp',
        options.background,
        options.isTransparentBg
      );
      if (blob) {
        downloadFile(blob, `${filenameBase}.webp`);
        showToast(`Downloaded ${filenameBase}.webp`, 'success');
        onSuccessfulAction?.();
      }
    } catch {
      showToast('Failed to export WebP', 'error');
    }
  };

  // Copy QR data
  const handleCopyData = async () => {
    if (!isValid || !qrData) return;
    try {
      await navigator.clipboard.writeText(qrData);
      setCopiedData(true);
      showToast('QR code content copied to clipboard!', 'success');
      onSuccessfulAction?.();
      setTimeout(() => setCopiedData(false), 2000);
    } catch {
      showToast('Could not copy to clipboard', 'error');
    }
  };

  // Copy QR image to clipboard
  const handleCopyImage = async () => {
    if (!canvasRef.current || !isValid || !qrData) return;
    try {
      if (!navigator.clipboard || !window.ClipboardItem) {
        showToast('Clipboard image copying is not supported in this browser. Please download PNG instead.', 'info');
        return;
      }
      canvasRef.current.toBlob(async blob => {
        if (!blob) return;
        try {
          const item = new ClipboardItem({ 'image/png': blob });
          await navigator.clipboard.write([item]);
          setCopiedImage(true);
          showToast('QR code image copied to clipboard!', 'success');
          onSuccessfulAction?.();
          setTimeout(() => setCopiedImage(false), 2000);
        } catch {
          showToast('Image copying failed in this browser. Use "Download PNG".', 'info');
        }
      }, 'image/png');
    } catch {
      showToast('Clipboard operation failed', 'error');
    }
  };

  // Print QR (Phase 2)
  const handlePrint = () => {
    if (!isValid || !qrData) return;
    window.print();
  };

  // Share API
  const handleShare = async () => {
    if (!isValid || !qrData) return;
    if (navigator.share) {
      try {
        if (canvasRef.current) {
          canvasRef.current.toBlob(async blob => {
            if (blob && navigator.canShare && navigator.canShare({ files: [new File([blob], `${filenameBase}.png`, { type: 'image/png' })] })) {
              const file = new File([blob], `${filenameBase}.png`, { type: 'image/png' });
              await navigator.share({
                title: 'QRCodeGenix QR Code',
                text: qrData,
                files: [file],
              });
            } else {
              await navigator.share({
                title: 'QRCodeGenix QR Code',
                text: qrData,
                url: qrData.startsWith('http') ? qrData : undefined,
              });
            }
          });
        }
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          handleDownloadPNG();
        }
      }
    } else {
      handleDownloadPNG();
    }
  };

  const hasContent = isValid && qrData.length > 0;

  return (
    <>
      <aside className="preview-card" aria-label="Live QR Code Preview">
        <div className="preview-header">
          <div className="preview-title-wrap">
            <QrIcon size={18} className="text-primary" />
            <h2 className="preview-title">Live Preview</h2>
          </div>
          {hasContent && (
            <span className="badge badge-success badge-sm">
              <Sparkles size={11} /> Ready
            </span>
          )}
        </div>

        {/* QR Canvas / Empty State */}
        <div className="preview-display-zone">
          <div
            className={`qr-stage ${options.isTransparentBg ? 'checker-bg' : ''}`}
            style={{
              backgroundColor: options.isTransparentBg ? 'transparent' : options.background,
            }}
          >
            <canvas
              ref={canvasRef}
              className={`qr-canvas ${!hasContent ? 'hidden' : ''}`}
              aria-label="Generated QR Code"
              role="img"
            />

            {!hasContent && (
              <div className="qr-empty-state">
                <div className="empty-icon-wrap">
                  <QrIcon size={48} className="text-muted" />
                </div>
                <p className="empty-heading">Your QR code will appear here</p>
                <p className="empty-description">
                  Enter your content on the left to generate an instant, high-quality QR code.
                </p>
              </div>
            )}

            {isRendering && (
              <div className="rendering-overlay">
                <span className="spinner" />
              </div>
            )}
          </div>

          {/* Info Badges */}
          {hasContent && (
            <div className="preview-meta-row">
              <span className="meta-pill">{options.size} × {options.size} px</span>
              <span className="meta-pill">EC: {options.errorCorrection}</span>
              <span className="meta-pill uppercase">{type}</span>
              {options.frameStyle !== 'none' && (
                <span className="meta-pill" style={{ color: 'var(--primary)', fontWeight: 600 }}>
                  CTA Frame
                </span>
              )}
            </div>
          )}
        </div>

        {/* Quality Checker Heuristic Card (Phase 2) */}
        {hasContent && (
          <div className="quality-checker-box">
            <div
              className="quality-header-row"
              onClick={() => setShowQualityDetails(p => !p)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && setShowQualityDetails(p => !p)}
            >
              <div className="quality-score-wrap">
                <span className="quality-label">QR Quality Estimate:</span>
                <span className="quality-score-badge">{quality.score}/100</span>
                <span
                  className={`badge badge-xs ${
                    quality.status === 'GOOD'
                      ? 'badge-success'
                      : quality.status === 'WARNING'
                      ? 'badge-warning'
                      : 'badge-danger'
                  }`}
                >
                  {quality.status}
                </span>
              </div>
              <button
                type="button"
                className="quality-toggle-btn"
                aria-label={showQualityDetails ? 'Hide details' : 'Show details'}
              >
                {showQualityDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>

            {showQualityDetails && (
              <div className="quality-details-dropdown">
                <ul className="quality-checks-list">
                  {quality.checks.map((chk, i) => (
                    <li key={i} className={`quality-check-item ${chk.passed ? 'passed' : 'warning'}`}>
                      {chk.passed ? <Check size={14} className="text-success" /> : <AlertTriangle size={14} className="text-warning" />}
                      <span className="check-text">
                        <strong>{chk.label}:</strong> {chk.tip}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="quality-disclaimer">
                  <Info size={12} className="inline-icon" />
                  <span>
                    Internal heuristic estimate. Real scanning also depends on printer ink, camera resolution, and lighting.
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Primary Download Buttons (PNG & SVG) */}
        <div className="preview-actions-primary">
          <div className="grid-2-col">
            <button
              type="button"
              className="btn btn-primary btn-block download-btn"
              onClick={handleDownloadPNG}
              disabled={!hasContent}
            >
              <Download size={16} />
              <span>Download PNG</span>
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-block download-btn"
              onClick={handleDownloadSVG}
              disabled={!hasContent}
            >
              <FileCode2 size={16} />
              <span>Download SVG</span>
            </button>
          </div>

          {/* Secondary Formats: JPG & WebP (Phase 2) */}
          <div className="grid-2-col">
            <button
              type="button"
              className="btn btn-outline btn-block btn-sm"
              onClick={handleDownloadJPG}
              disabled={!hasContent}
              title="Export as JPEG with solid background"
            >
              <Download size={14} />
              <span>Download JPG</span>
            </button>

            <button
              type="button"
              className="btn btn-outline btn-block btn-sm"
              onClick={handleDownloadWebP}
              disabled={!hasContent}
              title="Export as WebP with alpha transparency"
            >
              <Download size={14} />
              <span>Download WebP</span>
            </button>
          </div>
        </div>

        {/* Tertiary Actions (Copy Data, Copy Image, Print, Share) */}
        <div className="preview-actions-secondary four-col">
          <button
            type="button"
            className="btn-action-pill"
            onClick={handleCopyData}
            disabled={!hasContent}
            title="Copy raw QR text to clipboard"
          >
            {copiedData ? <Check size={14} className="text-success" /> : <Copy size={14} />}
            <span>{copiedData ? 'Copied' : 'Copy Text'}</span>
          </button>

          <button
            type="button"
            className="btn-action-pill"
            onClick={handleCopyImage}
            disabled={!hasContent}
            title="Copy QR image to clipboard"
          >
            {copiedImage ? <Check size={14} className="text-success" /> : <ImageIcon size={14} />}
            <span>{copiedImage ? 'Copied' : 'Copy Image'}</span>
          </button>

          <button
            type="button"
            className="btn-action-pill"
            onClick={handlePrint}
            disabled={!hasContent}
            title="Print QR code"
          >
            <Printer size={14} />
            <span>Print</span>
          </button>

          <button
            type="button"
            className="btn-action-pill"
            onClick={handleShare}
            disabled={!hasContent}
            title="Share QR code"
          >
            <Share2 size={14} />
            <span>Share</span>
          </button>
        </div>

        {/* Trust & Privacy Notice */}
        <div className="preview-privacy-box">
          <ShieldCheck size={16} className="text-success" />
          <p className="privacy-text">
            Your QR code is generated directly in your browser. Your content stays on your device.
          </p>
        </div>
      </aside>

      {/* Dedicated Print Layout (rendered when printing) */}
      <div className="print-sheet-wrapper" aria-hidden="true">
        <div className="print-card">
          <h1 className="print-title">Scan to Connect</h1>
          <p className="print-sub">Scan this QR code with any smartphone camera</p>
          <div className="print-qr-frame">
            <canvas ref={printCanvasRef} className="print-canvas" />
          </div>
          <p className="print-payload">{qrData}</p>
          <p className="print-footer">Generated with QRCodeGenix • Free & Private QR Studio</p>
        </div>
      </div>
    </>
  );
};
