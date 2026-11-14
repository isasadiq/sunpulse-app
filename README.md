# SunPulse
**Empowering Rural & Underserved Communities with Intelligent Clean Energy Telemetry and Maintenance**

SunPulse is an offline-first mobile operating platform engineered to solve the "solar graveyard" crisis in Nigeria and sub-Saharan Africa. By uniting solar telemetry, automated fault diagnostics, digital system passports, and offline-capable field engineering workflows into a unified mobile application, SunPulse ensures solar installations in unserved and underserved communities remain operational, productive, and accountable throughout their lifecycle.

---

## Problem Statement
In Nigeria, billions of naira are invested each year into rural solar mini-grids, primary healthcare center (PHC) installations, schools, and off-grid agro-processing facilities. Yet over 40% of these systems fail within 6 to 18 months due to:
1. **Lack of Post-Installation Telemetry:** Operators have no visibility into battery degradation, inverter tripping, or solar panel shading.
2. **Connectivity Deserts:** Most remote and underserved locations have zero or spotty cellular connectivity, rendering conventional cloud-only IoT dashboards useless.
3. **No Technician Accountability:** Field engineers lack standardized diagnostic routines, digital sign-offs, and structured maintenance records.

## Key Capabilities

### 1. Self-Service Inverter Pairing & Live Telemetry
- Direct datalogger barcode scanning and serial pairing for major hardware brands (Deye Cloud, Growatt, Felicity Solar, SRNE, Huawei).
- Real-time power generation, battery state of charge (SoC), and load telemetry.
- Instant 1-tap evaluation mode for reviewers and technical judges to simulate live telemetry.

### 2. Smart Sizing & Accessibility Calculator
- Real-time solar and storage sizing calculator tailored for Nigerian households, businesses, and agro-processors.
- Instant estimates, equipment recommendations, and quote requests with transparent ROI timelines.

### 3. Client & Facility Management Dashboard
- **System Passport:** An unforgeable digital identity for each solar installation detailing inverter serials, battery chemistry, panel capacity, and warranty statuses.
- One-touch fault reporting with photo capture and immediate ticket generation.
- Full offline dashboard fallback (`ClientHomeOfflineScreen`) when mobile network is unavailable.

### 4. Field Engineer Operating Suite
- **Offline-First Synchronization Engine:** Complete job scheduling, checklists, and diagnostics queue locally and sync automatically when network connectivity is restored.
- **Inverter Diagnostics & Datalogger Integration:** Direct barcode scanning for smart dataloggers, live inverter parameter inspection, and automated pass/fail testing.
- **Digital Proof-of-Work & Sign-Off:** Digital customer signatures, geo-tagged site installation photos, and tamper-resistant maintenance sign-offs.

### 5. Management & Dispatch Center
- Fleet-level overview of active installations, energy generation totals, and system health status.
- Technician dispatch routing and SLA tracking for fault tickets.
- Client activation workflows and document vaults for contract agreements and warranty certificates.

---

## Technology Architecture

- **Framework:** [Expo](https://expo.dev/) (SDK 58) / [React Native](https://reactnative.dev/) (0.88+)
- **Language:** TypeScript 5.8+
- **Backend & Database:** [Supabase](https://supabase.com/) (PostgreSQL with Row Level Security & Realtime subscriptions)
- **Local Persistence & Sync:** `@react-native-async-storage/async-storage` with an optimistic mutation queue
- **Hardware Integration:** Inverter datalogger telemetry protocols & barcode parsing

---

## Getting Started

### Prerequisites
- Node.js (v18 or later)
- Expo CLI (`npx expo`)
- Expo Go app on your physical iOS/Android device or a configured emulator

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/isasadiq/sunpulse-app.git
   cd sunpulse-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy the example environment configuration:
   ```bash
   cp .env.example .env
   ```
   Provide your Supabase URL and anonymous key.

4. **Launch the development server:**
   ```bash
   npx expo start
   ```
   Scan the QR code with your mobile camera (iOS) or Expo Go (Android).

---

## Alignment with National Development & USPF Mandate
SunPulse directly supports the **Universal Service Provision Fund (USPF)** and the **Nigerian Communications Commission (NCC)** mandate to foster ICT innovation in unserved and underserved communities by:
- Extending clean and affordable energy access to remote rural areas.
- Drastically reducing downtime in critical community infrastructure (rural clinics, water boreholes, and schools).
- Promoting local technician employment through a structured, mobile-guided maintenance network.

---

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
