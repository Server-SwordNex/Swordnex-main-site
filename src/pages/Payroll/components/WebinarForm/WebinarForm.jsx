import React, { useState } from "react";
import styles from "./WebinarForm.module.css";

export default function WebinarForm({
 title = "Live Webiars",
 description = "Join our experts for live interactive sessions designed to help you understand how Swordnex Payroll can streamline salary processing, ensure compliance and support your growing business.",
 plans = [
 "Starter",
 "Professional",
 "Enterprise",
 ],
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

 if (onSubmit) {
 onSubmit(formData);
 }

 console.log(formData);
 };

 return (
 <section className={styles.section}>

 <div className={styles.header}>

 <span className={styles.badge}>
 SwordNex Webinars
 </span>

 <h1>{title}</h1>
 <p>{description}</p>
 </div>

 <div className={styles.formWrapper}>

 <form
 onSubmit={(data) => { console.log(data); }}
 className={styles.form}
 >

 <div className={styles.column}>

 <div className={styles.field}>
 {/* <label>Name *</label> */}
 <input
 type="text"
 name="name"
 required
 onChange={handleChange}
 placeholder="Name *"
 />
 </div>

 <div className={styles.field}>
 {/* <label>Email *</label> */}
 <input
 type="email"
 name="email"
 required
 onChange={handleChange}
 placeholder="Email *"
 />
 </div>

 <div className={styles.field}>
 {/* <label>Phone Number *</label> */}
 <input
 type="text"
 name="phone"
 required
 onChange={handleChange}
 placeholder="Phone Number *"
 />
 </div>

 </div>

 <div className={styles.column}>

 <div className={styles.field}>
 {/* <label>Company *</label> */}
 <input
 type="text"
 name="company"
 required
 onChange={handleChange}
 placeholder="Company Name *"
 />
 </div>

 <div className={styles.field}>
 {/* <label>Company URL *</label> */}
 <input
 type="text"
 name="companyUrl"
 required
 onChange={handleChange}
 placeholder="Company Website *"
 />
 </div>

 <div className={styles.field}>
 {/* <label>Plan *</label> */}

 <select
 name="plan"
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
 {/* <label>Request *</label> */}

 <textarea
 name="request"
 rows="6"
 required
 onChange={handleChange}
 placeholder="Tell us about your payroll requirements and what you would like to learn in the webinar..."
 />
 </div>

 </div>

 <div className={styles.submitWrapper}>

 <button type="submit">
 Register Webinar <i className="fa-solid fa-pen-to-square"></i>
 </button>

 </div>

 </form>

 </div>

 </section>
 );
}