import React, { useState } from "react";
import styles from "./Pricing2.module.css";
import { Check } from "lucide-react";

export default function Pricing2({
 yearlyPlans,
 threeYearPlans
}) {
 const [billingCycle, setBillingCycle] = useState("yearly");

 const plans =
 billingCycle === "yearly"
 ? yearlyPlans
 : threeYearPlans;

 return (
 <section className={styles.pricing}>
 <div className={styles.container}>

 {/* Toggle */}
 <div className={styles.toggleWrap}>
 <div className={styles.toggle}>
 <span
 className={
 billingCycle === "yearly"
 ? styles.activeToggle
 : ""
 }
 onClick={() => setBillingCycle("yearly")}
 >
 1 Year
 </span>

 <span
 className={
 billingCycle === "threeYear"
 ? styles.activeToggle
 : ""
 }
 onClick={() =>
 setBillingCycle("threeYear")
 }
 >
 3 Years
 </span>
 </div>
 </div>

 {/* Plans */}
 <div className={styles.cards}>
 {plans.map((plan, index) => (
 <div
 key={index}
 className={`${styles.card} ${
 plan.featured
 ? styles.featured
 : ""
 }`}
 >
 {plan.featured && (
 <div className={styles.topBar}></div>
 )}

 {/* Header */}
 <div className={styles.header}>
 <h3>{plan.name}</h3>
 </div>

 {/* Price */}
 <div className={styles.priceSection}>
 {plan.oldPrice && (
 <div className={styles.oldPrice}>
 ₹ <span>{plan.oldPrice}</span>
 </div>
 )}

 {plan.price ? (
 <>
 <div className={styles.price}>
 <span>₹</span>
 {plan.price}
 </div>

 <p>
 per Organization per Month
 <br />
 ({plan.billingText})
 </p>
 </>
 ) : (
 <div className={styles.customPrice}>
 Custom
 </div>
 )}
 </div>

 {/* Description */}
 <div className={styles.body}>
 <p className={styles.description}>
 {plan.description}
 </p>

 <a
 href={plan.buttonLink}
 className={styles.button}
 >
 {plan.buttonText}
 </a>

 <div className={styles.divider}></div>

 {plan.includesText && (
 <h4>{plan.includesText}</h4>
 )}

 <div className={styles.features}>
 {plan.features.map(
 (feature, idx) => (
 <div
 key={idx}
 className={styles.feature}
 >
 <Check
 size={18}
 className={styles.check}
 />
 <span>{feature}</span>
 </div>
 )
 )}
 </div>
 </div>
 </div>
 ))}
 </div>

 </div>
 </section>
 );
}