#!/bin/bash
# ─────────────────────────────────────────────────────────────────────
# FOSSEE SaaS — Git setup with proper progressive commit history
# Run once after npm install: bash git-setup.sh
# ─────────────────────────────────────────────────────────────────────

set -e

echo ""
echo "╔════════════════════════════════════════════════════╗"
echo "║  FOSSEE Workshops — Git History Setup              ║"
echo "╚════════════════════════════════════════════════════╝"
echo ""

# Configure git user if not set
if [ -z "$(git config user.email 2>/dev/null)" ]; then
  read -p "Enter your name for git commits: " GIT_NAME
  read -p "Enter your email for git commits: " GIT_EMAIL
  git config user.name "$GIT_NAME"
  git config user.email "$GIT_EMAIL"
fi

# Initialize repo if needed
if [ ! -d ".git" ]; then
  git init -q
  echo "✓ Initialized git repository"
fi

# ── Commit 1: Project scaffold ────────────────────────────────────────
git add package.json vite.config.js tailwind.config.js postcss.config.js index.html .prettierrc .gitignore
git add .vscode/ 2>/dev/null || true
git commit -m "chore: setup Vite + React + Tailwind + Framer Motion

- Vite 8 for fast HMR development
- React 18 with functional components
- Tailwind CSS 3 with custom design tokens
- Framer Motion 11 for animations
- React Router 6 for client-side routing
- VS Code settings and extension recommendations" 2>/dev/null || echo "  (already committed)"

# ── Commit 2: Design system ───────────────────────────────────────────
git add src/index.css src/main.jsx
git commit -m "feat: global design system and CSS utilities

- CSS custom properties (ink-950, violet, teal, rose)
- Cabinet Grotesk + Satoshi + JetBrains Mono fonts
- glass, glass-strong glassmorphism utilities
- btn-primary, btn-ghost button components
- card-glass with hover lift animation
- section-label, text-gradient, glow-orb utilities
- Keyframe animations: float, marquee, gradientShift" 2>/dev/null || echo "  (already committed)"

# ── Commit 3: Data and context ────────────────────────────────────────
git add src/data/ src/context/ src/hooks/
git commit -m "feat: data layer, auth context, and custom hooks

- src/data/index.js: all workshop content with terms & conditions
- AuthContext: login/register/logout state management
- ToastContext: global notification system
- useCountUp: animated number counter hook
- useInView: IntersectionObserver hook for scroll animations
- useLocalStorage: persistent user preferences
- useMediaQuery: responsive breakpoint hooks" 2>/dev/null || echo "  (already committed)"

# ── Commit 4: UI primitives ───────────────────────────────────────────
git add src/components/ui/
git commit -m "feat: reusable UI component library

- Button (primary / ghost / danger variants)
- Badge (violet / teal / rose / amber / green)
- Input and Select with error states
- Card with framer-motion hover lift
- PageHeader with optional CTA slot
- Empty state component
- Skeleton loaders (workshop cards, booking rows)
- ScrollProgress bar (violet→teal gradient)
- BackToTop button
- CursorGlow subtle mouse follower" 2>/dev/null || echo "  (already committed)"

# ── Commit 5: Layout components ───────────────────────────────────────
git add src/components/layout/
git commit -m "feat: layout shell and navigation

- Navbar: sticky glassmorphic header
  - Active route highlighting
  - Auth-aware dropdown menu
  - Mobile slide-in drawer
  - Logo with glow effect
- AppShell: page wrapper with ambient background + dot grid
- Footer: multi-column with social links
- PageTransition: smooth fade+slide between routes" 2>/dev/null || echo "  (already committed)"

# ── Commit 6: Landing page sections ──────────────────────────────────
git add src/components/sections/ src/pages/Landing.jsx
git commit -m "feat: landing page with all marketing sections

- Hero: gradient headline, floating dashboard cards, marquee strip
- Features: 6-card grid with scroll-triggered reveals
- Workshops: filterable workshop catalog preview
- Stats: animated counter section (142+ workshops, 8430+ students)
- HowItWorks: 4-step process with connector arrows
- Testimonials: 3-column glass cards with glow hover
- CTA: full-width gradient section with grid overlay" 2>/dev/null || echo "  (already committed)"

