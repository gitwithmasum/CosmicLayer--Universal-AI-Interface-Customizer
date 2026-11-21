import React, { useState } from "react";
import {
  ShieldCheck,
  Lock,
  EyeOff,
  ServerOff,
  Database,
  FileCode,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import type { CosmicSettings } from "../../shared/types";

interface PrivacyCenterTabProps {
  settings: CosmicSettings;
}

export const PrivacyCenterTab: React.FC<PrivacyCenterTabProps> = ({ settings }) => {
  const [showRawData, setShowRawData] = useState(false);

  const pillars = [
    {
      title: "100% Local-First Storage",
      icon: Database,
      description:
        "Every wallpaper, theme selection, and CSS filter adjustment is saved exclusively inside your browser's local partition. No data is ever transmitted to remote servers."
    },
    {
      title: "Zero AI Conversation Access",
      icon: EyeOff,
      description:
        "CosmicLayer's content scripts are strictly limited to styling layers. They never query, read, scrape, or log prompts, AI responses, chat transcripts, or uploaded attachments."
    },
    {
      title: "Zero Credential or Cookie Inspection",
      icon: Lock,
      description:
        "The extension never requests access to cookies, authentication tokens, session IDs, or account passwords. It operates independently of your login credentials."
    },
    {
      title: "Zero Telemetry & Tracking",
      icon: ServerOff,
      description:
        "There are no Google Analytics scripts, tracking pixels, telemetry beacons, or external API calls bundled into CosmicLayer. Zero phoning home."
    },
    {
      title: "Strictly Scoped Host Permissions",
      icon: FileCode,
      description:
        "Host permissions are restricted strictly to the 3 target AI domains (chatgpt.com, claude.ai, gemini.google.com). No broad '<all_urls>' wildcard is requested."
    },
    {
      title: "Non-Destructive Background Sandbox",
      icon: ShieldCheck,
      description:
        "Custom styles attach to an isolated background container (#cosmiclayer-background). Native host interfaces, buttons, and markdown render engines remain intact."
    }
  ];

  const permissionsList = [
    {
      permission: "storage",
      type: "Extension API",
      justification: "Allows CosmicLayer to remember your chosen theme, custom wallpaper DataURL, and adjustment sliders locally."
    },
    {
      permission: "activeTab",
      type: "Extension API",
      justification: "Enables immediate application of theme styles when you click the extension action popup on an active AI tab."
    },
    {
      permission: "https://chatgpt.com/*",
      type: "Host Permission",
      justification: "Permits the content script to inject the atmospheric background layer onto ChatGPT."
    },
    {
      permission: "https://claude.ai/*",
      type: "Host Permission",
      justification: "Permits the content script to inject the atmospheric background layer onto Claude."
    },
    {
      permission: "https://gemini.google.com/*",
      type: "Host Permission",
      justification: "Permits the content script to inject the atmospheric background layer onto Gemini."
    }
  ];

  // Sanitized settings representation for the live data inspector
  const displaySettings = {
    ...settings,
    wallpaper: settings.wallpaper ? `[Local DataURL: ${Math.round(settings.wallpaper.length / 1024)} KB]` : undefined
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Header */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
          <span className="cosmic-badge cosmic-badge-emerald">VERIFIED LOCAL ARCHITECTURE</span>
        </div>
        <h1 style={{ fontFamily: "var(--cosmic-font-heading)", fontSize: "22px", fontWeight: 700, margin: 0 }}>
          Privacy & Security Center
        </h1>
        <p style={{ fontSize: "13px", color: "var(--cosmic-text-secondary)", margin: "4px 0 0 0" }}>
          CosmicLayer is built from the ground up on strict local-first privacy engineering principles.
        </p>
      </div>

      {/* 6 Privacy Pillars Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
        {pillars.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div key={idx} className="glass-panel" style={{ padding: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <div style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "rgba(52, 211, 153, 0.12)",
                  border: "1px solid rgba(52, 211, 153, 0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#34d399"
                }}>
                  <Icon size={18} />
                </div>
                <h2 style={{ fontFamily: "var(--cosmic-font-heading)", fontSize: "15px", fontWeight: 700, margin: 0 }}>
                  {p.title}
                </h2>
              </div>
              <p style={{ fontSize: "12px", color: "var(--cosmic-text-secondary)", lineHeight: 1.5, margin: 0 }}>
                {p.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Permissions Audit Table */}
      <div className="glass-panel" style={{ padding: "22px" }}>
        <h2 style={{ fontFamily: "var(--cosmic-font-heading)", fontSize: "16px", fontWeight: 600, marginBottom: "8px" }}>
          Manifest V3 Permissions Audit
        </h2>
        <p style={{ fontSize: "12px", color: "var(--cosmic-text-secondary)", marginBottom: "16px" }}>
          Below is a line-by-line explanation of every permission requested in the CosmicLayer manifest.
        </p>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--cosmic-border-medium)", textAlign: "left", color: "var(--cosmic-text-muted)" }}>
                <th style={{ padding: "8px 12px", fontWeight: 600 }}>Permission</th>
                <th style={{ padding: "8px 12px", fontWeight: 600 }}>Category</th>
                <th style={{ padding: "8px 12px", fontWeight: 600 }}>Technical Justification</th>
              </tr>
            </thead>
            <tbody>
              {permissionsList.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid var(--cosmic-border-subtle)" }}>
                  <td style={{ padding: "10px 12px", fontFamily: "var(--cosmic-font-mono)", color: "var(--cosmic-accent-cyan)" }}>
                    {item.permission}
                  </td>
                  <td style={{ padding: "10px 12px", color: "var(--cosmic-text-secondary)" }}>
                    {item.type}
                  </td>
                  <td style={{ padding: "10px 12px", color: "var(--cosmic-text-primary)" }}>
                    {item.justification}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Live Local Storage Data Inspector */}
      <div className="glass-panel" style={{ padding: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h2 style={{ fontFamily: "var(--cosmic-font-heading)", fontSize: "15px", fontWeight: 600, margin: 0 }}>
              Live Local Storage Inspector
            </h2>
            <p style={{ fontSize: "12px", color: "var(--cosmic-text-muted)", margin: "4px 0 0 0" }}>
              Verify the exact JSON stored in your browser. Notice the complete absence of user tokens or chats.
            </p>
          </div>
          <button
            className="cosmic-btn cosmic-btn-secondary cosmic-btn-sm"
            onClick={() => setShowRawData(!showRawData)}
          >
            {showRawData ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {showRawData ? "Hide Local JSON" : "Inspect Local JSON"}
          </button>
        </div>

        {showRawData && (
          <div style={{ marginTop: "14px" }}>
            <pre style={{
              background: "rgba(5, 8, 17, 0.95)",
              padding: "14px",
              borderRadius: "8px",
              fontSize: "11px",
              color: "#38bdf8",
              fontFamily: "var(--cosmic-font-mono)",
              overflowX: "auto",
              maxHeight: "260px"
            }}>
              {JSON.stringify(displaySettings, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
