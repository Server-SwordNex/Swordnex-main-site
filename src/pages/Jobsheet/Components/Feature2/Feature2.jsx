import React, { useState } from "react";
import styles from "./Feature2.module.css";

export default function Feature2({
 title,
 subtitle,
 features,
 bgColor="#f7f7f7",
}) {
 const [activeTab, setActiveTab] = useState(0);

 return (
 <section className={styles.section}>

 <div className={styles.header}>

 <span className={styles.label}>
 {title}
 </span>

 <h2>
 {subtitle}
 </h2>

 </div>

 {/* Desktop Tabs */}

 <div className={styles.tabs}>

 {features.map((item, index) => (

 <button
 key={index}
 onClick={() => setActiveTab(index)}
 className={`${styles.tab}
 ${activeTab === index ? styles.active : ""}`}
 >
 {item.tab}
 </button>

 ))}

 </div>

 <div className={styles.contentWrapper}>

 <div className={styles.imageSide} style={{backgroundColor: bgColor}}>

 <img
 key={activeTab}
 src={features[activeTab].image}
 alt={features[activeTab].heading}
 className={styles.image}
 />

 </div>

 <div className={styles.contentSide}>

 <h3>
 {features[activeTab].heading}
 </h3>

 <p>
 {features[activeTab].description}
 </p>

 {features[activeTab].points && (

 <ul className={styles.points}>

 {features[activeTab].points.map(
 (point, i) => (
 <li key={i}>
 <i className="fa-solid fa-check" style={{marginRight: "5px"}}></i> {point}
 </li>
 )
 )}

 </ul>

 )}

 </div>

 </div>

 {/* Mobile Accordion */}

 <div className={styles.mobileAccordion}>

 {features.map((item, index) => (

 <div
 key={index}
 className={styles.accordionItem}
 >

 <button
 className={styles.accordionBtn}
 onClick={() =>
 setActiveTab(
 activeTab === index
 ? -1
 : index
 )
 }
 >

 {item.tab}

 <span>
 {activeTab === index
 ? "−"
 : "+"}
 </span>

 </button>

 {activeTab === index && (

 <div className={styles.mobileContent}>

 <img
 src={item.image}
 alt={item.heading}
 />

 <h4>
 {item.heading}
 </h4>

 <p>
 {item.description}
 </p>

 </div>

 )}

 </div>

 ))}

 </div>

 </section>
 );
}