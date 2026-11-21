import React, { useEffect, useRef, useState } from "react";
import {
  HardDrive,
  Download,
  Upload,
  RotateCcw,
  Check,
  AlertTriangle,
  Info
} from "lucide-react";
import type { CosmicSettings } from "../../shared/types";
import {
  exportSettingsJson,
  getStorageQuotaInfo,
  isChromeExtension,
  parseImportedSettings
} from "../../shared/storage";

interface SettingsTabProps {
  settings: CosmicSettings;
  onUpdate: (next: CosmicSettings) => void;
  onReset: () => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({ settings, onUpdate, onReset }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [quota, setQuota] = useState<{ usedBytes: number; quotaBytes: number; percentage: number }>({
    usedBytes: 0,
    quotaBytes: 5242880,
    percentage: 0
  });
  const [importStatus, setImportStatus] = useState<{ success: boolean; msg: string } | null>(null);

  useEffect(() => {
    getStorageQuotaInfo().then(setQuota);
  }, [settings]);

  const handleImportFile = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = String(reader.result);
        const imported = parseImportedSettings(text);
        onUpdate(imported);
        setImportStatus({ success: true, msg: "Configuration imported successfully!" });
      } catch (err) {
        setImportStatus({
          success: false,
          msg: err instanceof Error ? err.message : "Failed to parse JSON file."
        });
      }
      setTimeout(() => setImportStatus(null), 4000);
    };
    reader.readAsText(file);
  };

  const handleFactoryReset = async () => {
    if (confirm("Are you sure you want to reset all CosmicLayer settings to defaults? This will remove custom wallpapers and theme tweaks.")) {
      onReset();
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Header */}
      <div>
        <h1 style={{ fontFamily: "var(--cosmic-font-heading)", fontSize: "22px", fontWeight: 700, margin: 0 }}>
          Settings & Local Data
        </h1>
        <p style={{ fontSize: "13px", color: "var(--cosmic-text-secondary)", margin: "4px 0 0 0" }}>
          Manage local storage quota, backup configurations, import settings, and inspect extension diagnostics.
        </p>
      </div>

      {importStatus && (
        <div style={{
          padding: "12px 16px",
          borderRadius: "var(--cosmic-radius-md)",
          background: importStatus.success ? "rgba(52, 211, 153, 0.15)" : "rgba(244, 63, 94, 0.15)",
          border: `1px solid ${importStatus.success ? "rgba(52, 211, 153, 0.4)" : "rgba(244, 63, 94, 0.4)"}`,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: importStatus.success ? "#34d399" : "#fca5a5",
          fontSize: "13px",
          fontWeight: 500
        }}>
          {importStatus.success ? <Check size={16} /> : <AlertTriangle size={16} />}
          {importStatus.msg}
        </div>
      )}

      {/* Storage Quota Card */}
      <div className="glass-panel" style={{ padding: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <HardDrive size={18} color="var(--cosmic-accent-cyan)" />
            <h2 style={{ fontFamily: "var(--cosmic-font-heading)", fontSize: "15px", fontWeight: 600, margin: 0 }}>
              Local Chrome Storage Quota
            </h2>
          </div>
          <span className="cosmic-badge cosmic-badge-cyan">
            {formatBytes(quota.usedBytes)} / {formatBytes(quota.quotaBytes)} ({quota.percentage}%)
          </span>
        </div>

        {/* Progress Bar */}
        <div style={{
          width: "100%",
          height: "8px",
          borderRadius: "var(--cosmic-radius-full)",
          background: "rgba(255, 255, 255, 0.08)",
          overflow: "hidden",
          marginBottom: "12px"
        }}>
          <div style={{
            height: "100%",
            width: `${Math.max(2, quota.percentage)}%`,
            background: quota.percentage > 85 ? "linear-gradient(90deg, #f59e0b, #ef4444)" : "linear-gradient(90deg, #0ea5e9, #a855f7)",
            borderRadius: "var(--cosmic-radius-full)",
            transition: "width 0.4s ease"
          }} />
        </div>

        <p style={{ fontSize: "12px", color: "var(--cosmic-text-muted)", margin: 0 }}>
          All custom wallpaper images and appearance preferences are stored completely inside your browser's private local storage partition.
        </p>
      </div>

      {/* Backup and Restore */}
      <div className="glass-panel" style={{ padding: "20px" }}>
        <h2 style={{ fontFamily: "var(--cosmic-font-heading)", fontSize: "15px", fontWeight: 600, marginBottom: "6px" }}>
          Configuration Backup & Restore
        </h2>
        <p style={{ fontSize: "12px", color: "var(--cosmic-text-secondary)", marginBottom: "16px" }}>
          Export your entire CosmicLayer setup as a portable JSON file to synchronize with another machine or keep safe.
        </p>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            className="cosmic-btn cosmic-btn-primary"
            onClick={() => exportSettingsJson(settings)}
          >
            <Download size={14} /> Export Backup (.json)
          </button>

          <button
            className="cosmic-btn cosmic-btn-secondary"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload size={14} /> Import Backup (.json)
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            style={{ display: "none" }}
            onChange={(e) => handleImportFile(e.target.files?.[0])}
          />
        </div>
      </div>

      {/* Factory Reset */}
      <div className="glass-panel" style={{ padding: "20px" }}>
        <h2 style={{ fontFamily: "var(--cosmic-font-heading)", fontSize: "15px", fontWeight: 600, color: "#fca5a5", marginBottom: "6px" }}>
          Danger Zone
        </h2>
        <p style={{ fontSize: "12px", color: "var(--cosmic-text-secondary)", marginBottom: "16px" }}>
          Reset all settings and purge uploaded wallpaper data. This restores CosmicLayer to default factory settings.
        </p>
        <button
          className="cosmic-btn cosmic-btn-danger"
          onClick={handleFactoryReset}
        >
          <RotateCcw size={14} /> Factory Reset All Settings
        </button>
      </div>

      {/* System Diagnostics */}
      <div className="glass-card" style={{ padding: "18px 22px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
          <Info size={16} color="var(--cosmic-accent-cyan)" />
          <h3 style={{ fontFamily: "var(--cosmic-font-heading)", fontSize: "14px", fontWeight: 600, margin: 0 }}>
            System Diagnostics
          </h3>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px", fontSize: "12px" }}>
          <div>
            <span style={{ color: "var(--cosmic-text-muted)" }}>CosmicLayer Version:</span>
            <div style={{ fontWeight: 600, color: "var(--cosmic-text-primary)" }}>v{settings.version} (Foundation)</div>
          </div>
          <div>
            <span style={{ color: "var(--cosmic-text-muted)" }}>Extension Manifest:</span>
            <div style={{ fontWeight: 600, color: "var(--cosmic-text-primary)" }}>Manifest V3 (MV3)</div>
          </div>
          <div>
            <span style={{ color: "var(--cosmic-text-muted)" }}>Storage Provider:</span>
            <div style={{ fontWeight: 600, color: "var(--cosmic-text-primary)" }}>
              {isChromeExtension() ? "chrome.storage.local" : "window.localStorage (Dev Mode)"}
            </div>
          </div>
          <div>
            <span style={{ color: "var(--cosmic-text-muted)" }}>Active Platform Count:</span>
            <div style={{ fontWeight: 600, color: "var(--cosmic-text-primary)" }}>
              {Object.values(settings.platforms).filter(Boolean).length} of 3 browser targets
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
