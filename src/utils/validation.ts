import { ContactFormData, ValidationResult } from '../types.ts';

/**
 * Validates the contact form inputs according to requirements:
 * - name: required, at least 2 characters
 * - email: required, must be valid email format
 * - service: required (must be selected)
 * - message: required, at least 10 characters
 */
export function validateContactForm(data: ContactFormData): ValidationResult {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};

  const trimmedName = data.name.trim();
  if (!trimmedName) {
    errors.name = 'Please provide your name.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  const trimmedEmail = data.email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!trimmedEmail) {
    errors.email = 'Please provide your email address.';
  } else if (!emailRegex.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!data.service) {
    errors.service = 'Please select a service or reason for reaching out.';
  }

  const trimmedMessage = data.message.trim();
  if (!trimmedMessage) {
    errors.message = 'Please include a brief message or project description.';
  } else if (trimmedMessage.length < 10) {
    errors.message = 'Message should be at least 10 characters so I have enough context.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Cleans string input by stripping unwanted control characters and trimming
 */
export function sanitizeText(input: string): string {
  return input.replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F]/g, '').trim();
}
