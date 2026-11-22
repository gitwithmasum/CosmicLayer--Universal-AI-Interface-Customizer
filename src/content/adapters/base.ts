import type { CosmicSettings } from "../../shared/types";
import { THEMES } from "../../shared/themes";
import { NAVBAR_PRESETS } from "../../shared/types";

export interface PlatformAdapter {
  readonly id: "chatgpt" | "claude" | "gemini";
  readonly name: string;
  readonly hostnames: string[];
  matches(hostname: string): boolean;
  apply(settings: CosmicSettings): void;
  cleanup(): void;
}

export const LAYER_CONTAINER_ID = "cosmiclayer-background";
export const STYLE_CONTAINER_ID = "cosmiclayer-style";
export const BADGE_CONTAINER_ID = "cosmiclayer-navbar-badge";

export function ensureBackgroundLayer(): HTMLElement {
  let layer = document.getElementById(LAYER_CONTAINER_ID);
  if (!layer) {
    layer = document.createElement("div");
    layer.id = LAYER_CONTAINER_ID;
    layer.setAttribute("aria-hidden", "true");
    document.documentElement.prepend(layer);
  }
  return layer;
}

export function removeCustomStylesAndLayer(): void {
  document.getElementById(STYLE_CONTAINER_ID)?.remove();
  document.getElementById(LAYER_CONTAINER_ID)?.remove();
  document.getElementById(BADGE_CONTAINER_ID)?.remove();
  clearSidebarHarmonization();
}

export function clearSidebarHarmonization(): void {
  const existingSidebar = document.querySelector('[data-cosmiclayer-sidebar="true"]');
  if (existingSidebar) {
    existingSidebar.removeAttribute("data-cosmiclayer-sidebar");
    existingSidebar.removeAttribute("data-cosmiclayer-collapsed");
  }
  document.querySelectorAll('[data-cosmiclayer-profile-card="true"]').forEach((el) => el.removeAttribute("data-cosmiclayer-profile-card"));
  document.querySelectorAll('[data-cosmiclayer-profile-btn="true"]').forEach((el) => el.removeAttribute("data-cosmiclayer-profile-btn"));
  document.querySelectorAll('[data-cosmiclayer-profile-avatar="true"]').forEach((el) => el.removeAttribute("data-cosmiclayer-profile-avatar"));
  document.querySelectorAll('[data-cosmiclayer-profile-text="true"]').forEach((el) => el.removeAttribute("data-cosmiclayer-profile-text"));
  document.querySelectorAll('[data-cosmiclayer-profile-name="true"]').forEach((el) => el.removeAttribute("data-cosmiclayer-profile-name"));
  document.querySelectorAll('[data-cosmiclayer-profile-plan="true"]').forEach((el) => el.removeAttribute("data-cosmiclayer-profile-plan"));
  document.querySelectorAll('[data-cosmiclayer-profile-upgrade="true"]').forEach((el) => el.removeAttribute("data-cosmiclayer-profile-upgrade"));
  document.querySelectorAll(".cosmiclayer-status-dot").forEach((el) => el.remove());
}

