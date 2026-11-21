import { describe, it, expect } from "vitest";
import { parseImportedSettings } from "./storage";
import { DEFAULT_SETTINGS } from "./types";

describe("Storage & Serialization", () => {
  it("parses valid settings JSON and fills defaults", () => {
    const raw = JSON.stringify({
      theme: "cyberpunk",
      opacity: 50
    });
    const parsed = parseImportedSettings(raw);
    expect(parsed.theme).toBe("cyberpunk");
    expect(parsed.opacity).toBe(50);
    expect(parsed.version).toBe(DEFAULT_SETTINGS.version);
    expect(parsed.platforms.chatgpt).toBe(true);
  });

  it("throws an error when parsing non-object JSON", () => {
    expect(() => parseImportedSettings('"string"')).toThrow();
    expect(() => parseImportedSettings("123")).toThrow();
  });
});
