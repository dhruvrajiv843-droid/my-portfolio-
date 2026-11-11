import React, { useState } from 'react';
import { 
  Mail, 
  Github, 
  Linkedin, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  MessageSquare,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { PERSONAL_INFO, SERVICES } from '../data/portfolioData.ts';
import { ContactFormData, ServiceType } from '../types.ts';
import { validateContactForm, sanitizeText } from '../utils/validation.ts';

interface ContactProps {
  selectedService: ServiceType | '';
  onServiceChange: (service: ServiceType | '') => void;
}

export const Contact: React.FC<ContactProps> = ({ selectedService, onServiceChange }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    service: selectedService,
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<ContactFormData | null>(null);

  // Sync when prop changes
  React.useEffect(() => {
    if (selectedService) {
      setFormData(prev => ({ ...prev, service: selectedService }));
      // Clear service error if any
      setErrors(prev => ({ ...prev, service: undefined }));
    }
  }, [selectedService]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'service') {
      onServiceChange(value as ServiceType);
    }
    // Clear error for this field
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const sanitizedData: ContactFormData = {
      name: sanitizeText(formData.name),
      email: sanitizeText(formData.email),
      service: formData.service,
      message: sanitizeText(formData.message),
    };

    const validation = validateContactForm(sanitizedData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    // Simulate reliable dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setSubmittedMessage(sanitizedData);
      // Reset form
      setFormData({
        name: '',
        email: '',
        service: '',
        message: '',
      });
      onServiceChange('');
    }, 700);
  };

  return (
    <section id="contact" className="py-24 relative border-t border-slate-800/60 bg-[#070b13]/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-sm font-semibold uppercase tracking-wider text-blue-400 mb-2">
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Contact Me
          </h2>
          <p className="mt-3 text-slate-300 text-lg">
            Have a project in mind or looking for an intern? Feel free to reach out!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Links & Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-3">
                Let's Build Something Together
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Whether you need a high-converting website, an AI video reel package, custom CRM automation, or an ambitious engineering intern on your team, my inbox is open.
              </p>

              {/* Direct Links List */}
              <div className="space-y-4">
                {/* Email Direct Link */}
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="group flex items-center gap-4 p-3.5 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 hover:border-blue-500/50 transition-all"
                  aria-label={`Send email to ${PERSONAL_INFO.email}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs text-slate-400 font-medium">Direct Email</div>
                    <div className="text-sm font-semibold text-white truncate group-hover:text-blue-300 transition-colors">
                      {PERSONAL_INFO.email}
                    </div>
                  </div>
                </a>

                {/* GitHub Direct Link */}
                <a
                  href={PERSONAL_INFO.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-3.5 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 hover:border-purple-500/50 transition-all"
                  aria-label="Dhruv Singh GitHub profile"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Code & Open Source</div>
                    <div className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">
                      github.com/dhruvrajiv843-droid
                    </div>
                  </div>
                </a>

                {/* LinkedIn Direct Link */}
                <a
                  href={PERSONAL_INFO.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-3.5 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 hover:border-indigo-500/50 transition-all"
                  aria-label="Dhruv Singh LinkedIn profile"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Professional Network</div>
                    <div className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
                      linkedin.com/in/dhruv-singh-363724417
                    </div>
                  </div>
                </a>
              </div>

              {/* Response Time Indicator */}
              <div className="mt-8 pt-6 border-t border-slate-800 flex items-center gap-2.5 text-xs text-slate-400">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Quick turnaround: I usually respond within 24 hours.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl relative">
              {/* Form Success State */}
              {isSuccess && submittedMessage ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-white">Message Sent Successfully!</h4>
                  <p className="text-slate-300 text-sm max-w-md mx-auto">
                    Thank you, <strong className="text-white">{submittedMessage.name}</strong>. I've received your note regarding{' '}
                    <span className="text-blue-400 font-medium">"{submittedMessage.service}"</span> and will respond to{' '}
                    <strong className="text-white">{submittedMessage.email}</strong> shortly.
                  </p>

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => setIsSuccess(false)}
                      className="px-6 py-2.5 rounded-xl text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                /* Contact Form */
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Name field */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Your Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Rivera"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-950 border ${
                        errors.name ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-blue-500 focus:ring-blue-500'
                      } text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 transition-all`}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email field */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Your Email <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@company.com"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-950 border ${
                        errors.email ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-blue-500 focus:ring-blue-500'
                      } text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 transition-all`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Service / Inquiry Dropdown */}
                  <div>
                    <label htmlFor="service" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Service / Inquiry Type <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl bg-slate-950 border ${
                          errors.service ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-blue-500 focus:ring-blue-500'
                        } text-white text-sm focus:outline-none focus:ring-1 transition-all appearance-none cursor-pointer`}
                      >
                        <option value="" disabled className="text-slate-500">
                          Select a service or inquiry type...
                        </option>
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.serviceTypeValue} className="bg-slate-950 text-white">
                            {s.serviceTypeValue}
                          </option>
                        ))}
                        <option value="Internship / Other Opportunity" className="bg-slate-950 text-white">
                          Internship / Other Opportunity
                        </option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                        <ArrowRight className="w-4 h-4 rotate-90" />
                      </div>
                    </div>
                    {errors.service && (
                      <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.service}
                      </p>
                    )}
                  </div>

                  {/* Message textarea */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Your Message <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me a bit about your project goals, timeline, or internship role..."
                      className={`w-full px-4 py-3 rounded-xl bg-slate-950 border ${
                        errors.message ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-blue-500 focus:ring-blue-500'
                      } text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 transition-all resize-y`}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:pointer-events-none transition-all duration-200 text-base"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending Message...</span>
                        </div>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
