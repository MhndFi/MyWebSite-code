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
    description: 'Demonstrates ability to forge complex HTTP requests using curl or custom scripts.',
  },
  {
    id: 'thm',
    title: 'Web Application Pentesting Path',
    issuer: 'TryHackMe',
    date: 'Aug 21, 2025',
    description: 'Comprehensive learning path covering web vulnerabilities and exploitation techniques.',
  },
  {
    id: 'hackeru',
    title: 'Cyber & Information Security',
    issuer: 'HackerU',
    date: 'Jun 12, 2022',
    description: 'Ethical Hacking course completion (540 academic hours).',
  },
  {
    id: 'tdx',
    title: 'TDX Arena Penetration Tester',
    issuer: 'ThriveDX Labs',
    date: 'Jun 12, 2022',
    credentialId: '110919',
  },
];

const Certificates: React.FC = () => {
  return (
    <section className="w-full py-8" id="certs">
      <SectionHeader title="./view_certs.sh" subtitle={`Verified: ${certificates.length}`} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="bg-surface border border-border-soft p-5 rounded-lg hover:border-primary/40 hover:shadow-soft-lg shadow-soft transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 bg-primary-soft rounded-md border border-primary/20 group-hover:border-primary/40 transition-colors">
                <Award className="w-5 h-5 text-primary" />
              </div>
              <div className="text-right">
                <span className="text-ink-muted text-[10px] font-mono uppercase block">Issued by</span>
                <span className="text-ink text-sm font-bold">{cert.issuer}</span>
              </div>
            </div>

            <h3 className="text-ink text-base font-bold mb-2 group-hover:text-primary transition-colors font-display">
              {cert.title}
            </h3>

            {cert.description && (
              <p className="text-ink-muted text-sm mb-3 leading-relaxed">
                {cert.description}
              </p>
            )}

            <div className="flex flex-col gap-1.5 border-t border-border-soft pt-3 mt-auto">
              <div className="flex items-center gap-2 text-ink-muted text-xs font-mono">
                <Calendar className="w-3 h-3" />
                <span>{cert.date}</span>
              </div>
              {cert.credentialId && (
                <div className="flex items-center gap-2 text-ink-muted text-xs font-mono">
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
