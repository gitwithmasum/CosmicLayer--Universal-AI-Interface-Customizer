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
        borderBottom: "1px solid rgba(41, 77, 97, 0.35)",
        background: "rgba(5, 22, 26, 0.88)",
        fontSize: "12px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ display: "flex", gap: "5px" }}>
            <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#f43f5e" }} />
            <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#38bdf8" }} />
            <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#0f969c" }} />
          </div>
          <span style={{ fontWeight: 600, color: "#6da5c0", fontFamily: "var(--cosmic-font-heading)", marginLeft: "6px" }}>
            Live Atmosphere Simulator
          </span>
          <span className="cosmic-badge cosmic-badge-cyan" style={{ fontSize: "9px" }}>
            {platformTitles[platform]}
          </span>
        </div>

        {/* Platform Selector Buttons */}
        <div style={{ display: "flex", gap: "4px", background: "rgba(5, 22, 26, 0.8)", padding: "2px", borderRadius: "var(--cosmic-radius-md)" }}>
          {(["chatgpt", "claude", "gemini"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              style={{
                border: "none",
                background: platform === p ? "rgba(15, 150, 156, 0.25)" : "transparent",
                color: platform === p ? "#6da5c0" : "#3a6275",
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
        background: "#05161a"
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
          borderRight: "1px solid rgba(41, 77, 97, 0.35)",
          background: "rgba(7, 46, 51, 0.72)",
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
                <Sparkles size={14} color="#0f969c" />
                {!compact && <span>{platform.toUpperCase()}</span>}
              </div>
              {!compact && <Search size={12} color="#6da5c0" />}
            </div>

            {/* New Chat Button */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "7px 10px",
              borderRadius: "10px",
              background: "rgba(15, 150, 156, 0.16)",
              border: "1px solid rgba(15, 150, 156, 0.4)",
              color: "#ffffff",
              fontSize: "11px",
              fontWeight: 600,
              marginBottom: "10px",
              cursor: "pointer"
            }}>
              <Plus size={12} color="#0f969c" />
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
                color: "#6da5c0",
                marginBottom: "8px"
              }}>
                <Folder size={12} color="#0f969c" />
                <span>Workspaces / Projects</span>
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
                  background: "linear-gradient(105deg, #0f969c 0%, #0c7075 55%, #072e33 100%)",
                  boxShadow: "0 4px 18px rgba(15, 150, 156, 0.45), inset 0 1px 1px rgba(109, 165, 192, 0.5)",
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

          {/* User Profile Card at Bottom */}
          <div style={{
            padding: "6px 8px",
            borderRadius: "10px",
            background: "rgba(5, 22, 26, 0.75)",
            border: "1px solid rgba(41, 77, 97, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #0f969c, #072e33)",
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
                  <div style={{ fontSize: "8px", color: "#6da5c0" }}>Free</div>
                </div>
              )}
            </div>
            {!compact && (
              <span style={{
                fontSize: "8px",
                fontWeight: 700,
                padding: "2px 5px",
                borderRadius: "4px",
                background: "rgba(15, 150, 156, 0.2)",
                color: "#6da5c0",
                border: "1px solid rgba(15, 150, 156, 0.4)"
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
                background: "rgba(12, 112, 117, 0.45)",
                backdropFilter: `blur(${settings.glassBlur}px)`,
                border: "1px solid rgba(15, 150, 156, 0.35)",
                padding: "10px 14px",
                borderRadius: "14px 14px 2px 14px",
                fontSize: "12px",
                color: "#f0fdfa",
                maxWidth: "85%"
              }}>
                চ্যাট ব্যাকগ্রাউন্ড ও সাইডবারে প্রিমিয়াম ওশানিক গ্লাস এবং স্ট্রেচি ক্যাপসুল ইফেক্ট যুক্ত করো!
              </div>
              <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#0f969c", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <User size={14} color="#fff" />
              </div>
            </div>

            {/* AI Response Message */}
            <div style={{ display: "flex", justifyContent: "flex-start", gap: "10px" }}>
              <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#0f969c", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Bot size={14} color="#05161a" />
              </div>
              <div style={{
                background: "rgba(7, 46, 51, 0.8)",
                backdropFilter: `blur(${settings.glassBlur}px)`,
                border: `1px solid ${settings.contrastBoost ? "rgba(15, 150, 156, 0.5)" : "rgba(41, 77, 97, 0.4)"}`,
                padding: "12px 16px",
                borderRadius: "14px 14px 14px 2px",
                fontSize: "12px",
                color: "#f0fdfa",
                maxWidth: "85%",
                lineHeight: 1.5
              }}>
                <div style={{ fontWeight: 600, color: "#6da5c0", marginBottom: "4px" }}>
                  CosmicLayer Active — {theme.name}
                </div>
                সাইডবারের সাধারণ ফ্ল্যাট ব্যাকগ্রাউন্ড পরিবর্তিত হয়ে প্রিমিয়াম ডিপ-টিয়াল গ্লাস হয়েছে। অ্যাক্টিভ চ্যাট আইটেমে এখন স্মুথ সায়ান স্ট্রেচি ক্যাপসুল যুক্ত হয়েছে!
              </div>
            </div>
          </div>

          {/* Simulated Input Bar */}
          <div style={{
            maxWidth: "600px",
            margin: "12px auto 0 auto",
            width: "100%",
            background: "rgba(5, 22, 26, 0.88)",
            backdropFilter: `blur(${settings.glassBlur}px)`,
            border: "1px solid rgba(15, 150, 156, 0.4)",
            borderRadius: "12px",
            padding: "8px 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "11px",
            color: "#6da5c0"
          }}>
            <span>Message {platform.toUpperCase()}…</span>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <SlidersHorizontal size={13} color="#0f969c" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
