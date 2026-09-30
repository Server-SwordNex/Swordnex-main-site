// import React from 'react';
// // import { ChevronUpIcon } from '@heroicons/react/24/outline';

// const CookiePolicy = () => {
// const scrollToTop = () => {
// window.scrollTo({ top: 0, behavior: 'smooth' });
// };

// return (
// <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
// <div className="bg-white shadow-xl rounded-lg border border-gray-200">
// {/* Header */}
// <div className="p-8 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
// <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
// <h1 className="text-3xl font-bold text-gray-900">Cookie Policy</h1>
// <div className="flex flex-wrap gap-4 text-sm text-gray-600 font-medium">
// <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">Last Updated: Januvary 10, 2026</span>
// <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">Effective: September 5, 2026</span>
// </div>
// </div>
// <p className="text-gray-700 leading-relaxed max-w-2xl">
// SwordNex Technologies Private Limited uses cookies (small text files placed on your device) and similar technologies to provide our websites and to help collect data. The text in a cookie often consists of a string of numbers and letters that uniquely identifies your computer, but it can contain other information as well.
// </p>
// </div>

// {/* Navigation */}
// <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-8 py-4">
// <nav className="flex flex-wrap gap-4 text-sm">
// <a href="#use-of-cookies" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">Use of Cookies</a>
// {/* <a href="#regional-policy" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">Regional Policy</a> */}
// <a href="#analytics" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">Analytics Cookies</a>
// <a href="#cookie-details" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">Cookie Details</a>
// <a href="#customise" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">Customise Cookies</a>
// <button
// onClick={scrollToTop}
// className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition-colors"
// >
// ↑ Top
// </button>
// </nav>
// </div>

// <div className="p-8 space-y-8">
// {/* Introduction */}
// <section id="introduction">
// <h2 className="text-2xl font-bold text-gray-900 mb-4 sr-only">Introduction</h2>
// </section>

// {/* Our Use of Cookies */}
// <section id="use-of-cookies">
// <h2 className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-20">Our Use of Cookies and Similar Technologies</h2>
// <p className="text-gray-700 mb-8 leading-relaxed">
// SwordNex Technologies uses cookies and similar technologies for several purposes:
// </p>
// <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
// <h3 className="text-lg font-semibold text-blue-900 mb-3">Storing your Preferences and Settings</h3>
// <p className="text-blue-800">Settings that enable our website to operate correctly or that maintain your preferences over time may be stored on your device.</p>
// </div>
// <div className="bg-green-50 p-6 rounded-lg border border-green-200">
// <h3 className="text-lg font-semibold text-green-900 mb-3">Sign-in and Authentication</h3>
// <p className="text-green-800">When you sign into our website using your credentials, we store a unique ID number, and the time you signed in, in an encrypted cookie on your device. This cookie allows you to move from page to page within the site without having to sign in again on each page.</p>
// </div>
// <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
// <h3 className="text-lg font-semibold text-yellow-900 mb-3">Security</h3>
// <p className="text-yellow-800">We use cookies to detect fraud and abuse of our websites and services.</p>
// </div>
// </div>
// </section>

 

// {/* Analytics Cookies */}
// <section id="analytics" className="scroll-mt-20">
// <h2 className="text-2xl font-bold text-gray-900 mb-6">Does SwordNex Technologies use cookies for analytics?</h2>
// <div className="space-y-6">
// <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
// <p className="text-indigo-800 mb-4">
// When we send you a targeted email, subject to your preferences, which includes web beacons, cookies or similar technologies we will know whether you open, read, or delete the message.
// </p>
// <p className="text-indigo-800">
// When you allow Performance Cookies to be dropped on your browser, we can associate cookie information with an identifiable individual:
// </p>
// </div>
// <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6 list-disc space-y-1">
// <li className="text-gray-700">Click tracking in marketing emails and website forms</li>
// <li className="text-gray-700">Page views and content downloads from our websites</li>
// <li className="text-gray-700">Combining and analyzing personal data to improve services</li>
// <li className="text-gray-700">Marketing insights and personalized content recommendations</li>
// </ul>
// <div className="bg-gray-50 p-6 rounded-lg">
// <h3 className="text-lg font-semibold text-gray-900 mb-3">Third Party Services:</h3>
// <div className="space-y-2">
// <a href="#" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium">
// Google reCAPTCHA (spam protection)
// <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Privacy Policy</span>
// </a>
// <a href="#" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium">
// LinkedIn Insight Tag (analytics)
// <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Cookie Policy</span>
// </a>
// </div>
// </div>
// </div>
// </section>

