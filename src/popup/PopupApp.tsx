import React, { useEffect, useState, useRef } from "react";
import {
  Upload,
  RotateCcw,
  Maximize2,
  Trash2,
  Check,
  Image as ImageIcon
} from "lucide-react";
import { CosmicLogo } from "../ui/components/CosmicLogo";
import type { CosmicSettings } from "../shared/types";
import { DEFAULT_SETTINGS } from "../shared/types";
import { THEME_LIST, THEMES } from "../shared/themes";
import { getSettings, isChromeExtension, resetSettings, saveSettings } from "../shared/storage";

export const PopupApp: React.FC = () => {
  const [settings, setSettings] = useState<CosmicSettings>(DEFAULT_SETTINGS);
  const [isReady, setIsReady] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getSettings().then((loaded) => {
      setSettings(loaded);
      setIsReady(true);
    });
  }, []);

  const handleSave = async (next: CosmicSettings) => {
    setSettings(next);
    await saveSettings(next);
  };

  const handleFileUpload = (file?: File) => {
    if (!file) return;
    if (!/^image\/(png|jpeg|webp|gif|svg\+xml)$/.test(file.type)) {
      alert("Please choose a PNG, JPG, WebP, GIF, or SVG image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Image is larger than 5MB. Please choose a smaller image.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      handleSave({
        ...settings,
        wallpaper: String(reader.result),
        wallpaperName: file.name,
        enabled: true
      });
    };
    reader.readAsDataURL(file);
  };

  const openFullDashboard = () => {
    if (isChromeExtension() && chrome.tabs?.create) {
      chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
    } else {
      window.open("index.html", "_blank");
    }
  };

  const activeTheme = THEMES[settings.theme] || THEMES.nebula;

  if (!isReady) {
    return (
      <div style={{ padding: "30px", textAlign: "center", color: "var(--cosmic-accent-cyan)" }}>
        Loading CosmicLayer…
      </div>
    );
  }

  return (
    <div style={{
      width: "380px",
      minHeight: "560px",
      background: "radial-gradient(ellipse at 0% 25%, rgba(15, 150, 156, 0.22), transparent 55%), radial-gradient(ellipse at 100% 75%, rgba(12, 112, 117, 0.22), transparent 55%), #05161a",
      color: "var(--cosmic-text-primary)",
      fontFamily: "var(--cosmic-font-body)",
      padding: "16px 18px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      boxSizing: "border-box"
    }}>
      {/* Top Header */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
          <CosmicLogo size={30} showText={true} />

          {/* Quick Active Status & Toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{
              fontSize: "10px",
              fontWeight: 600,
              padding: "2px 7px",
              borderRadius: "10px",
              background: settings.enabled ? "rgba(15, 150, 156, 0.16)" : "rgba(41, 77, 97, 0.25)",
              color: settings.enabled ? "#6da5c0" : "#436a7e",
              border: `1px solid ${settings.enabled ? "rgba(15, 150, 156, 0.4)" : "rgba(41, 77, 97, 0.35)"}`
            }}>
              {settings.enabled ? "ACTIVE" : "PAUSED"}
            </span>
            <label className="cosmic-switch" style={{ width: "38px", height: "20px" }}>
              <input
                type="checkbox"
                checked={settings.enabled}
                onChange={() => handleSave({ ...settings, enabled: !settings.enabled })}
                aria-label="Toggle active"
              />
              <span className="cosmic-switch-slider" />
            </label>
          </div>
        </div>

        {/* Current Atmosphere Badge */}
        <div style={{
          background: "rgba(7, 46, 51, 0.75)",
          border: "1px solid rgba(41, 77, 97, 0.4)",
          borderRadius: "var(--cosmic-radius-md)",
          padding: "10px 12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "14px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{
              width: "14px",
              height: "14px",
              borderRadius: "4px",
              background: activeTheme.accentColor,
              boxShadow: `0 0 8px ${activeTheme.accentColor}`
            }} />
            <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--cosmic-text-primary)" }}>
              {activeTheme.name}
            </span>
          </div>
          <span style={{ fontSize: "10px", color: "var(--cosmic-text-muted)" }}>
            {settings.wallpaper ? "Custom Photo Active" : "Cosmic Shimmer"}
          </span>
        </div>

        {/* Theme Presets (10 Themes in 2 Columns) */}
        <div style={{ marginBottom: "14px" }}>
          <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--cosmic-text-muted)", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "8px" }}>
            Theme Presets (10)
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "6px",
            maxHeight: "155px",
            overflowY: "auto",
            paddingRight: "2px"
          }}>
            {THEME_LIST.map((theme) => {
              const isSelected = settings.theme === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => handleSave({ ...settings, theme: theme.id, accentColor: theme.accentColor, enabled: true })}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    padding: "7px 9px",
                    borderRadius: "6px",
                    border: isSelected ? "1px solid #0f969c" : "1px solid rgba(41, 77, 97, 0.4)",
                    background: isSelected ? "rgba(15, 150, 156, 0.25)" : "rgba(7, 46, 51, 0.6)",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all var(--cosmic-transition-fast)"
                  }}
                >
                  <span style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "3px",
                    background: theme.accentColor,
                    flexShrink: 0
                  }} />
                  <span style={{
                    fontSize: "11px",
                    fontWeight: isSelected ? 600 : 500,
                    color: isSelected ? "#f0fdfa" : "#6da5c0",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}>
                    {theme.name}
                  </span>
                  {isSelected && <Check size={11} color="#0f969c" style={{ marginLeft: "auto" }} />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Wallpaper Upload / Remove */}
        <div style={{ marginBottom: "14px" }}>
          <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--cosmic-text-muted)", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "8px" }}>
            Local Wallpaper
          </div>
          {settings.wallpaper ? (
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 10px",
              borderRadius: "6px",
              background: "rgba(7, 46, 51, 0.65)",
              border: "1px solid rgba(41, 77, 97, 0.4)"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <ImageIcon size={14} color="#0f969c" />
                <span style={{ fontSize: "11px", color: "var(--cosmic-text-primary)", maxWidth: "180px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {settings.wallpaperName || "Custom Image"}
                </span>
              </div>
              <button
                className="cosmic-btn cosmic-btn-danger cosmic-btn-sm"
                style={{ padding: "3px 8px", fontSize: "10px" }}
                onClick={() => handleSave({ ...settings, wallpaper: undefined, wallpaperName: undefined })}
              >
                <Trash2 size={11} /> Remove
              </button>
            </div>
          ) : (
            <button
              className="cosmic-btn cosmic-btn-secondary"
              style={{ width: "100%", padding: "8px", fontSize: "11px" }}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload size={13} /> Upload Local Image
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
            style={{ display: "none" }}
            onChange={(e) => handleFileUpload(e.target.files?.[0])}
          />
        </div>

        {/* Background Opacity Slider */}
        <div style={{ marginBottom: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "4px" }}>
            <span style={{ color: "var(--cosmic-text-muted)", fontWeight: 600, letterSpacing: "0.8px", textTransform: "uppercase" }}>
              Atmosphere Intensity
            </span>
            <span style={{ color: "var(--cosmic-accent-cyan)", fontWeight: 600 }}>{settings.opacity}%</span>
          </div>
          <input
            type="range"
            className="cosmic-slider"
            min="0"
            max="80"
            value={settings.opacity}
            onChange={(e) => handleSave({ ...settings, opacity: Number(e.target.value) })}
            aria-label="Atmosphere Intensity"
          />
        </div>
      </div>

      {/* Bottom Footer Actions */}
      <div style={{ borderTop: "1px solid var(--cosmic-border-subtle)", paddingTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <button
          className="cosmic-btn cosmic-btn-primary"
          style={{ width: "100%", padding: "9px" }}
          onClick={openFullDashboard}
        >
          <Maximize2 size={13} /> Open Full Command Center
        </button>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button
            className="cosmic-btn cosmic-btn-secondary cosmic-btn-sm"
            onClick={async () => {
              const def = await resetSettings();
              setSettings(def);
            }}
          >
            <RotateCcw size={11} /> Reset
          </button>
          <span style={{ fontSize: "10px", color: "var(--cosmic-text-muted)" }}>
            ChatGPT · Claude · Gemini
          </span>
        </div>
      </div>
    </div>
  );
};
