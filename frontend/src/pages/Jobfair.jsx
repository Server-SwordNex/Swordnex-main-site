import React from "react";
import { Link } from "react-router-dom";
const MegaJobFairLanding = () => {
 return (
 <div className="bg-slate-50 text-slate-900 antialiased overflow-x-hidden">
 {/* Google Fonts - Add these to your index.html or use @import in CSS */}
 <style>
 {`
 @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
 @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
 
 body {
 font-family: 'Inter', sans-serif;
 }
 
 .material-symbols-outlined {
 font-family: 'Material Symbols Outlined';
 font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
 }
 
 @keyframes ping {
 75%, 100% {
 transform: scale(2);
 opacity: 0;
 }
 }
 
 .animate-ping {
 animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
 }
 `}
 </style>

 {/* Hero Section */}
 <section className="relative pt-12 pb-16 overflow-hidden bg-gradient-to-b from-white to-slate-50">
 {/* Decorative Background */}
 <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
 <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-3xl" />

 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
 <div className="grid lg:grid-cols-2 gap-12 items-center">

 {/* LEFT CONTENT */}
 <div className="flex flex-col gap-8">

 {/* Logo Block */}


 {/* Badge */}
 <div className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest w-fit">
 <span className="relative flex h-2 w-2">
 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-75" />
 <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
 </span>
 Registration Open
 </div>

 {/* Heading */}
 <h2 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1]">
 Mega Job Fair
 <span className="text-blue-600"> Your Career Starts Here</span>
 </h2>


 {/* Description */}
 <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
 Organized by SwordNex Technologies in association with
 Maruthupandiyar College. A premium career platform where talent
 meets opportunity.
 </p>

 {/* CTA */}
 <div className="flex flex-wrap gap-4">
 <Link
 to="/event/snmpc/feb2026"
 className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-xl shadow-blue-600/30 hover:bg-blue-700 hover:scale-[1.02] transition-all"
 >
 Apply Now
 <span className="material-symbols-outlined text-lg text-white">
 arrow_forward
 </span>
 </Link>

 <a
 href="#about"
 className="inline-flex items-center px-8 py-4 bg-white text-slate-900 border-2 border-slate-200 font-bold rounded-xl hover:border-slate-300 transition"
 >
 View Details
 </a>
 </div>

 {/* Stats */}
 <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-200">
 <div>
 <p className="text-3xl font-black text-slate-900">500+</p>
 <p className="text-sm font-semibold text-slate-500 uppercase">
 Candidates
 </p>
 </div>
 <div>
 <p className="text-3xl font-black text-slate-900">Multiple</p>
 <p className="text-sm font-semibold text-slate-500 uppercase">
 Companies
 </p>
 </div>
 <div>
 <p className="text-3xl font-black text-slate-900">On-Spot</p>
 <p className="text-sm font-semibold text-slate-500 uppercase">
 Interviews
 </p>
 </div>
 </div>
 </div>

 {/* RIGHT IMAGE */}
 <div className="relative">
 <div
 className="w-full aspect-square rounded-3xl bg-slate-200 overflow-hidden shadow-2xl"
 style={{
 backgroundImage:
 "url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60')",
 backgroundSize: 'cover',
 backgroundPosition: 'center',
 }}
 />

 {/* Overlay Card */}
 <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4">
 <div className="p-3 bg-green-500/10 text-green-600 rounded-full">
 <span className="material-symbols-outlined text-3xl">
 verified
 </span>
 </div>
 <div>
 <p className="font-bold text-slate-900">Certified Partners</p>
 <p className="text-xs text-slate-500">
 Industry-Recognized Event
 </p>
 </div>
 </div>
 </div>

 </div>
 </div>
 </section>


 {/* Partners Logos Section */}
 <div className="bg-white py-16 border-y border-slate-100">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-10">Organized By</p>
 <div className="flex flex-wrap justify-center items-center gap-12">
 <div className="flex items-center gap-4 group cursor-pointer">
 <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform">SN</div>
 <span className="font-bold text-xl text-slate-700">SwordNex Technologies</span>
 </div>
 <div className="h-12 w-[2px] bg-slate-200 rounded-full hidden md:block"></div>
 <div className="flex items-center gap-4 group cursor-pointer">
 <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg shadow-red-600/20 group-hover:scale-110 transition-transform">MC</div>
 <span className="font-bold text-xl text-slate-700">Maruthupandiyar College</span>
 </div>
 </div>
 </div>
 </div>

 {/* About Section */}
 <section className="py-24 bg-white" id="about">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="flex flex-col lg:flex-row gap-16 items-center">
 <div className="w-full lg:w-1/2">
 <div
 className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl"
 style={{
 backgroundImage: "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&auto=format&fit=crop&q=60')",
 backgroundSize: 'cover',
 backgroundPosition: 'center'
 }}
 ></div>
 </div>
 <div className="w-full lg:w-1/2 flex flex-col gap-6">
 <h2 className="text-4xl lg:text-5xl font-black text-slate-900">About the Mega Event</h2>
 <div className="w-24 h-2 bg-blue-600 rounded-full"></div>
 <p className="text-lg text-slate-600 leading-relaxed">
 The Mega Job Fair 2026 is a flagship career initiative designed to bridge the gap between academic brilliance and industrial excellence. Hosted at the prestigious Maruthupandiyar College, this event brings together the most innovative tech firms and corporate giants under one roof.
 </p>
 <p className="text-lg text-slate-600 leading-relaxed">
 SwordNex Technologies is committed to discovering and nurturing the next generation of talent. Whether you are a fresh graduate or an experienced professional looking for a change, this fair provides a direct pathway to your dream role.
 </p>
 <div className="grid grid-cols-2 gap-6 pt-6">
 <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
 <span className="material-symbols-outlined text-blue-600 text-3xl">groups</span>
 <div>
 <p className="font-bold text-slate-900">Community Focus</p>
 <p className="text-sm text-slate-500">Helping local talent flourish.</p>
 </div>
 </div>
 <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
 <span className="material-symbols-outlined text-blue-600 text-3xl">psychology</span>
 <div>
 <p className="font-bold text-slate-900">Skill First</p>
 <p className="text-sm text-slate-500">Showcasing real capabilities.</p>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Purpose Section */}
 <section className="py-24 bg-slate-50" id="purpose">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="text-center mb-16">
 <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mb-6">Event Purpose & Goals</h2>
 <p className="text-lg text-slate-500 max-w-2xl mx-auto">Our mission is to create a seamless ecosystem where recruitment is efficient, transparent, and rewarding for both parties.</p>
 </div>
 <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
 {/* Card 1 */}
 <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
 <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
 <span className="material-symbols-outlined text-3xl">work</span>
 </div>
 <h3 className="text-xl font-bold mb-3 text-slate-900">Direct Job Opportunities</h3>
 <p className="text-slate-500 text-sm leading-relaxed">Skip the long online queues and get hired on the spot by top-tier companies across multiple industries.</p>
 </div>

 {/* Card 2 */}
 <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
 <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
 <span className="material-symbols-outlined text-3xl">handshake</span>
 </div>
 <h3 className="text-xl font-bold mb-3 text-slate-900">Recruiter Connections</h3>
 <p className="text-slate-500 text-sm leading-relaxed">Meet and network directly with HR leaders and decision-makers from leading organizations.</p>
 </div>

 {/* Card 3 */}
 <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
 <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
 <span className="material-symbols-outlined text-3xl">trending_up</span>
 </div>
 <h3 className="text-xl font-bold mb-3 text-slate-900">Skill-Building</h3>
 <p className="text-slate-500 text-sm leading-relaxed">Learn about the current market demands and the specific industry skillsets required for future growth.</p>
 </div>

 {/* Card 4 */}
 <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
 <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
 <span className="material-symbols-outlined text-3xl">school</span>
 </div>
 <h3 className="text-xl font-bold mb-3 text-slate-900">Academia-Industry</h3>
 <p className="text-slate-500 text-sm leading-relaxed">Bridging the gap between college education and professional expectations for a better career future.</p>
 </div>
 </div>
 </div>
 </section>

 {/* Highlights Section */}
 <section className="py-24 bg-white" id="highlights">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-6">
 <div>
 <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mb-4">Event Highlights</h2>
 <p className="text-lg text-slate-500 max-w-xl">Don't miss out on these exclusive features designed to accelerate your hiring process and career development.</p>
 </div>
 <div className="flex gap-2">
 <div className="h-1.5 w-16 bg-blue-600 rounded-full"></div>
 <div className="h-1.5 w-6 bg-blue-600/30 rounded-full"></div>
 <div className="h-1.5 w-6 bg-blue-600/30 rounded-full"></div>
 </div>
 </div>
 <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
 <div className="flex flex-col items-center text-center group">
 <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center mb-6 text-blue-600 border-2 border-slate-100 group-hover:border-blue-600 group- transition-all">
 <span className="material-symbols-outlined text-5xl">record_voice_over</span>
 </div>
 <h4 className="font-bold text-xl mb-3 text-slate-900">HR Panel Interviews</h4>
 <p className="text-sm text-slate-500 leading-relaxed">Face-to-face interactions with multiple panel experts in one day.</p>
 </div>
 <div className="flex flex-col items-center text-center group">
 <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center mb-6 text-blue-600 border-2 border-slate-100 group-hover:border-blue-600 group- transition-all">
 <span className="material-symbols-outlined text-5xl">assignment_turned_in</span>
 </div>
 <h4 className="font-bold text-xl mb-3 text-slate-900">Skill Screening</h4>
 <p className="text-sm text-slate-500 leading-relaxed">On-the-spot technical assessments to validate your professional expertise.</p>
 </div>
 <div className="flex flex-col items-center text-center group">
 <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center mb-6 text-blue-600 border-2 border-slate-100 group-hover:border-blue-600 group- transition-all">
 <span className="material-symbols-outlined text-5xl">badge</span>
 </div>
 <h4 className="font-bold text-xl mb-3 text-slate-900">Full-Time Roles</h4>
 <p className="text-sm text-slate-500 leading-relaxed">Immediate openings for both internship positions and full-time career roles.</p>
 </div>
 <div className="flex flex-col items-center text-center group">
 <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center mb-6 text-blue-600 border-2 border-slate-100 group-hover:border-blue-600 group- transition-all">
 <span className="material-symbols-outlined text-5xl">model_training</span>
 </div>
 <h4 className="font-bold text-xl mb-3 text-slate-900">Career Guidance</h4>
 <p className="text-sm text-slate-500 leading-relaxed">Free mentorship sessions with industry veterans to map your success journey.</p>
 </div>
 </div>
 </div>
 </section>

 {/* Event Details Section */}
 <section className="py-24 bg-slate-50">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="grid lg:grid-cols-2 gap-12">
 {/* Date & Time Card */}
 <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
 <div className="flex items-center gap-4 mb-6">
 <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center text-white">
 <span className="material-symbols-outlined text-3xl">calendar_month</span>
 </div>
 <h3 className="text-2xl font-bold text-slate-900">Event Schedule</h3>
 </div>
 <div className="space-y-4">
 <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
 <span className="font-semibold text-slate-700">Date</span>
 <span className="font-bold text-blue-600">January 25-26, 2026</span>
 </div>
 <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
 <span className="font-semibold text-slate-700">Time</span>
 <span className="font-bold text-blue-600">9:00 AM - 5:00 PM</span>
 </div>
 <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
 <span className="font-semibold text-slate-700">Registration</span>
 <span className="font-bold text-green-600">Open Now</span>
 </div>
 </div>
 </div>

 {/* Venue Card */}
 <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
 <div className="flex items-center gap-4 mb-6">
 <div className="w-14 h-14 bg-red-600 rounded-xl flex items-center justify-center text-white">
 <span className="material-symbols-outlined text-3xl">location_on</span>
 </div>
 <h3 className="text-2xl font-bold text-slate-900">Event Venue</h3>
 </div>
 <div className="space-y-4">
 <div className="p-4 bg-slate-50 rounded-xl">
 <p className="font-bold text-slate-900 text-lg">Maruthupandiyar College</p>
 <p className="text-slate-500 mt-1">Vallam, Thanjavur District</p>
 <p className="text-slate-500">Tamil Nadu, India</p>
 </div>
 <div className="flex items-center gap-2 text-blue-600 font-semibold cursor-pointer hover:underline">
 <span className="material-symbols-outlined">map</span>
 <span>View on Google Maps</span>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Eligibility Section */}
 <section className="py-24 bg-white">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="text-center mb-16">
 <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mb-6">Who Can Apply?</h2>
 <p className="text-lg text-slate-500 max-w-2xl mx-auto">Check if you meet the eligibility criteria for the Mega Job Fair 2026</p>
 </div>
 <div className="grid md:grid-cols-3 gap-8">
 <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border border-blue-100">
 <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white mx-auto mb-6">
 <span className="material-symbols-outlined text-4xl">school</span>
 </div>
 <h4 className="text-xl font-bold text-slate-900 mb-3">Fresh Graduates</h4>
 <p className="text-slate-600">2024, 2025, 2026 batch students from any recognized university</p>
 </div>
 <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl border border-green-100">
 <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center text-white mx-auto mb-6">
 <span className="material-symbols-outlined text-4xl">engineering</span>
 </div>
 <h4 className="text-xl font-bold text-slate-900 mb-3">Engineering Students</h4>
 <p className="text-slate-600">B.Tech, B.E, MCA, M.Tech, BCA, B.Sc (CS/IT) candidates</p>
 </div>
 <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-violet-50 rounded-3xl border border-purple-100">
 <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center text-white mx-auto mb-6">
 <span className="material-symbols-outlined text-4xl">workspace_premium</span>
 </div>
 <h4 className="text-xl font-bold text-slate-900 mb-3">Experience Holders</h4>
 <p className="text-slate-600">Professionals with 0-3 years of relevant industry experience</p>
 </div>
 </div>
 </div>
 </section>

 {/* Final CTA Section */}
 <section className="py-24 px-4">
 <div className="max-w-7xl mx-auto">
 <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[2.5rem] p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl">
 {/* Background Pattern */}
 <div
 className="absolute inset-0 opacity-10"
 style={{
 backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
 backgroundSize: '40px 40px'
 }}
 ></div>

 <div className="relative z-10 flex flex-col items-center gap-8">
 <h2 className="text-4xl lg:text-6xl font-black text-white max-w-3xl leading-tight">
 Ready to Take the Next Step in Your Career?
 </h2>
 <p className="text-white/80 text-lg lg:text-xl max-w-xl">
 Don't miss this opportunity to showcase your talent to the best in the industry. Spaces are filling up fast!
 </p>
 <div className="flex flex-col sm:flex-row gap-4 mt-4">
 <Link to="/event/snmpc/feb2026"><button className="px-12 py-5 bg-white text-blue-800 font-black text-lg rounded-2xl hover:scale-105 transition-transform shadow-lg hover:shadow-xl">
 Apply for Mega Job Fair
 </button>
 </Link>
 </div>
 <div className="flex items-center gap-2 text-white/70 text-sm mt-4 font-medium">
 <span className="material-symbols-outlined text-sm">schedule</span>
 Registration closes soon. Secure your spot today!
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Contact Section */}
 <section className="py-16 bg-slate-900 text-white">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="grid md:grid-cols-3 gap-8 text-center">
 <div className="flex flex-col items-center gap-3">
 <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center">
 <span className="material-symbols-outlined text-2xl">mail</span>
 </div>
 <h4 className="font-bold text-lg">Email Us</h4>
 <p className="text-slate-400">careers@swordnex.com</p>
 </div>
 <div className="flex flex-col items-center gap-3">
 <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center">
 <span className="material-symbols-outlined text-2xl">call</span>
 </div>
 <h4 className="font-bold text-lg">Call Us</h4>
 <p className="text-slate-400">+91 98765 43210</p>
 </div>
 <div className="flex flex-col items-center gap-3">
 <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center">
 <span className="material-symbols-outlined text-2xl">location_on</span>
 </div>
 <h4 className="font-bold text-lg">Visit Us</h4>
 <p className="text-slate-400">Maruthupandiyar College, Vallam, Thanjavur</p>
 </div>
 </div>
 <div className="text-center mt-12 pt-8 border-t border-slate-800">
 <p className="text-slate-500 text-sm">© 2026 Mega Job Fair. Organized by SwordNex Technologies & Maruthupandiyar College. All rights reserved.</p>
 </div>
 </div>
 </section>
 </div>
 );
};

export default MegaJobFairLanding;