import React from 'react';
import { ShieldAlert, X, Bot, ShieldCheck } from 'lucide-react';
import { ThreatToast, AccessLog } from '../types';

interface ToastNotificationsProps {
  toasts: ThreatToast[];
  onDismiss: (id: string) => void;
  onInspectThreat: (threat: AccessLog) => void;
  language: 'ar' | 'en';
}

export const ToastNotifications: React.FC<ToastNotificationsProps> = ({
  toasts,
  onDismiss,
  onInspectThreat,
  language,
}) => {
  const isAr = language === 'ar';

  if (toasts.length === 0) return null;

  return (
    <aside
      aria-label="Threat Notifications"
      className="fixed bottom-16 md:bottom-6 left-0 right-0 md:left-auto md:right-6 z-50 flex flex-col-reverse items-center md:items-end gap-2.5 pointer-events-none px-3 sm:px-4 md:px-0"
    >
      {toasts.map((toast) => {
        const isSafe = toast.type === 'safe';
        const { threat } = toast;

        if (isSafe || !threat) {
          return (
            <div
              key={toast.id}
              id={`toast-${toast.id}`}
              className="pointer-events-auto group w-[90vw] max-w-sm md:max-w-md mx-auto md:mx-0 bg-gradient-to-r from-[#06140e] via-[#091a13] to-[#040e0a] border border-[#10b981]/60 sm:border-2 sm:border-[#10b981]/70 hover:border-[#10b981] rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 shadow-[0_10px_25px_rgba(0,0,0,0.6),0_0_20px_rgba(16,185,129,0.2)] relative overflow-hidden transition-all duration-200 animate-in slide-in-from-bottom-3 fade-in duration-200"
            >
              {/* 3-second progress timer bar */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#10b981] origin-left animate-[shrink_3s_linear_forwards]"
                style={{ animationDuration: '3000ms' }}
              />

              <div className="flex items-center sm:items-start justify-between gap-2.5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-lg bg-[#10b981]/20 border border-[#10b981] flex items-center justify-center text-[#34d399] shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#34d399]" />
                </div>

                <div className="flex-1 min-w-0 text-xs">
                  <p className="font-bold sm:font-extrabold text-white text-xs sm:text-sm leading-snug tracking-tight truncate sm:whitespace-normal">
                    {toast.message}
                  </p>
                  {threat && (
                    <div className="mt-0.5 sm:mt-1 flex items-center flex-wrap gap-1 sm:gap-1.5 text-[10px] text-neutral-400 font-mono">
                      <span className="bg-[#10b981]/20 text-[#34d399] px-1 sm:px-1.5 py-0.5 rounded font-bold uppercase text-[9px] sm:text-[10px] border border-[#10b981]/30">
                        SAFE
                      </span>
                      <span className="truncate">{threat.ip_address}</span>
                      <span>•</span>
                      <span>${threat.cart_value_usd.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDismiss(toast.id);
                  }}
                  className="p-1 sm:p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800/80 active:bg-neutral-700 transition-colors cursor-pointer shrink-0"
                  aria-label={isAr ? 'إغلاق الإشعار' : 'Dismiss notification'}
                  title={isAr ? 'إغلاق' : 'Dismiss'}
                >
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          );
        }

        const formattedAmount = `$${threat.cart_value_usd.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;

        return (
          <div
            key={toast.id}
            id={`toast-${toast.id}`}
            onClick={() => onInspectThreat(threat)}
            className="pointer-events-auto group cursor-pointer w-[90vw] max-w-sm md:max-w-md mx-auto md:mx-0 bg-gradient-to-r from-[#170a0a] via-[#120808] to-[#0d0606] border border-[#ff3344]/70 sm:border-2 sm:border-[#ff3344]/80 hover:border-[#ff3344] rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 shadow-[0_10px_25px_rgba(0,0,0,0.6),0_0_20px_rgba(255,51,68,0.25)] relative overflow-hidden transition-all duration-200 transform active:scale-[0.99] md:hover:-translate-y-0.5 animate-in slide-in-from-bottom-3 fade-in duration-200"
          >
            {/* 3-second progress timer bar at bottom */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#ff3344] origin-left animate-[shrink_3s_linear_forwards]"
              style={{
                animationDuration: '3000ms',
              }}
            />

            <div className="flex items-center sm:items-start justify-between gap-2.5">
              {/* Left Alert Icon with Neon Glow */}
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-lg bg-[#ff3344]/20 border border-[#ff3344] flex items-center justify-center text-[#ff3344] shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_10px_rgba(255,51,68,0.3)]">
                {threat.threat_type?.toLowerCase().includes('bot') || threat.ip_address.includes('BOT') ? (
                  <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#ff4d5e]" />
                ) : (
                  <ShieldAlert className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#ff3344]" />
                )}
              </div>

              {/* Toast Message Body */}
              <div className="flex-1 min-w-0 text-xs">
                <p className="font-bold sm:font-extrabold text-white text-xs sm:text-sm leading-snug tracking-tight truncate sm:whitespace-normal">
                  {toast.message ||
                    (isAr
                      ? `تم حظر تهديد من ${threat.ip_address} بقيمة ${formattedAmount}`
                      : `Threat blocked from ${threat.ip_address} worth ${formattedAmount}`)}
                </p>

                {/* Sub-details: Geo + Payment failures + Type */}
                <div className="mt-0.5 sm:mt-1 flex items-center flex-wrap gap-1 sm:gap-1.5 text-[10px] text-neutral-400 font-mono">
                  <span className="bg-[#ff3344]/20 text-[#ff4d5e] px-1 sm:px-1.5 py-0.5 rounded font-bold uppercase text-[9px] sm:text-[10px] border border-[#ff3344]/30">
                    BLOCKED
                  </span>
                  <span className="truncate">{threat.city || 'Unknown'}, {threat.country || 'NET'}</span>
                  <span>•</span>
                  <span className="text-[#ff4d5e] font-semibold">{threat.payment_failures} Fail</span>
                  <span>•</span>
                  <span>{threat.session_duration}s</span>
                </div>
              </div>

              {/* Close Button / Action */}
              <div className="flex items-center shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDismiss(toast.id);
                  }}
                  className="p-1 sm:p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800/80 active:bg-neutral-700 transition-colors cursor-pointer"
                  aria-label={isAr ? 'إغلاق التنبيه' : 'Dismiss notification'}
                  title={isAr ? 'إغلاق التنبيه' : 'Dismiss'}
                >
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </aside>
  );
};


