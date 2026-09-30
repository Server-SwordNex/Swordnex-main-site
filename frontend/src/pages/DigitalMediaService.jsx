import React, { useState } from 'react';
import ConsultationModal from '../components/ConsultationModal';
import ServiceEnquiryModal from '../components/ServiceEnquiryModal';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { Helmet } from "react-helmet";

<Helmet>
 <title>
 Best Digital Marketing Services in Kumbakonam | SEO, Social Media & Ads | SwordNex
 </title>

 <meta
 name="description"
 content="Top digital marketing company in Kumbakonam offering SEO, social media marketing, Google Ads, and branding services. Generate leads, increase traffic, and grow your business online with SwordNex."
 />

 <meta
 name="keywords"
 content="digital marketing services Kumbakonam, SEO company Kumbakonam, social media marketing Kumbakonam, Google Ads agency Kumbakonam, PPC services Tamil Nadu, branding agency Kumbakonam, lead generation services"
 />

 <meta name="author" content="SwordNex Technologies" />

 {/* Local SEO */}
 <meta name="geo.region" content="IN-TN" />
 <meta name="geo.placename" content="Kumbakonam" />
 <meta name="geo.position" content="10.9601;79.3845" />
 <meta name="ICBM" content="10.9601, 79.3845" />

 {/* Open Graph */}
 <meta
 property="og:title"
 content="Digital Marketing Services in Kumbakonam | SwordNex"
 />
 <meta
 property="og:description"
 content="Boost your business with SEO, social media marketing, and Google Ads services in Kumbakonam. Get more leads and sales with SwordNex."
 />
 <meta property="og:type" content="website" />
 <meta property="og:url" content="https://yourwebsite.com/digital-marketing-kumbakonam" />
 <meta property="og:image" content="https://yourwebsite.com/og-image.jpg" />

 {/* Twitter */}
 <meta name="twitter:card" content="summary_large_image" />
 <meta
 name="twitter:title"
 content="Best Digital Marketing Services in Kumbakonam"
 />
 <meta
 name="twitter:description"
 content="SEO, social media marketing, and paid ads services in Kumbakonam to grow your business online."
 />
 <meta name="twitter:image" content="https://yourwebsite.com/og-image.jpg" />
</Helmet>

const SectionTitle = ({ eyebrow, title, highlight, subtitle, animationDelay = 0 }) => {
 const controls = useAnimation();
 const [ref, inView] = useInView({
 triggerOnce: true,
 threshold: 0.1,
 });

 useEffect(() => {
 if (inView) {
 controls.start('visible');
 }
 }, [controls, inView]);

 return (
 <motion.div
 ref={ref}
 initial="hidden"
 animate={controls}
 variants={{
 hidden: { opacity: 0, y: 20 },
 visible: {
 opacity: 1,
 y: 0,
 transition: {
 duration: 0.6,
 delay: animationDelay,
 ease: [0.4, 0, 0.2, 1]
 }
 }
 }}
 className="mx-auto max-w-3xl text-center"
 >
 {eyebrow && (
 <p className="text-sm uppercase tracking-[0.2em] text-blue-600 font-semibold">
 {eyebrow}
 </p>
 )}

 <h2 className="mt-3 text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
 {title}{" "}
 {highlight && (
 <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
 {highlight}
 </span>
 )}
 </h2>

 {subtitle && (
 <p className="mt-5 text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
 {subtitle}
 </p>
 )}
 </motion.div>
 );
};

const Card = ({ title, desc, icon, index }) => {
 const controls = useAnimation();
 const [ref, inView] = useInView({
 triggerOnce: true,
 threshold: 0.1,
 });

 useEffect(() => {
 if (inView) {
 controls.start('visible');
 }
 }, [controls, inView]);

 return (
 <motion.div
 ref={ref}
 initial="hidden"
 animate={controls}
 variants={{
 hidden: { opacity: 0, y: 30 },
 visible: {
 opacity: 1,
 y: 0,
 transition: {
 duration: 0.6,
 delay: index * 0.1,
 ease: [0.4, 0, 0.2, 1]
 }
 }
 }}
 className="group relative rounded-3xl border-2 border-slate-200 bg-white p-8 transition-all duration-300 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/10"
 >
 <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-blue-50 to-cyan-50/50 rounded-3xl pointer-events-none" />
 <div className="relative z-10">
 <div className="mb-6 flex items-center gap-4">
 {icon && (
 <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20">
 {icon}
 </div>
 )}
 <h3 className="text-xl font-bold text-slate-900">{title}</h3>
 </div>
 <div className="text-slate-600 leading-relaxed">{desc}</div>
 </div>
 </motion.div>
 );
};

