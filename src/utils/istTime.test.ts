import test from 'node:test';
import assert from 'node:assert/strict';
import { formatIstTime24h } from './istTime.ts';

test('formatIstTime24h converts UTC timestamps to 24-hour IST (UTC+05:30)', () => {
  // 00:00:00 UTC => 05:30:00 IST
  assert.equal(formatIstTime24h(new Date('2026-11-13T00:00:00Z')), '05:30:00');
  // 10:01:52 UTC => 15:31:52 IST
  assert.equal(formatIstTime24h(new Date('2026-11-13T10:01:52Z')), '15:31:52');
});

test('formatIstTime24h uses 00-23 hours at IST midnight and end of day', () => {
  // 18:30:00 UTC => 00:00:00 IST next day (never 24:00:00)
  assert.equal(formatIstTime24h(new Date('2026-11-13T18:30:00Z')), '00:00:00');
  // 18:29:59 UTC => 23:59:59 IST
  assert.equal(formatIstTime24h(new Date('2026-11-13T18:29:59Z')), '23:59:59');
  assert.match(formatIstTime24h(new Date()), /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/);
});
