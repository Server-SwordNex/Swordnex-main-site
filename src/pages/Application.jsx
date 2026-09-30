import React from "react";
import { ShieldCheck } from 'lucide-react';
import {
 Cookie,
 Shield,
 Clock,
 Database,
 Lock,
 Mail,
 Phone,
 MapPin,
 Check,
 Eye,
 X,
} from "lucide-react";
function Application() {
 return (
 <main className="bg-white text-gray-800">
 {/* Full Width Header */}
 <header className="w-full bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white py-10 shadow-xl border-b-4 border-blue-600 mb-0">
 <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center space-y-5">

 {/* Icon */}
 <div className="w-20 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg border border-blue-500/50">
 <ShieldCheck className="w-10 text-white opacity-90" />
 </div>

 {/* Title */}
 <div>
 <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
 Application Policy
 </h1>
 <p className="text-blue-100 text-base mt-3 font-medium">
 SwordNex Technologies Private Limited
 </p>
 </div>

 {/* Meta Info */}
 <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold text-blue-100">
 <span className="bg-blue-600/50 px-6 py-2 rounded-full border border-blue-400/30">
 Last Updated: Jan 2, 2026
 </span>
 </div>

 </div>
</header>

 {/* Content */}
 <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
 {/* Introduction */}
 <div className="bg-white border-blue-600 border rounded-2xl p-6 sm:p-8">
 <h2 className="text-xl font-semibold text-blue-700 mb-3">
 Introduction
 </h2>
 <p className="text-gray-700 leading-relaxed">
 SwordNex Technologies Private Limited, headquartered at
 <strong>
 {" "}
 15C Ravi Plaza, 60 Feet Road, Near New Bus Stand, Kumbakonam,
 Tamil Nadu 612001
 </strong>
 , develops secure and scalable custom business management software.
 </p>
 <p className="text-gray-700 leading-relaxed mt-3">
 This Application Policy applies to all SwordNex platforms including
 <strong> SwordNex Payroll™, SwordNex Billing™, and SwordNex HRM™</strong>.
 </p>
 <p className="text-gray-700 mt-3">
 <strong>Effective Date:</strong> January 7, 2026
 <br />
 <strong>Contact:</strong> +91 94861 06953 | legal@swordnex.com
 </p>
 </div>

 {/* Permitted Usage */}
 <div className="bg-blue-50 rounded-xl p-6 sm:p-8">
 <h2 className="text-xl font-semibold text-blue-700 mb-3">
 Permitted Applications Usage
 </h2>
 <ul className="list-disc pl-6 space-y-2 text-gray-700">
 <li>
 <strong>SwordNex Payroll™:</strong> Employee salary processing,
 statutory deductions, PF and ESIC compliance.
 </li>
 <li>
 <strong>SwordNex Billing™:</strong> Invoice generation, payment
 tracking, and GST-compliant reporting.
 </li>
 <li>
 <strong>SwordNex HRM™:</strong> Employee onboarding, attendance
 management, and performance reviews.
 </li>
 <li>
 Access is limited strictly to authorized users under an active
 subscription license.
 </li>
 </ul>
 </div>

 {/* Prohibited Usage */}
 <div className="bg-blue-50 rounded-xl p-6 sm:p-8">
 <h2 className="text-xl font-semibold text-blue-700 mb-3">
 Prohibited Usage
 </h2>
 <ul className="list-disc pl-6 space-y-2 text-gray-700">
 <li>
 <strong>License Violations:</strong> Credential sharing, exceeding
 permitted user limits, or unauthorized access to SwordNex systems
 and subdomains.
 </li>
 <li>
 <strong>Illegal Activities:</strong> Fraud, phishing, spam, or any
 unlawful activity using SwordNex platforms.
 </li>
 <li>
 <strong>Technical Abuse:</strong> API scraping, excessive requests,
 service disruption, or system exploitation.
 </li>
 <li>
 <strong>Competitive Misuse:</strong> Reverse engineering or
 developing competing software using SwordNex applications.
 </li>
 </ul>
 </div>

 {/* Security Commitments */}
 <div className="bg-blue-50 rounded-xl p-6 sm:p-8">
 <h2 className="text-xl font-semibold text-blue-700 mb-3">
 SwordNex Security Commitments
 </h2>
 <p className="text-gray-700 leading-relaxed">
 SwordNex applies enterprise-grade security measures including
 <strong> AES-256 encryption</strong>, role-based access controls, and
 detailed audit logs across all applications.
 </p>
 <p className="text-gray-700 leading-relaxed mt-3">
 We comply with the <strong>Indian DPDP Act, 2023</strong> and
 <strong> IT Rules, 2021</strong>. GDPR Data Processing Addendums are
 available for eligible international customers.
 </p>
 <p className="text-gray-700 mt-3">
 <strong>Data Retention:</strong> Customer data is retained for the
 duration of an active subscription and up to 90 days following
 termination unless otherwise required by law.
 </p>
 </div>

 {/* Enforcement */}
 <section className="w-full bg-white rounded-2xl shadow-xl border border-blue-200 p-8">
 <div className="max-w-5xl mx-auto">
 {/* Heading */}
 <h2 className="text-2xl sm:text-3xl font-bold mb-8 flex items-center justify-center gap-3 text-center">
 <Mail className="w-7 h-7 text-blue-600" />
 <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent py-5">
 Contact Information
 </span>
 </h2>

 {/* Content Grid */}
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-slate-800">
 {/* Left Column - Address */}
 <div className="space-y-4">
 <h3 className="text-lg font-semibold text-blue-900">
 SwordNex Technologies Private Limited
 </h3>
 <div className="flex items-start gap-3">
 <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center border border-blue-200">
 <MapPin className="w-5 h-5 text-blue-600" />
 </div>
 <p className="leading-relaxed text-slate-700">
 15C, Ravi Plaza, 60 Feet Road <br />
 Near New Bus Stand, Kumbakonam <br />
 Tamil Nadu 612001, India
 </p>
 </div>
 </div>

 {/* Right Column - Email & Phone */}
 <div className="space-y-4">
 <div className="flex items-center gap-3 bg-blue-50 px-4 py-3 rounded-xl border border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-all duration-300">
 <Mail className="w-5 h-5 text-blue-600" />
 <a
 href="mailto:privacy@swordnex.com"
 className="font-medium text-blue-800 hover:text-blue-900 font-semibold transition"
 >
 privacy@swordnex.com
 </a>
 </div>

 <div className="flex items-center gap-3 bg-blue-50 px-4 py-3 rounded-xl border border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-all duration-300">
 <Phone className="w-5 h-5 text-blue-600" />
 <a
 href="tel:+919486106953"
 className="font-medium text-blue-800 hover:text-blue-900 font-semibold transition"
 >
 +91 94861 06953
 </a>
 </div>
 </div>
 </div>
 </div>
</section>
 </section>
 <footer className="bg-blue-900 text-blue-200 py-8 mt-0">
 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
 <p className="mb-2">© 2026 SwordNex Technologies Private Limited. All rights reserved.</p>
 <p className="font-semibold">SwordNex®</p>
 </div>
 </footer>
 </main>
 );
}

export default Application;
