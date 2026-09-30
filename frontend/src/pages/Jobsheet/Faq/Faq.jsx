import React, { useState } from "react";
import { Search } from "lucide-react";
import styles from "./Faq.module.css";

export default function Faq({
 title,
 subtitle,
 faqs = [],
}) {
 const [searchQuery, setSearchQuery] =
 useState("");

 const [openFaq, setOpenFaq] =
 useState(null);

 const handleToggleFaq = (index) => {
 setOpenFaq(
 openFaq === index ? null : index
 );
 };

 const filteredFaqs = faqs.filter(
 (faq) =>
 faq.question
 .toLowerCase()
 .includes(searchQuery.toLowerCase()) ||
 faq.answer
 .toLowerCase()
 .includes(searchQuery.toLowerCase())
 );

 return (
 <div className={styles.faqSection}>
 {/* Hero */}

 <section className={styles.hero}>
 <h1 className={styles.welcome}>
 Welcome To
 </h1>

 <h2 className={styles.title}>
 {title}
 </h2>

 <p className={styles.subtitle}>
 {subtitle}
 </p>
 </section>

 {/* Search */}

 <div className={styles.searchWrapper}>
 <div className={styles.searchBox}>
 <Search
 size={18}
 className={styles.searchIcon}
 />

 <input
 type="text"
 placeholder="Search Frequently Asked Questions"
 value={searchQuery}
 onChange={(e) =>
 setSearchQuery(e.target.value)
 }
 className={styles.searchInput}
 />
 </div>
 </div>

 {/* FAQs */}

 <section className={styles.faqContainer}>
 {filteredFaqs.map(
 (item, index) => (
 <div
 key={index}
 className={styles.faqItem}
 >
 <button
 className={
 styles.questionButton
 }
 onClick={() =>
 handleToggleFaq(index)
 }
 >
 <h3
 className={
 styles.question
 }
 >
 {item.question}
 </h3>

 {openFaq === index ? (
 <i className="fa-solid fa-angle-up styles.iconOpen"></i>
 ) : (
 <i className="fa-solid fa-angle-down styles.iconClose"></i>
 )}
 </button>

 <div
 className={`${styles.answerWrapper} ${
 openFaq === index ? styles.open : ""
 }`}
 >
 <p
 className={
 styles.answer
 }
 >
 {item.answer}
 </p>
 </div>
 </div>
 )
 )}
 </section>
 </div>
 );
}