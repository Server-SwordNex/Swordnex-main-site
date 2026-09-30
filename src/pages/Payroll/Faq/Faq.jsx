import React, { useState } from "react";
import { Search, Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";

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
 <motion.div
 key={index}
 className={styles.faqItem}
 initial={{
 opacity: 0,
 y: 20,
 }}
 whileInView={{
 opacity: 1,
 y: 0,
 }}
 viewport={{
 once: true,
 }}
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
 <i className="fa-solid fa-angle-up"></i>
 ) : (
 <i className="fa-solid fa-angle-down"></i>
 )}
 </button>

 <motion.div
 className={
 styles.answerWrapper
 }
 animate={{
 height:
 openFaq === index
 ? "auto"
 : 0,
 opacity:
 openFaq === index
 ? 1
 : 0,
 }}
 >
 <p
 className={
 styles.answer
 }
 >
 {item.answer}
 </p>
 </motion.div>
 </motion.div>
 )
 )}
 </section>
 </div>
 );
}