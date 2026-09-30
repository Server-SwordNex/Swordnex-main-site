import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FAQPage = () => {
 const [activeCategory, setActiveCategory] = useState('all');
 const [openFaq, setOpenFaq] = useState(null);
 const [searchQuery, setSearchQuery] = useState('');

 const categories = [
 { id: 'all', label: 'All', count: 52 },
 { id: 'payroll', label: 'Payroll', count: 18 },
 { id: 'hrm', label: 'HRM', count: 14 },
 { id: 'billing', label: 'Billing', count: 12 },
 { id: 'services', label: 'Services', count: 6 },
 { id: 'training', label: 'Training', count: 2 }
 ];

 const faqs = [
 // === PAYROLL FAQs (18) ===
 { id: 1, q: "Reset SwordNex Payroll password?", a: "products.payroll.swordnex.com/login → Forgot Password → Email → Check inbox/spam (valid 15 mins).", cat: 'payroll' },
 { id: 2, q: "Salary slips not generating?", a: "Payroll → Generate Slips → Select month → Process → Employee Portal → Downloads.", cat: 'payroll' },
 { id: 3, q: "PF/ESI calculations wrong?", a: "Settings → Compliance → Update PF 12%, ESI 3.25% → Payroll → Recalculate All.", cat: 'payroll' },
 { id: 4, q: "TDS deduction incorrect?", a: "Payroll → Tax Settings → Verify new/old slabs → Recalculate TDS.", cat: 'payroll' },
 { id: 5, q: "Form 16 not available?", a: "Payroll → Reports → Form 16 → Select FY → Download PDF for all employees.", cat: 'payroll' },
 { id: 6, q: "Bulk salary revision?", a: "Payroll → Salary Revision → Upload Excel template → Process all changes.", cat: 'payroll' },
 { id: 7, q: "Year-end data migration?", a: "Settings → FY Close → Backup → Generate new FY → Auto-migrate balances.", cat: 'payroll' },
 { id: 8, q: "Employee salary history?", a: "Employee → Salary Details → Revision History → Download PDF.", cat: 'payroll' },
 { id: 9, q: "Advance salary deduction?", a: "Payroll → Advances → Add advance → Deduct from salary → Save.", cat: 'payroll' },
 { id: 10, q: "Bonus calculation?", a: "Payroll → Bonus → Select employees → Enter amount/percentage → Process.", cat: 'payroll' },
 { id: 11, q: "Gratuity calculation?", a: "Payroll → Reports → Gratuity → Enter service years → Auto-calculate.", cat: 'payroll' },
 { id: 12, q: "Professional tax setup?", a: "Settings → Compliance → Professional Tax → Select Tamil Nadu rates.", cat: 'payroll' },
 { id: 13, q: "Leave encashment?", a: "Payroll → Leave Encashment → Select employees → Max 30 days/year.", cat: 'payroll' },
 { id: 14, q: "Payroll backup location?", a: "Settings → Backup → Google Drive/Dropbox → Auto-daily backup.", cat: 'payroll' },
 { id: 15, q: "Employee-wise payroll report?", a: "Reports → Payroll Summary → Filter employee → Excel export.", cat: 'payroll' },
 { id: 16, q: "Multiple company payroll?", a: "Admin → Companies → Add Company → Switch company → Run payroll.", cat: 'payroll' },
 { id: 17, q: "Payroll approval workflow?", a: "Settings → Approval → Enable 2-level approval → Assign approvers.", cat: 'payroll' },
 { id: 18, q: "Late salary processing?", a: "Payroll → Process → Override late fee → Generate slips.", cat: 'payroll' },

 // === HRM FAQs (14) ===
 { id: 19, q: "Employee onboarding process?", a: "HRM → Onboarding → Add employee → Documents → Training → Active.", cat: 'hrm' },
 { id: 20, q: "Attendance biometric sync?", a: "Settings → Integrations → Add Device → Test Connection → Live sync.", cat: 'hrm' },
 { id: 21, q: "Leave balance carry forward?", a: "HRM → Leaves → Year End → Carry Forward → Process All.", cat: 'hrm' },
 { id: 22, q: "Shift roster creation?", a: "HRM → Shifts → Create Roster → Assign employees → Publish.", cat: 'hrm' },
 { id: 23, q: "Performance review setup?", a: "HRM → Performance → Create Template → Assign reviewers → Schedule.", cat: 'hrm' },
 { id: 24, q: "Employee exit process?", a: "HRM → Exit → Add employee → Exit date → Clearance → Final settlement.", cat: 'hrm' },
 { id: 25, q: "Training module assignment?", a: "HRM → Training → Create Course → Assign employees → Track completion.", cat: 'hrm' },
 { id: 26, q: "Document management?", a: "HRM → Documents → Upload → Categorize → Share with employee.", cat: 'hrm' },
 { id: 27, q: "Attendance regularisation?", a: "HRM → Attendance → Regularise → Select date → Approve reason.", cat: 'hrm' },
 { id: 28, q: "Asset allocation to employees?", a: "HRM → Assets → Allocate → Scan QR → Track return date.", cat: 'hrm' },
 { id: 29, q: "Employee self-service portal?", a: "Employee login: hrm.swordnex.com → View payslip, apply leave, download docs.", cat: 'hrm' },
 { id: 30, q: "Multiple location attendance?", a: "HRM → Locations → Add Location → Assign devices → Central dashboard.", cat: 'hrm' },
 { id: 31, q: "HR compliance audit?", a: "HRM → Reports → Compliance → PF/ESI/PT → Download audit report.", cat: 'hrm' },
 { id: 32, q: "Interview management?", a: "HRM → Recruitment → Add Candidate → Schedule Interview → Track status.", cat: 'hrm' },

 // === BILLING FAQs (12) ===
 { id: 33, q: "GSTR-1/3B report generation?", a: "Reports → GST → Select FY → Auto-generate → JSON/Excel export.", cat: 'billing' },
 { id: 34, q: "HSN/SAC code not saving?", a: "Masters → Tax Codes → Save individually → Clear cache → Refresh.", cat: 'billing' },
 { id: 35, q: "Invoice numbering jumping?", a: "Settings → Numbering → Reset sequence → Check duplicates.", cat: 'billing' },
 { id: 36, q: "Multi-location GST reports?", a: "Reports → GST → Filter Location → Consolidated view → Export.", cat: 'billing' },
 { id: 37, q: "E-invoicing setup?", a: "Settings → E-Invoice → Get IRN → Auto-generate QR code.", cat: 'billing' },
 { id: 38, q: "Customer portal access?", a: "Billing → Customers → Generate Portal Link → Share with expiry.", cat: 'billing' },
 { id: 39, q: "Payment reconciliation?", a: "Banking → Import Statement → Auto-match → Manual override.", cat: 'billing' },
 { id: 40, q: "GST portal JSON upload error?", a: "Reports → GST → Validate JSON → Regenerate → Re-upload.", cat: 'billing' },
 { id: 41, q: "Credit note generation?", a: "Billing → Credit Notes → Select invoice → Enter amount → Auto-adjust.", cat: 'billing' },
 { id: 42, q: "Multiple GSTIN reports?", a: "Reports → GST → Filter GSTIN → Consolidated/Individual export.", cat: 'billing' },
 { id: 43, q: "Foreign currency invoices?", a: "Settings → Currency → Add rate → Create invoice → Auto-convert.", cat: 'billing' },
 { id: 44, q: "Subscription billing setup?", a: "Billing → Subscriptions → Add customer → Set recurrence → Auto-charge.", cat: 'billing' }
 ];

 const filteredFaqs = faqs.filter(faq => {
 const matchesSearch = faq.q.toLowerCase().includes(searchQuery.toLowerCase());
 return (activeCategory === 'all' || faq.cat === activeCategory) && matchesSearch;
 });

 const getCategoryColor = (cat) => {
 const colors = {
 payroll: 'bg-blue-100 text-blue-800',
 hrm: 'bg-purple-100 text-purple-800',
 billing: 'bg-emerald-100 text-emerald-800',
 services: 'bg-orange-100 text-orange-800',
 training: 'bg-indigo-100 text-indigo-800'
 };
 return colors[cat] || 'bg-gray-100 text-gray-800';
 };

 return (
 <div className="min-h-screen bg-gray-50">
 {/* Compact Hero */}
 <section className="py-14 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
 <div className="max-w-4xl mx-auto text-center">
 <h1 className="text-4xl md:text-5xl font-bold mb-4">FAQ</h1>
 <p className="text-xl max-w-lg mx-auto mb-8">Complete support for SwordNex products & services</p>
 
 <div className="max-w-md mx-auto">
 <input
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 placeholder="Search Payroll, HRM, Billing, Services..."
 className="w-full px-5 py-3 bg-white/20 backdrop-blur border border-white/30 rounded-xl text-white placeholder-gray-100 focus:outline-none focus:border-white/50 shadow-lg"
 />
 </div>
 </div>
 </section>

 <div className="max-w-5xl mx-auto px-6 -mt-8 pb-16">
 {/* Category Pills */}
 <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm border p-2 mb-10 flex flex-wrap gap-2 justify-center">
 {categories.map((cat) => (
 <button
 key={cat.id}
 onClick={() => setActiveCategory(cat.id)}
 className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
 activeCategory === cat.id
 ? 'bg-blue-600 text-white shadow-md'
 : 'text-gray-700 hover:bg-gray-100 hover:shadow-sm bg-white/50'
 }`}
 >
 {cat.label} ({cat.count})
 </button>
 ))}
 </div>

 {/* FAQ Cards */}
 <div className="space-y-3">
 {filteredFaqs.map((faq) => (
 <motion.div key={faq.id} whileHover={{ scale: 1.01 }} className="group">
 <div
 className="bg-white/80 backdrop-blur rounded-xl p-5 border border-gray-200 hover:border-blue-300 hover:shadow-md hover:bg-white hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
 onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
 >
 <div className="flex items-start justify-between">
 <h4 className="font-semibold text-gray-900 text-base leading-tight pr-8 flex-1">
 {faq.q}
 </h4>
 <motion.div
 animate={{ rotate: openFaq === faq.id ? 180 : 0 }}
 className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center ml-2 flex-shrink-0 transition-all group-hover:border-blue-500"
 >
 <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
 </svg>
 </motion.div>
 </div>

 <motion.div
 initial={false}
 animate={{ 
 height: openFaq === faq.id ? 'auto' : 0, 
 opacity: openFaq === faq.id ? 1 : 0,
 marginTop: openFaq === faq.id ? '0.5rem' : 0
 }}
 className="overflow-hidden"
 >
 <p className="text-gray-700 text-sm leading-relaxed mb-2">{faq.a}</p>
 <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(faq.cat)}`}>
 {faq.cat.toUpperCase()}
 </span>
 </motion.div>
 </div>
 </motion.div>
 ))}
 
 {filteredFaqs.length === 0 && (
 <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 bg-white/50 rounded-xl border-2 border-dashed border-gray-300">
 <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
 </svg>
 <h4 className="text-lg font-semibold text-gray-900 mb-2">No FAQs found</h4>
 <p className="text-gray-600 mb-6">Try searching products, services or training topics</p>
 <Link to="/support" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 font-medium shadow-sm">
 Contact Support →
 </Link>
 </motion.div>
 )}
 </div>

 {/* CTA */}
 <div className="mt-16 pt-10 border-t border-gray-200 text-center">
 <h3 className="text-xl font-semibold text-gray-900 mb-3">Need personalized assistance?</h3>
 <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
 <a href="mailto:support@swordnex.com" className="flex-1 px-6 py-2.5 border border-blue-600 text-blue-600 font-medium rounded-lg text-sm">
 support@swordnex.com
 </a>
 <Link to="/contact" className="flex-1 px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-sm text-sm">
 Live Help
 </Link>
 </div>
 </div>
 </div>
 </div>
 );
};

export default FAQPage;
