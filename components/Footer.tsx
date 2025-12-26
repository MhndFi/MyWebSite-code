import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8 mt-12 border-t border-[#283928]/30">
      <div className="max-w-[1000px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-center">
        <div className="flex flex-col items-center md:items-start gap-1">
          <p className="text-[#567556] text-[10px] font-mono uppercase tracking-widest">
            © 2025 MOHANNAD FIRON // SYSTEM_ROOT.V2
          </p>
          <p className="text-[#283928] text-[9px] font-mono">
            LOC: 31.7683° N, 35.2137° E
          </p>
        </div>
        
        <div className="flex items-center gap-6 text-[10px] font-mono text-[#567556] uppercase tracking-tighter">
          <span className="opacity-50">#ETHICAL_HACKING_ONLY</span>
          <span className="text-primary/40">ZSH_CORE_LOADED</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;