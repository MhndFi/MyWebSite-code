import React, { useState, useEffect, useRef } from 'react';
import {
  Terminal,
  Coffee,
  Moon,
  MapPin,
  Shield,
  Bug,
  Crosshair,
  Upload,
  AlertTriangle,
  CheckCircle2,
  Loader2,
} from 'lucide-react';

import SectionHeader from './SectionHeader';
import { validateImageFile } from '../utils/safe';

import mfAvatar from '../images/mf-avatar.svg';
import mfLogo from '../images/mf-logo.svg';

const AVATAR_ENDPOINT = '/api/avatar';
const ADMIN_AVATAR_ENDPOINT = '/api/admin/avatar';
const SESSION_ENDPOINT = '/api/admin/session';

const About: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState<string>(mfAvatar);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminEmail, setAdminEmail] = useState<string>('');
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'done' | 'error'>('idle');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  // Load the current avatar from the API, falling back to the bundled default.
  useEffect(() => {
    const ac = new AbortController();
    fetch(AVATAR_ENDPOINT, { signal: ac.signal, cache: 'no-cache' })
      .then((res) => {
        if (!res.ok) throw new Error('no avatar');
        return res.blob();
      })
      .then((blob) => {
        if (!/^image\//.test(blob.type)) throw new Error('not an image');
        const url = URL.createObjectURL(blob);
        if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = url;
        setAvatarSrc(url);
        setImageLoaded(false);
      })
      .catch(() => {
        setAvatarSrc(mfAvatar);
      });
    return () => {
      ac.abort();
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    };
  }, []);

  // Check whether the visitor is signed in via Cloudflare Access (admin).
  useEffect(() => {
    const ac = new AbortController();
    fetch(SESSION_ENDPOINT, { signal: ac.signal, cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : { authenticated: false }))
      .then((data: { authenticated?: boolean; email?: string }) => {
        setIsAdmin(Boolean(data.authenticated));
        setAdminEmail(typeof data.email === 'string' ? data.email : '');
      })
      .catch(() => {
        setIsAdmin(false);
      });
    return () => ac.abort();
  }, []);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    setUploadError(null);
    if (!file) return;

    const error = validateImageFile(file, { maxBytes: 1.5 * 1024 * 1024 });
    if (error) {
      setUploadError(error);
      setUploadState('error');
      return;
    }

    setUploadState('uploading');
    try {
      const res = await fetch(ADMIN_AVATAR_ENDPOINT, {
        method: 'POST',
        headers: { 'content-type': file.type },
        body: file,
        credentials: 'include',
      });
      if (!res.ok) {
        const detail = await res.text().catch(() => '');
        throw new Error(`HTTP ${res.status}${detail ? `: ${detail.slice(0, 200)}` : ''}`);
      }
      // Reload the avatar from the API so all viewers see the new one.
      const refreshed = await fetch(AVATAR_ENDPOINT, { cache: 'no-cache' });
      if (refreshed.ok) {
        const blob = await refreshed.blob();
        const url = URL.createObjectURL(blob);
        if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = url;
        setAvatarSrc(url);
        setImageLoaded(false);
      }
      setUploadState('done');
      setTimeout(() => setUploadState('idle'), 2500);
    } catch (err) {
      setUploadError((err as Error).message);
      setUploadState('error');
    }
  };

  return (
    <section className="w-full py-8" id="about">
      <SectionHeader title="./cat_bio.sh" subtitle="Reading local user metadata" />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Profile Card */}
        <div className="flex flex-col items-center lg:items-start gap-6 lg:w-1/3">
          <div className="relative group">
            <div className="absolute -inset-1 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-700" />
            <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <img
              src={avatarSrc}
              alt="Mohannad Firon"
              loading="lazy"
              decoding="async"
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setAvatarSrc(mfAvatar);
                setImageLoaded(true);
              }}
              className={`w-40 h-40 rounded-full border-2 border-border-soft group-hover:border-primary transition-all duration-500 relative z-10 object-cover bg-white shadow-soft ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />

            <img
              src={mfLogo}
              alt=""
              aria-hidden="true"
              className="absolute -bottom-2 -right-2 w-14 h-14 rounded-full border border-border-soft bg-white shadow-soft z-20"
            />
          </div>

          {/* Admin-only upload (visible only when signed in via Cloudflare Access) */}
          {isAdmin && (
            <div className="flex flex-col items-center lg:items-start gap-2 w-full">
              <label
                className={`cursor-pointer inline-flex items-center gap-2 px-3 py-2 rounded-md border text-[11px] font-mono tracking-widest transition-colors ${
                  uploadState === 'uploading'
                    ? 'border-primary/30 bg-primary-soft/60 text-primary/60 cursor-not-allowed'
                    : 'border-primary/30 bg-primary-soft text-primary hover:bg-primary hover:text-white'
                }`}
              >
                {uploadState === 'uploading' ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : uploadState === 'done' ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  <Upload className="w-3.5 h-3.5" />
                )}
                {uploadState === 'uploading'
                  ? 'UPLOADING…'
                  : uploadState === 'done'
                    ? 'UPDATED'
                    : 'REPLACE_AVATAR'}
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  className="hidden"
                  disabled={uploadState === 'uploading'}
                  onChange={handleAvatarUpload}
                />
              </label>
              <span className="text-[10px] font-mono text-ink-dim uppercase tracking-widest">
                Signed in as {adminEmail || 'admin'}
              </span>
            </div>
          )}

          {uploadError && (
            <div
              role="alert"
              className="flex items-start gap-2 text-xs text-secondary bg-secondary/5 border border-secondary/20 rounded-md px-3 py-2 max-w-xs"
            >
              <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span className="break-words">{uploadError}</span>
            </div>
          )}

          <div className="text-center lg:text-left">
            <h3 className="text-ink text-2xl font-bold mb-1 font-display">Mohannad Firon</h3>

            <div className="flex items-center gap-1.5 justify-center lg:justify-start text-ink-muted text-xs font-mono">
              <MapPin className="w-3 h-3" />
              <span>Jerusalem</span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-3 w-full">
            <div className="bg-surface border border-border-soft p-3 rounded-md flex-1 group/stat hover:border-secondary transition-all duration-300 shadow-soft">
              <div className="flex items-center justify-between mb-1">
                <span className="text-secondary text-xl font-black font-mono">98%</span>
                <Coffee className="w-4 h-4 text-secondary/50 group-hover/stat:text-secondary transition-colors" />
              </div>
              <p className="text-[9px] text-ink-muted uppercase font-mono tracking-widest">Coffee</p>
            </div>

            <div className="bg-surface border border-border-soft p-3 rounded-md flex-1 group/stat hover:border-primary transition-all duration-300 shadow-soft">
              <div className="flex items-center justify-between mb-1">
                <span className="text-primary text-xl font-black font-mono">4.5H</span>
                <Moon className="w-4 h-4 text-primary/50 group-hover/stat:text-primary transition-colors" />
              </div>
              <p className="text-[9px] text-ink-muted uppercase font-mono tracking-widest">Sleep</p>
            </div>
          </div>
        </div>

        {/* Right: Bio Content */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-surface border border-border-soft rounded-lg overflow-hidden shadow-soft">
            <div className="bg-titlebar border-b border-border-soft px-4 py-2 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-primary/70" />
              <span className="text-ink-muted text-xs font-mono">whoami --verbose</span>
            </div>

            <div className="p-6">
              <p className="text-ink text-base leading-relaxed mb-4">
                Specializing in <span className="text-primary font-semibold">high-stakes web application security</span>, deep recon, and vulnerability hunting on HackerOne and Bugcrowd.
              </p>

              <p className="text-ink-muted text-sm leading-relaxed">
                I leverage custom-built automation suites and manual penetration testing techniques to uncover critical security flaws in enterprise-grade infrastructure.
              </p>
            </div>
          </div>

          {/* Focus Areas */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-center gap-3 bg-surface border border-border-soft rounded-md px-4 py-3 hover:border-primary/40 hover:shadow-soft transition-all">
              <Bug className="w-4 h-4 text-primary shrink-0" />
              <span className="text-ink-muted text-xs font-mono">Bug Bounty</span>
            </div>

            <div className="flex items-center gap-3 bg-surface border border-border-soft rounded-md px-4 py-3 hover:border-primary/40 hover:shadow-soft transition-all">
              <Shield className="w-4 h-4 text-primary shrink-0" />
              <span className="text-ink-muted text-xs font-mono">Pentesting</span>
            </div>

            <div className="flex items-center gap-3 bg-surface border border-border-soft rounded-md px-4 py-3 hover:border-primary/40 hover:shadow-soft transition-all">
              <Crosshair className="w-4 h-4 text-primary shrink-0" />
              <span className="text-ink-muted text-xs font-mono">Recon & OSINT</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
