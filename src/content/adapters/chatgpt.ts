import type { PlatformAdapter } from "./base";
import {
  ensureBackgroundLayer,
  removeCustomStylesAndLayer,
  computeBackgroundString,
  computeFilterString,
  computeNavbarCss,
  ensureCosmicNavbarBadge,
  findAndHarmonizeSidebar,
  STYLE_CONTAINER_ID,
  LAYER_CONTAINER_ID
} from "./base";
import type { CosmicSettings } from "../../shared/types";
import { THEMES } from "../../shared/themes";

export class ChatGPTAdapter implements PlatformAdapter {
  readonly id = "chatgpt" as const;
  readonly name = "ChatGPT";
  readonly hostnames = ["chatgpt.com", "chat.openai.com"];

  private observer: MutationObserver | null = null;
  private currentSettings: CosmicSettings | null = null;

  matches(hostname: string): boolean {
    return this.hostnames.some((h) => hostname === h || hostname.endsWith(`.${h}`));
  }

  apply(settings: CosmicSettings): void {
    this.currentSettings = settings;

    if (!settings.enabled || !settings.platforms.chatgpt) {
      this.cleanup();
      return;
    }

    try {
      this.injectStylesAndLayer(settings);
      this.startSafeObserver();
    } catch (err) {
      console.warn("[CosmicLayer] ChatGPT adapter apply warning:", err);
    }
  }

  cleanup(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    removeCustomStylesAndLayer();
    ensureCosmicNavbarBadge(false);
    document.documentElement.removeAttribute("data-cosmiclayer-theme");
  }

