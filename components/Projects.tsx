import React, { useState } from 'react';
import SectionHeader from './SectionHeader';
import { Project } from '../types';
import { Terminal, Copy, Check, Github } from 'lucide-react';

const projectData: Project[] = [
  {
    id: 1,
    title: 'MyTools',
    description: 'A personal arsenal of security scripts, reconnaissance automation tools, and proof-of-concept exploits developed for bug bounty hunting and penetration testing operations.',
    tags: ['Python', 'Bash', 'Automation', 'Security'],
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
    <section className="w-full max-w-[960px] px-4 py-12" id="work">
      <SectionHeader title="cd ./projects && ls -la" subtitle="Total files: 1" />
      
      <div className="grid grid-cols-1 gap-6">
        {projectData.map((project) => (
          <div
            key={project.id}
            className="group relative bg-panel-dark border border-[#283928] hover:border-primary hover:shadow-[0_0_15px_rgba(19,236,19,0.2)] transition-all duration-300 rounded overflow-hidden flex flex-col md:flex-row"
          >
            {/* Image Section */}
            <div
              className="h-48 md:h-auto md:w-1/3 bg-cover bg-center border-b md:border-b-0 md:border-r border-[#283928] grayscale group-hover:grayscale-0 transition-all duration-500 relative"
              style={{ backgroundImage: `url("${project.imageUrl}")` }}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors"></div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-white text-xl font-bold group-hover:text-primary transition-colors mb-1">
                    {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-2 py-0.5 bg-[#1c2c1c] text-primary border border-[#283928] text-xs font-mono rounded"
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
                    className="text-[#9db99d] hover:text-white transition-colors"
                >
                    <Github className="w-6 h-6" />
                </a>
              </div>
              
              <p className="text-[#9db99d] text-sm mb-6 leading-relaxed">
                {project.description}
              </p>

              {/* Git Clone Command Box */}
              <div className="mt-auto bg-black/50 border border-[#283928] rounded p-3 flex items-center justify-between gap-4 group-hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-3 overflow-hidden">
                    <Terminal className="w-4 h-4 text-secondary shrink-0" />
                    <code className="text-sm font-mono text-[#d1d5d1] truncate">
                        git clone {project.repoUrl}.git
                    </code>
                </div>
                <button
                    onClick={() => handleCopy(project.repoUrl)}
                    className="text-[#9db99d] hover:text-primary transition-colors focus:outline-none"
                    title="Copy to clipboard"
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