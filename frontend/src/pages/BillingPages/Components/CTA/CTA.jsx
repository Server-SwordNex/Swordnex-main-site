import React from "react";
import styles from "./CTA.module.css";

export default function CTA({description}) {
 return (
 <section className={styles.wrap}>
 <div className={styles.box}>
 <h2 className={styles.title}>Ready to bill smarter?</h2>
 <p className={styles.sub}>{description}</p>
 <div className={styles.actions}>
 <a href="#trial" className={styles.primary}>Start your free trial</a>
 <a href="#contact" className={styles.ghost}>Book a demo →</a>
 </div>
 </div>
 </section>
 );
}
