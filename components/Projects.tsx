import React, { useState, useEffect } from 'react';
import SectionHeader from './SectionHeader';
import { Project } from '../types';
import { Terminal, Copy, Check, Github, Plus, X, Trash2, AlertTriangle } from 'lucide-react';
import { safeUrl, safeImageSrc, validateImageFile, safeText } from '../utils/safe';

import mfLogo from '../images/mf-logo.svg';

const defaultProjects: Project[] = [
  {
    id: 1,
    title: 'MyTools.v2',
    description:
      'An advanced reconnaissance framework for bug bounty hunting. Automates asset discovery, port scanning, and vulnerability detection using a distributed architecture.',
    tags: ['Python', 'Docker', 'Automation', 'OSINT'],
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDnq7tDtnUj7lPjhcJPLlF2W7gqucq7pXzMdCEv4xP5k9-oWL3BARDxwvZAfKJdwAf9TDWTzSNxYea18_wI9oxP8q4PPPDXDnjuXIWy0ClFVG3oBKMnyWHc-xjUfBBA8Tr7fG_cM9p_vhwk7vL2QdZNc7dW8yBWa8tbrcSOABLK4epHK-V3ueT4YHjTJpCtanGdNG3jcwFzT1_rdg8nWiiFQkiUJ6hNjAxjMZuXHxx0pE4M301cN5LWZE94jYPLzzXoqw61WmZ_nw',
    repoUrl: 'https://github.com/MhndFi/MyTools',
  },
  {
    id: 2,
    title: 'PortSwigger Labs',
    description:
      'A centralized repository for custom exploitation scripts and payloads developed while mastering PortSwigger Web Security Academy. Features Python-based automation for complex vulnerability chains and solving advanced labs.',
    tags: ['Python', 'Web Sec', 'Exploitation', 'Scripting'],
    imageUrl:
      'https://raw.githubusercontent.com/MhndFi/MyWebSite-code/main/images/portswigger-labs.png',
    repoUrl: 'https://github.com/MhndFi/portswigger.net-web-security',
  },
];

const STORAGE_KEY = 'mhndfi_projects';

const sanitizeProject = (raw: unknown): Project | null => {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Record<string, unknown>;
  const id = typeof r.id === 'number' ? r.id : Number(r.id);
  const title = safeText(r.title as string, 120);
  const description = safeText(r.description as string, 2000);
  const repoUrl = safeUrl(r.repoUrl as string);
  if (!Number.isFinite(id) || !title || !description || !repoUrl) return null;
  const tagsRaw = Array.isArray(r.tags) ? r.tags : [];
  const tags = tagsRaw
    .filter((t): t is string => typeof t === 'string')
    .map((t) => safeText(t, 30))
    .filter(Boolean)
    .slice(0, 12);
  const imageUrl = safeImageSrc(r.imageUrl as string) || mfLogo;
  return { id, title, description, tags, repoUrl, imageUrl };
};

