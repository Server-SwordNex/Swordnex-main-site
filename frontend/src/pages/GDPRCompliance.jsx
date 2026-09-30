// import React from "react";

// export default function GDPRComplianceStatement() {
// const theme = {
// page: "min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-blue-950 text-slate-100",
// container: "mx-auto max-w-5xl px-6 py-12",
// card: "rounded-2xl border border-blue-900/40 bg-slate-950/40 shadow-[0_0_0_1px_rgba(30,58,138,0.15)] backdrop-blur",
// headerWrap:
// "rounded-2xl border border-blue-900/40 bg-gradient-to-r from-blue-950/60 via-slate-950/60 to-slate-950/60 p-8",
// badge:
// "inline-flex items-center rounded-full border border-blue-800/50 bg-blue-950/40 px-3 py-1 text-xs font-medium text-blue-200",
// h1: "mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl",
// sub: "mt-2 text-sm text-slate-300",
// section: "p-8 md:p-10",
// h2: "text-xl font-semibold text-white",
// p: "mt-3 text-slate-200 leading-relaxed",
// list: "mt-3 space-y-2 text-slate-200",
// li: "flex gap-3",
// dot: "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400",
// divider: "my-8 border-t border-blue-900/40",
// tableWrap:
// "mt-4 overflow-hidden rounded-xl border border-blue-900/40 bg-slate-950/40",
// table: "w-full border-collapse text-left text-sm",
// th: "bg-blue-950/50 px-4 py-3 font-semibold text-blue-100",
// td: "border-t border-blue-900/30 px-4 py-3 text-slate-200 align-top",
// callout:
// "mt-4 rounded-xl border border-blue-900/40 bg-blue-950/30 p-5 text-slate-200",
// link: "text-blue-300 hover:text-blue-200 underline underline-offset-4",
// footer:
// "mt-10 rounded-2xl border border-blue-900/40 bg-slate-950/40 p-8 text-slate-200",
// small: "text-sm text-slate-300",
// label: "text-xs uppercase tracking-wide text-slate-400",
// code:
// "rounded-md border border-blue-900/40 bg-slate-950/60 px-2 py-0.5 font-mono text-[0.85em] text-blue-200",
// };

// return (
// <div className={theme.page}>
// <div className={theme.container}>
// <div className={theme.card}>
// <header className={theme.headerWrap}>
// <span className={theme.badge}>Compliance</span>
// <h1 className={theme.h1}>SwordNex Technologies GDPR Compliance Statement</h1>
// <p className={theme.sub}>
// <span className="text-slate-300">Posted:</span>{" "}
// <span className="text-slate-100">January 7, 2026</span>
// <span className="mx-2 text-slate-600">•</span>
// <span className="text-slate-300">Effective:</span>{" "}
// <span className="text-slate-100">January 7, 2026</span>
// </p>
// </header>

// <main className={theme.section}>
// <section>
// <h2 className={theme.h2}>Our Commitment to Global Privacy Standards</h2>
// <p className={theme.p}>
// SwordNex Technologies Private Limited respects international data protection
// standards, including the EU General Data Protection Regulation (GDPR).
// Although based in India and primarily serving Indian businesses, we align
// our practices with GDPR principles for global compliance.
// </p>
// </section>

// <hr className={theme.divider} />

// <section>
// <h2 className={theme.h2}>Why GDPR Matters to Us</h2>
// <p className={theme.p}>
// We serve international clients and prioritize data protection beyond Indian
// DPDP Act 2023 requirements. This statement outlines our GDPR-aligned
// practices.
// </p>
// </section>

// <hr className={theme.divider} />

