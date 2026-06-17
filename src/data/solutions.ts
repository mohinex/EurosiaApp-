import { 
  Building2, Bot, PhoneCall, DollarSign, Shield, Globe, 
  Activity, Mic, MessageSquareText, ShieldCheck, Cpu,
  Mail, Monitor, Sparkles, Laptop, GraduationCap, Truck,
  Factory, Home as HomeIcon, ShoppingBag, Terminal, HeartPulse,
  Coins, Database, Layers, Workflow, Users, Hotel
} from 'lucide-react';

export interface Solution {
  id: string;
  slug: string;
  title: string;
  category: string; // "business" | "healthcare" | "education" | "retail" | "finance" | "logistics" | "realestate" | "hospitality" | "industrial" | "ai" | "digital"
  description: string;
  icon: string;
  seoTitle: string;
  seoDescription: string;
  featured: boolean;
  
  // Custom extra details for SolutionDetailPage to make them rich
  tagline: string;
  heroTitle: string;
  overview: string;
  features: string[];
  benefits: string[];
  industries: string[];
  workflow: string[];
  faqs: { q: string; a: string }[];
}

export interface SolutionCategoryConfig {
  id: string;
  name: string;
  description: string;
  iconName: string;
}

export const CATEGORIES_METADATA: SolutionCategoryConfig[] = [
  { id: "business", name: "Business Solutions", description: "Enterprise operating systems for modern heavy operations", iconName: "Building2" },
  { id: "healthcare", name: "Healthcare Solutions", description: "Secure medical portals, clinic management & telemedicine charts", iconName: "HeartPulse" },
  { id: "retail", name: "Retail & Commerce", description: "Omnichannel inventory engines, marketplaces & multi-vendor solutions", iconName: "ShoppingBag" },
  { id: "education", name: "Education Solutions", description: "Next-gen portals, campus ERPs & digital examination servers", iconName: "GraduationCap" },
  { id: "finance", name: "Finance & Accounting", description: "PCI-DSS billing systems, ledger accounting & automated compliance reports", iconName: "Coins" },
  { id: "logistics", name: "Logistics & Transport", description: "Real-time fleet grids, supply chain tracking & route processors", iconName: "Truck" },
  { id: "realestate", name: "Real Estate & Property", description: "Comprehensive property managers, real estate CRMs & listings hubs", iconName: "HomeIcon" },
  { id: "hospitality", name: "Hospitality Solutions", description: "Multi-hotel booking channels, resorts, and POS restaurant centers", iconName: "Hotel" },
  { id: "industrial", name: "Industrial Solutions", description: "Raw manufacturing databases, factory flow automations & item checks", iconName: "Factory" },
  { id: "ai", name: "AI & Automation", description: "Sovereign cognitive nodes, invoice builders & smart data analytics", iconName: "Bot" },
  { id: "digital", name: "Digital Services", description: "Dedicated production codebases, cross-platform apps & API channels", iconName: "Terminal" }
];

