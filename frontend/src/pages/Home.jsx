import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../config/apiConfig';
import ConsultationModal from '../components/ConsultationModal';
import ServiceEnquiryModal from '../components/ServiceEnquiryModal';
import kaja from '../assets/Founder_1.jpeg';
import { Helmet } from "react-helmet-async";
import DotField from '../components/UI/DotField';
import TrustStatCounter from '../components/UI/TrustStatCounter';
import Interactive3DCard from '../components/UI/Interactive3DCard';
import Interactive3DReviews from '../components/UI/Interactive3DReviews';
import TypewriterQuote from '../components/UI/TypewriterQuote';
import './HomeHero.css';

const renderInteractiveHeadingText = (text) =>
 text.split('').map((character, index) => (
   <span className="home-hero-heading-letter" key={`${character}-${index}`}>
     {character === ' ' ? '\u00a0' : character}
   </span>
 ));

const renderLetterRevealText = (text, startIndex = 0) => {
 let characterIndex = startIndex;

 return text.split(' ').map((word, wordIndex) => (
   <React.Fragment key={`${word}-${wordIndex}`}>
     {wordIndex > 0 && ' '}
     <span className="trust-heading-word" aria-hidden="true">
       {Array.from(word, (character) => {
         const index = characterIndex++;
         return (
           <span
             className="trust-heading-letter"
             key={`${index}-${character}`}
             style={{ animationDelay: `${index * 24}ms` }}
           >
             {character}
           </span>
         );
       })}
     </span>
   </React.Fragment>
 ));
};

const trustHeadingText = 'Trusted by Businesses Worldwide ';
const trustHeadingBrand = 'SwordNex';
const trustHeadingRevealDelay =
 (trustHeadingText.length + trustHeadingBrand.length - 1) * 24 + 450;
const challengeHeadingText = 'Business Problems to Smart IT Solutions';
const challengeDescriptionRevealDelay =
 (challengeHeadingText.length - 1) * 24 + 450;
const productsEyebrowText = 'IT Products & SaaS Solutions';
const productsHeadingText = 'Software Products & SaaS Solutions';
const whyChooseHeadingText = 'Why Choose Our IT Services';
const whyChooseDescriptionRevealDelay =
 (whyChooseHeadingText.length - 1) * 24 + 450;

const serviceCards = [
 {
   id: 'development',
   title: 'Custom Software & Web Development',
   icon: 'widgets',
   accent: '#2563eb',
   iconColor: 'text-blue-600 dark:text-blue-400',
   iconBackground: 'bg-blue-50 dark:bg-blue-900/30',
   description: 'Delivering scalable Web Application Development, E-commerce solutions, and cross-platform mobile apps. We specialize in MERN Stack, UI/UX design, and high-performance Frontend/Backend development for business automation',
   tag: 'Built for scale',
   tagColor: 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200',
   href: '/services/application-development'
 },
 {
   id: 'marketing',
   title: 'Digital Marketing & SEO Solutions',
   icon: 'campaign',
   accent: '#f97316',
   iconColor: 'text-orange-500 dark:text-orange-400',
   iconBackground: 'bg-orange-50 dark:bg-orange-900/30',
   description: 'Data-driven Search Engine Optimization, Content Marketing, and Social Media Strategy. We focus on Google Ads (PPC), Meta Marketing, and Conversion Rate Optimization to drive high-quality business leads',
   tag: 'Leads with clarity',
   tagColor: 'bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-200',
   href: '/services/digital-media'
 },
 {
   id: 'training',
   title: 'Job-Oriented IT Courses & Training',
   icon: 'school',
   accent: '#0d9488',
   iconColor: 'text-teal-600 dark:text-teal-400',
   iconBackground: 'bg-teal-50 dark:bg-teal-900/30',
   description: 'Industry-led training from an active IT company. Expert-led Full Stack Development, Python for Data Science, Artificial Intelligence, and Cyber Security with Live Project Internships and Placement Assistance',
   tag: 'Skills that ship…',
   tagColor: 'bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-200',
   href: '/services/it-training-skill-development'
 },
 {
   id: 'infrastructure',
   title: 'Cloud Solutions & IT Infrastructure',
   icon: 'dns',
   accent: '#4f46e5',
   iconColor: 'text-indigo-600 dark:text-indigo-400',
   iconBackground: 'bg-indigo-50 dark:bg-indigo-900/30',
   description: 'Reliable Cloud Computing services, Cybersecurity solutions, and Network Administration. We provide expert AWS/Azure Cloud Migration, Server Maintenance, and secure Database Management',
   tag: 'Reliable foundations',
   tagColor: 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200',
   href: '/services/it-infrastructure'
 },
 {
   id: 'hr-consulting',
   title: 'HR Consulting & Enterprise Management',
   icon: 'groups',
   accent: '#db2777',
   iconColor: 'text-pink-600 dark:text-pink-400',
   iconBackground: 'bg-pink-50 dark:bg-pink-900/30',
   description: 'Comprehensive Talent Acquisition, Staffing Solutions, and Employee Management Systems. We streamline IT Staffing, Payroll Outsourcing, and business operations for tech startups in Tamil Nadu.',
   tag: 'People-first solutions',
   tagColor: 'bg-pink-100 dark:bg-pink-900/50 text-pink-800 dark:text-pink-200',
   href: '/services/hr-consulting'
 }
];
const serviceScrollDelays = [
 'scroll-animate-delay-1',
 'scroll-animate-delay-2',
 'scroll-animate-delay-3'
];

