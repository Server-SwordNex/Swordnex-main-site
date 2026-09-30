import React, { useState } from "react";
import styles from "./EmpTab.module.css";

export default function EmpTab({
 tag,
 title,
 tabs,
 bgClr="#fff",
}) {

 const [activeTab, setActiveTab] = useState(1);

 const prevIndex =
 activeTab === 0
 ? tabs.length - 1
 : activeTab - 1;

 const nextIndex =
 activeTab === tabs.length - 1
 ? 0
 : activeTab + 1;

 return (
 <section className={styles.section} style={{backgroundColor: bgClr}}>

 <span className={styles.tag}>
 {tag}
 </span>

 <h2 className={styles.title}>
 {title}
 </h2>

 <div className={styles.tabs}>

 {tabs.map((item, index) => (

 <button
 key={index}
 onClick={() => setActiveTab(index)}
 className={` ${styles.tbs}
 ${activeTab === index
 ? styles.activeTab
 : styles.tab}`
 }
 >
 {item.tab}
 </button>

 ))}

 </div>

 <div className={styles.carouselWrapper}>

 <div
 className={styles.carousel}
 style={{
 transform: `translateX(calc(28% - ${activeTab * 60}%))`,
 }}
 >

 {tabs.map((item, index) => (

 <div
 key={index}
 className={`${styles.slide}
 ${index === activeTab
 ? styles.activeSlide
 : styles.inactiveSlide}`}
 style={{
 background:
 index === activeTab
 ? item.bgColor
 : "#f1ece8",
 }}
 >

 <div className={styles.content}>

 <h3>{item.heading}</h3>

 <p>{item.description}</p>

 </div>

 <img
 src={item.image}
 alt=""
 className={styles.image}
 />

 </div>

 ))}

 </div>

 </div>

 </section>
 );
}