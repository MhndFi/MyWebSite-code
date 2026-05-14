import React, { useState, useEffect } from 'react';
import SectionHeader from './SectionHeader';
import { Writeup } from '../types';
import { FileText, ExternalLink, Calendar, Hash, Plus, X, User, Sparkles, AlertTriangle } from 'lucide-react';
import { safeUrl, safeText } from '../utils/safe';

const defaultWriteups: Writeup[] = [
  {
    id: '2',
    username: 'mhndfi',
    title: 'How I Found 4 Vulnerabilities in 3 Days — Beginner Journey',
    date: 'Mar 1, 2026',
    platform: 'Bug Bounty',
    description:
      'I submitted 4 reports in my first real bug bounty hunt. The result? 2 Informative, 1 Duplicate, and 0 bounties. But the lessons were worth more than money. Full methodology, tools, and honest results.',
    url: 'https://mhndfi.medium.com/how-i-found-4-vulnerabilities-in-3-days-beginner-journey-dcc84ecee094',
    tags: ['Bug Bounty', 'SSRF', 'XSS', 'CORS'],
  },
  {
    id: '1',
    username: 'mhndfi',
    title: 'Napping — TryHackMe',
    date: 'Oct 18, 2025',
    platform: 'TryHackMe',
    description:
      'TryHackMe "Napping" walkthrough — compromise a web app, phish the admin via Reverse Tab Nabbing to steal SSH credentials, abuse a group-writable query.py to get a shell as another user, and finally use passwordless sudo vim (GTFOBins) to pop a root shell and capture both flags.',
    url: 'https://medium.com/@mhndfi/napping-thm-e7fca6d22d8a',
    tags: ['Red Teaming', 'PrivEsc', 'GTFOBins'],
  },
];

const STORAGE_KEY = 'mhndfi_writeups';

const sanitizeWriteup = (raw: unknown): Writeup | null => {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Record<string, unknown>;
  const id = safeText(r.id as string, 64);
  const username = safeText(r.username as string, 64) || 'anonymous';
  const title = safeText(r.title as string, 200);
  const date = safeText(r.date as string, 32);
  const platform = safeText(r.platform as string, 64);
  const description = safeText(r.description as string, 2000);
  const url = safeUrl(r.url as string);
  if (!id || !title || !date || !platform || !description || !url) return null;
  const tagsRaw = Array.isArray(r.tags) ? r.tags : [];
  const tags = tagsRaw
    .filter((t): t is string => typeof t === 'string')
    .map((t) => safeText(t, 30))
    .filter(Boolean)
    .slice(0, 12);
  return { id, username, title, date, platform, description, url, tags };
};

const loadWriteups = (): Writeup[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        const userWriteups = parsed.map(sanitizeWriteup).filter((w): w is Writeup => w !== null);
        const defaultIds = new Set(defaultWriteups.map((w) => w.id));
        const userAdded = userWriteups.filter((w) => !defaultIds.has(w.id));
        return [...userAdded, ...defaultWriteups];
      }
    }
  } catch {
    /* fall through */
  }
  return defaultWriteups;
};

