import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { calculateScrollProgress, toProgressPercent } from '../utils/scrollProgress.ts';

export const ScrollProgressBar: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 32,
    restDelta: 0.001,
  });

  const [percent, setPercent] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const updatePercent = () => {
      rafId = 0;
      const doc = document.documentElement;
      const nextPercent = toProgressPercent(
        calculateScrollProgress(window.scrollY, doc.scrollHeight, window.innerHeight)
      );
      setPercent((prev) => (prev === nextPercent ? prev : nextPercent));
    };

    const scheduleUpdate = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updatePercent);
      }
    };

    updatePercent();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <div
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      data-testid="scroll-progress-bar"
      data-progress={percent}
      className="fixed top-0 left-0 right-0 z-[60] h-[2.5px] bg-slate-200/70 dark:bg-slate-900/50 pointer-events-none"
    >
      <motion.div
        data-testid="scroll-progress-fill"
        style={{ scaleX: prefersReducedMotion ? scrollYProgress : smoothProgress }}
        className="h-full w-full origin-left bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 shadow-[0_0_8px_rgba(56,189,248,0.45)] will-change-transform"
      />
    </div>
  );
};
