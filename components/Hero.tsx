import React, { useState, useEffect, useRef } from 'react';

const Hero: React.FC = () => {
  // Boot sequence state
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState('');
  const [bootComplete, setBootComplete] = useState(false);
  
  // Main content typing state
  const [nameText, setNameText] = useState('');
  const [roleText, setRoleText] = useState('');
  const [showButtons, setShowButtons] = useState(false);
  
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const addTimeout = (callback: () => void, delay: number) => {
    const id = setTimeout(callback, delay);
    timeoutsRef.current.push(id);
  };

  // Boot Sequence Effect
  useEffect(() => {
    const sequence = [
      "> ESTABLISHING SECURE UPLINK...",
      "> VERIFYING ENCRYPTION KEYS... [OK]",
      "> BYPASSING FIREWALL... [SUCCESS]",
      "> ACCESS GRANTED."
    ];

    let lineIndex = 0;
    let charIndex = 0;

    const typeBoot = () => {
      if (lineIndex >= sequence.length) {
        addTimeout(() => setBootComplete(true), 500);
        return;
      }

      const currentFullLine = sequence[lineIndex];

      if (charIndex < currentFullLine.length) {
        setCurrentLine(currentFullLine.slice(0, charIndex + 1));
        charIndex++;
        
        // Typing speed variation
        let delay = Math.random() * 30 + 20; 
        if (['.', '[', ']'].includes(currentFullLine[charIndex - 1])) delay += 50;
        
        addTimeout(typeBoot, delay);
      } else {
        setTypedLines(prev => [...prev, currentFullLine]);
        setCurrentLine('');
        charIndex = 0;
        lineIndex++;
        addTimeout(typeBoot, 100);
      }
    };

    addTimeout(typeBoot, 800);

    return () => timeoutsRef.current.forEach(clearTimeout);
  }, []);

  // Name and Role Typing Effect
  useEffect(() => {
    if (!bootComplete) return;

    const name = "MOHANNAD FIRON";
    const baseRole = "Bug Bounty Hunter | Security Researcher | ";
    const highlightRole = "Penetration Tester";
    const fullRole = baseRole + highlightRole;
    
    let charIndex = 0;

    const typeName = () => {
      if (charIndex < name.length) {
        setNameText(name.slice(0, charIndex + 1));
        charIndex++;
        addTimeout(typeName, Math.random() * 50 + 50); 
      } else {
        charIndex = 0;
        addTimeout(typeRole, 500);
      }
    };

    const typeRole = () => {
        if (charIndex < fullRole.length) {
            setRoleText(fullRole.slice(0, charIndex + 1));
            charIndex++;
            addTimeout(typeRole, Math.random() * 30 + 20);
        } else {
            addTimeout(() => setShowButtons(true), 500);
        }
    }

    addTimeout(typeName, 200);

  }, [bootComplete]);

  return (
    <section className="w-full max-w-[960px] px-4 py-20 md:py-32 flex flex-col items-center justify-center min-h-[80vh]">
      <div className="relative w-full overflow-hidden rounded-lg border border-[#283928] bg-panel-dark p-1 shadow-2xl shadow-primary/5">
        <div className="flex items-center gap-2 bg-[#283928] px-4 py-2 text-xs text-[#9db99d]">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
          <span className="ml-2">bash — 80x24</span>
        </div>
        <div
          className="relative flex flex-col gap-8 items-center justify-center p-8 md:p-16 bg-cover bg-center min-h-[400px]"
          style={{
            backgroundImage: `linear-gradient(rgba(16, 34, 16, 0.9), rgba(16, 34, 16, 0.95)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuD5h7R60Hl0zpPn3hrEETSALt_chQLpeQEN7NiRZRk-Oq9Lq5Bu-IJynC4dlqOO1dbHN35yLYdGFEqbLXSg7KnkJKWcOSZ1tl2-DLapgeWB02fKeroMsJrLcxunxfanLhPRppXp2EBisfVeqFH5FDLFi494abcllhXk3_bADih9dOwoDUR0AVLs2IbAOvdVlbudWAq_qoQr9UMSO_q_U26a8EnKD93DvYBc99bTDkH06ZsxUGc3tK_SNN_ZJwB2tSIhibziVhlurA")`,
          }}
        >
          <div className="flex flex-col gap-4 text-center z-10 w-full max-w-3xl">
            {/* Terminal Boot Sequence */}
            <div className={`flex flex-col items-center justify-end font-mono text-sm tracking-widest transition-all duration-500 ${bootComplete ? 'mb-4' : 'mb-0 h-[120px]'}`}>
               {/* Render previous lines */}
               {typedLines.map((line, i) => (
                 <div key={i} className="text-[#567556] w-full text-center">
                   {line}
                 </div>
               ))}
               
               {/* Render current typing line during boot */}
               {!bootComplete && (
                 <div className="text-primary w-full text-center">
                   {currentLine}
                   <span className="animate-blink ml-1 inline-block w-2 h-4 bg-primary align-middle"></span>
                 </div>
               )}
               
               {/* Post-boot prompt - Optional, kept from previous version if desired, or removed for cleaner look. keeping it simple. */}
               {bootComplete && (
                 <div className="text-[#567556] w-full text-center opacity-50">
                   > SYSTEM READY
                 </div>
               )}
            </div>

            {/* Main Content */}
            <div 
              className={`flex flex-col gap-4 transition-all duration-1000 ease-out transform ${
                bootComplete
                  ? 'opacity-100 translate-y-0 max-h-[1000px]' 
                  : 'opacity-0 translate-y-4 max-h-0 overflow-hidden'
              }`}
            >
              <h1 className="text-white text-5xl md:text-7xl font-black leading-tight tracking-tighter drop-shadow-[0_0_10px_rgba(19,236,19,0.5)] min-h-[1.1em]">
                {nameText}
                {bootComplete && !nameText.includes('FIRON') && (
                     <span className="animate-blink ml-2 inline-block w-3 h-8 md:h-12 bg-primary align-middle"></span>
                )}
              </h1>
              
              <h2 className="text-[#9db99d] text-lg md:text-xl font-normal max-w-2xl mx-auto mt-4 min-h-[1.5em]">
                {/* Logic to colorize the last part if fully typed, otherwise just text */}
                {showButtons ? (
                    <>
                    Bug Bounty Hunter | Security Researcher | <span className="text-secondary">Penetration Tester</span>
                    </>
                ) : (
                    <>
                    {roleText}
                    {nameText.includes('FIRON') && !showButtons && (
                         <span className="animate-blink ml-1 inline-block w-2 h-5 bg-primary align-middle"></span>
                    )}
                    </>
                )}
              </h2>

              <div className={`flex flex-col sm:flex-row gap-4 z-10 mt-8 justify-center transition-opacity duration-1000 ${showButtons ? 'opacity-100' : 'opacity-0'}`}>
                <a
                  href="#work"
                  className="group relative flex items-center justify-center overflow-hidden rounded border border-primary bg-primary/10 px-8 py-3 transition-all hover:bg-primary hover:text-background-dark"
                >
                  <span className="relative text-primary text-sm font-bold tracking-wider group-hover:text-background-dark">
                    INITIATE SEQUENCE
                  </span>
                </a>
                <a
                  href="#connect"
                  className="group relative flex items-center justify-center overflow-hidden rounded border border-secondary bg-secondary/10 px-8 py-3 transition-all hover:bg-secondary hover:text-white"
                >
                  <span className="relative text-secondary text-sm font-bold tracking-wider group-hover:text-white">
                    EMERGENCY CONTACT
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;