import { DEFAULT_SETTINGS, type CosmicSettings } from "./types";

const STORAGE_KEY = "cosmicSettings";

export function isChromeExtension(): boolean {
  return typeof chrome !== "undefined" && !!chrome.storage?.local;
}

export async function getSettings(): Promise<CosmicSettings> {
  try {
    if (isChromeExtension()) {
      const data = await chrome.storage.local.get(STORAGE_KEY);
      if (data && data[STORAGE_KEY]) {
        return mergeWithDefaults(data[STORAGE_KEY] as Partial<CosmicSettings>);
      }
    } else if (typeof window !== "undefined" && window.localStorage) {
      const item = window.localStorage.getItem(STORAGE_KEY);
      if (item) {
        return mergeWithDefaults(JSON.parse(item) as Partial<CosmicSettings>);
      }
    }
  } catch (error) {
    console.warn("[CosmicLayer] Failed to read settings, falling back to defaults:", error);
  }
  return DEFAULT_SETTINGS;
}

export async function saveSettings(settings: CosmicSettings): Promise<void> {
  try {
    if (isChromeExtension()) {
      await chrome.storage.local.set({ [STORAGE_KEY]: settings });
    } else if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      // Dispatch custom event for same-tab reactive updates in dev mode
      window.dispatchEvent(new CustomEvent("cosmiclayer:settings-changed", { detail: settings }));
    }
  } catch (error) {
    console.error("[CosmicLayer] Failed to save settings:", error);
    throw error;
  }
}

export async function resetSettings(): Promise<CosmicSettings> {
  await saveSettings(DEFAULT_SETTINGS);
  return DEFAULT_SETTINGS;
}

export function subscribeToSettings(callback: (settings: CosmicSettings) => void): () => void {
  if (isChromeExtension()) {
    const listener = (changes: { [key: string]: chrome.storage.StorageChange }, area: string) => {
      if (area === "local" && changes[STORAGE_KEY]?.newValue) {
        callback(mergeWithDefaults(changes[STORAGE_KEY].newValue as Partial<CosmicSettings>));
      }
    };
    chrome.storage.onChanged.addListener(listener);
    return () => chrome.storage.onChanged.removeListener(listener);
  }

  if (typeof window !== "undefined") {
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY && event.newValue) {
        try {
          callback(mergeWithDefaults(JSON.parse(event.newValue) as Partial<CosmicSettings>));
        } catch {
          // ignore parsing error
        }
      }
    };
    const onCustom = (event: Event) => {
      const customEvent = event as CustomEvent<CosmicSettings>;
      if (customEvent.detail) {
        callback(customEvent.detail);
      }
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("cosmiclayer:settings-changed", onCustom);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("cosmiclayer:settings-changed", onCustom);
    };
  }

  return () => {};
}

export async function getStorageQuotaInfo(): Promise<{ usedBytes: number; quotaBytes: number; percentage: number }> {
  const quotaBytes = 5 * 1024 * 1024; // 5MB standard chrome.storage.local quota
  let usedBytes = 0;

  if (isChromeExtension() && chrome.storage.local.getBytesInUse) {
    try {
      usedBytes = await new Promise<number>((resolve) => {
        chrome.storage.local.getBytesInUse(STORAGE_KEY, (bytes) => resolve(bytes || 0));
      });
    } catch {
      usedBytes = 0;
    }
  } else if (typeof window !== "undefined" && window.localStorage) {
    const item = window.localStorage.getItem(STORAGE_KEY) || "";
    usedBytes = new Blob([item]).size;
  }

  const percentage = Math.min(100, Math.round((usedBytes / quotaBytes) * 100));
  return { usedBytes, quotaBytes, percentage };
}

export function exportSettingsJson(settings: CosmicSettings): void {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(settings, null, 2));
  const anchor = document.createElement("a");
  anchor.setAttribute("href", dataStr);
  anchor.setAttribute("download", `cosmiclayer-backup-${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

export function parseImportedSettings(jsonText: string): CosmicSettings {
  const parsed = JSON.parse(jsonText) as Partial<CosmicSettings>;
  if (typeof parsed !== "object" || parsed === null) {
    throw new Error("Invalid configuration file: Root must be a JSON object.");
  }
  return mergeWithDefaults(parsed);
}

function mergeWithDefaults(partial: Partial<CosmicSettings>): CosmicSettings {
  return {
    ...DEFAULT_SETTINGS,
    ...partial,
    platforms: {
      ...DEFAULT_SETTINGS.platforms,
      ...(partial.platforms || {})
    },
    navbar: {
      ...DEFAULT_SETTINGS.navbar,
      ...(partial.navbar || {}),
      platforms: {
        ...DEFAULT_SETTINGS.navbar.platforms,
        ...(partial.navbar?.platforms || {})
      }
    }
  };
}
