import { describe, it, expect } from "vitest";
import { findMatchingAdapter, ChatGPTAdapter, ClaudeAdapter, GeminiAdapter } from "./index";
import { computeNavbarCss } from "./base";
import { DEFAULT_SETTINGS } from "../../shared/types";

describe("Platform Adapters Architecture", () => {
  const chatgpt = new ChatGPTAdapter();
  const claude = new ClaudeAdapter();
  const gemini = new GeminiAdapter();

  it("ChatGPT adapter matches chatgpt.com hostnames", () => {
    expect(chatgpt.matches("chatgpt.com")).toBe(true);
    expect(chatgpt.matches("chat.openai.com")).toBe(true);
    expect(chatgpt.matches("google.com")).toBe(false);
  });

  it("Claude adapter matches claude.ai hostnames", () => {
    expect(claude.matches("claude.ai")).toBe(true);
    expect(claude.matches("subdomain.claude.ai")).toBe(true);
    expect(claude.matches("chatgpt.com")).toBe(false);
  });

  it("Gemini adapter matches gemini.google.com hostnames", () => {
    expect(gemini.matches("gemini.google.com")).toBe(true);
    expect(gemini.matches("google.com")).toBe(false);
  });

  it("findMatchingAdapter resolves the correct adapter", () => {
    expect(findMatchingAdapter("chatgpt.com")?.id).toBe("chatgpt");
    expect(findMatchingAdapter("claude.ai")?.id).toBe("claude");
    expect(findMatchingAdapter("gemini.google.com")?.id).toBe("gemini");
    expect(findMatchingAdapter("unknown-ai.org")).toBeNull();
  });

  it("computeNavbarCss generates rules when enabled for platform", () => {
    const css = computeNavbarCss(DEFAULT_SETTINGS, "chatgpt");
    expect(css).toContain("COSMICLAYER AI CHAT NAVBAR CUSTOMIZER");
    expect(css).toContain("backdrop-filter: blur(20px)");
    expect(css).toContain("Concept 4 Stretchy Glowing Capsule for Model Selector");
    expect(css).toContain('[data-cosmiclayer-sidebar-header="true"]');
    expect(css).not.toContain("aside:not([data-cosmiclayer-collapsed=\"true\"]) > div:first-child");
    expect(css).not.toContain('[data-cosmiclayer-sidebar="true"]:not([data-cosmiclayer-collapsed="true"]) > div:first-child');
  });

  it("computeNavbarCss returns empty string when navbar disabled", () => {
    const disabledSettings = {
      ...DEFAULT_SETTINGS,
      navbar: {
        ...DEFAULT_SETTINGS.navbar,
        enabled: false
      }
    };
    expect(computeNavbarCss(disabledSettings, "chatgpt")).toBe("");
  });

  it("computeNavbarCss respects platform specific switch", () => {
    const settings = {
      ...DEFAULT_SETTINGS,
      navbar: {
        ...DEFAULT_SETTINGS.navbar,
        platforms: {
          chatgpt: false,
          claude: true,
          gemini: true
        }
      }
    };
    expect(computeNavbarCss(settings, "chatgpt")).toBe("");
    expect(computeNavbarCss(settings, "claude")).toContain("COSMICLAYER AI CHAT NAVBAR CUSTOMIZER");
  });
});
