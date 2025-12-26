import React, { useState } from 'react';
import SectionHeader from './SectionHeader';
import { Mail, Github, Globe, Twitter, Power, Share2, Copy, Check } from 'lucide-react';
import { SocialLink } from '../types';

const Connect: React.FC = () => {
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('mhndfi@mohannadfiron.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <section className="w-full max-w-[960px] px-4 py-12 mb-20" id="connect">
      <SectionHeader title="./connect.sh --secure" />
      
      <div className="bg-panel-dark border border-[#283928] p-8 rounded-lg relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <Share2 className="w-32 h-32 text-primary" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <div className="flex flex-col justify-center">
            <h3 className="text-white text-2xl font-bold mb-2">Establish Uplink</h3>
            <p className="text-secondary-light mb-6">
              Found an interesting target? Have a collaboration opportunity? 
              Initialize a connection below.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="mailto:mhndfi@mohannadfiron.com"
                className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors group"
              >
                <Mail className="group-hover:animate-ping w-5 h-5" />
                <span className="font-mono text-lg underline decoration-1 underline-offset-4">
                  mhndfi@mohannadfiron.com
                </span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono border border-[#283928] bg-[#1c2c1c] text-secondary-light hover:text-primary hover:border-primary rounded transition-all focus:outline-none"
                title="Copy Email Address"
              >
                {emailCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{emailCopied ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <a
              href="https://github.com/MhndFi"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center p-6 bg-[#1c2c1c] border border-[#283928] hover:border-primary hover:bg-primary/10 rounded transition-all duration-300"
            >
              <Github className="w-8 h-8 text-white group-hover:text-primary mb-3 fill-current group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-white group-hover:text-primary">
                GitHub
              </span>
            </a>
            <a
              href="https://www.mohannadfiron.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center p-6 bg-[#1c2c1c] border border-[#283928] hover:border-primary hover:bg-primary/10 rounded transition-all duration-300"
            >
              <Globe className="w-8 h-8 text-white group-hover:text-primary mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-white group-hover:text-primary">
                Website
              </span>
            </a>
            <a
              href="https://twitter.com/Mohannad_Firon"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center p-6 bg-[#1c2c1c] border border-[#283928] hover:border-primary hover:bg-primary/10 rounded transition-all duration-300"
            >
              <Twitter className="w-8 h-8 text-white group-hover:text-primary mb-3 fill-current group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-white group-hover:text-primary">
                X / Twitter
              </span>
            </a>
            {/* Red Accent Button */}
            <a
              href="#"
              className="group flex flex-col items-center justify-center p-6 bg-[#2c1c1c] border border-[#283928] hover:border-secondary hover:bg-secondary/10 rounded transition-all duration-300"
            >
              <Power className="text-white group-hover:text-secondary mb-3 w-8 h-8 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-white group-hover:text-secondary">
                Terminate
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Connect;