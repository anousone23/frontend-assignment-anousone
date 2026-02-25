# Real-Time Patient Registration System

## Overview

This project is a responsive, real-time patient input form and staff dashboard. It features two main interfaces:

1. **Patient Form**: A responsive, internationalized form allowing patients to securely input their personal medical details.
2. **Staff Dashboard**: A live, real-time interface for medical staff to monitor patients currently filling out the form, complete with dynamic status indicators (Active, Inactive, Submitted).

The synchronization between the two interfaces occurs instantly using WebSockets (Pusher), providing a seamless low latency experience for both the patient and the medical staff.

## Tech Stack

- **Framework:** Next.js (React 19, App Router)
- **Styling:** Tailwind CSS, Shadcn UI
- **Real-Time Communication:** Pusher WebSockets
- **State Management:** Zustand
- **Form Validation:** React Hook Form + Zod
- **Internationalization:** next-intl

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Pusher account for WebSocket credentials

### 1. Clone the repository

```bash
git clone [repository-url]
cd frontend-assignment-anousone
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory and add your Pusher credentials:

```env
# Pusher Credentials
NEXT_PUBLIC_PUSHER_APP_KEY=your_app_key
NEXT_PUBLIC_PUSHER_CLUSTER=your_cluster
PUSHER_APP_ID=your_app_id
PUSHER_SECRET=your_secret
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can use the large navigation buttons on the homepage, or manually navigate to the links below:

- Click **Patient Form** or navigate to `/patient/register` to view the Patient Form.
- Click **Staff Dashboard** or navigate to `/staff/dashboard` to view the live dashboard.

---

## Bonus Features Implemented

I went above and beyond the core requirements to deliver a highly robust, production-ready application:

### 1. Full Internationalization (i18n)

Complete English and Thai language support using `next-intl`. Users can toggle languages seamlessly, and the entire UI (including Zod validation error messages and Staff Data Tables) translates instantly.

### 2. Concurrent User Support (UUIDs)

The application scales to support multiple patients simultaneously. Each patient session generates a unique UUID upon initialization, preventing WebSocket data collisions and rendering conceptually distinct cards on the Staff Dashboard.

### 3. Advanced State Normalization (Zustand)

Leveraged `zustand` to build a highly-performant `Record<string, PatientData>` global state manager. By normalizing the data dictionary, I guarantee instant socket updates without lagging or forcing full array re-renders.

### 4. Three-Tier Activity Tracking

Engineered precise UX indicators using React hook closures and timeouts:

- 🟢 **Active:** A pulsing beacon tracking active typists in real-time.
- 🟡 **Inactive:** A safe 5-second debounce degrades the user status to "Inactive" if they step away from their keyboard.
- ✅ **Submitted:** Smoothly transitions finalized forms from the live grid into a permanent data table, safely ignoring subsequent React unmount "disconnect" signals.
- 🔴 **Disconnected:** Instantly strips abandoned cards from the DOM if a patient closes their browser tab without submitting. Uses a dedicated `navigator.sendBeacon` API route bound to the `pagehide` event to guarantee socket unmount delivery even if the browser forcibly aborts standard `fetch` networking in background tabs.

### 5. Premium Modern UI

Utilized Shadcn UI along with custom Tailwind configurations to deliver glassmorphism effects, smooth interactive micro-animations, mobile-first responsive grid tiering, and full semantic Dark Mode support.
