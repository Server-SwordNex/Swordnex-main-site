import React from 'react';
// import { DocumentTextIcon, CheckCircleIcon, XCircleIcon, MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
// import { LockClosedIcon } from '@heroicons/react/24/solid';
// import { Shield, Check, Mail, Phone, MapPin } from "lucide-react";
import { Shield, Check } from "lucide-react";
import { LockClosedIcon } from "@heroicons/react/24/solid";

// const Terms = () => {
// const scrollToTop = () => {
// window.scrollTo({ top: 0, behavior: 'smooth' });
// };

// return (
// <div className="min-h-screen bg-gray-50">
// {/* Header */}
// <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-10">
// <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
// <DocumentTextIcon className="w-16 h-16 mx-auto mb-4 opacity-90" />
// <h1 className="text-3xl lg:text-4xl font-bold mb-6">Terms & Conditions</h1>
// <div className="flex flex-wrap justify-center gap-4 text-blue-100">
// <span className="bg-blue-600/50 px-6 py-2 rounded-full border border-blue-400/30">
// Last Updated: Sep 5, 2026
// </span>
// <span className="bg-blue-600/50 px-6 py-2 rounded-full border border-blue-400/30">
// Effective: Sep 5, 2026
// </span>
// </div>
// </div>
// </header>

// {/* Navigation */}
// <nav className="sticky top-0 z-10 bg-white/95 backdrop-blur shadow-sm mt-4">
// <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
// <ul className="flex flex-wrap justify-center gap-3 py-4 text-sm font-medium">
// {[
// 'acceptance', 'services', 'use', 'prohibited', 
// 'ip', 'content', 'liability', 'termination', 
// 'law', 'contact'
// ].map((id) => (
// <li key={id}>
// <a
// href={`#${id}`}
// className="px-4 py-2 text-blue-700 rounded transition-colors"
// >
// {id.charAt(0).toUpperCase() + id.slice(1)}
// </a>
// </li>
// ))}
// <li>
// <button
// onClick={scrollToTop}
// className="ml-2 px-4 py-2 text-blue-700 rounded transition-colors"
// >
// ↑ Top
// </button>
// </li>
// </ul>
// </div>
// </nav>

// {/* Main Content */}
// <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-3">
 
// {/* 1. Acceptance */}
// <section id="acceptance" className="bg-white rounded-xl shadow-sm border border-blue-100 p-8">
// <h2 className="text-2xl font-bold text-blue-800 mb-6 pb-3 border-b border-blue-200">
// Acceptance of Terms
// </h2>
// <div className="space-y-4 text-gray-700">
// <p>
// SwordNex Technologies Private Limited ("SwordNex", "we", "us", or "our") operates swordnex.com (the "Website"). 
// By accessing this Website, you agree to these Terms and Conditions and our Privacy Policy.
// </p>
// <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
// <p className="font-medium text-blue-900">
// If you do not agree with these Terms, you must immediately discontinue use of the Website.
// </p>
// </div>
// <p>
// We reserve the right to modify these Terms at any time. Continued use constitutes acceptance of changes.
// </p>
// </div>
// </section>

// {/* 2. Services */}
// <section id="services" className="bg-white rounded-xl shadow-sm border border-blue-100 p-8">
// <h2 className="text-2xl font-bold text-blue-800 mb-6 pb-3 border-b border-blue-200">
// Description of Services
// </h2>
// <div className="grid md:grid-cols-3 gap-6">
// {[
// {
// title: "Information Services",
// items: [
// "Custom business management software",
// "UI/UX design services",
// "Digital marketing solutions",
// "Company portfolio"
// ]
// },
// {
// title: "Contact Services",
// items: [
// "Software development inquiries",
// "Custom solution consultations",
// "Partnership opportunities",
// "Technical support"
// ]
// },
// {
// title: "Public Resources",
// items: [
// "Product brochures",
// "Demo videos",
// "Technical specifications",
// "Client testimonials"
// ]
// }
// ].map((service) => (
// <div key={service.title} className="bg-gray-50 rounded-lg p-6">
// <h3 className="text-lg font-semibold text-blue-700 mb-3">{service.title}</h3>
// <ul className="space-y-2">
// {service.items.map((item) => (
// <li key={item} className="flex items-start gap-2 text-sm">
// <CheckCircleIcon className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
// <span>{item}</span>
// </li>
// ))}
// </ul>
// </div>
// ))}
// </div>
// </section>

// {/* 3. Permitted Use */}
// <section id="use" className="bg-white rounded-xl shadow-sm border border-blue-100 p-8">
// <h2 className="text-2xl font-bold text-blue-800 mb-6 pb-3 border-b border-blue-200">
// Permitted Use & Responsibilities
// </h2>
// <div className="grid md:grid-cols-2 gap-8">
// <div>
// <h3 className="text-lg font-semibold text-blue-700 mb-4">You May:</h3>
// <ul className="space-y-3">
// {[
// "Review services and software solutions",
// "Contact SwordNex for business inquiries",
// "Download marketing materials",
// "Evaluate for partnerships"
// ].map((item) => (
// <li key={item} className="flex items-start gap-3 text-gray-700">
// <CheckCircleIcon className="w-5 h-5 text-blue-500 mt-0.5" />
// {item}
// </li>
// ))}
// </ul>
// </div>
// <div>
// <h3 className="text-lg font-semibold text-blue-700 mb-4">You Agree To:</h3>
// <ul className="space-y-3">
// {[
// "Use only for lawful purposes",
// "Provide accurate information",
// "Respect technical limits",
// "Maintain confidentiality"
// ].map((item) => (
// <li key={item} className="flex items-start gap-3 text-gray-700">
// <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center text-blue-600 text-xs">
// ✓
// </div>
// {item}
// </li>
// ))}
// </ul>
// </div>
// </div>
// </section>

