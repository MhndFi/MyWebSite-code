import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-8 border-b border-[#283928] pb-2 flex justify-between items-end">
      <h2 className="text-primary text-2xl md:text-3xl font-bold font-mono">
        <span className="text-white opacity-50">&gt;</span> {title}
      </h2>
      {subtitle && (
        <span className="text-secondary-light text-xs hidden sm:block">{subtitle}</span>
      )}
    </div>
  );
};

export default SectionHeader;