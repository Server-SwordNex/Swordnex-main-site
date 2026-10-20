import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ConsultationModal from '../components/ConsultationModal';
import InteractiveLetters from '../components/UI/InteractiveLetters';
import InteractiveEarth from '../components/UI/InteractiveEarth';
import Interactive3DTextBlock from '../components/UI/Interactive3DTextBlock';
import Interactive3DCard from '../components/UI/Interactive3DCard';
import TrustStatCounter from '../components/UI/TrustStatCounter';
import TypewriterQuote from '../components/UI/TypewriterQuote';
import Interactive3DPortrait from '../components/UI/Interactive3DPortrait';
import kaja from '../assets/Founder_1.jpeg';
import { Helmet } from 'react-helmet-async';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa6';
import './AboutSections.css';

// Motion variants for smooth in-view reveal animations
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardSlideLeft = {
  hidden: { opacity: 0, x: -35 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 260, damping: 25 },
  },
};

const cardSlideRight = {
  hidden: { opacity: 0, x: 35 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 260, damping: 25 },
  },
};

// Container for the 3 Framework Flip Cards with sequential drop order
const frameworkCardsContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.22, // Sequentially drops each card in order
      delayChildren: 0.12,
    },
  },
};

// Physics-driven gravity fall-and-land spring animation
const cardFallAndLand = {
  hidden: {
    opacity: 0,
    y: -95,
    scale: 0.93,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 280,
      damping: 18,
      mass: 1.15,
    },
  },
};

// Container for Mission & Vision cards coming from the left
const missionVisionContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.05,
    },
  },
};

// "Our Mission" card comes from left side of screen and stops in position
const missionCardSlideFromLeft = {
  hidden: {
    opacity: 0,
    x: -320,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 130,
      damping: 19,
      mass: 0.95,
    },
  },
};

// "Our Vision" card also comes from left side of screen and stops in position
const visionCardSlideFromLeft = {
  hidden: {
    opacity: 0,
    x: -420,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 130,
      damping: 19,
      mass: 0.95,
    },
  },
};

const cardFlipLeft = {
  hidden: {
    opacity: 0,
    x: -160,
    rotateY: -65,
    scale: 0.88,
    transition: {
      duration: 0.25,
      ease: 'easeIn',
    },
  },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    scale: 1,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const cardFlipRight = {
  hidden: {
    opacity: 0,
    x: 160,
    rotateY: 65,
    scale: 0.88,
    transition: {
      duration: 0.25,
      ease: 'easeIn',
    },
  },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    scale: 1,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const cardContentReveal = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.14, // Text appears soon during the card flip transition
      staggerChildren: 0.06,
    },
  },
};

