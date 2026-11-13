import test from 'node:test';
import assert from 'node:assert/strict';
import {
  computeWordmarkLines,
  computeParticleFontSize,
  stepParticlePhysics,
  WordmarkParticle,
} from './particleText.ts';

test('computeWordmarkLines stacks on narrow mobile widths and stays single-line on desktop', () => {
  assert.deepEqual(computeWordmarkLines(390), ['DHRUV', 'SINGH']);
  assert.deepEqual(computeWordmarkLines(639), ['DHRUV', 'SINGH']);
  assert.deepEqual(computeWordmarkLines(640), ['DHRUV SINGH']);
  assert.deepEqual(computeWordmarkLines(1440), ['DHRUV SINGH']);
});

test('computeParticleFontSize scales within expected bounds', () => {
  const mobileSize = computeParticleFontSize(390, ['DHRUV', 'SINGH']);
  const desktopSize = computeParticleFontSize(1440, ['DHRUV SINGH']);

  assert.ok(mobileSize >= 46 && mobileSize <= 92);
  assert.ok(desktopSize >= 56 && desktopSize <= 148);
  assert.ok(desktopSize > mobileSize);
});

test('stepParticlePhysics repels particle when pointer is nearby and springs back when inactive', () => {
  const particle: WordmarkParticle = {
    x: 100,
    y: 100,
    originX: 100,
    originY: 100,
    vx: 0,
    vy: 0,
    size: 1.5,
    color: '56, 189, 248',
    alpha: 0.9,
    phase: 0,
  };

  // Pointer just to the left of particle should push particle right (+x)
  stepParticlePhysics(particle, { x: 85, y: 100, active: true }, 0);
  assert.ok(particle.x > 100, 'Particle should be pushed away from pointer');

  // With pointer inactive, particle should pull back toward origin over frames
  const displacedX = particle.x;
  for (let i = 0; i < 30; i++) {
    stepParticlePhysics(particle, { x: -1000, y: -1000, active: false }, 0);
  }
  assert.ok(
    Math.abs(particle.x - particle.originX) < Math.abs(displacedX - particle.originX),
    'Particle should spring back toward its origin'
  );
});
