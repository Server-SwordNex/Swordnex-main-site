import React, { useState } from "react";
import styles from "./Hero4.module.css"

export default function Hero4({
 tabs,
 activeBg = "#aff3fc",
 activeClr = "#50568f",
 bgColor = "#fff",
 highlightClr = "#3780c5",
 btnClr = "#485ebe",
 badgeTxt,
 badgeTxtClr = "#41709c",
 hText,
 highText,
 description,
}) {
 const [activeTab, setActiveTab] = useState(tabs[0]);

 return (
 <section
 className={styles.hero}
 style={{ backgroundColor: bgColor }}
 >
 <div className={styles.container}>
 <div className={styles.left}>
 <span
 className={styles.badge}
 style={{ color: badgeTxtClr, backgroundColor: activeBg }}
 >
 {badgeTxt}
 </span>

 <h1>
 {hText}
 <span style={{ color: highlightClr }}>
 {" "}
 {highText}
 </span>
 </h1>

 <p>{description}</p>

 <a
 href="/demo"
 className={styles.button}
 style={{ backgroundColor: btnClr }}
 >
 Book a Demo
 </a>
 </div>

 <div className={styles.right}>
 <div className={styles.tabs}>
 {tabs.map((tab) => (
 <button
 key={tab.id}
 onClick={() => setActiveTab(tab)}
 className={
 activeTab.id === tab.id
 ? styles.activeTab
 : ""
 }
 style={
 activeTab.id === tab.id
 ? {
 backgroundColor: activeBg,
 color: activeClr,
 }
 : {}
 }
 >
 {tab.title}
 </button>
 ))}
 </div>

 <div className={styles.showcase}>
 <div className={styles.imageWrapper}>
 <img
 src={activeTab.image}
 alt={activeTab.title}
 />
 </div>

 <h2>{activeTab.heading}</h2>

 <p>{activeTab.description}</p>
 </div>
 </div>
 </div>
 </section>
 );
}