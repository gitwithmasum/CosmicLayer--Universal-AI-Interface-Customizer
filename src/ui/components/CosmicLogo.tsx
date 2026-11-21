import React from "react";

interface CosmicLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export const CosmicLogo: React.FC<CosmicLogoProps> = ({ size = 42, className = "", showText = false }) => {
  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      {/* Hexagonal 'C' Monogram with 3D Planet, Orbital Ring & Star Flare */}
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          position: "relative",
          flexShrink: 0
        }}
      >
        <svg
          viewBox="0 0 100 100"
          width="100%"
          height="100%"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ overflow: "visible" }}
        >
          <defs>
            {/* Planet Sphere Gradient */}
            <radialGradient id="planetBody" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="45%" stopColor="#0f172a" />
              <stop offset="85%" stopColor="#080d1b" />
              <stop offset="100%" stopColor="#04060f" />
            </radialGradient>

            {/* Atmosphere Rim Glow */}
            <radialGradient id="atmoGlow" cx="40%" cy="40%" r="55%">
              <stop offset="70%" stopColor="transparent" />
              <stop offset="92%" stopColor="rgba(56, 189, 248, 0.45)" />
              <stop offset="100%" stopColor="rgba(0, 240, 255, 0.85)" />
            </radialGradient>

            {/* Hexagon 3D Face Gradient */}
            <linearGradient id="hexFace" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="30%" stopColor="#cbd5e1" />
              <stop offset="70%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>

            {/* Hexagon Inner Bevel Accent */}
            <linearGradient id="hexBevel" x1="30" y1="15" x2="70" y2="85" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>

            {/* Neon Orbital Ring Gradient */}
            <linearGradient id="neonOrbit" x1="0" y1="50" x2="100" y2="50" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#d946ef" />
              <stop offset="35%" stopColor="#a855f7" />
              <stop offset="70%" stopColor="#00d2ff" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>

            {/* Star Flare Glow */}
            <radialGradient id="starFlare" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#7de7ff" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>

            {/* Filter for Drop Glow */}
            <filter id="cosmicGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. Nebula Particle Glow Behind Planet */}
          <circle cx="50" cy="50" r="42" fill="url(#atmoGlow)" opacity="0.6" />

          {/* 2. Planetary Sphere */}
          <circle cx="50" cy="50" r="34" fill="url(#planetBody)" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1" />
          <circle cx="50" cy="50" r="34" fill="url(#atmoGlow)" />

          {/* 3. Orbital Ring - Back Segment (depth behind C) */}
          <path
            d="M 6 52 C 6 36, 94 36, 94 52"
            stroke="url(#neonOrbit)"
            strokeWidth="3.2"
            strokeLinecap="round"
            transform="rotate(-26 50 50)"
            opacity="0.5"
            filter="url(#cosmicGlow)"
          />

          {/* 4. Hexagonal 'C' Monogram */}
          {/* 3D Drop Shadow / Extrusion */}
          <path
            d="M 66 22 L 35 22 L 18 50 L 35 78 L 66 78 L 74 65 L 50 65 L 40 50 L 50 35 L 74 35 Z"
            fill="#090e1f"
            opacity="0.9"
            transform="translate(2, 3)"
          />

          {/* Hexagonal 'C' Metallic Body */}
          <path
            d="M 65 22 L 35 22 L 18 50 L 35 78 L 65 78 L 73 65 L 48 65 L 38 50 L 48 35 L 73 35 Z"
            fill="url(#hexFace)"
            stroke="url(#hexBevel)"
            strokeWidth="1.8"
            strokeLinejoin="round"
            filter="drop-shadow(0 0 10px rgba(56, 189, 248, 0.4))"
          />

          {/* Inner Highlight Facet for 3D Chisel Effect */}
          <path
            d="M 35 22 L 48 35 L 48 65 L 35 78 L 18 50 Z"
            fill="rgba(255, 255, 255, 0.12)"
          />

          {/* 5. Orbital Ring - Front Segment (wraps over the C) */}
          <path
            d="M 94 52 C 94 68, 6 68, 6 52"
            stroke="url(#neonOrbit)"
            strokeWidth="3.8"
            strokeLinecap="round"
            transform="rotate(-26 50 50)"
            filter="url(#cosmicGlow)"
          />

          {/* 6. Diamond Star Spark Flare at the Vertex of the C */}
          <g transform="translate(68, 47)">
            <ellipse cx="0" cy="0" rx="9" ry="2" fill="url(#starFlare)" transform="rotate(45)" />
            <ellipse cx="0" cy="0" rx="9" ry="2" fill="url(#starFlare)" transform="rotate(-45)" />
            <circle cx="0" cy="0" r="2" fill="#ffffff" filter="drop-shadow(0 0 4px #7de7ff)" />
          </g>

          {/* 7. Secondary Star Flare on the Ring */}
          <g transform="translate(18, 60)">
            <ellipse cx="0" cy="0" rx="6" ry="1.5" fill="url(#starFlare)" />
            <ellipse cx="0" cy="0" rx="1.5" ry="6" fill="url(#starFlare)" />
            <circle cx="0" cy="0" r="1.5" fill="#ffffff" />
          </g>
        </svg>
      </div>

      {/* Futuristic Cyber Typography */}
      {showText && (
        <div className="flex flex-col select-none">
          {/* Top Line: C-O-S-M-I-C with Planet O */}
          <div className="flex items-center gap-1 leading-none">
            <span
              style={{
                fontFamily: "var(--cosmic-font-heading)",
                fontSize: "19px",
                fontWeight: 800,
                letterSpacing: "3px",
                color: "#ffffff",
                textShadow: "0 0 16px rgba(255, 255, 255, 0.35)"
              }}
            >
              C
            </span>
            {/* The Planet-O */}
            <div style={{ width: "16px", height: "16px", position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                <circle cx="12" cy="12" r="6" fill="#1e293b" stroke="#7de7ff" strokeWidth="1.4" />
                <ellipse cx="12" cy="12" rx="11" ry="3.5" stroke="#38bdf8" strokeWidth="1.2" transform="rotate(-25 12 12)" />
              </svg>
            </div>
            <span
              style={{
                fontFamily: "var(--cosmic-font-heading)",
                fontSize: "19px",
                fontWeight: 800,
                letterSpacing: "3px",
                color: "#ffffff",
                textShadow: "0 0 16px rgba(255, 255, 255, 0.35)"
              }}
            >
              SMIC
            </span>
            <span
              style={{
                fontFamily: "var(--cosmic-font-heading)",
                fontSize: "19px",
                fontWeight: 800,
                letterSpacing: "3px",
                marginLeft: "6px",
                background: "linear-gradient(90deg, #d946ef 0%, #a855f7 35%, #00f0ff 85%, #7de7ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 12px rgba(0, 240, 255, 0.4))"
              }}
            >
              LAYER
            </span>
          </div>

          {/* Bottom Subtitle with Cyber Circuit Lines */}
          <div className="flex items-center gap-2 mt-1">
            <span style={{ height: "1px", width: "12px", background: "linear-gradient(90deg, transparent, #38bdf8)" }} />
            <span
              style={{
                fontFamily: "var(--cosmic-font-heading)",
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "2.5px",
                color: "var(--cosmic-accent-cyan)",
                textTransform: "uppercase"
              }}
            >
              EXPLORE • CUSTOMIZE • EVOLVE
            </span>
            <span style={{ height: "1px", width: "12px", background: "linear-gradient(90deg, #38bdf8, transparent)" }} />
          </div>
        </div>
      )}
    </div>
  );
};
