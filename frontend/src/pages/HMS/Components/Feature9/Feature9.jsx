import React from "react";
import styles from "./Feature9.module.css";

export default function Feature9({
 badge,
 title,
 description,
 features = [],
 bgColor = "#ffffff",
 accentColor = "#0F766E",
}) {
 return (
 <section
 className={styles.section}
 style={{ backgroundColor: bgColor }}
 >
 <div className={styles.container}>
 <div className={styles.header}>
 {badge && (
 <span
 className={styles.badge}
 style={{ color: accentColor }}
 >
 {badge}
 </span>
 )}

 <h2>{title}</h2>
 <p>{description}</p>
 </div>

 <div className={styles.features}>
 {features.map((item, index) => (
 <div
 key={index}
 className={`${styles.feature} ${
 index % 2 !== 0 ? styles.reverse : ""
 }`}
 >
 <div className={styles.imageBox}>
 <img src={item.image} alt={item.title} />
 </div>

 <div className={styles.content}>
 <span className={styles.category}>
 {item.category}
 </span>

 <h3>{item.title}</h3>

 <p>{item.description}</p>

 <ul className={styles.points}>
 {item.points?.map((point, i) => (
 <li key={i}>{point}</li>
 ))}
 </ul>

 <a href={item.link}>
 Learn More →
 </a>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>
 );
}