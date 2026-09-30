import React from "react";
import styles from "./Feature3.module.css";

export default function Feature3({
 title,
 highlight,
 description,
 features,
 bgColor="#000",
 highlightClr="#d97706",
 hTextClr="#fff",
 pColor="#cfcfcf",
}) {
 return (
 <section className={styles.section} style={{backgroundColor: bgColor}}>

 <div className={styles.container}>

 <div className={styles.header}>

 <h2 style={{color: hTextClr}}>
 {title}
 <br />
 <span style={{color: highlightClr}}>{highlight}</span>
 </h2>

 <p style={{color: pColor}}>{description}</p>

 </div>

 <div className={styles.grid}>

 {features.map((item, index) => (

 <div
 key={index}
 className={styles.card}
 >

 <div className={styles.content}>

 <h3>{item.title}</h3>

 <p>{item.description}</p>

 </div>

 <div className={styles.imageWrapper}>

 <img
 src={item.image}
 alt={item.title}
 className={styles.image}
 />

 </div>

 </div>

 ))}

 </div>

 </div>

 </section>
 );
}