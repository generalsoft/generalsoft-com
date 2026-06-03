/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, Server, TrendingUp, CheckCircle, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { db, isFirebaseConfigured } from '../firebase.ts';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export default function InteractiveWidget() {
  const { language, t } = useLanguage();
  const [industry, setIndustry] = useState<string>('');
  const [scale, setScale] = useState<string>('');
  const [bottleneck, setBottleneck] = useState<string>('');
  const [showResult, setShowResult] = useState<boolean>(false);
  const [bookingSubmitted, setBookingSubmitted] = useState<boolean>(false);
  const [bookingState, setBookingState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [demoName, setDemoName] = useState<string>('');
  const [demoEmail, setDemoEmail] = useState<string>('');
  const [captcha, setCaptcha] = useState({ q: '', a: 0 });
  const [userAnswer, setUserAnswer] = useState<string>('');

  const industries = [
    { id: 'fintech', label: language === 'de' ? 'Finanzwesen & FinTech' : 'Finance & FinTech', icon: '🏦' },
    { id: 'saas', label: language === 'de' ? 'Skalierungs-SaaS' : 'High-Scale SaaS', icon: '☁️' },
    { id: 'healthcare', label: language === 'de' ? 'Gesundheitswesen & EHR' : 'EHR & Healthcare', icon: '🏥' },
    { id: 'logistics', label: language === 'de' ? 'Lieferkette & Logistik' : 'Supply Chain & Logistics', icon: '📦' }
  ];

  const scales = [
    { 
      id: 'startup', 
      label: language === 'de' ? 'Startup-Prototyp (<100 Instanzen)' : 'Startup Prototype (<100 instances)', 
      desc: language === 'de' ? 'Erfordert schnelles, agiles Deployment' : 'Needs rapid agile deployment' 
    },
    { 
      id: 'midmarket', 
      label: language === 'de' ? 'Regionaler Edge-Cluster (100–1000 Instanzen)' : 'Regional Edge Cluster (100–1000 instances)', 
      desc: language === 'de' ? 'Erfordert Lastverteilung & Echtzeittelemetrie' : 'Needs load balancing & telemetry' 
    },
    { 
      id: 'enterprise', 
      label: language === 'de' ? 'Globaler Hyperscale (1000+ Instanzen)' : 'Global Hyperscale (1000+ instances)', 
      desc: language === 'de' ? 'Erfordert extreme Multi-Regionen-Compliance' : 'Needs multi-region extreme compliance' 
    }
  ];

  const bottlenecks = [
    { 
      id: 'latency', 
      label: language === 'de' ? 'Hoher P99 API-Latenz-Overhead' : 'Heavy P99 API Latency Overhead', 
      desc: language === 'de' ? 'Verlangsamte Requests beeinträchtigen Endnutzer' : 'Slow requests slowing down end users' 
    },
    { 
      id: 'orchestration', 
      label: language === 'de' ? 'Multi-Cloud-Ressourcenreibung' : 'Multi-Cloud Resource Friction', 
      desc: language === 'de' ? 'Isolierte Cluster und eskalierende Betriebskosten' : 'Siloed clusters and escalating runtime costs' 
    },
    { 
      id: 'security', 
      label: language === 'de' ? 'Komplizierte Identitäts- / Zugriffsprobleme' : 'Friction-filled Identity / Access Logs', 
      desc: language === 'de' ? 'Schwierigkeiten bei komplexen Sicherheitsprüfungen' : 'Difficulties with complex security compliance' 
    },
    { 
      id: 'legacy', 
      label: language === 'de' ? 'Veraltete Altdatenbanken' : 'Stuck with Archaic Legacy Databases', 
      desc: language === 'de' ? 'Jahre an COBOL- oder alten Java-Code-Schulden' : 'Years of COBOL or ancient Java code debt' 
    }
  ];

  const handleGenerate = () => {
    if (industry && scale && bottleneck) {
      const n1 = Math.floor(Math.random() * 10) + 1;
      const n2 = Math.floor(Math.random() * 10) + 1;
      setCaptcha({ q: `${n1} + ${n2}`, a: n1 + n2 });
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setIndustry('');
    setScale('');
    setBottleneck('');
    setShowResult(false);
    setBookingSubmitted(false);
    setUserAnswer('');
  };

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoName || !demoEmail) return;

    if (parseInt(userAnswer) !== captcha.a) {
      setBookingError(t('captcha_error'));
      const n1 = Math.floor(Math.random() * 10) + 1;
      const n2 = Math.floor(Math.random() * 10) + 1;
      setCaptcha({ q: `${n1} + ${n2}`, a: n1 + n2 });
      setUserAnswer('');
      return;
    }

    setBookingState('sending');
    setBookingError(null);
    const timeoutPromise = new Promise<never>((_, reject) =>
      window.setTimeout(() => reject(new Error('The booking request timed out. Please try again.')), 15000)
    );

    try {
      if (!isFirebaseConfigured || !db) {
        throw new Error('Firebase is not configured properly. Check VITE_FIREBASE_* environment variables.');
      }
      await Promise.race([
        addDoc(collection(db, 'demo_appointments'), {
          name: demoName,
          email: demoEmail,
          industry,
          scale,
          bottleneck,
          language,
          timestamp: serverTimestamp(),
        }),
        timeoutPromise,
      ]);
      setBookingState('success');
      setBookingSubmitted(true);
    } catch (err) {
      console.error('Booking write failed', err);
      setBookingError(err instanceof Error ? err.message : 'Unable to book the demo appointment.');
      setBookingState('error');
    }
  };

  // Logic to return dynamic config advice
  const getRecommendation = () => {
    let coreProduct = "GeneralCloud Engine";
    let speedGain = language === 'de' ? "45% Reduzierung der Latenz" : "45% reduction in latency";
    let compliance = "Zero-Trust Active Guarding";
    let migrationTerm = language === 'de' ? "2–3 Wochen Integrationszeit" : "2–3 weeks of integration";

    if (bottleneck === 'latency') {
      coreProduct = "GeneralGateway Server";
      speedGain = language === 'de' ? "Antwortzeiten unter 1 ms bei extremen Lasten" : "Sub-1ms response times on extreme loads";
      compliance = language === 'de' ? "Entkoppelte Edge-Payload-Validierung" : "Decoupled Edge Payload Validation";
      migrationTerm = language === 'de' ? "Eintägige DNS-Umschaltung" : "Single-day DNS changeover";
    } else if (bottleneck === 'security') {
      coreProduct = language === 'de' ? "GeneralShield Identitäts-Engine" : "GeneralShield Identity Engine";
      speedGain = language === 'de' ? "90% einfachere geschäftliche Logins" : "90% simpler secure corporate logins";
      compliance = language === 'de' ? "Kryptografisch zertifizierte Identitäten via ZKP" : "ZKP cryptographically certified identities";
      migrationTerm = language === 'de' ? "3–5 Werktage Migrationszeit" : "3–5 business days migration";
    } else if (bottleneck === 'legacy') {
      coreProduct = language === 'de' ? "GeneralIntelligence SDK + Custom Compiler-Knoten" : "GeneralIntelligence SDK + Custom Compiler Node";
      speedGain = language === 'de' ? "Kompiliert 1.000 Zeilen Altsystem-Code pro Minute" : "Refactors 1,000 legacy lines per minute";
      compliance = language === 'de' ? "Erstellt typsichere TS/Rust Zielmodelle" : "Generates type-safe TS/Rust target models";
      migrationTerm = language === 'de' ? "Iterative Pipeline-Bereitstellung" : "Iterative pipeline deployment";
    }

    return { coreProduct, speedGain, compliance, migrationTerm };
  };

  const rec = getRecommendation();

  return (
    <section
      id="interactive-architect"
      className="py-24 bg-white px-6 border-b border-slate-100 relative overflow-hidden"
    >
      <div className="absolute top-[-5%] left-[30%] w-[35%] h-[35%] rounded-full bg-indigo-500/5 blur-[105px] pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 font-sans">
          <span className="font-mono text-[9px] text-indigo-600 uppercase tracking-widest font-bold block mb-3">{t('config_sub')}</span>
          <h2 className="font-sans font-extrabold text-3xl text-slate-900 tracking-tight leading-tight">
            {t('config_title')}
          </h2>
          <p className="mt-3 text-slate-500 font-sans text-xs sm:text-sm">
            {t('config_desc')}
          </p>
        </div>

        {/* Form panel container */}
        <div className="bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden p-6 sm:p-10 shadow-lg shadow-slate-100/50">
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key="configurator-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8 text-left font-sans"
              >
                {/* Step 1: Industry */}
                <div>
                  <label className="block font-sans font-extrabold text-xs text-slate-500 uppercase tracking-widest mb-4">
                    {t('config_step_1')}
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {industries.map((ind) => (
                      <button
                        key={ind.id}
                        type="button"
                        onClick={() => setIndustry(ind.id)}
                        className={`p-4 rounded-xl border text-center transition-all cursor-pointer outline-none ${
                          industry === ind.id
                            ? 'bg-indigo-600 border-indigo-500 text-white font-semibold shadow-md shadow-indigo-600/15'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                        }`}
                      >
                        <span className="block text-2xl mb-2">{ind.icon}</span>
                        <span className="block font-sans text-xs">{ind.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Scale */}
                <div>
                  <label className="block font-sans font-extrabold text-xs text-slate-500 uppercase tracking-widest mb-4">
                    {t('config_step_2')}
                  </label>
                  <div className="space-y-2.5">
                    {scales.map((sc) => (
                      <button
                        key={sc.id}
                        type="button"
                        onClick={() => setScale(sc.id)}
                        className={`w-full text-left p-4 rounded-xl border flex items-center justify-between gap-4 transition-all cursor-pointer outline-none ${
                          scale === sc.id
                            ? 'bg-indigo-50/50 border-indigo-200 text-slate-800 shadow-sm'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                        }`}
                      >
                        <div className="font-sans">
                          <span className={`block text-xs font-bold ${
                            scale === sc.id ? 'text-slate-900' : 'text-slate-700'
                          }`}>
                            {sc.label}
                          </span>
                          <span className="block text-[10px] text-slate-450 mt-1 font-medium">
                            {sc.desc}
                          </span>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          scale === sc.id ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-300'
                        }`}>
                          {scale === sc.id && <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3: Pain Point */}
                <div>
                  <label className="block font-sans font-extrabold text-xs text-slate-500 uppercase tracking-widest mb-4">
                    {t('config_step_3')}
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {bottlenecks.map((bot) => (
                      <button
                        key={bot.id}
                        type="button"
                        onClick={() => setBottleneck(bot.id)}
                        className={`text-left p-4.5 rounded-xl border transition-all cursor-pointer outline-none flex flex-col justify-between ${
                          bottleneck === bot.id
                            ? 'bg-indigo-50/50 border-indigo-200 text-slate-800 shadow-md shadow-indigo-100/30'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                        }`}
                      >
                        <span className={`block font-sans text-xs font-bold ${
                          bottleneck === bot.id ? 'text-slate-900' : 'text-slate-700'
                        }`}>
                          {bot.label}
                        </span>
                        <span className="block font-sans text-[10px] text-slate-455 mt-2 leading-relaxed font-medium">
                          {bot.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-6 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={handleGenerate}
                    disabled={!industry || !scale || !bottleneck}
                    className={`px-8 py-3.5 rounded-full font-sans text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
                      industry && scale && bottleneck
                        ? 'bg-indigo-600 hover:bg-slate-900 text-white shadow-md shadow-indigo-600/10'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed font-semibold'
                    }`}
                  >
                    {t('config_btn_generate')}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="configurator-result"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8 text-left font-sans"
              >
                {/* Top Success Badge */}
                <div className="flex items-center gap-3 border-b border-slate-100 pb-6">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div className="font-sans">
                    <span className="block font-mono text-[9px] text-slate-450 uppercase tracking-widest font-semibold">{t('config_success_sub')}</span>
                    <h3 className="font-sans font-extrabold text-lg sm:text-xl text-slate-800 mt-0.5">
                      {t('config_success_title')}: {rec.coreProduct}
                    </h3>
                  </div>
                </div>

                {/* Specific Specs Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-xl bg-white border border-slate-100 shadow-sm">
                    <span className="block font-sans text-[10px] text-slate-450 uppercase tracking-widest font-semibold">{t('config_stat_speed')}</span>
                    <span className="block font-sans font-extrabold text-sm text-emerald-600 mt-2">
                      {rec.speedGain}
                    </span>
                  </div>
                  <div className="p-5 rounded-xl bg-white border border-slate-100 shadow-sm">
                    <span className="block font-sans text-[10px] text-slate-450 uppercase tracking-widest font-semibold">{t('config_stat_compliance')}</span>
                    <span className="block font-sans font-extrabold text-sm text-indigo-600 mt-2">
                      {rec.compliance}
                    </span>
                  </div>
                  <div className="p-5 rounded-xl bg-white border border-slate-100 shadow-sm md:col-span-2">
                    <span className="block font-sans text-[10px] text-slate-455 uppercase tracking-widest font-semibold">{t('config_stat_pipeline')}</span>
                    <span className="block font-sans font-extrabold text-sm text-violet-600 mt-2">
                      {rec.migrationTerm} {language === 'de' ? '(Standard-SLA-Bereitstellung)' : '(Standard SLA delivery)'}
                    </span>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 mt-8 font-sans">
                  {!bookingSubmitted ? (
                    <form onSubmit={handleDemoSubmit} className="space-y-4">
                      <span className="block font-sans font-extrabold text-xs text-slate-750 uppercase tracking-wider">
                        {t('config_form_title')}
                      </span>
                      <p className="text-slate-500 font-sans text-xs max-w-xl font-normal leading-relaxed">
                        {t('config_form_desc')}
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <input
                          type="text"
                          required
                          value={demoName}
                          onChange={(e) => setDemoName(e.target.value)}
                          placeholder={t('config_field_name')}
                          className="px-4 py-3 bg-white text-slate-800 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-indigo-600 focus:outline-none placeholder:text-slate-400 font-semibold"
                        />
                        <input
                          type="email"
                          required
                          value={demoEmail}
                          onChange={(e) => setDemoEmail(e.target.value)}
                          placeholder={t('config_field_email')}
                          className="px-4 py-3 bg-white text-slate-800 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-indigo-600 focus:outline-none placeholder:text-slate-400 font-semibold"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block font-sans font-bold text-[10px] text-slate-450 uppercase tracking-widest">{t('captcha_label')}</label>
                        <input 
                          type="number" 
                          required 
                          value={userAnswer}
                          onChange={(e) => setUserAnswer(e.target.value)}
                          placeholder={t('captcha_placeholder').replace('{q}', captcha.q)}
                          className="w-full max-w-[150px] px-4 py-3 bg-white text-slate-800 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-indigo-600 focus:outline-none font-bold" 
                        />
                      </div>
                      
                      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                        <button
                          type="button"
                          onClick={handleReset}
                          className="px-5 py-2.5 rounded-full text-slate-400 hover:text-slate-600 font-sans text-xs transition-colors cursor-pointer font-bold uppercase tracking-wide"
                        >
                          {t('config_btn_configure_again')}
                        </button>
                        <button
                          type="submit"
                          disabled={bookingState === 'sending'}
                          className={`px-6 py-2.5 rounded-full text-white font-sans text-xs font-semibold tracking-wider cursor-pointer active:scale-97 transition-all shadow-sm ${bookingState === 'sending' ? 'bg-slate-400 cursor-wait' : 'bg-indigo-600 hover:bg-slate-900'}`}
                        >
                          {bookingState === 'sending' ? 'Booking...' : t('config_btn_book')}
                        </button>
                      </div>
                      {bookingState === 'error' && bookingError ? (
                        <p className="text-sm text-red-600">{bookingError}</p>
                      ) : null}
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-5 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center gap-4"
                    >
                      <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                      <div className="font-sans">
                        <span className="block font-sans font-bold text-xs text-slate-800">{t('config_success_received')}</span>
                        <p className="text-[11px] text-slate-550 font-sans mt-1">
                          {t('config_success_detail').replace('{name}', demoName).replace('{email}', demoEmail)}
                        </p>
                        <button
                          type="button"
                          onClick={handleReset}
                          className="mt-3 px-3 py-1.5 bg-white hover:bg-slate-50 rounded-md border border-slate-200 text-slate-600 text-[10px] tracking-wide uppercase transition-colors cursor-pointer font-semibold shadow-sm"
                        >
                          {t('config_btn_configure_again')}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
