import React from 'react';
import SectionHeader from './SectionHeader';
import { Mail, Github, Linkedin, Twitter, Power, Share2 } from 'lucide-react';
import { SocialLink } from '../types';

const Connect: React.FC = () => {
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
            <p className="text-[#9db99d] mb-6">
              Ready to collaborate on secure systems or discuss the future of the
              decentralized web? Initialize a connection below.
            </p>
            <a
              href="mailto:user@root.net"
              className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors group"
            >
              <Mail className="group-hover:animate-ping w-5 h-5" />
              <span className="font-mono text-lg underline decoration-1 underline-offset-4">
                user@root.net
              </span>
            </a>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <a
              href="#"
              className="group flex flex-col items-center justify-center p-6 bg-[#1c2c1c] border border-[#283928] hover:border-primary hover:bg-primary/10 rounded transition-all duration-300"
            >
              <Github className="w-8 h-8 text-white group-hover:text-primary mb-3 fill-current" />
              <span className="text-sm font-medium text-white group-hover:text-primary">
                GitHub
              </span>
            </a>
            <a
              href="#"
              className="group flex flex-col items-center justify-center p-6 bg-[#1c2c1c] border border-[#283928] hover:border-primary hover:bg-primary/10 rounded transition-all duration-300"
            >
              <Linkedin className="w-8 h-8 text-white group-hover:text-primary mb-3 fill-current" />
              <span className="text-sm font-medium text-white group-hover:text-primary">
                LinkedIn
              </span>
            </a>
            <a
              href="#"
              className="group flex flex-col items-center justify-center p-6 bg-[#1c2c1c] border border-[#283928] hover:border-primary hover:bg-primary/10 rounded transition-all duration-300"
            >
              <Twitter className="w-8 h-8 text-white group-hover:text-primary mb-3 fill-current" />
              <span className="text-sm font-medium text-white group-hover:text-primary">
                X / Twitter
              </span>
            </a>
            {/* Red Accent Button */}
            <a
              href="#"
              className="group flex flex-col items-center justify-center p-6 bg-[#2c1c1c] border border-[#283928] hover:border-secondary hover:bg-secondary/10 rounded transition-all duration-300"
            >
              <Power className="text-white group-hover:text-secondary mb-3 w-8 h-8" />
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