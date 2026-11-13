import test from 'node:test';
import assert from 'node:assert/strict';
import type { ContactFormData } from '../types.ts';
import {
  buildWhatsAppUrl,
  formatWhatsAppMessage,
  validateContactInquiry,
} from './whatsapp.ts';

test('formatWhatsAppMessage includes Name, Email, Service / Project, and Message cleanly', () => {
  const formatted = formatWhatsAppMessage({
    name: 'Riya Sharma',
    email: 'riya@acme.in',
    service: 'AI Website Design & Development',
    message: 'Looking for a fast landing page & CRM setup.',
  });

  assert.match(formatted, /Name: Riya Sharma/);
  assert.match(formatted, /Email: riya@acme\.in/);
  assert.match(formatted, /Service \/ Project: AI Website Design & Development/);
  assert.match(formatted, /Message: Looking for a fast landing page & CRM setup\./);
});

test('formatWhatsAppMessage supports Email / Phone and Estimated Budget fields', () => {
  const formatted = formatWhatsAppMessage({
    name: 'Karan Mehta',
    emailOrPhone: '+91 98765 43210',
    service: 'Custom CRM Setup',
    budget: '₹10,000 – ₹25,000',
    message: 'Need a custom pipeline for inbound leads.',
  });

  assert.match(formatted, /Name: Karan Mehta/);
  assert.match(formatted, /Email \/ Phone: \+91 98765 43210/);
  assert.match(formatted, /Service \/ Project: Custom CRM Setup/);
  assert.match(formatted, /Estimated Budget: ₹10,000 – ₹25,000/);
  assert.match(formatted, /Message: Need a custom pipeline for inbound leads\./);
});

test('validateContactInquiry catches missing required fields and accepts valid input', () => {
  const invalid = validateContactInquiry({
    name: 'A',
    emailOrPhone: '',
    service: '',
    message: 'Hi',
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.emailOrPhone);
  assert.ok(invalid.errors.message);

  const valid = validateContactInquiry({
    name: 'Aarav Patel',
    emailOrPhone: '+91 98765 43210',
    service: 'AI Video & Reels Creation',
    budget: 'Under ₹10,000',
    message: 'Interested in 4 vertical reels.',
  });
  assert.equal(valid.isValid, true);
  assert.deepEqual(valid.errors, {});
});

test('buildWhatsAppUrl returns https://wa.me/919152536895 with encoded text', () => {
  const sample: ContactFormData = {
    name: 'Alex & Co',
    email: 'alex@example.com',
    service: 'Custom CRM Setup',
    message: 'Need 100% automated lead routing?',
  };
  const url = buildWhatsAppUrl(sample);
  const expectedPrefix = 'https://wa.me/919152536895?text=';
  assert.ok(url.startsWith(expectedPrefix));
  const decoded = decodeURIComponent(url.slice(expectedPrefix.length));
  assert.equal(decoded, formatWhatsAppMessage(sample));
});

