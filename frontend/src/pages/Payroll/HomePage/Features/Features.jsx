import React from "react";
import styles from "./Features.module.css";

const features = [
 {
 icon: "fa-solid fa-calculator",
 title: "Automated Payroll Processing",
 desc: "Process salaries with automated earnings, deductions, reimbursements, and tax calculations in a few clicks.",
 },
 {
 icon: "fa-solid fa-file-invoice-dollar",
 title: "Professional Payslips",
 desc: "Generate detailed payslips with complete salary breakdowns, deductions, and statutory information.",
 },
 {
 icon: "fa-solid fa-clock",
 title: "Time & Workforce Tracking",
 desc: "Use employee attendance and work records to ensure accurate payroll calculations every pay cycle.",
 },
 {
 icon: "fa-solid fa-money-bill-transfer",
 title: "Reimbursements & Claims",
 desc: "Simplify employee reimbursement requests and include approved claims directly in payroll processing.",
 },
 {
 icon: "fa-solid fa-scale-balanced",
 title: "Statutory Compliance",
 desc: "Manage PF, ESI, PT, TDS, and other statutory deductions while maintaining payroll compliance.",
 },
 {
 icon: "fa-solid fa-chart-column",
 title: "Insights & Reports",
 desc: "Access payroll, deduction, employee, and statutory reports for better visibility and decision-making.",
 },
];

export default function Features() {
 return (
 <section className={styles.features} id="features">
 <div className={styles.inner}>
 <header className={styles.header}>
 <span className={styles.eyebrow}>Features</span>
 <h2 className={styles.title}>Everything you need to run payroll</h2>
 <p className={styles.subtitle}>
 A complete suite of tools that simplify every part of payroll — from
 calculations to compliance, payments to reports.
 </p>
 </header>

 <div className={styles.grid}>
 {features.map((f) => (
 <article key={f.title} className={styles.card}>
 <div className={styles.icon}><i className={f.icon}></i></div>
 <h3 className={styles.cardTitle}>{f.title}</h3>
 <p className={styles.cardDesc}>{f.desc}</p>
 </article>
 ))}
 </div>
 </div>
 </section>
 );
}
