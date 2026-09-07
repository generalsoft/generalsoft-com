/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LifeBuoy, Mail, Phone, Clock, Send, CheckCircle2, ExternalLink, ChevronLeft } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { db, isFirebaseConfigured } from '../firebase.ts';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const RESOURCE_LINKS: { key: string; href: string }[] = [
  { key: 'support_resources_marketplace', href: 'https://marketplace.visualstudio.com/publishers/generalsoft' },
  { key: 'support_resources_apps_ios', href: 'https://apps.apple.com/developer/generalsoft' },
  { key: 'support_resources_apps_android', href: 'https://play.google.com/store/apps/developer?id=Generalsoft' },
  { key: 'support_resources_docs', href: 'https://generalsoft.com/#services' },
];

const PRODUCT_TYPES = ['mobile', 'extension', 'custom', 'other'] as const;

export default function SupportPage({ onNavigate }: { onNavigate: (sectionId: string) => void }) {
  const { t, language } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [captcha, setCaptcha] = useState({ q: '', a: 0 });
  const [userAnswer, setUserAnswer] = useState<string>('');

  useEffect(() => {
    const n1 = Math.floor(Math.random() * 10) + 1;
    const n2 = Math.floor(Math.random() * 10) + 1;
    setCaptcha({ q: `${n1} + ${n2}`, a: n1 + n2 });
  }, [status]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (parseInt(userAnswer, 10) !== captcha.a) {
      setSubmitError(t('captcha_error'));
      setUserAnswer('');
      return;
    }

    setStatus('sending');
    setSubmitError(null);

    const formData = new FormData(e.currentTarget);
    const payload = {
      productType: formData.get('productType'),
      softwareName: formData.get('softwareName'),
      version: formData.get('version'),
      subject: formData.get('subject'),
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      timestamp: serverTimestamp(),
      language,
    };

    const timeoutPromise = new Promise<never>((_, reject) =>
      window.setTimeout(() => reject(new Error(t('error_timeout'))), 15000)
    );

    try {
      if (!isFirebaseConfigured || !db) {
        throw new Error('Firebase is not configured properly. Check VITE_FIREBASE_* environment variables.');
      }
      await Promise.race([
        addDoc(collection(db, 'support'), payload),
        timeoutPromise,
      ]);
      setStatus('success');
    } catch (err) {
      console.error('Firebase Error:', err);
      setSubmitError(err instanceof Error ? err.message : 'Unable to submit support request.');
      setStatus('error');
    }
  };

  return (
    <section className="pt-32 pb-24 px-6 max-w-7xl mx-auto" id="support">
      <button
        onClick={() => onNavigate('home')}
        className="inline-flex items-center gap-2 text-brand-steel hover:text-brand-navy transition-colors mb-8 text-sm font-medium"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Home
      </button>

      <div className="grid lg:grid-cols-2 gap-20">
        <div>
          <div className="inline-flex items-center gap-2 text-brand-teal font-bold text-sm uppercase tracking-widest mb-4">
            <LifeBuoy className="w-4 h-4" />
            {t('support_eyebrow')}
          </div>
          <h2 className="font-display text-5xl font-bold mb-6 italic">{t('support_title')}</h2>
          <p className="text-xl text-brand-navy/60 mb-12">{t('support_sub')}</p>

          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-brand-navy text-white rounded-xl flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold">{t('support_help_email')}</h4>
                <a href="mailto:info@generalsoft.com" className="text-brand-teal hover:underline font-medium">info@generalsoft.com</a>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-brand-teal text-white rounded-xl flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold">{t('support_help_phone')}</h4>
                <a href="tel:+12062188385" className="text-brand-teal hover:underline font-medium">+1.206.218.8385</a>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-brand-cyan text-brand-navy rounded-xl flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold">{t('support_help_hours_label')}</h4>
                <p className="text-brand-navy/60">{t('support_help_hours')}</p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-brand-navy/[0.02] border border-brand-steel/10 rounded-2xl">
            <h4 className="font-bold mb-4">{t('support_resources_title')}</h4>
            <ul className="space-y-3">
              {RESOURCE_LINKS.map((resource) => (
                <li key={resource.key}>
                  <a
                    href={resource.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-brand-steel hover:text-brand-teal transition-colors font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {t(resource.key)}
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center gap-2 text-brand-steel hover:text-brand-teal transition-colors font-medium"
                >
                  <ExternalLink className="w-4 h-4" />
                  {t('support_resources_custom')}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white border border-brand-steel/10 p-8 md:p-12 rounded-[2rem] shadow-xl shadow-brand-navy/5">
          {status === 'success' ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{t('support_form_success')}</h3>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="font-display text-xl font-bold text-brand-navy">{t('support_form_heading')}</h3>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-brand-steel">{t('support_product_type')}</label>
                <select
                  name="productType"
                  required
                  defaultValue=""
                  className="w-full px-6 py-4 bg-brand-navy/5 rounded-xl border-none focus:ring-2 focus:ring-brand-teal transition-all"
                >
                  <option value="" disabled>{t('support_product_type_placeholder')}</option>
                  {PRODUCT_TYPES.map((type) => (
                    <option key={type} value={type}>{t(`support_product_type_${type}`)}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-brand-steel">{t('support_software_name')}</label>
                <input name="softwareName" required placeholder={t('support_software_name_placeholder')} className="w-full px-6 py-4 bg-brand-navy/5 rounded-xl border-none focus:ring-2 focus:ring-brand-teal transition-all" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-brand-steel">{t('support_version')}</label>
                <input name="version" placeholder={t('support_version_placeholder')} className="w-full px-6 py-4 bg-brand-navy/5 rounded-xl border-none focus:ring-2 focus:ring-brand-teal transition-all" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-brand-steel">{t('support_subject')}</label>
                <input name="subject" required placeholder={t('support_subject_placeholder')} className="w-full px-6 py-4 bg-brand-navy/5 rounded-xl border-none focus:ring-2 focus:ring-brand-teal transition-all" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-brand-steel">{t('formName')}</label>
                <input name="name" required className="w-full px-6 py-4 bg-brand-navy/5 rounded-xl border-none focus:ring-2 focus:ring-brand-teal transition-all" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-brand-steel">{t('formEmail')}</label>
                <input name="email" type="email" required className="w-full px-6 py-4 bg-brand-navy/5 rounded-xl border-none focus:ring-2 focus:ring-brand-teal transition-all" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-brand-steel">{t('formMsg')}</label>
                <textarea name="message" rows={4} required className="w-full px-6 py-4 bg-brand-navy/5 rounded-xl border-none focus:ring-2 focus:ring-brand-teal transition-all" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-brand-steel">{t('captcha_label')}</label>
                <input
                  type="number"
                  required
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder={t('captcha_placeholder').replace('{q}', captcha.q)}
                  className="w-full max-w-[180px] px-6 py-4 bg-brand-navy/5 rounded-xl border-none focus:ring-2 focus:ring-brand-teal transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-4 bg-brand-navy text-white rounded-xl font-bold hover:bg-brand-steel transition-all flex items-center justify-center gap-2"
              >
                {status === 'sending' ? '...' : t('support_form_submit')}
                <Send className="w-4 h-4" />
              </button>

              {status === 'error' && submitError ? (
                <p className="text-sm text-red-600 mt-2">{submitError}</p>
              ) : null}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
