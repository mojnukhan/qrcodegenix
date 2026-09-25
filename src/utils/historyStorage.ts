import type { QRHistoryItem, QRType, QROptions, QRFormValues } from '../types/qr';

const HISTORY_KEY = 'qrcodegenix_local_history';
const SETTINGS_KEY = 'qrcodegenix_history_enabled';
const MAX_HISTORY_ITEMS = 15;

export function isHistoryEnabled(): boolean {
  try {
    const val = localStorage.getItem(SETTINGS_KEY);
    return val !== 'false';
  } catch {
    return false;
  }
}

export function setHistoryEnabled(enabled: boolean): void {
  try {
    localStorage.setItem(SETTINGS_KEY, enabled ? 'true' : 'false');
  } catch (e) {
    console.error('Failed to save history preference:', e);
  }
}

export function getLocalHistory(): QRHistoryItem[] {
  if (!isHistoryEnabled()) return [];
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    if (!data) return [];
    return JSON.parse(data) as QRHistoryItem[];
  } catch {
    return [];
  }
}

export function saveToLocalHistory(
  type: QRType,
  title: string,
  data: string,
  options: QROptions,
  values: QRFormValues
): QRHistoryItem[] {
  if (!isHistoryEnabled() || !data) return getLocalHistory();
  try {
    const history = getLocalHistory();
    // Exclude logoDataUrl from history storage to save localStorage quota
    const sanitizedOptions: QROptions = {
      ...options,
      logoDataUrl: null, // do not store raw base64 logo in localStorage to prevent quota overflow
    };

    // Remove duplicates if same data & type
    const filtered = history.filter(item => item.data !== data);

    const newItem: QRHistoryItem = {
      id: Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
      type,
      title: title || data.slice(0, 30),
      data,
      options: sanitizedOptions,
      values,
      createdAt: Date.now(),
    };

    const updated = [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to save to local history:', err);
    return getLocalHistory();
  }
}

export function deleteHistoryItem(id: string): QRHistoryItem[] {
  try {
    const history = getLocalHistory();
    const updated = history.filter(item => item.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function clearLocalHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (e) {
    console.error('Failed to clear local history:', e);
  }
}
