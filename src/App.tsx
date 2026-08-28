/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  Menu,
  Activity,
  LayoutDashboard,
  Terminal,
  Cpu,
  Database,
  ShieldAlert,
  Globe,
  RefreshCw,
  Play,
} from 'lucide-react';
import { AccessLog, ActiveTab, AppMode, ThreatToast } from './types';
import { generateSyntheticLogs, generateSingleAttackLog, generateSingleNormalLog } from './utils/sampleData';
import { runIsolationForest, IsolationForestResult } from './utils/isolationForest';
import { StandbyScreen } from './components/StandbyScreen';
import { AppSidebar } from './components/AppSidebar';
import { SecurityDashboard } from './components/SecurityDashboard';
import { TerminalRunner } from './components/TerminalRunner';
import { MLVisualizer } from './components/MLVisualizer';
import { LogsDatabase } from './components/LogsDatabase';
import { CodeViewer } from './components/CodeViewer';
import { HtmlPreview } from './components/HtmlPreview';
import { ThreatDetailModal } from './components/ThreatDetailModal';
import { SecurityReportModal } from './components/SecurityReportModal';
import { LiveDatabaseModal } from './components/LiveDatabaseModal';
import { ToastNotifications } from './components/ToastNotifications';
import { CheckoutSimulator } from './components/CheckoutSimulator';
import { generateHtmlDashboardContent, downloadFile } from './utils/exporter';

