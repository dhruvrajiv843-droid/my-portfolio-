import React from 'react';
import { ArrowRight, Mail, Github, Sparkles, Terminal, Code2, Cpu } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';
import { ParticleCanvas } from './ParticleCanvas.tsx';

interface HeroProps {
  onExploreWork: () => void;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onContactClick }) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      {/* Interactive Particle Animation Canvas */}
      <ParticleCanvas />

      {/* Background Tech Glow & Grid Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: '4rem 4rem',
          }}
        />

        {/* Ambient Electric Blue Radial Glow */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/15 rounded-full blur-[128px]" />
        
        {/* Ambient Purple Radial Glow */}
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-purple-600/15 rounded-full blur-[128px]" />
        
        {/* Center subtle beam */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-indigo-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 text-xs sm:text-sm font-medium text-slate-200 mb-8 backdrop-blur-md shadow-sm shadow-black/40">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-emerald-400 font-semibold">Open to Work</span>
          <span className="text-slate-500">·</span>
          <span>Freelance & Internships</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]">
          Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">Dhruv Singh</span>.
          <br className="hidden sm:inline" />
          {' '}Building Websites, AI Content & Smart Digital Solutions.
        </h1>

        {/* Subheadline */}
        <p className="max-w-3xl mx-auto text-lg sm:text-xl text-slate-300 font-normal leading-relaxed mb-10">
          {PERSONAL_INFO.subheadline}
        </p>

        {/* CTA Buttons & GitHub Link */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          {/* CTA 1: View My Work */}
          <button
            type="button"
            onClick={onExploreWork}
            className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-base"
          >
            <span>View My Work</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* CTA 2: Contact Me */}
          <button
            type="button"
            onClick={onContactClick}
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/80 hover:border-slate-600 shadow-md shadow-black/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-base"
          >
            <Mail className="w-4 h-4 text-purple-400" />
            <span>Contact Me</span>
          </button>

          {/* GitHub Profile Clean Link/Icon */}
          <a
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-medium text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 transition-all duration-200 text-base"
            aria-label="Dhruv Singh GitHub Profile"
          >
            <Github className="w-5 h-5 text-slate-200" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>

        {/* Quick Highlights Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-4 border-t border-slate-800/60">
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 text-left">
            <div className="flex items-center gap-2 text-blue-400 mb-1 text-xs font-mono uppercase tracking-wider">
              <Code2 className="w-3.5 h-3.5" />
              <span>Full-Stack Web</span>
            </div>
            <div className="text-sm font-semibold text-slate-200">Modern React & Figma</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 text-left">
            <div className="flex items-center gap-2 text-purple-400 mb-1 text-xs font-mono uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generative AI</span>
            </div>
            <div className="text-sm font-semibold text-slate-200">Reels & Voiceovers</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 text-left">
            <div className="flex items-center gap-2 text-indigo-400 mb-1 text-xs font-mono uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5" />
              <span>Engineering</span>
            </div>
            <div className="text-sm font-semibold text-slate-200">1st Year IT Student</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 text-left">
            <div className="flex items-center gap-2 text-emerald-400 mb-1 text-xs font-mono uppercase tracking-wider">
              <Terminal className="w-3.5 h-3.5" />
              <span>Turnaround</span>
            </div>
            <div className="text-sm font-semibold text-slate-200">Rapid Delivery</div>
          </div>
        </div>
      </div>
    </section>
  );
};
