import React, { useRef, useState } from "react";
import {
  Upload,
  Image as ImageIcon,
  Trash2,
  RotateCcw,
  Sliders,
  Check,
  Sparkles,
  Info
} from "lucide-react";
import type { BackgroundPosition, BackgroundSize, CosmicSettings } from "../../shared/types";
import { DEFAULT_GRADIENTS, DEFAULT_SETTINGS } from "../../shared/types";
import { LiveMockupPreview } from "./LiveMockupPreview";

interface BackgroundStudioTabProps {
  settings: CosmicSettings;
  onUpdate: (next: CosmicSettings) => void;
}

export const BackgroundStudioTab: React.FC<BackgroundStudioTabProps> = ({ settings, onUpdate }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const handleFileUpload = (file?: File) => {
    if (!file) return;

    const validTypes = ["image/png", "image/jpeg", "image/webp", "image/gif", "image/svg+xml"];
    if (!validTypes.includes(file.type)) {
      alert("Invalid format: Please choose a PNG, JPG, WebP, GIF, or SVG image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image is too large: Browser local storage limit is 5MB. Please choose an image smaller than 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result);
      onUpdate({
        ...settings,
        wallpaper: dataUrl,
        wallpaperName: file.name,
        enabled: true
      });
      triggerSaveNotice("Wallpaper updated & saved locally");
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveWallpaper = () => {
    onUpdate({
      ...settings,
      wallpaper: undefined,
      wallpaperName: undefined
    });
    triggerSaveNotice("Wallpaper removed");
  };

  const handleReset = () => {
    onUpdate({
      ...settings,
      wallpaper: undefined,
      wallpaperName: undefined,
      backgroundPosition: DEFAULT_SETTINGS.backgroundPosition,
      backgroundSize: DEFAULT_SETTINGS.backgroundSize,
      brightness: DEFAULT_SETTINGS.brightness,
      contrast: DEFAULT_SETTINGS.contrast,
      saturation: DEFAULT_SETTINGS.saturation,
      blur: DEFAULT_SETTINGS.blur,
      opacity: DEFAULT_SETTINGS.opacity,
      overlayColor: DEFAULT_SETTINGS.overlayColor,
      activeGradient: DEFAULT_SETTINGS.activeGradient
    });
    triggerSaveNotice("Background settings reset to default");
  };

  const triggerSaveNotice = (msg: string) => {
    setSaveStatus(msg);
    setTimeout(() => setSaveStatus(null), 2500);
  };

  const positions: { id: BackgroundPosition; label: string }[] = [
    { id: "center", label: "Center" },
    { id: "top", label: "Top" },
    { id: "bottom", label: "Bottom" },
    { id: "left", label: "Left" },
    { id: "right", label: "Right" }
  ];

  const sizes: { id: BackgroundSize; label: string }[] = [
    { id: "cover", label: "Cover (Fill)" },
    { id: "contain", label: "Contain (Fit)" },
    { id: "100% 100%", label: "Exact 100%" },
    { id: "120% auto", label: "Zoom 120%" }
  ];

  const overlayPresets = [
    { label: "Midnight Navy", value: "rgba(8, 13, 27, 0.65)" },
    { label: "Deep Violet", value: "rgba(20, 10, 35, 0.65)" },
    { label: "Obsidian Void", value: "rgba(0, 0, 0, 0.75)" },
    { label: "Cosmic Gold", value: "rgba(25, 20, 10, 0.65)" },
    { label: "None (Raw)", value: "transparent" }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Header & Status Notice */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontFamily: "var(--cosmic-font-heading)", fontSize: "22px", fontWeight: 700, margin: 0 }}>
            Background Studio
          </h1>
          <p style={{ fontSize: "13px", color: "var(--cosmic-text-secondary)", margin: "4px 0 0 0" }}>
            Upload custom local wallpapers or select curated cosmic gradients. Configure scaling, blur, and opacity.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {saveStatus && (
            <span className="cosmic-badge cosmic-badge-emerald" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Check size={12} /> {saveStatus}
            </span>
          )}
          <button className="cosmic-btn cosmic-btn-secondary cosmic-btn-sm" onClick={handleReset}>
            <RotateCcw size={13} /> Reset Background
          </button>
        </div>
      </div>

      {/* Grid: Controls on left, Live Simulator on right */}
      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "24px", alignItems: "start" }}>
        {/* Controls Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Section 1: Custom Wallpaper Upload */}
          <div className="glass-panel" style={{ padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <ImageIcon size={18} color="var(--cosmic-accent-cyan)" />
                <h2 style={{ fontFamily: "var(--cosmic-font-heading)", fontSize: "14px", fontWeight: 600, margin: 0 }}>
                  Custom Wallpaper
                </h2>
              </div>
              <span className="cosmic-badge cosmic-badge-muted">100% LOCAL STORAGE</span>
            </div>

            {settings.wallpaper ? (
              /* Uploaded Image Preview Card */
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "12px",
                borderRadius: "var(--cosmic-radius-md)",
                background: "rgba(10, 16, 32, 0.7)",
                border: "1px solid var(--cosmic-border-medium)"
              }}>
                <div style={{
                  width: "70px",
                  height: "50px",
                  borderRadius: "6px",
                  backgroundImage: `url(${settings.wallpaper})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  flexShrink: 0
                }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--cosmic-text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {settings.wallpaperName || "Custom Wallpaper"}
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--cosmic-text-muted)" }}>
                    Stored in local Chrome storage. Never uploaded to remote servers.
                  </div>
                </div>
                <button
                  className="cosmic-btn cosmic-btn-danger cosmic-btn-sm"
                  onClick={handleRemoveWallpaper}
                  title="Remove custom wallpaper"
                >
                  <Trash2 size={14} /> Remove
                </button>
              </div>
            ) : (
              /* Drag & Drop Upload Zone */
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleFileUpload(e.dataTransfer.files?.[0]);
                }}
                style={{
                  border: "2px dashed rgba(125, 231, 255, 0.3)",
                  borderRadius: "var(--cosmic-radius-md)",
                  padding: "24px 16px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  background: "rgba(10, 16, 32, 0.5)",
                  cursor: "pointer",
                  transition: "all var(--cosmic-transition-fast)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--cosmic-accent-cyan)";
                  e.currentTarget.style.background = "rgba(14, 165, 233, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(125, 231, 255, 0.3)";
                  e.currentTarget.style.background = "rgba(10, 16, 32, 0.5)";
                }}
              >
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "rgba(125, 231, 255, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--cosmic-accent-cyan)"
                }}>
                  <Upload size={18} />
                </div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--cosmic-text-primary)" }}>
                  Click to upload wallpaper or drag and drop
                </div>
                <div style={{ fontSize: "11px", color: "var(--cosmic-text-muted)" }}>
                  PNG, JPG, WebP, GIF or SVG · Max 5MB
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileUpload(e.target.files?.[0])}
                />
              </div>
            )}
          </div>

          {/* Section 2: Position & Sizing */}
          <div className="glass-panel" style={{ padding: "20px" }}>
            <h2 style={{ fontFamily: "var(--cosmic-font-heading)", fontSize: "14px", fontWeight: 600, marginBottom: "14px" }}>
              Alignment & Scaling
            </h2>

            {/* Position */}
            <div style={{ marginBottom: "16px" }}>
              <div style={{ fontSize: "12px", color: "var(--cosmic-text-secondary)", marginBottom: "8px", fontWeight: 500 }}>
                Background Position
              </div>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {positions.map((pos) => (
                  <button
                    key={pos.id}
                    className={`cosmic-btn cosmic-btn-sm ${settings.backgroundPosition === pos.id ? "cosmic-btn-primary" : "cosmic-btn-secondary"}`}
                    onClick={() => {
                      onUpdate({ ...settings, backgroundPosition: pos.id });
                      triggerSaveNotice(`Position set to ${pos.label}`);
                    }}
                  >
                    {pos.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <div style={{ fontSize: "12px", color: "var(--cosmic-text-secondary)", marginBottom: "8px", fontWeight: 500 }}>
                Background Scaling Mode
              </div>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {sizes.map((s) => (
                  <button
                    key={s.id}
                    className={`cosmic-btn cosmic-btn-sm ${settings.backgroundSize === s.id ? "cosmic-btn-primary" : "cosmic-btn-secondary"}`}
                    onClick={() => {
                      onUpdate({ ...settings, backgroundSize: s.id });
                      triggerSaveNotice(`Scaling set to ${s.label}`);
                    }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Visual Adjustments Sliders */}
          <div className="glass-panel" style={{ padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <Sliders size={18} color="var(--cosmic-accent-cyan)" />
              <h2 style={{ fontFamily: "var(--cosmic-font-heading)", fontSize: "14px", fontWeight: 600, margin: 0 }}>
                Image Adjustments & CSS Filters
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Opacity */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "12px" }}>
                  <span style={{ color: "var(--cosmic-text-secondary)", fontWeight: 500 }}>Atmosphere Opacity</span>
                  <span className="cosmic-badge cosmic-badge-cyan">{settings.opacity}%</span>
                </div>
                <input
                  type="range"
                  className="cosmic-slider"
                  min="0"
                  max="90"
                  value={settings.opacity}
                  onChange={(e) => onUpdate({ ...settings, opacity: Number(e.target.value) })}
                  aria-label="Background Opacity"
                />
              </div>

              {/* Blur */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "12px" }}>
                  <span style={{ color: "var(--cosmic-text-secondary)", fontWeight: 500 }}>Background Blur</span>
                  <span className="cosmic-badge cosmic-badge-violet">{settings.blur}px</span>
                </div>
                <input
                  type="range"
                  className="cosmic-slider"
                  min="0"
                  max="40"
                  value={settings.blur}
                  onChange={(e) => onUpdate({ ...settings, blur: Number(e.target.value) })}
                  aria-label="Background Blur"
                />
              </div>

              {/* Brightness */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "12px" }}>
                  <span style={{ color: "var(--cosmic-text-secondary)", fontWeight: 500 }}>Brightness</span>
                  <span className="cosmic-badge cosmic-badge-muted">{settings.brightness}%</span>
                </div>
                <input
                  type="range"
                  className="cosmic-slider"
                  min="50"
                  max="150"
                  value={settings.brightness}
                  onChange={(e) => onUpdate({ ...settings, brightness: Number(e.target.value) })}
                  aria-label="Brightness"
                />
              </div>

              {/* Contrast */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "12px" }}>
                  <span style={{ color: "var(--cosmic-text-secondary)", fontWeight: 500 }}>Contrast</span>
                  <span className="cosmic-badge cosmic-badge-muted">{settings.contrast}%</span>
                </div>
                <input
                  type="range"
                  className="cosmic-slider"
                  min="50"
                  max="150"
                  value={settings.contrast}
                  onChange={(e) => onUpdate({ ...settings, contrast: Number(e.target.value) })}
                  aria-label="Contrast"
                />
              </div>

              {/* Saturation */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "12px" }}>
                  <span style={{ color: "var(--cosmic-text-secondary)", fontWeight: 500 }}>Saturation</span>
                  <span className="cosmic-badge cosmic-badge-muted">{settings.saturation}%</span>
                </div>
                <input
                  type="range"
                  className="cosmic-slider"
                  min="0"
                  max="200"
                  value={settings.saturation}
                  onChange={(e) => onUpdate({ ...settings, saturation: Number(e.target.value) })}
                  aria-label="Saturation"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Overlay Tint Presets */}
          <div className="glass-panel" style={{ padding: "20px" }}>
            <h2 style={{ fontFamily: "var(--cosmic-font-heading)", fontSize: "14px", fontWeight: 600, marginBottom: "12px" }}>
              Overlay Color Tint
            </h2>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {overlayPresets.map((preset) => (
                <button
                  key={preset.label}
                  className={`cosmic-btn cosmic-btn-sm ${settings.overlayColor === preset.value ? "cosmic-btn-primary" : "cosmic-btn-secondary"}`}
                  onClick={() => {
                    onUpdate({ ...settings, overlayColor: preset.value });
                    triggerSaveNotice(`Overlay tint set to ${preset.label}`);
                  }}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Section 5: Curated Cosmic Gradient Presets */}
          <div className="glass-panel" style={{ padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
              <Sparkles size={18} color="var(--cosmic-accent-gold)" />
              <h2 style={{ fontFamily: "var(--cosmic-font-heading)", fontSize: "14px", fontWeight: 600, margin: 0 }}>
                Curated Cosmic Gradients
              </h2>
            </div>
            <p style={{ fontSize: "12px", color: "var(--cosmic-text-muted)", marginBottom: "14px" }}>
              Choose an ambient space gradient to render when no custom photo is active.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "10px" }}>
              {DEFAULT_GRADIENTS.map((grad) => {
                const isSelected = settings.activeGradient === grad.css && !settings.wallpaper;
                return (
                  <button
                    key={grad.id}
                    onClick={() => {
                      onUpdate({
                        ...settings,
                        activeGradient: grad.css,
                        wallpaper: undefined,
                        wallpaperName: undefined
                      });
                      triggerSaveNotice(`Applied ${grad.name} gradient`);
                    }}
                    style={{
                      border: isSelected ? "2px solid var(--cosmic-accent-cyan)" : "1px solid var(--cosmic-border-subtle)",
                      borderRadius: "var(--cosmic-radius-md)",
                      padding: "10px",
                      background: "rgba(10, 16, 32, 0.7)",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "8px",
                      boxShadow: isSelected ? "0 0 12px var(--cosmic-accent-cyan-glow)" : "none",
                      transition: "all var(--cosmic-transition-fast)"
                    }}
                  >
                    <div style={{
                      width: "100%",
                      height: "45px",
                      borderRadius: "6px",
                      background: grad.css,
                      border: "1px solid rgba(255, 255, 255, 0.1)"
                    }} />
                    <span style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: isSelected ? "var(--cosmic-accent-cyan)" : "var(--cosmic-text-secondary)",
                      textAlign: "center"
                    }}>
                      {grad.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Live Simulator Sticky Column */}
        <div style={{ position: "sticky", top: "85px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <LiveMockupPreview settings={settings} />

          {/* Quick CSS Variables Info Card */}
          <div className="glass-card" style={{ padding: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
              <Info size={14} color="var(--cosmic-accent-cyan)" />
              <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--cosmic-text-primary)" }}>
                CSS Variable Injection
              </span>
            </div>
            <p style={{ fontSize: "11px", color: "var(--cosmic-text-muted)", lineHeight: 1.4, margin: "0 0 8px 0" }}>
              Your settings automatically generate these non-destructive CSS variables in the active AI page:
            </p>
            <pre style={{
              background: "rgba(5, 8, 17, 0.9)",
              padding: "10px",
              borderRadius: "6px",
              fontSize: "11px",
              color: "#38bdf8",
              fontFamily: "var(--cosmic-font-mono)",
              overflowX: "auto"
            }}>
{`--cosmic-opacity: ${settings.opacity / 100};
--cosmic-filter: blur(${settings.blur}px) brightness(${settings.brightness}%);
--cosmic-overlay: ${settings.overlayColor};`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
