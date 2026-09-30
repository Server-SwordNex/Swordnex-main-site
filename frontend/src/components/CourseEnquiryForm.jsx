import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config/apiConfig';

const COURSES = [
 'AI & Machine Learning',
 'Application Development',
 'Data Analytics',
 'Data Science',
 'Digital Marketing',
 'UI/UX Designing',
 'Full Stack Development',
 'Internship Program',
];

const FormContent = ({ form, handleChange, handleSubmit, submitting, onCancel, isPage }) => (
 <form onSubmit={handleSubmit} className="space-y-4">
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
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
 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
 <input
 type="text"
 name="location"
 required
 value={form.location}
 onChange={handleChange}
 className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
 placeholder="City / State"
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Mobile Number</label>
 <input
 type="tel"
 name="mobile"
 required
 value={form.mobile}
 onChange={handleChange}
 className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
 placeholder="e.g., 9876543210"
 />
 </div>
 </div>
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Course Interested</label>
 <select
 name="courseInterested"
 required
 value={form.courseInterested}
 onChange={handleChange}
 className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
 >
 <option value="">Select a course</option>
 {COURSES.map((c) => (
 <option key={c} value={c}>{c}</option>
 ))}
 </select>
 </div>
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Message / Internship Query</label>
 <textarea
 name="internshipRegarding"
 rows={3}
 value={form.internshipRegarding}
 onChange={handleChange}
 className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
 placeholder="Tell us about your goals or if you're looking for an internship"
 />
 </div>
 <div className={`flex gap-3 pt-2 ${isPage ? 'justify-center' : 'justify-end'}`}>
 {onCancel && (
 <button
 type="button"
 onClick={onCancel}
 className="px-5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
 >
 Cancel
 </button>
 )}
 <button
 type="submit"
 disabled={submitting}
 className={`px-6 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors ${isPage ? 'w-full max-w-xs' : ''}`}
 >
 {submitting ? 'Submitting...' : 'Submit Enquiry'}
 </button>
 </div>
 </form>
);

// Standalone full-page version
const CourseEnquiryPage = () => {
 const navigate = useNavigate();
 const [form, setForm] = useState({
 name: '', location: '', mobile: '', courseInterested: '', internshipRegarding: '',
 });
 const [submitting, setSubmitting] = useState(false);
 const [submitted, setSubmitted] = useState(false);

 const handleChange = (e) => {
 const { name, value } = e.target;
 setForm((prev) => ({ ...prev, [name]: value }));
 };

 const handleSubmit = async (e) => {
 e.preventDefault();
 setSubmitting(true);
 try {
 const response = await fetch(`${API_BASE_URL}/api/course-enquiries`, {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify(form),
 });
 if (!response.ok) throw new Error('Failed to submit');
 setSubmitted(true);
 } catch {
 alert('Failed to submit. Please try again.');
 } finally {
 setSubmitting(false);
 }
 };

 return (
 <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 flex items-center justify-center p-4">
 <div className="w-full max-w-lg">
 <button
 onClick={() => navigate(-1)}
 className="mb-6 flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium"
 >
 ← Back
 </button>

 <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
 <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-8 text-center">
 <h1 className="text-2xl font-bold text-white mb-1">Course Enquiry</h1>
 <p className="text-blue-100 text-sm">Fill in your details and we'll get back to you within 24 hours</p>
 </div>

 <div className="p-8">
 {submitted ? (
 <div className="text-center py-8">
 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
 <span className="text-green-600 text-3xl">✓</span>
 </div>
 <h3 className="text-xl font-bold text-slate-900 mb-2">Enquiry Submitted!</h3>
 <p className="text-slate-600 mb-6">Our team will contact you shortly.</p>
 <button
 onClick={() => navigate('/services/it-training-skill-development')}
 className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
 >
 Back to Courses
 </button>
 </div>
 ) : (
 <FormContent
 form={form}
 handleChange={handleChange}
 handleSubmit={handleSubmit}
 submitting={submitting}
 onCancel={null}
 isPage={true}
 />
 )}
 </div>
 </div>
 </div>
 </div>
 );
};

// Modal version (used inline in other components)
const CourseEnquiryForm = ({ isOpen, onClose, course }) => {
 const [form, setForm] = useState({
 name: '', location: '', mobile: '', courseInterested: course || '', internshipRegarding: '',
 });
 const [submitting, setSubmitting] = useState(false);

 if (!isOpen) return null;

 const handleChange = (e) => {
 const { name, value } = e.target;
 setForm((prev) => ({ ...prev, [name]: value }));
 };

 const handleSubmit = async (e) => {
 e.preventDefault();
 setSubmitting(true);
 try {
 const response = await fetch(`${API_BASE_URL}/api/course-enquiries`, {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify(form),
 });
 if (!response.ok) throw new Error('Failed to submit');
 onClose?.();
 alert('Your enquiry has been submitted. We will contact you shortly.');
 } catch {
 alert('Failed to submit. Please try again.');
 } finally {
 setSubmitting(false);
 }
 };

 return (
 <div className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
 <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-auto">
 <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
 <h2 className="text-lg font-bold text-slate-900">Course Enquiry</h2>
 <button
 type="button"
 onClick={onClose}
 className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full"
 aria-label="Close"
 >
 ×
 </button>
 </div>
 <div className="p-6">
 <FormContent
 form={form}
 handleChange={handleChange}
 handleSubmit={handleSubmit}
 submitting={submitting}
 onCancel={onClose}
 isPage={false}
 />
 </div>
 </div>
 </div>
 );
};

export { CourseEnquiryPage };
export default CourseEnquiryForm;
