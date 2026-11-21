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

      /* Subtle background harmonization for Gemini interface */
      body,
      bard-app,
      .chat-app,
      main {
        background-color: transparent !important;
      }

      /* ========================================================= */
      /* COSMICLAYER: COMPREHENSIVE FUTURISTIC GEMINI SIDEBAR      */
      /* ========================================================= */
      bard-sidenav,
      mat-sidenav,
      .side-navigation-v2,
      nav.side-nav,
      div.side-navigation,
      div[class*="side-nav"] {
        background: linear-gradient(180deg, rgba(7, 46, 51, 0.40) 0%, rgba(5, 22, 26, 0.32) 100%) !important;
        backdrop-filter: blur(18px) saturate(160%) !important;
        -webkit-backdrop-filter: blur(18px) saturate(160%) !important;
        border-right: 1px solid rgba(41, 77, 97, 0.45) !important;
        box-shadow: 4px 0 35px rgba(5, 22, 26, 0.7) !important;
      }

      /* Make structural wrappers inside Gemini sidebar transparent */
      bard-sidenav > div,
      mat-sidenav > div,
      .side-navigation-v2 > div {
        background-color: transparent !important;
      }

      /* Gemini "New chat" button */
      button[aria-label*="New chat"],
      .new-chat-button,
      a[href*="app/new"],
      button.mat-mdc-button-base[aria-label*="chat"] {
        background: linear-gradient(105deg, rgba(15, 150, 156, 0.25) 0%, rgba(12, 112, 117, 0.35) 100%) !important;
        border: 1px solid rgba(15, 150, 156, 0.5) !important;
        border-radius: 12px !important;
        color: #ffffff !important;
        font-weight: 700 !important;
        transition: all 0.25s ease !important;
      }
      button[aria-label*="New chat"]:hover,
      .new-chat-button:hover {
        background: linear-gradient(105deg, #0f969c 0%, #0c7075 100%) !important;
        border-color: rgba(109, 165, 192, 0.7) !important;
        box-shadow: 0 0 20px rgba(15, 150, 156, 0.5) !important;
      }

      /* Gemini Sidebar Nav items */
      .conversation,
      .chat-history-item,
      nav.side-nav a,
      bard-sidenav a {
        border-radius: 12px !important;
        padding: 7px 12px !important;
        margin: 2px 0 !important;
        font-size: 13px !important;
        color: #d1e8ef !important;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
      }

      .conversation:hover:not(.selected),
      .chat-history-item:hover:not(.selected),
      nav.side-nav a:hover,
      bard-sidenav a:hover {
        background: rgba(15, 150, 156, 0.16) !important;
        border-color: rgba(15, 150, 156, 0.4) !important;
        border-radius: 10px !important;
        transform: translateX(3px) !important;
        box-shadow: 0 2px 14px rgba(15, 150, 156, 0.25) !important;
      }

      /* ========================================================= */
      /* COSMICLAYER CONCEPT 4: ELASTIC STRETCHY GLOWING CAPSULE   */
      /* ========================================================= */
      .conversation.selected,
      .chat-history-item.selected,
      div[aria-selected="true"],
      a.selected {
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

      /* Futuristic Scrollbar for Gemini */
      bard-sidenav::-webkit-scrollbar,
      mat-sidenav::-webkit-scrollbar {
        width: 5px !important;
      }
      bard-sidenav::-webkit-scrollbar-thumb,
      mat-sidenav::-webkit-scrollbar-thumb {
        background: rgba(15, 150, 156, 0.4) !important;
        border-radius: 9999px !important;
      }

      /* ========================================================= */
      /* UNIVERSAL DATA-ATTRIBUTE SIDEBAR RULES                    */
      /* ========================================================= */
      [data-cosmiclayer-sidebar="true"] {
        background: rgba(7, 46, 51, 0.78) !important;
        backdrop-filter: blur(24px) !important;
        -webkit-backdrop-filter: blur(24px) !important;
        border-right: 1px solid rgba(41, 77, 97, 0.45) !important;
        box-shadow: 4px 0 35px rgba(5, 22, 26, 0.7) !important;
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

      /* Gemini Prompt Input Box Harmonization */
      .input-area-container,
      div:has(> rich-textarea),
      rich-textarea,
      .chat-window .input-area {
        background: rgba(5, 22, 26, 0.65) !important;
        backdrop-filter: blur(20px) !important;
        -webkit-backdrop-filter: blur(20px) !important;
        border: 1px solid rgba(41, 77, 97, 0.45) !important;
        border-radius: 20px !important;
        box-shadow: 0 4px 20px rgba(5, 22, 26, 0.5) !important;
      }

      ${computeNavbarCss(settings, "gemini")}
    `;

    ensureCosmicNavbarBadge(Boolean(settings.enabled && settings.navbar?.enabled && settings.navbar?.showCosmicBadge && settings.navbar?.platforms.gemini), "gemini");

    try {
      findAndHarmonizeSidebar();
    } catch {
      // safe fallback
    }

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
          } else {
            findAndHarmonizeSidebar();
          }
        }
      }, 500);
    });

    this.observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }
}
