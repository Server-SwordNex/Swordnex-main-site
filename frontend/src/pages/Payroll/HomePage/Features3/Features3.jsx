import React from "react";
import styles from "./Features3.module.css";

export default function Features3({
 title,
 subtitle,
 features,
}) {
 return (
 <section className={styles.section}>

 <h2>{title}</h2>

 <p>{subtitle}</p>

 <div className={styles.layout}>

 {features.map((item, index) => (

 <div
 key={index}
 className={`${styles.card} ${
 styles[item.layout]
 }`}
 style={{
 background: item.bgColor,
 color: item.textColor || "#111",
 }}
 >

 <div className={styles.content}>

 {/* <span>
 0{index + 1}
 </span> */}

 <h3>{item.title}</h3>

 <p>{item.description}</p>

 </div>

 <div style={{display: "flex", justifyContent: "center"}}>
 <img
 src={item.image}
 alt=""
 className={styles.image}
 />
 </div>

 </div>

 ))}

 </div>

 </section>
 );
}