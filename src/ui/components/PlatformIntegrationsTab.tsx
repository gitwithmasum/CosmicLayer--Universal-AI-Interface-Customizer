import React, { useState } from "react";
import {
  CheckCircle2,
  Clock,
  Shield,
  ExternalLink,
  Info,
  Terminal,
  Code2,
  Sparkles,
  Monitor
} from "lucide-react";
import type { CosmicSettings } from "../../shared/types";

interface PlatformIntegrationsTabProps {
  settings: CosmicSettings;
  onUpdate: (next: CosmicSettings) => void;
}

type PlatformFilter = "all" | "browser" | "roadmap";

export const PlatformIntegrationsTab: React.FC<PlatformIntegrationsTabProps> = ({ settings, onUpdate }) => {
  const [filter, setFilter] = useState<PlatformFilter>("all");

  const togglePlatform = (key: keyof CosmicSettings["platforms"]) => {
    onUpdate({
      ...settings,
      platforms: {
        ...settings.platforms,
        [key]: !settings.platforms[key]
      }
    });
  };

  const browserPlatforms = [
    {
      id: "chatgpt" as const,
      name: "ChatGPT",
      origin: "https://chatgpt.com",
      status: "Foundation Ready",
      isReady: true,
      enabled: settings.platforms.chatgpt,
      icon: Sparkles,
      description: "Applies custom cosmic atmosphere, background layer, and theme CSS variables to ChatGPT workspaces.",
      technical: [
        "Manifest V3 Content Script",
        "Target: chatgpt.com & chat.openai.com",
        "Throttled MutationObserver for SPA changes",
        "Isolated DOM container (#cosmiclayer-background)",
        "Zero access to prompts or conversation transcripts"
      ]
    },
    {
      id: "claude" as const,
      name: "Claude",
      origin: "https://claude.ai",
      status: "Foundation Ready",
      isReady: true,
      enabled: settings.platforms.claude,
      icon: Sparkles,
      description: "Harmonizes Claude conversation view with glassmorphism translucency and cosmic theme accents.",
      technical: [
        "Manifest V3 Content Script",
        "Target: claude.ai",
        "Scoped CSS variables for theme balance",
        "Preserves artifact pane and code block contrast",
        "Zero token or credential inspection"
      ]
    },
    {
      id: "gemini" as const,
      name: "Gemini",
      origin: "https://gemini.google.com",
      status: "Foundation Ready",
      isReady: true,
      enabled: settings.platforms.gemini,
      icon: Sparkles,
      description: "Injects deep space ambiance behind Gemini's main workspace surface with dark mode harmony.",
      technical: [
        "Manifest V3 Content Script",
        "Target: gemini.google.com",
        "Safe background layer injection",
        "Leaves math formulas and responses untouched",
        "Real-time storage listener updates"
      ]
    }
  ];

  const roadmapPlatforms = [
    {
      id: "antigravity",
      name: "Google Antigravity",
      type: "Desktop IDE / Development Workspace",
      status: "Planned (Not Connected)",
      icon: Monitor,
      reason:
        "Google Antigravity is a desktop development environment. A Chrome browser extension cannot inject styles into native desktop desktop window managers or desktop IDE shells. Integration will use documented Antigravity IDE theme or extension APIs in subsequent phases.",
      roadmapPhase: "Phase 2 (Desktop Plugins)"
    },
    {
      id: "claudecode",
      name: "Claude Code",
      type: "Terminal CLI Tool",
      status: "Planned (Not Connected)",
      icon: Terminal,
      reason:
        "Claude Code is an interactive terminal CLI. Chrome extension content scripts cannot customize command-line terminal emulators. Integration requires native ANSI/terminal color themes and CLI configuration files.",
      roadmapPhase: "Phase 2 (CLI Schemes)"
    },
    {
      id: "codex",
      name: "OpenAI Codex",
      type: "Cloud & IDE Coding API",
      status: "Planned (Not Connected)",
      icon: Code2,
      reason:
        "OpenAI Codex is accessed via API and IDE extension interfaces. A browser extension cannot reach external IDE surfaces without dedicated IDE extension bundles.",
      roadmapPhase: "Phase 3 (IDE Bundles)"
    }
  ];

  const showBrowser = filter === "all" || filter === "browser";
  const showRoadmap = filter === "all" || filter === "roadmap";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Header */}
      <div>
        <h1 style={{ fontFamily: "var(--cosmic-font-heading)", fontSize: "22px", fontWeight: 700, margin: 0 }}>
          Platform Integrations
        </h1>
        <p style={{ fontSize: "13px", color: "var(--cosmic-text-secondary)", margin: "4px 0 0 0" }}>
          Technical overview of supported browser workspaces and honest documentation of desktop/terminal roadmap targets.
        </p>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          className={`cosmic-btn cosmic-btn-sm ${filter === "all" ? "cosmic-btn-primary" : "cosmic-btn-secondary"}`}
          onClick={() => setFilter("all")}
        >
          All Platforms (6)
        </button>
        <button
          className={`cosmic-btn cosmic-btn-sm ${filter === "browser" ? "cosmic-btn-primary" : "cosmic-btn-secondary"}`}
          onClick={() => setFilter("browser")}
        >
          Browser Workspaces (3 Ready)
        </button>
        <button
          className={`cosmic-btn cosmic-btn-sm ${filter === "roadmap" ? "cosmic-btn-primary" : "cosmic-btn-secondary"}`}
          onClick={() => setFilter("roadmap")}
        >
          Desktop & CLI Roadmap (3 Planned)
        </button>
      </div>

      {/* Browser Integrations Section */}
      {showBrowser && (
        <section>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <CheckCircle2 size={18} color="#34d399" />
            <h2 style={{ fontFamily: "var(--cosmic-font-heading)", fontSize: "16px", fontWeight: 600, margin: 0 }}>
              Browser Extensions (Manifest V3)
            </h2>
            <span className="cosmic-badge cosmic-badge-emerald">ACTIVE TARGETS</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "16px" }}>
            {browserPlatforms.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.id} className="glass-panel" style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    {/* Header with status and toggle */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "10px",
                          background: "rgba(14, 165, 233, 0.15)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--cosmic-accent-cyan)"
                        }}>
                          <Icon size={18} />
                        </div>
                        <div>
                          <h3 style={{ fontFamily: "var(--cosmic-font-heading)", fontSize: "16px", fontWeight: 700, margin: 0 }}>
                            {p.name}
                          </h3>
                          <a
                            href={p.origin}
                            target="_blank"
                            rel="noreferrer"
                            style={{ fontSize: "11px", color: "var(--cosmic-text-muted)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "3px" }}
                          >
                            {p.origin} <ExternalLink size={10} />
                          </a>
                        </div>
                      </div>

                      <label className="cosmic-switch" title={`Toggle ${p.name} customization`}>
                        <input
                          type="checkbox"
                          checked={p.enabled}
                          onChange={() => togglePlatform(p.id)}
                          aria-label={`Toggle ${p.name}`}
                        />
                        <span className="cosmic-switch-slider" />
                      </label>
                    </div>

                    <p style={{ fontSize: "12px", color: "var(--cosmic-text-secondary)", lineHeight: 1.5, marginBottom: "16px" }}>
                      {p.description}
                    </p>

                    {/* Technical details list */}
                    <div style={{
                      background: "rgba(8, 13, 27, 0.6)",
                      padding: "12px",
                      borderRadius: "var(--cosmic-radius-md)",
                      border: "1px solid var(--cosmic-border-subtle)",
                      marginBottom: "16px"
                    }}>
                      <div style={{ fontSize: "10px", fontWeight: 700, color: "var(--cosmic-text-muted)", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "6px" }}>
                        Architecture & Safeguards
                      </div>
                      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "4px" }}>
                        {p.technical.map((tech, idx) => (
                          <li key={idx} style={{ fontSize: "11px", color: "var(--cosmic-text-secondary)", display: "flex", alignItems: "center", gap: "6px" }}>
                            <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--cosmic-accent-cyan)" }} />
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "12px", borderTop: "1px solid var(--cosmic-border-subtle)" }}>
                    <span className="cosmic-badge cosmic-badge-emerald">
                      <CheckCircle2 size={11} /> {p.status}
                    </span>
                    <span style={{ fontSize: "11px", color: p.enabled ? "#34d399" : "var(--cosmic-text-muted)", fontWeight: 600 }}>
                      {p.enabled ? "Injection Active" : "Disabled in Settings"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Desktop & Terminal Roadmap Section */}
      {showRoadmap && (
        <section>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <Clock size={18} color="var(--cosmic-accent-gold)" />
            <h2 style={{ fontFamily: "var(--cosmic-font-heading)", fontSize: "16px", fontWeight: 600, margin: 0 }}>
              Desktop & CLI Roadmap (Planned Platforms)
            </h2>
            <span className="cosmic-badge cosmic-badge-gold">NOT CONNECTED — NO FAKE INTERFACES</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "16px" }}>
            {roadmapPlatforms.map((r) => {
              const Icon = r.icon;
              return (
                <div key={r.id} className="glass-panel" style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "10px",
                          background: "rgba(251, 191, 36, 0.12)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--cosmic-accent-gold)"
                        }}>
                          <Icon size={18} />
                        </div>
                        <div>
                          <h3 style={{ fontFamily: "var(--cosmic-font-heading)", fontSize: "16px", fontWeight: 700, margin: 0 }}>
                            {r.name}
                          </h3>
                          <span style={{ fontSize: "11px", color: "var(--cosmic-text-muted)" }}>
                            {r.type}
                          </span>
                        </div>
                      </div>

                      <span className="cosmic-badge cosmic-badge-muted">PLANNED</span>
                    </div>

                    <div style={{
                      background: "rgba(20, 16, 10, 0.6)",
                      border: "1px solid rgba(251, 191, 36, 0.2)",
                      borderRadius: "var(--cosmic-radius-md)",
                      padding: "12px",
                      marginBottom: "16px"
                    }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                        <Info size={14} color="var(--cosmic-accent-gold)" style={{ marginTop: "2px", flexShrink: 0 }} />
                        <p style={{ fontSize: "11px", color: "#fef3c7", lineHeight: 1.5, margin: 0 }}>
                          {r.reason}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "12px", borderTop: "1px solid var(--cosmic-border-subtle)" }}>
                    <span className="cosmic-badge cosmic-badge-muted">
                      {r.status}
                    </span>
                    <span style={{ fontSize: "11px", color: "var(--cosmic-accent-gold)", fontWeight: 600 }}>
                      {r.roadmapPhase}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Technical Integrity Disclosure Card */}
      <div className="glass-card" style={{ padding: "18px 22px", background: "rgba(10, 16, 32, 0.6)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
          <Shield size={16} color="var(--cosmic-accent-cyan)" />
          <h3 style={{ fontFamily: "var(--cosmic-font-heading)", fontSize: "13px", fontWeight: 600, color: "var(--cosmic-text-primary)", margin: 0 }}>
            No Fake Connections Guarantee
          </h3>
        </div>
        <p style={{ fontSize: "12px", color: "var(--cosmic-text-secondary)", lineHeight: 1.5, margin: 0 }}>
          CosmicLayer commits to radical engineering honesty. We do not display fake "connected" badges or simulated success toggles for
          platforms that browser extensions cannot natively customize. Each integration status shown reflects validated technical reality.
        </p>
      </div>
    </div>
  );
};
