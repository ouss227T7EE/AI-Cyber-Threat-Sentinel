import React, { useState, useEffect, useRef } from 'react';
import {
  Terminal as TermIcon,
  Play,
  RotateCcw,
  Copy,
  Check,
  CornerDownLeft,
  Sparkles,
  ShieldAlert,
  ShieldCheck,
  Cpu,
  Zap,
  Activity,
  AlertTriangle,
  Loader2,
  ListFilter,
} from 'lucide-react';
import { AccessLog } from '../types';
import { MAIN_PY_CONTENT } from '../utils/exporter';

interface TerminalRunnerProps {
  logs: AccessLog[];
  threats: AccessLog[];
  totalProtectedUsd: number;
  onExecutionComplete?: () => void;
  onBlockIp?: (ip: string) => void;
  language: 'en' | 'ar';
}

interface TerminalEntry {
  id: string;
  type: 'ascii' | 'cyan' | 'green' | 'red' | 'yellow' | 'white' | 'cmd' | 'system' | 'badge-success';
  text: string;
  badge?: string;
}

const ASCII_BANNER = `    ___  ____    _____             __  _            __ 
   /   |/  _/   / ___/___  ____  / /_(_)___  ___  / / 
  / /| |/ /     \\__ \\/ _ \\/ __ \\/ __/ / __ \\/ _ \\/ /  
 / ___ / /     ___/ /  __/ / / / /_/ / / / /  __/ /   
/_/  |___/    /____/\\___/_/ /_/\\__/_/_/ /_/\\___/_/    `;

