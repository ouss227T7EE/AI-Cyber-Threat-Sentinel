import React from 'react';
import {
  ShieldAlert,
  Terminal,
  Activity,
  Database,
  FileCode,
  Globe,
  Play,
  Download,
  Zap,
  RefreshCw,
  FileCheck,
  Power,
  ShoppingCart,
} from 'lucide-react';
import { ActiveTab, AppMode } from '../types';
import { CyberLogo } from './CyberLogo';

interface CyberHeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onRunEngine: () => void;
  onInjectAttack: () => void;
  onDownloadHtml: () => void;
  onOpenReportModal: () => void;
  onReturnToStandby: () => void;
  isRunning: boolean;
  appMode: AppMode;
  totalThreats: number;
  revenueProtected: number;
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
}

export const CyberHeader: React.FC<CyberHeaderProps> = ({
  activeTab,
  setActiveTab,
  onRunEngine,
  onInjectAttack,
  onDownloadHtml,
  onOpenReportModal,
  onReturnToStandby,
  isRunning,
  appMode,
  totalThreats,
  language,
  setLanguage,
}) => {
  const isAr = language === 'ar';

  const navItems: { id: ActiveTab; label: string; labelAr: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Sentinel Dashboard', labelAr: 'لوحة التحكم الفخمة', icon: <Activity className="w-4 h-4" /> },
    { id: 'checkout_simulator', label: 'Store Checkout Simulator', labelAr: 'محاكي متجر الدفع', icon: <ShoppingCart className="w-4 h-4" /> },
    { id: 'terminal', label: 'Interactive Terminal', labelAr: 'الطرفية التفاعلية', icon: <Terminal className="w-4 h-4" /> },
    { id: 'ml_visualizer', label: 'Isolation Forest AI', labelAr: 'خوارزمية الذكاء الاصطناعي', icon: <Zap className="w-4 h-4" /> },
    { id: 'database', label: 'SQLite Log Inspector', labelAr: 'قاعدة بيانات السجلات', icon: <Database className="w-4 h-4" /> },
    { id: 'code_guide', label: 'main.py & Guide', labelAr: 'كود بايثون والدرس', icon: <FileCode className="w-4 h-4" /> },
    { id: 'html_preview', label: 'Security_Dashboard.html', labelAr: 'معاينة ملف HTML', icon: <FileCheck className="w-4 h-4" /> },
  ];

  return (
    <header className="border-b border-[#1c2e1c] bg-[#070b07]/95 backdrop-blur sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand with CSS Hexagon Logo */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <CyberLogo size="sm" />
            <div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="font-black text-lg tracking-wider text-white uppercase">AI SENTINEL</span>
                {appMode === 'live' ? (
                  <span className="inline-flex items-center space-x-1.5 rtl:space-x-reverse px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#10b981]/20 text-[#34d399] border border-[#10b981]/60 shadow-[0_0_15px_rgba(16,185,129,0.4)] font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping inline-block" />
                    <span>LIVE DB ACTIVE</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center space-x-1.5 rtl:space-x-reverse px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#f59e0b]/20 text-[#fbbf24] border border-[#f59e0b]/60 shadow-[0_0_15px_rgba(245,158,11,0.35)] font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] inline-block" />
                    <span>SYNTHETIC DEMO</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-400 font-mono hidden sm:block">
                {isAr ? 'كاشف التهديدات الاحتيالية بالذكاء الاصطناعي' : 'Real-Time E-Commerce Threat Defense'}
              </p>
            </div>
          </div>

          {/* Quick Action Center */}
          <div className="flex items-center space-x-2 sm:space-x-2.5 rtl:space-x-reverse">
            {/* Run Engine */}
            <button
              id="header-run-btn"
              onClick={onRunEngine}
              disabled={isRunning}
              className={`flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                isRunning
                  ? 'bg-neutral-800 text-neutral-400 cursor-not-allowed'
                  : 'bg-[#a3ff00] text-black hover:bg-[#b8ff33] shadow-[0_0_15px_rgba(163,255,0,0.3)] cursor-pointer'
              }`}
            >
              {isRunning ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isRunning ? (isAr ? 'جاري الفحص...' : 'Scanning...') : (isAr ? 'تشغيل الفحص' : 'Run Scan')}</span>
            </button>

            {/* Attack Simulation */}
            <button
              id="header-inject-btn"
              onClick={onInjectAttack}
              className="hidden sm:flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-1.5 rounded-lg text-xs font-bold bg-[#ff3344]/15 hover:bg-[#ff3344]/25 text-[#ff4d5e] border border-[#ff3344]/40 transition-all cursor-pointer"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{isAr ? 'محاكاة هجمة' : 'Inject Attack'}</span>
            </button>

            {/* Export Security Report */}
            <button
              id="header-report-btn"
              onClick={onOpenReportModal}
              className="flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-1.5 rounded-lg text-xs font-bold bg-[#142314] hover:bg-[#1c331c] text-[#a3ff00] border border-[#264426] shadow-[0_0_10px_rgba(163,255,0,0.12)] transition-all cursor-pointer"
              title={isAr ? 'تصدير التقرير الأمني الجنائي' : 'Export Security Report'}
            >
              <FileCheck className="w-3.5 h-3.5 text-[#a3ff00]" />
              <span className="font-sans">{isAr ? 'تصدير التقرير الأمني' : 'Security Report'}</span>
            </button>

            {/* Download Export HTML */}
            <button
              id="header-export-btn"
              onClick={onDownloadHtml}
              className="hidden md:flex items-center space-x-1.5 rtl:space-x-reverse px-2.5 py-1.5 rounded-lg text-xs font-medium bg-[#131c13] hover:bg-[#1b291b] text-neutral-200 border border-[#223822] transition-all cursor-pointer"
              title="Download Security_Dashboard.html"
            >
              <Download className="w-3.5 h-3.5 text-[#a3ff00]" />
              <span>HTML</span>
            </button>

            {/* Standby / Disconnect Button */}
            <button
              id="header-standby-btn"
              onClick={onReturnToStandby}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-[#ff4d5e] hover:bg-[#1a0a0a] border border-transparent hover:border-[#ff3344]/30 transition-all cursor-pointer"
              title={isAr ? 'العودة لوضع الاستعداد (Standby)' : 'Return to Standby Mode'}
            >
              <Power className="w-4 h-4" />
            </button>

            {/* Language Switch */}
            <button
              id="header-lang-btn"
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-700 transition-all flex items-center space-x-1.5 rtl:space-x-reverse cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'عربي' : 'EN'}</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center space-x-1 sm:space-x-2 rtl:space-x-reverse overflow-x-auto py-2 scrollbar-none text-xs border-t border-[#142214]/60">
          {navItems.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-1.5 rounded-md whitespace-nowrap font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#152415] text-[#a3ff00] border border-[#a3ff00]/40 shadow-[0_0_10px_rgba(163,255,0,0.15)] font-semibold'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/60'
                }`}
              >
                {tab.icon}
                <span>{isAr ? tab.labelAr : tab.label}</span>
                {tab.id === 'dashboard' && totalThreats > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#ff3344] text-white">
                    {totalThreats}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
