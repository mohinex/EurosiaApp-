/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { dbService, getDatabase, saveDatabase } from './src/db/database.ts';

// Load environmental parameters
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "eurosia_super_secret_secure_key_2026";

const app = express();
const PORT = 3000;

// Content parsing middleware
app.use(express.json({ limit: '10mb' }));

// Static images/uploads mockup support
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Simple logging & safety checking middleware
app.use((req, res, next) => {
  // Set CORS headers for frame embedding safety in AI Studio
  res.setHeader('X-Frame-Options', 'ALLOWALL');
  next();
});

// Helper for security verification (RBAC validation using secure JWT signatures)
function verifyAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "No credentials provided" });
  }

  // Expect standard Bearer <jwt-token> format
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(412).json({ error: "Malformed authorization header structure" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    // Bind authenticated user properties to the request context
    (req as any).user = decoded;
    
    // Check role privilege constraints
    if (decoded.role !== 'Super Admin' && decoded.role !== 'Company Admin') {
      return res.status(403).json({ error: "Access denied. Requiring administrative privileges." });
    }
    
    next();
  } catch (err) {
    return res.status(401).json({ error: "Session expired or invalid authorization token" });
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PUBLIC GENERAL INFORMATION APIs
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

app.get('/api/site/settings', (req, res) => {
  try {
    const db = getDatabase();
    res.json({
      name: "EUROSIA App Ecosystem",
      description: "The Ecosystem-Powered Business Operating System for the Modern World",
      logoUrl: db.themeSettings.logoUrl,
      theme: db.themeSettings,
      socialPlatforms: dbService.getSocialPlatforms().filter(p => p.status === 'active')
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/site/social', (req, res) => {
  try {
    res.json(dbService.getSocialPlatforms().filter(p => p.status === 'active'));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/menus', (req, res) => {
  try {
    const pages = dbService.getPages().filter(p => p.status === 'active');
    const menuItems = pages.map(p => ({
      label: p.title,
      slug: p.slug,
      url: p.slug === 'home' ? '/' : `/${p.slug}`
    }));
    res.json({ menuItems });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/pages/:slug', (req, res) => {
  try {
    const { slug } = req.params;
    const page = dbService.getPageBySlug(slug);
    if (!page) {
      return res.status(404).json({ error: `CMS Page not found containing slug: ${slug}` });
    }
    const sections = dbService.getSectionsByPage(page.id).filter(s => s.status === 'active');
    res.json({ page, sections });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/sections/:pageId', (req, res) => {
  try {
    const { pageId } = req.params;
    const sections = dbService.getSectionsByPage(pageId);
    res.json(sections);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/apps', (req, res) => {
  try {
    const apps = dbService.getAppModules().filter(a => a.status === 'active');
    res.json(apps);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/solutions', (req, res) => {
  try {
    const solutions = dbService.getSolutions().filter(s => s.status === 'active');
    res.json(solutions);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/pricing', (req, res) => {
  try {
    const pricing = dbService.getPricingPlans().filter(p => p.status === 'active');
    res.json(pricing);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/footer', (req, res) => {
  res.json({
    brand: "EUROSIA App Ecosystem",
    baseline: "The Ecosystem-Powered Business Operating System for the Modern World",
    contact: {
      address: "House 15, Road 12, Sector 10, Uttara, Dhaka, Bangladesh",
      phone: "+880 1734 567890",
      email: "info@eurosia.app",
      website: "https://www.eurosia.app"
    },
    links: [
      {
        title: "Products",
        items: [
          { label: "All Apps", url: "/apps" },
          { label: "POS System", url: "/apps/eurosia-pos" },
          { label: "Cloud PBX", url: "/apps/eurosia-cloudpbx" },
          { label: "AI Solutions", url: "/apps/eurosia-ai-calling" },
          { label: "eCommerce", url: "/apps/eurosia-ecommerce-source" }
        ]
      },
      {
        title: "Solutions",
        items: [
          { label: "ERP Solution", url: "/solutions/erp" },
          { label: "CRM Solution", url: "/solutions/crm" },
          { label: "Healthcare", url: "/solutions/healthcare" },
          { label: "Retail & POS", url: "/solutions/retail" },
          { label: "Construction", url: "/solutions/construction" }
        ]
      },
      {
        title: "Company",
        items: [
          { label: "About Us", url: "/about" },
          { label: "Careers", url: "/careers" },
          { label: "Partners", url: "/partners" },
          { label: "News & Blog", url: "/blog" },
          { label: "Contact Us", url: "/contact" }
        ]
      }
    ]
  });
});

app.get('/api/seo/:pageSlug', (req, res) => {
  try {
    const page = dbService.getPageBySlug(req.params.pageSlug);
    if (!page) {
      return res.status(404).json({ error: "Page slug meta not found" });
    }
    res.json({
      title: page.seoTitle,
      description: page.seoDescription,
      keywords: page.seoKeywords
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MULTI-LANGUAGE TRANSLATION MANAGEMENT APIs
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

app.get('/api/i18n/languages', (req, res) => {
  try {
    const languages = dbService.getLanguages();
    res.json(languages);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/i18n/languages', verifyAdmin, (req, res) => {
  try {
    const { languageCode, name, status } = req.body;
    if (!languageCode || !name) {
      return res.status(400).json({ error: "Language code and name are required." });
    }
    const newLang = dbService.createLanguage({ languageCode, name, status: status || 'active' });
    res.json(newLang);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/i18n/languages/:id', verifyAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;
    const updated = dbService.updateLanguage(id, { name, status });
    if (!updated) {
      return res.status(404).json({ error: "Language code not found." });
    }
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/i18n/translations', (req, res) => {
  try {
    const translations = dbService.getTranslationValues();
    res.json(translations);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/i18n/translations', verifyAdmin, (req, res) => {
  try {
    const { languageCode, key, value, namespace, status } = req.body;
    if (!languageCode || !key) {
      return res.status(400).json({ error: "Language code and key are required." });
    }
    const saved = dbService.saveTranslationValue({ languageCode, key, value, namespace: namespace || 'translation', status: status || 'active' });
    res.json(saved);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/i18n/translations/bulk', verifyAdmin, (req, res) => {
  try {
    const { translations } = req.body; // array of translations
    if (!Array.isArray(translations)) {
      return res.status(400).json({ error: "Translations must be an array" });
    }
    const results = [];
    for (const item of translations) {
      const saved = dbService.saveTranslationValue({
        languageCode: item.languageCode,
        key: item.key,
        value: item.value,
        namespace: item.namespace || 'translation',
        status: item.status || 'active'
      });
      results.push(saved);
    }
    res.json({ success: true, count: results.length });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/i18n/pages', (req, res) => {
  try {
    const pages = dbService.getPageTranslations();
    res.json(pages);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/i18n/pages', verifyAdmin, (req, res) => {
  try {
    const { pageId, languageCode, title, seoTitle, seoDescription, status } = req.body;
    if (!pageId || !languageCode) {
      return res.status(400).json({ error: "pageId and languageCode are required." });
    }
    const saved = dbService.savePageTranslation({ pageId, languageCode, title, seoTitle, seoDescription, status: status || 'active' });
    res.json(saved);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/i18n/menus', (req, res) => {
  try {
    const menus = dbService.getMenuTranslations();
    res.json(menus);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/i18n/menus', verifyAdmin, (req, res) => {
  try {
    const { menuId, languageCode, label, status } = req.body;
    if (!menuId || !languageCode) {
      return res.status(400).json({ error: "menuId and languageCode are required." });
    }
    const saved = dbService.saveMenuTranslation({ menuId, languageCode, label, status: status || 'active' });
    res.json(saved);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/custom-solution-requests', (req, res) => {
  try {
    const { name, company, phone, email, country, industry, service_type, budget, description, attachment_url } = req.body;
    if (!name || !phone || !email || !service_type || !description) {
      return res.status(400).json({ error: "Required fields are missing. Make sure Name, Phone, Email, Service Type, and Description are provided." });
    }
    
    const requestItem = dbService.createCustomSolutionRequest({
      name,
      company,
      phone,
      email,
      country,
      industry,
      service_type,
      budget,
      description,
      attachment_url,
      status: 'pending'
    });

    // Write audit trail
    dbService.addAuditLog({
      userId: 'system',
      userName: name,
      action: 'CUSTOM_SOLUTION_REQUEST',
      details: `Submitted custom '${service_type}' project request. Budget range: ${budget}.`
    });

    res.status(201).json(requestItem);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to process custom solution request" });
  }
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// AUTHENTICATION APIs
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required to authenticate" });
    }

    const user = dbService.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "User profile not registered." });
    }

    // Secure bcrypt-hash password verification (with backward-compatible migration wrapper)
    let isValid = false;
    if (user.passwordHash.startsWith('$2')) {
      isValid = bcrypt.compareSync(password, user.passwordHash);
    } else {
      isValid = password === user.passwordHash;
      if (isValid) {
        // Auto migrate plain text keys to salted bcrypt hashes
        user.passwordHash = bcrypt.hashSync(password, 10);
        dbService.updateUser(user.id, { passwordHash: user.passwordHash });
      }
    }

    if (!isValid) {
      return res.status(401).json({ error: "Secure credentials mismatched." });
    }

    if (user.status === 'suspended') {
      return res.status(403).json({ error: "User account suspended. Please contact Super Admin." });
    }

    // Record login activity
    dbService.addAuditLog({
      userId: user.id,
      userName: user.name,
      companyId: user.companyId,
      action: "USER_LOGIN",
      details: `Successful logging into tenant realm: ${user.companyId}`,
      ip: req.ip || '127.0.0.1'
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, companyId: user.companyId },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        companyId: user.companyId
      }
    });

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Self-Registration Onboarding Endpoint for Trial/Demo Tenant Setup
app.post('/api/auth/register-tenant', (req, res) => {
  try {
    const { name, email, password, companyName, companyEmail, dbEngine, selectedApps } = req.body;

    if (!name || !email || !password || !companyName) {
      return res.status(400).json({ error: "Required fields name, email, password, companyName are missing." });
    }

    const existingUser = dbService.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "An account with this email address already possesses a database slice." });
    }

    // 1. Create Company
    const comp = dbService.createCompany({
      name: companyName,
      email: companyEmail || email,
      packageId: 'p-premium',
      status: 'active'
    });

    // 2. Hash Password
    const passwordHash = bcrypt.hashSync(password, 10);

    // 3. Create User with Company Admin role
    const newUser = dbService.createUser({
      email,
      name,
      passwordHash,
      role: 'Company Admin',
      companyId: comp.id,
      status: 'active'
    });

    // 4. Create License Key block
    const license = dbService.createLicense({
      companyId: comp.id,
      maxUsers: 15,
      maxDevices: 5,
      offlineAllowed: true,
      status: 'active'
    });

    // 5. Add custom audit trail
    dbService.addAuditLog({
      userId: newUser.id,
      userName: newUser.name,
      companyId: comp.id,
      action: "TENANT_REGISTER_TRIAL",
      details: `Self-registered free evaluation trial tenant under DB Engine: ${dbEngine || 'sqlite'}. Selected Initial Apps count: ${selectedApps?.length || 0}`,
      ip: req.ip || '127.0.0.1'
    });

    // 6. Generate immediate logged in access token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role, companyId: comp.id },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        companyId: comp.id
      },
      company: comp,
      license
    });

  } catch (err: any) {
    res.status(500).json({ error: err.message || "An issue was encountered establishing database partition." });
  }
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SUPER ADMIN MANAGEMENT APIs (PROXIED & PROTECTED)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

app.get('/api/admin/system-diagnostics', verifyAdmin, (req, res) => {
  const db = getDatabase();
  res.json({
    usersCount: db.users.length,
    companiesCount: db.companies.length,
    licensesCount: db.licenses.length,
    devicesCount: db.devices.length,
    appsCount: db.appModules.length,
    paymentMethodsCount: db.paymentMethods.length,
    transactionsTotalAmount: db.transactions.reduce((acc, t) => acc + t.amount, 0),
    auditLogsCount: db.auditLogs.length,
    activeFeatureFlags: db.featureFlags.filter(f => f.isEnabled).length
  });
});

// CMS Page Operations
app.post('/api/admin/pages', verifyAdmin, (req, res) => {
  const page = dbService.createPage(req.body);
  dbService.addAuditLog({
    userId: (req as any).user.id,
    userName: "Admin CMS Control",
    companyId: "c-owner",
    action: "PAGE_CREATE",
    details: `Created CMS Page metadata with slug: ${page.slug}`
  });
  res.status(201).json(page);
});

app.patch('/api/admin/pages/:id', verifyAdmin, (req, res) => {
  const page = dbService.updatePage(req.params.id, req.body);
  if (!page) return res.status(404).json({ error: "CMS page record missing" });
  res.json(page);
});

app.delete('/api/admin/pages/:id', verifyAdmin, (req, res) => {
  const status = dbService.deletePage(req.params.id);
  res.json({ success: status });
});

// Section Operations
app.post('/api/admin/sections', verifyAdmin, (req, res) => {
  const section = dbService.createSection(req.body);
  res.status(201).json(section);
});

app.patch('/api/admin/sections/:id', verifyAdmin, (req, res) => {
  const sec = dbService.updateSection(req.params.id, req.body);
  if (!sec) return res.status(404).json({ error: "Section not found" });
  res.json(sec);
});

app.delete('/api/admin/sections/:id', verifyAdmin, (req, res) => {
  const status = dbService.deleteSection(req.params.id);
  res.json({ success: status });
});

// Modular Apps operations
app.post('/api/admin/apps', verifyAdmin, (req, res) => {
  const app = dbService.createAppModule(req.body);
  res.status(201).json(app);
});

app.patch('/api/admin/apps/:id', verifyAdmin, (req, res) => {
  const app = dbService.updateAppModule(req.params.id, req.body);
  if (!app) return res.status(404).json({ error: "App Module code missing" });
  res.json(app);
});

app.delete('/api/admin/apps/:id', verifyAdmin, (req, res) => {
  const success = dbService.deleteAppModule(req.params.id);
  res.json({ success });
});

// Dynamic Solutions operations
app.get('/api/admin/solutions', verifyAdmin, (req, res) => {
  res.json(dbService.getSolutions());
});

app.post('/api/admin/solutions', verifyAdmin, (req, res) => {
  const sol = dbService.createSolution(req.body);
  dbService.addAuditLog({
    userId: (req as any).user.id,
    userName: (req as any).user.name || "Admin Solutions Control",
    companyId: "c-owner",
    action: "SOLUTION_CREATE",
    details: `Created Solution card: ${sol.name}`
  });
  res.status(201).json(sol);
});

app.patch('/api/admin/solutions/:id', verifyAdmin, (req, res) => {
  const sol = dbService.updateSolution(req.params.id, req.body);
  if (!sol) return res.status(404).json({ error: "Solution target not found" });
  res.json(sol);
});

app.delete('/api/admin/solutions/:id', verifyAdmin, (req, res) => {
  const success = dbService.deleteSolution(req.params.id);
  res.json({ success });
});

// Custom Solution Requests Management (Admin)
app.get('/api/admin/custom-solution-requests', verifyAdmin, (req, res) => {
  try {
    res.json(dbService.getCustomSolutionRequests());
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/admin/custom-solution-requests/:id', verifyAdmin, (req, res) => {
  try {
    const updated = dbService.updateCustomSolutionRequest(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Custom solution request not found" });
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/admin/custom-solution-requests/:id', verifyAdmin, (req, res) => {
  try {
    const success = dbService.deleteCustomSolutionRequest(req.params.id);
    res.json({ success });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Company Tenant Isolation Panel
app.get('/api/admin/companies', verifyAdmin, (req, res) => {
  res.json(dbService.getCompanies());
});

app.post('/api/admin/companies', verifyAdmin, (req, res) => {
  const comp = dbService.createCompany(req.body);
  // Auto create a matching license for newly created company instantly
  const lic = dbService.createLicense({
    companyId: comp.id,
    maxUsers: req.body.maxUsers || 10,
    maxDevices: req.body.maxDevices || 3,
    offlineAllowed: true
  });
  res.status(201).json({ company: comp, license: lic });
});

app.patch('/api/admin/companies/:id', verifyAdmin, (req, res) => {
  const comp = dbService.updateCompany(req.params.id, req.body);
  res.json(comp);
});

app.delete('/api/admin/companies/:id', verifyAdmin, (req, res) => {
  const success = dbService.deleteCompany(req.params.id);
  res.json({ success });
});

// Tenant licensing controls
app.get('/api/admin/licenses', verifyAdmin, (req, res) => {
  res.json(dbService.getLicenses());
});

app.post('/api/admin/licenses/:id/renew', verifyAdmin, (req, res) => {
  const { years } = req.body;
  const db = getDatabase();
  const licIndex = db.licenses.findIndex(l => l.id === req.params.id);
  if (licIndex === -1) return res.status(404).json({ error: "License not registered" });

  const currentExpiry = new Date(db.licenses[licIndex].expiryDate).getTime();
  const addedTime = (years || 1) * 365 * 24 * 60 * 60 * 1000;
  const newExpiry = new Date(currentExpiry + addedTime).toISOString();

  db.licenses[licIndex].expiryDate = newExpiry;
  db.licenses[licIndex].status = 'active';
  saveDatabase(db);

  dbService.addAuditLog({
    userId: (req as any).user.id,
    userName: "Owner Operations",
    companyId: "c-owner",
    action: "LICENSE_RENEW",
    details: `Renewed company tenant terminal licence ID: ${req.params.id} until ${newExpiry}`
  });

  res.json(db.licenses[licIndex]);
});

app.post('/api/admin/licenses/:id/block', verifyAdmin, (req, res) => {
  const { block } = req.body;
  const db = getDatabase();
  const index = db.licenses.findIndex(l => l.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Licence not matching" });

  db.licenses[index].status = block ? 'blocked' : 'active';
  saveDatabase(db);

  dbService.addAuditLog({
    userId: (req as any).user.id,
    userName: "Owner Operations",
    companyId: "c-owner",
    action: block ? "LICENSE_BLOCK" : "LICENSE_UNBLOCK",
    details: `Toggled license code: ${db.licenses[index].licenseKey} block status. Target: ${block}`
  });

  res.json(db.licenses[index]);
});

// Users management on Admin portal
app.get('/api/admin/users', verifyAdmin, (req, res) => {
  res.json(getDatabase().users);
});

app.post('/api/admin/users', verifyAdmin, (req, res) => {
  const { name, email, role, companyId, password } = req.body;
  const rawPassword = password || Math.random().toString(36).slice(-10);
  const passwordHash = bcrypt.hashSync(rawPassword, 10);

  const user = dbService.createUser({
    name,
    email,
    role,
    companyId,
    passwordHash
  });
  res.status(201).json(user);
});

app.patch('/api/admin/users/:id', verifyAdmin, (req, res) => {
  const user = dbService.updateUser(req.params.id, req.body);
  res.json(user);
});

app.delete('/api/admin/users/:id', verifyAdmin, (req, res) => {
  const success = dbService.deleteUser(req.params.id);
  res.json({ success });
});

// Payment Adapter routing configs for Admin dashboard
app.get('/api/admin/payment-methods', verifyAdmin, (req, res) => {
  res.json(dbService.getPaymentMethods());
});

app.post('/api/admin/payment-methods', verifyAdmin, (req, res) => {
  const pm = dbService.createPaymentMethod(req.body);
  res.status(201).json(pm);
});

app.patch('/api/admin/payment-methods/:id', verifyAdmin, (req, res) => {
  const pm = dbService.updatePaymentMethod(req.params.id, req.body);
  res.json(pm);
});

app.delete('/api/admin/payment-methods/:id', verifyAdmin, (req, res) => {
  const success = dbService.deletePaymentMethod(req.params.id);
  res.json({ success });
});

// Roles, Permissions & Pricing plans core gateways for Control Panel
app.get('/api/admin/roles', verifyAdmin, (req, res) => {
  res.json(dbService.getRoles());
});

app.post('/api/admin/roles', verifyAdmin, (req, res) => {
  const role = dbService.createRole(req.body);
  res.status(201).json(role);
});

app.patch('/api/admin/roles/:id', verifyAdmin, (req, res) => {
  const role = dbService.updateRole(req.params.id, req.body);
  if (!role) return res.status(404).json({ error: "Role not found" });
  res.json(role);
});

app.delete('/api/admin/roles/:id', verifyAdmin, (req, res) => {
  const success = dbService.deleteRole(req.params.id);
  res.json({ success });
});

app.get('/api/admin/permissions', verifyAdmin, (req, res) => {
  res.json(dbService.getPermissions());
});

app.get('/api/admin/pricing-plans', verifyAdmin, (req, res) => {
  res.json(dbService.getPricingPlans());
});

app.post('/api/admin/pricing-plans', verifyAdmin, (req, res) => {
  const plan = dbService.createPricingPlan(req.body);
  res.status(201).json(plan);
});

app.patch('/api/admin/pricing-plans/:id', verifyAdmin, (req, res) => {
  const plan = dbService.updatePricingPlan(req.params.id, req.body);
  if (!plan) return res.status(404).json({ error: "Pricing plan not found" });
  res.json(plan);
});

app.delete('/api/admin/pricing-plans/:id', verifyAdmin, (req, res) => {
  const success = dbService.deletePricingPlan(req.params.id);
  res.json({ success });
});

// Global settings adjustments
app.patch('/api/admin/settings', verifyAdmin, (req, res) => {
  const db = getDatabase();
  if (req.body.primaryColor) db.themeSettings.primaryColor = req.body.primaryColor;
  if (req.body.secondaryColor) db.themeSettings.secondaryColor = req.body.secondaryColor;
  if (req.body.backgroundColor) db.themeSettings.backgroundColor = req.body.backgroundColor;
  if (req.body.logoUrl) db.themeSettings.logoUrl = req.body.logoUrl;
  if (req.body.faviconUrl) db.themeSettings.faviconUrl = req.body.faviconUrl;
  if (req.body.typographyPairing) db.themeSettings.typographyPairing = req.body.typographyPairing;
  if (req.body.layoutWidth) db.themeSettings.layoutWidth = req.body.layoutWidth;
  if (req.body.defaultMode) db.themeSettings.defaultMode = req.body.defaultMode;
  saveDatabase(db);
  res.json(db.themeSettings);
});

// Admin Menus API Endpoints
app.get('/api/admin/menus', verifyAdmin, (req, res) => {
  res.json(dbService.getMenus());
});

app.post('/api/admin/menus', verifyAdmin, (req, res) => {
  const menu = dbService.createMenu(req.body);
  res.status(201).json(menu);
});

app.patch('/api/admin/menus/:id', verifyAdmin, (req, res) => {
  const menu = dbService.updateMenu(req.params.id, req.body);
  if (!menu) return res.status(404).json({ error: "Menu item not found" });
  res.json(menu);
});

app.delete('/api/admin/menus/:id', verifyAdmin, (req, res) => {
  const success = dbService.deleteMenu(req.params.id);
  res.json({ success });
});

// Admin Social Media API Endpoints
app.get('/api/admin/social', verifyAdmin, (req, res) => {
  res.json(dbService.getSocialPlatforms());
});

app.post('/api/admin/social', verifyAdmin, (req, res) => {
  const platform = dbService.createSocialPlatform(req.body);
  res.status(201).json(platform);
});

app.patch('/api/admin/social/:id', verifyAdmin, (req, res) => {
  const platform = dbService.updateSocialPlatform(req.params.id, req.body);
  if (!platform) return res.status(404).json({ error: "Platform not found" });
  res.json(platform);
});

app.delete('/api/admin/social/:id', verifyAdmin, (req, res) => {
  const success = dbService.deleteSocialPlatform(req.params.id);
  res.json({ success });
});

// Admin Forms API Endpoints
app.get('/api/admin/forms', verifyAdmin, (req, res) => {
  res.json(dbService.getForms());
});

app.post('/api/admin/forms', verifyAdmin, (req, res) => {
  const formObj = dbService.createForm(req.body);
  res.status(201).json(formObj);
});

app.patch('/api/admin/forms/:id', verifyAdmin, (req, res) => {
  const formObj = dbService.updateForm(req.params.id, req.body);
  if (!formObj) return res.status(404).json({ error: "Form structure not found" });
  res.json(formObj);
});

app.delete('/api/admin/forms/:id', verifyAdmin, (req, res) => {
  const success = dbService.deleteForm(req.params.id);
  res.json({ success });
});

// Admin WhatsApp Routes API Endpoints
app.get('/api/admin/whatsapp-routes', verifyAdmin, (req, res) => {
  res.json(dbService.getWhatsAppRoutes());
});

app.post('/api/admin/whatsapp-routes', verifyAdmin, (req, res) => {
  const route = dbService.createWhatsAppRoute(req.body);
  res.status(201).json(route);
});

app.patch('/api/admin/whatsapp-routes/:id', verifyAdmin, (req, res) => {
  const route = dbService.updateWhatsAppRoute(req.params.id, req.body);
  if (!route) return res.status(404).json({ error: "WhatsApp route not found" });
  res.json(route);
});

app.delete('/api/admin/whatsapp-routes/:id', verifyAdmin, (req, res) => {
  const success = dbService.deleteWhatsAppRoute(req.params.id);
  res.json({ success });
});


// List audit events
app.get('/api/admin/audit-logs', verifyAdmin, (req, res) => {
  res.json(dbService.getAuditLogs());
});

// List dynamic active plugins
app.get('/api/admin/plugins', verifyAdmin, (req, res) => {
  res.json(getDatabase().plugins);
});

app.patch('/api/admin/plugins/:id', verifyAdmin, (req, res) => {
  const db = getDatabase();
  const index = db.plugins.findIndex(p => p.id === req.params.id);
  if (index !== -1) {
    db.plugins[index].isEnabled = req.body.isEnabled;
    saveDatabase(db);
    return res.json(db.plugins[index]);
  }
  res.status(404).json({ error: "Plugin target not found" });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// REGIONAL HUBS CONTACTS ENDPOINTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
app.get('/api/contacts', (req, res) => {
  res.json(dbService.getContacts());
});

app.get('/api/admin/contacts', verifyAdmin, (req, res) => {
  res.json(dbService.getContacts());
});

app.post('/api/admin/contacts', verifyAdmin, (req, res) => {
  const contact = dbService.createContact(req.body);
  res.status(201).json(contact);
});

app.patch('/api/admin/contacts/:id', verifyAdmin, (req, res) => {
  const contact = dbService.updateContact(req.params.id, req.body);
  if (contact) return res.json(contact);
  res.status(404).json({ error: "Contact not found" });
});

app.delete('/api/admin/contacts/:id', verifyAdmin, (req, res) => {
  const success = dbService.deleteContact(req.params.id);
  if (success) return res.json({ success: true });
  res.status(404).json({ error: "Contact not found" });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BLOG ARTICLES CMS ENDPOINTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
app.get('/api/blogs', (req, res) => {
  const allBlogs = dbService.getBlogs();
  // Filter for active/published on public feed
  const published = allBlogs.filter(b => b.status === 'published');
  res.json(published);
});

app.get('/api/blogs/:slug', (req, res) => {
  const allBlogs = dbService.getBlogs();
  const found = allBlogs.find(b => b.slug === req.params.slug);
  if (found) return res.json(found);
  res.status(404).json({ error: "Blog article not found" });
});

app.get('/api/admin/blogs', verifyAdmin, (req, res) => {
  res.json(dbService.getBlogs());
});

app.post('/api/admin/blogs', verifyAdmin, (req, res) => {
  const blog = dbService.createBlog(req.body);
  res.status(201).json(blog);
});

app.patch('/api/admin/blogs/:id', verifyAdmin, (req, res) => {
  const blog = dbService.updateBlog(req.params.id, req.body);
  if (blog) return res.json(blog);
  res.status(404).json({ error: "Blog post not found" });
});

app.delete('/api/admin/blogs/:id', verifyAdmin, (req, res) => {
  const success = dbService.deleteBlog(req.params.id);
  if (success) return res.json({ success: true });
  res.status(404).json({ error: "Blog post not found" });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MEDIA LIBRARY ENDPOINTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
app.get('/api/admin/media', verifyAdmin, (req, res) => {
  res.json(dbService.getMedia());
});

app.post('/api/admin/media', verifyAdmin, (req, res) => {
  const mediaFile = dbService.addMediaFile(req.body);
  res.status(201).json(mediaFile);
});

app.delete('/api/admin/media/:id', verifyAdmin, (req, res) => {
  const success = dbService.deleteMediaFile(req.params.id);
  if (success) return res.json({ success: true });
  res.status(404).json({ error: "Media file not found in library" });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PWA ENGINE CONFIG METADATA
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
app.get('/api/pwa-settings', (req, res) => {
  res.json(dbService.getPwaSettings());
});

app.get('/api/admin/pwa-settings', verifyAdmin, (req, res) => {
  res.json(dbService.getPwaSettings());
});

app.patch('/api/admin/pwa-settings', verifyAdmin, (req, res) => {
  const settings = dbService.updatePwaSettings(req.body);
  res.json(settings);
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// NOTIFICATIONS DESK
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
app.get('/api/notifications', (req, res) => {
  res.json(dbService.getNotifications());
});

app.get('/api/admin/notifications', verifyAdmin, (req, res) => {
  res.json(dbService.getNotifications());
});

app.post('/api/admin/notifications', verifyAdmin, (req, res) => {
  const notif = dbService.createNotification(req.body);
  res.status(201).json(notif);
});

app.patch('/api/notifications/:id/read', (req, res) => {
  const success = dbService.markNotificationRead(req.params.id);
  if (success) return res.json({ success: true });
  res.status(404).json({ error: "Notification target not found" });
});


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PHASE 3: OFFLINE SYNC API ENGINE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

app.get('/api/sync/pull', (req, res) => {
  try {
    const { updatedAfter, companyId, fingerprint } = req.query;
    const db = getDatabase();

    // In a real database this filters records modified after updatedAfter.
    // Here we return active schema states for syncing client apps.
    dbService.addSyncLog({
      companyId: (companyId as string) || "c-1",
      userId: "u-3",
      deviceFingerprint: (fingerprint as string) || "SYNC_ENGINE",
      action: "pull",
      status: "success",
      recordsSyncedCount: db.appModules.length + db.pricingPlans.length,
      details: `Successful incremental sync pull. updatedAfter: ${updatedAfter || 'epoch'}`
    });

    res.json({
      timestamp: new Date().toISOString(),
      appModules: db.appModules.filter(a => a.status === 'active'),
      pricingPlans: db.pricingPlans.filter(p => p.status === 'active'),
      themeSettings: db.themeSettings,
      licenseStatus: db.licenses.find(l => l.companyId === companyId) || null
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/sync/push', (req, res) => {
  try {
    const { companyId, clientLogEntries, fingerprint } = req.body;
    const db = getDatabase();

    // Process queued offline records, prevent duplications, record results
    const batchSize = Array.isArray(clientLogEntries) ? clientLogEntries.length : 0;

    // Simulate appending records & logging
    dbService.addSyncLog({
      companyId: companyId || "c-1",
      userId: "u-3",
      deviceFingerprint: fingerprint || "OFFLINE_CLIENT_SYNC",
      action: "push",
      status: "success",
      recordsSyncedCount: batchSize,
      details: `Pushed transaction batch holding ${batchSize} operations seamlessly into backend storage.`
    });

    res.json({
      status: "success",
      syncedAt: new Date().toISOString(),
      recordsCount: batchSize,
      duplicationConflictsResolved: 0
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/sync/status', (req, res) => {
  const db = getDatabase();
  res.json({
    isCloudReachable: true,
    lastGlobalSyncTimestamp: new Date().toISOString(),
    pendingConflictResolutionCount: 0,
    syncQueueHistoricalCount: db.syncLogs.length
  });
});

app.post('/api/sync/resolve-conflict', (req, res) => {
  const { conflictId, resolutionStrategy } = req.body; // 'server-wins' | 'client-wins'
  res.json({
    status: "resolved",
    conflictId,
    appliedStrategy: resolutionStrategy || "server-wins",
    resolvedAt: new Date().toISOString()
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PHASE 6: GEMINI CONTEXTUAL ASSISTANT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
let aiInstance: GoogleGenAI | null = null;
function getAIInstance(): GoogleGenAI | null {
  if (!aiInstance) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== "MY_GEMINI_API_KEY") {
      aiInstance = new GoogleGenAI({ apiKey: key });
    }
  }
  return aiInstance;
}

app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message, contextHistory } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Please enter a valid message." });
    }

    const ai = getAIInstance();
    if (ai) {
      // Lazy load Gemini AI pipeline
      // We will frame the context around Eurosia Ecosystem
      const systemInstruction = `You are the EUROSIA AI Assistant of Eurosia App Ecosystem.
EUROSIA brings ERP, CRM, Accounting, AI, Communication, Fintech, Cybersecurity and eCommerce into one single, powerful, offline-first, multi-tenant platform.
Help the user browse the app features, suggest apps of our catalog, explain synchronization systems, database layers or assist in superadmin tasks.

AI-ASSISTED REQUIREMENT COLLECTION:
If the user mentions or asks about custom services, modules, or requests (e.g. "I need a hospital software", "We need custom ERP", "I want a software for clinic"), you MUST guide them politely to collect these crucial details or compile them step-by-step:
* How many branches do they have?
* Cloud hosted or offline-first deployment?
* Active user count?
* Required modules or features?
* Estimated project budget?

Always format your response concisely and guide them to answer these questions. When they provide answers or when you have collected enough data, generate a clear, elegant "REQUIREMENT SUMMARY" formatted block, and mention that they can click the "Send Requirement to WhatsApp" button to transmit these details directly to +8801711408725 on Eurosia WhatsApp.
Reply concisely and in a brilliant technological tone. Use Markdown.`;

      const contents = [
        { role: 'user', parts: [{ text: `${systemInstruction}\n\nClient question: ${message}` }] }
      ];

      const model = 'gemini-3.5-flash';
      const promptResponse = await ai.models.generateContent({
        model: model,
        contents: contents,
      });

      return res.json({ response: promptResponse.text });
    } else {
      // High quality local fallback agent rules when API_KEY is not set or in default state
      const fallbackMessages: { [key: string]: string } = {
        "sync": `**EUROSIA Database Sync & Cloud Offline Engine:**
1. Our architecture runs on a dual-database model:
   - Client-side: **SQLite** encapsulated inside Electron/Tauri frames for localized storage.
   - Cloud-side: **PostgreSQL** cluster acting as the Central Operating Core.
2. Changes are captured locally in an **Offline Synchronization Queue**.
3. Once a network is established, the Sync Engine pushes cached mutations through our custom REST endpoint and downloads the latest centralized company states, resolving any logical resource locks with an automated conflict engine.`,
        "price": `**EUROSIA Standardized License Packages:**
*   **Starter**: ৳1,990/mo - Best for solo proprietors. Up to 5 users and 5 basic apps.
*   **Business**: ৳4,990/mo - Built for scaled operations. Up to 20 users, 20 high-performance modules, and full conflict control.
*   **Enterprise**: ৳12,990/mo - Completely uncapped modules, 100GB secure cloud storage, and biometrics terminal locks.`,
        "hello": "Greetings! I am physical node EUROSIA-AI. How may I facilitate your operations architecture control today?",
        "apps": "Our dynamic app repository currently includes: **EUROSIA POS**, **EUROSIA Care**, **EUROSIA CloudPBX**, **EUROSIA AI Calling**, **Kabyo Kotha AI**, **EUROSIA Defender X**, and **EUROSIA BuildNex**.",
        "help": "You can ask me regarding **licensing configurations**, **modular app features**, or our unique **offline-to-cloud transactional synchronizations**.",
        "custom": `### 🛡️ EUROSIA AI Custom Solution Requirement Collector

I am pleased to help you with your custom project requirement! To provide an accurate estimate, could you please specify:
- **How many branches** do you operate?
- Should the system be **cloud-hosted** or **fully offline-capable**?
- What is your expected **user count**?
- What are the **key modules** required?
- What is your estimated **project budget**?

Once we build your **Requirement Summary**, we can send it directly to Eurosia Tech team on WhatsApp.`
      };

      const msgLower = message.toLowerCase();
      let match = fallbackMessages["help"];

      if (msgLower.includes("hello") || msgLower.includes("hi")) match = fallbackMessages["hello"];
      else if (msgLower.includes("sync") || msgLower.includes("sqlite") || msgLower.includes("offline")) match = fallbackMessages["sync"];
      else if (msgLower.includes("pricing") || msgLower.includes("pack") || msgLower.includes("cost") || msgLower.includes("price")) match = fallbackMessages["price"];
      else if (msgLower.includes("app") || msgLower.includes("module") || msgLower.includes("portfolio")) match = fallbackMessages["apps"];
      else if (msgLower.includes("hospital") || msgLower.includes("custom") || msgLower.includes("software") || msgLower.includes("website") || msgLower.includes("app") || msgLower.includes("erp") || msgLower.includes("pos") || msgLower.includes("crm")) {
        match = fallbackMessages["custom"];
      }

      return res.json({
        response: `*(Simulated AI Assistant - Eurosia Node)*\n\n${match}`
      });
    }
  } catch (error: any) {
    res.json({ response: `Error starting agent AI context: ${error.message}` });
  }
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// VITE DEV SERVER / PRODUCTION SERVING
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development mode setup with Vite dev server integrated as middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production serving setup
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Eurosia Ecosystem fullstack container running on host http://0.0.0.0:${PORT}`);
  });
}

startServer();
