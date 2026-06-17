/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import fs from 'fs';
import path from 'path';
import {
  User,
  Role,
  Permission,
  Company,
  License,
  Device,
  AppModule,
  Page,
  PageSection,
  PricingPlan,
  PaymentMethod,
  PaymentTransaction,
  AuditLog,
  SyncLog,
  FeatureFlag,
  Plugin,
  Solution,
  CustomSolutionRequest,
  NavigationMenu,
  CmsForm,
  WhatsAppRoute,
  Language,
  TranslationKey,
  TranslationValue,
  PageTranslation,
  MenuTranslation,
  AppTranslation,
  SolutionTranslation,
  ContactOffice,
  Blog,
  Notification,
  PWASettings,
  SocialPlatform
} from './schema.ts';

const DB_FILE = path.join(process.cwd(), 'src', 'db', 'db_store.json');

// Interface representation for our persistent state
export interface DatabaseState {
  users: User[];
  roles: Role[];
  permissions: Permission[];
  companies: Company[];
  licenses: License[];
  devices: Device[];
  appModules: AppModule[];
  pages: Page[];
  sections: PageSection[];
  pricingPlans: PricingPlan[];
  paymentMethods: PaymentMethod[];
  transactions: PaymentTransaction[];
  auditLogs: AuditLog[];
  syncLogs: SyncLog[];
  featureFlags: FeatureFlag[];
  plugins: Plugin[];
  solutions: Solution[];
  customSolutionRequests?: CustomSolutionRequest[];
  menus?: NavigationMenu[];
  forms?: CmsForm[];
  whatsappRoutes?: WhatsAppRoute[];
  languages?: Language[];
  translationKeys?: TranslationKey[];
  translationValues?: TranslationValue[];
  pageTranslations?: PageTranslation[];
  menuTranslations?: MenuTranslation[];
  appTranslations?: AppTranslation[];
  solutionTranslations?: SolutionTranslation[];
  contacts?: ContactOffice[];
  blogs?: Blog[];
  notifications?: Notification[];
  pwaSettings?: PWASettings;
  socialPlatforms?: SocialPlatform[];
  media?: { id: string; url: string; name: string; folder: string; size: string; createdAt: string; type?: string; }[];
  themeSettings: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    logoUrl: string;
    faviconUrl?: string;
    typographyPairing?: string; // e.g. "Inter-SpaceGrotesk"
    layoutWidth?: 'compact' | 'standard' | 'wide';
    defaultMode?: 'light' | 'dark';
  };
}

// Global in-memory cache of the database state
let dbState: DatabaseState | null = null;

function ensureDirectoryExistence(filePath: string) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

