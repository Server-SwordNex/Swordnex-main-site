import React from "react";
import { Link } from "react-router-dom";
import {
 MapPinIcon,
} from "@heroicons/react/24/outline";
import { PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/solid'; // or outline, depending on your choice


const Footer = () => {
 const currentYear = new Date().getFullYear();

 const products = [
 { name: "SwordNex Billing", href: "/products/billing" },
 { name: "SwordNex Payroll", href: "/products/payroll" },
 { name: "SwordNex HMS", href: "/products/hms" },
 { name: "SwordNex Invoice", href: "/products/invoice" },
 { name: "SwordNex Jobsheet", href: "/products/jobsheet" },
 ];

 const company = [
 { name: "About Us", to: "/about" },
 { name: "Products", to: "/products" },
 { name: "Careers", to: "/career" },
 { name: "Contact", to: "/contact" },
 { name: "Affiliate", to: "/affiliate" },
 { name: "Sign In", to: "/signin" },
 { name: "Sign Up", to: "/signup" },
 ];

 const services = [
 { name: "Application Development", to: "/services/application-development" },
 { name: "Digital Media", to: "/services/digital-media" },
 { name: "HR Consultancy", to: "/services/hr-consulting" },
 { name: "IT Training & Skill Development", to: "/services/it-training-skill-development" },
 { name: "IT Infrastructure", to: "/services/it-infrastructure" },
 ];

 // NEW: Resources Section - Added as requested
 const resources = [

 { name: "Blog", to: "/BlogPage" },
 { name: "Support", to: "/SupportPage" },
 { name: "FAQs", to: "/FAQPage" },
 ];

 const legal = [
 { name: "Security", to: "/security" },
 { name: "IPR Complaints", to: "/IPR-Complaints" },
 { name: "Terms", to: "/Terms" },
 { name: "Privacy", to: "/PrivacyPolicy" },
 { name: "Trademark", to: "/TM-Policy" },
 { name: "Cookies", to: "/cookiepolicy" },
 { name: "GDPR", to: "/GDPRcompliance" },
 { name: "Application", to: "/Application" },
 { name: "Workplace Ethics", to: "/Workplace" },

 ];

 const socials = [
 {
 name: "Google Maps",
 href: "https://maps.app.goo.gl/QQQLMBDHixKPL3Dt7",
 icon: (<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>)
 },
 {
 name: "LinkedIn",
 href: "https://www.linkedin.com/company/swordnex-technologies/",
 icon: (<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>)
 },
 {
 name: "Instagram",
 href: "https://instagram.com/swordnex",
 icon: (<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>)
 },
 ];

 return (
 <footer className="relative bg-gradient-to-b from-slate-900 to-slate-950 text-gray-300">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 pt-12 sm:pt-16 pb-8">
 {/* Main Footer Content - NOW 5 COLUMNS WITH RESOURCES */}
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 place-items-start">

 {/* 1. Logo & Address - LEFT ALIGNED */}
 <div className="col-span-1 md:col-span-2 lg:col-span-1 space-y-6 w-full text-left">
 <Link to="/" className="inline-block">
 <img src="/assets/footer@3x.png" alt="SwordNex Logo" className="w-48 sm:w-64 lg:w-80 h-auto object-contain hover:opacity-90 transition-opacity" />
 </Link>
 <div className="space-y-4">
 <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
 Empowering businesses with innovative technology solutions.
 </p>
 <div className="bg-slate-800/50 rounded-xl p-4 border max-w-sm border-slate-700/50">
 <h4 className="text-white font-semibold text-sm flex items-center gap-2 mb-2">
 <MapPinIcon className="w-4 h-4 text-blue-400" /> Head Office
 </h4>
 <a href="https://maps.app.goo.gl/QQQLMBDHixKPL3Dt7" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white block leading-relaxed">
 15C, Ravi Plaza, 60 Feet Road Near New Bus Stand, Kumbakonam<br />Tamil Nadu – 612001, India
 </a>
 </div>
 <div className="flex flex-col gap-2">
 {/* Phone Link */}
 <a
 href="tel:+919486106953"
 className="inline-flex items-center gap-2 bg-slate-800/50 hover:bg-blue-600 px-4 py-2 rounded-lg border border-slate-700/50 hover:border-blue-500 transition-all text-white"
 >
 <PhoneIcon className="w-5 h-5 text-blue-400 flex-shrink-0" />
 <span className="truncate">+91 94861 06953</span>
 </a>

 {/* Email Link */}
 <a
 href="mailto:support@swordnex.com"
 className="inline-flex items-center gap-2 bg-slate-800/50 hover:bg-blue-600 px-4 py-2 rounded-lg border border-slate-700/50 hover:border-blue-500 transition-all text-white"
 >
 <EnvelopeIcon className="w-5 h-5 text-blue-400 flex-shrink-0" />
 <span className="truncate">support@swordnex.com</span>
 </a>
 </div>
 </div>
 </div>

 {/* 2. Products */}
 <div className="col-span-1 lg:col-span-1 w-full text-left">
 <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
 <div className="w-1 h-4 bg-blue-500 rounded-full"></div> Products
 </h4>
 <ul className="space-y-3">
 {products.map((product) => (
 <li key={product.name}>
 <a href={product.href} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 group">
 {product.name} <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
 </a>
 </li>
 ))}
 </ul>
 </div>

 {/* 3. Company */}
 <div className="col-span-1 lg:col-span-1 w-full text-left">
 <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
 <div className="w-1 h-4 bg-blue-500 rounded-full"></div> Company
 </h4>
 <ul className="space-y-3">
 {company.map((item) => (
 <li key={item.name}>
 <Link to={item.to} className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 group">
 {item.name} <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
 </Link>
 </li>
 ))}
 </ul>
 </div>

 {/* 4. Services */}
 <div className="col-span-1 lg:col-span-1 w-full text-left">
 <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
 <div className="w-1 h-4 bg-blue-500 rounded-full"></div> Services
 </h4>
 <ul className="space-y-3">
 {services.map((item) => (
 <li key={item.name}>
 <Link to={item.to} className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 group">
 {item.name} <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
 </Link>
 </li>
 ))}
 </ul>
 </div>

 {/* 5. NEW: Resources Section */}
 <div className="col-span-1 lg:col-span-1 w-full text-left">
 <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
 <div className="w-1 h-4 bg-blue-500 rounded-full"></div> Resources
 </h4>
 <ul className="space-y-3">
 {resources.map((item) => (
 <li key={item.name}>
 <Link to={item.to} className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 group">
 {item.name} <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
 </Link>
 </li>
 ))}
 </ul>
 </div>
 </div>

 {/* Newsletter + Social Row - UNCHANGED */}
 <div className="mt-12 pt-8 border-t border-slate-800 bg-slate-800/30 backdrop-blur-sm rounded-lg p-6 sm:p-8">
 <div className="max-w-4xl mx-auto">
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
 <div className="text-left">
 <h4 className="text-white font-semibold text-lg uppercase tracking-wider mb-6 flex items-center gap-2">
 <div className="w-2 h-6 bg-blue-500 rounded-full"></div> Connect With Us
 </h4>
 <div className="flex flex-wrap gap-3">
 {socials.map((social) => (
 <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="group relative w-10 h-10 rounded-lg bg-slate-700 hover:bg-blue-600 border border-slate-600 hover:border-blue-500 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg" aria-label={social.name}>
 {social.icon}
 </a>
 ))}
 </div>
 </div>

 <div className="text-left">
 <h4 className="text-white font-semibold text-lg uppercase tracking-wider flex items-center gap-2 mb-4">
 <div className="w-2 h-6 bg-blue-500 rounded-full"></div> Subscribe to our Newsletter
 </h4>
 <div className="flex flex-col sm:flex-row gap-3">
 <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
 <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors whitespace-nowrap">Subscribe</button>
 </div>
 <p className="text-xs text-gray-400 mt-2">Get SwordNex updates and news directly in your inbox.</p>
 </div>
 </div>
 </div>
 </div>

 {/* Legal Links + Copyright - UNCHANGED */}
 <div className="mt-12 pt-8 border-t border-slate-800">
 <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6">
 {legal.map((item, index) => (
 <React.Fragment key={item.name}>
 <Link to={item.to} className="text-xs sm:text-sm text-gray-500 hover:text-white transition-colors">
 {item.name}
 </Link>
 {index < legal.length - 1 && <span className="text-slate-700 hidden sm:inline">•</span>}
 </React.Fragment>
 ))}
 </div>

 <div className="text-center">
 <p className="text-sm text-gray-400">
 © {currentYear} <span className="text-white font-medium">SwordNex Technologies Private Limited</span>. All rights reserved.
 </p>
 </div>
 </div>
 </div>

 {/* Decorative Elements */}
 <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent rounded-full"></div>
 </footer>
 );
};

export default Footer;
