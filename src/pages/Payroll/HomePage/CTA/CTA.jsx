import React from "react";
import styles from "./CTA.module.css";

export default function CTA({ bgClr="#fff" }) {
 return (
 <section className={styles.cta} style={{backgroundColor: bgClr}}>
 <div className={styles.inner}>
 <h2 className={styles.title}>Ready to simplify your payroll?</h2>
 <p className={styles.subtitle}>
 Join thousands of growing businesses running payroll the smarter way.
 </p>
 <div className={styles.actions}>
 <a href="#trial" className={styles.primary}>Start 14-day free trial</a>
 <a href="#contact" className={styles.secondary}>Watch Demo</a>
 </div>
 </div>
 </section>
 );
}
