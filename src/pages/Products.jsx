import React, { useState, useEffect } from 'react';
import ConsultationModal from '../components/ConsultationModal';
import ServiceEnquiryModal from '../components/ServiceEnquiryModal';

const Products = () => {
 const [isConsultationOpen, setIsConsultationOpen] = useState(false);
 const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
 // Scroll Reveal Animation
 useEffect(() => {
 const observer = new IntersectionObserver(
 (entries) => {
 entries.forEach((entry) => {
 if (entry.isIntersecting) {
 entry.target.classList.add('animate-in');
 }
 });
 },
 { threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
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
 transform: translateY(60px);
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

 {/* Hero Section */}
 <section className="py-10 md:py-16 px-4 relative overflow-hidden">

 {/* Background */}
 <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-slate-50/80 to-transparent dark:from-slate-900/20 -z-10"></div>
 <div className="absolute bottom-0 left-0 w-72 bg-gradient-to-r from-blue-100/60 to-purple-100/40 dark:to-purple-900/20 rounded-full blur-3xl -z-10"></div>

 <div className="max-w-7xl mx-auto">

 <div className="text-center mb-14 sm:mb-16 lg:mb-20 max-w-5Sxl mx-auto">

 {/* Tag */}
 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200 text-xs sm:text-sm font-semibold uppercase tracking-wide mb-5">
 <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
 Business Software Solutions
 </div>

 {/* Heading (SEO Optimized) */}
 <h1 className="text-slate-900 dark:text-white font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight mb-5">
 Billing, Payroll & Business
 <span className="block text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text">
 Software for Growing Companies
 </span>
 </h1>

 {/* Subtext */}
 <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-6 max-w-3xl mx-auto">
 Manage billing, payroll, HR, and operations with our powerful SaaS products designed for small and medium businesses in Tamil Nadu.
 </p>

 {/* Supporting Line */}
 <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed mb-8 max-w-2xl mx-auto">
 GST-ready billing, automated payroll, and real-time business insights — all in one scalable platform.
 </p>

 {/* CTA */}
 <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">

 <button
 className="h-12 sm:h-14 px-6 sm:px-8 rounded-xl bg-primary hover:bg-blue-700 text-white font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all"
 onClick={() => setIsConsultationOpen(true)}
 >
 Get Free Demo
 </button>

 <button
 className="h-12 sm:h-14 px-2 sm:px-8 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium text-sm sm:text-base hover:bg-slate-100 dark:hover:bg-slate-800 transition"
 onClick={() => setIsEnquiryOpen(true)}
 >
 Customise Solution
 </button>

 </div>

 </div>

 </div>

 {/* Hidden SEO Boost */}
 <p className="hidden">
 Billing software in Tamil Nadu, payroll software for small business, GST billing system, HR management software, SaaS products India, business software Kumbakonam.
 </p>

 </section>


 {/* Why Choose Us */}
 <section className="py-12 sm:py-14 lg:py-16 px-4 flex justify-center text-center scroll-animate">
 <div className="max-w-6xl flex flex-col gap-4 items-center">

 {/* Tag */}
 <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2">
 Why Choose Our Products
 </span>

 {/* Heading */}
 <h2 className="text-gray-900 dark:text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight">
 Smart Billing, Payroll &
 <span className="text-primary"> Business Software</span>
 </h2>

 {/* Description */}
 <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base md:text-lg max-w-5xl leading-relaxed">
 Our SaaS products help businesses manage billing, payroll, HR, and operations with ease. Built for small and medium businesses to improve efficiency, reduce manual work, and scale faster.
 </p>

 </div>

 {/* Hidden SEO Boost */}
 <p className="hidden">
 Billing software, payroll software, HR management system, GST billing system, SaaS products for small business in Tamil Nadu.
 </p>
 </section>

 {/* Feature Cards */}
 <section className="px-4 pb-12 scroll-animate">
 <div className="max-w-7xl mx-auto">
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
 {/* Billing Card */}
 <div className="feature-card flex flex-col h-full bg-white dark:bg-[#1e2536] rounded-3xl border border-gray-100 dark:border-gray-700/50 p-8 shadow-sm group scroll-animate scroll-animate-delay-1">
 <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-green-50 dark:bg-blue-900/20 mb-6 group-hover:text-white transition-all duration-300">
 <img src="/assets/icoillig.png" alt="Billing icon" className="w-9 h-9 text-primary transition-colors duration-300" />
 </div>
 <h3 className="text-gray-900 dark:text-white text-2xl font-bold font-display mb-3">SwordNex Billing</h3>
 <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
 Smart GST billing and inventory for shops and service businesses.
 </p>
 <ul className="space-y-3 mb-8 flex-1">
 <li className="flex items-start gap-3">
 <span className="material-symbols-outlined text-green-500 text-xl shrink-0">check_circle</span>
 <span className="text-sm text-gray-600 dark:text-gray-300">Create invoices and quotations in seconds</span>
 </li>
 <li className="flex items-start gap-3">
 <span className="material-symbols-outlined text-green-500 text-xl shrink-0">check_circle</span>
 <span className="text-sm text-gray-600 dark:text-gray-300">Auto update stock and purchase history</span>
 </li>
 <li className="flex items-start gap-3">
 <span className="material-symbols-outlined text-green-500 text-xl shrink-0">check_circle</span>
 <span className="text-sm text-gray-600 dark:text-gray-300">Daily / monthly sales and GST reports</span>
 </li>
 </ul>
 <a className="inline-flex items-center text-green-500 font-bold hover:text-primary-dark transition-colors group/link text-sm uppercase tracking-wide" href="/products/billing" target="_blank" rel="noreferrer">
 View Billing details
 <span className="material-symbols-outlined ml-1 text-lg group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
 </a>
 </div>

 {/* Payroll Card */}
 <div className="feature-card flex flex-col h-full bg-white dark:bg-[#1e2536] rounded-3xl border border-gray-100 dark:border-gray-700/50 p-8 shadow-sm group scroll-animate scroll-animate-delay-2">
 <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-blue-50 dark:bg-blue-900/20 text-primary mb-6 group-hover:text-white transition-colors duration-300">
 <img src="/assets/icon payroll.png" alt="Payroll icon" className="w-9 h-9 text-primary transition-colors duration-300" />
 </div>
 <h3 className="text-gray-900 dark:text-white text-2xl font-bold font-display mb-3">SwordNex Payroll</h3>
 <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
 Accurate, compliant payroll without Excel headaches.
 </p>
 <ul className="space-y-3 mb-8 flex-1">
 <li className="flex items-start gap-3">
 <span className="material-symbols-outlined text-primary text-xl shrink-0">check_circle</span>
 <span className="text-sm text-gray-600 dark:text-gray-300">Automatic salary, overtime, and deductions</span>
 </li>
 <li className="flex items-start gap-3">
 <span className="material-symbols-outlined text-primary text-xl shrink-0">check_circle</span>
 <span className="text-sm text-gray-600 dark:text-gray-300">Attendance and leave tracking</span>
 </li>
 <li className="flex items-start gap-3">
 <span className="material-symbols-outlined text-primary text-xl shrink-0">check_circle</span>
 <span className="text-sm text-gray-600 dark:text-gray-300">PF, ESI, TDS and payslip generation</span>
 </li>
 </ul>
 <a className="inline-flex items-center text-primary font-bold hover:text-primary-dark transition-colors group/link text-sm uppercase tracking-wide" href="/products/payroll" target="_blank" rel="noreferrer">
 View Payroll details
 <span className="material-symbols-outlined ml-1 text-lg group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
 </a>
 </div>

 {/* HMS Card */}
 <div className="feature-card flex flex-col h-full bg-white dark:bg-[#1e2536] rounded-3xl border border-gray-100 dark:border-gray-700/50 p-8 shadow-sm group scroll-animate scroll-animate-delay-3">
 <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-yellow-50 dark:bg-blue-900/20 text-primary mb-6 group-hover:text-white transition-colors duration-300">
 <img src="/assets/icon hms.png" alt="HMS icon" className="w-9 h-9 text-primary transition-colors duration-300" />
 </div>
 <h3 className="text-gray-900 dark:text-white text-2xl font-bold font-display mb-3">SwordNex HMS</h3>
 <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
 Central control for daily operations, bookings, and records.
 </p>
 <ul className="space-y-3 mb-8 flex-1">
 <li className="flex items-start gap-3">
 <span className="material-symbols-outlined text-yellow-500 text-xl shrink-0">check_circle</span>
 <span className="text-sm text-gray-600 dark:text-gray-300">Master data for customers, items, and pricing</span>
 </li>
 <li className="flex items-start gap-3">
 <span className="material-symbols-outlined text-yellow-500 text-xl shrink-0">check_circle</span>
 <span className="text-sm text-gray-600 dark:text-gray-300">Track bookings / jobs / tasks in one place</span>
 </li>
 <li className="flex items-start gap-3">
 <span className="material-symbols-outlined text-yellow-500 text-xl shrink-0">check_circle</span>
 <span className="text-sm text-gray-600 dark:text-gray-300">Custom reports for owners and managers</span>
 </li>
 </ul>
 <a className="inline-flex items-center text-yellow-500 font-bold hover:text-primary-dark transition-colors group/link text-sm uppercase tracking-wide" href="/products/hms" target="_blank" rel="noreferrer">
 View HMS details
 <span className="material-symbols-outlined ml-1 text-lg group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
 </a>
 </div>
 </div>

 {/* Bottom 2 Centered Cards */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-8">
 {/* Jobsheet Card */}
 <div className="feature-card flex flex-col h-full bg-white dark:bg-[#1e2536] rounded-3xl border border-gray-100 dark:border-gray-700/50 p-8 shadow-sm group scroll-animate scroll-animate-delay-1">
 <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-purple-50 dark:bg-purple-900/20 mb-6 group-hover:text-white transition-all duration-300">
 <span className="material-symbols-outlined text-purple-500 transition-colors duration-300 text-3xl">assignment</span>
 </div>
 <h3 className="text-gray-900 dark:text-white text-2xl font-bold font-display mb-3">SwordNex Jobsheet</h3>
 <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
 Track tasks, manage workflows, and assign duties effortlessly.
 </p>
 <ul className="space-y-3 mb-8 flex-1">
 <li className="flex items-start gap-3">
 <span className="material-symbols-outlined text-purple-500 text-xl shrink-0">check_circle</span>
 <span className="text-sm text-gray-600 dark:text-gray-300">Assign and monitor daily tasks and workflows</span>
 </li>
 <li className="flex items-start gap-3">
 <span className="material-symbols-outlined text-purple-500 text-xl shrink-0">check_circle</span>
 <span className="text-sm text-gray-600 dark:text-gray-300">Timeline tracking and status updates</span>
 </li>
 <li className="flex items-start gap-3">
 <span className="material-symbols-outlined text-purple-500 text-xl shrink-0">check_circle</span>
 <span className="text-sm text-gray-600 dark:text-gray-300">Resource allocation and performance insights</span>
 </li>
 </ul>
 {/* <a className="inline-flex items-center text-purple-500 font-bold hover:text-primary-dark transition-colors group/link text-sm uppercase tracking-wide cursor-pointer" onClick={() => setIsConsultationOpen(true)}>
 View Jobsheet details
 <span className="material-symbols-outlined ml-1 text-lg group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
 </a> */}
 <a className="inline-flex items-center text-purple-500 font-bold hover:text-primary-dark transition-colors group/link text-sm uppercase tracking-wide cursor-pointer" href="/products/jobsheet" target="_blank" rel="noreferrer">
 View Jobsheet details
 <span className="material-symbols-outlined ml-1 text-lg group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
 </a>
 </div>

 {/* Invoice Card */}
 <div className="feature-card flex flex-col h-full bg-white dark:bg-[#1e2536] rounded-3xl border border-gray-100 dark:border-gray-700/50 p-8 shadow-sm group scroll-animate scroll-animate-delay-2">
 <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-orange-50 dark:bg-orange-900/20 mb-6 group-hover:text-white transition-all duration-300">
 <span className="material-symbols-outlined text-orange-500 transition-colors duration-300 text-3xl">receipt_long</span>
 </div>
 <h3 className="text-gray-900 dark:text-white text-2xl font-bold font-display mb-3">SwordNex Invoice</h3>
 <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
 Professional invoicing and payment tracking for your business.
 </p>
 <ul className="space-y-3 mb-8 flex-1">
 <li className="flex items-start gap-3">
 <span className="material-symbols-outlined text-orange-500 text-xl shrink-0">check_circle</span>
 <span className="text-sm text-gray-600 dark:text-gray-300">Generate professional, branded invoices instantly</span>
 </li>
 <li className="flex items-start gap-3">
 <span className="material-symbols-outlined text-orange-500 text-xl shrink-0">check_circle</span>
 <span className="text-sm text-gray-600 dark:text-gray-300">Automated payment reminders and tracking</span>
 </li>
 <li className="flex items-start gap-3">
 <span className="material-symbols-outlined text-orange-500 text-xl shrink-0">check_circle</span>
 <span className="text-sm text-gray-600 dark:text-gray-300">Detailed financial summaries and taxation reports</span>
 </li>
 </ul>
 {/* <a className="inline-flex items-center text-orange-500 font-bold hover:text-primary-dark transition-colors group/link text-sm uppercase tracking-wide cursor-pointer" onClick={() => setIsConsultationOpen(true)}>
 View Invoice details
 <span className="material-symbols-outlined ml-1 text-lg group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
 </a> */}
 <a className="inline-flex items-center text-orange-500 font-bold hover:text-primary-dark transition-colors group/link text-sm uppercase tracking-wide cursor-pointer" href="/products/invoice" target="_blank" rel="noreferrer">
 View Invoice details
 <span className="material-symbols-outlined ml-1 text-lg group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
 </a>
 </div>
 </div>
 </div>
 </section>

 {/* Product Guide */}
 <section className="pb-20 px-4 scroll-animate">
 <div className="max-w-4xl mx-auto">
 <div className="text-center mb-10">
 <span className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-3">
 Product Guide
 </span>
 <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-white mb-4">Which product is right for me?</h2>
 <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">Identify your primary need, and we'll point you to the perfect SwordNex solution.</p>
 </div>
 <div className="bg-white dark:bg-[#1e2536] rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700/50 overflow-hidden relative">
 <div className="divide-y divide-gray-100 dark:divide-gray-700/50 relative z-10">
 <div className="group flex flex-col md:flex-row items-center p-6 md:p-8 hover:bg-yellow-100/10 dark:hover:bg-blue-900/10 transition-colors duration-300 gap-6 scroll-animate scroll-animate-delay-1">
 <div className="flex-1 flex items-center gap-5 w-full md:w-auto">
 <div className="size-12 rounded-2xl bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
 <span className="material-symbols-outlined">receipt_long</span>
 </div>
 <h3 className="text-lg font-medium text-gray-900 dark:text-white">Need to fix billing &amp; stock first?</h3>
 </div>
 <div className="w-full md:w-auto md:min-w-[240px] flex justify-end">
 <a className="w-full md:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-semibold hover:border-yellow-500 hover:text-yellow-500 dark:hover:border-primary dark:hover:text-primary transition-all shadow-sm group-hover:shadow-md" target="_blank" href="/products/billing" rel="noreferrer">
 SwordNex Billing
 <span className="material-symbols-outlined text-sm">chevron_right</span>
 </a>
 </div>
 </div>
 <div className="group flex flex-col md:flex-row items-center p-6 md:p-8 /40 dark:hover:bg-blue-900/10 transition-colors duration-300 gap-6 scroll-animate scroll-animate-delay-2">
 <div className="flex-1 flex items-center gap-5 w-full md:w-auto">
 <div className="size-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-pink-400 flex items-center justify-center shrink-0">
 <span className="material-symbols-outlined">payments</span>
 </div>
 <h3 className="text-lg font-medium text-gray-900 dark:text-white">Spending time in salary calculations?</h3>
 </div>
 <div className="w-full md:w-auto md:min-w-[240px] flex justify-end">
 <a className="w-full md:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-semibold hover:border-primary hover:text-primary transition-all shadow-sm group-hover:shadow-md" href="/products/payroll" target="_blank" rel="noreferrer">
 SwordNex Payroll
 <span className="material-symbols-outlined text-sm">chevron_right</span>
 </a>
 </div>
 </div>
 <div className="group flex flex-col md:flex-row items-center p-6 md:p-8 hover:bg-green-100/40 dark:hover:bg-blue-900/10 transition-colors duration-300 gap-6 scroll-animate scroll-animate-delay-3">
 <div className="flex-1 flex items-center gap-5 w-full md:w-auto">
 <div className="size-12 rounded-2xl bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-teal-400 flex items-center justify-center shrink-0">
 <span className="material-symbols-outlined">tune</span>
 </div>
 <h3 className="text-lg font-medium text-gray-900 dark:text-white">Need full operations control?</h3>
 </div>
 <div className="w-full md:w-auto md:min-w-[240px] flex justify-end">
 <a className="w-full md:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-semibold hover:border-green-600 hover:text-green-600 dark:hover:border-primary dark:hover:text-primary transition-all shadow-sm group-hover:shadow-md" href="/products/hms" target="_blank" rel="noreferrer">
 SwordNex Hms
 <span className="material-symbols-outlined text-sm">chevron_right</span>
 </a>
 </div>
 </div>

 <div className="group flex flex-col md:flex-row items-center p-6 md:p-8 hover:bg-purple-100/40 dark:hover:bg-purple-900/10 transition-colors duration-300 gap-6 scroll-animate scroll-animate-delay-4">
 <div className="flex-1 flex items-center gap-5 w-full md:w-auto">
 <div className="size-12 rounded-2xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
 <span className="material-symbols-outlined">assignment</span>
 </div>
 <h3 className="text-lg font-medium text-gray-900 dark:text-white">Need to track daily tasks and workflows?</h3>
 </div>
 <div className="w-full md:w-auto md:min-w-[240px] flex justify-end">
 <button className="w-full md:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-semibold hover:border-purple-600 hover:text-purple-600 dark:hover:border-primary dark:hover:text-primary transition-all shadow-sm group-hover:shadow-md cursor-pointer" href="/products/jobsheet" target="_blank" rel="noreferrer">
 SwordNex Jobsheet
 <span className="material-symbols-outlined text-sm">chevron_right</span>
 </button>
 </div>
 </div>

 <div className="group flex flex-col md:flex-row items-center p-6 md:p-8 hover:bg-orange-100/40 dark:hover:bg-orange-900/10 transition-colors duration-300 gap-6 scroll-animate scroll-animate-delay-5">
 <div className="flex-1 flex items-center gap-5 w-full md:w-auto">
 <div className="size-12 rounded-2xl bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
 <span className="material-symbols-outlined">receipt_long</span>
 </div>
 <h3 className="text-lg font-medium text-gray-900 dark:text-white">Looking for professional invoicing?</h3>
 </div>
 <div className="w-full md:w-auto md:min-w-[240px] flex justify-end">
 <button className="w-full md:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-semibold hover:border-orange-600 hover:text-orange-600 dark:hover:border-primary dark:hover:text-primary transition-all shadow-sm group-hover:shadow-md cursor-pointer" href="/products/invoice" target="_blank" rel="noreferrer">
 SwordNex Invoice
 <span className="material-symbols-outlined text-sm">chevron_right</span>
 </button>
 </div>
 </div>
 </div>
 <div className="bg-gray-50 dark:bg-gray-800/30 p-5 text-center border-t border-gray-100 dark:border-gray-700/50">
 <button onClick={() => setIsConsultationOpen(true)} className="inline-flex items-center justify-center gap-2 text-primary dark:text-primary-light font-bold hover:text-primary-dark transition-colors bg-transparent border-none cursor-pointer">
 Help me choose a product
 <span className="material-symbols-outlined text-xl">contact_support</span>
 </button>
 </div>
 </div>
 </div>
 </section>

 {/* Integration Section */}
 <section className="py-20 bg-white dark:bg-[#151b2b] border-y border-gray-100 dark:border-gray-800 scroll-animate">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="flex flex-col lg:flex-row items-center gap-16">
 <div className="w-full lg:w-1/2 flex flex-col gap-6 scroll-animate scroll-animate-delay-1">
 <span className="inline-block w-fit px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-primary text-xs font-bold uppercase tracking-wider">
 Integration
 </span>
 <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-white leading-tight">
 Stronger together as <span className="text-primary">one platform</span>
 </h2>
 <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
 Our products are designed to work seamlessly together, creating a unified ecosystem for your business operations.
 </p>
 <ul className="flex flex-col gap-4 mt-2">
 {[
 { icon: "verified_user", title: "One login", desc: "One login for Billing, Payroll, and HMS with a single secure identity." },
 { icon: "database", title: "Shared master data", desc: "Shared master data (customers, items, staff) reflects everywhere automatically." },
 { icon: "analytics", title: "Combined reports", desc: "Combined reports for owners with holistic cross-module analytics." }
 ].map((item, i) => (
 <li key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 hover:bg-yellow-50 dark:hover:bg-blue-900/20 transition-colors scroll-animate" style={{ transitionDelay: `${(i + 1) * 0.1}s` }}>
 <div className="mt-1 min-w-[24px] text-yellow-500">
 <span className="material-symbols-outlined">verified_user</span>
 </div>
 <div>
 <h4 className="font-bold text-gray-900 dark:text-white text-base">{item.title}</h4>
 <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
 </div>
 </li>
 ))}
 </ul>
 </div>
 <div className="w-full lg:w-1/2 flex justify-center lg:justify-end scroll-animate scroll-animate-delay-2">
 {/* Your existing integration diagram */}
 <div className="relative w-full max-w-[400px] aspect-square">
 {/* SVG and icons remain unchanged */}
 <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full blur-3xl opacity-60"></div>
 <svg className="absolute inset-0 w-full h-full text-gray-300 dark:text-gray-600 pointer-events-none z-0" fill="none" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
 <circle className="opacity-50" cx="200" cy="200" r="140" stroke="currentColor" strokeDasharray="8 8" strokeWidth="2"></circle>
 <path d="M200 200 L200 80" stroke="currentColor" strokeWidth="2"></path>
 <path d="M200 200 L80 280" stroke="currentColor" strokeWidth="2"></path>
 <path d="M200 200 L320 280" stroke="currentColor" strokeWidth="2"></path>
 </svg>
 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center">
 <div className="bg-primary text-white w-24 h-24 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/30 mb-2 relative z-10 ring-4 ring-white dark:ring-[#151b2b]">
 <span className="material-symbols-outlined text-4xl">hub</span>
 </div>
 <div className="bg-white dark:bg-gray-800 px-3 py-1 rounded-lg shadow-sm text-xs font-bold text-gray-900 dark:text-white border border-gray-100 dark:border-gray-700 whitespace-nowrap relative z-20 -mt-4 mx-auto w-fit">One Platform</div>
 </div>
 <div className="absolute top-[48px] left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center group">
 <div className="bg-white dark:bg-[#1e2536] w-16 h-16 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
 <span className="material-symbols-outlined text-blue-500 text-2xl">receipt_long</span>
 </div>
 <span className="mt-2 text-sm font-bold text-gray-700 dark:text-gray-200 bg-white/80 dark:bg-gray-800/80 px-2 rounded backdrop-blur-sm">Billing</span>
 </div>
 <div className="absolute bottom-[88px] left-[48px] z-10 flex flex-col items-center group">
 <div className="bg-white dark:bg-[#1e2536] w-16 h-16 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
 <span className="material-symbols-outlined text-purple-500 text-2xl">payments</span>
 </div>
 <span className="mt-2 text-sm font-bold text-gray-700 dark:text-gray-200 bg-white/80 dark:bg-gray-800/80 px-2 rounded backdrop-blur-sm">Payroll</span>
 </div>
 <div className="absolute bottom-[88px] right-[48px] z-10 flex flex-col items-center group">
 <div className="bg-white dark:bg-[#1e2536] w-16 h-16 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
 <span className="material-symbols-outlined text-green-500 text-2xl">badge</span>
 </div>
 <span className="mt-2 text-sm font-bold text-gray-700 dark:text-gray-200 bg-white/80 dark:bg-gray-800/80 px-2 rounded backdrop-blur-sm">HMS</span>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* CTA + FAQ */}
 <section className="pb-20 px-4 scroll-animate">
 <div className="max-w-5xl mx-auto">
 <div className="relative bg-primary dark:bg-primary-dark rounded-3xl overflow-hidden shadow-2xl shadow-blue-600/20 mb-20">
 <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
 <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
 <div className="relative z-10 px-6 py-16 md:py-20 flex flex-col items-center text-center">
 <h2 className="text-3xl md:text-4xl font-bold font-display text-white mb-8 leading-tight max-w-3xl">
 Ready to see how SwordNex products fit your business?
 </h2>
 <button onClick={() => setIsConsultationOpen(true)} className="group bg-white text-primary text-base md:text-lg font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2">
 Book a 30‑minute demo
 <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
 </button>
 </div>
 </div>

 <div className="max-w-4xl mx-auto">
 <h3 className="text-2xl font-bold font-display text-[#111318] dark:text-white text-center mb-12">Frequently Asked Questions</h3>
 <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
 {[
 { icon: "payments", color: "red", title: "How does pricing work?", desc: "We offer flexible tiered plans starting with a free trial..." },
 { icon: "schedule", color: "blue", title: "What is the setup time?", desc: "Most teams are up and running in less than 24 hours..." },
 { icon: "cloud_sync", color: "green", title: "How is data migration handled?", desc: "We provide one-click import tools..." },
 { icon: "support_agent", color: "yellow", title: "What kind of support is included?", desc: "All plans come with 24/7 email and chat support..." }
 ].map((faq, i) => (
 <div key={i} className={`flex gap-4 items-start scroll-animate scroll-animate-delay-${i + 1}`}>
 <div className={`w-10 h-10 rounded-lg bg-${faq.color}-50 dark:bg-${faq.color}-900/20 text-${faq.color}-500 flex items-center justify-center shrink-0`}>
 <span className="material-symbols-outlined text-xl">{faq.icon}</span>
 </div>
 <div>
 <h4 className="text-lg font-bold text-[#111318] dark:text-white mb-2 font-display">{faq.title}</h4>
 <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{faq.desc}</p>
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>
 </section>

 <ConsultationModal isOpen={isConsultationOpen} onClose={() => setIsConsultationOpen(false)} />
 <ServiceEnquiryModal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />
 </>
 );
};

export default Products;