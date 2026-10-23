# CivicBridge AI — Phase 1: Foundation and User Interface

> **“From Civic Problems to Action.”**  
> A civic problem reporting platform for Maharashtra, India, with **Pune** as the priority testing region.

CivicBridge AI empowers citizens to transform everyday civic issues—such as potholes, overflowing waste heaps, sewage line bursts, water supply contamination, or broken streetlights—into structured, legally referenced municipal grievance briefs aligned with the **Maharashtra Right to Public Services Act (RTS 2015)**.

---

## 🏛️ System Architecture

```
CivicBridge AI
├── src/
│   ├── components/
│   │   ├── Header.tsx           # Logo, branding, pilot badge, language placeholder, navigation
│   │   ├── ReportingForm.tsx    # Problem category pills, sample presets, description textarea
│   │   ├── PhotoUpload.tsx      # Drag-and-drop evidence staging with Phase 2 Gemini Vision tags
│   │   ├── LocationInput.tsx    # Pune jurisdiction (PMC/PCMC/PMRDA), ward selector & GPS auto-detect
│   │   ├── ReportResults.tsx    # Validated grievance brief, copy tool, and Phase 2 Gemini API contract
│   │   ├── AuthorityGuide.tsx   # Verified PMC/PCMC helplines, WhatsApp bots, and RTS SLA standards
│   │   ├── HowItWorksModal.tsx  # Accessible 4-step civic workflow dialog
│   │   └── Footer.tsx           # Citizen privacy by design, non-governmental disclaimer, RTS citations
│   ├── data/
│   │   └── civicData.ts         # Verified Pune municipal bodies, RTS SLA standards, sample presets
│   ├── types/
│   │   └── index.ts             # Strict TypeScript domain interfaces
│   ├── App.tsx                  # Root responsive workspace layout
│   ├── index.css                # Tailwind CSS v4 design tokens and accessible focus styles
│   └── main.tsx                 # React 19 application mount
├── server/
│   ├── src/
│   │   ├── routes/
│   │   │   └── complaint.routes.ts # Complaint validation and Phase 2 API pipeline handler
│   │   ├── types.ts             # Server request/response contracts
│   │   └── index.ts             # Express + TypeScript server with health check & CORS
│   └── tsconfig.json            # NodeNext strict TypeScript configuration
├── .env.example                 # Environment configuration template
├── package.json                 # Scripts and dependencies
└── tsconfig.app.json            # Strict TypeScript configuration
```

---

## 🚀 Quick Start & Commands

### Prerequisites
- **Node.js**: v20+
- **npm**: v10+

### Installation
Dependencies are already configured. To re-install if needed:
```bash
npm install
```

### 1. Run the Frontend (Vite + React + TypeScript)
```bash
npm run dev
```
Starts the Vite development server at `http://localhost:5173`.

### 2. Run the Backend (Express + TypeScript)
```bash
npm run dev:server
```
Starts the Express API server on `http://localhost:5001`.
- Health Check: `http://localhost:5001/api/health`
- Complaint Intake API: `POST http://localhost:5001/api/complaints/generate`

### 3. Verification Commands
```bash
# Strict TypeScript check (Client + Server)
npm run typecheck

# Code quality & linter check
npm run lint

# Production build bundle
npm run build
```

---

## 🛡️ Firm Requirements Compliance

1. **No Login or Authentication**: Friction-free citizen access; no accounts, passwords, or personal credential harvesting.
2. **No Fake Testimonials, Statistics, or Government Endorsements**: Strictly authentic civic content and legitimate municipal channels.
3. **No Invented Official URLs**: Real government portals only (`care.punecorporation.org`, `pcmcindia.gov.in`, `mahadiscom.in`, `pmrda.gov.in`, `aaplesarkar.mahaonline.gov.in`).
4. **No Hardcoded AI Complaint Results**: Does not show hallucinated Gemini outputs. Validates form inputs and displays the structured Phase 2 Bridge contract without synthetic letters.
5. **No Exposed Secrets or Unnecessary Databases**: Zero API keys hardcoded; client-side memory staging with zero tracking database.
6. **Strict Accessibility**: Visible focus rings (`focus-visible:ring-2`), semantic HTML5 elements (`header`, `main`, `section`, `footer`), keyboard navigation (Escape key modal dismissal, Enter/Space key triggers).

---

## 📅 Phase 2 Integration Roadmap

- [ ] Connect Google Gemini 1.5 Pro / Flash via the prepared `server/src/routes/complaint.routes.ts` endpoint.
- [ ] Multilingual translation: Automated bilingual output generation in formal Marathi (मराठी) and English.
- [ ] Gemini Vision API: Automated damage severity calculation and visual geotag verification from uploaded photos.
- [ ] Automated grievance submission to PMC Care API and PCMC SARATHI API upon citizen confirmation.
