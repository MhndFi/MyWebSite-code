import React from 'react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full py-6 mt-8 border-t border-border-soft">
      <div className="max-w-[1000px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono text-ink-muted uppercase tracking-widest">
        <span>© {year} Mohannad Firon</span>
        <span className="text-primary/60">#ETHICAL_HACKING_ONLY</span>
      </div>
    </footer>
  );
};

export default Footer;
