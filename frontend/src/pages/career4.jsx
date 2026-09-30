import React, { useState } from 'react';
import ConsultationModal from '../components/ConsultationModal';
import ServiceEnquiryModal from '../components/ServiceEnquiryModal';
import { Link } from 'react-router-dom';

// useEffect(() => {
// if (showSuccess) {
// const timer = setTimeout(() => setShowSuccess(false), 3000);
// return () => clearTimeout(timer);
// }
// }, [showSuccess]);

const CareerApplicationDeveloper = () => {
 const [isConsultationOpen, setIsConsultationOpen] = useState(false);
 const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
 const [showSuccess, setShowSuccess] = useState(false);
 

 return (
 <div className="pt-0 pb-10 bg-gray-50 min-h-screen">
 <div className="bg-background-light dark:bg-background-dark font-sans text-text-main-light dark:text-text-main-dark transition-colors duration-200">
 <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">

 {/* HERO SECTION */}
 <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-12 shadow-lg">
 <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-400 dark:from-blue-800 dark:via-indigo-900 dark:to-purple-800" />
 <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white opacity-10 rounded-full blur-2xl" />
 <div className="absolute top-10 right-10 w-32 h-32 bg-white opacity-10 rounded-full blur-xl" />

 {/* Logo */}
 <div className="absolute -bottom-5 left-8 md:left-12">
 <div className="w-20 h-20 md:w-24 md:h-24 bg-white dark:bg-surface-dark rounded-full p-1 shadow-md border-4 border-background-light dark:border-background-dark">
 <img
 src="https://corporate-lavender-hhuragg7c5.edgeone.app/ICON@4x.png"
 alt="Company Logo"
 className="rounded-full w-full h-full object-cover"
 />
 </div>
 </div>
 </div>

 {/* JOB HEADER */}
 <div className="mb-12">
 <h1 className="text-3xl md:text-4xl font-bold mb-2">
 Application Developer
 </h1>
 <p className="text-text-sub-light text-lg font-medium mb-3">
 SwordNex Technologies
 </p>

 <div className="flex flex-wrap gap-4 text-sm text-text-sub-light">
 <span>Kumbakonam, TN</span>
 <span>• Full-time • India</span>
 </div>
 </div>

 {/* MAIN GRID */}
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

 {/* LEFT CONTENT */}
 <div className="lg:col-span-2 space-y-10">

 {/* OVERVIEW */}
 <section>
 <h2 className="text-xl font-bold mb-4">Overview</h2>
 <p className="text-text-sub-light leading-relaxed">
 We are looking for skilled Application Developers to build and maintain high-quality software applications that solve real business problems.
 You'll work on developing scalable, efficient, and user-friendly applications using modern technologies and best practices.
 </p>
 </section>

 {/* RESPONSIBILITIES */}
 <section>
 <h2 className="text-xl font-bold mb-4">Responsibilities</h2>
 <ul className="list-disc pl-5 space-y-2 text-text-sub-light marker:text-primary">
 <li>Develop, test, and maintain software applications</li>
 <li>Collaborate with cross-functional teams to define and design new features</li>
 <li>Write clean, maintainable, and efficient code</li>
 <li>Troubleshoot, debug and optimize existing applications</li>
 <li>Implement security and data protection measures</li>
 <li>Stay up-to-date with emerging technologies and industry trends</li>
 <li>Participate in code reviews and contribute to team knowledge sharing</li>
 </ul>
 </section>

 {/* QUALIFICATIONS */}
 <section>
 <h2 className="text-xl font-bold mb-4">Qualifications</h2>
 <ul className="list-disc pl-5 space-y-2 text-text-sub-light marker:text-primary">
 <li>2+ years of professional software development experience</li>
 <li>Strong programming skills in JavaScript/TypeScript, Java, or C#</li>
 <li>Experience with modern frameworks (React, Angular, Vue, or similar)</li>
 <li>Knowledge of database design and management (SQL and NoSQL)</li>
 <li>Familiarity with RESTful APIs and web services</li>
 <li>Understanding of software development lifecycle and Agile methodologies</li>
 <li>Bonus: Experience with cloud platforms (AWS, Azure, or GCP)</li>
 </ul>
 </section>

 {/* SKILLS */}
 <section>
 <h2 className="text-xl font-bold mb-4">Skills</h2>
 <div className="flex flex-wrap gap-3">
 {[
 "JavaScript/TypeScript",
 "React/Angular/Vue",
 "REST APIs",
 "SQL/NoSQL",
 "Git",
 "Agile Methodologies",
 "Problem Solving",
 "Cloud Platforms"
 ].map(skill => (
 <span
 key={skill}
 className="px-4 py-2 bg-soft-blue text-primary rounded-lg text-sm font-medium"
 >
 {skill}
 </span>
 ))}
 </div>
 </section>
 </div>

 {/* RIGHT SIDEBAR */}
 <div className="space-y-6">

 {/* JOB SUMMARY */}
 <div className="bg-surface-light p-6 rounded-2xl shadow-sm border">
 <h3 className="font-bold mb-4">Job Summary</h3>

 <div className="space-y-4 text-sm">
 <div className="flex justify-between">
 <span>Salary</span>
 <span className="font-semibold">Based on Experience</span>
 </div>
 <div className="flex justify-between">
 <span>Job Type</span>
 <span>Full-time</span>
 </div>
 <div className="flex justify-between">
 <span>Category</span>
 <span>Software Development</span>
 </div>
 <div className="flex justify-between">
 <span>Posted</span>
 <span>Jan 2026</span>
 </div>
 </div>

 <a
 onClick={() => setShowSuccess(true)}
 className="block w-full mt-6 py-3 text-center
 bg-primary hover:bg-primary-dark
 text-white rounded-xl font-medium
 transition cursor-pointer"
>
 Apply for this Job
</a>

 </div>

 {/* COMPANY CARD */}
 <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
 <div className="flex items-center gap-3 mb-4">
 <img
 src="https://corporate-lavender-hhuragg7c5.edgeone.app/ICON@4x.png"
 alt="SwordNex Technologies"
 className="w-10 h-10 rounded-full"
 />
 <div>
 <h4 className="font-bold text-sm">SwordNex Technologies</h4>
 <p className="text-xs text-text-sub-light">
 Kumbakonam, TN
 </p>
 </div>
 </div>

 <p className="text-sm text-text-sub-light mb-5">
 We are committed to creating innovative software solutions that empower businesses to thrive in the digital age.
 </p>

 <Link
 to="/about"
 className="block w-full py-2.5 text-center
 bg-gray-100 dark:bg-gray-800
 rounded-xl text-sm font-medium
 transition hover:bg-gray-200 dark:hover:bg-gray-700"
 >
 Learn more about us
 </Link>
 </div>
 </div>
 </div>
 </div>
 </div>

 <ConsultationModal
 isOpen={isConsultationOpen}
 onClose={() => setIsConsultationOpen(false)}
 />
 <ServiceEnquiryModal
 isOpen={isEnquiryOpen}
 onClose={() => setIsEnquiryOpen(false)}
 />
{showSuccess && (
 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
 <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-xl animate-fadeIn">

 {/* Icon */}
 <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
 <span className="material-symbols-outlined text-3xl">
 check_circle
 </span>
 </div>

 {/* Title */}
 <h3 className="text-lg font-semibold text-gray-900 mb-2">
 Application Submitted! 😊
 </h3>

 {/* Description */}
 <p className="text-sm text-gray-700 mb-6">
 Thank you for applying. We will review your application and get in touch with you soon. Stay excited! 🚀
 </p>

 {/* Close Button */}
 <button
 onClick={() => setShowSuccess(false)}
 className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
 >
 OK
 </button>
 </div>
 </div>
)}

 </div>
 );
};

export default CareerApplicationDeveloper;