const Step = ({ index, title, desc, animationDelay = 0 }) => {
 const controls = useAnimation();
 const [ref, inView] = useInView({
 triggerOnce: true,
 threshold: 0.1,
 });

 useEffect(() => {
 if (inView) {
 controls.start('visible');
 }
 }, [controls, inView]);

 return (
 <motion.div
 ref={ref}
 initial="hidden"
 animate={controls}
 variants={{
 hidden: { opacity: 0, y: 30 },
 visible: {
 opacity: 1,
 y: 0,
 transition: {
 duration: 0.6,
 delay: animationDelay,
 ease: [0.4, 0, 0.2, 1]
 }
 }
 }}
 className="relative rounded-3xl border-2 border-slate-200 bg-white p-8 transition-all hover:border-blue-500 hover:shadow-xl"
 >
 <div className="absolute -top-5 -left-5 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold shadow-lg shadow-blue-500/30">
 {index}
 </div>
 <h4 className="mb-4 text-xl font-semibold text-slate-900">{title}</h4>
 <div className="text-slate-600 text-[15px] leading-relaxed">{desc}</div>
 </motion.div>
 );
};

const FadeInWhenVisible = ({ children, delay = 0 }) => {
 const controls = useAnimation();
 const [ref, inView] = useInView({
 triggerOnce: true,
 threshold: 0.1,
 });

 useEffect(() => {
 if (inView) {
 controls.start('visible');
 }
 }, [controls, inView]);

 return (
 <motion.div
 ref={ref}
 initial="hidden"
 animate={controls}
 variants={{
 hidden: { opacity: 0, y: 20 },
 visible: {
 opacity: 1,
 y: 0,
 transition: {
 duration: 0.6,
 delay: delay,
 ease: [0.4, 0, 0.2, 1]
 }
 }
 }}
 >
 {children}
 </motion.div>
 );
};

