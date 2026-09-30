import React, { useState } from "react";
import { CalendarCheck } from "lucide-react";
import { toast } from "react-toastify";
import styles from "./WebinarForm.module.css";

export default function WebinarForm({
 title = "Live Webinars",
 description = "Join our experts for live interactive sessions designed to help you understand how SwordNex Jobsheet can streamline service orders, technician scheduling, and repair tracking to support your growing business.",
 plans = [
 "Starter",
 "Growth",
 "Enterprise",
 ],
 bgColor="var(--accent-soft)",
 btnColor="var(--accent)",
}) {
 const [formData, setFormData] = useState({
 name: "",
 email: "",
 phone: "",
 company: "",
 companyUrl: "",
 plan: "",
 request: "",
 });

 const handleChange = (e) => {
 setFormData((prev) => ({
 ...prev,
 [e.target.name]: e.target.value,
 }));
 };

 const handleSubmit = (e) => {
 e.preventDefault();

 if (!formData.name || !formData.email || !formData.phone || !formData.company || !formData.companyUrl || !formData.plan || !formData.request) {
 toast.error("Please fill in all required fields.");
 return;
 }

 // Trigger success alert
 toast.success("Webinar registration successful! Confirmation sent to " + formData.email);

 // Reset Form
 setFormData({
 name: "",
 email: "",
 phone: "",
 company: "",
 companyUrl: "",
 plan: "",
 request: "",
 });
 };

 return (
 <div className={styles.webinarPageWrapper}>
 <section className={styles.section} style={{backgroundColor: bgColor}}>

 <div className={styles.header}>
 <span className={styles.badge}>
 SwordNex Webinars
 </span>
 <h1>{title}</h1>
 <p>{description}</p>
 </div>

 <div className={styles.formWrapper}>
 <form
 onSubmit={handleSubmit}
 className={styles.form}
 >
 <div className={styles.column}>
 <div className={styles.field}>
 <input
 type="text"
 name="name"
 value={formData.name}
 required
 onChange={handleChange}
 placeholder="Name *"
 />
 </div>

 <div className={styles.field}>
 <input
 type="email"
 name="email"
 value={formData.email}
 required
 onChange={handleChange}
 placeholder="Email *"
 />
 </div>

 <div className={styles.field}>
 <input
 type="text"
 name="phone"
 value={formData.phone}
 required
 onChange={handleChange}
 placeholder="Phone Number *"
 />
 </div>
 </div>

 <div className={styles.column}>
 <div className={styles.field}>
 <input
 type="text"
 name="company"
 value={formData.company}
 required
 onChange={handleChange}
 placeholder="Company Name *"
 />
 </div>

 <div className={styles.field}>
 <input
 type="text"
 name="companyUrl"
 value={formData.companyUrl}
 required
 onChange={handleChange}
 placeholder="Company Website *"
 />
 </div>

 <div className={styles.field}>
 <select
 name="plan"
 value={formData.plan}
 required
 onChange={handleChange}
 >
 <option value="">
 Select Plan
 </option>
 {plans.map((plan, index) => (
 <option
 key={index}
 value={plan}
 >
 {plan}
 </option>
 ))}
 </select>
 </div>
 </div>

 <div className={styles.fullWidth}>
 <div className={styles.field}>
 <textarea
 name="request"
 value={formData.request}
 rows="6"
 required
 onChange={handleChange}
 placeholder="Tell us about your jobsheet requirements and what you would like to learn in the webinar..."
 />
 </div>
 </div>

 <div className={styles.submitWrapper}>
 <button type="submit" style={{backgroundColor: btnColor, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px"}}>
 Register Webinar <CalendarCheck size={18} />
 </button>
 </div>
 </form>
 </div>
 </section>
 
 </div>
 );
}