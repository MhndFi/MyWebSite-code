import React from 'react';
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
  return (
    <section className="w-full max-w-[960px] px-4 py-12" id="about">
      <SectionHeader title="run about_me.exe" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Bio Text */}
        <div className="flex flex-col gap-4">
          <div className="bg-panel-dark border border-[#283928] p-6 rounded relative group hover:border-primary/50 transition-colors">
            <div className="absolute top-0 right-0 p-2 opacity-50 group-hover:opacity-100 transition-opacity">
              <Fingerprint className="text-primary w-5 h-5" />
            </div>
            <p className="text-[#d1d5d1] text-base leading-relaxed mb-4">
              <span className="text-primary font-mono text-sm block mb-2">
                [INFO] Accessing user bio...
              </span>
              Based in Jerusalem. Specializing in web application security, vulnerability assessment, and bug bounty hunting on HackerOne and Bugcrowd.
            </p>
            <p className="text-[#d1d5d1] text-base leading-relaxed">
              Obsessed with reconnaissance tools, exploitation techniques, and uncovering the hidden vectors that others miss. Always hunting for that critical vulnerability.
            </p>
          </div>
          {/* Stats / Status */}
          <div className="flex gap-4 mt-2">
            <div className="bg-panel-dark border border-[#283928] p-4 rounded flex-1 text-center">
              <h3 className="text-secondary text-2xl font-bold">98%</h3>
              <p className="text-xs text-[#9db99d] uppercase tracking-wider">
                Coffee Level
              </p>
            </div>
            <div className="bg-panel-dark border border-[#283928] p-4 rounded flex-1 text-center">
              <h3 className="text-primary text-2xl font-bold">404</h3>
              <p className="text-xs text-[#9db99d] uppercase tracking-wider">
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
                  }`}
                  style={{ width: `${skill.level}%` }}
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