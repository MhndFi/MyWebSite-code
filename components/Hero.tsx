import React from 'react';

const Hero: React.FC = () => {
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
          className="relative flex flex-col gap-8 items-center justify-center p-8 md:p-16 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(16, 34, 16, 0.9), rgba(16, 34, 16, 0.95)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuD5h7R60Hl0zpPn3hrEETSALt_chQLpeQEN7NiRZRk-Oq9Lq5Bu-IJynC4dlqOO1dbHN35yLYdGFEqbLXSg7KnkJKWcOSZ1tl2-DLapgeWB02fKeroMsJrLcxunxfanLhPRppXp2EBisfVeqFH5FDLFi494abcllhXk3_bADih9dOwoDUR0AVLs2IbAOvdVlbudWAq_qoQr9UMSO_q_U26a8EnKD93DvYBc99bTDkH06ZsxUGc3tK_SNN_ZJwB2tSIhibziVhlurA")`,
          }}
        >
          <div className="flex flex-col gap-4 text-center z-10">
            <p className="text-primary text-sm tracking-widest font-mono mb-2 blinking-cursor">
              &gt; INITIALIZING UPLINK...
            </p>
            <h1 className="text-white text-5xl md:text-7xl font-black leading-tight tracking-tighter drop-shadow-[0_0_10px_rgba(19,236,19,0.5)]">
              SYSTEM ONLINE
            </h1>
            <h2 className="text-[#9db99d] text-lg md:text-xl font-normal max-w-2xl mx-auto mt-4">
              Full Stack Developer | Security Researcher |{' '}
              <span className="text-secondary">Cyberpunk Enthusiast</span>
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 z-10 mt-6">
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
    </section>
  );
};

export default Hero;