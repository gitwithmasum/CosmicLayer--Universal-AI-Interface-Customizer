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
  }
};
