import { ProjectCategory } from '../types.ts';

export interface TiltRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface TiltResult {
  rotateX: number;
  rotateY: number;
  spotlightX: number;
  spotlightY: number;
}

/**
 * Computes subtle 3D perspective tilt angles (in degrees) and cursor-relative
 * spotlight percentages (0..100) from pointer coordinates and a bounding rect.
 */
export function calculateCardTilt(
  clientX: number,
  clientY: number,
  rect: TiltRect,
  maxTiltDeg = 3.5,
): TiltResult {
  if (rect.width <= 0 || rect.height <= 0 || maxTiltDeg <= 0) {
    return { rotateX: 0, rotateY: 0, spotlightX: 50, spotlightY: 50 };
  }

  const normalizedX = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
  const normalizedY = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height));

  // Center is (0.5, 0.5). Top edge tilts forward (+rotateX), right edge tilts right (+rotateY).
  const offsetX = (normalizedX - 0.5) * 2; // -1 .. 1
  const offsetY = (normalizedY - 0.5) * 2; // -1 .. 1

  const rotateX = Number((-offsetY * maxTiltDeg).toFixed(3));
  const rotateY = Number((offsetX * maxTiltDeg).toFixed(3));
  const spotlightX = Number((normalizedX * 100).toFixed(2));
  const spotlightY = Number((normalizedY * 100).toFixed(2));

  return {
    rotateX: Object.is(rotateX, -0) ? 0 : rotateX,
    rotateY: Object.is(rotateY, -0) ? 0 : rotateY,
    spotlightX,
    spotlightY,
  };
}

export interface ProjectAccentPalette {
  spotlightColor: string;
  hoverBorderClass: string;
  badgeTextClass: string;
  chipClass: string;
}

export function getProjectAccentPalette(category: ProjectCategory): ProjectAccentPalette {
  switch (category) {
    case 'ai-media':
      return {
        spotlightColor: 'rgba(168, 85, 247, 0.14)',
        hoverBorderClass: 'hover:border-purple-500/45',
        badgeTextClass: 'text-purple-700 dark:text-purple-300',
        chipClass: 'bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-700/40 text-purple-800 dark:text-purple-200',
      };
    case 'automation':
      return {
        spotlightColor: 'rgba(34, 211, 238, 0.14)',
        hoverBorderClass: 'hover:border-cyan-500/45',
        badgeTextClass: 'text-cyan-700 dark:text-cyan-300',
        chipClass: 'bg-cyan-50 dark:bg-cyan-950/60 border-cyan-200 dark:border-cyan-700/40 text-cyan-800 dark:text-cyan-200',
      };
    case 'web':
    default:
      return {
        spotlightColor: 'rgba(59, 130, 246, 0.15)',
        hoverBorderClass: 'hover:border-blue-500/45',
        badgeTextClass: 'text-blue-700 dark:text-blue-300',
        chipClass: 'bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-700/40 text-blue-800 dark:text-blue-200',
      };
  }
}
