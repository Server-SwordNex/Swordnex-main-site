import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion
import ConsultationModal from '../components/ConsultationModal';
import ServiceEnquiryModal from '../components/ServiceEnquiryModal';

// Animation Variants - Reusable patterns
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
 staggerChildren: 0.15 // Delay between each child animation
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

// SectionTitle component now uses motion elements internally
const SectionTitle = ({ eyebrow, title, highlight, subtitle }) => (
 <motion.div
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.3 }} // Trigger when 30% of element is in view
 variants={staggerContainer} // Stagger animations for its children
 className="mx-auto max-w-4xl text-center"
 >
 {eyebrow && (
 <motion.p variants={fadeInUp} className="text-sm md:text-base uppercase tracking-wider text-indigo-600 font-semibold">
 {eyebrow}
 </motion.p>
 )}

 <motion.h2 variants={fadeInUp} className="mt-4 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900">
 {title}{" "}
 {highlight && (
 <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
 {highlight}
 </span>
 )}
 </motion.h2>

 {subtitle && (
 <motion.p variants={fadeInUp} className="mt-6 text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
 {subtitle}
 </motion.p>
 )}
 </motion.div>
);

// Card component now uses motion.div
const Card = ({ title, desc, icon }) => (
 <motion.div
 variants={scaleIn} // Each card scales in
 className="group relative rounded-3xl border-2 border-slate-200 bg-white p-8 transition-all duration-300 hover:border-indigo-500 hover:shadow-2xl hover:shadow-indigo-500/10"
 >
 <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-indigo-50 to-blue-50/50 rounded-3xl pointer-events-none" />
 <div className="relative z-10">
 <div className="mb-6 flex items-center gap-4">
 {icon && (
 <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-500/20">
 {icon}
 </div>
 )}
 <h3 className="text-xl font-bold text-slate-900">{title}</h3>
 </div>
 <p className="text-slate-600 leading-relaxed">{desc}</p>
 </div>
 </motion.div>
);

// Step component now uses motion.div
const Step = ({ index, title, desc }) => (
 <motion.div
 variants={scaleIn} // Each step scales in
 className="relative rounded-3xl border-2 border-slate-200 bg-white p-8 transition-all duration-300 hover:border-indigo-500 hover:shadow-xl"
 >
 <div className="absolute -top-5 -left-5 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold shadow-lg shadow-indigo-500/30">
 {index}
 </div>
 <h4 className="mb-4 text-xl font-semibold text-slate-900">{title}</h4>
 <p className="text-slate-600 text-[15px] leading-relaxed">{desc}</p>
 </motion.div>
);