export default function App() {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [appMode, setAppMode] = useState<AppMode>('standby');
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [logs, setLogs] = useState<AccessLog[]>([]);
  const [threats, setThreats] = useState<AccessLog[]>([]);
  const [safeLogs, setSafeLogs] = useState<AccessLog[]>([]);
  const [totalProtectedUsd, setTotalProtectedUsd] = useState<number>(0);
  const [contaminationRate, setContaminationRate] = useState<number>(0.04);
  const [anomalyThreshold, setAnomalyThreshold] = useState<number>(0.5);
  const [executionTimeMs, setExecutionTimeMs] = useState<number>(10);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [selectedThreat, setSelectedThreat] = useState<AccessLog | null>(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);

  // Modals & Live Toasts
  const [toasts, setToasts] = useState<ThreatToast[]>([]);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [isLiveDbModalOpen, setIsLiveDbModalOpen] = useState<boolean>(false);

  // Helper to trigger dynamic threat toast
  const addThreatToast = useCallback((threat: AccessLog) => {
    const formattedAmount = `$${threat.cart_value_usd.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
    const newToast: ThreatToast = {
      id: `toast-${Date.now()}-${Math.random()}`,
      threat,
      message: language === 'ar'
        ? `تم حظر تهديد من ${threat.ip_address} بقيمة ${formattedAmount}`
        : `Threat blocked from ${threat.ip_address} worth ${formattedAmount}`,
      type: 'threat',
      createdAt: Date.now(),
    };

    setToasts((prev) => [newToast, ...prev.slice(0, 3)]);
  }, [language]);

  // Action A: Normal Buyer Simulation
  const handleSimulateNormalBuyer = useCallback((customPayload?: Partial<AccessLog>) => {
    const normalLog: AccessLog = {
      id: Date.now(),
      ip_address: customPayload?.ip_address || `192.168.1.${Math.floor(Math.random() * 200) + 10}`,
      session_duration: customPayload?.session_duration ?? 300,
      cart_value_usd: customPayload?.cart_value_usd ?? 120.0,
      payment_failures: customPayload?.payment_failures ?? 0,
      country: customPayload?.country || (language === 'ar' ? 'SA' : 'US'),
      city: customPayload?.city || (language === 'ar' ? 'Riyadh' : 'Austin'),
      ai_verdict: 1,
      anomaly_score: 0.08,
      status: 'ALLOWED',
      threat_type: 'Legitimate Buyer',
      timestamp: new Date().toLocaleTimeString(),
    };

    setLogs((prev) => [normalLog, ...prev]);
    setSafeLogs((prev) => [normalLog, ...prev]);

    const safeToast: ThreatToast = {
      id: `safe-${Date.now()}-${Math.random()}`,
      threat: normalLog,
      message: language === 'ar' ? 'تم تسجيل زيارة مشتري آمنة بنجاح' : 'Safe customer visit recorded successfully',
      type: 'safe',
      createdAt: Date.now(),
    };
    setToasts((prev) => [safeToast, ...prev.slice(0, 3)]);
  }, [language]);

  // Action B: Bot/Hacker Attack
  const handleSimulateBotAttack = useCallback((customPayload?: Partial<AccessLog>) => {
    const attackLog: AccessLog = {
      id: Date.now(),
      ip_address:
        customPayload?.ip_address ||
        `185.220.${Math.floor(Math.random() * 100) + 101}.${Math.floor(Math.random() * 250) + 1}`,
      session_duration: customPayload?.session_duration ?? 2,
      cart_value_usd: customPayload?.cart_value_usd ?? 4500.0,
      payment_failures: customPayload?.payment_failures ?? 50,
      country: customPayload?.country || 'DE',
      city: customPayload?.city || 'Frankfurt',
      ai_verdict: -1,
      anomaly_score: 0.945,
      status: 'BLOCKED',
      threat_type: 'Card Testing Bot',
      timestamp: new Date().toLocaleTimeString(),
    };

    setLogs((prev) => [attackLog, ...prev]);
    setThreats((prev) => [attackLog, ...prev]);
    setTotalProtectedUsd((prev) => prev + attackLog.cart_value_usd);
    setSelectedThreat(attackLog);
    addThreatToast(attackLog);
  }, [addThreatToast]);

  // Swarm Injection from Checkout Simulator
  const handleCheckoutInjectBotSwarm = useCallback((
    count: number,
    signature: string,
    modeName: string,
    cartValue?: number
  ) => {
    const swarmLogs: AccessLog[] = [];
    const baseIpPrefix = `185.220.${Math.floor(Math.random() * 100) + 100}`;
    const effectiveCart = cartValue || 2499;

    for (let i = 0; i < count; i++) {
      const isBot = true;
      const logItem: AccessLog = {
        id: Date.now() + i + Math.floor(Math.random() * 1000),
        ip_address: `${baseIpPrefix}.${Math.floor(Math.random() * 250) + 1}`,
        session_duration: Math.floor(Math.random() * 6) + 1,
        cart_value_usd: effectiveCart + (Math.random() * 200 - 100),
        payment_failures: Math.floor(Math.random() * 40) + 20,
        country: 'DE',
        city: 'Frankfurt',
        ai_verdict: isBot ? -1 : 1,
        anomaly_score: isBot ? 0.96 : 0.12,
        status: isBot ? 'BLOCKED' : 'ALLOWED',
        threat_type: `Swarm ${signature}`,
        timestamp: new Date().toLocaleTimeString(),
      };
      swarmLogs.push(logItem);
    }

    setLogs((prev) => [...swarmLogs, ...prev]);
    setThreats((prev) => [...swarmLogs, ...prev]);
    const addedAmount = swarmLogs.reduce((acc, l) => acc + l.cart_value_usd, 0);
    setTotalProtectedUsd((prev) => prev + addedAmount);

    if (swarmLogs.length > 0) {
      addThreatToast(swarmLogs[0]);
    }
  }, [addThreatToast]);

  // Primary AI Engine execution using Isolation Forest algorithm
  const handleRunEngine = useCallback(() => {
    setIsRunning(true);
    const start = performance.now();

    setTimeout(() => {
      let currentLogs = logs;
      if (currentLogs.length === 0) {
        currentLogs = generateSyntheticLogs(500);
      }

      const result: IsolationForestResult = runIsolationForest(currentLogs, contaminationRate);

      setLogs(result.logs);
      setThreats(result.threats);
      setSafeLogs(result.safe);
      setTotalProtectedUsd(result.totalProtectedUsd);
      setAnomalyThreshold(result.anomalyThreshold);

      const end = performance.now();
      setExecutionTimeMs(Math.max(1, Math.round(end - start)));
      setIsRunning(false);
    }, 450);
  }, [logs, contaminationRate]);

  // Initialize Synthetic Demo Environment
  const handleLaunchDemo = () => {
    setAppMode('demo');
    const initialLogs = generateSyntheticLogs(500);
    const result = runIsolationForest(initialLogs, contaminationRate);

    setLogs(result.logs);
    setThreats(result.threats);
    setSafeLogs(result.safe);
    setTotalProtectedUsd(result.totalProtectedUsd);
    setAnomalyThreshold(result.anomalyThreshold);
    setActiveTab('dashboard');
  };

  // Connect to Live Database success handler
  const handleConnectLiveDbSuccess = () => {
    setAppMode('live');
    const liveLogs = generateSyntheticLogs(650);
    const result = runIsolationForest(liveLogs, contaminationRate);

    setLogs(result.logs);
    setThreats(result.threats);
    setSafeLogs(result.safe);
    setTotalProtectedUsd(result.totalProtectedUsd);
    setAnomalyThreshold(result.anomalyThreshold);
    setActiveTab('dashboard');
    setIsLiveDbModalOpen(false);
  };

  const handleReturnToStandby = () => {
    setAppMode('standby');
    setLogs([]);
    setThreats([]);
    setSafeLogs([]);
    setTotalProtectedUsd(0);
    setIsStreaming(false);
  };

  // Custom log injection
  const handleInjectCustomLog = (logData: Partial<AccessLog>) => {
    const isBot =
      (logData.session_duration && logData.session_duration < 15) ||
      (logData.payment_failures && logData.payment_failures > 5) ||
      (logData.cart_value_usd && logData.cart_value_usd > 3000);

    const newLog: AccessLog = {
      id: Date.now(),
      ip_address: logData.ip_address || '185.220.101.44',
      session_duration: logData.session_duration || 5,
      cart_value_usd: logData.cart_value_usd || 2500,
      payment_failures: logData.payment_failures || 30,
      country: logData.country || 'DE',
      city: logData.city || 'Frankfurt',
      ai_verdict: isBot ? -1 : 1,
      anomaly_score: isBot ? 0.94 : 0.12,
      status: isBot ? 'BLOCKED' : 'ALLOWED',
      threat_type: isBot ? 'Manual Injected Bot' : 'Manual Normal Buyer',
      timestamp: new Date().toLocaleTimeString(),
    };

    setLogs((prev) => [newLog, ...prev]);
    if (isBot) {
      setThreats((prev) => [newLog, ...prev]);
      setTotalProtectedUsd((prev) => prev + newLog.cart_value_usd);
      addThreatToast(newLog);
    } else {
      setSafeLogs((prev) => [newLog, ...prev]);
    }
  };

  // Live streaming effect
  useEffect(() => {
    if (!isStreaming || appMode === 'standby') return;

    const interval = setInterval(() => {
      const isAttack = Math.random() < contaminationRate * 2.5;
      const newLog = isAttack ? generateSingleAttackLog() : generateSingleNormalLog();

      setLogs((prev) => [newLog, ...prev.slice(0, 700)]);

      if (newLog.ai_verdict === -1) {
        setThreats((prev) => [newLog, ...prev]);
        setTotalProtectedUsd((prev) => prev + newLog.cart_value_usd);
        addThreatToast(newLog);
      } else {
        setSafeLogs((prev) => [newLog, ...prev]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isStreaming, appMode, contaminationRate, addThreatToast]);

  // Download standalone HTML
  const handleDownloadHtml = () => {
    const html = generateHtmlDashboardContent(threats, totalProtectedUsd);
    downloadFile('Security_Dashboard.html', html, 'text/html');
  };

  // Firewall actions
  const handleBlockPermanent = (ip: string) => {
    setLogs((prev) =>
      prev.map((l) =>
        l.ip_address === ip
          ? { ...l, ai_verdict: -1, status: 'BLOCKED' as const, threat_type: 'Permanent Firewall Ban' }
          : l
      )
    );
  };

  const handleWhitelist = (ip: string) => {
    setLogs((prev) =>
      prev.map((l) =>
        l.ip_address === ip ? { ...l, ai_verdict: 1, status: 'ALLOWED' as const, threat_type: 'Whitelisted' } : l
      )
    );
    setThreats((prev) => prev.filter((t) => t.ip_address !== ip));
  };

  // Standby screen
  if (appMode === 'standby') {
    return (
      <>
        <StandbyScreen
          onLaunchDemo={handleLaunchDemo}
          onConnectLiveDb={handleConnectLiveDbSuccess}
          language={language}
          setLanguage={setLanguage}
        />

        <LiveDatabaseModal
          isOpen={isLiveDbModalOpen}
          onClose={() => setIsLiveDbModalOpen(false)}
          onConnectSuccess={handleConnectLiveDbSuccess}
          language={language}
        />
      </>
    );
  }

  return (
    <div
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#09090b] text-zinc-100 flex font-sans selection:bg-[#a3ff00] selection:text-black antialiased relative overflow-x-hidden"
    >
      {/* 1. Modern Fixed Sidebar Navigation (Desktop Fixed / Mobile Drawer Overlay) */}
      <AppSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        totalThreats={threats.length}
        totalProtectedUsd={totalProtectedUsd}
        appMode={appMode}
        isRunning={isRunning}
        onRunEngine={handleRunEngine}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        onDownloadHtml={handleDownloadHtml}
        onReturnToStandby={handleReturnToStandby}
        language={language}
        setLanguage={setLanguage}
        mobileOpen={isMobileNavOpen}
        setMobileOpen={setIsMobileNavOpen}
      />

      {/* 2. Spacious Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#09090b] min-h-screen overflow-y-auto overflow-x-hidden">
        
        {/* Mobile Top Navigation Header (Visible only on < lg screens) */}
        <header className="lg:hidden sticky top-0 z-30 bg-[#121215]/95 backdrop-blur-md border-b border-[#27272a] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              id="mobile-hamburger-btn"
              onClick={() => setIsMobileNavOpen(true)}
              className="p-2 rounded-xl bg-[#18181b] hover:bg-[#202024] text-zinc-200 border border-[#27272a] relative cursor-pointer"
              aria-label="Open Navigation Drawer"
            >
              <Menu className="w-5 h-5 text-zinc-300" />
              {threats.length > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#ff3344] rounded-full ring-2 ring-[#121215]" />
              )}
            </button>

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#18181b] border border-[#27272a] flex items-center justify-center text-[#a3ff00]">
                <Activity className="w-4 h-4 text-[#a3ff00]" />
              </div>
              <span className="font-extrabold text-sm tracking-wider text-zinc-100 uppercase">
                AI SENTINEL
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Run Scan Quick Mobile Button */}
            <button
              onClick={handleRunEngine}
              disabled={isRunning}
              className="p-2 rounded-xl bg-[#a3ff00] text-black font-bold border border-[#a3ff00] cursor-pointer disabled:opacity-50"
              title="Run AI Sentinel Scan"
            >
              {isRunning ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Play className="w-4 h-4 fill-current" />
              )}
            </button>

            {/* Language Switch */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#18181b] text-zinc-300 border border-[#27272a] text-xs font-mono cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'AR' : 'EN'}</span>
            </button>
          </div>
        </header>

        {/* Module Content Views */}
        <div className="flex-1 pb-20 lg:pb-8">
          {activeTab === 'dashboard' && (
            <SecurityDashboard
              threats={threats}
              safeCount={safeLogs.length}
              totalProtectedUsd={totalProtectedUsd}
              contaminationRate={contaminationRate}
              setContaminationRate={setContaminationRate}
              onSelectThreat={setSelectedThreat}
              onInjectAttack={() => handleSimulateBotAttack()}
              onRunEngine={handleRunEngine}
              language={language}
            />
          )}

          {activeTab === 'checkout_simulator' && (
            <CheckoutSimulator
              onInjectNormalOrder={(payload) => handleSimulateNormalBuyer(payload)}
              onInjectBotSwarm={(count, signature, modeName, cartValue) =>
                handleCheckoutInjectBotSwarm(count, signature, modeName, cartValue)
              }
              language={language}
              totalProtectedUsd={totalProtectedUsd}
              totalThreats={threats.length}
            />
          )}

          {activeTab === 'terminal' && (
            <TerminalRunner
              logs={logs}
              threats={threats}
              totalProtectedUsd={totalProtectedUsd}
              onExecutionComplete={() => {
                confetti({ particleCount: 30, origin: { y: 0.8 }, colors: ['#a3ff00', '#00f0ff'] });
              }}
              onBlockIp={handleBlockPermanent}
              language={language}
            />
          )}

          {activeTab === 'ml_visualizer' && (
            <MLVisualizer
              logs={logs}
              threats={threats}
              safeLogs={safeLogs}
              contaminationRate={contaminationRate}
              setContaminationRate={setContaminationRate}
              onRetrain={handleRunEngine}
              executionTimeMs={executionTimeMs}
              anomalyThreshold={anomalyThreshold}
              language={language}
            />
          )}

          {activeTab === 'database' && (
            <LogsDatabase
              logs={logs}
              onSelectThreat={setSelectedThreat}
              onInjectCustomLog={handleInjectCustomLog}
              isStreaming={isStreaming}
              setIsStreaming={setIsStreaming}
              language={language}
            />
          )}

          {activeTab === 'code_guide' && (
            <CodeViewer onRunTerminal={() => setActiveTab('terminal')} language={language} />
          )}

          {activeTab === 'html_preview' && (
            <HtmlPreview threats={threats} totalProtectedUsd={totalProtectedUsd} language={language} />
          )}
        </div>

        {/* Mobile Bottom Navigation Bar (Visible only on < lg screens) */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#121215]/95 backdrop-blur-md border-t border-[#27272a] px-2 py-1.5 flex items-center justify-around shadow-lg">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg transition-colors cursor-pointer relative ${
              activeTab === 'dashboard'
                ? 'text-[#a3ff00]'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-[10px] font-medium leading-none">
              {language === 'ar' ? 'الرئيسية' : 'Overview'}
            </span>
            {threats.length > 0 && (
              <span className="absolute top-0 right-2 w-2 h-2 bg-[#ff3344] rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('terminal')}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'terminal'
                ? 'text-[#a3ff00]'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Terminal className="w-5 h-5" />
            <span className="text-[10px] font-medium leading-none">
              {language === 'ar' ? 'الطرفية' : 'Terminal'}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('checkout_simulator')}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg transition-colors cursor-pointer relative ${
              activeTab === 'checkout_simulator'
                ? 'text-[#a3ff00]'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <ShieldAlert className="w-5 h-5" />
            <span className="text-[10px] font-medium leading-none">
              {language === 'ar' ? 'المحاكي' : 'Simulator'}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('ml_visualizer')}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'ml_visualizer'
                ? 'text-[#a3ff00]'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Cpu className="w-5 h-5" />
            <span className="text-[10px] font-medium leading-none">
              {language === 'ar' ? 'الذكاء' : 'AI Models'}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'database'
                ? 'text-[#a3ff00]'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Database className="w-5 h-5" />
            <span className="text-[10px] font-medium leading-none">
              {language === 'ar' ? 'السجلات' : 'Logs'}
            </span>
          </button>
        </nav>
      </main>

      {/* Dynamic Toast Notifications */}
      <ToastNotifications
        toasts={toasts}
        onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))}
        onInspectThreat={(threat) => setSelectedThreat(threat)}
        language={language}
      />

      {/* Forensic Inspection Modal */}
      {selectedThreat && (
        <ThreatDetailModal
          threat={selectedThreat}
          onClose={() => setSelectedThreat(null)}
          onBlockPermanent={handleBlockPermanent}
          onWhitelist={handleWhitelist}
          language={language}
        />
      )}

      {/* Security Report Modal */}
      <SecurityReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        threats={threats}
        safeCount={safeLogs.length}
        totalProtectedUsd={totalProtectedUsd}
        contaminationRate={contaminationRate}
        language={language}
      />

      {/* Live Database Connector Modal */}
      <LiveDatabaseModal
        isOpen={isLiveDbModalOpen}
        onClose={() => setIsLiveDbModalOpen(false)}
        onConnectSuccess={handleConnectLiveDbSuccess}
        language={language}
      />
    </div>
  );
}
