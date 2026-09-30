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
 <motion.p variants={fadeInUp} className="text-sm md:text-base uppercase tracking-wider text-blue-600 font-semibold">
 {eyebrow}
 </motion.p>
 )}

 <motion.h2 variants={fadeInUp} className="mt-4 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900">
 {title}{" "}
 {highlight && (
 <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-500 bg-clip-text text-transparent">
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
 className="group relative rounded-3xl border-2 border-slate-200 bg-white p-8 transition-all duration-300 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/10"
 >
 <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-blue-50 to-cyan-50/50 rounded-3xl pointer-events-none" />
 <div className="relative z-10">
 <div className="mb-6 flex items-center gap-4">
 {icon && (
 <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/20">
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
 className="relative rounded-3xl border-2 border-slate-200 bg-white p-8 transition-all duration-300 hover:border-blue-500 hover:shadow-xl"
 >
 <div className="absolute -top-5 -left-5 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold shadow-lg shadow-blue-500/30">
 {index}
 </div>
 <h4 className="mb-4 text-xl font-semibold text-slate-900">{title}</h4>
 <p className="text-slate-600 text-[15px] leading-relaxed">{desc}</p>
 </motion.div>
);

export default function ITInfrastructure() {
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

 const services = [
 {
 title: "Cloud Infrastructure Services",
 desc: (
 <ul className="list-disc list-inside text-slate-600 space-y-2">
 <li>AWS Cloud Services</li>
 <li>Microsoft Azure</li>
 <li>Google Cloud Platform</li>
 <li>Cloud Migration</li>
 <li>Cloud Architecture</li>
 <li>Cost Optimization</li>
 <li>FinOps Management</li>
 <li>Multi-Cloud Strategy</li>
 <li>Hybrid Cloud</li>
 <li>Scalable Infrastructure</li>
 </ul>
 ),
 icon: (
 <svg className="h-6 w-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
 <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
 </svg>
 ),
 },
 {
 title: "On-Premise & Hybrid Infrastructure",
 desc: (
 <ul className="list-disc list-inside text-slate-600 space-y-2">
 <li>Data Center Setup</li>
 <li>Server Infrastructure</li>
 <li>VMware Virtualization</li>
 <li>Hyper-V Solutions</li>
 <li>Private Cloud</li>
 <li>Hyperconverged Infrastructure</li>
 <li>Hybrid Connectivity</li>
 <li>Cloud Integration</li>
 <li>Disaster Recovery</li>
 <li>Business Continuity</li>
 </ul>
 ),
 icon: (
 <svg className="h-6 w-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
 <rect x="3" y="4" width="18" height="18" rx="2" />
 <path d="M16 2v4M8 2v4M3 10h18" />
 </svg>
 ),
 },
 {
 title: "Enterprise Networking",
 desc: (
 <ul className="list-disc list-inside text-slate-600 space-y-2">
 <li>SD-WAN Solutions</li>
 <li>Enterprise Networking</li>
 <li>Campus Networks</li>
 <li>Branch Connectivity</li>
 <li>Wi-Fi 6 & 6E</li>
 <li>Firewall Security</li>
 <li>Load Balancing</li>
 <li>Network Segmentation</li>
 <li>Zero Trust Networking</li>
 <li>Secure Network Design</li>
 </ul>
 ),
 icon: (
 <svg className="h-6 w-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
 <path d="M3 12h18M12 3v18" />
 <circle cx="12" cy="12" r="3" />
 </svg>
 ),
 },
 {
 title: "Managed IT Infrastructure",
 desc: (
 <ul className="list-disc list-inside text-slate-600 space-y-2">
 <li>Managed IT Services</li>
 <li>24×7 Infrastructure Monitoring</li>
 <li>Network Operations Center (NOC)</li>
 <li>IT Helpdesk Support</li>
 <li>Patch Management</li>
 <li>System Maintenance</li>
 <li>Data Backup Solutions</li>
 <li>Disaster Recovery</li>
 <li>Security Operations Center (SOC)</li>
 <li>Proactive IT Support</li>
 </ul>
 ),
 icon: (
 <svg className="h-6 w-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
 <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
 </svg>
 ),
 },
 ];

 const process = [
 [
 "Infrastructure Assessment",
 <ul className="list-disc list-inside text-slate-600 space-y-1">
 <li>IT audit</li>
 <li>Security checks</li>
 <li>Compliance review</li>
 <li>Performance analysis</li>
 </ul>
 ],
 [
 "Architecture & Planning",
 <ul className="list-disc list-inside text-slate-600 space-y-1">
 <li>Cloud design</li>
 <li>On-prem solutions</li>
 <li>Hybrid architecture</li>
 <li>Cost optimization</li>
 </ul>
 ],
 [
 "Deployment & Migration",
 <ul className="list-disc list-inside text-slate-600 space-y-1">
 <li>Secure rollout</li>
 <li>Cloud migration</li>
 <li>System upgrades</li>
 <li>Minimal downtime</li>
 </ul>
 ],
 [
 "Managed Support & Optimization",
 <ul className="list-disc list-inside text-slate-600 space-y-1">
 <li>24/7 monitoring</li>
 <li>Proactive maintenance</li>
 <li>Performance tuning</li>
 <li>Cost control</li>
 </ul>
 ],
 ];

 const whyUs = [
 [
 "Enterprise IT Expertise",
 <ul className="list-disc list-inside text-slate-600 space-y-1">
 <li>Large-scale IT deployments</li>
 <li>Proven reliability</li>
 <li>High performance infrastructure</li>
 </ul>
 ],
 [
 "Vendor-Neutral Solutions",
 <ul className="list-disc list-inside text-slate-600 space-y-1">
 <li>AWS, Azure, GCP, VMware</li>
 <li>Open-stack solutions</li>
 <li>No vendor lock-in</li>
 </ul>
 ],
 [
 "Proactive Managed Services",
 <ul className="list-disc list-inside text-slate-600 space-y-1">
 <li>24/7 monitoring</li>
 <li>99.99% uptime SLA</li>
 <li>Transparent reporting</li>
 </ul>
 ],
 ];

 return (
 <main className="relative min-h-screen bg-white overflow-hidden"> {/* Added overflow-hidden */}
 {/* HERO - Blue Gradient Background */}
 <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-cyan-700 px-6 pt-16 pb-16">
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
 Enterprise IT Infrastructure & Cloud Services
 </motion.p>

 <motion.h1 variants={fadeInUp} className="mt-5 text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight text-white">
 Secure. Scalable.<br className="hidden md:block" />
 <span className="text-cyan-200">
 Always-On Infrastructure.
 </span>
 </motion.h1>

 <motion.p variants={fadeInUp} className="mt-6 text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
 We design, migrate, and manage cloud, hybrid, and on-prem IT infrastructure
 built for security, performance, and business continuity.
 </motion.p>

 <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap gap-5 justify-center">
 {/* Primary CTA */}
 <button
 onClick={() => setIsEnquiryOpen(true)}
 className="rounded-xl bg-white text-blue-800 px-12 py-5 font-bold shadow-xl transition-all hover:scale-[1.02]"
 >
 Modernize Your IT Infrastructure →
 </button>

 {/* Secondary CTA */}
 <button
 onClick={() => setIsModalOpen(true)}
 className="rounded-xl border-2 border-white bg-transparent text-white px-12 py-5 font-semibold transition-all"
 >
 Talk to an Infrastructure Expert
 </button>
 </motion.div>
 </motion.div>
 </section>


 {/* SERVICES - White Background */}
 <section className="bg-white mx-auto max-w-7xl px-6 py-20">
 <SectionTitle
 eyebrow="Core IT Services"
 title="Enterprise IT"
 highlight="Infrastructure Solutions"
 subtitle="Cloud, hybrid, and on-prem infrastructure services designed for security, scalability, high availability, and cost optimization."
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
 <section className="relative py-20 bg-gradient-to-b from-blue-50 to-white">
 <div className="relative mx-auto max-w-6xl px-6">
 <SectionTitle
 eyebrow="Our Delivery Approach"
 title="Structured &"
 highlight="Zero-Risk Deployment"
 subtitle="A proven IT infrastructure delivery framework that ensures minimal downtime, maximum uptime, security, and performance."
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
 eyebrow="Why Enterprises Trust Us"
 title="Infrastructure That"
 highlight="Delivers Results"
 subtitle="We prioritize reliability, security, visibility, and long-term cost optimization — not just one-time deployment."
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

 {/* Stats Section */}
 <section className="py-1 lg:py-15 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <motion.div
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.3 }}
 variants={staggerContainer}
 className="text-center mb-16"
 >
 <motion.h2 variants={fadeInUp} className="text-3xl lg:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
 Why enterprises trust <span className="text-primary">SwordNex</span>
 </motion.h2>

 <motion.div variants={fadeInUp} className="h-1.5 w-24 bg-primary mx-auto rounded-full flex gap-2 justify-center items-center">
 <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
 <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
 <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
 </motion.div>

 <motion.p variants={fadeInUp} className="mt-6 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
 We design, deploy, and manage enterprise IT infrastructure that delivers high availability,
 security, and predictable performance at scale.
 </motion.p>
 </motion.div>

 <motion.div
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.3 }}
 variants={staggerContainer}
 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24"
 >
 {/* Card 1 */}
 {[
 { icon: 'groups', count: '50+', text: 'Enterprise & Mid-Market Clients', bgColor: 'blue', textColor: 'primary' },
 { icon: 'inventory_2', count: '100+', text: 'Cloud, Hybrid & On-Prem Projects', bgColor: 'orange', textColor: 'orange-500' },
 { icon: 'cloud_done', count: '99.99%', text: 'Infrastructure Uptime SLA', bgColor: 'green', textColor: 'green-600' },
 { icon: 'support_agent', count: '24×7', text: 'NOC, SOC & Expert Support', bgColor: 'purple', textColor: 'purple-600' },
 ].map((stat, idx) => (
 <motion.div
 key={idx}
 variants={scaleIn}
 className="bg-white dark:bg-card-dark p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700 text-center"
 >
 <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${stat.bgColor}-50 dark:bg-${stat.bgColor}-900/30 text-${stat.textColor} mb-6`}>
 <span className="material-icons-round text-3xl">{stat.icon}</span>
 </div>
 <h3 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">
 {stat.count}
 </h3>
 <p className="text-gray-600 dark:text-gray-400 font-medium">
 {stat.text}
 </p>
 </motion.div>
 ))}
 </motion.div>
 </section>


 {/* CTA - Blue Gradient Background */}
 <section className="px-4 py-10 bg-gradient-to-b from-white to-blue-50">
 <motion.div
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.3 }}
 variants={staggerContainer}
 className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-br from-blue-700 to-cyan-700 p-12 md:p-16 text-center shadow-2xl"
 >

 <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold leading-tight text-white">
 Is Your Infrastructure Ready for Tomorrow?
 </motion.h2>

 <motion.p variants={fadeInUp} className="mt-6 text-xl text-white/90 max-w-3xl mx-auto">
 Get a free infrastructure assessment and clear roadmap to improve
 performance, security, and cost efficiency.
 </motion.p>

 <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap gap-6 justify-center">

 <button
 onClick={() => setIsEnquiryOpen(true)}
 className="rounded-xl bg-white text-blue-800 px-10 py-4 font-bold text-sm sm:text-base lg:text-lg shadow-xl transition-all hover:scale-[1.02]"
 >
 Modernize Your IT Infrastructure
 </button>
 </motion.div>
 </motion.div>
 </section>


 {/* OTHER SERVICE CARDS */}
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
 icon: 'widgets',
 title: 'Application Development',
 desc: 'Custom web and mobile applications tailored to your business workflow, including internal dashboards, client portals, and scalable digital solutions',
 link: '/services/application-development',
 bgColor: 'blue'
 },
 {
 icon: 'campaign',
 title: 'Digital Media & Marketing',
 desc: 'Performance-driven digital marketing and content strategies that boost brand visibility, generate qualified leads, and accelerate growth for SaaS and software companies.',
 link: '/services/digital-media',
 bgColor: 'purple'
 },
 {
 icon: 'groups', // Changed to 'groups' as per previous context for HR Consulting
 title: 'HR & People Ops Systems',
 desc: 'Scalable HR systems, payroll, and compliance solutions integrated with enterprise software for seamless workforce management.',
 link: '/services/hr-consulting',
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