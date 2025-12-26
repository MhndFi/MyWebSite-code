import React, { useState } from 'react';
import SectionHeader from './SectionHeader';
import { Project } from '../types';
import { Terminal, Copy, Check, Github, ArrowUpRight } from 'lucide-react';

const projectData: Project[] = [
  {
    id: 1,
    title: 'MyTools.v2',
    description: 'An advanced reconnaissance framework for bug bounty hunting. Automates asset discovery, port scanning, and vulnerability detection using a distributed architecture.',
    tags: ['Python', 'Docker', 'Automation', 'OSINT'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnq7tDtnUj7lPjhcJPLlF2W7gqucq7pXzMdCEv4xP5k9-oWL3BARDxwvZAfKJdwAf9TDWTzSNxYea18_wI9oxP8q4PPPDXDnjuXIWy0ClFVG3oBKMnyWHc-xjUfBBA8Tr7fG_cM9p_vhwk7vL2QdZNc7dW8yBWa8tbrcSOABLK4epHK-V3ueT4YHjTJpCtanGdNG3jcwFzT1_rdg8nWiiFQkiUJ6hNjAxjMZuXHxx0pE4M301cN5LWZE94jYPLzzXoqw61WmZ_nw',
    repoUrl: 'https://github.com/MhndFi/MyTools'
  }
];

const Projects: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (url: string) => {
    const command = `git clone ${url}.git`;
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full py-4" id="work">
      <SectionHeader title="./ls -F ./assets/src/" subtitle="Scanning directory for projects" />
      
      <div className="grid grid-cols-1 gap-8">
        {projectData.map((project) => (
          <div
            key={project.id}
            className="group relative bg-[#1a251a]/20 border border-[#283928] hover:border-primary/50 transition-all rounded overflow-hidden flex flex-col lg:flex-row"
          >
            {/* Visual Section */}
            <div
              className="h-56 lg:h-auto lg:w-2/5 bg-cover bg-center border-b lg:border-b-0 lg:border-r border-[#283928] grayscale group-hover:grayscale-0 transition-all duration-700"
              style={{ backgroundImage: `url("${project.imageUrl}")` }}
            >
              <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-all"></div>
            </div>

            {/* Terminal Output Section */}
            <div className="p-6 md:p-8 flex flex-col flex-1 bg-black/20">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-primary font-bold text-lg">{project.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#567556] group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-[#1c2c1c] text-primary/80 border border-[#283928] text-[10px] font-mono rounded group-hover:border-primary/30 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <a 
                  href={project.repoUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-[#283928]/30 rounded-full text-[#567556] hover:text-white hover:bg-primary transition-all duration-300"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
              
              <p className="text-secondary-light/80 text-sm mb-8 leading-relaxed font-mono">
                {project.description}
              </p>

              {/* Execution Command */}
              <div className="mt-auto bg-black/60 border border-[#283928] rounded p-4 flex items-center justify-between gap-4 group-hover:border-primary/40 transition-colors">
                <div className="flex items-center gap-3 overflow-hidden">
                    <Terminal className="w-4 h-4 text-secondary shrink-0" />
                    <code className="text-xs font-mono text-secondary-light truncate">
                        $ git clone {project.repoUrl}.git
                    </code>
                </div>
                <button
                    onClick={() => handleCopy(project.repoUrl)}
                    className="p-1 text-[#567556] hover:text-primary transition-colors focus:outline-none shrink-0"
                    title="Copy Git Clone Command"
                >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;