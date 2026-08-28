import React, { useState } from 'react';
import { AccessLog } from '../types';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Cell, Legend } from 'recharts';
import { Zap, Cpu, Sliders, Info, ShieldCheck, ShieldAlert, BarChart3, RefreshCw } from 'lucide-react';

interface MLVisualizerProps {
  logs: AccessLog[];
  threats: AccessLog[];
  safeLogs: AccessLog[];
  contaminationRate: number;
  setContaminationRate: (rate: number) => void;
  onRetrain: () => void;
  executionTimeMs: number;
  anomalyThreshold: number;
  language: 'en' | 'ar';
}

export const MLVisualizer: React.FC<MLVisualizerProps> = ({
  logs,
  threats,
  safeLogs,
  contaminationRate,
  setContaminationRate,
  onRetrain,
  executionTimeMs,
  anomalyThreshold,
  language,
}) => {
  const isAr = language === 'ar';
  const [numTrees, setNumTrees] = useState(100);

  // Prepare chart data
  const chartData = logs.map((log) => ({
    x: log.session_duration,
    y: log.cart_value_usd,
    z: (log.payment_failures + 1) * 8,
    ip: log.ip_address,
    failures: log.payment_failures,
    isAnomaly: log.ai_verdict === -1,
    anomalyScore: log.anomaly_score ?? (log.ai_verdict === -1 ? 0.72 : 0.35),
    threatType: log.threat_type || (log.ai_verdict === -1 ? 'Bot Anomaly' : 'Normal Customer'),
  }));

  const normalPoints = chartData.filter((d) => !d.isAnomaly);
  const anomalyPoints = chartData.filter((d) => d.isAnomaly);

  // Custom Tooltip with clean SaaS styling
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#18181b] border border-[#27272a] p-3.5 rounded-xl shadow-xl text-xs font-mono space-y-1.5 min-w-[200px]">
          <div className="flex items-center justify-between pb-1.5 border-b border-[#27272a]">
            {data.isAnomaly ? (
              <span className="text-[#ff4d5e] font-bold flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>THREAT DETECTED</span>
              </span>
            ) : (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>CLEAN SESSION</span>
              </span>
            )}
            <span className="text-[10px] text-zinc-500">{data.anomalyScore} score</span>
          </div>
          <div className="text-zinc-100 font-bold">{data.ip}</div>
          <div className="text-zinc-400 flex justify-between">
            <span>Session Duration:</span>
            <span className="text-zinc-200">{data.x}s</span>
          </div>
          <div className="text-zinc-400 flex justify-between">
            <span>Cart Value:</span>
            <span className="text-zinc-200 font-bold">${data.y.toFixed(2)}</span>
          </div>
          <div className="text-zinc-400 flex justify-between">
            <span>Payment Failures:</span>
            <span className={data.failures > 0 ? 'text-[#ff4d5e]' : 'text-zinc-200'}>{data.failures}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8 pb-24 lg:pb-12 max-w-7xl mx-auto w-full">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#27272a]">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100 flex items-center gap-2.5">
            <Cpu className="w-6 h-6 text-[#a3ff00]" />
            <span>{isAr ? 'محرك الذكاء الاصطناعي: Isolation Forest' : 'Isolation Forest Engine Diagnostics'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            {isAr
              ? 'مخطط التشتت متعدد الأبعاد لعزل النقاط الشاذة وعرض سرعة القرار الرياضي'
              : 'Multi-dimensional scatter analysis isolating anomalous checkout vectors in real time'}
          </p>
        </div>

        {/* Hyperparameter Quick Stats */}
        <div className="flex items-center gap-2">
          <button
            onClick={onRetrain}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#a3ff00] hover:bg-[#b8ff33] text-black font-bold text-xs font-mono transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{isAr ? 'إعادة تدريب النموذج' : 'Retrain Model'}</span>
          </button>
        </div>
      </div>

      {/* Model Spec Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-5 space-y-1">
          <p className="text-xs text-zinc-400 font-mono uppercase">{isAr ? 'سرعة الاستدلال' : 'Inference Latency'}</p>
          <p className="text-2xl font-bold font-mono text-zinc-100">{executionTimeMs} ms</p>
          <p className="text-[11px] text-zinc-500">{isAr ? 'زمن الاستجابة للطلب الواحد' : 'Sub-millisecond decision window'}</p>
        </div>

        <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-5 space-y-1">
          <p className="text-xs text-zinc-400 font-mono uppercase">{isAr ? 'حساسية العزل (Contamination)' : 'Contamination'}</p>
          <p className="text-2xl font-bold font-mono text-[#a3ff00]">{(contaminationRate * 100).toFixed(0)}%</p>
          <p className="text-[11px] text-zinc-500">{isAr ? 'نسبة الشوائب المتوقعة' : 'Expected outlier distribution'}</p>
        </div>

        <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-5 space-y-1">
          <p className="text-xs text-zinc-400 font-mono uppercase">{isAr ? 'الشجيرات العشوائية' : 'Ensemble Trees'}</p>
          <p className="text-2xl font-bold font-mono text-zinc-100">{numTrees} iTrees</p>
          <p className="text-[11px] text-zinc-500">{isAr ? 'مصفوفة التجزئة الثنائية' : 'Random binary partition depth'}</p>
        </div>
      </div>

      {/* 2D / 3D Scatter Chart Card */}
      <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#27272a]">
          <div>
            <h3 className="text-base font-bold text-zinc-100">
              {isAr ? 'مخطط التوزيع المكاني للشذوذ (Scatter Plot)' : 'Feature Space Outlier Isolation'}
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              X: Duration (s) | Y: Cart Value ($) | Size: Payment Failures
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-zinc-300">{isAr ? 'مشتري طبيعي' : 'Normal'} ({normalPoints.length})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ff3344]" />
              <span className="text-[#ff4d5e] font-bold">{isAr ? 'تهديد محظور' : 'Threat'} ({anomalyPoints.length})</span>
            </div>
          </div>
        </div>

        {/* Recharts Scatter View */}
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <XAxis
                type="number"
                dataKey="x"
                name="Duration (s)"
                unit="s"
                stroke="#52525b"
                tick={{ fill: '#71717a', fontSize: 11 }}
              />
              <YAxis
                type="number"
                dataKey="y"
                name="Cart Value ($)"
                unit="$"
                stroke="#52525b"
                tick={{ fill: '#71717a', fontSize: 11 }}
              />
              <ZAxis type="number" dataKey="z" range={[40, 260]} />
              <Tooltip content={<CustomTooltip />} />
              <Scatter name="Normal Users" data={normalPoints} fill="#10b981" opacity={0.65} />
              <Scatter name="Threat Anomalies" data={anomalyPoints} fill="#ff3344" opacity={0.9} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
