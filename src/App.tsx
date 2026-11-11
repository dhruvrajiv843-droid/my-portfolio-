/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { About } from './components/About.tsx';
import { Services } from './components/Services.tsx';
import { Projects } from './components/Projects.tsx';
import { Contact } from './components/Contact.tsx';
import { Footer } from './components/Footer.tsx';
import { ServiceType } from './types.ts';

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceType | ''>('');

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
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col selection:bg-blue-500/30 selection:text-white">
      {/* Fixed Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
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
