import React, { useState } from 'react';
import {
  Database,
  Play,
  Cpu,
  Lock,
  Radio,
  CheckCircle2,
  ChevronRight,
  RefreshCw,
  Globe,
  ShieldCheck,
  Activity,
} from 'lucide-react';

interface StandbyScreenProps {
  onLaunchDemo: () => void;
  onConnectLiveDb: () => void;
  language: 'ar' | 'en';
  setLanguage: (lang: 'ar' | 'en') => void;
}

export const StandbyScreen: React.FC<StandbyScreenProps> = ({
  onLaunchDemo,
  onConnectLiveDb,
  language,
  setLanguage,
}) => {
  const isAr = language === 'ar';
  const [isAttemptingLive, setIsAttemptingLive] = useState(false);
  const [probeStep, setProbeStep] = useState<string>('');

  const handleConnectLiveClick = () => {
    setIsAttemptingLive(true);
    setProbeStep(
      isAr
        ? 'جاري الاتصال والمصادقة بقاعدة البيانات...'
        : 'Connecting and authenticating with live database socket...'
    );

    setTimeout(() => {
      setProbeStep(
        isAr
          ? 'تم التحقق من بروتوكول TLS وتجهيز خط أنابيب المعاملات...'
          : 'TLS handshake verified. Attaching transaction pipeline...'
      );
    }, 700);

    setTimeout(() => {
      setIsAttemptingLive(false);
      onConnectLiveDb();
    }, 1400);
  };

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col items-center justify-center p-4 sm:p-6 relative select-none font-sans"
    >
      {/* Language Toggle Top Corner */}
      <div className="absolute top-6 right-6 z-20">
        <button
          id="standby-lang-toggle"
          onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
          className="px-3 py-1.5 rounded-xl text-xs font-mono font-medium bg-[#18181b] hover:bg-[#202024] text-zinc-300 border border-[#27272a] transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Globe className="w-3.5 h-3.5 text-zinc-400" />
          <span>{isAr ? 'English' : 'عربي'}</span>
        </button>
      </div>

      {/* Main Standby Central Container */}
      <div className="w-full max-w-xl relative z-10">
        <div className="bg-[#18181b] border border-[#27272a] rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#27272a] border border-[#3f3f46] flex items-center justify-center text-[#a3ff00]">
              <Activity className="w-6 h-6" />
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-100 uppercase">
                AI SENTINEL
              </h1>
              <p className="text-xs text-zinc-400 font-mono mt-1">
                ENTERPRISE CYBER THREAT DEFENSE & FRAUD SHIELD
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121215] border border-[#27272a] text-zinc-300 text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>{isAr ? 'بانتظار تهيئة الجلسة' : 'Awaiting Session Initialization'}</span>
            </div>
          </div>

          {/* Readiness Checklist */}
          <div className="bg-[#121215] border border-[#27272a] rounded-2xl p-4 sm:p-5 text-xs font-mono space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#27272a] text-zinc-400">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#a3ff00]" />
                <span>{isAr ? 'فحص جاهزية النظام' : 'Subsystems Readiness'}</span>
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                READY
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Isolation Forest: Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Firewall Rule Engine: Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Cart Payload Inspector: Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Threat Stream Dispatcher: Ready</span>
              </div>
            </div>
          </div>

          {/* Connection Progress */}
          {isAttemptingLive && (
            <div className="p-4 rounded-xl bg-[#121215] border border-[#a3ff00]/40 text-xs font-mono space-y-1.5 animate-in fade-in">
              <div className="flex items-center gap-2 text-[#a3ff00] font-bold">
                <RefreshCw className="w-4 h-4 animate-spin shrink-0" />
                <span>{isAr ? 'جاري الاتصال بقاعدة البيانات...' : 'Connecting to Live DB...'}</span>
              </div>
              <p className="text-zinc-400">{probeStep}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            {/* Launch Demo Button */}
            <button
              id="standby-launch-demo-btn"
              onClick={onLaunchDemo}
              disabled={isAttemptingLive}
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-[#a3ff00] hover:bg-[#b8ff33] text-black font-extrabold transition-all cursor-pointer shadow-sm active:scale-[0.99]"
            >
              <div className="flex items-center gap-3 text-left rtl:text-right">
                <div className="w-10 h-10 rounded-xl bg-black/10 flex items-center justify-center text-black">
                  <Play className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <p className="text-sm font-bold leading-tight">
                    {isAr ? 'تهيئة بيئة العرض التجريبية' : 'Launch Synthetic Demo Environment'}
                  </p>
                  <p className="text-xs font-medium text-black/70 mt-0.5">
                    {isAr ? 'توليد 500+ سجل تجريبي وبدء المراقبة الحية' : 'Load 500+ synthetic transaction records & enter live view'}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 rtl:rotate-180 text-black/80" />
            </button>

            {/* Connect Live DB Button */}
            <button
              id="standby-live-db-btn"
              onClick={handleConnectLiveClick}
              disabled={isAttemptingLive}
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-[#121215] hover:bg-[#202024] text-zinc-200 border border-[#27272a] hover:border-[#3f3f46] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3 text-left rtl:text-right">
                <div className="w-10 h-10 rounded-xl bg-[#18181b] border border-[#27272a] flex items-center justify-center text-zinc-300">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-zinc-100">
                    {isAr ? 'ربط بقاعدة بيانات حية (Live Database)' : 'Connect to Live Database Socket'}
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {isAr ? 'الاتصال المباشر بجداول المعاملات' : 'Attach production transaction event stream'}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 rtl:rotate-180 text-zinc-500" />
            </button>
          </div>

          {/* Footer Note */}
          <div className="pt-2 border-t border-[#27272a] flex items-center justify-between text-[11px] text-zinc-500 font-mono">
            <div className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-zinc-400" />
              <span>TLS 1.3 / AES-256</span>
            </div>
            <span>v2.4 LTS</span>
          </div>

        </div>
      </div>
    </div>
  );
};
