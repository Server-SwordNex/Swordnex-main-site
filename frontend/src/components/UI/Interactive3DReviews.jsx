import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Interactive3DReviews.css';

export const DEFAULT_REVIEWS = [
  {
    initials: "O",
    name: "Operations Head",
    org: "Supermarket Chain",
    text: "SwordNex Billing cut our checkout time and gave us accurate daily reports.",
    border: "border-blue-600 dark:border-blue-500",
    color: "#2563eb"
  },
  {
    initials: "D",
    name: "Director",
    org: "Training Institute",
    text: "Our new site and campaigns from SwordNex doubled qualified leads in three months.",
    border: "border-blue-600 dark:border-blue-500",
    color: "#2563eb"
  },
  {
    initials: "S",
    name: "Support Manager",
    org: "E-commerce Store",
    text: "Support portal reduced ticket resolution by 45%. Real-time chat works perfectly.",
    border: "border-blue-600 dark:border-blue-500",
    color: "#2563eb"
  },
  {
    initials: "A",
    name: "Tech Lead",
    org: "Retail Platform",
    text: "API handled 10x traffic during Black Friday. Zero downtime!",
    border: "border-blue-600 dark:border-blue-500",
    color: "#2563eb"
  },
  {
    initials: "P",
    name: "Finance Controller",
    org: "Manufacturing Co.",
    text: "Payroll automated TDS & PF. Audit-ready reports instantly!",
    border: "border-blue-600 dark:border-blue-500",
    color: "#2563eb"
  },
];

