export interface AccessLog {
  id: number;
  ip_address: string;
  session_duration: number; // in seconds
  cart_value_usd: number;
  payment_failures: number;
  timestamp?: string;
  country?: string;
  city?: string;
  ai_verdict?: number; // 1 = normal, -1 = anomaly/threat
  anomaly_score?: number;
  threat_type?: string;
  status?: 'BLOCKED' | 'ALLOWED' | 'FLAGGED';
}

export interface ThreatSummary {
  totalRecords: number;
  safeConnections: number;
  blockedThreats: number;
  totalProtectedUsd: number;
  contaminationRate: number;
  highestThreatCart: number;
  avgPaymentFailuresThreats: number;
}

export interface TerminalOutputLine {
  id: string;
  text: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'cyan' | 'ascii' | 'input' | 'system';
  timestamp?: string;
}

export interface ThreatToast {
  id: string;
  threat?: AccessLog;
  message: string;
  type?: 'threat' | 'safe' | 'info';
  createdAt: number;
}

export type AppMode = 'standby' | 'demo' | 'live';
export type ActiveTab =
  | 'dashboard'
  | 'checkout_simulator'
  | 'terminal'
  | 'ml_visualizer'
  | 'database'
  | 'code_guide'
  | 'html_preview';


