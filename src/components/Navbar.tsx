import React, { useState } from 'react';
import { useRouter } from '../utils/router';
import { useTheme } from '../utils/theme';
import { QrCode, Sun, Moon, Menu, X, Sparkles, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPath, navigate } = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'QR Generator', path: '/qr-code-generator' },
    { label: 'QR Scanner', path: '/qr-code-scanner' },
    { label: 'Templates', path: '/templates' },
    { label: 'QR Tools', path: '/qr-tools' },
    { label: 'Guide', path: '/qr-code-guide' },
    { label: 'About', path: '/about' },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="site-header" role="banner">
      <div className="header-container">
        {/* Brand Logo */}
        <button
          className="brand-logo"
          onClick={() => handleNavClick('/')}
          aria-label="QRCodeGenix Home"
        >
          <div className="logo-icon-wrap">
            <QrCode className="logo-svg" size={24} />
          </div>
          <div className="logo-text-wrap">
            <span className="logo-name">
              QRCode<span className="logo-accent">Genix</span>
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav" role="navigation" aria-label="Main Navigation">
          <ul className="nav-list">
            {navLinks.map(link => {
              const isActive = currentPath === link.path;
              return (
                <li key={link.path}>
                  <button
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => handleNavClick(link.path)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right CTA & Theme Toggle */}
        <div className="header-actions">
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <button
            className="btn btn-primary btn-sm create-qr-btn desktop-only"
            onClick={() => handleNavClick('/qr-code-generator')}
          >
            <Sparkles size={15} />
            <span>Create QR</span>
            <ArrowRight size={14} />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            className="mobile-menu-btn mobile-only"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile Menu">
          <div className="mobile-drawer-backdrop" onClick={() => setMobileMenuOpen(false)} />
          <div className="mobile-drawer-content">
            <div className="mobile-drawer-header">
              <span className="mobile-drawer-title">Navigation</span>
              <button
                className="mobile-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="mobile-nav-list">
              <button
                className={`mobile-nav-link ${currentPath === '/' ? 'active' : ''}`}
                onClick={() => handleNavClick('/')}
              >
                Home
              </button>
              {navLinks.map(link => (
                <button
                  key={link.path}
                  className={`mobile-nav-link ${currentPath === link.path ? 'active' : ''}`}
                  onClick={() => handleNavClick(link.path)}
                >
                  {link.label}
                </button>
              ))}
            </nav>
            <div className="mobile-drawer-footer">
              <button
                className="btn btn-primary btn-block"
                onClick={() => handleNavClick('/qr-code-generator')}
              >
                <Sparkles size={16} />
                <span>Create QR Code</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
