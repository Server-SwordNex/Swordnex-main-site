import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { API } from "../../../API/BackendApi";
import styles from "./PricingSection.module.css";
import AnimateOnScroll from "../../Components/AnimateOnScroll"

const palette = {
 Free: { cardBg: "#fef3c7", pricingBg: "#fef3c7", pricingColor: "#92400e", inner: "#fffbeb", btn: "#f59e0b" },
 Starter: { cardBg: "#fde68a", pricingBg: "#fde68a", pricingColor: "#92400e", inner: "#fffbeb", btn: "#d97706" },
 Professional: { cardBg: "#fcd34d", pricingBg: "#fcd34d", pricingColor: "#78350f", inner: "#fef3c7", btn: "#b45309" },
 Enterprise: { cardBg: "#fbbf24", pricingBg: "#fbbf24", pricingColor: "#451a03", inner: "#fef3c7", btn: "#92400e" },
};

const CheckIcon = () => (
 <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
 <path d="M0 0h24v24H0z" fill="none" />
 <path fill="currentColor" d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" />
 </svg>
);

const PricingSection = () => {
 const navigate = useNavigate();

 const [plans, setPlans] = useState([]);
 const [loading, setLoading] = useState(true);
 const [selectedBilling, setSelectedBilling] = useState("monthly");

 useEffect(() => {
 const fetchPlans = async () => {
 try {
 setLoading(true);
 const res = await fetch("https://invoiceapi-q27upobcwq-uc.a.run.app/getallplans");
 const data = await res.json();
 if (!res.ok) {
 throw new Error(data.message || "Failed to fetch plans");
 }
 setPlans(data.data || []);
 } catch (err) {
 console.error(err);
 } finally {
 setLoading(false);
 }
 };
 fetchPlans();
 }, []);

 const filteredPlans = plans
 .filter(
 (plan) =>
 plan.billingType === selectedBilling ||
 (selectedBilling === "monthly" && plan.billingType === "free")
 )
 .sort((a, b) => {
 if (a.billingType === "free") return -1;
 if (b.billingType === "free") return 1;
 return 0;
 });

 return (
 <section id="pricing" className={styles.section}>
 <AnimateOnScroll animation="fadeUp">
 <div className={styles.header}>
 <h2>Simple, Transparent Pricing</h2>
 <p>Choose the plan that fits your business needs</p>
 </div>
 </AnimateOnScroll>

 <AnimateOnScroll animation="fadeUp" delay={80}>
 <div className={styles.toggleWrap}>
 <div className={styles.toggle}>
 {["monthly", "yearly"].map((t) => (
 <button
 key={t}
 className={selectedBilling === t ? styles.togActive : ""}
 onClick={() => setSelectedBilling(t)}
 >
 {t.charAt(0).toUpperCase() + t.slice(1)}
 </button>
 ))}
 </div>
 </div>
 </AnimateOnScroll>

 {loading ? (
 <div className={styles.loadingWrapper}>
 <div className={styles.spinner} />
 <p>Loading plans...</p>
 </div>
 ) : (
 <div className={styles.grid}>
 {filteredPlans.map((plan, index) => {
 const isFree = plan.billingType === "free";
 const c = palette[plan.name] || {
 cardBg: "#fde68a",
 pricingBg: "#fde68a",
 pricingColor: "#92400e",
 inner: "#fffbeb",
 btn: "#d97706",
 };

 return (
 <AnimateOnScroll
 key={plan.id || index}
 animation="fadeUp"
 delay={index * 100}
 >
 <div className={`${styles.plan} ${plan.popular ? styles.popular : ""}`} style={{ backgroundColor: c.cardBg }}>
 <div className={styles.inner}>
 {plan.popular && <span className={styles.badge}>Most Popular</span>}

 <span className={styles.pricing} style={{ background: c.pricingBg, color: c.pricingColor }}>
 {isFree ? (
 <>Free<small>/ 14 days</small></>
 ) : (
 <>
 ₹{plan.price}
 <small>/ {plan.billingType === "monthly" ? "month" : "yr"}</small>
 </>
 )}
 </span>

 <p className={styles.title}>{plan.name}</p>

 <p className={styles.info}>
 {plan.tagLine || "Everything you need to manage your business."}
 </p>

 <div className={styles.limits}>
 <div className={styles.limitItem}>
 <strong>{plan.totalInvoicesLimit ?? 0}</strong>
 <span>Invoices</span>
 </div>
 </div>

 <ul className={styles.features}>
 {plan.features?.map((feature, i) => (
 <li key={i}>
 <span className={styles.icon}>
 <CheckIcon />
 </span>
 <span>{feature}</span>
 </li>
 ))}
 </ul>

 <div className={styles.action}>
 <button
 className={styles.button}
 onClick={() => navigate("/register")}
 >
 {isFree ? "Get Started" : `Choose ${plan.name}`}
 </button>
 </div>
 </div>
 </div>
 </AnimateOnScroll>
 );
 })}
 </div>
 )}
 </section>
 );
};

export default PricingSection;