const StatCard = ({ value, label, icon, color, delay }) => {
 return (
 <FadeInWhenVisible delay={delay}>
 <div className="bg-white dark:bg-card-dark p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700 text-center">
 <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${color}-50 dark:bg-${color}-900/30 text-${color}-600 mb-6`}>
 <span className="material-icons-round text-3xl">{icon}</span>
 </div>
 <h3 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">{value}</h3>
 <p className="text-gray-600 dark:text-gray-400 font-medium">{label}</p>
 </div>
 </FadeInWhenVisible>
 );
};

const ServiceCard = ({ title, description, icon, color, link, delay }) => {
 return (
 <FadeInWhenVisible delay={delay}>
 <div className="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col h-full">
 <div className={`w-14 h-14 rounded-2xl bg-${color}-100 flex items-center justify-center text-${color}-700 mb-6 group-hover:scale-110 transition-transform`}>
 <span className="material-icons-round text-2xl">{icon}</span>
 </div>
 <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
 <p className="text-gray-600 leading-relaxed text-sm flex-grow">{description}</p>
 <Link
 to={link}
 className={`mt-8 mb-0 w-full py-3 rounded-xl bg-${color}-600 text-white font-semibold transition-all duration-300 hover:bg-${color}-700 hover:scale-[1.02] inline-flex justify-center`}
 >
 Explore
 </Link>
 </div>
 </FadeInWhenVisible>
 );
};

export default function DigitalMedia() {
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

 // Hero section scroll effects
 const { scrollYProgress } = useScroll();
 const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);
 const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.98]);

 const services = [
 {
 title: "Brand Identity & Design Services",
 desc: (
 <ul className="list-disc list-inside text-slate-600 space-y-2">
 <li>Professional Logo Design for Businesses</li>
 <li>Complete Brand Identity & Visual Guidelines</li>
 <li>Color Palette & Typography Systems</li>
 <li>Social Media Branding Kits</li>
 <li>Creative Motion Graphics & Visual Assets</li>
 <li>Scalable Branding for Startups & Enterprises</li>
 <li>Build a Strong, Memorable Brand Presence</li>
 </ul>
 ),
 icon: (
 <svg className="h-6 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
 <path strokeWidth="2" d="M7 21h10M7 3h10M12 3v18" />
 <path strokeWidth="2" d="M5 7h14M5 17h14" />
 </svg>
 ),
 },
 {
 title: "Social Media Marketing & Content Strategy",
 desc: (
 <ul className="list-disc list-inside text-slate-600 space-y-2">
 <li>High-Engagement Social Media Content Creation</li>
 <li>Strategic Content Planning & Monthly Calendars</li>
 <li>Instagram Reels, Short Videos & Viral Content</li>
 <li>Creative Carousel Posts & Story Designs</li>
 <li>Community Management & Audience Growth</li>
 <li>Paid Social Media Campaigns (Meta Ads)</li>
 <li>Increase Followers, Engagement & Leads</li>
 </ul>
 ),
 icon: (
 <svg className="h-6 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
 <path strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8-2.31 0-4.46-.586-6.28-1.6L3 21l1.6-2.72C3.586 16.46 3 14.31 3 12c0-4.97 4.03-9 9-9s9 4.03 9 9Z" />
 </svg>
 ),
 },
 {
 title: "Performance Marketing & Paid Ads (ROI Focused)",
 desc: (
 <ul className="list-disc list-inside text-slate-600 space-y-2">
 <li>Google Ads (Search, Display & YouTube Ads)</li>
 <li>Meta Ads (Facebook & Instagram Advertising)</li>
 <li>Conversion Tracking & Funnel Optimization</li>
 <li>Lead Generation & Sales Campaigns</li>
 <li>Retargeting & Audience Segmentation</li>
 <li>High-ROI PPC Campaign Management</li>
 <li>Scale Your Business with Data-Driven Ads</li>
 </ul>
 ),
 icon: (
 <svg className="h-6 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
 <path strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
 </svg>
 ),
 },
 {
 title: "Video Marketing & Content Production",
 desc: (
 <ul className="list-disc list-inside text-slate-600 space-y-2">
 <li>Professional Brand & Product Video Production</li>
 <li>Short-Form Videos for Instagram & YouTube Shorts</li>
 <li>High-Converting Promotional Video Ads</li>
 <li>Green Screen Studio & Creative Shoots</li>
 <li>Influencer & Social Media Video Marketing</li>
 <li>Advanced Video Editing & Motion Graphics</li>
 <li>Boost Engagement with Visual Storytelling</li>
 </ul>
 ),
 icon: (
 <svg className="h-6 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
 <path strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z" />
 </svg>
 ),
 },
 ];

 const process = [
 [
 "Strategy & Research",
 <ul className="list-disc list-inside text-slate-600 space-y-1">
 <li>Audience analysis</li>
 <li>Competitor research</li>
 <li>Market trends</li>
 <li>SaaS product planning</li>
 </ul>
 ],
 [
 "Creative Direction",
 <ul className="list-disc list-inside text-slate-600 space-y-1">
 <li>Moodboards</li>
 <li>Visual concepts</li>
 <li>Storytelling</li>
 <li>UI/UX visual language design</li>
 </ul>
 ],
 [
 "Content Creation",
 <ul className="list-disc list-inside text-slate-600 space-y-1">
 <li>Video shooting</li>
 <li>Graphic design</li>
 <li>Copywriting</li>
 <li>Full-scale content production</li>
 </ul>
 ],
 [
 "Launch & Scale",
 <ul className="list-disc list-inside text-slate-600 space-y-1">
 <li>Social posting</li>
 <li>Paid boosting</li>
 <li>Performance monitoring</li>
 <li>Campaign optimization</li>
 </ul>
 ],
 ];

 const whyUs = [
 [
 "Results-Driven Creativity",
 <ul className="list-disc list-inside text-slate-600 space-y-1">
 <li>ROI-focused campaigns</li>
 <li>Engagement-boosting content</li>
 <li>Measurable marketing results</li>
 </ul>
 ],
 [
 "Fast Turnaround",
 <ul className="list-disc list-inside text-slate-600 space-y-1">
 <li>Weekly content publishing</li>
 <li>Rapid campaign launches</li>
 <li>Agile digital marketing</li>
 </ul>
 ],
 [
 "Trend-Aware Team",
 <ul className="list-disc list-inside text-slate-600 space-y-1">
 <li>Latest social media trends</li>
 <li>Viral formats</li>
 <li>Short-form videos</li>
 <li>Current digital styles</li>
 </ul>
 ],
 ];

 return (
 <main className="relative min-h-screen bg-white">
 {/* HERO - Blue Background */}
 <motion.section
 style={{ opacity: heroOpacity, scale: heroScale }}
 className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 px-6 py-12"
 >
 {/* Background */}
 <div className="absolute inset-0 opacity-10">
 <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.5),transparent_50%)]" />
 <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.3),transparent_60%)]" />
 </div>

 <div className="relative mx-auto max-w-6xl text-center">

 {/* SEO Eyebrow */}
 <FadeInWhenVisible>
 <p className="text-sm md:text-base uppercase tracking-wider text-white/90 font-semibold">
 Digital Marketing Company in Kumbakonam
 </p>
 </FadeInWhenVisible>

 {/* 🔥 MAIN SEO H1 */}
 <FadeInWhenVisible delay={0.2}>
 <h1 className="mt-5 font-extrabold leading-tight text-white">

 {/* Line 1 - smaller, clean */}
 <span className="block text-2xl sm:text-3xl md:text-4xl">
 Digital Marketing Services in
 </span>

 {/* Line 2 - highlight */}
 <span className="block text-3xl sm:text-4xl md:text-5xl text-cyan-200 mt-1">
 Kumbakonam
 </span>

 {/* Line 3 - supporting */}
 <span className="block text-base sm:text-lg text-white/80 mt-1 uppercase tracking-wide">
 #1 Digital Marketing Company
 </span>

 </h1>
 </FadeInWhenVisible>

 {/* 🔥 HIGH-CONVERSION SUBTEXT */}
 <FadeInWhenVisible delay={0.4}>
 <p className="mt-6 text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
 Generate more leads, increase website traffic, and grow your business with ROI-driven digital marketing services. We specialize in SEO, social media marketing, and high-converting paid ads for businesses in Kumbakonam.
 </p>
 </FadeInWhenVisible>

 {/* 🔥 CTA (Conversion Focused) */}
 <FadeInWhenVisible delay={0.6}>
 <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
 <button
 onClick={() => setIsEnquiryOpen(true)}
 className="rounded-xl bg-white text-blue-700 px-10 py-4 font-bold shadow-xl transition-all hover:scale-[1.05]"
 >
 Get Free Leads Strategy →
 </button>

 <button
 onClick={() => setIsModalOpen(true)}
 className="rounded-xl border-2 border-white bg-transparent text-white px-10 py-4 font-semibold transition-all"
 >
 Book Free Consultation
 </button>
 </div>
 </FadeInWhenVisible>

 {/* 🔥 TRUST + KEYWORDS */}
 <FadeInWhenVisible delay={0.8}>
 <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
 {[
 ["SEO Services", "Rank #1 on Google"],
 ["Social Media Marketing", "Boost Engagement"],
 ["Google Ads / PPC", "High ROI Campaigns"],
 ["Lead Generation", "Convert Visitors to Clients"],
 ].map(([k, v]) => (
 <div
 key={k}
 className="rounded-2xl border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-3 transition"
 >
 <p className="text-sm font-semibold text-white">{k}</p>
 <p className="text-xs text-white/80">{v}</p>
 </div>
 ))}
 </div>
 </FadeInWhenVisible>

 </div>
 </motion.section>

 {/* SERVICES - White Background */}
 <section className="bg-white mx-auto max-w-7xl px-6 py-20">
 <SectionTitle
 eyebrow="What We Deliver"
 title="We Create & Scale"
 highlight="Digital Presence"
 subtitle="From brand identity to high-performing paid campaigns — everything your brand needs to stand out and convert in 2026."
 />

 <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
 {services.map((item, index) => (
 <Card key={item.title} {...item} index={index} />
 ))}
 </div>
 </section>

 {/* PROCESS - Light Blue Background */}
 <section className="relative py-20 bg-gradient-to-b from-blue-50 to-white">
 <div className="relative mx-auto max-w-6xl px-6">
 <SectionTitle
 eyebrow="Our Development Process"
 title="From Concept to"
 highlight="Market-Ready Software"
 subtitle="Agile, scalable, and data-driven software development that ensures fast delivery and high-quality results for SaaS and enterprise solutions."
 />

 <div className="mt-12 grid md:grid-cols-4 gap-8">
 {process.map(([title, desc], i) => (
 <Step key={title} index={i + 1} title={title} desc={desc} animationDelay={i * 0.1} />
 ))}
 </div>
 </div>
 </section>

 {/* WHY US - White Background */}
 <section className="bg-white mx-auto max-w-6xl px-6 py-20">
 <SectionTitle
 eyebrow="Why Choose Us"
 title="We Don't Just Make"
 highlight="Content"
 subtitle="We build systems that bring consistent attention, engagement & revenue."
 />

 <div className="mt-12 grid md:grid-cols-3 gap-8">
 {whyUs.map(([title, desc], index) => (
 <Card key={title} title={title} desc={desc} index={index} />
 ))}
 </div>
 </section>

 {/* STATS SECTION */}
 <section className="py-1 lg:py-15 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="text-center mb-16">
 <FadeInWhenVisible>
 <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
 Why Top Brands Choose <span className="text-primary">SwordNex Digital Media</span>
 </h2>
 </FadeInWhenVisible>
 <FadeInWhenVisible delay={0.2}>
 <div className="h-1.5 w-24 bg-primary mx-auto rounded-full flex gap-2 justify-center items-center">
 <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
 <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
 <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
 </div>
 </FadeInWhenVisible>
 <FadeInWhenVisible delay={0.4}>
 <p className="mt-6 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
 We create ROI-driven digital marketing strategies, scalable social media campaigns, and measurable growth for SaaS, startups, and tech brands.
 </p>
 </FadeInWhenVisible>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
 <StatCard
 value="50+"
 label="Long-term Brand Clients"
 icon="groups"
 color="blue"
 delay={0.1}
 />
 <StatCard
 value="100+"
 label="Successful Social Media Campaigns"
 icon="campaign"
 color="orange"
 delay={0.2}
 />
 <StatCard
 value="3X"
 label="Average Engagement Growth"
 icon="trending_up"
 color="green"
 delay={0.3}
 />
 <StatCard
 value="24/7"
 label="Expert Campaign Support"
 icon="support_agent"
 color="purple"
 delay={0.4}
 />
 </div>
 </section>

 {/* CTA - Blue Gradient Background */}
 <section id="digital-media" className="bg-gradient-to-b from-white to-blue-50 px-6 py-8">
 <FadeInWhenVisible>
 <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 to-cyan-700 p-10 md:p-12 text-center shadow-2xl">
 <h2 className="text-3xl md:text-4xl font-extrabold text-white">
 Amplify Your Brand with Results <br />Driven Digital Media
 </h2>
 <p className="mt-4 text-white/90 leading-relaxed max-w-3xl mx-auto">
 Boost engagement, grow your audience, and drive measurable ROI with our expert social media campaigns and digital marketing strategy tailored for SaaS, startups, and tech brands.
 </p>

 <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
 <button
 onClick={() => setIsModalOpen(true)}
 className="px-10 py-3 rounded-xl bg-white text-blue-800 font-bold transition-all duration-300 hover:scale-[1.02] shadow-lg"
 >
 Schedule Your Free Strategy Call →
 </button>
 </div>
 </div>
 </FadeInWhenVisible>
 </section>

 {/* SERVICE CARDS */}
 <section
 id="other-services"
 className="relative bg-gradient-to-b from-white to-blue-50 px-6 pb-28 pt-16"
 >
 <div className="mx-auto max-w-6xl space-y-14">
 {/* HEADER */}
 <div className="text-center max-w-3xl mx-auto">
 <FadeInWhenVisible>
 <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
 Other Services
 </span>
 </FadeInWhenVisible>
 <FadeInWhenVisible delay={0.2}>
 <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-gray-900">
 Beyond Software, We Support Your Growth
 </h2>
 </FadeInWhenVisible>
 <FadeInWhenVisible delay={0.4}>
 <p className="mt-4 text-gray-600 leading-relaxed">
 For startups, businesses, or internal systems, we offer complete end-to-end support for sustainable growth.
 </p>
 </FadeInWhenVisible>
 </div>

 {/* SERVICE CARDS */}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
 <ServiceCard
 title="Application Development"
 description="Custom web and mobile applications tailored to your business workflow, including internal dashboards, client portals, and scalable digital solutions"
 icon="campaign"
 color="blue"
 link="/services/application-development"
 delay={0.1}
 />
 <ServiceCard
 title="HR & People Ops Systems"
 description="Scalable HR systems, payroll, and compliance solutions integrated with enterprise software for seamless workforce management."
 icon="groups"
 color="purple"
 link="/services/hr-consulting"
 delay={0.2}
 />
 <ServiceCard
 title="IT Infrastructure & Cloud"
 description="Secure, monitored networks, cloud deployments, and enterprise-grade IT solutions ensuring your SaaS products and apps run flawlessly."
 icon="dns"
 color="cyan"
 link="/services/it-infrastructure"
 delay={0.3}
 />
 <ServiceCard
 title="IT Training & Skill Development"
 description="Job-focused training in full stack, Python, web technologies, and real-world client projects, preparing teams and students to work on enterprise applications."
 icon="school"
 color="green"
 link="/services/it-training-skill-development"
 delay={0.4}
 />
 </div>
 </div>
 </section>

 {/* Modals */}
 <ServiceEnquiryModal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />
 <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
 </main>
 );
}