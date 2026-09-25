import React, { useState, useRef, useEffect, useCallback } from 'react';
import jsQR from 'jsqr';
import {
  Camera,
  CameraOff,
  Upload,
  RefreshCw,
  Copy,
  ExternalLink,
  ShieldAlert,
  ShieldCheck,
  Check,
  QrCode,
  FileImage,
  AlertCircle,
  Eye,
} from 'lucide-react';
import { useToast } from '../../components/Toast';

interface ScanResult {
  raw: string;
  type: 'url' | 'wifi' | 'email' | 'phone' | 'sms' | 'vcard' | 'text';
  timestamp: number;
}

export const QRScanner: React.FC = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { showToast } = useToast();

  // Helper to detect payload type
  const detectPayloadType = (text: string): ScanResult['type'] => {
    const trimmed = text.trim();
    if (/^https?:\/\//i.test(trimmed)) return 'url';
    if (/^WIFI:/i.test(trimmed)) return 'wifi';
    if (/^mailto:/i.test(trimmed)) return 'email';
    if (/^tel:/i.test(trimmed)) return 'phone';
    if (/^SMSTO:/i.test(trimmed) || /^sms:/i.test(trimmed)) return 'sms';
    if (/^BEGIN:VCARD/i.test(trimmed)) return 'vcard';
    return 'text';
  };

  // Stop camera stream
  const stopCamera = useCallback(() => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  }, []);

  // Process a video frame for QR codes
  const scanVideoFrame = useCallback(function scanFrame() {
    if (!videoRef.current || videoRef.current.readyState !== videoRef.current.HAVE_ENOUGH_DATA) {
      animationFrameId.current = requestAnimationFrame(scanFrame);
      return;
    }

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      // 1. Try jsQR
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'attemptBoth',
      });

      if (code && code.data) {
        stopCamera();
        setScanResult({
          raw: code.data,
          type: detectPayloadType(code.data),
          timestamp: Date.now(),
        });
        showToast('QR code successfully detected!', 'success');
        return;
      }
    }

    animationFrameId.current = requestAnimationFrame(scanFrame);
  }, [stopCamera, showToast]);

  // Start camera stream
  const startCamera = async () => {
    setCameraError(null);
    setScanResult(null);

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError('Camera access is not supported by your browser or requires a secure HTTPS connection.');
      return;
    }

    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', 'true');
        await videoRef.current.play();
        setIsCameraActive(true);
        animationFrameId.current = requestAnimationFrame(scanVideoFrame);
      }
    } catch (err: unknown) {
      const error = err as Error;
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        setCameraError('Camera permission was denied. Please allow camera access in your browser settings.');
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        setCameraError('No camera found on your device.');
      } else {
        setCameraError(`Camera error: ${error.message || 'Unable to access camera.'}`);
      }
      setIsCameraActive(false);
    }
  };

  // Flip camera between front and back
  const toggleCameraFacing = async () => {
    stopCamera();
    const nextMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextMode);
    setTimeout(() => {
      startCamera();
    }, 200);
  };

  // Decode an image file client-side
  const decodeImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast('Please upload a valid image file (PNG, JPG, WebP)', 'error');
      return;
    }

    setIsProcessingFile(true);
    setCameraError(null);
    stopCamera();

    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          setIsProcessingFile(false);
          showToast('Could not process image', 'error');
          return;
        }

        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // Try decoding with jsQR
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'attemptBoth',
        });

        setIsProcessingFile(false);

        if (code && code.data) {
          setScanResult({
            raw: code.data,
            type: detectPayloadType(code.data),
            timestamp: Date.now(),
          });
          showToast('QR code successfully decoded from image!', 'success');
        } else {
          showToast('No readable QR code found in this image. Ensure the code is clear and well-lit.', 'error');
        }
      };

      img.onerror = () => {
        setIsProcessingFile(false);
        showToast('Failed to load image file', 'error');
      };

      img.src = e.target?.result as string;
    };

    reader.readAsDataURL(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      decodeImageFile(file);
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      decodeImageFile(file);
    }
  };

  // Copy raw content
  const handleCopy = async () => {
    if (!scanResult) return;
    try {
      await navigator.clipboard.writeText(scanResult.raw);
      setCopied(true);
      showToast('Decoded content copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast('Could not copy to clipboard', 'error');
    }
  };

  // Open URL safely after warning
  const handleOpenLink = () => {
    if (!scanResult || scanResult.type !== 'url') return;
    const url = scanResult.raw;
    // Security check: Only allow http and https protocols
    if (/^https?:\/\//i.test(url)) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      showToast('Cannot open non-HTTP protocols automatically for safety.', 'error');
    }
  };

  // Clean up stream on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return (
    <div className="scanner-container">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInput}
        accept="image/png, image/jpeg, image/webp"
        style={{ display: 'none' }}
      />

      {/* Main Scanner Card */}
      <div className="scanner-card">
        {/* Scanner Header */}
        <div className="scanner-header">
          <div className="scanner-title-wrap">
            <QrCode size={22} className="text-primary" />
            <h2 className="scanner-title">Scan & Decode QR Codes</h2>
          </div>
          <span className="badge badge-success-light">100% Client-Side</span>
        </div>

        {/* Action Controls Bar */}
        <div className="scanner-controls-bar">
          {!isCameraActive ? (
            <button type="button" className="btn btn-primary" onClick={startCamera}>
              <Camera size={18} />
              <span>Start Camera</span>
            </button>
          ) : (
            <div className="camera-active-buttons">
              <button type="button" className="btn btn-danger-ghost" onClick={stopCamera}>
                <CameraOff size={18} />
                <span>Stop Camera</span>
              </button>
              <button type="button" className="btn btn-secondary btn-sm" onClick={toggleCameraFacing}>
                <RefreshCw size={15} />
                <span>Flip Camera</span>
              </button>
            </div>
          )}

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload size={18} />
            <span>Upload Image</span>
          </button>
        </div>

        {/* Camera Permission or Hardware Error */}
        {cameraError && (
          <div className="warning-banner my-3" role="alert">
            <AlertCircle size={16} />
            <span>{cameraError}</span>
          </div>
        )}

        {/* Viewport: Live Camera Feed OR Drop Zone */}
        {!scanResult ? (
          <div
            className={`scanner-viewport ${isCameraActive ? 'active' : ''} ${isDragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <video
              ref={videoRef}
              className={`scanner-video ${!isCameraActive ? 'hidden' : ''}`}
              muted
              playsInline
            />

            {isCameraActive && (
              <div className="scanner-reticle-overlay">
                <div className="scanner-reticle-box">
                  <div className="reticle-corner top-left" />
                  <div className="reticle-corner top-right" />
                  <div className="reticle-corner bottom-left" />
                  <div className="reticle-corner bottom-right" />
                  <div className="scanner-laser" />
                </div>
                <p className="scanner-instruction-text">Point camera at a QR code</p>
              </div>
            )}

            {!isCameraActive && !isProcessingFile && (
              <div
                className="scanner-dropzone-content"
                onClick={() => fileInputRef.current?.click()}
                role="button"
                tabIndex={0}
              >
                <div className="dropzone-icon-circle">
                  <FileImage size={36} className="text-muted" />
                </div>
                <p className="dropzone-primary-text">Drag & drop a QR code image here</p>
                <p className="dropzone-sub-text">or click to upload from your files (PNG, JPG, WebP)</p>
                <span className="dropzone-badge">No server upload • Processed in browser</span>
              </div>
            )}

            {isProcessingFile && (
              <div className="scanner-loading-state">
                <span className="spinner" />
                <p>Analyzing QR code image...</p>
              </div>
            )}
          </div>
        ) : (
          /* Decoded Result Card */
          <div className="scan-result-card" role="region" aria-label="Decoded QR Result">
            <div className="result-header">
              <div className="result-type-wrap">
                <ShieldCheck size={20} className="text-success" />
                <span className="result-label">Decoded Content</span>
                <span className="badge badge-primary-light uppercase">{scanResult.type}</span>
              </div>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => {
                  setScanResult(null);
                  startCamera();
                }}
              >
                <RefreshCw size={14} />
                <span>Scan Another</span>
              </button>
            </div>

            {/* Payload display box */}
            <div className="result-content-box">
              <pre className="result-raw-text">{scanResult.raw}</pre>
            </div>

            {/* Security Warning for URLs */}
            {scanResult.type === 'url' && (
              <div className="url-security-banner">
                <ShieldAlert size={18} className="text-warning" />
                <div>
                  <strong>URL Destination Check:</strong>
                  <p className="url-verify-text">
                    Always review the complete destination link before visiting to ensure it matches the expected domain.
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="result-actions-row">
              <button type="button" className="btn btn-secondary" onClick={handleCopy}>
                {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
                <span>{copied ? 'Copied!' : 'Copy Content'}</span>
              </button>

              {scanResult.type === 'url' && (
                <button type="button" className="btn btn-primary" onClick={handleOpenLink}>
                  <ExternalLink size={16} />
                  <span>Open Website</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Privacy Note */}
        <div className="scanner-privacy-note">
          <Eye size={15} className="text-success" />
          <span>
            Camera frames and uploaded images are processed entirely in browser memory. No images or decoded content are sent to any server.
          </span>
        </div>
      </div>
    </div>
  );
};
