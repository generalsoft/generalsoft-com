/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CORE_VALUES, SOLUTIONS, LEADERSHIP, JOBS, MILESTONES, OFFICES } from '../data';
import { CoreValue, Solution, Leader, JobPost, Milestone, Office } from '../types';

export type Language = 'en' | 'de';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  getMilestones: () => Milestone[];
  getCoreValues: () => CoreValue[];
  getSolutions: () => Solution[];
  getLeaders: () => Leader[];
  getJobs: () => JobPost[];
  getOffices: () => Office[];
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

// UI Static Translation Dictionary
const TRANSLATION_DICTIONARY: Record<Language, Record<string, string>> = {
  en: {
    // Nav / Header
    nav_overview: "Overview",
    nav_values: "Core Values",
    nav_platforms: "Solutions",
    nav_configurator: "Configurator",
    nav_leadership: "Leadership",
    nav_offices: "Global Offices",
    nav_careers: "Careers",
    cta_get_started: "Get Started",
    logo_sub: "Corporation",

    // Hero Section
    hero_badge: "Empowering Global Enterprises Since 2014",
    hero_title_1: "Autonomous Systems.",
    hero_title_2: "Resilient Longevity.",
    hero_desc: "Generalsoft Corporation pioneers fault-tolerant custom operating layers, high-volume transactional pipelines, and autonomous AI-driven architecture modernization systems that enable global enterprises to scale without fear of obsolescence.",
    hero_cta_mission: "Explore Company Mission",
    hero_cta_careers: "View Careers",
    hero_stat_clients: "Enterprise Clients",
    hero_stat_sla: "SLA Guarantee",
    hero_stat_transacted: "Projects Delivered",
    hero_sys_secure: "SYSTEM SECURE AND STABLE",
    hero_scroll: "Scroll to Explore",

    // Values Section
    values_sub: "Our Core Philosophy",
    values_title: "Designed for Reliability, Built on Principles.",
    values_desc: "Many companies compile solutions to finish immediate tickets. We engineer our stacks to serve as generational structural baselines.",
    values_active_view: "Active View",
    values_benchmarks: "Performance Benchmarks",
    values_benchmarks_sub: "Validated on Intel Sapphire Rapids",

    // Timeline Section
    timeline_sub: "Our Corporate Journey",
    timeline_title: "Charting 28 Years of Solutions Delivery",
    timeline_desc: "From a garage distributed-compute lab to an international enterprise modernization benchmark. Select a topic to isolate our growth vectors.",
    timeline_all_filter: "Full Archive",
    timeline_empty: "No entries match this filter segment.",

    // Solutions Section
    solutions_sub: "Enterprise Systems",
    solutions_title: "The Generalsoft Suite: Architecture Breakdown",
    solutions_desc: "We architect and license specific backend layers, middleware engines, and modernization compilers that resolve scale boundaries for tech-forward enterprises.",
    solutions_spec_doc: "Platform Specification Doc",
    solutions_deployment_id: "Deployment ID",
    solutions_core_underlay: "Core Engineering Underlay",
    solutions_installs: "Active Installs / Daily Load",
    solutions_sla_satisfaction: "Client SLA Satisfaction",

    // Configurator / Interactive Sandbox Section
    config_sub: "Enterprise Sandbox",
    config_title: "The Generalsoft Solution Configurator",
    config_desc: "Answer three quick variables regarding your infrastructure demands, and evaluate our immediate technical architecture design.",
    config_step_1: "Step 1: Focus Industry",
    config_step_2: "Step 2: Operational Scale",
    config_step_3: "Step 3: Primary System Bottleneck",
    config_btn_generate: "Generate Architectural Mapping",
    config_success_sub: "Architect Solution Blueprint Ready",
    config_success_title: "Recommended",
    config_stat_speed: "Expected Performance Improvement",
    config_stat_compliance: "Cryptographic Compliance Layer",
    config_stat_pipeline: "Integration Deployment Pipeline Estimate",
    config_form_title: "Request a 1-on-1 Systems Architect Call",
    config_form_desc: "Interested in booking a structural assessment containing custom benchmark graphs? Leave your details below and we will schedule an appointment.",
    config_field_name: "Your Name",
    config_field_email: "Corporate Email",
    config_btn_configure_again: "Configure Again",
    config_btn_book: "Book Demo Appointment",
    config_success_received: "Application Received successfully!",
    config_success_detail: "Thank you {name}. A Senior Enterprise Systems Engineer will follow up at {email} within 1 business day.",
    cookie_prompt_title: "We use cookies for performance and analytics.",
    cookie_prompt_body: "By accepting, you help us deliver a faster, more reliable experience while we keep your data secure.",
    cookie_btn_accept: "Accept Cookies",
    cookie_btn_decline: "Decline",

    // Team Section
    team_sub: "Leadership & Decentration",
    team_title: "The Architects Behind Generalsoft",
    team_desc: "Our executives combine decades of research, open-source maintainership, and hyper-scale operations expertise to engineer resilient technologies.",
    team_dept: "Background Focus",
    team_back_btn: "Hide executive bio overview",
    team_show_btn: "Exhaustive professional bio",

    // Offices Section
    offices_sub: "SLA Stability & Offices",
    offices_title: "Our Global Operations Map",
    offices_desc: "We operate fully staffed regional hubs across three continents to ensure real-time systems telemetry oversight and premium round-the-clock enterprise support.",
    offices_coordinates: "Interactive Vector coordinates",
    offices_hq_badge: "Global HQ",
    offices_detail_title: "Office Location Details",
    offices_detail_email: "Direct Email Access",
    offices_detail_phone: "Direct Telephone Line",
    offices_location: "Location",
    offices_email: "Email",
    offices_phone: "Phone",
    offices_window: "Support Window",
    offices_window_desc: "24/7/365 On-Call Systems Coverage",
    offices_window_support: "Global response coverage and instant support escalation.",
    offices_sla_title: "Our Universal SLA Pledge",
    offices_sla_desc: "All Generalsoft nodes trigger automatic cloud telemetry signals directly to nearby hubs, generating instantaneous dispatch calls on event spikes.",

    // Careers Section
    careers_sub: "Join Generalsoft",
    careers_title: "Build Generational Infrastructure",
    careers_desc: "We are always look for systems specialists, compilers engineers, and performance-oriented frontend developers. View current open roles below.",
    careers_type: "Full-Time",
    careers_apply_btn: "Apply Role",
    careers_spontaneous_title: "Don't see your specific expertise?",
    careers_spontaneous_desc: "We are always eager to talk to systems experts who challenge status quos.",
    careers_spontaneous_btn: "Spontaneous Pitch",

    // Careers Modal Form
    modal_applying_sub: "Applying to Generalsoft",
    modal_requirements_title: "Key Requirements Role:",
    modal_label_name: "Aspirant Name",
    modal_placeholder_name: "E.g., Dr. Alice Sterling",
    modal_label_email: "Personal Email Address",
    modal_placeholder_email: "alice@domain.com",
    modal_label_portfolio: "GitHub / Portfolio URI (Optional)",
    modal_label_resume: "Candidate Resume Document Attachment",
    modal_resume_browse: "Browse...",
    modal_placeholder_cover: "Tell us about a time you optimized database query layouts, wrote a compiler parser, or modernization system...",
    modal_btn_cancel: "Cancel",
    modal_btn_submit: "Submit Core Application",
    modal_success_title: "Pitch Received, {name}!",
    modal_success_desc: "Your application for {jobTitle} has been logged directly inside the Generalsoft recruitment hub. We will verify your file details against our engineering guidelines.",
    modal_success_hr_title: "Automatic HR Event Scheduling",
    modal_success_hr_desc: "We utilize immediate developer triage calendars. A calendar invite coordinates meeting setups via {email} within 12 hours.",
    modal_btn_exit: "Exit Application",

    // Footer
    footer_brand_desc: "Designing resilient virtualized infrastructure, ultra-secure gateways, and AI-enabled software modernization tools since 1998.",
    footer_compliance: "SOC2 Certified & Verified Compliance",
    footer_products_title: "Products Suite",
    footer_company_title: "The Company",
    footer_careers_title: "Careers & Contact",
    footer_privacy: "Privacy Policy",
    footer_security: "Terms of Service",
    footer_sla: "generalsoft.com SLA Terms",
    partners: "Global Partners",
    since: "ESTD. 1998 // SEATTLE, WA",
    ai: "Artificial Intelligence",
    cyber: "Cybersecurity",
    iot: "Internet of Things",
    web: "Web Design",
    app: "App Design",
    edu: "Education & Training",
    landing_title: "Engineering Excellence.",
    landing_desc: "We specialize in high-performance custom software solutions that scale. Our focus is on usability, security, and global accessibility.",
    contactTitle: "Get in touch",
    contactSub: "We respond within 24 business hours.",
    formName: "Full Name",
    formEmail: "Email Address",
    formMsg: "Your Message",
    formSubmit: "Send Message",
    formSuccess: "Thank you! We'll be in touch soon.",
    tagline: "Custom Software Development",
    heroSub: "Generalsoft Corporation builds tailored digital experiences for global markets. From USA to the world, we design software that works for you."
  },
  de: {
    // Nav / Header
    nav_overview: "Übersicht",
    nav_values: "Kernwerte",
    nav_platforms: "Lösungen",
    nav_configurator: "Konfigurator",
    nav_leadership: "Führung",
    nav_offices: "Globale Standorte",
    nav_careers: "Karriere",
    cta_get_started: "Loslegen",
    logo_sub: "Aktiengesellschaft",

    // Hero Section
    hero_badge: "Globale Unternehmen stärken seit 2014",
    hero_title_1: "Autonome Systeme.",
    hero_title_2: "Echte Langlebigkeit.",
    hero_desc: "Die Generalsoft Corporation leistet Pionierarbeit bei ausfallsicheren Betriebssystemschichten, hochvolumigen Transaktionspipelines und autonomen KI-gesteuerten Systemmodernisierungen, die es globalen Unternehmen ermöglichen, ohne Angst vor Veraltung zu skalieren.",
    hero_cta_mission: "Unternehmensmission erkunden",
    hero_cta_careers: "Offene Stellen ansehen",
    hero_stat_clients: "Unternehmenskunden",
    hero_stat_sla: "SLA-Garantie",
    hero_stat_transacted: "Projekte Bereitgestellt",
    hero_sys_secure: "SYSTEM SICHER UND STABIL",
    hero_scroll: "Scrollen zum Erkunden",

    // Values Section
    values_sub: "Unsere Philosophie",
    values_title: "Auf Zuverlässigkeit ausgelegt, auf Prinzipien gebaut.",
    values_desc: "Viele Unternehmen programmieren Lösungen nur zur schnellen Ticketbehebung. Wir konzipieren unsere Systeme so, dass sie als generationenübergreifende strukturelle Baselines dienen.",
    values_active_view: "Aktive Ansicht",
    values_benchmarks: "Leistungs-Benchmarks",
    values_benchmarks_sub: "Validiert auf Intel Sapphire Rapids",

    // Timeline Section
    timeline_sub: "Unsere Reise",
    timeline_title: "28 Jahre Lösungsbereitstellung",
    timeline_desc: "Vom kleinen Labor für verteilte Systeme im Silicon Valley zu einem internationalen Maßstab der Unternehmensmodernisierung. Wählen Sie eine Kategorie, um Meilensteine anzuzeigen.",
    timeline_all_filter: "Vollständiges Archiv",
    timeline_empty: "Für diesen Filter wurden keine Meilensteine gefunden.",

    // Solutions Section
    solutions_sub: "Enterprise-Systeme",
    solutions_title: "Die Generalsoft-Suite: Architektur-Übersicht",
    solutions_desc: "Wir entwickeln und lizenzieren Backend-Systeme, Middleware-Engines und Modernisierungs-Compiler, die kritische Skalierungsfortschritte für zukunftsorientierte Unternehmen ermöglichen.",
    solutions_spec_doc: "Plattform-Spezifikation",
    solutions_deployment_id: "Bereitstellungs-ID",
    solutions_core_underlay: "Kerntechnologien",
    solutions_installs: "Aktive Knoten / Tägliche Last",
    solutions_sla_satisfaction: "SLA-Kundenzufriedenheit",

    // Configurator / Interactive Sandbox Section
    config_sub: "Unternehmens-Sandbox",
    config_title: "Der Generalsoft-Lösungskonfigurator",
    config_desc: "Geben Sie drei Parameter zu Ihren Infrastruktur-Herausforderungen an und bewerten Sie sofort Ihren empfohlenen Systemaufbau.",
    config_step_1: "Schritt 1: Fokus-Branche",
    config_step_2: "Schritt 2: Betriebliche Skalierung",
    config_step_3: "Schritt 3: Primärer System-Engpass",
    config_btn_generate: "Architektur-Mapping generieren",
    config_success_sub: "Systemlösung & Blueprint bereit",
    config_success_title: "Empfohlen",
    config_stat_speed: "Erwartete Performance-Steigerung",
    config_stat_compliance: "Kryptografische Compliance-Ebene",
    config_stat_pipeline: "Geschätzte Bereitstellungsdauer",
    config_form_title: "Kostenfreie Systemanalyse anfordern",
    config_form_desc: "Wünschen Sie ein persönliches Gespräch inklusive einer detaillierten Architekturanalyse und Benchmark-Berichten? Hinterlassen Sie Ihre Kontaktdaten.",
    config_field_name: "Ihr Name",
    config_field_email: "Geschäftliche E-Mail",
    config_btn_configure_again: "Erneut konfigurieren",
    config_btn_book: "Termin buchen",
    config_success_received: "Anfrage erfolgreich übermittelt!",
    config_success_detail: "Vielen Dank, {name}. Ein Senior Enterprise Systems Engineer wird sich innerhalb eines Werktages unter {email} bei Ihnen melden.",
    cookie_prompt_title: "Wir verwenden Cookies für Leistung und Analyse.",
    cookie_prompt_body: "Wenn Sie zustimmen, helfen Sie uns, eine schnellere und zuverlässigere Erfahrung zu bieten, während wir Ihre Daten schützen.",
    cookie_btn_accept: "Cookies akzeptieren",
    cookie_btn_decline: "Ablehnen",

    // Team Section
    team_sub: "Führung & Vision",
    team_title: "Die Architekten hinter Generalsoft",
    team_desc: "Unsere Führungskräfte verbinden jahrzehntelange Forschung, Open-Source-Beiträge und Hyperscale-Betriebserfahrung zur Entwicklung hochgradig robuster Infrastrukturen.",
    team_dept: "Technischer Hintergrund",
    team_back_btn: "Kurzbio anzeigen",
    team_show_btn: "Ausführliche Biografie anzeigen",

    // Offices Section
    offices_sub: "SLA-Stabilität & Standorte",
    offices_title: "Unser globales Operations-Netzwerk",
    offices_desc: "Wir betreiben voll besetzte regionale Hubs auf drei Kontinenten, um Echtzeit-Einsatzbereitschaft und erstklassigen 24/7/365-Support für Unternehmenskunden zu garantieren.",
    offices_coordinates: "Interaktive Vektorkoordinaten",
    offices_hq_badge: "Hauptsitz",
    offices_detail_title: "Details zum Standort",
    offices_detail_email: "Direkter E-Mail-Kontakt",
    offices_detail_phone: "Direkte Telefonnummer",
    offices_location: "Standort",
    offices_email: "E-Mail",
    offices_phone: "Telefon",
    offices_window: "Bereitschaftsfenster",
    offices_window_desc: "24/7/365 On-Call-Systembereitschaft",
    offices_window_support: "Globales Supportnetz mit sofortiger Eskalation.",
    offices_sla_title: "Unser universelles SLA-Versprechen",
    offices_sla_desc: "Alle Systeme von Generalsoft senden automatisch Telemetriesignale direkt an die nahegelegensten Hubs, um bei Anomalien sofortige Notfall-Dispatches zu veranlassen.",

    // Careers Section
    careers_sub: "Karriere bei Generalsoft",
    careers_title: "Wir bauen die Infrastruktur von morgen",
    careers_desc: "Wir suchen stets erstklassige Netzwerkspezialisten, Compiler-Experten und Performance-orientierte Frontend-Entwickler. Entdecken Sie offene Stellen.",
    careers_type: "Vollzeit",
    careers_apply_btn: "Bewerben",
    careers_spontaneous_title: "Nicht die passende Rolle dabei?",
    careers_spontaneous_desc: "Wir sind immer an Gesprächen mit Systemexperten interessiert, die den Status quo hinterfragen.",
    careers_spontaneous_btn: "Initiativbewerbung abschicken",

    // Careers Modal Form
    modal_applying_sub: "Karriere bei Generalsoft",
    modal_requirements_title: "Schlüsselanforderungen für die Rolle:",
    modal_label_name: "Vollständiger Name",
    modal_placeholder_name: "z. B. Dr. Alice Sterling",
    modal_label_email: "E-Mail-Adresse",
    modal_placeholder_email: "alice@domain.com",
    modal_label_portfolio: "GitHub / Portfolio-Link (optional)",
    modal_label_resume: "Lebenslauf anhängen / hochladen",
    modal_resume_browse: "Durchsuchen...",
    modal_placeholder_cover: "Beschreiben Sie kurz ein Projekt, bei dem Sie komplexe Datenbanken optimiert, Compiler geschrieben oder Altsysteme migriert haben...",
    modal_btn_cancel: "Abbrechen",
    modal_btn_submit: "Bewerbungsunterlagen einreichen",
    modal_success_title: "Bewerbung erhalten, {name}!",
    modal_success_desc: "Ihre Bewerbung als {jobTitle} wurde direkt im Generalsoft-Rekrutierungsportal registriert. Wir prüfen Ihre Unterlagen sorgfältig anhand unserer technischen Qualitätsrichtlinien.",
    modal_success_hr_title: "Automatische Erstgesprächs-Planung",
    modal_success_hr_desc: "Wir verwenden automatisierte Entwickler-Vorauswahl-Kalender. Eine Einladung zu einem Online-Gespräch erhalten Sie an {email} innerhalb der nächsten 12 Stunden.",
    modal_btn_exit: "Schließen",

    // Footer
    footer_brand_desc: "Wir entwerfen ausfallsichere virtualisierte Cloud-Infrastrukturen, sichere Gateway-Architekturen und KI-gestützte Code-Compiler seit 1998.",
    footer_compliance: "SOC2-zertifiziert & verifizierte Compliance",
    footer_products_title: "Produktportfolio",
    footer_company_title: "Unternehmen",
    footer_careers_title: "Karriere & Kontakt",
    footer_privacy: "Datenschutzerklärung",
    footer_security: "Nutzungsbedingungen",
    footer_sla: "generalsoft.com SLA-Bedingungen",
    partners: "Globale Partner",
    since: "GEGRÜNDET 1998 // USA",
    ai: "Künstliche Intelligenz",
    cyber: "Cybersicherheit",
    iot: "Internet der Dinge",
    web: "Webdesign",
    app: "App-Design",
    edu: "Ausbildung & Training",
    landing_title: "Hervorragende Technik.",
    landing_desc: "Wir spezialisieren uns auf leistungsstarke kundenspezifische Softwarelösungen, die skalieren. Unser Fokus liegt auf Benutzerfreundlichkeit, Sicherheit und globaler Zugänglichkeit.",
    contactTitle: "Kontaktieren Sie uns",
    contactSub: "Wir antworten innerhalb von 24 Geschäftsstunden.",
    formName: "Vollständiger Name",
    formEmail: "E-Mail-Adresse",
    formMsg: "Ihre Nachricht",
    formSubmit: "Nachricht senden",
    formSuccess: "Vielen Dank! Wir melden uns in Kürze.",
    tagline: "Individuelle Softwareentwicklung",
    heroSub: "Generalsoft Corporation erstellt maßgeschneiderte digitale Erlebnisse für globale Märkte. Von USA in die Welt – wir entwickeln Software, die für Sie arbeitet."
  }
};

