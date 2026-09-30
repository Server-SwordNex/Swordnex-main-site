import React from "react";
import { Link } from "react-router-dom";

const ASSETS = {
 logo: "/assets/swordnex-logo.png",
 heroIllustration: "/assets/it-training-hero.png",
 aboutImage: "/assets/about-swordnex.jpg",
 qr: "/assets/qr.png",
};

const COURSE_TRACKS = [
 {
 id: "ai-ml",
 title: "Machine Learning Course",
 shortDesc:
 "Focus on Python for AI and building intelligent models with TensorFlow",
 duration: "24 Weeks",
 mode: "Online + Offline",
 highlights: [
 "Python for AI",
 "Machine Learning Algorithms",
 "Deep Learning & Neural Networks",
 "Computer Vision",
 "NLP & Chatbots",
 "MLOps & Deployment",
 ],
 whoShould: [
 "Engineering Students",
 "Working Professionals",
 "Data Enthusiasts",
 "Career Switchers",
 ],
 // Map to specific page component
 pagePath: "/course/ai-ml",
 },
 {
 id: "app-dev",
 title: "App Development",
 shortDesc:
 "Build apps via Web Development Bootcamp concepts and cross-platform tools.",
 duration: "20 Weeks",
 mode: "Online + Offline",
 highlights: [
 "Flutter & Dart",
 "React Native",
 "iOS & Android Basics",
 "Firebase Integration",
 "App Store Deployment",
 "UI for Mobile",
 ],
 whoShould: [
 "CS Students",
 "Web Developers",
 "Entrepreneurs",
 "Tech Enthusiasts",
 ],
 pagePath: "/course/app-development",
 },
 {
 id: "data-analytics",
 title: "Data Science Course",
 shortDesc:
 "Transform data with SQL and Power BI (Top Job-Oriented IT Course).",
 duration: "16 Weeks",
 mode: "Online + Offline",
 highlights: [
 "SQL & Database",
 "Advanced Excel",
 "Power BI & Tableau",
 "Statistical Analysis",
 "Business Intelligence",
 "Data Storytelling",
 ],
 whoShould: [
 "Commerce Graduates",
 "Business Analysts",
 "Marketing Professionals",
 "Fresher Graduates",
 ],
 pagePath: "/course/data-analytics",
 },
 {
 id: "data-science",
 title: "Data Science Specialist",
 shortDesc:
 "Master Python Course for Beginners to Advanced Predictive Modeling.",
 duration: "28 Weeks",
 mode: "Online + Offline",
 highlights: [
 "Python & R Programming",
 "Statistical Modeling",
 "Predictive Analytics",
 "Big Data Tools",
 "Data Engineering",
 "Cloud Deployment",
 ],
 whoShould: [
 "Engineering Graduates",
 "Mathematics/Stats Students",
 "IT Professionals",
 "Research Scholars",
 ],
 pagePath: "/course/data-science",
 },
 {
 id: "digital-marketing",
 title: "Digital Marketing",
 shortDesc:
 "Industry-standard SEO and Meta Ads training for growth.",
 duration: "20 Weeks",
 mode: "Online + Offline",
 highlights: [
 "SEO & SEM",
 "Social Media Marketing",
 "Google & Meta Ads",
 "Content Strategy",
 "Email Marketing",
 "Marketing Analytics",
 ],
 whoShould: [
 "Marketing Students",
 "Business Owners",
 "Content Creators",
 "Career Starters",
 ],
 pagePath: "/course/digital-marketing",
 },
 {
 id: "uiux-design",
 title: "UI/UX Designing",
 shortDesc:
 "Design intuitive experiences with Figma (Part of our IT training institute).",
 duration: "18 Weeks",
 mode: "Online + Offline",
 highlights: [
 "User Research",
 "Wireframing & Prototyping",
 "Figma & Adobe XD",
 "Design Systems",
 "Usability Testing",
 "Portfolio Building",
 ],
 whoShould: [
 "Design Aspirants",
 "Graphic Designers",
 "Product Managers",
 "Creative Professionals",
 ],
 pagePath: "/course/uiux-design",
 },
 {
 id: "full-stack",
 title: "Full Stack Development Course",
 shortDesc:
 "Master MERN Stack + DevOps Training Online for complete web apps.",
 duration: "26 Weeks",
 mode: "Online + Offline",
 highlights: [
 "HTML/CSS/JavaScript",
 "React & Node.js",
 "MongoDB & SQL",
 "AWS & Cloud",
 "DevOps Basics",
 "System Design",
 ],
 whoShould: [
 "CS/IT Students",
 "Frontend Developers",
 "Backend Developers",
 "Startup Founders",
 ],
 pagePath: "/course/fullstack-development",
 },
 {
 id: "general-internship-program",
 title: "IT Internship Program",
 shortDesc:
 "Real-time projects; the Best Online Coding Course with Certificate.",
 duration: "8–12 Weeks",
 mode: "Online + Offline",
 highlights: [
 "Live Project Training",
 "Industry Mentorship",
 "Practical Work Experience",
 "Team Collaboration",
 "Communication & Soft Skills",
 "Performance Evaluation & Certificate",
 ],
 whoShould: [
 "College Students",
 "Final Year Students",
 "Fresh Graduates",
 "Career Switch Aspirants",
 ],
 pagePath: "/course/internship",
 },
];