const Interactive3DReviews = ({ reviews = DEFAULT_REVIEWS }) => {
  const [dimensions, setDimensions] = useState(() => {
    if (typeof window === 'undefined') {
      return { cardWidth: 340, radiusX: 380, liftY: 22, minScale: 0.82, maxScale: 1.04 };
    }
    const w = window.innerWidth;
    if (w < 480) {
      return { cardWidth: 260, radiusX: 130, liftY: 14, minScale: 0.78, maxScale: 0.98 };
    }
    if (w < 768) {
      return { cardWidth: 285, radiusX: 210, liftY: 16, minScale: 0.80, maxScale: 1.0 };
    }
    if (w < 1024) {
      return { cardWidth: 310, radiusX: 290, liftY: 18, minScale: 0.82, maxScale: 1.02 };
    }
    return { cardWidth: 340, radiusX: 380, liftY: 22, minScale: 0.82, maxScale: 1.04 };
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const cardRefs = useRef([]);
  const angleRef = useRef(0);
  const targetAngleRef = useRef(null);
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartAngleRef = useRef(0);
  const activeIndexRef = useRef(0);
  const animFrameIdRef = useRef(null);

  const totalCards = reviews.length;
  const angleStep = (2 * Math.PI) / totalCards;

  // Responsive calculation
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setDimensions({ cardWidth: 260, radiusX: 130, liftY: 14, minScale: 0.78, maxScale: 0.98 });
      } else if (w < 768) {
        setDimensions({ cardWidth: 285, radiusX: 210, liftY: 16, minScale: 0.80, maxScale: 1.0 });
      } else if (w < 1024) {
        setDimensions({ cardWidth: 310, radiusX: 290, liftY: 18, minScale: 0.82, maxScale: 1.02 });
      } else {
        setDimensions({ cardWidth: 340, radiusX: 380, liftY: 22, minScale: 0.82, maxScale: 1.04 });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update all card positions, depths, scales, and blurs directly on DOM elements
  const updateCardTransforms = useCallback((currentAngle) => {
    // Determine the active (center-most) card
    const normalized = ((-currentAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    const frontIdx = Math.round(normalized / angleStep) % totalCards;
    if (frontIdx !== activeIndexRef.current) {
      activeIndexRef.current = frontIdx;
      setActiveIndex(frontIdx);
    }

    reviews.forEach((_, idx) => {
      const el = cardRefs.current[idx];
      if (!el) return;

      // Angle for this card in horizontal orbit
      const cardAngle = currentAngle + idx * angleStep;
      const sin = Math.sin(cardAngle);
      const cos = Math.cos(cardAngle);

      // Horizontal coordinate along 3D ellipse
      const x = dimensions.radiusX * sin;

      // Depth parameter: t in [0, 1] where 1 is closest front, 0 is furthest behind
      const t = (cos + 1) / 2;

      // Vertical offset: back cards are lifted slightly so their stars/titles peek out cleanly
      const y = -(1 - t) * dimensions.liftY;

      // Scale: 1.04 in front, 0.82 in behind
      const scale = dimensions.minScale + t * (dimensions.maxScale - dimensions.minScale);

      // Blur: 0px when in front, ~3.6px when in behind ("blurred slightly")
      const blur = (1 - t) * 3.8;

      // Opacity: 1.0 in front, 0.70 in behind (always visible)
      const opacity = 0.70 + t * 0.30;

      // Z-Index: front cards always overlap back cards
      const zIndex = Math.round(10 + t * 50);

      // ONLY CARD IN THE CENTER IS HOVERABLE
      // It must be the front-most card (idx === frontIdx) and near center (t >= 0.85)
      // And when dragging, hover is completely stopped
      const isCenter = idx === frontIdx && t >= 0.85 && !isDraggingRef.current;

      if (isCenter) {
        el.classList.add('is-center-card');
        el.style.pointerEvents = 'auto';
      } else {
        el.classList.remove('is-center-card');
        el.style.pointerEvents = 'none';
      }

      // ALL CARDS FACE THE SCREEN DIRECTLY
      el.style.transform = `translate3d(calc(-50% + ${x.toFixed(2)}px), calc(-50% + ${y.toFixed(2)}px), 0) scale(${scale.toFixed(3)})`;
      el.style.filter = blur > 0.15 ? `blur(${blur.toFixed(2)}px)` : 'none';
      el.style.opacity = opacity.toFixed(3);
      el.style.zIndex = zIndex;

      if (t > 0.88) {
        el.classList.add('is-front');
      } else {
        el.classList.remove('is-front');
      }
    });
  }, [dimensions, angleStep, reviews, totalCards]);

  // Main 60/120fps continuous animation loop
  useEffect(() => {
    const baseSpeed = 0.0018; // Calm, steady rotation speed

    const animate = () => {
      // If snapping to a clicked card, ease smoothly towards target
      if (targetAngleRef.current !== null) {
        const diff = targetAngleRef.current - angleRef.current;
        if (Math.abs(diff) < 0.003) {
          angleRef.current = targetAngleRef.current;
          targetAngleRef.current = null;
        } else {
          angleRef.current += diff * 0.07;
        }
        updateCardTransforms(angleRef.current);
      } else if (!isDraggingRef.current && !isHoveredRef.current) {
        // When hovered on the center card, rotation stops completely! When not hovered, it moves smoothly.
        angleRef.current += baseSpeed;
        updateCardTransforms(angleRef.current);
      }

      animFrameIdRef.current = requestAnimationFrame(animate);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [updateCardTransforms]);

  // Navigate to bring a specific card to front using shortest angular path
  const goToCard = (index) => {
    const currentNorm = ((-angleRef.current % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    const targetNorm = index * angleStep;
    let diff = targetNorm - currentNorm;
    if (diff > Math.PI) diff -= 2 * Math.PI;
    if (diff < -Math.PI) diff += 2 * Math.PI;

    targetAngleRef.current = angleRef.current - diff;
  };

  const handlePrev = () => {
    targetAngleRef.current = Math.round(angleRef.current / angleStep) * angleStep - angleStep;
  };

  const handleNext = () => {
    targetAngleRef.current = Math.round(angleRef.current / angleStep) * angleStep + angleStep;
  };

  // Mouse Drag Events: Hover is completely stopped when user drags to rotate
  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    isDraggingRef.current = true;
    isHoveredRef.current = false; // Hover stopped during drag
    targetAngleRef.current = null;
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
    dragStartAngleRef.current = angleRef.current;

    // Immediately update transforms to drop hover state
    updateCardTransforms(angleRef.current);

    const handleMouseMove = (moveEvent) => {
      if (!isDraggingRef.current) return;
      isHoveredRef.current = false;
      const deltaX = moveEvent.clientX - dragStartXRef.current;
      const sensitivity = 0.004;
      angleRef.current = dragStartAngleRef.current + deltaX * sensitivity;
      updateCardTransforms(angleRef.current);
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      setIsDragging(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      updateCardTransforms(angleRef.current);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // Touch Events for Mobile: Hover is stopped during touch drag
  const handleTouchStart = (e) => {
    isDraggingRef.current = true;
    isHoveredRef.current = false; // Hover stopped during drag
    targetAngleRef.current = null;
    setIsDragging(true);
    dragStartXRef.current = e.touches[0].clientX;
    dragStartAngleRef.current = angleRef.current;
    updateCardTransforms(angleRef.current);
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current) return;
    isHoveredRef.current = false;
    const deltaX = e.touches[0].clientX - dragStartXRef.current;
    const sensitivity = 0.005;
    angleRef.current = dragStartAngleRef.current + deltaX * sensitivity;
    updateCardTransforms(angleRef.current);
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
    updateCardTransforms(angleRef.current);
  };

  return (
    <div className="reviews-3d-section group relative">
      {/* Left and Right Blur Edge Overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-24 bg-gradient-to-r from-white dark:from-background-dark to-transparent z-40 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-24 bg-gradient-to-l from-white dark:from-background-dark to-transparent z-40 pointer-events-none" />

      {/* 3D Ambient Floor Glow */}
      <div className="reviews-3d-floor-ambient" />

      {/* 3D Orbit Viewport Scene */}
      <div
        className={`reviews-3d-scene ${isDragging ? 'is-dragging' : ''}`}
        onMouseLeave={() => { isHoveredRef.current = false; }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          '--card-width': `${dimensions.cardWidth}px`,
        }}
      >
        <div className="reviews-3d-stage">
          {reviews.map((item, idx) => {
            const isFront = activeIndex === idx;

            return (
              <div
                key={idx}
                ref={(el) => { cardRefs.current[idx] = el; }}
                className={`reviews-3d-card-item ${isFront ? 'is-front' : ''}`}
                onMouseEnter={() => {
                  // Only card in the center can trigger hover, and only when NOT dragging
                  if (!isDraggingRef.current && activeIndex === idx) {
                    isHoveredRef.current = true;
                  }
                }}
                onMouseLeave={() => {
                  isHoveredRef.current = false;
                }}
              >
                <div
                  className={`reviews-3d-card-inner p-6 rounded-2xl border-t-4 ${item.border}`}
                >
                  {/* Decorative Background Quote Icon Watermark */}
                  <span className="material-icons-round text-5xl text-blue-100/70 dark:text-blue-900/30 absolute top-4 right-4 pointer-events-none select-none">
                    format_quote
                  </span>

                  <div>
                    {/* Rating Stars */}
                    <div className="flex items-center gap-1 text-amber-400 mb-3 select-none">
                      {[...Array(5)].map((_, starIdx) => (
                        <span key={starIdx} className="material-icons-round text-base">
                          star
                        </span>
                      ))}
                      <span className="text-xs font-semibold text-blue-600/70 dark:text-blue-400/70 ml-1.5">
                        5.0
                      </span>
                    </div>

                    {/* Client Review */}
                    <p className="text-gray-700 dark:text-gray-300 mb-5 italic text-sm sm:text-base leading-relaxed relative z-10">
                      "{item.text}"
                    </p>
                  </div>

                  {/* Client Name & Info in Box with Blue Line at Top */}
                  <div className="flex items-center gap-3.5 pt-4 border-t border-gray-100 dark:border-gray-800 relative z-10">
                    <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center font-bold text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60 shrink-0 select-none shadow-sm">
                      {item.initials}
                    </div>
                    <div className="text-left overflow-hidden">
                      <h4 className="font-bold text-gray-900 dark:text-white text-sm truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {item.org}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Previous Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          aria-label="Previous review"
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-blue-400 hover:scale-110 active:scale-95 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
        >
          <span className="material-icons-round text-2xl select-none">chevron_left</span>
        </button>

        {/* Next Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          aria-label="Next review"
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-blue-400 hover:scale-110 active:scale-95 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
        >
          <span className="material-icons-round text-2xl select-none">chevron_right</span>
        </button>
      </div>

      {/* Navigation Dots Indicator */}
      <div className="flex items-center justify-center gap-2 mt-2 z-40 relative">
        {reviews.map((_, dotIdx) => (
          <button
            key={dotIdx}
            type="button"
            onClick={() => goToCard(dotIdx)}
            aria-label={`Go to review ${dotIdx + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              activeIndex === dotIdx
                ? 'w-7 bg-primary dark:bg-blue-500 shadow-sm shadow-primary/30'
                : 'w-2.5 bg-gray-300 dark:bg-slate-700 hover:bg-gray-400 dark:hover:bg-slate-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Interactive3DReviews;
