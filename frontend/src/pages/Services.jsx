import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion'; // Import motion
import ConsultationModal from '../components/ConsultationModal';
import ServiceEnquiryModal from '../components/ServiceEnquiryModal';
import InteractiveLetters from '../components/UI/InteractiveLetters';
import MagnifyingText from '../components/UI/MagnifyingText';
import InteractiveDescription from '../components/UI/InteractiveDescription';
import BorderRunnerButton from '../components/UI/BorderRunnerButton';
import { useNavigate } from 'react-router-dom';
import TrustStatCounter from '../components/UI/TrustStatCounter';
import InteractiveServicesHero from '../components/UI/InteractiveServicesHero';
import './ServicesCards.css';

// LearnMoreTypingButton:
// Matches the existing "Chat with us" typing interaction from ChatBot.jsx:
// - Shows ONLY the existing arrow by default
// - Desktop: On hover/focus, reveals "Learn More" with a letter-by-letter typing animation and shifts the arrow forward
// - Mobile/Touch: Triggers the same typing & arrow reveal automatically on scroll into view, and replays on scroll away/return
const LearnMoreTypingButton = ({ path, title, onNavigate, cardIndex = 0 }) => {
 const [isExpanded, setIsExpanded] = useState(false);
 const [displayedText, setDisplayedText] = useState('');
 const [isTyping, setIsTyping] = useState(false);
 const buttonRef = React.useRef(null);
 const typingTimerRef = React.useRef(null);
 const staggerTimerRef = React.useRef(null);
 const isHoveredRef = React.useRef(false);
 const isInViewRef = React.useRef(false);

 const FULL_TEXT = 'Learn More';

 const checkIsMobile = useCallback(() => {
  if (typeof window === 'undefined') return false;
  const isTouchMedia = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  const hasTouchPoints = typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0;
  const hasTouchStart = 'ontouchstart' in window;
  const isSmallScreen = window.innerWidth <= 768;
  return isTouchMedia || hasTouchPoints || hasTouchStart || isSmallScreen;
 }, []);

 const startTyping = useCallback(() => {
  setIsExpanded(true);
  setIsTyping(true);
  setDisplayedText('');

  if (typingTimerRef.current) clearInterval(typingTimerRef.current);

  const chars = Array.from(FULL_TEXT);
  let charIndex = 0;
  typingTimerRef.current = setInterval(() => {
   charIndex++;
   setDisplayedText(chars.slice(0, charIndex).join(''));
   if (charIndex >= chars.length) {
    clearInterval(typingTimerRef.current);
    typingTimerRef.current = null;
    setIsTyping(false);
   }
  }, 40);
 }, []);

 const stopTyping = useCallback(() => {
  setIsExpanded(false);
  if (typingTimerRef.current) {
   clearInterval(typingTimerRef.current);
   typingTimerRef.current = null;
  }
  setIsTyping(false);
  setTimeout(() => {
   setDisplayedText('');
  }, 180);
 }, []);

 // Desktop hover handlers
 const handleMouseEnter = () => {
  isHoveredRef.current = true;
  startTyping();
 };

 const handleMouseLeave = () => {
  isHoveredRef.current = false;
  // If desktop (not in active mobile view), mouse leave stops typing & collapses
  if (!checkIsMobile()) {
   stopTyping();
  }
 };

 // Mobile scroll-triggered reveal & replay logic
 React.useEffect(() => {
  const btnEl = buttonRef.current;
  if (!btnEl) return;

  const targetCard = btnEl.closest('.core-service-card') || btnEl;

  const observer = new IntersectionObserver(
   (entries) => {
    entries.forEach((entry) => {
     const isMobile = checkIsMobile();
     if (entry.isIntersecting) {
      isInViewRef.current = true;
      if (isMobile) {
       if (staggerTimerRef.current) clearTimeout(staggerTimerRef.current);
       // Stagger slightly by card index so cards animate smoothly in sequence
       staggerTimerRef.current = setTimeout(() => {
        startTyping();
       }, Math.min(cardIndex * 130, 400));
      }
     } else {
      isInViewRef.current = false;
      if (isMobile) {
       if (staggerTimerRef.current) clearTimeout(staggerTimerRef.current);
       stopTyping();
      }
     }
    });
   },
   {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.25,
   }
  );

  observer.observe(targetCard);

  return () => {
   observer.disconnect();
   if (staggerTimerRef.current) clearTimeout(staggerTimerRef.current);
   if (typingTimerRef.current) clearInterval(typingTimerRef.current);
  };
 }, [cardIndex, checkIsMobile, startTyping, stopTyping]);

 return (
  <button
   ref={buttonRef}
   type="button"
   aria-label={`Learn more about ${title}`}
   onClick={(e) => {
    e.stopPropagation();
    onNavigate(path);
   }}
   onMouseEnter={handleMouseEnter}
   onMouseLeave={handleMouseLeave}
   onFocus={handleMouseEnter}
   onBlur={handleMouseLeave}
   className="service-learn-more-btn group/btn inline-flex items-center text-sm font-semibold text-primary hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-lg py-1 px-1.5"
  >
   <span
    className={`service-learn-more-text overflow-hidden whitespace-nowrap transition-all duration-300 ease-out flex items-center ${
     isExpanded ? 'max-w-[110px] opacity-100 mr-1.5' : 'max-w-0 opacity-0 mr-0'
    }`}
   >
    <span className="font-semibold tracking-normal">{displayedText}</span>
    {isTyping && (
     <span className="inline-block w-0.5 h-3.5 bg-primary rounded-full animate-pulse ml-0.5" />
    )}
   </span>
   <span
    className={`service-learn-more-arrow material-icons-round text-base transition-transform duration-300 ease-out ${
     isExpanded ? 'translate-x-1' : 'translate-x-0'
    }`}
   >
    arrow_forward
   </span>
  </button>
 );
};

