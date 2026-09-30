import React from "react";
import styles from "./Hero3.module.css";

export default function Hero3({
 title,
 heading,
 description,
 primaryBtn,
 secondaryBtn,
 leftImage,
 rightImage,
 backgroundImage,
 reverse = false,
 btnClr="#ef5b45",
 bgColor="#f6efea",
}) {
 return (
 <section className={styles.section} style={{backgroundColor: bgColor}}>

 <div className={`${styles.container} ${ reverse ? styles.reverse : "" }`} >

 <div className={styles.left}>

 <span className={styles.badge} style={{color: btnClr}}>
 {title}
 </span>

 <h2>{heading}</h2>

 <p>{description}</p>

 <div className={styles.actions}>

 <button className={styles.primaryBtn} style={{backgroundColor: btnClr}}>
 {primaryBtn}
 </button>

 <button className={styles.secondaryBtn}>
 {secondaryBtn}
 </button>

 </div>

 </div>

 <div className={styles.right}>

 <div className={styles.imageWrapper}>

 {backgroundImage && (
 <img
 src={backgroundImage}
 alt="background"
 className={styles.bgImage}
 />
 )}

 <img
 src={leftImage}
 alt="left"
 className={styles.leftImage}
 />

 {/* <img
 src={rightImage}
 alt="right"
 className={styles.rightImage}
 /> */}

 </div>

 </div>

 </div>

 </section>
 );
}