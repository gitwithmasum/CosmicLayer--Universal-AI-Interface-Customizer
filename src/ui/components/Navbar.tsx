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
        background: "rgba(5, 22, 26, 0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(41, 77, 97, 0.35)",
        boxShadow: "0 4px 20px rgba(5, 22, 26, 0.6)",
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
          background: "linear-gradient(90deg, transparent 0%, rgba(15, 150, 156, 0.45) 40%, rgba(109, 165, 192, 0.45) 70%, transparent 100%)",
          pointerEvents: "none"
        }}
      />

      {/* Left: Brand Identity (Single clean horizontal row without version badge) */}
      <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
        <CosmicLogo size={36} showText={true} />
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
            background: settings.enabled ? "rgba(15, 150, 156, 0.14)" : "rgba(41, 77, 97, 0.25)",
            border: `1px solid ${settings.enabled ? "rgba(15, 150, 156, 0.4)" : "rgba(41, 77, 97, 0.4)"}`,
            transition: "all var(--cosmic-transition-fast)"
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: settings.enabled ? "#0f969c" : "#6da5c0",
              boxShadow: settings.enabled ? "0 0 8px rgba(15, 150, 156, 0.8)" : "none",
              display: "inline-block"
            }}
          />
          <span
            style={{
              fontSize: "11px",
              fontWeight: 600,
              color: settings.enabled ? "#6da5c0" : "#436a7e",
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
            color: "#6da5c0",
            background: "rgba(41, 77, 97, 0.35)",
            border: "1px solid rgba(41, 77, 97, 0.5)",
            borderRadius: "6px",
            cursor: "pointer",
            transition: "all var(--cosmic-transition-fast)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(15, 150, 156, 0.6)";
            e.currentTarget.style.color = "#ffffff";
            e.currentTarget.style.background = "rgba(15, 150, 156, 0.18)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(41, 77, 97, 0.5)";
            e.currentTarget.style.color = "#6da5c0";
            e.currentTarget.style.background = "rgba(41, 77, 97, 0.35)";
          }}
        >
          <RotateCcw size={12} color="#0f969c" />
          <span>Reset</span>
        </button>
      </div>
    </header>
  );
};
