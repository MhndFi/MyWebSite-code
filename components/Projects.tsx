import React, { useState, useEffect } from 'react';
import SectionHeader from './SectionHeader';
import PasswordModal from './PasswordModal';
import { Project } from '../types';
import { Terminal, Copy, Check, Github, Plus, X, Trash2 } from 'lucide-react';

const defaultProjects: Project[] = [
  {
    id: 1,
    title: 'MyTools.v2',
    description: 'An advanced reconnaissance framework for bug bounty hunting. Automates asset discovery, port scanning, and vulnerability detection using a distributed architecture.',
    tags: ['Python', 'Docker', 'Automation', 'OSINT'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnq7tDtnUj7lPjhcJPLlF2W7gqucq7pXzMdCEv4xP5k9-oWL3BARDxwvZAfKJdwAf9TDWTzSNxYea18_wI9oxP8q4PPPDXDnjuXIWy0ClFVG3oBKMnyWHc-xjUfBBA8Tr7fG_cM9p_vhwk7vL2QdZNc7dW8yBWa8tbrcSOABLK4epHK-V3ueT4YHjTJpCtanGdNG3jcwFzT1_rdg8nWiiFQkiUJ6hNjAxjMZuXHxx0pE4M301cN5LWZE94jYPLzzXoqw61WmZ_nw',
    repoUrl: 'https://github.com/MhndFi/MyTools'
  },
  {
    id: 2,
    title: 'PortSwigger Labs',
    description: 'A centralized repository for custom exploitation scripts and payloads developed while mastering PortSwigger Web Security Academy. Features Python-based automation for complex vulnerability chains and solving advanced labs.',
    tags: ['Python', 'Web Sec', 'Exploitation', 'Scripting'],
    imageUrl: 'https://portswigger.net/content/images/logos/web-security-academy-logo-small.svg',
    repoUrl: 'https://github.com/MhndFi/portswigger.net-web-security'
  }
];

const STORAGE_KEY = 'mhndfi_projects';

const loadProjects = (): Project[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return defaultProjects;
};

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(loadProjects);
  const [copied, setCopied] = useState<number | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [deletePasswordModal, setDeletePasswordModal] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: '', description: '', tags: '', imageUrl: '', repoUrl: ''
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  const handleCopy = (url: string, id: number) => {
    const command = `git clone ${url}.git`;
    navigator.clipboard.writeText(command);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleAddClick = () => {
    setShowPasswordModal(true);
  };

  const handlePasswordSuccess = () => {
    setShowPasswordModal(false);
    setShowAddForm(true);
  };

  const handleDeleteClick = (id: number) => {
    setPendingDeleteId(id);
    setDeletePasswordModal(true);
  };

  const handleDeletePasswordSuccess = () => {
    setDeletePasswordModal(false);
    if (pendingDeleteId !== null) {
      setProjects(prev => prev.filter(p => p.id !== pendingDeleteId));
      setPendingDeleteId(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject: Project = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      imageUrl: formData.imageUrl,
      repoUrl: formData.repoUrl
    };
    setProjects(prev => [newProject, ...prev]);
    setFormData({ title: '', description: '', tags: '', imageUrl: '', repoUrl: '' });
    setShowAddForm(false);
  };

  return (
    <section className="w-full py-8" id="work">
      <div className="flex items-center justify-between mb-0">
        <div className="flex-1">
          <SectionHeader title="./ls -F ./assets/src/" subtitle="Scanning directory for projects" />
        </div>
        <button
          onClick={handleAddClick}
          className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 text-primary text-xs font-mono rounded hover:bg-primary hover:text-background-dark transition-all mb-10"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">ADD_ASSET</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group relative bg-[#0d130d] border border-[#283928] hover:border-primary/40 transition-all duration-300 rounded-lg overflow-hidden flex flex-col lg:flex-row"
          >
            {/* Image */}
            <div className="h-48 lg:h-auto lg:w-2/5 bg-cover bg-center border-b lg:border-b-0 lg:border-r border-[#283928] grayscale group-hover:grayscale-0 transition-all duration-500 bg-white/5 relative overflow-hidden">
              <img
                src={project.imageUrl}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-primary font-bold text-lg">{project.title}</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-black/40 text-[#567556] border border-[#283928] text-[10px] font-mono rounded group-hover:text-primary group-hover:border-primary/20 transition-colors"
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
                  className="p-2 text-[#567556] hover:text-primary transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>

              <p className="text-secondary-light/70 text-sm mb-6 leading-relaxed font-mono flex-grow">
                {project.description}
              </p>

              {/* Git Clone */}
              <div className="mt-auto bg-black/40 border border-[#283928] rounded px-4 py-3 flex items-center justify-between gap-4 group-hover:border-primary/20 transition-colors">
                <div className="flex items-center gap-3 overflow-hidden">
                  <Terminal className="w-4 h-4 text-primary/50 shrink-0" />
                  <code className="text-xs font-mono text-[#567556] truncate">
                    $ git clone {project.repoUrl}.git
                  </code>
                </div>
                <button
                  onClick={() => handleCopy(project.repoUrl, project.id)}
                  className="p-1 text-[#567556] hover:text-primary transition-colors shrink-0"
                  title="Copy"
                >
                  {copied === project.id ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Delete button */}
            <button
              onClick={() => handleDeleteClick(project.id)}
              className="absolute top-2 right-2 p-1.5 rounded bg-black/60 text-[#567556] hover:text-secondary hover:bg-black/80 border border-transparent hover:border-secondary/30 transition-all opacity-0 group-hover:opacity-100 z-10"
              title="Delete asset"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>

      {/* Password Modal */}
      <PasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onSuccess={handlePasswordSuccess}
      />

      {/* Delete Password Modal */}
      <PasswordModal
        isOpen={deletePasswordModal}
        onClose={() => { setDeletePasswordModal(false); setPendingDeleteId(null); }}
        onSuccess={handleDeletePasswordSuccess}
      />

      {/* Add Asset Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowAddForm(false)}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div
            className="relative bg-[#0d130d] border border-[#283928] rounded-lg w-full max-w-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between bg-[#1a251a] border-b border-[#283928] px-4 py-3">
              <div className="flex items-center gap-2 text-primary text-sm font-mono">
                <Github className="w-4 h-4" />
                <span>New Asset</span>
              </div>
              <button onClick={() => setShowAddForm(false)} className="text-[#567556] hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
              <input
                type="text"
                placeholder="Project Title"
                value={formData.title}
                onChange={(e) => setFormData(p => ({ ...p, title: e.target.value }))}
                required
                className="bg-black/60 border border-[#283928] text-white font-mono text-sm px-4 py-2.5 rounded focus:outline-none focus:border-primary transition-colors placeholder:text-[#567556]/50"
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))}
                required
                rows={3}
                className="bg-black/60 border border-[#283928] text-white font-mono text-sm px-4 py-2.5 rounded focus:outline-none focus:border-primary transition-colors placeholder:text-[#567556]/50 resize-none"
              />
              <input
                type="text"
                placeholder="Tags (comma separated)"
                value={formData.tags}
                onChange={(e) => setFormData(p => ({ ...p, tags: e.target.value }))}
                className="bg-black/60 border border-[#283928] text-white font-mono text-sm px-4 py-2.5 rounded focus:outline-none focus:border-primary transition-colors placeholder:text-[#567556]/50"
              />
              <input
                type="url"
                placeholder="Image URL (https://...)"
                value={formData.imageUrl}
                onChange={(e) => setFormData(p => ({ ...p, imageUrl: e.target.value }))}
                className="bg-black/60 border border-[#283928] text-white font-mono text-sm px-4 py-2.5 rounded focus:outline-none focus:border-primary transition-colors placeholder:text-[#567556]/50"
              />
              <input
                type="url"
                placeholder="Repository URL (https://github.com/...)"
                value={formData.repoUrl}
                onChange={(e) => setFormData(p => ({ ...p, repoUrl: e.target.value }))}
                required
                className="bg-black/60 border border-[#283928] text-white font-mono text-sm px-4 py-2.5 rounded focus:outline-none focus:border-primary transition-colors placeholder:text-[#567556]/50"
              />
              <button
                type="submit"
                className="w-full py-3 bg-primary/10 border border-primary/40 text-primary text-xs font-mono font-bold tracking-widest rounded hover:bg-primary hover:text-background-dark transition-all mt-2"
              >
                DEPLOY_ASSET
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
