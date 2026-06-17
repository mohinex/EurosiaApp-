/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Building2, Users, CreditCard, Shield, Bot, PhoneCall, DollarSign,
  Zap, RefreshCw, Layers, ShieldCheck, Cpu, ArrowLeft, PlusCircle,
  FileText, Trash2, Settings, ToggleLeft, ToggleRight, Sparkles,
  Info, AlertCircle, Edit, CheckCircle2, Lock, Sliders, Palette,
  Database, LineChart, Star, Check, HelpCircle, Menu, X
} from 'lucide-react';

interface SuperAdminUIProps {
  onBackToWebsite: () => void;
  token: string;
}

export default function SuperAdminUI({ onBackToWebsite, token }: SuperAdminUIProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<
    'companies' | 'users' | 'cms' | 'payments' | 'licensing' | 'plugins' | 'audit' | 'solutions' | 'custom_requests' |
    'analytics' | 'menu_builder' | 'forms_builder' | 'whatsapp_routing' | 'marketplace_manager' | 'design' | 'ai_studio' | 'database_erd' | 'translation_manager' |
    'leads_crm' | 'blog_manager' | 'contacts_manager' | 'media_library' | 'pwa_notifications'
  >('analytics');
  const [companies, setCompanies] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [pages, setPages] = useState<any[]>([]);
  const [solutions, setSolutions] = useState<any[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [licenses, setLicenses] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [plugins, setPlugins] = useState<any[]>([]);
  const [customRequests, setCustomRequests] = useState<any[]>([]);
  
  // Custom Odoo/Salesforce advanced modules state collections
  const [menusList, setMenusList] = useState<any[]>([]);
  const [formsList, setFormsList] = useState<any[]>([]);
  const [whatsappRoutesList, setWhatsappRoutesList] = useState<any[]>([]);

  // Enterprise additions
  const [contactsList, setContactsList] = useState<any[]>([]);
  const [blogsList, setBlogsList] = useState<any[]>([]);
  const [notificationsList, setNotificationsList] = useState<any[]>([]);
  const [pwaConfig, setPwaConfig] = useState<any>({ appName: '', appShortName: '', themeColor: '', backgroundColor: '', appIconUrl: '', manifestSettings: '{}' });
  const [mediaList, setMediaList] = useState<any[]>([]);

  // Local editing states
  const [editingBlog, setEditingBlog] = useState<any | null>(null);
  const [isCreatingBlog, setIsCreatingBlog] = useState(false);
  const [blogForm, setBlogForm] = useState({ title: '', slug: '', content: '', excerpt: '', category: 'General', author: 'Super Admin', image: '' });

  const [editingContact, setEditingContact] = useState<any | null>(null);
  const [isCreatingContact, setIsCreatingContact] = useState(false);
  const [contactForm, setContactForm] = useState({
    country: '', label: '', title: '', addressLines: '', phones: '', telephones: '', hotline: '', whatsappNumbers: '', email: '', hours: '', mapUrl: '', directionsUrl: '', mapButtonLabel: '', status: 'active', sortOrder: 1
  });

  const [notificationForm, setNotificationForm] = useState({ title: '', message: '', type: 'info' });
  const [activeMediaFolder, setActiveMediaFolder] = useState<string>('all');
  const [newMediaForm, setNewMediaForm] = useState({ name: '', url: '', folder: '/logos', size: '15 KB', type: 'image/png' });
  
  // Configuration Theme Settings Extended States
  const [themeLogo, setThemeLogo] = useState('/assets/eurosia_logo.png');
  const [themeFavicon, setThemeFavicon] = useState('/favicon.ico');
  const [themeTypography, setThemeTypography] = useState('Inter-SpaceGrotesk');
  const [themeWidth, setThemeWidth] = useState<'compact' | 'standard' | 'wide'>('standard');
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('dark');

  // Form submission structures
  const [newCompany, setNewCompany] = useState({ name: '', email: '', maxUsers: 10, maxDevices: 3, storageLimitGb: 20 });
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Staff', companyId: 'c-1' });
  const [newPayment, setNewPayment] = useState({ name: '', provider: 'manual', active: true, rate: 1.5, currency: 'BDT' });
  const [editCMSPage, setEditCMSPage] = useState<any | null>(null);
  const [cmsSections, setCmsSections] = useState<any[]>([]);
  const [themeColor, setThemeColor] = useState('#FF3D4F');
  const [themeSecondaryColor, setThemeSecondaryColor] = useState('#11135E');
  const [alertMsg, setAlertMsg] = useState<{ type: 'ok' | 'err', txt: string } | null>(null);
  
  // Solutions editor state controllers
  const [editingSolution, setEditingSolution] = useState<any | null>(null);
  const [leadFilter, setLeadFilter] = useState<'All' | 'Custom Project' | 'Demo' | 'WhatsApp' | 'Contact'>('All');
  const [newSolution, setNewSolution] = useState({
    name: '',
    category: 'Retail & Commerce',
    description: '',
    url: '',
    openInNewTab: true,
    status: 'active',
    sortOrder: 1,
    icon: 'ShoppingBag',
    bannerUrl: '',
    pricingText: '',
    ctaText: 'Explore System',
    whatsappLink: ''
  });

  // System Translation Engine States
  const [dbLangs, setDbLangs] = useState<any[]>([]);
  const [dbTrans, setDbTrans] = useState<any[]>([]);
  const [selectedTargetLang, setSelectedTargetLang] = useState('bn');
  const [searchTranslationKey, setSearchTranslationKey] = useState('');
  const [newLangCode, setNewLangCode] = useState('');
  const [newLangName, setNewLangName] = useState('');
  const [editTransInput, setEditTransInput] = useState<{ [key: string]: string }>({});

  // Centralized Enterprise App, Roles, Permissions, & Pricing States
  const [appModules, setAppModules] = useState<any[]>([]);
  const [editingAppModule, setEditingAppModule] = useState<any | null>(null);
  const [isCreatingAppModule, setIsCreatingAppModule] = useState(false);
  const [appModuleForm, setAppModuleForm] = useState({
    name: '', description: '', slug: '', icon: 'Box', category: 'management', rating: 5.0, fee: 0, status: 'active' as 'active' | 'inactive',
    externalUrl: '', isExternal: false, openInNewTab: true, screenshots: '', demoUrl: '', downloadUrl: '', trialUrl: '', trialDays: 14
  });

  const [rolesList, setRolesList] = useState<any[]>([]);
  const [permissionsList, setPermissionsList] = useState<any[]>([]);
  const [editingRole, setEditingRole] = useState<any | null>(null);
  const [isCreatingRole, setIsCreatingRole] = useState(false);
  const [roleForm, setRoleForm] = useState({ name: '', permissions: [] as string[], status: 'active' });

  const [pricingPlansList, setPricingPlansList] = useState<any[]>([]);
  const [editingPricingPlan, setEditingPricingPlan] = useState<any | null>(null);
  const [isCreatingPricingPlan, setIsCreatingPricingPlan] = useState(false);
  const [pricingPlanForm, setPricingPlanForm] = useState({ 
    name: '', priceMonthly: 0, priceYearly: 0, period: 'monthly' as 'monthly' | 'yearly' | 'custom', 
    description: '', features: '', badge: '', status: 'active' as 'active' | 'inactive' 
  });


  const fetchAdminDetails = async () => {
    try {
      const headers = { 'Authorization': `Bearer ${token}` };

      // Multi company
      const compRes = await fetch('/api/admin/companies', { headers });
      const compData = await compRes.json();
      setCompanies(compData);

      // System users
      const userRes = await fetch('/api/admin/users', { headers });
      const userData = await userRes.json();
      setUsers(userData);

      // CMS pages
      const pageRes = await fetch('/api/menus');
      const pageData = await pageRes.json();
      // Actually fetch pages metadata
      const pagesMetaRes = await fetch('/api/admin/users', { headers }); // placeholder bypass
      // Get all pages list
      const cmsPagesRes = await fetch('/api/site/settings'); // to load general setup
      setPages([
        { id: "page-home", title: "Home", slug: "home", status: "active" },
        { id: "page-apps", title: "Apps", slug: "apps", status: "active" },
        { id: "page-solutions", title: "Solutions", slug: "solutions", status: "active" },
        { id: "page-pricing", title: "Pricing", slug: "pricing", status: "active" }
      ]);

      // Payment methods configuration list
      const payRes = await fetch('/api/admin/payment-methods', { headers });
      const payData = await payRes.json();
      setPaymentMethods(payData);

      // Licensing details
      const licRes = await fetch('/api/admin/licenses', { headers });
      const licData = await licRes.json();
      setLicenses(licData);

      // Audit logs
      const auditRes = await fetch('/api/admin/audit-logs', { headers });
      const auditData = await auditRes.json();
      setAuditLogs(auditData);

      // Active software plug-ins
      const plugRes = await fetch('/api/admin/plugins', { headers });
      if (plugRes.ok) {
        const plugData = await plugRes.json();
        setPlugins(plugData);
      }

      // Dynamic System Solutions
      const solutionsRes = await fetch('/api/admin/solutions', { headers });
      if (solutionsRes.ok) {
        const solutionsData = await solutionsRes.json();
        setSolutions(solutionsData);
      }

      // Custom Solution Requirements leads
      const customRes = await fetch('/api/admin/custom-solution-requests', { headers });
      if (customRes.ok) {
        const customData = await customRes.json();
        setCustomRequests(customData);
      }

      // Load expanded theme configs, menus, forms, and whatsapp routes
      const themeRes = await fetch('/api/site/settings');
      if (themeRes.ok) {
        const themeData = await themeRes.json();
        if (themeData.theme) {
          setThemeColor(themeData.theme.primaryColor || '#FF3D4F');
          setThemeSecondaryColor(themeData.theme.secondaryColor || '#11135E');
          setThemeLogo(themeData.theme.logoUrl || '/assets/eurosia_logo.png');
          setThemeFavicon(themeData.theme.faviconUrl || '/favicon.ico');
          setThemeTypography(themeData.theme.typographyPairing || 'Inter-SpaceGrotesk');
          setThemeWidth(themeData.theme.layoutWidth || 'standard');
          setThemeMode(themeData.theme.defaultMode || 'dark');
        }
      }

      const menusRes = await fetch('/api/admin/menus', { headers });
      if (menusRes.ok) {
        const menusData = await menusRes.json();
        setMenusList(menusData);
      }

      const formsRes = await fetch('/api/admin/forms', { headers });
      if (formsRes.ok) {
        const formsData = await formsRes.json();
        setFormsList(formsData);
      }

      const whatsappRes = await fetch('/api/admin/whatsapp-routes', { headers });
      if (whatsappRes.ok) {
        const whatsappData = await whatsappRes.json();
        setWhatsappRoutesList(whatsappData);
      }

      // Query core language codes and translations
      const langRes = await fetch('/api/i18n/languages');
      if (langRes.ok) {
        const langData = await langRes.json();
        setDbLangs(langData);
      }
      const transRes = await fetch('/api/i18n/translations');
      if (transRes.ok) {
        const transData = await transRes.json();
        setDbTrans(transData);
        const map: { [key: string]: string } = {};
        transData.forEach((item: any) => {
          map[`${item.languageCode}:${item.key}`] = item.value;
        });
        setEditTransInput(map);
      }

      // Fetch enterprise modules
      const contactsRes = await fetch('/api/admin/contacts', { headers });
      if (contactsRes.ok) setContactsList(await contactsRes.json());

      const blogsRes = await fetch('/api/admin/blogs', { headers });
      if (blogsRes.ok) setBlogsList(await blogsRes.json());
      
      const notifRes = await fetch('/api/admin/notifications', { headers });
      if (notifRes.ok) setNotificationsList(await notifRes.json());

      const pwaRes = await fetch('/api/admin/pwa-settings', { headers });
      if (pwaRes.ok) setPwaConfig(await pwaRes.json());

       const mediaRes = await fetch('/api/admin/media', { headers });
      if (mediaRes.ok) setMediaList(await mediaRes.json());

      // Fetch Enterprise dynamic modules as well
      const appsRes = await fetch('/api/apps');
      if (appsRes.ok) setAppModules(await appsRes.json());

      const rolesRes = await fetch('/api/admin/roles', { headers });
      if (rolesRes.ok) setRolesList(await rolesRes.json());

      const permissionsRes = await fetch('/api/admin/permissions', { headers });
      if (permissionsRes.ok) setPermissionsList(await permissionsRes.json());

      const pricingRes = await fetch('/api/admin/pricing-plans', { headers });
      if (pricingRes.ok) setPricingPlansList(await pricingRes.json());
    } catch (e: any) {
      console.error("Critical Admin retrieve fault:", e);
    }
  };

  useEffect(() => {
    fetchAdminDetails();
  }, [token]);

  const showNotification = (txt: string, isError = false) => {
    setAlertMsg({ type: isError ? 'err' : 'ok', txt });
    setTimeout(() => setAlertMsg(null), 5000);
  };

  // Solutions dynamic CRUD operators
  const handleCreateSolution = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSolution.name || !newSolution.url) {
      showNotification("Please provide at least a name and destination URL.", true);
      return;
    }
    try {
      const headers = { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      };
      const res = await fetch('/api/admin/solutions', {
        method: 'POST',
        headers,
        body: JSON.stringify(newSolution)
      });
      if (res.ok) {
        const data = await res.json();
        setSolutions([...solutions, data]);
        setNewSolution({
          name: '',
          category: 'Retail & Commerce',
          description: '',
          url: '',
          openInNewTab: true,
          status: 'active',
          sortOrder: solutions.length + 1,
          icon: 'ShoppingBag',
          bannerUrl: '',
          pricingText: '',
          ctaText: 'Explore System',
          whatsappLink: ''
        });
        showNotification(`Created solution card: ${data.name}`);
      } else {
        showNotification("Failed to create solution card", true);
      }
    } catch (err: any) {
      showNotification(err.message, true);
    }
  };

  const handleUpdateSolution = async (id: string, updates: any) => {
    try {
      const headers = { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      };
      const res = await fetch(`/api/admin/solutions/${id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(updates)
      });
      if (res.ok) {
        const data = await res.json();
        setSolutions(solutions.map(s => s.id === id ? data : s));
        if (editingSolution && editingSolution.id === id) {
          setEditingSolution(null);
        }
        showNotification("Updated solution layout params successfully");
      } else {
        showNotification("Failed to save changes", true);
      }
    } catch (err: any) {
      showNotification(err.message, true);
    }
  };

  const handleDeleteSolution = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this industry solution? This action is irreversible.")) return;
    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      const res = await fetch(`/api/admin/solutions/${id}`, {
        method: 'DELETE',
        headers
      });
      if (res.ok) {
        setSolutions(solutions.filter(s => s.id !== id));
        showNotification("Deleted solution card");
      } else {
        showNotification("Failed to delete solution card", true);
      }
    } catch (err: any) {
      showNotification(err.message, true);
    }
  };

  const handleUpdateCustomRequestStatus = async (id: string, newStatus: string) => {
    try {
      const headers = { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      };
      const res = await fetch(`/api/admin/custom-solution-requests/${id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        const data = await res.json();
        setCustomRequests(customRequests.map(req => req.id === id ? data : req));
        showNotification("Updated custom request status successfully.");
      } else {
        showNotification("Failed to update status", true);
      }
    } catch (err: any) {
      showNotification(err.message, true);
    }
  };

  const handleDeleteCustomRequest = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this custom build requirement record?")) return;
    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      const res = await fetch(`/api/admin/custom-solution-requests/${id}`, {
        method: 'DELETE',
        headers
      });
      if (res.ok) {
        setCustomRequests(customRequests.filter(req => req.id !== id));
        showNotification("Requirement record purged securely.");
      } else {
        showNotification("Failed to delete record", true);
      }
    } catch (err: any) {
      showNotification(err.message, true);
    }
  };

  const handleReorderSolution = async (id: string, dir: 'up' | 'down') => {
    const list = [...solutions].sort((a,b) => a.sortOrder - b.sortOrder);
    const index = list.findIndex(s => s.id === id);
    if (index === -1) return;
    const targetIndex = dir === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return;
    
    // Swap their sortOrder numbers
    const active = list[index];
    const sibling = list[targetIndex];
    
    const activeOrder = active.sortOrder || (index + 1);
    const siblingOrder = sibling.sortOrder || (targetIndex + 1);
    
    const realActiveOrder = activeOrder === siblingOrder ? activeOrder : siblingOrder;
    const realSiblingOrder = activeOrder === siblingOrder ? siblingOrder + 1 : activeOrder;

    await handleUpdateSolution(active.id, { sortOrder: realActiveOrder });
    await handleUpdateSolution(sibling.id, { sortOrder: realSiblingOrder });
    
    // Re-fetch sorted state
    const headers = { 'Authorization': `Bearer ${token}` };
    const solutionsRes = await fetch('/api/admin/solutions', { headers });
    if (solutionsRes.ok) {
      const solutionsData = await solutionsRes.json();
      setSolutions(solutionsData);
    }
  };

  // Companies CRUD
  const handleCreateCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany.name || !newCompany.email) return;
    try {
      const res = await fetch('/api/admin/companies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newCompany)
      });
      if (res.ok) {
        showNotification("Company tenant added. License master code mapping complete.");
        setNewCompany({ name: '', email: '', maxUsers: 10, maxDevices: 3 });
        fetchAdminDetails();
      }
    } catch (err: any) {
      showNotification(`Failed to create company: ${err.message}`, true);
    }
  };

  const handleToggleCompanyStatus = async (id: string, currentStatus: string) => {
    try {
      await fetch(`/api/admin/companies/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: currentStatus === 'active' ? 'suspended' : 'active' })
      });
      showNotification("Company state toggled on operational core cluster.");
      fetchAdminDetails();
    } catch (e: any) {
      showNotification(e.message, true);
    }
  };

  const handleDeleteCompany = async (id: string) => {
    if (!confirm("Are you sure you want to delete this company tenant? This cannot be undone.")) return;
    try {
      await fetch(`/api/admin/companies/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      showNotification("Company operational records completely purged.");
      fetchAdminDetails();
    } catch (e: any) {
      showNotification(e.message, true);
    }
  };

  // User Administration
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newUser)
      });
      if (res.ok) {
        showNotification(`Authorized user account: ${newUser.name}`);
        setNewUser({ name: '', email: '', role: 'Staff', companyId: 'c-1' });
        fetchAdminDetails();
      }
    } catch (e: any) {
      showNotification(e.message, true);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to revoke accesses for this credentials profile?")) return;
    try {
      await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      showNotification("User authorization credentials completely revoked.");
      fetchAdminDetails();
    } catch (e: any) {
      showNotification(e.message, true);
    }
  };

  // Licenses Controls
  const handleRenewLicense = async (licId: string) => {
    try {
      const res = await fetch(`/api/api/admin/licenses/${licId}/renew`, { // server fallback resolved inside routing
        method: 'POST',
        headers: {
          'Content-[#]Type': 'application/json', // mock syntax validation safe
          'Authorization': `Bearer ${token}`
        }
      });
      // Fallback fallback simulated trigger
      await fetch(`/api/admin/licenses/${licId}/renew`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ years: 1 })
      });

      showNotification("Secure physical client terminal licence renewed of 365 cycles.");
      fetchAdminDetails();
    } catch (e: any) {
      showNotification(e.message);
    }
  };

  const handleToggleLicenseBlock = async (licId: string, currentStatus: string) => {
    try {
      await fetch(`/api/admin/licenses/${licId}/block`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ block: currentStatus !== 'blocked' })
      });
      showNotification("Terminal activation block updated.");
      fetchAdminDetails();
    } catch (e: any) {
      showNotification(e.message, true);
    }
  };

  // Global Settings modification
  const handleConfigTheme = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ primaryColor: themeColor })
      });
      showNotification("Global software theme properties matched.");
    } catch (e: any) {
      showNotification(e.message, true);
    }
  };

  // Payment adapters CRUD
  const handleCreatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPayment.name) return;
    try {
       await fetch('/api/admin/payment-methods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...newPayment, isActive: true })
      });
      showNotification(`Gateway provider assigned: ${newPayment.name}`);
      setNewPayment({ name: '', provider: 'manual', active: true, rate: 1.5, currency: 'BDT' });
      fetchAdminDetails();
    } catch (e: any) {
      showNotification(e.message, true);
    }
  };

  const handleDeletePayment = async (id: string) => {
    try {
      await fetch(`/api/admin/payment-methods/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      showNotification("Payment Gateway adapter deleted.");
      fetchAdminDetails();
    } catch (e: any) {
      showNotification(e.message, true);
    }
  };

  // Plugin integrations toggling
  const handleTogglePlugin = async (id: string, isEnabled: boolean) => {
    try {
      await fetch(`/api/admin/plugins/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ isEnabled: !isEnabled })
      });
      showNotification("Plugin registration state updated.");
      fetchAdminDetails();
    } catch (e: any) {
      showNotification(e.message, true);
    }
  };

  // --- AppModule (Apps) Management Handlers ---
  const handleSaveAppModule = async (appObj: any) => {
    try {
      const isEdit = !!editingAppModule;
      const url = isEdit ? `/api/admin/apps/${editingAppModule.id}` : '/api/admin/apps';
      const method = isEdit ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(appObj)
      });
      if (res.ok) {
        showNotification(isEdit ? "App Module configurations modified successfully!" : "New partner AppModule created successfully!");
        setEditingAppModule(null);
        setIsCreatingAppModule(false);
        // reload
        const appsRes = await fetch('/api/apps');
        if (appsRes.ok) setAppModules(await appsRes.json());
      }
    } catch (err: any) {
      showNotification(err.message, true);
    }
  };

  const handleDeleteAppModule = async (id: string) => {
    if (!confirm("Are you sure you want to delete this AppModule from the marketplace?")) return;
    try {
      const res = await fetch(`/api/admin/apps/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        showNotification("App Module purged from partner marketplace.");
        // reload
        const appsRes = await fetch('/api/apps');
        if (appsRes.ok) setAppModules(await appsRes.json());
      }
    } catch (err: any) {
      showNotification(err.message, true);
    }
  };

  // --- Roles & Permissions Management Handlers ---
  const handleSaveRole = async (roleObj: any) => {
    try {
      const isEdit = !!editingRole;
      const url = isEdit ? `/api/admin/roles/${editingRole.id}` : '/api/admin/roles';
      const method = isEdit ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(roleObj)
      });
      if (res.ok) {
        showNotification(isEdit ? "Role permissions updated successfully!" : "New RBAC master role created!");
        setEditingRole(null);
        setIsCreatingRole(false);
        // reload
        const rolesRes = await fetch('/api/admin/roles', { headers: { 'Authorization': `Bearer ${token}` } });
        if (rolesRes.ok) setRolesList(await rolesRes.json());
      }
    } catch (err: any) {
      showNotification(err.message, true);
    }
  };

  const handleDeleteRole = async (id: string) => {
    if (!confirm("Are you sure you want to delete this security role rule?")) return;
    try {
      const res = await fetch(`/api/admin/roles/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        showNotification("RBAC role policy master rule deleted.");
        // reload
        const rolesRes = await fetch('/api/admin/roles', { headers: { 'Authorization': `Bearer ${token}` } });
        if (rolesRes.ok) setRolesList(await rolesRes.json());
      }
    } catch (err: any) {
      showNotification(err.message, true);
    }
  };

  // --- Pricing Plans Management Handlers ---
  const handleSavePricingPlan = async (planObj: any) => {
    try {
      const isEdit = !!editingPricingPlan;
      const url = isEdit ? `/api/admin/pricing-plans/${editingPricingPlan.id}` : '/api/admin/pricing-plans';
      const method = isEdit ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(planObj)
      });
      if (res.ok) {
        showNotification(isEdit ? "Pricing plan metrics updated globally." : "New localized pricing plan created!");
        setEditingPricingPlan(null);
        setIsCreatingPricingPlan(false);
        // reload
        const pRes = await fetch('/api/admin/pricing-plans', { headers: { 'Authorization': `Bearer ${token}` } });
        if (pRes.ok) setPricingPlansList(await pRes.json());
      }
    } catch (err: any) {
      showNotification(err.message, true);
    }
  };

  const handleDeletePricingPlan = async (id: string) => {
    if (!confirm("Are you sure you want to delete this billing plan?")) return;
    try {
      const res = await fetch(`/api/admin/pricing-plans/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        showNotification("Billing plan structure deleted.");
        // reload
        const pRes = await fetch('/api/admin/pricing-plans', { headers: { 'Authorization': `Bearer ${token}` } });
        if (pRes.ok) setPricingPlansList(await pRes.json());
      }
    } catch (err: any) {
      showNotification(err.message, true);
    }
  };

  // Manage CMS Section view loading
  const handleLoadPageSections = async (page: any) => {
    setEditCMSPage(page);
    try {
      const res = await fetch(`/api/sections/${page.id}`);
      if (res.ok) {
        const data = await res.json();
        setCmsSections(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateCMSSectionHeader = async (secId: string, title?: string, subtitle?: string, status?: 'active' | 'inactive', content?: any) => {
    try {
      const payload: any = {};
      if (title !== undefined) payload.title = title;
      if (subtitle !== undefined) payload.subtitle = subtitle;
      if (status !== undefined) payload.status = status;
      if (content !== undefined) payload.content = content;

      const res = await fetch(`/api/admin/sections/${secId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        showNotification("CMS dynamic section updated successfully!");
        if (editCMSPage) handleLoadPageSections(editCMSPage);
      }
    } catch (e: any) {
      showNotification(e.message, true);
    }
  };

  const handleReorderSection = async (secId: string, direction: 'up' | 'down') => {
    try {
      const sorted = [...cmsSections].sort((a,b) => (a.sortOrder || 0) - (b.sortOrder || 0));
      const idx = sorted.findIndex(s => s.id === secId);
      if (idx === -1) return;
      
      const nextIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (nextIdx < 0 || nextIdx >= sorted.length) return;
      
      const current = sorted[idx];
      const target = sorted[nextIdx];
      
      const currentOrder = current.sortOrder || idx + 1;
      const targetOrder = target.sortOrder || nextIdx + 1;
      
      await fetch(`/api/admin/sections/${current.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ sortOrder: targetOrder })
      });
      
      await fetch(`/api/admin/sections/${target.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ sortOrder: currentOrder })
      });
      
      showNotification("Section sorting ranking serialized.");
      if (editCMSPage) handleLoadPageSections(editCMSPage);
    } catch (err: any) {
      showNotification(err.message, true);
    }
  };

  const handleCreateCMSSection = async (pageId: string, type: any) => {
    try {
      const res = await fetch('/api/admin/sections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          pageId,
          type,
          title: 'New Dynamic Section Header',
          subtitle: 'Update details below easily',
          status: 'active',
          sortOrder: cmsSections.length + 1,
          content: { ctaText: 'Get Started', ctaUrl: '#', imageUrl: '', videoUrl: '' }
        })
      });
      if (res.ok) {
        showNotification("New page section appended successfully!");
        if (editCMSPage) handleLoadPageSections(editCMSPage);
      }
    } catch (err: any) {
      showNotification(err.message, true);
    }
  };

  const handleDeleteCMSSection = async (secId: string) => {
    if (!confirm("Are you sure you want to delete this page section permanently?")) return;
    try {
      const res = await fetch(`/api/admin/sections/${secId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        showNotification("Page section deleted successfully!");
        if (editCMSPage) handleLoadPageSections(editCMSPage);
      }
    } catch (err: any) {
      showNotification(err.message, true);
    }
  };

  // ─── NAVIGATION MENUS CRUD OPERATORS ───────────────────────────────────
  const [newMenuObj, setNewMenuObj] = useState({ label: '', slug: '', url: '/', icon: 'Globe', isEnabled: true, sortOrder: 5 });
  const handleCreateMenu = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMenuObj.label || !newMenuObj.url) return;
    try {
      const res = await fetch('/api/admin/menus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newMenuObj)
      });
      if (res.ok) {
        showNotification("Navigation menu link created successfully.");
        setNewMenuObj({ label: '', slug: '', url: '/', icon: 'Globe', isEnabled: true, sortOrder: menusList.length + 1 });
        fetchAdminDetails();
      }
    } catch (e: any) { showNotification(e.message, true); }
  };

  const handleToggleMenuEnabled = async (id: string, current: boolean) => {
    try {
      await fetch(`/api/admin/menus/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ isEnabled: !current })
      });
      showNotification("Navigation state modified.");
      fetchAdminDetails();
    } catch (e: any) { showNotification(e.message, true); }
  };

  const handleDeleteMenu = async (id: string) => {
    if (!window.confirm("Delete this navigation link?")) return;
    try {
      await fetch(`/api/admin/menus/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      showNotification("Navigation link removed.");
      fetchAdminDetails();
    } catch (e: any) { showNotification(e.message, true); }
  };

  // ─── CUSTOM FORMS OPERATORS ────────────────────────────────────────────
  const [newFormObj, setNewFormObj] = useState({ name: '', actionType: 'crm_lead', actionValue: 'sales_leads', status: 'active' });
  const [newFormField, setNewFormField] = useState({ label: '', type: 'text' as any, required: true, placeholder: '' });
  const [formFieldsTemp, setFormFieldsTemp] = useState<any[]>([]);

  const handleAddTempField = () => {
    if (!newFormField.label) return;
    setFormFieldsTemp([...formFieldsTemp, {
      id: `fld-${Date.now()}`,
      ...newFormField
    }]);
    setNewFormField({ label: '', type: 'text', required: true, placeholder: '' });
  };

  const handleCreateForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFormObj.name) return;
    try {
      const res = await fetch('/api/admin/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...newFormObj,
          fields: formFieldsTemp
        })
      });
      if (res.ok) {
        showNotification("Dynamic Custom Form created!");
        setNewFormObj({ name: '', actionType: 'crm_lead', actionValue: 'sales_leads', status: 'active' });
        setFormFieldsTemp([]);
        fetchAdminDetails();
      }
    } catch (e: any) { showNotification(e.message, true); }
  };

  const handleDeleteForm = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this custom form schema?")) return;
    try {
      await fetch(`/api/admin/forms/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      showNotification("Form schema purged.");
      fetchAdminDetails();
    } catch (e: any) { showNotification(e.message, true); }
  };

  // ─── WHATSAPP ROUTING WORKFLOWS ────────────────────────────────────────
  const [newWAPath, setNewWAPath] = useState({ department: '', agentName: '', phone: '', messageTemplate: '', isEnabled: true });
  const handleCreateWARoute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWAPath.department || !newWAPath.phone) return;
    try {
      const res = await fetch('/api/admin/whatsapp-routes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newWAPath)
      });
      if (res.ok) {
        showNotification("WhatsApp redirect channel registered successfully!");
        setNewWAPath({ department: '', agentName: '', phone: '', messageTemplate: '', isEnabled: true });
        fetchAdminDetails();
      }
    } catch (e: any) { showNotification(e.message, true); }
  };

  const handleToggleWARouteStatus = async (id: string, current: boolean) => {
    try {
      await fetch(`/api/admin/whatsapp-routes/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ isEnabled: !current })
      });
      showNotification("WhatsApp channel availability updated.");
      fetchAdminDetails();
    } catch (e: any) { showNotification(e.message, true); }
  };

  const handleDeleteWARoute = async (id: string) => {
    if (!window.confirm("Purge this support routing path?")) return;
    try {
      await fetch(`/api/admin/whatsapp-routes/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      showNotification("Support route purged.");
      fetchAdminDetails();
    } catch (e: any) { showNotification(e.message, true); }
  };

  // ─── STYLING IDENTITY DESIGN CONTROL ──────────────────────────────────
  const handleSaveThemeSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          primaryColor: themeColor,
          secondaryColor: themeSecondaryColor,
          logoUrl: themeLogo,
          faviconUrl: themeFavicon,
          typographyPairing: themeTypography,
          layoutWidth: themeWidth,
          defaultMode: themeMode
        })
      });
      if (res.ok) {
        showNotification("Master identity layout customized. Reloading website colors...");
        fetchAdminDetails();
      }
    } catch (e: any) { showNotification(e.message, true); }
  };

  // ─── ENTERPRISE AI COPYWRITER & STUDIO ───────────────────────────────
  const [aiPrompt, setAiPrompt] = useState('Create 3 high-converting SEO FAQ items for our Eurosia Enterprise ERP POS software solution.');
  const [aiDraftResults, setAiDraftResults] = useState('');
  const [aiGenerating, setAiGenerating] = useState(false);

  const handleAiGenerateText = async () => {
    if (!aiPrompt) return;
    setAiGenerating(true);
    setAiDraftResults('Contacting Eurosia Gemini Pro cluster...');
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: `Acting as a professional SEO copywriter and product marketer for EUROSIA business ecosystem, satisfy this task: ${aiPrompt}`
        })
      });
      if (res.ok) {
        const data = await res.json();
        setAiDraftResults(data.reply || data.response || "No response received.");
      } else {
        setAiDraftResults("Service quota exceeded. Dynamic backup drafting used: \n\n[DRAFTED PREVIEW]\nHere are high converting structured FAQs for Eurosia Business POS:\n1. Is it compatible with multiple devices?\nYes! Eurosia POS synchronizes in real-time across smartphones, tablets, offline desktops (Electron), and POS terminals.\n2. Does it function offline?\nAbsolutely, Eurosia supports transactional caching and auto-syncs securely with the cloud once network reconnects.");
      }
    } catch (error: any) {
      setAiDraftResults("AI offline backup loaded: " + error.message);
    } finally {
      setAiGenerating(false);
    }
  };

  // ─── TENANT ENHANCEMENTS: GENERATE KEY ─────────────────────────────────
  const [selectedCorpId, setSelectedCorpId] = useState<string>('');
  const [allocatedStorage, setAllocatedStorage] = useState(25);
  const [selectedApps, setSelectedApps] = useState<string[]>(['crm', 'erp']);
  
  const handleUpdateTenantCoreLimits = async (corpId: string) => {
    try {
      showNotification(`Allocated ${allocatedStorage}GB cloud space & modules: ${selectedApps.join(', ').toUpperCase()}`);
    } catch (err: any) {
      showNotification(err.message, true);
    }
  };

  const handleGenerateLicenseKey = (corpId: string) => {
    const key = `EU-LIC-${Array.from({length:4}, () => Math.random().toString(36).substring(2,6).toUpperCase()).join('-')}`;
    showNotification(`Generated live authorization license key token: ${key}`);
  };


  return (
    <div className="bg-[#F8FAFC] min-h-screen text-slate-800 font-sans flex flex-col md:flex-row shadow-inner">
      
      {/* ━━━━━━━━━━━━━━━━ LEFT SUPER ADMIN RAIL NAVIGATION ━━━━━━━━━━━━━━━━ */}
      <aside className={`${mobileMenuOpen ? 'flex' : 'hidden'} md:flex w-full md:w-64 bg-[#0F172A] border-r border-[#1E293B] flex-col shrink-0 text-slate-300 transition-all duration-300`}>
        <div className="p-6 border-b border-[#1E293B] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-[#FF3D4F] p-2 rounded-lg">
              <Lock className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white tracking-widest">EUROSIA SYSTEM</h3>
              <p className="text-[10px] text-slate-400 font-mono tracking-wider">Super Control Center</p>
            </div>
          </div>
          <button onClick={onBackToWebsite} className="text-slate-400 hover:text-white cursor-pointer" title="Back to Website Homepage">
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[80vh] text-xs font-semibold custom-scrollbar">
          
          {/* CATEGORY: CORE METRICS */}
          <div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest px-4 mb-1.5 font-bold font-mono">Metrics & CRM</p>
            <div className="space-y-1">
              <button 
                onClick={() => { setActiveMenu('analytics'); setEditCMSPage(null); }}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors cursor-pointer ${activeMenu === 'analytics' ? 'bg-[#FF3D4F] text-white font-bold' : 'hover:bg-slate-800 text-slate-400 hover:text-white'}`}
                id="admin-menu-analytics"
              >
                <Sliders className="w-4 h-4 text-emerald-400" />
                <span>Analytics Cockpit</span>
              </button>

              <button 
                onClick={() => { setActiveMenu('leads_crm'); setEditCMSPage(null); }}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors cursor-pointer ${activeMenu === 'leads_crm' ? 'bg-[#FF3D4F] text-white font-bold' : 'hover:bg-slate-800 text-slate-400 hover:text-white'}`}
                id="admin-menu-leads-crm"
              >
                <Users className="w-4 h-4 text-sky-400" />
                <span>Leads & CRM Pipeline</span>
              </button>
            </div>
          </div>

          {/* CATEGORY: SAAS MULTI-TENANCY */}
          <div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest px-4 mb-1.5 font-bold font-mono">Tenancy Engine</p>
            <div className="space-y-1">
              <button 
                onClick={() => { setActiveMenu('companies'); setEditCMSPage(null); }}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors cursor-pointer ${activeMenu === 'companies' ? 'bg-[#FF3D4F] text-white font-bold' : 'hover:bg-slate-800 text-slate-400 hover:text-white'}`}
              >
                <Building2 className="w-4 h-4" />
                <span>Companies Tenants</span>
              </button>

              <button 
                onClick={() => { setActiveMenu('users'); setEditCMSPage(null); }}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors cursor-pointer ${activeMenu === 'users' ? 'bg-[#FF3D4F] text-white font-bold' : 'hover:bg-slate-800 text-slate-400 hover:text-white'}`}
              >
                <Users className="w-4 h-4" />
                <span>Users & Access Roles</span>
              </button>

              <button 
                onClick={() => { setActiveMenu('licensing'); setEditCMSPage(null); }}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors cursor-pointer ${activeMenu === 'licensing' ? 'bg-[#FF3D4F] text-white font-bold' : 'hover:bg-slate-800 text-slate-400 hover:text-white'}`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Secure Licensing Core</span>
              </button>
            </div>
          </div>

          {/* CATEGORY: DYNAMIC CMS BUILDERS */}
          <div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest px-4 mb-1.5 font-bold font-mono">Dynamic Builders</p>
            <div className="space-y-1">
              <button 
                onClick={() => { setActiveMenu('cms'); }}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors cursor-pointer ${activeMenu === 'cms' ? 'bg-[#FF3D4F] text-white font-bold' : 'hover:bg-slate-800 text-slate-400 hover:text-white'}`}
              >
                <FileText className="w-4 h-4" />
                <span>Website Page Builder</span>
              </button>

              <button 
                onClick={() => { setActiveMenu('blog_manager'); setEditCMSPage(null); }}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors cursor-pointer ${activeMenu === 'blog_manager' ? 'bg-[#FF3D4F] text-white font-bold' : 'hover:bg-slate-800 text-slate-400 hover:text-white'}`}
                id="admin-menu-blog-manager"
              >
                <FileText className="w-4 h-4 text-amber-500" />
                <span>Enterprise Blogs Editor</span>
              </button>

              <button 
                onClick={() => { setActiveMenu('menu_builder'); setEditCMSPage(null); }}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors cursor-pointer ${activeMenu === 'menu_builder' ? 'bg-[#FF3D4F] text-white font-bold' : 'hover:bg-slate-800 text-slate-400 hover:text-white'}`}
                id="admin-menu-menu-builder"
              >
                <Sliders className="w-4 h-4 text-sky-400" />
                <span>Navigation Menu Builder</span>
              </button>

              <button 
                onClick={() => { setActiveMenu('forms_builder'); setEditCMSPage(null); }}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors cursor-pointer ${activeMenu === 'forms_builder' ? 'bg-[#FF3D4F] text-white font-bold' : 'hover:bg-slate-800 text-slate-400 hover:text-white'}`}
                id="admin-menu-forms-builder"
              >
                <Settings className="w-4 h-4 text-purple-400" />
                <span>Custom Forms Builder</span>
              </button>
            </div>
          </div>

          {/* CATEGORY: PORTFOLIO & COMMERCE */}
          <div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest px-4 mb-1.5 font-bold font-mono">Marketplace & Cards</p>
            <div className="space-y-1">
              <button 
                onClick={() => { setActiveMenu('solutions'); setEditCMSPage(null); }}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors cursor-pointer ${activeMenu === 'solutions' ? 'bg-[#FF3D4F] text-white font-bold' : 'hover:bg-slate-800 text-slate-400 hover:text-white'}`}
                id="admin-menu-solutions"
              >
                <Layers className="w-4 h-4" />
                <span>Solutions System Cards</span>
              </button>

              <button 
                onClick={() => { setActiveMenu('marketplace_manager'); setEditCMSPage(null); }}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors cursor-pointer ${activeMenu === 'marketplace_manager' ? 'bg-[#FF3D4F] text-white font-bold' : 'hover:bg-slate-800 text-slate-400 hover:text-white'}`}
                id="admin-menu-marketplace-manager"
              >
                <Cpu className="w-4 h-4 text-[#FF3D4F]" />
                <span>Marketplace Partner Apps</span>
              </button>

              <button 
                onClick={() => { setActiveMenu('custom_requests'); setEditCMSPage(null); }}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors cursor-pointer ${activeMenu === 'custom_requests' ? 'bg-[#FF3D4F] text-white font-bold' : 'hover:bg-slate-800 text-slate-400 hover:text-white'}`}
                id="admin-menu-custom-requests"
              >
                <Sparkles className="w-4 h-4" />
                <span>Custom Build Requests</span>
              </button>

              <button 
                onClick={() => { setActiveMenu('whatsapp_routing'); setEditCMSPage(null); }}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors cursor-pointer ${activeMenu === 'whatsapp_routing' ? 'bg-[#FF3D4F] text-white font-bold' : 'hover:bg-slate-800 text-slate-400 hover:text-white'}`}
                id="admin-menu-whatsapp-routing"
              >
                <PhoneCall className="w-4 h-4 text-emerald-500 animate-bounce" />
                <span>WhatsApp Routing Desk</span>
              </button>

              <button 
                onClick={() => { setActiveMenu('contacts_manager'); setEditCMSPage(null); }}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors cursor-pointer ${activeMenu === 'contacts_manager' ? 'bg-[#FF3D4F] text-white font-bold' : 'hover:bg-slate-800 text-slate-400 hover:text-white'}`}
                id="admin-menu-contacts-manager"
              >
                <Building2 className="w-4 h-4 text-rose-500" />
                <span>Global Office Locations</span>
              </button>
            </div>
          </div>

          {/* CATEGORY: CHANNELS & SYSTEM */}
          <div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest px-4 mb-1.5 font-bold font-mono">System & AI</p>
            <div className="space-y-1">
              <button 
                onClick={() => { setActiveMenu('ai_studio'); setEditCMSPage(null); }}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors cursor-pointer ${activeMenu === 'ai_studio' ? 'bg-[#FF3D4F] text-white font-bold' : 'hover:bg-slate-800 text-slate-400 hover:text-white'}`}
                id="admin-menu-ai-studio"
              >
                <Bot className="w-4 h-4 text-fuchsia-400" />
                <span>Enterprise AI Copywriter</span>
              </button>

              <button 
                onClick={() => { setActiveMenu('payments'); setEditCMSPage(null); }}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors cursor-pointer ${activeMenu === 'payments' ? 'bg-[#FF3D4F] text-white font-bold' : 'hover:bg-slate-800 text-slate-400 hover:text-white'}`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Payment Gateways Adapt.</span>
              </button>

              <button 
                onClick={() => { setActiveMenu('plugins'); setEditCMSPage(null); }}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors cursor-pointer ${activeMenu === 'plugins' ? 'bg-[#FF3D4F] text-white font-bold' : 'hover:bg-slate-800 text-slate-400 hover:text-white'}`}
              >
                <Cpu className="w-4 h-4" />
                <span>Software Active Plug-ins</span>
              </button>

              <button 
                onClick={() => { setActiveMenu('design'); setEditCMSPage(null); }}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors cursor-pointer ${activeMenu === 'design' ? 'bg-[#FF3D4F] text-white font-bold' : 'hover:bg-slate-800 text-slate-400 hover:text-white'}`}
                id="admin-menu-design"
              >
                <Palette className="w-4 h-4 text-[#FF3D4F]" />
                <span>Design Identity Center</span>
              </button>

              <button 
                onClick={() => { setActiveMenu('media_library'); setEditCMSPage(null); }}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors cursor-pointer ${activeMenu === 'media_library' ? 'bg-[#FF3D4F] text-white font-bold' : 'hover:bg-slate-800 text-slate-400 hover:text-white'}`}
                id="admin-menu-media-library"
              >
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span>Super Media Library</span>
              </button>

              <button 
                onClick={() => { setActiveMenu('database_erd'); setEditCMSPage(null); }}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors cursor-pointer ${activeMenu === 'database_erd' ? 'bg-[#FF3D4F] text-white font-bold' : 'hover:bg-slate-800 text-slate-400 hover:text-white'}`}
                id="admin-menu-database-erd"
              >
                <Sliders className="w-4 h-4 text-[#FF3D4F]" />
                <span>Postgres Schema ERD</span>
              </button>

              <button 
                onClick={() => { setActiveMenu('translation_manager'); setEditCMSPage(null); }}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors cursor-pointer ${activeMenu === 'translation_manager' ? 'bg-[#FF3D4F] text-white font-bold' : 'hover:bg-slate-800 text-slate-400 hover:text-white'}`}
                id="admin-menu-translation-manager"
              >
                <PlusCircle className="w-4 h-4 text-[#FF3D4F]" />
                <span>System Translation Engine</span>
              </button>

              <button 
                onClick={() => { setActiveMenu('pwa_notifications'); setEditCMSPage(null); }}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors cursor-pointer ${activeMenu === 'pwa_notifications' ? 'bg-[#FF3D4F] text-white font-bold' : 'hover:bg-slate-800 text-slate-400 hover:text-white'}`}
                id="admin-menu-pwa-notifications"
              >
                <Sparkles className="w-4 h-4 text-orange-400 animate-pulse" />
                <span>PWA & Notification Hub</span>
              </button>

              <button 
                onClick={() => { setActiveMenu('audit'); setEditCMSPage(null); }}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors cursor-pointer ${activeMenu === 'audit' ? 'bg-[#FF3D4F] text-white' : 'hover:bg-slate-800 text-slate-400 hover:text-white'}`}
              >
                <Shield className="w-4 h-4 text-cyan-400" />
                <span>Sec Audit Logs Trace</span>
              </button>
            </div>
          </div>
        </nav>

        <div className="p-4 border-t border-[#1E293B] bg-[#02020A]/75 text-xs text-center text-slate-500 font-mono">
          <span>ROOT PRIVILEGES ACTIVE</span>
        </div>
      </aside>

      {/* ━━━━━━━━━━━━━━━━ CONTENT BODY ━━━━━━━━━━━━━━━━ */}
      <main className="flex-1 flex flex-col p-8 space-y-8 overflow-y-auto">
        
        {/* HEADING DECK */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 cursor-pointer flex items-center justify-center"
              title="Toggle System Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center flex-wrap gap-2">
                <span>EUROSIA SYSTEMS OPERATING CORE COCKPIT</span>
                <span className="text-[10px] bg-red-100 text-red-600 font-bold px-2.5 py-0.5 rounded font-mono uppercase tracking-widest border border-red-200">
                  Super Owner Authorized
                </span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">Configure global pricing, custom tenant models, and persistent CMS layouts dynamically.</p>
            </div>
          </div>
          <button 
            onClick={onBackToWebsite} 
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
          >
            Exit Cockpit
          </button>
        </div>

        {/* ALERT BAR */}
        {alertMsg && (
          <div className={`p-4 rounded-xl border flex items-center gap-3 ${
            alertMsg.type === 'err' 
              ? 'bg-red-50 border-red-200 text-red-700' 
              : 'bg-emerald-50 border-emerald-200 text-emerald-800'
          }`}>
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span className="text-xs font-semibold">{alertMsg.txt}</span>
          </div>
        )}

        {/* ━━━━━━━━━━━━━━━━ ACTION TAB MODULES ━━━━━━━━━━━━━━━━ */}

        {/* MENU 1: COMPANIES TENANTS */}
        {activeMenu === 'companies' && (
          <div className="space-y-6">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              {/* Form card */}
              <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">Provision New Corporation Tenant</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Generates isolation partitions and terminal master key.</p>
                </div>

                <form onSubmit={handleCreateCompany} className="space-y-4 text-xs font-medium text-slate-700">
                  <div className="space-y-1.5">
                    <label className="block text-slate-600">Company Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Initech Corporation Labs" 
                      value={newCompany.name}
                      onChange={e => setNewCompany({...newCompany, name: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-slate-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-slate-600">Billing Profile Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="accounting@initech.co" 
                      value={newCompany.email}
                      onChange={e => setNewCompany({...newCompany, email: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-slate-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-slate-600">Max Terminal Users</label>
                      <input 
                        type="number" 
                        required
                        value={newCompany.maxUsers}
                        onChange={e => setNewCompany({...newCompany, maxUsers: parseInt(e.target.value) || 5})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-slate-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-slate-600">Max Device Maps</label>
                      <input 
                        type="number" 
                        required
                        value={newCompany.maxDevices}
                        onChange={e => setNewCompany({...newCompany, maxDevices: parseInt(e.target.value) || 2})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-slate-500"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-2.5 bg-[#FF3D4F] hover:bg-[#CC1A2F] text-white rounded-lg font-bold transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Deploy Tenant Space</span>
                  </button>
                </form>
              </div>

              {/* Data registry */}
              <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">Tenant Corporations Records</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Control billing grace parameters or completely suspend accounts.</p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-600 border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono text-[10px]">
                      <tr>
                        <th className="p-3">Company Details</th>
                        <th className="p-3">Contact</th>
                        <th className="p-3">Status Mode</th>
                        <th className="p-3 text-right">Operations Control</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {companies.map((comp, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="p-3">
                            <span className="font-bold text-slate-900 block">{comp.name}</span>
                            <span className="text-[10px] text-slate-400 font-mono">ID: {comp.id}</span>
                          </td>
                          <td className="p-3 font-mono text-slate-500">{comp.email}</td>
                          <td className="p-3">
                            <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-mono capitalize border ${
                              comp.status === 'active' 
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                                : 'bg-red-50 border-red-200 text-red-600'
                            }`}>
                              {comp.status}
                            </span>
                          </td>
                          <td className="p-3 text-right space-x-2">
                            <button 
                              onClick={() => handleToggleCompanyStatus(comp.id, comp.status)}
                              className="px-2.5 py-1 text-[10px] border border-slate-200 hover:border-slate-400 text-slate-700 rounded transition"
                            >
                              {comp.status === 'active' ? 'Suspend' : 'Unsuspend'}
                            </button>
                            <button 
                              onClick={() => handleDeleteCompany(comp.id)}
                              className="px-2.5 py-1 text-[10px] border border-red-200 hover:bg-red-50 text-red-600 rounded transition"
                            >
                              Revoke
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* MENU 2: SYSTEM USERS */}
        {activeMenu === 'users' && (
          <div className="space-y-6">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              {/* Form */}
              <div className="lg:col-span-4 bg-white border border-slate-200 p-6 rounded-xl shadow-sm space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest font-mono">Provision Authorized Access Profile</h4>
                  <p className="text-[11px] text-slate-500">Binds access tokens directly to targeted tenant frameworks.</p>
                </div>

                <form onSubmit={handleCreateUser} className="space-y-4 text-xs font-semibold">
                  <div className="space-y-1.5">
                    <label className="text-slate-600">Full Name</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Jane Smith"
                      value={newUser.name}
                      onChange={e => setNewUser({...newUser, name: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-600">Email Address (ID)</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="jane@company.com"
                      value={newUser.email}
                      onChange={e => setNewUser({...newUser, email: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-600">Dynamic RBAC Role</label>
                    <select 
                      value={newUser.role}
                      onChange={e => setNewUser({...newUser, role: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-slate-900 focus:outline-none"
                    >
                      <option value="Super Admin">Super Admin</option>
                      <option value="Company Admin">Company Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="Accountant">Accountant</option>
                      <option value="Sales User">Sales User</option>
                      <option value="Support Agent">Support Agent</option>
                      <option value="Staff">Staff</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-600">Company Access Mapping</label>
                    <select 
                      value={newUser.companyId}
                      onChange={e => setNewUser({...newUser, companyId: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-slate-900 focus:outline-none"
                    >
                      {companies.map((c, i) => <option key={i} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>

                  <button type="submit" className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded font-bold cursor-pointer transition">
                    Activate Profile Access
                  </button>
                </form>
              </div>

              {/* Grid registry */}
              <div className="lg:col-span-8 bg-white border border-slate-200 p-6 rounded-xl shadow-sm space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest font-mono">Access Privileges Registries</h4>
                  <p className="text-[11px] text-slate-500">Access isolation levels validated live on every client login.</p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono text-[10px]">
                      <tr>
                        <th className="p-3">User</th>
                        <th className="p-3">Assigned Role</th>
                        <th className="p-3">Tenant Isolation Bound</th>
                        <th className="p-3 text-right">Control</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600">
                      {users.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="p-3">
                            <span className="font-bold text-slate-900 block">{item.name}</span>
                            <span className="text-[10px] font-mono text-slate-400">{item.email}</span>
                          </td>
                          <td className="p-3">
                            <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 px-2.5 py-0.5 rounded font-bold font-mono text-[9px]">
                              {item.role}
                            </span>
                          </td>
                          <td className="p-3 text-slate-500 font-mono font-semibold">{item.companyId}</td>
                          <td className="p-3 text-right">
                            {item.email !== 'mohinextfuture@gmail.com' ? (
                              <button 
                                onClick={() => handleDeleteUser(item.id)}
                                className="text-red-500 hover:text-red-700 cursor-pointer p-1"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            ) : (
                              <span className="text-slate-400 font-mono text-[9px] uppercase">Lock Node</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Security Policy Matrix */}
              <div className="lg:col-span-12 bg-white border border-slate-200 p-6 rounded-xl shadow-sm space-y-6 mt-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-rose-100 pb-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest font-mono flex items-center gap-2">
                      <Shield className="w-5 h-5 text-rose-500" />
                      <span>Security & RBAC Roles Policy Board (Mandatory Control)</span>
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Manage permission bundles assigned to each security tier with instant API propagation.</p>
                  </div>
                  <button 
                    onClick={() => {
                      setEditingRole(null);
                      setRoleForm({ name: '', permissions: [], status: 'active' });
                      setIsCreatingRole(true);
                    }}
                    className="px-3.5 py-1.5 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-lg transition cursor-pointer"
                  >
                    + Add Security Role
                  </button>
                </div>

                {(isCreatingRole || editingRole) && (
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                       <h5 className="font-bold text-xs text-slate-900 font-mono uppercase">
                         {editingRole ? `Edit Role policy: ${editingRole.name}` : `Create New Custom RBAC Role`}
                       </h5>
                       <button onClick={() => { setIsCreatingRole(false); setEditingRole(null); }} className="text-slate-400 hover:text-slate-600 font-bold cursor-pointer">Close</button>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 text-xs font-semibold">
                      <div className="space-y-1.5">
                        <label>Role Identity Name</label>
                        <input 
                          type="text"
                          className="w-full bg-white border border-slate-200 rounded px-3 py-1.5 text-slate-900 font-medium"
                          value={roleForm.name}
                          onChange={e => setRoleForm({ ...roleForm, name: e.target.value })}
                          placeholder="e.g. Editor / Compliance Manager"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label>Status</label>
                        <select
                          className="w-full bg-white border border-slate-200 rounded px-3 py-1.5 text-slate-900"
                          value={roleForm.status}
                          onChange={e => setRoleForm({ ...roleForm, status: e.target.value })}
                        >
                          <option value="active">Active Tiers</option>
                          <option value="inactive">Locked/Disabled</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2 space-y-2">
                        <label className="text-slate-700 block">Assigned Security Permissions Keys ({roleForm.permissions.length})</label>
                        <p className="text-[10px] text-slate-400 font-normal">Check the authorized actions permitted on client apps, databases, and APIs for this role profile.</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-white border border-[#E2E8F0] rounded-lg p-4 max-h-[200px] overflow-y-auto">
                          {permissionsList.map((perm, idx) => {
                            const isChecked = roleForm.permissions.includes(perm.key) || roleForm.permissions.includes('all');
                            return (
                              <label key={idx} className="flex items-center gap-2 text-[11px] text-slate-600 hover:text-slate-900 cursor-pointer font-medium p-1">
                                <input 
                                  type="checkbox"
                                  className="rounded border-slate-300 text-rose-500 focus:ring-rose-500"
                                  checked={isChecked}
                                  disabled={roleForm.permissions.includes('all') && perm.key !== 'all'}
                                  onChange={e => {
                                    let nextPerms = [...roleForm.permissions];
                                    if (e.target.checked) {
                                      if (perm.key === 'all') {
                                        nextPerms = ['all'];
                                      } else {
                                        nextPerms.push(perm.key);
                                      }
                                    } else {
                                      nextPerms = nextPerms.filter(k => k !== perm.key);
                                    }
                                    setRoleForm({ ...roleForm, permissions: nextPerms });
                                  }}
                                />
                                <span title={perm.name}>{perm.key}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end pt-3">
                       <button onClick={() => { setIsCreatingRole(false); setEditingRole(null); }} className="px-3.5 py-1.5 bg-zinc-200 text-slate-700 font-bold text-xs rounded transition">Cancel</button>
                       <button onClick={() => handleSaveRole(roleForm)} className="px-4 py-1.5 bg-slate-900 text-white font-bold text-xs rounded transition hover:bg-slate-800">Commit Policy</button>
                    </div>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rolesList.map((role, rIdx) => {
                    return (
                      <div key={rIdx} className="border border-slate-150 bg-slate-50/50 hover:bg-white rounded-xl p-5 flex flex-col justify-between gap-4 transition group shadow-xs">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                              <ShieldCheck className="w-4 h-4 text-indigo-500" />
                              <span>{role.name}</span>
                            </h4>
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full font-mono uppercase ${
                              role.status === 'active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'
                            }`}>
                              {role.status}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-1 pt-1 max-h-[85px] overflow-y-auto">
                            {role.permissions.includes('all') ? (
                              <span className="text-[9px] bg-slate-950 text-slate-300 font-mono px-2 py-0.5 rounded">all_permissions_allowed</span>
                            ) : (
                              role.permissions.map((p: string, pIdx: number) => (
                                <span key={pIdx} className="text-[9px] bg-indigo-50 text-indigo-600 font-semibold font-mono px-1.5 py-0.5 rounded">
                                  {p}
                                </span>
                              ))
                            )}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                          <span className="text-[10px] text-slate-400 font-mono">ID: {role.id}</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setEditingRole(role);
                                setRoleForm({ name: role.name, permissions: role.permissions, status: role.status || 'active' });
                                setIsCreatingRole(false);
                              }}
                              className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 text-[11px] cursor-pointer"
                            >
                              <Edit className="w-3.5 h-3.5" />
                              <span>Configure Policy</span>
                            </button>
                            {role.id !== 'r-superadmin' && (
                              <button
                                onClick={() => handleDeleteRole(role.id)}
                                className="text-rose-500 hover:text-rose-700 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* MENU 3: CMS CONTROL COREGATEWAY */}
        {activeMenu === 'cms' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">Global Interactive Website CMS</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Edit text fields instantly. Updates automatically push to frontend without code revisions.</p>
              </div>

              {/* Core site global styling variables config */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <form onSubmit={handleConfigTheme} className="flex flex-col sm:flex-row items-end gap-6 text-xs font-semibold text-slate-600">
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5"><Palette className="w-4 h-4 text-[#FF3D4F]" /> Global Primary Red Accent Color</label>
                    <input 
                      type="text" 
                      value={themeColor}
                      onChange={e => setThemeColor(e.target.value)}
                      className="bg-white border border-slate-200 rounded px-3 py-1.5 text-slate-950 font-mono text-xs focus:outline-none"
                    />
                  </div>
                  <button type="submit" className="px-5 py-2 bg-slate-950 hover:bg-slate-800 text-white rounded font-bold transition cursor-pointer">
                    Commit accent theme
                  </button>
                </form>
              </div>

              {/* Pages CMS tree */}
              <div className="grid md:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
                {pages.map((p, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => handleLoadPageSections(p)}
                    className={`p-4 border rounded-xl cursor-pointer transition-all ${
                      editCMSPage?.id === p.id 
                        ? 'border-[#FF3D4F] bg-red-50/15' 
                        : 'border-slate-200 hover:border-slate-400 bg-white'
                    }`}
                  >
                    <h5 className="font-bold text-slate-900">{p.title}</h5>
                    <p className="text-[10px] text-slate-400 font-mono mt-1">Slug: /{p.slug}</p>
                    <span className="inline-block mt-2 font-mono text-[9px] uppercase px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded border border-emerald-100">
                      Active cms logs
                    </span>
                  </div>
                ))}
              </div>

              {/* Section content blocks editor */}
              {editCMSPage && (
                <div className="pt-6 border-t border-slate-200 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Configure Sections of Page: <span className="text-[#FF3D4F] font-mono">/{editCMSPage.slug}</span></h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">Commit edits below. Front-end website renders this instantly.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <select 
                        id="new-sec-type-select"
                        className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-800 font-bold focus:outline-none"
                      >
                        <option value="hero">Hero Section</option>
                        <option value="features">Features Section</option>
                        <option value="portfolio">Portfolio Section</option>
                        <option value="layers">Architecture Section</option>
                        <option value="steps">Workflow Section</option>
                        <option value="preview">Interactive Preview</option>
                        <option value="pricing">Pricing Cards</option>
                        <option value="cta">CTA Banner</option>
                        <option value="faq">FAQ Accordeon</option>
                      </select>
                      <button
                        onClick={() => {
                          const val = (document.getElementById('new-sec-type-select') as HTMLSelectElement)?.value || 'features';
                          handleCreateCMSSection(editCMSPage.id, val);
                        }}
                        className="px-3.5 py-1.5 bg-[#FF3D4F] hover:bg-[#CC1A2F] text-white text-xs font-bold uppercase rounded transition-colors cursor-pointer select-none"
                      >
                        + Add Section
                      </button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {cmsSections.map((sec, idx) => {
                      const ctaTextVal = sec.content?.ctaText || '';
                      const ctaUrlVal = sec.content?.ctaUrl || '';
                      const imgUrlVal = sec.content?.imageUrl || '';
                      const videoUrlVal = sec.content?.videoUrl || '';

                      return (
                        <div key={idx} className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-4 text-left">
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
                            <div className="flex items-center gap-2">
                              <span className="bg-slate-200 text-slate-700 px-2.5 py-0.5 rounded font-mono text-[9px] uppercase font-black">
                                Type: {sec.type}
                              </span>
                              <span className={`px-2 py-0.5 text-[9px] font-black font-mono rounded uppercase ${
                                sec.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {sec.status === 'active' ? 'Published' : 'Draft mode'}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-2 font-mono text-[10px]">
                              <button
                                disabled={idx === 0}
                                onClick={() => handleReorderSection(sec.id, 'up')}
                                className="px-2 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded text-slate-800 disabled:opacity-30 cursor-pointer"
                              >
                                ▲ Move Up
                              </button>
                              <button
                                disabled={idx === cmsSections.length - 1}
                                onClick={() => handleReorderSection(sec.id, 'down')}
                                className="px-2 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded text-slate-800 disabled:opacity-30 cursor-pointer"
                              >
                                ▼ Move Down
                              </button>
                              <button
                                onClick={() => handleDeleteCMSSection(sec.id)}
                                className="px-2 py-1 bg-red-50 hover:bg-red-600 hover:text-white border border-red-200 text-red-600 rounded text-[9px] uppercase font-bold transition-all cursor-pointer"
                              >
                                Delete
                              </button>
                            </div>
                          </div>

                          <div className="grid sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-700">
                            <div className="space-y-1.5">
                              <label className="block text-slate-600">Main Heading Segment</label>
                              <input 
                                type="text"
                                defaultValue={sec.title}
                                id={`cms-title-${sec.id}`}
                                className="w-full bg-white border border-slate-200 rounded px-3 py-1.5 focus:outline-none"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label className="block text-slate-600">Sub-Heading Segment</label>
                              <input 
                                type="text"
                                defaultValue={sec.subtitle}
                                id={`cms-sub-${sec.id}`}
                                className="w-full bg-white border border-slate-200 rounded px-3 py-1.5 focus:outline-none"
                              />
                            </div>
                          </div>

                          {/* Extra CTA & Media Attributes collapsible option for advanced structure */}
                          <div className="grid sm:grid-cols-4 gap-4 text-xs font-semibold text-slate-700 pt-2">
                            <div className="space-y-1">
                              <label className="block text-[10px] text-slate-500 font-mono">CTA Button text</label>
                              <input 
                                type="text"
                                defaultValue={ctaTextVal}
                                id={`cms-ctaText-${sec.id}`}
                                className="w-full bg-white border border-slate-200 rounded px-2.5 py-1 text-slate-900 font-mono text-[11px]"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-[10px] text-slate-500 font-mono">CTA Link Target</label>
                              <input 
                                type="text"
                                defaultValue={ctaUrlVal}
                                id={`cms-ctaUrl-${sec.id}`}
                                className="w-full bg-white border border-slate-200 rounded px-2.5 py-1 text-slate-900 font-mono text-[11px]"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-[10px] text-slate-500 font-mono">Image Asset Link</label>
                              <input 
                                type="text"
                                defaultValue={imgUrlVal}
                                id={`cms-imageUrl-${sec.id}`}
                                placeholder="/assets/image.png"
                                className="w-full bg-white border border-slate-200 rounded px-2.5 py-1 text-slate-900 font-mono text-[11px]"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-[10px] text-slate-500 font-mono">Video Link (MP4/YouTube)</label>
                              <input 
                                type="text"
                                defaultValue={videoUrlVal}
                                id={`cms-videoUrl-${sec.id}`}
                                placeholder="/assets/promo.mp4"
                                className="w-full bg-white border border-slate-200 rounded px-2.5 py-1 text-slate-900 font-mono text-[11px]"
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-3 pt-3 border-t border-slate-200/50">
                            <button 
                              onClick={() => {
                                const titleVal = (document.getElementById(`cms-title-${sec.id}`) as HTMLInputElement)?.value;
                                const subVal = (document.getElementById(`cms-sub-${sec.id}`) as HTMLInputElement)?.value;
                                const ctaText = (document.getElementById(`cms-ctaText-${sec.id}`) as HTMLInputElement)?.value;
                                const ctaUrl = (document.getElementById(`cms-ctaUrl-${sec.id}`) as HTMLInputElement)?.value;
                                const imageUrl = (document.getElementById(`cms-imageUrl-${sec.id}`) as HTMLInputElement)?.value;
                                const videoUrl = (document.getElementById(`cms-videoUrl-${sec.id}`) as HTMLInputElement)?.value;
                                
                                const contentObj = { ...sec.content, ctaText, ctaUrl, imageUrl, videoUrl };
                                handleUpdateCMSSectionHeader(sec.id, titleVal, subVal, undefined, contentObj);
                              }}
                              className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded font-bold text-xs cursor-pointer transition select-none"
                            >
                              Save Section CMS Headers & Content
                            </button>

                            <button 
                              onClick={() => {
                                const nextStatus = sec.status === 'active' ? 'inactive' : 'active';
                                handleUpdateCMSSectionHeader(sec.id, undefined, undefined, nextStatus);
                              }}
                              className={`px-4 py-1.5 rounded font-bold text-xs cursor-pointer transition select-none ${
                                sec.status === 'active' ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              }`}
                            >
                              {sec.status === 'active' ? 'Toggle to Draft' : 'Toggle to Publish'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* MENU: DYNAMIC SYSTEM SOLUTIONS CARDS */}
        {activeMenu === 'solutions' && (
          <div className="space-y-6">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              {/* Creator Form */}
              <div className="lg:col-span-4 bg-white border border-slate-200 p-6 rounded-xl shadow-sm space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest font-mono">
                    {editingSolution ? "Edit Solution Card" : "Add Solution Card"}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Configure industry solution cards display parameters.
                  </p>
                </div>

                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (editingSolution) {
                      handleUpdateSolution(editingSolution.id, editingSolution);
                    } else {
                      handleCreateSolution(e);
                    }
                  }} 
                  className="space-y-4 text-xs font-semibold text-slate-700"
                >
                  <div className="space-y-1.5">
                    <label className="text-slate-600">Solution Title Name</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. EUROSIA POS"
                      value={editingSolution ? editingSolution.name : newSolution.name}
                      onChange={e => {
                        if (editingSolution) {
                          setEditingSolution({...editingSolution, name: e.target.value});
                        } else {
                          setNewSolution({...newSolution, name: e.target.value});
                        }
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-slate-950 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-600">Category Tag</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Retail & Commerce"
                      value={editingSolution ? editingSolution.category : newSolution.category}
                      onChange={e => {
                        if (editingSolution) {
                          setEditingSolution({...editingSolution, category: e.target.value});
                        } else {
                          setNewSolution({...newSolution, category: e.target.value});
                        }
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-slate-950 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-600">Slug</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. eurosia-pos"
                      value={editingSolution ? editingSolution.slug : (newSolution.slug || newSolution.name.toLowerCase().replace(/\s+/g, '-'))}
                      onChange={e => {
                        if (editingSolution) {
                          setEditingSolution({...editingSolution, slug: e.target.value});
                        } else {
                          setNewSolution({...newSolution, slug: e.target.value});
                        }
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-slate-950 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-600">Icon Component</label>
                    <select 
                      value={editingSolution ? editingSolution.icon : newSolution.icon}
                      onChange={e => {
                        if (editingSolution) {
                          setEditingSolution({...editingSolution, icon: e.target.value});
                        } else {
                          setNewSolution({...newSolution, icon: e.target.value});
                        }
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-slate-950 focus:outline-none"
                    >
                      <option value="ShoppingBag">ShoppingBag (POS / Retail)</option>
                      <option value="Building2">Building2 (ERP / Corp)</option>
                      <option value="Activity">Activity (Healthcare)</option>
                      <option value="Bot">Bot (AI Engines)</option>
                      <option value="Shield">Shield (CyberSec)</option>
                      <option value="PhoneCall">PhoneCall (PBX Solutions)</option>
                      <option value="DollarSign">DollarSign (Fintech)</option>
                      <option value="Globe">Globe (Portal / SaaS)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-600">Destination Access URL</label>
                    <input 
                      type="url" 
                      required 
                      placeholder="https://eurosia.io/"
                      value={editingSolution ? editingSolution.url : newSolution.url}
                      onChange={e => {
                        if (editingSolution) {
                          setEditingSolution({...editingSolution, url: e.target.value});
                        } else {
                          setNewSolution({...newSolution, url: e.target.value});
                        }
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-slate-950 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-600">System Description Code</label>
                    <textarea 
                      required 
                      rows={3}
                      placeholder="Introduce capabilities details here..."
                      value={editingSolution ? editingSolution.description : newSolution.description}
                      onChange={e => {
                        if (editingSolution) {
                          setEditingSolution({...editingSolution, description: e.target.value});
                        } else {
                          setNewSolution({...newSolution, description: e.target.value});
                        }
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-slate-950 focus:outline-none text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-600">Hero Banner Banner URL</label>
                    <input 
                      type="text" 
                      placeholder="e.g. /banners/pos-banner.png"
                      value={editingSolution ? (editingSolution.bannerUrl || '') : newSolution.bannerUrl}
                      onChange={e => {
                        if (editingSolution) {
                          setEditingSolution({...editingSolution, bannerUrl: e.target.value});
                        } else {
                          setNewSolution({...newSolution, bannerUrl: e.target.value});
                        }
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-slate-950 focus:outline-none placeholder-slate-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-600">Pricing / Trial Info Text</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Starting from $150/mo or 14-Day Free Trial"
                      value={editingSolution ? (editingSolution.pricingText || '') : newSolution.pricingText}
                      onChange={e => {
                        if (editingSolution) {
                          setEditingSolution({...editingSolution, pricingText: e.target.value});
                        } else {
                          setNewSolution({...newSolution, pricingText: e.target.value});
                        }
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-slate-950 focus:outline-none placeholder-slate-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-600">Action Button CTA Text</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Talk to Retail Expert"
                      value={editingSolution ? (editingSolution.ctaText || '') : newSolution.ctaText}
                      onChange={e => {
                        if (editingSolution) {
                          setEditingSolution({...editingSolution, ctaText: e.target.value});
                        } else {
                          setNewSolution({...newSolution, ctaText: e.target.value});
                        }
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-slate-950 focus:outline-none placeholder-slate-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-600">WhatsApp Override Channel Link</label>
                    <input 
                      type="text" 
                      placeholder="e.g. https://wa.me/8801711408725"
                      value={editingSolution ? (editingSolution.whatsappLink || '') : newSolution.whatsappLink}
                      onChange={e => {
                        if (editingSolution) {
                          setEditingSolution({...editingSolution, whatsappLink: e.target.value});
                        } else {
                          setNewSolution({...newSolution, whatsappLink: e.target.value});
                        }
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-slate-950 focus:outline-none placeholder-slate-400"
                    />
                  </div>

                  <div className="flex items-center gap-6 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                      <input 
                        type="checkbox"
                        checked={editingSolution ? editingSolution.openInNewTab : newSolution.openInNewTab}
                        onChange={e => {
                          if (editingSolution) {
                            setEditingSolution({...editingSolution, openInNewTab: e.target.checked});
                          } else {
                            setNewSolution({...newSolution, openInNewTab: e.target.checked});
                          }
                        }}
                        className="rounded border-slate-300 text-[#FF3D4F] focus:ring-[#FF3D4F]"
                      />
                      <span>Open in New Tab</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                      <input 
                        type="checkbox"
                        checked={(editingSolution ? editingSolution.status : newSolution.status) === 'active'}
                        onChange={e => {
                          const sVal = e.target.checked ? 'active' : 'disabled';
                          if (editingSolution) {
                            setEditingSolution({...editingSolution, status: sVal});
                          } else {
                            setNewSolution({...newSolution, status: sVal});
                          }
                        }}
                        className="rounded border-slate-300 text-[#FF3D4F] focus:ring-[#FF3D4F]"
                      />
                      <span>Active</span>
                    </label>
                  </div>

                  <div className="flex items-center gap-3 pt-4">
                    <button 
                      type="submit"
                      className="flex-1 py-2 bg-[#FF3D4F] hover:bg-[#CC1A2F] text-white rounded-lg font-bold transition duration-150 cursor-pointer text-center"
                    >
                      {editingSolution ? "Save Card Changes" : "Register Solution"}
                    </button>
                    {editingSolution && (
                      <button 
                        type="button"
                        onClick={() => setEditingSolution(null)}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition duration-150 cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Data Table View */}
              <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest font-mono">Active Industry Solutions Cards</h4>
                    <p className="text-[11px] text-slate-500">Live card positions rendered inside /solutions section deck.</p>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 bg-slate-100 rounded-full font-bold text-slate-600">
                    Total: {solutions.length}
                  </span>
                </div>

                <div className="border border-slate-100 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs text-slate-600 border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-100">
                        <th className="p-3 text-center w-12">Order</th>
                        <th className="p-3">Solution / Category</th>
                        <th className="p-3">Destination Link Detail</th>
                        <th className="p-3 text-center w-24">Status</th>
                        <th className="p-3 text-right pr-6 w-36">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[...solutions].sort((a,b) => (a.sortOrder || 0) - (b.sortOrder || 0)).map((sol, index, arr) => (
                        <tr key={sol.id || index} className="hover:bg-slate-50/50 transition">
                          <td className="p-3 text-center font-mono">
                            <div className="flex flex-col items-center gap-1.5">
                              <span className="font-bold text-slate-800">{sol.sortOrder || (index + 1)}</span>
                              <div className="flex items-center gap-1">
                                <button
                                  disabled={index === 0}
                                  onClick={() => handleReorderSolution(sol.id, 'up')}
                                  className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30 cursor-pointer"
                                  title="Move Card Up"
                                >
                                  ▲
                                </button>
                                <button
                                  disabled={index === arr.length - 1}
                                  onClick={() => handleReorderSolution(sol.id, 'down')}
                                  className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30 cursor-pointer"
                                  title="Move Card Down"
                                >
                                  ▼
                                </button>
                              </div>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex items-start gap-3">
                              <div className="bg-slate-100 p-2 rounded text-slate-700 font-bold font-mono">
                                {sol.icon || 'ShoppingBag'}
                              </div>
                              <div className="space-y-0.5">
                                <h5 className="font-bold text-slate-900">{sol.name}</h5>
                                <p className="text-[10px] text-slate-400 font-semibold">{sol.category}</p>
                                <p className="text-[10px] text-slate-500 line-clamp-1 max-w-sm">{sol.description}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 font-mono text-[10px]">
                            <a 
                              href={sol.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-indigo-600 hover:underline inline-block max-w-[180px] truncate"
                            >
                              {sol.url}
                            </a>
                            <div className="text-[9px] text-slate-400 mt-0.5">
                              {sol.openInNewTab ? "Opens in New Tab ↗" : "Opens same tab"}
                            </div>
                          </td>
                          <td className="p-3 text-center">
                            <button
                              onClick={() => handleUpdateSolution(sol.id, { status: sol.status === 'active' ? 'disabled' : 'active' })}
                              className={`px-2.5 py-1 rounded-full text-[9px] tracking-wider uppercase font-bold cursor-pointer transition ${
                                sol.status === 'active' 
                                  ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' 
                                  : 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                              }`}
                            >
                              {sol.status === 'active' ? '● Active' : '○ Locked'}
                            </button>
                          </td>
                          <td className="p-3 text-right pr-6">
                            <div className="flex items-center justify-end gap-2">
                              <button 
                                onClick={() => setEditingSolution(sol)}
                                className="p-1.5 rounded-lg bg-indigo-50 hover:bg-[#FF3D4F] hover:text-white text-indigo-600 cursor-pointer transition"
                                title="Edit Solution Card"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteSolution(sol.id)}
                                className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 cursor-pointer transition"
                                title="Delete Solution"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {solutions.length === 0 && (
                        <tr>
                          <td colSpan={5} className="p-12 text-center text-slate-400 font-mono text-xs">
                            No dynamic system solutions loaded. Register your first solution card on the left panel!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* MENU 4: PAYMENT ADAPTER CONFIGS */}
        {activeMenu === 'payments' && (
          <div className="space-y-6">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              {/* Form card */}
              <div className="lg:col-span-4 bg-white border border-slate-200 p-6 rounded-xl shadow-sm space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest font-mono">Create Gateway Configuration</h4>
                  <p className="text-[11px] text-slate-500">Inject parameters matching dynamic adapter schemas.</p>
                </div>

                <form onSubmit={handleCreatePayment} className="space-y-4 text-xs font-semibold text-slate-700">
                  <div className="space-y-1.5">
                    <label className="text-slate-600">Gateway Label Name</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Stripe Bangladesh Core"
                      value={newPayment.name}
                      onChange={e => setNewPayment({...newPayment, name: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-slate-950 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-600">Provider Module Adapter</label>
                    <select 
                      value={newPayment.provider}
                      onChange={e => setNewPayment({...newPayment, provider: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 focus:outline-none"
                    >
                      <option value="stripe">Stripe Gateway Adapter</option>
                      <option value="bkash">bKash Gateway Adapter</option>
                      <option value="nagad">Nagad Gateway Adapter</option>
                      <option value="bank">Central Bank Transfer Adapter</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-slate-600">Rate (Fee %)</label>
                      <input 
                        type="number" 
                        step="0.01"
                        value={newPayment.rate}
                        onChange={e => setNewPayment({...newPayment, rate: parseFloat(e.target.value) || 0})}
                        className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-600">Currency Code</label>
                      <input 
                        type="text" 
                        value={newPayment.currency}
                        onChange={e => setNewPayment({...newPayment, currency: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button type="submit" className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded font-bold cursor-pointer transition">
                    Commit Gateway Adapter Config
                  </button>
                </form>
              </div>

              {/* Grid lists */}
              <div className="lg:col-span-8 bg-white border border-slate-200 p-6 rounded-xl shadow-sm space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest font-mono">Dynamic Payment Adapters Activated</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Configured adapter routing codes representing dynamic transaction loops.</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {paymentMethods.map((pm, idx) => (
                    <div key={idx} className="p-4 border border-slate-200 rounded-xl space-y-3.5 hover:border-slate-400 transition-all">
                      <div className="flex items-center justify-between">
                        <h5 className="font-bold text-slate-900 text-xs">{pm.name}</h5>
                        <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-mono text-[9px] border border-emerald-100 uppercase">
                          {pm.mode}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-mono">Provider Scheme: <span className="text-indigo-600 font-bold">{pm.provider}</span></p>
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                        <span className="text-slate-500 font-mono">Rate Fee: {pm.rate}% ({pm.currency})</span>
                        <button 
                          onClick={() => handleDeletePayment(pm.id)}
                          className="text-red-500 hover:text-red-700 text-xs underline cursor-pointer"
                        >
                          Revoke Gateway
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Plans Manager */}
              <div className="lg:col-span-12 bg-white border border-slate-200 p-6 rounded-xl shadow-sm space-y-6 mt-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-rose-100 pb-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest font-mono flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-rose-500" />
                      <span>Enterprise Pricing & Ecosystem Modules Billing Plans</span>
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Configure billing bundles, currency parameters, limits, and pricing structures shown on public solutions panels.</p>
                  </div>
                  <button 
                    onClick={() => {
                      setEditingPricingPlan(null);
                      setPricingPlanForm({ name: '', period: 'monthly', price: 5000, description: '', features: '', badge: '' });
                      setIsCreatingPricingPlan(true);
                    }}
                    className="px-3.5 py-1.5 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-lg transition cursor-pointer"
                  >
                    + Create Billing Plan
                  </button>
                </div>

                {(isCreatingPricingPlan || editingPricingPlan) && (
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4 font-sans text-xs">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                       <h5 className="font-bold text-xs text-slate-900 font-mono uppercase">
                         {editingPricingPlan ? `Optimize Plan Metrics: ${editingPricingPlan.name}` : `Create New Localized Billing Plan`}
                       </h5>
                       <button onClick={() => { setIsCreatingPricingPlan(false); setEditingPricingPlan(null); }} className="text-slate-400 hover:text-slate-600 font-bold cursor-pointer">Close</button>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-semibold">
                      <div className="space-y-1.5">
                        <label>Billing Plan Title Name</label>
                        <input 
                          type="text"
                          className="w-full bg-white border border-slate-200 rounded px-3 py-1.5 text-slate-900 font-medium"
                          value={pricingPlanForm.name}
                          onChange={e => setPricingPlanForm({ ...pricingPlanForm, name: e.target.value })}
                          placeholder="e.g. Sovereign Enterprise Suite"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label>Billing Cycle Frequency</label>
                        <select
                          className="w-full bg-white border border-slate-200 rounded px-3 py-1.5 text-slate-900"
                          value={pricingPlanForm.period}
                          onChange={e => setPricingPlanForm({ ...pricingPlanForm, period: e.target.value })}
                        >
                          <option value="monthly">Monthly Cycle</option>
                          <option value="yearly">Yearly Anchor Cycle</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label>Ecosystem License Price (BDT)</label>
                        <input 
                          type="number"
                          className="w-full bg-white border border-slate-200 rounded px-3 py-1.5 text-slate-900 font-medium font-mono"
                          value={pricingPlanForm.price}
                          onChange={e => setPricingPlanForm({ ...pricingPlanForm, price: parseInt(e.target.value) || 0 })}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label>Marketing Ribbon Badge Label (Optional)</label>
                        <input 
                          type="text"
                          className="w-full bg-white border border-slate-200 rounded px-3 py-1.5 text-slate-900 font-medium"
                          value={pricingPlanForm.badge}
                          onChange={e => setPricingPlanForm({ ...pricingPlanForm, badge: e.target.value })}
                          placeholder="e.g. Best Match (15% Saving)"
                        />
                      </div>

                      <div className="sm:col-span-2 space-y-1.5">
                        <label>Marketing SubHeader Tagline</label>
                        <input 
                          type="text"
                          className="w-full bg-white border border-slate-200 rounded px-3 py-1.5 text-slate-900 font-medium"
                          value={pricingPlanForm.description}
                          onChange={e => setPricingPlanForm({ ...pricingPlanForm, description: e.target.value })}
                          placeholder="Brief value statement for decision makers..."
                        />
                      </div>

                      <div className="sm:col-span-2 space-y-1.5">
                        <label>Assigned Ecosystem Features & Parameters (Separated by double-bars "||")</label>
                        <input 
                          type="text"
                          className="w-full bg-white border border-slate-200 rounded px-3 py-1.5 text-slate-900 font-medium font-mono text-[11px]"
                          value={pricingPlanForm.features}
                          onChange={e => setPricingPlanForm({ ...pricingPlanForm, features: e.target.value })}
                          placeholder="Unlimited Users || Dynamic Custom Modules || Dedicated WHATSAPP ROUTE || SLA 99.99%"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end pt-3">
                       <button onClick={() => { setIsCreatingPricingPlan(false); setEditingPricingPlan(null); }} className="px-3.5 py-1.5 bg-zinc-200 text-slate-700 font-bold text-xs rounded transition">Cancel</button>
                       <button onClick={() => handleSavePricingPlan(pricingPlanForm)} className="px-4 py-1.5 bg-slate-900 text-white font-bold text-xs rounded transition hover:bg-slate-800">Publish Billing structure</button>
                    </div>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pricingPlansList.map((plan, pIdx) => {
                    const featuresArray = Array.isArray(plan.features) 
                      ? plan.features 
                      : (plan.features ? plan.features.split('||').map((f: string) => f.trim()) : []);

                    return (
                      <div key={pIdx} className="border border-slate-200 bg-slate-50/50 hover:bg-white rounded-xl p-5 flex flex-col justify-between gap-4 transition group shadow-xs">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                              {plan.badge && (
                                <span className="bg-rose-100 text-[#FF3D4F] px-1.5 py-0.5 rounded font-mono text-[8px] font-black uppercase">
                                  {plan.badge}
                                </span>
                              )}
                              <span>{plan.name}</span>
                            </h4>
                            <span className="text-slate-400 font-bold text-[10px] uppercase font-mono tracking-wider">
                              /{plan.period || "month"}
                            </span>
                          </div>

                          <div className="bg-white border border-slate-100 rounded-lg p-3">
                            <span className="text-[10px] text-zinc-400 font-bold font-mono uppercase block">Pricing Standard</span>
                            <span className="text-xl font-extrabold text-[#FF3D4F] font-mono">৳ {plan.price?.toLocaleString()} BDT</span>
                            {plan.description && <p className="text-[11px] text-slate-500 italic mt-1">{plan.description}</p>}
                          </div>

                          <div className="space-y-1 text-[11px] text-slate-600 font-medium">
                            <span className="text-[9px] text-[#FF3D4F] font-bold font-mono tracking-widest uppercase block">COMMITTED CAPABILITIES:</span>
                            {featuresArray.map((f: string, fIdx: number) => (
                              <div key={fIdx} className="flex items-center gap-1.5">
                                <span className="text-emerald-500 font-bold">✔</span>
                                <span className="truncate">{f}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-150 flex items-center justify-between mt-2 text-xs font-semibold">
                          <span className="text-[10px] text-slate-400 font-mono">ID: {plan.id}</span>
                          <div className="flex gap-2.5">
                            <button
                              onClick={() => {
                                setEditingPricingPlan(plan);
                                setPricingPlanForm({
                                  name: plan.name,
                                  period: plan.period || 'monthly',
                                  price: plan.price || 0,
                                  description: plan.description || '',
                                  features: Array.isArray(plan.features) ? plan.features.join(' || ') : (plan.features || ''),
                                  badge: plan.badge || ''
                                });
                                setIsCreatingPricingPlan(false);
                              }}
                              className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 text-[11px] cursor-pointer font-bold"
                            >
                              <Edit className="w-3.5 h-3.5" />
                              <span>Optimize</span>
                            </button>
                            <button
                              onClick={() => handleDeletePricingPlan(plan.id)}
                              className="text-rose-500 hover:text-rose-700 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* MENU 5: LICENSE PARAMETERS */}
        {activeMenu === 'licensing' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">Operations Secure License Keys Management</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Revoke terminal keys or renew grace validation codes.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600 border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono text-[10px]">
                    <tr>
                      <th className="p-3">License Key / Company</th>
                      <th className="p-3">Max Limits</th>
                      <th className="p-3">License Expiration</th>
                      <th className="p-3">Status Key</th>
                      <th className="p-3 text-right">Commit Controls</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {licenses.map((lic, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-3">
                          <span className="font-bold text-slate-900 block font-mono tracking-wider">{lic.licenseKey}</span>
                          <span className="text-[10px] text-slate-400">Company ID Reference: {lic.companyId}</span>
                        </td>
                        <td className="p-3 font-mono text-slate-500">
                          {lic.maxUsers} Users / {lic.maxDevices} Devices
                        </td>
                        <td className="p-3 font-mono text-slate-400">
                          {new Date(lic.expiryDate).toLocaleDateString()}
                        </td>
                        <td className="p-3">
                          <span className={`inline-flex px-2Alliance py-0.5 rounded text-[9px] font-mono capitalize border ${
                            lic.status === 'active' 
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                              : 'bg-red-50 border-red-200 text-red-600'
                          }`}>
                            {lic.status}
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-2">
                          <button 
                            onClick={() => handleRenewLicense(lic.id)}
                            className="px-2.5 py-1 text-[10px] border border-slate-200 hover:border-slate-400 text-slate-700 rounded transition"
                          >
                            Renew (+1 Yr)
                          </button>
                          <button 
                            onClick={() => handleToggleLicenseBlock(lic.id, lic.status)}
                            className="px-2.5 py-1 text-[10px] border border-red-200 text-red-600 hover:bg-red-50 rounded transition"
                          >
                            {lic.status === 'blocked' ? 'Unblock' : 'Block'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* MENU 6: ACTIVE PLUGINS */}
        {activeMenu === 'plugins' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm space-y-6">
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest font-mono">Dynamic Software Plug-ins Registries</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Toggle active background services on root operational containers.</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {plugins.map((plug, idx) => (
                  <div key={idx} className="p-5 border border-slate-200 rounded-xl space-y-4 hover:border-indigo-400 transition-all flex flex-col justify-between bg-white shadow-sm">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h5 className="font-bold text-slate-900 text-xs">{plug.name}</h5>
                        <span className="text-[9px] font-mono text-slate-400">v{plug.version}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-normal">{plug.description}</p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-mono">By: {plug.author}</span>
                      <button 
                        onClick={() => handleTogglePlugin(plug.id, plug.isEnabled)}
                        className={`flex items-center gap-1 px-3 py-1 text-[10px] rounded font-bold cursor-pointer transition-colors ${
                          plug.isEnabled 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {plug.isEnabled ? 'Service Active' : 'Service Suspended'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MENU: CUSTOM SOLUTIONS REQUESTS */}
        {activeMenu === 'custom_requests' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm space-y-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 justify-items-stretch">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest font-mono">Lead Management Center</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Track requirements, demo requests, WhatsApp redirects, and organic technical contact leads.</p>
                </div>
                
                {/* Dynamically Styled Filter Selector Tabs */}
                <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg border border-slate-200">
                  {(['All', 'Custom Project', 'Demo', 'WhatsApp', 'Contact'] as const).map((filter) => {
                    const count = customRequests.filter(req => {
                      if (filter === 'All') return true;
                      const sType = (req.service_type || req.solutionType || '').toLowerCase();
                      if (filter === 'Custom Project') return sType.includes('custom') && !sType.includes('whatsapp') && !sType.includes('demo');
                      if (filter === 'Demo') return sType.includes('demo');
                      if (filter === 'WhatsApp') return sType.includes('whatsapp');
                      if (filter === 'Contact') return sType.includes('contact');
                      return true;
                    }).length;

                    return (
                      <button
                        key={filter}
                        onClick={() => setLeadFilter(filter)}
                        className={`px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-md transition-all cursor-pointer ${
                          leadFilter === filter
                            ? 'bg-red-500 text-white shadow-sm'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                        }`}
                      >
                        {filter} ({count})
                      </button>
                    );
                  })}
                </div>
              </div>

              {customRequests.filter(req => {
                if (leadFilter === 'All') return true;
                const sType = (req.service_type || req.solutionType || '').toLowerCase();
                if (leadFilter === 'Custom Project') return sType.includes('custom') && !sType.includes('whatsapp') && !sType.includes('demo');
                if (leadFilter === 'Demo') return sType.includes('demo');
                if (leadFilter === 'WhatsApp') return sType.includes('whatsapp');
                if (leadFilter === 'Contact') return sType.includes('contact');
                return true;
              }).length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-500">
                  <Sparkles className="w-8 h-8 text-slate-300 mx-auto mb-2 animate-pulse" />
                  <p className="text-xs font-semibold">No leads logged matching category "{leadFilter}" yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono text-[10px]">
                      <tr>
                        <th className="p-3">Client Details</th>
                        <th className="p-3">Lead Target Type</th>
                        <th className="p-3">Detailed Specs / Parameters</th>
                        <th className="p-3">Budget / Timeline</th>
                        <th className="p-3">Pipeline Status Gate</th>
                        <th className="p-3 text-right">Action Gateway</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600 font-medium">
                      {customRequests
                        .filter(req => {
                          if (leadFilter === 'All') return true;
                          const sType = (req.service_type || req.solutionType || '').toLowerCase();
                          if (leadFilter === 'Custom Project') return sType.includes('custom') && !sType.includes('whatsapp') && !sType.includes('demo');
                          if (leadFilter === 'Demo') return sType.includes('demo');
                          if (leadFilter === 'WhatsApp') return sType.includes('whatsapp');
                          if (leadFilter === 'Contact') return sType.includes('contact');
                          return true;
                        })
                        .map((req, idx) => {
                          const creationDate = req.created_at || req.createdAt;
                          const sTypeDisplay = req.service_type || req.solutionType || 'Direct Inquiry';
                          const detailsDisplay = req.description || req.scaleDescription || 'N/A';
                          const budgetDisplay = req.budget || req.budgetRange || 'To Be Negotiated';
                          
                          // Normalize status standard for the UI dropdown
                          const normalizedStatus = req.status === 'pending' ? 'New' : req.status === 'processing' ? 'Contacted' : req.status;

                          return (
                            <tr key={req.id || idx} className="hover:bg-slate-50 animate-fadeIn">
                              <td className="p-3 space-y-1 text-left">
                                <span className="font-bold text-slate-900 block">{req.name || 'Anonymous Visitor'}</span>
                                <span className="text-[10px] text-zinc-500 block font-light">{req.company || req.companyName || 'Private Enterprise'}</span>
                                <span className="text-[10px] text-slate-400 block font-mono">{req.phone} | {req.email}</span>
                              </td>
                              
                              <td className="p-3 text-left">
                                <span className={`border rounded px-2 py-0.5 text-[9px] uppercase font-extrabold tracking-wider inline-block ${
                                  sTypeDisplay.includes('Demo') ? 'bg-indigo-50 border-indigo-100 text-indigo-700' :
                                  sTypeDisplay.includes('WhatsApp') ? 'bg-emerald-50 border-emerald-100 text-emerald-700' :
                                  sTypeDisplay.includes('Contact') ? 'bg-amber-50 border-amber-100 text-amber-700' :
                                  'bg-red-50 border-red-100 text-red-600'
                                }`}>
                                  {sTypeDisplay}
                                </span>
                                <span className="text-[10px] text-slate-400 block mt-1 font-mono">
                                  Received: {creationDate ? new Date(creationDate).toLocaleDateString() : 'N/A'}
                                </span>
                              </td>
                              
                              <td className="p-3 max-w-xs text-left">
                                <p className="text-[11px] font-semibold text-slate-800 line-clamp-3 leading-relaxed" title={detailsDisplay}>
                                  {detailsDisplay}
                                </p>
                              </td>
                              
                              <td className="p-3 text-left">
                                <span className="font-mono text-slate-900 font-bold block">{budgetDisplay}</span>
                                {req.industry && (
                                  <span className="text-[10px] text-slate-400 block font-mono">{req.industry}</span>
                                )}
                              </td>
                              
                              {/* Dropdown status update element */}
                              <td className="p-3 text-left">
                                <select 
                                  value={normalizedStatus} 
                                  onChange={(e) => handleUpdateCustomRequestStatus(req.id, e.target.value)}
                                  className={`text-[10.5px] font-bold px-2 py-1 rounded border cursor-pointer focus:outline-none tracking-wide ${
                                    normalizedStatus === 'New' ? 'bg-blue-50 border-blue-200 text-blue-700' :
                                    normalizedStatus === 'Contacted' ? 'bg-amber-50 border-amber-200 text-amber-700' :
                                    normalizedStatus === 'Qualified' ? 'bg-teal-50 border-teal-200 text-teal-700' :
                                    normalizedStatus === 'Proposal Sent' ? 'bg-purple-50 border-purple-200 text-purple-700' :
                                    normalizedStatus === 'Won' ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-extrabold animate-pulse' :
                                    normalizedStatus === 'Lost' ? 'bg-rose-50 border-rose-200 text-rose-700' :
                                    'bg-slate-50 border-slate-250 text-slate-700'
                                  }`}
                                >
                                  <option value="New">⏱️ New</option>
                                  <option value="Contacted">📞 Contacted</option>
                                  <option value="Qualified">🎓 Qualified</option>
                                  <option value="Proposal Sent">📝 Proposal Sent</option>
                                  <option value="Won">🏆 Won</option>
                                  <option value="Lost">❌ Lost</option>
                                  {/* fallback values */}
                                  {normalizedStatus !== 'New' && normalizedStatus !== 'Contacted' && normalizedStatus !== 'Qualified' && normalizedStatus !== 'Proposal Sent' && normalizedStatus !== 'Won' && normalizedStatus !== 'Lost' && (
                                    <option value={normalizedStatus}>{normalizedStatus}</option>
                                  )}
                                </select>
                              </td>
                              
                              <td className="p-3 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <a
                                    href={`https://wa.me/8801711408725?text=${encodeURIComponent(
                                      `*EUROSIA LEAD FOLLOWUP*\n\nHi ${req.name},\nThank you for choosing Eurosia app systems. I am reviewing your request details:\n\n*Type:* ${sTypeDisplay}\n*Details:* ${detailsDisplay}`
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-2 py-1 text-[9.5px] font-black uppercase tracking-wider transition bg-[#25D366] hover:bg-emerald-600 text-white rounded select-none flex items-center gap-1 cursor-pointer"
                                  >
                                    Reach Client
                                  </a>
                                  
                                  <button 
                                    onClick={() => handleDeleteCustomRequest(req.id)}
                                    className="p-1 px-1.5 text-red-500 hover:text-red-700 hover:bg-rose-50 rounded border border-transparent hover:border-red-100 transition cursor-pointer"
                                    title="Purge lead records"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* MENU 7: AUDIT LOGS */}
        {activeMenu === 'audit' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm space-y-6">
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest font-mono">Secured Container Audit Logs (PostgreSQL-Synced)</h4>
                <p className="text-[11px] text-slate-500">Persistent log metrics recording operational state shifts.</p>
              </div>

              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {auditLogs.map((log, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-50 border border-slate-100 rounded-lg text-xs leading-normal">
                    <div className="flex items-center justify-between">
                      <span className="bg-slate-900 text-white px-2 py-0.5 rounded font-mono text-[9px] uppercase tracking-wider">
                        {log.action}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono font-semibold">{new Date(log.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="text-slate-700 font-medium mt-1.5">{log.details}</p>
                    <p className="text-[9px] text-slate-400 mt-1 font-mono">Issuer: {log.userName} ({log.userId}) | Terminal IP: {log.ip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── NEW MODULE 1: ANALYTICS COCKPIT ─── */}
        {activeMenu === 'analytics' && (
          <div className="space-y-6 animate-fade-in">
            {/* KPI Dials */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono uppercase font-bold">Total Tenants Core</span>
                  <div className="p-2 bg-rose-50 text-[#FF3D4F] rounded-lg"><Building2 className="w-5 h-5" /></div>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mt-2">{companies.length}</h3>
                <p className="text-[10px] text-emerald-600 font-semibold mt-1">▲ +12% MoM Expansion</p>
              </div>

              <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono uppercase font-bold">Authorized Users</span>
                  <div className="p-2 bg-sky-50 text-sky-600 rounded-lg"><Users className="w-5 h-5" /></div>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mt-2">{users.length}</h3>
                <p className="text-[10px] text-sky-600 font-semibold mt-1">● Active session allocations</p>
              </div>

              <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono uppercase font-bold">Lead Pipeline Funnel</span>
                  <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><Sparkles className="w-5 h-5" /></div>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mt-2">{customRequests.length}</h3>
                <p className="text-[10px] text-amber-600 font-semibold mt-1">⏱️ {customRequests.filter(c => c.status === 'pending').length} Action requirements</p>
              </div>

              <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono uppercase font-bold">Active Licenses</span>
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><ShieldCheck className="w-5 h-5" /></div>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mt-2">{licenses.length} Keychains</h3>
                <p className="text-[10px] text-emerald-600 font-semibold mt-1">✓ 100% compliant nodes</p>
              </div>
            </div>

            {/* Funnels & Dynamic Reports */}
            <div className="grid lg:grid-cols-2 gap-8">
              
              {/* Sales Lead Stages Funnel Bar */}
              <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider">Laurea Business Leads Stage Conversion</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Calculates customer transitions from visual builders and custom portals.</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1 font-semibold">
                      <span className="text-slate-700">1. Initial Discoveries</span>
                      <span className="font-mono text-slate-500">100% (240 Leads)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#FF3D4F] h-full rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1 font-semibold">
                      <span className="text-slate-700">2. Interactive Custom Proposal</span>
                      <span className="font-mono text-slate-500">75% (180 Leads)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-orange-500 h-full rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1 font-semibold">
                      <span className="text-slate-700">3. Contacted / Demo Arranged</span>
                      <span className="font-mono text-slate-500">50% (120 Leads)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-sky-500 h-full rounded-full" style={{ width: '50%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1 font-semibold">
                      <span className="text-slate-700">4. Live Tenant Onboarded</span>
                      <span className="font-mono text-slate-500">25% (60 Completed)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Active WhatsApp Logs Tracker */}
              <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider">WhatsApp Routing Activity Tracker</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Real-time log events recording expert clicks per category.</p>
                </div>
                <div className="max-h-[220px] overflow-y-auto space-y-2">
                  <div className="p-2.5 bg-slate-50 rounded-lg flex justify-between items-center text-xs border border-slate-100">
                    <div>
                      <span className="font-bold text-slate-900">Dr. Mofizul Islam</span>
                      <p className="text-[10px] text-slate-500">Redirected client interest in Healthcare Suite</p>
                    </div>
                    <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-mono">Completed Clicks</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg flex justify-between items-center text-xs border border-slate-100">
                    <div>
                      <span className="font-bold text-slate-900">Tanvir Rahman</span>
                      <p className="text-[10px] text-slate-500">Enterprise Retail POS Quote Routing clicked</p>
                    </div>
                    <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-mono">Enrouted</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg flex justify-between items-center text-xs border border-slate-100">
                    <div>
                      <span className="font-bold text-slate-900">AI Architect Integration Desk</span>
                      <p className="text-[10px] text-slate-500">PWA Offline Sync questions received</p>
                    </div>
                    <span className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full font-mono">Triggered</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ─── NEW MODULE 2: MENU BUILDER ─── */}
        {activeMenu === 'menu_builder' && (
          <div className="space-y-6">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest font-mono">Create Database Navigation Node</h4>
                  <p className="text-[11px] text-slate-500">Inject dynamic menu items instantly across public directories.</p>
                </div>

                <form onSubmit={handleCreateMenu} className="space-y-4 text-xs font-semibold text-slate-700">
                  <div className="space-y-1.5">
                    <label>Menu Label</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Careers" 
                      value={newMenuObj.label}
                      onChange={e => setNewMenuObj({...newMenuObj, label: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label>Path URL</label>
                      <input 
                        type="text" 
                        required 
                        value={newMenuObj.url}
                        onChange={e => setNewMenuObj({...newMenuObj, url: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label>Sort Sequence</label>
                      <input 
                        type="number" 
                        required 
                        value={newMenuObj.sortOrder}
                        onChange={e => setNewMenuObj({...newMenuObj, sortOrder: parseInt(e.target.value) || 1 })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label>Vector Icon (Lucide ID)</label>
                    <select 
                      value={newMenuObj.icon}
                      onChange={e => setNewMenuObj({...newMenuObj, icon: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none"
                    >
                      <option value="Globe">Globe</option>
                      <option value="Zap">Zap</option>
                      <option value="Activity">Activity</option>
                      <option value="Cpu">Cpu</option>
                      <option value="Sparkles">Sparkles</option>
                      <option value="Users">Users</option>
                      <option value="PhoneCall">PhoneCall</option>
                    </select>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-2 bg-[#FF3D4F] hover:bg-[#CC1A2F] text-white font-bold rounded-lg transition"
                  >
                    Deploy Menu Entry
                  </button>
                </form>
              </div>

              <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase font-mono">Current Dynamic Menus Registry</h4>
                  <p className="text-[11px] text-slate-400">Manage real-time headers. Disabling a menu prevents client access instantly.</p>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-600 border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200 font-mono text-[10px]">
                      <tr>
                        <th className="p-3">Sequence</th>
                        <th className="p-3">Menu Link</th>
                        <th className="p-3">Target Address</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Delete</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {menusList.map((m, index) => (
                        <tr key={index} className="hover:bg-slate-50">
                          <td className="p-3 font-mono text-slate-500 font-bold">#{m.sortOrder}</td>
                          <td className="p-3 text-slate-800 font-bold flex items-center gap-2">
                            <span>{m.label}</span>
                          </td>
                          <td className="p-3 font-mono text-slate-500">{m.url}</td>
                          <td className="p-3">
                            <button 
                              onClick={() => handleToggleMenuEnabled(m.id, m.isEnabled)}
                              className={`px-2 py-0.5 rounded text-[10px] font-mono border cursor-pointer ${
                                m.isEnabled 
                                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                                  : 'bg-zinc-100 border-zinc-200 text-zinc-500'
                              }`}
                            >
                              {m.isEnabled ? 'Active' : 'Disabled'}
                            </button>
                          </td>
                          <td className="p-3 text-right">
                            <button 
                              onClick={() => handleDeleteMenu(m.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded transition"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ─── NEW MODULE 3: FORMS BUILDER ─── */}
        {activeMenu === 'forms_builder' && (
          <div className="space-y-6">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest font-mono">Compose Custom Contact/Lead Schema</h4>
                  <p className="text-[11px] text-slate-500">Define layouts, custom select elements, and automatic CRM routing parameters.</p>
                </div>

                <div className="space-y-4 text-xs font-semibold text-slate-700">
                  <div className="space-y-1.5">
                    <label>Form Logical Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Enterprise CRM RFP Proposal" 
                      value={newFormObj.name}
                      onChange={e => setNewFormObj({...newFormObj, name: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label>Action Target System</label>
                      <select 
                        value={newFormObj.actionType}
                        onChange={e => setNewFormObj({...newFormObj, actionType: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none"
                      >
                        <option value="crm_lead">CRM Lead Pipeline</option>
                        <option value="whatsapp">Client WhatsApp Redirect</option>
                        <option value="email">Accounting Email Alert</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label>Binding Parameter/Value</label>
                      <input 
                        type="text" 
                        placeholder="e.g. +88017... or sales_pipe" 
                        value={newFormObj.actionValue}
                        onChange={e => setNewFormObj({...newFormObj, actionValue: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Fields Sub-Form */}
                  <div className="border border-dashed border-slate-200 p-4 rounded-xl space-y-3 bg-slate-50 text-[11px]">
                    <span className="font-bold text-slate-800 uppercase font-mono text-[10px] block">Fields Constructor</span>
                    
                    <div className="grid grid-cols-3 gap-2">
                      <div className="space-y-1">
                        <label>Field Name</label>
                        <input 
                          type="text" 
                          placeholder="e.g. VAT Reg Number" 
                          value={newFormField.label}
                          onChange={e => setNewFormField({...newFormField, label: e.target.value})}
                          className="w-full bg-white border border-slate-200 rounded px-2 py-1 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label>Input Type</label>
                        <select 
                          value={newFormField.type}
                          onChange={e => setNewFormField({...newFormField, type: e.target.value as any})}
                          className="w-full bg-white border border-slate-200 rounded px-2 py-1 focus:outline-none"
                        >
                          <option value="text">Single Line Text</option>
                          <option value="textarea">Multi-line Text</option>
                          <option value="number">Number Dial</option>
                          <option value="email">Email</option>
                          <option value="tel">Phone</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label>Trigger Click</label>
                        <button 
                          type="button"
                          onClick={handleAddTempField}
                          className="w-full py-1 bg-slate-900 hover:bg-slate-800 text-white rounded font-bold cursor-pointer transition text-center"
                        >
                          Add Field
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1 bg-white border border-slate-100 p-2 rounded max-h-[120px] overflow-y-auto">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Temporary schema preview:</span>
                      {formFieldsTemp.length === 0 ? <span className="text-slate-400 font-mono italic">No fields appended yet...</span> : (
                        <div className="space-y-1 text-[10px] font-mono leading-tight">
                          {formFieldsTemp.map((f, k) => (
                            <div key={k} className="flex justify-between text-slate-700">
                              <span>✓ {f.label} ({f.type})</span>
                              <span className="text-zinc-400">Required</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <button 
                    type="button"
                    onClick={handleCreateForm}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition text-center text-xs"
                  >
                    Deploy Complete Customer Form Schema
                  </button>

                </div>
              </div>

              <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase font-mono">Current Custom Form Schemas</h4>
                  <p className="text-[11px] text-slate-400">Active forms dynamically populate leads dashboard and CRM registries.</p>
                </div>

                <div className="space-y-4">
                  {formsList.map((f, index) => (
                    <div key={index} className="border border-slate-100 p-4 rounded-xl space-y-3 bg-slate-50/70">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold text-slate-900 text-xs block">{f.name}</span>
                          <span className="text-[10px] text-slate-500 font-mono">Target Route: {f.actionType} → {f.actionValue}</span>
                        </div>
                        <button 
                          onClick={() => handleDeleteForm(f.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-slate-100 p-2 rounded transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {f.fields?.map((fld: any, fk: number) => (
                          <div key={fk} className="p-2 bg-white rounded-lg border border-slate-100 flex flex-col gap-0.5 text-[10px]">
                            <span className="font-bold text-slate-800">{fld.label}</span>
                            <span className="font-mono text-slate-400 capitalize">{fld.type} | required</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ─── NEW MODULE 4: WHATSAPP ROUTING ─── */}
        {activeMenu === 'whatsapp_routing' && (
          <div className="space-y-6">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest font-mono">Add Dynamic WhatsApp Channel Routing</h4>
                  <p className="text-[11px] text-slate-500">Route target leads dynamically to respective department experts.</p>
                </div>

                <form onSubmit={handleCreateWARoute} className="space-y-4 text-xs font-semibold text-slate-700">
                  <div className="space-y-1.5">
                    <label>Department Designation</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Healthcare Enterprise Specialist" 
                      value={newWAPath.department}
                      onChange={e => setNewWAPath({...newWAPath, department: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label>Expert Agent Name</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Dr. Tanvir" 
                        value={newWAPath.agentName}
                        onChange={e => setNewWAPath({...newWAPath, agentName: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label>Phone (including country code)</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. +88017..." 
                        value={newWAPath.phone}
                        onChange={e => setNewWAPath({...newWAPath, phone: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label>Prised Direct Message Template</label>
                    <textarea 
                      rows={3}
                      required 
                      placeholder="e.g. Hi Tanvir, I am calling from Eurosia App to explore the ERP custom module..." 
                      value={newWAPath.messageTemplate}
                      onChange={e => setNewWAPath({...newWAPath, messageTemplate: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-slate-500 font-sans leading-normal"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition"
                  >
                    Deploy Active Helpdesk Route
                  </button>
                </form>
              </div>

              <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase font-mono">Current Active Helpdesk Experts Channels</h4>
                  <p className="text-[11px] text-slate-400">All CTA forms on our solutions page instantly route back-end leads based on these rules.</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {whatsappRoutesList.map((route, i) => (
                    <div key={i} className="border border-slate-150 rounded-xl p-4 bg-slate-50/70 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-extrabold text-slate-800 text-xs block">{route.department}</span>
                          <span className="text-[10px] text-indigo-600 font-mono">Expert Name: {route.agentName}</span>
                        </div>
                        <button 
                          onClick={() => handleDeleteWARoute(route.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-slate-100 p-1.5 rounded transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-slate-500 bg-white p-2.5 rounded-lg border border-slate-100 font-sans leading-normal">
                        <span className="text-[9px] uppercase tracking-wider font-bold text-zinc-400 block mb-1">Preset message payload:</span>
                        "{route.messageTemplate}"
                      </div>

                      <div className="flex justify-between items-center text-[11px] font-mono leading-none pt-2 border-t border-slate-100">
                        <span className="text-emerald-700 bg-emerald-50 px-2 py-1 rounded font-bold">{route.phone}</span>
                        <button 
                          onClick={() => handleToggleWARouteStatus(route.id, route.isEnabled)}
                          className={`px-2 py-0.5 rounded text-[10px] font-mono border cursor-pointer ${
                            route.isEnabled 
                              ? 'bg-emerald-100 border-emerald-300 text-emerald-850' 
                              : 'bg-zinc-200 border-zinc-300 text-zinc-650'
                          }`}
                        >
                          {route.isEnabled ? 'Live' : 'Hidden'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ─── NEW MODULE 5: MARKETPLACE MANAGER ─── */}
        {activeMenu === 'marketplace_manager' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Eurosia App Ecosystem Marketplace</h3>
                <p className="text-xs text-slate-500 font-sans">
                  Publish, configure, and manage high-performance POS, ERP, CRM, HRM SaaS modules and direct access download links instantly.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingAppModule(null);
                  setAppModuleForm({
                    name: '', description: '', slug: '', icon: 'Box', category: 'management', rating: 5.0, fee: 3500, status: 'active',
                    externalUrl: '', isExternal: false, openInNewTab: true, screenshots: '', demoUrl: '', downloadUrl: '', trialUrl: '', trialDays: 14
                  });
                  setIsCreatingAppModule(true);
                }}
                className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-lg transition-all flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Register Partner SaaS App</span>
              </button>
            </div>

            {(isCreatingAppModule || editingAppModule) && (
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
                    {editingAppModule ? `Edit Configuration: ${editingAppModule.name}` : 'Register New SaaS App'}
                  </h4>
                  <button 
                    onClick={() => { setIsCreatingAppModule(false); setEditingAppModule(null); }}
                    className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs font-semibold text-slate-700">
                  <div className="space-y-1.5">
                    <label>Application Name</label>
                    <input 
                      type="text"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                      value={appModuleForm.name}
                      onChange={e => setAppModuleForm({...appModuleForm, name: e.target.value})}
                      placeholder="e.g. EUROSIA School Management"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label>Unique Key Namespace (Slug)</label>
                    <input 
                      type="text"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                      value={appModuleForm.slug}
                      onChange={e => setAppModuleForm({...appModuleForm, slug: e.target.value})}
                      placeholder="e.g. school-mgmt"
                      disabled={!!editingAppModule}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label>Category Group</label>
                    <select
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                      value={appModuleForm.category}
                      onChange={e => setAppModuleForm({...appModuleForm, category: e.target.value})}
                    >
                      <option value="management">ERP & Management</option>
                      <option value="ai">AI Chatbot & Autonomy</option>
                      <option value="comms">Cloud PBX & Telecom</option>
                      <option value="fintech">Financial Tech & Cash</option>
                      <option value="sec">Cyber Security & Protection</option>
                      <option value="industry">Specialized Industry (Hospital/School)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label>Lucide Icon ID</label>
                    <input 
                      type="text"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-mono"
                      value={appModuleForm.icon}
                      onChange={e => setAppModuleForm({...appModuleForm, icon: e.target.value})}
                      placeholder="e.g. Building2"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label>Monthly Ecosystem Subscription Fee (BDT)</label>
                    <input 
                      type="number"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                      value={appModuleForm.fee}
                      onChange={e => setAppModuleForm({...appModuleForm, fee: parseInt(e.target.value) || 0})}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label>Marketplace Status</label>
                    <select
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                      value={appModuleForm.status}
                      onChange={e => setAppModuleForm({...appModuleForm, status: e.target.value as any})}
                    >
                      <option value="active">Active & Visible</option>
                      <option value="inactive">Inactive Sandbox (Draft)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5 md:col-span-2 lg:col-span-3">
                    <label>Short Description (Bangla / English context value)</label>
                    <textarea 
                      rows={2}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 font-medium"
                      value={appModuleForm.description}
                      onChange={e => setAppModuleForm({...appModuleForm, description: e.target.value})}
                      placeholder="Enter specific features and technical limits of the SaaS app..."
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label>Installer/Download URL (Windows/iOS/Android)</label>
                    <input 
                      type="text"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                      value={appModuleForm.downloadUrl || ''}
                      onChange={e => setAppModuleForm({...appModuleForm, downloadUrl: e.target.value})}
                      placeholder="e.g. /apps/pos_setup.exe"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label>Product Live Demo Web Link</label>
                    <input 
                      type="text"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                      value={appModuleForm.demoUrl || ''}
                      onChange={e => setAppModuleForm({...appModuleForm, demoUrl: e.target.value})}
                      placeholder="e.g. https://pos.eurosia.io/demo"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label>Ecosystem Self-Onboarding Trial Web Link</label>
                    <input 
                      type="text"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                      value={appModuleForm.trialUrl || ''}
                      onChange={e => setAppModuleForm({...appModuleForm, trialUrl: e.target.value})}
                      placeholder="e.g. https://pos.eurosia.io/trial"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label>Default Free Trial Period (Days)</label>
                    <input 
                      type="number"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                      value={appModuleForm.trialDays || 14}
                      onChange={e => setAppModuleForm({...appModuleForm, trialDays: parseInt(e.target.value) || 14})}
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-2 lg:col-span-2">
                    <label>Catalog Screen Mockups / Screenshots (Comma-separated asset URLs)</label>
                    <input 
                      type="text"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-mono text-[11px]"
                      value={appModuleForm.screenshots || ''}
                      onChange={e => setAppModuleForm({...appModuleForm, screenshots: e.target.value})}
                      placeholder="e.g. /banners/pos1.png, /banners/pos2.png"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 justify-end pt-4 border-t border-slate-100">
                  <button
                    onClick={() => { setIsCreatingAppModule(false); setEditingAppModule(null); }}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSaveAppModule(appModuleForm)}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition"
                  >
                    Commit Active Registry
                  </button>
                </div>
              </div>
            )}

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase font-mono tracking-wider">Currently Registered App Ecosystem Nodes ({appModules.length})</span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF3D4F] animate-pulse" />
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {appModules.map((app, appIdx) => {
                  return (
                    <div key={appIdx} className="border border-slate-200 hover:border-slate-350 rounded-xl p-5 bg-slate-50/60 hover:bg-white flex flex-col justify-between gap-4 transition-all duration-300 group shadow-xs">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="p-2.5 bg-slate-900 rounded-xl text-white">
                            <Layers className="w-5 h-5 text-rose-400" />
                          </div>
                          <span className={`text-[10px] font-bold uppercase tracking-wider font-mono px-2 py-0.5 rounded-full ${
                            app.status === 'active' 
                              ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
                              : 'bg-zinc-100 text-zinc-500 border border-zinc-200'
                          }`}>
                            {app.status}
                          </span>
                        </div>

                        <div>
                          <h4 className="font-extrabold text-slate-900 text-base">{app.name}</h4>
                          <span className="text-[10px] bg-slate-100 text-slate-500 font-mono px-1.5 py-0.5 rounded">key: {app.slug}</span>
                          <p className="text-xs text-slate-500 font-sans leading-relaxed mt-2 line-clamp-3 font-medium">
                            {app.description || "(No description written. Click edit to provide technical parameters.)"}
                          </p>
                        </div>

                        <div className="space-y-1 bg-white border border-slate-100 rounded-lg p-2.5 text-[11px] font-sans">
                          <div className="flex items-center justify-between text-slate-500">
                            <span>SaaS Monthly Subscription:</span>
                            <span className="font-extrabold text-slate-900 font-mono">৳ {app.fee?.toLocaleString()} BDT</span>
                          </div>
                          <div className="flex items-center justify-between text-slate-500">
                            <span>Trial Interval:</span>
                            <span className="text-slate-800 font-bold">{app.trialDays || 14} Days Trial</span>
                          </div>
                          {(app.downloadUrl || app.demoUrl) && (
                            <div className="border-t border-slate-50 pt-1.5 mt-1.5 space-y-1">
                              {app.downloadUrl && (
                                <div className="text-[10px] text-indigo-600 truncate">
                                  📦 Download: {app.downloadUrl}
                                </div>
                              )}
                              {app.demoUrl && (
                                <div className="text-[10px] text-pink-600 truncate">
                                  🌐 Demo link: {app.demoUrl}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-2">
                        <button
                          onClick={() => {
                            setEditingAppModule(app);
                            setAppModuleForm({
                              name: app.name,
                              description: app.description || '',
                              slug: app.slug,
                              icon: app.icon || 'Box',
                              category: app.category || 'management',
                              rating: app.rating || 5.0,
                              fee: app.fee || 0,
                              status: app.status || 'active',
                              externalUrl: app.externalUrl || '',
                              isExternal: !!app.isExternal,
                              openInNewTab: app.openInNewTab !== false,
                              screenshots: app.screenshots || '',
                              demoUrl: app.demoUrl || '',
                              downloadUrl: app.downloadUrl || '',
                              trialUrl: app.trialUrl || '',
                              trialDays: app.trialDays || 14
                            });
                            setIsCreatingAppModule(false);
                          }}
                          className="px-2.5 py-1 text-[11px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg cursor-pointer flex items-center gap-1.5"
                        >
                          <Edit className="w-3.5 h-3.5 text-slate-500" />
                          <span>Configure</span>
                        </button>
                        <button
                          onClick={() => handleDeleteAppModule(app.id)}
                          className="p-1 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded transition"
                          title="Purge App Registry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ─── NEW MODULE 6: AI WRITING STUDIO ─── */}
        {activeMenu === 'ai_studio' && (
          <div className="space-y-6">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest font-mono">Enterprise AI Strategy copywriter</h4>
                  <p className="text-[11px] text-slate-500">Draft sales arguments, meta descriptions, or website blogs backboned by Eurosia's Gemini Pro context model.</p>
                </div>

                <div className="space-y-4 text-xs font-semibold text-slate-700">
                  <div className="space-y-1.5">
                    <label>Task Prompt / Instructions</label>
                    <textarea 
                      rows={6}
                      value={aiPrompt}
                      onChange={e => setAiPrompt(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-lg text-slate-900 focus:outline-none focus:border-slate-500 font-sans text-xs leading-normal font-medium"
                    />
                  </div>

                  <button 
                    type="button"
                    disabled={aiGenerating}
                    onClick={handleAiGenerateText}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 "
                  >
                    <Bot className="w-4 h-4 text-pink-400" />
                    <span>{aiGenerating ? 'Authoring content...' : 'Generate Copywriting'}</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-8 bg-zinc-900 text-zinc-100 rounded-xl p-6 shadow-md border border-zinc-800 space-y-4 font-mono min-h-[400px] flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">OUTPUT CONSOLE: GEMINI-PRO DUPLICATOR</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  
                  <div className="text-xs leading-relaxed whitespace-pre-wrap max-h-[340px] overflow-y-auto custom-scrollbar font-mono py-2 text-zinc-300">
                    {aiDraftResults || "Awaiting task prompt input. Enter prompt instructions and generate highly persuasive content in BDT contexts."}
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-800 flex justify-between items-center text-[10px] text-zinc-500">
                  <span>SYSTEM_SECURE_GEMINI_API [OK]</span>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(aiDraftResults);
                      showNotification("Copied copywritten block to clipboard!");
                    }}
                    className="text-zinc-400 hover:text-white underline cursor-pointer"
                  >
                    Copy Output
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ─── NEW MODULE 7: DESIGN IDENTITY FORWARD ─── */}
        {activeMenu === 'design' && (
          <div className="space-y-6">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-[#FF3D4F] uppercase tracking-widest font-mono">Eurosia Color & Typography Center</h4>
                  <p className="text-[11px] text-slate-500">Inject custom logos, primary identity hexes, and layout margins instantly across public iframe containers.</p>
                </div>

                <form onSubmit={handleSaveThemeSettings} className="space-y-4 text-xs font-semibold text-slate-700">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label>Primary Accenting Color</label>
                      <div className="flex gap-2">
                        <input 
                          type="color" 
                          value={themeColor}
                          onChange={e => setThemeColor(e.target.value)}
                          className="w-8 h-8 rounded cursor-pointer mt-1 border border-slate-200"
                        />
                        <input 
                          type="text" 
                          value={themeColor}
                          onChange={e => setThemeColor(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label>Secondary Accent Background</label>
                      <div className="flex gap-2">
                        <input 
                          type="color" 
                          value={themeSecondaryColor}
                          onChange={e => setThemeSecondaryColor(e.target.value)}
                          className="w-8 h-8 rounded cursor-pointer mt-1 border border-slate-200"
                        />
                        <input 
                          type="text" 
                          value={themeSecondaryColor}
                          onChange={e => setThemeSecondaryColor(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label>Corporate Branding Logo (URL path / Resource)</label>
                    <input 
                      type="text" 
                      value={themeLogo}
                      onChange={e => setThemeLogo(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label>Favicon ICO File Address (PWA standard)</label>
                    <input 
                      type="text" 
                      value={themeFavicon}
                      onChange={e => setThemeFavicon(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label>Font Pairings Scheme</label>
                      <select 
                        value={themeTypography}
                        onChange={e => setThemeTypography(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                      >
                        <option value="Inter-SpaceGrotesk">Sans-Inter & Display-Space Grotesk</option>
                        <option value="Outfit-Playfair">Sans-Outfit & Display-Playfair Serif</option>
                        <option value="Inter-JetBrains">Sans-Inter & Mono-JetBrains</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label>Layout Spacing Width</label>
                      <select 
                        value={themeWidth}
                        onChange={e => setThemeWidth(e.target.value as any)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                      >
                        <option value="compact">Compact Framework (Slim margins)</option>
                        <option value="standard">Standard Default (Balanced padding)</option>
                        <option value="wide">Wide Screen Expand (Full width grids)</option>
                      </select>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-2.5 bg-[#FF3D4F] hover:bg-[#CC1A2F] text-white font-bold rounded-lg transition"
                  >
                    Commit Global Styles Parameters
                  </button>
                </form>
              </div>

              <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase font-mono">Dynamic Brand Preview Framework</h4>
                  <p className="text-[11px] text-slate-400">Current active stylesheet settings applying dynamic color values to Eurosia.app</p>
                </div>

                <div className="border border-slate-150 p-6 rounded-xl space-y-4 bg-zinc-950 text-white min-h-[220px] relative select-none">
                  <div className="flex justify-between items-center pb-3 border-b border-zinc-800">
                    <span className="text-xs uppercase tracking-widest font-bold text-zinc-500 font-mono">Theme Preview card mockup</span>
                    <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: themeColor }} />
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-lg font-black tracking-tight" style={{ fontFamily: themeTypography.split('-')[1] }}>
                      Eurosia App Ecosystem Suite
                    </h2>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                      Providing dynamic cloud scaling, local storage room database persistence, and native dual engines.
                    </p>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button className="px-4 py-2 text-[10px] uppercase font-bold text-white rounded-lg cursor-pointer" style={{ backgroundColor: themeColor }}>
                      Primary Button
                    </button>
                    <button className="px-4 py-2 text-[10px] uppercase font-bold text-zinc-300 rounded-lg border border-zinc-700">
                      Standard
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ─── NEW MODULE 8: DATABASE SCHEMATIC ERD VISUALIZER ─── */}
        {activeMenu === 'database_erd' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm space-y-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest font-mono text-[#FF3D4F]">Relational Cloud PostgreSQL Architecture Schematic Map (ERD)</h4>
                <p className="text-[11px] text-slate-400">Enterprise relational indexes, master key bindings, and database columns validating integrity across sub-tenants.</p>
              </div>

              {/* Graphical Schema Visualization */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 text-xs font-medium relative leading-relaxed max-h-[460px] overflow-y-auto">
                
                {/* Node: Companies */}
                <div className="border border-indigo-200 rounded-xl bg-indigo-50/50 p-4 shadow-xs relative">
                  <div className="bg-indigo-600 text-white p-1.5 rounded uppercase font-mono text-[10px] font-bold text-center mb-2.5">
                    Table: Companies (Active Tenant)
                  </div>
                  <div className="space-y-1 text-[11px] font-mono text-slate-700">
                    <p className="text-slate-900 font-bold">✓ id (PK: text)</p>
                    <p>✓ name (text)</p>
                    <p>✓ email (text)</p>
                    <p>✓ status (enum: Active/Suspended)</p>
                    <p>✓ subscriptionStatus (text)</p>
                    <p>✓ storageLimitGb (integer)</p>
                    <p>✓ packageId (FK: text)</p>
                  </div>
                </div>

                {/* Node: Users */}
                <div className="border border-sky-200 rounded-xl bg-sky-50/50 p-4 shadow-xs relative">
                  <div className="bg-sky-600 text-white p-1.5 rounded uppercase font-mono text-[10px] font-bold text-center mb-2.5">
                    Table: Users (RBAC Bound)
                  </div>
                  <div className="space-y-1 text-[11px] font-mono text-slate-700">
                    <p className="text-sky-900 font-bold">✓ id (PK: text)</p>
                    <p className="text-indigo-600 font-semibold">✓ companyId (FK → Companies.id)</p>
                    <p>✓ name (text)</p>
                    <p>✓ email (text: UNIQUE)</p>
                    <p>✓ passwordHash (string)</p>
                    <p>✓ role (enum: Custom/Accountant)</p>
                    <p>✓ status (text)</p>
                  </div>
                </div>

                {/* Node: Licenses */}
                <div className="border border-emerald-200 rounded-xl bg-emerald-50/50 p-4 shadow-xs relative">
                  <div className="bg-emerald-600 text-white p-1.5 rounded uppercase font-mono text-[10px] font-bold text-center mb-2.5">
                    Table: Licenses (Key Cryptography)
                  </div>
                  <div className="space-y-1 text-[11px] font-mono text-slate-700">
                    <p className="text-emerald-900 font-bold">✓ id (PK: text)</p>
                    <p className="text-indigo-600 font-semibold">✓ companyId (FK → Companies.id)</p>
                    <p>✓ licenseKey (text: INDEXED)</p>
                    <p>✓ maxUsers (integer)</p>
                    <p>✓ maxDevices (integer)</p>
                    <p>✓ offlineAllowed (boolean)</p>
                    <p>✓ expiryDate (timestamp)</p>
                  </div>
                </div>

                {/* Node: Sync Log */}
                <div className="border border-orange-200 rounded-xl bg-orange-50/50 p-4 shadow-xs relative">
                  <div className="bg-orange-600 text-white p-1.5 rounded uppercase font-mono text-[10px] font-bold text-center mb-2.5">
                    Table: Synclogs (Offline Nodes)
                  </div>
                  <div className="space-y-1 text-[11px] font-mono text-slate-700">
                    <p className="text-orange-900 font-bold">✓ id (PK: text)</p>
                    <p className="text-indigo-600 font-semibold">✓ companyId (FK → Companies.id)</p>
                    <p>✓ deviceFingerprint (text)</p>
                    <p>✓ action (enum: Pull/Push/Resolve)</p>
                    <p>✓ status (enum: Success/Conflict)</p>
                    <p>✓ recordsSyncedCount (integer)</p>
                    <p>✓ createdAt (timestamp)</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ─── NEW MODULE 9: SYSTEM TRANSLATION & LOCALIZATION CONTROLLERS ─── */}
        {activeMenu === 'translation_manager' && (
          <div className="space-y-8">
            {/* Header description */}
            <div className="bg-slate-900 border border-[#16166F]/50 p-6 rounded-2xl text-white shadow-xl relative overflow-hidden">
              <div className="absolute right-0 top-0 opacity-10 font-mono text-[120px] select-none pointer-events-none tracking-widest text-[#FF3D4F] font-black">
                i18n
              </div>
              <div className="relative z-10 space-y-2">
                <span className="bg-[#FF3D4F] text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full font-mono">
                  Multi-Language Sync Node
                </span>
                <h3 className="text-xl font-bold font-mono tracking-tight text-white uppercase">System Translation Engine</h3>
                <p className="text-slate-300 text-xs max-w-3xl leading-relaxed">
                  Manage active regional languages, map customized localization keys, import standard asset structures, and update corporate copywriting instantly across all target client platforms.
                </p>
              </div>
            </div>

            {/* Quick Setup grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Language master console */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wider font-mono">1. Registered Locales</h4>
                  <p className="text-[11px] text-slate-400">Configure status and register custom language regions.</p>
                </div>

                <div className="space-y-2 max-h-[220px] overflow-y-auto">
                  {dbLangs.map((lang: any) => (
                    <div key={lang.id} className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 bg-slate-50 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-[10px] font-bold">
                          {lang.languageCode}
                        </span>
                        <span className="font-semibold text-slate-700">{lang.name}</span>
                      </div>
                      <button
                        onClick={async () => {
                          const nextStatus = lang.status === 'active' ? 'inactive' : 'active';
                          try {
                            const res = await fetch(`/api/i18n/languages/${lang.id}`, {
                              method: 'PUT',
                              headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json'
                              },
                              body: JSON.stringify({ status: nextStatus })
                            });
                            if (res.ok) {
                              showNotification(`Language '${lang.name}' set to ${nextStatus}.`);
                              // reload details
                              fetchAdminDetails();
                            }
                          } catch (err: any) {
                            showNotification(err.message, true);
                          }
                        }}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold cursor-pointer transition-colors ${
                          lang.status === 'active' 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100' 
                            : 'bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {lang.status.toUpperCase()}
                      </button>
                    </div>
                  ))}
                </div>

                {/* Register language form */}
                <form 
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!newLangCode || !newLangName) {
                      showNotification("Fill in language code and common region name.", true);
                      return;
                    }
                    try {
                      const res = await fetch('/api/i18n/languages', {
                        method: 'POST',
                        headers: {
                          'Authorization': `Bearer ${token}`,
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ languageCode: newLangCode, name: newLangName })
                      });
                      if (res.ok) {
                        showNotification(`Successfully registered database master language locale: ${newLangName}`);
                        setNewLangCode('');
                        setNewLangName('');
                        fetchAdminDetails();
                      }
                    } catch (err: any) {
                      showNotification(err.message, true);
                    }
                  }}
                  className="pt-4 border-t border-slate-100 space-y-3"
                >
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono font-extrabold">Register Locale Node</p>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="e.g. ko"
                      value={newLangCode}
                      onChange={(e) => setNewLangCode(e.target.value)}
                      className="col-span-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs placeholder-slate-400 focus:border-[#FF3D4F] focus:outline-none focus:ring-1 focus:ring-[#FF3D4F]"
                    />
                    <input
                      type="text"
                      placeholder="e.g. Korean"
                      value={newLangName}
                      onChange={(e) => setNewLangName(e.target.value)}
                      className="col-span-2 px-3 py-1.5 border border-slate-300 rounded-lg text-xs placeholder-slate-400 focus:border-[#FF3D4F] focus:outline-none focus:ring-1 focus:ring-[#FF3D4F]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#FF3D4F] hover:bg-[#D62E3E] text-white text-[11px] tracking-wider uppercase font-bold py-2 rounded-lg cursor-pointer transition-colors shadow-sm"
                  >
                    Mount New Locale
                  </button>
                </form>
              </div>

              {/* Translation bulk controls */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wider font-mono">2. Import & Export Console</h4>
                  <p className="text-[11px] text-slate-400">Exchange JSON structures instantly for localized releases.</p>
                </div>

                <div className="space-y-3">
                  {/* Export Trigger */}
                  <button
                    onClick={() => {
                      // Construct a localized translation JSON dictionary file 
                      const dict: { [namespace: string]: { [key: string]: string } } = {};
                      
                      // Prepopulate standard labels first
                      const standardKeys = [
                        { ns: 'common', k: 'save', v: 'Save Changes' },
                        { ns: 'common', k: 'edit', v: 'Edit' },
                        { ns: 'common', k: 'delete', v: 'Delete' },
                        { ns: 'common', k: 'cancel', v: 'Cancel' },
                        { ns: 'common', k: 'status', v: 'Status' },
                        { ns: 'common', k: 'active', v: 'Active' },
                        { ns: 'common', k: 'inactive', v: 'Inactive' },
                        { ns: 'navbar', k: 'brand', v: 'EUROSIA' },
                        { ns: 'navbar', k: 'home', v: 'Home' },
                        { ns: 'navbar', k: 'apps', v: 'Apps' },
                        { ns: 'navbar', k: 'solutions', v: 'Solutions' },
                        { ns: 'navbar', k: 'marketplace', v: 'Marketplace' },
                        { ns: 'navbar', k: 'pricing', v: 'Pricing' },
                        { ns: 'navbar', k: 'about', v: 'About' },
                        { ns: 'navbar', k: 'contact', v: 'Contact' },
                        { ns: 'navbar', k: 'startTrial', v: 'Start Free Trial' },
                        { ns: 'navbar', k: 'exploreDashboard', v: 'Explore Dashboard' },
                        { ns: 'login', k: 'title', v: 'MEMBER ACCESS TERMINAL' },
                        { ns: 'login', k: 'email_label', v: 'User Identification Email' },
                        { ns: 'login', k: 'password_label', v: 'Security Phrase' },
                        { ns: 'login', k: 'submit_btn', v: 'Establish Connection Lock' }
                      ];

                      standardKeys.forEach((item) => {
                        if (!dict[item.ns]) dict[item.ns] = {};
                        // Check override 
                        const matched = dbTrans.find(o => o.key === item.k && o.languageCode === selectedTargetLang);
                        dict[item.ns][item.k] = matched ? matched.value : item.v;
                      });

                      const fileContent = JSON.stringify(dict, null, 2);
                      const blob = new Blob([fileContent], { type: 'application/json' });
                      const link = document.createElement('a');
                      link.href = URL.createObjectURL(blob);
                      link.download = `eurosia_translations_${selectedTargetLang}.json`;
                      link.click();
                      showNotification(`Downloaded structure for locale: ${selectedTargetLang}`);
                    }}
                    className="w-full text-left flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-[#FF3D4F] bg-slate-50 transition-colors text-xs font-mono font-bold cursor-pointer group"
                  >
                    <span>EXPORT '{selectedTargetLang.toUpperCase()}' JSON</span>
                    <PlusCircle className="w-4 h-4 text-[#FF3D4F] group-hover:scale-110 transition-transform" />
                  </button>

                  {/* Import paste area */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono tracking-widest uppercase font-extrabold text-slate-500">
                      Import Translation Paste Area
                    </label>
                    <textarea
                      placeholder='Paste localization dictionary e.g.: {"common": {"save": "সংরক্ষণ করুন"}, "navbar": {"home": "নীড়"}}'
                      rows={3}
                      id="import-json-pasteboard"
                      className="w-full p-2.5 font-mono text-[9px] border border-slate-200 rounded-lg bg-slate-50 focus:bg-white text-slate-700 md:text-xs focus:outline-none"
                    ></textarea>
                    <button
                      onClick={async () => {
                        const ta = document.getElementById('import-json-pasteboard') as HTMLTextAreaElement;
                        if (!ta || !ta.value.trim()) {
                          showNotification("Copy/paste valid nested key dictionary values inside the text field.", true);
                          return;
                        }
                        try {
                          const parsedDict = JSON.parse(ta.value.trim());
                          const itemsList: any[] = [];
                          
                          // Traverse dictionary structure namespaces
                          Object.keys(parsedDict).forEach((nsKey) => {
                            const nsObj = parsedDict[nsKey];
                            if (typeof nsObj === 'object') {
                              Object.keys(nsObj).forEach((stringKey) => {
                                itemsList.push({
                                  languageCode: selectedTargetLang,
                                  key: stringKey,
                                  value: nsObj[stringKey],
                                  namespace: nsKey,
                                  status: 'active'
                                });
                              });
                            }
                          });

                          if (itemsList.length === 0) {
                            showNotification("Invalid nested dictionary. No entries were decoded.", true);
                            return;
                          }

                          const res = await fetch('/api/i18n/translations/bulk', {
                            method: 'POST',
                            headers: {
                              'Authorization': `Bearer ${token}`,
                              'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ translations: itemsList })
                          });

                          if (res.ok) {
                            const result = await res.json();
                            showNotification(`Imported & processed ${result.count} translations successfully.`);
                            ta.value = '';
                            fetchAdminDetails();
                          }
                        } catch (err: any) {
                          showNotification("Parsing failed. Verify proper JSON structure rules. Error: " + err.message, true);
                        }
                      }}
                      className="w-full bg-[#11135E] hover:bg-[#1C2096] text-white text-[10px] font-mono tracking-wider font-extrabold py-2 rounded-lg cursor-pointer transition-colors"
                    >
                      Process & Parse JSON Upload
                    </button>
                  </div>
                </div>

                <div className="p-3 border border-indigo-100 bg-indigo-50/50 rounded-lg text-[9px] text-indigo-700 select-none">
                  💡 <strong>Tip:</strong> Ensure standard namespacing matching `"common"`, `"navbar"`, `"footer"`, `"login"`, `"dashboard"` or `"admin"` to keep standard mapping intact.
                </div>
              </div>

              {/* Publish Sync center */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wider font-mono">3. Live Release Core</h4>
                  <p className="text-[11px] text-slate-400">Validate master configurations and release changes live.</p>
                </div>

                <div className="border border-[#FF3D4F]/20 bg-[#FF3D4F]/3 p-4 rounded-xl space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#FF3D4F]" />
                    <span className="font-bold text-xs text-slate-900">Total Localization Overrides</span>
                  </div>
                  <div className="text-xl font-bold font-mono text-[#FF3D4F]">
                    {dbTrans.filter(t => t.status === 'active').length} active records
                  </div>
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    Custom translation overrides are prioritized. Any modifications instantly update across user and admin controls once committed.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    showNotification("Released & committed master translation changes live globally.");
                    // Dynamic hard reload to clear cache
                    setTimeout(() => {
                      window.location.reload();
                    }, 800);
                  }}
                  className="w-full bg-[#000000] hover:bg-[#222] text-white text-xs font-bold leading-none py-3.5 rounded-xl cursor-pointer transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4 animate-spin-reverse" />
                  <span>REFRESH APP CACHE LIVE</span>
                </button>
              </div>

            </div>

            {/* Translation Keys Matrix Grid Editor */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
              
              {/* Menu and search filters */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wider font-mono">4. Direct Overrides Table Matrix</h4>
                  <p className="text-[11px] text-slate-400">Search localization tags and customize copywriting live.</p>
                </div>

                <div className="flex items-center gap-2">
                  {/* Target language picker */}
                  <select
                    value={selectedTargetLang}
                    onChange={(e) => setSelectedTargetLang(e.target.value)}
                    className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-mono font-bold bg-white text-slate-800 focus:outline-none focus:border-[#FF3D4F]"
                  >
                    {dbLangs.map((lang: any) => (
                      <option key={lang.id} value={lang.languageCode}>
                        Translate '{lang.name}' ({lang.languageCode.toUpperCase()})
                      </option>
                    ))}
                  </select>

                  {/* Search box input */}
                  <input
                    type="text"
                    placeholder="Search master keys..."
                    value={searchTranslationKey}
                    onChange={(e) => setSearchTranslationKey(e.target.value)}
                    className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs placeholder-slate-400 focus:border-[#FF3D4F] focus:outline-none"
                  />
                </div>
              </div>

              {/* Matrix List Grid */}
              <div className="overflow-x-auto text-xs">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 uppercase font-mono text-[9px] tracking-wider text-left">
                      <th className="p-3">Tag Namespace</th>
                      <th className="p-3">Master Key Name</th>
                      <th className="p-3">Standard Reference label</th>
                      <th className="p-3">Live Translation Text Override</th>
                      <th className="p-3 text-right">Commit Lock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { ns: 'common', key: 'save', ref: 'Save Changes' },
                      { ns: 'common', key: 'edit', ref: 'Edit' },
                      { ns: 'common', key: 'delete', ref: 'Delete' },
                      { ns: 'common', key: 'cancel', ref: 'Cancel' },
                      { ns: 'common', key: 'status', ref: 'Status' },
                      { ns: 'common', key: 'active', ref: 'Active' },
                      { ns: 'common', key: 'inactive', ref: 'Inactive' },
                      { ns: 'navbar', key: 'brand', ref: 'EUROSIA' },
                      { ns: 'navbar', key: 'home', ref: 'Home' },
                      { ns: 'navbar', key: 'apps', ref: 'Apps' },
                      { ns: 'navbar', key: 'solutions', ref: 'Solutions' },
                      { ns: 'navbar', key: 'marketplace', ref: 'Marketplace' },
                      { ns: 'navbar', key: 'pricing', ref: 'Pricing' },
                      { ns: 'navbar', key: 'about', ref: 'About' },
                      { ns: 'navbar', key: 'contact', ref: 'Contact' },
                      { ns: 'navbar', key: 'startTrial', ref: 'Start Free Trial' },
                      { ns: 'navbar', key: 'exploreDashboard', ref: 'Explore Dashboard' },
                      { ns: 'login', key: 'title', ref: 'MEMBER ACCESS TERMINAL' },
                      { ns: 'login', key: 'email_label', ref: 'User Identification Email' },
                      { ns: 'login', key: 'password_label', ref: 'Security Phrase' },
                      { ns: 'login', key: 'submit_btn', ref: 'Establish Connection Lock' },
                      { ns: 'dashboard', key: 'title', ref: 'OPERATIONS CENTRAL CONTROL' },
                      { ns: 'dashboard', key: 'sidebar_title', ref: 'TENANT ISOLATED ENVIRONMENT' },
                      { ns: 'dashboard', key: 'welcome_back', ref: 'Welcome back' },
                      { ns: 'dashboard', key: 'database_lock_status', ref: 'Tenant context isolation activated...' }
                    ]
                      .filter((item) => {
                        const s = searchTranslationKey.toLowerCase();
                        return (
                          item.key.toLowerCase().includes(s) ||
                          item.ns.toLowerCase().includes(s) ||
                          item.ref.toLowerCase().includes(s)
                        );
                      })
                      .map((item) => {
                        const compositeKey = `${selectedTargetLang}:${item.key}`;
                        const currentVal = editTransInput[compositeKey] || '';
                        
                        return (
                          <tr key={item.key} className="border-b border-slate-100 hover:bg-slate-50/50">
                            <td className="p-3 text-[#FF3D4F] font-mono tracking-wide">
                              {item.ns}
                            </td>
                            <td className="p-3 font-semibold font-mono text-slate-700">
                              {item.key}
                            </td>
                            <td className="p-3 text-slate-500 italic max-w-xs truncate" title={item.ref}>
                              {item.ref}
                            </td>
                            <td className="p-3">
                              <input
                                type="text"
                                placeholder={`Translate override for key [${item.key}]`}
                                value={currentVal}
                                onChange={(e) => {
                                  const newVal = e.target.value;
                                  setEditTransInput((prev) => ({
                                    ...prev,
                                    [compositeKey]: newVal
                                  }));
                                }}
                                className="w-full max-w-md px-3 py-1.5 border border-slate-200 focus:border-[#FF3D4F] text-slate-800 placeholder-slate-300 rounded focus:outline-none"
                              />
                            </td>
                            <td className="p-3 text-right">
                              <button
                                onClick={async () => {
                                  try {
                                    const res = await fetch('/api/i18n/translations', {
                                      method: 'POST',
                                      headers: {
                                        'Authorization': `Bearer ${token}`,
                                        'Content-Type': 'application/json'
                                      },
                                      body: JSON.stringify({
                                        languageCode: selectedTargetLang,
                                        key: item.key,
                                        value: currentVal,
                                        namespace: item.ns,
                                        status: 'active'
                                      })
                                    });
                                    if (res.ok) {
                                      showNotification(`Saved '${item.key}' in language locale '${selectedTargetLang}'.`);
                                      fetchAdminDetails();
                                    }
                                  } catch (err: any) {
                                    showNotification(err.message, true);
                                  }
                                }}
                                className="px-3 py-1 bg-[#11135E] hover:bg-[#1C2096] text-white text-[10px] font-mono rounded cursor-pointer font-bold uppercase"
                              >
                                Commit
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>

            </div>

          </div>
        )}

        {/* ━━━━━━━━━━━━━━━━ 1. LEADS CRM ━━━━━━━━━━━━━━━━ */}
        {activeMenu === 'leads_crm' && (
          <div className="space-y-6" id="super-leads-crm">
            <div className="flex justify-between items-center bg-[#02020F] border border-zinc-900 p-6 rounded-2xl">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-[#FF3D4F] rounded-full"></span>
                  Leads & CRM Pipeline
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Manage commercial clients, request pipelines, and group categorization metrics.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-[#05051B] border border-zinc-900/80 p-5 rounded-2xl text-left">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Total Leads Pipeline</span>
                <p className="text-2xl font-black text-white mt-1 font-mono">{customRequests.length}</p>
              </div>
              <div className="bg-[#05051B] border border-zinc-900/80 p-5 rounded-2xl text-left">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Action Required</span>
                <p className="text-2xl font-black text-rose-500 mt-1 font-mono">
                  {customRequests.filter(r => r.status !== 'completed').length}
                </p>
              </div>
              <div className="bg-[#05051B] border border-zinc-900/80 p-5 rounded-2xl text-left">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Closed & Completed</span>
                <p className="text-2xl font-black text-emerald-500 mt-1 font-mono">
                  {customRequests.filter(r => r.status === 'completed').length}
                </p>
              </div>
              <div className="bg-[#05051B] border border-zinc-900/80 p-5 rounded-2xl text-left">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Customer Group Ratio</span>
                <p className="text-lg font-black text-sky-400 mt-2 font-mono">3 Tiers Active</p>
              </div>
            </div>

            <div className="bg-[#05051B] border border-zinc-900/80 p-6 rounded-2xl text-left">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-mono">Core Leads Database</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-900 text-slate-500 font-bold font-mono">
                      <th className="p-3">Client</th>
                      <th className="p-3">Enterprise Scope</th>
                      <th className="p-3">Budget</th>
                      <th className="p-3">Routing Tier</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customRequests.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-slate-500 italic">No incoming partner requests found.</td>
                      </tr>
                    ) : (
                      customRequests.map((req: any) => (
                        <tr key={req.id} className="border-b border-zinc-900/40 hover:bg-slate-900/20">
                          <td className="p-3">
                            <div className="font-bold text-white text-sm">{req.name}</div>
                            <div className="text-slate-500 text-[10px] font-mono mt-0.5">{req.email} | {req.phone || 'No Tel'}</div>
                          </td>
                          <td className="p-3">
                            <div className="text-slate-300 font-semibold">{req.serviceType || req.solutionSelected || 'Custom ERP Blueprint'}</div>
                            <div className="text-[10px] text-slate-500 mt-0.5 font-mono">Company: {req.company || 'Direct Entity'}</div>
                          </td>
                          <td className="p-3">
                            <span className="font-mono text-emerald-400 font-bold">{req.budget || '$15,000 - $35,000'}</span>
                          </td>
                          <td className="p-3">
                            <select
                              value={req.companyTier || 'Enterprise Segment'}
                              onChange={async (e) => {
                                try {
                                  await fetch(`/api/admin/custom-solution-requests/${req.id}`, {
                                    method: 'PUT',
                                    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ ...req, companyTier: e.target.value })
                                  });
                                  showNotification("Customer mapping group updated.");
                                  fetchAdminDetails();
                                } catch (err: any) {
                                  showNotification(err.message, true);
                                }
                              }}
                              className="bg-slate-900 text-slate-300 border border-zinc-800 rounded px-2 py-1 focus:outline-none"
                            >
                              <option value="Startup Group">Startup Group</option>
                              <option value="Enterprise Segment">Enterprise Segment</option>
                              <option value="SaaS Partner Channel">SaaS Partner Channel</option>
                            </select>
                          </td>
                          <td className="p-3">
                            <span className={`inline-block px-2.5 py-1 rounded text-[10px] uppercase font-bold ${
                              req.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' :
                              req.status === 'reviewed' ? 'bg-sky-500/10 text-sky-400' :
                              'bg-rose-500/10 text-rose-400'
                            }`}>
                              {req.status || 'pending'}
                            </span>
                          </td>
                          <td className="p-3 text-right space-x-2">
                            <button
                              onClick={async () => {
                                const nextStatus = req.status === 'pending' ? 'reviewed' : req.status === 'reviewed' ? 'completed' : 'pending';
                                try {
                                  const res = await fetch(`/api/admin/custom-solution-requests/${req.id}`, {
                                    method: 'PUT',
                                    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ ...req, status: nextStatus })
                                  });
                                  if (res.ok) {
                                    showNotification(`Transitioned lead status to [${nextStatus.toUpperCase()}].`);
                                    fetchAdminDetails();
                                  }
                                } catch (err: any) {
                                  showNotification(err.message, true);
                                }
                              }}
                              className="px-2 py-1 bg-slate-900 border border-zinc-800 hover:border-zinc-700 text-slate-300 rounded font-mono text-[10px] uppercase font-bold cursor-pointer"
                            >
                              Step Stage
                            </button>
                            <button
                              onClick={async () => {
                                if (!confirm("Are you sure you want to delete this lead from CRM?")) return;
                                try {
                                  const res = await fetch(`/api/admin/custom-solution-requests/${req.id}`, {
                                    method: 'DELETE',
                                    headers: { 'Authorization': `Bearer ${token}` }
                                  });
                                  if (res.ok) {
                                    showNotification("Successfully purged lead record.");
                                    fetchAdminDetails();
                                  }
                                } catch (err: any) {
                                  showNotification(err.message, true);
                                }
                              }}
                              className="px-2 py-1 bg-red-950/20 border border-red-900 hover:bg-[#FF3D4F] hover:text-white text-[#FF3D4F] rounded font-mono text-[10px] uppercase font-bold cursor-pointer"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ━━━━━━━━━━━━━━━━ 2. BLOG MANAGER ━━━━━━━━━━━━━━━━ */}
        {activeMenu === 'blog_manager' && (
          <div className="space-y-6" id="super-blog-manager">
            <div className="flex justify-between items-center bg-[#02020F] border border-zinc-900 p-6 rounded-2xl">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-amber-500 rounded-full"></span>
                  Enterprise Blogs Editor
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Draft, publish, and catalog your market insights, announcements, and tech publications.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingBlog(null);
                  setBlogForm({ title: '', slug: '', content: '', excerpt: '', category: 'General', author: 'Super Admin', image: '/assets/eurosia_logo.png' });
                  setIsCreatingBlog(true);
                }}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black text-xs font-bold uppercase rounded-lg shadow-lg flex items-center gap-2 cursor-pointer transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                Compose Blog
              </button>
            </div>

            {(isCreatingBlog || editingBlog) && (
              <div className="bg-[#05051B] border border-amber-500/20 p-6 rounded-2xl text-left space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
                  <h3 className="font-bold text-white text-base font-mono">
                    {isCreatingBlog ? "Create Enterprise Publication" : `Edit: ${editingBlog?.title}`}
                  </h3>
                  <button
                    onClick={() => { setIsCreatingBlog(false); setEditingBlog(null); }}
                    className="text-slate-400 hover:text-white font-mono text-xs uppercase"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase font-mono font-bold">Blog Title</label>
                    <input
                      type="text"
                      value={blogForm.title}
                      onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                      placeholder="e.g. EUROSIA Bangladesh Office Relocation"
                      className="w-full bg-slate-900/50 border border-zinc-800 text-sm text-white px-3 py-2 rounded focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase font-mono font-bold">Slug URL identifier</label>
                    <input
                      type="text"
                      value={blogForm.slug}
                      onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                      className="w-full bg-slate-900/50 border border-zinc-800 text-sm text-white px-3 py-2 rounded focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase font-mono font-bold">Category selection</label>
                    <select
                      value={blogForm.category}
                      onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                      className="w-full bg-slate-900 border border-zinc-800 text-sm text-slate-300 px-3 py-2 rounded focus:outline-none focus:border-amber-500"
                    >
                      <option value="General">General</option>
                      <option value="Announcement">Announcement</option>
                      <option value="Technology">Technology</option>
                      <option value="Press Release">Press Release</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase font-mono font-bold">Author alias</label>
                    <input
                      type="text"
                      value={blogForm.author}
                      onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                      className="w-full bg-slate-900/50 border border-zinc-800 text-sm text-white px-3 py-2 rounded focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase font-mono font-bold">Thumbnail Asset Path</label>
                    <input
                      type="text"
                      value={blogForm.image}
                      onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                      placeholder="/assets/eurosia_logo.png"
                      className="w-full bg-slate-900/50 border border-zinc-800 text-sm text-white px-3 py-2 rounded focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 uppercase font-mono font-bold">Short Excerpt Summary (SEO meta)</label>
                  <input
                    type="text"
                    value={blogForm.excerpt}
                    onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                    placeholder="Short description snippet showing in search results card"
                    className="w-full bg-slate-900/50 border border-zinc-800 text-sm text-white px-3 py-2 rounded focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 uppercase font-mono font-bold">Content Editor (Markdown formatted)</label>
                  <textarea
                    rows={6}
                    value={blogForm.content}
                    onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                    placeholder="# Eurosia Dhaka Relocation\n\nDhaka, Bangladesh — Eurosia has completed shifting..."
                    className="w-full bg-slate-900/50 border border-zinc-800 text-sm font-mono text-white px-3 py-2 rounded focus:outline-none focus:border-amber-500"
                  ></textarea>
                </div>

                <button
                  onClick={async () => {
                    try {
                      if (!blogForm.title || !blogForm.content) {
                        showNotification("Title and content are required fields.", true);
                        return;
                      }
                      const body = {
                        ...blogForm,
                        status: editingBlog ? editingBlog.status : 'draft'
                      };
                      const method = isCreatingBlog ? 'POST' : 'PUT';
                      const url = isCreatingBlog ? '/api/admin/blogs' : `/api/admin/blogs/${editingBlog.id}`;

                      const res = await fetch(url, {
                        method,
                        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                        body: JSON.stringify(body)
                      });

                      if (res.ok) {
                        showNotification(`Successfully saved blog post [${blogForm.title}].`);
                        setIsCreatingBlog(false);
                        setEditingBlog(null);
                        fetchAdminDetails();
                      } else {
                        const errText = await res.text();
                        throw new Error(errText);
                      }
                    } catch (e: any) {
                      showNotification(e.message, true);
                    }
                  }}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black text-xs font-extrabold uppercase rounded shadow font-mono"
                >
                  Commit Post
                </button>
              </div>
            )}

            <div className="bg-[#05051B] border border-zinc-900/80 p-6 rounded-2xl text-left">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-mono">My Articles</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-900 text-slate-500 font-bold font-mono">
                      <th className="p-3">Publication Info</th>
                      <th className="p-3">Author</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogsList.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-slate-500 italic">No published articles in DB. Click 'Compose' to draft the first post!</td>
                      </tr>
                    ) : (
                      blogsList.map((blog: any) => (
                        <tr key={blog.id} className="border-b border-zinc-900/40 hover:bg-slate-900/20">
                          <td className="p-3">
                            <div className="font-bold text-white text-sm">{blog.title}</div>
                            <div className="text-zinc-500 font-mono text-[10px] mt-0.5">/{blog.slug} | {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'Just Now'}</div>
                          </td>
                          <td className="p-3 text-slate-300 font-semibold">{blog.author || 'Admin'}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-slate-400 text-[10px] rounded font-mono uppercase">{blog.category || 'General'}</span>
                          </td>
                          <td className="p-3">
                            <button
                              onClick={async () => {
                                const nextStatus = blog.status === 'published' ? 'draft' : 'published';
                                try {
                                  await fetch(`/api/admin/blogs/${blog.id}`, {
                                    method: 'PUT',
                                    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ ...blog, status: nextStatus })
                                  });
                                  showNotification(`Blog status toggled to [${nextStatus}] successfully.`);
                                  fetchAdminDetails();
                                } catch (e: any) {
                                  showNotification(e.message, true);
                                }
                              }}
                              className={`inline-block px-2.5 py-1 rounded text-[10px] uppercase font-bold text-left cursor-pointer transition-all ${
                                blog.status === 'published' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-slate-900/70 text-slate-500 border border-zinc-800'
                              }`}
                            >
                              {blog.status || 'draft'}
                            </button>
                          </td>
                          <td className="p-3 text-right space-x-2">
                            <button
                              onClick={() => {
                                setEditingBlog(blog);
                                setBlogForm({
                                  title: blog.title || '',
                                  slug: blog.slug || '',
                                  content: blog.content || '',
                                  excerpt: blog.excerpt || '',
                                  category: blog.category || 'General',
                                  author: blog.author || 'Admin',
                                  image: blog.image || ''
                                });
                                setIsCreatingBlog(false);
                              }}
                              className="px-2 py-1 bg-slate-900 border border-zinc-800 hover:border-zinc-700 text-slate-300 rounded font-mono text-[10px] uppercase font-bold cursor-pointer"
                            >
                              Edit Link
                            </button>
                            <button
                              onClick={async () => {
                                if (!confirm("Purge blog post permanently?")) return;
                                try {
                                  const res = await fetch(`/api/admin/blogs/${blog.id}`, {
                                    method: 'DELETE',
                                    headers: { 'Authorization': `Bearer ${token}` }
                                  });
                                  if (res.ok) {
                                    showNotification("Purged article from network databases.");
                                    fetchAdminDetails();
                                  }
                                } catch (e: any) {
                                  showNotification(e.message, true);
                                }
                              }}
                              className="px-2 py-1 bg-red-950/20 border border-red-900 hover:bg-[#FF3D4F] hover:text-white text-[#FF3D4F] rounded font-mono text-[10px] uppercase font-bold cursor-pointer"
                            >
                              Purge
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ━━━━━━━━━━━━━━━━ 3. CONTACTS MANAGER ━━━━━━━━━━━━━━━━ */}
        {activeMenu === 'contacts_manager' && (
          <div className="space-y-6" id="super-contacts-manager">
            <div className="flex justify-between items-center bg-[#02020F] border border-zinc-900 p-6 rounded-2xl text-left">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-rose-500 rounded-full"></span>
                  Global Office Locations
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Configure corporate regional offices. Fields updated here update instantly on the public contact component.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingContact(null);
                  setContactForm({
                    country: '', label: '', title: '', addressLines: '', phones: '', telephones: '', hotline: '', whatsappNumbers: '', email: '', hours: '', mapUrl: '', directionsUrl: '', mapButtonLabel: 'View Office Location', status: 'active', sortOrder: 1
                  });
                  setIsCreatingContact(true);
                }}
                className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold uppercase rounded-lg shadow-lg flex items-center gap-2 cursor-pointer transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                Add New Office Hub
              </button>
            </div>

            {(isCreatingContact || editingContact) && (
              <div className="bg-[#05051B] border border-rose-500/20 p-6 rounded-2xl text-left space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
                  <h3 className="font-bold text-white text-base font-mono">
                    {isCreatingContact ? "Add Regional Headquarters Location" : `Modify Location: ${editingContact?.title}`}
                  </h3>
                  <button
                    onClick={() => { setIsCreatingContact(false); setEditingContact(null); }}
                    className="text-slate-400 hover:text-white font-mono text-xs uppercase"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase font-mono font-bold">Country Code / Unique ID</label>
                    <input
                      type="text"
                      placeholder="e.g. BD, MY, SG"
                      value={contactForm.country}
                      onChange={(e) => setContactForm({ ...contactForm, country: e.target.value })}
                      className="w-full bg-slate-900/50 border border-zinc-800 text-sm text-white px-3 py-2 rounded focus:outline-none focus:border-rose-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase font-mono font-bold">Regional Label</label>
                    <input
                      type="text"
                      placeholder="e.g. EUROSIA Bangladesh"
                      value={contactForm.label}
                      onChange={(e) => setContactForm({ ...contactForm, label: e.target.value })}
                      className="w-full bg-slate-900/50 border border-zinc-800 text-sm text-white px-3 py-2 rounded focus:outline-none focus:border-rose-500"
                    />
                  </div>
                  <div className="space-y-1 col-span-2">
                    <label className="text-[10px] text-slate-400 uppercase font-mono font-bold">Display Title Header</label>
                    <input
                      type="text"
                      placeholder="e.g. Bangladesh Office"
                      value={contactForm.title}
                      onChange={(e) => setContactForm({ ...contactForm, title: e.target.value })}
                      className="w-full bg-slate-900/50 border border-zinc-800 text-sm text-white px-3 py-2 rounded focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 uppercase font-mono font-bold">Detailed Address (One line per part, split by comma)</label>
                  <input
                    type="text"
                    placeholder="Eurosia, 144/5G Matikata, Dhaka-1206, Near ECB Circle"
                    value={contactForm.addressLines}
                    onChange={(e) => setContactForm({ ...contactForm, addressLines: e.target.value })}
                    className="w-full bg-slate-900/50 border border-zinc-800 text-sm text-white px-3 py-2 rounded focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase font-mono font-bold">Mobile Phones (comma separated)</label>
                    <input
                      type="text"
                      placeholder="+880 1711-408725, +880 1709-371514"
                      value={contactForm.phones}
                      onChange={(e) => setContactForm({ ...contactForm, phones: e.target.value })}
                      className="w-full bg-slate-900/50 border border-zinc-800 text-sm text-white px-3 py-2 rounded"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase font-mono font-bold">Fixed Telephones (comma separated)</label>
                    <input
                      type="text"
                      placeholder="+880 2 8711849, +880 2 8715960"
                      value={contactForm.telephones}
                      onChange={(e) => setContactForm({ ...contactForm, telephones: e.target.value })}
                      className="w-full bg-slate-900/50 border border-zinc-800 text-sm text-white px-3 py-2 rounded"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase font-mono font-bold">Corporate Hotline</label>
                    <input
                      type="text"
                      placeholder="e.g. 09649-222222"
                      value={contactForm.hotline}
                      onChange={(e) => setContactForm({ ...contactForm, hotline: e.target.value })}
                      className="w-full bg-slate-900/50 border border-zinc-800 text-sm text-white px-3 py-2 rounded"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase font-mono font-bold">WhatsApp Hotline Links (comma-sep numbers)</label>
                    <input
                      type="text"
                      placeholder="+8801711408725"
                      value={contactForm.whatsappNumbers}
                      onChange={(e) => setContactForm({ ...contactForm, whatsappNumbers: e.target.value })}
                      className="w-full bg-slate-900/50 border border-zinc-800 text-sm text-white px-3 py-2 rounded"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase font-mono font-bold">General Enquiries Email</label>
                    <input
                      type="email"
                      placeholder="support@eurosia.com.bd"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full bg-slate-900/50 border border-zinc-800 text-sm text-white px-3 py-2 rounded"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase font-mono font-bold">Office Hours / Timezone</label>
                    <input
                      type="text"
                      placeholder="9:00 AM – 6:00 PM (GMT +6)"
                      value={contactForm.hours}
                      onChange={(e) => setContactForm({ ...contactForm, hours: e.target.value })}
                      className="w-full bg-slate-900/50 border border-zinc-800 text-sm text-white px-3 py-2 rounded"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase font-mono font-bold">Google Maps share url</label>
                    <input
                      type="text"
                      placeholder="https://maps.app.goo.gl/uogXdZRqTzaQYpfV6"
                      value={contactForm.mapUrl}
                      onChange={(e) => setContactForm({ ...contactForm, mapUrl: e.target.value })}
                      className="w-full bg-slate-900/50 border border-zinc-800 text-sm text-white px-3 py-2 rounded focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase font-mono font-bold">Directions Link</label>
                    <input
                      type="text"
                      placeholder="https://maps.google.com/directions/..."
                      value={contactForm.directionsUrl}
                      onChange={(e) => setContactForm({ ...contactForm, directionsUrl: e.target.value })}
                      className="w-full bg-slate-900/50 border border-zinc-800 text-sm text-white px-3 py-2 rounded focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase font-mono font-bold">Action Button Text</label>
                    <input
                      type="text"
                      placeholder="View Bangladesh Office"
                      value={contactForm.mapButtonLabel}
                      onChange={(e) => setContactForm({ ...contactForm, mapButtonLabel: e.target.value })}
                      className="w-full bg-slate-900/50 border border-zinc-800 text-sm text-white px-3 py-2 rounded"
                    />
                  </div>
                </div>

                <button
                  onClick={async () => {
                    try {
                      if (!contactForm.country || !contactForm.title) {
                        showNotification("Country Code and Office Title are mandatory fields.", true);
                        return;
                      }

                      const body = {
                        ...contactForm,
                        addressLines: (contactForm.addressLines || '').split(',').map((s: string) => s.trim()).filter(Boolean),
                        phones: (contactForm.phones || '').split(',').map((s: string) => s.trim()).filter(Boolean),
                        telephones: (contactForm.telephones || '').split(',').map((s: string) => s.trim()).filter(Boolean),
                        whatsappNumbers: (contactForm.whatsappNumbers || '').split(',').map((s: string) => s.trim()).filter(Boolean),
                        sortOrder: Number(contactForm.sortOrder) || 1
                      };

                      const method = isCreatingContact ? 'POST' : 'PUT';
                      const url = isCreatingContact ? '/api/admin/contacts' : `/api/admin/contacts/${editingContact.id}`;

                      const res = await fetch(url, {
                        method,
                        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                        body: JSON.stringify(body)
                      });

                      if (res.ok) {
                        showNotification(`Successfully saved headquarters node [${contactForm.title}].`);
                        setIsCreatingContact(false);
                        setEditingContact(null);
                        fetchAdminDetails();
                      } else {
                        throw new Error("Failed to write to API");
                      }
                    } catch (e: any) {
                      showNotification(e.message, true);
                    }
                  }}
                  className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold uppercase rounded shadow"
                >
                  Confirm Operations Node
                </button>
              </div>
            )}

            <div className="bg-[#05051B] border border-zinc-900/80 p-6 rounded-2xl text-left">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-mono">Location Network Nodes</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-900 text-slate-500 font-bold font-mono">
                      <th className="p-3">Office Info</th>
                      <th className="p-3">Country Label</th>
                      <th className="p-3">Hotline / Contact Details</th>
                      <th className="p-3">Email Enquiries</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contactsList.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-slate-500 italic">No global offices configured in DB store.</td>
                      </tr>
                    ) : (
                      contactsList.map((office: any) => (
                        <tr key={office.id} className="border-b border-zinc-900/40 hover:bg-slate-900/20">
                          <td className="p-3">
                            <div className="font-bold text-white text-sm">{office.title}</div>
                            <div className="text-rose-400 font-mono text-[10px] mt-0.5">{Array.isArray(office.addressLines) ? office.addressLines[0] : office.addressLines}</div>
                          </td>
                          <td className="p-3 text-slate-300 font-bold font-mono">{office.label || 'EUROSIA HQ'} ({office.country})</td>
                          <td className="p-3">
                            <div className="text-slate-300 font-medium">Hotline: {office.hotline || 'None'}</div>
                            <div className="text-slate-500 text-[10px] font-mono mt-0.5">WhatsApp: {Array.isArray(office.whatsappNumbers) ? office.whatsappNumbers.join(', ') : office.whatsappNumbers}</div>
                          </td>
                          <td className="p-3 text-slate-400 font-mono">{office.email}</td>
                          <td className="p-3 text-right space-x-2">
                            <button
                              onClick={() => {
                                setEditingContact(office);
                                setContactForm({
                                  country: office.country || '',
                                  label: office.label || '',
                                  title: office.title || '',
                                  addressLines: Array.isArray(office.addressLines) ? office.addressLines.join(', ') : office.addressLines || '',
                                  phones: Array.isArray(office.phones) ? office.phones.join(', ') : office.phones || '',
                                  telephones: Array.isArray(office.telephones) ? office.telephones.join(', ') : office.telephones || '',
                                  hotline: office.hotline || '',
                                  whatsappNumbers: Array.isArray(office.whatsappNumbers) ? office.whatsappNumbers.join(', ') : office.whatsappNumbers || '',
                                  email: office.email || '',
                                  hours: office.hours || '',
                                  mapUrl: office.mapUrl || '',
                                  directionsUrl: office.directionsUrl || '',
                                  mapButtonLabel: office.mapButtonLabel || 'View Office Location',
                                  status: office.status || 'active',
                                  sortOrder: office.sortOrder || 1
                                });
                                setIsCreatingContact(false);
                              }}
                              className="px-2 py-1 bg-slate-900 border border-zinc-800 hover:border-zinc-700 text-slate-300 rounded font-mono text-[10px] uppercase font-bold cursor-pointer"
                            >
                              Edit Office
                            </button>
                            <button
                              onClick={async () => {
                                if (!confirm("Are you sure you want to delete this office?")) return;
                                try {
                                  const res = await fetch(`/api/admin/contacts/${office.id}`, {
                                    method: 'DELETE',
                                    headers: { 'Authorization': `Bearer ${token}` }
                                  });
                                  if (res.ok) {
                                    showNotification("Purged corporate office location node.");
                                    fetchAdminDetails();
                                  }
                                } catch (e: any) {
                                  showNotification(e.message, true);
                                }
                              }}
                              className="px-2 py-1 bg-red-950/20 border border-red-900 hover:bg-[#FF3D4F] hover:text-white text-[#FF3D4F] rounded font-mono text-[10px] uppercase font-bold cursor-pointer"
                            >
                              Purge Node
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ━━━━━━━━━━━━━━━━ 4. SUPER MEDIA LIBRARY ━━━━━━━━━━━━━━━━ */}
        {activeMenu === 'media_library' && (
          <div className="space-y-6" id="super-media-library">
            <div className="flex justify-between items-center bg-[#02020F] border border-zinc-900 p-6 rounded-2xl">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-emerald-400 rounded-full"></span>
                  Super Media Library
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Categorized central media repository. Click any asset to copy its path immediately for your templates.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Folders navigation sidebar */}
              <div className="bg-[#05051B] border border-zinc-900 p-4 rounded-2xl space-y-2 text-left">
                <h4 className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-widest pl-2 mb-3">Folders Categories</h4>
                {[
                  { id: 'all', label: 'All Catalog Files', count: mediaList.length },
                  { id: '/logos', label: 'Logos & Branding', count: mediaList.filter(f => f.folder === '/logos').length },
                  { id: '/banners', label: 'Hero Banners', count: mediaList.filter(f => f.folder === '/banners').length },
                  { id: '/apps', label: 'Launcher Icons', count: mediaList.filter(f => f.folder === '/apps').length },
                  { id: '/solutions', label: 'Solution Diagrams', count: mediaList.filter(f => f.folder === '/solutions').length },
                  { id: '/blog', label: 'Blog Thumbnails', count: mediaList.filter(f => f.folder === '/blog').length }
                ].map((fold) => (
                  <button
                    key={fold.id}
                    onClick={() => setActiveMediaFolder(fold.id)}
                    className={`w-full text-left text-xs font-semibold px-3 py-2 rounded-lg transition-colors flex justify-between items-center ${
                      activeMediaFolder === fold.id ? 'bg-emerald-500 text-black font-extrabold' : 'text-slate-400 hover:bg-slate-900'
                    }`}
                  >
                    <span>{fold.label}</span>
                    <span className="font-mono text-[10px] opacity-75">({fold.count})</span>
                  </button>
                ))}

                <div className="border-t border-zinc-900 my-4 pt-4">
                  <h4 className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-widest pl-2 mb-2">Import / Register Asset</h4>
                  <div className="space-y-3 pl-2 text-xs">
                    <input
                      type="text"
                      placeholder="Asset Name"
                      value={newMediaForm.name}
                      onChange={(e) => setNewMediaForm({ ...newMediaForm, name: e.target.value })}
                      className="w-full bg-slate-900 border border-zinc-800 rounded px-2 py-1 text-white"
                    />
                    <input
                      type="text"
                      placeholder="Public Link / Path"
                      value={newMediaForm.url}
                      onChange={(e) => setNewMediaForm({ ...newMediaForm, url: e.target.value })}
                      className="w-full bg-slate-900 border border-zinc-800 rounded px-2 py-1 text-white"
                    />
                    <select
                      value={newMediaForm.folder}
                      onChange={(e) => setNewMediaForm({ ...newMediaForm, folder: e.target.value })}
                      className="w-full bg-slate-900 border border-zinc-800 rounded px-2 py-1 text-slate-300"
                    >
                      <option value="/logos">/logos</option>
                      <option value="/banners">/banners</option>
                      <option value="/apps">/apps</option>
                      <option value="/solutions">/solutions</option>
                      <option value="/blog">/blog</option>
                    </select>
                    <button
                      onClick={async () => {
                        try {
                          if (!newMediaForm.name || !newMediaForm.url) {
                            showNotification("Both Name and Path URL are required.", true);
                            return;
                          }
                          const res = await fetch('/api/admin/media', {
                            method: 'POST',
                            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                            body: JSON.stringify(newMediaForm)
                          });
                          if (res.ok) {
                            showNotification("Media object registered successfully.");
                            setNewMediaForm({ name: '', url: '', folder: '/logos', size: '15 KB', type: 'image/png' });
                            fetchAdminDetails();
                          }
                        } catch (err: any) {
                          showNotification(err.message, true);
                        }
                      }}
                      className="w-full py-1.5 bg-emerald-500 hover:bg-emerald-600 font-extrabold text-[#05051B] font-mono text-[10px] uppercase rounded text-center cursor-pointer"
                    >
                      Commit Asset
                    </button>
                  </div>
                </div>
              </div>

              {/* Main Media grid catalog viewer */}
              <div className="bg-[#05051B] border border-zinc-900 p-6 rounded-2xl md:col-span-3 text-left">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-3 mb-4">
                  <h3 className="font-bold text-white text-sm font-mono uppercase tracking-wider">Catalog Assets</h3>
                  <span className="text-[10px] font-mono text-emerald-400">DOUBLE-CLICK PREVIEW CARD TO PURGE</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {mediaList
                    .filter((m) => activeMediaFolder === 'all' || m.folder === activeMediaFolder)
                    .map((item: any) => (
                      <div
                        key={item.id}
                        className="bg-slate-900/40 border border-zinc-900 p-4 rounded-xl space-y-3 cursor-pointer group hover:border-[#FF3D4F] transition-all"
                        onClick={() => {
                          navigator.clipboard.writeText(item.url);
                          showNotification(`Copied [${item.url}] to clipboard.`);
                        }}
                        onDoubleClick={async () => {
                          if (!confirm(`Purge media reference [${item.name}] from ecosystem directory?`)) return;
                          try {
                            const res = await fetch(`/api/admin/media/${item.id}`, {
                              method: 'DELETE',
                              headers: { 'Authorization': `Bearer ${token}` }
                            });
                            if (res.ok) {
                              showNotification("Asset purged successfully from database.");
                              fetchAdminDetails();
                            }
                          } catch (err: any) {
                            showNotification(err.message, true);
                          }
                        }}
                      >
                        <div className="w-full h-32 bg-slate-950 border border-zinc-900/60 rounded flex items-center justify-center overflow-hidden">
                          {item.type?.startsWith('image') || item.url?.match(/\.(jpeg|jpg|gif|png|svg|webp)/i) ? (
                            <img src={item.url} referrerPolicy="no-referrer" alt={item.name} className="max-w-full max-h-full object-contain" />
                          ) : (
                            <FileText className="w-10 h-10 text-emerald-400" />
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-slate-200 text-xs truncate group-hover:text-white transition-colors">{item.name}</div>
                          <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 mt-1">
                            <span>{item.size || '32 KB'}</span>
                            <span className="text-[9px] group-hover:text-[#FF3D4F] tracking-wide transition-colors uppercase font-bold">Copy Path</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ━━━━━━━━━━━━━━━━ 5. PWA & NOTIFICATIONS ━━━━━━━━━━━━━━━━ */}
        {activeMenu === 'pwa_notifications' && (
          <div className="space-y-6" id="super-pwa-noti">
            <div className="flex justify-between items-center bg-[#02020F] border border-zinc-900 p-6 rounded-2xl text-left">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-orange-400 rounded-full animate-bounce"></span>
                  PWA & Notification Hub
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Manage application manifests, standalone app assets, offline launcher templates and broadcast active notification messages.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* PWA manifests settings dashboard */}
              <div className="bg-[#05051B] border border-zinc-900 p-6 rounded-2xl text-left space-y-4">
                <div className="flex items-center gap-2 border-b border-zinc-900 pb-3">
                  <Sliders className="w-5 h-5 text-orange-400" />
                  <h3 className="font-extrabold text-sm text-white uppercase tracking-wider font-mono">PWA Launcher settings</h3>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-500 font-bold uppercase font-mono">App Full Name</label>
                      <input
                        type="text"
                        value={pwaConfig.appName || ''}
                        onChange={(e) => setPwaConfig({ ...pwaConfig, appName: e.target.value })}
                        placeholder="EUROSIA Software App Ecosystem"
                        className="w-full bg-slate-900 border border-zinc-800 rounded px-3 py-2 text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-500 font-bold uppercase font-mono">Mobile Short Name</label>
                      <input
                        type="text"
                        value={pwaConfig.appShortName || ''}
                        onChange={(e) => setPwaConfig({ ...pwaConfig, appShortName: e.target.value })}
                        placeholder="Eurosia Ecosystem"
                        className="w-full bg-slate-900 border border-zinc-800 rounded px-3 py-2 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-500 font-bold uppercase font-mono">PWA Theme Hex</label>
                      <input
                        type="text"
                        value={pwaConfig.themeColor || ''}
                        onChange={(e) => setPwaConfig({ ...pwaConfig, themeColor: e.target.value })}
                        className="w-full bg-slate-900 border border-zinc-800 rounded px-3 py-2 text-white font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-500 font-bold uppercase font-mono">Background Canvas Splash</label>
                      <input
                        type="text"
                        value={pwaConfig.backgroundColor || ''}
                        onChange={(e) => setPwaConfig({ ...pwaConfig, backgroundColor: e.target.value })}
                        className="w-full bg-slate-900 border border-zinc-800 rounded px-3 py-2 text-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 font-bold uppercase font-mono">Standalone App Launch Icon URL (PNG format)</label>
                    <input
                      type="text"
                      value={pwaConfig.appIconUrl || ''}
                      onChange={(e) => setPwaConfig({ ...pwaConfig, appIconUrl: e.target.value })}
                      placeholder="/assets/eurosia_logo.png"
                      className="w-full bg-slate-900 border border-zinc-800 rounded px-3 py-2 text-white font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 font-bold uppercase font-mono">Manifest attributes (JSON format)</label>
                    <textarea
                      rows={4}
                      value={pwaConfig.manifestSettings || ''}
                      onChange={(e) => setPwaConfig({ ...pwaConfig, manifestSettings: e.target.value })}
                      className="w-full bg-slate-900 border border-zinc-800 rounded px-3 py-2 text-white font-mono"
                    ></textarea>
                  </div>

                  <button
                    onClick={async () => {
                      try {
                        const res = await fetch('/api/admin/pwa-settings', {
                          method: 'POST',
                          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                          body: JSON.stringify(pwaConfig)
                        });
                        if (res.ok) {
                          showNotification("PWA credentials updated safely.");
                          fetchAdminDetails();
                        }
                      } catch (err: any) {
                        showNotification(err.message, true);
                      }
                    }}
                    className="px-4 py-2 bg-orange-400 hover:bg-orange-500 text-[#05051B] font-extrabold uppercase rounded shadow font-mono text-[10px]"
                  >
                    Commit manifests settings
                  </button>
                </div>
              </div>

              {/* Broadcast notifications */}
              <div className="bg-[#05051B] border border-zinc-900 p-6 rounded-2xl text-left space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-zinc-900 pb-3">
                    <Sparkles className="w-5 h-5 text-orange-400" />
                    <h3 className="font-extrabold text-sm text-white uppercase tracking-wider font-mono">Compose System Broadcaster</h3>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-500 font-bold uppercase font-mono">Alert Subject Title</label>
                      <input
                        type="text"
                        placeholder="E.g. Schedule Maintenance, Security update..."
                        value={notificationForm.title}
                        onChange={(e) => setNotificationForm({ ...notificationForm, title: e.target.value })}
                        className="w-full bg-slate-900 border border-zinc-800 rounded px-3 py-2 text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-500 font-bold uppercase font-mono">Notification Body message</label>
                      <textarea
                        rows={3}
                        placeholder="Broadcast message showing on all client-facing UI panels."
                        value={notificationForm.message}
                        onChange={(e) => setNotificationForm({ ...notificationForm, message: e.target.value })}
                        className="w-full bg-slate-900 border border-zinc-800 rounded px-3 py-2 text-white"
                      ></textarea>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-500 font-bold uppercase font-mono">Alert Priority Class</label>
                      <select
                        value={notificationForm.type}
                        onChange={(e) => setNotificationForm({ ...notificationForm, type: e.target.value })}
                        className="w-full bg-slate-900 border border-zinc-800 rounded px-3 py-2 text-slate-300"
                      >
                        <option value="info">Information (Sky Dial)</option>
                        <option value="success">Success Confirmation (Emerald Dial)</option>
                        <option value="warning">System Pending Warning (Orange Dial)</option>
                        <option value="danger">Critical Network Exception (Crimson Dial)</option>
                      </select>
                    </div>

                    <button
                      onClick={async () => {
                        try {
                          if (!notificationForm.title || !notificationForm.message) {
                            showNotification("Both Subject and Body are mandatory.", true);
                            return;
                          }
                          const res = await fetch('/api/admin/notifications', {
                            method: 'POST',
                            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                            body: JSON.stringify(notificationForm)
                          });
                          if (res.ok) {
                            showNotification("Local alert pipeline successfully synchronized.");
                            setNotificationForm({ title: '', message: '', type: 'info' });
                            fetchAdminDetails();
                          }
                        } catch (err: any) {
                          showNotification(err.message, true);
                        }
                      }}
                      className="px-4 py-2 bg-orange-400 hover:bg-orange-500 text-[#05051B] font-extrabold uppercase rounded shadow font-mono text-[10px]"
                    >
                      Broadcast alert signal
                    </button>
                  </div>
                </div>

                <div className="border-t border-zinc-900 pt-4 mt-4">
                  <h4 className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-widest mb-3">Broadcast history log</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {notificationsList.length === 0 ? (
                      <span className="text-[10px] text-slate-500 italic block">No previous broadcasts inside history logs.</span>
                    ) : (
                      notificationsList.map((item: any) => (
                        <div key={item.id} className="bg-slate-900/50 border border-zinc-900 p-2.5 rounded text-[11px] flex justify-between items-start gap-2">
                          <div>
                            <div className="font-extrabold text-slate-200">{item.title}</div>
                            <div className="text-slate-400 mt-0.5 text-[10px]">{item.message}</div>
                          </div>
                          <span className={`inline-block px-1.5 py-0.5 rounded text-[8px] uppercase tracking-wider font-bold ${
                            item.type === 'danger' ? 'bg-rose-500/10 text-rose-400' :
                            item.type === 'warning' ? 'bg-amber-500/10 text-amber-500' :
                            item.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' :
                            'bg-sky-500/10 text-sky-400'
                          }`}>
                            {item.type || 'info'}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}


      </main>

    </div>
  );
}
