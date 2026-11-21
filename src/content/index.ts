import { findMatchingAdapter } from "./adapters";
import { getSettings, subscribeToSettings } from "../shared/storage";
import type { CosmicSettings } from "../shared/types";

async function main() {
  const hostname = window.location.hostname;
  const adapter = findMatchingAdapter(hostname);

  if (!adapter) {
    // Not a matched supported platform
    return;
  }

  // Load initial settings
  const settings = await getSettings();
  adapter.apply(settings);
  console.info(`[CosmicLayer] ${adapter.name} customizer active on ${hostname}`);

  // Subscribe to settings changes (broadcast from popup or dashboard)
  subscribeToSettings((nextSettings: CosmicSettings) => {
    adapter.apply(nextSettings);
  });

  // Re-check on SPA navigation or DOM ready
  window.addEventListener("popstate", async () => {
    const current = await getSettings();
    adapter.apply(current);
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", async () => {
      const current = await getSettings();
      adapter.apply(current);
    });
  }
}

void main();
