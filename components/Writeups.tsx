import React from 'react';
import SectionHeader from './SectionHeader';
import { Writeup } from '../types';
import { FileText, ExternalLink, Calendar, Hash } from 'lucide-react';

const writeups: Writeup[] = [
  {
    id: '1',
    title: 'Napping -THM',
    date: 'Oct 18, 2025',
    platform: 'TryHackMe',
    description: 'This article is a TryHackMe “Napping” room write-up where the author learns red teaming by compromising a web app, phishing the admin via Reverse Tab Nabbing to steal SSH credentials, abusing a group-writable query.py to get a shell as another user, and finally using passwordless sudo vim (from GTFOBins) to pop a root shell and capture both user and root flags.',
    url: 'https://medium.com/@mhndfi/napping-thm-e7fca6d22d8a',
    tags: ['Red Teaming', 'PrivEsc', 'GTFOBins']
  }
];

const Writeups: React.FC = () => {
  return (
    <section className="w-full max-w-[960px] px-4 py-12" id="writeups">
      <SectionHeader title="./read_writeups.sh" subtitle={`Files found: ${writeups.length}`} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {writeups.map((writeup) => (
          <a 
            key={writeup.id} 
            href={writeup.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-panel-dark border border-[#283928] p-6 rounded hover:border-primary hover:bg-[#1c2c1c] transition-all duration-300 flex flex-col relative overflow-hidden"
          >
            {/* Decorative Icon Background */}
            <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
               <FileText className="w-32 h-32 text-primary" />
            </div>

            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="flex flex-wrap gap-2">
                 {writeup.tags.map(tag => (
                   <span key={tag} className="text-[10px] uppercase font-mono px-2 py-0.5 rounded border border-[#283928] bg-black/30 text-[#9db99d] group-hover:text-primary group-hover:border-primary/30 transition-colors">
                     {tag}
                   </span>
                 ))}
              </div>
              <ExternalLink className="w-4 h-4 text-[#567556] group-hover:text-primary transition-colors" />
            </div>

            <h3 className="text-white text-lg font-bold mb-2 group-hover:text-primary transition-colors relative z-10">
              {writeup.title}
            </h3>
            
            <p className="text-[#9db99d] text-sm mb-6 leading-relaxed relative z-10 flex-grow">
              {writeup.description}
            </p>

            <div className="flex items-center gap-4 text-xs font-mono text-[#567556] border-t border-[#283928] pt-4 mt-auto relative z-10">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3" />
                <span>{writeup.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Hash className="w-3 h-3" />
                <span>{writeup.platform}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Writeups;