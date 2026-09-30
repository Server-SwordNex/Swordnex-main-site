import React, { useState } from "react";
import { storage } from "../config/FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import API_BASE_URL from '../config/apiConfig';

// Generate unique 5-character code (2 letters + 3 numbers)
const generateUniqueCode = () => {
 const existingCandidates = JSON.parse(localStorage.getItem("candidates")) || [];
 const existingCodes = existingCandidates.map(c => c.code);

 const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ"; // Removed I, O to avoid confusion
 const numbers = "0123456789";

 let code;
 let attempts = 0;
 const maxAttempts = 1000;

 do {
 // Generate 2 random letters + 3 random numbers = 5 characters
 const letter1 = letters[Math.floor(Math.random() * letters.length)];
 const letter2 = letters[Math.floor(Math.random() * letters.length)];
 const num1 = numbers[Math.floor(Math.random() * numbers.length)];
 const num2 = numbers[Math.floor(Math.random() * numbers.length)];
 const num3 = numbers[Math.floor(Math.random() * numbers.length)];

 code = `${letter1}${letter2}${num1}${num2}${num3}`;
 attempts++;

 if (attempts >= maxAttempts) {
 // Fallback: use timestamp to ensure uniqueness
 const timestamp = Date.now().toString().slice(-3);
 code = `${letter1}${letter2}${timestamp}`;
 break;
 }
 } while (existingCodes.includes(code));

 return code;
};

