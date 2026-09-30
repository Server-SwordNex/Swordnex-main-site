import React from "react";
import styles from "./Cards.module.css";

export default function Cards({
 title,
 cards,
 bgClr="#fff",
}) {
 return (
 <section className={styles.section} style={{backgroundColor: bgClr}}>

 <h2>{title}</h2>

 <div className={styles.grid}>

 {cards.map((item, index) => (

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

 <h3>{item.title}</h3>

 <p>{item.description}</p>

 </div>

 ))}

 </div>

 </section>
 );
}