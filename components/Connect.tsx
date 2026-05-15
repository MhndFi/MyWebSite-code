import React, { useState } from 'react';
import SectionHeader from './SectionHeader';
import { Mail, Github, Globe, Twitter, Copy, Check } from 'lucide-react';
import { safeUrl } from '../utils/safe';

const EMAIL = 'mhndfi@mohannadfiron.com';

const Connect: React.FC = () => {
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      /* clipboard blocked */
    }
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
        <div className="bg-surface border border-border-soft rounded-lg p-6 shadow-soft">
          <p className="text-ink-muted text-xs font-mono mb-4">$ cat /etc/contact.conf</p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-3 text-primary hover:text-primary-strong transition-colors group"
            >
              <span className="p-2 rounded-md bg-primary-soft group-hover:bg-primary group-hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </span>
              <span className="font-mono text-sm">{EMAIL}</span>
            </a>
            <button
              onClick={handleCopyEmail}
              className="px-3 py-1.5 text-[10px] font-mono border border-border-soft bg-background-dark text-ink-muted hover:text-primary hover:border-primary/40 rounded-md transition-all flex items-center gap-1.5"
              aria-label="Copy email address"
            >
              {emailCopied ? (
                <><Check className="w-3 h-3" /> Copied</>
              ) : (
                <><Copy className="w-3 h-3" /> Copy</>
              )}
            </button>
          </div>
        </div>

        {/* Social Links */}
        <div className="grid grid-cols-3 gap-4">
          {socials.map((social) => {
            const href = safeUrl(social.url);
            if (!href) return null;
            return (
              <a
                key={social.name}
                href={href}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="group flex flex-col items-center justify-center p-5 bg-surface border border-border-soft hover:border-primary/40 hover:shadow-soft-lg shadow-soft rounded-lg transition-all duration-300"
              >
                <social.icon className="w-6 h-6 text-ink-muted group-hover:text-primary mb-2 transition-colors" />
                <span className="text-[10px] font-mono text-ink-muted group-hover:text-primary uppercase tracking-widest transition-colors">
                  {social.name}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Connect;
