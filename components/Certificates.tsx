import React from 'react';
import SectionHeader from './SectionHeader';
import { Certificate } from '../types';
import { Award, Calendar, Hash } from 'lucide-react';

const certificates: Certificate[] = [
  {
    id: 'ptl',
    title: 'HTTP Certificate of Completion',
    issuer: 'PentesterLab',
    date: '2025-10-25',
    credentialId: 'PTLH2403',
    description: 'Demonstrates ability to forge complex HTTP requests using curl or custom scripts.'
  },
  {
    id: 'thm',
    title: 'Web Application Pentesting Path',
    issuer: 'TryHackMe',
    date: 'Aug 21, 2025',
    description: 'Comprehensive learning path covering web vulnerabilities and exploitation techniques.'
  },
  {
    id: 'hackeru',
    title: 'Cyber & Information Security',
    issuer: 'HackerU',
    date: 'Jun 12, 2022',
    description: 'Ethical Hacking course completion (540 academic hours).'
  },
  {
    id: 'tdx',
    title: 'TDX Arena Penetration Tester',
    issuer: 'ThriveDX Labs',
    date: 'Jun 12, 2022',
    credentialId: '110919'
  }
];

const Certificates: React.FC = () => {
  return (
    <section className="w-full max-w-[960px] px-4 py-12" id="certs">
      <SectionHeader title="./view_certs.sh" subtitle={`Verified: ${certificates.length}`} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="group bg-gradient-to-br from-panel-dark to-[#1c2c1c] border border-[#283928] p-6 rounded hover:border-primary hover:shadow-[0_0_15px_rgba(19,236,19,0.15)] transition-all duration-300 relative overflow-hidden"
          >
             {/* Decorative Corner */}
             <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/10 to-transparent -mr-8 -mt-8 rounded-bl-full transition-opacity opacity-50 group-hover:opacity-100"></div>

            <div className="flex items-start justify-between mb-4 relative z-10">
                <div className="p-2 bg-[#1c2c1c] rounded border border-[#283928] group-hover:border-primary/50 transition-colors group-hover:scale-110 duration-300">
                    <Award className="w-6 h-6 text-primary" />
                </div>
                <div className="text-right">
                    <span className="text-secondary text-xs font-mono block mb-1">ISSUED BY</span>
                    <span className="text-white text-sm font-bold">{cert.issuer}</span>
                </div>
            </div>

            <h3 className="text-white text-lg font-bold mb-3 group-hover:text-primary transition-colors relative z-10">
                {cert.title}
            </h3>

            {cert.description && (
                <p className="text-secondary-light text-sm mb-4 leading-relaxed relative z-10">
                    {cert.description}
                </p>
            )}

            <div className="flex flex-col gap-2 mt-auto border-t border-[#283928] pt-4 relative z-10">
                <div className="flex items-center gap-2 text-[#567556] text-xs font-mono">
                    <Calendar className="w-3 h-3" />
                    <span>Date: {cert.date}</span>
                </div>
                {cert.credentialId && (
                     <div className="flex items-center gap-2 text-[#567556] text-xs font-mono">
                        <Hash className="w-3 h-3" />
                        <span>ID: {cert.credentialId}</span>
                    </div>
                )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certificates;