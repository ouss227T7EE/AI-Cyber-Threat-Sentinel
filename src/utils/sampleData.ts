import { AccessLog } from '../types';

const GEO_LOCATIONS = [
  { city: 'Riyadh', country: 'SA', flag: '🇸🇦' },
  { city: 'Frankfurt', country: 'DE', flag: '🇩🇪' },
  { city: 'Singapore', country: 'SG', flag: '🇸🇬' },
  { city: 'Ashburn', country: 'US', flag: '🇺🇸' },
  { city: 'London', country: 'GB', flag: '🇬🇧' },
  { city: 'Tokyo', country: 'JP', flag: '🇯🇵' },
  { city: 'Amsterdam', country: 'NL', flag: '🇳🇱' },
  { city: 'Dubai', country: 'AE', flag: '🇦🇪' },
  { city: 'São Paulo', country: 'BR', flag: '🇧🇷' },
  { city: 'Sydney', country: 'AU', flag: '🇦🇺' },
];

export function generateSyntheticLogs(safeCount: number = 500): AccessLog[] {
  const logs: AccessLog[] = [];
  let currentId = 1;

  // 1. Generate normal users (500 records)
  for (let i = 0; i < safeCount; i++) {
    const geo = GEO_LOCATIONS[Math.floor(Math.random() * GEO_LOCATIONS.length)];
    const ip = `192.168.1.${Math.floor(Math.random() * 254) + 1}`;
    const duration = Math.floor(Math.random() * (3000 - 120 + 1)) + 120; // 120s to 3000s
    const cart = Number((Math.random() * (200 - 10) + 10).toFixed(2)); // $10 - $200
    const failures = Math.random() < 0.85 ? 0 : 1; // 0 or 1 failure rarely

    logs.push({
      id: currentId++,
      ip_address: ip,
      session_duration: duration,
      cart_value_usd: cart,
      payment_failures: failures,
      city: geo.city,
      country: geo.country,
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 3600000)).toLocaleTimeString(),
    });
  }

  // 2. Generate hacker/bot attacks (from prompt's exact list)
  const hackerIps = [
    { ip: '10.0.0.4', loc: 'Riyadh, SA' },
    { ip: '203.0.113.227', loc: 'Frankfurt, DE' },
    { ip: '10.0.0.50', loc: 'Singapore' },
    { ip: '203.0.113.145', loc: 'Unknown Origin' },
    { ip: '10.0.0.107', loc: 'Ashburn, US' },
  ];

  hackerIps.forEach((hacker) => {
    const duration = Math.floor(Math.random() * 15) + 1; // 1s to 15s (super fast script)
    const cart = Number((Math.random() * (5000 - 1500) + 1500).toFixed(2)); // $1500 to $5000
    const failures = Math.floor(Math.random() * (100 - 20 + 1)) + 20; // 20 to 100 card test failures

    const [city, country] = hacker.loc.includes(',')
      ? hacker.loc.split(',').map((s) => s.trim())
      : [hacker.loc, 'XX'];

    logs.push({
      id: currentId++,
      ip_address: hacker.ip,
      session_duration: duration,
      cart_value_usd: cart,
      payment_failures: failures,
      city: city,
      country: country,
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 600000)).toLocaleTimeString(),
    });
  });

  return logs;
}

export function generateSingleAttackLog(customIp?: string, customCart?: number, customFailures?: number): AccessLog {
  const randomHackers = ['185.220.101.5', '45.154.255.89', '91.240.118.24', '194.26.29.112', '103.145.13.2'];
  const ip = customIp || randomHackers[Math.floor(Math.random() * randomHackers.length)];
  const duration = Math.floor(Math.random() * 10) + 1;
  const cart = customCart || Number((Math.random() * 4000 + 2000).toFixed(2));
  const failures = customFailures || Math.floor(Math.random() * 80) + 25;

  const geo = GEO_LOCATIONS[Math.floor(Math.random() * GEO_LOCATIONS.length)];

  return {
    id: Date.now(),
    ip_address: ip,
    session_duration: duration,
    cart_value_usd: cart,
    payment_failures: failures,
    city: geo.city,
    country: geo.country,
    timestamp: new Date().toLocaleTimeString(),
  };
}

export function generateSingleNormalLog(): AccessLog {
  const ip = `192.168.1.${Math.floor(Math.random() * 254) + 1}`;
  const duration = Math.floor(Math.random() * 2000) + 150;
  const cart = Number((Math.random() * 180 + 15).toFixed(2));
  const failures = Math.random() < 0.9 ? 0 : 1;
  const geo = GEO_LOCATIONS[Math.floor(Math.random() * GEO_LOCATIONS.length)];

  return {
    id: Date.now(),
    ip_address: ip,
    session_duration: duration,
    cart_value_usd: cart,
    payment_failures: failures,
    city: geo.city,
    country: geo.country,
    timestamp: new Date().toLocaleTimeString(),
  };
}
