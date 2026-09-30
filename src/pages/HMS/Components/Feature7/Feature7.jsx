import React from "react";
import styles from "./Feature7.module.css";

export default function Feature7({
 badge,
 badgeBg="#ddfbff",
 title,
 description,
 columns = 3,
 features = [],
 bgColor="#fff",
 cardBg="#fff",
 highlightClr="#a83f48",
}) {
 return (
 <section
 className={styles.section}
 style={{backgroundColor: bgColor}}
 id="features"
 >
 <div className={styles.container}>
 {/* Header */}

 <header className={styles.header}>
 <div className={styles.badge} style={{backgroundColor: badgeBg}}>
 <span className={styles.badgeDot} style={{backgroundColor: highlightClr}}></span>
 <span>{badge}</span>
 </div>

 <h2 className={styles.headline}>
 {title}
 </h2>

 <p className={styles.subheadline}>
 {description}
 </p>
 </header>

 {/* Cards */}

 <div
 className={styles.grid}
 style={{
 gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
 }}
 >
 {features.map((feature, index) => (
 <article
 key={index}
 className={styles.card}
 style={{
 animationDelay: `${index * 80}ms`, backgroundColor: cardBg,
 }}
 >
 <div className={styles.iconWrap}>
 <span className={styles.icon} style={{color: highlightClr}}>
 {feature.icon}
 </span>
 </div>

 <p className={styles.label} style={{color: highlightClr}}>
 {feature.label}
 </p>

 <h3 className={styles.cardTitle}>
 {feature.title}
 </h3>

 <p className={styles.cardDescription}>
 {feature.description}
 </p>

 {/* {feature.linkText && (
 <a
 href={feature.link}
 className={styles.link}
 >
 {feature.linkText}

 <span className={styles.arrow}>
 →
 </span>
 </a>
 )} */}

 <div className={styles.accentLine} style={{backgroundColor: highlightClr}}></div>
 </article>
 ))}
 </div>
 </div>
 </section>
 );
}