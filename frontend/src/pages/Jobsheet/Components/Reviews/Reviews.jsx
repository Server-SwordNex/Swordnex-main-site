import React from "react";
import styles from "./Reviews.module.css";

const ITEMS = [
 { quote: "We cut our invoicing time by 70%. Swordnex feels like it was built for our shop.", name: "Priya Raman", role: "Owner, Raman Textiles" },
 { quote: "The GST reports alone are worth the price. Tax season is finally stress-free.", name: "Arjun Mehta", role: "CA & Founder, MK Associates" },
 { quote: "Switching from Excel to Swordnex was the best decision we made this year.", name: "Sneha Kapoor", role: "Director, Brewly Coffee Co." },
];

export default function Reviews() {
 return (
 <section id="testimonials" className={styles.section}>
 <div className={styles.head}>
 <span className={styles.eyebrow}>LOVED BY 12,000+ BUSINESSES</span>
 <h2 className={styles.title}>Don't take our word for it</h2>
 </div>
 <div className={styles.grid}>
 {ITEMS.map((t) => (
 <figure key={t.name} className={styles.card}>
 <div className={styles.stars}>★★★★★</div>
 <blockquote className={styles.quote}>"{t.quote}"</blockquote>
 <figcaption className={styles.person}>
 <div className={styles.avatar}>{t.name.charAt(0)}</div>
 <div>
 <div className={styles.name}>{t.name}</div>
 <div className={styles.role}>{t.role}</div>
 </div>
 </figcaption>
 </figure>
 ))}
 </div>
 </section>
 );
}
