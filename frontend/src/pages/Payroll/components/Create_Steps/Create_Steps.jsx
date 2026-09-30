import React from "react";
import styles from "./Create_Steps.module.css";

export default function Create_Steps({
 badge,
 title,
 description,
 steps,
 image,
 reverse=false,
}) {
 return (
 <section className={styles.section}>

 <div className={styles.top}>

 {/* <span className={styles.badge}>
 {badge}
 </span> */}

 <h2>{title}</h2>

 <p>{description}</p>

 </div>

 <div className={`${styles.container} ${reverse ? styles.reverse : ""}`} >

 <div className={styles.left}>

 {steps.map((item, index) => (

 <div
 className={styles.stepCard}
 key={index}
 >

 <div className={styles.number}>
 {index + 1}
 </div>

 <div className={styles.content}>

 <h3>{item.title}</h3>

 <p>{item.description}</p>

 </div>

 </div>

 ))}

 </div>

 <div className={styles.right}>

 <div className={styles.imageWrapper}>

 <img
 src={image}
 alt="invoice"
 className={styles.image}
 />

 </div>

 </div>

 </div>

 </section>
 );
}