// <section>
// <h2 className={theme.h2}>Data Processing Principles</h2>
// <p className={theme.p}>SwordNex follows GDPR core principles:</p>
// <ul className={theme.list}>
// <li className={theme.li}>
// <span className={theme.dot} />
// <span>Lawfulness, fairness, transparency</span>
// </li>
// <li className={theme.li}>
// <span className={theme.dot} />
// <span>Purpose limitation (business inquiries only)</span>
// </li>
// <li className={theme.li}>
// <span className={theme.dot} />
// <span>Data minimization (essential info only)</span>
// </li>
// <li className={theme.li}>
// <span className={theme.dot} />
// <span>Accuracy</span>
// </li>
// <li className={theme.li}>
// <span className={theme.dot} />
// <span>Storage limitation (24 months max)</span>
// </li>
// <li className={theme.li}>
// <span className={theme.dot} />
// <span>Integrity and confidentiality</span>
// </li>
// </ul>
// </section>

// <hr className={theme.divider} />

// <section>
// <h2 className={theme.h2}>Your GDPR Rights</h2>
// <p className={theme.p}>
// EU/EEA users enjoy full GDPR rights:
// </p>

// <div className={theme.tableWrap}>
// <table className={theme.table}>
// <thead>
// <tr>
// <th className={theme.th}>Right</th>
// <th className={theme.th}>Description</th>
// <th className={theme.th}>How to Exercise</th>
// </tr>
// </thead>
// <tbody>
// <tr>
// <td className={theme.td}>Access</td>
// <td className={theme.td}>View your personal data</td>
// <td className={theme.td}>
// Email{" "}
// <a className={theme.link} href="mailto:privacy@swordnex.com">
// privacy@swordnex.com
// </a>
// </td>
// </tr>
// <tr>
// <td className={theme.td}>Rectification</td>
// <td className={theme.td}>Correct inaccurate data</td>
// <td className={theme.td}>
// Email{" "}
// <a className={theme.link} href="mailto:privacy@swordnex.com">
// privacy@swordnex.com
// </a>
// </td>
// </tr>
// <tr>
// <td className={theme.td}>Erasure</td>
// <td className={theme.td}>
// Delete your data (<span className="text-slate-100">
// &quot;right to be forgotten&quot;
// </span>)
// </td>
// <td className={theme.td}>
// Email{" "}
// <a className={theme.link} href="mailto:privacy@swordnex.com">
// privacy@swordnex.com
// </a>
// </td>
// </tr>
// <tr>
// <td className={theme.td}>Restriction</td>
// <td className={theme.td}>Limit processing</td>
// <td className={theme.td}>
// Email{" "}
// <a className={theme.link} href="mailto:privacy@swordnex.com">
// privacy@swordnex.com
// </a>
// </td>
// </tr>
// <tr>
// <td className={theme.td}>Portability</td>
// <td className={theme.td}>Receive data in structured format</td>
// <td className={theme.td}>
// Email{" "}
// <a className={theme.link} href="mailto:privacy@swordnex.com">
// privacy@swordnex.com
// </a>
// </td>
// </tr>
// <tr>
// <td className={theme.td}>Object</td>
// <td className={theme.td}>Oppose processing</td>
// <td className={theme.td}>
// Email{" "}
// <a className={theme.link} href="mailto:privacy@swordnex.com">
// privacy@swordnex.com
// </a>
// </td>
// </tr>
// </tbody>
// </table>
// </div>
// </section>

// <hr className={theme.divider} />

// <section>
// <h2 className={theme.h2}>Legal Basis for Processing</h2>
// <ul className={theme.list}>
// <li className={theme.li}>
// <span className={theme.dot} />
// <span>
// <span className="text-slate-100">Legitimate Interest:</span>{" "}
// Business inquiries, service delivery
// </span>
// </li>
// <li className={theme.li}>
// <span className={theme.dot} />
// <span>
// <span className="text-slate-100">Contract:</span> Service agreements
// </span>
// </li>
// <li className={theme.li}>
// <span className={theme.dot} />
// <span>
// <span className="text-slate-100">Legal Obligation:</span> DPDP Act
// compliance
// </span>
// </li>
// </ul>
// </section>

