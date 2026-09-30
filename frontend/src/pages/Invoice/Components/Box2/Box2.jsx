import React from "react";
import styles from "./Box2.module.css";

export default function Box2({
 badge,
 title,
 description,
 primaryBtn,
 secondaryBtn,
 options = [],
 cardBg="#fff",
 badgeTxtClr="#758ee0",
 badgeBg="#e9dfdf",
 btnClr="#426dad",
 bgClr="#fff",
 iconBg="#aa9999"
}) {
 return (
 <section className={styles.helpHub} style={{backgroundColor: bgClr}}>
 <div className={styles.container}>

 <div className={styles.topSection}>

 <div className={styles.content}>
 <span className={styles.badge} style={{backgroundColor: badgeBg, color: badgeTxtClr}}>
 {badge}
 </span>

 <h2 className={styles.title}>
 {title}
 </h2>

 <p className={styles.description}>
 {description}
 </p>

 <div className={styles.actions}>
 <button className={styles.primaryBtn} style={{backgroundColor: btnClr}}>
 {primaryBtn}
 </button>

 <button className={styles.secondaryBtn}>
 {secondaryBtn}
 </button>
 </div>
 </div>

 <div className={styles.supportOptions}>
 {options.map((item, index) => (
 <div
 key={index}
 className={styles.optionCard}
 style={{backgroundColor: cardBg}}
 >
 <div className={styles.icon} style={{backgroundColor: iconBg}}>
 <i className={item.icon}></i>
 </div>

 <div>
 <h3>{item.title}</h3>
 <p>{item.description}</p>
 </div>
 </div>
 ))}
 </div>

 </div>

 </div>
 </section>
 );
}