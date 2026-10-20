import React, { useRef, useCallback, useEffect, useState } from 'react';
import './Interactive3DCard.css';

/**
 * Interactive3DCard
 * 1. Highly visible, pronounced 3D tilt tracking cursor position (up to 16 deg).
 * 2. Scales slightly bigger when hovered (scale: 1.05, translateZ: 24px).
 * 3. Smoothly returns to flat resting state on pointer leave.
 * 4. Border is intensely highlighted and blinks slowly:
 *    - 'blue' for blue border and glowing ambient aura
 *    - 'purple' for purple border and glowing ambient aura
 *    - 'red' for red border and glowing ambient aura
 *    - 'green' for green border and glowing ambient aura
 *    - 'yellow' for yellow border and glowing ambient aura
 */
export const Interactive3DCard = ({
  theme = 'blue', // 'blue' | 'purple' | 'red' | 'green' | 'yellow'
  tilt = true,
  className = '',
  onHoverChange,
  children,
  ...rest
}) => {
  const outerRef = useRef(null);
  const innerCardRef = useRef(null);
  const rafRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const motionRef = useRef({
    targetRotX: 0,
    targetRotY: 0,
    currRotX: 0,
    currRotY: 0,
    targetScale: 1.0,
    currScale: 1.0,
    targetZ: 0,
    currZ: 0,
    targetMouseX: 0,
    targetMouseY: 0,
    currMouseX: 0,
    currMouseY: 0,
    isHovered: false,
  });

  useEffect(() => {
    const inner = innerCardRef.current;
    if (!inner) return;

    const animate = () => {
      const m = motionRef.current;
      // High responsiveness on hover (0.14), smooth gentle return on leave (0.08)
      const ease = m.isHovered ? 0.14 : 0.08;

      m.currRotX += (m.targetRotX - m.currRotX) * ease;
      m.currRotY += (m.targetRotY - m.currRotY) * ease;
      m.currScale += (m.targetScale - m.currScale) * ease;
      m.currZ += (m.targetZ - m.currZ) * ease;

      m.currMouseX += (m.targetMouseX - m.currMouseX) * 0.2;
      m.currMouseY += (m.targetMouseY - m.currMouseY) * 0.2;

      inner.style.setProperty('--card-mouse-x', `${m.currMouseX.toFixed(1)}px`);
      inner.style.setProperty('--card-mouse-y', `${m.currMouseY.toFixed(1)}px`);

      inner.style.transform = `perspective(850px) rotateX(${m.currRotX.toFixed(2)}deg) rotateY(${m.currRotY.toFixed(2)}deg) translateZ(${m.currZ.toFixed(1)}px) scale3d(${m.currScale.toFixed(3)}, ${m.currScale.toFixed(3)}, 1)`;

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handlePointerMove = useCallback((e) => {
    const outer = outerRef.current;
    if (!outer) return;

    const rect = outer.getBoundingClientRect();
    const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX);
    const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY);
    if (clientX === undefined || clientY === undefined) return;

    const relX = clientX - rect.left;
    const relY = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const normX = Math.max(-1, Math.min(1, (relX - centerX) / centerX));
    const normY = Math.max(-1, Math.min(1, (relY - centerY) / centerY));

    // Refined tilt (reduced by 20% from 16 to 12.8 degrees)
    const MAX_TILT = 12.8;
    const m = motionRef.current;
    m.targetRotX = tilt ? -normY * MAX_TILT : 0;
    m.targetRotY = tilt ? normX * MAX_TILT : 0;
    m.targetScale = 1.038;
    m.targetZ = 19;
    m.targetMouseX = relX;
    m.targetMouseY = relY;
    if (!m.isHovered) {
      m.isHovered = true;
      setIsHovered(true);
      onHoverChange?.(true);
    }
  }, [onHoverChange, tilt]);

  const handlePointerLeave = useCallback(() => {
    const m = motionRef.current;
    m.targetRotX = 0;
    m.targetRotY = 0;
    m.targetScale = 1.0;
    m.targetZ = 0;
    m.isHovered = false;
    setIsHovered(false);
    onHoverChange?.(false);
  }, [onHoverChange]);

  return (
    <div
      ref={outerRef}
      className={`interactive-3d-card-wrapper h-full w-full relative ${isHovered ? 'z-30' : 'z-[1]'}`}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      onTouchStart={handlePointerMove}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerLeave}
    >
      <div
        ref={innerCardRef}
        className={`interactive-3d-card theme-${theme} ${isHovered ? 'is-hovered' : ''} ${className}`}
        style={{ willChange: 'transform' }}
        {...rest}
      >
        {/* Dynamic cursor-following radial light */}
        <div className="interactive-3d-card-glow" aria-hidden="true" />
        {children}
      </div>
    </div>
  );
};

export default Interactive3DCard;
