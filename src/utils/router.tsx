import React, { createContext, useContext, useState, useEffect } from 'react';

export type AppRoute =
  | '/'
  | '/qr-code-generator'
  | '/qr-code-scanner'
  | '/qr-tools'
  | '/templates'
  | '/qr-code-templates'
  | '/batch-qr-code-generator'
  | '/url-to-qr-code'
  | '/text-to-qr-code'
  | '/wifi-qr-code-generator'
  | '/whatsapp-qr-code-generator'
  | '/email-qr-code-generator'
  | '/phone-qr-code-generator'
  | '/vcard-qr-code-generator'
  | '/contact-qr-code-generator'
  | '/google-maps-qr-code'
  | '/sms-qr-code-generator'
  | '/about'
  | '/contact'
  | '/privacy-policy'
  | '/terms';

interface RouterContextType {
  currentPath: string;
  navigate: (path: string) => void;
}

const RouterContext = createContext<RouterContextType>({
  currentPath: '/',
  navigate: () => {},
});

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export function useRouter() {
  return useContext(RouterContext);
}
