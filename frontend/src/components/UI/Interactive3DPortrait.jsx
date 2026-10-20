import React from 'react';
import './Interactive3DPortrait.css';

/**
 * Interactive3DPortrait
 * - Slight pop up on hover (scale: 1.045).
 * - Only the border is highlighted in bright white with a clean luminous halo.
 * - 3D cursor tilt and cursor-position surface lighting have been removed as requested.
 */
const Interactive3DPortrait = ({
  src,
  alt = 'Leader portrait',
  className = '',
}) => {
  return (
    <div className={`interactive-3d-portrait-outer ${className}`}>
      <div className="interactive-3d-portrait-inner">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover select-none pointer-events-none"
          draggable="false"
        />
      </div>
    </div>
  );
};

export default Interactive3DPortrait;
