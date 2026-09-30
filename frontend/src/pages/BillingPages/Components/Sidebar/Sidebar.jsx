import React from "react";
import styles from "./Sidebar.module.css";

const Sidebar = ({ features, activeSection }) => {
 
 return (
 <aside className={styles.sidebar}>
 <h2 className={styles.heading}>All Features</h2>

 <ul className={styles.navList}>
 {features.map((feature) => (
 <li key={feature.id}>
 <a
 href={`#${feature.id}`}
 className={`${styles.navLink} ${
 activeSection === feature.id ? styles.active : ""
 }`}
 >
 {feature.icon && (
 <span className={styles.icon}><i className={feature.icon}></i></span>
 )}

 <span>{feature.label}</span>
 </a>
 </li>
 ))}
 </ul>
 </aside>
 );
};

export default Sidebar;