import type { PlatformAdapter } from "./base";
import {
  ensureBackgroundLayer,
  removeCustomStylesAndLayer,
  computeBackgroundString,
  computeFilterString,
  STYLE_CONTAINER_ID,
  LAYER_CONTAINER_ID
} from "./base";
import type { CosmicSettings } from "../../shared/types";
import { THEMES } from "../../shared/themes";

export class GeminiAdapter implements PlatformAdapter {
  readonly id = "gemini" as const;
  readonly name = "Gemini";
  readonly hostnames = ["gemini.google.com"];

  private observer: MutationObserver | null = null;
  private currentSettings: CosmicSettings | null = null;

  matches(hostname: string): boolean {
    return this.hostnames.some((h) => hostname === h || hostname.endsWith(`.${h}`));
  }

  apply(settings: CosmicSettings): void {
    this.currentSettings = settings;

    if (!settings.enabled || !settings.platforms.gemini) {
      this.cleanup();
      return;
    }

    try {
      this.injectStylesAndLayer(settings);
      this.startSafeObserver();
    } catch (err) {
      console.warn("[CosmicLayer] Gemini adapter apply warning:", err);
    }
  }

  cleanup(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    removeCustomStylesAndLayer();
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

      /* Subtle background harmonization for Gemini interface */
      body,
      bard-app,
      .chat-app,
      main {
        background-color: transparent !important;
      }

      /* ========================================================= */
      /* COSMICLAYER CONCEPT 1: FULL GLASS GEMINI SIDEBAR          */
      /* ========================================================= */
      bard-sidenav,
      .side-navigation-v2,
      nav.side-nav {
        background-color: rgba(10, 16, 32, 0.78) !important;
        backdrop-filter: blur(24px) !important;
        -webkit-backdrop-filter: blur(24px) !important;
        border-right: 1px solid rgba(80, 140, 230, 0.22) !important;
        box-shadow: 0 0 40px rgba(0, 0, 0, 0.5) !important;
      }

      /* ========================================================= */
      /* COSMICLAYER CONCEPT 4: ELASTIC STRETCHY GLOWING CAPSULE   */
      /* ========================================================= */
      .conversation.selected,
      .chat-history-item.selected,
      div[aria-selected="true"],
      a.selected {
        background: linear-gradient(100deg, #00d2ff 0%, #3b82f6 40%, #9333ea 85%, #ec4899 100%) !important;
        box-shadow: 0 0 25px rgba(0, 210, 255, 0.55),
                    0 0 45px rgba(147, 51, 234, 0.35),
                    inset 0 1px 1px rgba(255, 255, 255, 0.6) !important;
        border-radius: 12px !important;
        color: #ffffff !important;
        font-weight: 600 !important;
        transition: all 0.3s cubic-bezier(0.34, 1.45, 0.64, 1) !important;
      }

      .conversation:hover:not(.selected) {
        background: rgba(255, 255, 255, 0.05) !important;
        border-radius: 10px !important;
        transform: translateX(3px) !important;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
      }
    `;

    void layer;
  }

  private startSafeObserver(): void {
    if (this.observer) return;

    let timeout: number | null = null;
    this.observer = new MutationObserver(() => {
      if (timeout) return;
      timeout = window.setTimeout(() => {
        timeout = null;
        if (this.currentSettings && this.currentSettings.enabled && this.currentSettings.platforms.gemini) {
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
