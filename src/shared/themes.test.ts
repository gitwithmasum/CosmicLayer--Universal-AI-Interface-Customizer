import { describe, it, expect } from "vitest";
import { THEMES, THEME_LIST } from "./themes";
import type { ThemeId } from "./types";

describe("Theme Library", () => {
  const expectedThemeIds: ThemeId[] = [
    "nebula",
    "cyberpunk",
    "deepspace",
    "gold",
    "amoled",
    "aurora",
    "quantum",
    "glass",
    "minimal",
    "solar"
  ];

  it("should contain exactly all 10 required theme presets", () => {
    expect(THEME_LIST.length).toBe(10);
    expectedThemeIds.forEach((id) => {
      expect(THEMES[id]).toBeDefined();
      expect(THEMES[id].id).toBe(id);
    });
  });

  it("every theme should have non-empty name, tagline, and backgroundCss", () => {
    THEME_LIST.forEach((theme) => {
      expect(theme.name.trim().length).toBeGreaterThan(0);
      expect(theme.tagline.trim().length).toBeGreaterThan(0);
      expect(theme.accentColor).toMatch(/^#|^rgba/);
      expect(theme.backgroundCss.trim().length).toBeGreaterThan(0);
    });
  });
});
