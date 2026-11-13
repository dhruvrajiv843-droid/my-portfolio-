import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';
import type { ThemeMode } from '../utils/theme.ts';

interface NavbarProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  onNavigate?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, onToggleTheme, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'services', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleAriaLabel = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[var(--nav-scrolled-bg)] backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/70 shadow-sm dark:shadow-lg dark:shadow-black/40'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Brand Name */}
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, 'hero')}
            className="group flex items-center gap-2.5 font-bold text-lg tracking-tight text-slate-900 dark:text-white transition-colors whitespace-nowrap shrink-0"
          >
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
              <span className="font-mono text-sm font-black">DS</span>
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-slate-50 dark:ring-[#06080d]" />
            </div>
            <span className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {PERSONAL_INFO.brandName}
            </span>
          </a>

          {/* Desktop Nav Links + Theme Toggle + Highlighted Contact Me Button */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-7">
              <a
                href="#about"
                onClick={(e) => scrollToSection(e, 'about')}
                className={`text-xs font-mono uppercase tracking-[0.16em] transition-colors hover:text-slate-950 dark:hover:text-white whitespace-nowrap shrink-0 ${
                  activeSection === 'about'
                    ? 'text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                About
              </a>
              <a
                href="#services"
                onClick={(e) => scrollToSection(e, 'services')}
                className={`text-xs font-mono uppercase tracking-[0.16em] transition-colors hover:text-slate-950 dark:hover:text-white whitespace-nowrap shrink-0 ${
                  activeSection === 'services'
                    ? 'text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                Services
              </a>
              <a
                href="#projects"
                onClick={(e) => scrollToSection(e, 'projects')}
                className={`text-xs font-mono uppercase tracking-[0.16em] transition-colors hover:text-slate-950 dark:hover:text-white whitespace-nowrap shrink-0 ${
                  activeSection === 'projects'
                    ? 'text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                Projects
              </a>
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, 'contact')}
                className={`text-xs font-mono uppercase tracking-[0.16em] transition-colors hover:text-slate-950 dark:hover:text-white whitespace-nowrap shrink-0 ${
                  activeSection === 'contact'
                    ? 'text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                Contact
              </a>
            </nav>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                data-testid="theme-toggle"
                onClick={onToggleTheme}
                aria-label={toggleAriaLabel}
                aria-pressed={theme === 'light'}
                title={toggleAriaLabel}
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700/80 bg-white/90 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-slate-600 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>

              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, 'contact')}
                className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-[0.12em] font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/25 hover:shadow-blue-500/45 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 whitespace-nowrap shrink-0"
              >
                <span>Contact Me</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-blue-100" />
              </a>
            </div>
          </div>

          {/* Mobile Theme Toggle + Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              data-testid="theme-toggle-mobile"
              onClick={onToggleTheme}
              aria-label={toggleAriaLabel}
              aria-pressed={theme === 'light'}
              className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[var(--nav-drawer-bg)] border-b border-slate-200 dark:border-slate-800/80 px-4 pt-3 pb-6 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col space-y-3">
            <a
              href="#about"
              onClick={(e) => scrollToSection(e, 'about')}
              className="px-4 py-3 rounded-lg text-base font-medium text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
            >
              About
            </a>
            <a
              href="#services"
              onClick={(e) => scrollToSection(e, 'services')}
              className="px-4 py-3 rounded-lg text-base font-medium text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
            >
              Services
            </a>
            <a
              href="#projects"
              onClick={(e) => scrollToSection(e, 'projects')}
              className="px-4 py-3 rounded-lg text-base font-medium text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
            >
              Projects
            </a>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              className="px-4 py-3 rounded-lg text-base font-medium text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
            >
              Contact
            </a>
            <div className="pt-2">
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, 'contact')}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-md shadow-blue-600/30"
              >
                <span>Contact Me</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
