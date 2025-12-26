import React from 'react';
import { Terminal } from 'lucide-react';
import SectionHeader from './SectionHeader';

const About: React.FC = () => {
  return (
    <section className="w-full py-4" id="about">
      <SectionHeader title="./cat_bio.sh" subtitle="Reading local user metadata" />
      
      <div className="max-w-3xl">
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
              <span className="text-primary/70 font-mono text-xl block mb-2 underline underline-offset-4 decoration-primary/20">
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
              <p className="text-[10px] text-secondary-light uppercase font-mono tracking-widest mt-1">Coffee LOAD</p>
            </div>
            <div className="bg-panel-dark border border-[#283928] p-4 rounded flex-1 group hover:border-primary transition-colors">
              <h3 className="text-primary text-2xl font-black font-mono">4.5H</h3>
              <p className="text-[10px] text-secondary-light uppercase font-mono tracking-widest mt-1">Sleep Hours</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;