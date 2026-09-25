import React from 'react';
import { RouterProvider, useRouter } from './utils/router';
import { ThemeProvider } from './utils/theme';
import { ToastProvider } from './components/Toast';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CookieConsentBanner } from './components/CookieConsentBanner';

// Pages
import { HomePage } from './pages/HomePage';
import { GeneratorPage } from './pages/GeneratorPage';
import { QRToolsPage } from './pages/QRToolsPage';
import { ToolLandingPage } from './pages/ToolLandingPage';
import { ScannerPage } from './pages/ScannerPage';
import { TemplatesPage } from './pages/TemplatesPage';
import { BatchGeneratorPage } from './pages/BatchGeneratorPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { CookiePolicyPage } from './pages/CookiePolicyPage';
import { GuidePage } from './pages/GuidePage';

const AppContent: React.FC = () => {
  const { currentPath } = useRouter();

  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/':
        return <HomePage />;
      case '/qr-code-generator':
        return <GeneratorPage />;
      case '/qr-code-scanner':
        return <ScannerPage />;
      case '/qr-tools':
        return <QRToolsPage />;
      case '/templates':
      case '/qr-code-templates':
        return <TemplatesPage />;
      case '/batch-qr-code-generator':
        return <BatchGeneratorPage />;
      case '/qr-code-guide':
      case '/guide':
        return <GuidePage />;
      case '/url-to-qr-code':
      case '/text-to-qr-code':
      case '/wifi-qr-code-generator':
      case '/whatsapp-qr-code-generator':
      case '/email-qr-code-generator':
      case '/phone-qr-code-generator':
      case '/vcard-qr-code-generator':
      case '/contact-qr-code-generator':
      case '/google-maps-qr-code':
      case '/sms-qr-code-generator':
        return <ToolLandingPage path={currentPath} />;
      case '/about':
        return <AboutPage />;
      case '/contact':
        return <ContactPage />;
      case '/privacy-policy':
        return <PrivacyPolicyPage />;
      case '/terms':
        return <TermsPage />;
      case '/cookie-policy':
        return <CookiePolicyPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="app-layout">
      <Navbar />
      <main id="main-content" className="site-main" role="main">
        {renderCurrentPage()}
      </main>
      <Footer />
      <CookieConsentBanner />
    </div>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <RouterProvider>
          <AppContent />
        </RouterProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
