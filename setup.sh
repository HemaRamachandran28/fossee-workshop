#!/bin/bash
# ─────────────────────────────────────────────────────────
# FOSSEE SaaS — One-click project setup script
# Run: bash setup.sh
# ─────────────────────────────────────────────────────────

set -e

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║  FOSSEE Workshops — SaaS Setup               ║"
echo "╚══════════════════════════════════════════════╝"
echo ""

# 1. Check Node version
NODE_VERSION=$(node -v 2>/dev/null | sed 's/v//' | cut -d. -f1)
if [ -z "$NODE_VERSION" ] || [ "$NODE_VERSION" -lt 18 ]; then
  echo "❌ Node.js 18+ is required. Download from https://nodejs.org"
  exit 1
fi
echo "✓ Node.js $(node -v)"

# 2. Install dependencies
echo "→ Installing dependencies..."
npm install --silent
echo "✓ Dependencies installed"

# 3. Initialize git (if not already)
if [ ! -d ".git" ]; then
  git init -q
  git add .
  git commit -m "feat: initial FOSSEE SaaS redesign setup" -q
  echo "✓ Git repository initialized with first commit"
else
  echo "✓ Git repository already exists"
fi

echo ""   
echo "╔══════════════════════════════════════════════╗"
echo "║  Setup complete! Next steps:                 ║"
echo "║                                              ║"
echo "║  npm run dev    → Start dev server           ║"
echo "║  Open: http://localhost:5173                 ║"
echo "╚══════════════════════════════════════════════╝"
echo ""
