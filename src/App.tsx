/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { ScrollProgressBar } from './components/ScrollProgressBar.tsx';
import { Hero } from './components/Hero.tsx';
import { About } from './components/About.tsx';
import { Services } from './components/Services.tsx';
import { Projects } from './components/Projects.tsx';
import { Contact } from './components/Contact.tsx';
import { Footer } from './components/Footer.tsx';
import { ServiceType } from './types.ts';
import {
  applyThemeToElement,
  resolveInitialTheme,
  THEME_STORAGE_KEY,
  toggleThemeMode,
  type ThemeMode,
} from './utils/theme.ts';

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceType | ''>('');
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      return resolveInitialTheme(window.localStorage.getItem(THEME_STORAGE_KEY));
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    applyThemeToElement(document.documentElement, theme);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage quota / privacy restrictions
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => toggleThemeMode(prev));
  };

  const scrollToContact = (prefilledService?: ServiceType) => {
    if (prefilledService) {
      setSelectedService(prefilledService);
    }
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProjects = () => {
    const projectsElement = document.getElementById('projects');
    if (projectsElement) {
      projectsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] flex flex-col transition-colors duration-200 selection:bg-blue-500/30">
      {/* Subtle Horizontal Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Fixed Navigation Bar */}
      <Navbar theme={theme} onToggleTheme={handleToggleTheme} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          theme={theme}
          onExploreWork={scrollToProjects}
          onContactClick={() => scrollToContact()}
        />

        {/* About Me Section */}
        <About />

        {/* Freelance Services Section (4 Cards with icons) */}
        <Services onSelectService={(service) => scrollToContact(service)} />

        {/* Projects Showcase Section */}
        <Projects onContactClick={() => scrollToContact('Custom CRM Setup')} />

        {/* Contact Section */}
        <Contact
          selectedService={selectedService}
          onServiceChange={(service) => setSelectedService(service)}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
