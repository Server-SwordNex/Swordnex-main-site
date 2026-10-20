import React, { useEffect, useRef } from 'react';
import './InteractiveServicesHero.css';

// Distinct UI software modules shown in the central screen
const SCREEN_MODULES = [
  {
    id: 'saas',
    category: 'SaaS Platform',
    title: 'Custom ERP & SaaS',
    metric: '99.9% Uptime',
    status: 'Live Active',
    accent: '#2563eb',
    subtext: 'Multi-tenant cloud architecture & APIs'
  },
  {
    id: 'billing',
    category: 'Finance & GST',
    title: 'Auto Billing & Payroll',
    metric: '100% Reconciled',
    status: 'Auto-Sync',
    accent: '#059669',
    subtext: 'Instant invoices & ledger reconciliations'
  },
  {
    id: 'cloud',
    category: 'Cloud DevOps',
    title: 'Scalable Cloud Nodes',
    metric: '1.2ms Latency',
    status: 'Healthy',
    accent: '#4f46e5',
    subtext: 'High-availability container microservices'
  },
  {
    id: 'pos',
    category: 'Retail POS',
    title: 'Multi-Store Inventory',
    metric: '12 Outlets',
    status: 'Synchronized',
    accent: '#0d9488',
    subtext: 'Centralized catalog & stock tracking'
  },
  {
    id: 'security',
    category: 'Security Hub',
    title: 'Enterprise Gateway',
    metric: '256-bit AES',
    status: 'Protected',
    accent: '#7c3aed',
    subtext: 'End-to-end encrypted workflow pipelines'
  }
];

// Duplicate the sequence once so the loop wraps seamlessly with zero gaps or jumps
const DUPLICATED_CARDS = [...SCREEN_MODULES, ...SCREEN_MODULES];

// Exact layout geometry
const CARD_HEIGHT = 62;
const CARD_GAP = 12;
const STRIDE = CARD_HEIGHT + CARD_GAP; // 74 units
const TOTAL_MODULES = SCREEN_MODULES.length; // 5
const LOOP_DISTANCE = TOTAL_MODULES * STRIDE; // 370 units
const SCROLL_SPEED = 26; // Constant uniform speed: 26 SVG units per second

