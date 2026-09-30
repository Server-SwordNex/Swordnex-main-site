import React from "react";
import styles from "./Hero.module.css";

export default function Hero({
 highlightClr="#ff7a59",
 badgeClr="#e63946",
 btnClr="#e63946",
 bgColor="#fff",
}) {
 return (
 <section className={styles.hero} style={{backgroundColor: bgColor}}>
 <div className={styles.inner}>
 <div className={styles.copy}>
 <span className={styles.pill} style={{color: badgeClr}}>✨ New • GST 2.0 ready</span>
 <h1 className={styles.title}>
 Billing software that <span className={styles.accent} style={{color: highlightClr}}>runs your business</span>, not just your invoices.
 </h1>
 <p className={styles.sub}>
 Swordnex Billing helps small and growing businesses send invoices, track payments,
 manage inventory, and stay tax-compliant — all from one beautifully simple dashboard.
 </p>
 <div className={styles.ctaRow}>
 <a href="#trial" className={styles.primary} style={{backgroundColor: btnClr}}>Start 14-day Free Trial</a>
 <a href="#demo" className={styles.secondary}>▶ Watch 2-min demo</a>
 </div>
 <p className={styles.meta}>No credit card required • Cancel anytime</p>
 </div>
 <div className={styles.visual}>
 <div className={styles.card}>
 <div className={styles.cardHead}>
 <div>
 <div className={styles.cardLabel}>Invoice #INV-2087</div>
 <div className={styles.cardName}>Acme Traders Pvt Ltd</div>
 </div>
 <span className={styles.paid}>PAID</span>
 </div>
 <div className={styles.rows}>
 <div className={styles.row}><span>Web Design Services</span><span>₹ 45,000</span></div>
 <div className={styles.row}><span>Hosting (1 yr)</span><span>₹ 8,400</span></div>
 <div className={styles.row}><span>SSL Certificate</span><span>₹ 2,000</span></div>
 </div>
 <div className={styles.total}>
 <span>Total (incl. GST)</span>
 <strong>₹ 65,372</strong>
 </div>
 </div>
 <div className={styles.float1}>
 <div className={styles.floatLabel}>This month</div>
 <div className={styles.floatVal}>₹ 12.4L</div>
 <div className={styles.floatHint}>↑ 18.2% vs last month</div>
 </div>
 <div className={styles.float2}>
 <div className={styles.floatLabel}>Pending</div>
 <div className={styles.floatVal2}>32 invoices</div>
 </div>
 </div>
 </div>
 </section>
 );
}
