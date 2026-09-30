import React from "react";
import styles from "./NewTry.module.css";

export default function NewTry({
 tag,
 title,
 description,
 primaryBtn,
 secondaryBtn,
 leftCard,
 rightCards,
}) {
 return (
 <section className={styles.section}>

 <div className={styles.top}>

 <span className={styles.tag}>
 {tag}
 </span>

 <h2>{title}</h2>

 <p>{description}</p>

 <div className={styles.buttons}>

 <button className={styles.primaryBtn}>
 {primaryBtn}
 </button>

 <button className={styles.secondaryBtn}>
 {secondaryBtn}
 </button>

 </div>

 </div>

 <div className={styles.layout}>

 <div className={styles.leftCard}>

 <div className={styles.leftIcon}>
 {leftCard.icon}
 </div>

 <h3>{leftCard.title}</h3>

 <p>{leftCard.description}</p>

 <div className={styles.leftStats}>

 {leftCard.stats.map((item, index) => (

 <div
 key={index}
 className={styles.statBox}
 >

 <h4>{item.value}</h4>

 <span>{item.label}</span>

 </div>

 ))}

 </div>

 </div>

 <div className={styles.rightGrid}>

 {rightCards.map((item, index) => (

 <div
 className={styles.smallCard}
 key={index}
 >

 <div className={styles.smallIcon}>
 {item.icon}
 </div>

 <h3>{item.title}</h3>

 <p>{item.description}</p>

 </div>

 ))}

 </div>

 </div>

 </section>
 );
}