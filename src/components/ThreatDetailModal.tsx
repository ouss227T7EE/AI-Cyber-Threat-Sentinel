import React, { useState } from 'react';
import { AccessLog } from '../types';
import {
  ShieldAlert,
  X,
  Flame,
  MapPin,
  Clock,
  DollarSign,
  AlertTriangle,
  ShieldCheck,
  Copy,
  Check,
} from 'lucide-react';

interface ThreatDetailModalProps {
  threat: AccessLog | null;
  onClose: () => void;
  onBlockPermanent: (ip: string) => void;
  onWhitelist: (ip: string) => void;
  language: 'en' | 'ar';
}

export const ThreatDetailModal: React.FC<ThreatDetailModalProps> = ({
  threat,
  onClose,
  onBlockPermanent,
  onWhitelist,
  language,
}) => {
  if (!threat) return null;
  const isAr = language === 'ar';
  const [copied, setCopied] = useState(false);

  const handleCopyIp = () => {
    navigator.clipboard.writeText(threat.ip_address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="bg-[#18181b] border border-[#27272a] rounded-2xl max-w-lg w-full p-5 sm:p-7 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#27272a]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ff3344]/15 border border-[#ff3344]/30 flex items-center justify-center text-[#ff3344]">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-zinc-100 font-mono">{threat.ip_address}</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#ff3344]/15 text-[#ff4d5e] border border-[#ff3344]/30 font-mono">
                  BLOCKED
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">
                {threat.city || 'Frankfurt'}, {threat.country || 'DE'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#121215] text-zinc-400 hover:text-white flex items-center justify-center border border-[#27272a] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Telemetry Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs font-mono">
          <div className="bg-[#121215] border border-[#27272a] rounded-xl p-3 space-y-1">
            <span className="text-zinc-500">{isAr ? 'قيمة السلة' : 'Cart Value'}</span>
            <div className="text-base font-bold text-zinc-100">${threat.cart_value_usd.toFixed(2)}</div>
          </div>

          <div className="bg-[#121215] border border-[#27272a] rounded-xl p-3 space-y-1">
            <span className="text-zinc-500">{isAr ? 'أخطاء الدفع' : 'Payment Failures'}</span>
            <div className="text-base font-bold text-[#ff4d5e]">{threat.payment_failures} Failures</div>
          </div>

          <div className="bg-[#121215] border border-[#27272a] rounded-xl p-3 space-y-1">
            <span className="text-zinc-500">{isAr ? 'مدة الجلسة' : 'Session Duration'}</span>
            <div className="text-base font-bold text-zinc-100">{threat.session_duration}s</div>
          </div>

          <div className="bg-[#121215] border border-[#27272a] rounded-xl p-3 space-y-1">
            <span className="text-zinc-500">{isAr ? 'درجة الشذوذ (Score)' : 'Anomaly Score'}</span>
            <div className="text-base font-bold text-[#a3ff00]">
              {(threat.anomaly_score ?? 0.94).toFixed(3)}
            </div>
          </div>
        </div>

        {/* Heuristic Threat Analysis */}
        <div className="bg-[#121215] border border-[#27272a] rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-300">
            <Flame className="w-4 h-4 text-[#ff4d5e]" />
            <span>{isAr ? 'التقرير الجنائي التلقائي' : 'Forensic Signature Heuristics'}</span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            {isAr
              ? `تم عزل هذا الطلب فوراً بواسطة خوارزمية Isolation Forest بنسبة تطابق خطورة تبلغ ${((threat.anomaly_score ?? 0.94) * 100).toFixed(1)}%. تشير كثافة أخطاء الدفع وقصر مدة الجلسة إلى روبوت آلي لاختبار البطاقات المسروقة.`
              : `This transaction was isolated with a high risk score of ${((threat.anomaly_score ?? 0.94) * 100).toFixed(1)}%. Rapid sub-second checkout attempt with repetitive payment gateway errors matches automated BIN testing patterns.`}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-2 pt-2 border-t border-[#27272a]">
          <button
            onClick={handleCopyIp}
            className="w-full sm:flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#121215] hover:bg-[#202024] text-zinc-300 border border-[#27272a] text-xs font-medium transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#a3ff00]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? (isAr ? 'تم نسخ الـ IP' : 'Copied IP') : isAr ? 'نسخ عنوان الـ IP' : 'Copy IP Address'}</span>
          </button>

          <button
            onClick={() => {
              onBlockPermanent(threat.ip_address);
              onClose();
            }}
            className="w-full sm:flex-1 py-2.5 px-3 rounded-xl bg-[#ff3344] hover:bg-[#e62939] text-white text-xs font-bold transition-colors cursor-pointer text-center"
          >
            {isAr ? 'حظر دائم في الجدار الناري' : 'Permanent Firewall Block'}
          </button>
        </div>
      </div>
    </div>
  );
};
