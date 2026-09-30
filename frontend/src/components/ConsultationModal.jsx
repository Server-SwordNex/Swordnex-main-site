import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from "../config/apiConfig";

const ConsultationModal = ({ isOpen, onClose }) => {
 if (!isOpen) return null;

 const [formData, setFormData] = useState({
 fullName: '',
 email: '',
 countryCode: '+91',
 phone: '',
 date: '',
 message: ''
 });

 const [notification, setNotification] = useState({ show: false, type: '', message: '' });
 const [isSubmitting, setIsSubmitting] = useState(false);

 const handleChange = (e) => {
 const { name, value } = e.target;
 setFormData({ ...formData, [name]: value });
 };

 const handleSubmit = async (e) => {
 e.preventDefault();
 setIsSubmitting(true);

 const payload = {
 name: formData.fullName,
 email: formData.email,
 phonenumber: `${formData.countryCode} ${formData.phone}`,
 availabledate: formData.date,
 message: formData.message
 };

 try {
 const response = await fetch(`${API_BASE_URL}/api/appointments`, {
 method: 'POST',
 headers: {
 'Content-Type': 'application/json',
 },
 body: JSON.stringify(payload),
 });

 if (!response.ok) {
 throw new Error('Failed to book appointment');
 }

 // Success Animation Trigger
 setNotification({ show: true, type: 'success', message: 'Appointment booked successfully!' });

 // Reset form
 setFormData({
 fullName: '',
 email: '',
 countryCode: '+91',
 phone: '',
 date: '',
 message: ''
 });

 // Auto close after delay
 setTimeout(() => {
 setNotification({ show: false, type: '', message: '' });
 onClose();
 }, 3000);

 } catch (error) {
 console.error('Error booking appointment:', error);
 setNotification({ show: true, type: 'error', message: 'Failed to book appointment. Please try again.' });
 setTimeout(() => setNotification({ show: false, type: '', message: '' }), 3000);
 } finally {
 setIsSubmitting(false);
 }
 };

 return (
 <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
 <motion.div
 initial={{ opacity: 0, scale: 0.9 }}
 animate={{ opacity: 1, scale: 1 }}
 exit={{ opacity: 0, scale: 0.9 }}
 className="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden relative"
 >
 <AnimatePresence>
 {notification.show && notification.type === 'success' ? (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -20 }}
 className="absolute inset-0 bg-white z-10 flex flex-col items-center justify-center p-6 text-center"
 >
 <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
 <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
 </svg>
 </div>
 <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
 <p className="text-gray-500">We have received your appointment request. Our team will contact you shortly.</p>
 </motion.div>
 ) : null}
 </AnimatePresence>

 <div className="p-6 space-y-5">
 {/* Header */}
 <div>
 <h2 className="text-xl font-bold text-gray-900">
 Book your appointment
 </h2>
 <p className="text-sm text-gray-500 mt-1">
 Fill in the details below
 </p>
 </div>

 {/* Form */}
 <form onSubmit={handleSubmit} className="space-y-4">

 {/* Full Name */}
 <div>
 <label className="block text-xs font-semibold text-gray-700 mb-1">
 Full Name
 </label>
 <input
 type="text"
 name="fullName"
 value={formData.fullName}
 onChange={handleChange}
 placeholder="John Doe"
 className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
 required
 />
 </div>

 {/* Email */}
 <div>
 <label className="block text-xs font-semibold text-gray-700 mb-1">
 Email
 </label>
 <input
 type="email"
 name="email"
 value={formData.email}
 onChange={handleChange}
 placeholder="john@example.com"
 className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
 required
 />
 </div>

 {/* Phone */}
 <div>
 <label className="block text-xs font-semibold text-gray-700 mb-1">
 Phone Number
 </label>
 <div className="flex gap-2">
 <select
 name="countryCode"
 value={formData.countryCode}
 onChange={handleChange}
 className="w-24 rounded-lg border border-gray-200 bg-gray-50 px-2 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
 >
 <option>+91</option>
 <option>+971</option>
 <option>+1</option>
 </select>

 <input
 type="tel"
 name="phone"
 value={formData.phone}
 onChange={handleChange}
 placeholder="9876543210"
 className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
 required
 />
 </div>
 </div>

 {/* Date */}
 <div>
 <label className="block text-xs font-semibold text-gray-700 mb-1">
 Preferred Date
 </label>
 <input
 type="date"
 name="date"
 value={formData.date}
 onChange={handleChange}
 className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
 required
 />
 </div>

 {/* Message */}
 <div>
 <label className="block text-xs font-semibold text-gray-700 mb-1">
 Message (Optional)
 </label>
 <textarea
 rows="3"
 name="message"
 value={formData.message}
 onChange={handleChange}
 placeholder="Tell us about your requirements..."
 className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm resize-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
 ></textarea>
 </div>

 {/* Error Message */}
 {notification.show && notification.type === 'error' && (
 <div className="p-3 bg-red-50 text-red-600 text-xs rounded-lg text-center">
 {notification.message}
 </div>
 )}

 {/* Submit */}
 <button
 type="submit"
 disabled={isSubmitting}
 className="w-full mt-2 inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
 >
 {isSubmitting ? (
 <span className="flex items-center gap-2">
 <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
 </svg>
 Processing...
 </span>
 ) : (
 <>
 Confirm Booking
 <span className="ml-2 text-lg">→</span>
 </>
 )}
 </button>

 </form>

 {/* Close */}
 <button
 onClick={onClose}
 className="w-full text-center text-xs text-gray-400 hover:text-gray-600 transition-colors"
 >
 Cancel
 </button>
 </div>
 </motion.div>
 </div>
 );
};

export default ConsultationModal;
