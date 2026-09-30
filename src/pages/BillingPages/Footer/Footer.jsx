import React from "react";
import styles from "./Footer.module.css";

import {
 FaFacebookF,
 FaInstagram,
 FaLinkedinIn,
 FaYoutube,
 FaXTwitter,
 FaPhone,
 FaWhatsapp,
} from "react-icons/fa6";

import { MdEmail } from "react-icons/md";

const Footer = () => {
 return (
 <footer className={styles.footer}>
 <div className={styles.container}>
 {/* Top Section */}
 <div className={styles.grid}>
 {/* Product */}
 <div>
 <h3>About SwordNex Billing</h3>

 <ul>
 <li>
 <a href="/products/billing">Home</a>
 </li>

 <li>
 <a href="/products/billing/features">Features</a>
 </li>

 <li>
 <a href="/products/billing/pricing">Pricing</a>
 </li>

 <li>
 <a href="/products/billing/software">
 Billing Management
 </a>
 </li>

 <li>
 <a href="/products/billing/features">Billing Processing</a>
 </li>
 </ul>
 </div>

 {/* Resources */}
 <div>
 <h3>Resources</h3>

 <ul>
 <li>
 <a href="/products/billing/help">Help</a>
 </li>

 <li>
 <a href="/products/billing/faq">FAQs</a>
 </li>

 <li>
 <a href="/products/billing/webinars">Webinars</a>
 </li>

 <li>
 <a href="/products/billing">Academy</a>
 </li>
 </ul>
 </div>

 {/* Solutions */}
 <div>
 <h3>Quick Links</h3>

 <ul>
 <li>
 <a href="/products/billing/software">Billing Software</a>
 </li>

 <li>
 <a href="/products/billing/small-business">Billing Software For Small Business</a>
 </li>

 <li>
 <a href="/products/billing/free-software">Free Billing Software</a>
 </li>

 <li>
 <a href="/products/billing/security">Data Security and Privacy</a>
 </li>
 </ul>
 </div>

 {/* Contact */}
 <div>
 <h3>Social Media</h3>
 {/* Social Icons */}
 <div className={styles.socialIcons}>
 <a
 href="https://www.facebook.com/"
 target="_blank"
 rel="noreferrer"
 >
 <FaFacebookF />
 </a>

 <a
 href="https://x.com/"
 target="_blank"
 rel="noreferrer"
 >
 <FaXTwitter />
 </a>

 <a
 href="https://www.youtube.com/"
 target="_blank"
 rel="noreferrer"
 >
 <FaYoutube />
 </a>

 <a
 href="https://www.instagram.com/"
 target="_blank"
 rel="noreferrer"
 >
 <FaInstagram />
 </a>

 <a
 href="https://www.linkedin.com/"
 target="_blank"
 rel="noreferrer"
 >
 <FaLinkedinIn />
 </a>
 </div>

 <h3 style={{marginTop: "25px"}}>Contact Us</h3>

 <ul className={styles.contactList}>
 <li>+91 94861 06953</li>

 <li>support@swordnex.com</li>

 <li>
 Monday - Saturday
 </li>

 <li>9:30 AM - 7:00 PM IST</li>
 </ul> 

 {/* Quick Contact */}
 <div className={styles.quickActions}>
 <a href="tel:+919486106953">
 <FaPhone />
 </a>

 <a
 href="https://wa.me/919486106953"
 target="_blank"
 rel="noreferrer"
 >
 <FaWhatsapp />
 </a>

 <a href="mailto:support@swordnex.com">
 <MdEmail />
 </a>
 </div>
 </div>
 </div>

 {/* Divider */}
 <div className={styles.divider}></div>

 {/* Bottom Links */}
 <div className={styles.bottomLinks}>
 <a href="https://swordnex.com">SwordNex Home</a>
 <a href="https://swordnex.com/security">Security</a>
 <a href="https://swordnex.com/IPR-Complaints">IPR Complaints</a>
 <a href="https://swordnex.com/Terms">Terms</a>
 <a href="https://swordnex.com/PrivacyPolicy">Privacy</a>
 <a href="https://swordnex.com/TM-Policy">Trademark</a>
 <a href="https://swordnex.com/cookiepolicy">Cookie</a>
 <a href="https://swordnex.com/GDPRcompliance">GDPR</a>
 <a href="https://swordnex.com/Application">Application</a>
 <a href="https://swordnex.com/Workplace">Workplace Ethics</a>
 </div>

 {/* Copyright */}
 <p className={styles.copyright}>
 © 2026 SwordNex Technologies Private Limited. All Rights Reserved.
 </p>
 </div>
 </footer>
 );
};

export default Footer;