export function harmonizeProfileCard(sidebar: HTMLElement): void {
  // Target the profile footer strictly docked at the bottom of the sidebar
  const footer = sidebar.querySelector<HTMLElement>(
    'div.sticky.bottom-0, aside > div:last-child, nav ~ div:last-child, div[class*="sidebar"] > div:last-child, div.p-2:has(button)'
  );
  const targetScope = footer || sidebar;

  const profileBtn = targetScope.querySelector<HTMLElement>(
    'button[data-testid="profile-button"], button[aria-haspopup="menu"]:has(img, [class*="avatar"], div.rounded-full), button:has(div.font-semibold:has(+ div))'
  );
  if (!profileBtn) return;

  const cardContainer = footer || profileBtn.closest<HTMLElement>('div.sticky.bottom-0, aside > div:last-child, div.p-2') || profileBtn.parentElement;

  if (cardContainer && cardContainer !== sidebar) {
    cardContainer.setAttribute("data-cosmiclayer-profile-card", "true");
  }
  profileBtn.setAttribute("data-cosmiclayer-profile-btn", "true");

  // Avatar element
  const avatar = profileBtn.querySelector<HTMLElement>('img, [class*="avatar"], div.rounded-full');
  if (avatar) {
    avatar.setAttribute("data-cosmiclayer-profile-avatar", "true");
    const parent = avatar.parentElement;
    if (parent && !parent.querySelector(".cosmiclayer-status-dot")) {
      const dot = document.createElement("span");
      dot.className = "cosmiclayer-status-dot";
      parent.style.setProperty("position", "relative", "important");
      parent.appendChild(dot);
    }
  }

  // Text column: look for element containing username and plan
  const divChildren = Array.from(profileBtn.querySelectorAll<HTMLElement>("div"));
  for (const d of divChildren) {
    if (d.children.length === 2 && !d.querySelector("img, svg, button")) {
      d.setAttribute("data-cosmiclayer-profile-text", "true");
      (d.children[0] as HTMLElement).setAttribute("data-cosmiclayer-profile-name", "true");
      (d.children[1] as HTMLElement).setAttribute("data-cosmiclayer-profile-plan", "true");
      break;
    }
  }

  // Upgrade or crown action button
  const upgradeBtn = cardContainer?.querySelector<HTMLElement>(
    'button[data-testid*="upgrade"], a[href*="upgrade"], button[aria-label*="Upgrade"], button:not([data-cosmiclayer-profile-btn="true"])'
  );
  if (upgradeBtn) {
    upgradeBtn.setAttribute("data-cosmiclayer-profile-upgrade", "true");
  }
}

