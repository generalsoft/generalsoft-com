/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Milestone, CoreValue, Leader, Solution, Office, JobPost } from './types';

export const MILESTONES: Milestone[] = [
  {
    year: "1998",
    title: "Foundation",
    description: "Generalsoft Corporation founded in Seattle, Washington by a collective of enterprise systems architects with a vision to modernize distributed computing.",
    category: "foundation"
  },
  {
    year: "2004",
    title: "Enterprise Solutions Launch",
    description: "Pioneered the first unified middleware platform for heterogeneous legacy system integration, serving 50+ Fortune 1000 clients.",
    category: "innovation"
  },
  {
    year: "2010",
    title: "Silicon Valley Expansion",
    description: "Established innovation hub in Silicon Valley; acquired three specialized middleware vendors to accelerate platform consolidation.",
    category: "global"
  },
  {
    year: "2014",
    title: "Cloud Architecture Evolution",
    description: "Released GeneralCloud v0.5 with container orchestration capabilities; partnered with major cloud providers for native integration.",
    category: "innovation"
  },
  {
    year: "2016",
    title: "GeneralCloud v1.0",
    description: "Launched our flagship Cloud Orchestration suite, enabling seamless multi-cloud resource mapping with a 40% reduction in latency.",
    category: "innovation"
  },
  {
    year: "2018",
    title: "Global Footprint Expansion",
    description: "Opened regional headquarters in Frankfurt, Germany and Tokyo, Japan, securing 200+ Fortune 500 enterprise customers global-wide.",
    category: "global"
  },
  {
    year: "2020",
    title: "Zero-Trust Security Integration",
    description: "Released automated granular encryption layers for enterprise distributed systems, winning the CyberSecurity Excellence Award.",
    category: "innovation"
  },
  {
    year: "2023",
    title: "Series D & AI-Engine Initiative",
    description: "Secured $150M Series D funding led by premier venture firms; established the Generalsoft AI Research Lab in Zurich focusing on generative automation.",
    category: "ipo"
  },
  {
    year: "2026",
    title: "Generalsoft Core 4.0 & Beyond",
    description: "Unveiling autonomous AI-driven refactoring and code modernization pipelines to help enterprises migrate legacy architectures securely.",
    category: "innovation"
  }
];

export const CORE_VALUES: CoreValue[] = [
  {
    id: "agile-engineering",
    title: "Adaptive Systems",
    description: "We design software to be structurally resilient. Our architectures decouple logic from storage, enabling dynamic vertical and horizontal scaling in real time.",
    iconName: "Cpu",
    accentColor: "from-blue-600 to-cyan-500",
    metric: "99.999%",
    metricLabel: "System Uptime Across Deployments"
  },
  {
    id: "security-first",
    title: "Absolute Integrity",
    description: "Security isn't a modern layer; it's the fundamental baseline. We bake cryptographically auditable zero-trust schemas into every line of code we deploy.",
    iconName: "Shield",
    accentColor: "from-indigo-600 to-purple-500",
    metric: "0",
    metricLabel: "Critical Breach Incidents in 11 Years"
  },
  {
    id: "human-centric",
    title: "Purpose-Built UX",
    description: "We reject cognitive overload. The most powerful algorithms are worthless if developers or operators can't manage them under high pressure.",
    iconName: "Award",
    accentColor: "from-teal-600 to-emerald-500",
    metric: "4.8x",
    metricLabel: "Increase in Speed-to-Insights"
  },
  {
    id: "sustainable-tech",
    title: "Carbon-Light Compute",
    description: "We are committed to thermodynamic efficiency. Every algorithm we refine reduces CPU cycles, heat dissipation, and server footprint.",
    iconName: "Zap",
    accentColor: "from-amber-500 to-orange-600",
    metric: "-35%",
    metricLabel: "Average Energy Cost Reduction"
  }
];