export default function InteractiveServicesHero() {
  const trackRef = useRef(null);

  useEffect(() => {
    let animId;
    let startTime = null;

    // Continuous, uninterrupted linear vertical scrolling
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;

      // Constant velocity without pauses, easing, or delays
      const yOffset = (elapsed * (SCROLL_SPEED / 1000)) % LOOP_DISTANCE;

      if (trackRef.current) {
        trackRef.current.setAttribute('transform', `translate(0, -${yOffset.toFixed(2)})`);
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      className="services-hero-interactive select-none"
      aria-label="Software demonstration visual"
    >
      {/* 1. Base Illustration Artwork (Preserving both characters, positions & composition) */}
      <img
        src="https://metropolitan-bronze-tlfmhjn4gk.edgeone.app/App%20development-amico.png"
        alt="Software development and IT solutions illustration"
        className="services-hero-base-image pointer-events-none select-none"
        loading="eager"
      />

      {/* 2. Precision SVG Overlay for Screen Scrolling & Subtle Laptop Activity */}
      <svg
        viewBox="0 0 500 500"
        className="services-hero-svg-overlay pointer-events-none"
        preserveAspectRatio="xMidYMid meet"
        overflow="hidden"
      >
        <defs>
          {/* Strictly clip all scrolling content within the central phone screen boundaries */}
          <clipPath id="heroScreenInnerClip">
            <polygon points="234,142 342,80 342,335 234,397" />
          </clipPath>

          {/* Gradients for clean card surfaces */}
          <linearGradient id="cardGradSurface" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f8fafc" />
          </linearGradient>

          {/* Laptop terminal glow */}
          <linearGradient id="laptopGlow" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* =============================================================
            CENTRAL SOFTWARE SCREEN — STRICTLY CONTAINED VERTICAL SCROLLING
            Screen frame is fixed; inner cards scroll vertically bottom-to-top
            ============================================================= */}
        <g clipPath="url(#heroScreenInnerClip)">
          {/* Opaque base canvas covering static artwork strictly within the screen frame */}
          <polygon points="233,140 343,78 343,337 233,399" fill="#f8fafc" />

          {/* Subtle architectural background guidelines */}
          <g transform="translate(235, 142) skewY(-30)" opacity="0.35">
            <line x1="0" y1="45" x2="106" y2="45" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="3 3" />
            <line x1="0" y1="115" x2="106" y2="115" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="3 3" />
            <line x1="0" y1="185" x2="106" y2="185" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="3 3" />
            <line x1="0" y1="255" x2="106" y2="255" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="3 3" />
          </g>

          {/* Continuous Vertical Scroller Track in 30° Isometric Plane */}
          <g transform="translate(235, 142) skewY(-30)">
            <g ref={trackRef} transform="translate(0, 0)">
              {DUPLICATED_CARDS.map((card, idx) => {
                const cardY = idx * STRIDE;

                return (
                  <g
                    key={`${card.id}-${idx}`}
                    transform={`translate(4, ${cardY})`}
                    className="hero-screen-card"
                  >
                    {/* Card Container Box */}
                    <rect
                      x="0"
                      y="0"
                      width="98"
                      height="62"
                      rx="8"
                      fill="url(#cardGradSurface)"
                      stroke="#e2e8f0"
                      strokeWidth="1"
                      filter="drop-shadow(0 2px 4px rgba(15,23,42,0.06))"
                    />

                    {/* Left Accent Bar */}
                    <rect
                      x="0"
                      y="0"
                      width="3.6"
                      height="62"
                      rx="2"
                      fill={card.accent}
                    />

                    {/* Category Label */}
                    <text
                      x="8"
                      y="14"
                      fontSize="6.2"
                      fontWeight="bold"
                      fill="#64748b"
                      fontFamily="system-ui, -apple-system, sans-serif"
                    >
                      {card.category.toUpperCase()}
                    </text>

                    {/* Live Status Pill */}
                    <rect
                      x="60"
                      y="6.5"
                      width="32"
                      height="9.5"
                      rx="4.5"
                      fill={card.accent}
                    />
                    <text
                      x="76"
                      y="13.2"
                      fontSize="5"
                      fontWeight="bold"
                      fill="#ffffff"
                      textAnchor="middle"
                      fontFamily="system-ui, -apple-system, sans-serif"
                    >
                      {card.status}
                    </text>

                    {/* Card Title */}
                    <text
                      x="8"
                      y="26"
                      fontSize="7.4"
                      fontWeight="bold"
                      fill="#0f172a"
                      fontFamily="system-ui, -apple-system, sans-serif"
                    >
                      {card.title}
                    </text>

                    {/* Card Subtext */}
                    <text
                      x="8"
                      y="36"
                      fontSize="5.2"
                      fill="#64748b"
                      fontFamily="system-ui, -apple-system, sans-serif"
                    >
                      {card.subtext.length > 22 ? card.subtext.slice(0, 21) + '…' : card.subtext}
                    </text>

                    {/* Metric & Mini Activity Bars */}
                    <g transform="translate(8, 42)">
                      <text
                        x="0"
                        y="12"
                        fontSize="6.2"
                        fontWeight="bold"
                        fill={card.accent}
                        fontFamily="system-ui, -apple-system, sans-serif"
                      >
                        {card.metric}
                      </text>

                      {/* Sparkline Visual Activity Bars */}
                      <rect x="52" y="5" width="4" height="8" rx="1.5" fill={card.accent} opacity="0.8" />
                      <rect x="58" y="2" width="4" height="11" rx="1.5" fill={card.accent} opacity="0.95" />
                      <rect x="64" y="6" width="4" height="7" rx="1.5" fill={card.accent} opacity="0.75" />
                      <rect x="70" y="3" width="4" height="10" rx="1.5" fill={card.accent} opacity="0.85" />
                      <rect x="76" y="1" width="4" height="12" rx="1.5" fill={card.accent} />
                    </g>
                  </g>
                );
              })}
            </g>
          </g>
        </g>

        {/* =============================================================
            SUBTLE LAPTOP ACTIVITY FOR SEATED BOY
            Soft terminal backlight glow & streaming code lines on laptop
            ============================================================= */}
        <g transform="translate(108, 304) rotate(-18) skewX(24)">
          {/* Laptop Screen Soft Glow */}
          <ellipse
            cx="12"
            cy="10"
            rx="20"
            ry="11"
            fill="url(#laptopGlow)"
            className="hero-laptop-glow"
          />

          {/* Subtle Code Stream on the Laptop Screen */}
          <line
            x1="-4"
            y1="4"
            x2="26"
            y2="4"
            stroke="#38bdf8"
            strokeWidth="1.4"
            strokeDasharray="18 10"
            className="hero-code-stream-1"
          />
          <line
            x1="2"
            y1="9"
            x2="28"
            y2="9"
            stroke="#60a5fa"
            strokeWidth="1.4"
            strokeDasharray="14 12"
            className="hero-code-stream-2"
          />
          <line
            x1="-2"
            y1="14"
            x2="22"
            y2="14"
            stroke="#93c5fd"
            strokeWidth="1.3"
            strokeDasharray="16 10"
            className="hero-code-stream-3"
          />

          {/* Terminal Cursor */}
          <rect x="25" y="12.5" width="2" height="3" fill="#4ade80" opacity="0.9" />
        </g>
      </svg>
    </div>
  );
}
