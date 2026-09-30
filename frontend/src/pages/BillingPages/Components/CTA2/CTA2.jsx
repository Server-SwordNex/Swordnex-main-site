import React from "react";
import styles from "./CTA2.module.css";

export default function CTA2({
 bgClr = "#fff",
 btnClr="#e02f2f",
 title = "Ready to simplify your payroll?",
 subtitle = "Join thousands of growing businesses running payroll the smarter way.",
 primaryText = "Start 14-day free trial",
 primaryLink = "#trial",
 secondaryText = "Watch Demo",
 secondaryLink = "#contact",
}) {
 return (
 <section
 className={styles.cta}
 style={{ backgroundColor: bgClr }}
 >
 <div className={styles.inner}>
 <h2 className={styles.title}>
 {title}
 </h2>

 <p className={styles.subtitle}>
 {subtitle}
 </p>

 <div className={styles.actions}>
 <a
 href={primaryLink}
 className={styles.primary}
 style={{backgroundColor: btnClr}}
 >
 {primaryText}
 </a>

 <a
 href={secondaryLink}
 className={styles.secondary}
 >
 {secondaryText}
 </a>
 </div>
 </div>
 </section>
 );
}