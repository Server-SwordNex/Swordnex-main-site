import React from 'react';
import { ShieldCheckIcon, ClockIcon, UserCircleIcon, ScaleIcon } from '@heroicons/react/24/outline';
// Removed DocumentMagnifyingGlassIcon as it was not directly used in H2 icons and is not needed for this simplified design.

const IPRComplaints = () => {
 const scrollToTop = () => {
 window.scrollTo({ top: 0, behavior: 'smooth' });
 };

 return (
 // Professional white background with blue theme
 <div className="min-h-screen bg-white text-slate-800">
 <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-10">
 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
 <ShieldCheckIcon className="w-16 h-16 mx-auto mb-4 opacity-90" />
 <h1 className="text-3xl lg:text-4xl font-bold mb-6">IPR Complaints</h1>
 <div className="flex flex-wrap justify-center gap-4 text-blue-100">
 <span className="bg-blue-600/50 px-6 py-2 rounded-full border border-blue-400/30">
 Last Updated: Jan 2, 2026
 </span>
 </div>
 </div>
 </header>
 <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
 {/* Header - Blue themed, simplified */}

 {/* Sticky Navigation - Blue themed, simplified and less pronounced */}
 <section className="py-12 max-w-6xl mx-auto px-6">
 <h1 className="text-2xl font-bold text-blue-800 mb-8">IPR Complaints Procedure</h1>
 
 <p className="text-lg text-gray-700 mb-12 leading-relaxed">
 SwordNex Technologies Private Limited fully respects all intellectual property rights and strictly complies with 
 <strong>Information Technology Act, 2000 (Section 79)</strong> providing safe harbour protection for intermediaries, 
 and <strong>Copyright Act, 1957 (Section 52)</strong> governing fair use provisions in India.
 </p>

 {/* SECTION 1 */}
 <div className="border border-gray-200 rounded-lg p-8 mb-12">
 <h2 className="text-2xl font-bold text-blue-800 mb-8">(1) Notice to SwordNex:</h2>
 
 <p className="text-lg text-gray-700 mb-8 leading-relaxed">
 If you believe content hosted on any SwordNex service has violated your copyright or IP rights, submit formal written notice:
 </p>

 <div className="space-y-6 mb-12">
 <div className="flex items-start gap-4 p-4 border-l-4 border-blue-400 bg-blue-50/50 rounded-r-lg">
 <svg className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
 </svg>
 <div className="text-lg text-gray-700">
 <strong>Detailed description of copyrighted work:</strong> Comprehensive explanation of your original IP (software, designs, content, trademarks, patents) claimed infringed
 </div>
 </div>

 <div className="flex items-start gap-4 p-4 border-l-4 border-blue-400 bg-blue-50/50 rounded-r-lg">
 <svg className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
 </svg>
 <div className="text-lg text-gray-700">
 <strong>Proof of legal ownership:</strong> Copyright registration, trademark certificates, patent documents, or exclusive licensing agreements proving ownership
 </div>
 </div>

 <div className="flex items-start gap-4 p-4 border-l-4 border-blue-400 bg-blue-50/50 rounded-r-lg">
 <svg className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
 </svg>
 <div className="text-lg text-gray-700">
 <strong>Precise location identification:</strong> Exact URLs, page paths, or identifiers of infringing material hosted on SwordNex services
 </div>
 </div>

 <div className="flex items-start gap-4 p-4 border-l-4 border-blue-400 bg-blue-50/50 rounded-r-lg">
 <svg className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
 </svg>
 <div className="text-lg text-gray-700">
 <strong>Legal infringement evidence:</strong> Proof material violates copyright (not fair use under Section 52, Copyright Act 1957)
 </div>
 </div>

 <div className="flex items-start gap-4 p-4 border-l-4 border-blue-400 bg-blue-50/50 rounded-r-lg">
 <svg className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
 </svg>
 <div className="text-lg text-gray-700">
 <strong>Responsible party details:</strong> Name, username, or contact info of individual/organization who uploaded infringing material (if known)
 </div>
 </div>

 <div className="flex items-start gap-4 p-4 border-l-4 border-blue-400 bg-blue-50/50 rounded-r-lg">
 <svg className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
 </svg>
 <div className="text-lg text-gray-700">
 <strong>Complainant contact information:</strong> Full name, postal address, phone number, email for official communication and verification
 </div>
 </div>

 <div className="flex items-start gap-4 p-4 border-l-4 border-blue-400 bg-blue-50/50 rounded-r-lg">
 <svg className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
 </svg>
 <div className="text-lg text-gray-700">
 <strong>Good faith declaration:</strong> Signed statement confirming unauthorized use not permitted by owner, agent, or Indian law
 </div>
 </div>

 <div className="flex items-start gap-4 p-6 border-l-8 border-blue-600 bg-blue-100 rounded-r-lg">
 <svg className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
 </svg>
 <div className="text-lg text-gray-700 font-semibold">
 <strong>21-day court undertaking:</strong> Binding commitment to file lawsuit and produce restraining court order within 21 days from notice receipt
 </div>
 </div>
 </div>

 <div className="bg-gray-50 p-8 rounded-lg border border-gray-300">
 <p className="font-bold text-2xl text-blue-800 mb-6">Submit Complete Notice To:</p>
 <div className="grid md:grid-cols-2 gap-8 text-lg">
 <div className="space-y-3">
 <div className="font-bold text-xl text-blue-800">IPR Complaints Desk</div>
 <div className="font-bold text-lg">SwordNex Technologies Private Limited</div>
 <div>15C, Ravi Plaza, 60 Feet Road</div>
 <div>Near New Bus Stand, Kumbakonam</div>
 <div className="font-bold text-xl text-blue-800">Tamil Nadu 612001, India</div>
 </div>
 <div className="space-y-4 text-xl pt-2">
 <div className="flex items-center gap-2">
 📧 <a href="mailto:legal@swordnex.com" className="text-blue-600 hover:underline font-semibold">legal@swordnex.com</a>
 </div>
 <div className="flex items-center gap-2 font-bold text-xl text-blue-800">
 📞 +91 94861 06953
 </div>
 </div>
 </div>
 </div>
 </div>

 {/* SECTION 2 */}
 <div className="border border-gray-200 rounded-lg p-8 mb-12">
 <h2 className="text-2xl font-bold text-blue-800 mb-8">(2) Take-down Procedure:</h2>
 
 <div className="space-y-8 text-lg text-gray-700">
 <div className="flex items-start gap-4 p-6 border-l-4 border-blue-400 bg-blue-50/50 rounded-r-lg">
 <svg className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
 </svg>
 <div className="flex-1">
 <strong>36-hour mandatory response:</strong> Upon complete notice receipt meeting all legal requirements, disable access to infringing material within 36 hours for 21 days or court order
 </div>
 </div>
 
 <div className="flex items-start gap-4 p-6 border-l-4 border-blue-400 bg-blue-50/50 rounded-r-lg">
 <svg className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
 </svg>
 <div className="flex-1">
 <strong>Public restriction notification:</strong> Display clear notice to users explaining legal takedown while maintaining content inaccessibility during 21-day period
 </div>
 </div>
 </div>
 </div>

 {/* SECTION 3 */}
 <div className="border-2 border-gray-300 bg-gray-50 rounded-lg p-8">
 <h2 className="text-2xl font-bold text-blue-800 mb-8">(3) Court Order Requirement:</h2>
 
 <div className="space-y-6 text-lg text-gray-700">
 <div className="flex items-start gap-4 p-6 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
 <svg className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
 </svg>
 <div className="flex-1 font-semibold">
 <strong>Automatic content restoration:</strong> Full access restored if no competent court restraining order produced within exactly 21 days from notice
 </div>
 </div>
 
 <div className="flex items-start gap-4 p-6 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
 <svg className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
 </svg>
 <div className="flex-1 font-semibold">
 <strong>No repeat processing:</strong> Subsequent notices for identical content at same location ignored without new court order or fresh evidence
 </div>
 </div>
 </div>
 </div>
</section>


 </div>
 </div>
 );
};

export default IPRComplaints;