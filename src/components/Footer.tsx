/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Cpu, Github, Linkedin, MessageSquare, ShieldCheck } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const { language, t } = useLanguage();

  const links = {
    products: [
      { label: 'GeneralCloud Engine', section: 'platforms' },
      { label: 'GeneralGateway Server', section: 'platforms' },
      { label: 'GeneralShield Identity', section: 'platforms' },
      { label: 'GeneralIntelligence SDK', section: 'platforms' }
    ],
    company: [
      { label: language === 'de' ? 'Missionsübersicht' : 'Overview Mission', section: 'about' },
      { label: language === 'de' ? 'Unternehmenswerte' : 'Corporate Values', section: 'values' },
      { label: language === 'de' ? 'Unternehmensleitung' : 'Leadership', section: 'team' },
      { label: language === 'de' ? 'Globale Standorte' : 'Global Offices', section: 'offices' }
    ],
    careers: [
      { label: language === 'de' ? 'Offene Stellen' : 'Browse Jobs', section: 'careers' },
      { label: language === 'de' ? 'Initiativbewerbung' : 'Spontaneous Bid', section: 'careers' }
    ]
  };

  const handleLinkClick = (sectionId: string) => {
    onNavigate(sectionId);
  };

  return (
    <footer id="corporate-footer" className="bg-slate-50 border-t border-slate-200/65 px-6 py-16 text-left relative overflow-hidden">
      <div className="absolute bottom-[0%] right-[20%] w-[30%] h-[30%] rounded-full bg-indigo-500/5 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-slate-200/60">
        
        {/* Brand Column */}
        <div className="md:col-span-4 space-y-6">
          <button
            onClick={() => handleLinkClick('overview')}
            className="flex items-center gap-3 text-left cursor-pointer group animate-none"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <span className="block font-sans font-extrabold text-sm tracking-wider text-slate-900 uppercase">
                GENERALSOFT
              </span>
              <span className="block font-sans font-extrabold text-[8px] tracking-widest text-indigo-600 uppercase -mt-0.5">
                {t('logo_sub')}
              </span>
            </div>
          </button>

          <p className="text-slate-500 font-sans text-xs leading-relaxed max-w-xs font-normal">
            {t('footer_brand_desc')}
          </p>

          <div className="flex items-center gap-3">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white border border-slate-200 hover:text-indigo-600 text-slate-500 flex items-center justify-center hover:border-indigo-300 shadow-sm transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white border border-slate-200 hover:text-indigo-600 text-slate-500 flex items-center justify-center hover:border-indigo-300 shadow-sm transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Links Column 2 */}
        <div className="md:col-span-2.5">
          <span className="block font-sans font-extrabold text-xs text-slate-800 uppercase tracking-wider mb-4">
            {t('footer_products_title')}
          </span>
          <ul className="space-y-2.5">
            {links.products.map((lnk) => (
              <li key={lnk.label}>
                <button
                  onClick={() => handleLinkClick(lnk.section)}
                  className="text-xs text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer block font-medium"
                >
                  {lnk.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Links Column 3 */}
        <div className="md:col-span-2.5">
          <span className="block font-sans font-extrabold text-xs text-slate-800 uppercase tracking-wider mb-4">
            {t('footer_company_title')}
          </span>
          <ul className="space-y-2.5">
            {links.company.map((lnk) => (
              <li key={lnk.label}>
                <button
                  onClick={() => handleLinkClick(lnk.section)}
                  className="text-xs text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer block font-medium"
                >
                  {lnk.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Links Column 4 */}
        <div className="md:col-span-3">
          <span className="block font-sans font-extrabold text-xs text-slate-800 uppercase tracking-wider mb-4">
            {t('footer_careers_title')}
          </span>
          <ul className="space-y-2.5">
            {links.careers.map((lnk) => (
              <li key={lnk.label}>
                <button
                  onClick={() => handleLinkClick(lnk.section)}
                  className="text-xs text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer block text-left font-medium"
                >
                  {lnk.label}
                </button>
              </li>
            ))}
          </ul>
          
          <div className="mt-6 p-3 rounded-lg bg-white border border-slate-150 flex items-center gap-2 max-w-sm shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-sans text-[10px] text-slate-500 font-semibold">{t('footer_compliance')}</span>
          </div>
        </div>

      </div>

      {/* Corporate Copyright Bar */}
      <div className="max-w-7xl mx-auto w-full pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-[11px] text-slate-400 font-medium">
        <span>&copy; {currentYear} Generalsoft Corporation. {language === 'de' ? 'Alle Rechte vorbehalten.' : 'All rights reserved.'}</span>
        <div className="flex flex-wrap gap-4 font-normal">
          <button onClick={() => handleLinkClick('privacy')} className="hover:text-indigo-600 transition-colors cursor-pointer">{t('footer_privacy')}</button>
          <button onClick={() => handleLinkClick('terms')} className="hover:text-indigo-600 transition-colors cursor-pointer">{t('footer_security')}</button>
          <a href="#" className="hover:text-indigo-600 transition-colors">{t('footer_sla')}</a>
          {language === 'de' ? (
            <a href="https://generalsoft.ae/de/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">generalsoft.ae/de/</a>
          ) : (
            <a href="https://generalsoft.ae/en/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">generalsoft.ae/en/</a>
          )}
        </div>
      </div>
    </footer>
  );
}