// Localized milestones mapper
const MILESTONES_DE: Milestone[] = [
  {
    year: "2014",
    title: "Die Entstehung",
    description: "Generalsoft wurde im Silicon Valley von einer Gruppe von Systemarchitekten gegründet, die komplexe verteilte Unternehmensumgebungen vereinfachen wollten.",
    category: "foundation"
  },
  {
    year: "2016",
    title: "GeneralCloud v1.0",
    description: "Einführung unserer Flaggschiff-Cloud-Orchestrierungssuite, die ein nahtloses Multi-Cloud-Mapping bei einer Latenzreduzierung von 40% ermöglicht.",
    category: "innovation"
  },
  {
    year: "2018",
    title: "Ausbau der globalen Präsenz",
    description: "Eröffnung regionaler Hauptsitze in Frankfurt am Main und Tokio, Japan, wodurch weltweit über 200 Fortune-500-Unternehmenskunden gewonnen werden konnten.",
    category: "global"
  },
  {
    year: "2020",
    title: "Zero-Trust-Sicherheitsintegration",
    description: "Veröffentlichung automatisierter modularer Verschlüsselungsebenen für verteilte Unternehmenssysteme, ausgezeichnet mit dem CyberSecurity Excellence Award.",
    category: "innovation"
  },
  {
    year: "2023",
    title: "Series-D & KI-Engine-Initiative",
    description: "Sicherung einer Series-D-Finanzierung in Höhe von 150 Mio. USD unter der Leitung führender Investoren; Gründung des Generalsoft AI Research Lab in Zürich.",
    category: "ipo"
  },
  {
    year: "2026",
    title: "Generalsoft Core 4.0 & Zukunft",
    description: "Vorstellung autonomer, KI-gesteuerter Refactoring- und Code-Modernisierungspipelines, um Unternehmen bei der sicheren Migration von Altsystemen zu unterstützen.",
    category: "innovation"
  }
];

