import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  onComplete?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onComplete }) => {
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState('');
  const [bootComplete, setBootComplete] = useState(false);
  const [nameText, setNameText] = useState('');
  const [roleText, setRoleText] = useState('');
  const [showButtons, setShowButtons] = useState(false);
  
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const addTimeout = (callback: () => void, delay: number) => {
    const id = setTimeout(callback, delay);
    timeoutsRef.current.push(id);
  };

  useEffect(() => {
    const sequence = [
      "> INITIATING SYSTEM BOOT...",
      "> LOAD KERNEL MODULES... [DONE]",
      "> ESTABLISHING SECURE UPLINK...",
      "> VERIFYING ENCRYPTION... [OK]",
      "> ACCESS GRANTED."
    ];

    let lineIndex = 0;
    let charIndex = 0;

    const typeBoot = () => {
      if (lineIndex >= sequence.length) {
        addTimeout(() => {
          setBootComplete(true);
          onComplete?.();
        }, 500);
        return;
      }

      const currentFullLine = sequence[lineIndex];

      if (charIndex < currentFullLine.length) {
        setCurrentLine(currentFullLine.slice(0, charIndex + 1));
        charIndex++;
        addTimeout(typeBoot, Math.random() * 20 + 10);
      } else {
        setTypedLines(prev => [...prev, currentFullLine]);
        setCurrentLine('');
        charIndex = 0;
        lineIndex++;
        addTimeout(typeBoot, 80);
      }
    };

    addTimeout(typeBoot, 500);
    return () => timeoutsRef.current.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (!bootComplete) return;

    const name = "MOHANNAD FIRON";
    const fullRole = "Bug Bounty Hunter | Security Researcher | Penetration Tester";
    let charIndex = 0;

    const typeName = () => {
      if (charIndex < name.length) {
        setNameText(name.slice(0, charIndex + 1));
        charIndex++;
        addTimeout(typeName, Math.random() * 60 + 40); 
      } else {
        charIndex = 0;
        addTimeout(typeRole, 400);
      }
    };

    const typeRole = () => {
        if (charIndex < fullRole.length) {
            setRoleText(fullRole.slice(0, charIndex + 1));
            charIndex++;
            addTimeout(typeRole, Math.random() * 20 + 15);
        } else {
            addTimeout(() => setShowButtons(true), 400);
        }
    }

    addTimeout(typeName, 200);
  }, [bootComplete]);

  return (
    <section className="w-full flex flex-col items-center justify-center min-h-[60vh] relative py-12 border-b border-[#283928]/30">
      <div className="flex flex-col gap-4 text-center z-10 w-full max-w-3xl">
        {/* Terminal Boot Sequence Display */}
        <div className={`flex flex-col items-center justify-end font-mono text-xs md:text-sm tracking-widest transition-all duration-700 ${bootComplete ? 'mb-8 opacity-40' : 'mb-0 h-[100px]'}`}>
           {typedLines.map((line, i) => (
             <div key={i} className="text-[#567556] w-full text-center py-0.5">
               {line}
             </div>
           ))}
           {!bootComplete && (
             <div className="text-primary w-full text-center">
               {currentLine}
               <span className="animate-blink ml-1 inline-block w-2 h-4 bg-primary align-middle"></span>
             </div>
           )}
        </div>

        {/* Main Content */}
        <div 
          className={`flex flex-col gap-6 transition-all duration-1000 ease-out transform ${
            bootComplete ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
          }`}
        >
          <div className="relative inline-block mx-auto">
            <h1 className="text-white text-4xl md:text-7xl font-black leading-tight tracking-tighter drop-shadow-[0_0_15px_rgba(19,236,19,0.3)] min-h-[1.1em]">
              {nameText}
              {!showButtons && bootComplete && (
                   <span className="animate-blink ml-2 inline-block w-3 h-8 md:h-12 bg-primary align-middle"></span>
              )}
            </h1>
          </div>
          
          <h2 className="text-[#9db99d] text-base md:text-xl font-mono max-w-2xl mx-auto min-h-[1.5em] leading-relaxed">
            {showButtons ? (
                <>
                Bug Bounty Hunter | Security Researcher | <span className="text-secondary font-bold">Penetration Tester</span>
                </>
            ) : (
                <>
                {roleText}
                {nameText && !showButtons && (
                     <span className="animate-blink ml-1 inline-block w-2 h-5 bg-primary align-middle"></span>
                )}
                </>
            )}
          </h2>

          <div className={`flex flex-col sm:flex-row gap-4 z-10 mt-12 justify-center transition-all duration-1000 ${showButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <a
              href="#work"
              className="group relative flex items-center justify-center overflow-hidden rounded border border-primary/40 bg-primary/5 px-8 py-4 transition-all hover:bg-primary hover:text-background-dark hover:border-primary hover:shadow-[0_0_30px_rgba(19,236,19,0.4)]"
            >
              <span className="relative text-primary text-xs font-bold tracking-[0.2em] group-hover:text-background-dark z-10">
                INITIATE_SEQUENCE.SH
              </span>
            </a>
            <a
              href="#connect"
              className="group relative flex items-center justify-center overflow-hidden rounded border border-secondary/40 bg-secondary/5 px-8 py-4 transition-all hover:bg-secondary hover:text-white hover:border-secondary hover:shadow-[0_0_30px_rgba(255,51,51,0.4)]"
            >
              <span className="relative text-secondary text-xs font-bold tracking-[0.2em] group-hover:text-white z-10">
                EMERGENCY_OVERRIDE.EXE
              </span>
            </a>
          </div>
        </div>
      </div>
      
      {showButtons && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-primary/40">
          <ChevronDown className="w-6 h-6" />
        </div>
      )}
    </section>
  );
};

export default Hero;