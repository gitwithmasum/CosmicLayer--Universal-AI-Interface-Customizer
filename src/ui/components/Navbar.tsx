import React from "react";
import { RotateCcw, Activity } from "lucide-react";
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

  const activePlatformCount = Object.values(settings.platforms).filter(Boolean).length;

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 28px",
        background: "rgba(6, 10, 24, 0.85)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(56, 189, 248, 0.22)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
        position: "sticky",
        top: 0,
        zIndex: 50
      }}
    >
      {/* Laser Gradient Accent Line on top */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(90deg, transparent 0%, #00f0ff 30%, #a855f7 70%, transparent 100%)",
          boxShadow: "0 0 12px #00f0ff, 0 0 20px #a855f7",
          pointerEvents: "none"
        }}
      />

      {/* Left: Brand Identity with 3D Hexagon 'C' Planet Logo & Typography */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <CosmicLogo size={44} showText={true} />

        {/* Futuristic HUD Telemetry Badges */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginLeft: "8px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              padding: "3px 8px",
              borderRadius: "6px",
              background: "rgba(14, 165, 233, 0.12)",
              border: "1px solid rgba(56, 189, 248, 0.35)",
              color: "#38bdf8",
              fontFamily: "var(--cosmic-font-mono)",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.5px"
            }}
          >
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#38bdf8", boxShadow: "0 0 6px #38bdf8" }} />
            SYS v{settings.version}
          </div>

          <div
            style={{
              padding: "3px 8px",
              borderRadius: "6px",
              background: "rgba(168, 85, 247, 0.12)",
              border: "1px solid rgba(168, 85, 247, 0.3)",
              color: "#c084fc",
              fontFamily: "var(--cosmic-font-heading)",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.8px"
            }}
          >
            CORE // MV3
          </div>
        </div>
      </div>

      {/* Center: Live Matrix Telemetry Pill (ChatGPT, Claude, Gemini) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "5px 14px",
          borderRadius: "var(--cosmic-radius-full)",
          background: "rgba(10, 16, 32, 0.65)",
          border: "1px solid rgba(80, 140, 230, 0.2)",
          boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.05)"
        }}
        className="hidden lg:flex"
      >
        <Activity size={13} color="var(--cosmic-accent-cyan)" />
        <span style={{ fontSize: "11px", color: "var(--cosmic-text-muted)", fontFamily: "var(--cosmic-font-heading)" }}>
          WORKSPACE MATRIX ({activePlatformCount}/3):
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {(["chatgpt", "claude", "gemini"] as const).map((platform) => {
            const isEnabled = settings.platforms[platform] && settings.enabled;
            return (
              <span
                key={platform}
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  padding: "2px 7px",
                  borderRadius: "4px",
                  background: isEnabled ? "rgba(0, 240, 255, 0.15)" : "rgba(100, 116, 139, 0.15)",
                  border: `1px solid ${isEnabled ? "rgba(0, 240, 255, 0.35)" : "rgba(100, 116, 139, 0.2)"}`,
                  color: isEnabled ? "#7de7ff" : "#64748b",
                  textTransform: "uppercase"
                }}
              >
                {platform}
              </span>
            );
          })}
        </div>
      </div>

      {/* Right Controls: Futuristic Status HUD, Master Switch & Reset */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        {/* Status Pill with Pulsing Core */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 14px",
            borderRadius: "var(--cosmic-radius-full)",
            background: settings.enabled ? "rgba(16, 185, 129, 0.12)" : "rgba(100, 116, 139, 0.15)",
            border: `1px solid ${settings.enabled ? "rgba(52, 211, 153, 0.45)" : "rgba(100, 116, 139, 0.25)"}`,
            boxShadow: settings.enabled ? "0 0 16px rgba(52, 211, 153, 0.25)" : "none"
          }}
        >
          {/* Pulsing Core */}
          <div style={{ position: "relative", width: "8px", height: "8px" }}>
            <span
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background: settings.enabled ? "#34d399" : "#64748b",
                opacity: settings.enabled ? 0.75 : 0
              }}
              className={settings.enabled ? "animate-ping" : ""}
            />
            <span
              style={{
                position: "relative",
                display: "block",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: settings.enabled ? "#34d399" : "#64748b",
                boxShadow: settings.enabled ? "0 0 8px #34d399" : "none"
              }}
            />
          </div>

          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: settings.enabled ? "#34d399" : "#94a3b8",
              letterSpacing: "0.8px",
              fontFamily: "var(--cosmic-font-heading)"
            }}
          >
            {settings.enabled ? "SYNC ACTIVE // HARMONIZED" : "EFFECTS PAUSED"}
          </span>
        </div>

        {/* Master Cyber Switch */}
        <label
          className="cosmic-switch"
          title={settings.enabled ? "Pause all CosmicLayer customizations" : "Enable CosmicLayer"}
        >
          <input
            type="checkbox"
            checked={settings.enabled}
            onChange={toggleEnabled}
            aria-label="Master Enable CosmicLayer"
          />
          <span className="cosmic-switch-slider" />
        </label>

        {/* Quick Reset with Cyber Hover */}
        <button
          className="cosmic-btn cosmic-btn-secondary cosmic-btn-sm"
          onClick={onReset}
          title="Reset to default settings"
          style={{
            borderColor: "rgba(56, 189, 248, 0.25)",
            background: "rgba(14, 22, 44, 0.7)"
          }}
        >
          <RotateCcw size={13} color="var(--cosmic-accent-cyan)" />
          Reset Defaults
        </button>
      </div>
    </header>
  );
};
