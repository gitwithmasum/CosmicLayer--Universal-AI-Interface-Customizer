import React, { useEffect, useRef, useState } from "react";
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
      }, 320);

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
        width: collapsed ? "74px" : "260px",
        flexShrink: 0,
        padding: "16px 12px",
        borderRight: "1px solid rgba(41, 77, 97, 0.35)",
        background: "rgba(7, 46, 51, 0.65)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        boxShadow: "0 20px 50px rgba(5, 22, 26, 0.65), inset 0 1px 0 rgba(109, 165, 192, 0.12)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        zIndex: 40
      }}
    >
      <div>
        {/* Clean Sidebar Top Header: No duplicate logo, just clean section title & collapse toggle */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          padding: "4px 6px 14px",
          borderBottom: "1px solid rgba(41, 77, 97, 0.35)",
          marginBottom: "14px"
        }}>
          {!collapsed && (
            <span style={{
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "1.2px",
              color: "#6da5c0",
              textTransform: "uppercase"
            }}>
              Navigation
            </span>
          )}

          {/* Collapse/Expand Toggle Button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "8px",
              border: "1px solid rgba(41, 77, 97, 0.5)",
              background: "rgba(41, 77, 97, 0.3)",
              color: "#6da5c0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(15, 150, 156, 0.25)";
              e.currentTarget.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(41, 77, 97, 0.3)";
              e.currentTarget.style.color = "#6da5c0";
            }}
          >
            {collapsed ? "»" : "«"}
          </button>
        </div>

        {/* Navigation Items with Concept 4 Elastic Stretchy Pill */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "6px" }}>
          {/* Concept 4 Stretchy Elastic Highlight Pill in Deep Teal Palette */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: `${pillTop}px`,
              height: "44px",
              borderRadius: "12px",
              background: "linear-gradient(105deg, #0f969c 0%, #0c7075 55%, #072e33 100%)",
              boxShadow: "0 8px 24px rgba(15, 150, 156, 0.45), 0 0 12px rgba(12, 112, 117, 0.4), inset 0 1px 1px rgba(109, 165, 192, 0.6)",
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
                  color: isActive ? "#ffffff" : "#6da5c0",
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
                    e.currentTarget.style.color = "#f0fdfa";
                    e.currentTarget.style.transform = collapsed ? "none" : "translateX(3px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = "#6da5c0";
                    e.currentTarget.style.transform = "none";
                  }
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Icon size={17} color={isActive ? "#ffffff" : "#6da5c0"} />
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
                        background: "rgba(41, 77, 97, 0.4)",
                        color: "#6da5c0"
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

      {/* Footer Section: Clean Profile Status Card */}
      <div style={{
        marginTop: "20px",
        paddingTop: "14px",
        borderTop: "1px solid rgba(41, 77, 97, 0.35)"
      }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "space-between",
            padding: collapsed ? "6px" : "8px 12px",
            borderRadius: "14px",
            background: "rgba(5, 22, 26, 0.65)",
            border: "1px solid rgba(41, 77, 97, 0.45)",
            transition: "border-color 0.2s ease"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Avatar with active green/teal dot */}
            <div style={{ position: "relative" }}>
              <div style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #0f969c, #072e33)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "11px",
                fontWeight: 700,
                color: "#ffffff",
                border: "1px solid rgba(109, 165, 192, 0.3)"
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
                background: "#0f969c",
                border: "1.5px solid #05161a",
                boxShadow: "0 0 6px #0f969c"
              }} />
            </div>

            {!collapsed && (
              <div>
                <div style={{ fontSize: "12px", fontWeight: 700, color: "#f0fdfa", lineHeight: 1.2 }}>
                  Masum Billah
                </div>
                <div style={{ fontSize: "10px", color: "#6da5c0" }}>
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
                background: "rgba(15, 150, 156, 0.18)",
                border: "1px solid rgba(15, 150, 156, 0.4)",
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
