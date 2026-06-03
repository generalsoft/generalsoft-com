/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, X, Linkedin, Briefcase, Plus, Minus } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { Leader } from '../types';

export default function Team() {
  const [selectedLeaderId, setSelectedLeaderId] = useState<string | null>(null);
  const { language, t, getLeaders } = useLanguage();
  const leadershipList = getLeaders();

  const activeLeader = leadershipList.find((l) => l.id === selectedLeaderId);

  return (
    <section
      id="leadership"
      className="py-24 bg-slate-50 px-6 border-b border-slate-100 relative overflow-hidden"
    >
      <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/5 blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Title */}
        <div className="text-left max-w-3xl mb-16 font-sans">
          <span className="font-mono text-[9px] text-indigo-600 uppercase tracking-widest font-bold block mb-3">{t('team_sub')}</span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
            {t('team_title')}
          </h2>
          <p className="mt-4 text-slate-500 font-sans text-sm leading-relaxed font-normal">
            {t('team_desc')}
          </p>
        </div>

        {/* Leaders Grid */}
        <div className="space-y-8 font-sans">
          {leadershipList.map((leader) => {
            const isSelected = selectedLeaderId === leader.id;
            return (
              <div
                key={leader.id}
                className="group relative bg-white border border-slate-200/60 hover:border-indigo-300 rounded-3xl p-6 md:p-10 transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-indigo-50/50 w-full"
              >
                <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
                  {/* Portrait Frame */}
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/5] w-full md:w-64 lg:w-80 shrink-0 bg-slate-100 border border-slate-200/40">
                    <img
                      src={leader.avatarUrl}
                      alt={leader.name}
                      ref={(el) => {
                        if (el) el.referrerPolicy = 'no-referrer';
                      }}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-104 filter grayscale contrast-105 brightness-95 hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                  </div>

                  <div className="flex-1 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="px-2.5 py-1 rounded-md bg-indigo-50 border border-indigo-100 text-indigo-600 font-mono text-[9px] uppercase tracking-widest leading-none font-bold">
                          {leader.department}
                        </span>
                        <a
                          href="https://linkedin.com/in/generalsoft"
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-400 hover:text-indigo-600 transition-colors"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      </div>

                      <h3 className="font-sans font-extrabold text-slate-800 text-2xl lg:text-3xl">
                        {leader.name}
                      </h3>
                      <span className="block font-sans text-base text-indigo-600 mt-1 font-semibold">
                        {leader.role}
                      </span>

                      <p className="text-slate-500 font-sans text-sm mt-6 leading-relaxed max-w-3xl">
                        {leader.bio}
                      </p>
                    </div>

                    {/* Card CTA Row */}
                    <div className="mt-8 pt-6 border-t border-slate-100">
                      <button
                        onClick={() => setSelectedLeaderId(isSelected ? null : leader.id)}
                        className="text-[11px] font-mono tracking-widest text-slate-450 hover:text-indigo-600 uppercase inline-flex items-center gap-2 cursor-pointer transition-colors font-bold"
                      >
                        {isSelected ? (
                          <>
                            <Minus className="w-4 h-4" /> {t('team_back_btn')}
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" /> {t('team_show_btn')}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expand bio inline indicator */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      className="bg-slate-50/80 rounded-2xl p-6 md:p-10 border border-slate-105 text-left overflow-hidden"
                    >
                      <Quote className="w-6 h-6 text-indigo-500/10 mb-2" />
                      <p className="text-slate-700 font-sans italic text-sm leading-relaxed font-medium mb-6">
                        &ldquo;{leader.quote}&rdquo;
                      </p>
                      <span className="block font-mono text-[9px] uppercase tracking-widest text-slate-450 mb-2 font-bold">{t('team_dept')}</span>
                      <p className="text-slate-500 font-sans text-sm leading-relaxed font-normal">
                        {leader.bio}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
