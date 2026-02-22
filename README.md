# NeuroLearn — Mini AI Learning Dashboard

<div align="center">
  <h3>🚀 A production-grade AI Learning Dashboard built with Next.js 14</h3>
  <p>Modern SaaS-inspired UI • Dark Mode • Animated Skeletons • Responsive Design</p>
</div>

---

## 📖 Project Overview

**NeuroLearn** is a feature-rich AI learning dashboard built as a frontend engineering showcase. It simulates a real-world SaaS learning platform with course discovery, progress tracking, and lesson management — designed to demonstrate scalable React architecture, polished UX, and clean code.

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | CSS Modules + CSS Variables |
| State | React Hooks (useState, useMemo, useEffect) |
| Persistence | localStorage |
| Fonts | Google Fonts — Inter |
| Routing | Next.js App Router |
| Mobile | React Native (bonus screen) |

---

## ✅ Features Implemented

### 🔐 Login Page
- Email + password form with **real-time field validation**
- Blur-triggered error display with accessible error messages
- Loading spinner state during simulated auth
- Animated gradient background blobs
- Social login buttons (UI only)
- **Session Persistence**: Saves `isLoggedIn` state in `localStorage` for seamless return visits
- **Route Protection**: Automated redirect to dashboard upon successful validation
- **Logout Lifecycle**: Full session termination via dedicated logout in Navbar

### 📊 Dashboard Page
- **4-stat summary strip** (Total / Avg Progress / Completed / In Progress)
- Real-time **search filtering** by title, category, or instructor
- **Loading skeletons** (6 cards) with shimmer animation — no spinners
- **Empty state UI** when no search results match
- Staggered card entrance animations
- Each course card shows: icon, title, description, instructor avatar, badge, progress bar, category

### 📚 Course Detail Page (`/course/:id`)
- Structured **lesson list** (video / article / quiz types)
- **Toggle lesson completion** with animated checkbox
- **SVG circular progress ring** that updates live as lessons are toggled
- Completed lessons shown with strikethrough text
- Completion state **persisted in localStorage** per course
- Graceful 404 for invalid course IDs

### 🌙 Dark Mode
- CSS variable-based theming (`[data-theme="dark"]`)
- Persisted across sessions via **localStorage**
-detects system preference on first first visit
- Smooth transitions on all surfaces

### 🔐 Route Protection (`AuthGuard`)
- Custom **Higher-Order Component** pattern to wrap sensitive routes
- Validates auth state before rendering children
- Redirects unauthenticated users to home immediately
- Ensures the `dashboard` and `course` details are only accessible to valid sessions

### 📱 React Native Bonus (`rn-app/App.tsx`)
- Course list with `FlatList`
- Animated `Animated.Value` progress bars
- Dark mode toggle via `Switch`
- Stats card with 4 metrics
- Fully self-contained (no Expo dependencies assumed)

---

## 🤖 How AI Tools Were Used

AI assistance (GitHub Copilot / Claude) was used to:
1. **Scaffold component boilerplate** — quickly generate prop interfaces and initial JSX structure
2. **CSS animation patterns** — shimmer keyframes, progress fill transitions, and ring stroke calculations
3. **SVG math** — `strokeDasharray` / `strokeDashoffset` formula for the circular progress ring
4. **Accessibility attributes** — `role`, `aria-valuenow`, `tabIndex`, `aria-label` reminders
5. **README generation** — initial draft refined and expanded manually

All core logic (validation, hooks, localStorage persistence, filtering) was written and reviewed manually.

---

## 🧠 How the AI Works (Integration & Simulation)

This project demonstrates AI in three distinct ways:

1.  **AI-Curated Content**: The curriculum (stored in `data/courses.ts`) is structured as if an AI agent had analyzed a student's current skill set and generated a personalized "Learning Path" (accessible via the `?tab=path` route).
2.  **Intelligent UI Reactivity**: The application uses **client-side state hooks** to intelligently and instantly update progress rings and stat cards without reloading, simulating the responsiveness of an AI companion.
3.  **Advanced Code Generation**: The codebase itself was developed using **Agentic AI (Antigravity)**, representing a "Co-pilot" development style where high-level intent is translated into production-grade TypeScript and CSS.


---

## 🧩 Challenges Faced

1. **SVG Ring Progress** — Calculating `strokeDashoffset` from live `completedIds` state required deriving the progress in-component rather than from the static mock data.
2. **Dark Mode Flash (FOUC)** — Prevented by reading `localStorage` + system preference inside `useEffect` and using `suppressHydrationWarning` on `<html>`.
3. **Type-safe localStorage** — The generic `useLocalStorage<T>` hook needed careful handling for first-time (null) reads without breaking the TypeScript contract.
4. **Next.js 14 `params` as Promise** — The App Router introduced `params` as an async Promise in Next.js 15, requiring `use(params)` for proper streaming support.
5. **Auth Guard Logic** — Since we used `localStorage` for simulation (client-side only), implementing a standard Next.js `middleware.ts` was avoided in favor of a client-side `AuthGuard` to ensure access to browser storage while preventing layout shifts.

---

## 🚀 Future Improvements

- [ ] Add **authentication** (NextAuth.js + JWT)
- [ ] Replace mock data with a **real API** (REST or GraphQL)
- [ ] Add **video player** for lesson content
- [ ] Implement **course enrollment** flow
- [ ] Add **notifications** system
- [ ] Introduce **Zustand** or **Redux Toolkit** for global state as app scales
- [ ] Add **unit tests** (Jest + React Testing Library)
- [ ] Add **E2E tests** (Playwright)
- [ ] Implement **PWA** manifest for offline access
- [ ] Internationalisation (i18n) support

---

## 📦 Setup Instructions

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd ai-learning-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 🌐 Deployment on Vercel

The easiest way to deploy is via the **Vercel CLI** or the **GitHub integration**.

### Option A — Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Option B — GitHub Integration

1. Push the repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your repository
4. Vercel auto-detects Next.js — click **Deploy**
5. Your live URL is ready in ~60 seconds

### Environment Variables
No environment variables are required for this demo. Add them in Vercel's **Settings → Environment Variables** if you extend with a real backend.

---

## 📁 Folder Structure

```
ai-learning-dashboard/
├── app/
│   ├── globals.css              # Design tokens + CSS variables
│   ├── layout.tsx               # Root layout with ThemeProvider
│   ├── page.tsx                 # Login page
│   ├── page.module.css
│   ├── dashboard/
│   │   ├── page.tsx             # Dashboard with search + skeletons
│   │   └── page.module.css
│   └── course/[id]/
│       ├── page.tsx             # Course detail + lesson toggle
│       └── page.module.css
├── components/
│   ├── ui/
│   │   ├── Card.tsx             # Base card with hover lift
│   │   ├── ProgressBar.tsx      # Animated progress bar
│   │   ├── Skeleton.tsx         # Shimmer skeleton loader
│   │   ├── SearchInput.tsx      # Search with clear button
│   │   └── Badge.tsx            # Status badge with variants
│   └── layout/
│       ├── Navbar.tsx           # Top nav with dark toggle
│       └── Sidebar.tsx          # Fixed sidebar with Pro CTA
├── context/
│   └── ThemeContext.tsx         # Global dark mode context
├── data/
│   └── courses.ts               # Mock course + lesson data
├── hooks/
│   ├── useCourses.ts            # Data loader with fake delay
│   └── useLocalStorage.ts       # Generic localStorage hook
└── rn-app/
    └── App.tsx                  # React Native bonus screen
```

---

<div align="center">
  <p>Built with ❤️ as a frontend engineering showcase</p>
</div>
