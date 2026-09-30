import React from "react";
import styles from "./Hero2.module.css";

const Hero2 = ({
 img,
 before,
 highlight,
 after,
 description,
 primaryBtn,
 secondaryBtn,
 btnClr,
 highLightClr = "#ffa023e7",
 reverse = false
}) => {
 return (
 <section className={styles.hero}>
 <div className={`${styles.container} ${reverse ? styles.reverse : ""}`} >

 <div>

 <h1 className={styles.title}>
 {before} <span style={{ color: highLightClr }}> {highlight} </span>{after}
 </h1>

 <p className={styles.text}>
 {description}
 </p>

 <div className={styles.buttons}>
 <button className={styles.primary} style={{ backgroundColor: btnClr }} >
 {primaryBtn}
 </button>

 <button className={styles.secondary}>
 {secondaryBtn}
 </button>
 </div>
 </div>

 <div className={styles.imageWrapper}>
 <img src={img} alt="Invoice" className={styles.imgs} />
 </div>

 </div>
 </section>
 );
};

export default Hero2;