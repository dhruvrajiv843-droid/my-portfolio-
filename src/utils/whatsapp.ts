import type { ServiceType } from '../types.ts';

export interface WhatsAppInquiryData {
  name: string;
  email?: string;
  emailOrPhone?: string;
  service: ServiceType | '' | string;
  budget?: string;
  message: string;
}

export interface ContactInquiryErrors {
  name?: string;
  emailOrPhone?: string;
  message?: string;
}

export function validateContactInquiry(data: WhatsAppInquiryData): {
  isValid: boolean;
  errors: ContactInquiryErrors;
} {
  const errors: ContactInquiryErrors = {};

  const trimmedName = data.name.trim();
  if (!trimmedName) {
    errors.name = 'Please enter your full name.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  const contact = (data.emailOrPhone ?? data.email ?? '').trim();
  if (!contact) {
    errors.emailOrPhone = 'Please enter your email address or phone number.';
  } else if (contact.length < 5) {
    errors.emailOrPhone = 'Please enter a valid email address or phone number.';
  }

  const trimmedMessage = data.message.trim();
  if (!trimmedMessage) {
    errors.message = 'Please include a short message about your project or inquiry.';
  } else if (trimmedMessage.length < 5) {
    errors.message = 'Message must be at least 5 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Formats contact form fields into a clean plain-text message for WhatsApp.
 */
export function formatWhatsAppMessage(data: WhatsAppInquiryData): string {
  const lines = [
    'Hello Dhruv, I would like to connect regarding a project/inquiry:',
    '',
    `Name: ${data.name.trim()}`,
  ];

  if (data.emailOrPhone !== undefined) {
    lines.push(`Email / Phone: ${data.emailOrPhone.trim()}`);
  } else if (data.email !== undefined) {
    lines.push(`Email: ${data.email.trim()}`);
  }

  lines.push(`Service / Project: ${data.service ? data.service : 'General Inquiry'}`);

  if (data.budget && data.budget.trim()) {
    lines.push(`Estimated Budget: ${data.budget.trim()}`);
  }

  lines.push(`Message: ${data.message.trim()}`);

  return lines.join('\n');
}

export const WHATSAPP_BASE_URL = 'https://wa.me/919152536895';

/**
 * Builds the WhatsApp wa.me chat URL for Dhruv Singh with the URL-encoded formatted message.
 */
export function buildWhatsAppUrl(data: WhatsAppInquiryData): string {
  const formattedMessage = formatWhatsAppMessage(data);
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(formattedMessage)}`;
}

