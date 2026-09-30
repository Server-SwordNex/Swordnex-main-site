import React from "react";
import styles from "./Hero.module.css";
import logo from "./Invoice-hero.png";
import AnimateOnScroll from "../../Components/AnimateOnScroll";

const Hero = () => {
 return (
 <section className={styles.hero} id="hero">
 <div className={styles.grid}>
 <AnimateOnScroll animation="fadeLeft">
 <span className={styles.badge}></span>

 <h1 className={styles.title}>
 Precision Invoicing for the <span className={styles.highlight}> Modern Professional </span>
 </h1>

 <p className={styles.text}>
 The most elegant way to manage GST billing,
 tracking and reporting.
 </p>

 <div className={styles.buttons}>
 <button className={`${styles.primary} ${styles.st}`}>
 Get Started now
 </button>

 <button className={styles.secondary}>
 Watch Demo
 </button>
 </div>
 </AnimateOnScroll>

 <AnimateOnScroll animation="fadeRight" delay={200}>
 <div className={styles.imageWrapper}>
 <img src={logo} alt="Invoice" className={styles.imgs} />
 </div>
 </AnimateOnScroll>
 </div>
 </section>
 );
};

export default Hero;
