import { AccessLog } from '../types';

export function generateHtmlDashboardContent(threats: AccessLog[], totalProtected: number): string {
  const topThreats = threats.slice(0, 5);

  let threatItemsHtml = '';
  topThreats.forEach((t) => {
    const loc = t.city && t.country ? `${t.city}, ${t.country}` : 'Unknown Origin';
    threatItemsHtml += `
        <div class="threat-item">
            <div class="ip-box">
                <p class="ip">🛑 ${t.ip_address}</p>
                <p class="location">${loc}</p>
            </div>
            <div class="value">$${t.cart_value_usd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            <div class="status">${t.payment_failures} Failures<br>- BLOCKED</div>
        </div>`;
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Sentinel Dashboard</title>
    <style>
        body { 
            background-color: #0a0a0a; 
            color: #fff; 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; 
            margin: 0; 
            padding: 40px 20px; 
            display: flex; 
            justify-content: center; 
            min-height: 100vh;
            box-sizing: border-box;
        }
        .container { 
            width: 100%; 
            max-width: 480px; 
        }
        .header { 
            display: flex; 
            align-items: center; 
            margin-bottom: 24px; 
        }
        .header-icon { 
            background: #162216; 
            padding: 12px; 
            border-radius: 14px; 
            border: 1px solid #a3ff00; 
            margin-right: 16px; 
            font-size: 24px;
            box-shadow: 0 0 15px rgba(163, 255, 0, 0.2);
        }
        .title-box h1 { 
            font-size: 26px; 
            font-weight: 900; 
            margin: 0; 
            letter-spacing: -0.5px; 
            text-transform: uppercase; 
            color: #ffffff;
        }
        .title-box p { 
            color: #888888; 
            font-size: 13px; 
            margin: 4px 0 0 0; 
        }
        .card { 
            background: linear-gradient(145deg, #121a12 0%, #0a0f0a 100%); 
            border: 1px solid #1f2e1f; 
            border-radius: 18px; 
            padding: 26px; 
            margin-bottom: 30px; 
            box-shadow: 0 10px 30px rgba(163, 255, 0, 0.05); 
            position: relative;
            overflow: hidden;
        }
        .card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, #a3ff00, transparent);
        }
        .card-title { 
            color: #888; 
            font-size: 12px; 
            letter-spacing: 1.5px; 
            margin-bottom: 12px; 
            text-transform: uppercase; 
            display: flex; 
            align-items: center; 
            font-weight: 600;
        }
        .revenue { 
            color: #a3ff00; 
            font-size: 42px; 
            font-weight: 800; 
            margin: 0 0 12px 0; 
            text-shadow: 0 0 24px rgba(163, 255, 0, 0.25); 
            letter-spacing: -1px;
        }
        .badge { 
            color: #a3ff00; 
            font-size: 13px; 
            font-weight: 600; 
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .badge::before {
            content: '';
            display: inline-block;
            width: 8px;
            height: 8px;
            background-color: #a3ff00;
            border-radius: 50%;
            box-shadow: 0 0 8px #a3ff00;
        }
        .section-title {
            font-size: 15px; 
            color: #cccccc; 
            margin-bottom: 16px;
            font-weight: 600;
            letter-spacing: 0.5px;
        }
        .threat-item { 
            background: #111111; 
            border: 1px solid #1c1c1c; 
            border-radius: 14px; 
            padding: 16px; 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
            margin-bottom: 12px; 
            transition: all 0.25s ease; 
        }
        .threat-item:hover { 
            border-color: #ff3344; 
            background: #1a0a0a; 
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(255, 51, 68, 0.15);
        }
        .ip-box { 
            display: flex; 
            flex-direction: column; 
        }
        .ip { 
            font-weight: 800; 
            font-size: 15px; 
            margin: 0; 
            letter-spacing: 0.5px; 
            color: #ffffff;
        }
        .location { 
            color: #777777; 
            font-size: 12px; 
            margin: 4px 0 0 0; 
        }
        .value { 
            color: #cccccc; 
            font-size: 14px; 
            font-weight: 600; 
            font-variant-numeric: tabular-nums;
        }
        .status { 
            color: #ff3344; 
            font-size: 12px; 
            font-weight: 800; 
            text-align: right; 
            line-height: 1.4; 
            background: rgba(255, 51, 68, 0.1);
            padding: 4px 8px;
            border-radius: 6px;
            border: 1px solid rgba(255, 51, 68, 0.2);
        }
        .footer-tag {
            text-align: center;
            margin-top: 30px;
            color: #555;
            font-size: 11px;
            letter-spacing: 1px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="header-icon">🤖</div>
            <div class="title-box">
                <h1>AI SENTINEL</h1>
                <p>Real-time e-commerce threat detection</p>
            </div>
        </div>
        
        <div class="card">
            <div class="card-title">📈 REVENUE PROTECTED</div>
            <h2 class="revenue">$${totalProtected.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
            <div class="badge">+${threats.length} Threats blocked this cycle</div>
        </div>

        <div class="section-title">Blocked threats (Top 5 Recent)</div>
        ${threatItemsHtml}

        <div class="footer-tag">AI-CYBER-THREAT-SENTINEL • ISOLATION FOREST ENGINE</div>
    </div>
</body>
</html>`;
}

export const MAIN_PY_CONTENT = `import sqlite3
import pandas as pd
from sklearn.ensemble import IsolationForest
import random
import time
import os
from colorama import init, Fore, Style

# تهيئة الألوان للـ Terminal
init(autoreset=True)

print(Fore.CYAN + Style.BRIGHT + r"""
    ___  ____    _____             __  _            __ 
   /   |/  _/   / ___/___  ____  / /_(_)___  ___  / / 
  / /| |/ /     \__ \/ _ \/ __ \/ __/ / __ \/ _ \/ /  
 / ___ / /     ___/ /  __/ / / / /_/ / / / /  __/ /   
/_/  |___/    /____/\___/_/ /_/\__/_/_/ /_/\___/_/    
""")
print(Fore.GREEN + "[SYSTEM] AI-Driven Cybersecurity Engine Initialized.\\n")

mode = input(Fore.YELLOW + "Select Mode:\\n[1] Demo Mode (Generate Synthetic DB)\\n[2] Live Mode (Read Existing DB)\\n> ")

db_name = 'ecommerce_logs.db'

if mode == '1':
    print(Fore.CYAN + "\\n[+] Initializing Demo Environment...")
    if os.path.exists(db_name):
        os.remove(db_name)
    
    conn = sqlite3.connect(db_name)
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE access_logs (id INTEGER PRIMARY KEY, ip_address TEXT, session_duration INTEGER, cart_value_usd REAL, payment_failures INTEGER)''')
    
    data = []
    # توليد بيانات مستخدمين عاديين
    for i in range(500):
        data.append((f"192.168.1.{random.randint(1, 255)}", random.randint(120, 3000), round(random.uniform(10, 200), 2), random.randint(0, 1)))
    
    # توليد بيانات هكرز/بوتات
    hacker_ips = ['10.0.0.4', '203.0.113.227', '10.0.0.50', '203.0.113.145', '10.0.0.107']
    for ip in hacker_ips:
        data.append((ip, random.randint(1, 15), round(random.uniform(1500, 5000), 2), random.randint(20, 100)))
    
    cursor.executemany('INSERT INTO access_logs (ip_address, session_duration, cart_value_usd, payment_failures) VALUES (?, ?, ?, ?)', data)
    conn.commit()
    print(Fore.GREEN + "[+] Database 'ecommerce_logs.db' created with 505 records.")
else:
    if not os.path.exists(db_name):
        print(Fore.RED + f"[-] Error: {db_name} not found!")
        exit()
    conn = sqlite3.connect(db_name)

# --- AI ANALYSIS ---
print(Fore.CYAN + "\\n[+] Extracting Data via SQL...")
df = pd.read_sql_query("SELECT * FROM access_logs", conn)

print(Fore.CYAN + "[+] Training Isolation Forest AI Model...")
features = df[['session_duration', 'cart_value_usd', 'payment_failures']]
model = IsolationForest(contamination=0.04, random_state=42)
df['AI_Verdict'] = model.fit_predict(features)

# فلترة التهديدات
threats = df[df['AI_Verdict'] == -1].copy()
threats = threats.sort_values(by='cart_value_usd', ascending=False)
total_protected = threats['cart_value_usd'].sum()

print(Fore.GREEN + f"\\n✅ Total Safe Connections: {len(df) - len(threats)}")
print(Fore.RED + Style.BRIGHT + f"🚨 Critical Threats Blocked: {len(threats)}")
print(Fore.YELLOW + Style.BRIGHT + f"\\n[$$$] FINANCIAL LOSS PREVENTED: \${total_protected:,.2f}\\n")

print(threats[['ip_address', 'cart_value_usd', 'payment_failures']].head())
conn.close()

# --- HTML DASHBOARD GENERATION (The Masterpiece) ---
print(Fore.CYAN + "\\n[+] Generating Cyberpunk Web Dashboard...")

html_template = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>AI Sentinel Dashboard</title>
    <style>
        body {{ background-color: #0a0a0a; color: #fff; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 40px; display: flex; justify-content: center; }}
        .container {{ width: 100%; max-width: 450px; }}
        .header {{ display: flex; align-items: center; margin-bottom: 20px; }}
        .header-icon {{ background: #162216; padding: 10px; border-radius: 12px; border: 1px solid #a3ff00; margin-right: 15px; }}
        .title-box h1 {{ font-size: 28px; font-weight: 900; margin: 0; letter-spacing: -1px; text-transform: uppercase; }}
        .title-box p {{ color: #777; font-size: 13px; margin: 4px 0 0 0; }}
        .card {{ background: linear-gradient(145deg, #121a12 0%, #0a0f0a 100%); border: 1px solid #1f2e1f; border-radius: 16px; padding: 25px; margin-bottom: 30px; box-shadow: 0 10px 30px rgba(163, 255, 0, 0.05); }}
        .card-title {{ color: #888; font-size: 11px; letter-spacing: 1px; margin-bottom: 10px; text-transform: uppercase; display: flex; align-items: center; }}
        .revenue {{ color: #a3ff00; font-size: 42px; font-weight: 800; margin: 0 0 10px 0; text-shadow: 0 0 20px rgba(163, 255, 0, 0.2); }}
        .badge {{ color: #a3ff00; font-size: 12px; font-weight: bold; }}
        .threat-item {{ background: #111; border: 1px solid #1a1a1a; border-radius: 12px; padding: 16px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; transition: 0.3s; }}
        .threat-item:hover {{ border-color: #ff3344; background: #1a0a0a; }}
        .ip-box {{ display: flex; flex-direction: column; }}
        .ip {{ font-weight: 800; font-size: 15px; margin: 0; letter-spacing: 1px; }}
        .location {{ color: #666; font-size: 11px; margin: 4px 0 0 0; }}
        .value {{ color: #aaa; font-size: 14px; font-weight: 500; }}
        .status {{ color: #ff3344; font-size: 13px; font-weight: 800; text-align: right; line-height: 1.4; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="header-icon">🤖</div>
            <div class="title-box">
                <h1>AI SENTINEL</h1>
                <p>Real-time e-commerce threat detection</p>
            </div>
        </div>
        
        <div class="card">
            <div class="card-title">📈 REVENUE PROTECTED</div>
            <h2 class="revenue">\${total_protected:,.2f}</h2>
            <div class="badge">● +{len(threats)} Threats blocked this cycle</div>
        </div>

        <h3 style="font-size: 16px; color: #ddd; margin-bottom: 15px;">Blocked threats (Top 5 Recent)</h3>
"""

locations = ["Riyadh, SA", "Frankfurt, DE", "Singapore", "Unknown Origin", "Ashburn, US"]
loc_index = 0

for index, row in threats.head(5).iterrows():
    loc = locations[loc_index % len(locations)]
    html_template += f"""
        <div class="threat-item">
            <div class="ip-box">
                <p class="ip">🛑 {row['ip_address']}</p>
                <p class="location">{loc}</p>
            </div>
            <div class="value">\${row['cart_value_usd']:,.2f}</div>
            <div class="status">{row['payment_failures']} Failures<br>- BLOCKED</div>
        </div>
    """
    loc_index += 1

html_template += """
    </div>
</body>
</html>
"""

with open("Security_Dashboard.html", "w", encoding="utf-8") as f:
    f.write(html_template)
    
print(Fore.GREEN + Style.BRIGHT + "\\n[+] SUCCESS! Dashboard exported to 'Security_Dashboard.html'")
`;

export function downloadFile(filename: string, content: string, contentType: string = 'text/plain') {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
