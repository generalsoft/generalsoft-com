/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Globe, Clock } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { Office } from '../types';

const PIN_POSITION_CLASS: Record<string, string> = {
  'Silicon Valley': 'left-[18%] top-[35%]',
  Frankfurt: 'left-[48%] top-[28%]',
  Tokyo: 'left-[82%] top-[36%]',
};

export default function Offices() {
  const { language, t, getOffices } = useLanguage();
  const officesList = getOffices();
  const [selectedOfficeCity, setSelectedOfficeCity] = useState<string>('Silicon Valley');
  const [times, setTimes] = useState<Record<string, string>>({});

  useEffect(() => {
    const updateTimes = () => {
      const newTimes: Record<string, string> = {};
      officesList.forEach((o) => {
        try {
          const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: o.timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
          });
          newTimes[o.city] = formatter.format(new Date());
        } catch (e) {
          newTimes[o.city] = new Date().toLocaleTimeString();
        }
      });
      setTimes(newTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, [officesList]);

  const activeOffice = officesList.find((o) => o.city === selectedOfficeCity) || officesList[0];

  return (
    <section
      id="offices"
      className="py-24 bg-white px-6 border-b border-slate-100 relative overflow-hidden"
    >
      <div className="absolute top-[10%] right-[30%] w-[35%] h-[35%] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 font-sans">
          <span className="font-mono text-[9px] text-indigo-600 uppercase tracking-widest font-bold block mb-3">{t('offices_sub')}</span>
          <h2 className="font-sans font-extrabold text-3xl text-slate-900 tracking-tight leading-tight">
            {t('offices_title')}
          </h2>
          <p className="mt-2.5 text-slate-500 font-sans text-xs sm:text-sm">
            {t('offices_desc')}
          </p>
        </div>

        {/* Global Map Content Wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch font-sans">
          
          {/* SVG Coordinate Map Card */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden">
            <div>
              <span className="block font-mono text-[9px] text-slate-400 uppercase tracking-widest mb-6 font-semibold">{t('offices_coordinates')}</span>
              
              {/* Fake grid vector map illustration with node dots */}
              <div className="relative aspect-[16/9] w-full bg-slate-100 rounded-xl border border-slate-150 p-2 overflow-hidden office-map-background">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(148,163,184,0.16),transparent_22%),radial-gradient(circle_at_bottom_right,_rgba(148,163,184,0.12),transparent_26%)] pointer-events-none" />
                
                {/* Visual coordinate paths connecting offices */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
                  <path
                    d="M 18 35 Q 33 22, 48 28 T 82 36"
                    fill="none"
                    stroke="#4f46e5"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                </svg>

                {officesList.map((off) => {
                  const isActive = off.city === selectedOfficeCity;
                  return (
                    <button
                      key={off.city}
                      onClick={() => setSelectedOfficeCity(off.city)}
                      className={`absolute p-2 -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110 cursor-pointer outline-none group ${PIN_POSITION_CLASS[off.city] ?? 'left-[50%] top-[50%]'}`}
                    >
                      {/* Pulse Ring */}
                      <span className={`absolute inset-0 w-8 h-8 -left-0.5 -top-0.5 rounded-full animate-ping pointer-events-none opacity-30 ${
                        isActive ? 'bg-indigo-400' : 'bg-slate-400'
                      }`} />
                      
                      {/* Anchor Dot */}
                      <div className={`w-3.5 h-3.5 rounded-full border-2 border-white transition-colors ${
                        isActive ? 'bg-indigo-600 shadow-md shadow-indigo-400/50' : 'bg-slate-400 hover:bg-indigo-600'
                      }`} />

                      {/* Tooltip text anchor */}
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-sm border border-slate-800 rounded-md px-2 py-0.5 pointer-events-none shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        <span className="block font-sans text-[8px] text-white font-bold">{off.city}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Timezones summary row */}
            <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-3 gap-3">
              {officesList.map((o) => {
                const isActive = o.city === selectedOfficeCity;
                return (
                  <button
                    key={o.city}
                    onClick={() => setSelectedOfficeCity(o.city)}
                    className={`p-3.5 text-left rounded-xl transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-white border-indigo-200 shadow-md shadow-indigo-100/30'
                        : 'bg-white/40 border-slate-150 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <span className="block font-sans font-bold text-[11px] text-slate-800">{o.city}</span>
                    <div className="flex items-center gap-1 text-slate-550 mt-1.5 font-mono text-[9px] font-semibold">
                      <Clock className="w-3 h-3 text-indigo-500" />
                      <span>{times[o.city] || '--:--:--'}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Core Hub Specs details Card */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white border border-slate-200/60 shadow-xl shadow-slate-100/50 rounded-2xl p-6 sm:p-8">
            <div>
              <div className="flex items-center justify-between border-b border-slate-105 pb-6 mb-6">
                <div className="font-sans">
                  <h3 className="font-sans font-extrabold text-slate-800 text-lg">
                    {activeOffice.city} Hub
                  </h3>
                  <span className="block font-sans text-xs text-indigo-600 font-bold mt-0.5">
                    {language === 'de' && activeOffice.city === 'Munich' ? 'Deutschland' : activeOffice.country}
                  </span>
                </div>

                {activeOffice.isHQ && (
                  <span className="px-2.5 py-1 rounded bg-indigo-50 border border-indigo-120 text-indigo-600 font-mono text-[9px] uppercase tracking-wider font-bold">
                    Global HQ
                  </span>
                )}
              </div>

              {/* Specs parameters lists */}
              <div className="space-y-4 font-sans">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-sans text-[10px] text-slate-450 uppercase tracking-widest font-semibold">{t('offices_location')}</span>
                    <span className="block font-sans text-xs sm:text-sm text-slate-700 mt-1 font-normal leading-normal">
                      {activeOffice.city} Corporate Park, Suite {activeOffice.isHQ ? (language === 'de' ? '400 (Hauptverwaltung)' : '400 (Executive Office)') : (language === 'de' ? '18 (Entwicklungsknoten)' : '18 (Engineering Node)')}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-sans text-[10px] text-slate-450 uppercase tracking-widest font-semibold">{t('offices_email')}</span>
                    <a
                      href={`mailto:${activeOffice.email}`}
                      className="block font-mono text-xs text-indigo-600 mt-1 hover:underline font-semibold"
                    >
                      {activeOffice.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-sans text-[10px] text-slate-450 uppercase tracking-widest font-semibold">{t('offices_phone')}</span>
                    <a
                      href={`tel:${activeOffice.phone}`}
                      className="block font-mono text-xs text-slate-600 mt-1 hover:underline font-semibold"
                    >
                      {activeOffice.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-sans text-[10px] text-slate-455 uppercase tracking-widest font-semibold">{t('offices_window')}</span>
                    <span className="block font-sans text-xs text-slate-700 mt-1 font-normal">
                      {t('offices_window_support')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Support guarantee banner */}
            <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-105 font-sans text-xs text-slate-500 leading-relaxed font-normal">
              <span className="block font-extrabold text-slate-800 mb-1">{t('offices_sla_title')}</span>
              {t('offices_sla_desc')}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
