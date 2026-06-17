/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SolutionFallbackType {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  url: string;
  openInNewTab: boolean;
  status: string;
  sortOrder: number;
  icon: string;
}

export interface PricingFallbackType {
  id: string;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  period: string;
  description: string;
  features: string[];
  badge: string;
  status: string;
  sortOrder: number;
}

export interface LayerFallbackType {
  name: string;
  desc: string;
  icon: string;
}

export interface StepFallbackType {
  number: string;
  name: string;
  action: string;
  detail: string;
}

export const fallbackSolutions: SolutionFallbackType[] = [
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
];

export const fallbackPricing: PricingFallbackType[] = [
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
];

export const fallbackLayers: LayerFallbackType[] = [
  { 
    name: "Business Management Layer", 
    desc: "Enterprise planning (ERP) systems bridging dynamic HR modules, project accounting boards, complex procurement parameters and financial logs.", 
    icon: "Building2" 
  },
  { 
    name: "Artificial Intelligence Layer", 
    desc: "Conversational voice integrations, real-time context chatbots, smart intent parsers and autonomous executive reports fueled by raw LLM API proxies.", 
    icon: "Bot" 
  },
  { 
    name: "Communication Layer", 
    desc: "Cloud PBX telecommunication, SIP registers, omnichannel live messenger hubs and automated phone dialers for continuous agent operations.", 
    icon: "PhoneCall" 
  },
  { 
    name: "Fintech Layer", 
    desc: "Secure double-entry accounting files, recurring invoices, transaction registers and dynamic localized payment adapters.", 
    icon: "DollarSign" 
  },
  { 
    name: "Cybersecurity Layer", 
    desc: "End-to-end device mapping tokens, active threat trackers, continuous audit logging files, and rigid encryption for localized data caches.", 
    icon: "Shield" 
  },
  { 
    name: "Industry Solutions Layer", 
    desc: "Specialized modules spanning digital healthcare clinic flows, smart retail registers, agriculture farming and real estate construction systems.", 
    icon: "Globe" 
  }
];

export const fallbackSteps: StepFallbackType[] = [
  { number: "01", name: "Visit Website", action: "Explore Suite", detail: "Browse the ecosystem and check modular apps" },
  { number: "02", name: "Create Account", action: "Register", detail: "Create system operator credentials" },
  { number: "03", name: "Create Company", action: "Tenant Setup", detail: "Configure your distinct business environment" },
  { number: "04", name: "Choose Apps", action: "Select Suite", detail: "Install retail, clinic, healthcare or comms" },
  { number: "05", name: "Activate License", action: "Secure Link", detail: "Validate license codes on local work terminals" },
  { number: "06", name: "Use Dashboard", action: "Manage Live", detail: "Track sales logs, audit metrics and voice lines" },
  { number: "07", name: "Work Offline", action: "Local Safe", detail: "Capture POS register transactions without active internet" },
  { number: "08", name: "Auto Sync Cloud", action: "Merge Data", detail: "Seamlessly push transactions to web nodes once online" },
  { number: "09", name: "Scale & Grow", action: "Add Nodes", detail: "Deploy more terminals, operators and custom branches" }
];
