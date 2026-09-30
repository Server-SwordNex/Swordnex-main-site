import React from "react";
import styles from "./Checklist.module.css";

export default function Checklist({
 title,
 features,
 bgClr="#f8f2ec",
}) {
 return (
 <section className={styles.section} style={{backgroundColor: bgClr}}>

 <div className={styles.container}>

 <h2>{title}</h2>

 <div className={styles.grid}>

 {features.map((item, index) => (

 <div
 className={styles.featureItem}
 key={index}
 >

 <span className={styles.tick}>
 ✓
 </span>

 <p>{item}</p>

 </div>

 ))}

 </div>

 </div>

 </section>
 );
}