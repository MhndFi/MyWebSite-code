import React from 'react';
import SectionHeader from './SectionHeader';
import { Project } from '../types';
import { Lock, EyeOff, AlertTriangle } from 'lucide-react';

const projectData: Project[] = [
  {
    id: 1,
    title: 'Net_Sec_Scanner',
    description: 'Automated vulnerability scanner for local networks. Built with Python and raw sockets.',
    tags: ['Python', 'CLI'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnq7tDtnUj7lPjhcJPLlF2W7gqucq7pXzMdCEv4xP5k9-oWL3BARDxwvZAfKJdwAf9TDWTzSNxYea18_wI9oxP8q4PPPDXDnjuXIWy0ClFVG3oBKMnyWHc-xjUfBBA8Tr7fG_cM9p_vhwk7vL2QdZNc7dW8yBWa8tbrcSOABLK4epHK-V3ueT4YHjTJpCtanGdNG3jcwFzT1_rdg8nWiiFQkiUJ6hNjAxjMZuXHxx0pE4M301cN5LWZE94jYPLzzXoqw61WmZ_nw',
    isPrivate: true,
  },
  {
    id: 2,
    title: 'Ghost_Protocol',
    description: 'A privacy-focused decentralized messaging app. End-to-end encryption by default.',
    tags: ['React', 'Web3'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzVCn_x2dyRzeJLThmiDTGHh29Jpk2V9Yi0mamiLnV0KQTL0exSMSGC6ei1jhGKlE__U7iXnbDoTWPLdeEErAJhAm28dyX_dsZYXOHQ5Grz2ncvWs6o1ktGw-gx8S8FuCehC9d4wlFFOF-5oGX8thxOyqwqDbtsNk9hgt0hK4QO1h55bDZ4RFxM4nBXm0Jt7pUl-soYhdq3REyt0NcDl6ROdANGEsaDIF-CutAXENDCjkSt9pfgUCOe32JcIx2XbeqWSFTnZuWAw',
  },
  {
    id: 3,
    title: 'Project_Chaos',
    description: 'Experimental AI agent for chaos engineering in distributed systems. Handle with care.',
    tags: ['AI/ML', 'Rust'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJmTzzv76X7pypRudg14Lz_VpP5iAyPUidlhCQM6nIrcz0Djl8-_r8w0EQx-zeIQgV2GE9XY0b7i-86ABwJ7z2DVQyewMXqqZ4xrD0np5gorn7kaxwOnhC5eewA5yH0uL2ZpGB0Hqn6zz65xWeIVxaqbPYdvXHpCQz9_dqyC0i36V4X_jlT6gaq2KFXLgM516WbaRKfQFB37a69Ih0-aTAwPODvs8SbdwH-cjRJ5lOdMFbISTRq8vwsAlrIax0Ch8Uo0uWI6WfLA',
    isWarning: true,
  },
];

const Projects: React.FC = () => {
  return (
    <section className="w-full max-w-[960px] px-4 py-12" id="work">
      <SectionHeader title="cd ./projects && ls -la" subtitle="Total files: 3" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectData.map((project) => (
          <div
            key={project.id}
            className={`group relative bg-panel-dark border border-[#283928] transition-all duration-300 rounded overflow-hidden flex flex-col h-full hover:scale-[1.02] ${
              project.isWarning 
                ? 'hover:border-secondary hover:shadow-[0_0_15px_rgba(255,51,51,0.4)]' 
                : 'hover:border-primary hover:shadow-[0_0_15px_rgba(19,236,19,0.4)]'
            }`}
          >
            <div
              className="h-40 w-full bg-cover bg-center border-b border-[#283928] grayscale group-hover:grayscale-0 transition-all duration-500 relative"
              style={{ backgroundImage: `url("${project.imageUrl}")` }}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors"></div>
              {project.isWarning && (
                <div className="absolute top-2 right-2 bg-secondary/20 border border-secondary text-secondary text-[10px] px-2 py-0.5 rounded font-bold uppercase">
                  Classified
                </div>
              )}
            </div>

            <div className="p-5 flex flex-col flex-1">
              <div className="flex justify-between items-center mb-3">
                <h3
                  className={`text-white text-lg font-bold ${
                    project.isWarning ? 'group-hover:text-secondary' : 'group-hover:text-primary'
                  } transition-colors`}
                >
                  {project.title}
                </h3>
                <div
                   className={`text-[#9db99d] text-sm ${
                    project.isWarning ? 'group-hover:text-secondary' : 'group-hover:text-primary'
                  }`}
                >
                    {project.isPrivate && <Lock className="w-4 h-4"/>}
                    {project.id === 2 && <EyeOff className="w-4 h-4"/>}
                    {project.isWarning && <AlertTriangle className="w-4 h-4"/>}
                </div>
              </div>
              <p className="text-[#9db99d] text-sm mb-4 flex-1">
                {project.description}
              </p>
              <div className="flex gap-2 mt-auto">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-2 py-1 ${
                      project.isWarning
                        ? 'bg-[#2c1c1c] text-secondary border-secondary/30'
                        : 'bg-[#1c2c1c] text-primary border-[#283928]'
                    } text-xs font-mono rounded border`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;