// Initial seed data that precisely matches the image
const INITIAL_STATE: DatabaseState = {
  users: [
    {
      id: "u-1",
      email: "mohinextfuture@gmail.com",
      passwordHash: "$2b$10$Unq8bLg20pM5Vq2.XoDPeuN9QpT8G8.Uv5kExn8f09RgeU6/G.79S",
      name: "Super Owner Admin",
      role: "Super Admin",
      companyId: "c-owner",
      status: "active",
      sortOrder: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "u-2",
      email: "admin@eurosia.io",
      passwordHash: "$2b$10$Unq8bLg20pM5Vq2.XoDPeuN9QpT8G8.Uv5kExn8f09RgeU6/G.79S",
      name: "Eurosia Operations Master",
      role: "Super Admin",
      companyId: "c-owner",
      status: "active",
      sortOrder: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "u-3",
      email: "chief@acmecorp.com",
      passwordHash: "$2b$10$Unq8bLg20pM5Vq2.XoDPeuN9QpT8G8.Uv5kExn8f09RgeU6/G.79S",
      name: "John Doe",
      role: "Company Admin",
      companyId: "c-1",
      status: "active",
      sortOrder: 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],
  roles: [
    { id: "r-superadmin", name: "Super Admin", permissions: ["all"], status: "active" },
    { id: "r-compadmin", name: "Company Admin", permissions: ["read_all", "write_all", "billing", "manage_users"], status: "active" },
    { id: "r-manager", name: "Manager", permissions: ["read_all", "write_all", "manage_users"], status: "active" },
    { id: "r-accountant", name: "Accountant", permissions: ["read_billing", "edit_billing"], status: "active" },
    { id: "r-sales", name: "Sales User", permissions: ["sales_crud", "view_items"], status: "active" },
    { id: "r-support", name: "Support Agent", permissions: ["support_ticket_write", "support_ticket_read"], status: "active" },
    { id: "r-staff", name: "Staff", permissions: ["self_edit", "limited_read"], status: "active" }
  ],
  permissions: [
    { id: "p-all", name: "All Permissions", key: "all", category: "System" },
    { id: "p-comp-read", name: "Read Company Info", key: "read_all", category: "Company" },
    { id: "p-comp-write", name: "Write Company Info", key: "write_all", category: "Company" },
    { id: "p-billing-view", name: "Read Billing & subscription", key: "read_billing", category: "Billing" },
    { id: "p-billing-edit", name: "Manage Billing & gateway", key: "edit_billing", category: "Billing" },
    { id: "p-user-manage", name: "Manage Tenant Users", key: "manage_users", category: "Users" },
    { id: "p-sales-write", name: "Create Sales & Invoices", key: "sales_crud", category: "Sales" },
    { id: "p-items-read", name: "View Store Inventory", key: "view_items", category: "Inventory" }
  ],
  companies: [
    {
      id: "c-owner",
      name: "EUROSIA Ltd.",
      status: "active",
      logo: "/assets/eurosia_logo.png",
      domain: "eurosia.io",
      email: "info@eurosia.io",
      packageId: "p-enterprise",
      subscriptionStatus: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "c-1",
      name: "Acme Corp Ltd.",
      status: "active",
      logo: "/assets/acme_logo.png",
      domain: "acmecorp.com",
      email: "billing@acmecorp.com",
      packageId: "p-business",
      subscriptionStatus: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],
  licenses: [
    {
      id: "lic-1",
      licenseKey: "EUR-ACME-8F2B-9871-X99",
      companyId: "c-1",
      maxUsers: 20,
      maxDevices: 5,
      status: "active",
      startDate: "2026-01-01T00:00:00.000Z",
      expiryDate: "2027-12-31T00:00:00.000Z",
      offlineAllowed: true,
      offlineGraceDays: 30,
      lastValidatedDate: new Date().toISOString()
    },
    {
      id: "lic-owner",
      licenseKey: "EUR-OWNER-MASTER-KEY",
      companyId: "c-owner",
      maxUsers: 9999,
      maxDevices: 9999,
      status: "active",
      startDate: "2026-01-01T00:00:00.000Z",
      expiryDate: "2036-12-31T00:00:00.000Z",
      offlineAllowed: true,
      offlineGraceDays: 180,
      lastValidatedDate: new Date().toISOString()
    }
  ],
  devices: [
    {
      id: "dev-1",
      fingerprint: "FINGERPRINT_WEB_PREVIEW_USER",
      name: "HQ Primary Terminal",
      platform: "MacOS Client",
      companyId: "c-1",
      userId: "u-3",
      status: "active",
      lastActiveAt: new Date().toISOString()
    },
    {
      id: "dev-2",
      fingerprint: "FINGERPRINT_OWNER_TERMINAL",
      name: "Owner Control Rig",
      platform: "Linux/Electron",
      companyId: "c-owner",
      userId: "u-1",
      status: "active",
      lastActiveAt: new Date().toISOString()
    }
  ],
  appModules: [
    { id: "mod-pos", name: "EUROSIA POS", description: "Smart Restaurant & Retail Management", slug: "eurosia-pos", icon: "DollarSign", category: "management", rating: 4.8, fee: 39, status: "active", sortOrder: 1, externalUrl: "https://eurosia.io/", openInNewTab: true, isExternal: true },
    { id: "mod-care", name: "EUROSIA Care", description: "Digital Clinic & Healthcare Platform", slug: "eurosia-care", icon: "Activity", category: "industry", rating: 4.7, fee: 49, status: "active", sortOrder: 2, externalUrl: "https://care.eurosia.app", openInNewTab: true, isExternal: true },
    { id: "mod-pbx", name: "EUROSIA CloudPBX", description: "Cloud PBX & Call Center Solution", slug: "eurosia-cloudpbx", icon: "PhoneCall", category: "comms", rating: 4.9, fee: 29, status: "active", sortOrder: 3, externalUrl: "https://cloudpbx.eurosia.app", openInNewTab: true, isExternal: true },
    { id: "mod-ai-calling", name: "EUROSIA AI Calling", description: "AI-Powered Voice Automation Platform", slug: "eurosia-ai-calling", icon: "Mic", category: "ai", rating: 4.9, fee: 79, status: "active", sortOrder: 4, externalUrl: "https://aicalling.eurosia.app", openInNewTab: true, isExternal: true },
    { id: "mod-kabyo", name: "Kabyo Kotha AI", description: "Bengali Conversational AI Platform", slug: "kabyo-kotha-ai", icon: "MessageSquareText", category: "ai", rating: 4.6, fee: 19, status: "active", sortOrder: 5 },
    { id: "mod-chatbot", name: "EUROSIA AI Chatbot", description: "Customer Engagement Platform", slug: "eurosia-ai-chatbot", icon: "Bot", category: "ai", rating: 4.8, fee: 25, status: "active", sortOrder: 6 },
    { id: "mod-datapilot", name: "EUROSIA DataPilot AI", description: "Data Automation & Web Intelligence", slug: "eurosia-datapilot-ai", icon: "Database", category: "ai", rating: 4.7, fee: 89, status: "active", sortOrder: 7 },
    { id: "mod-defender", name: "EUROSIA Defender X", description: "Global Cyber Defense Platform", slug: "eurosia-defender-x", icon: "ShieldAlert", category: "sec", rating: 4.9, fee: 99, status: "active", sortOrder: 8, externalUrl: "https://defenderx.eurosia.app", openInNewTab: true, isExternal: true },
    { id: "mod-buildnex", name: "EUROSIA BuildNex", description: "Construction ERP & Property Management", slug: "eurosia-buildnex", icon: "Building2", category: "industry", rating: 4.5, fee: 119, status: "active", sortOrder: 9 },
    { id: "mod-cashbook", name: "EUROSIA CashBook", description: "Smart Business Accounting Software", slug: "eurosia-cashbook", icon: "BookOpen", category: "fintech", rating: 4.8, fee: 15, status: "active", sortOrder: 10 },
    { id: "mod-invoicenex", name: "EUROSIA InvoiceNex", description: "Professional Invoice Generator", slug: "eurosia-invoicenex", icon: "Receipt", category: "fintech", rating: 4.9, fee: 9, status: "active", sortOrder: 11 },
    { id: "mod-paybill", name: "EUROSIA PayBill", description: "Bill Management & Payment Reminder", slug: "eurosia-paybill", icon: "Hourglass", category: "fintech", rating: 4.7, fee: 12, status: "active", sortOrder: 12 },
    { id: "mod-nexfarmer", name: "NexFarmer", description: "Agro Invoice & Farm Business Solution", slug: "nexfarmer", icon: "Wheat", category: "industry", rating: 4.8, fee: 29, status: "active", sortOrder: 13 },
    { id: "mod-cloud", name: "EUROSIA Cloud", description: "Multi-Tenant SaaS Platform", slug: "eurosia-cloud", icon: "Cloud", category: "management", rating: 4.9, fee: 59, status: "active", sortOrder: 14 },
    { id: "mod-fieldforce", name: "Field Force Tracker", description: "GPS & Workforce Management", slug: "field-force-tracker", icon: "MapPin", category: "management", rating: 4.6, fee: 24, status: "active", sortOrder: 15 },
    { id: "mod-ecommerce", name: "EUROSIA eCommerce Source", description: "Multi-Vendor eCommerce Platform", slug: "eurosia-ecommerce-source", icon: "ShoppingBag", category: "industry", rating: 4.8, fee: 49, status: "active", sortOrder: 16 },
    { id: "mod-onex", name: "EUROSIA ONEX", description: "All-in-One Platform for Digital Marketing Agencies", slug: "eurosia-onex", icon: "Megaphone", category: "management", rating: 4.7, fee: 39, status: "active", sortOrder: 17 }
  ],
  pages: [
    { id: "page-home", title: "Home", slug: "home", status: "active", seoTitle: "EUROSIA App Ecosystem - The Business Operating System", seoDescription: "Run ERP, CRM, Accounting, AI, Communication and Cybersecurity from a single premium offline-first ecosystem.", seoKeywords: "Business software, ERP, CRM, Accounting, Offline-First", sortOrder: 1 },
    { id: "page-apps", title: "Apps", slug: "apps", status: "active", seoTitle: "Eurosia Modular Apps Marketplace", seoDescription: "Choose and install modular tools for your custom enterprise operations.", seoKeywords: "pos software, clinic system, billing apps", sortOrder: 2 },
    { id: "page-solutions", title: "Solutions", slug: "solutions", status: "active", seoTitle: "Enterprise Technology Solutions", seoDescription: "Deeply vertical industry setups powered by advanced cloud layers.", seoKeywords: "fintech solution, cyber defense", sortOrder: 3 },
    { id: "page-marketplace", title: "Marketplace", slug: "marketplace", status: "active", seoTitle: "EUROSIA Partner Developer App Marketplace", seoDescription: "Discover external services and plugins that seamlessly click into EUROSIA.", seoKeywords: "microapps, plugins", sortOrder: 4 },
    { id: "page-pricing", title: "Pricing", slug: "pricing", status: "active", seoTitle: "Affordable Enterprise Packages & Licensing", seoDescription: "Pay-as-you-grow plans for teams of all sizes with local offline deployment support.", seoKeywords: "saas price, business billing, currency", sortOrder: 5 },
    { id: "page-about", title: "About", slug: "about", status: "active", seoTitle: "Our Foundational Mission", seoDescription: "Architecting the infrastructure that empowers contemporary enterprise worldwide.", seoKeywords: "eurosia team, tech vision", sortOrder: 6 },
    { id: "page-contact", title: "Contact", slug: "contact", status: "active", seoTitle: "Get in Touch with Systems Experts", seoDescription: "Discuss your company deployment and multi-tenant requirements with us.", seoKeywords: "customer support, sales inquiry", sortOrder: 7 }
  ],
  sections: [
    {
      id: "sec-hero",
      pageId: "page-home",
      type: "hero",
      title: "Your Complete Business Operating System",
      subtitle: "One Platform. One Login. Unlimited Business Solutions.",
      content: {
        description: "EUROSIA App Ecosystem brings ERP, CRM, Accounting, AI, Communication, Fintech, Cybersecurity, eCommerce and Industry Solutions into one powerful platform.",
        ctaText: "Start Free Trial",
        secondaryCtaText: "Explore Apps",
        trustedStat: "5,000+ Businesses",
        countriesStat: "15+ Countries",
        uptimeStat: "99.9% Uptime Guaranteed"
      },
      status: "active",
      sortOrder: 1
    },
    {
      id: "sec-layers",
      pageId: "page-home",
      type: "layers",
      title: "Built on a Strong Foundation",
      subtitle: "POWERFUL TECHNOLOGY LAYERS",
      content: {
        layers: [
          { name: "Business Management Layer", desc: "ERP, CRM, Inventory, Procurement, HR, Payroll & Projects", icon: "Building2" },
          { name: "Artificial Intelligence Layer", desc: "AI Chatbots, Voice Agents, Automation, Predictive Analytics", icon: "Bot" },
          { name: "Communication Layer", desc: "Cloud PBX, IVR, Omnichannel, Call Center, WhatsApp", icon: "PhoneCall" },
          { name: "Fintech Layer", desc: "Accounting, Billing, Payment Reminders, Cash Flow Management", icon: "DollarSign" },
          { name: "Cybersecurity Layer", desc: "Threat Monitoring, Vulnerability Assessment, Security Operations", icon: "Shield" },
          { name: "Industry Solutions Layer", desc: "Healthcare, Retail, Construction, Agriculture & Many More", icon: "Globe" }
        ]
      },
      status: "active",
      sortOrder: 2
    },
    {
      id: "sec-steps",
      pageId: "page-home",
      type: "steps",
      title: "Simple Steps to Complete Business Management",
      subtitle: "HOW EUROSIA APP ECOSYSTEM WORKS",
      content: {
        steps: [
          { number: "01", name: "Explore", action: "Visit Website", detail: "Browse the ecosystem" },
          { number: "02", name: "Create Account", action: "Register User", detail: "Sign up in minutes" },
          { number: "03", name: "Create Company", action: "Setup Company", detail: "Set up your tenant organization" },
          { number: "04", name: "Choose Apps", action: "Select & Install", detail: "Pick your custom suite" },
          { number: "05", name: "Activate License", action: "Secure Activation", detail: "Activate your terminal license" },
          { number: "06", name: "Use Dashboard", action: "Manage Everyday", detail: "Monitor logs and charts" },
          { number: "07", name: "Work Offline", action: "Save Locally", detail: "Work without active internet" },
          { number: "08", name: "Auto Sync", action: "Re-establish Cloud", detail: "Seamless data merge" },
          { number: "09", name: "Scale & Grow", action: "Add More Apps", detail: "Add users & operations" }
        ]
      },
      status: "active",
      sortOrder: 3
    }
  ],
  pricingPlans: [
    {
      id: "p-starter",
      name: "Starter",
      priceMonthly: 1990,
      priceYearly: 19100,
      period: "monthly",
      description: "Perfect for small businesses",
      features: [
        "Up to 5 Users",
        "5 Apps Included",
        "5GB Cloud Storage",
        "Email Support",
        "Offline-capable working core"
      ],
      badge: "Best for Solo",
      status: "active",
      sortOrder: 1
    },
    {
      id: "p-business",
      name: "Business",
      priceMonthly: 4990,
      priceYearly: 47900,
      period: "monthly",
      description: "For growing businesses",
      features: [
        "Up to 20 Users",
        "20 Apps Included",
        "20GB Cloud Storage",
        "Priority Support",
        "Database sync & conflict control",
        "Advanced RBAC Matrix"
      ],
      badge: "Popular Selection",
      status: "active",
      sortOrder: 2
    },
    {
      id: "p-enterprise",
      name: "Enterprise",
      priceMonthly: 12990,
      priceYearly: 124700,
      period: "monthly",
      description: "For large organizations",
      features: [
        "Unlimited Users",
        "Unlimited Apps",
        "100GB Cloud Storage",
        "24/7 Premium Support",
        "Dedicated Server Deployment",
        "Biometric device token mapping"
      ],
      badge: "Full Scale System",
      status: "active",
      sortOrder: 3
    },
    {
      id: "p-whitelabel",
      name: "White Label",
      priceMonthly: 0,
      priceYearly: 0,
      period: "custom",
      description: "For resellers & agencies",
      features: [
        "White Label Branding",
        "Custom Domain",
        "Dedicated Support",
        "Revenue Sharing",
        "Whitelabeled binary builder"
      ],
      badge: "Corporate Partner",
      status: "active",
      sortOrder: 4
    }
  ],
  paymentMethods: [
    {
      id: "pay-stripe",
      name: "Stripe",
      provider: "stripe",
      isActive: true,
      logo: "CreditCard",
      mode: "sandbox",
      apiKey: "sk_test_mock...",
      currency: "USD",
      rate: 2.9,
      instruction: "Process international visa and mastercards instantly.",
      sortOrder: 1
    },
    {
      id: "pay-bkash",
      name: "bKash",
      provider: "bkash",
      isActive: true,
      logo: "Smartphone",
      mode: "sandbox",
      merchantId: "BKASH_MOCK_MERCH_012",
      currency: "BDT",
      rate: 1.85,
      instruction: "Easy mobile wallet payments directly in Bangladesh.",
      sortOrder: 2
    },
    {
      id: "pay-nagad",
      name: "Nagad",
      provider: "nagad",
      isActive: true,
      logo: "Smartphone",
      mode: "sandbox",
      merchantId: "NAG_MOCK_7719",
      currency: "BDT",
      rate: 1.5,
      instruction: "Dynamic Government mobile financing wallet system.",
      sortOrder: 3
    },
    {
      id: "pay-manual",
      name: "Bank Transfer",
      provider: "bank",
      isActive: true,
      logo: "Building",
      mode: "live",
      instruction: "Transfer directly to Eurosia Tech Ltd, Account: 0041-01129-9917-882. Central Bank Routing.",
      currency: "BDT",
      rate: 0,
      sortOrder: 4
    }
  ],
  transactions: [
    {
      id: "tx-1",
      transactionId: "TXN_77419A9B",
      companyId: "c-1",
      userId: "u-3",
      packageId: "p-business",
      amount: 4990,
      status: "success",
      paymentMethodId: "pay-bkash",
      createdAt: new Date(Date.now() - 48000000).toISOString()
    },
    {
      id: "tx-2",
      transactionId: "TXN_88129B2C",
      companyId: "c-1",
      userId: "u-3",
      packageId: "p-business",
      amount: 4990,
      status: "success",
      paymentMethodId: "pay-stripe",
      createdAt: new Date().toISOString()
    }
  ],
  auditLogs: [
    { id: "log-1", userId: "u-1", userName: "Super Owner Admin", companyId: "c-owner", action: "SU_LOGIN", details: "Logged into root control node", ip: "127.0.0.1", deviceFingerprint: "FINGERPRINT_OWNER_TERMINAL", createdAt: new Date(Date.now() - 100000).toISOString() },
    { id: "log-2", userId: "u-3", userName: "John Doe", companyId: "c-1", action: "LICENSE_PULL", details: "Acme Corp requested and merged license configuration EUR-ACME-8F2B-9871-X99", ip: "203.21.14.77", deviceFingerprint: "FINGERPRINT_WEB_PREVIEW_USER", createdAt: new Date(Date.now() - 50000).toISOString() }
  ],
  syncLogs: [
    { id: "sync-1", companyId: "c-1", userId: "u-3", deviceFingerprint: "FINGERPRINT_WEB_PREVIEW_USER", action: "push", status: "success", recordsSyncedCount: 42, details: "Pushed 42 local POS sales entries from offline SQLite block", createdAt: new Date(Date.now() - 120000).toISOString() },
    { id: "sync-2", companyId: "c-1", userId: "u-3", deviceFingerprint: "FINGERPRINT_WEB_PREVIEW_USER", action: "pull", status: "success", recordsSyncedCount: 4, details: "Downloaded core company security layers updates", createdAt: new Date().toISOString() }
  ],
  featureFlags: [
    { id: "flag-1", name: "AI Autoresolver", key: "ai_resolve", description: "Use Gemini to automatically resolve sync conflict logs", isEnabled: true, createdAt: new Date().toISOString() },
    { id: "flag-2", name: "White Label Module", key: "white_label", description: "Expose customizable theme configurations on customer portals", isEnabled: false, createdAt: new Date().toISOString() }
  ],
  plugins: [
    { id: "plug-pbx", name: "CloudPBX Integrator", key: "pbx_service", description: "Connect Asterisk/FreePBX instances to operational dashboard", isEnabled: true, version: "2.1.0", author: "Eurosia Labs" },
    { id: "plug-cyber", name: "Eurosia CyberSentinel", key: "cyber_sentinel", description: "Continuous network endpoint monitoring pipeline", isEnabled: true, version: "1.0.4", author: "Eurosia Security" }
  ],
  solutions: [
    {
      id: "sol-pos",
      name: "EUROSIA POS",
      slug: "eurosia-pos",
      category: "Retail & Commerce",
      description: "Complete POS ecosystem for restaurants, cafes, food courts, retail stores and multi-branch operations. Includes billing, inventory, kitchen display, CRM, loyalty programs, analytics and offline-first operation.",
      url: "https://eurosia.io/",
      openInNewTab: true,
      status: "active",
      sortOrder: 1,
      icon: "ShoppingBag"
    },
    {
      id: "sol-erp",
      name: "Eurosia ERP Solution",
      slug: "erp-solution",
      category: "Enterprise ERP",
      description: "Enterprise resource planning encompassing HR, payroll, procurement, asset manager, and advanced double-entry general ledgers.",
      url: "https://eurosia.io/",
      openInNewTab: true,
      status: "active",
      sortOrder: 2,
      icon: "Building2"
    },
    {
      id: "sol-care",
      name: "EUROSIA Care",
      slug: "eurosia-care",
      category: "Healthcare",
      description: "Digital Clinic & Healthcare Platform including appointment scheduling, patient records, and automated billing workflows.",
      url: "https://care.eurosia.app",
      openInNewTab: true,
      status: "active",
      sortOrder: 3,
      icon: "Activity"
    }
  ],
  themeSettings: {
    primaryColor: "#FF3D4F",
    secondaryColor: "#11135E",
    backgroundColor: "#02020A",
    logoUrl: "/assets/eurosia_logo.png",
    faviconUrl: "/favicon.ico",
    typographyPairing: "Inter-SpaceGrotesk",
    layoutWidth: "standard",
    defaultMode: "dark"
  },
  socialPlatforms: [
    { id: "soc-facebook", name: "Facebook", url: "https://www.facebook.com/EurosiaOfficial", icon: "Facebook", status: "active", sortOrder: 1 },
    { id: "soc-x", name: "X (Twitter)", url: "https://x.com/EurosiaOfficial", icon: "Twitter", status: "active", sortOrder: 2 },
    { id: "soc-linkedin", name: "LinkedIn", url: "https://linkedin.com/in/EurosiaOfficial", icon: "Linkedin", status: "active", sortOrder: 3 },
    { id: "soc-instagram", name: "Instagram", url: "https://www.instagram.com/EurosiaOfficial", icon: "Instagram", status: "active", sortOrder: 4 }
  ],
  customSolutionRequests: [],
  menus: [
    { id: "m-home", label: "Home", slug: "home", url: "/", sortOrder: 1, isEnabled: true },
    { id: "m-apps", label: "Apps", slug: "apps", url: "/apps", sortOrder: 2, isEnabled: true },
    { id: "m-solutions", label: "Solutions", slug: "solutions", url: "/solutions", sortOrder: 3, isEnabled: true },
    { id: "m-marketplace", label: "Marketplace", slug: "marketplace", url: "/marketplace", sortOrder: 4, isEnabled: true },
    { id: "m-pricing", label: "Pricing", slug: "pricing", url: "/pricing", sortOrder: 5, isEnabled: true },
    { id: "m-about", label: "About", slug: "about", url: "/about", sortOrder: 6, isEnabled: true },
    { id: "m-contact", label: "Contact", slug: "contact", url: "/contact", sortOrder: 7, isEnabled: true }
  ],
  forms: [
    {
      id: "f-contact",
      name: "Standard Contact Us",
      status: "active",
      fields: [
        { id: "fld-1", type: "text", label: "Full Name", required: true, placeholder: "e.g. John Doe" },
        { id: "fld-2", type: "email", label: "Email Address", required: true, placeholder: "e.g. john@company.com" },
        { id: "fld-3", type: "tel", label: "Phone Number", required: true, placeholder: "e.g. +88017..." },
        { id: "fld-4", type: "textarea", label: "Your Message", required: true, placeholder: "Describe your business needs..." }
      ],
      actionType: "crm_lead",
      actionValue: "sales_lead_pipeline"
    }
  ],
  whatsappRoutes: [
    { id: "wr-sales", department: "Enterprise ERP Sales", agentName: "Tanvir Rahman", phone: "+8801711408725", messageTemplate: "Hi Tanvir, I am interested in Eurosia ERP custom solution for my industry.", isEnabled: true, sortOrder: 1 },
    { id: "wr-support", department: "POS & Retail Support", agentName: "Mofizul Islam", phone: "+8801734567890", messageTemplate: "Hi Mofiz, I need immediate assistance or a demo for the Restaurant POS.", isEnabled: true, sortOrder: 2 },
    { id: "wr-ai", department: "AI Voice Solutions Desk", agentName: "AI Architect", phone: "+8801711408725", messageTemplate: "Hi Eurosia AI, I would like to setup an AI Agent for voice calling.", isEnabled: true, sortOrder: 3 }
  ],
  languages: [
    { id: "lang-en", languageCode: "en", name: "English", status: "active", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "lang-bn", languageCode: "bn", name: "Bengali (বাংলা)", status: "active", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "lang-ar", languageCode: "ar", name: "Arabic (العربية)", status: "active", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "lang-hi", languageCode: "hi", name: "Hindi (हिन्दी)", status: "active", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "lang-ur", languageCode: "ur", name: "Urdu (اردو)", status: "active", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "lang-es", languageCode: "es", name: "Spanish (Español)", status: "active", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "lang-fr", languageCode: "fr", name: "French (Français)", status: "active", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "lang-zh", languageCode: "zh-CN", name: "Chinese (简体中文)", status: "active", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "lang-ja", languageCode: "ja", name: "Japanese (日本語)", status: "active", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "lang-de", languageCode: "de", name: "German (Deutsch)", status: "active", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "lang-pt", languageCode: "pt", name: "Portuguese (Português)", status: "active", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "lang-ru", languageCode: "ru", name: "Russian (Русский)", status: "active", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "lang-tr", languageCode: "tr", name: "Turkish (Türkçe)", status: "active", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "lang-id", languageCode: "id", name: "Indonesian (Bahasa Indonesia)", status: "active", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "lang-ms", languageCode: "ms", name: "Malay (Bahasa Melayu)", status: "active", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
  ],
  translationKeys: [],
  translationValues: [],
  pageTranslations: [],
  menuTranslations: [],
  appTranslations: [],
  solutionTranslations: [],
  contacts: [
    {
      id: "bangladesh",
      country: "Bangladesh",
      label: "EUROSIA Bangladesh",
      title: "Bangladesh Office",
      addressLines: [
        "Eurosia",
        "144/5G, Matikata, Dhaka-1206, Bangladesh",
        "Near ECB Circle"
      ],
      phones: [
        "+880 1711-408725",
        "+880 1709-371514"
      ],
      telephones: [
        "+880 2 8711849",
        "+880 2 8715960"
      ],
      hotline: "09649-222222",
      whatsappNumbers: [
        "8801711408725",
        "8801709371514"
      ],
      email: "support@eurosia.com.bd",
      hours: "9:00 AM – 6:00 PM (GMT +6)",
      mapUrl: "https://maps.app.goo.gl/uogXdZRqTzaQYpfV6",
      directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=144%2F5G%2C+Matikata%2C+Dhaka-1206%2C+Bangladesh",
      mapButtonLabel: "View Bangladesh Office",
      status: "active",
      sortOrder: 1
    },
    {
      id: "malaysia",
      country: "Malaysia",
      label: "EUROSIA Malaysia",
      title: "Malaysia Office",
      addressLines: [
        "Shop No. 2, Block 3A",
        "City Garden Commercial Centre",
        "Taman Nirwana",
        "68000 Ampang",
        "Selangor Darul Ehsan, Malaysia"
      ],
      phones: [
        "+60 1021-81687"
      ],
      whatsappNumbers: [
        "8801711408725"
      ],
      email: "support@eurosia.com.bd",
      hours: "9:00 AM – 6:00 PM (GMT +8)",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Shop%20No.%202%20Block%203A%20City%20Garden%20Commercial%20Centre%20Taman%20Nirwana%2068000%20Ampang%20Selangor%20Malaysia",
      directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Shop+No.+2+Block+3A+City+Garden+Commercial+Centre+Taman+Nirwana+68000+Ampang+Selangor+Malaysia",
      mapButtonLabel: "View Malaysia Office",
      status: "active",
      sortOrder: 2
    }
  ],
  blogs: [
    {
      id: "blog-1",
      title: "Unifying Your SaaS Operations: The Power of an Ecosystem",
      slug: "unifying-saas-operations-ecosystem",
      content: "## The Challenges of Modern SaaS Fragmentation\n\nMany expanding enterprises are overwhelmed by utilizing distinct apps for accounting, CRM, POS, and communications. This post outlines how EUROSIA App Ecosystem resolves fragmentation with unified, offline-first syncing technology...",
      excerpt: "Why running fragmented business software is costing you millions, and how a unified operating ecosystem solves it.",
      category: "Ecosystem Strategy",
      author: "Eurosia Operations Master",
      image: "/assets/banner_hero.jpg",
      status: "published",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],
  notifications: [
    {
      id: "n-1",
      title: "Ecosystem Core Synchronized",
      message: "The local database successfully synchronized with the central PostgreSQL cloud. Normal zero-latency operational state active.",
      type: "success",
      isRead: false,
      createdAt: new Date().toISOString()
    },
    {
      id: "n-2",
      title: "New Custom Project Proposal",
      message: "Lead John Doe of Acme Corp requested custom Odoo POS integration under custom builder requests.",
      type: "info",
      isRead: false,
      createdAt: new Date().toISOString()
    }
  ],
  pwaSettings: {
    appName: "EUROSIA App Ecosystem",
    appShortName: "EUROSIA",
    themeColor: "#FF3D4F",
    backgroundColor: "#02020A",
    appIconUrl: "/assets/eurosia_logo.png",
    splashScreenUrl: "/assets/splash_screen_mock.png",
    manifestSettings: "{\n  \"name\": \"EUROSIA App Ecosystem\",\n  \"short_name\": \"EUROSIA\",\n  \"theme_color\": \"#FF3D4F\",\n  \"background_color\": \"#02020A\",\n  \"display\": \"standalone\",\n  \"orientation\": \"any\"\n}"
  },
  media: [
    { id: "med-1", url: "/assets/eurosia_logo.png", name: "eurosia_logo.png", folder: "/logos", size: "12 KB", createdAt: new Date().toISOString() },
    { id: "med-2", url: "/assets/acme_logo.png", name: "acme_logo.png", folder: "/logos", size: "8 KB", createdAt: new Date().toISOString() },
    { id: "med-3", url: "/assets/banner_hero.jpg", name: "banner_hero.jpg", folder: "/banners", size: "245 KB", createdAt: new Date().toISOString() },
    { id: "med-4", url: "/assets/brochure.pdf", name: "eurosia_e_brochure_v2.pdf", folder: "/documents", size: "1.4 MB", createdAt: new Date().toISOString() }
  ]
};

export function getDatabase(): DatabaseState {
  if (dbState) return dbState;

  if (fs.existsSync(DB_FILE)) {
    try {
      const p = fs.readFileSync(DB_FILE, 'utf-8');
      dbState = JSON.parse(p);
      if (dbState) {
        if (!dbState.customSolutionRequests) dbState.customSolutionRequests = [];
        if (!dbState.menus) dbState.menus = [...INITIAL_STATE.menus!];
        if (!dbState.forms) dbState.forms = [...INITIAL_STATE.forms!];
        if (!dbState.whatsappRoutes) dbState.whatsappRoutes = [...INITIAL_STATE.whatsappRoutes!];
        if (!dbState.languages) dbState.languages = [...INITIAL_STATE.languages!];
        if (!dbState.translationKeys) dbState.translationKeys = [];
        if (!dbState.translationValues) dbState.translationValues = [];
        if (!dbState.pageTranslations) dbState.pageTranslations = [];
        if (!dbState.menuTranslations) dbState.menuTranslations = [];
        if (!dbState.appTranslations) dbState.appTranslations = [];
        if (!dbState.solutionTranslations) dbState.solutionTranslations = [];
        if (!dbState.contacts) dbState.contacts = [...INITIAL_STATE.contacts!];
        if (!dbState.blogs) dbState.blogs = [...INITIAL_STATE.blogs!];
        if (!dbState.notifications) dbState.notifications = [...INITIAL_STATE.notifications!];
        if (!dbState.pwaSettings) dbState.pwaSettings = { ...INITIAL_STATE.pwaSettings! };
        if (!dbState.socialPlatforms) dbState.socialPlatforms = [...INITIAL_STATE.socialPlatforms!];
        if (!dbState.media) dbState.media = [...INITIAL_STATE.media!];
        if (!dbState.themeSettings.faviconUrl) {
          dbState.themeSettings = {
            ...dbState.themeSettings,
            faviconUrl: INITIAL_STATE.themeSettings.faviconUrl,
            typographyPairing: INITIAL_STATE.themeSettings.typographyPairing,
            layoutWidth: INITIAL_STATE.themeSettings.layoutWidth,
            defaultMode: INITIAL_STATE.themeSettings.defaultMode
          };
        }
      }
      return dbState!;
    } catch (e) {
      console.error("Failed to load persistence JSON state, falling back to seed", e);
    }
  }

  dbState = { ...INITIAL_STATE };
  saveDatabase(dbState);
  return dbState;
}

export function saveDatabase(state: DatabaseState) {
  try {
    ensureDirectoryExistence(DB_FILE);
    fs.writeFileSync(DB_FILE, JSON.stringify(state, null, 2), 'utf-8');
    dbState = state;
  } catch (e) {
    console.error("Failed to write to persistent state DB storage", e);
  }
}

// Data Mutation Services matching API specs
export const dbService = {
  // Authentication queries
  findUserByEmail: (email: string): User | undefined => {
    return getDatabase().users.find(u => u.email.toLowerCase() === email.toLowerCase());
  },

  createUser: (userData: Partial<User>): User => {
    const db = getDatabase();
    const newUser: User = {
      id: `u-${Date.now()}`,
      email: userData.email || '',
      passwordHash: userData.passwordHash || '',
      name: userData.name || '',
      role: userData.role || 'Staff',
      companyId: userData.companyId || 'c-1',
      status: 'active',
      sortOrder: db.users.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    db.users.push(newUser);
    saveDatabase(db);
    return newUser;
  },

  updateUser: (id: string, updates: Partial<User>): User | null => {
    const db = getDatabase();
    const index = db.users.findIndex(u => u.id === id);
    if (index === -1) return null;
    db.users[index] = { ...db.users[index], ...updates, updatedAt: new Date().toISOString() };
    saveDatabase(db);
    return db.users[index];
  },

  deleteUser: (id: string): boolean => {
    const db = getDatabase();
    const index = db.users.findIndex(u => u.id === id);
    if (index === -1) return false;
    db.users.splice(index, 1);
    saveDatabase(db);
    return true;
  },

  // Website CMS APIs
  getPages: (): Page[] => {
    return getDatabase().pages.sort((a,b) => a.sortOrder - b.sortOrder);
  },

  getPageBySlug: (slug: string): Page | undefined => {
    return getDatabase().pages.find(p => p.slug === slug);
  },

  createPage: (pageData: Partial<Page>): Page => {
    const db = getDatabase();
    const newPage: Page = {
      id: `page-${Date.now()}`,
      title: pageData.title || 'Untitled Page',
      slug: pageData.slug || 'untitled',
      status: pageData.status || 'draft',
      seoTitle: pageData.seoTitle || pageData.title || '',
      seoDescription: pageData.seoDescription || '',
      seoKeywords: pageData.seoKeywords || '',
      sortOrder: pageData.sortOrder || db.pages.length + 1
    };
    db.pages.push(newPage);
    saveDatabase(db);
    return newPage;
  },

  updatePage: (id: string, updates: Partial<Page>): Page | null => {
    const db = getDatabase();
    const index = db.pages.findIndex(p => p.id === id);
    if (index === -1) return null;
    db.pages[index] = { ...db.pages[index], ...updates };
    saveDatabase(db);
    return db.pages[index];
  },

  deletePage: (id: string): boolean => {
    const db = getDatabase();
    // Also clear associated sections to keep relational correctness
    db.sections = db.sections.filter(s => s.pageId !== id);
    const index = db.pages.findIndex(p => p.id === id);
    if (index === -1) return false;
    db.pages.splice(index, 1);
    saveDatabase(db);
    return true;
  },

  // Page sections
  getSectionsByPage: (pageId: string): PageSection[] => {
    return getDatabase().sections.filter(s => s.pageId === pageId).sort((a,b) => a.sortOrder - b.sortOrder);
  },

  createSection: (secData: Partial<PageSection>): PageSection => {
    const db = getDatabase();
    const newSec: PageSection = {
      id: `sec-${Date.now()}`,
      pageId: secData.pageId || 'page-home',
      type: secData.type || 'hero',
      title: secData.title || '',
      subtitle: secData.subtitle || '',
      content: secData.content || {},
      status: secData.status || 'active',
      sortOrder: secData.sortOrder || db.sections.length + 1
    };
    db.sections.push(newSec);
    saveDatabase(db);
    return newSec;
  },

  updateSection: (id: string, updates: Partial<PageSection>): PageSection | null => {
    const db = getDatabase();
    const index = db.sections.findIndex(s => s.id === id);
    if (index === -1) return null;
    db.sections[index] = { ...db.sections[index], ...updates };
    saveDatabase(db);
    return db.sections[index];
  },

  deleteSection: (id: string): boolean => {
    const db = getDatabase();
    const index = db.sections.findIndex(s => s.id === id);
    if (index === -1) return false;
    db.sections.splice(index, 1);
    saveDatabase(db);
    return true;
  },

  // App Packages / Pricing
  getPricingPlans: (): PricingPlan[] => {
    return getDatabase().pricingPlans.sort((a,b) => a.sortOrder - b.sortOrder);
  },

  updatePricingPlan: (id: string, updates: Partial<PricingPlan>): PricingPlan | null => {
    const db = getDatabase();
    const index = db.pricingPlans.findIndex(p => p.id === id);
    if (index === -1) return null;
    db.pricingPlans[index] = { ...db.pricingPlans[index], ...updates };
    saveDatabase(db);
    return db.pricingPlans[index];
  },

  // App Modules
  getAppModules: (): AppModule[] => {
    return getDatabase().appModules.sort((a,b) => a.sortOrder - b.sortOrder);
  },

  createAppModule: (appData: Partial<AppModule>): AppModule => {
    const db = getDatabase();
    const newApp: AppModule = {
      id: `mod-${Date.now()}`,
      name: appData.name || '',
      description: appData.description || '',
      slug: appData.slug || '',
      icon: appData.icon || 'Box',
      category: appData.category || 'management',
      rating: appData.rating || 5.0,
      fee: appData.fee || 0,
      status: appData.status || 'active',
      sortOrder: appData.sortOrder || db.appModules.length + 1,
      externalUrl: appData.externalUrl || '',
      isExternal: !!appData.isExternal,
      openInNewTab: appData.openInNewTab !== false,
      screenshots: appData.screenshots || '',
      demoUrl: appData.demoUrl || '',
      downloadUrl: appData.downloadUrl || '',
      trialUrl: appData.trialUrl || '',
      trialDays: appData.trialDays || 0
    };
    db.appModules.push(newApp);
    saveDatabase(db);
    return newApp;
  },

  updateAppModule: (id: string, updates: Partial<AppModule>): AppModule | null => {
    const db = getDatabase();
    const index = db.appModules.findIndex(a => a.id === id);
    if (index === -1) return null;
    db.appModules[index] = { ...db.appModules[index], ...updates };
    saveDatabase(db);
    return db.appModules[index];
  },

  deleteAppModule: (id: string): boolean => {
    const db = getDatabase();
    const index = db.appModules.findIndex(a => a.id === id);
    if (index === -1) return false;
    db.appModules.splice(index, 1);
    saveDatabase(db);
    return true;
  },

  // Companies
  getCompanies: (): Company[] => {
    return getDatabase().companies;
  },

  createCompany: (data: Partial<Company>): Company => {
    const db = getDatabase();
    const newComp: Company = {
      id: `c-${Date.now()}`,
      name: data.name || '',
      status: data.status || 'active',
      logo: data.logo || '',
      domain: data.domain || '',
      email: data.email || '',
      packageId: data.packageId || 'p-starter',
      subscriptionStatus: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    db.companies.push(newComp);
    saveDatabase(db);
    return newComp;
  },

  updateCompany: (id: string, updates: Partial<Company>): Company | null => {
    const db = getDatabase();
    const index = db.companies.findIndex(c => c.id === id);
    if (index === -1) return null;
    db.companies[index] = { ...db.companies[index], ...updates, updatedAt: new Date().toISOString() };
    saveDatabase(db);
    return db.companies[index];
  },

  deleteCompany: (id: string): boolean => {
    const db = getDatabase();
    const index = db.companies.findIndex(c => c.id === id);
    if (index === -1) return false;
    db.companies.splice(index, 1);
    saveDatabase(db);
    return true;
  },

  // Licenses & devices
  getLicenses: (): License[] => {
    return getDatabase().licenses;
  },

  createLicense: (data: Partial<License>): License => {
    const db = getDatabase();
    const newLicense: License = {
      id: `lic-${Date.now()}`,
      licenseKey: data.licenseKey || `EUR-LIC-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      companyId: data.companyId || '',
      maxUsers: data.maxUsers || 5,
      maxDevices: data.maxDevices || 2,
      status: 'active',
      startDate: new Date().toISOString(),
      expiryDate: data.expiryDate || new Date(Date.now() + 365*24*60*60*1000).toISOString(),
      offlineAllowed: data.offlineAllowed !== undefined ? data.offlineAllowed : true,
      offlineGraceDays: data.offlineGraceDays || 15,
      lastValidatedDate: new Date().toISOString()
    };
    db.licenses.push(newLicense);
    saveDatabase(db);
    return newLicense;
  },

  updateLicense: (id: string, updates: Partial<License>): License | null => {
    const db = getDatabase();
    const index = db.licenses.findIndex(l => l.id === id);
    if (index === -1) return null;
    db.licenses[index] = { ...db.licenses[index], ...updates, lastValidatedDate: new Date().toISOString() };
    saveDatabase(db);
    return db.licenses[index];
  },

  // Payment Methods
  getPaymentMethods: (): PaymentMethod[] => {
    return getDatabase().paymentMethods.sort((a,b) => a.sortOrder - b.sortOrder);
  },

  createPaymentMethod: (data: Partial<PaymentMethod>): PaymentMethod => {
    const db = getDatabase();
    const newPM: PaymentMethod = {
      id: `pay-${Date.now()}`,
      name: data.name || '',
      provider: data.provider || 'stripe',
      isActive: data.isActive !== undefined ? data.isActive : true,
      logo: data.logo || 'CreditCard',
      mode: data.mode || 'sandbox',
      apiKey: data.apiKey,
      secretKey: data.secretKey,
      merchantId: data.merchantId,
      callbackUrl: data.callbackUrl,
      currency: data.currency || 'BDT',
      rate: data.rate || 0,
      instruction: data.instruction,
      sortOrder: data.sortOrder || db.paymentMethods.length + 1
    };
    db.paymentMethods.push(newPM);
    saveDatabase(db);
    return newPM;
  },

  updatePaymentMethod: (id: string, updates: Partial<PaymentMethod>): PaymentMethod | null => {
    const db = getDatabase();
    const index = db.paymentMethods.findIndex(p => p.id === id);
    if (index === -1) return null;
    db.paymentMethods[index] = { ...db.paymentMethods[index], ...updates };
    saveDatabase(db);
    return db.paymentMethods[index];
  },

  deletePaymentMethod: (id: string): boolean => {
    const db = getDatabase();
    const index = db.paymentMethods.findIndex(p => p.id === id);
    if (index === -1) return false;
    db.paymentMethods.splice(index, 1);
    saveDatabase(db);
    return true;
  },

  // Auditing
  addAuditLog: (log: Partial<AuditLog>) => {
    const db = getDatabase();
    const newLog: AuditLog = {
      id: `audit-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      userId: log.userId || 'system',
      userName: log.userName || 'System Action',
      companyId: log.companyId || 'c-owner',
      action: log.action || 'GENERAL_EVENT',
      details: log.details || '',
      ip: log.ip || '127.0.0.1',
      deviceFingerprint: log.deviceFingerprint || 'WEB_BROWSER',
      createdAt: new Date().toISOString()
    };
    db.auditLogs.unshift(newLog); // Prepend to show latest first
    if (db.auditLogs.length > 250) db.auditLogs.pop(); // Keep manageable size
    saveDatabase(db);
    return newLog;
  },

  getAuditLogs: (): AuditLog[] => {
    return getDatabase().auditLogs;
  },

  // Syncing Engine Simulation
  getSyncLogs: (): SyncLog[] => {
    return getDatabase().syncLogs;
  },

  addSyncLog: (log: Partial<SyncLog>) => {
    const db = getDatabase();
    const newLog: SyncLog = {
      id: `sync-${Date.now()}`,
      companyId: log.companyId || 'c-1',
      userId: log.userId || 'u-3',
      deviceFingerprint: log.deviceFingerprint || 'FINGERPRINT_WEB_PREVIEW_USER',
      action: log.action || 'pull',
      status: log.status || 'success',
      recordsSyncedCount: log.recordsSyncedCount || 0,
      details: log.details || '',
      createdAt: new Date().toISOString()
    };
    db.syncLogs.unshift(newLog);
    if (db.syncLogs.length > 250) db.syncLogs.pop();
    saveDatabase(db);
    return newLog;
  },

  // Solutions Management
  getSolutions: (): Solution[] => {
    const db = getDatabase();
    if (!db.solutions) {
      db.solutions = [];
      saveDatabase(db);
    }
    return db.solutions.sort((a,b) => a.sortOrder - b.sortOrder);
  },

  createSolution: (solData: Partial<Solution>): Solution => {
    const db = getDatabase();
    if (!db.solutions) db.solutions = [];
    const newSol: Solution = {
      id: `sol-${Date.now()}`,
      name: solData.name || '',
      slug: solData.slug || '',
      category: solData.category || '',
      description: solData.description || '',
      url: solData.url || '',
      openInNewTab: solData.openInNewTab !== undefined ? solData.openInNewTab : true,
      status: solData.status || 'active',
      sortOrder: solData.sortOrder || db.solutions.length + 1,
      icon: solData.icon || 'ShoppingBag'
    };
    db.solutions.push(newSol);
    saveDatabase(db);
    return newSol;
  },

  updateSolution: (id: string, updates: Partial<Solution>): Solution | null => {
    const db = getDatabase();
    if (!db.solutions) db.solutions = [];
    const index = db.solutions.findIndex(s => s.id === id);
    if (index === -1) return null;
    db.solutions[index] = { ...db.solutions[index], ...updates };
    saveDatabase(db);
    return db.solutions[index];
  },

  deleteSolution: (id: string): boolean => {
    const db = getDatabase();
    if (!db.solutions) db.solutions = [];
    const index = db.solutions.findIndex(s => s.id === id);
    if (index === -1) return false;
    db.solutions.splice(index, 1);
    saveDatabase(db);
    return true;
  },

  // Custom Solution Requests
  getCustomSolutionRequests: (): CustomSolutionRequest[] => {
    const db = getDatabase();
    if (!db.customSolutionRequests) db.customSolutionRequests = [];
    return db.customSolutionRequests.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  createCustomSolutionRequest: (data: Partial<CustomSolutionRequest>): CustomSolutionRequest => {
    const db = getDatabase();
    if (!db.customSolutionRequests) db.customSolutionRequests = [];
    const newRequest: CustomSolutionRequest = {
      id: `req-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: data.name || '',
      company: data.company || '',
      phone: data.phone || '',
      email: data.email || '',
      country: data.country || '',
      industry: data.industry || '',
      service_type: data.service_type || '',
      budget: data.budget || '',
      description: data.description || '',
      attachment_url: data.attachment_url,
      status: data.status || 'pending',
      created_at: new Date().toISOString()
    };
    db.customSolutionRequests.push(newRequest);
    saveDatabase(db);
    return newRequest;
  },

  updateCustomSolutionRequest: (id: string, updates: Partial<CustomSolutionRequest>): CustomSolutionRequest | null => {
    const db = getDatabase();
    if (!db.customSolutionRequests) db.customSolutionRequests = [];
    const index = db.customSolutionRequests.findIndex(r => r.id === id);
    if (index === -1) return null;
    db.customSolutionRequests[index] = { ...db.customSolutionRequests[index], ...updates };
    saveDatabase(db);
    return db.customSolutionRequests[index];
  },

  deleteCustomSolutionRequest: (id: string): boolean => {
    const db = getDatabase();
    if (!db.customSolutionRequests) db.customSolutionRequests = [];
    const index = db.customSolutionRequests.findIndex(r => r.id === id);
    if (index === -1) return false;
    db.customSolutionRequests.splice(index, 1);
    saveDatabase(db);
    return true;
  },

  // Menus
  getMenus: (): NavigationMenu[] => {
    const db = getDatabase();
    if (!db.menus) db.menus = [];
    return db.menus.sort((a, b) => a.sortOrder - b.sortOrder);
  },

  createMenu: (data: Partial<NavigationMenu>): NavigationMenu => {
    const db = getDatabase();
    if (!db.menus) db.menus = [];
    const newMenu: NavigationMenu = {
      id: `m-${Date.now()}`,
      label: data.label || 'New Link',
      slug: data.slug || 'slug',
      icon: data.icon || 'Globe',
      sortOrder: data.sortOrder || db.menus.length + 1,
      isEnabled: data.isEnabled !== undefined ? data.isEnabled : true,
      url: data.url || '/'
    };
    db.menus.push(newMenu);
    saveDatabase(db);
    return newMenu;
  },

  updateMenu: (id: string, updates: Partial<NavigationMenu>): NavigationMenu | null => {
    const db = getDatabase();
    if (!db.menus) db.menus = [];
    const idx = db.menus.findIndex(m => m.id === id);
    if (idx === -1) return null;
    db.menus[idx] = { ...db.menus[idx], ...updates };
    saveDatabase(db);
    return db.menus[idx];
  },

  deleteMenu: (id: string): boolean => {
    const db = getDatabase();
    if (!db.menus) db.menus = [];
    const idx = db.menus.findIndex(m => m.id === id);
    if (idx === -1) return false;
    db.menus.splice(idx, 1);
    saveDatabase(db);
    return true;
  },

  // Forms
  getForms: (): CmsForm[] => {
    const db = getDatabase();
    if (!db.forms) db.forms = [];
    return db.forms;
  },

  createForm: (data: Partial<CmsForm>): CmsForm => {
    const db = getDatabase();
    if (!db.forms) db.forms = [];
    const newForm: CmsForm = {
      id: `f-${Date.now()}`,
      name: data.name || 'New Registration Form',
      status: data.status || 'active',
      fields: data.fields || [],
      actionType: data.actionType || 'crm_lead',
      actionValue: data.actionValue || 'sales_lead_pipeline'
    };
    db.forms.push(newForm);
    saveDatabase(db);
    return newForm;
  },

  updateForm: (id: string, updates: Partial<CmsForm>): CmsForm | null => {
    const db = getDatabase();
    if (!db.forms) db.forms = [];
    const idx = db.forms.findIndex(f => f.id === id);
    if (idx === -1) return null;
    db.forms[idx] = { ...db.forms[idx], ...updates };
    saveDatabase(db);
    return db.forms[idx];
  },

  deleteForm: (id: string): boolean => {
    const db = getDatabase();
    if (!db.forms) db.forms = [];
    const idx = db.forms.findIndex(f => f.id === id);
    if (idx === -1) return false;
    db.forms.splice(idx, 1);
    saveDatabase(db);
    return true;
  },

  // WhatsApp Routes
  getWhatsAppRoutes: (): WhatsAppRoute[] => {
    const db = getDatabase();
    if (!db.whatsappRoutes) db.whatsappRoutes = [];
    return db.whatsappRoutes.sort((a, b) => a.sortOrder - b.sortOrder);
  },

  createWhatsAppRoute: (data: Partial<WhatsAppRoute>): WhatsAppRoute => {
    const db = getDatabase();
    if (!db.whatsappRoutes) db.whatsappRoutes = [];
    const newRoute: WhatsAppRoute = {
      id: `wr-${Date.now()}`,
      department: data.department || 'General Sales',
      agentName: data.agentName || 'Agent',
      phone: data.phone || '+8801711408725',
      messageTemplate: data.messageTemplate || 'Hi, I would like to get custom info.',
      isEnabled: data.isEnabled !== undefined ? data.isEnabled : true,
      sortOrder: data.sortOrder || db.whatsappRoutes.length + 1
    };
    db.whatsappRoutes.push(newRoute);
    saveDatabase(db);
    return newRoute;
  },

  updateWhatsAppRoute: (id: string, updates: Partial<WhatsAppRoute>): WhatsAppRoute | null => {
    const db = getDatabase();
    if (!db.whatsappRoutes) db.whatsappRoutes = [];
    const idx = db.whatsappRoutes.findIndex(w => w.id === id);
    if (idx === -1) return null;
    db.whatsappRoutes[idx] = { ...db.whatsappRoutes[idx], ...updates };
    saveDatabase(db);
    return db.whatsappRoutes[idx];
  },

  deleteWhatsAppRoute: (id: string): boolean => {
    const db = getDatabase();
    if (!db.whatsappRoutes) db.whatsappRoutes = [];
    const idx = db.whatsappRoutes.findIndex(w => w.id === id);
    if (idx === -1) return false;
    db.whatsappRoutes.splice(idx, 1);
    saveDatabase(db);
    return true;
  },

  // Localization & Translation management API hooks
  getLanguages: (): Language[] => {
    const db = getDatabase();
    if (!db.languages) db.languages = [];
    return db.languages;
  },

  createLanguage: (data: Partial<Language>): Language => {
    const db = getDatabase();
    if (!db.languages) db.languages = [];
    const newLang: Language = {
      id: `lang-${Date.now()}`,
      languageCode: data.languageCode || 'en',
      name: data.name || '',
      status: data.status || 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    db.languages.push(newLang);
    saveDatabase(db);
    return newLang;
  },

  updateLanguage: (id: string, updates: Partial<Language>): Language | null => {
    const db = getDatabase();
    if (!db.languages) db.languages = [];
    const idx = db.languages.findIndex(l => l.id === id);
    if (idx === -1) return null;
    db.languages[idx] = { ...db.languages[idx], ...updates, updatedAt: new Date().toISOString() };
    saveDatabase(db);
    return db.languages[idx];
  },

  getTranslationValues: (): TranslationValue[] => {
    const db = getDatabase();
    if (!db.translationValues) db.translationValues = [];
    return db.translationValues;
  },

  saveTranslationValue: (data: Partial<TranslationValue>): TranslationValue => {
    const db = getDatabase();
    if (!db.translationValues) db.translationValues = [];
    const key = data.key || '';
    const langCode = data.languageCode || 'en';
    const namespace = data.namespace || 'translation';
    
    const idx = db.translationValues.findIndex(tv => tv.key === key && tv.languageCode === langCode && tv.namespace === namespace);
    if (idx !== -1) {
      db.translationValues[idx] = {
        ...db.translationValues[idx],
        value: data.value || '',
        status: data.status || 'active',
        updatedAt: new Date().toISOString()
      };
      saveDatabase(db);
      return db.translationValues[idx];
    } else {
      const newTV: TranslationValue = {
        id: `tv-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        languageCode: langCode,
        key: key,
        value: data.value || '',
        namespace: namespace,
        status: data.status || 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      db.translationValues.push(newTV);
      saveDatabase(db);
      return newTV;
    }
  },

  getPageTranslations: (): PageTranslation[] => {
    const db = getDatabase();
    if (!db.pageTranslations) db.pageTranslations = [];
    return db.pageTranslations;
  },

  savePageTranslation: (data: Partial<PageTranslation>): PageTranslation => {
    const db = getDatabase();
    if (!db.pageTranslations) db.pageTranslations = [];
    const pid = data.pageId || '';
    const lcode = data.languageCode || 'en';
    const idx = db.pageTranslations.findIndex(pt => pt.pageId === pid && pt.languageCode === lcode);
    if (idx !== -1) {
      db.pageTranslations[idx] = {
        ...db.pageTranslations[idx],
        title: data.title || '',
        seoTitle: data.seoTitle || '',
        seoDescription: data.seoDescription || '',
        status: data.status || 'active',
        updatedAt: new Date().toISOString()
      };
      saveDatabase(db);
      return db.pageTranslations[idx];
    } else {
      const newPT: PageTranslation = {
        id: `pt-${Date.now()}`,
        pageId: pid,
        languageCode: lcode,
        title: data.title || '',
        seoTitle: data.seoTitle || '',
        seoDescription: data.seoDescription || '',
        status: data.status || 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      db.pageTranslations.push(newPT);
      saveDatabase(db);
      return newPT;
    }
  },

  getMenuTranslations: (): MenuTranslation[] => {
    const db = getDatabase();
    if (!db.menuTranslations) db.menuTranslations = [];
    return db.menuTranslations;
  },

  saveMenuTranslation: (data: Partial<MenuTranslation>): MenuTranslation => {
    const db = getDatabase();
    if (!db.menuTranslations) db.menuTranslations = [];
    const mid = data.menuId || '';
    const lcode = data.languageCode || 'en';
    const idx = db.menuTranslations.findIndex(mt => mt.menuId === mid && mt.languageCode === lcode);
    if (idx !== -1) {
      db.menuTranslations[idx] = {
        ...db.menuTranslations[idx],
        label: data.label || '',
        status: data.status || 'active',
        updatedAt: new Date().toISOString()
      };
      saveDatabase(db);
      return db.menuTranslations[idx];
    } else {
      const newMT: MenuTranslation = {
        id: `mt-${Date.now()}`,
        menuId: mid,
        languageCode: lcode,
        label: data.label || '',
        status: data.status || 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      db.menuTranslations.push(newMT);
      saveDatabase(db);
      return newMT;
    }
  },

  // Contacts CRUD
  getContacts: (): ContactOffice[] => {
    const db = getDatabase();
    if (!db.contacts) db.contacts = [];
    return db.contacts.sort((a,b) => a.sortOrder - b.sortOrder);
  },

  createContact: (data: Partial<ContactOffice>): ContactOffice => {
    const db = getDatabase();
    if (!db.contacts) db.contacts = [];
    const newContact: ContactOffice = {
      id: data.id || `contact-${Date.now()}`,
      country: data.country || '',
      label: data.label || '',
      title: data.title || '',
      addressLines: data.addressLines || [],
      phones: data.phones || [],
      telephones: data.telephones || [],
      hotline: data.hotline || '',
      whatsappNumbers: data.whatsappNumbers || [],
      email: data.email || '',
      hours: data.hours || '',
      mapUrl: data.mapUrl || '',
      directionsUrl: data.directionsUrl || '',
      mapButtonLabel: data.mapButtonLabel || 'View Office',
      status: data.status || 'active',
      sortOrder: data.sortOrder || db.contacts.length + 1
    };
    db.contacts.push(newContact);
    saveDatabase(db);
    return newContact;
  },

  updateContact: (id: string, updates: Partial<ContactOffice>): ContactOffice | null => {
    const db = getDatabase();
    if (!db.contacts) db.contacts = [];
    const idx = db.contacts.findIndex(c => c.id === id);
    if (idx === -1) return null;
    db.contacts[idx] = { ...db.contacts[idx], ...updates };
    saveDatabase(db);
    return db.contacts[idx];
  },

  deleteContact: (id: string): boolean => {
    const db = getDatabase();
    if (!db.contacts) db.contacts = [];
    const idx = db.contacts.findIndex(c => c.id === id);
    if (idx === -1) return false;
    db.contacts.splice(idx, 1);
    saveDatabase(db);
    return true;
  },

  // Blogs CRUD
  getBlogs: (): Blog[] => {
    const db = getDatabase();
    if (!db.blogs) db.blogs = [];
    return db.blogs.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  createBlog: (data: Partial<Blog>): Blog => {
    const db = getDatabase();
    if (!db.blogs) db.blogs = [];
    const newBlog: Blog = {
      id: `blog-${Date.now()}`,
      title: data.title || '',
      slug: data.slug || `post-${Date.now()}`,
      content: data.content || '',
      excerpt: data.excerpt || '',
      category: data.category || 'General',
      author: data.author || 'Super Admin',
      image: data.image || '',
      status: data.status || 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    db.blogs.push(newBlog);
    saveDatabase(db);
    return newBlog;
  },

  updateBlog: (id: string, updates: Partial<Blog>): Blog | null => {
    const db = getDatabase();
    if (!db.blogs) db.blogs = [];
    const idx = db.blogs.findIndex(b => b.id === id);
    if (idx === -1) return null;
    db.blogs[idx] = { ...db.blogs[idx], ...updates, updatedAt: new Date().toISOString() };
    saveDatabase(db);
    return db.blogs[idx];
  },

  deleteBlog: (id: string): boolean => {
    const db = getDatabase();
    if (!db.blogs) db.blogs = [];
    const idx = db.blogs.findIndex(b => b.id === id);
    if (idx === -1) return false;
    db.blogs.splice(idx, 1);
    saveDatabase(db);
    return true;
  },

  // Notifications CRUD
  getNotifications: (): Notification[] => {
    const db = getDatabase();
    if (!db.notifications) db.notifications = [];
    return db.notifications.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  createNotification: (data: Partial<Notification>): Notification => {
    const db = getDatabase();
    if (!db.notifications) db.notifications = [];
    const newNotif: Notification = {
      id: `n-${Date.now()}`,
      title: data.title || 'System Notification',
      message: data.message || '',
      type: data.type || 'info',
      companyId: data.companyId,
      isRead: false,
      createdAt: new Date().toISOString()
    };
    db.notifications.push(newNotif);
    saveDatabase(db);
    return newNotif;
  },

  markNotificationRead: (id: string): boolean => {
    const db = getDatabase();
    if (!db.notifications) db.notifications = [];
    const idx = db.notifications.findIndex(n => n.id === id);
    if (idx === -1) return false;
    db.notifications[idx].isRead = true;
    saveDatabase(db);
    return true;
  },

  // PWA Settings CRUD
  getPwaSettings: (): PWASettings => {
    const db = getDatabase();
    if (!db.pwaSettings) {
      db.pwaSettings = {
        appName: "EUROSIA App Ecosystem",
        appShortName: "EUROSIA",
        themeColor: "#FF3D4F",
        backgroundColor: "#02020A",
        appIconUrl: "/assets/eurosia_logo.png",
        manifestSettings: "{}"
      };
    }
    return db.pwaSettings;
  },

  updatePwaSettings: (updates: Partial<PWASettings>): PWASettings => {
    const db = getDatabase();
    if (!db.pwaSettings) db.pwaSettings = { appName: '', appShortName: '', themeColor: '', backgroundColor: '', appIconUrl: '', manifestSettings: '{}' };
    db.pwaSettings = { ...db.pwaSettings, ...updates };
    saveDatabase(db);
    return db.pwaSettings;
  },

  // Media CRUD
  getMedia: (): any[] => {
    const db = getDatabase();
    if (!db.media) db.media = [];
    return db.media;
  },

  addMediaFile: (data: any): any => {
    const db = getDatabase();
    if (!db.media) db.media = [];
    const newMed = {
      id: `med-${Date.now()}`,
      url: data.url || '',
      name: data.name || 'unnamed',
      folder: data.folder || '/logos',
      size: data.size || '0 KB',
      createdAt: new Date().toISOString(),
      type: data.type || 'image/png'
    };
    db.media.push(newMed);
    saveDatabase(db);
    return newMed;
  },

  deleteMediaFile: (id: string): boolean => {
    const db = getDatabase();
    if (!db.media) db.media = [];
    const idx = db.media.findIndex(m => m.id === id);
    if (idx === -1) return false;
    db.media.splice(idx, 1);
    saveDatabase(db);
    return true;
  },

  // Roles Management
  getRoles: (): Role[] => {
    const db = getDatabase();
    if (!db.roles) db.roles = [];
    return db.roles;
  },

  createRole: (roleData: any): Role => {
    const db = getDatabase();
    if (!db.roles) db.roles = [];
    const newRole: Role = {
      id: roleData.id || `r-${Date.now()}`,
      name: roleData.name || 'Unnamed Role',
      permissions: roleData.permissions || [],
      status: roleData.status || 'active'
    };
    db.roles.push(newRole);
    saveDatabase(db);
    return newRole;
  },

  updateRole: (id: string, updates: any): Role | null => {
    const db = getDatabase();
    if (!db.roles) db.roles = [];
    const idx = db.roles.findIndex(r => r.id === id);
    if (idx === -1) return null;
    db.roles[idx] = { ...db.roles[idx], ...updates };
    saveDatabase(db);
    return db.roles[idx];
  },

  deleteRole: (id: string): boolean => {
    const db = getDatabase();
    if (!db.roles) db.roles = [];
    const idx = db.roles.findIndex(r => r.id === id);
    if (idx === -1) return false;
    db.roles.splice(idx, 1);
    saveDatabase(db);
    return true;
  },

  // Permissions Management
  getPermissions: (): Permission[] => {
    const db = getDatabase();
    if (!db.permissions) db.permissions = [];
    return db.permissions;
  },

  // Pricing Plan Multi-location Creation/Deletion
  createPricingPlan: (planData: any): PricingPlan => {
    const db = getDatabase();
    const newPlan: PricingPlan = {
      id: planData.id || `p-${Date.now()}`,
      name: planData.name || '',
      priceMonthly: planData.priceMonthly || 0,
      priceYearly: planData.priceYearly || 0,
      period: planData.period || 'monthly',
      description: planData.description || '',
      features: typeof planData.features === 'string' ? planData.features.split(',').map((f: string) => f.trim()) : (planData.features || []),
      badge: planData.badge || '',
      status: planData.status || 'active',
      sortOrder: planData.sortOrder || db.pricingPlans.length + 1
    };
    db.pricingPlans.push(newPlan);
    saveDatabase(db);
    return newPlan;
  },

  deletePricingPlan: (id: string): boolean => {
    const db = getDatabase();
    const idx = db.pricingPlans.findIndex(p => p.id === id);
    if (idx === -1) return false;
    db.pricingPlans.splice(idx, 1);
    saveDatabase(db);
    return true;
  },

  // Social Media Management
  getSocialPlatforms: (): SocialPlatform[] => {
    const db = getDatabase();
    if (!db.socialPlatforms) db.socialPlatforms = [];
    return db.socialPlatforms.sort((a,b) => a.sortOrder - b.sortOrder);
  },

  createSocialPlatform: (data: Partial<SocialPlatform>): SocialPlatform => {
    const db = getDatabase();
    if (!db.socialPlatforms) db.socialPlatforms = [];
    const newPlatform: SocialPlatform = {
      id: data.id || `soc-${Date.now()}`,
      name: data.name || '',
      url: data.url || '',
      icon: data.icon || 'Globe',
      status: data.status || 'active',
      sortOrder: typeof data.sortOrder === 'number' ? data.sortOrder : db.socialPlatforms.length + 1
    };
    db.socialPlatforms.push(newPlatform);
    saveDatabase(db);
    return newPlatform;
  },

  updateSocialPlatform: (id: string, updates: Partial<SocialPlatform>): SocialPlatform | null => {
    const db = getDatabase();
    if (!db.socialPlatforms) db.socialPlatforms = [];
    const idx = db.socialPlatforms.findIndex(s => s.id === id);
    if (idx === -1) return null;
    db.socialPlatforms[idx] = { ...db.socialPlatforms[idx], ...updates };
    saveDatabase(db);
    return db.socialPlatforms[idx];
  },

  deleteSocialPlatform: (id: string): boolean => {
    const db = getDatabase();
    if (!db.socialPlatforms) db.socialPlatforms = [];
    const idx = db.socialPlatforms.findIndex(s => s.id === id);
    if (idx === -1) return false;
    db.socialPlatforms.splice(idx, 1);
    saveDatabase(db);
    return true;
  }
};

