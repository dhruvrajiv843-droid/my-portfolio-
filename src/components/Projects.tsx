import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { 
  ExternalLink, 
  Github, 
  Play, 
  Pause, 
  Monitor, 
  TrendingUp,
  Workflow
} from 'lucide-react';
import { PROJECTS } from '../data/portfolioData.ts';
import { ProjectCategory, ProjectItem } from '../types.ts';
import { ProjectCard } from './ProjectCard.tsx';

interface ProjectsProps {
  onOpenProjectModal?: (project: ProjectItem) => void;
  onContactClick: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onContactClick }) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  
  // Interactive state for Project 2: AI Video & Reels player (plays silently without sound)
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlayingReel, setIsPlayingReel] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const [activeVideoScene, setActiveVideoScene] = useState(0);
  const [reelAspectRatio, setReelAspectRatio] = useState<'9:16' | '16:9'>('9:16');

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;
    videoEl.defaultMuted = true;
    videoEl.muted = true;
    videoEl.volume = 0;
  }, []);

  const togglePlayReel = () => {
    const videoEl = videoRef.current;
    setIsPlayingReel((prev) => {
      const next = !prev;
      if (videoEl) {
        videoEl.muted = true;
        videoEl.volume = 0;
        if (next) {
          videoEl.play().catch(() => {});
        } else {
          videoEl.pause();
        }
      }
      return next;
    });
  };

  // Interactive state for Project 3: CRM pipeline lead movement
  const [leads, setLeads] = useState([
    { id: '1', name: 'Acme SaaS Corp', service: 'AI Website Redesign', stage: 'New Lead', amountInr: 102000 },
    { id: '2', name: 'Kinetics Studio', service: 'Viral Reels Campaign', stage: 'Contacted', amountInr: 72250 },
    { id: '3', name: 'Nexus Fitness', service: 'Custom CRM Pipeline', stage: 'Proposal Sent', amountInr: 127500 },
  ]);

  const formatInr = (amount: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);

  const totalPipelineInr = leads.reduce((sum, lead) => sum + lead.amountInr, 0);

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
    <section id="projects" className="py-24 relative border-t border-slate-200 dark:border-slate-800/60 scroll-mt-20 bg-[var(--bg-page)] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            Selected Works
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Projects Showcase
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-base">
            Real code, AI generative media workflows, and automated systems built for scale.
          </p>
        </div>

        {/* Interactive Filter Tabs (Buttons with animated active background) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          {(
            [
              { id: 'all', label: 'All Projects', activeBg: 'bg-blue-600 shadow-blue-600/30' },
              { id: 'web', label: 'Web Dev', activeBg: 'bg-blue-600 shadow-blue-600/30' },
              { id: 'ai-media', label: 'AI Media', activeBg: 'bg-purple-600 shadow-purple-600/30' },
              { id: 'automation', label: 'Automation', activeBg: 'bg-cyan-600 shadow-cyan-600/30' },
            ] as const
          ).map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'bg-white dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm dark:shadow-none'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-project-filter"
                    transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                    className={`absolute inset-0 rounded-xl shadow-md ${tab.activeBg}`}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Project Cards List */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-12"
        >
            {filteredProjects.map((project, index) => {
              const isWebProject = project.id === 'live-website-project';
              const isVideoProject = project.id === 'ai-video-reels-campaign';
              const isCrmProject = project.id === 'custom-crm-workflow';

              const actions = (
                <>
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
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all"
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
                        onClick={togglePlayReel}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500 shadow-md shadow-purple-600/30 transition-all"
                      >
                        {isPlayingReel ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        <span>{isPlayingReel ? 'Pause Showcase' : 'Play Showcase'}</span>
                      </button>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all"
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
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all"
                      >
                        <Github className="w-4 h-4" />
                        <span>Pipeline Architecture</span>
                      </a>
                    </>
                  )}
                </>
              );

              const preview = (
                <>
                  {/* View for Project 1: FlowDesk Live Website Sample preview */}
                  {isWebProject && (
                    <div className="p-4 sm:p-6 rounded-2xl bg-[#0b101d] border border-blue-500/30 shadow-2xl relative overflow-hidden">
                        <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-800 text-xs text-slate-400">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 shrink-0" />
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 shrink-0" />
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 shrink-0" />
                            <span className="ml-1.5 font-mono text-slate-300 text-[11px] sm:text-xs truncate">
                              flowdesk...asia-southeast1.run.app
                            </span>
                          </div>
                          <span className="text-emerald-400 font-mono text-[10px] sm:text-[11px] font-semibold shrink-0">
                            <span className="hidden sm:inline">LIVE SAMPLE · </span>200 OK
                          </span>
                        </div>

                        {/* Miniature FlowDesk SaaS website preview surface */}
                        <div className="rounded-xl bg-slate-950 p-4 border border-slate-800/80 space-y-3">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white">
                                F
                              </span>
                              <span className="text-xs font-semibold text-white">FlowDesk</span>
                            </div>
                            <span className="px-2 py-0.5 rounded bg-blue-500/15 border border-blue-500/30 text-[10px] font-mono text-blue-300">
                              Team Workspace
                            </span>
                          </div>

                          <div className="text-[11px] text-slate-400 leading-snug">
                            Plan sprints, collaborate in real time, and ship faster.
                          </div>

                          <div className="grid grid-cols-3 gap-2 pt-1">
                            <div className="h-16 rounded-lg bg-slate-900 border border-slate-800 p-2 flex flex-col justify-between">
                              <span className="text-[10px] font-mono text-blue-400">Backlog</span>
                              <span className="text-[11px] font-semibold text-slate-200">6 Tasks</span>
                            </div>
                            <div className="h-16 rounded-lg bg-slate-900 border border-slate-800 p-2 flex flex-col justify-between">
                              <span className="text-[10px] font-mono text-purple-400">In Review</span>
                              <span className="text-[11px] font-semibold text-slate-200">4 Active</span>
                            </div>
                            <div className="h-16 rounded-lg bg-slate-900 border border-slate-800 p-2 flex flex-col justify-between">
                              <span className="text-[10px] font-mono text-emerald-400">Shipped</span>
                              <span className="text-[11px] font-semibold text-slate-200">12 Done</span>
                            </div>
                          </div>

                          <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/60">
                            <span className="flex items-center gap-1 text-blue-400">
                              <Monitor className="w-3.5 h-3.5" /> Live SaaS Sample Site
                            </span>
                            <a
                              href={project.liveDemoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 font-mono text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                            >
                              <span>Open Site</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
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

                        {/* Video Player Preview Box (9:16 / 16:9) */}
                        <div
                          className={`relative mx-auto rounded-xl bg-gradient-to-br from-slate-950 via-purple-950/40 to-slate-900 border border-purple-800/40 overflow-hidden transition-all ${
                            reelAspectRatio === '9:16' ? 'w-full max-w-[190px] aspect-[9/16]' : 'h-48 w-full'
                          }`}
                        >
                          <video
                            ref={videoRef}
                            src="/assets/aistudio/gemini_generated_video_25b540b9_b483825b.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            onLoadedData={() => {
                              const vid = videoRef.current;
                              if (vid) {
                                vid.muted = true;
                                vid.volume = 0;
                                if (isPlayingReel && vid.paused) {
                                  vid.play().catch(() => {});
                                }
                              }
                              setVideoReady(true);
                            }}
                            onVolumeChange={(e) => {
                              const vid = e.currentTarget;
                              if (!vid.muted || vid.volume !== 0) {
                                vid.muted = true;
                                vid.volume = 0;
                              }
                            }}
                            onError={() => setVideoReady(false)}
                            onClick={togglePlayReel}
                            className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                            aria-label="AI Video and Reels Campaign silent preview player"
                          />

                          {/* Subtle top-left timing tag */}
                          <div className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-md bg-slate-950/65 backdrop-blur-sm border border-purple-500/20 text-[10px] font-mono text-purple-200 pointer-events-none">
                            {videoScenes[activeVideoScene].duration}
                          </div>

                          {/* Fallback overlay if video fails to load */}
                          {!videoReady && (
                            <div className="relative z-10 h-full w-full p-4 flex flex-col justify-between pointer-events-none">
                              <div className="h-5" />
                              <div className="text-center py-2 pointer-events-auto">
                                <button
                                  type="button"
                                  onClick={togglePlayReel}
                                  className="w-11 h-11 mx-auto rounded-full bg-purple-600/90 text-white flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-purple-600/50"
                                  aria-label={isPlayingReel ? 'Pause video' : 'Play video'}
                                >
                                  {isPlayingReel ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                                </button>
                                <div className="mt-2 text-xs font-semibold text-white">
                                  {videoScenes[activeVideoScene].title}
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
                          )}
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
                                <div className="text-[10px] text-slate-400 mt-0.5">{formatInr(lead.amountInr)}</div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 pt-3 border-t border-cyan-900/40 flex items-center justify-between text-[11px] text-slate-400">
                          <span className="text-cyan-400 flex items-center gap-1 font-mono">
                            <TrendingUp className="w-3.5 h-3.5" /> Pipeline Value: {formatInr(totalPipelineInr)}
                          </span>
                          <span className="text-slate-400">Instant Webhook Sync</span>
                        </div>
                      </div>
                    )}
                </>
              );

              return (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  actions={actions}
                  preview={preview}
                />
              );
            })}
        </motion.div>
      </div>
    </section>
  );
};
