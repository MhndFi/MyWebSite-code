import React, { useEffect, useState } from 'react';
import { Fingerprint } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { Skill } from '../types';

const skills: Skill[] = [
  { name: 'Web Application Security', level: 98, color: 'primary' },
  { name: 'Reconnaissance Automation', level: 95, color: 'primary' },
  { name: 'Python / Bash Scripting', level: 90, color: 'primary' },
  { name: 'Exploit Development', level: 85, color: 'secondary', warning: true },
];

const About: React.FC = () => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    setAnimated(true);
  }, []);

  return (
    <section className="w-full max-w-[960px] px-4 py-12" id="about">
      <SectionHeader title="run about_me.exe" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Bio Text */}
        <div className="flex flex-col gap-6">
           {/* Placeholder Avatar */}
           <div className="flex justify-center md:justify-start">
              <div className="relative group">
                <div className="absolute inset-0 bg-primary rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                <img 
                  src="https://ui-avatars.com/api/?name=Mohannad+Firon&background=0a0f0a&color=13ec13&size=200&bold=true" 
                  alt="Mohannad Firon" 
                  className="w-32 h-32 rounded-full border-2 border-[#283928] group-hover:border-primary grayscale group-hover:grayscale-0 transition-all duration-500 relative z-10"
                />
              </div>
           </div>

          <div className="bg-panel-dark border border-[#283928] p-8 rounded-lg relative group hover:border-primary/50 transition-colors">
            <div className="absolute top-0 right-0 p-3 opacity-50 group-hover:opacity-100 transition-opacity">
              <Fingerprint className="text-primary w-6 h-6" />
            </div>
            <p className="text-secondary-light text-lg leading-relaxed mb-6">
              <span className="text-primary font-mono text-lg font-bold tracking-wide block mb-4">
                [INFO] Accessing user bio...
              </span>
              Based in Jerusalem. Specializing in web application security, vulnerability assessment, and bug bounty hunting on HackerOne and Bugcrowd.
            </p>
            <p className="text-secondary-light text-lg leading-relaxed">
              Obsessed with reconnaissance tools, exploitation techniques, and uncovering the hidden vectors that others miss. Always hunting for that critical vulnerability.
            </p>
          </div>
          {/* Stats / Status */}
          <div className="flex gap-4 mt-2">
            <div className="bg-panel-dark border border-[#283928] p-4 rounded flex-1 text-center group hover:border-secondary/50 transition-colors">
              <h3 className="text-secondary text-2xl font-bold group-hover:scale-110 transition-transform duration-300">98%</h3>
              <p className="text-xs text-secondary-light uppercase tracking-wider">
                Coffee Level
              </p>
            </div>
            <div className="bg-panel-dark border border-[#283928] p-4 rounded flex-1 text-center group hover:border-primary/50 transition-colors">
              <h3 className="text-primary text-2xl font-bold group-hover:scale-110 transition-transform duration-300">404</h3>
              <p className="text-xs text-secondary-light uppercase tracking-wider">
                Sleep Not Found
              </p>
            </div>
          </div>
        </div>

        {/* Skills Progress */}
        <div className="flex flex-col gap-6 bg-panel-dark/50 p-6 rounded border border-[#283928]">
          <h3 className="text-white text-sm font-bold uppercase tracking-widest border-b border-[#283928] pb-2 mb-2">
            System Resources
          </h3>
          {skills.map((skill) => (
            <div key={skill.name} className="flex flex-col gap-2">
              <div className="flex justify-between items-end">
                <span className="text-white text-sm font-medium font-mono">
                  {skill.name}
                </span>
                <span
                  className={`${
                    skill.color === 'secondary' ? 'text-secondary' : 'text-primary'
                  } text-xs font-mono`}
                >
                  {skill.level}% {skill.warning && '[WARNING: High Usage]'}
                </span>
              </div>
              <div className="h-2 w-full bg-[#1c2c1c] rounded overflow-hidden">
                <div
                  className={`h-full ${
                    skill.color === 'secondary' ? 'bg-secondary shadow-[0_0_10px_#ff3333]' : 'bg-primary shadow-[0_0_10px_#13ec13]'
                  } transition-all duration-1000 ease-out`}
                  style={{ width: animated ? `${skill.level}%` : '0%' }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;