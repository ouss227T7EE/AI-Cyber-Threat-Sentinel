import React, { useState } from 'react';
import {
  Activity,
  Bot,
  UserCheck,
  Zap,
  Radio,
  ShieldAlert,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Sliders,
  Flame,
  Send,
  RefreshCw,
  Layers,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';
import { AccessLog } from '../types';

export type TrafficIndicatorState = 'idle' | 'safe' | 'threat';

export interface TrafficSimulatorSidebarProps {
  onSimulateNormalBuyer: (customPayload?: Partial<AccessLog>) => void;
  onSimulateBotAttack: (customPayload?: Partial<AccessLog>) => void;
  onSimulateBurstAttack?: (count: number) => void;
  totalProtectedUsd: number;
  totalThreats: number;
  safeCount: number;
  trafficIndicatorState: TrafficIndicatorState;
  lastSimulatedLog?: AccessLog | null;
  language: 'ar' | 'en';
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export const TrafficSimulatorSidebar: React.FC<TrafficSimulatorSidebarProps> = ({
  onSimulateNormalBuyer,
  onSimulateBotAttack,
  onSimulateBurstAttack,
  totalProtectedUsd,
  totalThreats,
  safeCount,
  trafficIndicatorState,
  lastSimulatedLog,
  language,
  isCollapsed,
  setIsCollapsed,
}) => {
  const isAr = language === 'ar';

  // Custom injector states
  const [showCustomBuilder, setShowCustomBuilder] = useState(false);
  const [customIp, setCustomIp] = useState('');
  const [customCart, setCustomCart] = useState<number>(120);
  const [customDuration, setCustomDuration] = useState<number>(180);
  const [customFailures, setCustomFailures] = useState<number>(0);
  const [recentSimulations, setRecentSimulations] = useState<
    { id: string; ip: string; isThreat: boolean; cart: number; time: string }[]
  >([]);

  // Wrap button clicks to keep mini event history inside sidebar
  const handleNormalClick = (payload?: Partial<AccessLog>) => {
    const cart = payload?.cart_value_usd ?? 120.0;
    const ip = payload?.ip_address ?? `192.168.1.${Math.floor(Math.random() * 200) + 10}`;
    setRecentSimulations((prev) => [
      {
        id: Math.random().toString(),
        ip,
        isThreat: false,
        cart,
        time: new Date().toLocaleTimeString(),
      },
      ...prev.slice(0, 4),
    ]);
    onSimulateNormalBuyer(payload);
  };

  const handleBotClick = (payload?: Partial<AccessLog>) => {
    const cart = payload?.cart_value_usd ?? 4500.0;
    const ip = payload?.ip_address ?? `185.220.${Math.floor(Math.random() * 100) + 101}.${Math.floor(Math.random() * 250) + 1}`;
    setRecentSimulations((prev) => [
      {
        id: Math.random().toString(),
        ip,
        isThreat: true,
        cart,
        time: new Date().toLocaleTimeString(),
      },
      ...prev.slice(0, 4),
    ]);
    onSimulateBotAttack(payload);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isThreat = customFailures >= 5 || customDuration < 15 || customCart > 2500;
    const ip = customIp.trim() || (isThreat ? '185.220.101.99' : '192.168.1.120');

    const payload: Partial<AccessLog> = {
      ip_address: ip,
      cart_value_usd: customCart,
      session_duration: customDuration,
      payment_failures: customFailures,
    };

    if (isThreat) {
      handleBotClick(payload);
    } else {
      handleNormalClick(payload);
    }
  };

  // If sidebar is collapsed, render minimal icon rail
  if (isCollapsed) {
    return (
      <aside
        aria-label="Traffic Simulator Collapsed"
        className="w-14 shrink-0 bg-[#050505] border-r rtl:border-r-0 rtl:border-l border-[#1f2e1f] flex flex-col items-center py-4 space-y-4 select-none z-30 transition-all duration-300"
      >
        <button
          onClick={() => setIsCollapsed(false)}
          className="p-2 rounded-lg bg-[#0c160c] hover:bg-[#142614] text-[#a3ff00] border border-[#1f3a1f] transition-all cursor-pointer shadow-[0_0_10px_rgba(163,255,0,0.15)]"
          title={isAr ? 'توسيع محاكي الزيارات' : 'Expand Traffic Simulator'}
        >
          {isAr ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>

        {/* Traffic Beacon Icon */}
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
            trafficIndicatorState === 'threat'
              ? 'bg-[#ff3344]/20 border-2 border-[#ff3344] text-[#ff3344] shadow-[0_0_15px_rgba(255,51,68,0.7)] animate-pulse'
              : trafficIndicatorState === 'safe'
              ? 'bg-[#10b981]/20 border-2 border-[#10b981] text-[#34d399] shadow-[0_0_15px_rgba(16,185,129,0.7)] animate-pulse'
              : 'bg-[#0f170f] border border-[#1f2e1f] text-neutral-400'
          }`}
          title={isAr ? 'مؤشر حركة المرور' : 'Traffic Indicator'}
        >
          <Radio className="w-4 h-4" />
        </div>

        <div className="w-8 h-px bg-[#1f2e1f]" />

        {/* Quick Action A - Safe */}
        <button
          onClick={() => handleNormalClick()}
          className="w-9 h-9 rounded-xl bg-[#091a13] hover:bg-[#0e291e] border border-[#10b981]/60 text-[#34d399] flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.2)] transition-transform hover:scale-105 cursor-pointer"
          title={isAr ? 'محاكاة مشتري حقيقي' : 'Simulate Normal Buyer'}
        >
          <UserCheck className="w-4 h-4" />
        </button>

        {/* Quick Action B - Attack */}
        <button
          onClick={() => handleBotClick()}
          className="w-9 h-9 rounded-xl bg-[#200a0d] hover:bg-[#301014] border border-[#ff3344]/80 text-[#ff4d5e] flex items-center justify-center shadow-[0_0_12px_rgba(255,51,68,0.3)] transition-transform hover:scale-105 cursor-pointer"
          title={isAr ? 'محاكاة هجوم بوت' : 'Simulate Bot Attack'}
        >
          <Bot className="w-4 h-4" />
        </button>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Traffic Simulator Panel"
      className="w-72 sm:w-80 shrink-0 bg-[#050505] border-r rtl:border-r-0 rtl:border-l border-[#1f2e1f] flex flex-col h-[calc(100vh-4rem)] sticky top-16 z-30 transition-all duration-300 font-sans select-none overflow-y-auto scrollbar-thin scrollbar-thumb-[#1f2e1f] scrollbar-track-transparent"
    >
      {/* Sidebar Top Header */}
      <div className="p-4 border-b border-[#1f2e1f] bg-[#070b07] flex items-center justify-between">
        <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
          <div className="w-8 h-8 rounded-lg bg-[#112211] border border-[#1f3a1f] flex items-center justify-center text-[#a3ff00] shadow-[0_0_10px_rgba(163,255,0,0.2)]">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-black text-white tracking-wide uppercase">
              {isAr ? 'محاكي الزيارات' : 'Traffic Simulator'}
            </h2>
            <p className="text-[10px] text-neutral-400 font-mono">
              {isAr ? 'حقن المعاملات الحية والتأثير' : 'Live Packet Injection Core'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsCollapsed(true)}
          className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-[#111e11] border border-transparent hover:border-[#1f2e1f] transition-all cursor-pointer"
          title={isAr ? 'طي الشريط الجانبي' : 'Collapse Sidebar'}
        >
          {isAr ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      <div className="p-4 space-y-4 flex-1">
        {/* Requirement 3: Live Traffic Indicator (مؤشر حركة المرور الحية) */}
        <div
          id="traffic-live-indicator"
          className={`p-3 rounded-xl border transition-all duration-300 relative overflow-hidden ${
            trafficIndicatorState === 'threat'
              ? 'bg-[#1f0a0c] border-[#ff3344] shadow-[0_0_20px_rgba(255,51,68,0.35)] ring-1 ring-[#ff3344]'
              : trafficIndicatorState === 'safe'
              ? 'bg-[#081810] border-[#10b981] shadow-[0_0_20px_rgba(16,185,129,0.3)] ring-1 ring-[#10b981]'
              : 'bg-[#090e09] border-[#1f2e1f]'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    trafficIndicatorState === 'threat'
                      ? 'bg-[#ff3344]'
                      : trafficIndicatorState === 'safe'
                      ? 'bg-[#10b981]'
                      : 'bg-[#a3ff00]'
                  }`}
                />
                <span
                  className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                    trafficIndicatorState === 'threat'
                      ? 'bg-[#ff3344]'
                      : trafficIndicatorState === 'safe'
                      ? 'bg-[#10b981]'
                      : 'bg-[#a3ff00]'
                  }`}
                />
              </span>
              <span className="text-xs font-bold font-mono tracking-wider uppercase text-white">
                {isAr ? 'مؤشر حركة المرور الحية' : 'Live Traffic Indicator'}
              </span>
            </div>

            <span
              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                trafficIndicatorState === 'threat'
                  ? 'bg-[#ff3344]/20 text-[#ff4d5e] border-[#ff3344]/50'
                  : trafficIndicatorState === 'safe'
                  ? 'bg-[#10b981]/20 text-[#34d399] border-[#10b981]/50'
                  : 'bg-[#142314] text-[#a3ff00] border-[#223d22]'
              }`}
            >
              {trafficIndicatorState === 'threat'
                ? isAr
                  ? 'تم كشف هجوم'
                  : 'ATTACK DETECTED'
                : trafficIndicatorState === 'safe'
                ? isAr
                  ? 'زيارة آمنة'
                  : 'SAFE TRAFFIC'
                : isAr
                ? 'جاهز للاستقبال'
                : 'IDLE / LISTENING'}
            </span>
          </div>

          {/* Real-time telemetry feedback strip */}
          <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-300">
            <span className="text-neutral-400">{isAr ? 'آخر حزمة تم فحصها:' : 'Last Injected Packet:'}</span>
            <span className="font-semibold text-white">
              {lastSimulatedLog ? lastSimulatedLog.ip_address : '192.168.1.45'}
            </span>
          </div>
        </div>

        {/* Section Title */}
        <div className="flex items-center justify-between text-xs font-bold text-neutral-400 font-mono">
          <span className="uppercase">{isAr ? 'أزرار محاكاة الحركة' : 'Simulation Controls'}</span>
          <span className="text-[#a3ff00]">{isAr ? 'حقن فوري' : 'Instant Inject'}</span>
        </div>

        {/* Requirement 2 - Action A: Normal Buyer Simulation (محاكاة مشتري حقيقي) */}
        <button
          id="simulator-action-a-btn"
          onClick={() => handleNormalClick()}
          className="w-full group text-left rtl:text-right p-3.5 rounded-xl bg-gradient-to-r from-[#071610] via-[#091a13] to-[#040e0a] border-2 border-[#10b981]/70 hover:border-[#10b981] text-white shadow-[0_4px_20px_rgba(16,185,129,0.15)] hover:shadow-[0_4px_25px_rgba(16,185,129,0.3)] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#10b981]/20 border border-[#10b981]/80 flex items-center justify-center text-[#34d399] shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(16,185,129,0.35)]">
              <UserCheck className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
                <span className="text-xs font-extrabold text-[#34d399] uppercase tracking-wider">
                  {isAr ? 'إجراء A' : 'Action A'}
                </span>
                <span className="text-[10px] bg-[#10b981]/20 text-[#34d399] px-1.5 py-0.2 rounded font-mono font-bold">
                  SAFE (0 Failures)
                </span>
              </div>
              <h3 className="text-sm font-extrabold text-white mt-0.5 leading-snug">
                {isAr ? 'محاكاة مشتري حقيقي' : 'Normal Buyer Simulation'}
              </h3>
              <p className="text-[11px] text-neutral-300 font-mono mt-1 leading-normal">
                {isAr
                  ? 'مدة 300 ثانية • سلة $120 • 0 فشل دفع'
                  : 'Duration 300s • Cart $120 • 0 Failures'}
              </p>
            </div>
          </div>
        </button>

        {/* Requirement 2 - Action B: Bot/Hacker Attack (محاكاة هجوم بوت) */}
        <button
          id="simulator-action-b-btn"
          onClick={() => handleBotClick()}
          className="w-full group text-left rtl:text-right p-3.5 rounded-xl bg-gradient-to-r from-[#1c080a] via-[#140608] to-[#0c0304] border-2 border-[#ff3344] hover:border-[#ff4d5e] text-white shadow-[0_4px_25px_rgba(255,51,68,0.25)] hover:shadow-[0_6px_30px_rgba(255,51,68,0.45)] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ring-1 ring-[#ff3344]/40"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#ff3344]/20 border border-[#ff3344] flex items-center justify-center text-[#ff4d5e] shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,51,68,0.5)] animate-pulse">
              <Bot className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
                <span className="text-xs font-extrabold text-[#ff4d5e] uppercase tracking-wider">
                  {isAr ? 'إجراء B' : 'Action B'}
                </span>
                <span className="text-[10px] bg-[#ff3344]/25 text-[#ff4d5e] px-1.5 py-0.2 rounded font-mono font-bold">
                  HIGH THREAT
                </span>
              </div>
              <h3 className="text-sm font-extrabold text-white mt-0.5 leading-snug">
                {isAr ? 'محاكاة هجوم بوت' : 'Bot/Hacker Attack'}
              </h3>
              <p className="text-[11px] text-[#ff8892] font-mono mt-1 leading-normal font-semibold">
                {isAr
                  ? 'مدة 2 ثانية • سلة $4500 • 50 فشل دفع'
                  : 'Duration 2s • Cart $4,500 • 50 Failures'}
              </p>
            </div>
          </div>
        </button>

        {/* Quick Attack Presets */}
        <div className="pt-1 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
            <span className="flex items-center space-x-1 rtl:space-x-reverse">
              <Flame className="w-3.5 h-3.5 text-[#ff8800]" />
              <span>{isAr ? 'سيناريوهات سريعة إضافية:' : 'Quick Attack Presets:'}</span>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* VIP High Roller Safe */}
            <button
              onClick={() =>
                handleNormalClick({
                  cart_value_usd: 890,
                  session_duration: 420,
                  payment_failures: 0,
                  city: 'Riyadh',
                  country: 'SA',
                })
              }
              className="p-2 rounded-lg bg-[#0b1610] hover:bg-[#12241b] border border-[#1b3824] text-left rtl:text-right transition-all cursor-pointer"
            >
              <div className="flex items-center space-x-1 rtl:space-x-reverse text-[10px] font-bold text-[#a3ff00]">
                <Sparkles className="w-3 h-3" />
                <span>{isAr ? 'مشتري VIP كبير' : 'VIP Shopper'}</span>
              </div>
              <p className="text-[10px] text-neutral-400 font-mono mt-0.5">$890 • 0 Fail</p>
            </button>

            {/* Burst Attack 3x */}
            <button
              onClick={() => {
                if (onSimulateBurstAttack) {
                  onSimulateBurstAttack(3);
                } else {
                  handleBotClick();
                  setTimeout(() => handleBotClick(), 200);
                  setTimeout(() => handleBotClick(), 400);
                }
              }}
              className="p-2 rounded-lg bg-[#1c0a0c] hover:bg-[#2a0f12] border border-[#44181c] text-left rtl:text-right transition-all cursor-pointer"
            >
              <div className="flex items-center space-x-1 rtl:space-x-reverse text-[10px] font-bold text-[#ff4d5e]">
                <Zap className="w-3 h-3" />
                <span>{isAr ? 'موجة بوتات (3x)' : 'Burst Wave (3x)'}</span>
              </div>
              <p className="text-[10px] text-neutral-400 font-mono mt-0.5">Rapid Attacks</p>
            </button>
          </div>
        </div>

        {/* Collapsible Custom Packet Injector Form */}
        <div className="pt-2 border-t border-[#1f2e1f]">
          <button
            onClick={() => setShowCustomBuilder(!showCustomBuilder)}
            className="w-full flex items-center justify-between text-xs font-mono text-neutral-300 hover:text-white p-2 rounded-lg bg-[#090f09] border border-[#192b19] transition-all cursor-pointer"
          >
            <span className="flex items-center space-x-1.5 rtl:space-x-reverse">
              <Sliders className="w-3.5 h-3.5 text-[#a3ff00]" />
              <span className="font-bold">{isAr ? 'مُنشئ حزم مخصص (Custom)' : 'Custom Packet Builder'}</span>
            </span>
            <span className="text-[10px] text-[#a3ff00] font-bold">
              {showCustomBuilder ? (isAr ? 'إغلاق' : 'Close') : isAr ? 'تخصيص' : 'Open'}
            </span>
          </button>

          {showCustomBuilder && (
            <form onSubmit={handleCustomSubmit} className="mt-3 p-3 bg-[#080d08] border border-[#1b2f1b] rounded-xl space-y-2.5 text-xs font-mono">
              <div>
                <label className="text-[10px] text-neutral-400 block mb-1">{isAr ? 'عنوان IP:' : 'Target IP:'}</label>
                <input
                  type="text"
                  value={customIp}
                  onChange={(e) => setCustomIp(e.target.value)}
                  placeholder="185.220.101.44"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-[#040704] border border-[#203720] text-white text-xs focus:outline-none focus:border-[#a3ff00]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-neutral-400 block mb-1">{isAr ? 'قيمة السلة ($):' : 'Cart USD ($):'}</label>
                  <input
                    type="number"
                    value={customCart}
                    onChange={(e) => setCustomCart(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-[#040704] border border-[#203720] text-white text-xs focus:outline-none focus:border-[#a3ff00]"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-neutral-400 block mb-1">{isAr ? 'فشل الدفع:' : 'Failures:'}</label>
                  <input
                    type="number"
                    value={customFailures}
                    onChange={(e) => setCustomFailures(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-[#040704] border border-[#203720] text-white text-xs focus:outline-none focus:border-[#a3ff00]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-neutral-400 block mb-1">{isAr ? 'مدة الجلسة (ثانية):' : 'Duration (sec):'}</label>
                <input
                  type="number"
                  value={customDuration}
                  onChange={(e) => setCustomDuration(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-[#040704] border border-[#203720] text-white text-xs focus:outline-none focus:border-[#a3ff00]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-1.5 rounded-lg bg-[#a3ff00] hover:bg-[#b8ff33] text-black font-extrabold text-xs flex items-center justify-center space-x-1.5 rtl:space-x-reverse transition-all cursor-pointer shadow-[0_0_10px_rgba(163,255,0,0.2)]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isAr ? 'حقن الحزمة المخصصة' : 'Inject Custom Packet'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Mini Real-Time Activity Log */}
        {recentSimulations.length > 0 && (
          <div className="pt-2 border-t border-[#1f2e1f] space-y-1.5">
            <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider flex items-center justify-between">
              <span>{isAr ? 'سجل المحاكاة الأخير:' : 'Recent Simulator Feed:'}</span>
              <span className="text-[#a3ff00]">{recentSimulations.length}</span>
            </div>

            <div className="space-y-1">
              {recentSimulations.map((sim) => (
                <div
                  key={sim.id}
                  className={`p-1.5 rounded-lg text-[10px] font-mono flex items-center justify-between border ${
                    sim.isThreat
                      ? 'bg-[#1c080a] border-[#44181c] text-[#ff8892]'
                      : 'bg-[#08150d] border-[#15331f] text-[#6ee7b7]'
                  }`}
                >
                  <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
                    {sim.isThreat ? (
                      <ShieldAlert className="w-3 h-3 text-[#ff3344] shrink-0" />
                    ) : (
                      <ShieldCheck className="w-3 h-3 text-[#10b981] shrink-0" />
                    )}
                    <span className="font-semibold text-white">{sim.ip}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 rtl:space-x-reverse text-neutral-400">
                    <span>${sim.cart.toFixed(0)}</span>
                    <span>•</span>
                    <span>{sim.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sidebar Footer Metrics */}
      <div className="p-3 border-t border-[#1f2e1f] bg-[#070b07] text-[11px] font-mono space-y-1">
        <div className="flex items-center justify-between text-neutral-400">
          <span>{isAr ? 'الأموال المحمية:' : 'Revenue Protected:'}</span>
          <span className="text-[#a3ff00] font-bold">
            ${totalProtectedUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
        <div className="flex items-center justify-between text-neutral-400">
          <span>{isAr ? 'التهديدات المحظورة:' : 'Blocked Threats:'}</span>
          <span className="text-[#ff4d5e] font-bold">{totalThreats}</span>
        </div>
      </div>
    </aside>
  );
};