export function findAndHarmonizeSidebar(): HTMLElement | null {
  // Strategy 1: Known platform containers
  const known = document.querySelector<HTMLElement>(
    'aside, [data-testid="workspace-sidebar"], [data-testid="sidebar"], #stage-slideover-sidebar, bard-sidenav, mat-sidenav, .side-navigation-v2, nav[aria-label="Chat history"], nav[aria-label="Recent chats"]'
  );

  let sidebar = known;

  // If the matched container is an inner element like <nav>, ascend to the actual sidebar column
  if (sidebar && sidebar.tagName === "NAV" && sidebar.parentElement) {
    const parent = sidebar.parentElement;
    const pRect = parent.getBoundingClientRect();
    if (pRect.left <= 60 && pRect.width <= 440 && pRect.height >= window.innerHeight * 0.5) {
      sidebar = parent;
    }
  }

  // Strategy 2: Search elements docked on left edge (handles both full 260px sidebar and 60px collapsed icon rail)
  if (!sidebar) {
    const candidates = document.querySelectorAll<HTMLElement>("div, nav, aside");
    for (let i = 0; i < candidates.length; i++) {
      const el = candidates[i];
      if (el.id === LAYER_CONTAINER_ID || el.id === BADGE_CONTAINER_ID) continue;
      const rect = el.getBoundingClientRect();
      if (rect.left <= 60 && rect.width >= 40 && rect.width <= 440 && rect.height >= window.innerHeight * 0.6) {
        sidebar = el;
        break;
      }
    }
  }

  if (!sidebar) return null;

  // 1. Clear background on all ancestors of sidebar up to documentElement so wallpaper shines through!
  let parent = sidebar.parentElement;
  while (parent && parent !== document.documentElement && parent !== document.body) {
    parent.style.setProperty("background-color", "transparent", "important");
    parent.style.setProperty("background", "transparent", "important");
    parent = parent.parentElement;
  }

  // 2. Tag sidebar container and apply translucent frosted glass (DO NOT touch position/height/top to preserve native flex layout)
  const rect = sidebar.getBoundingClientRect();
  const isCollapsed = rect.width < 100;
  sidebar.setAttribute("data-cosmiclayer-sidebar", "true");
  if (isCollapsed) {
    sidebar.setAttribute("data-cosmiclayer-collapsed", "true");
  } else {
    sidebar.removeAttribute("data-cosmiclayer-collapsed");
  }

  sidebar.style.setProperty("background", "linear-gradient(180deg, rgba(7, 46, 51, 0.40) 0%, rgba(5, 22, 26, 0.32) 100%)", "important");
  sidebar.style.setProperty("backdrop-filter", "blur(18px) saturate(160%)", "important");
  sidebar.style.setProperty("-webkit-backdrop-filter", "blur(18px) saturate(160%)", "important");
  sidebar.style.setProperty("border-right", "1px solid rgba(41, 77, 97, 0.45)", "important");
  sidebar.style.setProperty("box-shadow", "4px 0 25px rgba(5, 22, 26, 0.5)", "important");

  // 3. Clear opaque background from nested non-interactive structural divs so glass & wallpaper show through
  const innerDivs = sidebar.querySelectorAll<HTMLElement>("div, nav, section, ul, ol");
  innerDivs.forEach((child) => {
    if (
      child.getAttribute("role") === "button" ||
      child.tagName === "BUTTON" ||
      child.tagName === "A" ||
      child.hasAttribute("data-cosmiclayer-profile-card") ||
      child.closest('[data-cosmiclayer-profile-card="true"]')
    ) {
      return;
    }
    child.style.setProperty("background-color", "transparent", "important");
    child.style.setProperty("background", "transparent", "important");
  });

  // 4. Harmonize Profile Card cleanly (avatar, username, plan, crown/upgrade)
  harmonizeProfileCard(sidebar);

  // 5. Tag navigation items inside sidebar (excluding profile card items)
  const items = sidebar.querySelectorAll<HTMLElement>('a, button, li > div, div[role="button"]');
  items.forEach((item) => {
    if (
      item.closest('[data-cosmiclayer-profile-card="true"]') ||
      item.hasAttribute("data-cosmiclayer-profile-btn") ||
      item.hasAttribute("data-cosmiclayer-profile-upgrade") ||
      item.closest('[data-testid="profile-button"]')
    ) {
      return;
    }

    item.setAttribute("data-cosmiclayer-sidebar-item", "true");

    const isCurrent =
      item.getAttribute("aria-current") === "page" ||
      item.getAttribute("data-active") === "true" ||
      item.classList.contains("selected") ||
      item.classList.contains("bg-token-sidebar-surface-secondary") ||
      item.classList.contains("bg-bg-200") ||
      item.classList.contains("bg-bg-300");

    if (isCurrent) {
      item.setAttribute("data-cosmiclayer-active-item", "true");
    } else {
      item.removeAttribute("data-cosmiclayer-active-item");
    }
  });

  // 6. Tag section headers (Pinned, Recents, Projects, etc.)
  const headings = sidebar.querySelectorAll<HTMLElement>(
    'h2, h3, nav[aria-label="Chat history"] div.text-xs, nav[aria-label="Chat history"] div[class*="text-token-text-tertiary"], div.text-xs:not(button[data-testid="profile-button"] *):not([data-testid="profile-button"] *)'
  );
  headings.forEach((heading) => {
    if (!heading.closest('[data-cosmiclayer-profile-card="true"]')) {
      heading.setAttribute("data-cosmiclayer-section-header", "true");
    }
  });

  return sidebar;
}

export function updateCosmicNavbarBadgePosition(badge: HTMLElement, platform: "chatgpt" | "claude" | "gemini"): void {
  let rightPx = platform === "claude" ? 240 : 280;

  try {
    const candidates = Array.from(
      document.querySelectorAll<HTMLElement>("button, a")
    ).filter((el) => {
      if (el.id === BADGE_CONTAINER_ID || el.closest(`#${BADGE_CONTAINER_ID}`)) return false;
      if (el.closest('[data-cosmiclayer-sidebar="true"], aside, nav')) return false;
      const rect = el.getBoundingClientRect();
      return (
        rect.width > 0 &&
        rect.height > 0 &&
        rect.top >= 0 &&
        rect.top < 65 &&
        rect.left > window.innerWidth * 0.4
      );
    });

    if (candidates.length > 0) {
      let minLeft = window.innerWidth;
      for (const btn of candidates) {
        const r = btn.getBoundingClientRect();
        if (r.left < minLeft) {
          minLeft = r.left;
        }
      }
      const calculatedRight = window.innerWidth - minLeft + 16;
      rightPx = Math.max(240, Math.round(calculatedRight));
    } else {
      rightPx = platform === "claude" ? 240 : 280;
    }
  } catch {
    rightPx = platform === "claude" ? 240 : 280;
  }

  badge.style.right = `${rightPx}px`;
}

