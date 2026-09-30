import React from "react";
import styles from "./TrustBox.module.css";

export default function TrustBox({
 badge = "By the Numbers",
 title,
 description,
 stats = [],
 logos = [],
 bgColor="#fff",
}) {
 return (
 <section
 className={styles.section}
 style={{backgroundColor: bgColor}}
 id="metrics"
 >

 <div className={styles.container}>
 {/* Header */}
 <header className={styles.header}>
 <div className={styles.badge}>
 <span className={styles.badgeDot}></span>
 <span>{badge}</span>
 </div>

 <h2 className={styles.headline}>
 {title}
 </h2>

 <p className={styles.subheadline}>
 {description}
 </p>
 </header>

 {/* Stats */}
 <div className={styles.statsGrid}>
 {stats.map((stat, index) => (
 <div
 key={index}
 className={styles.statItem}
 >
 {/* <div className={styles.statIconRow}>
 <span className={styles.statIcon}>
 {stat.icon}
 </span>
 </div> */}

 <div className={styles.statValueRow}>
 <p className={styles.statValue}>
 {stat.value}
 </p>
 </div>

 <div className={styles.statLabels}>
 <p className={styles.statLabel}>
 {stat.label}
 </p>

 <p className={styles.statSublabel}>
 {stat.subLabel}
 </p>
 </div>
 </div>
 ))}
 </div>

 {/* Logos */}
 <div className={styles.logoSection}>
 <p className={styles.logoLabel}>
 Powering operations at world-class properties
 </p>

 <div className={styles.logoRow}>
 {logos.map((logo, index) => (
 <div
 key={index}
 className={styles.logoItem}
 >
 <span className={styles.logoText}>
 {logo}
 </span>
 </div>
 ))}
 </div>
 </div>
 </div>

 </section>
 );
}