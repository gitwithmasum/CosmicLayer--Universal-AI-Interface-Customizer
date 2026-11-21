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
  }
}

export function findAndHarmonizeSidebar(): HTMLElement | null {
  // Strategy 1: Known platform containers
  const known = document.querySelector<HTMLElement>(
    'aside, [data-testid="workspace-sidebar"], [data-testid="sidebar"], #stage-slideover-sidebar, bard-sidenav, mat-sidenav, .side-navigation-v2, nav[aria-label="Chat history"], nav[aria-label="Recent chats"]'
  );

  let sidebar = known;

  // Strategy 2: Search elements docked on left edge
  if (!sidebar) {
    const candidates = document.querySelectorAll<HTMLElement>("div, nav, aside");
    for (let i = 0; i < candidates.length; i++) {
      const el = candidates[i];
      if (el.id === LAYER_CONTAINER_ID || el.id === BADGE_CONTAINER_ID) continue;
      const rect = el.getBoundingClientRect();
      if (rect.left <= 60 && rect.width >= 160 && rect.width <= 420 && rect.height >= window.innerHeight * 0.6) {
        sidebar = el;
        break;
      }
    }
  }

  if (!sidebar) return null;

  // Tag sidebar container
  sidebar.setAttribute("data-cosmiclayer-sidebar", "true");

  // Clear opaque background from nested non-interactive structural divs so glass shows through
  const innerDivs = sidebar.querySelectorAll<HTMLElement>("div");
  innerDivs.forEach((child) => {
    if (child.getAttribute("role") === "button" || child.tagName === "BUTTON" || child.tagName === "A") {
      return;
    }
    const bg = window.getComputedStyle(child).backgroundColor;
    if (bg && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)") {
      child.style.setProperty("background-color", "transparent", "important");
    }
  });

  // Tag navigation items inside sidebar
  const items = sidebar.querySelectorAll<HTMLElement>('a, button, li > div, div[role="button"]');
  items.forEach((item) => {
    item.setAttribute("data-cosmiclayer-sidebar-item", "true");
    
    // Check if this item is currently active/selected
    const isCurrent =
      item.getAttribute("aria-current") === "page" ||
      item.getAttribute("data-active") === "true" ||
      item.classList.contains("selected") ||
      item.classList.contains("bg-token-sidebar-surface-secondary") ||
      item.classList.contains("bg-bg-200");

    if (isCurrent) {
      item.setAttribute("data-cosmiclayer-active-item", "true");
    } else {
      item.removeAttribute("data-cosmiclayer-active-item");
    }
  });

  return sidebar;
}

export function ensureCosmicNavbarBadge(show: boolean): void {
  const existing = document.getElementById(BADGE_CONTAINER_ID);
  if (!show) {
    existing?.remove();
    return;
  }

  if (existing) return;

  const badge = document.createElement("div");
  badge.id = BADGE_CONTAINER_ID;
  badge.innerHTML = `
    <span style="width: 7px; height: 7px; border-radius: 50%; background: #0f969c; box-shadow: 0 0 8px #0f969c; display: inline-block;"></span>
    <span style="font-weight: 800; font-size: 10px; letter-spacing: 0.08em; background: linear-gradient(135deg, #ffffff 0%, #6da5c0 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">C🪐SMIC</span>
  `;
  badge.style.cssText = `
    position: fixed;
    top: 14px;
    right: 84px;
    z-index: 99999;
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
    transition: all 0.3s ease;
  `;
  document.body.appendChild(badge);
}

export function computeNavbarCss(settings: CosmicSettings, platform: "chatgpt" | "claude" | "gemini"): string {
  const nav = settings.navbar;
  if (!settings.enabled || !nav || !nav.enabled || !nav.platforms[platform]) {
    return "";
  }

  const preset = NAVBAR_PRESETS[nav.stylePreset] || NAVBAR_PRESETS["oceanic-teal"];
  const alpha = Math.max(30, Math.min(95, nav.opacity)) / 100;
  
  // Format background rgba with target opacity
  let bgColor = preset.bgRgba;
  if (bgColor.startsWith("rgba(")) {
    bgColor = bgColor.replace(/[\d\.]+\)$/, `${alpha})`);
  }

  const glowLineCss = nav.showNeonGlowLine ? `
    /* Signature Glowing Neon Accent Underline / Topline */
    header::after,
    div.draggable.sticky.top-0::after,
    div.sticky.top-0::after,
    [data-testid="top-bar"]::after,
    mat-toolbar::after,
    .gemini-header::after {
      content: "" !important;
      position: absolute !important;
      left: 0 !important;
      right: 0 !important;
      height: 2px !important;
      background: ${nav.glowLineColor || preset.accentGradient} !important;
      box-shadow: 0 0 14px ${preset.glowColor} !important;
      pointer-events: none !important;
      z-index: 50 !important;
      ${nav.glowLinePosition === "top" ? "top: 0 !important; bottom: auto !important;" : "bottom: 0 !important; top: auto !important;"}
    }
    ${nav.glowLinePosition === "both" ? `
    header::before,
    div.draggable.sticky.top-0::before,
    div.sticky.top-0::before,
    [data-testid="top-bar"]::before,
    mat-toolbar::before,
    .gemini-header::before {
      content: "" !important;
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      height: 2px !important;
      background: ${nav.glowLineColor || preset.accentGradient} !important;
      box-shadow: 0 0 14px ${preset.glowColor} !important;
      pointer-events: none !important;
      z-index: 50 !important;
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
    header,
    div.sticky.top-0,
    div.draggable.sticky.top-0,
    [data-testid="top-bar"],
    mat-toolbar,
    .gemini-header,
    bard-app > header {
      background: ${bgColor} !important;
      backdrop-filter: blur(${nav.glassBlur}px) !important;
      -webkit-backdrop-filter: blur(${nav.glassBlur}px) !important;
      border-bottom: 1px solid ${preset.borderColor} !important;
      box-shadow: 0 4px 20px rgba(5, 22, 26, 0.6) !important;
      position: sticky !important;
      top: 0 !important;
      z-index: 40 !important;
    }

    /* Sidebar Top Header Row Harmonization */
    [data-testid="workspace-sidebar"] > div:first-child,
    nav[aria-label="Chat history"] > div:first-child,
    div:has(> [data-testid="close-sidebar-button"]) {
      border-bottom: 1px solid ${preset.borderColor} !important;
      background: rgba(5, 22, 26, 0.4) !important;
    }

    /* Header Action Buttons */
    header button:not([data-testid="model-switcher-dropdown"]):not([aria-label*="Model"]):not([aria-label*="Gemini"]),
    div.sticky.top-0 button:not([data-testid="model-switcher-dropdown"]):not([aria-label*="Model"]):not([aria-label*="Gemini"]),
    mat-toolbar button:not([aria-label*="Gemini"]) {
      background: rgba(255, 255, 255, 0.05) !important;
      border: 1px solid ${preset.borderColor} !important;
      border-radius: 10px !important;
      transition: all 0.2s ease !important;
    }
    header button:not([data-testid="model-switcher-dropdown"]):not([aria-label*="Model"]):not([aria-label*="Gemini"]):hover,
    div.sticky.top-0 button:not([data-testid="model-switcher-dropdown"]):not([aria-label*="Model"]):not([aria-label*="Gemini"]):hover,
    mat-toolbar button:not([aria-label*="Gemini"]):hover {
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