const WHY_CHOOSE = [
 {
 title: "Industry-Aligned Curriculum",
 desc: "Every course is designed with input from hiring managers and updated quarterly to match current job market demands.",
 },
 {
 title: "Hands-On Project Experience",
 desc: "Build 10+ real-world projects for your portfolio, not just theoretical assignments that employers ignore.",
 },
 {
 title: "Dedicated Mentor Support",
 desc: "Get 1:1 guidance from industry professionals who review your code, debug with you, and prepare you for interviews.",
 },
 {
 title: "Placement Preparation",
 desc: "Resume building, mock interviews, and direct connections to our 200+ hiring partner companies across India.",
 },
 {
 title: "Flexible Learning Options",
 desc: "Choose online, offline, or hybrid modes. Weekend batches available for working professionals.",
 },
 {
 title: "Lifetime Community Access",
 desc: "Join our alumni network for continuous learning, job referrals, and industry event invitations.",
 },
];

const PLACEMENT_PROCESS = [
 "Skill Assessment & Goal Setting",
 "Portfolio & Resume Building",
 "Technical Interview Preparation",
 "Mock Interviews with Feedback",
 "Company Referrals & Applications",
 "Offer Negotiation Support",
];

function SectionTitle({ kicker, title, subtitle, light = false }) {
 return (
 <div className="text-center mb-12">
 {kicker && (
 <span
 className={`inline-block px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase mb-4 ${light ? "bg-blue-100 text-blue-800" : "bg-blue-600 text-white"
 }`}
 >
 {kicker}
 </span>
 )}
 <h2
 className={`text-3xl md:text-4xl font-bold mb-4 ${light ? "text-white" : "text-slate-900"
 }`}
 >
 {title}
 </h2>
 {subtitle && (
 <p
 className={`max-w-2xl mx-auto text-lg ${light ? "text-blue-100" : "text-slate-600"
 }`}
 >
 {subtitle}
 </p>
 )}
 </div>
 );
}

function TrackCard({ track }) {
 return (
 <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-slate-100 flex flex-col h-full">
 <div className="p-6 flex-1">
 <div className="flex items-center justify-between mb-4">
 <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
 {track.duration}
 </span>
 <span className="text-slate-500 text-sm">{track.mode}</span>
 </div>

 <h3 className="text-xl font-bold text-slate-900 mb-3">
 {track.title}
 </h3>
 <p className="text-slate-600 text-sm mb-4 leading-relaxed">
 {track.shortDesc}
 </p>

 <div className="space-y-2">
 <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
 Key Highlights
 </p>
 <div className="flex flex-wrap gap-2">
 {track.highlights.slice(0, 4).map((h) => (
 <span
 key={h}
 className="px-2 py-1 bg-slate-50 text-slate-700 text-xs rounded-md"
 >
 {h}
 </span>
 ))}
 </div>
 </div>
 </div>

 <div className="p-4 bg-slate-50 border-t border-slate-100">
 <Link
 to={track.pagePath}
 className="block w-full py-3 px-4 bg-white border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-colors duration-200 text-center no-underline"
 >
 View Details
 </Link>
 </div>
 </div>
 );
}

function WhyChooseCard({ item, index }) {
 return (
 <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-blue-600">
 <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
 <span className="text-2xl font-bold text-blue-600">
 0{index + 1}
 </span>
 </div>
 <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
 <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
 </div>
 );
}

