import React from "react";

interface CosmicLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export const CosmicLogo: React.FC<CosmicLogoProps> = ({ size = 42, className = "", showText = false }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
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
            {/* Planet Sphere Gradient — Deep Oceanic Teal */}
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
              <stop offset="100%" stopColor="rgba(109, 165, 192, 0.85)" />
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
              <stop offset="0%" stopColor="#0f969c" />
              <stop offset="60%" stopColor="#0c7075" />
              <stop offset="100%" stopColor="#6da5c0" />
            </linearGradient>

            {/* Neon Orbital Ring Gradient — #0C7075 -> #0F969C -> #6DA5C0 */}
            <linearGradient id="neonOrbit" x1="0" y1="50" x2="100" y2="50" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0c7075" />
              <stop offset="45%" stopColor="#0f969c" />
              <stop offset="85%" stopColor="#6da5c0" />
              <stop offset="100%" stopColor="#0f969c" />
            </linearGradient>

            {/* Star Flare Glow */}
            <radialGradient id="starFlare" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#6da5c0" />
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

          {/* 1. Atmosphere Glow Behind Planet */}
          <circle cx="50" cy="50" r="42" fill="url(#atmoGlow)" opacity="0.65" />

          {/* 2. Planetary Sphere */}
          <circle cx="50" cy="50" r="34" fill="url(#planetBody)" stroke="rgba(109, 165, 192, 0.3)" strokeWidth="1" />
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
            fill="#020a0c"
            opacity="0.9"
            transform="translate(2, 3)"
          />

          {/* Hexagonal 'C' Body */}
          <path
            d="M 65 22 L 35 22 L 18 50 L 35 78 L 65 78 L 73 65 L 48 65 L 38 50 L 48 35 L 73 35 Z"
            fill="url(#hexFace)"
            stroke="url(#hexBevel)"
            strokeWidth="1.8"
            strokeLinejoin="round"
            filter="drop-shadow(0 0 10px rgba(15, 150, 156, 0.45))"
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

          {/* 6. Diamond Star Spark Flare at the Vertex of the C */}
          <g transform="translate(68, 47)">
            <ellipse cx="0" cy="0" rx="9" ry="2" fill="url(#starFlare)" transform="rotate(45)" />
            <ellipse cx="0" cy="0" rx="9" ry="2" fill="url(#starFlare)" transform="rotate(-45)" />
            <circle cx="0" cy="0" r="2" fill="#ffffff" filter="drop-shadow(0 0 4px #0f969c)" />
          </g>

          {/* 7. Secondary Star Flare on the Ring */}
          <g transform="translate(18, 60)">
            <ellipse cx="0" cy="0" rx="6" ry="1.5" fill="url(#starFlare)" />
            <ellipse cx="0" cy="0" rx="1.5" ry="6" fill="url(#starFlare)" />
            <circle cx="0" cy="0" r="1.5" fill="#ffffff" />
          </g>
        </svg>
      </div>

      {/* Minimalist Space-Tech Typography */}
      {showText && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "2px",
            userSelect: "none",
            lineHeight: 1
          }}
        >
          <span
            style={{
              fontFamily: "var(--cosmic-font-heading)",
              fontSize: `${Math.max(15, Math.round(size * 0.46))}px`,
              fontWeight: 700,
              letterSpacing: "0.3px",
              color: "#f0fdfa"
            }}
          >
            Cosmic
          </span>
          <span
            style={{
              fontFamily: "var(--cosmic-font-heading)",
              fontSize: `${Math.max(15, Math.round(size * 0.46))}px`,
              fontWeight: 700,
              letterSpacing: "0.3px",
              background: "linear-gradient(135deg, #0f969c 0%, #6da5c0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Layer
          </span>
        </div>
      )}
    </div>
  );
};
