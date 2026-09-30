import React from "react";
import styles from "./Feature8.module.css";

export default function Feature8({
 badge = "Room Categories",
 title = "Beautifully Organized Room Types",
 description = "Manage room inventory, availability and pricing with ease.",
 viewAllLink = "#",
 rooms = [],
 bgColor="#fff",
 cardBg="#fff",
}) {
 return (
 <section className={styles.section} style={{backgroundColor: bgColor}}>
 <div className={styles.container}>
 {/* Header */}
 <div className={styles.header}>
 <div>
 <p className={styles.badge}>{badge}</p>
 <h2 className={styles.title}>{title}</h2>
 <p className={styles.description}>
 {description}
 </p>
 </div>

 {/* <a
 href={viewAllLink}
 className={styles.viewAll}
 >
 View Full Inventory →
 </a> */}
 </div>

 {/* Cards */}
 <div className={styles.grid}>
 {rooms.map((room, index) => (
 <article
 key={index}
 className={styles.card}
 style={{backgroundColor: cardBg}}
 >
 <div className={styles.imageWrapper}>
 <img
 src={room.image}
 alt={room.name}
 className={styles.image}
 />

 <span className={styles.roomType}>
 {room.type}
 </span>
 </div>

 <div className={styles.content}>
 <div>
 <span className={styles.category}>
 {room.category}
 </span>

 <h3>{room.title}</h3>

 <p>{room.description}</p>
 </div>

 {/* <a
 href={room.link}
 className={styles.button}
 >
 →
 </a> */}
 </div>
 </article>
 ))}
 </div>
 </div>
 </section>
 );
}