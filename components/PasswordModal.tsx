import React, { useState } from 'react';
import { Lock, X, AlertTriangle } from 'lucide-react';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ADMIN_PASSWORD = 'MhndFi';

const PasswordModal: React.FC<PasswordModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setPassword('');
      setError(false);
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const handleClose = () => {
    setPassword('');
    setError(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={handleClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div
        className="relative bg-[#0d130d] border border-[#283928] rounded-lg w-full max-w-sm overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between bg-[#1a251a] border-b border-[#283928] px-4 py-3">
          <div className="flex items-center gap-2 text-primary text-sm font-mono">
            <Lock className="w-4 h-4" />
            <span>Authentication Required</span>
          </div>
          <button onClick={handleClose} className="text-[#567556] hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <p className="text-secondary-light/60 text-xs font-mono mb-4">
            $ sudo authenticate --admin
          </p>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password..."
              autoFocus
              className="w-full bg-black/60 border border-[#283928] text-primary font-mono text-sm px-4 py-3 rounded focus:outline-none focus:border-primary transition-colors placeholder:text-[#567556]/50"
            />
          </div>
          {error && (
            <div className="flex items-center gap-2 mt-3 text-secondary text-xs font-mono">
              <AlertTriangle className="w-3 h-3" />
              <span>ACCESS DENIED - Invalid credentials</span>
            </div>
          )}
          <button
            type="submit"
            className="w-full mt-4 py-3 bg-primary/10 border border-primary/40 text-primary text-xs font-mono font-bold tracking-widest rounded hover:bg-primary hover:text-background-dark transition-all"
          >
            AUTHENTICATE
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;
