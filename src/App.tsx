/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase.ts";
import { motion } from "motion/react";
import {
  Cpu,
  Code2,
  Mail,
  Phone,
  MapPin,
  ChevronLeft,
  ShieldCheck,
  Smartphone,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Send,
  LucideIcon
} from "lucide-react";
import Header from "./components/Header.tsx";
import Hero from "./components/Hero.tsx";
import InteractiveWidget from "./components/InteractiveWidget.tsx";
import Offices from "./components/Offices.tsx";
import Solutions from "./components/Solutions.tsx";
import Team from "./components/Team.tsx";
import Timeline from "./components/Timeline.tsx";
import Values from "./components/Values.tsx";
import Footer from "./components/Footer.tsx";
import { useLanguage } from "./components/LanguageContext.tsx";
import { PARTNERS } from "./data";

const ServiceCard = ({ icon: Icon, title, description }: { icon: LucideIcon, title: string, description: string }) => (
  <div className="p-8 border border-brand-steel/10 bg-white rounded-2xl hover:border-brand-teal/30 hover:shadow-xl hover:shadow-brand-teal/5 transition-all duration-300 group">
    <div className="w-12 h-12 bg-brand-navy/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-brand-teal/10 transition-colors">
      <Icon className="w-6 h-6 text-brand-steel group-hover:text-brand-teal transition-colors" />
    </div>
    <h3 className="font-display text-lg font-bold mb-3">{title}</h3>
    <p className="text-brand-navy/60 leading-relaxed text-sm">
      {description}
    </p>
  </div>
);

