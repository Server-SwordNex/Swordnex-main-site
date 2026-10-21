import React, { useState, useEffect, useRef } from 'react';
import './TrustStatCounter.css';

/**
 * AnimatedStatNumber
 * Core animated number counter extracted for reuse across hero and detail pages:
 * - Counts up (lerp from 0 to target) with quartic easing (1 - Math.pow(1 - t, 4)) over duration (1600ms default)
 * - Triggers when entering viewport, resets to 0 when exiting, and replays on return
 * - While lerping, adds .is-lerping class (scale + glow)
 * - On hover, .stat-number scales slightly and shakes
 * - Preserves decimal precision (e.g. 99.9%, 99.99%, 4.9/5)
 * - Automatically parses strings (e.g. "50+", "100+", "3X") while preserving static strings ("24/7", "24×7", "SMB")
 * - Complies with prefers-reduced-motion
 */
export const AnimatedStatNumber = ({
  target,
  targetValue,
  value,
  displayValue,
  suffix = '',
  duration = 1600,
  animateOnView = true,
  className = '',
}) => {
  let parsedTarget = target ?? targetValue;
  let parsedSuffix = suffix;
  const rawDisplay = displayValue ?? value;

  // Auto-parse string values like "50+", "99.9%", "3X", "4.9/5" if target is not explicitly given
  if (parsedTarget === undefined && typeof value === 'string') {
    const trimmed = value.trim();
    // Keep 24/7 and 24×7 as static display values rather than counting 0 to 24 with /7
    const isAvailability = /^\d+[/×xX]\d+$/.test(trimmed) && !trimmed.includes('.');
    if (!isAvailability) {
      const match = trimmed.match(/^([\d.]+)(.*)$/);
      if (match && !isNaN(Number(match[1]))) {
        parsedTarget = Number(match[1]);
        if (!parsedSuffix) parsedSuffix = match[2];
      }
    }
  }

  const rawTarget = parsedTarget ?? rawDisplay;
  const isNumeric = rawTarget !== undefined && rawTarget !== null && !isNaN(Number(rawTarget)) && rawTarget !== '';
  const finalTarget = isNumeric ? Number(rawTarget) : 0;
  const decimals = isNumeric && String(rawTarget).includes('.') ? (String(rawTarget).split('.')[1] || '').length : 0;

  const getInitialCount = () => {
    if (!isNumeric) return rawDisplay ?? '';
    if (!animateOnView) return decimals > 0 ? finalTarget.toFixed(decimals) : finalTarget;
    return decimals > 0 ? (0).toFixed(decimals) : 0;
  };

  const [count, setCount] = useState(getInitialCount);
  const [isLerping, setIsLerping] = useState(false);
  const containerRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    if (!isNumeric) {
      setCount(rawDisplay ?? '');
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCount(decimals > 0 ? finalTarget.toFixed(decimals) : finalTarget);
      setIsLerping(false);
      return;
    }

    if (!animateOnView) {
      setCount(decimals > 0 ? finalTarget.toFixed(decimals) : finalTarget);
      return;
    }

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const startAnimation = () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      setIsLerping(true);
      const startTime = performance.now();

      const step = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutQuart(progress);

        if (decimals > 0) {
          const factor = Math.pow(10, decimals);
          const current = (Math.round(eased * finalTarget * factor) / factor).toFixed(decimals);
          setCount(current);
        } else {
          const current = Math.round(eased * finalTarget);
          setCount(current);
        }

        if (progress < 1) {
          animRef.current = requestAnimationFrame(step);
        } else {
          setCount(decimals > 0 ? finalTarget.toFixed(decimals) : finalTarget);
          setIsLerping(false);
          animRef.current = null;
        }
      };

      animRef.current = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimation();
          } else {
            // Reset count so scrolling away and returning replays the animation
            if (animRef.current) cancelAnimationFrame(animRef.current);
            setCount(decimals > 0 ? (0).toFixed(decimals) : 0);
            setIsLerping(false);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    observer.observe(el);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      observer.disconnect();
    };
  }, [finalTarget, isNumeric, rawDisplay, duration, animateOnView, decimals]);

  return (
    <span
      ref={containerRef}
      className={`stat-number ${isLerping ? 'is-lerping' : ''} ${className}`}
      aria-label={`${count}${parsedSuffix || ''}`}
    >
      {count}
      {parsedSuffix ? <span className="stat-suffix">{parsedSuffix}</span> : null}
    </span>
  );
};

/**
 * TrustStatCounter
 * Hero-section trust indicator:
 * 1. Counts up (lerp from 0 to target) when entering the viewport via AnimatedStatNumber.
 * 2. On hover:
 *    - Numeric value shakes and scales.
 *    - Label text runs a blue light "train" letter by letter.
 */
export const TrustStatCounter = ({
  target,
  targetValue,
  value,
  displayValue,
  suffix = '',
  label = '',
  duration = 1600,
  animateOnView = true,
  className = '',
  numberClassName = '',
}) => {
  // Split label into letters for the letter-by-letter train shine
  const letters = (label || '').split('');

  return (
    <div
      className={`trust-indicator-card group flex flex-col cursor-pointer select-none ${className}`}
      tabIndex={0}
      role="group"
      aria-label={`${target ?? targetValue ?? value ?? ''}${suffix} ${label}`}
    >
      {/* Numeric value with lerping scale + hover scale & shake */}
      <AnimatedStatNumber
        target={target}
        targetValue={targetValue}
        value={value}
        displayValue={displayValue}
        suffix={suffix}
        duration={duration}
        animateOnView={animateOnView}
        className={`text-lg sm:text-xl font-bold text-[#0d121b] dark:text-white ${numberClassName}`}
      />

      {/* Subtext with letter-by-letter blue train shine */}
      {label && (
        <span className="stat-label text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          {letters.map((char, index) => (
            <span
              key={index}
              className="train-letter"
              style={{
                '--char-index': index,
                '--char-total': letters.length,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
      )}
    </div>
  );
};

export default TrustStatCounter;
