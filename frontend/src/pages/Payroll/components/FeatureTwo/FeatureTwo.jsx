import React from "react";
import styles from "./FeatureTwo.module.css";

// const features = [
// {
// title: "Job Sheet Management",
// des1: "Create & edit job sheets",
// des2: "Attach customer details",
// des3: "Add tasks, notes, materials",
// },
// {
// title: "Employee Assignment",
// des1: "Assign Jobs to staff",
// des2: "Role-based access",
// des3: "Track who is doing what",
// },
// {
// title: "Status Tracking",
// des1: "Pending / In Progress / Completed",
// des2: "Timeline / Kanban view",
// },
// // {
// // title: "Cloud Access",
// // des1: "Access from anywhere",
// // des2: "Secure data storage",
// // },
// ];

const FeatureTwo = ({ featureTwo }) => {
 return (
 <section id="features" className={styles.section}>

 <div className={styles.header}>
 <h1 style={{fontSize: "50px"}}>Features Available</h1>
 <p>Every detail refined for professionals.</p>
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

export default FeatureTwo;
