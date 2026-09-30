import React from "react";
import styles from "./CTASection.module.css";

export default function CTASection({
 title,
 description,
 primaryBtn,
 secondaryBtn,
 badgeColor="#ffffff1c",
 btnColor="#151894",
 bgClr="#0066ff",
 btnBg="#f8fafc",
 hColor="#fff",
 pColor="#d4d3d3",
}) {
 return (
 <section className={styles.section} style={{backgroundColor: bgClr}}>

 <div className={styles.overlay} style={{backgroundColor: badgeColor}}></div>

 <div className={styles.content}>

 <span className={styles.badge} style={{color: hColor, backgroundColor: badgeColor}}>
 Swordnex Payroll
 </span>

 <h2 style={{color: hColor}}>{title}</h2>

 <p style={{color: pColor}}>{description}</p>

 <div className={styles.actions}>

 <button className={styles.primaryBtn} style={{backgroundColor: btnBg, color: btnColor}}>
 {primaryBtn}
 </button>

 <button className={styles.secondaryBtn} style={{color: hColor, backgroundColor: badgeColor}}>
 {secondaryBtn}
 </button>

 </div>

 </div>

 </section>
 );
}