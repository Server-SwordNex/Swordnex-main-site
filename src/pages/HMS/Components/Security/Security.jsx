import React from "react";
import styles from "./Security.module.css";

export default function Security({
 badge,
 title,
 image,
 features,
 reverse = false,
}) {
 return (
 <section className={styles.section}>

 <div className={`${styles.container} ${ reverse ? styles.reverse : "" }`} >

 <div className={styles.left}>

 <span className={styles.badge}>
 {badge}
 </span>

 <h2>{title}</h2>

 <div className={styles.imageWrapper}>

 <img
 src={image}
 alt="security"
 />

 </div>

 </div>

 <div className={styles.right}>

 {features.map((item, index) => (

 <div
 className={styles.featureCard}
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

 </div>

 </section>
 );
}