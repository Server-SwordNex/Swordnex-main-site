import React from "react";
import styles from "./Hero.module.css";

export default function Hero() {
 return (
 <section className={styles.hero}>
 <div className={styles.inner}>
 <div className={styles.content}>
 {/* <span className={styles.eyebrow}>Payroll Software</span> */}
 <h1 className={styles.title}>
 Effortless payroll processing <br />
 for businesses
 </h1>
 <p className={styles.subtitle}>
 Run payroll in minutes, stay compliant with tax laws, and give your
 employees a delightful self-service experience — all from one
 modern platform.
 </p>

 <div className={styles.ctaRow}>
 <a href="#trial" className={styles.primaryCta}>Start your free trial</a>
 <a href="#demo" className={styles.secondaryCta}>Request a demo →</a>
 </div>

 <p className={styles.fineprint}>
 14-day free trial · No credit card required · Cancel anytime
 </p>
 </div>

 <div className={styles.visual} aria-hidden="true">
 <div className={styles.card}>
 <div className={styles.cardHeader}>
 <span className={styles.cardTitle}>Pay Run · June 2026</span>
 <span className={styles.badge}>Ready</span>
 </div>
 <div className={styles.row}>
 <span>Employees</span><strong>148</strong>
 </div>
 <div className={styles.row}>
 <span>Gross Pay</span><strong>$482,300</strong>
 </div>
 <div className={styles.row}>
 <span>Taxes & Deductions</span><strong>$96,124</strong>
 </div>
 <div className={styles.row}>
 <span>Net Payable</span><strong className={styles.accent}>$386,176</strong>
 </div>
 <button className={styles.cardBtn}>Approve Pay Run</button>
 </div>
 <div className={styles.floatChip}>+12% faster runs</div>
 <div className={styles.floatChipAlt}>Auto-tax filed ✓</div>
 </div>
 </div>
 </section>
 );
}
