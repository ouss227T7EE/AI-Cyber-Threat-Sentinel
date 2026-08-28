# 🛡️ AI Sentinel | Real-Time E-Commerce Threat Defense Engine

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/Python-3.10+-blue.svg)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-18.0-blue.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-cyan.svg)](https://tailwindcss.com/)
[![Machine Learning](https://img.shields.io/badge/AI-Isolation_Forest-orange.svg)](https://scikit-learn.org/)

An enterprise-grade Cybersecurity & Anti-Fraud system designed to protect e-commerce platforms from automated bot attacks, credential stuffing, and high-value fraudulent transactions using Machine Learning (**Isolation Forest**) and real-time behavioral telemetry.

---

## 💡 Key Architectural Highlights

- **Financial Impact Engine:** Directly maps cyber threat mitigation to business metrics, calculating **Revenue Protected ($)** in real time.
- **Unsupervised Anomaly Detection:** Uses `scikit-learn`'s **Isolation Forest** to detect zero-day fraud tactics without relying on static rules.
- **Interactive Attack Simulator (Red Teaming):** Includes a mock e-commerce checkout interface equipped with a bot-swarm protocol injector to simulate realistic DDoS and fraud scenarios.
- **Enterprise Dark SaaS Dashboard:** Built with React, TypeScript, and Tailwind CSS following strict responsive UI/UX principles.
- **Simulated Interactive CLI:** Built-in web terminal for deep packet inspection and manual IP containment commands (`scan`, `block`, `status`).

---

## 📐 System Architecture

1. **Data Ingestion:** Collects session duration, cart values, and payment failure rates.
2. **AI Processing:** Computes anomaly scores and isolates outliers (`contamination=0.04`).
3. **Automated Response:** Triggers immediate IP containment and updates the financial protection metrics.

---

## 🛠️ Tech Stack

- **Backend / AI Core:** Python 3.10, Pandas, Scikit-Learn, SQLite3.
- **Frontend / UX:** React, TypeScript, Tailwind CSS, Lucide Icons.
- **Environment:** Compatible with Arch Linux, Codespaces, and Web Environments.

---

## 🚀 Quick Start (Automated Setup)

### 🐧 For Linux (Smart Bash Script)
Copy and paste this entire block into your terminal. This script will automatically detect your distribution, install the required packages, clone the repository, and start the server:

```bash
#!/bin/bash

# 1. Auto-detect OS and install dependencies
if [ -f /etc/arch-release ]; then
    echo "[+] Arch Linux detected. Installing dependencies..."
    sudo pacman -S --needed nodejs npm git python --noconfirm
elif [ -f /etc/debian_version ]; then
    echo "[+] Debian/Ubuntu detected. Installing dependencies..."
    sudo apt update && sudo apt install -y nodejs npm git python3
else
    echo "[!] Please ensure Node.js, npm, and Git are installed."
fi

# 2. Clone the project
echo "[+] Cloning AI Sentinel Repository..."
git clone [https://github.com/ouss227T7EE/AI-Cyber-Threat-Sentinel.git](https://github.com/ouss227T7EE/AI-Cyber-Threat-Sentinel.git)

# 3. Install & Run
cd AI-Cyber-Threat-Sentinel
echo "[+] Installing Node packages..."
npm install

echo "[+] Starting the AI Sentinel Server..."
npm run dev

## 📷 Dashboard Preview

*(Add your high-resolution screenshots here)*

- `[Dashboard]` Real-time anomaly score visualizer & revenue metrics.
- `[Attack Simulator]` Mock Checkout environment with Bot Swarm protocol configuration.
- `[Interactive Shell]` Command-line interface for IP forensics.

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.
