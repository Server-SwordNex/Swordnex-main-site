import React from "react";
import styles from "./Header3.module.css";

export default function Header3({
 tag,
 title,
 description,
 primaryBtn,
 secondaryBtn,
 leftCard,
 rightCards,
 bgColor="#fff",
 cardColor="#1d4ed8",
 btnColor="#1d4ed8",
}) {
 return (
 <section className={styles.section} style={{backgroundColor: bgColor}}>

 <div className={styles.top}>

 <span className={styles.tag}>
 {tag}
 </span>

 <h2>{title}</h2>

 <p>{description}</p>

 <div className={styles.buttons}>

 <button className={styles.primaryBtn} style={{backgroundColor: btnColor}}>
 {primaryBtn}
 </button>

 <button className={styles.secondaryBtn}>
 {secondaryBtn}
 </button>

 </div>

 </div>

 <div className={styles.layout}>

 <div className={styles.leftCard} style={{backgroundColor: cardColor}}>

 <div className={styles.leftIcon}>
 <i className={leftCard.icon}></i>
 </div>

 <h3>{leftCard.title}</h3>

 <p>{leftCard.description}</p>

 <div className={styles.leftStats}>

 {leftCard.stats.map((item, index) => (

 <div
 key={index}
 className={styles.statBox}
 >

 <h4>{item.value}</h4>

 <span>{item.label}</span>

 </div>

 ))}

 </div>

 </div>

 <div className={styles.rightGrid}>

 {rightCards.map((item, index) => (

 <div
 className={styles.smallCard}
 key={index}
 >

 <div className={styles.smallIcon}>
 <i className={item.icon}></i>
 </div>

 <h3>{item.title}</h3>

 <p>{item.description}</p>

 </div>

 ))}

 </div>

 </div>

 </section>
 );
}