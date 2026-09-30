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
import { Link } from "react-router-dom";

const Footer = () => {
 return (
 <footer className={styles.footer} id="contact">
 <div className={styles.container}>
 {/* Top Section */}
 <div className={styles.grid}>
 {/* Product */}
 <div>
 <h3>About SwordNex invoice</h3>

 <ul>
 <li>
 <Link to="/products/invoice">
 Home
 </Link>
 </li>

 <li>
 <Link to="#features">
 Features
 </Link>
 </li>

 <li>
 <Link to="#pricing">
 Pricing
 </Link>
 </li>

 <li>
 <Link to="/products/invoice/what-is-an-inv">
 Invoice Software
 </Link>
 </li>
 </ul>
 </div>

 {/* Resources */}
 <div>
 <h3>Resources</h3>

 <ul>
 <li>
 <Link to="/products/invoice/help">
 Help Center
 </Link>
 </li>

 <li>
 <Link to="/products/invoice/faq">
 FAQs
 </Link>
 </li>

 <li>
 <Link to="/products/invoice">
 Academy
 </Link>
 </li>

 <li>
 <Link to="/products/invoice">
 Watch Demo
 </Link>
 </li>
 </ul>
 </div>

 {/* Solutions */}
 <div>
 <h3>Quick Links</h3>

 <ul>
 <li>
 <Link to="/products/invoice/what-is-an-inv">
 What is an Invoice?
 </Link>
 </li>

 <li>
 <Link to="/products/invoice/how-to-create">
 How to create an Invoice?
 </Link>
 </li>

 <li>
 <Link to="/products/invoice/reports-and-anlaytics">
 Invoice Reports and Analytics
 </Link>
 </li>

 <li>
 <Link to="/products/invoice/free-services">
 Free Invoice Service
 </Link>
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

 <h3 style={{ marginTop: "25px" }}>Contact Us</h3>

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