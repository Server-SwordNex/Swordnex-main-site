import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../config/apiConfig';
import ConsultationModal from '../components/ConsultationModal';
import ServiceEnquiryModal from '../components/ServiceEnquiryModal';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import kaja from '../assets/Founder_1.jpeg';
import "swiper/css";
import { Helmet } from "react-helmet-async";

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
 if (entry.isIntersecting) {
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
 <div>
 {/* Header/Hero Section */}
 <header className="relative pt-12 pb-12 lg:pt-16 lg:pb-16 overflow-hidden scroll-animate">
 {/* Background elements */}
 <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-bl from-indigo-50/50 via-white to-white dark:from-slate-800/20 dark:via-background-dark dark:to-background-dark rounded-bl-[100px]"></div>
 <div className="absolute top-20 left-10 w-64 h-64 bg-purple-200/20 dark:bg-purple-900/10 rounded-full blur-3xl -z-10"></div>
 <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-200/20 dark:bg-blue-900/10 rounded-full blur-3xl -z-10"></div>

 {/* FULLY CENTERED CONTENT */}
 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
 <div className="flex flex-col items-center justify-center gap-6 lg:gap-8 py-6 lg:py-10 relative">

 {/* FLOATING ICONS - SIDES */}
 <div className="absolute inset-0 pointer-events-none overflow-hidden -z-0">
 {/* LEFT SIDE ICONS */}
 <div className="absolute left-4 top-1/4 w-12 h-12 md:left-8 md:w-14 md:h-14 lg:left-12 lg:w-16 lg:h-16 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-xl shadow-2xl border border-white/50 animate-[float-left_6s_ease-in-out_infinite] opacity-70 hover:opacity-100 group hover:scale-110 transition-all duration-500 z-5">
 <svg viewBox="0 0 24 24" className="w-full h-full p-2.5 text-blue-600 group-hover:text-blue-700">
 <path fill="currentColor" d="M12 2L13.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L10.91 8.26L12 2Z" />
 </svg>
 </div>

 <div className="absolute left-6 bottom-1/4 w-12 h-12 md:left-10 md:w-14 md:h-14 lg:left-14 lg:w-16 lg:h-16 bg-gradient-to-br from-green-500/80 to-emerald-600/80 backdrop-blur-md rounded-xl shadow-2xl border border-white/30 animate-[float-left_5s_ease-in-out_infinite_2s] opacity-70 hover:opacity-100 group hover:scale-110 transition-all duration-500 z-5">
 <svg viewBox="0 0 24 24" className="w-full h-full p-2.5 text-white">
 <path fill="currentColor" d="M7.46 20.083l1.687-7.584h5.167l1.687 7.584h3.417l-2.292-10.25h-3.417l-.834-3.667-1.25 5.667h-5.167l-.833-3.667-1.25 5.667h-3.417l-2.292 10.25h3.417zm5.084-7.584h-2.917l1.458-6.583h2.917l-1.458 6.583z" />
 </svg>
 </div>

 {/* RIGHT SIDE ICONS */}
 <div className="absolute right-4 top-1/3 w-12 h-12 md:right-8 md:w-14 md:h-14 lg:right-12 lg:w-16 lg:h-16 bg-gradient-to-br from-emerald-400/80 to-teal-500/80 backdrop-blur-md rounded-xl shadow-2xl border border-white/30 animate-[float-right_7s_ease-in-out_infinite_1s] opacity-70 hover:opacity-100 group hover:scale-110 transition-all duration-500 z-5">
 <svg viewBox="0 0 48 48" className="w-full h-full p-2.5 text-white">
 <path fill="currentColor" d="M44.083 0h-35.75a6.333 6.333 0 0 0-6.333 6.333v35.75a6.333 6.333 0 0 0 6.333 6.334h35.75a6.334 6.334 0 0 0 6.333-6.334V6.333A6.334 6.334 0 0 0 44.083 0zm-3.084 39.084H7.25V8.917h33.749v30.167zM16.708 25.583h6.084v11.583h4.917V25.583h6.083v-4.75h-6.083v-4.083h-4.917v4.083h-6.084v4.75zm11.75-4.75h8.083V17.75h-8.083v3.083z" />
 </svg>
 </div>

 <div className="absolute right-6 bottom-1/3 w-12 h-12 md:right-10 md:w-14 md:h-14 lg:right-14 lg:w-16 lg:h-16 bg-gradient-to-br from-pink-500/80 to-purple-600/80 backdrop-blur-md rounded-xl shadow-2xl border border-white/30 animate-[float-right_8s_ease-in-out_infinite_3s] opacity-70 hover:opacity-100 group hover:scale-110 transition-all duration-500 z-5">
 <svg viewBox="0 0 24 24" className="w-full h-full p-2.5 text-white">
 <path fill="currentColor" d="M3 3h3v3H3zM6 3h3v3H6zM9 3h3v3H9zM3 6h3v3H3zM6 6h3v3H6zM9 6h3v3H9zM3 9h3v3H3zM6 9h3v3H6zM9 9h3v3H9z" />
 </svg>
 </div>
 </div>

 {/* CENTERED TEXT CONTENT */}
 <div className="flex flex-col items-center text-center space-y-6 max-w-8xl mx-auto relative z-10">
 <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-8xl xl:text-6xl text-gray-900 dark:text-white leading-tight scroll-animate scroll-animate-delay-1">
 Looking for the 
 <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500 mt-2 lg:mt-1 pb-1 lg:pb-2">
 Best IT Solutions & Software Company in Tamil Nadu? 
 </span>
 </h1>

 <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-6xl mx-auto">
 Get expert IT Services, Custom Software Development, SaaS Solutions, and Business Automation tailored for your enterprise. Partner with SwordNex Technologies—a premier IT Solutions provider—to build scalable digital solutions and accelerate your business growth.
 </p>

 <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-2xl mx-auto scroll-animate scroll-animate-delay-3">
 <button
 onClick={() => setIsConsultationOpen(true)}
 className="inline-flex justify-center items-center px-8 py-4 rounded-full bg-primary text-white font-semibold text-lg shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 hover:shadow-indigo-500/50 transition-all transform hover:-translate-y-1"
 >
 Our IT Solutions
 </button>
 <Link to="/services" className="inline-flex justify-center items-center px-8 py-4 rounded-full border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-semibold text-lg hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary transition-all bg-transparent">
 <span className="material-icons-round mr-2 text-xl">play_circle_outline</span>
 Explore Job-Oriented Training
 </Link>
 </div>

 <div className="grid grid-cols-3 gap-3 sm:gap-6 lg:gap-8 items-center text-xs sm:text-base text-gray-500 dark:text-gray-400 font-semibold scroll-animate scroll-animate-delay-4">
 <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 p-3 bg-green-50/50 dark:bg-green-900/20 rounded-2xl shadow-md hover:scale-105 transition-all text-center sm:text-left">
 <span className="bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 rounded-xl p-2">
 <span className="material-icons-round text-lg">check</span>
 </span>
 <span>80+ Clients</span>
 </div>

 <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 p-3 bg-blue-50/50 dark:bg-blue-900/20 rounded-2xl shadow-md hover:scale-105 transition-all text-center sm:text-left">
 <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-xl p-2">
 <span className="material-icons-round text-lg">layers</span>
 </span>
 <span>100+ Projects</span>
 </div>

 <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 p-3 bg-orange-50/50 dark:bg-orange-900/20 rounded-2xl shadow-md hover:scale-105 transition-all text-center sm:text-left">
 <span className="bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 rounded-xl p-2">
 <span className="material-icons-round text-lg">support_agent</span>
 </span>
 <span>24/7 Support</span>
 </div>
 </div>
 </div>

 </div>
 </div>
 <section className="w-full bg-white dark:bg-gray-900 py-6 overflow-hidden">
 <style>
 {`
 .marquee {
 width: 100%;
 overflow: hidden;
 position: relative;
 }

 .marquee-track {
 display: flex;
 width: max-content;
 animation: marquee 25s linear infinite;
 }

 .marquee-item {
 flex: 0 0 auto;
 width: 220px;
 height: 90px;
 margin-right: 32px;
 display: flex;
 align-items: center;
 justify-content: center;
 background: #f9fafb;
 border-radius: 16px;
 }

 .marquee-item img {
 height: 48px;
 width: auto;
 object-fit: contain;
 opacity: 0.85;
 }

 @keyframes marquee {
 0% {
 transform: translateX(0);
 }
 100% {
 transform: translateX(-50%);
 }
 }
 `}
 </style>

 {/* <div className="max-w-8xl mx-auto py-2">
 <div className="marquee">
 <div className="marquee-track py-2">
 {[...cardImages, ...cardImages].map((item, index) => (
 <div key={index} className="marquee-item">
 <img
 src={item.src}
 alt={item.alt}
 loading="lazy"
 />
 </div>
 ))}
 </div>
 </div>
 </div> */}
 </section>

 {/* CSS Animations */}
 <style jsx>{`
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
 <div className="absolute bottom-0 left-0 right-0">
 <svg className="fill-white dark:fill-background-dark w-full h-16 lg:h-24 transform translate-y-1" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
 <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" fillOpacity="1"></path>
 </svg>
 </div>
 </header>

 {/* Challenges Section */}
 <section className="py-20 px-4 md:px-8 scroll-animate">
 <div className="max-w-8xl mx-auto flex flex-col items-center">
 <div className="max-w-7xl text-center mb-12">
 <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
 Business Problems to Smart IT Solutions
 </h2>

 <p className="text-lg max-w-6xl text-slate-600 dark:text-slate-300 leading-relaxed">
 Many businesses in Kumbakonam still depend on manual work, outdated software, and unstructured marketing strategies — which slows growth and reduces efficiency.
 </p>
 </div>
 <div className="w-full max-w-5xl bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-700">
 <div className="flex flex-col md:flex-row">
 <div className="w-full md:w-1/2 p-8 md:p-12 bg-slate-20 dark:bg-slate-800/50 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-700 relative overflow-hidden group">
 <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-red-100 dark:bg-red-900/20 rounded-full blur-3xl opacity-50"></div>
 <div className="relative z-10">
 <div className="flex items-center gap-3 mb-8">
 <div className="size-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
 <span className="material-symbols-outlined">warning</span>
 </div>
 <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Challenges</h3>
 </div>
 <ul className="space-y-8">
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
 </div>
 <div className="w-full md:w-1/2 p-8 md:p-12 bg-white dark:bg-slate-800 relative overflow-hidden">
 <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-40 h-40 bg-primary/10 rounded-full blur-3xl opacity-60"></div>
 <div className="relative z-10">
 <div className="flex items-center gap-3 mb-8">
 <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
 <span className="material-symbols-outlined">bolt</span>
 </div>
 <h3 className="text-xl font-bold text-primary">How SwordNex helps</h3>
 </div>
 <ul className="space-y-8">
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
 </div>
 </div>
 </div>
 <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6 text-center">
 <p className="text-slate-500 dark:text-red-500 font-medium"> Looking for the best IT company in Kumbakonam to grow your business?</p>
 <button
 onClick={() => setIsConsultationOpen(true)}
 className="inline-flex items-center justify-center h-10 px-6 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold hover:opacity-90 transition-opacity gap-2 group">
 <span>Get Free IT Consultation</span>
 <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
 </button>
 </div>
 </div>
 <p className="sr-only">
 IT Services in Kumbakonam, Best Software Development Company in Kumbakonam, SaaS Solutions Provider, Web Development Company, Mobile App Development, SEO Services in Kumbakonam, Digital Marketing Agency, IT Training Institute in Kumbakonam
 </p>
 </section>

 {/* Products Spotlight Section */}
 <section className="py-24 bg-gray-50 dark:bg-surface-dark/50 relative overflow-hidden scroll-animate">
 <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
 <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
 <div className="container mx-auto px-6 relative z-10">
 <div className="text-center mb-16">
 <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block"> IT Products & SaaS Solutions
 </span>
 <h2 className="text-3xl md:text-4xl font-bold dark:text-white">Software Products & SaaS Solutions</h2>
 <div className="w-20 h-1.5 bg-primary rounded-full mx-auto mt-4"></div>
 </div>
 <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
 {/* Product Card 1 */}
 <div className="group bg-white dark:bg-background-dark rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:border-green-500/50 dark:hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden scroll-animate scroll-animate-delay-1">
 <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
 </div>
 <div className="relative z-10">
 <div className="flex items-center gap-3 mb-6">
 <div className="bg-green-500/10 dark:bg-yellow/20 p-3 rounded-lg">
 <img src="/assets/icoillig.png" alt="Badge" className="w-6 h-6 object-contain" />
 </div>
 <h3 className="text-2xl font-bold text-gray-900 dark:text-white">SwordNex Billing</h3>
 </div>
 <h4 className="text-large font-medium text-gray-800 dark:text-gray-200 mb-6 leading-relaxed">
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
 </div>
 {/* Product Card 2 */}
 <div className="group bg-white dark:bg-background-dark rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:border-blue-500/50 dark:hover:border-secondary/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden scroll-animate scroll-animate-delay-2">
 <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
 <span className="material-icons-outlined text-9xl text-secondary">people_alt</span>
 </div>
 <div className="relative z-10">
 <div className="flex items-center gap-3 mb-6">
 <div className="bg-blue-500/10 dark:bg-secondary/20 p-3 rounded-lg">
 <img src="/assets/icon payroll.png" alt="Badge" className="w-6 h-6 object-contain" />
 </div>
 <h3 className="text-2xl font-bold text-gray-900 dark:text-white">SwordNex Payroll</h3>
 </div>
 <h4 className="text-large font-medium text-gray-800 dark:text-gray-200 mb-6 leading-relaxed">
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
 </div>
 {/* Product Card 3 */}
 <div className="group bg-white dark:bg-background-dark rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:border-yellow-500/50 dark:hover:border-yellow-500/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden scroll-animate scroll-animate-delay-3">
 <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
 </div>
 <div className="relative z-10">
 <div className="flex items-center gap-3 mb-6">
 <div className="bg-yellow-500/10 dark:bg-teal-yellow/20 p-3 rounded-lg">
 <img src="/assets/icon hms.png" alt="Badge" className="w-6 h-6 object-contain" />
 </div>
 <h3 className="text-2xl font-bold text-gray-900 dark:text-white">SwordNex HMS</h3>
 </div>
 <h4 className="text-large font-medium text-gray-800 dark:text-gray-200 mb-6 leading-relaxed">
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
 </div>
 </div>
 </div>
 <div className="flex justify-center mt-10">
 <button
 className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow transition"
 onClick={() => window.location.href = '/products'}
 >
 Explore All IT Products
 </button> </div>

 <p className="sr-only">
 SaaS products in Kumbakonam, billing software, payroll software, HRMS software, inventory management system, IT products company in Kumbakonam
 </p>
 </section>

 {/* Services Section */}
 <section className="relative py-20 lg:py-28 overflow-hidden scroll-animate">
 <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200/20 dark:bg-blue-900/10 rounded-full blur-3xl pointer-events-none"></div>
 <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-[500px] h-[500px] bg-indigo-200/20 dark:bg-indigo-900/10 rounded-full blur-3xl pointer-events-none"></div>
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
 <div className="max-w-6xl mx-auto text-center mb-16 lg:mb-20">
 <span className="block text-primary font-semibold tracking-wider uppercase text-sm mb-3">
 IT Services in Kumbakonam
 </span>
 <h2 className="text-3xl max-w-6xl lg:text-4xl font-display font-bold text-slate-900 dark:text-white mb-6">
 Complete IT Solutions – Software, SaaS & Digital Services
 </h2>
 <p className="text-lg text-slate-500 dark:text-slate-400">
 We provide end-to-end IT services including software development, SaaS solutions, digital marketing, and IT training to help businesses and students grow faster.
 </p>
 <div className="flex justify-center gap-2 mt-6">
 <div className="w-8 h-1.5 bg-primary rounded-full"></div>
 <div className="w-1.5 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
 <div className="w-1.5 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
 </div>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
 {/* Service Card 1 */}
 <div className="group bg-card-light dark:bg-card-dark rounded-2xl p-8 shadow-soft hover:shadow-hover transition-all duration-300 hover:-translate-y-2 border border-slate-100 dark:border-slate-700/50 flex flex-col h-full scroll-animate scroll-animate-delay-1">
 <div className="mb-6">
 <div className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-3xl mb-6 transition-transform group-hover:scale-110 duration-300">
 <span className="material-icons-round">widgets</span>
 </div>
 <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-3">
 Custom Software & Web Development
 </h3>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4 flex-grow">
 Delivering scalable Web Application Development, E-commerce solutions, and cross-platform mobile apps. We specialize in MERN Stack, UI/UX design, and high-performance Frontend/Backend development for business automation</p>
 </div>
 <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between">
 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200">
 Built for scale
 </span>
 <Link to="/services/application-development" className="inline-flex items-center text-sm font-semibold text-primary hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-pointer">
 Learn More
 <span className="material-icons-round text-base ml-1">arrow_forward</span>
 </Link>
 </div>
 </div>
 {/* Service Card 2 */}
 <div className="group bg-card-light dark:bg-card-dark rounded-2xl p-8 shadow-soft hover:shadow-hover transition-all duration-300 hover:-translate-y-2 border border-slate-100 dark:border-slate-700/50 flex flex-col h-full scroll-animate scroll-animate-delay-2">
 <div className="mb-6">
 <div className="w-14 h-14 rounded-xl bg-orange-50 dark:bg-orange-900/30 text-orange-500 dark:text-orange-400 flex items-center justify-center text-3xl mb-6 transition-transform group-hover:scale-110 duration-300">
 <span className="material-icons-round">campaign</span>
 </div>
 <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-3">
 Digital Marketing & SEO Solutions </h3>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4 flex-grow">
 Data-driven Search Engine Optimization, Content Marketing, and Social Media Strategy. We focus on Google Ads (PPC), Meta Marketing, and Conversion Rate Optimization to drive high-quality business leads </p>
 </div>
 <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between">
 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-200">
 Leads with clarity
 </span>
 <Link to="/services/digital-media" className="inline-flex items-center text-sm font-semibold text-primary hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-pointer">
 Learn More
 <span className="material-icons-round text-base ml-1">arrow_forward</span>
 </Link>
 </div>
 </div>
 {/* Service Card 3 */}
 <div className="group bg-card-light dark:bg-card-dark rounded-2xl p-8 shadow-soft hover:shadow-hover transition-all duration-300 hover:-translate-y-2 border border-slate-100 dark:border-slate-700/50 flex flex-col h-full scroll-animate scroll-animate-delay-3">
 <div className="mb-6">
 <div className="w-14 h-14 rounded-xl bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 flex items-center justify-center text-3xl mb-6 transition-transform group-hover:scale-110 duration-300">
 <span className="material-icons-round">school</span>
 </div>
 <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-3">
 Job-Oriented IT Courses & Training
 </h3>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4 flex-grow">
 Industry-led training from an active IT company. Expert-led Full Stack Development, Python for Data Science, Artificial Intelligence, and Cyber Security with Live Project Internships and Placement Assistance</p>
 </div>
 <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between">
 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-200">
 Skills that ship…
 </span>
 <Link to="/services/it-training-skill-development" className="inline-flex items-center text-sm font-semibold text-primary hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-pointer">
 Learn More
 <span className="material-icons-round text-base ml-1">arrow_forward</span>
 </Link>
 </div>
 </div>
 {/* Service Card 4 */}
 {/* <div className="group bg-card-light dark:bg-card-dark rounded-2xl p-8 shadow-soft hover:shadow-hover transition-all duration-300 hover:-translate-y-2 border border-slate-100 dark:border-slate-700/50 flex flex-col h-full scroll-animate scroll-animate-delay-4">
 <div className="mb-6">
 <div className="w-14 h-14 rounded-xl bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center text-3xl mb-6 transition-transform group-hover:scale-110 duration-300">
 <span className="material-icons-round">auto_awesome</span>
 </div>
 <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-3">
 Brand & Experience Strategy
 </h3>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4 flex-grow">
 Positioning, messaging, and UX so every customer interaction feels intentional and on-brand.
 </p>
 </div>
 <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between">
 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200">
 Experience-led growth
 </span>
 <Link className="inline-flex items-center text-sm font-semibold text-primary hover:text-blue-700 dark:hover:text-blue-300 transition-colors" onClick={() => setIsEnquiryOpen(true)}>
 Learn More <span className="material-icons-round text-base ml-1">arrow_forward</span>
 </Link>
 </div>
 </div> */}
 {/* Service Card 5 */}
 <div className="group bg-card-light dark:bg-card-dark rounded-2xl p-8 shadow-soft hover:shadow-hover transition-all duration-300 hover:-translate-y-2 border border-slate-100 dark:border-slate-700/50 flex flex-col h-full scroll-animate scroll-animate-delay-1">
 <div className="mb-6">
 <div className="w-14 h-14 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-3xl mb-6 transition-transform group-hover:scale-110 duration-300">
 <span className="material-icons-round">dns</span>
 </div>
 <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-3">
 Cloud Solutions & IT Infrastructure
 </h3>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4 flex-grow">
 Reliable Cloud Computing services, Cybersecurity solutions, and Network Administration. We provide expert AWS/Azure Cloud Migration, Server Maintenance, and secure Database Management</p>
 </div>
 <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between">
 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200">
 Reliable foundations
 </span>
 <Link to="/services/it-infrastructure" className="inline-flex items-center text-sm font-semibold text-primary hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-pointer">
 Learn More
 <span className="material-icons-round text-base ml-1">arrow_forward</span>
 </Link>
 </div>
 </div>
 {/* Service Card 6 */}
 <div className="group bg-card-light dark:bg-card-dark rounded-2xl p-8 shadow-soft hover:shadow-hover transition-all duration-300 hover:-translate-y-2 border border-slate-100 dark:border-slate-700/50 flex flex-col h-full scroll-animate scroll-animate-delay-2">
 <div className="mb-6">
 <div className="w-14 h-14 rounded-xl bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 flex items-center justify-center text-3xl mb-6 transition-transform group-hover:scale-110 duration-300">
 <span className="material-icons-round">groups</span>
 </div>
 <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-3">
 HR Consulting & Enterprise Management
 </h3>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4 flex-grow">
 Comprehensive Talent Acquisition, Staffing Solutions, and Employee Management Systems. We streamline IT Staffing, Payroll Outsourcing, and business operations for tech startups in Tamil Nadu.</p>
 </div>
 <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between">
 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 dark:bg-pink-900/50 text-pink-800 dark:text-pink-200">
 People-first solutions
 </span>
 <Link to="/services/hr-consulting" className="inline-flex items-center text-sm font-semibold text-primary hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-pointer">
 Learn More
 <span className="material-icons-round text-base ml-1">arrow_forward</span>
 </Link>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Trust Section with Auto-Scroll */}
 <section className="py-16 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden scroll-animate">
 {/* Section Heading */}
 <div className="text-center mb-16">
 <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
 Trusted by Businesses Worldwide <span className="text-primary">SwordNex</span>
 </h2>
 <div className="h-1.5 w-24 bg-primary mx-auto rounded-full flex gap-2 justify-center items-center">
 <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
 <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
 <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
 </div>
 <p className="mt-6 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
 SwordNex delivers scalable web applications, digital products, and campaigns backed by measurable results and dedicated support.
 </p>
 </div>

 {/* Metrics Grid */}
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
 {[
 { label: "Long-Term Clients", val: "50+", icon: "groups", color: "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400", desc: "Companies that rely on SwordNex" },
 { label: "Projects Delivered", val: "100+", icon: "inventory_2", color: "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400", desc: "Custom apps and campaigns completed" },
 { label: "Uptime Guarantee", val: "100%", icon: "cloud_done", color: "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400", desc: "Reliable mission-critical systems" },
 { label: "Expert Support", val: "24/7", icon: "support_agent", color: "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400", desc: "Dedicated team available anytime" }
 ].map((m, i) => (
 <div key={i} className="bg-white dark:bg-card-dark p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 text-center group scroll-animate" style={{ transitionDelay: `${i * 0.1}s` }}>
 <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${m.color} mb-6 group-hover:scale-110 transition-transform`}>
 <span className="material-icons-round text-3xl">{m.icon}</span>
 </div>
 <h3 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">{m.val}</h3>
 <p className="text-gray-600 dark:text-gray-400 font-medium">{m.label}</p>
 <p className="text-xs text-gray-400 mt-1">{m.desc}</p>
 </div>
 ))}
 </div>

 {/* Testimonials Auto-Scroll */}
 <div className="relative group">
 {/* Left and Right Blur Fade Overlays */}
 <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white dark:from-background-dark to-transparent z-10 pointer-events-none"></div>
 <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-background-dark to-transparent z-10 pointer-events-none"></div>

 <div className="flex overflow-hidden">
 {/* The animate-scroll class handles the movement */}
 <div className="flex gap-6 py-4 animate-scroll group-hover:[animation-play-state:paused]">
 {[...Array(2)].map((_, loopIndex) => (
 <div key={loopIndex} className="flex gap-6">
 {[
 { initials: "O", name: "Operations Head", org: "Supermarket Chain", text: "SwordNex Billing cut our checkout time and gave us accurate daily reports.", border: "border-blue-500" },
 { initials: "D", name: "Director", org: "Training Institute", text: "Our new site and campaigns from SwordNex doubled qualified leads in three months.", border: "border-secondary" },
 { initials: "S", name: "Support Manager", org: "E-commerce Store", text: "Support portal reduced ticket resolution by 45%. Real-time chat works perfectly.", border: "border-green-500" },
 { initials: "A", name: "Tech Lead", org: "Retail Platform", text: "API handled 10x traffic during Black Friday. Zero downtime!", border: "border-purple-500" },
 { initials: "P", name: "Finance Controller", org: "Manufacturing Co.", text: "Payroll automated TDS & PF. Audit-ready reports instantly!", border: "border-red-500" },
 ].map((item, idx) => (
 <div
 key={`${loopIndex}-${idx}`}
 className={`bg-white dark:bg-card-dark p-6 rounded-2xl shadow-md border-t-4 ${item.border} w-[300px] sm:w-[350px] shrink-0`}
 >
 <div className="flex gap-1 text-yellow-400 mb-4">
 {[...Array(5)].map((_, i) => <span key={i} className="material-icons-round text-sm">star</span>)}
 </div>
 <p className="text-gray-700 dark:text-gray-300 mb-6 italic text-sm leading-relaxed">"{item.text}"</p>
 <div className="flex items-center gap-4">
 <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-bold text-gray-600 dark:text-gray-300">
 {item.initials}
 </div>
 <div className="text-left">
 <h4 className="font-bold text-gray-900 dark:text-white text-sm">{item.name}</h4>
 <p className="text-xs text-gray-500 dark:text-gray-400">{item.org}</p>
 </div>
 </div>
 </div>
 ))}
 </div>
 ))}
 </div>
 </div>
 </div>
 </section>

 {/* About Section */}
 <section className="relative py-16 lg:py-10 overflow-hidden scroll-animate">
 <div className="container mx-auto px-6 lg:px-12 relative z-10">

 {/* Heading */}
 <div className="text-center max-w-5xl mx-auto mb-16 lg:mb-20">
 <span className="inline-block py-1 px-3 rounded-full bg-blue-50 dark:bg-blue-900/30 text-primary text-sm font-semibold mb-4 tracking-wide uppercase">
 Why Choose Our IT Services
 </span>

 <h2 className="text-4xl lg:text-5xl max-w-5xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
 Leading IT Company <br className="hidden md:block" />
 <span className="text-transparent py-2 bg-clip-text bg-gradient-to-r from-primary to-secondary">
 Delivering Smart Software & IT Solutions
 </span>
 </h2>

 <div className="h-1.5 w-24 bg-primary mx-auto rounded-full mt-6"></div>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

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
 <div className="h-full bg-surface-light dark:bg-surface-dark p-8 md:p-10 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700">
 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
 <span className="material-icons-round text-primary">diamond</span>
 Core Values of Our IT Solutions
 </h3>

 <ul className="space-y-6">
 <li className="flex items-start gap-4">
 <div className="mt-1 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
 <span className="material-icons-round text-sm">check</span>
 </div>
 <div>
 <strong className="block text-gray-900 dark:text-white text-lg mb-1">Ownership</strong>
 <p className="text-gray-600 dark:text-gray-400 text-sm">
 We take full responsibility to deliver reliable IT solutions that solve real business problems.
 </p>
 </div>
 </li>

 <li className="flex items-start gap-4">
 <div className="mt-1 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
 <span className="material-icons-round text-sm">check</span>
 </div>
 <div>
 <strong className="block text-gray-900 dark:text-white text-lg mb-1">Clarity</strong>
 <p className="text-gray-600 dark:text-gray-400 text-sm">
 Transparent communication, clear pricing, and structured development processes.
 </p>
 </div>
 </li>

 <li className="flex items-start gap-4">
 <div className="mt-1 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
 <span className="material-icons-round text-sm">check</span>
 </div>
 <div>
 <strong className="block text-gray-900 dark:text-white text-lg mb-1">Long-Term Thinking</strong>
 <p className="text-gray-600 dark:text-gray-400 text-sm">
 We build scalable software systems designed for long-term business growth.
 </p>
 </div>
 </li>
 </ul>
 </div>
 </div>

 {/* Right Content */}
 <div className="lg:col-span-5 relative mt-8 lg:mt-0 flex flex-col">

 <div className="relative h-full flex flex-col justify-center bg-white dark:bg-surface-dark p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">

 <div className="mb-6">
 <span className="material-icons-round text-primary text-5xl opacity-50">format_quote</span>
 </div>

 <p className="text-gray-700 dark:text-gray-300 text-lg italic mb-8 leading-relaxed">
 "At SwordNex, we build powerful IT solutions and custom software that help businesses streamline operations, improve efficiency, and scale faster with modern technology."
 </p>

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
 <section className="py-16 md:py-24 overflow-hidden bg-white dark:bg-background-dark border-t border-slate-100 dark:border-slate-800 scroll-animate">
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
 <div className="relative flex min-h-screen w-full flex-col justify-center items-center overflow-x-hidden p-4 sm:p-8 md:p-12">
 <div className="w-full max-w-6xl mx-auto">

 <div className="relative w-full overflow-hidden rounded-3xl bg-primary shadow-2xl shadow-primary/30 group">

 {/* Background Effects */}
 <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
 <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
 <div className="absolute -bottom-32 -right-10 w-80 h-80 rounded-full bg-white/10 blur-3xl"></div>
 <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
 </div>

 {/* Content */}
 <div className="relative z-10 flex flex-col items-center justify-center px-6 py-10 sm:px-12 sm:py-24 text-center">

 {/* SEO Optimized Heading */}
 <h2 className="text-white max-w-5xl text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
 Looking for the Best IT Company in Kumbakonam?
 </h2>

 {/* SEO + Conversion Paragraph */}
 <p className="text-blue-100 text-base sm:text-lg md:text-xl font-medium leading-relaxed max-w-2xl mb-10">
 Get expert IT services, custom software development, SaaS solutions, and business automation tailored for your needs. Partner with SwordNex to build scalable digital solutions and grow your business faster.
 </p>

 {/* CTA */}
 <div className="flex flex-col items-center gap-4 w-full">
 <button
 onClick={() => setIsConsultationOpen(true)}
 className="group/btn relative inline-flex items-center justify-center h-14 px-8 py-3 overflow-hidden font-bold text-primary bg-white rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-white/30"
 >
 <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-white via-white to-blue-50"></span>

 <span className="relative flex items-center gap-2 text-lg">
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
 <section className="bg-[#cfe3ff] dark:bg-[#2c2666] py-16 relative overflow-hidden scroll-animate">
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
 </div>
 );
};

export default Home;