import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ConsultationModal from '../components/ConsultationModal';
import ServiceEnquiryModal from '../components/ServiceEnquiryModal';
import InteractiveLetters from '../components/UI/InteractiveLetters';
import InteractiveEarth from '../components/UI/InteractiveEarth';
import Interactive3DTextBlock from '../components/UI/Interactive3DTextBlock';
import Interactive3DCard from '../components/UI/Interactive3DCard';
import BorderRunnerButton from '../components/UI/BorderRunnerButton';
import TrustStatCounter from '../components/UI/TrustStatCounter';
import kaja from '../assets/Founder_1.jpeg';
import { Helmet } from 'react-helmet-async';
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
      duration: 0.15,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.65,
      staggerChildren: 0.1,
    },
  },
};

const cardItemReveal = {
  hidden: {
    opacity: 0,
    y: 18,
    filter: 'blur(4px)',
    transition: {
      duration: 0.15,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const About = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOrigin, setModalOrigin] = useState(null); // 'hero' | 'default'
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null); // 'card1' | 'card2' | null

  const handleOpenHeroModal = () => {
    setModalOrigin('hero');
    setIsModalOpen(true);
  };

  const handleOpenDefaultModal = () => {
    setModalOrigin('default');
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

              {/* CTA Buttons */}
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 pt-2">
                <div className="relative inline-flex h-12 sm:h-14">
                  <div className="invisible pointer-events-none h-12 sm:h-14 px-6 inline-flex items-center gap-2 select-none" aria-hidden="true">
                    Get IT Solutions
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </div>

                  {(!isModalOpen || modalOrigin !== 'hero') && (
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
                        onClick={handleOpenHeroModal}
                        variant="primary"
                        runnerColor="white"
                        className="h-full w-full px-6 text-sm sm:text-base font-semibold shadow-lg shadow-blue-500/20"
                      >
                        Get IT Solutions
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                      </BorderRunnerButton>
                    </motion.div>
                  )}
                </div>

                <BorderRunnerButton
                  href="/Services"
                  variant="secondary"
                  runnerColor="blue"
                  className="h-12 sm:h-14 px-6 text-sm sm:text-base font-semibold"
                >
                  View Services
                </BorderRunnerButton>
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

                  <motion.div variants={cardItemReveal} className="mt-5">
                    <a href="/Service1" className="inline-flex items-center font-semibold text-blue-700 hover:text-blue-800 underline underline-offset-4 text-sm sm:text-base">
                      Learn more
                    </a>
                  </motion.div>
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

                  <motion.div variants={cardItemReveal} className="mt-5">
                    <a href="/Products" className="inline-flex items-center font-semibold text-purple-700 hover:text-purple-800 underline underline-offset-4 text-sm sm:text-base">
                      Learn more
                    </a>
                  </motion.div>
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
            <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-4xl mx-auto leading-relaxed">
              SwordNex Technologies is an innovative software development firm dedicated to delivering secure, scalable digital ecosystems that drive business efficiency and long-term growth.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Column: Story + Stats */}
            <motion.div variants={cardSlideLeft} className="flex flex-col gap-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
                  Our Story
                </h3>
                <div className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed space-y-3">
                  <p>
                    SwordNex Technologies is an innovative Software Development firm dedicated to helping businesses adopt powerful, scalable digital ecosystems. We specialize in solving complex industry challenges through Custom Software, Cloud-based SaaS products, and Digital Transformation services.
                  </p>
                  <p>
                    As an active IT Company, we bridge the gap between technology and talent. Beyond our services, we provide Job-Oriented IT Training where students gain Industry Internship experience by working alongside our senior developers on live projects.
                  </p>
                </div>
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

            {/* Right Column: 3 Framework Cards */}
            <motion.div variants={cardSlideRight} className="flex flex-col gap-3.5 sm:gap-4">
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
                <div
                  key={i}
                  className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-primary/50 transition-all duration-300 shadow-sm"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-slate-700 shadow-sm text-primary flex-shrink-0">
                      <span className="material-symbols-outlined text-xl sm:text-2xl">
                        {item.icon}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
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
      <section id="section-vision" className="relative w-full py-16 sm:py-20 lg:py-24 bg-slate-50/60 dark:bg-slate-900/40 border-y border-slate-100 dark:border-slate-800/60">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center space-y-8 sm:space-y-10"
        >
          <motion.div variants={fadeUp} className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              Why SwordNex
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mt-2.5">
              Driven by <span className="text-primary">Purpose</span> & Vision
            </h2>
            <div className="h-1.5 w-20 bg-primary mx-auto rounded-full mt-3"></div>
          </motion.div>

          {/* Mission & Vision Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              variants={cardSlideLeft}
              className="bg-white dark:bg-surface-dark p-6 sm:p-7 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 hover:-translate-y-1 hover:shadow-xl hover:border-primary/40 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-primary mb-3.5">
                <span className="material-icons-round text-2xl">flag</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">Our Mission</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                To deliver secure, scalable, and user-centric IT Solutions while empowering the next generation with practical, career-focused IT training and real-world project exposure.
              </p>
            </motion.div>

            <motion.div
              variants={cardSlideRight}
              className="bg-white dark:bg-surface-dark p-6 sm:p-7 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 hover:-translate-y-1 hover:shadow-xl hover:border-primary/40 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-3.5">
                <span className="material-icons-round text-2xl">visibility</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">Our Vision</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                To be a globally trusted Technology Partner, providing innovative Software Services and modern Digital Education that meets 2026 global industry standards.
              </p>
            </motion.div>
          </div>

          {/* CEO Quote + Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
            <motion.div variants={cardSlideLeft} className="space-y-4">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">
                Leadership That <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Guides Every Decision
                </span>
              </h3>
              <div className="relative bg-white dark:bg-surface-dark p-5 sm:p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700">
                <span className="material-icons-round text-primary text-3xl opacity-25 mb-1 block">format_quote</span>
                <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base italic leading-relaxed">
                  “At SwordNex, we build technology that fades into the background, letting your teams focus on meaningful work and business growth.”
                </p>
              </div>
              <div>
                <a
                  href="https://www.linkedin.com/in/kajanajbudeen/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className="font-bold text-gray-900 dark:text-white hover:text-primary transition-colors text-base">Kaja Najbudeen</p>
                  <p className="text-xs text-primary font-semibold uppercase tracking-wider">
                    Founder & CEO, SwordNex Technologies
                  </p>
                </a>
              </div>
            </motion.div>

            <motion.div variants={cardSlideRight} className="relative flex justify-center">
              <div className="relative rounded-full overflow-hidden shadow-2xl w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[320px] aspect-square border-4 border-white dark:border-slate-800">
                <img
                  src={kaja}
                  alt="SwordNex team - Kaja Najbudeen"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 5: CTA Section */}
      <section id="section-cta" className="relative w-full py-16 sm:py-20 lg:py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="w-full max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center"
        >
          <motion.div
            variants={fadeUp}
            className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-700 shadow-2xl text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>

            <h2 className="relative text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight leading-tight">
              Ready to grow your business with <span className="text-primary">custom web solutions</span>?
            </h2>
            <p className="relative text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join 50+ businesses who trust SwordNex Technologies for scalable web applications, modern websites, and enterprise software solutions.
            </p>
            <div className="relative flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="button"
                onClick={() => setIsEnquiryOpen(true)}
                className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-primary text-white font-bold text-base hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg cursor-pointer"
              >
                Start Your Custom Project
              </button>
              <button
                type="button"
                onClick={handleOpenDefaultModal}
                className="inline-flex items-center justify-center h-12 px-8 rounded-xl border border-slate-300 dark:border-slate-600 bg-transparent text-slate-700 dark:text-slate-200 font-bold text-base hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Meet Our Expert Team
              </button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <ServiceEnquiryModal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />
      <ConsultationModal isOpen={isModalOpen} onClose={handleCloseModal} isHeroTransform={modalOrigin === 'hero'} />
    </div>
  );
};

export default About;
