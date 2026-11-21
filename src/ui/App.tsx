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
        background: "#05161a",
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
      height: "100vh",
      maxHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      background: "radial-gradient(ellipse at 0% 50%, rgba(15, 150, 156, 0.16), transparent 55%), radial-gradient(ellipse at 100% 50%, rgba(12, 112, 117, 0.20), transparent 55%), radial-gradient(ellipse at 50% 0%, rgba(109, 165, 192, 0.08), transparent 60%), #05161a"
    }}>
      {/* Top Navigation Bar — Fixed at top */}
      <Navbar settings={settings} onUpdate={handleUpdate} onReset={handleReset} />

      {/* Main App Body with Fixed Sidebar & Scrollable Content Area */}
      <div style={{ display: "flex", flex: 1, minHeight: 0, overflow: "hidden" }}>
        {/* Left Sidebar Navigation — Fixed on left */}
        <SidebarNav activeTab={activeTab} onSelectTab={setActiveTab} />

        {/* Tab View Content — ONLY this body container scrolls */}
        <main
          style={{
            flex: 1,
            height: "100%",
            overflowY: "auto",
            overflowX: "hidden",
            minHeight: 0,
            padding: "32px 40px"
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
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
          </div>
        </main>
      </div>
    </div>
  );
};
