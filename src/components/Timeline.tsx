/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Hammer, TrendingUp, ShieldAlert, Award } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { Milestone } from '../types';

export default function Timeline() {
  const [activeTab, setActiveTab] = useState<'all' | 'foundation' | 'innovation' | 'global'>('all');
  const { language, t, getMilestones } = useLanguage();
  const milestones = getMilestones();

  const filteredMilestones = milestones.filter((m) => {
    if (activeTab === 'all') return true;
    return m.category === activeTab;
  });

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'foundation':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
      case 'innovation':
        return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
      case 'global':
        return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30';
      case 'ipo':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      default:
        return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'foundation':
        return <Award className="w-4 h-4" />;
      case 'innovation':
        return <Hammer className="w-4 h-4" />;
      case 'global':
        return <TrendingUp className="w-4 h-4" />;
      case 'ipo':
        return <Calendar className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const tabLabels: Record<'all' | 'foundation' | 'innovation' | 'global' | 'ipo', Record<string, string>> = {
    all: { en: "Full Archive", de: "Vollständiges Archiv" },
    foundation: { en: "Foundation", de: "Gründung" },
    innovation: { en: "Innovation", de: "Innovation" },
    global: { en: "Global Expansion", de: "Expansion" },
    ipo: { en: "Series-D/IPO", de: "Series-D/IPO" }
  };

  return (
    <section
      id="timeline"
      className="py-24 bg-white px-6 border-b border-slate-100 relative overflow-hidden"
    >
      <div className="absolute top-[0%] left-[20%] w-[40%] h-[40%] rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 font-sans">
          <span className="font-mono text-[10px] text-indigo-600 uppercase tracking-widest font-bold block mb-3">{t('timeline_sub')}</span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
            {t('timeline_title')}
          </h2>
          <p className="mt-3 text-slate-500 font-sans text-xs sm:text-sm">
            {t('timeline_desc')}
          </p>

          {/* Controls */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {(['all', 'foundation', 'innovation', 'global'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4.5 py-2.5 rounded-full font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  activeTab === tab
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white text-slate-500 border border-slate-200/80 hover:text-indigo-600 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                {tabLabels[tab]?.[language] || tab}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Line & Cards */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical alignment line on desktops */}
          <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-[1px] bg-slate-100 -translate-x-1/2 hidden md:block" />
          <div className="absolute left-6 top-2 bottom-2 w-[1px] bg-slate-100 md:hidden" />

          <div className="space-y-12">
            <AnimatePresence mode="popLayout">
              {filteredMilestones.map((m, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={m.year + m.title}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className={`relative grid grid-cols-1 md:grid-cols-12 gap-6 items-center`}
                  >
                    {/* Timestamp bubble indicator */}
                    <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-white border-2 border-indigo-600 shadow-sm transform -translate-x-1/2 z-20 flex items-center justify-center shadow-indigo-100" />

                    {/* Timeline card wrapper content */}
                    {/* Left node */}
                    <div
                      className={`col-span-1 md:col-span-5 pl-12 md:pl-0 font-sans ${
                        isEven ? 'md:col-start-1 md:text-right' : 'md:col-start-7 md:order-2 md:text-left'
                      }`}
                    >
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] uppercase font-mono tracking-widest border mb-3 bg-slate-50 text-slate-500 border-slate-100/80 font-bold">
                        {getCategoryIcon(m.category)}
                        {tabLabels[m.category as 'foundation' | 'innovation' | 'global' | 'ipo']?.[language] || m.category}
                      </div>

                      <span className="block font-sans font-black text-4xl text-transparent bg-clip-text bg-gradient-to-tr from-indigo-600 to-violet-500">
                        {m.year}
                      </span>
                    </div>

                    {/* Right descriptive block */}
                    <div
                      className={`col-span-1 md:col-span-5 pl-12 md:pl-0 font-sans ${
                        isEven ? 'md:col-start-7 md:text-left' : 'md:col-start-1 md:order-1 md:text-right'
                      }`}
                    >
                      <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-md hover:border-slate-200/80 hover:shadow-lg hover:shadow-slate-100/50 transition-all">
                        <h3 className="font-sans font-extrabold text-sm text-slate-800">
                          {m.title}
                        </h3>
                        <p className="mt-2 text-slate-500 font-sans text-xs leading-relaxed font-normal">
                          {m.description}
                        </p>
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>

            {filteredMilestones.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-400 font-sans text-xs">{t('timeline_empty')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
