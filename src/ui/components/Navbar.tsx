import React from "react";
import { RotateCcw } from "lucide-react";
import type { CosmicSettings } from "../../shared/types";
import { CosmicLogo } from "./CosmicLogo";

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
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 24px",
        background: "rgba(6, 10, 24, 0.78)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
        position: "sticky",
        top: 0,
        zIndex: 50
      }}
    >
      {/* Subtle delicate top edge accent */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent 0%, rgba(0, 240, 255, 0.35) 40%, rgba(168, 85, 247, 0.35) 70%, transparent 100%)",
          pointerEvents: "none"
        }}
      />

      {/* Left: Brand Identity + Subtle Minimal Version Pill */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <CosmicLogo size={34} showText={true} />

        <span
          style={{
            padding: "2px 8px",
            borderRadius: "9999px",
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            color: "var(--cosmic-text-muted)",
            fontSize: "11px",
            fontWeight: 500,
            fontFamily: "var(--cosmic-font-mono)",
            letterSpacing: "0.2px"
          }}
        >
          v{settings.version}
        </span>
      </div>

      {/* Right Controls: Minimalist Status Pill, Master Toggle & Reset Button */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* Clean Status Indicator */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            padding: "4px 10px",
            borderRadius: "9999px",
            background: settings.enabled ? "rgba(16, 185, 129, 0.08)" : "rgba(255, 255, 255, 0.03)",
            border: `1px solid ${settings.enabled ? "rgba(52, 211, 153, 0.25)" : "rgba(255, 255, 255, 0.06)"}`,
            transition: "all var(--cosmic-transition-fast)"
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: settings.enabled ? "#34d399" : "#64748b",
              boxShadow: settings.enabled ? "0 0 6px rgba(52, 211, 153, 0.7)" : "none",
              display: "inline-block"
            }}
          />
          <span
            style={{
              fontSize: "11px",
              fontWeight: 600,
              color: settings.enabled ? "#34d399" : "#94a3b8",
              letterSpacing: "0.3px"
            }}
          >
            {settings.enabled ? "Active" : "Paused"}
          </span>
        </div>

        {/* Master Switch */}
        <label
          className="cosmic-switch"
          title={settings.enabled ? "Pause customizations" : "Enable customizations"}
          style={{ margin: 0 }}
        >
          <input
            type="checkbox"
            checked={settings.enabled}
            onChange={toggleEnabled}
            aria-label="Master Enable CosmicLayer"
          />
          <span className="cosmic-switch-slider" />
        </label>

        {/* Minimalist Reset Button */}
        <button
          onClick={onReset}
          title="Reset to default settings"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "5px 11px",
            fontSize: "12px",
            fontWeight: 500,
            color: "var(--cosmic-text-secondary)",
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "6px",
            cursor: "pointer",
            transition: "all var(--cosmic-transition-fast)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(0, 240, 255, 0.35)";
            e.currentTarget.style.color = "#ffffff";
            e.currentTarget.style.background = "rgba(0, 240, 255, 0.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
            e.currentTarget.style.color = "var(--cosmic-text-secondary)";
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
          }}
        >
          <RotateCcw size={12} color="var(--cosmic-accent-cyan)" />
          <span>Reset</span>
        </button>
      </div>
    </header>
  );
};
