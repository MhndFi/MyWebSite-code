import React, { useState } from 'react';
import { Terminal, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navLinks = [
    { name: './about_me', href: '#about' },
    { name: './projects', href: '#work' },
    { name: './writeups', href: '#writeups' },
    { name: './connect', href: '#connect' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-background-dark/85 backdrop-blur border-b border-border-soft">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-3 group">
            <span className="grid place-items-center h-8 w-8 rounded-md bg-primary-soft text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <Terminal className="w-4 h-4" />
            </span>
            <h2 className="text-ink text-base font-semibold tracking-tight font-mono">
              <span className="text-primary">mhndfi</span>
              <span className="text-ink-muted">@root</span>
              <span className="text-ink-dim">:~</span>
            </h2>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-ink-muted hover:text-primary transition-colors text-sm font-medium font-mono"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#connect"
              className="text-primary text-xs font-semibold border border-primary/40 bg-primary-soft px-3 py-1.5 rounded-md hover:bg-primary hover:text-white hover:border-primary transition-colors"
            >
              CONTACT
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            className="md:hidden text-primary p-1 rounded hover:bg-primary-soft transition-colors"
            onClick={toggleMenu}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`md:hidden bg-background-light border-b border-border-soft overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-ink-muted hover:text-primary transition-colors text-sm font-medium font-mono"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#connect"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-primary text-xs font-semibold border border-primary/40 bg-primary-soft px-3 py-1.5 rounded-md hover:bg-primary hover:text-white transition-colors w-fit"
          >
            CONTACT
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
