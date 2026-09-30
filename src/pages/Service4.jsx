import React, { useState } from 'react';
import ConsultationModal from '../components/ConsultationModal';
import ServiceEnquiryModal from '../components/ServiceEnquiryModal';

const GlowBg = () => (
 <>
 <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-950 via-blue-950/40 to-slate-950" />
 <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.35),transparent_65%)]" />
 <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_right,rgba(14,165,233,0.20),transparent_70%)]" />
 <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_70%,rgba(30,64,175,0.15),transparent_60%)]" />
 </>
);

const SectionTitle = ({ eyebrow, title, highlight, subtitle }) => (
 <div className="mx-auto max-w-4xl text-center">
 {eyebrow && (
 <p className="text-sm md:text-base uppercase tracking-wider text-blue-400/90 font-semibold">
 {eyebrow}
 </p>
 )}

 <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
 {title}{" "}
 {highlight && (
 <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-300 bg-clip-text text-transparent">
 {highlight}
 </span>
 )}
 </h2>

 {subtitle && (
 <p className="mt-6 text-lg md:text-xl text-slate-300/90 leading-relaxed max-w-3xl mx-auto">
 {subtitle}
 </p>
 )}
 </div>
);

const Card = ({ title, desc, icon }) => (
 <div className="group relative rounded-3xl border border-slate-700/60 bg-slate-900/55 backdrop-blur-sm p-8 transition-all duration-300 hover:border-blue-500/50 hover:bg-slate-900/75 hover:shadow-xl hover:shadow-blue-900/25">
 <div className="absolute inset-0 opacity-0 group-hover:opacity-70 transition-opacity bg-gradient-to-br from-blue-600/12 to-cyan-600/8 pointer-events-none rounded-3xl" />
 <div className="relative z-10">
 <div className="mb-6 flex items-center gap-4">
 {icon && (
 <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600/30 to-cyan-600/20 border border-blue-500/30 text-blue-300">
 {icon}
 </div>
 )}
 <h3 className="text-xl font-bold text-white">{title}</h3>
 </div>
 <p className="text-slate-300 leading-relaxed">{desc}</p>
 </div>
 </div>
);

const Step = ({ index, title, desc }) => (
 <div className="relative rounded-3xl border border-slate-700/50 bg-slate-950/65 backdrop-blur-sm p-8 transition-all duration-300 hover:border-blue-500/50 hover:bg-slate-900/80 hover:shadow-lg hover:shadow-blue-900/20">
 <div className="absolute -top-5 -left-5 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold shadow-lg shadow-blue-900/40 group-hover:scale-110 transition-transform">
 {index}
 </div>
 <h4 className="mb-4 text-xl font-semibold text-white">{title}</h4>
 <p className="text-slate-400 text-[15px] leading-relaxed">{desc}</p>
 </div>
);

