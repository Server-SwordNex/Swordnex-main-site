import React from "react";
import styles from "./Feature6.module.css";
import { Link } from "react-router-dom";

export default function Feature6({
 title,
 description,
 viewAllText = "View All",
 onViewAll,
 resources,
 contain=false,
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
 style={contain && {objectFit: "contain"}}
 />

 </div>

 <span className={styles.category}>
 {item.category}
 </span>

 <h3>{item.title}</h3>

 <Link to={item.readMore} className={styles.readMore} >Read More -</Link>

 </article>

 ))}

 </div>

 </section>
 );
}