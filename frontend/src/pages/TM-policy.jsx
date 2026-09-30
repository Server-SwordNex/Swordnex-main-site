import React from 'react';
import { DocumentTextIcon, CheckCircleIcon, XCircleIcon, MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { LockClosedIcon } from '@heroicons/react/24/solid';
// Add this import to your TM-policy.jsx file
import { Shield, Check, Mail, Phone, MapPin } from "lucide-react";


const TrademarkGuidelines = () => {
 const scrollToTop = () => {
 window.scrollTo({ top: 0, behavior: 'smooth' });
 };

 return (
 <div className="min-h-screen bg-gray-50">
 {/* Header */}
 <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-10">
 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
 <DocumentTextIcon className="w-16 h-16 mx-auto mb-4 opacity-90" />
 <h1 className="text-3xl lg:text-4xl font-bold mb-6">Trademark Usage Guidelines</h1>
 <div className="flex flex-wrap justify-center gap-4 text-blue-100">
 <span className="bg-blue-600/50 px-6 py-2 rounded-full border border-blue-400/30">
 Last Updated: Jan 2, 2026
 </span>
 </div>
 </div>
 </header>


 {/* Main Content */}
 <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-2">
 
 <section className="py-10 max-w-6xl mx-auto px-6"> 
 <div className="bg-blue-50 border-l-8 border-blue-600 p-8 rounded-r-lg mb-16">
 <p className="text-xl text-gray-800 mb-4">
 <strong>Last Updated: January 08, 2026</strong>
 </p>
 <p className="text-lg text-gray-700">
 SwordNex Technologies Private Limited | 15C, Ravi Plaza, 60 Feet Road, Kumbakonam, Tamil Nadu 612001, India
 </p>
 </div>

 {/* INTRODUCTION */}
 <div className="mb-10">
 <h2 className="text-2xl font-bold text-blue-800 mb-8">Introduction</h2>
 <p className="text-lg text-gray-700 leading-relaxed">
 SwordNex Technologies has established strong brand recognition through its trademarks, logos, product names, and brand elements. These Trademark Usage Guidelines clarify proper usage of SwordNex Trademarks to maintain brand consistency, protect intellectual property, and prevent misuse. Anyone intending to use SwordNex Trademarks must strictly follow these guidelines unless covered by a separate written partner agreement, reseller contract, or trademark license. These guidelines apply to general public use globally.
 </p>
 </div>

 {/* DEFINITION */}
 <div className="mb-10 border border-gray-200 rounded-2xl p-12">
 <h2 className="text-2xl font-bold text-blue-800 mb-8">"SwordNex Trademarks" Definition</h2>
 <p className="text-lg text-gray-700 leading-relaxed">
 "SwordNex Trademarks" includes all names, logos, icons, taglines, product names, service marks, and brand features owned by SwordNex Technologies Private Limited and affiliates, whether registered or unregistered, across all jurisdictions worldwide. This includes but is not limited to:
 </p>
 <div className="grid md:grid-cols-2 gap-8 mt-8 text-lg">
 <div>
 <ul className="space-y-3 text-gray-700">
 <li><strong>SwordNex®</strong> - Master brand</li>
 <li><strong>SwordNex Payroll™</strong> - Payroll software</li>
 <li><strong>SwordNex HRM™</strong> - HR Management</li>
 <li><strong>SwordNex Billing™</strong> - Billing SaaS</li>
 </ul>
 </div>
 <div>
 <ul className="space-y-3 text-gray-700">
 <li>SwordNex logos and sword iconography</li>
 <li>"Precision Software Solutions" tagline</li>
 <li>Product icons and design elements</li>
 </ul>
 </div>
 </div>
 </div>

 {/* ATTRIBUTION */}
 <div className="mb-10">
 <h2 className="text-2xl font-bold text-blue-800 mb-8">Attribution Requirement</h2>
 <p className="text-lg text-gray-700 leading-relaxed">
 Every use of SwordNex Trademarks requires clear attribution notice in conspicuous locations such as website footers, documentation, presentations, or marketing materials. Use this exact format:
 </p>
 <div className="bg-gray-100 p-8 rounded-2xl mt-6 border-2 border-gray-200">
 <p className="text-xl font-mono text-gray-800">
 "SwordNex®, SwordNex Payroll™, SwordNex HRM™ are trademarks of SwordNex Technologies Private Limited."
 </p>
 </div>
 <p className="text-lg text-gray-700 leading-relaxed mt-6">
 Attribution must appear at least once per page/document, preferably near first trademark use. Failure to include proper attribution constitutes trademark misuse.
 </p>
 </div>

 {/* GENERAL RULES */}
 <div className="mb-10">
 <h2 className="text-2xl font-bold text-blue-800 mb-8">General Rules for SwordNex Trademarks</h2>
 
 <div className="grid md:grid-cols-2 gap-12">
 <div>
 <h3 className="text-xl font-bold text-green-800 mb-6">✅ DO's - Proper Usage</h3>
 <div className="space-y-4 text-lg text-gray-700">
 <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
 <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
 <div>Use as adjectives: "SwordNex Payroll™ software" (not "SwordNex Payroll that")</div>
 </div>
 <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
 <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
 <div>Maintain exact spelling/capitalization from official list</div>
 </div>
 <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
 <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
 <div>Make less prominent than your brand name</div>
 </div>
 <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
 <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
 <div>Use ™/® symbols on first use per page</div>
 </div>
 </div>
 </div>
 
 <div>
 <h3 className="text-xl font-bold text-red-800 mb-6">❌ DON'Ts - Prohibited Usage</h3>
 <div className="space-y-4 text-lg text-gray-700">
 <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
 <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
 <div>Never modify logos, colors, or proportions</div>
 </div>
 <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
 <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
 <div>No domain names: swordnexpayroll.com, swordnexhr.in</div>
 </div>
 <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
 <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
 <div>No merchandise (t-shirts, mugs) without written permission</div>
 </div>
 <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
 <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
 <div>No Google Ads using SwordNex keywords</div>
 </div>
 </div>
 </div>
 </div>
 </div>

 {/* SPECIFIC PROHIBITIONS */}
 <div className="mb-10 bg-blue-50 border-4 border-blue-300 rounded-3xl p-12">
 <h2 className="text-2xl font-bold text-blue-800 mb-8">Content Prohibitions</h2>
 <p className="text-lg text-gray-700 leading-relaxed mb-8">
 SwordNex Trademarks absolutely prohibited on websites/services containing:
 </p>
 <div className="grid md:grid-cols-2 gap-8 text-lg text-gray-700">
 <ul className="space-y-3 list-disc pl-6">
 <li>Illegal, obscene, or defamatory content</li>
 <li>Adult entertainment or gambling sites</li>
 <li>Tobacco/alcohol sales to minors</li>
 <li>Pirated software distribution</li>
 </ul>
 <ul className="space-y-3 list-disc pl-6">
 <li>Pharmaceuticals without prescriptions</li>
 <li>Financial scams or pyramid schemes</li>
 <li>Hate speech or discriminatory content</li>
 <li>Malware or phishing operations</li>
 </ul>
 </div>
 </div>

 {/* RESERVATION */}
 <div className="mb-10 border border-gray-200 rounded-2xl p-12">
 <h2 className="text-2xl font-bold text-blue-800 mb-8">Reservation of Rights</h2>
 <p className="text-lg text-gray-700 leading-relaxed mb-6">
 SwordNex Technologies Private Limited reserves ALL rights in its trademarks globally. Guideline compliance grants no ownership, license, or trademark rights beyond fair descriptive use. SwordNex may immediately revoke trademark usage permission at sole discretion and pursue legal remedies for violations including cease-and-desist notices, domain seizures, and damages under Indian Trademarks Act 1999.
 </p>
 <p className="text-lg text-gray-700 leading-relaxed font-semibold text-red-800 bg-red-50 p-6 rounded-2xl border-l-4 border-red-400">
 <strong>Violation Consequences:</strong> Account termination, legal action, trademark infringement damages, and permanent usage prohibition.
 </p>
 </div>

 {/* REPORTING */}
<div className="mb-10 bg-white border-2 border-blue-200 shadow-lg rounded-2xl p-8">
 <div className="max-w-3xl mx-auto text-center">
 <h2 className="text-2xl font-bold text-blue-800 mb-6">Report Trademark Misuse</h2>
 <p className="text-lg text-gray-700 mb-8">Found unauthorized SwordNex trademark use?</p>
 
 <div className="grid md:grid-cols-2 gap-6">
 <div>
 <div className="font-semibold text-blue-800 mb-3">Email</div>
 <a href="mailto:legal@swordnex.com" className="block p-4 bg-blue-50 border border-blue-200 rounded-xl font-bold text-blue-700 hover:bg-blue-100 hover:border-blue-300 transition-all">
 📧 legal@swordnex.com
 </a>
 </div>
 
 <div>
 <div className="font-semibold text-blue-800 mb-3">Phone</div>
 <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl font-bold text-blue-700">
 📞 +91 94861 06953
 </div>
 </div>
 </div>
 </div>
</div>


 {/* UPDATES */}
 <div className="text-center pt-12 border-t border-gray-200">
 <h2 className="text-2xl font-bold text-blue-800 mb-6">Guideline Updates</h2>
 <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
 SwordNex may update these Trademark Usage Guidelines. Continued trademark use constitutes acceptance of latest version.
 </p>
 <div className="bg-blue-50 p-8 rounded-2xl border-2 border-blue-200 inline-block">
 <p className="text-xl font-mono text-blue-800">
 SwordNex® and SwordNex Payroll™, SwordNex HRM™ are trademarks of SwordNex Technologies Private Limited.
 </p>
 </div>
 </div>
</section>



 </main>

 {/* Footer */}
 <footer className="bg-blue-900 text-blue-200 py-8 mt-16">
 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
 <p className="mb-2">© 2026 SwordNex Technologies Private Limited. All rights reserved.</p>
 <p className="font-semibold">SwordNex® | SwordNex Technologies®</p>
 </div>
 </footer>
 </div>
 );
};

export default TrademarkGuidelines;