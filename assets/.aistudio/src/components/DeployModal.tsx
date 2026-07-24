import React, { useState } from 'react';
import { X, Github, ExternalLink, Copy, Check, Download, Terminal, Rocket, FileCode } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface DeployModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const DeployModal: React.FC<DeployModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const t = translations[language] || translations['EN'];

  if (!isOpen) return null;

  const githubCommands = `git init
git add .
git commit -m "Initial commit - Shoe3D Pro App"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/shoe3d-customizer.git
git push -u origin main`;

  const vercelJsonContent = `{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}`;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const downloadVercelConfig = () => {
    const blob = new Blob([vercelJsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vercel.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#FDFBF7] text-[#1A1A1A] w-full max-w-3xl rounded-3xl border-4 border-[#1A1A1A] artistic-shadow-lg overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#1A1A1A] text-white p-6 flex items-center justify-between border-b-2 border-[#1A1A1A]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF3E00] flex items-center justify-center text-white font-black border border-white/20">
              <Rocket className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight italic">
                {t.deployTitle}
              </h2>
              <p className="text-xs text-gray-300 font-medium">
                {t.deploySubtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#FF3E00] text-white flex items-center justify-center transition-colors border border-white/20"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
          
          {/* Quick Status Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white border-2 border-[#1A1A1A] p-3.5 rounded-2xl artistic-shadow flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-[#00F0FF] text-[#1A1A1A] flex items-center justify-center font-black">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <div className="font-black uppercase text-[11px]">Build Ready</div>
                <div className="text-[10px] text-[#666]">Vite + React 19 + Three.js</div>
              </div>
            </div>

            <div className="bg-white border-2 border-[#1A1A1A] p-3.5 rounded-2xl artistic-shadow flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-[#FF3E00] text-white flex items-center justify-center font-black">
                <Github className="w-5 h-5" />
              </div>
              <div>
                <div className="font-black uppercase text-[11px]">Git Clean</div>
                <div className="text-[10px] text-[#666]">Ready for Push</div>
              </div>
            </div>

            <div className="bg-white border-2 border-[#1A1A1A] p-3.5 rounded-2xl artistic-shadow flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-[#7000FF] text-white flex items-center justify-center font-black">
                <ExternalLink className="w-5 h-5" />
              </div>
              <div>
                <div className="font-black uppercase text-[11px]">Vercel SPA</div>
                <div className="text-[10px] text-[#666]">vercel.json Ready</div>
              </div>
            </div>
          </div>

          {/* STEP 1: GITHUB */}
          <div className="bg-white border-2 border-[#1A1A1A] p-5 rounded-3xl artistic-shadow space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 font-black uppercase text-sm text-[#1A1A1A]">
                <Github className="w-5 h-5 text-[#FF3E00]" />
                <span>{t.githubStepTitle}</span>
              </div>
              <button
                onClick={() => copyToClipboard(githubCommands, 'github')}
                className="bg-[#1A1A1A] text-white hover:bg-[#FF3E00] font-black text-xs px-3 py-1.5 rounded-xl border border-[#1A1A1A] transition-colors flex items-center space-x-1.5 uppercase"
              >
                {copiedSection === 'github' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#00F0FF]" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{t.copyCommands}</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-[#555] text-xs leading-relaxed font-medium">
              Create a new empty repository on <strong className="text-[#1A1A1A]">GitHub.com</strong>, then run these commands inside your local project terminal:
            </p>

            <div className="bg-[#1A1A1A] text-emerald-400 p-4 rounded-2xl font-mono text-xs overflow-x-auto border border-black shadow-inner relative">
              <Terminal className="w-4 h-4 text-[#FF3E00] absolute right-3 top-3" />
              <pre>{githubCommands}</pre>
            </div>
          </div>

          {/* STEP 2: VERCEL */}
          <div className="bg-white border-2 border-[#1A1A1A] p-5 rounded-3xl artistic-shadow space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 font-black uppercase text-sm text-[#1A1A1A]">
                <FileCode className="w-5 h-5 text-[#00F0FF]" />
                <span>{t.vercelStepTitle}</span>
              </div>
              <button
                onClick={downloadVercelConfig}
                className="bg-[#FF3E00] text-white hover:bg-[#1A1A1A] font-black text-xs px-3.5 py-1.5 rounded-xl border-2 border-[#1A1A1A] artistic-shadow transition-all flex items-center space-x-1.5 uppercase"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download vercel.json</span>
              </button>
            </div>

            <p className="text-[#555] text-xs leading-relaxed font-medium">
              1. Log into <strong className="text-[#1A1A1A]">Vercel.com</strong> with your GitHub account.<br />
              2. Click <strong className="text-[#FF3E00]">"Add New Project"</strong> and select your GitHub repo.<br />
              3. Vercel will automatically detect <strong className="text-[#1A1A1A]">Vite</strong>. Click <strong className="text-[#1A1A1A]">Deploy</strong>!
            </p>

            <div className="bg-[#EEEAE3] border-2 border-[#1A1A1A] p-4 rounded-2xl text-xs space-y-2 font-mono">
              <div className="font-black text-[#1A1A1A] uppercase tracking-wider text-[10px] flex items-center justify-between">
                <span>vercel.json Configuration File:</span>
                <button 
                  onClick={() => copyToClipboard(vercelJsonContent, 'vercel')} 
                  className="text-[#FF3E00] hover:underline font-extrabold uppercase"
                >
                  {copiedSection === 'vercel' ? 'Copied!' : 'Copy JSON'}
                </button>
              </div>
              <pre className="text-[#333] text-[11px] overflow-x-auto">{vercelJsonContent}</pre>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-[#EEEAE3] border-t-2 border-[#1A1A1A] p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <a
            href="https://vercel.com/new"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-[#1A1A1A] text-white hover:bg-[#FF3E00] font-black text-xs uppercase tracking-widest px-6 py-3 rounded-xl border-2 border-[#1A1A1A] artistic-shadow transition-colors flex items-center justify-center space-x-2"
          >
            <span>Open Vercel Dashboard</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-white text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-xl border-2 border-[#1A1A1A] transition-colors"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
};
