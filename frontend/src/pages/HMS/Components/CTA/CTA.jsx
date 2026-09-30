import React from "react";
import styles from "./CTA.module.css";

export default function CTA({
 title = "Ready to bill smarter?",
 description = "",
 primaryText = "Start your free trial",
 primaryLink = "#trial",
 secondaryText = "Book a demo →",
 secondaryLink = "#contact",
}) {
 return (
 <section className={styles.wrap}>
 <div className={styles.box}>
 <h2 className={styles.title}>{title}</h2>

 <p className={styles.sub}>
 {description}
 </p>

 <div className={styles.actions}>
 <a
 href={primaryLink}
 className={styles.primary}
 >
 {primaryText}
 </a>

 <a
 href={secondaryLink}
 className={styles.ghost}
 >
 {secondaryText}
 </a>
 </div>
 </div>
 </section>
 );
}