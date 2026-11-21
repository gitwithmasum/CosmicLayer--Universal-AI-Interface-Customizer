import React, { useState } from "react";
import {
  Sparkles,
  Check,
  Eye,
  Search,
  Filter
} from "lucide-react";
import type { CosmicSettings, ThemeDefinition } from "../../shared/types";
import { THEME_LIST } from "../../shared/themes";
import { LiveMockupPreview } from "./LiveMockupPreview";

interface ThemeLibraryTabProps {
  settings: CosmicSettings;
  onUpdate: (next: CosmicSettings) => void;
}

export const ThemeLibraryTab: React.FC<ThemeLibraryTabProps> = ({ settings, onUpdate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [previewTheme, setPreviewTheme] = useState<ThemeDefinition | null>(null);
  const [appliedToast, setAppliedToast] = useState<string | null>(null);

  const categories = ["All", "Space", "Cyber", "Minimal", "Elemental"];

  const filteredThemes = THEME_LIST.filter((theme) => {
    const matchesCategory = selectedCategory === "All" || theme.category === selectedCategory;
    const matchesSearch =
      theme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      theme.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleApply = (theme: ThemeDefinition) => {
    onUpdate({
      ...settings,
      theme: theme.id,
      accentColor: theme.accentColor,
      activeGradient: theme.backgroundCss,
      enabled: true
    });
    setPreviewTheme(null);
    setAppliedToast(`Applied "${theme.name}" theme`);
    setTimeout(() => setAppliedToast(null), 2500);
  };

  // Preview settings: uses previewTheme if user clicked preview, otherwise active settings
  const simulatedSettings: CosmicSettings = previewTheme
    ? {
        ...settings,
        theme: previewTheme.id,
        accentColor: previewTheme.accentColor,
        activeGradient: previewTheme.backgroundCss,
        wallpaper: undefined // show theme gradient clearly during preview
      }
    : settings;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Top Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontFamily: "var(--cosmic-font-heading)", fontSize: "22px", fontWeight: 700, margin: 0 }}>
            Theme Library
          </h1>
          <p style={{ fontSize: "13px", color: "var(--cosmic-text-secondary)", margin: "4px 0 0 0" }}>
            Explore 10 handcrafted space-grade themes. Preview instantly or apply across all AI platforms.
          </p>
        </div>

        {appliedToast && (
          <span className="cosmic-badge cosmic-badge-emerald" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <Check size={12} /> {appliedToast}
          </span>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "14px",
        flexWrap: "wrap",
        background: "rgba(10, 16, 32, 0.6)",
        padding: "12px 18px",
        borderRadius: "var(--cosmic-radius-lg)",
        border: "1px solid var(--cosmic-border-subtle)"
      }}>
        {/* Category Pills */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
          <Filter size={14} color="var(--cosmic-text-muted)" style={{ marginRight: "4px" }} />
          {categories.map((cat) => (
            <button
              key={cat}
              className={`cosmic-btn cosmic-btn-sm ${selectedCategory === cat ? "cosmic-btn-primary" : "cosmic-btn-secondary"}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div style={{ position: "relative", minWidth: "220px" }}>
          <Search size={14} color="var(--cosmic-text-muted)" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }} />
          <input
            type="text"
            className="cosmic-input"
            placeholder="Search themes…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: "32px", fontSize: "12px" }}
          />
        </div>
      </div>

      {/* Content Layout: Theme Cards Grid + Simulator */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "24px", alignItems: "start" }}>
        {/* Themes Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
          {filteredThemes.map((theme) => {
            const isCurrentlyActive = settings.theme === theme.id;
            const isBeingPreviewed = previewTheme?.id === theme.id;

            return (
              <div
                key={theme.id}
                className="glass-panel"
                style={{
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderColor: isCurrentlyActive
                    ? "var(--cosmic-accent-cyan)"
                    : isBeingPreviewed
                    ? "var(--cosmic-accent-violet)"
                    : "var(--cosmic-border-subtle)",
                  boxShadow: isCurrentlyActive
                    ? "0 0 16px var(--cosmic-accent-cyan-glow)"
                    : "var(--cosmic-shadow-sm)"
                }}
              >
                <div>
                  {/* Visual Theme Header Banner */}
                  <div style={{
                    height: "70px",
                    borderRadius: "8px",
                    background: theme.backgroundCss,
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    marginBottom: "12px",
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "flex-end",
                    padding: "8px"
                  }}>
                    <span className="cosmic-badge cosmic-badge-muted" style={{ background: "rgba(0,0,0,0.6)", fontSize: "9px" }}>
                      {theme.category}
                    </span>
                    {isCurrentlyActive && (
                      <span className="cosmic-badge cosmic-badge-cyan" style={{ marginLeft: "auto", fontSize: "9px" }}>
                        ACTIVE
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                    <h3 style={{
                      fontFamily: "var(--cosmic-font-heading)",
                      fontSize: "15px",
                      fontWeight: 700,
                      color: theme.accentColor
                    }}>
                      {theme.name}
                    </h3>
                  </div>

                  <p style={{ fontSize: "11px", color: "var(--cosmic-text-secondary)", lineHeight: 1.4, minHeight: "32px", margin: "0 0 12px 0" }}>
                    {theme.tagline}
                  </p>

                  {/* Swatch palette */}
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "16px" }}>
                    <span title={`Accent: ${theme.accentColor}`} style={{ width: "16px", height: "16px", borderRadius: "50%", background: theme.accentColor, border: "1px solid rgba(255,255,255,0.2)" }} />
                    <span title={`Secondary: ${theme.secondaryAccent}`} style={{ width: "16px", height: "16px", borderRadius: "50%", background: theme.secondaryAccent, border: "1px solid rgba(255,255,255,0.2)" }} />
                    <span title="Glass Tint" style={{ width: "16px", height: "16px", borderRadius: "50%", background: theme.glassTint, border: "1px solid rgba(255,255,255,0.2)" }} />
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    className={`cosmic-btn cosmic-btn-sm ${isBeingPreviewed ? "cosmic-btn-primary" : "cosmic-btn-secondary"}`}
                    style={{ flex: 1 }}
                    onClick={() => setPreviewTheme(isBeingPreviewed ? null : theme)}
                  >
                    <Eye size={12} /> {isBeingPreviewed ? "Clear Preview" : "Preview"}
                  </button>
                  <button
                    className={`cosmic-btn cosmic-btn-sm ${isCurrentlyActive ? "cosmic-btn-secondary" : "cosmic-btn-primary"}`}
                    style={{ flex: 1.2 }}
                    onClick={() => handleApply(theme)}
                    disabled={isCurrentlyActive}
                  >
                    {isCurrentlyActive ? (
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <Check size={12} /> Applied
                      </span>
                    ) : (
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <Sparkles size={12} /> Apply
                      </span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Simulator Column */}
        <div style={{ position: "sticky", top: "85px", display: "flex", flexDirection: "column", gap: "16px" }}>
          {previewTheme && (
            <div className="glass-card" style={{
              background: "rgba(168, 85, 247, 0.12)",
              border: "1px solid rgba(168, 85, 247, 0.4)",
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <div>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#c084fc", textTransform: "uppercase" }}>
                  Previewing: {previewTheme.name}
                </span>
                <div style={{ fontSize: "11px", color: "var(--cosmic-text-muted)" }}>
                  Click Apply to keep this theme.
                </div>
              </div>
              <button
                className="cosmic-btn cosmic-btn-primary cosmic-btn-sm"
                onClick={() => handleApply(previewTheme)}
              >
                Apply Now
              </button>
            </div>
          )}

          <LiveMockupPreview settings={simulatedSettings} />
        </div>
      </div>
    </div>
  );
};
