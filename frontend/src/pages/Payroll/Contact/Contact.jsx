import React from "react";
import styles from "./Contact.module.css";

export default function Contact({ bgClr="#fff" }) {
 return (
 <section className={styles.contact} style={{backgroundColor: bgClr}}>
 <div className={styles.container}>

 <div className={styles.left}>
 <span className={styles.badge}>
 Contact SwordNex Payroll
 </span>

 <h1>
 Let's simplify your
 <span> payroll operations</span>
 </h1>

 <p>
 Have questions about payroll automation, compliance,
 attendance integration, or employee self-service?
 Our team is ready to help.
 </p>

 <div className={styles.infoContainer}>

 <div className={styles.info}>
 <i className="fa-solid fa-envelope"></i>
 <div>
 <h4>Email Us</h4>
 <p>support@swordnex.com</p>
 </div>
 </div>

 <div className={styles.info}>
 <i className="fa-solid fa-phone"></i>
 <div>
 <h4>Call Us</h4>
 <p>+91 XXXXX XXXXX</p>
 </div>
 </div>

 <div className={styles.info}>
 <i className="fa-solid fa-location-dot"></i>
 <div>
 <h4>Office Location</h4>
 <p>Tamil Nadu, India</p>
 </div>
 </div>

 </div>

 <div className={styles.features}>
 <div>
 <i className="fa-solid fa-check"></i>
 Free Product Demo
 </div>

 <div>
 <i className="fa-solid fa-check"></i>
 Payroll Consultation
 </div>

 <div>
 <i className="fa-solid fa-check"></i>
 Quick Response Support
 </div>
 </div>
 </div>

 <div className={styles.right}>
 <form className={styles.form}>

 <h2>Request a Demo</h2>

 <input
 type="text"
 placeholder="Your Name"
 />

 <input
 type="email"
 placeholder="Email Address"
 />

 <input
 type="tel"
 placeholder="Phone Number"
 />

 <input
 type="text"
 placeholder="Company Name"
 />

 <textarea
 rows="5"
 placeholder="Tell us about your payroll requirements..."
 />

 <button type="submit">
 Send Message
 </button>

 </form>
 </div>

 </div>
 </section>
 );
}