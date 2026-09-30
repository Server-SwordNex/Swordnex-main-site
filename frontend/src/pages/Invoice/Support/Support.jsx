import React from "react";
import styles from "./Support.module.css";

export default function Support({ bgClr = "#fff" }) {
 return (
 <section className={styles.contact} style={{ backgroundColor: bgClr }}>
 <div className={styles.container}>

 <div className={styles.left}>
 <span className={styles.badge}>
 Contact SwordNex Invoice
 </span>

 <h1>
 Let's simplify your
 <span> billing operations</span>
 </h1>

 <p>
 Have questions about invoice creation, GST billing, customer management, payment tracking, inventory records, or business reporting? Our team is ready to help.
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
 Billing & GST Consultation
 </div>

 <div>
 <i className="fa-solid fa-check"></i>
 Dedicated Customer Support
 </div>
 </div>
 </div>

 <div className={styles.right}>
 <form className={styles.form}>

 <h2>Request Assistance</h2>

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
 placeholder="Business Name"
 />

 <textarea
 rows="5"
 placeholder="Tell us about your billing, invoicing, GST, inventory, or reporting requirements..."
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