import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-10 group">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-ink-muted font-mono text-sm">[mhndfi@system-root]</span>
          <span className="text-ink-dim font-mono text-sm">:~#</span>
          <h2 className="text-primary text-xl md:text-2xl font-bold font-mono tracking-tight group-hover:text-primary-strong transition-colors">
            {title}
          </h2>
        </div>
        {subtitle && (
          <span className="text-ink-dim text-[10px] font-mono uppercase tracking-[0.2em]">
            // {subtitle}
          </span>
        )}
      </div>
      <div className="h-px w-full bg-gradient-to-r from-primary/40 via-primary/15 to-transparent"></div>
    </div>
  );
};

export default SectionHeader;
