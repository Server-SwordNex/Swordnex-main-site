import React from 'react';
import '../../pages/ServicesCards.css';

/**
 * CTA_PARTICLES
 * Exact particle definitions from Services.jsx CTA section:
 * - Floating subtle light dots with individual drifts, durations, and delays
 */
export const CTA_PARTICLES = [
  { id: 1, top: '16%', left: '8%', size: 3.5, duration: '14s', driftX: '18px', driftY: '-20px', delay: '0s' },
  { id: 2, top: '24%', right: '10%', size: 4, duration: '16s', driftX: '-20px', driftY: '-18px', delay: '2s' },
  { id: 3, top: '50%', left: '7%', size: 3, duration: '13s', driftX: '15px', driftY: '-15px', delay: '4s' },
  { id: 4, top: '44%', right: '8%', size: 3.5, duration: '15s', driftX: '-16px', driftY: '-22px', delay: '1s' },
  { id: 5, top: '80%', left: '12%', size: 4, duration: '17s', driftX: '22px', driftY: '-16px', delay: '3s' },
  { id: 6, top: '78%', right: '14%', size: 3, duration: '14s', driftX: '-18px', driftY: '-20px', delay: '5s' },
  { id: 7, top: '32%', left: '24%', size: 2.5, duration: '18s', driftX: '12px', driftY: '-14px', delay: '2.5s' },
  { id: 8, top: '68%', right: '25%', size: 2.5, duration: '15s', driftX: '-14px', driftY: '-18px', delay: '4.5s' }
];

/**
 * Framer Motion Animation Variants
 * Exactly matches the Services page CTA section reveal:
 * - Staggered children with 0.12s stagger, 0.08s initial delay
 * - Quartic cubic-bezier [0.22, 1, 0.36, 1] slide-up with 0.58s duration
 */
export const ctaSectionContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08
    }
  }
};

export const ctaSectionItemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.58,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

/**
 * Cursor Tracking Helper
 * Sets CSS variables for cursor-following radial light
 */
export const handleCtaMouseMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--cta-mouse-x', `${(e.clientX - rect.left).toFixed(1)}px`);
  e.currentTarget.style.setProperty('--cta-mouse-y', `${(e.clientY - rect.top).toFixed(1)}px`);
};

/**
 * CtaInteractiveOverlay
 * Reusable visual animation overlay from the main Services page CTA section:
 * 1. Soft background blur shapes
 * 2. Animated background light sweep
 * 3. Cursor-following subtle blue radial glow
 * 4. Drifting ambient light particles
 */
export const CtaInteractiveOverlay = () => {
  return (
    <>
      {/* Background Soft Blurs */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-white rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-white rounded-full blur-3xl" />
      </div>

      {/* 1. Animated Background Light Sweep */}
      <div className="cta-light-sweep" aria-hidden="true" />

      {/* 2. Cursor-Responsive Radial Glow Overlay */}
      <div className="cta-cursor-glow" aria-hidden="true" />

      {/* 3. Floating Light Particles */}
      <div className="cta-particles-container" aria-hidden="true">
        {CTA_PARTICLES.map((p) => (
          <div
            key={p.id}
            className="cta-particle-dot"
            style={{
              top: p.top,
              left: p.left,
              right: p.right,
              width: `${p.size}px`,
              height: `${p.size}px`,
              '--particle-duration': p.duration,
              '--particle-delay': p.delay,
              '--drift-x': p.driftX,
              '--drift-y': p.driftY
            }}
          />
        ))}
      </div>
    </>
  );
};

export default CtaInteractiveOverlay;