// <hr className={theme.divider} />

// <section>
// <h2 className={theme.h2}>Data Transfers</h2>
// <p className={theme.p}>
// All data stored and processed in India only. No EU-US transfers. India
// deemed adequate by EU Commission for data transfers.
// </p>
// <div className={theme.callout}>
// <p className="leading-relaxed">
// Note: The “EU adequacy” status mentioned above is presented here exactly
// as provided in your statement. If you want, I can adjust this line to a
// more neutral phrasing that doesn’t assert adequacy status.
// </p>
// </div>
// </section>

// <hr className={theme.divider} />

// <section>
// <h2 className={theme.h2}>Data Protection Officer</h2>
// <div className="mt-4 rounded-xl border border-blue-900/40 bg-slate-950/40 p-6">
// <div className="grid gap-4 md:grid-cols-2">
// <div>
// <div className={theme.label}>Name</div>
// <div className="mt-1 text-slate-100">Privacy Officer</div>
// </div>
// <div>
// <div className={theme.label}>Email</div>
// <div className="mt-1">
// <a className={theme.link} href="mailto:privacy@swordnex.com">
// privacy@swordnex.com
// </a>
// </div>
// </div>
// <div className="md:col-span-2">
// <div className={theme.label}>Address</div>
// <div className="mt-1 text-slate-200">
// 15C, Ravi Plaza, 60 Feet Road, Near New Bus Stand, Kumbakonam, Tamil
// Nadu 612001, India
// </div>
// </div>
// </div>
// </div>
// </section>

// <hr className={theme.divider} />

// <section>
// <h2 className={theme.h2}>EU Representative</h2>
// <p className={theme.p}>
// SwordNex designates{" "}
// <span className={theme.code}>[EU-REP-CONTACT]</span> as EU representative
// for GDPR matters (if serving EU clients directly).
// </p>
// </section>

// <hr className={theme.divider} />

// <section>
// <h2 className={theme.h2}>Security Measures</h2>
// <p className={theme.p}>
// GDPR Article 32 compliant:
// </p>
// <ul className={theme.list}>
// <li className={theme.li}>
// <span className={theme.dot} />
// <span>HTTPS/TLS 1.3 encryption</span>
// </li>
// <li className={theme.li}>
// <span className={theme.dot} />
// <span>Multi-Factor Authentication</span>
// </li>
// <li className={theme.li}>
// <span className={theme.dot} />
// <span>Role-Based Access Control</span>
// </li>
// <li className={theme.li}>
// <span className={theme.dot} />
// <span>Regular security audits</span>
// </li>
// <li className={theme.li}>
// <span className={theme.dot} />
// <span>Data encryption at rest</span>
// </li>
// </ul>
// </section>

// <hr className={theme.divider} />

// <section>
// <h2 className={theme.h2}>Data Breach Notification</h2>
// <p className={theme.p}>
// Notify affected EU users within 72 hours per GDPR Article 34.
// </p>
// </section>

// <hr className={theme.divider} />

// <section>
// <h2 className={theme.h2}>Third-Party Processors</h2>
// <p className={theme.p}>
// Service providers under strict Data Processing Agreements (DPAs):
// </p>
// <ul className={theme.list}>
// <li className={theme.li}>
// <span className={theme.dot} />
// <span>Website hosting (India)</span>
// </li>
// <li className={theme.li}>
// <span className={theme.dot} />
// <span>Email services (India)</span>
// </li>
// <li className={theme.li}>
// <span className={theme.dot} />
// <span>No US/EU cloud providers</span>
// </li>
// </ul>
// </section>

// <hr className={theme.divider} />

// <section>
// <h2 className={theme.h2}>Cookies &amp; Tracking</h2>
// <p className={theme.p}>
// Essential cookies only. No analytics/marketing cookies. GDPR-compliant
// banner-free approach.
// </p>
// </section>

// <hr className={theme.divider} />

