import React, { useState } from 'react';
import { AccessLog } from '../types';
import {
  Search,
  Filter,
  PlusCircle,
  Download,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  ShieldAlert,
  Radio,
  Sliders,
} from 'lucide-react';
import { downloadFile } from '../utils/exporter';

interface LogsDatabaseProps {
  logs: AccessLog[];
  onSelectThreat: (threat: AccessLog) => void;
  onInjectCustomLog: (log: Partial<AccessLog>) => void;
  isStreaming: boolean;
  setIsStreaming: (val: boolean) => void;
  language: 'en' | 'ar';
}

export const LogsDatabase: React.FC<LogsDatabaseProps> = ({
  logs,
  onSelectThreat,
  onInjectCustomLog,
  isStreaming,
  setIsStreaming,
  language,
}) => {
  const isAr = language === 'ar';
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'threats' | 'safe'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showInjectModal, setShowInjectModal] = useState(false);
  const pageSize = 12;

  // Custom log injection form state
  const [customIp, setCustomIp] = useState('185.220.101.44');
  const [customDuration, setCustomDuration] = useState('4');
  const [customCart, setCustomCart] = useState('3890.00');
  const [customFailures, setCustomFailures] = useState('48');

  // Filter & Search
  const filtered = logs.filter((log) => {
    const matchesSearch =
      log.ip_address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.city && log.city.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;

    if (filterType === 'threats') return log.ai_verdict === -1;
    if (filterType === 'safe') return log.ai_verdict === 1 || !log.ai_verdict;
    return true;
  });

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const currentLogs = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleInjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onInjectCustomLog({
      ip_address: customIp,
      session_duration: parseInt(customDuration) || 5,
      cart_value_usd: parseFloat(customCart) || 2500,
      payment_failures: parseInt(customFailures) || 30,
      city: 'Custom Simulation',
      country: 'NET',
    });
    setShowInjectModal(false);
  };

  const handleExportCsv = () => {
    let csv = 'id,ip_address,session_duration,cart_value_usd,payment_failures,verdict,anomaly_score\n';
    logs.forEach((l) => {
      csv += `${l.id},"${l.ip_address}",${l.session_duration},${l.cart_value_usd},${l.payment_failures},${
        l.ai_verdict === -1 ? 'THREAT' : 'SAFE'
      },${l.anomaly_score || 0}\n`;
    });
    downloadFile('ecommerce_access_logs.csv', csv, 'text/csv');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 pb-24 lg:pb-12 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#27272a]">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100">
            {isAr ? 'سجلات النظام وقاعدة البيانات' : 'System Logs & Transaction Inspector'}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            {isAr
              ? 'فحص شامل لكافة طلبات الشلسلات وتحليل البصمات ومحاولات الدفع الفاشلة'
              : 'Detailed transaction event ledger with automated threat scoring and inspection'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Live Streaming Toggle */}
          <button
            onClick={() => setIsStreaming(!isStreaming)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-colors cursor-pointer ${
              isStreaming
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : 'bg-[#18181b] hover:bg-[#202024] text-zinc-300 border border-[#27272a]'
            }`}
          >
            <Radio className={`w-3.5 h-3.5 ${isStreaming ? 'animate-pulse text-emerald-400' : 'text-zinc-500'}`} />
            <span>{isStreaming ? (isAr ? 'البث المباشر نشط' : 'STREAM ACTIVE') : (isAr ? 'بدء البث الحي' : 'START STREAM')}</span>
          </button>

          {/* Export CSV */}
          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#18181b] hover:bg-[#202024] text-zinc-300 border border-[#27272a] text-xs font-medium transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-zinc-400" />
            <span>CSV</span>
          </button>
        </div>
      </div>

      {/* Control Bar: Search & Filter Tabs */}
      <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shadow-sm">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={isAr ? 'بحث عن IP أو موقع جغرافي...' : 'Search by IP or location...'}
            className="w-full bg-[#121215] text-zinc-100 text-xs pl-10 pr-3.5 rtl:pl-3.5 rtl:pr-10 py-2.5 rounded-xl border border-[#27272a] focus:border-[#a3ff00] focus:outline-none transition-colors"
          />
        </div>

        {/* Filter Badges */}
        <div className="bg-[#121215] border border-[#27272a] rounded-xl p-1 flex gap-1 text-xs">
          <button
            onClick={() => {
              setFilterType('all');
              setCurrentPage(1);
            }}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium cursor-pointer ${
              filterType === 'all' ? 'bg-[#27272a] text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {isAr ? 'الكل' : 'All'} ({logs.length})
          </button>
          <button
            onClick={() => {
              setFilterType('threats');
              setCurrentPage(1);
            }}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium flex items-center gap-1.5 cursor-pointer ${
              filterType === 'threats' ? 'bg-[#ff3344]/20 text-[#ff4d5e] font-semibold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{isAr ? 'التهديدات' : 'Threats'}</span>
          </button>
          <button
            onClick={() => {
              setFilterType('safe');
              setCurrentPage(1);
            }}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium flex items-center gap-1.5 cursor-pointer ${
              filterType === 'safe' ? 'bg-emerald-500/20 text-emerald-400 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isAr ? 'الآمنة' : 'Safe'}</span>
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-[#18181b] border border-[#27272a] rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left rtl:text-right text-zinc-300">
            <thead className="bg-[#121215] text-zinc-400 font-mono uppercase text-[11px] border-b border-[#27272a]">
              <tr>
                <th className="px-5 py-3.5">{isAr ? 'عنوان IP' : 'IP Address'}</th>
                <th className="px-5 py-3.5">{isAr ? 'الموقع' : 'Location'}</th>
                <th className="px-5 py-3.5">{isAr ? 'مدة الجلسة' : 'Duration'}</th>
                <th className="px-5 py-3.5">{isAr ? 'قيمة السلة' : 'Cart Value'}</th>
                <th className="px-5 py-3.5">{isAr ? 'فشل الدفع' : 'Failures'}</th>
                <th className="px-5 py-3.5">{isAr ? 'القرار' : 'Verdict'}</th>
                <th className="px-5 py-3.5 text-right rtl:text-left">{isAr ? 'الإجراء' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#27272a] font-mono">
              {currentLogs.map((log) => {
                const isThreat = log.ai_verdict === -1;
                return (
                  <tr
                    key={log.id}
                    className="hover:bg-[#202024] transition-colors cursor-pointer"
                    onClick={() => onSelectThreat(log)}
                  >
                    <td className="px-5 py-3 font-bold text-zinc-100 flex items-center gap-2">
                      {isThreat ? (
                        <span className="w-2 h-2 rounded-full bg-[#ff3344]" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      )}
                      <span>{log.ip_address}</span>
                    </td>
                    <td className="px-5 py-3 text-zinc-400 font-sans">
                      {log.city || 'Frankfurt'}, {log.country || 'DE'}
                    </td>
                    <td className="px-5 py-3 text-zinc-300">{log.session_duration}s</td>
                    <td className="px-5 py-3 text-zinc-100 font-semibold">
                      ${log.cart_value_usd.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-5 py-3">
                      <span className={log.payment_failures > 0 ? 'text-[#ff4d5e] font-bold' : 'text-zinc-500'}>
                        {log.payment_failures}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      {isThreat ? (
                        <span className="px-2 py-0.5 rounded bg-[#ff3344]/15 text-[#ff4d5e] border border-[#ff3344]/30 text-[10px] font-bold">
                          BLOCKED
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                          ALLOWED
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-right rtl:text-left text-zinc-400 hover:text-white font-sans text-xs">
                      {isAr ? 'فحص الجنايات' : 'Inspect'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-[#27272a] bg-[#121215] flex items-center justify-between text-xs text-zinc-400">
          <div>
            {isAr
              ? `عرض ${currentLogs.length} من أصل ${filtered.length} سجل`
              : `Showing ${currentLogs.length} of ${filtered.length} records`}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-[#27272a] disabled:opacity-30 hover:bg-[#202024] cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            </button>
            <span className="font-mono text-zinc-200">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-[#27272a] disabled:opacity-30 hover:bg-[#202024] cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
