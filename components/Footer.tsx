import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#050805] border-t border-[#283928] py-8">
      <div className="max-w-[960px] mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[#567556] text-sm">
          © 2023 System Root. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-xs font-mono text-[#567556]">
          <span>UPTIME: 4509d 12h 30m</span>
          <span>|</span>
          <span>V 2.0.4</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;