import React from "react";
import styles from "./Header.module.css";

export default function Header({
 badge,
 title,
 description,
 primaryBtn,
 secondaryBtn,
 cards,
}) {
 return (
 <section className={styles.section}>

 <div className={styles.container}>

 <div className={styles.left}>

 <span className={styles.badge}>
 {badge}
 </span>

 <h1>{title}</h1>

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

 {cards.map((item, index) => (

 <div
 key={index}
 className={`${styles.card} ${styles[item.position]}`}
 >

 <div className={styles.icon}>
 <i className={item.icon}></i>
 </div>

 <h3>{item.title}</h3>

 <p>{item.description}</p>

 </div>

 ))}

 {/* <div className={styles.centerCircle}></div> */}

 </div>

 </div>

 </section>
 );
}