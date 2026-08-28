import React, { useState, useEffect } from 'react';
import { Activity, Radio, Cpu, Wifi, CheckCircle2 } from 'lucide-react';

interface SystemPulseProps {
  isActive: boolean;
  totalThreats: number;
  language: 'ar' | 'en';
}

export const SystemPulse: React.FC<SystemPulseProps> = ({
  isActive,
  totalThreats,
  language,
}) => {
  const isAr = language === 'ar';
  const [packetRate, setPacketRate] = useState(1840);
  const [latency, setLatency] = useState(0.35);
  const [barHeights, setBarHeights] = useState<number[]>([40, 65, 80, 45, 95, 30, 70, 85, 55, 90, 60, 75, 50, 88, 65, 92]);

  // Dynamic soundwave/packet frequency fluctuations
  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      // Jitter packet rate slightly
      setPacketRate(1800 + Math.floor(Math.random() * 180));
      // Jitter latency slightly (0.28 - 0.45 ms)
      setLatency(Number((0.3 + Math.random() * 0.15).toFixed(2)));
      // Jitter sound-wave bar heights
      setBarHeights((prev) =>
        prev.map(() => Math.floor(25 + Math.random() * 75))
      );
    }, 400);

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="bg-[#0a110a] border border-[#1d321d] rounded-xl p-3.5 sm:p-4 text-xs font-mono shadow-[0_0_20px_rgba(163,255,0,0.04)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        {/* Left: Pulse Status */}
        <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
          <div className="relative flex h-3 w-3">
            {isActive && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a3ff00] opacity-75"></span>
            )}
            <span className={`relative inline-flex rounded-full h-3 w-3 ${isActive ? 'bg-[#a3ff00]' : 'bg-neutral-600'}`}></span>
          </div>
          <div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse font-bold text-white uppercase tracking-wider text-[11px]">
              <Activity className="w-3.5 h-3.5 text-[#a3ff00]" />
              <span>{isAr ? 'نبض النظام وتفتيش الحزم الحية' : 'SYSTEM PULSE & REAL-TIME PACKET INSPECTION'}</span>
            </div>
            <p className="text-[10px] text-neutral-400 font-sans">
              {isAr
                ? 'فحص سياقي مستمر لتدفق حزم HTTP/TLS وسلوك المستخدمين'
                : 'Continuous Deep Packet Inspection (DPI) & TLS Signature Matching'}
            </p>
          </div>
        </div>

        {/* Right: Live Telemetry Numbers */}
        <div className="flex items-center space-x-4 rtl:space-x-reverse text-[11px] self-end sm:self-center">
          <div className="text-right rtl:text-left">
            <span className="text-neutral-400 text-[10px] block">{isAr ? 'معدل التفتيش' : 'Throughput'}</span>
            <span className="text-[#a3ff00] font-bold">{packetRate.toLocaleString()} pkts/s</span>
          </div>
          <div className="w-[1px] h-6 bg-[#1f331f]"></div>
          <div className="text-right rtl:text-left">
            <span className="text-neutral-400 text-[10px] block">{isAr ? 'زمن الاستجابة' : 'Latency'}</span>
            <span className="text-white font-bold">{latency} ms</span>
          </div>
          <div className="w-[1px] h-6 bg-[#1f331f]"></div>
          <div className="text-right rtl:text-left">
            <span className="text-neutral-400 text-[10px] block">{isAr ? 'حالة المعالجة' : 'DPI State'}</span>
            <span className="text-[#a3ff00] font-bold">{isActive ? 'ONLINE' : 'IDLE'}</span>
          </div>
        </div>
      </div>

      {/* Animated Sound-wave / Oscilloscope Equalizer Bars */}
      <div className="bg-[#050805] border border-[#132213] rounded-lg p-2.5 flex items-end justify-between gap-1 h-12 relative overflow-hidden">
        {/* Background waveform grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#142414_1px,transparent_1px)] [background-size:100%_8px] opacity-20 pointer-events-none"></div>

        {barHeights.map((height, idx) => {
          const isDangerSpike = idx % 5 === 0 && totalThreats > 0;
          return (
            <div
              key={idx}
              className="flex-1 rounded-sm transition-all duration-300 relative group"
              style={{
                height: isActive ? `${height}%` : '15%',
                backgroundColor: isDangerSpike ? '#ff3344' : '#a3ff00',
                boxShadow: isActive
                  ? isDangerSpike
                    ? '0 0 8px rgba(255,51,68,0.5)'
                    : '0 0 6px rgba(163,255,0,0.35)'
                  : 'none',
                opacity: isActive ? 0.9 : 0.3,
              }}
            />
          );
        })}
      </div>

      {/* Footer sub-status info */}
      <div className="flex items-center justify-between text-[10px] text-neutral-400 mt-2 font-mono">
        <span className="flex items-center space-x-1 rtl:space-x-reverse text-neutral-300">
          <Wifi className="w-3 h-3 text-[#a3ff00]" />
          <span>{isAr ? 'البروتوكول: HTTP/2 Checkout Webhooks' : 'Ingestion: TLS 1.3 / HTTP/2 Stream'}</span>
        </span>
        <span className="text-[#a3ff00]">
          {isAr ? '0 حزم مفقودة | معدل الدقة 99.8%' : '0 Drop Rate | 99.8% Precision'}
        </span>
      </div>
    </div>
  );
};
