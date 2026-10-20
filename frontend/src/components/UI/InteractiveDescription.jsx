import React, { useRef, useCallback, useEffect, useState, useMemo } from 'react';
import './InteractiveDescription.css';

/**
 * InteractiveDescription
 * 
 * Tailored interactive text experience for section descriptions:
 * - Desktop: Smooth cursor-responsive highlight effect that follows the mouse.
 *            Zero text distortion, zero scaling, zero layout shifts.
 *            Line-isolated proximity so only text near the cursor illuminates with the theme color.
 * - Mobile:  Viewport scroll-triggered reveal & highlight wave that animates across the text
 *            as it enters view, and automatically replays when scrolling away and returning.
 * - Responsive & Accessible: Preserves exact typography, colors, and line-wrapping.
 *                            Respects prefers-reduced-motion.
 */
export const InteractiveDescription = ({
  text,
  className = '',
}) => {
  const containerRef = useRef(null);
  const charRefs = useRef([]);
  const charDataRef = useRef([]);
  const linesRef = useRef([]);
  const rafIdRef = useRef(null);

  // Replay key to force re-render mobile animation when scrolling away and returning
  const [replayKey, setReplayKey] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect touch capability
  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        window.matchMedia('(hover: none) and (pointer: coarse)').matches ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0
      );
    };
    checkTouch();
    window.addEventListener('resize', checkTouch, { passive: true });
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  // Split into words and characters, keeping proper spaces
  const words = useMemo(() => {
    if (!text) return [];
    return text.split(' ');
  }, [text]);

  charRefs.current = [];

  // Viewport scroll observer for mobile reveal & replay
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          // Increment replayKey so animations re-trigger from 0% on every scroll return
          setReplayKey((prev) => prev + 1);
        } else {
          setIsIntersecting(false);
        }
      },
      {
        threshold: 0.25,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Measure character positions for desktop cursor tracking
  const updateBounds = useCallback(() => {
    if (!containerRef.current) return;

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

    // Group into visual lines
    const lines = [];
    items.forEach((item) => {
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
    if (isTouchDevice) return;
    updateBounds();
  }, [isTouchDevice, updateBounds]);

  const handlePointerMove = useCallback(
    (e) => {
      if (isTouchDevice) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      if (!charDataRef.current || charDataRef.current.length === 0) {
        updateBounds();
      }

      const lines = linesRef.current;
      const items = charDataRef.current;
      if (!items || items.length === 0 || !lines || lines.length === 0) return;

      // Identify active line under cursor
      const activeLine = lines.find(
        (line) => mouseY >= line.top - 6 && mouseY <= line.bottom + 6
      );
      const activeLineIndex = activeLine ? activeLine.index : -1;

      // Position subtle lens aura strictly on the active line
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
        const Rx = 60; // horizontal radius
        const len = items.length;

        for (let i = 0; i < len; i++) {
          const item = items[i];

          // STRICT LINE ISOLATION: Only highlight characters on hovered line
          if (activeLineIndex !== -1 && item.lineIndex === activeLineIndex) {
            const dx = Math.abs(mouseX - item.x);
            const dy = Math.abs(mouseY - item.y);

            if (dx < Rx && dy < item.height * 0.95) {
              const ratio = 1 - dx / Rx;
              const weight = (1 - Math.cos(ratio * Math.PI)) / 2;
              const maxScale = 1.14;
              const maxLift = 1.2;
              const scale = 1 + weight * (maxScale - 1);
              const lift = -weight * maxLift;

              item.el.style.transform = `translate3d(0, ${lift.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;
              item.el.style.setProperty('--hl-weight', weight.toFixed(3));
              if (!item.isActive) {
                item.el.classList.add('is-cursor-highlighted');
                item.isActive = true;
              }
              continue;
            }
          }

          if (item.isActive) {
            item.el.style.transform = '';
            item.el.style.setProperty('--hl-weight', '0');
            item.el.classList.remove('is-cursor-highlighted');
            item.isActive = false;
          }
        }
      });
    },
    [isTouchDevice, updateBounds]
  );

  const handlePointerLeave = useCallback(() => {
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);

    if (containerRef.current) {
      containerRef.current.style.setProperty('--lens-opacity', '0');
    }

    const items = charDataRef.current;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item && item.isActive) {
          item.el.style.transform = '';
          item.el.style.setProperty('--hl-weight', '0');
          item.el.classList.remove('is-cursor-highlighted');
          item.isActive = false;
        }
      }
    }
  }, []);

  if (!text) return null;

  return (
    <span
      ref={containerRef}
      className={`interactive-desc-container ${className} ${
        isIntersecting ? 'is-in-view' : ''
      }`}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Subtle aura behind text that tracks cursor on desktop */}
      <span className="interactive-desc-lens" aria-hidden="true" />

      {/* Mobile scroll-reveal luminous beam that replays when scrolling away and returning */}
      {isIntersecting && (
        <span
          key={`beam-${replayKey}`}
          className="interactive-desc-mobile-beam"
          aria-hidden="true"
        />
      )}

      <span key={`content-${replayKey}`} className="interactive-desc-content">
        {words.map((word, wordIndex) => (
          <React.Fragment key={wordIndex}>
            <span
              className={`interactive-desc-word ${
                isIntersecting ? 'is-revealed' : ''
              }`}
              style={{
                '--word-idx': wordIndex,
                '--total-words': words.length,
              }}
            >
              {word.split('').map((char, charIndex) => (
                <span
                  key={charIndex}
                  ref={(el) => {
                    if (el) charRefs.current.push(el);
                  }}
                  className="interactive-desc-char"
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

export default InteractiveDescription;
