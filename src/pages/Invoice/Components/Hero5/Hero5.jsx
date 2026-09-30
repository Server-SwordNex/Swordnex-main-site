import React from "react";
import styles from "./Hero3.module.css";
import Image1 from "./Hero3.png"

export default function Hero3({
 tag,
 title,
 description,
 primaryBtn,
 secondaryBtn,
 image={Image1},
 miniCards,
}) {
 return (
 <section className={styles.hero}>

 <div className={styles.blurOne}></div>
 <div className={styles.blurTwo}></div>

 <div className={styles.container}>

 <div className={styles.content}>

 <span className={styles.tag}>
 {tag}
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

 <div className={styles.visual}>

 <div className={styles.glassCard}>

 <img
 src={image}
 // src={Image1}
 alt="dashboard"
 className={styles.image}
 />

 </div>

 {miniCards?.map((item, index) => (

 <div
 key={index}
 className={`${styles.miniCard} ${styles[item.position]}`}
 >

 <span>{item.label}</span>

 <h3>{item.value}</h3>

 </div>

 ))}

 </div>

 </div>

 </section>
 );
}