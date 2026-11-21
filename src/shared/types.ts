export type ThemeId =
  | "nebula"
  | "cyberpunk"
  | "deepspace"
  | "gold"
  | "amoled"
  | "aurora"
  | "quantum"
  | "glass"
  | "minimal"
  | "solar";

export type BackgroundPosition = "center" | "top" | "bottom" | "left" | "right";
export type BackgroundSize = "cover" | "contain" | "100% 100%" | "120% auto";

export type NavbarStylePreset =
  | "oceanic-teal"
  | "cyber-neon"
  | "minimalist-frost"
  | "stellar-amber"
  | "stealth-void";

export type GlowLinePosition = "bottom" | "top" | "both" | "none";

export interface NavbarSettings {
  enabled: boolean;
  stylePreset: NavbarStylePreset;
  glassBlur: number;    // 0 - 30 px
  opacity: number;      // 30 - 95 %
  showNeonGlowLine: boolean;
  glowLineColor: string; // CSS gradient or hex string
  glowLinePosition: GlowLinePosition;
  styleModelCapsule: boolean; // Style AI model selector like Concept 4 stretchy capsule
  showCosmicBadge: boolean;   // Show mini C🪐SMIC indicator in chat navbar
  platforms: {
    chatgpt: boolean;
    claude: boolean;
    gemini: boolean;
  };
}

export interface NavbarPresetDefinition {
  id: NavbarStylePreset;
  name: string;
  tagline: string;
  bgRgba: string;
  borderColor: string;
  glowColor: string;
  accentGradient: string;
  capsuleBg: string;
  capsuleBorder: string;
}

export const NAVBAR_PRESETS: Record<NavbarStylePreset, NavbarPresetDefinition> = {
  "oceanic-teal": {
    id: "oceanic-teal",
    name: "Oceanic Teal Glass",
    tagline: "Deep oceanic teal with bioluminescent cyan glow",
    bgRgba: "rgba(7, 46, 51, 0.75)",
    borderColor: "rgba(41, 77, 97, 0.45)",
    glowColor: "rgba(15, 150, 156, 0.5)",
    accentGradient: "linear-gradient(90deg, #072e33 0%, #0c7075 35%, #0f969c 70%, #6da5c0 100%)",
    capsuleBg: "linear-gradient(105deg, #0f969c 0%, #0c7075 55%, #072e33 100%)",
    capsuleBorder: "rgba(15, 150, 156, 0.6)"
  },
  "cyber-neon": {
    id: "cyber-neon",
    name: "Cyber Neon Violet & Cyan",
    tagline: "Futuristic synthwave glow with dual neon edge",
    bgRgba: "rgba(13, 10, 28, 0.82)",
    borderColor: "rgba(147, 51, 234, 0.45)",
    glowColor: "rgba(6, 182, 212, 0.55)",
    accentGradient: "linear-gradient(90deg, #9333ea 0%, #a855f7 40%, #06b6d4 80%, #38bdf8 100%)",
    capsuleBg: "linear-gradient(105deg, rgba(147, 51, 234, 0.7) 0%, rgba(6, 182, 212, 0.7) 100%)",
    capsuleBorder: "rgba(6, 182, 212, 0.7)"
  },
  "minimalist-frost": {
    id: "minimalist-frost",
    name: "Minimalist Frost Glass",
    tagline: "Subtle translucent frost with sleek titanium borders",
    bgRgba: "rgba(15, 23, 42, 0.65)",
    borderColor: "rgba(109, 165, 192, 0.3)",
    glowColor: "rgba(109, 165, 192, 0.35)",
    accentGradient: "linear-gradient(90deg, rgba(109, 165, 192, 0.1) 0%, rgba(109, 165, 192, 0.8) 50%, rgba(109, 165, 192, 0.1) 100%)",
    capsuleBg: "rgba(109, 165, 192, 0.18)",
    capsuleBorder: "rgba(109, 165, 192, 0.45)"
  },
  "stellar-amber": {
    id: "stellar-amber",
    name: "Stellar Amber Flare",
    tagline: "Warm stellar radiation with incandescent golden flare",
    bgRgba: "rgba(22, 12, 8, 0.8)",
    borderColor: "rgba(245, 158, 11, 0.4)",
    glowColor: "rgba(245, 158, 11, 0.5)",
    accentGradient: "linear-gradient(90deg, #b45309 0%, #f59e0b 50%, #ef4444 100%)",
    capsuleBg: "linear-gradient(105deg, #f59e0b 0%, #b45309 60%, #78350f 100%)",
    capsuleBorder: "rgba(245, 158, 11, 0.7)"
  },
  "stealth-void": {
    id: "stealth-void",
    name: "Stealth Void AMOLED",
    tagline: "Pitch AMOLED black with laser emerald accent",
    bgRgba: "rgba(3, 7, 18, 0.92)",
    borderColor: "rgba(16, 185, 129, 0.4)",
    glowColor: "rgba(16, 185, 129, 0.45)",
    accentGradient: "linear-gradient(90deg, #065f46 0%, #10b981 50%, #34d399 100%)",
    capsuleBg: "linear-gradient(105deg, #065f46 0%, #047857 60%, #022c22 100%)",
    capsuleBorder: "rgba(16, 185, 129, 0.6)"
  }
};

