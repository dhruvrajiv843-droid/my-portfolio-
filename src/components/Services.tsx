import React from 'react';
import { Layout, Video, Mic, Network, ArrowRight, Check, Sparkles } from 'lucide-react';
import { SERVICES } from '../data/portfolioData.ts';
import { ServiceType } from '../types.ts';

interface ServicesProps {
  onSelectService: (service: ServiceType) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'layout':
        return <Layout className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
      case 'video':
        return <Video className="w-6 h-6 text-purple-600 dark:text-purple-400" />;
      case 'mic':
        return <Mic className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />;
      case 'workflow':
        return <Network className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
    }
  };

  const getGradient = (iconName: string) => {
    switch (iconName) {
      case 'layout':
        return 'from-blue-500/10 via-indigo-500/5 to-transparent border-blue-200 dark:border-blue-500/20 group-hover:border-blue-400 dark:group-hover:border-blue-500/40';
      case 'video':
        return 'from-purple-500/10 via-pink-500/5 to-transparent border-purple-200 dark:border-purple-500/20 group-hover:border-purple-400 dark:group-hover:border-purple-500/40';
      case 'mic':
        return 'from-indigo-500/10 via-blue-500/5 to-transparent border-indigo-200 dark:border-indigo-500/20 group-hover:border-indigo-400 dark:group-hover:border-indigo-500/40';
      case 'workflow':
        return 'from-cyan-500/10 via-teal-500/5 to-transparent border-cyan-200 dark:border-cyan-500/20 group-hover:border-cyan-400 dark:group-hover:border-cyan-500/40';
      default:
        return 'from-blue-500/10 to-transparent border-slate-200 dark:border-slate-800';
    }
  };

  return (
    <section id="services" className="py-24 relative border-t border-slate-200 dark:border-slate-800/60 bg-[var(--bg-section-alt)] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-sm font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-2">
            What I Deliver
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Freelance Services
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-base">
            Modern high-impact solutions combining engineering fundamentals and cutting-edge AI toolsets.
          </p>
        </div>

        {/* 4 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service, index) => {
            return (
              <div
                key={service.id}
                className={`group relative p-8 rounded-2xl bg-gradient-to-b ${getGradient(
                  service.iconName
                )} border bg-white dark:bg-slate-900/40 shadow-sm dark:shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/10 dark:hover:shadow-blue-950/20 flex flex-col justify-between`}
              >
                <div>
                  {/* Card Header: Icon + Number indicator */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/60 flex items-center justify-center shadow-inner">
                      {getIcon(service.iconName)}
                    </div>
                    <span className="text-xs font-mono text-slate-500">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors mb-3">
                    {service.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6 font-normal">
                    {service.shortDescription}
                  </p>

                  {/* Deliverables */}
                  <div className="space-y-2.5 pt-4 border-t border-slate-200/80 dark:border-slate-800/60 mb-6">
                    <div className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Key Deliverables
                    </div>
                    {service.deliverables.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action: Inquire button */}
                <div className="pt-4 flex items-center justify-between border-t border-slate-200/70 dark:border-slate-800/40">
                  <div className="flex flex-wrap gap-1.5">
                    {service.techTags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[11px] text-slate-600 dark:text-slate-400">
                        {tag} <span className="text-slate-400 dark:text-slate-600">·</span>
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectService(service.serviceTypeValue)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 group-hover:translate-x-0.5 transition-all"
                  >
                    <span>Inquire</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom inquiry note banner */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-400 shadow-sm dark:shadow-none">
          Need a custom bundle or continuous support for your project?{' '}
          <button
            type="button"
            onClick={() => onSelectService('Internship / Other Opportunity')}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium underline underline-offset-4 ml-1"
          >
            Let&apos;s discuss your requirements
          </button>
        </div>
      </div>
    </section>
  );
};
