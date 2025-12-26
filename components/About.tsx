import React, { useEffect, useState } from 'react';
import { Fingerprint, Terminal } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { Skill } from '../types';

const skills: Skill[] = [
  { name: 'Web Application Security', level: 98, color: 'primary' },
  { name: 'Reconnaissance Automation', level: 95, color: 'primary' },
  { name: 'Python / Bash Scripting', level: 90, color: 'primary' },
  { name: 'Exploit Development', level: 85, color: 'secondary', warning: true },
];

const About: React.FC = () => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
  }, []);

  return (
    <section className="w-full py-4" id="about">
      <SectionHeader title="./cat_bio.sh" subtitle="Reading local user metadata" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col gap-6">
           <div className="flex justify-center md:justify-start">
              <div className="relative group">
                <div className="absolute inset-0 bg-primary rounded-full blur opacity-10 group-hover:opacity-30 transition-opacity"></div>
                <img 
                  src="https://ui-avatars.com/api/?name=Mohannad+Firon&background=111811&color=13ec13&size=200&bold=true" 
                  alt="Mohannad Firon" 
                  className="w-28 h-28 rounded-full border border-[#283928] group-hover:border-primary grayscale group-hover:grayscale-0 transition-all duration-700 relative z-10 p-1"
                />
              </div>
           </div>

          <div className="bg-[#1a251a]/30 border border-[#283928] p-6 rounded relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 group-hover:text-primary transition-all">
              <Terminal className="w-5 h-5" />
            </div>
            <p className="text-secondary-light text-base leading-relaxed mb-4">
              <span className="text-primary/70 font-mono text-xs block mb-2 underline underline-offset-4 decoration-primary/20">
                $ whoami --verbose
              </span>
              Based in Jerusalem. Specializing in high-stakes web application security, deep-recon, and vulnerability hunting on HackerOne and Bugcrowd.
            </p>
            <p className="text-secondary-light text-base leading-relaxed">
              I leverage custom-built automation suites and manual penetration testing techniques to uncover critical security flaws in enterprise-grade infrastructure.
            </p>
          </div>

          <div className="flex gap-4">
            <div className="bg-panel-dark border border-[#283928] p-4 rounded flex-1 group hover:border-secondary transition-colors">
              <h3 className="text-secondary text-2xl font-black font-mono">98%</h3>
              <p className="text-[10px] text-secondary-light uppercase font-mono tracking-widest mt-1">CPU Load</p>
            </div>
            <div className="bg-panel-dark border border-[#283928] p-4 rounded flex-1 group hover:border-primary transition-colors">
              <h3 className="text-primary text-2xl font-black font-mono">0.0</h3>
              <p className="text-[10px] text-secondary-light uppercase font-mono tracking-widest mt-1">Latency</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 bg-[#1a251a]/20 p-6 rounded border border-[#283928]">
          <h3 className="text-white text-xs font-bold uppercase font-mono tracking-widest border-b border-[#283928] pb-3 mb-2 flex items-center gap-2">
            <Fingerprint className="w-4 h-4 text-primary" />
            System Specializations
          </h3>
          {skills.map((skill) => (
            <div key={skill.name} className="flex flex-col gap-2">
              <div className="flex justify-between items-end">
                <span className="text-white text-xs font-mono">
                  {skill.name}
                </span>
                <span className={`${skill.color === 'secondary' ? 'text-secondary' : 'text-primary'} text-[10px] font-mono`}>
                  {skill.level}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
                <div
                  className={`h-full ${skill.color === 'secondary' ? 'bg-secondary' : 'bg-primary'} transition-all duration-1000`}
                  style={{ width: animated ? `${skill.level}%` : '0%' }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;