import React, { useState, useEffect, useRef } from 'react';
import './WhyChooseSectionAnimation.css';

/**
 * Hook to manage interactive expand/collapse state:
 * - Desktop: Hover-based (handled via CSS :hover on .why-choose-expand-card)
 * - Mobile: Tap-to-toggle + viewport enter reveal
 * - Preserves user manual expansions independently of scrolling
 */
export function useWhyChooseInteractive(itemCount = 3) {
  const [expandedCards, setExpandedCards] = useState({});
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  );
  const autoExpandedRef = useRef(false);
  const userInteractedRef = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      if (desktop) {
        setExpandedCards({});
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // When section enters viewport on mobile, trigger smooth reveal if user hasn't toggled yet
  const handleViewportEnter = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      if (!autoExpandedRef.current && !userInteractedRef.current) {
        autoExpandedRef.current = true;
        const initial = {};
        for (let i = 0; i < itemCount; i++) {
          initial[i] = true;
        }
        setExpandedCards(initial);
      }
    }
  };

  // When user taps a card or the ^ indicator on mobile
  const handleCardToggle = (idx, e) => {
    if (e && e.stopPropagation) {
      // Allow bubbling if triggered on card, stop if needed
    }
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      userInteractedRef.current = true;
      setExpandedCards((prev) => ({
        ...prev,
        [idx]: !prev[idx],
      }));
    }
  };

  return {
    expandedCards,
    isDesktop,
    handleViewportEnter,
    handleCardToggle,
  };
}

/**
 * Visual ^ expand/collapse indicator synchronized with card state
 */
export function WhyChooseIndicator() {
  return (
    <div className="why-choose-indicator" aria-hidden="true">
      <svg
        className="why-choose-indicator-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </div>
  );
}

/**
 * Animated height wrapper for card content
 */
export function WhyChooseDescWrapper({ children, className = '' }) {
  return (
    <div className={`why-choose-desc-wrapper ${className}`}>
      <div className="why-choose-desc-inner">
        {children}
      </div>
    </div>
  );
}
