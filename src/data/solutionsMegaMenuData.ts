/**
 * Fallback CMS Dataset for the Eurosia Enterprise Mega-Menu and Solution Pages
 * Supports dynamic configuration by category, status, SEO tags, and custom CTA references.
 */

export interface SolutionCMSItem {
  id: string; // slug
  name: string;
  tagline: string;
  categorySlug: string;
  icon: string; // Lucide icon identifier
  description: string;
  heroTitle: string;
  overview: string;
  features: string[];
  benefits: string[];
  industries: string[];
  workflow: string[];
  statistics: { label: string; value: string; detail: string }[];
  successStory: { client: string; challenge: string; outcome: string; metrics: string };
  faqs: { q: string; a: string }[];
  featured: boolean;
  active: boolean;
  sortOrder: number;
  externalUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface MegaMenuCategoryCMS {
  id: string; // slug
  name: string;
  description: string;
  icon: string;
  sortOrder: number;
  active: boolean;
  solutionsSlugs: string[];
}

export const SOLUTIONS_CMS_DATA: Record<string, SolutionCMSItem> = {
  // --- BUSINESS ---
  erp: {
    id: "erp",
    name: "ERP Solution",
    tagline: "Resilient core operation control with real-time multi-branch ledger synchronization.",
    categorySlug: "business",
    icon: "Building2",
    description: "Our Core ERP enterprise operating system integrates dual-ledger micro-accounts, automatic localized VAT/tax auditing, zero-latency multi-channel hardware integrations, and robust inventory metrics into one unified real-time dashboard.",
    heroTitle: "Sovereign Enterprise Resource Planning",
    overview: "Power intense cross-country business processes and branch operations with a secured database backend and responsive terminal logs optimized for desktop.",
    features: [
      "Decentralized active-active division replication with automatic merge conflicts bypass.",
      "Integrated supply chain ledgers tracking objects from bulk procurement to stock depots.",
      "Real-time corporate compliance algorithms instantly formatting statutory tax reports.",
      "Automated asset schedules logging depreciation, custom service locks, and operational telemetry."
    ],
    benefits: [
      "Eliminate data sync bottlenecks and manual consolidations.",
      "Track complex warehouse movements automatically across all subregions.",
      "Empower directors with a single source of truth for critical audit preparations.",
      "Ensure granular isolation of sensitive financial accounts."
    ],
    industries: ["Heavy manufacturing complexes", "SaaS platforms", "Global importing organizations", "Integrated retail holdings"],
    workflow: [
      "Assessment: Audit current database layouts and operational nodes.",
      "Node Clustering: Launch safe replica instances with fallback routing.",
      "Process Tailoring: Configure multi-currency rates and local tax rules.",
      "Continuous Sync: Establish continuous live double-entry updates with zero bottlenecks."
    ],
    statistics: [
      { label: "SYNC LATENCY", value: "<140ms", detail: "Global multi-region database operations" },
      { label: "COMPLIANCE SPEED", value: "99.4%", detail: "Automatic double-entry ledger audits" },
      { label: "OVERHEAD DROP", value: "34%", detail: "From manual logistics data sync matching" }
    ],
    successStory: {
      client: "Astra Logistics International",
      challenge: "High ledger drift and data loss on network cuts between decentralized port hubs.",
      outcome: "Deployed Eurosia ERP with local-first database replication.",
      metrics: "Reconciled 14,000+ container operations with zero ledger drift."
    },
    faqs: [
      { q: "Can we integrate this with legacy ERP file formats?", a: "Yes. Eurosia ERP supports CSV, Excel, XML, and standard REST/SOAP wrappers." },
      { q: "How are branch offline periods handled?", a: "Local buffers store operations locally, and synchronize seamlessly with the master database once connection is restored." }
    ],
    featured: true,
    active: true,
    sortOrder: 1,
    seoTitle: "Sovereign Enterprise ERP Solution | Eurosia App Ecosystem",
    seoDescription: "Optimize operations across regional branches with the modular Eurosia ERP. Track ledgers, supplies, and dynamic assets in real-time."
  },
  pos: {
    id: "pos",
    name: "POS Solution",
    tagline: "Ultra-fast touchscreen point-of-sale working offline/online seamlessly.",
    categorySlug: "business",
    icon: "ShoppingBag",
    description: "Multi-branch point of sale built with optimized client caching, quick scan shortcuts, localized fiscal print adapters, and lightning-fast customer payment reconciliation.",
    heroTitle: "Enterprise POS & Cashier Terminals",
    overview: "Fast, reliable retail operations on mobile and desktop checkouts, featuring full touch support, dynamic discounts, and seamless inventory synchronization.",
    features: ["Offline transactions queue", "Direct barcode scanner driver", "Fast shift handovers", "Split-payment splits"],
    benefits: ["Prevent queue delays during outages", "Reconcile cash flow automatically", "Instant stock level update"],
    industries: ["Supermarkets", "Fashion apparel chains", "Electronics retail", "Specialty book boutiques"],
    workflow: ["Hardware Pairing", "Tax rules assignment", "Clerk permissions locking", "Live Go-Live"],
    statistics: [
      { label: "CHECKOUT TIME", value: "1.2s", detail: "Per customer transaction flow" },
      { label: "RECONCILIATION", value: "100%", detail: "Automatic cash drawer matching" }
    ],
    successStory: {
      client: "Chronos Retail Group",
      challenge: "Losing customers to long checkout queues during network drops.",
      outcome: "Switched to Eurosia POS with background offline queues.",
      metrics: "Increased peak checkout speed by 42% and zero transaction loss."
    },
    faqs: [
      { q: "Is split billing supported?", a: "Yes. Customers can pay with cash, card, and digital vouchers simultaneously." }
    ],
    featured: false,
    active: true,
    sortOrder: 2
  },
  crm: {
    id: "crm",
    name: "CRM Solution",
    tagline: "Empower sales pipelines, lead pipelines, and client data securely.",
    categorySlug: "business",
    icon: "Users",
    description: "Consolidate sales leads, monitor pipeline velocity in real-time, trigger custom actions on status updates, and map customer behaviors dynamically.",
    heroTitle: "SaaS CRM Sales CRM Platform",
    overview: "Organize client communication histories and maintain clean sales pipelines across global networks.",
    features: ["Visual lead pipelines", "AI activity suggestions", "Customer history log", "SMS campaign triggers"],
    benefits: ["Shorten sales cycles by 30%", "Prevent lead pipeline drops", "Boost team follow-up speeds"],
    industries: ["B2B agencies", "Technology SaaS startups", "Financial consultancies"],
    workflow: ["Import contacts", "Map pipeline stages", "Assign account executives", "Monitor metrics"],
    statistics: [
      { label: "CONVERSION BOOST", value: "28%", detail: "Average customer funnel improvement" },
      { label: "FOLLOW-UP HIGHS", value: "4.5x", detail: "Faster feedback responses on leads" }
    ],
    successStory: {
      client: "Vertex Consulting Partners",
      challenge: "Scattered client emails causing sales executives to overlap.",
      outcome: "Deployed Eurosia CRM.",
      metrics: "Reached a record 91% satisfaction rating."
    },
    faqs: [
      { q: "Is custom contact fields configuration possible?", a: "Absolutely. Add unlimited custom categories, documents, and relationship notes." }
    ],
    featured: false,
    active: true,
    sortOrder: 3
  },
  hrm: {
    id: "hrm",
    name: "HRM Solution",
    tagline: "Manage rosters and evaluate talent performance under a secure digital registry.",
    categorySlug: "business",
    icon: "Users",
    description: "Organize personnel structures, rosters, holidays, performance KPIs, and sensitive employment documents in one centralized place.",
    heroTitle: "Universal HRM & Personnel Dashboard",
    overview: "Maintain high workforce efficiency with intuitive shift templates, holiday logs, and secure HR folders.",
    features: ["Roster shift template", "Absence request tracker", "Performance KPI cards", "Employee document database"],
    benefits: ["Save 15 hours weekly on rotas", "Transparent policy requests", "Secure file access control"],
    industries: ["Hospitality brands", "Corporate offices", "Logistics fleets"],
    workflow: ["Upload org chart", "Configure holidays", "Invite team management", "Track KPIs"],
    statistics: [
      { label: "ROTA WORK HOURS", value: "-60%", detail: "Time saved managing weekly shifts" },
      { label: "EMPLOYEE ENGAGEMENT", value: "88%", detail: "Roster compliance approval" }
    ],
    successStory: {
      client: "Cascade Group",
      challenge: "Messy spreadsheets causing shift overlaps and payroll errors.",
      outcome: "Installed Eurosia HRM.",
      metrics: "Reduced roster planning time to 30 mins."
    },
    faqs: [
      { q: "Can employees request time off directly?", a: "Yes, via our secure mobile-optimized employee portal." }
    ],
    featured: false,
    active: true,
    sortOrder: 4
  },
  payroll: {
    id: "payroll-management",
    name: "Payroll Management",
    tagline: "Secure automated salary formulas, payslip delivery, and tax filing.",
    categorySlug: "business",
    icon: "Coins",
    description: "Process global payroll easily with custom base calculations, automated deductions, direct bank deposits, and immediate tax reports in full compliance with local regulations.",
    heroTitle: "Global Compliance Payroll System",
    overview: "Keep employee payments accurate, reliable, and secure with our top-tier calculations engine.",
    features: ["Tax tier formulas", "Direct payslip downloads", "Bank text file export", "Dynamic bonuses planner"],
    benefits: ["Avoid late payments", "Automatic security compliance updates", "Saves hr administration overhead"],
    industries: ["Contractor teams", "Healthcare clinics", "Financial firms"],
    workflow: ["Set pay periods", "Link employee logs", "Verify deductions", "Run payroll"],
    statistics: [
      { label: "PAYROLL RUN TIME", value: "<15m", detail: "Average payroll batch operation" },
      { label: "COMPLIANCE LEVEL", value: "100%", detail: "No tax filing anomalies" }
    ],
    successStory: {
      client: "Omni Services",
      challenge: "Prone to errors when tracking bonuses across multiple payroll periods.",
      outcome: "Integrated Eurosia Payroll Management.",
      metrics: "Reconciled payroll accurately for over 350 team members."
    },
    faqs: [
      { q: "Is multi-currency payment supported?", a: "Yes, you can configure different base currency targets by employee location." }
    ],
    featured: false,
    active: true,
    sortOrder: 5
  },
  inventory: {
    id: "inventory-management",
    name: "Inventory Management",
    tagline: "Track raw materials and physical stock levels dynamically.",
    categorySlug: "business",
    icon: "Database",
    description: "Real-time inventory levels, dynamic SKU mapping, alerts for low stock levels, and automated purchase requests to keep supply lines running smoothly.",
    heroTitle: "Sovereign Inventory & Warehouse Stock Core",
    overview: "Avoid out-of-stock situations by tracking raw materials, batches, and shelf life.",
    features: ["SKU batch barcodes", "Low stock alerts", "Supplier portals", "Stock count logs"],
    benefits: ["Saves 18% on excess inventory", "Faster item lookups", "Smooth batch tracking"],
    industries: ["Wholesale depots", "Food supply chains", "Pharma warehouses"],
    workflow: ["Catalog items", "Define shelf spots", "Assign alerts", "Stock scanners pairing"],
    statistics: [
      { label: "STOCK TAKEOVER", value: "4x", detail: "Faster manual inventory counts" },
      { label: "STOCKOUT DECLINE", value: "92%", detail: "Using predictive low stock triggers" }
    ],
    successStory: {
      client: "Meridian Medical Supplies",
      challenge: "Critical items going missing or expiring before use.",
      outcome: "Implemented Eurosia Inventory.",
      metrics: "Minimized waste due to expired batches to 0.4%."
    },
    faqs: [
      { q: "Can we track barcodes using general smartphones?", a: "Yes. Our built-in camera scanner lets any device scan barcodes without expensive hardware." }
    ],
    featured: false,
    active: true,
    sortOrder: 6
  },
  procurement: {
    id: "procurement-management",
    name: "Procurement Management",
    tagline: "Digitize requests, generate POs, and verify vendor supplies.",
    categorySlug: "business",
    icon: "Layers",
    description: "Simplify bulk purchases. Direct staff requests, automated pricing checks, direct purchase orders, and simple bills verification.",
    heroTitle: "Automated Procurement Operations",
    overview: "Keep track of supplier SLAs and maintain full compliance with budget limits across all branches.",
    features: ["Purchase Request workflows", "Vendor bid matrix", "Dynamic PO generation", "Invoices matching key"],
    benefits: ["Saves up to 12% on supplies", "Prevent double bidding", "Clear budget history logs"],
    industries: ["Construction firms", "Universities", "Healthcare groups"],
    workflow: ["Set spending limit", "Invite verified suppliers", "Process bids", "Accept invoice"],
    statistics: [
      { label: "REQUEST CYCLE", value: "3.2d", detail: "Request-to-approval timeframe" },
      { label: "COST DEFENSE", value: "$42k", detail: "Saved during initial pilot trials" }
    ],
    successStory: {
      client: "Apex Contracting Inc.",
      challenge: "Manual paper bids causing delays and price inflation.",
      outcome: "Deployed Eurosia Procurement Portal.",
      metrics: "Reduced purchasing lag from 4 weeks to 5.5 days."
    },
    faqs: [
      { q: "Is custom budget approvals logic supported?", a: "Yes. Set up multi-stage approval thresholds based on item value or department." }
    ],
    featured: false,
    active: true,
    sortOrder: 7
  },
  project: {
    id: "project-management",
    name: "Project Management",
    tagline: "Track tasks, milestones, and client communications dynamically.",
    categorySlug: "business",
    icon: "Workflow",
    description: "Keep company goals aligned. Gantt charts, Kanban boards, collaborative milestones tracking, and complete activity history logs.",
    heroTitle: "Modern Agile Team Project Console",
    overview: "Coordinate complex projects across multiple locations with ease.",
    features: ["Gantt charts", "Milestone trackers", "Shared task boards", "Timesheets logger"],
    benefits: ["Improves delivery speeds", "Reduces planning meetings", "Clean time billing"],
    industries: ["Development agencies", "Design bureaus", "Legal consultants"],
    workflow: ["Define project", "Form team groups", "Establish milestones", "Track milestones"],
    statistics: [
      { label: "TASK DELIVERIES", value: "+32%", detail: "Completed on-time milestone records" },
      { label: "PROJECT MEETING CLIPPING", value: "3.5h", detail: "Fewer weekly check-in syncs" }
    ],
    successStory: {
      client: "Elysian Tech Agency",
      challenge: "Missed project delivery dates due to scattered progress updates.",
      outcome: "Adopted Eurosia Project Management.",
      metrics: "Successfully delivered 100% of milestones on-time."
    },
    faqs: [
      { q: "Can we invite global clients to view gantt progress?", a: "Yes, with restricted client views that protect internal communications." }
    ],
    featured: false,
    active: true,
    sortOrder: 8
  },

  // --- HEALTHCARE ---
  hospital: {
    id: "hospital-management",
    name: "Hospital Management",
    tagline: "Secure IPD registries, ward scheduling, and bed charts.",
    categorySlug: "healthcare",
    icon: "HeartPulse",
    description: "Enterprise hospital operations. Admission flows, dynamic bed allocation, EHR integrations, doctor availability charts, and comprehensive billing structures.",
    heroTitle: "Sovereign Hospital Core Operations Platform",
    overview: "Adhere to the highest patient treatment standards with clean floor charts, digital medication schedules, and secure clinical records.",
    features: ["Bed status tracker", "EHR integrations tracker", "Surgical ward schedules", "Emergency triage log"],
    benefits: ["Shorten patient wait times", "Prevent ward scheduling conflicts", "Secure clinical history records"],
    industries: ["Sovereign hospitals", "State health hubs", "Private medical clinics"],
    workflow: ["Patient intake triage", "Assign bed locator", "Prescribe clinical regime", "Secure checkout check"],
    statistics: [
      { label: "BED ALLOCATION", value: "<30s", detail: "Dynamic bed layout tracking" },
      { label: "PATIENT COMPREHENSION", value: "98.7%", detail: "Digital treatment summary check" }
    ],
    successStory: {
      client: "Pacific Health General",
      challenge: "Using paper records caused bed allocation overlaps and check-in bottlenecks.",
      outcome: "Installed Eurosia Hospital Core.",
      metrics: "Reallocated beds cleanly across 4 floors with zero overlaps."
    },
    faqs: [
      { q: "Does the system support HL7 standards?", a: "Yes, our database supports standard healthcare interoperability protocols." }
    ],
    featured: true,
    active: true,
    sortOrder: 9,
    seoTitle: "Sovereign Hospital Management System | Eurosia App Ecosystem",
    seoDescription: "Streamline admissions, ward allocation, and physician scheduling with healthcare security standards."
  },
  clinic: {
    id: "clinic-management",
    name: "Clinic Management",
    tagline: "Patient records, vaccine logs, and easy doctor scheduling.",
    categorySlug: "healthcare",
    icon: "Activity",
    description: "Tailored to outpatient units. Quick patient charts, immunization records, simple billing, and automated SMS appointment reminders.",
    heroTitle: "Intuitive Clinic & Patient Operations Portal",
    overview: "Give private healthcare teams easy tools to manage patient check-ins and appointments.",
    features: ["SMS booking reminders", "Patient vitals logger", "Digital prescription writer", "Consumables inventory"],
    benefits: ["Reduces missed appointments by 45%", "Precise outpatient records", "Control clinic supplies"],
    industries: ["Dental clinics", "Pediatric units", "Physiotherapy practices"],
    workflow: ["Booking check-in", "Upload vital signs", "Enter therapy codes", "Collect fee payment"],
    statistics: [
      { label: "APPOINTMENT DRIFT", value: "-75%", detail: "Drop in missed check-in windows" },
      { label: "PRESCRIPTION ERROR RATE", value: "0%", detail: "With digital prescription codes validation" }
    ],
    successStory: {
      client: "EastCare Pediatric Clinic",
      challenge: "Prone to errors when manual vaccine logs were kept on paper charts.",
      outcome: "Switched to Eurosia Clinic Management.",
      metrics: "Logged 8,000+ immunization records with zero data loss."
    },
    faqs: [
      { q: "Can we process fast optical card scanning?", a: "Yes. Instantly match patient IDs with dynamic profile lookups." }
    ],
    featured: false,
    active: true,
    sortOrder: 10
  },

  // --- EDUCATION ---
  school: {
    id: "school-management",
    name: "School Management",
    tagline: "Manage student records, marksheets, and parent messaging pipelines.",
    categorySlug: "education",
    icon: "GraduationCap",
    description: "Coordinate primary and secondary schools. Student databases, automated marksheets, teacher performance, and secure parent communication channels.",
    heroTitle: "Sovereign School Management Platform",
    overview: "Bring teachers, students, and parents together with simple digital logs.",
    features: ["Student record database", "Digital marksheets tracker", "Automated grade cards", "Attendance logs"],
    benefits: ["Save 12 hours weekly on marksheets", "Keep student progress secure", "Boost parent engagement"],
    industries: ["Primary academies", "Language centers", "Secondary schools"],
    workflow: ["Configure classrooms", "Link parent accounts", "Record daily attendance", "Publish final grades"],
    statistics: [
      { label: "GRADE CALCULATIONS", value: "Instant", detail: "Automatic average marks processing" },
      { label: "PARENT ATTENDANCE VIEW", value: "96.4%", detail: "Real-time communication updates" }
    ],
    successStory: {
      client: "Horizon Academy",
      challenge: "Lost grade card sheets causing delays during graduation periods.",
      outcome: "Deployed Eurosia School Hub.",
      metrics: "Saved over 2 weeks of administrative work during final graduation periods."
    },
    faqs: [
      { q: "Does the system support parent logins?", a: "Yes, parents receive a custom portal to view student progress and attendance." }
    ],
    featured: false,
    active: true,
    sortOrder: 11
  },

  // --- RETAIL & COMMERCE ---
  ecommerce: {
    id: "ecommerce-platform",
    name: "E-Commerce Platform",
    tagline: "Build responsive online storefronts with localized checkouts and instant payout splits.",
    categorySlug: "retail",
    icon: "ShoppingBag",
    description: "Launch next-generation digital stores. Optimized checkouts, custom layouts, instant digital payment options, and simple inventory management.",
    heroTitle: "Sovereign High-Conversion E-Commerce Engine",
    overview: "Sell online with confidence on mobile and desktop checkouts, backed by highly responsive inventory catalogs.",
    features: ["Custom web store builder", "Secure payment flow", "Discount engines", "Warehouse shipping tracker"],
    benefits: ["Improves checkout sales conversion", "No high transaction fees", "Clean sales performance metrics"],
    industries: ["Retail fashion", "Electronics brands", "Organic food hubs"],
    workflow: ["Pick design theme", "Add product catalogue", "Connect stripe channel", "Process incoming orders"],
    statistics: [
      { label: "PAGE SPEED SCORE", value: "99/100", detail: "Lighthouse mobile core metrics" },
      { label: "CHECKOUT DROPS", value: "-22%", detail: "Saves customers with optimized checkouts" }
    ],
    successStory: {
      client: "Aurora Apparel",
      challenge: "Slow checkout speeds causing customers to drop from shopping carts.",
      outcome: "Launched their storefront on Eurosia E-Commerce.",
      metrics: "Increased peak checkout conversions by 31%."
    },
    faqs: [
      { q: "Is custom discount logic support available?", a: "Yes. Configure flexible percentage discounts, bulk buy options, and coupon codes easily." }
    ],
    featured: true,
    active: true,
    sortOrder: 12
  },

  // --- AI & AUTOMATION ---
  aicore: {
    id: "ai-chatbot",
    name: "AI Chatbot",
    tagline: "Next-gen private agent nodes parsing enterprise papers and executing workflows.",
    categorySlug: "ai",
    icon: "Bot",
    description: "Enterprise cognitive assistant powered by custom-guided LLM pipelines. Deploy secure, private models to parse invoices, draft emails, resolve customer tickets, and trigger API workflows with high security.",
    heroTitle: "Sovereign AI Chatbot & Agent Engine",
    overview: "Drive productivity across your business with an AI assistant that securely learns from your files and templates without exposing data to public clouds.",
    features: ["Secure file parsing", "Multi-model selection", "Direct system API integration", "Custom scenario editor"],
    benefits: ["Saves 70% on customer support work", "Draft documents instantly", "Safer pipeline execution"],
    industries: ["B2B SaaS support", "Financial compliance teams", "Legal audit groups"],
    workflow: ["Upload training files", "Define API connections", "Set bot personality", "Embed chatbot onto websites"],
    statistics: [
      { label: "TICKET RESOLUTION", value: "72%", detail: "Immediate customer query closures" },
      { label: "DRAFT SPEED", value: "2.4s", detail: "Create document outlines in seconds" }
    ],
    successStory: {
      client: "Veridian Credit Services",
      challenge: "Overloaded helpdesks causing customer delays during peak financial seasons.",
      outcome: "Deployed Eurosia Private AI.",
      metrics: "Resolved up to 14,000 queries with 94.7% accuracy."
    },
    faqs: [
      { q: "Is our database trained for public models?", a: "No. Eurosia AI operates in isolated nodes, keeping your private business data secure." }
    ],
    featured: true,
    active: true,
    sortOrder: 13,
    seoTitle: "Private AI Chatbot & Agent Node | Eurosia App Ecosystem",
    seoDescription: "Integrate LLM-guided private agents inside your business branches to automatically parse incoming papers, resolve questions, and run workflows."
  }
};

export const MEGA_MENU_CATEGORIES_CMS: MegaMenuCategoryCMS[] = [
  {
    id: "business",
    name: "Business Solutions",
    description: "Enterprise operating systems for modern heavy operations",
    icon: "Building2",
    sortOrder: 1,
    active: true,
    solutionsSlugs: ["erp", "pos", "crm", "hrm", "payroll-management", "inventory-management", "procurement-management", "project-management"]
  },
  {
    id: "healthcare",
    name: "Healthcare Solutions",
    description: "Secure medical portals, clinic management & telemedicine charts",
    icon: "HeartPulse",
    sortOrder: 2,
    active: true,
    solutionsSlugs: ["hospital-management", "clinic-management", "pharmacy-management", "diagnostic-center", "telemedicine-platform", "patient-portal"]
  },
  {
    id: "education",
    name: "Education Solutions",
    description: "Next-gen portals, campus ERPs & digital examination servers",
    icon: "GraduationCap",
    sortOrder: 3,
    active: true,
    solutionsSlugs: ["school-management", "college-erp", "university-management", "lms", "online-examination"]
  },
  {
    id: "retail",
    name: "Retail & Commerce",
    description: "Omnichannel inventory engines, marketplaces & multi-vendor solutions",
    icon: "ShoppingBag",
    sortOrder: 4,
    active: true,
    solutionsSlugs: ["ecommerce-platform", "multi-vendor-marketplace", "retail-management", "warehouse-management", "distribution-management"]
  },
  {
    id: "finance",
    name: "Finance & Accounting",
    description: "PCI-DSS billing systems, ledger accounting & automated compliance reports",
    icon: "Coins",
    sortOrder: 5,
    active: true,
    solutionsSlugs: ["accounting-software", "billing-platform", "subscription-management", "financial-reporting", "expense-tracking"]
  },
  {
    id: "logistics",
    name: "Logistics & Transport",
    description: "Real-time fleet grids, supply chain tracking & route processors",
    icon: "Truck",
    sortOrder: 6,
    active: true,
    solutionsSlugs: ["fleet-management", "delivery-tracking", "route-optimization", "supply-chain-management"]
  },
  {
    id: "realestate",
    name: "Real Estate & Property",
    description: "Comprehensive property managers, real estate CRMs & listings hubs",
    icon: "HomeIcon",
    sortOrder: 7,
    active: true,
    solutionsSlugs: ["property-management", "real-estate-crm", "rental-management", "property-marketplace"]
  },
  {
    id: "hospitality",
    name: "Hospitality Solutions",
    description: "Multi-hotel booking channels, resorts, and POS restaurant centers",
    icon: "Hotel", // Wait, will use 'Building2' or custom mapping
    sortOrder: 8,
    active: true,
    solutionsSlugs: ["hotel-management", "resort-management", "restaurant-management", "booking-platform"]
  },
  {
    id: "industrial",
    name: "Industrial Solutions",
    description: "Raw manufacturing databases, factory flow automations & item checks",
    icon: "Factory",
    sortOrder: 9,
    active: true,
    solutionsSlugs: ["manufacturing-erp", "factory-automation", "production-tracking", "quality-management"]
  },
  {
    id: "ai",
    name: "AI & Automation",
    description: "Sovereign cognitive nodes, invoice builders & smart data analytics",
    icon: "Bot",
    sortOrder: 10,
    active: true,
    solutionsSlugs: ["ai-chatbot", "ai-assistant", "customer-support-ai", "workflow-automation", "document-automation", "smart-analytics"]
  },
  {
    id: "digital",
    name: "Digital Services",
    description: "Dedicated production codebases, cross-platform apps & API channels",
    icon: "Terminal",
    sortOrder: 11,
    active: true,
    solutionsSlugs: ["custom-software-development", "mobile-app-development", "saas-development", "api-development", "cloud-solutions"]
  }
];
