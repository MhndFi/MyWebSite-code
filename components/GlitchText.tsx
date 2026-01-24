import React, { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchOnHover?: boolean;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '', glitchOnHover = false }) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchText, setGlitchText] = useState(text);

  useEffect(() => {
    if (!isGlitching && !glitchOnHover) {
      // Random glitch effect every 5-10 seconds
      const randomDelay = Math.random() * 5000 + 5000;
      const timer = setTimeout(() => {
        triggerGlitch();
      }, randomDelay);
      return () => clearTimeout(timer);
    }
  }, [isGlitching, text, glitchOnHover]);

  const triggerGlitch = () => {
    setIsGlitching(true);
    const chars = '!<>-_\\/[]{}—=+*^?#________';
    let iterations = 0;

    const interval = setInterval(() => {
      setGlitchText(text.split('').map((char, index) => {
        if (index < iterations) {
          return text[index];
        }
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(''));

      iterations += 1/3;

      if (iterations >= text.length) {
        clearInterval(interval);
        setGlitchText(text);
        setIsGlitching(false);
      }
    }, 30);
  };

  return (
    <span
      className={`relative inline-block ${className}`}
      onMouseEnter={() => glitchOnHover && triggerGlitch()}
    >
      <span className={`${isGlitching ? 'opacity-80' : ''}`}>
        {glitchText}
      </span>
      {isGlitching && (
        <>
          <span
            className="absolute top-0 left-0 text-secondary opacity-70"
            style={{
              transform: 'translate(-2px, 0)',
              clipPath: 'inset(0 0 50% 0)',
            }}
          >
            {glitchText}
          </span>
          <span
            className="absolute top-0 left-0 text-primary opacity-70"
            style={{
              transform: 'translate(2px, 0)',
              clipPath: 'inset(50% 0 0 0)',
            }}
          >
            {glitchText}
          </span>
        </>
      )}
    </span>
  );
};

export default GlitchText;
