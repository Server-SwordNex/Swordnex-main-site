import React from "react";
import styles from "./CTA.module.css";

export default function CTA({description}) {
 return (
 <section className={styles.wrap}>
 <div className={styles.box}>
 <h2 className={styles.title}>Ready to simplify your jobsheet management?</h2>
 <p className={styles.sub}>{description}</p>
 <div className={styles.actions}>
 <a href="/register" className={styles.primary}>Start your free trial</a>
 <a href="/support" className={styles.ghost}>Book a demo →</a>
 </div>
 </div>
 </section>
 );
}
