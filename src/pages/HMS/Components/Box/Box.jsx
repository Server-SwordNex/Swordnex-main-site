import React from "react";
import styles from "./Box.module.css";

export default function Box({
 badge,
 title,
 description,
 steps = [],
}) {
 return (
 <section className={styles.section}>
 <div className={styles.container}>

 <div className={styles.header}>
 <span className={styles.badge}>
 {badge}
 </span>

 <h2>{title}</h2>

 <p>{description}</p>
 </div>

 <div className={styles.timeline}>

 {steps.map((step, index) => (
 <div
 key={index}
 className={styles.step}
 >
 <div className={styles.number}>
 {String(index + 1).padStart(2, "0")}
 </div>

 <div className={styles.content}>
 <div className={styles.icon}>
 <i className={step.icon}></i>
 </div>

 <h3>{step.title}</h3>

 <p>{step.description}</p>
 </div>
 </div>
 ))}

 </div>

 </div>
 </section>
 );
}