import React, { useRef, useCallback, useEffect } from 'react';
import './MagnifyingText.css';

/**
 * MagnifyingText
 * Wraps text into words and characters that smoothly magnify and highlight with the theme color
 * as the user's cursor moves across the text, creating a subtle, attractive magnifying lens effect.
 *
 * Line-Isolated Precision:
 * - Detects lines and ensures the magnification and highlight effect is strictly applied ONLY
 *   to the specific line and characters directly under the cursor.
 * - Surrounding / adjacent lines remain completely unaffected.
 * - Words stay together with standard spaces to preserve 100% natural responsive line wraps.
 * - Zero layout shifts, no text distortion, and respects prefers-reduced-motion.
 */
export const MagnifyingText = ({
  text,
  className = '',
  horizontalRadius = 52,
  maxScale = 1.13,
  maxLift = 1.0,
}) => {
  const containerRef = useRef(null);
  const charRefs = useRef([]);
  const charDataRef = useRef([]);
  const linesRef = useRef([]);
  const rafIdRef = useRef(null);

  // Split into words, preserving spaces
  const words = React.useMemo(() => {
    if (!text) return [];
    return text.split(' ');
  }, [text]);

  // Reset char refs when text changes
  charRefs.current = [];

  const updateBounds = useCallback(() => {
    if (!containerRef.current) return;

    // 1. Measure all character elements
    const items = charRefs.current
      .map((el) => {
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return {
          el,
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          top: rect.top,
          bottom: rect.bottom,
          height: rect.height,
          lineIndex: 0,
          isActive: false,
        };
      })
      .filter(Boolean);

    if (items.length === 0) {
      charDataRef.current = [];
      linesRef.current = [];
      return;
    }

    // 2. Accurately group characters into distinct visual lines
    const lines = [];
    items.forEach((item) => {
      // Find if this item belongs to an existing line (within 8px vertical center tolerance)
      let foundLine = lines.find(
        (line) =>
          Math.abs(line.centerY - item.y) < 8 ||
          (item.top < line.bottom && item.bottom > line.top)
      );

      if (!foundLine) {
        foundLine = {
          top: item.top,
          bottom: item.bottom,
          centerY: item.y,
          index: lines.length,
        };
        lines.push(foundLine);
      } else {
        foundLine.top = Math.min(foundLine.top, item.top);
        foundLine.bottom = Math.max(foundLine.bottom, item.bottom);
        foundLine.centerY = (foundLine.top + foundLine.bottom) / 2;
      }

      item.lineIndex = foundLine.index;
    });

    linesRef.current = lines;
    charDataRef.current = items;
  }, []);

  // Invalidate bounds on window resize or scroll
  useEffect(() => {
    const handleRecalculate = () => {
      charDataRef.current = [];
      linesRef.current = [];
    };

    window.addEventListener('resize', handleRecalculate, { passive: true });
    window.addEventListener('scroll', handleRecalculate, { passive: true });

    return () => {
      window.removeEventListener('resize', handleRecalculate);
      window.removeEventListener('scroll', handleRecalculate);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  const handlePointerEnter = useCallback(() => {
    updateBounds();
  }, [updateBounds]);

  const handlePointerMove = useCallback(
    (e) => {
      // Check prefers-reduced-motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      if (!charDataRef.current || charDataRef.current.length === 0) {
        updateBounds();
      }

      const lines = linesRef.current;
      const items = charDataRef.current;
      if (!items || items.length === 0 || !lines || lines.length === 0) return;

      // Identify the single line directly under the cursor (with tight vertical tolerance)
      const activeLine = lines.find(
        (line) => mouseY >= line.top - 4 && mouseY <= line.bottom + 4
      );

      const activeLineIndex = activeLine ? activeLine.index : -1;

      // Position the subtle lens aura strictly on the active line
      if (containerRef.current) {
        if (activeLine) {
          const containerRect = containerRef.current.getBoundingClientRect();
          containerRef.current.style.setProperty(
            '--lens-x',
            `${(mouseX - containerRect.left).toFixed(1)}px`
          );
          containerRef.current.style.setProperty(
            '--lens-y',
            `${(activeLine.centerY - containerRect.top).toFixed(1)}px`
          );
          containerRef.current.style.setProperty('--lens-opacity', '1');
        } else {
          containerRef.current.style.setProperty('--lens-opacity', '0');
        }
      }

      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        const Rx = horizontalRadius;
        const len = items.length;

        for (let i = 0; i < len; i++) {
          const item = items[i];

          // STRICT ISOLATION: Only characters on the active line can be magnified
          if (activeLineIndex !== -1 && item.lineIndex === activeLineIndex) {
            const dx = Math.abs(mouseX - item.x);
            const dy = Math.abs(mouseY - item.y);

            // Within horizontal radius on the hovered line
            if (dx < Rx && dy < item.height * 0.95) {
              const ratio = 1 - dx / Rx;
              // Smooth cosine bell-curve for natural magnification
              const weight = (1 - Math.cos(ratio * Math.PI)) / 2;
              const scale = 1 + weight * (maxScale - 1);
              const lift = -weight * maxLift;

              item.el.style.transform = `translate3d(0, ${lift.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;
              item.el.style.setProperty('--zoom-weight', weight.toFixed(3));
              if (!item.isActive) {
                item.el.classList.add('is-magnified');
                item.isActive = true;
              }
              continue;
            }
          }

          // Any character not on the active line or outside the horizontal radius is reset
          if (item.isActive) {
            item.el.style.transform = '';
            item.el.style.setProperty('--zoom-weight', '0');
            item.el.classList.remove('is-magnified');
            item.isActive = false;
          }
        }
      });
    },
    [horizontalRadius, maxScale, maxLift, updateBounds]
  );

  const handlePointerLeave = useCallback(() => {
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);

    if (containerRef.current) {
      containerRef.current.style.setProperty('--lens-opacity', '0');
    }

    const items = charDataRef.current;
    if (items) {
      const len = items.length;
      for (let i = 0; i < len; i++) {
        const item = items[i];
        if (item && item.isActive) {
          item.el.style.transform = '';
          item.el.style.setProperty('--zoom-weight', '0');
          item.el.classList.remove('is-magnified');
          item.isActive = false;
        }
      }
    }
  }, []);

  if (!text) return null;

  return (
    <span
      ref={containerRef}
      className={`hero-magnify-container ${className}`}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Subtle line-confined radial lens glow behind text */}
      <span className="hero-magnify-lens" aria-hidden="true" />

      <span className="hero-magnify-content">
        {words.map((word, wordIndex) => (
          <React.Fragment key={wordIndex}>
            <span className="hero-magnify-word">
              {word.split('').map((char, charIndex) => (
                <span
                  key={charIndex}
                  ref={(el) => {
                    if (el) charRefs.current.push(el);
                  }}
                  className="hero-magnify-char"
                >
                  {char}
                </span>
              ))}
            </span>
            {wordIndex < words.length - 1 && ' '}
          </React.Fragment>
        ))}
      </span>
    </span>
  );
};

export default MagnifyingText;
