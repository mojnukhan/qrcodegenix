import React, { useEffect, useRef } from 'react';

interface AdSlotProps {
  slot: 'top-banner' | 'in-feed' | 'bottom-banner' | 'sidebar';
  slotId?: string;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
    __ADSENSE_CLIENT_ID?: string;
  }
}

export const AdSensePlaceholder: React.FC<AdSlotProps> = ({
  slot,
  slotId,
  className = '',
}) => {
  const adRef = useRef<HTMLModElement>(null);

  // Client ID can be configured via environment variable VITE_ADSENSE_CLIENT_ID or window.__ADSENSE_CLIENT_ID
  const clientId =
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_ADSENSE_CLIENT_ID) ||
    (typeof window !== 'undefined' && window.__ADSENSE_CLIENT_ID);

  useEffect(() => {
    if (!clientId) return;
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.warn('AdSense push notice:', err);
    }
  }, [clientId, slotId]);

  // CRITICAL GOOGLE ADSENSE APPROVAL RULE:
  // Before an AdSense account is approved, the site must NOT display empty dummy boxes
  // that say "Ad Space Available" or "Advertisement", as Google review teams flag them
  // under "Site not ready / Under construction" or "Scaffolded / Blank inventory".
  // When no client ID is set, gracefully collapse the slot so reviewers see a 100% complete, polished site.
  if (!clientId) {
    return null;
  }

  return (
    <aside
      className={`ad-container ad-slot-${slot} ${className}`}
      aria-label="Advertisement area"
    >
      <div className="ad-inner">
        <span className="ad-badge">Advertisement</span>
        <div className="ad-content-slot">
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client={clientId}
            data-ad-slot={slotId || 'auto'}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      </div>
    </aside>
  );
};
