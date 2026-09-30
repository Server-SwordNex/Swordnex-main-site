import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/FirebaseConfig';
import API_BASE_URL from '../config/apiConfig';

// ── Generate unique 5-character interview code ──────────────────────────────
const generateInterviewCode = () => {
 const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
 const numbers = '0123456789';
 const existing = (JSON.parse(localStorage.getItem('event-candidates')) || []).map(c => c.interviewCode);
 let code, attempts = 0;
 do {
 const l1 = letters[Math.floor(Math.random() * letters.length)];
 const l2 = letters[Math.floor(Math.random() * letters.length)];
 const n1 = numbers[Math.floor(Math.random() * numbers.length)];
 const n2 = numbers[Math.floor(Math.random() * numbers.length)];
 const n3 = numbers[Math.floor(Math.random() * numbers.length)];
 code = `${l1}${l2}${n1}${n2}${n3}`;
 if (++attempts >= 1000) { code = `${l1}${l2}${Date.now().toString().slice(-3)}`; break; }
 } while (existing.includes(code));
 return code;
};

const EventRegisterPage = () => {
 const { eventId } = useParams();

 const [event, setEvent] = useState(null);
 const [loading, setLoading] = useState(true);
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [uploadStatus, setUploadStatus] = useState('');
 const [showPopup, setShowPopup] = useState(false);
 const [interviewCode, setInterviewCode] = useState('');
 const [hasPG, setHasPG] = useState(false);
 const [accepted, setAccepted] = useState(false);

 // Fetch event details
 useEffect(() => {
 const fetchEvent = async () => {
 try {
 const res = await fetch(`${API_BASE_URL}/api/events/slug/${eventId}`);
 if (!res.ok) throw new Error('Not found');
 setEvent(await res.json());
 } catch {
 setEvent(null);
 } finally {
 setLoading(false);
 }
 };
 fetchEvent();
 }, [eventId]);

 // Upload file to Firebase Storage
 const uploadFile = async (file, path) => {
 if (!file) return '';
 try {
 const snap = await uploadBytes(ref(storage, path), file);
 return await getDownloadURL(snap.ref);
 } catch (err) {
 console.error(`Upload error (${path}):`, err);
 throw err;
 }
 };

 const handleSubmit = async (e) => {
 e.preventDefault();
 if (!accepted || !event) return;
 setIsSubmitting(true);

 const form = e.target;
 // Safe field accessor — avoids HTMLFormElement native property conflicts (e.g. form.name)
 const el = (name) => form.elements[name]?.value || '';

 const code = generateInterviewCode();

 try {
 // — Upload documents —
 const profileFile = form.elements['profileImage']?.files?.[0];
 const resumeFile = form.elements['resume']?.files?.[0];
 const aadhaarFile = form.elements['aadhaarFile']?.files?.[0];
 const marksheetFile = form.elements['marksheet']?.files?.[0];

 const prefix = `event-registrations/${event.id || eventId}/${code}`;

 setUploadStatus('Uploading Profile Photo...');
 const profileUrl = await uploadFile(profileFile, `${prefix}/profile_${profileFile?.name || 'photo'}`);

 setUploadStatus('Uploading Resume...');
 const resumeUrl = await uploadFile(resumeFile, `${prefix}/resume_${resumeFile?.name || 'resume'}`);

 setUploadStatus('Uploading Aadhaar Card...');
 const aadhaarUrl = await uploadFile(aadhaarFile, `${prefix}/aadhaar_${aadhaarFile?.name || 'aadhaar'}`);

 setUploadStatus('Uploading Marksheet...');
 const marksheetUrl = await uploadFile(marksheetFile, `${prefix}/marksheet_${marksheetFile?.name || 'marksheet'}`);

 setUploadStatus('Saving registration...');

 // — Build full payload —
 const payload = {
 eventId: event.id || eventId,
 eventTitle: event.title || '',
 interviewCode: code,

 // Section 1 — Personal Details
 name: el('name'),
 fathername: el('fatherName'),
 gender: el('gender'),
 dateofbirth: el('dob'),
 email: el('email'),
 phonenumber: el('phone'),
 alternativenumber: el('altPhone'),
 address: el('address'),

 // Section 2 — 12th Standard
 schoolname: el('twelfthSchool'),
 board: el('twelfthBoard'),
 yearofpassing: el('twelfthYear'),
 stream: el('twelfthStream'),
 percentage: el('twelfthPercentage'),

 // Section 3 — UG
 ugcollegename: el('ugCollege'),
 uguniversityname: el('ugUniversity'),
 ugpassedoutyear: el('ugYear'),
 ugcourse: `${el('ugQualification')} - ${el('ugCourse')}`,
 ugcgpa: el('ugCgpa'),

 // Section 4 — PG (conditional)
 ...(hasPG && {
 pgcollegename: el('pgCollege'),
 pguniversityname: el('pgUniversity'),
 pgpassedoutyear: el('pgYear'),
 pgqualification: el('pgQualification'),
 pgcourse: el('pgCourse'),
 pgcgpa: el('pgCgpa'),
 }),

 // Section 5 — Skills
 technicalskills: el('skills'),

 // Section 6 — Identity
 aadharnumber: el('aadhaar'),

 // Section 7 — Document URLs
 profilephoto: profileUrl,
 resume: resumeUrl,
 aadhaarcard: aadhaarUrl,
 lastsemestermarksheet: marksheetUrl,
 };

 // — POST to backend —
 const res = await fetch(`${API_BASE_URL}/api/events/${event.id || eventId}/register`, {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify(payload),
 });

 if (!res.ok) {
 const err = await res.json();
 throw new Error(err.error || 'Registration failed');
 }

 // Save to local cache
 const cached = JSON.parse(localStorage.getItem('event-candidates')) || [];
 localStorage.setItem('event-candidates', JSON.stringify([...cached, { ...payload }]));

 setInterviewCode(code);
 setShowPopup(true);
 form.reset();
 setAccepted(false);
 setHasPG(false);

 } catch (err) {
 alert('Registration failed: ' + err.message);
 } finally {
 setIsSubmitting(false);
 setUploadStatus('');
 }
 };

 // ─── Loading / Not Found states ────────────────────────────────────────
 if (loading) {
 return (
 <div className="min-h-screen flex items-center justify-center bg-gray-50">
 <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
 </div>
 );
 }

 if (!event) {
 return (
 <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gray-50">
 <h2 className="text-2xl font-bold text-slate-900 mb-2">Event Not Found</h2>
 <p className="text-slate-500 mb-6">This event doesn't exist or has been removed.</p>
 <Link to="/events" className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition">← Back to Events</Link>
 </div>
 );
 }

 return (
 <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">

 {/* ── Header ──────────────────────────────────────────────────── */}
 <header className="w-full bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white py-10 shadow-xl border-b-4 border-blue-600 mb-0">
 <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center space-y-4">
 <Link to={`/event/${eventId}`} className="text-blue-200 hover:text-white text-sm flex items-center gap-1 self-start">
 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
 </svg>
 Back to Event
 </Link>
 <span className="text-xs font-bold tracking-widest uppercase text-blue-200 bg-white/10 px-4 py-1.5 rounded-full">
 Event Registration
 </span>
 <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">{event.title}</h1>
 {event.subtitle && <p className="text-blue-100 text-base font-medium">{event.subtitle}</p>}
 <div className="flex flex-wrap justify-center gap-3 text-sm font-semibold text-blue-100">
 {event.date && <span className="bg-blue-600/50 px-5 py-2 rounded-full border border-blue-400/30">📅 {event.date}</span>}
 {event.venue && <span className="bg-blue-600/50 px-5 py-2 rounded-full border border-blue-400/30">📍 {event.venue}</span>}
 {event.category && <span className="bg-blue-600/50 px-5 py-2 rounded-full border border-blue-400/30">{event.category}</span>}
 </div>
 </div>
 </header>

 {/* ── Form ────────────────────────────────────────────────────── */}
 <main className="max-w-7xl mx-auto px-4 py-8">
 <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl overflow-hidden">

 {/* Form title bar */}
 <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white">
 <h2 className="text-2xl font-bold flex items-center gap-3">
 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
 </svg>
 Candidate Registration Form
 </h2>
 <p className="text-blue-200 mt-1">Fill in your details to register for this event</p>
 </div>

 <div className="p-8 space-y-8">

 {/* ── Section 1: Personal Details ─────────────────── */}
 <section className="space-y-4">
 <SectionTitle icon="👤" title="Personal Details" />
 <div className="grid md:grid-cols-3 gap-4">
 <Field label="Full Name" name="name" required placeholder="Enter your full name" />
 <Field label="Father's Name" name="fatherName" required placeholder="Enter father's name" />
 <Field label="Date of Birth" name="dob" type="date" required />
 <SelectField label="Gender" name="gender" required options={['Male', 'Female', 'Other']} />
 <Field label="Email Address" name="email" type="email" required placeholder="you@example.com" />
 <Field label="Phone Number" name="phone" required placeholder="10-digit mobile" pattern="[0-9]{10}" maxLength={10} />
 <Field label="Alternative Number" name="altPhone" placeholder="Alternative contact" maxLength={10} />
 </div>
 <div className="space-y-1">
 <label className="text-sm font-medium text-gray-700">Full Address <span className="text-red-500">*</span></label>
 <textarea name="address" placeholder="Enter your complete address with PIN code" required rows={3} className="input-field resize-none" />
 </div>
 </section>

 {/* ── Section 2: 12th Standard ────────────────────── */}
 <section className="space-y-4">
 <SectionTitle icon="📚" title="12th Standard (Higher Secondary) Details" />
 <div className="bg-blue-50 p-5 rounded-xl border border-purple-100">
 <div className="grid md:grid-cols-3 gap-4">
 <Field label="School Name" name="twelfthSchool" required placeholder="Enter school name" />
 <SelectField label="Board" name="twelfthBoard" required options={['CBSE', 'ICSE', 'State Board', 'IB', 'Other']} />
 <Field label="Year of Passing" name="twelfthYear" required placeholder="e.g., 2020" />
 </div>
 <div className="grid md:grid-cols-2 gap-4 mt-4">
 <SelectField label="Stream" name="twelfthStream" required options={['Science (PCM)', 'Science (PCB)', 'Commerce', 'Arts/Humanities', 'Vocational']} />
 <Field label="Percentage / CGPA" name="twelfthPercentage" required placeholder="e.g., 85% or 8.5 CGPA" />
 </div>
 </div>
 </section>

 {/* ── Section 3: UG Details ───────────────────────── */}
 <section className="space-y-4">
 <SectionTitle icon="🎓" title="Undergraduate (UG) Details" />
 <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
 <div className="grid md:grid-cols-3 gap-4">
 <Field label="College Name" name="ugCollege" required placeholder="Enter college name" />
 <Field label="University Name" name="ugUniversity" required placeholder="Enter university name" />
 <Field label="Passed Out Year" name="ugYear" required placeholder="e.g., 2024" />
 </div>
 <div className="grid md:grid-cols-3 gap-4 mt-4">
 <SelectField label="Qualification" name="ugQualification" required options={['B.Tech', 'B.E', 'BCA', 'B.Sc', 'BBA', 'B.Com', 'BA', 'Other']} />
 <Field label="Course / Branch" name="ugCourse" required placeholder="e.g., Computer Science" />
 <Field label="CGPA / Percentage" name="ugCgpa" required placeholder="e.g., 8.5 or 85%" />
 </div>
 </div>
 </section>

 {/* ── Section 4: PG Details (conditional) ────────── */}
 <section className="space-y-4">
 <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-5 rounded-xl border border-green-200">
 <label className="flex items-center gap-3 cursor-pointer">
 <input type="checkbox" checked={hasPG} onChange={e => setHasPG(e.target.checked)}
 className="w-5 h-5 text-green-600 rounded border-gray-300 focus:ring-green-500" />
 <div>
 <p className="font-semibold text-green-800">I have completed Post Graduation (PG)</p>
 <p className="text-sm text-green-600">Check this box if you have completed or are pursuing a PG degree</p>
 </div>
 </label>
 </div>
 {hasPG && (
 <div className="space-y-4 animate-slideDown">
 <SectionTitle icon="🔬" title="Post Graduation (PG) Details" color="text-green-700" border="border-green-100" />
 <div className="bg-green-50 p-5 rounded-xl border border-green-100">
 <div className="grid md:grid-cols-3 gap-4">
 <Field label="College Name" name="pgCollege" required={hasPG} placeholder="Enter college name" />
 <Field label="University Name" name="pgUniversity" required={hasPG} placeholder="Enter university name" />
 <Field label="Passed Out Year" name="pgYear" required={hasPG} placeholder="e.g., 2026" />
 </div>
 <div className="grid md:grid-cols-3 gap-4 mt-4">
 <SelectField label="Qualification" name="pgQualification" required={hasPG} options={['M.Tech', 'M.E', 'MCA', 'M.Sc', 'MBA', 'M.Com', 'MA', 'Other']} />
 <Field label="Specialization / Course" name="pgCourse" required={hasPG} placeholder="e.g., Data Science" />
 <Field label="CGPA / Percentage" name="pgCgpa" required={hasPG} placeholder="e.g., 8.5 or 85%" />
 </div>
 </div>
 </div>
 )}
 </section>

 {/* ── Section 5: Skills ───────────────────────────── */}
 <section className="space-y-4">
 <SectionTitle icon="💡" title="Skills & Expertise" />
 <div className="space-y-1">
 <label className="text-sm font-medium text-gray-700">Technical Skills <span className="text-red-500">*</span></label>
 <input name="skills" placeholder="Java, React, Python, SQL, Machine Learning..." required className="input-field" />
 <p className="text-xs text-gray-500 mt-1">💡 Separate skills with commas</p>
 </div>
 </section>

 {/* ── Section 6: Identity ─────────────────────────── */}
 <section className="space-y-4">
 <SectionTitle icon="🪪" title="Identity Verification" />
 <div className="max-w-md">
 <div className="space-y-1">
 <label className="text-sm font-medium text-gray-700">Aadhaar Number <span className="text-red-500">*</span></label>
 <input name="aadhaar" placeholder="12-digit Aadhaar number" pattern="[0-9]{12}" maxLength={12} required className="input-field" />
 <p className="text-xs text-gray-500 mt-1">💡 For identity verification only</p>
 </div>
 </div>
 </section>

 {/* ── Section 7: Document Upload ──────────────────── */}
 <section className="space-y-4">
 <SectionTitle icon="📁" title="Upload Documents" />
 <div className="grid md:grid-cols-2 gap-6">
 <FileCard name="profileImage" label="Profile Photo" accept="image/png,image/jpeg" desc="PNG, JPEG (Max 2MB)" color="blue" />
 <FileCard name="resume" label="Resume" accept=".pdf" desc="PDF only (Max 5MB)" color="green" />
 <FileCard name="aadhaarFile" label="Aadhaar Card" accept="image/png,image/jpeg,.pdf" desc="PNG, JPEG or PDF" color="purple" />
 <FileCard name="marksheet" label="Last Semester Marksheet" accept="image/png,image/jpeg,.pdf" desc="PNG, JPEG or PDF" color="orange" />
 </div>
 </section>

 {/* ── Section 8: Terms & Declaration ─────────────── */}
 <section className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
 <label className="flex items-start gap-4 cursor-pointer">
 <input type="checkbox" checked={accepted} onChange={e => setAccepted(e.target.checked)}
 className="w-5 h-5 mt-1 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
 <div>
 <p className="font-medium text-gray-800">Terms & Conditions</p>
 <p className="text-sm text-gray-600 mt-1">
 I hereby declare that all the information provided above is true and correct. I authorize SwordNex Technologies to use my data for recruitment purposes, job-related communications, and career opportunities.
 </p>
 </div>
 </label>
 </section>

 {/* Upload progress */}
 {isSubmitting && uploadStatus && (
 <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
 <svg className="animate-spin h-5 w-5 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24">
 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
 </svg>
 <p className="text-blue-700 text-sm font-medium">{uploadStatus}</p>
 </div>
 )}

 {/* Submit button */}
 <button type="submit" disabled={!accepted || isSubmitting}
 className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${accepted && !isSubmitting
 ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
 : 'bg-gray-200 text-gray-400 cursor-not-allowed'
 }`}>
 {isSubmitting ? (
 <>
 <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
 </svg>
 <span>Submitting & Uploading Documents...</span>
 </>
 ) : (
 <>
 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
 </svg>
 Submit & Generate Interview Code
 </>
 )}
 </button>
 </div>
 </form>
 </main>

 {/* ── Success Popup ────────────────────────────────────────────── */}
 {showPopup && (
 <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
 <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-popup">
 <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white text-center">
 <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
 <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
 </svg>
 </div>
 <h2 className="text-2xl font-bold">Registration Successful!</h2>
 <p className="text-green-100 mt-1">{event.title}</p>
 <p className="text-green-50 text-xs mt-2 font-medium">✨ Check your email for confirmation ✨</p>
 </div>
 <div className="p-6 text-center space-y-4">
 <div>
 <p className="text-gray-500 text-sm mb-2">Your Unique Interview Code</p>
 <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-4xl font-mono font-bold py-5 px-6 rounded-xl tracking-[0.3em]">
 {interviewCode}
 </div>
 <p className="text-xs text-gray-400 mt-3">📌 This is your unique 5-character code</p>
 </div>
 <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-left">
 <p className="text-amber-800 font-medium flex items-center gap-2">
 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
 </svg>
 Important Instructions
 </p>
 <ul className="text-sm text-amber-700 mt-2 space-y-1">
 <li>• Take a screenshot of this code</li>
 <li>• Save this code safely</li>
 <li>• Bring this code on the event day</li>
 <li>• Carry original documents</li>
 </ul>
 </div>
 <p className="text-gray-600">All the best! — <span className="font-semibold text-blue-600">SwordNex Team</span> 😊</p>
 <button onClick={() => setShowPopup(false)}
 className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all">
 Close
 </button>
 </div>
 </div>
 </div>
 )}

 {/* Footer */}
 <footer className="bg-gray-800 text-gray-400 text-center py-6 mt-12">
 <p>© 2026 SwordNex Technologies. All rights reserved.</p>
 </footer>

 <style>{`
 .input-field {
 width: 100%;
 padding: 12px 16px;
 border: 2px solid #e5e7eb;
 border-radius: 12px;
 font-size: 15px;
 transition: all 0.2s ease;
 background: #f9fafb;
 }
 .input-field:focus {
 outline: none;
 border-color: #3b82f6;
 background: white;
 box-shadow: 0 0 0 4px rgba(59,130,246,0.1);
 }
 .input-field::placeholder { color: #9ca3af; }
 .file-upload-card {
 background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
 border: 2px dashed #cbd5e1;
 border-radius: 16px;
 padding: 20px;
 transition: all 0.3s ease;
 }
 .file-upload-card:hover {
 border-color: #3b82f6;
 background: linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%);
 }
 .file-input {
 width: 100%;
 padding: 8px;
 border: 1px solid #e5e7eb;
 border-radius: 8px;
 background: white;
 font-size: 14px;
 cursor: pointer;
 }
 .file-input::-webkit-file-upload-button {
 background: linear-gradient(135deg, #3b82f6, #6366f1);
 color: white;
 padding: 8px 16px;
 border: none;
 border-radius: 6px;
 cursor: pointer;
 margin-right: 12px;
 font-weight: 500;
 }
 @keyframes popup {
 from { opacity: 0; transform: scale(0.8) translateY(20px); }
 to { opacity: 1; transform: scale(1) translateY(0); }
 }
 .animate-popup { animation: popup 0.4s ease-out forwards; }
 @keyframes slideDown {
 from { opacity: 0; transform: translateY(-20px); }
 to { opacity: 1; transform: translateY(0); }
 }
 .animate-slideDown { animation: slideDown 0.3s ease-out forwards; }
 `}</style>
 </div>
 );
};

// ── Reusable field components ────────────────────────────────────────────────
const Field = ({ label, name, type = 'text', required = false, placeholder, pattern, maxLength }) => (
 <div className="space-y-1">
 <label className="text-sm font-medium text-gray-700">
 {label} {required && <span className="text-red-500">*</span>}
 </label>
 <input type={type} name={name} placeholder={placeholder} pattern={pattern}
 maxLength={maxLength} required={required} className="input-field" />
 </div>
);

const SelectField = ({ label, name, required = false, options }) => (
 <div className="space-y-1">
 <label className="text-sm font-medium text-gray-700">
 {label} {required && <span className="text-red-500">*</span>}
 </label>
 <select name={name} required={required} className="input-field">
 <option value="">Select {label}</option>
 {options.map(o => <option key={o} value={o}>{o}</option>)}
 </select>
 </div>
);

const SectionTitle = ({ icon, title, color = 'text-blue-700', border = 'border-blue-100' }) => (
 <div className={`flex items-center gap-2 ${color} font-semibold text-lg border-b-2 ${border} pb-2`}>
 <span className="text-xl">{icon}</span>
 {title}
 </div>
);

const colorMap = {
 blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
 green: { bg: 'bg-green-100', text: 'text-green-600' },
 purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
 orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
};

const FileCard = ({ name, label, accept, desc, color }) => {
 const c = colorMap[color] || colorMap.blue;
 return (
 <div className="file-upload-card">
 <div className="flex items-center gap-3 mb-3">
 <div className={`p-2 ${c.bg} rounded-lg`}>
 <svg className={`w-6 h-6 ${c.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
 d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
 </svg>
 </div>
 <div>
 <p className="font-medium text-gray-800">{label}</p>
 <p className="text-xs text-gray-500">{desc}</p>
 </div>
 </div>
 <input type="file" name={name} accept={accept} required className="file-input" />
 </div>
 );
};

export default EventRegisterPage;
