import React from "react";
import styles from "./SecHeader.module.css";

export default function SecHeader({
 badge,
 title,
 description,
 bgColor="#fff",
 badgeClr="#1682c0",
 badgeBg="#e2dcdc",
}) {
 return (
 <section className={styles.header} style={{backgroundColor: bgColor}}>
 
 <div className={styles.badge} style={{color: badgeClr, backgroundColor: badgeBg}}>
 {badge}
 </div>

 <h1>{title}</h1>

 <p>{description}</p>

 </section>
 );
}