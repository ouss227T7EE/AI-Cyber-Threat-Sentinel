import React from 'react';
import {
  LayoutDashboard,
  Terminal,
  Cpu,
  Database,
  ShieldAlert,
  Play,
  RefreshCw,
  FileCheck,
  Power,
  Globe,
  Activity,
  Layers,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Download,
  X,
} from 'lucide-react';
import { ActiveTab, AppMode } from '../types';

interface AppSidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  totalThreats: number;
  totalProtectedUsd: number;
  appMode: AppMode;
  isRunning: boolean;
  onRunEngine: () => void;
  onOpenReportModal: () => void;
  onDownloadHtml: () => void;
  onReturnToStandby: () => void;
  language: 'ar' | 'en';
  setLanguage: (lang: 'ar' | 'en') => void;
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  activeTab,
  setActiveTab,
  totalThreats,
  totalProtectedUsd,
  appMode,
  isRunning,
  onRunEngine,
  onOpenReportModal,
  onDownloadHtml,
  onReturnToStandby,
  language,
  setLanguage,
  mobileOpen = false,
  setMobileOpen,
}) => {
  const isAr = language === 'ar';

  const handleSelectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    if (setMobileOpen) {
      setMobileOpen(false);
    }
  };

  // 5 Main Modules
  const navigationItems: {
    id: ActiveTab;
    labelAr: string;
    labelEn: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number | string;
  }[] = [
    {
      id: 'dashboard',
      labelAr: 'لوحة المراقبة',
      labelEn: 'Dashboard',
      icon: LayoutDashboard,
      badge: totalThreats > 0 ? totalThreats : undefined,
    },
    {
      id: 'terminal',
      labelAr: 'الطرفية التفاعلية',
      labelEn: 'Interactive Terminal',
      icon: Terminal,
    },
    {
      id: 'ml_visualizer',
      labelAr: 'محرك الذكاء الاصطناعي',
      labelEn: 'AI Engine',
      icon: Cpu,
    },
    {
      id: 'database',
      labelAr: 'سجلات النظام',
      labelEn: 'Log Inspector',
      icon: Database,
    },
    {
      id: 'checkout_simulator',
      labelAr: 'محاكي الهجمات',
      labelEn: 'Attack Simulator',
      icon: ShieldAlert,
    },
  ];

  // Common sidebar content shared between desktop and mobile drawer
  const renderSidebarContent = () => (
    <div className="flex flex-col justify-between h-full">
      {/* Top Section: Brand & System Badge */}
      <div>
        {/* Brand Header */}
        <div className="p-5 lg:p-6 border-b border-[#27272a]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#18181b] border border-[#27272a] flex items-center justify-center text-[#a3ff00] shadow-sm">
                <Activity className="w-5 h-5 text-[#a3ff00]" />
              </div>
              <div>
                <h1 className="font-extrabold text-base tracking-wider text-zinc-100 uppercase">
                  AI SENTINEL
                </h1>
                <p className="text-[11px] text-zinc-500 font-mono">
                  Enterprise Threat Shield
                </p>
              </div>
            </div>

            {/* Mobile close button */}
            {setMobileOpen && (
              <button
                onClick={() => setMobileOpen(false)}
                className="lg:hidden p-2 rounded-lg bg-[#18181b] text-zinc-400 hover:text-white border border-[#27272a] cursor-pointer"
                aria-label="Close Navigation"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Mode Status Pill */}
          <div className="mt-4 pt-3 border-t border-[#1e1e22] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    appMode === 'live' ? 'bg-emerald-400' : 'bg-amber-400'
                  }`}
                />
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${
                    appMode === 'live' ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                />
              </span>
              <span className="text-xs font-mono font-medium text-zinc-400">
                {appMode === 'live' ? (isAr ? 'قاعدة بيانات حية' : 'Live Database') : (isAr ? 'بيانات تجريبية' : 'Demo Simulation')}
              </span>
            </div>

            <span className="text-[10px] font-mono text-zinc-500 bg-[#18181b] px-2 py-0.5 rounded border border-[#27272a]">
              v2.4 LTS
            </span>
          </div>
        </div>

        {/* Navigation Modules (5 Clean Modules) */}
        <div className="p-3 lg:p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-320px)] lg:max-h-none">
          <p className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-zinc-500 font-mono">
            {isAr ? 'الوحدات الرئيسية' : 'Core Modules'}
          </p>

          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                id={`sidebar-nav-${item.id}`}
                onClick={() => handleSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-[#18181b] text-zinc-100 border border-[#27272a] shadow-sm font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#18181b]/50 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      isActive ? 'text-[#a3ff00]' : 'text-zinc-500'
                    }`}
                  />
                  <span>{isAr ? item.labelAr : item.labelEn}</span>
                </div>

                {item.badge !== undefined && (
                  <span className="px-2 py-0.5 rounded-md text-xs font-mono font-bold bg-[#ff3344]/15 text-[#ff4d5e] border border-[#ff3344]/30">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Section: Primary Action & Quick Tools */}
      <div className="p-4 border-t border-[#27272a] space-y-3 bg-[#101013]">
        {/* Primary Action Button: Run Scan */}
        <button
          id="sidebar-run-scan-btn"
          onClick={() => {
            onRunEngine();
            if (setMobileOpen) setMobileOpen(false);
          }}
          disabled={isRunning}
          className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold font-mono transition-all duration-150 cursor-pointer ${
            isRunning
              ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700'
              : 'bg-[#a3ff00] hover:bg-[#b8ff33] text-black font-extrabold shadow-sm active:scale-[0.98]'
          }`}
        >
          {isRunning ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Play className="w-4 h-4 fill-current" />
          )}
          <span>
            {isRunning
              ? isAr
                ? 'جاري فحص النماذج...'
                : 'SCANNING IN PROGRESS...'
              : isAr
              ? 'تشغيل فحص الذكاء الاصطناعي'
              : 'RUN AI SENTINEL SCAN'}
          </span>
        </button>

        {/* Secondary Utilities */}
        <div className="grid grid-cols-2 gap-2">
          {/* Security Report */}
          <button
            id="sidebar-report-btn"
            onClick={() => {
              onOpenReportModal();
              if (setMobileOpen) setMobileOpen(false);
            }}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-[#18181b] hover:bg-[#202024] text-zinc-300 hover:text-white border border-[#27272a] text-xs font-medium transition-all cursor-pointer"
            title={isAr ? 'تصدير التقرير الأمني الجنائي' : 'Export Forensic Report'}
          >
            <FileCheck className="w-4 h-4 text-[#a3ff00]" />
            <span>{isAr ? 'التقرير الأمني' : 'Report'}</span>
          </button>

          {/* HTML Standalone Download */}
          <button
            id="sidebar-download-html-btn"
            onClick={() => {
              onDownloadHtml();
              if (setMobileOpen) setMobileOpen(false);
            }}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-[#18181b] hover:bg-[#202024] text-zinc-300 hover:text-white border border-[#27272a] text-xs font-medium transition-all cursor-pointer"
            title="Download Standalone HTML Dashboard"
          >
            <Download className="w-4 h-4 text-zinc-400" />
            <span>HTML</span>
          </button>
        </div>

        {/* Bottom Bar: Language & Standby */}
        <div className="pt-2 border-t border-[#1e1e22] flex items-center justify-between text-xs">
          {/* Language Switch */}
          <button
            id="sidebar-lang-btn"
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#18181b] hover:bg-[#202024] text-zinc-400 hover:text-zinc-200 border border-[#27272a] transition-colors cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="font-mono">{language === 'en' ? 'العربية' : 'English'}</span>
          </button>

          {/* Standby / Reset Button */}
          <button
            id="sidebar-standby-btn"
            onClick={() => {
              onReturnToStandby();
              if (setMobileOpen) setMobileOpen(false);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-zinc-400 hover:text-[#ff4d5e] hover:bg-[#ff3344]/10 transition-colors cursor-pointer"
            title={isAr ? 'العودة لوضع الاستعداد' : 'Return to Standby Mode'}
          >
            <Power className="w-3.5 h-3.5" />
            <span>{isAr ? 'استعداد' : 'Standby'}</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. Large Screens: Fixed Sticky Desktop Sidebar (Hidden on Mobile/Tablet) */}
      <aside className="hidden lg:flex lg:w-72 bg-[#121215] border-x border-[#27272a] flex-col justify-between h-screen sticky top-0 shrink-0 select-none z-30">
        {renderSidebarContent()}
      </aside>

      {/* 2. Mobile & Tablet Screen: Slide-out Off-Canvas Drawer with Backdrop */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Dimmed backdrop */}
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-200"
            onClick={() => setMobileOpen && setMobileOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer container (slides from right for RTL or left for LTR) */}
          <div
            className={`relative w-80 max-w-[85vw] bg-[#121215] border-[#27272a] z-50 h-full flex flex-col shadow-2xl ${
              isAr ? 'mr-0 ml-auto border-l' : 'ml-0 mr-auto border-r'
            }`}
          >
            {renderSidebarContent()}
          </div>
        </div>
      )}
    </>
  );
};
