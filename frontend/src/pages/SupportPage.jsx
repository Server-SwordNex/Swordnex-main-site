import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

// Animation Variants
const fadeInUp = {
 hidden: { opacity: 0, y: 30 },
 visible: {
 opacity: 1,
 y: 0,
 transition: { duration: 0.6, ease: 'easeOut' },
 },
};

const staggerContainer = {
 hidden: { opacity: 0 },
 visible: {
 opacity: 1,
 transition: {
 staggerChildren: 0.1,
 delayChildren: 0.2,
 },
 },
};

const scaleIn = {
 hidden: { opacity: 0, scale: 0.95 },
 visible: {
 opacity: 1,
 scale: 1,
 transition: { duration: 0.5, ease: 'easeOut' },
 },
};

// Animated Counter Hook
const useCounter = (target, suffix = '', duration = 2000) => {
 const [count, setCount] = useState('0');

 useEffect(() => {
 let start = 0;
 const isFloat = target.toString().includes('.');
 const targetNum = parseFloat(target);
 const increment = targetNum / (duration / 16);

 const timer = setInterval(() => {
 start += increment;
 if (start >= targetNum) {
 setCount(target + suffix);
 clearInterval(timer);
 } else {
 if (isFloat) {
 setCount(start.toFixed(1) + suffix);
 } else {
 setCount(Math.floor(start).toString() + suffix);
 }
 }
 }, 16);

 return () => clearInterval(timer);
 }, [target, suffix, duration]);

 return count;
};

