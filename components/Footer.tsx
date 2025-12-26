import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#050805] border-t border-[#283928] py-8 mt-auto">
      <div className="max-w-[960px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
           <p className="text-[#567556] text-sm">
            © 2025 Mohannad Firon. All rights reserved.
          </p>
          <span className="hidden sm:block text-[#567556] text-sm">|</span>
           <p className="text-[#567556] text-sm">
            Based in Jerusalem
          </p>
        </div>
        
        <div className="flex items-center gap-4 text-xs font-mono text-[#567556]">
          <span>Ethical Hacking Only</span>
          <span>|</span>
          <span>V 2.0.0</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;