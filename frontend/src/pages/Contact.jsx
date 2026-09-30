import React, { useState } from 'react';
import ConsultationModal from '../components/ConsultationModal';
import API_BASE_URL from '../config/apiConfig';

const Contact = () => {
 const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [showSuccess, setShowSuccess] = useState(false);
 const [formErrors, setFormErrors] = useState({});

 // Fixed initial form state to include company and phone fields
 const [formState, setFormState] = useState({
 firstName: '',
 lastName: '',
 email: '',
 company: '',
 phone: '',
 subject: '',
 message: ''
 });

 const handleInputChange = (e) => {
 const { name, value } = e.target;
 setFormState(prev => ({ ...prev, [name]: value }));

 // Clear error for this field when user starts typing
 if (formErrors[name]) {
 setFormErrors(prev => ({ ...prev, [name]: '' }));
 }
 };

 // Validate form before submission
 const validateForm = () => {
 const errors = {};
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 const phoneRegex = /^[6-9]\d{9}$/;

 // Mandatory field checks
 if (!formState.firstName.trim()) errors.firstName = "First name is required";
 if (!formState.company.trim()) errors.company = "Company name is required";
 if (!formState.phone.trim()) {
 errors.phone = "Phone number is required";
 } else {
 const digitsOnly = formState.phone.replace(/\D/g, '');
 if (!phoneRegex.test(digitsOnly)) {
 errors.phone = "Please enter a valid 10 digit Indian phone number";
 }
 }
 if (!formState.email.trim()) {
 errors.email = "Email address is required";
 } else if (!emailRegex.test(formState.email)) {
 errors.email = "Please enter a valid email address";
 }
 if (!formState.subject.trim()) errors.subject = "Please select an enquiry type";
 if (!formState.message.trim()) errors.message = "Please enter your message";

 setFormErrors(errors);
 return Object.keys(errors).length === 0;
 };

 const handleSubmit = async (e) => {
 e.preventDefault();
 const isValid = validateForm();

 if (!isValid) return;

 setIsSubmitting(true);

 const payload = {
 firstname: formState.firstName,
 lastname: formState.lastName,
 email: formState.email,
 phone: formState.phone,
 company: formState.company,
 enquirytype: formState.subject,
 message: formState.message
 };

 try {
 const response = await fetch(`${API_BASE_URL}/api/contacts`, {
 method: 'POST',
 headers: {
 'Content-Type': 'application/json',
 },
 body: JSON.stringify(payload),
 });

 if (!response.ok) {
 throw new Error('Failed to submit contact form');
 }

 setShowSuccess(true);
 setFormState({
 firstName: '',
 lastName: '',
 email: '',
 company: '',
 phone: '',
 subject: '',
 message: ''
 });

 // Hide success message after 5 seconds
 setTimeout(() => setShowSuccess(false), 5000);
 } catch (error) {
 console.error('Error submitting form:', error);
 // Ideally show an error message to the user here
 alert('Something went wrong. Please try again later.');
 } finally {
 setIsSubmitting(false);
 }
 };

 // Check if all mandatory fields are filled to enable submit button
 const isFormReady = !!(
 formState.firstName.trim() &&
 formState.company.trim() &&
 formState.phone.trim() &&
 formState.email.trim() &&
 formState.subject.trim() &&
 formState.message.trim()
 );

 return (
 <div className="pt-2">
 {/* Structured Data for Local Business (SEO) */}
 <script type="application/ld+json">
 {JSON.stringify({
 "@context": "https://schema.org",
 "@type": "LocalBusiness",
 "name": "SwordNex",
 "address": {
 "@type": "PostalAddress",
 "streetAddress": "No. 15C, Ravi Plaza, 60 Feet Road, Near New Bus Stand",
 "addressLocality": "Kumbakonam",
 "addressRegion": "Tamil Nadu",
 "postalCode": "612001",
 "addressCountry": "IN"
 },
 "telephone": "+91-94861-06953",
 "email": "support@swordnex.com",
 "url": "https://swordnex.com/contact"
 })}
 </script>

 {/* Redesigned User-Friendly Hero Section */}
 <section className="bg-gradient-to-br from-primary to-blue-700 py-20 lg:py-28 relative overflow-hidden">
 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
 <div className="max-w-4xl mx-auto text-center text-white">
 <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
 Get In Touch With SwordNex
 </h1>
 <p className="text-xl md:text-2xl text-blue-100 mb-10 leading-relaxed">
 Have questions about our billing automation tools? Need a demo? Our team is here to help you streamline your business operations.
 </p>
 {/* Added direct CTA to scroll to contact form */}
 <a
 href="#contact-form"
 className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
 >
 Send Us A Message
 <span className="material-symbols-outlined">arrow_forward</span>
 </a>
 </div>
 </div>
 </section>

 <section className="py-20 bg-white dark:bg-slate-900">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
 {/* Contact Information */}
 <div>
 <div className="mb-12">
 <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-6">
 Streamline Your Business Operations with SwordNex
 </h2>
 <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8">
 Whether you're a startup or scaling enterprise, SwordNex delivers powerful, easy-to-use billing automation tools tailored to your needs.
 </p>

 <div className="space-y-8">
 <div className="flex items-start gap-4 group">
 <div className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-primary transition-transform group-hover:scale-110">
 <span className="material-symbols-outlined text-2xl">location_on</span>
 </div>
 <div>
 <h4 className="font-bold text-slate-900 dark:text-white mb-2">Visit Our Office</h4>
 <address className="not-italic text-slate-600 dark:text-slate-400 leading-relaxed">
 <a
 href="https://maps.app.goo.gl/QQQLMBDHixKPL3Dt7"
 target="_blank"
 rel="noopener noreferrer"
 className="hover:text-primary transition-colors underline-offset-2 hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded"
 aria-label="Open office location in Google Maps"
 >
 No. 15C, Ravi Plaza, 60 Feet Road,<br />
 Near New Bus Stand, Kumbakonam,<br />
 Tamil Nadu – 612001, India
 </a>
 </address>
 </div>
 </div>

 <div className="flex items-start gap-4 group">
 <div className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-primary transition-transform group-hover:scale-110">
 <span className="material-symbols-outlined text-2xl">mail</span>
 </div>
 <div>
 <h4 className="font-bold text-slate-900 dark:text-white mb-2">Email Support</h4>
 <a
 href="mailto:support@swordnex.com"
 className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors underline-offset-2 hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded"
 aria-label="Send email to support"
 >
 support@swordnex.com
 </a>
 <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">Response within 24 hours</p>
 </div>
 </div>

 <div className="flex items-start gap-4 group">
 <div className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-primary transition-transform group-hover:scale-110">
 <span className="material-symbols-outlined text-2xl">call</span>
 </div>
 <div>
 <h4 className="font-bold text-slate-900 dark:text-white mb-2">Call Sales</h4>
 <a
 href="tel:+919486106953"
 className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors underline-offset-2 hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded"
 aria-label="Call our sales team"
 >
 +91 94861 06953
 </a>
 <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">Mon-Fri, 9AM - 6PM IST</p>
 </div>
 </div>
 </div>
 </div>

 {/* Fixed Google Maps Embed */}
 <div className="w-full h-72 lg:h-80 bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md relative">
 <iframe
 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.107007197073!2d79.4805177746353!3d10.96377779190507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf3d577b1d86b%3A0x7d5d5f05a3d9d172!2sRavi%20Plaza%2C%2060%20Feet%20Rd%2C%20Kumbakonam%2C%20Tamil%20Nadu%20612001!5e0!3m2!1sen!2sin!4v1720000000000!5m2!1sen!2sin"
 width="100%"
 height="100%"
 style={{ border: 0 }}
 allowFullScreen
 loading="lazy"
 referrerPolicy="no-referrer-when-downgrade"
 title="SwordNex Office Location in Kumbakonam"
 aria-label="Google map showing SwordNex office location"
 ></iframe>
 </div>
 </div>

 {/* Updated Contact Form */}
 <div id="contact-form" className="bg-white dark:bg-card-dark rounded-2xl p-8 shadow-lg border border-slate-100 dark:border-slate-800">
 {/* Success Message */}
 {showSuccess && (
 <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg border border-green-200 dark:border-green-800">
 ✅ Message sent successfully! We’ll get back to you within 24 hours.
 </div>
 )}

 <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Send Us a Message</h3>
 <p className="text-slate-500 dark:text-slate-400 mb-6">
 We respond to all inquiries within one business day. Fields marked with <span className="text-red-500">*</span> are mandatory.
 </p>

 <form onSubmit={handleSubmit} className="space-y-6" noValidate>
 {/* First & Last Name */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div>
 <label htmlFor="firstName" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
 First Name <span className="text-red-500">*</span>
 </label>
 <input
 id="firstName"
 name="firstName"
 type="text"
 value={formState.firstName}
 onChange={handleInputChange}
 placeholder="John"
 className={`w-full rounded-lg px-4 py-3 transition-all ${formErrors.firstName ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
 } text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
 />
 {formErrors.firstName && <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>}
 </div>
 <div>
 <label htmlFor="lastName" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
 Last Name
 </label>
 <input
 id="lastName"
 name="lastName"
 type="text"
 value={formState.lastName}
 onChange={handleInputChange}
 placeholder="Doe"
 className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
 />
 </div>
 </div>

 {/* Remaining Form Fields with validation */}
 {["company", "phone", "email", "subject", "message"].map((field) => {
 const label = field === "subject" ? "Enquiry Type" : field.charAt(0).toUpperCase() + field.slice(1);
 const type = field === "email" ? "email" : field === "phone" ? "tel" : "text";
 const placeholder = field === "company" ? "Your Company" : field === "phone" ? "+91 9876543210" : field === "email" ? "john@example.com" : field === "message" ? "Tell us how we can help you..." : "";

 return (
 <div key={field}>
 <label htmlFor={field} className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
 {label} <span className="text-red-500">*</span>
 </label>
 {field === "subject" ? (
 <select
 id={field}
 name={field}
 value={formState[field]}
 onChange={handleInputChange}
 className={`w-full rounded-lg px-4 py-3 transition-all ${formErrors[field] ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
 } text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
 >
 <option value="">Select enquiry type</option>
 <option value="General Inquiry">General Inquiry</option>
 <option value="Sales">Sales & Pricing</option>
 <option value="Support">Technical Support</option>
 <option value="Partnership">Partnership Opportunities</option>
 <option value="Billing Integration">Billing System Integration</option>
 </select>
 ) : field === "message" ? (
 <textarea
 id={field}
 name={field}
 rows="5"
 value={formState[field]}
 onChange={handleInputChange}
 placeholder={placeholder}
 className={`w-full rounded-lg px-4 py-3 resize-none transition-all ${formErrors[field] ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
 } text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
 ></textarea>
 ) : (
 <input
 id={field}
 name={field}
 type={type}
 value={formState[field]}
 onChange={handleInputChange}
 placeholder={placeholder}
 className={`w-full rounded-lg px-4 py-3 transition-all ${formErrors[field] ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
 } text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
 />
 )}
 {formErrors[field] && <p className="text-red-500 text-sm mt-1">{formErrors[field]}</p>}
 </div>
 )
 })}

 {/* Submit Button */}
 <button
 type="submit"
 disabled={isSubmitting || !isFormReady}
 className={`w-full inline-flex items-center justify-center rounded-xl px-6 py-4 text-base font-bold text-white shadow-lg transition-all ${isSubmitting || !isFormReady ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary/90 hover:shadow-xl hover:-translate-y-0.5'
 }`}
 aria-label={isSubmitting ? "Sending your message..." : "Send your message"}
 >
 {isSubmitting ? (
 <>
 <span className="animate-spin material-symbols-outlined mr-2">autorenew</span>
 Sending...
 </>
 ) : (
 <>
 Send Message
 <span className="material-symbols-outlined ml-2">send</span>
 </>
 )}
 </button>
 </form>
 </div>

 </div>
 </div>
 </section>

 {/* FAQ Section */}
 <section className="py-20 bg-slate-50 dark:bg-slate-800/30">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
 <div className="text-center mb-16">
 <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-4">Frequently Asked Questions</h2>
 <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
 Find quick answers about implementation, pricing, security, and more. Still stuck? <button onClick={() => setIsConsultationModalOpen(true)} className="text-primary font-medium hover:underline focus:outline-none">Book a free consultation</button>.
 </p>
 </div>

 <div className="space-y-4">
 {[
 {
 question: "How long does implementation take?",
 answer: "Most businesses are fully onboarded in 2–4 weeks. We assign a dedicated success manager to ensure smooth setup, training, and go-live."
 },
 {
 question: "Can I migrate my existing data?",
 answer: "Absolutely. We support imports from Excel, CSV, and popular platforms. Our team handles mapping and validation at no extra cost."
 },
 {
 question: "What security measures do you have?",
 answer: "Enterprise-grade security with SOC 2 compliance, end-to-end encryption, role-based access, and regular penetration testing to protect your data."
 },

 {
 question: "Do you offer enterprise or custom plans?",
 answer: "Yes. We build tailored solutions for large teams, multi-location businesses, and complex workflows. Contact sales for a custom quote."
 },
 {
 question: "What security measures do you have?",
 answer: "Enterprise-grade security with SOC 2 compliance, end-to-end encryption, role-based access, and regular penetration testing to protect your data."
 },
 {
 question: "What kind of support do you provide?",
 answer: "24/7 chat support, dedicated account managers, and India-based experts. Includes free onboarding, quarterly training sessions, and priority support."
 }
 ].map((faq, index) => (
 <details
 key={index}
 className="group bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden focus-within:ring-2 focus-within:ring-primary"
 >
 <summary className="flex items-center justify-between p-6 cursor-pointer list-none focus:outline-none">
 <span className="font-semibold text-slate-900 dark:text-white text-lg">{faq.question}</span>
 <span
 className="material-symbols-outlined transition-transform group-open:rotate-180 text-slate-400"
 aria-hidden="true"
 >
 expand_more
 </span>
 </summary>
 <div className="px-6 pb-6 pt-0 text-slate-600 dark:text-slate-400 leading-relaxed">
 {faq.answer}
 </div>
 </details>
 ))}
 </div>
 </div>
 </section>


 {/* CTA Section */}
 <section className="py-24 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
 <div className="bg-gradient-to-br from-primary to-blue-600 rounded-3xl p-12 lg:p-16 relative overflow-hidden shadow-2xl">
 <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3"></div>
 <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>

 <div className="relative z-10 max-w-3xl mx-auto">
 <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
 Ready to Automate Your Billing?
 </h2>
 <p className="text-blue-100 text-lg md:text-xl mb-10 leading-relaxed">
 Book a free, no-obligation 15-minute consultation with our billing automation specialists. Discover how SwordNex can save you time and reduce errors.
 </p>
 <button
 onClick={() => setIsConsultationModalOpen(true)}
 className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-primary bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/50"
 aria-label="Schedule a free 15-minute consultation with SwordNex experts"
 >
 📅 Schedule Free Consultation
 </button>
 <p className="text-blue-100/80 text-sm mt-4">No credit card • No commitment • Instant calendar access</p>
 </div>
 </div>
 </div>
 </section>

 <ConsultationModal isOpen={isConsultationModalOpen} onClose={() => setIsConsultationModalOpen(false)} />
 </div>
 );
};

export default Contact;
