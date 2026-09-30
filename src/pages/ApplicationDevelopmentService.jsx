import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import ConsultationModal from '../components/ConsultationModal';
import ServiceEnquiryModal from '../components/ServiceEnquiryModal';
import { Helmet } from "react-helmet";

<Helmet>
 <title>Web & Mobile Application Development Services | SwordNex</title>
 <meta
 name="description"
 content="SwordNex provides custom web and mobile application development services. We build scalable SaaS platforms, business applications, and enterprise software solutions."
 />
 <meta
 name="keywords"
 content="web development company, mobile app development, SaaS development, custom software development, application development services India"
 />
</Helmet>
// --------------------------
// 🎬 Animation Variants
// --------------------------
const fadeInUp = {
 hidden: { opacity: 0, y: 30 },
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
 staggerChildren: 0.15,
 delayChildren: 0.2
 }
 }
};

const scaleIn = {
 hidden: { opacity: 0, scale: 0.95 },
 visible: {
 opacity: 1,
 scale: 1,
 transition: { duration: 0.5, ease: "easeOut" }
 }
};

// --------------------------
// 📊 Counter Animation Hook for Stats
// --------------------------
const useCounter = (target, duration = 2000) => {
 const [count, setCount] = useState(0);

 useEffect(() => {
 let start = 0;
 const increment = target / (duration / 16);

 const timer = setInterval(() => {
 start += increment;
 if (start >= target) {
 setCount(target);
 clearInterval(timer);
 } else {
 setCount(Math.floor(start));
 }
 }, 16);

 return () => clearInterval(timer);
 }, [target, duration]);

 return count;
};

// --------------------------
// 🧩 Reusable Components
// --------------------------
const SectionTitle = ({ eyebrow, title, highlight, subtitle }) =>
(
 <motion.div
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true }}
 variants={fadeInUp}
 className="mx-auto max-w-3xl text-center"
 >
 {eyebrow && (
 <p className="text-xs md:text-sm uppercase tracking-[0.18em] text-blue-600 font-semibold">
 {eyebrow}
 </p>
 )}

 <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-slate-900">
 {title}{" "}
 {highlight && (
 <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
 {highlight}
 </span>
 )}
 </h2>

 {subtitle && (
 <p className="mt-4 text-slate-600 leading-relaxed">{subtitle}</p>
 )}
 </motion.div>
);

const Card = ({ title, desc, icon }) => (
 <motion.div
 variants={scaleIn}
 whileHover={{ y: -5, transition: { duration: 0.3 } }}
 className="group relative overflow-hidden rounded-3xl border-2 border-slate-200 bg-white p-8 transition-all duration-300 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/10"
 >
 <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br from-blue-50 to-cyan-50/50 pointer-events-none" />
 <div className="relative">
 <div className="mb-5 flex items-center gap-3">
 {icon && (
 <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 shadow-lg shadow-blue-500/20">
 {React.cloneElement(icon, { className: "h-5 w-5 text-white" })}
 </span>
 )}
 <h3 className="text-xl font-bold text-slate-900">{title}</h3>
 </div>
 <p className="text-slate-600 leading-relaxed">{desc}</p>
 </div>
 </motion.div>
);

const Step = ({ index, title, desc }) => (
 <motion.div
 variants={scaleIn}
 whileHover={{ y: -3, transition: { duration: 0.3 } }}
 className="relative rounded-3xl border-2 border-slate-200 bg-white p-8 transition-all duration-300 hover:border-blue-500 hover:shadow-lg"
 >
 <div className="absolute -top-4 -left-4 h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 shadow-lg shadow-blue-500/25 flex items-center justify-center font-extrabold text-white">
 {index}
 </div>
 <h4 className="text-lg font-bold mb-3 text-slate-900">{title}</h4>
 <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
 </motion.div>
);