export const ALL_SOLUTIONS_LIST: Solution[] = [
  // ━━━━━━━━━━━━━━━━ BUSINESS ━━━━━━━━━━━━━━━━
  {
    id: "erp",
    slug: "erp",
    title: "ERP Solution",
    category: "business",
    description: "Sovereign Enterprise Resource Planning integrating multi-branch ledgers, VAT compliance, and real-time operational flows.",
    icon: "Building2",
    seoTitle: "Enterprise Resource Planning ERP Solution | Eurosia App Ecosystem",
    seoDescription: "Synchronize corporate divisions, supplies, ledgers, and assets in a zero-latency operational control cabin.",
    featured: true,
    tagline: "Resilient business operations with real-time multi-branch ledger synchronization.",
    heroTitle: "Sovereign Enterprise Resource Planning",
    overview: "Eurosia ERP integrates dual-ledger micro-accounts, automatic tax auditing, supply-chain monitoring, and asset schedules into a secure, low-latency workspace.",
    features: [
      "Decentralized active-active branch replication with safety conflict bypass",
      "Dynamic supply chain accounting logging procurement directly to depots",
      "Real-time regulatory tax formatting complying with global jurisdictions"
    ],
    benefits: [
      "Completely eliminate data-sync overhead gaps",
      "Cut inventory leakages by 42% through automated tracking",
      "Audit preparation reduced from weeks to single-click downloads"
    ],
    industries: ["Heavy manufacturing conglomerates", "Supply chain channels", "Integrated retail chains"],
    workflow: [
      "Process Audit: Map system databases, regional divisions, and constraints.",
      "Clustering: Provision isolated secure servers with local replication.",
      "Tailoring: Map custom local currency factors, local billing taxes and staff privileges."
    ],
    faqs: [
      { q: "Is offline operation supported?", a: "Yes. Actions are stored locally in secure offline buffers and dynamically reconciled upon connection." }
    ]
  },
  {
    id: "pos",
    slug: "pos",
    title: "POS Solution",
    category: "business",
    description: "High-volume retail checkout point-of-sale featuring ultra-fast touchscreen responses and offline-first queue syncing.",
    icon: "ShoppingBag",
    seoTitle: "High-Traffic POS Terminal Checkout System | Eurosia",
    seoDescription: "Keep customer checkouts active even during network outages with Eurosia's offline-first POS terminals.",
    featured: false,
    tagline: "Snappy, reliable cash terminal nodes designed for high-density outlets.",
    heroTitle: "Enterprise POS Checkout Network",
    overview: "Run checkout counters without interruption. Features background checkout queues, physical scanner triggers, and split payment options.",
    features: [
      "Sub-50ms barcode matching from local cache stores",
      "Biometric and dual-step login security for operators",
      "Direct WebSocket drawer and thermal printer integrations"
    ],
    benefits: [
      "Zero customer queue delays during major ISP outages",
      "Mitigate drawer fraud via cryptographic cashier change logs",
      "Dynamic loyalty program updates synchronized instantly with server databases"
    ],
    industries: ["Supermarkets", "Specialty book boutiques", "Electronics retail", "Fast catering"],
    workflow: [
      "Hardware Sync: Configure scales, hand scanners, and local receipt layouts.",
      "Pricebook Download: Cache overall SKU registry directly inside device storage.",
      "Live Deployment: Go-live with automated secure cashier shifts tracking."
    ],
    faqs: [
      { q: "Can we use this on generic tablets?", a: "Yes, Eurosia POS works perfectly in normal mobile browsers across Android, iPadOS, and Windows." }
    ]
  },
  {
    id: "crm",
    slug: "crm",
    title: "CRM Solution",
    category: "business",
    description: "Optimize customer acquisition with visual lead pipelines, AI conversation helpers, and automated deal follow-up workflows.",
    icon: "Users",
    seoTitle: "Smart Sales Pipeline CRM Solution | Eurosia App Ecosystem",
    seoDescription: "Improve conversion percentages with centralized client logs, predictive pipeline telemetry, and smart actions.",
    featured: false,
    tagline: "Empower sales pipelines, lead capturing channels, and client feedback.",
    heroTitle: "Intelligent Customer Acquisition CRM",
    overview: "Maintain comprehensive pipeline health by tracking every customer ticket, call, and deal status in an encrypted visual workspace.",
    features: [
      "Centralized client history logs detailing emails and contract schedules",
      "Dynamic stage pipelines with interactive drag-and-drop cards",
      "AI email draft helper matching deal status and client sentiment"
    ],
    benefits: [
      "Shorten standard sales conversion cycles by 30%",
      "Prevent potential deal loss through automated notification rules",
      "Improve sales reps follow-up consistency based on metric reports"
    ],
    industries: ["Enterprise B2B suppliers", "Professional consultancies", "SaaS platforms"],
    workflow: [
      "Contacts Import: Safely import lead sheets with custom field definitions.",
      "Pipeline Mapping: Configure sales stages matching division layouts.",
      "Automations: Initialize rules for automated email follow-ups."
    ],
    faqs: [
      { q: "Is lead data protected?", a: "Yes, we feature robust enterprise role-based authorization preventing unauthorized data exports." }
    ]
  },
  {
    id: "hrm",
    slug: "hrm",
    title: "HRM Solution",
    category: "business",
    description: "Secure digital directories managing employee rosters, leave requests, evaluations, and payroll profiles confidently.",
    icon: "Users",
    seoTitle: "Sovereign HRM Personnel Dashboard | Eurosia",
    seoDescription: "Govern shifting work schedules, absence logs, and staff evaluations under a high-security framework.",
    featured: false,
    tagline: "Govern employee schedules, holiday logs, and organizational directories.",
    heroTitle: "Centralized Human Resource Manager",
    overview: "Maintain clean staff alignment. Features self-service team profiles, shifting schedules, and organizational chart mapping tools.",
    features: [
      "Roster builder templates minimizing shift conflict overlapping",
      "Absence tracking flow with direct manager approval triggers",
      "Central personnel folder for encrypted employment documents"
    ],
    benefits: [
      "Save up to 15 hours weekly on redundant rota drafting",
      "Streamlined policy tracking with audit trails",
      "Instant access to employee KPI progress graphs"
    ],
    industries: ["Corporate offices", "Service companies", "FMCG packers"],
    workflow: [
      "Policy Setup: Define standard working hours, holidays, and leave scales.",
      "Staff Import: Load master employee profiles with security clearance tags.",
      "Portal Launch: Distribute self-service logins to team divisions."
    ],
    faqs: [
      { q: "Can employees check hours from home?", a: "Yes, via our responsive self-service portal accessible from any device." }
    ]
  },
  {
    id: "payroll-management",
    slug: "payroll-management",
    title: "Payroll Management",
    category: "business",
    description: "Automated salary processing systems ensuring exact tax filings, customized allowances, and compliant bank transfer logs.",
    icon: "Coins",
    seoTitle: "Automated Global Corporate Payroll Module | Eurosia",
    seoDescription: "Automate salary calculations, regional tax filings, and payslip delivery with total security.",
    featured: false,
    tagline: "Ensure exact salary formulas, automatic tax withholdings, and payslip deliveries.",
    heroTitle: "Compliant Financial Payroll Core",
    overview: "Settle employee wages automatically while computing complex deductions, overtime multipliers, and tax forms dynamically.",
    features: [
      "Direct bank-ready mass payout file generation",
      "Dynamic bonus calculators hookable to individual KPI accomplishments",
      "Automated e-payslip generation to staff email boxes"
    ],
    benefits: [
      "Eliminate spreadsheet formula errors causing payroll drift",
      "Keep calculations updated with local state tax regulations",
      "Redundant checks save finance officer hours on every batch run"
    ],
    industries: ["Contractor groups", "SMEs", "Industrial works", "Holding companies"],
    workflow: [
      "Profile Mapping: Input local tax tier parameters and company allowances.",
      "Attendance Linking: Establish feeds from shifting and roster logs.",
      "Processing: Compile drift reports, review batches, and generate bank files."
    ],
    faqs: [
      { q: "Does this support multi-currency targets?", a: "Yes. You can configure individual employee payout currencies with real-time conversion logging." }
    ]
  },
  {
    id: "inventory-management",
    slug: "inventory-management",
    title: "Inventory Management",
    category: "business",
    description: "Intelligent SKU tracking across multi-site depots, barcode routing, and automatic low stock procurement formulas.",
    icon: "Database",
    seoTitle: "Smart SKU Stock Depot & Inventory Solutions | Eurosia",
    seoDescription: "Coordinate warehousing space, batch numbers, and stock-counts over a unified logistics registry.",
    featured: false,
    tagline: "Keep complete control over physical materials and shelf structures.",
    heroTitle: "Intelligent SKU Stock Depot Processor",
    overview: "Maintain exact stock alignment. Reduce raw storage bottlenecks by configuring low-stock alarms and predictive purchase demands.",
    features: [
      "High-contrast barcode layout builder with batch expiration logging",
      "Multi-warehouse storage mappings (aisle, shelf, and locker indexes)",
      "Dynamic asset pricing math (FIFO and weighted average methods)"
    ],
    benefits: [
      "Reduce excess stock holding costs by up to 25%",
      "Preempt retail stockouts on active sales components",
      "Accelerate manual invent surveys via handheld scanner utilities"
    ],
    industries: ["Pharma distributors", "Import warehouses", "FMCG packers"],
    workflow: [
      "Database Mapping: Initialize Master SKU definitions and tax brackets.",
      "Depot Audit: Log active stock levels alongside coordinates mapping.",
      "Terminal Launch: Equip floor workers with barcode capturing tools."
    ],
    faqs: [
      { q: "Is unique serial code tracking active?", a: "Yes. Perfect for tracking unique consumer electronics, cellphones, or vehicles." }
    ]
  },
  {
    id: "procurement-management",
    slug: "procurement-management",
    title: "Procurement Management",
    category: "business",
    description: "Digitize company acquisition logs, control bid reviews, generate POs, and verify inbound bills transparently.",
    icon: "Layers",
    seoTitle: "Supplier Direct Billing & Procurement System | Eurosia",
    seoDescription: "Establish strict corporate spending hygiene through automated purchase workflows.",
    featured: false,
    tagline: "Manage supplier catalogs, bid matrices, and ledger reconciliations.",
    heroTitle: "Automated Corporate Procurement System",
    overview: "Prevent department budget overruns by creating multi-stage approvals, logging vendor performance records, and matching bills to physical deliveries.",
    features: [
      "Request-to-PO conversion workflow with clearance authorization gates",
      "Detailed vendor rating reports tracking past delays and item quality",
      "Automatic ledger records matching incoming shipping logs to purchase bills"
    ],
    benefits: [
      "Secure corporate pricing discounts on bulk supply requests",
      "Prevent duplicate orders through real-time sync across branches",
      "Full audit logs protecting company accounts against payment anomalies"
    ],
    industries: ["Construction holding teams", "Educational compounds", "Healthcare centers"],
    workflow: [
      "Authorization Design: Set budget limits by department and staff level.",
      "Vendor Sync: Onboard verified suppliers and import fixed price catalogues.",
      "Launch: Enable digital purchase requisition panels across system terminals."
    ],
    faqs: [
      { q: "Does it support physical delivery receipts verification?", a: "Yes, items from warehouse receiving desks match purchase plans directly." }
    ]
  },
  {
    id: "project-management",
    slug: "project-management",
    title: "Project Management",
    category: "business",
    description: "Coordinate team goals via dynamic Gantt charts, interactive Kanban lists, timesheet logging, and task timelines.",
    icon: "Workflow",
    seoTitle: "Agile Project Gantt & Team Tasks Solutions | Eurosia",
    seoDescription: "Synchronize company divisions and milestones through clean digital operations workspace.",
    featured: false,
    tagline: "Synchronize corporate schedules, milestones, and client communications.",
    heroTitle: "Enterprise Project Operational Suite",
    overview: "Unify business objectives. Give teams collaborative dashboards tracking active project progress alongside client milestones securely.",
    features: [
      "Dynamic Gantt diagrams with milestone linkage capabilities",
      "Simple timesheets tracking exact billable hours on task items",
      "Restricted portal access views designed for client progression sync"
    ],
    benefits: [
      "Accelerate speed-to-delivery on complex B2B contracts",
      "Cut weekly project tracking meetings with status panels",
      "Track division profitability based on precise timeline metrics"
    ],
    industries: ["Software houses", "Design bureaus", "Architecture agencies"],
    workflow: [
      "Workspace Creation: Outline master projects and construct timeline stages.",
      "Team Assignment: Invite division participants with custom access clearance.",
      "Tracking: Review live dashboards reporting milestones weekly."
    ],
    faqs: [
      { q: "Can we restrict internal notes from external clients?", a: "Yes. Secure privacy settings keep private internal channels fully hidden." }
    ]
  },

  // ━━━━━━━━━━━━━━━━ HEALTHCARE ━━━━━━━━━━━━━━━━
  {
    id: "hospital-management",
    slug: "hospital-management",
    title: "Hospital Management",
    category: "healthcare",
    description: "Secure, HIPAA-compliant suite for hospital systems. Governs bed allocations, EHR records, surgical rosters, and lab pipelines.",
    icon: "HeartPulse",
    seoTitle: "Secure IPD Hospital Ward & EHR Solutions | Eurosia",
    seoDescription: " HIPAA-compliant hospital operations system tracking patient folders, ward logs, and clinical schedules.",
    featured: true,
    tagline: "Streamline patient check-ins, ward availability, and doctor diaries securely.",
    heroTitle: "Sovereign Hospital Core Suite",
    overview: "Provide top-tier patient care. Link patient admission counters, central medication structures, nurse schedules, and diagnostic results in an encrypted cluster.",
    features: [
      "HIPAA-compliant patient profiles with immutable action logging",
      "Interactive hospital floor map tracking ward bed availabilities",
      "Pharmacy supply link verifying prescriptions to patient medication charts"
    ],
    benefits: [
      "Minimize admission check-in delays at triage desks",
      "Reduce clinical ledger discrepancies across health networks",
      "Strict data protection isolates patient records from public networks"
    ],
    industries: ["Major health systems", "State medical depots", "Specialized surgical centers"],
    workflow: [
      "HIPAA setup: Deploy local encryption profiles and launch cloud instances.",
      "Data Sync: Integrate previous patient histories securely.",
      "Staff Training: Onboard ward nurses, clinical assistants, and diagnostic cashiers."
    ],
    faqs: [
      { q: "Are emergency records accessible offline?", a: "Yes, local workstation caches keep crucial patient vitals available during ISP drops." }
    ]
  },
  {
    id: "clinic-management",
    slug: "clinic-management",
    title: "Clinic Management",
    category: "healthcare",
    description: "Responsive outpatient scheduling portal detailing doctor charts, immunization schedules, payment processing, and SMS booking tracers.",
    icon: "Activity",
    seoTitle: "Outpatient Clinic EHR & Scheduling Systems | Eurosia",
    seoDescription: "Improve clinical service capacity with fast check-in schedules, drug prescriptions, and payment terminals.",
    featured: false,
    tagline: "Organize patient registers, immunization logs, and physician rosters.",
    heroTitle: "Intuitive Clinic Operations Hub",
    overview: "Elevate private practice capacity. Standardize clinical files, track past consultations, and deliver automatic prescription cards.",
    features: [
      "Dynamic booking calendar sending automated WhatsApp reminder logs",
      "Digital script editor with drug selection dropdown lists",
      "Secure outpatient database logging past diagnostic summaries"
    ],
    benefits: [
      "Reduce appointment booking gaps by up to 45%",
      "Eliminate manual prescription errors using templated checklists",
      "Consolidate private family patient rosters in one space"
    ],
    industries: ["Dentists", "Physiotherapy clinics", "Pediatric groups"],
    workflow: [
      "Roster setup: Input doctor hours, consult fees, and room designations.",
      "Prescription presets: Load common drug lists and diagnostic procedures.",
      "Desk integration: Initialize billing desk controls for local cashier terminals."
    ],
    faqs: [
      { q: "Can we print direct prescription handouts?", a: "Yes. System formats print layouts neatly onto standard medical papers." }
    ]
  },
  {
    id: "pharmacy-management",
    slug: "pharmacy-management",
    title: "Pharmacy Management",
    category: "healthcare",
    description: "Analyze generic compound formulas, track drug lot expiry dates, manage chemical rosters, and process POS checkouts.",
    icon: "Layers",
    seoTitle: "Smart Drug Expiry & Pharmacy Inventory System | Eurosia",
    seoDescription: "Maximize pharmacy margins by tracking batch numbers, chemical generic naming options, and critical stocks.",
    featured: false,
    tagline: "Track batch life-cycles, chemical indexes, and generic substitutes.",
    heroTitle: "Smart Pharmacy Lot Control Core",
    overview: "Maintain clean lot histories. Prevent drug expiration losses by configuring warning codes on shelves and bulk-buying demands.",
    features: [
      "Lot tracking charts featuring automated color-coded expiry warnings",
      "Generic alternative lookup suggesting compound matches to cashiers",
      "Prescription verification checks uploading and encrypting medical slips"
    ],
    benefits: [
      "Reduce medicine waste due to expiry by up to 30%",
      "Strict compliance auditing prevents unauthorized narcotic distribution",
      "Fast database searches index items by brand, chemistry, or barcode"
    ],
    industries: ["Institutional hospital pharmacies", "Retail pharmacy networks", "Pholesale drug importers"],
    workflow: [
      "Onboarding: Load official generic formulas lists and local pricing logs.",
      "Mapping: Log batch codes, physical racks numbering, and shelf limits.",
      "Live: Launch terminal checkouts hookable to handheld barcode scanners."
    ],
    faqs: [
      { q: "Does it alert on controlled drugs?", a: "Yes. Dispensing controlled drugs triggers mandatory passcode overrides." }
    ]
  },
  {
    id: "diagnostic-center",
    slug: "diagnostic-center",
    title: "Diagnostic Center",
    category: "healthcare",
    description: "Lab information management system linking sample barcodes to analyzers, documenting parameters, and issuing PDF results securely.",
    icon: "Activity",
    seoTitle: "Lab Information Systems & Diagnostic ERP | Eurosia",
    seoDescription: "Synchronize sample tracking, laboratory logs, analyzer interfaces, and patient portals.",
    featured: false,
    tagline: "Coordinate lab sample tracking, analysis logs, and result delivery.",
    heroTitle: "Enterprise Lab Diagnostic ERP",
    overview: "Prevent diagnosis mix-ups. Track clinical samples from blood draw rooms through laboratory machine outputs directly to patient portals.",
    features: [
      "Automated barcode sample generation printing label stickers instantly",
      "LIMS analyzer integration logs parameters directly from analyzer ports",
      "Patient report generator outputting encrypted secure digital summaries"
    ],
    benefits: [
      "Bring diagnostic data mismatch rates down to absolute zero",
      "Shorten lab result turnarounds by up to 40%",
      "Physicians access graphs reporting historical diagnostic metrics easily"
    ],
    industries: ["Blood laboratories", "Diagnostic clinics", "MRI & CT imaging centers"],
    workflow: [
      "Setup Catalog: Log available clinical exams, tax rates, and normal values.",
      "Deploy Barcoding: Position label printers next to intake draw bays.",
      "Integrate Equipment: Map digital analyzer outputs to master records."
    ],
    faqs: [
      { q: "Is DICOM viewing supported?", a: "Yes, standard radiology images link securely onto diagnostic cases." }
    ]
  },
  {
    id: "telemedicine-platform",
    slug: "telemedicine-platform",
    title: "Telemedicine Platform",
    category: "healthcare",
    description: "Secure, WebRTC-encrypted video consultation rooms with inline prescription editors, booking logs, and digital payments.",
    icon: "Globe",
    seoTitle: "Encrypted Video Consulting Telemedicine Platform | Eurosia",
    seoDescription: "Host fully secure remote medical appointments featuring instant e-prescriptions and local payments.",
    featured: false,
    tagline: "Deploy secure clinical consulting panels hookable to payment networks.",
    heroTitle: "Sovereign Remote Telemedicine Core",
    overview: "Connect medical consults globally. Patients book appointments, complete video consults, and access signed drug rosters from their phone.",
    features: [
      "Peer-to-peer WebRTC video channels operating securely inside browsers",
      "Adjoining symptom workspace allowing notes logging alongside active video feeds",
      "Instant WhatsApp notifications containing secure prescription PDF keys"
    ],
    benefits: [
      "Deliver diagnostic capacity into remote regions",
      "Reduce physical patient wait queues inside hospital lounges",
      "Completely secure video channels prevent communication eavesdropping"
    ],
    industries: ["Community healthcare programs", "Outpatient groups", "Specialized consultation centers"],
    workflow: [
      "Initialize Servers: Provision encrypted video routers for remote data loads.",
      "Onboard Faculty: Register physician profiles with calendar slot constraints.",
      "Launch Portals: Embed booking links on website pages."
    ],
    faqs: [
      { q: "Does it work on low internet bandwidth?", a: "Yes, our video systems adjust bitrates dynamically to support 3G networks." }
    ]
  },

  // ━━━━━━━━━━━━━━━━ EDUCATION ━━━━━━━━━━━━━━━━
  {
    id: "school-management",
    slug: "school-management",
    title: "School Management",
    category: "education",
    description: "Primary and secondary school administration tracking student portfolios, class attendances, gradebooks, and guardian alert logs.",
    icon: "GraduationCap",
    seoTitle: "Primary School Grade & Attendance Solutions | Eurosia",
    seoDescription: "Streamline school fee schedules, report cards distribution, and teacher roster configurations.",
    featured: false,
    tagline: "Organize campus files, teacher rotas, and guardian message tracers.",
    heroTitle: "Next-Generation School Operating Core",
    overview: "Build unified digital channels. Connect academy managers, parents, and teachers through a secure database reporting attendance metrics.",
    features: [
      "Comprehensive student files documenting enrollments and grades",
      "Digital gradebooks calculating averages and letter grades automatically",
      "Automated attendance logs sending instant notifications to parents"
    ],
    benefits: [
      "Reduce school administration manual work hours by up to 50%",
      "Decrease school fee collection delays through digital notification lists",
      "Securely archive historic graduation and grade statistics"
    ],
    industries: ["Primary academies", "High schools", "Early training centers"],
    workflow: [
      "Structure: Load school classes, subjects lists, and grading parameters.",
      "Registration: Import student profiles and list parent phone numbers.",
      "Faculty deployment: Launch teacher terminals and activate mobile rosters."
    ],
    faqs: [
      { q: "Is there a portal for parents?", a: "Yes, we feature custom dashboard profiles for parents tracking grades and tuition bills." }
    ]
  },
  {
    id: "college-erp",
    slug: "college-erp",
    title: "College ERP",
    category: "education",
    description: "Track collegiate department courses, secure hostel room allocations, manage staff payrolls, and schedule semesters cleanly.",
    icon: "GraduationCap",
    seoTitle: "Collegiate Administration & Campus ERP | Eurosia",
    seoDescription: "Govern academic schedules, hostel reservations, department payrolls, and student enrollments.",
    featured: false,
    tagline: "Deploy robust collegiate schedule, hostel, and payment ledgers.",
    heroTitle: "Sovereign College ERP Enterprise",
    overview: "Organize multiple degree programs. Coordinate classroom resources, track hostel utility maintenance, and process tuition fees transparently.",
    features: [
      "Degree pathway checklists with prerequisite course checking logic",
      "Hostel room map trackers detailing check-ins and billing statuses",
      "Academic board portals approving final exams results securely"
    ],
    benefits: [
      "Mitigate enrollment scheduling conflicts across buildings",
      "Accelerate admissions processing via online application files",
      "Streamlin payroll systems mapping teaching contracts of part-time professors"
    ],
    industries: ["Polytechnics", "Private colleges", "Professional trade academies"],
    workflow: [
      "Profile Mapping: Input campus structures, faculty nodes, and course catalogs.",
      "Admissions Builder: Design online intake sheets for incoming applications.",
      "Terminal Launch: Activate campus portals for faculty and admissions staffs."
    ],
    faqs: [
      { q: "Can teachers input attendance on phones?", a: "Yes, our mobile campus dashboard lets teachers take class attendance in seconds." }
    ]
  },
  {
    id: "university-management",
    slug: "university-management",
    title: "University Management",
    category: "education",
    description: "Elite enterprise platform for university systems. Manages curriculum structures, research archives, and automated credit calculations.",
    icon: "GraduationCap",
    seoTitle: "Enterprise University Student & Credit Systems | Eurosia",
    seoDescription: "Process thousands of active student records, credit transfers, and research dossiers.",
    featured: false,
    tagline: "Manage credit mappings, research directories, and student self-registrations.",
    heroTitle: "Sovereign University Core System",
    overview: "Maintain scholastic prestige. Standardize student registration records, simplify thesis submissions, and automate tuition invoicing.",
    features: [
      "Student registration dashboard validating enrollment rules in real-time",
      "Credit hours auditing tracks completed credits against graduation criteria",
      "Secure research repository mapping academic papers and grading matrices"
    ],
    benefits: [
      "Completely eliminate student elective registration conflicts",
      "Lower administrative costs across academic departments",
      "Reconcile student scholarship parameters to fee structures accurately"
    ],
    industries: ["National universities", "Post-graduate centers", "Heavy research complexes"],
    workflow: [
      "Curriculum Design: Program academic faculties, degree levels, and restrictions.",
      "Student Database: Import master student portfolios with identity codes.",
      "Integration: Connect online payment pipelines to course enrollment portals."
    ],
    faqs: [
      { q: "Does the system support credit transfers?", a: "Yes, administrators can upload certified transcripts and map credits directly." }
    ]
  },
  {
    id: "lms",
    slug: "lms",
    title: "LMS",
    category: "education",
    description: "Next-gen Learning Management System hosting interactive video lectures, graded exams, and secure certificates on completion.",
    icon: "Laptop",
    seoTitle: "Learning Management System LMS Solutions | Eurosia",
    seoDescription: "Conduct online courses, automate tests, catalog lectures, and issue certifications.",
    featured: false,
    tagline: "Deploy digital classrooms, automated test forms, and course directories.",
    heroTitle: "Sovereign digital LMS Core",
    overview: "Maximize course engagement. Give students beautiful portals with progress bars, course files, and certificates.",
    features: [
      "Modern course cataloging system organizing modules and video lessons",
      "Automated test scoring offering dynamic feedback on quizzes",
      "Verifiable completion certificate builder tracking achievements"
    ],
    benefits: [
      "Scale instruction capacity beyond standard physical classrooms",
      "Ensure student progress tracks through mandatory prerequisites checks",
      "Generate helpful study analytics reporting on course completion rates"
    ],
    industries: ["Corporate training firms", "Tutoring centers", "E-learning startups"],
    workflow: [
      "Course Design: Load video chapters, quiz questions, and study files.",
      "Enrollment: Link student accounts or open general signup forms.",
      "Launch: Track student progress and review automated test reports."
    ],
    faqs: [
      { q: "Is scorm format supported?", a: "Yes, our LMS supports uploading standard digital course structures." }
    ]
  },

  // ━━━━━━━━━━━━━━━━ RETAIL & COMMERCE ━━━━━━━━━━━━━━━━
  {
    id: "ecommerce-platform",
    slug: "ecommerce-platform",
    title: "E-Commerce Platform",
    category: "retail",
    description: "High-performance digital stores with instant checkouts, localized payment channels, visual builders, and courier syncs.",
    icon: "ShoppingBag",
    seoTitle: "Online Storefront E-Commerce Platforms | Eurosia",
    seoDescription: "Design visual catalogues, streamline customer payments, and track warehouse stocks in real-time.",
    featured: true,
    tagline: "Optimize web shopping checkouts, promo engines, and shipping tracers.",
    heroTitle: "Sovereign High-Conversion E-Commerce Core",
    overview: "Launch modern web stores that load in under 1 second. Built with static site rendering to maximize conversions.",
    features: [
      "Fast checkout flow minimizing cart abandonment",
      "Dynamic promo engine managing discount codes and tiered pricing",
      "Order monitoring desk linking physical stocks directly to online listings"
    ],
    benefits: [
      "Preempt cart drops with responsive layouts",
      "Zero high commission fees from monopolistic platforms",
      "Reconcile bank entries to processed orders automatically"
    ],
    industries: ["Direct-to-consumer developers", "FMCG packers", "Electronics developers"],
    workflow: [
      "Catalog upload: Input SKU items, descriptions, and media files.",
      "Channel sync: Connect Stripe, credit card checkouts, and shipping APIs.",
      "SEO: Build digital catalog pages optimized for search engines."
    ],
    faqs: [
      { q: "Is there mobile PWA integration?", a: "Yes. Customers can install your storefront directly to their home screens for offline usage." }
    ]
  },
  {
    id: "multi-vendor-marketplace",
    slug: "multi-vendor-marketplace",
    title: "Multi-Vendor Marketplace",
    category: "retail",
    description: "Deploy shopping portals hosting multiple sellers. Manages commission splits, vendor dashboards, escrow logs, and payout schedules.",
    icon: "Layers",
    seoTitle: "Multi-Vendor Merchant Marketplace Systems | Eurosia",
    seoDescription: "Deploy transactional marketplace structures with merchant panels, commission rules, and payouts.",
    featured: false,
    tagline: "Configure dealer catalogs, commission rules, and escrow channels.",
    heroTitle: "Enterprise Multi-Merchant Marketplace Core",
    overview: "Establish structured web malls. Onboard independent sellers, monitor multi-store inventories, and automate revenue payouts.",
    features: [
      "Private vendor portals managing inventory listings and tracking orders",
      "Automated checkout split routing commission values to admin coffers",
      "Unified cart checkouts combining products from multiple merchant depots"
    ],
    benefits: [
      "Enlarge platform listings without carrying warehouse capital risks",
      "Protect system users via merchant product approval checkpoint gates",
      "Configure direct platform fees per item sale automatically"
    ],
    industries: ["Regional delivery networks", "B2B dealer networks", "Niche retail malls"],
    workflow: [
      "Commission Mapping: Set category fees, merchant policies, and payouts.",
      "Vendor Intake: Onboard sellers and check identity credentials.",
      "Go-Live: Open user signups and process multi-merchant orders."
    ],
    faqs: [
      { q: "How are merchant splits handled?", a: "Our escrow systems allocate funds directly, routing commissions to platform bank accounts." }
    ]
  },
  {
    id: "warehouse-management",
    slug: "warehouse-management",
    title: "Warehouse Management",
    category: "retail",
    description: "Advanced WMS optimization tracking stock coordinates on racks, designing picking path recommendations, and auditing space.",
    icon: "Layers",
    seoTitle: "Sovereign WMS Warehousing & Picking Systems | Eurosia",
    seoDescription: "Map spatial locator coordinates, maximize item picking efficiency, and manage returns.",
    featured: false,
    tagline: "Govern bin coordinates, operator pick paths, and stock audits.",
    heroTitle: "Sovereign Warehouse Operating Core",
    overview: "Upgrade warehouse floors. Track item locations from receiving bays to packaging lines using spatial coordinate maps.",
    features: [
      "3D Spatial bin grids monitoring rack weight levels and storage codes",
      "Pick-path generator designing optimal paths for floor staff",
      "Returns portal processing incoming cargo and updating SKU quantities"
    ],
    benefits: [
      "Increase physical item-handling speeds by up to 35%",
      "Achieve 99.9% accuracy during warehouse order packaging runs",
      "Real-time visibility into warehouse asset valuation totals"
    ],
    industries: ["3PL service hubs", "Depot centers", "Heavy cargo packers"],
    workflow: [
      "Layout Setup: Design virtual maps with aisle and shelf codes.",
      "Tag placement: Deploy high-contrast barcode tags on racks.",
      "Floor Launch: Equip staff with mobile scanners."
    ],
    faqs: [
      { q: "Is temperature logging supported?", a: "Yes, ambient sensors can stream temperatures directly to warehouse logs." }
    ]
  },

  // ━━━━━━━━━━━━━━━━ FINANCE & ACCOUNTING ━━━━━━━━━━━━━━━━
  {
    id: "accounting-software",
    slug: "accounting-software",
    title: "Accounting Software",
    category: "finance",
    description: "Double-entry accounting systems securing general ledgers, trial balance sheets, and audit trail records.",
    icon: "Coins",
    seoTitle: "Double-Entry Bookkeeping & General Ledger | Eurosia",
    seoDescription: "Audit balance sheets, reconcile bank statements, and file tax compliance papers with total accuracy.",
    featured: false,
    tagline: "Track general ledgers, banking reconciliations, and tax compliance.",
    heroTitle: "Sovereign Double-Entry Bookkeeping Core",
    overview: "Maintain supreme accounts hygiene. Build verifiable trails tracking cash flow, assets, and liabilities under strict dual-ledger auditing.",
    features: [
      "Dual-ledger matching engine protecting corporate accounts against drift",
      "Automatic tax generation mapping local sales taxes to logs",
      "Encrypted journal logs tracking transactions with immutable security"
    ],
    benefits: [
      "Accelerate yearly audit speeds by up to 70%",
      "Instantly compile income, trial balance, and tax reports",
      "Verify ledger entries against corporate bank statments seamlessly"
    ],
    industries: ["Corporate finance teams", "Agencies", "Multi-region retail networks"],
    workflow: [
      "System setup: Program fiscal calendars, chart of accounts, and VAT rates.",
      "Bank integration: Link direct payment feeds to automate audits.",
      "Activation: Deploy secure login codes to corporate bookkeeping staff."
    ],
    faqs: [
      { q: "Is retroactive transaction editing blocked?", a: "Yes. Immutable journals block editing of locked accounts periods." }
    ]
  },
  {
    id: "billing-platform",
    slug: "billing-platform",
    title: "Billing Platform",
    category: "finance",
    description: "Process subscriber billing cycles, design payment checkouts, configure coupon rules, and verify client payments cleanly.",
    icon: "DollarSign",
    seoTitle: "Subscriber Billing & PCI Payment Platforms | Eurosia",
    seoDescription: "Process subscription billing cycles, design payment checkouts, and verify client payments cleanly.",
    featured: false,
    tagline: "Manage subscriber packages, checkouts, and invoices.",
    heroTitle: "Enterprise Billing & Subscription Platform",
    overview: "Maintain continuous revenue. Automate monthly invoice deliveries, process card payments through PCI gateways, and log subscription histories.",
    features: [
      "Flexible pricing builders managing tier parameters and coupons",
      "Automated dunning rules retrying cards on bank payment drops",
      "User billing hub letting customers inspect past invoices"
    ],
    benefits: [
      "Lower user churn rate through transparent subscriber notices",
      "Lower bookkeeping workload via automated invoice matching",
      "Establish multiple checkout paths with immediate bank validation"
    ],
    industries: ["SaaS groups", "Utility networks", "Subscription gyms"],
    workflow: [
      "Model Setup: Create payment tiers, trial rules, and coupon parameters.",
      "Deploy Checkouts: Embed responsive payment grids on website pages.",
      "Syncing: Connect reporting feeds directly with corporate bank ledgers."
    ],
    faqs: [
      { q: "Are credit cards stored securely?", a: "Yes, all card data uses encrypted tokens through secure PCI-compliant interfaces." }
    ]
  },

  // ━━━━━━━━━━━━━━━━ LOGISTICS & TRANSPORT ━━━━━━━━━━━━━━━━
  {
    id: "fleet-management",
    slug: "fleet-management",
    title: "Fleet Management",
    category: "logistics",
    description: "Logistics tracking networks documenting fleet physical coordinate telemetry, service deadlines, fuel budgets, and driver shifts.",
    icon: "Truck",
    seoTitle: "Real-Time GPS Fleet & Logistics Tracking | Eurosia",
    seoDescription: "Optimize delivery schedules, record fuel logs, and monitor preventative vehicle maintenance.",
    featured: false,
    tagline: "Track fleet coordinate telemetry, fuel logs, and service checklists.",
    heroTitle: "Sovereign Fleet Routing Core",
    overview: "Drive shipping operations. Monitor physical vehicle coordinate data, track driver break periods, and receive preventive asset service alerts.",
    features: [
      "GPS tracking dashboards delivering real-time vehicle coordinates",
      "Preventive service loggers raising alerts for diagnostic oil and engine checks",
      "Driver shift card registry documenting driving hours and break times"
    ],
    benefits: [
      "Reduce commercial vehicle fuel consumption rates by up to 18%",
      "Minimize delivery vehicle breakdowns through automated maintenance schedules",
      "Establish driver safety parameters across transit regions"
    ],
    industries: ["Transit companies", "Home courier networks", "Municipal trucks"],
    workflow: [
      "Asset Entry: Input commercial truck profiles, fuel rates, and service dates.",
      "Hardware Sync: Connect GPS tracker feeds to master databases.",
      "Monitor: Open real-time tracking dashboards for fleet dispatchers."
    ],
    faqs: [
      { q: "Are mobile coordinates hookable?", a: "Yes, our mobile system turns generic driver smartphones into active GPS locators." }
    ]
  },
  {
    id: "supply-chain-management",
    slug: "supply-chain-management",
    title: "Supply Chain Management",
    category: "logistics",
    description: "Orchestrate manufacturing chains, from bulk raw supplies procurement and customs checkpoints to regional delivery warehouses.",
    icon: "Workflow",
    seoTitle: "End-to-End Supply Chain Solutions | Eurosia App Ecosystem",
    seoDescription: "Coordinate factory materials, transit checkpoints, and regional vendor inventories.",
    featured: false,
    tagline: "Govern direct logistics pipelines, multi-region depots, and stock volumes.",
    heroTitle: "Sovereign Supply Chain ERP Core",
    overview: "Maintain material flow hygiene. Reduce manufacturing delays by tracking production assets and raw materials from procurement to destination depots.",
    features: [
      "Shipment telemetry portal reporting shipping lane checkpoints logs",
      "Supplier materials registry calculating production ingredient lead times",
      "Logistics incident log detailing transport anomalies"
    ],
    benefits: [
      "Maintain lean inventory volumes across processing divisions",
      "Eliminate material flow discrepancies during customs handovers",
      "Quickly pivot shipping lines based on delay telemetry reports"
    ],
    industries: ["Steelworks", "Consumer electronics developers", "Agribusiness processors"],
    workflow: [
      "System Design: Program procurement layers, depot endpoints, and border checkpoints.",
      "Supplier Sync: Map supplier logistics logs into central dashboards.",
      "Launch: Review supply chain performance diagrams weekly."
    ],
    faqs: [
      { q: "Is custom manifest generation supported?", a: "Yes, dynamic system scripts format compliance documents automatically." }
    ]
  },

  // ━━━━━━━━━━━━━━━━ REAL ESTATE & PROPERTY ━━━━━━━━━━━━━━━━
  {
    id: "property-management",
    slug: "property-management",
    title: "Property Management",
    category: "realestate",
    description: "Govern commercial asset rosters, schedule tenant leases, issue maintenance workflows, and collect rent payments cleanly.",
    icon: "HomeIcon",
    seoTitle: "Tenant Property & Lease Management systems | Eurosia",
    seoDescription: "Record rental profiles, compile property maintenance lists, and track rent collection histories.",
    featured: false,
    tagline: "Govern asset listings, lease agreements, and maintenance tickets.",
    heroTitle: "Sovereign Property & Landlord Hub",
    overview: "Streamline physical property portfolios. Maintain clean rental accounts, allocate lock codes, and organize tenant maintenance tickets.",
    features: [
      "Tenant lease records documenting contract schedules and security deposits",
      "Maintenance taskboards dispatching plumbers and electricians directly",
      "Rent tracking log outputting automated receipt files to tenants"
    ],
    benefits: [
      "Shorten landlord task resolution delays by up to 50%",
      "Ensure prompt rent payments through automated tenant notices",
      "Access yield diagrams detailing building performance values"
    ],
    industries: ["Residential landlords", "Shopping malls", "Co-working networks"],
    workflow: [
      "Setup assets: Construct digital profiles detailing building addresses, units, and features.",
      "Tenant Sync: Input tenant profiles alongside rent levels and lease dates.",
      "Desk integration: Initialize online rent gateways."
    ],
    faqs: [
      { q: "Can tenants raise repair tickets?", a: "Yes, our tenant mobile login portal lets them report repairs with photos." }
    ]
  },
  {
    id: "real-estate-crm",
    slug: "real-estate-crm",
    title: "Real Estate CRM",
    category: "realestate",
    description: "Lead databases tailored for real estate broker networks. Matches property seeker profiles to active listings to accelerate sales checkouts.",
    icon: "Users",
    seoTitle: "Real Estate Broker CRM Solutions | Eurosia",
    seoDescription: "Govern property client leads, synchronize developer portfolios, and track commissions.",
    featured: false,
    tagline: "Align prospective buyers to developer property listings.",
    heroTitle: "Intelligent Real Estate Sales CRM",
    overview: "Shorten sales velocity. Organizes property inspection events, logs client requirements, and details commission splits between listing agents.",
    features: [
      "Buyer requirements profile mapping interior layouts and budget limits",
      "Interactive property map linking verified listings to client folders",
      "Agent commission split records tracking transaction fees transparently"
    ],
    benefits: [
      "Double property matching speed through smart search filters",
      "Mitigate client follow-up gaps using calendar alerts",
      "Maintain secure histories on landlord contact cards"
    ],
    industries: ["Broker agencies", "Property developers", "Corporate builders"],
    workflow: [
      "Listings: Load real estate collections with coordinates, media files, and pricing.",
      "Agent Profile: Schedule access roles and target sales areas.",
      "Launch: Connect inbound lead capture forms from web pages."
    ],
    faqs: [
      { q: "Is multiple MLS sync enabled?", a: "Yes, we support API integrations syncing listings sheets dynamically." }
    ]
  },

  // ━━━━━━━━━━━━━━━━ HOSPITALITY CONTENTS ━━━━━━━━━━━━━━━━
  {
    id: "hotel-management",
    slug: "hotel-management",
    title: "Hotel Management",
    category: "hospitality",
    description: "Front desk booking channels, housekeeping checklists, guest profiles, and unified cashier modules.",
    icon: "Building2",
    seoTitle: "Front Desk Hotel & Resort Management | Eurosia",
    seoDescription: "Coordinate guest check-ins, oversee housekeeping rosters, and process POS room charges.",
    featured: false,
    tagline: "Coordinate guest check-ins, room charts, and housekeeping logs.",
    heroTitle: "Sovereign Hotel Core System",
    overview: "Ensure elite guest experiences. Track guest room bookings on visual room boards, schedule cleaning tasks, and combine bar billing tabs under room numbers.",
    features: [
      "Visual room board showing live reservations and housekeeping states",
      "Guest service catalog logging food and transport charges to rooms",
      "Housekeeping portal updating room readiness dynamically on cleaning tablets"
    ],
    benefits: [
      "Cut down customer check-in delays at front desks",
      "Prevent room-billing discrepancies during checkouts",
      "Maximize occupancy potential through smart booking allocations"
    ],
    industries: ["Boutique hotels", "Integrated seaside resorts", "Business motels"],
    workflow: [
      "Room Setup: Map rooms, floor layouts, and seasonal price parameters.",
      "Front-desk: Train staff on visual booking boards.",
      "Launch: Connect direct-booking forms on main website pages."
    ],
    faqs: [
      { q: "Are room door lock codes supported?", a: "Yes, our API bridges keycard encoders directly to front desk terminals." }
    ]
  },
  {
    id: "restaurant-management",
    slug: "restaurant-management",
    title: "Restaurant Management",
    category: "hospitality",
    description: "Visual restaurant desk maps, direct kitchen display screens (KDS), tablet menu ordering, and exact raw ingredient tracking.",
    icon: "ShoppingBag",
    seoTitle: "Restaurant KDS Menu POS Solutions | Eurosia",
    seoDescription: "Govern table layouts, route order slips directly to kitchen monitors, and balance ingredient stocks.",
    featured: false,
    tagline: "Govern floor maps, order rosters, and ingredient ledgers.",
    heroTitle: "Sovereign Restaurant Operating Core",
    overview: "Accelerate food services. Customers order via table terminals, sending slips directly to chef KDS screens, while raw ingredient ledgers update in real-time.",
    features: [
      "Visual floor layouts showing active tables billing timers and covers",
      "Kitchen Display Screen (KDS) system managing cooks queue priorities",
      "Direct menu pricing editor configuring temporary promotional pricing"
    ],
    benefits: [
      "Shorten food delivery delays by routing orders directly to kitchen displays",
      "Avert kitchen ingredient shortages by linking orders to stock levels",
      "Streamlined checkout processes combine splits, credit, and digital cash"
    ],
    industries: ["Fine dining spaces", "Heavy fastfood networks", "Hotel coffee lounges"],
    workflow: [
      "Layout Setup: Design virtual table maps and configure menu sheets.",
      "Kitchen Sync: Install KDS monitors inside food preparation zones.",
      "Onboarding: Register cashier accounts and calibrate terminal receipt printers."
    ],
    faqs: [
      { q: "Is QR table-ordering supported?", a: "Yes, clients can scan table-specific QR codes to select dishes and pay on their phones." }
    ]
  },

  // ━━━━━━━━━━━━━━━━ INDUSTRIAL SOLUTIONS ━━━━━━━━━━━━━━━━
  {
    id: "manufacturing-erp",
    slug: "manufacturing-erp",
    title: "Manufacturing ERP",
    category: "industrial",
    description: "Optimize production planning with automated bill of materials (BOM), batch costing, step schedules, and inventory controls.",
    icon: "Factory",
    seoTitle: "Industrial Manufacturing & BOM ERP | Eurosia",
    seoDescription: "Optimize bill of materials, factory machine schedules, and raw inventory values.",
    featured: false,
    tagline: "Govern bill of materials (BOM), batch costings, and machine tasks.",
    heroTitle: "Sovereign Manufacturing ERP Core",
    overview: "Drive factory operations. Maintain exact material schedules, track raw parts depreciation, and balance machine capacities cleanly.",
    features: [
      "Bill of Materials (BOM) engine calculating exact cost factors on items",
      "Production timeline tracker mapping active factory assembly lines",
      "Batch quality checkpoints checking finished goods against tolerance metrics"
    ],
    benefits: [
      "Double factory output efficiency by scheduling machine workloads",
      "Accurately predict component lead times for bulk orders",
      "Audit material wasting logs directly inside the workspace"
    ],
    industries: ["Precision machine factories", "Chemical mix labs", "Automotive parts plants"],
    workflow: [
      "BOM Setup: Document all product assembly steps and raw component costs.",
      "Capacity Setup: Map machine run capacities and scheduling limits.",
      "Launch: Deploy terminal checkouts to shop floors."
    ],
    faqs: [
      { q: "Does the system support barcoding tracking?", a: "Yes, components carry barcode tags tracked through every phase of assembly." }
    ]
  },
  {
    id: "factory-automation",
    slug: "factory-automation",
    title: "Factory Automation",
    category: "industrial",
    description: "Machine PLC telemetry loggers, sensory threshold registers, and preventative maintenance logs protecting heavy factories.",
    icon: "Cpu",
    seoTitle: "Sovereign PLC Telemetry & Factory Automation | Eurosia",
    seoDescription: "Register sensor threshold telemetry, analyze production speeds, and schedule maintenance.",
    featured: false,
    tagline: "Track machine PLC telemetry, sensor logs, and maintenance logs.",
    heroTitle: "Sovereign Factory Autopilot system",
    overview: "Unify factory telemetry. Stream real-time counts from machinery, register operating sensor temperatures, and plan maintenance to prevent outages.",
    features: [
      "Telemetry dashboard logging sensory data stream records",
      "Alarm triggers raising alerts for threshold overruns",
      "Service scheduler locking machines for certified compliance checks"
    ],
    benefits: [
      "Prevent expensive asset breakdowns via responsive sensor alerts",
      "Monitor factory line cycle timelines in real-time",
      "Accurately calculate machine performance stats across facilities"
    ],
    industries: ["Robotic assembly complexes", "Cement plants", "Power grids"],
    workflow: [
      "Node configure: Bind sensor endpoints into secure data routers.",
      "Threshold Mapping: Configure alert triggers for pressure and heat logs.",
      "Live: Launch control decks for dispatch operators."
    ],
    faqs: [
      { q: "Is Modbus protocol active?", a: "Yes, raw PLC Modbus files parse directly into target telemetry graphs." }
    ]
  },

  // ━━━━━━━━━━━━━━━━ AI & AUTOMATION ━━━━━━━━━━━━━━━━
  {
    id: "ai-chatbot",
    slug: "ai-chatbot",
    title: "AI Chatbot",
    category: "ai",
    description: "Private cognitive agent nodes trained on custom company documents. Solves ticketing, draft notes, and workflow triggers securely.",
    icon: "Bot",
    seoTitle: "Private Cognitive AI Agent Nodes | Eurosia App Ecosystem",
    seoDescription: "Deploy secure self-learning LLM-guided agent nodes inside your corporate network to automate work.",
    featured: true,
    tagline: "Enterprise private agent nodes reading local folders and running workflows.",
    heroTitle: "Sovereign AI Chatbot Network",
    overview: "Supercharge company productivity. Eurosia AI Chatbot reads private training files to resolve customer queries and auto-fill records safely.",
    features: [
      "Private knowledge base learning from local PDFs and manuals",
      "Direct API integrations triggering systems actions",
      "Client conversation panels with custom CSS branding"
    ],
    benefits: [
      "Resolve up to 70% of standard customer support tickets instantly",
      "Draft complex business contracts in under 3 seconds",
      "Ensures private business materials remain secure inside local nodes"
    ],
    industries: ["Credit agencies", "E-commerce customer supports", "Corporate consultancies"],
    workflow: [
      "Data ingestion: Upload reference manuals, policy files, and guides.",
      "API rules mapping: Design clearance rules for system action commands.",
      "Embed: Embed the active chatbot widget onto websites and portals."
    ],
    faqs: [
      { q: "Is our data trained by OpenAI?", a: "No. Eurosia AI runs on isolated server clusters, protecting your private data." }
    ]
  },
  {
    id: "ai-assistant",
    slug: "ai-assistant",
    title: "AI Assistant",
    category: "ai",
    description: "Sovereign smart helper drafting staff emails, writing code fragments, summarizing meeting notes, and auditing records dynamically.",
    icon: "Sparkles",
    seoTitle: "Smart Corporate Workspace AI Assistants | Eurosia",
    seoDescription: "Empower staff with secure generative text assistants, task suggestions, and document summaries.",
    featured: false,
    tagline: "Draft emails, audit records, and summarize transcripts on an encrypted server.",
    heroTitle: "Sovereign Enterprise AI Assistant",
    overview: "Accelerate daily office documentation. Features high-security content authoring, audio-to-text summaries, and smart task suggestions.",
    features: [
      "Generative writer with custom corporate voice sliders",
      "Audio note transcriber exporting meeting items to task lists",
      "Record audit tools scanning folders for compliance anomalies"
    ],
    benefits: [
      "Shorten report writing times by up to 60%",
      "Increase emails follow-up rates with instant draft suggestions",
      "Protect draft files inside secure sovereign databases"
    ],
    industries: ["Legal firms", "Corporate boards", "Creative agencies"],
    workflow: [
      "Context Sync: Create secure prompts tailored for department tasks.",
      "Staff Launch: Create user seats inside the AI sandbox.",
      "Monitor: Access analytics charts reporting team productivity gains."
    ],
    faqs: [
      { q: "Does the system support audio dictation?", a: "Yes, speech records translate to formatted word docs instantly." }
    ]
  },
  {
    id: "customer-support-ai",
    slug: "customer-support-ai",
    title: "Customer Support AI",
    category: "ai",
    description: "Cognitive support AI drafting ticket responses, resolving standard refund requests, and routing complex queries to expert teams.",
    icon: "MessageSquareText",
    seoTitle: "Cognitive Helplines & Support AI Systems | Eurosia",
    seoDescription: "Automate user query classification, draft email responses, and track satisfaction ratings.",
    featured: false,
    tagline: "Draft customer ticket responses, track query tags, and trigger refunds.",
    heroTitle: "Sovereign Support Automation Hub",
    overview: "Maintain high customer satisfaction. Categorize incoming help tickets, auto-draft expert responses, and resolve common queries in seconds.",
    features: [
      "Helpdesk ticket classifier tagging issues by urgency and sentiment",
      "Auto-response generator pulling answer templates from company documentation",
      "Escalation pathways routing complex queries to appropriate human experts"
    ],
    benefits: [
      "Bring customer support response times down below 1 minute",
      "Automate repetitive basic queries to free up support teams",
      "Analyze client satisfaction metrics directly from dashboard panels"
    ],
    industries: ["SaaS startups", "Retail portals", "Sovereign service hubs"],
    workflow: [
      "Knowledge Sync: Load customer FAQ logs, pricing tables, and return policies.",
      "Integration: Map support mailboxes and digital chat networks.",
      "Clearance: Authorize threshold rules for automated refund actions."
    ],
    faqs: [
      { q: "Is multilanguage ticketing enabled?", a: "Yes, our support AI processes and responds in over 30 global languages." }
    ]
  },

  // ━━━━━━━━━━━━━━━━ DIGITAL SERVICES ━━━━━━━━━━━━━━━━
  {
    id: "custom-software-development",
    slug: "custom-software-development",
    title: "Custom Software Development",
    category: "digital",
    description: "Launch responsive, enterprise-grade production software, robust database engines, and secure API networks tailored for your business.",
    icon: "Terminal",
    seoTitle: "Enterprise custom Software Development | Eurosia",
    seoDescription: "Code custom full-stack software, establish resilient database clusters, and secure APIs.",
    featured: false,
    tagline: "Code resilient dedicated software, databases, and APIs.",
    heroTitle: "Digital Software Engineering Platform",
    overview: "Create bespoke digital systems. Build modular, secure code systems that map exactly to your company's operational needs.",
    features: [
      "Bespoke database schema setups optimizing query response speeds",
      "Robust REST/GraphQL API systems matching modern safety rules",
      "Modern UI designs styled with Tailwind CSS layouts"
    ],
    benefits: [
      "Own custom software codes outright with zero subscriber fees",
      "Ensure digital layouts integrate cleanly with legacy machines",
      "Accelerate transition times through dedicated DevOps automation"
    ],
    industries: ["Banks", "Logistics giants", "Goverments"],
    workflow: [
      "Blueprint study: Map operational fields, systems limits, and requirements.",
      "Model Design: Define database models and mock up screen layouts.",
      "Live deployment: Push clean build packages onto secure cloud runs."
    ],
    faqs: [
      { q: "Is the source code fully owned by us?", a: "Yes, IP rights and production repositories transfer completely to you." }
    ]
  },
  {
    id: "mobile-app-development",
    slug: "mobile-app-development",
    title: "Mobile App Development",
    category: "digital",
    description: "High-performance cross-platform mobile apps for Android and iOS, built with React Native, local syncs, and native sensor drivers.",
    icon: "Laptop",
    seoTitle: "Android & iOS Cross-Platform App Development | Eurosia",
    seoDescription: "Build mobile applications with fast offline caching, geolocation logs, and push alerts.",
    featured: false,
    tagline: "Build high-performance Android and iOS apps.",
    heroTitle: "Cross-Platform Mobile App Engineering",
    overview: "Deliver clean mobile solutions. Launch applications with offline database synchronization, geolocation capabilities, and push notifications.",
    features: [
      "React Native setups operating smoothly across Android and iPhone",
      "Offline sync engines updating local storage files to server clusters",
      "Direct API integrations with smartphone camera and diagnostic features"
    ],
    benefits: [
      "Launch on Google Play and Apple App Stores simultaneously",
      "Ensure fast, responsive mobile experiences for users",
      "Lower maintenance budgets using unified code bases"
    ],
    industries: ["Field workforces", "On-demand dispatch platforms", "Loyalty clubs"],
    workflow: [
      "Layout and flow: Draft app user flows and screen layouts.",
      "Prototype: Build interactive screens matching styling guidelines.",
      "Publish: Deploy binaries to store reviewers."
    ],
    faqs: [
      { q: "Is offline database caching enabled?", a: "Yes, local SQLite storage keeps apps responsive without internet connection." }
    ]
  },
  {
    id: "saas-development",
    slug: "saas-development",
    title: "SaaS Development",
    category: "digital",
    description: "Launch subscription-ready SaaS web systems. Includes merchant billing checkouts, multi-tenant databases, and administration portals.",
    icon: "Globe",
    seoTitle: "Multi-Tenant SaaS Web Systems Construction | Eurosia",
    seoDescription: "Establish high-performance SaaS applications with subscription billing and admin consoles.",
    featured: false,
    tagline: "Build subscription-ready SaaS web portals.",
    heroTitle: "Sovereign SaaS Engineering Suite",
    overview: "Commercialize software products. Build scalable multi-tenant architectures, configure team seats, and connect subscription checkouts.",
    features: [
      "Multi-tenant database layers isolating subscriber workspaces cleanly",
      "Subscription checkout paths hookable to Stripe card billing",
      "Admin monitoring desk tracking subscriber seats and billing metrics"
    ],
    benefits: [
      "Accelerate time-to-market for digital products",
      "Reduce developer operational overhead through modular layouts",
      "Optimize data queries to support expanding user rosters"
    ],
    industries: ["Fintech developers", "Adtech organizations", "ERP suppliers"],
    workflow: [
      "Architecture design: Map multi-tenant schemas and subscription levels.",
      "Prototype construction: Build clean web portals with navigation blocks.",
      "Stripe integration: Attach checkout links to process subscription fees."
    ],
    faqs: [
      { q: "Are customer workspaces isolated safely?", a: "Yes, role validation protocols shield tenant storage blocks securely." }
    ]
  },
  {
    id: "cloud-solutions",
    slug: "cloud-solutions",
    title: "Cloud Solutions",
    category: "digital",
    description: "Establish fast auto-scaling servers, secure Docker containers, manage load balancers, and setup secure data recoveries.",
    icon: "Cpu",
    seoTitle: "Resilient Cloud Infrastructure & Kubernetes | Eurosia",
    seoDescription: "Setup auto-scaling cloud servers, secure Docker containers, and database replication.",
    featured: false,
    tagline: "Configure auto-scaling server environments and recoveries.",
    heroTitle: "Resilient Cloud Infrastructure Systems",
    overview: "Protect enterprise data assets. Configure resilient cloud networks, automate service routing, and implement database replications.",
    features: [
      "Dockerized container systems running cleanly on Cloud Run setups",
      "Network load balancers distributing user traffic dynamically",
      "Database backup triggers saving encrypted system snapshots daily"
    ],
    benefits: [
      "Ensure 99.99% system availability metrics for corporate websites",
      "Prevent data loss during cloud provider node outages",
      "Lower monthly cloud fees through auto-scaling servers"
    ],
    industries: ["High-traffic sites", "Financial groups", "State databases"],
    workflow: [
      "Audit: Analyze incoming traffic spikes and map database storage limits.",
      "Setup Container: Dockerize software modules into secure container clusters.",
      "Deploy: Configure domain routers with failover protections."
    ],
    faqs: [
      { q: "Is there instant data recovery?", a: "Yes, automated database failovers transition traffic to replicas in seconds." }
    ]
  }
];