// {/* Cookie Details */}
// <section id="cookie-details" className="scroll-mt-20">
// <h2 className="text-2xl font-bold text-gray-900 mb-8">Cookie Details</h2>

// {/* Strictly Necessary Cookies */}
// <div className="mb-12">
// <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
// <span className="w-2 h-2 bg-green-500 rounded-full"></span>
// Strictly Necessary Cookies
// </h3>
// <div className="overflow-x-auto">
// <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
// <thead className="bg-green-50">
// <tr>
// <th className="px-6 py-4 text-left text-xs font-bold text-green-900 uppercase tracking-wider border-b border-green-200">Name</th>
// <th className="px-6 py-4 text-left text-xs font-bold text-green-900 uppercase tracking-wider border-b border-green-200">Description</th>
// <th className="px-6 py-4 text-left text-xs font-bold text-green-900 uppercase tracking-wider border-b border-green-200">Domain</th>
// <th className="px-6 py-4 text-left text-xs font-bold text-green-900 uppercase tracking-wider border-b border-green-200">Expiry</th>
// </tr>
// </thead>
// <tbody>
// {[
// { name: 'sn_consent', desc: 'Cookie consent preferences', domain: 'swordnex.com', expiry: '1 year (PERSISTENT)' },
// { name: 'sn_session', desc: 'User session management', domain: 'swordnex.com', expiry: 'SESSION' },
// { name: 'PHPSESSID', desc: 'Session identifier', domain: 'swordnex.com', expiry: 'SESSION' },
// { name: 'JSESSIONID', desc: 'Platform session cookie', domain: 'swordnex.com', expiry: 'SESSION' },
// { name: '_grecaptcha', desc: 'Google reCAPTCHA protection', domain: 'google.com', expiry: 'PERSISTENT' },
// ].map((cookie, index) => (
// <tr key={cookie.name} className=" transition-colors">
// <td className="px-6 py-4 font-mono text-sm font-medium text-gray-900 border-b border-gray-200">{cookie.name}</td>
// <td className="px-6 py-4 text-gray-700 border-b border-gray-200">{cookie.desc}</td>
// <td className="px-6 py-4 text-gray-700 border-b border-gray-200">{cookie.domain}</td>
// <td className="px-6 py-4 text-gray-700 border-b border-gray-200 font-medium">{cookie.expiry}</td>
// </tr>
// ))}
// </tbody>
// </table>
// </div>
// </div>

// {/* Performance Cookies */}
// <div className="mb-12">
// <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
// <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
// Performance Cookies
// </h3>
// <div className="overflow-x-auto">
// <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
// <thead className="bg-blue-50">
// <tr>
// <th className="px-6 py-4 text-left text-xs font-bold text-blue-900 uppercase tracking-wider border-b border-blue-200">Name</th>
// <th className="px-6 py-4 text-left text-xs font-bold text-blue-900 uppercase tracking-wider border-b border-blue-200">Description</th>
// <th className="px-6 py-4 text-left text-xs font-bold text-blue-900 uppercase tracking-wider border-b border-blue-200">Domain</th>
// <th className="px-6 py-4 text-left text-xs font-bold text-blue-900 uppercase tracking-wider border-b border-blue-200">Expiry</th>
// </tr>
// </thead>
// <tbody>
// {[
// { name: '_ga', desc: 'Google Analytics tracking', domain: 'google.com', expiry: '2 years (PERSISTENT)' },
// { name: '_gid', desc: 'Google Analytics session', domain: 'google.com', expiry: '24 hours (PERSISTENT)' },
// { name: 'sn_dslv', desc: 'Days since last visit', domain: 'swordnex.com', expiry: 'PERSISTENT' },
// ].map((cookie, index) => (
// <tr key={cookie.name} className=" transition-colors">
// <td className="px-6 py-4 font-mono text-sm font-medium text-gray-900 border-b border-gray-200">{cookie.name}</td>
// <td className="px-6 py-4 text-gray-700 border-b border-gray-200">{cookie.desc}</td>
// <td className="px-6 py-4 text-gray-700 border-b border-gray-200">{cookie.domain}</td>
// <td className="px-6 py-4 text-gray-700 border-b border-gray-200 font-medium">{cookie.expiry}</td>
// </tr>
// ))}
// </tbody>
// </table>
// </div>
// </div>

