import React, { useState } from 'react';
import { Copy, Check, Download, FileCode, CheckCircle2, Play, Terminal, Layers } from 'lucide-react';
import { MAIN_PY_CONTENT, downloadFile } from '../utils/exporter';

interface CodeViewerProps {
  onRunTerminal: () => void;
  language: 'en' | 'ar';
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ onRunTerminal, language }) => {
  const isAr = language === 'ar';
  const [copied, setCopied] = useState(false);
  const [copiedPip, setCopiedPip] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(MAIN_PY_CONTENT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyPip = () => {
    navigator.clipboard.writeText('pip install pandas scikit-learn colorama');
    setCopiedPip(true);
    setTimeout(() => setCopiedPip(false), 2000);
  };

  return (
    <div className="w-full flex justify-center py-6 px-3 sm:px-6">
      <div className="w-full max-w-5xl space-y-6">
        {/* Tutorial Steps Cards */}
        <div className="bg-[#0b120b] border border-[#1d301d] rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider flex items-center space-x-2 rtl:space-x-reverse">
              <Layers className="w-5 h-5 text-[#a3ff00]" />
              <span>{isAr ? 'دليل التشغيل في بيئة VS Code السحابية (Codespace)' : 'Codespace Masterclass Tutorial'}</span>
            </h2>
            <button
              onClick={onRunTerminal}
              className="flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-1.5 bg-[#a3ff00] text-black font-bold text-xs rounded-lg hover:bg-[#b8ff33] shadow-[0_0_15px_rgba(163,255,0,0.25)]"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isAr ? 'تشغيل في الطرفية الآن' : 'Run in Terminal'}</span>
            </button>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Step 1 */}
            <div className="bg-[#060a06] border border-[#1a2b1a] rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between font-bold text-white">
                <span className="text-[#a3ff00] font-mono font-black text-sm">#1</span>
                <span>{isAr ? 'إنشاء ملف main.py' : 'Create main.py'}</span>
              </div>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                {isAr
                  ? 'في القائمة الجانبية اليسرى تحت AI-Cyber-Threat-Sentinel، انقر New File وسمّه main.py.'
                  : 'Right-click the explorer under AI-Cyber-Threat-Sentinel, select New File, and name it main.py.'}
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#060a06] border border-[#1a2b1a] rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between font-bold text-white">
                <span className="text-[#a3ff00] font-mono font-black text-sm">#2</span>
                <span>{isAr ? 'تثبيت المكتبات' : 'Install Dependencies'}</span>
              </div>
              <div className="flex items-center justify-between bg-black px-2.5 py-1.5 rounded border border-[#223d22]">
                <code className="text-[#a3ff00] font-mono text-[10px]">pip install pandas scikit-learn colorama</code>
                <button onClick={handleCopyPip} className="text-neutral-400 hover:text-white ml-2">
                  {copiedPip ? <Check className="w-3.5 h-3.5 text-[#a3ff00]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#060a06] border border-[#1a2b1a] rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between font-bold text-white">
                <span className="text-[#a3ff00] font-mono font-black text-sm">#3</span>
                <span>{isAr ? 'تشغيل وتوليد HTML' : 'Execute & Export'}</span>
              </div>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                {isAr
                  ? 'اكتب python main.py واختر [1] لتوليد قاعدة البيانات السحابية واستخراج Security_Dashboard.html.'
                  : 'Run python main.py and select [1] Demo Mode to generate sqlite DB and Security_Dashboard.html.'}
              </p>
            </div>
          </div>
        </div>

        {/* Code Box */}
        <div className="bg-[#080d08] border border-[#1e331e] rounded-2xl overflow-hidden shadow-2xl">
          {/* File Header */}
          <div className="bg-[#050805] px-4 py-3 border-b border-[#1e331e] flex items-center justify-between">
            <div className="flex items-center space-x-2 rtl:space-x-reverse font-mono text-xs text-neutral-300">
              <FileCode className="w-4 h-4 text-[#a3ff00]" />
              <span className="font-bold text-white">main.py</span>
              <span className="text-neutral-500">• Python 3.11 • Isolation Forest</span>
            </div>

            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <button
                onClick={handleCopyCode}
                className="flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-1.5 bg-[#162416] hover:bg-[#203620] text-[#a3ff00] border border-[#2b4d2b] rounded-lg text-xs font-mono font-medium transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ الكود' : 'Copy Code')}</span>
              </button>

              <button
                onClick={() => downloadFile('main.py', MAIN_PY_CONTENT, 'text/x-python')}
                className="flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-1.5 bg-[#162416] hover:bg-[#203620] text-neutral-200 border border-[#2b4d2b] rounded-lg text-xs font-mono transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isAr ? 'تحميل الملف' : 'Download .py'}</span>
              </button>
            </div>
          </div>

          {/* Syntax Highlighted Code Viewer */}
          <div className="p-4 overflow-x-auto max-h-[600px] overflow-y-auto font-mono text-xs text-neutral-300 leading-relaxed scrollbar-thin">
            <pre>
              {MAIN_PY_CONTENT.split('\n').map((line, idx) => (
                <div key={idx} className="table-row hover:bg-[#0e170e]">
                  <span className="table-cell select-none text-neutral-600 text-right pr-4 text-[11px]">
                    {idx + 1}
                  </span>
                  <span className="table-cell whitespace-pre">
                    {line.startsWith('#') ? (
                      <span className="text-[#6272a4] italic">{line}</span>
                    ) : line.includes('import ') || line.includes('from ') ? (
                      <span className="text-[#ff79c6]">{line}</span>
                    ) : line.includes('print(') || line.includes('cursor.') || line.includes('conn.') ? (
                      <span className="text-[#50fa7b]">{line}</span>
                    ) : line.includes('IsolationForest') || line.includes('fit_predict') ? (
                      <span className="text-[#f1fa8c] font-bold">{line}</span>
                    ) : line.includes('def ') || line.includes('if ') || line.includes('else:') ? (
                      <span className="text-[#8be9fd]">{line}</span>
                    ) : (
                      <span>{line}</span>
                    )}
                  </span>
                </div>
              ))}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
