import React, { useState } from "react";
import {
  Palette,
  Copy,
  Check,
  Layers
} from "lucide-react";
import type { CosmicSettings } from "../../shared/types";
import { LiveMockupPreview } from "./LiveMockupPreview";

interface AppearanceStudioTabProps {
  settings: CosmicSettings;
  onUpdate: (next: CosmicSettings) => void;
}

export const AppearanceStudioTab: React.FC<AppearanceStudioTabProps> = ({ settings, onUpdate }) => {
  const [copied, setCopied] = useState(false);

  const accentColors = [
    { label: "Electric Cyan", color: "#7de7ff" },
    { label: "Neon Violet", color: "#c084fc" },
    { label: "Cosmic Gold", color: "#fbbf24" },
    { label: "Aurora Emerald", color: "#34d399" },
    { label: "Solar Flare", color: "#fb923c" },
    { label: "Cobalt Blue", color: "#60a5fa" },
    { label: "Stellar Rose", color: "#f43f5e" },
    { label: "AMOLED Silver", color: "#e2e8f0" }
  ];

  const generatedCss = `:root {
  --cosmic-accent: ${settings.accentColor};
  --cosmic-glass-blur: ${settings.glassBlur}px;
  --cosmic-glass-opacity: ${settings.glassOpacity / 100};
  --cosmic-contrast-boost: ${settings.contrastBoost ? "1.15" : "1.0"};
  --cosmic-reduce-motion: ${settings.reduceMotion ? "reduce" : "no-preference"};
}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Header */}
      <div>
        <h1 style={{ fontFamily: "var(--cosmic-font-heading)", fontSize: "22px", fontWeight: 700, margin: 0 }}>
          Appearance Studio
        </h1>
        <p style={{ fontSize: "13px", color: "var(--cosmic-text-secondary)", margin: "4px 0 0 0" }}>
          Fine-tune global interface accents, glassmorphism refraction, contrast enhancement, and motion preferences.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "24px", alignItems: "start" }}>
        {/* Controls Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Accent Color Palette */}
          <div className="glass-panel" style={{ padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <Palette size={18} color="var(--cosmic-accent-cyan)" />
              <h2 style={{ fontFamily: "var(--cosmic-font-heading)", fontSize: "14px", fontWeight: 600, margin: 0 }}>
                Accent & Energy Color
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "10px", marginBottom: "14px" }}>
              {accentColors.map((acc) => {
                const isSelected = settings.accentColor.toLowerCase() === acc.color.toLowerCase();
                return (
                  <button
                    key={acc.color}
                    onClick={() => onUpdate({ ...settings, accentColor: acc.color })}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "8px 12px",
                      borderRadius: "var(--cosmic-radius-md)",
                      border: isSelected ? `2px solid ${acc.color}` : "1px solid var(--cosmic-border-subtle)",
                      background: isSelected ? "rgba(255, 255, 255, 0.08)" : "rgba(10, 16, 32, 0.6)",
                      cursor: "pointer",
                      transition: "all var(--cosmic-transition-fast)"
                    }}
                  >
                    <span style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      background: acc.color,
                      boxShadow: isSelected ? `0 0 10px ${acc.color}` : "none",
                      flexShrink: 0
                    }} />
                    <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--cosmic-text-primary)" }}>
                      {acc.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Custom hex input */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "12px", color: "var(--cosmic-text-secondary)" }}>Custom Accent:</span>
              <input
                type="color"
                value={settings.accentColor}
                onChange={(e) => onUpdate({ ...settings, accentColor: e.target.value })}
                style={{ width: "36px", height: "30px", border: "none", background: "none", cursor: "pointer", borderRadius: "4px" }}
              />
              <span style={{ fontFamily: "var(--cosmic-font-mono)", fontSize: "12px", color: settings.accentColor }}>
                {settings.accentColor}
              </span>
            </div>
          </div>

          {/* Glassmorphism Controls */}
          <div className="glass-panel" style={{ padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <Layers size={18} color="var(--cosmic-accent-violet)" />
              <h2 style={{ fontFamily: "var(--cosmic-font-heading)", fontSize: "14px", fontWeight: 600, margin: 0 }}>
                Glassmorphism Surface Tuning
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Glass Blur */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "12px" }}>
                  <span style={{ color: "var(--cosmic-text-secondary)", fontWeight: 500 }}>Backdrop Frosting Blur</span>
                  <span className="cosmic-badge cosmic-badge-violet">{settings.glassBlur}px</span>
                </div>
                <input
                  type="range"
                  className="cosmic-slider"
                  min="0"
                  max="30"
                  value={settings.glassBlur}
                  onChange={(e) => onUpdate({ ...settings, glassBlur: Number(e.target.value) })}
                  aria-label="Glass Blur"
                />
              </div>

              {/* Glass Opacity */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "12px" }}>
                  <span style={{ color: "var(--cosmic-text-secondary)", fontWeight: 500 }}>Glass Surface Opacity</span>
                  <span className="cosmic-badge cosmic-badge-cyan">{settings.glassOpacity}%</span>
                </div>
                <input
                  type="range"
                  className="cosmic-slider"
                  min="10"
                  max="90"
                  value={settings.glassOpacity}
                  onChange={(e) => onUpdate({ ...settings, glassOpacity: Number(e.target.value) })}
                  aria-label="Glass Opacity"
                />
              </div>
            </div>
          </div>

          {/* Accessibility & Visual Enhancements */}
          <div className="glass-panel" style={{ padding: "20px" }}>
            <h2 style={{ fontFamily: "var(--cosmic-font-heading)", fontSize: "14px", fontWeight: 600, marginBottom: "16px" }}>
              Accessibility & Motion
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {/* Contrast Boost */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--cosmic-text-primary)" }}>
                    High-Contrast Borders
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--cosmic-text-muted)" }}>
                    Accentuates chat containers with crisp outlines for enhanced legibility.
                  </div>
                </div>
                <label className="cosmic-switch">
                  <input
                    type="checkbox"
                    checked={settings.contrastBoost}
                    onChange={(e) => onUpdate({ ...settings, contrastBoost: e.target.checked })}
                    aria-label="Toggle High-Contrast Borders"
                  />
                  <span className="cosmic-switch-slider" />
                </label>
              </div>

              {/* Reduced Motion */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--cosmic-text-primary)" }}>
                    Respect Reduced Motion
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--cosmic-text-muted)" }}>
                    Suppresses transition animations on hover and navigation changes.
                  </div>
                </div>
                <label className="cosmic-switch">
                  <input
                    type="checkbox"
                    checked={settings.reduceMotion}
                    onChange={(e) => onUpdate({ ...settings, reduceMotion: e.target.checked })}
                    aria-label="Toggle Respect Reduced Motion"
                  />
                  <span className="cosmic-switch-slider" />
                </label>
              </div>
            </div>
          </div>

          {/* CSS Variable Live Inspector */}
          <div className="glass-panel" style={{ padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
              <h2 style={{ fontFamily: "var(--cosmic-font-heading)", fontSize: "14px", fontWeight: 600, margin: 0 }}>
                Live CSS Tokens
              </h2>
              <button
                className="cosmic-btn cosmic-btn-secondary cosmic-btn-sm"
                onClick={copyToClipboard}
              >
                {copied ? <Check size={12} color="#34d399" /> : <Copy size={12} />}
                {copied ? "Copied" : "Copy CSS"}
              </button>
            </div>
            <pre style={{
              background: "rgba(5, 8, 17, 0.95)",
              padding: "12px",
              borderRadius: "8px",
              fontSize: "11px",
              color: "#38bdf8",
              fontFamily: "var(--cosmic-font-mono)",
              overflowX: "auto"
            }}>
              {generatedCss}
            </pre>
          </div>
        </div>

        {/* Simulator Column */}
        <div style={{ position: "sticky", top: "85px" }}>
          <LiveMockupPreview settings={settings} />
        </div>
      </div>
    </div>
  );
};