// {/* Functional Cookies */}
// <div className="mb-12">
// <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
// <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
// Functional Cookies
// </h3>
// <div className="overflow-x-auto">
// <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
// <thead className="bg-purple-50">
// <tr>
// <th className="px-6 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider border-b border-purple-200">Name</th>
// <th className="px-6 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider border-b border-purple-200">Description</th>
// <th className="px-6 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider border-b border-purple-200">Domain</th>
// <th className="px-6 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider border-b border-purple-200">Expiry</th>
// </tr>
// </thead>
// <tbody>
// {[
// { name: 'sn_lang', desc: 'Language preference', domain: 'swordnex.com', expiry: '1 year (PERSISTENT)' },
// { name: 'sn_theme', desc: 'UI theme preference', domain: 'swordnex.com', expiry: '30 days (PERSISTENT)' },
// ].map((cookie, index) => (
// <tr key={cookie.name} className=" transition-colors">
// <td className="px-6 py-4 font-mono text-sm font-medium text-gray-900 border-b border-gray-200">{cookie.name}</td>
// <td className="px-6 py-4 text-gray-700 border-b border-gray-200">{cookie.desc}</td>
// <td className="px-6 py-4 text-gray-700 border-b border-gray-200">{cookie.domain}</td>
// <td className="px-6 py-4 text-gray-700 border-b border-gray-200 font-medium">{cookie.expiry}</td>
// </tr>
// ))}
// </tbody>
// </table>
// </div>
// </div>
// </section>

// {/* Customise Cookies */}
// <section id="customise" className="scroll-mt-20">
// <h2 className="text-2xl font-bold text-gray-900 mb-6">Customise Cookies</h2>
// <p className="text-gray-700 mb-6 leading-relaxed">
// We may periodically update this Cookie Policy. You will be prompted to revisit your cookie settings if changes occur.
// </p>

// {/* Browser Controls */}
// <div className="mb-8">
// <h3 className="text-xl font-semibold text-gray-900 mb-6">How to Control Cookies Manually</h3>
// <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// {[
// { browser: 'Google Chrome', steps: 'Settings → Advanced → Privacy and Security → Content Settings → Cookies → Block/Allow' },
// { browser: 'Mozilla Firefox', steps: 'Menu → Options → Privacy & Security → Cookies and Site Data → Manage Data' },
// { browser: 'Safari', steps: 'Safari → Preferences → Privacy → Manage Website Data' },
// { browser: 'Internet Explorer', steps: 'Tools → Internet Options → Privacy → Settings slider' },
// ].map((item) => (
// <div key={item.browser} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
// <h4 className="font-semibold text-gray-900 mb-2">{item.browser}:</h4>
// <p className="text-sm text-gray-700 font-mono bg-white p-3 rounded border">{item.steps}</p>
// </div>
// ))}
// </div>
// </div>

// {/* Cookie Banner */}
// <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
// <h3 className="text-xl font-semibold text-blue-900 mb-4">Our Cookie Banner:</h3>
// <p className="text-blue-800 mb-4">
// Click "Cookie Settings" on <strong>swordnex.com</strong> to manage preferences anytime.
// </p>
// <div className="bg-white p-4 rounded-lg border-2 border-dashed border-blue-300 text-center">
// <p className="text-sm text-gray-600 font-medium">⚠️ Note: Blocking all cookies may affect website functionality.</p>
// </div>
// </div>
// </section>

