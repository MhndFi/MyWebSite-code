import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Writeups from './components/Writeups';
import Certificates from './components/Certificates';
import Connect from './components/Connect';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen">
      {/* Scanline Overlay - Opacity managed via CSS for mobile, but set base here */}
      <div className="scanlines opacity-50"></div>
      
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative pt-16 flex flex-col items-center w-full min-h-screen bg-grid-pattern bg-[length:40px_40px] gap-12 md:gap-24">
        <Hero />
        <About />
        <Projects />
        <Writeups />
        <Certificates />
        <Connect />
        <Footer />
      </main>
    </div>
  );
};

export default App;