import React from "react";
import {
 UsersIcon,
 ChatBubbleLeftRightIcon,
 ScaleIcon,
 ShieldCheckIcon,
 AcademicCapIcon,
 ArrowTrendingUpIcon,
 HandRaisedIcon,
 CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import { Building2, Mail, Phone, MapPin } from "lucide-react";
import { Helmet } from "react-helmet";

const WorkplaceCulture = () => {
 return (
 <div className="min-h-screen bg-gray-50">

 {/* SEO */}
 <Helmet>
 <title>Workplace Culture | SwordNex Technologies</title>
 <meta
 name="description"
 content="Explore SwordNex Technologies workplace culture focused on inclusivity, ethics, innovation, employee well-being, career growth, and POSH compliance."
 />
 <meta
 name="keywords"
 content="SwordNex workplace culture, IT company culture, POSH policy, employee wellbeing, tech company ethics, SwordNex careers"
 />
 </Helmet>

 {/* Header */}
 <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-10">
 <div className="max-w-6xl mx-auto px-6 text-center">
 <Building2 className="w-14 h-14 mx-auto mb-3 opacity-90" />
 <h1 className="text-3xl lg:text-4xl font-bold mb-3">
 Workplace Culture
 </h1>
 <p className="text-base text-blue-100 max-w-3xl mx-auto">
 At SwordNex Technologies Private Limited, our workplace culture is
 driven by people-first values, ethical leadership, and purposeful
 innovation.
 </p>
 </div>
 </header>

 {/* Main */}
 <main className="max-w-6xl mx-auto px-6 py-10 space-y-5">

 {/* Intro */}
 <section>
 <p className="text-base text-gray-700 leading-relaxed">
 SwordNex Technologies Private Limited fosters a collaborative,
 inclusive, and growth-oriented workplace where individuals are
 empowered to innovate, learn, and contribute meaningfully. Our
 culture balances professional excellence with personal well-being,
 ensuring long-term success for both employees and the organization.
 </p>
 </section>

 {/* Grid */}
 <section className="grid md:grid-cols-2 gap-6">

 {/* Inclusive */}
 <div className="border border-gray-200 rounded-xl p-6 bg-white">
 <UsersIcon className="w-8 h-8 text-blue-700 mb-3" />
 <h2 className="text-lg font-bold text-blue-800 mb-2">
 Inclusive & Respectful Environment
 </h2>
 <p className="text-gray-700 text-sm mb-2">
 We promote diversity, equality, and mutual respect across all
 levels of the organization.
 </p>
 <ul className="text-gray-700 text-sm list-disc pl-5 space-y-1">
 <li>Equal opportunity workplace</li>
 <li>Zero discrimination policy</li>
 <li>Respect for individuality</li>
 </ul>
 </div>

 {/* Communication */}
 <div className="border border-gray-200 rounded-xl p-6 bg-white">
 <ChatBubbleLeftRightIcon className="w-8 h-8 text-blue-700 mb-3" />
 <h2 className="text-lg font-bold text-blue-800 mb-2">
 Open Communication & Collaboration
 </h2>
 <p className="text-gray-700 text-sm mb-2">
 Transparency and teamwork are central to our operational culture.
 </p>
 <ul className="text-gray-700 text-sm list-disc pl-5 space-y-1">
 <li>Open feedback channels</li>
 <li>Cross-team collaboration</li>
 <li>Leadership accessibility</li>
 </ul>
 </div>

 {/* Work Life */}
 <div className="border border-gray-200 rounded-xl p-6 bg-white">
 <ScaleIcon className="w-8 h-8 text-blue-700 mb-3" />
 <h2 className="text-lg font-bold text-blue-800 mb-2">
 Work-Life Balance
 </h2>
 <p className="text-gray-700 text-sm mb-2">
 We recognize the importance of personal well-being alongside
 professional commitments.
 </p>
 <ul className="text-gray-700 text-sm list-disc pl-5 space-y-1">
 <li>Flexible schedules</li>
 <li>Hybrid work support</li>
 <li>Employee wellness focus</li>
 </ul>
 </div>

 {/* Safety */}
 <div className="border border-gray-200 rounded-xl p-6 bg-white">
 <ShieldCheckIcon className="w-8 h-8 text-blue-700 mb-3" />
 <h2 className="text-lg font-bold text-blue-800 mb-2">
 Health & Safety
 </h2>
 <p className="text-gray-700 text-sm mb-2">
 A safe and compliant work environment is a top priority at
 SwordNex.
 </p>
 <ul className="text-gray-700 text-sm list-disc pl-5 space-y-1">
 <li>POSH compliance</li>
 <li>Digital wellness</li>
 <li>Emergency preparedness</li>
 </ul>
 </div>

 {/* POSH */}
 <div className="border-l-6 border-red-600 bg-red-50 rounded-xl p-6">
 <HandRaisedIcon className="w-8 h-8 text-red-700 mb-3" />
 <h2 className="text-lg font-bold text-red-800 mb-2">
 Zero Tolerance for Harassment
 </h2>
 <p className="text-gray-700 text-sm mb-2">
 SwordNex strictly enforces anti-harassment policies aligned with
 the POSH Act.
 </p>
 <ul className="text-gray-700 text-sm list-disc pl-5 space-y-1">
 <li>Confidential reporting</li>
 <li>No retaliation assurance</li>
 <li>Internal complaints committee</li>
 </ul>
 </div>

 {/* Learning */}
 <div className="border border-gray-200 rounded-xl p-6 bg-white">
 <AcademicCapIcon className="w-8 h-8 text-blue-700 mb-3" />
 <h2 className="text-lg font-bold text-blue-800 mb-2">
 Learning & Career Growth
 </h2>
 <p className="text-gray-700 text-sm mb-2">
 Continuous learning is embedded into our organizational culture.
 </p>
 <ul className="text-gray-700 text-sm list-disc pl-5 space-y-1">
 <li>Skill development programs</li>
 <li>Mentorship initiatives</li>
 <li>Career advancement paths</li>
 </ul>
 </div>

 {/* Recognition */}
 <div className="border border-gray-200 rounded-xl p-6 bg-white">
 <ArrowTrendingUpIcon className="w-8 h-8 text-blue-700 mb-3" />
 <h2 className="text-lg font-bold text-blue-800 mb-2">
 Recognition & Growth
 </h2>
 <p className="text-gray-700 text-sm mb-2">
 Performance, dedication, and innovation are consistently
 recognized.
 </p>
 <ul className="text-gray-700 text-sm list-disc pl-5 space-y-1">
 <li>Merit-based promotions</li>
 <li>Leadership opportunities</li>
 <li>Internal mobility</li>
 </ul>
 </div>

 {/* Ethics */}
 <div className="border border-gray-200 rounded-xl p-6 bg-white">
 <CheckBadgeIcon className="w-8 h-8 text-blue-700 mb-3" />
 <h2 className="text-lg font-bold text-blue-800 mb-2">
 Ethics & Integrity
 </h2>
 <p className="text-gray-700 text-sm mb-2">
 Ethical practices and transparency guide every decision we make.
 </p>
 <ul className="text-gray-700 text-sm list-disc pl-5 space-y-1">
 <li>Responsible technology</li>
 <li>Clear governance</li>
 <li>Trust-driven leadership</li>
 </ul>
 </div>

 </section>

 {/* Commitment */}
 <section className="bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center">
 <h2 className="text-xl font-bold text-blue-800 mb-3">
 Our Commitment
 </h2>
 <p className="text-gray-700 text-sm max-w-3xl mx-auto">
 SwordNex Technologies is committed to building a sustainable,
 ethical, and people-centric workplace that empowers employees and
 drives innovation.
 </p>
 </section>

 {/* Contact */}
 <section className="bg-white border border-gray-200 rounded-xl p-8">
 <h2 className="text-xl font-bold text-blue-800 text-center mb-6">
 Careers & Contact
 </h2>

 <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
 <div className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg">
 <Mail className="text-blue-700" />
 <span className="text-sm font-semibold text-blue-800">
 support@swordnex.com
 </span>
 </div>

 <div className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg">
 <Phone className="text-blue-700" />
 <span className="text-sm font-semibold text-blue-800">
 +91 94861 06953
 </span>
 </div>

 <div className="md:col-span-2 flex items-center gap-3 bg-blue-50 p-3 rounded-lg">
 <MapPin className="text-blue-700" />
 <span className="text-sm font-semibold text-blue-800">
 Kumbakonam, Tamil Nadu, India
 </span>
 </div>
 </div>
 </section>

 </main>

 {/* Footer */}
 <footer className="bg-blue-900 text-blue-200 py-6 text-center">
 <p className="text-sm">
 © 2026 SwordNex Technologies Private Limited. All rights reserved.
 </p>
 <p className="font-semibold text-sm mt-1">
 SwordNex® | People-First Innovation
 </p>
 </footer>

 </div>
 );
};

export default WorkplaceCulture;
