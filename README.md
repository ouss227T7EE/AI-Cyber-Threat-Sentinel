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

## 🚀 Quick Start Guide

### 1. Clone the Repository
```bash
git clone [https://github.com/YOUR_USERNAME/AI-Cyber-Threat-Sentinel.git](https://github.com/YOUR_USERNAME/AI-Cyber-Threat-Sentinel.git)
cd AI-Cyber-Threat-Sentinel
```

### 2. Run Python ML Engine (CLI Mode)
```bash
pip install pandas scikit-learn colorama
python main.py
```

### 3. Run Web Application
```bash
npm install
npm run dev
```

---

## 📷 Dashboard Preview

*(Add your high-resolution screenshots here)*

- `[Dashboard]` Real-time anomaly score visualizer & revenue metrics.
- `[Attack Simulator]` Mock Checkout environment with Bot Swarm protocol configuration.
- `[Interactive Shell]` Command-line interface for IP forensics.

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.