const SupportPage = () => {
 const [activeTab, setActiveTab] = useState('guides');
 const [openFaq, setOpenFaq] = useState(null);
 const [searchQuery, setSearchQuery] = useState('');
 const [flippedGuide, setFlippedGuide] = useState(null); // which guide card is flipped

 const { scrollYProgress } = useScroll();
 const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 40]);

 // Animated counters
 const guidesCount = useCounter(24);
 const faqsCount = useCounter(156);
 const videosCount = useCounter(12);
 const communityCount = useCounter(2.4, 'K');

 const tabs = [
 { id: 'guides', label: 'Guides & Documentation', count: guidesCount, icon: '📚' },
 { id: 'faqs', label: 'Frequently Asked Questions', count: faqsCount, icon: '💬' },
 { id: 'videos', label: 'Video Tutorials', count: videosCount, icon: '🎥' },
 { id: 'community', label: 'Community', count: communityCount, icon: '👥' },
 ];

 const guides = [
 {
 title: 'Payroll Software Setup',
 desc: 'Complete GST-compliant payroll setup guide',
 href: '/docs/payroll-setup',
 icon: '💰',
 time: '15 min read',
 details:
 'Learn how to configure company details, salary components, tax slabs, and statutory settings to make your payroll system fully GST-compliant and ready for monthly processing.',
 },
 {
 title: 'Employee Onboarding',
 desc: 'HRM onboarding workflow',
 href: '/docs/hrm-onboarding',
 icon: '👤',
 time: '10 min read',
 details:
 'Step-by-step onboarding process: creating employee records, assigning departments and roles, setting probation periods, and automating document collection and approvals.',
 },
 {
 title: 'GST Report Generation',
 desc: 'Generate GSTR-1, GSTR-3B reports',
 href: '/docs/gst-reports',
 icon: '📊',
 time: '8 min read',
 details:
 'Configure GST periods, map tax rates, and generate error-free GSTR-1 and GSTR-3B reports. Includes tips to validate data before filing to reduce rejection chances.',
 },
 {
 title: 'Biometric Integration',
 desc: 'Connect attendance devices',
 href: '/docs/biometric',
 icon: '🔐',
 time: '12 min read',
 details:
 'Connect biometric devices, map device users to employees, and configure sync frequency so attendance flows directly into your payroll and HRM modules automatically.',
 },
 {
 title: 'API Documentation',
 desc: 'Integrate with other systems',
 href: '/docs/api',
 icon: '🔌',
 time: '20 min read',
 details:
 'Understand authentication, endpoints, request/response formats, and best practices to safely integrate SwordNex Payroll, HRM, and Billing with your existing systems.',
 },
 {
 title: 'Mobile App Setup',
 desc: 'Configure mobile applications',
 href: '/docs/mobile',
 icon: '📱',
 time: '5 min read',
 details:
 'Install and configure the mobile app for employees and managers, enable notifications, geo-fencing, and self-service options for leaves, attendance, and payslips.',
 },
 ];

 const faqs = [
 {
 q: 'How to reset SwordNex Payroll password?',
 a: 'Visit products.payroll.swordnex.com → "Forgot Password" → Enter email → Check inbox/spam for reset link. Takes 30 seconds.',
 category: 'Payroll',
 icon: '🔑',
 },
 {
 q: 'GST reports showing incorrect calculations?',
 a: '1. Update to latest version (Settings → Updates) 2. Verify FY selection 3. Recalculate taxes (Reports → Recalculate)',
 category: 'Billing',
 icon: '📈',
 },
 {
 q: 'Employee attendance not syncing?',
 a: 'Check: 1) Internet connection 2) Biometric sync settings 3) Mobile app permissions. Syncs every 5 mins automatically.',
 category: 'HRM',
 icon: '⏰',
 },
 {
 q: 'How to backup data?',
 a: 'Navigate to Settings → Backup & Restore → Create Backup. Enable auto-backup for daily automated backups to cloud.',
 category: 'General',
 icon: '💾',
 },
 {
 q: 'Multi-branch setup process?',
 a: 'Admin Panel → Organization → Add Branch → Configure permissions. Each branch gets unique login credentials.',
 category: 'Setup',
 icon: '🏢',
 },
 {
 q: 'Export data to Excel?',
 a: 'Any report page → Export button → Choose Excel format → Download starts automatically. Works with all modules.',
 category: 'Reports',
 icon: '📑',
 },
 ];

 const videos = [
 { title: 'Getting Started', duration: '5:30', views: '2.3K' },
 { title: 'Payroll Setup Guide', duration: '12:45', views: '1.8K' },
 { title: 'GST Configuration', duration: '8:20', views: '3.1K' },
 ];

 const filteredGuides = guides.filter(
 (guide) =>
 guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
 guide.desc.toLowerCase().includes(searchQuery.toLowerCase())
 );

 const filteredFaqs = faqs.filter(
 (faq) =>
 faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
 faq.a.toLowerCase().includes(searchQuery.toLowerCase())
 );

 return (
 <div className="min-h-screen bg-white">
 {/* Hero Section */}
 <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 py-20 overflow-hidden">
 <motion.div style={{ y: heroY }} className="absolute inset-0 opacity-10">
 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.2)_0%,transparent_70%)]"></div>
 </motion.div>

 <div className="relative max-w-7xl mx-auto px-6">
 <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center">
 <motion.h1
 variants={fadeInUp}
 className="text-5xl md:text-6xl font-bold text-white mb-6"
 >
 How Can We Help You?
 </motion.h1>
 <motion.p
 variants={fadeInUp}
 className="text-xl text-blue-100 max-w-3xl mx-auto mb-10"
 >
 Find instant answers, guides, and support for <strong>SwordNex Payroll</strong>,{' '}
 <strong>HRM</strong>, and <strong>Billing Software</strong>
 </motion.p>

 {/* Search Bar */}
 <motion.div variants={fadeInUp} className="max-w-3xl mx-auto">
 <div className="relative">
 <input
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 placeholder="Search for guides, FAQs, or enter your question..."
 className="w-full px-6 py-5 pr-14 text-lg bg-white rounded-2xl shadow-2xl border-2 border-transparent focus:border-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-100/50 transition-all duration-300"
 />
 <button className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors">
 <svg
 className="w-6 h-6 text-white"
 fill="none"
 stroke="currentColor"
 viewBox="0 0 24 24"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth={2}
 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
 />
 </svg>
 </button>
 </div>

 {/* Quick Links */}
 <motion.div
 variants={fadeInUp}
 className="flex flex-wrap justify-center gap-3 mt-6"
 >
 <span className="text-blue-100">Popular:</span>
 {['Password Reset', 'GST Reports', 'API Docs', 'Backup'].map((link) => (
 <button
 key={link}
 onClick={() => setSearchQuery(link)}
 className="text-white hover:text-blue-100 underline underline-offset-4 transition-colors"
 >
 {link}
 </button>
 ))}
 </motion.div>
 </motion.div>
 </motion.div>
 </div>
 </section>

 {/* Status Cards */}
 <section className="py-12 bg-gray-50 border-b">
 <div className="max-w-7xl mx-auto px-6">
 <motion.div
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true }}
 variants={staggerContainer}
 className="grid md:grid-cols-3 gap-6"
 >
 {[
 { label: 'System Status', status: 'All Systems Operational', color: 'green', icon: '✅' },
 { label: 'Response Time', status: 'Under 48 hours', color: 'blue', icon: '⏱️' },
 { label: 'Support Team', status: 'Available Mon-Sat', color: 'purple', icon: '🎧' },
 ].map((item, idx) => (
 <motion.div
 key={idx}
 variants={scaleIn}
 whileHover={{ y: -5 }}
 className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
 >
 <div className="flex items-center gap-4">
 <div className="text-3xl">{item.icon}</div>
 <div>
 <p className="text-sm text-gray-500 font-medium">{item.label}</p>
 <p className={`text-lg font-bold text-${item.color}-600`}>{item.status}</p>
 </div>
 </div>
 </motion.div>
 ))}
 </motion.div>
 </div>
 </section>

 {/* Main Content */}
 <div className="max-w-7xl mx-auto px-6 py-16">
 {/* Tabs */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="bg-gray-50 rounded-2xl p-2 mb-12"
 >
 <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
 {tabs.map((tab) => (
 <motion.button
 key={tab.id}
 onClick={() => {
 setActiveTab(tab.id);
 setFlippedGuide(null); // reset flipped card when switching tabs
 }}
 whileHover={{ scale: 1.02 }}
 whileTap={{ scale: 0.98 }}
 className={`relative p-4 rounded-xl font-semibold transition-all duration-300 ${
 activeTab === tab.id
 ? 'bg-white text-blue-600 shadow-lg'
 : 'text-gray-600 hover:text-gray-900 '
 }`}
 >
 <div className="flex items-center justify-center gap-3">
 <span className="text-2xl">{tab.icon}</span>
 <div className="text-left">
 <div className="text-sm">{tab.label}</div>
 <div className="text-xs opacity-75">{tab.count} items</div>
 </div>
 </div>
 </motion.button>
 ))}
 </div>
 </motion.div>

 {/* Tab Content */}
 <div className="min-h-[400px]">
 {activeTab === 'guides' && (
 <motion.section initial="hidden" animate="visible" variants={staggerContainer}>
 <motion.h2
 variants={fadeInUp}
 className="text-3xl font-bold text-gray-900 mb-8"
 >
 Documentation & Guides
 </motion.h2>

 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
 {filteredGuides.map((guide, idx) => {
 const isFlipped = flippedGuide === idx;
 return (
 <motion.div
 key={idx}
 variants={scaleIn}
 whileHover={{ y: -5 }}
 className="relative h-72" // adjust height as you like
 style={{ perspective: 1000 }}
 >
 <motion.div
 className="w-full h-full"
 animate={{ rotateY: isFlipped ? 180 : 0 }}
 transition={{ duration: 0.6, ease: 'easeInOut' }}
 style={{ transformStyle: 'preserve-3d' }}
 >
 {/* FRONT SIDE */}
 <div
 className="absolute inset-0 bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300"
 style={{ backfaceVisibility: 'hidden' }}
 >
 <div className="flex items-start gap-4 mb-4">
 <div className="text-3xl">{guide.icon}</div>
 <div className="flex-1">
 <h3 className="text-xl font-bold text-gray-900 mb-2">
 {guide.title}
 </h3>
 <p className="text-gray-600 text-sm mb-3">
 {guide.desc}
 </p>
 <p className="text-xs text-gray-500">{guide.time}</p>
 </div>
 </div>

 {/* Read Guide -> flip card */}
 <button
 type="button"
 onClick={() =>
 setFlippedGuide(isFlipped ? null : idx)
 }
 className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm group"
 >
 Read Guide
 <svg
 className="w-4 h-4 group-hover:translate-x-1 transition-transform"
 fill="none"
 stroke="currentColor"
 viewBox="0 0 24 24"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth={2}
 d="M9 5l7 7-7 7"
 />
 </svg>
 </button>
 </div>

 {/* BACK SIDE */}
 <div
 className="absolute inset-0 bg-white rounded-2xl p-6 shadow-lg border border-blue-200 transition-all duration-300 flex flex-col justify-between"
 style={{
 backfaceVisibility: 'hidden',
 transform: 'rotateY(180deg)',
 }}
 >
 <div>
 <div className="flex items-start gap-3 mb-3">
 <div className="text-3xl">{guide.icon}</div>
 <h3 className="text-lg font-bold text-gray-900">
 {guide.title}
 </h3>
 </div>
 <p className="text-gray-600 text-sm leading-relaxed">
 {guide.details || guide.desc}
 </p>
 </div>

 <div className="flex items-center justify-between mt-4 text-sm">
 <button
 type="button"
 onClick={() => setFlippedGuide(null)}
 className="text-gray-500 hover:text-gray-700 font-medium"
 >
 Back
 </button>

 {/* Optional: open full guide route */}
 <Link
 to={guide.href}
 className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-semibold"
 >
 Open full guide
 <svg
 className="w-4 h-4"
 fill="none"
 stroke="currentColor"
 viewBox="0 0 24 24"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth={2}
 d="M9 5l7 7-7 7"
 />
 </svg>
 </Link>
 </div>
 </div>
 </motion.div>
 </motion.div>
 );
 })}
 </div>
 </motion.section>
 )}

 {activeTab === 'faqs' && (
 <motion.section initial="hidden" animate="visible" variants={staggerContainer}>
 <motion.h2
 variants={fadeInUp}
 className="text-3xl font-bold text-gray-900 mb-8"
 >
 Frequently Asked Questions
 </motion.h2>

 <div className="grid md:grid-cols-2 gap-6">
 {filteredFaqs.map((faq, idx) => (
 <motion.div
 key={idx}
 variants={scaleIn}
 className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300"
 >
 <button
 onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
 className="w-full text-left"
 >
 <div className="flex items-start gap-4">
 <div className="text-2xl mt-1">{faq.icon}</div>
 <div className="flex-1">
 <h3 className="text-lg font-bold text-gray-900 mb-2 pr-8">
 {faq.q}
 </h3>
 <div className="inline-flex px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full">
 {faq.category}
 </div>
 </div>
 <motion.div
 animate={{ rotate: openFaq === idx ? 180 : 0 }}
 className="text-gray-400 mt-1"
 >
 <svg
 className="w-6 h-6"
 fill="none"
 stroke="currentColor"
 viewBox="0 0 24 24"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth={2}
 d="M19 9l-7 7-7-7"
 />
 </svg>
 </motion.div>
 </div>

 <motion.div
 initial={false}
 animate={{
 height: openFaq === idx ? 'auto' : 0,
 opacity: openFaq === idx ? 1 : 0,
 }}
 transition={{ duration: 0.3 }}
 className="overflow-hidden"
 >
 <p className="text-gray-600 mt-4 ml-11 leading-relaxed">
 {faq.a}
 </p>
 </motion.div>
 </button>
 </motion.div>
 ))}
 </div>
 </motion.section>
 )}

 {activeTab === 'videos' && (
 <motion.section initial="hidden" animate="visible" variants={staggerContainer}>
 <motion.h2
 variants={fadeInUp}
 className="text-3xl font-bold text-gray-900 mb-8"
 >
 Video Tutorials
 </motion.h2>

 <div className="grid md:grid-cols-3 gap-6">
 {videos.map((video, idx) => (
 <motion.div
 key={idx}
 variants={scaleIn}
 whileHover={{ y: -5 }}
 className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
 >
 <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
 <div className="text-5xl">🎥</div>
 </div>
 <div className="p-6">
 <h3 className="text-lg font-bold text-gray-900 mb-2">
 {video.title}
 </h3>
 <div className="flex items-center justify-between text-sm text-gray-500">
 <span>{video.duration}</span>
 <span>{video.views} views</span>
 </div>
 </div>
 </motion.div>
 ))}
 </div>
 </motion.section>
 )}

 {activeTab === 'community' && (
 <motion.section
 initial="hidden"
 animate="visible"
 variants={fadeInUp}
 className="text-center py-16"
 >
 <div className="text-6xl mb-6">👥</div>
 <h2 className="text-3xl font-bold text-gray-900 mb-4">
 Join Our Community
 </h2>
 <p className="text-gray-600 mb-8">
 Connect with 2,400+ users, share experiences, and get help from the community
 </p>
 <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors">
 Join Community Forum
 </button>
 </motion.section>
 )}
 </div>

 {/* CTA Section */}
 <motion.section
 initial={{ opacity: 0, y: 40 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 className="mt-24 bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-12 text-center shadow-2xl"
 >
 <h2 className="text-4xl font-bold text-white mb-4">
 Can't Find What You're Looking For?
 </h2>
 <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
 Get priority support from our expert team. We're here to help you succeed.
 </p>
 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
 <Link
 to="/contact"
 className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-xl transition-all duration-300"
 >
 Contact Support Team
 </Link>
 </motion.div>
 <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
 <a
 href="mailto:support@swordnex.com"
 className="inline-block px-8 py-4 border-2 border-white text-white font-bold rounded-xl transition-all duration-300"
 >
 support@swordnex.com
 </a>
 </motion.div>
 </div>
 </motion.section>
 </div>
 </div>
 );
};

export default SupportPage;