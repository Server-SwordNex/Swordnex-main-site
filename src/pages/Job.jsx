import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CareerMain() {
 const navigate = useNavigate();
 const [dynamicJobs, setDynamicJobs] = useState([]);

 useEffect(() => {
 const storedJobs = JSON.parse(localStorage.getItem('swornex_jobs')) || [];
 setDynamicJobs(storedJobs);
 }, []);

 const staticOpenings = useMemo(() => [
 /* 1️⃣ Full‑Stack Developer */
 {
 id: "full-stack-developer",
 title: "Full Stack Developer",
 type: "Full-time",
 location: "Kumbakonam / Remote",
 tags: ["React", "Tailwind", "TypeScript"],
 salary: "₹6‑12 LPA",
 // 👇 Extra skill keywords – just add more comma‑separated terms
 skills:
 "React, Tailwind CSS, TypeScript, JavaScript (ES6+), REST APIs, Git, Agile, Jest",
 link: "/career1",
 },

 /* 2️⃣ Backend Engineer */
 {
 id: "backend-engineer",
 title: "Application Developer",
 type: "Full-time",
 location: "Kumbakonam / Remote",
 tags: ["React", "Node.js", "MongoDB"],
 salary: "₹7-15 LPA",
 skills: "React, Node.js, Express, MongoDB, AWS (Lambda, S3), Docker, PostgreSQL, RESTful APIs",
 link: "/career4"
 }
 ,

 /* 3️⃣ UI/UX Designer */
 {
 id: "ui-ux-designer",
 title: "UI/UX Designer",
 type: "Full-time",
 location: "Remote",
 tags: ["Figma", "Design Systems", "Prototyping"],
 salary: "₹5‑10 LPA",
 skills:
 "Figma, Adobe XD, Sketch, Design Systems, Wireframing, Prototyping, User Research, Accessibility",
 link: "/career2",
 },

 /* 4️⃣ Customer Support Executive */
 /* 4️⃣ Customer Support Executive */
 {
 id: "customer-support-executive", // unique id
 title: "Customer Support Executive",
 type: "Full-time",
 location: "Kumbakonam",
 tags: ["Customer Service", "CRM", "Communication"],
 salary: "₹3‑6 LPA",
 skills:
 "Customer Support, CRM (Zoho, Freshdesk), Communication, Problem Solving, Ticketing, Conflict Resolution, MS Office",
 link: "/career3",
 },

 /* 5️⃣ Tally Expert */
 {
 id: "digital-marketing",
 title: "Tally Expert",
 type: "Full-time",
 location: "Remote",
 tags: ["Tally", "Accounting", "GST"],
 salary: "₹4‑8 LPA",
 skills:
 "Tally ERP 9, GST, Income Tax, Accounting, Book‑keeping, Financial Reporting, MS Excel (Advanced)",
 link: "/career5",
 },

 /* 6️⃣ Digital Marketing Specialist */
 {
 id: "devops-engineer",
 title: "Digital Marketing Specialist",
 type: "Full-time",
 location: "Kumbakonam / Remote",
 tags: ["SEO", "Google Ads", "Analytics"],
 salary: "₹5‑10 LPA",
 skills:
 "SEO, Google Ads, Google Analytics, Facebook Ads, Content Strategy, Keyword Research, Conversion Rate Optimisation, A/B Testing",
 link: "/career6",
 },

 ], []);

 const openings = useMemo(() => {
 const formattedDynamicJobs = dynamicJobs.map(job => {
 // Generate tags from skills (first 3)
 const skillList = job.skills ? job.skills.split(',').map(s => s.trim()) : [];
 const tags = skillList.slice(0, 3);

 return {
 id: job.id,
 title: job.title,
 type: job.type || "Full-time",
 location: job.location,
 tags: tags.length > 0 ? tags : ["General"],
 salary: job.salary || "Not Disclosed",
 skills: job.skills,
 link: `/career/job/${job.id}`
 };
 });

 return [...formattedDynamicJobs, ...staticOpenings];
 }, [dynamicJobs, staticOpenings]);

 const workCulture = useMemo(() => [
 {
 title: "Inclusive & Respectful Workplace",
 desc: "Fair, inclusive environment valuing all backgrounds. SwordNex is an equal-opportunity employer.",
 icon: "diversity_3",
 iconBg: "bg-purple-100",
 iconColor: "text-purple-700"
 },
 {
 title: "Open Communication & Team Spirit",
 desc: "Transparency, collaboration, and open dialogue where every voice is valued equally.",
 icon: "forum",
 iconBg: "bg-blue-100",
 iconColor: "text-blue-700"
 },
 {
 title: "Work-Life Balance & Flexibility",
 desc: "Flexible schedules, remote options, and generous time-off policies for well-being.",
 icon: "balance",
 iconBg: "bg-green-100",
 iconColor: "text-green-700"
 },
 {
 title: "Health, Safety & Well-Being",
 desc: "Safe, hygienic, and secure environment supporting physical and mental health.",
 icon: "health_and_safety",
 iconBg: "bg-red-100",
 iconColor: "text-red-700"
 },
 {
 title: "Zero Tolerance & Ethical Conduct",
 desc: "Strict adherence to POSH Act with zero tolerance for harassment or misconduct.",
 icon: "verified_user",
 iconBg: "bg-yellow-100",
 iconColor: "text-yellow-700"
 },
 {
 title: "Learning, Growth & Recognition",
 desc: "Continuous learning, merit-based growth, internal promotions, and leadership opportunities.",
 icon: "school",
 iconBg: "bg-pink-100",
 iconColor: "text-pink-700"
 },
 ], []);



 return (
 <div className="min-h-screen bg-gray-50 text-gray-900">
 {/* Blue Header */}
 <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-15 md:py-20 relative overflow-hidden">
 <div className="absolute inset-0 bg-grid-white/[0.1]" />
 <div className="container mx-auto px-6 max-w-6xl text-center relative z-10">
 <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-8 mx-auto w-fit border border-white/30">
 <span className="material-symbols-outlined text-lg">work</span>
 <span className="text-sm font-semibold uppercase tracking-wide">Careers</span>
 </div>

 <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-white bg-clip-text text-transparent">
 Empower Innovation™<br className="md:hidden" /> with SwordNex
 </h1>

 <p className="text-xl md:text-2xl text-blue-100 font-light max-w-3xl mx-auto mb-8">
 Scale at speed with cutting-edge software solutions for payroll, billing, and HRM.
 </p>
 </div>
 </header>



 {/* Apply Cards Section Only */}
 <main className="container mx-auto px-6 max-w-6xl py-16 md:py-20 space-y-16 md:space-y-20">
 <section className="space-y-12">
 <div className="text-center max-w-3xl mx-auto">
 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
 Current Openings
 </h2>
 <p className="text-lg md:text-xl text-gray-600">
 Explore exciting career opportunities and apply directly.
 </p>
 </div>

 {/* Job Cards Grid */}
 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
 {openings.map((job) => (
 <div
 key={job.id}
 className="bg-white rounded-2xl p-6 border border-gray-200 shadow hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 flex flex-col h-full"
 >

 {/* Job Title & Label */}
 <div className="flex items-start justify-between mb-4">
 <div>
 <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
 {job.title}
 </h3>
 <p className="text-sm text-gray-500">{job.location}</p>
 </div>
 <span className={`px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap ${job.type === "Full-time"
 ? "bg-emerald-100 text-emerald-700"
 : "bg-blue-100 text-blue-700"
 }`}>
 {job.type}
 </span>
 </div>

 {/* Salary */}
 <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
 <span className="material-symbols-outlined text-green-500 text-base">payments</span>
 <span className="font-medium">{job.salary}</span>
 </div>

 {/* Required Skills */}
 <div className="mb-4">
 <p className="text-sm text-gray-700">{job.skills}</p>
 </div>

 {/* Tags */}
 <div className="flex flex-wrap gap-2 mb-6">
 {job.tags.map((tag) => (
 <span
 key={tag}
 className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100 hover:bg-blue-100 transition-colors"
 >
 {tag}
 </span>
 ))}
 </div>

 {/* CTA */}
 <a
 href={job.link}
 className="mt-auto w-full block text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors py-3 px-4 rounded-lg text-center shadow-md hover:shadow-lg flex items-center justify-center gap-2"
 >

 <span>Apply Now</span>
 <span className="material-symbols-outlined text-base">arrow_forward</span>
 </a>
 </div>
 ))}
 </div>
 </section>
 </main>
 <section className="py-16 md:py-20 bg-gradient-to-b from-blue-50 to-white">
 <div className="max-w-7xl mx-auto px-6 space-y-12">

 {/* Section Heading */}
 <div className="text-center max-w-3xl mx-auto">
 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
 Workplace Culture at SwordNex
 </h2>
 <p className="text-lg md:text-xl text-gray-600">
 Built on people, values, and purpose.
 </p>
 </div>

 {/* Culture Cards */}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
 {workCulture.map((item, index) => (
 <div
 key={index}
 className="group bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full hover:-translate-y-1"
 >
 {/* Icon */}
 <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${item.iconBg}`}>
 <span className={`material-symbols-outlined text-2xl ${item.iconColor}`}>
 {item.icon}
 </span>
 </div>

 {/* Title */}
 <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
 {item.title}
 </h3>

 {/* Description */}
 <p className="text-sm text-gray-700 leading-relaxed">
 {item.desc}
 </p>
 </div>
 ))}
 </div>

 </div>
 </section>


 </div>
 );
}

export default CareerMain;