<Helmet>
 <title>
 SwordNex | Best IT Solutions & Software Company in Tamil Nadu
 </title>

 <meta
 name="description"
 content="SwordNex is a leading IT services company in Tamil Nadu. We offer custom software development and job-oriented IT courses with live project internships."
 />

 <meta
 name="keywords"
 content="IT company in Kumbakonam, software company in Kumbakonam, IT services in Kumbakonam, software development Kumbakonam, SaaS development company, payroll software Tamil Nadu, billing software Kumbakonam, IT solutions for small business"
 />

 <meta name="robots" content="index, follow" />

 <link rel="canonical" href="https://swordnex.com" />

 {/* Open Graph */}
 <meta property="og:title" content="IT Company in Kumbakonam | SwordNex Technologies" />
 <meta
 property="og:description"
 content="Software development, SaaS products, payroll & billing solutions with professional IT services in Kumbakonam."
 />
 <meta property="og:url" content="https://swordnex.com" />
 <meta property="og:type" content="website" />

 {/* Twitter */}
 <meta name="twitter:card" content="summary_large_image" />
</Helmet>
const Home = () => {
 const [isConsultationOpen, setIsConsultationOpen] = useState(false);
 const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
 const [partners, setPartners] = useState([]);
 const [activeHeroSlide, setActiveHeroSlide] = useState(0);
 const heroVisualRef = useRef(null);

 const heroSlides = [
   {
     word: 'Business',
     alt: 'A team collaborating on business strategy',
     image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=85'
   },
   {
     word: 'Product',
     alt: 'A product designer planning a digital product',
     image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1400&q=85'
   },
   {
     word: 'Technology',
     alt: 'A developer working with modern technology',
     image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=85'
   },
   {
     word: 'Talent',
     alt: 'A diverse team working together',
     image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=85'
   },
   {
     word: 'Digital',
     alt: 'Digital analytics displayed on a screen',
     image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=85'
   }
 ];

 useEffect(() => {
   if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

   const intervalId = window.setInterval(() => {
     setActiveHeroSlide((currentSlide) => (currentSlide + 1) % heroSlides.length);
   }, 3200);

   return () => window.clearInterval(intervalId);
 }, [heroSlides.length]);

 const handleHeroPointerMove = (event) => {
   const visual = heroVisualRef.current;
   if (!visual) return;

   const bounds = visual.getBoundingClientRect();
   const pointerX = (event.clientX - bounds.left) / bounds.width - 0.5;
   const pointerY = (event.clientY - bounds.top) / bounds.height - 0.5;
   visual.style.setProperty('--tilt-x', `${pointerY * -5}deg`);
   visual.style.setProperty('--tilt-y', `${pointerX * 5}deg`);
 };

 const resetHeroPointer = () => {
   const visual = heroVisualRef.current;
   if (!visual) return;

   visual.style.setProperty('--tilt-x', '0deg');
   visual.style.setProperty('--tilt-y', '0deg');
 };

 useEffect(() => {
 const fetchPartners = async () => {
 try {
 const response = await fetch(`${API_BASE_URL}/api/partners`);
 if (response.ok) {
 const data = await response.json();
 setPartners(data);
 }
 } catch (err) {
 console.error("Error fetching partners:", err);
 }
 };
 fetchPartners();
 }, []);

 useEffect(() => {
 const observerOptions = {
 threshold: 0.1,
 rootMargin: '0px 0px -50px 0px'
 };

 const observerCallback = (entries) => {
 entries.forEach((entry) => {
 if (entry.target.classList.contains('replay-letter-reveal')) {
 entry.target.classList.toggle('animate-in', entry.isIntersecting);
 } else if (entry.isIntersecting) {
 entry.target.classList.add('animate-in');
 }
 });
 };

 const observer = new IntersectionObserver(observerCallback, observerOptions);
 const sections = document.querySelectorAll('.scroll-animate');

 sections.forEach((section) => observer.observe(section));

 return () => {
 sections.forEach((section) => observer.unobserve(section));
 };
 }, []);

 const cardImages = [
 {
 id: 1,
 src: "/assets/BILLING LOGO.png",
 alt: "Tech Image 1",
 className: "h-12 w-32 md:h-14 md:w-36 lg:h-16 lg:w-40 object-contain"
 },
 {
 id: 2,
 src: "/assets/HMS LOGO.png",
 alt: "Tech Image 2",
 className: "h-12 w-32 md:h-14 md:w-36 lg:h-16 lg:w-40 object-contain"
 },
 {
 id: 3,
 src: "/assets/PAYROLL .png",
 alt: "Tech Image 3",
 className: "h-12 w-32 md:h-14 md:w-36 lg:h-16 lg:w-40 object-contain"
 },
 {
 id: 4,
 src: "/assets/BILLING LOGO.png",
 alt: "Tech Image 4",
 className: "h-12 w-32 md:h-14 md:w-36 lg:h-16 lg:w-40 object-contain"
 },
 {
 id: 5,
 src: "/assets/HMS LOGO.png",
 alt: "Tech Image 5",
 className: "h-12 w-32 md:h-14 md:w-36 lg:h-16 lg:w-40 object-contain"
 },
 {
 id: 6,
 src: "/assets/PAYROLL .png",
 alt: "Tech Image 4",
 className: "h-12 w-32 md:h-14 md:w-36 lg:h-16 lg:w-40 object-contain"
 },
 ];

 return (
 <>
 {/* Header/Hero Section */}
  <header
    ref={heroVisualRef}
    onPointerMove={handleHeroPointerMove}
    onPointerLeave={resetHeroPointer}
    className="home-hero relative isolate overflow-hidden min-h-[calc(100vh-76px)] sm:min-h-[calc(100vh-80px)] flex flex-col justify-center py-12 lg:py-20 scroll-animate"
  >
    {/* Fullscreen changing visual background */}
    <div className="home-hero-fullscreen-bg absolute inset-0 pointer-events-none overflow-hidden z-0">
      <div className="home-hero-image-stack absolute inset-0">
        {heroSlides.map((slide, index) => (
          <img
            key={slide.word}
            src={slide.image}
            alt={slide.alt}
            className={`home-hero-image absolute inset-0 h-full w-full object-cover ${index === activeHeroSlide ? 'is-active' : ''}`}
            aria-hidden={index !== activeHeroSlide}
            loading={index === activeHeroSlide ? 'eager' : 'lazy'}
          />
        ))}
      </div>
      {/* Dark clean scrim for optimal text contrast and natural clear photography */}
      <div className="home-hero-shade-fullscreen" />
      {/* Left-side slight black transparent vignette behind hero text */}
      <div className="home-hero-vignette-left" />
    </div>

    <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 z-10 w-full my-auto">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
        <div className="home-hero-copy relative z-10">
          <div className="mb-6 text-left">
            <div className="home-hero-brand inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-slate-900/70 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-sky-300 shadow-lg backdrop-blur-md">
              <span className="home-hero-brand-dot h-2.5 w-2.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
              SwordNex
            </div>
          </div>

          <h1
            aria-label="Looking for the Best IT Solutions & Software Company"
            className="home-hero-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
          >
            <span className="block" aria-hidden="true">{renderInteractiveHeadingText('Looking for the')}</span>
            <span className="home-hero-heading-accent block text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-cyan-300" aria-hidden="true">{renderInteractiveHeadingText('Best IT Solutions &')}</span>
            <span className="block" aria-hidden="true">{renderInteractiveHeadingText('Software Company')}</span>
          </h1>

          <p className="home-hero-description mt-6 max-w-2xl text-base leading-relaxed text-slate-100 lg:text-lg drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
            Get expert IT Services, Custom Software Development, SaaS Solutions, and Business Automation tailored for your enterprise. Partner with SwordNex Technologies—a premier IT Solutions provider—to build scalable digital solutions and accelerate your business growth.
          </p>

          <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row">
            <button
              onClick={() => setIsConsultationOpen(true)}
              className="home-hero-primary inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-500 hover:shadow-sky-500/50"
            >
              <span className="home-hero-button-label">Our IT Solutions</span>
            </button>
            <Link
              to="/services"
              className="home-hero-secondary inline-flex items-center justify-center rounded-full border border-white/25 bg-slate-900/60 px-6 py-3 text-sm font-semibold text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:border-sky-400 hover:bg-slate-800/80 hover:text-sky-300"
            >
              <span className="material-icons-round mr-2 text-xl text-sky-400">play_circle_outline</span>
              <span className="home-hero-button-label">Explore Job-Oriented Training</span>
            </Link>
          </div>

          <div className="home-hero-stats mt-8 grid max-w-xl grid-cols-3 gap-3 text-left text-xs font-semibold sm:gap-4">
            <div className="home-hero-stat rounded-2xl border border-white/15 bg-slate-900/60 p-3 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-sky-400/50 hover:bg-slate-900/80">
              <div className="home-hero-stat-icon mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/20 border border-sky-400/30 text-sky-400">
                <span className="material-icons-round text-lg">check</span>
              </div>
              <TrustStatCounter
                target={80}
                label="Clients"
                suffix="+"
                className="home-hero-stat-counter"
              />
            </div>

            <div className="home-hero-stat rounded-2xl border border-white/15 bg-slate-900/60 p-3 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-sky-400/50 hover:bg-slate-900/80">
              <div className="home-hero-stat-icon mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/20 border border-sky-400/30 text-sky-400">
                <span className="material-icons-round text-lg">layers</span>
              </div>
              <TrustStatCounter
                target={100}
                label="Projects"
                suffix="+"
                className="home-hero-stat-counter"
              />
            </div>

            <div className="home-hero-stat rounded-2xl border border-white/15 bg-slate-900/60 p-3 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-sky-400/50 hover:bg-slate-900/80">
              <div className="home-hero-stat-icon mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/20 border border-sky-400/30 text-sky-400">
                <span className="material-icons-round text-lg">support_agent</span>
              </div>
              <TrustStatCounter
                target={24}
                label="Support"
                suffix="/7"
                animateOnView={false}
                className="home-hero-stat-counter"
              />
            </div>
          </div>
        </div>

        {/* "We build [Word]" directly on top of the image */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <p className="home-hero-build text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
            We build
          </p>
          <p
            key={heroSlides[activeHeroSlide].word}
            className="home-hero-word mt-2 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-sky-300 drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)]"
            aria-live="polite"
            aria-atomic="true"
          >
            {heroSlides[activeHeroSlide].word}
          </p>
        </div>
      </div>
    </div>

    {/* CSS Animations */}
    <style>{`
      @keyframes float-left {
        0%, 100% { transform: translateY(0px) translateX(0px); }
        33% { transform: translateY(-10px) translateX(10px); }
        66% { transform: translateY(-5px) translateX(-2px); }
      }
      @keyframes float-right {
        0%, 100% { transform: translateY(0px) translateX(0px); }
        33% { transform: translateY(-12px) translateX(-3px); }
        66% { transform: translateY(-6px) translateX(2px); }
      }
    `}</style>

    {/* Wave SVG - Bottom */}
    <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
      <svg className="fill-white dark:fill-background-dark w-full h-12 sm:h-16 lg:h-20 transform translate-y-1" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" fillOpacity="1"></path>
      </svg>
    </div>
  </header>

 {/* Challenges Section */}
 <section className="replay-letter-reveal challenge-reveal-section py-14 px-4 md:px-8 lg:py-16 scroll-animate">
 <div className="max-w-8xl mx-auto flex flex-col items-center">
 <div className="max-w-7xl text-center mb-9">
 <h2
 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4"
 aria-label={challengeHeadingText}
 >
 {renderLetterRevealText(challengeHeadingText)}
 </h2>

 <p
 className="trust-heading-description text-lg max-w-6xl text-slate-600 dark:text-slate-300 leading-relaxed transition-all duration-300 ease-in-out hover:scale-[1.02] hover:font-semibold"
 style={{ '--trust-heading-reveal-delay': `${challengeDescriptionRevealDelay}ms` }}
 >
 Many businesses in Kumbakonam still depend on manual work, outdated software, and unstructured marketing strategies — which slows growth and reduces efficiency.
 </p>
 </div>
 <div className="w-full max-w-5xl bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700">
 <div className="flex flex-col md:flex-row">
 <div className="w-full md:w-1/2">
 <Interactive3DCard theme="red" tilt={false} className="home-challenge-panel w-full p-6 md:p-8 bg-slate-20 dark:bg-slate-800/50 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-700 relative overflow-hidden group rounded-t-xl md:rounded-l-xl md:rounded-tr-none">
 <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-red-100 dark:bg-red-900/20 rounded-full blur-3xl opacity-50"></div>
 <div className="relative z-10">
 <div className="flex items-center gap-3 mb-6">
 <div className="size-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
 <span className="material-symbols-outlined">warning</span>
 </div>
 <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Challenges</h3>
 </div>
 <ul className="space-y-6">
 <li className="flex items-start gap-4">
 <div className="mt-1 flex-shrink-0 p-2 rounded-lg bg-red-500/10 text-red-500">
 <span className="material-symbols-outlined">schedule</span>
 </div>
 <span className="text-base text-slate-600 dark:text-slate-300 font-medium">
 Manual billing, inventory management, and payroll processes consume hours every week and reduce productivity. </span>
 </li>
 <li className="flex items-start gap-4">
 <div className="mt-1 flex-shrink-0 p-2 rounded-lg bg-red-500/10 text-red-500">
 <span className="material-symbols-outlined">sentiment_dissatisfied</span>
 </div>
 <span className="text-base text-slate-600 dark:text-slate-300 font-medium">
 Poor website performance and weak digital marketing cause customer drop-offs and low conversions. </span>
 </li>
 <li className="flex items-start gap-4">
 <div className="mt-1 flex-shrink-0 p-2 rounded-lg bg-red-500/10 text-red-500">
 <span className="material-symbols-outlined ">visibility_off</span>
 </div>
 <span className="text-base text-slate-600 dark:text-slate-300 font-medium">
 Business owners lack real-time dashboards, analytics, and data-driven insights to make smart decisions. </span>
 </li>
 </ul>
 </div>
 </Interactive3DCard>
 </div>
 <div className="w-full md:w-1/2">
 <Interactive3DCard theme="blue" tilt={false} className="home-challenge-panel w-full p-6 md:p-8 bg-white dark:bg-slate-800 relative overflow-hidden rounded-b-xl md:rounded-r-xl md:rounded-bl-none">
 <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-40 h-40 bg-primary/10 rounded-full blur-3xl opacity-60"></div>
 <div className="relative z-10">
 <div className="flex items-center gap-3 mb-6">
 <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
 <span className="material-symbols-outlined">bolt</span>
 </div>
 <h3 className="text-xl font-bold text-primary">How SwordNex helps</h3>
 </div>
 <ul className="space-y-6">
 <li className="flex items-start gap-4">
 <div className="mt-1 flex-shrink-0 p-2 rounded-lg bg-primary/10 text-primary">
 <span className="material-symbols-outlined text-[20px]">precision_manufacturing</span>
 </div>
 <div>
 <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">
 Business Automation Software & SaaS Solutions
 </h4>
 <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
 Custom SaaS applications and automation tools to streamline operations, reduce manual work, and increase efficiency.
 </p>
 </div>
 </li>
 <li className="flex items-start gap-4">
 <div className="mt-1 flex-shrink-0 p-2 rounded-lg bg-primary/10 text-primary">
 <span className="material-symbols-outlined text-[20px]">group_add</span>
 </div>
 <div>
 <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">Website Development & Digital Marketing</h4>
 <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
 High-performance websites, SEO services, and digital marketing strategies to attract and convert customers.
 </p>
 </div>
 </li>
 <li className="flex items-start gap-4">
 <div className="mt-1 flex-shrink-0 p-2 rounded-lg bg-primary/10 text-primary">
 <span className="material-symbols-outlined text-[20px]">monitoring</span>
 </div>
 <div>
 <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">Analytics Dashboard & Business Insights</h4>
 <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
 Real-time reporting dashboards that help you track performance and make data-driven decisions.
 </p>
 </div>
 </li>
 </ul>
 </div>
 </Interactive3DCard>
 </div>
 </div>
 </div>
 <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6 text-center">
 <p className="home-hero-cta-copy text-slate-500 dark:text-red-500 font-medium"> Looking for the best IT company in Kumbakonam to grow your business?</p>
 <button
 onClick={() => setIsConsultationOpen(true)}
 className="home-hero-consultation inline-flex items-center justify-center h-10 px-6 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold hover:opacity-90 transition-opacity gap-2 group">
 <span className="home-hero-button-label">Get Free IT Consultation</span>
 <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
 </button>
 </div>
 </div>
 <p className="sr-only">
 IT Services in Kumbakonam, Best Software Development Company in Kumbakonam, SaaS Solutions Provider, Web Development Company, Mobile App Development, SEO Services in Kumbakonam, Digital Marketing Agency, IT Training Institute in Kumbakonam
 </p>
 </section>

 {/* Products Spotlight Section */}
 <section className="replay-letter-reveal products-reveal-section py-16 lg:py-20 bg-gray-50 dark:bg-surface-dark/50 relative overflow-hidden scroll-animate">
 <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
 <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
 <div className="container mx-auto px-6 relative z-10">
 <div className="text-center mb-10">
 <span
 className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block"
 aria-label={productsEyebrowText}
 > {renderLetterRevealText(productsEyebrowText)}
 </span>
 <h2
 className="text-3xl md:text-4xl font-bold dark:text-white"
 aria-label={productsHeadingText}
 >
 {renderLetterRevealText(productsHeadingText, productsEyebrowText.length)}
 </h2>
 <div className="w-20 h-1.5 bg-primary rounded-full mx-auto mt-4"></div>
 </div>
 <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
 {/* Product Card 1 */}
 <Interactive3DCard theme="green" tilt={false} className="group h-full bg-white dark:bg-background-dark rounded-xl p-6 shadow-lg relative overflow-hidden scroll-animate scroll-animate-delay-1">
 <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
 </div>
 <div className="relative z-10">
 <div className="flex items-center gap-3 mb-6">
 <div className="bg-green-500/10 dark:bg-yellow/20 p-3 rounded-lg">
 <img src="/assets/icoillig.png" alt="Badge" className="w-6 h-6 object-contain" />
 </div>
 <h3 className="text-xl font-bold text-gray-900 dark:text-white">SwordNex Billing</h3>
 </div>
 <h4 className="text-base font-medium text-gray-800 dark:text-gray-200 mb-5 leading-relaxed">
 GST Billing Software & Inventory Management System for Retail Shops in Kumbakonam.
 </h4>
 <ul className="space-y-3 mb-8">
 <li className="flex items-center text-text-muted-light dark:text-text-muted-dark">
 <span className="material-icons-outlined text-green-500 mr-2 text-sm">check_circle</span>
 POS & invoicing
 </li>
 <li className="flex items-center text-text-muted-light dark:text-text-muted-dark">
 <span className="material-icons-outlined text-green-500 mr-2 text-sm">check_circle</span>
 Multi‑branch stock
 </li>
 <li className="flex items-center text-text-muted-light dark:text-text-muted-dark">
 <span className="material-icons-outlined text-green-500 mr-2 text-sm">check_circle</span>
 Real‑time reports
 </li>
 </ul>
 <a className="inline-flex items-center text-green-600 font-semibold" target="_blank" href="https://www.products.billing.swordnex.com/" rel="noreferrer">
 Explore Billing<span className="material-icons-outlined ml-1 text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
 </a>
 </div>
 </Interactive3DCard>
 {/* Product Card 2 */}
 <Interactive3DCard theme="blue" tilt={false} className="group h-full bg-white dark:bg-background-dark rounded-xl p-6 shadow-lg relative overflow-hidden scroll-animate scroll-animate-delay-2">
 <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
 <span className="material-icons-outlined text-9xl text-secondary">people_alt</span>
 </div>
 <div className="relative z-10">
 <div className="flex items-center gap-3 mb-6">
 <div className="bg-blue-500/10 dark:bg-secondary/20 p-3 rounded-lg">
 <img src="/assets/icon payroll.png" alt="Badge" className="w-6 h-6 object-contain" />
 </div>
 <h3 className="text-xl font-bold text-gray-900 dark:text-white">SwordNex Payroll</h3>
 </div>
 <h4 className="text-base font-medium text-gray-800 dark:text-gray-200 mb-5 leading-relaxed">
 Payroll Management Software with PF, ESI & HR Automation for Companies.
 </h4>
 <ul className="space-y-3 mb-8">
 <li className="flex items-center text-text-muted-light dark:text-text-muted-dark">
 <span className="material-icons-outlined text-blue-500 mr-2 text-sm">check_circle</span>
 Automated salary & PF/ESI
 </li>
 <li className="flex items-center text-text-muted-light dark:text-text-muted-dark">
 <span className="material-icons-outlined text-blue-500 mr-2 text-sm">check_circle</span>
 Employee self‑service
 </li>
 <li className="flex items-center text-text-muted-light dark:text-text-muted-dark">
 <span className="material-icons-outlined text-blue-500 mr-2 text-sm">check_circle</span>
 Monthly summaries
 </li>
 </ul>
 <a className="inline-flex items-center text-blue-600 font-semibold" href="https://www.products.payroll.swordnex.com/" target="_blank" rel="noreferrer">
 Explore Payroll <span className="material-icons-outlined ml-1 text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
 </a>
 </div>
 </Interactive3DCard>
 {/* Product Card 3 */}
 <Interactive3DCard theme="yellow" tilt={false} className="group h-full bg-white dark:bg-background-dark rounded-xl p-6 shadow-lg relative overflow-hidden scroll-animate scroll-animate-delay-3">
 <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
 </div>
 <div className="relative z-10">
 <div className="flex items-center gap-3 mb-6">
 <div className="bg-yellow-500/10 dark:bg-teal-yellow/20 p-3 rounded-lg">
 <img src="/assets/icon hms.png" alt="Badge" className="w-6 h-6 object-contain" />
 </div>
 <h3 className="text-xl font-bold text-gray-900 dark:text-white">SwordNex HMS</h3>
 </div>
 <h4 className="text-base font-medium text-gray-800 dark:text-gray-200 mb-5 leading-relaxed">
  Hotel Management System (HMS) for Reservations, Guest Management & Billing Automation.
 </h4>
 <ul className="space-y-3 mb-8">
 <li className="flex items-center text-text-muted-light dark:text-text-muted-dark">
 <span className="material-icons-outlined text-green-500 mr-2 text-sm">check_circle</span>
  Room reservations & availability
 </li>
 <li className="flex items-center text-text-muted-light dark:text-text-muted-dark">
 <span className="material-icons-outlined text-green-500 mr-2 text-sm">check_circle</span>
  Guest check-in / check-out
 </li>
 <li className="flex items-center text-text-muted-light dark:text-text-muted-dark">
 <span className="material-icons-outlined text-green-500 mr-2 text-sm">check_circle</span>
  Billing & invoice automation
 </li>
 </ul>
 <a
 className="inline-flex items-center text-yellow-600 font-semibold"
 href="https://www.products.hms.swordnex.com/"
 target="_blank"
 rel="noreferrer"
 >
 Explore HMS <span className="material-icons-outlined ml-1 text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
 </a>
 </div>
 </Interactive3DCard>
 </div>
 </div>
 <div className="flex justify-center mt-10">
 <button
 className="home-hero-product-explore bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow transition"
 onClick={() => window.location.href = '/products'}
 >
 Explore All IT Products
 </button> </div>

 <p className="sr-only">
 SaaS products in Kumbakonam, billing software, payroll software, HRMS software, inventory management system, IT products company in Kumbakonam
 </p>
 </section>

 {/* Services Section */}
 <section className="relative py-14 lg:py-18 overflow-hidden scroll-animate">
 <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200/20 dark:bg-blue-900/10 rounded-full blur-3xl pointer-events-none"></div>
 <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-[500px] h-[500px] bg-indigo-200/20 dark:bg-indigo-900/10 rounded-full blur-3xl pointer-events-none"></div>
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
 <div className="max-w-6xl mx-auto text-center mb-10 lg:mb-12">
 <span
   aria-label="IT Services in Kumbakonam"
   className="block text-primary font-semibold tracking-wider uppercase text-sm mb-3"
 >
   <span aria-hidden="true">{renderInteractiveHeadingText('IT Services in Kumbakonam')}</span>
 </span>
 <h2
   aria-label="Complete IT Solutions – Software, SaaS & Digital Services"
   className="text-3xl max-w-6xl lg:text-4xl font-display font-bold text-slate-900 dark:text-white mb-6"
 >
   <span aria-hidden="true">{renderInteractiveHeadingText('Complete IT Solutions – Software, SaaS & Digital Services')}</span>
 </h2>
 <p className="home-hero-cta-copy text-lg text-slate-500 dark:text-slate-400">
 We provide end-to-end IT services including software development, SaaS solutions, digital marketing, and IT training to help businesses and students grow faster.
 </p>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-6">
 {serviceCards.map((service, index) => {
   return (
     <article
       key={service.id}
       className={`service-card relative bg-card-light dark:bg-card-dark rounded-xl p-6 shadow-soft border border-slate-100 dark:border-slate-700/50 scroll-animate ${serviceScrollDelays[index % serviceScrollDelays.length]}`}
       style={{ '--service-accent': service.accent }}
     >
       <div className="service-card-heading">
         <span className={`service-card-icon w-14 h-14 rounded-xl ${service.iconBackground} ${service.iconColor} flex items-center justify-center text-3xl`}>
           <span className="material-icons-round" aria-hidden="true">{service.icon}</span>
         </span>
         <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white">
           {service.title}
         </h3>
         <span className="service-card-indicator material-icons-round" aria-hidden="true">keyboard_arrow_down</span>
       </div>
       <div className="service-card-content">
         <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
           {service.description}
         </p>
         <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between gap-3">
           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${service.tagColor}`}>
             {service.tag}
           </span>
           <Link to={service.href} className="inline-flex items-center text-sm font-semibold text-primary hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-pointer">
             Learn More
             <span className="material-icons-round text-base ml-1" aria-hidden="true">arrow_forward</span>
           </Link>
         </div>
       </div>
     </article>
   );
 })}
 </div>
   </div>
   </section>

 {/* Trust Section with Auto-Scroll */}
 <section className="replay-letter-reveal trust-section py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden scroll-animate">
 {/* Section Heading */}
 <div className="text-center mb-10">
 <h2
 className="trust-heading text-3xl lg:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4"
 aria-label={`${trustHeadingText}${trustHeadingBrand}`}
 >
 {renderLetterRevealText(trustHeadingText)}
 <span className="text-primary">{renderLetterRevealText(trustHeadingBrand, trustHeadingText.length)}</span>
 </h2>
 <p
 className="trust-heading-description mt-6 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
 style={{ '--trust-heading-reveal-delay': `${trustHeadingRevealDelay}ms` }}
 >
 SwordNex delivers scalable web applications, digital products, and campaigns backed by measurable results and dedicated support.
 </p>
 </div>

 {/* Metrics Grid */}
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
 {[
 { label: "Long-Term Clients", value: 50, suffix: "+", icon: "groups", color: "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400", border: "border-blue-200 dark:border-blue-800/70", desc: "Companies that rely on SwordNex" },
 { label: "Projects Delivered", value: 100, suffix: "+", icon: "inventory_2", color: "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400", border: "border-red-200 dark:border-red-800/70", desc: "Custom apps and campaigns completed" },
 { label: "Uptime Guarantee", value: 100, suffix: "%", icon: "cloud_done", color: "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400", border: "border-green-200 dark:border-green-800/70", desc: "Reliable mission-critical systems" },
 { label: "Expert Support", value: 24, suffix: "/7", icon: "support_agent", color: "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400", border: "border-yellow-200 dark:border-yellow-800/70", desc: "Dedicated team available anytime" }
 ].map((m, i) => (
 <div key={i} className={`trust-metric-card bg-white dark:bg-card-dark p-6 rounded-xl shadow-md border ${m.border} text-center group scroll-animate`} style={{ transitionDelay: `${i * 0.1}s` }}>
 <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full ${m.color} mb-4 group-hover:scale-110 transition-transform`}>
 <span className="material-icons-round text-3xl">{m.icon}</span>
 </div>
 <TrustStatCounter
 target={m.value}
 suffix={m.suffix}
 label={m.label}
 className="trust-metric-counter"
 />
 <p className="text-xs text-gray-400 mt-1">{m.desc}</p>
 </div>
 ))}
 </div>

 {/* Testimonials Horizontal 3D Rotation */}
          <Interactive3DReviews />
        </section>

 {/* About Section */}
 <section className="replay-letter-reveal relative py-12 lg:py-14 overflow-hidden scroll-animate">
 <div className="container mx-auto px-6 lg:px-12 relative z-10">

 {/* Heading */}
 <div className="text-center max-w-5xl mx-auto mb-10 lg:mb-12">
 <span className="inline-block py-1 px-3 rounded-full bg-blue-50 dark:bg-blue-900/30 text-primary text-sm font-semibold mb-4 tracking-wide uppercase">
 <span className="sr-only">{whyChooseHeadingText}</span>
 <span aria-hidden="true">{renderLetterRevealText(whyChooseHeadingText)}</span>
 </span>

 <h2
 className="trust-heading-description text-3xl lg:text-4xl max-w-5xl font-bold text-gray-900 dark:text-white leading-tight mb-4"
 style={{ '--trust-heading-reveal-delay': `${whyChooseDescriptionRevealDelay}ms` }}
 >
 Leading IT Company <br className="hidden md:block" />
 <span className="py-2 text-primary">
 Delivering Smart Software & IT Solutions
 </span>
 </h2>

 </div>

 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

 {/* Left Content */}
 <div className="lg:col-span-7 flex flex-col">

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

 {/* Mission */}
 {/* <div className="bg-surface-light dark:bg-surface-dark p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700">
 <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-primary mb-5">
 <span className="material-icons-round text-2xl">flag</span>
 </div>

 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
 Our Mission in IT Services
 </h3>

 <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
 Our mission is to deliver scalable and secure IT services in Kumbakonam, helping small and medium businesses grow through custom software development, SaaS solutions, and business automation systems.
 </p>
 </div> */}

 {/* Vision */}
 {/* <div className="bg-surface-light dark:bg-surface-dark p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700">
 <div className="w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 mb-5">
 <span className="material-icons-round text-2xl">visibility</span>
 </div>

 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
 Our Vision as a Technology Partner
 </h3>

 <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
 Our vision is to become a trusted IT company in Tamil Nadu, providing innovative software solutions and digital transformation services that empower businesses to succeed in a competitive market.
 </p>
 </div> */}
 </div>

 {/* Core Values */}
 <div className="h-full bg-surface-light dark:bg-surface-dark p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
 <span className="material-icons-round text-primary">diamond</span>
 Core Values of Our IT Solutions
 </h3>

              <ul className="space-y-4">
                <li className="core-value-item group">
                  <div className="core-value-tick-badge" aria-hidden="true">
                    <svg className="core-value-tick-icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M3.5 8.5L6.5 11.5L12.5 4.5"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="core-value-tick-path"
                      />
                    </svg>
                  </div>
                  <div className="core-value-text-block">
                    <strong className="block text-gray-900 dark:text-white text-lg mb-1">Ownership</strong>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      We take full responsibility to deliver reliable IT solutions that solve real business problems.
                    </p>
                  </div>
                </li>

                <li className="core-value-item group">
                  <div className="core-value-tick-badge" aria-hidden="true">
                    <svg className="core-value-tick-icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M3.5 8.5L6.5 11.5L12.5 4.5"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="core-value-tick-path"
                      />
                    </svg>
                  </div>
                  <div className="core-value-text-block">
                    <strong className="block text-gray-900 dark:text-white text-lg mb-1">Clarity</strong>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      Transparent communication, clear pricing, and structured development processes.
                    </p>
                  </div>
                </li>

                <li className="core-value-item group">
                  <div className="core-value-tick-badge" aria-hidden="true">
                    <svg className="core-value-tick-icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M3.5 8.5L6.5 11.5L12.5 4.5"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="core-value-tick-path"
                      />
                    </svg>
                  </div>
                  <div className="core-value-text-block">
                    <strong className="block text-gray-900 dark:text-white text-lg mb-1">Long-Term Thinking</strong>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      We build scalable software systems designed for long-term business growth.
                    </p>
                  </div>
                </li>
              </ul>
 </div>
 </div>

 {/* Right Content */}
 <div className="lg:col-span-5 relative mt-8 lg:mt-0 flex flex-col">

 <div className="relative h-full flex flex-col justify-center bg-white dark:bg-surface-dark p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">

 <div className="mb-6">
 <span className="material-icons-round text-primary text-5xl opacity-50">format_quote</span>
 </div>

                  <TypewriterQuote
                    quote="At SwordNex, we build powerful IT solutions and custom software that help businesses streamline operations, improve efficiency, and scale faster with modern technology."
                    speed={20}
                    className="mb-8"
                    textClassName="text-base sm:text-lg"
                  />
 <div className="-mt-8 mb-4 flex w-full justify-end" aria-hidden="true">
 <span className="material-icons-round rotate-180 text-5xl text-primary opacity-50">
 format_quote
 </span>
 </div>

 <div className="flex items-center gap-4 border-t border-gray-100 dark:border-gray-700 pt-6">
 <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary">
 <img
 src={kaja}
 alt="IT company in Kumbakonam founder SwordNex Technologies"
 className="w-full h-full object-cover"
 />
 </div>

 <div>
 <h4 className="font-bold text-gray-900 dark:text-white text-base">
 Kaja Najbudeen
 </h4>
 <p className="text-sm text-primary font-medium uppercase tracking-wider mt-1">
 Founder & CEO, SwordNex Technologies
 </p>
 </div>
 </div>
 </div>
 </div>
 </div>

 {/* Hidden SEO Boost */}
 <p className="hidden">
 SwordNex is a leading IT company in Kumbakonam providing software development, SaaS products, payroll, billing solutions, and IT services for small and medium businesses.
 </p>

 </div>
 </section>

 {/* Our Partners Section */}
 {partners.length > 0 && (
 <section className="py-12 md:py-16 overflow-hidden bg-white dark:bg-background-dark border-t border-slate-100 dark:border-slate-800 scroll-animate">
 <style>
 {`
 .partner-marquee {
 width: 100%;
 overflow: hidden;
 position: relative;
 }
 .partner-track {
 display: flex;
 width: max-content;
 animation: partner-scroll 30s linear infinite;
 }
 .partner-track:hover {
 animation-play-state: paused;
 }
 @keyframes partner-scroll {
 0% { transform: translateX(0); }
 100% { transform: translateX(-50%); }
 }
 `}
 </style>

 <div className="container mx-auto px-4 text-center mb-12">
 <span className="text-primary font-bold tracking-wider uppercase text-sm block mb-2">Network</span>
 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Our Partners</h2>
 <div className="w-20 h-1.5 bg-primary rounded-full mx-auto mt-4"></div>
 </div>

 <div className="relative partner-marquee">
 <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-white dark:from-background-dark to-transparent z-10 pointer-events-none"></div>
 <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-white dark:from-background-dark to-transparent z-10 pointer-events-none"></div>

 <div className="partner-track py-4 items-center">
 {[...partners, ...partners].map((partner, idx) => (
 <div key={`${partner.id}-${idx}`} className="flex-shrink-0 mx-6 w-40 h-20 md:w-48 md:h-24 transition-all duration-300 hover:scale-110 flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700">
 <img src={partner.imageUrl} alt={partner.originalName} className="mix-blend-multiply dark:mix-blend-normal" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
 </div>
 ))}
 </div>
 </div>
 </section>
 )}

 {/* CTA Section */}
 <section className="scroll-animate">
 <div className="relative flex w-full flex-col justify-center items-center overflow-x-hidden py-12 px-4 sm:py-16 sm:px-8 md:py-20 md:px-12">
 <div className="w-full max-w-6xl mx-auto">

 <div className="relative w-full overflow-hidden rounded-3xl bg-primary shadow-2xl shadow-primary/30 group">

 {/* Background Effects */}
 <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
 <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
 <div className="absolute -bottom-32 -right-10 w-80 h-80 rounded-full bg-white/10 blur-3xl"></div>
 <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
 </div>

 {/* Content */}
 <div className="relative z-10 flex flex-col items-center justify-center px-6 py-10 sm:px-12 sm:py-14 text-center">

 {/* SEO Optimized Heading */}
 <h2 className="text-white max-w-5xl text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-5">
 Looking for the Best IT Company in Kumbakonam?
 </h2>

 {/* SEO + Conversion Paragraph */}
 <p className="text-blue-100 text-sm sm:text-base md:text-lg font-medium leading-relaxed max-w-2xl mb-7">
 Get expert IT services, custom software development, SaaS solutions, and business automation tailored for your needs. Partner with SwordNex to build scalable digital solutions and grow your business faster.
 </p>

 {/* CTA */}
 <div className="flex flex-col items-center gap-4 w-full">
 <button
 onClick={() => setIsConsultationOpen(true)}
 className="group/btn relative inline-flex items-center justify-center h-12 px-7 py-3 overflow-hidden font-bold text-primary bg-white rounded-lg shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-white/30"
 >
 <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-white via-white to-blue-50"></span>

 <span className="relative flex items-center gap-2 text-base">
 Get IT Solutions Now
 <span className="material-symbols-outlined text-[20px] transition-transform duration-300 group-hover/btn:translate-x-1">
 arrow_forward
 </span>
 </span>
 </button>

 <div className="flex items-center gap-2 text-blue-200/90 text-sm font-medium mt-2">
 <span className="material-symbols-outlined text-[18px]">schedule</span>
 <span>Free consultation • Quick response • No obligation</span>
 </div>
 </div>

 </div>
 </div>
 </div>

 {/* Hidden SEO Boost */}
 <p className="hidden">
 SwordNex is a leading IT company in Kumbakonam offering software development, IT services, SaaS products, and business automation solutions for small and medium businesses in Tamil Nadu.
 </p>

 </div>
 </section>

 {/* Support Links Section */}
 <section className="bg-[#cfe3ff] dark:bg-[#2c2666] py-12 relative overflow-hidden scroll-animate">
 <div className="container mx-auto px-6 relative z-10">
 <div className="grid md:grid-cols-3 gap-6">
 <div className="bg-white dark:bg-surface-dark p-6 rounded-lg flex items-start gap-4 scroll-animate scroll-animate-delay-1">
 <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-primary p-1">
 <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center text-primary">
 <span className="material-icons-outlined text-lg">headset_mic</span>
 </div>
 </div>
 <div>
 <h4 className="font-bold text-gray-900 dark:text-white mb-1">Get Support</h4>
 <p className="text-xs text-text-muted-light dark:text-text-muted-dark mb-3 leading-relaxed">
 24/7 expert support to resolve issues quickly, keep your systems running smoothly
 </p>
 <a className="text-xs font-bold flex items-center hover:text-primary dark:text-white dark:hover:text-primary transition" href="/SupportPage">
 Go to support <span className="material-icons-outlined text-xs ml-1">arrow_forward</span>
 </a>
 </div>
 </div>
 <div className="bg-white dark:bg-surface-dark p-6 rounded-lg flex items-start gap-4 scroll-animate scroll-animate-delay-2">
 <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-red-400 p-1">
 <div className="w-full h-full bg-orange-100 rounded-full flex items-center justify-center text-red-500">
 <span className="material-icons-outlined text-lg">forum</span>
 </div>
 </div>
 <div>
 <h4 className="font-bold text-gray-900 dark:text-white mb-1">Our community</h4>
 <p className="text-xs text-text-muted-light dark:text-text-muted-dark mb-3 leading-relaxed">
 Join a vibrant community of professionals, learners, and innovators sharing knowledge
 </p>
 <a className="text-xs font-bold flex items-center hover:text-primary dark:text-white dark:hover:text-primary transition" href="/contact">
 Go to community <span className="material-icons-outlined text-xs ml-1">arrow_forward</span>
 </a>
 </div>
 </div>
 <div className="bg-white dark:bg-surface-dark p-6 rounded-lg flex items-start gap-4 scroll-animate scroll-animate-delay-3">
 <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-green-500 p-1">
 <div className="w-full h-full bg-green-100 rounded-full flex items-center justify-center text-green-500">
 <span className="material-icons-outlined text-lg">help_outline</span>
 </div>
 </div>
 <div>
 <h4 className="font-bold text-gray-900 dark:text-white mb-1">F.A.Q</h4>
 <p className="text-xs text-text-muted-light dark:text-text-muted-dark mb-3 leading-relaxed">
 Quick answers to common questions about our services and support
 </p>
 <a className="text-xs font-bold flex items-center hover:text-primary dark:text-white dark:hover:text-primary transition" href="/FAQPage">
 Go to FAQ <span className="material-icons-outlined text-xs ml-1">arrow_forward</span>
 </a>
 </div>
 </div>
 </div>
 </div>
 </section>
 <ConsultationModal isOpen={isConsultationOpen} onClose={() => setIsConsultationOpen(false)} />
 <ServiceEnquiryModal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />
 </>
 );
};

export default Home;