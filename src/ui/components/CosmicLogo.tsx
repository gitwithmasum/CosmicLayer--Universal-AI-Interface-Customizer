import React from "react";

interface CosmicLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export const CosmicLogo: React.FC<CosmicLogoProps> = ({ size = 42, className = "", showText = false }) => {
  const fontSize = Math.max(16, Math.round(size * 0.48));
  const planetSize = Math.max(16, Math.round(fontSize * 0.96));

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "nowrap",
        whiteSpace: "nowrap",
        gap: "10px",
        lineHeight: 1
      }}
      className={className}
    >
      {/* Hexagonal 'C' Monogram with 3D Planet, Orbital Ring & Diamond Star Lens Flares */}
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
            {/* Planet Sphere Gradient — Deep Oceanic Teal / Space Void */}
            <radialGradient id="planetBody" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#0c7075" />
              <stop offset="45%" stopColor="#072e33" />
              <stop offset="85%" stopColor="#05161a" />
              <stop offset="100%" stopColor="#020a0c" />
            </radialGradient>

            {/* Atmosphere Rim Glow — Electric Cyan / Ice Blue */}
            <radialGradient id="atmoGlow" cx="40%" cy="40%" r="55%">
              <stop offset="70%" stopColor="transparent" />
              <stop offset="92%" stopColor="rgba(15, 150, 156, 0.45)" />
              <stop offset="100%" stopColor="rgba(0, 240, 255, 0.85)" />
            </radialGradient>

            {/* Hexagon 3D Face Gradient — Clean Silver/Ice */}
            <linearGradient id="hexFace" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f0fdfa" />
              <stop offset="35%" stopColor="#cbd5e1" />
              <stop offset="70%" stopColor="#6da5c0" />
              <stop offset="100%" stopColor="#294d61" />
            </linearGradient>

            {/* Hexagon Inner Bevel Accent — Cyan Teal to Ice */}
            <linearGradient id="hexBevel" x1="30" y1="15" x2="70" y2="85" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00f0ff" />
              <stop offset="50%" stopColor="#0f969c" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>

            {/* Neon Orbital Ring Gradient — Violet to Cyan */}
            <linearGradient id="neonOrbit" x1="0" y1="50" x2="100" y2="50" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#d946ef" />
              <stop offset="35%" stopColor="#a855f7" />
              <stop offset="70%" stopColor="#00f0ff" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>

            {/* Diamond Star Lens Flare Gradients & Halos */}
            <radialGradient id="lensHalo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="30%" stopColor="#00f0ff" stopOpacity="0.6" />
              <stop offset="65%" stopColor="#a855f7" stopOpacity="0.25" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="flareSpikeV" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="38%" stopColor="#00f0ff" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="62%" stopColor="#00f0ff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>

            <linearGradient id="flareSpikeH" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="38%" stopColor="#00f0ff" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="62%" stopColor="#00f0ff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>

            <linearGradient id="flareStreak" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="25%" stopColor="#a855f7" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#00f0ff" stopOpacity="0.95" />
              <stop offset="75%" stopColor="#a855f7" stopOpacity="0.5" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>

            {/* Filter for Drop Glow */}
            <filter id="cosmicGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. Atmosphere Glow Behind Planet */}
          <circle cx="50" cy="50" r="42" fill="url(#atmoGlow)" opacity="0.6" />

          {/* 2. Planetary Sphere */}
          <circle cx="50" cy="50" r="34" fill="url(#planetBody)" stroke="rgba(0, 240, 255, 0.3)" strokeWidth="1" />
          <circle cx="50" cy="50" r="34" fill="url(#atmoGlow)" />

          {/* 3. Orbital Ring - Back Segment (depth behind C) */}
          <path
            d="M 6 52 C 6 36, 94 36, 94 52"
            stroke="url(#neonOrbit)"
            strokeWidth="3.2"
            strokeLinecap="round"
            transform="rotate(-26 50 50)"
            opacity="0.55"
            filter="url(#cosmicGlow)"
          />

          {/* 4. Hexagonal 'C' Monogram */}
          {/* 3D Drop Shadow / Extrusion */}
          <path
            d="M 66 22 L 35 22 L 18 50 L 35 78 L 66 78 L 74 65 L 50 65 L 40 50 L 50 35 L 74 35 Z"
            fill="#020a0c"
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
            filter="drop-shadow(0 0 10px rgba(0, 240, 255, 0.45))"
          />

          {/* Inner Highlight Facet for 3D Chisel Effect */}
          <path
            d="M 35 22 L 48 35 L 48 65 L 35 78 L 18 50 Z"
            fill="rgba(255, 255, 255, 0.15)"
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

          {/* 6. Diamond Star Lens Flare at "C"-এর ভেতরের কোণা (Inner Vertex at 38, 50) */}
          <g transform="translate(39, 50)">
            <circle cx="0" cy="0" r="11" fill="url(#lensHalo)" />
            <ellipse cx="0" cy="0" rx="18" ry="1.2" fill="url(#flareStreak)" />
            <path
              d="M 0 -14 Q 0.6 -3.5 1.6 0 Q 0.6 3.5 0 14 Q -0.6 3.5 -1.6 0 Q -0.6 -3.5 0 -14 Z"
              fill="url(#flareSpikeV)"
            />
            <path
              d="M -14 0 Q -3.5 0.6 0 1.6 Q 3.5 0.6 14 0 Q 3.5 -0.6 0 -1.6 Q -3.5 -0.6 -14 0 Z"
              fill="url(#flareSpikeH)"
            />
            <g transform="rotate(45)">
              <path
                d="M 0 -9 Q 0.5 -2.2 1.1 0 Q 0.5 2.2 0 9 Q -0.5 2.2 -1.1 0 Q -0.5 -2.2 0 -9 Z"
                fill="url(#flareSpikeV)"
                opacity="0.85"
              />
              <path
                d="M -9 0 Q -2.2 0.5 0 1.1 Q 2.2 0.5 9 0 Q 2.2 -0.5 0 -1.1 Q -2.2 -0.5 -9 0 Z"
                fill="url(#flareSpikeH)"
                opacity="0.85"
              />
            </g>
            <circle cx="0" cy="0" r="2" fill="#ffffff" filter="drop-shadow(0 0 3px #ffffff) drop-shadow(0 0 6px #00f0ff)" />
          </g>

          {/* 7. Diamond Star Lens Flare on the Orbital Ring (Foreground at 20, 62) */}
          <g transform="translate(20, 62) scale(0.85)">
            <circle cx="0" cy="0" r="9" fill="url(#lensHalo)" />
            <ellipse cx="0" cy="0" rx="15" ry="1" fill="url(#flareStreak)" transform="rotate(-26)" />
            <path
              d="M 0 -12 Q 0.5 -3 1.4 0 Q 0.5 3 0 12 Q -0.5 3 -1.4 0 Q -0.5 -3 0 -12 Z"
              fill="url(#flareSpikeV)"
            />
            <path
              d="M -12 0 Q -3 0.5 0 1.4 Q 3 0.5 12 0 Q 3 -0.5 0 -1.4 Q -3 -0.5 -12 0 Z"
              fill="url(#flareSpikeH)"
            />
            <g transform="rotate(45)">
              <path
                d="M 0 -7.5 Q 0.4 -2 0.9 0 Q 0.4 2 0 7.5 Q -0.4 2 -0.9 0 Q -0.4 -2 0 -7.5 Z"
                fill="url(#flareSpikeV)"
                opacity="0.8"
              />
              <path
                d="M -7.5 0 Q -2 0.4 0 0.9 Q 2 0.4 7.5 0 Q 2 -0.4 0 -0.9 Q -2 -0.4 -7.5 0 Z"
                fill="url(#flareSpikeH)"
                opacity="0.8"
              />
            </g>
            <circle cx="0" cy="0" r="1.6" fill="#ffffff" filter="drop-shadow(0 0 3px #ffffff) drop-shadow(0 0 5px #00f0ff)" />
          </g>

          {/* 8. Subtle Diamond Sparkle at Outer Vertex (71, 35) */}
          <g transform="translate(71, 35) scale(0.55)">
            <ellipse cx="0" cy="0" rx="10" ry="1.2" fill="url(#flareStreak)" />
            <path d="M 0 -8 Q 0.5 -2 1 0 Q 0.5 2 0 8 Q -0.5 2 -1 0 Q -0.5 -2 0 -8 Z" fill="url(#flareSpikeV)" />
            <path d="M -8 0 Q -2 0.5 0 1 Q 2 0.5 8 0 Q 2 -0.5 0 -1 Q -2 -0.5 -8 0 Z" fill="url(#flareSpikeH)" />
            <circle cx="0" cy="0" r="1.4" fill="#ffffff" filter="drop-shadow(0 0 3px #00f0ff)" />
          </g>
        </svg>
      </div>

      {/* Futuristic Typography: C🪐SMIC  LAYER */}
      {showText && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            flexDirection: "row",
            flexWrap: "nowrap",
            whiteSpace: "nowrap",
            gap: "0px",
            userSelect: "none",
            lineHeight: 1
          }}
        >
          {/* C */}
          <span
            style={{
              fontFamily: "var(--cosmic-font-heading)",
              fontSize: `${fontSize}px`,
              fontWeight: 800,
              letterSpacing: "0.2px",
              color: "#ffffff",
              textShadow: "0 0 12px rgba(255, 255, 255, 0.45)"
            }}
          >
            C
          </span>

          {/* 'O' as a Mini 3D Planet with Orbital Ring */}
          <div
            style={{
              width: `${planetSize}px`,
              height: `${planetSize}px`,
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 1.5px",
              flexShrink: 0
            }}
          >
            <svg
              viewBox="0 0 32 32"
              width="100%"
              height="100%"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ overflow: "visible" }}
            >
              <defs>
                {/* Mini Planet Body Gradient */}
                <radialGradient id="miniPlanetGrad" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#7de7ff" />
                  <stop offset="40%" stopColor="#00f0ff" />
                  <stop offset="75%" stopColor="#072e33" />
                  <stop offset="100%" stopColor="#05161a" />
                </radialGradient>

                {/* Mini Atmosphere Rim Glow */}
                <radialGradient id="miniAtmoGlow" cx="40%" cy="40%" r="55%">
                  <stop offset="65%" stopColor="transparent" />
                  <stop offset="85%" stopColor="rgba(0, 240, 255, 0.5)" />
                  <stop offset="100%" stopColor="rgba(0, 240, 255, 0.95)" />
                </radialGradient>

                {/* Mini Orbital Ring Gradient */}
                <linearGradient id="miniRingGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#d946ef" />
                  <stop offset="35%" stopColor="#a855f7" />
                  <stop offset="70%" stopColor="#00f0ff" />
                  <stop offset="100%" stopColor="#7de7ff" />
                </linearGradient>
              </defs>

              {/* Back Segment of Mini Orbital Ring */}
              <path
                d="M 3 16 C 3 9.5, 29 9.5, 29 16"
                stroke="url(#miniRingGrad)"
                strokeWidth="1.8"
                strokeLinecap="round"
                transform="rotate(-22 16 16)"
                opacity="0.6"
              />

              {/* Mini Planetary Sphere */}
              <circle
                cx="16"
                cy="16"
                r="6.8"
                fill="url(#miniPlanetGrad)"
                stroke="rgba(0, 240, 255, 0.45)"
                strokeWidth="0.8"
              />
              <circle cx="16" cy="16" r="6.8" fill="url(#miniAtmoGlow)" />

              {/* Front Segment of Mini Orbital Ring */}
              <path
                d="M 29 16 C 29 22.5, 3 22.5, 3 16"
                stroke="url(#miniRingGrad)"
                strokeWidth="2.4"
                strokeLinecap="round"
                transform="rotate(-22 16 16)"
              />

              {/* Micro Diamond Sparkle on Ring */}
              <g transform="translate(26, 12)">
                <ellipse cx="0" cy="0" rx="3" ry="0.7" fill="#ffffff" transform="rotate(-22)" />
                <ellipse cx="0" cy="0" rx="0.7" ry="3" fill="#ffffff" transform="rotate(-22)" />
                <circle cx="0" cy="0" r="1" fill="#ffffff" filter="drop-shadow(0 0 2px #00f0ff)" />
              </g>
            </svg>
          </div>

          {/* SMIC */}
          <span
            style={{
              fontFamily: "var(--cosmic-font-heading)",
              fontSize: `${fontSize}px`,
              fontWeight: 800,
              letterSpacing: "0.8px",
              color: "#ffffff",
              textShadow: "0 0 12px rgba(255, 255, 255, 0.45)"
            }}
          >
            SMIC
          </span>

          {/* LAYER: Neon Violet to Cyan Radiant Gradient */}
          <span
            style={{
              fontFamily: "var(--cosmic-font-heading)",
              fontSize: `${fontSize}px`,
              fontWeight: 800,
              letterSpacing: "1.2px",
              marginLeft: "7px",
              background: "linear-gradient(90deg, #d946ef 0%, #a855f7 35%, #00f0ff 85%, #7de7ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 10px rgba(0, 240, 255, 0.5)) drop-shadow(0 0 18px rgba(168, 85, 247, 0.35))"
            }}
          >
            LAYER
          </span>
        </div>
      )}
    </div>
  );
};
