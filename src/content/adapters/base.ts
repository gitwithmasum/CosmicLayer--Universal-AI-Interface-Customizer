import type { CosmicSettings } from "../../shared/types";
import { THEMES } from "../../shared/themes";

export interface PlatformAdapter {
  readonly id: "chatgpt" | "claude" | "gemini";
  readonly name: string;
  readonly hostnames: string[];
  matches(hostname: string): boolean;
  apply(settings: CosmicSettings): void;
  cleanup(): void;
}

export const LAYER_CONTAINER_ID = "cosmiclayer-background";
export const STYLE_CONTAINER_ID = "cosmiclayer-style";

export function ensureBackgroundLayer(): HTMLElement {
  let layer = document.getElementById(LAYER_CONTAINER_ID);
  if (!layer) {
    layer = document.createElement("div");
    layer.id = LAYER_CONTAINER_ID;
    layer.setAttribute("aria-hidden", "true");
    document.documentElement.prepend(layer);
  }
  return layer;
}

export function removeCustomStylesAndLayer(): void {
  document.getElementById(STYLE_CONTAINER_ID)?.remove();
  document.getElementById(LAYER_CONTAINER_ID)?.remove();
}

export function computeBackgroundString(settings: CosmicSettings): string {
  if (settings.wallpaper) {
    return `url("${settings.wallpaper}") ${settings.backgroundPosition} / ${settings.backgroundSize} no-repeat`;
  }
  if (settings.activeGradient) {
    return settings.activeGradient;
  }
  const theme = THEMES[settings.theme];
  return theme ? theme.backgroundCss : THEMES.nebula.backgroundCss;
}

export function computeFilterString(settings: CosmicSettings): string {
  const parts: string[] = [];
  if (settings.brightness !== 100) parts.push(`brightness(${settings.brightness}%)`);
  if (settings.contrast !== 100) parts.push(`contrast(${settings.contrast}%)`);
  if (settings.saturation !== 100) parts.push(`saturate(${settings.saturation}%)`);
  if (settings.blur > 0) parts.push(`blur(${settings.blur}px)`);
  return parts.length > 0 ? parts.join(" ") : "none";
}
