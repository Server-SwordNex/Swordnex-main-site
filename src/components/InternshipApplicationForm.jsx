import React, { useState } from "react";

const InternshipApplicationForm = ({ isOpen, onClose }) => {
 const [form, setForm] = useState({
 name: "",
 email: "",
 phone: "",
 track: "",
 github: "",
 portfolio: "",
 notes: "",
 });
 const [submitting, setSubmitting] = useState(false);

 if (!isOpen) return null;

 const handleChange = (e) => {
 const { name, value } = e.target;
 setForm((prev) => ({ ...prev, [name]: value }));
 };

 const handleSubmit = (e) => {
 e.preventDefault();
 setSubmitting(true);
 try {
 const entry = {
 id: Date.now(),
 ...form,
 date: new Date().toLocaleString(),
 };
 const existing = JSON.parse(localStorage.getItem("internship_applications")) || [];
 localStorage.setItem("internship_applications", JSON.stringify([entry, ...existing]));
 onClose?.();
 alert("Application submitted. We will contact shortlisted candidates.");
 } catch (err) {
 alert("Failed to submit. Please try again.");
 } finally {
 setSubmitting(false);
 }
 };

 return (
 <div className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
 <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-auto">
 <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
 <h2 className="text-lg font-bold text-slate-900">Internship Application</h2>
 <button
 type="button"
 onClick={onClose}
 className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full"
 aria-label="Close"
 >
 ×
 </button>
 </div>
 <form onSubmit={handleSubmit} className="p-6 space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
 <input
 type="text"
 name="name"
 required
 value={form.name}
 onChange={handleChange}
 className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
 placeholder="Your full name"
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
 <input
 type="email"
 name="email"
 required
 value={form.email}
 onChange={handleChange}
 className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
 placeholder="you@example.com"
 />
 </div>
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
 <input
 type="tel"
 name="phone"
 required
 value={form.phone}
 onChange={handleChange}
 className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
 placeholder="e.g., 9876543210"
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Track</label>
 <input
 type="text"
 name="track"
 required
 value={form.track}
 onChange={handleChange}
 className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
 placeholder="e.g., Web Development"
 />
 </div>
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">GitHub</label>
 <input
 type="url"
 name="github"
 value={form.github}
 onChange={handleChange}
 className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
 placeholder="https://github.com/username"
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Portfolio</label>
 <input
 type="url"
 name="portfolio"
 value={form.portfolio}
 onChange={handleChange}
 className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
 placeholder="https://yourportfolio.com"
 />
 </div>
 </div>
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
 <textarea
 name="notes"
 rows={3}
 value={form.notes}
 onChange={handleChange}
 className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
 placeholder="Briefly tell us about your interest and availability"
 />
 </div>
 <div className="flex justify-end gap-3 pt-2">
 <button
 type="button"
 onClick={onClose}
 className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
 >
 Cancel
 </button>
 <button
 type="submit"
 disabled={submitting}
 className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
 >
 {submitting ? "Submitting..." : "Submit Application"}
 </button>
 </div>
 </form>
 </div>
 </div>
 );
};

export default InternshipApplicationForm;

