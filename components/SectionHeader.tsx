import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-10 group">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-3">
          <span className="text-[#567556] font-mono text-sm">[mhndfi@system-root]</span>
          <span className="text-white opacity-50 font-mono text-sm">:~#</span>
          <h2 className="text-primary text-xl md:text-2xl font-bold font-mono tracking-tight group-hover:text-white transition-colors">
            {title}
          </h2>
        </div>
        {subtitle && (
          <span className="text-secondary-light/40 text-[10px] font-mono uppercase tracking-[0.2em]">
            // {subtitle}
          </span>
        )}
      </div>
      <div className="h-px w-full bg-gradient-to-r from-primary/30 via-primary/10 to-transparent"></div>
    </div>
  );
};

export default SectionHeader;