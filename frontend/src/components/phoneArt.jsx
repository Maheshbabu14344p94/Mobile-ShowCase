/**
 * Illustrated phone artwork (not real product photography — see README).
 * Each brand gets a distinct back-camera layout modeled on the real
 * device's module shape so the three products read as specific devices
 * rather than one reskinned template.
 */

function LensCluster({ layout }) {
  const ring = "rgba(255,255,255,0.16)";
  const glass = "rgba(150,180,255,0.55)";

  if (layout === "triple-diagonal") {
    // iPhone 17 Pro-style square module, three lenses on a diagonal + flash
    const lenses = [
      [27, 27, 17],
      [67, 27, 17],
      [47, 67, 17],
    ];
    return (
      <g>
        <rect x="8" y="8" width="90" height="90" rx="24" fill="rgba(0,0,0,0.42)" stroke={ring} />
        {lenses.map(([cx, cy, r], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r={r} fill="#08080c" stroke={ring} strokeWidth="1.6" />
            <circle cx={cx} cy={cy} r={r * 0.62} fill="#15151d" />
            <circle cx={cx - r * 0.22} cy={cy - r * 0.22} r={r * 0.2} fill={glass} />
          </g>
        ))}
        <circle cx="80" cy="70" r="4.5" fill="#e8e6df" opacity="0.85" />
        <circle cx="80" cy="82" r="2.4" fill="#0b0b10" />
      </g>
    );
  }

  if (layout === "quad-cluster") {
    // Galaxy Ultra-style: standalone lenses in a loose vertical arrangement, larger main sensor
    const lenses = [
      [46, 18, 15],
      [46, 52, 19],
      [46, 90, 14],
      [46, 122, 14],
    ];
    return (
      <g>
        {lenses.map(([cx, cy, r], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r={r + 4} fill="rgba(0,0,0,0.32)" />
            <circle cx={cx} cy={cy} r={r} fill="#08080c" stroke={ring} strokeWidth="1.3" />
            <circle cx={cx} cy={cy} r={r * 0.6} fill="#15151d" />
            <circle cx={cx - r * 0.22} cy={cy - r * 0.22} r={r * 0.18} fill={glass} />
          </g>
        ))}
      </g>
    );
  }

  // "triple-ringed": OnePlus-style rounded square module with a metallic
  // accent ring, two larger lenses up top and one smaller below.
  const lenses = [
    [30, 32, 19],
    [70, 32, 19],
    [30, 76, 14],
  ];
  return (
    <g>
      <rect x="6" y="6" width="96" height="96" rx="30" fill="rgba(0,0,0,0.4)" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" />
      <rect x="14" y="14" width="80" height="80" rx="24" fill="none" stroke={ring} strokeWidth="1" />
      {lenses.map(([cx, cy, r], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={r} fill="#08080c" stroke={ring} strokeWidth="1.6" />
          <circle cx={cx} cy={cy} r={r * 0.6} fill="#15151d" />
          <circle cx={cx - r * 0.22} cy={cy - r * 0.22} r={r * 0.18} fill={glass} />
        </g>
      ))}
    </g>
  );
}

export function PhoneFront({ colorHex = "#7C5CFF", uid = "a" }) {
  const gradId = `sheen-${uid}`;
  const glowId = `glow-${uid}`;

  return (
    <svg viewBox="0 0 260 520" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="35%" stopColor={colorHex} stopOpacity="1" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.6" />
        </linearGradient>
        <radialGradient id={glowId} cx="50%" cy="8%" r="75%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="20" y="10" width="220" height="500" rx="52" fill={`url(#${gradId})`} stroke="rgba(255,255,255,0.28)" strokeWidth="2" />
      <rect x="20" y="10" width="220" height="500" rx="52" fill={`url(#${glowId})`} />
      <rect x="34" y="26" width="192" height="468" rx="40" fill="#08080B" opacity="0.94" />
      <rect x="105" y="46" width="50" height="16" rx="8" fill="#1c1c22" />

      {/* lock-screen style clock, a nod to product-shot conventions */}
      <text x="130" y="130" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontFamily="'Space Grotesk', sans-serif" fontSize="34" fontWeight="600">
        9:41
      </text>

      <path d="M50 60 L92 60 L58 460 L36 460 Z" fill="#ffffff" opacity="0.04" />
      <path d="M170 60 L188 60 L150 460 L136 460 Z" fill="#ffffff" opacity="0.02" />
    </svg>
  );
}

export function PhoneBack({ colorHex = "#7C5CFF", uid = "a", layout = "triple-diagonal" }) {
  const gradId = `back-sheen-${uid}`;
  const glowId = `back-glow-${uid}`;
  const brushId = `brush-${uid}`;

  return (
    <svg viewBox="0 0 260 520" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gradId} x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.32" />
          <stop offset="40%" stopColor={colorHex} stopOpacity="1" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.65" />
        </linearGradient>
        <radialGradient id={glowId} cx="30%" cy="15%" r="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.24" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <pattern id={brushId} width="3" height="3" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="3" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        </pattern>
      </defs>

      <rect x="20" y="10" width="220" height="500" rx="52" fill={`url(#${gradId})`} stroke="rgba(255,255,255,0.22)" strokeWidth="2" />
      <rect x="20" y="10" width="220" height="500" rx="52" fill={`url(#${brushId})`} />
      <rect x="20" y="10" width="220" height="500" rx="52" fill={`url(#${glowId})`} />

      <g transform="translate(38, 34)">
        <LensCluster layout={layout} />
      </g>

      <path d="M60 300 L100 300 L70 480 L44 480 Z" fill="#ffffff" opacity="0.03" />
    </svg>
  );
}

export const CAMERA_LAYOUT_BY_BRAND = {
  Apple: "triple-diagonal",
  Samsung: "quad-cluster",
  OnePlus: "triple-ringed",
};

// Backwards-compatible default export used by the product grid cards.
export default function PhoneGlyph({ colorHex, uid }) {
  return <PhoneFront colorHex={colorHex} uid={uid} />;
}
