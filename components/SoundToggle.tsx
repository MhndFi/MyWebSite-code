import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const SoundToggle: React.FC = () => {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  const ensureContext = (): AudioContext | null => {
    if (typeof window === 'undefined') return null;
    if (!audioContextRef.current) {
      const Ctor = window.AudioContext || (window as any).webkitAudioContext;
      if (!Ctor) return null;
      audioContextRef.current = new Ctor();
    }
    return audioContextRef.current;
  };

  const playBeep = (frequency: number = 800, duration: number = 100) => {
    if (!soundEnabled) return;
    const ctx = ensureContext();
    if (!ctx) return;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration / 1000);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration / 1000);
  };

  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    const ctx = ensureContext();
    if (newState && ctx) {
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => undefined);
      }
      // Immediate confirmation beeps, no setTimeout — newState isn't yet committed
      // so call private impl directly.
      const beep = (frequency: number, duration: number, delaySec = 0) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = frequency;
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.08, ctx.currentTime + delaySec);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delaySec + duration / 1000);
        osc.start(ctx.currentTime + delaySec);
        osc.stop(ctx.currentTime + delaySec + duration / 1000);
      };
      beep(1200, 50);
      beep(1400, 50, 0.06);
    }
  };

  useEffect(() => {
    if (soundEnabled) {
      (window as any).playSystemBeep = playBeep;
    } else {
      (window as any).playSystemBeep = () => {};
    }
  }, [soundEnabled]);

  useEffect(() => {
    return () => {
      audioContextRef.current?.close().catch(() => undefined);
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      aria-pressed={soundEnabled}
      aria-label={soundEnabled ? 'Disable sound' : 'Enable sound'}
      className="fixed bottom-4 right-4 z-50 p-3 bg-surface border border-border-soft hover:border-primary shadow-soft hover:shadow-soft-lg rounded-full transition-all duration-300 group"
    >
      {soundEnabled ? (
        <Volume2 className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
      ) : (
        <VolumeX className="w-5 h-5 text-ink-muted group-hover:text-primary group-hover:scale-110 transition-all" />
      )}
      <span className="absolute -top-9 right-0 bg-surface border border-border-soft px-2 py-1 rounded-md text-xs text-ink-muted opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-soft">
        {soundEnabled ? 'Audio: ON' : 'Audio: OFF'}
      </span>
    </button>
  );
};

export default SoundToggle;