// {/* Third Party Privacy Policies */}
// <section className="pt-8 border-t border-gray-200">
// <h3 className="text-xl font-semibold text-gray-900 mb-6">Third Party Privacy Policies</h3>
// <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// <a href="#" className="block p-6 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-all">
// <h4 className="font-semibold text-indigo-900 mb-1">Google Privacy Policy</h4>
// <p className="text-sm text-indigo-700">Learn more about Google's cookie practices</p>
// </a>
// <a href="#" className="block p-6 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-all">
// <h4 className="font-semibold text-orange-900 mb-1">Razorpay Privacy Policy</h4>
// <p className="text-sm text-orange-700">Learn more about Razorpay's cookie practices</p>
// </a>
// </div>
// </section>

// {/* Contact */}
// <section className="pt-8 border-t border-gray-200">
// <h3 className="text-xl font-semibold text-gray-900 mb-6">Contact</h3>
// <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-lg border-l-4 border-blue-500">
// <p className="text-lg font-semibold text-gray-900 mb-6">Questions about cookies?</p>
// <div className="space-y-4 text-gray-700">
// <div>
// <strong>Email:</strong>{' '}
// <a href="mailto:privacy@swordnex.com" className="text-blue-600 hover:underline font-semibold">privacy@swordnex.com</a>
// </div>
// <div>
// <strong>Phone:</strong>{' '}
// <a href="tel:+919486106953" className="text-blue-600 hover:underline font-semibold">+91 94861 06953</a>
// </div>
// <div className="mt-6 pt-6 border-t border-gray-200">
// <strong>SwordNex Technologies Private Limited</strong>
// <div className="mt-2 text-sm leading-relaxed">
// 15C, Ravi Plaza, 60 Feet Road<br />
// Near New Bus Stand, Kumbakonam<br />
// Tamil Nadu – 612001, India
// </div>
// </div>
// </div>
// </div>
// </section>

// {/* Change Log */}
// <div className="pt-8 border-t border-gray-200 bg-blue-50 p-6 rounded-lg">
// <h4 className="font-semibold text-blue-900 mb-2">Change Log:</h4>
// <p className="text-blue-800">Januvary 10, 2026 - Initial version compliant with DPDP Act 2023</p>
// </div>
// </div>
// </div>
// </div>
// );
// };

// export default CookiePolicy;

import React from "react";
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

