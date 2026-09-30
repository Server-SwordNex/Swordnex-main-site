import React from "react";
import styles from "./TrialBox.module.css";

export default function TrialBox({
 smallText,
 title,
 primaryBtn,
 secondaryBtn,
 bgClr="#fff",
 btnClr,
}) {
 return (
 <section className={styles.section} style={{backgroundColor: bgClr}}>

 <div className={styles.container}>

 <div className={styles.left}>

 <p>{smallText}</p>

 <div className={styles.line}></div>

 <h2>{title}</h2>

 </div>

 <div className={styles.right}>

 <button className={styles.primaryBtn} style={{backgroundColor: btnClr}}>
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