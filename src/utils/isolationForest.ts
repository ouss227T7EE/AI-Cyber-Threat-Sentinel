import { AccessLog } from '../types';

interface ITreeNode {
  isLeaf: boolean;
  size: number;
  splitFeature?: 'session_duration' | 'cart_value_usd' | 'payment_failures';
  splitValue?: number;
  left?: ITreeNode;
  right?: ITreeNode;
}

// Average path length of unsuccessful search in a Binary Search Tree (BST)
function c(n: number): number {
  if (n <= 1) return 0;
  if (n === 2) return 1;
  const eulerMascheroni = 0.5772156649;
  return 2 * (Math.log(n - 1) + eulerMascheroni) - (2 * (n - 1)) / n;
}

const FEATURES: Array<'session_duration' | 'cart_value_usd' | 'payment_failures'> = [
  'session_duration',
  'cart_value_usd',
  'payment_failures',
];

function buildITree(
  data: AccessLog[],
  currentHeight: number,
  maxHeight: number
): ITreeNode {
  if (currentHeight >= maxHeight || data.length <= 1) {
    return { isLeaf: true, size: data.length };
  }

  // Randomly select a feature
  const feature = FEATURES[Math.floor(Math.random() * FEATURES.length)];
  const values = data.map((d) => d[feature]);
  const min = Math.min(...values);
  const max = Math.max(...values);

  if (min === max) {
    return { isLeaf: true, size: data.length };
  }

  // Random split point between min and max
  const splitValue = min + Math.random() * (max - min);

  const leftData = data.filter((d) => d[feature] < splitValue);
  const rightData = data.filter((d) => d[feature] >= splitValue);

  return {
    isLeaf: false,
    size: data.length,
    splitFeature: feature,
    splitValue,
    left: buildITree(leftData, currentHeight + 1, maxHeight),
    right: buildITree(rightData, currentHeight + 1, maxHeight),
  };
}

function pathLength(record: AccessLog, tree: ITreeNode, currentPath: number): number {
  if (tree.isLeaf || !tree.splitFeature || tree.splitValue === undefined) {
    return currentPath + c(tree.size);
  }

  const val = record[tree.splitFeature];
  if (val < tree.splitValue) {
    return pathLength(record, tree.left!, currentPath + 1);
  } else {
    return pathLength(record, tree.right!, currentPath + 1);
  }
}

export interface IsolationForestResult {
  logs: AccessLog[];
  threats: AccessLog[];
  safe: AccessLog[];
  totalProtectedUsd: number;
  anomalyThreshold: number;
  executionTimeMs: number;
}

/**
 * Fits an Isolation Forest model to AccessLogs and predicts anomalies (-1 = Threat, 1 = Safe)
 */
export function runIsolationForest(
  logs: AccessLog[],
  contamination: number = 0.04,
  nTrees: number = 100
): IsolationForestResult {
  const startTime = performance.now();
  const n = logs.length;
  if (n === 0) {
    return {
      logs: [],
      threats: [],
      safe: [],
      totalProtectedUsd: 0,
      anomalyThreshold: 0.5,
      executionTimeMs: 0,
    };
  }

  // Subsample size & max tree height
  const sampleSize = Math.min(256, n);
  const maxHeight = Math.ceil(Math.log2(sampleSize));

  // Build Forest of ITrees
  const forest: ITreeNode[] = [];
  for (let i = 0; i < nTrees; i++) {
    // Sample with replacement or shuffle
    const subSample = [...logs].sort(() => 0.5 - Math.random()).slice(0, sampleSize);
    forest.push(buildITree(subSample, 0, maxHeight));
  }

  const avgCn = c(sampleSize);

  // Compute anomaly scores for all logs
  // Score s(x, n) = 2 ^ ( - E(h(x)) / c(n) )
  const scoredLogs = logs.map((record) => {
    let totalLength = 0;
    for (const tree of forest) {
      totalLength += pathLength(record, tree, 0);
    }
    const expectedHeight = totalLength / nTrees;
    const anomalyScore = Math.pow(2, -(expectedHeight / avgCn));

    // Also determine threat diagnosis
    let threatType = 'Normal Activity';
    if (record.payment_failures >= 20 && record.cart_value_usd > 1000) {
      threatType = 'Carding Bot / Brute-Force Gate Attack';
    } else if (record.session_duration < 15 && record.cart_value_usd > 2000) {
      threatType = 'High-Speed Checkout Sniper';
    } else if (record.payment_failures > 5) {
      threatType = 'Credential / BIN Stuffing';
    } else if (record.cart_value_usd > 3000) {
      threatType = 'High-Value Velocity Anomaly';
    }

    return {
      ...record,
      anomaly_score: Number(anomalyScore.toFixed(4)),
      threat_type: threatType,
    };
  });

  // Determine threshold by sorting anomaly scores descending
  const sortedScores = [...scoredLogs].map((l) => l.anomaly_score || 0).sort((a, b) => b - a);
  const cutoffIndex = Math.max(1, Math.floor(n * contamination));
  const anomalyThreshold = sortedScores[cutoffIndex - 1] ?? 0.6;

  // Label logs: -1 if score >= threshold, else 1
  const finalizedLogs = scoredLogs.map((log) => {
    const isAnomaly = (log.anomaly_score || 0) >= anomalyThreshold;
    return {
      ...log,
      ai_verdict: isAnomaly ? -1 : 1,
      status: isAnomaly ? ('BLOCKED' as const) : ('ALLOWED' as const),
    };
  });

  const threats = finalizedLogs
    .filter((l) => l.ai_verdict === -1)
    .sort((a, b) => b.cart_value_usd - a.cart_value_usd);
  const safe = finalizedLogs.filter((l) => l.ai_verdict === 1);
  const totalProtectedUsd = threats.reduce((acc, curr) => acc + curr.cart_value_usd, 0);

  const endTime = performance.now();

  return {
    logs: finalizedLogs,
    threats,
    safe,
    totalProtectedUsd,
    anomalyThreshold,
    executionTimeMs: Math.round(endTime - startTime),
  };
}