const Writeups: React.FC = () => {
  const [writeups, setWriteups] = useState<Writeup[]>(loadWriteups);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    title: '',
    date: '',
    platform: '',
    description: '',
    url: '',
    tags: '',
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(writeups));
    } catch {
      /* silent */
    }
  }, [writeups]);

  const handleAddClick = () => {
    setFormError(null);
    setShowAddForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const url = safeUrl(formData.url);
    if (!url) {
      setFormError('URL must be a valid http(s) link.');
      return;
    }

    const newWriteup: Writeup = {
      id: Date.now().toString(),
      username: safeText(formData.username, 64) || 'anonymous',
      title: safeText(formData.title, 200),
      date: safeText(formData.date, 32),
      platform: safeText(formData.platform, 64),
      description: safeText(formData.description, 2000),
      url,
      tags: formData.tags
        .split(',')
        .map((t) => safeText(t, 30))
        .filter(Boolean)
        .slice(0, 12),
    };

    if (!newWriteup.title || !newWriteup.date || !newWriteup.platform || !newWriteup.description) {
      setFormError('Please fill in all required fields.');
      return;
    }

    setWriteups((prev) => [newWriteup, ...prev]);
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
          className="flex items-center gap-2 px-4 py-2 bg-primary-soft border border-primary/40 text-primary text-xs font-mono rounded-md hover:bg-primary hover:text-white transition-all mb-10"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">ADD_WRITEUP</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {writeups.map((writeup) => {
          const safeHref = safeUrl(writeup.url);
          return (
            <article key={writeup.id} className="group relative">
              <a
                href={safeHref || undefined}
                target="_blank"
                rel="noopener noreferrer nofollow"
                aria-disabled={!safeHref}
                className={`bg-surface border border-border-soft p-6 rounded-xl flex flex-col h-full shadow-soft transition-all duration-300 ${
                  safeHref ? 'hover:border-primary/60 hover:shadow-soft-lg' : 'pointer-events-none opacity-60'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-wrap gap-2">
                    {writeup.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] uppercase font-mono px-2 py-0.5 rounded border border-primary/20 bg-primary-soft text-primary-strong transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ExternalLink className="w-4 h-4 text-ink-muted group-hover:text-primary transition-colors shrink-0 ml-2" />
                </div>

                <h3 className="text-ink text-lg font-bold mb-2 group-hover:text-primary transition-colors font-display">
                  <Sparkles className="inline w-4 h-4 mr-2 text-primary/70" />
                  {writeup.title}
                </h3>

                <p className="text-ink-muted text-sm mb-6 leading-relaxed line-clamp-3 flex-grow">
                  {writeup.description}
                </p>

                <div className="flex items-center gap-4 text-xs font-mono text-ink-muted border-t border-border-soft pt-4 mt-auto">
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
          aria-label="Add writeup"
        >
          <div className="absolute inset-0 bg-ink/30 backdrop-blur-sm" />
          <div
            className="relative bg-surface border border-border-soft rounded-lg w-full max-w-lg overflow-hidden shadow-soft-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between bg-titlebar border-b border-border-soft px-4 py-3">
              <div className="flex items-center gap-2 text-primary text-sm font-mono">
                <FileText className="w-4 h-4" />
                <span>New Community Writeup</span>
              </div>
              <button onClick={() => setShowAddForm(false)} className="text-ink-muted hover:text-ink transition-colors" aria-label="Close">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
              <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData((p) => ({ ...p, username: e.target.value }))}
                required
                maxLength={64}
                className="bg-white border border-border-soft text-ink font-mono text-sm px-4 py-2.5 rounded-md focus:outline-none focus:border-primary focus:shadow-ring-primary transition-all placeholder:text-ink-dim"
              />
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                required
                maxLength={200}
                className="bg-white border border-border-soft text-ink font-mono text-sm px-4 py-2.5 rounded-md focus:outline-none focus:border-primary focus:shadow-ring-primary transition-all placeholder:text-ink-dim"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Date (e.g. Oct 18, 2025)"
                  value={formData.date}
                  onChange={(e) => setFormData((p) => ({ ...p, date: e.target.value }))}
                  required
                  maxLength={32}
                  className="bg-white border border-border-soft text-ink font-mono text-sm px-4 py-2.5 rounded-md focus:outline-none focus:border-primary focus:shadow-ring-primary transition-all placeholder:text-ink-dim"
                />
                <input
                  type="text"
                  placeholder="Platform"
                  value={formData.platform}
                  onChange={(e) => setFormData((p) => ({ ...p, platform: e.target.value }))}
                  required
                  maxLength={64}
                  className="bg-white border border-border-soft text-ink font-mono text-sm px-4 py-2.5 rounded-md focus:outline-none focus:border-primary focus:shadow-ring-primary transition-all placeholder:text-ink-dim"
                />
              </div>
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                required
                rows={3}
                maxLength={2000}
                className="bg-white border border-border-soft text-ink font-mono text-sm px-4 py-2.5 rounded-md focus:outline-none focus:border-primary focus:shadow-ring-primary transition-all placeholder:text-ink-dim resize-none"
              />
              <input
                type="url"
                placeholder="URL (https://…)"
                value={formData.url}
                onChange={(e) => setFormData((p) => ({ ...p, url: e.target.value }))}
                required
                className="bg-white border border-border-soft text-ink font-mono text-sm px-4 py-2.5 rounded-md focus:outline-none focus:border-primary focus:shadow-ring-primary transition-all placeholder:text-ink-dim"
              />
              <input
                type="text"
                placeholder="Tags (comma separated)"
                value={formData.tags}
                onChange={(e) => setFormData((p) => ({ ...p, tags: e.target.value }))}
                maxLength={200}
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
