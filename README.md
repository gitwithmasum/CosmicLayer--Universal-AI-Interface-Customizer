# CosmicLayer — Universal AI Interface Customizer

A futuristic, local-first customization toolkit for supported AI workspaces.

**One Universe. Every AI Workspace. Your Style.**

[![Version](https://img.shields.io/badge/version-0.1.0--foundation-blue.svg)](package.json)
[![Manifest](https://img.shields.io/badge/manifest-v3-cyan.svg)](public/manifest.json)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue.svg)](tsconfig.json)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## Overview

CosmicLayer transforms supported AI interfaces into visually stunning, space-grade creative workspaces. Built with React 18, TypeScript, and Chrome Extension Manifest V3, CosmicLayer provides deep aesthetic personalization through elegant glassmorphism, bespoke cosmic color themes, and custom local wallpapers — all while upholding strict privacy and security standards.

---

## Foundation Architecture (v0.1.0)

```text
CosmicLayer/
├── public/
│   └── manifest.json            # Manifest V3 configuration with scoped permissions
├── src/
│   ├── main.tsx                 # Full Command Center entry point
│   ├── popup/
│   │   ├── main.tsx             # Extension toolbar popup entry
│   │   └── PopupApp.tsx         # Sleek 380px quick-control popup
│   ├── ui/
│   │   ├── App.tsx              # Command Center application shell
│   │   ├── components/          # 7 modular control center tabs & simulator
│   │   │   ├── Navbar.tsx
│   │   │   ├── SidebarNav.tsx
│   │   │   ├── OverviewTab.tsx
│   │   │   ├── AppearanceStudioTab.tsx
│   │   │   ├── BackgroundStudioTab.tsx
│   │   │   ├── PlatformIntegrationsTab.tsx
│   │   │   ├── ThemeLibraryTab.tsx
│   │   │   ├── SettingsTab.tsx
│   │   │   ├── PrivacyCenterTab.tsx
│   │   │   └── LiveMockupPreview.tsx
│   │   └── styles/
│   │       ├── variables.css    # Cosmic palette, glass surfaces, radii
│   │       └── main.css         # Reset, utilities, typography, reduced motion
│   ├── content/
│   │   ├── index.ts             # Content script dispatcher & storage subscriber
│   │   └── adapters/            # Individual platform adapters
│   │       ├── base.ts          # Common adapter interface & CSS variable generator
│   │       ├── chatgpt.ts       # ChatGPT adapter (chatgpt.com)
│   │       ├── claude.ts        # Claude adapter (claude.ai)
│   │       └── gemini.ts        # Gemini adapter (gemini.google.com)
│   ├── background/
│   │   └── index.ts             # MV3 background service worker
│   ├── shared/
│   │   ├── types.ts             # TypeScript definitions & default settings
│   │   ├── themes.ts            # 10 preset theme definitions & gradients
│   │   └── storage.ts           # Unified chrome.storage / localStorage abstraction
│   └── options/
│       └── main.tsx             # Extension options page entry
├── index.html                   # Command Center standalone & tab page
├── popup.html                   # Extension toolbar popup template
├── options.html                 # Extension options template
├── vite.config.ts               # UI bundle configuration
├── vite.content.config.ts       # Standalone IIFE content script packager
├── vite.background.config.ts    # Standalone service worker packager
├── package.json
└── tsconfig.json
```

---

## Current Working Features

### 1. Command Center Dashboard
- **Overview**: System health cards, customization toggle, theme status, active integrations summary, and live atmospheric preview.
- **Appearance Studio**: Real-time accent palette selection, custom color picker, glassmorphism blur and opacity controls, contrast enhancement, reduced-motion toggle, and live CSS token inspection.
- **Background Studio**:
  - Upload custom local wallpapers (PNG, JPG, WebP, GIF, SVG up to 5MB).
  - Background alignment (Center, Top, Bottom, Left, Right).
  - Background scaling (Cover, Contain, Exact 100%, Zoom 120%).
  - Real-time adjustment sliders: Brightness (50%–150%), Contrast (50%–150%), Saturation (0%–200%), Blur (0px–40px), Opacity (0%–90%).
  - Overlay tint presets (Midnight Navy, Deep Violet, Obsidian Void, Cosmic Gold).
  - Curated cosmic gradient library (8 space gradients).
- **Platform Integrations**:
  - Live technical inspection of ChatGPT, Claude, and Gemini browser adapters.
  - Per-platform enablement toggles.
  - Transparent documentation of technical safeguards.
- **Theme Library**:
  - 10 handcrafted theme presets:
    1. **Nebula Galaxy**: Interstellar indigo with magenta cosmic dust and cyan stars.
    2. **Cyberpunk Neon**: High-voltage electric cyan and neon magenta over obsidian.
    3. **Deep Space**: Vast celestial void navy with subtle distant starlight.
    4. **Cosmic Gold**: Stellar amber and celestial gold aura for focused clarity.
    5. **Midnight AMOLED**: True pitch black `#000000` with subtle boundaries.
    6. **Aurora Borealis**: Arctic emerald ribbons dancing over deep polar sea.
    7. **Quantum Blue**: Coherent cerulean and cobalt wave resonance.
    8. **Glass Universe**: Deep frosted glass translucency and luminous refractions.
    9. **Minimal Professional**: Understated slate and titanium for distraction-free sessions.
    10. **Solar Flare**: Energetic corona plasma with vibrant crimson and solar orange.
  - Instant live preview in simulator and one-click application.
- **Settings & Local Storage**:
  - Local Chrome storage quota monitor with byte calculation and usage meter.
  - One-click configuration export (`.json` backup).
  - Validated configuration import (`.json`).
  - Factory reset.
- **Privacy Center**:
  - Detailed 6-pillar privacy pledge.
  - Manifest V3 permissions audit with technical justifications.
  - Live local storage data inspector.

### 2. Live Workspace Simulator
- Embedded interactive simulator replicating ChatGPT, Claude, and Gemini interfaces.
- Real-time updates as you adjust brightness, contrast, blur, opacity, or themes.

### 3. Extension Action Popup
- 380px quick-control menu accessible from the Chrome toolbar.
- Quick theme switcher with all 10 presets.
- Quick wallpaper upload and removal.
- Atmospheric intensity slider.
- Direct launcher to the full Command Center.

### 4. Non-Destructive Browser Adapters
- Separate modular adapters for **ChatGPT**, **Claude**, and **Gemini**.
- Injects an isolated background container (`#cosmiclayer-background`) behind the native web page.
- Uses scoped CSS variables for theme and filter styling.
- Safe MutationObserver throttled for SPA navigation without querying or touching conversation elements.

---

## Installation & Loading in Chrome

### Prerequisites
- Node.js 18+ and npm installed.
- Google Chrome or any Chromium-compatible browser (Brave, Edge, Arc).

### 1. Build the Extension
```bash
# Clone the repository and switch to the foundation branch
git clone https://github.com/gitwithmasum/CosmicLayer--Universal-AI-Interface-Customizer.git
cd CosmicLayer--Universal-AI-Interface-Customizer
git checkout feat/cosmiclayer-foundation

# Install dependencies
npm install

# Run type check and unit tests
npm run typecheck
npm test

# Build production bundles
npm run build
```

The production extension files will be created in the `dist/` directory.

### 2. Load into Chrome
1. Open Google Chrome and navigate to `chrome://extensions/`.
2. Enable **Developer mode** via the toggle in the upper-right corner.
3. Click the **Load unpacked** button in the upper-left corner.
4. Select the `dist/` folder inside the CosmicLayer repository.
5. The **CosmicLayer — Universal AI Interface Customizer** extension is now active.
6. Click the extension puzzle icon in the Chrome toolbar and pin CosmicLayer.
7. Click the icon to open the quick popup, or click **Open Full Command Center** to open the full dashboard.
8. Navigate to [ChatGPT](https://chatgpt.com), [Claude](https://claude.ai), or [Gemini](https://gemini.google.com) to experience your personalized workspace.

---

## Development Commands

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts Vite local development server for interactive dashboard design. |
| `npm run build` | Compiles TypeScript and builds all extension bundles (`dist/index.html`, `dist/popup.html`, `dist/options.html`, `dist/content.js`, `dist/background.js`). |
| `npm run typecheck` | Executes `tsc -b --pretty` to verify TypeScript strict mode compliance. |
| `npm test` | Runs the Vitest test suite. |
| `npm run preview` | Previews the production dashboard build locally. |

---

## Privacy & Security Principles

CosmicLayer is engineered on strict local-first privacy rules:

- **100% Local Processing & Storage**: Custom wallpapers, color choices, and preferences remain solely inside your browser's private `chrome.storage.local`. Wallpapers are never uploaded to remote servers.
- **Zero Access to AI Conversations**: Content scripts never inspect, query, scrape, or log user prompts, AI replies, chat histories, or file attachments.
- **Zero Credential Access**: CosmicLayer never requests or reads cookies, passwords, authentication tokens, session IDs, or account tokens.
- **Minimum Permissions**: Requests only `storage` and `activeTab`, alongside explicitly declared host permissions for `chatgpt.com`, `claude.ai`, and `gemini.google.com`. No broad `<all_urls>` permission is requested.
- **Zero Telemetry**: No third-party analytics, tracking pixels, or remote telemetry.

---

## Roadmap: Desktop & Terminal Platforms

A Chrome browser extension operates within browser tabs and cannot inject styles into native desktop or terminal applications. CosmicLayer will expand to these developer surfaces through dedicated native integrations:

| Platform | Interface Type | Target Integration Method | Status |
| :--- | :--- | :--- | :--- |
| **ChatGPT** | Browser Web App | Manifest V3 Content Script | **Foundation Ready** |
| **Claude** | Browser Web App | Manifest V3 Content Script | **Foundation Ready** |
| **Gemini** | Browser Web App | Manifest V3 Content Script | **Foundation Ready** |
| **Google Antigravity** | Desktop IDE | Native Antigravity IDE Theme / Extension API | *Planned (Phase 2)* |
| **Claude Code** | Terminal CLI | ANSI Theme / Terminal Config Profile | *Planned (Phase 2)* |
| **OpenAI Codex** | Cloud / IDE API | Dedicated Editor Extension Bundle | *Planned (Phase 3)* |

*No simulated or fake connection states are used; unsupported surfaces are clearly marked as Planned.*

---

## Known Limitations

- **Browser Storage Quota**: The standard `chrome.storage.local` quota is 5MB. Custom wallpaper images must be 5MB or smaller.
- **Native Desktop & Terminal Workspaces**: Native desktop applications cannot be customized via browser content scripts; these will be implemented via dedicated IDE packages.
- **Host DOM Changes**: While CosmicLayer injects an isolated `#cosmiclayer-background` container to maximize resilience, host AI applications may periodically change DOM structures or dark-mode color tokens.

---

## License

MIT License. Designed and built with pride by the CosmicLayer team.
