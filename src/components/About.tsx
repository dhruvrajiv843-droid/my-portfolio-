import React from 'react';
import { GraduationCap, Sparkles, GitBranch, Briefcase, CheckCircle2, Layers } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 relative border-t border-slate-800/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-sm font-semibold uppercase tracking-wider text-blue-400 mb-2">
            Background & Mindset
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            About Me
          </h2>
          <div className="mt-3 text-slate-400 text-base">
            First-year IT engineer, relentless builder, and freelance problem solver.
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Bio Narrative */}
          <div className="lg:col-span-7 space-y-6 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              I am a <strong className="text-white font-semibold">first-year IT engineering student</strong> and continuous learner. I got into tech because I love the craft of building things that real people use. Instead of waiting years for degree completion to start shipping, I dive straight into real-world projects.
            </p>

            <p>
              I have developed hands-on, practical experience combining <strong className="text-blue-300 font-medium">modern AI-assisted workflows</strong>, intuitive interface design in <strong className="text-purple-300 font-medium">Figma</strong>, and reliable <strong className="text-slate-100 font-medium">cloud deployment basics</strong>. I keep things clean, modular, and grounded—prioritizing clarity, usability, and speed over unnecessary technical jargon.
            </p>

            <p>
              My days are spent building and testing projects on <a href={PERSONAL_INFO.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline underline-offset-4 font-medium">GitHub</a>, experimenting with next-gen video and voice synthesis, and writing maintainable code.
            </p>

            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-purple-950/40 border border-blue-500/20 text-slate-200">
              <div className="flex items-center gap-2 text-sm font-semibold text-blue-300 mb-1">
                <Briefcase className="w-4 h-4 text-blue-400" />
                <span>Currently Available</span>
              </div>
              <p className="text-sm text-slate-300">
                I am actively taking on <span className="text-white font-medium">freelance client projects</span> and open to <span className="text-white font-medium">engineering internships</span>. If you need dedicated execution and fast turnaround, let's connect!
              </p>
            </div>
          </div>

          {/* Right Column: Key Pillars & Tooling */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-400" />
                <span>What I Bring to the Table</span>
              </h3>

              <ul className="space-y-3.5">
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>
                    <strong className="text-white font-medium">Engineering Foundations:</strong> Solid IT computer science fundamentals with an agile problem-solving approach.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>
                    <strong className="text-white font-medium">AI-Assisted Efficiency:</strong> Leveraging prompt engineering and AI toolchains to execute 3x faster without compromising quality.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>
                    <strong className="text-white font-medium">Design & Code Harmony:</strong> Figma wireframes brought to life in responsive, clean code that looks great on mobile.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>
                    <strong className="text-white font-medium">Open Source & Git:</strong> Disciplined version control, organized commits, and documented project repositories.
                  </span>
                </li>
              </ul>
            </div>

            {/* Practical Toolkit Box */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-400" />
                <span>Toolkit & Daily Workflows</span>
              </h3>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {PERSONAL_INFO.techStack.map((tech) => (
                  <div
                    key={tech.name}
                    className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:border-slate-600 transition-colors"
                  >
                    <div className="font-medium text-slate-200">{tech.name}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{tech.level}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