export const GLOW_LINE_GRADIENTS = [
  { id: "teal-cyan", name: "Teal Bioluminescence", value: "linear-gradient(90deg, #072e33 0%, #0c7075 30%, #0f969c 60%, #6da5c0 100%)" },
  { id: "cyber-neon", name: "Synthwave Purple & Cyan", value: "linear-gradient(90deg, #9333ea 0%, #a855f7 40%, #06b6d4 80%, #38bdf8 100%)" },
  { id: "golden-flare", name: "Solar Sunburst", value: "linear-gradient(90deg, #b45309 0%, #f59e0b 50%, #f97316 100%)" },
  { id: "emerald-aurora", name: "Emerald Aurora", value: "linear-gradient(90deg, #065f46 0%, #10b981 50%, #34d399 100%)" }
];

export interface ThemeDefinition {
  id: ThemeId;
  name: string;
  tagline: string;
  category: "Space" | "Cyber" | "Minimal" | "Elemental";
  accentColor: string;
  secondaryAccent: string;
  backgroundCss: string;
  previewGradient: string;
  textColor: string;
  mutedTextColor: string;
  glassTint: string;
  isDark: boolean;
}

export interface CosmicSettings {
  version: string;
  enabled: boolean;
  theme: ThemeId;
  accentColor: string;
  // Background Studio
  wallpaper?: string;
  wallpaperName?: string;
  backgroundPosition: BackgroundPosition;
  backgroundSize: BackgroundSize;
  brightness: number; // 50 - 150
  contrast: number;   // 50 - 150
  saturation: number; // 0 - 200
  blur: number;       // 0 - 40
  opacity: number;    // 0 - 90
  overlayColor: string;
  activeGradient: string;
  // Appearance Studio
  glassBlur: number;    // 0 - 30
  glassOpacity: number; // 10 - 90
  reduceMotion: boolean;
  contrastBoost: boolean;
  // Platform enablement
  platforms: {
    chatgpt: boolean;
    claude: boolean;
    gemini: boolean;
  };
  // AI Chat Navbar Studio
  navbar: NavbarSettings;
}

export const DEFAULT_GRADIENTS: { id: string; name: string; css: string }[] = [
  {
    id: "cosmic-abyss",
    name: "Cosmic Abyss",
    css: "radial-gradient(ellipse at 18% 22%, rgba(71, 95, 220, 0.35), transparent 48%), radial-gradient(ellipse at 82% 72%, rgba(139, 65, 204, 0.28), transparent 46%), #080d1b"
  },
  {
    id: "cyber-matrix",
    name: "Cyber Matrix",
    css: "radial-gradient(ellipse at 20% 20%, rgba(0, 220, 255, 0.3), transparent 45%), radial-gradient(ellipse at 80% 75%, rgba(255, 0, 153, 0.25), transparent 48%), #060810"
  },
  {
    id: "stellar-core",
    name: "Stellar Core",
    css: "radial-gradient(circle at 50% 30%, rgba(245, 158, 11, 0.25), transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(220, 38, 38, 0.2), transparent 50%), #0d0a08"
  },
  {
    id: "aurora-veil",
    name: "Aurora Veil",
    css: "radial-gradient(ellipse at 25% 20%, rgba(38, 220, 174, 0.28), transparent 48%), radial-gradient(ellipse at 78% 70%, rgba(75, 110, 235, 0.25), transparent 46%), #05121a"
  },
  {
    id: "quantum-resonance",
    name: "Quantum Resonance",
    css: "radial-gradient(ellipse at 30% 20%, rgba(14, 165, 233, 0.3), transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(99, 102, 241, 0.28), transparent 50%), #070d1e"
  },
  {
    id: "supernova-flare",
    name: "Supernova Flare",
    css: "radial-gradient(ellipse at 40% 15%, rgba(249, 115, 22, 0.3), transparent 45%), radial-gradient(ellipse at 85% 65%, rgba(236, 72, 153, 0.25), transparent 45%), #12090e"
  },
  {
    id: "void-singularity",
    name: "Void Singularity",
    css: "radial-gradient(circle at 50% 50%, rgba(30, 41, 59, 0.4), transparent 70%), #000000"
  },
  {
    id: "astral-emerald",
    name: "Astral Emerald",
    css: "radial-gradient(ellipse at 20% 30%, rgba(16, 185, 129, 0.28), transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(6, 95, 70, 0.3), transparent 50%), #051410"
  }
];

export const DEFAULT_SETTINGS: CosmicSettings = {
  version: "0.1.0",
  enabled: true,
  theme: "nebula",
  accentColor: "#7de7ff",
  wallpaper: undefined,
  wallpaperName: undefined,
  backgroundPosition: "center",
  backgroundSize: "cover",
  brightness: 100,
  contrast: 100,
  saturation: 100,
  blur: 0,
  opacity: 35,
  overlayColor: "rgba(8, 13, 27, 0.65)",
  activeGradient: DEFAULT_GRADIENTS[0].css,
  glassBlur: 16,
  glassOpacity: 65,
  reduceMotion: false,
  contrastBoost: false,
  platforms: {
    chatgpt: true,
    claude: true,
    gemini: true
  },
  navbar: {
    enabled: true,
    stylePreset: "oceanic-teal",
    glassBlur: 20,
    opacity: 75,
    showNeonGlowLine: true,
    glowLineColor: "linear-gradient(90deg, #072e33 0%, #0c7075 30%, #0f969c 60%, #6da5c0 100%)",
    glowLinePosition: "bottom",
    styleModelCapsule: true,
    showCosmicBadge: true,
    platforms: {
      chatgpt: true,
      claude: true,
      gemini: true
    }
  }
};
