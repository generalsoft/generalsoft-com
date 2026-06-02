/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

const NAV_LABELS: Record<'en' | 'de', Record<string, string>> = {
  en: {
    about: 'About',
    partners: 'Partners',
    services: 'Services',
    configurator: 'Configurator',
    values: 'Core Philosophy',
    journey: 'Journey',
    team: 'Team',
    offices: 'Offices',
    contact: 'Contact',
    sla: 'SLA'
  },
  de: {
    about: 'Über uns',
    partners: 'Partner',
    services: 'Leistungen',
    configurator: 'Konfigurator',
    values: 'Philosophie',
    journey: 'Historie',
    team: 'Team',
    offices: 'Standorte',
    contact: 'Kontakt',
    sla: 'SLA'
  }
};

export default function Header({ onNavigate, activeSection }: HeaderProps) {
  const { language, setLanguage } = useLanguage();
  const labels = NAV_LABELS[language];

  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = ['about', 'partners', 'services', 'configurator', 'values', 'journey', 'team', 'offices', 'contact'];


  const handleNav = (key: string) => {
    // close mobile menu if open
    setMobileOpen(false);

    if (key === 'services' && activeSection === 'home') {
      const el = document.getElementById('services');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }

    if (key === 'configurator' && activeSection === 'home') {
      const el = document.getElementById('configurator');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }

    onNavigate(key === 'services' ? 'services' : key === 'configurator' ? 'configurator' : key);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f5f8fa]/80 backdrop-blur-md border-b border-brand-steel/10" id="main-nav">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 group cursor-pointer"
          aria-label="Generalsoft Logo"
        >
          <img src="/logo.png" alt="Generalsoft Logo" className="h-8 w-auto transition-transform duration-500 group-hover:rotate-[360deg]" />
          <span className="font-display text-xl tracking-tight">
            <span className="font-black text-brand-navy">General</span>
            <span className="font-light text-brand-steel">soft</span>
          </span>
        </button>

        <div className="flex items-center gap-4 md:gap-8 text-sm font-medium text-brand-steel">
          <div className="hidden md:flex gap-6">
            {navItems.map((key) => (
              <button
                key={key}
                onClick={() => handleNav(key)}
                className={`transition-colors ${activeSection === key ? 'text-brand-navy font-semibold' : 'hover:text-brand-navy'}`}
              >
                {labels[key]}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex border border-brand-steel/20 rounded-full px-2 py-1 gap-2 bg-white">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 rounded-full transition-all ${language === 'en' ? 'bg-brand-navy text-white' : 'hover:bg-brand-navy/5'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('de')}
                className={`px-2 rounded-full transition-all ${language === 'de' ? 'bg-brand-navy text-white' : 'hover:bg-brand-navy/5'}`}
              >
                DE
              </button>
            </div>

            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg bg-white border border-brand-steel/10">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden absolute left-0 right-0 top-16 bg-white border-t border-brand-steel/10 shadow-md z-40">
          <div className="flex flex-col px-4 py-4">
            {navItems.map((key) => (
              <button key={key} onClick={() => handleNav(key)} className="text-left py-3 text-sm font-medium text-brand-steel hover:text-brand-navy">
                {labels[key]}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
