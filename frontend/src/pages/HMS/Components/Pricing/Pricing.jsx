import React from "react";
import styles from "./Pricing.module.css";

const PLANS = [
 {
 name: "Starter",
 price: "₹ 0",
 period: "Free forever",
 desc: "For freelancers just getting started.",
 features: ["Up to 25 invoices/month", "1 user", "GST invoicing", "Email support"],
 cta: "Get started",
 highlight: false,
 },
 {
 name: "Growth",
 price: "₹ 499",
 period: "per month",
 desc: "For growing businesses that need more.",
 features: ["Unlimited invoices", "5 users", "Inventory & payments", "Recurring billing", "Priority support"],
 cta: "Start free trial",
 highlight: true,
 },
 {
 name: "Enterprise",
 price: "₹ 1,499",
 period: "per month",
 desc: "Advanced controls for scaling teams.",
 features: ["Everything in Growth", "Unlimited users", "Multi-branch & warehouses", "Custom roles & audit logs", "Dedicated manager"],
 cta: "Talk to sales",
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
 <a href="#trial" className={p.highlight ? styles.ctaPrimary : styles.ctaGhost}>{p.cta}</a>
 </div>
 ))}
 </div>
 </section>
 );
}
