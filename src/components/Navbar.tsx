import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

interface NavbarProps {
  onNavigate?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080c14]/90 backdrop-blur-md border-b border-slate-800/70 shadow-lg shadow-black/30'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Name */}
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, 'hero')}
            className="group flex items-center gap-2.5 font-bold text-xl tracking-tight text-white transition-colors"
          >
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
              <span className="font-mono text-sm font-black">DS</span>
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[#080c14]" />
            </div>
            <span className="font-semibold text-slate-100 group-hover:text-blue-400 transition-colors">
              {PERSONAL_INFO.brandName}
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#about"
              onClick={(e) => scrollToSection(e, 'about')}
              className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                activeSection === 'about' ? 'text-blue-400' : 'text-slate-300'
              }`}
            >
              About
            </a>
            <a
              href="#services"
              onClick={(e) => scrollToSection(e, 'services')}
              className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                activeSection === 'services' ? 'text-blue-400' : 'text-slate-300'
              }`}
            >
              Services
            </a>
            <a
              href="#projects"
              onClick={(e) => scrollToSection(e, 'projects')}
              className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                activeSection === 'projects' ? 'text-blue-400' : 'text-slate-300'
              }`}
            >
              Projects
            </a>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                activeSection === 'contact' ? 'text-blue-400' : 'text-slate-300'
              }`}
            >
              Contact
            </a>
          </nav>

          {/* Highlighted "Contact Me" Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 shadow-md shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <span>Contact Me</span>
              <ArrowUpRight className="w-4 h-4 text-blue-200" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <div className="md:hidden bg-[#0a0f1d]/98 border-b border-slate-800/80 px-4 pt-3 pb-6 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col space-y-3">
            <a
              href="#about"
              onClick={(e) => scrollToSection(e, 'about')}
              className="px-4 py-3 rounded-lg text-base font-medium text-slate-200 hover:text-white hover:bg-slate-800/50 transition-colors"
            >
              About
            </a>
            <a
              href="#services"
              onClick={(e) => scrollToSection(e, 'services')}
              className="px-4 py-3 rounded-lg text-base font-medium text-slate-200 hover:text-white hover:bg-slate-800/50 transition-colors"
            >
              Services
            </a>
            <a
              href="#projects"
              onClick={(e) => scrollToSection(e, 'projects')}
              className="px-4 py-3 rounded-lg text-base font-medium text-slate-200 hover:text-white hover:bg-slate-800/50 transition-colors"
            >
              Projects
            </a>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              className="px-4 py-3 rounded-lg text-base font-medium text-slate-200 hover:text-white hover:bg-slate-800/50 transition-colors"
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
