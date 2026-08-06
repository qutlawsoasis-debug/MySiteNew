import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor({ theme = 'dark', currentSection = 0, totalSections = 7 }) {
  const cursorRef = useRef(null);
  const posRef = useRef({ x: -100, y: -100, targetX: -100, targetY: -100 });
  const [side, setSide] = useState('right');
  const [clickRipple, setClickRipple] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);

  const canScrollRight = currentSection < totalSections - 1;
  const canScrollLeft = currentSection > 0;

  const showRightArrow = side === 'right' && canScrollRight;
  const showLeftArrow = side === 'left' && canScrollLeft;
  const isArrow = showRightArrow || showLeftArrow;

  useEffect(() => {
    let animationFrameId;

    const handleMouseMove = (e) => {
      posRef.current.targetX = e.clientX;
      posRef.current.targetY = e.clientY;

      const isRight = e.clientX >= window.innerWidth * 0.5;
      setSide(isRight ? 'right' : 'left');

      const target = e.target;
      const isInteractive = Boolean(
        target && target.closest('button, a, input, pre, code, [role="button"]')
      );
      setIsHoveringInteractive(isInteractive);
    };

    const handleMouseDown = () => {
      setClickRipple(true);
      setTimeout(() => setClickRipple(false), 400);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);

    // Snappy high-responsiveness lerp loop (0.85 factor for crisp tight tracking)
    const loop = () => {
      const pos = posRef.current;
      pos.x += (pos.targetX - pos.x) * 0.85;
      pos.y += (pos.targetY - pos.y) * 0.85;

      if (cursorRef.current) {
        const scale = isHoveringInteractive ? 0.5 : 1;
        cursorRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHoveringInteractive]);

  // Unified accent color & glow
  const accentColorClass =
    theme === 'light'
      ? 'text-[#5B43EC] fill-[#5B43EC] stroke-[#5B43EC] drop-shadow-[0_0_8px_rgba(91,67,236,0.65)]'
      : 'text-[#6D58F0] fill-[#6D58F0] stroke-[#6D58F0] drop-shadow-[0_0_12px_rgba(109,88,240,0.9)]';

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-50 transition-opacity duration-300 ${
        isHoveringInteractive ? 'opacity-30' : 'opacity-100'
      }`}
    >
      <div className="relative flex items-center justify-center w-10 h-10">
        {/* Click Shockwave Ripple Ring */}
        {clickRipple && (
          <div
            className={`absolute w-9 h-9 rounded-full border border-current animate-ping opacity-60 ${accentColorClass}`}
          />
        )}

        <svg
          className={`w-9 h-9 overflow-visible ${accentColorClass}`}
          viewBox="0 0 24 24"
          fill="none"
        >
          {/* Central Dot */}
          <circle
            cx="12"
            cy="12"
            r="3.5"
            className={`transition-all duration-300 ease-out origin-center ${
              !isArrow ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            }`}
          />

          {/* Pure Chevron Right > */}
          <path
            d="M 8 5 L 18 12 L 8 19 L 11 12 Z"
            fill="currentColor"
            stroke="none"
            className={`transition-all duration-300 ease-out origin-center ${
              showRightArrow ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            }`}
          />

          {/* Pure Chevron Left < */}
          <path
            d="M 16 5 L 6 12 L 16 19 L 13 12 Z"
            fill="currentColor"
            stroke="none"
            className={`transition-all duration-300 ease-out origin-center ${
              showLeftArrow ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            }`}
          />
        </svg>
      </div>
    </div>
  );
}