// --------------------------
// 🧑💻 Main Component
// --------------------------
export default function ApplicationDevelopment() {
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

 // Subtle parallax for hero background patterns
 const { scrollYProgress } = useScroll();
 const patternY = useTransform(scrollYProgress, [0, 0.1], [0, 40]);

 // Counter values for stats section
 const clientCount = useCounter(50);
 const appCount = useCounter(100);

 // --------------------------
 // 📋 Static Data
 // --------------------------
 const buildItems = [
 {
 title: "Business Management Software Solutions",
 desc: (
 <ul className="list-disc list-inside text-slate-600 space-y-2">
 <li>HR Management System (HRMS software)</li>
 <li>Payroll Management Software with compliance</li>
 <li>GST Billing & Invoicing Software</li>
 <li>Inventory Management System for businesses</li>
 <li>Customer Relationship Management (CRM)</li>
 <li>Business analytics & reporting dashboards</li>
 </ul>
 ),
 icon: (
 <svg className="w-6 h-10 text-blue-600" viewBox="0 0 24 24" fill="none">
 <path d="M4 7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7Z" stroke="currentColor" strokeWidth="1.8" />
 <path d="M8 9h8M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
 </svg>
 ),
 },
 {
 title: "Custom Web Application Development",
 desc: (
 <ul className="list-disc list-inside text-slate-600 space-y-2">
 <li>Responsive web application development</li>
 <li>Secure admin dashboards & control panels</li>
 <li>User authentication & role-based access</li>
 <li>REST API & third-party integrations</li>
 <li>High-performance frontend & backend systems</li>
 <li>SEO-friendly and fast-loading web apps</li>
 </ul>
 ),
 icon: (
 <svg className="w-6 h-10 text-blue-600" viewBox="0 0 24 24" fill="none">
 <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z" stroke="currentColor" strokeWidth="1.8" />
 <path d="M4 9h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
 <path d="M7 7h.01M10 7h.01M13 7h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
 </svg>
 ),
 },
 {
 title: "Custom Software & SaaS Development",
 desc: (
 <ul className="list-disc list-inside text-slate-600 space-y-2">
 <li>End-to-end custom software development services</li>
 <li>SaaS application development for startups</li>
 <li>Business workflow automation systems</li>
 <li>Enterprise software integration solutions</li>
 <li>Cloud-based scalable architecture</li>
 <li>Secure, high-performance application deployment</li>
 </ul>
 ),
 icon: (
 <svg className="w-6 h-10 text-blue-600" viewBox="0 0 24 24" fill="none">
 <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
 <path d="M12 7v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
 <path d="M8.5 12h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
 </svg>
 ),
 },
 ];


 const steps = [
 [
 "Requirement Analysis",
 <ul className="list-disc list-inside text-slate-600 space-y-1">
 <li>Business goals</li>
 <li>Software requirements</li>
 <li>SaaS planning</li>
 </ul>
 ],
 [
 "UI / UX Design",
 <ul className="list-disc list-inside text-slate-600 space-y-1">
 <li>User-friendly interfaces</li>
 <li>Responsive design</li>
 <li>User experience</li>
 </ul>
 ],
 [
 "Development",
 <ul className="list-disc list-inside text-slate-600 space-y-1">
 <li>Secure coding</li>
 <li>Scalable architecture</li>
 <li>Modern technologies</li>
 </ul>
 ],
 [
 "Testing & Launch",
 <ul className="list-disc list-inside text-slate-600 space-y-1">
 <li>Quality assurance</li>
 <li>Performance testing</li>
 <li>Smooth deployment</li>
 </ul>
 ],
 ];



 const whyUs = [
 [
 "Business-Focused Software Development",
 <ul className="list-disc list-inside text-slate-600 space-y-1">
 <li>Custom software development tailored for business needs</li>
 <li>Improve operational efficiency with automation solutions</li>
 <li>Scalable SaaS applications for startups and enterprises</li>
 </ul>
 ],
 [
 "Scalable Web & Mobile App Architecture",
 <ul className="list-disc list-inside text-slate-600 space-y-1">
 <li>High-performance web application development</li>
 <li>Mobile app development for Android & iOS platforms</li>
 <li>Cloud-based architecture for future business growth</li>
 </ul>
 ],
 [
 "Reliable Support & Maintenance Services",
 <ul className="list-disc list-inside text-slate-600 space-y-1">
 <li>24/7 technical support and monitoring</li>
 <li>Regular updates, security patches, and optimization</li>
 <li>Long-term software maintenance and scalability support</li>
 </ul>
 ],
 ];


 return (
 <main className="relative bg-white">
 {/* 🎨 HERO - Blue Gradient Background */}
 <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-cyan-700 px-6 py-12">
 {/* Subtle parallax pattern overlay */}
 <motion.div
 style={{ y: patternY }}
 className="absolute inset-0 opacity-10"
 >
 <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.4),transparent_50%)]" />
 <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.3),transparent_60%)]" />
 </motion.div>

 <div className="relative mx-auto max-w-6xl">
 <motion.div
 initial="hidden"
 animate="visible"
 variants={staggerContainer}
 className="mx-auto max-w-3xl text-center"
 >
 {/* SEO Tagline */}
 <motion.p
 variants={fadeInUp}
 className="text-xs md:text-sm uppercase tracking-[0.18em] text-white/90 font-semibold"
 >
 Web & Mobile Application Development Company
 </motion.p>

 {/* SEO Optimized H1 */}
 <motion.h1
 variants={fadeInUp}
 className="mt-2 text-4xl md:text-6xl font-extrabold leading-tight text-white"
 >
 Web & Mobile{" "}
 <span className="text-cyan-200">
 Application Development
 </span>
 </motion.h1>

 {/* SEO Optimized Description */}
 <motion.p
 variants={fadeInUp}
 className="mt-4 text-lg text-white/90 leading-relaxed"
 >
 <br className="hidden sm:block" />
 Build powerful <strong>web applications</strong>, scalable
 <strong> mobile apps</strong>, and secure
 <strong> SaaS platforms</strong> with SwordNex. Our
 <strong> custom software development services</strong> help
 businesses automate operations, improve efficiency, and grow
 faster with modern technology.
 </motion.p>

 {/* CTA */}
 <motion.div
 variants={fadeInUp}
 className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
 >
 <button
 onClick={() => setIsModalOpen(true)}
 className="inline-flex items-center justify-center rounded-xl bg-white text-blue-700 px-8 py-3 font-bold shadow-lg transition-all duration-300 hover:scale-[1.02]"
 >
 Request a Free Consultation
 </button>

 <a
 href="#what-we-build"
 className="inline-flex items-center justify-center rounded-xl border-2 border-white bg-transparent text-white px-8 py-4 font-bold transition-all duration-300 "
 >
 Explore Our Solutions
 </a>
 </motion.div>

 {/* Feature highlights */}
 <motion.div
 variants={fadeInUp}
 className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left"
 >
 {[
 ["Secure", "Enterprise security"],
 ["Scalable", "Growth ready apps"],
 ["Modern UI", "Clean user experience"],
 ["Support", "Post-launch maintenance"],
 ].map(([k, v]) => (
 <div
 key={k}
 className="rounded-2xl border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-3 transition-all duration-300 "
 >
 <p className="text-sm font-semibold text-white">{k}</p>
 <p className="text-xs text-white/80">{v}</p>
 </div>
 ))}
 </motion.div>
 </motion.div>
 </div>
 </section>

 {/* 🛠️ WHAT WE BUILD - White Background */}
 <section id="what-we-build" className="bg-white mx-auto max-w-6xl px-6 py-20">
 <SectionTitle
 eyebrow="Our Technology Deliverables"
 highlight="Enterprise Applications"
 title="We Design & Develop"
 subtitle="We create custom business applications, SaaS platforms, and web systems that align with your business processes and growth goals."
 />

 <motion.div
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, margin: "-100px" }}
 variants={staggerContainer}
 className="mt-12 grid md:grid-cols-3 gap-8"
 >
 {buildItems.map((item) => (
 <Card
 key={item.title}
 title={item.title}
 desc={item.desc}
 icon={item.icon}
 />
 ))}
 </motion.div>
 </section>

 {/* 📈 HOW WE BUILD - Light Blue Background */}
 <section className="relative bg-gradient-to-b from-blue-50 to-white py-20">
 <div className="relative mx-auto max-w-6xl px-6">
 <SectionTitle
 eyebrow="Process"
 title="How We Develop"
 highlight="Applications"
 subtitle="Clear steps, consistent delivery — so you always know what's happening and what you'll get."
 />

 <motion.div
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, margin: "-100px" }}
 variants={staggerContainer}
 className="mt-12 grid md:grid-cols-4 gap-8"
 >
 {steps.map(([title, desc], i) => (
 <Step
 key={title}
 index={i + 1}
 title={title}
 desc={desc}
 />
 ))}
 </motion.div>
 </div>
 </section>

 {/* 🎯 WHY US - White Background */}
 <section className="bg-white mx-auto max-w-6xl px-6 py-20">
 <SectionTitle
 eyebrow="Why SwordNex"
 title="Why Choose"
 highlight="SwordNex"
 subtitle="We focus on business outcomes — not just code — and we stay with you after launch."
 />

 <motion.div
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, margin: "-100px" }}
 variants={staggerContainer}
 className="mt-12 grid md:grid-cols-3 gap-8"
 >
 {whyUs.map(([title, desc]) => (
 <Card key={title} title={title} desc={desc} />
 ))}
 </motion.div>
 </section>

 {/* 📊 STATS SECTION */}
 <section className="py-6 lg:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
 <motion.div
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true }}
 variants={fadeInUp}
 className="text-center mb-16"
 >
 {/* SEO H2 */}
 <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4 leading-tight">
 Why Choose{" "}
 <span className="text-primary">SwordNex Technologies</span>{" "}
 for Web & Mobile App Development Services
 </h2>

 {/* Divider */}
 <div className="h-1.5 w-24 bg-primary mx-auto rounded-full flex gap-2 justify-center items-center">
 <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
 <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
 <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
 </div>

 {/* SEO Description */}
 <p className="mt-6 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
 SwordNex is a trusted web and mobile app development company delivering
 custom software solutions, SaaS applications, and enterprise systems.
 We focus on scalable architecture, secure deployments, and high-performance
 applications that help businesses grow faster in the digital world.
 </p>
 </motion.div>

 {/* Stats Cards */}
 <motion.div
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, margin: "-100px" }}
 variants={staggerContainer}
 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
 >
 {/* Clients */}
 <motion.div
 variants={scaleIn}
 className="bg-white dark:bg-card-dark p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 text-center hover:-translate-y-1"
 >
 <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/30 text-primary mb-6">
 <span className="material-icons-round text-3xl">groups</span>
 </div>
 <h3 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">
 {clientCount}+
 </h3>
 <p className="text-gray-700 dark:text-gray-300 font-semibold">
 Happy Clients Worldwide
 </p>
 <p className="text-xs text-gray-400 mt-1">
 Trusted custom software development partner
 </p>
 </motion.div>

 {/* Apps Delivered */}
 <motion.div
 variants={scaleIn}
 className="bg-white dark:bg-card-dark p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 text-center hover:-translate-y-1"
 >
 <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-50 dark:bg-orange-900/30 text-orange-500 mb-6">
 <span className="material-icons-round text-3xl">inventory_2</span>
 </div>
 <h3 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">
 {appCount}+
 </h3>
 <p className="text-gray-700 dark:text-gray-300 font-semibold">
 Web & Mobile Apps Delivered
 </p>
 <p className="text-xs text-gray-400 mt-1">
 SaaS platforms & enterprise software solutions
 </p>
 </motion.div>

 {/* Uptime */}
 <motion.div
 variants={scaleIn}
 className="bg-white dark:bg-card-dark p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 text-center hover:-translate-y-1"
 >
 <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 mb-6">
 <span className="material-icons-round text-3xl">cloud_done</span>
 </div>
 <h3 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">
 99.9%
 </h3>
 <p className="text-gray-700 dark:text-gray-300 font-semibold">
 Application Uptime Guarantee
 </p>
 <p className="text-xs text-gray-400 mt-1">
 Reliable cloud deployment & hosting
 </p>
 </motion.div>

 {/* Support */}
 <motion.div
 variants={scaleIn}
 className="bg-white dark:bg-card-dark p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 text-center hover:-translate-y-1"
 >
 <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-600 mb-6">
 <span className="material-icons-round text-3xl">support_agent</span>
 </div>
 <h3 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">
 24/7
 </h3>
 <p className="text-gray-700 dark:text-gray-300 font-semibold">
 Technical Support & Maintenance
 </p>
 <p className="text-xs text-gray-400 mt-1">
 Continuous updates for web & mobile applications
 </p>
 </motion.div>
 </motion.div>

 {/* Extra SEO Content */}
 <div className="max-w-4xl mx-auto text-center">
 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
 A Trusted Software Development Company for Scalable Growth
 </h3>
 <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
 We specialize in building custom web applications, mobile apps, and SaaS products
 that are secure, scalable, and performance-driven. Our team ensures seamless
 integration, fast deployment, and long-term support, helping businesses transform
 digitally and stay ahead in competitive markets.
 </p>
 </div>

 {/* Hidden SEO Keywords */}
 <div className="sr-only">
 web development company, mobile app development company, SaaS development services,
 custom software development company, enterprise application development,
 cloud application development, startup software solutions,
 web app developers in Chennai, mobile app developers in Tamil Nadu
 </div>
 </section>

 {/* 📞 CTA - Blue Gradient Background */}
 <section id="enquire" className="bg-gradient-to-b from-white to-blue-50 px-6 py-5">
 <motion.div
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true }}
 variants={fadeInUp}
 className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 to-cyan-700 p-10 md:p-12 text-center shadow-2xl"
 >
 <h2 className="text-3xl md:text-4xl font-extrabold text-white">
 Ready to Build Your Application?
 </h2>
 <p className="mt-4 text-white/90 leading-relaxed">
 Whether you’re a startup, an established business, or building an internal system,
 <br className="hidden sm:block" />
 we design and develop solutions that align perfectly with your vision and goals.
 </p>

 <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
 <button
 onClick={() => setIsEnquiryOpen(true)} className="px-10 py-3 rounded-xl bg-white text-blue-800 font-bold transition-all duration-300 hover:scale-[1.02] shadow-lg"
 >
 Enquire Now
 </button>
 <a
 href="#what-we-build"
 className="px-10 py-3 rounded-xl bg-white/10 backdrop-blur-sm text-white font-bold border-2 border-white/30 transition-all duration-300 "
 >
 See What We Build
 </a>
 </div>
 </motion.div>
 </section>

 {/* 🧰 OTHER SERVICES */}
 <section
 id="other-services"
 className="relative bg-gradient-to-b from-white to-blue-50 px-6 pb-28 pt-16"
 >
 <div className="mx-auto max-w-6xl space-y-14">

 {/* HEADER */}
 <motion.div
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true }}
 variants={fadeInUp}
 className="text-center max-w-4xl mx-auto"
 >
 <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
 Other Services
 </span>
 <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-gray-900">
 Beyond Software Development, We Drive Your Digital Growth
 </h2>
 <p className="mt-4 text-gray-600 leading-relaxed">
 SwordNex Technologies provides end-to-end solutions including SaaS products, IT infrastructure, HR systems, digital media, and professional development services to help startups and enterprises scale efficiently.
 </p>
 </motion.div>

 {/* SERVICE CARDS */}
 <motion.div
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, margin: "-100px" }}
 variants={staggerContainer}
 className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
 >

 {/* Digital Media */}
 <motion.div
 variants={scaleIn}
 whileHover={{ y: -8, transition: { duration: 0.3 } }}
 className="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100
 transition-all duration-300 hover:shadow-2xl flex flex-col">
 <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700 mb-6
 group-hover:scale-110 transition-transform">
 <span className="material-icons-round text-2xl">campaign</span>
 </div>
 <h3 className="text-xl font-bold text-gray-900 mb-3">
 Digital Media & Marketing
 </h3>
 <p className="text-gray-600 leading-relaxed text-sm">
 Performance-driven digital marketing and content strategies that boost brand visibility, generate qualified leads, and accelerate growth for SaaS and software companies. </p>
 <Link
 to="/services/digital-media"
 className="mt-auto w-full py-3 rounded-xl bg-blue-600 text-white font-semibold
 transition-all duration-300 hover:bg-blue-700 hover:scale-[1.02] inline-flex justify-center"
 >
 Explore
 </Link>
 </motion.div>

 {/* HR & People Ops */}
 <motion.div
 variants={scaleIn}
 whileHover={{ y: -8, transition: { duration: 0.3 } }}
 className="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100
 transition-all duration-300 hover:shadow-2xl flex flex-col">
 <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-700 mb-6
 group-hover:scale-110 transition-transform">
 <span className="material-icons-round text-2xl">groups</span>
 </div>
 <h3 className="text-xl font-bold text-gray-900 mb-3">
 HR & People Ops Systems
 </h3>
 <p className="text-gray-600 leading-relaxed text-sm">
 Scalable HR systems, payroll, and compliance solutions integrated with enterprise software for seamless workforce management.
 </p>
 <Link
 to="/services/hr-consulting"
 className="mt-auto w-full py-3 rounded-xl bg-purple-600 text-white font-semibold
 transition-all duration-300 hover:bg-purple-700 hover:scale-[1.02] inline-flex justify-center"
 >
 Explore
 </Link>
 </motion.div>

 {/* IT Infrastructure */}
 <motion.div
 variants={scaleIn}
 whileHover={{ y: -8, transition: { duration: 0.3 } }}
 className="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100
 transition-all duration-300 hover:shadow-2xl flex flex-col">
 <div className="w-14 h-14 rounded-2xl bg-cyan-100 flex items-center justify-center text-cyan-700 mb-6
 group-hover:scale-110 transition-transform">
 <span className="material-icons-round text-2xl">dns</span>
 </div>
 <h3 className="text-xl font-bold text-gray-900 mb-3">
 IT Infrastructure & Cloud
 </h3>
 <p className="text-gray-600 leading-relaxed text-sm">
 Secure, monitored networks, cloud deployments, and enterprise-grade IT solutions ensuring your SaaS products and apps run flawlessly.
 </p>
 <Link
 to="/services/it-infrastructure"
 className="mt-auto w-full py-3 rounded-xl bg-cyan-600 text-white font-semibold
 transition-all duration-300 hover:bg-cyan-700 hover:scale-[1.02] inline-flex justify-center"
 >
 Explore
 </Link>
 </motion.div>

 {/* IT Training & Skill Development */}
 <motion.div
 variants={scaleIn}
 whileHover={{ y: -8, transition: { duration: 0.3 } }}
 className="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100
 transition-all duration-300 hover:shadow-2xl flex flex-col">
 <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-green-700 mb-6
 group-hover:scale-110 transition-transform">
 <span className="material-icons-round text-2xl">school</span>
 </div>
 <h3 className="text-xl font-bold text-gray-900 mb-3">
 Professional Development
 </h3>
 <p className="text-gray-600 leading-relaxed text-sm">
 Job-focused training in full stack, Python, web technologies, and real-world client projects, preparing teams and students to work on enterprise applications.
 </p>
 <Link
 to="/services/it-training-skill-development"
 className="mt-auto w-full py-3 rounded-xl bg-green-600 text-white font-semibold
 transition-all duration-300 hover:bg-green-700 hover:scale-[1.02] inline-flex justify-center"
 >
 Explore
 </Link>
 </motion.div>

 </motion.div>
 </div>
 </section>


 {/* ✨ Animated Modals */}
 <AnimatePresence>
 <ServiceEnquiryModal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />
 <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
 </AnimatePresence>
 </main>
 );
}