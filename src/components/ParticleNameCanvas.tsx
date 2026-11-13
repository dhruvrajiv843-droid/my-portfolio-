import React, { useEffect, useRef } from 'react';
import {
  computeParticleFontSize,
  computeWordmarkLines,
  PointerState,
  stepParticlePhysics,
  WordmarkParticle,
} from '../utils/particleText.ts';
import type { ThemeMode } from '../utils/theme.ts';

const DARK_PARTICLE_COLORS = [
  '255, 255, 255', // Crisp White
  '226, 232, 240', // Slate White
  '56, 189, 248',  // Electric Blue
  '96, 165, 250',  // Cobalt Blue
  '129, 140, 248', // Indigo
  '168, 85, 247',  // Electric Purple
];

const LIGHT_PARTICLE_COLORS = [
  '15, 23, 42',   // Slate 900
  '30, 41, 59',   // Slate 800
  '37, 99, 235',  // Cobalt Blue
  '59, 130, 246', // Bright Blue
  '79, 70, 229',  // Indigo
  '124, 58, 237', // Violet
];

const MAX_PARTICLES = 2400;

interface ParticleNameCanvasProps {
  theme: ThemeMode;
}

export const ParticleNameCanvas: React.FC<ParticleNameCanvasProps> = ({ theme }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const themeRef = useRef<ThemeMode>(theme);
  const drawStaticRef = useRef<(() => void) | null>(null);
  themeRef.current = theme;

  useEffect(() => {
    drawStaticRef.current?.();
  }, [theme]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationFrameId = 0;
    let resizeRafId = 0;
    let lastWidth = 0;
    let particlesByColor: Map<string, WordmarkParticle[]> = new Map();
    const pointer: PointerState = { x: -1000, y: -1000, active: false };

    const buildParticles = (explicitWidth?: number) => {
      const measuredWidth = explicitWidth ?? container.clientWidth;
      const width = Math.max(300, Math.floor(measuredWidth));
      if (width === lastWidth && particlesByColor.size > 0) return;
      lastWidth = width;
      const lines = computeWordmarkLines(width);
      const fontSize = computeParticleFontSize(width, lines);
      const lineHeight = Math.round(fontSize * 1.04);
      const height = lines.length > 1 ? Math.max(150, lineHeight * 2 + 12) : Math.max(132, fontSize + 24);

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Offscreen canvas to sample glyph pixel coordinates
      const offscreen = document.createElement('canvas');
      offscreen.width = width;
      offscreen.height = height;
      const offCtx = offscreen.getContext('2d');
      if (!offCtx) return;

      offCtx.clearRect(0, 0, width, height);
      offCtx.fillStyle = '#ffffff';
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';
      offCtx.font = `800 ${fontSize}px "Plus Jakarta Sans", system-ui, -apple-system, sans-serif`;

      if (lines.length === 1) {
        offCtx.fillText(lines[0], width / 2, height / 2);
      } else {
        const totalBlockHeight = lineHeight * (lines.length - 1);
        const startY = height / 2 - totalBlockHeight / 2;
        lines.forEach((line, idx) => {
          offCtx.fillText(line, width / 2, startY + idx * lineHeight);
        });
      }

      const imageData = offCtx.getImageData(0, 0, width, height).data;
      const gap = width < 640 ? 3 : 4;
      const rawPoints: Array<{ x: number; y: number }> = [];

      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const alphaByte = imageData[(y * width + x) * 4 + 3];
          if (alphaByte > 110) {
            rawPoints.push({ x, y });
          }
        }
      }

      const palette = themeRef.current === 'light' ? LIGHT_PARTICLE_COLORS : DARK_PARTICLE_COLORS;
      // Thin down deterministically if above MAX_PARTICLES so frame times stay <2ms even without GPU
      const stride = rawPoints.length > MAX_PARTICLES ? Math.ceil(rawPoints.length / MAX_PARTICLES) : 1;
      const nextBuckets = new Map<string, WordmarkParticle[]>();
      for (let idx = 0; idx < DARK_PARTICLE_COLORS.length; idx++) {
        nextBuckets.set(String(idx), []);
      }

      for (let i = 0; i < rawPoints.length; i += stride) {
        const pt = rawPoints[i];
        const jitterX = (Math.random() - 0.5) * (gap * 0.85);
        const jitterY = (Math.random() - 0.5) * (gap * 0.85);
        const originX = pt.x + jitterX;
        const originY = pt.y + jitterY;

        const colorRoll = Math.random();
        let colorIdx = 0;
        if (colorRoll > 0.72) {
          colorIdx = 2;
        } else if (colorRoll > 0.55) {
          colorIdx = 3;
        } else if (colorRoll > 0.44) {
          colorIdx = 5;
        } else if (colorRoll > 0.25) {
          colorIdx = 1;
        }

        const bucket = nextBuckets.get(String(colorIdx))!;
        bucket.push({
          x: reducedMotion ? originX : originX + (Math.random() - 0.5) * 32,
          y: reducedMotion ? originY : originY + (Math.random() - 0.5) * 22,
          originX,
          originY,
          vx: 0,
          vy: 0,
          size: Math.random() * 1.4 + 1.1,
          color: palette[colorIdx],
          alpha: Math.random() * 0.4 + 0.55,
          phase: Math.random() * Math.PI * 2,
        });
      }

      particlesByColor = nextBuckets;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    buildParticles();

    const drawStatic = () => {
      const width = parseFloat(canvas.style.width || '0');
      const height = parseFloat(canvas.style.height || '0');
      const palette = themeRef.current === 'light' ? LIGHT_PARTICLE_COLORS : DARK_PARTICLE_COLORS;
      const alpha = themeRef.current === 'light' ? 0.9 : 0.82;
      ctx.clearRect(0, 0, width, height);
      particlesByColor.forEach((bucket, key) => {
        const rgb = palette[Number(key)] ?? palette[0];
        ctx.fillStyle = `rgba(${rgb}, ${alpha})`;
        for (let i = 0; i < bucket.length; i++) {
          const p = bucket[i];
          ctx.fillRect(p.originX, p.originY, p.size, p.size);
        }
      });
    };

    const animate = (time: number) => {
      const width = parseFloat(canvas.style.width || '0');
      const height = parseFloat(canvas.style.height || '0');
      const palette = themeRef.current === 'light' ? LIGHT_PARTICLE_COLORS : DARK_PARTICLE_COLORS;
      const alpha = themeRef.current === 'light' ? 0.92 : 0.85;
      ctx.clearRect(0, 0, width, height);

      particlesByColor.forEach((bucket, key) => {
        const rgb = palette[Number(key)] ?? palette[0];
        ctx.fillStyle = `rgba(${rgb}, ${alpha})`;
        for (let i = 0; i < bucket.length; i++) {
          const p = bucket[i];
          stepParticlePhysics(p, pointer, time);
          ctx.fillRect(p.x, p.y, p.size, p.size);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    if (reducedMotion) {
      drawStaticRef.current = drawStatic;
      drawStatic();
    } else {
      drawStaticRef.current = null;
      animationFrameId = requestAnimationFrame(animate);
    }

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active =
        pointer.x >= -60 &&
        pointer.x <= rect.width + 60 &&
        pointer.y >= -60 &&
        pointer.y <= rect.height + 60;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    const resizeObserver = new ResizeObserver((entries) => {
      const entryWidth = entries[0]?.contentRect?.width;
      if (resizeRafId) cancelAnimationFrame(resizeRafId);
      resizeRafId = requestAnimationFrame(() => {
        resizeRafId = 0;
        buildParticles(entryWidth);
        if (reducedMotion) drawStatic();
      });
    });

    resizeObserver.observe(container);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (resizeRafId) cancelAnimationFrame(resizeRafId);
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full flex items-center justify-center select-none my-1 sm:my-2"
      data-testid="particle-name-canvas"
      aria-label="Dhruv Singh interactive particle typography"
    >
      <canvas ref={canvasRef} className="block max-w-full" />
    </div>
  );
};
