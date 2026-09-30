import React from "react";
import styles from "./TrialBox3.module.css";

export default function TrialBox3({
 tag,
 title,
 description,
 primaryBtn,
 secondaryBtn,
 stats,
}) {
 return (
 <section className={styles.section}>

 <div className={styles.card}>

 <div className={styles.left}>

 <span className={styles.tag}>
 {tag}
 </span>

 <h2>{title}</h2>

 <p>{description}</p>

 <div className={styles.actions}>

 <button className={styles.primaryBtn}>
 {primaryBtn}
 </button>

 <button className={styles.secondaryBtn}>
 {secondaryBtn}
 </button>

 </div>

 </div>

 <div className={styles.right}>

 {stats.map((item, index) => (

 <div
 className={styles.statCard}
 key={index}
 >

 <h3>{item.number}</h3>

 <span>{item.label}</span>

 </div>

 ))}

 </div>

 </div>

 </section>
 );
}