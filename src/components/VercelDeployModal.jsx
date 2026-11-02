import React, { useState } from 'react';
import { 
  Github, 
  ExternalLink, 
  CheckCircle, 
  Copy, 
  Zap, 
  Globe2, 
  Terminal, 
  X,
  Sparkles
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const VercelDeployModal = ({ isOpen, onClose, repoUrl }) => {
  const { playClickSound } = useTheme();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const vercelDeployUrl = `https://vercel.com/new/clone?repository-url=${encodeURIComponent(repoUrl || 'https://github.com/abdelrahmanmotazz/aiesec-synergy-hub')}`;

  const handleCopyRepo = () => {
    navigator.clipboard.writeText(repoUrl || 'https://github.com/abdelrahmanmotazz/aiesec-synergy-hub');
    setCopied(true);
    playClickSound();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-black border border-white/20 flex items-center justify-center shadow-lg">
            <svg viewBox="0 0 76 65" className="w-6 h-6 fill-white">
              <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-heading font-black text-white">
              Host on Vercel in 1-Click
            </h3>
            <p className="text-xs text-slate-400">
              Your AIESEC Synergy Tool is primed with automated Vite & Tailwind build configs.
            </p>
          </div>
        </div>

        {/* GitHub Repository Status */}
        <div className="bg-slate-950/80 rounded-2xl p-4 border border-white/10 mb-5 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Github className="w-4 h-4 text-white" />
              <span>Target GitHub Repository</span>
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
              Ready on GitHub
            </span>
          </div>

          <div className="flex items-center justify-between bg-slate-900 px-3 py-2 rounded-xl border border-white/5">
            <code className="text-xs text-blue-400 font-mono truncate mr-2">
              {repoUrl || 'https://github.com/abdelrahmanmotazz/aiesec-synergy-hub'}
            </code>
            <button
              onClick={handleCopyRepo}
              className="text-xs text-slate-400 hover:text-white flex items-center space-x-1 flex-shrink-0"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* 1-Click Vercel Deploy Button */}
        <div className="mb-6">
          <a
            href={vercelDeployUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-6 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-heading font-black text-sm flex items-center justify-center space-x-2.5 shadow-xl shadow-white/10 transition transform hover:-translate-y-0.5"
          >
            <svg viewBox="0 0 76 65" className="w-4 h-4 fill-black">
              <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
            </svg>
            <span>Deploy to Vercel (1-Click)</span>
            <ExternalLink className="w-4 h-4 text-slate-600" />
          </a>
        </div>

        {/* 3 Step Deployment Instructions */}
        <div className="space-y-3 text-xs text-slate-300 border-t border-white/10 pt-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Manual Vercel Setup (Alternative)
          </div>

          <div className="flex items-start space-x-2.5">
            <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
              1
            </span>
            <div>
              Go to <a href="https://vercel.com/new" target="_blank" rel="noreferrer" className="text-blue-400 underline">vercel.com/new</a> and sign in with your GitHub account.
            </div>
          </div>

          <div className="flex items-start space-x-2.5">
            <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
              2
            </span>
            <div>
              Search for <strong className="text-white">aiesec-synergy-hub</strong> and click <strong className="text-white">Import</strong>.
            </div>
          </div>

          <div className="flex items-start space-x-2.5">
            <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
              3
            </span>
            <div>
              Click <strong className="text-white">Deploy</strong>. Framework preset will auto-detect as <strong className="text-blue-400">Vite</strong> with zero configuration needed!
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
          <span>Author: Abdelrahman Motazz</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