const Services = () => {
 const navigate = useNavigate();
 const [isConsultationOpen, setIsConsultationOpen] = useState(false);
 const [consultationOrigin, setConsultationOrigin] = useState(null); // 'hero' | 'default'
 const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
 const [expandedWhyChoose, setExpandedWhyChoose] = useState({});
 const [isDesktop, setIsDesktop] = useState(
  typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
 );

 useEffect(() => {
  const handleResize = () => {
   const desktop = window.innerWidth >= 1024;
   setIsDesktop(desktop);
   if (desktop) {
    setExpandedWhyChoose({});
   }
  };
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
 }, []);

 const handleWhyChooseCardClick = (idx) => {
  // Mobile only (< 1024px responsive breakpoint): tap to expand, tap again to collapse
  if (typeof window !== 'undefined' && window.innerWidth < 1024) {
   setExpandedWhyChoose((prev) => ({
    ...prev,
    [idx]: !prev[idx]
   }));
  }
 };

 const [openFaq, setOpenFaq] = useState(null);

 const toggleFaq = (index) => {
  setOpenFaq((prev) => (prev === index ? null : index));
 };

 const handleOpenHeroConsultation = () => {
  setConsultationOrigin('hero');
  setIsConsultationOpen(true);
 };

 const handleOpenDefaultConsultation = () => {
  setConsultationOrigin('default');
  setIsConsultationOpen(true);
 };

 const handleCloseConsultation = () => {
  setIsConsultationOpen(false);
  setTimeout(() => {
   setConsultationOrigin(null);
  }, 350);
 };

 const shouldReduceMotion = useReducedMotion();

 // Brand accent, depth glow, and highlight styles for the 5 Core Overview service cards
 const brandColorMap = {
  blue: {
   glowBg: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, rgba(59,130,246,0) 70%)',
   glowShadow: 'rgba(59, 130, 246, 0.08)',
   glowSecondary: 'rgba(59, 130, 246, 0.03)',
   iconBg: 'bg-blue-50/70 dark:bg-blue-900/25',
   iconText: 'text-blue-500 dark:text-blue-400',
   badgeBg: 'bg-blue-50/90 dark:bg-blue-900/30',
   badgeText: 'text-blue-600 dark:text-blue-300'
  },
  orange: {
   glowBg: 'radial-gradient(circle, rgba(249,115,22,0.06) 0%, rgba(249,115,22,0) 70%)',
   glowShadow: 'rgba(249, 115, 22, 0.08)',
   glowSecondary: 'rgba(249, 115, 22, 0.03)',
   iconBg: 'bg-orange-50 dark:bg-orange-900/30',
   iconText: 'text-orange-500 dark:text-orange-400',
   badgeBg: 'bg-orange-100 dark:bg-orange-900/50',
   badgeText: 'text-orange-800 dark:text-orange-200'
  },
  teal: {
   glowBg: 'radial-gradient(circle, rgba(13,148,136,0.06) 0%, rgba(13,148,136,0) 70%)',
   glowShadow: 'rgba(13, 148, 136, 0.08)',
   glowSecondary: 'rgba(13, 148, 136, 0.03)',
   iconBg: 'bg-teal-50 dark:bg-teal-900/30',
   iconText: 'text-teal-600 dark:text-teal-400',
   badgeBg: 'bg-teal-100 dark:bg-teal-900/50',
   badgeText: 'text-teal-800 dark:text-teal-200'
  },
  indigo: {
   glowBg: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, rgba(99,102,241,0) 70%)',
   glowShadow: 'rgba(99, 102, 241, 0.08)',
   glowSecondary: 'rgba(99, 102, 241, 0.03)',
   iconBg: 'bg-indigo-50 dark:bg-indigo-900/30',
   iconText: 'text-indigo-600 dark:text-indigo-400',
   badgeBg: 'bg-indigo-100 dark:bg-indigo-900/50',
   badgeText: 'text-indigo-800 dark:text-indigo-200'
  },
  pink: {
   glowBg: 'radial-gradient(circle, rgba(236,72,153,0.06) 0%, rgba(236,72,153,0) 70%)',
   glowShadow: 'rgba(236, 72, 153, 0.08)',
   glowSecondary: 'rgba(236, 72, 153, 0.03)',
   iconBg: 'bg-pink-50 dark:bg-pink-900/30',
   iconText: 'text-pink-600 dark:text-pink-400',
   badgeBg: 'bg-pink-100 dark:bg-pink-900/50',
   badgeText: 'text-pink-800 dark:text-pink-200'
  }
 };

 const coreCardsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
   opacity: 1,
   transition: {
    staggerChildren: 0.12,
    delayChildren: 0.05
   }
  }
 };

 const coreCardVariants = {
  hidden: {
   opacity: 0,
   y: 36
  },
  visible: {
   opacity: 1,
   y: 0,
   transition: {
    duration: 0.65,
    ease: [0.22, 1, 0.36, 1]
   }
  }
 };

 const activeCoreCardVariants = shouldReduceMotion
  ? {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.25 } }
    }
  : coreCardVariants;

 const handleHeadingTouch = useCallback((e) => {
  if (!e.touches || e.touches.length === 0) return;
  const touch = e.touches[0];
  const element = document.elementFromPoint(touch.clientX, touch.clientY);
  if (element && element.classList.contains('core-heading-letter')) {
   element.classList.add('is-hovered');
   setTimeout(() => {
    element.classList.remove('is-hovered');
   }, 500);
  }
 }, []);

 const coreEyebrowVariants = shouldReduceMotion
  ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
  : {
    hidden: { opacity: 0, y: 16, transition: { duration: 0.2 } },
    visible: {
     opacity: 1,
     y: 0,
     transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 }
    }
   };

 const coreHeadingLetterVariants = shouldReduceMotion
  ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
  : {
    hidden: { opacity: 0, y: 14, transition: { duration: 0.15 } },
    visible: (index) => ({
     opacity: 1,
     y: 0,
     transition: {
      duration: 0.38,
      delay: 0.28 + index * 0.032,
      ease: [0.22, 1, 0.36, 1]
     }
    })
   };

 const renderAnimatedHeading = useCallback((ariaLabel, segments, className = '') => {
  let count = 0;
  const wordsList = [];
  segments.forEach((seg) => {
   const words = seg.text.trim().split(/\s+/);
   words.forEach((word) => {
    const chars = word.split('').map((char) => ({
     char,
     index: count++
    }));
    wordsList.push({ word, chars, className: seg.className });
   });
  });

  return (
   <motion.h2
    aria-label={ariaLabel}
    className={`core-heading-title ${className}`}
   >
    <span className="sr-only">{ariaLabel}</span>
    <span
     aria-hidden="true"
     className="inline-block"
     onTouchMove={handleHeadingTouch}
     onTouchStart={handleHeadingTouch}
    >
     {wordsList.map(({ word, chars, className: wordClass }, wIdx) => (
      <span
       key={wIdx}
       className={`core-heading-word inline-block whitespace-nowrap mr-[0.28em] last:mr-0 ${wordClass || ''}`}
      >
       {chars.map(({ char, index }) => (
        <motion.span
         key={index}
         custom={index}
         variants={coreHeadingLetterVariants}
         className="core-heading-letter-motion inline-block"
        >
         <span
          className="core-heading-letter inline-block"
          data-char={char}
         >
          {char}
         </span>
        </motion.span>
       ))}
      </span>
     ))}
    </span>
   </motion.h2>
  );
 }, [handleHeadingTouch, coreHeadingLetterVariants]);

 const coreDescVariants = shouldReduceMotion
  ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
  : {
    hidden: { opacity: 0, y: 16, transition: { duration: 0.2 } },
    visible: {
     opacity: 1,
     y: 0,
     transition: { duration: 0.6, delay: 0.65, ease: [0.22, 1, 0.36, 1] }
    }
   };

 const coreUnderlineVariants = shouldReduceMotion
  ? { hidden: { opacity: 1, scale: 1 }, visible: { opacity: 1, scale: 1 } }
  : {
    hidden: { opacity: 0, scale: 0.85, transition: { duration: 0.2 } },
    visible: {
     opacity: 1,
     scale: 1,
     transition: { duration: 0.5, delay: 1.18, ease: [0.22, 1, 0.36, 1] }
    }
   };

 // Animation Variants
 const fadeInUp = {
 hidden: { opacity: 0, y: 40 },
 visible: {
 opacity: 1,
 y: 0,
 transition: { duration: 0.6, ease: "easeOut" }
 }
 };

 const staggerContainer = {
 hidden: { opacity: 0 },
 visible: {
 opacity: 1,
 transition: {
 staggerChildren: 0.15 // Delay between each child
 }
 }
 };

 const scaleIn = {
 hidden: { opacity: 0, scale: 0.9 },
 visible: {
 opacity: 1,
 scale: 1,
 transition: { duration: 0.5, ease: "easeOut" }
 }
 };

 const industryCardsContainerVariants = {
  hidden: {
   opacity: shouldReduceMotion ? 1 : 0,
   transition: {
    staggerChildren: 0.05,
    staggerDirection: -1
   }
  },
  visible: {
   opacity: 1,
   transition: shouldReduceMotion
    ? { duration: 0 }
    : {
      staggerChildren: 0.1,
      delayChildren: 0.06
     }
  }
 };

 const getIndustrySlideDirection = (idx) => {
  switch (idx) {
   case 0:
    return { x: -26, y: 0 }; // slide-left (top-left)
   case 1:
    return { x: 0, y: -26 }; // slide-down (top-center)
   case 2:
    return { x: 26, y: 0 };  // slide-right (top-right)
   case 3:
    return { x: -26, y: 0 }; // slide-left (bottom-left)
   case 4:
    return { x: 0, y: 26 };  // slide-up (bottom-center)
   case 5:
   default:
    return { x: 26, y: 0 };  // slide-right (bottom-right)
  }
 };

 const industryCardVariants = shouldReduceMotion
  ? { hidden: { opacity: 1, x: 0, y: 0 }, visible: { opacity: 1, x: 0, y: 0 } }
  : {
    hidden: (idx) => {
     const dir = getIndustrySlideDirection(idx);
     return {
      opacity: 0,
      x: dir.x,
      y: dir.y,
      transition: {
       duration: 0.28,
       ease: "easeIn"
      }
     };
    },
    visible: {
     opacity: 1,
     x: 0,
     y: 0,
     transition: {
      duration: 0.56,
      ease: [0.22, 1, 0.36, 1]
     }
    }
   };

 const industryIconVariants = shouldReduceMotion
  ? { hidden: { scale: 1, opacity: 1 }, visible: { scale: 1, opacity: 1 } }
  : {
    hidden: { scale: 0.78, opacity: 0 },
    visible: {
     scale: 1,
     opacity: 1,
     transition: {
      duration: 0.5,
      delay: 0.08,
      ease: [0.34, 1.56, 0.64, 1]
     }
    }
   };

 const handleIndustryPointerMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  e.currentTarget.style.setProperty('--card-mouse-x', `${x.toFixed(1)}px`);
  e.currentTarget.style.setProperty('--card-mouse-y', `${y.toFixed(1)}px`);
 };

 const whyChooseCardVariants = shouldReduceMotion
  ? { hidden: { opacity: 1, x: 0 }, visible: { opacity: 1, x: 0 } }
  : {
    hidden: (idx) => ({
     opacity: 0,
     x: idx % 2 === 0 ? -32 : 32
    }),
    visible: (idx) => ({
     opacity: 1,
     x: 0,
     transition: {
      duration: 0.55,
      delay: idx * 0.09,
      ease: [0.22, 1, 0.36, 1]
     }
    })
   };

 const whyChooseIconVariants = shouldReduceMotion
  ? { hidden: { scale: 1, opacity: 1 }, visible: { scale: 1, opacity: 1 } }
  : {
    hidden: (idx) => ({
     scale: 0.8,
     rotate: idx % 2 === 0 ? -10 : 10,
     opacity: 0.7
    }),
    visible: (idx) => ({
     scale: 1,
     rotate: 0,
     opacity: 1,
     transition: {
      duration: 0.5,
      delay: idx * 0.09 + 0.14,
      ease: [0.22, 1, 0.36, 1]
     }
    })
   };

 const whyChooseCards = [
  {
   icon: 'verified',
   title: 'Proven Expertise',
   desc: 'Experienced in delivering software development and IT services for multiple industries with scalable solutions.'
  },
  {
   icon: 'settings',
   title: 'Custom Solutions',
   desc: 'We build custom software, SaaS products, and automation systems tailored to your business workflows.'
  },
  {
   icon: 'support_agent',
   title: 'Dedicated Support',
   desc: 'Ongoing support and maintenance to ensure your systems run smoothly without downtime.'
  },
  {
   icon: 'bolt',
   title: 'Fast & Scalable',
   desc: 'Our solutions are designed for speed, performance, and long-term scalability.'
  },
  {
   icon: 'location_on',
   title: 'Local Expertise',
   desc: 'Based in Kumbakonam, we understand local business needs and provide practical IT solutions.'
  },
  {
   icon: 'trending_up',
   title: 'Growth Focused',
   desc: 'We focus on building systems that improve efficiency, reduce costs, and drive business growth.'
  }
 ];

 const ctaSectionContainerVariants = shouldReduceMotion
  ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
  : {
    hidden: { opacity: 0 },
    visible: {
     opacity: 1,
     transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08
     }
    }
   };

 const ctaSectionItemVariants = shouldReduceMotion
  ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
  : {
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

 const CTA_PARTICLES = [
  { id: 1, top: '16%', left: '8%', size: 3.5, duration: '14s', driftX: '18px', driftY: '-20px', delay: '0s' },
  { id: 2, top: '24%', right: '10%', size: 4, duration: '16s', driftX: '-20px', driftY: '-18px', delay: '2s' },
  { id: 3, top: '50%', left: '7%', size: 3, duration: '13s', driftX: '15px', driftY: '-15px', delay: '4s' },
  { id: 4, top: '44%', right: '8%', size: 3.5, duration: '15s', driftX: '-16px', driftY: '-22px', delay: '1s' },
  { id: 5, top: '80%', left: '12%', size: 4, duration: '17s', driftX: '22px', driftY: '-16px', delay: '3s' },
  { id: 6, top: '78%', right: '14%', size: 3, duration: '14s', driftX: '-18px', driftY: '-20px', delay: '5s' },
  { id: 7, top: '32%', left: '24%', size: 2.5, duration: '18s', driftX: '12px', driftY: '-14px', delay: '2.5s' },
  { id: 8, top: '68%', right: '25%', size: 2.5, duration: '15s', driftX: '-14px', driftY: '-18px', delay: '4.5s' }
 ];

 return (
 <div className="services-page pt-5 overflow-hidden">
 {/* HERO SECTION */}
 <section className="relative px-4 py-10 sm:py-14 md:px-8 xl:px-40 lg:py-20">
 <div className="mx-auto max-w-[1200px]">
 <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 items-center">

 {/* Text Content */}
 <motion.div
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, margin: "-100px" }}
 variants={staggerContainer}
 className="flex flex-col gap-5 order-2 lg:order-1"
 >
 <div className="flex flex-col gap-4 text-left">

 {/* SEO H1 */}
 <motion.h1
 variants={fadeInUp}
 aria-label="IT Services in Kumbakonam for Software Development & Business Automation"
 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-[#0d121b] dark:text-white"
 >
 <InteractiveLetters text="IT Services in Kumbakonam for" variant="neutral" />{' '}
 <InteractiveLetters text="Software Development & Business Automation" variant="primary" />
 </motion.h1>

 {/* SEO Paragraph */}
 <motion.p
 variants={fadeInUp}
 className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-300 max-w-lg"
 >
  <MagnifyingText text="SwordNex Technologies provides IT services including custom software development, SaaS solutions, billing, payroll, and system integration to help businesses streamline operations and grow efficiently." />
 </motion.p>

 </div>

 {/* CTA */}
 <motion.div
 variants={fadeInUp}
 className="flex flex-col sm:flex-row gap-3 pt-2"
 >
 <div className="relative inline-flex w-full sm:w-auto h-12 sm:h-14">
  <div className="invisible pointer-events-none h-12 sm:h-14 w-full sm:w-auto px-6 inline-flex items-center justify-center gap-2 select-none" aria-hidden="true">
   <span>Get Free Consultation</span>
   <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
  </div>

  {(!isConsultationOpen || consultationOrigin !== 'hero') && (
   <motion.div
    layoutId="hero-appointment-transform"
    transition={{
     type: 'spring',
     stiffness: 300,
     damping: 30,
     mass: 0.8,
    }}
    className="absolute inset-0"
   >
    <BorderRunnerButton
     onClick={handleOpenHeroConsultation}
     variant="primary"
     runnerColor="white"
     className="h-full w-full px-6 text-sm sm:text-base font-semibold shadow-lg shadow-blue-500/20"
    >
     <span>Get Free Consultation</span>
     <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
    </BorderRunnerButton>
   </motion.div>
  )}
 </div>

 <BorderRunnerButton
  href="#services-inline"
  variant="secondary"
  runnerColor="blue"
  className="h-12 sm:h-14 w-full sm:w-auto px-6 text-sm sm:text-base font-semibold"
 >
  View All Services
 </BorderRunnerButton>
 </motion.div>

 {/* Trust Indicators */}
 <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-gray-100 dark:border-gray-800 mt-2">
  <TrustStatCounter target={50} targetValue={50} label="Projects Delivered" suffix="+" />
  <TrustStatCounter target={100} targetValue={100} label="Client Satisfaction" suffix="%" />
  <TrustStatCounter value="SMB" label="Focused Solutions" />
 </div>

 </motion.div>

 {/* Visual Content */}
 <motion.div
 initial={{ opacity: 0, x: 40 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.8, delay: 0.2 }}
 className="relative order-1 lg:order-2 h-full min-h-[250px] sm:min-h-[300px] lg:min-h-[450px]"
 >
 <div className="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 shadow-xl relative aspect-square lg:aspect-auto">
  <InteractiveServicesHero />
  <div className="absolute -top-6 -right-6 size-20 sm:size-24 bg-primary rounded-full opacity-10 blur-2xl pointer-events-none"></div>
  <div className="absolute -bottom-10 -left-10 size-32 sm:size-40 bg-blue-400 rounded-full opacity-10 blur-3xl pointer-events-none"></div>
 </div>
 </motion.div>

 </div>
 </div>

 {/* Hidden SEO Boost */}
 <p className="hidden">
 SwordNex Technologies offers IT services in Kumbakonam including software development, SaaS products, billing software, payroll systems, and business automation solutions for small and medium businesses.
 </p>
 </section>

 {/* SERVICES LIST */}
 <section className="relative py-20 lg:py-28 overflow-hidden" id="services-inline">
 <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200/20 dark:bg-blue-900/10 rounded-full blur-3xl pointer-events-none"></div>
 <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-[500px] h-[500px] bg-indigo-200/20 dark:bg-indigo-900/10 rounded-full blur-3xl pointer-events-none"></div>

 <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
 <motion.div
 initial="hidden"
 whileInView="visible"
 viewport={{ once: false, amount: 0.25 }}
 className="max-w-3xl mx-auto text-center mb-16 lg:mb-20"
 >
 <motion.span
 variants={coreEyebrowVariants}
 className="core-heading-eyebrow inline-block text-primary font-semibold tracking-wider uppercase text-sm mb-3"
 >
 What We Do
 </motion.span>
 {renderAnimatedHeading(
  'Core Services Overview',
  [{ text: 'Core Services Overview' }],
  'text-3xl lg:text-4xl font-display font-bold text-slate-900 dark:text-white mb-6'
 )}
 <motion.p
 variants={coreDescVariants}
 className="text-lg text-slate-500 dark:text-slate-400"
 >
  <InteractiveDescription text="Comprehensive digital solutions designed to scale with your business. From custom development to strategic growth." />
 </motion.p>
 </motion.div>
 <motion.div
  variants={coreCardsContainerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.15 }}
  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
 >
 {[
 {
 icon: 'widgets',
 title: 'Web & App Development Services',
 desc: 'Custom website development, web applications, and mobile apps built to streamline business operations and improve performance.',
 badge: 'Scalable Solutions',
 color: 'blue',
 path: "/services/application-development"
 },
 {
 icon: 'campaign',
 title: 'Digital Media',
 desc: 'Performance-driven campaigns and content that increase brand visibility and engagement.',
 badge: 'Leads with clarity',
 color: 'orange',
 path: "/services/digital-media"
 },
 {
 icon: 'school',
 title: 'IT Training & Skill Development',
 desc: 'Job-oriented training in full stack, Python, and web technologies to enhance career skills.',
 badge: 'Skills that ship…',
 color: 'teal',
 path: "/services/it-training-skill-development"
 },
 // { 
 // icon: 'auto_awesome', 
 // title: 'Brand & Experience Strategy', 
 // desc: 'Strategic brand positioning, messaging, and UX design for seamless user experiences.', 
 // badge: 'Experience-led growth', 
 // color: 'purple', 
 // path: "/Service4" 
 // },
 {
 icon: 'dns',
 title: 'IT Infrastructure',
 desc: 'Secure, monitored networks and servers that ensure reliable business operations.',
 badge: 'Reliable foundations',
 color: 'indigo',
 path: "/services/it-infrastructure"
 },
 {
 icon: 'groups',
 title: 'HR Consulting Services',
 desc: 'Comprehensive HR solutions including payroll, compliance, and people-operations management.',
 badge: 'People-first solutions',
 color: 'pink',
 path: "/services/hr-consulting"
 },
  ].map((service, idx) => {
   const brand = brandColorMap[service.color] || brandColorMap.blue;
   return (
    <motion.div
     key={idx}
     variants={activeCoreCardVariants}
     className="core-service-card-wrapper h-full flex flex-col"
    >
     <div
      tabIndex={0}
      style={{
       '--card-glow-shadow': brand.glowShadow,
       '--card-glow-secondary': brand.glowSecondary,
       '--card-index': idx
      }}
      className={`core-service-card core-service-card-${service.color} group relative overflow-hidden rounded-2xl p-8 bg-card-light dark:bg-card-dark bg-white dark:bg-slate-900 border flex flex-col h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 cursor-pointer`}
      onClick={() => navigate(service.path)}
      onKeyDown={(e) => {
       if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        navigate(service.path);
       }
      }}
     >
      {/* Subtle Ambient Depth Glow in Brand Color */}
      <div
       className="core-service-card-glow pointer-events-none absolute -top-24 -right-24 w-56 h-56 rounded-full blur-3xl opacity-0 transition-opacity duration-500 ease-out"
       style={{ background: brand.glowBg }}
       aria-hidden="true"
      />
      <div
       className="core-service-card-glow-secondary pointer-events-none absolute -bottom-24 -left-24 w-48 h-48 rounded-full blur-3xl opacity-0 transition-opacity duration-500 ease-out"
       style={{ background: brand.glowBg }}
       aria-hidden="true"
      />

      <div className="relative z-10 mb-6 flex-grow">
       <div className={`core-service-icon-box w-14 h-14 rounded-xl ${brand.iconBg} ${brand.iconText} flex items-center justify-center text-3xl mb-6`}>
        <span className="core-service-icon-glyph material-icons-round">{service.icon}</span>
       </div>
       <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-3">
        {service.title}
       </h3>
       <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4 flex-grow">
        {service.desc}
       </p>
      </div>

      <div className="relative z-10 mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${brand.badgeBg} ${brand.badgeText}`}>
        {service.badge}
       </span>
       <LearnMoreTypingButton
        path={service.path}
        title={service.title}
        onNavigate={navigate}
        cardIndex={idx}
       />
      </div>
     </div>
    </motion.div>
   );
  })}
 </motion.div>

 </div>
 </section>

 {/* PROCESS SECTION */}
 <section className="py-24 bg-white dark:bg-[#151a25]">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: false, amount: 0.25 }}
  className="text-center max-w-3xl mx-auto mb-20"
 >
  {renderAnimatedHeading(
   'How Our Services Work',
   [{ text: 'How Our Services Work' }],
   'text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white font-display mb-4'
  )}
  <motion.div
   variants={coreUnderlineVariants}
   className="w-20 h-1.5 bg-primary rounded-full mx-auto"
  ></motion.div>
 </motion.div>

 <motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={staggerContainer}
  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative"
 >
 <div className="hidden lg:block absolute top-10 left-0 w-full h-0.5 bg-gray-100 dark:bg-gray-800 process-timeline-line -z-0"></div>
 {[
 { step: 1, icon: 'person_search', title: 'Discovery call', desc: 'Understand your team and tools.' },
 { step: 2, icon: 'map', title: 'Roadmap', desc: 'Pick quick wins and long‑term systems.' },
 { step: 3, icon: 'construction', title: 'Build & integrate', desc: 'Websites, apps, and automations.' },
 { step: 4, icon: 'support_agent', title: 'Support', desc: 'Monitoring, updates, and new features.' }
 ].map((item, idx) => (
 <motion.div
 key={idx}
 variants={scaleIn}
 tabIndex={0}
 className="relative z-10 flex flex-col items-center text-center group cursor-default outline-none"
 >
 <div className="process-step-box w-20 h-20 rounded-3xl bg-white dark:bg-[#1e2536] border border-gray-100 dark:border-gray-700 flex items-center justify-center mb-6 relative">
 <span className="process-step-badge absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold border-4 border-white dark:border-[#151a25] select-none">{item.step}</span>
 <span className="process-step-icon material-symbols-outlined text-4xl text-primary select-none">{item.icon}</span>
 </div>
 <h3 className="process-step-title text-xl font-bold text-gray-900 dark:text-white mb-3 font-display">{item.title}</h3>
 <p className="process-step-desc text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-[200px]">{item.desc}</p>
 </motion.div>
 ))}
 </motion.div>
 </div>
 </section>

 {/* INDUSTRIES SECTION */}
 <section className="py-20 px-4 bg-white dark:bg-[#1A202C] border-t border-gray-100 dark:border-gray-800 overflow-hidden">
 <div className="max-w-6xl mx-auto">
 <motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: false, amount: 0.25 }}
  className="flex flex-col items-center text-center mb-16"
 >
 <motion.span
  variants={coreEyebrowVariants}
  className="core-heading-eyebrow inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2"
 >
  Target Audience
 </motion.span>
 {renderAnimatedHeading(
  'Industries We Serve',
  [
   { text: 'Industries We' },
   { text: 'Serve', className: 'text-primary' }
  ],
  'text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white font-display'
 )}
 <motion.p
  variants={coreDescVariants}
  className="mt-4 text-gray-500 dark:text-gray-400 text-lg max-w-2xl"
 >
  <InteractiveDescription text="Our platforms and digital solutions support diverse business models. Explore the industries we empower the most." />
 </motion.p>
 </motion.div>

 <motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: false, amount: 0.15 }}
  variants={industryCardsContainerVariants}
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto"
 >
 {[
 {
  color: 'blue',
  accent: '#2563eb',
  iconBgHover: 'rgba(37, 99, 235, 0.12)',
  iconBgHoverDark: 'rgba(37, 99, 235, 0.24)',
  glow: 'rgba(37, 99, 235, 0.15)',
  glowSoft: 'rgba(37, 99, 235, 0.06)',
  borderHover: 'rgba(37, 99, 235, 0.25)',
  icon: 'storefront',
  title: 'Retail & Wholesale',
  desc: 'Point-of-sale and inventory solutions for multi-store management.'
 },
 {
  color: 'green',
  accent: '#10b981',
  iconBgHover: 'rgba(16, 185, 129, 0.12)',
  iconBgHoverDark: 'rgba(16, 185, 129, 0.24)',
  glow: 'rgba(16, 185, 129, 0.15)',
  glowSoft: 'rgba(16, 185, 129, 0.06)',
  borderHover: 'rgba(16, 185, 129, 0.25)',
  icon: 'design_services',
  title: 'Service Businesses',
  desc: 'Project management tools and client portals to streamline workflows.'
 },
 {
  color: 'indigo',
  accent: '#6366f1',
  iconBgHover: 'rgba(99, 102, 241, 0.12)',
  iconBgHoverDark: 'rgba(99, 102, 241, 0.24)',
  glow: 'rgba(99, 102, 241, 0.15)',
  glowSoft: 'rgba(99, 102, 241, 0.06)',
  borderHover: 'rgba(99, 102, 241, 0.25)',
  icon: 'school',
  title: 'Educational Institutions',
  desc: 'Student information management and automated fee collection.'
 },
 {
  color: 'green',
  accent: '#059669',
  iconBgHover: 'rgba(5, 150, 105, 0.12)',
  iconBgHoverDark: 'rgba(5, 150, 105, 0.24)',
  glow: 'rgba(5, 150, 105, 0.15)',
  glowSoft: 'rgba(5, 150, 105, 0.06)',
  borderHover: 'rgba(5, 150, 105, 0.25)',
  icon: 'factory',
  title: 'Manufacturing',
  desc: 'Production monitoring and workflow automation.'
 },
 {
  color: 'indigo',
  accent: '#4f46e5',
  iconBgHover: 'rgba(79, 70, 229, 0.12)',
  iconBgHoverDark: 'rgba(79, 70, 229, 0.24)',
  glow: 'rgba(79, 70, 229, 0.15)',
  glowSoft: 'rgba(79, 70, 229, 0.06)',
  borderHover: 'rgba(79, 70, 229, 0.25)',
  icon: 'local_hospital',
  title: 'Healthcare & Clinics',
  desc: 'Patient management and appointment scheduling.'
 },
 {
  color: 'teal',
  accent: '#0d9488',
  iconBgHover: 'rgba(13, 148, 136, 0.12)',
  iconBgHoverDark: 'rgba(13, 148, 136, 0.24)',
  glow: 'rgba(13, 148, 136, 0.15)',
  glowSoft: 'rgba(13, 148, 136, 0.06)',
  borderHover: 'rgba(13, 148, 136, 0.25)',
  icon: 'shopping_cart',
  title: 'E-Commerce',
  desc: 'Custom online stores and payment integrations.'
 }
 ].map((industry, idx) => (
 <motion.div
 key={idx}
 custom={idx}
 variants={industryCardVariants}
 whileHover={shouldReduceMotion ? {} : { scale: 1.025, y: -4, transition: { duration: 0.32, ease: [0.25, 1, 0.5, 1] } }}
 whileTap={shouldReduceMotion ? {} : { scale: 0.985, y: -2, transition: { duration: 0.12 } }}
 tabIndex={0}
 onMouseMove={handleIndustryPointerMove}
 style={{
  '--industry-accent': industry.accent,
  '--industry-icon-bg-hover': industry.iconBgHover,
  '--industry-icon-bg-hover-dark': industry.iconBgHoverDark,
  '--industry-glow': industry.glow,
  '--industry-glow-soft': industry.glowSoft,
  '--industry-border-hover': industry.borderHover
 }}
 className="industry-card group relative overflow-hidden rounded-2xl p-5 sm:p-6 cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
 >
 {/* Subtle animated border light sweep along card edges */}
 <div className="industry-card-border-glow pointer-events-none absolute inset-0 rounded-[inherit]" aria-hidden="true">
  <div className="industry-card-border-glow-beam" />
 </div>
 {/* Dynamic cursor-following radial spotlight highlight */}
 <div
  className="industry-card-spotlight pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 ease-out opacity-0 group-hover:opacity-100"
  style={{
   background: `radial-gradient(circle 240px at var(--card-mouse-x, 50%) var(--card-mouse-y, 50%), ${industry.glowSoft}, transparent 70%)`
  }}
  aria-hidden="true"
 />

 {/* Smooth light sweep beam across card */}
 <div className="industry-card-sweep pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden" aria-hidden="true">
  <div className="industry-card-sweep-beam" />
 </div>

 {/* Layered ambient depth glow in corner */}
 <div
  className="industry-card-ambient pointer-events-none absolute right-0 top-0 -mt-6 -mr-6 sm:-mt-8 sm:-mr-8 h-28 w-28 sm:h-32 sm:w-32 rounded-full blur-2xl sm:blur-3xl opacity-20 dark:opacity-30 transition-all duration-500 ease-out group-hover:opacity-75 group-hover:scale-125"
  style={{ background: `radial-gradient(circle, ${industry.glow} 0%, transparent 70%)` }}
  aria-hidden="true"
 />

 <div className="relative z-10 flex flex-col h-full items-center text-center">
 <motion.div
  variants={industryIconVariants}
  className="industry-icon-box mb-4 inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl"
 >
  <span className="industry-icon-glyph material-symbols-outlined text-3xl sm:text-[34px] select-none">{industry.icon}</span>
 </motion.div>
 <h3 className="industry-title mb-2 text-lg sm:text-[19px] font-bold text-gray-900 dark:text-white font-display tracking-tight">{industry.title}</h3>
 <p className="industry-desc text-gray-500 dark:text-gray-400 text-xs sm:text-sm leading-relaxed max-w-[270px] mx-auto">{industry.desc}</p>
 </div>
 </motion.div>
 ))}
 </motion.div>
 </div>
 </section>
 <section className="py-12 sm:py-16 lg:py-20 px-4 bg-white dark:bg-slate-900 scroll-animate overflow-hidden">
 <div className="max-w-6xl mx-auto">

 {/* Header */}
 <motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: false, amount: 0.2 }}
  className="text-center max-w-5xl mx-auto mb-10 sm:mb-14"
 >
 <motion.span
  variants={coreEyebrowVariants}
  className="core-heading-eyebrow inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold uppercase tracking-wide mb-3"
 >
 Why Choose Us
 </motion.span>

 {renderAnimatedHeading(
  'Trusted IT Company in Kumbakonam for Business Growth',
  [
   { text: 'Trusted IT Company in Kumbakonam for' },
   { text: 'Business Growth', className: 'text-primary' }
  ],
  'text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4'
 )}

 <motion.p
  variants={coreDescVariants}
  className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed"
 >
  <InteractiveDescription text="We deliver reliable IT services, custom software development, and business automation solutions tailored for small and medium businesses." />
 </motion.p>
 </motion.div>

 {/* Cards */}
 <motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.15 }}
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start"
 >
 {whyChooseCards.map((card, idx) => {
  const isCardExpanded = Boolean(expandedWhyChoose[idx]);
  return (
   <motion.div
    key={idx}
    custom={idx}
    variants={whyChooseCardVariants}
    whileHover={shouldReduceMotion || !isDesktop ? {} : { y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
    whileTap={shouldReduceMotion ? {} : { scale: 0.98, transition: { duration: 0.12 } }}
    onClick={() => handleWhyChooseCardClick(idx)}
    role={isDesktop ? undefined : 'button'}
    tabIndex={isDesktop ? undefined : 0}
    aria-expanded={isDesktop ? undefined : isCardExpanded}
    onKeyDown={(e) => {
     if (!isDesktop && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      handleWhyChooseCardClick(idx);
     }
    }}
    className={`why-choose-card relative overflow-hidden p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm cursor-pointer select-none ${
     !isDesktop && isCardExpanded ? 'is-expanded' : ''
    }`}
   >
    {/* Subtle glowing sweep effect along card border while hovering */}
    <div className="why-choose-border-sweep" aria-hidden="true" />

    {/* Top Header: Logo / Icon container on left, small clear ^ indicator on right */}
    <div className="flex items-center justify-between mb-4">
     <motion.div
      custom={idx}
      variants={whyChooseIconVariants}
      className="why-choose-icon-box w-12 h-12 rounded-xl flex items-center justify-center"
     >
      <span className="why-choose-icon material-symbols-outlined text-3xl select-none">
       {card.icon}
      </span>
     </motion.div>

     <div
      className="why-choose-indicator"
      aria-hidden="true"
     >
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
    </div>

    {/* Title */}
    <h3 className="why-choose-title text-lg font-bold text-slate-900 dark:text-white">
     {card.title}
    </h3>

    {/* Description: smoothly expands on hover (desktop) or tap (mobile), collapses automatically when cursor leaves or tapped again */}
    <div className="why-choose-desc-wrapper">
     <div className="why-choose-desc-inner">
      <p className="text-sm text-slate-600 dark:text-slate-400 pt-3 leading-relaxed">
       {card.desc}
      </p>
     </div>
    </div>
   </motion.div>
  );
 })}
 </motion.div>

 </div>

 {/* Hidden SEO Boost */}
 <p className="hidden">
 SwordNex Technologies is a trusted IT company in Kumbakonam offering software development, SaaS solutions, IT services, and business automation for small and medium businesses in Tamil Nadu.
 </p>
 </section>
 <section className="relative py-14 sm:py-16 lg:py-20 px-4 scroll-animate">

 <div className="max-w-7xl mx-auto">

 <div
  className="relative bg-primary rounded-3xl overflow-hidden shadow-2xl cta-card-container group/cta"
  onMouseMove={(e) => {
   const rect = e.currentTarget.getBoundingClientRect();
   e.currentTarget.style.setProperty('--cta-mouse-x', `${(e.clientX - rect.left).toFixed(1)}px`);
   e.currentTarget.style.setProperty('--cta-mouse-y', `${(e.clientY - rect.top).toFixed(1)}px`);
  }}
 >

 {/* Background Effects */}
 <div className="absolute inset-0 opacity-10 pointer-events-none">
 <div className="absolute -top-20 -left-20 w-60 h-60 bg-white rounded-full blur-3xl"></div>
 <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
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

 {/* 4. Scroll-Triggered Content Reveal */}
 <motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: false, amount: 0.25 }}
  variants={ctaSectionContainerVariants}
  className="relative z-10 flex flex-col items-center text-center px-6 py-12 sm:px-10 sm:py-16 lg:py-20"
 >

 {/* Heading */}
 <motion.h2
  variants={ctaSectionItemVariants}
  className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight max-w-5xl mb-4 font-display"
 >
 Looking for the Best IT Services in Kumbakonam?
 </motion.h2>

 {/* Subtext */}
 <motion.p
  variants={ctaSectionItemVariants}
  className="text-blue-100 text-sm sm:text-base lg:text-lg max-w-4xl mb-8 leading-relaxed"
 >
 Get custom software development, SaaS solutions, and business automation tailored to your needs. Let’s build something powerful together.
 </motion.p>

 {/* 2. Interactive CTA Buttons */}
 <motion.div
  variants={ctaSectionItemVariants}
  className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center"
 >

 {/* Primary CTA: Get Free Consultation reusing exact BorderRunnerButton with matching hover animation */}
 <BorderRunnerButton
  onClick={handleOpenDefaultConsultation}
  variant="white"
  runnerColor="blue"
  className="h-12 sm:h-14 w-full sm:w-auto px-6 sm:px-8 text-sm sm:text-base font-semibold rounded-xl shadow-md"
  aria-label="Get Free Consultation"
 >
  <span>Get Free Consultation</span>
  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
 </BorderRunnerButton>

 {/* Secondary CTA: Call Now with subtle blue-white border glow and slight lift */}
 <a
  href="tel:+919XXXXXXXXX"
  className="cta-btn-call-glow flex items-center justify-center gap-2 h-12 sm:h-14 px-6 sm:px-8 border border-white/40 text-white font-medium rounded-xl transition-all"
  aria-label="Call Now"
 >
  <span>Call Now</span>
  <span className="material-symbols-outlined text-[18px]">call</span>
 </a>

 </motion.div>

 {/* Benefits Line */}
 <motion.p
  variants={ctaSectionItemVariants}
  className="cta-benefits-line text-blue-200 text-xs sm:text-sm mt-5 font-medium flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5"
 >
  <span className="cta-benefit-pill">✔ Free consultation</span>
  <span className="text-blue-300/60 select-none">•</span>
  <span className="cta-benefit-pill">✔ Quick response</span>
  <span className="text-blue-300/60 select-none">•</span>
  <span className="cta-benefit-pill">✔ No hidden charges</span>
 </motion.p>

 </motion.div>

 </div>

 </div>

 {/* Hidden SEO Boost */}
 <p className="hidden">
 Contact SwordNex Technologies for IT services in Kumbakonam including software development, SaaS applications, web development, and business automation solutions for small and medium businesses.
 </p>

 </section>
 <section className="py-14 sm:py-16 lg:py-20 px-4 bg-slate-50 dark:bg-slate-900 scroll-animate">

 <div className="max-w-4xl mx-auto">

 {/* Header */}
 <motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: false, amount: 0.25 }}
  className="text-center mb-10 sm:mb-14"
 >
 <motion.span
  variants={coreEyebrowVariants}
  className="core-heading-eyebrow inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold uppercase tracking-wide mb-3"
 >
 FAQ
 </motion.span>

 {renderAnimatedHeading(
  'Frequently Asked Questions About Our IT Services',
  [{ text: 'Frequently Asked Questions About Our IT Services' }],
  'text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4'
 )}

 <motion.p
  variants={coreDescVariants}
  className="text-sm sm:text-base text-slate-600 dark:text-slate-400"
 >
  <InteractiveDescription text="Find answers to common questions about software development, IT services, and business solutions." />
 </motion.p>
 </motion.div>

 {/* FAQ Items */}
 <div className="space-y-3">

 {[
 {
 q: "What IT services do you provide in Kumbakonam?",
 a: "We offer complete IT services including web development, app development, SaaS products, system integration, IT infrastructure, and business automation solutions."
 },
 {
 q: "How much does software development cost?",
 a: "The cost depends on your requirements, features, and complexity. We provide affordable custom pricing for small and medium businesses."
 },
 {
 q: "Do you provide custom software solutions?",
 a: "Yes, we specialize in custom software development tailored to your business workflows, ensuring scalability and performance."
 },
 {
 q: "How long does it take to develop a website or application?",
 a: "Project timelines vary based on features and scope. A basic website may take 2–4 weeks, while complex applications may take longer."
 },
 {
 q: "Do you provide support after development?",
 a: "Yes, we offer ongoing maintenance and support to ensure your systems run smoothly and securely."
 },
 {
 q: "Do you work with small businesses and startups?",
 a: "Yes, we focus on small and medium businesses, helping them grow with scalable and cost-effective IT solutions."
 }
 ].map((item, index) => {
  const isOpen = openFaq === index;
  return (
   <div
    key={index}
    className="border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 shadow-sm transition-colors duration-200 hover:border-slate-300 dark:hover:border-slate-600 overflow-hidden"
   >
    <button
     type="button"
     onClick={() => toggleFaq(index)}
     id={`faq-question-${index}`}
     aria-expanded={isOpen}
     aria-controls={`faq-answer-${index}`}
     className="w-full text-left py-3.5 sm:py-4 px-4 sm:px-5 flex items-center justify-between gap-4 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 group"
    >
     <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-blue-400 transition-colors leading-snug">
      {item.q}
     </h3>
     <div
      className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
       isOpen
        ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-blue-400'
        : 'bg-slate-100 text-slate-500 dark:bg-slate-700/60 dark:text-slate-400 group-hover:bg-primary/10 group-hover:text-primary'
      }`}
      aria-hidden="true"
     >
      <svg
       className={`w-4 h-4 transition-transform duration-300 ease-out ${
        isOpen ? 'rotate-180' : 'rotate-0'
       }`}
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
    </button>

    <div
     id={`faq-answer-${index}`}
     role="region"
     aria-labelledby={`faq-question-${index}`}
     className={`faq-answer-wrapper ${isOpen ? 'is-open' : ''}`}
    >
     <div className="faq-answer-inner px-4 sm:px-5 pb-3.5 sm:pb-4">
      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed pt-3 sm:pt-3.5 border-t border-slate-100 dark:border-slate-700/60">
       {item.a}
      </p>
     </div>
    </div>
   </div>
  );
 })}

 </div>

 </div>

 {/* Hidden SEO Boost */}
 <p className="hidden">
 FAQ about IT services in Kumbakonam including software development cost, web development timeline, SaaS solutions, and custom IT services for small and medium businesses.
 </p>

 </section>
 <ConsultationModal isOpen={isConsultationOpen} onClose={handleCloseConsultation} isHeroTransform={consultationOrigin === 'hero'} />
 <ServiceEnquiryModal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />
 </div>
 );
};

export default Services;