// {/* 4. Prohibited Activities */}
// <section id="prohibited" className="bg-white rounded-xl shadow-sm border border-blue-100 p-8">
// <h2 className="text-2xl font-bold text-blue-800 mb-6 pb-3 border-b border-blue-200">
// Prohibited Activities
// </h2>
// <div className="grid md:grid-cols-3 gap-6">
// {[
// {
// title: "Technical Prohibitions",
// items: [
// "Unauthorized system access",
// "Automated data scraping",
// "Interference with functionality",
// "Reverse engineering",
// "Malware transmission"
// ]
// },
// {
// title: "Content Prohibitions",
// items: [
// "Unauthorized use of branding",
// "Content reproduction",
// "False information",
// "Impersonation"
// ]
// },
// {
// title: "Legal Compliance",
// items: [
// "IT Act, 2000",
// "DPDP Act, 2023",
// "Indian Contract Act"
// ]
// }
// ].map((category) => (
// <div key={category.title} className="bg-red-50 rounded-lg p-6 border border-red-100">
// <h3 className="text-lg font-semibold text-red-800 mb-3">{category.title}</h3>
// <ul className="space-y-2">
// {category.items.map((item) => (
// <li key={item} className="flex items-start gap-2 text-sm text-red-700">
// <XCircleIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
// {item}
// </li>
// ))}
// </ul>
// </div>
// ))}
// </div>
// </section>

// {/* 5. Intellectual Property */}
// <section id="ip" className="bg-white rounded-xl shadow-sm border border-blue-100 p-8">
// <h2 className="text-2xl font-bold text-blue-800 mb-6 pb-3 border-b border-blue-200">
// Intellectual Property
// </h2>
// <div className="space-y-6">
// <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
// <p className="font-medium text-blue-900">
// All Website content, trademarks, and materials are owned by SwordNex.
// </p>
// </div>
// <div className="grid md:grid-cols-2 gap-6">
// <div>
// <h3 className="text-lg font-semibold text-blue-700 mb-4">Your License:</h3>
// <ul className="space-y-2 text-gray-700">
// {[
// "View content for evaluation",
// "Share public links with attribution"
// ].map((item) => (
// <li key={item} className="flex items-start gap-2">
// <CheckCircleIcon className="w-5 h-5 text-blue-500 mt-0.5" />
// {item}
// </li>
// ))}
// </ul>
// </div>
// <div>
// <h3 className="text-lg font-semibold text-blue-700 mb-4">Restrictions:</h3>
// <ul className="space-y-2 text-gray-700">
// {[
// "Commercial use without permission",
// "Content modification",
// "Trademark usage",
// "Derivative works"
// ].map((item) => (
// <li key={item} className="flex items-start gap-2">
// <XCircleIcon className="w-5 h-5 text-red-500 mt-0.5" />
// {item}
// </li>
// ))}
// </ul>
// </div>
// </div>
// </div>
// </section>

// {/* 6. Liability */}
// <section id="liability" className="bg-white rounded-xl shadow-sm border border-blue-100 p-8">
// <h2 className="text-2xl font-bold text-blue-800 mb-6 pb-3 border-b border-blue-200">
// Disclaimers & Liability
// </h2>
// <div className="grid md:grid-cols-2 gap-8">
// <div className="bg-gray-50 p-6 rounded-lg">
// <h3 className="text-lg font-semibold text-blue-700 mb-4">"AS IS" Basis</h3>
// <ul className="space-y-2 text-gray-700">
// {[
// "No warranty of uninterrupted service",
// "No accuracy guarantees",
// "No virus protection warranty"
// ].map((item) => (
// <li key={item} className="flex items-start gap-2">
// <XCircleIcon className="w-5 h-5 text-red-500 mt-0.5" />
// {item}
// </li>
// ))}
// </ul>
// </div>
// <div>
// <h3 className="text-lg font-semibold text-blue-700 mb-4">Liability Cap</h3>
// <div className="bg-blue-600 text-white p-4 rounded-lg text-center mb-4">
// <span className="text-xl font-bold">₹1,00,000</span>
// <p className="text-sm opacity-90">Maximum liability regardless of cause</p>
// </div>
// <p className="text-gray-700">
// SwordNex shall not be liable for indirect, consequential, or punitive damages.
// </p>
// </div>
// </div>
// </section>

// {/* 7. Termination */}
// <section id="termination" className="bg-white rounded-xl shadow-sm border border-blue-100 p-8">
// <h2 className="text-2xl font-bold text-blue-800 mb-6 pb-3 border-b border-blue-200">
// Termination
// </h2>
// <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
// <p className="text-blue-900 mb-4">
// SwordNex may suspend access for violations, security concerns, or legal requirements.
// </p>
// <p className="text-gray-700">
// Surviving sections include intellectual property, liability, and governing law clauses.
// </p>
// </div>
// </section>

// {/* 8. Governing Law */}
// <section id="law" className="bg-white rounded-xl shadow-sm border border-blue-100 p-8">
// <h2 className="text-2xl font-bold text-blue-800 mb-6 pb-3 border-b border-blue-200">
// Governing Law
// </h2>
// <div className="space-y-4 text-gray-700">
// <p>Governed by Indian law. Exclusive jurisdiction in Kumbakonam, Tamil Nadu.</p>
// <div className="bg-gray-50 p-4 rounded-lg">
// <p className="font-medium">Disputes subject to arbitration in Chennai under:</p>
// <p className="text-sm">Arbitration and Conciliation Act, 1996</p>
// </div>
// </div>
// </section>

// {/* 9. Contact */}
// <section id="contact" className="w-full bg-white rounded-xl shadow-lg border border-blue-200 p-6 lg:p-8">
// <div className="max-w-4xl mx-auto">
// {/* Smaller Heading */}
// <div className="text-center mb-8">
// <h2 className="text-xl sm:text-2xl font-bold mb-6 flex items-center justify-center gap-2">
// <LockClosedIcon className="w-8 h-8 text-blue-600" />
// <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
// Security Officer
// </span>
// </h2>
// </div>

// {/* Compact Grid */}
// <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-slate-800">
// {/* Left - Company */}
// <div className="space-y-5">
// <p className="text-xl font-bold text-blue-900">
// SwordNex Technologies Private Limited
// </p>
// <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
// <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center border border-blue-200 flex-shrink-0">
// <MapPin className="w-5 h-5 text-blue-600" />
// </div>
// <div className="space-y-1 text-sm text-slate-700">
// <p>15C, Ravi Plaza, 60 Feet Road</p>
// <p>Near New Bus Stand, Kumbakonam</p>
// <p className="font-semibold">Tamil Nadu 612001, India</p>
// </div>
// </div>
// </div>

