import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateScrollProgress, toProgressPercent } from './scrollProgress.ts';

test('calculateScrollProgress returns 0 at top or for non-scrollable viewports', () => {
  assert.equal(calculateScrollProgress(0, 3000, 900), 0);
  assert.equal(calculateScrollProgress(-50, 3000, 900), 0);
  assert.equal(calculateScrollProgress(100, 900, 900), 0);
  assert.equal(calculateScrollProgress(100, 700, 900), 0);
});

test('calculateScrollProgress computes intermediate and bottom clamped ratios', () => {
  assert.equal(calculateScrollProgress(500, 2000, 1000), 0.5);
  assert.equal(calculateScrollProgress(2100, 3000, 900), 1);
  assert.equal(calculateScrollProgress(2500, 3000, 900), 1);
});

test('toProgressPercent clamps and rounds cleanly to 0-100', () => {
  assert.equal(toProgressPercent(0), 0);
  assert.equal(toProgressPercent(0.456), 46);
  assert.equal(toProgressPercent(1), 100);
  assert.equal(toProgressPercent(1.5), 100);
  assert.equal(toProgressPercent(-0.2), 0);
});
