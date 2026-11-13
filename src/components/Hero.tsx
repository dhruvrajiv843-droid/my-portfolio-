import React from 'react';
import { ArrowRight, Mail, Github } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';
import { ParticleCanvas } from './ParticleCanvas.tsx';
import { ParticleNameCanvas } from './ParticleNameCanvas.tsx';
import type { ThemeMode } from '../utils/theme.ts';

interface HeroProps {
  theme: ThemeMode;
  onExploreWork: () => void;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ theme, onExploreWork, onContactClick }) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-20 pb-8 sm:pb-10 overflow-hidden bg-[var(--bg-page)] transition-colors duration-200"
    >
      {/* Interactive Constellation Particle Background (tsparticles) */}
      <ParticleCanvas theme={theme} />

      {/* Subtle Ambient Tech Depth Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-40 w-[420px] h-[420px] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-40 w-[420px] h-[420px] bg-purple-500/10 dark:bg-purple-600/10 rounded-full blur-[140px]" />
      </div>

      {/* Top Subtle Status Indicator */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-3">
        <div className="inline-flex items-center gap-2.5 text-xs font-mono tracking-wide text-slate-700 dark:text-slate-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 dark:bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600 dark:bg-emerald-500"></span>
          </span>
          <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Open to Work</span>
          <span className="text-slate-400 dark:text-slate-600" aria-hidden="true">·</span>
          <span className="text-slate-600 dark:text-slate-400">Freelance &amp; Internships</span>
        </div>
      </div>

      {/* Centerpiece: Interactive Particle-Formed Name Typography */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-10 my-auto py-2">
        <ParticleNameCanvas theme={theme} />
      </div>

      {/* Bottom Asymmetric Editorial Composition */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-10">
          {/* Left Column: Bold Tight-Leading Display Headline, Subheadline & CTAs */}
          <div className="max-w-3xl space-y-4">
            <h1 className="text-2xl sm:text-4xl lg:text-[2.65rem] font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08]">
              Hi, I&apos;m{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400">
                Dhruv Singh
              </span>
              . Building Websites, AI Content &amp; Smart Digital Solutions.
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-normal leading-relaxed max-w-2xl">
              {PERSONAL_INFO.subheadline}
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={onExploreWork}
                className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-sm"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                type="button"
                onClick={onContactClick}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 rounded-xl font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900/90 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm dark:shadow-none transition-all duration-200 text-sm"
              >
                <Mail className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>Contact Me</span>
              </button>

              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl font-medium text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white bg-white/80 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm dark:shadow-none transition-all duration-200 text-sm"
                aria-label="Dhruv Singh GitHub Profile"
              >
                <Github className="w-4 h-4 text-slate-700 dark:text-slate-200" />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* Right Column: Monospace Editorial Credential Block */}
          <div className="flex flex-col items-start lg:items-end justify-end shrink-0">
            <div className="text-left lg:text-right font-mono text-[11px] sm:text-xs uppercase tracking-[0.16em] leading-relaxed text-slate-600 dark:text-slate-400 space-y-1">
              <div className="text-slate-900 dark:text-slate-200 font-medium">
                Freelancer &amp; AI Solutions Builder
              </div>
              <div>
                B.Tech IT · <span className="text-blue-600 dark:text-blue-400 font-semibold">KJSCE</span> (K. J. Somaiya)
              </div>
              <div className="text-slate-500">Mumbai, India</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
