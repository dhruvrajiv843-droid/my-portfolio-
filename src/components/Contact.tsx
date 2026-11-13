import React, { useState } from 'react';
import { 
  Mail, 
  Github, 
  Linkedin, 
  Send, 
  Clock, 
  ArrowRight,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { PERSONAL_INFO, SERVICES } from '../data/portfolioData.ts';
import { ServiceType } from '../types.ts';
import {
  buildWhatsAppUrl,
  formatWhatsAppMessage,
  validateContactInquiry,
  type ContactInquiryErrors,
} from '../utils/whatsapp.ts';

interface ContactProps {
  selectedService: ServiceType | '';
  onServiceChange: (service: ServiceType | '') => void;
}

const BUDGET_OPTIONS = [
  'Under ₹10,000',
  '₹10,000 – ₹25,000',
  '₹25,000 – ₹50,000',
  '₹50,000+ / Retainer',
  'Internship / Open Discussion',
];

export const Contact: React.FC<ContactProps> = ({ selectedService, onServiceChange }) => {
  const [name, setName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [service, setService] = useState<string>(selectedService);
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<ContactInquiryErrors>({});
  const [submittedLinks, setSubmittedLinks] = useState<{
    whatsappUrl: string;
    mailtoUrl: string;
  } | null>(null);

  // Sync when prop changes
  React.useEffect(() => {
    if (selectedService) {
      setService(selectedService);
    }
  }, [selectedService]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inquiry = {
      name,
      emailOrPhone,
      service,
      budget,
      message,
    };

    const validation = validateContactInquiry(inquiry);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setSubmittedLinks(null);
      return;
    }

    setErrors({});
    const whatsappUrl = buildWhatsAppUrl(inquiry);
    const formattedBody = formatWhatsAppMessage(inquiry);
    const subject = encodeURIComponent(`New Portfolio Inquiry from ${name.trim()}`);
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${encodeURIComponent(formattedBody)}`;

    setSubmittedLinks({ whatsappUrl, mailtoUrl });

    try {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } catch {
      // Fallback link remains rendered below if popup is blocked inside iframe
    }
  };

  return (
    <section id="contact" className="py-24 relative border-t border-slate-200 dark:border-slate-800/60 bg-[var(--bg-section-alt)] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Contact Me
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-lg">
            Have a project in mind or looking for an intern? Feel free to reach out!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Links & Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 backdrop-blur-sm shadow-lg shadow-slate-200/40 dark:shadow-none">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                Let&apos;s Build Something Together
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                Whether you need a high-converting website, an AI video reel package, custom CRM automation, or an ambitious engineering intern on your team, my inbox is open.
              </p>

              {/* Direct Links List */}
              <div className="space-y-4">
                {/* Email Direct Link */}
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="group flex items-center gap-4 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 hover:border-blue-400 dark:hover:border-blue-500/50 transition-all"
                  aria-label={`Send email to ${PERSONAL_INFO.email}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 dark:group-hover:bg-blue-500 group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Direct Email</div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                      {PERSONAL_INFO.email}
                    </div>
                  </div>
                </a>

                {/* GitHub Direct Link */}
                <a
                  href={PERSONAL_INFO.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 hover:border-purple-400 dark:hover:border-purple-500/50 transition-all"
                  aria-label="Dhruv Singh GitHub profile"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 dark:group-hover:bg-purple-500 group-hover:text-white transition-colors">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Code &amp; Open Source</div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                      github.com/dhruvrajiv843-droid
                    </div>
                  </div>
                </a>

                {/* LinkedIn Direct Link */}
                <a
                  href={PERSONAL_INFO.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 hover:border-indigo-400 dark:hover:border-indigo-500/50 transition-all"
                  aria-label="Dhruv Singh LinkedIn profile"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Professional Network</div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                      linkedin.com/in/dhruv-singh-363724417
                    </div>
                  </div>
                </a>
              </div>

              {/* Response Time Indicator */}
              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-400">
                <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Quick turnaround: I usually respond within 24 hours.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-2xl relative">
              {/* Contact Form */}
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Full Name field */}
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Full Name <span className="text-rose-500 dark:text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="Name"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    placeholder="e.g. Alex Rivera"
                    aria-invalid={Boolean(errors.name)}
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-1 transition-all ${
                      errors.name
                        ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500'
                        : 'border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:ring-blue-500'
                    }`}
                  />
                  {errors.name && (
                    <p role="alert" className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email / Phone field */}
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Email / Phone <span className="text-rose-500 dark:text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="Email_or_Phone"
                    required
                    value={emailOrPhone}
                    onChange={(e) => {
                      setEmailOrPhone(e.target.value);
                      if (errors.emailOrPhone) setErrors((prev) => ({ ...prev, emailOrPhone: undefined }));
                    }}
                    placeholder="alex@company.com or +91 98765 43210"
                    aria-invalid={Boolean(errors.emailOrPhone)}
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-1 transition-all ${
                      errors.emailOrPhone
                        ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500'
                        : 'border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:ring-blue-500'
                    }`}
                  />
                  {errors.emailOrPhone && (
                    <p role="alert" className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">
                      {errors.emailOrPhone}
                    </p>
                  )}
                </div>

                {/* Service Dropdown */}
                <div>
                  <label htmlFor="service" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Service / Inquiry Type
                  </label>
                  <div className="relative">
                    <select
                      id="service"
                      name="Service"
                      value={service}
                      onChange={(e) => {
                        setService(e.target.value);
                        onServiceChange(e.target.value as ServiceType | '');
                      }}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:ring-blue-500 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-1 transition-all appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-white dark:bg-slate-950 text-slate-500">
                        Select a service or inquiry type...
                      </option>
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.serviceTypeValue} className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
                          {s.serviceTypeValue}
                        </option>
                      ))}
                      <option value="Internship / Other Opportunity" className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
                        Internship / Other Opportunity
                      </option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 dark:text-slate-400">
                      <ArrowRight className="w-4 h-4 rotate-90" />
                    </div>
                  </div>
                </div>

                {/* Budget Dropdown */}
                <div>
                  <label htmlFor="budget" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Estimated Budget
                  </label>
                  <div className="relative">
                    <select
                      id="budget"
                      name="Budget"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:ring-blue-500 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-1 transition-all appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-white dark:bg-slate-950 text-slate-500">
                        Select an estimated budget...
                      </option>
                      {BUDGET_OPTIONS.map((option) => (
                        <option key={option} value={option} className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
                          {option}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 dark:text-slate-400">
                      <ArrowRight className="w-4 h-4 rotate-90" />
                    </div>
                  </div>
                </div>

                {/* Message textarea */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Your Message <span className="text-rose-500 dark:text-rose-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="Message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                    }}
                    placeholder="Tell me a bit about your project goals, timeline, or internship role..."
                    aria-invalid={Boolean(errors.message)}
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-1 transition-all resize-y ${
                      errors.message
                        ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500'
                        : 'border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:ring-blue-500'
                    }`}
                  />
                  {errors.message && (
                    <p role="alert" className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 text-base"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </div>

                {submittedLinks && (
                  <div
                    role="status"
                    className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/35 border border-emerald-200 dark:border-emerald-500/30 text-sm text-slate-800 dark:text-slate-200 space-y-3"
                  >
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">Message ready on WhatsApp</p>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                          If a new tab did not open automatically, use the direct WhatsApp or Email link below.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <a
                        href={submittedLinks.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors whitespace-nowrap"
                      >
                        <span>Open WhatsApp Chat</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={submittedLinks.mailtoUrl}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors whitespace-nowrap"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Send via Email App</span>
                      </a>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
