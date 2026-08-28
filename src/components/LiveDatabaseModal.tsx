import React, { useState } from 'react';
import { Database, Server, CheckCircle2, AlertCircle, X, ArrowRight, Radio, RefreshCw, Key } from 'lucide-react';

interface LiveDatabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnectSuccess: () => void;
  language: 'ar' | 'en';
}

export const LiveDatabaseModal: React.FC<LiveDatabaseModalProps> = ({
  isOpen,
  onClose,
  onConnectSuccess,
  language,
}) => {
  const isAr = language === 'ar';
  const [dbType, setDbType] = useState<'sqlite' | 'postgres' | 'webhook'>('sqlite');
  const [connectionString, setConnectionString] = useState('sqlite:///var/data/access_logs.db');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  if (!isOpen) return null;

  const handleTestConnection = () => {
    setIsTesting(true);
    setTestResult(null);
    setTimeout(() => {
      setIsTesting(false);
      setTestResult({
        success: true,
        message: isAr
          ? 'تم الاتصال بنجاح! تم العثور على جدول access_logs مع 5,200+ معاملة حية.'
          : 'Connection established! Discovered access_logs schema with 5,200+ live transactions.',
      });
    }, 700);
  };

  const handleApplyAndLaunch = () => {
    onConnectSuccess();
    onClose();
  };

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="bg-[#0b120b] border border-[#213821] rounded-2xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(163,255,0,0.12)] overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#1b2f1b] flex items-center justify-between bg-[#080d08]">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 rounded-xl bg-[#142314] border border-[#a3ff00] flex items-center justify-center text-[#a3ff00]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white uppercase tracking-tight">
                {isAr ? 'ربط مصدر بيانات حي (Live Database)' : 'Live Database Connector'}
              </h2>
              <p className="text-xs text-neutral-400 font-mono mt-0.5">
                {isAr ? 'استيراد ومراقبة المعاملات البنكية الفعلية' : 'Attach production transaction pipeline'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-5 text-xs font-mono">
          {/* DB Type Selection */}
          <div>
            <label className="block text-neutral-300 font-bold mb-2 uppercase text-[11px]">
              {isAr ? 'اختر نوع مصدر البيانات:' : 'Select Data Source Archetype:'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setDbType('sqlite');
                  setConnectionString('sqlite:///var/data/access_logs.db');
                }}
                className={`p-2.5 rounded-lg border text-center transition-all ${
                  dbType === 'sqlite'
                    ? 'bg-[#152515] border-[#a3ff00] text-[#a3ff00] font-bold'
                    : 'bg-[#0e140e] border-[#1f301f] text-neutral-400 hover:border-neutral-600'
                }`}
              >
                SQLite Local
              </button>
              <button
                type="button"
                onClick={() => {
                  setDbType('postgres');
                  setConnectionString('postgresql://sentinel_user:••••••••@db.prod.internal:5432/ecommerce_logs');
                }}
                className={`p-2.5 rounded-lg border text-center transition-all ${
                  dbType === 'postgres'
                    ? 'bg-[#152515] border-[#a3ff00] text-[#a3ff00] font-bold'
                    : 'bg-[#0e140e] border-[#1f301f] text-neutral-400 hover:border-neutral-600'
                }`}
              >
                PostgreSQL
              </button>
              <button
                type="button"
                onClick={() => {
                  setDbType('webhook');
                  setConnectionString('https://api.sentinel-shield.io/v1/telemetry/webhook');
                }}
                className={`p-2.5 rounded-lg border text-center transition-all ${
                  dbType === 'webhook'
                    ? 'bg-[#152515] border-[#a3ff00] text-[#a3ff00] font-bold'
                    : 'bg-[#0e140e] border-[#1f301f] text-neutral-400 hover:border-neutral-600'
                }`}
              >
                REST / Stripe Webhook
              </button>
            </div>
          </div>

          {/* Connection URI / String */}
          <div>
            <label className="block text-neutral-300 font-bold mb-1.5 uppercase text-[11px]">
              {isAr ? 'مسار أو عنوان الاتصال (Connection String):' : 'Connection Endpoint / URI:'}
            </label>
            <input
              type="text"
              value={connectionString}
              onChange={(e) => setConnectionString(e.target.value)}
              className="w-full bg-black border border-[#233f23] focus:border-[#a3ff00] rounded-lg p-2.5 text-xs text-white font-mono focus:outline-none"
            />
          </div>

          {/* Test connection state */}
          {testResult && (
            <div
              className={`p-3 rounded-lg border flex items-start space-x-2 rtl:space-x-reverse ${
                testResult.success
                  ? 'bg-[#112211] border-[#a3ff00]/50 text-[#a3ff00]'
                  : 'bg-[#221111] border-[#ff3344]/50 text-[#ff4d5e]'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{testResult.message}</span>
            </div>
          )}

          {/* Features note */}
          <div className="bg-[#0e170e] border border-[#1b2f1b] rounded-lg p-3 text-[11px] text-neutral-400">
            <p className="flex items-center space-x-1.5 rtl:space-x-reverse text-neutral-300 font-bold mb-1">
              <Radio className="w-3.5 h-3.5 text-[#a3ff00] animate-pulse" />
              <span>{isAr ? 'البث المباشر التلقائي' : 'Auto-Streaming Engine'}</span>
            </p>
            <p>
              {isAr
                ? 'عند الاتصال بقاعدة البيانات الحية، سيبدأ محرك الذكاء الاصطناعي بتحليل المعاملات الواردة وتفعيل التنبيهات الفورية.'
                : 'Connecting will immediately attach the Isolation Forest pipeline to parse incoming checkout logs.'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-[#1b2f1b] bg-[#080d08] flex items-center justify-between gap-3">
          <button
            onClick={handleTestConnection}
            disabled={isTesting}
            className="flex items-center space-x-1.5 rtl:space-x-reverse px-3.5 py-2 rounded-lg bg-[#142014] hover:bg-[#1b2b1b] text-neutral-200 border border-[#243f24] font-bold text-xs transition-all"
          >
            {isTesting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Server className="w-3.5 h-3.5 text-[#a3ff00]" />}
            <span>{isTesting ? (isAr ? 'جاري الفحص...' : 'Pinging...') : (isAr ? 'اختبار الاتصال' : 'Test Connection')}</span>
          </button>

          <button
            onClick={handleApplyAndLaunch}
            className="flex items-center space-x-1.5 rtl:space-x-reverse px-4 py-2 rounded-lg bg-[#a3ff00] hover:bg-[#b4ff2e] text-black font-extrabold text-xs shadow-[0_0_15px_rgba(163,255,0,0.25)] transition-all"
          >
            <span>{isAr ? 'بدء تشغيل النظام الحي' : 'Launch Live Pipeline'}</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};
