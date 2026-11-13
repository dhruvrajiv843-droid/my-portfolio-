import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateCardTilt, getProjectAccentPalette } from './cardTilt';

const rect = { left: 100, top: 200, width: 400, height: 200 };

test('calculateCardTilt returns zero tilt and centered spotlight at card center', () => {
  const result = calculateCardTilt(300, 300, rect, 4);
  assert.deepEqual(result, {
    rotateX: 0,
    rotateY: 0,
    spotlightX: 50,
    spotlightY: 50,
  });
});

test('calculateCardTilt computes symmetric tilt within maxTiltDeg bounds and clamps outside pointer', () => {
  const topLeft = calculateCardTilt(100, 200, rect, 3.5);
  assert.deepEqual(topLeft, {
    rotateX: 3.5,
    rotateY: -3.5,
    spotlightX: 0,
    spotlightY: 0,
  });

  const farBottomRight = calculateCardTilt(999, 999, rect, 3.5);
  assert.deepEqual(farBottomRight, {
    rotateX: -3.5,
    rotateY: 3.5,
    spotlightX: 100,
    spotlightY: 100,
  });
});

test('calculateCardTilt handles zero-dimension rect safely', () => {
  const result = calculateCardTilt(150, 250, { left: 0, top: 0, width: 0, height: 0 }, 3.5);
  assert.deepEqual(result, {
    rotateX: 0,
    rotateY: 0,
    spotlightX: 50,
    spotlightY: 50,
  });
});

test('getProjectAccentPalette returns distinct category accents', () => {
  const web = getProjectAccentPalette('web');
  const ai = getProjectAccentPalette('ai-media');
  const auto = getProjectAccentPalette('automation');

  assert.notEqual(web.spotlightColor, ai.spotlightColor);
  assert.notEqual(ai.spotlightColor, auto.spotlightColor);
  assert.ok(web.hoverBorderClass.includes('blue'));
  assert.ok(ai.hoverBorderClass.includes('purple'));
  assert.ok(auto.hoverBorderClass.includes('cyan'));
});
