import React from "react";
import styles from "./InfoSplit.module.css";

export default function InfoSplit({
 reverse = false,
 title,
 description,
 points,
 image,
 bgColor,
}) {
 return (
 <section
 className={`${styles.section} ${reverse ? styles.reverse : ""
 }`}
 >

 <div className={styles.left}>

 <div className={styles.imageCard} style={{ backgroundColor: bgColor }}>
 <img src={image} alt="" />
 </div>

 </div>

 <div className={styles.right}>

 <h2>{title}</h2>

 <p>{description}</p>

 <ul>
 {points.map((item, index) => (
 <li key={index}>
 <i className="fa-solid fa-check" style={{marginRight: "8px"}}></i>
 {item}
 </li>
 ))}
 </ul>

 </div>

 </section>
 );
}