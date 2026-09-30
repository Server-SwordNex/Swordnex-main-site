import React from "react";
import styles from "./ScrollFeatures.module.css";

export default function ScrollFeatures({
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

 <i className={item.icon} style={{fontSize: "28px"}}></i>

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