// Localized core values mapper
const CORE_VALUES_DE: CoreValue[] = [
  {
    id: "agile-engineering",
    title: "Adaptive Systeme",
    description: "Wir entwickeln Software, die strukturell widerstandsfähig ist. Unsere Architekturen entkoppeln die Logik vom Speicher und ermöglichen eine dynamische vertikale und horizontale Skalierung in Echtzeit.",
    iconName: "Cpu",
    accentColor: "from-blue-600 to-cyan-500",
    metric: "99,999%",
    metricLabel: "System-Betriebszeit aller Deployments"
  },
  {
    id: "security-first",
    title: "Absolute Integrität",
    description: "Sicherheit ist keine nachträgliche Schicht, sondern die fundamentale Basis. Wir verankern kryptografisch prüfbare Zero-Trust-Schemas in jeder Zeile Code, die wir ausliefern.",
    iconName: "Shield",
    accentColor: "from-indigo-600 to-purple-500",
    metric: "0",
    metricLabel: "Kritische Sicherheitsrelevante Vorfälle in 11 Jahren"
  },
  {
    id: "human-centric",
    title: "Zielgerichtete UX",
    description: "Wir lehnen kognitive Überlastung ab. Die leistungsfähigsten Algorithmen sind wertlos, wenn Entwickler oder Bediener sie unter hohem Druck nicht schnell handhaben können.",
    iconName: "Award",
    accentColor: "from-teal-600 to-emerald-500",
    metric: "4,8x",
    metricLabel: "Steigerung der Erkenntnisgeschwindigkeit"
  },
  {
    id: "sustainable-tech",
    title: "CO2-Minimiertes Computing",
    description: "Wir bekennen uns zu thermodynamischer Effizienz. Jeder Algorithmus, den wir verfeinern, reduziert CPU-Zyklen, Wärmeabgabe und den physischen Server-Fußabdruck.",
    iconName: "Zap",
    accentColor: "from-amber-500 to-orange-600",
    metric: "-35%",
    metricLabel: "Durchschnittliche Energiekostenreduktion"
  }
];

