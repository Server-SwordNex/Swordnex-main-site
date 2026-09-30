import React, { useState, useEffect, useMemo } from "react";
import { Link, useParams } from 'react-router-dom';
import ConsultationModal from '../components/ConsultationModal';
import ServiceEnquiryModal from '../components/ServiceEnquiryModal';

const JobDetails = () => {
 const { id } = useParams();
 const [isConsultationOpen, setIsConsultationOpen] = useState(false);
 const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
 const [showSuccess, setShowSuccess] = useState(false);
 const [job, setJob] = useState(null);
 const [loading, setLoading] = useState(true);

 // Static openings data (duplicated from Job.jsx to ensure availability)
 const staticOpenings = useMemo(() => [
 {
 id: "full-stack-developer",
 title: "Full Stack Developer",
 type: "Full-time",
 location: "Kumbakonam / Remote",
 tags: ["React", "Tailwind", "TypeScript"],
 salary: "₹6‑12 LPA",
 skills: "React, Tailwind CSS, TypeScript, JavaScript (ES6+), REST APIs, Git, Agile, Jest",
 responsibilities: [
 "Build responsive React frontends with Tailwind CSS",
 "Develop Node.js/Express backends",
 "Integrate APIs and third-party services",
 "Collaborate with design and product teams"
 ],
 qualifications: [
 "2+ years of experience in Full Stack Development",
 "Strong proficiency in React and Node.js",
 "Experience with database management (SQL/NoSQL)"
 ],
 summary: "We are looking for a skilled Full Stack Developer to join our dynamic team."
 },
 {
 id: "backend-engineer",
 title: "Application Developer",
 type: "Full-time",
 location: "Kumbakonam / Remote",
 tags: ["React", "Node.js", "MongoDB"],
 salary: "₹7-15 LPA",
 skills: "React, Node.js, Express, MongoDB, AWS (Lambda, S3), Docker, PostgreSQL, RESTful APIs",
 responsibilities: [
 "Design and build scalable backend services",
 "Optimize application performance",
 "Implement security and data protection",
 "Manage cloud infrastructure"
 ],
 qualifications: [
 "3+ years of backend development experience",
 "Proficiency in Node.js and Python/Go",
 "Experience with cloud platforms (AWS/GCP)"
 ],
 summary: "Join us to build robust and scalable applications."
 },
 {
 id: "ui-ux-designer",
 title: "UI/UX Designer",
 type: "Full-time",
 location: "Remote",
 tags: ["Figma", "Design Systems", "Prototyping"],
 salary: "₹5‑10 LPA",
 skills: "Figma, Adobe XD, Sketch, Design Systems, Wireframing, Prototyping, User Research, Accessibility",
 responsibilities: [
 "Create user-centered designs and prototypes",
 "Conduct user research and usability testing",
 "Maintain and evolve design systems",
 "Collaborate with developers on implementation"
 ],
 qualifications: [
 "2+ years of UI/UX design experience",
 "Strong portfolio demonstrating design process",
 "Proficiency in Figma and other design tools"
 ],
 summary: "We need a creative designer to craft exceptional user experiences."
 },
 {
 id: "customer-support",
 title: "Customer Support Executive",
 type: "Full-time",
 location: "Kumbakonam",
 tags: ["Customer Service", "CRM", "Communication"],
 salary: "₹3‑6 LPA",
 skills: "Customer Support, CRM (Zoho, Freshdesk), Communication, Problem Solving, Ticketing, Conflict Resolution, MS Office",
 responsibilities: [
 "Handle customer inquiries and issues",
 "Provide technical support and guidance",
 "Maintain customer records in CRM",
 "Ensure high customer satisfaction"
 ],
 qualifications: [
 "Excellent communication skills",
 "Prior experience in customer support",
 "Ability to handle stressful situations"
 ],
 summary: "Help us deliver outstanding support to our valued customers."
 },
 {
 id: "tally-expert",
 title: "Tally Expert",
 type: "Full-time",
 location: "Remote",
 tags: ["Tally", "Accounting", "GST"],
 salary: "₹4‑8 LPA",
 skills: "Tally ERP 9, GST, Income Tax, Accounting, Book‑keeping, Financial Reporting, MS Excel (Advanced)",
 responsibilities: [
 "Manage accounting and bookkeeping using Tally",
 "Prepare financial reports and statements",
 "Ensure compliance with GST and tax regulations",
 "Assist in audits and reconciliation"
 ],
 qualifications: [
 "Certified Tally Expert or Commerce graduate",
 "2+ years of experience in accounting",
 "Strong knowledge of GST and taxation"
 ],
 summary: "Seeking a Tally expert to manage our financial accounting."
 },
 {
 id: "digital-marketing",
 title: "Digital Marketing Specialist",
 type: "Full-time",
 location: "Kumbakonam / Remote",
 tags: ["SEO", "Google Ads", "Analytics"],
 salary: "₹5‑10 LPA",
 skills: "SEO, Google Ads, Google Analytics, Facebook Ads, Content Strategy, Keyword Research, Conversion Rate Optimisation, A/B Testing",
 responsibilities: [
 "Develop and execute digital marketing strategies",
 "Manage SEO, SEM, and social media campaigns",
 "Analyze performance metrics and optimize",
 "Create engaging content for various channels"
 ],
 qualifications: [
 "2+ years in digital marketing",
 "Experience with Google Analytics and Ads",
 "Strong analytical and creative skills"
 ],
 summary: "Drive our digital presence and growth through strategic marketing."
 },
 ], []);

 useEffect(() => {
 const fetchJob = () => {
 // 1. Check static jobs
 const staticJob = staticOpenings.find(j => j.id === id);
 if (staticJob) {
 setJob(staticJob);
 setLoading(false);
 return;
 }

 // 2. Check dynamic jobs from localStorage
 const storedJobs = JSON.parse(localStorage.getItem('swornex_jobs')) || [];
 // Note: localStorage IDs are numbers, params ID is string
 const dynamicJob = storedJobs.find(j => j.id.toString() === id);
 
 if (dynamicJob) {
 // Format dynamic job to match structure
 setJob({
 id: dynamicJob.id,
 title: dynamicJob.title,
 type: dynamicJob.type || "Full-time",
 location: dynamicJob.location,
 salary: dynamicJob.salary || "Not Disclosed",
 skills: dynamicJob.skills,
 tags: dynamicJob.skills ? dynamicJob.skills.split(',').slice(0, 3) : ["General"],
 responsibilities: dynamicJob.responsibilities ? dynamicJob.responsibilities.split(/[\n,]/).map(item => item.trim()).filter(Boolean) : ["No specific responsibilities listed."],
 qualifications: [
 ...(dynamicJob.experience ? [`${dynamicJob.experience} experience`] : []),
 ...(dynamicJob.qualifications ? dynamicJob.qualifications.split(/[\n,]/).map(item => item.trim()).filter(Boolean) : [])
 ].length > 0 ? [
 ...(dynamicJob.experience ? [`${dynamicJob.experience} experience`] : []),
 ...(dynamicJob.qualifications ? dynamicJob.qualifications.split(/[\n,]/).map(item => item.trim()).filter(Boolean) : [])
 ] : ["No specific qualifications listed."],
 summary: dynamicJob.summary || "No description available."
 });
 } else {
 // Job not found
 console.log("Job not found");
 }
 setLoading(false);
 };

 fetchJob();
 }, [id, staticOpenings]);

 if (loading) {
 return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
 }

 if (!job) {
 return (
 <div className="min-h-screen flex flex-col items-center justify-center gap-4">
 <h2 className="text-2xl font-bold">Job Not Found</h2>
 <p className="text-gray-600">The job listing you are looking for does not exist or has been removed.</p>
 <Link to="/career" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
 Back to Careers
 </Link>
 </div>
 );
 }

 // Parse skills string into array for display
 const skillsArray = job.skills ? job.skills.split(',').map(s => s.trim()) : [];

 return (
 <div className="pt-0 pb-10 bg-gray-50 min-h-screen">
 <div className="bg-background-light dark:bg-background-dark font-sans text-text-main-light dark:text-text-main-dark transition-colors duration-200">
 <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">

 {/* HERO SECTION */}
 <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-12 shadow-lg">
 <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 dark:from-blue-800 dark:via-indigo-900 dark:to-cyan-800" />
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
 <h1 className="text-3xl md:text-4xl font-bold mb-2">{job.title}</h1>
 <p className="text-text-sub-light text-lg font-medium mb-3">SwordNex Technologies</p>

 <div className="flex flex-wrap gap-4 text-sm text-text-sub-light">
 <span className="flex items-center gap-1">
 <span className="material-icons-outlined text-base">location_on</span>
 {job.location}
 </span>
 <span>• {job.type} • India</span>
 </div>
 </div>

 {/* MAIN CONTENT GRID */}
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

 {/* LEFT CONTENT */}
 <div className="lg:col-span-2 space-y-10">

 {/* OVERVIEW */}
 <section>
 <h2 className="text-xl font-bold mb-4">Overview</h2>
 <p className="text-text-sub-light leading-relaxed">
 {job.summary}
 </p>
 </section>

 {/* RESPONSIBILITIES */}
 <section>
 <h2 className="text-xl font-bold mb-4">Responsibilities</h2>
 <ul className="list-disc pl-5 space-y-2 text-text-sub-light marker:text-primary">
 {Array.isArray(job.responsibilities) ? (
 job.responsibilities.map((res, index) => (
 <li key={index}>{res}</li>
 ))
 ) : (
 <li>{job.responsibilities || "Details available upon request."}</li>
 )}
 </ul>
 </section>

 {/* QUALIFICATIONS */}
 <section>
 <h2 className="text-xl font-bold mb-4">Qualifications</h2>
 <ul className="list-disc pl-5 space-y-2 text-text-sub-light marker:text-primary">
 {Array.isArray(job.qualifications) ? (
 job.qualifications.map((qual, index) => (
 <li key={index}>{qual}</li>
 ))
 ) : (
 <li>{job.qualifications || "Details available upon request."}</li>
 )}
 </ul>
 </section>

 {/* SKILLS */}
 <section>
 <h2 className="text-xl font-bold mb-4">Skills</h2>
 <div className="flex flex-wrap gap-3">
 {skillsArray.map(skill => (
 <span
 key={skill}
 className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium"
 >
 {skill}
 </span>
 ))}
 </div>
 </section>
 </div>

 {/* RIGHT SIDEBAR */}
 <div className="space-y-6">

 {/* JOB SUMMARY CARD */}
 <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
 <h3 className="font-bold mb-4">Job Summary</h3>

 <div className="space-y-4 text-sm">
 <div className="flex justify-between">
 <span>Salary</span>
 <span className="font-semibold">{job.salary}</span>
 </div>
 <div className="flex justify-between">
 <span>Job Type</span>
 <span>{job.type}</span>
 </div>
 <div className="flex justify-between">
 <span>Category</span>
 <span>Development</span>
 </div>
 <div className="flex justify-between">
 <span>Posted</span>
 <span>Recent</span>
 </div>
 </div>

 <a
 onClick={() => setShowSuccess(true)}
 className="block w-full mt-6 py-3 text-center
 bg-blue-600 hover:bg-blue-700
 text-white rounded-xl font-medium
 transition cursor-pointer"
 >
 Apply for this Job
 </a>

 </div>

 {/* COMPANY CARD */}
 <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
 <div className="flex items-center gap-3 mb-4">
 <img
 src="https://corporate-lavender-hhuragg7c5.edgeone.app/ICON@4x.png"
 alt="SwordNex"
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
 We are committed to creating an inclusive and growth-focused work culture.
 </p>

 <Link
 to="/about"
 className="block w-full py-2.5 text-center
 bg-gray-100 dark:bg-gray-700
 rounded-xl text-sm font-medium
 transition hover:bg-gray-200 dark:hover:bg-gray-600"
 >
 Learn more about us
 </Link>
 </div>
 </div>
 </div>
 </div>
 </div>
 
 <ConsultationModal isOpen={isConsultationOpen} onClose={() => setIsConsultationOpen(false)} />
 <ServiceEnquiryModal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />
 
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

export default JobDetails;
