# FOSSEE Workshops — Premium SaaS Redesign

A ground-up redesign of the FOSSEE Workshop Booking platform as a **production-grade SaaS web app** built with React + Vite + Tailwind CSS + Framer Motion.

---

## 🚀 Step-by-Step Setup in VS Code

### Prerequisites
Install these before starting:
- **Node.js 18+** → https://nodejs.org (choose LTS)
- **VS Code** → https://code.visualstudio.com
- **Claude extension** → already installed (you're here!)

---

### Step 1 — Open the Project Folder

1. Unzip `fossee-saas-redesign.zip` anywhere on your computer
2. Open **VS Code**
3. Go to **File → Open Folder**
4. Select the `fossee-saas` folder → click **Open**

You should see the folder structure on the left sidebar.

---

### Step 2 — Open the Integrated Terminal

Press **Ctrl + `** (backtick key, top-left of keyboard)

Or go to **Terminal → New Terminal** from the menu bar.

---

### Step 3 — Install Dependencies

In the terminal, type exactly:

```bash
npm install
```

Wait for it to finish (30–60 seconds). You'll see a `node_modules` folder appear.

---

### Step 4 — Start the Development Server

```bash
npm run dev
```

You'll see output like:
```
  VITE v8.x.x  ready in 300ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```

Open your browser and go to **http://localhost:5173**

The app hot-reloads — **any file you save instantly updates in the browser**.

---

### Step 5 — Explore & Edit

| What you want to do | Where to look |
|---|---|
| Change workshop content | `src/data/index.js` |
| Edit the home page hero | `src/components/sections/Hero.jsx` |
| Change colors/fonts | `tailwind.config.js` + `src/index.css` |
| Add a new page | Create `src/pages/NewPage.jsx`, add route in `src/App.jsx` |
| Edit navigation links | `src/components/layout/Navbar.jsx` |

---

### Step 6 — Using Claude in VS Code

With the Claude extension active:

- **Select any code** → right-click → **"Ask Claude"** to explain or modify it
- **Open Claude chat** (sidebar icon) and ask things like:
  - *"Add a dark/light mode toggle"*
  - *"Create a new page for workshop feedback"*
  - *"Make the hero section text larger on mobile"*
- **Inline edits** — highlight code, use the Claude shortcut, describe your change

---

### Step 7 — Build for Production

When you're ready to submit or deploy:

```bash
npm run build
```

This creates a `dist/` folder with optimized static files.

To preview the production build locally:
```bash
npm run preview
```

---

## 📁 Complete Folder Structure

```
fossee-saas/
├── index.html                         ← HTML shell + SEO meta tags
├── vite.config.js                     ← Build config
├── tailwind.config.js                 ← Design tokens (colors, fonts, animations)
├── postcss.config.js
├── package.json
│
└── src/
    ├── main.jsx                       ← Entry point
    ├── App.jsx                        ← Router — all routes defined here
    ├── index.css                      ← Global styles, CSS utilities, animations
    │
    ├── context/
    │   └── AuthContext.jsx            ← Login/logout state (mirrors Django session)
    │
    ├── data/
    │   └── index.js                   ← All content (workshops, stats, testimonials)
    │
    ├── hooks/
    │   └── useCountUp.js              ← Animated counter + IntersectionObserver
    │
    ├── components/
    │   ├── layout/
    │   │   ├── AppShell.jsx           ← Page wrapper (navbar + ambient bg + footer)
    │   │   ├── Navbar.jsx             ← Sticky glassmorphic nav + mobile drawer
    │   │   └── Footer.jsx             ← Multi-column footer
    │   │
    │   ├── sections/                  ← Landing page sections
    │   │   ├── Hero.jsx               ← Hero with dashboard preview + marquee strip
    │   │   ├── Features.jsx           ← 6-card feature grid
    │   │   ├── Workshops.jsx          ← Filterable workshop catalog (landing preview)
    │   │   ├── Stats.jsx              ← Animated counter stats
    │   │   ├── HowItWorks.jsx         ← 4-step process timeline
    │   │   ├── Testimonials.jsx       ← 3-column testimonial cards
    │   │   └── CTA.jsx                ← Final call-to-action
    │   │
    │   └── ui/
    │       └── index.jsx              ← Button, Badge, Input, Select, Card, Empty
    │
    └── pages/
        ├── Landing.jsx                ← Home page (all sections)
        ├── Login.jsx                  ← Auth: sign in
        ├── Register.jsx               ← Auth: 2-step registration
        ├── WorkshopsPage.jsx          ← Full workshop catalog with search + filter
        ├── WorkshopDetail.jsx         ← Individual workshop detail + propose sidebar
        ├── Propose.jsx                ← Propose a workshop form + T&C modal
        ├── Dashboard.jsx              ← My bookings / workshop status
        ├── StatisticsPage.jsx         ← Charts + animated counters + data table
        ├── Profile.jsx                ← Edit profile, sign out
        └── NotFound.jsx               ← 404 page
```

---

## 🎨 Design System

### Fonts
- **Cabinet Grotesk** — display headings (geometric, authoritative)
- **Satoshi** — body text (crisp at small sizes)
- **JetBrains Mono** — labels, code snippets

### Color Palette
| Token | Value | Use |
|---|---|---|
| `ink-950` | `#050508` | Page background |
| `ink-900` | `#0c0c14` | Surface |
| `ink-800` | `#12121e` | Elevated surface |
| `violet-500` | `#8b5cf6` | Primary accent |
| `teal-400` | `#2dd4bf` | Secondary accent |
| `rose-400` | `#fb7185` | Tertiary / danger |

### Key CSS Utilities
```css
.text-gradient       /* Animated violet→teal→rose gradient text */
.glass               /* Frosted glass card background */
.glass-strong        /* Heavier glass (modals, drawers) */
.btn-primary         /* Violet gradient button with glow */
.btn-ghost           /* Transparent border button */
.card-glass          /* Card with glass bg + hover lift */
.section-label       /* Pill label (e.g. "Workshop Catalog") */
.glow-orb            /* Blurred ambient color blob */
```

---

## 🔌 All Routes

| URL | Page | Auth required |
|---|---|---|
| `/` | Landing (hero + all sections) | No |
| `/login` | Login | No |
| `/register` | 2-step registration | No |
| `/workshops` | Browse all workshops | No |
| `/workshops/:id` | Workshop detail | No |
| `/statistics` | Platform stats + charts | No |
| `/propose` | Propose a workshop | Yes |
| `/dashboard` | My bookings | Yes |
| `/profile` | Edit profile | Yes |
| `*` | 404 Not Found | - |

---

## 🔧 Recommended VS Code Extensions

Install these for the best experience:

| Extension | Publisher | Why |
|---|---|---|
| **ES7+ React/Redux/React-Native snippets** | dsznajder | Type `rafce` → instant component |
| **Tailwind CSS IntelliSense** | Bradlc | Autocomplete for all Tailwind classes |
| **Prettier – Code formatter** | Prettier | Auto-format on save |
| **Auto Rename Tag** | Jun Han | Rename opening tag → closing tag updates too |
| **GitLens** | GitKraken | Visualize git commits (needed for submission) |

Configure Prettier to format on save:
1. Open **Settings** (Ctrl + ,)
2. Search `format on save` → enable it
3. Search `default formatter` → select `Prettier`

---

## 🔌 Connecting to the Django Backend

All content lives in `src/data/index.js`. To wire up the real API:

```jsx
// Before (static mock data):
import { workshopTypes } from '../data/index.js';

// After (real API):
import { useState, useEffect } from 'react';

const [workshopTypes, setWorkshopTypes] = useState([]);
useEffect(() => {
  fetch('/api/workshop-types/')
    .then(r => r.json())
    .then(setWorkshopTypes)
    .catch(console.error);
}, []);
```

**Configure CORS in Django** (`settings.py`):
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Vite dev server
]
```

**Replace auth context** (`src/context/AuthContext.jsx`) login function:
```jsx
const login = async (username, password) => {
  const res = await fetch('/api/login/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (res.ok) { setUser(data.user); return { ok: true }; }
  return { ok: false, error: data.error };
};
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Layout |
|---|---|---|
| Mobile | < 640px | 1-col grids, bottom sheet nav, stacked hero |
| Tablet | 640–1024px | 2-col grids, condensed hero |
| Desktop | 1024px+ | 3-col grids, floating hero cards, full nav |

---

## 🚀 Git Commit Guide (for submission)

The checklist requires progressive commits. After making each change:

```bash
git add .
git commit -m "feat: describe what you changed"
```

Suggested commit sequence:
```
feat: initial Vite + Tailwind + Framer Motion setup
feat: design tokens and global CSS utilities
feat: glassmorphic navbar with mobile drawer
feat: hero section with dashboard preview
feat: features, workshops, stats sections
feat: how-it-works and testimonials
feat: login and 2-step register pages
feat: workshops catalog with search and filter
feat: workshop detail page
feat: propose workshop with T&C modal
feat: dashboard / my bookings page
feat: statistics page with charts
feat: profile page
docs: complete README with setup guide
```

---

## ⚡ Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| React | 18 | UI framework |
| Vite | 8 | Build tool (fast HMR) |
| Tailwind CSS | 3 | Utility-first styling with custom tokens |
| Framer Motion | 11 | Scroll-triggered animations |
| React Router | 6 | Client-side routing |
| Lucide React | Latest | Icon library |

---

*Redesigned as part of the FOSSEE Python Screening Task — UI/UX Enhancement.*
*Original Django project by the FOSSEE group, IIT Bombay — funded by MHRD, Govt. of India.*
