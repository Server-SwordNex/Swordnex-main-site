import React from 'react';
import { Link } from 'react-router-dom';

const products = [
 { name: 'SwordNex Billing', icon: 'receipt_long', color: 'green' },
 { name: 'SwordNex Payroll', icon: 'payments', color: 'blue' },
 { name: 'SwordNex HMS', icon: 'hotel', color: 'yellow' },
 { name: 'SwordNex Jobsheet', icon: 'assignment', color: 'purple' },
 { name: 'SwordNex Invoice', icon: 'description', color: 'orange' },
];

const AffiliateLanding = () => {
 return (
 <div className="min-h-screen bg-white dark:bg-gray-900">
 <header className="border-b border-gray-100 dark:border-gray-800">
 <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
 <Link to="/" className="flex items-center gap-2">
 <img src="/assets/Logo.png" alt="SwordNex" className="h-8" />
 </Link>
 <div className="flex items-center gap-4">
 <Link to="/affiliate/login" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Sign In</Link>
 <Link to="/affiliate/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm">Join Now</Link>
 </div>
 </div>
 </header>

 <section className="py-20 px-4 text-center relative overflow-hidden">
 <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl -z-10"></div>
 <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl -z-10"></div>
 <div className="max-w-4xl mx-auto">
 <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold uppercase tracking-wide mb-6">
 Affiliate Program
 </span>
 <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 dark:text-white leading-tight tracking-tight mb-6">
 Earn 10% Commission
 <span className="block text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text">
 Promoting SwordNex Products
 </span>
 </h1>
 <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
 Share your unique referral link and earn 10% of every first payment from customers you refer to Billing, Payroll, HMS, Jobsheet, or Invoice.
 </p>
 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 <Link to="/affiliate/signup" className="h-14 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all inline-flex items-center justify-center">
 Become an Affiliate
 </Link>
 <Link to="/affiliate/login" className="h-14 px-8 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-medium text-lg dark:hover:bg-gray-800 transition-all inline-flex items-center justify-center">
 Affiliate Sign In
 </Link>
 </div>
 </div>
 </section>

 <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800/50">
 <div className="max-w-6xl mx-auto">
 <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">Products You Can Promote</h2>
 <p className="text-gray-500 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">All five SwordNex SaaS products under one affiliate program</p>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
 {products.map((p) => (
 <div key={p.name} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 text-center shadow-sm hover:shadow-md transition-shadow">
 <div className={`w-12 h-12 rounded-xl bg-${p.color}-50 dark:bg-${p.color}-900/20 text-${p.color}-500 flex items-center justify-center mx-auto mb-4`}>
 <span className="material-symbols-outlined">{p.icon}</span>
 </div>
 <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{p.name}</h3>
 </div>
 ))}
 </div>
 </div>
 </section>

 <section className="py-20 px-4">
 <div className="max-w-6xl mx-auto">
 <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">How It Works</h2>
 <p className="text-gray-500 dark:text-gray-400 text-center mb-16 max-w-2xl mx-auto">Three simple steps to start earning</p>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
 {[
 { step: '01', title: 'Sign Up', desc: 'Create your affiliate account in under 2 minutes. No approvals needed.' },
 { step: '02', title: 'Share Your Link', desc: 'Get your unique referral links for each product and share them anywhere.' },
 { step: '03', title: 'Earn Commissions', desc: 'Earn 10% on every first payment from customers who sign up through your link.' },
 ].map((item) => (
 <div key={item.step} className="text-center">
 <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-2xl font-bold mx-auto mb-6">{item.step}</div>
 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
 <p className="text-gray-500 dark:text-gray-400">{item.desc}</p>
 </div>
 ))}
 </div>
 </div>
 </section>

 <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800/50">
 <div className="max-w-4xl mx-auto">
 <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Frequently Asked Questions</h2>
 <div className="space-y-4">
 {[
 { q: 'How much can I earn?', a: 'You earn 10% of the first payment from every customer you refer. There is no cap on earnings.' },
 { q: 'When do I get paid?', a: 'Commissions are credited to your account once the referred customer completes their first payment. You can request a payout once your balance reaches ₹1,000.' },
 { q: 'How are referrals tracked?', a: 'Each affiliate gets a unique referral code and per-product links. When someone clicks your link and signs up, it is automatically tracked.' },
 { q: 'Can I promote all products?', a: 'Yes! You can generate separate referral links for Billing, Payroll, HMS, Jobsheet, and Invoice — all under one account.' },
 ].map((faq) => (
 <details key={faq.q} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 group">
 <summary className="px-6 py-4 cursor-pointer text-gray-900 dark:text-white font-medium flex items-center justify-between">
 {faq.q}
 <span className="material-symbols-outlined text-gray-400 group-open:rotate-180 transition-transform">expand_more</span>
 </summary>
 <div className="px-6 pb-4 text-gray-500 dark:text-gray-400 text-sm">{faq.a}</div>
 </details>
 ))}
 </div>
 </div>
 </section>

 <section className="py-20 px-4 text-center">
 <div className="max-w-3xl mx-auto">
 <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">Ready to Start Earning?</h2>
 <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg">Join the SwordNex Affiliate Program today. It is free to join.</p>
 <Link to="/affiliate/signup" className="inline-flex h-14 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all items-center">
 Get Started Free
 </Link>
 </div>
 </section>

 <footer className="border-t border-gray-100 dark:border-gray-800 py-8 px-4 text-center text-sm text-gray-400">
 <p>&copy; {new Date().getFullYear()} SwordNex Technologies Private Limited. All rights reserved.</p>
 </footer>
 </div>
 );
};

export default AffiliateLanding;