// Localized solutions mapper
const SOLUTIONS_DE: Solution[] = [
  {
    id: "gen-cloud",
    name: "GeneralCloud Engine",
    category: "Infrastruktur",
    summary: "Intelligenter Multi-Cloud-Container-Topologiemanager und Telemetrie-Proxy.",
    description: "Unsere Kernplattform zur Cluster-Orchestrierung koordiniert Kubernetes- und Bare-Metal-Knoten automatisch. Mithilfe reaktiver heuristischer Optimierung analysiert GeneralCloud die Telemetrie von 40.000 Anfragen/Sek. und skaliert Knoten anhand eines dynamischen Vorhersagemodells herauf oder herunter, um die CPU-Zyklen extrem effizient zu halten.",
    activeInstalls: "14.500+ aktive Knoten",
    satisfaction: "99,2%",
    techStack: ["Kubernetes", "Rust Engine", "eBPF Telemetry", "gRPC Mesh"]
  },
  {
    id: "gen-api",
    name: "GeneralGateway Server",
    category: "Integration",
    summary: "Sub-Millisekunden-API-Proxy und Echtzeit-Schema-Validator.",
    description: "Ein blitzschneller Gateway-Proxy, der in maschinennahem Systemcode geschrieben wurde, um Token-Parsing, Payload-Sicherheitsfilterung und Validierung an der Netzwerkgrenze mit vernachlässigbarer Latenz durchzuführen. Perfekt für hochvolatiles Banking und Transaktionsdienste.",
    activeInstalls: "4 Mrd.+ tägliche Anfragen",
    satisfaction: "98,7%",
    techStack: ["WebAssembly", "C++ Backbone", "Redis Live Cache", "OpenTelemetry"]
  },
  {
    id: "gen-security",
    name: "GeneralShield Identity",
    category: "Sicherheit",
    summary: "Reibungslose Authentifizierungs-Engine mit biometrischer Kryptografie.",
    description: "Fortschrittlicher Zero-Knowledge-Anmeldedatentresor und verteilter Audit-Protokollierungsserver. Schützt interne Unternehmens-Endpunkte, indem eine kontextuelle Mikro-Vertrauensbewertung basierend auf dem Gerätezustand, dem IP-Verhalten und biometrischen Handshakes durchgeführt wird.",
    activeInstalls: "12 Mio. aktive Identitäten",
    satisfaction: "99,6%",
    techStack: ["Rust", "ECDSA Cryptography", "WebAuthn Framework", "GraphQL"]
  },
  {
    id: "gen-intelligence",
    name: "GeneralIntelligence SDK",
    category: "Maschinelles Lernen",
    summary: "Vorkompilierte LLM-Router und autonome Code-Modernisierungsschleifen.",
    description: "Das Unternehmensgehirn für tiefgehende Applikationscode-Analyse. Scans und Mappings alter COBOL- oder Java-Anwendungen werden automatisch in saubere, kompilierte TypeScript- und Rust-Codeblöcke umgeschrieben, während gleichzeitig entsprechende Integrationsschemata und Testabdeckung generiert werden.",
    activeInstalls: "500.000+ automatisierte PRs",
    satisfaction: "96,4%",
    techStack: ["PyTorch Engine", "Node TS Compiler", "Gemini Fine-Tuning", "Docker Sandbox"]
  }
];

