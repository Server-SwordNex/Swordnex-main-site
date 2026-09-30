import React from "react";
import styles from "./TrialBoxTwo.module.css";

export default function TrialBoxTwo({
 title,
 description,
 primaryBtn,
 secondaryBtn,
}) {
 return (
 <section className={styles.section}>

 <div className={styles.container}>

 <h2>{title}</h2>

 <p>{description}</p>

 <div className={styles.buttons}>

 <button className={styles.primaryBtn}>
 {primaryBtn}
 </button>

 <button className={styles.secondaryBtn}>
 {secondaryBtn}
 </button>

 </div>

 </div>

 </section>
 );
}