export default function HRConsulting() {
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

 const services = [
 {
 title: "Talent Acquisition",
 desc: (
 <ul className="list-disc list-inside text-slate-600 space-y-2">
 <li>Talent Acquisition</li>
 <li>Recruitment Strategy</li>
 <li>Employer Branding</li>
 <li>Diversity Hiring</li>
 <li>Campus Recruitment</li>
 <li>ATS Integration</li>
 </ul>
 ),
 icon: (
 <svg className="h-6 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeWidth="2" d="M12 12c2 0 4-2 4-4s-2-4-4-4-4 2-4 4 2 4 4 4z" />
 </svg>
 ),
 },
 {
 title: "HR Strategy & Transformation",
 desc: (
 <ul className="list-disc list-inside text-slate-600 space-y-2">
 <li>HR Strategy</li>
 <li>Workforce Planning</li>
 <li>HR Automation</li>
 <li>HR Tech Advisory</li>
 <li>Policy Consulting</li>
 <li>Organizational Design</li>
 </ul>
 ),
 icon: (
 <svg className="h-6 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeWidth="2" d="M5 12h14M12 5v14" />
 </svg>
 ),
 },
 {
 title: "Performance & Culture",
 desc: (
 <ul className="list-disc list-inside text-slate-600 space-y-2">
 <li>Performance Management</li>
 <li>OKR & KPI</li>
 <li>Engagement Surveys</li>
 <li>Culture Alignment</li>
 <li>Recognition Programs</li>
 </ul>
 ),
 icon: (
 <svg className="h-6 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
 </svg>
 ),
 },
 {
 title: "Learning & Leadership Development",
 desc: (
 <ul className="list-disc list-inside text-slate-600 space-y-2">
 <li>Leadership Programs</li>
 <li>Succession Planning</li>
 <li>LMS Integration</li>
 <li>DEI Training</li>
 <li>Professional Coaching</li>
 </ul>
 ),
 icon: (
 <svg className="h-6 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeWidth="2" d="M12 4v16m8-8H4" />
 </svg>
 ),
 },
 ];


 const process = [
 [
 "Discovery & Analysis",
 <ul className="list-disc list-inside text-slate-600 space-y-1">
 <li>Assess current HR practices</li>
 <li>Review organizational culture</li>
 <li>Analyze business goals</li>
 <li>Identify gaps and opportunities</li>
 </ul>
 ],
 [
 "Strategic HR Design",
 <ul className="list-disc list-inside text-slate-600 space-y-1">
 <li>Create custom HR roadmap</li>
 <li>Develop policies and processes</li>
 <li>Integrate technology solutions</li>
 <li>Align with business objectives</li>
 </ul>
 ],
 [
 "Implementation & Change",
 <ul className="list-disc list-inside text-slate-600 space-y-1">
 <li>Rollout HR initiatives smoothly</li>
 <li>Conduct employee training</li>
 <li>Engage stakeholders</li>
 <li>Embed lasting organizational change</li>
 </ul>
 ],
 [
 "Measure & Optimize",
 <ul className="list-disc list-inside text-slate-600 space-y-1">
 <li>Monitor HR initiatives</li>
 <li>Track key metrics</li>
 <li>Continuously improve processes</li>
 <li>Maximize engagement and performance</li>
 </ul>
 ],
 ];



 const whyUs = [
 [
 "Business-Aligned HR",
 <ul className="list-disc list-inside text-slate-600 space-y-1">
 <li>HR strategy</li>
 <li>Workforce planning</li>
 <li>Policies that boost growth</li>
 <li>Enhance profitability</li>
 </ul>
 ],
 [
 "Practical & Scalable",
 <ul className="list-disc list-inside text-slate-600 space-y-1">
 <li>HR frameworks</li>
 <li>Systems and processes</li>
 <li>Scalable from startups</li>
 <li>Enterprise-ready solutions</li>
 </ul>
 ],
 [
 "People + Data Driven",
 <ul className="list-disc list-inside text-slate-600 space-y-1">
 <li>Employee engagement</li>
 <li>Analytics insights</li>
 <li>Culture analysis</li>
 <li>Informed HR decisions</li>
 </ul>
 ],
 ];


 return (
 <main className="relative min-h-screen bg-white overflow-hidden"> {/* Added overflow-hidden */}
 {/* HERO - Blue Gradient Background */}
 <section className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-blue-700 to-cyan-700 px-6 py-12">
 {/* Subtle pattern overlay */}
 <div className="absolute inset-0 opacity-10">
 <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.4),transparent_50%)]" />
 <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.3),transparent_60%)]" />
 </div>

 <motion.div
 initial="hidden"
 animate="visible" // Animate on mount for hero section
 variants={staggerContainer}
 className="relative mx-auto max-w-6xl text-center"
 >
 <motion.p variants={fadeInUp} className="text-sm md:text-base uppercase tracking-wider text-white/90 font-medium">
 HR Consulting | Talent Management | People Strategy
 </motion.p>

 <motion.h1 variants={fadeInUp} className="mt-5 text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight text-white">
 People. Performance.<br className="hidden md:block" />
 <span className="text-cyan-200">Profit.</span>
 </motion.h1>

 <motion.p variants={fadeInUp} className="mt-6 text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
 Transform your workforce into a growth engine. <br className="hidden sm:block" />
 We help you attract top talent, boost employee engagement, optimize HR processes, and build a high-performance culture that drives measurable business results.
 </motion.p>

 <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap gap-5 justify-center">
 <button
 onClick={() => setIsEnquiryOpen(true)}
 className="rounded-xl bg-white text-indigo-700 px-10 py-5 font-bold shadow-xl hover:bg-indigo-50 transition-all hover:scale-[1.02]"
 >
 Start HR Transformation →
 </button>
 <button
 onClick={() => setIsModalOpen(true)}
 className="rounded-xl border-2 border-white bg-transparent text-white px-10 py-5 font-semibold transition-all"
 >
 Get Free Consultation
 </button>
 </motion.div>

 </motion.div>
 </section>


 {/* SERVICES - White Background */}
 <section className="bg-white mx-auto max-w-7xl px-6 py-20">
 <SectionTitle
 eyebrow="Our Expertise"
 title="Comprehensive HR"
 highlight="Solutions"
 subtitle="Talent acquisition, HR strategy, workforce planning, performance management, and leadership development — end-to-end human resources solutions for businesses and startups."
 />

 <motion.div
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.3 }}
 variants={staggerContainer}
 className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-8"
 >
 {services.map((item) => (
 <Card key={item.title} {...item} />
 ))}
 </motion.div>
 </section>

 {/* PROCESS - Light Blue Background */}
 <section className="relative py-20 bg-gradient-to-b from-indigo-50 to-white">
 <div className="relative mx-auto max-w-6xl px-6">
 <SectionTitle
 eyebrow="How We Partner"
 title="Trusted HR"
 highlight="Consulting Process"
 subtitle="Structured, collaborative, and measurable — our HR consulting process ensures results that drive business performance."
 />

 <motion.div
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.3 }}
 variants={staggerContainer}
 className="mt-12 grid md:grid-cols-4 gap-8"
 >
 {process.map(([title, desc], i) => (
 <Step key={title} index={i + 1} title={title} desc={desc} />
 ))}
 </motion.div>
 </div>
 </section>

 {/* WHY US - White Background */}
 <section className="bg-white mx-auto max-w-6xl px-6 py-20">
 <SectionTitle
 eyebrow="Why Organizations Choose Us"
 title="HR That Actually"
 highlight="Drives Business Growth"
 subtitle="We deliver strategic HR solutions that align talent management, workforce planning, and employee engagement directly to measurable business outcomes — not just HR best practices."
 />

 <motion.div
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.3 }}
 variants={staggerContainer}
 className="mt-12 grid md:grid-cols-3 gap-8"
 >
 {whyUs.map(([title, desc]) => (
 <Card key={title} title={title} desc={desc} />
 ))}
 </motion.div>
 </section>

 {/* Stats Section (Why Leading Companies Trust) */}
 <section className="py-1 lg:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <motion.div
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.3 }}
 variants={staggerContainer}
 className="text-center mb-16"
 >
 <motion.h2 variants={fadeInUp} className="text-3xl lg:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
 Why Leading Companies Trust <span className="text-primary">Our HR Solutions</span>
 </motion.h2>
 <motion.div variants={fadeInUp} className="h-1.5 w-24 bg-primary mx-auto rounded-full flex gap-2 justify-center items-center">
 <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
 <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
 <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
 </motion.div>
 <motion.p variants={fadeInUp} className="mt-6 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
 Delivering scalable HR strategies, talent management solutions, and measurable workforce results for businesses across industries.
 </motion.p>
 </motion.div>

 <motion.div
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.3 }}
 variants={staggerContainer}
 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24"
 >
 {[
 { icon: 'groups', count: '50+', text: 'Long-term HR Clients', subtext: '', bgColor: 'blue', textColor: 'primary' },
 { icon: 'inventory_2', count: '100+', text: 'Successful Talent Placements', subtext: '', bgColor: 'orange', textColor: 'orange-500' },
 { icon: 'cloud_done', count: '100%', text: 'HR Compliance Guarantee', subtext: 'for all implemented HR policies', bgColor: 'green', textColor: 'green-600' },
 { icon: 'support_agent', count: '24/7', text: 'Expert HR Support', subtext: '', bgColor: 'purple', textColor: 'purple-600' },
 ].map((stat, idx) => (
 <motion.div
 key={idx}
 variants={scaleIn}
 className="bg-white dark:bg-card-dark p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700 text-center"
 >
 <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${stat.bgColor}-50 dark:bg-${stat.bgColor}-900/30 text-${stat.textColor} mb-6`}>
 <span className="material-icons-round text-3xl">{stat.icon}</span>
 </div>
 <h3 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">{stat.count}</h3>
 <p className="text-gray-600 dark:text-gray-400 font-medium">{stat.text}</p>
 {stat.subtext && <p className="text-xs text-gray-400 mt-1">{stat.subtext}</p>}
 </motion.div>
 ))}
 </motion.div>
 </section>

 {/* CTA - Blue Gradient Background */}
 <section className="px-6 py-6 bg-gradient-to-b from-white to-blue-50">
 <motion.div
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.3 }}
 variants={staggerContainer}
 className="mx-auto max-w-6xl rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-600 p-12 text-center shadow-2xl"
 >
 <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-white">
 Build a Strong Workforce with HR Experts
 </motion.h2>
 <motion.p variants={fadeInUp} className="mt-6 text-xl text-white/90 max-w-4xl mx-auto">
 Partner with expert HR consultants to boost talent acquisition, employee engagement, and workforce performance for measurable business growth.
 </motion.p>

 <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap gap-6 justify-center">
 <button
 onClick={() => setIsEnquiryOpen(true)}
 className="rounded-xl bg-white text-blue-600 px-10 py-4 font-bold text-lg shadow-xl transition-all hover:scale-[1.02]"
 >
 Start Your HR Transformation
 </button>
 </motion.div>
 </motion.div>
 </section>


 {/* OTHER SERVICES CARDS */}
 <section
 id="other-services"
 className="relative bg-gradient-to-b from-white to-blue-50 px-6 pb-28 pt-16"
 >
 <motion.div
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.3 }}
 variants={staggerContainer}
 className="mx-auto max-w-6xl space-y-14"
 >

 {/* HEADER for other services */}
 <div className="text-center max-w-3xl mx-auto">
 <motion.span variants={fadeInUp} className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
 Other Services
 </motion.span>
 <motion.h2 variants={fadeInUp} className="mt-4 text-3xl md:text-4xl font-extrabold text-gray-900">
 Beyond Software, We Support Your Growth
 </motion.h2>
 <motion.p variants={fadeInUp} className="mt-4 text-gray-600 leading-relaxed">
 For startups, businesses, or internal systems, we offer complete end-to-end support for sustainable growth.
 </motion.p>
 </div>

 {/* SERVICE CARDS */}
 <motion.div
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.3 }}
 variants={staggerContainer}
 className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
 >
 {[
 {
 icon: 'widgets', // Changed icon from campaign to widgets for Application Development
 title: 'Application Development',
 desc: 'Custom web and mobile applications tailored to your business workflow, including internal dashboards, client portals, and scalable digital solutions',
 link: '/services/application-development',
 bgColor: 'blue'
 },
 {
 icon: 'campaign', // Original icon for Digital Media
 title: 'Digital Media & Marketing',
 desc: 'Performance-driven digital campaigns and content strategies that enhance brand visibility, drive leads, and complement SaaS and software solutions.',
 link: '/services/digital-media',
 bgColor: 'purple'
 },
 {
 icon: 'dns',
 title: 'IT Infrastructure & Cloud',
 desc: 'Secure, monitored networks, cloud deployments, and enterprise-grade IT solutions ensuring your SaaS products and apps run flawlessly.',
 link: '/services/it-infrastructure',
 bgColor: 'cyan'
 },
 {
 icon: 'school',
 title: 'IT Training & Skill Development',
 desc: 'Job-focused training in full stack, Python, web technologies, and real-world client projects, preparing teams and students to work on enterprise applications.',
 link: '/services/it-training-skill-development',
 bgColor: 'green'
 },
 ].map((service, idx) => (
 <motion.div
 key={idx}
 variants={scaleIn}
 className="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100
 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col"
 >
 <div className={`w-14 h-14 rounded-2xl bg-${service.bgColor}-100 flex items-center justify-center text-${service.bgColor}-700 mb-6
 group-hover:scale-110 transition-transform`}>
 <span className="material-icons-round text-2xl">{service.icon}</span>
 </div>
 <h3 className="text-xl font-bold text-gray-900 mb-3">
 {service.title}
 </h3>
 <p className="text-gray-600 leading-relaxed text-sm flex-grow">
 {service.desc}
 </p>
 <Link
 to={service.link}
 className={`mt-6 w-full py-3 rounded-xl bg-${service.bgColor}-600 text-white font-semibold
 transition-all duration-300 hover:bg-${service.bgColor}-700 hover:scale-[1.02] inline-flex justify-center`}
 >
 Explore
 </Link>
 </motion.div>
 ))}
 </motion.div>
 </motion.div>
 </section>

 {/* Modals */}
 <ServiceEnquiryModal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />
 <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
 </main>
 );
}