export const SOLUTIONS: Solution[] = [
  {
    id: "gen-cloud",
    name: "GeneralCloud Engine",
    category: "Infrastructure",
    summary: "Intelligent multi-cloud container topology manager and telemetry proxy.",
    description: "Our core cluster-orchestration platform coordinates Kubernetes and bare-metal nodes automatically. Using reactive heuristic optimization, GeneralCloud analyzes telemetry from 40,000 requests/sec, scaling nodes up or down with a dynamic predictive model to keep CPU cycles extremely efficient.",
    activeInstalls: "14,500+ Active Nodes",
    satisfaction: "99.2%",
    techStack: ["Kubernetes", "Rust Engine", "eBPF Telemetry", "gRPC Mesh"]
  },
  {
    id: "gen-api",
    name: "GeneralGateway Server",
    category: "Integration",
    summary: "Sub-millisecond API proxy and real-time schema validator.",
    description: "A lightning-fast gateway proxy written in bare-metal systems code designed to execute token parsing, payload security filtering, and validation at the network edge with negligible latency overhead. Perfect for high-volume banking and transactional services.",
    activeInstalls: "4B+ Requests Daily",
    satisfaction: "98.7%",
    techStack: ["WebAssembly", "C++ Backbone", "Redis Live Cache", "OpenTelemetry"]
  },
  {
    id: "gen-security",
    name: "GeneralShield Identity",
    category: "Security",
    summary: "Frictionless authentication engine with biometric cryptography.",
    description: "Advanced zero-knowledge credentials vault and distributed audit logging server. Shields internal enterprise endpoints by establishing contextual micro-trust evaluation based on device health, IP behavior-state, and biometric handshakes.",
    activeInstalls: "12M Active Identities",
    satisfaction: "99.6%",
    techStack: ["Rust", "ECDSA Cryptography", "WebAuthn Framework", "GraphQL"]
  },
  {
    id: "gen-intelligence",
    name: "GeneralIntelligence SDK",
    category: "Machine Learning Solutions",
    summary: "Pre-compiled LLM routers and autonomous code modernization loops.",
    description: "The enterprise brain for deep application code analysis. Scans and maps legacy COBOL or old Java applications, refactoring them into clean, compiled TypeScript and Rust code blocks automatically while generating corresponding integration schemas and test coverage.",
    activeInstalls: "500K+ Automated PRs",
    satisfaction: "96.4%",
    techStack: ["PyTorch Engine", "Node TS Compiler", "Gemini Fine-Tuning", "Docker Sandbox"]
  }
];

export const LEADERSHIP: Leader[] = [
  {
    id: "c-ceo",
    name: "Mr. Abid Nasim",
    role: "Chief Executive Officer & Founder",
    bio: "Nasim holds an MBA from LUMS. He started programming in 1982 with a computer that had a 1 kilobyte RAM. Before founding Generalsoft, he led enterprise architecture teams at Microsoft and ADP, pioneering early cloud orchestration frameworks.",
    quote: "True software craftsmanship is about structural longevity. We build architectures that grow with the enterprise, serving as durable foundations rather than transactional patches.",
    avatarUrl: "../assets/images/abid.jpg",
    department: "Executive"
  }
];

export const OFFICES: Office[] = [
  {
    city: "Seattle, WA",
    country: "United States (HQ)",
    timezone: "America/Los_Angeles",
    x: 18,
    y: 35,
    isHQ: true,
    email: "sales-na@generalsoft.com",
    phone: "+1 (206) 218-8385"
  },
  {
    city: "Munich",
    country: "Germany (EMEA)",
    timezone: "Europe/Berlin",
    x: 48,
    y: 28,
    isHQ: false,
    email: "sales-eu@generalsoft.com",
    phone: "+49 69 555 9811"
  },
  {
    city: "RAK",
    country: "UAE (APAC)",
    timezone: "Asia/Dubai",
    x: 82,
    y: 36,
    isHQ: false,
    email: "sales-me@generalsoft.com",
    phone: "+971 55 880 9863"
  },
];

