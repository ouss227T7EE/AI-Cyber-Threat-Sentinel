# 🛡️ AI Sentinel | E-Commerce Threat Defense (PoC)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.0-blue.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-cyan.svg)](https://tailwindcss.com/)
[![Machine Learning](https://img.shields.io/badge/AI-Anomaly_Detection-orange.svg)](https://scikit-learn.org/)

## 📖 About The Project

**AI Sentinel** is a cybersecurity and anti-fraud proof-of-concept dashboard designed for e-commerce environments. It bridges the gap between Cybersecurity and Economic/Financial Loss Prevention. 

Using simulated e-commerce activity, the system demonstrates how Machine Learning principles (like Isolation Forest) can be applied to detect anomalous purchasing behaviors and estimate potential financial impact.

---

## ⚠️ Project Scope

This project is a **university portfolio proof-of-concept**. 

It uses simulated e-commerce activity and synthetic security events to demonstrate an AI-assisted anomaly detection workflow. It is not intended to replace a production fraud detection system, SIEM, IDS, or real-time security monitoring infrastructure.

---

## ✨ Key Features

- 🧠 **Unsupervised Anomaly Detection:** Detects anomalous behaviors associated with simulated fraud and bot activity.
- 💰 **Financial Impact Engine:** Directly maps cyber threats to business metrics, estimating potential revenue protected from simulated fraudulent carts.
- 🎯 **Store Checkout Simulator (Red Teaming):** A built-in mock e-commerce checkout page that allows you to configure and launch simulated "Bot Swarm" attacks to test the dashboard's response.
- 💻 **Interactive DevSecOps Terminal:** A simulated command-line interface for IP forensics, deep packet inspection, and manual system overrides.
- 🎨 **Modern UI/UX:** Built with a sleek, responsive dark mode utilizing React and Tailwind CSS.

---

## 🚀 Getting Started

Follow the instructions below based on your Operating System to set up the environment and run the project locally.

### 📋 Prerequisites
Ensure you have the following installed on your machine:
- **Node.js** (v18.0 or higher) and **npm**
- **Git**

---

### 🐧 For Linux

**1. Install Prerequisites**
* **Arch Linux / Manjaro:**
  ```bash
  sudo pacman -S --needed nodejs npm git
  ```
* **Debian / Ubuntu:**
  ```bash
  sudo apt update && sudo apt install -y nodejs npm git
  ```
* **Fedora / RHEL:**
  ```bash
  sudo dnf install nodejs npm git
  ```

**2. Clone and Run**
```bash
git clone [https://github.com/ouss227T7EE/AI-Cyber-Threat-Sentinel.git](https://github.com/ouss227T7EE/AI-Cyber-Threat-Sentinel.git)
cd AI-Cyber-Threat-Sentinel
npm install
npm run dev
```

---

### 🍏 For macOS

**1. Install Prerequisites** (Using [Homebrew](https://brew.sh/))
```bash
brew install node git
```

**2. Clone and Run**
```bash
git clone [https://github.com/ouss227T7EE/AI-Cyber-Threat-Sentinel.git](https://github.com/ouss227T7EE/AI-Cyber-Threat-Sentinel.git)
cd AI-Cyber-Threat-Sentinel
npm install
npm run dev
```

---

### 🪟 For Windows

**1. Install Prerequisites**
Use `winget` in Command Prompt / PowerShell, or install manually:
```cmd
winget install OpenJS.NodeJS Git.Git
```

**2. Clone and Run**
```cmd
git clone [https://github.com/ouss227T7EE/AI-Cyber-Threat-Sentinel.git](https://github.com/ouss227T7EE/AI-Cyber-Threat-Sentinel.git)
cd AI-Cyber-Threat-Sentinel
npm install
npm run dev
```

---

## 🌍 Accessing the Platform
Once the server starts, open your web browser and navigate to:
**👉 `http://localhost:5173`**

---

## 📸 Screenshots

### The Main Dashboard & Financial Metrics
![Dashboard Screenshot Placeholder]<img width="750" height="676" alt="image" src="https://github.com/user-attachments/assets/75d2a60e-c06e-419b-ade2-3db36da83e21" />

### Bot Swarm Attack Simulator
![Attack Simulator Screenshot Placeholder]<img width="737" height="606" alt="image" src="https://github.com/user-attachments/assets/36fe769c-f293-42da-a3b0-95ceb569eba3" />


### Interactive Security Terminal
![Terminal Screenshot Placeholder] <img width="722" height="630" alt="image" src="https://github.com/user-attachments/assets/0132bbe3-8b34-4072-9a89-e9811b82316e" />


---

## 👨‍💻 Author & Architecture
Developed as an academic portfolio project demonstrating the intersection of Economic Security and Computer Science.
My Contribution
Designed the original project concept and user experience
Defined the application's requirements and workflow
Planned the system structure and features
Directed the AI-assisted development process
Tested, evaluated, and refined the final application
AI-Assisted Developmen
AI tools were used as development assistance during implementation. The concept, requirements, system design, feature selection, testing, and final integration were directed and evaluated by me.

## 📝 License
Distributed under the MIT License.
