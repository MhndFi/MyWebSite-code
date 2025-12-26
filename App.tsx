import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Writeups from './components/Writeups';
import Certificates from './components/Certificates';
import Connect from './components/Connect';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [isSystemReady, setIsSystemReady] = useState(false);

  useEffect(() => {
    // Global system ready state can be triggered after Hero boot
    const timer = setTimeout(() => setIsSystemReady(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-background-dark selection:bg-primary selection:text-background-dark">
      {/* Global CRT Scanlines */}
      <div className="scanlines opacity-30"></div>
      
      {/* Navigation */}
      <Navbar />

      {/* Main Terminal Interface */}
      <main className="relative pt-24 pb-12 flex flex-col items-center w-full min-h-screen bg-grid-pattern bg-[length:50px_50px]">
        <div className="w-full max-w-[1400px] px-4">
          {/* Global Terminal Window */}
          <div className="relative w-full rounded-lg border border-[#283928] bg-panel-dark shadow-2xl shadow-primary/10 overflow-hidden flex flex-col min-h-[85vh]">
            
            {/* Terminal Title Bar */}
            <div className="flex items-center justify-between bg-[#1a251a] border-b border-[#283928] px-4 py-2 text-xs text-[#9db99d] font-mono sticky top-0 z-30">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-[#ff5f56]"></div>
                  <div className="h-3 w-3 rounded-full bg-[#ffbd2e]"></div>
                  <div className="h-3 w-3 rounded-full bg-[#27c93f]"></div>
                </div>
                <span className="ml-2 opacity-70">mhndfi@system-root: ~ (zsh)</span>
              </div>
              <div className="hidden sm:block opacity-50">120x40</div>
            </div>

            {/* Terminal Buffer Content */}
            <div className="p-4 md:p-8 flex flex-col gap-12 md:gap-24 font-mono flex-grow">
              <Hero onComplete={() => setIsSystemReady(true)} />
              
              <div className={`transition-all duration-1000 ${isSystemReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <About />
              </div>
              
              <div className={`transition-all duration-1000 delay-300 ${isSystemReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <Projects />
              </div>

              <div className={`transition-all duration-1000 delay-500 ${isSystemReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <Writeups />
              </div>

              <div className={`transition-all duration-1000 delay-700 ${isSystemReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <Certificates />
              </div>

              <div className={`transition-all duration-1000 delay-900 ${isSystemReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <Connect />
              </div>
            </div>

            {/* Terminal Footer Info */}
            <div className="bg-[#1a251a] border-t border-[#283928] px-4 py-1 text-[10px] text-[#567556] flex justify-between items-center uppercase tracking-widest font-mono">
              <span>Encoding: UTF-8</span>
              <span>Connection: Encrypted/AES-256</span>
              <span className="animate-pulse">Status: Online</span>
            </div>
          </div>
        </div>
        
        <Footer />
      </main>
    </div>
  );
};

export default App;