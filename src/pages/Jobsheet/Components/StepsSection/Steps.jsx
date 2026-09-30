import React from "react";
import styles from "./Steps.module.css";

export default function Steps({
 title,
 steps,
 reverse = false,
 bgColor="#fff",
}) {
 return (
 <section className={styles.section} style={{backgroundColor: bgColor}}>

 <div className={`${styles.container} ${ reverse ? styles.reverse : "" }`} >

 <div className={styles.left}>

 <h2>{title}</h2>

 </div>

 <div className={styles.right}>

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

 </div>

 </section>
 );
}