// Localized leaders mapper
const LEADERSHIP_DE: Leader[] = [
  {
    id: "c-ceo",
    name: "Mr. Abid Nasim",
    role: "Chief Executive Officer & Gründerin",
    bio: "Nasim besitzt einen MBA-Abschluss von der LUMS. Er begann bereits 1982 mit dem Programmieren auf einem Computer mit nur 1 Kilobyte Arbeitsspeicher. Bevor er Generalsoft gründete, leitete er Enterprise-Architecture-Teams bei Microsoft und ADP und war maßgeblich an der Entwicklung früher Cloud-Orchestrierungs-Frameworks beteiligt.",
    quote: "Echte Software-Handwerkskunst dreht sich um strukturelle Langlebigkeit. Wir bauen Architekturen, die mit dem Unternehmen wachsen und als dauerhafte Fundamente dienen, statt als transaktionsbezogene Flicken.",
    avatarUrl: "https://picsum.photos/seed/evelyn/300/300",
    department: "Executive"
  }
];

// Localized job posts mapper
const JOBS_DE: JobPost[] = [
  {
    id: "j-systems-eng",
    title: "Senior Low-Latency Systems Engineer (m/w/d)",
    department: "Systeminfrastruktur",
    location: "Frankfurt / Hybrid",
    type: "Vollzeit",
    summary: "Konzeption und Implementierung hocheffizienter Edge-Validierungssoftware in Rust und WebAssembly zur Aufrechterhaltung extrem schneller Antwortzeiten unter Volllast.",
    requirements: [
      "Mehr als 5 Jahre Erfahrung in der Entwicklung hochparalleler Systeme mit Rust, Go oder C++.",
      "Erfahrung in der Optimierung von Linux-Systemkonfigurationen, Sockets und Speicher-Allokatoren (z.B. jemalloc).",
      "Nachgewiesene Vertrautheit mit eBPF-Hooks oder maßgeschneiderten Proxy-Architekturen ist sehr erwünscht."
    ]
  },
  {
    id: "j-compiler-eng",
    title: "Staff Compiler Architect (KI-Modernisierung) (m/w/d)",
    department: "Maschinelle Lernsysteme",
    location: "Silicon Valley / Zürich",
    type: "Vollzeit",
    summary: "Leitung der Entwicklung von AST-Compilern, die veralteten Enterprise-Quellcode (COBOL, Java 6) automatisch in sauberes TypeScript und modulare, moderne Komponenten übersetzen.",
    requirements: [
      "Tiefes theoretisches Verständnis von Compiler-Design, Parsern und AST-Transformationslogik.",
      "Nachweisbare Erfolge in der Entwicklung von statischen Analysetools oder Transpilern.",
      "Erfahrung mit dem Finetuning großer Sprachmodelle zur Unterstützung semantischer Syntax-Übersetzungen."
    ]
  },
  {
    id: "j-sr-react",
    title: "Lead Frontend Systems Engineer (m/w/d)",
    department: "Produktentwicklung",
    location: "Remote (USA / Europa)",
    type: "Vollzeit",
    summary: "Konzeption von State-Management-Protokollen und hochperformanten Oberflächen für Cloud-Topologiekarten innerhalb des GeneralCloud-Dashboards.",
    requirements: [
      "Umfassende Expertise in modernen React-State-Mustern, Performance-Analysen und maßgeschneidertem Canvas/Graph-Styling (D3.js oder Ähnliches).",
      "Besondere Liebe zum Detail bei UX-Layoutabständen, responsiven Pipelines und barrierefreien Designs.",
      "Sicherer Umgang mit Tailwind CSS und Optimierung der Browser-Rendering-Performance."
    ]
  }
];

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Initialize with 'en' but try to read from localstorage or browser preference
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem('gs_lang');
      if (stored === 'de' || stored === 'en') return stored;
    } catch (_) {}
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('gs_lang', lang);
    } catch (_) {}
  };

  const t = (key: string): string => {
    const translation = TRANSLATION_DICTIONARY[language]?.[key] || TRANSLATION_DICTIONARY['en']?.[key];
    return translation || key;
  };

  const getMilestones = () => {
    return language === 'de' ? MILESTONES_DE : MILESTONES;
  };

  const getCoreValues = () => {
    return language === 'de' ? CORE_VALUES_DE : CORE_VALUES;
  };

  const getSolutions = () => {
    return language === 'de' ? SOLUTIONS_DE : SOLUTIONS;
  };

  const getLeaders = () => {
    return language === 'de' ? LEADERSHIP_DE : LEADERSHIP;
  };

  const getJobs = () => {
    return language === 'de' ? JOBS_DE : JOBS;
  };

  const getOffices = () => {
    return OFFICES;
  };

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      t,
      getMilestones,
      getCoreValues,
      getSolutions,
      getLeaders,
      getJobs,
      getOffices
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
