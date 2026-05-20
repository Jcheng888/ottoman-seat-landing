"use client";
// Media component — displays product/lifestyle images.
// Supports both placeholder mode (brief text on gradient background) and
// real-image mode (img with overlays when src is provided).

export function Media({ tag = "PHOTO", tone = "default", brief, dim, icon, className = "", style, src, srcSet, alt = "" }) {
  const toneClass = tone === "default" ? "" : ` media--${tone}`;
  const tagClass = tag === "VIDEO" ? "media__tag--video" : "media__tag--photo";
  const hasImage = !!src;

  return (
    <div
      className={`media${toneClass}${hasImage ? " media--has-image" : ""} ${className}`}
      style={style}
    >
      {hasImage && (
        <img
          className="media__img"
          src={src}
          srcSet={srcSet || undefined}
          alt={alt || brief || ""}
          loading="lazy"
          decoding="async"
        />
      )}
      <span className={`media__tag ${tagClass}`}>{tag}</span>
      {icon && !hasImage ? <div className="media__icon" aria-hidden="true">{icon}</div> : null}
      {!hasImage && <div className="media__brief">{brief}</div>}
      {!hasImage && dim ? <div className="media__dim">{dim}</div> : null}
      {hasImage && brief ? <div className="media__brief media__brief--overlay">{brief}</div> : null}
      {hasImage && dim ? <div className="media__dim media__dim--overlay">{dim}</div> : null}
    </div>
  );
}

// Tiny inline icons (lucide-style monoline)
export function Icon({ name, size = 16, stroke = 2 }) {
  const p = {
    width: size, height: size, viewBox: "0 0 24 24",
    fill: "none", stroke: "currentColor", strokeWidth: stroke,
    strokeLinecap: "round", strokeLinejoin: "round"
  };
  const paths = {
    arrow:   <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    check:   <polyline points="20 6 9 17 4 12"/>,
    star:    <polygon points="12 2 15 9 22 9 17 14 19 22 12 18 5 22 7 14 2 9 9 9 12 2"/>,
    whats:   <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 3.4L3 21z M9 10a3 3 0 0 0 5 2l1.5 1.5a5 5 0 0 1-7 -7L10 8a3 3 0 0 0-1 2z"/>,
    plus:    <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
  };
  return <svg {...p}>{paths[name] || paths.arrow}</svg>;
}

// 2D Seat illustration with clickable zones
export function SeatSVG({ body = "#5C3A22", piping = "#C68A5C", stitching = "#E8DCC4", onZone, activeZone }) {
  const ring = (zone) => (activeZone === zone ? "#1F1F1F" : "transparent");
  return (
    <svg viewBox="0 0 360 360" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto", display: "block" }}>
      <defs>
        <filter id="seatShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="6"/>
          <feOffset dx="0" dy="6" result="off"/>
          <feComponentTransfer><feFuncA type="linear" slope="0.25"/></feComponentTransfer>
          <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <pattern id="diamondPat" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(0)">
          <path d="M11 0 L22 11 L11 22 L0 11 Z" fill="none" stroke={stitching} strokeWidth="1.2" strokeDasharray="3 2" opacity="0.85"/>
        </pattern>
      </defs>
      <ellipse cx="180" cy="335" rx="120" ry="10" fill="#000" opacity="0.18"/>
      <g filter="url(#seatShadow)" onClick={() => onZone?.("body")} style={{ cursor: "pointer" }}>
        <rect x="125" y="38" width="110" height="58" rx="22" fill={body} stroke={piping} strokeWidth="3.5"/>
        <rect x="135" y="50" width="90" height="36" rx="14" fill="url(#diamondPat)"/>
      </g>
      <rect x="148" y="92" width="6" height="18" rx="2" fill="#1F1F1F" opacity="0.5"/>
      <rect x="206" y="92" width="6" height="18" rx="2" fill="#1F1F1F" opacity="0.5"/>
      <g filter="url(#seatShadow)" onClick={() => onZone?.("body")} style={{ cursor: "pointer" }}>
        <path d="M82 110 Q72 130 78 220 Q80 240 92 246 L110 246 L110 110 Q98 102 82 110 Z" fill={body} stroke={piping} strokeWidth="3"/>
        <path d="M278 110 Q288 130 282 220 Q280 240 268 246 L250 246 L250 110 Q262 102 278 110 Z" fill={body} stroke={piping} strokeWidth="3"/>
        <path d="M110 110 Q110 105 120 102 L240 102 Q250 105 250 110 L250 246 L110 246 Z" fill={body} stroke={piping} strokeWidth="3"/>
        <rect x="120" y="115" width="120" height="120" rx="6" fill="url(#diamondPat)"/>
      </g>
      <g filter="url(#seatShadow)" onClick={() => onZone?.("body")} style={{ cursor: "pointer" }}>
        <path d="M70 248 Q60 252 60 268 L60 296 Q60 310 78 312 L100 312 L100 248 Z" fill={body} stroke={piping} strokeWidth="3"/>
        <path d="M290 248 Q300 252 300 268 L300 296 Q300 310 282 312 L260 312 L260 248 Z" fill={body} stroke={piping} strokeWidth="3"/>
        <path d="M100 248 L260 248 L260 305 Q258 318 248 320 L112 320 Q102 318 100 305 Z" fill={body} stroke={piping} strokeWidth="3"/>
        <rect x="110" y="255" width="140" height="58" rx="6" fill="url(#diamondPat)"/>
      </g>
      <g pointerEvents="none">
        <rect x="58" y="100" width="244" height="222" rx="20" fill="none" stroke={ring("body")} strokeWidth="2" strokeDasharray="6 4" opacity="0.9"/>
        {activeZone === "piping" && (
          <g fill="none" stroke="#1F1F1F" strokeWidth="2" strokeDasharray="4 3" opacity="0.9">
            <path d="M82 110 Q72 130 78 220 Q80 240 92 246"/>
            <path d="M278 110 Q288 130 282 220 Q280 240 268 246"/>
            <path d="M70 248 Q60 252 60 268 L60 296 Q60 310 78 312"/>
            <path d="M290 248 Q300 252 300 268 L300 296 Q300 310 282 312"/>
          </g>
        )}
        {activeZone === "stitching" && (
          <g fill="none" stroke="#1F1F1F" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.95">
            <rect x="120" y="115" width="120" height="120" rx="6"/>
            <rect x="110" y="255" width="140" height="58" rx="6"/>
            <rect x="135" y="50" width="90" height="36" rx="14"/>
          </g>
        )}
      </g>
      <path d="M82 110 Q72 130 78 220 Q80 240 92 246 L70 248 Q60 252 60 268 L60 296 Q60 310 78 312 L112 320 Q102 318 100 305 L100 246 L82 246 Z M278 110 Q288 130 282 220 Q280 240 268 246 L290 248 Q300 252 300 268 L300 296 Q300 310 282 312 L248 320 Q258 318 260 305 L260 246 L278 246 Z"
        fill="transparent" pointerEvents="all" onClick={() => onZone?.("piping")} style={{ cursor: "pointer" }}/>
      <rect x="120" y="115" width="120" height="120" fill="transparent" pointerEvents="all" onClick={() => onZone?.("stitching")} style={{ cursor: "pointer" }}/>
      <rect x="110" y="255" width="140" height="58" fill="transparent" pointerEvents="all" onClick={() => onZone?.("stitching")} style={{ cursor: "pointer" }}/>
    </svg>
  );
}