export const TerminalRunner: React.FC<TerminalRunnerProps> = ({
  logs,
  threats,
  totalProtectedUsd,
  onExecutionComplete,
  onBlockIp,
  language,
}) => {
  const isAr = language === 'ar';
  const [history, setHistory] = useState<TerminalEntry[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingText, setProcessingText] = useState('Processing request...');
  const [copied, setCopied] = useState(false);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [waitingForMode, setWaitingForMode] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial welcome message
  useEffect(() => {
    setHistory([
      { id: '1', type: 'cyan', text: 'AI Sentinel Interactive CLI • v2.4.0 [Linux x86_64 / scikit-learn 1.5.0]' },
      { id: '2', type: 'white', text: 'Type "help" to view supported commands (scan, block, status, clear, threats, python main.py)' },
      { id: '3', type: 'green', text: '[SYSTEM] Threat Detection Socket: ONLINE • Kernel eBPF Filters: ACTIVE' },
    ]);
  }, []);

  // Auto-scroll on new entries or processing state changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isProcessing]);

  const addLine = (type: TerminalEntry['type'], text: string, badge?: string) => {
    setHistory((prev) => [...prev, { id: Math.random().toString(), type, text, badge }]);
  };

  // Full python script runner
  const runPythonScript = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setProcessingText('Executing main.py pipeline...');
    setWaitingForMode(false);

    addLine('cmd', 'root@ai-sentinel:~# python main.py');

    setTimeout(() => {
      setIsProcessing(false);
      addLine('ascii', ASCII_BANNER);
      addLine('green', '[SYSTEM] AI-Driven Cybersecurity Engine Initialized.\n');

      setTimeout(() => {
        addLine('yellow', 'Select Mode:\n[1] Demo Mode (Generate Synthetic DB)\n[2] Live Mode (Read Existing DB)');
        setWaitingForMode(true);
      }, 400);
    }, 900);
  };

  const handleSelectPythonMode = (mode: '1' | '2') => {
    setWaitingForMode(false);
    setIsProcessing(true);
    setProcessingText('Running Isolation Forest training loop...');
    addLine('cmd', `> ${mode}`);

    setTimeout(() => {
      if (mode === '1') {
        addLine('cyan', '\n[+] Initializing Demo Environment...');
        addLine('green', `[+] Database 'ecommerce_logs.db' created with ${logs.length || 500} records.`);
      } else {
        addLine('cyan', '\n[+] Connecting to live SQLite database: ecommerce_logs.db...');
        addLine('green', `[+] Loaded ${logs.length} existing transactions from database.`);
      }

      setTimeout(() => {
        addLine('cyan', '[+] Extracting Data via SQL: "SELECT * FROM access_logs"...');
        addLine('cyan', '[+] Training Isolation Forest AI Model (contamination=0.04, random_state=42)...');

        setTimeout(() => {
          const safeCount = Math.max(0, logs.length - threats.length);
          addLine('green', `\n[+] Total Safe Connections: ${safeCount}`);
          addLine('red', `[!] Critical Threats Blocked: ${threats.length}`);
          addLine(
            'yellow',
            `\n[$$$] FINANCIAL LOSS PREVENTED: $${totalProtectedUsd.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}\n`
          );

          addLine('white', 'IP Address       | Cart Value  | Failures | Verdict');
          addLine('white', '---------------------------------------------------');
          threats.slice(0, 5).forEach((t) => {
            const ipFormatted = t.ip_address.padEnd(16, ' ');
            const cartFormatted = `$${t.cart_value_usd.toFixed(2)}`.padEnd(11, ' ');
            const failFormatted = `${t.payment_failures}`.padEnd(8, ' ');
            addLine('red', `${ipFormatted} | ${cartFormatted} | ${failFormatted} | ISOLATED (-1)`);
          });

          addLine('green', "\n[✓] SUCCESS: Dashboard artifact generated in 'Security_Dashboard.html'");
          setIsProcessing(false);
          if (onExecutionComplete) onExecutionComplete();
        }, 800);
      }, 600);
    }, 700);
  };

  // Command submission dispatcher
  const executeCommand = (cmdText: string) => {
    const rawCmd = cmdText.trim();
    if (!rawCmd) return;

    // Record in history for up/down navigation
    setCmdHistory((prev) => [...prev, rawCmd]);
    setHistoryIndex(-1);

    // If waiting for mode 1 or 2
    if (waitingForMode) {
      if (rawCmd === '1' || rawCmd === '2') {
        handleSelectPythonMode(rawCmd);
      } else {
        addLine('red', '[-] Invalid choice. Please enter 1 or 2.');
      }
      return;
    }

    // Append entered command to terminal log
    addLine('cmd', `root@ai-sentinel:~# ${rawCmd}`);

    const parts = rawCmd.split(/\s+/);
    const command = parts[0].toLowerCase();
    const arg = parts[1] || '';

    // Handle instant commands (clear)
    if (command === 'clear' || command === 'cls') {
      setHistory([]);
      return;
    }

    // Set simulated latency (800ms - 1500ms)
    setIsProcessing(true);
    setProcessingText(
      command === 'scan'
        ? `Running deep packet inspection on ${arg || 'target telemetry'}...`
        : command === 'block'
        ? `Invoking kernel firewall & adding IPTables rule...`
        : command === 'status'
        ? 'Querying AI Sentinel telemetry & hardware subsystems...'
        : 'Processing request...'
    );

    const delay = Math.floor(Math.random() * 400) + 900; // 900ms - 1300ms

    setTimeout(() => {
      setIsProcessing(false);

      switch (command) {
        case 'help': {
          addLine('cyan', 'AI Sentinel Supported Command Reference:');
          addLine('white', '  help           - Displays available terminal commands & syntax');
          addLine('white', '  scan [IP]      - Run Deep Packet Inspection & anomaly payload analysis');
          addLine('white', '  block [IP]     - Deploy IPTables firewall rule to immediately drop traffic');
          addLine('white', '  status         - Query AI core telemetry, hardware metrics, and latency');
          addLine('white', '  threats        - List top high-risk threat IPs flagged by Isolation Forest');
          addLine('white', '  python main.py - Execute the full Python ML training pipeline & export HTML');
          addLine('white', '  whoami         - Print active cybersecurity operator credentials');
          addLine('white', '  version        - Print AI Sentinel system build and kernel version');
          addLine('white', '  clear          - Clear the terminal console buffer');
          break;
        }

        case 'scan': {
          const targetIp = arg || (threats[0]?.ip_address || '185.220.101.44');
          const matchedLog = logs.find((l) => l.ip_address === targetIp) || threats[0] || {
            ip_address: targetIp,
            session_duration: 4,
            cart_value_usd: 3890.0,
            payment_failures: 48,
            anomaly_score: 0.884,
            city: 'Frankfurt',
            country: 'DE',
          };

          const isThreat = matchedLog.payment_failures > 5 || matchedLog.session_duration < 15;
          const score = matchedLog.anomaly_score?.toFixed(3) || '0.884';

          addLine('cyan', `[+] Initiating Deep Packet Inspection on ${targetIp}...`);
          addLine('white', `[+] Target Geo       : ${matchedLog.city || 'Network Node'}, ${matchedLog.country || 'GLOBAL'}`);
          addLine('white', `[+] Session Duration : ${matchedLog.session_duration}s (Threshold: <15s abnormal velocity)`);
          addLine('white', `[+] Cart Payload     : $${matchedLog.cart_value_usd.toFixed(2)} USD`);
          addLine('white', `[+] Payment Failures : ${matchedLog.payment_failures} attempts (Card Testing Velocity)`);
          addLine('yellow', `[+] Isolation Score  : ${score} [Decision Cutoff: 0.500]`);

          if (isThreat) {
            addLine('red', `[!] RISK EVALUATION  : HIGH (Automated Card Testing Bot / Credential Stuffer)`);
            addLine('yellow', `[!] Recommended Action: Run 'block ${targetIp}' to drop all traffic immediately.`);
          } else {
            addLine('green', `[✓] RISK EVALUATION  : SAFE (Legitimate customer transaction profile)`);
          }
          break;
        }

        case 'block': {
          const targetIp = arg || (threats[0]?.ip_address || '185.220.101.44');
          if (onBlockIp) {
            onBlockIp(targetIp);
          }
          addLine('cyan', `[+] Invoking Linux Kernel Netfilter / IPTables Subsystem...`);
          addLine('white', `[+] Appending rule: iptables -A INPUT -s ${targetIp} -j DROP`);
          addLine('white', `[+] Updating eBPF fast-path filter map table...`);
          addLine('green', `[✓] SUCCESS: IP ${targetIp} added to IPTables firewall. Traffic dropped.`);
          break;
        }

        case 'status': {
          const safeCount = Math.max(0, logs.length - threats.length);
          addLine('green', 'AI Core: Online | Memory: 32GB | Latency: 4ms');
          addLine('cyan', `Model: Isolation Forest (n_estimators=100, contamination=4.0%)`);
          addLine('white', `Telemetry Processed : ${logs.length} transaction records`);
          addLine('green', `Safe Transactions   : ${safeCount} cleared`);
          addLine('red', `Threats Blocked     : ${threats.length} isolated (-1)`);
          addLine(
            'yellow',
            `Protected Revenue   : $${totalProtectedUsd.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`
          );
          addLine('white', `Firewall Enforced   : 100% Active Packet Drop`);
          break;
        }

        case 'threats': {
          if (threats.length === 0) {
            addLine('green', '[✓] No active threats detected in current stream.');
          } else {
            addLine('cyan', `[+] Displaying Top Flagged Threat Incidents (${threats.length} total):`);
            addLine('white', 'IP Address       | Cart USD    | Failures | Geo Location');
            addLine('white', '-------------------------------------------------------');
            threats.slice(0, 8).forEach((t) => {
              const ip = t.ip_address.padEnd(16, ' ');
              const cart = `$${t.cart_value_usd.toFixed(2)}`.padEnd(11, ' ');
              const fails = `${t.payment_failures}`.padEnd(8, ' ');
              const geo = `${t.city || 'Node'}, ${t.country || 'NET'}`;
              addLine('red', `${ip} | ${cart} | ${fails} | ${geo}`);
            });
          }
          break;
        }

        case 'python':
        case 'python3': {
          if (arg === 'main.py' || arg === './main.py') {
            runPythonScript();
          } else {
            addLine('white', `Python 3.11.8 (main, Linux x86_64)`);
            addLine('cyan', `Use 'python main.py' to run the cybersecurity engine.`);
          }
          break;
        }

        case 'whoami': {
          addLine('green', 'root (AI Sentinel Enterprise SOC Administrator / UID 0)');
          break;
        }

        case 'version': {
          addLine('cyan', 'AI Sentinel v2.4.0-enterprise [Build 2026.08 / x86_64-linux-gnu]');
          addLine('white', 'Engines: scikit-learn 1.5.0 • eBPF Kernel Shield 6.8.0');
          break;
        }

        case 'ls':
        case 'dir': {
          addLine('white', 'ecommerce_logs.db  main.py  Security_Dashboard.html  requirements.txt  iptables.rules');
          break;
        }

        case 'cat': {
          if (arg === 'main.py') {
            addLine('white', MAIN_PY_CONTENT.slice(0, 350) + '\n... [truncated for terminal buffer]');
          } else if (arg === 'requirements.txt') {
            addLine('white', 'pandas>=2.2.0\nscikit-learn>=1.5.0\ncolorama>=0.4.6\nnumpy>=1.26.0');
          } else {
            addLine('yellow', `cat: ${arg || 'file'}: No such file or directory`);
          }
          break;
        }

        default: {
          addLine('red', `bash: ${command}: command not found. Type 'help' for available commands.`);
          break;
        }
      }
    }, delay);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    const cmd = inputVal;
    setInputVal('');
    executeCommand(cmd);
  };

  // Keyboard navigation for command history
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(cmdHistory[nextIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= cmdHistory.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(cmdHistory[nextIndex] || '');
      }
    }
  };

  const handleCopyLogs = () => {
    const text = history.map((h) => h.text).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Quick Action Buttons
  const sampleThreatIp = threats[0]?.ip_address || '185.220.101.44';

  return (
    <div className="w-full flex justify-center py-6 px-3 sm:px-6">
      <div className="w-full max-w-5xl space-y-4">
        {/* Terminal Header Bar */}
        <div className="bg-[#121212] border border-[#222222] rounded-t-2xl px-4 py-3 flex items-center justify-between shadow-lg">
          <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
            <div className="flex space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-[0_0_8px_rgba(255,95,86,0.6)]"></span>
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-[0_0_8px_rgba(255,189,46,0.6)]"></span>
              <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-[0_0_8px_rgba(39,201,63,0.6)]"></span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse ml-2">
              <TermIcon className="w-4 h-4 text-[#a3ff00]" />
              <span className="text-xs font-mono font-bold text-neutral-300">
                root@ai-sentinel:~ (Interactive Bash REPL)
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <button
              onClick={handleCopyLogs}
              className="flex items-center space-x-1.5 text-[11px] font-mono text-neutral-300 hover:text-white px-2.5 py-1 rounded-lg bg-[#1c1c1c] hover:bg-[#282828] border border-[#333333] transition-all cursor-pointer"
              title="Copy terminal output"
            >
              {copied ? <Check className="w-3 h-3 text-[#a3ff00]" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? (isAr ? 'تم النسخ' : 'Copied') : isAr ? 'نسخ المخرجات' : 'Copy'}</span>
            </button>

            <button
              onClick={() => setHistory([])}
              className="flex items-center space-x-1.5 text-[11px] font-mono text-neutral-300 hover:text-white px-2.5 py-1 rounded-lg bg-[#1c1c1c] hover:bg-[#282828] border border-[#333333] transition-all cursor-pointer"
              title="Clear terminal"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{isAr ? 'مسح الطرفية' : 'Clear'}</span>
            </button>
          </div>
        </div>

        {/* Terminal Screen Body */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="bg-[#070b07] border-x border-[#1a2c1a] p-4 sm:p-5 font-mono text-xs sm:text-sm min-h-[460px] max-h-[580px] overflow-y-auto space-y-1.5 shadow-2xl relative select-text"
          dir="ltr"
        >
          {history.map((entry) => {
            if (entry.type === 'ascii') {
              return (
                <pre
                  key={entry.id}
                  className="text-[#00f0ff] font-extrabold leading-tight text-[10px] sm:text-xs overflow-x-auto my-2"
                >
                  {entry.text}
                </pre>
              );
            }
            if (entry.type === 'cyan') {
              return (
                <div key={entry.id} className="text-[#00f0ff] font-medium leading-relaxed">
                  {entry.text}
                </div>
              );
            }
            if (entry.type === 'green') {
              return (
                <div key={entry.id} className="text-[#a3ff00] font-semibold leading-relaxed">
                  {entry.text}
                </div>
              );
            }
            if (entry.type === 'red') {
              return (
                <div key={entry.id} className="text-[#ff3344] font-bold leading-relaxed">
                  {entry.text}
                </div>
              );
            }
            if (entry.type === 'yellow') {
              return (
                <div key={entry.id} className="text-[#ffd000] whitespace-pre-wrap leading-relaxed">
                  {entry.text}
                </div>
              );
            }
            if (entry.type === 'cmd') {
              return (
                <div key={entry.id} className="text-white font-bold leading-relaxed pt-1 flex items-center space-x-2">
                  <span className="text-[#a3ff00]">root@ai-sentinel:~#</span>
                  <span>{entry.text.replace(/^root@ai-sentinel:~#\s*/, '')}</span>
                </div>
              );
            }
            return (
              <div key={entry.id} className="text-neutral-300 leading-relaxed">
                {entry.text}
              </div>
            );
          })}

          {/* Real-time processing feedback line with animated indicator */}
          {isProcessing && (
            <div className="flex items-center space-x-2 text-[#a3ff00] font-mono text-xs py-1 animate-pulse">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#a3ff00]" />
              <span>{processingText}</span>
            </div>
          )}

          {/* Interactive Mode Options when Python script prompts */}
          {waitingForMode && (
            <div className="my-3 p-3.5 bg-[#101c10] border border-[#a3ff00]/50 rounded-xl space-y-2 text-xs">
              <p className="font-bold text-[#a3ff00]">
                {isAr ? 'اختر نمط التشغيل للمتابعة:' : 'Select Mode to Proceed:'}
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleSelectPythonMode('1')}
                  className="px-3.5 py-1.5 bg-[#a3ff00] text-black font-extrabold rounded-lg text-xs hover:bg-[#b8ff33] transition-colors cursor-pointer"
                >
                  [1] Demo Mode (Generate Synthetic DB - 500 Records)
                </button>
                <button
                  onClick={() => handleSelectPythonMode('2')}
                  className="px-3.5 py-1.5 bg-[#172b17] text-[#a3ff00] border border-[#a3ff00]/40 font-extrabold rounded-lg text-xs hover:bg-[#203a20] transition-colors cursor-pointer"
                >
                  [2] Live Mode (Read Existing DB)
                </button>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Sticky Command Input Prompt at Bottom */}
        <form
          onSubmit={handleFormSubmit}
          className="sticky bottom-2 z-20 bg-[#0c130c] border border-[#203720] rounded-b-2xl p-2.5 sm:p-3 flex items-center gap-2 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          dir="ltr"
        >
          <div className="flex items-center space-x-1.5 text-xs sm:text-sm font-mono font-bold text-[#a3ff00] shrink-0 pl-1">
            <span>root@ai-sentinel:~#</span>
          </div>

          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isProcessing}
            placeholder={
              waitingForMode
                ? 'Type 1 or 2 and press Enter...'
                : 'Type command (e.g. scan, block, status, help, clear)...'
            }
            className="flex-1 bg-transparent text-white font-mono text-xs sm:text-sm focus:outline-none placeholder-neutral-500 disabled:opacity-50"
            autoFocus
          />

          <button
            type="submit"
            disabled={isProcessing || !inputVal.trim()}
            className="px-3.5 py-1.5 bg-[#a3ff00] hover:bg-[#b8ff33] text-black font-extrabold text-xs font-mono rounded-lg flex items-center space-x-1 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_10px_rgba(163,255,0,0.2)] cursor-pointer"
          >
            <span>Execute</span>
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Quick Command Suggestions Chips */}
        <div className="p-3.5 bg-[#0a0f0a] border border-[#1b2f1b] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2 rtl:space-x-reverse text-neutral-300 text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-[#a3ff00]" />
            <span>{isAr ? 'أوامر سريعة بنقرة واحدة (Quick CLI Actions):' : 'One-Click Quick Commands:'}</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
            <button
              onClick={() => executeCommand(`scan ${sampleThreatIp}`)}
              disabled={isProcessing}
              className="px-2.5 py-1 rounded-lg bg-[#142014] hover:bg-[#1b2b1b] text-[#a3ff00] border border-[#243d24] transition-all cursor-pointer"
            >
              scan {sampleThreatIp}
            </button>

            <button
              onClick={() => executeCommand(`block ${sampleThreatIp}`)}
              disabled={isProcessing}
              className="px-2.5 py-1 rounded-lg bg-[#201012] hover:bg-[#2b1518] text-[#ff4d5e] border border-[#442024] transition-all cursor-pointer"
            >
              block {sampleThreatIp}
            </button>

            <button
              onClick={() => executeCommand('status')}
              disabled={isProcessing}
              className="px-2.5 py-1 rounded-lg bg-[#142014] hover:bg-[#1b2b1b] text-neutral-200 border border-[#243d24] transition-all cursor-pointer"
            >
              status
            </button>

            <button
              onClick={() => executeCommand('threats')}
              disabled={isProcessing}
              className="px-2.5 py-1 rounded-lg bg-[#142014] hover:bg-[#1b2b1b] text-neutral-200 border border-[#243d24] transition-all cursor-pointer"
            >
              threats
            </button>

            <button
              onClick={runPythonScript}
              disabled={isProcessing}
              className="px-2.5 py-1 rounded-lg bg-[#a3ff00] hover:bg-[#b8ff33] text-black font-bold transition-all cursor-pointer flex items-center space-x-1"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>python main.py</span>
            </button>

            <button
              onClick={() => executeCommand('help')}
              disabled={isProcessing}
              className="px-2.5 py-1 rounded-lg bg-[#142014] hover:bg-[#1b2b1b] text-neutral-400 border border-[#243d24] transition-all cursor-pointer"
            >
              help
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
