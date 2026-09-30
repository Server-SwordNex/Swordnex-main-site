import { useNavigate } from "react-router-dom";
import styles from "./Footer.module.css";
import {
 FaFacebookF,
 FaXTwitter,
 FaYoutube,
 FaInstagram,
 FaLinkedinIn,
 FaPhone,
 FaWhatsapp,
 FaEnvelope
} from "react-icons/fa6";
// import AnimateOnScroll from "../../../components/AnimateOnScroll";

export default function Footer() {
 const navigate = useNavigate();

 const scrollTo = (id) => {
 const el = document.getElementById(id);
 if (el) {
 el.scrollIntoView({ behavior: "smooth", block: "start" });
 }
 };

 return (
 <footer className={styles.footer} id="contact">
 {/* <AnimateOnScroll animation="fadeUp"> */}
 <div className={styles.container}>
 {/* Column 1 */}
 <div className={styles.column}>
 <h3>SwordNex Invoice</h3>
 <ul>
 <li onClick={() => scrollTo("hero")}>Home</li>
 <li onClick={() => scrollTo("features")}>Features</li>
 <li onClick={() => scrollTo("pricing")}>Pricing</li>
 </ul>
 </div>

 {/* Column 2 */}
 <div className={styles.column}>
 <h3>Get Started</h3>
 <ul>
 <li onClick={() => navigate("/register")}>Get Started</li>
 <li onClick={() => scrollTo("hero")}>Watch Demo</li>
 <li onClick={() => scrollTo("contact")}>Help</li>
 <li onClick={() => scrollTo("contact")}>Frequently Asked Questions</li>
 </ul>
 </div>

 {/* Column 3 */}
 <div className={styles.column}>
 <h3>Quick Links</h3>
 <ul>
 <li>What is an Invoice?</li>
 <li>How to Create an Invoice</li>
 <li>Invoice Reports and Analysis</li>
 <li>Free Invoice Service</li>
 <li>Become a Partner</li>
 </ul>
 </div>

 {/* Column 4 */}
 <div className={styles.column}>
 <h3>SOCIAL MEDIA</h3>

 <div className={styles.socialRow}>
 <div className={styles.iconSm}><FaFacebookF /></div>
 <div className={styles.iconSm}><FaXTwitter /></div>
 <div className={styles.iconSm}><FaYoutube /></div>
 <div className={styles.iconSm}><FaInstagram /></div>
 <div className={styles.iconSm}><FaLinkedinIn /></div>
 </div>

 <h3 className={styles.contactTitle}>CONTACT</h3>

 <div className={styles.contactInfo}>
 <span>+91 94861 06953</span>
 <span className={styles.sep}>|</span>
 <span>support@swordnex.com</span>
 </div>

 <p className={styles.hours}>Mon - Sat 9:30 AM - 7:00 PM IST</p>
 </div>
 </div>
 {/* </AnimateOnScroll> */}

 {/* Bottom Section */}
 {/* <AnimateOnScroll animation="fadeIn"> */}
 <div className={styles.bottom}>
 <div className={styles.links}>
 <span>SwordNex Home</span>
 <span>Contact</span>
 <span>Security</span>
 <span>IPR Complaints</span>
 <span>Anti-spam Policy</span>
 <span>Terms of Service</span>
 <span>Privacy Policy</span>
 <span>Cookie Policy</span>
 <span>GDPR Compliance</span>
 <span>Abuse Policy</span>
 </div>

 <p className={styles.copy}>
 © 2026 SwordNex Technologies Private Limited. All rights reserved.
 </p>
 </div>
 {/* </AnimateOnScroll> */}
 </footer>
 );
}
