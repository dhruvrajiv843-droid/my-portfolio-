import React, { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react';
import { CheckCircle2, ChevronDown, Sparkles } from 'lucide-react';
import { ProjectItem } from '../types.ts';
import { calculateCardTilt, getProjectAccentPalette } from '../utils/cardTilt.ts';

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  actions: React.ReactNode;
  preview: React.ReactNode;
}

const SPRING_CONFIG = { stiffness: 240, damping: 24, mass: 0.6 };

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  actions,
  preview,
}) => {
  const cardRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [isPinnedOpen, setIsPinnedOpen] = useState(false);

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const spotlightX = useMotionValue(50);
  const spotlightY = useMotionValue(50);

  const rotateX = useSpring(rawRotateX, SPRING_CONFIG);
  const rotateY = useSpring(rawRotateY, SPRING_CONFIG);

  const palette = getProjectAccentPalette(project.category);

  const spotlightGradient = useMotionTemplate`radial-gradient(560px circle at ${spotlightX}% ${spotlightY}%, ${palette.spotlightColor}, transparent 68%)`;

  const showDetails = isHovered || isPinnedOpen;
  const hasRevealableDetails =
    Boolean(project.techStack?.length) || Boolean(project.architectureNote);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (prefersReducedMotion || e.pointerType === 'touch') return;
    const node = cardRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const tilt = calculateCardTilt(e.clientX, e.clientY, rect, 2.0);
    rawRotateX.set(tilt.rotateX);
    rawRotateY.set(tilt.rotateY);
    spotlightX.set(tilt.spotlightX);
    spotlightY.set(tilt.spotlightY);
  };

  const resetTilt = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
    spotlightX.set(50);
    spotlightY.set(50);
  };

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0.12 : 0.24,
        delay: prefersReducedMotion ? 0 : index * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ perspective: 1200 }}
    >
      <motion.article
        ref={cardRef}
        data-testid={`project-card-${project.id}`}
        data-hovered={isHovered ? 'true' : 'false'}
        onPointerEnter={(e) => {
          if (e.pointerType !== 'touch') {
            setIsHovered(true);
          }
        }}
        onPointerMove={handlePointerMove}
        onPointerLeave={() => {
          setIsHovered(false);
          resetTilt();
        }}
        whileHover={prefersReducedMotion ? undefined : { y: -4 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        style={{
          rotateX: prefersReducedMotion ? 0 : rotateX,
          rotateY: prefersReducedMotion ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        className={`group/card relative p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/55 border border-slate-200 dark:border-slate-800/90 shadow-lg shadow-slate-200/50 dark:shadow-xl backdrop-blur-sm transition-colors duration-300 overflow-hidden ${palette.hoverBorderClass}`}
      >
        {/* Cursor-tracking spotlight overlay */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: spotlightGradient,
            opacity: isHovered ? 1 : 0,
          }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Project Details */}
          <div className="lg:col-span-6 space-y-4">
            {/* Tag + Category Text + Subtle Stack Reveal Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-mono">
                <span className="text-blue-600 dark:text-blue-400 font-semibold">{project.tag}</span>
                <span>·</span>
                <span>{project.badge}</span>
              </div>

              {hasRevealableDetails && (
                <button
                  type="button"
                  onClick={() => setIsPinnedOpen((prev) => !prev)}
                  aria-expanded={showDetails}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/70 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/70 transition-colors"
                >
                  <Sparkles className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                  <span>{isPinnedOpen ? 'Hide Stack' : 'Stack & Notes'}</span>
                  <motion.span
                    animate={{ rotate: showDetails ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="inline-flex"
                  >
                    <ChevronDown className="w-3 h-3" />
                  </motion.span>
                </button>
              )}
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              {project.title}
            </h3>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              {project.description}
            </p>

            {/* Key Highlights */}
            <div className="space-y-2 pt-2">
              {project.highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>

            {/* Metrics Strip */}
            {project.metrics && (
              <div className="grid grid-cols-3 gap-3 pt-3">
                {project.metrics.map((m, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 text-left transition-colors"
                  >
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">{m.label}</div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5">{m.value}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Hover / Focus / Toggle Detail Reveal Drawer */}
            <AnimatePresence initial={false}>
              {showDetails && hasRevealableDetails && (
                <motion.div
                  key="project-extra-details"
                  data-testid={`project-details-${project.id}`}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0, y: 6 }}
                  animate={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : { opacity: 1, height: 'auto', y: 0 }
                  }
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0, y: 4 }}
                  transition={{ duration: prefersReducedMotion ? 0.1 : 0.26, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mt-2 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/75 border border-slate-200 dark:border-slate-800/90 space-y-2.5">
                    {project.techStack && project.techStack.length > 0 && (
                      <div>
                        <div className={`text-[10px] font-mono uppercase tracking-wider mb-1.5 ${palette.badgeTextClass}`}>
                          Stack &amp; Tooling
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className={`px-2 py-0.5 rounded-md text-[11px] font-mono border ${palette.chipClass}`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {project.architectureNote && (
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-slate-800/80 pt-2">
                        <span className="font-semibold text-slate-900 dark:text-white">Delivery Note: </span>
                        {project.architectureNote}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">{actions}</div>
          </div>

          {/* Right Column: Visual Demonstration / Interactive Preview */}
          <motion.div
            className="lg:col-span-6"
            animate={
              isHovered && !prefersReducedMotion
                ? { scale: 1.012, y: -2 }
                : { scale: 1, y: 0 }
            }
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {preview}
          </motion.div>
        </div>
      </motion.article>
    </motion.div>
  );
};
