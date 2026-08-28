import React from 'react';
import { AccessLog } from '../types';
import {
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Sliders,
  ChevronRight,
  Zap,
  Activity,
  Lock,
  Flame,
  Search,
  ExternalLink,
} from 'lucide-react';

interface SecurityDashboardProps {
  threats: AccessLog[];
  safeCount: number;
  totalProtectedUsd: number;
  contaminationRate: number;
  setContaminationRate: (rate: number) => void;
  onSelectThreat: (threat: AccessLog) => void;
  onInjectAttack: () => void;
  onRunEngine: () => void;
  language: 'en' | 'ar';
}

export const SecurityDashboard: React.FC<SecurityDashboardProps> = ({
  threats,
  safeCount,
  totalProtectedUsd,
  contaminationRate,
  setContaminationRate,
  onSelectThreat,
  onInjectAttack,
  onRunEngine,
  language,
}) => {
  const isAr = language === 'ar';
  const topThreats = threats.slice(0, 6);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8 pb-24 lg:pb-12 max-w-7xl mx-auto w-full">
      {/* Top Banner / Breadcrumb & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#27272a]">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100">
            {isAr ? 'لوحة المراقبة والحماية الفورية' : 'Security Sentinel Overview'}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            {isAr
              ? 'مراقبة هجمات الاحتيال وعزل السلوكيات الشاذة عبر خوارزمية Isolation Forest'
              : 'Real-time e-commerce fraud mitigation & anomaly detection engine'}
          </p>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#18181b] border border-[#27272a]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a3ff00] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a3ff00]" />
            </span>
            <span className="text-xs font-mono font-medium text-zinc-300">
              {isAr ? 'الدرع الأمني نشط' : 'Shield Active'}
            </span>
          </div>

          <button
            onClick={onRunEngine}
            className="px-3 py-1.5 rounded-lg bg-[#18181b] hover:bg-[#222227] text-zinc-200 border border-[#27272a] text-xs font-medium transition-colors cursor-pointer"
          >
            {isAr ? 'تحديث الفحص' : 'Refresh Telemetry'}
          </button>
        </div>
      </div>

      {/* 4-Stat Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Revenue Protected */}
        <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-6 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider font-mono">
              {isAr ? 'الأموال المحمية' : 'Revenue Protected'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#27272a] flex items-center justify-center text-[#a3ff00]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-zinc-100 font-mono tracking-tight">
            ${totalProtectedUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-zinc-500">
            {isAr ? 'إجمالي السلات الاحتيالية المحظورة' : 'Total intercepted fraudulent cart values'}
          </p>
        </div>

        {/* Metric 2: Blocked Threats */}
        <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-6 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider font-mono text-[#ff4d5e]">
              {isAr ? 'التهديدات المحظورة' : 'Blocked Threats'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#ff3344]/10 flex items-center justify-center text-[#ff3344]">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#ff4d5e] font-mono tracking-tight">
            {threats.length}
          </div>
          <p className="text-xs text-zinc-500">
            {isAr ? 'محاولات اختراق واختبار بطاقات' : 'Isolated card testing & bot probes'}
          </p>
        </div>

        {/* Metric 3: Safe Connections */}
        <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-6 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider font-mono text-zinc-300">
              {isAr ? 'المعاملات المعتمدة' : 'Safe Checkouts'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#27272a] flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-zinc-100 font-mono tracking-tight">
            {safeCount}
          </div>
          <p className="text-xs text-zinc-500">
            {isAr ? 'حركات شراء طبيعية 100%' : 'Legitimate verified customer sessions'}
          </p>
        </div>

        {/* Metric 4: Contamination Rate Slider */}
        <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-6 space-y-2 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-zinc-400 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider font-mono">
                {isAr ? 'نسبة الشوائب' : 'Contamination'}
              </span>
              <span className="text-xs font-mono font-bold text-[#a3ff00] bg-[#a3ff00]/10 px-2 py-0.5 rounded border border-[#a3ff00]/20">
                {(contaminationRate * 100).toFixed(0)}%
              </span>
            </div>
            <div className="text-xs text-zinc-500 mb-3">
              {isAr ? 'حساسية عزل الشذوذ' : 'Isolation tree sensitivity'}
            </div>
          </div>

          <input
            type="range"
            min="0.01"
            max="0.15"
            step="0.01"
            value={contaminationRate}
            onChange={(e) => setContaminationRate(parseFloat(e.target.value))}
            onMouseUp={onRunEngine}
            onTouchEnd={onRunEngine}
            className="w-full accent-[#a3ff00] cursor-pointer"
          />
        </div>
      </div>

      {/* Main 2-Column Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left/Main Column: Blocked Threats Forensic Feed (7 Cols) */}
        <div className="lg:col-span-7 bg-[#18181b] border border-[#27272a] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-[#27272a]">
            <div>
              <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-[#ff4d5e]" />
                <span>{isAr ? 'سجل التهديدات الأخيرة المكتشفة' : 'Recent Blocked Threats'}</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                {isAr ? 'انقر على أي تهديد لعرض التشريح الجنائي الكامل' : 'Select any incident to inspect packet heuristics'}
              </p>
            </div>
            <span className="text-xs font-mono text-zinc-400 bg-[#27272a] px-2.5 py-1 rounded-md">
              Top {topThreats.length}
            </span>
          </div>

          {topThreats.length === 0 ? (
            <div className="py-12 text-center text-zinc-500 text-xs font-mono border border-dashed border-[#27272a] rounded-xl">
              {isAr ? 'لا توجد تهديدات مسجلة حالياً.' : 'No anomalies detected yet. Run scan or inject test attack.'}
            </div>
          ) : (
            <div className="space-y-3">
              {topThreats.map((threat) => (
                <div
                  key={threat.id}
                  onClick={() => onSelectThreat(threat)}
                  className="group bg-[#121215] hover:bg-[#202024] border border-[#27272a] hover:border-[#3f3f46] rounded-xl p-4 flex items-center justify-between transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#ff3344]/10 text-[#ff4d5e] flex items-center justify-center font-mono text-xs font-bold shrink-0">
                      AI
                    </div>
                    <div>
                      <p className="font-mono text-sm font-bold text-zinc-100 group-hover:text-white">
                        {threat.ip_address}
                      </p>
                      <p className="text-xs text-zinc-500 flex items-center gap-1.5 mt-0.5">
                        <span>{threat.city || 'Frankfurt'}, {threat.country || 'DE'}</span>
                        <span>•</span>
                        <span className="font-mono">{threat.session_duration}s duration</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-right rtl:text-left">
                    <div>
                      <p className="font-mono text-sm font-bold text-zinc-200">
                        ${threat.cart_value_usd.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </p>
                      <p className="text-[11px] font-mono text-[#ff4d5e]">
                        {threat.payment_failures} Failures
                      </p>
                    </div>

                    <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-[#ff3344]/15 text-[#ff4d5e] border border-[#ff3344]/30">
                      BLOCKED
                    </span>

                    <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300 rtl:rotate-180 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: AI Model Mechanics & Quick Action Cards (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* AI Attack Archetypes Card */}
          <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#27272a]">
              <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#a3ff00]" />
                <span>{isAr ? 'أنماط التهديدات المعزولة آلياً' : 'Automated Botnet Profiles'}</span>
              </h3>
              <span className="text-[10px] font-mono text-zinc-400 bg-[#27272a] px-2 py-0.5 rounded">
                Isolation Forest
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-[#121215] border border-[#27272a] p-3.5 rounded-xl space-y-1">
                <div className="flex items-center justify-between font-bold text-zinc-200">
                  <span className="flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-[#ff4d5e]" />
                    <span>Card Testing & BIN Scraping</span>
                  </span>
                  <span className="font-mono text-[#ff4d5e]">20-100 Failures</span>
                </div>
                <p className="text-zinc-400 text-[11px] leading-relaxed">
                  {isAr
                    ? 'هجمات محاولة تفريغ وسرقة أرصدة عبر تجربة آلاف البطاقات في بوابات الدفع بسرعة قصوى.'
                    : 'Automated carding bots enumerating stolen credit card bins with high failure frequency.'}
                </p>
              </div>

              <div className="bg-[#121215] border border-[#27272a] p-3.5 rounded-xl space-y-1">
                <div className="flex items-center justify-between font-bold text-zinc-200">
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#a3ff00]" />
                    <span>High-Speed Checkout Sniper</span>
                  </span>
                  <span className="font-mono text-[#a3ff00]">&lt; 10s Duration</span>
                </div>
                <p className="text-zinc-400 text-[11px] leading-relaxed">
                  {isAr
                    ? 'متصفحات خفية (Headless) تقوم بإنهاء إجراءات الشراء بمبالغ تفوق $3,000 في ثوانٍ معدودة.'
                    : 'Headless automation executing instantaneous high-dollar cart checkouts bypassing normal browsing.'}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Simulation Trigger */}
          <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-zinc-100">
                  {isAr ? 'اختبار استجابة النظام الفورية' : 'Live System Stress Test'}
                </h4>
                <p className="text-xs text-zinc-400 mt-0.5">
                  {isAr ? 'حقن هجمة بوت مفاجئة لمعاينة التنبيه التلقائي' : 'Inject a sudden high-velocity bot wave'}
                </p>
              </div>
            </div>

            <button
              onClick={onInjectAttack}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#27272a] hover:bg-[#323236] text-zinc-200 hover:text-white border border-[#3f3f46] text-xs font-semibold transition-colors cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4 text-[#ff4d5e]" />
              <span>{isAr ? 'حقن هجمة بوت تجريبية' : 'Inject Simulated Bot Probe'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
