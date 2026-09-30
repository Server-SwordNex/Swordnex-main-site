import React from "react";
import styles from "./Header2.module.css";

export default function Header2({
 badge,
 title,
 highlight,
 description,
 primaryBtn,
 secondaryBtn,
 stats,
 btnClr="#2563eb",
}) {
 return (
 <section className={styles.section}>

 <div className={styles.overlay}></div>

 <div className={styles.container}>

 <div className={styles.content}>

 <span className={styles.badge}>
 {badge}
 </span>

 <h1>
 {title}
 <span>{highlight}</span>
 </h1>

 <div style={{display: "flex", justifyContent: "center"}}>
 <p>{description}</p>
 </div>

 <div className={styles.actions}>

 <button className={styles.primaryBtn} style={{backgroundColor: btnClr}}>
 {primaryBtn}
 </button>

 <button className={styles.secondaryBtn}>
 {secondaryBtn}
 </button>

 </div>

 </div>

 <div className={styles.statsWrapper}>

 {stats.map((item, index) => (

 <div
 className={styles.statCard}
 key={index}
 >

 <h3>{item.value}</h3>

 <span>{item.label}</span>

 </div>

 ))}

 </div>

 </div>

 </section>
 );
}
