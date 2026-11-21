import React, { useEffect, useRef, useState } from "react";
import {
  LayoutDashboard,
  Palette,
  Image,
  Cpu,
  Sparkles,
  Settings,
  ShieldCheck,
  ChevronRight,
  Folder,
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
  { id: "overview", label: "Home", icon: LayoutDashboard },
  { id: "appearance", label: "Studio", icon: Palette },
  { id: "background", label: "Wallpapers", icon: Image },
  { id: "themes", label: "Themes", icon: Sparkles, tag: "10" },
  { id: "integrations", label: "Platforms", icon: Cpu, tag: "3 Ready" },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "privacy", label: "Privacy Center", icon: ShieldCheck }
];

export const SidebarNav: React.FC<SidebarNavProps> = ({ activeTab, onSelectTab }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [stretching, setStretching] = useState<"down" | "up" | null>(null);
  const [pillTop, setPillTop] = useState<number>(0);
  const prevIndexRef = useRef<number>(0);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIndex = NAV_ITEMS.findIndex((item) => item.id === activeTab);

  useEffect(() => {
    const prev = prevIndexRef.current;
    if (activeIndex !== prev) {
      const direction = activeIndex > prev ? "down" : "up";
      setStretching(direction);

      const targetEl = itemRefs.current[activeIndex];
      if (targetEl) {
        setPillTop(targetEl.offsetTop);
      }

      const timer = setTimeout(() => {
        setStretching(null);
      }, 240);

      prevIndexRef.current = activeIndex;
      return () => clearTimeout(timer);
    } else {
      const targetEl = itemRefs.current[activeIndex];
      if (targetEl) {
        setPillTop(targetEl.offsetTop);
      }
    }
  }, [activeIndex]);

  return (
    <nav
      aria-label="Main Navigation"
      style={{
        width: collapsed ? "74px" : "280px",
        flexShrink: 0,
        padding: "20px 14px",
        borderRight: "1px solid rgba(80, 140, 230, 0.22)",
        background: "rgba(10, 16, 32, 0.78)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        zIndex: 40
      }}
    >
      <div>
        {/* Brand Header with Planet Logo & Collapse Button */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          paddingBottom: "16px",
          borderBottom: "1px solid rgba(80, 140, 230, 0.18)",
          marginBottom: "16px"
        }}>
          {!collapsed && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {/* Glowing Planet Logo */}
              <div style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #00d2ff, #8b5cf6 60%, #ec4899)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 18px rgba(0, 210, 255, 0.55), inset 0 1px 1px rgba(255,255,255,0.6)",
                flexShrink: 0
              }}>
                <span style={{ fontSize: "16px" }}>🪐</span>
              </div>
              <div>
                <div style={{
                  fontFamily: "var(--cosmic-font-heading)",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#ffffff",
                  letterSpacing: "-0.2px",
                  lineHeight: 1.15
                }}>
                  CosmicLayer
                </div>
                <div style={{
                  fontSize: "9px",
                  fontWeight: 600,
                  color: "var(--cosmic-accent-cyan)",
                  letterSpacing: "1px",
                  textTransform: "uppercase"
                }}>
                  Universal Customizer
                </div>
              </div>
            </div>
          )}

          {collapsed && (
            <div style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #00d2ff, #8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 14px rgba(0, 210, 255, 0.5)"
            }}>
              <span style={{ fontSize: "16px" }}>🪐</span>
            </div>
          )}

          {/* Collapse/Expand Toggle Button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "8px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              background: "rgba(255, 255, 255, 0.05)",
              color: "var(--cosmic-text-secondary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(125, 231, 255, 0.15)";
              e.currentTarget.style.color = "#7de7ff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
              e.currentTarget.style.color = "var(--cosmic-text-secondary)";
            }}
          >
            {collapsed ? "»" : "«"}
          </button>
        </div>

        {/* Navigation Items with Concept 4 Elastic Stretchy Pill */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "6px" }}>
          {/* Concept 4 Stretchy Elastic Highlight Pill */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: `${pillTop}px`,
              height: "44px",
              borderRadius: "12px",
              background: "linear-gradient(100deg, #00d2ff 0%, #3b82f6 40%, #9333ea 85%, #ec4899 100%)",
              boxShadow: "0 0 25px rgba(0, 210, 255, 0.5), 0 0 45px rgba(147, 51, 234, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.6)",
              pointerEvents: "none",
              zIndex: 1,
              transform:
                stretching === "down"
                  ? "scaleY(1.2) translateY(4px)"
                  : stretching === "up"
                  ? "scaleY(1.2) translateY(-4px)"
                  : "scaleY(1) translateY(0)",
              transition: "top 0.4s cubic-bezier(0.34, 1.45, 0.64, 1), transform 0.3s cubic-bezier(0.34, 1.45, 0.64, 1)"
            }}
          />

          {NAV_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                ref={(el) => (itemRefs.current[idx] = el)}
                onClick={() => onSelectTab(item.id)}
                title={collapsed ? item.label : undefined}
                style={{
                  position: "relative",
                  zIndex: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: collapsed ? "center" : "space-between",
                  height: "44px",
                  padding: collapsed ? "0" : "0 14px",
                  borderRadius: "12px",
                  border: "none",
                  background: "transparent",
                  color: isActive ? "#ffffff" : "var(--cosmic-text-secondary)",
                  fontFamily: "var(--cosmic-font-heading)",
                  fontSize: "13px",
                  fontWeight: isActive ? 700 : 500,
                  cursor: "pointer",
                  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                  textAlign: "left",
                  userSelect: "none"
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = "#ffffff";
                    e.currentTarget.style.transform = collapsed ? "none" : "translateX(3px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = "var(--cosmic-text-secondary)";
                    e.currentTarget.style.transform = "none";
                  }
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Icon size={17} color={isActive ? "#ffffff" : "currentColor"} />
                  {!collapsed && <span>{item.label}</span>}
                </div>

                {!collapsed && (
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    {item.tag && !isActive && (
                      <span style={{
                        fontSize: "9px",
                        fontWeight: 600,
                        padding: "2px 6px",
                        borderRadius: "10px",
                        background: "rgba(100, 116, 139, 0.18)",
                        color: "var(--cosmic-text-muted)"
                      }}>
                        {item.tag}
                      </span>
                    )}
                    <span style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#ffffff",
                      opacity: isActive ? 1 : 0,
                      transition: "opacity 0.2s ease"
                    }}>
                      ›
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Section: Projects (SelaiSathi) + Profile (Masum Billah) */}
      <div style={{
        marginTop: "20px",
        paddingTop: "14px",
        borderTop: "1px solid rgba(80, 140, 230, 0.18)",
        display: "flex",
        flexDirection: "column",
        gap: "12px"
      }}>
        {/* Projects Section (Concept 1 layout) */}
        {!collapsed && (
          <div>
            <div style={{
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.8px",
              color: "var(--cosmic-text-muted)",
              textTransform: "uppercase",
              marginBottom: "8px",
              padding: "0 4px"
            }}>
              Projects
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 12px",
                borderRadius: "10px",
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(125, 231, 255, 0.08)";
                e.currentTarget.style.borderColor = "rgba(125, 231, 255, 0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Folder size={14} color="#7de7ff" />
                <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--cosmic-text-primary)" }}>
                  SelaiSathi
                </span>
              </div>
              <ChevronRight size={12} color="var(--cosmic-text-muted)" />
            </div>
          </div>
        )}

        {/* User Profile Card (Masum Billah, Free Plan, Crown) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "space-between",
            padding: collapsed ? "6px" : "8px 12px",
            borderRadius: "14px",
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(80, 140, 230, 0.22)",
            transition: "border-color 0.2s ease"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Avatar with active green dot */}
            <div style={{ position: "relative" }}>
              <div style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #0ea5e9, #4f46e5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "11px",
                fontWeight: 700,
                color: "#ffffff",
                border: "1px solid rgba(255, 255, 255, 0.2)"
              }}>
                MB
              </div>
              <span style={{
                position: "absolute",
                bottom: "-1px",
                right: "-1px",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#34d399",
                border: "1.5px solid #0a1020"
              }} />
            </div>

            {!collapsed && (
              <div>
                <div style={{ fontSize: "12px", fontWeight: 700, color: "#ffffff", lineHeight: 1.2 }}>
                  Masum Billah
                </div>
                <div style={{ fontSize: "10px", color: "var(--cosmic-text-muted)" }}>
                  Free Plan
                </div>
              </div>
            )}
          </div>

          {!collapsed && (
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "8px",
                background: "rgba(251, 191, 36, 0.15)",
                border: "1px solid rgba(251, 191, 36, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "13px"
              }}
              title="Pro Plan Tier"
            >
              👑
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
