import React from "react";
import styles from "./TrialBox4.module.css";

export default function TrialBox4({
 smallTitle,
 title,
 description,
 features,
 primaryBtn,
 secondaryBtn,
 image,
 smallTitleClr="#2563eb",
 btnClr="#2f6fc2",
 bgClr="#fff",
}) {
 return (
 <section className={styles.section} style={{backgroundColor: bgClr}}>

 <div className={styles.container}>

 <div className={styles.left}>

 <span className={styles.smallTitle} style={{color: smallTitleClr}}>
 {smallTitle}
 </span>

 <h2>{title}</h2>

 <p className={styles.description}>
 {description}
 </p>

 <div className={styles.features}>

 {features.map((item, index) => (

 <div
 className={styles.featureItem}
 key={index}
 >

 <div className={styles.dot}></div>

 <span>{item}</span>

 </div>

 ))}

 </div>

 <div className={styles.buttons}>

 <button className={styles.primaryBtn} style={{backgroundColor: btnClr}}>
 {primaryBtn}
 </button>

 <button className={styles.secondaryBtn}>
 {secondaryBtn}
 </button>

 </div>

 </div>

 <div className={styles.right}>

 <div className={styles.imageCard}>

 <img
 src={image}
 alt="dashboard"
 className={styles.image}
 />

 </div>

 </div>

 </div>

 </section>
 );
}