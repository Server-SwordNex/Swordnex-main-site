import React from "react";
import styles from "./RoleSec.module.css";

export default function RoleSec({
 title,
 roles,
 btnClr="#ff6b00",
}) {
 return (
 <section className={styles.section}>

 <div className={styles.container}>

 <h2 className={styles.heading}>
 {title}
 </h2>

 <div className={styles.rolesGrid}>

 {roles.map((role, index) => (

 <div
 key={index}
 className={styles.roleCard}
 >

 <div className={styles.profileArea}>

 <div>

 <div style={{ display: "inline-flex", gap: "7px", alignItems: "center", marginBottom: "12px" }}>
 <div>
 <i className={role.avatar} style={{ fontSize: "30px", marginTop: "0" }}></i>
 </div>
 <h3>{role.role}</h3>
 </div>

 <p>{role.description}</p>

 <button className={styles.helpBtn} style={{backgroundColor: btnClr}}>
 {role.buttonText}
 </button>

 </div>

 </div>

 <div className={styles.highlightBox}>

 <h4>Highlights</h4>

 {role.highlights.map((item, i) => (

 <div
 key={i}
 className={styles.highlightItem}
 >

 <div className={styles.left}>

 {/* <img
 src={item.icon}
 alt=""
 className={styles.icon}
 /> */}
 <i className={item.icon}></i>

 <span>
 {item.title}
 </span>

 </div>

 <i className="fa-solid fa-angle-right"></i>

 </div>

 ))}

 </div>

 </div>

 ))}

 </div>

 </div>

 </section>
 );
}