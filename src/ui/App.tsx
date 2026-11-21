import React, { useEffect, useState } from "react";
import type { CosmicSettings } from "../shared/types";
import { DEFAULT_SETTINGS } from "../shared/types";
import {
  exportSettingsJson,
  getSettings,
  resetSettings,
  saveSettings,
  subscribeToSettings
} from "../shared/storage";
import { Navbar } from "./components/Navbar";
import { SidebarNav, type TabId } from "./components/SidebarNav";
import { OverviewTab } from "./components/OverviewTab";
import { AppearanceStudioTab } from "./components/AppearanceStudioTab";
import { BackgroundStudioTab } from "./components/BackgroundStudioTab";
import { PlatformIntegrationsTab } from "./components/PlatformIntegrationsTab";
import { ThemeLibraryTab } from "./components/ThemeLibraryTab";
import { SettingsTab } from "./components/SettingsTab";
import { PrivacyCenterTab } from "./components/PrivacyCenterTab";

export const App: React.FC = () => {
  const [settings, setSettings] = useState<CosmicSettings>(DEFAULT_SETTINGS);
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Initial load of settings from storage
    getSettings().then((loaded) => {
      setSettings(loaded);
      setIsLoaded(true);
    });

    // Reactive subscription to storage changes (from popup or other tabs)
    const unsubscribe = subscribeToSettings((updated) => {
      setSettings(updated);
    });

    return () => unsubscribe();
  }, []);

  const handleUpdate = async (next: CosmicSettings) => {
    setSettings(next);
    await saveSettings(next);
  };

  const handleReset = async () => {
    const defaults = await resetSettings();
    setSettings(defaults);
  };

  const handleExport = () => {
    exportSettingsJson(settings);
  };

  if (!isLoaded) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#080d1b",
        color: "var(--cosmic-accent-cyan)",
        fontFamily: "var(--cosmic-font-heading)",
        fontSize: "14px"
      }}>
        Initializing CosmicLayer universe…
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "radial-gradient(ellipse at 15% 10%, rgba(14, 165, 233, 0.12), transparent 45%), radial-gradient(ellipse at 85% 85%, rgba(168, 85, 247, 0.10), transparent 50%), #080d1b"
    }}>
      {/* Top Navigation */}
      <Navbar settings={settings} onUpdate={handleUpdate} onReset={handleReset} />

      {/* Main App Body with Sidebar */}
      <div style={{ display: "flex", flex: 1, minHeight: "calc(100vh - 75px)" }}>
        <SidebarNav activeTab={activeTab} onSelectTab={setActiveTab} />

        {/* Tab View Content */}
        <main style={{ flex: 1, padding: "32px 40px", maxWidth: "1280px" }}>
          {activeTab === "overview" && (
            <OverviewTab
              settings={settings}
              onUpdate={handleUpdate}
              onNavigateTab={setActiveTab}
              onExport={handleExport}
            />
          )}

          {activeTab === "appearance" && (
            <AppearanceStudioTab settings={settings} onUpdate={handleUpdate} />
          )}

          {activeTab === "background" && (
            <BackgroundStudioTab settings={settings} onUpdate={handleUpdate} />
          )}

          {activeTab === "integrations" && (
            <PlatformIntegrationsTab settings={settings} onUpdate={handleUpdate} />
          )}

          {activeTab === "themes" && (
            <ThemeLibraryTab settings={settings} onUpdate={handleUpdate} />
          )}

          {activeTab === "settings" && (
            <SettingsTab
              settings={settings}
              onUpdate={handleUpdate}
              onReset={handleReset}
            />
          )}

          {activeTab === "privacy" && (
            <PrivacyCenterTab settings={settings} />
          )}
        </main>
      </div>
    </div>
  );
};
