/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Globe, 
  Cpu, 
  Code2, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Users
} from "lucide-react";

const Logo = ({ linkable = false }: { linkable?: boolean }) => {
  const content = (
    <div className="flex items-center gap-2 group cursor-pointer" id="logo">
      <img src="/logo.png" alt="Generalsoft Logo" className="h-8 w-auto transition-transform duration-500 group-hover:rotate-[360deg]" />
      <span className="font-display text-xl tracking-tight">
        <span className="font-black">GENERAL</span><span className="font-light">SOFT</span>
      </span>
    </div>
  );
  return linkable ? <a href="#">{content}</a> : content;
};

const Nav = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f5f8fa]/80 backdrop-blur-md border-b border-brand-steel/10" id="main-nav">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <Logo linkable />
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-steel">
        <a href="#about" className="hover:text-brand-navy transition-colors">About</a>
        <a href="#services" className="hover:text-brand-navy transition-colors">Services</a>
        <a href="#contact" className="hover:text-brand-navy transition-colors">Contact</a>
        <a href="https://generalsoft.ae" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-brand-teal hover:text-brand-steel">
          generalsoft.ae <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  </nav>
);

const ServiceCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
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

const LandingPage = () => (
  <>
    {/* Hero Section */}
    <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto" id="hero">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-teal/10 text-brand-steel rounded-full text-xs font-bold uppercase tracking-wider mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-teal"></span>
            </span>
            Custom Software Development
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.9] tracking-tight mb-8">
            Software for <span className="text-brand-teal">everyone.</span>
          </h1>
          <p className="text-xl text-brand-navy/60 leading-relaxed mb-10 max-w-lg">
            Generalsoft Corporation builds tailored digital experiences for global markets. 
            From Seattle to the world, we design software that works for you.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="#contact" 
              className="px-8 py-4 bg-brand-navy text-white rounded-full font-bold hover:bg-brand-steel transition-all flex items-center gap-2 group"
            >
              Start a project
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#about" 
              className="px-8 py-4 border border-brand-steel/30 rounded-full font-bold hover:border-brand-navy transition-all text-brand-steel hover:text-brand-navy"
            >
              Learn more
            </a>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="aspect-square bg-gradient-to-br from-brand-navy/5 to-brand-teal/10 rounded-[4rem] flex items-center justify-center border border-white p-12">
            <div className="grid grid-cols-2 gap-6 w-full">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="aspect-square bg-white rounded-3xl shadow-sm border border-brand-steel/10 p-6 flex flex-col justify-between">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    i === 0 ? "bg-brand-navy/10 text-brand-navy" : 
                    i === 1 ? "bg-brand-steel/10 text-brand-steel" :
                    i === 2 ? "bg-brand-teal/10 text-brand-teal" :
                    "bg-brand-cyan/10 text-brand-cyan"
                  }`}>
                    {i === 0 ? <Code2 className="w-5 h-5" /> : 
                     i === 1 ? <Cpu className="w-5 h-5" /> :
                     i === 2 ? <Globe className="w-5 h-5" /> :
                     <Users className="w-5 h-5" />}
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-brand-steel/10 rounded" />
                    <div className="h-2 w-2/3 bg-brand-steel/5 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Services Section */}
    <section className="py-24 bg-brand-navy/[0.02] border-y border-brand-steel/10 px-6" id="services">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="font-display text-4xl font-bold mb-6 italic">Engineering Excellence.</h2>
            <p className="text-brand-navy/60 leading-relaxed">
              We specialize in high-performance custom software solutions that scale. 
              Our focus is on usability, security, and global accessibility.
            </p>
          </div>
          <div className="text-sm font-mono text-brand-steel bg-white px-4 py-2 rounded-lg border border-brand-steel/10">
            ESTD. 1998 // SEATTLE, WA
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <ServiceCard 
            icon={Code2}
            title="Custom Development"
            description="Tailored software architectures built from the ground up to solve your unique business challenges."
          />
          <ServiceCard 
            icon={Cpu}
            title="Enterprise Systems"
            description="Robust, scalable backends and distributed systems that handle high-load global operations."
          />
          <ServiceCard 
            icon={Globe}
            title="Global Markets"
            description="Specialized localization and strategic development for the USA and Middle Eastern markets."
          />
        </div>
      </div>
    </section>

    {/* Affiliate Link / Partners Section */}
    <section className="py-24 px-6 max-w-7xl mx-auto" id="about">
      <div className="bg-brand-navy rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-teal/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-8 italic">Global Reach, <br />Local Expertise.</h2>
            <p className="text-brand-steel/80 text-lg leading-relaxed mb-10">
              Generalsoft Corporation is headquartered in Seattle, WA, serving clients across the United States. 
              Our operations extend globally through our affiliate, Generalsoft FZ-LLC, incorporated in RAKEZ, UAE.
            </p>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-3xl font-display font-bold mb-1 italic">USA</div>
                <div className="text-xs uppercase tracking-widest text-brand-steel/60">Corporate HQ</div>
              </div>
              <div className="w-px h-12 bg-brand-steel/20" />
              <div className="text-center">
                <div className="text-3xl font-display font-bold mb-1 italic">UAE</div>
                <div className="text-xs uppercase tracking-widest text-brand-steel/60">Regional Hub</div>
              </div>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-cyan">Middle East Operations</span>
              <ExternalLink className="w-5 h-5 text-brand-steel" />
            </div>
            <h3 className="font-display text-2xl font-bold mb-4">generalsoft.ae</h3>
            <p className="text-brand-steel/80 mb-8 leading-relaxed">
              Our FZ-LLC subsidiary handles regional development and consulting within the United Arab Emirates.
            </p>
            <a 
              href="https://generalsoft.ae" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block text-center py-4 bg-brand-cyan text-brand-navy rounded-xl font-bold hover:bg-brand-teal transition-colors"
            >
              Visit generalsoft.ae
            </a>
          </div>
        </div>
      </div>
    </section>

    {/* Contact Section */}
    <section className="py-24 px-6 max-w-7xl mx-auto" id="contact">
      <div className="text-center mb-16">
        <h2 className="font-display text-4xl font-bold mb-4 italic">Get in touch.</h2>
        <p className="text-brand-navy/60">We respond to all inquiries within 24 business hours.</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-12">
        <div className="text-center">
          <div className="w-16 h-16 bg-brand-navy/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <MapPin className="w-6 h-6 text-brand-steel" />
          </div>
          <h4 className="font-bold mb-2">Seattle, USA</h4>
          <p className="text-brand-navy/60 text-sm leading-relaxed">
            300 Lenora St #440<br />
            Seattle, WA 98121<br />
            United States
          </p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-brand-navy/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-6 h-6 text-brand-steel" />
          </div>
          <h4 className="font-bold mb-2">Email Us</h4>
          <a href="mailto:info@generalsoft.com" className="text-brand-teal hover:underline font-medium">
            info@generalsoft.com
          </a>
          <p className="text-brand-steel/50 text-xs mt-2 uppercase tracking-widest">Global Support</p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-brand-navy/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <Phone className="w-6 h-6 text-brand-steel" />
          </div>
          <h4 className="font-bold mb-2">Call Us</h4>
          <a href="tel:+12062188385" className="text-brand-teal hover:underline font-medium">
            +1.206.218.8385
          </a>
          <p className="text-brand-steel/50 text-xs mt-2 uppercase tracking-widest">Business Hours PST</p>
        </div>
      </div>
    </section>
  </>
);

const PrivacyPage = () => (
  <section className="pt-32 pb-24 px-6 max-w-3xl mx-auto" id="privacy">
    <a href="#" className="inline-flex items-center gap-2 text-brand-steel hover:text-brand-navy transition-colors mb-8 text-sm font-medium">
      <ChevronLeft className="w-4 h-4" />
      Back to Home
    </a>
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
          Our website may contain links to third-party sites, including our affiliate generalsoft.ae. We are not
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
  </section>
);

const TermsPage = () => (
  <section className="pt-32 pb-24 px-6 max-w-3xl mx-auto" id="terms">
    <a href="#" className="inline-flex items-center gap-2 text-brand-steel hover:text-brand-navy transition-colors mb-8 text-sm font-medium">
      <ChevronLeft className="w-4 h-4" />
      Back to Home
    </a>
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
  </section>
);

export default function App() {
  const [page, setPage] = useState(() => window.location.hash.slice(1) || "home");

  useEffect(() => {
    const onHashChange = () => setPage(window.location.hash.slice(1) || "home");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <div className="min-h-screen font-sans selection:bg-brand-teal/20 selection:text-brand-navy">
      <Nav />
      
      <main>
        {page === "privacy" ? <PrivacyPage /> : page === "terms" ? <TermsPage /> : <LandingPage />}
      </main>

      <footer className="py-12 border-t border-brand-steel/10 text-center text-brand-steel/50 text-xs px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <Logo linkable />
          <div>
            &copy; {new Date().getFullYear()} Generalsoft Corporation. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:text-brand-navy transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-brand-navy transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
