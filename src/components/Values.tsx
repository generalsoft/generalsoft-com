/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Cpu, Shield, Award, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { CoreValue } from '../types';

export default function Values() {
  const [selectedId, setSelectedId] = useState<string>('agile-engineering');
  const { language, t, getCoreValues } = useLanguage();
  const valuesData = getCoreValues();

  const selectedValue = valuesData.find((v) => v.id === selectedId) || valuesData[0];

  const getIcon = (name: string, className: string) => {
    switch (name) {
      case 'Cpu':
        return <Cpu className={className} />;
      case 'Shield':
        return <Shield className={className} />;
      case 'Award':
        return <Award className={className} />;
      case 'Zap':
        return <Zap className={className} />;
      default:
        return <Cpu className={className} />;
    }
  };

  // Secondary technical points based on active value
  const technicalDeepDives: Record<string, Record<string, { subtitle: string; bullets: string[]; stat: string; statSub: string }>> = {
    'agile-engineering': {
      en: {
        subtitle: "Behind the Architecture: Decoupled Scaling Infrastructure",
        bullets: [
          "Self-orchestrating container shards that adjust dynamically during hot traffic spikes.",
          "Low-overhead load dispatchers optimized for modern kernel thread profiles.",
          "Declarative platform state engines that instantly roll back failed micro-transactions."
        ],
        stat: "14ms",
        statSub: "P99 Client Query Round-trip Time"
      },
      de: {
        subtitle: "Hinter dem System: Entkoppelte Skalierungskonzepte",
        bullets: [
          "Selbstorganisierende Container-Shards, die sich bei Datenverkehrspitzen dynamisch anpassen.",
          "Sehr schlanke Load-Dispatcher, optimiert für moderne Kernel-Thread-Profile.",
          "Deklarative Plattform-Zustands-Engines für unmittelbare Rollbacks unvollständiger Mikrotransaktionen."
        ],
        stat: "14ms",
        statSub: "P99 Client Query Latenzzeit"
      }
    },
    'security-first': {
      en: {
        subtitle: "Behind the Security: Cryptographic Verification Pillars",
        bullets: [
          "Zero-knowledge query layers that protect critical end-user information globally.",
          "Automatic end-to-end transport layer rotation with cryptographic dual-keys.",
          "Ongoing background validation audits that trigger alerts on anomalous system queries."
        ],
        stat: "AES-GCM",
        statSub: "256-bit Hardened Hardware Encryption"
      },
      de: {
        subtitle: "Hinter der Sicherheit: Kryptografische Verifizierungssäulen",
        bullets: [
          "Zero-Knowledge-Abfrageschichten, die kritische Endnutzerdaten weltweit schützen.",
          "Zweiseitig verschlüsselte automatische Transportlayer-Zyklen mit rotierenden Schlüsseln.",
          "Fortlaufende Hintergrundaudits, die bei verdächtigen Systemanfragen Alarm schlagen."
        ],
        stat: "AES-GCM",
        statSub: "256-bit Hardware-gestützte Verschlüsselung"
      }
    },
    'human-centric': {
      en: {
        subtitle: "Behind the UX: Redundant-free Interfaces & APIs",
        bullets: [
          "Interactive dashboard architectures optimized for lightning-quick cognitive capture.",
          "Uniform OpenAPI layout blueprints and modular developer tooling templates.",
          "Accessible visual interfaces supporting high-contrast, text-to-speech, and responsive layouts."
        ],
        stat: "85%",
        statSub: "Reduction in Developer Onboarding Lead Time"
      },
      de: {
        subtitle: "Hinter der UX: Redundanzfreie Oberflächen & APIs",
        bullets: [
          "Interaktives Dashboard-Design, optimiert auf schnelles kognitives Erfassen.",
          "Einheitliche OpenAPI-Blueprints und modulare Entwickler-Toolingtemplates.",
          "Barrierefreie visuelle Designs, die Vorlesemodus, Kontraste und mobile Ansichten unterstützen."
        ],
        stat: "85%",
        statSub: "Reduzierung der Einarbeitungszeit neuer Entwickler"
      }
    },
    'sustainable-tech': {
      en: {
        subtitle: "Behind the Environment: High-Efficiency Compute Engines",
        bullets: [
          "Compact low-overhead assembly constructs written to bypass excessive VM layers.",
          "Smart routing logic that prioritizes carbon-neutral computing regions.",
          "Aggressive cold-start optimization to prevent redundant hardware wake times."
        ],
        stat: "3.2 MW/h",
        statSub: "Estimated Corporate Carbon Offset Annually"
      },
      de: {
        subtitle: "Hinter der Umwelt: Hocheffiziente Berechnungs-Engines",
        bullets: [
          "Kompakte Low-Overhead-Assembly-Strukturen zur Umgehung unnötiger VM-Schichten.",
          "Intelligente Routing-Logiken, die CO2-neutrale Rechenzentren priorisieren.",
          "Aggressive Kaltstart-Optimierungen, um Energiesparmodi ideal zu nutzen."
        ],
        stat: "3.2 MW/h",
        statSub: "Geschätzte vermiedene CO2-Emissionen jährlich"
      }
    }
  };

  const activeDeepDive = technicalDeepDives[selectedId]?.[language] || technicalDeepDives['agile-engineering']?.[language] || technicalDeepDives['agile-engineering']['en'];

  return (
    <section
      id="values"
      className="py-24 bg-slate-50 px-6 border-b border-slate-100 relative overflow-hidden"
    >
      <div className="absolute top-[20%] right-[0%] w-[35%] h-[35%] rounded-full bg-indigo-500/5 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[0%] left-[-10%] w-[45%] h-[45%] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Header Block */}
        <div className="text-left max-w-3xl mb-16 font-sans">
          <span className="font-mono text-[10px] text-indigo-600 uppercase tracking-widest font-bold block mb-3">{t('values_sub')}</span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
            {t('values_title')}
          </h2>
          <p className="mt-4 text-slate-500 font-sans text-sm sm:text-base leading-relaxed font-normal">
            {t('values_desc')}
          </p>
        </div>

        {/* Dynamic Interactive Splits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Values Left List Selector (Bento columns) */}
          <div className="lg:col-span-5 flex flex-col gap-4 font-sans">
            {valuesData.map((val) => {
              const isSelected = val.id === selectedId;
              return (
                <button
                  key={val.id}
                  onClick={() => setSelectedId(val.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden flex items-start gap-4 cursor-pointer outline-none ${
                    isSelected
                      ? 'bg-indigo-50/50 border-indigo-200/80 shadow-md shadow-indigo-100/30 translate-x-1.5'
                      : 'bg-white border-slate-200/60 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  {/* Left accent strip */}
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-600 to-violet-600" />
                  )}

                  <div className={`p-3 rounded-xl transition-colors ${
                    isSelected ? 'bg-indigo-600/10 text-indigo-600' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {getIcon(val.iconName, 'w-5 h-5')}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-sans font-bold text-sm text-slate-800">{val.title}</span>
                      {isSelected ? (
                        <span className="font-mono text-[9px] font-bold text-indigo-600 uppercase tracking-wider">{t('values_active_view')}</span>
                      ) : (
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 transition-transform group-hover:translate-x-0.5" />
                      )}
                    </div>
                    <p className="text-xs text-slate-550 mt-2 leading-relaxed">
                      {val.description.slice(0, 95)}...
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Right Detailed Deep-Dive Card */}
          <div className="lg:col-span-7 font-sans">
            <motion.div
              layout
              key={selectedId}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="h-full bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/40 p-6 sm:p-8 flex flex-col justify-between"
            >
              {/* Header inside Card */}
              <div className="font-sans">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
                  <div>
                    <span className="font-sans font-extrabold text-lg text-slate-800">
                      {selectedValue.title}
                    </span>
                    <span className="block font-mono text-[10px] text-slate-450 mt-0.5 uppercase tracking-wide">
                      GEN_VAL_{selectedValue.id.toUpperCase().replace('-', '_')}
                    </span>
                  </div>
                  
                  {/* Metric display box */}
                  <div className="text-right">
                    <span className="block font-sans font-extrabold text-2xl text-indigo-600">
                      {selectedValue.metric}
                    </span>
                    <span className="block font-sans text-[10px] text-slate-400 font-medium">
                      {selectedValue.metricLabel}
                    </span>
                  </div>
                </div>

                <p className="text-slate-600 font-sans text-sm leading-relaxed font-normal">
                  {selectedValue.description}
                </p>

                {/* Sub-features list */}
                <div className="mt-8">
                  <h4 className="font-sans font-bold text-xs text-slate-700 uppercase tracking-wider mb-4">
                    {activeDeepDive.subtitle}
                  </h4>
                  <ul className="space-y-3.5">
                    {activeDeepDive.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="font-sans text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Technical Indicator at bottom */}
              <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap gap-6 items-center justify-between bg-slate-50 rounded-xl p-4">
                <div>
                  <span className="block font-sans text-[9px] text-slate-450 uppercase tracking-widest font-semibold">{t('values_benchmarks')}</span>
                  <span className="block font-sans font-bold text-xs text-slate-700 mt-1">{t('values_benchmarks_sub')}</span>
                </div>
                <div className="flex items-center gap-2 text-right">
                  <div>
                    <span className="block font-sans font-bold text-sm text-emerald-600">{activeDeepDive.stat}</span>
                    <span className="block font-sans text-[9px] text-slate-450 font-medium">{activeDeepDive.statSub}</span>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
