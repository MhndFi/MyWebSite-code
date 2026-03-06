import React, { useState, useEffect } from 'react';
import SectionHeader from './SectionHeader';
import { Writeup } from '../types';
import { FileText, ExternalLink, Calendar, Hash, Plus, X, User, Sparkles } from 'lucide-react';

const defaultWriteups: Writeup[] = [
  {
    id: '2',
    username: 'mhndfi',
    title: 'How I Found 4 Vulnerabilities in 3 Days — Beginner Journey',
    date: 'Mar 1, 2026',
    platform: 'Bug Bounty',
    description: 'I submitted 4 reports in my first real bug bounty hunt. The result? 2 Informative, 1 Duplicate, and 0 bounties. But the lessons were worth more than money. Full methodology, tools, and honest results.',
    url: 'https://mhndfi.medium.com/how-i-found-4-vulnerabilities-in-3-days-beginner-journey-dcc84ecee094',
    tags: ['Bug Bounty', 'SSRF', 'XSS', 'CORS']
  },
  {
    id: '1',
    username: 'mhndfi',
    title: 'Napping -THM',
    date: 'Oct 18, 2025',
    platform: 'TryHackMe',
    description: 'This article is a TryHackMe "Napping" room write-up where the author learns red teaming by compromising a web app, phishing the admin via Reverse Tab Nabbing to steal SSH credentials, abusing a group-writable query.py to get a shell as another user, and finally using passwordless sudo vim (from GTFOBins) to pop a root shell and capture both user and root flags.',
    url: 'https://medium.com/@mhndfi/napping-thm-e7fca6d22d8a',
    tags: ['Red Teaming', 'PrivEsc', 'GTFOBins']
  }
];

const STORAGE_KEY = 'mhndfi_writeups';

const loadWriteups = (): Writeup[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed: Array<Writeup | (Omit<Writeup, 'username'> & { username?: string })> = JSON.parse(stored);
      const userWriteups: Writeup[] = parsed.map((item) => ({ ...item, username: item.username?.trim() || 'anonymous' }));
      // Merge: keep all defaults + any user-added writeups not in defaults
      const defaultIds = new Set(defaultWriteups.map(w => w.id));
      const userAdded = userWriteups.filter(w => !defaultIds.has(w.id));
      return [...userAdded, ...defaultWriteups];
    }
  } catch {}
  return defaultWriteups;
};