// <section>
// <h2 className={theme.h2}>Complaints Process</h2>
// <ul className={theme.list}>
// <li className={theme.li}>
// <span className={theme.dot} />
// <span>
// Contact{" "}
// <a className={theme.link} href="mailto:privacy@swordnex.com">
// privacy@swordnex.com
// </a>{" "}
// (response within 72 hours)
// </span>
// </li>
// <li className={theme.li}>
// <span className={theme.dot} />
// <span>Escalate to Data Protection Officer</span>
// </li>
// <li className={theme.li}>
// <span className={theme.dot} />
// <span>
// EU users: Contact EU supervisory authority or our EU representative
// </span>
// </li>
// </ul>
// </section>

// <hr className={theme.divider} />

// <section>
// <h2 className={theme.h2}>Governing Law</h2>
// <p className={theme.p}>
// Indian law applies. EU users retain GDPR rights regardless of jurisdiction.
// </p>
// </section>

// <section className={theme.footer}>
// <h2 className="text-xl font-semibold text-white">Contact Information</h2>

// <div className="mt-5 grid gap-6 md:grid-cols-2">
// <div>
// <div className={theme.label}>Data Protection Officer</div>
// <div className="mt-2 text-slate-100">
// SwordNex Technologies Private Limited
// </div>
// <div className="mt-2 text-slate-200">
// 15C, Ravi Plaza, 60 Feet Road
// <br />
// Kumbakonam, Tamil Nadu 612001, India
// </div>
// </div>

// <div>
// <div className={theme.label}>Reach us</div>
// <div className="mt-2 space-y-2">
// <div>
// <span className="text-slate-300">Email:</span>{" "}
// <a className={theme.link} href="mailto:privacy@swordnex.com">
// privacy@swordnex.com
// </a>
// </div>
// <div>
// <span className="text-slate-300">Phone:</span>{" "}
// <a className={theme.link} href="tel:+919486106953">
// +91 94861 06953
// </a>
// </div>
// <div className={theme.small}>
// <span className="text-slate-300">Hours:</span> 9 AM - 6 PM IST
// </div>
// </div>
// </div>
// </div>

// <div className="mt-6 text-sm text-slate-300">
// Last Updated: <span className="text-slate-100">January 7, 2026</span>
// </div>
// </section>
// </main>
// </div>
// </div>
// </div>
// );
// }
import React from "react";
import { Shield, Check, Mail, Phone, MapPin } from "lucide-react";

