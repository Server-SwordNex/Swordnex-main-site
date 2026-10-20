import React, { useState, useEffect, useRef } from 'react';
import './TrustStatCounter.css';

/**
 * TrustStatCounter
 * 1. Counts up (lerp from 0 to target) when entering the viewport.
 *    - While lerping, the numeric value becomes slightly big.
 *    - When finished lerping, it smoothly returns to normal size.
 * 2. On hover:
 *    - Numeric value slightly becomes big and shakes a little.
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
}) => {
  const rawTarget = target ?? targetValue ?? value;
  const isNumeric = rawTarget !== undefined && rawTarget !== null && !isNaN(Number(rawTarget)) && rawTarget !== '';
  const finalTarget = isNumeric ? Number(rawTarget) : 0;
  const [count, setCount] = useState(isNumeric ? (animateOnView ? 0 : finalTarget) : (displayValue ?? value ?? ''));
  const [isLerping, setIsLerping] = useState(false);
  const containerRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    if (!isNumeric) {
      setCount(displayValue ?? value ?? '');
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCount(finalTarget);
      setIsLerping(false);
      return;
    }

    if (!animateOnView) {
      setCount(finalTarget);
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
        const current = Math.round(eased * finalTarget);

        setCount(current);

        if (progress < 1) {
          animRef.current = requestAnimationFrame(step);
        } else {
          setCount(finalTarget);
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
            // Reset count so scrolling down triggers the count-up again
            if (animRef.current) cancelAnimationFrame(animRef.current);
            setCount(0);
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
  }, [finalTarget, isNumeric, displayValue, value, duration, animateOnView]);

  // Split label into letters for the letter-by-letter train shine
  const letters = (label || '').split('');

  return (
    <div
      ref={containerRef}
      className={`trust-indicator-card group flex flex-col cursor-pointer select-none ${className}`}
      tabIndex={0}
      role="group"
      aria-label={`${count}${suffix} ${label}`}
    >
      {/* Numeric value with lerping scale + hover scale & shake */}
      <span
        className={`stat-number ${isLerping ? 'is-lerping' : ''} text-lg sm:text-xl font-bold text-[#0d121b] dark:text-white`}
      >
        {count}
        {suffix ? <span className="stat-suffix">{suffix}</span> : null}
      </span>

      {/* Subtext with letter-by-letter blue train shine */}
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
    </div>
  );
};

export default TrustStatCounter;
