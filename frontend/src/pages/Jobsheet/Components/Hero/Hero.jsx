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
 <span className={styles.pill} style={{color: badgeClr}}>✨ New • Technician scheduler ready</span>
 <h1 className={styles.title}>
 Jobsheet software that <span className={styles.accent} style={{color: highlightClr}}>runs your services</span>, not just your repairs.
 </h1>
 <p className={styles.sub}>
 SwordNex Jobsheet helps service centers and repair shops create jobsheets, assign technicians,
 track service status, and manage client records — all from one beautifully simple dashboard.
 </p>
 <div className={styles.ctaRow}>
 <a href="/register" className={styles.primary} style={{backgroundColor: btnClr}}>Start 14-day Free Trial</a>
 <a href="/support" className={styles.secondary}>▶ Request a demo</a>
 </div>
 <p className={styles.meta}>No credit card required • Get set up in 5 minutes</p>
 </div>
 <div className={styles.visual}>
 <div className={styles.card}>
 <div className={styles.cardHead}>
 <div>
 <div className={styles.cardLabel}>Jobsheet #JS-JS/001</div>
 <div className={styles.cardName}>Rahul Sharma (Customer)</div>
 </div>
 <span className={styles.paid}>COMPLETED</span>
 </div>
 <div className={styles.rows}>
 <div className={styles.row}><span>Laptop Screen Replacement</span><span>₹ 8,500</span></div>
 <div className={styles.row}><span>OS Installation & Backup</span><span>₹ 1,500</span></div>
 <div className={styles.row}><span>Keyboard Repair</span><span>₹ 1,200</span></div>
 </div>
 <div className={styles.total}>
 <span>Total Cost (incl. service)</span>
 <strong>₹ 11,200</strong>
 </div>
 </div>
 <div className={styles.float1}>
 <div className={styles.floatLabel}>Jobs Created</div>
 <div className={styles.floatVal}>142</div>
 <div className={styles.floatHint}>↑ 22.5% vs last month</div>
 </div>
 <div className={styles.float2}>
 <div className={styles.floatLabel}>In Progress</div>
 <div className={styles.floatVal2}>12 jobsheets</div>
 </div>
 </div>
 </div>
 </section>
 );
}