const Writeups: React.FC = () => {
  const [writeups, setWriteups] = useState<Writeup[]>(loadWriteups);
    const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    username: '', title: '', date: '', platform: '', description: '', url: '', tags: ''
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(writeups));
  }, [writeups]);

  const handleAddClick = () => {
    setShowAddForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newWriteup: Writeup = {
      id: Date.now().toString(),
      username: formData.username,
      title: formData.title,
      date: formData.date,
      platform: formData.platform,
      description: formData.description,
      url: formData.url,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
    };
    setWriteups(prev => [newWriteup, ...prev]);
    setFormData({ username: '', title: '', date: '', platform: '', description: '', url: '', tags: '' });
    setShowAddForm(false);
  };

  return (
    <section className="w-full py-8" id="writeups">
      <div className="flex items-center justify-between mb-0">
        <div className="flex-1">
          <SectionHeader title="./read_writeups.sh" subtitle={`Files found: ${writeups.length}`} />
        </div>
        <button
          onClick={handleAddClick}
          className="flex items-center gap-2 px-4 py-2 bg-primary/15 border border-primary/40 text-primary text-xs font-mono rounded-md hover:bg-primary hover:text-background-dark transition-all mb-10 shadow-[0_0_20px_rgba(19,236,19,0.12)]"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">ADD_WRITEUP</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {writeups.map((writeup) => (
          <div key={writeup.id} className="group relative">
            <a
              href={writeup.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-[#0d130d] via-[#101810] to-[#0b140b] border border-[#283928] p-6 rounded-xl hover:border-primary/60 transition-all duration-300 flex flex-col h-full shadow-[0_0_24px_rgba(19,236,19,0.08)] hover:shadow-[0_0_30px_rgba(19,236,19,0.18)]"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-wrap gap-2">
                   {writeup.tags.map(tag => (
                     <span key={tag} className="text-[10px] uppercase font-mono px-2 py-0.5 rounded border border-[#283928] bg-black/30 text-[#567556] group-hover:text-primary group-hover:border-primary/30 transition-colors">
                       {tag}
                     </span>
                   ))}
                </div>
                <ExternalLink className="w-4 h-4 text-[#567556] group-hover:text-primary transition-colors shrink-0 ml-2" />
              </div>

              <h3 className="text-white text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                <Sparkles className="inline w-4 h-4 mr-2 text-primary/70" />
                {writeup.title}
              </h3>

              <p className="text-secondary-light/70 text-sm mb-6 leading-relaxed line-clamp-3 flex-grow">
                {writeup.description}
              </p>

              <div className="flex items-center gap-4 text-xs font-mono text-[#567556] border-t border-[#283928] pt-4 mt-auto">
                <div className="flex items-center gap-1.5">
                  <User className="w-3 h-3" />
                  <span>{writeup.username}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  <span>{writeup.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Hash className="w-3 h-3" />
                  <span>{writeup.platform}</span>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>

      {/* Add Writeup Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowAddForm(false)}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div
            className="relative bg-[#0d130d] border border-[#283928] rounded-lg w-full max-w-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between bg-[#1a251a] border-b border-[#283928] px-4 py-3">
              <div className="flex items-center gap-2 text-primary text-sm font-mono">
                <FileText className="w-4 h-4" />
                <span>New Community Writeup</span>
              </div>
              <button onClick={() => setShowAddForm(false)} className="text-[#567556] hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
              <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData(p => ({ ...p, username: e.target.value }))}
                required
                className="bg-black/60 border border-[#283928] text-white font-mono text-sm px-4 py-2.5 rounded focus:outline-none focus:border-primary transition-colors placeholder:text-[#567556]/50"
              />
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData(p => ({ ...p, title: e.target.value }))}
                required
                className="bg-black/60 border border-[#283928] text-white font-mono text-sm px-4 py-2.5 rounded focus:outline-none focus:border-primary transition-colors placeholder:text-[#567556]/50"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Date (e.g. Oct 18, 2025)"
                  value={formData.date}
                  onChange={(e) => setFormData(p => ({ ...p, date: e.target.value }))}
                  required
                  className="bg-black/60 border border-[#283928] text-white font-mono text-sm px-4 py-2.5 rounded focus:outline-none focus:border-primary transition-colors placeholder:text-[#567556]/50"
                />
                <input
                  type="text"
                  placeholder="Platform"
                  value={formData.platform}
                  onChange={(e) => setFormData(p => ({ ...p, platform: e.target.value }))}
                  required
                  className="bg-black/60 border border-[#283928] text-white font-mono text-sm px-4 py-2.5 rounded focus:outline-none focus:border-primary transition-colors placeholder:text-[#567556]/50"
                />
              </div>
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))}
                required
                rows={3}
                className="bg-black/60 border border-[#283928] text-white font-mono text-sm px-4 py-2.5 rounded focus:outline-none focus:border-primary transition-colors placeholder:text-[#567556]/50 resize-none"
              />
              <input
                type="url"
                placeholder="URL (https://...)"
                value={formData.url}
                onChange={(e) => setFormData(p => ({ ...p, url: e.target.value }))}
                required
                className="bg-black/60 border border-[#283928] text-white font-mono text-sm px-4 py-2.5 rounded focus:outline-none focus:border-primary transition-colors placeholder:text-[#567556]/50"
              />
              <input
                type="text"
                placeholder="Tags (comma separated)"
                value={formData.tags}
                onChange={(e) => setFormData(p => ({ ...p, tags: e.target.value }))}
                className="bg-black/60 border border-[#283928] text-white font-mono text-sm px-4 py-2.5 rounded focus:outline-none focus:border-primary transition-colors placeholder:text-[#567556]/50"
              />
              <button
                type="submit"
                className="w-full py-3 bg-primary/10 border border-primary/40 text-primary text-xs font-mono font-bold tracking-widest rounded hover:bg-primary hover:text-background-dark transition-all mt-2"
              >
                PUBLISH_WRITEUP
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Writeups;
