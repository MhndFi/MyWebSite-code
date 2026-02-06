import React, { useState } from 'react';
import SectionHeader from './SectionHeader';
import { Mail, Github, Globe, Twitter, Copy, Check } from 'lucide-react';

const Connect: React.FC = () => {
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('mhndfi@mohannadfiron.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const socials = [
    { name: 'Github', icon: Github, url: 'https://github.com/MhndFi' },
    { name: 'Website', icon: Globe, url: 'https://www.mohannadfiron.com' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/Mohannad_Firon' },
  ];

  return (
    <section className="w-full py-8 mb-8" id="connect">
      <SectionHeader title="./establish_uplink --secure" subtitle="Protocol: SSH-RSA 4096" />

      <div className="flex flex-col gap-6">
        {/* Email */}
        <div className="bg-[#0d130d] border border-[#283928] rounded-lg p-6">
          <p className="text-[#567556] text-xs font-mono mb-4">$ cat /etc/contact.conf</p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="mailto:mhndfi@mohannadfiron.com"
              className="flex items-center gap-3 text-primary hover:text-white transition-colors group"
            >
              <div className="p-2 rounded bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <span className="font-mono text-sm">mhndfi@mohannadfiron.com</span>
            </a>
            <button
              onClick={handleCopyEmail}
              className="px-3 py-1.5 text-[10px] font-mono border border-[#283928] bg-black/40 text-[#567556] hover:text-primary hover:border-primary/30 rounded transition-all flex items-center gap-1.5"
            >
              {emailCopied ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
            </button>
          </div>
        </div>

        {/* Social Links */}
        <div className="grid grid-cols-3 gap-4">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center p-5 bg-[#0d130d] border border-[#283928] hover:border-primary/40 rounded-lg transition-all duration-300"
            >
              <social.icon className="w-6 h-6 text-[#567556] group-hover:text-primary mb-2 transition-colors" />
              <span className="text-[10px] font-mono text-[#567556] group-hover:text-primary uppercase tracking-widest transition-colors">
                {social.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Connect;
