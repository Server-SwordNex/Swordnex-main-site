import React, { useState } from 'react';

const WorkshopEnquiryForm = ({ isOpen, onClose, workshopTitle }) => {
 const [form, setForm] = useState({
 name: '',
 email: '',
 phone: '',
 workshopTitle: workshopTitle || '',
 notes: '',
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
 const existing = JSON.parse(localStorage.getItem('workshop_enquiries')) || [];
 localStorage.setItem('workshop_enquiries', JSON.stringify([entry, ...existing]));
 onClose?.();
 alert('Workshop enquiry submitted. We will contact you shortly.');
 } catch (err) {
 alert('Failed to submit. Please try again.');
 } finally {
 setSubmitting(false);
 }
 };

 return (
 <div className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
 <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-auto">
 <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
 <h2 className="text-lg font-bold text-slate-900">Workshop Enquiry</h2>
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
 <div className="grid grid-cols-2 gap-4">
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
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
 <input
 type="tel"
 name="phone"
 required
 value={form.phone}
 onChange={handleChange}
 maxLength={10}
 className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
 placeholder="e.g., 9876543210"
 />
 </div>
 </div>
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Workshop</label>
 <input
 type="text"
 name="workshopTitle"
 required
 value={form.workshopTitle}
 onChange={handleChange}
 className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
 placeholder="e.g., Python Masterclass"
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
 <textarea
 name="notes"
 rows={3}
 value={form.notes}
 onChange={handleChange}
 className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
 placeholder="Any specific questions or requirements?"
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
 {submitting ? 'Submitting...' : 'Submit Enquiry'}
 </button>
 </div>
 </form>
 </div>
 </div>
 );
};

export default WorkshopEnquiryForm;

