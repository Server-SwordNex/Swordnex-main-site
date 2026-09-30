import React from "react";
import styles from "./FeatureGrid.module.css";

export default function FeatureGrid({
 title,
 features,
 bgColor,
 cardClr,
}) {
 return (
 <section className={styles.section} style={{backgroundColor: bgColor}}>
 
 <h2>{title}</h2>

 <div className={styles.grid}>
 
 {features.map((item, index) => (
 
 <div
 className={styles.card}
 style={{backgroundColor: cardClr}}
 key={index}
 >
 <h3>{item.title}</h3>
 <p>{item.description}</p>
 </div>

 ))}

 </div>

 </section>
 );
}