const cardItemReveal = {
  hidden: {
    opacity: 0,
    y: 10,
    filter: 'blur(3px)',
    transition: {
      duration: 0.1,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.38,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const About = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOrigin, setModalOrigin] = useState(null); // 'hero' | 'default'
  const [hoveredCard, setHoveredCard] = useState(null); // 'card1' | 'card2' | null
  const [flippedFrameworkCard, setFlippedFrameworkCard] = useState(null);
  const [expandedMissionVisionCard, setExpandedMissionVisionCard] = useState(null);

  const handleOpenHeroModal = () => {
    setModalOrigin('hero');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setModalOrigin(null);
    }, 350);
  };

  return (
    <div className="about-page w-full overflow-hidden">
      <Helmet>
        <title>Professional IT Services & Training Hub | SwordNex</title>

        <meta
          name="description"
          content="Learn about SwordNex, an IT solutions provider in Tamil Nadu. We bridge the gap between education and industry through software training programs."
        />

        <meta
          name="keywords"
          content="about SwordNex Technologies, IT company in Kumbakonam, software company Kumbakonam, IT services Tamil Nadu, SaaS development company, business software solutions"
        />

        <meta name="robots" content="index, follow" />

        <link rel="canonical" href="https://swordnex.com/about" />

        {/* Open Graph */}
        <meta property="og:title" content="About SwordNex Technologies | IT Company in Kumbakonam" />
        <meta
          property="og:description"
          content="Learn about SwordNex Technologies, a trusted IT company in Kumbakonam delivering software and IT solutions for business growth."
        />
        <meta property="og:url" content="https://swordnex.com/about" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* SECTION 1: Hero & Interactive Ecosystem */}
      <section className="relative w-full pt-8 pb-16 sm:py-16 lg:py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 xl:px-16 flex flex-col justify-center"
        >
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14 items-center">
            {/* Left Column: Text & CTAs */}
            <div className="flex flex-col gap-6 order-2 lg:order-1">
              <motion.div variants={fadeUp} className="flex flex-col gap-4 text-left">
                <h1
                  aria-label="Leading IT Company for Software Development & Enterprise Solutions"
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-[#0d121b] dark:text-white"
                >
                  <InteractiveLetters text="Leading IT Company for" variant="neutral" />{' '}
                  <InteractiveLetters text="Software Development & Enterprise Solutions" variant="primary" />
                </h1>

                <Interactive3DTextBlock
                  text="SwordNex Technologies is a premier IT Solutions provider in Tamil Nadu, delivering Custom Software Development, SaaS products, and professional IT services to help businesses scale and dominate the digital landscape."
                />
              </motion.div>

              {/* Trust Indicators */}
              <motion.div variants={fadeUp} className="flex items-center gap-6 sm:gap-10 pt-4 border-t border-slate-200 dark:border-slate-800">
                <TrustStatCounter target={50} targetValue={50} label="Projects Delivered" suffix="+" />
                <div className="w-px h-8 bg-slate-200 dark:bg-slate-700" />
                <TrustStatCounter target={100} targetValue={100} label="Client Satisfaction" suffix="%" />
              </motion.div>
            </div>

            {/* Right Column: Dotted Interactive Earth Ecosystem */}
            <motion.div
              variants={fadeUp}
              className="order-1 lg:order-2 flex justify-center items-center relative py-4 lg:py-0 w-full"
            >
              <InteractiveEarth />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: Why Choose Us & Enterprise Solutions */}
      <section id="section-solutions" className="relative w-full py-16 sm:py-20 lg:py-24 bg-slate-50/60 dark:bg-slate-900/40 border-y border-slate-100 dark:border-slate-800/60 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
          {/* Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="max-w-4xl text-center flex flex-col items-center gap-3 mb-10 sm:mb-12"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
              Why Choose Our IT Services
            </span>

            <h2 className="business-growth-heading text-gray-900 dark:text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight cursor-default">
              High-Performance IT Solutions for <span className="text-primary business-growth-glow">Business Growth</span>
            </h2>

            <p className="about-service-description text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
              We provide IT services in Kumbakonam including custom software development, SaaS solutions, and business automation tools to help companies operate faster, smarter, and more efficiently.
            </p>
          </motion.div>

          {/* 2 Service Cards with 3D Side-Flip and Delayed Text Reveal */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 w-full max-w-5xl"
            style={{ perspective: 1200 }}
          >
            {/* Card 1: Enterprise Software Development (Flips in from Left) */}
            <motion.article
              variants={cardFlipLeft}
              style={{
                transformStyle: 'preserve-3d',
                zIndex: hoveredCard === 'card1' ? 40 : 1,
              }}
              className={`h-full relative transition-[z-index] ${hoveredCard === 'card1' ? 'z-40' : 'z-[1]'}`}
            >
              <Interactive3DCard
                theme="blue"
                onHoverChange={(hovered) => setHoveredCard(hovered ? 'card1' : null)}
                className="group relative rounded-3xl bg-white dark:bg-[#1e2536] p-6 sm:p-8 md:p-10 shadow-md h-full flex flex-col justify-between"
              >
                <motion.div
                  variants={cardContentReveal}
                  className="relative z-10 flex flex-col items-start h-full"
                >
                  <motion.div
                    variants={cardItemReveal}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center bg-blue-50 dark:bg-blue-900/20 text-primary mb-5 group-hover:bg-primary group-hover:text-white transition-colors duration-300"
                  >
                    <span className="material-symbols-outlined text-3xl sm:text-4xl">design_services</span>
                  </motion.div>

                  <motion.h3
                    variants={cardItemReveal}
                    className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-snug"
                  >
                    Enterprise Software Development
                  </motion.h3>

                  <motion.p
                    variants={cardItemReveal}
                    className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                  >
                    We build scalable{' '}
                    <strong className="text-gray-800 dark:text-gray-200">Web Applications, SaaS products, and custom digital tools</strong>{' '}
                    designed to automate your business workflows.
                  </motion.p>
                </motion.div>
              </Interactive3DCard>
            </motion.article>

            {/* Card 2: Business Systems Integration (Flips in from Right) */}
            <motion.article
              variants={cardFlipRight}
              style={{
                transformStyle: 'preserve-3d',
                zIndex: hoveredCard === 'card2' ? 40 : 1,
              }}
              className={`h-full relative transition-[z-index] ${hoveredCard === 'card2' ? 'z-40' : 'z-[1]'}`}
            >
              <Interactive3DCard
                theme="purple"
                onHoverChange={(hovered) => setHoveredCard(hovered ? 'card2' : null)}
                className="group relative rounded-3xl bg-white dark:bg-[#1e2536] p-6 sm:p-8 md:p-10 shadow-md h-full flex flex-col justify-between"
              >
                <motion.div
                  variants={cardContentReveal}
                  className="relative z-10 flex flex-col items-start h-full"
                >
                  <motion.div
                    variants={cardItemReveal}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 mb-5 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300"
                  >
                    <span className="material-symbols-outlined text-3xl sm:text-4xl">sync_alt</span>
                  </motion.div>

                  <motion.h3
                    variants={cardItemReveal}
                    className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-snug"
                  >
                    Business Systems Integration
                  </motion.h3>

                  <motion.p
                    variants={cardItemReveal}
                    className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                  >
                    Seamlessly connecting{' '}
                    <strong className="text-gray-800 dark:text-gray-200">ERP, CRM, and API solutions</strong>{' '}
                    to streamline operations, reduce manual work, and ensure 100% data accuracy.
                  </motion.p>
                </motion.div>
              </Interactive3DCard>
            </motion.article>
          </motion.div>

          {/* Hidden SEO Boost */}
          <p className="hidden">
            SwordNex Technologies offers IT services, software development, and SaaS solutions in Kumbakonam for small and medium businesses in Tamil Nadu.
          </p>
        </div>
      </section>

      {/* SECTION 3: Our Story & Capabilities */}
      <section id="section-story" className="relative w-full py-16 sm:py-20 lg:py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center"
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="max-w-4xl mx-auto text-center mb-10 sm:mb-12">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold mb-2 sm:mb-3">
              About Our IT Company
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-3 leading-tight">
              A Result-Driven <span className="text-primary">IT Solutions Company in Tamil Nadu</span>
            </h2>
            <p className="about-company-description text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-4xl mx-auto leading-relaxed">
              SwordNex Technologies is an innovative software development firm dedicated to delivering secure, scalable digital ecosystems that drive business efficiency and long-term growth.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Column: Story + Stats */}
            <motion.div variants={cardSlideLeft} className="flex flex-col gap-6">
              <div className="our-story-block">
                <h3 className="our-story-title text-xl sm:text-2xl font-bold mb-3 tracking-tight">
                  Our Story
                </h3>
                <Interactive3DTextBlock
                  size="base"
                  enableTilt={false}
                  paragraphs={[
                    'SwordNex Technologies is an innovative Software Development firm dedicated to helping businesses adopt powerful, scalable digital ecosystems. We specialize in solving complex industry challenges through Custom Software, Cloud-based SaaS products, and Digital Transformation services.',
                    'As an active IT Company, we bridge the gap between technology and talent. Beyond our services, we provide Job-Oriented IT Training where students gain Industry Internship experience by working alongside our senior developers on live projects.'
                  ]}
                />
              </div>

              {/* Stats with Lerping Counters and Interactive Hover */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-5 border-t border-slate-200 dark:border-slate-800 divide-x divide-slate-200 dark:divide-slate-800">
                <div className="pr-1 sm:pr-2">
                  <TrustStatCounter target={50} targetValue={50} label="Active Clients" suffix="+" />
                </div>
                <div className="px-1 sm:px-2">
                  <TrustStatCounter target={3} targetValue={3} label="Industries Served" suffix="+" />
                </div>
                <div className="pl-1 sm:pl-2">
                  <TrustStatCounter target={100} targetValue={100} label="Client Satisfaction" suffix="%" />
                </div>
              </div>
            </motion.div>

            {/* Right Column: 3 Framework Flip Cards (Fall and Land in Order) */}
            <motion.div
              variants={frameworkCardsContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              className="flex flex-col gap-3.5 sm:gap-4 overflow-visible"
            >
              {[
                {
                  icon: 'location_on',
                  title: 'Our Origin',
                  desc: 'Based in Kumbakonam, we help businesses adopt modern IT solutions including software development, SaaS products, and automation systems.',
                },
                {
                  icon: 'handshake',
                  title: 'What Sets Us Apart',
                  desc: 'We focus on real business needs, offering customized IT services with clear communication, reliable support, and long-term partnership.',
                },
                {
                  icon: 'account_tree',
                  title: 'Our Process',
                  desc: 'We follow a structured approach: Discovery → Design → Development → Deployment → Support to ensure scalable and efficient solutions.',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={cardFallAndLand}
                  className="w-full relative"
                >
                  <div
                    className={`framework-flip-card group ${flippedFrameworkCard === i ? 'is-flipped' : ''}`}
                    onClick={() => setFlippedFrameworkCard(flippedFrameworkCard === i ? null : i)}
                    onMouseLeave={() => setFlippedFrameworkCard(null)}
                    role="button"
                    tabIndex={0}
                    aria-label={`${item.title} card: hover or tap to flip for details`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setFlippedFrameworkCard(flippedFrameworkCard === i ? null : i);
                      }
                    }}
                  >
                    <div className="framework-flip-card-inner">
                      {/* Front Face: Icon + Title only */}
                      <div className="framework-flip-card-front border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm transition-colors duration-300 group-hover:border-primary/50">
                        <div className="flex items-center gap-3.5 sm:gap-4 w-full">
                          <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-slate-700/80 shadow-sm text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                            <span className="material-symbols-outlined text-2xl sm:text-[26px]">
                              {item.icon}
                            </span>
                          </div>
                          <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                            {item.title}
                          </h4>
                          <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 text-lg ml-auto opacity-70 group-hover:text-primary group-hover:opacity-100 transition-all duration-300">
                            flip
                          </span>
                        </div>
                      </div>

                      {/* Back Face: Revealed Description Text on Flip with Running Blue Border */}
                      <div className="framework-flip-card-back">
                        <div className="framework-flip-card-back-inner">
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <span className="material-symbols-outlined text-primary text-[17px]">
                              {item.icon}
                            </span>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                              {item.title}
                            </span>
                          </div>
                          <p className="text-xs sm:text-[13px] text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Hidden SEO Boost */}
          <p className="hidden">
            SwordNex Technologies is a leading IT company in Kumbakonam providing software development, SaaS solutions, IT services, and business automation for small and medium businesses in Tamil Nadu.
          </p>
        </motion.div>
      </section>

      {/* SECTION 4: Vision, Mission & Leadership */}
      <section id="section-vision" className="relative w-full py-16 sm:py-20 lg:py-24 bg-slate-50/60 dark:bg-slate-900/40 border-y border-slate-100 dark:border-slate-800/60 overflow-hidden">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center space-y-8 sm:space-y-10"
        >
          <motion.div variants={fadeUp} className="text-center max-w-3xl mx-auto">
            <div className="mb-3">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                Why SwordNex
              </span>
            </div>
            <h2 className="purpose-vision-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Driven by{' '}
              <span className="purpose-highlight-word text-primary">
                Purpose
                <span className="purpose-underline-track" aria-hidden="true">
                  <span className="purpose-underline-runner" />
                </span>
              </span>{' '}
              & Vision
            </h2>
          </motion.div>

          {/* Mission & Vision Cards: Both slide in from the left on scroll and stop in position */}
          <motion.div
            variants={missionVisionContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start"
          >
            {/* Our Mission Card */}
            <motion.div variants={missionCardSlideFromLeft} className="w-full">
              <div
                className={`mission-vision-card mission-card group ${expandedMissionVisionCard === 'mission' ? 'is-expanded' : ''}`}
                onClick={() => setExpandedMissionVisionCard(expandedMissionVisionCard === 'mission' ? null : 'mission')}
                tabIndex={0}
                role="button"
                aria-expanded={expandedMissionVisionCard === 'mission'}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setExpandedMissionVisionCard(expandedMissionVisionCard === 'mission' ? null : 'mission');
                  }
                }}
              >
                {/* Expanding background flood circle centered on the flag icon */}
                <div className="mission-vision-flood mission-flood" aria-hidden="true" />

                {/* Card inner content layer (above the flood) */}
                <div className="relative z-10 w-full">
                  {/* Header Row: Flag Icon in front of "Our Mission" */}
                  <div className="flex items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-3.5 sm:gap-4 flex-1 min-w-0">
                      <div className="mission-vision-icon-box mission-icon-box flex-shrink-0">
                        <span className="material-icons-round text-2xl">flag</span>
                      </div>
                      <h3 className="mission-vision-title text-xl sm:text-2xl font-bold tracking-tight">
                        Our Mission
                      </h3>
                    </div>
                    {/* Expand indicator icon */}
                    <span className="mission-vision-chevron material-icons-round text-2xl flex-shrink-0">
                      expand_more
                    </span>
                  </div>

                  {/* Expandable Body Content */}
                  <div className="mission-vision-content">
                    <div className="mission-vision-content-inner">
                      <p className="mission-vision-desc text-sm sm:text-base leading-relaxed pt-3 sm:pt-3.5">
                        To deliver secure, scalable, and user-centric IT Solutions while empowering the next generation with practical, career-focused IT training and real-world project exposure.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Our Vision Card */}
            <motion.div variants={visionCardSlideFromLeft} className="w-full">
              <div
                className={`mission-vision-card vision-card group ${expandedMissionVisionCard === 'vision' ? 'is-expanded' : ''}`}
                onClick={() => setExpandedMissionVisionCard(expandedMissionVisionCard === 'vision' ? null : 'vision')}
                tabIndex={0}
                role="button"
                aria-expanded={expandedMissionVisionCard === 'vision'}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setExpandedMissionVisionCard(expandedMissionVisionCard === 'vision' ? null : 'vision');
                  }
                }}
              >
                {/* Expanding background flood circle centered on the eye icon */}
                <div className="mission-vision-flood vision-flood" aria-hidden="true" />

                {/* Card inner content layer (above the flood) */}
                <div className="relative z-10 w-full">
                  {/* Header Row: Eye Icon in front of "Our Vision" */}
                  <div className="flex items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-3.5 sm:gap-4 flex-1 min-w-0">
                      <div className="mission-vision-icon-box vision-icon-box flex-shrink-0">
                        <span className="material-icons-round text-2xl">visibility</span>
                      </div>
                      <h3 className="mission-vision-title text-xl sm:text-2xl font-bold tracking-tight">
                        Our Vision
                      </h3>
                    </div>
                    {/* Expand indicator icon */}
                    <span className="mission-vision-chevron material-icons-round text-2xl flex-shrink-0">
                      expand_more
                    </span>
                  </div>

                  {/* Expandable Body Content */}
                  <div className="mission-vision-content">
                    <div className="mission-vision-content-inner">
                      <p className="mission-vision-desc text-sm sm:text-base leading-relaxed pt-3 sm:pt-3.5">
                        To be a globally trusted Technology Partner, providing innovative Software Services and modern Digital Education that meets 2026 global industry standards.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* CEO Quote + Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
            <motion.div variants={cardSlideLeft} className="space-y-4">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">
                Leadership That <br />
                <span className="text-primary">
                  Guides Every Decision
                </span>
              </h3>
              <div className="relative bg-white dark:bg-surface-dark p-5 sm:p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700">
                <span className="material-icons-round text-primary text-3xl opacity-25 mb-1 block leading-none">
                  format_quote
                </span>
                <TypewriterQuote
                  quote="At SwordNex, we build technology that fades into the background, letting your teams focus on meaningful work and business growth."
                  speed={20}
                />
                <div className="flex justify-end mt-1">
                  <span className="material-icons-round text-primary text-3xl opacity-25 rotate-180 block leading-none">
                    format_quote
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <a
                  href="https://www.linkedin.com/in/kajanajbudeen/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block group"
                >
                  <p className="font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors text-base">
                    Kaja Najbudeen
                  </p>
                  <p className="text-xs text-primary font-semibold uppercase tracking-wider">
                    Founder & CEO, SwordNex Technologies
                  </p>
                </a>

                {/* Social media icons: Instagram, LinkedIn */}
                <div className="flex items-center gap-3 pt-0.5">
                  <a
                    href="https://www.instagram.com/kajanajbudeen_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram profile"
                    title="Instagram"
                    className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-white hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:border-transparent hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
                  >
                    <FaInstagram className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/kajanajbudeen/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile"
                    title="LinkedIn"
                    className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-white hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
                  >
                    <FaLinkedinIn className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div variants={cardSlideRight} className="relative flex justify-center">
              <Interactive3DPortrait
                src={kaja}
                alt="SwordNex team - Kaja Najbudeen"
                className="w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[320px] aspect-square"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      <ConsultationModal isOpen={isModalOpen} onClose={handleCloseModal} isHeroTransform={modalOrigin === 'hero'} />
    </div>
  );
};

export default About;
