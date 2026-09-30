import React from "react";
import styles from "./Feature6.module.css";

export default function Feature6({
 title,
 description,
 viewAllText = "View All",
 onViewAll,
 resources,
}) {
 return (
 <section className={styles.section}>

 <div className={styles.header}>

 <div>

 <h2>{title}</h2>

 <p>{description}</p>

 </div>

 {/* <button
 className={styles.viewAllBtn}
 onClick={onViewAll}
 >
 {viewAllText}
 </button> */}

 </div>

 <div className={styles.grid}>

 {resources.map((item, index) => (

 <article
 key={index}
 className={styles.card}
 >

 <div className={styles.imageWrapper}>

 <img
 src={item.image}
 alt={item.title}
 className={styles.image}
 />

 </div>

 <span className={styles.category}>
 {item.category}
 </span>

 <h3>{item.title}</h3>

 <button
 className={styles.readMore}
 onClick={() => item.onClick?.()}
 >
 Read More →
 </button>

 </article>

 ))}

 </div>

 </section>
 );
}