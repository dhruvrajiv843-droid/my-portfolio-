import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ParticlesProvider, Particles } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Engine, ISourceOptions } from '@tsparticles/engine';
import type { ThemeMode } from '../utils/theme.ts';

interface ParticleCanvasProps {
  theme: ThemeMode;
}

export const ParticleCanvas: React.FC<ParticleCanvasProps> = ({ theme }) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const initParticles = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const isLight = theme === 'light';

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: false, zIndex: 0 },
      fpsLimit: 60,
      particles: {
        number: {
          value: 95,
          density: {
            enable: true,
            width: 1280,
            height: 800,
          },
        },
        color: {
          value: isLight
            ? ['#334155', '#2563eb', '#4f46e5', '#7c3aed']
            : ['#e2e8f0', '#93c5fd', '#38bdf8', '#a855f7'],
        },
        shape: {
          type: 'circle',
        },
        opacity: {
          value: isLight ? { min: 0.25, max: 0.6 } : { min: 0.22, max: 0.62 },
          animation: {
            enable: !prefersReducedMotion,
            speed: 0.55,
            sync: false,
          },
        },
        size: {
          value: { min: 1, max: 2.3 },
        },
        links: {
          enable: true,
          distance: 135,
          color: isLight ? '#3b82f6' : '#60a5fa',
          opacity: isLight ? 0.22 : 0.18,
          width: 0.9,
        },
        move: {
          enable: !prefersReducedMotion,
          speed: 0.55,
          direction: 'none',
          random: true,
          straight: false,
          outModes: {
            default: 'out',
          },
        },
      },
      interactivity: {
        detectsOn: 'window',
        events: {
          onHover: {
            enable: !prefersReducedMotion,
            mode: 'grab',
          },
          resize: {
            enable: true,
          },
        },
        modes: {
          grab: {
            distance: 155,
            links: {
              opacity: isLight ? 0.48 : 0.42,
              color: isLight ? '#2563eb' : '#38bdf8',
            },
          },
        },
      },
      detectRetina: true,
    }),
    [prefersReducedMotion, isLight]
  );

  return (
    <div
      data-testid="hero-particle-bg"
      aria-hidden="true"
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
    >
      <ParticlesProvider init={initParticles}>
        <Particles
          id="tsparticles-hero"
          className="w-full h-full"
          options={options}
        />
      </ParticlesProvider>
    </div>
  );
};