// Helper to resolve specific lucide icon component
export const getSolutionIcon = (name: string) => {
  const icons: { [key: string]: any } = {
    Building2, Bot, PhoneCall, DollarSign, Shield, Globe, 
    Activity, Mic, MessageSquareText, ShieldCheck, Cpu,
    Mail, Monitor, Sparkles, Laptop, GraduationCap, Truck,
    Factory, HomeIcon, ShoppingBag, Terminal, HeartPulse,
    Coins, Database, Layers, Workflow, Users, Hotel
  };
  return icons[name] || Building2;
};

// Map items for easy key lookup by slug or id
export const ALL_SOLUTIONS_DATA: Record<string, Solution> = ALL_SOLUTIONS_LIST.reduce((accum, item) => {
  accum[item.slug] = item;
  return accum;
}, {} as Record<string, Solution>);

// Generate standard compatible SOLUTION_CATEGORIES mapping dynamically
export const SOLUTION_CATEGORIES = CATEGORIES_METADATA.map((cat) => {
  const matchedSols = ALL_SOLUTIONS_LIST.filter(sol => sol.category === cat.id);
  return {
    id: cat.id,
    name: cat.name,
    description: cat.description,
    iconName: cat.iconName,
    solutions: matchedSols.map(sol => ({
      id: sol.id,
      name: sol.title,
      url: `/solutions/${sol.slug}`
    }))
  };
});
