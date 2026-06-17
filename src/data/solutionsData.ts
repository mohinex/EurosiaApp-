import { 
  Building2, Bot, PhoneCall, DollarSign, Shield, Globe, 
  Activity, Mic, MessageSquareText, ShieldCheck, Cpu,
  Mail, Monitor, Sparkles, Laptop, GraduationCap, Truck,
  Factory, Home as HomeIcon, ShoppingBag, Terminal, HeartPulse,
  Coins, Database, Layers, Workflow
} from 'lucide-react';

export interface SolutionItem {
  id: string;
  name: string;
  tagline: string;
  category: string;
  iconName: string;
  description: string;
  heroTitle: string;
  overview: string;
  features: string[];
  benefits: string[];
  industries: string[];
  workflow: string[];
  faqs: { q: string; a: string }[];
}

export const SOLUTION_CATEGORIES = [
  {
    id: "business",
    name: "Business Solutions",
    description: "Enterprise operating systems for modern heavy operations",
    iconName: "Building2",
    solutions: [
      { id: "erp", name: "ERP Solution", url: "/solutions/erp" },
      { id: "pos", name: "POS Solution", url: "/solutions/pos" },
      { id: "crm", name: "CRM Solution", url: "/solutions/crm" },
      { id: "hrm", name: "HRM Solution", url: "/solutions/hrm" },
      { id: "payroll", name: "Payroll Management", url: "/solutions/payroll" },
      { id: "inventory", name: "Inventory Management", url: "/solutions/inventory" },
      { id: "procurement", name: "Procurement Management", url: "/solutions/procurement" },
      { id: "project-management", name: "Project Management", url: "/solutions/project-management" }
    ]
  },
  {
    id: "healthcare",
    name: "Healthcare Solutions",
    description: "Secure medical portals, clinic management & telemedicine charts",
    iconName: "HeartPulse",
    solutions: [
      { id: "hospital", name: "Hospital Management", url: "/solutions/hospital" },
      { id: "clinic", name: "Clinic Management", url: "/solutions/clinic" },
      { id: "pharmacy", name: "Pharmacy Management", url: "/solutions/pharmacy" },
      { id: "diagnostic", name: "Diagnostic Center", url: "/solutions/diagnostic" },
      { id: "telemedicine", name: "Telemedicine Platform", url: "/solutions/telemedicine" },
      { id: "patient-portal", name: "Patient Portal", url: "/solutions/patient-portal" }
    ]
  },
  {
    id: "retail",
    name: "Retail & Commerce",
    description: "Omnichannel inventory engines, marketplaces & multi-vendor solutions",
    iconName: "ShoppingBag",
    solutions: [
      { id: "ecommerce", name: "E-commerce Platform", url: "/solutions/ecommerce" },
      { id: "marketplace", name: "Marketplace Solution", url: "/solutions/marketplace" },
      { id: "multivendor", name: "Multi Vendor System", url: "/solutions/multivendor" },
      { id: "retail-mgmt", name: "Retail Management", url: "/solutions/retail-mgmt" },
      { id: "warehouse", name: "Warehouse Management", url: "/solutions/warehouse" },
      { id: "distribution-management", name: "Distribution Management", url: "/solutions/distribution-management" }
    ]
  },
  {
    id: "education",
    name: "Education Solutions",
    description: "Next-gen portals, campus ERPs & digital examination servers",
    iconName: "GraduationCap",
    solutions: [
      { id: "school", name: "School Management", url: "/solutions/school" },
      { id: "college", name: "College ERP", url: "/solutions/college" },
      { id: "university", name: "University Management", url: "/solutions/university" },
      { id: "lms", name: "Learning Management System", url: "/solutions/lms" },
      { id: "online-exam", name: "Online Examination Platform", url: "/solutions/online-exam" }
    ]
  },
  {
    id: "finance",
    name: "Finance & Accounting",
    description: "PCI-DSS billing systems, ledger accounting & automated compliance reports",
    iconName: "Coins",
    solutions: [
      { id: "accounting", name: "Accounting Software", url: "/solutions/accounting" },
      { id: "billing", name: "Billing Platform", url: "/solutions/billing" },
      { id: "subscription", name: "Subscription Management", url: "/solutions/subscription" },
      { id: "financial-reporting", name: "Financial Reporting", url: "/solutions/financial-reporting" },
      { id: "expense-tracking", name: "Expense Tracking", url: "/solutions/expense-tracking" }
    ]
  },
  {
    id: "logistics",
    name: "Logistics & Transport",
    description: "Real-time fleet grids, supply chain tracking & route processors",
    iconName: "Truck",
    solutions: [
      { id: "fleet", name: "Fleet Management", url: "/solutions/fleet" },
      { id: "delivery", name: "Delivery Tracking", url: "/solutions/delivery" },
      { id: "route-optimization", name: "Route Optimization", url: "/solutions/route-optimization" },
      { id: "supply-chain", name: "Supply Chain Management", url: "/solutions/supply-chain" }
    ]
  },
  {
    id: "realestate",
    name: "Real Estate & Property",
    description: "Comprehensive property managers, real estate CRMs & listings hubs",
    iconName: "HomeIcon",
    solutions: [
      { id: "property-management", name: "Property Management", url: "/solutions/property-management" },
      { id: "realestate", name: "Real Estate CRM", url: "/solutions/realestate" },
      { id: "rental-management", name: "Rental Management", url: "/solutions/rental-management" },
      { id: "property-marketplace", name: "Property Marketplace", url: "/solutions/property-marketplace" }
    ]
  },
  {
    id: "hospitality",
    name: "Hospitality Management",
    description: "Multi-hotel booking channels, resorts, and POS restaurant centers",
    iconName: "Hotel",
    solutions: [
      { id: "hotel", name: "Hotel Management", url: "/solutions/hotel" },
      { id: "resort-management", name: "Resort Management", url: "/solutions/resort-management" },
      { id: "restaurant", name: "Restaurant Management", url: "/solutions/restaurant" },
      { id: "booking-platform", name: "Booking Platform", url: "/solutions/booking-platform" }
    ]
  },
  {
    id: "industrial",
    name: "Industrial Solutions",
    description: "Raw manufacturing databases, factory flow automations & item checks",
    iconName: "Factory",
    solutions: [
      { id: "manufacturing", name: "Manufacturing ERP", url: "/solutions/manufacturing" },
      { id: "factory-automation", name: "Factory Automation", url: "/solutions/factory-automation" },
      { id: "production-tracking", name: "Production Tracking", url: "/solutions/production-tracking" },
      { id: "quality-management", name: "Quality Management", url: "/solutions/quality-management" }
    ]
  },
  {
    id: "ai",
    name: "AI & Automation",
    description: "Sovereign cognitive nodes, invoice builders & smart data analytics",
    iconName: "Bot",
    solutions: [
      { id: "ai-chatbot", name: "AI Chatbot", url: "/solutions/ai-chatbot" },
      { id: "ai-assistant", name: "AI Assistant", url: "/solutions/ai-assistant" },
      { id: "customer-support-ai", name: "Customer Support AI", url: "/solutions/customer-support-ai" },
      { id: "workflow-automation", name: "Workflow Automation", url: "/solutions/workflow-automation" },
      { id: "document-automation", name: "Document Automation", url: "/solutions/document-automation" },
      { id: "smart-analytics", name: "Smart Analytics", url: "/solutions/smart-analytics" }
    ]
  },
  {
    id: "digital",
    name: "Digital Services",
    description: "Dedicated production codebases, cross-platform apps & API channels",
    iconName: "Terminal",
    solutions: [
      { id: "custom-dev", name: "Custom Software Development", url: "/solutions/custom-dev" },
      { id: "mobile-dev", name: "Mobile App Development", url: "/solutions/mobile-dev" },
      { id: "saas-dev", name: "SaaS Development", url: "/solutions/saas-dev" },
      { id: "api-integration", name: "API Development", url: "/solutions/api-integration" },
      { id: "enterprise-platform", name: "Cloud Solutions", url: "/solutions/enterprise-platform" }
    ]
  }
];

// Helper to pull specific icon
export const getSolutionIcon = (name: string) => {
  const icons: { [key: string]: any } = {
    Building2, Bot, PhoneCall, DollarSign, Shield, Globe, 
    Activity, Mic, MessageSquareText, ShieldCheck, Cpu,
    Mail, Monitor, Sparkles, Laptop, GraduationCap, Truck,
    Factory, HomeIcon, ShoppingBag, Terminal, HeartPulse,
    Coins, Database, Layers, Workflow
  };
  return icons[name] || Building2;
};

