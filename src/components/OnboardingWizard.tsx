import React, { useState, useEffect } from 'react';
import { 
  Cpu, Server, Check, ArrowRight, ArrowLeft, Loader2, Play, 
  Sparkles, Building2, Shield, DollarSign, Database, CheckSquare, 
  Square, ShieldAlert, Monitor, Terminal, Lock, HelpCircle 
} from 'lucide-react';

interface OnboardingWizardProps {
  onClose: () => void;
  onSuccess: (token: string, user: any) => void;
}

export default function OnboardingWizard({ onClose, onSuccess }: OnboardingWizardProps) {
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Step 1: User Account State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Step 2: Company & Database State
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [dbEngine, setDbEngine] = useState<'sqlite' | 'postgres'>('sqlite');
  const [region, setRegion] = useState('asia-southeast1');

  // Step 3: App Modules selection State
  const [selectedApps, setSelectedApps] = useState<string[]>([
    'mod-pos', 'mod-pbx', 'mod-cashbook', 'mod-invoicenex'
  ]);

  // Step 4: Analytical Simulated SQL log stream state
  const [logIndex, setLogIndex] = useState(0);
  const [provisionLogs, setProvisionLogs] = useState<string[]>([]);
  const [provisionProgress, setProvisionProgress] = useState(0);

  const availableApps = [
    { id: "mod-pos", name: "EUROSIA POS", desc: "Smart Restaurant & Retail Management", cat: "Retail" },
    { id: "mod-care", name: "EUROSIA Care", desc: "Digital Clinic & Healthcare Platform", cat: "Healthcare" },
    { id: "mod-pbx", name: "EUROSIA CloudPBX", desc: "Cloud PBX & Call Center Solution", cat: "Comms" },
    { id: "mod-ai-calling", name: "EUROSIA AI Calling", desc: "Voice Automation Platform", cat: "AI" },
    { id: "mod-kabyo", name: "Kabyo Kotha AI", desc: "Bengali Conversational AI platform", cat: "AI" },
    { id: "mod-chatbot", name: "EUROSIA AI Chatbot", desc: "Engage visitor inquiries with LLMs", cat: "AI" },
    { id: "mod-datapilot", name: "EUROSIA DataPilot AI", desc: "Web Intelligence & Analytics Automation", cat: "AI" },
    { id: "mod-defender", name: "EUROSIA Defender X", desc: "Cyber Security Guard Defenses", cat: "Security" },
    { id: "mod-buildnex", name: "EUROSIA BuildNex", desc: "Construction & Property ERP", cat: "Industry" },
    { id: "mod-cashbook", name: "EUROSIA CashBook", desc: "Smart Ledger & Accounts Tracking", cat: "Finance" },
    { id: "mod-invoicenex", name: "EUROSIA InvoiceNex", desc: "Professional Custom Billing Generator", cat: "Finance" }
  ];

  const toggleAppSelection = (id: string) => {
    if (selectedApps.includes(id)) {
      setSelectedApps(prev => prev.filter(item => item !== id));
    } else {
      setSelectedApps(prev => [...prev, id]);
    }
  };

  // Log sequence script for provisioning step
  const sqlLogSequence = [
    `CRITICAL -- Initializing secure sandboxed workspace environment...`,
    `DB_EXEC -- PRAGMA foreign_keys = ON; -- activating local relational safety guards`,
    `DB_EXEC -- CREATE TABLE company_tenant (id VARCHAR(50) PRIMARY KEY, name VARCHAR(100), status VARCHAR(20));`,
    `DB_EXEC -- CREATE TABLE staff_users (id VARCHAR(50) PRIMARY KEY, email VARCHAR(100) UNIQUE, role VARCHAR(30));`,
    `DB_EXEC -- CREATE TABLE assigned_modules (id VARCHAR(50) PRIMARY KEY, module_id VARCHAR(50), company_id VARCHAR(50));`,
    `DB_EXEC -- INSERT INTO company_tenant VALUES ('c_temp_id', '${companyName || 'Acme Group'}', 'active');`,
    `DB_EXEC -- INSERT INTO staff_users VALUES ('u_temp_id', '${email}', 'Company Admin');`,
    ...selectedApps.map(appId => `DB_EXEC -- INSERT INTO assigned_modules VALUES ('m-${appId.substring(4)}-${Date.now()}', '${appId}', 'c_temp_id');`),
    `SEC_SYS -- Standard signature phrase matching JWT secret...`,
    `SEC_SYS -- Creating 2048-bit secure keys bypass layers...`,
    `DB_EXEC -- VACUUM; -- cleaning transaction indexes.`,
    `DB_SYS -- Verifying integrity: 0 conflicts detected. Relational safety constraints matching perfectly.`,
    `COMPLETED -- Multi-tenant sandbox isolated databases prepared successfully! Welcome to Eurosia.`
  ];

  // Start log processing when step is 4
  useEffect(() => {
    if (step === 4) {
      setLogIndex(0);
      setProvisionProgress(0);
      setProvisionLogs([]);

      const logTimer = setInterval(() => {
        setLogIndex(prevIndex => {
          if (prevIndex >= sqlLogSequence.length - 1) {
            clearInterval(logTimer);
            setProvisionProgress(100);
            return prevIndex;
          }
          const nextIndex = prevIndex + 1;
          setProvisionProgress(Math.floor((nextIndex / sqlLogSequence.length) * 100));
          setProvisionLogs(prevLogs => [...prevLogs, sqlLogSequence[prevIndex]]);
          return nextIndex;
        });
      }, 350);

      return () => clearInterval(logTimer);
    }
  }, [step]);

  const handleNextStep = () => {
    setError('');
    
    if (step === 1) {
      if (!name || !email || !password) {
        setError('Please fill in all user account fields to initialize credential keys.');
        return;
      }
      if (password.length < 5) {
        setError('Security password phrase length must be at least 5 alphanumeric indexes.');
        return;
      }
      setCompanyName(`${name.split(' ')[0]}'s Enterprise`);
      setCompanyEmail(email);
      setStep(2);
    } 
    else if (step === 2) {
      if (!companyName) {
        setError('Please enter your organizational custom domain / company tenant moniker.');
        return;
      }
      setStep(3);
    }
    else if (step === 3) {
      if (selectedApps.length === 0) {
        setError('Please select at least one core app module to provision initial database frames.');
        return;
      }
      setStep(4);
    }
  };

  const handleCreateDatabase = async () => {
    setLoading(true);
    setError('');

    try {
      // POST registration parameters directly to backend
      const res = await fetch('/api/auth/register-tenant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
          companyName,
          companyEmail,
          dbEngine,
          selectedApps
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Provisioning sequence failure.');
      }

      // Store selection in localStorage so DashboardUI can pre-install them
      localStorage.setItem('eur_onboarding_apps', JSON.stringify(selectedApps));
      localStorage.setItem('eur_auth_token', data.token);
      localStorage.setItem('eur_auth_user', JSON.stringify(data.user));

      // Execute login redirection success handler callback
      onSuccess(data.token, data.user);
    } catch (err: any) {
      setError(err.message || 'System crash during database sandbox creation.');
      setStep(2); // Go back to allow fixes
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#05051B] border border-[#16166F] w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl relative my-8">
        
        {/* TOP COGNITIVE BANNER */}
        <div className="bg-gradient-to-r from-[#11135E] to-[#0A0A6B] p-6 border-b border-[#16166F] flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#FF3D4F] animate-pulse" />
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#FF3D4F] uppercase">EUROSIA SANDBOX INSTANCE ACTIVATION</span>
            </div>
            <h3 className="text-lg font-light text-white tracking-tight">14-Day Free Evaluation Sandbox</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white bg-[#02020A]/60 hover:bg-[#11135E] border border-[#16166F]/40 p-2 rounded-lg cursor-pointer transition-all text-xs"
          >
            Exit Setup
          </button>
        </div>

        {/* PROGRESS METERS DECK */}
        <div className="px-6 py-4 bg-[#11135E]/15 border-b border-[#16166F]/30 flex justify-between items-center text-[10px] font-mono tracking-wider font-semibold text-gray-400">
          <div className="flex flex-wrap gap-4 md:gap-8 mx-auto">
            <span className={step >= 1 ? "text-[#FF3D4F]" : "text-gray-600"}>1. Account</span>
            <span className="text-gray-700">➔</span>
            <span className={step >= 2 ? "text-[#FF3D4F]" : "text-gray-600"}>2. Company Database</span>
            <span className="text-gray-700">➔</span>
            <span className={step >= 3 ? "text-[#FF3D4F]" : "text-gray-600"}>3. Select Modules</span>
            <span className="text-gray-700">➔</span>
            <span className={step >= 4 ? "text-[#FF3D4F]" : "text-gray-600"}>4. Provision Stream</span>
          </div>
        </div>

        {/* ERROR DECK NOTIFIER */}
        {error && (
          <div className="mx-6 mt-4 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* WIZARD PANELS CHANGERS */}
        <div className="p-6 md:p-8 space-y-6">

          {/* STEP 1: CREATE ACCOUNT */}
          {step === 1 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#FF3D4F]" />
                  <span>STEP 1: Primary Administrator Profile</span>
                </h4>
                <p className="text-xs text-gray-400">Establish the master identity with root encryption privileges for your company database partition.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 text-xs font-semibold">
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-gray-400">Your Full Operator Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#11135E]/20 border border-[#16166F] rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF3D4F]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-400">Corporate Email Address (Secure ID)</label>
                  <input 
                    type="email" 
                    placeholder="john.doe@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#11135E]/20 border border-[#16166F] rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF3D4F]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-400">Setup Security Secret Phrase</label>
                  <input 
                    type="password" 
                    placeholder="Minimum 5 standard characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#11135E]/20 border border-[#16166F] rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF3D4F]"
                  />
                </div>
              </div>

              <div className="bg-[#11135E]/10 p-4 border border-[#16166F]/50 rounded-xl space-y-1">
                <p className="text-[11px] font-bold text-white flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#FF3D4F]" />
                  <span>Administrative Role Confirmation</span>
                </p>
                <p className="text-[10px] text-gray-400">Account status is auto-configured as <b>Company Admin</b> with fully isolated row-level read-write rights.</p>
              </div>
            </div>
          )}

          {/* STEP 2: CREATE COMPANY DATABASE */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#FF3D4F]" />
                  <span>STEP 2: Company Setup & Dedicated Database Instance</span>
                </h4>
                <p className="text-xs text-gray-400">Assign standard tenant identifiers and select the storage engine for remote offline synchronization.</p>
              </div>

              <div className="space-y-4 text-xs font-semibold font-sans">
                <div className="space-y-1.5">
                  <label className="text-gray-400">Company Name / Organization</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Acme Tech Solutions Ltd"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-[#11135E]/20 border border-[#16166F] rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF3D4F]"
                  />
                </div>

                {/* Database selection engine cards */}
                <div className="space-y-2">
                  <label className="text-gray-400 block pb-1">Select Relational Engine Architecture</label>
                  <div className="grid sm:grid-cols-2 gap-4">
                    
                    {/* SQLite */}
                    <div 
                      onClick={() => setDbEngine('sqlite')}
                      className={`p-4 rounded-xl border transition-all cursor-pointer text-left space-y-3 ${
                        dbEngine === 'sqlite'
                          ? 'bg-[#11135E]/30 border-[#FF3D4F] shadow-lg shadow-[#FF3D4F]/5'
                          : 'bg-[#11135E]/10 border-[#16166F] hover:border-[#16166F]/80'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="p-1.5 bg-[#FF3D4F]/10 rounded text-[#FF3D4F]">
                          <Database className="w-4 h-4" />
                        </span>
                        <div className={`h-3 w-3 rounded-full border flex items-center justify-center ${dbEngine === 'sqlite' ? 'border-[#FF3D4F] bg-[#FF3D4F]' : 'border-gray-500'}`}>
                          {dbEngine === 'sqlite' && <div className="h-1 w-1 bg-white rounded-full" />}
                        </div>
                      </div>
                      <div>
                        <h5 className="font-bold text-white text-xs">Isolated Local SQLite Engine</h5>
                        <p className="text-[10px] text-gray-400 font-normal leading-normal mt-1">
                          Ideal for distributed branch offices, extreme speed, and fully functional 100% offline transactions buffer synchronization.
                        </p>
                      </div>
                    </div>

                    {/* PostgreSQL */}
                    <div 
                      onClick={() => setDbEngine('postgres')}
                      className={`p-4 rounded-xl border transition-all cursor-pointer text-left space-y-3 ${
                        dbEngine === 'postgres'
                          ? 'bg-[#11135E]/30 border-[#FF3D4F] shadow-lg shadow-[#FF3D4F]/5'
                          : 'bg-[#11135E]/10 border-[#16166F] hover:border-[#16166F]/80'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="p-1.5 bg-[#FF3D4F]/10 rounded text-[#FF3D4F]">
                          <Server className="w-4 h-4" />
                        </span>
                        <div className={`h-3 w-3 rounded-full border flex items-center justify-center ${dbEngine === 'postgres' ? 'border-[#FF3D4F] bg-[#FF3D4F]' : 'border-gray-500'}`}>
                          {dbEngine === 'postgres' && <div className="h-1 w-1 bg-white rounded-full" />}
                        </div>
                      </div>
                      <div>
                        <h5 className="font-bold text-white text-xs">Cloud Hosted PostgreSQL DB</h5>
                        <p className="text-[10px] text-gray-400 font-normal leading-normal mt-1">
                          Perfect for scalable central office workloads, heavy multi-device environments, and real-time ledger consistency.
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-400">Database Cloud Deploy Region</label>
                  <select 
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full bg-[#02020A] border border-[#16166F] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#FF3D4F] text-xs font-mono font-semibold"
                  >
                    <option value="asia-southeast1">Asia Southeast 1 (Dhaka & Singapore) - Low Latency</option>
                    <option value="europe-west3">Europe West 3 (Brussels & Frankfurt)</option>
                    <option value="us-central1">US Central 1 (Iowa & Dallas)</option>
                  </select>
                </div>

              </div>
            </div>
          )}

          {/* STEP 3: CHOOSE APPLICATION MODULES */}
          {step === 3 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#FF3D4F]" />
                  <span>STEP 3: Provision Modular App Suite</span>
                </h4>
                <p className="text-xs text-gray-400">Select standard enterprise modules to toggle active inside your custom database setup. You can install more later.</p>
              </div>

              {/* Grid lists of apps */}
              <div className="grid sm:grid-cols-2 gap-3 max-h-[290px] overflow-y-auto pr-1 text-left font-sans">
                {availableApps.map((app) => {
                  const active = selectedApps.includes(app.id);
                  return (
                    <div 
                      key={app.id}
                      onClick={() => toggleAppSelection(app.id)}
                      className={`p-3 border rounded-xl flex items-start gap-3 transition-colors cursor-pointer select-none ${
                        active 
                          ? 'bg-[#11135E]/30 border-[#FF3D4F]' 
                          : 'bg-[#11135E]/5 border-[#16166F]/60 hover:bg-[#11135E]/15'
                      }`}
                    >
                      <button className="text-indigo-400 shrink-0 mt-0.5">
                        {active ? (
                          <CheckSquare className="w-4 h-4 text-[#FF3D4F]" />
                        ) : (
                          <Square className="w-4 h-4 text-gray-500" />
                        )}
                      </button>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h5 className="font-bold text-white text-xs">{app.name}</h5>
                          <span className="text-[8px] px-1 bg-indigo-900/30 border border-indigo-500/20 text-indigo-400 font-mono font-bold uppercase rounded">
                            {app.cat}
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-400 leading-normal">{app.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-3.5 bg-emerald-500/5 border border-emerald-500/20 rounded-xl text-[10.5px] text-emerald-300 flex justify-between items-center font-mono">
                <span>Enterprise Trial Quote:</span>
                <span className="font-bold underline text-white">৳ 0.00 FREE TRIAL ACTIVE</span>
              </div>
            </div>
          )}

          {/* STEP 4: PROVISIONING DATABASE LOAD STREAM */}
          {step === 4 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>STEP 4: Provisioning Custom Databases & Isolated State</span>
                </h4>
                <p className="text-xs text-gray-400">Compiling SQL packages, structural entities, and binding secure signatures logic.</p>
              </div>

              {/* Progress Bar status */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[11px] font-mono font-bold">
                  <span className="text-gray-400">Deployment Progress Stream:</span>
                  <span className="text-[#FF3D4F]">{provisionProgress}%</span>
                </div>
                <div className="w-full bg-[#11135E]/20 h-2 rounded-full overflow-hidden border border-[#16166F]">
                  <div 
                    className="h-full bg-gradient-to-r from-[#FF3D4F] to-indigo-500 transition-all duration-300"
                    style={{ width: `${provisionProgress}%` }}
                  />
                </div>
              </div>

              {/* Pseudo Terminal logs */}
              <div className="bg-[#02020A]/90 border border-[#16166F] rounded-xl p-4 h-48 overflow-y-auto font-mono text-[10px] text-emerald-400 space-y-2 text-left shadow-inner">
                {provisionLogs.map((log, idx) => (
                  <div key={idx} className="flex items-start gap-1">
                    <span className="text-indigo-400 shrink-0">❯</span>
                    <span className="leading-relaxed whitespace-pre-wrap">{log}</span>
                  </div>
                ))}
                {provisionProgress < 100 && (
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <Loader2 className="w-3 h-3 animate-spin text-[#FF3D4F]" />
                    <span className="animate-pulse">compiling database directives...</span>
                  </div>
                )}
                {provisionProgress === 100 && (
                  <div className="text-white font-bold bg-[#11135E]/60 border border-emerald-500/30 p-2.5 rounded-lg mt-3 text-center flex items-center justify-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Database Partitioning Sandbox Completed Successfully! Directing Connection Lock...</span>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* BOTTOM STEPPERS BAR BUTTONS */}
        <div className="bg-[#02020A]/85 px-6 py-4 border-t border-[#16166F]/65 flex justify-between items-center">
          <div>
            {step > 1 && step < 4 && (
              <button
                type="button"
                onClick={() => setStep(prev => prev - 1)}
                className="px-4 py-2 bg-[#11135E]/30 border border-[#16166F] hover:bg-[#11135E]/60 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            )}
          </div>

          <div>
            {step < 4 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-2 bg-[#FF3D4F] hover:bg-[#CC1A2F] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-lg shadow-[#FF3D4F]/10 transition-colors"
              >
                <span>Continue Setup</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCreateDatabase}
                disabled={provisionProgress < 100 || loading}
                className="px-8 py-2.5 bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-600 hover:to-indigo-700 disabled:opacity-40 text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/10 cursor-pointer transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Configuring Partition Session...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-white" />
                    <span>Launch Connection Dashboard</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
