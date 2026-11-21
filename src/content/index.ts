import { DEFAULT_SETTINGS, THEME_BACKGROUNDS, type CosmicSettings } from "../shared/types";

const ROOT_ID = "cosmiclayer-background";
const STYLE_ID = "cosmiclayer-style";

function ensureLayer(): HTMLElement {
  let layer = document.getElementById(ROOT_ID);
  if (!layer) {
    layer = document.createElement("div");
    layer.id = ROOT_ID;
    layer.setAttribute("aria-hidden", "true");
    document.documentElement.prepend(layer);
  }
  return layer;
}

function apply(settings: CosmicSettings) {
  const oldStyle = document.getElementById(STYLE_ID);
  oldStyle?.remove();
  document.getElementById(ROOT_ID)?.remove();
  if (!settings.enabled) return;

  const layer = ensureLayer();
  const style = document.createElement("style");
  style.id = STYLE_ID;
  const background = settings.wallpaper
    ? `url("${settings.wallpaper}") center / cover no-repeat`
    : THEME_BACKGROUNDS[settings.theme] ?? THEME_BACKGROUNDS[DEFAULT_SETTINGS.theme];

  style.textContent = `
    html { background: #080d1b !important; }
    #${ROOT_ID} {
      position: fixed; inset: 0; z-index: -1; pointer-events: none;
      background: ${background};
      opacity: ${Math.max(0, Math.min(80, settings.opacity)) / 100};
      background-attachment: fixed;
    }
  `;
  document.head.appendChild(style);
  void layer;
}

async function initialize() {
  const stored = await chrome.storage.local.get("cosmicSettings");
  apply({ ...DEFAULT_SETTINGS, ...(stored.cosmicSettings as Partial<CosmicSettings> | undefined) });
}

void initialize();
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes.cosmicSettings?.newValue) {
    apply({ ...DEFAULT_SETTINGS, ...(changes.cosmicSettings.newValue as Partial<CosmicSettings>) });
  }
});