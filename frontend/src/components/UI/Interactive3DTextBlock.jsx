
import React, { useRef, useCallback, useEffect } from 'react';
import './Interactive3DTextBlock.css';

/**
 * Interactive3DTextBlock
 * Displays paragraph text cleanly without box or border.
 * Smoothly tilts in 3D according to cursor position, and returns smoothly to resting state on exit.
 * Highlights ONLY the single line that the cursor touches (up to 2-3 words) in blue without affecting
 * the lines above or below. Supports single text or multiple paragraphs.
 */
export const Interactive3DTextBlock = ({
  text,
  paragraphs,
  size = 'hero', // 'hero' | 'base'
  enableTilt = true,
  className = '',
  onHoverChange,
}) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const rafRef = useRef(null);

  const defaultText =
    'SwordNex Technologies is a premier IT Solutions provider in Tamil Nadu, delivering Custom Software Development, SaaS products, and professional IT services to help businesses scale and dominate the digital landscape.';

  const items = paragraphs || (text ? [text] : [defaultText]);

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
    isHovered: false,
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

      if (enableTilt) {
        el.style.transform = `perspective(1000px) rotateX(${m.currRotX.toFixed(2)}deg) rotateY(${m.currRotY.toFixed(2)}deg) scale3d(${m.currScale.toFixed(3)}, ${m.currScale.toFixed(3)}, 1)`;
      } else {
        el.style.transform = 'none';
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [enableTilt]);

  const handlePointerMove = useCallback(
    (e) => {
      const el = containerRef.current;
      const textEl = textRef.current;
      if (!el || !textEl) return;

      const rect = el.getBoundingClientRect();
      const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX);
      const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY);

      if (clientX === undefined || clientY === undefined) return;

      const pEl = e.target.closest('p') || textEl.querySelector('p') || textEl;
      const pRect = pEl.getBoundingClientRect();
      const pRelY = clientY - pRect.top;

      const computedStyle = window.getComputedStyle(pEl);
      const lineHeight = parseFloat(computedStyle.lineHeight) || 28;

      const lineIndex = Math.max(0, Math.floor(pRelY / lineHeight));
      const pOffsetTop = pRect.top - rect.top;
      const lineCenterY = pOffsetTop + (lineIndex + 0.5) * lineHeight;
      const halfLineHeight = lineHeight * 0.44;

      const relX = clientX - rect.left;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const normX = Math.max(-1, Math.min(1, (relX - centerX) / centerX));
      const normY = Math.max(-1, Math.min(1, (clientY - rect.top - centerY) / centerY));

      const m = motionRef.current;
      if (enableTilt) {
        const MAX_TILT = 4.8;
        m.targetRotX = -normY * MAX_TILT;
        m.targetRotY = normX * MAX_TILT;
        m.targetScale = 1.015;
      } else {
        m.targetRotX = 0;
        m.targetRotY = 0;
        m.targetScale = 1.0;
      }
      m.targetMouseX = relX;
      m.targetLineY = lineCenterY;
      m.radiusY = halfLineHeight;
      m.targetOpacity = 1;

      if (!m.isHovered) {
        m.isHovered = true;
        onHoverChange?.(true);
      }
    },
    [enableTilt, onHoverChange]
  );

  const handlePointerLeave = useCallback(() => {
    const m = motionRef.current;
    m.targetRotX = 0;
    m.targetRotY = 0;
    m.targetScale = 1.0;
    m.targetOpacity = 0;
    m.isHovered = false;
    onHoverChange?.(false);
  }, [onHoverChange]);

  return (
    <div
      ref={containerRef}
      className={`interactive-3d-text-container size-${size} ${className}`}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      onTouchStart={handlePointerMove}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerLeave}
    >
      <div className="interactive-3d-text-body">
        {/* Base layer: Clean typography without box or border */}
        <div ref={textRef} className="interactive-3d-text-base space-y-3">
          {items.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* Highlight overlay: Only affects the single touched line, up to 2-3 words */}
        <div className="interactive-3d-text-light space-y-3" aria-hidden="true">
          {items.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Interactive3DTextBlock;
