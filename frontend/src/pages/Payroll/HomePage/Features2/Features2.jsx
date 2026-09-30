import React from "react";
import styles from "./Features2.module.css";

export default function Features2({
 title,
 subtitle,
 illustration,
 features,
 bgColor = "#f8f8f8",
 reverse=false,
}) {
 return (
 <section
 className={styles.section}
 style={{ backgroundColor: bgColor }}
 >
 <div className={`${styles.container} ${ reverse ? styles.reverse : "" }`}>

 <div className={styles.left}>

 <h2>{title}</h2>

 <h3>{subtitle}</h3>

 <img
 src={illustration}
 alt=""
 className={styles.mainImage}
 />

 </div>

 <div className={styles.right}>

 {features.map((item, index) => (

 <div
 key={index}
 className={styles.featureCard}
 >

 <div className={styles.header}>

 {/* <img
 src={item.icon}
 alt=""
 className={styles.icon}
 /> */}
 <i className={item.icon}></i>

 <h4>{item.title}</h4>

 </div>

 <p>{item.description}</p>

 </div>

 ))}

 </div>

 </div>
 </section>
 );
}