// {/* Right - Buttons */}
// <div className="space-y-5 py-5">
// <a 
// href="mailto:security@swordnex.com"
// className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-sm py-3 px-6 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
// >
// <EnvelopeIcon className="w-4 h-8" />
// security@swordnex.com
// </a>

// <a 
// href="tel:+91 94861 06953"
// className="flex items-center justify-center gap- bg-black hover:black text-white font-semibold text-sm py-3 px-6 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
// >
// <PhoneIcon className="w-4 h-8" />
// +91 94861 06953
// </a>

 
// </div>
// </div>

// {/* Smaller Bottom Links */}
// <div className="flex flex-wrap justify-center gap-3 pt-8 mt-8 border-t border-blue-100">
// {["Privacy Policy", "Terms", "GDPR", "Trademark"].map((item, i) => (
// <a
// key={i}
// href="#"
// className="px-4 py-2 text-sm font-semibold text-blue-600 hover:text-blue-700 rounded-md transition-all duration-200"
// >
// {item}
// </a>
// ))}
// </div>
// </div>
// </section>


// </main>

// {/* Footer */}
// <footer className="bg-blue-900 text-blue-200 py-8 mt-16">
// <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
// <p className="mb-2">© 2026 SwordNex Technologies Private Limited. All rights reserved.</p>
// <p className="font-semibold">SwordNex®</p>
// </div>
// </footer>
// </div>
// );
// };

// export default Terms;
import { ShieldCheck, FileText, CheckCircle, Mail, Phone, MapPin } from "lucide-react";

