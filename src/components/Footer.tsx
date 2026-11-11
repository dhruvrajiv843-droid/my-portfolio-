import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Heart } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-[#060910] text-slate-400 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white font-mono text-xs font-bold shadow-md shadow-blue-500/20">
              DS
            </div>
            <div>
              <span className="font-semibold text-white tracking-tight">
                {PERSONAL_INFO.brandName}
              </span>
              <span className="text-slate-500 text-xs ml-2">· First-Year IT Engineer</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 text-sm">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-850 rounded-lg"
              aria-label="Email Dhruv Singh"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-850 rounded-lg"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-850 rounded-lg"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <div className="w-px h-4 bg-slate-800 mx-1" />

            {/* Back to top */}
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-400 transition-colors p-2"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Copyright Text */}
        <div className="mt-8 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Dhruv Singh. Built with AI & Code.</p>
          <p className="flex items-center gap-1">
            Designed for high performance & clean delivery.
          </p>
        </div>
      </div>
    </footer>
  );
};