export default function ITInfrastructure() {
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

 const services = [
 {
 title: "Cloud Infrastructure",
 desc: "AWS, Azure, GCP — migration, architecture design, cost optimization, FinOps, multi-cloud & hybrid strategies.",
 icon: (
 <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
 <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
 </svg>
 ),
 },
 {
 title: "On-Premise & Hybrid",
 desc: "Data center setup, virtualization (VMware, Hyper-V), HCI, private cloud, hybrid connectivity & DR solutions.",
 icon: (
 <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
 <rect x="3" y="4" width="18" height="18" rx="2" />
 <path d="M16 2v4M8 2v4M3 10h18" />
 </svg>
 ),
 },
 {
 title: "Enterprise Networking",
 desc: "SD-WAN, campus & branch networking, Wi-Fi 6/6E, firewall, load balancing, network segmentation & zero-trust.",
 icon: (
 <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
 <path d="M3 12h18M12 3v18" />
 <circle cx="12" cy="12" r="3" />
 </svg>
 ),
 },
 {
 title: "Managed IT Infrastructure",
 desc: "24×7 monitoring, NOC, helpdesk, patch management, backup & disaster recovery, security operations (SOC).",
 icon: (
 <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
 <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
 </svg>
 ),
 },
 ];

 const process = [
 ["Assessment & Discovery", "Current infra audit, pain points, compliance & performance gaps map pannuvom"],
 ["Architecture & Design", "Future-ready, secure, cost-effective blueprint create pannuvom"],
 ["Implementation & Migration", "Zero/minimal downtime migrations & deployments handle pannuvom"],
 ["Monitoring & Optimization", "Ongoing 24×7 support, performance tuning & cost savings deliver pannuvom"],
 ];

 const whyUs = [
 ["Enterprise Grade Expertise", "Large scale deployments & mission-critical infra experience"],
 ["Vendor Neutral Approach", "Best-of-breed solutions — no vendor lock-in"],
 ["Proactive & Predictable", "99.99%+ uptime SLA & transparent monthly reporting"],
 ];

 return (
 <main className="relative min-h-screen bg-slate-950 text-white">
 <GlowBg />

 {/* HERO */}
 <section className="relative px-6 pt-32 pb-24 overflow-hidden">
 <div className="mx-auto max-w-6xl text-center">
 <p className="text-sm md:text-base uppercase tracking-wider text-blue-400 font-medium">
 IT Infrastructure & Cloud Services
 </p>

 <h1 className="mt-5 text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight">
 Reliable. Secure.<br className="hidden md:block" />
 <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-300 bg-clip-text text-transparent">
 Always Available.
 </span>
 </h1>

 <p className="mt-6 text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
 Your business runs on infrastructure.<br className="hidden sm:block" />
 We design, build, migrate and manage IT infra that scales with you — without downtime or surprises.
 </p>

 <div className="mt-10 flex flex-wrap gap-5 justify-center">
 <button
 onClick={() => setIsServiceModalOpen(true)}
 className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-10 py-5 font-bold shadow-xl shadow-blue-900/40 hover:shadow-blue-700/60 transition-all hover:scale-[1.02]"
 >
 Get Infra Assessment →
 </button>
 <button
 onClick={() => setIsServiceModalOpen(true)}
 className="rounded-full border border-blue-500/40 bg-blue-950/30 px-10 py-5 font-semibold hover:border-blue-400 transition-all"
 >
 Download Infra Checklist
 </button>
 </div>
 </div>
 </section>

 {/* SERVICES */}
 <section className="mx-auto max-w-6xl px-6 py-20">
 <SectionTitle
 eyebrow="Core Services"
 title="Enterprise-Grade"
 highlight="Infrastructure"
 subtitle="From cloud-native to hybrid environments — we deliver infrastructure that is secure, scalable, and cost-efficient."
 />

 <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
 {services.map((item) => (
 <Card key={item.title} {...item} />
 ))}
 </div>
 </section>

 {/* PROCESS */}
 <section className="relative py-20">
 <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 to-transparent pointer-events-none" />

 <div className="relative mx-auto max-w-6xl px-6">
 <SectionTitle
 eyebrow="Our Delivery Approach"
 title="Structured &"
 highlight="Zero-Risk"
 subtitle="Proven methodology that minimizes disruption while maximizing uptime and performance."
 />

 <div className="mt-12 grid md:grid-cols-4 gap-8">
 {process.map(([title, desc], i) => (
 <Step key={title} index={i + 1} title={title} desc={desc} />
 ))}
 </div>
 </div>
 </section>

 {/* WHY US */}
 <section className="mx-auto max-w-6xl px-6 py-20">
 <SectionTitle
 eyebrow="Why Enterprises Trust Us"
 title="Infrastructure That"
 highlight="Delivers"
 subtitle="We focus on reliability, security, observability, and long-term cost efficiency — not just implementation."
 />

 <div className="mt-12 grid md:grid-cols-3 gap-8">
 {whyUs.map(([title, desc]) => (
 <Card key={title} title={title} desc={desc} />
 ))}
 </div>
 </section>


<section className="py-1 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="text-center mb-16">
 <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
 Why market leaders trust <span className="text-primary">SwordNex</span>
 </h2>
 <div className="h-1.5 w-24 bg-primary mx-auto rounded-full flex gap-2 justify-center items-center">
 <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
 <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
 <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
 </div>
 <p className="mt-6 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
 We deliver scalable solutions backed by measurable results and unwavering support.
 </p>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
 <div className="bg-white dark:bg-card-dark p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700 text-center">
 <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/30 text-primary mb-6">
 <span className="material-icons-round text-3xl">groups</span>
 </div>
 <h3 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">50+</h3>
 <p className="text-gray-600 dark:text-gray-400 font-medium">Long-term Clients</p>
 </div>
 <div className="bg-white dark:bg-card-dark p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700 text-center">
 <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-50 dark:bg-orange-900/30 text-orange-500 mb-6">
 <span className="material-icons-round text-3xl">inventory_2</span>
 </div>
 <h3 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">100+</h3>
 <p className="text-gray-600 dark:text-gray-400 font-medium">Projects Delivered</p>
 </div>
 <div className="bg-white dark:bg-card-dark p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700 text-center">
 <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 mb-6">
 <span className="material-icons-round text-3xl">cloud_done</span>
 </div>
 <h3 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">100%</h3>
 <p className="text-gray-600 dark:text-gray-400 font-medium">Uptime Guarantee</p>
 <p className="text-xs text-gray-400 mt-1">on managed deployments</p>
 </div>
 <div className="bg-white dark:bg-card-dark p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700 text-center">
 <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-600 mb-6">
 <span className="material-icons-round text-3xl">support_agent</span>
 </div>
 <h3 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">24/7</h3>
 <p className="text-gray-600 dark:text-gray-400 font-medium">Expert Support</p>
 </div>
 </div>
 </section>
 {/* CTA */}
 <section className="px-6 py-10">
 <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-br from-blue-900/45 via-cyan-900/35 to-blue-950/45 border border-blue-500/20 backdrop-blur-md p-12 md:p-16 text-center shadow-2xl shadow-blue-900/25">
 <h2 className="text-4xl md:text-5xl font-bold leading-tight">
 Is Your Infrastructure Ready for Tomorrow?
 </h2>
 <p className="mt-6 text-xl text-blue-100/90 max-w-3xl mx-auto">
 Get a no-obligation infrastructure assessment and roadmap — identify risks, cost leaks & modernization opportunities.
 </p>

 <div className="mt-10 flex flex-wrap gap-6 justify-center">
 <button
 onClick={() => setIsServiceModalOpen(true)}
 className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-9 py-4 font-bold text-lg shadow-xl shadow-blue-900/40 hover:shadow-blue-700/60 transition-all hover:scale-[1.02]"
 >
 Schedule Free Assessment →
 </button>
 <button
 onClick={() => setIsServiceModalOpen(true)}
 className="rounded-full border border-blue-400/40 px-10 py-4 font-bold text-lg hover:bg-blue-900/30 transition-all"
 >
 Request Proposal
 </button>
 </div>
 </div>
 </section>
{/* SERVICE CARDS */}
 <section
 id="other-services"
 className="relative bg-gradient-to-b from-white to-blue-50 px-6 pb-28 pt-16"
>
 <div className="mx-auto max-w-6xl space-y-14">

 {/* HEADER */}
 <div className="text-center max-w-3xl mx-auto">
 <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
 Other Services
 </span>
 <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-gray-900">
 Beyond Software, We Support Your Growth
 </h2>
 <p className="mt-4 text-gray-600 leading-relaxed">
 For startups, businesses, or internal systems, we offer complete end-to-end support for sustainable growth.
 </p>
 </div>

 {/* SERVICE CARDS */}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

 {/* Digital Media */}
 <div className="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100
 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
 <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700 mb-6
 group-hover:scale-110 transition-transform">
 <span className="material-icons-round text-2xl">campaign</span>
 </div>
 <h3 className="text-xl font-bold text-gray-900 mb-3">
 Digital Media
 </h3>
 <p className="text-gray-600 leading-relaxed text-sm">
 Performance-driven digital marketing and content strategies that boost brand visibility, generate qualified leads, and accelerate growth for SaaS and software companies.
 </p>
 <button
 onClick={() => setIsServiceModalOpen(true)}
 className="mt-6 w-full py-3 rounded-xl bg-blue-600 text-white font-semibold
 transition-all duration-300 hover:bg-blue-700 hover:scale-[1.02]"
 >
 Talk to HR Expert
 </button>
 </div>

 {/* HR Consulting */}
 <div className="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100
 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
 <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-700 mb-6
 group-hover:scale-110 transition-transform">
 <span className="material-icons-round text-2xl">groups</span>
 </div>
 <h3 className="text-xl font-bold text-gray-900 mb-3">
 HR Consulting
 </h3>
 <p className="text-gray-600 leading-relaxed text-sm">
 Hiring support, HR process setup, policies and workforce planning
 tailored for growing companies.
 </p>
 <button
 onClick={() => setIsServiceModalOpen(true)}
 className="mt-6 w-full py-3 rounded-xl bg-purple-600 text-white font-semibold
 transition-all duration-300 hover:bg-purple-700 hover:scale-[1.02]"
 >
 Talk to HR Expert
 </button>
 </div>

 {/* IT Infrastructure */}
 <div className="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100
 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
 <div className="w-14 h-14 rounded-2xl bg-cyan-100 flex items-center justify-center text-cyan-700 mb-6
 group-hover:scale-110 transition-transform">
 <span className="material-icons-round text-2xl">dns</span>
 </div>
 <h3 className="text-xl font-bold text-gray-900 mb-3">
 IT Infrastructure
 </h3>
 <p className="text-gray-600 leading-relaxed text-sm">
 Servers, cloud setup, networking, security and scalable infrastructure
 for stable operations.
 </p>
 <button
 onClick={() => setIsServiceModalOpen(true)}
 className="mt-6 w-full py-3 rounded-xl bg-cyan-600 text-white font-semibold
 transition-all duration-300 hover:bg-cyan-700 hover:scale-[1.02]"
 >
 Talk to HR Expert
 </button>
 </div>

 {/* Professional Development */}
 <div className="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100
 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
 <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-green-700 mb-6
 group-hover:scale-110 transition-transform">
 <span className="material-icons-round text-2xl">school</span>
 </div>
 <h3 className="text-xl font-bold text-gray-900 mb-3">
 Professional Development
 </h3>
 <p className="text-gray-600 leading-relaxed text-sm">
 Corporate training, skill development programs and upskilling
 for teams and individuals.
 </p>
 <button
 onClick={() => setIsServiceModalOpen(true)}
 className="mt-6 w-full py-3 rounded-xl bg-green-600 text-white font-semibold
 transition-all duration-300 hover:bg-green-700 hover:scale-[1.02]"
 >
 Talk to HR Expert
 </button>
 </div>

 </div>

 {/* CTA BOX */}

 </div>
</section>
 {/* Modals */}
 {isModalOpen && <ConsultationModal onClose={() => setIsModalOpen(false)} />}
 {isServiceModalOpen && (
 <ServiceEnquiryModal onClose={() => setIsServiceModalOpen(false)} />
 )}
 </main>
 );
}