import type { ThemeDefinition, ThemeId } from "./types";

export const THEMES: Record<ThemeId, ThemeDefinition> = {
  nebula: {
    id: "nebula",
    name: "Nebula Galaxy",
    tagline: "Deep interstellar indigo with magenta cosmic dust and cyan highlights.",
    category: "Space",
    accentColor: "#7de7ff",
    secondaryAccent: "#a855f7",
    textColor: "#eaf1ff",
    mutedTextColor: "#94a3b8",
    glassTint: "rgba(13, 21, 39, 0.72)",
    isDark: true,
    previewGradient: "linear-gradient(135deg, #1d2b64, #f8cdda 90%)",
    backgroundCss:
      "radial-gradient(ellipse at 18% 22%, rgba(71, 95, 220, 0.38), transparent 48%), radial-gradient(ellipse at 82% 72%, rgba(139, 65, 204, 0.30), transparent 46%), #080d1b"
  },
  cyberpunk: {
    id: "cyberpunk",
    name: "Cyberpunk Neon",
    tagline: "High-voltage electric cyan and neon magenta over deep obsidian.",
    category: "Cyber",
    accentColor: "#00f0ff",
    secondaryAccent: "#ff007f",
    textColor: "#f0fdf4",
    mutedTextColor: "#86efac",
    glassTint: "rgba(10, 10, 20, 0.8)",
    isDark: true,
    previewGradient: "linear-gradient(135deg, #00f0ff, #ff007f)",
    backgroundCss:
      "radial-gradient(ellipse at 20% 20%, rgba(0, 240, 255, 0.32), transparent 45%), radial-gradient(ellipse at 80% 75%, rgba(255, 0, 127, 0.28), transparent 48%), #060710"
  },
  deepspace: {
    id: "deepspace",
    name: "Deep Space",
    tagline: "Vast celestial void navy with subtle distant starlight and crisp contrast.",
    category: "Space",
    accentColor: "#38bdf8",
    secondaryAccent: "#818cf8",
    textColor: "#f8fafc",
    mutedTextColor: "#64748b",
    glassTint: "rgba(7, 11, 22, 0.85)",
    isDark: true,
    previewGradient: "linear-gradient(135deg, #0f172a, #1e293b)",
    backgroundCss:
      "radial-gradient(ellipse at 50% 10%, rgba(56, 189, 248, 0.15), transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(99, 102, 241, 0.12), transparent 55%), #040711"
  },
  gold: {
    id: "gold",
    name: "Cosmic Gold",
    tagline: "Luxurious stellar amber and warm cosmic gold aura for executive focus.",
    category: "Space",
    accentColor: "#fbbf24",
    secondaryAccent: "#f59e0b",
    textColor: "#fffbeb",
    mutedTextColor: "#d97706",
    glassTint: "rgba(20, 16, 10, 0.82)",
    isDark: true,
    previewGradient: "linear-gradient(135deg, #78350f, #fcd34d)",
    backgroundCss:
      "radial-gradient(ellipse at 22% 22%, rgba(245, 158, 11, 0.28), transparent 48%), radial-gradient(ellipse at 80% 75%, rgba(180, 83, 9, 0.22), transparent 46%), #0d0a07"
  },
  amoled: {
    id: "amoled",
    name: "Midnight AMOLED",
    tagline: "True pitch obsidian #000000 with ultra-subtle borders for pure clarity.",
    category: "Minimal",
    accentColor: "#e2e8f0",
    secondaryAccent: "#94a3b8",
    textColor: "#ffffff",
    mutedTextColor: "#6b7280",
    glassTint: "rgba(0, 0, 0, 0.92)",
    isDark: true,
    previewGradient: "linear-gradient(135deg, #000000, #18181b)",
    backgroundCss:
      "radial-gradient(circle at 50% 50%, rgba(39, 39, 42, 0.25), transparent 70%), #000000"
  },
  aurora: {
    id: "aurora",
    name: "Aurora Borealis",
    tagline: "Shimmering arctic emerald ribbons dancing over deep polar sea.",
    category: "Elemental",
    accentColor: "#34d399",
    secondaryAccent: "#38bdf8",
    textColor: "#ecfdf5",
    mutedTextColor: "#6ee7b7",
    glassTint: "rgba(5, 20, 24, 0.78)",
    isDark: true,
    previewGradient: "linear-gradient(135deg, #064e3b, #0ea5e9)",
    backgroundCss:
      "radial-gradient(ellipse at 25% 20%, rgba(52, 211, 153, 0.28), transparent 48%), radial-gradient(ellipse at 78% 70%, rgba(56, 189, 248, 0.26), transparent 46%), #041217"
  },
  quantum: {
    id: "quantum",
    name: "Quantum Blue",
    tagline: "Coherent cerulean and cobalt wave resonance designed for technical flow.",
    category: "Cyber",
    accentColor: "#60a5fa",
    secondaryAccent: "#3b82f6",
    textColor: "#eff6ff",
    mutedTextColor: "#93c5fd",
    glassTint: "rgba(8, 19, 43, 0.8)",
    isDark: true,
    previewGradient: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
    backgroundCss:
      "radial-gradient(ellipse at 28% 25%, rgba(59, 130, 246, 0.32), transparent 50%), radial-gradient(ellipse at 72% 75%, rgba(30, 64, 175, 0.28), transparent 50%), #060e22"
  },
  glass: {
    id: "glass",
    name: "Glass Universe",
    tagline: "Deep frosted glass translucency with luminous refractions and soft rims.",
    category: "Elemental",
    accentColor: "#a5f3fc",
    secondaryAccent: "#c4b5fd",
    textColor: "#f8fafc",
    mutedTextColor: "#cbd5e1",
    glassTint: "rgba(255, 255, 255, 0.08)",
    isDark: true,
    previewGradient: "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))",
    backgroundCss:
      "radial-gradient(circle at 20% 30%, rgba(165, 243, 252, 0.22), transparent 45%), radial-gradient(circle at 80% 70%, rgba(196, 181, 253, 0.2), transparent 45%), #0a0f1d"
  },
  minimal: {
    id: "minimal",
    name: "Minimal Professional",
    tagline: "Understated titanium gray and calm slate designed for maximum cognitive ease.",
    category: "Minimal",
    accentColor: "#cbd5e1",
    secondaryAccent: "#94a3b8",
    textColor: "#f1f5f9",
    mutedTextColor: "#64748b",
    glassTint: "rgba(15, 23, 42, 0.85)",
    isDark: true,
    previewGradient: "linear-gradient(135deg, #1e293b, #334155)",
    backgroundCss:
      "radial-gradient(circle at 50% 20%, rgba(148, 163, 184, 0.12), transparent 60%), #0b0f17"
  },
  solar: {
    id: "solar",
    name: "Solar Flare",
    tagline: "Energetic corona plasma with vibrant crimson and incandescent solar orange.",
    category: "Elemental",
    accentColor: "#fb923c",
    secondaryAccent: "#f43f5e",
    textColor: "#fff7ed",
    mutedTextColor: "#fdba74",
    glassTint: "rgba(25, 12, 10, 0.8)",
    isDark: true,
    previewGradient: "linear-gradient(135deg, #c2410c, #e11d48)",
    backgroundCss:
      "radial-gradient(ellipse at 30% 20%, rgba(251, 146, 60, 0.32), transparent 48%), radial-gradient(ellipse at 80% 70%, rgba(244, 63, 94, 0.26), transparent 48%), #130a08"
  }
};

export const THEME_LIST: ThemeDefinition[] = Object.values(THEMES);
