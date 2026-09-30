import React, { useState, useEffect } from 'react';
import ConsultationModal from '../components/ConsultationModal';
import ServiceEnquiryModal from '../components/ServiceEnquiryModal';
import kaja from '../assets/Founder_1.jpeg';
import nevas from '../assets/Puspa Nevas.jpg';
import karthik from '../assets/Karthik.jpeg';
import { LinkedinIcon } from 'lucide-react';
import { Helmet } from "react-helmet-async";

<Helmet>
 <title>
 Professional IT Services & Training Hub | SwordNex
 </title>

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

const About = () => {
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

 // Scroll Animation Effect
 useEffect(() => {
 const observer = new IntersectionObserver(
 (entries) => {
 entries.forEach((entry) => {
 if (entry.isIntersecting) {
 entry.target.classList.add('animate-in');
 }
 });
 },
 { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
 );

 document.querySelectorAll('.scroll-animate').forEach((el) => observer.observe(el));

 return () => {
 document.querySelectorAll('.scroll-animate').forEach((el) => observer.unobserve(el));
 };
 }, []);

 return (
 <>
 {/* Global Scroll Animation Styles */}
 <style jsx global>{`
 .scroll-animate {
 opacity: 0;
 transform: translateY(50px);
 transition: opacity 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94),
 transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94);
 }
 .scroll-animate.animate-in {
 opacity: 1;
 transform: translateY(0);
 }
 .scroll-animate-delay-1 { transition-delay: 0.1s; }
 .scroll-animate-delay-2 { transition-delay: 0.2s; }
 .scroll-animate-delay-3 { transition-delay: 0.3s; }
 .scroll-animate-delay-4 { transition-delay: 0.4s; }
 .scroll-animate-delay-5 { transition-delay: 0.5s; }

 @media (prefers-reduced-motion: reduce) {
 .scroll-animate {
 opacity: 1;
 transform: none;
 transition: none;
 }
 }
 `}</style>

 <div className="pt-10">
 {/* Hero Section */}
 <section className="relative px-4 py-10 sm:py-14 md:px-8 xl:px-40 lg:py-20 scroll-animate">
 <div className="mx-auto max-w-[1200px]">
 <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 items-center">

 {/* Text Content */}
 <div className="flex flex-col gap-5 order-2 lg:order-1">

 <div className="flex flex-col gap-4 text-left scroll-animate scroll-animate-delay-1">

 {/* Responsive H1 */}
 <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-[#0d121b] dark:text-white">
 Leading IT Company for 
 <span className="text-primary"> Software Development & Enterprise Solutions</span>
 </h1>

 {/* Responsive Paragraph */}
 <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-300 max-w-lg">
 SwordNex Technologies is a premier IT Solutions provider in Tamil Nadu, delivering Custom Software Development, SaaS products, and professional IT services to help businesses scale and dominate the digital landscape.
 </p>

 </div>

 {/* CTA */}
 <div className="flex flex-col sm:flex-row gap-3 pt-2 scroll-animate scroll-animate-delay-2">

 <button
 onClick={() => setIsModalOpen(true)}
 className="flex h-12 sm:h-14 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm sm:text-base font-semibold text-white shadow-md hover:bg-blue-700 transition-all"
 >
 Get IT Solutions
 <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
 </button>

 <button className="flex h-12 sm:h-14 items-center justify-center rounded-lg border border-[#e7ebf3] dark:border-gray-700 bg-white dark:bg-gray-800 px-6 text-sm sm:text-base font-medium text-[#0d121b] dark:text-white dark:hover:bg-gray-700 transition-colors">
 View Services
 </button>
 </div>

 {/* Trust Indicators */}
 <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-gray-100 dark:border-gray-800 mt-2 scroll-animate scroll-animate-delay-3">

 <div className="flex flex-col">
 <span className="text-lg sm:text-xl font-bold text-[#0d121b] dark:text-white">50+</span>
 <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Projects Delivered</span>
 </div>

 <div className="flex flex-col">
 <span className="text-lg sm:text-xl font-bold text-[#0d121b] dark:text-white">100%</span>
 <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Client Satisfaction</span>
 </div>

 <div className="flex flex-col">
 <span className="text-lg sm:text-xl font-bold text-[#0d121b] dark:text-white">TN</span>
 <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Serving Tamil Nadu</span>
 </div>

 </div>
 </div>

 {/* Image */}
 <div className="relative order-1 lg:order-2 h-full min-h-[250px] sm:min-h-[300px] lg:min-h-[450px] scroll-animate scroll-animate-delay-2">
 <div className="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 shadow-xl relative aspect-square lg:aspect-auto">

 <img
 src="https://passing-moccasin-ojzgxatxhg.edgeone.app/Online%20world-amico.png"
 alt="IT company in Kumbakonam software development services"
 className="absolute inset-0 w-full h-full object-cover"
 />
 </div>
 </div>

 </div>
 </div>
 </section>

 {/* Why Choose Us */}
 {/* Why Choose Us */}
 <section className="py-12 sm:py-14 md:py-16 px-4 flex justify-center text-center scroll-animate">
 <div className="max-w-5xl flex flex-col gap-3 sm:gap-4 items-center">

 <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-2">
 Why Choose Our IT Services
 </span>

 {/* IMPORTANT: H2 instead of H1 */}
 <h2 className="text-gray-900 dark:text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
 High-Performance IT Solutions for <span className="text-primary">Business Growth</span>
 </h2>

 <p className="mt-2 text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl">
 We provide IT services in Kumbakonam including custom software development, SaaS solutions, and business automation tools to help companies operate faster, smarter, and more efficiently.
 </p>

 </div>

 {/* Hidden SEO Boost */}
 <p className="hidden">
 SwordNex Technologies offers IT services, software development, and SaaS solutions in Kumbakonam for small and medium businesses in Tamil Nadu.
 </p>
 </section>

 {/* Services Grid */}
 <section className="px-4 pb-12 sm:pb-14 md:pb-16 scroll-animate">
 <div className="max-w-7xl mx-auto">
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">

 {/* Card 1 */}
 <article className="group relative overflow-hidden rounded-3xl bg-white dark:bg-[#1e2536] p-6 sm:p-8 md:p-10 border border-gray-100 dark:border-gray-700/50 shadow-md transition-all hover:shadow-xl scroll-animate scroll-animate-delay-1">
 <div className="relative z-10 flex flex-col items-start h-full">

 <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center bg-blue-50 dark:bg-blue-900/20 text-primary mb-5 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
 <span className="material-symbols-outlined text-3xl sm:text-4xl">design_services</span>
 </div>

 <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-snug">
 Enterprise Software Development
 </h3>

 <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
 We build scalable
 <strong className="text-gray-800 dark:text-gray-200"> Web Applications, SaaS products, and custom digital tools </strong>
 designed to automate your business workflows.
 </p>

 <div className="mt-5">
 <a href="/Service1" className="inline-flex items-center font-semibold text-blue-700 hover:text-blue-800 underline underline-offset-4 text-sm sm:text-base">
 Learn more
 </a>
 </div>

 </div>
 </article>

 {/* Card 2 */}
 <article className="group relative overflow-hidden rounded-3xl bg-white dark:bg-[#1e2536] p-6 sm:p-8 md:p-10 border border-gray-100 dark:border-gray-700/50 shadow-md transition-all hover:shadow-xl scroll-animate scroll-animate-delay-2">
 <div className="relative z-10 flex flex-col items-start h-full">

 <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 mb-5 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
 <span className="material-symbols-outlined text-3xl sm:text-4xl">sync_alt</span>
 </div>

 <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-snug">
 Business Systems Integration
 </h3>

 <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
 Seamlessly connecting
 <strong className="text-gray-800 dark:text-gray-200"> ERP, CRM, and API solutions </strong>
 to streamline operations, reduce manual work, and ensure 100% data accuracy.
 </p>

 <div className="mt-5">
 <a href="/Products" className="inline-flex items-center font-semibold text-purple-700 hover:text-purple-800 underline underline-offset-4 text-sm sm:text-base">
 Learn more
 </a>
 </div>

 </div>
 </article>

 </div>
 </div>

 {/* Hidden SEO Boost */}
 <p className="hidden">
 SwordNex Technologies provides custom software development, SaaS solutions, and IT services in Kumbakonam including system integration, business automation, and enterprise software.
 </p>
 </section>

 {/* Main Story Section */}
 <section className="relative w-full py-12 sm:py-14 lg:py-20 bg-background-light dark:bg-background-dark scroll-animate">
 <div className="max-w-[1060px] mx-auto px-4 sm:px-6 lg:px-8 text-center">

 <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
 About Our IT Company
 </span>

 {/* SEO H1 */}
 <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 sm:mb-6 leading-tight">
 A Result-Driven 
 <br className="hidden sm:block" />
 <span className="text-primary">IT Solutions Company in Tamil Nadu</span>
 </h1>

 {/* SEO Paragraph */}
 <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-6xl mx-auto leading-relaxed">
 SwordNex Technologies is a leading IT company in Kumbakonam providing software development, SaaS products, and IT services for businesses. We build secure, scalable digital solutions that drive long-term growth.
 </p>

 </div>

 {/* Hidden SEO Boost */}
 <p className="hidden">
 SwordNex Technologies offers IT services, software development, SaaS solutions, and business automation in Kumbakonam for small and medium businesses in Tamil Nadu.
 </p>
 </section>

 {/* Our Story + Values */}
 <section className="w-full py-12 lg:py-20 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 scroll-animate">
 <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

 {/* Left Content */}
 <div className="flex flex-col gap-8 sm:gap-10">

 {/* Brand Story */}
 <div className="scroll-animate scroll-animate-delay-1">
 <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6 tracking-tight">
 Our Story
 </h2>

 <div className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">

 <p className="mb-4">
 SwordNex Technologies is an innovative Software Development firm dedicated to helping businesses adopt powerful, scalable digital ecosystems. We specialize in solving complex industry challenges through Custom Software, Cloud-based SaaS products, and Digital Transformation services.
 </p>

 <p className="mb-4">
 As an active IT Company, we bridge the gap between technology and talent. Beyond our services, we provide Job-Oriented IT Training where students gain Industry Internship experience by working alongside our senior developers on live projects.
 </p>

 {/* <p>
 Today, SwordNex Technologies helps businesses across Tamil Nadu streamline operations, improve efficiency, and scale confidently with reliable IT services and modern digital platforms.
 </p> */}

 </div>
 </div>

 {/* Stats */}
 <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 border-t border-slate-100 dark:border-slate-800 scroll-animate scroll-animate-delay-2">

 <div>
 <p className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-1">50+</p>
 <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">Active Clients</p>
 </div>

 <div>
 <p className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-1">3+</p>
 <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">Industries Served</p>
 </div>

 <div>
 <p className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-1">100%</p>
 <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">Client Satisfaction</p>
 </div>

 </div>
 </div>

 {/* Right Content */}
 <div className="flex flex-col gap-5 sm:gap-6">

 {[
 {
 icon: "location_on",
 title: "Our Origin",
 desc: "Based in Kumbakonam, we help businesses adopt modern IT solutions including software development, SaaS products, and automation systems."
 },
 {
 icon: "handshake",
 title: "What Sets Us Apart",
 desc: "We focus on real business needs, offering customized IT services with clear communication, reliable support, and long-term partnership."
 },
 {
 icon: "account_tree",
 title: "Our Process",
 desc: "We follow a structured approach: Discovery → Design → Development → Deployment → Support to ensure scalable and efficient solutions."
 }
 ].map((item, i) => (
 <div
 key={i}
 className={`p-5 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-background-light dark:bg-slate-800 hover:border-primary/50 transition-all duration-300 shadow-sm scroll-animate scroll-animate-delay-${i + 1}`}
 >
 <div className="flex items-start gap-3 sm:gap-4">

 <div className="p-2 sm:p-3 rounded-lg bg-white dark:bg-slate-700 shadow-sm text-primary">
 <span className="material-symbols-outlined text-xl sm:text-2xl">
 {item.icon}
 </span>
 </div>

 <div>
 <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1 sm:mb-2">
 {item.title}
 </h3>

 <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
 {item.desc}
 </p>
 </div>

 </div>
 </div>
 ))}

 </div>
 </div>
 </div>

 {/* Hidden SEO Boost */}
 <p className="hidden">
 SwordNex Technologies is a leading IT company in Kumbakonam providing software development, SaaS solutions, IT services, and business automation for small and medium businesses in Tamil Nadu.
 </p>
 </section>
 {/* Vision & Mission + CEO Section */}
 <section className="relative py-20 lg:py-28 bg-gray-50 dark:bg-background-dark overflow-hidden scroll-animate">
 <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-20">
 <div className="text-center max-w-3xl mx-auto mb-14 scroll-animate">
 <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
 Why SwordNex
 </span>
 <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mt-4">
 Driven by <span className="text-primary">Purpose</span> & Vision
 </h2>
 <div className="h-1.5 w-24 bg-primary mx-auto rounded-full mt-6"></div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
 <div className="bg-white dark:bg-surface-dark p-10 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 hover:-translate-y-2 hover:shadow-2xl hover:border-primary/40 transition-all duration-300 scroll-animate scroll-animate-delay-1">
 <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-primary mb-6">
 <span className="material-icons-round text-2xl">flag</span>
 </div>
 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h3>
 <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
 To deliver secure, scalable, and user-centric IT Solutions while empowering the next generation with practical, career-focused IT training and real-world project exposure.
 </p>
 </div>

 <div className="bg-white dark:bg-surface-dark p-10 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 hover:-translate-y-2 hover:shadow-2xl hover:border-primary/40 transition-all duration-300 scroll-animate scroll-animate-delay-2">
 <div className="w-14 h-14 rounded-2xl bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6">
 <span className="material-icons-round text-2xl">visibility</span>
 </div>
 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h3>
 <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
 To be a globally trusted Technology Partner, providing innovative Software Services and modern Digital Education that meets 2026 global industry standards.
 </p>
 </div>
 </div>

 {/* CEO Quote + Image */}
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
 <div className="space-y-10 scroll-animate scroll-animate-delay-1">
 <h3 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
 Leadership That <br />
 <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
 Guides Every Decision
 </span>
 </h3>
 <div className="relative bg-white dark:bg-surface-dark p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
 <span className="material-icons-round text-primary text-5xl opacity-20 mb-2 block">format_quote</span>
 <p className="text-gray-700 dark:text-gray-300 text-lg italic leading-relaxed">
 “At SwordNex, we build technology that fades into the background, letting your teams focus on meaningful work and business growth.”
 </p>
 </div>
 <div className="flex items-center gap-4">
 <div>
 <a
 href="https://www.linkedin.com/in/kajanajbudeen/"
 target="_blank"

 >
 <p className="font-bold text-gray-900 dark:text-white"> Kaja Najbudeen</p>
 <p className="text-sm text-primary font-semibold uppercase tracking-wider">
 Founder & CEO, SwordNex Technologies
 </p>
 </a>
 {/* <div className="mt-3">
 <a
 href="https://www.linkedin.com/in/kajanajbudeen/"
 target="_blank"
 rel="noopener noreferrer"
 className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 dark:bg-slate-800 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-colors"
 >
 <LinkedinIcon size={20} />
 </a>
 </div> */}
 </div>
 </div>
 </div>

 <div className="relative scroll-animate scroll-animate-delay-2 flex justify-center">
 <div className="relative rounded-full overflow-hidden shadow-2xl w-full max-w-[400px] lg:max-w-[480px] aspect-square">
 <img
 src={kaja}
 alt="SwordNex team"
 className=""
 />
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Team Section */}
 {/* <section className="relative py-20 lg:py-28 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 scroll-animate">
 <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
 <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
 Our Team
 </span>
 <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-14">
 Meet the <span className="text-primary">Experts</span>
 </h2>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
 {[
 { name: "Anitha", role: "HR", img: "https://ui-avatars.com/api/?name=Anitha&background=e0e7ff&color=4f46e5&size=200" },
 { name: "Puspa Nevas", role: "Full Stack Developer", img: nevas },
 { name: "Karthik", role: "Digital Marketing Executive", img: karthik },
 { name: "Seethaladevi", role: "Full Stack Developer", img: "https://ui-avatars.com/api/?name=Seethaladevi&background=e0e7ff&color=4f46e5&size=200" },

 ].map((member, index) => (
 <div key={index} className={`flex flex-col items-center group scroll-animate scroll-animate-delay-${(index % 4) + 1}`}>
 <div 
 className="w-56 h-56 md:w-64 md:h-64 overflow-hidden mb-6 shadow-xl border-4 border-gray-100 dark:border-gray-800 group-hover:border-primary/50 transition-all duration-300"
 style={{ borderRadius: '50%' }}
 >
 <img 
 src={member.img} 
 alt={member.name} 
 className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500" 
 style={{ borderRadius: '50%' }}
 />
 </div>
 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{member.name}</h3>
 <p className="text-primary font-medium text-center">{member.role}</p>
 </div>
 ))}
 </div>
 </div>
 </section> */}

 {/* CTA Section */}
 <section className="w-full py-20 bg-background-light dark:bg-background-dark scroll-animate">
 <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
 <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 md:p-12 border border-slate-200 dark:border-slate-700 shadow-lg text-center relative overflow-hidden">
 <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
 <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>

 <h2 className="relative text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
 Ready to grow your business with <span className="text-primary">custom web solutions</span>?
 </h2>
 <p className="relative text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-5xl mx-auto">
 Join 50+ businesses who trust SwordNex Technologies for scalable web applications, modern websites, and enterprise software solutions.
 </p>
 <div className="relative flex flex-col sm:flex-row gap-4 justify-center">
 <button onClick={() => setIsEnquiryOpen(true)} className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-primary text-white font-bold text-base hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg">
 Start Your Custom Project
 </button>
 <button onClick={() => setIsModalOpen(true)} className="inline-flex items-center justify-center h-12 px-8 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-slate-700 dark:text-slate-200 font-bold text-base dark:hover:bg-slate-700 transition-colors">
 Meet Our Expert Team
 </button>
 </div>
 </div>
 </div>
 </section>

 <ServiceEnquiryModal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />
 <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
 </div>
 </>
 );
};

export default About;