import React, { useState } from "react";
import {
  LayoutTemplate,
  Check,
  RotateCcw,
  Sparkles,
  Zap,
  Sliders
} from "lucide-react";
import type {
  CosmicSettings,
  NavbarStylePreset,
  GlowLinePosition
} from "../../shared/types";
import {
  NAVBAR_PRESETS,
  GLOW_LINE_GRADIENTS,
  DEFAULT_SETTINGS
} from "../../shared/types";

interface NavbarStudioTabProps {
  settings: CosmicSettings;
  onUpdate: (next: CosmicSettings) => void;
}

export const NavbarStudioTab: React.FC<NavbarStudioTabProps> = ({ settings, onUpdate }) => {
  const [activeSimulatorPlatform, setActiveSimulatorPlatform] = useState<"chatgpt" | "claude" | "gemini">("chatgpt");
  const [syncSuccess, setSyncSuccess] = useState(false);

  const nav = settings.navbar || DEFAULT_SETTINGS.navbar;
  const currentPreset = NAVBAR_PRESETS[nav.stylePreset] || NAVBAR_PRESETS["oceanic-teal"];

  const updateNavbar = (partialNav: Partial<typeof nav>) => {
    onUpdate({
      ...settings,
      navbar: {
        ...nav,
        ...partialNav
      }
    });
  };

  const handleSelectPreset = (presetId: NavbarStylePreset) => {
    const preset = NAVBAR_PRESETS[presetId];
    updateNavbar({
      stylePreset: presetId,
      glowLineColor: preset.accentGradient
    });
  };

  const handleSyncAllPlatforms = () => {
    onUpdate({
      ...settings,
      navbar: {
        ...nav,
        enabled: true,
        platforms: {
          chatgpt: true,
          claude: true,
          gemini: true
        }
      }
    });
    setSyncSuccess(true);
    setTimeout(() => setSyncSuccess(false), 2200);
  };

  const handleResetNavbar = () => {
    onUpdate({
      ...settings,
      navbar: {
        ...DEFAULT_SETTINGS.navbar
      }
    });
  };

  // Compute simulated navbar style
  const alpha = Math.max(30, Math.min(95, nav.opacity)) / 100;
  let simulatedBg = currentPreset.bgRgba;
  if (simulatedBg.startsWith("rgba(")) {
    simulatedBg = simulatedBg.replace(/[\d\.]+\)$/, `${alpha})`);
  }

  const modelLabels = {
    chatgpt: "ChatGPT 4o",
    claude: "Claude 3.5 Sonnet",
    gemini: "Gemini 1.5 Pro"
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Header Banner */}
      <div style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "16px"
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "34px",
              height: "34px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, rgba(15, 150, 156, 0.3), rgba(12, 112, 117, 0.4))",
              border: "1px solid rgba(15, 150, 156, 0.5)",
              boxShadow: "0 0 16px rgba(15, 150, 156, 0.35)"
            }}>
              <LayoutTemplate size={18} color="#6da5c0" />
            </span>
            <h1 style={{
              fontFamily: "var(--cosmic-font-heading)",
              fontSize: "24px",
              fontWeight: 800,
              margin: 0,
              color: "#ffffff",
              letterSpacing: "-0.01em"
            }}>
              AI Navbar Studio
            </h1>
            <span style={{
              fontSize: "11px",
              fontWeight: 700,
              padding: "3px 10px",
              borderRadius: "9999px",
              background: nav.enabled ? "rgba(15, 150, 156, 0.2)" : "rgba(255, 255, 255, 0.06)",
              color: nav.enabled ? "#6da5c0" : "var(--cosmic-text-muted)",
              border: `1px solid ${nav.enabled ? "rgba(15, 150, 156, 0.45)" : "rgba(255, 255, 255, 0.15)"}`
            }}>
              {nav.enabled ? "● ACTIVE ON AI CHATS" : "○ DISABLED"}
            </span>
          </div>
          <p style={{ fontSize: "13px", color: "var(--cosmic-text-secondary)", margin: 0, maxWidth: "620px", lineHeight: 1.5 }}>
            Transform the top navigation bar of ChatGPT, Claude, and Gemini with CosmicLayer’s futuristic glassmorphic aesthetic, luminous neon edge underlines, and glowing stretchy model capsules.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            onClick={handleSyncAllPlatforms}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "9px 18px",
              borderRadius: "12px",
              background: "linear-gradient(105deg, #0f969c 0%, #0c7075 55%, #072e33 100%)",
              border: "1px solid rgba(15, 150, 156, 0.6)",
              boxShadow: "0 4px 18px rgba(15, 150, 156, 0.4), inset 0 1px 1px rgba(109, 165, 192, 0.6)",
              color: "#ffffff",
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.25s ease"
            }}
          >
            {syncSuccess ? <Check size={14} color="#34d399" /> : <Zap size={14} color="#6da5c0" />}
            <span>{syncSuccess ? "Synchronized Across All AI!" : "⚡ Sync All 3 AI Workspaces"}</span>
          </button>

          <button
            onClick={handleResetNavbar}
            title="Reset navbar settings to default"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "9px 14px",
              borderRadius: "12px",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(41, 77, 97, 0.4)",
              color: "var(--cosmic-text-secondary)",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            <RotateCcw size={13} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE LIVE AI NAVBAR SIMULATOR                                      */}
      {/* ========================================================================= */}
      <div className="glass-panel" style={{ padding: "0", overflow: "hidden" }}>
        {/* Simulator Bar Controls */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 20px",
          borderBottom: "1px solid rgba(41, 77, 97, 0.35)",
          background: "rgba(5, 22, 26, 0.85)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "#6da5c0", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Live AI Chat Header Simulator
            </span>
            <span style={{
              fontSize: "10px",
              padding: "2px 8px",
              borderRadius: "6px",
              background: "rgba(15, 150, 156, 0.18)",
              color: "#0f969c",
              border: "1px solid rgba(15, 150, 156, 0.35)"
            }}>
              REAL-TIME PREVIEW
            </span>
          </div>

          {/* Platform Switcher */}
          <div style={{ display: "flex", gap: "6px", background: "rgba(5, 22, 26, 0.9)", padding: "3px", borderRadius: "10px", border: "1px solid rgba(41, 77, 97, 0.4)" }}>
            {(["chatgpt", "claude", "gemini"] as const).map((p) => {
              const active = activeSimulatorPlatform === p;
              return (
                <button
                  key={p}
                  onClick={() => setActiveSimulatorPlatform(p)}
                  style={{
                    padding: "4px 12px",
                    borderRadius: "8px",
                    border: "none",
                    background: active ? "rgba(15, 150, 156, 0.3)" : "transparent",
                    color: active ? "#ffffff" : "#6da5c0",
                    fontWeight: active ? 700 : 500,
                    fontSize: "11px",
                    cursor: "pointer",
                    textTransform: "uppercase",
                    boxShadow: active ? "0 0 10px rgba(15, 150, 156, 0.4)" : "none",
                    transition: "all 0.2s ease"
                  }}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>

        {/* The Simulated AI Chat Top Viewport */}
        <div style={{
          position: "relative",
          minHeight: "220px",
          background: "radial-gradient(ellipse at 50% 30%, rgba(7, 46, 51, 0.35), transparent 70%), #05161a",
          display: "flex",
          flexDirection: "column"
        }}>
          {/* Simulated Top Navbar in Action */}
          <div
            style={{
              position: "relative",
              height: "64px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 24px",
              background: nav.enabled ? simulatedBg : "rgba(15, 23, 42, 0.9)",
              backdropFilter: nav.enabled ? `blur(${nav.glassBlur}px)` : "none",
              WebkitBackdropFilter: nav.enabled ? `blur(${nav.glassBlur}px)` : "none",
              borderBottom: `1px solid ${nav.enabled ? currentPreset.borderColor : "rgba(255, 255, 255, 0.1)"}`,
              boxShadow: nav.enabled ? "0 4px 24px rgba(5, 22, 26, 0.6)" : "none",
              transition: "all 0.25s ease"
            }}
          >
            {/* Top Glow Line (if top or both) */}
            {nav.enabled && nav.showNeonGlowLine && (nav.glowLinePosition === "top" || nav.glowLinePosition === "both") && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: nav.glowLineColor || currentPreset.accentGradient,
                  boxShadow: `0 0 14px ${currentPreset.glowColor}`
                }}
              />
            )}

            {/* Left section: Sidebar Collapse + Model Selector */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: `1px solid ${currentPreset.borderColor}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#6da5c0",
                  cursor: "pointer"
                }}
              >
                <LayoutTemplate size={14} />
              </div>

              {/* Model Switcher Capsule — Styled with Concept 4 Glow */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: nav.styleModelCapsule ? "6px 16px" : "6px 12px",
                  borderRadius: nav.styleModelCapsule ? "9999px" : "8px",
                  background: nav.styleModelCapsule ? currentPreset.capsuleBg : "rgba(255, 255, 255, 0.08)",
                  border: `1px solid ${nav.styleModelCapsule ? currentPreset.capsuleBorder : "rgba(255, 255, 255, 0.15)"}`,
                  boxShadow: nav.styleModelCapsule ? `0 4px 18px ${currentPreset.glowColor}, inset 0 1px 1px rgba(255, 255, 255, 0.4)` : "none",
                  color: "#ffffff",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                  cursor: "pointer",
                  transition: "all 0.25s ease"
                }}
              >
                <Sparkles size={13} color="#ffffff" />
                <span>{modelLabels[activeSimulatorPlatform]}</span>
                <span style={{ fontSize: "10px", opacity: 0.8 }}>▼</span>
              </div>
            </div>

            {/* Right section: Injected Cosmic Badge + Action Buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {/* Injected Cosmic Watermark Capsule */}
              {nav.enabled && nav.showCosmicBadge && (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "4px 12px",
                    borderRadius: "9999px",
                    background: "rgba(5, 22, 26, 0.85)",
                    border: "1px solid rgba(15, 150, 156, 0.55)",
                    boxShadow: "0 0 14px rgba(15, 150, 156, 0.35)",
                    fontSize: "10px",
                    fontWeight: 800,
                    letterSpacing: "0.06em",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)"
                  }}
                >
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#0f969c", boxShadow: "0 0 8px #0f969c" }} />
                  <span style={{ background: "linear-gradient(135deg, #ffffff 0%, #6da5c0 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    C🪐SMIC
                  </span>
                </div>
              )}

              {/* Chat action dummy buttons */}
              <div
                style={{
                  padding: "6px 12px",
                  borderRadius: "10px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: `1px solid ${currentPreset.borderColor}`,
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#6da5c0",
                  cursor: "pointer"
                }}
              >
                Share Chat
              </div>

              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #0f969c, #072e33)",
                  border: "1px solid rgba(109, 165, 192, 0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "#ffffff"
                }}
              >
                AI
              </div>
            </div>

            {/* Bottom Glow Line (if bottom or both) */}
            {nav.enabled && nav.showNeonGlowLine && (nav.glowLinePosition === "bottom" || nav.glowLinePosition === "both") && (
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: nav.glowLineColor || currentPreset.accentGradient,
                  boxShadow: `0 0 14px ${currentPreset.glowColor}`
                }}
              />
            )}
          </div>

          {/* Dummy message body underneath */}
          <div style={{ flex: 1, padding: "28px 32px", display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{
              alignSelf: "flex-end",
              background: "rgba(15, 150, 156, 0.22)",
              border: "1px solid rgba(15, 150, 156, 0.4)",
              borderRadius: "14px 14px 4px 14px",
              padding: "10px 16px",
              fontSize: "12px",
              color: "#ffffff",
              maxWidth: "420px"
            }}>
              Can you customize my {modelLabels[activeSimulatorPlatform]} header to match CosmicLayer?
            </div>
            <div style={{
              alignSelf: "flex-start",
              background: "rgba(7, 46, 51, 0.5)",
              border: "1px solid rgba(41, 77, 97, 0.35)",
              borderRadius: "14px 14px 14px 4px",
              padding: "12px 18px",
              fontSize: "12px",
              color: "#e2e8f0",
              maxWidth: "480px",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <Sparkles size={14} color="#0f969c" />
              <span>CosmicLayer Header applied! Glassmorphic blur, luminous underline, and Concept 4 capsule active.</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5 HAND-CRAFTED STYLE PRESETS                                              */}
      {/* ========================================================================= */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
          <div>
            <h2 style={{ fontFamily: "var(--cosmic-font-heading)", fontSize: "16px", fontWeight: 700, margin: 0, color: "#ffffff" }}>
              Navbar Style Presets
            </h2>
            <p style={{ fontSize: "12px", color: "var(--cosmic-text-secondary)", margin: "2px 0 0 0" }}>
              Select a signature style designed to match or contrast your chosen wallpaper and theme.
            </p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px" }}>
          {(Object.keys(NAVBAR_PRESETS) as NavbarStylePreset[]).map((presetId) => {
            const preset = NAVBAR_PRESETS[presetId];
            const isSelected = nav.stylePreset === presetId;

            return (
              <div
                key={presetId}
                onClick={() => handleSelectPreset(presetId)}
                style={{
                  background: isSelected ? "rgba(12, 112, 117, 0.28)" : "rgba(7, 46, 51, 0.4)",
                  border: `1.5px solid ${isSelected ? "#0f969c" : "rgba(41, 77, 97, 0.35)"}`,
                  boxShadow: isSelected ? "0 0 20px rgba(15, 150, 156, 0.4)" : "none",
                  borderRadius: "14px",
                  padding: "16px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
                }}
              >
                {/* Header with Title and Active Pill */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontWeight: 700, fontSize: "13px", color: isSelected ? "#ffffff" : "#6da5c0" }}>
                    {preset.name}
                  </span>
                  {isSelected ? (
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      background: "#0f969c",
                      color: "#ffffff"
                    }}>
                      <Check size={11} strokeWidth={3} />
                    </span>
                  ) : null}
                </div>

                <p style={{ fontSize: "11px", color: "var(--cosmic-text-muted)", margin: 0, minHeight: "30px", lineHeight: 1.4 }}>
                  {preset.tagline}
                </p>

                {/* Visual Swatch Bar */}
                <div style={{
                  height: "8px",
                  borderRadius: "9999px",
                  background: preset.accentGradient,
                  boxShadow: `0 0 10px ${preset.glowColor}`
                }} />

                {/* Capsule Preview */}
                <div style={{
                  alignSelf: "flex-start",
                  padding: "3px 10px",
                  borderRadius: "9999px",
                  background: preset.capsuleBg,
                  border: `1px solid ${preset.capsuleBorder}`,
                  fontSize: "9px",
                  fontWeight: 700,
                  color: "#ffffff"
                }}>
                  Sample Capsule
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MULTI-DIMENSION CUSTOMIZATION CONTROLS                                    */}
      {/* ========================================================================= */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        {/* Left Column: Glass & Neon Line */}
        <div className="glass-panel" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid rgba(41, 77, 97, 0.35)", paddingBottom: "12px" }}>
            <Sliders size={16} color="#6da5c0" />
            <h3 style={{ fontSize: "14px", fontWeight: 700, margin: 0, color: "#ffffff" }}>
              Glassmorphism & Opacity
            </h3>
          </div>

          {/* Master Enablement Switch */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#ffffff" }}>Enable AI Chat Navbar</div>
              <div style={{ fontSize: "11px", color: "var(--cosmic-text-muted)" }}>Apply custom navbar styling to AI chats</div>
            </div>
            <label className="cosmic-switch">
              <input
                type="checkbox"
                checked={nav.enabled}
                onChange={(e) => updateNavbar({ enabled: e.target.checked })}
              />
              <span className="cosmic-slider" />
            </label>
          </div>

          {/* Glass Blur Slider */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
              <span style={{ color: "#6da5c0", fontWeight: 600 }}>Glass Blur Strength</span>
              <span style={{ color: "#ffffff", fontWeight: 700 }}>{nav.glassBlur}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              step="1"
              value={nav.glassBlur}
              onChange={(e) => updateNavbar({ glassBlur: Number(e.target.value) })}
              style={{ width: "100%", accentColor: "#0f969c" }}
            />
          </div>

          {/* Opacity Slider */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
              <span style={{ color: "#6da5c0", fontWeight: 600 }}>Navbar Glass Opacity</span>
              <span style={{ color: "#ffffff", fontWeight: 700 }}>{nav.opacity}%</span>
            </div>
            <input
              type="range"
              min="30"
              max="95"
              step="5"
              value={nav.opacity}
              onChange={(e) => updateNavbar({ opacity: Number(e.target.value) })}
              style={{ width: "100%", accentColor: "#0f969c" }}
            />
          </div>

          {/* Model Switcher Concept 4 Glow */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(41, 77, 97, 0.3)", paddingTop: "14px" }}>
            <div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#ffffff" }}>Model Selector Capsule Glow</div>
              <div style={{ fontSize: "11px", color: "var(--cosmic-text-muted)" }}>Concept 4 elastic glowing stretchy pill for AI models</div>
            </div>
            <label className="cosmic-switch">
              <input
                type="checkbox"
                checked={nav.styleModelCapsule}
                onChange={(e) => updateNavbar({ styleModelCapsule: e.target.checked })}
              />
              <span className="cosmic-slider" />
            </label>
          </div>

          {/* Injected Cosmic Watermark */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(41, 77, 97, 0.3)", paddingTop: "14px" }}>
            <div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#ffffff" }}>Subtle C🪐SMIC Watermark Badge</div>
              <div style={{ fontSize: "11px", color: "var(--cosmic-text-muted)" }}>Inject micro status badge in top-right header</div>
            </div>
            <label className="cosmic-switch">
              <input
                type="checkbox"
                checked={nav.showCosmicBadge}
                onChange={(e) => updateNavbar({ showCosmicBadge: e.target.checked })}
              />
              <span className="cosmic-slider" />
            </label>
          </div>
        </div>

        {/* Right Column: Glowing Neon Accent Line & Platform Matrix */}
        <div className="glass-panel" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid rgba(41, 77, 97, 0.35)", paddingBottom: "12px" }}>
            <Sparkles size={16} color="#0f969c" />
            <h3 style={{ fontSize: "14px", fontWeight: 700, margin: 0, color: "#ffffff" }}>
              Neon Edge Underline
            </h3>
          </div>

          {/* Neon Glow Line Toggle */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#ffffff" }}>Luminous Accent Edge Line</div>
              <div style={{ fontSize: "11px", color: "var(--cosmic-text-muted)" }}>Signature glowing gradient line on navbar edge</div>
            </div>
            <label className="cosmic-switch">
              <input
                type="checkbox"
                checked={nav.showNeonGlowLine}
                onChange={(e) => updateNavbar({ showNeonGlowLine: e.target.checked })}
              />
              <span className="cosmic-slider" />
            </label>
          </div>

          {/* Edge Line Position */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span style={{ fontSize: "12px", color: "#6da5c0", fontWeight: 600 }}>Glow Line Position</span>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
              {(["bottom", "top", "both"] as const).map((pos) => {
                const isCurrent = nav.glowLinePosition === pos;
                return (
                  <button
                    key={pos}
                    onClick={() => updateNavbar({ glowLinePosition: pos as GlowLinePosition })}
                    style={{
                      padding: "7px 10px",
                      borderRadius: "8px",
                      background: isCurrent ? "rgba(15, 150, 156, 0.25)" : "rgba(255, 255, 255, 0.04)",
                      border: `1px solid ${isCurrent ? "#0f969c" : "rgba(41, 77, 97, 0.4)"}`,
                      color: isCurrent ? "#ffffff" : "#6da5c0",
                      fontSize: "11px",
                      fontWeight: isCurrent ? 700 : 500,
                      cursor: "pointer",
                      textTransform: "capitalize",
                      boxShadow: isCurrent ? "0 0 10px rgba(15, 150, 156, 0.3)" : "none"
                    }}
                  >
                    {pos}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Glow Line Color Gradient Palettes */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span style={{ fontSize: "12px", color: "#6da5c0", fontWeight: 600 }}>Glow Line Gradient</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {GLOW_LINE_GRADIENTS.map((grad) => {
                const isSelected = nav.glowLineColor === grad.value;
                return (
                  <div
                    key={grad.id}
                    onClick={() => updateNavbar({ glowLineColor: grad.value })}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 12px",
                      borderRadius: "10px",
                      background: isSelected ? "rgba(12, 112, 117, 0.25)" : "rgba(255, 255, 255, 0.03)",
                      border: `1px solid ${isSelected ? "#0f969c" : "rgba(41, 77, 97, 0.35)"}`,
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{
                        width: "36px",
                        height: "10px",
                        borderRadius: "9999px",
                        background: grad.value,
                        boxShadow: "0 0 8px rgba(15, 150, 156, 0.5)"
                      }} />
                      <span style={{ fontSize: "12px", fontWeight: 600, color: isSelected ? "#ffffff" : "#6da5c0" }}>
                        {grad.name}
                      </span>
                    </div>
                    {isSelected && <Check size={14} color="#0f969c" strokeWidth={3} />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Platform Matrix */}
          <div style={{ borderTop: "1px solid rgba(41, 77, 97, 0.3)", paddingTop: "14px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#ffffff" }}>Target AI Workspaces</span>
              <span style={{ fontSize: "10px", color: "#6da5c0" }}>Live synchronization</span>
            </div>

            {(["chatgpt", "claude", "gemini"] as const).map((platform) => {
              const isEnabled = nav.platforms[platform];
              const displayNames = { chatgpt: "ChatGPT (chatgpt.com)", claude: "Claude (claude.ai)", gemini: "Gemini (gemini.google.com)" };

              return (
                <div
                  key={platform}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    background: "rgba(5, 22, 26, 0.6)",
                    border: "1px solid rgba(41, 77, 97, 0.3)"
                  }}
                >
                  <span style={{ fontSize: "12px", fontWeight: 600, color: isEnabled ? "#ffffff" : "var(--cosmic-text-muted)" }}>
                    {displayNames[platform]}
                  </span>
                  <label className="cosmic-switch">
                    <input
                      type="checkbox"
                      checked={isEnabled}
                      onChange={(e) => updateNavbar({
                        platforms: {
                          ...nav.platforms,
                          [platform]: e.target.checked
                        }
                      })}
                    />
                    <span className="cosmic-slider" />
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
