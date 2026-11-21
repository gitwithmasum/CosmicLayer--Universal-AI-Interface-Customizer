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

      /* Non-destructive background harmonizer for ChatGPT main canvas */
      /* Leaves markdown text, code blocks, and conversation turns untouched */
      body,
      #root,
      #__next,
      main {
        background-color: transparent !important;
      }

      /* ========================================================= */
      /* COSMICLAYER CONCEPT 1: FULL GLASS CHATGPT SIDEBAR         */
      /* ========================================================= */
      [data-testid="workspace-sidebar"],
      nav[aria-label="Chat history"],
      div[data-testid="sidebar-container"],
      div.flex.h-full.w-full.flex-col.overflow-hidden.bg-token-sidebar-surface-primary,
      div.flex.h-full.w-full.flex-col.bg-token-sidebar-surface-primary {
        background: rgba(7, 46, 51, 0.72) !important;
        backdrop-filter: blur(24px) !important;
        -webkit-backdrop-filter: blur(24px) !important;
        border-right: 1px solid rgba(41, 77, 97, 0.35) !important;
        box-shadow: 0 0 40px rgba(5, 22, 26, 0.6) !important;
      }

      /* ========================================================= */
      /* COSMICLAYER CONCEPT 4: ELASTIC STRETCHY GLOWING CAPSULE   */
      /* Transformed into Deep Teal Stretchy Glow                  */
      /* ========================================================= */
      nav[aria-label="Chat history"] li a[aria-current="page"],
      nav[aria-label="Chat history"] a.bg-token-sidebar-surface-secondary,
      nav[aria-label="Chat history"] .bg-token-sidebar-surface-secondary,
      nav[aria-label="Chat history"] li div.bg-token-sidebar-surface-secondary,
      nav[aria-label="Chat history"] a[data-active="true"] {
        background: linear-gradient(105deg, #0f969c 0%, #0c7075 55%, #072e33 100%) !important;
        box-shadow: 0 4px 20px rgba(15, 150, 156, 0.45),
                    0 0 12px rgba(12, 112, 117, 0.4),
                    inset 0 1px 1px rgba(109, 165, 192, 0.6) !important;
        border-radius: 12px !important;
        color: #ffffff !important;
        font-weight: 600 !important;
        transition: all 0.3s cubic-bezier(0.34, 1.45, 0.64, 1) !important;
      }

      nav[aria-label="Chat history"] li a[aria-current="page"] *,
      nav[aria-label="Chat history"] a.bg-token-sidebar-surface-secondary * {
        color: #ffffff !important;
        font-weight: 600 !important;
      }

      /* Inactive Chat Items Hover Effect */
      nav[aria-label="Chat history"] li a:hover:not([aria-current="page"]) {
        background: rgba(255, 255, 255, 0.05) !important;
        border-radius: 10px !important;
        transform: translateX(3px) !important;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
      }

      /* New Chat Button */
      nav[aria-label="Chat history"] a[href="/"],
      nav[aria-label="Chat history"] button[aria-label*="New chat"],
      a[data-testid="create-new-chat-button"] {
        border: 1px solid rgba(125, 231, 255, 0.25) !important;
        background: rgba(14, 165, 233, 0.12) !important;
        border-radius: 12px !important;
        transition: all 0.2s ease !important;
      }

      nav[aria-label="Chat history"] a[href="/"]:hover,
      a[data-testid="create-new-chat-button"]:hover {
        background: rgba(14, 165, 233, 0.25) !important;
        border-color: rgba(125, 231, 255, 0.5) !important;
        box-shadow: 0 0 18px rgba(0, 210, 255, 0.35) !important;
      }

      /* Project folders & workspace containers */
      nav[aria-label="Chat history"] div:has(> button > div) {
        border-radius: 10px !important;
      }

      /* User Profile Footer Card (Masum Billah, Free Plan, Upgrade) */
      div[data-testid="profile-button"],
      div.flex.w-full.items-center.gap-2.p-2:has(button[data-testid="profile-button"]) {
        background: rgba(255, 255, 255, 0.03) !important;
        border: 1px solid rgba(80, 140, 230, 0.22) !important;
        border-radius: 14px !important;
        padding: 6px 10px !important;
        margin-top: 6px !important;
      }

      /* Upgrade Button Accent */
      button:has(span:contains("Upgrade")),
      button[aria-label*="Upgrade"],
      a:has(span:contains("Upgrade")) {
        background: rgba(251, 191, 36, 0.15) !important;
        border: 1px solid rgba(251, 191, 36, 0.35) !important;
        color: #fde047 !important;
        border-radius: 10px !important;
        font-weight: 700 !important;
      }

      ${computeNavbarCss(settings, "chatgpt")}
    `;

    ensureCosmicNavbarBadge(Boolean(settings.enabled && settings.navbar?.enabled && settings.navbar?.showCosmicBadge && settings.navbar?.platforms.chatgpt));

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
