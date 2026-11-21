import React, { useState } from "react";
import { MessageSquare, Bot, User, Sparkles, SlidersHorizontal, Plus, Folder, Search } from "lucide-react";
import type { CosmicSettings } from "../../shared/types";
import { THEMES } from "../../shared/themes";
import { computeBackgroundString, computeFilterString } from "../../content/adapters/base";

interface LiveMockupPreviewProps {
  settings: CosmicSettings;
  compact?: boolean;
}

export const LiveMockupPreview: React.FC<LiveMockupPreviewProps> = ({ settings, compact = false }) => {
  const [platform, setPlatform] = useState<"chatgpt" | "claude" | "gemini">("chatgpt");

  const theme = THEMES[settings.theme] || THEMES.nebula;
  const bgString = computeBackgroundString(settings);
  const filterString = computeFilterString(settings);
  const opacity = Math.max(0, Math.min(90, settings.opacity)) / 100;

  const platformTitles = {
    chatgpt: "ChatGPT — chatgpt.com",
    claude: "Claude — claude.ai",
    gemini: "Gemini — gemini.google.com"
  };

  return (
    <div className="glass-panel" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
      {/* Top Preview Bar with Platform Switcher */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 16px",
        borderBottom: "1px solid var(--cosmic-border-subtle)",
        background: "rgba(10, 16, 32, 0.8)",
        fontSize: "12px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ display: "flex", gap: "5px" }}>
            <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#f43f5e" }} />
            <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#fbbf24" }} />
            <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#34d399" }} />
          </div>
          <span style={{ fontWeight: 600, color: "var(--cosmic-text-secondary)", fontFamily: "var(--cosmic-font-heading)", marginLeft: "6px" }}>
            Live Atmosphere Simulator
          </span>
          <span className="cosmic-badge cosmic-badge-cyan" style={{ fontSize: "9px" }}>
            {platformTitles[platform]}
          </span>
        </div>

        {/* Platform Selector Buttons */}
        <div style={{ display: "flex", gap: "4px", background: "rgba(6, 10, 20, 0.6)", padding: "2px", borderRadius: "var(--cosmic-radius-md)" }}>
          {(["chatgpt", "claude", "gemini"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              style={{
                border: "none",
                background: platform === p ? "rgba(125, 231, 255, 0.2)" : "transparent",
                color: platform === p ? "var(--cosmic-accent-cyan)" : "var(--cosmic-text-muted)",
                fontSize: "11px",
                fontWeight: 600,
                padding: "3px 10px",
                borderRadius: "var(--cosmic-radius-sm)",
                cursor: "pointer",
                textTransform: "uppercase"
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Simulated Browser Viewport */}
      <div style={{
        position: "relative",
        height: compact ? "300px" : "390px",
        overflow: "hidden",
        display: "flex",
        background: "#080d1b"
      }}>
        {/* The Live Cosmic Background Layer */}
        {settings.enabled && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background: bgString,
              filter: filterString,
              opacity: opacity,
              backgroundAttachment: "fixed",
              transition: "opacity 0.25s ease, filter 0.25s ease"
            }}
          />
        )}

        {/* Overlay Tint Layer */}
        {settings.enabled && settings.overlayColor && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: settings.overlayColor,
              pointerEvents: "none"
            }}
          />
        )}

        {/* Simulated AI Chat Glass Sidebar (Concept 1 Layout + Concept 4 Highlight) */}
        <div style={{
          width: compact ? "110px" : "210px",
          borderRight: "1px solid rgba(80, 140, 230, 0.22)",
          background: "rgba(10, 16, 32, 0.78)",
          backdropFilter: `blur(${settings.glassBlur}px)`,
          WebkitBackdropFilter: `blur(${settings.glassBlur}px)`,
          padding: "14px 10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          zIndex: 2,
          flexShrink: 0
        }}>
          <div>
            {/* Sidebar Top: Logo + Search */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px", padding: "0 4px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#ffffff", fontWeight: 700, fontSize: "13px" }}>
                <Sparkles size={14} color="var(--cosmic-accent-cyan)" />
                {!compact && <span>{platform.toUpperCase()}</span>}
              </div>
              {!compact && <Search size={12} color="var(--cosmic-text-muted)" />}
            </div>

            {/* New Chat Button */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "7px 10px",
              borderRadius: "10px",
              background: "rgba(14, 165, 233, 0.12)",
              border: "1px solid rgba(125, 231, 255, 0.25)",
              color: "#ffffff",
              fontSize: "11px",
              fontWeight: 600,
              marginBottom: "10px",
              cursor: "pointer"
            }}>
              <Plus size={12} color="#7de7ff" />
              {!compact && <span>New chat</span>}
            </div>

            {/* Project Folder */}
            {!compact && (
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 8px",
                borderRadius: "8px",
                fontSize: "10px",
                color: "var(--cosmic-text-secondary)",
                marginBottom: "8px"
              }}>
                <Folder size={12} color="#fbbf24" />
                <span>CP / SelaiSathi</span>
              </div>
            )}

            {/* Conversation List with Concept 4 Glowing Stretchy Capsule */}
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {/* The ACTIVE CHAT with Concept 4 Glowing Capsule */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "7px 10px",
                  borderRadius: "10px",
                  background: "linear-gradient(100deg, #00d2ff 0%, #3b82f6 40%, #9333ea 85%, #ec4899 100%)",
                  boxShadow: "0 0 20px rgba(0, 210, 255, 0.5), 0 0 35px rgba(147, 51, 234, 0.3)",
                  color: "#ffffff",
                  fontSize: "11px",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px", minWidth: 0 }}>
                  <MessageSquare size={11} color="#ffffff" />
                  {!compact && (
                    <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      চ্যাট ব্যাকগ্রাউন্ড পরিবর্তন
                    </span>
                  )}
                </div>
                {!compact && <span style={{ fontSize: "10px" }}>›</span>}
              </div>

              {/* Inactive Chat Items */}
              {!compact && (
                <>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 10px",
                    borderRadius: "8px",
                    color: "var(--cosmic-text-secondary)",
                    fontSize: "11px"
                  }}>
                    <MessageSquare size={11} color="var(--cosmic-text-muted)" />
                    <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Weekly encrypted VAULT
                    </span>
                  </div>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 10px",
                    borderRadius: "8px",
                    color: "var(--cosmic-text-secondary)",
                    fontSize: "11px"
                  }}>
                    <MessageSquare size={11} color="var(--cosmic-text-muted)" />
                    <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Inventory UI Polish
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* User Profile Card at Bottom (Masum Billah, Free, Upgrade) */}
          <div style={{
            padding: "6px 8px",
            borderRadius: "10px",
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid rgba(80, 140, 230, 0.22)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                background: "#7c3aed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "9px",
                fontWeight: 700,
                color: "#ffffff"
              }}>
                MB
              </div>
              {!compact && (
                <div>
                  <div style={{ fontSize: "10px", fontWeight: 700, color: "#ffffff", lineHeight: 1.1 }}>
                    Masum Billah
                  </div>
                  <div style={{ fontSize: "8px", color: "var(--cosmic-text-muted)" }}>Free</div>
                </div>
              )}
            </div>
            {!compact && (
              <span style={{
                fontSize: "8px",
                fontWeight: 700,
                padding: "2px 5px",
                borderRadius: "4px",
                background: "rgba(251, 191, 36, 0.15)",
                color: "#fbbf24",
                border: "1px solid rgba(251, 191, 36, 0.3)"
              }}>
                Upgrade
              </span>
            )}
          </div>
        </div>

        {/* Simulated Conversation Container */}
        <div style={{
          flex: 1,
          padding: compact ? "16px" : "24px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          zIndex: 2,
          overflowY: "auto"
        }}>
          {/* Simulated Chat Messages */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "600px", margin: "0 auto", width: "100%" }}>
            {/* User Message */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <div style={{
                background: "rgba(30, 45, 80, 0.8)",
                backdropFilter: `blur(${settings.glassBlur}px)`,
                border: "1px solid rgba(125, 231, 255, 0.2)",
                padding: "10px 14px",
                borderRadius: "14px 14px 2px 14px",
                fontSize: "12px",
                color: "#f1f5f9",
                maxWidth: "85%"
              }}>
                চ্যাট ব্যাকগ্রাউন্ড ও সাইডবারে প্রিমিয়াম কসমিক গ্লাস এবং স্ট্রেচি ক্যাপসুল ইফেক্ট যুক্ত করো!
              </div>
              <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <User size={14} color="#fff" />
              </div>
            </div>

            {/* AI Response Message */}
            <div style={{ display: "flex", justifyContent: "flex-start", gap: "10px" }}>
              <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: theme.accentColor, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Bot size={14} color="#080d1b" />
              </div>
              <div style={{
                background: "rgba(14, 22, 44, 0.82)",
                backdropFilter: `blur(${settings.glassBlur}px)`,
                border: `1px solid ${settings.contrastBoost ? "rgba(125, 231, 255, 0.4)" : "rgba(255, 255, 255, 0.1)"}`,
                padding: "12px 16px",
                borderRadius: "14px 14px 14px 2px",
                fontSize: "12px",
                color: "#e2e8f0",
                maxWidth: "85%",
                lineHeight: 1.5
              }}>
                <div style={{ fontWeight: 600, color: theme.accentColor, marginBottom: "4px" }}>
                  CosmicLayer Active — {theme.name}
                </div>
                সাইডবারের সাধারণ ফ্ল্যাট ব্যাকগ্রাউন্ড পরিবর্তিত হয়ে প্রিমিয়াম কসমিক গ্লাস হয়েছে। অ্যাক্টিভ চ্যাট আইটেমে এখন নিয়ন সায়ান-পার্পল স্ট্রেচি ক্যাপসুল যুক্ত হয়েছে!
              </div>
            </div>
          </div>

          {/* Simulated Input Bar */}
          <div style={{
            maxWidth: "600px",
            margin: "12px auto 0 auto",
            width: "100%",
            background: "rgba(10, 16, 32, 0.85)",
            backdropFilter: `blur(${settings.glassBlur}px)`,
            border: `1px solid ${theme.accentColor}44`,
            borderRadius: "12px",
            padding: "8px 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "11px",
            color: "var(--cosmic-text-muted)"
          }}>
            <span>Message {platform.toUpperCase()}…</span>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <SlidersHorizontal size={13} color={theme.accentColor} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
