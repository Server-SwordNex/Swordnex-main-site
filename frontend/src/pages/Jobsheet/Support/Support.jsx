import React, { useState } from "react";
import { Mail, Phone, MapPin, Check } from "lucide-react";
import { toast } from "react-toastify";
import styles from "./Support.module.css";

export default function Support({ bgClr = "#fff" }) {
 const [formData, setFormData] = useState({
 name: "",
 email: "",
 phone: "",
 company: "",
 message: ""
 });

 const handleChange = (e) => {
 const { name, value } = e.target;
 setFormData(prev => ({
 ...prev,
 [name]: value
 }));
 };

 const handleSubmit = (e) => {
 e.preventDefault();
 
 if (!formData.name || !formData.email || !formData.message) {
 toast.error("Please fill in all required fields (Name, Email, Message).");
 return;
 }

 // Simulate successful request
 toast.success("Demo requested successfully! Our team will contact you shortly.");
 
 // Reset form
 setFormData({
 name: "",
 email: "",
 phone: "",
 company: "",
 message: ""
 });
 };

 return (
 <div className={styles.supportPageWrapper}>
 <section className={styles.contact} style={{ backgroundColor: bgClr }}>
 <div className={styles.container}>

 <div className={styles.left}>
 <span className={styles.badge}>
 Contact SwordNex Jobsheet
 </span>

 <h1>
 Let's simplify your
 <span> Jobsheet operations</span>
 </h1>

 <p>
 Have questions about jobsheet tracking, technician allocation, scheduling, or operations? Our team is ready to help.
 </p>

 <div className={styles.infoContainer}>

 <div className={styles.info}>
 <div style={{ 
 width: 55, 
 height: 55, 
 borderRadius: 14, 
 background: "var(--accent)", 
 color: "#fff", 
 display: "flex", 
 alignItems: "center", 
 justifyContent: "center" 
 }}>
 <Mail size={22} />
 </div>
 <div>
 <h4 style={{ margin: "0 0 4px 0", fontSize: "16px", fontWeight: "700" }}>Email Us</h4>
 <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>support@swordnex.com</p>
 </div>
 </div>

 <div className={styles.info}>
 <div style={{ 
 width: 55, 
 height: 55, 
 borderRadius: 14, 
 background: "var(--accent)", 
 color: "#fff", 
 display: "flex", 
 alignItems: "center", 
 justifyContent: "center" 
 }}>
 <Phone size={22} />
 </div>
 <div>
 <h4 style={{ margin: "0 0 4px 0", fontSize: "16px", fontWeight: "700" }}>Call Us</h4>
 <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>+91 94861 06953</p>
 </div>
 </div>

 <div className={styles.info}>
 <div style={{ 
 width: 55, 
 height: 55, 
 borderRadius: 14, 
 background: "var(--accent)", 
 color: "#fff", 
 display: "flex", 
 alignItems: "center", 
 justifyContent: "center" 
 }}>
 <MapPin size={22} />
 </div>
 <div>
 <h4 style={{ margin: "0 0 4px 0", fontSize: "16px", fontWeight: "700" }}>Office Location</h4>
 <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>Tamil Nadu, India</p>
 </div>
 </div>

 </div>

 <div className={styles.features}>
 <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 500, color: "#334155" }}>
 <Check size={16} style={{ color: "#16a34a" }} />
 Free Product Demo
 </div>

 <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 500, color: "#334155" }}>
 <Check size={16} style={{ color: "#16a34a" }} />
 Workflow Consultation
 </div>

 <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 500, color: "#334155" }}>
 <Check size={16} style={{ color: "#16a34a" }} />
 Quick Response Support
 </div>
 </div>
 </div>

 <div className={styles.right}>
 <form className={styles.form} onSubmit={handleSubmit}>

 <h2>Request a Demo</h2>

 <input
 type="text"
 name="name"
 value={formData.name}
 onChange={handleChange}
 placeholder="Your Name *"
 required
 />

 <input
 type="email"
 name="email"
 value={formData.email}
 onChange={handleChange}
 placeholder="Email Address *"
 required
 />

 <input
 type="tel"
 name="phone"
 value={formData.phone}
 onChange={handleChange}
 placeholder="Phone Number"
 />

 <input
 type="text"
 name="company"
 value={formData.company}
 onChange={handleChange}
 placeholder="Company Name"
 />

 <textarea
 name="message"
 value={formData.message}
 onChange={handleChange}
 rows="5"
 placeholder="Tell us about your jobsheet or repair business requirements... *"
 required
 />

 <button type="submit">
 Send Message
 </button>

 </form>
 </div>

 </div>
 </section>
 </div>
 );
}