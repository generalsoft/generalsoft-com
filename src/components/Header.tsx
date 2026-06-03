/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from './LanguageContext';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

const NAV_LABELS: Record<'en' | 'de', Record<string, string>> = {
  en: {
    about: 'About',
    partners: 'Brands',
    services: 'Services',
    configurator: 'Configurator',
    values: 'Core Philosophy',
    'success-stories': 'Success Stories',
    journey: 'Journey',
    team: 'Team',
    offices: 'Offices',
    contact: 'Contact',
    sla: 'SLA'
  },
  de: {
    about: 'Über uns',
    partners: 'Softwareunternehmen',
    services: 'Leistungen',
    configurator: 'Konfigurator',
    values: 'Philosophie',
    'success-stories': 'Erfolge',
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
  const navItems = ['about', 'partners', 'success-stories', 'services', 'configurator', 'values', 'journey', 'team', 'offices', 'contact'];


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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f5f8fa]/90 backdrop-blur-lg border-b border-brand-steel/10" id="main-nav">
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

        <div className="flex items-center gap-4 lg:gap-8 text-sm font-medium text-brand-steel">
          <div className="hidden lg:flex gap-6">
            {navItems.map((key) => (
              <button
                key={key}
                onClick={() => handleNav(key)}
                className={`transition-colors whitespace-nowrap ${activeSection === key ? 'text-brand-navy font-bold border-b-2 border-brand-teal' : 'hover:text-brand-navy'}`}
              >
                {labels[key]}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex border border-brand-steel/20 rounded-full px-2 py-1 gap-1.5 bg-white shadow-sm">
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

            <button 
              onClick={() => setMobileOpen(!mobileOpen)} 
              className="lg:hidden p-2 rounded-xl bg-white border border-brand-steel/10 hover:border-brand-teal/50 transition-all shadow-sm active:scale-95"
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden absolute right-6 top-[72px] bg-white border border-brand-steel/10 shadow-2xl z-40 overflow-hidden rounded-3xl min-w-[280px]"
          >
            <div className="flex flex-col px-6 py-8 gap-2 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {/* Language toggle inside mobile menu (visible only on mobile) */}
              <div className="flex sm:hidden border border-brand-steel/10 rounded-2xl p-1.5 gap-2 bg-slate-50 mb-6 shadow-inner">
                <button
                  onClick={() => setLanguage('en')}
                  className={`flex-1 py-3 rounded-xl transition-all text-xs font-bold tracking-widest ${language === 'en' ? 'bg-brand-navy text-white shadow-lg' : 'text-brand-steel'}`}
                >
                  ENGLISH
                </button>
                <button
                  onClick={() => setLanguage('de')}
                  className={`flex-1 py-3 rounded-xl transition-all text-xs font-bold tracking-widest ${language === 'de' ? 'bg-brand-navy text-white shadow-lg' : 'text-brand-steel'}`}
                >
                  DEUTSCH
                </button>
              </div>

              {navItems.map((key) => (
                <button 
                  key={key} 
                  onClick={() => handleNav(key)} 
                  className={`text-left py-4 text-base font-bold transition-colors border-b border-brand-steel/5 last:border-0 ${activeSection === key ? 'text-brand-teal pl-2 border-l-4 border-brand-teal' : 'text-brand-navy/70 hover:text-brand-navy'}`}
                >
                  {labels[key]}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
