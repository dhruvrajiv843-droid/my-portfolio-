export interface WordmarkParticle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  phase: number;
}

export interface PointerState {
  x: number;
  y: number;
  active: boolean;
}

/**
 * Determines how to split the particle wordmark based on container width.
 */
export function computeWordmarkLines(containerWidth: number): string[] {
  if (containerWidth < 640) {
    return ['DHRUV', 'SINGH'];
  }
  return ['DHRUV SINGH'];
}

/**
 * Computes a responsive font size so the particle wordmark fits cleanly inside the canvas.
 */
export function computeParticleFontSize(containerWidth: number, lines: string[]): number {
  const longestLineLength = Math.max(...lines.map((l) => l.length));
  // Approximate aspect ratio of bold uppercase display characters (~0.68em average width)
  const targetWidth = containerWidth * 0.9;
  const estimatedFromWidth = targetWidth / (longestLineLength * 0.68);
  const maxCap = lines.length > 1 ? 92 : 148;
  const minCap = lines.length > 1 ? 46 : 56;
  return Math.round(Math.max(minCap, Math.min(maxCap, estimatedFromWidth)));
}

/**
 * Advances a single wordmark particle by one frame using spring-back and pointer repulsion.
 */
export function stepParticlePhysics(
  p: WordmarkParticle,
  pointer: PointerState,
  time: number,
  repelRadius = 95,
  spring = 0.085,
  friction = 0.82
): void {
  if (pointer.active) {
    const dx = p.x - pointer.x;
    const dy = p.y - pointer.y;
    const distSq = dx * dx + dy * dy;
    const radiusSq = repelRadius * repelRadius;

    if (distSq < radiusSq && distSq > 0.001) {
      const dist = Math.sqrt(distSq);
      const force = ((repelRadius - dist) / repelRadius) * 6.5;
      p.vx += (dx / dist) * force;
      p.vy += (dy / dist) * force;
    }
  }

  // Subtle organic drift around origin so the wordmark feels alive
  const driftX = Math.sin(time * 0.0014 + p.phase) * 0.6;
  const driftY = Math.cos(time * 0.0012 + p.phase * 1.3) * 0.6;

  const targetX = p.originX + driftX;
  const targetY = p.originY + driftY;

  p.vx += (targetX - p.x) * spring;
  p.vy += (targetY - p.y) * spring;

  p.vx *= friction;
  p.vy *= friction;

  p.x += p.vx;
  p.y += p.vy;
}
