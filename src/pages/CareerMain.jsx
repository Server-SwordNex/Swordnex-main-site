import React, { useState, useMemo } from 'react'
import API_BASE_URL from '../config/apiConfig'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../config/FirebaseConfig'

function CareerMain() {
 const roles = useMemo(
 () => [
 "Software Developer",
 "Frontend Engineer",
 "Backend Engineer",
 "Full Stack Engineer",
 "Mobile App Developer",
 "UI/UX Designer",
 "QA Engineer",
 "DevOps Engineer",
 "Product Manager",
 "Digital Marketing",
 "Sales / Business Development",
 "Customer Support",
 "Intern (Any)"
 ],
 []
 );

 const openings = useMemo(
 () => [
 {
 title: "Frontend Engineer",
 type: "Full-time",
 location: "Kumbakonam / Remote",
 tags: ["React", "Tailwind", "UI Engineering"]
 },
 {
 title: "Backend Engineer",
 type: "Full-time",
 location: "Kumbakonam / Remote",
 tags: ["Node.js", "API", "Security"]
 },
 {
 title: "UI/UX Designer",
 type: "Contract / Full-time",
 location: "Remote",
 tags: ["Figma", "Design Systems", "UX"]
 }
 ],
 []
 );

 const [form, setForm] = useState({
 firstName: "",
 lastName: "",
 email: "",
 phone: "",
 location: "",
 experience: "",
 portfolio: "",
 interests: [],
 message: ""
 });

 const [resumeFile, setResumeFile] = useState(null);
 const [uploadStatus, setUploadStatus] = useState('');
 const [submitted, setSubmitted] = useState(false);
 const [isSubmitting, setIsSubmitting] = useState(false);

 const onChange = (key) => (e) => {
 setForm((p) => ({ ...p, [key]: e.target.value }));
 };

 const toggleInterest = (role) => {
 setForm((p) => {
 const exists = p.interests.includes(role);
 return {
 ...p,
 interests: exists
 ? p.interests.filter((r) => r !== role)
 : [...p.interests, role]
 };
 });
 };

 const scrollTo = (id) => {
 const el = document.getElementById(id);
 if (!el) return;
 el.scrollIntoView({ behavior: "smooth", block: "start" });
 };

 const handleSubmit = async (e) => {
 e.preventDefault();
 setIsSubmitting(true);

 try {
 // Upload resume to Firebase Storage if a file was selected
 let resumeURL = '';
 let resumeFileName = '';
 if (resumeFile) {
 setUploadStatus('Uploading resume...');
 const timestamp = Date.now();
 const storageRef = ref(storage, `careers/resumes/${timestamp}_${resumeFile.name}`);
 const snapshot = await uploadBytes(storageRef, resumeFile);
 resumeURL = await getDownloadURL(snapshot.ref);
 resumeFileName = resumeFile.name;
 setUploadStatus('');
 }

 const payload = {
 firstName: form.firstName,
 lastName: form.lastName,
 email: form.email,
 phone: form.phone,
 currentLocation: form.location,
 experience: form.experience,
 portfolio: form.portfolio,
 resumeURL,
 resumeFileName,
 roleOfInterest: form.interests.join(", "),
 message: form.message
 };

 const response = await fetch(`${API_BASE_URL}/api/careers`, {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify(payload),
 });

 if (response.ok) {
 setSubmitted(true);
 setForm({
 firstName: "",
 lastName: "",
 email: "",
 phone: "",
 location: "",
 experience: "",
 portfolio: "",
 interests: [],
 message: ""
 });
 setResumeFile(null);
 setTimeout(() => setSubmitted(false), 6000);
 } else {
 alert("Failed to submit application. Please try again.");
 }
 } catch (error) {
 console.error("Error applying:", error);
 alert("Something went wrong: " + error.message);
 } finally {
 setIsSubmitting(false);
 setUploadStatus('');
 }
 };

 return (
 <div className="min-h-screen bg-slate-950 text-slate-100">
 {/* Header */}
 <header className="relative overflow-hidden border-b border-blue-900/30 bg-gradient-to-r from-blue-950 via-slate-950 to-slate-950">
 <div className="absolute inset-0 opacity-40">
 <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
 <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
 </div>

 <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14">
 <div className="inline-flex items-center gap-2 rounded-full border border-blue-800/40 bg-blue-950/40 px-4 py-2 text-xs text-blue-200">
 <span className="material-symbols-outlined text-base">work</span>
 Careers at SwordNex
 </div>

 <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-semibold text-white">
 We are hiring
 </h1>

 <p className="mt-4 text-lg sm:text-xl text-slate-200 max-w-3xl">
 <span className="font-semibold text-white">
 Join the team building the Future of Billing
 </span>
 <br />
 At SwordNex, we build software that empowers businesses to thrive.
 </p>

 <div className="mt-8 flex flex-col sm:flex-row gap-3">
 <button
 onClick={() => scrollTo("openings")}
 className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white 0 transition"
 >
 View Openings
 </button>

 <button
 onClick={() => scrollTo("why")}
 className="rounded-xl border border-blue-800/40 bg-slate-950/40 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-950/30 transition"
 >
 Why SwordNex?
 </button>

 <button
 onClick={() => scrollTo("apply")}
 className="rounded-xl border border-blue-800/40 bg-slate-950/40 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-950/30 transition"
 >
 Apply Now
 </button>
 </div>
 </div>
 </header>

 {/* Main Content */}
 <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
 {/* Why SwordNex */}
 <section
 id="why"
 className="rounded-2xl border border-blue-900/30 bg-slate-950/40 p-6 sm:p-8"
 >
 <h2 className="text-2xl font-semibold text-white mb-4">
 Why SwordNex?
 </h2>
 <p className="text-slate-200 max-w-3xl">
 We value ownership, clarity, and craftsmanship. You will work on
 real-world problems with a strong team culture.
 </p>
 </section>

 {/* Open Positions */}
 <section
 id="openings"
 className="rounded-2xl border border-blue-900/30 bg-slate-950/40 p-6 sm:p-8"
 >
 <h2 className="text-2xl font-semibold text-white mb-6">
 Open Positions
 </h2>

 <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
 {openings.map((job) => (
 <div
 key={job.title}
 className="rounded-2xl border border-blue-900/30 bg-slate-950/60 p-6"
 >
 <h3 className="text-lg font-semibold text-white">
 {job.title}
 </h3>
 <p className="text-sm text-slate-300 mt-1">
 {job.type} • {job.location}
 </p>

 <div className="mt-3 flex flex-wrap gap-2">
 {job.tags.map((tag) => (
 <span
 key={tag}
 className="rounded-full border border-blue-800/40 bg-blue-950/40 px-3 py-1 text-xs text-blue-200"
 >
 {tag}
 </span>
 ))}
 </div>

 <button
 onClick={() => {
 toggleInterest(job.title);
 scrollTo("apply");
 }}
 className="mt-5 w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white 0 transition"
 >
 Apply
 </button>
 </div>
 ))}
 </div>
 </section>

 {/* Apply */}
 <section
 id="apply"
 className="rounded-2xl border border-blue-900/30 bg-slate-950/40 p-6 sm:p-8"
 >
 <h2 className="text-2xl font-semibold text-white mb-4">Apply</h2>

 {/* selected roles pills */}
 {form.interests.length > 0 && (
 <div className="mb-4 flex flex-wrap gap-2">
 {form.interests.map(role => (
 <span key={role} className="inline-flex items-center gap-1 rounded-full bg-blue-900/50 px-3 py-1 text-xs text-blue-200 border border-blue-800">
 {role}
 <button type="button" onClick={() => toggleInterest(role)} className="hover:text-white">×</button>
 </span>
 ))}
 <button type="button" onClick={() => setForm(p => ({ ...p, interests: [] }))} className="text-xs text-slate-400 underline ml-2">Clear all</button>
 </div>
 )}

 {submitted && (
 <div className="mb-6 rounded-xl border border-green-800/40 bg-green-950/30 p-4 text-green-200">
 ✅ Application submitted successfully.
 </div>
 )}

 <form onSubmit={handleSubmit} className="space-y-5">
 <div className="grid sm:grid-cols-2 gap-4">
 <input
 required
 placeholder="First Name"
 value={form.firstName}
 onChange={onChange("firstName")}
 className="input"
 />
 <input
 required
 placeholder="Last Name"
 value={form.lastName}
 onChange={onChange("lastName")}
 className="input"
 />
 </div>

 <div className="grid sm:grid-cols-2 gap-4">
 <input
 required
 type="email"
 placeholder="Email"
 value={form.email}
 onChange={onChange("email")}
 className="input"
 />
 <input
 required
 placeholder="Phone"
 value={form.phone}
 onChange={onChange("phone")}
 className="input"
 />
 </div>

 {/* Resume File Upload */}
 <div>
 <label className="block text-sm text-slate-300 mb-1.5 font-medium">
 Resume / CV <span className="text-blue-400">(PDF, Max 5MB)</span>
 </label>
 <div className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-all ${resumeFile
 ? 'border-green-700/60 bg-green-950/20'
 : 'border-blue-900/40 bg-slate-950/60 hover:border-blue-700/60'
 }`}>
 <svg className={`w-5 h-5 flex-shrink-0 ${resumeFile ? 'text-green-400' : 'text-slate-400'}`}
 fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
 d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
 </svg>
 <div className="flex-1 min-w-0">
 {resumeFile
 ? <span className="text-sm text-green-300 font-medium truncate block">✓ {resumeFile.name}</span>
 : <span className="text-sm text-slate-400">No file selected</span>
 }
 </div>
 <label className="cursor-pointer bg-blue-600 0 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition flex-shrink-0">
 {resumeFile ? 'Change' : 'Upload'}
 <input
 type="file"
 accept=".pdf,application/pdf"
 className="hidden"
 onChange={e => setResumeFile(e.target.files?.[0] || null)}
 />
 </label>
 {resumeFile && (
 <button type="button" onClick={() => setResumeFile(null)}
 className="text-slate-400 hover:text-red-400 transition flex-shrink-0 ml-1">
 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
 </svg>
 </button>
 )}
 </div>
 {uploadStatus && (
 <p className="text-xs text-blue-300 mt-1 flex items-center gap-1">
 <span className="inline-block w-3 h-3 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
 {uploadStatus}
 </p>
 )}
 </div>

 <textarea
 rows={4}
 placeholder="Message (optional)"
 value={form.message}
 onChange={onChange("message")}
 className="input"
 />

 <button
 type="submit"
 disabled={isSubmitting}
 className={`rounded-xl px-6 py-3 text-sm font-semibold text-white transition flex items-center gap-2 ${isSubmitting ? 'bg-blue-800 cursor-not-allowed' : 'bg-blue-600 0'}`}
 >
 {isSubmitting ? (
 <>
 <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
 Sending...
 </>
 ) : 'Submit Application'}
 </button>
 </form>
 </section>
 </main>
 </div>
 );
}

export default CareerMain