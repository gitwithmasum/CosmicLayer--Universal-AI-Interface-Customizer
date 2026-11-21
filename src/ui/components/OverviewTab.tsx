import React from "react";
import {
  Sparkles,
  Palette,
  Image as ImageIcon,
  LayoutTemplate,
  CheckCircle2,
  Shuffle,
  Download,
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import type { CosmicSettings } from "../../shared/types";
import { THEMES, THEME_LIST } from "../../shared/themes";
import { LiveMockupPreview } from "./LiveMockupPreview";
import { CosmicLogo } from "./CosmicLogo";
import type { TabId } from "./SidebarNav";

interface OverviewTabProps {
  settings: CosmicSettings;
  onUpdate: (next: CosmicSettings) => void;
  onNavigateTab: (tab: TabId) => void;
  onExport: () => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  settings,
  onUpdate,
  onNavigateTab,
  onExport
}) => {
  const currentTheme = THEMES[settings.theme] || THEMES.nebula;

  const handleRandomizeTheme = () => {
    const others = THEME_LIST.filter((t) => t.id !== settings.theme);
    const random = others[Math.floor(Math.random() * others.length)];
    onUpdate({
      ...settings,
      theme: random.id,
      accentColor: random.accentColor,
      enabled: true
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Hero Section */}
      <div className="glass-panel" style={{
        padding: "32px",
        background: "radial-gradient(ellipse at 15% 20%, rgba(15, 150, 156, 0.22), transparent 55%), radial-gradient(ellipse at 85% 80%, rgba(12, 112, 117, 0.22), transparent 55%), rgba(7, 46, 51, 0.75)",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{ maxWidth: "620px", position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px", flexWrap: "wrap", gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span className="cosmic-badge cosmic-badge-cyan">
                <Sparkles size={11} /> Universal AI Interface Customizer
              </span>
              <span className="cosmic-badge cosmic-badge-gold">Foundation v0.1.0</span>
            </div>
            <CosmicLogo size={36} showText={false} />
          </div>

          <h1 style={{
            fontFamily: "var(--cosmic-font-heading)",
            fontSize: "34px",
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.8px",
            marginBottom: "12px"
          }}>
            One Universe.{" "}
            <span style={{
              background: "linear-gradient(90deg, #f0fdfa 0%, #0f969c 50%, #6da5c0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              Every AI Workspace.
            </span>
          </h1>

          <p style={{
            color: "var(--cosmic-text-secondary)",
            fontSize: "14px",
            lineHeight: 1.6,
            marginBottom: "24px"
          }}>
            CosmicLayer brings an immersive, futuristic atmosphere to your everyday AI sessions.
            Elevate ChatGPT, Claude, and Gemini with bespoke space-tech themes, custom local wallpapers,
            and privacy-first rendering.
          </p>

          {/* Quick Action Bar */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            <button
              className="cosmic-btn cosmic-btn-primary"
              onClick={() => onNavigateTab("background")}
            >
              <ImageIcon size={15} /> Customize Wallpaper
            </button>
            <button
              className="cosmic-btn cosmic-btn-secondary"
              onClick={() => onNavigateTab("navbar")}
            >
              <LayoutTemplate size={15} /> AI Navbar Studio
            </button>
            <button
              className="cosmic-btn cosmic-btn-secondary"
              onClick={() => onNavigateTab("themes")}
            >
              <Palette size={15} /> Browse 10 Themes
            </button>
            <button
              className="cosmic-btn cosmic-btn-secondary"
              onClick={handleRandomizeTheme}
              title="Pick a random theme"
            >
              <Shuffle size={14} /> Random Theme
            </button>
            <button
              className="cosmic-btn cosmic-btn-secondary"
              onClick={onExport}
              title="Download backup file"
            >
              <Download size={14} /> Export JSON
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
        {/* Customization Status */}
        <div className="glass-card">
          <div style={{ fontSize: "11px", color: "var(--cosmic-text-muted)", fontWeight: 600, letterSpacing: "0.8px", textTransform: "uppercase" }}>
            Customization Status
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "8px" }}>
            <span style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: settings.enabled ? "#0f969c" : "#294d61",
              boxShadow: settings.enabled ? "0 0 12px #0f969c" : "none"
            }} />
            <div style={{ fontFamily: "var(--cosmic-font-heading)", fontSize: "18px", fontWeight: 700 }}>
              {settings.enabled ? "Active" : "Paused"}
            </div>
          </div>
          <div style={{ fontSize: "11px", color: "var(--cosmic-text-secondary)", marginTop: "6px" }}>
            {settings.enabled ? "Injecting into matched AI hostnames" : "All background layers removed"}
          </div>
        </div>

        {/* Active Theme */}
        <div className="glass-card" style={{ cursor: "pointer" }} onClick={() => onNavigateTab("themes")}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "11px", color: "var(--cosmic-text-muted)", fontWeight: 600, letterSpacing: "0.8px", textTransform: "uppercase" }}>
              Active Theme
            </span>
            <ArrowRight size={13} color="var(--cosmic-text-muted)" />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "8px" }}>
            <span style={{
              width: "20px",
              height: "20px",
              borderRadius: "6px",
              background: currentTheme.previewGradient,
              boxShadow: "0 0 10px rgba(0,0,0,0.5)"
            }} />
            <div style={{ fontFamily: "var(--cosmic-font-heading)", fontSize: "18px", fontWeight: 700, color: currentTheme.accentColor }}>
              {currentTheme.name}
            </div>
          </div>
          <div style={{ fontSize: "11px", color: "var(--cosmic-text-secondary)", marginTop: "6px" }}>
            Category: {currentTheme.category} · {settings.opacity}% Intensity
          </div>
        </div>

        {/* Wallpaper Source */}
        <div className="glass-card" style={{ cursor: "pointer" }} onClick={() => onNavigateTab("background")}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "11px", color: "var(--cosmic-text-muted)", fontWeight: 600, letterSpacing: "0.8px", textTransform: "uppercase" }}>
              Background Mode
            </span>
            <ArrowRight size={13} color="var(--cosmic-text-muted)" />
          </div>
          <div style={{ fontFamily: "var(--cosmic-font-heading)", fontSize: "18px", fontWeight: 700, marginTop: "8px" }}>
            {settings.wallpaper ? "Custom Image" : "Cosmic Gradient"}
          </div>
          <div style={{ fontSize: "11px", color: "var(--cosmic-text-secondary)", marginTop: "6px" }}>
            {settings.wallpaper ? (settings.wallpaperName || "Local User File") : "Preset Cosmic Shimmer"}
          </div>
        </div>

        {/* Supported Platforms */}
        <div className="glass-card" style={{ cursor: "pointer" }} onClick={() => onNavigateTab("integrations")}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "11px", color: "var(--cosmic-text-muted)", fontWeight: 600, letterSpacing: "0.8px", textTransform: "uppercase" }}>
              Platform Adapters
            </span>
            <ArrowRight size={13} color="var(--cosmic-text-muted)" />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8px" }}>
            <CheckCircle2 size={18} color="#34d399" />
            <div style={{ fontFamily: "var(--cosmic-font-heading)", fontSize: "18px", fontWeight: 700 }}>
              3 Browser Ready
            </div>
          </div>
          <div style={{ fontSize: "11px", color: "var(--cosmic-text-secondary)", marginTop: "6px" }}>
            ChatGPT, Claude & Gemini active
          </div>
        </div>
      </div>

      {/* Live Workspace Interactive Simulator */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
          <div>
            <h2 style={{ fontFamily: "var(--cosmic-font-heading)", fontSize: "16px", fontWeight: 600 }}>
              Live Workspace Atmosphere
            </h2>
            <p style={{ fontSize: "12px", color: "var(--cosmic-text-muted)", margin: 0 }}>
              Real-time render of your customized background layer and theme across supported AI interfaces.
            </p>
          </div>
          <button
            className="cosmic-btn cosmic-btn-secondary cosmic-btn-sm"
            onClick={() => onNavigateTab("appearance")}
          >
            Fine-tune Visuals
          </button>
        </div>

        <LiveMockupPreview settings={settings} />
      </div>

      {/* Architectural Scope Notice */}
      <div className="glass-panel" style={{ padding: "20px 24px", background: "rgba(7, 46, 51, 0.55)", borderColor: "rgba(41, 77, 97, 0.4)" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
          <div style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            background: "rgba(15, 150, 156, 0.16)",
            border: "1px solid rgba(15, 150, 156, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
          }}>
            <ShieldCheck size={18} color="#0f969c" />
          </div>
          <div>
            <h3 style={{ fontFamily: "var(--cosmic-font-heading)", fontSize: "14px", fontWeight: 600, color: "var(--cosmic-text-primary)", marginBottom: "4px" }}>
              Browser Extension Architecture & Native Scope
            </h3>
            <p style={{ fontSize: "12px", color: "var(--cosmic-text-secondary)", lineHeight: 1.5, margin: 0 }}>
              CosmicLayer operates strictly within the browser domain via Chrome Manifest V3 content scripts targeting approved AI hostnames.
              In accordance with security standards and architectural honesty: browser extensions cannot inject styles into native desktop terminal
              shells or external desktop applications. Planned desktop targets (Google Antigravity, Claude Code, OpenAI Codex) are scheduled for native extension/theme plugins.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
