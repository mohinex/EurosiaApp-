/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: string; // Super Admin, Company Admin, Manager, Accountant, Sales User, Support Agent, Staff, Custom Role
  companyId: string;
  status: 'active' | 'suspended';
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface Role {
  id: string;
  name: string;
  permissions: string[]; // List of permission keys
  status: 'active' | 'inactive';
}

export interface Permission {
  id: string;
  name: string;
  key: string;
  category: string;
}

export interface Company {
  id: string;
  name: string;
  status: 'active' | 'suspended' | 'expired';
  logo?: string;
  domain?: string;
  email: string;
  packageId: string;
  subscriptionStatus: 'active' | 'past_due' | 'canceled';
  createdAt: string;
  updatedAt: string;
}

export interface License {
  id: string;
  licenseKey: string;
  companyId: string;
  maxUsers: number;
  maxDevices: number;
  status: 'active' | 'expired' | 'blocked';
  startDate: string;
  expiryDate: string;
  offlineAllowed: boolean;
  offlineGraceDays: number;
  lastValidatedDate: string;
}

export interface Device {
  id: string;
  fingerprint: string;
  name: string;
  platform: string;
  companyId: string;
  userId: string;
  status: 'active' | 'blocked';
  lastActiveAt: string;
}

export interface AppModule {
  id: string;
  name: string;
  description: string;
  slug: string;
  icon: string; // Lucide icon identifier
  category: string; // "management" | "ai" | "comms" | "fintech" | "sec" | "industry"
  rating: number;
  fee: number;
  status: 'active' | 'inactive';
  sortOrder: number;
  externalUrl?: string;
  isExternal?: boolean;
  openInNewTab?: boolean;
  screenshots?: string; // Comma separated asset URLs
  demoUrl?: string;
  downloadUrl?: string;
  trialUrl?: string;
  trialDays?: number;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  status: 'active' | 'draft';
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  sortOrder: number;
}

export interface PageSection {
  id: string;
  pageId: string;
  type: 'hero' | 'features' | 'portfolio' | 'layers' | 'steps' | 'preview' | 'pricing' | 'cta' | 'footer' | 'faq';
  title: string;
  subtitle: string;
  content: any; // JSON string or structural object
  status: 'active' | 'inactive';
  sortOrder: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  period: 'monthly' | 'yearly' | 'custom';
  description: string;
  features: string[];
  badge?: string;
  status: 'active' | 'inactive';
  sortOrder: number;
}

export interface PaymentMethod {
  id: string;
  name: string;
  provider: 'stripe' | 'paypal' | 'bkash' | 'nagad' | 'rocket' | 'sslcommerz' | 'bank' | 'manual' | 'cash';
  isActive: boolean;
  logo: string;
  mode: 'sandbox' | 'live';
  apiKey?: string;
  secretKey?: string;
  merchantId?: string;
  callbackUrl?: string;
  currency: string;
  rate: number; // Fee percentage
  instruction?: string;
  sortOrder: number;
}

export interface PaymentTransaction {
  id: string;
  transactionId: string;
  companyId: string;
  userId: string;
  packageId: string;
  amount: number;
  status: 'pending' | 'success' | 'failed' | 'refunded';
  paymentMethodId: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  companyId: string;
  action: string;
  details: string;
  ip: string;
  deviceFingerprint: string;
  createdAt: string;
}

export interface SyncLog {
  id: string;
  companyId: string;
  userId: string;
  deviceFingerprint: string;
  action: 'push' | 'pull' | 'resolve';
  status: 'success' | 'failed' | 'conflict';
  recordsSyncedCount: number;
  details: string;
  createdAt: string;
}

export interface FeatureFlag {
  id: string;
  name: string;
  key: string;
  description: string;
  isEnabled: boolean;
  createdAt: string;
}

export interface Plugin {
  id: string;
  name: string;
  key: string;
  description: string;
  isEnabled: boolean;
  version: string;
  author: string;
}

export interface Solution {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  url: string;
  openInNewTab: boolean;
  status: 'active' | 'inactive';
  sortOrder: number;
  icon?: string;
}

export interface CustomSolutionRequest {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  country: string;
  industry: string;
  service_type: string;
  budget: string;
  description: string;
  attachment_url?: string;
  status: 'pending' | 'reviewed' | 'contacted' | 'completed' | string;
  created_at: string;
}

export interface NavigationMenu {
  id: string;
  label: string;
  slug: string;
  icon?: string;
  sortOrder: number;
  isEnabled: boolean;
  url: string;
  parentMenuId?: string;
}

export interface CmsForm {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  fields: {
    id: string;
    type: 'text' | 'textarea' | 'number' | 'email' | 'tel' | 'select' | 'checkbox';
    label: string;
    required: boolean;
    placeholder?: string;
    options?: string[]; // for select dropdown
  }[];
  actionType: 'whatsapp' | 'email' | 'crm_lead' | string;
  actionValue: string; // whatsapp number, email target, or route name
}

export interface WhatsAppRoute {
  id: string;
  department: string;
  agentName: string;
  phone: string;
  messageTemplate: string;
  isEnabled: boolean;
  sortOrder: number;
}

export interface Language {
  id: string;
  languageCode: string; // e.g. "en", "bn", "ar", etc.
  name: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface TranslationKey {
  id: string;
  key: string;
  namespace: string; // e.g. "translation"
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface TranslationValue {
  id: string;
  languageCode: string;
  key: string;
  value: string;
  namespace: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface PageTranslation {
  id: string;
  pageId: string;
  languageCode: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface MenuTranslation {
  id: string;
  menuId: string;
  languageCode: string;
  label: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface AppTranslation {
  id: string;
  appId: string;
  languageCode: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface SolutionTranslation {
  id: string;
  solutionId: string;
  languageCode: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}export interface ContactOffice {
  id: string;
  country: string;
  label: string;
  title: string;
  addressLines: string[];
  phones: string[];
  telephones?: string[];
  hotline?: string;
  whatsappNumbers: string[];
  email: string;
  hours: string;
  mapUrl: string;
  directionsUrl: string;
  mapButtonLabel: string;
  status: 'active' | 'inactive';
  sortOrder: number;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  author: string;
  image?: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'danger';
  companyId?: string; // specific, or global if blank
  isRead: boolean;
  createdAt: string;
}

export interface PWASettings {
  appName: string;
  appShortName: string;
  themeColor: string;
  backgroundColor: string;
  appIconUrl: string;
  splashScreenUrl?: string;
  manifestSettings: string; // JSON string
}

export interface SocialPlatform {
  id: string;
  name: string;
  url: string;
  icon: string; // e.g. Facebook, X, Linkedin, Instagram
  status: 'active' | 'inactive';
  sortOrder: number;
}