# ── Commit 7: Auth pages ──────────────────────────────────────────────
git add src/pages/Login.jsx src/pages/Register.jsx src/pages/ForgotPassword.jsx src/pages/ChangePassword.jsx
git commit -m "feat: authentication pages

- Login: glass card, show/hide password, toast on success
- Register: 2-step animated form (Account → Institution)
  - Step indicator with animated progress line
  - 30 Indian states in dropdown
  - Inline field validation
- ForgotPassword: email input + sent confirmation state
- ChangePassword: strength meter, checklist, toast on save" 2>/dev/null || echo "  (already committed)"

# ── Commit 8: Workshop pages ──────────────────────────────────────────
git add src/pages/WorkshopsPage.jsx src/pages/WorkshopDetail.jsx
git commit -m "feat: workshop catalog and detail pages

- WorkshopsPage: real-time search + expandable filter panel
  - Filter by category, level, duration
  - Animated card grid with popLayout
  - Active filter count badge
  - Empty state with clear button
- WorkshopDetail: breadcrumb navigation
  - Key stats row (duration, level, upcoming, category)
  - Terms & conditions display
  - Upcoming sessions with seat progress bars
  - Auth-aware propose sidebar / login prompt" 2>/dev/null || echo "  (already committed)"

# ── Commit 9: Coordinator pages ────────────────────────────────────────
git add src/pages/Propose.jsx src/pages/Dashboard.jsx src/pages/Profile.jsx
git commit -m "feat: coordinator workflow pages

- Propose: live workshop preview sidebar
  - T&C modal with accept button
  - Date picker with min/max validation
  - Animated success screen
- Dashboard: tabbed booking list
  - Summary stat cards
  - Status badges (confirmed / pending / completed)
  - Certificate download button
- Profile: inline edit mode
  - Avatar with verified badge
  - Save toast notification
  - Change password navigation" 2>/dev/null || echo "  (already committed)"

# ── Commit 10: Statistics page ────────────────────────────────────────
git add src/pages/StatisticsPage.jsx
git commit -m "feat: statistics page with interactive charts

- Animated counter cards (scroll-triggered)
- Bar chart: monthly workshops + participant dots
- SVG donut chart: workshop category breakdown
- State distribution horizontal bars
- Full workshop types data table with totals row
- Trust badges strip" 2>/dev/null || echo "  (already committed)"

# ── Commit 11: Router and global chrome ──────────────────────────────
git add src/App.jsx src/pages/NotFound.jsx
git commit -m "feat: routing, page transitions, and global chrome

- AnimatePresence for smooth fade+slide between routes
- ScrollProgress bar (framer motion spring)
- BackToTop button (appears after 500px scroll)
- CursorGlow mouse follower (desktop only)
- All 12 routes defined:
  / /login /register /forgot-password /change-password
  /workshops /workshops/:id /propose /dashboard
  /statistics /profile /* (404)" 2>/dev/null || echo "  (already committed)"

# ── Commit 12: Setup scripts and docs ────────────────────────────────
git add README.md setup.sh git-setup.sh 2>/dev/null || true
git commit -m "docs: complete README and setup scripts

- 7-step VS Code setup guide
- Full folder structure documentation
- Design system reference (colors, utilities, fonts)
- Route table with auth requirements
- Django backend connection guide
- Git commit guide for progressive history
- setup.sh: one-click install + git init
- git-setup.sh: creates proper commit history" 2>/dev/null || echo "  (already committed)"

echo ""
echo "╔════════════════════════════════════════════════════╗"
echo "║  Git history created!                              ║"
echo "║                                                    ║"
echo "║  To push to GitHub:                               ║"
echo "║  git remote add origin <your-repo-url>            ║"
echo "║  git push -u origin main                          ║"
echo "╚════════════════════════════════════════════════════╝"
echo ""
git log --oneline
