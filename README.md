# 🛡️ AI Sentinel | Real-Time E-Commerce Threat Defense Engine

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.0-blue.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-cyan.svg)](https://tailwindcss.com/)
[![Machine Learning](https://img.shields.io/badge/AI-Isolation_Forest-orange.svg)](https://scikit-learn.org/)

## 📖 About The Project

**AI Sentinel** is an enterprise-grade Cybersecurity & Anti-Fraud dashboard designed specifically for E-Commerce platforms. It bridges the gap between **Cybersecurity and Economic/Financial Loss Prevention**. 

By utilizing Machine Learning (Isolation Forest) and real-time telemetry, the system detects zero-day fraud tactics, bot swarms, and credential stuffing attacks without relying on static firewall rules, instantly calculating the **Revenue Protected ($)** in real-time.

---

## ✨ Key Features

- 🧠 **Unsupervised Anomaly Detection:** Powered by Machine Learning to detect abnormal purchasing behaviors and bot traffic.
- 💰 **Financial Impact Engine:** Directly maps cyber threats to business metrics, showing the exact monetary value of blocked fraudulent carts.
- 🎯 **Store Checkout Simulator (Red Teaming):** A built-in mock e-commerce checkout page that allows you to configure and launch simulated "Bot Swarm" attacks to test the AI's response.
- 💻 **Interactive DevSecOps Terminal:** A simulated command-line interface for IP forensics, deep packet inspection, and manual system overrides.
- 🎨 **Enterprise UI/UX:** Built with a sleek, responsive dark mode utilizing React and Tailwind CSS.

---

## 🚀 Quick Start (Automated Setup)

Follow the instructions below based on your Operating System to run the project locally.

### 🐧 For Linux (Smart Bash Script)
Copy and paste this entire block into your terminal. This script will automatically detect your distribution (Arch or Ubuntu/Debian), install the required packages, clone the repository, and start the server:

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
    echo "[!] Please ensure Node.js, npm, and Git are installed manually."
fi

# 2. Clone the project
echo "[+] Cloning AI Sentinel Repository..."
git clone https://github.com/ouss227T7EE/AI-Cyber-Threat-Sentinel.git

# 3. Install & Run
cd AI-Cyber-Threat-Sentinel
echo "[+] Installing Node packages..."
npm install

echo "[+] Starting the AI Sentinel Server..."
npm run dev
```

---

### 🍏 For macOS
The easiest way to install dependencies on macOS is using [Homebrew](https://brew.sh/):
```bash
brew install node git python
git clone https://github.com/ouss227T7EE/AI-Cyber-Threat-Sentinel.git
cd AI-Cyber-Threat-Sentinel
npm install
npm run dev
```

---

### 🪟 For Windows
You can use the modern Windows Package Manager (`winget`) in Command Prompt or PowerShell, or install tools manually:
```cmd
winget install OpenJS.NodeJS Git.Git Python.Python.3.10
git clone https://github.com/ouss227T7EE/AI-Cyber-Threat-Sentinel.git
cd AI-Cyber-Threat-Sentinel
npm install
npm run dev
```

---

## 🌍 Accessing the Platform
Once the terminal displays the success message, open your web browser and navigate to the local server URL:
**👉 `http://localhost:5173`**

---

## 📸 Screenshots & Previews

*(Replace the links below with actual images of your project)*

- `[Dashboard]` Real-time anomaly score visualizer & revenue metrics.
- `[Attack Simulator]` Mock Checkout environment with Bot Swarm protocol configuration.
- `[Interactive Shell]` Command-line interface for IP forensics.

---

## 👨‍💻 Author & Architecture
Developed to demonstrate the critical intersection of **Economic Security and Computer Science**. 
If you encounter any issues or want to discuss the architecture, feel free to open an issue in this repository.

## 📝 License
Distributed under the MIT License.
