import { DEFAULT_SETTINGS } from "../shared/types";

chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === "install") {
    const existing = await chrome.storage.local.get("cosmicSettings");
    if (!existing.cosmicSettings) {
      await chrome.storage.local.set({ cosmicSettings: DEFAULT_SETTINGS });
    }
  }
});
