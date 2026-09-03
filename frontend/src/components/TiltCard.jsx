import { useRef } from "react";

/**
 * Wraps its children in a card that tilts in 3D space toward the pointer,
 * with an inner layer pushed forward on the z-axis for parallax depth,
 * and a radial glow that follows the cursor across the surface.
 */
export default function TiltCard({ children, className = "", maxTilt = 10 }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  const handleMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const rotateX = (0.5 - py) * maxTilt * 2;
    const rotateY = (px - 0.5) * maxTilt * 2;

    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;

    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(500px circle at ${px * 100}% ${py * 100}%, rgba(124,92,255,0.22), transparent 60%)`;
    }
  };

  const handleLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    if (glowRef.current) glowRef.current.style.background = "transparent";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`tilt-card relative ${className}`}
    >
      <div ref={glowRef} className="absolute inset-0 rounded-[inherit] pointer-events-none transition-[background] duration-150" />
      <div className="tilt-child relative">{children}</div>
    </div>
  );
}
