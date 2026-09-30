import React from "react";
import styles from "./FeaturesCard.module.css";

export default function FeaturesCard({
 id,
 category,
 title,
 description,
 image,
 ctaText,
 ctaLink,
 bgColor="#fff",
 items = [],
}) {
 return (
 <section id={id} className={`feature-card ${styles.featureCard}`} style={{backgroundColor: bgColor}}>
 {/* Header */}
 <span className={styles.tagline}>
 {category}
 </span>
 <div className={styles.featureHeading}>
 <div className={styles.featureTitle}>
 

 <h2>{title}</h2>
 </div>

 <div className={styles.featureContent}>
 <p className={styles.featureDesc}>
 {description}
 </p>

 {ctaText && (
 <a
 href={ctaLink}
 className={styles.mainLink}
 >
 {ctaText}
 <span>→</span>
 </a>
 )}
 </div>
 </div>

 {/* Image */}
 <div className={styles.featureImage}>
 <img
 src={image}
 alt={title}
 />
 </div>

 {/* Features Grid */}
 <div className={styles.featuresGrid}>
 {items.map((item, index) => (
 <div
 key={index}
 className={styles.featureItem}
 >
 <h3>{item.title}</h3>

 <p>{item.description}</p>

 {item.linkText && (
 <a href={item.link}>
 {item.linkText}
 <span>→</span>
 </a>
 )}
 </div>
 ))}
 </div>
 </section>
 );
}