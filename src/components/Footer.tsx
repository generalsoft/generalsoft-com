/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Github, Linkedin } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const { language, t } = useLanguage();

  const handleLinkClick = (sectionId: string) => {
    onNavigate(sectionId);
  };

  return (
    <footer id="corporate-footer" className="bg-slate-50 border-t border-slate-200/65 px-6 py-8 text-left relative overflow-hidden">
      <div className="absolute bottom-[0%] right-[20%] w-[30%] h-[30%] rounded-full bg-indigo-500/5 blur-[90px] pointer-events-none" />

      {/* Corporate Copyright Bar */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-[11px] text-slate-400 font-medium">
        <span>&copy; {currentYear} Generalsoft Corporation. {language === 'de' ? 'Alle Rechte vorbehalten.' : 'All rights reserved.'}</span>
        <div className="flex flex-wrap items-center gap-4 font-normal">
          <button onClick={() => handleLinkClick('careers')} className="hover:text-indigo-600 transition-colors cursor-pointer font-bold">{language === 'de' ? 'Karriere' : 'Careers'}</button>
          <button onClick={() => handleLinkClick('privacy')} className="hover:text-indigo-600 transition-colors cursor-pointer">{t('footer_privacy')}</button>
          <button onClick={() => handleLinkClick('terms')} className="hover:text-indigo-600 transition-colors cursor-pointer">{t('footer_security')}</button>
          <a 
            href={`https://generalsoft.ae/${language}/`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-indigo-600 transition-colors"
          >
            generalsoft.ae
          </a>
          <div className="flex items-center gap-3 ml-2 border-l border-slate-200 pl-4">
            <a href="https://github.com/generalsoft" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition-colors" aria-label="GitHub">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com/in/generalsoft" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
