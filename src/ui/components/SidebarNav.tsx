import React from "react";
import {
  LayoutDashboard,
  Palette,
  Image,
  Cpu,
  Sparkles,
  Settings,
  ShieldCheck,
  type LucideIcon
} from "lucide-react";

export type TabId =
  | "overview"
  | "appearance"
  | "background"
  | "integrations"
  | "themes"
  | "settings"
  | "privacy";

interface SidebarNavProps {
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
}

interface NavItem {
  id: TabId;
  label: string;
  icon: LucideIcon;
  tag?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "appearance", label: "Appearance Studio", icon: Palette },
  { id: "background", label: "Background Studio", icon: Image },
  { id: "integrations", label: "Platform Integrations", icon: Cpu, tag: "3 Ready" },
  { id: "themes", label: "Theme Library", icon: Sparkles, tag: "10 Presets" },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "privacy", label: "Privacy Center", icon: ShieldCheck }
];

export const SidebarNav: React.FC<SidebarNavProps> = ({ activeTab, onSelectTab }) => {
  return (
    <nav aria-label="Main Navigation" style={{
      width: "260px",
      flexShrink: 0,
      padding: "24px 16px",
      borderRight: "1px solid var(--cosmic-border-subtle)",
      background: "rgba(10, 16, 32, 0.4)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <div style={{
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "1.2px",
          color: "var(--cosmic-text-muted)",
          textTransform: "uppercase",
          padding: "0 12px 10px 12px"
        }}>
          Control Center
        </div>

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 14px",
                borderRadius: "var(--cosmic-radius-md)",
                border: "1px solid",
                borderColor: isActive ? "rgba(125, 231, 255, 0.35)" : "transparent",
                background: isActive
                  ? "linear-gradient(135deg, rgba(14, 165, 233, 0.18), rgba(139, 65, 204, 0.12))"
                  : "transparent",
                color: isActive ? "var(--cosmic-accent-cyan)" : "var(--cosmic-text-secondary)",
                fontFamily: "var(--cosmic-font-heading)",
                fontSize: "13px",
                fontWeight: isActive ? 600 : 500,
                cursor: "pointer",
                transition: "all var(--cosmic-transition-fast)",
                textAlign: "left"
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                  e.currentTarget.style.color = "var(--cosmic-text-primary)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--cosmic-text-secondary)";
                }
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Icon size={17} />
                <span>{item.label}</span>
              </div>
              {item.tag && (
                <span style={{
                  fontSize: "9px",
                  fontWeight: 600,
                  padding: "2px 6px",
                  borderRadius: "10px",
                  background: isActive ? "rgba(125, 231, 255, 0.2)" : "rgba(100, 116, 139, 0.18)",
                  color: isActive ? "var(--cosmic-accent-cyan)" : "var(--cosmic-text-muted)"
                }}>
                  {item.tag}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer Info Box */}
      <div className="glass-card" style={{ padding: "14px", marginTop: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#34d399" }} />
          <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--cosmic-text-primary)" }}>Local-First Privacy</span>
        </div>
        <p style={{ fontSize: "11px", color: "var(--cosmic-text-muted)", lineHeight: 1.4, margin: 0 }}>
          Wallpapers & preferences never leave your browser. Zero cloud tracking.
        </p>
      </div>
    </nav>
  );
};
