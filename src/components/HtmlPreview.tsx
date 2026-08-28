import React, { useState } from 'react';
import { AccessLog } from '../types';
import { generateHtmlDashboardContent, downloadFile } from '../utils/exporter';
import { Download, Code, Eye, ExternalLink, Sparkles, Check, FileCode } from 'lucide-react';

interface HtmlPreviewProps {
  threats: AccessLog[];
  totalProtectedUsd: number;
  language: 'en' | 'ar';
}

export const HtmlPreview: React.FC<HtmlPreviewProps> = ({ threats, totalProtectedUsd, language }) => {
  const isAr = language === 'ar';
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);

  const htmlContent = generateHtmlDashboardContent(threats, totalProtectedUsd);

  const handleDownload = () => {
    downloadFile('Security_Dashboard.html', htmlContent, 'text/html');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex justify-center py-6 px-3 sm:px-6">
      <div className="w-full max-w-5xl space-y-4">
        {/* Top Preview Bar */}
        <div className="bg-[#0b100b] border border-[#1e331e] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
            <div className="w-8 h-8 rounded-lg bg-[#142314] border border-[#234223] flex items-center justify-center text-[#a3ff00]">
              <FileCode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-mono">Security_Dashboard.html</h3>
              <p className="text-[11px] text-neutral-400">
                {isAr ? 'الملف النهائي المستخرج تلقائياً بواسطة سكربت بايثون' : 'Auto-generated standalone cyberpunk HTML artifact'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            {/* View Mode Toggle */}
            <div className="bg-[#050805] border border-[#1e331e] rounded-xl p-1 flex text-xs">
              <button
                onClick={() => setViewMode('preview')}
                className={`flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  viewMode === 'preview' ? 'bg-[#182918] text-[#a3ff00]' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{isAr ? 'معاينة الواجهة' : 'Visual Preview'}</span>
              </button>

              <button
                onClick={() => setViewMode('code')}
                className={`flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  viewMode === 'code' ? 'bg-[#182918] text-[#a3ff00]' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>{isAr ? 'كود HTML' : 'HTML Source'}</span>
              </button>
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="p-2 bg-[#0d140d] hover:bg-[#152415] text-neutral-300 border border-[#1e331e] rounded-xl text-xs flex items-center space-x-1 cursor-pointer"
              title="Copy HTML"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#a3ff00]" /> : <Code className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
            </button>

            {/* Download HTML */}
            <button
              onClick={handleDownload}
              className="flex items-center space-x-1.5 rtl:space-x-reverse px-3.5 py-1.5 bg-[#a3ff00] hover:bg-[#b8ff33] text-black font-bold rounded-xl text-xs shadow-[0_0_15px_rgba(163,255,0,0.25)] transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isAr ? 'تحميل الملف' : 'Download HTML'}</span>
            </button>
          </div>
        </div>

        {/* Display Container */}
        {viewMode === 'preview' ? (
          <div className="bg-[#050505] border border-[#1e331e] rounded-2xl overflow-hidden shadow-2xl min-h-[580px] flex items-center justify-center p-2 sm:p-6">
            <iframe
              title="Security_Dashboard_Preview"
              srcDoc={htmlContent}
              className="w-full max-w-lg h-[640px] rounded-xl border border-[#182418] bg-[#0a0a0a]"
            />
          </div>
        ) : (
          <div className="bg-[#080d08] border border-[#1e331e] rounded-2xl p-4 max-h-[640px] overflow-y-auto font-mono text-xs text-neutral-300 leading-relaxed">
            <pre className="whitespace-pre-wrap">{htmlContent}</pre>
          </div>
        )}
      </div>
    </div>
  );
};