export function ensureCosmicNavbarBadge(show: boolean, platform: "chatgpt" | "claude" | "gemini" = "chatgpt"): void {
  const existing = document.getElementById(BADGE_CONTAINER_ID);
  if (!show) {
    existing?.remove();
    return;
  }

  let badge = existing;
  if (!badge) {
    badge = document.createElement("div");
    badge.id = BADGE_CONTAINER_ID;
    badge.innerHTML = `
      <span style="width: 6px; height: 6px; border-radius: 50%; background: #00f0ff; box-shadow: 0 0 8px #00f0ff; display: inline-block;"></span>
      <span style="font-weight: 800; font-size: 10px; letter-spacing: 0.08em; background: linear-gradient(135deg, #ffffff 0%, #6da5c0 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">C🪐SMIC</span>
    `;
    badge.style.cssText = `
      position: fixed;
      top: 15px;
      z-index: 45;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 3px 10px;
      border-radius: 9999px;
      background: rgba(5, 22, 26, 0.85);
      border: 1px solid rgba(15, 150, 156, 0.55);
      box-shadow: 0 0 14px rgba(15, 150, 156, 0.35);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 10px;
      pointer-events: none;
      user-select: none;
      transition: right 0.2s ease, opacity 0.3s ease;
    `;
    document.body.appendChild(badge);

    window.addEventListener(
      "resize",
      () => {
        const b = document.getElementById(BADGE_CONTAINER_ID);
        if (b) updateCosmicNavbarBadgePosition(b, platform);
      },
      { passive: true }
    );
  }

  updateCosmicNavbarBadgePosition(badge, platform);
}

