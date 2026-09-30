import React from "react";
import styles from "./Feature5.module.css";

const Feature5 = ({ featureTwo, bgColor="#fff", title, description }) => {
 return (
 <section id="features" className={styles.section} style={{backgroundColor: bgColor}}>

 <div className={styles.header}>
 <h1 style={{fontSize: "50px"}}>{title}</h1>
 <p>{description}</p>
 </div>

 <div className={styles.grid}>
 {featureTwo.map((feature, index) => (
 <div key={index} className={styles.crd}>
 <h2 style={{marginBottom: "10px"}}>{feature.title}</h2>
 <p> <i className="fa-solid fa-star" style={{fontSize: "10px"}}></i> {feature.des1}</p>
 <p> <i className="fa-solid fa-star" style={{fontSize: "10px" }}></i> {feature.des2}</p>
 {feature?.des3 ? <p> <i className="fa-solid fa-star" style={{fontSize: "10px" }}></i> {feature.des3}</p> : ""}
 
 </div>
 ))}
 </div>

 </section>
 );
};

export default Feature5;