  private injectStylesAndLayer(settings: CosmicSettings): void {
    const layer = ensureBackgroundLayer();
    const theme = THEMES[settings.theme] || THEMES.nebula;
    const bgString = computeBackgroundString(settings);
    const filterString = computeFilterString(settings);
    const opacityValue = Math.max(0, Math.min(90, settings.opacity)) / 100;

    document.documentElement.setAttribute("data-cosmiclayer-theme", settings.theme);

    let style = document.getElementById(STYLE_CONTAINER_ID) as HTMLStyleElement | null;
    if (!style) {
      style = document.createElement("style");
      style.id = STYLE_CONTAINER_ID;
      document.head.appendChild(style);
    }

    style.textContent = `
      :root,
      html,
      body,
      .dark,
      [data-theme="dark"],
      div.dark,
      div.light {
        --cosmic-accent: ${settings.accentColor || theme.accentColor};
        --cosmic-accent-secondary: ${theme.secondaryAccent};
        --cosmic-bg-layer: ${bgString};
        --cosmic-opacity: ${opacityValue};
        --cosmic-filter: ${filterString};
        --cosmic-overlay: ${settings.overlayColor};
        --cosmic-glass-blur: ${settings.glassBlur}px;
        --token-sidebar-surface-primary: rgba(7, 46, 51, 0.45) !important;
        --sidebar-surface-primary: rgba(7, 46, 51, 0.45) !important;
        --token-sidebar-surface-secondary: rgba(12, 112, 117, 0.4) !important;
        --sidebar-surface-secondary: rgba(12, 112, 117, 0.4) !important;
        --token-sidebar-surface-tertiary: rgba(15, 150, 156, 0.5) !important;
        --sidebar-surface-tertiary: rgba(15, 150, 156, 0.5) !important;
        --token-main-surface-primary: transparent !important;
        --main-surface-primary: transparent !important;
        --token-main-surface-secondary: transparent !important;
        --main-surface-secondary: transparent !important;
      }

      html {
        background: #080d1b !important;
      }

      #${LAYER_CONTAINER_ID} {
        position: fixed;
        inset: 0;
        z-index: -9999;
        pointer-events: none;
        background: var(--cosmic-bg-layer);
        filter: var(--cosmic-filter);
        opacity: var(--cosmic-opacity);
        background-attachment: fixed;
        transition: opacity 0.3s ease, filter 0.3s ease;
      }

      /* Non-destructive background harmonizer for ChatGPT main canvas */
      body,
      #root,
      #__next,
      main {
        background-color: transparent !important;
      }

      /* ========================================================= */
      /* COSMICLAYER: COMPREHENSIVE FUTURISTIC CHATGPT SIDEBAR     */
      /* ========================================================= */
      aside,
      #stage-slideover-sidebar,
      [data-testid="workspace-sidebar"],
      [data-cosmiclayer-sidebar="true"],
      div[data-testid="sidebar-container"],
      div[class*="bg-token-sidebar-surface-primary"] {
        background: linear-gradient(180deg, rgba(7, 46, 51, 0.40) 0%, rgba(5, 22, 26, 0.32) 100%) !important;
        backdrop-filter: blur(18px) saturate(160%) !important;
        -webkit-backdrop-filter: blur(18px) saturate(160%) !important;
        border-right: 1px solid rgba(41, 77, 97, 0.45) !important;
        box-shadow: 4px 0 35px rgba(5, 22, 26, 0.7) !important;
        position: sticky !important;
        top: 0 !important;
        height: 100vh !important;
        max-height: 100vh !important;
        z-index: 50 !important;
      }

      /* Collapsed sidebar rail natural dock */
      aside[data-cosmiclayer-collapsed="true"],
      [data-testid="workspace-sidebar"][data-cosmiclayer-collapsed="true"],
      [data-cosmiclayer-sidebar="true"][data-cosmiclayer-collapsed="true"] {
        height: auto !important;
        max-height: none !important;
        position: static !important;
        top: auto !important;
        border-top: none !important;
      }

      /* Make inner structural wrappers transparent so glass & wallpaper glow through */
      [data-cosmiclayer-sidebar="true"] div:not([data-cosmiclayer-profile-card="true"]):not([data-cosmiclayer-profile-card="true"] *):not(button):not(a),
      aside div:not([data-cosmiclayer-profile-card="true"]):not([data-cosmiclayer-profile-card="true"] *):not(button):not(a),
      nav div:not([data-cosmiclayer-profile-card="true"]):not([data-cosmiclayer-profile-card="true"] *):not(button):not(a),
      #stage-slideover-sidebar > div,
      [data-testid="workspace-sidebar"] > div,
      div.flex.h-full.w-full.flex-col.overflow-hidden,
      div.flex.h-full.w-full.flex-col {
        background-color: transparent !important;
        background: transparent !important;
      }

      /* Sidebar Top Header ("ChatGPT" Title + Search + Close) - matches 56px navbar */
      [data-cosmiclayer-sidebar="true"]:not([data-cosmiclayer-collapsed="true"]) > div:first-child,
      [data-testid="workspace-sidebar"]:not([data-cosmiclayer-collapsed="true"]) > div:first-child,
      nav[aria-label="Chat history"]:not([data-cosmiclayer-collapsed="true"]) > div:first-child,
      aside:not([data-cosmiclayer-collapsed="true"]) > div:first-child {
        height: 56px !important;
        min-height: 56px !important;
        max-height: 56px !important;
        box-sizing: border-box !important;
        background: rgba(7, 46, 51, 0.40) !important;
        border-bottom: 1px solid rgba(41, 77, 97, 0.45) !important;
        padding: 0 14px !important;
        display: flex !important;
        align-items: center !important;
      }

      /* "ChatGPT" Logo / Title text in Sidebar */
      aside h1,
      aside a[href="/"],
      [data-cosmiclayer-sidebar="true"] h1,
      [data-cosmiclayer-sidebar="true"] a[href="/"],
      [data-testid="workspace-sidebar"] h1,
      nav[aria-label="Chat history"] h1,
      aside div.font-semibold:has(+ div > button) {
        font-family: var(--cosmic-font-heading, "Space Grotesk", sans-serif) !important;
        font-weight: 800 !important;
        letter-spacing: 0.05em !important;
        background: linear-gradient(135deg, #ffffff 0%, #0f969c 50%, #6da5c0 100%) !important;
        -webkit-background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
      }

      /* Top Action Icons (Search, Close Sidebar) */
      aside button:not([data-testid="profile-button"]):not([data-cosmiclayer-profile-btn="true"]),
      [data-cosmiclayer-sidebar="true"] > div:first-child button {
        border-radius: 10px !important;
        transition: all 0.2s ease !important;
      }
      aside button:not([data-testid="profile-button"]):not([data-cosmiclayer-profile-btn="true"]):hover,
      [data-cosmiclayer-sidebar="true"] > div:first-child button:hover {
        background: rgba(15, 150, 156, 0.22) !important;
        box-shadow: 0 0 12px rgba(15, 150, 156, 0.35) !important;
        color: #6da5c0 !important;
      }

      /* ========================================================= */
      /* UPPER NAV ITEMS: New chat, Images, Scheduled, Library,    */
      /* Plugins, Explore, Pinned, Projects                        */
      /* ========================================================= */
      [data-cosmiclayer-sidebar="true"] a,
      [data-cosmiclayer-sidebar="true"] button:not([data-cosmiclayer-profile-btn="true"]):not([data-cosmiclayer-profile-upgrade="true"]),
      [data-cosmiclayer-sidebar="true"] li div[role="button"],
      nav[aria-label="Chat history"] a,
      nav[aria-label="Chat history"] button,
      aside nav a,
      aside nav button,
      aside nav li a,
      aside nav li div[role="button"],
      aside div[class*="group flex flex-col"] a,
      aside div[class*="group flex flex-col"] button {
        border-radius: 12px !important;
        padding: 7px 12px !important;
        margin: 2px 0 !important;
        font-size: 13px !important;
        font-weight: 500 !important;
        color: #d1e8ef !important;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
        border: 1px solid transparent !important;
      }

      /* Hover effect on all navigation items */
      [data-cosmiclayer-sidebar="true"] a:hover,
      [data-cosmiclayer-sidebar="true"] button:not([data-cosmiclayer-profile-btn="true"]):not([data-cosmiclayer-profile-upgrade="true"]):hover,
      [data-cosmiclayer-sidebar="true"] li div[role="button"]:hover,
      nav[aria-label="Chat history"] a:hover,
      nav[aria-label="Chat history"] button:hover,
      aside nav a:hover,
      aside nav button:hover,
      aside nav li a:hover,
      aside nav li div[role="button"]:hover {
        background: rgba(15, 150, 156, 0.16) !important;
        border-color: rgba(15, 150, 156, 0.4) !important;
        color: #ffffff !important;
        transform: translateX(3px) !important;
        box-shadow: 0 2px 14px rgba(15, 150, 156, 0.25) !important;
      }

      /* ========================================================= */
      /* ACTIVE / SELECTED ITEM (e.g. "Plugins")                   */
      /* CONCEPT 4: ELASTIC STRETCHY GLOWING CAPSULE               */
      /* ========================================================= */
      [data-cosmiclayer-sidebar="true"] a[aria-current="page"],
      [data-cosmiclayer-sidebar="true"] [data-active="true"],
      [data-cosmiclayer-sidebar="true"] [class*="bg-token-sidebar-surface-secondary"],
      [data-cosmiclayer-active-item="true"],
      nav[aria-label="Chat history"] li a[aria-current="page"],
      nav[aria-label="Chat history"] a.bg-token-sidebar-surface-secondary,
      nav[aria-label="Chat history"] .bg-token-sidebar-surface-secondary,
      nav[aria-label="Chat history"] li div.bg-token-sidebar-surface-secondary,
      nav[aria-label="Chat history"] a[data-active="true"],
      aside nav a[aria-current="page"],
      aside nav .bg-token-sidebar-surface-secondary,
      aside nav [data-active="true"],
      aside nav div[class*="bg-token-sidebar-surface-secondary"],
      aside div[class*="bg-token-sidebar-surface-secondary"] {
        background: linear-gradient(105deg, #0f969c 0%, #0c7075 55%, #072e33 100%) !important;
        box-shadow: 0 4px 20px rgba(15, 150, 156, 0.5),
                    0 0 12px rgba(12, 112, 117, 0.4),
                    inset 0 1px 1px rgba(109, 165, 192, 0.6) !important;
        border: 1px solid rgba(15, 150, 156, 0.65) !important;
        border-radius: 12px !important;
        color: #ffffff !important;
        font-weight: 700 !important;
        transform: scale(1.01) !important;
      }

      [data-cosmiclayer-active-item="true"] *,
      [data-cosmiclayer-sidebar="true"] [class*="bg-token-sidebar-surface-secondary"] *,
      nav[aria-label="Chat history"] li a[aria-current="page"] *,
      nav[aria-label="Chat history"] a.bg-token-sidebar-surface-secondary *,
      nav[aria-label="Chat history"] .bg-token-sidebar-surface-secondary *,
      aside nav .bg-token-sidebar-surface-secondary * {
        color: #ffffff !important;
        font-weight: 700 !important;
      }

      /* ========================================================= */
      /* SECTION HEADERS: "Pinned", "Projects", "Today", etc.     */
      /* ========================================================= */
      [data-cosmiclayer-sidebar="true"] h2,
      [data-cosmiclayer-sidebar="true"] h3,
      [data-cosmiclayer-section-header="true"],
      aside h2,
      aside h3,
      nav[aria-label="Chat history"] h2,
      nav[aria-label="Chat history"] h3,
      nav[aria-label="Chat history"] div.text-xs:not(button[data-testid="profile-button"] *):not([data-cosmiclayer-profile-card="true"] *),
      aside div.text-xs.font-semibold:not(button[data-testid="profile-button"] *):not([data-cosmiclayer-profile-card="true"] *),
      aside div[class*="text-token-text-tertiary"]:not(button[data-testid="profile-button"] *):not([data-cosmiclayer-profile-card="true"] *) {
        font-family: var(--cosmic-font-heading, "Space Grotesk", sans-serif) !important;
        font-size: 11px !important;
        font-weight: 800 !important;
        letter-spacing: 0.1em !important;
        text-transform: uppercase !important;
        color: #6da5c0 !important;
        padding: 14px 8px 6px 8px !important;
        display: flex !important;
        align-items: center !important;
        gap: 6px !important;
      }

      [data-cosmiclayer-sidebar="true"] h2::before,
      [data-cosmiclayer-sidebar="true"] h3::before,
      [data-cosmiclayer-section-header="true"]::before,
      aside h2::before,
      aside h3::before,
      nav[aria-label="Chat history"] h2::before,
      nav[aria-label="Chat history"] h3::before {
        content: "" !important;
        display: inline-block !important;
        width: 5px !important;
        height: 5px !important;
        border-radius: 50% !important;
        background: #0f969c !important;
        box-shadow: 0 0 8px #0f969c !important;
      }

      /* Project folders & workspace containers */
      nav[aria-label="Chat history"] div:has(> button > div),
      aside div:has(> button > div),
      [data-cosmiclayer-sidebar="true"] div:has(> button > div) {
        border-radius: 12px !important;
        background: rgba(12, 112, 117, 0.15) !important;
        border: 1px solid rgba(41, 77, 97, 0.45) !important;
        transition: all 0.25s ease !important;
      }

      nav[aria-label="Chat history"] div:has(> button > div):hover,
      aside div:has(> button > div):hover,
      [data-cosmiclayer-sidebar="true"] div:has(> button > div):hover {
        background: rgba(15, 150, 156, 0.25) !important;
        border-color: rgba(15, 150, 156, 0.6) !important;
        box-shadow: 0 0 16px rgba(15, 150, 156, 0.3) !important;
      }

      /* ========================================================= */
      /* SIDEBAR PROFILE CARD (Avatar, Username, Plan, Upgrade)     */
      /* FUTURISTIC GLASS CONTAINER MATCHING TARGET DESIGN          */
      /* ========================================================= */
      [data-cosmiclayer-profile-card="true"],
      div:has(> button[data-testid="profile-button"]),
      aside div.p-2:has(button[data-testid="profile-button"]),
      div.flex.w-full.items-center.gap-2.p-2:has(button[data-testid="profile-button"]),
      aside div:has(> [data-testid="profile-button"]) {
        display: flex !important;
        flex-direction: row !important;
        align-items: center !important;
        justify-content: space-between !important;
        gap: 8px !important;
        width: calc(100% - 16px) !important;
        min-width: 0 !important;
        background: rgba(7, 46, 51, 0.75) !important;
        backdrop-filter: blur(16px) saturate(160%) !important;
        -webkit-backdrop-filter: blur(16px) saturate(160%) !important;
        border: 1px solid rgba(15, 150, 156, 0.45) !important;
        border-radius: 14px !important;
        padding: 6px 10px !important;
        margin: 8px 8px 10px 8px !important;
        box-shadow: 0 4px 20px rgba(5, 22, 26, 0.6), inset 0 1px 0 rgba(109, 165, 192, 0.25) !important;
        box-sizing: border-box !important;
      }

      /* Profile Button Row inside Card */
      [data-cosmiclayer-profile-btn="true"],
      button[data-testid="profile-button"],
      div[data-testid="profile-button"] {
        display: flex !important;
        align-items: center !important;
        justify-content: flex-start !important;
        gap: 10px !important;
        width: auto !important;
        min-width: 0 !important;
        flex: 1 1 0% !important;
        padding: 2px !important;
        margin: 0 !important;
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
        transform: none !important;
        box-sizing: border-box !important;
        min-height: 40px !important;
        position: relative !important;
      }

      /* Avatar Circle */
      [data-cosmiclayer-profile-avatar="true"],
      button[data-testid="profile-button"] img,
      button[data-testid="profile-button"] div[class*="avatar"],
      button[data-testid="profile-button"] div.rounded-full {
        flex-shrink: 0 !important;
        width: 36px !important;
        height: 36px !important;
        min-width: 36px !important;
        min-height: 36px !important;
        border-radius: 50% !important;
        background: linear-gradient(135deg, #0f969c 0%, #072e33 100%) !important;
        border: 2px solid rgba(15, 150, 156, 0.75) !important;
        box-shadow: 0 0 10px rgba(15, 150, 156, 0.5) !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        font-weight: 700 !important;
        color: #ffffff !important;
      }

      /* Glowing Status Dot on Avatar */
      .cosmiclayer-status-dot {
        position: absolute !important;
        bottom: 2px !important;
        left: 26px !important;
        width: 8px !important;
        height: 8px !important;
        border-radius: 50% !important;
        background: #00f0ff !important;
        box-shadow: 0 0 8px #00f0ff !important;
        border: 2px solid #072e33 !important;
        z-index: 2 !important;
        pointer-events: none !important;
      }

      /* Username and Plan Vertical Column Stack - No Overlap */
      [data-cosmiclayer-profile-text="true"],
      button[data-testid="profile-button"] div.grow,
      button[data-testid="profile-button"] div.overflow-hidden:not([class*="avatar"]),
      div[data-testid="profile-button"] div.grow,
      div[data-testid="profile-button"] div.overflow-hidden:not([class*="avatar"]) {
        display: flex !important;
        flex-direction: column !important;
        justify-content: center !important;
        align-items: flex-start !important;
        flex: 1 1 auto !important;
        min-width: 0 !important;
        gap: 2px !important;
        line-height: normal !important;
        padding: 0 !important;
        margin: 0 !important;
      }

      /* Username (e.g. Masum Billah) */
      [data-cosmiclayer-profile-name="true"],
      button[data-testid="profile-button"] div.font-semibold,
      button[data-testid="profile-button"] div.grow > div:first-child,
      div[data-testid="profile-button"] div.font-semibold,
      div[data-testid="profile-button"] div.grow > div:first-child {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
        font-size: 13.5px !important;
        font-weight: 700 !important;
        color: #ffffff !important;
        line-height: 16px !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        max-width: 120px !important;
        display: block !important;
      }

      /* Account Plan (e.g. ChatGPT Free / Free Plan) */
      [data-cosmiclayer-profile-plan="true"],
      button[data-testid="profile-button"] div[class*="text-token-text-tertiary"],
      button[data-testid="profile-button"] div.text-xs,
      button[data-testid="profile-button"] div.grow > div:last-child,
      div[data-testid="profile-button"] div[class*="text-token-text-tertiary"],
      div[data-testid="profile-button"] div.text-xs,
      div[data-testid="profile-button"] div.grow > div:last-child {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
        font-size: 11px !important;
        font-weight: 500 !important;
        color: #6da5c0 !important;
        line-height: 14px !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        max-width: 120px !important;
        display: block !important;
        margin-top: 1px !important;
      }

      /* Upgrade Button Accent (Capsule on the right) */
      [data-cosmiclayer-profile-upgrade="true"],
      button[data-testid="profile-button"] ~ button,
      button[data-testid="profile-button"] button,
      button[data-testid="profile-button"] a[href*="upgrade"],
      aside div:has(button[data-testid="profile-button"]) a[href*="upgrade"],
      aside div:has(button[data-testid="profile-button"]) button[aria-label*="Upgrade"],
      aside button[data-testid*="upgrade"] {
        flex: 0 0 auto !important;
        min-width: max-content !important;
        margin-left: 0 !important;
        padding: 5px 12px !important;
        font-size: 12px !important;
        line-height: 16px !important;
        border-radius: 9999px !important;
        background: linear-gradient(105deg, #0f969c 0%, #0c7075 100%) !important;
        border: 1px solid rgba(109, 165, 192, 0.6) !important;
        color: #ffffff !important;
        font-weight: 700 !important;
        box-shadow: 0 0 12px rgba(15, 150, 156, 0.4) !important;
        white-space: nowrap !important;
        cursor: pointer !important;
        transition: all 0.2s ease !important;
      }
      [data-cosmiclayer-profile-upgrade="true"]:hover {
        background: linear-gradient(105deg, #13b5bc 0%, #0f969c 100%) !important;
        box-shadow: 0 0 18px rgba(15, 150, 156, 0.7) !important;
        transform: scale(1.04) !important;
      }

      /* Sleek Futuristic Scrollbar for Sidebar */
      aside nav::-webkit-scrollbar,
      nav[aria-label="Chat history"]::-webkit-scrollbar,
      [data-testid="workspace-sidebar"] *::-webkit-scrollbar,
      [data-cosmiclayer-sidebar="true"] *::-webkit-scrollbar {
        width: 5px !important;
      }

      aside nav::-webkit-scrollbar-track,
      nav[aria-label="Chat history"]::-webkit-scrollbar-track,
      [data-testid="workspace-sidebar"] *::-webkit-scrollbar-track,
      [data-cosmiclayer-sidebar="true"] *::-webkit-scrollbar-track {
        background: transparent !important;
      }

      aside nav::-webkit-scrollbar-thumb,
      nav[aria-label="Chat history"]::-webkit-scrollbar-thumb,
      [data-testid="workspace-sidebar"] *::-webkit-scrollbar-thumb,
      [data-cosmiclayer-sidebar="true"] *::-webkit-scrollbar-thumb {
        background: rgba(15, 150, 156, 0.4) !important;
        border-radius: 9999px !important;
      }

      aside nav::-webkit-scrollbar-thumb:hover,
      nav[aria-label="Chat history"]::-webkit-scrollbar-thumb:hover,
      [data-testid="workspace-sidebar"] *::-webkit-scrollbar-thumb:hover,
      [data-cosmiclayer-sidebar="true"] *::-webkit-scrollbar-thumb:hover {
        background: #0f969c !important;
        box-shadow: 0 0 8px #0f969c !important;
      }

      /* ========================================================= */
      /* UNIVERSAL DATA-ATTRIBUTE SIDEBAR RULES                    */
      /* ========================================================= */
      [data-cosmiclayer-sidebar="true"] {
        background: linear-gradient(180deg, rgba(7, 46, 51, 0.40) 0%, rgba(5, 22, 26, 0.32) 100%) !important;
        backdrop-filter: blur(18px) saturate(160%) !important;
        -webkit-backdrop-filter: blur(18px) saturate(160%) !important;
        border-right: 1px solid rgba(41, 77, 97, 0.45) !important;
        box-shadow: 4px 0 35px rgba(5, 22, 26, 0.7) !important;
        position: sticky !important;
        top: 0 !important;
        height: 100vh !important;
        max-height: 100vh !important;
        z-index: 50 !important;
      }

      [data-cosmiclayer-sidebar-item="true"]:hover {
        background: rgba(15, 150, 156, 0.16) !important;
        border-color: rgba(15, 150, 156, 0.4) !important;
        color: #ffffff !important;
        transform: translateX(3px) !important;
        box-shadow: 0 2px 14px rgba(15, 150, 156, 0.25) !important;
      }

      [data-cosmiclayer-active-item="true"],
      [data-cosmiclayer-sidebar="true"] [data-cosmiclayer-active-item="true"] {
        background: linear-gradient(105deg, #0f969c 0%, #0c7075 55%, #072e33 100%) !important;
        box-shadow: 0 4px 20px rgba(15, 150, 156, 0.5),
                    0 0 12px rgba(12, 112, 117, 0.4),
                    inset 0 1px 1px rgba(109, 165, 192, 0.6) !important;
        border: 1px solid rgba(15, 150, 156, 0.65) !important;
        border-radius: 12px !important;
        color: #ffffff !important;
        font-weight: 700 !important;
      }

      [data-cosmiclayer-active-item="true"] * {
        color: #ffffff !important;
        font-weight: 700 !important;
      }

      /* Keep native ChatGPT bottom layout intact; style only the composer shell. */
      form:has(#prompt-textarea),
      div:has(> #prompt-textarea) {
        background: rgba(5, 22, 26, 0.65) !important;
        backdrop-filter: blur(20px) !important;
        -webkit-backdrop-filter: blur(20px) !important;
        border: 1px solid rgba(41, 77, 97, 0.45) !important;
        border-radius: 20px !important;
        box-shadow: 0 4px 20px rgba(5, 22, 26, 0.5) !important;
        box-sizing: border-box !important;
        min-width: 0 !important;
      }

      /* Do not impose container styling or dimensions on the editable textbox itself. */
      #prompt-textarea {
        background: transparent !important;
        border: 0 !important;
        box-shadow: none !important;
        border-radius: 0 !important;
        width: 100% !important;
        min-width: 0 !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
      }

      /* ========================================================= */
      /* MAIN CHAT CONVERSATION LAYOUT & IMAGE ASPECT RATIO        */
      /* ========================================================= */
      /* Remove redundant blank space above conversation */
      main div.h-14:empty,
      main div.h-12:empty,
      main div.pt-8:first-child,
      div[class*="react-scroll-to-bottom"] > div > div:first-child:empty {
        display: none !important;
        height: 0 !important;
        min-height: 0 !important;
        padding: 0 !important;
        margin: 0 !important;
      }

      /* Clean 8px breathing space below sticky header */
      main .composer-parent {
        padding-top: 8px !important;
      }

      /* Chat container positioning and responsive width (1280px, 1366px, 1920px) */
      main .composer-parent > div,
      main form {
        max-width: 48rem !important;
        margin-left: auto !important;
        margin-right: auto !important;
        box-sizing: border-box !important;
      }

      /* Generated images: Maintain strict original aspect ratio */
      main img,
      main img[alt*="Generated"],
      main img[alt*="DALL·E"],
      main img[src*="backend-api"],
      main div:has(> img[alt*="Generated"]) img,
      div[data-message-author-role="assistant"] img {
        max-width: 100% !important;
        width: auto !important;
        height: auto !important;
        max-height: 520px !important;
        object-fit: contain !important;
        border-radius: 14px !important;
        box-shadow: 0 4px 20px rgba(5, 22, 26, 0.5) !important;
        border: 1px solid rgba(41, 77, 97, 0.45) !important;
        display: block !important;
        margin: 12px 0 !important;
      }

      /* Prevent conversation content and generated images from being hidden behind bottom input bar */
      main div.overflow-y-auto,
      main div[class*="react-scroll-to-bottom"] > div,
      main [class*="conversation"],
      main [data-testid*="conversation"],
      main div.flex-1.overflow-y-auto,
      main div.flex.flex-col.text-sm {
        padding-bottom: 240px !important;
      }

      /* Inner header wrapper transparency so duplicate headers are prevented */
      div.draggable.sticky.top-0 > header,
      div#thread-header > div {
        height: 100% !important;
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
        padding: 0 12px !important;
      }

      ${computeNavbarCss(settings, "chatgpt")}

      /* Final profile/header collision guard: keep account metadata out of generic section-heading rules. */
      [data-cosmiclayer-profile-card="true"] * {
        box-sizing: border-box !important;
      }

      /* ChatGPT uses a sticky wrapper around its actual header.
         Keep the wrapper in the sticky flow but let the inner header own the 56px height. */
      div.draggable.sticky.top-0 {
        height: auto !important;
        min-height: 0 !important;
        max-height: none !important;
        display: block !important;
        background: transparent !important;
        border: 0 !important;
        box-shadow: none !important;
      }
      div.draggable.sticky.top-0 > header {
        height: 56px !important;
        min-height: 56px !important;
        max-height: 56px !important;
        box-sizing: border-box !important;
      }
    `;

    ensureCosmicNavbarBadge(Boolean(settings.enabled && settings.navbar?.enabled && settings.navbar?.showCosmicBadge && settings.navbar?.platforms.chatgpt), "chatgpt");

    // Execute active DOM sidebar harmonization
    try {
      findAndHarmonizeSidebar();
    } catch {
      // safe fallback
    }

    void layer;
  }

  private startSafeObserver(): void {
    if (this.observer) return;

    // Throttle SPA navigation checks without aggressive DOM querying
    let timeout: number | null = null;
    this.observer = new MutationObserver(() => {
      if (timeout) return;
      timeout = window.setTimeout(() => {
        timeout = null;
        if (this.currentSettings && this.currentSettings.enabled && this.currentSettings.platforms.chatgpt) {
          const layer = document.getElementById(LAYER_CONTAINER_ID);
          if (!layer) {
            this.injectStylesAndLayer(this.currentSettings);
          } else {
            findAndHarmonizeSidebar();
            ensureCosmicNavbarBadge(
              Boolean(this.currentSettings.navbar?.enabled && this.currentSettings.navbar?.showCosmicBadge && this.currentSettings.navbar?.platforms.chatgpt),
              "chatgpt"
            );
          }
        }
      }, 350);
    });

    this.observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }
}
