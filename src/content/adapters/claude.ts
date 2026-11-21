import type { PlatformAdapter } from "./base";
import {
  ensureBackgroundLayer,
  removeCustomStylesAndLayer,
  computeBackgroundString,
  computeFilterString,
  computeNavbarCss,
  ensureCosmicNavbarBadge,
  STYLE_CONTAINER_ID,
  LAYER_CONTAINER_ID
} from "./base";
import type { CosmicSettings } from "../../shared/types";
import { THEMES } from "../../shared/themes";

export class ClaudeAdapter implements PlatformAdapter {
  readonly id = "claude" as const;
  readonly name = "Claude";
  readonly hostnames = ["claude.ai"];

  private observer: MutationObserver | null = null;
  private currentSettings: CosmicSettings | null = null;

  matches(hostname: string): boolean {
    return this.hostnames.some((h) => hostname === h || hostname.endsWith(`.${h}`));
  }

  apply(settings: CosmicSettings): void {
    this.currentSettings = settings;

    if (!settings.enabled || !settings.platforms.claude) {
      this.cleanup();
      return;
    }

    try {
      this.injectStylesAndLayer(settings);
      this.startSafeObserver();
    } catch (err) {
      console.warn("[CosmicLayer] Claude adapter apply warning:", err);
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
      :root {
        --cosmic-accent: ${settings.accentColor || theme.accentColor};
        --cosmic-accent-secondary: ${theme.secondaryAccent};
        --cosmic-bg-layer: ${bgString};
        --cosmic-opacity: ${opacityValue};
        --cosmic-filter: ${filterString};
        --cosmic-overlay: ${settings.overlayColor};
        --cosmic-glass-blur: ${settings.glassBlur}px;
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

      /* Subtle background harmonization for Claude */
      body,
      #root,
      main {
        background-color: transparent !important;
      }

      /* ========================================================= */
      /* COSMICLAYER: COMPREHENSIVE FUTURISTIC CLAUDE SIDEBAR      */
      /* ========================================================= */
      aside,
      nav,
      .bg-bg-100,
      .bg-bg-200,
      div:has(> nav[aria-label="Recent chats"]),
      div:has(> nav) {
        background-color: rgba(7, 46, 51, 0.78) !important;
        backdrop-filter: blur(24px) !important;
        -webkit-backdrop-filter: blur(24px) !important;
        border-right: 1px solid rgba(41, 77, 97, 0.45) !important;
        box-shadow: 4px 0 35px rgba(5, 22, 26, 0.7) !important;
      }

      /* Make structural wrappers inside sidebar transparent */
      aside > div,
      nav > div,
      nav div.overflow-y-auto {
        background-color: transparent !important;
      }

      /* Claude Sidebar Top & Actions */
      nav a[href="/new"],
      aside a[href="/new"] {
        border: 1px solid rgba(15, 150, 156, 0.5) !important;
        background: linear-gradient(105deg, rgba(15, 150, 156, 0.25) 0%, rgba(12, 112, 117, 0.35) 100%) !important;
        border-radius: 12px !important;
        color: #ffffff !important;
        font-weight: 700 !important;
        transition: all 0.25s ease !important;
      }
      nav a[href="/new"]:hover,
      aside a[href="/new"]:hover {
        background: linear-gradient(105deg, #0f969c 0%, #0c7075 100%) !important;
        border-color: rgba(109, 165, 192, 0.7) !important;
        box-shadow: 0 0 20px rgba(15, 150, 156, 0.5) !important;
      }

      /* Claude Nav Links & Items */
      nav a,
      nav button,
      aside nav a,
      aside nav button {
        border-radius: 12px !important;
        padding: 7px 12px !important;
        margin: 2px 0 !important;
        font-size: 13px !important;
        color: #d1e8ef !important;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
      }

      nav a:hover:not([aria-current="page"]),
      aside nav a:hover:not([aria-current="page"]) {
        background: rgba(15, 150, 156, 0.16) !important;
        border-color: rgba(15, 150, 156, 0.4) !important;
        border-radius: 10px !important;
        transform: translateX(3px) !important;
        box-shadow: 0 2px 14px rgba(15, 150, 156, 0.25) !important;
      }

      /* ========================================================= */
      /* COSMICLAYER CONCEPT 4: ELASTIC STRETCHY GLOWING CAPSULE   */
      /* ========================================================= */
      a[aria-current="page"],
      nav a.bg-bg-200,
      nav a[data-active="true"],
      aside nav a[aria-current="page"] {
        background: linear-gradient(105deg, #0f969c 0%, #0c7075 55%, #072e33 100%) !important;
        box-shadow: 0 4px 20px rgba(15, 150, 156, 0.5),
                    0 0 12px rgba(12, 112, 117, 0.4),
                    inset 0 1px 1px rgba(109, 165, 192, 0.6) !important;
        border: 1px solid rgba(15, 150, 156, 0.65) !important;
        border-radius: 12px !important;
        color: #ffffff !important;
        font-weight: 700 !important;
        transition: all 0.3s cubic-bezier(0.34, 1.45, 0.64, 1) !important;
      }

      /* Section Headers in Claude */
      nav div.text-text-500,
      aside div.text-text-500,
      nav h2,
      nav h3 {
        font-family: var(--cosmic-font-heading, "Space Grotesk", sans-serif) !important;
        font-size: 11px !important;
        font-weight: 800 !important;
        letter-spacing: 0.1em !important;
        text-transform: uppercase !important;
        color: #6da5c0 !important;
      }

      /* Futuristic Scrollbar for Claude Sidebar */
      nav::-webkit-scrollbar,
      aside::-webkit-scrollbar {
        width: 5px !important;
      }
      nav::-webkit-scrollbar-thumb,
      aside::-webkit-scrollbar-thumb {
        background: rgba(15, 150, 156, 0.4) !important;
        border-radius: 9999px !important;
      }

      ${computeNavbarCss(settings, "claude")}
    `;

    ensureCosmicNavbarBadge(Boolean(settings.enabled && settings.navbar?.enabled && settings.navbar?.showCosmicBadge && settings.navbar?.platforms.claude));

    void layer;
  }

  private startSafeObserver(): void {
    if (this.observer) return;

    let timeout: number | null = null;
    this.observer = new MutationObserver(() => {
      if (timeout) return;
      timeout = window.setTimeout(() => {
        timeout = null;
        if (this.currentSettings && this.currentSettings.enabled && this.currentSettings.platforms.claude) {
          const layer = document.getElementById(LAYER_CONTAINER_ID);
          if (!layer) {
            this.injectStylesAndLayer(this.currentSettings);
          }
        }
      }, 500);
    });

    this.observer.observe(document.documentElement, {
      childList: true,
      subtree: false
    });
  }
}
