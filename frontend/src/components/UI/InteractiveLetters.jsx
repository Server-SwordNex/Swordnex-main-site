import React, { useCallback, useRef } from 'react';
import './InteractiveLetters.css';

/**
 * InteractiveLetters
 * Renders text where individual letters highlight and bounce when touched by cursor or touch events.
 * Groups letters by word to preserve natural, responsive text wrapping.
 */
export const InteractiveLetters = ({
  text,
  variant = 'neutral',
  className = '',
  charClassName = '',
}) => {
  const containerRef = useRef(null);

  // Handle touch interactions for mobile devices
  const handleTouch = useCallback((e) => {
    if (!e.touches || e.touches.length === 0) return;
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (element && element.classList.contains('interactive-char')) {
      element.classList.add('is-hovered');
      setTimeout(() => {
        element.classList.remove('is-hovered');
      }, 500);
    }
  }, []);

  if (!text) return null;

  // Split into words by space to retain proper word breaks and wrapping
  const words = text.split(' ');

  return (
    <span
      ref={containerRef}
      className={`interactive-heading-container ${className}`}
      onTouchMove={handleTouch}
      onTouchStart={handleTouch}
    >
      {words.map((word, wordIndex) => (
        <React.Fragment key={wordIndex}>
          <span className="interactive-word">
            {word.split('').map((char, charIndex) => (
              <span
                key={charIndex}
                className={`interactive-char interactive-char-${variant} ${charClassName}`}
                data-char={char}
              >
                {char}
              </span>
            ))}
          </span>
          {wordIndex < words.length - 1 && ' '}
        </React.Fragment>
      ))}
    </span>
  );
};

export default InteractiveLetters;
