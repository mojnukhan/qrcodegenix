import React, { useState, useRef } from 'react';
import QRCode from 'qrcode';
import JSZip from 'jszip';
import { SEOHead } from '../components/SEOHead';
import { AdSensePlaceholder } from '../components/AdSensePlaceholder';
import { downloadFile } from '../utils/qrGenerator';
import {
  Layers,
  Upload,
  Download,
  AlertTriangle,
  CheckCircle2,
  FileSpreadsheet,
  Trash2,
  Sparkles,
  Archive,
} from 'lucide-react';
import { useToast } from '../components/Toast';

interface BatchItem {
  id: string;
  name: string;
  content: string;
  dataUrl?: string;
  error?: string;
}

export const BatchGeneratorPage: React.FC = () => {
  const [inputText, setInputText] = useState<string>(
    'Google,https://google.com\nWikipedia,https://wikipedia.org\nGitHub,https://github.com'
  );
  const [items, setItems] = useState<BatchItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  const parseInputLines = (text: string): { name: string; content: string }[] => {
    const lines = text.split('\n');
    const parsed: { name: string; content: string }[] = [];

    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line) continue;

      // Handle comma or pipe separation
      let parts = line.split(',');
      if (parts.length < 2) {
        parts = line.split('|');
      }

      if (parts.length >= 2) {
        const name = parts[0].trim();
        const content = parts.slice(1).join(',').trim();
        if (content) {
          parsed.push({ name: name || 'qr-code', content });
        }
      } else {
        // Single column: use content as both name and content
        parsed.push({ name: `qr-${parsed.length + 1}`, content: line });
      }
    }
    return parsed;
  };

  const handleGenerateBatch = async () => {
    const rawItems = parseInputLines(inputText);
    if (rawItems.length === 0) {
      showToast('Please enter at least one line of content', 'error');
      return;
    }

    if (rawItems.length > 100) {
      showToast('Maximum batch size is 100 items for browser stability', 'error');
      return;
    }

    setIsGenerating(true);
    const generated: BatchItem[] = [];

    for (let i = 0; i < rawItems.length; i++) {
      const item = rawItems[i];
      try {
        const dataUrl = await QRCode.toDataURL(item.content, {
          width: 512,
          margin: 2,
          errorCorrectionLevel: 'M',
        });
        generated.push({
          id: `${i}-${Date.now()}`,
          name: item.name,
          content: item.content,
          dataUrl,
        });
      } catch (err) {
        generated.push({
          id: `${i}-${Date.now()}`,
          name: item.name,
          content: item.content,
          error: (err as Error).message || 'Failed to encode',
        });
      }
    }

    setItems(generated);
    setIsGenerating(false);
    showToast(`Generated ${generated.length} QR codes!`, 'success');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      const content = event.target?.result as string;
      if (content) {
        setInputText(content);
        showToast('CSV / Text file loaded into input', 'info');
      }
    };
    reader.readAsText(file);
  };

  // Download individual item
  const handleDownloadSingle = (item: BatchItem) => {
    if (!item.dataUrl) return;
    const cleanName = item.name.replace(/[^a-z0-9_-]/gi, '_').toLowerCase();
    const a = document.createElement('a');
    a.href = item.dataUrl;
    a.download = `qrcodegenix-${cleanName}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast(`Downloaded ${cleanName}.png`, 'success');
  };

  // Download all as ZIP using JSZip
  const handleDownloadAllZip = async () => {
    if (items.length === 0) return;
    setIsZipping(true);
    showToast('Building ZIP archive in browser...', 'info');

    try {
      const zip = new JSZip();
      const folder = zip.folder('qrcodegenix-batch') || zip;

      items.forEach((item, idx) => {
        if (item.dataUrl) {
          const cleanName = item.name.replace(/[^a-z0-9_-]/gi, '_').toLowerCase() || `code-${idx + 1}`;
          // Extract base64
          const base64Data = item.dataUrl.split(',')[1];
          folder.file(`${cleanName}.png`, base64Data, { base64: true });
        }
      });

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      downloadFile(zipBlob, `qrcodegenix-batch-${Date.now()}.zip`);
      showToast('ZIP archive downloaded successfully!', 'success');
    } catch (err) {
      console.error(err);
      showToast('Failed to create ZIP file', 'error');
    } finally {
      setIsZipping(false);
    }
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Batch QR Code Generator - QRCodeGenix',
    description: 'Generate multiple QR codes simultaneously in bulk using CSV or table text. Free, client-side, with individual and ZIP downloads.',
    url: 'https://qrcodegenix.com/batch-qr-code-generator',
  };

  const lineCount = inputText.split('\n').filter(l => l.trim().length > 0).length;

  return (
    <div className="page-wrapper batch-page">
      <SEOHead
        title="Batch QR Code Generator – Create Bulk QR Codes with CSV | QRCodeGenix"
        description="Generate multiple QR codes in bulk from CSV or plain text. Download individual PNGs or export all in a single ZIP file. 100% private in browser."
        canonicalPath="/batch-qr-code-generator"
        schema={schema}
      />

      <AdSensePlaceholder slot="top-banner" className="hero-top-ad" />

      {/* Header */}
      <section className="tools-hero text-center">
        <div className="hero-badge mx-auto">
          <Layers size={14} />
          <span>Bulk Processing</span>
        </div>
        <h1 className="tools-headline">Batch QR Code Generator</h1>
        <p className="tools-subheadline">
          Paste a list of names and URLs, or upload a CSV file to generate dozens of high-resolution QR codes at once. Everything processes locally on your computer.
        </p>
      </section>

      <div className="container py-3">
        <div className="batch-grid">
          {/* Left Column: Input Form */}
          <div className="batch-input-card">
            <div className="batch-card-header">
              <div className="card-top-title">
                <FileSpreadsheet size={18} className="text-primary inline-icon" />
                <span>1. Enter or Upload Bulk Data</span>
              </div>
              <div className="batch-header-actions">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".csv, .txt"
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  className="btn btn-outline btn-xs"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload size={13} />
                  <span>Upload CSV</span>
                </button>
                <button
                  type="button"
                  className="btn-danger-ghost btn-xs"
                  onClick={() => {
                    setInputText('');
                    setItems([]);
                  }}
                  title="Clear inputs"
                >
                  <Trash2 size={13} />
                  <span>Clear</span>
                </button>
              </div>
            </div>

            <div className="form-group-wrap">
              <div className="form-label-row">
                <label htmlFor="batch-textarea" className="form-label-sub">
                  Format: <code>Name,URL</code> or <code>Name|Content</code> (One item per line)
                </label>
                <span className="char-counter">{lineCount} items</span>
              </div>
              <textarea
                id="batch-textarea"
                rows={10}
                className="form-textarea font-mono"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder="Product 1,https://example.com/p1&#10;Product 2,https://example.com/p2"
              />
            </div>

            {lineCount > 50 && (
              <div className="warning-banner my-2">
                <AlertTriangle size={15} />
                <span>Batches over 50 items may take a few seconds to render in older browsers.</span>
              </div>
            )}

            <button
              type="button"
              className="btn btn-primary btn-block mt-3"
              onClick={handleGenerateBatch}
              disabled={isGenerating || lineCount === 0}
            >
              {isGenerating ? <span className="spinner sm" /> : <Sparkles size={16} />}
              <span>{isGenerating ? 'Generating QR Codes...' : `Generate ${lineCount} QR Codes`}</span>
            </button>
          </div>

          {/* Right Column: Results & Export */}
          <div className="batch-results-card">
            <div className="batch-card-header">
              <div className="card-top-title">
                <CheckCircle2 size={18} className="text-success inline-icon" />
                <span>2. Results ({items.length})</span>
              </div>
              {items.length > 0 && (
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={handleDownloadAllZip}
                  disabled={isZipping}
                >
                  {isZipping ? <span className="spinner sm" /> : <Archive size={14} />}
                  <span>{isZipping ? 'Archiving...' : 'Download All (.ZIP)'}</span>
                </button>
              )}
            </div>

            {items.length === 0 ? (
              <div className="batch-empty-state">
                <Layers size={40} className="text-muted" />
                <p className="empty-heading">No QR Codes Generated Yet</p>
                <p className="empty-description">
                  Enter your list on the left and click &quot;Generate&quot; to render all codes simultaneously.
                </p>
              </div>
            ) : (
              <div className="batch-items-grid">
                {items.map(item => (
                  <div key={item.id} className="batch-item-tile">
                    {item.dataUrl ? (
                      <img src={item.dataUrl} alt={item.name} className="batch-thumb" />
                    ) : (
                      <div className="batch-error-box">{item.error}</div>
                    )}
                    <div className="batch-item-info">
                      <span className="batch-item-name" title={item.name}>
                        {item.name}
                      </span>
                      <span className="batch-item-content" title={item.content}>
                        {item.content}
                      </span>
                    </div>
                    {item.dataUrl && (
                      <button
                        type="button"
                        className="btn btn-secondary btn-xs btn-block mt-2"
                        onClick={() => handleDownloadSingle(item)}
                      >
                        <Download size={12} />
                        <span>PNG</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <AdSensePlaceholder slot="bottom-banner" className="mid-page-ad" />
    </div>
  );
};
