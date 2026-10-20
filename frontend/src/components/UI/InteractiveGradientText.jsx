import React, { useRef, useEffect } from 'react';

/**
 * InteractiveGradientText Component
 * Features:
 * 1. Default auto-running purple tone that sweeps from letter 'S' in Software across to ending letter 's' in Companies in an infinite loop.
 * 2. On hover/pointer-move, the purple tone smoothly lerps/glides directly to the cursor position without any snapping.
 * 3. On pointer leave, seamlessly resumes the continuous running flow.
 */
const InteractiveGradientText = ({
  text = 'Software for Growing Companies',
  className = '',
  children,
}) => {
  const textRef = useRef(null);
  const stateRef = useRef({
    currentX: -25,
    targetX: -25,
    isHovered: false,
  });

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    let animId;
    const lerpFactor = 0.085; // Silky smooth viscous spring easing
    const autoSpeed = 0.28; // Speed of auto-running wave

    const animate = () => {
      const state = stateRef.current;

      if (state.isHovered) {
        state.currentX += (state.targetX - state.currentX) * lerpFactor;
      } else {
        state.currentX += autoSpeed;
        if (state.currentX > 125) {
          state.currentX = -25;
        }
      }

      el.style.setProperty('--glow-x', `${state.currentX.toFixed(2)}%`);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    const handlePointerEnter = (e) => {
      stateRef.current.isHovered = true;
      const rect = el.getBoundingClientRect();
      if (rect.width > 0) {
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        stateRef.current.targetX = Math.max(0, Math.min(100, x));
      }
    };

    const handlePointerMove = (e) => {
      stateRef.current.isHovered = true;
      const rect = el.getBoundingClientRect();
      if (rect.width > 0) {
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        stateRef.current.targetX = Math.max(0, Math.min(100, x));
      }
    };

    const handlePointerLeave = () => {
      stateRef.current.isHovered = false;
    };

    el.addEventListener('pointerenter', handlePointerEnter);
    el.addEventListener('pointermove', handlePointerMove);
    el.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      cancelAnimationFrame(animId);
      el.removeEventListener('pointerenter', handlePointerEnter);
      el.removeEventListener('pointermove', handlePointerMove);
      el.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return (
    <span
      ref={textRef}
      className={`interactive-purple-runner ${className}`}
    >
      {children || text}
    </span>
  );
};

export default InteractiveGradientText;
