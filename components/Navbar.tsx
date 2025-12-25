import React, { useState } from 'react';
import { Terminal, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { name: './about_me', href: '#about' },
    { name: './projects', href: '#work' },
    { name: './writeups', href: '#writeups' },
    { name: './connect', href: '#connect' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-background-dark/95 backdrop-blur border-b border-[#283928]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Terminal className="text-primary animate-pulse w-6 h-6" />
            <h2 className="text-primary text-lg font-bold tracking-tight">mhndfi@root:~</h2>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[#9db99d] hover:text-primary transition-colors text-sm font-medium"
              >
                {link.name}
              </a>
            ))}
            <button className="text-secondary text-xs border border-secondary px-2 py-1 rounded hover:bg-secondary hover:text-white cursor-pointer transition-colors">
              EXIT SESSION
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden text-primary cursor-pointer" onClick={toggleMenu}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background-dark border-b border-[#283928] px-4 py-4 flex flex-col gap-4">
           {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#9db99d] hover:text-primary transition-colors text-sm font-medium block"
              >
                {link.name}
              </a>
            ))}
             <button className="text-secondary text-xs border border-secondary px-2 py-1 rounded hover:bg-secondary hover:text-white cursor-pointer transition-colors w-fit">
              EXIT SESSION
            </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;