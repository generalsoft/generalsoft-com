/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Terminal, Database, Server, ChevronDown } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import heroImage from '../assets/images/generalsoft_hero_1780398091321.png';
import leaderImage from '../assets/images/abid.jpg';


interface HeroProps {
  onExploreClick: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  const { t } = useLanguage();

  return (
    <section
      id="overview"
      className="relative min-h-screen bg-white flex flex-col justify-center pt-28 pb-16 overflow-hidden px-6"
    >
      {/* Background ambient radial gradients */}
      <div className="absolute top-[-10%] left-[-20%] w-[60%] h-[60%] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-violet-500/5 blur-[130px] pointer-events-none" />

      {/* Subtle Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-45" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        {/* Left column: Typography & Messaging */}
        <div className="lg:col-span-7 flex flex-col items-start font-sans">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50/70 border border-indigo-100/80 text-indigo-700 font-mono text-[10px] uppercase tracking-widest mb-6 font-semibold shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            {t('hero_badge')}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-900 leading-tight tracking-tight text-left"
          >
            {t('hero_title_1')}
            <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              {t('hero_title_2')}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-slate-500 font-sans text-sm sm:text-base leading-relaxed max-w-2xl text-left font-normal"
          >
            {t('hero_desc')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-4 items-center"
          >
            <button
              onClick={onExploreClick}
              className="px-6 py-3.5 rounded-full bg-indigo-600 hover:bg-slate-900 text-white font-sans text-xs font-semibold tracking-wider uppercase shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20 active:scale-97 cursor-pointer transition-all duration-200"
            >
              {t('hero_cta_mission')}
            </button>
            <button
              onClick={() => {
                const target = document.getElementById('careers');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-sans text-xs font-semibold tracking-wider uppercase active:scale-97 cursor-pointer transition-all duration-200 shadow-sm"
            >
              {t('hero_cta_careers')}
            </button>
          </motion.div>

          {/* Quick Stats Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-14 w-full grid grid-cols-3 gap-4 border-t border-slate-100 pt-8"
          >
            <div>
              <span className="block font-sans font-extrabold text-2xl md:text-3xl text-slate-900">400+</span>
              <span className="block font-sans text-[10px] text-slate-450 uppercase tracking-widest mt-1 font-semibold">{t('hero_stat_clients')}</span>
            </div>
            <div>
              <span className="block font-sans font-extrabold text-2xl md:text-3xl text-indigo-600">99.999%</span>
              <span className="block font-sans text-[10px] text-slate-450 uppercase tracking-widest mt-1 font-semibold">{t('hero_stat_sla')}</span>
            </div>
            <div>
              <span className="block font-sans font-extrabold text-2xl md:text-3xl text-violet-600">$300M+</span>
              <span className="block font-sans text-[10px] text-slate-450 uppercase tracking-widest mt-1 font-semibold">{t('hero_stat_transacted')}</span>
            </div>
          </motion.div>
        </div>

        {/* Right column: Generated Hero Frame Illustration */}
        <div className="lg:col-span-5 relative font-sans">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:h-[480px] w-full max-w-lg mx-auto flex items-center justify-center p-4"
          >
            {/* Ambient background ring behind image */}
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-indigo-500/15 via-violet-500/5 to-indigo-500/10 blur-xl pointer-events-none" />

            <div className="relative rounded-2xl overflow-hidden border border-slate-100 shadow-xl bg-white group aspect-video lg:aspect-[4/5] w-full flex flex-col justify-between">
              {/* Image Frame with Overlay */}
              <div className="absolute inset-0 w-full h-full pointer-events-none z-10 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
              
              <img
                src={heroImage}
                alt="Generalsoft Autonomous Network Grid Layer"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-103"
                referrerPolicy="no-referrer"
              />

              {/* Decorative Window Bar */}
              <div className="relative z-20 w-full bg-white/90 backdrop-blur-sm border-b border-slate-100/90 px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="text-[10px] font-mono tracking-widest text-slate-500">GS_RESONANCE_ENGINE.sh</span>
                <span className="w-3.5" />
              </div>

              {/* Bottom Context Banner inside image */}
              <div className="relative z-20 p-6 mt-auto">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600/25 border border-indigo-500/30 flex items-center justify-center text-indigo-100">
                    <Server className="w-4 h-4 animate-pulse" />
                  </div>
                  <div>
                    <span className="block font-sans font-bold text-xs text-white">Resonator-Node v4.18</span>
                    <span className="block font-mono text-[9px] text-indigo-200 tracking-wider font-semibold">{t('hero_sys_secure')}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none z-20 opacity-70">
        <span className="font-sans text-[10px] uppercase tracking-widest text-slate-400 font-semibold">{t('hero_scroll')}</span>
        <ChevronDown className="w-4 h-4 text-slate-400 animate-bounce" />
      </div>
    </section>
  );
}
