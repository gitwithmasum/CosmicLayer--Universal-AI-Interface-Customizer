import { describe, it, expect } from "vitest";
import { findMatchingAdapter, ChatGPTAdapter, ClaudeAdapter, GeminiAdapter } from "./index";

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
});
