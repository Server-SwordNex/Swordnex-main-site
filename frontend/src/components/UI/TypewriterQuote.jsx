import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useInView } from 'framer-motion';

/**
 * TypewriterQuote
 * Types out the quote character-by-character with an animated pulsing cursor
 * ONLY when scrolled into view.
 *
 * Features:
 * 1. Triggers strictly on scroll into view via useInView.
 * 2. Completely disabled on mouse hover (no hover trigger/restart).
 * 3. Ghost reservation layer prevents layout shift (zero CLS).
 * 4. High-performance isolated state updates.
 */
const TypewriterQuote = ({
  quote = "At SwordNex, we build technology that fades into the background, letting your teams focus on meaningful work and business growth.",
  speed = 20, // ms per character
  className = "",
}) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.35, once: false });
  // Strip quotation marks so only the sentence itself is typed out
  const fullQuote = quote.replace(/^[“"']+|[”"']+$/g, '').trim();
  const [displayedText, setDisplayedText] = useState(fullQuote);
  const [isTyping, setIsTyping] = useState(false);
  const timerRef = useRef(null);
  const prevInViewRef = useRef(false);

  const startTyping = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setIsTyping(true);
    setDisplayedText("");

    const chars = Array.from(fullQuote);
    let charIndex = 0;

    timerRef.current = setInterval(() => {
      charIndex++;
      setDisplayedText(chars.slice(0, charIndex).join(""));
      if (charIndex >= chars.length) {
        clearInterval(timerRef.current);
        timerRef.current = null;
        setIsTyping(false);
      }
    }, speed);
  }, [fullQuote, speed]);

  // Trigger strictly when scrolling into view
  useEffect(() => {
    if (isInView && !prevInViewRef.current) {
      startTyping();
    }
    prevInViewRef.current = isInView;
  }, [isInView, startTyping]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative select-text cursor-default ${className}`}
    >
      {/* Invisible layout reservation layer preventing any jump/CLS */}
      <p
        className="invisible pointer-events-none select-none text-gray-700 dark:text-gray-300 text-sm sm:text-base italic leading-relaxed"
        aria-hidden="true"
      >
        {fullQuote}
      </p>

      {/* Visible animated typed text */}
      <p className="absolute inset-0 text-gray-700 dark:text-gray-300 text-sm sm:text-base italic leading-relaxed">
        {displayedText}
        {isTyping && (
          <span
            className="inline-block w-0.5 h-3.5 bg-primary rounded-full animate-pulse ml-0.5 align-middle"
            aria-hidden="true"
          />
        )}
      </p>
    </div>
  );
};

export default TypewriterQuote;
