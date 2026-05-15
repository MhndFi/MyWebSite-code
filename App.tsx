import React, { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MatrixRain from './components/MatrixRain';
import SoundToggle from './components/SoundToggle';
import { useKonamiCode } from './hooks/useKonamiCode';

const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
const Writeups = lazy(() => import('./components/Writeups'));
const Certificates = lazy(() => import('./components/Certificates'));
const Connect = lazy(() => import('./components/Connect'));
const Footer = lazy(() => import('./components/Footer'));

const App: React.FC = () => {
  const [isSystemReady, setIsSystemReady] = useState(false);
  const [konamiActivated, setKonamiActivated] = useState(false);

  useKonamiCode(() => {
    setKonamiActivated(true);
    if ((window as any).playSystemBeep) {
      (window as any).playSystemBeep(1200, 100);
      setTimeout(() => (window as any).playSystemBeep(1400, 100), 100);
      setTimeout(() => (window as any).playSystemBeep(1600, 100), 200);
    }
    setTimeout(() => setKonamiActivated(false), 10000);
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsSystemReady(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-background-dark overflow-hidden">
      {/* Soft ambient gradients (decorative) */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 -left-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute top-1/3 -right-40 h-[28rem] w-[28rem] rounded-full bg-secondary/5 blur-3xl" />

      {/* Subtle code-rain ambient layer */}
      <MatrixRain />

      <Navbar />

      <main className="relative pt-24 pb-12 flex flex-col items-center w-full min-h-screen bg-grid-pattern bg-[length:50px_50px]">
        <div className="w-full max-w-[1400px] px-4">
          <div
            className={`relative w-full rounded-2xl border border-border-soft bg-surface shadow-soft-lg overflow-hidden flex flex-col min-h-[85vh] ${
              konamiActivated ? 'konami-active' : ''
            }`}
          >
            {/* Editor / Terminal title bar */}
            <div className="flex items-center justify-between bg-titlebar border-b border-border-soft px-4 py-2 text-xs text-ink-muted font-mono sticky top-0 z-30">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-[#ff5f56]"></div>
                  <div className="h-3 w-3 rounded-full bg-[#ffbd2e]"></div>
                  <div className="h-3 w-3 rounded-full bg-[#27c93f]"></div>
                </div>
                <span className="ml-2 opacity-80">mhndfi@system-root — zsh</span>
              </div>
              <div className="hidden sm:flex items-center gap-3 text-ink-dim">
                <span className="px-2 py-0.5 rounded bg-primary-soft text-primary-strong text-[10px] font-semibold tracking-wide">QUIET LIGHT</span>
                <span>120x40</span>
              </div>
            </div>

            <div className="p-5 md:p-10 flex flex-col gap-12 md:gap-24 font-mono flex-grow bg-surface-2">
              <Hero onComplete={() => setIsSystemReady(true)} />

              <Suspense fallback={<div className="text-primary text-sm font-mono animate-pulse">[ loading… ]</div>}>
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
              </Suspense>
            </div>

            <div className="bg-titlebar border-t border-border-soft px-4 py-1.5 text-[10px] text-ink-muted flex justify-between items-center uppercase tracking-widest font-mono">
              <span>UTF-8</span>
              <span>TLS 1.3 / AES-256</span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse"></span>
                Online
              </span>
            </div>
          </div>
        </div>

        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </main>

      <SoundToggle />
    </div>
  );
};

export default App;