export { COURSE_TRACKS };

export default function ProfessionalDevelopment() {
 const structuredData = {
 "@context": "https://schema.org",
 "@type": "EducationalOrganization",
 name: "SwordNex Technologies - IT Training & Skill Development",
 description:
 "Professional IT training and skill development courses in AI/ML, Data Science, Full Stack Development, UI/UX Design, Digital Marketing, and more.",
 url: "https://swordnex.com",
 telephone: "+919486106953",
 email: "support@swordnex.com",
 address: {
 "@type": "PostalAddress",
 addressCountry: "IN",
 },
 hasOfferCatalog: {
 "@type": "OfferCatalog",
 name: "IT Training Courses",
 itemListElement: COURSE_TRACKS.map((track) => ({
 "@type": "Course",
 name: track.title,
 description: track.shortDesc,
 educationalProgramMode: track.mode,
 timeToComplete: track.duration,
 })),
 },
 };

 return (
 <div className="min-h-screen bg-white">
 <script type="application/ld+json">
 {JSON.stringify(structuredData)}
 </script>

 <main>
 {/* Hero */}
 <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 lg:py-28">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="grid lg:grid-cols-2 gap-12 items-center">
 <div>
 <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
 Master In-Demand{" "}
 <span className="text-blue-600">Tech Skills</span> for Your
 Dream Career
 </h1>
 <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
 Industry-aligned IT training programs with hands-on projects,
 expert mentorship, and guaranteed placement support. Transform
 your career with SwordNex.
 </p>
 <div className="flex flex-wrap gap-4 mb-8">
 <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
 100% Placement Assistance
 </span>
 <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
 Live Projects
 </span>
 <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
 1:1 Mentoring
 </span>
 </div>
 <div className="flex flex-col sm:flex-row gap-4">
 <a
 href="#tracks"
 className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-center no-underline"
 >
 Explore Courses
 </a>
 <a
 href="#contact"
 className="px-8 py-4 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:border-blue-600 hover:text-blue-600 transition-colors text-center no-underline"
 >
 Free Career Consultation
 </a>
 </div>
 </div>
 <div className="relative">
 <img
 src="https://i.pinimg.com/736x/0b/e2/91/0be291d7d7f960283ad3796bec644293.jpg"
 alt="IT Training and Skill Development at SwordNex"
 className="w-full h-2xl rounded-2xl shadow-2xl"
 />
 <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
 <div className="flex items-center gap-3">
 <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
 <span className="text-2xl">🎓</span>
 </div>
 <div>
 <div className="font-bold text-slate-900">180+</div>
 <div className="text-sm text-slate-500">
 Students Trained
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Choose Your Track */}
 <section id="tracks" className="py-20 bg-white">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <SectionTitle
 kicker="Our Programs"
 title="Explore our Job-Oriented Online IT Courses"
 subtitle="8 specialized programs designed by industry experts. Pick the path that matches your goals and start building job-ready skills today."
 />

 <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
 {COURSE_TRACKS.map((track) => (
 <TrackCard key={track.id} track={track} />
 ))}
 </div>
 </div>
 </section>

 {/* About */}
 <section className="py-20 bg-slate-50">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="grid lg:grid-cols-2 gap-12 items-center">
 <div>
 <SectionTitle
 kicker="About Us"
 title="Building Careers Through Quality Education"
 subtitle="SwordNex Technologies has been transforming aspiring professionals into industry-ready experts since 2025."
 />
 <div className="space-y-4 text-slate-600 leading-relaxed">
 <p>
 We provide professional IT training and skill development programs designed to bridge the gap between academic learning and industry requirements. Our courses are continuously updated to match the latest technologies and market demands, with placement assistance and internship opportunities to ensure real-world career readiness.
 </p>
 <p>
 With state-of-the-art infrastructure, experienced faculty
 from top tech companies, and strong industry partnerships, we
 ensure every student receives practical, hands-on training
 that translates directly into career success.
 </p>
 <p>
 Our mission is simple: make quality tech education accessible
 and transform lives through meaningful skill development.
 Whether you are a fresher, working professional, or career
 switcher, we have the right program for you.
 </p>
 </div>
 <div className="grid grid-cols-3 gap-6 mt-8">
 <div className="text-center">
 <div className="text-3xl font-bold text-blue-600">50+</div>
 <div className="text-sm text-slate-500">
 Hiring Partners
 </div>
 </div>
 <div className="text-center">
 <div className="text-3xl font-bold text-blue-600">85%</div>
 <div className="text-sm text-slate-500">
 Placement Rate
 </div>
 </div>
 <div className="text-center">
 <div className="text-3xl font-bold text-blue-600">
 4.9/5
 </div>
 <div className="text-sm text-slate-500">
 Student Rating
 </div>
 </div>
 </div>
 </div>
 <div>
 <img
 src="https://i.pinimg.com/736x/9d/a7/d0/9da7d0b67292d9e4b2ace7bae1f74493.jpg"
 alt="SwordNex Training Center"
 className="rounded-2xl shadow-xl w-full h-auto"
 />
 </div>
 </div>
 </div>
 </section>

 {/* Why Choose */}
 <section id="why-us" className="py-20 bg-white">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <SectionTitle
 kicker="Why SwordNex"
 title="Why Choose Us for Your IT Training"
 subtitle="We go beyond traditional teaching to ensure you are truly prepared for the tech industry."
 />

 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
 {WHY_CHOOSE.map((item, index) => (
 <WhyChooseCard key={item.title} item={item} index={index} />
 ))}
 </div>
 </div>
 </section>

 {/* Placement */}
 <section id="placement" className="py-20 bg-blue-600">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <SectionTitle
 kicker="Placement Support"
 title="Your Journey to Employment"
 subtitle="Comprehensive career support from day one until you land your dream job."
 light
 />

 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
 {PLACEMENT_PROCESS.map((step, index) => (
 <div
 key={step}
 className="bg-blue-700/50 backdrop-blur-sm rounded-xl p-6 border border-blue-500"
 >
 <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-4">
 <span className="font-bold text-blue-600">
 {index + 1}
 </span>
 </div>
 <h3 className="text-lg font-semibold text-white">{step}</h3>
 </div>
 ))}
 </div>

 <div className="mt-12 text-center">
 <p className="text-blue-100 mb-6">
 Join 200+ companies that hire from SwordNex
 </p>
 <div className="flex flex-wrap justify-center gap-4 opacity-70">
 {[
 "Google",
 "Microsoft",
 "Amazon",
 "TCS",
 "Infosys",
 "Wipro",
 "Accenture",
 "Deloitte",
 ].map((company) => (
 <span
 key={company}
 className="px-4 py-2 bg-white/10 text-white rounded-lg text-sm font-medium"
 >
 {company}
 </span>
 ))}
 </div>
 </div>
 </div>
 </section>

 {/* CTA */}
 <section
 id="contact"
 className="py-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden"
 >
 <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
 <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>

 <div className="relative max-w-5xl mx-auto px-6 text-center">
 <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
 Ready to Launch Your{" "}
 <span className="text-blue-500">Tech Career?</span>
 </h2>

 <p className="mt-6 text-slate-400 text-lg max-w-2xl mx-auto">
 Speak directly with our career mentors and get clarity on the
 right course, internship opportunities, and placement roadmap.
 </p>

 <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
 <Link
 to="/course/enquiry"
 className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 no-underline"
 >
 Course Enquiry
 </Link>

 <a
 href="https://wa.me/919486106953"
 target="_blank"
 rel="noreferrer"
 className="px-8 py-4 bg-green-500 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 no-underline"
 >
 💬 Chat on WhatsApp
 </a>
 </div>

 <div className="mt-16 bg-slate-800/60 backdrop-blur-lg border border-slate-700 rounded-2xl p-8 flex flex-col sm:flex-row justify-center items-center gap-6 text-slate-300">
 <a
 href="mailto:support@swordnex.com"
 className="hover:text-white transition-colors no-underline text-slate-300"
 >
 📧 support@swordnex.com
 </a>

 <span className="hidden sm:block text-slate-600">|</span>

 <a
 href="tel:+919486106953"
 className="hover:text-white transition-colors no-underline text-slate-300"
 >
 📱 +91 94861 06953
 </a>

 <span className="hidden sm:block text-slate-600">|</span>

 <span>🕒 Mon–Sat: 9AM – 7PM</span>
 </div>
 </div>
 </section>
 </main>
 </div>
 );
}