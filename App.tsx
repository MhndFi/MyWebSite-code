import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Connect from './components/Connect';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen">
      {/* Scanline Overlay */}
      <div className="scanlines"></div>
      
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative pt-16 flex flex-col items-center w-full min-h-screen bg-grid-pattern bg-[length:40px_40px]">
        <Hero />
        <About />
        <Projects />
        <Connect />
        <Footer />
      </main>
    </div>
  );
};

export default App;