const loadProjects = (): Project[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        const userProjects = parsed.map(sanitizeProject).filter((p): p is Project => p !== null);
        const defaultIds = new Set(defaultProjects.map((p) => p.id));
        const userAdded = userProjects.filter((p) => !defaultIds.has(p.id));
        return [...defaultProjects, ...userAdded];
      }
    }
  } catch {
    /* fall through */
  }
  return defaultProjects;
};

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(loadProjects);
  const [copied, setCopied] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    imageUrl: '',
    repoUrl: '',
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch {
      /* silent */
    }
  }, [projects]);

  const handleCopy = async (url: string, id: number) => {
    const safe = safeUrl(url);
    if (!safe) return;
    const command = `git clone ${safe}.git`;
    try {
      await navigator.clipboard.writeText(command);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      /* clipboard blocked */
    }
  };

  const handleAddClick = () => {
    setFormError(null);
    setShowAddForm(true);
  };

  const handleDeleteClick = (id: number) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const repoUrl = safeUrl(formData.repoUrl);
    if (!repoUrl) {
      setFormError('Repository URL must be a valid http(s) link.');
      return;
    }
    const imageUrl = safeImageSrc(formData.imageUrl) || mfLogo;
    const title = safeText(formData.title, 120);
    const description = safeText(formData.description, 2000);
    if (!title || !description) {
      setFormError('Title and description are required.');
      return;
    }

    const newProject: Project = {
      id: Date.now(),
      title,
      description,
      tags: formData.tags
        .split(',')
        .map((t) => safeText(t, 30))
        .filter(Boolean)
        .slice(0, 12),
      imageUrl,
      repoUrl,
    };
    setProjects((prev) => [newProject, ...prev]);
    setFormData({ title: '', description: '', tags: '', imageUrl: '', repoUrl: '' });
    setShowAddForm(false);
  };

  const handleImageFile = (file: File) => {
    setFormError(null);
    const error = validateImageFile(file, { maxBytes: 1.5 * 1024 * 1024 });
    if (error) {
      setFormError(error);
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => setFormError('Failed to read image.');
    reader.onload = () => {
      const value = typeof reader.result === 'string' ? reader.result : '';
      setFormData((p) => ({ ...p, imageUrl: value }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="w-full py-8" id="work">
      <div className="flex items-center justify-between mb-0">
        <div className="flex-1">
          <SectionHeader title="./ls -F ./assets/src/" subtitle="Scanning directory for projects" />
        </div>
        <button
          onClick={handleAddClick}
          className="flex items-center gap-2 px-4 py-2 bg-primary-soft border border-primary/40 text-primary text-xs font-mono rounded-md hover:bg-primary hover:text-white transition-all mb-10"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">ADD_ASSET</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {projects.map((project) => {
          const safeRepo = safeUrl(project.repoUrl);
          const safeImg = safeImageSrc(project.imageUrl) || mfLogo;
          return (
            <article
              key={project.id}
              className="group relative bg-surface border border-border-soft hover:border-primary/50 hover:shadow-soft-lg shadow-soft transition-all duration-300 rounded-lg overflow-hidden flex flex-col lg:flex-row"
            >
              <div className="h-48 lg:h-auto lg:w-2/5 bg-titlebar bg-cover bg-center border-b lg:border-b-0 lg:border-r border-border-soft transition-all duration-500 relative overflow-hidden">
                <img
                  src={safeImg}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = mfLogo;
                  }}
                />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-ink font-bold text-lg font-display">{project.title}</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-primary-soft text-primary-strong border border-primary/20 text-[10px] font-mono rounded transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  {safeRepo && (
                    <a
                      href={safeRepo}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      aria-label={`Open ${project.title} on GitHub`}
                      className="p-2 text-ink-muted hover:text-primary transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                </div>

                <p className="text-ink-muted text-sm mb-6 leading-relaxed font-body flex-grow">
                  {project.description}
                </p>

                <div className="mt-auto bg-background-dark border border-border-soft rounded-md px-4 py-3 flex items-center justify-between gap-4 group-hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <Terminal className="w-4 h-4 text-primary/60 shrink-0" />
                    <code className="text-xs font-mono text-ink-muted truncate">
                      $ git clone {safeRepo}.git
                    </code>
                  </div>
                  <button
                    onClick={() => handleCopy(project.repoUrl, project.id)}
                    className="p-1 text-ink-muted hover:text-primary transition-colors shrink-0"
                    aria-label="Copy git clone command"
                  >
                    {copied === project.id ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                onClick={() => handleDeleteClick(project.id)}
                className="absolute top-2 right-2 p-1.5 rounded-md bg-white/90 text-ink-muted hover:text-secondary hover:bg-white border border-border-soft hover:border-secondary/40 shadow-soft transition-all opacity-0 group-hover:opacity-100 z-10"
                aria-label="Delete asset"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </article>
          );
        })}
      </div>

      {showAddForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setShowAddForm(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Add project"
        >
          <div className="absolute inset-0 bg-ink/30 backdrop-blur-sm" />
          <div
            className="relative bg-surface border border-border-soft rounded-lg w-full max-w-lg overflow-hidden shadow-soft-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between bg-titlebar border-b border-border-soft px-4 py-3">
              <div className="flex items-center gap-2 text-primary text-sm font-mono">
                <Github className="w-4 h-4" />
                <span>New Asset</span>
              </div>
              <button onClick={() => setShowAddForm(false)} className="text-ink-muted hover:text-ink transition-colors" aria-label="Close">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
              <input
                type="text"
                placeholder="Project Title"
                value={formData.title}
                onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                required
                maxLength={120}
                className="bg-white border border-border-soft text-ink font-mono text-sm px-4 py-2.5 rounded-md focus:outline-none focus:border-primary focus:shadow-ring-primary transition-all placeholder:text-ink-dim"
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                required
                maxLength={2000}
                rows={3}
                className="bg-white border border-border-soft text-ink font-mono text-sm px-4 py-2.5 rounded-md focus:outline-none focus:border-primary focus:shadow-ring-primary transition-all placeholder:text-ink-dim resize-none"
              />
              <input
                type="text"
                placeholder="Tags (comma separated)"
                value={formData.tags}
                onChange={(e) => setFormData((p) => ({ ...p, tags: e.target.value }))}
                maxLength={200}
                className="bg-white border border-border-soft text-ink font-mono text-sm px-4 py-2.5 rounded-md focus:outline-none focus:border-primary focus:shadow-ring-primary transition-all placeholder:text-ink-dim"
              />
              <input
                type="url"
                placeholder="Image URL (https://…)"
                value={formData.imageUrl}
                onChange={(e) => setFormData((p) => ({ ...p, imageUrl: e.target.value }))}
                className="bg-white border border-border-soft text-ink font-mono text-sm px-4 py-2.5 rounded-md focus:outline-none focus:border-primary focus:shadow-ring-primary transition-all placeholder:text-ink-dim"
              />
              <label className="bg-primary-soft/50 border border-dashed border-primary/40 text-primary font-mono text-xs px-4 py-3 rounded-md cursor-pointer hover:border-primary hover:bg-primary-soft transition-colors">
                Upload image from your device
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    e.target.value = '';
                    if (!file) return;
                    handleImageFile(file);
                  }}
                />
              </label>
              <input
                type="url"
                placeholder="Repository URL (https://github.com/…)"
                value={formData.repoUrl}
                onChange={(e) => setFormData((p) => ({ ...p, repoUrl: e.target.value }))}
                required
                className="bg-white border border-border-soft text-ink font-mono text-sm px-4 py-2.5 rounded-md focus:outline-none focus:border-primary focus:shadow-ring-primary transition-all placeholder:text-ink-dim"
              />

              {formError && (
                <div role="alert" className="flex items-center gap-2 text-xs text-secondary bg-secondary/5 border border-secondary/30 rounded-md px-3 py-2">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-primary-soft border border-primary/40 text-primary text-xs font-mono font-bold tracking-widest rounded-md hover:bg-primary hover:text-white transition-all mt-2"
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
