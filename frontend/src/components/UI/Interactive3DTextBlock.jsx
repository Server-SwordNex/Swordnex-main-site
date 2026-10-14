import React, { useRef, useCallback, useEffect } from 'react';
import './Interactive3DTextBlock.css';

/**
 * Interactive3DTextBlock
 * Displays the paragraph text cleanly without any box or border, matching the original appearance.
 * Smoothly tilts in 3D according to cursor position, and returns smoothly to its resting state on exit.
 * Highlights ONLY the single line that the cursor touches (up to 2-3 words) in blue without affecting
 * the lines above or below.
 */
export const Interactive3DTextBlock = ({
  text = 'SwordNex Technologies is a premier IT Solutions provider in Tamil Nadu, delivering Custom Software Development, SaaS products, and professional IT services to help businesses scale and dominate the digital landscape.',
  className = ''
}) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const rafRef = useRef(null);

  const motionRef = useRef({
    targetRotX: 0,
    targetRotY: 0,
    currRotX: 0,
    currRotY: 0,
    targetScale: 1.0,
    currScale: 1.0,
    targetOpacity: 0,
    currOpacity: 0,
    targetMouseX: -9999,
    targetLineY: -9999,
    currMouseX: -9999,
    currLineY: -9999,
    radiusY: 13,
    isHovered: false
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const animate = () => {
      const m = motionRef.current;
      // Responsive when hovering (0.12), silky-smooth and gentle when returning to original state (0.065)
      const ease = m.isHovered ? 0.12 : 0.065;

      m.currRotX += (m.targetRotX - m.currRotX) * ease;
      m.currRotY += (m.targetRotY - m.currRotY) * ease;
      m.currScale += (m.targetScale - m.currScale) * ease;
      m.currOpacity += (m.targetOpacity - m.currOpacity) * (m.isHovered ? 0.18 : 0.08);

      m.currMouseX += (m.targetMouseX - m.currMouseX) * 0.25;
      m.currLineY += (m.targetLineY - m.currLineY) * 0.35;

      el.style.setProperty('--mouse-x', `${m.currMouseX.toFixed(1)}px`);
      el.style.setProperty('--line-y', `${m.currLineY.toFixed(1)}px`);
      el.style.setProperty('--radius-y', `${m.radiusY.toFixed(1)}px`);
      el.style.setProperty('--light-opacity', m.currOpacity.toFixed(3));

      el.style.transform = `perspective(1000px) rotateX(${m.currRotX.toFixed(2)}deg) rotateY(${m.currRotY.toFixed(2)}deg) scale3d(${m.currScale.toFixed(3)}, ${m.currScale.toFixed(3)}, 1)`;

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handlePointerMove = useCallback((e) => {
    const el = containerRef.current;
    const textEl = textRef.current;
    if (!el || !textEl) return;

    const rect = el.getBoundingClientRect();
    const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX);
    const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY);

    if (clientX === undefined || clientY === undefined) return;

    const relX = clientX - rect.left;
    const relY = clientY - rect.top;

    // Calculate line height of paragraph to isolate the active line
    const computedStyle = window.getComputedStyle(textEl);
    const lineHeight = parseFloat(computedStyle.lineHeight) || 28;

    // Determine the exact single line currently touched by cursor
    const lineIndex = Math.max(0, Math.floor(relY / lineHeight));
    const lineCenterY = (lineIndex + 0.5) * lineHeight;
    const halfLineHeight = lineHeight * 0.44;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const normX = Math.max(-1, Math.min(1, (relX - centerX) / centerX));
    const normY = Math.max(-1, Math.min(1, (relY - centerY) / centerY));

    // Refined subtle 3D tilt (max 4.8 degrees)
    const MAX_TILT = 4.8;
    const m = motionRef.current;
    m.targetRotX = -normY * MAX_TILT;
    m.targetRotY = normX * MAX_TILT;
    m.targetMouseX = relX;
    m.targetLineY = lineCenterY;
    m.radiusY = halfLineHeight;
    m.targetScale = 1.015;
    m.targetOpacity = 1;
    m.isHovered = true;
  }, []);

  const handlePointerLeave = useCallback(() => {
    const m = motionRef.current;
    m.targetRotX = 0;
    m.targetRotY = 0;
    m.targetScale = 1.0;
    m.targetOpacity = 0;
    m.isHovered = false;
  }, []);

  return (
    <div
      ref={containerRef}
      className={`interactive-3d-text-container ${className}`}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      onTouchStart={handlePointerMove}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerLeave}
    >
      <div className="interactive-3d-text-body">
        {/* Base layer: Clean typography without box or border */}
        <p ref={textRef} className="interactive-3d-text-base">
          {text}
        </p>

        {/* Highlight overlay: Only affects the single touched line, up to 2-3 words */}
        <p className="interactive-3d-text-light" aria-hidden="true">
          {text}
        </p>
      </div>
    </div>
  );
};

export default Interactive3DTextBlock;
