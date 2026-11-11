import React, { useMemo } from 'react';
import { ParticlesProvider, Particles } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Engine, ISourceOptions } from '@tsparticles/engine';

export const ParticleCanvas: React.FC = () => {
  const initParticles = async (engine: Engine) => {
    await loadSlim(engine);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: false, zIndex: 0 },
      fpsLimit: 60,
      particles: {
        number: {
          value: 45,
          density: {
            enable: true,
          },
        },
        color: {
          value: ['#38bdf8', '#818cf8', '#a855f7'],
        },
        shape: {
          type: 'circle',
        },
        opacity: {
          value: { min: 0.25, max: 0.65 },
        },
        size: {
          value: { min: 1.2, max: 2.8 },
        },
        links: {
          enable: true,
          distance: 115,
          color: '#93c5fd',
          opacity: 0.2,
          width: 0.8,
        },
        move: {
          enable: true,
          speed: 0.7,
          direction: 'none',
          random: false,
          straight: false,
          outModes: {
            default: 'bounce',
          },
        },
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: 'grab',
          },
        },
        modes: {
          grab: {
            distance: 140,
            links: {
              opacity: 0.45,
              color: '#38bdf8',
            },
          },
        },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none [&_canvas]:pointer-events-auto">
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
