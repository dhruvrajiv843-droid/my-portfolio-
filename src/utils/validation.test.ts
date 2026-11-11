import test from 'node:test';
import assert from 'node:assert/strict';
import { validateContactForm, sanitizeText } from './validation.ts';

test('validates valid contact form data successfully', () => {
  const validData = {
    name: 'Sarah Connor',
    email: 'sarah@example.com',
    service: 'AI Website Design & Development' as const,
    message: 'Need a fast landing page for my new AI startup.',
  };

  const result = validateContactForm(validData);
  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, {});
});

test('catches empty fields with appropriate error messages', () => {
  const emptyData = {
    name: '',
    email: '',
    service: '' as any,
    message: '',
  };

  const result = validateContactForm(emptyData);
  assert.equal(result.isValid, false);
  assert.ok(result.errors.name);
  assert.ok(result.errors.email);
  assert.ok(result.errors.service);
  assert.ok(result.errors.message);
});

test('catches invalid email format', () => {
  const invalidEmailData = {
    name: 'John Doe',
    email: 'not-an-email',
    service: 'Custom CRM Setup' as const,
    message: 'We want to organize 500 leads per month.',
  };

  const result = validateContactForm(invalidEmailData);
  assert.equal(result.isValid, false);
  assert.equal(result.errors.email, 'Please enter a valid email address.');
});

test('catches short messages', () => {
  const shortMessageData = {
    name: 'Alex',
    email: 'alex@example.com',
    service: 'AI Video & Reels Creation' as const,
    message: 'Hi there',
  };

  const result = validateContactForm(shortMessageData);
  assert.equal(result.isValid, false);
  assert.ok(result.errors.message?.includes('10 characters'));
});

test('sanitizeText strips control characters and trims', () => {
  const messy = '   Hello\u0000 World! \u0007   ';
  const clean = sanitizeText(messy);
  assert.equal(clean, 'Hello World!');
});
