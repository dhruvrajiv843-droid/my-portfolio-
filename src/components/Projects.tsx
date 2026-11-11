import React, { useState } from 'react';
import { 
  ExternalLink, 
  Github, 
  Play, 
  Pause, 
  Layers, 
  CheckCircle2, 
  Smartphone, 
  Monitor, 
  Sparkles, 
  SlidersHorizontal,
  ArrowRight,
  TrendingUp,
  Volume2,
  Workflow
} from 'lucide-react';
import { PROJECTS, PERSONAL_INFO } from '../data/portfolioData.ts';
import { ProjectCategory, ProjectItem } from '../types.ts';

interface ProjectsProps {
  onOpenProjectModal?: (project: ProjectItem) => void;
  onContactClick: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onContactClick }) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  
  // Interactive state for Project 2: AI Video & Reels player simulation
  const [isPlayingReel, setIsPlayingReel] = useState(false);
  const [activeVideoScene, setActiveVideoScene] = useState(0);
  const [reelAspectRatio, setReelAspectRatio] = useState<'9:16' | '16:9'>('9:16');

  // Interactive state for Project 3: CRM pipeline lead movement
  const [leads, setLeads] = useState([
    { id: '1', name: 'Acme SaaS Corp', service: 'AI Website Redesign', stage: 'New Lead', value: '$1,200' },
    { id: '2', name: 'Kinetics Studio', service: 'Viral Reels Campaign', stage: 'Contacted', value: '$850' },
    { id: '3', name: 'Nexus Fitness', service: 'Custom CRM Pipeline', stage: 'Proposal Sent', value: '$1,500' },
  ]);

  // Video scenes for Project 2 showcase
  const videoScenes = [
    { title: 'Hook Scene', prompt: 'Cinematic hyper-realistic neon cyber cityscape with fluid electric particles, 4k drone shot', duration: '0-3s' },
    { title: 'Value Drop', prompt: 'Minimalist tech interface floating in zero gravity with glowing analytics widgets', duration: '3-8s' },
    { title: 'Call-to-Action', prompt: 'Dynamic typography animation on clean dark glass background with studio lighting', duration: '8-12s' },
  ];

  const filteredProjects = activeCategory === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeCategory);

  const moveLeadNext = (id: string) => {
    setLeads(prev => prev.map(lead => {
      if (lead.id !== id) return lead;
      if (lead.stage === 'New Lead') return { ...lead, stage: 'Contacted' };
      if (lead.stage === 'Contacted') return { ...lead, stage: 'Proposal Sent' };
      if (lead.stage === 'Proposal Sent') return { ...lead, stage: 'Deal Won 🎉' };
      return { ...lead, stage: 'New Lead' };
    }));
  };

  return (
    <section id="projects" className="py-24 relative border-t border-slate-800/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-sm font-semibold uppercase tracking-wider text-blue-400 mb-2">
            Selected Works
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Projects Showcase
          </h2>
          <p className="mt-3 text-slate-400 text-base">
            Real code, AI generative media workflows, and automated systems built for scale.
          </p>
        </div>

        {/* Interactive Filter Tabs (Buttons with click handlers) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              activeCategory === 'all'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold'
                : 'bg-slate-900/60 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
            }`}
          >
            All Projects
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('web')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              activeCategory === 'web'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold'
                : 'bg-slate-900/60 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
            }`}
          >
            Web Dev
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('ai-media')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              activeCategory === 'ai-media'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 font-semibold'
                : 'bg-slate-900/60 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
            }`}
          >
            AI Media
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('automation')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              activeCategory === 'automation'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30 font-semibold'
                : 'bg-slate-900/60 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
            }`}
          >
            Automation
          </button>
        </div>

        {/* Project Cards List */}
        <div className="space-y-12">
          {filteredProjects.map((project) => {
            const isWebProject = project.id === 'live-website-project';
            const isVideoProject = project.id === 'ai-video-reels-campaign';
            const isCrmProject = project.id === 'custom-crm-workflow';

            return (
              <div
                key={project.id}
                className="p-6 sm:p-8 rounded-3xl bg-slate-900/50 border border-slate-800/90 shadow-xl backdrop-blur-sm transition-all hover:border-slate-700/80"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Column: Project Details */}
                  <div className="lg:col-span-6 space-y-4">
                    {/* Tag + Category Text */}
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                      <span className="text-blue-400 font-semibold">{project.tag}</span>
                      <span>·</span>
                      <span>{project.badge}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {project.title}
                    </h3>

                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                      {project.description}
                    </p>

                    {/* Key Highlights */}
                    <div className="space-y-2 pt-2">
                      {project.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>

                    {/* Metrics Strip */}
                    {project.metrics && (
                      <div className="grid grid-cols-3 gap-3 pt-3">
                        {project.metrics.map((m, i) => (
                          <div key={i} className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-left">
                            <div className="text-[11px] text-slate-400">{m.label}</div>
                            <div className="text-sm font-semibold text-white mt-0.5">{m.value}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-4">
                      {isWebProject && (
                        <>
                          <a
                            href={project.liveDemoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/30 transition-all"
                          >
                            <span>Live Demo</span>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-750 border border-slate-700 transition-all"
                          >
                            <Github className="w-4 h-4" />
                            <span>GitHub Code</span>
                          </a>
                        </>
                      )}

                      {isVideoProject && (
                        <>
                          <button
                            type="button"
                            onClick={() => setIsPlayingReel(!isPlayingReel)}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500 shadow-md shadow-purple-600/30 transition-all"
                          >
                            {isPlayingReel ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            <span>{isPlayingReel ? 'Pause Showcase' : 'Play Showcase'}</span>
                          </button>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-750 border border-slate-700 transition-all"
                          >
                            <Github className="w-4 h-4" />
                            <span>Prompt Repo</span>
                          </a>
                        </>
                      )}

                      {isCrmProject && (
                        <>
                          <button
                            type="button"
                            onClick={onContactClick}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-cyan-600 hover:bg-cyan-500 shadow-md shadow-cyan-600/30 transition-all"
                          >
                            <Workflow className="w-4 h-4" />
                            <span>Deploy Custom CRM</span>
                          </button>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-750 border border-slate-700 transition-all"
                          >
                            <Github className="w-4 h-4" />
                            <span>Pipeline Architecture</span>
                          </a>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Visual Demonstration / Placeholder Card */}
                  <div className="lg:col-span-6">
                    {/* View for Project 1: Live Web Project interactive preview */}
                    {isWebProject && (
                      <div className="p-4 sm:p-6 rounded-2xl bg-[#0b101d] border border-blue-500/30 shadow-2xl relative overflow-hidden">
                        <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-800 text-xs text-slate-400">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 shrink-0" />
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 shrink-0" />
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 shrink-0" />
                            <span className="ml-1.5 font-mono text-slate-400 text-[11px] sm:text-xs truncate">dhruvsingh.dev/preview</span>
                          </div>
                          <span className="text-emerald-400 font-mono text-[10px] sm:text-[11px] font-semibold shrink-0">
                            <span className="hidden sm:inline">SSL SECURE · </span>200 OK
                          </span>
                        </div>

                        {/* Miniature interactive website preview surface */}
                        <div className="rounded-xl bg-slate-950 p-4 border border-slate-800/80 space-y-3">
                          <div className="h-6 w-32 rounded bg-blue-500/30"></div>
                          <div className="h-4 w-3/4 rounded bg-slate-800"></div>
                          <div className="h-3 w-1/2 rounded bg-slate-800/60"></div>
                          
                          <div className="grid grid-cols-3 gap-2 pt-2">
                            <div className="h-16 rounded-lg bg-slate-900 border border-slate-800 p-2 flex flex-col justify-between">
                              <span className="w-4 h-4 rounded bg-blue-500/40" />
                              <span className="h-2 w-12 rounded bg-slate-700" />
                            </div>
                            <div className="h-16 rounded-lg bg-slate-900 border border-slate-800 p-2 flex flex-col justify-between">
                              <span className="w-4 h-4 rounded bg-purple-500/40" />
                              <span className="h-2 w-12 rounded bg-slate-700" />
                            </div>
                            <div className="h-16 rounded-lg bg-slate-900 border border-slate-800 p-2 flex flex-col justify-between">
                              <span className="w-4 h-4 rounded bg-indigo-500/40" />
                              <span className="h-2 w-12 rounded bg-slate-700" />
                            </div>
                          </div>

                          <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/60">
                            <span className="flex items-center gap-1 text-blue-400">
                              <Monitor className="w-3.5 h-3.5" /> Desktop & Mobile Optimized
                            </span>
                            <span className="font-mono text-emerald-400 font-medium">99.8% Perf Score</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* View for Project 2: AI Video & Reels Campaign interactive video showcase */}
                    {isVideoProject && (
                      <div className="p-4 sm:p-6 rounded-2xl bg-[#120c1d] border border-purple-500/30 shadow-2xl relative overflow-hidden">
                        <div className="flex items-center justify-between pb-3 mb-4 border-b border-purple-950/80 text-xs">
                          <div className="flex items-center gap-2">
                            <span className="flex h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
                            <span className="font-semibold text-purple-300">AI Media Showcase Studio</span>
                          </div>
                          
                          <div className="flex items-center gap-1 bg-purple-950/60 p-1 rounded-lg border border-purple-800/40">
                            <button
                              type="button"
                              onClick={() => setReelAspectRatio('9:16')}
                              className={`px-2 py-0.5 rounded text-[11px] font-medium ${reelAspectRatio === '9:16' ? 'bg-purple-600 text-white' : 'text-slate-400'}`}
                            >
                              9:16 Reel
                            </button>
                            <button
                              type="button"
                              onClick={() => setReelAspectRatio('16:9')}
                              className={`px-2 py-0.5 rounded text-[11px] font-medium ${reelAspectRatio === '16:9' ? 'bg-purple-600 text-white' : 'text-slate-400'}`}
                            >
                              16:9 Video
                            </button>
                          </div>
                        </div>

                        {/* Video Mock Screen */}
                        <div className={`mx-auto rounded-xl bg-gradient-to-br from-slate-950 via-purple-950/40 to-slate-900 border border-purple-800/40 p-4 flex flex-col justify-between transition-all ${
                          reelAspectRatio === '9:16' ? 'h-64 max-w-[190px]' : 'h-48 w-full'
                        }`}>
                          <div className="flex items-center justify-between text-[11px] text-purple-300">
                            <span className="font-mono">{videoScenes[activeVideoScene].duration}</span>
                            <span className="flex items-center gap-1 font-mono text-[10px]"><Volume2 className="w-3 h-3" /> AI Voice</span>
                          </div>

                          <div className="text-center py-2">
                            <button
                              type="button"
                              onClick={() => setIsPlayingReel(!isPlayingReel)}
                              className="w-12 h-12 mx-auto rounded-full bg-purple-600/90 text-white flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-purple-600/50"
                              aria-label={isPlayingReel ? 'Pause video' : 'Play video'}
                            >
                              {isPlayingReel ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                            </button>
                            <div className="mt-2 text-xs font-semibold text-white">
                              {videoScenes[activeVideoScene].title}
                            </div>
                            <div className="text-[10px] text-purple-300/80">
                              {isPlayingReel ? 'Simulating Scene Playback...' : 'Click to preview reel'}
                            </div>
                          </div>

                          {/* Sound wave visualizer */}
                          <div className="flex items-center justify-center gap-1 h-4">
                            {[12, 24, 16, 28, 20, 14, 26, 18, 22].map((height, idx) => (
                              <span
                                key={idx}
                                className={`w-1 rounded-full bg-purple-400/80 transition-all ${
                                  isPlayingReel ? 'animate-pulse' : 'opacity-40'
                                }`}
                                style={{ height: `${isPlayingReel ? height : 6}px` }}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Scene Selector */}
                        <div className="mt-4 pt-3 border-t border-purple-900/40">
                          <div className="text-[11px] text-slate-400 mb-1.5 font-medium">Select Scene Prompt:</div>
                          <div className="grid grid-cols-3 gap-1.5">
                            {videoScenes.map((scene, i) => (
                              <button
                                key={i}
                                type="button"
                                onClick={() => setActiveVideoScene(i)}
                                className={`p-1.5 text-left rounded-lg text-[10px] transition-colors ${
                                  activeVideoScene === i 
                                    ? 'bg-purple-900/80 border border-purple-500 text-purple-200 font-semibold' 
                                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                                }`}
                              >
                                {scene.title}
                              </button>
                            ))}
                          </div>
                          <p className="mt-2 text-[11px] text-slate-400 italic">
                            "{videoScenes[activeVideoScene].prompt}"
                          </p>
                        </div>
                      </div>
                    )}

                    {/* View for Project 3: Custom CRM Workflow interactive pipeline */}
                    {isCrmProject && (
                      <div className="p-4 sm:p-6 rounded-2xl bg-[#08121a] border border-cyan-500/30 shadow-2xl relative overflow-hidden">
                        <div className="flex items-center justify-between pb-3 mb-4 border-b border-cyan-950/80 text-xs">
                          <div className="flex items-center gap-2">
                            <Workflow className="w-4 h-4 text-cyan-400" />
                            <span className="font-semibold text-cyan-300">Interactive CRM Kanban Test</span>
                          </div>
                          <span className="text-[11px] text-slate-400">Click lead to advance stage</span>
                        </div>

                        <div className="space-y-2.5">
                          {leads.map((lead) => (
                            <div
                              key={lead.id}
                              onClick={() => moveLeadNext(lead.id)}
                              className="p-3 rounded-xl bg-slate-900/90 border border-cyan-800/40 hover:border-cyan-400 cursor-pointer transition-all hover:bg-slate-850 flex items-center justify-between group"
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => e.key === 'Enter' && moveLeadNext(lead.id)}
                              aria-label={`Advance ${lead.name} in CRM pipeline`}
                            >
                              <div>
                                <div className="text-xs font-semibold text-white group-hover:text-cyan-300">
                                  {lead.name}
                                </div>
                                <div className="text-[11px] text-slate-400 mt-0.5">
                                  {lead.service}
                                </div>
                              </div>

                              <div className="text-right">
                                <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-medium ${
                                  lead.stage.includes('Won')
                                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/50'
                                    : 'bg-cyan-950 text-cyan-300 border border-cyan-800/40'
                                }`}>
                                  {lead.stage}
                                </span>
                                <div className="text-[10px] text-slate-400 mt-0.5">{lead.value}</div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 pt-3 border-t border-cyan-900/40 flex items-center justify-between text-[11px] text-slate-400">
                          <span className="text-cyan-400 flex items-center gap-1 font-mono">
                            <TrendingUp className="w-3.5 h-3.5" /> Pipeline Value: $3,550
                          </span>
                          <span className="text-slate-400">Instant Webhook Sync</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
