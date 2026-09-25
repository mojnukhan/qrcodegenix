import React, { useState } from 'react';
import type { QRHistoryItem } from '../../types/qr';
import {
  getLocalHistory,
  deleteHistoryItem,
  clearLocalHistory,
  isHistoryEnabled,
  setHistoryEnabled,
} from '../../utils/historyStorage';
import { History, Trash2, ArrowUpRight, ShieldCheck, ToggleLeft, ToggleRight, X } from 'lucide-react';
import { useToast } from '../../components/Toast';

interface QRHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: QRHistoryItem) => void;
}

export const QRHistoryDrawer: React.FC<QRHistoryDrawerProps> = ({ isOpen, onClose, onSelect }) => {
  const [items, setItems] = useState<QRHistoryItem[]>(() => getLocalHistory());
  const [enabled, setEnabled] = useState<boolean>(() => isHistoryEnabled());
  const { showToast } = useToast();

  const handleToggle = () => {
    const next = !enabled;
    setHistoryEnabled(next);
    setEnabled(next);
    if (!next) {
      clearLocalHistory();
      setItems([]);
      showToast('History disabled & cleared', 'info');
    } else {
      showToast('Local history enabled', 'success');
    }
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = deleteHistoryItem(id);
    setItems(updated);
    showToast('Item removed from history', 'info');
  };

  const handleClear = () => {
    if (items.length === 0) return;
    if (window.confirm('Clear all local QR history from this browser?')) {
      clearLocalHistory();
      setItems([]);
      showToast('All history cleared', 'success');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="history-modal-overlay" role="dialog" aria-modal="true" aria-label="QR Code History">
      <div className="history-modal-backdrop" onClick={onClose} />
      <div className="history-modal-card">
        <div className="history-header">
          <div className="history-title-wrap">
            <History size={20} className="text-primary" />
            <h3 className="history-title">Recent QR Codes</h3>
          </div>
          <button className="btn-close" onClick={onClose} aria-label="Close history modal">
            <X size={18} />
          </button>
        </div>

        {/* Privacy Note */}
        <div className="history-privacy-banner">
          <ShieldCheck size={16} />
          <span>Your history is stored only in this browser and never uploaded.</span>
        </div>

        {/* Controls */}
        <div className="history-controls">
          <button
            className="history-toggle-btn"
            onClick={handleToggle}
            aria-label="Toggle history recording"
          >
            {enabled ? <ToggleRight size={22} className="text-primary" /> : <ToggleLeft size={22} />}
            <span>{enabled ? 'History Enabled' : 'History Paused'}</span>
          </button>

          {items.length > 0 && (
            <button className="btn-danger-ghost btn-xs" onClick={handleClear}>
              <Trash2 size={13} />
              <span>Clear All</span>
            </button>
          )}
        </div>

        {/* Items List */}
        <div className="history-list">
          {items.length === 0 ? (
            <div className="history-empty">
              <History size={36} className="text-muted" />
              <p className="empty-title">No recent QR codes</p>
              <p className="empty-desc">
                QR codes you generate and download will appear here for quick access.
              </p>
            </div>
          ) : (
            items.map(item => (
              <div
                key={item.id}
                className="history-item-card"
                onClick={() => {
                  onSelect(item);
                  onClose();
                  showToast(`Loaded "${item.type.toUpperCase()}" QR into editor`, 'success');
                }}
              >
                <div className="history-item-meta">
                  <span className="badge badge-sm badge-outline uppercase">{item.type}</span>
                  <span className="history-item-time">
                    {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="history-item-title" title={item.data}>
                  {item.title || item.data}
                </p>
                <div className="history-item-actions">
                  <span className="history-load-hint">
                    <ArrowUpRight size={13} /> Load
                  </span>
                  <button
                    className="history-del-btn"
                    onClick={e => handleDelete(item.id, e)}
                    aria-label="Delete this history item"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
