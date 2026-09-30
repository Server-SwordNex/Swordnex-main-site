import React from "react";
import { Link } from "react-router-dom";
import styles from "./Pricing.module.css";

const PLANS = [
 {
 name: "Starter",
 price: "₹ 0",
 period: "Free forever",
 desc: "For small shops just getting started.",
 features: ["Up to 50 jobsheets/month", "1 staff user", "Digital PDF downloads", "Email support"],
 cta: "Get started",
 ctaLink: "/register",
 highlight: false,
 },
 {
 name: "Growth",
 price: "₹ 499",
 period: "per month",
 desc: "For busy service centers.",
 features: ["Unlimited jobsheets", "5 staff users", "Technician assignment", "Calendar scheduler", "Priority support"],
 cta: "Start free trial",
 ctaLink: "/register",
 highlight: true,
 },
 {
 name: "Enterprise",
 price: "₹ 1,499",
 period: "per month",
 desc: "Advanced controls for scaling operations.",
 features: ["Everything in Growth", "Unlimited staff users", "Multi-branch service centers", "Custom roles & audit logs", "Dedicated manager"],
 cta: "Talk to sales",
 ctaLink: "/support",
 highlight: false,
 },
];

export default function Pricing() {
 return (
 <section id="pricing" className={styles.section}>
 <div className={styles.head}>
 <span className={styles.eyebrow}>PRICING</span>
 <h2 className={styles.title}>Simple, transparent pricing</h2>
 <p className={styles.sub}>Pick a plan that grows with you. No hidden fees, no surprises.</p>
 </div>
 <div className={styles.grid}>
 {PLANS.map((p) => (
 <div key={p.name} className={`${styles.card} ${p.highlight ? styles.highlight : ""}`}>
 {p.highlight && <span className={styles.badge}>Most Popular</span>}
 <h3 className={styles.name}>{p.name}</h3>
 <p className={styles.desc}>{p.desc}</p>
 <div className={styles.priceRow}>
 <span className={styles.price}>{p.price}</span>
 <span className={styles.period}>{p.period}</span>
 </div>
 <ul className={styles.features}>
 {p.features.map((f) => (
 <li key={f}><span className={styles.check}>✓</span>{f}</li>
 ))}
 </ul>
 <Link to={p.ctaLink} className={p.highlight ? styles.ctaPrimary : styles.ctaGhost}>{p.cta}</Link>
 </div>
 ))}
 </div>
 </section>
 );
}
