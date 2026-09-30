import React from "react";
import styles from "./Feature.module.css";

export default function Feature({
 title,
 features,
}) {
 return (
 <section className={styles.section}>

 <h2>{title}</h2>

 <div className={styles.grid}>

 {features.map((item, index) => (

 <div
 className={styles.card}
 key={index}
 >

 <div className={styles.iconWrapper}>

 {/* <img
 src={item.icon}
 alt={item.title}
 /> */}
 <i className={item.icon}></i>

 </div>

 <div className={styles.content}>

 <h3>{item.title}</h3>

 <p>{item.description}</p>

 </div>

 </div>

 ))}

 </div>

 </section>
 );
}