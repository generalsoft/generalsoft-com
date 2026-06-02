/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Layers, Activity, Lock, Brain, HelpCircle, HardDrive, Check } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { Solution } from '../types';

export default function Solutions() {
  const { t, getSolutions } = useLanguage();
  const solutionsList = getSolutions();
  const [activeSolutionId, setActiveSolutionId] = useState<string>(solutionsList[0]?.id || 'gen-cloud');

  const activeSolution = solutionsList.find((s) => s.id === activeSolutionId) || solutionsList[0];

  const getSolutionIcon = (id: string, className: string) => {
    switch (id) {
      case 'gen-cloud':
        return <Layers className={className} />;
      case 'gen-api':
        return <Activity className={className} />;
      case 'gen-security':
        return <Lock className={className} />;
      case 'gen-intelligence':
        return <Brain className={className} />;
      default:
        return <Layers className={className} />;
    }
  };

  return (
    <section
      id="platforms"
      className="py-24 bg-slate-50 px-6 border-b border-slate-100 relative overflow-hidden"
    >
      <div className="absolute top-[30%] left-[0%] w-[30%] h-[30%] rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Header Block */}
        <div className="text-left max-w-3xl mb-16 font-sans">
          <span className="font-mono text-[10px] text-indigo-600 uppercase tracking-widest font-bold block mb-3">{t('solutions_sub')}</span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
            {t('solutions_title')}
          </h2>
          <p className="mt-4 text-slate-500 font-sans text-sm leading-relaxed font-normal">
            {t('solutions_desc')}
          </p>
        </div>

        {/* Tab Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch font-sans">
          
          {/* Tabs Menu Column */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {solutionsList.map((item) => {
              const isActive = item.id === activeSolutionId;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSolutionId(item.id)}
                  className={`w-full text-left p-4.5 rounded-xl border flex items-center gap-4 transition-all duration-200 cursor-pointer outline-none ${
                    isActive
                      ? 'bg-white border-indigo-200 shadow-md shadow-indigo-100/30'
                      : 'bg-white/45 border-slate-200/70 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className={`p-2.5 rounded-lg transition-colors ${
                    isActive ? 'bg-indigo-600/10 text-indigo-600' : 'bg-slate-50 text-slate-400'
                  }`}>
                    {getSolutionIcon(item.id, 'w-5 h-5')}
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="block font-sans font-bold text-sm text-slate-800 truncate">
                      {item.name}
                    </span>
                    <span className="block font-sans text-[10px] text-slate-400 mt-1 truncate font-medium">
                      {item.category}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Solution Specs Detail Board */}
          <div className="lg:col-span-8">
            <div className="bg-white border border-slate-100 shadow-xl shadow-slate-100/40 rounded-2xl p-6 sm:p-10 h-full flex flex-col justify-between font-sans">
              
              {activeSolution && (
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 block mb-2 font-semibold">{t('solutions_spec_doc')}</span>
                  <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-slate-800 leading-tight">
                    {activeSolution.name}
                  </h3>
                  <span className="inline-block mt-2.5 px-3 py-1 bg-slate-50 border border-slate-100 text-slate-500 text-[10px] font-mono rounded-full font-semibold">
                    {t('solutions_deployment_id')}: GS_{activeSolution.id.toUpperCase().replace('-', '_')}
                  </span>

                  <p className="mt-6 text-slate-600 font-sans text-sm sm:text-base leading-relaxed font-normal">
                    {activeSolution.description}
                  </p>

                  {/* Tech tags list */}
                  <div className="mt-8 border-t border-slate-100 pt-6">
                    <h4 className="font-sans font-bold text-xs text-slate-500 uppercase tracking-widest mb-3.5">
                      {t('solutions_core_underlay')}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeSolution.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 rounded-md bg-slate-50 border border-slate-100 text-slate-600 font-mono text-[10px] font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Status and telemetry report footer */}
              {activeSolution && (
                <div className="mt-10 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="block font-sans text-[10px] text-slate-450 uppercase tracking-widest font-semibold">{t('solutions_installs')}</span>
                    <span className="block font-sans font-extrabold text-base sm:text-lg text-slate-800 mt-1">
                      {activeSolution.activeInstalls}
                    </span>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="block font-sans text-[10px] text-slate-455 uppercase tracking-widest font-semibold">{t('solutions_sla_satisfaction')}</span>
                    <span className="block font-sans font-extrabold text-base sm:text-lg text-emerald-600 mt-1">
                      {activeSolution.satisfaction}
                    </span>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
