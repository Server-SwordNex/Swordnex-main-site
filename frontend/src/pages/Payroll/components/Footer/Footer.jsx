import React from "react";
import styles from "./Footer.module.css";

export default function Footer({
 logo,
 description,
 sections,
 socials,
 copyright,
}) {
 return (
 <footer className={styles.footer}>

 <div className={styles.topGlow}></div>

 <div className={styles.container}>

 <div className={styles.brandSection}>

 <img
 src={logo}
 alt="logo"
 className={styles.logo}
 />

 <p>{description}</p>

 <div className={styles.socials}>

 {socials.map((item, index) => (

 <a
 href={item.link}
 key={index}
 target="_blank"
 rel="noreferrer"
 className={styles.socialIcon}
 >
 {item.icon}
 </a>

 ))}

 </div>

 </div>

 <div className={styles.linksWrapper}>

 {sections.map((section, index) => (

 <div
 className={styles.linkColumn}
 key={index}
 >

 <h3>{section.title}</h3>

 {section.links.map((link, i) => (

 <a
 href={link.url}
 key={i}
 >
 {link.name}
 </a>

 ))}

 </div>

 ))}

 </div>

 </div>

 <div className={styles.bottomBar}>

 <p>{copyright}</p>

 </div>

 </footer>
 );
}