const JobFairForm = () => {
 const [accepted, setAccepted] = useState(false);
 const [showPopup, setShowPopup] = useState(false);
 const [code, setCode] = useState("");
 const [formData, setFormData] = useState({});
 const [hasPG, setHasPG] = useState(false);
 const [isSubmitting, setIsSubmitting] = useState(false);

 // Helper function to upload a single file
 const uploadFile = async (file, path) => {
 if (!file) return "";
 try {
 const storageRef = ref(storage, path);
 const snapshot = await uploadBytes(storageRef, file);
 const url = await getDownloadURL(snapshot.ref);
 return url;
 } catch (error) {
 console.error(`Error uploading file to ${path}:`, error);
 throw error;
 }
 };



 // Brevo Email Function (Triggered via Backend to avoid CORS)
 const sendEmail = async (email, name, interviewCode) => {
 try {
 const res = await fetch(`${API_BASE_URL}/api/trigger-email`, {
 method: "POST",
 headers: {
 "Content-Type": "application/json"
 },
 body: JSON.stringify({
 email: email,
 name: name,
 interviewCode: interviewCode
 })
 });

 if (!res.ok) {
 const errData = await res.json();
 console.error("Email Trigger Failed. Server responded:", errData);
 alert("Email failed to send: " + (errData.error || "Unknown error"));
 } else {
 console.log("Email trigger request sent to backend.");
 }
 } catch (e) {
 console.error("Network Error triggering email:", e);
 }
 };


 const handleSubmit = async (e) => {
 e.preventDefault();
 setIsSubmitting(true);
 const form = e.target;

 // Generate unique 5-character code
 const generatedCode = generateUniqueCode();

 // Get files from form inputs
 const profileImageFile = form.profileImage.files[0];
 const resumeFile = form.resume.files[0];
 const aadhaarFile = form.aadhaarFile.files[0];
 const marksheetFile = form.marksheet.files[0];

 // Upload files
 const [profileUrl, resumeUrl, aadhaarUrl, marksheetUrl] = await Promise.all([
 uploadFile(profileImageFile, `jobfair/${generatedCode}/profile_${profileImageFile?.name}`),
 uploadFile(resumeFile, `jobfair/${generatedCode}/resume_${resumeFile?.name}`),
 uploadFile(aadhaarFile, `jobfair/${generatedCode}/aadhaar_${aadhaarFile?.name}`),
 uploadFile(marksheetFile, `jobfair/${generatedCode}/marksheet_${marksheetFile?.name}`)
 ]);

 // Mapping form data to backend schema
 // NOTE: Use form.elements['fieldName'].value — NOT form.fieldName.value
 // because form.name / form.method / form.action etc. are reserved HTMLFormElement
 // properties that return the form's own attributes, not the child inputs.
 const el = (name) => form.elements[name]?.value || "";

 const payload = {
 interviewCode: generatedCode,

 // Section 1 - Personal Details
 name: el("name"),
 fathername: el("fatherName"),
 gender: el("gender"),
 dateofbirth: el("dob"),
 email: el("email"),
 phonenumber: el("phone"),
 alternativenumber: el("altPhone"),
 address: el("address"),

 // Section 2 - 12th Standard Details
 schoolname: el("twelfthSchool"),
 board: el("twelfthBoard"),
 yearofpassing: el("twelfthYear"),
 stream: el("twelfthStream"),
 percentage: el("twelfthPercentage"),

 // Section 3 - UG Details
 ugcollegename: el("ugCollege"),
 uguniversityname: el("ugUniversity"),
 ugpassedoutyear: el("ugYear"),
 ugcourse: `${el("ugQualification")} - ${el("ugCourse")}`,
 ugcgpa: el("ugCgpa"),

 // Section 4 - PG Details (conditional)
 ...(hasPG && {
 pgcollegename: el("pgCollege"),
 pguniversityname: el("pgUniversity"),
 pgpassedoutyear: el("pgYear"),
 pgqualification: el("pgQualification"),
 pgcourse: el("pgCourse"),
 pgcgpa: el("pgCgpa"),
 }),

 // Section 5 - Technical Skills
 technicalskills: el("skills"),

 // Section 6 - Identity
 aadharnumber: el("aadhaar"),

 // Section 7 - Document URLs (uploaded to Firebase Storage)
 profilephoto: profileUrl || "",
 resume: resumeUrl || "",
 aadhaarcard: aadhaarUrl || "",
 lastsemestermarksheet: marksheetUrl || ""
 };

 try {
 const response = await fetch(`${API_BASE_URL}/api/jobfair`, {
 method: 'POST',
 headers: {
 'Content-Type': 'application/json',
 },
 body: JSON.stringify(payload),
 });

 if (response.ok) {
 // Keep local storage logic for fallback/convenience if needed, or remove. 
 // Assuming we keep it for now as per existing pattern.
 const candidate = {
 ...payload,
 code: generatedCode, // maintain 'code' key for local usage if any
 status: "pending",
 createdAt: new Date().toISOString(),
 };

 const existing = JSON.parse(localStorage.getItem("candidates")) || [];
 localStorage.setItem("candidates", JSON.stringify([...existing, candidate]));

 setCode(generatedCode);
 setFormData(candidate);
 setShowPopup(true);
 form.reset();
 setAccepted(false);
 setHasPG(false);

 // Send confirmation email via Frontend (Trigger Backend)
 // Ensure we pass the exact values form the payload
 await sendEmail(payload.email, payload.name, generatedCode);
 } else {
 const errorData = await response.json();
 console.error("Submission failed:", errorData);
 alert("Registration failed. Please try again. " + (errorData.error || ""));
 }
 } catch (error) {
 console.error("Error submitting form:", error);
 alert("Error submitting form: " + error.message);
 } finally {
 setIsSubmitting(false);
 }
 };

 return (
 <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
 {/* Header */}
 <header className="w-full bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white py-10 shadow-xl border-b-4 border-blue-600 mb-0">
 <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center space-y-5">
 <div className="w-20 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg border border-blue-500/50">
 <svg className="w-10 h-10 text-white opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
 </svg>
 </div>
 <div>
 <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
 SwordNex Mega Job Fair 2026
 </h1>
 <p className="text-blue-100 text-base mt-3 font-medium">
 • IT Jobs • Non-IT Jobs • Operation • Banking & Engineering
 </p>
 </div>
 <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold text-blue-100">
 <span className="bg-blue-600/50 px-6 py-2 rounded-full border border-blue-400/30">
 📅 Jan 25 - Feb 05, 2026
 </span>
 <span className="bg-blue-600/50 px-6 py-2 rounded-full border border-blue-400/30">
 Live Now
 </span>
 </div>
 </div>
 </header>

 {/* Main Form */}
 <main className="max-w-7xl mx-auto px-4 py-8">
 <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl overflow-hidden">
 {/* Form Header */}
 <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white">
 <h2 className="text-2xl font-bold flex items-center gap-3 text-center">
 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
 </svg>
 Candidate Registration Form
 </h2>
 <p className="text-blue-200 mt-1">Fill in your details to register for the job fair</p>
 </div>

 <div className="p-8 space-y-8">
 {/* Personal Details Section */}
 <section className="space-y-4">
 <div className="flex items-center gap-2 text-blue-700 font-semibold text-lg border-b-2 border-blue-100 pb-2">
 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
 </svg>
 Personal Details
 </div>

 <div className="grid md:grid-cols-3 gap-4">
 <div className="space-y-1">
 <label className="text-sm font-medium text-gray-700">
 Full Name <span className="text-red-500">*</span>
 </label>
 <input name="name" placeholder="Enter your full name" required className="input-field" />
 </div>
 <div className="space-y-1">
 <label className="text-sm font-medium text-gray-700">
 Father's Name <span className="text-red-500">*</span>
 </label>
 <input name="fatherName" placeholder="Enter father's name" required className="input-field" />
 </div>
 <div className="space-y-1">
 <label className="text-sm font-medium text-gray-700">
 Date of Birth <span className="text-red-500">*</span>
 </label>
 <input name="dob" type="date" required className="input-field" />
 </div>
 <div className="space-y-1">
 <label className="text-sm font-medium text-gray-700">
 Gender <span className="text-red-500">*</span>
 </label>
 <select name="gender" required className="input-field">
 <option value="">Select Gender</option>
 <option value="Male">Male</option>
 <option value="Female">Female</option>
 <option value="Other">Other</option>
 </select>
 </div>
 </div>

 <div className="grid md:grid-cols-3 gap-4">
 <div className="space-y-1">
 <label className="text-sm font-medium text-gray-700">
 Email Address <span className="text-red-500">*</span>
 </label>
 <input name="email" type="email" placeholder="your.email@example.com" required className="input-field" />
 </div>
 <div className="space-y-1">
 <label className="text-sm font-medium text-gray-700">
 Phone Number <span className="text-red-500">*</span>
 </label>
 <input name="phone" placeholder="10-digit mobile number" pattern="[0-9]{10}" maxLength={10} required className="input-field" />
 </div>
 <div className="space-y-1">
 <label className="text-sm font-medium text-gray-700">Alternative Number</label>
 <input name="altPhone" placeholder="Alternative contact" maxLength={10} className="input-field" />
 </div>
 </div>

 <div className="space-y-1">
 <label className="text-sm font-medium text-gray-700">
 Full Address <span className="text-red-500">*</span>
 </label>
 <textarea name="address" placeholder="Enter your complete address with PIN code" required rows={3} className="input-field resize-none" />
 </div>
 </section>

 {/* 12th Standard Section */}
 <section className="space-y-4">
 <div className="flex items-center gap-2 text-blue-700 font-semibold text-lg border-b-2 border-blue-100 pb-2">
 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
 </svg>
 12th Standard (Higher Secondary) Details
 </div>

 <div className="bg-blue-50 p-5 rounded-xl border border-purple-100">
 <div className="grid md:grid-cols-3 gap-4">
 <div className="space-y-1">
 <label className="text-sm font-medium text-gray-700">
 School Name <span className="text-red-500">*</span>
 </label>
 <input name="twelfthSchool" placeholder="Enter school name" required className="input-field" />
 </div>
 <div className="space-y-1">
 <label className="text-sm font-medium text-gray-700">
 Board <span className="text-red-500">*</span>
 </label>
 <select name="twelfthBoard" required className="input-field">
 <option value="">Select Board</option>
 <option value="CBSE">CBSE</option>
 <option value="ICSE">ICSE</option>
 <option value="State Board">State Board</option>
 <option value="IB">IB</option>
 <option value="Other">Other</option>
 </select>
 </div>
 <div className="space-y-1">
 <label className="text-sm font-medium text-gray-700">
 Year of Passing <span className="text-red-500">*</span>
 </label>
 <input name="twelfthYear" placeholder="e.g., 2020" required className="input-field" />
 </div>
 </div>

 <div className="grid md:grid-cols-2 gap-4 mt-4">
 <div className="space-y-1">
 <label className="text-sm font-medium text-gray-700">
 Stream <span className="text-red-500">*</span>
 </label>
 <select name="twelfthStream" required className="input-field">
 <option value="">Select Stream</option>
 <option value="Science (PCM)">Science (PCM)</option>
 <option value="Science (PCB)">Science (PCB)</option>
 <option value="Commerce">Commerce</option>
 <option value="Arts/Humanities">Arts/Humanities</option>
 <option value="Vocational">Vocational</option>
 </select>
 </div>
 <div className="space-y-1">
 <label className="text-sm font-medium text-gray-700">
 Percentage/CGPA <span className="text-red-500">*</span>
 </label>
 <input name="twelfthPercentage" placeholder="e.g., 85% or 8.5 CGPA" required className="input-field" />
 </div>
 </div>
 </div>
 </section>

 {/* UG Section */}
 <section className="space-y-4">
 <div className="flex items-center gap-2 text-blue-700 font-semibold text-lg border-b-2 border-blue-100 pb-2">
 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path d="M12 14l9-5-9-5-9 5 9 5z" />
 <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
 </svg>
 UG (Undergraduate) Details
 </div>

 <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
 <div className="grid md:grid-cols-3 gap-4">
 <div className="space-y-1">
 <label className="text-sm font-medium text-gray-700">
 College Name <span className="text-red-500">*</span>
 </label>
 <input name="ugCollege" placeholder="Enter college name" required className="input-field" />
 </div>
 <div className="space-y-1">
 <label className="text-sm font-medium text-gray-700">
 University <span className="text-red-500">*</span>
 </label>
 <input name="ugUniversity" placeholder="Enter university name" required className="input-field" />
 </div>
 <div className="space-y-1">
 <label className="text-sm font-medium text-gray-700">
 Passed Out Year <span className="text-red-500">*</span>
 </label>
 <input name="ugYear" placeholder="e.g., 2024" required className="input-field" />
 </div>
 </div>

 <div className="grid md:grid-cols-3 gap-4 mt-4">
 <div className="space-y-1">
 <label className="text-sm font-medium text-gray-700">
 Qualification <span className="text-red-500">*</span>
 </label>
 <select name="ugQualification" required className="input-field">
 <option value="">Select</option>
 <option value="B.Tech">B.Tech</option>
 <option value="B.E">B.E</option>
 <option value="BCA">BCA</option>
 <option value="B.Sc">B.Sc</option>
 <option value="BBA">BBA</option>
 <option value="B.Com">B.Com</option>
 <option value="BA">BA</option>
 <option value="Other">Other</option>
 </select>
 </div>
 <div className="space-y-1">
 <label className="text-sm font-medium text-gray-700">
 Course/Branch <span className="text-red-500">*</span>
 </label>
 <input name="ugCourse" placeholder="e.g., Computer Science" required className="input-field" />
 </div>
 <div className="space-y-1">
 <label className="text-sm font-medium text-gray-700">
 CGPA / Percentage <span className="text-red-500">*</span>
 </label>
 <input name="ugCgpa" placeholder="e.g., 8.5 or 85%" required className="input-field" />
 </div>
 </div>
 </div>
 </section>

 {/* PG Checkbox */}
 <section className="space-y-4">
 <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-5 rounded-xl border border-green-200">
 <label className="flex items-center gap-3 cursor-pointer">
 <input
 type="checkbox"
 checked={hasPG}
 onChange={(e) => setHasPG(e.target.checked)}
 className="w-5 h-5 text-green-600 rounded border-gray-300 focus:ring-green-500"
 />
 <div>
 <p className="font-semibold text-green-800">I have completed Post Graduation (PG)</p>
 <p className="text-sm text-green-600">Check this box if you have completed or pursuing PG degree</p>
 </div>
 </label>
 </div>

 {/* PG Section - Conditional */}
 {hasPG && (
 <div className="space-y-4 animate-slideDown">
 <div className="flex items-center gap-2 text-green-700 font-semibold text-lg border-b-2 border-green-100 pb-2">
 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
 </svg>
 PG (Post Graduate) Details
 </div>

 <div className="bg-green-50 p-5 rounded-xl border border-green-100">
 <div className="grid md:grid-cols-3 gap-4">
 <div className="space-y-1">
 <label className="text-sm font-medium text-gray-700">
 College/Institution Name <span className="text-red-500">*</span>
 </label>
 <input name="pgCollege" placeholder="Enter college name" required={hasPG} className="input-field" />
 </div>
 <div className="space-y-1">
 <label className="text-sm font-medium text-gray-700">
 University <span className="text-red-500">*</span>
 </label>
 <input name="pgUniversity" placeholder="Enter university name" required={hasPG} className="input-field" />
 </div>
 <div className="space-y-1">
 <label className="text-sm font-medium text-gray-700">
 Passed Out Year <span className="text-red-500">*</span>
 </label>
 <input name="pgYear" placeholder="e.g., 2026" required={hasPG} className="input-field" />
 </div>
 </div>

 <div className="grid md:grid-cols-3 gap-4 mt-4">
 <div className="space-y-1">
 <label className="text-sm font-medium text-gray-700">
 Qualification <span className="text-red-500">*</span>
 </label>
 <select name="pgQualification" required={hasPG} className="input-field">
 <option value="">Select</option>
 <option value="M.Tech">M.Tech</option>
 <option value="M.E">M.E</option>
 <option value="MCA">MCA</option>
 <option value="M.Sc">M.Sc</option>
 <option value="MBA">MBA</option>
 <option value="M.Com">M.Com</option>
 <option value="MA">MA</option>
 <option value="Other">Other</option>
 </select>
 </div>
 <div className="space-y-1">
 <label className="text-sm font-medium text-gray-700">
 Specialization/Course <span className="text-red-500">*</span>
 </label>
 <input name="pgCourse" placeholder="e.g., Data Science" required={hasPG} className="input-field" />
 </div>
 <div className="space-y-1">
 <label className="text-sm font-medium text-gray-700">
 CGPA / Percentage <span className="text-red-500">*</span>
 </label>
 <input name="pgCgpa" placeholder="e.g., 8.5 or 85%" required={hasPG} className="input-field" />
 </div>
 </div>
 </div>
 </div>
 )}
 </section>

 {/* Skills Section */}
 <section className="space-y-4">
 <div className="flex items-center gap-2 text-blue-700 font-semibold text-lg border-b-2 border-blue-100 pb-2">
 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
 </svg>
 Skills & Expertise
 </div>

 <div className="space-y-1">
 <label className="text-sm font-medium text-gray-700">
 Technical Skills <span className="text-red-500">*</span>
 </label>
 <input name="skills" placeholder="Java, React, Python, SQL, Machine Learning..." required className="input-field" />
 <p className="text-xs text-gray-500 mt-1">💡 Separate skills with commas</p>
 </div>
 </section>

 {/* Identity Section */}
 <section className="space-y-4">
 <div className="flex items-center gap-2 text-blue-700 font-semibold text-lg border-b-2 border-blue-100 pb-2">
 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
 </svg>
 Identity Verification
 </div>

 <div className="max-w-md">
 <div className="space-y-1">
 <label className="text-sm font-medium text-gray-700">
 Aadhaar Number <span className="text-red-500">*</span>
 </label>
 <input name="aadhaar" placeholder="12-digit Aadhaar number" pattern="[0-9]{12}" maxLength={12} required className="input-field" />
 <p className="text-xs text-gray-500 mt-1">💡 For identity verification only</p>
 </div>
 </div>
 </section>

 {/* Document Upload Section */}
 <section className="space-y-4">
 <div className="flex items-center gap-2 text-blue-700 font-semibold text-lg border-b-2 border-blue-100 pb-2">
 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
 </svg>
 Upload Documents
 </div>

 <div className="grid md:grid-cols-2 gap-6">
 {/* Profile Image */}
 <div className="file-upload-card">
 <div className="flex items-center gap-3 mb-3">
 <div className="p-2 bg-blue-100 rounded-lg">
 <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
 </svg>
 </div>
 <div>
 <p className="font-medium text-gray-800">Profile Photo</p>
 <p className="text-xs text-gray-500">PNG, JPEG (Max 2MB)</p>
 </div>
 </div>
 <input type="file" name="profileImage" accept="image/png,image/jpeg" required className="file-input" />
 </div>

 {/* Resume */}
 <div className="file-upload-card">
 <div className="flex items-center gap-3 mb-3">
 <div className="p-2 bg-green-100 rounded-lg">
 <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
 </svg>
 </div>
 <div>
 <p className="font-medium text-gray-800">Resume</p>
 <p className="text-xs text-gray-500">PDF only (Max 5MB)</p>
 </div>
 </div>
 <input type="file" name="resume" accept=".pdf" required className="file-input" />
 </div>

 {/* Aadhaar Card */}
 <div className="file-upload-card">
 <div className="flex items-center gap-3 mb-3">
 <div className="p-2 bg-purple-100 rounded-lg">
 <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
 </svg>
 </div>
 <div>
 <p className="font-medium text-gray-800">Aadhaar Card</p>
 <p className="text-xs text-gray-500">PNG, JPEG, PDF</p>
 </div>
 </div>
 <input type="file" name="aadhaarFile" accept="image/png,image/jpeg,.pdf" required className="file-input" />
 </div>

 {/* Marksheet */}
 <div className="file-upload-card">
 <div className="flex items-center gap-3 mb-3">
 <div className="p-2 bg-orange-100 rounded-lg">
 <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
 </svg>
 </div>
 <div>
 <p className="font-medium text-gray-800">Last Semester Marksheet</p>
 <p className="text-xs text-gray-500">PNG, JPEG, PDF</p>
 </div>
 </div>
 <input type="file" name="marksheet" accept="image/png,image/jpeg,.pdf" required className="file-input" />
 </div>
 </div>
 </section>

 {/* Consent Section */}
 <section className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
 <label className="flex items-start gap-4 cursor-pointer">
 <input
 type="checkbox"
 checked={accepted}
 onChange={(e) => setAccepted(e.target.checked)}
 className="w-5 h-5 mt-1 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
 />
 <div>
 <p className="font-medium text-gray-800">Terms & Conditions</p>
 <p className="text-sm text-gray-600 mt-1">
 I hereby declare that all the information provided above is true and correct. I authorize SwordNex Technologies to use my data for recruitment purposes, job-related communications, and career opportunities.
 </p>
 </div>
 </label>
 </section>

 {/* Submit Button */}
 <button
 type="submit"
 disabled={!accepted || isSubmitting}
 className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${accepted && !isSubmitting
 ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
 : "bg-gray-200 text-gray-400 cursor-not-allowed"
 }`}
 >
 {isSubmitting ? (
 <>
 <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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

 {/* Success Popup */}
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
 <p className="text-green-100 mt-1">Welcome to SwordNex Job Fair</p>
 <p className="text-green-50 text-xs mt-2 font-medium">✨ Check your email for confirmation ✨</p>
 </div>

 <div className="p-6 text-center space-y-4">
 <div>
 <p className="text-gray-500 text-sm mb-2">Your Unique Interview Code</p>
 <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-4xl font-mono font-bold py-5 px-6 rounded-xl tracking-[0.3em]">
 {code}
 </div>
 <p className="text-xs text-gray-400 mt-3">
 📌 This is your unique 5-character code
 </p>
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
 <li>• Bring this code on interview day</li>
 <li>• Carry original documents</li>
 </ul>
 </div>

 <div className="pt-2">
 <p className="text-gray-600">
 All the best for shaping your career with{" "}
 <span className="font-semibold text-blue-600">SwordNex Team</span> 😊
 </p>
 </div>

 <button
 onClick={() => setShowPopup(false)}
 className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all"
 >
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

 <style>
 {`
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
 box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
 }
 
 .input-field::placeholder {
 color: #9ca3af;
 }
 
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
 
 .file-input::-webkit-file-upload-button:hover {
 background: linear-gradient(135deg, #2563eb, #4f46e5);
 }
 
 @keyframes popup {
 0% {
 opacity: 0;
 transform: scale(0.8) translateY(20px);
 }
 100% {
 opacity: 1;
 transform: scale(1) translateY(0);
 }
 }
 
 .animate-popup {
 animation: popup 0.4s ease-out forwards;
 }
 
 @keyframes slideDown {
 0% {
 opacity: 0;
 transform: translateY(-20px);
 }
 100% {
 opacity: 1;
 transform: translateY(0);
 }
 }
 
 .animate-slideDown {
 animation: slideDown 0.3s ease-out forwards;
 }
 `}
 </style>
 </div>
 );
};

export default JobFairForm;