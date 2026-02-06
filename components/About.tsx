import React, { useState } from 'react';
import { Terminal, Coffee, Moon, MapPin, Shield, Bug, Crosshair } from 'lucide-react';
import SectionHeader from './SectionHeader';

const About: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="w-full py-8" id="about">
      <SectionHeader title="./cat_bio.sh" subtitle="Reading local user metadata" />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Profile Card */}
        <div className="flex flex-col items-center lg:items-start gap-6 lg:w-1/3">
          <div className="relative group">
            <div className="absolute -inset-1 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-700" />
            <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img
              src="https://ui-avatars.com/api/?name=Mohannad+Firon&background=111811&color=13ec13&size=200&bold=true"
              alt="Mohannad Firon"
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              className={`w-36 h-36 rounded-full border-2 border-[#283928] group-hover:border-primary grayscale group-hover:grayscale-0 transition-all duration-700 relative z-10 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
          </div>

          <div className="text-center lg:text-left">
            <h3 className="text-white text-2xl font-bold mb-1">Mohannad Firon</h3>
            <div className="flex items-center gap-1.5 justify-center lg:justify-start text-[#567556] text-xs font-mono">
              <MapPin className="w-3 h-3" />
              <span>Jerusalem</span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-3 w-full">
            <div className="bg-panel-dark border border-[#283928] p-3 rounded flex-1 group/stat hover:border-secondary transition-all duration-300">
              <div className="flex items-center justify-between mb-1">
                <span className="text-secondary text-xl font-black font-mono">98%</span>
                <Coffee className="w-4 h-4 text-secondary/40 group-hover/stat:text-secondary transition-colors" />
              </div>
              <p className="text-[9px] text-[#567556] uppercase font-mono tracking-widest">Coffee</p>
            </div>
            <div className="bg-panel-dark border border-[#283928] p-3 rounded flex-1 group/stat hover:border-primary transition-all duration-300">
              <div className="flex items-center justify-between mb-1">
                <span className="text-primary text-xl font-black font-mono">4.5H</span>
                <Moon className="w-4 h-4 text-primary/40 group-hover/stat:text-primary transition-colors" />
              </div>
              <p className="text-[9px] text-[#567556] uppercase font-mono tracking-widest">Sleep</p>
            </div>
          </div>
        </div>

        {/* Right: Bio Content */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-[#0d130d] border border-[#283928] rounded-lg overflow-hidden">
            <div className="bg-[#1a251a] border-b border-[#283928] px-4 py-2 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-primary/60" />
              <span className="text-[#567556] text-xs font-mono">whoami --verbose</span>
            </div>
            <div className="p-6">
              <p className="text-secondary-light text-base leading-relaxed mb-4">
                Specializing in <span className="text-primary font-semibold">high-stakes web application security</span>, deep-recon, and vulnerability hunting on HackerOne and Bugcrowd.
              </p>
              <p className="text-secondary-light/80 text-sm leading-relaxed">
                I leverage custom-built automation suites and manual penetration testing techniques to uncover critical security flaws in enterprise-grade infrastructure.
              </p>
            </div>
          </div>

          {/* Focus Areas */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-center gap-3 bg-panel-dark border border-[#283928] rounded px-4 py-3 hover:border-primary/30 transition-colors">
              <Bug className="w-4 h-4 text-primary shrink-0" />
              <span className="text-secondary-light text-xs font-mono">Bug Bounty</span>
            </div>
            <div className="flex items-center gap-3 bg-panel-dark border border-[#283928] rounded px-4 py-3 hover:border-primary/30 transition-colors">
              <Shield className="w-4 h-4 text-primary shrink-0" />
              <span className="text-secondary-light text-xs font-mono">Pentesting</span>
            </div>
            <div className="flex items-center gap-3 bg-panel-dark border border-[#283928] rounded px-4 py-3 hover:border-primary/30 transition-colors">
              <Crosshair className="w-4 h-4 text-primary shrink-0" />
              <span className="text-secondary-light text-xs font-mono">Recon & OSINT</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
