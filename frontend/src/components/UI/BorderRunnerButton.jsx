import React from 'react';
import './BorderRunnerButton.css';

/**
 * BorderRunnerButton
 * A premium CTA button that:
 * 1. Scales slightly bigger on hover.
 * 2. Blinks its inner text/content in size (gently breathes smaller and larger).
 * 3. Sweeps an intense luminous light bar around its rounded border:
 *    - 'primary' (or runnerColor="white"): white running bar on royal blue button.
 *    - 'secondary' / 'outline' (or runnerColor="blue"): electric blue running bar.
 */
export const BorderRunnerButton = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'white' | 'outline-white'
  runnerColor,         // 'white' | 'blue'
  href,
  onClick,
  className = '',
  type = 'button',
  ...rest
}) => {
  const isWhiteVariant = variant === 'white' || variant === 'light';
  const isOutlineWhite = variant === 'outline-white' || variant === 'ghost-white';
  const isBlue = !isWhiteVariant && !isOutlineWhite && (runnerColor === 'blue' || variant === 'secondary' || variant === 'outline');

  let variantClass = 'is-primary';
  if (isWhiteVariant) {
    variantClass = 'is-white';
  } else if (isOutlineWhite) {
    variantClass = 'is-outline-white';
  } else if (isBlue) {
    variantClass = 'is-secondary is-outline is-blue';
  }

  const effectiveRunnerColor = runnerColor || (isWhiteVariant ? 'blue' : isOutlineWhite ? 'white' : isBlue ? 'blue' : 'white');
  const runnerClass = `is-${effectiveRunnerColor}-runner`;
  const fullClassName = `border-runner-btn ${variantClass} ${runnerClass} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={fullClassName}
        {...rest}
      >
        <div className="border-runner-inner">
          <span className="border-runner-content">
            {children}
          </span>
        </div>
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={fullClassName}
      {...rest}
    >
      <div className="border-runner-inner">
        <span className="border-runner-content">
          {children}
        </span>
      </div>
    </button>
  );
};

export default BorderRunnerButton;
