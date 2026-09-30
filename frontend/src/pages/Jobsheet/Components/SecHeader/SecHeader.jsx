import React from "react";
import styles from "./SecHeader.module.css";

export default function SecHeader({
 badge,
 title,
 description,
 bgColor="#fff",
 badgeClr="#1682c0",
}) {
 return (
 <section className={styles.header} style={{backgroundColor: bgColor}}>
 
 <div className={styles.badge} style={{color: badgeClr}}>
 {badge}
 </div>

 <h1>{title}</h1>

 <p>{description}</p>

 </section>
 );
}