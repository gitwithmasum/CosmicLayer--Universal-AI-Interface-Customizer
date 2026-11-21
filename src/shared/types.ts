export type ThemeId = "nebula" | "cyberpunk" | "aurora" | "gold";

export interface CosmicSettings {
  enabled: boolean;
  theme: ThemeId;
  opacity: number;
  wallpaper?: string;
}

export const DEFAULT_SETTINGS: CosmicSettings = {
  enabled: true,
  theme: "nebula",
  opacity: 34
};

export const THEME_BACKGROUNDS: Record<ThemeId, string> = {
  nebula: "radial-gradient(ellipse at 18% 22%, rgba(71, 95, 220, .34), transparent 48%), radial-gradient(ellipse at 82% 72%, rgba(139, 65, 204, .25), transparent 46%), #080d1b",
  cyberpunk: "radial-gradient(ellipse at 20% 20%, rgba(0, 220, 255, .28), transparent 45%), radial-gradient(ellipse at 80% 75%, rgba(255, 0, 153, .22), transparent 48%), #090914",
  aurora: "radial-gradient(ellipse at 25% 20%, rgba(38, 220, 174, .25), transparent 48%), radial-gradient(ellipse at 78% 70%, rgba(75, 110, 235, .24), transparent 46%), #07131a",
  gold: "radial-gradient(ellipse at 22% 22%, rgba(207, 158, 68, .25), transparent 48%), radial-gradient(ellipse at 80% 75%, rgba(122, 86, 40, .20), transparent 46%), #100e0a"
};