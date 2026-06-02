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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch font-sans">
          {leadershipList.map((leader) => {
            const isSelected = selectedLeaderId === leader.id;
            return (
              <div
                key={leader.id}
                className="group relative bg-white border border-slate-200/60 hover:border-indigo-300 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-indigo-50/50"
              >
                <div>
                  {/* Portrait Frame */}
                  <div className="relative rounded-xl overflow-hidden aspect-square w-full mb-5 bg-slate-100 border border-slate-200/40">
                    <img
                      src={leader.avatarUrl}
                      alt={leader.name}
                      ref={(el) => {
                        if (el) el.referrerPolicy = 'no-referrer';
                      }}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104 filter grayscale contrast-105 brightness-95 hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Visual department badge on card */}
                    <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-700 font-mono text-[8px] uppercase tracking-widest leading-none font-bold shadow-sm">
                      {leader.department}
                    </span>
                  </div>

                  <h3 className="font-sans font-extrabold text-slate-800 text-base">
                    {leader.name}
                  </h3>
                  <span className="block font-sans text-xs text-indigo-600 mt-1 font-semibold">
                    {leader.role}
                  </span>

                  <p className="text-slate-500 font-sans text-xs mt-3 leading-relaxed line-clamp-3">
                    {leader.bio}
                  </p>
                </div>

                {/* Card CTA Row */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedLeaderId(isSelected ? null : leader.id)}
                    className="text-[11px] font-mono tracking-widest text-slate-450 hover:text-indigo-600 uppercase inline-flex items-center gap-1 cursor-pointer transition-colors font-bold"
                  >
                    {isSelected ? (
                      <>
                        <Minus className="w-3.5 h-3.5" /> {t('team_btn_close')}
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" /> {t('team_btn_read')}
                      </>
                    )}
                  </button>

                  <a
                    href="https://linkedin.com/in/generalsoft"
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-indigo-600 transition-colors p-1"
                    aria-label={`${leader.name} LinkedIn Profile`}
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>

                {/* Expand bio inline indicator */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="col-span-full mt-4 bg-slate-50/80 rounded-xl p-4.5 border border-slate-105 text-left overflow-hidden"
                    >
                      <Quote className="w-6 h-6 text-indigo-500/10 mb-2" />
                      <p className="text-slate-700 font-sans italic text-xs leading-relaxed font-medium">
                        &ldquo;{leader.quote}&rdquo;
                      </p>
                      
                      <div className="mt-4 pt-4 border-t border-slate-200/60">
                        <span className="block font-mono text-[9px] uppercase tracking-widest text-slate-450 mb-1.5 font-bold">{t('team_bg_focus')}</span>
                        <p className="text-slate-500 font-sans text-xs leading-relaxed font-normal">
                          {leader.bio}
                        </p>
                      </div>
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
