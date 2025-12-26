import React, { useState } from 'react';
import SectionHeader from './SectionHeader';
import { Mail, Github, Globe, Twitter, Power, Share2, Copy, Check, Lock } from 'lucide-react';

const Connect: React.FC = () => {
  const [emailCopied, setEmailCopied] = useState(false);
  const [siteCopied, setSiteCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('mhndfi@mohannadfiron.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleCopySite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText('https://www.mohannadfiron.com');
    setSiteCopied(true);
    setTimeout(() => setSiteCopied(false), 2000);
  };

  return (
    <section className="w-full py-4 mb-12" id="connect">
      <SectionHeader title="./establish_uplink --secure" subtitle="Protocol: SSH-RSA 4096" />
      
      <div className="bg-[#1a251a]/20 border border-[#283928] p-8 rounded relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
          <Lock className="w-40 h-40 text-primary" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
          <div className="flex flex-col justify-center">
            <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
              <Share2 className="w-5 h-5 text-primary" />
              Secure Communication
            </h3>
            <p className="text-secondary-light/70 mb-8 font-mono text-sm leading-relaxed">
              Connection encrypted via end-to-end PGP protocols. Leave a message for the administrator or follow the social nodes listed in the routing table.
            </p>
            
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <a
                  href="mailto:mhndfi@mohannadfiron.com"
                  className="flex items-center gap-3 text-primary hover:text-white transition-all group/mail"
                >
                  <div className="p-2 rounded bg-primary/10 group-hover/mail:bg-primary/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-sm tracking-tight border-b border-primary/20 pb-1">
                    mhndfi@mohannadfiron.com
                  </span>
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1 text-[10px] font-mono border border-[#283928] bg-black/40 text-[#567556] hover:text-primary hover:border-primary rounded transition-all"
                  title="Copy Node Address"
                >
                  {emailCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <a
              href="https://github.com/MhndFi"
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn flex flex-col items-center justify-center p-6 border border-[#283928] bg-black/20 hover:border-primary hover:bg-primary/5 rounded transition-all duration-300"
            >
              <Github className="w-8 h-8 text-[#567556] group-hover/btn:text-primary group-hover/btn:scale-110 mb-3 transition-all" />
              <span className="text-[10px] font-mono text-[#567556] group-hover/btn:text-primary uppercase tracking-widest">
                Github
              </span>
            </a>

            <div className="group/btn relative flex flex-col items-center justify-center p-6 border border-[#283928] bg-black/20 hover:border-primary hover:bg-primary/5 rounded transition-all duration-300 cursor-pointer">
              <a 
                 href="https://www.mohannadfiron.com"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="absolute inset-0 z-0"
                 aria-label="Visit MySite"
              ></a>
              <div className="relative z-10 flex flex-col items-center pointer-events-none">
                <Globe className="w-8 h-8 text-[#567556] group-hover/btn:text-primary group-hover/btn:scale-110 mb-3 transition-all" />
                <span className="text-[10px] font-mono text-[#567556] group-hover/btn:text-primary uppercase tracking-widest">
                  MySite
                </span>
              </div>
              <button
                onClick={handleCopySite}
                className="absolute top-2 right-2 z-20 p-1.5 rounded bg-black/40 text-[#567556] hover:text-primary hover:bg-black/60 border border-transparent hover:border-primary/30 transition-all opacity-0 group-hover/btn:opacity-100"
                title="Copy URL"
              >
                {siteCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>

            <a
              href="https://twitter.com/Mohannad_Firon"
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn flex flex-col items-center justify-center p-6 border border-[#283928] bg-black/20 hover:border-primary hover:bg-primary/5 rounded transition-all duration-300"
            >
              <Twitter className="w-8 h-8 text-[#567556] group-hover/btn:text-primary group-hover/btn:scale-110 mb-3 transition-all" />
              <span className="text-[10px] font-mono text-[#567556] group-hover/btn:text-primary uppercase tracking-widest">
                Twitter
              </span>
            </a>
            
            <button
              className="group/btn flex flex-col items-center justify-center p-6 border border-[#283928] bg-[#2c1c1c]/10 hover:border-secondary hover:bg-secondary/5 rounded transition-all duration-300"
            >
              <Power className="w-8 h-8 text-[#567556] group-hover/btn:text-secondary group-hover/btn:scale-110 mb-3 transition-all" />
              <span className="text-[10px] font-mono text-[#567556] group-hover/btn:text-secondary uppercase tracking-widest">
                abort_session
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Connect;