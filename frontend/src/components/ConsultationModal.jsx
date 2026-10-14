import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from "../config/apiConfig";

const ConsultationModal = ({ isOpen, onClose, isHeroTransform = false }) => {
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

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

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
      }, 2500);

    } catch (error) {
      console.error('Error booking appointment:', error);
      setNotification({ show: true, type: 'error', message: 'Failed to book appointment. Please try again.' });
      setTimeout(() => setNotification({ show: false, type: '', message: '' }), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Morphing Modal Card */}
          <motion.div
            {...(isHeroTransform
              ? {
                  layoutId: "hero-appointment-transform",
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 28,
                  },
                }
              : {
                  initial: { opacity: 0, scale: 0.92, y: 16 },
                  animate: { opacity: 1, scale: 1, y: 0 },
                  exit: { opacity: 0, scale: 0.92, y: 16 },
                  transition: { duration: 0.25, ease: "easeOut" },
                })}
            className="relative z-10 w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800"
          >
            {/* Top gradient accent line linking with primary button theme */}
            <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-primary to-blue-400" />

            {/* Close 'X' Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close appointment modal"
              className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-slate-800 dark:hover:text-gray-200 transition-colors z-20"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            {/* Notification Overlay */}
            <AnimatePresence>
              {notification.show && notification.type === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute inset-0 bg-white dark:bg-slate-900 z-10 flex flex-col items-center justify-center p-6 text-center"
                >
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Booking Confirmed!</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">We have received your appointment request. Our team will contact you shortly.</p>
                </motion.div>
              ) : null}
            </AnimatePresence>

            {/* Form Content with smooth fade during transform */}
            <motion.div
              initial={isHeroTransform ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              exit={isHeroTransform ? { opacity: 0 } : false}
              transition={{ duration: 0.18, delay: isHeroTransform ? 0.08 : 0 }}
              className="p-6 space-y-4"
            >
              {/* Header */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Book your appointment
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Fill in the details below to schedule a consultation
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-400"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-400"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Phone Number
                  </label>
                  <div className="flex gap-2">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      className="w-24 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white px-2 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
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
                      className="flex-1 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-400"
                      required
                    />
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Message (Optional)
                  </label>
                  <textarea
                    rows="2"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your requirements..."
                    className="w-full rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white px-3 py-2 text-sm resize-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-400"
                  ></textarea>
                </div>

                {/* Error Message */}
                {notification.show && notification.type === 'error' && (
                  <div className="p-2.5 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs rounded-lg text-center border border-red-200 dark:border-red-800">
                    {notification.message}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 inline-flex items-center justify-center rounded-lg bg-primary hover:bg-blue-700 active:scale-95 px-4 py-2.5 text-sm font-semibold text-white transition-all shadow-md shadow-blue-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
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
                type="button"
                onClick={onClose}
                className="w-full text-center text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors pt-1"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConsultationModal;
