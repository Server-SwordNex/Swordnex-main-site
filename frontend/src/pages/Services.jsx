import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Import motion
import ConsultationModal from '../components/ConsultationModal';
import ServiceEnquiryModal from '../components/ServiceEnquiryModal';
import { useNavigate } from 'react-router-dom';

const Services = () => {
 const navigate = useNavigate();
 const [isConsultationOpen, setIsConsultationOpen] = useState(false);
 const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

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

 return (
 <div className="pt-5 overflow-hidden">
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
 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-[#0d121b] dark:text-white"
 >
 IT Services in Kumbakonam for
 <span className="text-primary"> Software Development & Business Automation</span>
 </motion.h1>

 {/* SEO Paragraph */}
 <motion.p
 variants={fadeInUp}
 className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-300 max-w-lg"
 >
 SwordNex Technologies provides IT services including custom software development, SaaS solutions, billing, payroll, and system integration to help businesses streamline operations and grow efficiently.
 </motion.p>

 </div>

 {/* CTA */}
 <motion.div
 variants={fadeInUp}
 className="flex flex-col sm:flex-row gap-3 pt-2"
 >
 <button
 onClick={() => setIsConsultationOpen(true)}
 className="flex h-12 sm:h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm sm:text-base font-semibold text-white shadow-md hover:bg-blue-700 transition-all"
 >
 <span>Get Free Consultation</span>
 <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
 </button>

 <a
 href="#services-inline"
 className="flex h-12 sm:h-14 w-full sm:w-auto items-center justify-center rounded-lg border border-[#e7ebf3] dark:border-gray-700 bg-white dark:bg-gray-800 px-6 text-sm sm:text-base font-medium text-[#0d121b] dark:text-white dark:hover:bg-gray-700 transition-colors"
 >
 View All Services
 </a>
 </motion.div>

 {/* Trust Indicators */}
 <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-gray-100 dark:border-gray-800 mt-2">

 <div className="flex flex-col">
 <span className="text-lg sm:text-xl font-bold text-[#0d121b] dark:text-white">50+</span>
 <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Projects Delivered</span>
 </div>

 <div className="flex flex-col">
 <span className="text-lg sm:text-xl font-bold text-[#0d121b] dark:text-white">100%</span>
 <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Client Satisfaction</span>
 </div>

 <div className="flex flex-col">
 <span className="text-lg sm:text-xl font-bold text-[#0d121b] dark:text-white">SMB</span>
 <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Focused Solutions</span>
 </div>

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

 <img
 src="https://metropolitan-bronze-tlfmhjn4gk.edgeone.app/App%20development-amico.png"
 alt="IT services in Kumbakonam software development and business automation"
 className="absolute inset-0 w-full h-full object-cover"
 />

 <div className="absolute -top-6 -right-6 size-20 sm:size-24 bg-primary rounded-full opacity-10 blur-2xl"></div>
 <div className="absolute -bottom-10 -left-10 size-32 sm:size-40 bg-blue-400 rounded-full opacity-10 blur-3xl"></div>

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

 <motion.div
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, margin: "-100px" }}
 variants={staggerContainer}
 className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
 >
 <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
 <motion.span
 variants={fadeInUp}
 className="block text-primary font-semibold tracking-wider uppercase text-sm mb-3"
 >
 What We Do
 </motion.span>
 <motion.h2
 variants={fadeInUp}
 className="text-3xl lg:text-4xl font-display font-bold text-slate-900 dark:text-white mb-6"
 >
 Core Services Overview
 </motion.h2>
 <motion.p
 variants={fadeInUp}
 className="text-lg text-slate-500 dark:text-slate-400"
 >
 Comprehensive digital solutions designed to scale with your business. From custom development to strategic growth.
 </motion.p>
 <motion.div
 variants={fadeInUp}
 className="flex justify-center gap-2 mt-6"
 >
 <div className="w-8 h-1.5 bg-primary rounded-full"></div>
 <div className="w-1.5 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
 <div className="w-1.5 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
 </motion.div>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
 ].map((service, idx) => (
 <motion.div
 key={idx}
 variants={scaleIn}
 whileHover={{ y: -10 }}
 className="group bg-card-light dark:bg-card-dark rounded-2xl p-8 shadow-soft hover:shadow-hover transition-all duration-300 border border-slate-100 dark:border-slate-700/50 flex flex-col h-full"
 >
 <div className="mb-6">
 <div className={`w-14 h-14 rounded-xl bg-${service.color}-50 dark:bg-${service.color}-900/30 text-${service.color}-600 dark:text-${service.color}-400 flex items-center justify-center text-3xl mb-6 transition-transform group-hover:scale-110 duration-300`}>
 <span className="material-icons-round">{service.icon}</span>
 </div>
 <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-3">
 {service.title}
 </h3>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4 flex-grow">
 {service.desc}
 </p>
 </div>
 <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between">
 <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${service.color}-100 dark:bg-${service.color}-900/50 text-${service.color}-800 dark:text-${service.color}-200`}>
 {service.badge}
 </span>
 <button
 onClick={() => navigate(service.path)}
 className="inline-flex items-center text-sm font-semibold text-primary hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
 >
 Learn More
 <span className="material-icons-round text-base ml-1">arrow_forward</span>
 </button>
 </div>
 </motion.div>
 ))}
 </div>

 </motion.div>
 </section>

 {/* PROCESS SECTION */}
 <section className="py-24 bg-white dark:bg-[#151a25]">
 <motion.div
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, margin: "-100px" }}
 variants={staggerContainer}
 className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
 >
 <div className="text-center max-w-3xl mx-auto mb-20">
 <motion.h2
 variants={fadeInUp}
 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white font-display mb-4"
 >
 How Our Services Work
 </motion.h2>
 <motion.div
 variants={fadeInUp}
 className="w-20 h-1.5 bg-primary rounded-full mx-auto"
 ></motion.div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
 <div className="hidden lg:block absolute top-10 left-0 w-full h-0.5 bg-gray-100 dark:bg-gray-800 -z-0"></div>
 {[
 { step: 1, icon: 'person_search', title: 'Discovery call', desc: 'Understand your team and tools.' },
 { step: 2, icon: 'map', title: 'Roadmap', desc: 'Pick quick wins and long‑term systems.' },
 { step: 3, icon: 'construction', title: 'Build & integrate', desc: 'Websites, apps, and automations.' },
 { step: 4, icon: 'support_agent', title: 'Support', desc: 'Monitoring, updates, and new features.' }
 ].map((item, idx) => (
 <motion.div
 key={idx}
 variants={scaleIn}
 className="relative z-10 flex flex-col items-center text-center group"
 >
 <div className="w-20 h-20 rounded-3xl bg-white dark:bg-[#1e2536] border border-gray-100 dark:border-gray-700 shadow-xl shadow-blue-900/5 flex items-center justify-center mb-6 relative group-hover:-translate-y-2 transition-transform duration-300">
 <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold border-4 border-white dark:border-[#151a25]">{item.step}</span>
 <span className="material-symbols-outlined text-4xl text-primary">{item.icon}</span>
 </div>
 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 font-display">{item.title}</h3>
 <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-[200px]">{item.desc}</p>
 </motion.div>
 ))}
 </div>
 </motion.div>
 </section>

 {/* INDUSTRIES SECTION */}
 <section className="py-20 px-4 bg-white dark:bg-[#1A202C] border-t border-gray-100 dark:border-gray-800">
 <motion.div
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, margin: "-100px" }}
 variants={staggerContainer}
 className="max-w-7xl mx-auto"
 >
 <div className="flex flex-col items-center text-center mb-16">
 <motion.span
 variants={fadeInUp}
 className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2"
 >
 Target Audience
 </motion.span>
 <motion.h2
 variants={fadeInUp}
 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white font-display"
 >
 Industries We <span className="text-primary">Serve</span>
 </motion.h2>
 <motion.p
 variants={fadeInUp}
 className="mt-4 text-gray-500 dark:text-gray-400 text-lg max-w-2xl"
 >
 Our platforms and digital solutions support diverse business models. Explore the industries we empower the most.
 </motion.p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
 {[
 { color: 'blue', icon: 'storefront', title: 'Retail & Wholesale', desc: 'Point-of-sale and inventory solutions for multi-store management.' },
 { color: 'green', icon: 'design_services', title: 'Service Businesses', desc: 'Project management tools and client portals to streamline workflows.' },
 { color: 'indigo', icon: 'school', title: 'Educational Institutions', desc: 'Student information management and automated fee collection.' },
 { color: 'green', icon: 'factory', title: 'Manufacturing', desc: 'Production monitoring and workflow automation.' },
 { color: 'indigo', icon: 'local_hospital', title: 'Healthcare & Clinics', desc: 'Patient management and appointment scheduling.' },
 { color: 'teal', icon: 'shopping_cart', title: 'E-Commerce', desc: 'Custom online stores and payment integrations.' }
 ].map((industry, idx) => (
 <motion.div
 key={idx}
 variants={scaleIn}
 whileHover={{ y: -5 }}
 className="group relative overflow-hidden rounded-3xl bg-background-light dark:bg-[#1e2536] p-8 transition-all hover:shadow-xl hover:-translate-y-1 duration-300 border border-transparent hover:border-primary/20"
 >
 <div className={`absolute right-0 top-0 -mt-8 -mr-8 h-32 w-32 rounded-full bg-${industry.color}-100 dark:bg-${industry.color}-900/20 blur-3xl transition-all group-hover:bg-${industry.color}-500 dark:group-hover:bg-${industry.color}-800/30`}></div>

 <div className="relative z-10 flex flex-col h-full items-center text-center">
 <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-white dark:bg-gray-800 shadow-lg shadow-gray-200/50 dark:shadow-none text-primary">
 <span className="material-symbols-outlined text-4xl">{industry.icon}</span>
 </div>
 <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white font-display">{industry.title}</h3>
 <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{industry.desc}</p>
 </div>
 </motion.div>
 ))}
 </div>
 </motion.div>
 </section>
 <section className="py-12 sm:py-16 lg:py-20 px-4 bg-white dark:bg-slate-900 scroll-animate">
 <div className="max-w-6xl mx-auto">

 {/* Header */}
 <div className="text-center max-w-5xl mx-auto mb-10 sm:mb-14">
 <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold uppercase tracking-wide mb-3">
 Why Choose Us
 </span>

 <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
 Trusted IT Company in Kumbakonam for
 <span className="text-primary"> Business Growth</span>
 </h2>

 <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
 We deliver reliable IT services, custom software development, and business automation solutions tailored for small and medium businesses.
 </p>
 </div>

 {/* Cards */}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

 {/* Card 1 */}
 <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-lg transition">
 <span className="material-symbols-outlined text-primary text-3xl mb-4">verified</span>
 <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
 Proven Expertise
 </h3>
 <p className="text-sm text-slate-600 dark:text-slate-400">
 Experienced in delivering software development and IT services for multiple industries with scalable solutions.
 </p>
 </div>

 {/* Card 2 */}
 <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-lg transition">
 <span className="material-symbols-outlined text-primary text-3xl mb-4">settings</span>
 <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
 Custom Solutions
 </h3>
 <p className="text-sm text-slate-600 dark:text-slate-400">
 We build custom software, SaaS products, and automation systems tailored to your business workflows.
 </p>
 </div>

 {/* Card 3 */}
 <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-lg transition">
 <span className="material-symbols-outlined text-primary text-3xl mb-4">support_agent</span>
 <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
 Dedicated Support
 </h3>
 <p className="text-sm text-slate-600 dark:text-slate-400">
 Ongoing support and maintenance to ensure your systems run smoothly without downtime.
 </p>
 </div>

 {/* Card 4 */}
 <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-lg transition">
 <span className="material-symbols-outlined text-primary text-3xl mb-4">bolt</span>
 <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
 Fast & Scalable
 </h3>
 <p className="text-sm text-slate-600 dark:text-slate-400">
 Our solutions are designed for speed, performance, and long-term scalability.
 </p>
 </div>

 {/* Card 5 */}
 <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-lg transition">
 <span className="material-symbols-outlined text-primary text-3xl mb-4">location_on</span>
 <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
 Local Expertise
 </h3>
 <p className="text-sm text-slate-600 dark:text-slate-400">
 Based in Kumbakonam, we understand local business needs and provide practical IT solutions.
 </p>
 </div>

 {/* Card 6 */}
 <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-lg transition">
 <span className="material-symbols-outlined text-primary text-3xl mb-4">trending_up</span>
 <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
 Growth Focused
 </h3>
 <p className="text-sm text-slate-600 dark:text-slate-400">
 We focus on building systems that improve efficiency, reduce costs, and drive business growth.
 </p>
 </div>

 </div>

 </div>

 {/* Hidden SEO Boost */}
 <p className="hidden">
 SwordNex Technologies is a trusted IT company in Kumbakonam offering software development, SaaS solutions, IT services, and business automation for small and medium businesses in Tamil Nadu.
 </p>
 </section>
 <section className="relative py-14 sm:py-16 lg:py-20 px-4 scroll-animate">

 <div className="max-w-7xl mx-auto">

 <div className="relative bg-primary rounded-3xl overflow-hidden shadow-2xl">

 {/* Background Effects */}
 <div className="absolute inset-0 opacity-10">
 <div className="absolute -top-20 -left-20 w-60 h-60 bg-white rounded-full blur-3xl"></div>
 <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
 </div>

 <div className="relative z-10 flex flex-col items-center text-center px-6 py-12 sm:px-10 sm:py-16 lg:py-20">

 {/* Heading */}
 <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight max-w-5xl mb-4">
 Looking for the Best IT Services in Kumbakonam?
 </h2>

 {/* Subtext */}
 <p className="text-blue-100 text-sm sm:text-base lg:text-lg max-w-4xl mb-8 leading-relaxed">
 Get custom software development, SaaS solutions, and business automation tailored to your needs. Let’s build something powerful together.
 </p>

 {/* Buttons */}
 <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">

 {/* Primary CTA */}
 <button
 onClick={() => setIsConsultationOpen(true)}
 className="flex items-center justify-center gap-2 h-12 sm:h-14 px-6 sm:px-8 bg-white text-primary font-semibold rounded-xl shadow-md hover:scale-[1.03] transition-all"
 >
 Get Free Consultation
 <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
 </button>

 {/* Secondary CTA */}
 <a
 href="tel:+919XXXXXXXXX"
 className="flex items-center justify-center gap-2 h-12 sm:h-14 px-6 sm:px-8 border border-white/40 text-white font-medium rounded-xl transition-all"
 >
 Call Now
 <span className="material-symbols-outlined text-[18px]">call</span>
 </a>

 </div>

 {/* Trust Line */}
 <p className="text-blue-200 text-xs sm:text-sm mt-5">
 ✔ Free consultation • ✔ Quick response • ✔ No hidden charges
 </p>

 </div>

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
 <div className="text-center mb-10 sm:mb-14">
 <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold uppercase tracking-wide mb-3">
 FAQ
 </span>

 <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
 Frequently Asked Questions About Our IT Services
 </h2>

 <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
 Find answers to common questions about software development, IT services, and business solutions.
 </p>
 </div>

 {/* FAQ Items */}
 <div className="space-y-4">

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
 ].map((item, index) => (
 <div
 key={index}
 className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 sm:p-5 bg-white dark:bg-slate-800 shadow-sm"
 >
 <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-2">
 {item.q}
 </h3>
 <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
 {item.a}
 </p>
 </div>
 ))}

 </div>

 </div>

 {/* Hidden SEO Boost */}
 <p className="hidden">
 FAQ about IT services in Kumbakonam including software development cost, web development timeline, SaaS solutions, and custom IT services for small and medium businesses.
 </p>

 </section>
 <ConsultationModal isOpen={isConsultationOpen} onClose={() => setIsConsultationOpen(false)} />
 <ServiceEnquiryModal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />
 </div>
 );
};

export default Services;