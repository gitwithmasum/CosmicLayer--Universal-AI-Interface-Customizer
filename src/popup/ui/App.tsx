import { useEffect, useState } from "react";
import { Aperture, ImagePlus, RotateCcw, Sparkles, WandSparkles } from "lucide-react";
import { DEFAULT_SETTINGS, THEME_BACKGROUNDS, type CosmicSettings, type ThemeId } from "../../shared/types";

const themes: { id: ThemeId; name: string; color: string }[] = [
  { id: "nebula", name: "Nebula", color: "linear-gradient(135deg,#263e91,#8c4bb8)" },
  { id: "cyberpunk", name: "Cyberpunk", color: "linear-gradient(135deg,#00cde9,#e52a9a)" },
  { id: "aurora", name: "Aurora", color: "linear-gradient(135deg,#1a9f88,#546be2)" },
  { id: "gold", name: "Cosmic Gold", color: "linear-gradient(135deg,#9a6b25,#e6c27a)" }
];

async function readSettings(): Promise<CosmicSettings> {
  if (!chrome?.storage?.local) return DEFAULT_SETTINGS;
  const result = await chrome.storage.local.get("cosmicSettings");
  return { ...DEFAULT_SETTINGS, ...(result.cosmicSettings as Partial<CosmicSettings> | undefined) };
}

export function App() {
  const [settings, setSettings] = useState<CosmicSettings>(DEFAULT_SETTINGS);
  const [ready, setReady] = useState(false);

  useEffect(() => { readSettings().then((value) => { setSettings(value); setReady(true); }); }, []);

  async function save(next: CosmicSettings) {
    setSettings(next);
    await chrome.storage.local.set({ cosmicSettings: next });
  }

  async function uploadWallpaper(file?: File) {
    if (!file) return;
    if (!/^image\/(png|jpeg|webp|gif)$/.test(file.type)) {
      alert("Choose a PNG, JPG, WebP or GIF image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Please choose an image smaller than 5 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => save({ ...settings, wallpaper: String(reader.result), enabled: true });
    reader.readAsDataURL(file);
  }

  const activeTheme = themes.find((theme) => theme.id === settings.theme)!;

  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand-mark"><Aperture size={21} /></div>
        <div className="brand-copy"><strong>CosmicLayer</strong><span>UNIVERSAL AI APPEARANCE</span></div>
        <span className={settings.enabled ? "status online" : "status"}>{settings.enabled ? "ACTIVE" : "PAUSED"}</span>
      </header>

      <section className="hero">
        <div className="eyebrow"><Sparkles size={13} /> YOUR AI, YOUR UNIVERSE</div>
        <h1>Shape your<br /><span>workspace.</span></h1>
        <p>One visual identity across your favorite AI workspaces.</p>
      </section>

      <section className="section">
        <div className="section-heading"><div><span className="kicker">01 / PERSONALIZATION</span><h2>Choose your atmosphere</h2></div><WandSparkles size={18} /></div>
        <div className="theme-grid">
          {themes.map((theme) => (
            <button key={theme.id} className={settings.theme === theme.id ? "theme-card selected" : "theme-card"} onClick={() => save({ ...settings, theme: theme.id, enabled: true })}>
              <span className="swatch" style={{ background: theme.color }} />
              <span>{theme.name}</span>
              {settings.theme === theme.id && <i />}
            </button>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading"><div><span className="kicker">02 / BACKGROUND STUDIO</span><h2>Custom wallpaper</h2></div><ImagePlus size={18} /></div>
        <label className="upload-zone">
          <ImagePlus size={19} /><span>{settings.wallpaper ? "Replace your wallpaper" : "Upload your own image"}</span><small>PNG · JPG · WEBP · GIF / MAX 5 MB</small>
          <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={(event) => uploadWallpaper(event.target.files?.[0])} />
        </label>
        {settings.wallpaper && <button className="text-button" onClick={() => save({ ...settings, wallpaper: undefined })}>Remove custom wallpaper</button>}
      </section>

      <section className="section opacity-section">
        <div className="range-heading"><div><span className="kicker">03 / ATMOSPHERE</span><h2>Background intensity</h2></div><output>{settings.opacity}%</output></div>
        <input aria-label="Background intensity" type="range" min="0" max="80" value={settings.opacity} onChange={(event) => save({ ...settings, opacity: Number(event.target.value) })} />
      </section>

      <footer className="footer">
        <button className="toggle-button" onClick={() => save({ ...settings, enabled: !settings.enabled })}>{settings.enabled ? "Pause effects" : "Enable effects"}</button>
        <button className="reset-button" onClick={() => save(DEFAULT_SETTINGS)}><RotateCcw size={14} /> Reset</button>
      </footer>
      {!ready && <div className="loading">Initializing your universe…</div>}
      <div className="platform-note">Browser preview foundation · More platform adapters coming next</div>
    </main>
  );
}