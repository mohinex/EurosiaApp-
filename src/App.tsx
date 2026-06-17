/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Lock, Cpu, Server, X, ExternalLink, HelpCircle, Eye, EyeOff } from 'lucide-react';
import WebsiteUI from './components/WebsiteUI.tsx';
import Logo from './components/Logo.tsx';
import DashboardUI from './components/DashboardUI.tsx';
import SuperAdminUI from './components/SuperAdminUI.tsx';
import AIChatbot from './components/AIChatbot.tsx';
import OnboardingWizard from './components/OnboardingWizard.tsx';
import { useLanguage } from './hooks/useLanguage.ts';

type ViewState = 'website' | 'dashboard' | 'admin';

export default function App() {
  const { t } = useLanguage();
  const [view, setView] = useState<ViewState>('website');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showOwnerBackdoor, setShowOwnerBackdoor] = useState(false);
  
  // Login input variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  // Authenticated state tracking
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any | null>(null);

  // Save/retrieve active sessions on component load
  useEffect(() => {
    const savedToken = localStorage.getItem('eur_auth_token');
    const savedUser = localStorage.getItem('eur_auth_user');
    const savedView = localStorage.getItem('eur_auth_view');
    
    if (savedToken && savedUser) {
      setAuthToken(savedToken);
      setCurrentUser(JSON.parse(savedUser));
      if (savedView) setView(savedView as ViewState);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('eur_auth_token');
    localStorage.removeItem('eur_auth_user');
    localStorage.removeItem('eur_auth_view');
    setAuthToken(null);
    setCurrentUser(null);
    setView('website');
    setShowLoginModal(false);
    setShowOwnerBackdoor(false);
  };

  const handleBackdoorToggle = () => {
    const isOwnerOrSuperAdmin = currentUser && (
      currentUser.role?.toLowerCase() === 'super admin' || 
      currentUser.role?.toLowerCase() === 'owner' || 
      currentUser.role?.toLowerCase() === 'super_admin'
    );
    if (!isOwnerOrSuperAdmin) return;
    setShowOwnerBackdoor(true);
    setShowLoginModal(true);
    setEmail('mohinextfuture@gmail.com');
  };

  const handleExecuteLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setLoginError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password
        })
      });

      if (!response.ok) {
        let errMsg = 'Identity matching mismatch.';
        try {
          const errData = await response.json();
          errMsg = errData.error || errMsg;
        } catch (_) {
          errMsg = `Server Error (${response.status}): Identity matching mismatch.`;
        }
        throw new Error(errMsg);
      }

      const data = await response.json();

      // Successful login persistence
      localStorage.setItem('eur_auth_token', data.token);
      localStorage.setItem('eur_auth_user', JSON.stringify(data.user));
      setAuthToken(data.token);
      setCurrentUser(data.user);

      if (data.user.role === 'Super Admin') {
        localStorage.setItem('eur_auth_view', 'admin');
        setView('admin');
      } else {
        localStorage.setItem('eur_auth_view', 'dashboard');
        setView('dashboard');
      }

      setShowLoginModal(false);
      setPassword('');

    } catch (err: any) {
      setLoginError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen text-white font-sans bg-[#02020A]">
      
      {/* Dynamic Content Views */}
      {view === 'website' && (
        <WebsiteUI 
          onLoginClick={() => { setShowOwnerBackdoor(false); setShowLoginModal(true); }}
          onStartTrialClick={() => setShowOnboarding(true)}
          onExploreDashboard={() => {
            if (authToken) {
              setView(currentUser.role === 'Super Admin' ? 'admin' : 'dashboard');
            } else {
              setShowOwnerBackdoor(false);
              setShowLoginModal(true);
            }
          }}
          onOwnerUnlock={handleBackdoorToggle}
          currentUser={currentUser}
        />
      )}

      {view === 'dashboard' && currentUser && (
        <DashboardUI 
          onBackToWebsite={handleLogout}
          user={currentUser}
          token={authToken || ''}
        />
      )}

      {view === 'admin' && authToken && (
        <SuperAdminUI 
          onBackToWebsite={handleLogout}
          token={authToken}
        />
      )}

      {/* Persistent custom Eurosia AI widget on side margin */}
      {view === 'website' && <AIChatbot />}

      {/* Onboarding Sandbox Trial Wizard Modal */}
      {showOnboarding && (
        <OnboardingWizard 
          onClose={() => setShowOnboarding(false)}
          onSuccess={(token, user) => {
            setAuthToken(token);
            setCurrentUser(user);
            setView('dashboard');
            setShowOnboarding(false);
          }}
        />
      )}

      {/* ━━━━━━━━━━━━━━━━ DESIGNED SIGN-IN CAPABILITY MODAL ━━━━━━━━━━━━━━━━ */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div 
            className="bg-[#05051B] border border-[#16166F] w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl relative"
            id="panel-login-card"
          >
            {/* Header top banner */}
            <div className="bg-gradient-to-r from-[#11135E] to-[#0A0A6B] p-5 flex items-center justify-between border-b border-[#16166F]">
              <div className="flex items-center gap-2.5">
                <Logo variant="compact" size="xs" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF3D4F]">
                  {showOwnerBackdoor ? 'OWNER ACCESS OVERRIDE' : t('login.title', 'MEMBER ACCESS TERMINAL')}
                </span>
              </div>
              <button 
                onClick={() => setShowLoginModal(false)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Custom guidance tips */}
            <div className="p-5 pb-0">
              <div className="bg-[#11135E]/30 border border-[#16166F]/50 p-3.5 rounded-xl text-[11px] text-gray-400 leading-normal flex items-start gap-2">
                <Lock className="w-4 h-4 shrink-0 text-[#FF3D4F]" />
                <div>
                  <p>{t('login.instruction_text', 'Please sign in with your authorized account.')}</p>
                </div>
              </div>
            </div>

            {/* Content Form edit parameters */}
            <form onSubmit={handleExecuteLogin} className="p-5 space-y-4 text-xs font-semibold">
              {loginError && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 font-bold text-[11px]">
                  {loginError}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-gray-400">{t('login.email_label', 'User Identification Email')}</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. admin@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#11135E]/20 border border-[#16166F] rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF3D4F]/50"
                  id="login-email-field"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-gray-400">
                  <label>{t('login.password_label', 'Security Phrase')}</label>
                  <button
                    type="button"
                    onClick={() => alert("Please contact your system administrator to recover your password.")}
                    className="text-[10px] text-[#FF3D4F] hover:underline cursor-pointer"
                  >
                    Forgot Password
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder={t('login.password_placeholder', 'Enter system security phrase')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#11135E]/20 border border-[#16166F] rounded-lg pl-3 pr-10 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF3D4F]/50"
                    id="login-password-field"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4 text-gray-500" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-[#FF3D4F] hover:bg-[#CC1A2F] text-white font-bold tracking-wide rounded-lg cursor-pointer transition flex items-center justify-center gap-1.5 shadow-lg shadow-[#FF3D4F]/10"
                id="login-execute-btn"
              >
                <span>{loading ? t('login.authenticating', 'Authenticating System...') : t('login.submit_btn', 'Establish Connection Lock')}</span>
              </button>

              {currentUser && (
                currentUser.role?.toLowerCase() === 'super admin' || 
                currentUser.role?.toLowerCase() === 'owner' || 
                currentUser.role?.toLowerCase() === 'super_admin'
              ) && (
                <>
                  <div className="p-2 border border-[#16166F]/40 bg-[#11135E]/10 rounded-lg text-center text-[10.5px]">
                    <span className="text-gray-400">Need a sandbox database? </span>
                    <button
                      type="button"
                      onClick={() => {
                        setShowLoginModal(false);
                        setShowOnboarding(true);
                      }}
                      className="text-[#FF3D4F] font-bold hover:underline cursor-pointer"
                    >
                      Start Free Trial Onboarding ➔
                    </button>
                  </div>

                  <div className="text-center pt-2 border-t border-[#16166F]/30">
                    <button
                      type="button"
                      onClick={() => {
                        setShowOwnerBackdoor(!showOwnerBackdoor);
                        setEmail(showOwnerBackdoor ? 'admin@eurosia.io' : 'mohinextfuture@gmail.com');
                      }}
                      className="text-[10px] text-gray-400 hover:text-white underline cursor-pointer"
                    >
                      {showOwnerBackdoor ? 'Switch to Standard tenant credentials' : 'Use door bypass trigger'}
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
