import { useCallback, useRef, useState } from "react";

/**
 * Image with cursor-follow zoom on hover.
 * On desktop: hovering zooms 1.8x and follows the cursor position.
 * On touch: static image, no zoom.
 */
export default function ImageZoom({
  src,
  hoverSrc,
  alt,
  className = "aspect-[3/4] w-full object-cover",
}: {
  src: string;
  hoverSrc?: string;
  alt: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const [showHover, setShowHover] = useState(false);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
  }, []);

  const handleEnter = useCallback(() => {
    setZoomed(true);
    if (hoverSrc) setShowHover(true);
  }, [hoverSrc]);

  const handleLeave = useCallback(() => {
    setZoomed(false);
    setShowHover(false);
    setOrigin("50% 50%");
  }, []);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden cursor-zoom-in relative"
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <img
        src={showHover && hoverSrc ? hoverSrc : src}
        alt={alt}
        className={className}
        style={{
          transform: zoomed ? "scale(1.8)" : "scale(1)",
          transformOrigin: origin,
          transition: zoomed
            ? "transform 0.1s ease-out"
            : "transform 0.4s ease, opacity 0.5s ease",
        }}
        draggable={false}
      />
    </div>
  );
}