const LandingPage = () => {
  const { t } = useLanguage();

  return (
    <>
      <Hero onExploreClick={() => { window.location.hash = 'about'; }} />

      {/* Partners Section */}
      <section className="py-12 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-xs font-bold text-brand-steel/40 uppercase tracking-[0.3em] mb-10">
            {t('partners')}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all">
            {['Microsoft', 'Oracle', 'Google', 'Cisco', 'IBM'].map((partner) => (
              <span key={partner} className="font-display text-2xl font-black text-brand-navy tracking-tighter">
                {partner.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-brand-navy/[0.02] border-y border-brand-steel/10 px-6" id="services">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-xl">
            <h2 className="font-display text-4xl font-bold mb-6 italic">
                {t('landing_title')}
            </h2>
              <p className="text-brand-navy/60 leading-relaxed">
                {t('landing_desc')}
              </p>
            </div>
            <div className="text-sm font-mono text-brand-steel bg-white px-4 py-2 rounded-lg border border-brand-steel/10">
              {t('since')}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              icon={Sparkles}
              title={t('ai')}
              description="Advanced machine learning models and predictive analytics to drive intelligent business decisions."
            />
            <ServiceCard
              icon={ShieldCheck}
              title={t('cyber')}
              description="Enterprise-grade security audits, threat mitigation, and data protection strategies since 1998."
            />
            <ServiceCard
              icon={Cpu}
              title={t('iot')}
              description="Connecting the physical and digital worlds with robust embedded systems and IoT architectures."
            />
            <ServiceCard
              icon={Code2}
              title={t('web')}
              description="High-performance, SEO-optimized web applications with modern UX/UI standards."
            />
            <ServiceCard
              icon={Smartphone}
              title={t('app')}
              description="Native and cross-platform mobile solutions designed for engagement and scalability."
            />
            <ServiceCard
              icon={GraduationCap}
              title={t('edu')}
              description="Technical workshops and corporate training to empower teams with cutting-edge tech skills."
            />
          </div>
        </div>
      </section>

      <InteractiveWidget />

      <Values />

      <Timeline />

      <Solutions />

      <Team />

      <Offices />
    </>
  );
};

const ContactPage = ({ onNavigate }: { onNavigate: (sectionId: string) => void }) => {
  const { t, language } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setSubmitError(null);
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      timestamp: serverTimestamp(),
      language,
    };

    const timeoutPromise = new Promise<never>((_, reject) =>
      window.setTimeout(() => reject(new Error('The submission timed out. Please try again.')), 15000)
    );

    try {
      if (!isFirebaseConfigured || !db) {
        throw new Error('Firebase is not configured properly. Check VITE_FIREBASE_* environment variables.');
      }
      const docRef = await Promise.race([
        addDoc(collection(db, 'inquiries'), payload),
        timeoutPromise,
      ]);
      setStatus('success');
    } catch (err) {
      console.error('Firebase Error:', err);
      setSubmitError(err instanceof Error ? err.message : 'Unable to submit inquiry.');
      setStatus('error');
    }
  };

  return (
    <section className="pt-32 pb-24 px-6 max-w-7xl mx-auto" id="contact">
      <div className="grid lg:grid-cols-2 gap-20">
        <div>
          <h2 className="font-display text-5xl font-bold mb-6 italic">{t('contactTitle')}.</h2>
          <p className="text-xl text-brand-navy/60 mb-12">{t('contactSub')}</p>

          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-brand-navy text-white rounded-xl flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold">USA</h4>
                <p className="text-brand-navy/60">300 Lenora St #440, Seattle, WA 98121, USA</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-brand-teal text-white rounded-xl flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold">Email</h4>
                <a href="mailto:info@generalsoft.com" className="text-brand-teal hover:underline font-medium">info@generalsoft.com</a>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-brand-cyan text-brand-navy rounded-xl flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold">Call Us</h4>
                <a href="tel:+12062188385" className="text-brand-teal hover:underline font-medium">+1.206.218.8385</a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-brand-steel/10 p-8 md:p-12 rounded-[2rem] shadow-xl shadow-brand-navy/5">
          {status === 'success' ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{t('formSuccess')}</h3>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
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
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-4 bg-brand-navy text-white rounded-xl font-bold hover:bg-brand-steel transition-all flex items-center justify-center gap-2"
              >
                {status === 'sending' ? '...' : t('formSubmit')}
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
};

const PrivacyPage = ({ onNavigate }: { onNavigate: (sectionId: string) => void }) => (
  <section className="min-h-screen pt-24 pb-24 px-6 bg-white" id="privacy">
    <div className="max-w-3xl mx-auto">
      <button
        onClick={() => onNavigate('home')}
        className="inline-flex items-center gap-2 text-brand-steel hover:text-brand-navy transition-colors mb-8 text-sm font-medium"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Home
      </button>
      <h2 className="font-display text-3xl font-bold mb-2">Privacy Policy</h2>
      <p className="text-brand-steel/60 text-sm mb-10">Last updated: {new Date().getFullYear()}</p>

      <div className="space-y-8 text-brand-navy/70">
        <div>
          <h3 className="font-display text-lg font-bold text-brand-navy mb-2">1. Information We Collect</h3>
          <p className="leading-relaxed">
            We collect information you provide directly, such as when you contact us via email or phone.
            This may include your name, email address, phone number, and any other details you choose to share.
            We also automatically collect certain technical information when you visit our website, including IP address,
            browser type, and usage patterns through standard server logs.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-brand-navy mb-2">2. How We Use Information</h3>
          <p className="leading-relaxed">
            We use the information we collect to respond to your inquiries, provide our services, improve our website,
            and communicate with you about our products and services. We do not sell, trade, or rent your personal
            information to third parties.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-brand-navy mb-2">3. Data Security</h3>
          <p className="leading-relaxed">
            We implement reasonable security measures to protect your personal information from unauthorized access,
            alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-brand-navy mb-2">4. Cookies</h3>
          <p className="leading-relaxed">
            Our website may use cookies to enhance your browsing experience. You can configure your browser to refuse
            cookies, but this may affect certain features of the site.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-brand-navy mb-2">5. Third-Party Links</h3>
          <p className="leading-relaxed">
            Our website may contain links to third-party sites, including our affiliate generalsoft.ae/en/. We are not
            responsible for the privacy practices of these external sites.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-brand-navy mb-2">6. Contact</h3>
          <p className="leading-relaxed">
            If you have questions about this Privacy Policy, please contact us at{" "}
            <a href="mailto:info@generalsoft.com" className="text-brand-teal hover:underline">info@generalsoft.com</a>.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const TermsPage = ({ onNavigate }: { onNavigate: (sectionId: string) => void }) => (
  <section className="min-h-screen pt-24 pb-24 px-6 bg-white" id="terms">
    <div className="max-w-3xl mx-auto">
      <button
        onClick={() => onNavigate('home')}
        className="inline-flex items-center gap-2 text-brand-steel hover:text-brand-navy transition-colors mb-8 text-sm font-medium"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Home
      </button>
      <h2 className="font-display text-3xl font-bold mb-2">Terms of Service</h2>
      <p className="text-brand-steel/60 text-sm mb-10">Last updated: {new Date().getFullYear()}</p>

      <div className="space-y-8 text-brand-navy/70">
        <div>
          <h3 className="font-display text-lg font-bold text-brand-navy mb-2">1. Acceptance of Terms</h3>
          <p className="leading-relaxed">
            By accessing or using the Generalsoft Corporation website, you agree to be bound by these Terms of Service.
            If you do not agree, please do not use our website or services.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-brand-navy mb-2">2. Services</h3>
          <p className="leading-relaxed">
            Generalsoft Corporation provides custom software development, enterprise systems, and consulting services.
            All services are subject to separate agreements and statements of work.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-brand-navy mb-2">3. Intellectual Property</h3>
          <p className="leading-relaxed">
            All content on this website, including text, graphics, logos, and software, is the property of Generalsoft
            Corporation and protected by applicable intellectual property laws. The GENERALSOFT name and logo are
            trademarks of Generalsoft Corporation.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-brand-navy mb-2">4. Limitation of Liability</h3>
          <p className="leading-relaxed">
            Generalsoft Corporation shall not be liable for any indirect, incidental, or consequential damages arising
            from the use of this website or our services. Our liability is limited to the maximum extent permitted by law.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-brand-navy mb-2">5. Governing Law</h3>
          <p className="leading-relaxed">
            These terms are governed by the laws of the State of Washington, United States. Any disputes shall be
            resolved in the courts of King County, Washington.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-brand-navy mb-2">6. Changes to Terms</h3>
          <p className="leading-relaxed">
            We reserve the right to update these terms at any time. Continued use of the website after changes
            constitutes acceptance of the revised terms.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-brand-navy mb-2">7. Contact</h3>
          <p className="leading-relaxed">
            For questions about these Terms, contact us at{" "}
            <a href="mailto:info@generalsoft.com" className="text-brand-teal hover:underline">info@generalsoft.com</a>.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const AboutPage = ({ onNavigate }: { onNavigate: (sectionId: string) => void }) => {
  const { t } = useLanguage();
  return (
    <section className="min-h-screen pt-24 pb-24 px-6 bg-white" id="about">
      <div className="max-w-5xl mx-auto">
        <button onClick={() => onNavigate('home')} className="inline-flex items-center gap-2 text-brand-steel hover:text-brand-navy transition-colors mb-8 text-sm font-medium">
          <ChevronLeft className="w-4 h-4" />
          Back to Home
        </button>

        <h2 className="font-display text-3xl font-bold mb-4">About Generalsoft</h2>
        <p className="text-brand-navy/70 leading-relaxed mb-8">{t('landing_desc')}</p>

        <div className="space-y-8">
          <Values />
          <Timeline />
        </div>
      </div>
    </section>
  );
};

const PartnersPage = ({ onNavigate }: { onNavigate: (sectionId: string) => void }) => {
  const { language } = useLanguage();

  return (
    <section className="min-h-screen pt-24 pb-24 px-6 bg-white" id="partners">
      <div className="max-w-5xl mx-auto">
        <button onClick={() => onNavigate('home')} className="inline-flex items-center gap-2 text-brand-steel hover:text-brand-navy transition-colors mb-8 text-sm font-medium">
          <ChevronLeft className="w-4 h-4" />
          Back to Home
        </button>

        <h2 className="font-display text-3xl font-bold mb-6">Our Partners</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {PARTNERS.map((p) => (
            <div key={p.name} className="p-6 border rounded-lg bg-white shadow-sm">
              <a href={p.url} target="_blank" rel="noreferrer" className="text-lg font-bold text-brand-navy hover:underline">{p.name}</a>
              <div className="text-sm text-brand-steel/70 mt-1 mb-3">{language === 'de' ? p.type_de || p.type : p.type}</div>
              <p className="text-brand-navy/70 text-sm leading-relaxed">{language === 'de' ? p.description_de || p.description : p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ValuesPage = ({ onNavigate }: { onNavigate: (sectionId: string) => void }) => (
  <section className="min-h-screen pt-24 pb-24 px-6 bg-slate-50" id="values">
    <div className="max-w-5xl mx-auto">
      <button onClick={() => onNavigate('home')} className="inline-flex items-center gap-2 text-brand-steel hover:text-brand-navy transition-colors mb-8 text-sm font-medium">
        <ChevronLeft className="w-4 h-4" />
        Back to Home
      </button>
      <Values />
    </div>
  </section>
);

const JourneyPage = ({ onNavigate }: { onNavigate: (sectionId: string) => void }) => (
  <section className="min-h-screen pt-24 pb-24 px-6 bg-white" id="journey">
    <div className="max-w-5xl mx-auto">
      <button onClick={() => onNavigate('home')} className="inline-flex items-center gap-2 text-brand-steel hover:text-brand-navy transition-colors mb-8 text-sm font-medium">
        <ChevronLeft className="w-4 h-4" />
        Back to Home
      </button>
      <Timeline />
    </div>
  </section>
);

const SolutionsPage = ({ onNavigate }: { onNavigate: (sectionId: string) => void }) => {
  const { t } = useLanguage();
  return (
    <section className="min-h-screen pt-24 pb-24 px-6 bg-white" id="services">
      <div className="max-w-7xl mx-auto">
        <button onClick={() => onNavigate('home')} className="inline-flex items-center gap-2 text-brand-steel hover:text-brand-navy transition-colors mb-8 text-sm font-medium">
          <ChevronLeft className="w-4 h-4" />
          Back to Home
        </button>

        <h2 className="font-display text-3xl font-bold mb-6">{t('landing_title')}</h2>
        <Solutions />
      </div>
    </section>
  );
};

const ConfiguratorPage = ({ onNavigate }: { onNavigate: (sectionId: string) => void }) => {
  const { t } = useLanguage();
  return (
    <section className="min-h-screen pt-24 pb-24 px-6 bg-slate-50" id="configurator">
      <div className="max-w-7xl mx-auto">
        <button onClick={() => onNavigate('home')} className="inline-flex items-center gap-2 text-brand-steel hover:text-brand-navy transition-colors mb-8 text-sm font-medium">
          <ChevronLeft className="w-4 h-4" />
          Back to Home
        </button>

        <h2 className="font-display text-3xl font-bold mb-6">{t('config_title')}</h2>
        <InteractiveWidget />
      </div>
    </section>
  );
};

const TeamPage = ({ onNavigate }: { onNavigate: (sectionId: string) => void }) => (
  <section className="min-h-screen pt-24 pb-24 px-6 bg-white" id="team">
    <div className="max-w-5xl mx-auto">
      <button onClick={() => onNavigate('home')} className="inline-flex items-center gap-2 text-brand-steel hover:text-brand-navy transition-colors mb-8 text-sm font-medium">
        <ChevronLeft className="w-4 h-4" />
        Back to Home
      </button>
      <Team />
    </div>
  </section>
);

const OfficesPage = ({ onNavigate }: { onNavigate: (sectionId: string) => void }) => (
  <section className="min-h-screen pt-24 pb-24 px-6 bg-slate-50" id="offices">
    <div className="max-w-7xl mx-auto">
      <button onClick={() => onNavigate('home')} className="inline-flex items-center gap-2 text-brand-steel hover:text-brand-navy transition-colors mb-8 text-sm font-medium">
        <ChevronLeft className="w-4 h-4" />
        Back to Home
      </button>
      <Offices />
    </div>
  </section>
);

const SLAPage = ({ onNavigate }: { onNavigate: (sectionId: string) => void }) => (
  <section className="min-h-screen pt-24 pb-24 px-6 bg-white" id="sla">
    <div className="max-w-5xl mx-auto">
      <button onClick={() => onNavigate('home')} className="inline-flex items-center gap-2 text-brand-steel hover:text-brand-navy transition-colors mb-8 text-sm font-medium">
        <ChevronLeft className="w-4 h-4" />
        Back to Home
      </button>
      <h2 className="font-display text-3xl font-bold mb-4">SLA Terms</h2>
      <div className="space-y-6 text-brand-navy/70">
        <p>Our service level commitments include 99.999% availability for mission-critical infrastructure, formalized incident response times, and documented maintenance windows. Please contact support for contract-specific terms.</p>
        <ul className="list-disc pl-6 text-brand-navy/70">
          <li>Availability guarantee: 99.999%</li>
          <li>Response: 1 hour for critical incidents</li>
          <li>Maintenance windows: scheduled with prior notice</li>
        </ul>
      </div>
    </div>
  </section>
);

export default function App() {
  const [page, setPage] = useState(() => window.location.hash.slice(1) || "home");
  const { language, t } = useLanguage();

  useEffect(() => {
    const onHashChange = () => setPage(window.location.hash.slice(1) || "home");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const [cookieConsent, setCookieConsent] = useState<'accepted' | 'declined' | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedConsent = window.localStorage.getItem('generalsoft_cookie_consent');
      if (storedConsent === 'accepted' || storedConsent === 'declined') {
        setCookieConsent(storedConsent);
      }
    }
  }, []);

  const handleCookieDecision = (decision: 'accepted' | 'declined') => {
    setCookieConsent(decision);
    window.localStorage.setItem('generalsoft_cookie_consent', decision);
  };

  const navigateTo = (sectionId: string) => {
    if (sectionId === 'home') {
      window.location.hash = '';
    } else {
      window.location.hash = sectionId;
    }
  };

  useEffect(() => {
    // SEO/GEO Optimization
    document.documentElement.lang = language;

    // Enhanced Keyword-rich Titles
    const title = page === 'home'
      ? t('meta_title_home')
      : `${page.charAt(0).toUpperCase() + page.slice(1)} | ${t('meta_title_suffix')}`;
    document.title = title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t('heroSub'));

    // Hreflang Tags for Language Discovery
    const updateHreflang = (lang: string, href: string) => {
      let el = document.querySelector(`link[hreflang="${lang}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', 'alternate');
        el.setAttribute('hreflang', lang);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    const currentBase = window.location.origin + (page === 'home' ? '/' : `/#${page}`);
    // Note: Ideally, localized versions should have unique URLs like ?lang=de
    updateHreflang('en', currentBase);
    updateHreflang('de', currentBase + (currentBase.includes('?') ? '&' : '?') + 'lang=de');
    updateHreflang('x-default', currentBase);

    // Canonical Tag Management
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    const baseUrl = window.location.origin;
    canonical.setAttribute('href', page === 'home' ? `${baseUrl}/` : `${baseUrl}/#${page}`);

    // JSON-LD Schema Markup
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Generalsoft Corporation",
      "alternateName": "Generalsoft",
      "url": "https://generalsoft.com",

      "logo": {
        "@type": "ImageObject",
        "url": "https://generalsoft.com/logo.png"
      },

      "description": t("hero_desc"),

      "sameAs": [
        "https://www.linkedin.com/in/generalsoft",
        "https://x.com/generalsoft",
        "https://github.com/generalsoft",
        "https://youtube.com/@generalsoft_ae",
        "https://www.facebook.com/generalsoft"        
      ],

      "subjectOf": [
        {
          "@type": "WebSite",
          "name": "Generalsoft AE (Affiliate)",
          "url": "https://generalsoft.ae"
        }
      ],

      "contactPoint": [
        {
          "@type": "ContactPoint",
          "contactType": "customer support",
          "url": "https://generalsoft.com/contact",
          "availableLanguage": ["English"]
        }
      ],

      "address": {
        "@type": "PostalAddress",
        "addressCountry": "AE"
      },

      "foundingDate": "2025"
    };

    let schemaScript = document.getElementById('json-ld-schema');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'json-ld-schema';
      schemaScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(schemaScript);
    }
    schemaScript.innerHTML = JSON.stringify(schemaData);
  }, [page, language]);

  useEffect(() => {
    // Scroll to top when page changes
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="min-h-screen font-sans selection:bg-brand-teal/20 selection:text-brand-navy">
      <Header onNavigate={navigateTo} activeSection={page} />
      {!isFirebaseConfigured ? (
        <div className="fixed inset-x-0 top-16 z-50 bg-rose-600 text-white px-4 py-3 text-sm text-center shadow-lg">
          Firebase is not configured for this deployment. Messages will not be sent. Check VITE_FIREBASE_* build secrets.
        </div>
      ) : null}

      <main className={isFirebaseConfigured ? '' : 'pt-14'}>
        {page === "privacy" ? <PrivacyPage onNavigate={navigateTo} /> :
          page === "terms" ? <TermsPage onNavigate={navigateTo} /> :
            page === "contact" ? <ContactPage onNavigate={navigateTo} /> :
              page === 'about' ? <AboutPage onNavigate={navigateTo} /> :
                page === 'partners' ? <PartnersPage onNavigate={navigateTo} /> :
                  (page === 'services' || page === 'solutions') ? <SolutionsPage onNavigate={navigateTo} /> :
                    page === 'values' ? <ValuesPage onNavigate={navigateTo} /> :
                      page === 'journey' ? <JourneyPage onNavigate={navigateTo} /> :
                        page === 'team' ? <TeamPage onNavigate={navigateTo} /> :
                          page === 'offices' ? <OfficesPage onNavigate={navigateTo} /> :
                            page === 'sla' ? <SLAPage onNavigate={navigateTo} /> :
                              page === 'configurator' ? <ConfiguratorPage onNavigate={navigateTo} /> :
                                <LandingPage />}
      </main>

      <Footer onNavigate={(sectionId) => { window.location.hash = sectionId; }} />

      {cookieConsent === null ? (
        <div className="fixed inset-x-0 bottom-0 z-50 bg-slate-950 text-white px-4 py-4 shadow-2xl border-t border-slate-700">
          <div className="max-w-7xl mx-auto flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-sm">
            <div className="space-y-2 md:space-y-0 md:pr-6">
              <div className="font-semibold text-white">{t('cookie_prompt_title')}</div>
              <p className="text-slate-300 max-w-3xl">{t('cookie_prompt_body')}</p>
            </div>
            <div className="flex flex-wrap gap-3 md:gap-4 items-center">
              <button
                type="button"
                onClick={() => handleCookieDecision('accepted')}
                className="inline-flex items-center justify-center rounded-full bg-brand-teal px-4 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-brand-teal/90"
              >
                {t('cookie_btn_accept')}
              </button>
              <button
                type="button"
                onClick={() => handleCookieDecision('declined')}
                className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-200 transition-colors hover:border-slate-500 hover:text-white"
              >
                {t('cookie_btn_decline')}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