export function computeNavbarCss(settings: CosmicSettings, platform: "chatgpt" | "claude" | "gemini"): string {
  const nav = settings.navbar;
  if (!settings.enabled || !nav || !nav.enabled || !nav.platforms[platform]) {
    return "";
  }

  const preset = NAVBAR_PRESETS[nav.stylePreset] || NAVBAR_PRESETS["oceanic-teal"];
  const alpha = Math.max(30, Math.min(95, nav.opacity)) / 100;

  // Specific platform header selectors - never use generic div.sticky.top-0 to avoid colliding with chat thread elements
  const headerTargets = platform === "chatgpt"
    ? 'div.draggable.sticky.top-0 > header, div#thread-header > header, header:not(aside *):not(nav *):not(main *):not([data-testid="workspace-sidebar"] *)'
    : platform === "claude"
    ? 'header:not(aside *):not(nav *):not(main *)'
    : '.gemini-header:not(bard-sidenav *), mat-toolbar:not(bard-sidenav *), bard-app > header:not(bard-sidenav *)';
  
  // Format background rgba with target opacity
  let bgColor = preset.bgRgba;
  if (bgColor.startsWith("rgba(")) {
    bgColor = bgColor.replace(/[\d\.]+\)$/, `${alpha})`);
  }

  const glowLineCss = nav.showNeonGlowLine ? `
    /* Signature Glowing Neon Accent Underline / Topline across top bar and sidebar header */
    ${headerTargets.split(",").map((selector) => selector.trim()).join("::after,\n    ")}::after,
    [data-cosmiclayer-sidebar="true"]:not([data-cosmiclayer-collapsed="true"]) > div:first-child::after,
    [data-testid="workspace-sidebar"]:not([data-cosmiclayer-collapsed="true"]) > div:first-child::after,
    nav[aria-label="Chat history"]:not([data-cosmiclayer-collapsed="true"]) > div:first-child::after {
      content: "" !important;
      position: absolute !important;
      left: 0 !important;
      right: 0 !important;
      height: 2px !important;
      background: ${nav.glowLineColor || preset.accentGradient} !important;
      box-shadow: 0 0 14px ${preset.glowColor} !important;
      pointer-events: none !important;
      z-index: 36 !important;
      ${nav.glowLinePosition === "top" ? "top: 0 !important; bottom: auto !important;" : "bottom: 0 !important; top: auto !important;"}
    }
    ${nav.glowLinePosition === "both" ? `
    ${headerTargets.split(",").map((selector) => selector.trim()).join("::before,\n    ")}::before,
    [data-cosmiclayer-sidebar="true"]:not([data-cosmiclayer-collapsed="true"]) > div:first-child::before,
    [data-testid="workspace-sidebar"]:not([data-cosmiclayer-collapsed="true"]) > div:first-child::before,
    nav[aria-label="Chat history"]:not([data-cosmiclayer-collapsed="true"]) > div:first-child::before {
      content: "" !important;
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      height: 2px !important;
      background: ${nav.glowLineColor || preset.accentGradient} !important;
      box-shadow: 0 0 14px ${preset.glowColor} !important;
      pointer-events: none !important;
      z-index: 36 !important;
    }
    ` : ""}
  ` : "";

  const capsuleCss = nav.styleModelCapsule ? `
    /* Concept 4 Stretchy Glowing Capsule for Model Selector */
    button[data-testid="model-switcher-dropdown"],
    button[aria-label*="Model"],
    button[aria-label*="Gemini"],
    button[id*="model-selector"],
    div[data-testid="model-switcher"] button {
      background: ${preset.capsuleBg} !important;
      border: 1px solid ${preset.capsuleBorder} !important;
      box-shadow: 0 4px 18px ${preset.glowColor}, inset 0 1px 1px rgba(255, 255, 255, 0.4) !important;
      border-radius: 9999px !important;
      padding: 5px 14px !important;
      color: #ffffff !important;
      font-weight: 700 !important;
      letter-spacing: 0.02em !important;
      transition: all 0.25s cubic-bezier(0.34, 1.45, 0.64, 1) !important;
    }
    button[data-testid="model-switcher-dropdown"]:hover,
    button[aria-label*="Model"]:hover,
    button[aria-label*="Gemini"]:hover {
      transform: translateY(-1px) scale(1.02) !important;
      box-shadow: 0 6px 24px ${preset.glowColor}, inset 0 1px 2px rgba(255, 255, 255, 0.6) !important;
    }
    button[data-testid="model-switcher-dropdown"] *,
    button[aria-label*="Model"] *,
    button[aria-label*="Gemini"] * {
      color: #ffffff !important;
      font-weight: 700 !important;
    }
  ` : "";

  return `
    /* ========================================================= */
    /* COSMICLAYER AI CHAT NAVBAR CUSTOMIZER                     */
    /* Preset: ${preset.name}                                   */
    /* ========================================================= */
    ${headerTargets} {
      height: 56px !important;
      min-height: 56px !important;
      max-height: 56px !important;
      box-sizing: border-box !important;
      background: ${bgColor} !important;
      backdrop-filter: blur(${nav.glassBlur}px) !important;
      -webkit-backdrop-filter: blur(${nav.glassBlur}px) !important;
      border-bottom: 1px solid rgba(15, 150, 156, 0.45) !important;
      box-shadow: 0 4px 20px rgba(5, 22, 26, 0.6), inset 0 -1px 0 rgba(147, 51, 234, 0.25) !important;
      position: sticky !important;
      top: 0 !important;
      z-index: 35 !important;
      display: flex !important;
      align-items: center !important;
    }

    /* Sidebar Top Header Row Harmonization (expanded state only) - Matches exact 56px height & border */
    [data-cosmiclayer-sidebar="true"]:not([data-cosmiclayer-collapsed="true"]) > div:first-child,
    [data-testid="workspace-sidebar"]:not([data-cosmiclayer-collapsed="true"]) > div:first-child,
    nav[aria-label="Chat history"]:not([data-cosmiclayer-collapsed="true"]) > div:first-child,
    aside:not([data-cosmiclayer-collapsed="true"]) > div:first-child {
      height: 56px !important;
      min-height: 56px !important;
      max-height: 56px !important;
      box-sizing: border-box !important;
      border-bottom: 1px solid ${preset.borderColor} !important;
      background: ${bgColor} !important;
      backdrop-filter: blur(${nav.glassBlur}px) !important;
      -webkit-backdrop-filter: blur(${nav.glassBlur}px) !important;
      display: flex !important;
      align-items: center !important;
      padding: 0 16px !important;
      position: relative !important;
    }

    /* Collapsed rail connects cleanly without horizontal cuts or awkward gaps */
    [data-cosmiclayer-collapsed="true"],
    [data-cosmiclayer-sidebar="true"][data-cosmiclayer-collapsed="true"],
    aside[data-cosmiclayer-collapsed="true"] {
      border-top: none !important;
      margin-top: 0 !important;
      padding-top: 4px !important;
      background: linear-gradient(180deg, rgba(7, 46, 51, 0.40) 0%, rgba(5, 22, 26, 0.32) 100%) !important;
    }

    [data-cosmiclayer-collapsed="true"] > div:first-child,
    [data-cosmiclayer-sidebar="true"][data-cosmiclayer-collapsed="true"] > div:first-child {
      border-bottom: none !important;
      background: transparent !important;
      padding: 0 !important;
    }

    /* Sidebar Toggle Button (harmonizes with collapsed rail below it) */
    button[data-testid="close-sidebar-button"],
    button[aria-label*="sidebar"],
    button[aria-label*="navigation"],
    header button:first-child,
    div.sticky.top-0 > div:first-child button {
      background: rgba(15, 150, 156, 0.15) !important;
      border: 1px solid rgba(15, 150, 156, 0.4) !important;
      border-radius: 10px !important;
      color: #6da5c0 !important;
      transition: all 0.2s ease !important;
    }
    button[data-testid="close-sidebar-button"]:hover,
    button[aria-label*="sidebar"]:hover,
    button[aria-label*="navigation"]:hover,
    header button:first-child:hover,
    div.sticky.top-0 > div:first-child button:hover {
      background: rgba(15, 150, 156, 0.3) !important;
      border-color: rgba(15, 150, 156, 0.7) !important;
      box-shadow: 0 0 12px rgba(15, 150, 156, 0.45) !important;
      color: #ffffff !important;
    }

    /* Header Action Buttons (strictly outside sidebar) */
    header:not([data-cosmiclayer-sidebar="true"] *):not(aside *):not(nav *) button:not([data-testid="model-switcher-dropdown"]):not([aria-label*="Model"]):not([aria-label*="Gemini"]),
    div.sticky.top-0:not([data-cosmiclayer-sidebar="true"] *):not(aside *):not(nav *) button:not([data-testid="model-switcher-dropdown"]):not([aria-label*="Model"]):not([aria-label*="Gemini"]),
    mat-toolbar:not(bard-sidenav *) button:not([aria-label*="Gemini"]) {
      background: rgba(255, 255, 255, 0.05) !important;
      border: 1px solid ${preset.borderColor} !important;
      border-radius: 10px !important;
      transition: all 0.2s ease !important;
    }
    header:not([data-cosmiclayer-sidebar="true"] *):not(aside *):not(nav *) button:not([data-testid="model-switcher-dropdown"]):not([aria-label*="Model"]):not([aria-label*="Gemini"]):hover,
    div.sticky.top-0:not([data-cosmiclayer-sidebar="true"] *):not(aside *):not(nav *) button:not([data-testid="model-switcher-dropdown"]):not([aria-label*="Model"]):not([aria-label*="Gemini"]):hover,
    mat-toolbar:not(bard-sidenav *) button:not([aria-label*="Gemini"]):hover {
      background: rgba(15, 150, 156, 0.2) !important;
      border-color: rgba(15, 150, 156, 0.6) !important;
      box-shadow: 0 0 12px rgba(15, 150, 156, 0.35) !important;
    }

    ${glowLineCss}
    ${capsuleCss}
  `;
}

export function computeBackgroundString(settings: CosmicSettings): string {
  if (settings.wallpaper) {
    return `url("${settings.wallpaper}") ${settings.backgroundPosition} / ${settings.backgroundSize} no-repeat`;
  }
  if (settings.activeGradient) {
    return settings.activeGradient;
  }
  const theme = THEMES[settings.theme];
  return theme ? theme.backgroundCss : THEMES.nebula.backgroundCss;
}

export function computeFilterString(settings: CosmicSettings): string {
  const parts: string[] = [];
  if (settings.brightness !== 100) parts.push(`brightness(${settings.brightness}%)`);
  if (settings.contrast !== 100) parts.push(`contrast(${settings.contrast}%)`);
  if (settings.saturation !== 100) parts.push(`saturate(${settings.saturation}%)`);
  if (settings.blur > 0) parts.push(`blur(${settings.blur}px)`);
  return parts.length > 0 ? parts.join(" ") : "none";
}
