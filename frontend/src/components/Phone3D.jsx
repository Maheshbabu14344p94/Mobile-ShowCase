import { useEffect, useRef, useState } from "react";
export default function Phone3D({ imageUrl, frontImageUrl, backImageUrl, colorHex, name, brand, height = 420 }) {
  const [angle, setAngle] = useState(-18);
  const [dragging, setDragging] = useState(false);
  const dragState = useRef({ startX: 0, startAngle: 0 });
  const sceneRef = useRef(null);

  // Gentle one-time hint spin so people notice it's interactive,
  // skipped entirely for reduced-motion users.
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const t1 = setTimeout(() => setAngle(18), 500);
    const t2 = setTimeout(() => setAngle(-8), 1100);
    const t3 = setTimeout(() => setAngle(0), 1600);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  function onPointerDown(e) {
    setDragging(true);
    dragState.current = { startX: e.clientX, startAngle: angle };
    sceneRef.current?.setPointerCapture?.(e.pointerId);
  }
  function onPointerMove(e) {
    if (!dragging) return;
    const dx = e.clientX - dragState.current.startX;
    setAngle(dragState.current.startAngle + dx * 0.5);
  }
  function onPointerUp() {
    setDragging(false);
  }

  return (
    <div className="select-none">
      <div
        ref={sceneRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        data-cursor="hover"
        className="mx-auto touch-none"
        style={{
          height,
          width: height * 0.76,
          perspective: "1400px",
          cursor: dragging ? "grabbing" : "grab",
        }}
      >
        <div
          className="phone-orbit relative h-full w-full"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${angle}deg)`,
            transition: dragging ? "none" : "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <div className={`phone-photo phone-photo-front ${brand === "Apple" ? "phone-photo-apple" : ""} absolute inset-0`} style={{ "--phone-color": colorHex, backfaceVisibility: "hidden" }}>
            <img src={frontImageUrl || imageUrl} alt={`${name} front ${colorHex} finish`} draggable="false" />
          </div>
          <div className={`phone-photo phone-photo-back ${brand === "Apple" ? "phone-photo-apple" : ""} absolute inset-0`} style={{ "--phone-color": colorHex, backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
            <img src={backImageUrl || imageUrl} alt={`${name} back ${colorHex} finish`} draggable="false" />
          </div>
        </div>
      </div>

      <div
        className="mx-auto -mt-4 h-6 rounded-full blur-md"
        style={{ width: height * 0.42, background: "radial-gradient(ellipse, rgba(0,0,0,0.55), transparent 70%)" }}
      />

      <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="opacity-70">
          <path d="M3 12a9 9 0 1 1 3 6.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M3 17v-5h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Drag to explore · 360° view
      </div>
    </div>
  );
}