// Compile fully structured human-written data for ALL solutions
export const ALL_SOLUTIONS_DATA: { [key: string]: SolutionItem } = {
  erp: {
    id: "erp",
    name: "Eurosia ERP Enterprise Core",
    tagline: "Resilient business operations with real-time multi-branch ledger synchronization.",
    category: "Business Solutions",
    iconName: "Building2",
    description: "Our core ERP system aggregates human resources, supply chains, dynamic asset registries, and complex double-entry financial modules under a zero-latency database architecture.",
    heroTitle: "Enterprise Resource Planning for Global Operations",
    overview: "Eurosia ERP is built with a ruggedized database framework, enabling high-load terminal processes across decentralized multi-branch structures without sync overlaps or latency bottlenecks.",
    features: [
      "Decentralized active-active branch synchronization with standard conflicts bypass.",
      "Inbound supply ledger detailing items tracking from procurement to storage locations.",
      "Embedded regulatory taxation algorithms adhering to global accounting structures.",
      "Secure asset logging featuring automatic depreciations, service checks scheduling and telemetry."
    ],
    benefits: [
      "Eliminate ledger mismatches across branch offices.",
      "Reduce supply chain leaks by 94% through real-time transit telemetry.",
      "Audit preparation time shortened from 3 weeks to 1 click.",
      "Unified access controls guaranteeing sensitive payroll ledger isolation."
    ],
    industries: ["Manufacturing complexes", "Wholesale distribution chains", "Heavy logistics operators", "Multi-region retail conglomerates"],
    workflow: [
      "Diagnostic Assessment: Map existing software nodes, database tables, and regional constraints.",
      "Database Partitioning: Setup isolated cluster nodes with high-availability master routing.",
      "Module Tailoring: Configure custom local currency factors, local billing taxes and staff privileges.",
      "Live Integration & Audit: Connect terminals with continuous zero-error auditing."
    ],
    faqs: [
      { q: "Can we integrate this ERP with existing hardware POS devices?", a: "Yes. Eurosia ERP contains pre-compiled serial adapters and network client drivers supporting modern fiscal printers and physical barcode sensors." },
      { q: "Is offline ledger logging possible?", a: "Absolutely. Standard client browsers record transactions locally onto client-side secure store, which automatically queue and reconcile immediately when connection is restored." }
    ]
  },
  pos: {
    id: "pos",
    name: "Eurosia POS Terminal Network",
    tagline: "Robust offline-first billing nodes syncing seamlessly with cloud ledgers.",
    category: "Business Solutions",
    iconName: "ShoppingBag",
    description: "An incredibly fast, offline-first point of sale system for heavy high-volume outlets. Processes transactions with biometrics and dynamic invoicing.",
    heroTitle: "High-Volume POS Terminal System",
    overview: "Run your high-traffic retail outlets uninterrupted. Built to operate 100% offline with zero data collision during master network synchronization.",
    features: [
      "Lightning-fast local barcoding mapping and barcode scanners integration.",
      "Supports dynamic customer loyalty points and tiered promotional strategies.",
      "Split payments configuration including local bKash, card arrays, and physical cash ledger.",
      "Real-time outlet inventory deduct matching core warehouse logs."
    ],
    benefits: [
      "Zero customer queue delays with sub-50ms billing operations.",
      "Guaranteed operation during total network blackouts.",
      "Prevents cash register leakages with cryptographic shift handover receipts."
    ],
    industries: ["Retail superstores", "Busy restaurants", "Multi-branch fashion hubs", "E-commerce flagships"],
    workflow: [
      "Deploy localized web workers onto cashier browser tablets.",
      "Replicate core product price book onto local storage database.",
      "Activate payment terminals integration over WebSocket protocols.",
      "Run real-time sales telemetry widgets inside management dashboards."
    ],
    faqs: [
      { q: "Does the system require specialized POS hardware?", a: "No. Eurosia POS runs beautifully inside standard Web browsers on Android, iOS, Windows, Mac, or Chromebook devices." },
      { q: "Are printed receipts compliant with local tax authorities?", a: "Yes, our template engines automatically inject localized VAT/GST tax rates and official verification hashes." }
    ]
  },
  crm: {
    id: "crm",
    name: "Eurosia CRM Workspace",
    tagline: "Automated lead triggers, predictive pipelines, and client telemetry.",
    category: "Business Solutions",
    iconName: "Users",
    description: "Scale your revenue pipeline. Group all client touchpoints, communication records, contract schedules, and AI sentiment logs inside a clear enterprise pipeline.",
    heroTitle: "Intelligent Customer Relationship Management",
    overview: "Tackle user churn and maximize client retention with historical customer profiles and automated action lists powered by secure client logs.",
    features: [
      "Automated lead capture from web, email, chatbot, and phone trunk lines.",
      "AI sentiment classification parsing email tickets and transcription records.",
      "Visual draggable kanban pipeline matching enterprise-sized sale structures.",
      "Smart follow-up alerts with secure workspace email proxy integration."
    ],
    benefits: [
      "Boost sales closure volumes by up to 34% with clean workflows.",
      "Completely eliminate duplicate client entries and lost lead records.",
      "Align marketing activities with true sales pipeline telemetry."
    ],
    industries: ["B2B agencies", "Technology SaaS builders", "Telecom providers", "Corporate banks"],
    workflow: [
      "Import existing contact books and pipeline statuses.",
      "Define tier levels, team sales quotas, and automated escalation pathways.",
      "Sync team email servers and internal messaging tools.",
      "Deploy active sales widgets for daily dashboard review."
    ],
    faqs: [
      { q: "Can we restrict client data access by region?", a: "Yes. Our CRM features advanced enterprise role-based hierarchy, shielding sensitive client information based on user profiles." }
    ]
  },
  hrm: {
    id: "hrm",
    name: "Eurosia HRM Core",
    tagline: "Track team performance, handle secure staff profiles and leaves.",
    category: "Business Solutions",
    iconName: "Users",
    description: "Streamline human resources. Centralize background verifications, holiday rosters, performance metrics, and digital contract signatures in one encrypted database.",
    heroTitle: "Enterprise-Class Human Resource Management",
    overview: "Maintain clean corporate alignment. Our HRM modules provide clear workflows for talent onboarding, attendance registries, and periodic evaluation matrix maps.",
    features: [
      "Automated biometric attendance terminal synchronization over secure telemetry.",
      "Self-service staff portal for leave tracking, documents, and profile changes.",
      "Automated recruitment parsing with CV index scoring models.",
      "Visual team structures charting departmental hierarchies and responsibilities."
    ],
    benefits: [
      "Reduce HR administration workloads by up to 50%.",
      "Ensure complete compliance with localized labor codes and safety policies.",
      "Maximize staff engagement with transparent feedback channels."
    ],
    industries: ["Service groups", "Heavy industries", "Educational institutions", "Goverment organizations"],
    workflow: [
      "Map company leave policies and shift definitions.",
      "Bulk upload employee master records from legacy worksheets.",
      "Provision self-service portal accounts with role security.",
      "Activate regular performance loops."
    ],
    faqs: [
      { q: "Is employee physical location tracked for virtual check-ins?", a: "Yes. Staff geofencing coordinates can be enabled optionally to authenticate check-ins." }
    ]
  },
  payroll: {
    id: "payroll",
    name: "Eurosia Financial Payroll",
    tagline: "Automated tax deductions, local bank transfers, and payslip triggers.",
    category: "Business Solutions",
    iconName: "Coins",
    description: "Generate compliant payroll runs with zero calculation errors. Handles bonuses, dynamic leaves deductions, provident funds, and multi-currency transfers.",
    heroTitle: "Compliant Enterprise Payroll Engine",
    overview: "Maintain perfect financial order. Pay teams on time, compute national tax deductions automatically, and generate ready bank wire files instantly.",
    features: [
      "Automated overtime calculation hooked to real-time attendance logs.",
      "Flexible payment modes including direct bank deposits and local payment apps.",
      "Compliant tax forms generation with instant digital payslips email.",
      "Integrated bonuses, allowances, and custom loan installment deductions."
    ],
    benefits: [
      "Achieve zero calculation errors during complex payroll runs.",
      "Avoid compliance penalties via automatically updated national tax brackets.",
      "Save finance team hours each month on repetitive spreadsheet checks."
    ],
    industries: ["SMEs", "Large corporate head offices", "FMCG manufacturers", "Contractor companies"],
    workflow: [
      "Configure tax profiles, company benefits, and allowances definitions.",
      "Set employee base salaries and preferred payout banks.",
      "Verify monthly shift logs and approve automated draft runs.",
      "Download direct bank wire files and execute mass payment payouts."
    ],
    faqs: [
      { q: "Does the system support hourly wage structures?", a: "Yes. You can define hourly rates with automated multipliers for night shifts or weekend overtimes." }
    ]
  },
  inventory: {
    id: "inventory",
    name: "Eurosia Smart Inventory",
    tagline: "Intelligent SKU tracking, barcode networks, and dynamic restocking.",
    category: "Business Solutions",
    iconName: "Layers",
    description: "Gain complete control of physical products across multiple stock depots. Prevent out-of-stock events with automated low-limit alarms and smart purchase recommendations.",
    heroTitle: "Intelligent SKU and Stock Depot Processor",
    overview: "Eurosia Smart Inventory features serial tracking, automated barcode tag generation, and stock movement logs with encrypted secure footprints.",
    features: [
      "Batch tracking with expiration date tracking and barcode tag printers.",
      "Automated stock level alerts with dynamic purchase order draft tools.",
      "Multi-warehouse spatial location mapping (aisles, racks, and shelfs).",
      "Dynamic stock value calculations (FIFO, LIFO, and weighted average methods)."
    ],
    benefits: [
      "Decrease dead stock holding costs by up to 28%.",
      "Prevent stock outages on popular high-frequency SKU lines.",
      "Streamline cyclic stock-counting processes via scanning apps."
    ],
    industries: ["Pharma distributors", "Electronics retailers", "Industrial parts stores", "FMCG packers"],
    workflow: [
      "Define master SKU code configurations and tax brackets.",
      "Log existing warehouse stock levels and rack maps.",
      "Train stock operators with mobile barcode checking tools.",
      "Link sales outlets and e-commerce platforms to real-time feeds."
    ],
    faqs: [
      { q: "Can we track items using unique serial numbers?", a: "Yes. The inventory module supports tracking machinery, smartphones, or luxury assets by unique serials or IMEI codes." }
    ]
  },
  procurement: {
    id: "procurement",
    name: "Eurosia Procurement Flow",
    tagline: "Supplier registry nodes, automate purchase drafts, and billing reconciles.",
    category: "Business Solutions",
    iconName: "Workflow",
    description: "Manage purchase requisitions with structured authority controls. Audit supplier pricing records, track delivery confirmations and sync double-entry debit books.",
    heroTitle: "Enterprise Procurement Streamlining Engine",
    overview: "Introduce strict budget hygiene. Prevent unapproved company expenses with role-based requisition limits and automated supplier comparison matrices.",
    features: [
      "Purchase Request to Purchase Order workflow with multi-level approval nodes.",
      "Comprehensive supplier directory scoring historical quality and delays.",
      "Automatic ledger entries matching incoming goods against billing papers.",
      "Visual material inventory planning dashboards for smooth order fulfillmenting."
    ],
    benefits: [
      "Reduce corporate purchasing spend through strict approval compliance.",
      "Shorten delivery delays with verified supplier rating indicators.",
      "Minimize human mistakes in matching invoice bills with warehouses."
    ],
    industries: ["Chemical labs", "Real estate developers", "Infrastructure contractors", "Hotel chains"],
    workflow: [
      "Map company purchasing approval structures and budget limits.",
      "Onboard approved company suppliers and store standard pricing catalogs.",
      "Connect project managers to digital purchase drafting terminals.",
      "Automate payment reviews with accounting system reconciliation."
    ],
    faqs: [
      { q: "Is the purchasing pipeline linked to active production stages?", a: "Yes. Project material requirements feeds can feed automatic PO pipeline requests." }
    ]
  },

  // Healthcare Solutions
  hospital: {
    id: "hospital",
    name: "Eurosia Care Hospital Suite",
    tagline: "Secure medical portals, dynamic IPD registers, and medicine tracking.",
    category: "Healthcare Solutions",
    iconName: "HeartPulse",
    description: "A secure, HIPAA-compliant enterprise operating system for hospitals and digital health networks. Unifies patient files, emergency rosters, ward spaces, and secure diagnostic portals.",
    heroTitle: "HIPAA-Compliant Hospital Resource Management",
    overview: "Improve patient treatment outcomes with a fast, zero-latency clinical workspace that logs patient records securely with role-based restriction keys.",
    features: [
      "HIPAA-compliant Electronic Health Records (EHR) with secure audit log trails.",
      "Dynamic ward tracking for bed allocations, nurse rotas, and clinical events.",
      "Pharmacy stock ledger integrated with patient medication charts.",
      "Digital lab orders flow with secure online patient portal distribution."
    ],
    benefits: [
      "Reduce clinical data entry mistakes by up to 40% with consolidated profiles.",
      "Minimize patient ward check-in delays using dynamic dashboards.",
      "Ensure absolute compliance with health protocols and encryption frameworks."
    ],
    industries: ["General hospitals", "Super-specialty medical centers", "Private health networks", "Government medical depots"],
    workflow: [
      "Deploy localized HIPAA data encryptions and master cloud nodes.",
      "Integrate legacy patient profiles and medication histories safely.",
      "Train clinical staff, ward managers, and billing officers on terminals.",
      "Activate electronic outpatient scheduling portals."
    ],
    faqs: [
      { q: "Is patient clinical data encrypted?", a: "Yes, all health records utilize 256-bit AES encryption schemas in transit and at rest, isolated from general web nodes." }
    ]
  },
  clinic: {
    id: "clinic",
    name: "Eurosia Care Clinic",
    tagline: "Fast doctor calendars, prescriptions mapping, and clean billing.",
    category: "Healthcare Solutions",
    iconName: "HeartPulse",
    description: "An elegant, highly responsive application designed for private clinics and consultant practices. Track appointment histories, patient symptoms, and electronic prescriptions instantly.",
    heroTitle: "Responsive Medical Clinic Operations",
    overview: "Increase outpatient volumes and clinical satisfaction with smart appointment books, dynamic medicine records, and fast billing.",
    features: [
      "Flexible appointment booking grids with automatic WhatsApp slot notices.",
      "Electronic prescription templates with structured dosage dropdowns.",
      "Online patient portal for easy check-up results and prescription access.",
      "Fast payment point-of-sale supporting cash, bKash, and medical insurances."
    ],
    benefits: [
      "Cut down missed clinic slots by keeping patients updated.",
      "Write accurate prescriptions in under 30 seconds with custom presets.",
      "Optimize doctor workloads with clean, organized calendars."
    ],
    industries: ["Dental clinics", "Pediatric clinics", "Specialized consultant chambers", "Diagnostic labs"],
    workflow: [
      "Configure working hours, doctor rosters, and consult fee levels.",
      "Upload common disease symptoms and drug prescription catalog lists.",
      "Connect patient communication nodes for SMS alerts.",
      "Initialize billing desk controls for cashier terminals."
    ],
    faqs: [
      { q: "Can we print medical prescriptions directly?", a: "Yes. Output is styled on custom letterheads or standard slip sheets instantly." }
    ]
  },
  pharmacy: {
    id: "pharmacy",
    name: "Eurosia Smart Pharmacy",
    tagline: "Track expiry dates, manage generic names, and handle fast sales.",
    category: "Healthcare Solutions",
    iconName: "Layers",
    description: "Keep complete track of healthcare products, batch numbers, generic compositions, chemical properties, and low-level shelf warnings.",
    heroTitle: "Intelligent Drug and Pharmacy Ledger",
    overview: "Stop trading expired drugs. Our system warns pharmacy teams of generic substitutes, checks active stock, and files bulk supply requirements.",
    features: [
      "Automated batch tracking with direct color warnings for nearing expiries.",
      "Generic name matching to quickly suggest alternative brands to patients.",
      "Prescription upload validation via scanning sensors.",
      "Linked purchase workflows that contact supply agents for low SKUs."
    ],
    benefits: [
      "Reduce medicine waste from expiration by more than 35%.",
      "Ensure perfect accuracy in distributing restricted medicine classes.",
      "Fast customer search using brand name, chemical composition, or generic codes."
    ],
    industries: ["Hospital pharmacy basements", "Retail drugstores", "Wholesale medical importers"],
    workflow: [
      "Onboard generic drug lists and local medicine pricing books.",
      "Log active inventory batches, rack slots, and expiry dates.",
      "Setup cashier scanners with rapid barcode identification tags.",
      "Launch real-time daily sales totals with integrated tax logging."
    ],
    faqs: [
      { q: "Does the system alert on restricted schedule drugs?", a: "Yes. Restricting triggers require physical manager authorization keys before billing restricted items." }
    ]
  },
  diagnostic: {
    id: "diagnostic",
    name: "Eurosia Care Diagnostic",
    tagline: "Analyze lab samples, track barcode labels, and store reports.",
    category: "Healthcare Solutions",
    iconName: "Activity",
    description: "Synchronize sample lifecycles across medical laboratory scanners. Automate report parameters checking, register patients, and print barcode sample tags.",
    heroTitle: "Laboratory and Diagnostic Center ERP",
    overview: "Eurosia Care Diagnostic ensures complete accuracy from clinical sample collection to patient portal report distribution, avoiding lab code mix-ups.",
    features: [
      "Barcode sample tracking from draw room to lab analysis equipment.",
      "Custom medical test templates with normal result guidelines.",
      "Direct integration with laboratory analyzers via serial ports.",
      "Encrypt patient medical reports to share via secure URLs."
    ],
    benefits: [
      "Completely eliminate test sample identification mistakes.",
      "Deliver clinical report outcomes up to 40% faster.",
      "Generate clear diagnostic analytics graphs for referring physicians."
    ],
    industries: ["Blood test labs", "Imaging clinics (X-Ray, MRI, CT)", "Pathology clinics", "Health checkup centers"],
    workflow: [
      "Map lab test catalogs, normal parameter values, and team fees.",
      "Install sample barcode printer networks at patient checkup desks.",
      "Sync clinical analyzer machines with data logging ports.",
      "Initialize secure patient portal folders for quick online downloads."
    ],
    faqs: [
      { q: "Is DICOM imaging supported?", a: "Yes. DICOM image files can be linked directly with patient diagnostic cases." }
    ]
  },
  telemedicine: {
    id: "telemedicine",
    name: "Eurosia Care Telemedicine",
    tagline: "Encrypted video consulting, health records sync, and payments.",
    category: "Healthcare Solutions",
    iconName: "Globe",
    description: "Bring qualified healthcare access to remote areas. Conduct encrypted medical consultations with electronic prescriptions and secure payment gateways.",
    heroTitle: "Sovereign Remote Telemedicine System",
    overview: "Eurosia Care Telemedicine provides smooth peer-to-peer digital consulting sessions for rural clinics and remote patients directly on the web.",
    features: [
      "WebRTC-encrypted high-definition video consult rooms with screen shares.",
      "Parallel medical record sidebars helping doctors take symptom logs instantly.",
      "Built-in digital payment forms accepting local wallet accounts.",
      "Automated WhatsApp notification with downloadable medical prescription PDFs."
    ],
    benefits: [
      "Expand clinic services beyond city areas.",
      "Cut down physical waiting volumes inside clinic halls by up to 30%.",
      "Keep diagnostic files and patient histories protected on compliant portals."
    ],
    industries: ["Rural health projects", "Specialized consulting practices", "Corporate wellness organizations"],
    workflow: [
      "Provision secure communication channels on regional servers.",
      "Onboard qualified doctors and specify scheduled consult slots.",
      "Launch user portal for online bookings.",
      "Test WebRTC audio-video channels for clinic computers."
    ],
    faqs: [
      { q: "Is high-speed internet mandatory?", a: "No. Our WebRTC engines feature adaptive bitrate coding that works smoothly on low-bandwidth 3G mobile networks." }
    ]
  },

  // Retail & Commerce
  ecommerce: {
    id: "ecommerce",
    name: "Eurosia Commerce Suite",
    tagline: "Ultra-fast online stores, shopping carts, and local payments.",
    category: "Retail & Commerce",
    iconName: "ShoppingBag",
    description: "Launch direct-to-consumer e-commerce portals. Built with an optimized client framework that loads under 1 second for higher checkout conversions.",
    heroTitle: "High-Performance E-commerce Engine",
    overview: "Eurosia Commerce features visual catalog builders, payment checkouts with local bKash, and seamless warehouse inventory sync.",
    features: [
      "Speed-optimized shopping pages with instant keyword search.",
      "Checkout forms with payment gateways and manual cash options.",
      "Dynamic promo coupon codes, gift cards, and wholesale pricing.",
      "Central admin panels covering orders, stock levels, and couriers."
    ],
    benefits: [
      "Boost checkout conversions with instantaneous page loads.",
      "Sync physical retail store stock with web catalog automatically.",
      "Manage all digital sales channels from a single workspace dashboard."
    ],
    industries: ["In-house fashion brands", "Electronics vendors", "Cosmetic suppliers", "Food and grocery hubs"],
    workflow: [
      "Upload product collections with media files and SKU codes.",
      "Sync credit card handlers and local payment triggers.",
      "Setup shipping zones and courier delivery APIs.",
      "Launch live SEO catalogs with structured semantic metadata schemas."
    ],
    faqs: [
      { q: "Does the system support mobile browsing?", a: "Yes. Every storefront is built as a highly responsive Progressive Web App that works beautifully on mobile screens." }
    ]
  },
  marketplace: {
    id: "marketplace",
    name: "Eurosia Global Marketplace",
    tagline: "Manage multi-seller storefront portfolios from one master terminal.",
    category: "Retail & Commerce",
    iconName: "Layers",
    description: "Launch transactional marketplace platforms. Handles vendor registrations, product review checkpoints, automated payout balances, and commission splits.",
    heroTitle: "Sovereign Multi-Merchant Marketplace",
    overview: "Eurosia Global Marketplace provides an enterprise operating framework for hosting thousands of vendors under a secure checkout system.",
    features: [
      "Secure vendor dashboard for listings, inventory, and analytics.",
      "Automated escrow and split payment routings for commission collections.",
      "In-depth rating systems with automated spam filters.",
      "Unified customer payment checkout containing items from multiple stores."
    ],
    benefits: [
      "Scale product listings rapidly without carrying inventory risk.",
      "Automate vendor payment payouts through secure compliance logs.",
      "Increase brand value as an ecosystem operator."
    ],
    industries: ["Niche craft portals", "Wholesale hubs", "Professional services directory hubs"],
    workflow: [
      "Establish platform categories, vendor guidelines, and commission rules.",
      "Draft registration forms to verify merchants online.",
      "Verify merchant payment configurations and tax rules.",
      "Launch marketplace store networks to start receiving transaction fees."
    ],
    faqs: [
      { q: "How are merchant payment payouts handled?", a: "Payouts can be processed automatically per billing terms or manually approved after deliveries are finalized." }
    ]
  },
  multivendor: {
    id: "multivendor",
    name: "Eurosia Multi Vendor",
    tagline: "Connect thousands of dealers, split delivery tabs, and track payouts.",
    category: "Retail & Commerce",
    iconName: "Workflow",
    description: "Unify extensive dealer networks. Perfect for large logistics circles that coordinate shipping tabs from multiple regional inventory depots.",
    heroTitle: "Enterprise Multi Vendor Operating Core",
    overview: "Keep dealers aligned. Monitor individual store sales, coordinate shipping channels, and distribute revenue payouts with complete clarity.",
    features: [
      "Central admin portal for managing seller accounts and product sheets.",
      "Independent vendor access for branch sales and inventory tracking.",
      "Automated seller revenue sheets calculation with clear logs.",
      "Customer support ticket routing to appropriate merchant depots."
    ],
    benefits: [
      "Coordinate high-volume vendor networks without operational friction.",
      "Prevent fraudulent merchant actions with strict review processes.",
      "Grow operational margins through scale."
    ],
    industries: ["B2B distribution systems", "Logotics groups", "Mega ecommerce networks"],
    workflow: [
      "Onboard master business operators and configure global settings.",
      "Create custom access roles for merchant supervisors.",
      "Replicate stock registries onto central system data stores.",
      "Launch merchant feedback panels to review trade flows."
    ],
    faqs: [
      { q: "Is there a limit to the number of hosted sellers?", a: "No. The system utilizes auto-scaling data clusters that grow with your merchant counts." }
    ]
  },
  "retail-mgmt": {
    id: "retail-mgmt",
    name: "Eurosia Retail Unified",
    tagline: "Connect cashiers, analyze multi-branch profits, and manage items.",
    category: "Retail & Commerce",
    iconName: "Building2",
    description: "A complete management package for commercial retail companies. Track daily registers, manage item movements, organize vendor catalogs, and review profits.",
    heroTitle: "Omnichannel Retail and Branch Coordinator",
    overview: "Eurosia Retail Unified bridges physical branches and warehouses to provide continuous operational statistics to retail business owners.",
    features: [
      "Unified item registry with central catalog updates across branches.",
      "Daily cashier terminal reconciliation logs and cash audits.",
      "Integrated customer loyalty programs across all purchase channels.",
      "Real-time profit margin tracker outlining product performance."
    ],
    benefits: [
      "Stop inventory shrinkages at branches through strict audit tracking.",
      "Maintain consistent consumer pricing across all branch locations.",
      "Access accurate financial performance charts in real-time."
    ],
    industries: ["Department chains", "Clothing companies", "Supermarket groups", "Decentralized retail houses"],
    workflow: [
      "Structure regional business nodes, warehouses, and tax rules.",
      "Import central SKU codes database.",
      "Establish active cash registers and assign store managers.",
      "Run real-time operations dashboards in administrative headquarters."
    ],
    faqs: [
      { q: "Can we run distinct item pricing for specific branches?", a: "Yes. Store tier configurations allow localized pricing setups tailored for local demographics." }
    ]
  },
  warehouse: {
    id: "warehouse",
    name: "Eurosia WMS Pro",
    tagline: "Track rack maps, audit physical stocks, and optimize picking flows.",
    category: "Retail & Commerce",
    iconName: "Layers",
    description: "An advanced, high-performance Warehouse Management System. Optimizes pick paths, tracks exact rack space positions, and manages item packing networks.",
    heroTitle: "Sovereign Warehouse and Picking Logistics System",
    overview: "Eurosia WMS Pro maximizes storage efficiency, reduces stock picking errors, and provides instant stock audit reports.",
    features: [
      "3D Rack mapping containing exact bin IDs and shelf weight loads.",
      "Optimized walking-path suggestion for picking operators using scanners.",
      "Cross-docking logistics support for fast item returns.",
      "Instant inventory discrepancy logging with barcode confirmation."
    ],
    benefits: [
      "Increase stock-handling speeds by up to 35%.",
      "Achieve 99.9% accuracy during warehouse order picking.",
      "Maintain clear stock value registers with automatic asset counting."
    ],
    industries: ["Logistics hubs", "3PL service providers", "Manufacturing stock depots", "Import warehouses"],
    workflow: [
      "Design virtual warehouse maps, aisles, shelves, and loading zones.",
      "Tag storage locations with custom high-contrast barcode plates.",
      "Equip floor staff with scanning terminals loaded with Eurois WMS.",
      "Link warehouse activities to order checkouts and supplier portals."
    ],
    faqs: [
      { q: "Does the warehouse software support cold chain requirements?", a: "Yes. Sensor feeds can log ambient temperatures on SKU storage history grids." }
    ]
  },

  // Education Solutions
  school: {
    id: "school",
    name: "Eurosia School Core",
    tagline: "Track student files, schedule teacher rotas, and manage fees.",
    category: "Education Solutions",
    iconName: "GraduationCap",
    description: "Manage school activities with zero friction. Registers student files, logs class attendances, handles school term fee collections, and emails student report cards.",
    heroTitle: "Next-Generation School Operating System",
    overview: "Deliver a clean digital experience to teachers, guardians, and administration staff. Standardizes records across student bodies.",
    features: [
      "Complete student profiles documenting grades and medical records.",
      "Automated fee invoicing with direct messaging to guardians.",
      "Dynamic school class schedules and teacher coverage charts.",
      "Teacher gradebooks with automated average cards calculations."
    ],
    benefits: [
      "Avert manual errors in school fee collection and bookkeeping.",
      "Keep guardians updated on student attendances automatically.",
      "Streamline scheduling of teaching timetables during school terms."
    ],
    industries: ["Primary schools", "Secondary colleges", "Language academies", "In-person training institutes"],
    workflow: [
      "Onboard school classes, subjects, and grading systems.",
      "Import student names, parental numbers, and past records.",
      "Onboard teacher rosters and assign class subject scopes.",
      "Launch father/mother advisory portals for online fee payments."
    ],
    faqs: [
      { q: "Is online credit card payment for school term fees secure?", a: "Yes. All online card checkout sessions run on fully insulated PCI-compliant gateways." }
    ]
  },
  college: {
    id: "college",
    name: "Eurosia College ERP",
    tagline: "Manage student hostels, coordinate semesters, and track payments.",
    category: "Education Solutions",
    iconName: "GraduationCap",
    description: "Coordinate extensive colleges. Tracks multi-semester subject selections, room allocations in hostels, and team payrolls.",
    heroTitle: "Sovereign College and Campus Management ERP",
    overview: "Eurosia College ERP unifies administrative departments, simplifies student campus admissions, and details historical student performance.",
    features: [
      "Multi-semester student registration with prerequisite validations.",
      "Hostel room inventory maps with billing histories.",
      "Financial registers detailing tuition structures and partial scholorships.",
      "Student noticeboards integrated with regional SMS alerts."
    ],
    benefits: [
      "Reduce admistrative workload through automated student registrations.",
      "Stop campus asset leakages using digital room inventory checkers.",
      "Publish accurate semester report files instantly."
    ],
    industries: ["Technical colleges", "Government polytechnics", "Private research colleges"],
    workflow: [
      "Map campus buildings, faculty chairs, and course lists.",
      "Setup dynamic cost categories tailored for distinct student pathways.",
      "Upload previous student cohort record data stores.",
      "Initialize online registration panels to start receiving admission forms."
    ],
    faqs: [
      { q: "Can teachers document attendance scores on mobile phones?", a: "Yes. The faculty portal is optimized for rapid mobile checklist actions inside classrooms." }
    ]
  },
  university: {
    id: "university",
    name: "Eurosia University Portal",
    tagline: "Student dashboards, credit credit maps, and research archives.",
    category: "Education Solutions",
    iconName: "GraduationCap",
    description: "An elite, enterprise-class platform built for heavy university workloads. Includes credit audit validations, research database folders, and smart course scheduling engines.",
    heroTitle: "Enterprise University Operating System",
    overview: "Support thousands of active online students. Includes structured academic boards tracking, credit balances, and financial invoicing pipelines.",
    features: [
      "Self-service student portal for elective selections and fee receipts.",
      "Advanced credit-hour tracking with automated prerequisite checks.",
      "Digital university research repositories supporting massive document uploads.",
      "Faculty grading systems with structured moderation checkpoints."
    ],
    benefits: [
      "Prevent student subject selection errors using rule-checked paths.",
      "Accelerate university administrative operations in multi-department systems.",
      "Ensure student financial files match corresponding tuition plans."
    ],
    industries: ["Major universities", "Post-graduate colleges", "National research systems"],
    workflow: [
      "Configure academic programs, departmental boards, and course rules.",
      "Build student database schemas with unique identity codes.",
      "Activate faculty records portals and course plan databases.",
      "Open access portals to enable student self-registrations."
    ],
    faqs: [
      { q: "Does the system support credit transfers?", a: "Yes. Credits evaluated from other institutions can be reviewed, scored, and appended." }
    ]
  },
  lms: {
    id: "lms",
    name: "Eurosia LMS Platform",
    tagline: "Secure video classes, online course tests, and study files.",
    category: "Education Solutions",
    iconName: "Monitor",
    description: "Set up interactive virtual classrooms. Supports live study classes, downloadable files storage, direct teacher-student chats, and digital certificates.",
    heroTitle: "Interactive Learning Management System",
    overview: "Turn corporate training or school courses into modular digital lessons. Students can track study progress and complete online tasks.",
    features: [
      "Course builders with support for videos, PDFs, and coding exercises.",
      "Automated graded task generation with strict progress limits.",
      "Live class schedules integrated with secure online meeting spaces.",
      "Automated PDF certificate delivery for course completions."
    ],
    benefits: [
      "Increase class completion ratios via modern student tools.",
      "Build a private library of training videos that stays secure.",
      "Deliver automated training programs for corporate employees easily."
    ],
    industries: ["Corporate firms", "Online training creators", "Virtual tutoring centers"],
    workflow: [
      "Design course paths, lesson topics, and unlock rules.",
      "Upload videos and study worksheets onto secure storage networks.",
      "Invite students and corporate trainees via email listings.",
      "Track live user activity charts inside coach control dashboards."
    ],
    faqs: [
      { q: "Are training videos protected against unauthorized downloads?", a: "Yes, video assets run on encrypted streaming protocols, preventing direct downloads." }
    ]
  },
  "online-exam": {
    id: "online-exam",
    name: "Eurosia Exam Engine",
    tagline: "Anti-cheat window tracking, smart testing grids, and fast grading.",
    category: "Education Solutions",
    iconName: "Cpu",
    description: "Launch secure online exams. Includes window defocus alerts, randomized question sets, strict countdown timers, and automatic gradebooks.",
    heroTitle: "Secure Academic and Professional Exam Engine",
    overview: "Run academic or recruitment tests online with complete confidence. Features security flags that alert planners of test window changes.",
    features: [
      "Smart question randomization preventing candidate test copying.",
      "Anti-cheat system that flags background window switches.",
      "Support for multiple formats (MSQs, math, and essays).",
      "Dynamic gradebooks that auto-check objective answers."
    ],
    benefits: [
      "Ensure strict academic testing standards during online exams.",
      "Save educational team hundreds of hours on manual exam grading.",
      "Export consistent test result files to core student profiles."
    ],
    industries: ["Corporate hiring teams", "School exam boards", "Certification institutes"],
    workflow: [
      "Structure test questions database and configure score standards.",
      "Schedule test slots and define access security tokens.",
      "Monitor candidate activity and defocus warnings during tests.",
      "Calculate grade summaries and distribute performance reports."
    ],
    faqs: [
      { q: "How does the window tracking feature operate?", a: "If a student defocuses the active exam window to check search pages, the tracker registers the action and alerts the supervisor." }
    ]
  },

  // Finance Solutions
  accounting: {
    id: "accounting",
    name: "Eurosia Ledger Accounting",
    tagline: "Dynamic trial balances, tax calculations, and asset ledgers.",
    category: "Finance Solutions",
    iconName: "Coins",
    description: "Clean balance sheets with zero errors. Maintains multi-currency double-entry asset logs, trial tables, and automatic tax reports.",
    heroTitle: "Double-Entry Ledger Accounting Engine",
    overview: "Maintain professional financial logs. Every transaction records cleanly with audit footprints that trace back to primary entry codes.",
    features: [
      "Double-entry bookkeeping engine with charts of account layouts.",
      "Real-time Balance Sheet and Income Statement calculations.",
      "Integrated banking feeds reconciliation trackers.",
      "Automatic tax forms calculations matching national accounting rules."
    ],
    benefits: [
      "Avoid accounting irregularities with double-entry rules checks.",
      "Gain real-time visibility into business cash flows.",
      "Simplify accounting checks with quick ledger tracing."
    ],
    industries: ["Commercial firms", "Audit agencies", "Property management organizations"],
    workflow: [
      "Upload past charts of accounts and bank opening balances.",
      "Connect daily checkout journals and transaction portals.",
      "Map company expense types and tax categories.",
      "Run weekly financial checks on centralized dashboards."
    ],
    faqs: [
      { q: "Can we manage accounts for multiple companies?", a: "Yes. Our multi-tenant architecture supports running separate legal entities in a single setup." }
    ]
  },
  billing: {
    id: "billing",
    name: "Eurosia Billing Platform",
    tagline: "Fast invoicing, automatic recurring payment reminders, and receipts.",
    category: "Finance Solutions",
    iconName: "DollarSign",
    description: "A secure, developer-friendly invoicing system. Connect utility portals, issue instant payment links, and send automatic client invoice notices.",
    heroTitle: "Enterprise Billing and Invoicing Hub",
    overview: "Eurosia Billing automates incoming cash collections, integrates with active payment gateways, and sends digital receipt files.",
    features: [
      "Professional HTML invoice designers with brand logo layouts.",
      "Auto-triggered payment reminder cycles via email and SMS.",
      "Built-in pay links directing clients to local card checkouts.",
      "Accurate tax and partial payment logging workflows."
    ],
    benefits: [
      "Shorten outstanding payment cycles by up to 45%.",
      "Give customers simple online payment paths.",
      "Automate invoice delivery upon completing transactions."
    ],
    industries: ["Utility companies", "B2B service firms", "Subscription startups", "Wholesalers"],
    workflow: [
      "Sync company payment accounts and bank details.",
      "Design standard invoices with logo assets and terms.",
      "Select automated payment reminder intervals.",
      "Monitor incoming client payments in real-time."
    ],
    faqs: [
      { q: "Can clients make partial payments?", a: "Yes. System tracks paid amounts and lists remaining dues on the invoice sheet structure." }
    ]
  },
  subscription: {
    id: "subscription",
    name: "Eurosia Subscription Engine",
    tagline: "Flexible user subscription plans, automatic billing cycles, and dunning.",
    category: "Finance Solutions",
    iconName: "Layers",
    description: "Manage subscription plans effortlessly. Handles monthly recurring billing cycles, user plan upgrades or downgrades, and smart dunning emails for failed cards.",
    heroTitle: "Recurring Subscription Billing Core",
    overview: "Maximize recurring revenue with a clean subscription controller that tracks user trial loops and automates renew cycles.",
    features: [
      "Flexible customer pricing setups (usage-based, tiers, or flat rates).",
      "Automated card try systems with step-by-step dunning emails.",
      "Active customer subscription dashboard detailing renewal schedules.",
      "SaaS operations charts outlining MRR, ARR, and subscriber churn rates."
    ],
    benefits: [
      "Safeguard recurring revenues from payment failures with dunning.",
      "Launch new promotional discount bundles without code modifications.",
      "Track precise product growth metrics in real-time."
    ],
    industries: ["SaaS startups", "Online gym platforms", "Digital media content hubs", "Security groups"],
    workflow: [
      "Specify product catalogs and billing pricing plans.",
      "Integrate customer payment portals and billing libraries.",
      "Setup automated email rules for user payment alerts.",
      "Monitor customer signups and plan stats on developer dashboards."
    ],
    faqs: [
      { q: "Is custom usage-based invoicing supported?", a: "Yes. Metered billing modules accept API calls to invoice based on tracked resources usage." }
    ]
  },
  "financial-reporting": {
    id: "financial-reporting",
    name: "Eurosia Financial Intel",
    tagline: "Automated cash flow forecasts, financial analysis, and charts.",
    category: "Finance Solutions",
    iconName: "Activity",
    description: "Generate deep financial analytics reports. Review department spending channels, forecast future business cash balances, and share compliant audit charts.",
    heroTitle: "Predictive Corporate Financial Reporting System",
    overview: "Make critical decisions using real business data instead of guesses. Aggregates data feeds from accounting modules to build visual reports.",
    features: [
      "Auto-compiled financial performance diagrams and profit analyses.",
      "AI-assisted financial forecasts outlining future capital requirements.",
      "Department-wise budget monitoring with expense limit alarms.",
      "Dynamic data export in PDF and multi-tab Excel files."
    ],
    benefits: [
      "Shorten board meeting prepare times with automated charts.",
      "Detect margin leaks early across specific business units.",
      "Ensure reliable corporate budget compliance audits."
    ],
    industries: ["Group companies", "Private equity funds", "Commercial retail leaders"],
    workflow: [
      "Connect ledger data sources and expense accounts.",
      "Establish annual department budgets and warning triggers.",
      "Configure preferred charting templates.",
      "Run daily cash overview summaries for executive teams."
    ],
    faqs: [
      { q: "Can we sync data from multiple bank accounts?", a: "Yes. Integrates secure accounting pipelines to consolidate separate banking figures." }
    ]
  },

  // Logistics Solutions
  fleet: {
    id: "fleet",
    name: "Eurosia Fleet Tracker",
    tagline: "Real-time truck tracking, vehicle service schedules, and fuel logs.",
    category: "Logistics Solutions",
    iconName: "Truck",
    description: "Manage commercial fleets with zero hassle. Tracks live vehicle locations via GPS sensors, logs fuel purchases, and alerts on upcoming oil modifications.",
    heroTitle: "Enterprise Fleet and Dispatch Operating Core",
    overview: "Minimize vehicle breakdowns and optimize fuel expenses with a central tracking system that connects truck logs and service journals.",
    features: [
      "Live GPS fleet monitoring on detailed responsive maps.",
      "Fuel log registers tracking mileage and driver cards.",
      "Automatic vehicle maintenance alerts (brake checks, oil, certifications).",
      "Driver duty roster management with safety score indices."
    ],
    benefits: [
      "Cut down company fuel wastes by tracking idling times.",
      "Prevent expensive vehicle damage with scheduled service alerts.",
      "Maximize fleet utilization rates across regional depots."
    ],
    industries: ["Courier companies", "Construction haulers", "Corporate shuttle fleets", "Cold-chain distributors"],
    workflow: [
      "Onboard vehicle listings, license details, and load capacities.",
      "Install GPS tracker modules and register client API keys.",
      "Create profile pages for drivers and associate fuel limit cards.",
      "Launch visual dispatch boards to coordinate truck routing."
    ],
    faqs: [
      { q: "Can we track fuel storage levels at our main bases?", a: "Yes, inventory logs can track regional depot fuel tanks with tank levels telemetry." }
    ]
  },
  delivery: {
    id: "delivery",
    name: "Eurosia Delivery Hub",
    tagline: "Live customer delivery maps, SMS alerts, and proof checks.",
    category: "Logistics Solutions",
    iconName: "Milestone",
    description: "Manage last-mile deliveries with perfect clarity. Includes automated parcel sorting tools, delivery driver apps, and responsive customer tracking maps.",
    heroTitle: "Last-Mile Delivery Logistics Coordinator",
    overview: "Deliver orders faster and maintain high ratings. Features proof of delivery via digital signatures and customer tracking screens.",
    features: [
      "Dynamic driver pairing engine based on delivery location grids.",
      "Mobile driver screens for delivery updates and signature saves.",
      "Real-time SMS alerts that send package tracking links to customers.",
      "COD (Cash on Delivery) cash tracking for safe handovers."
    ],
    benefits: [
      "Achieve complete accuracy in dispatching order drivers.",
      "Shorten customer support ticket rates using tracking links.",
      "Prevent delivery fraud with required customer signature and photo saves."
    ],
    industries: ["E-commerce logistics", "Food courier operations", "Appliance installers"],
    workflow: [
      "Define delivery zones, price rates, and package sizes.",
      "Equip delivery drivers with Eurosia mobile app profiles.",
      "Sync orders from retail outlets to dispatch registries.",
      "Track active deliveries on dashboard map structures."
    ],
    faqs: [
      { q: "Is customer location tracked when accepting packages?", a: "Yes. GPS coordinates are saved when drivers complete deliveries to confirm delivery points." }
    ]
  },
  "supply-chain": {
    id: "supply-chain",
    name: "Eurosia Supply Pipeline",
    tagline: "Track import shipping containers, optimize storage, and rate suppliers.",
    category: "Logistics Solutions",
    iconName: "Layers",
    description: "A complete supply chain workspace. Oversee international import shipments, coordinate freight handlers, and track bulk items to prevent production halts.",
    heroTitle: "Global Supply Chain Planning Core",
    overview: "Maintain continuous product flows. Connect material orders with shipping statuses to calculate exact warehouse landing dates.",
    features: [
      "Import cargo tracking featuring custom landing estimates files.",
      "Integrated material supply charts linked with active production phases.",
      "Supplier rating pages scoring item quality and transit delays.",
      "Custom clearance milestones check sheets and duty cost audits."
    ],
    benefits: [
      "Avert material shortages on manufacturing lines.",
      "Minimize port container delays using automatic milestones charts.",
      "Build relationships with highly rated global supply partners."
    ],
    industries: ["Heavy manufacturing plants", "FMCG packers", "Industrial supply distributors"],
    workflow: [
      "Map supply tiers, transit stages, and shipping methods.",
      "Connect global logistics tracking channels directly.",
      "Link warehouse WMS controls to incoming stock pipelines.",
      "Analyze historical transit routes to minimize shipping timings."
    ],
    faqs: [
      { q: "Can we track partial container loads (LCL)?", a: "Yes, purchase documents can log individual SKU lines within specific cargo units." }
    ]
  },
  "route-optimization": {
    id: "route-optimization",
    name: "Eurosia Route Optima",
    tagline: "Optimize driver tracks, save fuel, and bypass heavy traffic.",
    category: "Logistics Solutions",
    iconName: "Workflow",
    description: "Automate driver route decisions. Calculates the absolute fastest multi-stop pathways for transport fleets to save fuel and bypass congestion.",
    heroTitle: "Dynamic Multi-Stop Route Optimizer",
    overview: "Save money on fuel. Eurosia Route Optima processes address logs to build optimized multi-stop path schedules for delivery drivers.",
    features: [
      "Sovereign path planning engine calculating fastest travel sequences.",
      "Real-time traffic monitor integrations that bypass bottlenecks.",
      "Smart order grouping based on truck loading levels.",
      "Instant driver routing updates dispatched directly to mobile."
    ],
    benefits: [
      "Reduce commercial vehicle fuel bills by more than 20%.",
      "Raise daily driver order volumes via optimized routes.",
      "Minimize delivery delays and keep customers updated."
    ],
    industries: ["Product distributors", "Waste collectors", "Field service squads", "Grocery carriers"],
    workflow: [
      "Import list of stop coordinates for scheduled deliveries.",
      "Specify fleet details, truck capacities, and shift limits.",
      "Run optimizer algorithms to generate vehicle pathways.",
      "Send routing directions directly to driver mobile panels."
    ],
    faqs: [
      { q: "How many stops can be processed at once?", a: "Our scaling route servers can calculate optimized tracks for thousands of delivery points." }
    ]
  },

  // Industry Solutions
  manufacturing: {
    id: "manufacturing",
    name: "Eurosia Manufacturing ERP",
    tagline: "Organize material sheets, track machinery limits, and schedule runs.",
    category: "Industry Solutions",
    iconName: "Factory",
    description: "A rugged, full-scale operating system for heavy factories. Tracks Bill of Materials (BOM), logs factory shift outputs, and alerts on machinery service schedules.",
    heroTitle: "Ruggedized Manufacturing Core and BOM ERP",
    overview: "Eliminate downtime on factory lines. Connect material inventories and machinery limits with daily client project milestones.",
    features: [
      "Detailed Bill of Materials (BOM) configurations with sub-assembly levels.",
      "Live factory floor output log checkers connected with shift registers.",
      "Machinery down-time counters and scheduled maintenance alarms.",
      "Accurate actual production cost worksheets (materials, wages, power)."
    ],
    benefits: [
      "Avoid factory idle times by keeping raw stocks matched to tasks.",
      "Know true cost margins per produced batch instantly.",
      "Extend life of equipment with preventative maintenance alerts."
    ],
    industries: ["Textile mills", "Assembly plants", "Food processing centers", "Plastic products creators"],
    workflow: [
      "Onboard machinery rosters, shift grids, and factory spaces.",
      "Build product BOM trees detailing exact raw resource ingredients.",
      "Deploy output logging terminals at packing check desks.",
      "Link active material levels to supplier purchase workflows."
    ],
    faqs: [
      { q: "Is the software compatible with automated machinery hubs?", a: "Yes. Integrates with industry standard adapters to fetch direct execution logs." }
    ]
  },
  construction: {
    id: "construction",
    name: "Eurosia Build Matrix",
    tagline: "Track construction materials, subcontractor bills, and milestones.",
    category: "Industry Solutions",
    iconName: "Landmark",
    description: "Keep engineering projects on budget. Manage construction material stocks, subcontractor payout sheets, and daily project milestones cleanly.",
    heroTitle: "Enterprise Construction Management Suite",
    overview: "Eurosia Build Matrix provides property developers and contractors with real-time insight into material wastes and project delays.",
    features: [
      "Project milestone trackers mapping raw concrete, steel, and finish phases.",
      "Depot inventory logs detailing sand bags, iron rods, and machinery.",
      "Subcontractor work log validators with milestone payouts triggers.",
      "Safety compliant checklist diaries for site supervisors."
    ],
    benefits: [
      "Avert material leakages from construction sites through secure audits.",
      "Track project financial health against primary cost projections.",
      "Deliver site progress updates to project owners instantly."
    ],
    industries: ["Apartment builders", "Infrastructure developers", "Civil contractors"],
    workflow: [
      "Create project profiles detailing site depots and material charts.",
      "Establish subcontractor billing conditions and approval roles.",
      "Empower site supervisors with mobile material request screens.",
      "Run budget comparison reports in administrative headquarters."
    ],
    faqs: [
      { q: "Can site managers upload daily progress images?", a: "Yes, site supervisors can upload photos straight to project logs for audit review." }
    ]
  },
  realestate: {
    id: "realestate",
    name: "Eurosia Estate CRM",
    tagline: "Track apartment prospects, manage installment schedules, and deeds.",
    category: "Industry Solutions",
    iconName: "HomeIcon",
    description: "Sell and lease properties with confidence. Tracks real estate projects, maps buyer installment records, and registers property legal deeds.",
    heroTitle: "Intelligent Real Estate Property CRM",
    overview: "Organize client communication histories and maintain clean property installment files across multi-story real estate projects.",
    features: [
      "Interactive property grid showing buyer statuses (sold, booked, open).",
      "Buyer payment installment planner with automatic SMS reminder flags.",
      "Property agent commissions tracker linked to sales contracts.",
      "Tenant rent payment logs, energy utility counts, and leases."
    ],
    benefits: [
      "Speed up property bookings and client billing records.",
      "Shorten payment delays on buyer installments through reminders.",
      "Maintain tidy legal contract files for commercial audit preparation."
    ],
    industries: ["Real estate developers", "Property asset managers", "Rental leasing agencies"],
    workflow: [
      "Design target project frameworks, floor configurations, and flat lists.",
      "Upload prospect lead databases and setup follow-up tasks.",
      "Configure flat installment fee schedules and banks.",
      "Connect agent accounts to daily progress screens."
    ],
    faqs: [
      { q: "Does the CRM support commercial leasing formats?", a: "Yes, handles monthly tenant rent invoices, safety bills, and lease renewals." }
    ]
  },
  hotel: {
    id: "hotel",
    name: "Eurosia Stay Hotel ERP",
    tagline: "Manage room reservation books, check guest check-ins, and billing.",
    category: "Industry Solutions",
    iconName: "Building2",
    description: "An advanced, intuitive property engine for commercial hotels. Orchestrates guest check-in sheets, restaurant purchases, and clean room statuses.",
    heroTitle: "Omnichannel Hotel Property Management OS",
    overview: "Maximize hotel room occupancies, automate guest check-in routines, and avoid double-booked slots with real-time room trackers.",
    features: [
      "Visual room bookings board detailing occupied, dirty, and ready rooms.",
      "Unified guest bills combining room nights, spa, and food bills.",
      "Channel manager connects core room availability to web portals.",
      "Housekeeping dispatch tasks generated upon guest check-out events."
    ],
    benefits: [
      "Achieve zero room scheduling overlap mistakes.",
      "Provide smooth checkout processes by joining all guest spend records.",
      "Raise hotel room turnovers via fast cleaning team alerts."
    ],
    industries: ["Boutique luxury stays", "City hotels", "Resort stay networks", "Guest house groups"],
    workflow: [
      "Setup room categorizations, season rate boards, and tax settings.",
      "Connect reservation desks to online booking directories.",
      "Train front desk and room team with responsive mobile screens.",
      "Launch daily hotel sales audit logs for accounting supervisors."
    ],
    faqs: [
      { q: "Can we link key card systems with checkout actions?", a: "Yes, provides options to sync external door lock equipment over local network Trunks." }
    ]
  },
  restaurant: {
    id: "restaurant",
    name: "Eurosia Dine Engine",
    tagline: "Mobile waiter order grids, kitchen display terminals, and POS.",
    category: "Industry Solutions",
    iconName: "Layers",
    description: "A fast, resilient operating package for restaurants. waiter tables grids, kitchen order monitors (KOT), and high-contrast bill desk POS screens.",
    heroTitle: "End-to-End Restaurant Management Hub",
    overview: "Eliminate food order delays and wrong table dishes. Directly connects waiter tablets with kitchen monitors and billing registers.",
    features: [
      "Table layout maps with active ordering flags and timers.",
      "Mobile order-taker screens for waiters running directly on phone.",
      "Kitchen Display System (KDS) showing pending dishes by table group.",
      "Ingredient tracking deducts inventory based on recipe lists."
    ],
    benefits: [
      "Shorten food prep delays by sending orders straight from tables.",
      "Eliminate manual order spelling mistakes.",
      "Optimize ingredient spend by tracking exact recipe counts."
    ],
    industries: ["Fine dining venues", "Quick service outlets", "Fast food franchises", "Hotel dining rooms"],
    workflow: [
      "Map restaurant table grids, menu sections, and items.",
      "Enter recipe descriptions detailing raw material items.",
      "Install kitchen monitors and train food preparation supervisors.",
      "Enable waiter accounts on checkout tablets and launch live sales."
    ],
    faqs: [
      { q: "Is multi-terminal printing supported for kitchen sections?", a: "Yes. Food orders dispatch automatically to corresponding kitchen desks (drinks, steaks, desserts)." }
    ]
  },

  // AI Solutions
  "ai-chatbot": {
    id: "ai-chatbot",
    name: "Eurosia AI Agent",
    tagline: "Engage visitors, solve customer issues, and catalog leads 24/7.",
    category: "AI Solutions",
    iconName: "Bot",
    description: "An advanced, secure client-facing AI Agent. Connects directly to core product documents to resolve client questions, books booking slots, and registers verified sales leads.",
    heroTitle: "Sovereign AI Lead and Support Agent",
    overview: "Eurosia AI Agent runs 24/7 on your website pages, processing visitor queries and completing product bookings via safe secure tools.",
    features: [
      "Enterprise model reasoning trained on private product guidelines.",
      "Lead generation forms with automated phone and email verifications.",
      "Instant meeting schedules with secure customer calendar slots.",
      "Encrypted handovers to human team during complex issues."
    ],
    benefits: [
      "Resolve up to 75% of customer queries without team action.",
      "Convert night-time web traffic into qualified sale leads.",
      "Reduce support agent costs drastically from day one."
    ],
    industries: ["E-commerce sites", "Fintech systems", "SaaS platforms", "Educational websites"],
    workflow: [
      "Import product manuals and service instructions.",
      "Specify chatbot branding styles, welcome statements, and tones.",
      "Test reasoning limits using common client query books.",
      "Deploy code to websites and review customer conversation charts."
    ],
    faqs: [
      { q: "Can the AI Agent resolve queries in other languages?", a: "Yes, reasons and replies fluently in over 50 regional languages including Bengali." }
    ]
  },
  "ai-assistant": {
    id: "ai-assistant",
    name: "Eurosia AI Assistant",
    tagline: "Generate summary notes, draft emails, and fetch database figures.",
    category: "AI Solutions",
    iconName: "Monitor",
    description: "Boost employee efficiency with workspace AI helpers. Automatically drafts client response drafts, creates summary sheets from long meetings, and writes reports from spreadsheet data.",
    heroTitle: "Workspace AI Assistance Core",
    overview: "Help your operational team work faster. Provides contextual database search, customer ticket summaries, and template letter creation tools.",
    features: [
      "Email draft creator that matches historical company writing styles.",
      "Long corporate project document summarizes with bullet output.",
      "Live search that acts as a secure knowledge guide for new employees.",
      "Smart text spelling and style correcting for consistent styling."
    ],
    benefits: [
      "Shorten team response delays on client contract writing.",
      "Onboard new workspace managers faster through document search tools.",
      "Raise employee document creation speeds significantly."
    ],
    industries: ["B2B service offices", "Marketing companies", "Developer agencies", "Education hubs"],
    workflow: [
      "Connect team documentation directories safely.",
      "Specify corporate templates, security rules, and language styling.",
      "Train team on how to trigger AI assistants on documents.",
      "Track daily user efficiency gains on management graphs."
    ],
    faqs: [
      { q: "Is our private data safe from external models?", a: "Yes. Eurosia uses private cloud models. Your content never trains public models." }
    ]
  },
  "customer-support-ai": {
    id: "customer-support-ai",
    name: "Eurosia Care Intel AI",
    tagline: "Classify incoming support tickets, predict churn, and draft replies.",
    category: "AI Solutions",
    iconName: "MessageSquareText",
    description: "Support customer teams with real-time AI tools. Scans incoming user emails to apply tags, points out unhappy customers early, and drafts quick, detailed replies.",
    heroTitle: "Predictive Customer Support Orchestrator",
    overview: "Handle customer issues before they scale. Eurosia Care Intel AI flags sensitive emails automatically to keep teams aligned.",
    features: [
      "Inbound email topic tagging with urgent alerts for VIP accounts.",
      "Smart sentiment detector that tracks user mood trends across tickets.",
      "Draft reply drafts based on historical problem solutions.",
      "Automated ticket routing to team supervisors by specialty."
    ],
    benefits: [
      "Accelerate response times on critical user issues.",
      "Identify user churn threats early to maximize client retention.",
      "Shorten training curves for new customer support partners."
    ],
    industries: ["Telecom carriers", "Fintech networks", "Global product stores"],
    workflow: [
      "Configure support inbox channels and client logs.",
      "Establish ticket escalations criteria and priority tags.",
      "Sync internal support logs for AI contextual learning.",
      "Monitor team performance charts in administrative dashboards."
    ],
    faqs: [
      { q: "How does the sentiment detection score users?", a: "Analyzes client word selection to score satisfaction levels from green (good) to red (unhappy)." }
    ]
  },
  "document-automation": {
    id: "document-automation",
    name: "Eurosia DocuStream",
    tagline: "Parse invoice data, scan ID papers, and log records.",
    category: "AI Solutions",
    iconName: "Cpu",
    description: "Automate paper data entry. Uses advanced visual scans to read details from invoices, tax documents, or ID papers to write them straight into databases.",
    heroTitle: "Cognitive Document Extraction Engine",
    overview: "Eurosia DocuStream eliminates manual typing mistakes and speeds up document approvals by reading paperwork automatically with high accuracy.",
    features: [
      "Multi-format document parsing (JPG, PDF, PNG scans).",
      "Dynamic data checking that flags missing signatures or values.",
      "Automated ledger drafts generation based on scanned receipts.",
      "Secure encrypted storage logs for historic corporate paper files."
    ],
    benefits: [
      "Save hundreds of team hours spent on manual database entries.",
      "Completely eliminate key-in mistakes on complex numeric reports.",
      "Accelerate invoice approval speeds across branch networks."
    ],
    industries: ["Accounting houses", "Logistics agencies", "Custom clearance circles", "Corporate banks"],
    workflow: [
      "Define standard layout maps for invoices and ID papers.",
      "Integrate document uploading screens with central accounting systems.",
      "Test scan accuracy indices using sample paperwork packages.",
      "Run automated entry queues with human checker controls."
    ],
    faqs: [
      { q: "How does the engine handle unclear ink scans?", a: "If clarity scores drop below our accuracy criteria, the document redirects to human checkers." }
    ]
  },
  "workflow-automation": {
    id: "workflow-automation",
    name: "Eurosia Autopilot Core",
    tagline: "Connect workspace apps, automate alerts, and schedule reports.",
    category: "AI Solutions",
    iconName: "Workflow",
    description: "Connect separate corporate tools without manual effort. Setup automated alerts, run daily system database reports, and sync status fields easily.",
    heroTitle: "Enterprise Automations and Logic Pipeline",
    overview: "Avoid repetitive human workflows. Directly route information across company platforms when specific triggers are logged.",
    features: [
      "Visual step builder for simple logical triggers.",
      "Built-in adapters linking emails, databases, and SMS channels.",
      "Error checker grids with automated backup routes.",
      "Continuous system operation logs detailing successful runs."
    ],
    benefits: [
      "Keep separate company databases completely in sync.",
      "Shorten information transfer delays across operational teams.",
      "Discover manual task bottlenecks via performance reports."
    ],
    industries: ["E-commerce warehouses", "Marketing networks", "Administrative offices"],
    workflow: [
      "List repetitive daily tasks and identify target applications.",
      "Establish logic conditions and required data transformations.",
      "Run task pipelines inside debug monitors and check performance.",
      "Activate live operational routines and monitor logs."
    ],
    faqs: [
      { q: "Can we build automations that pull data from SQL tables?", a: "Yes, features database triggers that watch for updates to run workflow schedules." }
    ]
  },

  // Custom Solutions
  "custom-dev": {
    id: "custom-dev",
    name: "Eurosia Custom Dev",
    tagline: "Bespoke software architecture engineered for absolute scale.",
    category: "Custom Solutions",
    iconName: "Terminal",
    description: "Bespoke system designs. When off-the-shelf software doesn't fit, we design custom systems from scratch to support millions of concurrent visitors.",
    heroTitle: "Sovereign Bespoke Software Engineering",
    overview: "Translate complex brand ambitions into reliable software code. We use clean type structures and zero-trust cloud setups.",
    features: [
      "Decoupled frontend grids paired with fast, lightweight backend systems.",
      "Robust data models built for quick queries and heavy usage.",
      "Continuous automated code updates with visual testing frameworks.",
      "Thorough API manuals outlining code endpoints for external staff."
    ],
    benefits: [
      "Own 100% of your software code assets without regular licensing fees.",
      "Deploy custom brand layouts and specific functional steps easily.",
      "Scale operations confidently knowing base files are designed for load."
    ],
    industries: ["Corporate firms", "Fintech platforms", "Global logistics operators", "Government offices"],
    workflow: [
      "Analyze business requirements, target users, and security limits.",
      "Draft platform schematics, wireframe layouts, and data paths.",
      "Implement actual codebase blocks with regular review updates.",
      "Conduct stress tests and deliver clean operational software."
    ],
    faqs: [
      { q: "Do we receive complete sovereignty over the codebase?", a: "Yes. Post production handover, full rights and master files transfer to your organization." }
    ]
  },
  "saas-dev": {
    id: "saas-dev",
    name: "Eurosia SaaS Framework",
    tagline: "Build subscription apps with multi-tenant databases and billing.",
    category: "Custom Solutions",
    iconName: "Monitor",
    description: "Launch subscription software systems easily. Includes multi-tenant databases, compliant user billing integrations, security checks, and client managers.",
    heroTitle: "Multi-Tenant SaaS Engineering Platform",
    overview: "Bring your software ideas to market fast. Eurosia SaaS Framework provides a stable, pre-built structure for handling user signups, subscriptions, and security.",
    features: [
      "Secure multi-tenant database isolation preventing cross-account access.",
      "Flexible user billing packages with support for coupons and renewals.",
      "Central management dashboard tracking active users, signup rates, and churn.",
      "Complete user settings panels where clients can update profiles and cards."
    ],
    benefits: [
      "Accelerate product launch speeds by up to 60%.",
      "Avoid database security risks with insulated tenant schemas.",
      "Scale user subscription volumes seamlessly as marketing expands."
    ],
    industries: ["Software entrepreneurs", "SaaS startups", "Corporate innovation labs"],
    workflow: [
      "Review SaaS business concepts, user groups, and target systems.",
      "Configure multi-tenant data rules and security layers.",
      "Design user boarding forms and payment recurring schedules.",
      "Deploy live app networks and review subscriber growth metrics."
    ],
    faqs: [
      { q: "Can we configure different tenant roles?", a: "Yes, SaaS platforms feature settings to add admin, manager, or standard viewer roles within accounts." }
    ]
  },
  "mobile-dev": {
    id: "mobile-dev",
    name: "Eurosia Mobile Native",
    tagline: "Responsive iOS & Android applications with offline database sync.",
    category: "Custom Solutions",
    iconName: "Laptop",
    description: "High-performance mobile apps. We build fast iOS and Android apps with secure geofencing trackers and full offline local database synchronization.",
    heroTitle: "Sovereign Cross-Platform Mobile Engineering",
    overview: "Deploy beautiful mobile software with instant touch speeds. Includes secure storage caches that sync automatically with central cloud databases.",
    features: [
      "Cross-platform code structures that run fast on both iOS and Android.",
      "Offline local data engines ensuring continuous operations on-the-go.",
      "Integrated phone alerts, biometric login support, and location tools.",
      "Smooth layout transitions styled with custom brand visual identity."
    ],
    benefits: [
      "Maintain a single code base for both mobile platforms, reducing costs.",
      "Boost user interactions with custom phone alerts and shortcuts.",
      "Support field technicians with reliable offline data saving."
    ],
    industries: ["On-the-go delivery fleets", "Retail shoppers", "Corporate directors"],
    workflow: [
      "Define mobile user actions, screen maps, and backend connections.",
      "Implement adaptive touch interfaces matching brand colors.",
      "Build offline data reconciling logic on secure test environments.",
      "Publish apps to App Store and Google Play platforms elegantly."
    ],
    faqs: [
      { q: "Is physical device biometrics (FaceID/TouchID) supported?", a: "Yes. Core logins can connect to device hardware authentication modules for fast logins." }
    ]
  },
  "enterprise-platform": {
    id: "enterprise-platform",
    name: "Eurosia Enterprise OS",
    tagline: "Consolidate corporate software under a secure, single-sign-on hub.",
    category: "Custom Solutions",
    iconName: "ShieldCheck",
    description: "A secure workspace for core company files. Connect separate corporate software systems under a single login, audit activities, and manage user licenses easily.",
    heroTitle: "Sovereign Enterprise Single-Sign-On Platform",
    overview: "Bring security and control to company applications. Protect critical directories and files with a premium, consolidated enterprise system.",
    features: [
      "Single-Sign-On (SSO) login systems with support for corporate emails.",
      "Centralized user panel matching active permissions and directories.",
      "In-depth security monitors documenting all database edits and sign-ins.",
      "Automated corporate laptop check profiles and safety reviews."
    ],
    benefits: [
      "Lower company security risks with a single, verified entry point.",
      "Simplify employee onboarding and seat license allocations.",
      "Ensure compliant operational activity trails for corporate audits."
    ],
    industries: ["Hospitals", "Financial institutions", "Goverment groups", "Retail groups"],
    workflow: [
      "Identify corporate directories, logins, and target cloud setups.",
      "Establish master role conditions and multi-factor security rules.",
      "Link separate corporate modules with the single-sign-on core.",
      "Run security performance test audits on enterprise environments."
    ],
    faqs: [
      { q: "Can we block platform entry from unspecified countries?", a: "Yes, our IP geofencing blocks entry from networks that fall outside approved locations." }
    ]
  },
  "api-integration": {
    id: "api-integration",
    name: "Eurosia API Gateway",
    tagline: "Build robust data bridges, reconcile formats, and monitor traffic.",
    category: "Custom Solutions",
    iconName: "Database",
    description: "Connect separate databases without manual entry. Automate multi-format calculations, build custom data gateways, and monitor system traffic safely.",
    heroTitle: "High-Performance REST/GraphQL API Gateway",
    overview: "Accelerate software integrations. Connect legacy database structures with web dashboards to automate reporting routes easily.",
    features: [
      "Developer-friendly API endpoints with structured documentation templates.",
      "Real-time JSON/XML data mapper converting data shapes seamlessly.",
      "Robust retry loops managing failed transactions during network drops.",
      "Traffic throttling shields defending database nodes from overloading."
    ],
    benefits: [
      "Eliminate manual file export-import workflows across teams.",
      "Bridge old desktop software with modern online web screens.",
      "Monitor data transmission speeds with precise dashboard charts."
    ],
    industries: ["Fintech circles", "Wholesalers stock depots", "Utility providers", "Group offices"],
    workflow: [
      "Review target software systems, database formats, and endpoints.",
      "Design custom data conversion paths and credential rules.",
      "Test endpoint sync speeds using secure dummy data blocks.",
      "Launch live transactions routes and enable automatic alert systems."
    ],
    faqs: [
      { q: "Does the API handle thousands of requests per second?", a: "Yes. Gateway nodes are configured with cluster servers that scale load automatically." }
    ]
  },
  "project-management": {
    id: "project-management",
    name: "Eurosia Project Planner",
    tagline: "High-integrity project timelines, Gantt nodes, and automated task tracking.",
    category: "Business Solutions",
    iconName: "Workflow",
    description: "Coordinate large enterprise initiatives with zero friction. Tracks task pipelines, team bandwidth distributions, milestones, and integrates directly with billing systems.",
    heroTitle: "Enterprise Project Management Suite",
    overview: "Eurosia Project Planner connects operational tasks directly to ledger accounting and inventory tracking, ensuring real-time margin visibility across corporate campaigns.",
    features: [
      "Dynamic interactive Gantt grids mapping project dependent timelines.",
      "Bandwidth monitors tracking team hours and tasks allocation profiles.",
      "Milestone completion alarms auto-sending transaction billing invoices.",
      "Encrypted file attach hubs supporting blueprint documents and contracts."
    ],
    benefits: [
      "Accelerate milestone completion cycles by up to 28%.",
      "Keep internal teams completely in sync regarding deadline milestones.",
      "Eliminate spreadsheet tracking manual key-in errors."
    ],
    industries: ["Commercial contractors", "Consulting circles", "Engineering firms", "Marketing departments"],
    workflow: [
      "Define central project goals, parameters, and team roles.",
      "Establish task timelines, dependents, and target milestones.",
      "Track live progress indicators on integrated team boards.",
      "Calculate performance analytics and deliver completion certifications."
    ],
    faqs: [
      { q: "Is task time-tracking supported?", a: "Yes, team members can log task hours directly inside their dashboard timelines." }
    ]
  },
  "patient-portal": {
    id: "patient-portal",
    name: "Eurosia Patient Hub",
    tagline: "HIPAA-compliant personal health logs, booking, and lab reports.",
    category: "Healthcare Solutions",
    iconName: "HeartPulse",
    description: "Give patients a secure, seamless digital door to clinical care. Protect medical history profiles, stream lab results, and enable direct doctor chat tunnels.",
    heroTitle: "Sovereign HIPAA Patient Portal",
    overview: "Eurosia Patient Hub prioritizes security and convenience, providing patients with instant access to prescriptions, appointment bookings, and lab trends.",
    features: [
      "HIPAA-compliant secure storage of clinical records and data.",
      "Prescription refill tracking connected to diagnostic labs.",
      "Direct secure communication pipelines to medical practitioners.",
      "Instant lab reports delivery with trend-line health indicators."
    ],
    benefits: [
      "Improve patient adherence to treatment regimens by 35%.",
      "Reduce administrative phone loads at front desk centers.",
      "Provide secure, immediate health records visibility to families."
    ],
    industries: ["Private medical clinics", "Hospital chains", "Specialist care networks"],
    workflow: [
      "Sync clinical patient IDs with central record networks.",
      "Configure patient portal access parameters and notification logs.",
      "Deploy secure onboarding forms for new patients.",
      "Review user interaction charts inside clinical control desks."
    ],
    faqs: [
      { q: "Is patient data encrypted in transition?", a: "Absolutely. All health records run on AES-256 standard database rules and end-to-end transport encryptions." }
    ]
  },
  "distribution-management": {
    id: "distribution-management",
    name: "Eurosia Distro Core",
    tagline: "Global inventory routing, partner portals, and delivery logs.",
    category: "Retail & Commerce",
    iconName: "ShoppingBag",
    description: "Manage physical merchant supply operations. Automate wholesale order entries, track stock distributions across partners, and optimize route delivery times.",
    heroTitle: "Wholesale Inventory and Distribution Gateway",
    overview: "Eurosia Distro Core automates supply pathways, connects warehouses to partner merchants, and logs incoming delivery reports.",
    features: [
      "Partner order portal with flexible tiered wholesale pricing indexes.",
      "Real-time stock reservation engines avoiding partner delivery delays.",
      "Consolidated delivery schedules mapping vehicle route capacities.",
      "Automated digital return registers tracking damaged assets logs."
    ],
    benefits: [
      "Shorten delivery fulfillment cycles by up to 34%.",
      "Keep absolute inventory counts correct across merchant nodes.",
      "Lower distributor overhead costs through route scheduling."
    ],
    industries: ["Wholesale merchants", "FMCG manufacturers", "Logistics hubs"],
    workflow: [
      "Onboard partner merchants, contracts, and delivery details.",
      "Map central warehouse inventories and wholesale price tiers.",
      "Generate daily delivery manifest rosters for driver fleets.",
      "Register partner receipt signatures inside cargo control systems."
    ],
    faqs: [
      { q: "Can we manage multi-country currency distributions?", a: "Yes, global modules calculate localized currencies and international tax ratios automatically." }
    ]
  },
  "expense-tracking": {
    id: "expense-tracking",
    name: "Eurosia Expense Tracker",
    tagline: "Corporate card logging, OCR receipt verification, and review flows.",
    category: "Finance & Accounting",
    iconName: "Coins",
    description: "Track team spend budgets with ease. Reads paper receipts using OCR scans, applies company expense audits, and initiates quick staff payout cycles.",
    heroTitle: "Autonomous Enterprise Expense Accounting",
    overview: "Keep track of business travel and operating spend. Integrates paper receipt scanning with corporate bank ledgers to prevent unauthorized expenses.",
    features: [
      "OCR receipt scanner extracting text, amount, and tax indicators.",
      "Integrated corporate card feeds monitoring spend limits.",
      "Multi-stage manager review paths matching department scopes.",
      "Direct payout synchronization with central ledger accounting."
    ],
    benefits: [
      "Save hundreds of team hours on expense claim reporting.",
      "Cut down double-billing and unauthorized spend profiles by 98%.",
      "Expedite business expense payout cycles to 24 hours."
    ],
    industries: ["Group companies", "Consulting organizations", "Logistics businesses"],
    workflow: [
      "Define standard company expense policies and limit thresholds.",
      "Connect team department budgets and manager approval layers.",
      "Provide employee mobile receipt scanning upload screens.",
      "Authorize payout bundles and reconcile with double-entry legers."
    ],
    faqs: [
      { q: "Does the system detect duplicate receipt uploads?", a: "Yes, our audit models flag receipt double-logs by comparing dates, amounts, and vendor names." }
    ]
  },
  "property-management": {
    id: "property-management",
    name: "Eurosia Property Core",
    tagline: "Commercial lease structures, maintenance logs, and rent ledgers.",
    category: "Real Estate & Property",
    iconName: "HomeIcon",
    description: "Streamline real estate portfolio management. Automate lease renewal schedules, log room maintenance tasks, and track monthly rent billing cycles.",
    heroTitle: "Commercial and Residential Property OS",
    overview: "Eurosia Property Core maps real estate physical units, registers tenant agreements, and manages capital billing schedules effortlessly.",
    features: [
      "Digital unit inventory with interactive floor map layout structures.",
      "Automated tenant rent invoice cycles with credit card gateways.",
      "Tenant maintenance task registers assigning issues to builders.",
      "Commercial lease calculators handling complex escalation parameters."
    ],
    benefits: [
      "Maintain 100% on-time rent receipt logs with auto-reminders.",
      "Reduce property maintenance delay times by up to 40%.",
      "Simplify real estate occupancy auditing through unified ledgers."
    ],
    industries: ["Property managers", "Real estate developers", "Asset holdings trusts"],
    workflow: [
      "Upload physical property listings, layouts, and occupancy models.",
      "Onboard active tenant agreements and rent schedule rules.",
      "Integrate banking credit gates and automatic email notices.",
      "Deploy contractor maintenance dashboards for physical repairs."
    ],
    faqs: [
      { q: "Is landlord payout split supported?", a: "Yes, you can configure automatic splits to distribute rent collections across several owners." }
    ]
  },
  "rental-management": {
    id: "rental-management",
    name: "Eurosia Rental Flow",
    tagline: "Car lease tracking, device rentals, and deposit collection.",
    category: "Real Estate & Property",
    iconName: "HomeIcon",
    description: "Manage transient equipment or vehicle rentals. Handles time-based usage contracts, deposit reserves, security verification, and return checklists.",
    heroTitle: "Dynamic Equipment and Vehicle Rental Suite",
    overview: "Eurosia Rental Flow is designed to prevent equipment layout loss, automate deposit collections, and tracks check-in schedules seamlessly.",
    features: [
      "Dynamic hourly/daily asset rental pricing calculators.",
      "Integrated credit card deposit holds and post-rental releases.",
      "QR-enabled physical device check-out and check-in scanners.",
      "Active maintenance logs tracking equipment inspection calendars."
    ],
    benefits: [
      "Avert equipment inventory losses using secure deposit holds.",
      "Accelerate checking queues using custom terminal scanner tools.",
      "Enhance fleet health through scheduled inspection routines."
    ],
    industries: ["Car rental networks", "Industrial tool suppliers", "Event gear companies"],
    workflow: [
      "Onboard rental fleet listings, licenses, and checklist requirements.",
      "Establish active deposit thresholds and rental price indices.",
      "Deploy customer-facing reservation and payment checkout forms.",
      "Process barcode return checks on warehouse terminals."
    ],
    faqs: [
      { q: "Can we bill customers based on distance travelled?", a: "Yes, odometer data can be entered to auto-calculate mileage surcharges upon check-in." }
    ]
  },
  "property-marketplace": {
    id: "property-marketplace",
    name: "Eurosia Estates Hub",
    tagline: "Interactive map listings, virtual tour widgets, and lead routing.",
    category: "Real Estate & Property",
    iconName: "HomeIcon",
    description: "Build an elegant, high-converting real estate marketplace. Integrates maps, supports media tours, and routes buyer leads to local sales brokers.",
    heroTitle: "Premium Global Real Estate Marketplace Core",
    overview: "Eurosia Estates Hub helps real estate developers and agencies launch consumer property portals mapping lists of available units.",
    features: [
      "Vector-based physical property location pins on custom map maps.",
      "Embedded 3D media and virtual walkthrough players.",
      "Lead routing algorithms assigning buyers to region brokers.",
      "Mortgage amortization calculators and cost estimator grids."
    ],
    benefits: [
      "Boost properties buyer engagement rates by more than 48%.",
      "Route critical leads to broker cell phones within 60 seconds.",
      "Manage public listing attributes across standard browsers."
    ],
    industries: ["Real estate developers", "Multi-broker agencies", "Property portal startups"],
    workflow: [
      "Configure map parameters and upload brand styles assets.",
      "Onboard agency listing agents, brokers, and access keys.",
      "Synchronize inventory databases to list properties.",
      "Activate lead capture pipelines and monitor conversion grids."
    ],
    faqs: [
      { q: "Are individual broker profiles supported?", a: "Yes, every listing maps to a dedicated broker card featuring click-to-dial tools." }
    ]
  },
  "resort-management": {
    id: "resort-management",
    name: "Eurosia Resort Master",
    tagline: "All-inclusive package booking, activity logs, and terminal POS.",
    category: "Hospitality",
    iconName: "Hotel",
    description: "Launch next-level resort operations. Manage guest villas, pool activities, premium packages billing, and restaurant tabs under unified guest profiles.",
    heroTitle: "Unified Resort Operations Software",
    overview: "Eurosia Resort Master handles complex all-inclusive guest packages, activities scheduling, wellness logs, and restaurant ledger charges.",
    features: [
      "Unified guest profile syncing room key card codes and tabs.",
      "All-inclusive hospitality package billing checks engines.",
      "Activity and spa center reservation calendars.",
      "Multi-terminal food and beverage POS integration systems."
    ],
    benefits: [
      "Eradicate guest profile billing errors across multiple venues.",
      "Enhance resort operations planning with reservation charts.",
      "Provide guests with seamless, key-card payment trails."
    ],
    industries: ["Luxury beach resorts", "Spa wellness retreats", "All-inclusive mountain lodges"],
    workflow: [
      "Configure resort physical layouts, rooms, and recreation locations.",
      "Define seasonal pricing indexes and hospitality package rules.",
      "Onboard multi-point restaurant terminals onto secure networks.",
      "Monitor check-in guest ledgers and activity sheets."
    ],
    faqs: [
      { q: "Can we set multi-room guest accounts?", a: "Yes, family guest accounts allow consolidating bills across several room keys." }
    ]
  },
  "booking-platform": {
    id: "booking-platform",
    name: "Eurosia Bookify",
    tagline: "Dynamic room occupancy rosters, card deposits, and email notices.",
    category: "Hospitality",
    iconName: "Hotel",
    description: "Direct-to-consumer travel reservation core. Connects to global distribution networks, handles credit card deposits, and sends automatic booking details.",
    heroTitle: "High-Availability Room and Travel Booking Core",
    overview: "Eurosia Bookify enables hotels to bypass expensive listing fees, driving direct bookings with dynamic rate structures and instant deposits.",
    features: [
      "Dynamic rate manager applying price rule sets for holidays.",
      "Integrated secure booking forms with Stripe payment tokens.",
      "Direct channel manager syncing data with booking engines.",
      "Automatic HTML booking confirmation email generators."
    ],
    benefits: [
      "Save up to 15% on OTA platform listing fees.",
      "Minimize booking conflicts with instant channel syncing.",
      "Boost checkout conversions with single-page booking routes."
    ],
    industries: ["Boutique hotels", "Bed & breakfast inns", "Vacation rentals chains"],
    workflow: [
      "Define hotel room categories, capacities, and base rates.",
      "Connect credit-card processing keys and security thresholds.",
      "Deploy reservation form widgets onto brand web headers.",
      "Automate booking confirmations and review occupancy maps."
    ],
    faqs: [
      { q: "Is custom cancellation timing support included?", a: "Yes, cancellation windows map refund parameters straight to credit card portals." }
    ]
  },
  "factory-automation": {
    id: "factory-automation",
    name: "Eurosia Factory Stream",
    tagline: "PLC hardware integrations, sensor monitoring, and telemetry logs.",
    category: "Industrial Solutions",
    iconName: "Factory",
    description: "Connect factory machines securely to web clouds. Monitors conveyor belt speed sensors, logs temperature gauges, and alerts on anomalies.",
    heroTitle: "Industrial IoT and PLC Integration Platform",
    overview: "Eurosia Factory Stream hooks into standard industrial hardware protocols, creating real-time alert systems for factory maintenance teams.",
    features: [
      "Industrial PLC gateway integrations (Modbus, OPC-UA, MQTT).",
      "Real-time sensor charts displaying pressure and heat telemetry.",
      "Anomalous machine event warnings sending SMS notifications to operators.",
      "Historic telemetry charts analyzing device stress index changes."
    ],
    benefits: [
      "Avert expensive factory line stoppages using early sensor alerts.",
      "Centralize equipment operation statistics into manager web screens.",
      "Enhance safety audits with continuous telemetry logs."
    ],
    industries: ["Machinery factories", "Automobile assembly centers", "Chemical processing sites"],
    workflow: [
      "Configure factory network gateways and security credentials.",
      "Map physical machine serial codes and sensor parameters.",
      "Establish safe temperature/pressure telemetry limit scopes.",
      "Monitor plant operations on centralized live status screens."
    ],
    faqs: [
      { q: "Will the telemetry client run offline?", a: "Local gateway edge buffers store telemetry logs during server drops and sync when back online." }
    ]
  },
  "production-tracking": {
    id: "production-tracking",
    name: "Eurosia Output Track",
    tagline: "Batch run logs, raw materials allocation, and cycle metrics.",
    category: "Industrial Solutions",
    iconName: "Factory",
    description: "Manage physical batch production schedules. Tracks raw material consumption ratios, output volumes, and calculates operating efficiency factors.",
    heroTitle: "Discrete and Batch Production Tracking OS",
    overview: "Eurosia Output Track balances material usages against physical item outputs, giving operations managers real-time cost-of-goods totals.",
    features: [
      "Material Bill of Materials calculators checking inventory reserves.",
      "Batch run registers tracking processing cycles and operators.",
      "Overall Equipment Effectiveness charts logging machine performance.",
      "Physical goods scrap logs documenting defects and waste indexes."
    ],
    benefits: [
      "Uncover hidden factory line bottlenecks with accurate cycle reports.",
      "Lower waste expenditures by checking daily product defects logs.",
      "Sync final batch volumes with central ERP inventory nodes."
    ],
    industries: ["Electronics manufacturers", "Food and beverage firms", "Metal fabrication suppliers"],
    workflow: [
      "Configure Bill of Material specifications for all finished goods.",
      "Design daily assembly routing lines and stage workstations.",
      "Log materials consumption and assembly run cycle times.",
      "Inspect batch outputs and approve cargo transport releases."
    ],
    faqs: [
      { q: "Is barcode component tracking supported?", a: "Yes, you can register raw unit barcode details at every step of the assembly timeline." }
    ]
  },
  "quality-management": {
    id: "quality-management",
    name: "Eurosia Quality Core",
    tagline: "Product inspection boards, compliance logs, and ISO logs.",
    category: "Industrial Solutions",
    iconName: "Factory",
    description: "Ensure gold-standard product compliance. Tracks QA testing criteria, compiles ISO compliance checklists, audit reports, and manages recall pipelines.",
    heroTitle: "Enterprise Industrial Quality Assurance Hub",
    overview: "Eurosia Quality Core implements strict check gates across assembly lines, ensuring consistent physical product dimensions and certifications log.",
    features: [
      "Custom testing checklists matching ISO and local safety guidelines.",
      "Statistical Process Control charts monitoring dimension offsets.",
      "Non-compliance corrective action workflows routing tasks to managers.",
      "Comprehensive product batch certification generation tools."
    ],
    benefits: [
      "Reduce customer product returns due to quality defects by 75%.",
      "Achieve certified compliance with ISO-9001 guidelines.",
      "Accelerate batch audit preparation times using unified records."
    ],
    industries: ["Medical device firms", "Aviation item makers", "FMCG packers"],
    workflow: [
      "Establish strict testing benchmarks, ISO guidelines, and metrics.",
      "Deploy inspection checklists onto tablet screens at check gates.",
      "Flag non-compliance items and route units to repair queues.",
      "Compile batch quality certificates and authorize distribution."
    ],
    faqs: [
      { q: "Can we attach physical photo proofs of product defects?", a: "Yes, inspectors can link phone camera photos directly to QC fail logs." }
    ]
  },
  "smart-analytics": {
    id: "smart-analytics",
    name: "Eurosia Intel Core",
    tagline: "Predictive data charts, market trend models, and report builders.",
    category: "AI & Automation",
    iconName: "Bot",
    description: "Turn raw database logs into clear business strategies. Employs advanced prediction parameters to outline sales volumes, customer changes, and warehouse needs.",
    heroTitle: "Cognitive Enterprise Intel Analytics Core",
    overview: "Eurosia Intel Core scans ERP and POS trans files, building regression and prediction charts to guide executive growth directions.",
    features: [
      "Predictive sales forecast graphs tracking regional metrics.",
      "User churn predictors flagging inactive partner accounts.",
      "Dynamic multi-source data boards integrating Excel and SQL tables.",
      "Narrative AI summaries explaining financial data movements."
    ],
    benefits: [
      "Lower inventory storage costs by aligning stock with demand forecasts.",
      "Increase retail customer retention with dynamic churn flags.",
      "Generate clear, readable business performance reports instantly."
    ],
    industries: ["Group companies", "Digital marketing teams", "Retail brand coordinators"],
    workflow: [
      "Connect ERP/POS transaction feeds into intelligence clusters.",
      "Review historical tables data trends and configure analytics parameters.",
      "Generate automated weekly operations overview briefs.",
      "Integrate intelligence charts onto dashboard manager views."
    ],
    faqs: [
      { q: "Are standard SQL databases (Postgres, SQL Server) supported?", a: "Yes, connectors pull secure logs directly from relational warehouses." }
    ]
  }
};