const TermsOfService = () => {
 return (
 <div className="bg-white text-slate-800">
 {/* ===== Header Section ===== */}
 <header className="w-full bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white py-10 shadow-lg border-b-4 border-blue-600 mb-12">
 <div className="max-w-6xl mx-auto px-6 text-center">
 <div className="flex flex-col items-center space-y-5">
 <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-md border border-blue-500/50">
 {/* FileText icon goes here */}
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
 <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3-3m0 0 3 3m-3-3v6m-2.25-4.5H5.625m17.25 0a2.25 2.25 0 0 1-2.25 2.25H12a2.25 2.25 0 0 0-2.25 2.25v.375M21 12a2.25 2.25 0 0 0-2.25-2.25H15M9 17.25V12a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 12v3m0 0V12c0 .88.36 1.685.942 2.255A4.04 4.04 0 0 1 7.25 16.5h3.625c1.374 0 2.606-.723 3.25-1.849a4.04 4.04 0 0 1 2.255-.942A2.25 2.25 0 0 0 21 15v.375m0-4.5V12.75a4.5 4.5 0 0 0-4.5-4.5H15V6a2.25 2.25 0 0 0-2.25-2.25H9M3 15v-1.5" />
 </svg>
 </div>
 <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
 Terms of Service
 </h1>
 
 <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm font-semibold text-blue-100">
 <span className="bg-blue-600/50 px-6 py-2 rounded-full border border-blue-400/30">
 Last Updated: Jan 2, 2026
 </span>
 </div>
 </div>
 </div>
 </header>

 {/* ===== Main Content ===== */}
 <main className="max-w-6xl mx-auto px-2 space-y-2 pb-20"> {/* Increased space-y for better separation */}
 {/* Overview */}
 <section className="py-5 max-w-6xl mx-auto">
 <h2 className="text-2xl font-bold text-blue-800 mb-6">
 Complete Scope of SwordNex Services
 </h2>

 <p className="text-lg leading-relaxed text-gray-700 mb-6">
 This agreement governs all technology, digital, and SaaS services provided by 
 <strong> SwordNex Technologies Private Limited</strong>, a registered IT solutions 
 company headquartered at <strong>15C, Ravi Plaza, 60 Feet Road, Near New Bus Stand, 
 Kumbakonam, Tamil Nadu – 612001, India.</strong> 
 </p>

 <p className="text-lg leading-relaxed text-gray-700 mb-6">
 SwordNex Technologies delivers end-to-end digital transformation solutions to over 
 <strong> 500+ businesses</strong> across Tamil Nadu and PAN India, empowering small, 
 medium, and enterprise clients to scale efficiently with secure, cloud-based technology platforms.
 </p>

 <h3 className="text-xl font-semibold text-blue-700 mb-4">
 Our Core Service Divisions:
 </h3>

 <ul className="list-disc pl-8 space-y-4 text-lg leading-relaxed text-gray-700">
 <li>
 <strong>SaaS Business Applications:</strong> Enterprise-grade subscription platforms such as 
 <em> Payroll™, Billing™ and HRM™ </em>— designed for automation, compliance, 
 and data-driven business operations.
 </li>
 <li>
 <strong>Custom IT Projects:</strong> Tailored software and app development, API integration, 
 ERP customization, and enterprise digitalization based on specific client requirements.
 </li>
 <li>
 <strong>Training & Digital Enablement:</strong> Corporate training programs, workforce upskilling, 
 internship mentorship, and certification-based learning in IT, SaaS, and digital marketing domains.
 </li>
 </ul>

 <p className="mt-8 text-lg text-gray-700 leading-relaxed">
 Together, these divisions represent the full operational and commercial scope of SwordNex 
 Technologies Private Limited. All services are governed by unified <strong>Terms of Use</strong>, 
 <strong> Data Protection Policy</strong>, and <strong> Service Agreements</strong> defined in this document.
 </p>
</section>

 {/* SaaS Applications */}
 <section className="py-5">
 <h3 className="text-2xl font-bold text-blue-800 mb-8">SaaS Business Applications</h3>
 
 <ul className="list-disc pl-8 space-y-4 text-lg leading-relaxed text-gray-700 max-w-6xl mx-auto">
 <li>
 <strong>Payroll™</strong> — Complete payroll processing automation with PF/ESIC statutory compliance, 
 automated payslip generation (PDF/Email), tax deductions (Professional tax, Income tax), 
 salary advance management, attendance integration, multiple salary components, 
 Form 16 generation, bank transfer files, and full payroll audit trail.
 </li>
 
 <li>
 <strong>Billing™</strong> — GST-compliant invoicing with SAC/HSN codes, multi-currency support, 
 recurring invoice automation, payment tracking & reminders, Razorpay/UPI integration, 
 e-Invoicing & e-Way bill generation, financial reports (P&L, Balance sheet), 
 VAT/TDS calculations, customer credit limits, invoice customization & GSTR exports.
 </li>
 
 <li>
 <strong>HRM™</strong> — Complete hotel operations management including room booking automation, POS billing integration, housekeeping scheduling, F&B management (Restaurant/Bar), guest self check-in, revenue analytics, GST compliance reports, multi-property management & real-time occupancy tracking.
 </li>
 </ul>
</section>


 {/* IT Services */}
 <section className="py-5">
 <h3 className="text-2xl font-bold text-blue-800 mb-8">Professional IT Services</h3>
 
 <ul className="list-disc pl-8 space-y-4 text-lg leading-relaxed text-gray-700 max-w-6xl mx-auto">
 <li>
 <strong>Custom Responsive Websites</strong> — React.js + Tailwind CSS + Vite development with 
 Lighthouse 95+ performance scores, SEO-optimized, fully responsive design, PWA ready, 
 headless CMS integration, custom animations, accessibility compliant (WCAG 2.1), 
 API-first architecture, and 1-year free maintenance included.
 </li>
 
 <li>
 <strong>Cross-Platform Mobile Apps</strong> — Native performance iOS & Android apps using 
 React Native/Flutter, push notifications, offline-first architecture, secure API integration, 
 App Store/Play Store deployment, analytics tracking, crash reporting, and 6-month post-launch support.
 </li>
 
 <li>
 <strong>Complete Digital Marketing</strong> — SEO optimization (on-page, technical, local), 
 content strategy & copywriting, social media management (Instagram, LinkedIn, Facebook), 
 Google Ads campaigns, email marketing automation, performance analytics, 
 conversion rate optimization, and monthly ROI reporting.
 </li>
 
 <li>
 <strong>Cloud Migration & Hosting</strong> — AWS/Azure/GCP migration, Docker containerization, 
 CI/CD pipeline setup, auto-scaling infrastructure, CDN integration, database optimization, 
 24/7 monitoring & alerting, backup automation, disaster recovery planning, 
 and cost optimization consulting.
 </li>
 
 <li>
 <strong>Cybersecurity Audits & Implementation</strong> — Vulnerability assessments, 
 penetration testing, security policy creation, firewall configuration, SSL/TLS implementation, 
 data encryption (AES-256), GDPR/DPDP compliance, employee security training, 
 and continuous threat monitoring.
 </li>
 
 <li>
 <strong>IT Infrastructure Setup & Maintenance</strong> — Server configuration (Linux/Windows), 
 network setup & optimization, Active Directory deployment, email server management, 
 hardware procurement consulting, 24/7 helpdesk support, preventive maintenance, 
 performance monitoring, and annual IT audit services.
 </li>
 </ul>

</section>


 {/* Training Programs */}
 <section className="py-5 max-w-6xl mx-auto">
 <h3 className="text-2xl font-bold text-blue-800 mb-8">Certified Training Programs</h3>
 
 <ul className="list-disc pl-8 space-y-4 text-lg leading-relaxed text-gray-700 max-w-6xl mx-auto">
 <li>
 <strong>Full Stack Web Development</strong> — 6 months comprehensive MERN stack training (MongoDB, Express.js, React.js, Node.js), Git version control, deployment (Vercel/Netlify), live projects, code reviews, portfolio development, interview preparation, and certification with 80% attendance requirement.
 </li>
 
 <li>
 <strong>Digital Marketing Certification</strong> — 3 months complete training covering SEO (on-page, technical, local), Google Ads certification, social media marketing (Instagram, LinkedIn, Facebook), content marketing strategy, email automation (Mailchimp), Google Analytics 4, performance tracking, live client campaigns, and industry-recognized certification.
 </li>
 
 <li>
 <strong>UI/UX Design Mastery</strong> — 2 months intensive Figma + Adobe XD training, wireframing, prototyping, user research, usability testing, design systems, responsive design principles, interaction design, portfolio creation, client project work, and professional certification for design job roles.
 </li>
 
 <li>
 <strong>Corporate Training</strong> — Custom tailored programs for companies including React.js workshops, digital marketing for business teams, UI/UX for product managers, cybersecurity awareness, cloud computing basics, and customized technical upskilling programs with group discounts and on-site delivery options.
 </li>
 </ul>
 
 <p className="mt-8 text-lg font-semibold text-slate-700 max-w-6xl mx-auto text-center">
 Includes job assistance with <strong>500+ hiring partners</strong> across Tamil Nadu & India. 
 95% placement success rate. Certificates issued for 80%+ attendance.
 </p>
</section>


 {/* SaaS Subscription Terms */}
 <section className="py-5 max-w-6xl mx-auto">
 <h3 className="text-2xl font-bold text-blue-800 mb-8">SaaS Subscriptions – 15 Days Free Trial</h3>
 
 <ul className="list-disc pl-8 space-y-4 text-lg leading-relaxed text-gray-700 max-w-6xl mx-auto">
 <li>
 <strong>15 days free trial available</strong> — Complete access to all SwordNex SaaS applications 
 (Payroll™, Billing™, HRM™, Analytics™) for 15 days without any payment requirement. No credit card 
 needed for trial activation. Full feature access during trial period.
 </li>
 
 <li>
 <strong>Automatic conversion to paid subscription</strong> — Trial automatically converts to 
 Basic plan (₹999/month) at end of 15 days unless cancelled. Clear notifications sent 3 days before 
 trial ends. No hidden charges during trial period.
 </li>
 
 <li>
 <strong>Paid subscription terms apply post-trial</strong> — After trial conversion, standard prepaid 
 subscription terms apply: 100% non-refundable payments, immediate cutoff on expiry, 5-day data deletion policy.
 </li>
 
 <li>
 <strong>Complete data access during trial</strong> — Full data import/export functionality available 
 during 15-day trial. All customer data preserved during trial period. No data deletion during active trial.
 </li>
 
 <li>
 <strong>Easy trial cancellation</strong> — Cancel anytime before 15-day trial ends via account dashboard 
 or support@swordnex.com. No penalties for early cancellation. All data preserved until trial end date.
 </li>
 </ul>

 <p className="mt-8 text-lg font-semibold text-slate-700 max-w-6xl mx-auto text-center">
 <strong>Start your 15-day free trial today</strong> — No payment details required. Cancel anytime. 
 Convert to paid plan to continue using SwordNex SaaS applications beyond trial period.
 </p>
</section>


 {/* IT Project Terms */}
 <section className="py-5 max-w-6xl mx-auto">
 <h3 className="text-2xl font-bold text-blue-800 mb-8">IT Projects – Milestone-Based Delivery</h3>
 
 <ul className="list-disc pl-8 space-y-4 text-lg leading-relaxed text-gray-700 max-w-6xl mx-auto">
 <li>
 <strong>50% advance + 50% on completion payment structure</strong> — All custom IT projects require 
 50% advance payment before work commencement via Razorpay/UPI/NEFT. Remaining 50% due upon 
 milestone delivery and client approval. Clear milestone definitions provided in project agreement. 
 No work begins without advance payment confirmation.
 </li>
 
 <li>
 <strong>Hourly rate: ₹999/hour (prepaid blocks)</strong> — For smaller projects or consultations, 
 hourly billing at ₹999/hour minimum. Prepaid time blocks available (10/20/40 hours). Time tracking 
 via Toggl with detailed activity logs and screenshots. Unused prepaid hours valid for 90 days.
 </li>
 
 <li>
 <strong>1-year warranty on all custom development work</strong> — Comprehensive 12-month warranty 
 covering bugs, performance issues, and functionality failures. Free fixes during warranty period. 
 Excludes client-induced changes or third-party service failures. Source code updates included.
 </li>
 
 <li>
 <strong>No refunds after milestone approval</strong> — Once client approves delivered milestone 
 (written confirmation via email/project management tool), payment becomes non-refundable. 7-day 
 revision window provided per milestone. Client approval = acceptance of work quality and functionality.
 </li>
 
 <li>
 <strong>Source code transferred only after final payment clearance</strong> — Complete source code, 
 documentation, and deployment scripts delivered only after 100% final payment received and cleared. 
 Includes Git repository access, environment configurations, API documentation, and admin credentials. 
 Pre-existing SwordNex frameworks remain proprietary.
 </li>
 </ul>

 <p className="mt-8 text-lg font-semibold text-slate-700 max-w-6xl mx-auto text-center">
 <strong>Typical project timeline:</strong> Discovery (1 week) → Design (2 weeks) → Development (4-8 weeks) → 
 Testing (1 week) → Deployment (1 week) → 1-year warranty period.
 </p>
</section>


 {/* Training Terms */}
 <section className="py-5 max-w-6xl mx-auto">
 <h3 className="text-2xl font-bold text-blue-800 mb-8">Training Terms</h3>
 
 <ul className="list-disc pl-8 space-y-4 text-lg leading-relaxed text-gray-700 max-w-6xl mx-auto">
 <li>
 <strong>Full payment required before course commencement</strong> — Complete course fees must be paid in full via Razorpay/UPI/NEFT before first class begins. 
 No installment payments accepted. Corporate/group bookings require 100% advance for all participants. 
 Payment confirmation mandatory for seat reservation and course materials access.
 </li>
 
 <li>
 <strong>No refunds after first class attendance</strong> — All payments become non-refundable once student attends 
 first class session (live or recorded). 100% refund available only before course start date with 48-hour notice. 
 No partial refunds, prorated credits, or transfers to future batches after course commencement.
 </li>
 
 <li>
 <strong>Certificate issued only for 80%+ attendance</strong> — Industry-recognized completion certificates awarded 
 only to students maintaining minimum 80% attendance across all sessions. Attendance tracked via biometric/Zoho Presence. 
 Certificates include course name, duration, skills acquired, and SwordNex Technologies verification. Below 80% attendance = 
 participation certificate only (no skills endorsement).
 </li>
 
 <li>
 <strong>Course materials remain SwordNex intellectual property</strong> — All training videos, slide decks, code samples, project files, templates, frameworks, and documentation provided for both online and offline classes, remain the exclusive intellectual property of SwordNex Technologies Private Limited. Offline classes receive complete live notes, while online classes provide only recorded video sections. Enrolled students get lifetime access with no redistribution, commercial use, or sharing with third parties permitted, and materials are periodically updated during the access period.
 </li>
 </ul>

 <p className="mt-8 text-lg font-semibold text-slate-700 max-w-6xl mx-auto text-center">
 <strong>Job assistance included:</strong> 50+ hiring partners across Tamil Nadu & India, 95% placement success rate, 
 mock interviews, resume building, and direct recruiter referrals for certified completers.
 </p>
</section>


 {/* BOX - Comprehensive Termination & Data Policies (Table) */}
 <section className="p-6 bg-white rounded-xl shadow border border-blue-100 mb-10">
 <h2 className="text-2xl font-bold text-blue-800 mb-5 flex items-center gap-2">
 <LockClosedIcon className="w-6 h-6 text-blue-600" />
 Comprehensive Termination & Data Policies
 </h2>

 <div className="overflow-x-auto">
 <table className="min-w-full border border-blue-200 rounded-lg overflow-hidden text-sm">
 <thead className="bg-blue-600 text-white">
 <tr>
 <th className="px-4 py-3 text-left font-semibold">Service Category</th>
 <th className="px-4 py-3 text-left font-semibold">Termination Trigger</th>
 <th className="px-4 py-3 text-left font-semibold">Post-Termination Access</th>
 <th className="px-4 py-3 text-left font-semibold">Data Deletion Policy</th>
 <th className="px-4 py-3 text-left font-semibold">Recovery Possible?</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-blue-100 text-slate-700">
 {/* Existing Rows */}
 

 

 {/* New Rows for Requested Services */}
 <tr className=" /50 transition">
 <td className="px-4 py-3 font-medium text-blue-800">SwordNex Billing</td>
 <td className="px-4 py-3">Subscription expiry</td>
 <td className="px-4 py-3">None - Immediate cutoff</td>
 <td className="px-4 py-3">15 days automatic</td>
 <td className="px-4 py-3 text-red-600 font-semibold">No</td>
 </tr>

 <tr className=" /50 transition">
 <td className="px-4 py-3 font-medium text-blue-800">SwordNex Payroll</td>
 <td className="px-4 py-3">Subscription expiry</td>
 <td className="px-4 py-3">None - Immediate cutoff</td>
 <td className="px-4 py-3">15 days automatic</td>
 <td className="px-4 py-3 text-red-600 font-semibold">No</td>
 </tr>

 <tr className=" /50 transition">
 <td className="px-4 py-3 font-medium text-blue-800">SwordNex HMS (HRM)</td>
 <td className="px-4 py-3">Subscription expiry</td>
 <td className="px-4 py-3">None - Immediate cutoff</td>
 <td className="px-4 py-3">15 days automatic</td>
 <td className="px-4 py-3 text-red-600 font-semibold">No</td>
 </tr>
<tr className=" /50 transition">
 <td className="px-4 py-3 font-medium text-blue-800">Digital Marketing</td>
 <td className="px-4 py-3">Contract term ends</td>
 <td className="px-4 py-3">Campaign reports delivered</td>
 <td className="px-4 py-3">N/A</td>
 <td className="px-4 py-3">N/A</td>
 </tr>
 <tr className=" /50 transition">
 <td className="px-4 py-3 font-medium text-blue-800">Business Management Applications</td>
 <td className="px-4 py-3">Contract term ends</td>
 <td className="px-4 py-3">Access to reports and dashboards</td>
 <td className="px-4 py-3">N/A</td>
 <td className="px-4 py-3">N/A</td>
 </tr>

 <tr className=" /50 transition">
 <td className="px-4 py-3 font-medium text-blue-800">Custom Web Applications</td>
 <td className="px-4 py-3">Project completion</td>
 <td className="px-4 py-3">Source code handover after final payment</td>
 <td className="px-4 py-3">N/A</td>
 <td className="px-4 py-3">N/A</td>
 </tr>

 <tr className=" /50 transition">
 <td className="px-4 py-3 font-medium text-blue-800">Custom Software Solutions</td>
 <td className="px-4 py-3">Project completion</td>
 <td className="px-4 py-3">Source code handover after final payment</td>
 <td className="px-4 py-3">N/A</td>
 <td className="px-4 py-3">N/A</td>
 </tr>

 <tr className=" /50 transition">
 <td className="px-4 py-3 font-medium text-blue-800">Brand Identity & Design</td>
 <td className="px-4 py-3">Contract term ends</td>
 <td className="px-4 py-3">Deliverables (logos, mockups, etc.)</td>
 <td className="px-4 py-3">N/A</td>
 <td className="px-4 py-3">N/A</td>
 </tr>

 <tr className=" /50 transition">
 <td className="px-4 py-3 font-medium text-blue-800">Social Media & Content</td>
 <td className="px-4 py-3">Contract term ends</td>
 <td className="px-4 py-3">Content archives and performance reports</td>
 <td className="px-4 py-3">N/A</td>
 <td className="px-4 py-3">N/A</td>
 </tr>

 <tr className=" /50 transition">
 <td className="px-4 py-3 font-medium text-blue-800">Performance Marketing</td>
 <td className="px-4 py-3">Contract term ends</td>
 <td className="px-4 py-3">Campaign analytics and ad data</td>
 <td className="px-4 py-3">N/A</td>
 <td className="px-4 py-3">N/A</td>
 </tr>

 <tr className=" /50 transition">
 <td className="px-4 py-3 font-medium text-blue-800">Video Production & Editing</td>
 <td className="px-4 py-3">Project completion</td>
 <td className="px-4 py-3">Final video files and source files</td>
 <td className="px-4 py-3">N/A</td>
 <td className="px-4 py-3">N/A</td>
 </tr>

 <tr className=" /50 transition">
 <td className="px-4 py-3 font-medium text-blue-800">Talent Acquisition</td>
 <td className="px-4 py-3">Contract term ends</td>
 <td className="px-4 py-3">Recruitment reports and candidate data</td>
 <td className="px-4 py-3">N/A</td>
 <td className="px-4 py-3">N/A</td>
 </tr>

 <tr className=" /50 transition">
 <td className="px-4 py-3 font-medium text-blue-800">HR Strategy & Transformation</td>
 <td className="px-4 py-3">Contract term ends</td>
 <td className="px-4 py-3">Strategic reports and implementation data</td>
 <td className="px-4 py-3">N/A</td>
 <td className="px-4 py-3">N/A</td>
 </tr>

 <tr className=" /50 transition">
 <td className="px-4 py-3 font-medium text-blue-800">Performance & Culture</td>
 <td className="px-4 py-3">Contract term ends</td>
 <td className="px-4 py-3">Performance metrics and cultural audit data</td>
 <td className="px-4 py-3">N/A</td>
 <td className="px-4 py-3">N/A</td>
 </tr>

 <tr className=" /50 transition">
 <td className="px-4 py-3 font-medium text-blue-800">Learning & Leadership Development</td>
 <td className="px-4 py-3">Course completion</td>
 <td className="px-4 py-3">Certificates issued</td>
 <td className="px-4 py-3">Course materials retained by SwordNex</td>
 <td className="px-4 py-3">N/A</td>
 </tr>

 <tr className=" /50 transition">
 <td className="px-4 py-3 font-medium text-blue-800">Cloud Infrastructure Services</td>
 <td className="px-4 py-3">Contract term ends</td>
 <td className="px-4 py-3">Access to infrastructure during active period</td>
 <td className="px-4 py-3">N/A</td>
 <td className="px-4 py-3">N/A</td>
 </tr>

 <tr className=" /50 transition">
 <td className="px-4 py-3 font-medium text-blue-800">Enterprise Networking</td>
 <td className="px-4 py-3">Contract term ends</td>
 <td className="px-4 py-3">Network configuration and documentation</td>
 <td className="px-4 py-3">N/A</td>
 <td className="px-4 py-3">N/A</td>
 </tr>

 <tr className=" /50 transition">
 <td className="px-4 py-3 font-medium text-blue-800">Managed IT Infrastructure</td>
 <td className="px-4 py-3">Contract term ends</td>
 <td className="px-4 py-3">Access to managed services during active period</td>
 <td className="px-4 py-3">N/A</td>
 <td className="px-4 py-3">N/A</td>
 </tr>

 <tr className=" /50 transition">
 <td className="px-4 py-3 font-medium text-blue-800">Corporate Training & Workshops</td>
 <td className="px-4 py-3">Course completion</td>
 <td className="px-4 py-3">Certificates issued</td>
 <td className="px-4 py-3">Course materials retained by SwordNex</td>
 <td className="px-4 py-3">N/A</td>
 </tr>
 </tbody>
 </table>
 </div>
</section>

 {/* Payment Terms */}
 <section className="py-5 max-w-6xl mx-auto">
 <h3 className="text-2xl font-bold text-blue-800 mb-8">Universal Payment Terms</h3>
 
 <ul className="list-disc pl-8 space-y-4 text-lg leading-relaxed text-gray-700 max-w-6xl mx-auto">
 <li>
 <strong>All SaaS & Training fully prepaid before access</strong> — SwordNex SaaS applications (Payroll™, Billing™, 
 HRM™, Analytics™) and all training programs require 100% payment upfront via Razorpay/UPI/NEFT before any access granted. 
 No installment options, no deferred payments. Subscription activation and course enrollment only after payment confirmation.
 </li>
 
 <li>
 <strong>IT Projects: 50% advance + 50% on milestone delivery</strong> — Custom development projects structured as 
 50% advance payment before work commencement + 50% upon client approval of delivered milestone. Clear milestone definitions 
 provided in project contract. No work proceeds without advance payment. Final payment triggers source code transfer.
 </li>
 
 <li>
 <strong>GST 18% applicable on all services</strong> — Goods & Services Tax at 18% added to all SwordNex services 
 (SaaS subscriptions, IT projects, training programs) as per Indian GST regulations. Tax invoice with GSTIN provided 
 for all payments. International clients responsible for additional taxes/import duties in their jurisdiction.
 </li>
 
 <li>
 <strong>Late payments trigger immediate service suspension</strong> — SaaS subscriptions suspended instantly upon 
 expiry, IT projects paused, training access revoked without prior notice. No grace periods provided. Service resumption 
 requires full outstanding payment clearance + late fees (2% per week). Reactivation not guaranteed.
 </li>
 
 <li>
 <strong>No refunds or proration under any circumstances</strong> — All payments strictly non-refundable after service 
 commencement. No partial month credits for SaaS, no prorated refunds for early project termination, no training fee 
 reductions regardless of attendance. 48-hour full refund only for pre-commencement cancellations.
 </li>
 
 <li>
 <strong>Secure payment methods accepted</strong> — Razorpay gateway (cards, net banking, wallets), UPI (PhonePe, 
 Google Pay, Paytm), NEFT/RTGS bank transfers, international credit/debit cards. All transactions PCI-DSS compliant. 
 International customers bear bank conversion fees and charges.
 </li>
 </ul>

 <p className="mt-8 text-lg font-semibold text-slate-700 max-w-6xl mx-auto text-center">
 <strong>Payment confirmation within 24 hours.</strong> Late payments incur 2% weekly penalty. All pricing excludes GST.
 </p>
</section>


 {/* The shorter Intellectual Property Ownership section was removed as the detailed one follows */}

 {/* Detailed Intellectual Property Ownership */}
 <section className="py-10">
 <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-2">
 {/* Shield icon */}
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
 <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.427-1.659 3.114a9.755 9.755 0 0 1-3.827 1.545 9.75 9.75 0 0 1-6.006-.247A9.75 9.75 0 0 1 3 12c0-1.268.63-2.427 1.659-3.114a9.755 9.755 0 0 1 3.827-1.545 9.75 9.75 0 0 1 6.006-.247A9.75 9.75 0 0 1 21 12Z" />
 </svg>
 Intellectual Property Ownership
 </h2>

 <div className="grid md:grid-cols-2 gap-8">
 
 {/* SwordNex Ownership */}
 <div>
 <h3 className="text-lg font-semibold text-blue-700 mb-3">
 SwordNex Technologies Owns:
 </h3>
 <ul className="space-y-3 text-slate-700 text-[15px] leading-relaxed">
 
 <li className="flex flex-col">
 <div className="flex items-start gap-2">
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-blue-600 mt-1">
 <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
 </svg>
 <span className="font-medium">All SaaS software code and infrastructure</span>
 </div>
 <p className="pl-6 text-sm text-slate-600">
 All proprietary source code, architecture, hosting setups, databases, APIs, and software environments of SwordNex products remain the exclusive intellectual property of SwordNex Technologies Private Limited. Clients are provided licensed usage access, not ownership.
 </p>
 </li>

 <li className="flex flex-col">
 <div className="flex items-start gap-2">
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-blue-600 mt-1">
 <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
 </svg>
 <span className="font-medium">SwordNex® trademarks and branding</span>
 </div>
 <p className="pl-6 text-sm text-slate-600">
 All registered and unregistered marks, including the name <strong>SwordNex®</strong>, logos, product icons, and brand elements, are protected under Indian IP law. Unauthorized use or imitation of SwordNex trademarks is strictly prohibited.
 </p>
 </li>

 <li className="flex flex-col">
 <div className="flex items-start gap-2">
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-blue-600 mt-1">
 <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
 </svg>
 <span className="font-medium">Pre-existing frameworks, libraries, and templates</span>
 </div>
 <p className="pl-6 text-sm text-slate-600">
 SwordNex uses proprietary internal frameworks and reusable code components built for efficiency and scalability. These remain under company ownership even when used in client projects.
 </p>
 </li>

 <li className="flex flex-col">
 <div className="flex items-start gap-2">
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-blue-600 mt-1">
 <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
 </svg>
 <span className="font-medium">All training course materials and videos</span>
 </div>
 <p className="pl-6 text-sm text-slate-600">
 All course modules, slides, video recordings, and digital assets used in SwordNex training programs are copyrighted materials and cannot be redistributed or resold by learners or third parties.
 </p>
 </li>

 <li className="flex flex-col">
 <div className="flex items-start gap-2">
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-blue-600 mt-1">
 <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
 </svg>
 <span className="font-medium">billing.swordnex.com® subdomain</span>
 </div>
 <p className="pl-6 text-sm text-slate-600">
 The billing and account management portal, along with all its integrations, interfaces, and internal databases, remain the sole property of SwordNex Technologies. Clients are granted user-level access only.
 </p>
 </li>
 </ul>
 </div>

 {/* Customer Ownership */}
 <div>
 <h3 className="text-lg font-semibold text-blue-700 mb-3">
 Customer Owns:
 </h3>
 <ul className="space-y-3 text-slate-700 text-[15px] leading-relaxed">

 <li className="flex flex-col">
 <div className="flex items-start gap-2">
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-blue-600 mt-1">
 <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
 </svg>
 <span className="font-medium">Business data uploaded to SaaS platforms</span>
 </div>
 <p className="pl-6 text-sm text-slate-600">
 All client business data, financial records, employee details, and reports uploaded through SwordNex SaaS products remain the sole property of the client. SwordNex only processes such data for operational purposes.
 </p>
 </li>

 <li className="flex flex-col">
 <div className="flex items-start gap-2">
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-blue-600 mt-1">
 <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
 </svg>
 <span className="font-medium">Custom IT project deliverables (after final payment)</span>
 </div>
 <p className="pl-6 text-sm text-slate-600">
 All bespoke software, web, or mobile applications developed under specific client contracts become the property of the client only after full and final payment of the agreed project amount.
 </p>
 </li>

 <li className="flex flex-col">
 <div className="flex items-start gap-2">
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-blue-600 mt-1">
 <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
 </svg>
 <span className="font-medium">Training completion certificates</span>
 </div>
 <p className="pl-6 text-sm text-slate-600">
 Certificates issued by SwordNex Training Academy upon course completion are owned by the participant. However, SwordNex retains ownership of the learning content and delivery platform.
 </p>
 </li>

 <li className="flex flex-col">
 <div className="flex items-start gap-2">
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-blue-600 mt-1">
 <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
 </svg>
 <span className="font-medium">Digital marketing campaign performance data</span>
 </div>
 <p className="pl-6 text-sm text-slate-600">
 All performance metrics, insights, analytics reports, and media results generated from marketing campaigns executed for clients are owned by the client. SwordNex may retain anonymized data for internal analytics.
 </p>
 </li>
 </ul>
 </div>
 </div>
</section>


 {/* Legal Info */}
 <section className="py-5 max-w-6xl mx-auto">
 <h3 className="text-2xl font-bold text-blue-800 mb-6">
 Legal Jurisdiction & Contact Information
 </h3>

 <p className="text-lg leading-relaxed text-gray-700 mb-8">
 All operations, agreements, and disputes related to SwordNex Technologies are governed under the 
 <strong> Laws of India</strong>, including the <strong>Information Technology Act (2000)</strong> 
 and the <strong>Digital Personal Data Protection Act (2023)</strong>. 
 Any disputes or legal proceedings shall be subject to the exclusive jurisdiction of the 
 <strong> District Courts of Thanjavur, Tamil Nadu</strong>. 
 By engaging with SwordNex services, clients agree to these governing laws and venue conditions.
 </p>

 <div className="grid md:grid-cols-2 gap-8 text-gray-700 text-lg leading-relaxed">
 
 {/* Office Address */}
 <div>
 <h4 className="text-blue-700 font-semibold mb-3 flex items-center gap-2">
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-600">
 <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
 <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
 </svg>
 Registered Office
 </h4>
 <p className="pl-7">
 15C, Ravi Plaza, 60 Feet Road, 
 <br /> Kumbakonam, Tamil Nadu – 612001, India
 </p>
 <p className="pl-7 mt-2">🕘 Office Hours: 9:00 AM – 6:00 PM IST (Mon–Sat)</p>
 </div>

 {/* Contact Info */}
 <div>
 <h4 className="text-blue-700 font-semibold mb-3 flex items-center gap-2">
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-600">
 <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.394a4.5 4.5 0 0 0-.124-1.03l-2.059-5.354a1.125 1.125 0 0 0-.622-.594L14.2 6.98a1.125 1.125 0 0 0-1.423.568l-.738 1.477A4.5 4.5 0 0 1 7.252 21.75H16.5a1.125 1.125 0 0 1-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125v-1.394c0-.38.077-.75.22-.924l2.059-5.354c.15-.389.37-.745.622-.997L17.8 7.52a1.125 1.125 0 0 0 1.423-.568l.738-1.477A4.5 4.5 0 0 1 21.75 2.25h-2.25a1.125 1.125 0 0 0-1.125 1.125v1.394c0 .38-.077.75-.22.924L16.5 12.72c-.15.389-.37.745-.622.997l-3.324 3.324A4.5 4.5 0 0 1 2.25 6.75" />
 </svg>
 Contact Channels
 </h4>

 <p className="pl-7 mb-2">
 📞 <strong>+91 94861 06953</strong> 
 </p>
 <p className="pl-7 mb-1">
 📧 <a href="mailto:legal@swordnex.com" className="text-blue-700 hover:underline">legal@swordnex.com</a>
 </p>
 <p className="pl-7">
 💬 <a href="mailto:hello@swordnex.com" className="text-blue-700 hover:underline">hello@swordnex.com</a>
 </p>
 </div>
 </div>

 <p className="mt-10 text-center text-gray-600 text-base">
 <strong>Note:</strong> SwordNex operates in compliance with all applicable Indian IT & Data Protection laws. 
 For any legal notices, correspondence must be sent in writing to the above registered address.
 </p>
</section>

 </main>

 {/* ===== Footer ===== */}
 {/* <footer className="bg-blue-900 text-blue-100 py-8 mt-10 border-t border-blue-800">
 <div className="max-w-6xl mx-auto px-6 text-center space-y-2">
 <p className="font-semibold">SwordNex Technologies Private Limited</p>
 <p className="text-sm">Complete IT Solutions — SaaS • Custom Development • Marketing • Training</p>
 <p className="text-xs opacity-80">© 2026 SwordNex Technologies. All Rights Reserved.</p>
 </div>
 </footer> */}
 </div>
 );
};

export default TermsOfService;