const CookiePolicy = () => {
 const essentialCookies = [
 { name: "session_id", purpose: "Session management", duration: "Session", provider: "SwordNex" },
 { name: "csrf_token", purpose: "Security protection", duration: "Session", provider: "SwordNex" },
 { name: "cookie_consent", purpose: "Store preferences", duration: "1 year", provider: "SwordNex" },
 ];

 const neverUsedCookies = [
 "Analytics cookies (Google Analytics, etc.)",
 "Marketing or advertising cookies",
 "Third-party tracking",
 "Social media cookies",
 ];

 const securityMeasures = [
 "HTTPS/TLS 1.3 encryption",
 "24-month maximum retention",
 "India servers only",
 "Role-based access controls",
 ];

 const userRights = ["Access cookie data", "Request deletion", "Withdraw consent"];

 return (
 <div className="min-h-screen bg-white text-slate-800">
 {/* 🔹 Full-width Blue Header */}
 {/* 🔹 Full-width Blue Header */}
<header className="w-full bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white py-10 shadow-xl border-b-4 border-blue-600 mb-16">
 <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center space-y-5">
 
 {/* Icon Row */}
 <div className="w-20 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg border border-blue-500/50">
 <Cookie className="w-10 text-white opacity-90" />
 </div>

 {/* Heading Row */}
 <div>
 <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
 Cookie Policy
 </h1>
 <p className="text-blue-100 text-base mt-3 font-medium">
 SwordNex Technologies Private Limited
 </p>
 </div>

 {/* Dates Row */}
 <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold text-blue-100">
 <span className="bg-blue-600/50 px-6 py-2 rounded-full border border-blue-400/30">
 Last Updated: Jan 2, 2026
 </span>
 </div>
 
 </div>
</header>




 {/* 🔹 Page Content */}
 <main className="max-w-6xl mx-auto px-5 py-5 space-y-5">
 {/* Section 1 */}
 <section className="py-12 max-w-6xl mx-auto px-6">
 <h1 className="text-2xl font-bold text-blue-800 mb-8">Cookie Policy</h1>
 
 <p className="text-lg text-gray-700 mb-12 leading-relaxed">
 SwordNex Technologies Private Limited is committed to protecting your privacy. This Cookie Policy explains what cookies are, 
 how we use them, and how you can manage them. We comply with all applicable data protection laws including DPDP Act 2023.
 </p>

 {/* WHAT IS A COOKIE */}
 <div className="mb-16">
 <h2 className="text-2xl font-bold text-blue-800 mb-6">What is a cookie?</h2>
 <p className="text-lg text-gray-700 leading-relaxed">
 A cookie is a small text file stored on your device to identify your browser, provide analytics, remember preferences like 
 language or login status. Cookies are completely safe and cannot run programs or deliver viruses.
 </p>
 </div>

 {/* COOKIE TYPES */}
 <div className="mb-16">
 <h2 className="text-2xl font-bold text-blue-800 mb-6">Types of cookies we use</h2>
 <p className="text-lg text-gray-700 mb-6 leading-relaxed">
 Session cookies expire when you close your browser. Persistent cookies remain until expiry or deletion. 
 First-party cookies are set by swordnex.com.
 </p>

 {/* STRICTLY NECESSARY */}
 <div className="mb-12">
 <h3 className="text-xl font-bold text-blue-800 mb-4">Strictly Necessary Cookies</h3>
 <p className="text-lg text-gray-700 mb-6 leading-relaxed">
 Essential for website functionality. Cannot be disabled without breaking site features.
 </p>
 <div className="overflow-x-auto">
 <table className="w-full text-sm text-left text-gray-700 border border-gray-200">
 <thead className="text-xs uppercase bg-gray-50">
 <tr>
 <th className="px-6 py-3 border-r border-gray-200">Cookie Name</th>
 <th className="px-6 py-3 border-r border-gray-200">Purpose</th>
 <th className="px-6 py-3">Validity</th>
 </tr>
 </thead>
 <tbody>
 <tr className="border-b border-gray-200">
 <td className="px-6 py-4 font-mono">sn_session_*</td>
 <td className="px-6 py-4">Session management & security</td>
 <td className="px-6 py-4">Session</td>
 </tr>
 <tr className="border-b border-gray-200 bg-gray-50">
 <td className="px-6 py-4 font-mono">sn_csrf_token</td>
 <td className="px-6 py-4">CSRF protection</td>
 <td className="px-6 py-4">Session</td>
 </tr>
 <tr className="border-b border-gray-200">
 <td className="px-6 py-4 font-mono">_sn_auth</td>
 <td className="px-6 py-4">User authentication state</td>
 <td className="px-6 py-4">1 month</td>
 </tr>
 <tr className="bg-gray-50">
 <td className="px-6 py-4 font-mono">sn_remember</td>
 <td className="px-6 py-4">"Remember me" functionality</td>
 <td className="px-6 py-4">30 days</td>
 </tr>
 </tbody>
 </table>
 </div>
 </div>

 {/* FUNCTIONAL/PREFERENCE */}
 <div className="mb-12">
 <h3 className="text-xl font-bold text-blue-800 mb-4">Functional/Preference Cookies</h3>
 <p className="text-lg text-gray-700 mb-6 leading-relaxed">
 Remember your preferences for personalized experience.
 </p>
 <div className="overflow-x-auto">
 <table className="w-full text-sm text-left text-gray-700 border border-gray-200">
 <thead className="text-xs uppercase bg-gray-50">
 <tr>
 <th className="px-6 py-3 border-r border-gray-200">Cookie Name</th>
 <th className="px-6 py-3 border-r border-gray-200">Purpose</th>
 <th className="px-6 py-3">Validity</th>
 </tr>
 </thead>
 <tbody>
 <tr className="border-b border-gray-200">
 <td className="px-6 py-4 font-mono">sn_lang</td>
 <td className="px-6 py-4">Language preference</td>
 <td className="px-6 py-4">1 year</td>
 </tr>
 <tr className="border-b border-gray-200 bg-gray-50">
 <td className="px-6 py-4 font-mono">sn_theme</td>
 <td className="px-6 py-4">Dark/Light mode preference</td>
 <td className="px-6 py-4">90 days</td>
 </tr>
 </tbody>
 </table>
 </div>
 </div>

 {/* ANALYTICS */}
 <div className="mb-12">
 <h3 className="text-xl font-bold text-blue-800 mb-4">Analytics Cookies</h3>
 <p className="text-lg text-gray-700 mb-6 leading-relaxed">
 Help us improve website performance and user experience.
 </p>
 <div className="overflow-x-auto">
 <table className="w-full text-sm text-left text-gray-700 border border-gray-200">
 <thead className="text-xs uppercase bg-gray-50">
 <tr>
 <th className="px-6 py-3 border-r border-gray-200">Cookie Name</th>
 <th className="px-6 py-3 border-r border-gray-200">Purpose</th>
 <th className="px-6 py-3">Validity</th>
 </tr>
 </thead>
 <tbody>
 <tr className="border-b border-gray-200">
 <td className="px-6 py-4 font-mono">_ga, _gid</td>
 <td className="px-6 py-4">Google Analytics (anonymous)</td>
 <td className="px-6 py-4">2 years, 24h</td>
 </tr>
 <tr className="bg-gray-50">
 <td className="px-6 py-4 font-mono">sn_analytics</td>
 <td className="px-6 py-4">Internal performance tracking</td>
 <td className="px-6 py-4">30 days</td>
 </tr>
 </tbody>
 </table>
 </div>
 </div>
 </div>

 {/* THIRD PARTY COOKIES */}
 <div className="mb-16">
 <h2 className="text-2xl font-bold text-blue-800 mb-6">Third Party Cookies</h2>
 <p className="text-lg text-gray-700 leading-relaxed">
 Embedded content from YouTube/Vimeo may set their own cookies. We use privacy-friendly settings and do not allow third-party trackers.
 </p>
 <div className="overflow-x-auto mt-6">
 <table className="w-full text-sm text-left text-gray-700 border border-gray-200">
 <thead className="text-xs uppercase bg-gray-50">
 <tr>
 <th className="px-6 py-3 border-r border-gray-200">Cookie Name</th>
 <th className="px-6 py-3 border-r border-gray-200">Purpose</th>
 <th className="px-6 py-3 border-r border-gray-200">Validity</th>
 <th className="px-6 py-3">Provider</th>
 </tr>
 </thead>
 <tbody>
 <tr className="border-b border-gray-200">
 <td className="px-6 py-4 font-mono">YSC, VISITOR_INFO1_LIVE</td>
 <td className="px-6 py-4">Video statistics</td>
 <td className="px-6 py-4">Session</td>
 <td className="px-6 py-4">YouTube</td>
 </tr>
 </tbody>
 </table>
 </div>
 </div>

 {/* MANAGE COOKIES */}
 <div className="mb-16">
 <h2 className="text-2xl font-bold text-blue-800 mb-6">How to manage cookies?</h2>
 <div className="grid md:grid-cols-2 gap-8 text-lg text-gray-700">
 <div>
 <h3 className="font-bold text-blue-800 mb-4">Cookie Preference Manager</h3>
 <p>Use "Manage Cookie Preferences" link at top of page or cookie icon in bottom corner.</p>
 </div>
 <div>
 <h3 className="font-bold text-blue-800 mb-4">Browser Settings</h3>
 <p>Chrome, Firefox, Safari, Edge all offer cookie management in privacy settings.</p>
 </div>
 </div>
 </div>

 {/* DISCLAIMER */}
 <div className="pt-10 border-t border-gray-200">
 <p className="text-sm text-gray-500 text-center">
 Last Updated: January 02, 2026 | SwordNex Technologies Private Limited | Contact: privacy@swordnex.com
 </p>
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

export default CookiePolicy;
