import React from "react";
import styles from "./Benefits.module.css";

const stats = [
 {
 value: "Fast",
 label: "Process payroll quickly with automated salary calculations and deductions",
 },
 {
 value: "Accurate",
 label: "Ensure precise salary, tax, and compliance calculations every pay cycle",
 },
 {
 value: "Compliant",
 label: "Manage PF, ESI, PT, TDS, and other statutory requirements with confidence",
 },
 {
 value: "Simple",
 label: "Give employees easy access to payslips, declarations, and reimbursements",
 },
];

const benefits = [
 "Run payroll in 3 simple clicks",
 "Automatic tax computation and filings",
 // "Direct deposits to multiple bank accounts",
 // "Custom salary components and structures",
 "Detailed reports and analytics dashboard",
 "Dedicated onboarding and 24/7 support",
];

export default function Benefits() {
 return (
 <section className={styles.benefits} id="benefits">
 <div className={styles.inner}>

 <div className={styles.split}>
 <div className={styles.copy}>
 <span className={styles.eyebrow}>Why teams choose us</span>
 <h2 className={styles.title}>
 Built for accuracy. Designed for speed.
 </h2>
 <p className={styles.lead}>
 From startups paying their first hire to enterprises managing
 thousands, our platform scales with your business while staying
 effortless to use.
 </p>
 </div>

 <ul className={styles.list}>
 {benefits.map((b) => (
 <li key={b} className={styles.listItem}>
 <span className={styles.check}>✓</span>
 <span>{b}</span>
 </li>
 ))}
 </ul>
 </div>

 <div className={styles.statsRow}>
 {stats.map((s) => (
 <div key={s.label} className={styles.stat}>
 <div className={styles.statValue}>{s.value}</div>
 <div className={styles.statLabel}>{s.label}</div>
 </div>
 ))}
 </div>

 </div>
 </section>
 );
}