const GDPRComplianceStatement = () => {
 const gdprRights = [
 {
 right: "Access",
 description: "View your personal data",
 how: "Email privacy@swordnex.com"
 },
 {
 right: "Rectification",
 description: "Correct inaccurate data",
 how: "Email privacy@swordnex.com"
 },
 {
 right: "Erasure",
 description: 'Delete your data ("right to be forgotten")',
 how: "Email privacy@swordnex.com"
 },
 {
 right: "Restriction",
 description: "Limit processing",
 how: "Email privacy@swordnex.com"
 },
 {
 right: "Portability",
 description: "Receive data in structured format",
 how: "Email privacy@swordnex.com"
 },
 {
 right: "Object",
 description: "Oppose processing",
 how: "Email privacy@swordnex.com"
 }
 ];

 const securityMeasures = [
 "HTTPS/TLS 1.3 encryption",
 "Multi-Factor Authentication",
 "Role-Based Access Control",
 "Regular security audits",
 "Data encryption at rest"
 ];

 return (
 <div className="min-h-screen bg-white text-slate-800">
 {/* 🔹 Full-width Blue Header */}
 <header className="w-full bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white py-12 shadow-xl border-b-4 border-blue-700">
 <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center space-y-6">
 
 {/* Icon Row */}
 <div className="w-20 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg border border-blue-500/50">
 <Shield className="w-10 text-white opacity-90" />
 </div>
 
 {/* Heading Row */}
 <div>
 <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
 GDPR Compliance Statement
 </h1>
 <p className="text-blue-100 text-base mt-3 font-medium">
 SwordNex Technologies Private Limited
 </p>
 </div>

 {/* Dates Row */}
 <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm font-medium text-blue-100">
 <span className="bg-blue-600/50 px-6 py-2 rounded-full border border-blue-400/30">
 Last Updated: Jan 2, 2026
 </span>
 </div>
 </div>
</header>


 {/* 🔹 Main Content */}
 <main className="max-w-6xl mx-auto px-6 py-12 space-y-10">
 {/* Section 1 - Commitment */}
 <section className="p-6 bg-white rounded-xl shadow border border-blue-100">
 <h2 className="text-xl font-semibold text-blue-800 mb-3 flex items-center gap-2">
 <Shield className="w-5 h-5 text-blue-600" /> Our Commitment to Global Privacy Standards
 </h2>
 <p className="text-slate-700 leading-relaxed">
 SwordNex Technologies Private Limited respects international data protection standards, including the EU General Data Protection Regulation (GDPR). Although based in India and primarily serving Indian businesses, we align our practices with GDPR principles for global compliance.
 </p>
 </section>

 {/* Section 2 - Why GDPR Matters */}
 <section className="p-6 bg-white rounded-xl shadow border border-blue-100">
 <h2 className="text-xl font-semibold text-blue-800 mb-3 flex items-center gap-2">
 <Shield className="w-5 h-5 text-blue-600" /> Why GDPR Matters to Us
 </h2>
 <p className="text-slate-700 leading-relaxed">
 We serve international clients and prioritize data protection beyond Indian DPDP Act 2023 requirements. This statement outlines our GDPR-aligned practices.
 </p>
 </section>

 {/* Section 3 - Data Processing Principles */}
 <section className="p-6 bg-white rounded-xl shadow border border-blue-100">
 <h2 className="text-xl font-semibold text-blue-800 mb-3 flex items-center gap-2">
 <Shield className="w-5 h-5 text-blue-600" /> Data Processing Principles
 </h2>
 <ul className="list-disc pl-6 text-slate-700 space-y-2">
 <li>Lawfulness, fairness, transparency</li>
 <li>Purpose limitation (business inquiries only)</li>
 <li>Data minimization (essential info only)</li>
 <li>Accuracy</li>
 <li>Storage limitation (24 months max)</li>
 <li>Integrity and confidentiality</li>
 </ul>
 </section>

 {/* Section 4 - GDPR Rights Table */}
 <section className="p-6 bg-white rounded-xl shadow border border-blue-100">
 <h2 className="text-xl font-semibold text-blue-800 mb-6 flex items-center gap-2">
 <Check className="w-5 h-5 text-blue-600" /> Your GDPR Rights
 </h2>
 <div className="overflow-x-auto">
 <table className="w-full text-sm">
 <thead>
 <tr className="bg-blue-50 border-b-2 border-blue-200">
 <th className="text-left p-4 font-semibold text-blue-800">Right</th>
 <th className="text-left p-4 font-semibold text-blue-800">Description</th>
 <th className="text-left p-4 font-semibold text-blue-800">How to Exercise</th>
 </tr>
 </thead>
 <tbody>
 {gdprRights.map((item, index) => (
 <tr key={index} className="border-b border-blue-100 ">
 <td className="p-4 font-semibold text-blue-700">{item.right}</td>
 <td className="p-4 text-slate-700">{item.description}</td>
 <td className="p-4">
 <a href="mailto:privacy@swordnex.com" className="text-blue-600 font-semibold hover:text-blue-800">
 Email privacy@swordnex.com
 </a>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 <p className="mt-4 text-sm text-slate-600 italic">
 EU/EEA users enjoy full GDPR rights
 </p>
 </section>

 {/* Section 5 - Legal Basis */}
 <section className="p-6 bg-white rounded-xl shadow border border-blue-100">
 <h2 className="text-xl font-semibold text-blue-800 mb-3 flex items-center gap-2">
 <Shield className="w-5 h-5 text-blue-600" /> Legal Basis for Processing
 </h2>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
 <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
 <h4 className="font-semibold text-blue-800 mb-2">Legitimate Interest</h4>
 <p className="text-sm text-slate-700">Business inquiries, service delivery</p>
 </div>
 <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
 <h4 className="font-semibold text-blue-800 mb-2">Contract</h4>
 <p className="text-sm text-slate-700">Service agreements</p>
 </div>
 <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
 <h4 className="font-semibold text-blue-800 mb-2">Legal Obligation</h4>
 <p className="text-sm text-slate-700">DPDP Act compliance</p>
 </div>
 </div>
 </section>

 {/* Section 6 - Data Transfers & Security */}
 <section className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg border-2 border-blue-100">
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
 <div>
 <h2 className="text-xl font-semibold text-blue-800 mb-4">Data Transfers</h2>
 <p className="text-slate-700 mb-4">
 All data stored and processed in <strong>India only</strong>. No EU-US transfers. 
 India deemed adequate by EU Commission for data transfers.
 </p>
 <h3 className="font-semibold text-blue-800 mb-3">Security Measures</h3>
 <p className="text-sm text-slate-600 mb-4">GDPR Article 32 compliant:</p>
 <ul className="space-y-2 text-slate-700">
 {securityMeasures.map((item, index) => (
 <li key={index} className="flex items-center gap-2">
 <span className="w-5 h-5 text-green-600 font-bold">✓</span>
 {item}
 </li>
 ))}
 </ul>
 </div>
 <div>
 <h3 className="text-lg font-semibold text-blue-800 mb-4">Data Protection Officer</h3>
 <div className="bg-white p-6 rounded-xl shadow-sm border">
 <p className="font-semibold mb-2">Name: Privacy Officer</p>
 <p className="mb-4">
 <a href="mailto:privacy@swordnex.com" className="text-blue-600 font-semibold">
 privacy@swordnex.com
 </a>
 </p>
 <p className="text-sm text-slate-700 mb-4">
 15C, Ravi Plaza, 60 Feet Road<br/>
 Near New Bus Stand, Kumbakonam<br/>
 Tamil Nadu 612001, India
 </p>
 </div>
 </div>
 </div>
 </section>

 

 {/* Section 8 - Additional Info */}
 <section className="p-5 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl shadow border border-blue-100">
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 <div className="text-center p-6">
 <h4 className="font-semibold text-blue-800 mb-2">Data Breach Notification</h4>
 <p className="text-sm text-slate-700">Notify affected EU users within 72 hours per GDPR Article 34.</p>
 </div>
 <div className="text-center p-6">
 <h4 className="font-semibold text-blue-800 mb-2">Third-Party Processors</h4>
 <p className="text-sm text-slate-700">Website hosting (India), Email services (India). No US/EU cloud providers.</p>
 </div>
 <div className="text-center p-6">
 <h4 className="font-semibold text-blue-800 mb-2">Cookies & Tracking</h4>
 <p className="text-sm text-slate-700">Essential cookies only. GDPR-compliant banner-free approach.</p>
 </div>
 </div>
 <div className="mt-6 p-4 bg-indigo-100 border-2 border-indigo-200 rounded-xl text-center">
 <p className="font-semibold text-indigo-800">
 Governing Law: Indian law applies. EU users retain GDPR rights regardless of jurisdiction.
 </p>
 </div>
 </section>
{/* Section 7 - Contact & Complaints */}
 <section className="w-full bg-white rounded-2xl shadow-xl border border-blue-200 p-8">
 <div className="max-w-5xl mx-auto">
 {/* Blue Gradient Heading */}
 <h2 className="text-2xl sm:text-3xl font-bold mb-8 flex items-center justify-center gap-3 text-center">
 <Mail className="w-7 h-7 text-blue-600" />
 <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
 Contact Information & Complaints Process
 </span>
 </h2>

 {/* Content Grid */}
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-slate-800">
 {/* Left Column - Data Protection Officer */}
 <div className="space-y-6">
 <h3 className="text-xl font-bold text-blue-900">
 Data Protection Officer
 </h3>
 <div className="space-y-4">
 <div className="flex items-center gap-3 bg-blue-50 px-4 py-3 rounded-xl border border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-all duration-300">
 <Mail className="w-5 h-5 text-blue-600" />
 <a 
 href="mailto:privacy@swordnex.com"
 className="font-medium text-gray-600 hover:text-black transition"
 >
 privacy@swordnex.com
 </a>
 </div>

 <div className="flex items-center gap-3 bg-blue-50 px-4 py-3 rounded-xl border border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-all duration-300">
 <Phone className="w-5 h-5 text-blue-600" />
 <a 
 href="tel:+919486106953"
 className="font-medium text-gray-600 hover:text-black transition"
 >
 +91 94861 06953
 </a>
 </div>

 <div className="flex items-start gap-3 bg-blue-50 px-4 py-4 rounded-xl border border-blue-200">
 <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center border border-blue-200 flex-shrink-0 mt-1">
 <MapPin className="w-5 h-5 text-blue-600" />
 </div>
 <div className="text-sm text-slate-700">
 <p className="font-semibold text-blue-900 mb-1">SwordNex Technologies Private Limited</p>
 <p>15C, Ravi Plaza, 60 Feet Road</p>
 <p>Near New Bus Stand, Kumbakonam</p>
 <p>Tamil Nadu 612001, India</p>
 </div>
 </div>
 </div>
 </div>

 {/* Right Column - Complaints Process */}
 <div className="space-y-6">
 <h3 className="text-xl font-semibold text-blue-900 mb-6">
 Complaints Process
 </h3>
 
 {/* Numbered Steps */}
 <div className="space-y-3">
 {[
 "Contact privacy@swordnex.com (response within 72 hours)",
 "Escalate to Data Protection Officer", 
 "EU users: Contact EU supervisory authority or our EU representative"
 ].map((step, index) => (
 <div key={index} className="flex items-start gap-3 bg-blue-50 p-4 rounded-xl border border-blue-200 group hover:bg-blue-100 hover:border-blue-300 transition-all duration-300">
 <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
 {index + 1}
 </div>
 <div className="text-slate-700 leading-relaxed">
 {index === 0 ? (
 <span>
 Contact{' '}
 <a href="mailto:privacy@swordnex.com" className="text-blue-600 font-semibold hover:text-blue-800 underline">
 privacy@swordnex.com
 </a>{' '}
 (response within 72 hours)
 </span>
 ) : (
 step
 )}
 </div>
 </div>
 ))}
 </div>

 {/* Hours Info */}
 {/* <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-100">
 <div className="flex items-center justify-center gap-6 text-center">
 <div>
 <p className="text-sm text-slate-600 font-medium">Office Hours</p>
 <p className="text-xl font-bold text-blue-800">9 AM - 6 PM IST</p>
 </div>
 <div className="w-px h-12 bg-blue-200"></div>
 <div>
 <p className="text-sm text-slate-600 font-medium">Response Time</p>
 <p className="text-xl font-bold text-green-600">Within 72 hours</p>
 </div>
 </div>
 </div> */}
 </div>
 </div>
 </div>
</section>

 {/* Footer */}
 
 </main>
 <footer className="bg-blue-900 text-blue-200 py-8 mt-0">
 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
 <p className="mb-2">© 2026 SwordNex Technologies Private Limited. All rights reserved.</p>
 <p className="font-semibold">SwordNex®</p>
 </div>
 </footer>
 </div>
 );
};

export default GDPRComplianceStatement;
