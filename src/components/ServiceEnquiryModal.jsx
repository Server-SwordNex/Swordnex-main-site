import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from "../config/apiConfig";

const ServiceEnquiryModal = ({ isOpen, onClose }) => {
 const services = useMemo(
 () => [
 { id: "web-development", label: "Web Development" },
 { id: "app-development", label: "App Development" },
 { id: "digital-marketing", label: "Digital Marketing" },
 { id: "hr-consulting", label: "HR Consulting Services" },
 { id: "professional-development", label: "Professional Development" },
 { id: "it-infrastructure", label: "IT Infrastructure" },
 { id: "saas-customisation", label: "SaaS Product Customisation" },
 { id: "ui-ux-design", label: "UI/UX Design" },
 { id: "branding", label: "Branding & Creative" },
 { id: "seo", label: "SEO" },
 { id: "other", label: "Other" }
 ],
 []
 );

 const [formData, setFormData] = useState({
 firstName: "",
 lastName: "",
 email: "",
 phone: "",
 company: "",
 selectedService: "",
 otherService: "",
 message: ""
 });

 const [notification, setNotification] = useState({ show: false, type: '', message: '' });
 const [isSubmitting, setIsSubmitting] = useState(false);

 if (!isOpen) return null;

 const handleChange = (e) => {
 const { name, value } = e.target;
 setFormData((prev) => {
 if (name === "selectedService" && value !== "other") {
 return { ...prev, selectedService: value, otherService: "" };
 }
 return { ...prev, [name]: value };
 });
 };

 const handleSubmit = async (e) => {
 e.preventDefault();
 setIsSubmitting(true);

 const serviceLabel =
 formData.selectedService === "other"
 ? formData.otherService
 : (services.find(s => s.id === formData.selectedService)?.label || "");

 const payload = {
 firstname: formData.firstName,
 lastname: formData.lastName,
 email: formData.email,
 phonenumber: formData.phone,
 company: formData.company,
 service: serviceLabel,
 projectdescription: formData.message
 };

 try {
 const response = await fetch(`${API_BASE_URL}/api/service-enquiries`, {
 method: 'POST',
 headers: {
 'Content-Type': 'application/json',
 },
 body: JSON.stringify(payload),
 });

 if (!response.ok) {
 throw new Error('Failed to submit enquiry');
 }

 // Success Animation
 setNotification({ show: true, type: 'success', message: 'Enquiry Sent Successfully!' });

 setFormData({
 firstName: "",
 lastName: "",
 email: "",
 phone: "",
 company: "",
 selectedService: "",
 otherService: "",
 message: ""
 });

 setTimeout(() => {
 setNotification({ show: false, type: '', message: '' });
 onClose();
 }, 3000);

 } catch (error) {
 console.error('Error submitting enquiry:', error);
 setNotification({ show: true, type: 'error', message: 'Failed to send enquiry. Please try again.' });
 setTimeout(() => setNotification({ show: false, type: '', message: '' }), 4000);
 } finally {
 setIsSubmitting(false);
 }
 };

 return (
 <div
 className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4"
 role="dialog"
 aria-modal="true"
 >
 {/* Backdrop */}
 <div
 className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
 onClick={onClose}
 />

 {/* Modal */}
 <div className="relative w-full h-full sm:h-auto sm:max-w-2xl bg-white sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">

 {/* Animated Notification Overlay */}
 <AnimatePresence>
 {notification.show && notification.type === 'success' && (
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 className="absolute inset-0 z-50 bg-white flex flex-col items-center justify-center p-8 text-center"
 >
 <motion.div
 initial={{ scale: 0.5, opacity: 0 }}
 animate={{ scale: 1, opacity: 1 }}
 transition={{ type: "spring", stiffness: 200, damping: 15 }}
 className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6"
 >
 <span className="material-symbols-outlined text-5xl text-green-600">check_circle</span>
 </motion.div>
 <h3 className="text-3xl font-bold text-slate-900 mb-3">Enquiry Received!</h3>
 <p className="text-slate-500 max-w-md text-lg">
 Thank you, {formData.firstName || 'User'}. We've received your project details and will get back to you shortly.
 </p>
 </motion.div>
 )}
 </AnimatePresence>

 {/* Header */}
 <div className="relative bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 px-6 py-5 sm:py-6 flex-shrink-0">
 <button
 type="button"
 onClick={onClose}
 className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/15 text-white flex items-center justify-center transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/60"
 aria-label="Close"
 title="Close"
 >
 <span className="material-symbols-outlined text-[22px] leading-none">
 close
 </span>
 </button>

 <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-blue-100">
 <span className="material-symbols-outlined text-base">forum</span>
 Enquiry
 </div>

 <h2 className="mt-3 text-xl sm:text-2xl font-bold text-white pr-12">
 Service Enquiry
 </h2>
 <p className="text-blue-100 text-xs sm:text-sm mt-1 opacity-95">
 Let&apos;s discuss your next big project.
 </p>
 </div>

 {/* Form Body */}
 <form
 onSubmit={handleSubmit}
 className="flex-1 overflow-y-auto px-6 py-6 space-y-6 sm:max-h-[80vh] scrollbar-thin scrollbar-thumb-slate-200"
 >
 {/* Notification Error */}
 <AnimatePresence>
 {notification.show && notification.type === 'error' && (
 <motion.div
 initial={{ opacity: 0, y: -20, height: 0 }}
 animate={{ opacity: 1, y: 0, height: 'auto' }}
 exit={{ opacity: 0, y: -20, height: 0 }}
 className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3"
 >
 <span className="material-symbols-outlined text-red-500">error</span>
 <span className="text-sm font-medium">{notification.message}</span>
 </motion.div>
 )}
 </AnimatePresence>

 {/* Contact */}
 <div className="space-y-4">
 <div className="flex items-center justify-between border-b border-blue-100 pb-2">
 <h3 className="text-[11px] font-bold tracking-widest text-blue-500 uppercase">
 Contact Information
 </h3>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div className="space-y-1">
 <label className="text-xs font-semibold text-slate-700 ml-1">
 First Name <span className="text-red-600">*</span>
 </label>
 <input
 name="firstName"
 required
 value={formData.firstName}
 onChange={handleChange}
 className="w-full h-12 rounded-xl border border-blue-200 bg-blue-50/40 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
 placeholder="John"
 />
 </div>

 <div className="space-y-1">
 <label className="text-xs font-semibold text-slate-700 ml-1">
 Last Name <span className="text-red-600">*</span>
 </label>
 <input
 name="lastName"
 required
 value={formData.lastName}
 onChange={handleChange}
 className="w-full h-12 rounded-xl border border-blue-200 bg-blue-50/40 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
 placeholder="Doe"
 />
 </div>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div className="space-y-1">
 <label className="text-xs font-semibold text-slate-700 ml-1">
 Email Address <span className="text-red-600">*</span>
 </label>
 <input
 name="email"
 type="email"
 required
 value={formData.email}
 onChange={handleChange}
 className="w-full h-12 rounded-xl border border-blue-200 bg-blue-50/40 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
 placeholder="name@company.com"
 />
 </div>

 <div className="space-y-1">
 <label className="text-xs font-semibold text-slate-700 ml-1">
 Phone Number
 </label>
 <input
 name="phone"
 type="tel"
 value={formData.phone}
 onChange={handleChange}
 className="w-full h-12 rounded-xl border border-blue-200 bg-blue-50/40 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
 placeholder="+91 ..."
 />
 </div>
 </div>

 <div className="space-y-1">
 <label className="text-xs font-semibold text-slate-700 ml-1">
 Company / Organization
 </label>
 <input
 name="company"
 value={formData.company}
 onChange={handleChange}
 className="w-full h-12 rounded-xl border border-blue-200 bg-blue-50/40 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
 placeholder="Company name"
 />
 </div>
 </div>

 {/* Project */}
 <div className="space-y-4 pt-2">
 <div className="flex items-center justify-between border-b border-blue-100 pb-2">
 <h3 className="text-[11px] font-bold tracking-widest text-blue-500 uppercase">
 Project Details
 </h3>
 </div>

 <div className="space-y-1">
 <label className="text-xs font-semibold text-slate-700 ml-1">
 Select Service <span className="text-red-600">*</span>
 </label>
 <div className="relative">
 <select
 name="selectedService"
 required
 value={formData.selectedService}
 onChange={handleChange}
 className="w-full h-12 rounded-xl border border-blue-200 bg-blue-50/40 px-4 pr-10 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent appearance-none transition-all"
 >
 <option value="">Choose a category...</option>
 {services.map((s) => (
 <option key={s.id} value={s.id}>
 {s.label}
 </option>
 ))}
 </select>
 <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 text-[20px] pointer-events-none">
 expand_more
 </span>
 </div>
 </div>

 {formData.selectedService === "other" && (
 <div className="space-y-1 animate-in slide-in-from-top-2 duration-200">
 <label className="text-xs font-semibold text-slate-700 ml-1">
 Specify Service <span className="text-red-600">*</span>
 </label>
 <input
 name="otherService"
 required
 value={formData.otherService}
 onChange={handleChange}
 className="w-full h-12 rounded-xl border border-blue-200 bg-blue-50/40 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
 placeholder="What are you looking for?"
 />
 </div>
 )}

 <div className="space-y-1">
 <label className="text-xs font-semibold text-slate-700 ml-1">
 Brief Project Description <span className="text-red-600">*</span>
 </label>
 <textarea
 name="message"
 required
 value={formData.message}
 onChange={handleChange}
 rows={4}
 className="w-full rounded-xl border border-blue-200 bg-blue-50/40 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none transition-all"
 placeholder="Tell us about your goals, timeline, and expectations..."
 />
 </div>
 </div>

 {/* Actions */}
 <div className="flex flex-col sm:flex-row gap-3 pt-4 pb-2">
 <button
 type="submit"
 disabled={isSubmitting}
 className="w-full sm:flex-[2] h-14 rounded-2xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all order-1 sm:order-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
 >
 {isSubmitting ? (
 <>
 <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
 Sending...
 </>
 ) : 'Send Enquiry'}
 </button>
 <button
 type="button"
 onClick={onClose}
 className="w-full sm:flex-1 h-14 rounded-2xl bg-white text-blue-700 font-semibold border border-blue-200 transition-all order-2 sm:order-1"
 >
 Back
 </button>
 </div>

 <p className="text-[11px] text-slate-500 pb-2">
 By submitting, you agree to be contacted by SwordNex regarding your enquiry.
 </p>
 </form>
 </div>
 </div>
 );
};

export default ServiceEnquiryModal;
