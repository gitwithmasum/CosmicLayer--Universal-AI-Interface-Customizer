import React from "react";
import { Sparkles, RotateCcw } from "lucide-react";
import type { CosmicSettings } from "../../shared/types";

interface NavbarProps {
  settings: CosmicSettings;
  onUpdate: (next: CosmicSettings) => void;
  onReset: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ settings, onUpdate, onReset }) => {
  const toggleEnabled = () => {
    onUpdate({
      ...settings,
      enabled: !settings.enabled
    });
  };

  return (
    <header style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 28px",
      borderBottom: "1px solid var(--cosmic-border-subtle)",
      background: "rgba(8, 13, 27, 0.8)",
      backdropFilter: "blur(12px)",
      position: "sticky",
      top: 0,
      zIndex: 50
    }}>
      {/* Brand Identity */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <div style={{
          width: "42px",
          height: "42px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 20px rgba(14, 165, 233, 0.4)",
          border: "1px solid rgba(255, 255, 255, 0.2)"
        }}>
          <Sparkles size={22} color="#ffffff" />
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{
              fontFamily: "var(--cosmic-font-heading)",
              fontSize: "18px",
              fontWeight: 700,
              letterSpacing: "-0.3px",
              background: "linear-gradient(90deg, #7de7ff, #c084fc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              CosmicLayer
            </span>
            <span className="cosmic-badge cosmic-badge-cyan">v{settings.version}</span>
            <span className="cosmic-badge cosmic-badge-muted">FOUNDATION</span>
          </div>
          <div style={{ fontSize: "11px", color: "var(--cosmic-text-muted)", letterSpacing: "0.2px" }}>
            Universal AI Interface Customizer
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {/* Status Pill */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "6px 14px",
          borderRadius: "var(--cosmic-radius-full)",
          background: settings.enabled ? "rgba(52, 211, 153, 0.12)" : "rgba(100, 116, 139, 0.15)",
          border: `1px solid ${settings.enabled ? "rgba(52, 211, 153, 0.35)" : "rgba(100, 116, 139, 0.25)"}`
        }}>
          <span style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: settings.enabled ? "#34d399" : "#64748b",
            boxShadow: settings.enabled ? "0 0 10px #34d399" : "none"
          }} />
          <span style={{
            fontSize: "11px",
            fontWeight: 600,
            color: settings.enabled ? "#34d399" : "#94a3b8",
            letterSpacing: "0.6px"
          }}>
            {settings.enabled ? "ACTIVE ACROSS WORKSPACES" : "CUSTOMIZATION PAUSED"}
          </span>
        </div>

        {/* Master Toggle */}
        <label className="cosmic-switch" title={settings.enabled ? "Pause all CosmicLayer customizations" : "Enable CosmicLayer"}>
          <input
            type="checkbox"
            checked={settings.enabled}
            onChange={toggleEnabled}
            aria-label="Master Enable CosmicLayer"
          />
          <span className="cosmic-switch-slider" />
        </label>

        {/* Quick Reset */}
        <button
          className="cosmic-btn cosmic-btn-secondary cosmic-btn-sm"
          onClick={onReset}
          title="Reset to default settings"
        >
          <RotateCcw size={13} />
          Reset Defaults
        </button>
      </div>
    </header>
  );
};
