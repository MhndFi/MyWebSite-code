import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const SoundToggle: React.FC = () => {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize Web Audio API context
    if (typeof window !== 'undefined' && !audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }, []);

  const playBeep = (frequency: number = 800, duration: number = 100) => {
    if (!soundEnabled || !audioContextRef.current) return;

    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'square'; // Retro computer sound

    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration / 1000);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration / 1000);
  };

  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    if (newState && audioContextRef.current) {
      // Play a confirmation beep
      playBeep(1200, 50);
      setTimeout(() => playBeep(1400, 50), 60);
    }
  };

  // Expose sound function to window for global access
  useEffect(() => {
    if (soundEnabled) {
      (window as any).playSystemBeep = playBeep;
    } else {
      (window as any).playSystemBeep = () => {};
    }
  }, [soundEnabled]);

  return (
    <button
      onClick={toggleSound}
      className="fixed bottom-4 right-4 z-50 p-3 bg-panel-dark border border-[#283928] hover:border-primary rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(19,236,19,0.3)] group"
      title={soundEnabled ? 'Disable sound' : 'Enable sound'}
    >
      {soundEnabled ? (
        <Volume2 className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
      ) : (
        <VolumeX className="w-5 h-5 text-[#567556] group-hover:text-primary group-hover:scale-110 transition-all" />
      )}
      <span className="absolute -top-8 right-0 bg-panel-dark border border-[#283928] px-2 py-1 rounded text-xs text-secondary-light opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {soundEnabled ? 'Audio: ON' : 'Audio: OFF'}
      </span>
    </button>
  );
};

export default SoundToggle;