export const JOBS: JobPost[] = [
  {
    id: "j-systems-eng",
    title: "Senior Low-Latency Systems Engineer",
    department: "Systems Infrastructure",
    location: "Frankfurt / Hybrid",
    type: "Full-Time",
    summary: "Design and implement high-efficiency edge validation software in Rust and WebAssembly, maintaining sub-millisecond payloads under extreme stress.",
    requirements: [
      "5+ years engineering custom high-concurrency systems using Rust, Go, or C++.",
      "Experience optimizing Linux system configurations, sockets, and memory allocators (e.g., jemalloc).",
      "Demonstrated familiarity with eBPF hooks or custom proxy architectures is highly desired."
    ]
  },
  {
    id: "j-compiler-eng",
    title: "Staff Compiler Architect (AI Modernization)",
    department: "Machine Learning Solutions",
    location: "Silicon Valley / Zurich",
    type: "Full-Time",
    summary: "Direct the development of AST compilers that map archaic enterprise source code (COBOL, Java 6) into clean TypeScript and modular modern components.",
    requirements: [
      "Deep theoretical understanding of compiler design, parsers, and AST transformation logic.",
      "Track record of writing static analysis tools or custom transpilers.",
      "Familiarity with fine-tuning large language models to assist syntactical semantic translation."
    ]
  },
  {
    id: "j-sr-react",
    title: "Lead Frontend Systems Engineer",
    department: "Product Engineering",
    location: "Remote (US / Europe)",
    type: "Full-Time",
    summary: "Architect state management protocols and highly fluid canvas interfaces for cloud resource topography maps inside the GeneralCloud dashboard.",
    requirements: [
      "Expertise in modern React state patterns, performance analytics, and custom canvas/graph styling (D3.js or similar).",
      "Obsessive attention to UX layout spacing, responsive media pipelines, and accessible layouts.",
      "Strong command of Tailwind CSS and browser performance profiling."
    ]
  }
];

export const PARTNERS = [
  {
    name: "Microsoft",
    url: "https://www.microsoft.com/",
    description: "We customize and do custom implementations of Microsoft Dynamics 365 ERP and CRM solutions to help businesses optimize their operations and customer relationships, and add agentic workflows.",
    description_de: "Wir passen Microsoft Dynamics 365 ERP- und CRM-Lösungen an und implementieren sie kundenspezifisch, um Unternehmen bei der Optimierung ihrer Betriebsabläufe und Kundenbeziehungen zu unterstützen und agentische Workflows zu integrieren.",
    type: "Technology Partner • Cloud & Enterprise Solutions",
    type_de: "Technologiepartner • Cloud- & Enterprise-Lösungen"
  },
  {
    name: "Google",
    url: "https://cloud.google.com/partners",
    description: "We work with Google's AI, Workspaces, Cloud resources, Firebase and App development frameworks to create intelligent, collaborative, and data-driven applications that meet the evolving needs of our clients.",
    description_de: "Wir arbeiten mit Googles KI, Workspaces, Cloud-Ressourcen, Firebase und App-Entwicklungsframeworks, um intelligente, kollaborative und datengetriebene Anwendungen zu erstellen, die den Anforderungen unserer Kunden gerecht werden.",
    type: "Application Developer",
    type_de: "Anwendungsentwickler"
  },
  {
    name: "Apple",
    url: "https://www.apple.com/",
    description: "Developing premium native iOS and macOS experiences, ensuring our mobile applications meet the highest standards of performance and design.",
    description_de: "Entwicklung hochwertiger nativer iOS- und macOS-Erlebnisse, die sicherstellen, dass unsere mobilen Anwendungen die höchsten Leistungs- und Designstandards erfüllen.",
    type: "Application Developer",
    type_de: "Anwendungsentwickler"
  },
  {
    name: "Cisco",
    url: "https://www.cisco.com/",
    description: "Integrating world-class networking and security hardware to provide our clients with reliable, high-performance network designs and IoT infrastructure.",
    description_de: "Integration erstklassiger Netzwerk- und Sicherheits-Hardware, um unseren Kunden zuverlässige, leistungsstarke Netzwerkdesigns und IoT-Infrastrukturen zu bieten.",
    type: "Integrator Partner",
    type_de: "Integrationspartner"
  },
  {
    name: "Oracle",
    url: "https://www.oracle.com/",
    description: "Building data-intensive applications backed by Oracle's industry-leading database management systems and cloud ERP solutions.",
    description_de: "Entwicklung datenintensiver Anwendungen, die auf Oracles marktführenden Datenbanksystemen und Cloud-ERP-Lösungen basieren.",
    type: "Member",
    type_de: "Mitglied"
  }
];
